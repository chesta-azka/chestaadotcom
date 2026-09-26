import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Cpu, Zap, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import chestaPhoto from '../../assets/images/regenerated_image_1787838669318.png';
import AnimatedHeading from '../atoms/AnimatedHeading';
import MagneticButton from '../atoms/MagneticButton';

import OptimizedImage from '../atoms/OptimizedImage';

export default function AboutMeSection() {
  const avatarUrl = chestaPhoto;

  return (
    <section className="relative w-full py-14 sm:py-20 bg-gradient-to-b from-white via-purple-50/20 to-white border-y border-slate-200">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-purple-700 bg-purple-50 px-3 py-1.5 rounded-full border border-purple-200 inline-block mb-4 shadow-sm">
            THE ARCHITECT
          </span>
          <AnimatedHeading as="h2" className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-slate-900 tracking-tight font-display mb-4">
            Membangun Standar Baru <br className="hidden sm:block" /> di Era Digital &amp; AI.
          </AnimatedHeading>
          <p className="text-slate-500 font-sans text-sm sm:text-base max-w-2xl mx-auto">
            Visi kami adalah mentransformasi kompleksitas teknis menjadi keunggulan kompetitif yang nyata bagi bisnis Anda.
          </p>
        </div>

        {/* Profile & Bio Box with refined border radius */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-12 shadow-xl shadow-purple-900/[0.03] flex flex-col md:flex-row items-center gap-10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-purple-500/10 transition-colors duration-700" />
          
          <div className="relative shrink-0">
            <div className="w-32 h-32 sm:w-44 sm:h-44 bg-slate-100 overflow-hidden rounded-3xl border-2 border-white shadow-2xl shadow-purple-900/10 relative z-10">
              <OptimizedImage 
                src={avatarUrl} 
                alt="Chesta - Lead Digital Architect"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2.5 rounded-2xl border-4 border-white shadow-lg z-20">
              <Zap size={16} fill="currentColor" />
            </div>
            {/* Experience Badge */}
            <div className="absolute -top-4 -left-4 bg-white border border-slate-100 p-3 rounded-2xl shadow-xl z-20 hidden sm:block">
              <div className="text-center">
                <span className="block text-lg font-semibold text-slate-900 font-display">8+</span>
                <span className="block text-[8px] font-mono font-bold text-slate-400 uppercase tracking-tighter">Years Exp</span>
              </div>
            </div>
          </div>

          <div className="flex-1 text-center md:text-left space-y-4 relative z-10">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <AnimatedHeading as="h3" className="text-2xl sm:text-3xl font-semibold text-slate-900 font-display tracking-tight">
                Chesta Azka Sofyan
              </AnimatedHeading>
              <div className="flex gap-1">
                <span className="px-3 py-1 bg-purple-600 text-white text-[10px] font-mono font-bold uppercase rounded-lg shadow-sm">
                  Lead Architect
                </span>
                <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-mono font-bold uppercase rounded-lg shadow-sm">
                  AI Engineer
                </span>
              </div>
            </div>
            <p className="text-slate-600 font-sans text-base sm:text-lg leading-relaxed tracking-tight text-balance">
              "Saya tidak sekadar menulis kode; saya merancang <span className="text-slate-900 font-bold">fondasi digital</span> yang memungkinkan bisnis Anda beroperasi secara otonom dan tumbuh tanpa batas. Fokus saya adalah <span className="text-purple-700 font-bold">ROI teknis</span> dan dominasi pasar."
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center md:justify-start gap-4">
              <MagneticButton
                href="/about"
                className="px-8 py-4 bg-slate-900 text-white hover:bg-purple-700 text-[11px] font-mono font-bold uppercase tracking-widest rounded-2xl transition-all shadow-lg hover:shadow-purple-900/20"
                strength={15}
              >
                <span>Eksplorasi Visi</span>
                <ArrowUpRight size={16} />
              </MagneticButton>
              <MagneticButton
                href="https://wa.me/6282125447232?text=Halo%20Mas%20Chesta,%20saya%20ingin%20konsultasi%20strategis%20untuk%20sistem%20bisnis%20saya"
                className="px-8 py-4 bg-white text-slate-900 border border-slate-200 hover:border-purple-300 hover:text-purple-700 text-[11px] font-mono font-bold uppercase tracking-widest rounded-2xl transition-all shadow-sm"
                strength={15}
              >
                <span>Konsultasi Strategis</span>
                <ArrowUpRight size={16} />
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* 3 Highlight Cards with rounded-xl */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-7 shadow-sm hover:border-purple-300 hover:shadow-md transition-all group">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-purple-50 text-purple-700 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                <Cpu size={20} />
              </div>
              <h4 className="font-bold text-slate-900 text-lg font-display">Operational Autonomy</h4>
            </div>
            <p className="text-sm text-slate-500 font-sans leading-relaxed">Membangun agen AI otonom yang menangani beban kerja 24/7 tanpa intervensi manual.</p>
          </div>
          <div className="bg-white border border-slate-200/90 rounded-2xl p-7 shadow-sm hover:border-purple-300 hover:shadow-md transition-all group">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-purple-50 text-purple-700 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                <Zap size={20} />
              </div>
              <h4 className="font-bold text-slate-900 text-lg font-display">Technical Superiority</h4>
            </div>
            <p className="text-sm text-slate-500 font-sans leading-relaxed">Arsitektur web tingkat lanjut yang dioptimasi untuk kecepatan ekstrem dan skor SEO sempurna.</p>
          </div>
          <div className="bg-white border border-slate-200/90 rounded-2xl p-7 shadow-sm hover:border-purple-300 hover:shadow-md transition-all group">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-purple-50 text-purple-700 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                <Code2 size={20} />
              </div>
              <h4 className="font-bold text-slate-900 text-lg font-display">Strategic Scaling</h4>
            </div>
            <p className="text-sm text-slate-500 font-sans leading-relaxed">Sistem modular yang dirancang untuk tumbuh bersama valuasi bisnis Anda di masa depan.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
