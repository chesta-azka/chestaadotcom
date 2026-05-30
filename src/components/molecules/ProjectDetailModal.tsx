import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface ProjectDetailModalProps {
  project: { title: string; category: string; color: string };
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
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="fixed inset-x-0 bottom-0 top-[10vh] z-[101] mx-auto max-w-2xl overflow-y-auto rounded-t-3xl bg-[#0D111A] border border-white/10 p-8 md:rounded-3xl md:inset-x-4 md:bottom-[5vh]"
          >
            <button
              onClick={onClose}
              className="absolute right-6 top-6 rounded-full p-2 bg-white/5 hover:bg-white/10 transition-colors text-white"
            >
              <X size={20} />
            </button>
            <div className={`h-64 w-full rounded-2xl ${project.color} mb-8`} />
            <div className="mb-8">
                <p className="text-xs font-sans font-semibold text-[#D4FF00] tracking-widest uppercase mb-2">{project.category}</p>
                <h2 className="text-4xl font-display font-medium text-white tracking-tight">{project.title}</h2>
            </div>
            
            <div className="text-gray-400 mb-10 leading-relaxed font-sans">
              <p>Proyek inovatif ini dirancang dengan pendekatan arsitektur modern untuk memastikan performa tinggi dan pengalaman pengguna yang luar biasa.</p>
              <h4 className="font-semibold text-white mt-6 mb-2">Tech Stack</h4>
              <ul className="list-none space-y-1 text-sm font-mono text-[#D4FF00]">
                <li>01. Next.js</li>
                <li>02. Tailwind CSS</li>
                <li>03. Framer Motion</li>
              </ul>
            </div>
            <a 
              href="https://wa.me/6282125447232" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full py-4 text-center rounded-xl bg-[#D4FF00] text-[#0A0B10] font-semibold hover:bg-[#c2e600] transition-colors font-sans tracking-wide"
            >
              Chat Sekarang
            </a>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
