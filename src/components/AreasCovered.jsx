import React from 'react';

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

        {/* Clean Light Pill Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 text-center">
          {areas.map((area, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl shadow-sm transition-all ${
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
