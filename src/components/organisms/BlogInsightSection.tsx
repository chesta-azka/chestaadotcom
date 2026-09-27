'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Clock, User } from 'lucide-react';
import { ALL_ARTICLES, type Article } from '../../data/blogData';
import BlurImage, { EDITORIAL_SLATE_BLUR_BASE64, DEFAULT_BLUR_BASE64 } from '../atoms/BlurImage';

// flagships
const FEATURED_SLUG = 'transformasi-digital-bisnis-bsd-city-dan-cisauk';

const SECONDARY_SLUGS = [
  'panduan-arsitektur-nextjs-15-sub-detik-core-web-vitals',
  'the-future-of-ai-automation-for-smes-in-indonesia',
  'ai-agen-mandiri-transformasi-bisnis-2026',
];

export default function BlogInsightSection() {
  // Resolve articles from ALL_ARTICLES
  const featuredArticle: Article | undefined = React.useMemo(() => {
    return ALL_ARTICLES.find(a => a.slug === FEATURED_SLUG);
  }, []);

  const secondaryArticles: Article[] = React.useMemo(() => {
    return SECONDARY_SLUGS
      .map(slug => ALL_ARTICLES.find(a => a.slug === slug))
      .filter((a): a is Article => Boolean(a));
  }, []);

  return (
    <section className="w-full py-20 md:py-28 bg-white border-t border-slate-100" id="blog-insights">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* EDITORIAL MINIMALIST HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-slate-100">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-purple-700 uppercase mb-3">
              <span>Jurnal &amp; Riset Strategis</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-slate-950 leading-tight">
              Wawasan Arsitektur &amp; Strategi Digital
            </h2>

            <p className="text-slate-500 mt-4 text-base font-normal leading-relaxed">
              Koleksi riset ringkas seputar otomatisasi AI, performa web Next.js sub-detik, dan dominasi era pencarian modern.
            </p>
          </div>

          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-purple-700 hover:text-purple-900 group cursor-pointer self-start md:self-end shrink-0 transition-colors"
          >
            <span>Buka Seluruh Artikel</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* HYBRID LAYOUT: LARGE FEATURED CARD & SECONDARY LIST */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: LARGE FEATURED CARD (lg:col-span-7) */}
          <div className="lg:col-span-7">
            {featuredArticle && (
              <motion.article
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group flex flex-col bg-white rounded-2xl border border-slate-100 hover:border-slate-200 transition-all duration-300 overflow-hidden"
              >
                {/* Image Section with Custom Blur-Up Placeholder & Zero Layout Shift */}
                <div className="aspect-video w-full relative overflow-hidden bg-slate-50">
                  <BlurImage
                    src={featuredArticle.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop'}
                    alt={featuredArticle.title}
                    aspectRatio="16/9"
                    blurDataURL={EDITORIAL_SLATE_BLUR_BASE64}
                    priority={true}
                    className="group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Content Section */}
                <div className="p-8 flex flex-col justify-between flex-1">
                  <div>
                    {/* Unboxed Zero-Pill Metadata with Reading Time & Author Attribution */}
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500 tracking-wider mb-4">
                      <span className="uppercase text-purple-800 font-medium">{featuredArticle.cat || 'Transformasi Digital'}</span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className="inline-flex items-center gap-1.5 text-slate-600">
                        <Clock size={12} className="text-slate-400 shrink-0" />
                        <span>{featuredArticle.readTime || `${featuredArticle.readTimeMinutes || 10} MIN READ`}</span>
                      </span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className="inline-flex items-center gap-1.5 text-slate-600">
                        <User size={12} className="text-slate-400 shrink-0" />
                        <span>{featuredArticle.author?.name || 'Chesta Azka Sofyan'}</span>
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-medium text-slate-900 leading-snug tracking-tight mb-3 group-hover:text-purple-800 transition-colors">
                      <Link to={`/blog/${featuredArticle.slug}`}>
                        {featuredArticle.title}
                      </Link>
                    </h3>

                    <p className="text-slate-500 text-sm leading-relaxed font-sans font-normal mb-6">
                      {featuredArticle.desc}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                      <span>{featuredArticle.date}</span>
                      <span aria-hidden="true" className="text-slate-200">·</span>
                      <span className="text-slate-500">{featuredArticle.author?.role || 'Principal Architect'}</span>
                    </div>
                    <Link
                      to={`/blog/${featuredArticle.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase text-purple-700 hover:text-purple-900 group/link cursor-pointer transition-colors"
                    >
                      <span>Mulai Membaca</span>
                      <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            )}
          </div>

          {/* RIGHT: SECONDARY LIST (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col space-y-8">
            <h3 className="text-xs font-mono tracking-widest text-slate-400 uppercase border-b border-slate-100 pb-3">
              Riset Tambahan Pilihan
            </h3>

            <div className="space-y-6">
              {secondaryArticles.map((article, idx) => (
                <motion.article
                  key={article.slug}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="group flex gap-5 pb-6 border-b border-slate-100 last:border-0 last:pb-0"
                >
                  {/* Square Photo Left with Blur-Up Placeholder & Zero Layout Shift */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-slate-50 shrink-0 relative border border-slate-100">
                    <BlurImage
                      src={article.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop'}
                      alt={article.title}
                      aspectRatio="1/1"
                      blurDataURL={DEFAULT_BLUR_BASE64}
                      className="group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </div>

                  {/* Text Details Right */}
                  <div className="flex flex-col justify-between flex-1 min-w-0 py-1">
                    <div>
                      {/* Unboxed Zero-Pill Metadata with Reading Time */}
                      <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-slate-400 tracking-wider mb-2">
                        <span className="uppercase text-purple-700 font-medium">{article.cat || 'Next.js & Performa'}</span>
                        <span aria-hidden="true" className="text-slate-300">·</span>
                        <span className="inline-flex items-center gap-1 text-slate-500">
                          <Clock size={11} className="text-slate-400 shrink-0" />
                          <span>{article.readTime || `${article.readTimeMinutes || 6} MIN READ`}</span>
                        </span>
                      </div>

                      <h4 className="text-sm sm:text-base font-medium text-slate-900 group-hover:text-purple-700 transition-colors leading-snug tracking-tight line-clamp-2 mb-2">
                        <Link to={`/blog/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h4>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
                      {/* Author Attribution with subtle icon */}
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <User size={11} className="text-slate-400 shrink-0" />
                        <span className="truncate max-w-[130px]">{article.author?.name || 'Chesta Azka'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 hidden sm:inline">{article.date}</span>
                        <Link
                          to={`/blog/${article.slug}`}
                          className="inline-flex items-center gap-0.5 text-purple-700 hover:text-purple-900 group/link transition-colors"
                        >
                          <span>Baca</span>
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

        </div>

        {/* BOTTOM MINIMALIST ACTION BAR */}
        <div className="mt-16 text-center pt-10 border-t border-slate-100">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white text-xs font-mono font-medium tracking-widest uppercase shadow-sm hover:shadow transition-all group border border-slate-950 cursor-pointer"
          >
            <span>Jelajahi Seluruh Jurnal Riset</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
