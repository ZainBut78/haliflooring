import React from 'react';
import { Link } from 'react-router-dom';

/*  North West coverage list, grouped by county.                                   */
const coverageGroups = [
  {
    label: 'Greater Manchester',
    cities: ['Bolton', 'Manchester', 'Salford', 'Bury', 'Rochdale', 'Oldham', 'Stockport', 'Wigan', 'Horwich'],
  },
  {
    label: 'Lancashire',
    cities: ['Preston', 'Chorley', 'Blackburn', 'Burnley', 'Blackpool', 'Lancaster'],
  },
  {
    label: 'Cheshire & Merseyside',
    cities: ['Warrington', 'Chester', 'Liverpool', 'St Helens', 'Southport'],
  },
  {
    label: 'Cumbria',
    cities: ['Carlisle'],
  },
];

/*  The ten towns that get the full "local" treatment below the ticker — a card    */
/*  with a description each. Bolton is the headquarters, so it is highlighted.      */
const localAreas = [
  { name: '📍 Bolton', desc: 'Our Base', highlight: true },
  { name: 'Manchester', desc: 'City & Greater Area', highlight: false },
  { name: 'Bury', desc: 'Town & Suburbs', highlight: false },
  { name: 'Wigan', desc: 'All Postcodes', highlight: false },
  { name: 'Chorley', desc: 'Central & Surrounds', highlight: false },
  { name: 'Preston', desc: 'Lancashire County', highlight: false },
  { name: 'Rochdale', desc: 'Domestic & Commercial', highlight: false },
  { name: 'Salford', desc: 'Quays & Residential', highlight: false },
  { name: 'Blackburn', desc: 'Full Coverage', highlight: false },
  { name: 'Horwich', desc: '& West Pennine', highlight: false },
  { name: 'Warrington', desc: 'Town & Surrounds', highlight: false },
];

/*  Flatten a set of groups into a token stream of labels and cities, then repeat   */
/*  it once. The repeat is what makes the loop seamless: the track scrolls exactly  */
/*  one list-width and then lines up with its own start, so there is no visible    */
/*  jump or gap at the wrap point.                                                  */
function buildTokens(groups) {
  const tokens = []
  for (const group of groups) {
    tokens.push({ type: 'label', text: group.label, key: `label-${group.label}` })
    for (const city of group.cities) {
      tokens.push({ type: 'city', text: city, key: `${group.label}-${city}` })
    }
  }
  return [...tokens, ...tokens]
}

/*  Coverage ticker — two counter-scrolling marquee rows.                      */
/*  CSS animation rather than JS: it keeps running off the main thread. The     */
/*  rows hold different halves of the list so the two directions never look     */
/*  like mirror images of each other. The row pauses on hover so a town name    */
/*  can actually be read instead of being chased, and the stream is marked      */
/*  aria-hidden because the list below is the accessible, crawlable version.    */
function CoverageRow({ groups, reverse = false, duration }) {
  const tokens = buildTokens(groups)

  return (
    <div
      className="group relative flex overflow-hidden"
      // Fade the text out at both edges so names enter and leave instead of
      // being chopped off at the container border.
      style={{
        maskImage: 'linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)',
      }}
    >
      <div
        aria-hidden="true"
        className={`flex shrink-0 items-center whitespace-nowrap motion-reduce:animate-none ${
          reverse ? 'areaMarqueeReverse' : 'areaMarquee'
        }`}
        style={{ animationDuration: `${duration}s` }}
      >
        {tokens.map((token, i) =>
          token.type === 'label' ? (
            <span
              key={`${token.key}-${i}`}
              className="coverage-label"
            >
              {token.text}
            </span>
          ) : (
            <span
              key={`${token.key}-${i}`}
              className="coverage-city transition-colors duration-300"
            >
              {token.text}
            </span>
          ),
        )}
      </div>
    </div>
  )
}

export default function AreasCovered() {
  const [greaterManchester, lancashire, cheshire, cumbria] = coverageGroups

  return (
    <section id="areas" data-purpose="service-locations" className="py-18 lg:py-20 bg-brand-grayBg border-t border-brand-borderLight">
      <div className="w-[90%] max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-brand-orange font-bold text-xs uppercase tracking-widest bg-brand-orange/10 px-3 py-1 rounded-full border border-brand-orange/20">
            North West UK
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#111111] font-display uppercase tracking-tight">
            Areas We Cover
          </h2>
          <p className="mt-3 text-gray-600 text-sm">
            Based in Bolton and focused on the North West, we offer free home surveys across the
            region and fit flooring in every town nationwide.
          </p>
        </div>

        {/* Scrolling coverage ticker */}
        <div className="mb-10 sm:mb-12 space-y-3">
          <CoverageRow groups={[greaterManchester, lancashire]} duration={70} />
          <CoverageRow groups={[cheshire, cumbria, lancashire, greaterManchester]} reverse duration={80} />
        </div>

        {/* The ticker above is decorative and hidden from assistive tech, so the
            same list is repeated here in plain text for screen readers, search
            engines and anyone reading the page as source. */}
        <h3 className="sr-only">Towns and cities we cover in the North West</h3>
        <ul className="sr-only">
          {coverageGroups.map((group) => (
            <li key={group.label}>
              <h4>{group.label}</h4>
              <ul>
                {group.cities.map((city) => (
                  <li key={city}>{city}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        {/* Local Core — the ten towns served most heavily, with detail. */}
        <div className="mb-6 flex items-center gap-3">
          <h3 className="text-xs font-extrabold uppercase tracking-widest text-gray-500">
            North West Towns
          </h3>
          <span aria-hidden="true" className="h-px flex-1 bg-gray-200" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 text-center">
          {localAreas.map((area) => (
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
