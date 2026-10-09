'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Sparkles, 
  TrendingUp, 
  ExternalLink, 
  RefreshCw, 
  Zap, 
  ShieldCheck, 
  Globe, 
  Activity, 
  Sliders, 
  CheckCircle2, 
  ArrowUpRight, 
  AlertCircle,
  Smartphone,
  Monitor,
  Eye,
  Clock,
  Layers
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import toast from 'react-hot-toast';

export interface SeoPerformanceMetrics {
  landingUrl: string;
  landingTitle: string;
  landingDescription: string;
  overallScore: number;
  searchImpressions: number;
  searchClicks: number;
  averageCtr: number;
  averagePosition: number;
  indexedStatus: string;
  coreWebVitals: {
    lcp: string;
    lcpStatus: 'good' | 'needs-improvement' | 'poor';
    cls: string;
    clsStatus: 'good' | 'needs-improvement' | 'poor';
    fcp: string;
    fcpStatus: 'good' | 'needs-improvement' | 'poor';
    inp: string;
    inpStatus: 'good' | 'needs-improvement' | 'poor';
  };
  deviceDistribution: {
    mobile: number;
    desktop: number;
  };
  topQueries: Array<{
    query: string;
    position: number;
    clicks: number;
    impressions: number;
    ctr: string;
  }>;
  crawlTimestamp: string;
}

interface GroundingSource {
  title: string;
  url: string;
}

