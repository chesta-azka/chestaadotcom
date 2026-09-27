"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, MessageCircle, ArrowRight, Layers, FileText, Cpu, ShieldCheck, Clock, Sparkles } from 'lucide-react';

interface AddOnModule {
  id: string;
  name: string;
  price: number;
  description: string;
}

const ADD_ON_MODULES: AddOnModule[] = [
  { id: 'ai', name: 'Integrasi AI Agent / Chatbot', price: 1500000, description: 'Google Gemini kontekstual 24/7 dengan data bisnis' },
  { id: 'zod', name: 'Zod Validation & Secure API', price: 350000, description: 'Validasi form type-safe & proteksi server rate-limit' },
  { id: 'cms', name: 'Custom CMS / Database Dashboard', price: 750000, description: 'Manajemen konten mandiri dengan Cloud Firestore' },
  { id: 'seo', name: 'Optimasi SEO & Core Web Vitals', price: 500000, description: 'Structured JSON-LD schema, OpenGraph, ranking kilat' },
];

interface PresetConfig {
  name: string;
  badge: string;
  staticCount: number;
  dynamicCount: number;
  addons: string[];
}

const PRESETS: PresetConfig[] = [
  {
    name: 'Starter Landing',
    badge: 'Uji Coba Kilat',
    staticCount: 0,
    dynamicCount: 0,
    addons: []
  },
  {
    name: 'Essential Profil',
    badge: 'Otoritas Brand',
    staticCount: 2,
    dynamicCount: 0,
    addons: ['seo']
  },
  {
    name: 'Growth Otomasi',
    badge: 'Paling Populer',
    staticCount: 3,
    dynamicCount: 2,
    addons: ['cms', 'zod']
  },
  {
    name: 'Enterprise AI',
    badge: 'Skala Penuh',
    staticCount: 4,
    dynamicCount: 3,
    addons: ['ai', 'cms', 'seo', 'zod']
  }
];

