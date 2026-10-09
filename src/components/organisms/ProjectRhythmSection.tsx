import React from 'react';

export default function ProjectRhythmSection() {
  return (
    <section 
      className="py-20 sm:py-28 w-full bg-white text-slate-900 border-t border-slate-200/80 relative overflow-hidden text-left" 
      id="ritme-proyek"
      aria-label="Ritme Proyek"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
        
        {/* Section Header: Fully Left-Aligned, Editorial Typographic Power */}
        <div className="max-w-4xl space-y-4 mb-14 sm:mb-16 text-left">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-semibold tracking-[0.2em] text-purple-700 uppercase">
              RITME PROYEK
            </span>
            <span className="w-12 h-px bg-purple-200" aria-hidden="true" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-slate-950 tracking-tight leading-[1.12]">
            Langkah yang jelas,<br />
            dari kebutuhan<br />
            hingga penerapan.
          </h2>
        </div>

        {/* 4 Steps: 01, 02, 03, 04 (Fully Left-Aligned, Compact Editorial) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 border-t border-slate-200/80 pt-8 sm:pt-10 text-left">
          
          {/* Step 01 */}
          <div className="text-left space-y-2">
            <span className="font-mono text-xs sm:text-sm font-bold text-purple-700 block">
              01
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-950 tracking-tight">
              Pahami
            </h3>
            <p className="text-xs sm:text-sm font-normal text-slate-600 leading-relaxed">
              Pelajari proses bisnis, tantangan tim, dan tujuan yang ingin dicapai.
            </p>
          </div>

          {/* Step 02 */}
          <div className="text-left space-y-2">
            <span className="font-mono text-xs sm:text-sm font-bold text-purple-700 block">
              02
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-950 tracking-tight">
              Petakan
            </h3>
            <p className="text-xs sm:text-sm font-normal text-slate-600 leading-relaxed">
              Tentukan prioritas, cakupan solusi, dan tahapan pengerjaan bersama.
            </p>
          </div>

          {/* Step 03 */}
          <div className="text-left space-y-2">
            <span className="font-mono text-xs sm:text-sm font-bold text-purple-700 block">
              03
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-950 tracking-tight">
              Terapkan
            </h3>
            <p className="text-xs sm:text-sm font-normal text-slate-600 leading-relaxed">
              Bangun dan uji solusi sesuai alur kerja serta kebutuhan pengguna.
            </p>
          </div>

          {/* Step 04 */}
          <div className="text-left space-y-2">
            <span className="font-mono text-xs sm:text-sm font-bold text-purple-700 block">
              04
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-950 tracking-tight">
              Kembangkan
            </h3>
            <p className="text-xs sm:text-sm font-normal text-slate-600 leading-relaxed">
              Evaluasi penggunaan dan tentukan pengembangan berikutnya sesuai kebutuhan bisnis.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
