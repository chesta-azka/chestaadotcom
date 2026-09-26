'use client';

import React from 'react';
import type { Variants } from 'motion/react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Cpu, Zap, Layers, CheckCircle2 } from 'lucide-react';

// Elite orchestration variants extracted outside component
const serviceContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  }
};

const serviceItemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    }
  }
};

const SPLIT_SERVICES = [
  {
    number: "01",
    title: "Next-Gen Web Architecture",
    description: "Website berkecepatan tinggi tanpa kompromi. Memuat katalog dan penawaran Anda dalam waktu kurang dari 0.2 detik. Mengunci atensi calon pembeli seketika sebelum mereka berpaling ke kompetitor.",
    badge: "Kecepatan Muat Sub-Detik",
    metrics: "Sub-Detik Performance (< 0.2s)",
    href: "/layanan/landing-page-kilat",
    icon: Zap
  },
  {
    number: "02",
    title: "AI Autonomous Sales Agent",
    description: "Asisten cerdas otonom yang aktif 24 jam sehari tanpa libur. Menyaring lead berkualitas, menjawab pertanyaan spesifikasi produk dengan tepat, dan mengantarkan pembeli siap transfer langsung ke WhatsApp.",
    badge: "Otonom 24/7 Tanpa Cuti",
    metrics: "Kualifikasi Prospek Real-Time",
    href: "/layanan/website-sales-otomatis",
    icon: Cpu
  },
  {
    number: "03",
    title: "System & Database Integration",
    description: "Otomatisasi total. Tidak ada lagi admin salah input data atau kerja dua kali. Sekali klik, seluruh data tersimpan rapi, tersinkronisasi instan ke WhatsApp sales, dan aset sistem 100% mutlak milik perusahaan Anda selamanya.",
    badge: "Nol Human-Error & Aset 100%",
    metrics: "100% Kepemilikan Mutlak",
    href: "/layanan/ecommerce-automation",
    icon: Layers
  }
];

export default function StickySplitServices() {
  return (
    <section className="py-16 md:py-20 relative bg-white border-y border-slate-200/80 overflow-hidden" id="sticky-services">
      <div className="w-full max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start relative">
          
          {/* LEFT COLUMN: Sticky / Pinned Header */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <motion.div
              variants={serviceContainerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="space-y-6"
            >
              <motion.div variants={serviceItemVariants}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-200 mb-4 shadow-sm">
                  <Sparkles size={14} className="text-purple-700 animate-pulse" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-purple-900">
                    Autonomous Business Engine
                  </span>
                </div>

                <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tighter leading-[1.05] text-balance">
                  Sistem Penjualan Mandiri untuk Profit Maksimal.
                </h2>

                <p className="text-slate-600 text-base sm:text-lg leading-relaxed mt-5 font-light text-balance">
                  Website super cepat dipadukan dengan asisten pintar yang otomatis menyaring prospek dan menutup penjualan di detik pertama. Bebas biaya sewa bulanan dan jebakan agensi.
                </p>

                <div className="pt-6 space-y-4">
                  {[
                    "100% Hak Milik Source Code & Aset Tanpa Biaya Bulanan",
                    "Website Super Cepat & Kecepatan Muat di Bawah 0.2 Detik",
                    "Sistem Cerdas 24/7 Tanpa Cuti Memangkas Gaji Admin"
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm font-sans text-slate-700">
                      <CheckCircle2 size={18} className="text-purple-600 shrink-0" />
                      <span className="font-medium tracking-tight">{text}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-8">
                  <a 
                    href="https://wa.me/6282125447232?text=Halo%20Mas%20Chesta,%20saya%20ingin%20berdiskusi%20mengenai%20sistem%20penjualan%20super%20cepat%20dan%20otomasi%20bisnis."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-purple-900 text-white rounded-2xl font-black text-base shadow-[0_16px_36px_-12px_rgba(88,28,135,0.4)] hover:bg-purple-800 transition-all border border-purple-800"
                  >
                    <span>Eksplorasi Solusi Profit</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Scrolling Content Cards Sequence */}
          <div className="lg:col-span-7 space-y-8">
            {SPLIT_SERVICES.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  variants={serviceItemVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  className="bg-white/70 backdrop-blur-xl border border-purple-100/50 hover:border-purple-300 rounded-[2.25rem] p-8 sm:p-10 shadow-xl shadow-purple-900/5 transition-all duration-500 group relative overflow-hidden"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700 font-display font-black text-lg shadow-inner transform group-hover:rotate-6 transition-transform duration-500">
                        {item.number}
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-100 shadow-sm">
                          {item.badge}
                        </span>
                        <span className="text-[11px] font-mono font-bold text-slate-400 block tracking-wider">
                          {item.metrics}
                        </span>
                      </div>
                    </div>
                    <div className="p-3.5 bg-slate-50 rounded-2xl text-purple-700 group-hover:bg-purple-900 group-hover:text-white transition-all duration-500 transform group-hover:scale-110 shrink-0 self-start sm:self-auto">
                      <Icon size={24} />
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-snug mb-3">
                    {item.title}
                  </h3>
                  
                  <p className="text-slate-600 text-base leading-relaxed font-light mb-8">
                    {item.description}
                  </p>

                  <div className="pt-6 border-t border-purple-100/60 flex items-center justify-between">
                    <a
                      href={item.href}
                      className="inline-flex items-center gap-2 text-sm font-black text-purple-900 group-hover:text-purple-600 transition-colors"
                    >
                      <span>Lihat Spesifikasi Arsitektur</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                    <span className="text-[10px] font-black font-mono text-slate-300 tracking-[0.2em] uppercase">
                      CHESTAADOTCOM
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
