import React from 'react';
import { insightsData, InsightArticleData } from '../../../data/insights';
import Link from 'next/link';
import RoiCalculator from '../../../components/organisms/RoiCalculator';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return insightsData.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const article = insightsData.find(i => i.slug === params.slug) || insightsData[0];
  const title = `${article.title} | Chestaa - Konsultan AI & Fractional CTO`;
  const description = `${article.seoDescription} Solusi B2B Tech Consultant, AI Automation Agency, dan Next.js Enterprise Architect terpercaya di Tangerang dan Indonesia.`;
  const keywords = "solusi iklan boncos, konsultan IT B2B Tangerang, cara memangkas gaji admin, sistem otonom perusahaan, fractional CTO Jakarta Selatan, bypass pajak app store, website B2B super cepat, Chestaa";

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: `https://chestaa.com/insights/${article.slug}`,
      type: 'article',
      images: [
        {
          url: 'https://picsum.photos/seed/chestaa-insight/1200/630',
          width: 1200,
          height: 630,
          alt: article.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      site: '@chestaadotcom',
      creator: '@chestaadotcom',
      title,
      description,
      images: ['https://picsum.photos/seed/chestaa-insight/1200/630']
    }
  };
}

export default async function InsightServerPage({ params }: PageProps) {
  const article = insightsData.find(i => i.slug === params.slug) || insightsData[0];
  
  // Related Insights Engine: filter articles with same category or fallback
  const relatedArticles = insightsData
    .filter(i => i.slug !== article.slug)
    .slice(0, 3);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://chestaa.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Insights",
        "item": "https://chestaa.com/insights"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": article.title,
        "item": `https://chestaa.com/insights/${article.slug}`
      }
    ]
  };

  const techArticleJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `https://chestaa.com/insights/${article.slug}#techarticle`,
        "headline": article.title,
        "description": article.seoDescription,
        "datePublished": article.date,
        "dateModified": article.date,
        "keywords": "solusi iklan boncos, konsultan IT B2B Tangerang, cara memangkas gaji admin, sistem otonom perusahaan, fractional CTO Jakarta Selatan, bypass pajak app store, website B2B super cepat",
        "author": {
          "@type": "Organization",
          "name": "Chestaa B2B Tech Consultant",
          "url": "https://chestaa.com"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Chestaa",
          "url": "https://chestaa.com",
          "logo": {
            "@type": "ImageObject",
            "url": "https://chestaa.com/favicon.ico"
          },
          "sameAs": [
            "https://instagram.com/chestaadotcom",
            "https://linkedin.com/company/chestaa"
          ]
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://chestaa.com/insights/${article.slug}`
        },
        "about": [
          { "@type": "Thing", "name": "Artificial Intelligence" },
          { "@type": "Thing", "name": "Next.js" },
          { "@type": "Thing", "name": "Business Automation" }
        ],
        "mentions": [
          { "@type": "Thing", "name": "Artificial Intelligence" },
          { "@type": "Thing", "name": "Next.js" },
          { "@type": "Thing", "name": "Business Automation" }
        ]
      }
    ]
  };

  return (
    <main className="min-h-screen bg-[#0b0b0f] text-slate-100 font-sans selection:bg-indigo-600 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleJsonLd) }}
      />

      {/* ARTICLE HERO */}
      <header className="relative py-24 px-6 sm:px-12 border-b border-white/10 bg-[#0d0d12]">
        <div className="max-w-4xl mx-auto space-y-6">
          <nav className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/insights" className="hover:text-white transition-colors">Insights</Link>
            <span>/</span>
            <span className="text-indigo-400 truncate max-w-xs">{article.category}</span>
          </nav>

          <div className="flex items-center gap-4">
            <span className="px-3.5 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/35 text-indigo-400 text-xs font-mono uppercase tracking-wider">
              {article.category}
            </span>
            <span className="text-xs text-slate-400 font-mono">{article.date}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.12]">
            {article.title}
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed">
            {article.seoDescription}
          </p>

          <div className="pt-4 text-xs font-mono text-indigo-400">
            [ Penulis: {article.author} | Fractional CTO Tangerang & AI Automation Agency ]
          </div>
        </div>
      </header>

      {/* ARTICLE BODY & STICKY SIDEBAR CTA */}
      <section className="py-24 px-6 sm:px-12 bg-[#0b0b0f]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Main Content with Harvard Business Review / HBR Typography scale */}
          <div className="lg:col-span-2 bg-white/[0.015] p-8 sm:p-14 rounded-3xl border border-white/5 backdrop-blur-md shadow-2xl">
            <article 
              className="prose prose-invert max-w-3xl mx-auto prose-a:text-emerald-400 hover:prose-a:text-emerald-300 transition-colors prose-p:text-slate-300 prose-p:font-normal prose-p:leading-relaxed md:prose-p:leading-[1.8] lg:prose-p:leading-[2.2] prose-p:tracking-wide prose-headings:font-bold prose-headings:text-slate-50 prose-headings:leading-tight md:prose-headings:leading-snug mt-8 mb-4 md:mt-12 lg:mt-16 space-y-6 md:space-y-8 lg:space-y-10"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>

          {/* Sticky Sidebar CTA */}
          <aside className="lg:sticky lg:top-28 p-8 rounded-3xl bg-gradient-to-br from-indigo-950/60 to-purple-950/50 border border-indigo-500/40 backdrop-blur-2xl space-y-6 shadow-2xl">
            <span className="text-indigo-400 text-xs font-mono uppercase tracking-widest">[ Konsultasi Eksekutif ]</span>
            <h3 className="text-xl font-bold text-white leading-snug">
              Sistem Lo Masih Berantakan? Mari Bedah Arsitektur Lo Bersama Principal Kami.
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Hentikan pembakaran anggaran operasional. Jadwalkan sesi audit kode dan arsitektur otonom langsung bersama Chesta Azka.
            </p>
            <a
              href="/"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-all shadow-lg text-center cursor-pointer"
            >
              <span>Jadwalkan Audit Arsitektur</span>
            </a>
          </aside>
        </div>
      </section>

      {/* ROI CALCULATOR SXO TRAP */}
      <section className="px-6 sm:px-12 py-12 bg-[#0b0b0f]">
        <div className="max-w-6xl mx-auto">
          <RoiCalculator />
        </div>
      </section>

      {/* RELATED INSIGHTS RETENTION ENGINE */}
      <section className="py-24 px-6 sm:px-12 border-t border-white/10 bg-[#0d0d12]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex flex-col space-y-3">
            <span className="text-indigo-400 text-xs font-mono uppercase tracking-wider">Artikel Terkait</span>
            <h2 className="text-3xl font-bold text-white tracking-tight">Eksplorasi Wawasan Eksekutif Lainnya</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.slug}
                href={`/insights/${rel.slug}`}
                className="group p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between space-y-6 shadow-xl"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-indigo-400">{rel.category}</span>
                    <span className="text-xs text-slate-500 font-mono">{rel.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug">
                    {rel.title}
                  </h3>
                  <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
                    {rel.seoDescription}
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-bold text-indigo-400 group-hover:gap-3 transition-all">
                  <span>Baca Analisis</span>
                  <span>&rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
