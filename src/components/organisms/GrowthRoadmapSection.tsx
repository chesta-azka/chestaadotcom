'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Compass, ArrowRight, CheckCircle2 } from 'lucide-react';

const STEPS = [
  {
    step: "01",
    title: "Executive Discovery & Blueprint",
    duration: "Hari 1 - 2",
    description: "Diskusi mendalam bersama Principal Architect untuk memetakan kebutuhan operasional, target omset, dan sistem otomatisasi anti-salah input.",
    deliverables: ["Blueprint Arsitektur Bisnis", "Matriks Estimasi & ROI", "SOP Otomatisasi"]
  },
  {
    step: "02",
    title: "Precision Engineering & System Setup",
    duration: "Hari 3 - 10",
    description: "Perakitan sistem penjualan berkecepatan tinggi, integrasi asisten otonom, dan pengujian ketat tanpa human-error.",
    deliverables: ["Sistem Penjualan Super Instan", "Dashboard Admin Anti-Error", "Asisten Otonom 24/7"]
  },
  {
    step: "03",
    title: "Go-Live, Domination & Handover",
    duration: "Hari 11 - 12",
    description: "Peluncuran resmi ke domain .COM perusahaan Anda. Handover 100% hak milik source code tanpa biaya sewa bulanan.",
    deliverables: ["Domain .COM Resmi Aktif", "Handover Repository 100%", "Pelatihan Tim Internal"]
  }
];

export default function GrowthRoadmapSection() {
  const whatsappUrl = "https://wa.me/6282125447232?text=" + encodeURIComponent("Halo Mas Chesta, kami ingin memulai langkah pertama konsultasi roadmap digital untuk perusahaan kami.");

  return (
    <section className="w-full py-16 md:py-20 relative bg-transparent overflow-hidden" id="roadmap">
      {/* Background Spatial Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-purple-200/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header with Extreme Typographic Hierarchy */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-200/80 text-purple-700 text-xs font-bold mb-4 shadow-sm"
          >
            <Compass className="w-3.5 h-3.5 text-purple-600 animate-spin" />
            <span className="tracking-widest uppercase">LANGKAH MUDAH KORPORAT</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 font-display leading-[1.1] text-balance">
            Roadmap Menuju Dominasi Pasar Digital.
          </h2>
          
          <p className="text-slate-600 mt-5 text-base md:text-xl font-light max-w-2xl mx-auto leading-relaxed text-balance">
            Proses eksekusi terstruktur yang dirancang agar perusahaan Anda langsung beroperasi secara otonom tanpa hambatan.
          </p>
        </div>

        {/* Horizontal 3-Step Timeline with Minimalist Connecting SVG Path */}
        <div className="relative">
          
          {/* Desktop SVG Connecting Line with Subtle Glow */}
          <div className="hidden md:block absolute top-[52px] left-[15%] right-[15%] h-[2px] z-0 pointer-events-none">
            <svg className="w-full h-2 overflow-visible" preserveAspectRatio="none">
              <line 
                x1="0" 
                y1="1" 
                x2="100%" 
                y2="1" 
                stroke="#e2e8f0" 
                strokeWidth="2" 
                strokeDasharray="6 6" 
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {STEPS.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="p-8 rounded-[2.25rem] bg-white/70 backdrop-blur-xl border border-purple-100/50 shadow-xl shadow-purple-900/5 hover:border-purple-300 transition-all duration-300 flex flex-col justify-between group relative"
              >
                <div>
                  {/* Clean Numeric Indicator with Status Ring */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="relative flex items-center justify-center">
                      <div className="w-14 h-14 rounded-2xl bg-purple-900 text-white flex items-center justify-center font-display font-semibold text-xl shadow-lg shadow-purple-900/20 group-hover:scale-105 transition-transform duration-300">
                        {item.step}
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
                      {item.duration}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-semibold text-slate-900 mb-3 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 font-sans font-light leading-relaxed mb-6">
                    {item.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-purple-100/60">
                    {item.deliverables.map((deliv, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2.5 text-xs font-medium text-slate-700">
                        <CheckCircle2 size={15} className="text-purple-600 shrink-0" />
                        <span>{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <div className="w-full h-1 bg-purple-100/80 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 + (idx * 0.15) }}
                      className="h-full bg-purple-600 rounded-full" 
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Centered High-Contrast Executive CTA */}
        <div className="mt-14 text-center flex justify-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-purple-900 hover:bg-purple-800 text-white font-sans font-bold text-sm transition-all shadow-[0_12px_32px_-8px_rgba(88,28,135,0.4)] group cursor-pointer"
          >
            <span>Mulai Langkah 1 (Konsultasi Eksekutif)</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
}
