// Turns the raw brand logo (public/logo.jpeg) into the web-ready assets the
// site actually ships: a transparent-background wordmark for the header and
// footer, and square icon crops for the browser tab and touch icon.
//
// Why this is not just a rename: the source is a JPEG, so it has no alpha
// channel, and it is a white-on-black lockup. Dropped onto the white header or
// the #F8F9FA footer as-is, the black panel would read as a hole and the white
// lettering would be invisible. So the black is knocked out to transparency and
// the lettering is remapped to the site's near-black (#111111) — which is the
// standard "light surface" variant of a brand mark. The orange in the mark is
// left exactly as the brand supplied it.
//
// Run after dropping a new logo in:  npm run logo

import sharp from 'sharp'
import { mkdir, stat } from 'node:fs/promises'
import path from 'node:path'

const SRC = 'public/logo.jpeg'
const OUT_DIR = 'public'

const INK_FLOOR = 24 // below this a pixel is matte, not ink
const NEUTRAL_MAX = 55 // max-min below this counts as colourless (lettering)
const TEXT_FLOOR = 120 // brightness above which colourless ink is lettering
const DARK_TEXT = [0x11, 0x11, 0x11]

const c = {
  dim: '\x1b[2m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  reset: '\x1b[0m',
}
const kb = (n) => `${(n / 1024).toFixed(1)} kB`

/**
 * Matte removal. The logo is ink sitting on a flat black panel, so the
 * brightest channel is a good proxy for how much ink covers a pixel: black
 * panel -> 0, solid orange or white -> 255. Using that as the alpha channel
 * keeps the edges of both the lettering and the mark smoothly antialiased
 * instead of leaving a dark fringe from the JPEG.
 *
 * @param mode 'dark' remaps colourless lettering to DARK_TEXT for light
 *             surfaces; 'light' leaves lettering white for dark surfaces.
 */
function toTransparent(raw, width, height, channels, mode) {
  const out = Buffer.alloc(width * height * 4)
  for (let i = 0, p = 0; p < width * height; p++, i += channels) {
    const r = raw[i]
    const g = raw[i + 1]
    const b = raw[i + 2]
    const m = Math.max(r, g, b)
    const o = p * 4

    if (m <= INK_FLOOR) {
      out[o + 3] = 0
      continue
    }
    // Slightly over-shoot the coverage so thin strokes do not go patchy.
    out[o + 3] = Math.min(255, Math.round(m * 1.08))

    const neutral = m - Math.min(r, g, b) <= NEUTRAL_MAX && m > TEXT_FLOOR
    if (neutral && mode === 'dark') {
      out[o] = DARK_TEXT[0]
      out[o + 1] = DARK_TEXT[1]
      out[o + 2] = DARK_TEXT[2]
    } else {
      out[o] = r
      out[o + 1] = g
      out[o + 2] = b
    }
  }
  return out
}

/** Find the ink bounding box and the widest internal column gutter. */
function analyse(raw, width, height, channels) {
  const colInk = new Array(width).fill(0)
  const rowInk = new Array(height).fill(0)
  let minX = width, maxX = -1, minY = height, maxY = -1

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels
      if (Math.max(raw[i], raw[i + 1], raw[i + 2]) <= INK_FLOOR) continue
      colInk[x]++
      rowInk[y]++
      if (x < minX) minX = x
      if (x > maxX) maxX = x
      if (y < minY) minY = y
      if (y > maxY) maxY = y
    }
  }

  // The logomark and the wordmark are separated by a run of empty columns.
  // Find the widest one that is not at the outer edge, and use it to split.
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

  return { bbox: { minX, maxX, minY, maxY }, gutter: best, colInk }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })

  const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width: W, height: H, channels: C } = info
  const { bbox, gutter } = analyse(data, W, H, C)

  const inkW = bbox.maxX - bbox.minX + 1
  const inkH = bbox.maxY - bbox.minY + 1
  console.log(`${c.dim}source${c.reset} ${SRC}  ${W}×${H}`)
  console.log(
    `${c.dim}ink   ${c.reset} ${bbox.minX},${bbox.minY} → ${bbox.maxX},${bbox.maxY}  (${inkW}×${inkH})`
  )
  console.log(
    gutter
      ? `${c.dim}split ${c.reset} column ${gutter.start}–${gutter.end} (${gutter.w}px) separates mark from wordmark`
      : `${c.dim}split ${c.reset} no internal gutter found — using the whole lockup for the icon`
  )

  /* ---------------------------------------------------------------- */
  /*  Wordmark — header and footer                                     */
  /* ---------------------------------------------------------------- */
  // Trim the matte first, then knock it out, so the transparent edge is the
  // real edge of the artwork rather than a black border.
  const wordmark = await sharp(data, { raw: { width: W, height: H, channels: C } })
    .extract({ left: bbox.minX, top: bbox.minY, width: inkW, height: inkH })
    .resize({ width: 800, withoutEnlargement: true, kernel: 'lanczos3' })
    .raw()
    .toBuffer({ resolveWithObject: true })

  const wm = wordmark.info
  const wmAlpha = toTransparent(wordmark.data, wm.width, wm.height, wm.channels, 'dark')
  const wordmarkPath = path.join(OUT_DIR, 'logo-hali.webp')
  await sharp(wmAlpha, { raw: { width: wm.width, height: wm.height, channels: 4 } })
    .webp({ quality: 92, effort: 6 })
    .toFile(wordmarkPath)
  const wmSize = (await stat(wordmarkPath)).size
  console.log(
    `${c.green}  ✓${c.reset} logo-hali.webp     ${wm.width}×${wm.height}  ${c.dim}${kb(wmSize)}${c.reset}`
  )

  /* ---------------------------------------------------------------- */
  /*  Icon crops — browser tab and iOS home screen                     */
  /* ---------------------------------------------------------------- */
  // Square box around the logomark only; the wordmark would be unreadable
  // below about 64px, so the tab icon uses just the mark.
  let ix0 = bbox.minX
  let ix1 = gutter ? gutter.start - 1 : bbox.maxX
  const markW = ix1 - ix0 + 1

  // Tighten vertically to this column band so the crop is not letterboxed.
  let minY = bbox.maxY
  let maxY = bbox.minY
  for (let y = bbox.minY; y <= bbox.maxY; y++) {
    for (let x = ix0; x <= ix1; x++) {
      const i = (y * W + x) * C
      if (Math.max(data[i], data[i + 1], data[i + 2]) > INK_FLOOR) {
        if (y < minY) minY = y
        if (y > maxY) maxY = y
        break
      }
    }
  }
  const markH = maxY - minY + 1
  const side = Math.max(markW, markH)
  const pad = Math.round(side * 0.06)
  const box = side + pad * 2
  const left = Math.round(ix0 - (box - markW) / 2)
  const top = Math.round(minY - (box - markH) / 2)

  const iconSrc = await sharp(data, { raw: { width: W, height: H, channels: C } })
    .extract({
      left: Math.max(0, left),
      top: Math.max(0, top),
      width: Math.min(box, W - Math.max(0, left)),
      height: Math.min(box, H - Math.max(0, top)),
    })
    .raw()
    .toBuffer({ resolveWithObject: true })
  const ii = iconSrc.info
  const iconAlpha = toTransparent(iconSrc.data, ii.width, ii.height, ii.channels, 'dark')
  const iconRaw = { raw: { width: ii.width, height: ii.height, channels: 4 } }

  const icons = [
    // Quantised to a palette: the mark is one orange plus its own antialiasing,
    // so a small palette is visually lossless and keeps each tile a few kB
    // instead of the ~370 kB a straight 512px RGBA encode costs. 192 is the
    // largest that is actually worth shipping — a 512 tile costs 4x the bytes
    // and no browser shows it larger.
    { file: 'favicon-192.png', size: 192, alpha: true, palette: true },
    { file: 'favicon-32.png', size: 32, alpha: true, palette: true },
    // iOS composites a touch icon on a solid backdrop and ignores the alpha
    // channel, so this one is flattened onto white rather than left
    // transparent — otherwise the mark lands on a black tile on some devices.
    { file: 'apple-touch-icon.png', size: 180, alpha: false, palette: false },
  ]
  for (const icon of icons) {
    let pipe = sharp(iconAlpha, iconRaw).resize(icon.size, icon.size, { kernel: 'lanczos3' })
    if (!icon.alpha) {
      pipe = pipe.flatten({ background: '#ffffff' })
    }
    await pipe
      .png({ compressionLevel: 9, palette: icon.palette, effort: 10 })
      .toFile(path.join(OUT_DIR, icon.file))
  }

  const sizeOf = async (f) => kb((await stat(path.join(OUT_DIR, f))).size)
  console.log(
    `${c.green}  ✓${c.reset} favicon-192.png     192×192   ${c.dim}${await sizeOf('favicon-192.png')}${c.reset}`
  )
  console.log(
    `${c.green}  ✓${c.reset} favicon-32.png      32×32    ${c.dim}${await sizeOf('favicon-32.png')}${c.reset}`
  )
  console.log(
    `${c.green}  ✓${c.reset} apple-touch-icon.png 180×180  ${c.dim}${await sizeOf('apple-touch-icon.png')} · flattened on white${c.reset}`
  )
  console.log(
    `\n${c.green}done${c.reset} — wordmark ${inkW}×${inkH} trimmed to ${wm.width}×${wm.height}, background transparent`
  )
}

main().catch((err) => {
  console.error(`${c.red}logo assets failed:${c.reset}`, err)
  process.exit(1)
})
