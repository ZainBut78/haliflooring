import React from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { useRouteParams } from '../components/RouteParams'
import Layout from '../components/Layout'
import { useHead } from '../components/Seo'
import { Breadcrumbs, PageHero } from '../components/ui'
import { SITE } from '../data/content'

const updated = '1 September 2026'

const privacySections = [
  {
    h: 'Who we are',
    p: [
      `${SITE.name} is a flooring supply and installation business based in ${SITE.address.line1}, ${SITE.address.line2}. For the purposes of UK data protection law we are the data controller for information submitted through our website forms.`,
      `You can reach us about your data at ${SITE.email} or on ${SITE.phoneDisplay}.`,
    ],
  },
  {
    h: 'What we collect',
    p: [
      'When you submit a survey or quote request we collect your name, phone number, email address (if provided), postcode, the flooring type you are interested in, and any details you add about the property. We also collect the property address you give us when we attend a survey.',
      'We do not collect payment card details through this website, and we never ask for card details over the phone or by email.',
    ],
  },
  {
    h: 'Why we collect it, and our lawful basis',
    p: [
      'We rely on legitimate interests under UK GDPR to respond to your enquiry, arrange a survey, prepare a quotation, and keep records of work we have carried out. We rely on consent if you ask us to send you marketing by email or text, and you can withdraw that consent at any time.',
      'We are also required to keep certain records for tax and insurance purposes, which is a legal obligation.',
    ],
  },
  {
    h: 'How long we keep it',
    p: [
      'Enquiry details are kept for up to 24 months from your last contact with us if the enquiry does not become a project. Installation records, invoices and guarantees are kept for 6 years, as required for tax and insurance purposes.',
    ],
  },
  {
    h: 'Who we share it with',
    p: [
      'We do not sell your data and we do not share it for marketing purposes. We share it only where necessary to deliver your project: with our installers where they attend your property, with our flooring suppliers where a product needs ordering for you, and with our payment provider where payment is taken.',
      'Where a supplier or installer processes data on our behalf, we have a written data processing agreement in place with them.',
    ],
  },
  {
    h: 'Your rights',
    p: [
      'You have the right to ask us for a copy of the personal data we hold about you, to correct it if it is wrong, to delete it, to restrict how we use it, and to object to our use of it based on legitimate interests.',
      'You can also ask us to transfer your data to another provider. To exercise any of these rights, email us. You can also complain to the Information Commissioner’s Office at ico.org.uk if you are not happy with how we have handled your data.',
    ],
  },
  {
    h: 'Cookies',
    p: [
      'This website uses a small number of cookies: essential ones required for the site to function, and analytics ones that tell us which pages are useful. Analytics cookies are only set with your consent, and you can change your choice at any time.',
    ],
  },
  {
    h: 'Security',
    p: [
      'All data submitted through this website is transmitted over an encrypted connection. Paper records are kept in a locked office and access is limited to staff who need it. We will notify you and the ICO if any data is lost or stolen in a way that is likely to cause you harm.',
    ],
  },
]

const termsSections = [
  {
    h: 'Surveys and quotes',
    p: [
      'Home surveys, measuring and written quotations are provided free of charge and carry no obligation. A quotation is valid for 60 days from the date it was issued, provided the scope of work has not changed.',
      'Where a survey reveals subfloor conditions that were not visible at the time, such as a need for screeding, we will tell you in writing before work begins and agree any additional cost with you first.',
    ],
  },
  {
    h: 'Acceptance and scheduling',
    p: [
      'A contract is formed when we receive your written acceptance of the quotation. Installation dates are agreed with you in advance and confirmed in writing. We ask for at least 48 hours notice if you need to change a booked date.',
    ],
  },
  {
    h: 'Cancellations',
    p: [
      'You may cancel any booking free of charge up to 48 hours before the scheduled date. Inside 48 hours we reserve the right to charge a cancellation fee to cover the surveyor’s time.',
    ],
  },
  {
    h: 'Our guarantees',
    p: [
      'All installation work carries a written workmanship guarantee. This covers the laying of the floor and the finish we provided, and applies for the period stated on your guarantee documentation.',
      'The guarantee does not cover damage caused by the floor being flooded, by unapproved cleaning methods, by furniture being dragged rather than lifted, or by movement in the subfloor beneath the flooring.',
    ],
  },
  {
    h: 'Floor suitability and aftercare',
    p: [
      'We will always tell you how a product should be maintained, and we will provide written aftercare guidance with your guarantee documentation. Following that guidance is a condition of the care-related guarantees we offer.',
    ],
  },
  {
    h: 'Access and customer responsibilities',
    p: [
      'We need safe access to the property, clear access to the rooms being floored, and a way to reach you on the day in case decisions need to be made. It is your responsibility to tell us about any special conditions such as asbestos-containing materials, listed building restrictions, or a need to work around a commercial occupancy.',
    ],
  },
  {
    h: 'Complaints',
    p: [
      'If something is not right, tell us within 28 days of completion. We will attend to assess it, and where it is our workmanship we will put it right at no cost. We aim to acknowledge any complaint within two working days.',
    ],
  },
  {
    h: 'Governing law',
    p: [
      'These terms are governed by the law of England and Wales, and any dispute is subject to the exclusive jurisdiction of the courts of England and Wales.',
    ],
  },
]

export default function LegalPage() {
  const { doc = '' } = useRouteParams()
  const isPrivacy = doc === 'privacy'
  const isKnown = isPrivacy || doc === 'terms'

  useHead(
    isKnown && {
      h1: isPrivacy ? 'Privacy Policy' : 'Terms of Service',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: isPrivacy ? 'Privacy Policy' : 'Terms of Service',
        url: `${SITE.url}/legal/${doc}`,
      },
    }
  )

  if (!isKnown) {
    return <Navigate to="/404" replace />
  }

  const sections = isPrivacy ? privacySections : termsSections

  return (
    <Layout showHighway={false}>
      <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: isPrivacy ? 'Privacy Policy' : 'Terms of Service' }]} />

      <PageHero
        eyebrow="Legal"
        heading={isPrivacy ? 'Privacy Policy' : 'Terms of Service'}
        subheading={
          isPrivacy
            ? `Last updated ${updated}. Written in plain English, and it says what we actually do with your details rather than hiding it in clause 14(b).`
            : `Last updated ${updated}. Written in plain English, so you know what you are agreeing to before you accept a job from us.`
        }
      />

      <section className="py-12 lg:py-16 bg-white">
        <div className="w-[90%] max-w-3xl mx-auto px-4 sm:px-6">
          {sections.map((section) => (
            <article key={section.h} className="mb-9 last:mb-0">
              <h2 className="text-lg font-extrabold text-gray-900 font-display uppercase tracking-wide">
                {section.h}
              </h2>
              <div className="mt-3 space-y-3">
                {section.p.map((para, i) => (
                  <p key={i} className="text-sm text-gray-600 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </article>
          ))}

          <p className="mt-10 pt-6 border-t border-gray-200 text-xs text-gray-500">
            Questions about this page? Email{' '}
            <a href={`mailto:${SITE.email}`} className="text-brand-orange font-semibold hover:underline">
              {SITE.email}
            </a>{' '}
            or call {SITE.phoneDisplay}.
          </p>
        </div>
      </section>
    </Layout>
  )
}
