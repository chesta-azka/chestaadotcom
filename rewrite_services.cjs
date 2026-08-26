const fs = require('fs');
const content = `
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'motion/react';
import { Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { SERVICE_DEFINITIONS } from '../data/ServiceDefinition';
import FloatingQuoteTrigger from '../components/organisms/FloatingQuoteTrigger';
import { 
  ArrowUpRight, CheckCircle2, ArrowRight, Code2, 
  Rocket, Cpu, Layers, ChevronDown, Star, MessageSquare,
  Copy, Mail, Sparkles, Send, ArrowDown
} from 'lucide-react';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';

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

function FAQItem({ faq, isOpen, onClick }: { faq: any, isOpen: boolean, onClick: () => void }) {
  return (
    <div className="border-b border-slate-200/50 py-4 glass-panel px-6 mb-4 rounded-2xl cursor-pointer" onClick={onClick}>
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
            <p className="pt-4 text-slate-600 leading-relaxed">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Custom hook for tracking active section
function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionIds.indexOf(entry.target.id);
            if (index !== -1) setActiveSection(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
}

export default function ServicesPage() {
  const featured = SERVICE_DEFINITIONS[0];
  const others = SERVICE_DEFINITIONS.slice(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionIds = ['hero', 'features', 'tech', 'compare', 'process', 'faq', 'cta', 'contact'];
  const activeSection = useActiveSection(sectionIds);
  const [filter, setFilter] = useState('All');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // Quick Request State
  const [requestText, setRequestText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Compare State
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'ArrowUp'].includes(e.key)) {
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

  // Celebratory micro-interaction at end
  useEffect(() => {
    if (activeSection === sectionIds.length - 1) {
      toast.success('Terima kasih telah menjelajahi layanan kami!', {
        icon: '🎉',
        position: 'bottom-center'
      });
    }
  }, [activeSection]);

  const copyEmail = () => {
    navigator.clipboard.writeText('hello@chestadotcom.com');
    toast.success('Email disalin ke clipboard!');
  };

  const handleQuickRequest = async () => {
    if (!requestText.trim()) return;
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      toast.success('Proposal scope berhasil dibuat (Simulasi)! Tim kami akan menghubungi Anda.');
      setRequestText('');
    }, 2000);
  };

  const toggleCompare = (slug: string) => {
    if (selectedForCompare.includes(slug)) {
      setSelectedForCompare(prev => prev.filter(s => s !== slug));
    } else {
      if (selectedForCompare.length < 2) {
        setSelectedForCompare(prev => [...prev, slug]);
      } else {
        toast('Hanya bisa membandingkan maksimal 2 layanan.', { icon: 'ℹ️' });
      }
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>{featured.title} | CHESTADOTCOM Services</title>
        <meta name="description" content={featured.description} />
      </Helmet>

      {/* Floating Menu */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
        {sectionIds.map((id, index) => (
          <button
            key={id}
            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
            className={\`w-3 h-3 rounded-full transition-all duration-300 \${activeSection === index ? 'bg-indigo-600 scale-125' : 'bg-slate-300 hover:bg-slate-400'}\`}
            title={id}
          />
        ))}
      </div>

      <div ref={containerRef} className="h-screen overflow-y-scroll snap-y snap-mandatory bg-slate-50 text-slate-900 scroll-smooth">
        
        {/* Section 1: Hero */}
        <section id="hero" className="snap-start relative min-h-screen flex flex-col justify-center items-center text-center max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-8xl font-display font-medium tracking-tighter leading-[0.9] mb-8 text-slate-900"
          >
            Digital <br /> Excellence.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-500 max-w-2xl font-light mb-12"
          >
            Comprehensive enterprise-grade capabilities. Use Arrow Keys to navigate.
          </motion.p>
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-12 text-slate-400"
          >
            <ArrowDown size={32} />
          </motion.div>
        </section>

        {/* Section 2: Features (with Quick Request and Compare) */}
        <section id="features" className="snap-start min-h-screen flex flex-col justify-center max-w-[1400px] mx-auto px-6 md:px-12 py-24">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-5xl font-display font-medium text-slate-900">Core Capabilities.</h2>
            <button 
              onClick={() => setCompareMode(!compareMode)}
              className={\`px-6 py-2 rounded-full font-medium transition-colors \${compareMode ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}\`}
            >
              {compareMode ? 'Batal Bandingkan' : 'Bandingkan Layanan'}
            </button>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-2 glass-panel p-12 rounded-[40px] relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <h3 className="text-4xl mb-4 font-display text-slate-900">{featured.title}</h3>
              <p className="text-slate-600 mb-8 text-lg">{featured.description}</p>
              
              {/* Quick Request Form AI */}
              <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-200/50 mb-8">
                <h4 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                  <Sparkles size={16} className="text-indigo-600" /> Auto-Generate Scope Proposal
                </h4>
                <div className="flex gap-3">
                  <input 
                    type="text" 
                    placeholder="Ceritakan ide aplikasi/website Anda..."
                    className="flex-1 bg-white/80 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 ring-indigo-500/20"
                    value={requestText}
                    onChange={(e) => setRequestText(e.target.value)}
                  />
                  <button 
                    onClick={handleQuickRequest}
                    disabled={isGenerating}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2"
                  >
                    {isGenerating ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><Cpu size={18} /></motion.div> : <Send size={18} />}
                    <span className="hidden sm:inline">{isGenerating ? 'Menganalisis...' : 'Kirim'}</span>
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <Link to={\`/layanan/\${featured.slug}\`} className="bg-slate-900 text-white px-8 py-4 rounded-full font-medium hover:bg-slate-800 transition-colors">Explore Detail</Link>
              </div>
            </motion.div>
            
            <div className="flex flex-col gap-4">
              {others.map((service, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  key={service.slug} 
                  className={\`glass-panel p-6 rounded-3xl relative group cursor-pointer transition-all duration-300 \${compareMode && selectedForCompare.includes(service.slug) ? 'ring-2 ring-indigo-500 bg-indigo-50/50' : 'hover:-translate-y-1'}\`}
                  onClick={() => compareMode ? toggleCompare(service.slug) : window.location.href = \`/layanan/\${service.slug}\`}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-slate-800">{service.title}</h4>
                    <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <ArrowUpRight size={16} />
                    </button>
                  </div>
                  {compareMode && (
                    <div className="mt-4 text-xs font-medium text-indigo-600">
                      {selectedForCompare.includes(service.slug) ? 'Dipilih' : 'Pilih untuk bandingkan'}
                    </div>
                  )}
                  {/* Tooltip */}
                  {!compareMode && (
                    <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-xl p-4 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-56 pointer-events-none border border-slate-100 z-20 hidden lg:block">
                      <p className="text-xs text-slate-600 leading-relaxed">{service.description.substring(0, 80)}...</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Comparison Table Popup */}
          <AnimatePresence>
            {compareMode && selectedForCompare.length === 2 && (
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl glass-panel p-8 rounded-3xl shadow-2xl border border-white/50"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-display font-medium">Perbandingan Layanan</h3>
                  <button onClick={() => {setCompareMode(false); setSelectedForCompare([]);}} className="text-slate-500 hover:text-slate-900">Tutup</button>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  {selectedForCompare.map(slug => {
                    const svc = SERVICE_DEFINITIONS.find(s => s.slug === slug);
                    return (
                      <div key={slug} className="space-y-4">
                        <h4 className="text-xl font-medium text-indigo-600">{svc?.title}</h4>
                        <p className="text-sm text-slate-600">{svc?.description}</p>
                        <ul className="space-y-2">
                          {svc?.benefits?.slice(0,3).map(b => (
                            <li key={b} className="text-sm flex items-start gap-2"><CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />{b}</li>
                          ))}
                        </ul>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Section 3: Tech Stack */}
        <section id="tech" className="snap-start min-h-screen flex flex-col justify-center items-center text-center p-12 relative overflow-hidden bg-slate-900 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-900 to-slate-900 pointer-events-none" />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="z-10 w-full max-w-4xl"
          >
            <h2 className="text-4xl md:text-5xl font-display font-medium mb-12">Teknologi yang Kami Gunakan</h2>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {['All', 'Frontend', 'Backend', 'AI'].map(cat => (
                <button 
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={\`px-6 py-2 rounded-full font-medium transition-all duration-300 \${filter === cat ? 'bg-indigo-500 text-white' : 'bg-white/5 text-slate-300 hover:bg-white/10'}\`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <motion.div layout className="flex flex-wrap justify-center gap-6">
              <AnimatePresence mode="popLayout">
                {TECH_STACK.filter(t => filter === 'All' || t.category === filter).map(tech => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    key={tech.name}
                    className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-2 transition-all w-32"
                  >
                    <tech.icon size={32} className="text-indigo-400" />
                    <span className="text-sm font-medium">{tech.name}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </section>

        {/* Section 4: Process Placeholder */}
        <section id="process" className="snap-start min-h-screen flex flex-col justify-center max-w-[1400px] mx-auto px-6 md:px-12 py-24">
          <h2 className="text-5xl font-display font-medium text-slate-900 mb-16">The Process.</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={i} 
                className="glass-panel p-8 rounded-3xl"
              >
                <step.icon size={32} className="text-indigo-600 mb-6" />
                <h3 className="text-xl font-medium mb-3">{step.title}</h3>
                <p className="text-slate-500">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 5: FAQ */}
        <section id="faq" className="snap-start min-h-screen flex flex-col justify-center max-w-3xl mx-auto px-6 md:px-12 py-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-medium text-slate-900 mb-12 text-center"
          >
            Pertanyaan Umum
          </motion.h2>
          <div className="w-full">
            {FAQS.map((faq, i) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={i}
              >
                <FAQItem 
                  faq={faq} 
                  isOpen={openFaq === i} 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)} 
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 6: CTA / Contact */}
        <section id="contact" className="snap-start min-h-screen flex flex-col justify-center items-center text-center p-12 bg-indigo-600 text-white relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-5xl md:text-7xl font-display font-medium mb-8">Ready to Build?</h2>
            <p className="text-xl text-indigo-100 mb-12 font-light">Mari diskusikan visi digital Anda bersama tim ahli kami.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={copyEmail}
                className="group flex items-center gap-3 bg-white text-indigo-600 px-8 py-4 rounded-full font-medium hover:bg-indigo-50 transition-colors shadow-xl"
              >
                <Mail size={20} />
                <span>hello@chestadotcom.com</span>
                <Copy size={16} className="text-indigo-400 group-hover:text-indigo-600 transition-colors ml-2" />
              </button>
            </div>
          </motion.div>
        </section>

        <FloatingQuoteTrigger />
      </div>
    </HelmetProvider>
  );
}
`
fs.writeFileSync('src/pages/ServicesPage.tsx', content);
