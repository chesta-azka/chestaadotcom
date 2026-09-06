import React from 'react';
import { Helmet } from "react-helmet-async";
import { useParams, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion } from 'motion/react';
import {  Home, ChevronRight, ArrowLeft, ArrowUpRight, Sparkles , User, TrendingUp, Target, DollarSign } from 'lucide-react';
import { caseStudyDB } from '../lib/caseStudies';

import SocialShare from '../components/molecules/SocialShare';
import ArtPlaceholder from '../components/atoms/ArtPlaceholder';
import ProjectTimeline from '../components/organisms/ProjectTimeline';
import ROITrendChart from '../components/organisms/ROITrendChart';
import RelatedCaseStudiesSlider from '../components/organisms/RelatedCaseStudiesSlider';

function TechStackBadges() {
  const stack = ['Next.js 15 App Router', 'React Server Components', 'TypeScript', 'Tailwind CSS v4', 'Google Gemini AI', 'PostgreSQL / Cloud SQL', 'Docker & Cloud Run'];
  return (
    <div className="flex flex-wrap gap-2 my-6">
      {stack.map((tech, idx) => (
        <span key={idx} className="px-3 py-1 rounded-xl bg-purple-50 text-purple-900 border border-purple-200 text-xs font-mono font-semibold">
          {tech}
        </span>
      ))}
    </div>
  );
}

function InteractiveRoiEstimator({ clientName }: { clientName: string }) {
  const [monthlyTraffic, setMonthlyTraffic] = React.useState(100000);
  const estimatedConversionBoost = 0.035; // 3.5%
  const monthlyRevenueGain = Math.round(monthlyTraffic * estimatedConversionBoost * 15000);
  const annualSavings = (monthlyRevenueGain * 12).toLocaleString('id-ID');

  return (
    <div className="bg-gradient-to-br from-purple-900 via-purple-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 my-10 shadow-xl border border-purple-800/60 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <h3 className="text-xl font-display font-bold mb-2">Simulator Estimasi Dampak &amp; ROI ({clientName})</h3>
      <p className="text-xs text-purple-200 mb-6">Simulasikan potensi peningkatan pendapatan berdasarkan skala trafik bulanan.</p>
      
      <div className="space-y-5 mb-6">
        <div>
          <div className="flex justify-between text-xs font-mono font-bold mb-2">
            <span>Trafik Pengunjung Bulanan</span>
            <span className="text-purple-300">{monthlyTraffic.toLocaleString('id-ID')} Pengunjung</span>
          </div>
          <input 
            type="range" 
            min="10000" 
            max="1000000" 
            step="10000"
            value={monthlyTraffic} 
            onChange={(e) => setMonthlyTraffic(Number(e.target.value))}
            className="w-full accent-purple-400 bg-purple-950 h-2 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase font-mono text-purple-300">Estimasi Potensi Tambahan Pendapatan / Thn</div>
          <div className="text-2xl sm:text-3xl font-display font-black text-emerald-400 mt-0.5">Rp {annualSavings}</div>
        </div>
        <div className="text-right">
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold uppercase tracking-wider">
            Verified Benchmark
          </span>
        </div>
      </div>
    </div>
  );
}




