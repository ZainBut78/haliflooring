import React from 'react'
import SiteNav from './SiteNav'
import SiteFooter from './SiteFooter'
import HighwayBanner from './HighwayBanner'
import WhatsAppButton from './WhatsAppButton'

/**
 * Shared shell for every page. Using a real layout element (not a wrapper div)
 * keeps the markup semantic, which matters for crawl budget on a small site.
 */
export default function Layout({ children, showHighway = true }) {
  return (
    <div className="min-h-screen bg-white text-[#111111] flex flex-col font-sans">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:bg-brand-orange focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold"
      >
        Skip to content
      </a>
      <SiteNav />
      <main id="main-content" className="flex-grow">
        {children}
      </main>
      {showHighway && <HighwayBanner />}
      <SiteFooter />
      <WhatsAppButton />
    </div>
  )
}
