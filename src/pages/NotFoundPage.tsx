import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Home, Sparkles } from 'lucide-react';
import SEOMetadata from '../components/atoms/SEOMetadata';

export default function NotFoundPage() {
  const location = useLocation();
  const path = location.pathname;

  let contextTitle = "Halaman Tidak Ditemukan";
  let contextDesc = "Maaf, tautan yang Anda tuju tidak valid atau telah dipindahkan ke alamat baru.";
  let primaryActionLink = "/";
  let primaryActionLabel = "Kembali ke Beranda";

  if (path.startsWith('/blog')) {
    contextTitle = "Artikel Blog Tidak Ditemukan";
    contextDesc = "Artikel yang Anda cari di jurnal teknologi Chestaa tidak tersedia atau slug-nya telah diubah.";
    primaryActionLink = "/blog";
    primaryActionLabel = "Kembali ke Jurnal Blog";
  } else if (path.startsWith('/services') || path.startsWith('/layanan')) {
    contextTitle = "Layanan Tidak Ditemukan";
    contextDesc = "Halaman layanan arsitektur atau otomatisasi yang Anda cari tidak ditemukan dalam katalog.";
    primaryActionLink = "/services";
    primaryActionLabel = "Lihat Katalog Layanan";
  } else if (path.startsWith('/insights')) {
    contextTitle = "Insight Eksekutif Tidak Ditemukan";
    contextDesc = "Laporan atau studi kasus eksekutif tersebut tidak ditemukan pada basis data kami.";
    primaryActionLink = "/blog";
    primaryActionLabel = "Jelajahi Insights Lainnya";
  }

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-slate-100 flex flex-col items-center justify-center px-6 py-24 selection:bg-indigo-600 selection:text-white font-sans relative overflow-hidden">
      <SEOMetadata
        title={`${contextTitle} | CHESTAA`}
        description={contextDesc}
        currentRoute={path}
      />

      <div className="absolute inset-0 pointer-events-none opacity-25 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      <div className="relative z-10 max-w-xl mx-auto text-center space-y-8 p-8 sm:p-12 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl shadow-2xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-500/35 text-indigo-400 text-xs font-mono uppercase tracking-wider">
          <Sparkles size={13} className="animate-pulse" />
          <span>Error 404 - Path Not Found</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            {contextTitle}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {contextDesc}
          </p>
          <div className="pt-2 font-mono text-xs text-indigo-400">
            [ Path: {path} ]
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            to={primaryActionLink}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-all shadow-lg cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>{primaryActionLabel}</span>
          </Link>
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white font-medium text-sm transition-all border border-white/10 cursor-pointer"
          >
            <Home size={16} />
            <span>Beranda</span>
          </Link>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-wrap justify-center gap-4 text-xs font-mono text-slate-400">
          <Link to="/services" className="hover:text-indigo-400 transition-colors">Layanan</Link>
          <span>-</span>
          <Link to="/portfolio" className="hover:text-indigo-400 transition-colors">Portfolio</Link>
          <span>-</span>
          <Link to="/blog" className="hover:text-indigo-400 transition-colors">Blog</Link>
          <span>-</span>
          <Link to="/case-studies" className="hover:text-indigo-400 transition-colors">Studi Kasus</Link>
        </div>
      </div>
    </div>
  );
}
