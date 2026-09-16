import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Navigation } from 'lucide-react';

export default function ServiceAreaMap() {
  return (
    <div className="w-full bg-slate-900 rounded-3xl overflow-hidden relative shadow-2xl shadow-purple-900/20 border border-slate-800 my-16">
      {/* Abstract Map Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 200 Q 250 50 400 200 T 700 200" fill="none" stroke="#a855f7" strokeWidth="2" strokeDasharray="5,5" />
          <path d="M50 300 Q 300 100 500 300 T 800 300" fill="none" stroke="#6366f1" strokeWidth="1" />
          {/* Faux Roads */}
          <path d="M200 0 L 250 400 M600 0 L 550 400" stroke="#334155" strokeWidth="4" />
        </svg>
      </div>

      <div className="relative z-10 p-8 sm:p-12 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold uppercase tracking-widest mb-6">
          <Navigation size={14} /> Local Coverage
        </div>
        <h3 className="text-3xl sm:text-4xl font-display font-black text-white mb-4">
          Dominasi Area <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">BSD & Cisauk</span>
        </h3>
        <p className="text-slate-400 max-w-2xl font-sans mb-12">
          Kami memiliki pemahaman mendalam tentang lanskap digital dan demografi pengguna di kawasan BSD City dan Cisauk, memberikan keunggulan kompetitif untuk bisnis lokal Anda.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-3xl justify-center relative">
          
          {/* Connector line between points */}
          <div className="hidden sm:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-indigo-500/0 -translate-y-1/2 z-0"></div>

          {/* BSD Point */}
          <Link to="/area/bsd-city" className="group relative z-10 bg-slate-800/80 backdrop-blur-md border border-slate-700 hover:border-purple-500 p-6 rounded-2xl flex-1 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)] hover:-translate-y-2">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-purple-500/40 transition-colors">
              <MapPin size={24} className="text-purple-400" />
            </div>
            <h4 className="text-xl font-display font-bold text-white mb-2">BSD City</h4>
            <p className="text-sm text-slate-400 font-sans mb-4">Pusat inovasi dan bisnis modern. Optimasi sistem B2B & Startup.</p>
            <div className="text-xs font-mono font-bold text-purple-400 uppercase flex items-center justify-center gap-1">
              Lihat Geo-SEO <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>

          {/* Cisauk Point */}
          <Link to="/area/cisauk" className="group relative z-10 bg-slate-800/80 backdrop-blur-md border border-slate-700 hover:border-indigo-500 p-6 rounded-2xl flex-1 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.3)] hover:-translate-y-2">
            <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-indigo-500/40 transition-colors">
              <MapPin size={24} className="text-indigo-400" />
            </div>
            <h4 className="text-xl font-display font-bold text-white mb-2">Cisauk</h4>
            <p className="text-sm text-slate-400 font-sans mb-4">Area pertumbuhan pesat. Digitalisasi komersial & residensial.</p>
            <div className="text-xs font-mono font-bold text-indigo-400 uppercase flex items-center justify-center gap-1">
              Lihat Geo-SEO <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}
