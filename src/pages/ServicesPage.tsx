import { usePerformance } from '../contexts/PerformanceContext.tsx';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'motion/react';
import { Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { SERVICE_DEFINITIONS } from '../data/ServiceDefinition';
import FloatingQuoteTrigger from '../components/organisms/FloatingQuoteTrigger';
import QuickViewModal, { QuickViewData } from '../components/organisms/QuickViewModal';
import toast from 'react-hot-toast';
import { logAnalyticsEvent } from '../lib/firebase';
import confetti from 'canvas-confetti';
import { 
  ArrowUpRight, CheckCircle2, Code2, Rocket, Cpu, Layers, 
  ChevronDown, MessageSquare, Copy, Mail, Sparkles, Send, ArrowDown, 
  Eye, Zap, Shield, Globe, Award, Target, Users, Play, Pause, Timer, Pin, Lightbulb, Link as LinkIcon
, HelpCircle, FileText, PhoneCall, Search, } from 'lucide-react';


const sectionVariants = {
  hidden: { scale: 0.94, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring" as any, stiffness: 100, damping: 14, mass: 1,
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)", scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)", scale: 1,
    transition: { duration: 0.6, ease: "easeOut" as any }
  }
};

const FAQS = [
  { question: "Berapa lama proses pembuatan website?", answer: "Biasanya memakan waktu 3-6 minggu tergantung kompleksitas fitur." },
  { question: "Apakah ada garansi perbaikan bug?", answer: "Ya, kami memberikan garansi perbaikan bug gratis selama 3 bulan pertama setelah peluncuran." },
  { question: "Apakah source code diberikan?", answer: "Tentu, source code sepenuhnya menjadi hak milik Anda setelah proyek selesai dan lunas." },
  { question: "Bagaimana sistem pembayarannya?", answer: "Pembayaran dibagi menjadi 2 tahap: 50% DP di awal dan 50% setelah proyek selesai dan disetujui." }
];

const TECH_STACK = [
  { name: 'React', category: 'Frontend', icon: Code2 },
  { name: 'Next.js', category: 'Frontend', icon: Layers },
  { name: 'Tailwind CSS', category: 'Frontend', icon: Code2 },
  { name: 'Node.js', category: 'Backend', icon: Cpu },
  { name: 'Firebase', category: 'Backend', icon: Rocket },
  { name: 'PostgreSQL', category: 'Backend', icon: Code2 },
  { name: 'Gemini AI', category: 'AI', icon: Sparkles },
  { name: 'Groq', category: 'AI', icon: Sparkles },
];

const PROCESS_STEPS = [
  { title: "Discovery & Planning", desc: "Menganalisis kebutuhan bisnis dan merancang arsitektur solusi optimal.", icon: Target },
  { title: "UI/UX Design", desc: "Membuat purwarupa interaktif dengan fokus pada pengalaman pengguna.", icon: Layers },
  { title: "Development", desc: "Proses coding menggunakan teknologi terkini dengan standar industri.", icon: Code2 },
  { title: "Deployment", desc: "Peluncuran, optimasi SEO, dan pemeliharaan berkesinambungan.", icon: Rocket },
];

const METRICS = [
  { label: 'Proyek Selesai', value: '150+', icon: Award },
  { label: 'Klien Puas', value: '99%', icon: Users },
  { label: 'Uptime Server', value: '99.9%', icon: Globe },
  { label: 'Kecepatan Rata-rata', value: '0.8s', icon: Zap },
];

function FAQItem({ faq, isOpen, onClick }: { faq: any, isOpen: boolean, onClick: () => void }) {
  return (
    <div className="border border-slate-200/50 bg-white/50 backdrop-blur-md hover:bg-white/80 transition-colors py-5 px-6 mb-4 rounded-2xl cursor-pointer shadow-sm" onClick={onClick}>
      <div className="w-full flex items-center justify-between text-left focus:outline-none">
        <h4 className="text-lg font-medium text-slate-800">{faq.question}</h4>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown size={20} className="text-slate-500" />
        </motion.div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }} 
            className="overflow-hidden"
          >
            <p className="pt-4 text-slate-600 leading-relaxed text-sm">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}



const CYCLING_TEXT = [
  "Membangun Ekosistem Skalabilitas Enterprise.",
  "Menciptakan Web Berkinerja Tinggi & Responsif.",
  "Mengintegrasikan Kecerdasan Buatan (AI) Mutakhir."
];

function CyclingPropositions() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % CYCLING_TEXT.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-16 flex items-center justify-center overflow-hidden mb-12">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
          transition={{ duration: 0.6, ease: "easeInOut" as any }}
          className="text-lg md:text-xl text-purple-400 font-light max-w-2xl mx-auto leading-relaxed"
        >
          {CYCLING_TEXT[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

function GlassReveal({ dark = false }: { dark?: boolean }) {
  return (
    <motion.div 
      className={`absolute inset-0 z-50 pointer-events-none ${dark ? 'bg-slate-950/60 backdrop-blur-2xl' : 'bg-white/60 backdrop-blur-2xl'}`}
      variants={{
        hidden: { opacity: 1 },
        visible: { 
          opacity: 0, 
          transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] as any, delay: 0.2 },
          transitionEnd: { display: "none" }
        }
      }}
    />
  );
}

