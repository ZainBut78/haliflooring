import React from 'react'

/**
 * Plain statement band: a dark strip with a centred heading, nothing else.
 */
export default function ExcellenceBand() {
  return (
    <section aria-labelledby="excellence-heading" className="bg-[#111111] py-8 lg:py-10 mt-10 lg:mt-14">
      <div className="w-[90%] max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="excellence-heading"
          className="text-2xl sm:text-4xl font-bold text-brand-orange font-display tracking-tight text-center text-balance"
        >
          Flooring Excellence in Both Domestic and Commercial Projects
        </h2>
      </div>
    </section>
  )
}
