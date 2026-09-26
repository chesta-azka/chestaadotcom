'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Terminal, 
  TrendingDown,
  Sparkles,
  Zap,
  Flame
} from 'lucide-react';

export default function RealityWakeUpSection() {
  const [activeTab, setActiveTab] = useState<'manual' | 'automated'>('manual');

  return (
    <section 
      className="w-full relative bg-slate-50 text-slate-900 py-16 md:py-24 overflow-hidden" 
      id="reality-check"
    >
      {/* Subtle atmospheric ambient radial glow for light corporate depth */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,_rgba(147,51,234,0.05),_transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header with Refined Corporate Contrast */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-rose-700 text-xs font-mono font-medium mb-4 shadow-xs">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            <span className="tracking-widest uppercase">DIAGNOSA KEBOCORAN PROFIT BISNIS</span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-slate-950 leading-[1.15] text-balance flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-rose-100/70 border border-rose-200/80 text-rose-600 shadow-xs shrink-0">
              <Flame className="w-5 h-5 md:w-6 md:h-6 stroke-[1.8]" />
            </span>
            <span>
              Masih Membakar Uang Lewat{' '}
              <span className="text-purple-700 font-serif italic">
                Cara Manual?
              </span>
            </span>
          </h2>

          <p className="text-slate-600 mt-4 text-base md:text-lg font-normal max-w-2xl mx-auto leading-relaxed text-balance">
            Iklan mahal sia-sia jika pesanan masih salah rekap dan calon pembeli kabur karena antrean chat lambat.
          </p>
        </div>

        {/* Side-by-Side Comparison Terminal Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          
          {/* Left Card: The Manual Chaos (Cara Lama) - Clean Minimalist Warning Card */}
          <div className="lg:col-span-6 rounded-[2.25rem] bg-white border border-slate-200/90 p-8 sm:p-10 flex flex-col justify-between relative shadow-xl shadow-slate-200/40">
            <div>
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-rose-50 border border-rose-200/80 flex items-center justify-center text-rose-600 shadow-xs">
                    <TrendingDown size={22} />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-rose-600 block mb-0.5">
                      STATUS OPERASIONAL RAWAN
                    </span>
                    <h3 className="text-xl font-medium text-slate-900 tracking-tight">
                      Cara Lama: Manual &amp; Rawan Error
                    </h3>
                  </div>
                </div>
              </div>

              <div className="space-y-3.5 mb-8">
                {[
                  {
                    label: "Admin Salah Rekap Pesanan",
                    desc: "Input manual memicu salah kirim barang dan selisih stok fisik.",
                    loss: "Rugi Finansial"
                  },
                  {
                    label: "Respon Lambat Saat Lead Panas",
                    desc: "Lead terabaikan 30+ menit membuat pembeli beralih ke kompetitor.",
                    loss: "Omset Hilang"
                  },
                  {
                    label: "Beban Gaji Staf Membengkak",
                    desc: "Menambah karyawan hanya untuk tugas rekapitulasi data repetitif.",
                    loss: "Beban Operasional"
                  }
                ].map((item, i) => (
                  <div 
                    key={i} 
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 transition-colors hover:border-rose-200"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-medium text-sm text-slate-800">{item.label}</span>
                      <span className="text-[10px] font-mono font-medium text-rose-700 bg-rose-100/70 px-2.5 py-0.5 rounded-md border border-rose-200">
                        {item.loss}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 font-normal leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-5 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500 font-medium">
              <span>Risiko Human-Error: Tinggi</span>
              <span className="text-rose-600 font-medium">Efisiensi: Rendah</span>
            </div>
          </div>

          {/* Right Card: The Autonomous Business Engine - Refined Deep Neutral/Purple Card */}
          <div className="lg:col-span-6 rounded-[2.25rem] bg-[#120f1d] border border-purple-900/40 p-8 sm:p-10 flex flex-col justify-between relative shadow-xl shadow-slate-900/10 overflow-hidden text-white">
            {/* Ambient Corner Accent */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-900/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-purple-900/40">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-purple-900 text-white flex items-center justify-center shadow-xs border border-purple-800">
                    <CheckCircle2 size={22} />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-purple-200 block mb-0.5">
                      STANDAR OTONOM CHESTAADOTCOM
                    </span>
                    <h3 className="text-xl font-medium text-white tracking-tight">
                      Autonomous Business Engine
                    </h3>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[10px] font-mono font-medium text-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Otonom 24/7 Aktif</span>
                </div>
              </div>

              <div className="space-y-3.5 mb-8">
                {[
                  {
                    label: "Nol Human-Error & Verifikasi Kilat",
                    desc: "Pesanan terkunci otomatis tanpa salah ketik atau data ganda.",
                    gain: "100% Akurasi Data"
                  },
                  {
                    label: "Respon Sub-Detik (< 0.2s)",
                    desc: "Menyaring prospek siap bayar langsung ke WhatsApp invoice.",
                    gain: "Konversi Instan"
                  },
                  {
                    label: "Pangkas Biaya Gaji & 100% Hak Milik",
                    desc: "Aset bisnis mandiri tanpa keterikatan biaya sewa platform bulanan.",
                    gain: "Margin Maksimal"
                  }
                ].map((item, i) => (
                  <div 
                    key={i} 
                    className="p-4 rounded-2xl bg-purple-900/40 border border-purple-500/30 transition-colors hover:border-purple-400/50"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-medium text-sm text-white">{item.label}</span>
                      <span className="text-[10px] font-mono font-medium text-emerald-300 bg-emerald-500/25 px-2.5 py-0.5 rounded-md border border-emerald-400/40">
                        {item.gain}
                      </span>
                    </div>
                    <p className="text-xs text-purple-100/90 font-normal leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-5 border-t border-purple-700/50 flex items-center justify-between text-xs font-mono font-medium relative z-10">
              <span className="text-purple-200">Risiko Human-Error: 0%</span>
              <span className="text-emerald-300 font-medium">Efisiensi: Maksimal</span>
            </div>
          </div>

        </div>

        {/* Interactive Simulation Console (Pro Executive Terminal) */}
        <div className="rounded-[2.25rem] bg-white border border-slate-200/90 p-6 md:p-8 shadow-xl shadow-slate-200/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            
            {/* macOS Window Controls + Terminal Title */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-400 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
              </div>
              <div className="h-4 w-[1px] bg-slate-200" />
              <div className="flex items-center gap-2 text-slate-800 font-mono text-xs sm:text-sm font-medium">
                <Terminal className="w-4 h-4 text-purple-900" />
                <span>Simulasi Operasional: Penanganan Lead</span>
              </div>
            </div>

            {/* Mode Toggle with Minimalist Corporate Styling */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 self-start sm:self-auto">
              <button
                onClick={() => setActiveTab('manual')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                  activeTab === 'manual'
                    ? 'bg-rose-50 text-rose-700 border border-rose-200 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Mode Manual
              </button>
              <button
                onClick={() => setActiveTab('automated')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                  activeTab === 'automated'
                    ? 'bg-purple-900 text-white border border-purple-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ⚡ Mode Otonom
              </button>
            </div>
          </div>

          {/* Simulation Feed with Crisp Contrast */}
          <div className="pt-6 font-mono text-xs sm:text-[13px] space-y-3 leading-relaxed">
            <AnimatePresence mode="wait">
              {activeTab === 'manual' ? (
                <motion.div
                  key="manual"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3 text-slate-700"
                >
                  <div className="flex items-center gap-2.5 text-rose-600 font-medium">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <span>[14:10:02] Lead masuk via iklan Google Ads (Calon Pembeli Korporat).</span>
                  </div>
                  <div className="pl-4 border-l-2 border-rose-300 space-y-2 text-slate-600">
                    <p className="text-slate-500 font-normal">[14:38:15] Admin baru melihat pesan setelah 28 menit antrean chat.</p>
                    <p className="text-amber-700 font-normal">[14:39:00] Admin meminta calon pembeli mengisi format pesan manual ulang.</p>
                    <p className="text-rose-700 font-medium bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200 inline-block">
                      ❌ HASIL: Calon pembeli beralih ke kompetitor yang merespon seketika.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="automated"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3 text-slate-800"
                >
                  <div className="flex items-center gap-2.5 text-emerald-600 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>[14:10:02] Lead masuk via iklan Google Ads (Calon Pembeli Korporat).</span>
                  </div>
                  <div className="pl-4 border-l-2 border-purple-400 space-y-2 text-slate-700">
                    <p className="text-slate-600 font-normal">[14:10:02.180] Sistem merespon dalam 0.18 detik, memverifikasi kriteria kebutuhan.</p>
                    <p className="text-purple-700 font-medium">[14:10:03.400] Asisten pintar mengunci spesifikasi pesanan dan menerbitkan invoice resmi.</p>
                    <p className="text-emerald-800 font-medium bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 inline-block">
                      ⚡ HASIL: Transaksi ditutup seketika tanpa jeda antrean.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
