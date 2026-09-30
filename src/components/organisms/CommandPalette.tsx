'use client';

import React, { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Search, FileText, Cpu, ArrowRight, X } from 'lucide-react';
import { insightsData } from '../../data/insights';

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
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
    command();
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-full bg-slate-900/90 border border-white/15 text-slate-300 shadow-2xl backdrop-blur-xl hover:border-indigo-500/50 hover:text-white transition-all cursor-pointer group"
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
              onClick={() => setOpen(false)}
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
              <Command className="w-full bg-transparent text-slate-100">
                <div className="flex items-center border-b border-white/10 px-6 py-4">
                  <Search size={18} className="text-indigo-400 mr-3 shrink-0" />
                  <Command.Input
                    placeholder="Ketik untuk mencari artikel, teknologi, atau strategi B2B..."
                    className="w-full bg-transparent text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none font-sans"
                  />
                  <button
                    onClick={() => setOpen(false)}
                    className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>

                <Command.List className="max-h-[380px] overflow-y-auto p-4 space-y-2">
                  <Command.Empty className="py-12 text-center text-sm text-slate-500 font-mono">
                    Tidak ada hasil ditemukan untuk pencarian ini.
                  </Command.Empty>

                  <Command.Group heading={<span className="text-[11px] font-mono uppercase tracking-widest text-indigo-400 px-3 py-1">Wawasan & Jurnal Eksekutif</span>}>
                    {insightsData.map((article) => (
                      <Command.Item
                        key={article.slug}
                        value={`${article.title} ${article.category}`}
                        onSelect={() => runCommand(() => navigate(`/insights/${article.slug}`))}
                        className="flex items-center justify-between p-3 rounded-2xl hover:bg-white/5 cursor-pointer transition-colors group select-none"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-indigo-950/80 border border-indigo-500/30 text-indigo-400 group-hover:scale-105 transition-transform">
                            <FileText size={16} />
                          </div>
                          <div>
                            <div className="font-bold text-white text-sm group-hover:text-indigo-300 transition-colors">
                              {article.title}
                            </div>
                            <span className="text-[11px] font-mono text-slate-400">{article.category} &bull; {article.date}</span>
                          </div>
                        </div>
                        <ArrowRight size={14} className="text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                      </Command.Item>
                    ))}
                  </Command.Group>

                  <Command.Group heading={<span className="text-[11px] font-mono uppercase tracking-widest text-indigo-400 px-3 py-1 pt-4">Navigasi Utama</span>}>
                    <Command.Item
                      onSelect={() => runCommand(() => navigate('/'))}
                      className="flex items-center justify-between p-3 rounded-2xl hover:bg-white/5 cursor-pointer transition-colors group select-none"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-purple-950/80 border border-purple-500/30 text-purple-400">
                          <Cpu size={16} />
                        </div>
                        <span className="font-bold text-white text-sm">Beranda & Arsitektur Utama</span>
                      </div>
                      <ArrowRight size={14} className="text-slate-500 group-hover:text-purple-400 transition-colors" />
                    </Command.Item>
                    <Command.Item
                      onSelect={() => runCommand(() => navigate('/showcase'))}
                      className="flex items-center justify-between p-3 rounded-2xl hover:bg-white/5 cursor-pointer transition-colors group select-none"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-purple-950/80 border border-purple-500/30 text-purple-400">
                          <Search size={16} />
                        </div>
                        <span className="font-bold text-white text-sm">Live Command Center Telemetry</span>
                      </div>
                      <ArrowRight size={14} className="text-slate-500 group-hover:text-purple-400 transition-colors" />
                    </Command.Item>
                  </Command.Group>
                </Command.List>

                <div className="px-6 py-3 border-t border-white/10 bg-black/40 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>Navigasi dengan Panah Atas/Bawah</span>
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
