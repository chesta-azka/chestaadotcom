import Link from 'next/link';
import { ARCHITECTURAL_TEARDOWNS } from '@/data/teardowns';

export const metadata = {
  title: 'Bedah Sistem & Architectural Teardowns | chestaadotcom',
  description: 'Analisis forensik mendalam kegagalan sistem IT korporat dan solusi arsitektur enterprise berskala tinggi oleh chestaadotcom.',
};

export default function TeardownsIndexPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-20 px-6 sm:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-xs uppercase tracking-wider mb-4">
            Forensic System Teardowns
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 text-white">
            Bedah Arsitektur & Kegagalan Sistem IT
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 max-w-3xl leading-relaxed">
            Analisis tanpa kompromi terhadap kegagalan sistem monolitik, latensi core banking, dan kerentanan infrastruktur digital yang merugikan korporasi bernilai miliaran rupiah.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ARCHITECTURAL_TEARDOWNS.map((teardown) => (
            <article 
              key={teardown.slug}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="text-xs font-mono uppercase px-3 py-1 rounded bg-slate-800 text-slate-300">
                    {teardown.industry}
                  </span>
                  <span className="text-xs font-mono text-red-400 font-semibold">
                    CRITICAL INCIDENT
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4 leading-snug">
                  {teardown.incidentTitle}
                </h2>
                <div className="space-y-3 mb-6 text-sm text-slate-300">
                  <p>
                    <b className="text-red-400">Kegagalan Teknis:</b> {teardown.technicalFailure}
                  </p>
                  <p>
                    <b className="text-emerald-400">Solusi chestaadotcom:</b> {teardown.chestaaSolution}
                  </p>
                </div>
              </div>
              
              <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-mono">
                  Forensic ID: {teardown.slug}
                </span>
                <Link
                  href={`/teardowns/${teardown.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Baca Analisis Lengkap &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
