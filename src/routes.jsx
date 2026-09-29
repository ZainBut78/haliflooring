import { projects, services, serviceSlugs, SITE } from './data/content'

/**
 * Single route manifest.
 *
 * Consumed by:
 *  - src/App.jsx            → builds the client-side react-router tree
 *  - src/entry-ssr.jsx      → matches a URL during the static render
 *  - scripts/ssg.mjs        → enumerates every static path to pre-render
 *
 * Because `paths()` is plain data, the SSG generator can walk the same list
 * the router uses, so the two can never drift apart.
 */

const homeMeta = {
  title: `Wood Flooring, Carpet & LVT | Supply & Fit Specialists Bolton & Lancashire | ${SITE.name}`,
  description:
    'Professional flooring supply and installation specialists based in Bolton, serving the entire Greater Manchester and Lancashire region. LVT, Engineered Oak, Carpets, Stair Runners & Subfloor Screeding. Free home survey.',
  keywords: [
    'flooring Bolton',
    'LVT Bolton',
    'engineered oak flooring Manchester',
    'stair runners Bolton',
    'flooring installer Lancashire',
    'herringbone flooring North West',
  ],
}

export const routes = [
  {
    path: '/',
    Component: () => import('./pages/HomePage'),
    meta: homeMeta,
    paths: () => ['/'],
  },
  {
    path: '/services',
    Component: () => import('./pages/ServiceIndexPage'),
    meta: {
      title: `Our Flooring Services | LVT, Wood, Carpet, Laminate & Commercial | ${SITE.name}`,
      description:
        'Every flooring service we offer across the North West: luxury vinyl tile, engineered wood, carpets and bespoke stair runners, laminate, commercial safety flooring and subfloor levelling. Free survey and quote on all.',
      keywords: ['flooring services Bolton', 'flooring types North West', 'flooring prices Manchester'],
    },
    paths: () => ['/services'],
  },
  {
    path: '/services/:service',
    Component: () => import('./pages/ServicePage'),
    meta: null, // per-slug, resolved from the services data
    paramsFrom: (match) => ({ service: match.groups.service }),
    paths: () => serviceSlugs.map((slug) => `/services/${slug}`),
  },
  {
    path: '/work',
    Component: () => import('./pages/WorkPage'),
    meta: {
      title: `Our Work | Flooring Projects Across the North West | ${SITE.name}`,
      description:
        'Browse our portfolio of completed flooring installations in Bolton, Manchester, Worsley, Chorley, Bury and Preston. Herringbone LVT, engineered oak, bespoke stair runners, laminate and commercial safety flooring.',
      keywords: [
        'flooring projects Bolton',
        'herringbone LVT installation Manchester',
        'engineered oak project Lancashire',
        'stair runner installation Worsley',
      ],
    },
    paths: () => ['/work'],
  },
  {
    path: '/work/:slug',
    Component: () => import('./pages/WorkDetailPage'),
    meta: null, // per-project, resolved from the projects data
    paramsFrom: (match) => ({ slug: match.groups.slug }),
    paths: () => projects.map((p) => `/work/${p.slug}`),
  },
  {
    path: '/about',
    Component: () => import('./pages/AboutPage'),
    meta: {
      title: `About Us | Family-Run Flooring Specialists in Bolton | ${SITE.name}`,
      description:
        'Family-run flooring supply and installation specialists based in Bolton for over 20 years. Fully insured, own installers, covering Greater Manchester and Lancashire. Meet the team behind our work.',
      keywords: ['flooring company Bolton', 'flooring contractor Manchester', 'trusted flooring installer Lancashire'],
    },
    paths: () => ['/about'],
  },
  {
    path: '/contact',
    Component: () => import('./pages/ContactPage'),
    meta: {
      title: `Contact & Free Quote | Flooring Bolton & Manchester | ${SITE.name}`,
      description:
        'Request a free home survey and written quote. Call +44 7467 030479 or message us on WhatsApp. We cover Bolton, Manchester, Bury, Wigan, Chorley, Preston, Rochdale, Salford, Blackburn and Horwich.',
      keywords: [
        'flooring quote Bolton',
        'free flooring survey Manchester',
        'flooring contact Lancashire',
      ],
    },
    paths: () => ['/contact'],
  },
  {
    path: '/legal/:doc',
    Component: () => import('./pages/LegalPage'),
    meta: {
      title: `Privacy Policy | ${SITE.name}`,
      description:
        'How Hali Flooring collects, uses and protects your personal data under UK GDPR, including our lawful basis, retention periods and your rights.',
    },
    noindex: true,
    paramsFrom: (match) => ({ doc: match.groups.doc }),
    paths: () => ['/legal/privacy', '/legal/terms'],
    // per-doc overrides, keyed by the :doc param
    metaByParam: {
      terms: {
        title: `Terms of Service | ${SITE.name}`,
        description:
          'The terms that apply to flooring surveys, quotes, installation work, guarantees and cancellations provided by Hali Flooring.',
      },
    },
  },
]

