import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Sparkles, ArrowRight, CheckCircle2, Clock, Terminal, Loader2, GitMerge, MessageCircle } from 'lucide-react';
import SectionHeader from './SectionHeader';

interface Milestone {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'active' | 'completed';
  duration: string;
}

const DEFAULT_MILESTONES: Milestone[] = [
  { id: 'm1', title: '1. Konsultasi Kebutuhan via WhatsApp', description: 'Diskusi langsung dengan Chesta Azka (Principal Engineer) mengenai spesifikasi bisnis, arsitektur, dan referensi desain.', status: 'pending', duration: 'Tahap 1' },
  { id: 'm2', title: '2. Rekomendasi Solusi & Paket Transparan', description: 'Perumusan paket optimal (Mulai Rp650K / Promo UMKM Rp540K), penentuan domain .com, dan target waktu 1-3 hari.', status: 'pending', duration: 'Tahap 2' },
  { id: 'm3', title: '3. Rapid Build & Live Staging Review', description: 'Pengembangan arsitektur Next.js berkecepatan tinggi dengan tautan live staging dikirim langsung ke WhatsApp Anda.', status: 'pending', duration: 'Tahap 3' },
  { id: 'm4', title: '4. Peluncuran Resmi & Serah Terima Penuh', description: 'Aktivasi domain .com, sertifikat SSL HTTPS, optimasi SEO Google, serta transfer kepemilikan kode 100%.', status: 'pending', duration: 'Tahap 4' },
];

