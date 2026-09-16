import { motion } from 'motion/react';
import { 
  Cloud, 
  Database, 
  Layout, 
  Terminal, 
  Cpu, 
  Globe, 
  Zap, 
  Boxes,
  Triangle,
  Hexagon
} from 'lucide-react';

const techStack = [
  { name: 'Next.js 15', icon: <Triangle size={18} className="fill-slate-800" /> },
  { name: 'React Server Components', icon: <Boxes size={18} /> },
  { name: 'TypeScript', icon: <Terminal size={18} /> },
  { name: 'Tailwind CSS v4', icon: <Layout size={18} /> },
  { name: 'Firebase', icon: <Zap size={18} className="fill-amber-400 text-amber-500" /> },
  { name: 'Google Cloud Platform', icon: <Cloud size={18} className="text-blue-500" /> },
  { name: 'Vercel', icon: <Triangle size={18} className="rotate-180 fill-slate-900" /> },
  { name: 'PostgreSQL / Cloud SQL', icon: <Database size={18} className="text-blue-600" /> },
  { name: 'Gemini AI', icon: <Hexagon size={18} className="text-purple-500" /> },
  { name: 'Edge Networking', icon: <Globe size={18} /> },
];

export default function ScrollingTechTicker() {
  return (
    <div className="w-full relative z-10 overflow-hidden whitespace-nowrap bg-slate-50 py-5 border-y border-slate-200 shadow-inner">
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
      <motion.div
        className="inline-block"
        animate={{ x: '-50%' }}
        transition={{ repeat: Infinity, ease: 'linear', duration: 40 }}
      >
        {[...techStack, ...techStack, ...techStack].map((item, i) => (
          <span 
            key={i} 
            className="mx-8 md:mx-12 inline-flex items-center gap-2.5 text-slate-500 hover:text-slate-900 transition-colors font-mono text-sm font-semibold tracking-tight uppercase"
          >
            <span className="opacity-80">{item.icon}</span>
            {item.name}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
