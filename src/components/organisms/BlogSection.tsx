import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import TextRevealSmooth from '../atoms/TextRevealSmooth';
import { ALL_ARTICLES } from '../../data/blogData';

const BlogSkeleton = () => (
  <div className="relative flex flex-col h-full bg-gray-50 p-6 md:p-8 rounded-3xl border border-gray-100 animate-pulse min-h-[320px] text-left">
    <div className="flex gap-4 items-center mb-6">
      {/* Category Tag placeholder */}
      <div className="h-6 w-16 bg-[#4f46e5]/10 rounded-full" />
      {/* Date placeholder */}
      <div className="h-3 w-20 bg-gray-200 rounded" />
    </div>
    
    {/* Title placeholder */}
    <div className="space-y-2 mb-4">
      <div className="h-5 w-5/6 bg-white/20 rounded" />
      <div className="h-5 w-2/3 bg-gray-200 rounded" />
    </div>

    {/* Description paragraph placeholders */}
    <div className="space-y-2 mb-8">
      <div className="h-3.5 w-full bg-gray-100 rounded" />
      <div className="h-3.5 w-full bg-gray-100 rounded" />
      <div className="h-3.5 w-3/4 bg-gray-100 rounded" />
    </div>
    
    {/* Read more Link placeholder */}
    <div className="mt-auto pt-4 h-4 w-28 bg-[#4f46e5]/10 rounded" />
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
    <section id="blog" className="py-16 md:py-24 relative overflow-hidden bg-transparent border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-6 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-gray-100"
        >
          <div>
            <span className="text-[#4f46e5] font-sans font-medium text-sm uppercase tracking-widest block mb-4">
              04 — Knowledge Base
            </span>
            <div className="text-4xl md:text-5xl font-display font-medium tracking-tight text-gray-900 leading-[1.0] mb-2 flex flex-wrap">
              <TextRevealSmooth 
                text="Insight & Perspective." 
                highlightWords={["Perspective."]}
                highlightClass="text-transparent bg-clip-text bg-gradient-to-r from-[#4f46e5] to-green-400 font-serif italic pr-2"
              />
            </div>
          </div>
          <Link to="/blog" className="group relative flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors shrink-0 md:mr-4">
             <span className="sr-only">Read All Journal</span>
             <ArrowUpRight className="text-gray-900 transition-transform group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" size={24} />
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
                className="group cursor-pointer relative flex flex-col h-full bg-gray-50 p-6 md:p-8 rounded-3xl border border-transparent hover:border-gray-100 hover:bg-gray-50 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => window.location.href = `/blog?read=${art.slug}&origin=home`}
              >
                <div className="w-full h-40 overflow-hidden rounded-2xl mb-6 border border-gray-100 relative">
                  <img 
                    src={art.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop"} 
                    alt={art.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06080F]/60 to-transparent p-4 flex items-end">
                    <span className="text-[9px] font-mono text-gray-900/50 tracking-widest uppercase">Visual Perspective</span>
                  </div>
                </div>

                <div className="flex gap-4 items-center mb-4">
                  <span className="text-[10px] font-sans font-semibold text-[#0a0b10] bg-[#4f46e5] px-3 py-1.5 rounded-full uppercase tracking-widest">
                    {art.cat}
                  </span>
                  <span className="text-[10px] font-mono text-gray-600 tracking-widest">
                    {art.date}
                  </span>
                </div>
                <h3 className="text-xl font-display font-medium text-gray-900 leading-snug mb-3 group-hover:text-green-400 transition-colors tracking-tight line-clamp-2 text-left">
                  {art.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed font-sans line-clamp-2 mb-6 text-left">
                  {art.desc}
                </p>
                
                <Link 
                  to={`/blog?read=${art.slug}&origin=home`} 
                  className="mt-auto pt-4 flex items-center gap-2 text-xs font-sans font-semibold tracking-widest uppercase text-[#4f46e5] opacity-80 group-hover:opacity-100 transition-opacity"
                >
                  Baca Selengkapnya
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
