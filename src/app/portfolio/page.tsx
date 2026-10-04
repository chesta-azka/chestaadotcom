'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_ITEMS } from '../../data/portfolio';
import Breadcrumbs from '../../components/molecules/Breadcrumbs';
import { Terminal, Cpu, Layers, ArrowRight, ShieldCheck, Sparkles, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function EnterprisePortfolioPage() {
  const handleOpenAiConcierge = () => {
    window.dispatchEvent(new CustomEvent('open-ai-concierge'));
  };

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-slate-100 font-sans selection:bg-indigo-600 selection:text-white relative overflow-hidden py-32 px-6 sm:px-8">
      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:48px_48px] opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Breadcrumbs Navigation */}
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Portfolio', href: '/portfolio' }]} />

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center max-w-4xl mx-auto space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-500/35 text-indigo-400 text-xs font-mono uppercase tracking-widest">
            <Cpu size={14} className="animate-pulse" />
            <span>Enterprise Intellectual Property Showcase</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Infrastruktur Proprietary &amp; <b>Pembuktian Konsep</b>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto">
            Kami tidak menjual teori. Berikut adalah arsitektur sistem dan Karyawan AI yang kami bangun, operasikan, dan skalakan secara mandiri sebelum diimplementasikan ke perusahaan Anda.
          </p>
        </motion.div>

        {/* Staggered Bento Grid Layout */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.15 }
            }
          }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
        >
          {PORTFOLIO_ITEMS.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
              }}
              className="group relative rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl hover:border-emerald-400/60 hover:shadow-emerald-500/10 transition-all duration-300 overflow-hidden"
            >
              {/* Inject schemaData SoftwareApplication JSON-LD dynamically */}
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(item.schemaData) }}
              />

              {/* Neon Accent Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div className="space-y-6 relative z-10">
                {/* Cover Preview Box */}
                <div className="w-full aspect-[16/10] rounded-2xl bg-slate-950 border border-white/10 overflow-hidden flex flex-col shadow-inner relative">
                  {item.coverType === 'code' && item.codeSnippet && (
                    <div className="p-4 flex-1 flex flex-col justify-between font-mono text-[11px] text-indigo-300/90 leading-relaxed overflow-hidden">
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-slate-500">
                        <span className="flex items-center gap-1.5"><Terminal size={12} className="text-indigo-400" /> core-engine.ts</span>
                        <span className="text-[10px] text-emerald-400">STATUS: DEPLOYED</span>
                      </div>
                      <pre className="overflow-hidden m-0 p-0 text-slate-300">{item.codeSnippet}</pre>
                    </div>
                  )}

                  {item.coverType === 'isometric' && (
                    <div className={`w-full h-full bg-gradient-to-br ${item.isometricBg || 'from-emerald-950 to-slate-900'} flex items-center justify-center p-6 relative`}>
                      <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
                      <div className="relative z-10 text-center space-y-2">
                        <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20">
                          <Layers size={28} />
                        </div>
                        <div className="text-xs font-mono text-emerald-300 uppercase tracking-wider">[STATUS: ACTIVE INFRA]</div>
                      </div>
                    </div>
                  )}

                  {item.coverType === 'wireframe' && (
                    <div className={`w-full h-full bg-gradient-to-br ${item.isometricBg || 'from-purple-950 to-slate-950'} flex items-center justify-center p-6 relative`}>
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,#6366f110_1px,transparent_1px),linear-gradient(to_bottom,#6366f110_1px,transparent_1px)] bg-[size:24px_24px]" />
                      <div className="relative z-10 text-center space-y-2">
                        <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shadow-lg shadow-purple-500/20">
                          <Cpu size={28} />
                        </div>
                        <div className="text-xs font-mono text-purple-300 uppercase tracking-wider">[STATUS: AUTONOMOUS]</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Category & Industry */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/80 px-3 py-1 rounded-full border border-indigo-500/30">
                    {item.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {item.industry}
                  </span>
                </div>

                {/* Title & Description */}
                <div className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Data-driven Metric Tags */}
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">
                    Verified Performance Metrics:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {item.metrics.map((metric, idx) => (
                      <span
                        key={idx}
                        className="font-mono text-xs bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 px-3 py-1 rounded-lg font-bold tracking-tight shadow-sm"
                      >
                        [{metric}]
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between relative z-10">
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-emerald-400" /> Production Grade
                </span>
                <Link
                  href={`/portfolio/${item.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-wider cursor-pointer"
                >
                  <span>Analisis Kasus</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Massive High-Contrast CTA Section with AI Concierge Trigger */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-28 p-10 sm:p-14 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 border border-indigo-500/30 shadow-2xl text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-900/80 text-indigo-300 text-xs font-mono uppercase tracking-widest border border-indigo-500/40">
              <Sparkles size={14} />
              <span>Transformasi Arsitektur Digital B2B</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              <b>Siap Meninggalkan Website Lama Anda?</b>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Tinggalkan template lambat dan biarkan Karyawan AI serta arsitektur Next.js 15 mendominasi pasar digital Anda hari ini.
            </p>

            <div className="pt-4">
              <button
                onClick={handleOpenAiConcierge}
                className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base tracking-wider uppercase transition-all shadow-xl hover:shadow-indigo-600/30 cursor-pointer group"
              >
                <MessageSquare size={18} className="text-indigo-200 group-hover:scale-110 transition-transform" />
                <span><b>Mulai Arsitektur Anda</b></span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
