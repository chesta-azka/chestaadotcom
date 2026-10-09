import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ExternalLink, Globe } from 'lucide-react';
import { PROJECTS } from '../../data/projects';

export default function PortfolioShowcaseSection() {
  const [activeFilter, setActiveFilter] = useState('Semua');

  // Filter categories
  const categories = ['Semua', 'Enterprise', 'Startup', 'AI', 'E-Commerce'];

  // Map project categories or filter dynamically
  const filteredProjects = PROJECTS.filter(project => {
    if (activeFilter === 'Semua') return true;
    const cat = project.category.toLowerCase();
    if (activeFilter === 'Enterprise') return cat.includes('enterprise') || cat.includes('korporat') || cat.includes('infrastruktur');
    if (activeFilter === 'Startup') return cat.includes('startup') || cat.includes('web') || cat.includes('sistem');
    if (activeFilter === 'AI') return cat.includes('ai') || cat.includes('omnichannel') || cat.includes('otomasi');
    if (activeFilter === 'E-Commerce') return cat.includes('e-commerce') || cat.includes('toko') || cat.includes('retail');
    return cat.includes(activeFilter.toLowerCase());
  });

  const displayProjects = filteredProjects.length > 0 ? filteredProjects.slice(0, 6) : PROJECTS.slice(0, 6);

  return (
    <section className="py-20 sm:py-28 w-full bg-slate-50/75 text-slate-900 border-t border-slate-200/80 relative overflow-hidden flex flex-col items-center" id="portfolio-showcase">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-medium text-slate-500 uppercase tracking-[0.2em] block mb-2">
              03. Portofolio &amp; Studi Kasus
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-950 tracking-tight mb-4 leading-tight">
              Lihat bagaimana solusi kami diterapkan.
            </h2>
            <p className="text-base sm:text-lg font-sans text-slate-600 leading-relaxed font-normal">
              Jelajahi pekerjaan kami untuk berbagai bisnis, dari memahami kebutuhan hingga mewujudkannya menjadi solusi digital.
            </p>
          </div>

          <Link
            to="/portfolio"
            onClick={() => window.scrollTo(0, 0)}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-white hover:bg-purple-50 text-slate-900 font-bold text-xs uppercase tracking-wider border border-slate-200 transition-all shadow-xs shrink-0 group cursor-pointer"
          >
            <span>Semua Portofolio</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform text-purple-600" />
          </Link>
        </div>

        {/* Filterable Category Tags */}
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-6 mb-8 scroll-smooth">
          {categories.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer shadow-xs ${
                  isActive
                    ? 'bg-purple-900 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:text-purple-900 hover:bg-purple-50 border border-slate-200/90'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Portfolio Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {displayProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                whileHover={{ y: -8 }}
                className="group flex flex-col rounded-3xl bg-white border border-slate-200/90 hover:border-purple-300 shadow-sm hover:shadow-2xl hover:shadow-purple-900/[0.06] transition-all duration-500 overflow-hidden"
              >
                {/* Thumbnail Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-900 text-[11px] font-mono font-bold shadow-xs">
                      {project.category}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <span className="text-xs font-mono font-medium text-purple-200">{project.duration || '2-4 Minggu'}</span>
                    <span className="text-xs font-mono bg-purple-600 text-white px-2.5 py-1 rounded-lg font-bold">Terverifikasi</span>
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-8 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-xl font-display font-bold text-slate-950 mb-3 tracking-tight group-hover:text-purple-900 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm font-sans text-slate-600 leading-relaxed font-normal mb-8 line-clamp-2">
                      {project.overview || project.description}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-3">
                    <Link
                      to={'/portfolio/' + project.id}
                      onClick={() => window.scrollTo(0, 0)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-purple-700 group-hover:text-purple-900 uppercase tracking-wider"
                    >
                      <span>Detail</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-mono font-bold border border-purple-200 transition-all shadow-2xs"
                    >
                      <Globe size={13} />
                      <span>Live Preview</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
