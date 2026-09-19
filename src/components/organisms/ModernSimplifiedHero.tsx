"use client";

import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function ModernSimplifiedHero() {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-white pt-24 pb-16">
      {/* Background Patterns */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `radial-gradient(#7c3aed 0.5px, transparent 0.5px), radial-gradient(#7c3aed 0.5px, transparent 0.5px)`,
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0, 20px 20px'
          }} 
        />
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-purple-50 blur-[120px] rounded-full opacity-60" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-violet-50 blur-[120px] rounded-full opacity-60" />
      </div>

      <div className="container relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Simplified Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-black text-slate-900 leading-[1.1] tracking-tight">
            Sistem Digital & Otomasi <br className="hidden md:block" />
            <span className="text-purple-700">untuk Bisnis Modern</span>
          </h1>
        </motion.div>

        {/* Clear, Direct Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto text-lg sm:text-xl font-sans text-slate-600 leading-relaxed mb-12"
        >
          Kami membangun sistem web berperforma tinggi dan mengotomasi alur kerja operasional bisnis Anda. 
          Solusi teknologi tepat sasaran yang dirancang untuk mempercepat pertumbuhan tanpa kompleksitas berlebih.
        </motion.p>

        {/* Dual CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-purple-700 px-8 text-sm font-bold text-white shadow-lg shadow-purple-200 transition-all hover:bg-purple-800 hover:-translate-y-0.5 w-full sm:w-auto"
          >
            <span>Konsultasi Gratis</span>
            <ChevronRight size={16} />
          </a>
          
          <a
            href="#services"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-8 text-sm font-bold text-slate-900 transition-all hover:bg-slate-50 hover:border-slate-300 hover:-translate-y-0.5 w-full sm:w-auto"
          >
            <span>Pelajari Layanan</span>
            <ArrowRight size={16} />
          </a>
        </motion.div>

        {/* Local Target Trust Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 pt-10 border-t border-slate-100 flex flex-wrap items-center justify-center gap-8 opacity-50"
        >
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
            <ShieldCheck size={14} className="text-purple-600" />
            TERPERCAYA DI BSD CITY & TANGERANG
          </div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
            <Zap size={14} className="text-purple-600" />
            DEVELOPMENT PERFORMANCE 100%
          </div>
        </motion.div>
      </div>
    </section>
  );
}
