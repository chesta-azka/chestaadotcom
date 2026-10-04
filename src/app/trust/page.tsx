'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Activity, Lock, CheckCircle2, Server } from 'lucide-react';
import Breadcrumbs from '../../components/molecules/Breadcrumbs';

export default function TrustCenterPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-600 selection:text-white py-32 px-6 sm:px-8 relative overflow-hidden">
      {/* Background terminal grid glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-emerald-600/10 rounded-full blur-[180px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:32px_32px] opacity-15" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 space-y-12">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Trust Center', href: '/trust' }]} />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-widest">
            <ShieldCheck size={14} className="animate-pulse" />
            <span>Enterprise Security &amp; Compliance</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
            Chestaa Trust Center &amp; <b>System Status</b>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            Infrastruktur tingkat tinggi yang dirancang untuk menjamin ketersediaan mutlak, latensi minimum, dan isolasi data perusahaan kelas enterprise.
          </p>
        </motion.div>

        {/* 3 Glowing Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl relative overflow-hidden group hover:border-emerald-500/50 transition-all shadow-xl"
          >
            <div className="absolute top-0 right-0 p-6 text-emerald-400/20 group-hover:text-emerald-400/40 transition-colors">
              <Activity size={32} />
            </div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Real-time Performance</div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400 mb-2">12ms</div>
            <p className="text-xs text-slate-400 font-mono">API Latency (Global Edge Average)</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl relative overflow-hidden group hover:border-emerald-500/50 transition-all shadow-xl"
          >
            <div className="absolute top-0 right-0 p-6 text-emerald-400/20 group-hover:text-emerald-400/40 transition-colors">
              <Server size={32} />
            </div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Network Infrastructure</div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400 mb-2">Active</div>
            <p className="text-xs text-slate-400 font-mono">Global Edge CDN &amp; Serverless Nodes</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl relative overflow-hidden group hover:border-emerald-500/50 transition-all shadow-xl"
          >
            <div className="absolute top-0 right-0 p-6 text-emerald-400/20 group-hover:text-emerald-400/40 transition-colors">
              <Lock size={32} />
            </div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Reliability Metric</div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400 mb-2">99.99%</div>
            <p className="text-xs text-slate-400 font-mono">Uptime (Rolling 90 Days)</p>
          </motion.div>
        </div>

        {/* B2B SLA Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="p-8 sm:p-12 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-2xl space-y-6 shadow-2xl"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              <ShieldCheck size={24} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Service Level Agreement (SLA) &amp; Data Governance
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-1" />
                <p className="text-sm text-slate-300 leading-relaxed m-0">
                  <b>Sub-Second Response Guarantee:</b> Seluruh arsitektur Next.js 15 dan layanan API di-deploy pada edge node terdekat untuk menjamin latensi merespon di bawah 1 detik di seluruh wilayah Indonesia.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-1" />
                <p className="text-sm text-slate-300 leading-relaxed m-0">
                  <b>Enterprise Data Isolation:</b> Data klien disimpan secara terenkripsi dengan kebijakan <i>zero-retention</i> pada pemrosesan AI model pihak ketiga, memastikan kerahasiaan mutlak.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-1" />
                <p className="text-sm text-slate-300 leading-relaxed m-0">
                  <b>Automated Failover &amp; Backup:</b> Sistem pangkalan data Firestore dan edge server dilengkapi redundansi otomatis untuk mencegah downtime akibat lonjakan trafik mendadak.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 size={18} className="text-emerald-400 shrink-0 mt-1" />
                <p className="text-sm text-slate-300 leading-relaxed m-0">
                  <b>Dedicated Support Principal:</b> Klien korporat mendapatkan jalur eskalasi darurat langsung kepada principal software architect tanpa melalui birokrasi support tier bawah.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
