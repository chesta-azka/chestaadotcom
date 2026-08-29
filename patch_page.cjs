const fs = require('fs');

const code = `import React from 'react';
import { Metadata } from 'next';
import { QuotationCalculator } from '../components/QuotationCalculator';
import { ArchitecturalEfficiency } from '../components/ArchitecturalEfficiency';
import { HeroParticles } from '../components/HeroParticles';
import { FeaturedCaseStudies } from '../components/FeaturedCaseStudies';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'chestaa.com | Premium Web & AI Architecture - BSD City & Cisauk',
    description: 'Leading B2B SaaS architecture and AI automation agency serving BSD City, Cisauk, and beyond. We build premium digital experiences.',
  };
}

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'chestaa.com',
    image: 'https://chestaa.com/logo.png',
    description: 'Premium Web & AI Architecture B2B SaaS serving BSD City and Cisauk.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'BSD City',
      addressRegion: 'Banten',
      addressCountry: 'ID'
    },
    areaServed: ['BSD City', 'Cisauk', 'Tangerang', 'Jakarta'],
    url: 'https://chestaa.com',
    priceRange: '$$$$'
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center pb-20 px-4 overflow-hidden">
      <HeroParticles />
      
      {/* Inject JSON-LD for Local SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="max-w-4xl w-full text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 pt-[180px] md:pt-[240px]">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-slate-900 dark:text-white mb-6">
          Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Digital Presence</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
          Premium SaaS architecture, Next.js optimization, and AI automation built for enterprise dominance in BSD City & Cisauk.
        </p>
      </div>

      <QuotationCalculator />

      <div className="mt-12 w-full flex flex-col gap-24">
        
        {/* Replacement: Case Studies instead of Trends */}
        <section className="w-full flex flex-col items-center relative z-10">
          <div className="text-center mb-4">
             <h2 className="text-3xl md:text-5xl font-display font-semibold tracking-tight text-slate-900 dark:text-white mb-4">
                Proven Impact.
             </h2>
             <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto text-lg">
                Explore our high-performance case studies and architectural overviews.
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
`;

fs.writeFileSync('src/app/page.tsx', code);
console.log('Patched page.tsx');
