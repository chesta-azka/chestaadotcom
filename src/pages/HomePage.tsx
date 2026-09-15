import SEOProvider from '../components/atoms/SEOProvider';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import MetaTags from '../components/atoms/MetaTags.tsx';
import HeroSection from '../components/organisms/HeroSection.tsx';
import CapabilitiesSection from '../components/organisms/CapabilitiesSection.tsx';
import ServicesSection from '../components/organisms/ServicesSection.tsx';
import AboutMeSection from '../components/organisms/AboutMeSection.tsx';
import ProjectsSection from '../components/organisms/ProjectsSection.tsx';
import TestimonialSection from '../components/organisms/TestimonialSection.tsx';
import PricingSection from '../components/organisms/PricingSection.tsx';
import InsightsSection from '../components/organisms/InsightsSection.tsx';
import BlogSection from '../components/organisms/BlogSection.tsx';
import CreativityMarquee from '../components/organisms/CreativityMarquee.tsx';
import ContactSection from '../components/organisms/ContactSection.tsx';
import ScrollingTechTicker from '../components/organisms/ScrollingTechTicker.tsx';
import CompaniesSection from '../components/organisms/CompaniesSection.tsx';
import AcademyHighlightSection from '../components/organisms/AcademyHighlightSection.tsx';
import StatsCounter from '../components/organisms/StatsCounter.tsx';
import SectionGlassCard from '../components/atoms/SectionGlassCard.tsx';
import SectionSeparator from '../components/atoms/SectionSeparator.tsx';
import FadeInSection from '../components/atoms/FadeInSection.tsx';
import { useRevealAnimation } from '../hooks/useRevealAnimation';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { generateLocalBusinessSchema } from '../lib/seo';
import FaqSection from '../components/organisms/FaqSection.tsx';
import ProjectFaqAccordion from '../components/organisms/ProjectFaqAccordion.tsx';
import ExitIntentPopup from '../components/organisms/ExitIntentPopup.tsx';

export default function HomePage() {
  const reveal1 = useRevealAnimation();
  const reveal2 = useRevealAnimation();
  const reveal3 = useRevealAnimation();
  const reveal4 = useRevealAnimation();
  const reveal5 = useRevealAnimation();

  const activeSection = useScrollSpy([
    'hero',
    'about',
    'services',
    'projects',
    'pricing',
    'contact',
    'testimonials',
    'faq',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateLocalBusinessSchema()) }}
      />
      
      <MetaTags 
        title="Software House BSD City & Tangerang | Web Dev & AI Automation" 
        description="Software House premium di BSD City, Tangerang Selatan, Jakarta, Depok, dan Bogor. Layanan IT Services, High-Performance Web Development, dan AI Automation." 
        breadcrumbs={[
          { name: 'Home', item: '/' }
        ]}
      />

      <div className="snap-start relative" id="hero">
        <HeroSection />
      </div>
      
      <CapabilitiesSection />
      
      <CompaniesSection />
      
      <SectionSeparator />
            
      <motion.div {...reveal1.revealProps} className="w-full">
        <StatsCounter />
      </motion.div>
      <SectionSeparator />
      
      <motion.div {...reveal2.revealProps} id="about">
        <SectionGlassCard fluid={true} index={0} metaLabel="TENTANG CHESTAADOTCOM" className="snap-start">
          <AboutMeSection />
        </SectionGlassCard>
      </motion.div>
      <SectionSeparator />
      
      <motion.div {...reveal3.revealProps} id="services">
        <SectionGlassCard fluid={true} index={1} metaLabel="LAYANAN KAMI" className="snap-start" serviceType="software">
          <ServicesSection />
        </SectionGlassCard>
      </motion.div>
      <SectionSeparator />
      
      
      <div className="snap-start my-8">
        <ScrollingTechTicker />
      </div>
      <SectionSeparator />
      
      <motion.div {...reveal4.revealProps} id="projects">
        <SectionGlassCard fluid={true} index={2} metaLabel="GALERI PROYEK" className="snap-start">
          <ProjectsSection />
        </SectionGlassCard>
      </motion.div>
      <SectionSeparator />
      
      <motion.div {...reveal5.revealProps} id="pricing">
        <SectionGlassCard fluid={true} index={5} metaLabel="INVESTASI & PAKET" className="snap-start">
          <PricingSection />
        </SectionGlassCard>
      </motion.div>
      <SectionSeparator />
      
      <SectionGlassCard fluid={true} index={6} metaLabel="HUBUNGI KAMI" className="snap-start" id="contact">
        <ContactSection />
      </SectionGlassCard>
      <SectionSeparator />
      
      <SectionGlassCard fluid={true} index={7} metaLabel="KESUKSESAN KLIEN" className="snap-start" id="testimonials">
        <TestimonialSection />
      </SectionGlassCard>
      <SectionSeparator />
      
      <SectionGlassCard fluid={true} index={8} metaLabel="TANYA JAWAB (FAQ)" className="snap-start" id="faq">
        <BlogSection />
      </SectionGlassCard>
      <SectionSeparator />
      
      <div className="snap-start" id="academy">
        <AcademyHighlightSection />
      </div>
      <SectionSeparator />

      <SectionGlassCard fluid={true} index={9} metaLabel="TREN TEKNOLOGI" className="snap-start" id="insights">
        <InsightsSection />
      </SectionGlassCard>
      <SectionSeparator />

      {/* ScrollSpy Active Section Indicator Badge */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/90 backdrop-blur-md border border-purple-200 shadow-xl text-xs font-mono text-slate-700">
        <div className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-pulse" />
        <span>Posisi Halaman: <strong className="text-purple-900 uppercase">{activeSection}</strong></span>
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
