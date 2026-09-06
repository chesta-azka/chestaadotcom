const fs = require('fs');
const path = require('path');

// 1. Create src/pages/CaseStudiesPage.tsx
const caseStudiesPageContent = `
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
`;

fs.writeFileSync('src/pages/CaseStudiesPage.tsx', caseStudiesPageContent.trim());

// 2. We need to convert src/app/case-studies/[slug]/page.tsx to src/pages/CaseStudyDetailPage.tsx
let detailPage = fs.readFileSync('src/app/case-studies/[slug]/page.tsx', 'utf8');

// Replace Next.js imports and syntax
detailPage = detailPage.replace(/import \{ Metadata \} from 'next';/, 'import { Helmet } from "react-helmet-async";\nimport { useParams, Navigate } from "react-router-dom";');
detailPage = detailPage.replace(/import Link from 'next\/link';/, 'import { Link } from "react-router-dom";');
detailPage = detailPage.replace(/import \{ notFound \} from 'next\/navigation';/, '');

// Remove generateMetadata and generateStaticParams
detailPage = detailPage.replace(/export async function generateMetadata[\s\S]*?\}\n\n/m, '');
detailPage = detailPage.replace(/export async function generateStaticParams[\s\S]*?\}\n\n/m, '');
detailPage = detailPage.replace(/type Props = \{[\s\S]*?\};\n/m, '');

// Change the component signature
detailPage = detailPage.replace(/export default async function CaseStudyPage\(\{ params \}: Props\) \{[\s\S]*?const \{ slug \} = await params;/m, 'export default function CaseStudyDetailPage() {\n  const { slug } = useParams();');

// Handle notFound
detailPage = detailPage.replace(/if \(!study\) \{[\s\S]*?notFound\(\);[\s\S]*?\}/m, 'if (!study) {\n    return <Navigate to="/404" replace />;\n  }');

// Add Helmet for SEO inside the component
detailPage = detailPage.replace(/const relatedStudies = caseStudyDB\.filter[\s\S]*?;/m, `const relatedStudies = caseStudyDB.filter(s => s.id !== study.id).slice(0, 3);
  
  const seoTitle = \`\${study.client}: \${study.title} | Case Studies | chestaa.com\`;
  const seoDesc = \`Read how chestaa.com achieved \${study.impact} for \${study.client}. \${study.desc}\`;
`);

detailPage = detailPage.replace(/return \(\n\s*<main/m, `return (
    <main`);

detailPage = detailPage.replace(/<main className="relative min-h-screen bg-white">/, `<main className="relative min-h-screen bg-white">
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDesc} />
      </Helmet>`);

// Fix Next/Image if it exists (it probably doesn't based on earlier checks, but just in case)
// We already replaced next/link.

fs.writeFileSync('src/pages/CaseStudyDetailPage.tsx', detailPage);

console.log('Migrated pages to src/pages/');
