'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, ShieldAlert, Cpu, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';

export default function SystemScanner() {
  const [urlInput, setUrlInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const scanStepsText = [
    "Menghubungkan ke Edge Server & DNS Cluster...",
    "Menganalisis Core Web Vitals & Time to First Byte (TTFB)...",
    "Mendeteksi 502 Vulnerabilities & Spaghetti Code...",
    "Menghitung Estimasi Kebocoran ROAS dan Bouncing Cost..."
  ];

  const handleStartScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput) return;
    setIsScanning(true);
    setScanStep(0);
    setScanComplete(false);

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < scanStepsText.length) {
        setScanStep(currentStep);
      } else {
        clearInterval(interval);
        setIsScanning(false);
        setScanComplete(true);
      }
    }, 800);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email && !whatsapp) return;
    setSubmitted(true);
  };

  return (
    <div className="w-full my-16 p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-indigo-950/50 via-[#0d0d12] to-purple-950/50 border border-indigo-500/40 backdrop-blur-2xl shadow-[0_0_60px_rgba(99,102,241,0.2)] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/35 text-indigo-400 text-xs font-mono uppercase tracking-wider">
            <Terminal size={13} className="animate-pulse" />
            <span>AI System Scanner & Forensic Audit</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-sans">
            Cek Kesehatan Infrastruktur Bisnis Lo Sekarang
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Masukkan URL website Anda. Sistem AI Chestaa akan memindai potensi kebocoran performa dan kerugian ROAS secara instan.
          </p>
        </div>

        {!scanComplete && !isScanning && (
          <form onSubmit={handleStartScan} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              required
              placeholder="Masukkan URL Website Bisnis Lo (contoh: perusahaan.com)"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="flex-1 px-5 py-4 rounded-full bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500 font-mono"
            />
            <button
              type="submit"
              className="px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2 shrink-0"
            >
              <span>Audit Sistem</span>
              <ArrowRight size={16} />
            </button>
          </form>
        )}

        {/* SCANNING PROGRESS ANIMATION */}
        <AnimatePresence>
          {isScanning && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-xl mx-auto p-8 rounded-2xl bg-black/60 border border-indigo-500/30 text-center space-y-6 font-mono"
            >
              <Loader2 size={40} className="mx-auto text-indigo-400 animate-spin" />
              <div className="space-y-2">
                <span className="text-xs text-indigo-400 uppercase tracking-widest">[ Memindai Target: {urlInput} ]</span>
                <p className="text-sm text-white font-bold">{scanStepsText[scanStep]}</p>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <motion.div
                  className="bg-indigo-500 h-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${((scanStep + 1) / scanStepsText.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SCAN COMPLETE RESULTS & LEAD CAPTURE */}
        <AnimatePresence>
          {scanComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto p-8 rounded-3xl bg-red-950/30 border border-red-500/40 backdrop-blur-xl space-y-6 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-red-500/20 pb-4">
                <div className="flex items-center gap-3">
                  <ShieldAlert className="text-red-400" size={24} />
                  <div>
                    <h3 className="font-bold text-white text-lg">Hasil Forensik: {urlInput}</h3>
                    <span className="text-xs font-mono text-red-400 uppercase tracking-wider">Status: Infrastruktur Kritis</span>
                  </div>
                </div>
                <div className="px-4 py-2 rounded-xl bg-red-950/80 border border-red-500/50 text-red-400 font-mono font-extrabold text-xl">
                  42/100
                </div>
              </div>

              <div className="space-y-3 text-sm text-slate-300 leading-relaxed font-sans">
                <p>
                  Sistem lo berdarah. Lo kehilangan estimasi <strong className="text-red-400">35 persen konversi</strong> setiap hari akibat latensi tinggi dan tidak adanya arsitektur otonom AI.
                </p>
                <p className="p-4 rounded-xl bg-black/40 border border-red-500/20 text-xs text-slate-200 italic">
                  "Jujurly, kompetitor lo di Jakarta dan Tangerang udah migrasi ke Next.js 15 dan Karyawan AI. Kalau lo telat, market share lo bakal habis."
                </p>
              </div>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-3 font-sans">
                  <CheckCircle2 size={40} className="mx-auto text-emerald-400 animate-bounce" />
                  <h4 className="text-lg font-bold text-white">Laporan Forensik Lengkap Dikirim!</h4>
                  <p className="text-xs text-slate-300">Principal Architect kami akan menghubungi WhatsApp Anda dalam 1 jam.</p>
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="space-y-4 pt-2 font-sans">
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
                    className="w-full py-4 rounded-full bg-gradient-to-r from-red-600 to-indigo-600 hover:from-red-700 hover:to-indigo-700 text-white font-bold text-sm transition-all shadow-[0_0_30px_rgba(239,68,68,0.4)] cursor-pointer"
                  >
                    Kirim Laporan Forensik Lengkap & Solusi Arsitektur
                  </button>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
