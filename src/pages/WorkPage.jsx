import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import ResponsiveImage from '../components/ResponsiveImage'
import { useHead } from '../components/Seo'
import { PageHero, CtaBand, PrimaryActions, Stars } from '../components/ui'
import { testimonials, beforeAfter, rangeGallery, SITE } from '../data/content'

export default function WorkPage() {
  useHead({
    h1: 'Our Flooring Work & Completed Projects',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Our Work',
      url: `${SITE.url}/work`,
    },
  })

  return (
    <Layout>
      <PageHero
        eyebrow="Portfolio of completed projects"
        heading="Our Work"
        subheading={[
          "Take a look at some of our recent flooring projects across the North West. From stylish LVT and beautifully fitted carpets to commercial safety flooring, each installation showcases the quality of our workmanship and attention to detail.",
          "Every project is different, and we take pride in delivering a professional finish that our customers can be proud of.",
        ]}
      >
        <PrimaryActions />
      </PageHero>

      {/* Before & after */}
      <section id="before-after" className="py-14 lg:py-20 bg-white">
        <div className="w-[90%] max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-12">
            <span className="text-brand-orange font-bold text-xs uppercase tracking-widest bg-brand-orange/10 px-3 py-1 rounded-full border border-brand-orange/20">
              Transformations
            </span>
            <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold text-[#111111] font-display uppercase tracking-tight">
              Gallery
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {beforeAfter.map((item, i) => (
              <figure
                key={item.id}
                className={`group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-brand-orange transition-colors ${
                  i === 0 ? 'lg:col-span-2' : ''
                }`}
              >
                {/* Photos differ in shape (square and portrait), so each card uses a fixed
                    frame and a centre crop. That keeps the three captions level. */}
                <div className={`bg-gray-100 overflow-hidden ${i === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
                  <ResponsiveImage
                    image={item.image}
                    alt={item.alt}
                    sizes={i === 0 ? '(min-width: 1024px) 1200px, 100vw' : '(min-width: 1024px) 50vw, 100vw'}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                </div>
                {(item.heading || item.text) && <figcaption className="p-5 sm:p-6">
                  <h3 className="text-center text-base sm:text-lg font-extrabold text-gray-900 font-display uppercase tracking-wide">
                    {item.heading}
                  </h3>
                  {item.text?.trim() && <p className="mt-2 text-sm text-gray-600 leading-relaxed">{item.text}</p>}
                </figcaption>}
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* The range we fit */}
      <section className="py-14 lg:py-20 bg-brand-grayBg border-y border-brand-borderLight">
        <div className="w-[90%] max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-12">
            <span className="text-brand-orange font-bold text-xs uppercase tracking-widest bg-brand-orange/10 px-3 py-1 rounded-full border border-brand-orange/20">
              What we fit
            </span>
            <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold text-[#111111] font-display uppercase tracking-tight">
              Flooring for Every Space
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
              A look at the floors we supply and install, from luxury vinyl and engineered wood to plush carpets,
              commercial vinyl and artificial grass.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {rangeGallery.map((item) => (
              <article
                key={item.id ?? item.slug}
                className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-brand-orange hover:shadow-card-hover transition-all duration-300 flex flex-col"
              >
                <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                  <ResponsiveImage
                    image={item.image}
                    alt={`${item.title} installation`}
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className={item.imageFit === 'contain' ? 'h-full w-full object-contain' : 'h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out'}
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-sm font-extrabold text-gray-900 font-display uppercase tracking-wide">
                    <Link
                      to={`/services/${item.slug}`}
                      className="hover:text-brand-orange transition-colors after:absolute after:inset-0 after:content-['']"
                    >
                      {item.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed flex-1">{item.text}</p>
                  <span className="pointer-events-none mt-4 text-xs font-bold text-brand-orange">View service →</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-14 lg:py-20 bg-brand-grayBg border-y border-brand-borderLight">
        <div className="w-[90%] max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#111111] font-display uppercase tracking-tight text-center mb-10">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <figure key={t.name} className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col">
                <Stars />
                <blockquote className="mt-4 text-sm text-gray-700 leading-relaxed flex-1">“{t.quote}”</blockquote>
                <figcaption className="mt-5 pt-4 border-t border-gray-100">
                  <span className="block text-sm font-extrabold text-gray-900">{t.name}</span>
                  <span className="block text-xs text-gray-500 mt-0.5">
                    {t.location} · {t.project}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage strip */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="w-[90%] max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#111111] font-display uppercase tracking-tight">
            We Cover Nationwide
          </h2>
          <p className="mt-3 text-sm text-gray-600 max-w-2xl mx-auto">
            Based in the North West, fitting wherever you are. The home survey is always free.
          </p>
        </div>
      </section>

      <CtaBand
        heading="Like what you see?"
        subheading="Every project on this page started with a free home survey. Book yours and we will bring the samples to you."
      />
    </Layout>
  )
}
