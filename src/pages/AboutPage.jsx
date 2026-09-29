import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import ResponsiveImage from '../components/ResponsiveImage'
import { useHead } from '../components/Seo'
import { Breadcrumbs, PageHero, SectionHeading, CtaBand, PrimaryActions, Stars } from '../components/ui'
import { stats, processSteps, areas, imagePool, testimonials, SITE } from '../data/content'

export default function AboutPage() {
  useHead({
    h1: 'About Hali Flooring — Family-Run Flooring Specialists in Bolton',
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
        eyebrow="Family-run since day one"
        heading="About Us"
        subheading="We are a Bolton-based flooring supply and installation company. Twenty-plus years, three thousand installations, and the same thing we had on day one: tell the customer the truth about what they actually need."
      >
        <PrimaryActions />
      </PageHero>

      {/* Stats */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="w-[90%] max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center p-6 rounded-2xl bg-brand-grayBg border border-brand-borderLight">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block text-3xl sm:text-4xl font-extrabold font-display text-brand-orange">{s.value}</span>
                  <span className="block mt-1.5 text-xs uppercase tracking-wider font-bold text-gray-500">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Story */}
      <section className="py-14 lg:py-20 bg-brand-grayBg border-y border-brand-borderLight">
        <div className="w-[90%] max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange bg-brand-orange/10 px-3.5 py-1 rounded-full border border-brand-orange/20 inline-block">
                Our Story
              </span>
              <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold font-display uppercase tracking-tight text-[#111111]">
                From a van with samples to a full installation team
              </h2>
              <div className="mt-5 space-y-4 text-sm text-gray-600 leading-relaxed">
                <p>
                  {SITE.name} started in Bolton with one van and a set of flooring samples. The idea was simple:
                  take the samples to the customer&rsquo;s house rather than asking them to come to a showroom,
                  because a floor looks completely different under the lighting you actually live in.
                </p>
                <p>
                  That mobile showroom is still the heart of the business. Every quote starts with a visit, every
                  room gets laser-measured before a single board is ordered, and the price we quote is the price
                  that appears on your invoice.
                </p>
                <p>
                  We have fitted over three thousand floors across Greater Manchester and Lancashire since then.
                  We still use our own installers rather than subcontracting, because the quality of a
                  herringbone floor is decided by whoever actually lays it. Our insurances are current, our
                  guarantees are written down, and we are happy to talk you out of a product that will not suit
                  the room.
                </p>
              </div>
            </div>
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <figure className="rounded-2xl overflow-hidden bg-gray-100 aspect-[3/4]">
                <ResponsiveImage
                  image={imagePool[4]}
                  alt={`${SITE.name} mobile showroom van at a customer home`}
                  sizes="(min-width: 1024px) 300px, 50vw"
                  className="h-full w-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                />
              </figure>
              <figure className="rounded-2xl overflow-hidden bg-gray-100 aspect-[3/4] mt-8">
                <ResponsiveImage
                  image={imagePool[5]}
                  alt={`${SITE.name} flooring showroom display`}
                  sizes="(min-width: 1024px) 300px, 50vw"
                  className="h-full w-full object-cover"
                />
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="w-[90%] max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="How we work"
            heading="Four things we will not compromise"
            subheading="These are the rules the whole team works to, and the reason most of our work comes from recommendations."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { t: 'Our own installers', d: 'We never subcontract installation. The person fitting your floor works for us and is trained by us.' },
              { t: 'Free laser measuring', d: 'Every room is laser-surveyed before ordering, so quantities are right and patterns line up.' },
              { t: 'One clear price', d: 'The quote you approve is the invoice you pay. No extras appearing halfway through the job.' },
              { t: 'Honest advice', d: 'If a cheaper floor suits the room better, we will say so. We would rather lose the sale than install the wrong floor.' },
            ].map((v, i) => (
              <div key={v.t} className="bg-brand-grayBg border border-brand-borderLight hover:border-brand-orange rounded-2xl p-6 transition-colors">
                <span className="font-display font-black text-brand-orange text-sm">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-2 text-base font-extrabold text-gray-900 font-display uppercase tracking-wide">{v.t}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{v.d}</p>
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
                  Phase {s.step}
                </span>
                <h3 className="mt-2 text-xl font-extrabold font-display uppercase tracking-wide">{s.title}</h3>
                <p className="mt-2 text-sm text-neutral-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="w-[90%] max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="In their words" heading="What clients tell us" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <figure key={t.name} className="bg-brand-grayBg border border-brand-borderLight rounded-2xl p-6 flex flex-col">
                <Stars />
                <blockquote className="mt-4 text-sm text-gray-700 leading-relaxed flex-1">“{t.quote}”</blockquote>
                <figcaption className="mt-5 pt-4 border-t border-brand-borderLight">
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

      {/* Coverage */}
      <section className="py-12 lg:py-16 bg-brand-grayBg border-t border-brand-borderLight">
        <div className="w-[90%] max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl sm:text-2xl font-extrabold font-display uppercase tracking-tight text-[#111111]">
            Ten areas, one team
          </h2>
          <p className="mt-3 text-sm text-gray-600 max-w-2xl mx-auto">
            Based in Bolton, working across Greater Manchester and Lancashire since day one.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            {areas.map((a) => (
              <span
                key={a.name}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border ${
                  a.highlight ? 'bg-brand-orange text-white border-brand-orange' : 'bg-white border-gray-200 text-gray-700'
                }`}
              >
                {a.name.replace(/📍\s*/, '')}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link
              to="/work"
              className="px-6 py-3.5 rounded-xl border-2 border-gray-300 hover:border-brand-orange text-gray-800 font-bold text-sm transition-colors"
            >
              See Our Work
            </Link>
            <Link
              to="/services"
              className="px-6 py-3.5 rounded-xl border-2 border-gray-300 hover:border-brand-orange text-gray-800 font-bold text-sm transition-colors"
            >
              All Services
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        heading="Come and see us"
        subheading="Book a free home survey. We bring the samples, measure every room properly, and put the quote in writing before anyone asks for a penny."
      />
    </Layout>
  )
}
