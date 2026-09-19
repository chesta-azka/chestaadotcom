import SEOProvider from '../components/atoms/SEOProvider';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import MetaTags from '../components/atoms/MetaTags.tsx';
import EnterpriseHero from '../components/organisms/EnterpriseHero.tsx';
import { HeroPurple } from '../components/organisms/HeroPurple.tsx';
import LocalSchema from '../components/atoms/LocalSchema.tsx';
import LightTrailDivider from '../components/atoms/LightTrailDivider.tsx';
import ServicesSection from '../components/organisms/ServicesSection.tsx';
import AboutMeSection from '../components/organisms/AboutMeSection.tsx';
import ServiceHighlightsSection from '../components/organisms/ServiceHighlightsSection.tsx';
import ProjectsSection from '../components/organisms/ProjectsSection.tsx';
import TestimonialSection from '../components/organisms/TestimonialSection.tsx';
import PricingSection from '../components/organisms/PricingSection.tsx';
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
import FaqSection from '../components/organisms/FaqSection.tsx';
import ServiceComparisonTable from '../components/organisms/ServiceComparisonTable.tsx';
import AEOKeyTakeaways from '../components/atoms/AEOKeyTakeaways.tsx';

const HOME_FAQS = [
  {
    question: "Berapa lama waktu pengerjaan website atau aplikasi di CHESTAADOTCOM?",
    answer: "Timeline pengerjaan disesuaikan dengan skala proyek: Landing Page Premium membutuhkan waktu 1-2 minggu, sementara aplikasi web custom (SaaS, Dashboard) atau integrasi Agentic AI memerlukan waktu 4-8 minggu dengan laporan progres mingguan."
  },
  {
    question: "Mengapa membangun website dengan Next.js & React kustom lebih baik daripada WordPress?",
    answer: "Arsitektur Next.js kustom menawarkan kecepatan sub-detik (skor Core Web Vitals 95-100), keamanan tingkat tinggi tanpa risiko plugin usang, serta optimasi SEO organik yang jauh lebih kuat dibandingkan CMS tradisional seperti WordPress."
  },
  {
    question: "Apakah sistem baru bisa diintegrasikan dengan ERP atau CRM eksisting?",
    answer: "Ya, kami spesialis dalam integrasi API pihak ketiga. Kami dapat menghubungkan sistem Anda secara aman dengan ERP korporat (SAP, Odoo), CRM (HubSpot, Salesforce), Payment Gateway (Midtrans), hingga WhatsApp Business API."
  },
  {
    question: "Bagaimana solusi Agentic AI membantu efisiensi operasional bisnis?",
    answer: "Kami merancang Agen AI otonom yang mampu melakukan tugas spesifik seperti customer service 24/7, otomasi pemrosesan dokumen (OCR), hingga asisten cerdas yang terhubung langsung ke basis data operasional tim Anda."
  },
  {
    question: "Apakah klien mendapatkan kepemilikan penuh atas source code?",
    answer: "Ya, 100% kepemilikan source code, repositori GitHub, database, dan hak cipta diserahkan sepenuhnya kepada klien tanpa vendor lock-in, sehingga Anda memiliki kendali penuh atas properti digital Anda."
  }
];

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
    'services',
    'projects',
    'pricing',
    'comparison',
    'contact',
    'testimonials',
    'blog',
    'academy',
    'faq'
  ]);

  return (
    <div className="flex flex-col w-full bg-transparent relative min-h-screen">
      <SEOProvider 
        title="Jasa Pembuatan Website Premium & AI - CHESTAADOTCOM"
        description="Studio arsitektur digital dan pengembangan website premium di Indonesia oleh Chesta Azka Sofyan. Solusi website performa tinggi & Agentic AI di BSD, Tangerang, Jakarta, Bogor, Depok."
      />

      <LocalSchema />

      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([
          generateLocalBusinessSchema(),
          generateOrganizationSchema(),
          generateWebSiteSchema(),
          generateSpeakableSchema(['#aeo-speakable-takeaways', '#hero-headline', '#hero-description']),
          generateFAQSchema(HOME_FAQS),
          ...HOME_SERVICES.map(s => generateServiceSchema(s.name, s.desc, s.url))
        ]) }}
      />
      
      <MetaTags 
        title="Software House BSD City & Tangerang | Web Dev & AI Automation" 
        description="Software House premium di BSD City, Tangerang Selatan, Jakarta, Depok, dan Bogor. Layanan IT Services, High-Performance Web Development, dan AI Automation." 
        breadcrumbs={[
          { name: 'Home', item: '/' }
        ]}
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
      
      {/* 6. Specialized Service Highlights */}
      <FadeInSection className="w-full">
        <ServiceHighlightsSection />
      </FadeInSection>
      
      {/* 7. Flagship Services Section */}
      <FadeInSection id="services">
        <SectionGlassCard fluid={true} index={1} metaLabel="LAYANAN KAMI" serviceType="software">
          <ServicesSection />
        </SectionGlassCard>
      </FadeInSection>
      
      <SectionBeamDivider reverse={true} />
      
      {/* 8. Projects & Works Gallery */}
      <FadeInSection id="projects">
        <SectionGlassCard fluid={true} index={2} metaLabel="GALERI PROYEK">
          <ProjectsSection />
        </SectionGlassCard>
      </FadeInSection>
      
      <SectionBeamDivider />
      
      {/* 9. Pricing & Investment */}
      <FadeInSection id="pricing">
        <SectionGlassCard fluid={true} index={3} metaLabel="INVESTASI & PAKET">
          <PricingSection />
        </SectionGlassCard>
      </FadeInSection>

      {/* 9.1 Service Comparison Table */}
      <FadeInSection id="comparison" className="w-full">
        <ServiceComparisonTable />
      </FadeInSection>
      
      <SectionBeamDivider reverse={true} />
      
      {/* 10. Direct Lead Capture & Consultation */}
      <FadeInSection id="contact">
        <SectionGlassCard fluid={true} index={4} metaLabel="HUBUNGI KAMI">
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
        <SectionGlassCard fluid={true} index={6} metaLabel="INSIGHT & PUBLIKASI">
          <BlogSection />
        </SectionGlassCard>
      </FadeInSection>
      
      <SectionBeamDivider />
      
      {/* 13. Academy Masterclass Highlight */}
      <FadeInSection id="academy">
        <AcademyHighlightSection />
      </FadeInSection>
      
      <SectionBeamDivider reverse={true} />

      {/* ScrollSpy Active Section Indicator Badge */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/90 backdrop-blur-md border border-purple-200 shadow-xl text-xs font-mono text-slate-700">
        <div className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-pulse" />
        <span>Posisi Halaman: <strong className="text-purple-900 uppercase">{activeSection}</strong></span>
      </div>

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
        <FaqSection />
      </FadeInSection>
      
      {/* 16. Marquee */}
      <div className="w-full py-8 bg-slate-50">
        <FadeInSection>
          <CreativityMarquee />
        </FadeInSection>
      </div>

      {/* Persistent High-Contrast Edge-to-Edge CTA Bar */}
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
    </div>
  );
}
