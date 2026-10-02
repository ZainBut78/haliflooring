import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { SITE } from '../data/content'

/* ------------------------------------------------------------------ */
/*  Breadcrumbs — also emits BreadcrumbList JSON-LD for the generator  */
/* ------------------------------------------------------------------ */
export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="w-[90%] max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-0 text-xs text-gray-500 py-2.5">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={item.path || item.name} className="flex items-center gap-2">
              {isLast || !item.path ? (
                <span className="text-gray-900 font-semibold" aria-current="page">
                  {item.name}
                </span>
              ) : (
                // min-h keeps the tap target at 24px without changing the row rhythm.
                <Link
                  to={item.path}
                  className="inline-flex items-center min-h-[24px] hover:text-brand-orange transition-colors"
                >
                  {item.name}
                </Link>
              )}
              {!isLast && (
                <svg className="w-3 h-3 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

/* ------------------------------------------------------------------ */
/*  Page hero — consistent inner-page header                          */
/* ------------------------------------------------------------------ */
export function PageHero({ eyebrow, heading, subheading, children, align = 'center' }) {
  return (
    <section
      className="relative pt-28 pb-12 sm:pb-16 lg:pt-36 lg:pb-20 overflow-hidden bg-gradient-to-b from-brand-grayBg via-white to-white"
    >
      {/* Ambient glow, mirrors the landing hero */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[480px] bg-brand-orange/10 blur-[150px] rounded-full animate-glow" />
      </div>
      {/* Subtle herringbone flooring background (mirrors hero) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none [mask-image:radial-gradient(ellipse_80%_65%_at_50%_40%,#000_70%,transparent_100%)]"
      >
        <svg
          className="w-full h-full opacity-[0.05]"
          fill="none"
          preserveAspectRatio="none"
          stroke="currentColor"
          viewBox="0 0 1600 900"
        >
          <defs>
            <pattern id="herringbonePatternInner" patternUnits="userSpaceOnUse" width="120" height="120">
              <path className="hb-plank-anim-1" d="M0,30 L30,0 L60,30 L30,60 Z" stroke="#E07E0C" strokeDasharray="120" strokeWidth="1.25" />
              <path className="hb-plank-anim-2" d="M30,60 L60,30 L90,60 L60,90 Z" stroke="#111111" strokeDasharray="120" strokeWidth="1.1" />
              <path className="hb-plank-anim-3" d="M60,90 L90,60 L120,90 L90,120 Z" stroke="#E07E0C" strokeDasharray="120" strokeWidth="1.25" />
              <path className="hb-plank-anim-4" d="M0,90 L30,60 L60,90 L30,120 Z" stroke="#111111" strokeDasharray="120" strokeWidth="1.1" />
              <path className="hb-plank-anim-1" d="M60,30 L90,0 L120,30 L90,60 Z" stroke="#111111" strokeDasharray="120" strokeWidth="1.1" />
              <line x1="0" y1="0" x2="120" y2="120" stroke="#E2E2E2" strokeWidth="0.75" />
              <line x1="120" y1="0" x2="0" y2="120" stroke="#E2E2E2" strokeWidth="0.75" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#herringbonePatternInner)" />
        </svg>
      </div>

      <div
        className={`relative z-10 w-[90%] max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 ${
          align === 'center' ? 'text-center' : 'text-left'
        }`}
      >
        <div className={align === 'center' ? 'max-w-4xl mx-auto' : 'max-w-3xl'}>
          {eyebrow && (
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-brand-orange/30 text-xs sm:text-sm font-bold text-brand-orange tracking-wide shadow-sm mb-5">
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping" />
              {eyebrow}
            </span>
          )}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-[#111111] leading-[1.08] font-display uppercase drop-shadow-sm">
            {heading}
          </h1>
          {subheading && (
            <p className="mt-5 text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl mx-auto">
              {subheading}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Section heading                                                    */
/* ------------------------------------------------------------------ */
export function SectionHeading({ eyebrow, heading, subheading, align = 'center', light = false }) {
  return (
    <div
      className={`${align === 'center' ? 'max-w-3xl mx-auto text-center' : 'max-w-3xl'} mb-10 sm:mb-14`}
    >
      {eyebrow && (
        <span
          className={`inline-block text-xs font-bold uppercase tracking-[0.2em] px-3.5 py-1 rounded-full border ${
            light
              ? 'text-brand-orange bg-brand-orange/15 border-brand-orange/30'
              : 'text-brand-orange bg-brand-orange/10 border-brand-orange/20'
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`mt-3 text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display uppercase tracking-tight ${
          light ? 'text-white' : 'text-[#111111]'
        }`}
      >
        {heading}
      </h2>
      {subheading && (
        <p className={`mt-4 text-sm sm:text-base leading-relaxed ${light ? 'text-neutral-400' : 'text-gray-600'}`}>
          {subheading}
        </p>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  FAQ accordion — native details/summary so content is in the DOM    */
/*  (important: crawlable without any JS interaction)                  */
/* ------------------------------------------------------------------ */
export function FaqAccordion({ items, idPrefix = 'faq' }) {
  return (
    <div className="space-y-3 max-w-3xl mx-auto">
      {items.map((item, i) => (
        <details
          key={i}
          name={idPrefix}
          className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-brand-orange transition-colors"
        >
          <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            <h3 className="text-sm sm:text-base font-extrabold text-gray-900 font-display uppercase tracking-wide pr-2">
              {item.q}
            </h3>
            <span className="shrink-0 w-8 h-8 rounded-full border-2 border-brand-orange text-brand-orange flex items-center justify-center transition-transform duration-300 group-open:rotate-45">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </summary>
          <div className="px-5 pb-5">
            <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
          </div>
        </details>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  CTA band                                                           */
/* ------------------------------------------------------------------ */
export function CtaBand({
  heading = 'Ready for a new floor?',
  subheading = 'Free home survey and a written quote with no obligation. Based in Bolton, covering the North West and fitting nationwide.',
  primaryLabel = 'Book Free Home Survey',
  secondaryLabel = 'Call the team',
}) {
  return (
    <section className="py-14 lg:py-20 bg-white border-t border-brand-borderLight">
      <div className="w-[90%] max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#111111] text-white relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-[420px] h-[240px] bg-brand-orange/15 blur-[120px] rounded-full pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 text-center lg:text-left">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-4xl font-extrabold font-display uppercase tracking-tight">
                {heading}
              </h2>
              <p className="mt-3 text-sm text-neutral-400 leading-relaxed">{subheading}</p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <Link
                to="/contact"
                className="bg-brand-orange hover:bg-brand-orangeHover text-white font-extrabold px-7 py-4 rounded-xl shadow-glow-orange transition-all duration-300 transform hover:-translate-y-0.5 text-sm text-center whitespace-nowrap"
              >
                {primaryLabel}
              </Link>
              <a
                href={`tel:${SITE.phone}`}
                className="px-7 py-4 rounded-xl border-2 border-neutral-700 hover:border-brand-orange text-white font-bold text-sm transition-colors text-center whitespace-nowrap"
              >
                {secondaryLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Star rating                                                        */
/* ------------------------------------------------------------------ */
export function Stars({ count = 5, className = 'w-4 h-4' }) {
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`${className} ${i < count ? 'text-brand-orange' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.36 4.18a1 1 0 00.95.69h4.4c.97 0 1.37 1.24.59 1.81l-3.56 2.58a1 1 0 00-.36 1.11l1.36 4.18c.3.92-.76 1.69-1.54 1.11l-3.56-2.58a1 1 0 00-1.18 0l-3.56 2.58c-.78.58-1.84-.19-1.54-1.11l1.36-4.18a1 1 0 00-.36-1.11L1.75 9.61c-.78-.57-.38-1.81.59-1.81h4.4a1 1 0 00.95-.69l1.36-4.18z" />
        </svg>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Primary CTA button pair                                            */
/* ------------------------------------------------------------------ */
export function PrimaryActions({ className = '' }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-4 ${className}`}>
      <Link
        to="/contact"
        className="bg-brand-orange hover:bg-brand-orangeHover text-white font-extrabold px-8 py-4 rounded-xl shadow-glow-orange transition-all duration-300 transform hover:-translate-y-1 text-base flex items-center gap-2"
      >
        Book Free Home Survey
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>
      <a
        href={SITE.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white hover:bg-gray-50 text-gray-900 font-bold px-7 py-4 rounded-xl border-2 border-gray-300 hover:border-brand-orange transition-all duration-300 flex items-center gap-2.5 shadow-sm"
      >
        <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z" />
        </svg>
        WhatsApp Direct
      </a>
    </div>
  )
}
