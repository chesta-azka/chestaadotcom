import { useState } from 'react';
import { motion, Variants } from 'motion/react';
import { Check, MessageCircle, Sparkles, Zap, ShieldCheck, ArrowRight } from 'lucide-react';
import AnimatedHeading from '../atoms/AnimatedHeading';
import MagneticButton from '../atoms/MagneticButton';

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
    id: "umkm-starter",
    name: "UMKM Starter",
    badge: "Paling Populer • Promo Spesial",
    price: "Rp 540.000",
    originalPrice: "Rp 650.000",
    period: "all-in tahun pertama",
    description: "Solusi cepat, elegan, dan siap online untuk pemilik bisnis UMKM, toko fisik, dan profesional yang ingin eksis di Google dengan anggaran terukur.",
    highlighted: true,
    features: [
      "Gratis Domain .COM / .ID (1 Tahun Penuh)",
      "Desain Visual Modern Inter & Mobile Responsive",
      "Performa Kecepatan Tinggi (Google PageSpeed 95+)",
      "Setup SEO Google & Metadata Standar 2026",
      "Integrasi Direct WhatsApp Chatbot & CTA",
      "Hosting Cloud High-Speed & SSL HTTPS Aktif",
      "100% Hak Milik Source Code Tanpa Vendor Lock-in",
      "Pengerjaan Kilat 1–3 Hari Kerja Selesai"
    ],
    ctaText: "Pesan Paket UMKM Rp540K",
    ctaMessage: "Halo Mas Chesta! Saya ingin memesan Paket Promo UMKM Rp540K all-in domain .com. Mohon info langkah pengerjaannya."
  },
  {
    id: "business-growth",
    name: "Business Growth & Next.js",
    badge: "B2B & Korporat Berkembang",
    price: "Rp 2.450.000",
    originalPrice: "Rp 3.500.000",
    period: "investasi per proyek",
    description: "Arsitektur kustom React & Next.js untuk bisnis yang butuh multi-halaman profesional, CMS manajemen konten, dan kecepatan sub-detik untuk konversi tinggi.",
    highlighted: false,
    features: [
      "Arsitektur Kustom Next.js 15 App Router",
      "Multi-Halaman Interaktif (Hingga 7–10 Halaman)",
      "Sistem CMS Ringan untuk Update Berita/Produk Mandiri",
      "Desain Eksklusif Tanpa Template (Bespoke UI/UX)",
      "Optimasi SEO On-Page Mendalam & Rich Snippet Schema",
      "Integrasi Form Lead Capture & Notifikasi Email Otomatis",
      "Setup Analitik Google Tag Manager & Meta Pixel",
      "Garansi Maintenance & Pemeliharaan 30 Hari Penuh"
    ],
    ctaText: "Konsultasi Paket Business",
    ctaMessage: "Halo Mas Chesta! Saya tertarik dengan Paket Business Growth & Next.js. Bisa jadwalkan diskusi kebutuhan proyek saya?"
  },
  {
    id: "enterprise-ai",
    name: "Enterprise Agentic AI",
    badge: "Custom Engineering",
    price: "Mulai Rp 5.800.000",
    period: "berdasarkan cakupan modul",
    description: "Sistem aplikasi web tingkat lanjut dengan integrasi AI Agent otonom 24/7, otomatisasi alur kerja internal, basis data cloud, dan integrasi API khusus.",
    highlighted: false,
    features: [
      "Integrasi Agen AI Otonom 24/7 (Customer Support / Lead AI)",
      "Arsitektur Serverless Cloud Terdistribusi & Database SQL/NoSQL",
      "Sistem Autentikasi Pengguna & Manajemen Role (RBAC)",
      "Dashboard Analitik Internal & Rekapitulasi Operasional",
      "Otomatisasi WhatsApp / CRM / Webhook Eksternal",
      "Audit Keamanan Data & Kebijakan Zero-Retention",
      "Dokumentasi API Lengkap & Handover Source Code 100%",
      "Dukungan Teknis Prioritas SLA & Maintenance Berkala"
    ],
    ctaText: "Diskusikan Solusi Enterprise",
    ctaMessage: "Halo Mas Chesta! Perusahaan kami membutuhkan arsitektur Enterprise dengan otomatisasi AI & Web App custom. Mohon info ketersediaan sesi konsultasi teknis."
  }
];

