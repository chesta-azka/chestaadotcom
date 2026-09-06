"use client";

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  MessageCircle, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Activity, 
  Gauge, 
  Layers, 
  CheckCircle2, 
  Server, 
  Terminal, 
  Code2, 
  Database, 
  Bot,
  RefreshCw,
  Cpu,
  Flame,
  Check
} from 'lucide-react';

type ConsoleTab = 'pipeline' | 'vitals' | 'stack';

interface PipelineStep {
  id: string;
  name: string;
  desc: string;
  speed: string;
  icon: React.ElementType;
  tag: string;
  color: string;
}

const PIPELINE_STEPS: PipelineStep[] = [
  {
    id: 'edge',
    name: 'Global Edge Proxy',
    desc: 'Brotli compression, HTTP/3, and Cloudflare DNS routing',
    speed: '< 8ms',
    icon: Server,
    tag: 'Network Layer',
    color: 'text-sky-500'
  },
  {
    id: 'ssr',
    name: 'Next.js 15 SSR Engine',
    desc: 'Server-side rendering, streaming HTML, zero hydration lag',
    speed: '< 24ms',
    icon: Cpu,
    tag: 'Compute Core',
    color: 'text-purple-500'
  },
  {
    id: 'db',
    name: 'Cloud Firestore Realtime',
    desc: 'NoSQL sub-second document sync & optimistic caching',
    speed: '< 35ms',
    icon: Database,
    tag: 'Data Persistence',
    color: 'text-emerald-500'
  },
  {
    id: 'ai',
    name: 'Agentic AI Pipeline',
    desc: 'Gemini 2.5 Flash function calling & server-side streaming',
    speed: '< 150ms',
    icon: Bot,
    tag: 'Intelligence Layer',
    color: 'text-amber-500'
  }
];

