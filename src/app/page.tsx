'use client';

import React, { useState, useEffect } from 'react';
import { FeaturedCaseStudies } from '../components/FeaturedCaseStudies';
import { MessageCircle, ArrowRight, ChevronDown, Terminal, Cpu, Globe, Shield, Zap, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

function TypewriterKeyword() {
  const words = [
    'Otomasi IT Skala Korporasi',
    'Agentic AI Integration',
    'High-Performance Web',
    'Enterprise Solutions'
  ];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = words[currentWordIndex];
    let typingSpeed = isDeleting ? 40 : 80;

    const handleTyping = () => {
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-900 via-indigo-800 to-purple-950 border-r-2 border-purple-700 pr-1 animate-pulse">
      {currentText}
    </span>
  );
}

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollOpacity = Math.max(0, 1 - scrollY / 200);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'CHESTAADOTCOM',
    image: 'https://chestaa.com/logo.png',
    description: 'Agency IT Solution & Jasa Pembuatan Website Modern oleh CHESTAADOTCOM.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'BSD City',
      addressRegion: 'Banten',
      addressCountry: 'ID'
    },
    areaServed: ['BSD City', 'Cisauk', 'Tangerang', 'Jakarta', 'Indonesia'],
    url: 'https://chestaa.com',
    priceRange: '$$'
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center pb-24 px-4 sm:px-6 lg:px-8 bg-white text-slate-900 selection:bg-purple-200 selection:text-purple-950 overflow-hidden">
      
      {/* Inject JSON-LD for Local SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Two-Column Minimalist Hero Section */}
      <section className="w-full max-w-7xl mx-auto pt-24 sm:pt-32 md:pt-36 pb-20 min-h-[90vh] flex flex-col justify-center relative">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Copywriting, and CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Agency Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 text-purple-900 text-xs font-mono font-semibold mb-6 border border-purple-100">
              <Zap size={13} className="text-purple-700 fill-purple-700" />
              <span>CHESTAADOTCOM • Premier IT Solution Agency</span>
            </div>

            {/* High-Impact Headline with Typewriter Effect */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight leading-[1.12] text-slate-900 min-h-[140px] sm:min-h-[160px]">
              Arsitektur Website Modern &amp; <br />
              <TypewriterKeyword />
            </h1>

            {/* Improved Copywriting focused on Agency IT Solution */}
            <p className="mt-2 text-base sm:text-lg text-slate-600 font-sans max-w-xl leading-relaxed">
              <strong>CHESTAADOTCOM</strong> adalah agency IT solution terdepan yang berpusat di BSD City. Kami menghadirkan solusi rekayasa perangkat lunak full-stack, performa web super cepat, dan integrasi Agentic AI untuk mengakselerasi transformasi digital bisnis Anda secara efisien.
            </p>

            {/* Primary CTA Buttons with Pulsating Motion */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <motion.a
                href="https://wa.me/6282125447232?text=Halo%20CHESTADOTCOM,%20saya%20tertarik%20untuk%20konsultasi%20solusi%20IT%20dan%20pembuatan%20website%20korporat."
                target="_blank"
                rel="noopener noreferrer"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-purple-950 hover:bg-purple-900 text-white font-sans text-sm sm:text-base font-bold shadow-lg shadow-purple-950/20 transition-colors cursor-pointer w-full sm:w-auto"
              >
                <MessageCircle size={18} className="text-emerald-400 fill-emerald-400/20" />
                <span>Konsultasi Proyek di WhatsApp</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </motion.a>

              <Link
                to="/portfolio"
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-sans text-sm sm:text-base font-semibold border border-slate-200 transition-all cursor-pointer w-full sm:w-auto"
              >
                <span>Lihat Portofolio</span>
                <ArrowRight size={15} className="text-slate-400 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Quick Metrics */}
            <div className="mt-10 pt-6 border-t border-slate-100 flex items-center gap-8 text-xs font-mono text-slate-500">
              <div>
                <span className="font-bold text-slate-900 text-base block">50+</span>
                <span>Proyek Enterprise</span>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div>
                <span className="font-bold text-slate-900 text-base block">99.98%</span>
                <span>Uptime Cloud</span>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div>
                <span className="font-bold text-slate-900 text-base block">&lt;0.5s</span>
                <span>Sub-Second Response</span>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Minimalist Illustration / Accent Element with Hover Animations */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-md bg-gradient-to-br from-slate-900 via-slate-800 to-purple-950 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-slate-800/80 overflow-hidden">
              {/* Glow accent */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-600/30 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col gap-5">
                <div className="flex items-center justify-between border-b border-slate-700/60 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500" />
                    <span className="w-3 h-3 rounded-full bg-amber-500" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-xs font-mono text-purple-300 bg-purple-950/80 px-2.5 py-1 rounded border border-purple-800/60">
                    system.runtime.active
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs text-slate-300">
                  <motion.div 
                    whileHover={{ scale: 1.03, x: 4 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="flex items-center gap-2 bg-slate-800/60 p-3 rounded-xl border border-slate-700/50 cursor-pointer"
                  >
                    <motion.div whileHover={{ rotate: 15, scale: 1.2 }} transition={{ duration: 0.2 }}>
                      <Terminal size={16} className="text-purple-400 shrink-0" />
                    </motion.div>
                    <span className="truncate">Next.js 15 App Router &amp; SSR</span>
                  </motion.div>

                  <motion.div 
                    whileHover={{ scale: 1.03, x: 4 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="flex items-center gap-2 bg-slate-800/60 p-3 rounded-xl border border-slate-700/50 cursor-pointer"
                  >
                    <motion.div whileHover={{ rotate: 15, scale: 1.2 }} transition={{ duration: 0.2 }}>
                      <Cpu size={16} className="text-emerald-400 shrink-0" />
                    </motion.div>
                    <span className="truncate">Agentic AI &amp; LLM Integration</span>
                  </motion.div>

                  <motion.div 
                    whileHover={{ scale: 1.03, x: 4 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="flex items-center gap-2 bg-slate-800/60 p-3 rounded-xl border border-slate-700/50 cursor-pointer"
                  >
                    <motion.div whileHover={{ rotate: 15, scale: 1.2 }} transition={{ duration: 0.2 }}>
                      <Globe size={16} className="text-indigo-400 shrink-0" />
                    </motion.div>
                    <span className="truncate">Cloud Firestore &amp; GCP Enterprise</span>
                  </motion.div>

                  <motion.div 
                    whileHover={{ scale: 1.03, x: 4 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="flex items-center gap-2 bg-slate-800/60 p-3 rounded-xl border border-slate-700/50 cursor-pointer"
                  >
                    <motion.div whileHover={{ rotate: 15, scale: 1.2 }} transition={{ duration: 0.2 }}>
                      <Shield size={16} className="text-amber-400 shrink-0" />
                    </motion.div>
                    <span className="truncate">Strict CSP &amp; WCAG AA Security</span>
                  </motion.div>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-slate-700/60">
                  <span>Status: Operational</span>
                  <span className="text-emerald-400 font-bold">100/100 Score</span>
                </div>
              </div>

            </div>
          </motion.div>

        </div>

        {/* Scroll-Down Indicator */}
        <div 
          style={{ opacity: scrollOpacity }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 transition-opacity duration-300 pointer-events-none"
        >
          <span className="text-[10px] font-mono tracking-widest uppercase">Scroll to Explore</span>
          <ChevronDown size={18} className="animate-bounce text-purple-700" />
        </div>

      </section>

      {/* Portfolio / Featured Case Studies Section */}
      <section className="w-full max-w-6xl mx-auto mt-12 flex flex-col items-center relative z-10 px-4">
        <div className="text-center mb-8">
           <h2 className="text-2xl md:text-4xl font-display font-bold tracking-tight text-slate-900 mb-2">
              Portofolio &amp; Hasil Nyata
           </h2>
           <p className="text-slate-500 max-w-lg mx-auto text-xs sm:text-sm">
              Studi kasus arsitektur website dan dampak konversi klien kami.
           </p>
        </div>
        <FeaturedCaseStudies />
      </section>

      {/* Simplified 'About' Section focused on IT Solution Expertise */}
      <section className="w-full max-w-6xl mx-auto mt-24 mb-16 px-4 relative z-10">
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-purple-900 bg-purple-100/80 px-3 py-1 rounded-full mb-4">
                TENTANG AGENCY KAMI
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 mb-4 leading-tight">
                Mitra IT Solution Terpercaya untuk Akselerasi Bisnis Anda
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                <strong>CHESTAADOTCOM</strong> hadir sebagai jawaban atas kebutuhan korporasi modern akan infrastruktur digital yang cepat, aman, dan cerdas. Kami menggabungkan keahlian rekayasa perangkat lunak tingkat lanjut dengan otomatisasi berbasis Agentic AI.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs">
                  <CheckCircle2 size={15} className="text-purple-700" />
                  <span>Bespoke Full-Stack Development</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs">
                  <CheckCircle2 size={15} className="text-purple-700" />
                  <span>Agentic AI Automation</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col justify-between">
              <h3 className="text-lg font-bold font-display text-slate-900 mb-3">
                Misi &amp; Komitmen IT Solution
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                Kami berkomitmen untuk memberikan hak kepemilikan source code 100% kepada klien, didukung performa audit Google Lighthouse sempurna dan garansi pemeliharaan jangka panjang.
              </p>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500">BSD City &bull; Tangerang</span>
                <Link to="/about" className="text-xs font-bold text-purple-900 hover:underline flex items-center gap-1">
                  Pelajari Profil Lengkap &rarr;
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
