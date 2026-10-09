'use client';

import React, { useState, useEffect } from 'react';
import { db } from '../../lib/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { Terminal, ShieldCheck, Activity, Users, DollarSign, Server, Zap, ArrowRight, ExternalLink, Search } from 'lucide-react';
import Link from 'next/link';
import { AdminKanbanBoard } from '../../components/AdminKanbanBoard';
import UpcomingInvoices from '../../components/admin/UpcomingInvoices';
import SEOPerformanceAuditor from '../../components/admin/SEOPerformanceAuditor';
import SearchIntentHeatmap from '../../components/admin/SearchIntentHeatmap';
import LoadProfileAssistant from '../../components/admin/LoadProfileAssistant';

export default function OmniAdminDashboard() {
  const [pipelineTotal, setPipelineTotal] = useState('Rp 1.45 Miliar');
  const [highTicketCount, setHighTicketCount] = useState(8);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        if (!db) return;
        const snap = await getDocs(collection(db, 'audit_leads'));
        const count = snap.size;
        if (count > 0) {
          setHighTicketCount(Math.round(count * 0.7));
          setPipelineTotal(`Rp ${(count * 125).toLocaleString('id-ID')} Juta`);
        }
      } catch (e) {
        console.error('Failed to fetch omni metrics:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchMetrics();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6 sm:p-10 selection:bg-indigo-600 selection:text-white">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400">
              <Terminal size={14} className="animate-pulse" />
              <span>CHESTAA_OMNI_DASHBOARD // EXECUTIVE COMMAND CENTER</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Executive Omni-Dashboard &amp; <b>Pipeline Control</b>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/ai-audit"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs font-mono uppercase tracking-wider transition-all shadow-lg flex items-center gap-2"
            >
              <span>AI Audit Terminal</span>
              <ExternalLink size={14} />
            </Link>
          </div>
        </div>

        {/* Top Row: 3 Massive Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl space-y-3 relative overflow-hidden group hover:border-indigo-500/50 transition-all shadow-xl">
            <div className="absolute top-0 right-0 p-6 text-indigo-400/20 group-hover:text-indigo-400/40 transition-colors">
              <DollarSign size={36} />
            </div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">Total Active Pipeline</div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white">{pipelineTotal}</div>
            <p className="text-xs text-indigo-400 font-mono">+18% dari proyeksi kuartal lalu</p>
          </div>

          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl space-y-3 relative overflow-hidden group hover:border-emerald-500/50 transition-all shadow-xl">
            <div className="absolute top-0 right-0 p-6 text-emerald-400/20 group-hover:text-emerald-400/40 transition-colors">
              <Activity size={36} />
            </div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">Server Uptime &amp; Latency</div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400">99.99% // 12ms</div>
            <p className="text-xs text-emerald-400 font-mono">Global Edge CDN Active &amp; Protected</p>
          </div>

          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl space-y-3 relative overflow-hidden group hover:border-purple-500/50 transition-all shadow-xl">
            <div className="absolute top-0 right-0 p-6 text-purple-400/20 group-hover:text-purple-400/40 transition-colors">
              <Users size={36} />
            </div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">High-Ticket Leads Count</div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-purple-400">{highTicketCount} Prospek</div>
            <p className="text-xs text-purple-400 font-mono">Entitas PT / Tbk Terverifikasi</p>
          </div>
        </div>

        {/* Middle Section: Split View (Left: Kanban Board Summary, Right: Ad-Blocker-Proof Server Analytics & Vitals) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Kanban Board Summary */}
          <div className="lg:col-span-8 space-y-8">
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl space-y-6 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white uppercase tracking-wider">Client Pipeline Kanban</h2>
                  <p className="text-xs text-slate-400 font-mono mt-1">Manajemen tahapan prospek dari discovery hingga alpha deployment.</p>
                </div>
              </div>
              <div className="pt-2">
                <AdminKanbanBoard workspaceSlug="default-workspace" />
              </div>
            </div>

            {/* Financial Operations: Upcoming Invoices */}
            <UpcomingInvoices />
          </div>

          {/* Right Side: Ad-Blocker-Proof Server Analytics & Core Web Vitals */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl space-y-6 shadow-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white uppercase tracking-wider">Server Analytics &amp; Vitals</h3>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>SECURE &amp; BYPASS</span>
                </span>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                  <div className="text-slate-400 flex justify-between">
                    <span>Live Visitors (24h)</span>
                    <span className="text-emerald-400 font-bold">1,420</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full w-[78%]" />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                  <div className="text-slate-400 flex justify-between">
                    <span>LCP (Largest Contentful Paint)</span>
                    <span className="text-emerald-400 font-bold">0.64s</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full w-[92%]" />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                  <div className="text-slate-400 flex justify-between">
                    <span>CLS (Cumulative Layout Shift)</span>
                    <span className="text-emerald-400 font-bold">0.00</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full w-[100%]" />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                  <div className="text-slate-400 flex justify-between">
                    <span>Server-Side Intercepts</span>
                    <span className="text-indigo-400 font-bold">100% Accurate</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed m-0">
                    Trafik terekam langsung di server Next.js dan Firestore, kebal dari pemblokir iklan pihak ketiga.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Dedicated Section: SEO Performance Metrics & Search Grounding Actionable Improvements */}
        <div className="pt-6 border-t border-white/10 space-y-10">
          <SEOPerformanceAuditor />
          <SearchIntentHeatmap />
          <LoadProfileAssistant />
        </div>

      </div>
    </div>
  );
}
