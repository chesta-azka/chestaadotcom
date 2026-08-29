import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import TextRevealSmooth from '../atoms/TextRevealSmooth';
import { ALL_ARTICLES } from '../../data/blogData';

const BlogSkeleton = () => (
  <div className="relative flex flex-col h-full bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100 animate-pulse min-h-[320px] text-left">
    <div className="flex gap-4 items-center mb-6">
      {/* Category Tag placeholder */}
      <div className="h-6 w-16 bg-[#6b21a8]/10 rounded-full" />
      {/* Date placeholder */}
      <div className="h-3 w-20 bg-slate-200 rounded" />
    </div>
    
    {/* Title placeholder */}
    <div className="space-y-2 mb-4">
      <div className="h-5 w-5/6 bg-white/20 rounded" />
      <div className="h-5 w-2/3 bg-slate-200 rounded" />
    </div>

    {/* Description paragraph placeholders */}
    <div className="space-y-2 mb-8">
      <div className="h-3.5 w-full bg-slate-100 rounded" />
      <div className="h-3.5 w-full bg-slate-100 rounded" />
      <div className="h-3.5 w-3/4 bg-slate-100 rounded" />
    </div>
    
    {/* Read more Link placeholder */}
    <div className="mt-auto pt-4 h-4 w-28 bg-[#6b21a8]/10 rounded" />
  </div>
);

export default function BlogSection() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Take 3 top articles for the home page showcase
  const homeArticles = ALL_ARTICLES.slice(0, 3);

  return (
    <section id="blog" className="py-16 md:py-24 relative overflow-hidden bg-transparent border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-6 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-slate-100"
        >
          <div>
            <span className="text-[#6b21a8] font-mono font-semibold text-xs uppercase tracking-widest block mb-3">
              04 — Wawasan & Strategi Digital
            </span>
            <div className="text-fluid-h2 font-serif font-medium tracking-tight text-slate-900 leading-[1.05] mb-2 flex flex-wrap">
              <TextRevealSmooth 
                text="Insight & Rekomendasi." 
                highlightWords={["Rekomendasi."]}
                highlightClass="text-transparent bg-clip-text bg-gradient-to-r from-[#6b21a8] to-purple-600 font-serif italic pr-2"
              />
            </div>
            <p className="text-slate-600 font-sans text-sm md:text-base max-w-lg mt-2">
              Pelajari tren otomasi Agentic AI, framework SEO 2026, dan strategi optimasi konversi untuk memimpin pasar.
            </p>
          </div>
          <Link 
            to="/blog" 
            className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-slate-900 hover:bg-[#6b21a8] text-white text-xs font-mono font-bold tracking-wider uppercase transition-colors shrink-0 shadow-sm"
          >
             <span>Buka Semua Insight & Search</span>
             <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, idx) => (
              <BlogSkeleton key={idx} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {homeArticles.map((art, i) => (
              <motion.article 
                key={art.slug} 
                className="group cursor-pointer relative flex flex-col h-full bg-white/40 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-white/60 hover:border-purple-300 hover:bg-white/60 hover:shadow-xl hover:shadow-purple-900/5 transition-all duration-300 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => window.location.href = `/blog?read=${art.slug}&origin=home`}
              >
                <div className="w-full h-44 overflow-hidden rounded-2xl mb-6 border border-slate-100 relative">
                  <img 
                    src={art.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop"} 
                    alt={art.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {art.recommended && (
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-amber-200 shadow-sm flex items-center gap-1 text-[10px] font-mono font-bold text-amber-800">
                      <Star size={10} className="fill-amber-500 text-amber-500" />
                      <span>Rekomendasi</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 items-center mb-3">
                  <span className="text-[10px] font-mono font-bold text-[#6b21a8] bg-purple-50 px-3 py-1 rounded-full uppercase tracking-wider">
                    {art.cat}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {art.readTime}
                  </span>
                </div>
                <h3 className="text-xl font-display font-medium text-slate-900 leading-snug mb-3 group-hover:text-[#6b21a8] transition-colors tracking-tight line-clamp-2 text-left">
                  {art.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-sans line-clamp-2 mb-6 text-left">
                  {art.desc}
                </p>
                
                <Link 
                  to={`/blog?read=${art.slug}&origin=home`} 
                  className="mt-auto pt-4 flex items-center justify-between text-xs font-mono font-semibold tracking-wider text-[#6b21a8] border-t border-slate-100"
                >
                  <span>Baca Insight</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
