import SEOProvider from '../components/atoms/SEOProvider';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, CheckCircle2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../data/projects';
import MetaTags from '../components/atoms/MetaTags';
import Breadcrumbs from '../components/atoms/Breadcrumbs';
import CreativityMarquee from '../components/organisms/CreativityMarquee.tsx';
import AICaseStudies from '../components/organisms/AICaseStudies.tsx';
import LazyImage from '../components/atoms/LazyImage.tsx';

import SectionHeader from '../components/organisms/SectionHeader';
import QuickViewModal, { QuickViewData } from '../components/organisms/QuickViewModal';

const CATEGORIES = ['All', 'Website', 'Landing Page', 'Company Profile'];

const PortfolioSkeleton = () => (
  <div className="relative flex flex-col h-full bg-white/40 backdrop-blur-xl p-6 rounded-3xl border border-white/60 animate-pulse text-left shadow-xl shadow-purple-900/5">
    <div className="w-full aspect-[4/3] bg-slate-100 rounded-2xl mb-5" />
    <div className="flex gap-2.5 items-center mb-3">
      <div className="h-5 w-24 bg-purple-50 rounded-full" />
    </div>
    <div className="space-y-2 mb-4">
      <div className="h-6 w-3/4 bg-slate-200 rounded" />
    </div>
    <div className="space-y-2 mb-6">
      <div className="h-4 w-full bg-slate-100 rounded" />
      <div className="h-4 w-5/6 bg-slate-100 rounded" />
    </div>
  </div>
);

export default function PortfolioPage() {
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [filter]);
  const [quickViewData, setQuickViewData] = useState<QuickViewData | null>(null);

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);


  return (
    <div className="pt-12 pb-32 min-h-screen relative bg-transparent select-none">
      <QuickViewModal isOpen={!!quickViewData} onClose={() => setQuickViewData(null)} data={quickViewData} />
      <SEOProvider 
        title="Client Case Studies & Portfolio | CHESTAADOTCOM"
        description="Explore our track record of transforming enterprise operations through AI and web technology."
      />
      
      <MetaTags 
        title="Showcase Portfolio — CHESTAADOTCOM" 
        description="Jelajahi portfolio digital masterpieces yang dirancang khusus untuk bisnis modern UMKM Indonesia." 
      />

      {/* Cinematic Hero */}
      <section className="relative min-h-[45vh] flex flex-col justify-end pt-48 pb-24 border-b border-slate-100 mb-20 overflow-hidden">
        <div className="absolute inset-0 bg-purple-50/50 rounded-full blur-[120px] pointer-events-none -z-10 mix-blend-multiply" />
        
        <div className="mx-auto max-w-7xl px-6 w-full relative z-10">
          <Breadcrumbs items={[{ label: 'Portfolio' }]} />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end mt-8">
            <div className="lg:col-span-8">
              <SectionHeader 
                metaTag="SHOWCASE PORTFOLIO"
                title={
                  <>
                    Selected <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-purple-500 to-cyan-500 font-serif italic pr-4">Works.</span>
                  </>
                }
                description="Mengubah ide menjadi karya arsitektur digital premium yang mendorong konversi dan pertumbuhan omset bisnis Anda secara nyata."
              />
            </div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-4 lg:pb-6 flex lg:justify-end"
            >
               <div className="flex gap-2 mb-12 flex-wrap pb-4">
                  <span className="text-[11px] font-sans font-semibold tracking-widest uppercase text-slate-600 whitespace-nowrap mb-2 w-full">Filter By:</span>
                  {CATEGORIES.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setFilter(cat)}
                      className={`px-6 py-2.5 rounded-full font-sans font-semibold text-[11px] uppercase tracking-widest border transition-all duration-300 ${filter === cat ? 'bg-[#6b21a8] text-white border-[#6b21a8] shadow-md' : 'bg-white/40 backdrop-blur-xl border border-white/60 text-slate-500 hover:text-slate-900 hover:border-purple-300 shadow-xl shadow-purple-900/5 hover:bg-white/60'}`}
                    >
                      {cat}
                    </button>
                  ))}
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Grid Content */}
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-8 lg:col-span-9 flex flex-col gap-12">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {filteredProjects.map((project) => (
                <motion.div 
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <Link
                    to={`/portfolio/${project.id}`}
                    className="block shadow-xl shadow-purple-900/5 hover:shadow-2xl hover:shadow-purple-900/10 bg-white/40 backdrop-blur-xl border border-white/60 hover:border-purple-300 hover:bg-white/60 rounded-3xl overflow-hidden group transition-all duration-500 flex flex-col relative cursor-pointer aspect-square sm:aspect-auto sm:h-[450px]"
                  >
                    {/* Image Block */}
                    
                    <div className="flex-1 w-full relative overflow-hidden bg-slate-50">
                      <LazyImage 
                         src={project.thumbnail} 
                         alt={project.title} 
                         className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-out group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-90" />
                      
                      {/* Quick View Button */}
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          setQuickViewData({
                            id: project.id,
                            type: 'project',
                            title: project.title,
                            subtitle: project.category,
                            description: project.description || 'Proyek digital dari CHESTAADOTCOM.',
                            image: project.thumbnail,
                            tags: project.techStack,
                            link: `/portfolio/${project.id}`
                          });
                        }}
                        className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-white/10 hover:bg-purple-600 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
                        title="Quick View"
                      >
                        <Eye size={18} />
                      </button>
                    </div>
                    
                    {/* Card Title */}
                    <div className="absolute inset-x-0 bottom-0 p-8 z-20">
                      <span className="text-[10px] font-sans font-semibold text-purple-300 tracking-widest uppercase mb-2 block group-hover:text-purple-400 transition-colors">
                        {project.category}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-display font-medium text-slate-900 tracking-tight leading-snug group-hover:text-slate-900 transition-colors">
                        {project.title}
                      </h3>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            
            {filteredProjects.length === 0 && (
               <div className="py-24 text-center border border-dashed border-slate-200 rounded-[2rem] bg-slate-50">
                  <p className="text-slate-600 font-sans tracking-widest uppercase text-xs">Tidak ada project untuk kategori ini.</p>
               </div>
            )}
        </div>

        {/* Sticky Conversion Sidebar */}
        <div className="md:col-span-4 lg:col-span-3">
           <div className="sticky top-32 p-8 rounded-[2rem] bg-white/40 backdrop-blur-2xl border border-white/60 shadow-xl shadow-purple-900/5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-purple-50/50 rounded-full blur-[80px] pointer-events-none mix-blend-multiply" />
              
              <div className="relative z-10">
                 <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mb-6">
                    <CheckCircle2 size={24} className="text-[#6b21a8]" />
                 </div>
                 <h4 className="text-2xl font-display font-medium text-slate-900 mb-2 leading-tight">Tertarik dengan kinerja website kami?</h4>
                 <p className="text-sm font-sans text-slate-500 mb-8 leading-relaxed">Konsultasikan kebutuhan spesifik bisnis Anda dengan tim kami sekarang juga secara gratis.</p>
                 
                 <a 
                   href="https://wa.me/6282125447232" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="flex items-center justify-center gap-2 w-full py-4 bg-[#6b21a8] text-white font-sans font-bold rounded-xl text-sm hover:scale-[1.02] transition-transform duration-300 shadow-md hover:shadow-lg hover:bg-purple-700"
                 >
                    Chat via WhatsApp <ArrowUpRight size={16} />
                 </a>
              </div>
           </div>
        </div>
      </div>
      <AICaseStudies />
      <CreativityMarquee />
    </div>
  );
}
