import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import ResponsiveImage from '../components/ResponsiveImage'
import { useHead } from '../components/Seo'
import { PageHero, CtaBand, PrimaryActions, Stars, Breadcrumbs } from '../components/ui'
import { projects, projectCategories, testimonials, SITE } from '../data/content'

export default function WorkPage() {
  // All projects are rendered into the static HTML. The category buttons only
  // toggle visibility on the client, so crawlers always see the full set.
  const [active, setActive] = useState('all')

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

  const visible = active === 'all' ? projects : projects.filter((p) => p.category === active)

  return (
    <Layout>
      <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Our Work' }]} />
      <PageHero
        eyebrow="Portfolio of completed projects"
        heading="Our Work"
        subheading="Real installations across the North West — from luxury herringbone LVT in modern open-plan kitchens to bespoke wool stair runners in period properties and fully welded safety flooring in care homes. Every project gets the same meticulous attention to detail."
      >
        <PrimaryActions />
      </PageHero>

      {/* Filter bar */}
      <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-md border-y border-brand-borderLight">
        <div className="w-[90%] max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap gap-2 justify-center" role="group" aria-label="Filter projects by category">
            {projectCategories.map((cat) => {
              const count = cat.id === 'all' ? projects.length : projects.filter((p) => p.category === cat.id).length
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
