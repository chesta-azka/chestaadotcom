import { motion } from 'motion/react';
import { ReactNode } from 'react';
import { Cpu, Code2 } from 'lucide-react';

interface SectionGlassCardProps {
  children: ReactNode;
  metaLabel: string;
  className?: string;
  index?: number;
  serviceType?: 'ai' | 'software' | null;
  pattern?: 'dots' | 'mesh' | 'grid' | 'auto';
  fluid?: boolean;
}

export default function SectionGlassCard({ 
  children, 
  metaLabel, 
  className = '', 
  index = 0, 
  serviceType = null,
  pattern = 'auto',
  fluid = false
}: SectionGlassCardProps) {
  // Determine alternating pattern
  const resolvedPattern = pattern === 'auto' 
    ? (index % 2 === 0 ? 'dots' : 'mesh')
    : pattern;

  return (
    <div className={`w-full ${fluid ? 'px-2 sm:px-4 md:px-6' : 'max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 xl:px-10'}`}>
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-4%" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: Math.min(index * 0.05, 0.2) }}
        className={`@container relative w-full bg-white/90 backdrop-blur-2xl border border-slate-200/90 hover:border-purple-200/90 rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(15,23,42,0.05),0_1px_3px_rgba(0,0,0,0.02)] ring-1 ring-slate-900/5 p-4 sm:p-7 md:p-10 lg:p-12 transition-all duration-300 ${className}`}
      >
        {/* Alternating Background Textures for Rich Visual Flow */}
        {resolvedPattern === 'dots' && (
          <div className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none bg-[radial-gradient(#581c87_1.5px,transparent_1.5px)] bg-[size:24px_24px]" />
        )}

        {resolvedPattern === 'mesh' && (
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute -top-24 -right-24 w-80 sm:w-96 h-80 sm:h-96 bg-purple-500/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-80 sm:w-96 h-80 sm:h-96 bg-purple-500/5 rounded-full blur-3xl" />
            <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(to_right,#6366f115_1px,transparent_1px),linear-gradient(to_bottom,#6366f115_1px,transparent_1px)] bg-[size:32px_32px]" />
          </div>
        )}

        {/* Subtle Base White Gradient */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/95 via-white/90 to-slate-50/50 pointer-events-none" />

        {/* Top Section Metadata Tab Badge */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md border border-slate-200/80 border-t-0 px-4 sm:px-7 py-1 sm:py-1.5 rounded-b-2xl shadow-xs z-20 flex items-center justify-center gap-1.5 sm:gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse shrink-0" />
          <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-[0.2em] sm:tracking-[0.25em] text-slate-600 uppercase truncate max-w-[200px] sm:max-w-none">
            {metaLabel}
          </span>
        </div>

        {/* Service Type Tag (AI / Software) */}
        {serviceType && (
          <div className="absolute top-3.5 sm:top-5 right-4 sm:right-8 z-20 hidden sm:flex items-center gap-2 px-3 py-1 sm:py-1.5 rounded-full border border-purple-200/80 bg-purple-50/90 backdrop-blur-md shadow-2xs">
            {serviceType === 'ai' ? (
              <Cpu size={13} className="text-purple-600" />
            ) : (
              <Code2 size={13} className="text-slate-700" />
            )}
            <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-slate-700">
              {serviceType === 'ai' ? 'Kapabilitas AI' : 'Arsitektur Web'}
            </span>
          </div>
        )}

        {/* Inner Content with dynamic responsive flow */}
        <div className="relative z-10 w-full">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
