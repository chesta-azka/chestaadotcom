import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Sparkles, ArrowRight, CheckCircle2, Clock, Terminal, ChevronRight, Loader2, GitMerge } from 'lucide-react';
import SectionHeader from './SectionHeader';

interface Milestone {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'active' | 'completed';
  duration: string;
}

const DEFAULT_MILESTONES: Milestone[] = [
  { id: 'm1', title: 'Discovery & Requirement Analysis', description: 'AI Agent kami akan membedah visi proyek Anda, mengidentifikasi arsitektur yang tepat, dan merumuskan SRS (Software Requirements Specification).', status: 'pending', duration: 'Week 1' },
  { id: 'm2', title: 'System Architecture Design', description: 'Perancangan topologi cloud, skema database, dan alur kerja (workflow) menggunakan prinsip Agentic AI.', status: 'pending', duration: 'Week 2' },
  { id: 'm3', title: 'Agile Development Sprints', description: 'Tim engineering dan AI mendevelop modul-modul inti secara iteratif dengan standar keamanan enterprise.', status: 'pending', duration: 'Week 3-6' },
  { id: 'm4', title: 'QA & Deployment', description: 'Pengujian terotomatisasi, optimasi performa, dan peluncuran produk ke production environment.', status: 'pending', duration: 'Week 7' },
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
        // Map the generated roadmap from the FloatingAIAssistant to the milestones here
        const newMilestones: Milestone[] = roadmap.map((item: { phase: string, desc: string }, index: number) => {
          let status: 'pending' | 'active' | 'completed' = 'pending';
          if (index === 0) status = 'completed';
          if (index === 1) status = 'active';
          
          return {
            id: `rm_${index}`,
            title: item.phase,
            description: item.desc,
            status,
            duration: `Phase ${index + 1}`
          };
        });

        setMilestones(newMilestones);
        setGenerated(true);
        setHighlightGlow(true);
        
        // Scroll to the section smoothly
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

    // Simulate AI generation process
    setTimeout(() => {
      // In a real app, this would be an API call to Gemini
      // For now, we simulate dynamic generation by updating the first milestone based on input
      const customMilestones = [...DEFAULT_MILESTONES];
      customMilestones[0] = {
        ...customMilestones[0],
        description: `Menganalisis kebutuhan untuk "${projectInput.substring(0, 30)}${projectInput.length > 30 ? '...' : ''}" dan merumuskan spesifikasi teknis.`,
        status: 'completed'
      };
      customMilestones[1] = { ...customMilestones[1], status: 'active' };
      
      setMilestones(customMilestones);
      setIsGenerating(false);
      setGenerated(true);
    }, 2500);
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden w-full transition-all duration-1000">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-3xl pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-50/50 rounded-full blur-3xl pointer-events-none transform -translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeader 
          metaTag="AI WORKFLOW"
          title="Interactive Peta Jalan Proyek"
          description="Konsultasikan ide proyek Anda secara instan. Agentic AI kami akan merumuskan blueprint dan milestone pengembangan (Roadmap) secara real-time."
          align="center"
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Column: AI Input Form */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xl shadow-indigo-900/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <Bot size={120} />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg text-slate-900">AI Project Architect</h3>
                    <p className="text-xs font-sans text-slate-500">Didukung oleh Gemini</p>
                  </div>
                </div>

                <form onSubmit={handleGenerate} className="space-y-4">
                  <div>
                    <label htmlFor="project" className="block text-sm font-medium text-slate-700 mb-2">
                      Deskripsikan Visi Proyek Anda
                    </label>
                    <textarea
                      id="project"
                      rows={4}
                      value={projectInput}
                      onChange={(e) => setProjectInput(e.target.value)}
                      placeholder="Contoh: Saya ingin membangun platform e-commerce B2B dengan fitur integrasi ERP dan sistem rekomendasi berbasis AI..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors resize-none text-sm font-sans"
                      disabled={isGenerating}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isGenerating || !projectInput.trim()}
                    className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-indigo-600 text-white px-6 py-4 rounded-xl font-mono text-xs font-bold uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Generating Roadmap...
                      </>
                    ) : (
                      <>
                        <Terminal size={16} />
                        Generate AI Workflow
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Roadmap Board */}
          <div className="lg:col-span-7 w-full">
            <div className={`bg-slate-50 border rounded-3xl p-6 sm:p-8 h-full min-h-[400px] transition-all duration-1000 ${
              highlightGlow ? "border-indigo-400 shadow-[0_0_30px_rgba(99,102,241,0.2)]" : "border-slate-200/60"
            }`}>
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
                <h3 className="font-display font-semibold text-xl text-slate-900 flex items-center gap-2">
                  <GitMerge className="text-indigo-600" size={24} />
                  Peta Jalan Proyek
                </h3>
                {generated && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live Generated
                  </span>
                )}
              </div>

              {!generated && !isGenerating ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-slate-500 py-12">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-4 text-slate-300">
                    <Bot size={32} />
                  </div>
                  <p className="font-sans text-sm max-w-sm">
                    Silakan deskripsikan proyek Anda di panel sebelah kiri, dan AI kami akan merancang workflow arsitektur sistem secara instan.
                  </p>
                </div>
              ) : isGenerating ? (
                <div className="space-y-6">
                  {[1, 2, 3].map((skeleton) => (
                    <div key={skeleton} className="flex gap-4 animate-pulse">
                      <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0" />
                      <div className="space-y-3 flex-1 pt-1">
                        <div className="h-4 bg-slate-200 rounded w-1/3" />
                        <div className="h-3 bg-slate-200 rounded w-full" />
                        <div className="h-3 bg-slate-200 rounded w-5/6" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="relative">
                  {/* Vertical Tracking Line */}
                  <div className="absolute left-4 top-4 bottom-4 w-px bg-slate-200" />
                  
                  <div className="space-y-8 relative">
                    <AnimatePresence>
                      {milestones.map((milestone, index) => (
                        <motion.div
                          key={milestone.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.15, duration: 0.5 }}
                          className="flex gap-6 relative"
                        >
                          <div className="relative z-10 shrink-0">
                            {milestone.status === 'completed' ? (
                              <div className="w-8 h-8 rounded-full bg-emerald-500 border-4 border-slate-50 flex items-center justify-center text-white shadow-sm">
                                <CheckCircle2 size={14} />
                              </div>
                            ) : milestone.status === 'active' ? (
                              <div className="w-8 h-8 rounded-full bg-indigo-600 border-4 border-slate-50 flex items-center justify-center text-white shadow-sm">
                                <span className="w-2 h-2 rounded-full bg-white animate-ping absolute" />
                                <span className="w-2 h-2 rounded-full bg-white relative z-10" />
                              </div>
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-white border-4 border-slate-200 flex items-center justify-center text-slate-400 shadow-sm">
                                <span className="w-2 h-2 rounded-full bg-slate-300" />
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-1 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                              <h4 className="font-display font-medium text-slate-900 text-base">{milestone.title}</h4>
                              <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-slate-500 bg-slate-50 px-2 py-1 rounded">
                                <Clock size={12} />
                                {milestone.duration}
                              </span>
                            </div>
                            <p className="font-sans text-sm text-slate-600 leading-relaxed">
                              {milestone.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
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
