'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { PORTFOLIO_ITEMS } from '../../../data/portfolio';
import Breadcrumbs from '../../../components/molecules/Breadcrumbs';
import { ShieldCheck, Cpu, Terminal, ArrowLeft, Layers } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';

interface TechStackItem {
  name: string;
  badge: string;
  justification: string;
}

const TECH_STACK_ITEMS: TechStackItem[] = [
  {
    name: 'Next.js 15 App Router',
    badge: 'Framework Core',
    justification: 'Dipilih untuk menjamin waktu muat sub-detik dan dominasi SEO teknis.'
  },
  {
    name: 'Firebase Firestore',
    badge: 'Database Real-time',
    justification: 'Digunakan untuk sinkronisasi data real-time tanpa latensi.'
  },
  {
    name: 'Google Gemini & OpenAI',
    badge: 'AI Intelligence',
    justification: 'Ditenagai model bahasa besar untuk penalaran otonom dan kualifikasi prospek.'
  },
  {
    name: 'Tailwind CSS v4',
    badge: 'Styling Engine',
    justification: 'Memberikan sistem desain presisi tinggi dengan bobot aset minimal.'
  }
];

export default function PortfolioDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const project = PORTFOLIO_ITEMS.find((p) => p.slug === slug || p.id === slug);
  const [activeTech, setActiveTech] = useState<string | null>(null);

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center justify-center px-6 py-24 font-sans">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-50 mb-4">Studi Kasus Tidak Ditemukan</h1>
        <p className="text-slate-300 text-base mb-8">Maaf, proyek arsitektur enterprise yang Anda cari tidak tersedia dalam arsip kami.</p>
        <Link href="/portfolio" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 transition-colors">
          <ArrowLeft size={16} /> Kembali ke Portfolio
        </Link>
      </div>
    );
  }

  const softwareAppSchema = project.schemaData;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-indigo-600 selection:text-white py-32 px-6 sm:px-8 relative overflow-hidden">
      {/* Inject SoftwareApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-600/20 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 space-y-12">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Portfolio', href: '/portfolio' }, { label: project.title, href: '#' }]} />

        {/* Hero Section */}
        <header className="space-y-6 pb-10 border-b border-white/10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-400 bg-indigo-950/80 px-3 py-1 rounded-full border border-indigo-500/30">
              {project.category}
            </span>
            <span className="text-xs font-mono text-slate-400">
              [INDUSTRY: {project.industry.toUpperCase()}]
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-50 leading-[1.1]">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed">
            {project.description}
          </p>

          {/* Sleek Metrics Bar */}
          <div className="pt-4 flex flex-wrap gap-3">
            {project.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="font-mono text-xs bg-emerald-950/90 text-emerald-400 border border-emerald-500/40 px-4 py-2 rounded-xl font-bold tracking-wider shadow-md"
              >
                [{metric}]
              </div>
            ))}
          </div>
        </header>

        {/* Main Content Sections */}
        <div className="space-y-12">
          {/* The Challenge Section */}
          <section className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl space-y-4">
            <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs uppercase tracking-wider">
              <Terminal size={16} />
              <span>01. Tantangan &amp; Bottleneck Bisnis</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-50 tracking-tight">
              Permasalahan Operasional &amp; Keterbatasan Sistem Konvensional
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
              {project.challenge}
            </p>
          </section>

          {/* The Architecture Section */}
          <section className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider">
              <Cpu size={16} />
              <span>02. Solusi Arsitektur &amp; Rekayasa Sistem</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-50 tracking-tight">
              Pendekatan Teknis &amp; Implementasi Karyawan AI Chestaa
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
              {project.architecture}
            </p>
          </section>

          {/* Interactive Tech Stack Section */}
          <section className="p-8 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-white/[0.03] to-purple-950/40 border border-white/10 backdrop-blur-2xl space-y-6">
            <div className="flex items-center gap-2 text-purple-400 font-mono text-xs uppercase tracking-wider">
              <Layers size={16} />
              <span>03. Arsitektur &amp; Infrastruktur</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-50 tracking-tight">
              Teknologi Inti &amp; Justifikasi Bisnis Enterprise
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Klik atau arahkan kursor pada setiap tumpukan teknologi di bawah untuk melihat alasan pemilihan arsitektur.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              {TECH_STACK_ITEMS.map((tech) => {
                const isActive = activeTech === tech.name;
                return (
                  <div key={tech.name} className="relative">
                    <button
                      onMouseEnter={() => setActiveTech(tech.name)}
                      onMouseLeave={() => setActiveTech(null)}
                      onClick={() => setActiveTech(isActive ? null : tech.name)}
                      className={`px-5 py-3 rounded-2xl font-mono text-xs font-bold transition-all cursor-pointer border ${
                        isActive 
                          ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-600/30 scale-105' 
                          : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:border-indigo-500/50'
                      }`}
                    >
                      <span>{tech.name}</span>
                      <span className="block text-[10px] opacity-75 font-normal mt-0.5">{tech.badge}</span>
                    </button>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 4, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute z-30 bottom-full left-0 mb-3 w-72 p-4 rounded-2xl bg-slate-900 border border-indigo-500/40 shadow-2xl text-xs text-slate-200 leading-relaxed pointer-events-none"
                        >
                          <div className="font-bold text-indigo-300 mb-1 font-mono uppercase tracking-wider text-[10px]">[Justifikasi Arsitektur]</div>
                          <p className="m-0">{tech.justification}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Footer Actions */}
        <div className="pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <ShieldCheck size={16} className="text-emerald-400" />
            <span>Verified Production Case Study • Chestaa Enterprise</span>
          </div>

          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm tracking-wider uppercase transition-all shadow-lg cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Kembali ke Portfolio</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