export function ModernHeroCenterpiece() {
  const [activeTab, setActiveTab] = useState<ConsoleTab>('pipeline');
  const [activeStep, setActiveStep] = useState<string>('ssr');
  const [pingSpeed, setPingSpeed] = useState<number>(16);
  const [isPinging, setIsPinging] = useState<boolean>(false);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  // Live ping simulation
  const handlePing = () => {
    setIsPinging(true);
    setTimeout(() => {
      const speeds = [12, 14, 16, 18, 11, 15];
      const randomSpeed = speeds[Math.floor(Math.random() * speeds.length)];
      setPingSpeed(randomSpeed);
      setIsPinging(false);
    }, 450);
  };

  return (
    <section className="w-full max-w-7xl mx-auto pt-28 sm:pt-32 md:pt-36 pb-16 z-10 px-2 sm:px-4">
      {/* 2-Column Balanced Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        
        {/* Left Column: Command & Value Proposition */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          
          {/* Telemetry Status Pill with Micro-animation */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 text-white border border-purple-500/30 shadow-md shadow-purple-950/10 mb-6 backdrop-blur-md"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-mono font-bold tracking-wide uppercase text-slate-200">
              Live Architecture // {pingSpeed}ms Ping • BSD City
            </span>
            <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-slate-500" />
            <span className="hidden sm:inline-block text-[10px] font-mono text-purple-300 font-semibold">
              v15.2 Production
            </span>
          </motion.div>

          {/* Upgraded Typography Headline with Staggered Entrance */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight leading-[1.12] text-slate-900 text-balance"
          >
            Arsitektur Web Modern &amp; <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-900 via-indigo-800 to-purple-950">
              Rekayasa Otomasi AI
            </span>{' '}
            <span className="relative inline-block">
              Skala Bisnis.
              <span className="absolute bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full opacity-60" />
            </span>
          </motion.h1>

          {/* Value Proposition Body */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-6 text-base sm:text-lg text-slate-600 font-sans leading-relaxed max-w-2xl text-balance"
          >
            CHESTADOTCOM membangun website Next.js berkinerja tinggi, database real-time tangguh, serta agen AI terintegrasi. Dirancang presisi dari BSD City untuk meningkatkan kredibilitas, kecepatan, dan konversi bisnis Anda.
          </motion.p>

          {/* CTA Group with Micro-Animations */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto"
          >
            {/* Primary Action Button (WhatsApp) */}
            <motion.a
              href="https://wa.me/6282125447232?text=Halo%20Mas%20Chesta!%20Saya%20tertarik%20untuk%20konsultasi%20pembuatan%20website%20arsitektur%20modern%20di%20CHESTADOTCOM."
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.025 }}
              whileTap={{ scale: 0.975 }}
              className="relative group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-950 via-purple-900 to-indigo-950 text-white font-sans text-sm sm:text-base font-bold shadow-xl shadow-purple-950/20 hover:shadow-2xl hover:shadow-purple-900/30 transition-all cursor-pointer overflow-hidden border border-purple-700/40"
            >
              {/* Subtle light sweep reflection */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
              
              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center border border-emerald-400/40">
                <MessageCircle size={15} className="text-emerald-400" />
              </div>
              <span>Konsultasi Cepat di WhatsApp</span>
              <ArrowRight size={16} className="text-purple-300 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.a>

            {/* Secondary Action Button (Portfolio / Case Studies) */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/case-studies"
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-white hover:bg-purple-50/50 text-slate-800 font-sans text-sm sm:text-base font-semibold border border-slate-200 hover:border-purple-300 shadow-sm transition-all cursor-pointer w-full sm:w-auto"
              >
                <span>Lihat Portofolio</span>
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 transition-transform group-hover:scale-150" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Quick Estimator CTA Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-4 flex items-center gap-2 text-xs font-semibold text-purple-700 hover:text-purple-900 transition-colors"
          >
            <Sparkles size={14} className="text-amber-500" />
            <span>Butuh perkiraan biaya instan?</span>
            <a href="#kalkulator-biaya" className="underline underline-offset-4 font-bold flex items-center gap-1 hover:text-indigo-600">
              Buka Kalkulator Estimasi di Bawah <ArrowRight size={12} />
            </a>
          </motion.div>

          {/* Trust Metrics Horizontal Strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
            className="mt-10 pt-6 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full"
          >
            <div className="flex flex-col">
              <span className="font-mono text-xl sm:text-2xl font-extrabold text-slate-900">
                &lt; 0.5s
              </span>
              <span className="text-xs text-slate-500 font-medium mt-0.5">
                First Contentful Paint
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xl sm:text-2xl font-extrabold text-slate-900">
                100/100
              </span>
              <span className="text-xs text-slate-500 font-medium mt-0.5">
                Lighthouse Score
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xl sm:text-2xl font-extrabold text-slate-900">
                100%
              </span>
              <span className="text-xs text-slate-500 font-medium mt-0.5">
                Source Code Hak Milik
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xl sm:text-2xl font-extrabold text-slate-900">
                30 Hari
              </span>
              <span className="text-xs text-slate-500 font-medium mt-0.5">
                Garansi Maintenance
              </span>
            </div>
          </motion.div>

        </div>

        {/* Right Column: Software House Architecture Console Centerpiece */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-5 w-full"
        >
          <div className="bg-slate-950/85 backdrop-blur-xl text-slate-200 rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-800 relative overflow-hidden ring-1 ring-purple-500/20">
            
            {/* Ambient Corner Flare inside terminal */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* Terminal Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80 relative z-10">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 font-mono text-xs font-semibold text-slate-400">
                  chesta-runtime.ts
                </span>
              </div>

              {/* Ping Trigger Button */}
              <button
                type="button"
                onClick={handlePing}
                disabled={isPinging}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-[11px] font-mono text-slate-300 transition-colors cursor-pointer"
                title="Jalankan uji latensi edge server"
              >
                <RefreshCw size={11} className={isPinging ? 'animate-spin text-purple-400' : 'text-slate-400'} />
                <span>{isPinging ? 'Pinging...' : `${pingSpeed}ms`}</span>
              </button>
            </div>

            {/* Console Tabs */}
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800 mb-5 relative z-10">
              <button
                type="button"
                onClick={() => setActiveTab('pipeline')}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === 'pipeline'
                    ? 'bg-purple-600/90 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers size={13} />
                <span>Pipeline</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('vitals')}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === 'vitals'
                    ? 'bg-purple-600/90 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Gauge size={13} />
                <span>Vitals</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('stack')}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === 'stack'
                    ? 'bg-purple-600/90 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Code2 size={13} />
                <span>Stack</span>
              </button>
            </div>

            {/* Tab Contents */}
            <div className="relative z-10 min-h-[260px]">
              
              {/* TAB 1: PIPELINE */}
              {activeTab === 'pipeline' && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1 px-1">
                    <span className="font-mono text-[11px] text-slate-400">// ARSITEKTUR STREAMING END-TO-END</span>
                    <span className="text-[10px] font-mono text-emerald-400">Zero Cold Start</span>
                  </div>

                  {PIPELINE_STEPS.map((step) => {
                    const isSelected = activeStep === step.id;
                    const IconComp = step.icon;

                    return (
                      <div
                        key={step.id}
                        onClick={() => setActiveStep(step.id)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-slate-900 border-purple-500/70 shadow-md shadow-purple-950/40 ring-1 ring-purple-500/30'
                            : 'bg-slate-900/50 border-slate-800/80 hover:bg-slate-900/80 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className={`w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center flex-shrink-0 ${step.color}`}>
                              <IconComp size={16} />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <h4 className="text-xs font-bold text-white truncate">{step.name}</h4>
                                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                                  {step.tag}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-400 truncate mt-0.5">{step.desc}</p>
                            </div>
                          </div>
                          <span className="font-mono text-xs font-bold text-emerald-400 ml-2 flex-shrink-0">
                            {step.speed}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* TAB 2: VITALS */}
              {activeTab === 'vitals' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                    <span className="font-mono text-[11px] text-slate-400">// CORE WEB VITALS BENCHMARK</span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">Grade: 100/100</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800">
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                        <span>LCP (Paint)</span>
                        <span className="text-emerald-400 font-mono font-bold">0.42s</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-1">
                        <div className="h-full bg-emerald-500 rounded-full w-[98%]" />
                      </div>
                      <span className="text-[10px] text-slate-500">Target &lt; 2.5s (98% lebih cepat)</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800">
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                        <span>CLS (Layout Shift)</span>
                        <span className="text-emerald-400 font-mono font-bold">0.00</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-1">
                        <div className="h-full bg-emerald-500 rounded-full w-[100%]" />
                      </div>
                      <span className="text-[10px] text-slate-500">Nol pergeseran layout visual</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800">
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                        <span>INP (Interaction)</span>
                        <span className="text-emerald-400 font-mono font-bold">18ms</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-1">
                        <div className="h-full bg-emerald-500 rounded-full w-[95%]" />
                      </div>
                      <span className="text-[10px] text-slate-500">Respons klik instan</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800">
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                        <span>TTFB (Server)</span>
                        <span className="text-emerald-400 font-mono font-bold">24ms</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-1">
                        <div className="h-full bg-emerald-500 rounded-full w-[96%]" />
                      </div>
                      <span className="text-[10px] text-slate-500">Edge SSR Pre-cached</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs text-purple-200 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-purple-400 flex-shrink-0" />
                    <span>Lolos uji Google PageSpeed Insights &amp; SEO Mobile-Friendly Audit.</span>
                  </div>
                </div>
              )}

              {/* TAB 3: ENTERPRISE TECH STACK */}
              {activeTab === 'stack' && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1 px-1">
                    <span className="font-mono text-[11px] text-slate-400">// PRODUCTION STACK SPEC</span>
                    <span className="text-[10px] font-mono text-purple-400">Production Ready</span>
                  </div>

                  <div className="font-mono text-xs bg-slate-900/90 p-4 rounded-2xl border border-slate-800 text-slate-300 space-y-1.5 overflow-x-auto">
                    <div className="text-purple-400">const stack = &#123;</div>
                    <div className="pl-4 text-slate-300">framework: <span className="text-emerald-400">&apos;Next.js 15 (App Router)&apos;</span>,</div>
                    <div className="pl-4 text-slate-300">styling: <span className="text-emerald-400">&apos;Tailwind CSS v4 + Motion&apos;</span>,</div>
                    <div className="pl-4 text-slate-300">database: <span className="text-emerald-400">&apos;Google Cloud Firestore&apos;</span>,</div>
                    <div className="pl-4 text-slate-300">intelligence: <span className="text-emerald-400">&apos;Gemini 2.5 Flash API&apos;</span>,</div>
                    <div className="pl-4 text-slate-300">security: <span className="text-emerald-400">&apos;HttpOnly + CSP + Strict Rules&apos;</span>,</div>
                    <div className="pl-4 text-slate-300">deployment: <span className="text-emerald-400">&apos;Cloud Run Container / Edge&apos;</span></div>
                    <div className="text-purple-400">&#125;;</div>
                  </div>

                  <div className="flex items-center justify-between px-2 pt-1 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <ShieldCheck size={14} /> Zero Vendor Lock-in
                    </span>
                    <span className="text-[11px]">100% Full Source Code Handover</span>
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Status Bar */}
            <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>ID-CGK-Edge (Jakarta-BSD)</span>
              </div>
              <span className="text-slate-500">SLA: 99.98%</span>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
