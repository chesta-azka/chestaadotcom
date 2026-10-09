import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface IndustryItem {
  number: string;
  name: string;
}

const INDUSTRIES: IndustryItem[] = [
  { number: '01', name: 'Manufaktur' },
  { number: '02', name: 'Peternakan & Unggas' },
  { number: '03', name: 'Kesehatan' },
  { number: '04', name: 'Logistik' },
  { number: '05', name: 'Retail' },
  { number: '06', name: 'F&B' },
  { number: '07', name: 'Tour & Travel' },
];

export default function IndustryContextSection() {
  return (
    <section 
      className="py-20 sm:py-28 w-full bg-slate-50/60 text-slate-900 border-t border-slate-200/80 relative overflow-hidden text-left" 
      id="konteks-industri"
      aria-label="Konteks industri"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
        
        {/* Section Header: Fully Left-Aligned, Editorial Typographic Power */}
        <div className="max-w-4xl space-y-4 mb-14 sm:mb-16 text-left">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-semibold tracking-[0.2em] text-purple-700 uppercase">
              Konteks industri
            </span>
            <span className="w-12 h-px bg-purple-200" aria-hidden="true" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-slate-950 tracking-tight leading-[1.12]">
            Memahami industrinya.<br />
            Menyesuaikan solusinya.
          </h2>

          <p className="text-base sm:text-lg font-sans text-slate-600 leading-relaxed font-normal pt-1 max-w-3xl">
            Kami menyesuaikan pendekatan dengan proses kerja, kebutuhan tim, dan tantangan di industri Anda. Jelajahi cakupan implementasi ERP kami.
          </p>
        </div>

        {/* 7 Industries: 01 s/d 07 (Fully Left-Aligned, Compact Editorial, Zero Extra Copywriting) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 border-t border-slate-200/80 pt-8 sm:pt-10 text-left">
          {INDUSTRIES.map((item) => (
            <div key={item.number} className="text-left space-y-1.5 sm:space-y-2">
              <span className="font-mono text-xs sm:text-sm font-bold text-purple-700 block">
                {item.number}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-950 tracking-tight">
                {item.name}
              </h3>
            </div>
          ))}
        </div>

        {/* Link / CTA: Jelajahi implementasi ERP */}
        <div className="pt-10 sm:pt-14 text-left">
          <Link
            to="/services/infrastruktur-digital-enterprise"
            className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-slate-950 hover:text-purple-700 transition-colors group cursor-pointer"
          >
            <span>Jelajahi implementasi ERP</span>
            <ArrowRight size={16} className="text-purple-700 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