function SectionPin({ sectionId }: { sectionId: string }) {
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('bookmarkedServiceSection');
    if (saved === sectionId) {
      setIsPinned(true);
    }
  }, [sectionId]);

  const handlePin = () => {
    const saved = localStorage.getItem('bookmarkedServiceSection');
    if (saved === sectionId) {
      localStorage.removeItem('bookmarkedServiceSection');
      setIsPinned(false);
      toast.success('Bookmark dilepas');
    } else {
      localStorage.setItem('bookmarkedServiceSection', sectionId);
      setIsPinned(true);
      toast.success(`Bagian berhasil disimpan!`);
      // Update global pin state by dispatching a custom event, or rely on state if we want.
      // But page refresh will auto scroll there anyway.
      window.dispatchEvent(new Event('storage')); // A trick to trigger updates if needed
    }
  };

  useEffect(() => {
    const onStorage = () => {
      setIsPinned(localStorage.getItem('bookmarkedServiceSection') === sectionId);
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [sectionId]);

  return (
    <button
      onClick={handlePin}
      className={`absolute top-8 right-8 z-50 p-3 rounded-full transition-all duration-300 backdrop-blur-sm border ${
        isPinned 
          ? 'bg-amber-500/90 text-white border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.5)]' 
          : 'bg-white/10 text-slate-400 border-white/20 hover:bg-white/20 hover:text-white'
      }`}
      title={isPinned ? "Lepaskan Pin" : "Pin Bagian Ini"}
    >
      <Pin size={20} className={isPinned ? "fill-white" : ""} />
    </button>
  );
}

function DidYouKnowSnippet({ sectionTitle, delay = 0.2, dark = false }: { sectionTitle: string, delay?: number, dark?: boolean }) {
  const [fact, setFact] = useState("Loading AI insights...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchFact = async () => {
      try {
        const res = await fetch('/api/ai/did-you-know', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ serviceTitle: sectionTitle })
        });
        const data = await res.json();
        if (isMounted && data.fact) {
          setFact(data.fact);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchFact();
    return () => { isMounted = false; };
  }, [sectionTitle]);

  return (
    <motion.div variants={itemVariants}
      className={`mt-12 mx-auto max-w-2xl border rounded-2xl p-4 flex items-start gap-4 relative overflow-hidden group ${
        dark 
          ? 'bg-purple-900/20 border-purple-700/30' 
          : 'bg-purple-50/50 border-purple-100'
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-700/0 via-purple-700/10 to-purple-700/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
        dark ? 'bg-purple-900/50' : 'bg-purple-100'
      }`}>
        {loading ? (
           <div className="w-4 h-4 border-2 border-purple-700 border-t-transparent rounded-full animate-spin" />
        ) : (
           <Sparkles size={16} className={dark ? 'text-purple-500' : 'text-purple-800'} />
        )}
      </div>
      <div className="text-left">
        <span className={`text-[10px] font-bold uppercase tracking-widest mb-1 block ${
          dark ? 'text-purple-500' : 'text-purple-800'
        }`}>Did you know? (AI Generated)</span>
        <p className={`text-sm leading-relaxed ${
          dark ? 'text-slate-300' : 'text-slate-700'
        }`}>
          {fact}
        </p>
      </div>
    </motion.div>
  );
}

function useActiveSection(sectionIds: string[], containerRef: React.RefObject<HTMLDivElement>) {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollTop + container.clientHeight / 2;
      let currentIdx = 0;
      
      for (let i = 0; i < sectionIds.length; i++) {
        const element = document.getElementById(sectionIds[i]);
        // When using container scroll, element.offsetTop is relative to offsetParent.
        // If the container is position: relative, offsetTop gives distance from container top.
        if (element && element.offsetTop <= scrollPosition) {
          currentIdx = i;
        }
      }
      setActiveSection(currentIdx);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => container.removeEventListener('scroll', handleScroll);
  }, [sectionIds, containerRef]);

  return activeSection;
}


