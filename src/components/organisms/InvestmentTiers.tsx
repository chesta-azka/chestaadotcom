'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Sparkles, ArrowRight, ShieldCheck, TrendingUp, DollarSign } from 'lucide-react';

interface PricingTier {
  id: string;
  name: string;
  badge: string;
  price: string;
  costViewPrice: string;
  originalPrice?: string;
  period: string;
  description: string;
  highlighted: boolean;
  features: string[];
  roiFeatures: string[];
  ctaText: string;
  ctaMessage: string;
}

const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Mesin Validasi Kilat",
    badge: "UMKM & Validasi Pasar",
    price: "Biaya Admin 5 Thn: -180 Juta",
    costViewPrice: "Rp 540.000",
    originalPrice: "Rp 1.200.000",
    period: "sekali bayar • 100% hak milik",
    description: "Website sub-detik untuk validasi pasar dan konversi iklan seketika.",
    highlighted: false,
    features: [
      "Siap jualan dalam 1–3 hari kerja",
      "Performa loading instan (< 0.2s)",
      "Gratis Domain .com & Cloud Server 1 Tahun",
      "Formulir langsung terhubung ke WhatsApp",
      "100% Hak Milik Aset (Tanpa Biaya Sewa)"
    ],
    roiFeatures: [
      "Penghematan Gaji Admin: +150 Juta/thn",
      "Lonjakan Closing Rate: +210%",
      "Zero Downtime & Zero Malware Cost",
      "ROI Lunas dalam 1 Minggu Pertama"
    ],
    ctaText: "Amankan Promo Rp 540K",
    ctaMessage: "Halo Mas Chesta! Saya mau ambil paket promo Mesin Validasi Kilat Rp 540.000."
  },
  {
    id: "scale",
    name: "Scale Enterprise",
    badge: "Dominasi Skala Menengah",
    price: "Biaya Operasional Manual: -300 Juta",
    costViewPrice: "Rp 1.850.000",
    originalPrice: "Rp 3.500.000",
    period: "sekali bayar • aset mandiri selamanya",
    description: "Arsitektur multi-halaman dengan asisten cerdas 24/7 pelipatganda sales.",
    highlighted: true,
    features: [
      "Arsitektur Multi-Halaman Eksklusif",
      "Asisten Cerdas 24/7 (Saring Prospek Otomatis)",
      "Sistem Katalog Interaktif Tanpa Lemot",
      "Optimasi SEO & Kecepatan Standar Korporat",
      "Panel Kelola Konten Mandiri",
      "Handover Source Code & 100% Bebas Biaya Bulanan"
    ],
    roiFeatures: [
      "Penghematan Operasional AI: +250 Juta",
      "Otomatisasi Lead Response 60 Detik",
      "Dominasi Peringkat Google Lokal BSD",
      "Payback Period Instan < 14 Hari"
    ],
    ctaText: "Pilih Scale Enterprise",
    ctaMessage: "Halo Mas Chesta! Saya tertarik dengan paket Scale Enterprise Rp 1.850.000."
  },
  {
    id: "corporate",
    name: "Ekosistem Korporat Mandiri",
    badge: "Autonomous Engine Skala Penuh",
    price: "Kerugian Human Error: -750 Juta",
    costViewPrice: "Mulai Rp 4.500.000",
    period: "investasi kustom • custom architecture",
    description: "Sistem otomasi terintegrasi skala penuh peniup habis human-error operasional.",
    highlighted: false,
    features: [
      "Custom Workflow & Multi-User Access",
      "Zero-Error Data Integration (Sinkronisasi Otomatis)",
      "Proteksi Keamanan Berlapis Standar Perbankan",
      "Handover Source Code 100% Hak Milik",
      "Dukungan Prioritas VIP SLA Langsung Principal"
    ],
    roiFeatures: [
      "Proteksi Margin Korporat: +500 Juta+",
      "Eliminasi Total Human Error",
      "Infrastruktur Cloud Enterprise Skalabel",
      "Dukungan Prioritas VIP Langsung"
    ],
    ctaText: "Konsultasi Korporat",
    ctaMessage: "Halo Mas Chesta! Perusahaan kami membutuhkan Ekosistem Korporat Mandiri."
  }
];

