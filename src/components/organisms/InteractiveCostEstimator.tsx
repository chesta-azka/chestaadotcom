'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, CheckCircle2, ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';

// Elite orchestration variants extracted outside component
const estimatorContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  }
};

const estimatorItemVariants = {
  hidden: { opacity: 0, y: 50, filter: "blur(15px)" },
  show: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      mass: 1,
      stiffness: 280,
      damping: 24
    }
  }
};

export default function InteractiveCostEstimator() {
  const [pages, setPages] = useState(5);
  const [includeAI, setIncludeAI] = useState(true);
  const [includeAdminDashboard, setIncludeAdminDashboard] = useState(true);

  // Transparent calculation logic
  const basePrice = 1250000;
  const pageCost = pages * 200000;
  const aiCost = includeAI ? 1500000 : 0;
  const adminCost = includeAdminDashboard ? 1000000 : 0;
  const totalInvestment = basePrice + pageCost + aiCost + adminCost;

  const formattedTotal = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(totalInvestment);

  const whatsappUrl = "https://wa.me/6282125447232?text=" + encodeURIComponent(`Halo Mas Chesta, saya menghitung estimasi investasi custom melalui kalkulator interaktif: ${pages} Halaman, Autonomous Business Engine (${includeAI ? 'Ya' : 'Tidak'}), Admin Dashboard Anti-Error (${includeAdminDashboard ? 'Ya' : 'Tidak'}). Total Estimasi: ${formattedTotal}. Mohon konfirmasi.`);

  return (
    <section className="py-24 md:py-32 relative bg-purple-50/40 border-y border-purple-100 overflow-hidden" id="estimator">
      
      {/* Background Spatial Atmosphere */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[400px] bg-purple-200/30 rounded-full blur-[140px] pointer-events-none" />

      <motion.div 
        variants={estimatorContainerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-6 relative z-10"
      >
        
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.div 
            variants={estimatorItemVariants}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/80 border border-purple-200 text-purple-800 text-xs font-bold mb-4 shadow-sm"
          >
            <Calculator className="w-4 h-4 text-purple-700 animate-bounce" />
            <span className="tracking-widest uppercase">TRANSPARANSI INVESTASI INSTAN</span>
          </motion.div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight font-display text-slate-900 leading-[1.1]">
            Simulasikan Investasi untuk Efisiensi & Pertumbuhan Bisnis.
          </h2>
          <motion.p 
            variants={estimatorItemVariants}
            className="text-slate-600 mt-6 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed"
          >
            Simulasikan modul digital sesuai skala kebutuhan bisnis Anda secara transparan tanpa biaya tersembunyi.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Controls (Span 7) */}
          <motion.div
            variants={estimatorItemVariants}
            className="lg:col-span-7 rounded-[2.5rem] bg-white/90 backdrop-blur-3xl border border-purple-100 p-8 sm:p-12 shadow-2xl shadow-purple-900/5 space-y-10"
          >
            {/* Pages Slider */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <label className="text-base font-bold text-slate-900 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-sm font-black shadow-inner">1</span>
                  Jumlah Halaman Web / Sub-Menu
                </label>
                <span className="text-sm font-black text-purple-700 bg-purple-50 px-4 py-1.5 rounded-xl border border-purple-100 shadow-sm">
                  {pages} Halaman
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={25}
                value={pages}
                onChange={(e) => setPages(Number(e.target.value))}
                className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-purple-600 shadow-inner"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-black font-mono tracking-widest uppercase">
                <span>1 Halaman</span>
                <span>12 Halaman</span>
                <span>25 Halaman</span>
              </div>
            </div>

            {/* Feature Toggles */}
            <div className="space-y-4">
              {/* Autonomous Engine */}
              <div 
                onClick={() => setIncludeAI(!includeAI)}
                className={`p-6 rounded-[2rem] border transition-all duration-500 cursor-pointer flex items-center justify-between group ${includeAI ? 'bg-purple-50/80 border-purple-300 shadow-xl shadow-purple-900/10' : 'bg-slate-50 border-slate-200 hover:border-purple-200'}`}
              >
                <div className="flex items-start gap-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 mt-1 transition-all duration-500 ${includeAI ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 rotate-3' : 'bg-slate-200 text-slate-500'}`}>
                    <Zap size={24} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-black text-slate-900 text-base tracking-tight leading-none">Autonomous Business Engine 24/7</h4>
                    <p className="text-sm text-slate-600 font-light leading-relaxed max-w-md">Sistem cerdas melayani ratusan pelanggan tanpa cuti, memangkas beban gaji admin drastis.</p>
                  </div>
                </div>
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-500 ${includeAI ? 'bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-600/20' : 'border-slate-300'}`}>
                  {includeAI && <CheckCircle2 size={18} />}
                </div>
              </div>

              {/* Admin Dashboard */}
              <div 
                onClick={() => setIncludeAdminDashboard(!includeAdminDashboard)}
                className={`p-6 rounded-[2rem] border transition-all duration-500 cursor-pointer flex items-center justify-between group ${includeAdminDashboard ? 'bg-purple-50/80 border-purple-300 shadow-xl shadow-purple-900/10' : 'bg-slate-50 border-slate-200 hover:border-purple-200'}`}
              >
                <div className="flex items-start gap-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 mt-1 transition-all duration-500 ${includeAdminDashboard ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 rotate-3' : 'bg-slate-200 text-slate-500'}`}>
                    <ShieldCheck size={24} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-black text-slate-900 text-base tracking-tight leading-none">Dashboard Admin Anti-Salah Input</h4>
                    <p className="text-sm text-slate-600 font-light leading-relaxed max-w-md">Panel manajemen internal untuk sinkronisasi pesanan otonom & validasi data real-time.</p>
                  </div>
                </div>
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-500 ${includeAdminDashboard ? 'bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-600/20' : 'border-slate-300'}`}>
                  {includeAdminDashboard && <CheckCircle2 size={18} />}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Summary Card (Span 5) */}
          <motion.div
            variants={estimatorItemVariants}
            className="lg:col-span-5 rounded-[2.5rem] bg-slate-950 border border-slate-800 p-10 sm:p-14 text-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none transform scale-150 rotate-12">
              <Sparkles size={160} className="text-purple-400" />
            </div>

            <div className="relative z-10">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400 block mb-3">
                INVESTASI KORPORAT
              </span>
              <h3 className="text-3xl font-black text-white mb-10 tracking-tight">
                Ringkasan Spesifikasi
              </h3>

              <div className="space-y-5 text-base text-slate-400 mb-12 border-b border-slate-800/80 pb-10">
                <div className="flex justify-between items-center">
                  <span className="font-light">Arsitektur & Setup Dasar</span>
                  <span className="font-black text-white font-mono">Rp 1.250.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-light">Modul Halaman ({pages} unit)</span>
                  <span className="font-black text-white font-mono">Rp {pageCost.toLocaleString('id-ID')}</span>
                </div>
                {includeAI && (
                  <div className="flex justify-between items-center text-purple-300">
                    <span className="font-bold">Autonomous Engine 24/7</span>
                    <span className="font-black font-mono">Rp 1.500.000</span>
                  </div>
                )}
                {includeAdminDashboard && (
                  <div className="flex justify-between items-center text-purple-300">
                    <span className="font-bold">Admin Dashboard Anti-Error</span>
                    <span className="font-black font-mono">Rp 1.000.000</span>
                  </div>
                )}
              </div>

              <div className="mb-12">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-2 font-black">TOTAL ESTIMASI INVESTASI:</span>
                <div className="text-4xl sm:text-6xl font-black text-emerald-400 tracking-tighter leading-none">
                  {formattedTotal}
                </div>
                <p className="text-[11px] text-slate-500 mt-4 font-bold uppercase tracking-wider">
                  *Bayar sekali untuk selamanya. Tanpa biaya sewa agensi.
                </p>
              </div>
            </div>

            <div className="relative z-10">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-5 px-8 inline-flex items-center justify-center gap-3 bg-purple-900 text-white rounded-2xl font-black text-lg shadow-[0_16px_36px_-12px_rgba(88,28,135,0.4)] hover:bg-purple-800 transition-all border border-purple-800"
              >
                <span>Kunci Estimasi via WhatsApp</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>

        </div>

      </motion.div>
    </section>
  );
}

