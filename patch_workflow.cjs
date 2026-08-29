const fs = require('fs');

const code = `import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Cpu, ShieldCheck, Zap, LockKeyhole, ArrowRight, Activity, GitCommit, SearchCode, Sparkles } from 'lucide-react';
import MetaTags from '../components/atoms/MetaTags';
import SectionSeparator from '../components/atoms/SectionSeparator';

const phases = [
  {
    id: '01',
    title: 'AI Discovery & Audit',
    icon: <SearchCode className="w-8 h-8 text-blue-600 dark:text-blue-400" strokeWidth={1.5} />,
    color: 'from-blue-500 to-cyan-400',
    description: 'Visitor interacts with our on-site AI to define bottlenecks and get instant price estimates via the Auto-Quotation system. No external apps needed.',
    features: ['Instant Bottleneck Analysis', 'Real-time Auto-Quotation', 'Zero-Friction Discovery']
  },
  {
    id: '02',
    title: 'Admin Provisioning',
    icon: <ShieldCheck className="w-8 h-8 text-indigo-600 dark:text-indigo-400" strokeWidth={1.5} />,
    color: 'from-indigo-500 to-purple-500',
    description: 'Once agreed, our Admin generates a VIP Workspace with 1-click. The client receives a secure URL and Passcode.',
    features: ['1-Click VIP Workspace', 'Secure URL Generation', 'Encrypted Passcode Access']
  },
  {
    id: '03',
    title: 'Live Engineering & Sync',
    icon: <Activity className="w-8 h-8 text-emerald-600 dark:text-emerald-400" strokeWidth={1.5} />,
    color: 'from-emerald-500 to-teal-400',
    description: 'Client tracks progress via the Live Kanban Board and communicates directly with our engineers via the In-App Comm-Link.',
    features: ['Live Kanban Tracking', 'In-App Comm-Link', 'Direct Engineer Access']
  },
  {
    id: '04',
    title: 'SLA & Handoff',
    icon: <LockKeyhole className="w-8 h-8 text-amber-600 dark:text-amber-400" strokeWidth={1.5} />,
    color: 'from-amber-500 to-orange-400',
    description: 'Final delivery to the Client Vault, protected by our 99.9% Uptime Node Monitor.',
    features: ['Client Vault Delivery', '99.9% Uptime Node Monitor', 'Strict SLA Enforcement']
  }
];

export default function WorkflowPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });
  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[#FDFDFD] dark:bg-slate-950 text-slate-900 dark:text-white pt-[180px] md:pt-[240px] pb-32 overflow-hidden selection:bg-indigo-500/30">
      <MetaTags 
        title="Absolute Walled Garden | CHESTAADOTCOM" 
        description="Discover our premium B2B SaaS workflow. From AI discovery to VIP workspace provisioning and secure handoff."
      />

      {/* Enhanced Bright Ambient Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden flex justify-center items-center -z-10">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] rounded-full bg-blue-100/60 dark:bg-blue-900/20 blur-[120px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-10%] left-[-5%] w-[70vw] h-[70vw] rounded-full bg-purple-100/60 dark:bg-purple-900/20 blur-[150px]" 
        />
        <div className="absolute inset-0 bg-white/40 dark:bg-slate-950/40 backdrop-blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-bold tracking-widest uppercase mb-8 border border-slate-200/80 dark:border-slate-800 shadow-sm shadow-slate-200/50 dark:shadow-none"
            >
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" /> Premium Architecture
            </motion.span>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-semibold tracking-tighter mb-8 leading-[1.1] text-slate-900 dark:text-white">
              Absolute <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-900 dark:from-white dark:to-slate-500">
                Precision & Security.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-sans leading-relaxed max-w-2xl mx-auto">
              We operate exclusively within our secure Next.js + Firebase ecosystem. 
              No third-party messengers. No fragmented tools. A seamless, premium B2B pipeline from inception to deployment.
            </p>
          </motion.div>
        </div>

        {/* Timeline Section */}
        <div className="relative max-w-5xl mx-auto" ref={containerRef}>
          
          {/* Animated Glowing Line */}
          <div className="absolute left-[28px] md:left-1/2 top-4 bottom-4 w-px bg-slate-200 dark:bg-slate-800 -translate-x-1/2 hidden md:block rounded-full">
            <motion.div 
              className="w-full w-[3px] -ml-[1px] bg-gradient-to-b from-blue-500 via-purple-500 to-amber-500 origin-top rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"
              style={{ scaleY: lineHeight }}
            />
          </div>

          <div className="space-y-32 md:space-y-48">
            {phases.map((phase, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <motion.div 
                  key={phase.id}
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-150px" }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className={\`relative flex flex-col md:flex-row items-center gap-10 md:gap-16 \${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}\`}
                >
                  
                  {/* Timeline Node (Mobile Only) */}
                  <div className="absolute left-7 top-10 w-px h-full bg-slate-200 dark:bg-slate-800 md:hidden" />

                  {/* Content Container */}
                  <div className={\`flex-1 w-full \${isEven ? 'md:text-right' : 'md:text-left'}\`}>
                    <motion.div 
                      whileHover={{ x: isEven ? -10 : 10 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <h3 className="text-3xl md:text-5xl font-display font-semibold tracking-tight text-slate-900 dark:text-white mb-6">
                        {phase.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg mb-8 max-w-md ml-auto mr-auto md:ml-0 md:mr-0">
                        {phase.description}
                      </p>
                      <ul className={\`flex flex-col gap-4 \${isEven ? 'md:items-end' : 'md:items-start'}\`}>
                        {phase.features.map((feature, fIndex) => (
                          <motion.li 
                            key={fIndex} 
                            initial={{ opacity: 0, x: isEven ? 20 : -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + (fIndex * 0.1), duration: 0.5 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-3 text-sm font-semibold tracking-wide text-slate-700 dark:text-slate-300"
                          >
                            {isEven && <span className="hidden md:block">{feature}</span>}
                            <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700 shrink-0" />
                            <span className={isEven ? "md:hidden" : ""}>{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>

                  {/* Center Node (Desktop) / Left Node (Mobile) */}
                  <div className="relative shrink-0 z-10 flex flex-col items-center pl-4 md:pl-0">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-16 h-16 md:w-20 md:h-20 bg-white dark:bg-slate-900 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-black/50 border border-slate-100 dark:border-slate-800 flex items-center justify-center relative overflow-hidden group cursor-pointer"
                    >
                      <div className={\`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br \${phase.color} transition-opacity duration-300\`} />
                      {phase.icon}
                    </motion.div>
                    <div className="mt-6 px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest border border-slate-200/80 dark:border-slate-800 shadow-sm shadow-slate-200/50 dark:shadow-none">
                      Phase {phase.id}
                    </div>
                  </div>

                  {/* Visual Card (Glassmorphism + Apple Aesthetic) */}
                  <div className="flex-1 w-full pl-12 md:pl-0">
                    <motion.div 
                      whileHover={{ y: -10 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="relative group rounded-[2.5rem] overflow-hidden bg-white dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] dark:shadow-2xl dark:shadow-black/50 p-10 transition-all hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.1)] hover:border-slate-300/80 dark:hover:border-slate-700"
                    >
                      {/* Interactive Gradient Mesh */}
                      <div className={\`absolute inset-0 opacity-[0.03] dark:opacity-10 bg-gradient-to-br \${phase.color} transition-opacity duration-700 group-hover:opacity-[0.08] dark:group-hover:opacity-20\`} />
                      
                      <div className="relative z-10 flex flex-col items-center justify-center h-full min-h-[240px]">
                        {/* Animated Abstract Art */}
                        <motion.div 
                          className={\`w-32 h-32 rounded-full bg-gradient-to-br \${phase.color} blur-[40px] opacity-20 dark:opacity-40\`}
                          animate={{ 
                            scale: [1, 1.3, 1], 
                            opacity: [0.2, 0.4, 0.2],
                            rotate: [0, 90, 0]
                          }}
                          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center"> 
                           <div className="w-16 h-16 rounded-2xl bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border border-white dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none flex items-center justify-center transform group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                             {phase.icon}
                           </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-48 text-center pb-24">
           <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex flex-col items-center bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-[3rem] p-12 md:p-16 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] dark:shadow-2xl w-full max-w-4xl mx-auto relative overflow-hidden"
           >
             {/* Decorative Background inside CTA */}
             <div className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-10 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-100 via-transparent to-transparent" />
             
             <h2 className="text-4xl md:text-5xl font-display font-semibold mb-6 tracking-tight relative z-10 text-slate-900 dark:text-white">Ready to enter the ecosystem?</h2>
             <p className="text-slate-500 dark:text-slate-400 mb-10 text-lg max-w-lg relative z-10">Start your premium B2B journey with our intelligent onboarding flow.</p>
             
             <button onClick={() => window.dispatchEvent(new CustomEvent('open-floating-ai'))} className="group relative px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold tracking-wide text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.4)] dark:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.4)] z-10">
                <span className="relative z-10 flex items-center gap-3">
                  Initiate Audit <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
             </button>
           </motion.div>
        </div>
      </div>
    </main>
  );
}
\`

fs.writeFileSync('src/pages/WorkflowPage.tsx', code);
console.log('Patched WorkflowPage');
