import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProcessStrip from './components/ProcessStrip';
import LuxurySlideshow from './components/LuxurySlideshow';
import ShowroomServices from './components/ShowroomServices';
import WorkGallery from './components/WorkGallery';
import AreasCovered from './components/AreasCovered';
import QuoteSection from './components/QuoteSection';
import HighwayBanner from './components/HighwayBanner';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-[#111111] flex flex-col font-sans selection:bg-[#F7941D] selection:text-white">
      {/* 1. Header & Navigation */}
      <Navbar />

      <main className="flex-grow">
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. Three-Step Process Strip (SEE IT, MEASURE IT, FIT IT) */}
        <ProcessStrip />

        {/* 4. Interactive Luxury Gallery Slideshow & Services Hover */}
        <LuxurySlideshow />

        {/* 5. Showroom & Services Catalog */}
        <ShowroomServices />

        {/* 6. Work & Transformations Gallery */}
        <WorkGallery />

        {/* 7. Areas Covered Across North West */}
        <AreasCovered />

        {/* 8. Free Home Survey & Quote Request Form */}
        <QuoteSection />
      </main>

      {/* 9. Animated Fleet Highway Marquee Banner */}
      <HighwayBanner />

      {/* 10. Site Footer */}
      <Footer />
    </div>
  );
}
