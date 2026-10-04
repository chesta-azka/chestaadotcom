'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Cpu, FileText, Rocket, ShieldCheck, Zap } from 'lucide-react';

const STEPS = [
  { id: 1, title: 'Audit & Blueprint', desc: 'Analisis hambatan operasional & arsitektur custom.' },
  { id: 2, title: 'AI Training & Architecture', desc: 'Pelatihan model agen AI dengan data historis perusahaan.' },
  { id: 3, title: 'Alpha Deployment', desc: 'Uji coba sistem pada lingkungan sandbox berkecepatan tinggi.' },
  { id: 4, title: 'Full Autonomous Handover', desc: 'Sistem aktif penuh, Karyawan AI mengambil alih operasional.' }
];

export default function ClientStepper() {
  const [currentStep, setCurrentStep] = useState(1);
  const [burnRate, setBurnRate] = useState(1250000); // 1.25M starting burn

  useEffect(() => {
    if (currentStep >= 4) return;
    const interval = setInterval(() => {
      setBurnRate(prev => prev + 45000); // Ticks up by 45k every second
    }, 1000);
    return () => clearInterval(interval);
  }, [currentStep]);

  return (
    <div className="w-full max-w-4xl mx-auto p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl font-sans text-slate-100">
      <div className="text-center max-w-xl mx-auto mb-10 space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 bg-indigo-950 px-3 py-1 rounded-full border border-indigo-500/30">
          Autonomous Deployment Pipeline
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          Status Kesiapan Sistem Enterprise Anda
        </h3>
      </div>

      {/* Stepper Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-12">
        {STEPS.map((step) => {
          const isDone = currentStep > step.id;
          const isCurrent = currentStep === step.id;

          return (
            <motion.div
              key={step.id}
              onClick={() => setCurrentStep(step.id)}
              whileHover={{ scale: 1.02 }}
              className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                isCurrent 
                  ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-600/20' 
                  : isDone 
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' 
                    : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold">TAHAP 0{step.id}</span>
                {isDone ? <CheckCircle2 size={16} className="text-emerald-400" /> : <Zap size={16} className={isCurrent ? 'text-indigo-400' : 'text-slate-500'} />}
              </div>
              <div>
                <h4 className="font-bold text-sm text-white mb-1">{step.title}</h4>
                <p className="text-xs opacity-80 leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Live Burn Rate Manipulator */}
      <motion.div
        layout
        className={`p-6 sm:p-8 rounded-2xl border transition-colors flex flex-col sm:flex-row items-center justify-between gap-6 ${
          currentStep >= 4 
            ? 'bg-emerald-950/80 border-emerald-500 shadow-xl shadow-emerald-500/10' 
            : 'bg-slate-950 border-rose-500/40 shadow-xl shadow-rose-500/5'
        }`}
      >
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2 justify-center sm:justify-start">
            {currentStep >= 4 ? <ShieldCheck size={14} className="text-emerald-400" /> : <Cpu size={14} className="text-rose-400 animate-spin" />}
            <span>{currentStep >= 4 ? 'Status Operasional Karyawan AI' : 'Kalkulator Kerugian Operasional Manual'}</span>
          </div>
          <div className="text-sm font-bold text-white">
            {currentStep >= 4 ? 'Karyawan AI Aktif. Sistem Sekarang Menghasilkan Penghematan.' : 'Estimasi Biaya Operasional Manual yang Terbakar Selama Menunggu Deploy'}
          </div>
        </div>

        <div className={`text-2xl sm:text-3xl font-mono font-extrabold tracking-tight ${currentStep >= 4 ? 'text-emerald-400' : 'text-rose-400'}`}>
          {currentStep >= 4 ? 'Rp 0 (TERELIMINASI)' : `Rp ${burnRate.toLocaleString('id-ID')}`}
        </div>
      </motion.div>

      {/* Step Action Controls */}
      <div className="mt-8 flex justify-end gap-3">
        {currentStep < 4 ? (
          <button
            onClick={() => setCurrentStep(prev => Math.min(4, prev + 1))}
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
          >
            <b>Majukan Tahap Sistem &rarr;</b>
          </button>
        ) : (
          <button
            onClick={() => setCurrentStep(1)}
            className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
          >
            <b>Reset Simulasi</b>
          </button>
        )}
      </div>
    </div>
  );
}
