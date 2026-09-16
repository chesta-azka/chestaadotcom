import SEOProvider from '../components/atoms/SEOProvider';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import MetaTags from '../components/atoms/MetaTags.tsx';
import HeroSection from '../components/organisms/HeroSection.tsx';
import ServicesSection from '../components/organisms/ServicesSection.tsx';
import AboutMeSection from '../components/organisms/AboutMeSection.tsx';
import ServiceHighlightsSection from '../components/organisms/ServiceHighlightsSection.tsx';
import ProjectsSection from '../components/organisms/ProjectsSection.tsx';
import TestimonialSection from '../components/organisms/TestimonialSection.tsx';
import PricingSection from '../components/organisms/PricingSection.tsx';
import InsightsSection from '../components/organisms/InsightsSection.tsx';
import BlogSection from '../components/organisms/BlogSection.tsx';
import CreativityMarquee from '../components/organisms/CreativityMarquee.tsx';
import ContactSection from '../components/organisms/ContactSection.tsx';
import ScrollingTechTicker from '../components/organisms/ScrollingTechTicker.tsx';
import CompaniesSection from '../components/organisms/CompaniesSection.tsx';
import LocalTrustMarquee from '../components/organisms/LocalTrustMarquee.tsx';
import AcademyHighlightSection from '../components/organisms/AcademyHighlightSection.tsx';
import StatsCounter from '../components/organisms/StatsCounter.tsx';
import TechStackSection from '../components/organisms/TechStackSection.tsx';
import EnterpriseFAQ from '../components/organisms/EnterpriseFAQ.tsx';
import SectionGlassCard from '../components/atoms/SectionGlassCard.tsx';
import FadeInSection from '../components/atoms/FadeInSection.tsx';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { generateLocalBusinessSchema, generateOrganizationSchema, generateSpeakableSchema, generateWebSiteSchema } from '../lib/seo';
import FaqSection from '../components/organisms/FaqSection.tsx';
import ProjectFaqAccordion from '../components/organisms/ProjectFaqAccordion.tsx';
import AEOKeyTakeaways from '../components/atoms/AEOKeyTakeaways.tsx';
import ExitIntentPopup from '../components/organisms/ExitIntentPopup.tsx';
import { useGeoIntentManager } from '../hooks/useGeoIntentManager';
import FAQSchema from '../components/atoms/FAQSchema';

