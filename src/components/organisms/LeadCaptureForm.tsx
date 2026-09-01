import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft, CheckCircle2, MessageCircle } from 'lucide-react';

const PROJECT_TYPES = [
  'Paket Promo UMKM (Rp540K)',
  'Website Bisnis / Company Profile',
  'Toko Online / Katalog Produk',
  'Landing Page Promosi & Iklan',
  'Custom Web & Integrasi AI',
];

const BUDGET_OPTIONS = [
  'Rp 540.000 (Promo Spesial)',
  'Rp 1 Jt - Rp 3 Jt',
  'Rp 3 Jt - Rp 7 Jt',
  '> Rp 7 Jt (Custom Enterprise)',
];

export default function LeadCaptureForm() {
  const [projectType, setProjectType] = useState(PROJECT_TYPES[0]);
  const [budget, setBudget] = useState(BUDGET_OPTIONS[0]);
  const [businessName, setBusinessName] = useState('');

  const handleOpenWhatsApp = () => {
    const text = `Halo Mas Chesta! Saya ingin konsultasi pembuatan website:%0A%0A• *Jenis Proyek:* ${encodeURIComponent(projectType)}%0A• *Estimasi Budget:* ${encodeURIComponent(budget)}${businessName ? `%0A• *Nama Bisnis:* ${encodeURIComponent(businessName)}` : ''}%0A%0AMohon informasi langkah pengerjaan selanjutnya. Terima kasih!`;
    window.open(`https://wa.me/6282125447232?text=${text}`, '_blank');
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-purple-100 overflow-hidden w-full max-w-2xl mx-auto font-sans">
      {/* Header */}
      <div className="bg-purple-50/40 p-6 border-b border-purple-100 flex items-center justify-between">
        <div>
          <h3 className="font-display font-semibold text-slate-900 text-lg">
            Kustomisasi Rencana Website
          </h3>
          <p className="text-slate-500 text-xs font-sans mt-0.5">
            Pilih kebutuhan Anda dan dapatkan konsultasi 1-on-1 langsung di WhatsApp.
          </p>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-purple-900 text-[11px] font-mono font-bold border border-purple-200 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Direct WhatsApp
        </span>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {/* Step 1: Jenis Proyek */}
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-slate-500 tracking-wider mb-2.5">
            1. Pilih Jenis Kebutuhan Website
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {PROJECT_TYPES.map((type) => {
              const isSelected = projectType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setProjectType(type)}
                  className={`text-left px-4 py-3 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-purple-600 bg-purple-50/70 text-purple-950 font-medium shadow-xs'
                      : 'border-slate-200 bg-white hover:border-purple-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs">{type}</span>
                    {isSelected && <CheckCircle2 size={15} className="text-purple-600 shrink-0 ml-2" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Budget */}
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-slate-500 tracking-wider mb-2.5">
            2. Perkiraan Alokasi Investasi
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {BUDGET_OPTIONS.map((opt) => {
              const isSelected = budget === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setBudget(opt)}
                  className={`text-left px-4 py-3 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-purple-600 bg-purple-50/70 text-purple-950 font-medium shadow-xs'
                      : 'border-slate-200 bg-white hover:border-purple-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs">{opt}</span>
                    {isSelected && <CheckCircle2 size={15} className="text-purple-600 shrink-0 ml-2" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Optional Business Name */}
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-slate-500 tracking-wider mb-2">
            3. Nama Bisnis / Usaha (Opsional)
          </label>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Contoh: Kopi Nusantara / PT Maju Digital"
            className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 bg-purple-50/20 focus:bg-white text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm focus:border-purple-600 focus:outline-none transition-all"
          />
        </div>

        {/* Direct Action Button to WhatsApp */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleOpenWhatsApp}
            className="w-full py-4 px-6 rounded-2xl bg-purple-900 hover:bg-purple-800 text-white font-sans font-semibold text-sm flex items-center justify-center gap-2.5 shadow-md shadow-purple-950/10 transition-all cursor-pointer group"
          >
            <MessageCircle size={18} />
            <span>Mulai Konsultasi Langsung di WhatsApp</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-center text-[11px] text-slate-400 font-sans mt-2.5">
            Terhubung langsung dengan Chesta Azka Sofyan &bull; Respon Cepat 1-on-1
          </p>
        </div>
      </div>
    </div>
  );
}
