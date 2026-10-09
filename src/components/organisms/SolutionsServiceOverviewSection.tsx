'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

interface PrimaryService {
  number: string;
  title: string;
  slug: string;
  category: string;
  tagline: string;
  techStack: string[];
  keywords: string[];
  previewDescription: string;
}

const PRIMARY_SERVICES: PrimaryService[] = [
  {
    number: '01',
    title: 'Web Dev & Mesin Konversi',
    slug: 'website-mesin-konversi',
    category: 'Next.js 15 · Sub-Detik',
    tagline: 'Arsitektur web berkecepatan tinggi yang dirancang untuk melipatgandakan konversi penjualan.',
    techStack: ['Next.js 15 App Router', 'TypeScript', 'Tailwind CSS', 'Edge SSR', 'Core Web Vitals 100'],
    keywords: [
      'jasa pembuatan website bsd',
      'web developer cisauk',
      'landing page konversi tinggi',
      'website sub detik tangerang',
      'arsitektur frontend nextjs'
    ],
    previewDescription: 'Infrastruktur web zero-bloat tanpa plugin lambat. Dioptimalkan untuk kecepatan muat sub-0.8 detik, Core Web Vitals hijau sempurna, dan struktur psikologi closing.'
  },
  {
    number: '02',
    title: 'Karyawan Digital AI',
    slug: 'karyawan-digital-ai',
    category: 'Autonomous Multi-Agent',
    tagline: 'Agen AI otonom yang bekerja 24/7 merespons prospek chat WhatsApp tanpa henti.',
    techStack: ['Multi-Agent LLM', 'WhatsApp Cloud API Resmi', 'Vector Embeddings', 'CRM Real-Time Sync', 'Zero Token Waste'],
    keywords: [
      'karyawan digital ai indonesia',
      'chatbot whatsapp ai b2b',
      'otomasi customer service ai',
      'agen ai otonom bisnis',
      'otomasi sales whatsapp 24 jam'
    ],
    previewDescription: 'Asisten cerdas tingkat enterprise yang menjawab ratusan prospek simultan dalam milidetik, membaca katalog produk, mengecek stok gudang, dan mengunci reservasi.'
  },
  {
    number: '03',
    title: 'Implementasi ERP & Alur Kerja Terpadu',
    slug: 'infrastruktur-digital-enterprise',
    category: 'Integrated Core Systems',
    tagline: 'Menghubungkan data operasional lintas divisi agar bisnis berjalan teratur dan terpantau.',
    techStack: ['Modular ERP', 'Role-Based Access Control', 'PostgreSQL / Cloud DB', 'Live Audit Trail', 'Rest API / Webhook'],
    keywords: [
      'implementasi erp manufaktur',
      'sistem informasi operasional bsd',
      'software alur kerja terpadu',
      'integrasi data lintas cabang',
      'aplikasi manajemen bisnis custom'
    ],
    previewDescription: 'Mengeliminasi pekerjaan berulang dan sinkronisasi manual antar departemen. Data keuangan, pergudangan, rantai pasok, dan eksekutif tersaji dalam satu dasbor akurat.'
  },
  {
    number: '04',
    title: 'Dominasi Pencarian SEO & AEO',
    slug: 'dominasi-pencarian-seo-aeo',
    category: 'Google #1 & AI Overviews',
    tagline: 'Menjadikan bisnis Anda rujukan utama di Google serta mesin jawaban AI modern.',
    techStack: ['Programmatic SEO (PSEO)', 'Answer Engine Optimization', 'JSON-LD Rich Schema', 'Topical Authority Graph'],
    keywords: [
      'jasa seo bsd tangerang',
      'answer engine optimization aeo',
      'dominasi pencarian chatgpt gemini',
      'programmatic seo indonesia',
      'optimasi google ai overviews'
    ],
    previewDescription: 'Strategi visibilitas ganda: menguasai kata kunci lokal berbiaya tinggi di Google SERP konvensional sekaligus menjadi entitas rujukan primer mesin penalaran AI.'
  }
];

