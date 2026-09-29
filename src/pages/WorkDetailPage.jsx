import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useRouteParams } from '../components/RouteParams'
import Layout from '../components/Layout'
import ResponsiveImage from '../components/ResponsiveImage'
import { useHead } from '../components/Seo'
import { Breadcrumbs, CtaBand, Stars } from '../components/ui'
import { projects, services, SITE } from '../data/content'

export default function WorkDetailPage() {
  const { slug } = useRouteParams()
  const project = projects.find((p) => p.slug === slug)

  useHead(
    project && {
      h1: project.title,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: project.title,
        description: project.metaDescription,
        image: project.images,
        about: (services[project.category] || services.lvt).name,
        locationCreated: project.location,
        dateCreated: '2025-01-01',
        creator: { '@type': 'Organization', name: SITE.name },
      },
    }
  )

  if (!project) {
    return (
      <Layout>
        <div className="pt-40 pb-24 text-center w-[90%] max-w-2xl mx-auto">
          <h1 className="text-3xl font-extrabold font-display uppercase text-gray-900">Project not found</h1>
          <p className="mt-4 text-sm text-gray-600">
            That project does not exist or has moved. Browse the full gallery instead.
          </p>
          <Link
            to="/work"
            className="mt-8 inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orangeHover text-white font-extrabold px-7 py-3.5 rounded-xl shadow-glow-orange transition-all"
          >
            Back to Our Work
          </Link>
        </div>
      </Layout>
    )
  }

  const related = projects.filter((p) => p.category === project.category && p.slug !== project.slug).slice(0, 3)
  const service = services[project.category] || services[project.category === 'commercial' ? 'commercial' : 'lvt']

  const specEntries = Object.entries(project.specs)

  return (
    <Layout>
      <Breadcrumbs
        items={[
          { name: 'Home', path: '/' },
          { name: 'Our Work', path: '/work' },
          { name: project.categoryLabel, path: '/work' },
          { name: project.title },
        ]}
      />

      {/* Hero */}
      <section className="relative pt-8 pb-12 lg:pt-12 lg:pb-16 bg-white">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none [mask-image:radial-gradient(ellipse_80%_65%_at_50%_40%,#000_70%,transparent_100%)]"
        >
          <svg className="w-full h-full opacity-[0.05]" fill="none" preserveAspectRatio="none" stroke="currentColor" viewBox="0 0 1600 900">
            <defs>
              <pattern id="herringbonePatternProject" patternUnits="userSpaceOnUse" width="120" height="120">
                <path className="hb-plank-anim-1" d="M0,30 L30,0 L60,30 L30,60 Z" stroke="#E07E0C" strokeDasharray="120" strokeWidth="1.25" />
                <path className="hb-plank-anim-2" d="M30,60 L60,30 L90,60 L60,90 Z" stroke="#111111" strokeDasharray="120" strokeWidth="1.1" />
                <path className="hb-plank-anim-3" d="M60,90 L90,60 L120,90 L90,120 Z" stroke="#E07E0C" strokeDasharray="120" strokeWidth="1.25" />
                <path className="hb-plank-anim-4" d="M0,90 L30,60 L60,90 L30,120 Z" stroke="#111111" strokeDasharray="120" strokeWidth="1.1" />
                <path className="hb-plank-anim-1" d="M60,30 L90,0 L120,30 L90,60 Z" stroke="#111111" strokeDasharray="120" strokeWidth="1.1" />
                <line x1="0" y1="0" x2="120" y2="120" stroke="#E2E2E2" strokeWidth="0.75" />
                <line x1="120" y1="0" x2="0" y2="120" stroke="#E2E2E2" strokeWidth="0.75" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#herringbonePatternProject)" />
          </svg>
        </div>
        <div className="relative z-10 w-[90%] max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/25 text-xs font-bold text-brand-orange uppercase tracking-wider">
              {project.categoryLabel}
            </span>
            <h1 className="mt-4 text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111111] leading-[1.12] font-display uppercase">
              {project.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-600">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-brand-orange" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {project.location}
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-brand-orange" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {project.duration}
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-brand-orange" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 5h16v14H4z" />
                </svg>
                {project.specs.Area}
              </span>
            </div>
            <p className="mt-5 text-base text-gray-700 leading-relaxed max-w-3xl">{project.excerpt}</p>
          </div>
        </div>
      </section>

      {/* Main image */}
      <section className="pb-12 lg:pb-16 bg-white">
        <div className="w-[90%] max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
          <figure className="relative rounded-3xl overflow-hidden shadow-2xl bg-gray-100 aspect-[16/10]">
            <ResponsiveImage
              image={project.images[0]}
              alt={project.title}
              sizes="(min-width: 1680px) 1512px, 90vw"
              className="h-full w-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
          </figure>
        </div>
      </section>

      {/* Challenge / Solution */}
      <section className="py-12 lg:py-16 bg-brand-grayBg border-y border-brand-borderLight">
        <div className="w-[90%] max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
              <span className="inline-block text-[10px] font-mono uppercase tracking-[0.2em] text-brand-orange font-bold">
                The Challenge
              </span>
              <h2 className="mt-3 text-xl sm:text-2xl font-extrabold font-display uppercase text-gray-900">
                What we walked into
              </h2>
              <p className="mt-4 text-sm text-gray-600 leading-relaxed">{project.challenge}</p>
            </div>
            <div className="bg-white rounded-2xl border border-brand-orange/40 p-6 sm:p-8 shadow-card-clean">
              <span className="inline-block text-[10px] font-mono uppercase tracking-[0.2em] text-brand-orange font-bold">
                The Solution
              </span>
              <h2 className="mt-3 text-xl sm:text-2xl font-extrabold font-display uppercase text-gray-900">
                What we did about it
              </h2>
              <p className="mt-4 text-sm text-gray-600 leading-relaxed">{project.solution}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="w-[90%] max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7">
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display uppercase tracking-tight text-[#111111]">
                Project Specification
              </h2>
              <dl className="mt-6 divide-y divide-gray-100 border-y border-gray-100">
                {specEntries.map(([key, value]) => (
                  <div key={key} className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 py-3.5">
                    <dt className="text-xs uppercase tracking-wider font-bold text-gray-600">{key}</dt>
                    <dd className="text-sm font-semibold text-gray-900 sm:col-span-2">{value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 p-5 rounded-2xl bg-orange-50 border border-brand-orange/25 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-extrabold text-gray-900 font-display uppercase">Considering a similar project?</h3>
                  <p className="text-xs text-gray-600 mt-1">
                    Free laser survey of every room, written quote, no obligation.
                  </p>
                </div>
                <Link
                  to="/contact"
                  className="shrink-0 bg-brand-orange hover:bg-brand-orangeHover text-white font-extrabold px-6 py-3 rounded-xl shadow-md transition-all text-sm text-center whitespace-nowrap"
                >
                  Book Free Survey
                </Link>
              </div>
            </div>

            {/* Gallery */}
            <div className="lg:col-span-5">
              <h2 className="text-lg font-extrabold font-display uppercase tracking-tight text-[#111111]">
                More From This Project
              </h2>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.images.slice(1).map((img, i) => (
                  <figure
                    key={i}
                    className={`relative rounded-2xl overflow-hidden bg-gray-100 ${
                      project.images.length === 2 && i === 0 ? 'sm:col-span-2' : ''
                    }`}
                  >
                    <ResponsiveImage
                      image={img}
                      alt={`${project.title} — installation image ${i + 2}`}
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="h-40 w-full object-cover sm:h-44"
                    />
                  </figure>
                ))}
              </div>
              <p className="mt-4 text-xs text-gray-500">
                {SITE.name} · {project.location} · {project.categoryLabel}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related projects */}
      {related.length > 0 && (
        <section className="py-12 lg:py-16 bg-brand-grayBg border-t border-brand-borderLight">
          <div className="w-[90%] max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold font-display uppercase tracking-tight text-[#111111] mb-8">
              More {project.categoryLabel} Projects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to={`/work/${p.slug}`}
                  className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-brand-orange transition-all duration-300"
                >
                  <div className="relative h-44 overflow-hidden bg-gray-100">
                    <ResponsiveImage
                      image={p.images[0]}
                      alt={p.title}
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-brand-orange font-bold">
                      {p.location}
                    </span>
                    <h3 className="mt-1.5 text-sm font-extrabold text-gray-900 group-hover:text-brand-orange transition-colors leading-snug">
                      {p.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        heading={`Want the ${project.title.toLowerCase()} in your own home?`}
        subheading={`Tell us the room and the look you have in mind — we will bring samples out, survey it at no cost, and put the price in writing. Based on what we installed in ${project.location}, we can size your job from the photos before we visit.`}
        primaryLabel="Book Free Home Survey"
      />
    </Layout>
  )
}
