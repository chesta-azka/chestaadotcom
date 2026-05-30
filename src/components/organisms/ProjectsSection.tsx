import { useState } from 'react';
import { motion } from 'motion/react';
import ProjectCard, { ProjectType } from '../molecules/ProjectCard.tsx';
import ProjectDetailModal from '../molecules/ProjectDetailModal.tsx';
import TextRevealSmooth from '../atoms/TextRevealSmooth';

const projects: ProjectType[] = [
  { 
    title: 'Kopi Kenangan Skala UMKM', 
    category: 'F&B E-Commerce', 
    color: 'bg-[#1a1c29]',
    metricValue: '0.8s',
    metricLabel: 'Load Speed',
    className: 'md:col-span-2 aspect-[16/9] md:aspect-[21/9]'
  },
  { 
    title: 'Studio Arsitek Lokal', 
    category: 'Corporate Profile', 
    color: 'bg-[#141521]',
    metricValue: '+60%',
    metricLabel: 'Trust Score',
    className: 'md:col-span-1 aspect-square md:aspect-auto min-h-[400px]'
  },
  { 
    title: 'Brand Kaos Distro', 
    category: 'E-Commerce', 
    color: 'bg-[#181926]',
    metricValue: '+45%',
    metricLabel: 'Conversion',
    className: 'md:col-span-1 aspect-square md:aspect-auto min-h-[400px]'
  },
  { 
    title: 'Klinik Gigi Premium', 
    category: 'Booking System', 
    color: 'bg-[#13131c]',
    metricValue: '99%',
    metricLabel: 'Uptime',
    className: 'md:col-span-2 aspect-[16/9] md:aspect-[21/9]'
  },
];

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<null | typeof projects[0]>(null);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15 } 
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 70, 
      scale: 0.96,
      filter: 'blur(8px) grayscale(10%)' 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      filter: 'blur(0px) grayscale(0%)',
      transition: { 
        type: 'spring', 
        stiffness: 85, 
        damping: 18, 
        mass: 0.9 
      }
    }
  };
  return (
    <section id="work" className="py-16 md:py-24 relative overflow-hidden bg-transparent">
      <div className="mx-auto max-w-7xl px-6 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24"
        >
          <div>
            <span className="text-[#D4FF00] font-sans font-medium text-sm uppercase tracking-widest block mb-6">
              02 — Proof of Capability
            </span>
            <div className="text-6xl md:text-[6.5rem] font-display font-medium tracking-tight text-white leading-[1.0] mb-2 flex flex-wrap">
              <TextRevealSmooth 
                text="Selected Work." 
                highlightWords={["Work."]}
                highlightClass="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 font-serif italic pr-4"
              />
            </div>
          </div>
          <p className="max-w-sm text-gray-400 font-sans pb-4 text-lg leading-relaxed">
            Bukti nyata performa premium untuk berbagai industri lokal. Desain yang berbicara, data yang membuktikan.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project, i) => (
            <ProjectCard 
              key={project.title} 
              project={project} 
              index={i} 
              onClick={() => setSelectedProject(project)}
              variants={cardVariants}
            />
          ))}
        </motion.div>
      </div>
      {selectedProject && (
        <ProjectDetailModal 
          project={selectedProject as any} 
          isOpen={!!selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  );
}
