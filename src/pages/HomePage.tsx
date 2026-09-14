import SEOProvider from '../components/atoms/SEOProvider';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import MetaTags from '../components/atoms/MetaTags.tsx';
import HeroSection from '../components/organisms/HeroSection.tsx';
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
import StatsCounter from '../components/organisms/StatsCounter.tsx';
import SectionGlassCard from '../components/atoms/SectionGlassCard.tsx';
import SectionSeparator from '../components/atoms/SectionSeparator.tsx';
import FadeInSection from '../components/atoms/FadeInSection.tsx';
import { useRevealAnimation } from '../hooks/useRevealAnimation';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { ChevronDown, Link as LinkIcon, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { generateLocalBusinessSchema } from '../lib/seo';

const bottomFaqs = [
  {
    id: 'faq-bsd-tangerang',
    q: 'Mengapa perusahaan di BSD City dan Tangerang memilih CHESTAADOTCOM?',
    a: 'Karena kami menggabungkan standar rekayasa software tingkat global dengan pemahaman mendalam tentang lanskap bisnis lokal di Tangerang Selatan, BSD City, dan Cisauk. Setiap sistem dibangun dengan fokus pada kecepatan sub-detik dan konversi B2B.'
  },
  {
    id: 'faq-ai-automation',
    q: 'Bagaimana cara kerja Agentic AI dalam mengotomasi operasional bisnis?',
    a: 'Agentic AI kami terintegrasi secara otonom ke dalam database dan WhatsApp Business Anda. AI mampu merespons prospek, memproses kualifikasi lead, hingga menyusun laporan operasional secara real-time 24/7.'
  },
  {
    id: 'faq-nextjs-stack',
    q: 'Apa keuntungan menggunakan Next.js 15 dibanding CMS konvensional?',
    a: 'Next.js 15 memberikan SSR (Server-Side Rendering) instan yang membuat website Anda memuat dalam milidetik. Ini sangat krusial untuk mendominasi peringkat SEO Google di wilayah Jakarta, Bogor, Depok, dan Tangerang.'
  }
];

export default function HomePage() {
  const reveal1 = useRevealAnimation();
  const reveal2 = useRevealAnimation();
  const reveal3 = useRevealAnimation();
  const reveal4 = useRevealAnimation();
  const reveal5 = useRevealAnimation();

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const navigate = useNavigate();

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

  const handleCopyLink = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const directUrl = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(directUrl).then(() => {
      setCopiedId(id);
      navigate(`#${id}`, { replace: true });
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

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
      <SectionSeparator />
      
      <div className="snap-start my-4">
        <ScrollingTechTicker />
      </div>
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
      
      <SectionGlassCard fluid={true} index={9} metaLabel="TREN TEKNOLOGI" className="snap-start" id="insights">
        <InsightsSection />
      </SectionGlassCard>
      <SectionSeparator />

      {/* ScrollSpy Active Section Indicator Badge */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/90 backdrop-blur-md border border-purple-200 shadow-xl text-xs font-mono text-slate-700">
        <div className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-pulse" />
        <span>Posisi Halaman: <strong className="text-purple-900 uppercase">{activeSection}</strong></span>
      </div>

      {/* New Sharp-Edged, Borderless FAQ Accordion Section at Bottom */}
      <section className="py-16 px-6 sm:px-12 bg-white border-y border-slate-200">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight" style={{ fontFamily: "'Coolvetica', sans-serif" }}>
              FAQ Transparansi Layanan &amp; Teknologi
            </h2>
            <p className="text-slate-600 font-sans text-sm sm:text-base mt-2">
              Jawaban atas pertanyaan umum seputar implementasi sistem digital dan ekspansi layanan kami di Jabodetabek.
            </p>
          </div>
          <div className="space-y-4">
            {bottomFaqs.map((faq, index) => {
              const isOpen = openFaq === index;
              const isCopied = copiedId === faq.id;
              return (
                <div key={faq.id} id={faq.id} className="border border-slate-200 rounded-none bg-white">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-lg font-black text-slate-900" style={{ fontFamily: "'Coolvetica', sans-serif" }}>
                      {faq.q}
                    </span>
                    <div className="flex items-center gap-3">
                      <span
                        onClick={(e) => handleCopyLink(e, faq.id)}
                        className="p-1.5 border border-slate-200 text-slate-500 hover:text-purple-700 bg-white"
                        title="Salin tautan"
                      >
                        {isCopied ? <Check size={14} className="text-emerald-600" /> : <LinkIcon size={14} />}
                      </span>
                      <ChevronDown size={18} className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-purple-700' : 'text-slate-400'}`} />
                    </div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden border-t border-slate-100 bg-slate-50/50"
                      >
                        <div className="px-6 py-4 text-slate-600 text-sm sm:text-base font-sans leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      <div className="w-full py-8 bg-slate-50">
        <FadeInSection>
          <CreativityMarquee />
        </FadeInSection>
      </div>

      {/* Persistent High-Contrast Edge-to-Edge CTA Bar */}
      <div className="w-full bg-purple-950 border-t-2 border-slate-800 text-white py-12 px-6 sm:px-12 flex flex-col md:flex-row items-center justify-between gap-6 rounded-none select-none">
        <div className="flex flex-col text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-300 mb-1">Mulai Transformasi Digital</span>
          <h3 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-white" style={{ fontFamily: "'Coolvetica', sans-serif" }}>
            Siap Mengakselerasi Bisnis Anda dengan Agentic AI &amp; Web Berkualitas Tinggi?
          </h3>
          <p className="text-purple-200/80 text-sm mt-1 max-w-2xl font-sans">
            Diskusikan kebutuhan arsitektur sistem dan otomasi bisnis Anda langsung dengan lead engineer kami di BSD City.
          </p>
        </div>
        <a
          href="https://wa.me/6282125447232?text=Halo%20CHESTAADOTCOM,%20saya%20tertarik%20untuk%20konsultasi%20proyek%20IT%20&%20AI%20Automation"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 bg-white text-slate-900 hover:bg-slate-100 font-sans font-bold text-sm sm:text-base rounded-none border-2 border-white transition-all shadow-[4px_4px_0_0_rgba(255,255,255,0.3)] shrink-0 flex items-center gap-2"
        >
          <span>Konsultasi WhatsApp Sekarang</span>
        </a>
      </div>
    </div>
  );
}
