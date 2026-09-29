// scripts/optimize-images.mjs
//
// The source photos are 10-36 megapixel camera originals (16.7 MB for six
// files). Shipping those to phones is what tanks Core Web Vitals, so this
// script produces web-sized WebP + JPEG variants and a manifest the app
// imports. Vite then fingerprints and bundles them like any other asset.
//
// Run standalone:  node scripts/optimize-images.mjs
// It also runs automatically before `npm run build` / `npm run dev`.
// Unchanged sources are skipped, so repeat runs take a second.

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const sourceDir = path.join(root, 'src', 'assets', 'Images')
const outDir = path.join(root, 'src', 'assets', 'generated', 'images')
const manifestFile = path.join(outDir, 'index.js')
const cacheFile = path.join(outDir, '.cache.json')

/**
 * Widths to emit, in pixels.
 *
 * srcset picks the smallest candidate that still covers the rendered slot, so a
 * coarse ladder makes a phone pay for a desktop-sized file. These steps track
 * the widths the site actually renders at: ~480 covers a full-width photo on a
 * phone, 800 a gallery card or a 2x phone, 1200/1600 the wide hero and project
 * images, and 2000 the largest container on a high-density display.
 */
const WIDTHS = [480, 800, 1200, 1600, 2000]

/** JPEG is only a fallback for browsers without WebP, so it needs no small size. */
const JPEG_WIDTHS = [800, 1200, 1600, 2000]

// Tuned by file size on the real photos. These are detailed interiors, so they
// cost more bits per pixel than average; q70 is still visually clean while
// noticeably smaller than q85. JPEG sits higher because it compresses less
// efficiently and is only used by browsers without WebP.
const WEBP_QUALITY = 70
const JPEG_QUALITY = 78

/**
 * Bumped whenever the ladder, quality or naming changes, so an old cache with
 * stale widths cannot be reused and leave orphaned files in the output.
 */
const PIPELINE_VERSION = 3

const OG_WIDTH = 1200
const OG_HEIGHT = 630

const c = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
}

/** "flooring (1).jpg" -> "flooring-1" */
function slugify(fileName) {
  return path
    .basename(fileName, path.extname(fileName))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

async function readCache() {
  try {
    return JSON.parse(await fs.readFile(cacheFile, 'utf8'))
  } catch {
    return {}
  }
}

async function writeCache(cache) {
  await fs.writeFile(cacheFile, JSON.stringify(cache, null, 2))
}

async function fileExists(file) {
  try {
    await fs.access(file)
    return true
  } catch {
    return false
  }
}

function kb(bytes) {
  return `${(bytes / 1024).toFixed(0)} kB`
}

async function optimizeOne(fileName, cache) {
  const source = path.join(sourceDir, fileName)
  const slug = slugify(fileName)
  const stat = await fs.stat(source)

  const cached = cache[fileName]
  if (cached && cached.mtimeMs === stat.mtimeMs && cached.size === stat.size && await fileExists(manifestFile)) {
    const allPresent = await Promise.all((cached.outputs || []).map(fileExists))
    if (allPresent.length && allPresent.every(Boolean)) {
      return { entry: cached, skipped: true }
    }
  }

  const meta = await sharp(source).metadata()
  const sourceWidth = meta.width
  const sourceHeight = meta.height

  // Never upscale: a 1869px original must not be blown up to 1920.
  const widths = WIDTHS.filter((w) => w < sourceWidth)
  if (widths.length === 0) widths.push(sourceWidth)
  const jpegWidths = JPEG_WIDTHS.filter((w) => w < sourceWidth)
  if (jpegWidths.length === 0) jpegWidths.push(sourceWidth)

  const pipeline = () => sharp(source).rotate() // honour EXIF orientation
  const outputs = []

  for (const width of widths) {
    const out = path.join(outDir, `${slug}-${width}.webp`)
    await pipeline()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY, effort: 6, smartSubsample: true })
      .toFile(out)
    outputs.push(out)
  }

  for (const width of jpegWidths) {
    const out = path.join(outDir, `${slug}-${width}.jpg`)
    await pipeline()
      .resize({ width, withoutEnlargement: true })
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true, progressive: true })
      .toFile(out)
    outputs.push(out)
  }

  // The largest emitted variant defines the intrinsic aspect ratio, which is
  // what keeps the layout from shifting while the image loads.
  const largestWidth = Math.max(...widths)
  const rendered = await sharp(source).rotate().resize({ width: largestWidth }).toBuffer({ resolveWithObject: true })

  const entry = {
    slug,
    source: fileName,
    width: rendered.info.width,
    height: rendered.info.height,
    sourceWidth,
    sourceHeight,
    mtimeMs: stat.mtimeMs,
    size: stat.size,
    outputs: outputs.map((f) => path.relative(root, f).split(path.sep).join('/')),
  }

  console.log(
    `  ${c.green}✓${c.reset} ${fileName.padEnd(20)} ${meta.width}×${meta.height} ${c.dim}(${(stat.size / 1024 / 1024).toFixed(2)} MB)${c.reset} ` +
      `→ ${largestWidth}×${entry.height} ${c.dim}webp+jpeg${c.reset}`
  )

  return { entry, skipped: false }
}

