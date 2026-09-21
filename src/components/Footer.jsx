import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-brand-grayBg border-t border-gray-200 pt-16 pb-12" data-purpose="site-footer">
      <div className="w-[90%] max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <img
              alt="Hali Flooring Logo"
              className="h-11 w-auto object-contain rounded"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEdE0XLtMo4nNRVw-heHrfOCTBmenG7zpaGIyU1aDgnZBsLm8HOEd7WP8m2RApHSMLTWEruhqomg83Dm0W05MLsGWV0c3NWhuU1IfXFGGTVQqxh9DMWoJ6e09ZPGdlpyxZ-ElblBBAX673Tb8MFtrXcv3rfKFW9OlNG1Syz6FXXSWP7X2Fre_SxHkBXQjmHjAHCb7M0reiPkrDpg1s4iCoPuGIFzv2ZFmr7lTQ5NmAy-BlLleGLGSaZmN82sjj5xkaGw"
            />
            <p className="text-gray-600 text-xs sm:text-sm max-w-sm leading-relaxed">
              Professional flooring supply and installation specialists based in Bolton, serving the entire Greater Manchester and Lancashire region.
            </p>
            {/* Socials */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://instagram.com/haliflooring"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-white border border-gray-300 flex items-center justify-center text-gray-700 hover:text-brand-orange hover:border-brand-orange transition-colors shadow-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://tiktok.com/@haliflooring"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-9 h-9 rounded-lg bg-white border border-gray-300 flex items-center justify-center text-gray-700 hover:text-brand-orange hover:border-brand-orange transition-colors shadow-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.97-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.77 1.81-.07 3.25-1.54 3.32-3.34.07-2.67.03-5.34.04-8.01.01-4.06.01-8.11.01-12.16z" />
                </svg>
              </a>
              <span className="text-xs font-semibold text-gray-500">Follow @haliflooring</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider mb-4">Our Services</h4>
            <ul className="space-y-2.5 text-xs font-medium text-gray-600">
              <li>
                <a href="#showroom" className="hover:text-brand-orange transition-colors">
                  Herringbone LVT
                </a>
              </li>
              <li>
                <a href="#showroom" className="hover:text-brand-orange transition-colors">
                  Engineered Hardwood
                </a>
              </li>
              <li>
                <a href="#showroom" className="hover:text-brand-orange transition-colors">
                  Stair Runners &amp; Whipping
                </a>
              </li>
              <li>
                <a href="#showroom" className="hover:text-brand-orange transition-colors">
                  Subfloor Screed Prep
                </a>
              </li>
              <li>
                <a href="#showroom" className="hover:text-brand-orange transition-colors">
                  Commercial Safety Floor
                </a>
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h4 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider mb-4">Working Hours</h4>
            <ul className="space-y-2 text-xs text-gray-600">
              <li className="flex justify-between font-medium">
                <span>Mon - Fri:</span> <span className="text-gray-900 font-bold">8:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between font-medium">
                <span>Saturday:</span> <span className="text-gray-900 font-bold">9:00 AM - 4:00 PM</span>
              </li>
              <li className="flex justify-between font-medium">
                <span>Sunday:</span> <span className="text-brand-orange font-bold">Emergency / By Appt</span>
              </li>
              <li className="pt-2 text-[11px] text-gray-500">
                Free home surveys scheduled to your convenience.
              </li>
            </ul>
          </div>

          {/* Direct Contact Info */}
          <div>
            <h4 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider mb-4">Contact Info</h4>
            <ul className="space-y-2.5 text-xs text-gray-600">
              <li className="text-gray-900 font-extrabold">📞 01204 358904</li>
              <li>📍 Bolton, Greater Manchester, UK</li>
              <li>💬 WhatsApp 7 Days a Week</li>
              <li>✉️ quotes@haliflooring.co.uk</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-300 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 Hali Flooring. All Rights Reserved. Wood Flooring, Carpet &amp; LVT Specialists.</p>
          <div className="flex gap-6 font-semibold">
            <a href="#" className="hover:text-brand-orange transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-brand-orange transition-colors">
              Terms of Service
            </a>
            <a href="#hero" className="text-brand-orange hover:underline font-bold">
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
