import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { useHead } from '../components/Seo'
import { Breadcrumbs, PageHero, FaqAccordion } from '../components/ui'
import { PhoneIcon } from '../components/SiteNav'
import { areas, services, serviceSlugs, SITE } from '../data/content'
import { sendEnquiry } from '../lib/sendEnquiry'

const contactFaqs = [
  {
    q: 'Is the home survey really free?',
    a: 'Yes, with no obligation attached. We measure up the rooms you want floored and send a written, itemised quote. If you decide not to go ahead, there is nothing to pay and nobody will chase you.',
  },
  {
    q: 'How quickly can you come out?',
    a: 'We will arrange a time that suits you. Call us, or message us on WhatsApp for the quickest reply.',
  },
  {
    q: 'Do you supply the flooring as well as fit it?',
    a: 'Both. You can see our ranges in the showroom, or book a free home survey and we will bring samples to you. We can also source a specific floor you have seen elsewhere.',
  },
  {
    q: 'Do you remove the old flooring?',
    a: 'Yes. Old floor removal, disposal and subfloor preparation are all included in the quoted price. We will tell you in advance if the old floor needs screeding first, so there are no surprises on the day.',
  },
  {
    q: 'What areas do you actually cover?',
    a: 'We are based in Bolton and cover the North West, including Manchester, Bury, Wigan, Chorley, Preston, Rochdale, Salford, Blackburn, Horwich and Warrington. We fit in every town nationwide, so just ask.',
  },
  {
    q: 'Are you insured?',
    a: 'Please get in touch and we will be happy to answer any questions about insurance and guarantees before any work starts.',
  },
]

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    postcode: '',
    service: '',
    details: '',
    website: '', // honeypot, hidden from people
  })
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  useHead({
    h1: 'Contact Hali Flooring — Free Survey & Quote',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact Hali Flooring',
      url: `${SITE.url}/contact`,
      mainEntity: { '@id': `${SITE.url}/#business` },
    },
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setError('')
    try {
      await sendEnquiry(form)
      setSent(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setSending(false)
    }
  }

  const update = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))

  return (
    <Layout>
      <Breadcrumbs items={[{ name: 'Home', path: '/' }, { name: 'Contact' }]} />

      <PageHero
        eyebrow="Free survey · Free measure · No obligation"
        heading="Contact Us"
        subheading="Call us, message us on WhatsApp, or send the form below. Whichever you pick, you will get a real person and a straight answer about what your room actually needs."
      />

      {/* Contact methods + form */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="w-[90%] max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Methods */}
            <div className="lg:col-span-5 space-y-4">
              <a
                href={`tel:${SITE.phone}`}
                className="flex items-center gap-4 p-5 rounded-2xl border border-gray-200 hover:border-brand-orange transition-colors"
              >
                <span className="w-12 h-12 rounded-xl bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center text-brand-orange shrink-0">
                  <PhoneIcon className="w-5 h-5" />
                </span>
                <span>
                  <span className="block text-xs uppercase text-gray-500 font-bold tracking-wider">Call the team</span>
                  <span className="block text-lg font-extrabold text-gray-900">{SITE.phoneDisplay}</span>
                </span>
              </a>

              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-2xl border border-gray-200 hover:border-emerald-500 transition-colors"
              >
                <span className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z" />
                  </svg>
                </span>
                <span>
                  <span className="block text-xs uppercase text-gray-500 font-bold tracking-wider">WhatsApp instant</span>
                  <span className="block text-base font-extrabold text-gray-900">Message us direct</span>
                </span>
              </a>

              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-4 p-5 rounded-2xl border border-gray-200 hover:border-brand-orange transition-colors"
              >
                <span className="w-12 h-12 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-700 shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l18 8M3 8v8a2 2 0 002 2h14a2 2 0 002-2V8M3 8l2-2h14l2 2" />
                  </svg>
                </span>
                <span className="min-w-0">
                  <span className="block text-xs uppercase text-gray-500 font-bold tracking-wider">Email</span>
                  <span className="block text-sm font-extrabold text-gray-900 break-all">{SITE.email}</span>
                </span>
              </a>

              <div className="p-5 rounded-2xl border border-gray-200">
                <h2 className="text-xs uppercase text-gray-500 font-bold tracking-wider">Showroom</h2>
                <p className="mt-2 text-sm text-gray-800 font-semibold">
                  {SITE.address.line1}, {SITE.address.line2}
                </p>
                <p className="text-sm text-gray-500">{SITE.address.postcode}, {SITE.address.country}</p>
                <ul className="mt-4 pt-4 border-t border-gray-100 space-y-1.5">
                  {SITE.hours.map((h) => (
                    <li key={h.day} className="flex justify-between gap-3 text-xs text-gray-600">
                      <span className="font-medium">{h.day}:</span>
                      <span className="text-gray-900 font-bold text-right">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7 bg-brand-grayBg border border-gray-200 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl">
              {sent ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto">
                    ✓
                  </div>
                  <h2 className="text-2xl font-extrabold text-gray-900 font-display uppercase">Thank You</h2>
                  <p className="text-gray-600 text-sm max-w-md mx-auto">
                    Your request has been received. We will be in touch shortly to arrange your free site measurement.
                  </p>
                  <button
                    onClick={() => {
                      setSent(false)
                      setForm({ name: '', phone: '', email: '', postcode: '', service: '', details: '', website: '' })
                    }}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orangeHover text-white text-xs font-bold transition-colors"
                  >
                    Send Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate={false}>
                  <div className="absolute -left-[9999px]" aria-hidden="true">
                    <label htmlFor="c-website">Leave this empty</label>
                    <input
                      id="c-website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.website}
                      onChange={update('website')}
                    />
                  </div>
                  <h2 className="text-lg font-extrabold text-gray-900 font-display uppercase tracking-wide">
                    Request Your Free Survey
                  </h2>
                  <p className="mt-1.5 text-xs text-gray-500">
                    Fields marked * are required. We reply within one working day.
                  </p>

                  <div className="mt-6 space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="c-name" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                          Your Name *
                        </label>
                        <input
                          id="c-name"
                          name="name"
                          type="text"
                          required
                          autoComplete="name"
                          placeholder="e.g. James Smith"
                          value={form.name}
                          onChange={update('name')}
                          className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                        />
                      </div>
                      <div>
                        <label htmlFor="c-phone" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                          Phone *
                        </label>
                        <input
                          id="c-phone"
                          name="phone"
                          type="tel"
                          required
                          autoComplete="tel"
                          placeholder="e.g. 07123 456789"
                          value={form.phone}
                          onChange={update('phone')}
                          className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="c-email" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                          Email
                        </label>
                        <input
                          id="c-email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder="e.g. you@email.com"
                          value={form.email}
                          onChange={update('email')}
                          className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                        />
                      </div>
                      <div>
                        <label htmlFor="c-postcode" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                          Postcode *
                        </label>
                        <input
                          id="c-postcode"
                          name="postcode"
                          type="text"
                          required
                          autoComplete="postal-code"
                          placeholder="e.g. BL1 4AA"
                          value={form.postcode}
                          onChange={update('postcode')}
                          className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="c-service" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                        Flooring Required *
                      </label>
                      <select
                        id="c-service"
                        name="service"
                        required
                        value={form.service}
                        onChange={update('service')}
                        className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                      >
                        <option value="" disabled>
                          Select a flooring type
                        </option>
                        {serviceSlugs.map((slug) => (
                          <option key={slug} value={slug}>
                            {services[slug].name}
                          </option>
                        ))}
                        <option value="not-sure">Not sure yet — please advise</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="c-details" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                        Room Details &amp; Approximate Sizes
                      </label>
                      <textarea
                        id="c-details"
                        name="details"
                        rows={4}
                        placeholder="e.g. Hallway and living room, approx 35m², needs old carpet removed and underfloor heating"
                        value={form.details}
                        onChange={update('details')}
                        className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                      />
                    </div>

                    <div className="pt-1">
                      {error && (
                        <p role="alert" className="mb-3 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                          {error}
                        </p>
                      )}
                      <button
                        type="submit"
                        disabled={sending}
                        className="w-full bg-brand-orange hover:bg-brand-orangeHover disabled:opacity-60 disabled:cursor-not-allowed text-white font-extrabold uppercase tracking-wide py-4 px-6 rounded-xl shadow-glow-orange transition-all duration-300 transform hover:-translate-y-0.5 text-sm"
                      >
                        {sending ? 'Sending…' : 'Submit For Free Survey & Quote'}
                      </button>
                      <p className="text-center text-[11px] text-gray-500 mt-3">
                        🔒 No pushy sales tactics. Your details stay private and are never sold on.
                      </p>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="py-12 lg:py-16 bg-brand-grayBg border-y border-brand-borderLight">
        <div className="w-[90%] max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl sm:text-2xl font-extrabold font-display uppercase tracking-tight text-[#111111]">
            Areas We Cover
          </h2>
          <p className="mt-3 text-sm text-gray-600 max-w-2xl mx-auto">
            Based in the North West and fitting nationwide. Free home surveys and no-obligation quotes.
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
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="w-[90%] max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display uppercase tracking-tight text-[#111111] text-center mb-10">
            Before You Get In Touch
          </h2>
          <FaqAccordion items={contactFaqs} idPrefix="faq-contact" />

          <div className="mt-10 flex flex-wrap gap-3 justify-center">
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
              Browse Services
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}
