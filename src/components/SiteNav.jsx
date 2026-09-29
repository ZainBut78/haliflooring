import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SITE, services } from '../data/content'

const serviceLinks = Object.values(services).map((s) => ({
  to: `/services/${s.slug}`,
  label: s.navLabel,
}))

// "Home" leads the bar so every page has a visible way back to the landing
// page. The logo already links there, but on mobile it is only a small SVG
// tile — the text is hidden below the sm breakpoint.
const navItems = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services', hasDropdown: true },
  { to: '/work', label: 'Our Work' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function SiteNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close everything on route change
  useEffect(() => {
    setMobileMenuOpen(false)
    setDropdownOpen(false)
  }, [location.pathname])

  // Close the desktop dropdown when clicking outside
  useEffect(() => {
    if (!dropdownOpen) return
    const handleClick = (e) => {
      if (!e.target.closest('[data-services-dropdown]')) setDropdownOpen(false)
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [dropdownOpen])

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
            height={223}
            className="h-9 sm:h-11 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-gray-700">
          {navItems.map((item) =>
            item.hasDropdown ? (
              <div key={item.to} className="relative" data-services-dropdown>
                <Link
                  to={item.to}
                  onMouseEnter={() => setDropdownOpen(true)}
                  onFocus={() => setDropdownOpen(true)}
                  className={`flex items-center gap-1.5 hover:text-brand-orange transition-colors ${
                    isActive(item.to) ? 'text-brand-orange' : ''
                  }`}
                >
                  {item.label}
                  <svg
                    className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
                {dropdownOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-64">
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-2">
                      {serviceLinks.map((link) => (
                        <Link
                          key={link.to}
                          to={link.to}
                          className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-700 hover:bg-orange-50 hover:text-brand-orange transition-colors"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className={`hover:text-brand-orange transition-colors ${isActive(item.to) ? 'text-brand-orange' : ''}`}
              >
                {item.label}
              </Link>
            )
          )}
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
            {serviceLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-700 hover:bg-orange-50 hover:text-brand-orange transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 mt-2 border-t border-gray-200 space-y-1">
              {navItems
                .filter((i) => !i.hasDropdown)
                .map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="block px-3 py-2.5 rounded-xl text-base font-semibold text-gray-800 hover:bg-orange-50 hover:text-brand-orange transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
            </div>
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
