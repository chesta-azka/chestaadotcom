import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../data/projects';
import MetaTags from '../components/atoms/MetaTags';
import Breadcrumbs from '../components/atoms/Breadcrumbs';
import CreativityMarquee from '../components/organisms/CreativityMarquee.tsx';
import AICaseStudies from '../components/organisms/AICaseStudies.tsx';
import LazyImage from '../components/atoms/LazyImage.tsx';

const CATEGORIES = ['All', 'Website', 'Landing Page', 'Company Profile'];

export default function PortfolioPage() {
  const [filter, setFilter] = useState('All');

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);


  return (
    <div className="pt-12 pb-32 min-h-screen relative bg-transparent select-none">
      <MetaTags 
        title="Showcase Portfolio — CHESTADOTCOM" 
        description="Jelajahi portfolio digital masterpieces yang dirancang khusus untuk bisnis modern UMKM Indonesia." 
      />

      {/* Cinematic Hero */}
      <section className="relative min-h-[45vh] flex flex-col justify-end pt-32 pb-24 border-b border-slate-100 mb-20 overflow-hidden">
        <div className="absolute inset-0 bg-blue-50/50 rounded-full blur-[120px] pointer-events-none -z-10 mix-blend-multiply" />
        
        <div className="mx-auto max-w-7xl px-6 w-full relative z-10">
          <Breadcrumbs items={[{ label: 'Portfolio' }]} />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end mt-8">
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-slate-1000 backdrop-blur-md px-5 py-2 text-xs font-sans font-semibold tracking-widest text-[#4f46e5] uppercase shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#4f46e5] animate-pulse" />
                  Showcase Portfolio
                </div>
                
                <h1 className="text-4xl sm:text-[6rem] lg:text-[7rem] font-display font-medium tracking-tight leading-[0.85] text-slate-900 uppercase mb-8">
                  Selected <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 font-serif italic pr-4">Works.</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-slate-500 font-sans max-w-2xl leading-relaxed">
                  Mengubah ide menjadi karya arsitektur digital premium yang mendorong konversi dan pertumbuhan omset UMKM secara nyata.
                </p>
              </motion.div>
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
                      className={`px-6 py-2.5 rounded-full font-sans font-semibold text-[11px] uppercase tracking-widest border transition-all duration-300 ${filter === cat ? 'bg-[#4f46e5] text-white border-[#4f46e5] shadow-md' : 'bg-white border border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300 shadow-sm'}`}
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
                    className="block shadow-sm hover:shadow-xl bg-white border border-slate-100 hover:border-indigo-200 rounded-3xl overflow-hidden group transition-all duration-500 flex flex-col relative cursor-pointer aspect-square sm:aspect-auto sm:h-[450px]"
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
                    </div>
                    
                    {/* Card Title */}
                    <div className="absolute inset-x-0 bottom-0 p-8 z-20">
                      <span className="text-[10px] font-sans font-semibold text-indigo-300 tracking-widest uppercase mb-2 block group-hover:text-indigo-400 transition-colors">
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
           <div className="sticky top-32 p-8 rounded-[2rem] bg-white border border-slate-100 shadow-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-blue-50/50 rounded-full blur-[80px] pointer-events-none mix-blend-multiply" />
              
              <div className="relative z-10">
                 <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-6">
                    <CheckCircle2 size={24} className="text-[#4f46e5]" />
                 </div>
                 <h4 className="text-2xl font-display font-medium text-slate-900 mb-2 leading-tight">Tertarik dengan kinerja website kami?</h4>
                 <p className="text-sm font-sans text-slate-500 mb-8 leading-relaxed">Konsultasikan kebutuhan spesifik bisnis Anda dengan tim kami sekarang juga secara gratis.</p>
                 
                 <a 
                   href="https://wa.me/6282125447232" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="flex items-center justify-center gap-2 w-full py-4 bg-[#4f46e5] text-white font-sans font-bold rounded-xl text-sm hover:scale-[1.02] transition-transform duration-300 shadow-md hover:shadow-lg hover:bg-indigo-700"
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
