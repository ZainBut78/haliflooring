import React from 'react';

export default function Hero() {
  return (
    <section
      id="hero"
      data-purpose="hero-showcase"
      className="relative pt-28 pb-8 lg:pt-36 lg:pb-12 overflow-hidden flex flex-col items-center justify-start bg-gradient-to-b from-brand-grayBg via-white to-white"
    >
      {/* Ambient Stage Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[550px] bg-brand-orange/10 blur-[160px] rounded-full animate-glow" />
        <div className="absolute top-1/2 right-10 w-[450px] h-[400px] bg-amber-200/25 blur-[140px] rounded-full" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[320px] bg-orange-100/35 blur-[150px] rounded-full" />
      </div>

      {/* Subtle Animated Herringbone Flooring Installation Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none [mask-image:radial-gradient(ellipse_80%_65%_at_50%_45%,#000_65%,transparent_100%)]"
      >
        <svg
          className="w-full h-full opacity-[0.07]"
          fill="none"
          preserveAspectRatio="none"
          stroke="currentColor"
          viewBox="0 0 1600 900"
        >
          <defs>
            <pattern id="herringbonePattern" patternUnits="userSpaceOnUse" width="120" height="120">
              {/* Left V Planks */}
              <path
                className="hb-plank-anim-1"
                d="M0,30 L30,0 L60,30 L30,60 Z"
                stroke="#E07E0C"
                strokeDasharray="120"
                strokeWidth="1.25"
              />
              <path
                className="hb-plank-anim-2"
                d="M30,60 L60,30 L90,60 L60,90 Z"
                stroke="#111111"
                strokeDasharray="120"
                strokeWidth="1.1"
              />
              <path
                className="hb-plank-anim-3"
                d="M60,90 L90,60 L120,90 L90,120 Z"
                stroke="#E07E0C"
                strokeDasharray="120"
                strokeWidth="1.25"
              />
              <path
                className="hb-plank-anim-4"
                d="M0,90 L30,60 L60,90 L30,120 Z"
                stroke="#111111"
                strokeDasharray="120"
                strokeWidth="1.1"
              />
              <path
                className="hb-plank-anim-1"
                d="M60,30 L90,0 L120,30 L90,60 Z"
                stroke="#111111"
                strokeDasharray="120"
                strokeWidth="1.1"
              />
              {/* Center Joint Lines */}
              <line x1="0" y1="0" x2="120" y2="120" stroke="#E2E2E2" strokeWidth="0.75" />
              <line x1="120" y1="0" x2="0" y2="120" stroke="#E2E2E2" strokeWidth="0.75" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#herringbonePattern)" />
        </svg>
      </div>

      <div className="w-[90%] max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        {/* Top Badge */}
        <div className="flex justify-center mb-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-brand-orange/30 text-xs sm:text-sm font-bold text-brand-orange tracking-wide shadow-sm">
            <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping" />
            North West's Trusted Floor Suppliers
          </div>
        </div>

        {/* Hero Headline */}
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight text-[#111111] leading-[1.06] font-display uppercase drop-shadow-sm">
            WOOD FLOORING, CARPET &amp; <span className="text-brand-orange">LVT</span>
          </h1>

          {/* Primary Hero Actions */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#quote"
              className="bg-brand-orange hover:bg-brand-orangeHover text-white font-extrabold px-8 py-4 rounded-xl shadow-glow-orange transition-all duration-300 transform hover:-translate-y-1 text-base flex items-center gap-2"
            >
              <span>Book Free Home Survey</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <a
              href="https://wa.me/447467030479"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-gray-50 text-gray-900 font-bold px-7 py-4 rounded-xl border-2 border-gray-300 hover:border-brand-orange transition-all duration-300 flex items-center gap-2.5 shadow-sm"
            >
              <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z" />
              </svg>
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