/**
 * Builds the social share image. Every page's og:image points at this file, so
 * a link posted to Facebook, WhatsApp or LinkedIn renders it as the preview.
 */
async function buildOgImage(entries) {
  const ogFile = path.join(root, 'public', 'og-image.jpg')
  const sorted = Object.values(entries).sort((a, b) => a.slug.localeCompare(b.slug))
  const hero = sorted[Math.floor(sorted.length / 2)] || sorted[0]
  if (!hero) return

  const source = path.join(outDir, `${hero.slug}-1920.webp`)
  if (!(await fileExists(source))) return

  // A dark scrim on the left keeps the text readable over any photograph.
  const scrim = Buffer.from(`
    <svg width="${OG_WIDTH}" height="${OG_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#0A0A0A" stop-opacity="0.92"/>
          <stop offset="55%" stop-color="#0A0A0A" stop-opacity="0.55"/>
          <stop offset="100%" stop-color="#0A0A0A" stop-opacity="0.15"/>
        </linearGradient>
      </defs>
      <rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="url(#g)"/>
      <rect x="72" y="196" width="86" height="9" fill="#F7941D"/>
      <text x="72" y="286" font-family="Montserrat, Arial, sans-serif" font-size="76" font-weight="800" fill="#FFFFFF">Hali Flooring</text>
      <text x="72" y="348" font-family="Inter, Arial, sans-serif" font-size="31" font-weight="500" fill="#E5E7EB">Wood, Carpet &amp; LVT specialists</text>
      <text x="72" y="404" font-family="Inter, Arial, sans-serif" font-size="31" font-weight="500" fill="#E5E7EB">Bolton &amp; the North West</text>
      <text x="72" y="516" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="700" fill="#F7941D">01204 358904</text>
    </svg>
  `)

  await sharp(source)
    .resize(OG_WIDTH, OG_HEIGHT, { fit: 'cover', position: 'attention' })
    .composite([{ input: scrim }])
    .jpeg({ quality: 88, mozjpeg: true, progressive: true })
    .toFile(ogFile)

  const { size } = await fs.stat(ogFile)
  console.log(`  ${c.green}✓${c.reset} og-image.jpg         ${OG_WIDTH}×${OG_HEIGHT} ${c.dim}${kb(size)}${c.reset}`)
}

