import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Cpu, ShieldCheck, Zap, LockKeyhole, ArrowRight, Activity, GitCommit, SearchCode } from 'lucide-react';
import MetaTags from '../components/atoms/MetaTags';
import SectionSeparator from '../components/atoms/SectionSeparator';

const phases = [
  {
    id: '01',
    title: 'AI Discovery & Audit',
    icon: <SearchCode className="w-8 h-8 text-blue-500" />,
    color: 'from-blue-500 to-cyan-400',
    description: 'Visitor interacts with our on-site AI to define bottlenecks and get instant price estimates via the Auto-Quotation system. No external apps needed.',
    features: ['Instant Bottleneck Analysis', 'Real-time Auto-Quotation', 'Zero-Friction Discovery']
  },
  {
    id: '02',
    title: 'Admin Provisioning',
    icon: <ShieldCheck className="w-8 h-8 text-indigo-500" />,
    color: 'from-indigo-500 to-purple-500',
    description: 'Once agreed, our Admin generates a VIP Workspace with 1-click. The client receives a secure URL and Passcode.',
    features: ['1-Click VIP Workspace', 'Secure URL Generation', 'Encrypted Passcode Access']
  },
  {
    id: '03',
    title: 'Live Engineering & Sync',
    icon: <Activity className="w-8 h-8 text-emerald-500" />,
    color: 'from-emerald-500 to-teal-400',
    description: 'Client tracks progress via the Live Kanban Board and communicates directly with our engineers via the In-App Comm-Link.',
    features: ['Live Kanban Tracking', 'In-App Comm-Link', 'Direct Engineer Access']
  },
  {
    id: '04',
    title: 'SLA & Handoff',
    icon: <LockKeyhole className="w-8 h-8 text-amber-500" />,
    color: 'from-amber-500 to-orange-400',
    description: 'Final delivery to the Client Vault, protected by our 99.9% Uptime Node Monitor.',
    features: ['Client Vault Delivery', '99.9% Uptime Node Monitor', 'Strict SLA Enforcement']
  }
];

export default function WorkflowPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white pt-32 pb-24 overflow-hidden selection:bg-indigo-500/30">
      <MetaTags 
        title="Absolute Walled Garden | CHESTAADOTCOM" 
        description="Discover our premium B2B SaaS workflow. From AI discovery to VIP workspace provisioning and secure handoff."
      />

      {/* Ambient Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden flex justify-center items-center -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-blue-500/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[60vw] h-[60vw] rounded-full bg-purple-500/5 blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-200/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 text-sm font-semibold tracking-wide uppercase mb-6 border border-slate-300/50 dark:border-slate-700/50 backdrop-blur-md">
              <LockKeyhole className="w-4 h-4" /> The Walled Garden
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-medium tracking-tight mb-8">
              Absolute <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">
                Precision & Security.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
              We operate exclusively within our secure Next.js + Firebase ecosystem. 
              No third-party messengers. No fragmented tools. A seamless, premium B2B pipeline from inception to deployment.
            </p>
          </motion.div>
        </div>

        {/* Timeline Section */}
        <div className="relative max-w-4xl mx-auto" ref={containerRef}>
          
          {/* Animated Line */}
          <div className="absolute left-[28px] md:left-1/2 top-4 bottom-4 w-px bg-slate-200 dark:bg-slate-800 -translate-x-1/2 hidden md:block">
            <motion.div 
              className="w-full bg-gradient-to-b from-blue-500 via-indigo-500 to-amber-500 origin-top"
              style={{ scaleY: lineHeight }}
            />
          </div>

          <div className="space-y-24 md:space-y-32">
            {phases.map((phase, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <motion.div 
                  key={phase.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative flex flex-col md:flex-row items-start gap-8 md:gap-16 \${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  
                  {/* Timeline Node (Mobile Only) */}
                  <div className="absolute left-7 top-10 w-px h-full bg-slate-200 dark:bg-slate-800 md:hidden" />

                  {/* Content Container */}
                  <div className={`flex-1 w-full \${isEven ? 'md:text-right' : 'md:text-left'}`}>
                    <h3 className="text-3xl md:text-4xl font-display font-medium text-slate-900 dark:text-white mb-4">
                      {phase.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg mb-8">
                      {phase.description}
                    </p>
                    <ul className={`flex flex-col gap-3 \${isEven ? 'md:items-end' : 'md:items-start'}`}>
                      {phase.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                          {isEven && <span className="hidden md:block">{feature}</span>}
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 shrink-0" />
                          <span className={isEven ? "md:hidden" : ""}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Center Node (Desktop) / Left Node (Mobile) */}
                  <div className="relative shrink-0 z-10 flex flex-col items-center pl-4 md:pl-0">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-white dark:bg-slate-950 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                      {phase.icon}
                    </div>
                    <div className="mt-4 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest border border-slate-200 dark:border-slate-800">
                      Phase {phase.id}
                    </div>
                  </div>

                  {/* Visual Card (Glassmorphism) */}
                  <div className="flex-1 w-full pl-12 md:pl-0">
                    <div className="relative group rounded-3xl overflow-hidden bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border border-white/60 dark:border-slate-700/50 shadow-2xl shadow-slate-200/50 dark:shadow-black/50 p-8 transition-all hover:shadow-3xl hover:border-white/80 dark:hover:border-slate-600">
                      <div className={`absolute inset-0 opacity-10 bg-gradient-to-br \${phase.color} transition-opacity group-hover:opacity-20`} />
                      <div className="relative z-10 flex flex-col items-center justify-center h-full min-h-[200px]">
                        {/* Abstract Representation */}
                        <motion.div 
                          className={`w-24 h-24 rounded-full bg-gradient-to-br \${phase.color} blur-2xl opacity-40`}
                          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center text-slate-800 dark:text-white/80">
                           {phase.icon}
                        </div>
                      </div>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>

        </div>

        {/* CTA */}
        <div className="mt-40 text-center">
           <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex flex-col items-center"
           >
             <h2 className="text-3xl font-display font-medium mb-6">Ready to enter the ecosystem?</h2>
             <button onClick={() => window.dispatchEvent(new CustomEvent('open-floating-ai'))} className="group relative px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-medium text-lg overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-xl shadow-slate-900/20 dark:shadow-white/10">
                <span className="relative z-10 flex items-center gap-2">
                  Initiate Audit <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
             </button>
           </motion.div>
        </div>

      </div>
    </main>
  );
}
