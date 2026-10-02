import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { useHead } from '../components/Seo'
import { Breadcrumbs, PageHero, CtaBand, PrimaryActions } from '../components/ui'
import { services, serviceSlugs, SITE } from '../data/content'

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
        eyebrow="Supply & fit for homes and businesses"
        heading="Our Services"
        subheading="From luxury vinyl tile and carpets to commercial safety flooring and artificial grass, we supply and fit it all. Every job starts with a free home survey and a written quote."
      >
        <PrimaryActions />
      </PageHero>

      {/* Service cards */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="w-[90%] max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {serviceSlugs.map((slug) => {
              const service = services[slug]
              return (
                <article
                  key={slug}
                  className="group flex flex-col bg-white border border-gray-200 hover:border-brand-orange rounded-2xl p-6 sm:p-7 transition-all duration-300 hover:shadow-card-hover"
                >
                  <span className="inline-flex w-12 h-12 rounded-full bg-orange-50 text-brand-orange items-center justify-center shrink-0 group-hover:bg-brand-orange group-hover:text-white transition-colors duration-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d={service.icon} />
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
                    {service.listBlurb}
                  </p>
                  <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-end text-xs">
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
              { n: '01', t: 'See It', d: 'Visit our Bolton showroom, or book a free home survey and we will bring samples to you.' },
              { n: '02', t: 'Measure It', d: 'We survey and measure up, then send a written, itemised quote. No obligation and no pressure.' },
              { n: '03', t: 'Fit It', d: 'Our fitters install your floor neatly, clean up and hand it over.' },
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
            Based in Bolton and covering the North West, with fitting available in every town nationwide.
          </p>
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
        subheading="Tell us about the room and how you use it, and we will recommend the floor that suits it best."
        primaryLabel="Ask an Installer"
      />
    </Layout>
  )
}
