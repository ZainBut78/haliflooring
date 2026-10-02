import React, { useState } from 'react';
import { SITE, services, serviceSlugs } from '../data/content';

export default function QuoteSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    postcode: '',
    flooring_type: '',
    details: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="quote" data-purpose="quote-form-section" className="py-20 lg:py-24 bg-white relative overflow-hidden">
      <div className="w-[90%] max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-brand-orange font-bold text-xs uppercase tracking-widest bg-brand-orange/10 px-3 py-1 rounded-full border border-brand-orange/20">
              Fast Response Guarantee
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111111] font-display uppercase tracking-tight leading-tight">
              Book Your Free Home Survey
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Fill in your details, and our friendly team will contact you to arrange your free home survey and send you a clear written quote.
            </p>
            <div className="space-y-4 pt-4 border-t border-gray-200">
              <a
                href={`tel:${SITE.phone}`}
                className="flex items-center gap-4 text-gray-900 hover:text-brand-orange transition-colors p-3 rounded-xl hover:bg-gray-50"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center text-brand-orange text-lg">
                  📞
                </div>
                <div>
                  <span className="text-xs uppercase text-gray-500 font-bold block">Direct Call Line</span>
                  <strong className="text-lg font-extrabold text-gray-900">{SITE.phoneDisplay}</strong>
                </div>
              </a>

              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-gray-900 hover:text-brand-orange transition-colors p-3 rounded-xl hover:bg-gray-50"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 text-lg">
                  💬
                </div>
                <div>
                  <span className="text-xs uppercase text-gray-500 font-bold block">WhatsApp Instant Chat</span>
                  <strong className="text-lg font-extrabold text-gray-900">Message Our Team Direct</strong>
                </div>
              </a>

              <div className="flex items-center gap-4 p-3 rounded-xl">
                <div className="w-12 h-12 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-700 text-lg">
                  ✉️
                </div>
                <div>
                  <span className="text-xs uppercase text-gray-500 font-bold block">Email Inquiries</span>
                  <a href={`mailto:${SITE.email}`} className="text-sm font-bold text-gray-900 hover:text-brand-orange break-all">{SITE.email}</a>
                </div>
              </div>
            </div>
          </div>

          {/* The Form Card */}
          <div className="lg:col-span-7 bg-brand-grayBg border border-gray-200 rounded-3xl p-8 sm:p-10 shadow-xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto">
                  ✓
                </div>
                <h3 className="text-2xl font-extrabold text-gray-900 font-display">
                  Thank You for Reaching Out!
                </h3>
                <p className="text-gray-600 text-sm max-w-md mx-auto">
                  Your quote request has been received. Our team will contact you shortly to arrange your free home survey.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-brand-orange text-white text-xs font-bold hover:bg-brand-orangeHover transition-colors"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" id="free-quote-form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2" htmlFor="full-name">
                      Your Full Name *
                    </label>
                    <input
                      id="full-name"
                      name="name"
                      required
                      type="text"
                      placeholder="e.g. James Smith"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2" htmlFor="phone-number">
                      Phone Number *
                    </label>
                    <input
                      id="phone-number"
                      name="phone"
                      required
                      type="tel"
                      placeholder="e.g. 07123 456789"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2" htmlFor="postcode">
                      Postcode (e.g. BL1, M14) *
                    </label>
                    <input
                      id="postcode"
                      name="postcode"
                      required
                      type="text"
                      placeholder="Postcode"
                      value={formData.postcode}
                      onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2" htmlFor="service-type">
                      Flooring Required *
                    </label>
                    <select
                      id="service-type"
                      name="flooring_type"
                      required
                      value={formData.flooring_type}
                      onChange={(e) => setFormData({ ...formData, flooring_type: e.target.value })}
                      className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                    >
                      <option value="" disabled>Select Flooring Category</option>
                      {serviceSlugs.map((slug) => (
                        <option key={slug} value={slug}>
                          {services[slug].name}
                        </option>
                      ))}
                      <option value="not-sure">Not sure yet, please advise</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2" htmlFor="room-details">
                    Room Details &amp; Approximate Sizes (Optional)
                  </label>
                  <textarea
                    id="room-details"
                    name="details"
                    rows={3}
                    placeholder="e.g. Hallway + Living room (approx 35m²), requires old carpet removal and screeding..."
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-brand-orange hover:bg-brand-orangeHover text-white font-extrabold uppercase tracking-wide py-4 px-6 rounded-xl shadow-glow-orange transition-all duration-300 transform hover:-translate-y-0.5 text-sm"
                  >
                    Submit For Free Survey &amp; Quote
                  </button>
                  <p className="text-center text-[11px] text-gray-500 mt-3 font-medium">
                    🔒 No pushy sales tactics. Free cancellation anytime. Your data is strictly private.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