function VerticalDotNav({ sectionIds, activeSection }: { sectionIds: string[], activeSection: number }) {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-4">
      {sectionIds.map((id, index) => (
        <button
          key={id}
          onClick={() => {
            const hash = '#' + id;
            if(window.history.pushState) {
                window.history.pushState(null, '', hash);
            } else {
                window.location.hash = hash;
            }
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
          }}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${activeSection === index ? 'bg-purple-800 scale-125 shadow-[0_0_10px_rgba(107,33,168,0.5)]' : 'bg-slate-300 hover:bg-purple-500'}`}
          title={`Go to ${id}`}
        />
      ))}
    </div>
  );
}


const EXPERT_INSIGHTS = [
  "Fokus pada aksesibilitas meningkatkan retensi pengguna hingga 30%.",
  "Arsitektur headless memastikan skalabilitas tanpa batas di era cloud.",
  "Penggunaan edge caching mengurangi latency response hingga 80%.",
  "Komponen berbasis sistem desain memangkas waktu iterasi UI sebesar 50%.",
  "Integrasi AI pada microservices mempercepat decision-making di backend."
];

function ExpertInsightBox({ serviceSlug }: { serviceSlug: string }) {
  const [idx, setIdx] = useState(0);
  
  // Deterministic seed based on slug to stagger animations slightly
  useEffect(() => {
    const seed = serviceSlug.charCodeAt(0) % EXPERT_INSIGHTS.length;
    setIdx(seed);
    const timer = setInterval(() => {
      setIdx(prev => (prev + 1) % EXPERT_INSIGHTS.length);
    }, 4000 + (seed * 500));
    return () => clearInterval(timer);
  }, [serviceSlug]);

  return (
    <div className="mt-6 pt-4 border-t border-slate-100 flex items-start gap-3">
      <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
        <Lightbulb size={16} className="text-amber-500" />
      </div>
      <div className="flex-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Expert Insight</span>
        <AnimatePresence mode="wait">
          <motion.p 
            key={idx}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-xs text-slate-600 font-medium leading-relaxed"
          >
            {EXPERT_INSIGHTS[idx]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}


const TECH_STACK_MAP: Record<string, string[]> = {
  'web-development': ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Node.js', 'Vite'],
  'ai-agents': ['OpenAI', 'Gemini API', 'LangChain', 'Python', 'Vector DB', 'Pinecone'],
  'shopify-optimization': ['Liquid', 'React', 'GraphQL', 'Shopify Admin', 'Hydrogen', 'Oxygen'],
  'cloud-infrastructure': ['AWS', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
  'landing-page-conversion': ['Figma', 'React', 'Framer Motion', 'A/B Testing', 'Analytics', 'Vercel'],
  'seo-auditing': ['Ahrefs', 'Search Console', 'Semrush', 'Lighthouse', 'Next.js', 'Schema'],
  'bot-automation': ['Discord.js', 'Telegram API', 'Node.js', 'Puppeteer', 'Webhooks', 'Redis'],
  'api-integration': ['REST', 'GraphQL', 'OAuth2', 'Postman', 'Swagger', 'WebSockets'],
  'performance-tuning': ['Lighthouse', 'Web Vitals', 'Redis', 'CDN', 'Edge Computing', 'Wasm'],
  'ui-ux-prototyping': ['Figma', 'Framer', 'Protopie', 'User Testing', 'Wireframing', 'Miro']
};

function TechStackCarousel({ slug }: { slug: string }) {
  const stacks = TECH_STACK_MAP[slug] || TECH_STACK_MAP['web-development'];
  const items = [...stacks, ...stacks];

  return (
    <div className="absolute -bottom-4 left-4 right-4 bg-slate-900 rounded-xl p-3 shadow-2xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20 overflow-hidden pointer-events-none border border-slate-700">
      <div className="relative w-full overflow-hidden flex items-center">
        <div className="absolute left-0 w-8 h-full bg-gradient-to-r from-slate-900 to-transparent z-10" />
        <div className="absolute right-0 w-8 h-full bg-gradient-to-l from-slate-900 to-transparent z-10" />
        <motion.div 
          className="flex gap-2 whitespace-nowrap items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 15, repeat: Infinity }}
        >
          {items.map((tech, i) => (
            <div key={i} className="px-3 py-1 rounded-md bg-white/10 text-slate-300 text-[11px] font-medium tracking-wide">
              {tech}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function QuickActionBar() {
  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring" as any, stiffness: 200, damping: 20 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[110] bg-slate-900/90 backdrop-blur-xl border border-white/10 px-2 py-2 rounded-full shadow-2xl flex items-center gap-1"
    >
      <button 
        onClick={() => {
          const el = document.getElementById('contact');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/10 text-slate-200 transition-colors text-sm font-medium"
      >
        <PhoneCall size={16} className="text-purple-500" />
        <span className="hidden sm:inline">Contact Us</span>
      </button>
      <div className="w-px h-6 bg-white/20" />
      <button 
        onClick={() => {
          const el = document.getElementById('ai-scope');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/10 text-slate-200 transition-colors text-sm font-medium"
      >
        <FileText size={16} className="text-emerald-400" />
        <span className="hidden sm:inline">Request Quote</span>
      </button>
      <div className="w-px h-6 bg-white/20" />
      <button 
        onClick={() => {
          const el = document.getElementById('faq');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/10 text-slate-200 transition-colors text-sm font-medium"
      >
        <HelpCircle size={16} className="text-purple-500" />
        <span className="hidden sm:inline">View FAQ</span>
      </button>
    </motion.div>
  );
}


function ServiceCardHoverOverlay({ service }: { service: any }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div 
      className="absolute inset-0 z-30" 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
      style={{ pointerEvents: 'none' }}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute inset-0 bg-white/95 backdrop-blur-md p-8 flex flex-col justify-center border border-purple-100 rounded-3xl"
            style={{ pointerEvents: 'auto' }}
          >
            <motion.h5 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="font-bold text-slate-900 mb-4"
            >
              Key Benefits
            </motion.h5>
            <ul className="space-y-3 mb-6">
              {service.benefits.map((benefit: string, idx: number) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + (idx * 0.05) }}
                  className="flex items-start gap-3 text-sm text-slate-700 font-medium"
                >
                  <span className="text-purple-700 mt-0.5">•</span>
                  {benefit}
                </motion.li>
              ))}
            </ul>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-between mt-auto"
            >
              <div>
                <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest mb-1">Mulai Dari</div>
                <div className="font-bold text-slate-900 text-lg">Custom Quote</div>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = `/layanan/${service.slug}`;
                }}
                className="px-6 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-full hover:bg-purple-800 transition-colors shadow-lg hover:shadow-purple-700/25 flex items-center gap-2"
              >
                Pelajari Detail
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ServiceCard({ service, i, compareMode, selectedForCompare, toggleCompare, setHoveredService, setQuickViewData, containerRef, performanceMode }: any) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Parallax effect
  const { scrollYProgress } = useScroll({ 
    target: cardRef, 
    container: containerRef,
    offset: ["start end", "end start"]
  });
  
  // If performance mode is ON, we disable the parallax movement
  const yParallax = useTransform(scrollYProgress, [0, 1], performanceMode ? [0, 0] : [50, -50]);
  const scaleParallax = useTransform(scrollYProgress, [0, 1], performanceMode ? [1, 1] : [1.1, 1]);

  return (
    <motion.div 
      ref={cardRef}
      layout 
      variants={{
        hidden: { opacity: 0, y: 30, filter: performanceMode ? "none" : "blur(10px)", scale: performanceMode ? 1 : 0.95 },
        visible: { 
          opacity: 1, 
          y: 0, 
          filter: performanceMode ? "none" : "blur(0px)", 
          scale: 1,
          transition: { duration: 0.6, ease: "easeOut" as any }
        }
      }} 
      transition={{ delay: i * 0.05 }}
      onMouseEnter={() => setHoveredService(service.slug)}
      onMouseLeave={() => setHoveredService(null)}
      id={service.slug}
      className={`bg-white p-8 rounded-3xl border transition-all duration-300 relative group flex flex-col overflow-hidden ${compareMode && selectedForCompare.includes(service.slug) ? 'border-purple-700 ring-2 ring-purple-700/20 shadow-xl' : 'border-slate-200 hover:border-purple-400 hover:shadow-2xl shadow-sm'}`}
      onClick={() => compareMode ? toggleCompare(service.slug) : window.location.href = `/layanan/${service.slug}`}
    >
      {/* Decorative Parallax Background */}
      <motion.div 
        style={{ y: yParallax, scale: scaleParallax }}
        className="absolute -top-24 -right-24 w-64 h-64 bg-purple-50/50 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-100/50 transition-colors duration-500"
      />
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], performanceMode ? [0, 0] : [-30, 30]) }}
        className="absolute -bottom-12 -left-12 w-40 h-40 bg-purple-50/50 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-100/50 transition-colors duration-500"
      />

      <div className="relative z-10 flex justify-between items-start mb-6">
        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-purple-800 group-hover:bg-purple-800 group-hover:text-white transition-colors">
            {service.icon ? <service.icon size={24} /> : <Code2 size={24} />}
          </div>
          <div>
            <h4 className="text-xl font-medium text-slate-900 group-hover:text-purple-800 transition-colors">{service.title}</h4>
            <div className="text-xs font-mono text-slate-500 mt-1 uppercase tracking-wider">{service.benefits.slice(0,2).join(' • ')}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 relative z-20">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              const url = `${window.location.origin}${window.location.pathname}#${service.slug}`;
              if(window.history.pushState) {
                window.history.pushState(null, '', `#${service.slug}`);
              } else {
                window.location.hash = `#${service.slug}`;
              }
              navigator.clipboard.writeText(url);
              toast.success("Tautan layanan disalin!");
            }}
            className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-purple-800 hover:text-white transition-colors tooltip-trigger"
            title="Copy Deep Link"
          >
            <LinkIcon size={18} />
          </button>
        </div>
      </div>
      <div className="relative z-10 mb-6 flex-1 transition-opacity duration-300 group-hover:opacity-0">
        <p className="text-slate-600 leading-relaxed text-sm line-clamp-2">{service.description}</p>
        {compareMode && (
          <div className="mt-4 text-xs font-bold uppercase tracking-widest text-purple-800 bg-purple-50 inline-block px-3 py-1.5 rounded-full">
            {selectedForCompare.includes(service.slug) ? 'Terpilih' : 'Pilih untuk Bandingkan'}
          </div>
        )}
        {!compareMode && <ExpertInsightBox serviceSlug={service.slug} />}
      </div>
      <div className="transition-opacity duration-300 group-hover:opacity-0">
        <TechStackCarousel slug={service.slug} />
      </div>

      {/* Hover Overlay with Framer Motion */}
      {/* We use a state mapped to the card hover event which is already hooked to setHoveredService, but we need to track local hover state for AnimatePresence to work well independently if needed. But actually, group-hover works fine if we combine it with motion. Or we can just use AnimatePresence with local state. Since setHoveredService is from parent, let's just use CSS group-hover trigger to conditionally render motion inside? No, conditional rendering requires state. */}
      {/* Let's just track local hover state inside the component */}
      <ServiceCardHoverOverlay service={service} />
    </motion.div>
  );
}

