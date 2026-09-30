'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { Terminal, Shield, Cpu, Activity, ArrowRight, Zap, Database, Globe, Smartphone } from 'lucide-react';
import CyberThreatMap from '../../components/organisms/CyberThreatMap';

export default function ShowcasePage() {
  const [apiRequests, setApiRequests] = useState(1452890);
  const [blockedAttacks, setBlockedAttacks] = useState(84302);
  const [latency, setLatency] = useState(48);
  const [savedBudget, setSavedBudget] = useState(1245890000);

  useEffect(() => {
    const timer = setInterval(() => {
      setApiRequests(prev => prev + Math.floor(Math.random() * 35) + 12);
      setBlockedAttacks(prev => prev + (Math.random() > 0.6 ? 1 : 0));
      setLatency(Math.floor(Math.random() * 12) + 42);
      setSavedBudget(prev => prev + Math.floor(Math.random() * 50000) + 10000);
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
  };

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-slate-100 font-sans selection:bg-indigo-600 selection:text-white relative overflow-hidden">
      {/* Background terminal grid */}
      <div className="absolute inset-0 pointer-events-none opacity-25 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      <header className="relative z-10 border-b border-white/10 bg-[#0d0d12]/80 backdrop-blur-xl px-6 sm:px-12 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-mono text-xs sm:text-sm tracking-widest text-emerald-400 uppercase font-bold">
              Chestaa Enterprise Command Center • Live Telemetry
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <span>Region: APSE-1 (Jakarta)</span>
            <span>•</span>
            <span>Cluster: Edge-Nexus-01</span>
            <span>•</span>
            <Link href="/" className="text-indigo-400 hover:text-indigo-300 transition-colors font-bold">
              &larr; Kembali ke Beranda
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 space-y-16">
        {/* HERO TITLE */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <span className="text-indigo-400 text-xs font-mono uppercase tracking-widest">[ Real-Time System Telemetry ]</span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Infrastruktur Otonom Skala Eksekutif
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Pantau performa sistem otonom Chestaa yang memproses jutaan permintaan enterprise secara real-time dengan latensi sub-milidetik.
          </p>
        </div>

        {/* 4 MASSIVE LIVE METRIC CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl flex flex-col justify-between space-y-4 shadow-xl">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-mono uppercase">Total API Requests</span>
              <Activity size={18} className="text-indigo-400 animate-pulse" />
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
                {apiRequests.toLocaleString()}
              </div>
              <span className="text-xs text-emerald-400 font-mono">+14.2% dari bulan lalu</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl flex flex-col justify-between space-y-4 shadow-xl">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-mono uppercase">Blocked Cyber Threats</span>
              <Shield size={18} className="text-rose-400 animate-pulse" />
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
                {blockedAttacks.toLocaleString()}
              </div>
              <span className="text-xs text-rose-400 font-mono">Zero-Day Shield Aktif</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl flex flex-col justify-between space-y-4 shadow-xl">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-mono uppercase">Average Latency</span>
              <Zap size={18} className="text-amber-400 animate-pulse" />
            </div>
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
                {latency}ms
              </div>
              <span className="text-xs text-emerald-400 font-mono">Optimal (&lt; 65ms threshold)</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl flex flex-col justify-between space-y-4 shadow-xl">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-mono uppercase">Client Admin ROI Saved</span>
              <Cpu size={18} className="text-emerald-400 animate-pulse" />
            </div>
            <div className="space-y-1">
              <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-mono tracking-tight truncate">
                {formatRupiah(savedBudget)}
              </div>
              <span className="text-xs text-emerald-400 font-mono">Efisiensi Gaji Karyawan AI</span>
            </div>
          </div>
        </div>

        {/* CYBER THREAT MAP ANIMATION */}
        <CyberThreatMap />

        {/* INTERACTIVE ARCHITECTURE TOPOLOGY */}
        <div className="p-8 sm:p-12 rounded-3xl bg-indigo-950/20 border border-indigo-500/30 backdrop-blur-2xl space-y-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">[ Topology Node Graph ]</span>
              <h2 className="text-2xl font-bold text-white tracking-tight">Arsitektur Terpusat & Jaringan Otonom</h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Sinkronisasi Real-Time Aktif</span>
            </div>
          </div>

          {/* SVG Topology Graph */}
          <div className="relative w-full h-[360px] rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center overflow-hidden p-6">
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              <line x1="50%" y1="50%" x2="20%" y2="30%" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="6 6" />
              <line x1="50%" y1="50%" x2="80%" y2="30%" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="6 6" />
              <line x1="50%" y1="50%" x2="50%" y2="80%" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="6 6" />
            </svg>

            <div className="absolute z-10 flex flex-col items-center p-5 rounded-2xl bg-indigo-900/80 border border-indigo-400 shadow-[0_0_40px_rgba(99,102,241,0.6)]">
              <Cpu size={32} className="text-indigo-300 animate-spin" style={{ animationDuration: '10s' }} />
              <span className="mt-2 font-mono font-bold text-white text-sm">Chestaa AI Core</span>
              <span className="text-[10px] font-mono text-indigo-300">Orchestrator v4.2</span>
            </div>

            <div className="absolute left-[10%] sm:left-[20%] top-[20%] z-10 flex flex-col items-center p-4 rounded-xl bg-slate-900/90 border border-slate-700 shadow-xl">
              <Database size={24} className="text-purple-400" />
              <span className="mt-1 font-mono font-bold text-slate-200 text-xs">Firebase Data Lake</span>
              <span className="text-[9px] font-mono text-emerald-400">Latency: 12ms</span>
            </div>

            <div className="absolute right-[10%] sm:right-[20%] top-[20%] z-10 flex flex-col items-center p-4 rounded-xl bg-slate-900/90 border border-slate-700 shadow-xl">
              <Globe size={24} className="text-indigo-400" />
              <span className="mt-1 font-mono font-bold text-slate-200 text-xs">Next.js Edge Network</span>
              <span className="text-[9px] font-mono text-emerald-400">Global Caching</span>
            </div>

            <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 z-10 flex flex-col items-center p-4 rounded-xl bg-slate-900/90 border border-slate-700 shadow-xl">
              <Smartphone size={24} className="text-emerald-400" />
              <span className="mt-1 font-mono font-bold text-slate-200 text-xs">Client Super Apps</span>
              <span className="text-[9px] font-mono text-emerald-400">100% Uptime SLA</span>
            </div>

            <motion.div
              animate={{ x: [-120, 120], y: [-80, -20], opacity: [0, 1, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-3 h-3 rounded-full bg-indigo-400 blur-xs shadow-[0_0_10px_#6366f1]"
            />
            <motion.div
              animate={{ x: [120, -120], y: [-80, -20], opacity: [0, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute w-3 h-3 rounded-full bg-purple-400 blur-xs shadow-[0_0_10px_#a855f7]"
            />
          </div>
        </div>
      </main>

      {/* STICKY BOTTOM CTA */}
      <div className="sticky bottom-0 z-50 border-t border-white/10 bg-[#0d0d12]/90 backdrop-blur-2xl px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <span className="font-bold text-white text-sm sm:text-base">Infrastruktur sekuat ini sekarang bisa diintegrasikan ke perusahaan lo.</span>
            <p className="text-xs text-slate-400">Hentikan pembakaran anggaran operasional dengan arsitektur otonom Chestaa.</p>
          </div>
          <Link
            href="/"
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold text-sm transition-all shadow-[0_0_30px_rgba(99,102,241,0.5)] cursor-pointer flex items-center gap-2 shrink-0"
          >
            <span>Deploy Arsitektur Gue Sekarang</span>
            <ArrowRight size=
{16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
