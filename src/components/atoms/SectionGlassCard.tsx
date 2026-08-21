import { motion } from 'motion/react';
import { ReactNode } from 'react';
import { Cpu, Code2 } from 'lucide-react';

interface SectionGlassCardProps {
  children: ReactNode;
  metaLabel: string;
  className?: string;
  index?: number;
  serviceType?: 'ai' | 'software' | null;
}

export default function SectionGlassCard({ children, metaLabel, className = '', index = 0, serviceType = null }: SectionGlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
      className={`relative border border-slate-200/60 rounded-[2.5rem] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.03)] p-8 sm:p-12 md:p-16 mb-24 mx-auto max-w-7xl ${className}`}
    >
      {/* Background Blur and Noise Texture Layer */}
      <div className="absolute inset-0 z-0 bg-white/60 backdrop-blur-xl" />
      <div className="absolute inset-0 z-0 opacity-[0.03] mix-blend-multiply pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md border border-slate-200/60 border-t-0 px-8 py-2 rounded-b-2xl shadow-sm z-20 flex items-center justify-center">
        <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-slate-500 uppercase">
          {metaLabel}
        </span>
      </div>

      {serviceType && (
        <div className="absolute top-6 right-8 sm:right-10 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200/60 bg-white/80 backdrop-blur-md shadow-sm">
          {serviceType === 'ai' ? (
            <Cpu size={14} className="text-indigo-600" />
          ) : (
            <Code2 size={14} className="text-slate-700" />
          )}
          <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-slate-700">
            {serviceType === 'ai' ? 'AI-Automated' : 'Software Dev'}
          </span>
        </div>
      )}

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
