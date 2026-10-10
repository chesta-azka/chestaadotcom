'use client';

import React, { useState } from 'react';
import type { Variants } from 'motion/react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { 
  ArrowRight, 
  ChevronDown, 
  Globe, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Zap, 
  MessageSquare,
  HelpCircle
} from 'lucide-react';
import { DynamicCopyResult } from '../../lib/seo-utils';
import FAQSchema from '../atoms/FAQSchema';

export interface ProgrammaticFaqItem {
  question: string;
  answer: string;
}

interface ProgrammaticPageContentProps {
  copy: DynamicCopyResult;
  faqs: ProgrammaticFaqItem[];
  industry: string;
  city: string;
}

const containerVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 18,
    filter: 'blur(4px)'
  },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: { 
      duration: 0.65, 
      ease: [0.16, 1, 0.3, 1] as const,
      staggerChildren: 0.1
    } 
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } 
  }
};

export default function ProgrammaticPageContent({
  copy,
  faqs,
  industry,
  city
}: ProgrammaticPageContentProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(prev => (prev === idx ? null : idx));
  };

  const whatsappText = `Halo Chesta, saya tertarik konsultasi arsitektur digital dan solusi AI untuk industri ${copy.industry} di ${copy.city}.`;
  const whatsappUrl = `https://wa.me/6282125447232?text=${encodeURIComponent(whatsappText)}`;

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-[#fbfbfd] text-slate-900 font-sans selection:bg-purple-100 selection:text-purple-900"
    >
      {/* 1. TOP BREADCRUMB & HEADER CONTAINER */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-12 sm:pb-16 text-left">
        
        {/* Breadcrumb Navigation */}
        <motion.nav 
          variants={itemVariants} 
          aria-label="Breadcrumb" 
          className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-8 font-mono"
        >
          <Link href="/" className="hover:text-purple-700 transition-colors">
            Home
          </Link>
          <span className="text-slate-300">/</span>
          <Link href="/services" className="hover:text-purple-700 transition-colors">
            Services
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 font-semibold truncate">
            {copy.industry} di {copy.city}
          </span>
        </motion.nav>

        {/* Hero Section */}
        <motion.div variants={itemVariants} className="space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200/80 text-purple-700 text-xs font-mono uppercase tracking-wider font-semibold">
            <Globe size={13} className="text-purple-600 animate-pulse" />
            <span>SOLUSI SPESIFIK WILAYAH • {copy.industry.toUpperCase()} DI {copy.city.toUpperCase()}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold text-slate-950 tracking-tight leading-[1.12]">
            {copy.title}
          </h1>

          <p className="text-base sm:text-xl text-slate-600 leading-relaxed font-normal max-w-3xl">
            {copy.hook}
          </p>
        </motion.div>

        {/* Key Metrics / Highlights Grid */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-10 pt-8 border-t border-slate-200/80"
        >
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <span className="text-xs font-mono text-purple-700 font-bold block mb-1">TARGET SEKTOR</span>
            <span className="text-base sm:text-lg font-bold text-slate-950">{copy.industry}</span>
          </div>
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <span className="text-xs font-mono text-purple-700 font-bold block mb-1">CAKUPAN WILAYAH</span>
            <span className="text-base sm:text-lg font-bold text-slate-950">{copy.city}</span>
          </div>
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <span className="text-xs font-mono text-purple-700 font-bold block mb-1">LATENSI SSR EDGE</span>
            <span className="text-base sm:text-lg font-bold text-slate-950">&lt; 300 ms</span>
          </div>
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <span className="text-xs font-mono text-purple-700 font-bold block mb-1">DAMPAK EFISIENSI</span>
            <span className="text-base sm:text-lg font-bold text-purple-700 font-mono">{copy.metric}</span>
          </div>
        </motion.div>

        {/* Quick CTA */}
        <motion.div variants={itemVariants} className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-full bg-purple-700 hover:bg-purple-800 text-white font-bold text-sm sm:text-base tracking-wide shadow-md shadow-purple-700/20 transition-all cursor-pointer group"
          >
            <span>Dapatkan Audit &amp; Konsultasi Gratis</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-slate-100 text-slate-900 border border-slate-200 font-semibold text-sm transition-colors"
          >
            <span>Kembali ke Layanan Utama</span>
          </Link>
        </motion.div>

      </div>

      {/* 2. BODY & VALUE PROPOSITION */}
      <section className="py-16 sm:py-24 bg-white border-t border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            <div className="lg:col-span-7 space-y-5 text-left">
              <span className="text-xs font-mono font-semibold tracking-[0.2em] text-purple-700 uppercase block">
                PENDEKATAN STRATEGIS
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-slate-950 tracking-tight leading-snug">
                Modernisasi Proses Operasional {copy.industry} di {copy.city}
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                {copy.body}
              </p>
              
              <div className="pt-4 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-purple-700 mt-1 shrink-0" />
                  <span className="text-sm sm:text-base text-slate-700 font-medium">
                    Arsitektur cloud terpusat tanpa bottleneck manual antar divisi.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-purple-700 mt-1 shrink-0" />
                  <span className="text-sm sm:text-base text-slate-700 font-medium">
                    Integrasi database real-time dan otomasi alur komunikasi prospek.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-purple-700 mt-1 shrink-0" />
                  <span className="text-sm sm:text-base text-slate-700 font-medium">
                    Evaluasi terukur dengan pemantauan data performa operasional berkala.
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 p-8 sm:p-10 rounded-3xl bg-purple-50/70 border border-purple-200/80 flex flex-col items-center justify-center text-center space-y-3">
              <span className="text-5xl sm:text-6xl font-extrabold text-purple-700 font-mono tracking-tight">
                {copy.metric}
              </span>
              <p className="text-sm sm:text-base font-semibold text-slate-900 max-w-xs">
                {copy.metricLabel}
              </p>
              <span className="text-xs font-mono text-purple-600 pt-2 block">
                Tolak Ukur Efisiensi Operasional &amp; ROAS
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* 3. DYNAMIC FAQ SECTION WITH ACCORDION (Rich Snippet Google Ready) */}
      <section className="py-16 sm:py-24 bg-slate-50/60 border-t border-slate-200/80" id="faqs">
        <FAQSchema faqs={faqs} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="space-y-3 mb-10 text-left">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-[0.2em] text-purple-700 uppercase">
              <HelpCircle size={14} className="text-purple-700" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-slate-950 tracking-tight">
              Pertanyaan Umum: {copy.industry} di {copy.city}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-normal">
              Informasi lengkap seputar implementasi teknologi dan efisiensi sistem digital untuk kebutuhan spesifik perusahaan Anda.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-xs transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 text-left cursor-pointer hover:bg-slate-50/70 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-bold text-slate-950 tracking-tight pr-2">
                      {faq.question}
                    </span>
                    <ChevronDown 
                      size={18} 
                      className={`text-slate-500 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-purple-700' : ''}`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-5 sm:px-6 pb-5 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Section CTA */}
          <div className="mt-12 p-8 rounded-3xl bg-white border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1 text-left">
              <h3 className="text-lg font-bold text-slate-950">
                Punya pertanyaan lain mengenai sistem bisnis Anda?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Diskusikan langsung dengan Principal Architect kami untuk memetakan arsitektur yang ideal.
              </p>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-700 hover:bg-purple-800 text-white font-bold text-sm tracking-wide shrink-0 transition-colors"
            >
              <span>Hubungi Tim Ahli</span>
              <ArrowRight size={15} />
            </a>
          </div>

        </div>
      </section>
    </motion.div>
  );
}
