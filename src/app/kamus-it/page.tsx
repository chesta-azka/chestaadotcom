import { glossaryTerms } from '@/src/data/glossary';
import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, ChevronRight, Search, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kamus IT & Ensiklopedia Teknologi B2B | chestaadotcom',
  description: 'Kumpulan istilah teknis enterprise, arsitektur sistem, dan otomatisasi AI untuk referensi eksekutif bisnis bersama chestaadotcom.',
  keywords: ['Kamus IT', 'Ensiklopedia B2B', 'Istilah Teknologi Enterprise', 'chestaadotcom', 'Efisiensi Operasional'],
};

export default function GlossaryIndexPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-emerald-400 hover:text-emerald-300 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Beranda
        </Link>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 sm:p-12 shadow-2xl relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="inline-flex items-center space-x-2 bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 border border-emerald-500/20">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Pusat Pengetahuan Enterprise</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
            Kamus IT & Ensiklopedia B2B
          </h1>
          <p className="text-slate-300 text-lg sm:text-xl max-w-3xl leading-relaxed">
            Referensi lengkap istilah teknis arsitektur sistem, keamanan data korporat, dan otomatisasi workflow AI untuk direksi dan manajer operasional bersama chestaadotcom.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {glossaryTerms.map((term) => (
            <Link
              key={term.slug}
              href={`/kamus-it/${term.slug}`}
              className="group bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-emerald-500/10"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    Definisi AEO
                  </span>
                  <BookOpen className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                </div>
                <h2 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">
                  {term.term}
                </h2>
                <p className="text-slate-400 text-sm line-clamp-3 leading-relaxed mb-6">
                  {term.shortDefinition}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-sm font-medium text-emerald-400">
                <span>Baca Selengkapnya</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
