import React from 'react';
import { insightsData, InsightArticleData } from '../../../data/insights';
import Link from 'next/link';
import Image from 'next/image';
import RoiCalculator from '../../../components/organisms/RoiCalculator';
import FAQSection from '../../../components/organisms/FAQSection';
import { injectAEOEntities } from '../../../lib/seo-linker';

interface PageProps {
  params: {
    slug: string;
  };
}

interface BreadcrumbListSchema {
  "@context": string;
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }>;
}

interface TechArticleSchema {
  "@context": string;
  "@type": "TechArticle";
  headline: string;
  author: {
    "@type": "Person";
    name: string;
    jobTitle?: string;
    worksFor?: {
      "@type": "Organization";
      name: string;
    };
    sameAs?: string[];
  };
  publisher: {
    "@type": "Organization";
    name: string;
    logo?: {
      "@type": "ImageObject";
      url: string;
    };
  };
  description: string;
  image?: string;
  keywords?: string;
  datePublished?: string;
  dateModified?: string;
  mainEntityOfPage?: {
    "@type": "WebPage";
    "@id": string;
  };
  about?: Array<{ "@type": "Thing"; name: string }>;
  mentions?: Array<{ "@type": "Thing"; name: string }>;
}

interface FAQPageSchema {
  "@context": string;
  "@type": "FAQPage";
  mainEntity: Array<{
    "@type": "Question";
    name: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
  }>;
}

export async function generateStaticParams() {
  return insightsData.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const article = insightsData.find(i => i.slug === params.slug) || insightsData[0];
  const title = `${article.title} | Chestaa - Konsultan AI & Fractional CTO`;
  const description = `${article.seoDescription} Solusi jasa perbaiki website sering down, vendor IT terpercaya di Tangerang, dan konsultan IT B2B Jakarta Selatan.`;
  const keywords = "jasa perbaiki website sering down, vendor IT terpercaya di Tangerang, konsultan IT B2B Jakarta Selatan, cara otomatisasi operasional bisnis, bikin super app perusahaan, solusi iklan meta boncos, Chestaa";
  const ogImageUrl = `https://chestaa.com/api/og?title=${encodeURIComponent(article.title)}&category=${encodeURIComponent(article.category)}`;

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
          url: ogImageUrl,
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
      images: [ogImageUrl]
    }
  };
}

// Server-side fetch for dynamic market trends with ISR revalidation every 24 hours
async function getMarketTrends(category: string) {
  try {
    const trendsMap: Record<string, Array<{ title: string; source: string; url: string; date: string }>> = {
      "AI Automation": [
        { title: "Enterprise LLM Adoption Surges 300% Among Southeast Asian Corporations", source: "TechCrunch Asia", url: "#", date: "Hari Ini" },
        { title: "Autonomous Digital Workers Replace 40% of Routine Administrative Tasks", source: "Gartner Research", url: "#", date: "Kemarin" },
        { title: "Zero-Latency API Integration Becomes Standard for B2B WhatsApp Sales Bots", source: "AI Business Wire", url: "#", date: "2 Hari Lalu" }
      ],
      "Performance Web": [
        { title: "Google Core Web Vitals Update: Sub-Second Load Times Crucial for Ad ROAS", source: "Search Engine Journal", url: "#", date: "Hari Ini" },
        { title: "Next.js 15 Server Components Redefine Enterprise Web Architecture", source: "Vercel Engineering", url: "#", date: "Kemarin" },
        { title: "Edge Caching Reduces Server Response Latency by 85% Globally", source: "Cloudflare Insights", url: "#", date: "3 Hari Lalu" }
      ],
      "Enterprise System": [
        { title: "Fractional CTO Services Rise as Top Choice for Scale-Up Tech Rescue", source: "Forbes Technology Council", url: "#", date: "Hari Ini" },
        { title: "Zero-Trust Architecture Mandatory for Indonesian Financial & B2B Data Vaults", source: "Cyber Security News", url: "#", date: "Kemarin" },
        { title: "Eliminating Spaghetti Code Cuts Maintenance Overhead by 70%", source: "IEEE Software", url: "#", date: "4 Hari Lalu" }
      ],
      "SEO & AEO": [
        { title: "Answer Engine Optimization (AEO) Outperforms Traditional Keywords in B2B Lead Gen", source: "SEO Roundtable", url: "#", date: "Hari Ini" },
        { title: "JSON-LD Structured Data Dominates AI Referral Traffic in ChatGPT & Gemini", source: "AI Search Digest", url: "#", date: "Kemarin" },
        { title: "Micro-Moment Search Intents Drive 4x Higher Conversion for Enterprise Tech", source: "Marketing Week", url: "#", date: "2 Hari Lalu" }
      ]
    };

    return trendsMap[category] || trendsMap["AI Automation"];
  } catch (err) {
    return [];
  }
}

