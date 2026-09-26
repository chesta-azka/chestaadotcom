"use client";

import { useState } from 'react';
import { motion } from 'motion/react';
import { Check, MessageCircle, Sparkles, Zap, ShieldCheck, ArrowRight, Layers, Cpu, FileText } from 'lucide-react';
import AnimatedHeading from '../atoms/AnimatedHeading';

interface PricingTier {
  id: string;
  name: string;
  badge?: string;
  price: string;
  originalPrice?: string;
  period: string;
  description: string;
  highlighted?: boolean;
  features: string[];
  ctaText: string;
  ctaMessage: string;
}

const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter / UMKM",
    badge: "Promo Spesial",
    price: "Rp 540.000",
    originalPrice: "Rp 750.000",
    period: "all-in tahun pertama",
    description: "Solusi kilat dan elegan untuk UMKM, toko fisik, dan profesional yang ingin eksis online dengan domain resmi dan kecepatan tinggi.",
    highlighted: false,
    features: [
      "Gratis Domain .COM / .ID (1 Tahun Penuh)",
      "1 Main Landing Page Desain Eksklusif",
      "Performa Kecepatan Tinggi (PageSpeed 95+)",
      "Optimasi SEO Google & OpenGraph Standar",
      "Integrasi Tombol WhatsApp Direct Chat",
      "Hosting Cloud Cepat & SSL HTTPS Aktif",
      "100% Hak Milik Source Code Tanpa Lock-in",
      "Pengerjaan Kilat 1–3 Hari Selesai"
    ],
    ctaText: "Pilih Paket Starter",
    ctaMessage: "Halo Mas Chesta! Saya ingin memesan Paket Starter UMKM Rp540K all-in domain .com. Mohon info langkah pengerjaannya."
  },
  {
    id: "professional",
    name: "Professional Growth",
    badge: "Paling Populer • Best Value",
    price: "Rp 1.850.000",
    originalPrice: "Rp 2.800.000",
    period: "investasi per proyek",
    description: "Arsitektur web kustom berperforma tinggi untuk bisnis yang memerlukan multi-halaman profesional, CMS ringan, dan konversi tinggi.",
    highlighted: true,
    features: [
      "Arsitektur Web Kustom App Router Berkecepatan Tinggi",
      "Hingga 5-7 Sub-Halaman & Konten Bersarang",
      "Sistem CMS Ringan untuk Update Data Mandiri",
      "Desain Eksklusif Tailwind CSS (Tanpa Template)",
      "Optimasi SEO On-Page Mendalam & Schema Markup",
      "Formulir Interaktif Zod Validation & Endpoint Aman",
      "Setup Google Analytics & Meta Pixel Tracking",
      "Garansi Maintenance & Pemeliharaan 30 Hari"
    ],
    ctaText: "Pilih Professional Growth",
    ctaMessage: "Halo Mas Chesta! Saya tertarik dengan Paket Professional Growth Rp1.850K. Bisa jadwalkan diskusi kebutuhan proyek saya?"
  },
  {
    id: "enterprise",
    name: "Enterprise AI-SaaS",
    badge: "Custom Engineering",
    price: "Mulai Rp 4.500.000",
    period: "berdasarkan cakupan modul",
    description: "Sistem aplikasi web tingkat lanjut dengan integrasi AI Agent otonom 24/7, database cloud, dan manajemen data real-time.",
    highlighted: false,
    features: [
      "Integrasi Agen AI Otonom 24/7 (Gemini 2.5 / Groq)",
      "Full-Stack Arsitektur Web + Secure Cloud Data Vault",
      "Sistem Autentikasi Pengguna & Role Management (RBAC)",
      "Dashboard Admin Kustom & Analitik Operasional",
      "Otomatisasi WhatsApp Gateway & Webhook Eksternal",
      "Keamanan Data Ketat & Zero-Retention Policy",
      "Dokumentasi Teknis & Handover Source Code 100%",
      "Dukungan Prioritas VIP SLA Langsung dari Principal"
    ],
    ctaText: "Diskusikan Enterprise",
    ctaMessage: "Halo Mas Chesta! Perusahaan kami membutuhkan arsitektur Enterprise AI-SaaS custom. Mohon info ketersediaan sesi konsultasi teknis."
  }
];

const modularAddons = [
  { name: "Halaman Statis Tambahan", price: "Rp 250.000 / hal", desc: "Cocok untuk halaman About, Contact, Terms, Privacy Policy." },
  { name: "Halaman Dinamis / CMS", price: "Rp 350.000 - Rp 400.000 / hal", desc: "Dilengkapi database & form input untuk Blog, Portfolio, Katalog Produk." },
  { name: "Integrasi AI Agent / Chatbot", price: "Mulai Rp 1.500.000", desc: "Asisten AI kontekstual 24/7 untuk menjawab tanya-jawab pelanggan secara instan." },
  { name: "Custom Admin Dashboard", price: "Mulai Rp 750.000", desc: "Panel kontrol privat untuk rekap data, manajemen lead, dan statistik operasional." },
];

