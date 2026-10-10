import React from 'react';
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
    image: 'https://chestaa.com/chesta.png',
    description: 'Solusi Digital Enterprise, AI, dan ERP terpercaya di Indonesia. Membantu korporasi di BSD, SCBD, dan seluruh Indonesia mendominasi pasar digital.',
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
