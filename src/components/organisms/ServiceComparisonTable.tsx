"use client";

import React from 'react';
import { motion } from 'motion/react';
import { Check, X, Sparkles, ShieldCheck, Zap, Info } from 'lucide-react';
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
    <section className="py-20 bg-white relative overflow-hidden border-t border-slate-100" id="comparison">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 mb-4">
            <ShieldCheck size={14} className="text-purple-600" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-purple-900">Enterprise Feature Matrix</span>
          </div>
          <AnimatedHeading as="h2" className="text-3xl md:text-5xl font-display font-black text-slate-900 tracking-tight mb-4">
            Perbandingan <span className="text-purple-700 text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-purple-500">Transparan.</span>
          </AnimatedHeading>
          <p className="text-slate-600 max-w-2xl mx-auto font-sans text-sm sm:text-base">
            Bandingkan fitur setiap paket untuk menemukan solusi rekayasa digital yang paling tepat bagi target pertumbuhan bisnis Anda.
          </p>
        </div>

        {/* Comparison Table Desktop */}
        <div className="hidden md:block overflow-hidden rounded-3xl border border-slate-200 shadow-2xl shadow-purple-950/5">
          <table className="w-full text-left border-collapse bg-white">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="p-8 w-1/4 border-b border-slate-200">
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">Fitur & Spesifikasi</span>
                </th>
                <th className="p-8 w-1/4 border-b border-slate-200">
                  <div className="text-lg font-display font-black text-slate-900">Starter</div>
                  <div className="text-xs font-mono text-purple-600 font-bold mt-1">Rp 540.000</div>
                </th>
                <th className="p-8 w-1/4 border-b border-slate-200 bg-purple-50/30">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <div className="text-lg font-display font-black text-slate-900">Professional</div>
                      <span className="px-2 py-0.5 rounded-full bg-purple-600 text-[8px] text-white font-black uppercase">BEST VALUE</span>
                    </div>
                    <span className="text-[9px] text-purple-700 font-bold uppercase tracking-tight">Terbaik untuk Bisnis BSD</span>
                  </div>
                  <div className="text-xs font-mono text-purple-700 font-bold mt-1">Rp 2.450.000</div>
                </th>
                <th className="p-8 w-1/4 border-b border-slate-200">
                  <div className="text-lg font-display font-black text-slate-900">Enterprise</div>
                  <div className="text-xs font-mono text-purple-600 font-bold mt-1">Custom Request</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {comparisonData.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/30 transition-colors group">
                  <td className="p-6 sm:p-8">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">{row.name}</span>
                      {row.info && (
                        <div className="group/info relative">
                          <Info size={12} className="text-slate-300 hover:text-purple-500 cursor-help" />
                          <div className="absolute left-0 bottom-full mb-2 w-48 p-3 bg-slate-900 text-[10px] text-white rounded-lg opacity-0 invisible group-hover/info:opacity-100 group-hover/info:visible transition-all z-50 shadow-xl leading-relaxed">
                            {row.info}
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-6 sm:p-8">
                    {renderValue(row.starter)}
                  </td>
                  <td className="p-6 sm:p-8 bg-purple-50/10">
                    {renderValue(row.professional, true)}
                  </td>
                  <td className="p-6 sm:p-8">
                    {renderValue(row.enterprise)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td className="p-8 border-t border-slate-200 bg-slate-50/50"></td>
                <td className="p-8 border-t border-slate-200 bg-slate-50/50">
                  <a href="#contact" className="text-xs font-black uppercase tracking-widest text-slate-900 hover:text-purple-700 flex items-center gap-2 transition-colors">
                    Pilih Starter <Zap size={12} className="text-amber-500" />
                  </a>
                </td>
                <td className="p-8 border-t border-slate-200 bg-purple-100/20">
                  <a href="#contact" className="text-xs font-black uppercase tracking-widest text-purple-900 hover:text-purple-700 flex items-center gap-2 transition-colors">
                    Pilih Professional <Sparkles size={12} className="animate-pulse text-purple-600" />
                  </a>
                </td>
                <td className="p-8 border-t border-slate-200 bg-slate-50/50">
                  <a href="#contact" className="text-xs font-black uppercase tracking-widest text-slate-900 hover:text-purple-700 flex items-center gap-2 transition-colors">
                    Diskusikan AI <ShieldCheck size={12} className="text-emerald-500" />
                  </a>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Mobile View - Horizontal Scrolling */}
        <div className="md:hidden space-y-6">
          <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100 flex items-center gap-3">
            <Info size={16} className="text-purple-600 shrink-0" />
            <p className="text-[10px] font-sans text-slate-600 leading-relaxed uppercase tracking-tight font-bold">
              Geser ke samping untuk membandingkan paket
            </p>
          </div>
          
          <div className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide snap-x">
            <div className="flex gap-4 min-w-[700px]">
              {["starter", "professional", "enterprise"].map((tier) => (
                <div key={tier} className={`flex-1 min-w-[220px] rounded-2xl border snap-center ${tier === 'professional' ? 'border-purple-300 bg-purple-50/30' : 'border-slate-200 bg-white'} p-6 shadow-sm`}>
                  <div className="text-sm font-display font-black uppercase tracking-widest text-slate-900 mb-4">
                    {tier === 'starter' ? 'Starter' : tier === 'professional' ? 'Professional' : 'Enterprise'}
                  </div>
                  <div className="space-y-4">
                    {comparisonData.map((row, i) => (
                      <div key={i} className="border-t border-slate-100 pt-3">
                        <div className="text-[9px] font-bold text-slate-400 uppercase mb-1 tracking-tighter">{row.name}</div>
                        <div className="text-xs font-sans text-slate-700">
                          {renderValue(row[tier as keyof FeatureRow], tier === 'professional')}
                        </div>
                      </div>
                    ))}
                  </div>
                  <a href="#contact" className="mt-6 block w-full py-3 text-center rounded-xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest">
                    Pilih Paket
                  </a>
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
      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${highlighted ? 'bg-purple-600 text-white' : 'bg-emerald-100 text-emerald-600'}`}>
        <Check size={14} strokeWidth={3} />
      </div>
    ) : (
      <div className="w-6 h-6 rounded-full flex items-center justify-center bg-slate-100 text-slate-400">
        <X size={14} strokeWidth={3} />
      </div>
    );
  }
  return (
    <span className={`text-xs sm:text-sm font-sans ${highlighted ? 'font-bold text-purple-900' : 'text-slate-600'}`}>
      {value}
    </span>
  );
}