/** Emits the ESM manifest Vite bundles, with static imports so hashes work. */
async function writeManifest(entries) {
  const sorted = Object.values(entries).sort((a, b) => a.slug.localeCompare(b.slug))

  const importLines = []
  const records = []

  for (const entry of sorted) {
    // Identifiers cannot contain hyphens; the slug has them.
    const ident = entry.slug.replace(/-/g, '_')

    const webpWidths = WIDTHS.filter((w) => w < entry.sourceWidth)
    if (webpWidths.length === 0) webpWidths.push(entry.sourceWidth)
    const jpegWidths = JPEG_WIDTHS.filter((w) => w < entry.sourceWidth)
    if (jpegWidths.length === 0) jpegWidths.push(entry.sourceWidth)

    const webpRefs = webpWidths.map((w) => {
      const name = `${ident}_${w}_webp`
      importLines.push(`import ${name} from './${entry.slug}-${w}.webp'`)
      return { w, name }
    })

    const jpegRefs = jpegWidths.map((w) => {
      const name = `${ident}_${w}_jpg`
      importLines.push(`import ${name} from './${entry.slug}-${w}.jpg'`)
      return { w, name }
    })

    // Fallback src is the smallest JPEG, so a browser that ignores srcset does
    // not download the largest file.
    const fallback = jpegRefs[0]

    // One template literal, not a comma-joined sum: `a + ' 1w', b + ' 2w'`
    // inside an object literal parses as extra properties and is a syntax error.
    const webpSrcSet = webpRefs.map((r) => `\${${r.name}} ${r.w}w`).join(', ')
    const jpegSrcSet = jpegRefs.map((r) => `\${${r.name}} ${r.w}w`).join(', ')

    records.push(
      [
        `  '${entry.slug}': {`,
        `    width: ${entry.width},`,
        `    height: ${entry.height},`,
        `    webp: {`,
        `      src: ${webpRefs[0].name},`,
        `      srcSet: \`${webpSrcSet}\`,`,
        `    },`,
        `    jpg: {`,
        `      src: ${fallback.name},`,
        `      srcSet: \`${jpegSrcSet}\`,`,
        `    },`,
        `  },`,
      ].join('\n')
    )
  }

  const body = `// AUTO-GENERATED by scripts/optimize-images.mjs — do not edit by hand.
// Run \`node scripts/optimize-images.mjs\` to regenerate.

${importLines.join('\n')}

/**
 * Each entry carries the intrinsic size plus WebP and JPEG sources, so
 * <ResponsiveImage> can let the browser pick the smallest file that fits.
 */
export const optimizedImages = {
${records.join('\n')}
}

export default optimizedImages
`

  await fs.writeFile(manifestFile, body, 'utf8')
}

async function main() {
  let files
  try {
    files = (await fs.readdir(sourceDir)).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort()
  } catch {
    console.log(`${c.yellow}!${c.reset} No source images at ${path.relative(root, sourceDir)} — nothing to do.`)
    return
  }

  if (files.length === 0) {
    console.log(`${c.yellow}!${c.reset} No source images found — nothing to do.`)
    return
  }

  console.log(`\n  Optimising ${files.length} image${files.length === 1 ? '' : 's'}\n`)

  const cache = await readCache()

  // Changing the width ladder or quality leaves the previous variants behind,
  // and the manifest would no longer reference them, so they would ship as dead
  // weight in dist. Start clean whenever the pipeline itself has changed.
  if (cache.version !== PIPELINE_VERSION) {
    const stale = await fs.readdir(outDir).catch(() => [])
    if (stale.length) {
      console.log(
        `  ${c.dim}Pipeline settings changed, clearing ${stale.length} old variant(s)${c.reset}\n`
      )
    }
    await fs.rm(outDir, { recursive: true, force: true })
  }

  await fs.mkdir(outDir, { recursive: true })

  const entries = {}
  let rebuilt = 0
  let skipped = 0

  for (const fileName of files) {
    const { entry, skipped: wasSkipped } = await optimizeOne(fileName, cache)
    entries[fileName] = entry
    cache[fileName] = entry
    if (wasSkipped) skipped += 1
    else rebuilt += 1
  }

  cache.version = PIPELINE_VERSION
  await writeManifest(entries)
  await writeCache(cache)
  await buildOgImage(entries)

  const totalOut = Object.values(entries).flatMap((e) => e.outputs).length
  const message =
    `${c.green}✔${c.reset} ${rebuilt} rebuilt` +
    (skipped ? `, ${c.dim}${skipped} already up to date${c.reset}` : '') +
    `  ${c.dim}→ ${totalOut} variants in src/assets/generated/images${c.reset}`

  console.log(`  ${message}\n`)
}

main().catch((err) => {
  console.error(`${c.red}✗ Image optimisation failed${c.reset}`)
  console.error(err)
  process.exit(1)
})
