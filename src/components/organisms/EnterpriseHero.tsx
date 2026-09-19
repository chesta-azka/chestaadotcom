"use client";

import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';

interface EnterpriseHeroProps {
  badgeText?: string;
  title?: string;
  highlightedTitle?: string;
  description?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
}

export default function EnterpriseHero({
  badgeText = "AGENTIC AI & WEB ARCHITECTURE 2026",
  title = "Transformasi Digital Skala Enterprise dengan",
  highlightedTitle = "High-Performance Engineering",
  description = "Akselerasi efisiensi bisnis Anda melalui integrasi Agentic AI otonom dan arsitektur web modern. Solusi B2B premium untuk Tech Startup dan Korporasi di BSD City & Jabodetabek.",
  primaryCtaText = "Mulai Konsultasi Gratis",
  primaryCtaHref = "#contact",
  secondaryCtaText = "Lihat Studi Kasus",
  secondaryCtaHref = "#projects",
}: EnterpriseHeroProps) {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-white pt-20">
      {/* 1. Sophisticated Background Layer */}
      <div className="absolute inset-0 z-0">
        {/* Subtle Background Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `radial-gradient(#7c3aed 0.5px, transparent 0.5px), radial-gradient(#7c3aed 0.5px, transparent 0.5px)`,
            backgroundSize: '32px 32px',
            backgroundPosition: '0 0, 16px 16px'
          }} 
        />
        
        {/* Radiant Glow Accents */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-100/50 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-violet-100/50 blur-[120px] rounded-full" />
        
        {/* Soft Linear Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white" />
      </div>

      <div className="container relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* 2. Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-purple-50 border border-purple-100 text-purple-900 mb-8 hover:bg-purple-100 transition-colors cursor-default shadow-sm shadow-purple-500/5"
        >
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-white shadow-lg shadow-purple-600/20">
            <Sparkles size={12} fill="currentColor" />
          </div>
          <span className="text-[11px] font-mono font-black uppercase tracking-[0.15em]">
            {badgeText}
          </span>
        </motion.div>

        {/* 3. Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mx-auto mb-8"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-display font-black text-slate-900 leading-[1.05] tracking-tight">
            {title} <br className="hidden md:block" />
            <span className="relative inline-block mt-2">
              <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-violet-800 to-indigo-900">
                {highlightedTitle}
              </span>
              <div className="absolute -bottom-2 left-0 w-full h-3 bg-purple-100/50 -z-10 blur-sm rounded-full" />
            </span>
          </h1>
        </motion.div>

        {/* 4. Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto text-lg sm:text-xl font-sans text-slate-600 leading-relaxed mb-12"
        >
          {description}
        </motion.p>

        {/* 5. CTA Button Group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <a
            href={primaryCtaHref}
            className="group relative inline-flex h-14 items-center justify-center gap-2 overflow-hidden rounded-2xl bg-purple-900 px-10 text-sm font-black uppercase tracking-widest text-white shadow-xl shadow-purple-900/20 transition-all hover:bg-purple-950 hover:shadow-2xl hover:-translate-y-1 w-full sm:w-auto"
          >
            <span>{primaryCtaText}</span>
            <ChevronRight className="transition-transform group-hover:translate-x-1" size={18} />
          </a>
          
          <a
            href={secondaryCtaHref}
            className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-10 text-sm font-black uppercase tracking-widest text-slate-900 transition-all hover:bg-slate-50 hover:border-slate-300 hover:-translate-y-1 w-full sm:w-auto"
          >
            <span>{secondaryCtaText}</span>
          </a>
        </motion.div>

        {/* 6. Social Proof / Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-20 pt-10 border-t border-slate-100 flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500"
        >
          <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-slate-500">
            <ShieldCheck size={16} className="text-purple-600" />
            ENTERPRISE GRADE SECURITY
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-slate-500">
            <Zap size={16} className="text-purple-600" />
            SUB-SECOND PERFORMANCE
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-slate-500 text-center">
            MEMBER OF NEXT.JS CERTIFIED DEVELOPERS
          </div>
        </motion.div>
      </div>

      {/* Decorative Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent z-20 pointer-events-none" />
    </section>
  );
}
