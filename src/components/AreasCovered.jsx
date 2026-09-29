import React from 'react';
import { Link } from 'react-router-dom';

const areas = [
  { name: '📍 Bolton', desc: 'Headquarters & Hub', highlight: true },
  { name: 'Manchester', desc: 'City & Greater Area', highlight: false },
  { name: 'Bury', desc: 'Town & Suburbs', highlight: false },
  { name: 'Wigan', desc: 'All Postcodes', highlight: false },
  { name: 'Chorley', desc: 'Central & Surrounds', highlight: false },
  { name: 'Preston', desc: 'Lancashire County', highlight: false },
  { name: 'Rochdale', desc: 'Domestic & Commercial', highlight: false },
  { name: 'Salford', desc: 'Quays & Residential', highlight: false },
  { name: 'Blackburn', desc: 'Full Coverage', highlight: false },
  { name: 'Horwich', desc: '& West Pennine', highlight: false }
];

/*  Coverage ticker — two counter-scrolling marquee rows.                      */
/*  CSS animation rather than JS: it keeps running off the main thread, and    */
/*  each list is duplicated so the seam is invisible when the row wraps. The   */
/*  pauses on hover let someone actually read a town name instead of chasing   */
/*  it, and the copy is marked aria-hidden because the grid below is the       */
/*  accessible, crawlable list of the same places.                             */
function CoverageRow({ items, reverse = false, duration }) {
  const doubled = [...items, ...items]

  return (
    <div
      className="group relative flex overflow-hidden"
      // Fade the text out at both edges so names enter and leave instead of
      // being chopped off at the container border.
      style={{
        maskImage: 'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)'
      }}
    >
      <div
        aria-hidden="true"
        className={`flex shrink-0 items-center gap-3 pr-3 motion-reduce:animate-none ${
          reverse ? 'areaMarqueeReverse' : 'areaMarquee'
        }`}
        style={{ animationDuration: `${duration}s` }}
      >
        {doubled.map((area, i) => (
          <React.Fragment key={`${area.name}-${i}`}>
            <span className="whitespace-nowrap text-sm font-extrabold uppercase tracking-wider text-gray-400 transition-colors duration-300 group-hover:text-brand-orange">
              {area.name.replace(/📍\s*/, '')}
            </span>
            <span
              aria-hidden="true"
              className="w-1.5 h-1.5 rounded-full bg-brand-orange/50 shrink-0"
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default function AreasCovered() {
  return (
    <section id="areas" data-purpose="service-locations" className="py-18 lg:py-20 bg-brand-grayBg border-t border-brand-borderLight">
      <div className="w-[90%] max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-brand-orange font-bold text-xs uppercase tracking-widest bg-brand-orange/10 px-3 py-1 rounded-full border border-brand-orange/20">
            Local Coverage
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#111111] font-display uppercase tracking-tight">
            Areas We Cover Across the North West
          </h2>
          <p className="mt-3 text-gray-600 text-sm">
            Our branded mobile vans provide free home visits and professional fittings across:
          </p>
        </div>

        {/* Scrolling coverage ticker */}
        <div className="mb-10 sm:mb-12 space-y-3">
          <CoverageRow items={areas} duration={38} />
          <CoverageRow items={areas} reverse duration={46} />
        </div>

        {/* Clean Light Pill Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 text-center">
          {areas.map((area) => (
            <Link
              key={area.name}
              to="/contact"
              className={`block p-4 rounded-xl shadow-sm transition-all hover:-translate-y-0.5 ${
                area.highlight
                  ? 'bg-white border-2 border-brand-orange'
                  : 'bg-white border border-gray-200 hover:border-brand-orange'
              }`}
            >
              <span
                className={`block text-lg ${
                  area.highlight
                    ? 'text-brand-orange font-black'
                    : 'text-gray-900 font-bold'
                }`}
              >
                {area.name}
              </span>
              <span className="text-[11px] text-gray-500 font-semibold">{area.desc}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
