import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SITE } from '../data/content'

// "Home" leads the bar so every page has a visible way back to the landing
// page. Individual services live on the /services page rather than in a
// dropdown, which keeps the small-screen menu short.
const navItems = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/work', label: 'Our Work' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function SiteNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close everything on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  // Lock body scroll when the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const isActive = (to) => {
    if (to === '/work') return location.pathname.startsWith('/work')
    if (to === '/services') return location.pathname.startsWith('/services')
    return location.pathname === to
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-brand-borderLight transition-all duration-300 ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      <div className="w-[90%] max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* The real brand logo, not a drawn stand-in. The wordmark already
            contains the business name, so there is no text label beside it —
            the alt text is what gives the link its accessible name. */}
        <Link to="/" className="flex items-center group shrink-0" title="Hali Flooring — home">
          <img
            src="/logo-hali.webp"
            alt="Hali Flooring"
            width={800}
            height={275}
            className="h-9 sm:h-11 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-gray-700">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`hover:text-brand-orange transition-colors ${isActive(item.to) ? 'text-brand-orange' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={`tel:${SITE.phone}`}
            className="flex items-center gap-2 text-sm font-bold text-gray-800 hover:text-brand-orange transition-colors px-3.5 py-2 rounded-lg border border-gray-200 bg-gray-50 hover:border-brand-orange"
          >
            <PhoneIcon className="w-4 h-4 text-brand-orange" />
            <span className="hidden xl:inline">{SITE.phoneDisplay}</span>
            <span className="xl:hidden">Call</span>
          </a>
          <Link
            to="/contact"
            className="bg-brand-orange hover:bg-brand-orangeHover text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-md shadow-brand-orange/30 whitespace-nowrap"
          >
            Get Free Quote
          </Link>
        </div>

        <button
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          className="lg:hidden p-2 text-gray-700 hover:text-brand-orange focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 max-h-[calc(100vh-5rem)] overflow-y-auto shadow-xl">
          <div className="px-5 py-5 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`block px-3 py-2.5 rounded-xl text-base font-semibold hover:bg-orange-50 hover:text-brand-orange transition-colors ${
                  isActive(item.to) ? 'text-brand-orange' : 'text-gray-800'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 mt-3 border-t border-gray-200 flex flex-col gap-3">
              <a
                href={`tel:${SITE.phone}`}
                className="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-gray-300 text-gray-900 font-bold"
              >
                <PhoneIcon className="w-4 h-4 text-brand-orange" /> {SITE.phoneDisplay}
              </a>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-emerald-200 bg-emerald-50 text-emerald-700 font-bold"
              >
                WhatsApp Us
              </a>
              <Link
                to="/contact"
                className="text-center py-3 rounded-xl bg-brand-orange text-white font-bold shadow-md"
              >
                Get Free Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export function PhoneIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  )
}

/* The drawn herringbone-tile logo that used to live here has been replaced by
   the real brand artwork in public/logo-hali.webp. Regenerate that file (and
   the tab icons) from the master logo with: npm run logo */
