"use client";

import React, { useState, useRef } from "react";
import { 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Bot, 
  Layers, 
  CheckCircle2, 
  Activity, 
  ShieldCheck, 
  TrendingUp,
  Cpu,
  Globe
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import MagneticButton from "../atoms/MagneticButton";

interface HeroProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
}

const PREVIEW_TABS = [
  {
    id: "ai",
    label: "Autonomous AI Agent",
    icon: Bot,
    tag: "Active 24/7 • WhatsApp Cloud API",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1400&auto=format&fit=crop",
    headline: "Agen AI Otonom & Mesin Penjualan 24 Jam",
    metrics: [
      { label: "Kecepatan Respon AI", value: "< 400ms", note: "Sub-detik tanpa jeda" },
      { label: "Tingkat Otomasi Chat", value: "94.8%", note: "1.450 prospek tersaring/hari" },
      { label: "Lonjakan Closing Sales", value: "+185%", note: "B2B & UMKM Komersial" },
    ],
    log: "[AI ENGINE] WhatsApp webhook diterima -> Kualifikasi prospek B2B terverifikasi -> 0.3s respon otomatis",
  },
  {
    id: "web",
    label: "Next.js 15 Sub-Detik",
    icon: Zap,
    tag: "Core Web Vitals 100 • Edge SSR",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1400&auto=format&fit=crop",
    headline: "Arsitektur Web Enterprise Berkecepatan Tinggi",
    metrics: [
      { label: "First Contentful Paint", value: "0.4s", note: "Peringkat hijau Google" },
      { label: "Kepemilikan Aset", value: "100%", note: "Nol vendor lock-in" },
      { label: "Peningkatan Konversi", value: "+340%", note: "Psikologi closing teruji" },
    ],
    log: "[EDGE SERVER] Edge SSR Cache HIT -> Global CDN latency 12ms -> LCP rendered in 0.42s",
  },
  {
    id: "workflow",
    label: "ERP & Workflow Otomatis",
    icon: Layers,
    tag: "Zero-Touch Data Sync • PostgreSQL",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1400&auto=format&fit=crop",
    headline: "Otomasi Alur Kerja & Sinkronisasi Bisnis",
    metrics: [
      { label: "Penghematan Jam Kerja", value: "380 Jam/Bulan", note: "Admin manual dieliminasi" },
      { label: "Human Error Rate", value: "0.00%", note: "Validasi data otomatis" },
      { label: "Efisiensi Operasional", value: "-65%", note: "ROI terbukti 30 hari" },
    ],
    log: "[WORKFLOW ENGINE] Invoice otomatis diterbitkan -> Sinkronisasi ERP selesai -> 0 data error",
  },
];

