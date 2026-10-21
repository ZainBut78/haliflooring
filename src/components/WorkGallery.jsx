import React from 'react';
import { Link } from 'react-router-dom';
import ResponsiveImage from './ResponsiveImage';
import { homeWork } from '../data/content';

// Home page Work cards use the client's three supplied before/after photos.
export default function WorkGallery() {
  return (
    <section
      id="showcase"
      data-purpose="work-gallery"
      className="py-20 lg:py-28 bg-[#111111] text-white relative overflow-hidden border-t border-neutral-800"
      style={{
        backgroundColor: 'rgba(17, 17, 17, 0.95)',
        backdropFilter: 'blur(12px)'
      }}
    >
      {/* Background Ambient Floor Glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-brand-orange/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="w-[90%] max-w-[1680px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <span className="text-brand-orange font-bold text-xs uppercase tracking-[0.25em] bg-brand-orange/15 px-3.5 py-1 rounded-full border border-brand-orange/30">
              BEFORE &amp; AFTER
            </span>
            <h2 className="mt-3 text-4xl sm:text-6xl font-extrabold text-white font-display uppercase tracking-tight">
              WORK
            </h2>
          </div>

          <Link
            to="/work"
            className="self-start md:self-auto px-5 py-3 rounded-xl border border-neutral-700 hover:border-brand-orange text-sm font-bold text-neutral-200 hover:text-white transition-colors"
          >
            See all our work →
          </Link>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-8">
          {homeWork.map((item) => (
            <Link
              key={item.id}
              to="/work"
              className="gallery-card-reveal group bg-[#1a1a1a] rounded-2xl overflow-hidden border border-neutral-800 hover:border-brand-orange transition-all duration-500 shadow-xl hover:shadow-glow-orange/20"
            >
              {/* Whole photo, never cropped: the BEFORE / AFTER labels sit in its corners. */}
              <div className="relative aspect-[16/9] overflow-hidden bg-black">
                <ResponsiveImage
                  image={item.image}
                  alt={item.alt}
                  sizes="(min-width: 1024px) 34vw, (min-width: 640px) 50vw, 100vw"
                  className="h-full w-full object-contain"
                />
              </div>
              {(item.heading?.trim() || item.summary?.trim()) && (
                <div className="px-5 py-4">
                  {item.heading?.trim() && (
                    <h3 className="text-center text-lg font-extrabold text-white group-hover:text-brand-orange transition-colors">
                      {item.heading}
                    </h3>
                  )}
                  {item.summary?.trim() && (
                    <p className={`text-sm text-neutral-400 leading-relaxed ${item.heading?.trim() ? 'mt-2' : ''}`}>
                      {item.summary}
                    </p>
                  )}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
