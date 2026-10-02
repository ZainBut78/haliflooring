import React from 'react';
import { Link } from 'react-router-dom';
import { SITE, services, serviceSlugs } from '../data/content';

// One card per service, straight from the shared service data, so this list
// can never drift from the navbar, footer or /services page and every card
// opens its own service page.
const showroomItems = serviceSlugs.map((slug) => ({
  title: services[slug].navLabel,
  to: `/services/${slug}`,
  desc: services[slug].tagline,
  icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d={services[slug].icon} />
    </svg>
  ),
}));

export default function ShowroomServices() {
  return (
    <section
      id="showroom"
      data-purpose="showroom-split-section"
      className="py-20 lg:py-24 bg-brand-grayBg border-y border-brand-borderLight relative"
      style={{
        backgroundImage: `linear-gradient(rgba(253, 249, 248, 0.72), rgba(255, 255, 255, 0.78)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCk0GqVN9Y8OJdu8jNj87r1o6knon-a3pTH7YfZEIFVmZ8fFQQtC_GN6Xnd6JR4oHY6JjadCEG755KvFm-FAnkjnSGMAHK2f9FsCpuhV-C4ks7oIU5WVGqYiFfwi9bXGrqRPOecocB79Kks1yNJU2Xeiz-XQXPRvKI5xSalkgD8F5lKWh4JKk7b8UK_gJmKjwyXz9Y0zjyq7JmoMRyhWg0Vv2Jo25PPLPI186cx3MGTFW-hDG_gGfSR")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center'
      }}
    >
      <div className="w-[90%] max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold text-[#111111] font-display uppercase tracking-tight">
            SHOWROOM
          </h2>
          <p className="mt-4 text-gray-600 text-sm sm:text-base leading-relaxed">
            Visit our showroom to see the ranges, or book a free home survey and our estimator will bring flooring samples to your door.
          </p>
        </div>

        {/* Two-Column Split Layout */}
        <div className="w-full space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {showroomItems.map((item) => (
              <Link
                key={item.title}
                to={item.to}
                className="flex items-center gap-4 p-5 rounded-2xl bg-white/90 backdrop-blur-sm border border-gray-200/90 hover:border-brand-orange transition-all duration-300 group shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="w-12 h-12 rounded-full bg-orange-50 text-brand-orange flex items-center justify-center shrink-0 group-hover:bg-brand-orange group-hover:text-white transition-colors duration-200">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-extrabold text-sm text-gray-900 uppercase tracking-wide group-hover:text-brand-orange transition-colors">
                      {item.title}
                    </span>
                    <span className="text-brand-orange font-bold">—</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mt-0.5">{item.desc}</p>
                </div>
                <span className="text-gray-600 group-hover:text-brand-orange group-hover:translate-x-1 transition-all text-base shrink-0">
                  →
                </span>
              </Link>
            ))}
          </div>

          {/* Advice Banner */}
          <div className="p-6 sm:p-8 bg-white/95 backdrop-blur-md rounded-2xl border border-gray-200 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-base font-bold text-gray-900 text-center sm:text-left">
              Not sure which flooring is right for you?
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={`tel:${SITE.phone}`}
                className="bg-brand-orange hover:bg-brand-orangeHover text-white font-extrabold px-6 py-3 rounded-xl shadow-md transition-all text-sm flex items-center gap-2"
              >
                <span>📞 Call Us: {SITE.phoneDisplay}</span>
              </a>
              <a
                href="#quote"
                className="bg-white hover:bg-gray-50 text-gray-800 font-bold px-5 py-3 rounded-xl border-2 border-gray-300 hover:border-brand-orange transition-all text-sm shadow-xs"
              >
                Book a Free Home Survey
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