export default function InvestmentTiers() {
  const [isProfitMode, setIsProfitMode] = useState(false);

  const handleOpenWhatsApp = (message: string) => {
    window.open(`https://wa.me/6282125447232?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section className="w-full py-16 md:py-24 relative bg-white" id="pricing">
      {/* Background Spatial Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-purple-200/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header with Extreme Typographic Hierarchy */}
        <div className="text-center max-w-4xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono font-medium tracking-[0.2em] text-slate-500 uppercase block">
            06. Investasi &amp; Paket Layanan
          </span>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-slate-950 leading-[1.15] text-balance">
            Pilih Paket Dominasi Bisnis Anda
          </h2>

          <p className="text-slate-600 mt-4 text-base md:text-lg font-normal max-w-2xl mx-auto leading-relaxed text-balance">
            Bayar sekali, miliki aset selamanya tanpa biaya sewa platform bulanan.
          </p>

          {/* Mode Biaya vs Mode Profit (ROI) Toggle Switch */}
          <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-full bg-slate-100 border border-slate-200 shadow-inner">
            <button
              onClick={() => setIsProfitMode(false)}
              className={`px-6 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer ${
                !isProfitMode ? 'bg-purple-900 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <b>Mode Biaya</b>
            </button>
            <button
              onClick={() => setIsProfitMode(true)}
              className={`px-6 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer ${
                isProfitMode ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <b>Mode Profit (ROI)</b>
            </button>
          </div>
          <div className="mt-2 text-[11px] font-mono text-slate-500 uppercase tracking-widest">
            {isProfitMode ? 'Menampilkan Perbandingan Penghematan Operasional & Profit Bersih' : 'Menampilkan Struktur Investasi Inisial Sekali Bayar'}
          </div>
        </div>

        {/* 3 Pricing Matrices with Framer Motion Flip Animation */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {pricingTiers.map((tier) => (
            <motion.div
              key={tier.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={`rounded-[2.25rem] p-8 sm:p-10 flex flex-col justify-between relative transition-all duration-300 ${
                tier.highlighted
                  ? isProfitMode ? 'bg-slate-950 text-white shadow-2xl border-2 border-emerald-500/80 ring-4 ring-emerald-500/20 lg:scale-105 z-20 relative' : 'bg-[#120f1d] text-white shadow-2xl shadow-slate-900/10 border border-purple-900/40 lg:scale-105 z-20 relative'
                  : isProfitMode ? 'bg-slate-900 text-white border border-emerald-500/30 shadow-xl z-10' : 'bg-slate-50/80 border border-slate-200/90 text-slate-900 shadow-xl shadow-slate-200/40 hover:border-purple-300 z-10'
              }`}
            >
              {/* Refined corporate badge on middle tier */}
              {tier.highlighted && (
                <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-[10px] font-medium font-mono tracking-[0.15em] shadow-xs border uppercase whitespace-nowrap ${
                  isProfitMode ? 'bg-emerald-600 text-white border-emerald-400' : 'bg-purple-900 text-white border-purple-700'
                }`}>
                  {isProfitMode ? '⭐ MAX ROI & PENGHEMATAN' : '⭐ PALING DIMINATI KORPORAT'}
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className={`text-[10px] font-medium uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-xs ${
                    tier.highlighted || isProfitMode
                      ? 'bg-purple-900/60 text-purple-200 border border-purple-500/40' 
                      : 'bg-white text-purple-700 border border-purple-200/80'
                  }`}>
                    {tier.badge}
                  </span>
                </div>

                <h3 className={`text-2xl sm:text-3xl font-medium mb-2 tracking-tight ${tier.highlighted || isProfitMode ? 'text-white' : 'text-slate-900'}`}>
                  {tier.name}
                </h3>
                <p className={`text-xs sm:text-sm font-normal mb-6 leading-relaxed ${tier.highlighted || isProfitMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  {tier.description}
                </p>

                <div className={`mb-6 pb-6 border-b ${tier.highlighted || isProfitMode ? 'border-purple-700/50' : 'border-slate-200/80'}`}>
                  <div className="flex items-baseline gap-3">
                    <span className={`text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight ${isProfitMode ? 'text-emerald-400 font-mono font-bold' : tier.highlighted ? 'text-white' : 'text-slate-900'}`}>
                      {isProfitMode ? tier.price : tier.costViewPrice}
                    </span>
                    {!isProfitMode && tier.originalPrice && (
                      <span className="text-xs sm:text-sm font-sans text-slate-400 line-through">
                        {tier.originalPrice}
                      </span>
                    )}
                  </div>
                  <p className={`text-xs font-mono mt-2 font-medium ${isProfitMode ? 'text-emerald-300' : 'text-purple-700'}`}>
                    {isProfitMode ? 'Dihitung berdasarkan efisiensi operasional 5 tahun' : tier.period}
                  </p>
                </div>

                {/* Features List (Switches between standard specs and ROI metrics) */}
                <div className="space-y-3 mb-8">
                  <span className={`text-[11px] font-mono font-medium uppercase tracking-wider block ${isProfitMode ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}>
                    {isProfitMode ? 'Metrik Profit &amp; Penghematan ROI:' : 'Spesifikasi &amp; Fasilitas:'}
                  </span>
                  <ul className="space-y-3">
                    {(isProfitMode ? tier.roiFeatures : tier.features).map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-sans">
                        <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                          isProfitMode 
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                            : tier.highlighted ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-800'
                        }`}>
                          <Check size={10} strokeWidth={2.5} />
                        </div>
                        <span className={isProfitMode ? 'text-emerald-300 font-medium' : tier.highlighted ? 'text-slate-200' : 'text-slate-700'}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card CTA Actions */}
              <div className="pt-4 border-t border-slate-100/10 mt-auto space-y-2.5">
                <button
                  onClick={() => handleOpenWhatsApp(tier.ctaMessage)}
                  className={`w-full py-3.5 px-5 rounded-xl font-sans text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isProfitMode
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30'
                      : tier.highlighted
                        ? 'bg-purple-900 hover:bg-purple-800 text-white shadow-sm'
                        : 'bg-slate-900 hover:bg-purple-950 text-white shadow-sm'
                  }`}
                >
                  <Sparkles size={16} className={isProfitMode ? 'text-emerald-200' : tier.highlighted ? 'text-white' : 'text-purple-300'} />
                  <span><b>{tier.ctaText}</b></span>
                  <ArrowRight size={14} className="opacity-80" />
                </button>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
