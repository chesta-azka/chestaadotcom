import React from 'react';
import { Metadata } from 'next';
import { QuotationCalculator } from '../components/QuotationCalculator';
import { ArchitecturalEfficiency } from '../components/ArchitecturalEfficiency';
import { HeroParticles } from '../components/HeroParticles';
import { FeaturedCaseStudies } from '../components/FeaturedCaseStudies';
import { ArrowRight, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'CHESTADOTCOM | Pembuatan Website Modern & Solusi Digital Cepat',
    description: 'Jasa pembuatan website profesional Next.js berkecepatan tinggi, paket promo UMKM Rp540K all-in, dan solusi digital terpercaya berbasis BSD Tangerang.',
  };
}

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'CHESTADOTCOM',
    image: 'https://chestaa.com/logo.png',
    description: 'Jasa Pembuatan Website Modern & Cepat oleh CHESTADOTCOM.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'BSD City',
      addressRegion: 'Banten',
      addressCountry: 'ID'
    },
    areaServed: ['BSD City', 'Cisauk', 'Tangerang', 'Jakarta', 'Indonesia'],
    url: 'https://chestaa.com',
    priceRange: '$$'
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white text-slate-900 selection:bg-purple-200 selection:text-purple-900">
      {/* Subtle Light Ambient Flare */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] bg-purple-100/30 blur-[130px] rounded-full" />
      </div>

      <HeroParticles />
      
      {/* Inject JSON-LD for Local SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero Section */}
      <div className="max-w-5xl w-full text-center flex flex-col items-center justify-center pt-36 md:pt-44 pb-14 z-10">
        {/* Trust & Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200/80 shadow-2xs mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-900">
            Jasa Website Next.js & Promo UMKM Rp540K
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight leading-[1.12] text-slate-900 max-w-4xl text-balance">
          Website Bisnis Cepat, Elegan, & <br className="hidden sm:block" />
          <span className="text-purple-900">
            Siap Tingkatkan Penjualan.
          </span>
        </h1>
        
        {/* Value Proposition */}
        <p className="mt-5 text-sm sm:text-base md:text-lg text-slate-600 font-sans max-w-2xl leading-relaxed text-balance">
          Hadirkan website berkecepatan tinggi dengan arsitektur Next.js modern, optimasi SEO Google otomatis, dan integrasi WhatsApp langsung untuk menjangkau lebih banyak pelanggan.
        </p>

        {/* Primary CTA Group */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full">
          <a
            href="https://wa.me/6282125447232?text=Halo%20Mas%20Chesta!%20Saya%20tertarik%20untuk%20konsultasi%20pembuatan%20website%20di%20CHESTADOTCOM."
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-purple-900 hover:bg-purple-800 text-white font-sans text-xs sm:text-sm font-semibold shadow-md shadow-purple-950/10 transition-all cursor-pointer w-full sm:w-auto"
          >
            <MessageCircle size={16} />
            <span>Konsultasi Cepat di WhatsApp</span>
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </a>
          <Link
            href="/case-studies"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white hover:bg-purple-50 text-slate-700 font-sans text-xs sm:text-sm font-semibold border border-slate-200 shadow-2xs hover:border-purple-300 transition-all cursor-pointer w-full sm:w-auto"
          >
            <span>Lihat Portofolio</span>
          </Link>
        </div>
      </div>

      <QuotationCalculator />

      <div className="mt-16 w-full flex flex-col gap-20">
        {/* Case Studies */}
        <section className="w-full flex flex-col items-center relative z-10">
          <div className="text-center mb-6">
             <h2 className="text-2xl md:text-4xl font-display font-bold tracking-tight text-slate-900 mb-2">
                Portofolio & Hasil Nyata
             </h2>
             <p className="text-slate-500 max-w-lg mx-auto text-xs sm:text-sm">
                Pelajari studi kasus arsitektur website dan dampak konversi klien kami.
             </p>
          </div>
          <FeaturedCaseStudies />
        </section>

        <section className="w-full relative z-10">
          <ArchitecturalEfficiency />
        </section>
      </div>
    </main>
  );
}
