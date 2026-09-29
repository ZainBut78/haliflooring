import React from 'react';

export default function HighwayBanner() {
  return (
    <div
      aria-hidden="true"
      className="w-full overflow-hidden bg-[#111111] border-y border-neutral-800 py-3.5 relative"
    >
      <div className="flex items-center animate-van-highway whitespace-nowrap text-xs font-mono tracking-widest text-gray-300 gap-8">
        <span>🚐 HALI FLOORING FLEET ON ROUTE</span>
        <span className="text-brand-orange font-bold">•</span>
        <span>BOLTON • MANCHESTER • BURY • PRESTON • WIGAN</span>
        <span className="text-brand-orange font-bold">•</span>
        <span>FREE MEASURING SERVICE: +44 7467 030479</span>
        <span className="text-brand-orange font-bold">•</span>
        <span>SUPPLY &amp; FIT SPECIALISTS</span>
      </div>
    </div>
  );
}