export function HeroPurple({
  eyebrow = "Principal Digital Architecture & AI Automation Hub",
  title = "Arsitektur AI Enterprise. Dominasi Pasar Digital.",
  subtitle = "Chestaa menghadirkan infrastruktur teknologi performa tinggi, sistem penjualan otonom, dan otomatisasi AI cerdas untuk akselerasi pertumbuhan B2B Enterprise dan UMKM Komersial.",
  ctaLabel = "Konsultasi Strategis via WhatsApp",
  ctaHref = "https://wa.me/6282125447232?text=Halo%20Mas%20Chesta,%20saya%20ingin%20berdiskusi%20mengenai%20arsitektur%20AI%20enterprise%20dan%20modernisasi%20sistem%20bisnis.",
  secondaryCtaLabel = "Jelajahi Katalog Solusi",
  secondaryCtaHref = "/services",
}: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const [activeTabId, setActiveTabId] = useState("ai");

  const currentTab = PREVIEW_TABS.find((t) => t.id === activeTabId) || PREVIEW_TABS[0];
  const titleWords = title.split(" ");

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative mx-auto w-full pt-28 md:pt-36 pb-16 md:pb-24 px-4 sm:px-6 md:px-8 text-center flex flex-col justify-center items-center bg-gradient-to-b from-white via-slate-50/50 to-white overflow-hidden"
    >
      {/* Ambient Glowing Purple Mesh Aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] bg-gradient-to-tr from-purple-200/40 via-purple-300/25 to-indigo-200/30 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* Subtle Technical Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#9333ea_1px,transparent_1px)] [background-size:48px_48px] opacity-[0.035] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8 relative z-20 w-full">
        
        {/* Editorial Eyebrow with Pulse Dot */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-purple-50/80 border border-purple-200/80 text-purple-900 shadow-2xs"
        >
          <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
          <span className="text-xs font-mono font-semibold tracking-[0.18em] uppercase">
            {eyebrow}
          </span>
        </motion.div>

        {/* Masked Cascade Split-Text Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-medium tracking-tight text-slate-950 leading-[1.06] text-balance max-w-5xl mx-auto">
          {titleWords.map((word, index) => (
            <span key={index} className="inline-block overflow-hidden mr-[0.25em] align-top py-1">
              <motion.span
                initial={{ y: 30, opacity: 0, filter: "blur(15px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.08 + index * 0.06,
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Persuasive Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
          className="text-slate-600 text-base md:text-lg font-normal max-w-3xl leading-relaxed text-balance mx-auto"
        >
          {subtitle}
        </motion.p>

        {/* Magnetic CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 mb-4"
        >
          <MagneticButton
            href={ctaHref}
            className="px-8 py-4 bg-purple-900 hover:bg-purple-800 text-white rounded-2xl font-medium text-sm shadow-md hover:shadow-lg transition-all border border-purple-800 whitespace-nowrap cursor-pointer flex items-center gap-2 group"
            strength={28}
          >
            <span>{ctaLabel}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </MagneticButton>

          <MagneticButton
            href={secondaryCtaHref}
            className="px-6 py-4 bg-white text-slate-800 border border-slate-200/90 hover:border-purple-300 rounded-2xl font-medium text-sm hover:bg-purple-50/40 transition-colors whitespace-nowrap cursor-pointer shadow-xs"
            strength={20}
          >
            {secondaryCtaLabel}
          </MagneticButton>
        </motion.div>

        {/* INTERACTIVE ANIMATED ARCHITECTURE & DASHBOARD SHOWCASE */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-6xl mx-auto mt-6 relative"
        >
          {/* Subtle Floating Ambient Glow behind the Mockup Window */}
          <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/15 via-indigo-600/10 to-purple-600/15 rounded-3xl blur-2xl -z-10" />

          {/* Interactive Mockup Shell */}
          <div className="rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-xl shadow-2xl shadow-purple-950/10 overflow-hidden text-left">
            
            {/* Top Browser Window Header */}
            <div className="px-5 py-3.5 bg-slate-100/80 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-400 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                <span className="ml-3 text-[11px] font-mono font-medium text-slate-500 hidden sm:inline-block">
                  chestaadotcom.com/live-architecture
                </span>
              </div>

              {/* Live Latency Telemetry Badge */}
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-mono font-semibold text-slate-700 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>⚡ 14ms Edge Latency • 99.98% SLA</span>
              </div>
            </div>

            {/* Interactive Solution Tabs */}
            <div className="px-5 pt-3 border-b border-slate-200/70 bg-slate-50/60 flex items-center gap-2 overflow-x-auto no-scrollbar">
              {PREVIEW_TABS.map((tab) => {
                const TabIcon = tab.icon;
                const isActive = activeTabId === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTabId(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold font-mono transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? "bg-purple-900 text-white shadow-sm"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                    }`}
                  >
                    <TabIcon size={14} className={isActive ? "text-purple-300" : "text-slate-400"} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Tab Visual Image & Live KPI Display */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTab.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="p-5 sm:p-8 space-y-6"
              >
                {/* Title & Tag */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold tracking-widest text-purple-700 uppercase bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-100">
                      {currentTab.tag}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-extrabold text-slate-950 mt-1">
                      {currentTab.headline}
                    </h3>
                  </div>

                  <a
                    href="https://wa.me/6282125447232?text=Halo%20chestaadotcom,%20saya%20tertarik%20melihat%20demo%20sistem%20arsitektur%20ini."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 font-mono text-xs font-bold border border-purple-200 transition-colors shrink-0 cursor-pointer"
                  >
                    <Sparkles size={13} className="text-purple-700" />
                    <span>Minta Live Demo</span>
                    <ArrowRight size={13} />
                  </a>
                </div>

                {/* Image Container with Floating Overlays */}
                <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-md aspect-video sm:aspect-[21/9] max-h-[420px] group">
                  <img
                    src={currentTab.image}
                    alt={currentTab.headline}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  
                  {/* Subtle Dark Vignette Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent pointer-events-none" />

                  {/* Floating Metric Card (Top Left) */}
                  <motion.div
                    animate={{ y: [-3, 3, -3] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-4 left-4 p-3 rounded-xl bg-white/95 backdrop-blur-md border border-white/60 shadow-lg text-left hidden sm:block max-w-[220px]"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">
                        Sistem Otonom
                      </span>
                    </div>
                    <div className="text-base font-extrabold text-slate-950 font-display">
                      99.8% Otomatisasi
                    </div>
                    <div className="text-[10px] text-slate-500 font-normal">
                      Tanpa intervensi admin manual
                    </div>
                  </motion.div>

                  {/* Floating Metric Card (Bottom Right) */}
                  <motion.div
                    animate={{ y: [3, -3, 3] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-4 right-4 p-3 rounded-xl bg-purple-950/90 backdrop-blur-md border border-purple-500/30 shadow-lg text-left text-white hidden sm:block max-w-[240px]"
                  >
                    <div className="flex items-center gap-1.5 text-purple-300 text-[10px] font-mono font-bold mb-1">
                      <TrendingUp size={12} />
                      <span>Efisiensi Korporat</span>
                    </div>
                    <div className="text-base font-extrabold text-white font-display">
                      +340% Penghematan Jam
                    </div>
                    <div className="text-[10px] text-purple-200">
                      ROI terukur dari bulan pertama
                    </div>
                  </motion.div>

                  {/* Telemetry Live Feed ticker at bottom */}
                  <div className="absolute bottom-3 left-4 right-4 sm:right-68 p-2.5 rounded-lg bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-slate-200 font-mono text-[11px] truncate flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                    <span className="truncate">{currentTab.log}</span>
                  </div>
                </div>

                {/* 3 Live KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  {currentTab.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-purple-300 transition-colors space-y-1"
                    >
                      <span className="text-[10px] font-mono font-bold uppercase text-purple-700 tracking-wider">
                        {m.label}
                      </span>
                      <div className="text-2xl font-extrabold text-slate-950 font-display">
                        {m.value}
                      </div>
                      <div className="text-xs text-slate-500 font-normal">
                        {m.note}
                      </div>
                    </div>
                  ))}
                </div>

              </motion.div>
            </AnimatePresence>

          </div>
        </motion.div>

        {/* SECTION: 01 — CARA KAMI BERPIKIR (Editorial Layout) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-7xl mx-auto pt-16 md:pt-24 pb-8 text-left relative"
        >
          {/* Editorial Top Border Divider */}
          <div className="w-full h-px bg-slate-200/90 mb-12 sm:mb-16" aria-hidden="true" />

          {/* Section Header: Fully Left Aligned */}
          <div className="max-w-4xl space-y-4 mb-14 sm:mb-16">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-semibold tracking-[0.2em] text-purple-700 uppercase">
                01 — CARA KAMI BERPIKIR
              </span>
              <span className="w-12 h-px bg-purple-200" aria-hidden="true" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-slate-950 tracking-tight leading-[1.12]">
              Memahami bisnis Anda adalah langkah pertama kami.
            </h2>

            <p className="text-base sm:text-lg font-sans text-slate-600 leading-relaxed font-normal pt-1 max-w-3xl">
              Setiap perusahaan memiliki proses, tantangan, dan prioritas yang berbeda. Kami mempelajari cara bisnis Anda bekerja, lalu merancang arsitektur AI dan sistem digital yang membantu tim menyelesaikan pekerjaan dengan efisien.
            </p>
          </div>

          {/* 3 Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 border-t border-slate-200/80 pt-6 sm:pt-8">
            <div className="text-left space-y-1">
              <span className="font-mono text-[11px] font-bold text-purple-700 block">01</span>
              <p className="text-xs sm:text-sm font-medium text-slate-800 tracking-normal leading-snug">
                Berangkat dari kebutuhan riil bisnis
              </p>
            </div>

            <div className="text-left space-y-1">
              <span className="font-mono text-[11px] font-bold text-purple-700 block">02</span>
              <p className="text-xs sm:text-sm font-medium text-slate-800 tracking-normal leading-snug">
                Prioritas dan metrik ROI disepakati bersama
              </p>
            </div>

            <div className="text-left space-y-1">
              <span className="font-mono text-[11px] font-bold text-purple-700 block">03</span>
              <p className="text-xs sm:text-sm font-medium text-slate-800 tracking-normal leading-snug">
                Penerapan bertahap dengan kontrol penuh milik Anda
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
