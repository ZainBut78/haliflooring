import React from 'react'

/**
 * Plain statement band: a dark strip with the heading, then one short
 * paragraph underneath. Deliberately nothing else.
 */
export default function ExcellenceBand() {
  return (
    <section aria-labelledby="excellence-heading" className="bg-white">
      <div className="bg-[#111111] py-8 lg:py-10">
        <div className="w-[90%] max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            id="excellence-heading"
            className="text-2xl sm:text-4xl font-bold text-brand-orange font-display tracking-tight max-w-3xl"
          >
            Flooring Excellence in Both Domestic and Commercial Projects
          </h2>
        </div>
      </div>
      <div className="w-[90%] max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <p className="max-w-3xl text-base sm:text-lg text-gray-600 leading-relaxed">
          At Hali Flooring we supply and fit quality flooring for homes and businesses across the North West.
          From carpets and LVT to engineered wood, laminate and commercial safety flooring, every job gets the
          same careful workmanship and honest advice, so you end up with the right floor at the right price.
        </p>
      </div>
    </section>
  )
}
