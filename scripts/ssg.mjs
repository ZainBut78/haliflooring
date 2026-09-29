// scripts/ssg.mjs
//
// Static Site Generation for the Hali Flooring site.
//   1. builds the client bundle (hashed JS/CSS via Vite)
//   2. builds the SSR bundle
//   3. pre-renders every path from the route manifest into real HTML files
//   4. emits sitemap.xml, robots.txt and 404.html
//
// Every page ships as static HTML, so crawlers get the content without
// executing JavaScript.

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { build } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const dist = path.join(root, 'dist')
const ssrOutDir = path.join(root, '.ssr-build')

const SITE_URL = 'https://haliflooring.co.uk'
const BUILD_DATE = new Date().toISOString().slice(0, 10)

const c = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  bold: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
}

function log(msg) {
  console.log(msg)
}

async function main() {
  log(`\n${c.bold}${c.cyan}Hali Flooring — static site build${c.reset}\n`)

  await fs.rm(dist, { recursive: true, force: true })
  await fs.rm(ssrOutDir, { recursive: true, force: true })

  /* ---------------------------------------------------------------- */
  /* 1. Client bundle                                                  */
  /* ---------------------------------------------------------------- */
  log(`${c.dim}[1/4]${c.reset} Building client bundle…`)
  await build({
    root,
    logLevel: 'warn',
    configFile: path.join(root, 'vite.config.js'),
  })
  log(`${c.green}      client bundle built${c.reset}`)

  /* ---------------------------------------------------------------- */
  /* 2. SSR bundle                                                     */
  /* ---------------------------------------------------------------- */
  log(`${c.dim}[2/4]${c.reset} Building SSR bundle…`)
  await build({
    root,
    logLevel: 'warn',
    configFile: path.join(root, 'vite.config.js'),
    build: {
      ssr: path.join(root, 'src/entry-ssr.jsx'),
      outDir: ssrOutDir,
      emptyOutDir: true,
      minify: false,
      rollupOptions: {
        // Keep deps external so the SSR bundle uses the same React instance
        // as the host Node process and never re-bundles the router.
        external: ['react', 'react-dom', 'react-dom/server', 'react-router-dom', 'react-router'],
      },
    },
  })
  log(`${c.green}      SSR bundle built${c.reset}`)

  /* ---------------------------------------------------------------- */
  /* 3. Pre-render every route                                         */
  /* ---------------------------------------------------------------- */
  log(`${c.dim}[3/4]${c.reset} Pre-rendering pages…`)

  const entryFile = path.join(ssrOutDir, 'entry-ssr.js')
  const { render, allStaticPaths } = await import(pathToFileURL(entryFile).href)

  // index.html produced by Vite is the shell: it already carries the hashed
  // asset links, so we only inject head tags and the rendered markup.
  const shell = await fs.readFile(path.join(dist, 'index.html'), 'utf8')

  const paths = allStaticPaths()
  const sitemapEntries = []
  let failures = 0

  for (const routePath of paths) {
    try {
      const { statusCode, html, head, jsonLd } = await render(routePath)
      const pageHtml = injectIntoShell(shell, { head, jsonLd, html })

      const problems = validatePage(routePath, pageHtml, html)
      if (problems.length) failures += 1

      await writeRouteFile(routePath, pageHtml)
      sitemapEntries.push({ path: routePath, priority: priorityFor(routePath) })

      if (!problems.length) log(`      ${c.green}✓${c.reset} ${routePath}`)
    } catch (err) {
      failures += 1
      log(`      ${c.red}✗ ${routePath}${c.reset}`)
      log(`        ${c.red}${err.message}${c.reset}`)
      if (err.stack) log(`        ${c.dim}${err.stack.split('\n').slice(1, 4).join('\n        ')}${c.reset}`)
    }
  }

  // 404 page — same shell, marked noindex by its own head tags.
  const notFound = await render('/404').catch(() => null)
  if (notFound) {
    await fs.writeFile(path.join(dist, '404.html'), injectIntoShell(shell, notFound), 'utf8')
    log(`      ${c.green}✓${c.reset} /404.html`)
  }

  /* ---------------------------------------------------------------- */
  /* 4. sitemap.xml + robots.txt                                       */
  /* ---------------------------------------------------------------- */
  log(`${c.dim}[4/4]${c.reset} Writing sitemap + robots…`)
  await fs.writeFile(path.join(dist, 'sitemap.xml'), buildSitemap(sitemapEntries), 'utf8')
  await fs.writeFile(path.join(dist, 'robots.txt'), buildRobots(), 'utf8')
  log(`${c.green}      sitemap.xml + robots.txt written${c.reset}`)

  await fs.rm(ssrOutDir, { recursive: true, force: true })

  /* ---------------------------------------------------------------- */
  const htmlCount = await countHtmlFiles(dist)
  log(
    `\n${c.bold}${failures ? c.yellow : c.green}✔ Build complete${c.reset}  ` +
      `${c.bold}${htmlCount}${c.reset} HTML files  ` +
      `${c.dim}·${c.reset} ${paths.length} routes  ${c.dim}·${c.reset} ${BUILD_DATE}\n`
  )

  if (failures) {
    log(`${c.yellow}  ${failures} route(s) failed to render.${c.reset}\n`)
    process.exitCode = 1
  }
}

