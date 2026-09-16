import React, { Suspense, useState, useEffect, useRef } from 'react';
import MetaTags from '../components/atoms/MetaTags';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { FeaturedCaseStudies } from '../components/FeaturedCaseStudies';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CaseStudiesSkeleton } from '../components/CaseStudiesSkeleton';

function CaseStudiesLoader() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);
  
  if (loading) return <CaseStudiesSkeleton />;
  return <FeaturedCaseStudies />;
}

export default function CaseStudiesPage() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <main ref={containerRef} className="relative min-h-screen flex flex-col items-center pt-36 md:pt-44 pb-20 overflow-hidden bg-white text-slate-900 font-sans">
      <MetaTags 
        title="Case Studies & Portofolio Klien | CHESTAADOTCOM"
        description="Eksplorasi studi kasus nyata bagaimana CHESTAADOTCOM mentransformasi bisnis B2B dan enterprise melalui web app dan Agentic AI."
        path="/case-studies"
        breadcrumbs={[{ name: 'Home', item: '/' }, { name: 'Case Studies', item: '/case-studies' }]}
      />
    
      <Helmet>
        <title>Studi Kasus & Hasil Nyata | CHESTADOTCOM</title>
        <meta name="description" content="Analisis mendalam implementasi arsitektur website Next.js, kecepatan loading, dan dampak peningkatan penjualan klien kami." />
      </Helmet>

      {/* Parallax Background */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute inset-0 -z-10 pointer-events-none opacity-40"
      >
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-purple-50 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-indigo-50 rounded-full blur-[120px]" />
      </motion.div>
      
      <div className="w-full max-w-5xl mx-auto px-4 flex justify-start">
        <Breadcrumbs />
      </div>
      
      <div className="w-full max-w-5xl mx-auto px-4 text-center mb-10">
        <motion.span 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-block px-3 py-1 rounded-full bg-purple-50 text-purple-900 border border-purple-100 text-xs font-mono font-bold uppercase tracking-wider mb-4"
        >
          Studi Kasus Klien
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-display font-extrabold tracking-tight text-slate-900 mb-4"
        >
          Hasil Terbukti & <span className="text-purple-900">Kinerja Nyata</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed"
        >
          Analisis dampak implementasi website Next.js berkecepatan tinggi terhadap kepuasan pengguna dan peningkatan konversi bisnis.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="w-full"
      >
        <CaseStudiesLoader />
      </motion.div>
    </main>
  );
}
