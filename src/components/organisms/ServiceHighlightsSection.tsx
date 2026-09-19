import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  CloudCog, 
  Cpu, 
  SearchCode 
} from 'lucide-react';

const highlights = [
  {
    title: "Cybersecurity Auditing",
    description: "Vulnerability assessments and penetration testing to fortify your digital assets against modern attack vectors.",
    icon: ShieldCheck,
    color: "text-rose-500",
    bg: "bg-rose-100/50"
  },
  {
    title: "Cloud Architecture Consulting",
    description: "Scalable, resilient cloud infrastructure consulting tailored for AWS, Google Cloud, and high-availability systems.",
    icon: CloudCog,
    color: "text-blue-500",
    bg: "bg-blue-100/50"
  },
  {
    title: "AI & Machine Learning",
    description: "Integration of Agentic LLMs and automated workflows to radically enhance operational efficiency and data intelligence.",
    icon: Cpu,
    color: "text-purple-500",
    bg: "bg-purple-100/50"
  },
  {
    title: "Performance Audits",
    description: "Deep-dive codebase reviews and sub-second performance tuning for enterprise React and Next.js applications.",
    icon: SearchCode,
    color: "text-emerald-500",
    bg: "bg-emerald-100/50"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: [0.16, 1, 0.3, 1] as const 
    } 
  }
};

export default function ServiceHighlightsSection() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="text-center mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200/70 inline-block mb-3">
            Layanan Spesialis
          </span>
          <h2 className="text-2xl sm:text-4xl font-display font-black text-slate-900 tracking-tight">
            Specialized Engineering Highlights
          </h2>
          <p className="mt-3 text-slate-600 font-sans text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Meningkatkan daya saing enterprise melalui audit mendalam, arsitektur cloud terpercaya, dan eksekusi teknis berstandar global.
          </p>
        </motion.div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
      >
        {highlights.map((item, index) => (
          <motion.div 
            key={index}
            variants={cardVariants}
            whileHover={{ y: -4 }}
            className="group relative bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 hover:shadow-lg hover:shadow-purple-900/5 hover:border-purple-300 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <motion.div 
                className={`w-11 h-11 rounded-xl ${item.bg} flex items-center justify-center mb-5 transition-colors duration-300 border border-transparent group-hover:border-purple-200`}
                whileHover={{ scale: 1.12, rotate: [0, -4, 4, 0] }}
                transition={{ type: "spring", stiffness: 350, damping: 18 }}
              >
                <item.icon className={`w-5 h-5 ${item.color} transition-transform duration-300 group-hover:scale-105`} />
              </motion.div>
              <h3 className="text-base sm:text-lg font-bold font-display text-slate-900 mb-2.5 group-hover:text-purple-900 transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
                {item.description}
              </p>
            </div>
            <div className="pt-5 mt-4 border-t border-slate-100 flex items-center text-[11px] font-mono font-semibold text-slate-400 group-hover:text-purple-600 transition-colors">
              <span>AUDIT &amp; STRATEGI</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