/* -------------------------------------------------------------------- */
/* Helpers                                                              */
/* -------------------------------------------------------------------- */

/**
 * Injects the rendered head + markup into Vite's built index.html.
 * The shell's own <title> is replaced so there is exactly one title tag.
 */
/**
 * Injects the rendered head + markup into Vite's built index.html.
 *
 * Every replacement is a function rather than a string, so `$` sequences and
 * apostrophes in page copy are inserted literally instead of being interpreted
 * as replacement patterns.
 */
function injectIntoShell(shell, { head, jsonLd, html }) {
  let out = shell

  // Replace the shell's title (only one, on its own line) with the full head
  // block. If there is no title, fall back to appending before </head>.
  if (/<title[\s>]/i.test(out)) {
    out = out.replace(/<title[^>]*>[\s\S]*?<\/title>/i, () => head)
  } else {
    out = out.replace('</head>', () => `    ${head}\n  </head>`)
  }

  // JSON-LD structured data goes last in the head.
  out = out.replace('</head>', () => `    ${jsonLd}\n  </head>`)

  // Hydration root.
  out = out.replace(/<div id="root"><\/div>/, () => `<div id="root">${html}</div>`)

  return out
}

/**
 * Fails loudly on anything that would quietly break a page for a crawler.
 * These are cheap string checks on output we just generated, so there is no
 * reason to ship a page that is structurally wrong.
 */
function validatePage(routePath, pageHtml, bodyHtml) {
  const problems = []
  const count = (re, source = pageHtml) => (source.match(re) || []).length

  const titles = count(/<title[\s>]/gi)
  if (titles !== 1) problems.push(`expected 1 <title>, found ${titles}`)

  const descriptions = count(/<meta[^>]+name="description"/gi)
  if (descriptions !== 1) problems.push(`expected 1 meta description, found ${descriptions}`)

  const canonicals = count(/<link[^>]+rel="canonical"/gi)
  if (canonicals !== 1) problems.push(`expected 1 canonical link, found ${canonicals}`)

  const h1s = count(/<h1[\s>]/gi)
  if (h1s !== 1) problems.push(`expected 1 <h1>, found ${h1s}`)

  // The body is the string React produced, so nested tags cannot confuse this.
  const text = bodyHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  if (text.length < 400) problems.push(`rendered body text is only ${text.length} characters`)

  for (const [i, block] of [...pageHtml.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].entries()) {
    try {
      JSON.parse(block[1])
    } catch (err) {
      problems.push(`JSON-LD block ${i + 1} is not valid JSON: ${err.message}`)
    }
  }

  if (problems.length) {
    console.log(`      ${c.red}⚠ ${routePath}${c.reset}`)
    for (const p of problems) console.log(`        ${c.red}· ${p}${c.reset}`)
  }

  return problems
}

/** dist/index.html for "/", dist/about/index.html for "/about". */
async function writeRouteFile(routePath, html) {
  const clean = routePath.replace(/^\/+/, '')
  const dir = clean === '' ? dist : path.join(dist, clean)
  await fs.mkdir(dir, { recursive: true })
  await fs.writeFile(path.join(dir, 'index.html'), html, 'utf8')
}

function priorityFor(p) {
  if (p === '/') return '1.0'
  if (p === '/services') return '0.9'
  if (p.startsWith('/services/')) return '0.9'
  if (p === '/work') return '0.8'
  if (p.startsWith('/work/')) return '0.7'
  if (p === '/contact') return '0.8'
  if (p === '/about') return '0.6'
  return '0.3'
}

function buildSitemap(entries) {
  const urls = entries
    .map(
      ({ path: p, priority }) => `  <url>
    <loc>${SITE_URL}${p === '/' ? '/' : p}</loc>
    <lastmod>${BUILD_DATE}</lastmod>
    <changefreq>${p === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${priority}</priority>
  </url>`
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

function buildRobots() {
  return `# ${SITE_URL}
User-agent: *
Allow: /

# Legal pages carry no SEO value in the index
Disallow: /legal/

Sitemap: ${SITE_URL}/sitemap.xml
`
}

async function countHtmlFiles(dir) {
  let total = 0
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      total += await countHtmlFiles(path.join(dir, entry.name))
    } else if (entry.name.endsWith('.html')) {
      total += 1
    }
  }
  return total
}

main().catch((err) => {
  log(`\n${c.red}✗ SSG build failed${c.reset}`)
  console.error(err)
  process.exit(1)
})