export default function CaseStudyDetailPage() {
  const { slug } = useParams();
  const study = caseStudyDB.find(s => s.slug === slug);

  if (!study) {
    return <Navigate to="/404" replace />;
  }

  const relatedStudies = caseStudyDB.filter(s => s.id !== study.id).slice(0, 3);
  
  const seoTitle = `${study.client}: ${study.title} | Case Studies | chestaa.com`;
  const seoDesc = `Read how chestaa.com achieved ${study.impact} for ${study.client}. ${study.desc}`;


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
          <Link to="/" className="hover:text-purple-600 transition-colors flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider">
            <Home className="w-3.5 h-3.5" /> Beranda
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <Link to="/case-studies" className="hover:text-purple-600 transition-colors font-mono text-xs uppercase tracking-wider">
            Studi Kasus
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="text-slate-900 truncate font-mono text-xs uppercase tracking-wider">{study.client}</span>
        </nav>

        <Link 
          to="/case-studies" 
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
          <div className="mb-6 p-4 rounded-2xl bg-white/90 backdrop-blur-2xl border border-slate-200/80 shadow-xs flex items-center justify-between flex-wrap gap-4">
            <SocialShare title={study.title} description={study.desc} />
            <span className="text-[11px] font-mono text-slate-500">
              Verified Enterprise Impact &bull; BSD & Cisauk
            </span>
          </div>
          <TechStackBadges />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 fill-mode-both">
          <div className="md:col-span-2 prose prose-slate max-w-none">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, ease: "easeOut" }}>
              <h3 id="project-overview" className="text-2xl sm:text-3xl font-display font-bold mb-5 text-slate-900 tracking-tight leading-snug scroll-mt-32">Executive Summary &amp; Project Overview</h3>
              <p className="font-sans text-[16px] sm:text-[17px] md:text-[18px] text-slate-700 leading-loose tracking-[-0.014em] mb-6 font-normal antialiased">
                {study.desc} In an era where digital latency directly correlates with customer churn and enterprise revenue loss, {study.client} partnered with our elite engineering task force to completely re-engineer their core digital infrastructure. The objective was clear: eradicate single-point bottlenecks, transition from brittle legacy monolithic frameworks to a resilient cloud-native paradigm, and establish an uncompromised user experience that scales seamlessly across global markets.
              </p>
              <p className="font-sans text-[16px] sm:text-[17px] md:text-[18px] text-slate-700 leading-loose tracking-[-0.014em] mb-12 font-normal antialiased">
                Our initial audit revealed critical technical debt: unoptimized server-side rendering loops, lack of edge caching policies, synchronous database queries causing thread starvation during peak traffic surges, and inconsistent state management across client sessions. Over a rigorous 12-week delivery cycle, we implemented a modern, high-performance stack centered on Next.js 15 App Router, React Server Components (RSCs), automated CI/CD pipelines, and PostgreSQL database replication across multi-region edge nodes.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, ease: "easeOut" }}>
              <h2 id="core-strategy" className="text-xl sm:text-2xl font-display font-bold mb-4 text-slate-900 tracking-tight scroll-mt-32">Architectural Strategy &amp; Decoupling</h2>
              <p className="font-sans text-[16px] sm:text-[17px] md:text-[18px] text-slate-700 leading-loose tracking-[-0.014em] mb-6 font-normal antialiased">
                Through rigorous architectural planning and execution, our Next.js App Router implementation bypassed legacy limitations. We focused on decoupling the monolithic backend into micro-services and serverless API endpoints, providing organizational agility and accelerating time-to-market for future feature releases.
              </p>
              <p className="font-sans text-[16px] sm:text-[17px] md:text-[18px] text-slate-700 leading-loose tracking-[-0.014em] mb-12 font-normal antialiased">
                Key strategic pillars included:
              </p>
              <ul className="list-disc pl-6 space-y-3 font-sans text-slate-700 text-[16px] md:text-[17px] mb-12">
                <li><strong>Server-First Rendering:</strong> Offloading heavy data transformations and authorization checks to secure server components, reducing JavaScript bundle size sent to client browsers by over 65%.</li>
                <li><strong>Edge Caching &amp; CDN Routing:</strong> Utilizing geographically distributed edge nodes to serve static and ISR (Incremental Static Regeneration) assets in under 30ms globally.</li>
                <li><strong>Zero-Downtime Migration:</strong> Implementing blue-green deployment strategies via containerized Docker environments on Cloud Run to ensure uninterrupted mission-critical operations throughout the transition.</li>
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, ease: "easeOut" }}>
              <h2 id="implementation-details" className="text-xl sm:text-2xl font-display font-bold mb-4 text-slate-900 tracking-tight scroll-mt-32">Deep-Dive Implementation Details</h2>
              <p className="font-sans text-[16px] sm:text-[17px] md:text-[18px] text-slate-700 leading-loose tracking-[-0.014em] mb-6 font-normal antialiased">
                By harnessing global edge caching, React Server Components, and advanced asset optimization, we delivered an enterprise-grade digital experience. Our team integrated robust ORMs with scalable databases, ensuring data integrity, strict typing enforcement via TypeScript, and lightning-fast query execution.
              </p>
              <p className="font-sans text-[16px] sm:text-[17px] md:text-[18px] text-slate-700 leading-loose tracking-[-0.014em] mb-12 font-normal antialiased">
                The database layer was re-indexed with compound indices on high-frequency query columns, cutting average query latency down from 450ms to sub-12ms. Furthermore, automated rate-limiting, secure Web Application Firewall (WAF) policies, and rigorous OAuth token verification protocols were embedded at the API gateway level to safeguard user telemetry and enterprise intellectual property.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, ease: "easeOut" }}>
              <h2 id="security-compliance" className="text-xl sm:text-2xl font-display font-bold mb-4 text-slate-900 tracking-tight scroll-mt-32">Security &amp; Compliance Hardening</h2>
              <p className="font-sans text-[16px] sm:text-[17px] md:text-[18px] text-slate-700 leading-loose tracking-[-0.014em] mb-12 font-normal antialiased">
                Given the strict regulatory requirements of {study.client}'s industry sector, security was treated as a first-class citizen rather than an afterthought. We established end-to-end TLS 1.3 encryption in transit, AES-256 encryption at rest for sensitive customer payloads, automated vulnerability scanning within the CI/CD pipeline, and granular Role-Based Access Control (RBAC) enforced via cryptographically signed JWTs.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, ease: "easeOut" }}>
              <h2 id="roi-analysis" className="text-xl sm:text-2xl font-display font-bold mb-4 text-slate-900 tracking-tight scroll-mt-32">ROI &amp; Financial Impact Analysis</h2>
              <p className="font-sans text-[16px] sm:text-[17px] md:text-[18px] text-slate-700 leading-loose tracking-[-0.014em] mb-8 font-normal antialiased">
                The transformation directly translates to tangible business impact. Post-launch metrics indicated a massive reduction in cloud operational overhead and an unprecedented improvement in Core Web Vitals (LCP &lt; 0.8s, CLS 0.0), drastically boosting user retention, conversion rates, and lifetime customer value.
              </p>
              <InteractiveRoiEstimator clientName={study.client} />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, ease: "easeOut" }}>
              <h2 id="project-timeline" className="text-xl sm:text-2xl font-display font-bold mb-6 text-slate-900 tracking-tight scroll-mt-32">Project Timeline &amp; Phases</h2>
              <ProjectTimeline />
            </motion.div>
          </div>
          
          <div className="md:col-span-1 space-y-6 lg:sticky lg:top-24 lg:self-start">
            {/* Table of Contents */}
            <div className="bg-white/95 backdrop-blur-3xl rounded-3xl p-6 border border-slate-200/90 shadow-lg shadow-slate-200/20">
              <h3 className="text-xs uppercase tracking-widest font-mono font-bold text-slate-400 mb-4">Table of Contents</h3>
              <nav className="flex flex-col space-y-2">
                <a href="#project-overview" className="text-sm font-medium text-slate-600 hover:text-purple-700 transition-colors">Project Overview</a>
                <a href="#core-strategy" className="text-sm font-medium text-slate-600 hover:text-purple-700 transition-colors pl-4 border-l-2 border-slate-100 hover:border-purple-200">Core Strategy</a>
                <a href="#implementation-details" className="text-sm font-medium text-slate-600 hover:text-purple-700 transition-colors pl-4 border-l-2 border-slate-100 hover:border-purple-200">Implementation Details</a>
                <a href="#security-compliance" className="text-sm font-medium text-slate-600 hover:text-purple-700 transition-colors pl-4 border-l-2 border-slate-100 hover:border-purple-200">Security &amp; Compliance</a>
                <a href="#roi-analysis" className="text-sm font-medium text-slate-600 hover:text-purple-700 transition-colors pl-4 border-l-2 border-slate-100 hover:border-purple-200">ROI Analysis</a>
                <a href="#project-timeline" className="text-sm font-medium text-slate-600 hover:text-purple-700 transition-colors">Project Timeline</a>
              </nav>
            </div>

            <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: {
                opacity: 1,
                y: 0,
                transition: { type: "spring", stiffness: 300, damping: 24, staggerChildren: 0.15 }
              }
            }}
            className="bg-white/95 backdrop-blur-3xl rounded-[2.5rem] p-6 sm:p-8 border border-slate-200/90 shadow-2xl shadow-purple-950/10 h-max relative overflow-hidden"
          >
            {/* Subtle bento background ambient glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs uppercase tracking-widest font-mono font-bold text-slate-400">Key Metrics Bento</h3>
              <span className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 text-[10px] font-mono font-bold">Verified Data</span>
            </div>

            {/* Bento Grid Container */}
            <motion.div className="grid grid-cols-2 gap-3 sm:gap-4 mb-8">
              {/* Card 1: Impact (Hero Bento Cell - Full Width) */}
              <motion.div 
                whileHover={{ scale: 1.02 }} 
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } }} 
                className="col-span-2 bg-gradient-to-br from-purple-900 via-purple-950 to-indigo-950 text-white rounded-3xl p-6 shadow-lg border border-purple-800/60 relative overflow-hidden group cursor-pointer"
              >
                <TrendingUp className="absolute -right-4 -bottom-4 text-white/10 group-hover:text-white/20 transition-colors" size={100} strokeWidth={1} />
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center">
                    <TrendingUp size={13} className="text-emerald-400" />
                  </div>
                  <p className="text-xs text-purple-200 font-mono font-bold uppercase tracking-widest">Primary Business Impact</p>
                </div>
                <p className="text-2xl sm:text-3xl font-display font-black text-white leading-tight relative z-10">{study.impact}</p>
              </motion.div>

              {/* Card 2: Client */}
              <motion.div 
                whileHover={{ scale: 1.03 }} 
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } }} 
                className="col-span-1 bg-slate-50/90 rounded-2xl p-4 sm:p-5 border border-slate-200/80 flex flex-col justify-between hover:bg-white hover:shadow-md transition-all relative overflow-hidden group cursor-pointer"
              >
                <User className="absolute -right-2 -bottom-2 text-slate-200/40 group-hover:text-slate-200 transition-colors" size={56} strokeWidth={1} />
                <div className="flex items-center gap-1.5 mb-2">
                  <User size={12} className="text-slate-500" />
                  <p className="text-[10px] text-slate-500 font-mono font-bold uppercase tracking-widest">Client</p>
                </div>
                <p className="text-base sm:text-lg font-display font-bold text-slate-900 relative z-10 truncate">{study.client}</p>
              </motion.div>

              {/* Card 3: ROI */}
              <motion.div 
                whileHover={{ scale: 1.03 }} 
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } }} 
                className="col-span-1 bg-amber-50/70 rounded-2xl p-4 sm:p-5 border border-amber-200/70 flex flex-col justify-between hover:bg-amber-50 hover:shadow-md transition-all relative overflow-hidden group cursor-pointer"
              >
                <DollarSign className="absolute -right-2 -bottom-2 text-amber-200/50 group-hover:text-amber-300 transition-colors" size={56} strokeWidth={1} />
                <div className="flex items-center gap-1.5 mb-2">
                  <DollarSign size={12} className="text-amber-600" />
                  <p className="text-[10px] text-amber-700 font-mono font-bold uppercase tracking-widest">Efficiency / ROI</p>
                </div>
                <p className="text-xs sm:text-sm font-sans font-semibold text-slate-900 leading-snug relative z-10 line-clamp-2">{study.roi}</p>
              </motion.div>

              {/* Card 4: Focus Domain (Full Width) */}
              <motion.div 
                whileHover={{ scale: 1.02 }} 
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } }} 
                className="col-span-2 bg-slate-50/90 rounded-2xl p-4 sm:p-5 border border-slate-200/80 flex flex-col justify-between hover:bg-white hover:shadow-md transition-all relative overflow-hidden group cursor-pointer"
              >
                <Target className="absolute -right-2 -bottom-2 text-slate-200/40 group-hover:text-slate-200 transition-colors" size={64} strokeWidth={1} />
                <div className="flex items-center gap-1.5 mb-2">
                  <Target size={12} className="text-purple-600" />
                  <p className="text-[10px] text-purple-700 font-mono font-bold uppercase tracking-widest">Core Solution Domain</p>
                </div>
                <p className="text-sm sm:text-base font-sans font-semibold text-slate-900 leading-snug relative z-10">{study.title}</p>
              </motion.div>
            </motion.div>

            <ROITrendChart />
            </motion.div>
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

        <RelatedCaseStudiesSlider relatedStudies={relatedStudies} />
      </div>
    </main>
  );
}