export default function SolutionsServiceOverviewSection() {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  return (
    <section 
      className="py-20 sm:py-28 w-full bg-white text-slate-900 border-t border-slate-200/80 relative overflow-visible text-left" 
      id="solutions-overview"
      aria-label="02 — Layanan Utama"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Two-Column Layout: Left Headline sticks and follows viewport scroll, Right Services flow naturally */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start relative">
          
          {/* LEFT COLUMN: Sticky Header that follows user page scroll down through the section */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6 text-left self-start">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-semibold tracking-[0.2em] text-purple-700 uppercase">
                02 — LAYANAN UTAMA
              </span>
              <span className="w-12 h-px bg-purple-200" aria-hidden="true" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-950 tracking-tight leading-[1.12]">
              Kebutuhan bisnis Anda menentukan solusinya.
            </h2>

            <p className="text-base sm:text-lg font-sans text-slate-600 leading-relaxed font-normal pt-1">
              Mulai dari menjangkau pelanggan hingga mengelola operasional, kami merancang solusi digital terarah yang langsung menjawab kebutuhan inti perusahaan Anda.
            </p>

            <div className="pt-2">
              <Link
                to="/services"
                onClick={() => window.scrollTo(0, 0)}
                className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-purple-700 hover:text-purple-900 uppercase transition-colors group cursor-pointer"
              >
                <span>Jelajahi Seluruh 12 Solusi Digital</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: Natural page scroll flow through services (No nested inner scroll div) */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-slate-200/90 border-t border-b border-slate-200/90">
            {PRIMARY_SERVICES.map((service, index) => {
              const isHovered = hoveredSlug === service.slug;

              return (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.08, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  onMouseEnter={() => setHoveredSlug(service.slug)}
                  onMouseLeave={() => setHoveredSlug(null)}
                  className="relative"
                >
                  <Link
                    to={`/services/${service.slug}`}
                    onClick={() => window.scrollTo(0, 0)}
                    className="group py-8 sm:py-10 px-3 sm:px-5 flex flex-col justify-between transition-all duration-300 hover:bg-slate-50/80 rounded-2xl -mx-3 sm:-mx-5 cursor-pointer"
                    aria-label={`Buka detail layanan ${service.title}`}
                  >
                    {/* Header Row: Number, Category, Title & Arrow */}
                    <div className="flex items-start sm:items-center justify-between gap-6 w-full">
                      <div className="flex items-baseline gap-4 sm:gap-6 flex-1 min-w-0">
                        {/* Service Number */}
                        <span className="font-mono text-base sm:text-lg font-bold text-purple-700 shrink-0 select-none">
                          {service.number}
                        </span>

                        <div className="space-y-1 flex-1 min-w-0">
                          <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 group-hover:text-purple-600 transition-colors block">
                            {service.category}
                          </span>

                          <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-extrabold text-slate-950 tracking-tight leading-snug group-hover:text-purple-700 transition-colors">
                            {service.title}
                          </h3>

                          <p className="text-xs sm:text-sm font-sans text-slate-500 font-normal leading-relaxed line-clamp-1 group-hover:text-slate-700 transition-colors">
                            {service.tagline}
                          </p>
                        </div>
                      </div>

                      {/* Right Action Arrow Icon */}
                      <div className="shrink-0 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-slate-200 bg-white group-hover:bg-purple-900 group-hover:border-purple-900 group-hover:text-white text-slate-600 shadow-2xs group-hover:shadow-md transition-all duration-300">
                        <ArrowUpRight 
                          size={18} 
                          className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" 
                        />
                      </div>
                    </div>

                    {/* Smooth Hover-Expand Preview & Technical Stack Summary */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pl-8 sm:pl-12 pr-2 pt-3 border-t border-slate-200/60 space-y-3.5">
                            <p className="text-xs sm:text-sm font-sans text-slate-600 leading-relaxed font-normal">
                              {service.previewDescription}
                            </p>

                            {/* Technical Stack Pills */}
                            <div>
                              <span className="text-[10px] font-mono font-bold tracking-wider text-purple-700 uppercase block mb-1.5">
                                Arsitektur &amp; Tech Stack:
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {service.techStack.map((tech, tIdx) => (
                                  <span 
                                    key={tIdx} 
                                    className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-800 border border-purple-100 text-[11px] font-mono font-medium"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Targeted Search Intent Keywords */}
                            <div>
                              <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase block mb-1.5">
                                Kata Kunci Penelusuran Tertarget:
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {service.keywords.map((kw, kIdx) => (
                                  <span 
                                    key={kIdx} 
                                    className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-mono hover:text-purple-700 transition-colors"
                                  >
                                    #{kw}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="pt-1 flex items-center gap-1.5 text-xs font-mono font-bold text-purple-800">
                              <span>Buka Dokumen Arsitektur Lengkap</span>
                              <ArrowRight size={13} className="text-purple-600" />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Link>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