export default function HomePage() {
  const geoIntent = useGeoIntentManager();

  const activeSection = useScrollSpy([
    'hero',
    'about',
    'stats',
    'services',
    'tech-stack',
    'projects',
    'testimonials',
    'pricing',
    'faq',
    'contact',
    'blog',
    'academy',
    'insights'
  ]);

  return (
    <div className="flex flex-col w-full bg-transparent relative min-h-screen">
      <SEOProvider 
        title="Jasa Pembuatan Website Premium & AI - CHESTAADOTCOM"
        description="Studio arsitektur digital dan pengembangan website premium di Indonesia oleh Chesta Azka Sofyan. Solusi website performa tinggi & Agentic AI di BSD, Tangerang, Jakarta, Bogor, Depok."
      />

      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([
          generateLocalBusinessSchema(),
          generateOrganizationSchema(),
          generateWebSiteSchema(),
          generateSpeakableSchema(['#aeo-speakable-takeaways', '#hero-headline', '#hero-description'])
        ]) }}
      />
      
      <MetaTags 
        title={geoIntent.getLocalizedTitle("Software House Berkualitas | Web Dev & AI Automation")} 
        description={geoIntent.getLocalizedDesc("Software House premium untuk Layanan IT Services, High-Performance Web Development, dan AI Automation.")} 
        breadcrumbs={[
          { name: 'Home', item: '/' }
        ]}
      />
      
      <FAQSchema 
        faqs={[
          {
            question: `Apakah CHESTAADOTCOM melayani pembuatan website dan AI di ${geoIntent.isCustomized ? geoIntent.location : 'BSD City dan sekitarnya'}?`,
            answer: `Ya, kami menyediakan layanan IT Services, pembuatan website high-performance, dan otomatisasi AI khusus untuk membantu bisnis di ${geoIntent.isCustomized ? geoIntent.location : 'Tangerang Selatan, Jakarta, Depok, dan Bogor'}.`
          },
          {
            question: `Bagaimana cara kerja teknologi AI Automation yang ditawarkan di area ${geoIntent.isCustomized ? geoIntent.location : 'Tangerang'}?`,
            answer: `Kami mengintegrasikan Agentic AI ke dalam operasional bisnis Anda untuk mengotomatiskan layanan pelanggan, analisis data, dan manajemen operasional agar lebih efisien dan inovatif.`
          }
        ]}
        areasServed={geoIntent.isCustomized ? [geoIntent.location] : ['BSD City', 'Cisauk', 'Tangerang', 'Tangerang Selatan', 'Jakarta']}
      />

      <div className="snap-start relative" id="hero">
        <HeroSection />
      </div>
      
      <FadeInSection delay={0.1} className="w-full">
        <ScrollingTechTicker />
      </FadeInSection>
      
      <FadeInSection delay={0.2} className="w-full">
        <LocalTrustMarquee currentArea={geoIntent.isCustomized ? geoIntent.location : 'BSD & Tangerang'} />
      </FadeInSection>

      <FadeInSection delay={0.3} className="w-full">
        <CompaniesSection />
      </FadeInSection>
            
      <SectionGlassCard fluid={true} index={0} metaLabel="TENTANG CHESTAADOTCOM" className="snap-start" id="about">
        <AboutMeSection />
      </SectionGlassCard>

      <SectionGlassCard fluid={true} index={1} metaLabel="STATISTIK" className="snap-start" id="stats">
        <StatsCounter />
      </SectionGlassCard>
            
      <div id="services" className="scroll-mt-20">
        <FadeInSection>
          <ServiceHighlightsSection />
        </FadeInSection>
        
        <SectionGlassCard fluid={true} index={2} metaLabel="LAYANAN KAMI" className="snap-start" serviceType="software">
          <ServicesSection />
        </SectionGlassCard>
      </div>

      <SectionGlassCard fluid={true} index={3} metaLabel="TEKNOLOGI KAMI" className="snap-start" id="tech-stack">
        <TechStackSection />
      </SectionGlassCard>
      
      

      
      <SectionGlassCard fluid={true} index={4} metaLabel="GALERI PROYEK" className="snap-start" id="projects">
        <ProjectsSection />
      </SectionGlassCard>

      <SectionGlassCard fluid={true} index={5} metaLabel="KESUKSESAN KLIEN" className="snap-start" id="testimonials">
        <TestimonialSection />
      </SectionGlassCard>
      
      <SectionGlassCard fluid={true} index={6} metaLabel="INVESTASI & PAKET" className="snap-start" id="pricing">
        <PricingSection />
      </SectionGlassCard>

      <SectionGlassCard fluid={true} index={7} metaLabel="TANYA JAWAB" className="snap-start" id="faq">
        <EnterpriseFAQ />
      </SectionGlassCard>
      
      <SectionGlassCard fluid={true} index={8} metaLabel="HUBUNGI KAMI" className="snap-start" id="contact">
        <ContactSection />
      </SectionGlassCard>
      <SectionGlassCard fluid={true} index={9} metaLabel="WAWASAN & ARTIKEL" className="snap-start" id="blog">
        <BlogSection />
      </SectionGlassCard>
      <FadeInSection className="w-full snap-start">
        <div id="academy">
          <AcademyHighlightSection />
        </div>
      </FadeInSection>
      <SectionGlassCard fluid={true} index={10} metaLabel="TREN TEKNOLOGI" className="snap-start" id="insights">
        <InsightsSection />
      </SectionGlassCard>

      {/* ScrollSpy Active Section Indicator Badge */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/90 backdrop-blur-md border border-purple-200 shadow-xl text-xs font-mono text-slate-700">
        <div className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-pulse" />
        <span>Posisi Halaman: <strong className="text-purple-900 uppercase">{activeSection}</strong></span>
      </div>

      
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection delay={0.1}>
          <AEOKeyTakeaways 
            title="Executive Summary (AI & Client Brief)"
          takeaways={[
            "CHESTAADOTCOM adalah studio software rekayasa premium yang berspesialisasi pada Website High-Performance dan AI Automation.",
            "Berlokasi di BSD City / Tangerang, melayani klien B2B dan enterprise secara nasional maupun internasional.",
            "Fokus utama: Kecepatan load website sub-detik (Core Web Vitals), optimasi SEO ekstrem, dan integrasi Agentic AI (LLMs).",
            "Transparansi penuh: 100% source code milik klien, tanpa biaya tersembunyi, dan garansi maintenance 30 hari."
          ]}
          />
        </FadeInSection>
      </div>

      <ProjectFaqAccordion />
      <FaqSection />
      
      <div className="w-full py-8 bg-slate-50">
        <FadeInSection>
          <CreativityMarquee />
        </FadeInSection>
      </div>

      {/* Persistent High-Contrast Edge-to-Edge CTA Bar */}
      <div className="w-full bg-purple-950 border-t-2 border-slate-800 text-white py-14 px-6 sm:px-12 flex flex-col md:flex-row items-center justify-between gap-8 rounded-none select-none">
        <div className="flex flex-col text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">SESI KONSULTASI EKSKLUSIF</span>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-black tracking-tight text-white mb-2" style={{ fontFamily: "'Coolvetica', sans-serif" }}>
            Dominasi Pasar Digital Anda Mulai Hari Ini.
          </h3>
          <p className="text-purple-200 text-sm sm:text-base max-w-2xl font-sans leading-relaxed">
            Tinggalkan kompetitor Anda dengan arsitektur web premium dan operasional 24/7 bertenaga Agentic AI. Diskusikan arsitektur sistem korporasi Anda langsung dengan Lead Engineer kami.
          </p>
        </div>
        <a
          href="https://wa.me/6282125447232?text=Halo%20Mas%20Chesta,%20saya%20tertarik%20berdiskusi%20mengenai%20arsitektur%20Web%20Premium%20dan%20Agentic%20AI%20untuk%20bisnis%20saya."
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 bg-white text-purple-950 hover:bg-purple-50 font-sans font-black text-sm sm:text-base rounded-none border-2 border-white transition-all shadow-[6px_6px_0_0_rgba(255,255,255,0.2)] shrink-0 flex items-center gap-3 transform hover:-translate-y-1"
        >
          <span>Hubungi via WhatsApp</span>
        </a>
      </div>
      <ExitIntentPopup />
    </div>
  );
}
