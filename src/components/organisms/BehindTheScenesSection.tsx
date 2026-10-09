import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function BehindTheScenesSection() {
  return (
    <section 
      className="py-20 sm:py-28 w-full bg-slate-50/60 text-slate-900 border-t border-slate-200/80 relative overflow-hidden text-left" 
      id="di-balik-layar"
      aria-label="Di balik layar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
        
        {/* Section Header: Fully Left-Aligned, Editorial Typographic Power */}
        <div className="max-w-4xl space-y-4 mb-14 sm:mb-16 text-left">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-semibold tracking-[0.2em] text-purple-700 uppercase">
              -Di balik layar
            </span>
            <span className="w-12 h-px bg-purple-200" aria-hidden="true" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-slate-950 tracking-tight leading-[1.12]">
            Perubahan yang terasa<br />
            dalam pekerjaan<br />
            sehari-hari.
          </h2>

          <p className="text-base sm:text-lg font-sans text-slate-600 leading-relaxed font-normal pt-1 max-w-3xl">
            Solusi digital perlu membantu pekerjaan tim dan mendukung keputusan bisnis. Inilah yang menjadi fokus kami dalam setiap penerapan.
          </p>
        </div>

        {/* 4 Pillars: 01, 02, 03, 04 (Fully Left-Aligned, Compact Editorial, Zero Icons) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 border-t border-slate-200/80 pt-6 sm:pt-8 text-left">
          
          <div className="text-left space-y-2">
            <span className="font-mono text-xs sm:text-sm font-bold text-purple-700 block">
              01
            </span>
            <p className="text-sm sm:text-base font-medium text-slate-900 tracking-normal leading-relaxed">
              Proses lebih sederhana — kurangi pekerjaan berulang.
            </p>
          </div>

          <div className="text-left space-y-2">
            <span className="font-mono text-xs sm:text-sm font-bold text-purple-700 block">
              02
            </span>
            <p className="text-sm sm:text-base font-medium text-slate-900 tracking-normal leading-relaxed">
              Informasi saling terhubung — data selaras dan mudah ditemukan.
            </p>
          </div>

          <div className="text-left space-y-2">
            <span className="font-mono text-xs sm:text-sm font-bold text-purple-700 block">
              03
            </span>
            <p className="text-sm sm:text-base font-medium text-slate-900 tracking-normal leading-relaxed">
              Keputusan lebih jelas — kondisi bisnis mudah dipantau.
            </p>
          </div>

          <div className="text-left space-y-2">
            <span className="font-mono text-xs sm:text-sm font-bold text-purple-700 block">
              04
            </span>
            <p className="text-sm sm:text-base font-medium text-slate-900 tracking-normal leading-relaxed">
              Siap mengikuti perkembangan — sistem dikembangkan sesuai kebutuhan.
            </p>
          </div>

        </div>

        {/* Link / CTA: Kenali cara kerja kami */}
        <div className="pt-10 sm:pt-14 text-left">
          <a
            href="#roadmap"
            className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-slate-950 hover:text-purple-700 transition-colors group cursor-pointer"
          >
            <span>Kenali cara kerja kami</span>
            <ArrowRight size={16} className="text-purple-700 group-hover:translate-x-1.5 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
}
