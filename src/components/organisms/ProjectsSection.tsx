import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Sparkles, Filter, ArrowUpRight } from 'lucide-react';
import ProjectCard, { ProjectType } from '../molecules/ProjectCard.tsx';
import TextRevealSmooth from '../atoms/TextRevealSmooth';
import ProjectQuickViewModal from './ProjectQuickViewModal.tsx';
import { PROJECTS } from '../../data/projects.ts';
import { 
  filterProjectsByQuery, 
  dispatchOpenCommandPalette,
  getSearchIndexStats 
} from '../../lib/contentSearchIndex';

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

const allBaseProjects: ProjectType[] = PROJECTS.map((p, index) => {
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
    solutions: p.solution ? [p.solution] : [],
    techStack: p.techStack
  };
});

const PROJECT_CATEGORIES = [
  'Semua',
  'Company Profile',
  'Website',
  'Landing Page'
];

export default function ProjectsSection() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const stats = useMemo(() => getSearchIndexStats(), []);

  // Filter projects in real-time using client-side indexing function
  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim() && selectedCategory === 'Semua') {
      return allBaseProjects;
    }

    const indexedResults = filterProjectsByQuery(
      searchQuery,
      selectedCategory === 'Semua' ? undefined : selectedCategory
    );

    // Map matched items back to full project types
    const matched = indexedResults
      .map(item => allBaseProjects.find(p => p.id === item.slug))
      .filter((p): p is ProjectType => Boolean(p));

    return matched;
  }, [searchQuery, selectedCategory]);

  const handleProjectClick = (project: ProjectType) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleOpenSearchModal = () => {
    dispatchOpenCommandPalette({
      category: 'portfolio',
      query: searchQuery.trim() || undefined
    });
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.05 } 
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 40, 
      scale: 0.98,
      filter: 'blur(4px)' 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      filter: 'blur(0px)',
      transition: { 
        type: 'spring', 
        stiffness: 90, 
        damping: 18, 
        mass: 0.9 
      }
    }
  };

  return (
    <section id="work" className="py-16 md:py-20 relative overflow-hidden bg-transparent">
      <ProjectQuickViewModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <div className="mx-auto max-w-7xl px-6 relative z-10 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12"
        >
          <div>
            <div className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-medium tracking-tight text-slate-950 leading-[1.05] mb-2 flex flex-wrap">
              <TextRevealSmooth 
                text="Selected Work." 
                highlightWords={["Work."]}
                highlightClass="text-purple-600 font-serif italic pr-4"
              />
            </div>
            <p className="max-w-md text-slate-600 font-sans pt-2 text-base md:text-lg font-normal leading-relaxed">
              Bukti nyata performa premium untuk berbagai industri lokal. Desain yang berbicara, data yang membuktikan.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            {/* Cmd+K Quick Filter Trigger */}
            <button
              id="btn-projects-cmdk-trigger"
              onClick={handleOpenSearchModal}
              className="group inline-flex items-center gap-2.5 px-4 py-3 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-medium border border-purple-200/80 transition-all shadow-2xs cursor-pointer"
              title="Cari seluruh proyek & studi kasus (Cmd+K)"
            >
              <Search size={14} className="text-purple-600" />
              <span>Cari Proyek & Klien</span>
              <kbd className="px-1.5 py-0.5 rounded bg-white text-[10px] font-mono font-medium text-purple-700 border border-purple-200 shadow-2xs">
                ⌘K
              </kbd>
            </button>
          </div>
        </motion.div>

        {/* Lightweight Client-Side Search & Filter Bar */}
        <div className="mb-10 p-2 sm:p-2.5 rounded-2xl bg-white/70 backdrop-blur-md border border-slate-200/80 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Real-time Inline Search Input */}
          <div className="relative flex-1 flex items-center min-w-0">
            <Search size={16} className="absolute left-3.5 text-purple-600 pointer-events-none" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter proyek berdasarkan nama, industri, tech stack (Next.js, AI, IoT)..."
              className="w-full pl-10 pr-20 py-2 text-xs sm:text-sm bg-transparent rounded-xl text-slate-900 placeholder:text-slate-400 outline-none font-normal"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Hapus filter"
              >
                <X size={14} />
              </button>
            ) : (
              <span className="hidden sm:inline-block absolute right-3 text-[10px] font-mono text-purple-600 bg-purple-50 px-2 py-0.5 rounded border border-purple-200 font-medium">
                Live Filter
              </span>
            )}
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
            <Filter size={12} className="text-slate-400 shrink-0 ml-1 mr-0.5 hidden sm:inline-block" />
            {PROJECT_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-[11px] font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-purple-900 text-white shadow-xs border border-purple-800'
                    : 'bg-slate-50 hover:bg-purple-50 text-slate-600 hover:text-purple-700 border border-slate-200/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Filter Status */}
        {(searchQuery || selectedCategory !== 'Semua') && (
          <div className="mb-6 flex items-center justify-between text-xs text-slate-600 px-1">
            <span>
              Menampilkan <strong className="text-purple-700 font-medium">{filteredProjects.length}</strong> dari {allBaseProjects.length} proyek
              {searchQuery && <> untuk kata kunci "<span className="italic">{searchQuery}</span>"</>}
            </span>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('Semua'); }}
              className="text-purple-600 hover:text-purple-800 font-medium cursor-pointer"
            >
              Reset Filter
            </button>
          </div>
        )}
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, idx) => (
              <ProjectSkeleton key={idx} />
            ))}
          </div>
        ) : filteredProjects.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProjects.map((project, i) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={i} 
                onClick={() => handleProjectClick(project)}
                variants={cardVariants}
              />
            ))}
          </motion.div>
        ) : (
          /* Empty search state with quick action to open full CommandPalette */
          <div className="py-16 px-6 text-center bg-white/60 rounded-2xl border border-dashed border-purple-200 space-y-4 max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 mx-auto flex items-center justify-center border border-purple-100">
              <Search size={20} />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-semibold text-slate-900">
                Tidak ada proyek yang sesuai dengan "{searchQuery}"
              </h4>
              <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                Coba cari dengan nama teknologi, jenis industri, atau cari di seluruh basis data portofolio & studi kasus.
              </p>
            </div>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={handleOpenSearchModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-purple-900 hover:bg-purple-800 text-white text-xs font-medium transition-all shadow-xs cursor-pointer"
              >
                <Sparkles size={13} />
                <span>Buka di CommandPalette (⌘K)</span>
              </button>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('Semua'); }}
                className="px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors cursor-pointer"
              >
                Reset Filter
              </button>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-20 text-center"
        >
          <p className="text-slate-600 font-sans mb-6 text-sm md:text-base">Punya ide proyek impian berarsitektur sub-detik?</p>
          <motion.a 
            href={`https://wa.me/6282125447232?text=${encodeURIComponent('Halo Mas Chesta, saya tertarik memulai proyek pembuatan website bersama CHESTAADOTCOM.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-purple-950 hover:bg-purple-900 text-white font-bold rounded-full transition-all duration-300 text-sm sm:text-base shadow-md shadow-purple-950/20 cursor-pointer"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <span>Konsultasi Proyek via WhatsApp</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
