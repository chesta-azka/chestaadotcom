"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, Check, MessageCircle, ArrowRight, Layers, FileText, Cpu, ShieldCheck, Clock } from 'lucide-react';

interface AddOnModule {
  id: string;
  name: string;
  price: number;
  description: string;
}

const ADD_ON_MODULES: AddOnModule[] = [
  { id: 'ai', name: 'Integrasi AI Agent / Chatbot', price: 1500000, description: 'Google Gemini 2.5 & Groq 70B kontekstual 24/7' },
  { id: 'zod', name: 'Zod Validation & Secure API', price: 350000, description: 'Type-safe form handling & server validation' },
  { id: 'cms', name: 'Custom CMS / Database Dashboard', price: 750000, description: 'Manajemen data real-time dengan Cloud Firestore' },
  { id: 'seo', name: 'Optimasi SEO & Core Web Vitals', price: 500000, description: 'Structured schema, OpenGraph, ranking kilat' },
];

export function NestedCostEstimatorCard() {
  const [staticPagesCount, setStaticPagesCount] = useState<number>(2);
  const [dynamicPagesCount, setDynamicPagesCount] = useState<number>(1);
  const [selectedAddons, setSelectedAddons] = useState<Set<string>>(new Set(['ai']));
  const [clientName, setClientName] = useState<string>('');

  const basePrice = 540000;
  const staticPagePrice = 250000;
  const dynamicPagePrice = 375000; // midpoint of 350-400K

  const toggleAddon = (id: string) => {
    const next = new Set(selectedAddons);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedAddons(next);
  };

  const calculation = useMemo(() => {
    const staticTotal = staticPagesCount * staticPagePrice;
    const dynamicTotal = dynamicPagesCount * dynamicPagePrice;
    let addonsTotal = 0;
    selectedAddons.forEach(id => {
      const mod = ADD_ON_MODULES.find(m => m.id === id);
      if (mod) addonsTotal += mod.price;
    });

    const subtotal = basePrice + staticTotal + dynamicTotal + addonsTotal;
    
    // Estimated timeline calculation in weeks
    let estimatedWeeks = 2;
    if (staticPagesCount > 3 || dynamicPagesCount > 2) estimatedWeeks = 3;
    if (selectedAddons.size >= 2 || dynamicPagesCount > 4) estimatedWeeks = 4;
    if (selectedAddons.has('ai') && selectedAddons.has('cms')) estimatedWeeks = 5;

    return {
      staticTotal,
      dynamicTotal,
      addonsTotal,
      subtotal,
      estimatedWeeks,
    };
  }, [staticPagesCount, dynamicPagesCount, selectedAddons]);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleWhatsAppHandover = () => {
    const addonNames = Array.from(selectedAddons)
      .map(id => ADD_ON_MODULES.find(m => m.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const text = `Halo Mas Chesta! Saya ingin mengamankan estimasi proyek website & AI system dengan spesifikasi berikut:%0A%0A` +
      `• *Base Package:* Rp 540.000 (1 Main Landing + Core Setup)%0A` +
      `• *Halaman Statis:* ${staticPagesCount} halaman (${formatRupiah(calculation.staticTotal)})%0A` +
      `• *Halaman Dinamis:* ${dynamicPagesCount} halaman (${formatRupiah(calculation.dynamicTotal)})%0A` +
      `${addonNames ? `• *Add-on Modul:* ${addonNames} (${formatRupiah(calculation.addonsTotal)})%0A` : ''}` +
      `• *Estimasi Total Investasi:* ${formatRupiah(calculation.subtotal)}%0A` +
      `• *Estimasi Waktu Pengerjaan:* ${calculation.estimatedWeeks} Minggu%0A` +
      `${clientName ? `• *Nama / Brand:* ${clientName}%0A` : ''}%0A` +
      `Mohon arahan untuk langkah pembayaran DP dan kickoff proyek. Terima kasih!`;

    window.open(`https://wa.me/6282125447232?text=${text}`, '_blank');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-3xl mx-auto bg-white border border-purple-200/90 rounded-3xl shadow-xl shadow-purple-900/5 p-6 sm:p-10 font-sans relative overflow-hidden"
    >
      {/* Decorative Top Accent */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider text-purple-800 uppercase">
              CHESTAADOTCOM • Transparent Cost Estimator
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900 tracking-tight">
            Kalkulator Struktur & Biaya Proyek
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Transparan, tanpa biaya tersembunyi. Sesuaikan halaman dan modul sesuai kebutuhan bisnis Anda.
          </p>
        </div>
        <div className="bg-purple-50 border border-purple-200/80 px-4 py-3 rounded-2xl text-right shrink-0">
          <span className="text-[10px] font-mono font-bold uppercase text-purple-700 block">Estimasi Durasi</span>
          <div className="flex items-center gap-1.5 text-purple-950 font-black text-sm mt-0.5 justify-end">
            <Clock size={15} className="text-purple-600" />
            <span>{calculation.estimatedWeeks} Minggu Pengerjaan</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
        {/* Left Configurator Column */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Base Package Fixed Info */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-purple-600 text-white rounded-xl shadow-2xs">
                <ShieldCheck size={18} />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">Base Package Utama</h4>
                <p className="text-[11px] text-slate-500">1 Main Landing Page + Domain .com + Cloud Host 1 Tahun</p>
              </div>
            </div>
            <span className="text-xs sm:text-sm font-black text-purple-700 bg-white px-3 py-1.5 rounded-xl border border-purple-200">
              {formatRupiah(basePrice)}
            </span>
          </div>

          {/* Nested Sub-Pages Sliders */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <FileText size={15} className="text-purple-600" />
              <span>Sub-Halaman & Konten Bersarang</span>
            </h3>

            {/* Static Pages */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-purple-200 transition-all">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Halaman Statis Tambahan</span>
                  <span className="text-[11px] text-slate-400">@ Rp 250.000 / halaman (About, Contact, Terms, dll)</span>
                </div>
                <span className="text-xs font-black text-purple-900 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-100">
                  {staticPagesCount} hal • {formatRupiah(calculation.staticTotal)}
                </span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="10" 
                value={staticPagesCount}
                onChange={(e) => setStaticPagesCount(parseInt(e.target.value))}
                className="w-full accent-purple-600 mt-2 cursor-pointer"
              />
            </div>

            {/* Dynamic Pages */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-purple-200 transition-all">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Halaman Dinamis / CMS Bersarang</span>
                  <span className="text-[11px] text-slate-400">@ Rp 375.000 / hal (Blog, Portfolio, Catalog, Product Detail)</span>
                </div>
                <span className="text-xs font-black text-purple-900 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-100">
                  {dynamicPagesCount} hal • {formatRupiah(calculation.dynamicTotal)}
                </span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="10" 
                value={dynamicPagesCount}
                onChange={(e) => setDynamicPagesCount(parseInt(e.target.value))}
                className="w-full accent-purple-600 mt-2 cursor-pointer"
              />
            </div>
          </div>

          {/* Add-on Modules */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <Cpu size={15} className="text-purple-600" />
              <span>Modul Tambahan & Integrasi Canggih</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {ADD_ON_MODULES.map((mod) => {
                const isSelected = selectedAddons.has(mod.id);
                return (
                  <button
                    key={mod.id}
                    type="button"
                    onClick={() => toggleAddon(mod.id)}
                    className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                      isSelected 
                        ? 'bg-purple-50/70 border-purple-300 shadow-2xs ring-1 ring-purple-300' 
                        : 'bg-white border-slate-200 hover:border-purple-200 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className={`text-xs font-bold ${isSelected ? 'text-purple-950' : 'text-slate-800'}`}>
                        {mod.name}
                      </span>
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${isSelected ? 'bg-purple-900 text-white' : 'border border-slate-300'}`}>
                        <Check size={10} className={isSelected ? 'opacity-100' : 'opacity-0'} />
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-tight mb-2">{mod.description}</p>
                    <span className="text-[11px] font-mono font-bold text-purple-700">
                      +{formatRupiah(mod.price)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Summary & Handover Column */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-purple-50/40 border border-purple-100 rounded-3xl p-6">
          <div className="space-y-5">
            <h3 className="text-sm font-display font-bold text-slate-900 flex items-center gap-2">
              <Layers size={18} className="text-purple-600" />
              <span>Rincian Investasi Proyek</span>
            </h3>

            {/* Line items */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between pb-2 border-b border-purple-100/60">
                <span className="text-slate-600">Base Package (Utama)</span>
                <span className="font-semibold text-slate-900">{formatRupiah(basePrice)}</span>
              </div>
              {staticPagesCount > 0 && (
                <div className="flex justify-between pb-2 border-b border-purple-100/60">
                  <span className="text-slate-600">{staticPagesCount}x Halaman Statis</span>
                  <span className="font-semibold text-slate-900">{formatRupiah(calculation.staticTotal)}</span>
                </div>
              )}
              {dynamicPagesCount > 0 && (
                <div className="flex justify-between pb-2 border-b border-purple-100/60">
                  <span className="text-slate-600">{dynamicPagesCount}x Halaman Dinamis</span>
                  <span className="font-semibold text-slate-900">{formatRupiah(calculation.dynamicTotal)}</span>
                </div>
              )}
              {selectedAddons.size > 0 && (
                <div className="flex justify-between pb-2 border-b border-purple-100/60">
                  <span className="text-slate-600">Modul Tambahan ({selectedAddons.size})</span>
                  <span className="font-semibold text-slate-900">{formatRupiah(calculation.addonsTotal)}</span>
                </div>
              )}
            </div>

            {/* Total Highlight */}
            <div className="p-4 bg-white rounded-2xl border border-purple-200 shadow-sm">
              <span className="text-[10px] font-mono uppercase font-bold text-purple-800 block">Total Investasi Transparan</span>
              <div className="text-2xl sm:text-3xl font-display font-black text-slate-900 mt-1">
                {formatRupiah(calculation.subtotal)}
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">Sudah termasuk garansi error 1 tahun & source code 100% hak milik.</p>
            </div>

            {/* Optional Client Name Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Nama Brand / Perusahaan Anda (Opsional)
              </label>
              <input 
                type="text" 
                placeholder="Contoh: PT Digital Karya Nusantara"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-purple-600 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 shadow-2xs"
              />
            </div>
          </div>

          {/* WhatsApp Handover CTA Button */}
          <div className="pt-6 mt-6 border-t border-purple-100">
            <motion.button
              type="button"
              onClick={handleWhatsAppHandover}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 px-6 bg-purple-900 text-white font-sans font-bold text-xs sm:text-sm rounded-2xl hover:bg-purple-800 shadow-lg shadow-purple-950/20 transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
            >
              <MessageCircle size={18} className="text-purple-300" />
              <span>Amankan Estimasi & Konsultasi via WhatsApp</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <p className="text-[11px] text-center text-slate-500 mt-2.5">
              Terhubung langsung dengan Mas Chesta (Principal Architect).
            </p>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
