'use client';

import React from 'react';
import SEOMetadata from '../components/atoms/SEOMetadata';
import { HeroPurple } from '../components/organisms/HeroPurple';
const SolutionsServiceOverviewSection = React.lazy(() => import('../components/organisms/SolutionsServiceOverviewSection'));
const PortfolioShowcaseSection = React.lazy(() => import('../components/organisms/PortfolioShowcaseSection'));
const BehindTheScenesSection = React.lazy(() => import('../components/organisms/BehindTheScenesSection'));
const ProjectRhythmSection = React.lazy(() => import('../components/organisms/ProjectRhythmSection'));
const IndustryContextSection = React.lazy(() => import('../components/organisms/IndustryContextSection'));
const BlogInsightSection = React.lazy(() => import('../components/organisms/BlogInsightSection'));
const HomeFAQSection = React.lazy(() => import('../components/organisms/HomeFAQSection'));
const HomeCTASection = React.lazy(() => import('../components/organisms/HomeCTASection'));

export default function HomePage() {
  return (
    <div className="flex flex-col w-full bg-slate-50 text-slate-900 relative min-h-screen selection:bg-purple-900 selection:text-white">
      <SEOMetadata 
        title="Dominasi Pasar Digital. Amankan Profit Maksimal. | CHESTAADOTCOM"
        description="Sistem otonom berkecepatan tinggi yang melayani pelanggan 24/7. Pangkas biaya operasional admin dan dominasi pasar dengan arsitektur digital kelas enterprise."
      />

      {/* THE 7-SECTION HIGH-CONVERTING FUNNEL */}
      <div className="flex flex-col w-full relative">
        <HeroPurple />

        <React.Suspense fallback={<div className="h-96 w-full animate-pulse bg-slate-100 rounded-3xl my-8" />}>
          <SolutionsServiceOverviewSection />
          <PortfolioShowcaseSection />
          <BehindTheScenesSection />
          <ProjectRhythmSection />
          <IndustryContextSection />
          <BlogInsightSection />
          <HomeFAQSection />
          <HomeCTASection />
        </React.Suspense>
      </div>
    </div>
  );
}
