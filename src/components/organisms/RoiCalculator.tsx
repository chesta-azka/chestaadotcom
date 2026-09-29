'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, ArrowRight, ShieldAlert, Sparkles, CheckCircle2, X } from 'lucide-react';

export default function RoiCalculator() {
  const [adSpend, setAdSpend] = useState<number>(50); // in millions IDR (10 to 500)
  const [loadSpeed, setLoadSpeed] = useState<number>(4.0); // in seconds (1 to 10)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [whatsapp, setWhatsapp] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Reactive Logic: Every second above 1.5s drops conversion by 20%
  const excessSeconds = Math.max(0, loadSpeed - 1.5);
  const dropPercentage = Math.min(0.9, excessSeconds * 0.2); // max 90% drop
  const lostMoneyMillions = adSpend * dropPercentage;
  const projectedProfitGain = lostMoneyMillions * 0.85; // Chestaa reclamation

  // Formatting currency in IDR Millions / Billions
  const formatIDR = (millions: number) => {
    if (millions >= 1000) {
      return `Rp ${(millions / 1000).toFixed(1)} Miliar`;
    }
    return `Rp ${millions.toFixed(1)} Juta`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email && !whatsapp) return;
    setSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setSubmitted(false);
      setEmail('');
      setWhatsapp('');
    }, 2500);
  };

  return (
    <div className="w-full my-16 p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-[#0d0d12] to-purple-950/40 border border-indigo-500/30 backdrop-blur-2xl shadow-[0_0_50px_rgba(99,102,241,0.15)] relative overflow-hidden">
      {/* Background glow animation */}
      <motion.div 
        animate={{ 
          opacity: [0.1, 0.25, 0.1],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="relative z-10 max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/80 border border-red-500/30 text-red-400 text-xs font-mono uppercase tracking-wider">
            <ShieldAlert size={13} className="animate-pulse" />
            <span>Kalkulator Kebocoran Profit B2B</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            Berapa Banyak Uang Iklan Yang Hangus Karena Website Lambat?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Geser slider di bawah ini dan saksikan sendiri kalkulasi matematis seberapa besar kerugian finansial akibat performa infrastruktur digital yang buruk.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Sliders Input Column */}
          <div className="space-y-8 p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md">
            {/* Input 1: Ad Spend */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-slate-200">Berapa Anggaran Iklan Bulanan Lo?</label>
                <span className="text-base font-bold text-indigo-400 font-mono">{formatIDR(adSpend)} / bulan</span>
              </div>
              <input
                type="range"
                min={10}
                max={500}
                step={10}
                value={adSpend}
                onChange={(e) => setAdSpend(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <div className="flex justify-between text-xs text-slate-500 font-mono">
                <span>Rp 10 Juta</span>
                <span>Rp 250 Juta</span>
                <span>Rp 500 Juta</span>
              </div>
            </div>

            {/* Input 2: Load Speed */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-slate-200">Kecepatan Loading Web Lo Sekarang?</label>
                <span className="text-base font-bold text-red-400 font-mono">{loadSpeed.toFixed(1)} Detik</span>
              </div>
              <input
                type="range"
                min={1.0}
                max={10.0}
                step={0.5}
                value={loadSpeed}
                onChange={(e) => setLoadSpeed(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
              <div className="flex justify-between text-xs text-slate-500 font-mono">
                <span>1.0s (Kilat)</span>
                <span>5.0s (Standar)</span>
                <span>10.0s (Sangat Lambat)</span>
              </div>
            </div>
          </div>

          {/* Reactive Outputs Column with Loss Aversion Shake */}
          <motion.div 
            animate={lostMoneyMillions > 150 ? { x: [0, -2, 2, -2, 2, 0] } : { x: 0 }}
            transition={{ duration: 0.4, repeat: lostMoneyMillions > 150 ? Infinity : 0, repeatDelay: 2 }}
            className="p-6 sm:p-8 rounded-2xl bg-red-950/20 border border-red-500/30 backdrop-blur-xl flex flex-col justify-between space-y-6 shadow-2xl"
          >
            {/* Output Display 1: Lost Money */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-red-400 uppercase tracking-widest">[ Potensi Bouncing Cost ]</span>
              <div className="text-3xl sm:text-5xl font-extrabold text-red-400 tracking-tight font-mono drop-shadow-[0_0_20px_rgba(248,113,113,0.4)]">
                {formatIDR(lostMoneyMillions)} <span className="text-xs text-slate-400 font-sans font-normal">/ bulan hangus</span>
              </div>
              <p className="text-xs text-slate-400">Uang iklan terbuang sia-sia karena prospek kabur sebelum website terbuka.</p>
            </div>

            {/* Gen-Z Jaksel B2B Psychological Trap Quote */}
            <div className="p-4 rounded-xl bg-black/40 border border-red-500/20 text-xs text-slate-300 italic">
              "Jujurly, ngeliat duit lo nguap gitu aja literally bikin sakit kepala. Stop bakar duit sekarang."
            </div>

            {/* Output Display 2: Projected Profit Gain */}
            <div className="space-y-1 pt-4 border-t border-white/10">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">[ Proyeksi Arsitektur Chestaa ]</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 tracking-tight font-mono">
                +{formatIDR(projectedProfitGain)} <span className="text-xs text-slate-400 font-sans font-normal">profit bersih diselamatkan</span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-4 rounded-full bg-gradient-to-r from-red-600 to-indigo-600 hover:from-red-700 hover:to-indigo-700 text-white font-bold text-sm transition-all shadow-[0_0_30px_rgba(239,68,68,0.4)] cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Audit Infrastruktur Gue (Gratis)</span>
              <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </div>

      {/* LEAD CAPTURE MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg p-8 rounded-3xl bg-[#0f0f17] border border-indigo-500/40 shadow-2xl space-y-6"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>

              <div className="space-y-2">
                <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider">[ Audit Keamanan & Kecepatan ]</span>
                <h3 className="text-2xl font-bold text-white">Klaim Audit Infrastruktur Gratis</h3>
                <p className="text-sm text-slate-300">
                  Masukkan email perusahaan dan nomor WhatsApp Anda. Principal Architect kami akan mengirimkan laporan forensik kecepatan dan potensi kebocoran profit web Anda.
                </p>
              </div>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-3">
                  <CheckCircle2 size={40} className="mx-auto text-emerald-400 animate-bounce" />
                  <h4 className="text-lg font-bold text-white">Permintaan Audit Diterima!</h4>
                  <p className="text-xs text-slate-300">Tim kami akan menghubungi Anda dalam waktu kurang dari 2 jam.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-slate-300">Email Korporat</label>
                    <input
                      type="email"
                      required
                      placeholder="ceo@perusahaan.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-slate-300">Nomor WhatsApp Aktif</label>
                    <input
                      type="tel"
                      required
                      placeholder="08123456789"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-all shadow-lg cursor-pointer"
                  >
                    Kirim Permintaan Audit
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
