import React from 'react'
import { Link } from 'react-router-dom'
import { SITE, services, serviceSlugs } from '../data/content'
import { HaliLogo } from './SiteNav'

export default function SiteFooter() {
  const year = 2026

  return (
    <footer className="bg-brand-grayBg border-t border-gray-200 pt-14 pb-10">
      <div className="w-[90%] max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <HaliLogo className="h-11 w-auto" />
              <span className="font-display font-extrabold text-[#111111] uppercase text-lg leading-none">
                Hali <span className="text-brand-orange">Flooring</span>
              </span>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm max-w-sm leading-relaxed">
              Professional flooring supply and installation specialists based in Bolton, serving the entire
              Greater Manchester and Lancashire region. LVT, engineered oak, carpets, stair runners and subfloor
              levelling.
            </p>
            <div className="pt-1 flex items-center gap-3">
              <a
                href="https://instagram.com/haliflooring"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-white border border-gray-300 flex items-center justify-center text-gray-700 hover:text-brand-orange hover:border-brand-orange transition-colors shadow-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://tiktok.com/@haliflooring"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-9 h-9 rounded-lg bg-white border border-gray-300 flex items-center justify-center text-gray-700 hover:text-brand-orange hover:border-brand-orange transition-colors shadow-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.97-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.77 1.81-.07 3.25-1.54 3.32-3.34.07-2.67.03-5.34.04-8.01.01-4.06.01-8.11.01-12.16z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h2 className="text-xs font-extrabold text-gray-900 uppercase tracking-[0.15em] mb-4">
              Our Services
            </h2>
            <ul className="space-y-1 text-xs font-medium text-gray-600">
              {serviceSlugs.map((slug) => (
                <li key={slug}>
                  <Link
                    to={`/services/${slug}`}
                    className="hover:text-brand-orange transition-colors inline-block py-1.5"
                  >
                    {services[slug].navLabel}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/work" className="hover:text-brand-orange transition-colors inline-block py-1.5">
                  Our Work
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact + hours */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <h2 className="text-xs font-extrabold text-gray-900 uppercase tracking-[0.15em] mb-4">
                Get In Touch
              </h2>
              <ul className="space-y-2.5 text-xs text-gray-600">
                <li>
                  <a href={`tel:${SITE.phone}`} className="font-extrabold text-gray-900 hover:text-brand-orange transition-colors">
                    {SITE.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${SITE.email}`} className="hover:text-brand-orange transition-colors">
                    {SITE.email}
                  </a>
                </li>
                <li>
                  <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-brand-orange transition-colors">
                    WhatsApp 7 days a week
                  </a>
                </li>
                <li className="text-gray-700">
                  {SITE.address.line1}, {SITE.address.line2}
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-xs font-extrabold text-gray-900 uppercase tracking-[0.15em] mb-4">
                Working Hours
              </h2>
              <ul className="space-y-1.5 text-xs text-gray-600">
                {SITE.hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-3 font-medium">
                    <span>{h.day}:</span>
                    <span className="text-gray-900 font-bold text-right">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-300 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            © {year} {SITE.name}. All Rights Reserved. Wood Flooring, Carpet &amp; LVT Specialists.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-semibold">
            <Link to="/legal/privacy" className="hover:text-brand-orange transition-colors">
              Privacy Policy
            </Link>
            <Link to="/legal/terms" className="hover:text-brand-orange transition-colors">
              Terms of Service
            </Link>
            <Link to="/contact" className="text-brand-orange hover:underline font-bold">
              Get Free Quote
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
