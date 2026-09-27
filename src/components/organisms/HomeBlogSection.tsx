'use client';

import React from 'react';
import { motion, type Variants } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  ArrowRight, 
  ArrowUpRight, 
  Clock, 
  Calendar, 
  Sparkles, 
  Tag,
  Zap,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { ALL_ARTICLES, type Article } from '../../data/blogData';

import BlurImage, { EDITORIAL_SLATE_BLUR_BASE64 } from '../atoms/BlurImage';

// Staggered container animation for high-end editorial feel
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

// Rich multi-dimensional entrance animation: depth scale, blur rack-focus, smooth elevation
const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 36,
    scale: 0.94,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function HomeBlogSection() {
  // Select 3 premier articles covering Search Dominance, AI Agents, and Enterprise Automation
  const featuredArticles: Article[] = React.useMemo(() => {
    const slugs = [
      'dominasi-era-pencarian-baru-seo-aeo-geo-untuk-bisnis-digital',
      'evolusi-agentic-ai-ketika-sistem-cerdas-tidak-hanya-menjawab-tapi-mengeksekusi',
      'otomasi-bisnis-panduan-efisiensi-modern',
    ];
    
    const matched = slugs
      .map(slug => ALL_ARTICLES.find(a => a.slug === slug))
      .filter((a): a is Article => Boolean(a));

    // Fallback if any slug isn't found
    if (matched.length < 3) {
      return ALL_ARTICLES.slice(0, 3);
    }
    return matched;
  }, []);

  return (
    <section className="w-full py-16 md:py-24 relative bg-white overflow-hidden" id="blog-insights">
      {/* Background spatial atmospheric glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-purple-200/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-medium mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span className="tracking-widest uppercase">INSIGHT &amp; STRATEGI DIGITAL</span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-slate-950 leading-[1.15] text-balance flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-purple-100/80 border border-purple-200/80 text-purple-900 shadow-xs shrink-0">
              <BookOpen className="w-5 h-5 md:w-6 md:h-6 stroke-[1.8]" />
            </span>
            <span>Strategi &amp; Rekayasa Profit Digital.</span>
          </h2>

          <p className="text-slate-600 mt-4 text-base md:text-lg font-normal max-w-2xl mx-auto leading-relaxed text-balance">
            Eksplorasi mendalam seputar otomatisasi AI, optimasi kecepatan web sub-detik, serta strategi dominasi era pencarian baru (SEO, AEO, &amp; GEO).
          </p>
        </div>

        {/* 3-COLUMN BLOG CARDS GRID */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14"
        >
          {featuredArticles.map((article, idx) => (
            <motion.article
              key={article.slug || idx}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
              className="group flex flex-col bg-white rounded-3xl border border-slate-200/90 hover:border-purple-300 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-purple-900/10 transition-all duration-300 overflow-hidden"
            >
              {/* Card Thumbnail Container with Zero-CLS BlurImage */}
              <div className="relative w-full aspect-video bg-slate-100 overflow-hidden">
                <BlurImage
                  src={article.image || 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop'}
                  alt={article.title}
                  aspectRatio="16/9"
                  blurDataURL={EDITORIAL_SLATE_BLUR_BASE64}
                  className="group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Card Body */}
              <div className="flex flex-col flex-1 p-6 sm:p-7 justify-between">
                <div>
                  {/* Unboxed Zero-Pill Metadata */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500 mb-3 tracking-wider">
                    <span className="uppercase text-purple-800 font-medium">{article.cat || 'Edukasi Bisnis'}</span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span className="inline-flex items-center gap-1 text-slate-500">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{article.readTime || `${article.readTimeMinutes || 10} MIN READ`}</span>
                    </span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span>{article.date}</span>
                  </div>

                  {/* Article Title */}
                  <h3 className="text-xl font-medium text-slate-900 tracking-tight leading-snug group-hover:text-purple-700 transition-colors duration-200 mb-3 line-clamp-2">
                    <Link to={`/blog/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>

                  {/* Excerpt */}
                  <p className="text-slate-600 text-sm leading-relaxed font-normal line-clamp-3 mb-6">
                    {article.desc}
                  </p>
                </div>

                {/* Card Footer: Author + Read Link */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2.5">
                    {article.author?.avatar ? (
                      <img 
                        src={article.author.avatar} 
                        alt={article.author.name}
                        className="w-7 h-7 rounded-full object-cover border border-purple-200 shadow-2xs" 
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-medium">
                        CA
                      </div>
                    )}
                    <span className="text-xs font-medium text-slate-700 truncate max-w-[130px]">
                      {article.author?.name || 'Chesta Azka'}
                    </span>
                  </div>

                  <Link
                    to={`/blog/${article.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-purple-700 hover:text-purple-900 uppercase tracking-wider group/link cursor-pointer"
                  >
                    <span>Baca</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* BOTTOM ACTION BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200/90">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500">
            <span className="font-medium text-slate-700 uppercase tracking-wider flex items-center gap-1.5 mr-2">
              <Tag className="w-3.5 h-3.5 text-purple-600" />
              Topik Populer:
            </span>
            {['#SEO', '#AgenticAI', '#AEO', '#GEO', '#OtomasiBisnis', '#WebSubDetik'].map((tag, idx) => (
              <Link 
                key={idx} 
                to={`/blog?tag=${tag.replace('#', '')}`}
                className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-purple-700 hover:border-purple-200 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>

          <Link
            to="/blog"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-purple-900 hover:bg-purple-800 text-white rounded-xl text-xs font-mono font-medium tracking-wider uppercase shadow-xs hover:shadow transition-all group shrink-0 border border-purple-800 cursor-pointer"
          >
            <span>Buka Semua Artikel &amp; Masterclass</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
