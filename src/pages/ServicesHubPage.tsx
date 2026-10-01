import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Zap, 
  Bot, 
  ShoppingBag, 
  Target, 
  Server, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Cpu,
  Layers,
  Search,
  MessageCircle,
  Clock,
  TrendingUp,
  Award
} from 'lucide-react';
import SEOMetadata from '../components/atoms/SEOMetadata';
import Breadcrumbs from '../components/atoms/Breadcrumbs';

export default function ServicesHubPage() {
  const serviceCategories = [
    {
      id: 'web-performance',
      tag: 'Core Performance',
      title: 'High-Performance Web Development',
      description: 'Arsitektur web modern Next.js 15 dengan kecepatan muat sub-detik (<0.8 detik). Dirancang khusus untuk memotong bounce rate dan melipatgandakan konversi penjualan.',
      href: '/services/website-mesin-konversi',
      icon: Zap,
      accent: 'emerald',
      features: [
        'Waktu muat < 0.8 detik (Core Web Vitals Hijau)',
        'Server-Side Rendering (SSR) & Edge Caching',
        '100% Custom Code tanpa bloatware/plugin berat',
        'Optimasi SEO Teknis & Schema Markup Terpadu'
      ],
      price: 'Mulai Rp 5.500.000'
    },
    {
      id: 'ai-automation',
      tag: 'Intelligent Systems',
      title: 'Karyawan Digital & Otomasi AI 24/7',
      description: 'Agen AI cerdas berbasis Large Language Model (LLM) untuk melayani prospek, kualifikasi lead, dan integrasi WhatsApp CRM secara otonom tanpa henti.',
      href: '/services/karyawan-digital-ai',
      icon: Bot,
      accent: 'purple',
      features: [
        'Asisten AI WhatsApp & Web terhubung CRM',
        'Respons instan dalam hitungan milidetik',
        'Kualifikasi prospek otomatis sebelum ke sales',
        'Pangkas biaya operasional dan gaji admin manual'
      ],
      price: 'Mulai Rp 10.000.000'
    },
    {
      id: 'ecommerce-automation',
      tag: 'E-Commerce Scale',
      title: 'Toko Online E-Commerce Otonom (0% Komisi)',
      description: 'Platform toko online mandiri super cepat dengan checkout instan, payment gateway otomatis (QRIS, VA, Kartu), dan integrasi kurir pengiriman real-time.',
      href: '/services/toko-online-otonom',
      icon: ShoppingBag,
      accent: 'indigo',
      features: [
        'Bebas potongan komisi marketplace (100% profit milik Anda)',
        'Checkout 1-klik teroptimasi mobile',
        'Sinkronisasi stok & cetak resi otomatis',
        'Database pelanggan eksklusif milik bisnis Anda'
      ],
      price: 'Mulai Rp 15.000.000'
    },
    {
      id: 'landing-page',
      tag: 'Conversion Focused',
      title: 'Landing Page Konversi & ROAS Booster',
      description: 'Halaman promosi bespoke dengan arsitektur psikologi penawaran tingkat tinggi. Dirancang khusus untuk menghentikan pemborosan budget iklan Meta & Google Ads.',
      href: '/services/landing-page-konversi',
      icon: Target,
      accent: 'rose',
      features: [
        'Riset positioning & copywriting persuasif B2B',
        'Tracking event Facebook Pixel & Google GA4 presisi',
        'A/B Testing readiness & mobile-first UI',
        'Setup kilat siap mendampingi peluncuran kampanye'
      ],
      price: 'Mulai Rp 2.500.000'
    },
    {
      id: 'enterprise-infra',
      tag: 'Enterprise Architecture',
      title: 'Infrastruktur Digital & Cloud Anti-Down',
      description: 'Rekayasa sistem terpusat, migrasi cloud AWS/GCP, dan arsitektur anti-downtime dengan SLA 99.99% untuk menjamin kestabilan operasional perusahaan.',
      href: '/services/infrastruktur-digital-enterprise',
      icon: Server,
      accent: 'blue',
      features: [
        'High-Availability Cloud Server di Google Cloud / AWS',
        'Auto-scaling saat lonjakan trafik kampanye',
        'Enkripsi data & backup berkala tingkat enterprise',
        'Audit keamanan sistem dan mitigasi vulnerability'
      ],
      price: 'Custom Enterprise'
    },
    {
      id: 'fractional-cto',
      tag: 'Executive Advisory',
      title: 'Fractional CTO & Konsultasi Arsitektur',
      description: 'Pendampingan strategis dari Principal Engineer untuk audit kode, pembenahan sistem mangkrak (tech rescue), dan penyusunan roadmap teknologi jangka panjang.',
      href: '/services/konsultasi-cto-eksekutif',
      icon: Cpu,
      accent: 'amber',
      features: [
        'Audit menyeluruh arsitektur software & database',
        'Tech rescue: pembersihan spaghetti code peninggalan vendor',
        'Evaluasi vendor & rekrutmen tim engineer internal',
        'Perancangan sistem scalable untuk fase ekspansi'
      ],
      price: 'Sesuai Kebutuhan'
    }
  ];

  const localGeoServices = [
    {
      title: 'Jasa Pembuatan Website BSD City & Cisauk',
      desc: 'Spesialis SEO lokal dan optimasi Google Maps untuk bisnis di area BSD Green Office Park, The Breeze, Cisauk, dan sekitarnya.',
      href: '/services/jasa-pembuatan-website-bsd-cisauk'
    },
    {
      title: 'Solusi Digital & AI Tangerang Selatan',
      desc: 'Layanan konsultasi digital langsung untuk perusahaan, klinik, F&B, dan brand di wilayah Tangerang Selatan dan Alam Sutera.',
      href: '/area/tangerang-selatan'
    },
    {
      title: 'Dominasi Pencarian SEO & AEO Korporat',
      desc: 'Strategi optimasi structured data dan entitas brand agar diakui sebagai otoritas di Google Search dan mesin AI (ChatGPT/Gemini).',
      href: '/services/dominasi-pencarian-seo-aeo'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-purple-900 selection:text-white">
      <SEOMetadata 
        title="Layanan Arsitektur Web Next.js & Otomasi AI B2B | CHESTAA"
        description="Jelajahi portofolio layanan CHESTAA: Web Development Next.js sub-detik, Karyawan AI 24/7, Toko Online Otonom, Landing Page Konversi, dan Layanan Fractional CTO."
        url="https://chestaa.com/services"
      />

      {/* HERO SECTION */}
      <section className="pt-32 pb-20 px-6 sm:px-12 bg-gradient-to-b from-white via-slate-50 to-slate-50 border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/70 border border-purple-200 text-purple-900 text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles size={14} className="text-purple-700" />
            <span>Katalog Solusi Rekayasa Digital & Otomasi</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-slate-950 leading-[1.12]">
            Infrastruktur Digital Modern untuk Pertumbuhan Bisnis Nyata.
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 font-normal max-w-3xl mx-auto leading-relaxed">
            Kami tidak menjual template murahan atau website brosur pasif. CHESTAA merakit mesin konversi berkecepatan tinggi dan sistem otonom yang bekerja tanpa henti untuk memenangkan pasar Anda.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-emerald-600" />
              <span>Sub-detik Loading Speed</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-emerald-600" />
              <span>Full Ownership 100%</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-emerald-600" />
              <span>Berbasis BSD &amp; Jakarta</span>
            </span>
          </div>
        </div>
      </section>

      {/* CORE SERVICES GRID */}
      <section className="py-20 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="space-y-4 text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold text-purple-700 uppercase tracking-widest">[ Layanan Unggulan ]</span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-950 tracking-tight">
            Pilih Solusi yang Sesuai Kebutuhan Skalabilitas Anda
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Setiap arsitektur dibangun dengan standar rekayasa modern tanpa ketergantungan plugin pihak ketiga yang rentan rusak.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceCategories.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-purple-300 transition-all flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-700">
                      <Icon size={24} />
                    </div>
                    <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 uppercase tracking-wider">
                      {service.tag}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-display font-bold text-slate-900 leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 space-y-2.5">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Investasi Mulai</span>
                    <span className="text-sm font-bold font-mono text-slate-900">{service.price}</span>
                  </div>
                  <Link
                    to={service.href}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-900 hover:bg-purple-800 text-white text-xs font-bold transition-all shadow-xs"
                  >
                    <span>Detail Layanan</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* LOCAL SEO & SPECIALITY FOCUS */}
      <section className="py-20 px-6 sm:px-12 bg-white border-y border-slate-200/80">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-purple-700 uppercase tracking-widest">[ Area &amp; Solusi Spesifik ]</span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-950">
                Spesialisasi Lokal BSD City, Tangerang &amp; Jakarta
              </h2>
            </div>
            <Link
              to="/about"
              className="text-xs font-mono font-bold text-purple-700 hover:text-purple-900 inline-flex items-center gap-1.5"
            >
              <span>Pelajari Profil Founder &amp; Visi</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {localGeoServices.map((geo, idx) => (
              <Link
                key={idx}
                to={geo.href}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-purple-300 hover:bg-purple-50/20 transition-all space-y-3 group"
              >
                <h4 className="font-display font-bold text-slate-900 group-hover:text-purple-900 transition-colors text-base flex items-center justify-between">
                  <span>{geo.title}</span>
                  <ArrowRight size={16} className="text-slate-400 group-hover:text-purple-700 group-hover:translate-x-1 transition-all" />
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {geo.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* EXECUTIVE DIRECT CTA */}
      <section className="py-20 px-6 sm:px-12 max-w-5xl mx-auto text-center">
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-br from-slate-900 via-purple-950 to-slate-950 text-white shadow-2xl space-y-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.15),transparent_60%)] pointer-events-none" />
          
          <div className="space-y-4 max-w-2xl mx-auto relative z-10">
            <span className="text-xs font-mono font-bold text-purple-300 uppercase tracking-widest">
              [ Konsultasi Langsung Bersama Arsitek ]
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
              Butuh Solusi Custom yang Pas untuk Model Bisnis Anda?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Diskusikan langsung dengan Principal Engineer Chesta Azka. Dapatkan audit awal tanpa komitmen dan estimasi arsitektur yang transparan.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <a
              href="https://wa.me/6282125447232?text=Halo%20Mas%20Chesta,%20saya%20tertarik%20untuk%20konsultasi%20layanan%20arsitektur%20website%20dan%20otomasi."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-2xl bg-white text-slate-950 hover:bg-slate-100 font-bold text-sm transition-all shadow-lg inline-flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle size={18} className="text-emerald-600" />
              <span>Konsultasi WhatsApp Prioritas</span>
            </a>
            <Link
              to="/case-studies"
              className="px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-medium text-sm transition-all border border-white/20 inline-flex items-center gap-2"
            >
              <span>Lihat Hasil Studi Kasus</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
