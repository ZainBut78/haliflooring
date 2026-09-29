import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from './App'
import WorkPage from './pages/WorkPage'
import WorkDetailPage from './pages/WorkDetailPage'
import ServicePage from './pages/ServicePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'

// Lazy load pages for code splitting
const LazyWorkPage = React.lazy(() => import('./pages/WorkPage'))
const LazyWorkDetailPage = React.lazy(() => import('./pages/WorkDetailPage'))
const LazyServicePage = React.lazy(() => import('./pages/ServicePage'))
const LazyAboutPage = React.lazy(() => import('./pages/AboutPage'))
const LazyContactPage = React.lazy(() => import('./pages/ContactPage'))
const LazyNotFoundPage = React.lazy(() => import('./pages/NotFoundPage'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <LazyNotFoundPage />,
  },
  {
    path: '/work',
    element: <LazyWorkPage />,
    errorElement: <LazyNotFoundPage />,
  },
  {
    path: 'work/:slug',
    element: <LazyWorkDetailPage />,
    errorElement: <LazyNotFoundPage />,
  },
  {
    path: 'services/:service',
    element: <LazyServicePage />,
    errorElement: <LazyNotFoundPage />,
  },
  {
    path: '/about',
    element: <LazyAboutPage />,
    errorElement: <LazyNotFoundPage />,
  },
  {
    path: '/contact',
    element: <LazyContactPage />,
    errorElement: <LazyNotFoundPage />,
  },
  {
    path: '*',
    element: <Navigate to="/404" replace />,
  },
  {
    path: '/404',
    element: <LazyNotFoundPage />,
  },
])

// Export routes array for SSG
export const routes = [
  { path: '/', exact: true },
  { path: '/work', exact: true },
  { path: '/work/:slug' },
  { path: '/services/:service' },
  { path: '/about' },
  { path: '/contact' },
]

// Static paths for SSG generation
export const staticPaths = [
  '/',
  '/work',
  '/services/lvt',
  '/services/wood',
  '/services/carpet',
  '/services/laminate',
  '/services/commercial',
  '/services/subfloor',
  '/about',
  '/contact',
]

// Work project slugs for generating detail pages
export const workSlugs = [
  'bolton-residence-herringbone-lvt',
  'worsley-manor-custom-runner',
  'chorley-barn-engineered-oak',
  'manchester-office-safety-flooring',
  'bury-retail-laminate-herringbone',
  'preston-care-home-vinyl',
]