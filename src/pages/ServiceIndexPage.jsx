import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { useHead } from '../components/Seo'
import { Breadcrumbs, PageHero, CtaBand, PrimaryActions } from '../components/ui'
import { services, serviceSlugs, projects, areas, SITE } from '../data/content'

const serviceIcons = {
  lvt: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z',
  wood: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
  carpet: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
  laminate: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  commercial: 'M3 21h18M5 21V7l7-4 7 4v14M9 9h1m-1 4h1m-1 4h1m4-8h1m-1 4h1m-1 4h1',
  subfloor: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z',
}

export default function ServiceIndexPage() {
  useHead({
    h1: 'Our Flooring Services',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Flooring services',
      itemListElement: serviceSlugs.map((slug, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: services[slug].name,
        url: `${SITE.url}/services/${slug}`,
      })),
    },
  })

  return (
    <Layout>
      <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Services' }]} />

      <PageHero
        eyebrow="Six flooring services, one installer"
        heading="Our Services"
        subheading="From luxury vinyl tile to commercial safety flooring, everything is fitted by our own fully insured installers — not subcontracted. Every job starts with a free home survey and a written quote."
      >
        <PrimaryActions />
      </PageHero>

      {/* Service cards */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="w-[90%] max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {serviceSlugs.map((slug) => {
              const service = services[slug]
              const projectCount = projects.filter((p) => p.category === slug).length
              return (
                <article
                  key={slug}
                  className="group flex flex-col bg-white border border-gray-200 hover:border-brand-orange rounded-2xl p-6 sm:p-7 transition-all duration-300 hover:shadow-card-hover"
                >
                  <span className="inline-flex w-12 h-12 rounded-full bg-orange-50 text-brand-orange items-center justify-center shrink-0 group-hover:bg-brand-orange group-hover:text-white transition-colors duration-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d={serviceIcons[slug]} />
                    </svg>
                  </span>
                  <h2 className="mt-5 text-lg font-extrabold text-gray-900 font-display uppercase tracking-wide">
                    <Link
                      to={`/services/${slug}`}
                      className="hover:text-brand-orange transition-colors after:absolute after:inset-0 after:content-['']"
                    >
                      {service.name}
                    </Link>
                  </h2>
                  <p className="mt-2.5 text-sm text-gray-600 leading-relaxed flex-1">
                    {service.listBlurb}.
                  </p>
                  <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-gray-500">
                      {projectCount > 0 ? `${projectCount} project${projectCount > 1 ? 's' : ''} in gallery` : 'Ask about availability'}
                    </span>
                    <span className="text-brand-orange font-bold group-hover:translate-x-0.5 transition-transform">
                      Learn more →
                    </span>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-14 lg:py-20 bg-brand-grayBg border-y border-brand-borderLight">
        <div className="w-[90%] max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display uppercase tracking-tight text-[#111111] text-center mb-10">
            How Every Job Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { n: '01', t: 'See It', d: 'Visit the Bolton showroom or have the mobile van come to you, with full-size samples under real home lighting.' },
              { n: '02', t: 'Measure It', d: 'Free laser survey of every room and a written, itemised quote. No obligation and no pressure.' },
              { n: '03', t: 'Fit It', d: 'Our own installers fit your floor, clean up, and hand it over with full guarantees in place.' },
            ].map((step) => (
              <div key={step.n} className="bg-white border border-gray-200 hover:border-brand-orange rounded-2xl p-6 transition-colors">
                <span className="font-display font-black text-brand-orange text-sm tracking-widest">{step.n}</span>
                <h3 className="mt-2 text-lg font-extrabold text-gray-900 font-display uppercase tracking-wide">{step.t}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="w-[90%] max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl sm:text-2xl font-extrabold font-display uppercase tracking-tight text-[#111111]">
            Where We Work
          </h2>
          <p className="mt-3 text-sm text-gray-600 max-w-2xl mx-auto">
            Ten areas around Bolton, covered by our own branded mobile vans. The survey is free everywhere.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            {areas.map((a) => (
              <span
                key={a.name}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border ${
                  a.highlight ? 'bg-brand-orange text-white border-brand-orange' : 'bg-brand-grayBg border-gray-200 text-gray-700'
                }`}
              >
                {a.name.replace(/📍\s*/, '')}
              </span>
            ))}
          </div>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orangeHover text-white font-extrabold px-7 py-3.5 rounded-xl shadow-glow-orange transition-all transform hover:-translate-y-0.5 text-sm"
          >
            Check if we cover you
          </Link>
        </div>
      </section>

      <CtaBand
        heading="Not sure which floor?"
        subheading="Tell us about the room and how you live, and we will tell you honestly which floor suits — even if that is the cheaper option."
        primaryLabel="Ask an Installer"
      />
    </Layout>
  )
}