/* ------------------------------------------------------------------ */
/*  Path matching + metadata resolution                                */
/* ------------------------------------------------------------------ */

/**
 * Turns "/work/:slug" into a matcher regex.
 * Built segment by segment rather than by string replacement, so path
 * separators can never be lost or duplicated.
 */
function toMatcherRegex(routePath) {
  if (routePath === '/') return /^\/?$/

  const segments = routePath.split('/').filter(Boolean)
  let source = '^'

  for (const segment of segments) {
    if (segment.startsWith(':')) {
      source += `/(?<${segment.slice(1)}>[^/]+)`
    } else {
      source += `/${segment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`
    }
  }

  return new RegExp(`${source}/?$`)
}

const compiled = routes.map((route) => ({
  ...route,
  regex: toMatcherRegex(route.path),
}))

/** Resolves a URL to a route + params + resolved metadata. Returns null on 404. */
export function resolveRoute(url) {
  let pathname = url
  try {
    pathname = new URL(url, SITE.url).pathname
  } catch {
    /* relative path — use as-is */
  }
  if (pathname !== '/' && pathname.endsWith('/')) pathname = pathname.slice(0, -1)

  for (const route of compiled) {
    const match = pathname.match(route.regex)
    if (!match) continue

    const params = route.paramsFrom ? route.paramsFrom(match) : {}
    let meta = route.meta
    let notFound = false

    if (route.path === '/services/:service') {
      const service = services[params.service]
      if (!service) {
        notFound = true
      } else {
        meta = {
          title: service.metaTitle,
          description: service.metaDescription,
          keywords: [`${service.name.toLowerCase()} Bolton`, `${service.name.toLowerCase()} Manchester`, 'flooring North West'],
        }
      }
    }

    if (route.path === '/work/:slug') {
      const project = projects.find((p) => p.slug === params.slug)
      if (!project) {
        notFound = true
      } else {
        meta = {
          title: project.metaTitle,
          description: project.metaDescription,
          // No per-project og:image: the source photos are multi-megabyte and
          // their hashed filenames change on every build. The site-level
          // /og-image.jpg is used instead.
          type: 'article',
          keywords: [
            `${project.categoryLabel.toLowerCase()} ${project.location.split(',')[0]}`,
            'flooring project North West',
            'flooring installation Bolton',
          ],
        }
      }
    }

    if (route.path === '/legal/:doc') {
      const doc = params.doc
      if (!['privacy', 'terms'].includes(doc)) {
        notFound = true
      } else if (route.metaByParam?.[doc]) {
        meta = { ...meta, ...route.metaByParam[doc] }
      }
    }

    if (notFound) continue

    return { route, params, meta: { ...meta, path: pathname, noindex: route.noindex }, is404: false }
  }

  return { route: null, params: {}, meta: null, is404: true }
}

/** Every statically renderable path, in sitemap priority order. */
export function allStaticPaths() {
  return routes.flatMap((route) => route.paths())
}
