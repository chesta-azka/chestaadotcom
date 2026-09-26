'use client';

import React from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface PricingTier {
  id: string;
  name: string;
  badge: string;
  price: string;
  originalPrice?: string;
  period: string;
  description: string;
  highlighted: boolean;
  features: string[];
  ctaText: string;
  ctaMessage: string;
}

const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Mesin Validasi Kilat",
    badge: "UMKM & Validasi Pasar",
    price: "Rp 540.000",
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
    ctaText: "Amankan Promo Rp 540K",
    ctaMessage: "Halo Mas Chesta! Saya mau ambil paket promo Mesin Validasi Kilat Rp 540.000 (domain .com + cloud server 1 tahun). Masih tersedia kuotanya?"
  },
  {
    id: "scale",
    name: "Scale Enterprise",
    badge: "Dominasi Skala Menengah",
    price: "Rp 1.850.000",
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
    ctaText: "Pilih Scale Enterprise",
    ctaMessage: "Halo Mas Chesta! Saya tertarik dengan paket Scale Enterprise Rp 1.850.000 untuk meningkatkan kapasitas closing dan efisiensi bisnis kami."
  },
  {
    id: "corporate",
    name: "Ekosistem Korporat Mandiri",
    badge: "Autonomous Engine Skala Penuh",
    price: "Mulai Rp 4.500.000",
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
    ctaText: "Konsultasi Korporat",
    ctaMessage: "Halo Mas Chesta! Perusahaan kami membutuhkan Ekosistem Korporat Mandiri (Autonomous Business Engine). Mohon info ketersediaan sesi konsultasi teknis."
  }
];

export default function InvestmentTiers() {
  const handleOpenWhatsApp = (message: string) => {
    window.open(`https://wa.me/6282125447232?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section className="w-full py-16 md:py-24 relative bg-white" id="pricing">
      {/* Background Spatial Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-purple-200/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header with Extreme Typographic Hierarchy */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200/80 text-purple-700 text-xs font-mono font-medium mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span className="tracking-widest uppercase">INVESTASI TRANSPARAN &amp; MUTLAK</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-slate-950 leading-[1.15] text-balance flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-purple-100/80 border border-purple-200/80 text-purple-900 shadow-xs shrink-0">
              <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 stroke-[1.8]" />
            </span>
            <span>Pilih Paket Dominasi Bisnis Anda</span>
          </h2>
          <p className="text-slate-600 mt-4 text-base md:text-lg font-normal max-w-2xl mx-auto leading-relaxed text-balance">
            Bayar sekali, miliki aset selamanya tanpa biaya sewa platform bulanan.
          </p>
        </div>

        {/* 3 Pricing Matrices: Scale Enterprise Spatially Dominates with Refined Deep Surface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {pricingTiers.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-[2.25rem] p-8 sm:p-10 flex flex-col justify-between relative transition-all duration-300 ${
                tier.highlighted
                  ? 'bg-[#120f1d] text-white shadow-2xl shadow-slate-900/10 border border-purple-900/40 lg:scale-105 z-20 relative'
                  : 'bg-slate-50/80 border border-slate-200/90 text-slate-900 shadow-xl shadow-slate-200/40 hover:border-purple-300 z-10'
              }`}
            >
              {/* Refined corporate badge on middle tier */}
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-purple-900 text-white text-[10px] font-medium font-mono tracking-[0.15em] shadow-xs border border-purple-700 uppercase whitespace-nowrap">
                  ⭐ PALING DIMINATI KORPORAT
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className={`text-[10px] font-medium uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-xs ${
                    tier.highlighted 
                      ? 'bg-purple-900/60 text-purple-200 border border-purple-500/40' 
                      : 'bg-white text-purple-700 border border-purple-200/80'
                  }`}>
                    {tier.badge}
                  </span>
                </div>

                <h3 className={`text-2xl sm:text-3xl font-medium mb-2 tracking-tight ${tier.highlighted ? 'text-white' : 'text-slate-900'}`}>
                  {tier.name}
                </h3>
                <p className={`text-xs sm:text-sm font-normal mb-6 leading-relaxed ${tier.highlighted ? 'text-slate-300' : 'text-slate-600'}`}>
                  {tier.description}
                </p>

                <div className={`mb-6 pb-6 border-b ${tier.highlighted ? 'border-purple-700/50' : 'border-slate-200/80'}`}>
                  <div className="flex items-baseline gap-3">
                    <span className={`text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight ${tier.highlighted ? 'text-white' : 'text-slate-900'}`}>
                      {tier.price}
                    </span>
                    {tier.originalPrice && (
                      <span className="text-xs sm:text-sm text-rose-500 line-through font-medium font-mono">
                        {tier.originalPrice}
                      </span>
                    )}
                  </div>
                  <span className={`text-xs font-mono font-medium mt-1.5 block uppercase tracking-wider ${tier.highlighted ? 'text-purple-300' : 'text-slate-500'}`}>
                    {tier.period}
                  </span>
                </div>

                {/* Features List with Short High-Impact Bullet Points */}
                <div className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        tier.highlighted ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-700'
                      }`}>
                        <Check size={11} className="stroke-[2.5]" />
                      </div>
                      <span className={`leading-tight ${tier.highlighted ? 'text-slate-200 font-normal' : 'text-slate-700 font-normal'}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action CTA */}
              <div className={`pt-4 border-t ${tier.highlighted ? 'border-purple-700/50' : 'border-slate-200/80'}`}>
                <button
                  onClick={() => handleOpenWhatsApp(tier.ctaMessage)}
                  className={`w-full py-4 rounded-2xl font-medium text-sm tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                    tier.highlighted
                      ? 'bg-purple-900 hover:bg-purple-800 text-white shadow-sm border border-purple-800'
                      : 'bg-slate-900 hover:bg-purple-950 text-white shadow-sm'
                  }`}
                >
                  <span>{tier.ctaText}</span>
                  <ArrowRight size={16} />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Trust Guarantee Banner */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span className="text-xs sm:text-sm font-medium text-slate-700">
              Garansi Kepemilikan Mutlak: <strong>Source Code Diserahkan 100%</strong> • Bebas Royalti &amp; Tanpa Biaya Bulanan.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
