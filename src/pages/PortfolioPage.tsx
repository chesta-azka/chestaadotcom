import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../data/projects';
import MetaTags from '../components/atoms/MetaTags';
import CreativityMarquee from '../components/organisms/CreativityMarquee.tsx';

const CATEGORIES = ['All', 'Website', 'Landing Page', 'Company Profile'];

export default function PortfolioPage() {
  const [filter, setFilter] = useState('All');

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);


  return (
    <div className="pt-24 pb-32 min-h-screen relative bg-transparent select-none">
      <MetaTags 
        title="Showcase Portfolio — CHESTADOTCOM" 
        description="Jelajahi portfolio digital masterpieces yang dirancang khusus untuk bisnis modern UMKM Indonesia." 
      />

      {/* Cinematic Hero */}
      <section className="relative min-h-[45vh] flex flex-col justify-end pt-32 pb-24 border-b border-white/5 mb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#D4FF40]/5 rounded-full blur-[120px] pointer-events-none -z-10 mix-blend-screen" />
        
        <div className="mx-auto max-w-7xl px-6 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-5 py-2 text-xs font-sans font-semibold tracking-widest text-[#D4FF00] uppercase shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#D4FF00] animate-pulse" />
                  Showcase Portfolio
                </div>
                
                <h1 className="text-4xl sm:text-[6rem] lg:text-[7rem] font-display font-medium tracking-tight leading-[0.85] text-white uppercase mb-8">
                  Selected <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4FF00] via-green-400 to-indigo-400 font-serif italic pr-4">Works.</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-400 font-sans max-w-2xl leading-relaxed">
                  Awalnya hanya sebuah ide, kini menjadi karya premium penunjang omset UMKM.
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
                  <span className="text-[11px] font-sans font-semibold tracking-widest uppercase text-gray-500 whitespace-nowrap mb-2 w-full">Filter By:</span>
                  {CATEGORIES.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setFilter(cat)}
                      className={`px-6 py-2.5 rounded-full font-sans font-semibold text-[11px] uppercase tracking-widest border transition-all duration-300 ${filter === cat ? 'bg-[#D4FF00] text-[#06080F] border-[#D4FF00]' : 'bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:border-white/20 backdrop-blur-sm'}`}
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
                    className="block shadow-sm hover:shadow-2xl bg-[#131825]/30 border border-white/5 hover:border-[#D4FF00]/40 rounded-3xl overflow-hidden group transition-all duration-500 flex flex-col relative cursor-pointer aspect-square sm:aspect-auto sm:h-[450px]"
                  >
                    {/* Image Block */}
                    <div className="flex-1 w-full relative overflow-hidden bg-[#0A0D14]">
                      <img 
                        src={project.thumbnail} 
                        alt={project.title} 
                        className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-out"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                    </div>
                    
                    {/* Card Title */}
                    <div className="absolute inset-x-0 bottom-0 p-8 z-20">
                      <span className="text-[10px] font-sans font-semibold text-[#D4FF00] tracking-widest uppercase mb-2 block">
                        {project.category}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-display font-medium text-white tracking-tight leading-snug group-hover:text-[#D4FF00] transition-colors">
                        {project.title}
                      </h3>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            
            {filteredProjects.length === 0 && (
               <div className="py-24 text-center border border-dashed border-white/10 rounded-[2rem] bg-white/[0.01]">
                  <p className="text-gray-400 font-sans tracking-widest uppercase text-xs">Tidak ada project untuk kategori ini.</p>
               </div>
            )}
        </div>

        {/* Sticky Conversion Sidebar */}
        <div className="md:col-span-4 lg:col-span-3">
           <div className="sticky top-32 p-8 rounded-[2rem] bg-gradient-to-br from-[#12141D] to-[#06080F] border border-white/10 shadow-[0_0_50px_rgba(212,255,0,0.03)] relative overflow-hidden group">
              <div className="absolute inset-0 bg-[#D4FF00]/5 rounded-full blur-[80px] pointer-events-none" />
              
              <div className="relative z-10">
                 <div className="w-12 h-12 rounded-xl bg-[#D4FF00]/10 flex items-center justify-center mb-6">
                    <CheckCircle2 size={24} className="text-[#D4FF00]" />
                 </div>
                 <h4 className="text-2xl font-display font-medium text-white mb-2 leading-tight">Tertarik dengan kinerja website kami?</h4>
                 <p className="text-sm font-sans text-gray-400 mb-8 leading-relaxed">Konsultasikan kebutuhan spesifik bisnis Anda dengan tim kami sekarang juga secara gratis.</p>
                 
                 <a 
                   href="https://wa.me/6282125447232" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="flex items-center justify-center gap-2 w-full py-4 bg-[#D4FF00] text-[#06080F] font-sans font-bold rounded-xl text-sm hover:scale-[1.02] transition-transform duration-300 shadow-[0_0_20px_rgba(212,255,0,0.3)]"
                 >
                    Chat via WhatsApp <ArrowUpRight size={16} />
                 </a>
              </div>
           </div>
        </div>
      </div>
      <CreativityMarquee />
    </div>
  );
}
