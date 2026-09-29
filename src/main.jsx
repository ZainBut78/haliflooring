import { lazy, useEffect } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import './index.css'
import { routes, resolveRoute } from './routes'
import { applyHead } from './components/Seo'
import { SITE } from './data/content'
import NotFoundPage from './pages/NotFoundPage'

/* Resets scroll on route change so deep links land at the top of the page. */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

/**
 * The static HTML already carries the correct title, description and OG tags
 * for the URL that was requested. This keeps them in step afterwards, when the
 * visitor moves around the site without a page load.
 */
function HeadSync() {
  const { pathname } = useLocation()

  useEffect(() => {
    const resolved = resolveRoute(pathname)
    if (resolved.is404) {
      applyHead({
        title: `Page Not Found (404) | ${SITE.name}`,
        description: 'The page you were looking for could not be found.',
        path: '/404',
        noindex: true,
      })
      return
    }
    applyHead(resolved.meta)
  }, [pathname])

  return null
}

// Every page ships as its own chunk. These are created once at module scope so
// React.lazy keeps a stable identity across renders.
const lazyRoutes = routes.map((route) => ({ path: route.path, Component: lazy(route.Component) }))

/**
 * The initial route is resolved and its component loaded *before* hydrating.
 * That is what keeps the hydrated tree identical to the pre-rendered HTML —
 * a still-pending lazy component would render nothing on the first client
 * pass and trip a hydration mismatch.
 */
async function start() {
  const resolved = resolveRoute(window.location.pathname)
  const initialModule = resolved.is404
    ? { default: NotFoundPage }
    : await resolved.route.Component()
  const InitialPage = initialModule.default
  const initialPath = resolved.is404 ? null : resolved.route.path

  // Warm the remaining chunks so client-side navigation feels instant.
  for (const route of routes) {
    if (route.path !== initialPath) route.Component().catch(() => {})
  }

  function App() {
    return (
      <BrowserRouter>
        <ScrollToTop />
        <HeadSync />
        <Routes>
          {lazyRoutes.map(({ path, Component }) => (
            <Route
              key={path}
              path={path}
              element={
                // The route we are hydrating renders synchronously with its
                // params as props — byte-identical to the server output.
                path === initialPath ? <InitialPage {...resolved.params} /> : <Component />
              }
            />
          ))}
          {/* Legacy paths from the old single-page site. */}
          <Route path="/privacy" element={<Navigate to="/legal/privacy" replace />} />
          <Route path="/terms" element={<Navigate to="/legal/terms" replace />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    )
  }

  const container = document.getElementById('root')

  // Production ships pre-rendered HTML, so hydrate. The dev server serves an
  // empty shell, so mount instead.
  if (container.hasChildNodes()) {
    hydrateRoot(container, <App />)
  } else {
    createRoot(container).render(<App />)
  }
}

start()
