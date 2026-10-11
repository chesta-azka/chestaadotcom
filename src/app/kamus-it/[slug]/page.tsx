import { glossaryTerms, getGlossaryTermBySlug, GlossaryTerm } from '@/src/data/glossary';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BookOpen, CheckCircle2, ChevronRight, Cpu, ArrowLeft, Share2, Layers } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return glossaryTerms.map((term) => ({
    slug: term.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const termData = getGlossaryTermBySlug(resolvedParams.slug);

  if (!termData) {
    return {
      title: 'Istilah Tidak Ditemukan | chestaadotcom',
    };
  }

  const title = `${termData.term} - Kamus IT & Ensiklopedia B2B | chestaadotcom`;
  const description = `${termData.shortDefinition} Pelajari definisi teknis mendalam untuk Skala Enterprise, Efisiensi Operasional, dan ROI bersama chestaadotcom.`;

  return {
    title,
    description,
    keywords: [termData.term, 'Kamus IT Enterprise', 'Definisi Teknologi B2B', 'chestaadotcom', 'Efisiensi Operasional', 'ROI'],
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://chestaadotcom.com/kamus-it/${termData.slug}`,
      siteName: 'chestaadotcom Enterprise IT',
    },
  };
}

export default async function GlossaryDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const termData = getGlossaryTermBySlug(resolvedParams.slug);

  if (!termData) {
    notFound();
  }

  const definedTermSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: termData.term,
    description: termData.shortDefinition,
    inDefinedTermSet: 'https://chestaadotcom.com/kamus-it',
    about: {
      '@type': 'Thing',
      name: 'Enterprise IT & AI Automation',
    },
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }}
      />

      <div className="max-w-4xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-slate-400 mb-8">
          <Link href="/" className="hover:text-emerald-400 transition-colors">Beranda</Link>
          <ChevronRight className="w-4 h-4 text-slate-600" />
          <Link href="/kamus-it" className="hover:text-emerald-400 transition-colors">Kamus IT</Link>
          <ChevronRight className="w-4 h-4 text-slate-600" />
          <span className="text-slate-200 truncate">{termData.term}</span>
        </nav>

        {/* Back Link */}
        <Link href="/" className="inline-flex items-center text-sm font-medium text-emerald-400 hover:text-emerald-300 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Beranda
        </Link>

        {/* Header Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden mb-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="inline-flex items-center space-x-2 bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 border border-emerald-500/20">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Kamus Ensiklopedia IT B2B</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-6">
            {termData.term}
          </h1>

          <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-5 mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">Definisi Singkat (AEO Featured Snippet)</h2>
            <p className="text-lg text-slate-200 leading-relaxed font-medium">
              {termData.shortDefinition}
            </p>
          </div>
        </div>

        {/* Deep Explanation Content */}
        <article className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-8 mb-10 prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <Cpu className="w-6 h-6 mr-3 text-emerald-400" />
            Analisis Mendalam & Relevansi Enterprise
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            {termData.deepExplanation}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-800">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
              <h3 className="text-emerald-400 font-semibold mb-2 flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2 text-emerald-400" />
                Efisiensi Operasional
              </h3>
              <p className="text-slate-400 text-sm">
                Mengurangi redundansi proses manual hingga 85 persen dengan arsitektur otomatisasi berkecepatan tinggi chestaadotcom.
              </p>
            </div>
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
              <h3 className="text-emerald-400 font-semibold mb-2 flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2 text-emerald-400" />
                Return on Investment (ROI)
              </h3>
              <p className="text-slate-400 text-sm">
                Percepatan balik modal melalui eliminasi biaya lisensi SaaS ganda dan peningkatan produktivitas tim internal korporat.
              </p>
            </div>
          </div>
        </article>

        {/* Related Services */}
        {termData.relatedServices && termData.relatedServices.length > 0 && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <Layers className="w-5 h-5 mr-2 text-emerald-400" />
              Solusi & Layanan Terkait di chestaadotcom
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {termData.relatedServices.map((service, index) => (
                <Link
                  key={index}
                  href={`/services/${service.slug}`}
                  className="group bg-slate-950 border border-slate-800 hover:border-emerald-500/50 p-5 rounded-xl transition-all duration-300 flex items-center justify-between"
                >
                  <div>
                    <span className="text-xs text-emerald-400 font-medium block mb-1">Konsultasi Enterprise</span>
                    <h4 className="text-white font-semibold group-hover:text-emerald-300 transition-colors">
                      {service.name}
                    </h4>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
