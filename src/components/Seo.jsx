import React, { createContext, useContext } from 'react'
import { SITE } from '../data/content'

/**
 * Zero-dependency head manager for SSG.
 * During SSR the collector array is passed in, pages push their tags on render,
 * and the generator injects the result into the static HTML <head>.
 */
export const HeadContext = createContext(null)

/**
 * Registers a page's head metadata during the render pass.
 *
 * Pass null to register nothing. Pages that render a "not found" branch call
 * this with null rather than skipping the call, so the hook order stays stable
 * across renders — an early return before the call would trip the rules of
 * hooks and drop the tags on the path that skips it.
 */
export function useHead(tags) {
  const collector = useContext(HeadContext)
  if (collector && tags) collector.push(tags)
}

/** Marks the tags this site owns, so the client can replace them on navigation. */
export const MANAGED_ATTR = 'data-managed-head'

function absUrl(path = '') {
  if (!path) return `${SITE.url}/`
  if (path.startsWith('http')) return path
  return `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`
}

/** Builds the full set of <meta>/<link> tags for a page. */
export function buildHead({ title, description, path = '/', image, type = 'website', keywords, noindex = false }) {
  const fullTitle = title?.includes(SITE.name) || !title ? title : `${title} | ${SITE.name}`
  const url = absUrl(path)
  const ogImage = image ? absUrl(image) : `${SITE.url}/og-image.jpg`

  const tags = [
    `<title>${escapeHtml(fullTitle)}</title>`,
    `<meta name="description" content="${escapeAttr(description)}" />`,
    `<link rel="canonical" href="${url}" />`,
  ]

  if (keywords?.length) {
    tags.push(`<meta name="keywords" content="${escapeAttr(keywords.join(', '))}" />`)
  }
  if (noindex) {
    tags.push(`<meta name="robots" content="noindex, nofollow" />`)
  }

  // Open Graph
  tags.push(`<meta property="og:site_name" content="${escapeAttr(SITE.name)}" />`)
  tags.push(`<meta property="og:title" content="${escapeAttr(fullTitle)}" />`)
  tags.push(`<meta property="og:description" content="${escapeAttr(description)}" />`)
  tags.push(`<meta property="og:url" content="${url}" />`)
  tags.push(`<meta property="og:type" content="${type}" />`)
  tags.push(`<meta property="og:image" content="${ogImage}" />`)
  tags.push(`<meta property="og:locale" content="en_GB" />`)

  // Twitter
  tags.push(`<meta name="twitter:card" content="summary_large_image" />`)
  tags.push(`<meta name="twitter:title" content="${escapeAttr(fullTitle)}" />`)
  tags.push(`<meta name="twitter:description" content="${escapeAttr(description)}" />`)
  tags.push(`<meta name="twitter:image" content="${ogImage}" />`)

  // Geo / local relevance
  tags.push(`<meta name="geo.region" content="GB-GMP" />`)
  tags.push(`<meta name="geo.placename" content="Bolton" />`)
  tags.push(`<meta name="author" content="${escapeAttr(SITE.name)}" />`)

  return tags.join('\n    ')
}

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function escapeAttr(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

/** JSON-LD structured data for local business + breadcrumbs. */
export function buildJsonLd({ path = '/', type = 'WebPage', name, description, breadcrumbs }) {
  const graph = [
    {
      '@type': ['LocalBusiness', 'FlooringContractor', 'HomeAndConstructionBusiness'],
      '@id': `${SITE.url}/#business`,
      name: SITE.name,
      description: `${SITE.name} is a flooring supply and installation specialist based in ${SITE.address.line1}, serving ${SITE.address.line2} and Lancashire.`,
      url: SITE.url,
      // SITE.phone is already in E.164 form (+44…), which is what schema.org
      // wants — do not prefix the country code again.
      telephone: SITE.phone,
      email: SITE.email,
      image: `${SITE.url}/og-image.jpg`,
      priceRange: '££',
      address: {
        '@type': 'PostalAddress',
        streetAddress: SITE.address.line1,
        addressLocality: 'Bolton',
        addressRegion: 'Greater Manchester',
        postalCode: SITE.address.postcode,
        addressCountry: 'GB',
      },
      areaServed: [
        'Bolton',
        'Manchester',
        'Bury',
        'Wigan',
        'Chorley',
        'Preston',
        'Rochdale',
        'Salford',
        'Blackburn',
        'Horwich',
      ].map((name) => ({ '@type': 'Place', name })),
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '18:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Saturday',
          opens: '09:00',
          closes: '16:00',
        },
      ],
      sameAs: ['https://instagram.com/haliflooring', 'https://tiktok.com/@haliflooring'],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      publisher: { '@id': `${SITE.url}/#business` },
      inLanguage: 'en-GB',
    },
  ]

  if (type === 'WebPage') {
    graph.push({
      '@type': 'WebPage',
      '@id': `${SITE.url}${path}#webpage`,
      url: `${SITE.url}${path}`,
      name,
      description,
      isPartOf: { '@id': `${SITE.url}/#website` },
      about: { '@id': `${SITE.url}/#business` },
      inLanguage: 'en-GB',
    })
  }

  if (breadcrumbs?.length) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: crumb.name,
        item: `${SITE.url}${crumb.path}`,
      })),
    })
  }

  return `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>`
}

/* ------------------------------------------------------------------ */
/*  Client-side head updates                                           */
/* ------------------------------------------------------------------ */

/**
 * Tags generated for the static HTML are stamped with `data-managed-head`.
 * On in-app navigation we swap that whole set for the next route's tags, so
 * the browser tab title and the social preview stay correct without ever
 * duplicating a <title> or <meta> tag.
 */
export function markManagedHead(tagsHtml) {
  return tagsHtml.replace(/<(title|meta|link)\b/g, `<$1 ${MANAGED_ATTR}="true"`)
}

/** Replaces the managed head tags with the ones for `meta`. */
export function applyHead(meta) {
  if (typeof document === 'undefined' || !meta) return

  document.querySelectorAll(`[${MANAGED_ATTR}]`).forEach((el) => el.remove())

  const template = document.createElement('template')
  template.innerHTML = markManagedHead(buildHead(meta))

  // Snapshot before appending: content.children is live, so moving nodes out of
  // the fragment while iterating it would skip every other tag.
  for (const el of Array.from(template.content.children)) {
    document.head.appendChild(el)
  }
}
