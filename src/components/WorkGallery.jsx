import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ResponsiveImage from './ResponsiveImage';

// Each card opens the matching project page. The slugs come from `projects` in
// src/data/content.js — the same data the /work/… routes render.
const projects = [
  {
    to: '/work/bolton-residence-herringbone-lvt',
    category: 'lvt',
    location: 'BOLTON RESIDENCE',
    type: 'Herringbone LVT',
    spec: 'Full Screed Prep',
    title: '45m² Open-Plan Kitchen & Diner',
    desc: 'Precision alignment with 2-plank perimeter border and flush brass transitions.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCvmR27rjqwq15T9FZwNP8QILSRvp1lpvT7JhPLZU0GlaRR23FvRXIPLWigOvr-APnUJe-IdOWMD8Y9SXGl8wpvXxmMyqctCLWD-dn1zfBzPSqY45P1w7tMR6bRQo-oqnrFnch0LCXob5bI4n24UWbh9POJnK9JGJfiybWY5U10XxiCTniVTqeT-koUU5vXhJqyZuwZp7ribz9oS49ppzlYa5u9ZMTLkXORA8tQYOIfm4Yz5EtWOIRp'
  },
  {
    to: '/work/worsley-manor-custom-runner',
    category: 'carpet',
    location: 'WORSLEY MANOR',
    type: 'Custom Runner',
    spec: 'Matte Black Rods',
    title: 'Curved Flight with Whipped Edge',
    desc: 'Deep pile wool runner custom-whipped on site with acoustic 11mm underlay.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCr3-NA2oFWyFzen5Nlj5tbQzqlUi6IeAdjZNitqErGlx7kO7UKdnyiBDmia_V_OdgnXANv0X1HhYDUCUmOVESVSp0xxilEMLnfWSUf6it4uqh4XhMOr_1YGW3kwSGqRnNi9WSmvrFjF-MaSok504-4nHAM2CnhYa24whGdRzggpDvAX-gtdQ3hezRl34hwN2kUPlIfdBkz424rLvEAYbHyVysn8xcm4THbeV8zbnj-bmzfyH6h_FAJ'
  },
  {
    to: '/work/chorley-barn-engineered-oak',
    category: 'wood',
    location: 'CHORLEY BARN',
    type: 'Engineered Oak',
    spec: 'UFH Compatible',
    title: 'Smoked Brushed European Oak',
    desc: 'Floating installation with specialized thermal acoustic membrane over manifold heating.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBnEd5uJdw4CfMHQT0Ernj6fKaxlswX3acNCbxqW73oI_TSjlLbX6V2YK_MQ5XV5Ng4c4DVGMHuEUZ3lqMSXx6yKx3ZwWtyJy4JSqYt7dUCjvCiJbVdY1V6mZjQ5Rj1ms7o7xvUO7D7oc2OnnLF8VQQRNbEG1Is67Js80Jo1t4UhdYf_qN2BwwBVVyL0to1m8dTRNfcX-bhNUzxYasVlfNeSiuItxftba7qSw7O1hzKTZ13cgbojNb7'
  }
];

export default function WorkGallery() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((item) => item.category === activeCategory);

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
              FLOORING GALLERY
            </span>
            <h2 className="mt-3 text-4xl sm:text-6xl font-extrabold text-white font-display uppercase tracking-tight">
              WORK
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 text-xs font-bold" id="gallery-filters">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2.5 rounded-xl transition-all ${
                activeCategory === 'all'
                  ? 'bg-brand-orange text-white shadow-sm'
                  : 'bg-neutral-900 text-neutral-300 hover:text-white hover:bg-neutral-800 border border-neutral-700'
              }`}
            >
              All Work
            </button>
            <button
              onClick={() => setActiveCategory('lvt')}
              className={`px-4 py-2.5 rounded-xl transition-all ${
                activeCategory === 'lvt'
                  ? 'bg-brand-orange text-white shadow-sm'
                  : 'bg-neutral-900 text-neutral-300 hover:text-white hover:bg-neutral-800 border border-neutral-700'
              }`}
            >
              Herringbone LVT
            </button>
            <button
              onClick={() => setActiveCategory('carpet')}
              className={`px-4 py-2.5 rounded-xl transition-all ${
                activeCategory === 'carpet'
                  ? 'bg-brand-orange text-white shadow-sm'
                  : 'bg-neutral-900 text-neutral-300 hover:text-white hover:bg-neutral-800 border border-neutral-700'
              }`}
            >
              Stair Runners
            </button>
            <button
              onClick={() => setActiveCategory('wood')}
              className={`px-4 py-2.5 rounded-xl transition-all ${
                activeCategory === 'wood'
                  ? 'bg-brand-orange text-white shadow-sm'
                  : 'bg-neutral-900 text-neutral-300 hover:text-white hover:bg-neutral-800 border border-neutral-700'
              }`}
            >
              Engineered Oak
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((proj) => (
            <Link
              key={proj.to}
              to={proj.to}
              className="gallery-card-reveal group bg-[#1a1a1a] rounded-2xl overflow-hidden border border-neutral-800 hover:border-brand-orange transition-all duration-500 shadow-xl hover:shadow-glow-orange/20"
            >
              <div className="relative h-72 overflow-hidden bg-neutral-900">
                <ResponsiveImage
                  image={proj.image}
                  alt={proj.title}
                  sizes="(min-width: 1024px) 34vw, (min-width: 640px) 50vw, 100vw"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                <span className="absolute top-4 left-4 bg-black/75 backdrop-blur-md text-brand-orange font-mono text-[11px] font-extrabold px-3 py-1 rounded-full border border-brand-orange/30 shadow-md">
                  {proj.location}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between text-xs font-semibold text-neutral-400 mb-2.5">
                  <span className="text-brand-orange font-bold">{proj.type}</span>
                  <span className="border-b border-neutral-700 pb-0.5">{proj.spec}</span>
                </div>
                <h3 className="text-lg font-extrabold text-white group-hover:text-brand-orange transition-colors">
                  {proj.title}
                </h3>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">{proj.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
