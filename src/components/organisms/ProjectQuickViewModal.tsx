import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Cpu, Target, CheckCircle2 } from 'lucide-react';
import { ProjectType } from '../molecules/ProjectCard.tsx';

interface ProjectQuickViewModalProps {
  project: ProjectType | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectQuickViewModal({ project, isOpen, onClose }: ProjectQuickViewModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden pointer-events-auto border border-slate-200"
            >
              {/* Header Image/Background */}
              <div className="h-48 sm:h-64 relative overflow-hidden">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
                
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-md text-slate-900 hover:bg-white transition-colors shadow-lg cursor-pointer z-10"
                >
                  <X size={20} />
                </button>
                
                <div className="absolute bottom-6 left-8 right-8">
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 text-[10px] font-bold uppercase tracking-widest rounded-full border border-purple-200">
                    {project.category}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900 mt-2 line-clamp-2">
                    {project.title}
                  </h2>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-8 space-y-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
                {/* Tech Stack */}
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <Cpu size={18} className="text-purple-600" />
                    <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500">Tech Stack</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(project.techStack || []).map((tech) => (
                      <span 
                        key={tech} 
                        className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </section>

                {/* The Problem / Challenges */}
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <Target size={18} className="text-red-500" />
                    <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500">The Challenge</h3>
                  </div>
                  <div className="space-y-3 text-slate-600 text-sm leading-relaxed">
                    {project.challenges && project.challenges.length > 0 ? (
                      project.challenges.map((challenge, i) => (
                        <p key={i}>{challenge}</p>
                      ))
                    ) : (
                      <p>{project.overview}</p>
                    )}
                  </div>
                </section>

                {/* The Solution */}
                <section>
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 size={18} className="text-emerald-500" />
                    <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500">The Solution</h3>
                  </div>
                  <div className="space-y-3 text-slate-600 text-sm leading-relaxed">
                    {project.solutions && project.solutions.length > 0 ? (
                      project.solutions.map((sol, i) => (
                        <p key={i}>{sol}</p>
                      ))
                    ) : (
                      <p>Implementasi arsitektur web performa tinggi dengan fokus pada skalabilitas dan optimasi konversi bisnis.</p>
                    )}
                  </div>
                </section>
              </div>

              {/* Footer Actions */}
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-tighter">Impact Metric</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-display font-black text-slate-900">{project.metricValue}</span>
                    <span className="text-[10px] font-sans font-bold text-slate-500">{project.metricLabel}</span>
                  </div>
                </div>
                
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Close Preview
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
