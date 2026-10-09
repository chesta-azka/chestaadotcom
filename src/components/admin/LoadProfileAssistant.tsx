'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  Sparkles, 
  RefreshCw, 
  Zap, 
  Server, 
  Layers, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Image as ImageIcon,
  ExternalLink,
  Sliders,
  Shield,
  FileCode,
  Gauge
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import toast from 'react-hot-toast';

interface AssetScanItem {
  assetPath: string;
  type: string;
  sizeKb: number | string;
  priority: string;
  status: string;
  recommendation: string;
}

interface HeavyDependency {
  name: string;
  impact: string;
  suggestion: string;
}

interface RuntimeProfile {
  runtime: string;
  nodeVersion: string;
  platform: string;
  arch: string;
  uptimeFormatted: string;
  memory: {
    rssMb: number;
    heapUsedMb: number;
    heapTotalMb: number;
  };
  coldStartLatencyEstimate: string;
  targetColdStartLatency: string;
  edgeMiddlewareStatus: string;
  serverlessFunctionCount: number;
  heavyDependencies: HeavyDependency[];
  assetScan: AssetScanItem[];
}

export default function LoadProfileAssistant() {
  const [profile, setProfile] = useState<RuntimeProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState<boolean>(true);
  
  // AI analysis state
  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [aiSuggestions, setAiSuggestions] = useState<string>('');
  const [groundingSources, setGroundingSources] = useState<Array<{ title: string; url: string }>>([]);
  const [analysisTimestamp, setAnalysisTimestamp] = useState<string>('');

  const fetchProfile = async () => {
    setLoadingProfile(true);
    try {
      const res = await fetch('/api/admin/load-profile-metrics');
      const json = await res.json();
      if (json.success && json.profile) {
        setProfile(json.profile);
      } else {
        toast.error(json.error || 'Gagal memuat profil runtime.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Koneksi API runtime terputus.');
    } finally {
      setLoadingProfile(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleRunAiAudit = async () => {
    if (!profile) return;
    setAnalyzing(true);
    toast.loading('Menghubungkan ke Gemini 3.5 Flash dengan Google Search Grounding...', { id: 'load-audit-toast' });

    try {
      const res = await fetch('/api/admin/load-profile-ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile })
      });

      const json = await res.json();
      if (json.success && json.analysis) {
        setAiSuggestions(json.analysis);
        setGroundingSources(json.sources || []);
        setAnalysisTimestamp(json.timestamp || new Date().toISOString());
        toast.success('Audit Cold Start & LCP Preload selesai!', { id: 'load-audit-toast' });
      } else {
        toast.error(json.error || 'Gagal mengaudit profil runtime.', { id: 'load-audit-toast' });
      }
    } catch (err) {
      console.error(err);
      toast.error('Gagal menghubungi engine audit AI.', { id: 'load-audit-toast' });
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="w-full space-y-6 font-sans">
      
      {/* Top Banner Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-1 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[11px] font-mono font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <Gauge size={13} className="text-cyan-400" />
                <span>Next.js 15 Runtime Profiler &bull; Cold Start Optimizer</span>
              </span>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live Environment Telemetry</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Load Profile AI Assistant &amp; <b>LCP Asset Optimizer</b>
            </h2>

            <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
              Menganalisis lingkungan runtime Next.js, memory footprint, cold start serverless, dan referensi aset statis/next:image untuk menyusun rekomendasi Edge Middleware tweaks &amp; preloading LCP instan.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={fetchProfile}
              disabled={loadingProfile}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 font-mono text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw size={14} className={loadingProfile ? 'animate-spin' : ''} />
              <span>Refresh Profil</span>
            </button>

            <button
              onClick={handleRunAiAudit}
              disabled={analyzing || loadingProfile || !profile}
              className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold transition-all shadow-lg shadow-cyan-600/30 flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {analyzing ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  <span>Menganalisis Runtime &amp; SERP...</span>
                </>
              ) : (
                <>
                  <Sparkles size={14} />
                  <span>Audit AI Edge &amp; LCP Preload</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {loadingProfile && !profile ? (
        <div className="p-12 text-center text-slate-500 font-mono text-xs bg-white rounded-3xl border border-slate-200">
          <RefreshCw size={22} className="animate-spin mx-auto mb-2 text-cyan-600" />
          Memindai profil runtime Next.js dan memori server...
        </div>
      ) : profile ? (
        <div className="space-y-6 text-left">
          
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                Estimasi Cold Start
              </span>
              <div className="text-2xl font-mono font-extrabold text-slate-900">
                {profile.coldStartLatencyEstimate}
              </div>
              <p className="text-[11px] font-mono text-cyan-700">
                Target Pruning: {profile.targetColdStartLatency}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                Memory Footprint (Heap)
              </span>
              <div className="text-2xl font-mono font-extrabold text-purple-700">
                {profile.memory.heapUsedMb} MB
              </div>
              <p className="text-[11px] font-mono text-slate-500">
                Total Heap: {profile.memory.heapTotalMb} MB (RSS: {profile.memory.rssMb} MB)
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                Runtime &amp; Platform
              </span>
              <div className="text-base font-mono font-bold text-slate-900 truncate">
                {profile.nodeVersion} ({profile.platform})
              </div>
              <p className="text-[11px] font-mono text-emerald-600 font-medium">
                Uptime: {profile.uptimeFormatted}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                Serverless Endpoints
              </span>
              <div className="text-2xl font-mono font-extrabold text-slate-900">
                {profile.serverlessFunctionCount} Routes
              </div>
              <p className="text-[11px] font-mono text-slate-500">
                {profile.edgeMiddlewareStatus}
              </p>
            </div>

          </div>

          {/* Heavy Dependencies Pruning Table & LCP Asset Scan */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left 6: Heavy Dependencies Pruning Suggestions */}
            <div className="lg:col-span-6 p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Server size={14} className="text-cyan-600" />
                  <span>Analisis Dependensi Berat (Cold Start Culprits)</span>
                </h3>
                <span className="text-[11px] font-mono text-slate-400">Serverless Pruning</span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {profile.heavyDependencies.map((dep, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{dep.name}</span>
                      <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {dep.impact}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-sans leading-relaxed">
                      💡 {dep.suggestion}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 6: LCP Asset Scan & Pre-loading Status */}
            <div className="lg:col-span-6 p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <ImageIcon size={14} className="text-purple-600" />
                  <span>Pemindaian Aset LCP &amp; Pre-Loading Strategy</span>
                </h3>
                <span className="text-[11px] font-mono text-slate-400">&lt;link rel="preload"&gt;</span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {profile.assetScan.map((asset, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 truncate max-w-[200px]" title={asset.assetPath}>
                        {asset.assetPath}
                      </span>
                      <span className="text-[10px] text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200 font-bold">
                        {asset.priority}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>Status: {asset.status}</span>
                      <span>{typeof asset.sizeKb === 'number' ? `${asset.sizeKb} KB` : asset.sizeKb}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-sans leading-relaxed pt-0.5">
                      ➡️ {asset.recommendation}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* AI-Generated Architecture Recommendations Output */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-md space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-700 font-bold uppercase tracking-wider mb-1">
                  <Sparkles size={14} />
                  <span>Rekomendasi Arsitektur Edge Middleware &amp; LCP Preload</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-extrabold text-slate-950 tracking-tight">
                  Analisis Cerdas: Minimalkan Cold Start &amp; LCP Sub-Detik
                </h3>
              </div>

              {analysisTimestamp && (
                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                  <Clock size={13} />
                  <span>Dianalisis: {new Date(analysisTimestamp).toLocaleTimeString('id-ID')}</span>
                </div>
              )}
            </div>

            {!aiSuggestions && !analyzing && (
              <div className="p-8 text-center rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <Sparkles size={32} className="mx-auto text-cyan-600" />
                <h4 className="text-base font-semibold text-slate-900">
                  Belum ada analisis load profile aktif
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
                  Klik tombol di bawah untuk meminta Gemini 3.5 Flash mengevaluasi runtime Next.js, dependensi serverless, dan LCP aset preloading menggunakan Google Search Grounding.
                </p>
                <button
                  onClick={handleRunAiAudit}
                  className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-700 hover:bg-cyan-600 text-white font-mono text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  <Sparkles size={14} />
                  <span>Jalankan Load Profile AI Assistant</span>
                </button>
              </div>
            )}

            {analyzing && (
              <div className="p-12 text-center rounded-2xl bg-cyan-50/50 border border-cyan-100 space-y-3">
                <RefreshCw size={28} className="animate-spin mx-auto text-cyan-600" />
                <h4 className="text-sm font-bold text-slate-900 font-mono">
                  Menghubungkan ke Gemini 3.5 Flash + Google Search Grounding...
                </h4>
                <p className="text-xs text-slate-600 font-mono">
                  Mengekstrak praktik terbaik Next.js 15 App Router Edge Middleware, lazy-imports, dan strategi preload LCP 2026...
                </p>
              </div>
            )}

            {aiSuggestions && !analyzing && (
              <div className="space-y-6">
                <div className="prose prose-slate max-w-none prose-headings:font-display prose-headings:font-bold prose-h3:text-lg prose-h3:text-slate-950 prose-p:text-slate-700 prose-p:text-sm prose-p:leading-relaxed prose-li:text-sm bg-slate-50/70 p-6 sm:p-8 rounded-2xl border border-slate-200">
                  <ReactMarkdown>{aiSuggestions}</ReactMarkdown>
                </div>

                {groundingSources.length > 0 && (
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
                    <span className="text-xs font-mono font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                      <ExternalLink size={14} className="text-cyan-600" />
                      <span>Rujukan Data Penelusuran Google (Grounding Sources):</span>
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {groundingSources.map((source, idx) => (
                        <a
                          key={idx}
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-cyan-50 text-slate-700 hover:text-cyan-800 text-xs font-mono border border-slate-200 transition-colors"
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
