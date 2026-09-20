"use client";

import React from 'react';
import { motion } from 'motion/react';
import { Check, X, Sparkles, ShieldCheck, Zap, Info, ArrowRight } from 'lucide-react';
import AnimatedHeading from '../atoms/AnimatedHeading';

interface FeatureRow {
  name: string;
  starter: string | boolean;
  professional: string | boolean;
  enterprise: string | boolean;
  info?: string;
}

const comparisonData: FeatureRow[] = [
  {
    name: "Metodologi Desain",
    starter: "Premium Template",
    professional: "Bespoke UI/UX (Kustom)",
    enterprise: "High-End Brand Identity",
    info: "Starter menggunakan template yang dioptimasi, sementara Professional & Enterprise dirancang dari nol."
  },
  {
    name: "Teknologi Inti",
    starter: "High-Performance HTML/JS",
    professional: "Next.js 15 App Router",
    enterprise: "Next.js + AI Core + DB",
    info: "Next.js menawarkan performa SEO dan kecepatan muat yang jauh lebih unggul."
  },
  {
    name: "Optimasi Kecepatan",
    starter: "Lighthouse 90+",
    professional: "Lighthouse 98-100",
    enterprise: "Sub-Second Response",
    info: "Semua paket dijamin kencang, namun paket Enterprise dioptimasi hingga ke level server-side."
  },
  {
    name: "SEO & Discovery",
    starter: "Standard Metadata",
    professional: "Advanced Schema & AEO",
    enterprise: "GEO & AI Recommendation",
    info: "GEO (Generative Engine Optimization) memastikan brand Anda direkomendasikan oleh AI seperti ChatGPT."
  },
  {
    name: "Agentic AI Integration",
    starter: false,
    professional: "Optional Add-on",
    enterprise: "Full Agentic AI (Otonom)",
    info: "Otomasi operasional 24/7 menggunakan asisten AI cerdas."
  },
  {
    name: "Kepemilikan Source Code",
    starter: true,
    professional: true,
    enterprise: true,
    info: "Anda memiliki hak penuh atas kode dan data. Tidak ada vendor lock-in."
  },
  {
    name: "Dukungan & Maintenance",
    starter: "Email Support",
    professional: "30 Hari Garansi",
    enterprise: "SLA Priority & 24/7 Monitoring",
  },
  {
    name: "Waktu Pengerjaan",
    starter: "1–3 Hari Kerja",
    professional: "2–4 Minggu",
    enterprise: "4–8 Minggu (Skala Modul)",
  }
];

