import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { FeaturedCaseStudies } from '../../components/FeaturedCaseStudies';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { CaseStudiesSkeleton } from '../../components/CaseStudiesSkeleton';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Enterprise Case Studies & ROI | chestaa.com',
    description: 'Detailed analysis of our architectural implementations, Edge caching scaling, and their direct impact on B2B SaaS conversion metrics.',
  };
}

async function CaseStudiesLoader() {
  // Simulate data fetching delay for the premium skeleton loading effect
  await new Promise(resolve => setTimeout(resolve, 1800));
  return <FeaturedCaseStudies />;
}

export default function CaseStudiesPage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center pb-20 overflow-hidden">
      <div className="w-full max-w-5xl mx-auto px-4 mt-8 md:mt-0 flex justify-start">
        <Breadcrumbs />
      </div>
      
      <div className="w-full max-w-5xl mx-auto px-4 text-center mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-slate-900 dark:text-white mb-6">
          Proven <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400">Excellence</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
          Detailed analysis of our architectural implementations and their direct impact on B2B conversion metrics.
        </p>
      </div>

      <Suspense fallback={<CaseStudiesSkeleton />}>
        <CaseStudiesLoader />
      </Suspense>
    </main>
  );
}
