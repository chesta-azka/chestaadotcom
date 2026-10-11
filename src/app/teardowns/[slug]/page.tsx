import { notFound } from 'next/navigation';
import { ARCHITECTURAL_TEARDOWNS } from '@/data/teardowns';
import Link from 'next/link';
import Breadcrumbs from '@/components/navigation/Breadcrumbs';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ARCHITECTURAL_TEARDOWNS.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const item = ARCHITECTURAL_TEARDOWNS.find((t) => t.slug === slug);
  if (!item) return { title: 'Not Found | chestaadotcom' };

  return {
    title: `${item.incidentTitle} - Bedah Sistem | chestaadotcom`,
    description: `Analisis mendalam mengenai ${item.technicalFailure} dan bagaimana chestaadotcom menyelesaikannya melalui ${item.chestaaSolution}.`,
  };
}

export default async function TeardownDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = ARCHITECTURAL_TEARDOWNS.find((t) => t.slug === slug);

  if (!item) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: item.incidentTitle,
    description: `Analisis forensik arsitektur sistem oleh chestaadotcom untuk industri ${item.industry}.`,
    author: {
      '@type': 'Organization',
      name: 'chestaadotcom',
    },
    publisher: {
      '@type': 'Organization',
      name: 'chestaadotcom',
    },
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-20 px-6 sm:px-12 lg:px-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: 'Beranda', href: '/' },
              { label: 'Bedah Sistem', href: '/teardowns' },
              { label: item.incidentTitle, href: `/teardowns/${item.slug}` },
            ]}
          />
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono uppercase px-3 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
              {item.industry}
            </span>
            <span className="text-xs font-mono uppercase px-3 py-1 rounded bg-red-500/10 border border-red-500/20 text-red-400 font-semibold">
              Forensic Teardown
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            {item.incidentTitle}
          </h1>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xs font-mono text-red-400 uppercase tracking-wider mb-2">Root Cause (Kegagalan Sistem)</h3>
              <p className="text-sm text-slate-300 leading-relaxed font-medium">{item.technicalFailure}</p>
            </div>
            <div>
              <h3 className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">chestaadotcom Engineering Solution</h3>
              <p className="text-sm text-slate-300 leading-relaxed font-medium">{item.chestaaSolution}</p>
            </div>
          </div>
        </div>

        <article className="prose prose-invert prose-slate max-w-none bg-slate-900/40 border border-slate-800/80 rounded-2xl p-8 sm:p-12 leading-relaxed space-y-6">
          <div dangerouslySetInnerHTML={{ __html: item.fullContent }} />
        </article>

        <div className="mt-12 bg-gradient-to-r from-blue-950/40 to-slate-900 border border-blue-500/30 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">Infrastruktur Anda Mengalami Masalah Serupa?</h3>
          <p className="text-slate-400 max-w-xl mx-auto mb-6 text-sm">
            Jangan biarkan arsitektur monolitik menghambat pertumbuhan bisnis Anda. Konsultasikan audit sistem enterprise bersama principal architect chestaadotcom sekarang juga.
          </p>
          <Link
            href="/services"
            className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/30"
          >
            Jadwalkan Arsitektur Audit
          </Link>
        </div>
      </div>
    </main>
  );
}
