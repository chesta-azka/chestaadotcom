'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { Command } from 'cmdk';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Search, FileText, Cpu, ArrowRight, X, Shield, Zap, TrendingUp } from 'lucide-react';
import { insightsData } from '../../data/insights';

interface SearchItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  type: 'service' | 'insight';
  path: string;
  weight: number;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    setQuery('');
    command();
  };

  const allItems: SearchItem[] = useMemo(() => {
    const services: SearchItem[] = [
      {
        id: 'serv-1',
        title: 'Jasa AI Automation BSD & Tangerang Selatan',
        subtitle: 'Otomatisasi bisnis 24/7 dan Karyawan AI otonom',
        category: 'Commercial Service',
        type: 'service',
        path: '/services/ai-automation/tangerang',
        weight: 100
      },
      {
        id: 'serv-2',
        title: 'Fractional CTO Jakarta Selatan & SCBD',
        subtitle: 'Arsitek eksekutif untuk rescue kode dan skalabilitas',
        category: 'Commercial Service',
        type: 'service',
        path: '/services/enterprise/jakarta',
        weight: 100
      },
      {
        id: 'serv-3',
        title: 'Infrastruktur Next.js 15 & Sub-Second Web',
        subtitle: 'Solusi website kilat penyelamat ROAS iklan B2B',
        category: 'Commercial Service',
        type: 'service',
        path: '/showcase',
        weight: 100
      },
      {
        id: 'serv-4',
        title: 'Live Command Center Telemetry',
        subtitle: 'Pantau performa arsitektur otonom secara real-time',
        category: 'Enterprise Tool',
        type: 'service',
        path: '/showcase',
        weight: 90
      }
    ];

    const insights: SearchItem[] = insightsData.map((article) => ({
      id: article.slug,
      title: article.title,
      subtitle: article.seoDescription,
      category: article.category,
      type: 'insight',
      path: `/insights/${article.slug}`,
      weight: 20
    }));

    return [...services, ...insights];
  }, []);

  const filteredItems = useMemo(() => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();
    
    // Weighted scoring algorithm
    const scored = allItems.map((item) => {
      const titleMatch = item.title.toLowerCase().includes(lowerQuery);
      const subMatch = item.subtitle.toLowerCase().includes(lowerQuery);
      const catMatch = item.category.toLowerCase().includes(lowerQuery);

      if (!titleMatch && !subMatch && !catMatch) return null;

      let score = item.weight; // Services = 100, Insights = 20
      if (titleMatch) score += 50;
      if (subMatch) score += 20;

      return { item, score };
    }).filter(Boolean) as Array<{ item: SearchItem; score: number }>;

    // Sort descending by score so high-converting commercial services always render at top
    scored.sort((a, b) => b.score - a.score);

    return scored.map(s => s.item);
  }, [query, allItems]);

  const defaultPopularServices: SearchItem[] = [
    {
      id: 'pop-1',
      title: 'Jasa AI Automation BSD',
      subtitle: 'Otomatisasi Karyawan AI 24/7 untuk korporat',
      category: 'Commercial Service',
      type: 'service',
      path: '/services/ai-automation/tangerang',
      weight: 100
    },
    {
      id: 'pop-2',
      title: 'Fractional CTO Jakarta Selatan',
      subtitle: 'Arsitek sistem enterprise kelas atas',
      category: 'Commercial Service',
      type: 'service',
      path: '/services/enterprise/jakarta',
      weight: 100
    },
    {
      id: 'pop-3',
      title: 'Otomatisasi Sistem Bisnis Tangerang',
      subtitle: 'Infrastruktur sub-detik penyelamat ROAS',
      category: 'Commercial Service',
      type: 'service',
      path: '/showcase',
      weight: 100
    }
  ];

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-24 z-40 hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-full bg-slate-900/90 border border-white/15 text-slate-300 shadow-2xl backdrop-blur-xl hover:border-indigo-500/50 hover:text-white transition-all cursor-pointer group"
      >
        <Search size={14} className="text-indigo-400 group-hover:scale-110 transition-transform" />
        <span className="text-xs font-mono">Cari Wawasan...</span>
        <kbd className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono text-indigo-300">Ctrl K</kbd>
      </button>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setOpen(false); setQuery(''); }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative w-full max-w-2xl rounded-3xl bg-[#0d0d12] border border-indigo-500/40 shadow-[0_0_50px_rgba(99,102,241,0.25)] overflow-hidden z-10 font-sans"
            >
              <Command shouldFilter={false} className="w-full bg-transparent text-slate-100">
                <div className="flex items-center border-b border-white/10 px-6 py-4">
                  <Search size={18} className="text-indigo-400 mr-3 shrink-0" />
                  <Command.Input
                    value={query}
                    onValueChange={setQuery}
                    placeholder="Ketik layanan komersial atau wawasan eksekutif..."
                    className="w-full bg-transparent text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none font-sans"
                  />
                  <button
                    onClick={() => { setOpen(false); setQuery(''); }}
                    className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>

                <Command.List className="max-h-[400px] overflow-y-auto p-4 space-y-2">
                  {query.trim() === '' ? (
                    <div className="space-y-4">
                      <div className="px-3 py-1 flex items-center justify-between">
                        <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-400">
                          Layanan Eksekutif Terpopuler (GEO-AEO Priority)
                        </span>
                        <Zap size={13} className="text-indigo-400" />
                      </div>
                      <div className="space-y-2">
                        {defaultPopularServices.map((service) => (
                          <div
                            key={service.id}
                            onClick={() => runCommand(() => navigate(service.path))}
                            className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/50 hover:bg-white/5 cursor-pointer transition-all group select-none"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 group-hover:scale-105 transition-transform">
                                <Shield size={16} />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-white text-sm group-hover:text-indigo-300 transition-colors">
                                    {service.title}
                                  </span>
                                  <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider bg-emerald-950/90 border border-emerald-500/40 text-emerald-400">
                                    SERVICE
                                  </span>
                                </div>
                                <span className="text-xs text-slate-400">{service.subtitle}</span>
                              </div>
                            </div>
                            <ArrowRight size={14} className="text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : filteredItems.length === 0 ? (
                    <div className="py-12 text-center text-sm text-slate-500 font-mono">
                      Tidak ada hasil ditemukan untuk pencarian ini.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="px-3 py-1 text-[11px] font-mono uppercase tracking-widest text-indigo-400">
                        Hasil Terurut Berdasarkan Skor Komersial & Relevansi
                      </div>
                      {filteredItems.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => runCommand(() => navigate(item.path))}
                          className="flex items-center justify-between p-3.5 rounded-2xl hover:bg-white/5 cursor-pointer transition-colors group select-none"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-2.5 rounded-xl border ${
                              item.type === 'service'
                                ? 'bg-emerald-950/80 border-emerald-500/30 text-emerald-400'
                                : 'bg-indigo-950/80 border-indigo-500/30 text-indigo-400'
                            }`}>
                              {item.type === 'service' ? <Shield size={16} /> : <FileText size={16} />}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-white text-sm group-hover:text-indigo-300 transition-colors">
                                  {item.title}
                                </span>
                                <span className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider ${
                                  item.type === 'service'
                                    ? 'bg-emerald-950/90 border border-emerald-500/40 text-emerald-400'
                                    : 'bg-slate-800 border border-slate-700 text-slate-400'
                                }`}>
                                  {item.type === 'service' ? 'SERVICE' : 'INSIGHT'}
                                </span>
                              </div>
                              <span className="text-xs text-slate-400 line-clamp-1">{item.subtitle}</span>
                            </div>
                          </div>
                          <ArrowRight size={14} className="text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                        </div>
                      ))}
                    </div>
                  )}
                </Command.List>

                <div className="px-6 py-3 border-t border-white/10 bg-black/40 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>Prioritas Layanan Komersial Diutamakan</span>
                  <span>Tekan ESC untuk keluar</span>
                </div>
              </Command>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