export default function PricingSection() {
  const handleOpenWhatsApp = (message: string) => {
    window.open(`https://wa.me/6282125447232?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-white z-10 font-sans" id="pricing">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 mb-4">
            <Sparkles size={13} className="text-purple-700" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-purple-900">
              Enterprise Pricing &amp; Modular Matrix
            </span>
          </div>
          
          <AnimatedHeading as="h2" className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-slate-950 tracking-tight leading-[1.15] mb-4">
            Investasi Transparan. <br />
            <span className="text-purple-700">Tanpa Biaya Tersembunyi.</span>
          </AnimatedHeading>
          
          <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed">
            Pilih paket yang paling relevan dengan skala bisnis Anda. Seluruh paket dirancang dengan standar arsitektur bersih dan performa maksimal.
          </p>
        </div>

        {/* 3-Tier Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch mb-20">
          {pricingTiers.map((tier) => {
            const isHighlighted = tier.highlighted;

            return (
              <div
                key={tier.id}
                className={`relative flex flex-col justify-between rounded-3xl transition-all duration-200 ${
                  isHighlighted 
                    ? 'bg-white border-2 border-purple-500 shadow-xl shadow-purple-600/10 ring-4 ring-purple-100/60 lg:-translate-y-2' 
                    : 'bg-white border border-purple-200/90 shadow-sm hover:border-purple-300'
                } p-6 sm:p-8`}
              >
                {/* Highlighted Ribbon Badge */}
                {isHighlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 bg-purple-900 text-white font-sans text-xs font-medium px-4 py-1.5 rounded-full shadow-sm border border-purple-800">
                      <Zap size={13} className="text-amber-300 fill-amber-300" />
                      {tier.badge}
                    </span>
                  </div>
                )}

                {/* Card Top Information */}
                <div>
                  <div className="mb-4">
                    {!isHighlighted && tier.badge && (
                      <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md inline-block mb-3 border border-purple-200/80">
                        {tier.badge}
                      </span>
                    )}
                    <h3 className="text-xl sm:text-2xl font-display font-medium text-slate-900 tracking-tight">
                      {tier.name}
                    </h3>
                  </div>

                  {/* Price Block */}
                  <div className="mb-5 pb-5 border-b border-slate-100">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-display font-medium text-slate-950 tracking-tight">
                        {tier.price}
                      </span>
                      {tier.originalPrice && (
                        <span className="text-xs sm:text-sm font-sans text-slate-400 line-through">
                          {tier.originalPrice}
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-mono text-purple-700 font-medium mt-1">
                      {tier.period}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 font-sans text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                    {tier.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-slate-400 block">
                      Spesifikasi &amp; Fasilitas:
                    </span>
                    <ul className="space-y-2.5">
                      {tier.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-sans text-slate-700">
                          <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                            isHighlighted ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-800'
                          }`}>
                            <Check size={10} strokeWidth={2.5} />
                          </div>
                          <span className={isHighlighted && idx < 3 ? "font-medium text-slate-900" : ""}>
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card CTA Actions */}
                <div className="pt-4 border-t border-slate-100 mt-auto space-y-2.5">
                  <button
                    onClick={() => handleOpenWhatsApp(tier.ctaMessage)}
                    className={`w-full py-3.5 px-5 rounded-xl font-sans text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isHighlighted
                        ? 'bg-purple-900 hover:bg-purple-800 text-white shadow-sm'
                        : 'bg-slate-900 hover:bg-purple-950 text-white shadow-sm'
                    }`}
                  >
                    <MessageCircle size={16} className={isHighlighted ? "text-white" : "text-purple-300"} />
                    <span>{tier.ctaText}</span>
                    <ArrowRight size={14} className="opacity-80" />
                  </button>

                  {isHighlighted && (
                    <p className="text-[11px] text-center text-slate-500 font-medium flex items-center justify-center gap-1.5 pt-1">
                      <ShieldCheck size={13} className="text-purple-600" />
                      <span>Garansi pengerjaan rapi &amp; domain langsung aktif</span>
                    </p>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* TRANSPARENT ADD-ON & SUB-PAGE MATRIX BELOW */}
        <div className="max-w-5xl mx-auto bg-purple-50/40 border border-purple-200/80 rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-purple-700 text-xs font-mono font-medium uppercase tracking-wider mb-3 border border-purple-200">
              <Layers size={13} /> Matriks Add-on &amp; Sub-Halaman Bersarang
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-medium tracking-tight text-slate-950">
              Kustomisasi Modul Sesuai Kebutuhan
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 font-sans font-normal">
              Butuh tambahan halaman khusus atau integrasi tingkat lanjut? Tambahkan modul berikut kapan saja ke dalam paket pilihan Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modularAddons.map((addon, i) => (
              <div key={i} className="bg-white border border-purple-100 p-4 sm:p-5 rounded-2xl flex flex-col justify-between shadow-2xs hover:border-purple-300 transition-all">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-purple-50 text-purple-700 rounded-xl">
                      {i === 0 || i === 1 ? <FileText size={16} /> : <Cpu size={16} />}
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-slate-900">{addon.name}</span>
                  </div>
                  <span className="text-xs font-mono font-medium text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200 whitespace-nowrap">
                    {addon.price}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">{addon.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center pt-6 border-t border-purple-200/60">
            <p className="text-xs text-slate-600 mb-3 font-normal">Ingin menghitung estimasi biaya total secara otomatis sesuai spesifikasi Anda?</p>
            <button
              onClick={() => handleOpenWhatsApp("Halo Mas Chesta! Saya ingin konsultasi kustom spesifikasi website dan modul tambahan.")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-900 hover:bg-purple-800 text-white font-sans text-xs sm:text-sm font-medium rounded-xl border border-purple-800 shadow-xs transition-all cursor-pointer"
            >
              <MessageCircle size={16} className="text-purple-200" />
              <span>Konsultasi &amp; Hitung Estimasi via WhatsApp</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
