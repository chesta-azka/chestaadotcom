import { motion } from 'motion/react';
import LazyImage from '../atoms/LazyImage.tsx';

export interface ProjectType {
  id?: string;
  title: string;
  category: string;
  color: string;
  metricLabel: string;
  metricValue: string;
  link: string;
  imageUrl: string;
  className?: string;
  duration?: string;
  overview?: string;
  challenges?: string[];
  solutions?: string[];
  techStack?: string[];
}

interface ProjectCardProps {
  key?: string | number;
  project: ProjectType;
  index: number;
  onClick: () => void;
  variants?: any;
}

export default function ProjectCard({ project, index, onClick, variants }: ProjectCardProps) {
  // Default tech stack if none provided
  const techStack = project.techStack || ['React', 'Tailwind', 'Vite'];
  
  return (
    <motion.div
      className={`group relative overflow-hidden rounded-2xl cursor-pointer border border-slate-200 ${project.className || 'min-h-[400px]'}`}
      variants={variants}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={onClick}
    >
      <div className={`absolute inset-0 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:-translate-y-2 group-hover:rotate-1 bg-slate-100`} />
      
      {/* Project Image */}
      <div className="absolute inset-0 w-full h-full">
        <LazyImage 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" 
        />
      </div>
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-95" />
      
      <div className="absolute inset-x-8 bottom-8 top-auto flex flex-col justify-end text-left z-10 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-6">
        <div>
          <p className="text-xs font-sans font-medium mb-2 text-purple-300 relative z-10 transition-colors duration-500">
            {project.category}
          </p>
          <h3 className="text-2xl md:text-3xl font-display font-semibold tracking-tight text-white m-0 relative z-10">
            {project.title}
          </h3>
        </div>
        
        {/* Hover Reveal Details (Tech stack + Metrics) */}
        <div className="mt-4 flex flex-col gap-4 opacity-0 h-0 group-hover:opacity-100 group-hover:h-auto transition-all duration-700 delay-100 overflow-hidden translate-y-4 group-hover:translate-y-0">
          <div className="flex flex-wrap gap-2">
            {techStack.map(tech => (
              <span key={tech} className="px-2.5 py-1 bg-white/10 backdrop-blur-md rounded-md text-[10px] font-mono font-medium text-white border border-white/20">
                {tech}
              </span>
            ))}
          </div>
          
          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 inline-flex flex-col items-start w-fit">
             <span className="text-xl font-mono text-purple-300 font-semibold leading-none mb-1">{project.metricValue}</span>
             <span className="text-[10px] font-sans font-normal text-gray-300">{project.metricLabel}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
