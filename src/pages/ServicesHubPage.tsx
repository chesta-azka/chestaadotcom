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
import { PORTFOLIO_ITEMS } from '../data/portfolio';

export default function ServicesHubPage() {
  const pillars = [
    {
      id: 'pillar-1',
      tag: 'Core Pillar 01',
      title: 'Headless E-Commerce & B2B Web Architecture',
      description: 'Bukan sekadar toko online. Kami membangun arsitektur Next.js 15 dengan integrasi Karyawan AI untuk merekomendasikan produk secara otonom dan memproses checkout tanpa latensi.',
      href: '/services/toko-online-otonom',
      icon: ShoppingBag,
      accent: 'purple',
      features: [
        'Arsitektur Next.js 15 App Router & Edge Caching',
        'Rekomendasi Produk Otonom Berbasis LLM',
        'Checkout Instan Tanpa Latensi',
        '100% Hak Milik Tanpa Biaya Sewa Bulanan'
      ],
      relatedCategory: 'High-Performance Web'
    },
    {
      id: 'pillar-2',
      tag: 'Core Pillar 02',
      title: 'Programmatic SEO & Semantic AI Engines',
      description: 'Tinggalkan metode SEO manual. Kami merakit pangkalan data (Firestore) yang menghasilkan ribuan halaman pSEO terstruktur secara otomatis, mendominasi pencarian lokal di seluruh Tangerang dan Jakarta.',
      href: '/services/dominasi-pencarian-seo-aeo',
      icon: Search,
      accent: 'purple',
      features: [
        'Pangkalan data Firestore untuk pSEO berskala ribuan halaman',
        'Injeksi JSON-LD Schema terstruktur otomatis',
        'Dominasi Google Maps & SGE (Search Generative Experience)',
        'Otomatisasi Entity Graph & Keyword Intent'
      ],
      relatedCategory: 'AI Automation & Data Pipeline'
    },
    {
      id: 'pillar-3',
      tag: 'Core Pillar 03',
      title: 'Autonomous ERP & Karyawan Digital',
      description: 'Otomatisasi alur kerja tingkat lanjut. Menggantikan proses admin manual dengan sistem AI yang menyinkronkan data klien, HR, dan logistik secara real-time.',
      href: '/services/karyawan-digital-ai',
      icon: Bot,
      accent: 'purple',
      features: [
        'Karyawan AI 24/7 untuk kualifikasi prospek B2B',
        'Sinkronisasi real-time database perusahaan',
        'Automated Invoice & Billing Engine',
        'Eliminasi total human-error operasional'
      ],
      relatedCategory: 'Business Workflow Automation'
    }
  ];

  const collectionPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Chestaa Enterprise IT & AI Services Hub",
    "description": "Kumpulan solusi arsitektur web modern, Programmatic SEO, dan otomasi Karyawan AI untuk mendominasi pasar B2B enterprise.",
    "url": "https://chestaa.com/services",
    "hasPart": pillars.map(p => ({
      "@type": "Service",
      "name": p.title,
      "description": p.description,
      "url": `https://chestaa.com${p.href}`
    }))
  };

  const serializeJsonLd = (schema: object) => {
    return JSON.stringify(schema)
      .replace(/</g, '\\u003c')
      .replace(/>/g, '\\u003e')
      .replace(/&/g, '\\u0026');
  };

  return (
    <div className="pt-36 pb-28 min-h-screen font-sans bg-slate-50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-50 via-slate-50 to-white text-slate-900 relative">
      <SEOMetadata 
        title="Jasa Pembuatan Website B2B & Karyawan AI Enterprise | CHESTAA"
        description="Solusi hybrid full-service: Headless E-Commerce Next.js 15, Programmatic SEO, dan Autonomous ERP bertenaga AI untuk skala enterprise di BSD dan Jakarta."
        currentRoute="/services"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(collectionPageJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16 relative z-10">
        <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Services Hub', path: '/services' }]} />

        {/* Hero Header */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-mono uppercase tracking-widest shadow-xs">
            <Sparkles size={14} className="text-purple-600" />
            <span>Hybrid Full-Service &amp; AI Architecture</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
            Infrastruktur Digital &amp; <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-500">AI Enterprise</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-3xl mx-auto">
            Kami menggabungkan rekayasa perangkat lunak berkecepatan tinggi dengan Karyawan AI otonom untuk mengubah bisnis Anda menjadi mesin profit 24/7.
          </p>
        </div>

        {/* Bento-Box Style CSS Grid for 3 Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {pillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            const relatedCases = PORTFOLIO_ITEMS.filter(item => item.category.toLowerCase().includes(pillar.relatedCategory.toLowerCase().split(' ')[0]) || index === 0).slice(0, 2);

            return (
              <div
                key={pillar.id}
                className="rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:shadow-purple-500/10 hover:border-purple-300 p-8 flex flex-col justify-between relative overflow-hidden group transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-purple-100/40 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />

                <div className="space-y-6 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                      {pillar.tag}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 shadow-xs">
                      <IconComponent size={24} />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold tracking-tight text-slate-900 group-hover:text-purple-600 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Features list */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">Spesifikasi Arsitektur:</span>
                    <ul className="space-y-2">
                      {pillar.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-sans">
                          <CheckCircle2 size={14} className="text-purple-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Related Case Studies Micro-Component */}
                  <div className="pt-4 border-t border-slate-100 space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">Studi Kasus Terkait:</span>
                    <div className="space-y-1.5">
                      {relatedCases.map((rc) => (
                        <Link
                          key={rc.id}
                          to={`/portfolio/${rc.slug}`}
                          className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-purple-50/60 border border-slate-200/60 text-xs font-medium text-slate-800 transition-colors group/link"
                        >
                          <span className="truncate pr-2">{rc.title}</span>
                          <ArrowRight size={12} className="text-purple-600 group-hover/link:translate-x-1 transition-transform shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-8 mt-8 border-t border-slate-100 relative z-10">
                  <Link
                    to={pillar.href}
                    className="w-full py-3.5 px-5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md shadow-purple-600/20 group/btn cursor-pointer"
                  >
                    <span><b>Eksplorasi Arsitektur</b></span>
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