export default function ServiceComparisonTable() {
  return (
    <section className="py-24 bg-white relative overflow-hidden border-t border-slate-100" id="comparison">
      {/* Decorative radial gradients for depth */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-50/50 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 mb-6"
          >
            <ShieldCheck size={12} className="text-purple-600" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-slate-500">Feature Matrix v2.0</span>
          </motion.div>
          <AnimatedHeading as="h2" className="text-4xl md:text-6xl font-display font-medium text-slate-900 tracking-tight mb-6">
            Perbandingan <span className="text-purple-700 italic font-serif">Transparan.</span>
          </AnimatedHeading>
          <p className="text-slate-500 max-w-2xl mx-auto font-sans text-sm sm:text-base leading-relaxed">
            Bandingkan fitur setiap paket untuk menemukan solusi rekayasa digital yang paling tepat bagi target pertumbuhan bisnis Anda di BSD City & Tangerang.
          </p>
        </div>

        {/* Comparison Table Desktop */}
        <div className="hidden md:block overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.03)]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/40">
                <th className="p-10 w-1/4 border-b border-slate-100">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Spesifikasi Teknis</span>
                </th>
                <th className="p-10 w-1/4 border-b border-slate-100">
                  <div className="text-xl font-display font-bold text-slate-900">Starter</div>
                  <div className="text-xs font-mono text-slate-500 font-medium mt-2">Mulai Rp 540K</div>
                </th>
                <th className="p-10 w-1/4 border-b border-slate-100 bg-purple-50/20 relative">
                  <div className="absolute top-0 inset-x-0 h-1 bg-purple-600" />
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <div className="text-xl font-display font-bold text-slate-900">Professional</div>
                      <span className="px-2 py-0.5 rounded-full bg-purple-600 text-[8px] text-white font-black uppercase tracking-tighter">Recommended</span>
                    </div>
                    <span className="text-[10px] text-purple-700 font-bold uppercase tracking-tight text-nowrap">Best for BSD Businesses</span>
                  </div>
                  <div className="text-xs font-mono text-purple-900 font-bold mt-2">Mulai Rp 2.45M</div>
                </th>
                <th className="p-10 w-1/4 border-b border-slate-100">
                  <div className="text-xl font-display font-bold text-slate-900">Enterprise</div>
                  <div className="text-xs font-mono text-slate-500 font-medium mt-2">Custom Pricing</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {comparisonData.map((row, i) => (
                <motion.tr 
                  key={i} 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group hover:bg-slate-50/50 transition-colors"
                >
                  <td className="p-8">
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm font-medium text-slate-900">{row.name}</span>
                      {row.info && (
                        <div className="group/info relative">
                          <Info size={12} className="text-slate-300 hover:text-purple-600 transition-colors cursor-help" />
                          <div className="absolute left-0 bottom-full mb-3 w-56 p-4 bg-slate-900 text-[11px] text-slate-200 rounded-xl opacity-0 invisible group-hover/info:opacity-100 group-hover/info:visible transition-all z-50 shadow-2xl leading-relaxed border border-slate-800">
                            {row.info}
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-8">
                    {renderValue(row.starter)}
                  </td>
                  <td className="p-8 bg-purple-50/10">
                    {renderValue(row.professional, true)}
                  </td>
                  <td className="p-8">
                    {renderValue(row.enterprise)}
                  </td>
                </motion.tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td className="p-10 bg-slate-50/30"></td>
                <td className="p-10 bg-slate-50/30">
                  <a href="#contact" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-900 hover:text-purple-700 transition-colors group">
                    Pilih Paket <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </td>
                <td className="p-10 bg-purple-100/10">
                  <a href="#contact" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-purple-900 hover:text-purple-700 transition-colors group">
                    Mulai Sekarang <Sparkles size={12} className="text-purple-600 animate-pulse" />
                  </a>
                </td>
                <td className="p-10 bg-slate-50/30">
                  <a href="#contact" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-900 hover:text-purple-700 transition-colors group">
                    Diskusi Solusi <ShieldCheck size={12} className="text-emerald-500" />
                  </a>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Mobile View - Refined Horizontal Scrolling */}
        <div className="md:hidden space-y-6">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
              <Zap size={14} className="text-purple-600" />
            </div>
            <p className="text-[10px] font-sans text-slate-500 leading-relaxed uppercase tracking-widest font-bold">
              Geser untuk perbandingan paket
            </p>
          </div>
          
          <div className="overflow-x-auto pb-6 -mx-6 px-6 scrollbar-hide snap-x">
            <div className="flex gap-5 min-w-[800px]">
              {["starter", "professional", "enterprise"].map((tier) => (
                <div 
                  key={tier} 
                  className={`flex-1 min-w-[260px] rounded-[2rem] border snap-center overflow-hidden flex flex-col ${
                    tier === 'professional' 
                      ? 'border-purple-200 bg-purple-50/20 shadow-xl shadow-purple-900/5 ring-1 ring-purple-100' 
                      : 'border-slate-100 bg-white'
                  }`}
                >
                  <div className={`p-8 ${tier === 'professional' ? 'bg-purple-50/50' : 'bg-slate-50/50'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-slate-400">Paket</span>
                      {tier === 'professional' && <span className="px-2 py-0.5 rounded-full bg-purple-600 text-[8px] text-white font-black uppercase">Recommended</span>}
                    </div>
                    <div className="text-2xl font-display font-bold text-slate-900">
                      {tier.charAt(0).toUpperCase() + tier.slice(1)}
                    </div>
                    <div className="text-xs font-mono text-purple-600 font-bold mt-2">
                      {tier === 'starter' ? 'Rp 540K' : tier === 'professional' ? 'Rp 2.45M' : 'Custom Pricing'}
                    </div>
                  </div>
                  
                  <div className="p-8 space-y-6 flex-1">
                    {comparisonData.map((row, i) => (
                      <div key={i} className="space-y-1.5">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{row.name}</div>
                        <div className="text-sm font-sans text-slate-800">
                          {renderValue(row[tier as keyof FeatureRow], tier === 'professional')}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-6 border-t border-slate-100 bg-slate-50/50">
                    <a href="#contact" className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-purple-700 transition-colors shadow-lg">
                      Pilih {tier.charAt(0).toUpperCase() + tier.slice(1)}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function renderValue(value: string | boolean, highlighted = false) {
  if (typeof value === 'boolean') {
    return value ? (
      <div className={`w-7 h-7 rounded-full flex items-center justify-center ${highlighted ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-900'}`}>
        <Check size={14} strokeWidth={3} />
      </div>
    ) : (
      <div className="w-7 h-7 rounded-full flex items-center justify-center bg-slate-50 text-slate-300">
        <X size={14} strokeWidth={3} />
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      <span className={`text-xs sm:text-sm font-sans leading-relaxed ${highlighted ? 'font-bold text-purple-900' : 'text-slate-600'}`}>
        {value}
      </span>
    </div>
  );
}
