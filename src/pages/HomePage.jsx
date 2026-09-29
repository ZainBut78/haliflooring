import React from 'react'
import Layout from '../components/Layout'
import { useHead } from '../components/Seo'
import Hero from '../components/Hero'
import ProcessStrip from '../components/ProcessStrip'
import LuxurySlideshow from '../components/LuxurySlideshow'
import ShowroomServices from '../components/ShowroomServices'
import WorkGallery from '../components/WorkGallery'
import AreasCovered from '../components/AreasCovered'
import QuoteSection from '../components/QuoteSection'

export default function HomePage() {
  // 1. Structured data + H1 copy are declared here so the SSG generator
  //    can pull the same strings that React renders.
  useHead({
    h1: 'Wood Flooring, Carpet & LVT Specialists in Bolton',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Hali Flooring',
      url: 'https://haliflooring.co.uk/',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://haliflooring.co.uk/work?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
  })

  return (
    <Layout showHighway={false}>
      <Hero />
      <ProcessStrip />
      <LuxurySlideshow />
      <ShowroomServices />
      <WorkGallery />
      <AreasCovered />
      <QuoteSection />
    </Layout>
  )
}
