import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import TextRevealSmooth from '../atoms/TextRevealSmooth';
import { ALL_ARTICLES } from '../../data/blogData';

const BlogSkeleton = () => (
  <div className="relative flex flex-col h-full bg-[#131825]/15 p-6 md:p-8 rounded-3xl border border-white/5 animate-pulse min-h-[320px] text-left">
    <div className="flex gap-4 items-center mb-6">
      {/* Category Tag placeholder */}
      <div className="h-6 w-16 bg-[#D4FF00]/10 rounded-full" />
      {/* Date placeholder */}
      <div className="h-3 w-20 bg-white/10 rounded" />
    </div>
    
    {/* Title placeholder */}
    <div className="space-y-2 mb-4">
      <div className="h-5 w-5/6 bg-white/20 rounded" />
      <div className="h-5 w-2/3 bg-white/10 rounded" />
    </div>

    {/* Description paragraph placeholders */}
    <div className="space-y-2 mb-8">
      <div className="h-3.5 w-full bg-white/5 rounded" />
      <div className="h-3.5 w-full bg-white/5 rounded" />
      <div className="h-3.5 w-3/4 bg-white/5 rounded" />
    </div>
    
    {/* Read more Link placeholder */}
    <div className="mt-auto pt-4 h-4 w-28 bg-[#D4FF00]/10 rounded" />
  </div>
);

export default function BlogSection() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1250);
    return () => clearTimeout(timer);
  }, []);

  // Take 3 articles for the home page showcase (featured + 2 others)
  const homeArticles = ALL_ARTICLES.slice(0, 3);

  return (
    <section id="blog" className="py-16 md:py-24 relative overflow-hidden bg-transparent border-b border-white/5">
      <div className="mx-auto max-w-7xl px-6 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-white/5"
        >
          <div>
            <span className="text-[#D4FF00] font-sans font-medium text-sm uppercase tracking-widest block mb-4">
              04 — Knowledge Base
            </span>
            <div className="text-4xl md:text-5xl font-display font-medium tracking-tight text-white leading-[1.0] mb-2 flex flex-wrap">
              <TextRevealSmooth 
                text="Insight & Perspective." 
                highlightWords={["Perspective."]}
                highlightClass="text-transparent bg-clip-text bg-gradient-to-r from-[#D4FF00] to-green-400 font-serif italic pr-2"
              />
            </div>
          </div>
          <Link to="/blog" className="group relative flex items-center justify-center w-16 h-16 rounded-full bg-[#131825] border border-white/10 hover:bg-white/5 transition-colors shrink-0 md:mr-4">
             <span className="sr-only">Read All Journal</span>
             <ArrowUpRight className="text-white transition-transform group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" size={24} />
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
                className="group cursor-pointer relative flex flex-col h-full bg-[#131825]/30 p-6 md:p-8 rounded-3xl border border-transparent hover:border-white/5 hover:bg-[#131825]/60 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="flex gap-4 items-center mb-6">
                  <span className="text-[10px] font-sans font-semibold text-[#0a0b10] bg-[#D4FF00] px-3 py-1.5 rounded-full uppercase tracking-widest">
                    {art.cat}
                  </span>
                  <span className="text-[10px] font-mono text-gray-400 tracking-widest">
                    {art.date}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-display font-medium text-white leading-snug mb-4 group-hover:text-green-400 transition-colors tracking-tight line-clamp-2 text-left">
                  {art.title}
                </h3>
                <p className="text-base text-gray-400 leading-relaxed font-sans line-clamp-3 mb-8 text-left">
                  {art.desc}
                </p>
                
                <Link 
                  to={`/blog?read=${art.slug}&origin=home`} 
                  className="mt-auto pt-4 flex items-center gap-2 text-sm font-sans font-semibold tracking-widest uppercase text-[#D4FF00] opacity-80 group-hover:opacity-100 transition-opacity"
                >
                  Baca Selengkapnya
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
