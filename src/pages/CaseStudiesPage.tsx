import React, { Suspense, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FeaturedCaseStudies } from '../components/FeaturedCaseStudies';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CaseStudiesSkeleton } from '../components/CaseStudiesSkeleton';

function CaseStudiesLoader() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);
  
  if (loading) return <CaseStudiesSkeleton />;
  return <FeaturedCaseStudies />;
}

export default function CaseStudiesPage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center pt-36 md:pt-44 pb-20 overflow-hidden bg-white text-slate-900 font-sans">
      <Helmet>
        <title>Studi Kasus & Hasil Nyata | CHESTADOTCOM</title>
        <meta name="description" content="Analisis mendalam implementasi arsitektur website Next.js, kecepatan loading, dan dampak peningkatan penjualan klien kami." />
      </Helmet>
      
      <div className="w-full max-w-5xl mx-auto px-4 flex justify-start">
        <Breadcrumbs />
      </div>
      
      <div className="w-full max-w-5xl mx-auto px-4 text-center mb-10">
        <span className="inline-block px-3 py-1 rounded-full bg-purple-50 text-purple-900 border border-purple-100 text-xs font-mono font-bold uppercase tracking-wider mb-4">
          Studi Kasus Klien
        </span>
        <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight text-slate-900 mb-4">
          Hasil Terbukti & <span className="text-purple-900">Kinerja Nyata</span>
        </h1>
        <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
          Analisis dampak implementasi website Next.js berkecepatan tinggi terhadap kepuasan pengguna dan peningkatan konversi bisnis.
        </p>
      </div>
      <CaseStudiesLoader />
    </main>
  );
}