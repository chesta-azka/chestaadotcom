import SEOProvider from '../components/atoms/SEOProvider';
import { useEffect } from 'react';
import MetaTags from '../components/atoms/MetaTags.tsx';
import HeroSection from '../components/organisms/HeroSection.tsx';
import ServicesSection from '../components/organisms/ServicesSection.tsx';
import AboutMeSection from '../components/organisms/AboutMeSection.tsx';
import AISolutionsSection from '../components/organisms/AISolutionsSection.tsx';
import ProjectsSection from '../components/organisms/ProjectsSection.tsx';
import WorkflowSection from '../components/organisms/WorkflowSection.tsx';
import WorkflowAutomation from '../components/organisms/WorkflowAutomation.tsx';
import TestimonialSection from '../components/organisms/TestimonialSection.tsx';
import PricingSection from '../components/organisms/PricingSection.tsx';
import InsightsSection from '../components/organisms/InsightsSection.tsx';
import BlogSection from '../components/organisms/BlogSection.tsx';
import CreativityMarquee from '../components/organisms/CreativityMarquee.tsx';
import ContactSection from '../components/organisms/ContactSection.tsx';
import ScrollingTechTicker from '../components/organisms/ScrollingTechTicker.tsx';
import FaqSection from '../components/organisms/FaqSection.tsx';
import FadeInSection from '../components/atoms/FadeInSection.tsx';
import StatsCounter from '../components/organisms/StatsCounter.tsx';
import SectionGlassCard from '../components/atoms/SectionGlassCard.tsx';
import SectionSeparator from '../components/atoms/SectionSeparator.tsx';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full bg-transparent relative min-h-screen">
      <SEOProvider 
        title="Jasa Pembuatan Website Premium & AI - CHESTAADOTCOM"
        description="Studio arsitektur digital dan pengembangan website premium di Indonesia oleh Chesta Azka Sofyan. Solusi website performa tinggi & Agentic AI."
      />
      
      <MetaTags 
        title="Jasa Pembuatan Website Premium & AI Agentic - CHESTAADOTCOM" 
        description="CHESTAADOTCOM by Chesta Azka Sofyan - Jasa pembuatan website corporate premium dan otomasi bisnis dengan Agentic AI." 
        breadcrumbs={[
          { name: 'Home', item: '/' }
        ]}
      />

      {/* Atmospheric Background Meshes for Desktop Depth */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-purple-400/5 rounded-full blur-[140px]" />
        <div className="absolute top-[50%] left-[-10%] w-[650px] h-[650px] bg-purple-400/5 rounded-full blur-[140px]" />
        <div className="absolute top-[75%] right-[-5%] w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[140px]" />
      </div>

      <div className="snap-start relative">
        <HeroSection />
      </div>

      <div className="snap-start my-4">
        <ScrollingTechTicker />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 my-6">
        <FadeInSection className="snap-start">
          <StatsCounter />
        </FadeInSection>
      </div>
      
      <SectionSeparator variant="wave-1" index={0} label="Tentang Saya" />
      <SectionGlassCard index={0} metaLabel="TENTANG CHESTAADOTCOM" className="snap-start">
        <AboutMeSection />
      </SectionGlassCard>

      <SectionSeparator variant="blob-1" index={1} label="Layanan Digital" />
      <SectionGlassCard index={1} metaLabel="LAYANAN KAMI" className="snap-start" serviceType="software">
        <ServicesSection />
      </SectionGlassCard>

      <SectionSeparator variant="wave-2" index={2} label="Galeri Portofolio" />
      <SectionGlassCard index={2} metaLabel="GALERI PROYEK" className="snap-start">
        <ProjectsSection />
      </SectionGlassCard>

      <SectionSeparator variant="blob-2" index={3} label="Metodologi Kerja" />
      <SectionGlassCard index={3} metaLabel="ALUR KERJA KORPORASI" className="snap-start">
        <WorkflowSection />
      </SectionGlassCard>
      
      <SectionSeparator variant="wave-3" index={4} label="Simulator AI" />
      <SectionGlassCard index={4} metaLabel="SIMULATOR ROADMAP AI" className="snap-start">
        <WorkflowAutomation />
      </SectionGlassCard>

      <SectionSeparator variant="blob-1" index={5} label="Paket Investasi" />
      <SectionGlassCard index={5} metaLabel="INVESTASI & PAKET" className="snap-start">
        <PricingSection />
      </SectionGlassCard>

      <SectionSeparator variant="wave-1" index={6} label="Hubungi Studio" />
      <SectionGlassCard index={6} metaLabel="HUBUNGI KAMI" className="snap-start">
        <ContactSection />
      </SectionGlassCard>

      {/* Moved below Hubungi Kami: Testimonial & FAQ */}
      <SectionSeparator variant="blob-2" index={7} label="Bukti & Ulasan" />
      <SectionGlassCard index={7} metaLabel="KESUKSESAN KLIEN" className="snap-start">
        <TestimonialSection />
      </SectionGlassCard>

      <SectionSeparator variant="wave-2" index={8} label="Tanya Jawab" />
      <SectionGlassCard index={8} metaLabel="TANYA JAWAB (FAQ)" className="snap-start">
        <FaqSection />
      </SectionGlassCard>

      <SectionSeparator variant="wave-3" index={9} label="Wawasan & Berita" />
      <SectionGlassCard index={9} metaLabel="WAWASAN & ARTIKEL" className="snap-start">
        <BlogSection />
      </SectionGlassCard>

      <SectionSeparator variant="wave-1" index={10} label="Tren Teknologi" />
      <SectionGlassCard index={10} metaLabel="TREN TEKNOLOGI" className="snap-start">
        <InsightsSection />
      </SectionGlassCard>

      <SectionSeparator variant="blob-1" index={11} label="Eksplor Kreativitas" />
      <div className="w-full py-8">
        <FadeInSection>
          <CreativityMarquee />
        </FadeInSection>
      </div>
    </div>
  );
}
