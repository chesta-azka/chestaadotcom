'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, CheckCircle2, XCircle, ArrowRight, Terminal } from 'lucide-react';

export default function PainPointAgitator() {
  const [isAutomated, setIsAutomated] = useState(false);
  const whatsappUrl = "https://wa.me/6282125447232?text=" + encodeURIComponent("Halo Mas Chesta, kami ingin beralih dari operasional manual ke sistem otomatis anti-salah input.");

  return (
    <section className="w-full py-16 md:py-20 relative bg-slate-950 text-white overflow-hidden" id="problem-solution">
      {/* Background High-Contrast Spatial Glow */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[400px] bg-purple-900/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-rose-950/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header with Extreme Typographic Hierarchy */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold mb-4 shadow-sm"
          >
            <AlertTriangle className="w-4 h-4 text-rose-400 animate-pulse" />
            <span className="tracking-widest uppercase">ELIMINASI KERUGIAN OPERASIONAL</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight font-display text-white leading-[1.1] text-balance">
            Apakah Bisnis Anda Masih Membakar Uang Lewat Cara Manual?
          </h2>
          
          <p className="text-slate-400 mt-5 text-base md:text-xl font-light leading-relaxed max-w-2xl mx-auto text-balance">
            Berhenti membuang budget iklan jika admin masih salah input data dan calon pembeli kabur karena sistem lambat.
          </p>
        </div>

        {/* Split-Screen Terminal & Direct Comparison Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          
          {/* Left: Qualitative Breakdown Cards */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            {/* Old Method */}
            <div className="p-7 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-rose-500/20 shadow-2xl shadow-rose-950/30 flex-1">
              <div className="flex items-center gap-3 mb-4 text-rose-400 font-bold">
                <div className="w-9 h-9 rounded-xl bg-rose-500/10 flex items-center justify-center shrink-0 border border-rose-500/20">
                  <XCircle size={20} className="text-rose-400" />
                </div>
                <h3 className="font-display font-black text-lg text-white">Cara Lama (Manual &amp; Rawan Error)</h3>
              </div>
              <ul className="space-y-3.5 text-sm text-slate-300 font-light leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold shrink-0 mt-0.5">•</span>
                  <span>Admin ketik pesanan manual di WhatsApp &amp; Excel (Double Data Entry).</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold shrink-0 mt-0.5">•</span>
                  <span>Sering terjadi selisih stok dan salah kirim barang ke pelanggan.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-bold shrink-0 mt-0.5">•</span>
                  <span>Website lemot, prospek bosan menunggu dan lari ke kompetitor.</span>
                </li>
              </ul>
            </div>

            {/* New Automated Standard */}
            <div className="p-7 rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-emerald-500/30 shadow-2xl shadow-emerald-950/30 flex-1">
              <div className="flex items-center gap-3 mb-4 text-emerald-400 font-bold">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
                  <CheckCircle2 size={20} className="text-emerald-400" />
                </div>
                <h3 className="font-display font-black text-lg text-white">Standar Baru CHESTAADOTCOM</h3>
              </div>
              <ul className="space-y-3.5 text-sm text-slate-300 font-light leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                  <span>Verifikasi pesanan otomatis, nol human-error, rekap instan.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                  <span>Kecepatan muat sub-detik (&lt;0.2s), konversi penjualan maksimal.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                  <span>100% Hak milik kode, tanpa biaya langganan bulanan.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: High-Contrast Dark Mode Terminal Simulator */}
          <div className="lg:col-span-7 flex">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-full rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between"
            >
              {/* Terminal Window Header */}
              <div>
                <div className="flex flex-wrap items-center justify-between pb-6 mb-6 border-b border-slate-800 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500" />
                      <div className="w-3 h-3 rounded-full bg-amber-500" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    </div>
                    <div className="h-4 w-[1px] bg-slate-800 mx-1" />
                    <span className="text-xs font-mono text-slate-400 flex items-center gap-2">
                      <Terminal size={14} className="text-purple-400" />
                      simulator-operasional-perusahaan.exe
                    </span>
                  </div>
                  <button
                    onClick={() => setIsAutomated(!isAutomated)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isAutomated 
                        ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' 
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {isAutomated ? "⚡ SISTEM OTOMATIS AKTIF" : "⚠️ STATUS MANUAL (RAWAN ERROR)"}
                  </button>
                </div>

                {/* Console Log Stream */}
                <div className="space-y-4 font-mono text-xs sm:text-sm">
                  {!isAutomated ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3 text-rose-300">
                      <p className="text-slate-500"># Log aktivitas operasional saat ini (metode manual)...</p>
                      <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-900/40 space-y-2">
                        <p>[09:12:04] ❌ Admin salah ketik nominal transfer (Rp 1.500.000 tercatat Rp 150.000).</p>
                        <p>[09:15:30] ❌ Stok gudang selisih 3 unit karena pencatatan manual tertukar.</p>
                        <p>[09:20:12] ❌ Calon pembeli batal checkout karena halaman katalog loading 8 detik.</p>
                      </div>
                      <p className="text-slate-400 text-xs italic">
                        Hasil: Admin lembur rekap, selisih kas, dan pelanggan kecewa beralih ke kompetitor.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3 text-emerald-300">
                      <p className="text-slate-500"># Log operasional dengan arsitektur CHESTAADOTCOM...</p>
                      <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-900/40 space-y-2">
                        <p>[09:12:04] ✓ Verifikasi bank otomatis &amp; zero human-error guard aktif.</p>
                        <p>[09:15:30] ✓ Stok gudang tersinkronisasi real-time secara mandiri.</p>
                        <p>[09:20:12] ✓ Halaman terbuka dalam 0.18 detik. Checkout berhasil instan.</p>
                      </div>
                      <p className="text-slate-400 text-xs italic">
                        Hasil: Nol salah input data, operasional berjalan tanpa intervensi manual berulang.
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Bottom Interactive Trigger */}
              <div className="pt-8 border-t border-slate-800/80 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                {!isAutomated ? (
                  <button
                    onClick={() => setIsAutomated(true)}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-sans font-bold text-xs transition-all shadow-lg shadow-purple-600/30 cursor-pointer"
                  >
                    ⚡ Aktifkan Simulasi Otomatisasi Sistem
                  </button>
                ) : (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-purple-50 text-slate-950 font-sans font-bold text-xs transition-all shadow-md cursor-pointer"
                  >
                    <span>Amankan Sistem Ini untuk Perusahaan Anda</span>
                    <ArrowRight size={14} />
                  </a>
                )}
                <span className="text-[11px] font-mono text-slate-500">
                  {isAutomated ? "STATUS: ZERO ERROR DETECTED" : "STATUS: CRITICAL RISK DETECTED"}
                </span>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