export default function ServicesPage() {
  const featured = SERVICE_DEFINITIONS[0];
  const others = SERVICE_DEFINITIONS.slice(1);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Exactly 8 sections
  const sectionIds = ['hero', 'philosophy', 'services', 'ai-scope', 'tech', 'process', 'metrics', 'faq', 'contact'];
  const activeSection = useActiveSection(sectionIds, containerRef);
  const { performanceMode } = usePerformance();
  
  const [filter, setFilter] = useState('All');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // Quick Request State
  const [requestText, setRequestText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Compare State
  
  const [serviceFilter, setServiceFilter] = useState('All');
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredServices = SERVICE_DEFINITIONS.filter(service => {
    const matchesSearch = !searchTerm || 
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.benefits.some(b => b.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;

    if (serviceFilter === 'All') return true;
    if (serviceFilter === 'Web Development') return ['web-development', 'shopify-optimization', 'landing-page-conversion', 'ui-ux-prototyping', 'performance-tuning'].includes(service.slug);
    if (serviceFilter === 'AI Automation') return ['ai-agents', 'bot-automation', 'api-integration'].includes(service.slug);
    if (serviceFilter === 'Strategy') return ['seo-auditing', 'cloud-infrastructure'].includes(service.slug);
    return true;
  });

  useEffect(() => {
    if (searchTerm && filteredServices.length > 0) {
      const match = filteredServices[0];
      const el = document.getElementById(match.slug);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [searchTerm]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;
      
      if (e.key.toLowerCase() === 'q') {
        const targetSlug = hoveredService || (activeSection === 2 ? filteredServices[0]?.slug : null);
        if (targetSlug) {
          const service = SERVICE_DEFINITIONS.find(s => s.slug === targetSlug);
          if (service) {
            setQuickViewData({ 
              id: service.slug, 
              type: 'service', 
              title: service.title, 
              description: service.description, 
              tags: service.benefits, 
              link: `/layanan/${service.slug}` 
            });
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [hoveredService, activeSection, filteredServices]);

  const [compareMode, setCompareMode] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  
  
  // Auto-Presentation State
  const [isPlaying, setIsPlaying] = useState(false);

  // Mouse Parallax Logic for Hero
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const heroRotateX = useTransform(smoothMouseY, [-0.5, 0.5], [10, -10]);
  const heroRotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-10, 10]);
  const heroTranslateX = useTransform(smoothMouseX, [-0.5, 0.5], [-30, 30]);
  const heroTranslateY = useTransform(smoothMouseY, [-0.5, 0.5], [-30, 30]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Normalize values between -0.5 and 0.5
    const xPct = (clientX / innerWidth) - 0.5;
    const yPct = (clientY / innerHeight) - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const [playDelay, setPlayDelay] = useState(5000);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        const nextIndex = (activeSection + 1) % sectionIds.length;
        document.getElementById(sectionIds[nextIndex])?.scrollIntoView({ behavior: 'smooth' });
      }, playDelay);
    }
    return () => clearInterval(timer);
  }, [isPlaying, activeSection, playDelay, sectionIds]);

  // Quick View State
  const [quickViewData, setQuickViewData] = useState<QuickViewData | null>(null);

  
    // Bookmark State
  const [bookmarkedSection, setBookmarkedSection] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && sectionIds.includes(hash)) {
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
      return;
    }

    const saved = localStorage.getItem('bookmarkedServiceSection');
    if (saved && sectionIds.includes(saved)) {
      setBookmarkedSection(saved);
      setTimeout(() => {
        document.getElementById(saved)?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  }, []);

  const toggleBookmark = () => {
    const currentId = sectionIds[activeSection];
    if (bookmarkedSection === currentId) {
      localStorage.removeItem('bookmarkedServiceSection');
      setBookmarkedSection(null);
      toast.success('Bookmark dilepas');
    } else {
      localStorage.setItem('bookmarkedServiceSection', currentId);
      setBookmarkedSection(currentId);
      toast.success(`Bagian ${currentId} berhasil disimpan!`);
    }
  };

  const { scrollY } = useScroll({ container: containerRef });
  const heroTitleY = useTransform(scrollY, [0, 600], [0, 200]);
  const heroTitleScale = useTransform(scrollY, [0, 600], [1, 0.9]);
  const heroBadgeY = useTransform(scrollY, [0, 600], [0, 80]);
  const heroDescY = useTransform(scrollY, [0, 600], [0, 250]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Keyboard Navigation (ArrowUp/ArrowDown)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'ArrowUp'].includes(e.key)) {
        // Prevent default only if not in an input
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
        
        e.preventDefault();
        const direction = e.key === 'ArrowDown' ? 1 : -1;
        const nextIndex = Math.max(0, Math.min(sectionIds.length - 1, activeSection + direction));
        
        document.getElementById(sectionIds[nextIndex])?.scrollIntoView({
          behavior: 'smooth'
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, sectionIds]);

  const toggleCompare = (slug: string) => {
    setSelectedForCompare(prev => {
      if (prev.includes(slug)) return prev.filter(s => s !== slug);
      if (prev.length >= 2) return [prev[1], slug];
      return [...prev, slug];
    });
  };

  const handleQuickRequest = async () => {
    if (!requestText.trim()) return;
    logAnalyticsEvent('generate_scope_proposal', { input_length: requestText.length });
    setIsGenerating(true);
    
    setTimeout(() => {
      setIsGenerating(false);
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
      toast.success('Proposal scope berhasil dibuat (Simulasi)! Tim kami akan menghubungi Anda.');
      setRequestText('');
    }, 2000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('hello@chestaadotcom.com');
    toast.success('Email disalin ke clipboard!');
  };

  return (
    <HelmetProvider>
      <VerticalDotNav sectionIds={sectionIds} activeSection={activeSection} />
      
      {/* Global Search Bar */}
      <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-full max-w-lg px-4 pointer-events-none">
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring" as any, stiffness: 200 }}
          className="relative pointer-events-auto"
        >
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text"
            placeholder="Cari layanan, teknologi, atau fitur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/90 backdrop-blur-xl border border-slate-200 shadow-2xl rounded-full py-4 pl-14 pr-6 text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-purple-700 font-medium placeholder:text-slate-400 placeholder:font-normal transition-all"
          />
        </motion.div>
      </div>
      <Helmet>
        <title>Layanan & Solusi Digital | CHESTAADOTCOM</title>
        <meta name="description" content="Eksplorasi katalog layanan digital komprehensif kami, mulai dari pengembangan web hingga solusi AI khusus." />
      </Helmet>
      
      <QuickViewModal isOpen={!!quickViewData} onClose={() => setQuickViewData(null)} data={quickViewData} />

      
      {/* Floating Jump Menu & Presentation Mode */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-2 mix-blend-difference">
        
        {/* Presentation Controls */}
        <div className="flex flex-col items-center gap-1 mb-4 bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-2xl shadow-xl">
          <button 
            onClick={toggleBookmark}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${bookmarkedSection === sectionIds[activeSection] ? 'bg-amber-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.5)]' : 'bg-transparent text-white hover:bg-white/20'}`}
            title={bookmarkedSection === sectionIds[activeSection] ? "Hapus Bookmark" : "Simpan Bagian Ini"}
          >
            <Pin size={14} className="text-white" />
          </button>
          
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isPlaying ? 'bg-purple-700 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'bg-transparent text-white hover:bg-white/20'}`}
            title={isPlaying ? "Pause Presentation" : "Start Auto-Presentation"}
          >
            {isPlaying ? <Pause size={14} className="text-white" /> : <Play size={14} className="ml-0.5 text-white" />}
          </button>
          
          <AnimatePresence>
            {isPlaying && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden w-full flex flex-col items-center gap-1 pt-2"
              >
                <div className="w-full h-px bg-white/20 mb-1" />
                <Timer size={12} className="text-white/70" />
                <select 
                  value={playDelay} 
                  onChange={(e) => setPlayDelay(Number(e.target.value))}
                  className="bg-transparent text-[10px] text-center font-mono text-white outline-none appearance-none cursor-pointer hover:text-purple-400 transition-colors text-center w-full"
                  title="Configurable Delay"
                >
                  <option value={3000} className="text-slate-900">3s</option>
                  <option value={5000} className="text-slate-900">5s</option>
                  <option value={8000} className="text-slate-900">8s</option>
                  <option value={12000} className="text-slate-900">12s</option>
                </select>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-3 items-end">
          {sectionIds.map((id, idx) => (
          <button
            key={id}
            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative flex items-center justify-end"
          >
            <span className={`absolute right-8 text-[10px] font-mono tracking-widest uppercase transition-all duration-300 ${activeSection === idx ? 'opacity-100 text-white' : 'opacity-0 text-slate-400 group-hover:opacity-100'}`}>
              {id}
            </span>
            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${activeSection === idx ? 'bg-white scale-150' : 'bg-slate-600 group-hover:bg-slate-400'}`} />
          </button>
        ))}
        </div>
      </div>

      <div ref={containerRef} className="relative h-screen w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory bg-transparent scroll-smooth">
        
        
        {/* 1. HERO SECTION */}
        <motion.section id="hero" onMouseMove={handleMouseMove} variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ amount: 0.1, margin: "-100px" }} className="snap-start relative min-h-screen flex flex-col justify-center items-center text-center px-6 md:px-12 overflow-hidden bg-slate-950 text-white">
          <GlassReveal dark />
          <SectionPin sectionId="hero" />
          <motion.div style={{ y: heroDescY }} className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-800/30 blur-[120px] rounded-full pointer-events-none" />
            <motion.div animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }} className="absolute top-1/4 left-1/4 w-32 h-32 border border-white/10 rounded-full pointer-events-none" />
            <motion.div animate={{ y: [0, 40, 0], x: [0, 20, 0], rotate: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }} className="absolute bottom-1/4 right-1/4 w-64 h-64 border border-purple-500/10 rounded-full pointer-events-none" />
            <motion.div animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }} transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }} className="absolute top-1/3 right-1/3 w-24 h-24 border border-white/5 rotate-45 pointer-events-none" />
            <motion.div animate={{ y: [0, -50, 0], x: [0, -30, 0] }} transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }} className="absolute bottom-1/3 left-1/3 w-48 h-48 border border-cyan-400/10 rounded-full blur-sm pointer-events-none" />
            <motion.div animate={{ y: [0, 20, 0], x: [0, 40, 0], rotate: [0, 45, 0] }} transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }} className="absolute top-1/2 left-1/10 w-40 h-40 border border-purple-500/10 rounded-lg rotate-12 pointer-events-none" />
          </motion.div>
          <motion.div style={{ opacity: heroOpacity, rotateX: heroRotateX, rotateY: heroRotateY, x: heroTranslateX, y: heroTranslateY, transformStyle: "preserve-3d" }} className="relative z-10 max-w-4xl mx-auto">
            <motion.div variants={itemVariants}>
              <motion.span style={{ y: heroBadgeY }} className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-mono font-medium tracking-widest uppercase mb-8 inline-block backdrop-blur-md">
                Layanan Digital Premium
              </motion.span>
              <motion.h1 style={{ y: heroTitleY, scale: heroTitleScale }} className="text-6xl md:text-8xl font-display font-medium tracking-tight mb-8 leading-tight">
                Arsitektur Digital <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-purple-500 to-cyan-400 italic font-serif pr-4">Masa Depan.</span>
              </motion.h1>
              <motion.div style={{ y: heroDescY }}>
                <CyclingPropositions />
                <DidYouKnowSnippet dark sectionTitle="Digital Architecture & Premium Web Services" />
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.button  
            animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            onClick={() => document.getElementById('philosophy')?.scrollIntoView({ behavior: 'smooth' })}
            className="absolute bottom-12 text-white/50 hover:text-white transition-colors flex flex-col items-center gap-2 cursor-pointer"
          >
            <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
            <ArrowDown size={24} />
          </motion.button>
        </motion.section>

        {/* 2. PHILOSOPHY SECTION */}
        <motion.section id="philosophy" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ amount: 0.1, margin: "-100px" }} className="snap-start min-h-screen flex flex-col justify-center max-w-[1400px] mx-auto px-6 md:px-12 py-24 relative bg-[#fbfbfd]">
          <GlassReveal />
          <SectionPin sectionId="philosophy" />
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-medium text-slate-900">Filosofi Kami</h2>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">Tiga pilar utama yang menjadi fondasi setiap baris kode dan desain yang kami buat.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {[
              { title: "Kecepatan Murni", desc: "Optimasi tingkat byte, SSR, dan arsitektur edge untuk memastikan aplikasi Anda merespons dalam milidetik.", icon: Zap },
              { title: "Keamanan Skala Enterprise", desc: "Dibangun dengan praktik keamanan terbaik, enkripsi end-to-end, dan perlindungan data yang ketat.", icon: Shield },
              { title: "Inovasi Berbasis AI", desc: "Membawa kecerdasan buatan langsung ke inti operasi bisnis Anda untuk otomatisasi tanpa batas.", icon: Sparkles }
            ].map((phil, i) => (
              <motion.div 
                variants={itemVariants}
                key={i} className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/40 border border-slate-100 hover:-translate-y-2 transition-transform duration-500"
              >
                <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 text-purple-800">
                  <phil.icon size={28} />
                </div>
                <h3 className="text-2xl font-medium text-slate-900 mb-4">{phil.title}</h3>
                <p className="text-slate-600 leading-relaxed">{phil.desc}</p>
              </motion.div>
            ))}
          </div>
          <DidYouKnowSnippet sectionTitle="High Performance Web Optimization" />
        </motion.section>

        {/* 3. SERVICES CATALOG */}
        <motion.section id="services" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ amount: 0.1, margin: "-100px" }} className="snap-start min-h-screen flex flex-col justify-center max-w-[1400px] mx-auto px-6 md:px-12 py-24 relative">
          <GlassReveal />
          <SectionPin sectionId="services" />
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-medium text-slate-900 mb-4">Katalog Layanan</h2>
              <p className="text-slate-500 max-w-xl mb-6">Solusi end-to-end yang dirancang khusus untuk memecahkan tantangan bisnis modern.</p>
              <div className="flex flex-wrap gap-3">
                {['All', 'Web Development', 'AI Automation', 'Strategy'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setServiceFilter(cat)}
                    className={`px-5 py-2 rounded-full font-medium transition-colors text-sm border ${serviceFilter === cat ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-full border border-slate-200 shadow-sm">
              <span className="text-sm font-medium text-slate-600">Mode Bandingkan</span>
              <button 
                onClick={() => { setCompareMode(!compareMode); setSelectedForCompare([]); }}
                className={`w-12 h-6 rounded-full transition-colors relative ${compareMode ? 'bg-purple-800' : 'bg-slate-200'}`}
              >
                <motion.div className="w-4 h-4 bg-white rounded-full absolute top-1 shadow-sm" animate={{ left: compareMode ? '26px' : '6px' }} />
              </button>
            </div>
          </div>

          <motion.div layout className="grid lg:grid-cols-2 gap-6"><AnimatePresence mode="popLayout">
            {filteredServices.map((service, i) => (
              <motion.div 
                layout variants={itemVariants} transition={{ delay: i * 0.05 }}
                key={service.slug} 
                onMouseEnter={() => setHoveredService(service.slug)}
                onMouseLeave={() => setHoveredService(null)}
                id={service.slug}
                className={`bg-white p-8 rounded-3xl border transition-all duration-300 relative group flex flex-col ${compareMode && selectedForCompare.includes(service.slug) ? 'border-purple-700 ring-2 ring-purple-700/20 shadow-xl' : 'border-slate-200 hover:border-purple-400 hover:shadow-2xl shadow-sm'}`}
                onClick={() => compareMode ? toggleCompare(service.slug) : window.location.href = `/layanan/${service.slug}`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-purple-800 group-hover:bg-purple-800 group-hover:text-white transition-colors">
                      {service.icon ? <service.icon size={24} /> : <Code2 size={24} />}
                    </div>
                    <div>
                      <h4 className="text-xl font-medium text-slate-900">{service.title}</h4>
                      <div className="text-xs font-mono text-slate-500 mt-1 uppercase tracking-wider">{service.benefits.slice(0,2).join(' • ')}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        const url = `${window.location.origin}${window.location.pathname}#${service.slug}`;
                        if(window.history.pushState) {
                          window.history.pushState(null, '', `#${service.slug}`);
                        } else {
                          window.location.hash = `#${service.slug}`;
                        }
                        navigator.clipboard.writeText(url);
                        toast.success("Tautan layanan disalin!");
                      }}
                      className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-purple-800 hover:text-white transition-colors tooltip-trigger"
                      title="Copy Deep Link"
                    >
                      <LinkIcon size={18} />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewData({ id: service.slug, type: 'service', title: service.title, description: service.description, tags: service.benefits, link: `/layanan/${service.slug}` });
                      }}
                      className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors tooltip-trigger"
                      title="Quick View"
                    >
                      <Eye size={18} />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-purple-800 group-hover:text-white transition-colors">
                      <ArrowUpRight size={18} />
                    </button>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm line-clamp-2">{service.description}</p>
                {compareMode && (
                  <div className="mt-4 text-xs font-bold uppercase tracking-widest text-purple-800 bg-purple-50 inline-block px-3 py-1.5 rounded-full">
                    {selectedForCompare.includes(service.slug) ? 'Terpilih' : 'Pilih untuk Bandingkan'}
                  </div>
                )}
                {!compareMode && <ExpertInsightBox serviceSlug={service.slug} />}
                <TechStackCarousel slug={service.slug} />
              </motion.div>
            ))}
          </AnimatePresence></motion.div>

          
          <AnimatePresence>
            {compareMode && selectedForCompare.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} 
                className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[90] flex items-center gap-4 bg-white text-slate-900 px-8 py-4 rounded-full shadow-2xl border border-slate-200"
              >
                <span className="font-medium">{selectedForCompare.length}/2 Dipilih</span>
                <button 
                  disabled={selectedForCompare.length !== 2}
                  onClick={() => document.getElementById('compare-modal-trigger')?.click()}
                  className="bg-purple-800 text-white px-6 py-2 rounded-full font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors"
                >
                  Bandingkan Sekarang
                </button>
                <button onClick={() => {setCompareMode(false); setSelectedForCompare([]);}} className="text-slate-400 hover:text-slate-600">Batal</button>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Hidden trigger for modal to keep state clean */}
          <button id="compare-modal-trigger" className="hidden" onClick={() => {
            const modal = document.getElementById('compare-modal-overlay');
            if (modal) modal.style.display = 'flex';
          }} />

          {/* Actual Compare Modal */}
          <div id="compare-modal-overlay" className="fixed inset-0 z-[200] bg-slate-900/80 backdrop-blur-md hidden items-center justify-center p-6">
            <div className="bg-white rounded-[2rem] w-full max-w-5xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="text-2xl font-display font-medium text-slate-900">Perbandingan Analitis Layanan</h3>
                <button 
                  onClick={() => document.getElementById('compare-modal-overlay').style.display = 'none'} 
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                >
                  ✕
                </button>
              </div>
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100 overflow-y-auto">
                {selectedForCompare.map(slug => {
                  const svc = SERVICE_DEFINITIONS.find(s => s.slug === slug);
                  const complexity = (svc?.benefits.length || 0) > 4 ? "Tinggi (Enterprise)" : "Menengah (Professional)";
                  const cost = (svc?.benefits.length || 0) > 4 ? "$$ - Investasi Strategis" : "$ - Standar Industri";
                  const time = (svc?.benefits.length || 0) > 4 ? "8-12 Minggu" : "4-6 Minggu";
                  
                  return (
                    <div key={slug} className="space-y-8 pt-8 md:pt-0 md:px-8 first:md:pl-0 last:md:pr-0">
                      <div>
                        <div className="w-12 h-12 bg-purple-50 text-purple-800 rounded-xl flex items-center justify-center mb-4">
                          {svc?.icon ? <svc.icon size={24} /> : <Code2 size={24} />}
                        </div>
                        <h4 className="text-2xl font-medium text-slate-900 mb-2">{svc?.title}</h4>
                        <p className="text-slate-500 text-sm leading-relaxed">{svc?.description}</p>
                      </div>
                      
                      <div className="space-y-6">
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Estimasi Waktu Pengiriman</span>
                          <span className="text-lg font-medium text-slate-900 flex items-center gap-2">
                            <Timer size={18} className="text-amber-500" /> {time}
                          </span>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Tingkat Kompleksitas</span>
                          <span className="text-lg font-medium text-slate-900 flex items-center gap-2">
                            <Layers size={18} className="text-purple-700" /> {complexity}
                          </span>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Skala Investasi (Cost)</span>
                          <span className="text-lg font-medium text-slate-900 flex items-center gap-2">
                            <Target size={18} className="text-emerald-500" /> {cost}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <DidYouKnowSnippet sectionTitle="Enterprise Web Catalog & End-to-end Solutions" />
        </motion.section>

        {/* 4. AI SCOPE (QUICK REQUEST) */}
        <motion.section id="ai-scope" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ amount: 0.1, margin: "-100px" }} className="snap-start min-h-screen flex flex-col justify-center max-w-[1400px] mx-auto px-6 md:px-12 py-24 relative">
          <GlassReveal dark />
          <SectionPin sectionId="ai-scope" />
          <div className="bg-gradient-to-br from-purple-900 to-slate-900 rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl border border-purple-700/20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-700/20 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white border border-white/20 text-sm font-medium mb-8 backdrop-blur-md">
                <Sparkles size={16} className="text-purple-500" />
                AI-Powered Scoping
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-medium text-white mb-6">Ceritakan Kebutuhan Anda</h2>
              <p className="text-purple-200 mb-10 text-lg">AI kami akan menganalisis request Anda dan secara instan merekomendasikan tumpukan teknologi, estimasi waktu, dan solusi layanan yang tepat.</p>
              
              <div className="bg-white p-2 rounded-2xl md:rounded-full shadow-2xl flex flex-col md:flex-row items-center gap-2 focus-within:ring-4 focus-within:ring-purple-700/30 transition-all">
                <input
                  type="text"
                  value={requestText}
                  onChange={(e) => setRequestText(e.target.value)}
                  placeholder="Cth: Saya butuh e-commerce dengan sistem booking dan AI chatbot..."
                  className="w-full bg-transparent px-6 py-4 outline-none text-slate-800 placeholder:text-slate-400 text-base md:text-lg rounded-full"
                  onKeyDown={(e) => e.key === 'Enter' && handleQuickRequest()}
                />
                <button
                  onClick={handleQuickRequest}
                  disabled={isGenerating || !requestText.trim()}
                  className="w-full md:w-auto flex items-center justify-center gap-2 bg-purple-800 text-white px-8 py-4 rounded-xl md:rounded-full font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 shrink-0"
                >
                  {isGenerating ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send size={18} /> Analisis Sekarang</>}
                </button>
              </div>
              <DidYouKnowSnippet dark sectionTitle="AI Driven Project Scoping and Estimation" />
            </div>
          </div>
        </motion.section>

        {/* 5. TECH STACK */}
        <motion.section id="tech" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ amount: 0.1, margin: "-100px" }} className="snap-start min-h-screen flex flex-col justify-center max-w-[1400px] mx-auto px-6 md:px-12 py-24 relative">
          <GlassReveal />
          <SectionPin sectionId="tech" />
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-medium text-slate-900 mb-6">Persenjataan Teknologi</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {['All', 'Frontend', 'Backend', 'AI'].map(cat => (
                <button 
                  key={cat} onClick={() => setFilter(cat)}
                  className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 text-sm ${filter === cat ? 'bg-slate-900 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-400 hover:text-slate-900'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
          
          <motion.div layout className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
            <AnimatePresence mode="popLayout">
              {TECH_STACK.filter(t => filter === 'All' || t.category === filter).map(tech => (
                <motion.div
                  layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.3 }}
                  key={tech.name}
                  className="flex flex-col items-center gap-4 p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all w-40"
                >
                  <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-800">
                    <tech.icon size={32} />
                  </div>
                  <span className="text-sm font-bold text-slate-800">{tech.name}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          <DidYouKnowSnippet sectionTitle="Modern Tech Stack (React, Next.js, Node.js)" />
        </motion.section>

        {/* 6. PROCESS */}
        <motion.section id="process" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ amount: 0.1, margin: "-100px" }} className="snap-start min-h-screen flex flex-col justify-center max-w-[1400px] mx-auto px-6 md:px-12 py-24 relative">
          <GlassReveal />
          <SectionPin sectionId="process" />
          <motion.h2 variants={itemVariants} className="text-5xl md:text-6xl font-display font-medium text-slate-900 mb-16 text-center">
            Proses Eksekusi.
          </motion.h2>
          <div className="grid md:grid-cols-4 gap-6 relative">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div 
                variants={itemVariants}
                key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden group"
              >
                <div className="text-6xl font-display font-bold text-slate-50 absolute -right-4 -bottom-4 pointer-events-none group-hover:text-purple-50 transition-colors duration-500">
                  0{i+1}
                </div>
                <div className="relative z-10">
                  <step.icon size={32} className="text-purple-800 mb-6" />
                  <h3 className="text-xl font-medium mb-3 text-slate-900">{step.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <DidYouKnowSnippet sectionTitle="Agile Execution Process for Web Projects" />
        </motion.section>

        {/* 7. METRICS / IMPACT */}
        <motion.section id="metrics" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ amount: 0.1, margin: "-100px" }} className="snap-start min-h-screen flex flex-col justify-center bg-slate-900 text-white max-w-[1400px] mx-auto px-6 md:px-12 py-24 rounded-[3rem] my-12 relative overflow-hidden">
          <GlassReveal dark />
          <SectionPin sectionId="metrics" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-purple-800/20 via-slate-900 to-slate-900 pointer-events-none" />
          <motion.div variants={itemVariants} className="text-center mb-16 relative z-10">
            <h2 className="text-4xl md:text-5xl font-display font-medium mb-6">Dampak Nyata</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Kami tidak hanya menulis kode, kami membangun metrik yang mendorong kesuksesan bisnis Anda.</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
            {METRICS.map((metric, i) => (
              <motion.div 
                variants={itemVariants}
                key={i} className="flex flex-col items-center text-center p-6 border border-white/10 bg-white/5 rounded-3xl backdrop-blur-sm"
              >
                <metric.icon size={28} className="text-purple-500 mb-4" />
                <div className="text-4xl md:text-5xl font-display font-bold text-white mb-2">{metric.value}</div>
                <div className="text-sm text-slate-400 uppercase tracking-widest font-medium">{metric.label}</div>
              </motion.div>
            ))}
          </div>
          <DidYouKnowSnippet dark sectionTitle="Business Metrics and Performance Analytics" />
        </motion.section>

        {/* 8. FAQ & CONTACT (Merged visually as bottom CTA) */}
        <motion.section id="faq" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ amount: 0.1, margin: "-100px" }} className="snap-start min-h-[50vh] flex flex-col justify-center max-w-3xl mx-auto px-6 md:px-12 py-24">
          <GlassReveal />
          <SectionPin sectionId="faq" />
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-display font-medium text-slate-900 mb-10 text-center">
            Pertanyaan Umum
          </motion.h2>
          <div className="w-full">
            {FAQS.map((faq, i) => (
              <motion.div variants={itemVariants} key={i}>
                <FAQItem faq={faq} isOpen={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? null : i)} />
              </motion.div>
            ))}
          </div>
          <DidYouKnowSnippet sectionTitle="Customer Support & Project Guarantees" />
        </motion.section>

        <motion.section id="contact" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ amount: 0.1, margin: "-100px" }} className="snap-start min-h-[50vh] flex flex-col justify-center items-center text-center p-12 bg-purple-800 text-white">
          <GlassReveal dark />
          <motion.div variants={itemVariants} className="max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-display font-medium mb-8">Ready to Build?</h2>
            <p className="text-xl text-purple-100 mb-12 font-light">Mari diskusikan visi digital Anda bersama tim ahli kami sekarang juga.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={copyEmail}
                className="group flex items-center gap-3 bg-white text-purple-800 px-8 py-4 rounded-full font-medium hover:bg-purple-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                <Mail size={20} />
                <span>hello@chestaadotcom.com</span>
                <Copy size={16} className="text-purple-500 group-hover:text-purple-800 transition-colors ml-2" />
              </button>
            </div>
          </motion.div>
        </motion.section>

      </div>
      <FloatingQuoteTrigger />
      <QuickActionBar />
    </HelmetProvider>
  );
}
