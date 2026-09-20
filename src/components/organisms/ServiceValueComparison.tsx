import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, XCircle, Zap } from 'lucide-react';

export default function ServiceValueComparison() {
  const comparisonRows = [
    {
      feature: "Pendekatan Arsitektur",
      cookieCutter: "Template generik & CMS pasaran (lambat, rawan celah keamanan)",
      enterprise: "Custom React 19 / Next.js 15 & Cloud Infrastructure (aman, kilat)",
    },
    {
      feature: "Kecepatan & Performa",
      cookieCutter: "Skor Lighthouse 40–60 (waktu muat > 4 detik)",
      enterprise: "Skor Lighthouse 95–100 (muat dalam < 0.8 detik)",
    },
    {
      feature: "Dampak Konversi Penjualan",
      cookieCutter: "Pengunjung kabur karena loading lambat & UI membingungkan",
      enterprise: "Conversion Rate melonjak +35% s.d. +120% berkat UX optimal",
    },
    {
      feature: "Hak Milik Source Code",
      cookieCutter: "Terkunci di agency lama dengan lisensi berbayar bulanan",
      enterprise: "100% Hak Milik Penuh Anda, diserahterimakan tanpa ikatan",
    },
    {
      feature: "Dukungan & Otomasi AI",
      cookieCutter: "Statis tanpa otomatisasi, butuh biaya tambahan mahal",
      enterprise: "Dilengkapi integrasi Agentic AI & alur kerja otomatis siap pakai",
    },
  ];

  return (
    <section className="py-24 bg-white border-y border-slate-100">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-[11px] font-mono font-bold uppercase tracking-wider mb-4">
            <Zap size={13} className="text-purple-700" />
            Standar Perbandingan
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight mb-4">
            Pendekatan Enterprise vs Agensi Konvensional.
          </h2>
          <p className="text-slate-500 font-sans text-sm sm:text-base leading-relaxed">
            Perbedaan nyata yang menentukan apakah website Anda menjadi mesin penjualan atau sekadar pajangan digital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Cookie Cutter Agency */}
          <div className="p-8 rounded-3xl bg-slate-50/80 border border-slate-200/80 flex flex-col justify-between">
            <div>
              <div className="mb-6 pb-6 border-b border-slate-200/60">
                <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">Metode Lama</span>
                <h3 className="text-xl font-display font-bold text-slate-700 mt-1">Agensi Web Konvensional</h3>
              </div>

              <ul className="space-y-5 mb-8">
                {comparisonRows.map((row, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <XCircle className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
                    <div>
                      <p className="text-[11px] font-mono font-bold text-slate-400 uppercase">{row.feature}</p>
                      <p className="text-xs sm:text-sm font-sans text-slate-600 mt-0.5">{row.cookieCutter}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-200/50 text-slate-600 text-xs font-medium">
              Risiko: Anggaran terbuang dan konversi jalan di tempat.
            </div>
          </div>

          {/* CHESTAADOTCOM Enterprise Standard */}
          <div className="p-8 rounded-3xl bg-slate-900 text-white border border-slate-900 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/15 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <div className="mb-6 pb-6 border-b border-slate-800">
                <span className="text-[11px] font-mono font-bold text-purple-400 uppercase tracking-wider">Standar Tertinggi</span>
                <h3 className="text-xl font-display font-bold text-white mt-1">CHESTAADOTCOM Enterprise</h3>
              </div>

              <ul className="space-y-5 mb-8">
                {comparisonRows.map((row, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                    <div>
                      <p className="text-[11px] font-mono font-bold text-slate-400 uppercase">{row.feature}</p>
                      <p className="text-xs sm:text-sm font-sans text-slate-200 mt-0.5 font-medium">{row.enterprise}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative z-10 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-purple-200 text-xs font-medium">
              ✨ Keunggulan mutlak: Investasi terukur dan performa tanpa kompromi.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
