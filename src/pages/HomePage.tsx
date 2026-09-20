import SEOMetadata from '../components/atoms/SEOMetadata';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import EnterpriseHero from '../components/organisms/EnterpriseHero.tsx';
import { HeroPurple } from '../components/organisms/HeroPurple.tsx';
import LocalSchema from '../components/atoms/LocalSchema.tsx';
import LightTrailDivider from '../components/atoms/LightTrailDivider.tsx';
import ServicesSection from '../components/organisms/ServicesSection.tsx';
import AboutMeSection from '../components/organisms/AboutMeSection.tsx';
import ServiceHighlightsSection from '../components/organisms/ServiceHighlightsSection.tsx';
import ProjectsSection from '../components/organisms/ProjectsSection.tsx';
import TestimonialSection from '../components/organisms/TestimonialSection.tsx';
import BlogSection from '../components/organisms/BlogSection.tsx';
import CreativityMarquee from '../components/organisms/CreativityMarquee.tsx';
import ContactSection from '../components/organisms/ContactSection.tsx';
import ScrollingTechTicker from '../components/organisms/ScrollingTechTicker.tsx';
import AcademyHighlightSection from '../components/organisms/AcademyHighlightSection.tsx';
import StatsCounter from '../components/organisms/StatsCounter.tsx';
import SectionGlassCard from '../components/atoms/SectionGlassCard.tsx';
import SectionBeamDivider from '../components/atoms/SectionBeamDivider.tsx';
import FadeInSection from '../components/atoms/FadeInSection.tsx';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { generateLocalBusinessSchema, generateOrganizationSchema, generateSpeakableSchema, generateWebSiteSchema, generateFAQSchema, generateServiceSchema } from '../lib/seo';
import FAQSection from '../components/organisms/FAQSection.tsx';
import InvestmentTiers from '../components/organisms/InvestmentTiers.tsx';
import WhyChooseUs from '../components/organisms/WhyChooseUs.tsx';
import AEOKeyTakeaways from '../components/atoms/AEOKeyTakeaways.tsx';

import ServiceCatalog from '../components/organisms/ServiceCatalog.tsx';
import ConsultingServicesSection from '../components/organisms/ConsultingServicesSection.tsx';

const HOME_SERVICES = [
  {
    name: "Web Development Premium",
    desc: "Pengembangan website berperforma tinggi menggunakan Next.js 15+ untuk korporat dan UMKM.",
    url: "https://chestaa.com/layanan/website-company-profile"
  },
  {
    name: "Agentic AI Integration",
    desc: "Otomasi operasional bisnis dengan agen AI otonom untuk efisiensi 24/7.",
    url: "https://chestaa.com/layanan/agentic-ai-automation"
  }
];

