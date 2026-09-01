import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import ProjectCard, { ProjectType } from '../molecules/ProjectCard.tsx';
import TextRevealSmooth from '../atoms/TextRevealSmooth';
import { PROJECTS } from '../../data/projects.ts';

const ProjectSkeleton = () => (
  <div className="relative overflow-hidden rounded-2xl border border-[#6b21a8]/5 min-h-[440px] bg-slate-50 animate-pulse flex flex-col justify-end p-8">
    <div className="absolute inset-0 bg-gradient-to-t from-[#06080F]/95 via-[#06080F]/30 to-transparent opacity-80" />
    <div className="absolute inset-x-8 bottom-8 flex flex-col sm:flex-row justify-between items-end sm:items-center gap-4 z-10 w-[calc(100%-4rem)]">
      <div className="space-y-3 w-full sm:w-2/3 text-left">
        {/* Category placeholder */}
        <div className="h-3 w-20 bg-slate-200 rounded" />
        {/* Title placeholder */}
        <div className="h-6 w-3/4 bg-white/20 rounded" />
      </div>
      
      {/* Metric Badge placeholder */}
      <div className="px-4 py-2 rounded-xl bg-[#6b21a8]/5 border border-slate-200 w-24 h-12 flex flex-col justify-center items-end gap-1.5 shrink-0" />
    </div>
  </div>
);

const projects: ProjectType[] = PROJECTS.map((p, index) => {
  let metricValue = '99%';
  let metricLabel = 'Performance';
  if (p.id === 'seino-indomobil') {
    metricValue = '0.8s';
    metricLabel = 'Load Time';
  } else if (p.id === 'delta-legal') {
    metricValue = '+85%';
    metricLabel = 'Trust Score';
  } else if (p.id === 'griya-cisauk') {
    metricValue = '+40%';
    metricLabel = 'Conversion';
  } else if (p.id === 'pt-prime-well-wireline') {
    metricValue = '100%';
    metricLabel = 'HSE Audit';
  } else if (p.id === 'fortanara-cybersecurity') {
    metricValue = 'Tier-4';
    metricLabel = 'Security';
  } else if (p.id === 'rental-mobil-modern') {
    metricValue = '+60%';
    metricLabel = 'Rent Orders';
  } else if (p.id === 'y-not-tech') {
    metricValue = '0s';
    metricLabel = 'IoT Latency';
  } else if (p.id === 'broka-realestate') {
    metricValue = '4K';
    metricLabel = 'Aerial Drone';
  }

  return {
    id: p.id,
    title: p.title,
    category: p.category,
    color: index % 2 === 0 ? 'bg-[#1a1c29]' : 'bg-[#141521]',
    metricValue,
    metricLabel,
    link: p.liveLink,
    imageUrl: p.thumbnail,
    className: 'aspect-square md:aspect-[4/3]',
    duration: p.duration,
    overview: p.overview || p.description,
    challenges: p.challenges ? [p.challenges] : [],
    solutions: p.solution ? [p.solution] : []
  };
});

export default function ProjectsSection() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  
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
    <section id="work" className="py-24 md:py-32 relative overflow-hidden bg-transparent">
      <div className="mx-auto max-w-7xl px-6 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24"
        >
          <div>
            <div className="text-5xl md:text-[6.5rem] font-display font-medium tracking-tight text-slate-900 leading-[1.0] mb-2 flex flex-wrap">
              <TextRevealSmooth 
                text="Selected Work." 
                highlightWords={["Work."]}
                highlightClass="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-400 font-serif italic pr-4"
              />
            </div>
          </div>
          <p className="max-w-sm text-slate-600 font-sans pb-4 text-lg leading-relaxed">
            Bukti nyata performa premium untuk berbagai industri lokal. Desain yang berbicara, data yang membuktikan.
          </p>
        </motion.div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, idx) => (
              <ProjectSkeleton key={idx} />
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {projects.map((project, i) => (
              <ProjectCard 
                key={project.title} 
                project={project} 
                index={i} 
                onClick={() => navigate(`/portfolio/${project.id}`)}
                variants={cardVariants}
              />
            ))}
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-24 text-center"
        >
          <p className="text-slate-600 font-sans mb-8">Punya ide proyek impian?</p>
          <motion.a 
            href={`https://wa.me/6282125447232?text=${encodeURIComponent('Halo Mas Chesta, saya tertarik memulai proyek pembuatan website bersama CHESTAADOTCOM.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-full transition-all duration-300 text-base sm:text-lg shadow-lg shadow-purple-600/20 cursor-pointer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <span>Chat with us on WhatsApp</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
