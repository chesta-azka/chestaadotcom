'use client';

import React, { useState, useEffect, useRef } from 'react';
import type { Variants, PanInfo } from 'motion/react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  CheckCircle2, 
  TrendingUp, 
  Quote, 
  Star, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Clock, 
  Zap,
  Check,
  Milestone,
  BarChart3
} from 'lucide-react';

const STEPS = [
  {
    step: "01",
    title: "Executive Blueprint",
    duration: "Hari 1 - 2",
    description: "Pemetaan alur pesanan dan eliminasi risiko salah input data.",
    deliverables: ["Audit Alur Bisnis Otonom", "Eliminasi Bottleneck Manual", "SOP Otomatisasi"]
  },
  {
    step: "02",
    title: "Precision Engineering",
    duration: "Hari 3 - 10",
    description: "Perakitan website sub-detik (< 0.2s) dan asisten cerdas 24/7 tanpa celah.",
    deliverables: ["Web Penjualan Sub-Detik", "Validasi Anti-Salah Input", "Asisten Otonom 24/7"]
  },
  {
    step: "03",
    title: "Go-Live & 100% Handover",
    duration: "Hari 11 - 12",
    description: "Peluncuran resmi ke domain dan serah terima hak milik kode mutlak.",
    deliverables: ["Domain Resmi Aktif", "Handover 100% Hak Milik", "Nol Keterikatan Agensi"]
  }
];

const CASE_STUDIES = [
  {
    id: "logistik",
    tabLabel: "3.4x Kapasitas",
    client: "Distributor Logistik Korporat",
    category: "Otomasi Pesanan & Logistik",
    primaryMetric: "3.4x",
    primaryLabel: "Kapasitas Proses Pesanan",
    secondaryHighlight: "Pangkas 120+ Jam Lembur/Bulan",
    outcomeSummary: "Pesanan dari chat terkunci langsung ke gudang tanpa selisih stok.",
    quote: "Tidak ada lagi salah rekap pesanan. Efisiensi kantor naik drastis sejak hari pertama live.",
    author: "Bapak Haryanto, Direktur Operasional",
    icon: Clock,
    metricTag: "Efisiensi Operasional"
  },
  {
    id: "skincare",
    tabLabel: "24/7 Respon",
    client: "Klinik Estetika & Skincare",
    category: "Asisten Otonom 24/7",
    primaryMetric: "24/7",
    primaryLabel: "Respon Pelanggan Otonom",
    secondaryHighlight: "Nol Tambahan Biaya CS Malam",
    outcomeSummary: "Asisten cerdas menangani konsultasi dan booking malam hari, melipatgandakan lead.",
    quote: "Lead malam hari tertangani otomatis dengan akurat. Konversi janji temu klinik meningkat tajam.",
    author: "Dr. Melinda, Founder & Medical Lead",
    icon: ShieldCheck,
    metricTag: "Otomasi Penjualan"
  },
  {
    id: "ecommerce",
    tabLabel: "< 0.2s Speed",
    client: "E-Commerce Fashion Wholesale",
    category: "Arsitektur Web Sub-Detik",
    primaryMetric: "< 0.2s",
    primaryLabel: "Kecepatan Akses Seluler",
    secondaryHighlight: "100% Bebas Biaya Sewa Platform",
    outcomeSummary: "Akses kilat tanpa bounce-rate dengan kepemilikan aset kode 100% mutlak.",
    quote: "Hak milik kode 100% di tangan kami. Tidak ada lagi tagihan sewa bulanan yang mengikat.",
    author: "Ibu Siska, Head of Marketing",
    icon: Zap,
    metricTag: "Konversi Belanja"
  },
  {
    id: "manufaktur",
    tabLabel: "0% Error",
    client: "Manufaktur Komponen Otomotif",
    category: "Sinkronisasi Real-Time",
    primaryMetric: "0%",
    primaryLabel: "Kesalahan Input & Selisih Stok",
    secondaryHighlight: "Sinkronisasi Gudang & Finance Instan",
    outcomeSummary: "Integrasi real-time menghapus rekapitulasi ganda dan keterlambatan laporan.",
    quote: "Investasi paling berdampak. Rekapitulasi pesanan berjalan otomatis tanpa celah human-error.",
    author: "Bapak Surya, Direktur Utama",
    icon: ShieldCheck,
    metricTag: "Akurasi Data"
  }
];

