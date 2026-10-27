import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { HeroPurple } from '../components/organisms/HeroPurple';
import SoftDivider from '../components/atoms/SoftDivider';
import RealityWakeUpSection from '../components/organisms/RealityWakeUpSection';
import ArchitectureOfProfit from '../components/organisms/ArchitectureOfProfit';
import SuccessRoadmap from '../components/organisms/SuccessRoadmap';
import InvestmentTiers from '../components/organisms/InvestmentTiers';
import FAQSection from '../components/organisms/FAQSection';
import BlogInsightSection from '../components/organisms/BlogInsightSection';
import SolutionsDirectory from '../components/organisms/SolutionsDirectory';

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'CHESTAA',
    image: 'https://chestaa.com/favicon.svg',
    description: 'Solusi Digital Enterprise, AI, dan ERP terpercaya di Indonesia. Membantu korporasi di BSD, SCBD, dan seluruh Indonesia mengembangkan bisnis digital.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'BSD City',
      addressRegion: 'Banten',
      addressCountry: 'ID'
    },
    areaServed: ['BSD City', 'SCBD', 'Jakarta', 'Indonesia'],
    url: 'https://chestaa.com',
    priceRange: '$$'
  };

  return (
    <main className="flex flex-col w-full bg-slate-50 text-slate-900 relative min-h-screen selection:bg-purple-900 selection:text-white">
      {/* Inject JSON-LD for Local SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* THE HIGH-CONVERTING FUNNEL - Server Side Rendering for performance */}
      <div className="flex flex-col w-full relative">

        {/* SECTION 1: HERO SECTION */}
        <HeroPurple />

        <SoftDivider />

        {/* SECTION 2: REALITY WAKE-UP */}
        <RealityWakeUpSection />

        <SoftDivider />

        {/* ARCHITECTURAL TEARDOWN PROMINENT CTA BANNER */}
        <section className="w-full bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-950 py-12 px-6 relative overflow-hidden text-white shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent pointer-events-none" />
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="space-y-3 text-center md:text-left max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-[11px] font-mono text-purple-200 tracking-wider uppercase font-semibold">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                Forensik Sistem Korporasi
              </span>
              <h3 className="text-2xl md:text-3xl font-display font-bold tracking-tight text-white leading-snug">
                Bedah Kasus Nyata: Mengapa Sistem Lama Lumpuh & Bagaimana chestaadotcom Menyelamatkannya
              </h3>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                Pelajari analisis forensik insiden flash sale e-commerce dan latensi core banking QRIS. Bongkar kegagalan arsitektur monolitik dan temukan solusi rekayasa otonom kami.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link 
                href="/teardowns" 
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-slate-950 font-semibold text-sm hover:bg-slate-100 transition-all shadow-xl hover:scale-105 active:scale-95 group"
              >
                <span>Lihat Semua Bedah Sistem</span>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>

        <SoftDivider />

        {/* SECTION 3: ARCHITECTURE OF PROFIT */}
        <ArchitectureOfProfit />

        <SoftDivider />

        {/* SECTION 4: SUCCESS ROADMAP */}
        <SuccessRoadmap />

        <SoftDivider />

        {/* SECTION 5: INVESTMENT TIERS */}
        <InvestmentTiers />

        <SoftDivider />

        {/* SECTION 6: SOLUTIONS DIRECTORY */}
        <SolutionsDirectory />

        <SoftDivider />

        {/* SECTION 7: BLOG INSIGHT SECTION */}
        <BlogInsightSection />

        <SoftDivider />

        {/* SECTION 8: FAQ AND EXECUTIVE CTA BANNER */}
        <FAQSection />

      </div>
    </main>
  );
}