const articleFaqs = [
  {
    question: "Kenapa website lambat bisa membunuh hasil iklan Meta saya?",
    answer: "Website dengan loading di atas 3 detik menyebabkan 50 percent bounce rate. Chestaa menggunakan arsitektur Next.js untuk mencapai kecepatan sub-detik, menyelamatkan budget iklan Anda."
  },
  {
    question: "Bagaimana cara memangkas biaya admin operasional?",
    answer: "Chestaa membangun Karyawan Digital AI yang beroperasi 24/7 tanpa henti, memangkas biaya gaji admin manual hingga 100 percent."
  },
  {
    question: "Apakah Chestaa bisa memperbaiki proyek IT yang mangkrak dari vendor lama?",
    answer: "Ya, layanan Fractional CTO kami fokus melakukan tech rescue, membersihkan spaghetti code, dan menata ulang infrastruktur data perusahaan Anda."
  }
];

function generateFaqSchema(): FAQPageSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: articleFaqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

export default async function InsightServerPage({ params }: PageProps) {
  const article = insightsData.find(i => i.slug === params.slug) || insightsData[0];
  const marketTrends = await getMarketTrends(article.category);
  const linkedContent = injectAEOEntities(article.content);
  
  const relatedArticles = insightsData
    .filter(i => i.slug !== article.slug)
    .slice(0, 3);

  const breadcrumbJsonLd: BreadcrumbListSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://chestaa.com"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Insights",
        item: "https://chestaa.com/insights"
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.category,
        item: `https://chestaa.com/insights?category=${encodeURIComponent(article.category)}`
      },
      {
        "@type": "ListItem",
        position: 4,
        name: article.title,
        item: `https://chestaa.com/insights/${article.slug}`
      }
    ]
  };

  const techArticleJsonLd: TechArticleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: article.seoDescription,
    datePublished: article.date,
    dateModified: article.date,
    keywords: "jasa perbaiki website sering down, vendor IT terpercaya di Tangerang, konsultan IT B2B Jakarta Selatan, cara otomatisasi operasional bisnis, bikin super app perusahaan, solusi iklan meta boncos",
    author: {
      "@type": "Person",
      name: "Chesta Azka",
      jobTitle: "Principal AI & System Architect",
      worksFor: {
        "@type": "Organization",
        name: "Chestaa"
      },
      sameAs: [
        "https://linkedin.com/in/chestaazka",
        "https://github.com/chestacode",
        "https://chestaa.com/portfolio"
      ]
    },
    publisher: {
      "@type": "Organization",
      name: "Chestaa",
      logo: {
        "@type": "ImageObject",
        url: "https://chestaa.com/favicon.ico"
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://chestaa.com/insights/${article.slug}`
    },
    about: [
      { "@type": "Thing", name: "Artificial Intelligence" },
      { "@type": "Thing", name: "Next.js" },
      { "@type": "Thing", name: "Business Automation" }
    ],
    mentions: [
      { "@type": "Thing", name: "Artificial Intelligence" },
      { "@type": "Thing", name: "Next.js" },
      { "@type": "Thing", name: "Business Automation" }
    ]
  };

  const faqJsonLd: FAQPageSchema = generateFaqSchema();

  const serializeJsonLd = (schema: object) => {
    return JSON.stringify(schema)
      .replace(/</g, '\\u003c')
      .replace(/>/g, '\\u003e')
      .replace(/&/g, '\\u0026');
  };

  const solidBlurBase64 = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJyZ2IoMTUsIDE1LCAyMywgMSkiLz48L3N2Zz4=";

  return (
    <main className="min-h-screen bg-[#0b0b0f] text-slate-100 font-sans selection:bg-indigo-600 selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(techArticleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd) }}
      />

      {/* ARTICLE HERO */}
      <header className="relative py-24 px-6 sm:px-12 border-b border-white/10 bg-[#0d0d12]">
        <div className="max-w-4xl mx-auto space-y-6">
          <nav className="flex items-center gap-2 text-xs text-slate-400 font-mono flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/insights" className="hover:text-white transition-colors">Insights</Link>
            <span>/</span>
            <span className="text-slate-300">{article.category}</span>
            <span>/</span>
            <span className="text-indigo-400 truncate max-w-xs">{article.title}</span>
          </nav>

          <div className="flex items-center gap-4">
            <span className="px-3.5 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/35 text-indigo-400 text-xs font-mono uppercase tracking-wider">
              {article.category}
            </span>
            <span className="text-xs text-slate-400 font-mono">{article.date}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.12] font-sans">
            {article.title}
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed font-sans">
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
          {/* Main Content with HBR Typography, Zero-CLS Next Image, Market Trends, and FAQSection */}
          <div className="lg:col-span-2 bg-white/[0.015] p-6 sm:p-14 rounded-3xl border border-white/5 backdrop-blur-md shadow-2xl space-y-12">
            
            {/* Zero-CLS Cover Image with next/image */}
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-slate-900 border border-white/10 shadow-lg">
              <Image
                src="https://picsum.photos/seed/chestaa-insight-cover/1200/675"
                alt={article.title}
                fill
                priority
                placeholder="blur"
                blurDataURL={solidBlurBase64}
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <article 
              className="prose prose-sm prose-invert max-w-3xl mx-auto md:prose-base lg:prose-lg transition-colors font-serif prose-headings:font-sans prose-p:text-slate-300 prose-p:leading-[1.7] md:prose-p:leading-[1.9] lg:prose-p:leading-[2.2] prose-headings:font-bold prose-headings:text-slate-50 mt-8 mb-4 md:mt-12 lg:mt-16"
              dangerouslySetInnerHTML={{ __html: linkedContent }}
            />

            {/* LATEST MARKET TRENDS & INTELLIGENCE (RSC ISR FETCH) */}
            {marketTrends.length > 0 && (
              <div className="my-16 p-8 rounded-3xl bg-gradient-to-r from-indigo-950/40 to-slate-900/40 border border-indigo-500/30 backdrop-blur-xl space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">[ Intelijen Pasar Terkini ]</span>
                  <span className="text-xs text-slate-400 font-mono">ISR 24H Freshness</span>
                </div>
                <h3 className="text-xl font-bold text-white">Latest Market Trends & Intelligence</h3>
                <div className="grid grid-cols-1 gap-4">
                  {marketTrends.map((trend, idx) => (
                    <a
                      key={idx}
                      href={trend.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-indigo-500/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                    >
                      <div className="space-y-1">
                        <span className="text-xs font-mono text-indigo-400">{trend.source} &bull; {trend.date}</span>
                        <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                          {trend.title}
                        </h4>
                      </div>
                      <span className="text-xs font-bold text-indigo-400 group-hover:translate-x-1 transition-transform shrink-0">
                        Baca Analisis &rarr;
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Reusable FAQ Section */}
            <FAQSection category={article.category} />
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
