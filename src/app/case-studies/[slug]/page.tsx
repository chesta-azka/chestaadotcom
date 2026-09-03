import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Home, ChevronRight, ArrowLeft, ArrowUpRight, Sparkles } from 'lucide-react';
import { caseStudyDB } from '../../../lib/caseStudies';
import { notFound } from 'next/navigation';
import SocialShare from '../../../components/molecules/SocialShare';
import ArtPlaceholder from '../../../components/atoms/ArtPlaceholder';
import ProjectTimeline from '../../../components/organisms/ProjectTimeline';
import ROITrendChart from '../../../components/organisms/ROITrendChart';


type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudyDB.find(s => s.slug === slug);
  
  if (!study) {
    return {
      title: 'Case Study Not Found | chestaa.com',
    };
  }

  return {
    title: `${study.client}: ${study.title} | Case Studies | chestaa.com`,
    description: `Read how chestaa.com achieved ${study.impact} for ${study.client}. ${study.desc}`,
    openGraph: {
      title: `${study.client} - Enterprise ROI Case Study`,
      description: study.roi,
    }
  };
}

export async function generateStaticParams() {
  return caseStudyDB.map((study) => ({
    slug: study.slug,
  }));
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = caseStudyDB.find(s => s.slug === slug);

  if (!study) {
    notFound();
  }

  const relatedStudies = caseStudyDB.filter(s => s.id !== study.id).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Article", "TechArticle"],
        "@id": `https://chestaa.com/case-studies/${study.slug}#article`,
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://chestaa.com/#website",
          "name": "CHESTADOTCOM",
          "url": "https://chestaa.com"
        },
        "headline": `${study.client} - ${study.title} | Studi Kasus Arsitektur Web & AI BSD City & Cisauk`,
        "name": `${study.title} - ${study.client}`,
        "description": `Studi kasus implementasi arsitektur perangkat lunak Next.js dan solusi AI korporat berkinerja tinggi untuk ${study.client} di koridor bisnis BSD City dan Cisauk. Mencapai ${study.impact} dan ${study.roi}.`,
        "articleSection": "B2B Software Architecture & AI Engineering",
        "proficiencyLevel": "Expert",
        "inLanguage": "id-ID",
        "mainEntityOfPage": `https://chestaa.com/case-studies/${study.slug}`,
        "url": `https://chestaa.com/case-studies/${study.slug}`,
        "datePublished": "2024-01-15T08:00:00+07:00",
        "dateModified": "2024-03-01T10:00:00+07:00",
        "image": "https://chestaa.com/logo.png",
        "keywords": [
          "Arsitektur Website BSD City",
          "Solusi AI Korporat Cisauk",
          "B2B SaaS Indonesia",
          "Next.js App Router Engineering",
          "Konsultan IT BSD City",
          "Software House Cisauk",
          "Digital Transformation BSD",
          study.client,
          study.impact,
          study.roi
        ],
        "about": [
          {
            "@type": "Thing",
            "name": "Arsitektur Website Berkinerja Tinggi",
            "description": "Pengembangan web Next.js dengan optimasi Core Web Vitals 100 dan efisiensi Cloud Run."
          },
          {
            "@type": "Thing",
            "name": "Solusi AI Korporat",
            "description": "Automasi alur kerja cerdas dan integrasi AI agentic untuk bisnis enterprise."
          }
        ],
        "spatialCoverage": [
          {
            "@type": "Place",
            "name": "BSD City",
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": -6.3016,
              "longitude": 106.6527
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "BSD City",
              "addressRegion": "Banten",
              "addressCountry": "ID"
            }
          },
          {
            "@type": "Place",
            "name": "Cisauk",
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": -6.3275,
              "longitude": 106.6347
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Cisauk",
              "addressRegion": "Banten",
              "addressCountry": "ID"
            }
          }
        ],
        "contentLocation": {
          "@type": "Place",
          "name": "BSD City & Cisauk B2B Corridor",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "BSD City / Cisauk",
            "addressRegion": "Banten",
            "addressCountry": "ID"
          }
        },
        "author": {
          "@type": "Organization",
          "@id": "https://chestaa.com/#organization",
          "name": "CHESTADOTCOM",
          "url": "https://chestaa.com",
          "logo": {
            "@type": "ImageObject",
            "url": "https://chestaa.com/logo.png"
          },
          "areaServed": [
            {
              "@type": "AdministrativeArea",
              "name": "BSD City"
            },
            {
              "@type": "AdministrativeArea",
              "name": "Cisauk"
            },
            {
              "@type": "Country",
              "name": "Indonesia"
            }
          ]
        },
        "publisher": {
          "@type": "Organization",
          "@id": "https://chestaa.com/#organization",
          "name": "CHESTADOTCOM",
          "url": "https://chestaa.com",
          "logo": {
            "@type": "ImageObject",
            "url": "https://chestaa.com/logo.png"
          }
        }
      }
    ]
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center pt-40 md:pt-48 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#FAFAFC] text-slate-900 selection:bg-purple-500/20">
      {/* Enhanced Ambient Background System */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        {/* Central Violet Core Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] md:w-[1300px] h-[500px] sm:h-[700px] bg-gradient-to-b from-purple-800/8 via-purple-600/5 to-transparent blur-[130px] rounded-full" />
        
        {/* Soft Top Light Flares */}
        <div className="absolute -top-40 right-1/4 w-[550px] h-[400px] bg-purple-900/6 blur-[120px] rounded-full" />
        <div className="absolute -top-32 left-1/4 w-[500px] h-[350px] bg-indigo-900/5 blur-[110px] rounded-full" />

        {/* Minimal Geometric Mask Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#581c8708_1px,transparent_1px),linear-gradient(to_bottom,#581c8708_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_65%,transparent_100%)]" />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="w-full max-w-4xl mx-auto mb-12 z-10">
        
        {/* Breadcrumb Navigation with clearance */}
        <nav className="flex items-center gap-2 mb-10 text-sm font-medium text-slate-500 animate-in fade-in slide-in-from-top-6 duration-700">
          <Link href="/" className="hover:text-purple-600 transition-colors flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider">
            <Home className="w-3.5 h-3.5" /> Beranda
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <Link href="/case-studies" className="hover:text-purple-600 transition-colors font-mono text-xs uppercase tracking-wider">
            Studi Kasus
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="text-slate-900 truncate font-mono text-xs uppercase tracking-wider">{study.client}</span>
        </nav>

        <Link 
          href="/case-studies" 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/90 hover:bg-purple-50 text-purple-900 border border-purple-200/80 font-mono text-xs font-bold uppercase tracking-wider mb-8 transition-all shadow-xs backdrop-blur-md animate-in fade-in slide-in-from-left-6 duration-700"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Semua Studi Kasus
        </Link>

        <ArtPlaceholder src={study.image} alt={study.title} />

        <header className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 fill-mode-both">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-900 border border-purple-200 font-mono font-bold tracking-wider uppercase text-xs">
              {study.client}
            </span>
            {/* @ts-ignore */}
            {study.generated_by_ai && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold tracking-widest uppercase backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5" /> Generated by AI
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.12]">
            {study.title}
          </h1>

          {/* Top Social Share Bar */}
          <div className="mb-10 p-4 rounded-2xl bg-white/90 backdrop-blur-2xl border border-slate-200/80 shadow-xs flex items-center justify-between flex-wrap gap-4">
            <SocialShare title={study.title} description={study.desc} />
            <span className="text-[11px] font-mono text-slate-500">
              Verified Enterprise Impact &bull; BSD & Cisauk
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 fill-mode-both">
          <div className="md:col-span-2 prose prose-slate max-w-none">
            <h3 className="text-2xl sm:text-3xl font-display font-bold mb-5 text-slate-900 tracking-tight leading-snug">Project Overview</h3>
            <p className="font-sans text-[16px] sm:text-[17px] md:text-[18px] text-slate-700 leading-[1.68] sm:leading-[1.72] tracking-[-0.014em] mb-6 font-normal antialiased">
              {study.desc}
            </p>
            <p className="font-sans text-[16px] sm:text-[17px] md:text-[18px] text-slate-700 leading-[1.68] sm:leading-[1.72] tracking-[-0.014em] mb-8 font-normal antialiased">
              Through rigorous architectural planning and execution, our Next.js App Router implementation 
              bypassed legacy limitations. By harnessing global edge caching, React Server Components, and 
              advanced asset optimization, we delivered an enterprise-grade digital experience that directly translates to business impact.
            </p>
            <ProjectTimeline />
          </div>
          
          <div className="bg-white/95 backdrop-blur-3xl rounded-3xl p-8 border border-slate-200/90 shadow-xl shadow-purple-950/5 h-max">
            <h3 className="text-xs uppercase tracking-widest font-mono font-bold text-slate-400 mb-6">Key Metrics</h3>
            <div className="mb-8">
              <p className="text-xs text-slate-500 font-mono font-medium mb-1 uppercase tracking-wider">Architectural Impact</p>
              <p className="text-3xl font-display font-black text-purple-900">{study.impact}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-mono font-medium mb-2 uppercase tracking-wider">Verified ROI</p>
              <p className="font-sans text-slate-800 font-medium leading-snug">{study.roi}</p>
            </div>
            <ROITrendChart />
          </div>
        </div>

        {/* Bottom Social Share Card */}
        <div className="my-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white via-purple-50/40 to-white backdrop-blur-3xl border border-purple-200/70 shadow-lg shadow-purple-950/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-display text-lg font-bold text-slate-900 mb-1">
              Bagikan Studi Kasus Ini
            </h4>
            <p className="font-sans text-xs sm:text-sm text-slate-600">
              Bagikan wawasan arsitektur dan efisiensi ROI ini ke jaringan profesional Anda.
            </p>
          </div>
          <SocialShare title={study.title} description={study.desc} />
        </div>

        {/* Related Case Studies Section */}
        <div className="mt-8 pt-16 border-t border-slate-200/80 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500 fill-mode-both w-full relative">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-display font-bold tracking-tight text-slate-900">Related Implementations</h3>
            <Link href="/case-studies" className="text-xs font-mono font-bold uppercase tracking-wider text-purple-900 hover:text-purple-700 hover:underline">
              Lihat Semua &rarr;
            </Link>
          </div>
          
          <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {relatedStudies.map((related) => (
              <Link
                key={related.id}
                href={`/case-studies/${related.slug}`}
                className="flex-shrink-0 w-[85%] md:w-[400px] snap-center bg-white/90 backdrop-blur-3xl border border-slate-200/80 rounded-3xl p-8 hover:shadow-xl hover:border-purple-200 hover:-translate-y-1 transition-all duration-300 group relative flex flex-col justify-between h-[18rem]"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <p className="text-xs font-mono font-bold tracking-wider uppercase text-purple-900">{related.client}</p>
                    <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-purple-600 transition-colors" />
                  </div>
                  <h4 className="text-xl font-display font-bold text-slate-900 mb-3">{related.title}</h4>
                  <p className="font-sans text-sm text-slate-600 line-clamp-3 mb-6 leading-relaxed tracking-tight">{related.desc}</p>
                </div>
                <div className="pt-4 border-t border-slate-200/80">
                  <p className="text-[10px] text-slate-500 uppercase font-mono tracking-widest font-bold mb-1">Impact</p>
                  <p className="text-purple-900 font-display font-bold text-lg">{related.impact}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
