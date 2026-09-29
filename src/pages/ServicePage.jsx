import React from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { useRouteParams } from '../components/RouteParams'
import Layout from '../components/Layout'
import ResponsiveImage from '../components/ResponsiveImage'
import { useHead } from '../components/Seo'
import { Breadcrumbs, PageHero, SectionHeading, FaqAccordion, CtaBand, PrimaryActions } from '../components/ui'
import { services, serviceSlugs, imagePool, SITE } from '../data/content'

export default function ServicePage() {
  const { service: slug } = useRouteParams()
  const service = services[slug]

  useHead(
    service && {
      h1: `${service.name} in Bolton & Across the North West`,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.name,
        serviceType: service.name,
        description: service.metaDescription,
        provider: { '@type': 'LocalBusiness', name: SITE.name, '@id': `${SITE.url}/#business` },
        areaServed: { '@type': 'AdministrativeArea', name: 'North West, United Kingdom' },
        url: `${SITE.url}/services/${slug}`,
      },
    }
  )

  // Unknown service slug → hard redirect (keeps the sitemap free of soft 404s)
  if (!service) {
    return <Navigate to="/404" replace />
  }

  const others = serviceSlugs.filter((s) => s !== slug)

  return (
    <Layout>
      <Breadcrumbs
        items={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: service.navLabel },
        ]}
      />

      <PageHero eyebrow="Free survey & laser measure" heading={service.heroHeading} subheading={service.intro}>
        <PrimaryActions />
      </PageHero>

      {/* Why it matters */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="w-[90%] max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display uppercase tracking-tight text-[#111111]">
                What you get with {service.navLabel.toLowerCase()}
              </h2>
              <p className="mt-4 text-sm text-gray-600 leading-relaxed">{service.intro}</p>
              <ul className="mt-6 space-y-3">
                {[
                  'Free home survey and laser measure of every room',
                  'Written, itemised quote with no obligation',
                  'Old floor removal and disposal included',
                  'Fully insured installers with comprehensive guarantees',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-brand-orange text-white flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3.5" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2 grid grid-cols-2 gap-4">
              <figure className="rounded-2xl overflow-hidden bg-gray-100 aspect-square">
                <ResponsiveImage
                  image={imagePool[0]}
                  alt={`${service.name} installation by ${SITE.name}`}
                  sizes="(min-width: 1024px) 420px, 50vw"
                  className="h-full w-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                />
              </figure>
              <figure className="rounded-2xl overflow-hidden bg-gray-100 aspect-square mt-6">
                <ResponsiveImage
                  image={imagePool[3]}
                  alt={`${service.name} project detail`}
                  sizes="(min-width: 1024px) 420px, 50vw"
                  className="h-full w-full object-cover"
                />
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section className="py-14 lg:py-20 bg-brand-grayBg border-y border-brand-borderLight">
        <div className="w-[90%] max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={`${service.navLabel} specialists`}
            heading="What makes the difference"
            subheading={service.sellingPoint}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {service.features.map((feature, i) => (
              <div
                key={feature.title}
                className="group bg-white border border-gray-200 hover:border-brand-orange rounded-2xl p-6 transition-all duration-300 hover:shadow-card-hover"
              >
                <span className="inline-flex w-9 h-9 rounded-full bg-orange-50 text-brand-orange items-center justify-center font-display font-black text-sm group-hover:bg-brand-orange group-hover:text-white transition-colors">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 text-base font-extrabold text-gray-900 font-display uppercase tracking-wide">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="w-[90%] max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Answers"
            heading={`${service.navLabel} FAQs`}
            subheading={service.faqNote}
          />
          <FaqAccordion items={service.faqs} idPrefix={`faq-${slug}`} />

          <div className="mt-8 text-center">
            <Link to="/work" className="text-sm font-bold text-brand-orange hover:underline">
              See completed {service.navLabel.toLowerCase()} projects →
            </Link>
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="py-12 lg:py-16 bg-white border-t border-brand-borderLight">
        <div className="w-[90%] max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-extrabold font-display uppercase tracking-tight text-[#111111] mb-6">
            Other services
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {others.map((s) => (
              <Link
                key={s}
                to={`/services/${s}`}
                className="px-4 py-2.5 rounded-xl bg-brand-grayBg border border-gray-200 text-sm font-bold text-gray-700 hover:border-brand-orange hover:text-brand-orange transition-colors"
              >
                {services[s].navLabel}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        heading={`Book your free ${service.navLabel.toLowerCase()} survey`}
        subheading="Free home survey, free laser measure and a written quote with no obligation. We cover ten areas around Bolton."
        primaryLabel="Get My Free Quote"
      />
    </Layout>
  )
}
