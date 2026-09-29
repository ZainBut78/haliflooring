import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { HeadContext, buildHead, buildJsonLd, markManagedHead } from './components/Seo'
import { RouteParamsContext } from './components/RouteParams'
import { resolveRoute, allStaticPaths } from './routes'
import { SITE, services, projects } from './data/content'
import NotFoundPage from './pages/NotFoundPage'

// Re-exported so the generator only has to import this one file.
export { allStaticPaths } from './routes'

/**
 * Server-render entry used by scripts/ssg.mjs.
 *
 * Returns everything the generator needs to write one complete, indexable HTML
 * file per URL: the markup, the <head> tags, the JSON-LD, and a status code.
 */
export async function render(url) {
  const resolved = resolveRoute(url)

  let Page = NotFoundPage
  let statusCode = 200
  let meta
  let renderPath

  if (resolved.is404) {
    statusCode = 404
    renderPath = '/404'
    meta = {
      title: `Page Not Found (404) | ${SITE.name}`,
      description: 'The page you were looking for could not be found.',
      path: '/404',
      noindex: true,
    }
  } else {
    meta = resolved.meta
    renderPath = meta.path
    const mod = await resolved.route.Component()
    Page = mod.default
  }

  // Collects what pages push via useHead() during the render pass.
  const collected = []

  // A bare StaticRouter gives Link/useNavigate a router to work with, and the
  // params context supplies the dynamic segment that the static router cannot
  // match on its own.
  const html = renderToString(
    React.createElement(
      HeadContext.Provider,
      { value: collected },
      React.createElement(
        RouteParamsContext.Provider,
        { value: resolved.params },
        React.createElement(
          StaticRouter,
          { location: renderPath },
          React.createElement(Page, resolved.params)
        )
      )
    )
  )

  let h1 = null
  let pageJsonLd = null
  collected.forEach((tags) => {
    if (tags?.h1) h1 = tags.h1
    if (tags?.jsonLd) pageJsonLd = tags.jsonLd
  })

  // Marked so the client can swap these tags during in-app navigation.
  const head = markManagedHead(
    buildHead({
      title: meta.title,
      description: meta.description,
      path: meta.path,
      image: meta.image,
      type: meta.type,
      keywords: meta.keywords,
      noindex: meta.noindex,
    })
  )

  // LocalBusiness + WebSite + WebPage + BreadcrumbList, then any page-specific graph.
  const jsonLd = [
    buildJsonLd({
      path: meta.path,
      name: meta.title,
      description: meta.description,
      breadcrumbs: breadcrumbsFor(resolved.is404, renderPath),
    }),
  ]

  if (pageJsonLd) {
    const graph = pageJsonLd['@graph'] ? pageJsonLd['@graph'] : [pageJsonLd]
    jsonLd.push(
      `<script type="application/ld+json">${JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': graph,
      })}</script>`
    )
  }

  return { statusCode, html, head, jsonLd: jsonLd.join('\n    ') }
}

function breadcrumbsFor(is404, path) {
  const crumbs = [{ name: 'Home', path: '/' }]
  if (is404 || !path || path === '/') return crumbs

  const segments = path.split('/').filter(Boolean)

  if (segments[0] === 'work') {
    crumbs.push({ name: 'Our Work', path: '/work' })
    if (segments[1]) {
      const project = projects.find((p) => p.slug === segments[1])
      if (project) crumbs.push({ name: project.categoryLabel, path: '/work' })
    }
  } else if (segments[0] === 'services') {
    crumbs.push({ name: 'Services', path: '/services' })
    if (segments[1]) {
      const service = services[segments[1]]
      if (service) crumbs.push({ name: service.navLabel, path })
    }
  } else if (segments[0] === 'legal') {
    crumbs.push({ name: segments[1] === 'terms' ? 'Terms of Service' : 'Privacy Policy', path })
  } else if (segments[0]) {
    crumbs.push({ name: titleCase(segments[0]), path })
  }

  return crumbs
}

function titleCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
