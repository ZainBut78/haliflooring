import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-brand-borderLight transition-all duration-300 ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      <div className="w-[90%] max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC53T3bCVmi5DemrBqwVhiwxK3wXfzPaxkbQRrwyB6P92lxkKNc_HWA1sjtB_UT3rB2boCJ4f1-2MqsOaWdmm-hCnPoMq7k8DjZy78iIudq_rNyz7mJUe4gihe-QGlZa4o79ixDtzeDdLWvVzA27AuLyv9fN7bCf7V5kp3H3H0_lvosIgnM4Tjic4BHJBXoNMBJrczYwB0qTPmqzHW_Yg-zwBmes1CqhH-gRd8cF9uLqHgD6v8qCVJE-GidftSZcBVqrA"
            alt="Hali Flooring Official Logo"
            className="h-10 sm:h-12 w-auto object-contain rounded transition-transform duration-300 group-hover:scale-105"
          />
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-gray-700">
          <a href="#showroom" className="hover:text-brand-orange transition-colors">
            Showroom
          </a>
          <a href="#process" className="hover:text-brand-orange transition-colors">
            How We Work
          </a>
          <a href="#showcase" className="hover:text-brand-orange transition-colors">
            Our Work
          </a>
          <a href="#areas" className="hover:text-brand-orange transition-colors">
            Areas
          </a>
        </nav>

        {/* Contact & Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:01204358904"
            className="flex items-center gap-2 text-sm font-bold text-gray-800 hover:text-brand-orange transition-colors px-3.5 py-2 rounded-lg border border-gray-200 bg-gray-50 hover:border-brand-orange"
          >
            <svg className="w-4 h-4 text-brand-orange" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
            <span>01204 358904</span>
          </a>
          <a
            href="#quote"
            className="bg-brand-orange hover:bg-brand-orangeHover text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow-md shadow-brand-orange/30 flex items-center gap-2"
          >
            <span>Get Free Quote</span>
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
          className="lg:hidden p-2 text-gray-700 hover:text-brand-orange focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-6 py-6 space-y-4 shadow-xl animate-fadeIn">
          <a
            href="#showroom"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-gray-800 hover:text-brand-orange"
          >
            Showroom
          </a>
          <a
            href="#process"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-gray-800 hover:text-brand-orange"
          >
            How We Work
          </a>
          <a
            href="#showcase"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-gray-800 hover:text-brand-orange"
          >
            Our Work
          </a>
          <a
            href="#areas"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-semibold text-gray-800 hover:text-brand-orange"
          >
            Areas Covered
          </a>
          <div className="pt-4 border-t border-gray-200 flex flex-col gap-3">
            <a
              href="tel:01204358904"
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-gray-300 text-gray-900 font-semibold"
            >
              <span className="text-brand-orange">📞</span> 01204 358904
            </a>
            <a
              href="#quote"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center py-2.5 rounded-lg bg-brand-orange text-white font-bold shadow-md"
            >
              Get Free Quote
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