export default function SuccessRoadmap() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const whatsappUrl = "https://wa.me/6282125447232?text=" + encodeURIComponent("Halo Mas Chesta, kami ingin mendiskusikan roadmap implementasi dan studi kasus sukses serupa untuk perusahaan kami.");

  const nextSlide = () => {
    setDirection(1);
    setActiveSlide((prev) => (prev + 1) % CASE_STUDIES.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setActiveSlide((prev) => (prev - 1 + CASE_STUDIES.length) % CASE_STUDIES.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > activeSlide ? 1 : -1);
    setActiveSlide(index);
  };

  // Autoplay with pause-on-hover
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 6500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, activeSlide]);

  const currentStudy = CASE_STUDIES[activeSlide];
  const Icon = currentStudy.icon;

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      nextSlide();
    } else if (info.offset.x > swipeThreshold) {
      prevSlide();
    }
  };

  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
      filter: "blur(6px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
      filter: "blur(6px)",
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  return (
    <section className="w-full py-16 md:py-24 relative bg-slate-50" id="roadmap">
      {/* Background spatial atmospheric glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-purple-200/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* ========================================================= */}
        {/* PART 1: 3-STEP HORIZONTAL TIMELINE                        */}
        {/* ========================================================= */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200/80 text-purple-700 text-xs font-mono font-medium mb-4 shadow-xs">
            <Compass className="w-3.5 h-3.5 text-purple-600" />
            <span className="tracking-widest uppercase">ROADMAP EKSEKUSI PRESISI</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-slate-950 leading-[1.15] text-balance flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-purple-100/80 border border-purple-200/80 text-purple-900 shadow-xs shrink-0">
              <Milestone className="w-5 h-5 md:w-6 md:h-6 stroke-[1.8]" />
            </span>
            <span>Roadmap Dominasi Pasar Digital.</span>
          </h2>
          
          <p className="text-slate-600 mt-4 text-base md:text-lg font-normal max-w-2xl mx-auto leading-relaxed text-balance">
            Sistem bisnis otonom siap beroperasi penuh dalam 12 hari kerja.
          </p>
        </div>

        {/* 3-Step Horizontal Timeline with Minimalist Connecting SVG Path */}
        <div className="relative mb-24">
          
          {/* Desktop SVG Connecting Line */}
          <div className="hidden md:block absolute top-[52px] left-[15%] right-[15%] h-[2px] z-0 pointer-events-none">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 2">
              <line 
                x1="0" 
                y1="1" 
                x2="100" 
                y2="1" 
                stroke="#d8b4fe" 
                strokeWidth="1.5" 
                strokeDasharray="4 4" 
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {STEPS.map((item, index) => (
              <div 
                key={index}
                className="p-8 sm:p-10 rounded-[2.25rem] bg-white border border-slate-200/90 hover:border-purple-300 transition-all duration-300 shadow-xl shadow-slate-200/40 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-11 h-11 rounded-2xl bg-purple-900 text-white flex items-center justify-center font-mono font-medium text-base shadow-xs group-hover:scale-105 transition-transform duration-300">
                      {item.step}
                    </div>
                    <span className="text-xs font-mono font-medium text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200/80">
                      {item.duration}
                    </span>
                  </div>

                  <h3 className="text-xl font-medium text-slate-900 mb-2 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 font-sans font-normal leading-relaxed mb-6">
                    {item.description}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-slate-100">
                    {item.deliverables.map((deliv, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2.5 text-xs font-normal text-slate-700">
                        <CheckCircle2 size={15} className="text-purple-600 shrink-0" />
                        <span>{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <div className="w-full h-1 bg-slate-100 rounded-full">
                    <div className="h-full bg-purple-900 rounded-full w-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* PART 2: HASIL NYATA SLIDER (PROVEN BUSINESS IMPACT)       */}
        {/* ========================================================= */}
        <div className="max-w-6xl mx-auto pt-8 border-t border-slate-200/60">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200/80 text-purple-700 text-xs font-mono font-medium mb-4 shadow-xs">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <span className="tracking-widest uppercase">HASIL BISNIS &amp; EFISIENSI TERVERIFIKASI</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-slate-950 leading-[1.15] text-balance flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex items-center justify-center w-9 h-9 md:w-11 md:h-11 rounded-2xl bg-purple-100/80 border border-purple-200/80 text-purple-900 shadow-xs shrink-0">
                <BarChart3 className="w-5 h-5 md:w-6 md:h-6 stroke-[1.8]" />
              </span>
              <span>Hasil Nyata. Angka Berbicara.</span>
            </h2>
            
            <p className="text-slate-600 mt-3 text-base md:text-lg font-normal leading-relaxed text-balance">
              Metrik riil peningkatan profit dan pemangkasan jam kerja dari implementasi arsitektur otonom.
            </p>
          </div>

          {/* Quick-Switch Metric Tab Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-8">
            {CASE_STUDIES.map((study, idx) => {
              const isActive = activeSlide === idx;
              return (
                <button
                  key={study.id}
                  onClick={() => goToSlide(idx)}
                  className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-medium font-mono tracking-tight transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-purple-900 text-white shadow-xs border border-purple-800 scale-105'
                      : 'bg-white text-slate-600 hover:text-purple-700 hover:bg-purple-50 border border-slate-200'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-purple-300' : 'bg-slate-300'}`} />
                  <span>{study.tabLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Interactive Showcase Slider Card Container */}
          <div 
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="min-h-[420px] sm:min-h-[380px] relative">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeSlide}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                  style={{ touchAction: 'pan-y' }}
                  className="w-full rounded-[2.5rem] bg-white border border-slate-200/90 p-7 sm:p-10 lg:p-12 shadow-2xl shadow-slate-200/50 relative overflow-hidden flex flex-col justify-between cursor-grab active:cursor-grabbing select-none"
                >
                  {/* Subtle static radial background glow */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-500/5 via-transparent to-transparent pointer-events-none rounded-[2.5rem]" />

                  {/* Top Bar: Sector Badge & Star Rating */}
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-8 relative z-10">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-mono font-medium text-purple-900 uppercase bg-purple-50 px-3.5 py-1 rounded-full border border-purple-200">
                        {currentStudy.category}
                      </span>
                      <span className="text-xs font-mono font-normal text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                        {currentStudy.metricTag}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={15} fill="currentColor" />
                      ))}
                      <span className="text-xs font-mono font-medium text-slate-700 ml-1.5">5.0 / 5.0</span>
                    </div>
                  </div>

                  {/* Center Content: Two-Column Split Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 mb-8">
                    
                    {/* Left Column: Massive Metric Dominance with Refined Subtle Dark Surface */}
                    <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-[#120f1d] text-white relative shadow-xl shadow-slate-900/10 border border-purple-900/40">
                      <div className="text-xs font-mono text-purple-200 uppercase tracking-widest mb-1">
                        Pencapaian Utama
                      </div>
                      <div className="text-4xl sm:text-5xl lg:text-6xl font-medium text-white tracking-tight leading-none mb-3">
                        {currentStudy.primaryMetric}
                      </div>
                      <div className="text-sm sm:text-base font-normal text-slate-200 mb-4">
                        {currentStudy.primaryLabel}
                      </div>

                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-900/50 text-emerald-300 text-xs font-medium border border-purple-400/40">
                        <Icon size={14} className="text-emerald-400 shrink-0" />
                        <span>{currentStudy.secondaryHighlight}</span>
                      </div>
                    </div>

                    {/* Right Column: Business Outcome & Executive Quote */}
                    <div className="lg:col-span-7 space-y-5">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-medium text-slate-900 tracking-tight mb-2">
                          {currentStudy.client}
                        </h3>
                        <p className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed">
                          {currentStudy.outcomeSummary}
                        </p>
                      </div>

                      {/* Executive Quote Block */}
                      <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
                        <div className="flex items-start gap-3">
                          <Quote size={20} className="text-purple-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm sm:text-base italic text-slate-800 font-normal leading-relaxed mb-2">
                              &ldquo;{currentStudy.quote}&rdquo;
                            </p>
                            <p className="text-xs font-mono font-medium text-purple-700 uppercase tracking-wider">
                              — {currentStudy.author}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Bottom Navigation Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-slate-100 relative z-10">
                    
                    {/* Slide Dots and Counter */}
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        {CASE_STUDIES.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => goToSlide(idx)}
                            aria-label={`Slide ${idx + 1}`}
                            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                              activeSlide === idx ? 'w-8 bg-purple-600' : 'w-2 bg-slate-200 hover:bg-slate-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-mono font-medium text-slate-500 pl-2">
                        0{activeSlide + 1} / 0{CASE_STUDIES.length}
                      </span>
                    </div>

                    {/* Prev / Next Buttons */}
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        onClick={prevSlide}
                        aria-label="Previous Case Study"
                        className="w-11 h-11 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-purple-700 flex items-center justify-center transition-all shadow-xs hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={nextSlide}
                        aria-label="Next Case Study"
                        className="w-11 h-11 rounded-2xl bg-purple-900 hover:bg-purple-800 text-white flex items-center justify-center transition-all shadow-xs border border-purple-800 hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>

                  </div>

                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Centered Executive CTA */}
          <div className="text-center mt-12">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-purple-900 hover:bg-purple-800 text-white font-sans font-medium text-sm transition-all shadow-sm hover:shadow border border-purple-800 group cursor-pointer"
            >
              <span>Konsultasikan Kebutuhan Sistem Anda</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
