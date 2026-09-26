'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Sparkles, ArrowRight, ShieldCheck, HelpCircle, Zap } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'Apakah aset sistem benar-benar 100% milik perusahaan kami?',
    answer: 'Mutlak 100%. Seluruh kode sumber dan repository diserahkan penuh tanpa biaya sewa platform bulanan.'
  },
  {
    question: 'Bagaimana sistem otomatis mengeliminasi human-error?',
    answer: 'Validasi otomatis mengunci pesanan seketika, mengeliminasi salah rekap, selisih stok, dan kerja ganda staf admin.'
  },
  {
    question: 'Berapa lama proses pengerjaan hingga sistem siap go-live?',
    answer: 'Paket UMKM selesai dalam 1–3 hari, sedangkan sistem Enterprise diselesaikan presisi dalam 7–14 hari kerja.'
  },
  {
    question: 'Apakah ada potongan komisi atau biaya tersembunyi?',
    answer: 'Nol biaya tersembunyi. Sekali bayar untuk kepemilikan aset selamanya tanpa potongan omset.'
  },
  {
    question: 'Bagaimana cara memulai konsultasi proyek kami?',
    answer: 'Hubungi WhatsApp resmi untuk diskusi langsung dengan Principal Architect mengenai arsitektur dan ROI bisnis Anda.'
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const whatsappUrl = "https://wa.me/6282125447232?text=" + encodeURIComponent("Halo Mas Chesta, saya tertarik mengaktifkan Autonomous Business Engine untuk perusahaan kami.");

  return (
    <section id="faq" className="w-full pt-16 md:pt-24 bg-slate-50">
      
      {/* 1. Minimalist Borderless FAQ Accordion */}
      <div className="max-w-4xl mx-auto px-6 relative z-10 mb-20">
        
        {/* Section Header with Extreme Typographic Hierarchy */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200/80 text-purple-700 text-xs font-mono font-medium mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span className="tracking-widest uppercase">TRANSPARANSI &amp; KEPASTIAN BISNIS</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium text-slate-950 tracking-tight mb-4 leading-[1.15] text-balance flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-purple-100/80 border border-purple-200/80 text-purple-900 shadow-xs shrink-0">
              <HelpCircle className="w-5 h-5 md:w-6 md:h-6 stroke-[1.8]" />
            </span>
            <span>Pertanyaan Strategis Bisnis</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto font-normal text-base md:text-lg leading-relaxed text-balance">
            Kepastian hak milik aset, sistem anti-salah input, dan jaminan transparansi investasi.
          </p>
        </div>

        {/* Minimalist Borderless Accordion */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-purple-300 transition-all duration-300 group"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 sm:p-8 text-left bg-transparent transition-colors cursor-pointer"
                >
                  <span className="text-base sm:text-lg font-medium text-slate-900 tracking-tight leading-snug group-hover:text-purple-700 transition-colors pr-4">
                    {faq.question}
                  </span>
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen 
                        ? 'bg-purple-900 text-white rotate-180 shadow-xs border border-purple-800' 
                        : 'bg-purple-50 text-purple-700 group-hover:bg-purple-100'
                    }`}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-6 sm:px-8 pb-8 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 pt-5 font-normal">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Massive, Edge-to-Edge Refined Executive CTA Block */}
      <div className="w-full bg-slate-950 border-t border-slate-800 py-20 md:py-28 px-6 relative">
        {/* Subtle Ambient Light */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[300px] bg-purple-950/30 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
          
          <div className="max-w-3xl text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-purple-300 text-xs font-mono font-medium tracking-wider uppercase mb-6 border border-purple-900/60">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              <span>KONSULTASI STRATEGIS EKSEKUTIF</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-medium text-white tracking-tight leading-[1.08] text-balance mb-6 flex items-start gap-3.5">
              <span className="inline-flex items-center justify-center w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-purple-950/80 border border-purple-800/80 text-purple-300 shadow-xs shrink-0 mt-1">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
              </span>
              <span>
                Amankan Dominasi Pasar &amp; <span className="text-purple-300 font-serif italic">Margin Profit Anda.</span>
              </span>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg font-normal leading-relaxed max-w-2xl text-balance">
              Hentikan kebocoran profit manual. Aktifkan Autonomous Business Engine untuk beroperasi 24/7 otonom.
            </p>
          </div>

          <div className="shrink-0 w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white hover:bg-slate-100 text-slate-950 rounded-2xl font-medium text-base sm:text-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-3 shrink-0 whitespace-nowrap cursor-pointer group"
            >
              <span>Konsultasi Strategis via WhatsApp</span>
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1.5" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