export default function WorkflowAutomation() {
  const [projectInput, setProjectInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [generated, setGenerated] = useState(false);
  const [highlightGlow, setHighlightGlow] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleAIGenerated = (e: Event) => {
      const customEvent = e as CustomEvent;
      const roadmap = customEvent.detail?.roadmap;
      if (roadmap && roadmap.length > 0) {
        const newMilestones: Milestone[] = roadmap.map((item: { phase: string, desc: string }, index: number) => {
          let status: 'pending' | 'active' | 'completed' = 'pending';
          if (index === 0) status = 'completed';
          if (index === 1) status = 'active';
          
          return {
            id: `rm_${index}`,
            title: item.phase,
            description: item.desc,
            status,
            duration: `Fase ${index + 1}`
          };
        });

        setMilestones(newMilestones);
        setGenerated(true);
        setHighlightGlow(true);
        
        if (sectionRef.current) {
          sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        setTimeout(() => setHighlightGlow(false), 3000);
      }
    };

    window.addEventListener('ai-roadmap-generated', handleAIGenerated);
    return () => window.removeEventListener('ai-roadmap-generated', handleAIGenerated);
  }, []);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectInput.trim()) return;
    
    setIsGenerating(true);
    setGenerated(false);
    setMilestones([]);

    setTimeout(() => {
      const customMilestones = [...DEFAULT_MILESTONES];
      customMilestones[0] = {
        ...customMilestones[0],
        description: `Menganalisis kebutuhan "${projectInput.substring(0, 40)}${projectInput.length > 40 ? '...' : ''}" dan merumuskan spesifikasi teknis arsitektur website.`,
        status: 'completed'
      };
      customMilestones[1] = { ...customMilestones[1], status: 'active' };
      
      setMilestones(customMilestones);
      setIsGenerating(false);
      setGenerated(true);
    }, 1500);
  };

  const sendRoadmapToWhatsApp = () => {
    const summaryText = milestones.length > 0 
      ? milestones.map((m, i) => `${i + 1}. ${m.title}: ${m.description}`).join('\n')
      : `Halo Mas Chesta, saya ingin konsultasi ide proyek: "${projectInput}"`;

    const fullMessage = `Halo Mas Chesta, saya sudah menyusun ide proyek di website:\n\n*Ide Proyek:*\n${projectInput || 'Konsultasi Website'}\n\n*Rencana Tahapan:*\n${summaryText}\n\nMohon rekomendasi paket dan estimasi waktunya. Terima kasih!`;
    
    const url = `https://wa.me/6282125447232?text=${encodeURIComponent(fullMessage)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const openFloatingAI = () => {
    window.dispatchEvent(new CustomEvent('open-floating-ai'));
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden w-full transition-all duration-1000 py-6">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-50/60 rounded-full blur-3xl pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-50/60 rounded-full blur-3xl pointer-events-none transform -translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeader 
          metaTag="SIMULATOR RENCANA PROYEK"
          title="Rancang Kebutuhan & Lanjut ke WhatsApp."
          description="Ketikkan gambaran website impian Anda di bawah. AI akan merumuskan tahapan pengerjaan, dan Anda dapat langsung mengirimkannya ke WhatsApp Mas Chesta untuk mulai konsultasi."
          align="center"
        />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
          
          {/* Left Column: AI Input Form */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-white border border-purple-100 rounded-3xl p-6 sm:p-8 shadow-xl shadow-purple-950/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5 text-purple-900">
                <Bot size={120} />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-slate-900">AI Project Architect</h3>
                    <p className="text-xs font-sans text-slate-500">Estimasi Alur Cepat & Praktis</p>
                  </div>
                </div>

                <form onSubmit={handleGenerate} className="space-y-4">
                  <div>
                    <label htmlFor="project" className="block text-sm font-medium text-slate-700 mb-2 font-sans">
                      Deskripsikan Visi Website Anda
                    </label>
                    <textarea
                      id="project"
                      rows={4}
                      value={projectInput}
                      onChange={(e) => setProjectInput(e.target.value)}
                      placeholder="Contoh: Saya butuh website company profile modern untuk kantor konsultan di BSD, lengkap dengan katalog layanan, tombol WhatsApp, dan integrasi Google Maps..."
                      className="w-full px-4 py-3 rounded-2xl border border-purple-100 bg-purple-50/30 focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-colors resize-none text-sm font-sans text-slate-800 placeholder:text-slate-400"
                      disabled={isGenerating}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isGenerating || !projectInput.trim()}
                    className="w-full flex items-center justify-center gap-2 bg-purple-900 hover:bg-purple-800 text-white px-6 py-3.5 rounded-2xl font-mono text-xs font-bold uppercase tracking-wider shadow-lg shadow-purple-950/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer group"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Menyusun Alur Proyek...
                      </>
                    ) : (
                      <>
                        <Terminal size={15} />
                        Simulasikan Alur Proyek
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-6 pt-5 border-t border-purple-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-sans">Ingin langsung tanya?</span>
                  <button
                    onClick={openFloatingAI}
                    className="text-xs font-mono font-bold text-purple-900 hover:text-purple-700 uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Bot size={13} />
                    Buka Assistant Web &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Roadmap Board */}
          <div className="lg:col-span-7 w-full">
            <div className={`bg-white border rounded-3xl p-6 sm:p-8 h-full min-h-[420px] transition-all duration-700 shadow-xl shadow-purple-950/5 ${
              highlightGlow ? "border-purple-300 shadow-[0_0_30px_rgba(107,33,168,0.15)]" : "border-purple-100"
            }`}>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-purple-100 flex-wrap gap-3">
                <h3 className="font-display font-bold text-xl text-slate-900 flex items-center gap-2">
                  <GitMerge className="text-purple-700" size={22} />
                  Peta Jalan & Alur Pengerjaan
                </h3>
                {generated && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-900 border border-purple-200 text-xs font-mono font-bold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse" />
                    Siap Lanjut WA
                  </span>
                )}
              </div>

              {!generated && !isGenerating ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-slate-500 py-12">
                  <div className="w-16 h-16 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center mb-4 text-purple-600 shadow-xs">
                    <Bot size={30} />
                  </div>
                  <p className="font-sans text-sm max-w-sm text-slate-600 mb-6 leading-relaxed">
                    Tuliskan visi website Anda di formulir sebelah kiri untuk melihat simulasi alur pengerjaan dan estimasi tahapan.
                  </p>
                  <button
                    onClick={() => {
                      setProjectInput("Website company profile profesional dengan domain .com dan tombol konsultasi WhatsApp.");
                      setMilestones(DEFAULT_MILESTONES);
                      setGenerated(true);
                    }}
                    className="text-xs font-mono font-bold text-purple-900 bg-purple-50 hover:bg-purple-100 px-4 py-2 rounded-xl border border-purple-200 uppercase tracking-wider transition-all cursor-pointer"
                  >
                    Gunakan Contoh Standar &rarr;
                  </button>
                </div>
              ) : isGenerating ? (
                <div className="space-y-6 py-6">
                  {[1, 2, 3].map((skeleton) => (
                    <div key={skeleton} className="flex gap-4 animate-pulse">
                      <div className="w-8 h-8 rounded-full bg-purple-100 shrink-0" />
                      <div className="space-y-3 flex-1 pt-1">
                        <div className="h-4 bg-purple-100 rounded w-1/3" />
                        <div className="h-3 bg-purple-50 rounded w-full" />
                        <div className="h-3 bg-purple-50 rounded w-5/6" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="relative">
                  {/* Vertical Tracking Line */}
                  <div className="absolute left-4 top-4 bottom-4 w-px bg-purple-100" />
                  
                  <div className="space-y-6 relative mb-8">
                    <AnimatePresence>
                      {milestones.map((milestone, index) => (
                        <motion.div
                          key={milestone.id}
                          initial={{ opacity: 0, x: -15 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.4 }}
                          className="flex gap-4 relative"
                        >
                          <div className="relative z-10 shrink-0">
                            {milestone.status === 'completed' ? (
                              <div className="w-8 h-8 rounded-full bg-purple-900 border-4 border-white flex items-center justify-center text-white shadow-sm">
                                <CheckCircle2 size={13} />
                              </div>
                            ) : milestone.status === 'active' ? (
                              <div className="w-8 h-8 rounded-full bg-purple-700 border-4 border-white flex items-center justify-center text-white shadow-sm">
                                <span className="w-2 h-2 rounded-full bg-white animate-ping absolute" />
                                <span className="w-2 h-2 rounded-full bg-white relative z-10" />
                              </div>
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-white border-4 border-purple-200 flex items-center justify-center text-purple-400 shadow-sm">
                                <span className="w-2 h-2 rounded-full bg-purple-300" />
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-1 bg-purple-50/30 border border-purple-100 rounded-2xl p-4 shadow-xs hover:border-purple-200 transition-colors">
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                              <h4 className="font-display font-bold text-slate-900 text-sm sm:text-base">{milestone.title}</h4>
                              <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-purple-900 bg-white border border-purple-200 px-2 py-0.5 rounded-full">
                                <Clock size={11} />
                                {milestone.duration}
                              </span>
                            </div>
                            <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed antialiased">
                              {milestone.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Direct WhatsApp Action Button */}
                  <div className="pt-4 border-t border-purple-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-slate-500 font-sans">
                      Lanjutkan diskusi alur ini langsung bersama Mas Chesta:
                    </p>
                    <button
                      onClick={sendRoadmapToWhatsApp}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-purple-900 hover:bg-purple-800 text-white rounded-full font-mono text-xs font-bold uppercase tracking-wider shadow-md shadow-purple-950/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <MessageCircle size={15} />
                      Kirim Blueprint ke WhatsApp
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
