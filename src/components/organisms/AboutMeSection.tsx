import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Cpu, Zap, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import chestaPhoto from '../../assets/images/regenerated_image_1787838669318.png';
import AnimatedHeading from '../atoms/AnimatedHeading';

export default function AboutMeSection() {
  const avatarUrl = chestaPhoto;

  return (
    <section className="relative w-full py-14 sm:py-20 bg-gradient-to-b from-white via-purple-50/20 to-white border-y border-slate-200">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-700 bg-purple-50 px-3 py-1.5 rounded-full border border-purple-200 inline-block mb-3 shadow-2xs">
            TENTANG KAMI
          </span>
          <AnimatedHeading as="h2" className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-display">
            Arsitektur Digital Berkualitas Tinggi &amp; Agentic AI
          </AnimatedHeading>
        </div>

        {/* Profile & Bio Box with refined border radius */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-10 shadow-lg shadow-purple-900/5 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative shrink-0">
            <div className="w-28 h-28 sm:w-36 sm:h-36 bg-slate-200 overflow-hidden rounded-2xl border-2 border-purple-200 shadow-md">
              <img 
                src={avatarUrl} 
                alt="Chesta - Lead Digital Architect"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top rounded-xl"
              />
            </div>
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
          </div>

          <div className="flex-1 text-center md:text-left space-y-3 relative z-10">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <AnimatedHeading as="h3" className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                Chesta Azka Sofyan
              </AnimatedHeading>
              <span className="px-3 py-1 bg-purple-100 text-purple-900 text-xs font-mono font-bold uppercase rounded-full">
                Lead Architect
              </span>
            </div>
            <p className="text-slate-700 font-sans text-base sm:text-base leading-[1.8] tracking-[0.015em] text-balance">
              Halo! Saya Chesta, Lead Digital Architect di balik CHESTAADOTCOM. Saya mengkhususkan diri dalam merancang website berkinerja tinggi dan integrasi Agentic AI untuk korporasi serta UMKM di BSD City, Tangerang, Jakarta, Bogor, dan Depok.
            </p>
            <div className="pt-3 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 px-6 py-3 bg-slate-900 text-white hover:bg-purple-900 text-xs font-mono font-bold uppercase tracking-wider rounded-full transition-all shadow-md hover:-translate-y-0.5"
              >
                <span>Baca Profil Lengkap</span>
                <ArrowUpRight size={14} />
              </Link>
              <a
                href="https://wa.me/6282125447232?text=Halo%20Mas%20Chesta,%20saya%20ingin%20konsultasi%20pembuatan%20website"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-6 py-3 bg-white text-slate-900 border border-slate-300 hover:bg-slate-50 text-xs font-mono font-bold uppercase tracking-wider rounded-full transition-all shadow-sm hover:-translate-y-0.5"
              >
                <span>WhatsApp Konsultasi</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* 3 Highlight Cards with rounded-xl */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
          <div className="bg-white border border-slate-200/90 rounded-xl p-6 shadow-sm hover:border-purple-300 transition-all">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="p-2 rounded-lg bg-purple-50 text-purple-700">
                <Cpu size={18} />
              </div>
              <h4 className="font-bold text-slate-900 text-base font-display">Agentic AI</h4>
            </div>
            <p className="text-sm sm:text-sm text-slate-700 font-sans leading-[1.75] tracking-[0.015em]">Otomasi otonom 24/7 untuk interaksi klien dan operasional bisnis.</p>
          </div>
          <div className="bg-white border border-slate-200/90 rounded-xl p-6 shadow-sm hover:border-purple-300 transition-all">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="p-2 rounded-lg bg-purple-50 text-purple-700">
                <Zap size={18} />
              </div>
              <h4 className="font-bold text-slate-900 text-base font-display">Zero-Latency</h4>
            </div>
            <p className="text-sm sm:text-sm text-slate-700 font-sans leading-[1.75] tracking-[0.015em]">Performa instan dengan Next.js 15 dan Cloud infrastructure.</p>
          </div>
          <div className="bg-white border border-slate-200/90 rounded-xl p-6 shadow-sm hover:border-purple-300 transition-all">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="p-2 rounded-lg bg-purple-50 text-purple-700">
                <Code2 size={18} />
              </div>
              <h4 className="font-bold text-slate-900 text-base font-display">Bespoke Code</h4>
            </div>
            <p className="text-sm sm:text-sm text-slate-700 font-sans leading-[1.75] tracking-[0.015em]">Tanpa template kaku. Setiap baris kode dirancang khusus untuk Anda.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
