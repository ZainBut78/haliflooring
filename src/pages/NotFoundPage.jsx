import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { useHead } from '../components/Seo'
import { services, serviceSlugs, SITE } from '../data/content'

export default function NotFoundPage() {
  useHead({
    h1: 'Page Not Found',
    noindex: true,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Page not found',
    },
  })

  return (
    <Layout showHighway={false}>
      <section className="relative pt-36 pb-20 lg:pt-44 lg:pb-28 bg-gradient-to-b from-brand-grayBg via-white to-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-orange/10 blur-[140px] rounded-full animate-glow" />
        </div>

        <div className="relative z-10 w-[90%] max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <p className="font-display font-black text-brand-orange text-6xl sm:text-8xl leading-none">404</p>
          <h1 className="mt-4 text-2xl sm:text-4xl font-extrabold font-display uppercase tracking-tight text-[#111111]">
            This page has gone missing
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
            The page you were looking for is not here. It may have moved, or the link may have been mistyped. Try
            one of these instead.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link
              to="/"
              className="bg-brand-orange hover:bg-brand-orangeHover text-white font-extrabold px-7 py-3.5 rounded-xl shadow-glow-orange transition-all transform hover:-translate-y-0.5 text-sm"
            >
              Back to Home
            </Link>
            <Link
              to="/work"
              className="px-7 py-3.5 rounded-xl border-2 border-gray-300 hover:border-brand-orange text-gray-800 font-bold text-sm transition-colors"
            >
              See Our Work
            </Link>
            <Link
              to="/contact"
              className="px-7 py-3.5 rounded-xl border-2 border-gray-300 hover:border-brand-orange text-gray-800 font-bold text-sm transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Useful links so a 404 still has onward navigation for crawlers */}
      <section className="py-12 lg:py-16 bg-white border-t border-brand-borderLight">
        <div className="w-[90%] max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-sm font-extrabold font-display uppercase tracking-wider text-gray-500">
            Or start here
          </h2>
          <div className="mt-5 flex flex-wrap gap-2.5 justify-center">
            {serviceSlugs.map((slug) => (
              <Link
                key={slug}
                to={`/services/${slug}`}
                className="px-4 py-2.5 rounded-xl bg-brand-grayBg border border-gray-200 text-sm font-bold text-gray-700 hover:border-brand-orange hover:text-brand-orange transition-colors"
              >
                {services[slug].navLabel}
              </Link>
            ))}
          </div>
          <p className="mt-8 text-sm text-gray-600">
            Need something that is not listed?{' '}
            <a href={`tel:${SITE.phone}`} className="text-brand-orange font-bold hover:underline">
              Call {SITE.phoneDisplay}
            </a>
          </p>
        </div>
      </section>
    </Layout>
  )
}
