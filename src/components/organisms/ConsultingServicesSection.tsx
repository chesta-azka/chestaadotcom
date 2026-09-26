'use client';

import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Cpu, 
  Workflow, 
  SearchCode, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  MessageSquare,
  Zap
} from 'lucide-react';

interface ConsultingOffering {
  id: string;
  title: string;
  categoryLabel: string;
  description: string;
  timeline: string;
  roiFocus: string;
  deliverables: string[];
  icon: React.ElementType;
  popular?: boolean;
}

const consultingOfferings: ConsultingOffering[] = [
  {
    id: 'architecture-consulting',
    title: 'Executive Enterprise Web & AI Architecture Consulting',
    categoryLabel: 'AI & Web Architecture',
    description: 'Sesi strategis mendalam bersama Principal Architect untuk merancang sistem skalabel berstandar enterprise. Kami memandu pemilihan tech stack, desain arsitektur web berperforma tinggi, dan integrasi pipeline AI otonom yang efisien.',
    timeline: '⚡ 60-Minute Deep Dive Session',
    roiFocus: 'Hemat hingga Rp 150JT+ biaya trial-and-error arsitektur dan cegah kegagalan skalabilitas sistem sejak hari pertama.',
    deliverables: [
      'High-Performance Micro-Frontend Blueprint',
      'AI Agent Pipeline & LLM Selection Roadmap',
      'Security & Authentication Best Practices',
      'Direct WhatsApp Advisory Access'
    ],
    icon: Workflow,
    popular: true
  },
  {
    id: 'deep-tech-audit',
    title: 'Deep Tech & Core Web Vitals Performance Audit',
    categoryLabel: 'Performance & Security Audit',
    description: 'Analisis menyeluruh terhadap codebase, kecepatan muat (Core Web Vitals), dan celah keamanan sistem Anda. Kami mengidentifikasi *bottleneck* tersembunyi yang membuat konversi penjualan drop dan memperlambat bisnis Anda.',
    timeline: '⚡ Comprehensive 3-Day Audit Report',
    roiFocus: 'Lonjakan PageSpeed hingga 99+ dan eliminasi *technical debt* yang menghambat performa konversi digital Anda.',
    deliverables: [
      'Comprehensive Codebase Health Score',
      'Lighthouse 99+ Performance Action Plan',
      'Security Vulnerability & Pentest Summary',
      'Prioritized Refactoring Roadmap'
    ],
    icon: SearchCode
  }
];

export default function ConsultingServicesSection() {
  return (
    <section className="py-16 md:py-20 bg-slate-50/40 relative overflow-hidden [background-image:linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] [background-size:4rem_4rem]" id="consulting">
      
      {/* Ambient Glow Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-purple-200/25 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200/80 text-purple-700 text-xs font-semibold mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
            <span>Executive Advisory &amp; Technical Audit</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 font-display">
            Konsultasi Arsitektur AI &amp; Audit Performa Eksekutif
          </h2>
          <p className="text-slate-600 mt-3 text-base font-light">
            Solusi tepat bagi pimpinan perusahaan dan startup ambisius untuk memastikan fondasi teknologi Anda dibangun tanpa kompromi.
          </p>
        </motion.div>

        {/* Consulting Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {consultingOfferings.map((item, index) => {
            const Icon = item.icon;
            const whatsappMsg = encodeURIComponent(`Halo Mas Chesta, saya tertarik untuk menjadwalkan sesi "${item.title}". Mohon informasi ketersediaan waktu konsultasi.`);
            const whatsappUrl = `https://wa.me/6282125447232?text=${whatsappMsg}`;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ 
                  type: "spring", 
                  stiffness: 280, 
                  damping: 24, 
                  delay: index * 0.1 
                }}
                className="rounded-3xl bg-white/80 backdrop-blur-2xl border border-purple-100/90 p-8 sm:p-10 shadow-xl shadow-purple-900/5 hover:border-purple-300 hover:shadow-2xl hover:shadow-purple-900/10 transition-all duration-300 flex flex-col justify-between relative group overflow-hidden"
              >
                {item.popular && (
                  <div className="absolute top-6 right-6 bg-purple-50 border border-purple-200/80 text-purple-700 text-[10px] font-mono font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-2xs">
                    Executive Flagship
                  </div>
                )}

                <div>
                  {/* Icon & Timeline */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-purple-900 text-white flex items-center justify-center shadow-md shadow-purple-950/20 group-hover:scale-105 transition-transform">
                      <Icon size={26} />
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-100/80">
                      {item.timeline}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-purple-600 block mb-1">
                    {item.categoryLabel}
                  </span>

                  <h3 className="text-2xl font-bold font-display text-slate-900 tracking-tight mb-3 group-hover:text-purple-900 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed mb-6 font-light">
                    {item.description}
                  </p>

                  {/* ROI Highlight Box */}
                  <div className="bg-purple-50/80 rounded-2xl p-4 border border-purple-100/90 mb-6">
                    <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-900 uppercase tracking-wider mb-1">
                      <Zap size={14} className="text-purple-700" />
                      <span>Executive ROI Focus</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 font-sans font-medium">
                      {item.roiFocus}
                    </p>
                  </div>

                  {/* Deliverables Checklist */}
                  <div className="space-y-2.5 mb-8 pt-4 border-t border-purple-100/80">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2">Deliverables Utama:</span>
                    {item.deliverables.map((deliv, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-sans">
                        <CheckCircle2 size={16} className="text-purple-600 shrink-0" />
                        <span>{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* WhatsApp Consultation Handover CTA */}
                <div className="pt-6 border-t border-purple-100/80 flex items-center justify-between gap-4 mt-auto">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Jadwalkan Sesi</span>
                    <span className="text-xs font-bold text-purple-900">Respons Langsung via WhatsApp</span>
                  </div>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-purple-900 hover:bg-purple-800 text-white text-xs sm:text-sm font-bold transition-all shadow-lg shadow-purple-950/20 group-hover:scale-105 cursor-pointer"
                  >
                    <MessageSquare size={16} />
                    <span>Jadwalkan Konsultasi</span>
                    <ArrowRight size={14} />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