export function NestedCostEstimatorCard() {
  const [staticPagesCount, setStaticPagesCount] = useState<number>(2);
  const [dynamicPagesCount, setDynamicPagesCount] = useState<number>(1);
  const [selectedAddons, setSelectedAddons] = useState<Set<string>>(new Set(['ai']));
  const [clientName, setClientName] = useState<string>('');

  const basePrice = 540000;
  const staticPagePrice = 250000;
  const dynamicPagePrice = 375000;

  const toggleAddon = (id: string) => {
    const next = new Set(selectedAddons);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedAddons(next);
  };

  const applyPreset = (preset: PresetConfig) => {
    setStaticPagesCount(preset.staticCount);
    setDynamicPagesCount(preset.dynamicCount);
    setSelectedAddons(new Set(preset.addons));
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

  const whatsappUrl = useMemo(() => {
    const addonNames = Array.from(selectedAddons)
      .map(id => ADD_ON_MODULES.find(m => m.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const text = `Halo Mas Chesta! Saya mengonfigurasi estimasi proyek website di CHESTAADOTCOM dengan rincian berikut:\n\n` +
      `• Base Package: Rp 540.000 (1 Main Landing + Core Setup)\n` +
      `• Halaman Statis: ${staticPagesCount} halaman (${formatRupiah(calculation.staticTotal)})\n` +
      `• Halaman Dinamis: ${dynamicPagesCount} halaman (${formatRupiah(calculation.dynamicTotal)})\n` +
      `${addonNames ? `• Add-on Modul: ${addonNames} (${formatRupiah(calculation.addonsTotal)})\n` : ''}` +
      `• Estimasi Total: ${formatRupiah(calculation.subtotal)}\n` +
      `• Estimasi Durasi: ${calculation.estimatedWeeks} Minggu\n` +
      `${clientName ? `• Nama Brand/Klien: ${clientName}\n` : ''}\n` +
      `Mohon konfirmasi ketersediaan jadwal kickoff. Terima kasih!`;

    return `https://wa.me/6282125447232?text=${encodeURIComponent(text)}`;
  }, [selectedAddons, staticPagesCount, dynamicPagesCount, calculation, clientName]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto bg-white border border-purple-200/90 rounded-3xl shadow-xl p-6 sm:p-10 font-sans relative overflow-hidden"
      id="calculator"
    >
      {/* Decorative Top Accent */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider text-purple-800 uppercase">
              Kalkulator Transparan CHESTAADOTCOM
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
            Kalkulator Struktur &amp; Biaya Proyek
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Transparan, tanpa biaya tersembunyi. Sesuaikan jumlah halaman dan modul pendukung sesuai kebutuhan riil bisnis Anda.
          </p>
        </div>
        <div className="bg-purple-50 border border-purple-200/80 px-4 py-3 rounded-2xl text-right shrink-0">
          <span className="text-[10px] font-mono font-bold uppercase text-purple-700 block">Estimasi Durasi</span>
          <div className="flex items-center gap-1.5 text-purple-950 font-bold text-sm mt-0.5 justify-end">
            <Clock size={15} className="text-purple-600" />
            <span>{calculation.estimatedWeeks} Minggu Pengerjaan</span>
          </div>
        </div>
      </div>

      {/* Instant Presets Bar */}
      <div className="pt-6 pb-2">
        <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block mb-3">
          Pilihan Cepat Sesuai Fase Bisnis:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {PRESETS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => applyPreset(preset)}
              className="p-3 rounded-xl border border-slate-200 hover:border-purple-300 hover:bg-purple-50/50 text-left transition-all cursor-pointer group shadow-2xs"
            >
              <div className="text-[10px] font-mono font-bold text-purple-700 uppercase mb-0.5">{preset.badge}</div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-purple-900">{preset.name}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
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
                <p className="text-[11px] text-slate-500">1 Main Landing Page + Domain Resmi .com + Cloud Edge</p>
              </div>
            </div>
            <span className="text-xs sm:text-sm font-bold text-purple-800 bg-white px-3 py-1.5 rounded-xl border border-purple-200">
              {formatRupiah(basePrice)}
            </span>
          </div>

          {/* Nested Sub-Pages Sliders */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <FileText size={15} className="text-purple-600" />
              <span>Sub-Halaman &amp; Konten Tambahan</span>
            </h3>

            {/* Static Pages */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-purple-200 transition-all">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Halaman Statis Tambahan</span>
                  <span className="text-[11px] text-slate-400">@ Rp 250.000 / halaman (About, Contact, Terms, Layanan)</span>
                </div>
                <span className="text-xs font-bold text-purple-900 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-100">
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
                  <span className="text-[11px] text-slate-400">@ Rp 375.000 / hal (Blog, Portofolio, Katalog, Detail Produk)</span>
                </div>
                <span className="text-xs font-bold text-purple-900 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-100">
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
              <span>Modul Tambahan &amp; Integrasi Canggih</span>
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

        {/* Right Summary Column */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-purple-50/40 border border-purple-100 rounded-3xl p-6">
          <div className="space-y-5">
            <h3 className="text-sm font-display font-bold text-slate-900 flex items-center gap-2">
              <Layers size={18} className="text-purple-600" />
              <span>Rincian Investasi Proyek</span>
            </h3>

            {/* Line items */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between pb-2 border-b border-purple-100/60">
                <span className="text-slate-600">Base Package Utama</span>
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
              <div className="text-2xl sm:text-3xl font-display font-bold text-slate-900 mt-1">
                {formatRupiah(calculation.subtotal)}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Sudah mencakup garansi bebas bug &amp; 100% hak milik kode sumber.</p>
            </div>

            {/* Optional Client Name Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Nama Brand / Perusahaan Anda (Opsional)
              </label>
              <input 
                type="text" 
                placeholder="Contoh: PT Digital Karya BSD"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-purple-600 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 shadow-2xs"
              />
            </div>
          </div>

          {/* WhatsApp Handover Link Anchor */}
          <div className="pt-6 mt-6 border-t border-purple-100">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 bg-purple-900 text-white font-sans font-bold text-xs sm:text-sm rounded-2xl hover:bg-purple-800 shadow-lg shadow-purple-950/20 transition-all flex items-center justify-center gap-2.5 cursor-pointer group text-center"
            >
              <MessageCircle size={18} className="text-purple-300" />
              <span>Amankan Estimasi via WhatsApp</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <p className="text-[11px] text-center text-slate-500 mt-2.5">
              Terhubung langsung dengan Mas Chesta (Principal Architect).
            </p>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
