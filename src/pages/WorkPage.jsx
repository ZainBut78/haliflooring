import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import ResponsiveImage from '../components/ResponsiveImage'
import { useHead } from '../components/Seo'
import { PageHero, CtaBand, PrimaryActions, Stars } from '../components/ui'
import { projects, projectCategories, testimonials, beforeAfter, rangeGallery, SITE } from '../data/content'

// The carpets & runners job and the herringbone laminate job are not listed in
// the Recent Projects grid for now. Their detail pages stay online.
const hiddenProjects = ['worsley-manor-custom-runner', 'bury-home-laminate-herringbone']

export default function WorkPage() {
  // All projects are rendered into the static HTML. The category buttons only
  // toggle visibility on the client, so crawlers always see the full set.
  const [active, setActive] = useState('all')

  const galleryProjects = projects.filter((p) => !hiddenProjects.includes(p.slug))

  useHead({
    h1: 'Our Flooring Work & Completed Projects',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Our Work',
      url: `${SITE.url}/work`,
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: projects.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${SITE.url}/work/${p.slug}`,
          name: p.title,
        })),
      },
    },
  })

  const visible = active === 'all' ? galleryProjects : galleryProjects.filter((p) => p.category === active)

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
              Before &amp; After
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
              See the difference a proper installation makes. From bare screed and unfinished stairs to beautifully
              finished floors, here are some of our recent transformations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {beforeAfter.map((item, i) => (
              <figure
                key={item.id}
                className={`group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-brand-orange transition-colors ${
                  i === 0 ? 'lg:col-span-2' : ''
                }`}
              >
                {/* The two half-width cards share one image ratio, so their captions
                    start at the same height even though the photos differ slightly. */}
                <div className={`bg-gray-100 ${i === 0 ? '' : 'aspect-[16/9]'}`}>
                  <ResponsiveImage
                    image={item.image}
                    alt={item.alt}
                    sizes={i === 0 ? '(min-width: 1024px) 1200px, 100vw' : '(min-width: 1024px) 50vw, 100vw'}
                    className={i === 0 ? 'w-full h-auto' : 'h-full w-full object-contain'}
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

      {/* Filter bar */}
      <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-md border-y border-brand-borderLight">
        <div className="w-[90%] max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap gap-2 justify-center" role="group" aria-label="Filter projects by category">
            {projectCategories.map((cat) => {
              const count = cat.id === 'all' ? galleryProjects.length : galleryProjects.filter((p) => p.category === cat.id).length
              if (cat.id !== 'all' && count === 0) return null
              const isActive = active === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setActive(cat.id)}
                  aria-pressed={isActive}
                  className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wide transition-all ${
                    isActive
                      ? 'bg-brand-orange text-white shadow-sm'
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-brand-orange hover:text-brand-orange'
                  }`}
                >
                  {cat.label}
                  <span className={`ml-1.5 ${isActive ? 'text-white' : 'text-gray-600'}`}>({count})</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Project grid */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="w-[90%] max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#111111] font-display uppercase tracking-tight text-center mb-10">
            Recent Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {visible.map((proj) => (
              <article
                key={proj.slug}
                className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-brand-orange transition-all duration-300 hover:shadow-card-hover flex flex-col"
              >
                <Link
                  to={`/work/${proj.slug}`}
                  className="relative block h-52 sm:h-60 overflow-hidden bg-gray-100"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <ResponsiveImage
                    image={proj.images[0]}
                    alt={proj.title}
                    sizes="(min-width: 1024px) 34vw, (min-width: 640px) 50vw, 100vw"
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm text-white font-mono text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {proj.categoryLabel}
                  </span>
                  <span className="absolute bottom-3 left-3 bg-brand-orange text-white font-mono text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {proj.location}
                  </span>
                </Link>

                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  <h2 className="text-base sm:text-lg font-extrabold text-gray-900 font-display uppercase tracking-wide leading-snug">
                    <Link
                      to={`/work/${proj.slug}`}
                      className="hover:text-brand-orange transition-colors after:absolute after:inset-0 after:content-['']"
                    >
                      {proj.title}
                    </Link>
                  </h2>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed line-clamp-3 flex-1">{proj.excerpt}</p>

                  <dl className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <dt className="text-gray-600 uppercase tracking-wider font-bold text-[10px]">Area</dt>
                      <dd className="text-gray-800 font-semibold mt-0.5">{proj.specs.Area}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-600 uppercase tracking-wider font-bold text-[10px]">Duration</dt>
                      <dd className="text-gray-800 font-semibold mt-0.5">{proj.specs.Duration}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            ))}
          </div>

          {visible.length === 0 && (
            <p className="text-center text-gray-500 py-16 text-sm">No projects in this category yet.</p>
          )}
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
