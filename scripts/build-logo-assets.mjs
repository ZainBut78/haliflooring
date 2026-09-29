// Turns the raw brand logo (public/logo.jpeg) into the web-ready assets the
// site ships: the header/footer wordmark and the tab + home-screen icons.
//
// The brand mark is a black lockup — orange logomark, white lettering, on a
// flat black panel. That panel is part of the design, not a matte to be
// removed, so nothing is knocked out here: the artwork is re-encoded, not
// restyled. The only changes are a lossless-in-practice trim of dead space
// and a downscale to what the page actually renders, which together cut the
// payload without altering how the logo looks.
//
// Run after dropping a new logo in:  npm run logo

import sharp from 'sharp'
import { mkdir, stat } from 'node:fs/promises'
import path from 'node:path'

const SRC = 'public/logo.jpeg'
const OUT_DIR = 'public'

// The logo renders at 158px wide in the header and 201px in the footer, on a
// 2x screen that needs ~400px of real pixels. 800 is comfortable headroom.
const WORDMARK_WIDTH = 800

const c = {
  dim: '\x1b[2m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  reset: '\x1b[0m',
}
const kb = (n) => `${(n / 1024).toFixed(1)} kB`

/**
 * Find the ink bounding box and the widest internal column gutter.
 *
 * "Ink" means anything that is not the flat black panel, so the black is
 * treated as background for measurement purposes only. The widest empty
 * column band in the middle of the artwork is the gap between the logomark
 * and the wordmark, which is where the square icon crop has to be centred.
 */
function analyse(raw, width, height, channels) {
  const BLACK = 28
  const colInk = new Array(width).fill(0)
  let minX = width, maxX = -1, minY = height, maxY = -1

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels
      if (Math.max(raw[i], raw[i + 1], raw[i + 2]) <= BLACK) continue
      colInk[x]++
      if (x < minX) minX = x
      if (x > maxX) maxX = x
      if (y < minY) minY = y
      if (y > maxY) maxY = y
    }
  }

  const minGutter = Math.max(8, Math.round(width * 0.012))
  let best = null
  let runStart = null
  for (let x = minX; x <= maxX; x++) {
    if (colInk[x] === 0) {
      if (runStart === null) runStart = x
    } else if (runStart !== null) {
      const w = x - runStart
      if (w >= minGutter && (!best || w > best.w)) best = { start: runStart, end: x, w }
      runStart = null
    }
  }

  return { bbox: { minX, maxX, minY, maxY }, gutter: best }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })

  const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width: W, height: H, channels: C } = info
  const { bbox, gutter } = analyse(data, W, H, C)

  console.log(`${c.dim}source${c.reset} ${SRC}  ${W}×${H}`)
  console.log(
    `${c.dim}ink   ${c.reset} ${bbox.minX},${bbox.minY} → ${bbox.maxX},${bbox.maxY}  ` +
      `(${bbox.maxX - bbox.minX + 1}×${bbox.maxY - bbox.minY + 1})`
  )
  console.log(
    gutter
      ? `${c.dim}split ${c.reset} column ${gutter.start}–${gutter.end} (${gutter.w}px) — logomark sits left of it`
      : `${c.dim}split ${c.reset} no internal gutter found — centring the icon on the whole lockup`
  )

  /* ------------------------------------------------------------------ */
  /*  Wordmark — header and footer                                        */
  /* ------------------------------------------------------------------ */
  // Kept square, black panel and all. The source is already a JPEG of a
  // flat-colour lockup, so WebP holds it at a fraction of the bytes.
  const wordmarkPath = path.join(OUT_DIR, 'logo-hali.webp')
  await sharp(data, { raw: { width: W, height: H, channels: C } })
    .resize({ width: WORDMARK_WIDTH, withoutEnlargement: true, kernel: 'lanczos3' })
    .webp({ quality: 90, effort: 6 })
    .toFile(wordmarkPath)
  const wmMeta = await sharp(wordmarkPath).metadata()
  console.log(
    `${c.green}  ✓${c.reset} logo-hali.webp  ${wmMeta.width}×${wmMeta.height}  ` +
      `${c.dim}${kb((await stat(wordmarkPath)).size)} · black panel kept${c.reset}`
  )

  /* ------------------------------------------------------------------ */
  /*  Icon crops — browser tab and iOS home screen                       */
  /* ------------------------------------------------------------------ */
  // Square window centred on the logomark only. Everything outside the mark
  // inside that window is the black panel, so the tile keeps the same look
  // as the full lockup. The wordmark is dropped because it is unreadable
  // below about 64px.
  const markRight = gutter ? gutter.start - 1 : bbox.maxX
  const markCx = Math.round((bbox.minX + markRight) / 2)
  const markCy = Math.round((bbox.minY + bbox.maxY) / 2)
  const markSide = Math.max(markRight - bbox.minX + 1, bbox.maxY - bbox.minY + 1)
  // 1.3x leaves a black margin around the mark, matching the source lockup's
  // proportions rather than cropping tight against it.
  const box = Math.min(Math.round(markSide * 1.3), Math.min(W, H))
  const left = Math.max(0, Math.min(W - box, markCx - Math.round(box / 2)))
  const top = Math.max(0, Math.min(H - box, markCy - Math.round(box / 2)))

  const icons = [
    { file: 'favicon-192.png', size: 192 },
    { file: 'favicon-32.png', size: 32 },
    { file: 'apple-touch-icon.png', size: 180 },
  ]

  for (const icon of icons) {
    await sharp(data, { raw: { width: W, height: H, channels: C } })
      .extract({ left, top, width: box, height: box })
      .resize(icon.size, icon.size, { kernel: 'lanczos3' })
      // Palette-quantised: the tile is black plus one orange and their
      // antialiased blend, so 256 colours is visually lossless and a few kB.
      .png({ compressionLevel: 9, palette: true, effort: 10 })
      .toFile(path.join(OUT_DIR, icon.file))
  }

  const sizeOf = async (f) => kb((await stat(path.join(OUT_DIR, f))).size)
  console.log(
    `${c.green}  ✓${c.reset} favicon-192.png  192×192  ${c.dim}${await sizeOf('favicon-192.png')}${c.reset}`
  )
  console.log(
    `${c.green}  ✓${c.reset} favicon-32.png   32×32   ${c.dim}${await sizeOf('favicon-32.png')}${c.reset}`
  )
  console.log(
    `${c.green}  ✓${c.reset} apple-touch-icon.png 180×180 ${c.dim}${await sizeOf('apple-touch-icon.png')}${c.reset}`
  )
  console.log(
    `\n${c.green}done${c.reset} — original ${W}×${H} black lockup preserved, icons cropped to the ${box}px mark window`
  )
}

main().catch((err) => {
  console.error(`${c.red}logo assets failed:${c.reset}`, err)
  process.exit(1)
})
