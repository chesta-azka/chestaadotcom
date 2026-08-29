import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, PenTool, Code2, Rocket, CheckCircle2 } from 'lucide-react';

const ROADMAP_STEPS = [
  {
    id: 'consultation',
    title: '1. Strategic Consultation',
    icon: MessageSquare,
    description: 'Kami memulai kemitraan dengan menggali DNA bisnis Anda. Analisis mendalam untuk merumuskan roadmap arsitektur digital yang sejalan dengan target ekspansi pasar.',
    features: ['Audit Infrastruktur Digital', 'Pemetaan Kompetitor & Pasar', 'Rancangan Skalabilitas', 'Estimasi ROI & Timeline']
  },
  {
    id: 'design',
    title: '2. UI/UX & Identity Design',
    icon: PenTool,
    description: 'Bukan sekadar estetika, kami merancang antarmuka premium yang berpusat pada psikologi pengguna untuk memaksimalkan retensi dan konversi (Conversion Rate Optimization).',
    features: ['Wireframing Presisi', 'Prototyping Interaktif', 'Visual Identity System', 'Validasi Pengalaman Pengguna']
  },
  {
    id: 'development',
    title: '3. Premium AI-Driven Development',
    icon: Code2,
    description: 'Eksekusi rekayasa perangkat lunak modern. Kami mengintegrasikan kapabilitas Agentic AI untuk otomasi bisnis di dalam arsitektur web yang ringan, cepat, dan aman.',
    features: ['Arsitektur React/Node.js', 'Integrasi LLM & AI Agent', 'Optimasi Core Web Vitals', 'Sistem Keamanan Enterprise']
  },
  {
    id: 'deployment',
    title: '4. Deployment & Growth Partner',
    icon: Rocket,
    description: 'Fase peluncuran tanpa hambatan ke infrastruktur cloud global. Kemitraan berlanjut melalui pemeliharaan proaktif dan optimasi mesin pencari (SEO) berkelanjutan.',
    features: ['Cloud Server Provisioning', 'Quality Assurance (QA) Ketat', 'Serah Terima Aset Digital', 'Support & SEO Berkelanjutan']
  }
];

export default function EngagementRoadmap() {
  const [activeStep, setActiveStep] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isHovered) {
      timerRef.current = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % ROADMAP_STEPS.length);
      }, 5000);
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered]);

  return (
    <section id="roadmap" className="py-24 bg-white relative overflow-hidden border-t border-slate-100 min-h-screen flex items-center justify-center snap-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-50/50 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs font-mono font-bold tracking-widest text-purple-600 uppercase mb-4 shadow-sm">
            Service Delivery Lifecycle
          </div>
          <h2 className="text-fluid-h2 font-display font-medium text-slate-900 tracking-tight mb-4">
            Eksekusi Kemitraan Strategis
          </h2>
          <p className="text-slate-600 font-sans max-w-2xl mx-auto text-lg leading-relaxed font-light">
            Metodologi pengembangan end-to-end kami menjamin setiap fase berjalan transparan, 
            menghadirkan solusi digital yang tidak hanya indah secara visual, tetapi juga cerdas dan terukur.
          </p>
        </div>

        <div 
          className="flex flex-col lg:flex-row gap-12 lg:gap-20"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Steps Timeline Navigation */}
          <div className="lg:w-1/3 flex flex-col relative">
            <div className="absolute left-6 top-8 bottom-8 w-px bg-slate-200 hidden lg:block" />
            
            <div className="flex flex-row overflow-x-auto lg:flex-col gap-4 lg:gap-8 pb-4 lg:pb-0 hide-scrollbar snap-x snap-mandatory">
              {ROADMAP_STEPS.map((step, idx) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  className={`relative flex items-center gap-4 p-4 lg:p-0 rounded-2xl lg:rounded-none transition-all text-left min-w-[240px] lg:min-w-0 snap-center group ${
                    activeStep === idx 
                      ? 'bg-slate-50 shadow-sm lg:shadow-none lg:bg-transparent border lg:border-none border-slate-100' 
                      : 'hover:bg-slate-50 lg:hover:bg-transparent'
                  }`}
                >
                  <div className={`relative z-10 w-12 h-12 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                    activeStep === idx 
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/40 scale-110 ring-4 ring-purple-50' 
                      : idx < activeStep
                        ? 'bg-emerald-50 text-emerald-500 border border-emerald-200'
                        : 'bg-white text-slate-400 border border-slate-200 group-hover:border-purple-200 group-hover:text-purple-500'
                  }`}>
                    {activeStep === idx && (
                      <>
                        <motion.div 
                          layoutId="activeGlow" 
                          className="absolute inset-0 bg-purple-500 blur-xl opacity-40 rounded-xl"
                        />
                        <motion.div
                          className="absolute inset-0 rounded-xl border-2 border-purple-400"
                          animate={{ scale: [1, 1.25, 1], opacity: [0.8, 0, 0.8] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                      </>
                    )}
                    <AnimatePresence mode="wait">
                      {idx < activeStep ? (
                        <motion.div
                          key="completed"
                          initial={{ scale: 0, rotate: -45 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 45 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className="relative z-10"
                        >
                          <CheckCircle2 size={20} />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="incomplete"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="relative z-10 flex items-center justify-center"
                        >
                          <step.icon size={20} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div>
                    <h3 className={`font-display font-semibold transition-colors ${
                      activeStep === idx ? 'text-purple-600 text-lg' : 'text-slate-500 text-base group-hover:text-slate-900'
                    }`}>
                      {step.title}
                    </h3>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Active Step Content */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden min-h-[400px]">
              {/* Decorative subtle background icon */}
              <div className="absolute -right-12 -bottom-12 opacity-[0.02] text-purple-900 pointer-events-none transition-all duration-700">
                {React.createElement(ROADMAP_STEPS[activeStep].icon, { size: 300 })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="relative z-10 flex flex-col h-full justify-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 mb-8 border border-purple-100 shadow-sm relative group">
                    <div className="absolute inset-0 bg-purple-200 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity" />
                    {React.createElement(ROADMAP_STEPS[activeStep].icon, { size: 28, className: "relative z-10" })}
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-display font-medium text-slate-900 mb-4">
                    {ROADMAP_STEPS[activeStep].title}
                  </h3>
                  
                  <p className="text-slate-600 font-sans text-lg leading-relaxed mb-8 max-w-2xl font-light">
                    {ROADMAP_STEPS[activeStep].description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {ROADMAP_STEPS[activeStep].features.map((feature, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.1 }}
                        className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm"
                      >
                        <CheckCircle2 size={18} className="text-purple-500 shrink-0" />
                        <span className="font-sans text-slate-700 font-medium text-sm">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Progress Bar Indicator */}
              <div className="absolute bottom-0 left-0 h-1 bg-slate-100 w-full">
                <motion.div 
                  key={`progress-${activeStep}`}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5, ease: "linear" }}
                  className="h-full bg-purple-500"
                  style={{ opacity: isHovered ? 0 : 1 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
