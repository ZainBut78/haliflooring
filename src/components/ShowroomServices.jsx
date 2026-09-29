import React from 'react';
import { Link } from 'react-router-dom';

// Each card opens a different page. Where a card had no service page of its
// own, it points at the project that actually shows that work — stair runners
// and LVT both had real installations to link to — so no two cards on the
// page land the visitor in the same place.
const showroomItems = [
  {
    title: 'LVT',
    to: '/services/lvt',
    desc: 'Herringbone, bordered & chevron styles from leading design brands.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    )
  },
  {
    title: 'ENGINEERED WOOD',
    to: '/services/wood',
    desc: 'Straight, herringbone & chevron planks crafted for lasting beauty.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  },
  {
    title: 'LAMINATE',
    to: '/services/laminate',
    desc: 'Herringbone & straight plank, built for busy homes.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  {
    title: 'CARPETS & UNDERLAYS',
    to: '/services/carpet',
    desc: 'Deep saxony, wool twists & luxury cushion underlay for warmth underfoot.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    )
  },
  {
    title: 'BESPOKE STAIR RUNNERS',
    to: '/work/worsley-manor-custom-runner',
    desc: 'Handcrafted edging, whipped borders & matte black stair rods.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )
  },
  {
    title: 'VINYL FLOORING',
    to: '/work/bolton-residence-herringbone-lvt',
    desc: 'Hardwearing, water-proof flooring for kitchens & bathrooms.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    title: 'FLOOR LEVELLING',
    to: '/services/subfloor',
    desc: 'Laser-flat subfloor prep, damp proofing & ply boarding done right.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M5 13l4 4L19 7" />
      </svg>
    )
  },
  {
    title: 'ARTIFICIAL GRASS',
    to: '/contact',
    desc: 'UV-stabilised, child & pet friendly lawns laid over a porous base.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    )
  }
];

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
            Explore our physical collections or experience our fully equipped mobile showroom brought directly to your doorstep.
          </p>
        </div>

        {/* Two-Column Split Layout */}
        <div className="w-full space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
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
                href="tel:+447467030479"
                className="bg-brand-orange hover:bg-brand-orangeHover text-white font-extrabold px-6 py-3 rounded-xl shadow-md transition-all text-sm flex items-center gap-2"
              >
                <span>📞 Call Us: +44 7467 030479</span>
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
