import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CASE_STUDIES, getCaseStudyBySlug } from '../../../data/case-studies';
import Link from 'next/link';
import { TrendingUp, Server, ShieldCheck, ArrowLeft, CheckCircle2, Building2, MapPin, Calendar } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CASE_STUDIES.map((cs) => ({
    slug: cs.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cs = CASE_STUDIES.find((item) => item.slug === slug);
  if (!cs) return { title: 'Studi Kasus | chestaadotcom' };

  return {
    title: `${cs.title} | Studi Kasus chestaadotcom`,
    description: `Analisis mendalam studi kasus ${cs.clientIndustry} di ${cs.location}. ROI: ${cs.roiMetrics}. Arsitektur: ${cs.architectureUsed}.`,
  };
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const cs = CASE_STUDIES.find((item) => item.slug === slug);

  if (!cs) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: cs.title,
    description: cs.problem,
    author: {
      '@type': 'Organization',
      name: 'chestaadotcom',
      url: 'https://chestaadotcom.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'chestaadotcom',
      logo: {
        '@type': 'ImageObject',
        url: 'https://chestaadotcom.com/logo.png',
      },
    },
    about: {
      '@type': 'Thing',
      name: cs.clientIndustry,
    },
    keywords: `${cs.clientIndustry}, ${cs.location}, ${cs.architectureUsed}, ${cs.roiMetrics}`,
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-purple-900 selection:text-white">
      {/* JSON-LD Schema for AEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Top Navigation Bar */}
      <nav className="border-b border-slate-200 bg-white sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/studi-kasus" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-purple-900 transition-colors">
            <ArrowLeft size={16} />
            <span>Kembali ke Studi Kasus</span>
          </Link>
          <div className="text-xs font-mono uppercase tracking-widest px-3 py-1 bg-purple-50 text-purple-800 rounded-full border border-purple-200">
            CHESTAADOTCOM ENTERPRISE BRIEF
          </div>
        </div>
      </nav>

      {/* Article Header (Bloomberg Financial Terminal Style) */}
      <header className="bg-white border-b border-slate-200 py-16 px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-500 uppercase tracking-wider">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-100 text-slate-800 font-medium">
              <Building2 size={14} className="text-purple-700" />
              {cs.clientIndustry}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-100 text-slate-800 font-medium">
              <MapPin size={14} className="text-purple-700" />
              {cs.location}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-100 text-slate-800 font-medium">
              <Calendar size={14} className="text-purple-700" />
              Implementasi {cs.implementationTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
            {cs.title}
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed font-normal">
            {cs.summary}
          </p>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100">
            {cs.metrics.map((m, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-1">{m.label}</div>
                <div className="text-2xl font-black text-purple-950">{m.value}</div>
                <div className="text-xs font-semibold text-emerald-700 mt-1">{m.change}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
        {/* Problem Statement */}
        <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold">
              !
            </div>
            <h2 className="text-xl font-bold text-slate-950">Tantangan & Inefisiensi Awal</h2>
          </div>
          <p className="text-slate-700 leading-relaxed text-base">
            {cs.problem}
          </p>
        </section>

        {/* Architecture & Solution */}
        <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
              <Server size={20} />
            </div>
            <h2 className="text-xl font-bold text-slate-950">Arsitektur & Solusi chestaadotcom</h2>
          </div>
          <p className="text-slate-700 leading-relaxed text-base">
            Tim arsitek chestaadotcom merancang solusi end-to-end yang menghilangkan hambatan sistem legacy:
          </p>
          <div className="p-4 rounded-xl bg-purple-950 text-purple-100 font-mono text-sm border border-purple-900">
            {cs.architectureUsed}
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <ShieldCheck size={20} />
            </div>
            <h2 className="text-xl font-bold text-slate-950">Poin Keunggulan & Dampak Jangka Panjang</h2>
          </div>
          <div className="space-y-3">
            {cs.keyTakeaways.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 size={20} className="text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-slate-700 font-medium text-sm">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Call To Action Box */}
        <section className="bg-gradient-to-br from-purple-950 via-slate-900 to-slate-950 p-10 rounded-3xl text-white shadow-xl space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-900/60 border border-purple-700 text-purple-200 text-xs font-mono uppercase tracking-wider">
            <TrendingUp size={14} className="text-purple-400" />
            <span>ENTERPRISE AUDIT PROGRAM</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Ingin hasil ROI seperti {cs.clientIndustry} ini? Jadwalkan audit arsitektur Anda.
          </h3>
          <p className="text-slate-300 max-w-xl mx-auto text-sm">
            Diskusikan kebutuhan otomasi workflow dan modernisasi sistem IT korporat Anda langsung dengan Principal Architect chestaadotcom.
          </p>
          <div className="pt-2">
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-purple-950 font-bold text-sm shadow-lg hover:bg-slate-100 transition-all transform hover:-translate-y-0.5"
            >
              Jadwalkan Audit Arsitektur Sekarang
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
