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
} as any;

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
} as any;

export default function ServiceHighlightsSection() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="text-center mb-12 sm:mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-2xl sm:text-4xl font-display font-black text-slate-900 tracking-tight"
        >
          Specialized Service Highlights
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-slate-600 font-sans max-w-2xl mx-auto"
        >
          Elevating your enterprise with cutting-edge technical expertise and specialized strategic consulting.
        </motion.p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {highlights.map((item, index) => (
          <motion.div 
            key={index}
            variants={cardVariants}
            whileHover={{ y: -5 }}
            className="group relative bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 hover:shadow-xl hover:shadow-purple-900/5 hover:border-purple-200 transition-all duration-300"
          >
            <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
              <item.icon className={`w-6 h-6 ${item.color}`} />
            </div>
            <h3 className="text-lg font-bold font-display text-slate-900 mb-3">{item.title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
