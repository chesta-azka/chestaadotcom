const fs = require('fs');

const code = `import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'motion/react';
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
  Eye, Zap, Shield, Globe, Award, Target, Users
} from 'lucide-react';

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

function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      let currentIdx = 0;
      
      for (let i = 0; i < sectionIds.length; i++) {
        const element = document.getElementById(sectionIds[i]);
        if (element && element.offsetTop <= scrollPosition) {
          currentIdx = i;
        }
      }
      setActiveSection(currentIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds]);

  return activeSection;
}

export default function ServicesPage() {
  const featured = SERVICE_DEFINITIONS[0];
  const others = SERVICE_DEFINITIONS.slice(1);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Exactly 8 sections
  const sectionIds = ['hero', 'philosophy', 'services', 'ai-scope', 'tech', 'process', 'metrics', 'faq', 'contact'];
  const activeSection = useActiveSection(sectionIds);
  
  const [filter, setFilter] = useState('All');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // Quick Request State
  const [requestText, setRequestText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Compare State
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  
  // Quick View State
  const [quickViewData, setQuickViewData] = useState<QuickViewData | null>(null);

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
    navigator.clipboard.writeText('hello@chestadotcom.com');
    toast.success('Email disalin ke clipboard!');
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Layanan & Solusi Digital | CHESTADOTCOM</title>
        <meta name="description" content="Eksplorasi katalog layanan digital komprehensif kami, mulai dari pengembangan web hingga solusi AI khusus." />
      </Helmet>
      
      <QuickViewModal isOpen={!!quickViewData} onClose={() => setQuickViewData(null)} data={quickViewData} />

      {/* Floating Jump Menu */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3 mix-blend-difference">
        {sectionIds.map((id, idx) => (
          <button
            key={id}
            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative flex items-center justify-end"
          >
            <span className={\`absolute right-8 text-[10px] font-mono tracking-widest uppercase transition-all duration-300 \${activeSection === idx ? 'opacity-100 text-white' : 'opacity-0 text-slate-400 group-hover:opacity-100'}\`}>
              {id}
            </span>
            <div className={\`w-2 h-2 rounded-full transition-all duration-300 \${activeSection === idx ? 'bg-white scale-150' : 'bg-slate-600 group-hover:bg-slate-400'}\`} />
          </button>
        ))}
      </div>

      <div ref={containerRef} className="h-screen w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory bg-[#fbfbfd]">
        
        {/* 1. HERO SECTION */}
        <section id="hero" className="snap-start relative min-h-screen flex flex-col justify-center items-center text-center px-6 md:px-12 overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/30 blur-[120px] rounded-full pointer-events-none" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: "easeOut" }}>
              <span className="px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-mono font-medium tracking-widest uppercase mb-8 inline-block backdrop-blur-md">
                Layanan Digital Premium
              </span>
              <h1 className="text-6xl md:text-8xl font-display font-medium tracking-tight mb-8 leading-tight">
                Arsitektur Digital <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 italic font-serif pr-4">Masa Depan.</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
                Dari pengembangan web berkinerja tinggi hingga integrasi kecerdasan buatan, kami merancang ekosistem digital yang mendorong pertumbuhan eksponensial.
              </p>
            </motion.div>
          </div>
          <motion.button 
            animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            onClick={() => document.getElementById('philosophy')?.scrollIntoView({ behavior: 'smooth' })}
            className="absolute bottom-12 text-white/50 hover:text-white transition-colors flex flex-col items-center gap-2 cursor-pointer"
          >
            <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
            <ArrowDown size={24} />
          </motion.button>
        </section>

        {/* 2. PHILOSOPHY SECTION */}
        <section id="philosophy" className="snap-start min-h-screen flex flex-col justify-center max-w-[1400px] mx-auto px-6 md:px-12 py-24 relative bg-[#fbfbfd]">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
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
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                key={i} className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/40 border border-slate-100 hover:-translate-y-2 transition-transform duration-500"
              >
                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 text-indigo-600">
                  <phil.icon size={28} />
                </div>
                <h3 className="text-2xl font-medium text-slate-900 mb-4">{phil.title}</h3>
                <p className="text-slate-600 leading-relaxed">{phil.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 3. SERVICES CATALOG */}
        <section id="services" className="snap-start min-h-screen flex flex-col justify-center max-w-[1400px] mx-auto px-6 md:px-12 py-24 relative">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-medium text-slate-900 mb-4">Katalog Layanan</h2>
              <p className="text-slate-500 max-w-xl">Solusi end-to-end yang dirancang khusus untuk memecahkan tantangan bisnis modern.</p>
            </div>
            <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-full border border-slate-200 shadow-sm">
              <span className="text-sm font-medium text-slate-600">Mode Bandingkan</span>
              <button 
                onClick={() => { setCompareMode(!compareMode); setSelectedForCompare([]); }}
                className={\`w-12 h-6 rounded-full transition-colors relative \${compareMode ? 'bg-indigo-600' : 'bg-slate-200'}\`}
              >
                <motion.div className="w-4 h-4 bg-white rounded-full absolute top-1 shadow-sm" animate={{ left: compareMode ? '26px' : '6px' }} />
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {SERVICE_DEFINITIONS.map((service, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                key={service.slug} 
                className={\`bg-white p-8 rounded-3xl border transition-all duration-300 relative group \${compareMode && selectedForCompare.includes(service.slug) ? 'border-indigo-500 ring-2 ring-indigo-500/20 shadow-xl' : 'border-slate-200 hover:border-indigo-300 hover:shadow-2xl shadow-sm'}\`}
                onClick={() => compareMode ? toggleCompare(service.slug) : window.location.href = \`/layanan/\${service.slug}\`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      {service.icon ? <service.icon size={24} /> : <Code2 size={24} />}
                    </div>
                    <div>
                      <h4 className="text-xl font-medium text-slate-900">{service.title}</h4>
                      <div className="text-xs font-mono text-slate-500 mt-1 uppercase tracking-wider">{service.techStack.slice(0,2).join(' • ')}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewData({ id: service.slug, type: 'service', title: service.title, description: service.description, tags: service.techStack, link: \`/layanan/\${service.slug}\` });
                      }}
                      className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors tooltip-trigger"
                      title="Quick View"
                    >
                      <Eye size={18} />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <ArrowUpRight size={18} />
                    </button>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm mb-6 line-clamp-2">{service.description}</p>
                {compareMode && (
                  <div className="mt-4 text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 inline-block px-3 py-1.5 rounded-full">
                    {selectedForCompare.includes(service.slug) ? 'Terpilih' : 'Pilih untuk Bandingkan'}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {compareMode && selectedForCompare.length === 2 && (
              <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl bg-slate-900 text-white p-8 rounded-3xl shadow-2xl border border-white/10">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-display font-medium">Perbandingan Analitis</h3>
                  <button onClick={() => {setCompareMode(false); setSelectedForCompare([]);}} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors">Tutup</button>
                </div>
                <div className="grid grid-cols-2 gap-12">
                  {selectedForCompare.map(slug => {
                    const svc = SERVICE_DEFINITIONS.find(s => s.slug === slug);
                    return (
                      <div key={slug} className="space-y-4">
                        <h4 className="text-xl font-medium text-indigo-400">{svc?.title}</h4>
                        <ul className="space-y-3 mt-4">
                          {svc?.benefits?.slice(0,4).map(b => (
                            <li key={b} className="text-sm flex items-start gap-3"><CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" /> <span className="text-slate-300">{b}</span></li>
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

        {/* 4. AI SCOPE (QUICK REQUEST) */}
        <section id="ai-scope" className="snap-start min-h-screen flex flex-col justify-center max-w-[1400px] mx-auto px-6 md:px-12 py-24 relative">
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl border border-indigo-500/20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white border border-white/20 text-sm font-medium mb-8 backdrop-blur-md">
                <Sparkles size={16} className="text-indigo-400" />
                AI-Powered Scoping
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-medium text-white mb-6">Ceritakan Kebutuhan Anda</h2>
              <p className="text-indigo-200 mb-10 text-lg">AI kami akan menganalisis request Anda dan secara instan merekomendasikan tumpukan teknologi, estimasi waktu, dan solusi layanan yang tepat.</p>
              
              <div className="bg-white p-2 rounded-2xl md:rounded-full shadow-2xl flex flex-col md:flex-row items-center gap-2 focus-within:ring-4 focus-within:ring-indigo-500/30 transition-all">
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
                  className="w-full md:w-auto flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl md:rounded-full font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 shrink-0"
                >
                  {isGenerating ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send size={18} /> Analisis Sekarang</>}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 5. TECH STACK */}
        <section id="tech" className="snap-start min-h-screen flex flex-col justify-center max-w-[1400px] mx-auto px-6 md:px-12 py-24 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-medium text-slate-900 mb-6">Persenjataan Teknologi</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {['All', 'Frontend', 'Backend', 'AI'].map(cat => (
                <button 
                  key={cat} onClick={() => setFilter(cat)}
                  className={\`px-6 py-2.5 rounded-full font-medium transition-all duration-300 text-sm \${filter === cat ? 'bg-slate-900 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-400 hover:text-slate-900'}\`}
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
                  <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <tech.icon size={32} />
                  </div>
                  <span className="text-sm font-bold text-slate-800">{tech.name}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* 6. PROCESS */}
        <section id="process" className="snap-start min-h-screen flex flex-col justify-center max-w-[1400px] mx-auto px-6 md:px-12 py-24 relative">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-5xl md:text-6xl font-display font-medium text-slate-900 mb-16 text-center">
            Proses Eksekusi.
          </motion.h2>
          <div className="grid md:grid-cols-4 gap-6 relative">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden group"
              >
                <div className="text-6xl font-display font-bold text-slate-50 absolute -right-4 -bottom-4 pointer-events-none group-hover:text-indigo-50 transition-colors duration-500">
                  0{i+1}
                </div>
                <div className="relative z-10">
                  <step.icon size={32} className="text-indigo-600 mb-6" />
                  <h3 className="text-xl font-medium mb-3 text-slate-900">{step.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 7. METRICS / IMPACT */}
        <section id="metrics" className="snap-start min-h-screen flex flex-col justify-center bg-slate-900 text-white max-w-[1400px] mx-auto px-6 md:px-12 py-24 rounded-[3rem] my-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-indigo-600/20 via-slate-900 to-slate-900 pointer-events-none" />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16 relative z-10">
            <h2 className="text-4xl md:text-5xl font-display font-medium mb-6">Dampak Nyata</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Kami tidak hanya menulis kode, kami membangun metrik yang mendorong kesuksesan bisnis Anda.</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
            {METRICS.map((metric, i) => (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                key={i} className="flex flex-col items-center text-center p-6 border border-white/10 bg-white/5 rounded-3xl backdrop-blur-sm"
              >
                <metric.icon size={28} className="text-indigo-400 mb-4" />
                <div className="text-4xl md:text-5xl font-display font-bold text-white mb-2">{metric.value}</div>
                <div className="text-sm text-slate-400 uppercase tracking-widest font-medium">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 8. FAQ & CONTACT (Merged visually as bottom CTA) */}
        <section id="faq" className="snap-start min-h-[50vh] flex flex-col justify-center max-w-3xl mx-auto px-6 md:px-12 py-24">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-display font-medium text-slate-900 mb-10 text-center">
            Pertanyaan Umum
          </motion.h2>
          <div className="w-full">
            {FAQS.map((faq, i) => (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} key={i}>
                <FAQItem faq={faq} isOpen={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? null : i)} />
              </motion.div>
            ))}
          </div>
        </section>

        <section id="contact" className="snap-start min-h-[50vh] flex flex-col justify-center items-center text-center p-12 bg-indigo-600 text-white">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-display font-medium mb-8">Ready to Build?</h2>
            <p className="text-xl text-indigo-100 mb-12 font-light">Mari diskusikan visi digital Anda bersama tim ahli kami sekarang juga.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={copyEmail}
                className="group flex items-center gap-3 bg-white text-indigo-600 px-8 py-4 rounded-full font-medium hover:bg-indigo-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                <Mail size={20} />
                <span>hello@chestadotcom.com</span>
                <Copy size={16} className="text-indigo-400 group-hover:text-indigo-600 transition-colors ml-2" />
              </button>
            </div>
          </motion.div>
        </section>

      </div>
      <FloatingQuoteTrigger />
    </HelmetProvider>
  );
}
`;
fs.writeFileSync('src/pages/ServicesPage.tsx', code);