export default function HomePage() {
  const activeSection = useScrollSpy([
    'hero',
    'about',
    'why-choose-us',
    'catalog',
    'services',
    'consulting',
    'projects',
    'pricing',
    'contact',
    'testimonials',
    'blog',
    'academy',
    'faq'
  ]);

  return (
    <div className="flex flex-col w-full bg-transparent relative min-h-screen">
      <SEOMetadata 
        title="Jasa Pembuatan Website Premium & AI Automation"
        description="Studio arsitektur digital dan pengembangan website premium oleh Chesta Azka Sofyan. Solusi website Next.js performa tinggi & Agentic AI di BSD City, Tangerang."
      />

      {/* 1. Hero Section */}
      <div className="relative w-full" id="hero">
        <FadeInSection>
          <HeroPurple />
        </FadeInSection>
      </div>

      <LightTrailDivider />
      
      {/* 2. Scrolling Tech Ticker */}
      <FadeInSection delay={0.1}>
        <ScrollingTechTicker />
      </FadeInSection>
      
      <SectionBeamDivider />
      
      {/* 4. Stats Counter */}
      <FadeInSection className="w-full">
        <StatsCounter />
      </FadeInSection>
      
      <SectionBeamDivider reverse={true} />
      
      {/* 5. About Me Section */}
      <FadeInSection id="about">
        <SectionGlassCard fluid={true} index={0} metaLabel="TENTANG CHESTAADOTCOM">
          <AboutMeSection />
        </SectionGlassCard>
      </FadeInSection>
      
      <SectionBeamDivider />

      {/* 5.1 Why Choose Us Section */}
      <FadeInSection id="why-choose-us">
        <WhyChooseUs />
      </FadeInSection>

      <SectionBeamDivider reverse={true} />

      {/* 6. Service Catalog Section - High Discoverability */}
      <FadeInSection id="catalog">
        <ServiceCatalog />
      </FadeInSection>
      
      <SectionBeamDivider />
      
      {/* 6.1 Specialized Service Highlights */}
      <FadeInSection className="w-full">
        <ServiceHighlightsSection />
      </FadeInSection>
      
      {/* 7. Flagship Services Section */}
      <FadeInSection id="services">
        <SectionGlassCard fluid={true} index={1} metaLabel="LAYANAN UTAMA" serviceType="software">
          <ServicesSection />
        </SectionGlassCard>
      </FadeInSection>

      {/* 7.1 Specialized Consulting Section */}
      <FadeInSection id="consulting">
        <ConsultingServicesSection />
      </FadeInSection>
      
      <SectionBeamDivider reverse={true} />
      
      {/* 8. Projects & Works Gallery */}
      <FadeInSection id="projects">
        <SectionGlassCard fluid={true} index={2} metaLabel="PORTOFOLIO">
          <ProjectsSection />
        </SectionGlassCard>
      </FadeInSection>
      
      <SectionBeamDivider />
      
      {/* 9. Investment Tiers Comparison */}
      <FadeInSection id="pricing">
        <InvestmentTiers />
      </FadeInSection>
      
      <SectionBeamDivider reverse={true} />
      
      {/* 10. Direct Lead Capture & Consultation */}
      <FadeInSection id="contact">
        <SectionGlassCard fluid={true} index={4} metaLabel="KONSULTASI GRATIS">
          <ContactSection />
        </SectionGlassCard>
      </FadeInSection>
      
      <SectionBeamDivider />
      
      {/* 11. Client Testimonials & Social Proof */}
      <FadeInSection id="testimonials">
        <SectionGlassCard fluid={true} index={5} metaLabel="KESUKSESAN KLIEN">
          <TestimonialSection />
        </SectionGlassCard>
      </FadeInSection>
      
      <SectionBeamDivider reverse={true} />
      
      {/* 12. Strategic Blog & Insights Showcase */}
      <FadeInSection id="blog">
        <SectionGlassCard fluid={true} index={6} metaLabel="BLOG & WAWASAN">
          <BlogSection />
        </SectionGlassCard>
      </FadeInSection>
      
      <SectionBeamDivider />
      
      {/* 13. Academy Masterclass Highlight */}
      <FadeInSection id="academy">
        <AcademyHighlightSection />
      </FadeInSection>
      
      <SectionBeamDivider reverse={true} />

      {/* 14. Executive Summary / AEO Takeaways */}
      <FadeInSection className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
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

      <SectionBeamDivider />

      {/* 15. FAQ Section */}
      <FadeInSection id="faq" className="w-full">
        <FAQSection />
      </FadeInSection>
      
      {/* 16. Marquee */}
      <div className="w-full py-8 bg-slate-50">
        <FadeInSection>
          <CreativityMarquee />
        </FadeInSection>
      </div>

      {/* Persistent High-Contrast Edge-to-Edge CTA Bar */}
      <FadeInSection className="w-full">
        <div className="w-full bg-purple-950 border-t-2 border-slate-800 text-white py-14 px-6 sm:px-12 flex flex-col md:flex-row items-center justify-between gap-8 rounded-none select-none">
          <div className="flex flex-col text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">SESI KONSULTASI EKSKLUSIF</span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-black tracking-tight text-white mb-2">
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
      </FadeInSection>
    </div>
  );
}
