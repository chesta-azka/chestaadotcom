import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, BookOpen, AlertCircle, CheckCircle2 } from 'lucide-react';
import { ProjectType } from './ProjectCard';

interface ProjectDetailModalProps {
  project: ProjectType;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, isOpen, onClose }: ProjectDetailModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-[#06080F]/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: 'spring', stiffness: 350, damping: 35 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.85 }}
            onDragEnd={(event, info) => {
              if (info.offset.y > 130 || info.velocity.y > 450) {
                onClose();
              }
            }}
            className="fixed inset-x-0 bottom-0 top-[10vh] z-[101] mx-auto max-w-2xl overflow-y-auto rounded-t-3xl bg-[#0D111A] border border-white/10 p-8 pt-12 md:p-8 md:rounded-3xl md:inset-x-4 md:bottom-[5vh] select-none cursor-grab active:cursor-grabbing touch-pan-y"
          >
            {/* Elegant Mobile Swipe/Drag Close Indicator */}
            <div className="absolute top-3 inset-x-0 flex flex-col items-center justify-center pointer-events-none md:hidden">
              <div className="w-12 h-1.5 bg-white/15 rounded-full mb-1" />
              <span className="text-[7px] font-mono text-gray-500 uppercase tracking-widest font-semibold">Swipe down to close</span>
            </div>

            <button
              onClick={onClose}
              className="absolute right-6 top-6 z-10 rounded-full p-2 bg-white/5 hover:bg-white/10 transition-colors text-white"
            >
              <X size={20} />
            </button>
            <img src={project.imageUrl} alt={project.title} className="h-64 w-full rounded-2xl object-cover mb-8" />
            
            <div className="mb-8">
              <div className="flex justify-between items-start mb-4">
                <p className="text-xs font-sans font-semibold text-[#D4FF00] tracking-widest uppercase">{project.category}</p>
                <div className="flex items-center gap-2 text-gray-500 font-mono text-xs">
                  <Calendar size={14} />
                  {project.duration}
                </div>
              </div>
              <h2 className="text-4xl font-display font-medium text-white tracking-tight mb-4">{project.title}</h2>
              {project.link && !project.link.includes('dytama') && (
                <a 
                  href={project.link}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#D4FF00] font-mono text-sm hover:underline"
                >
                  {project.link.replace(/^https?:\/\//, '')}
                </a>
              )}
            </div>
            
            <div className="space-y-8 text-gray-300 mb-10 leading-relaxed font-sans">
              <div>
                <h4 className="flex items-center gap-2 font-semibold text-white mb-3">
                  <BookOpen size={18} className="text-[#D4FF00]" /> Overview
                </h4>
                <p>{project.overview}</p>
              </div>

              {project.challenges && (
                <div>
                  <h4 className="flex items-center gap-2 font-semibold text-white mb-3">
                    <AlertCircle size={18} className="text-red-400" /> The Challenges
                  </h4>
                  <ul className="list-disc list-outside ml-4 space-y-1">
                    {project.challenges.map((c, i) => <li key={i}>{c}</li>)}
                  </ul>
                </div>
              )}

              {project.solutions && (
                <div>
                  <h4 className="flex items-center gap-2 font-semibold text-white mb-3">
                    <CheckCircle2 size={18} className="text-[#D4FF00]" /> The Solutions
                  </h4>
                  <ul className="list-disc list-outside ml-4 space-y-1">
                    {project.solutions.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
