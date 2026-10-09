'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Flame, 
  Sparkles, 
  RefreshCw, 
  Search, 
  ArrowUpRight, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  ExternalLink,
  Layers,
  Sliders,
  Filter,
  BarChart2,
  X
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import toast from 'react-hot-toast';

export interface HeatmapItem {
  keyword: string;
  intentCategory: string;
  searchVolume: number;
  actualVisits: number;
  expectedConversionRate: number;
  actualConversionRate: number;
  averagePosition: number;
  matchScore: number;
  heatStatus: 'high-performing' | 'medium-performing' | 'low-performing';
  pageSlug: string;
  pageTitle: string;
}

export default function SearchIntentHeatmap() {
  const [data, setData] = useState<HeatmapItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterIntent, setFilterIntent] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // AI Optimization modal / drawer state
  const [selectedTarget, setSelectedTarget] = useState<HeatmapItem | null>(null);
  const [optimizing, setOptimizing] = useState<boolean>(false);
  const [aiSuggestion, setAiSuggestion] = useState<string>('');
  const [aiSources, setAiSources] = useState<Array<{ title: string; url: string }>>([]);

  const fetchHeatmap = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/search-intent-heatmap');
      const json = await res.json();
      if (json.success && json.matrix) {
        setData(json.matrix);
      } else {
        toast.error(json.error || 'Gagal memuat matriks heatmap.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Koneksi heatmap terputus.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeatmap();
  }, []);

  const handleTriggerOptimization = async (item: HeatmapItem) => {
    setSelectedTarget(item);
    setOptimizing(true);
    setAiSuggestion('');
    setAiSources([]);
    toast.loading(`Menganalisis optimasi untuk kata kunci: "${item.keyword}"...`, { id: 'opt-toast' });

    try {
      const res = await fetch('/api/admin/optimize-low-performing-page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          keyword: item.keyword,
          pageSlug: item.pageSlug,
          intentCategory: item.intentCategory,
          averagePosition: item.averagePosition,
          actualConversionRate: item.actualConversionRate,
          targetConversionRate: item.expectedConversionRate
        })
      });

      const json = await res.json();
      if (json.success && json.suggestion) {
        setAiSuggestion(json.suggestion);
        setAiSources(json.sources || []);
        toast.success('Rekomendasi optimasi konten berhasil dibuat!', { id: 'opt-toast' });
      } else {
        toast.error(json.error || 'Gagal menghasilkan rekomendasi optimasi.', { id: 'opt-toast' });
      }
    } catch (err) {
      console.error(err);
      toast.error('Gagal menghubungi engine AI optimasi.', { id: 'opt-toast' });
    } finally {
      setOptimizing(false);
    }
  };

  const filteredData = data.filter(item => {
    if (filterIntent !== 'all' && !item.intentCategory.toLowerCase().includes(filterIntent.toLowerCase())) {
      return false;
    }
    if (filterStatus !== 'all' && item.heatStatus !== filterStatus) {
      return false;
    }
    return true;
  });

  const lowPerformingItems = data.filter(item => item.heatStatus === 'low-performing');

  return (
    <div className="w-full space-y-6 font-sans">
      
      {/* Header Container */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-mono font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <Flame size={13} className="text-amber-400" />
                <span>Search Intent Heatmap &bull; Organic Traffic Cross-Check</span>
              </span>
              <span className="text-xs font-mono text-slate-400">
                {data.length} Kata Kunci Terpetakan
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Dynamic Search Intent Heatmap &amp; <b>AI Content Optimizer</b>
            </h2>

            <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
              Membandingkan niat pencarian kata kunci target (Search Intent) dengan performa trafik organik aktual. Deteksi halaman di bawah performa dan generate rekomendasi konten AI instan dengan Google Search Grounding.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={fetchHeatmap}
              disabled={loading}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 font-mono text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              <span>Refresh Heatmap</span>
            </button>

            {lowPerformingItems.length > 0 && (
              <button
                onClick={() => handleTriggerOptimization(lowPerformingItems[0])}
                disabled={optimizing}
                className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-mono text-xs font-bold transition-all shadow-lg shadow-amber-600/30 flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Sparkles size={14} />
                <span>Optimasi Halaman Tertinggal (#{lowPerformingItems[0].keyword})</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls */}
        <div className="mt-6 pt-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-slate-400 mr-2 flex items-center gap-1">
              <Filter size={12} /> Filter Intent:
            </span>
            {['all', 'Transactional', 'Commercial', 'Informational'].map(cat => (
              <button
                key={cat}
                onClick={() => setFilterIntent(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
                  filterIntent === cat 
                    ? 'bg-amber-500 text-slate-950 font-bold' 
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {cat === 'all' ? 'Semua Intent' : cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400 mr-2">Status Panas:</span>
            {[
              { id: 'all', label: 'Semua' },
              { id: 'high-performing', label: '🔥 Tinggi' },
              { id: 'medium-performing', label: '⚡ Sedang' },
              { id: 'low-performing', label: '❄️ Rendah' },
            ].map(st => (
              <button
                key={st.id}
                onClick={() => setFilterStatus(st.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                  filterStatus === st.id 
                    ? 'bg-white text-slate-950 font-bold' 
                    : 'bg-slate-800/60 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic Heatmap Grid Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
            <BarChart2 size={15} className="text-amber-600" />
            <span>Matriks Heatmap: Kata Kunci Intent vs Trafik Aktual</span>
          </div>
          <span className="text-xs font-mono text-slate-500">
            Menampilkan {filteredData.length} kueri tertarget
          </span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-500 font-mono text-xs">
            <RefreshCw size={20} className="animate-spin mx-auto mb-2 text-amber-600" />
            Memetakan skor intensitas penelusuran...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-mono uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4">Kata Kunci Target</th>
                  <th className="py-3 px-4">Kategori Intent</th>
                  <th className="py-3 px-4 text-right">Volume SERP</th>
                  <th className="py-3 px-4 text-right">Trafik Aktual</th>
                  <th className="py-3 px-4 text-right">Konversi (Aktual vs Target)</th>
                  <th className="py-3 px-4 text-center">Posisi SERP</th>
                  <th className="py-3 px-4 text-center">Heat Score</th>
                  <th className="py-3 px-4 text-right">Tindakan AI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {filteredData.map((item, idx) => {
                  const isLow = item.heatStatus === 'low-performing';
                  const isHigh = item.heatStatus === 'high-performing';

                  // Heatmap color shading
                  const rowBg = isHigh 
                    ? 'hover:bg-emerald-50/50' 
                    : isLow 
                      ? 'bg-rose-50/30 hover:bg-rose-50/70' 
                      : 'hover:bg-slate-50';

                  const badgeBg = isHigh 
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-200' 
                    : isLow 
                      ? 'bg-rose-100 text-rose-800 border-rose-200' 
                      : 'bg-amber-100 text-amber-800 border-amber-200';

                  return (
                    <tr key={idx} className={`${rowBg} transition-colors`}>
                      <td className="py-3.5 px-4 font-semibold text-slate-900 font-sans">
                        <div className="flex flex-col">
                          <span>{item.keyword}</span>
                          <span className="text-[10px] text-slate-400 font-mono">/services/{item.pageSlug}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px]">
                          {item.intentCategory}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-slate-700">
                        {item.searchVolume.toLocaleString('id-ID')}
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-purple-700">
                        {item.actualVisits.toLocaleString('id-ID')}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <span className={item.actualConversionRate >= item.expectedConversionRate ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>
                          {item.actualConversionRate}%
                        </span>
                        <span className="text-slate-400 text-[10px] ml-1">/ {item.expectedConversionRate}%</span>
                      </td>
                      <td className="py-3.5 px-4 text-center font-bold">
                        #{item.averagePosition}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${badgeBg}`}>
                          {item.matchScore}% {isHigh ? '🔥' : isLow ? '❄️ Under' : '⚡ Good'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => handleTriggerOptimization(item)}
                          disabled={optimizing}
                          className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 ml-auto cursor-pointer ${
                            isLow 
                              ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs animate-pulse' 
                              : 'bg-slate-900 hover:bg-purple-900 text-white'
                          }`}
                        >
                          <Sparkles size={11} />
                          <span>{isLow ? 'Optimasi AI' : 'Audit AI'}</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* AI Content Optimization Output Drawer / Modal */}
      <AnimatePresence>
        {selectedTarget && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTarget(null)}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col border border-slate-200 overflow-hidden z-10"
            >
              {/* Modal Header */}
              <div className="p-6 bg-slate-900 text-white border-b border-slate-800 flex items-center justify-between">
                <div className="space-y-1 text-left">
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                    <Sparkles size={14} />
                    <span>AI Content Optimization &bull; Gemini 3.5 Flash + Google Search Grounding</span>
                  </div>
                  <h3 className="text-xl font-display font-extrabold text-white">
                    Optimasi Halaman: <span className="text-amber-300">"{selectedTarget.keyword}"</span>
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Target: /services/{selectedTarget.pageSlug} &bull; Posisi: #{selectedTarget.averagePosition} &bull; Konversi Aktual: {selectedTarget.actualConversionRate}%
                  </p>
                </div>

                <button
                  onClick={() => setSelectedTarget(null)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-left">
                {optimizing ? (
                  <div className="p-12 text-center space-y-3">
                    <RefreshCw size={30} className="animate-spin mx-auto text-amber-600" />
                    <h4 className="text-sm font-bold text-slate-900 font-mono">
                      Menganalisis Niat Pencarian dengan Google Search Data...
                    </h4>
                    <p className="text-xs text-slate-500 font-mono">
                      Menghubungkan ke web crawler untuk merumuskan perbaikan H1, H2, FAQ, dan Schema CTA...
                    </p>
                  </div>
                ) : aiSuggestion ? (
                  <div className="space-y-6">
                    <div className="prose prose-slate max-w-none prose-headings:font-display prose-headings:font-bold prose-h3:text-lg prose-h3:text-slate-950 prose-p:text-slate-700 prose-p:text-sm prose-p:leading-relaxed prose-li:text-sm bg-slate-50/70 p-6 sm:p-8 rounded-2xl border border-slate-200">
                      <ReactMarkdown>{aiSuggestion}</ReactMarkdown>
                    </div>

                    {/* Grounding Source Citations */}
                    {aiSources.length > 0 && (
                      <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
                        <span className="text-xs font-mono font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                          <ExternalLink size={14} className="text-purple-600" />
                          <span>Rujukan SERP Terkini (Google Search Grounding):</span>
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {aiSources.map((source, idx) => (
                            <a
                              key={idx}
                              href={source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-purple-50 text-slate-700 hover:text-purple-700 text-xs font-mono border border-slate-200 transition-colors"
                            >
                              <span className="truncate max-w-[220px]">{source.title}</span>
                              <ArrowUpRight size={11} className="shrink-0" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500">
                  Rekomendasi dioptimasi khusus untuk pasar B2B &amp; UKM Jabodetabek.
                </span>
                <button
                  onClick={() => setSelectedTarget(null)}
                  className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-purple-950 text-white font-mono text-xs font-bold cursor-pointer"
                >
                  Tutup Laporan
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
