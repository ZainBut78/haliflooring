import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import ResponsiveImage from '../components/ResponsiveImage'
import { useHead } from '../components/Seo'
import { Breadcrumbs, PageHero, SectionHeading, CtaBand, PrimaryActions } from '../components/ui'
import { processSteps, services, serviceSlugs, imagePool, SITE } from '../data/content'

// Short, factual reasons to choose us. Nothing here depends on a number or a
// certificate that has to be proved, so it stays true as the business grows.
const reasons = [
  {
    t: 'Free home survey',
    d: 'We come to you, talk through the room, take measurements and bring samples so you can see them in your own light.',
  },
  {
    t: 'Wide choice, honest advice',
    d: 'Carpets, LVT, wood, laminate, vinyl and more. We recommend what suits the room and your budget, not the most expensive option.',
  },
  {
    t: 'Careful fitting',
    d: 'Experienced fitters who prepare the floor properly, work tidily and leave the room clean.',
  },
  {
    t: 'Clear written quotes',
    d: 'An itemised quote with no obligation, so you know what you are paying for before any work starts.',
  },
  {
    t: 'Homes and businesses',
    d: 'From a single hallway to shops, offices, kitchens and care settings, we supply and fit for both.',
  },
  {
    t: 'Local to the North West',
    d: 'Based in Bolton with a showroom to visit, covering the North West and fitting nationwide.',
  },
]

export default function AboutPage() {
  useHead({
    h1: 'About Hali Flooring — Flooring Specialists in Bolton & the North West',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About Hali Flooring',
      url: `${SITE.url}/about`,
      mainEntity: { '@id': `${SITE.url}/#business` },
    },
  })

  return (
    <Layout>
      <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'About' }]} />

      <PageHero
        eyebrow="Your local flooring specialists"
        heading="About Us"
        subheading="Hali Flooring supplies and fits quality flooring for homes and businesses across the North West. Visit our Bolton showroom, or book a free home survey and we will bring the samples to you."
      >
        <PrimaryActions />
      </PageHero>

      {/* Who we are */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="w-[90%] max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange bg-brand-orange/10 px-3.5 py-1 rounded-full border border-brand-orange/20 inline-block">
                Who we are
              </span>
              <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold font-display uppercase tracking-tight text-[#111111]">
                Flooring made simple
              </h2>
              <div className="mt-5 space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed">
                <p>
                  Choosing a new floor should be exciting, not stressful. At {SITE.name} we make it simple: we help
                  you pick the right floor for the room, give you a clear price, and fit it properly.
                </p>
                <p>
                  We are based in Bolton and work with homeowners, landlords, shops, offices and care providers
                  across the North West. Whether it is a carpet for the bedrooms, LVT for the kitchen or safety
                  flooring for a commercial space, you get the same friendly advice and careful workmanship.
                </p>
                <p>
                  Not sure where to start? Book a free home survey. We will talk through your ideas, measure up and
                  bring samples to your door, then put everything in a written quote with no obligation.
                </p>
              </div>
            </div>
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <figure className="rounded-2xl overflow-hidden bg-gray-100 aspect-[3/4]">
                <ResponsiveImage
                  image={imagePool[4]}
                  alt={`${SITE.name} flooring installation`}
                  sizes="(min-width: 1024px) 300px, 50vw"
                  className="h-full w-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                />
              </figure>
              <figure className="rounded-2xl overflow-hidden bg-gray-100 aspect-[3/4] mt-8">
                <ResponsiveImage
                  image={imagePool[5]}
                  alt={`${SITE.name} showroom flooring display`}
                  sizes="(min-width: 1024px) 300px, 50vw"
                  className="h-full w-full object-cover"
                />
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="py-14 lg:py-20 bg-brand-grayBg border-y border-brand-borderLight">
        <div className="w-[90%] max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What we do"
            heading="Supply and fit, start to finish"
            subheading="One team to choose, supply and fit your new floor."
          />
          <div className="flex flex-wrap gap-2.5 justify-center">
            {serviceSlugs.map((slug) => (
              <Link
                key={slug}
                to={`/services/${slug}`}
                className="px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm font-bold text-gray-700 hover:border-brand-orange hover:text-brand-orange transition-colors"
              >
                {services[slug].navLabel}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="w-[90%] max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Why choose us" heading="What you can expect" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {reasons.map((r, i) => (
              <div
                key={r.t}
                className="bg-brand-grayBg border border-brand-borderLight hover:border-brand-orange rounded-2xl p-6 transition-colors"
              >
                <span className="font-display font-black text-brand-orange text-sm">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-2 text-base font-extrabold text-gray-900 font-display uppercase tracking-wide">{r.t}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{r.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-14 lg:py-20 bg-[#111111] text-white">
        <div className="w-[90%] max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display uppercase tracking-tight text-center mb-10">
            See It · Measure It · Fit It
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {processSteps.map((s) => (
              <div key={s.step} className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6">
                <span className="inline-block text-[10px] font-mono uppercase tracking-[0.2em] text-brand-orange font-bold">
                  Step {s.step}
                </span>
                <h3 className="mt-2 text-xl font-extrabold font-display uppercase tracking-wide">{s.title}</h3>
                <p className="mt-2 text-sm text-neutral-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        heading="Come and see us"
        subheading="Visit the showroom or book a free home survey. We will talk through your options and put a clear quote in writing."
      />
    </Layout>
  )
}
