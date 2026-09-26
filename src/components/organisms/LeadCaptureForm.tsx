import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2, MessageCircle, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import MagneticButton from '../atoms/MagneticButton';

const PROJECT_TYPES = [
  'Paket Promo UMKM (Rp540K)',
  'Website Bisnis / Company Profile',
  'Toko Online / Katalog Produk',
  'Landing Page Promosi & Iklan',
  'Custom Web & Integrasi AI',
  'Konsultan IT & Strategi Digital',
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
  const [userName, setUserName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [errors, setErrors] = useState<{ userName?: string; businessName?: string }>({});

  const validateForm = () => {
    const newErrors: { userName?: string; businessName?: string } = {};
    if (!userName.trim()) {
      newErrors.userName = 'Nama Anda wajib diisi';
    }
    if (!businessName.trim()) {
      newErrors.businessName = 'Nama Bisnis/Usaha wajib diisi';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      toast.error('Mohon lengkapi data yang wajib diisi', { icon: '⚠️' });
      return false;
    }
    
    return true;
  };

  const handleOpenWhatsApp = () => {
    if (!validateForm()) return;

    const text = `Halo Mas Chesta! Saya ingin konsultasi pembuatan website:%0A%0A• *Nama:* ${encodeURIComponent(userName)}%0A• *Bisnis:* ${encodeURIComponent(businessName)}%0A• *Jenis Proyek:* ${encodeURIComponent(projectType)}%0A• *Estimasi Budget:* ${encodeURIComponent(budget)}%0A%0AMohon informasi langkah pengerjaan selanjutnya. Terima kasih!`;
    
    // Simulate successful form interaction tracking or loading before directing to WhatsApp
    toast.success('Membuka WhatsApp...', { duration: 1500 });
    
    setTimeout(() => {
      window.open(`https://wa.me/6282125447232?text=${text}`, '_blank');
    }, 500);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-purple-100 overflow-hidden w-full max-w-2xl mx-auto font-sans">
      {/* Header */}
      <div className="bg-purple-50/40 p-6 border-b border-purple-100 flex items-center justify-between">
        <div>
          <h3 className="font-display font-black text-slate-900 text-lg">
            Kustomisasi Rencana Website
          </h3>
          <p className="text-slate-600 text-xs font-sans mt-0.5">
            Pilih kebutuhan Anda dan dapatkan konsultasi 1-on-1 langsung di WhatsApp.
          </p>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-purple-900 text-[11px] font-mono font-bold border border-purple-200 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Direct WhatsApp
        </span>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Input Name */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-mono uppercase font-bold text-slate-600 tracking-wider mb-2">
                1. Nama Anda <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                  if (errors.userName) setErrors({ ...errors, userName: undefined });
                }}
                placeholder="Contoh: Budi Santoso"
                className={`w-full px-4 py-2.5 rounded-2xl border ${errors.userName ? 'border-red-400 bg-red-50/20 focus:border-red-600' : 'border-slate-200 bg-purple-50/20 focus:border-purple-600'} focus:bg-white text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none transition-all`}
              />
              {errors.userName && (
                <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-[10px] flex items-center gap-1 mt-1.5">
                  <AlertCircle size={12} /> {errors.userName}
                </motion.p>
              )}
            </div>
            
            {/* Input Business */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-mono uppercase font-bold text-slate-600 tracking-wider mb-2">
                2. Nama Bisnis / Usaha <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => {
                  setBusinessName(e.target.value);
                  if (errors.businessName) setErrors({ ...errors, businessName: undefined });
                }}
                placeholder="Contoh: PT Digital Maju"
                className={`w-full px-4 py-2.5 rounded-2xl border ${errors.businessName ? 'border-red-400 bg-red-50/20 focus:border-red-600' : 'border-slate-200 bg-purple-50/20 focus:border-purple-600'} focus:bg-white text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm focus:outline-none transition-all`}
              />
              {errors.businessName && (
                <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-500 text-[10px] flex items-center gap-1 mt-1.5">
                  <AlertCircle size={12} /> {errors.businessName}
                </motion.p>
              )}
            </div>
        </div>

        {/* Step 3: Jenis Proyek */}
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-slate-600 tracking-wider mb-2.5">
            3. Pilih Jenis Kebutuhan Website
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

        {/* Step 4: Budget */}
        <div>
          <label className="block text-xs font-mono uppercase font-bold text-slate-600 tracking-wider mb-2.5">
            4. Perkiraan Alokasi Investasi
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

        {/* Direct Action Button to WhatsApp */}
        <div className="pt-2">
          <MagneticButton strength={20} className="w-full">
            <button
              type="button"
              onClick={handleOpenWhatsApp}
              className="w-full py-4 px-6 rounded-2xl bg-purple-900 hover:bg-purple-800 text-white font-sans font-semibold text-sm flex items-center justify-center gap-2.5 shadow-md shadow-purple-950/10 transition-all cursor-pointer group"
            >
              <MessageCircle size={18} />
              <span>Kirim Permintaan ke WhatsApp</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </MagneticButton>
          <p className="text-center text-[11px] text-slate-400 font-sans mt-2.5">
            Terhubung langsung dengan Tim CHESTAADOTCOM &bull; Respon Cepat 1-on-1
          </p>
        </div>
      </div>
    </div>
  );
}