export default function SEOPerformanceAuditor() {
  const [metrics, setMetrics] = useState<SeoPerformanceMetrics | null>(null);
  const [loadingMetrics, setLoadingMetrics] = useState<boolean>(true);
  const [focusKeyword, setFocusKeyword] = useState<string>('jasa web bsd cisauk otomatisasi ai erp indonesia');
  
  // Actionable improvements state
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [actionableInsights, setActionableInsights] = useState<string>('');
  const [groundingSources, setGroundingSources] = useState<GroundingSource[]>([]);
  const [analyzedTimestamp, setAnalyzedTimestamp] = useState<string>('');

  // Fetch current performance metrics
  const fetchMetrics = async () => {
    setLoadingMetrics(true);
    try {
      const res = await fetch('/api/admin/seo-performance');
      const data = await res.json();
      if (data.success && data.metrics) {
        setMetrics(data.metrics);
      } else {
        toast.error(data.error || 'Gagal memuat metrik SEO.');
      }
    } catch (err) {
      console.error('Failed to load SEO metrics:', err);
      toast.error('Koneksi API analitik terputus.');
    } finally {
      setLoadingMetrics(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  // Run AI Actionable Improvements with Google Search Grounding (gemini-3.5-flash)
  const handleGenerateImprovements = async () => {
    if (!metrics) return;
    setAnalyzing(true);
    toast.loading('Menghubungkan ke Google Search data via Gemini 3.5 Flash...', { id: 'seo-audit-toast' });

    try {
      const res = await fetch('/api/admin/seo-actionable-improvements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          metrics,
          focusKeyword,
          landingUrl: '/'
        })
      });

      const data = await res.json();
      if (data.success && data.analysis) {
        setActionableInsights(data.analysis);
        setGroundingSources(data.sources || []);
        setAnalyzedTimestamp(data.analyzedAt || new Date().toISOString());
        toast.success('Rekomendasi perbaikan SEO berhasil disusun!', { id: 'seo-audit-toast' });
      } else {
        toast.error(data.error || 'Gagal menganalisis SEO.', { id: 'seo-audit-toast' });
      }
    } catch (err) {
      console.error('Audit failed:', err);
      toast.error('Gagal menghubungi engine audit AI.', { id: 'seo-audit-toast' });
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="w-full space-y-8 font-sans">
      
      {/* Top Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-1 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[11px] font-mono font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <Search size={12} className="text-purple-400" />
                <span>Live Analytics API &bull; Google Search Grounding</span>
              </span>
              <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Active Connection</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Landing Page SEO Performance &amp; <b>Actionable Radar</b>
            </h2>

            <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
              Memantau metrik performa penelusuran beranda secara real-time dari API analitik, lalu menghasilkan rekomendasi tindakan perbaikan konversi &amp; ranking menggunakan Google Search Grounding.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={fetchMetrics}
              disabled={loadingMetrics}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 font-mono text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw size={14} className={loadingMetrics ? 'animate-spin' : ''} />
              <span>Refresh Metrik</span>
            </button>

            <button
              onClick={handleGenerateImprovements}
              disabled={analyzing || loadingMetrics || !metrics}
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-bold transition-all shadow-lg shadow-purple-600/30 flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {analyzing ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  <span>Menganalisis Search Data...</span>
                </>
              ) : (
                <>
                  <Sparkles size={14} />
                  <span>Audit Perbaikan (Search Grounding)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Real-time Analytics Metric Counters */}
      {loadingMetrics && !metrics ? (
        <div className="p-12 rounded-2xl bg-white border border-slate-200 text-center">
          <RefreshCw size={24} className="animate-spin mx-auto text-purple-600 mb-3" />
          <p className="text-sm text-slate-600 font-mono">Memuat telemetri SEO &amp; analytics terkini...</p>
        </div>
      ) : metrics ? (
        <div className="space-y-6">
          
          {/* Key Metric Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* 1. Health Score */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-slate-500 uppercase tracking-wider font-semibold">Skor SEO Beranda</span>
                <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                  <ShieldCheck size={16} />
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900 font-mono">{metrics.overallScore}</span>
                <span className="text-xs font-mono text-slate-400">/ 100</span>
              </div>
              <p className="text-[11px] text-emerald-600 font-mono mt-2 font-medium flex items-center gap-1">
                <span>&bull; Siap bersaing di SERP Google</span>
              </p>
            </div>

            {/* 2. Total Impressions */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-slate-500 uppercase tracking-wider font-semibold">Tayangan SERP (30 Hari)</span>
                <span className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
                  <Eye size={16} />
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-purple-700 font-mono">
                  {metrics.searchImpressions.toLocaleString('id-ID')}
                </span>
                <span className="text-xs font-mono text-slate-400">tayangan</span>
              </div>
              <p className="text-[11px] text-purple-700 font-mono mt-2 font-medium">
                {metrics.searchClicks.toLocaleString('id-ID')} klik organik terekam
              </p>
            </div>

            {/* 3. Average CTR */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-slate-500 uppercase tracking-wider font-semibold">Rata-Rata CTR</span>
                <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                  <TrendingUp size={16} />
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-indigo-600 font-mono">
                  {metrics.averageCtr}%
                </span>
                <span className="text-xs font-mono text-slate-400">click-through</span>
              </div>
              <p className="text-[11px] text-indigo-600 font-mono mt-2 font-medium">
                Posisi rata-rata: #{metrics.averagePosition}
              </p>
            </div>

            {/* 4. Core Web Vitals Status */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-slate-500 uppercase tracking-wider font-semibold">Core Web Vitals</span>
                <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600">
                  <Activity size={16} />
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-teal-700 font-mono">
                  LCP {metrics.coreWebVitals.lcp}
                </span>
              </div>
              <p className="text-[11px] text-teal-700 font-mono mt-2 font-medium">
                CLS: {metrics.coreWebVitals.cls} &bull; INP: {metrics.coreWebVitals.inp}
              </p>
            </div>

          </div>

          {/* Deep Dive Grid: Landing Page Context & Top Queries */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left 7 Cols: Landing Page Target & Core Vitals Breakdown */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Landing Page Meta Card */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Globe size={16} className="text-purple-600" />
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
                      Target Landing Page: {metrics.landingUrl}
                    </h3>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {metrics.indexedStatus}
                  </span>
                </div>

                <div className="space-y-3 font-sans">
                  <div>
                    <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1">
                      Current Title Tag:
                    </label>
                    <p className="text-sm font-semibold text-slate-900 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      {metrics.landingTitle}
                    </p>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-1">
                      Current Meta Description:
                    </label>
                    <p className="text-xs sm:text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                      {metrics.landingDescription}
                    </p>
                  </div>
                </div>

                {/* Focus Keyword Tuning */}
                <div className="pt-2 border-t border-slate-100">
                  <label className="text-xs font-mono font-semibold text-slate-700 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                    <Sliders size={13} className="text-purple-600" />
                    <span>Keyword Fokus untuk Audit Rekomendasi:</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={focusKeyword}
                      onChange={(e) => setFocusKeyword(e.target.value)}
                      placeholder="Masukkan kata kunci fokus (misal: jasa website bsd, otomasi ai)"
                      className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-purple-600 font-mono"
                    />
                    <button
                      onClick={handleGenerateImprovements}
                      disabled={analyzing}
                      className="px-4 py-2.5 bg-slate-900 hover:bg-purple-950 text-white rounded-xl text-xs font-mono font-semibold cursor-pointer shrink-0 transition-colors"
                    >
                      Audit
                    </button>
                  </div>
                </div>
              </div>

              {/* Device & Vitals Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-wider font-semibold block">
                    Distribusi Perangkat Pengguna
                  </span>
                  <div className="flex items-center justify-between text-xs font-mono pt-1">
                    <div className="flex items-center gap-2">
                      <Smartphone size={16} className="text-purple-600" />
                      <span>Mobile: {metrics.deviceDistribution.mobile}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Monitor size={16} className="text-indigo-600" />
                      <span>Desktop: {metrics.deviceDistribution.desktop}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden flex">
                    <div style={{ width: `${metrics.deviceDistribution.mobile}%` }} className="bg-purple-600 h-full" />
                    <div style={{ width: `${metrics.deviceDistribution.desktop}%` }} className="bg-indigo-500 h-full" />
                  </div>
                  <span className="text-[11px] text-slate-500 block font-mono">
                    Mobile-First Indexing diutamakan oleh Googlebot.
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-wider font-semibold block">
                    Core Web Vitals Pass Check
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-800">
                      <div className="text-[10px] text-emerald-600 uppercase">LCP</div>
                      <div className="font-bold">{metrics.coreWebVitals.lcp} (Fast)</div>
                    </div>
                    <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-800">
                      <div className="text-[10px] text-emerald-600 uppercase">CLS</div>
                      <div className="font-bold">{metrics.coreWebVitals.cls} (Zero)</div>
                    </div>
                    <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-800">
                      <div className="text-[10px] text-emerald-600 uppercase">INP</div>
                      <div className="font-bold">{metrics.coreWebVitals.inp} (Instant)</div>
                    </div>
                    <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-800">
                      <div className="text-[10px] text-emerald-600 uppercase">FCP</div>
                      <div className="font-bold">{metrics.coreWebVitals.fcp} (Sub-Sec)</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right 5 Cols: Top Search Queries Table */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp size={14} className="text-purple-600" />
                  <span>Kueri Teratas di Google SERP</span>
                </h3>
                <span className="text-[11px] font-mono text-slate-400">Peringkat Riil</span>
              </div>

              <div className="space-y-2.5">
                {metrics.topQueries.map((q, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-900 font-mono truncate max-w-[200px]">
                        {q.query}
                      </span>
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-purple-100 text-purple-800">
                        Pos #{q.position}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                      <span>{q.clicks} klik &bull; {q.impressions} tayangan</span>
                      <span className="text-emerald-600 font-medium">CTR: {q.ctr}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-purple-50/60 border border-purple-100 text-[11px] text-purple-900 font-mono leading-relaxed">
                Kueri lokal &bull; BSD &bull; Tangerang &bull; Otomasi AI menunjukkan tren konversi B2B tertinggi.
              </div>
            </div>

          </div>

          {/* Actionable Improvements Section (Result from Google Search Grounding) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-purple-700 font-bold uppercase tracking-wider mb-1">
                  <Sparkles size={14} />
                  <span>Rekomendasi Tindakan Perbaikan (Actionable Improvements)</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-extrabold text-slate-950 tracking-tight">
                  Audit Cerdas Berbasis Data Penelusuran Google
                </h3>
              </div>

              {analyzedTimestamp && (
                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                  <Clock size={13} />
                  <span>Dianalisis: {new Date(analyzedTimestamp).toLocaleTimeString('id-ID')}</span>
                </div>
              )}
            </div>

            {/* If not analyzed yet, show prompt button */}
            {!actionableInsights && !analyzing && (
              <div className="p-8 text-center rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <Sparkles size={32} className="mx-auto text-purple-500" />
                <h4 className="text-base font-semibold text-slate-900">
                  Belum ada laporan rekomendasi aktif
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
                  Klik tombol di bawah untuk meminta model Gemini 3.5 Flash mengekstrak data pencarian Google terkini dan merumuskan langkah perbaikan meta, konten, dan arsitektur landing page.
                </p>
                <button
                  onClick={handleGenerateImprovements}
                  className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-600 text-white font-mono text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  <Sparkles size={14} />
                  <span>Jalankan Audit dengan Google Search</span>
                </button>
              </div>
            )}

            {/* Loading indicator */}
            {analyzing && (
              <div className="p-12 text-center rounded-2xl bg-purple-50/50 border border-purple-100 space-y-3">
                <RefreshCw size={28} className="animate-spin mx-auto text-purple-600" />
                <h4 className="text-sm font-bold text-slate-900 font-mono">
                  Menghubungkan ke Google Search Engine via Gemini 3.5 Flash...
                </h4>
                <p className="text-xs text-slate-600 font-mono">
                  Menganalisis kueri penelusuran Indonesia 2026, Core Web Vitals, dan intent komersial landing page...
                </p>
              </div>
            )}

            {/* Rendered Actionable Insights Markdown */}
            {actionableInsights && !analyzing && (
              <div className="space-y-6">
                
                {/* Markdown Container */}
                <div className="prose prose-slate max-w-none prose-headings:font-display prose-headings:font-bold prose-h3:text-lg prose-h3:text-slate-950 prose-p:text-slate-700 prose-p:text-sm prose-p:leading-relaxed prose-li:text-sm prose-li:text-slate-700 prose-code:font-mono prose-code:text-purple-700 bg-slate-50/70 p-6 sm:p-8 rounded-2xl border border-slate-200">
                  <ReactMarkdown>{actionableInsights}</ReactMarkdown>
                </div>

                {/* Grounding Source Citations from Google Search */}
                {groundingSources.length > 0 && (
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
                    <span className="text-xs font-mono font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                      <Globe size={14} className="text-purple-600" />
                      <span>Rujukan Data Penelusuran Google (Grounding Sources):</span>
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {groundingSources.map((source, idx) => (
                        <a
                          key={idx}
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-purple-50 text-slate-700 hover:text-purple-700 text-xs font-mono border border-slate-200 transition-colors"
                        >
                          <span className="truncate max-w-[240px]">{source.title}</span>
                          <ExternalLink size={11} className="shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}

          </div>

        </div>
      ) : null}

    </div>
  );
}
