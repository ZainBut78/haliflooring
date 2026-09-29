// scripts/serve.mjs
//
// Local preview for the generated static site.
//
// `vite preview` is built for SPAs and falls back to the root index.html for
// every unknown path, which hides routing bugs. This server behaves like real
// static hosting instead: it resolves /work/slug → work/slug/index.html and
// serves 404.html with a 404 status for anything missing.

import fs from 'node:fs/promises'
import http from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dist = path.resolve(__dirname, '..', 'dist')
const port = Number(process.env.PORT || 4173)
const host = process.env.HOST || 'localhost'

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.map': 'application/json; charset=utf-8',
}

function contentType(file) {
  return MIME[path.extname(file).toLowerCase()] || 'application/octet-stream'
}

async function statFile(file) {
  try {
    const stats = await fs.stat(file)
    return stats.isFile() ? stats : null
  } catch {
    return null
  }
}

/** Maps a request path to a file on disk, the way static hosting does. */
async function resolveFile(urlPath) {
  let pathname
  try {
    pathname = decodeURIComponent(new URL(urlPath, 'http://localhost').pathname)
  } catch {
    return null
  }

  // Block traversal above the dist root.
  const target = path.join(dist, pathname)
  const relative = path.relative(dist, target)
  if (relative.startsWith('..') || path.isAbsolute(relative)) return null

  const direct = await statFile(target)
  if (direct) return { file: target, stats: direct }

  // Directory → its index.html (this is what makes /work/slug work).
  const asIndex = await statFile(path.join(target, 'index.html'))
  if (asIndex) return { file: path.join(target, 'index.html'), stats: asIndex }

  // Extensionless path → try .html alongside it.
  if (!path.extname(target)) {
    const asHtml = await statFile(`${target}.html`)
    if (asHtml) return { file: `${target}.html`, stats: asHtml }
  }

  return null
}

const server = http.createServer(async (req, res) => {
  const found = await resolveFile(req.url || '/')

  if (found) {
    const isHtml = found.file.endsWith('.html')
    res.writeHead(200, {
      'Content-Type': contentType(found.file),
      'Content-Length': found.stats.size,
      // Hashed assets are immutable; HTML must always be revalidated.
      'Cache-Control': isHtml ? 'no-cache' : 'public, max-age=31536000, immutable',
    })
    res.end(await fs.readFile(found.file))
    return
  }

  const notFoundPage = path.join(dist, '404.html')
  const stats = await statFile(notFoundPage)

  if (stats) {
    res.writeHead(404, { 'Content-Type': MIME['.html'], 'Content-Length': stats.size })
    res.end(await fs.readFile(notFoundPage))
  } else {
    res.writeHead(404, { 'Content-Type': MIME['.txt'] })
    res.end('404 Not Found')
  }
})

server.listen(port, host, () => {
  console.log(`\n  Hali Flooring — static preview`)
  console.log(`  http://${host}:${port}/\n`)
  console.log(`  Serving ./dist with directory-index + 404.html resolution.`)
  console.log(`  Press Ctrl+C to stop.\n`)
})
