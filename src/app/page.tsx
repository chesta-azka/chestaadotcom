'use client';

import React, { useState, useEffect } from 'react';
import { FeaturedCaseStudies } from '../components/FeaturedCaseStudies';
import { MessageCircle, ArrowRight, ChevronDown, Terminal, Cpu, Globe, Shield, Zap, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';


function HighlightWord({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      variants={{
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.4, type: 'spring' } }
      }}
      className="bg-purple-600 text-white px-2 py-0.5 rounded-md font-semibold inline-block mx-1 shadow-sm shadow-purple-600/20"
    >
      {children}
    </motion.span>
  );
}

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
    <span className="inline-block bg-purple-600 text-white px-4 py-1 sm:py-1.5 mt-2 rounded-xl shadow-lg shadow-purple-600/30 font-semibold relative"><span className="mr-1">{currentText}</span><span className="inline-block w-[3px] h-[0.9em] bg-white animate-pulse align-middle -mt-1"></span></span>
  );
}

import WhyChooseUs from '../components/organisms/WhyChooseUs';
import InvestmentTiers from '../components/organisms/InvestmentTiers';
import FAQAccordion from '../components/organisms/FAQAccordion';

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
  initial="hidden"
  animate="visible"
  variants={{
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  }}
  className="lg:col-span-7 flex flex-col items-start text-left"
>
            {/* Agency Tag */}
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-purple-50 text-purple-900 text-[10px] font-mono font-bold uppercase tracking-widest mb-6 border border-purple-100">
              <Zap size={11} className="text-purple-700" />
              <span>Premier IT Solution Agency</span>
            </motion.div>
            {/* High-Impact Headline with Typewriter Effect */}
            <motion.h1 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }} className="text-3xl sm:text-5xl md:text-7xl font-display font-black tracking-tighter leading-[0.95] text-slate-900 min-h-[140px] sm:min-h-[160px]">
              Eskalasi Bisnis Tanpa Batas Melalui <br />
              <TypewriterKeyword />
            </motion.h1>
            {/* Improved Copywriting focused on Agency IT Solution */}
            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }} className="mt-6 text-base sm:text-lg text-slate-500 font-sans max-w-xl leading-relaxed">
              <strong>CHESTAADOTCOM</strong> adalah Software House eksklusif di BSD City. Kami merancang arsitektur website enterprise dengan standar performa global yang secara agresif meningkatkan revenue bisnis Anda.
            </motion.p>
            {/* Primary CTA Buttons with Pulsating Motion */}
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }} className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <motion.a
                href="https://wa.me/6282125447232"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded bg-purple-600 hover:bg-purple-700 text-white font-mono text-xs font-bold tracking-widest uppercase shadow-lg shadow-purple-600/20 transition-colors cursor-pointer w-full sm:w-auto"
              >
                <MessageCircle size={16} />
                <span>Mulai Konsultasi</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </motion.a>

              <Link
                to="/portfolio"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded bg-white hover:bg-slate-50 text-slate-900 font-mono text-xs font-bold tracking-widest uppercase border border-slate-200 transition-all cursor-pointer w-full sm:w-auto"
              >
                <span>Lihat Portofolio</span>
                <ArrowRight size={14} className="text-slate-400 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column: Minimalist Illustration / Accent Element with Hover Animations */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
               hidden: { opacity: 0, scale: 0.95 },
               visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.05, delayChildren: 0.4 } }
            }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-md bg-white rounded-lg p-8 shadow-2xl border border-slate-100 overflow-hidden">
              <div className="relative z-10 flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                  </div>
                  <span className="text-[10px] font-mono text-purple-600 bg-purple-50 px-2 py-0.5 rounded border border-purple-100">
                    performance.optimized
                  </span>
                </div>

                <div className="space-y-4 font-mono text-[10px] text-slate-500">
                  <div className="flex items-center gap-3 bg-slate-50 p-4 rounded border border-slate-100">
                    <Terminal size={14} className="text-purple-600" />
                    <span>NEXT.JS 15 ARCHITECTURE</span>
                  </div>
                  <div className="flex items-center gap-3 bg-slate-50 p-4 rounded border border-slate-100">
                    <Cpu size={14} className="text-purple-600" />
                    <span>AGENTIC AI INTEGRATION</span>
                  </div>
                  <div className="flex items-center gap-3 bg-slate-50 p-4 rounded border border-slate-100">
                    <Globe size={14} className="text-purple-600" />
                    <span>EDGE CLOUD DEPLOYMENT</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-slate-50">
                  <span>Status: Ready to Scale</span>
                  <span className="text-purple-600 font-bold uppercase tracking-widest">Enterprise Tier</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Scroll-Down Indicator */}
        <div 
          style={{ opacity: scrollOpacity }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-300 transition-opacity duration-300 pointer-events-none"
        >
          <ChevronDown size={20} className="animate-bounce" />
        </div>

      </section>

      {/* Value Proposition Section */}
      <WhyChooseUs />
      
      <hr className="w-full border-t border-slate-100 m-0 p-0" />

      {/* Portfolio / Featured Case Studies Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
        }}
        className="w-full py-24 bg-white px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-purple-600">Selected Works</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-display font-black tracking-tight text-slate-900">
                Portofolio & Hasil Nyata
            </h2>
          </div>
          <FeaturedCaseStudies />
        </div>
      </motion.section>

      {/* Investment Tiers Section */}
      <InvestmentTiers />

      {/* FAQ Section */}
      <FAQAccordion />
      
      <hr className="w-full border-t border-slate-100 m-0 p-0" />

      {/* Simplified 'About' Section focused on IT Solution Expertise */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
        }}
        className="w-full max-w-7xl mx-auto py-24 px-4 relative z-10">
        <div className="bg-white border border-slate-100 rounded-lg p-12 shadow-2xl shadow-slate-200/50">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-purple-600 mb-6">
                Strategic Partner
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 mb-6 leading-[0.95] tracking-tighter">
                Rekayasa Digital Kelas Enterprise yang Mengutamakan Profitabilitas Bisnis Anda
              </h2>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
                <strong>CHESTAADOTCOM</strong> bukan sekadar vendor IT—kami adalah arsitek ekosistem digital Anda. Kami menghadirkan solusi yang memodernisasi infrastruktur korporasi melalui aplikasi web super cepat dan teknologi otomatisasi terdepan.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-[11px] font-bold text-slate-900 uppercase tracking-widest">
                  <CheckCircle2 size={16} className="text-purple-600" />
                  <span>Bespoke Web Apps</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-bold text-slate-900 uppercase tracking-widest">
                  <CheckCircle2 size={16} className="text-purple-600" />
                  <span>AI Automation</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-50 rounded-lg p-8 border border-slate-100">
              <h3 className="text-sm font-black font-display text-slate-900 mb-4 uppercase tracking-widest">
                Our Mission
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-8">
                Memberikan hak kepemilikan source code 100% kepada klien, didukung performa audit Google Lighthouse sempurna dan garansi pemeliharaan jangka panjang.
              </p>
              <Link to="/about" className="inline-flex items-center gap-2 text-[11px] font-bold text-purple-600 uppercase tracking-widest hover:underline">
                Pelajari Profil Lengkap &rarr;
              </Link>
            </div>

          </div>
        </div>
      </motion.section>
    </main>
  );
}
