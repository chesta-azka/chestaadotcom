import { motion } from 'motion/react';

export interface ProjectType {
  title: string;
  category: string;
  color: string;
  metricLabel: string;
  metricValue: string;
  className?: string;
}

interface ProjectCardProps {
  project: ProjectType;
  index: number;
  onClick: () => void;
  variants?: any;
}

export default function ProjectCard({ project, index, onClick, variants }: ProjectCardProps) {
  return (
    <motion.div
      className={`group relative overflow-hidden rounded-2xl cursor-pointer border border-white/5 ${project.className || 'min-h-[400px]'}`}
      variants={variants}
      whileHover={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={onClick}
    >
      <div className={`absolute inset-0 transition-transform duration-700 ease-in-out group-hover:scale-105 ${project.color}`} />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#06080F]/90 via-[#06080F]/40 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
      
      <div className="absolute inset-x-8 bottom-8 top-auto flex flex-col sm:flex-row justify-between items-end sm:items-center gap-4 text-white z-10 transition-transform duration-500 group-hover:-translate-y-2">
        <div>
          <p className="text-[10px] font-sans font-semibold mb-2 tracking-widest text-[#D4FF00] uppercase relative z-10">
            {project.category}
          </p>
          <h3 className="text-2xl md:text-3xl font-display font-medium tracking-tight text-white m-0 relative z-10">
            {project.title}
          </h3>
        </div>
        
        <div className="bg-[#131825]/90 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 flex flex-col items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
           <span className="text-2xl font-mono text-[#D4FF00] font-medium leading-none mb-1">{project.metricValue}</span>
           <span className="text-[10px] font-sans font-semibold text-gray-400 uppercase tracking-widest">{project.metricLabel}</span>
        </div>
      </div>
    </motion.div>
  );
}
