import React from 'react';

export default function ProcessStrip() {
  return (
    <div id="process" className="w-[90%] max-w-5xl mx-auto px-4 relative z-20 mb-8 lg:mb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative">
        {/* Thin connecting line behind cards (desktop only) */}
        <div className="hidden md:block absolute top-9 left-16 right-16 h-0.5 bg-gradient-to-r from-brand-orange/20 via-brand-orange/40 to-brand-orange/20 -z-0" />

        {/* Card 1: SEE IT */}
        <div className="bg-white/95 backdrop-blur-sm border border-gray-200 hover:border-brand-orange rounded-2xl p-5 shadow-sm hover:shadow-card-hover transition-all duration-300 relative z-10 group">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-full border-2 border-brand-orange text-brand-orange flex items-center justify-center font-display text-base font-black bg-white shadow-xs group-hover:bg-brand-orange group-hover:text-white transition-colors">
              1
            </div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500 font-bold bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
              PHASE 01
            </span>
          </div>
          <div className="flex items-center gap-2 mb-1.5">
            <svg
              className="w-5 h-5 text-brand-orange shrink-0"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <h3 className="text-lg font-extrabold text-gray-900 font-display uppercase tracking-wide">
              SEE IT
            </h3>
          </div>
          <p className="text-gray-600 text-xs leading-relaxed">
            Explore our mobile and showroom samples &amp; feel the tangible build quality under real home lighting.
          </p>
        </div>

        {/* Card 2: MEASURE IT */}
        <div className="bg-white/95 backdrop-blur-sm border border-gray-200 hover:border-brand-orange rounded-2xl p-5 shadow-sm hover:shadow-card-hover transition-all duration-300 relative z-10 group">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-full border-2 border-brand-orange text-brand-orange flex items-center justify-center font-display text-base font-black bg-white shadow-xs group-hover:bg-brand-orange group-hover:text-white transition-colors">
              2
            </div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500 font-bold bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
              PHASE 02
            </span>
          </div>
          <div className="flex items-center gap-2 mb-1.5">
            <svg
              className="w-5 h-5 text-brand-orange shrink-0"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M21.3 8.7l-6-6a1 1 0 0 0-1.4 0l-11 11a1 1 0 0 0 0 1.4l6 6a1 1 0 0 0 1.4 0l11-11a1 1 0 0 0 0-1.4z" />
              <path d="M7.5 10.5l2 2" />
              <path d="M10.5 7.5l2 2" />
              <path d="M13.5 4.5l2 2" />
            </svg>
            <h3 className="text-lg font-extrabold text-gray-900 font-display uppercase tracking-wide">
              MEASURE IT
            </h3>
          </div>
          <p className="text-gray-600 text-xs leading-relaxed">
            We measure &amp; plan for <span className="text-[#F7941D] font-bold">FREE!</span> Accurate laser surveying with transparent, no-obligation pricing.
          </p>
        </div>

        {/* Card 3: FIT IT */}
        <div className="bg-white/95 backdrop-blur-sm border border-gray-200 hover:border-brand-orange rounded-2xl p-5 shadow-sm hover:shadow-card-hover transition-all duration-300 relative z-10 group">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-full border-2 border-brand-orange text-brand-orange flex items-center justify-center font-display text-base font-black bg-white shadow-xs group-hover:bg-brand-orange group-hover:text-white transition-colors">
              3
            </div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500 font-bold bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
              PHASE 03
            </span>
          </div>
          <div className="flex items-center gap-2 mb-1.5">
            <svg
              className="w-5 h-5 text-brand-orange shrink-0"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
            <h3 className="text-lg font-extrabold text-gray-900 font-display uppercase tracking-wide">
              FIT IT
            </h3>
          </div>
          <p className="text-gray-600 text-xs leading-relaxed">
            Our experts install it <span className="text-[#F7941D] font-bold">perfectly</span>. Clean, fast, and tidy workmanship with comprehensive guarantees.
          </p>
        </div>
      </div>
    </div>
  );
}
