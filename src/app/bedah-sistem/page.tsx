import React from 'react';
import Link from 'next/link';
import { ARCHITECTURAL_TEARDOWNS } from '@/data/teardowns';
import { Terminal, ShieldAlert, Cpu, ArrowUpRight, Database } from 'lucide-react';

export const metadata = {
  title: 'Indeks Bedah Sistem & Forensik IT Korporat | chestaadotcom',
  description: 'Arsip investigasi kegagalan sistem enterprise berkapasitas tinggi, analisis post-mortem, dan arsitektur mitigasi otonom oleh chestaadotcom.',
};

export default function BedahSistemIndexPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-red-900 selection:text-white pb-24">
      {/* Top Bar / Terminal Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Terminal className="text-red-500" size={20} />
            <span className="font-mono text-sm tracking-wider uppercase text-slate-300 font-semibold">
              chestaadotcom // forensic-db.sys
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <span className="hidden sm:inline">STATUS: SECURE_NODE</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-red-500/10 border border-red-500/30 text-red-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              LIVE ARCHIVE
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="border-l-4 border-red-600 pl-6 mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-red-400 uppercase tracking-widest mb-2">
            <ShieldAlert size={14} />
            <span>High-Precision Incident Forensics</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display mb-4">
            BEDAH SISTEM KORPORAT & POST-MORTEM ARSITEKTUR
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-4xl leading-relaxed font-mono">
            Analisis forensik tanpa kompromi terhadap kegagalan infrastruktur monolitik, deadlocks database, latensi core banking, dan kegagalan migrasi skala besar yang merugikan korporasi. Direkayasa ulang oleh chestaadotcom.
          </p>
        </div>

        {/* High-Density Data Grid / Terminal Table View */}
        <div className="bg-slate-900/95 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
          <div className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center justify-between text-xs font-mono text-slate-400">
            <div className="flex items-center gap-6">
              <span className="text-slate-200 font-bold">TOTAL RECORD: {ARCHITECTURAL_TEARDOWNS.length} INCIDENTS</span>
              <span className="hidden md:inline">PROTOCOL: STRICT_ISOLATION</span>
            </div>
            <span className="text-red-400">AUDIT_LEVEL: MAXIMUM</span>
          </div>

          <div className="divide-y divide-slate-800/80">
            {ARCHITECTURAL_TEARDOWNS.map((item, index) => (
              <article 
                key={item.slug} 
                className="p-6 sm:p-8 hover:bg-slate-900/50 transition-colors grid grid-cols-1 lg:grid-cols-12 gap-6 items-start group"
              >
                <div className="lg:col-span-1 font-mono text-xs text-slate-500 pt-1">
                  #{String(index + 1).padStart(2, '0')}
                </div>

                <div className="lg:col-span-8 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-mono uppercase bg-slate-800 text-slate-300 border border-slate-700">
                      {item.industry}
                    </span>
                    <span className="text-[11px] font-mono text-red-400 flex items-center gap-1 font-semibold">
                      <Cpu size={12} />
                      CRITICAL FAILURE IDENTIFIED
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      SLUG: {item.slug}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-red-400 transition-colors tracking-tight">
                    {item.incidentTitle}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-sm font-mono">
                    <div className="p-4 rounded-lg bg-red-950/20 border border-red-900/30 text-slate-300">
                      <span className="block text-red-400 font-bold text-xs uppercase mb-1 flex items-center gap-1.5">
                        <ShieldAlert size={13} />
                        Technical Failure:
                      </span>
                      <p className="text-slate-300 text-xs leading-relaxed">
                        {item.technicalFailure}
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-900/30 text-slate-300">
                      <span className="block text-emerald-400 font-bold text-xs uppercase mb-1 flex items-center gap-1.5">
                        <Database size={13} />
                        chestaadotcom Solution:
                      </span>
                      <p className="text-slate-300 text-xs leading-relaxed">
                        {item.chestaaSolution}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-3 flex lg:flex-col items-end justify-between lg:justify-center h-full pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-800">
                  <div className="text-right hidden lg:block mb-4 font-mono text-xs text-slate-500">
                    STATUS: RESOLVED
                  </div>
                  <Link
                    href={`/teardowns/${item.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-red-600 text-white font-mono text-xs font-semibold tracking-wider transition-all shadow-lg hover:scale-105 active:scale-95 group/btn"
                  >
                    <span>VIEW FORENSIC REPORT</span>
                    <ArrowUpRight size={14} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Footer info box */}
        <div className="mt-12 p-8 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-lg font-bold text-white font-display">
              Butuh Audit Forensik Sistem Korporasi Anda?
            </h3>
            <p className="text-slate-400 text-sm font-mono max-w-2xl">
              Tim Fractional CTO dan Senior Reliability Engineer chestaadotcom siap membedah bottleneck database, query deadlock, dan kerentanan infrastruktur cloud Anda.
            </p>
          </div>
          <Link
            href="/services"
            className="px-6 py-3.5 rounded-xl bg-white text-slate-950 font-semibold font-mono text-xs uppercase tracking-wider hover:bg-slate-200 transition-all shadow-xl hover:scale-105"
          >
            Jadwalkan Audit Arsitektur
          </Link>
        </div>
      </div>
    </main>
  );
}
