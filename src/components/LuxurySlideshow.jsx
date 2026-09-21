import React, { useState, useEffect, useRef } from 'react';

// Import high-resolution local flooring images from src/assets/Images
import flooring1 from '../assets/Images/flooring (1).jpg';
import flooring2 from '../assets/Images/flooring (2).jpg';
import flooring3 from '../assets/Images/flooring (3).jpg';
import flooring4 from '../assets/Images/flooring (4).jpg';
import flooring5 from '../assets/Images/flooring (5).jpg';
import flooring6 from '../assets/Images/flooring (6).jpg';

const slidesData = [
  {
    title: 'Featured Project: Prime European Herringbone Oak Parquet',
    alt: 'Luxury Herringbone Oak Parquet Installation',
    image: flooring1
  },
  {
    title: 'Featured Project: Seamless Architectural LVT Kitchen Diner',
    alt: 'Architectural Open-Plan LVT Kitchen Diner Installation',
    image: flooring2
  },
  {
    title: 'Featured Project: Handcrafted Whipped Wool Staircase Runner',
    alt: 'Handcrafted Bespoke Staircase Runner Installation',
    image: flooring3
  },
  {
    title: 'Featured Project: Bespoke Luxury Hardwood Flooring',
    alt: 'Bespoke Hardwood Flooring Installation',
    image: flooring4
  },
  {
    title: 'Featured Project: Premium Domestic & Commercial Installation',
    alt: 'Premium Domestic & Commercial Installation',
    image: flooring5
  },
  {
    title: 'Showroom Experience: Full Format Boards & Master Installation',
    alt: 'Hali Flooring Luxury Showroom and Format Displays',
    image: flooring6
  }
];

const servicePills = [
  {
    tag: '01 • LVT',
    title: 'Luxury Vinyl Tile',
    desc: 'Herringbone, borders & chevron styles from leading luxury brands.'
  },
  {
    tag: '02 • WOOD',
    title: 'Engineered Wood',
    desc: 'Engineered real oak & smoked planks crafted for underfloor heating.'
  },
  {
    tag: '03 • CARPET',
    title: 'Carpets & Runners',
    desc: 'Deep Saxony, wool twists, bespoke stair runners & acoustic underlay.'
  },
  {
    tag: '04 • LAMINATE',
    title: 'Laminate Flooring',
    desc: 'AC4/AC5 heavy domestic straight plank & herringbone with water resistance.'
  },
  {
    tag: '05 • SAFETY FLOOR',
    title: 'Commercial Safety',
    desc: 'Coved, hygienic anti-slip vinyl fitting for wet rooms and clinics.'
  },
  {
    tag: '06 • SUBFLOOR',
    title: 'Floor Levelling',
    desc: 'Laser-flat self-levelling screeds, damp membranes & ply boarding.'
  }
];

export default function LuxurySlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const slideDuration = 4800; // ms
  const intervalRef = useRef(null);

  // Auto-slide and progress animation
  useEffect(() => {
    if (isHovered) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    setProgress(0);
    const startTime = Date.now();

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / slideDuration) * 100, 100);
      setProgress(pct);
    }, 50);

    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesData.length);
    }, slideDuration);

    return () => {
      clearInterval(progressInterval);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentSlide, isHovered]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + slidesData.length) % slidesData.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % slidesData.length);
  };

  return (
    <div
      id="hero-slideshow-container"
      className="w-[90%] max-w-[1680px] mx-auto px-2 sm:px-6 lg:px-8 mt-2 lg:mt-4 relative z-30"
    >
      {/* Main Slideshow Card Container (Exact dimensions preserved) */}
      <div
        id="slideshow-stage"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-full h-[400px] sm:h-[480px] lg:h-[580px] xl:h-[620px] rounded-3xl overflow-hidden shadow-2xl border border-brand-orange/20 bg-neutral-950 group select-none cursor-pointer"
      >
        {/* Slides Stack */}
        <div id="slides-wrapper" className="absolute inset-0 overflow-hidden">
          {slidesData.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  isActive ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 pointer-events-none z-0'
                }`}
                style={{
                  filter: isHovered ? 'brightness(0.5)' : 'none',
                  transition: 'filter 0.4s ease, opacity 0.85s ease, transform 1.2s ease'
                }}
              >
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>
            );
          })}
        </div>

        {/* Interactive Hover Dimmer & 6 Signature Services Overlay */}
        <div
          id="hover-services-overlay"
          className={`absolute inset-0 z-20 transition-all duration-500 flex items-center justify-center p-4 sm:p-8 ${
            isHovered ? 'pointer-events-auto' : 'pointer-events-none opacity-0'
          }`}
        >
          {/* Darkening backdrop */}
          <div
            className={`absolute inset-0 transition-all duration-500 ${
              isHovered ? 'bg-black/40 backdrop-blur-xs' : 'bg-black/0'
            }`}
          />

          {/* 6 Popout Service Pills Container */}
          <div className="relative z-30 w-full max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            {servicePills.map((pill, idx) => (
              <a
                key={idx}
                href="#showroom"
                className={`bg-neutral-900/90 hover:bg-neutral-900 backdrop-blur-md border border-brand-orange/40 hover:border-brand-orange rounded-2xl p-3 sm:p-4 text-left shadow-2xl transition-all duration-300 group/pill pointer-events-auto transform ${
                  isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: `${(idx + 1) * 40}ms` }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-brand-orange font-bold">
                    {pill.tag}
                  </span>
                  <span className="text-xs text-brand-orange group-hover/pill:translate-x-0.5 transition-transform">
                    →
                  </span>
                </div>
                <h4 className="text-white font-extrabold text-sm sm:text-base group-hover/pill:text-brand-orange transition-colors">
                  {pill.title}
                </h4>
                <p className="text-neutral-400 text-xs hidden sm:block mt-1 leading-snug">
                  {pill.desc}
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Navigation Chrome: Style Badge, Prev/Next Controls, Dots, Progress */}
        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-8 right-4 sm:right-8 z-30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pointer-events-none">
          {/* Left: Flooring Style Badge */}
          <div className="pointer-events-auto bg-black/75 backdrop-blur-md border border-white/15 px-4 py-2 rounded-xl shadow-lg flex items-center gap-2.5 max-w-full">
            <span className="w-2 h-2 rounded-full bg-brand-orange shrink-0 animate-pulse" />
            <span id="active-style-badge" className="text-xs sm:text-sm font-semibold text-white truncate">
              {slidesData[currentSlide].title}
            </span>
          </div>

          {/* Right: Controls & Indicators */}
          <div className="pointer-events-auto flex items-center gap-3 bg-black/75 backdrop-blur-md border border-white/15 px-3.5 py-2 rounded-xl shadow-lg self-end sm:self-auto">
            {/* Prev Button */}
            <button
              onClick={handlePrev}
              aria-label="Previous Slide"
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-brand-orange text-white flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex items-center gap-1.5 px-1">
              {slidesData.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSlide(dotIdx);
                  }}
                  className={`transition-all duration-300 ${
                    dotIdx === currentSlide
                      ? 'w-6 h-2 rounded-full bg-brand-orange'
                      : 'w-2 h-2 rounded-full bg-white/40 hover:bg-white'
                  }`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              aria-label="Next Slide"
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-brand-orange text-white flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Auto-play Linear Progress Bar at Top Border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 z-30 pointer-events-none">
          <div
            id="slide-progress-bar"
            className="h-full bg-brand-orange"
            style={{ width: `${progress}%`, transition: isHovered ? 'none' : 'width 50ms linear' }}
          />
        </div>
      </div>
    </div>
  );
}