export default function PricingSection() {
  const [selectedCurrency] = useState<'IDR'>('IDR');

  const handleOpenWhatsApp = (message: string) => {
    window.open(`https://wa.me/6282125447232?text=${encodeURIComponent(message)}`, '_blank');
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden bg-transparent z-10 font-sans" id="pricing">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header - Transparent Pricing Title with Inter Typography */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200/80 mb-4 shadow-2xs">
            <Sparkles size={13} className="text-purple-700" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-purple-900">
              Biaya Transparan &amp; Investasi Bernilai
            </span>
          </div>
          
          <AnimatedHeading as="h2" className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tight leading-[1.15] mb-4">
            Transparent Pricing. <br className="hidden sm:block" />
            <span className="text-purple-900">Investasi Terukur Tanpa Biaya Tersembunyi.</span>
          </AnimatedHeading>
          
          <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed">
            Pilih paket yang paling relevan dengan skala bisnis Anda. Dari paket UMKM berbiaya terjangkau hingga rekayasa enterprise berbasis otomasi AI.
          </p>
        </div>

        {/* 3-Tier Modern Pricing Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {pricingTiers.map((tier) => {
            const isHighlighted = tier.highlighted;

            return (
              <motion.div
                key={tier.id}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className={`relative flex flex-col justify-between rounded-3xl transition-all duration-300 ${
                  isHighlighted 
                    ? 'bg-white border-2 border-purple-600 shadow-xl shadow-purple-950/10 ring-4 ring-purple-100/60 lg:-translate-y-2' 
                    : 'bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-purple-300'
                } p-6 sm:p-8`}
              >
                {/* Highlighted Ribbon Badge */}
                {isHighlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 bg-purple-900 text-white font-sans text-xs font-bold px-3.5 py-1 rounded-full shadow-md">
                      <Zap size={13} className="text-amber-300 fill-amber-300" />
                      {tier.badge}
                    </span>
                  </div>
                )}

                {/* Card Top Information */}
                <div>
                  <div className="mb-4">
                    {!isHighlighted && tier.badge && (
                      <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md inline-block mb-3">
                        {tier.badge}
                      </span>
                    )}
                    <h3 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 tracking-tight">
                      {tier.name}
                    </h3>
                  </div>

                  {/* Price Block */}
                  <div className="mb-5 pb-5 border-b border-slate-100">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight">
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
                  <p className="text-slate-600 font-sans text-xs sm:text-sm leading-relaxed mb-6">
                    {tier.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                      Fasilitas yang Didapat:
                    </span>
                    <ul className="space-y-2.5">
                      {tier.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-sans text-slate-700">
                          <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                            isHighlighted ? 'bg-purple-900 text-white' : 'bg-purple-100 text-purple-800'
                          }`}>
                            <Check size={10} strokeWidth={3} />
                          </div>
                          <span className={isHighlighted && idx < 3 ? "font-semibold text-slate-900" : ""}>
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card CTA Actions */}
                <div className="pt-4 border-t border-slate-100 mt-auto space-y-2.5">
                  <MagneticButton strength={0.25} className="w-full">
                    <button
                      onClick={() => handleOpenWhatsApp(tier.ctaMessage)}
                      className={`w-full py-3.5 px-5 rounded-full font-sans text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        isHighlighted
                          ? 'bg-purple-900 hover:bg-purple-800 text-white shadow-lg shadow-purple-950/20 hover:scale-[1.01]'
                          : 'bg-slate-900 hover:bg-purple-900 text-white shadow-sm'
                      }`}
                    >
                      <MessageCircle size={16} className={isHighlighted ? "text-emerald-400" : "text-white"} />
                      <span>{tier.ctaText}</span>
                      <ArrowRight size={14} className="opacity-80" />
                    </button>
                  </MagneticButton>

                  {isHighlighted && (
                    <p className="text-[11px] text-center text-emerald-700 font-medium flex items-center justify-center gap-1.5 pt-1">
                      <ShieldCheck size={13} className="text-emerald-600" />
                      <span>Garansi pengerjaan rapi &amp; domain langsung aktif</span>
                    </p>
                  )}
                </div>

              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Reassurance & Custom Request */}
        <div className="mt-12 text-center bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="font-display font-bold text-slate-900 text-sm sm:text-base">
              Punya Kebutuhan Spesifik atau Sistem Terintegrasi?
            </h4>
            <p className="text-slate-600 font-sans text-xs sm:text-sm mt-0.5">
              Konsultasikan arsitektur kustom Anda. Kami sediakan proposal teknis dan breakdown biaya transparan dalam 24 jam.
            </p>
          </div>
          <MagneticButton strength={0.3} className="shrink-0">
            <button
              onClick={() => handleOpenWhatsApp("Halo Mas Chesta! Saya ingin berdiskusi mengenai proyek kustom dengan spesifikasi khusus. Mohon info jadwal konsultasi.")}
              className="px-5 py-2.5 rounded-full bg-white border border-slate-300 hover:border-purple-600 text-slate-800 hover:text-purple-900 font-sans text-xs font-semibold shadow-2xs hover:shadow-xs transition-all cursor-pointer whitespace-nowrap"
            >
              Konsultasi Kustom Gratis
            </button>
          </MagneticButton>
        </div>

      </div>
    </section>
  );
}
