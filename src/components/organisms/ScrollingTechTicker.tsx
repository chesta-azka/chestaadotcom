import { motion } from 'motion/react';
import { Layout, Smartphone, Zap, Code, Database, Search } from 'lucide-react';

const techStack = [
  { name: 'React', icon: <Code size={16} /> },
  { name: 'Next.js', icon: <Layout size={16} /> },
  { name: 'Tailwind', icon: <Smartphone size={16} /> },
  { name: 'Framer Motion', icon: <Zap size={16} /> },
  { name: 'Node.js', icon: <Database size={16} /> },
  { name: 'SEO-Ready', icon: <Search size={16} /> },
];

export default function ScrollingTechTicker() {
  return (
    <div className="w-full relative z-10 overflow-hidden whitespace-nowrap bg-transparent py-6 border-b border-slate-100">
      <motion.div
        className="inline-block"
        animate={{ x: '-50%' }}
        transition={{ repeat: Infinity, ease: 'linear', duration: 40 }}
      >
        {[...techStack, ...techStack].map((item, i) => (
          <span key={i} className="mx-8 inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors font-sans text-sm font-medium tracking-tight">
            <span className="opacity-60">{item.icon}</span>
            {item.name}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
