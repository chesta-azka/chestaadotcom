import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Clock, Calendar, Tag, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { Article, ALL_ARTICLES } from '../../data/blogData';
import LazyImage from '../atoms/LazyImage';

export interface ScoredArticle {
  article: Article;
  score: number;
  matchedTags: string[];
  relevancePercent: number;
}

export function computeRelatedArticles(current: Article, all: Article[] = ALL_ARTICLES, limit = 3): ScoredArticle[] {
  const currentTags = (current.tags || []).map((t) => t.toLowerCase().trim());
  const currentCategory = current.cat.toLowerCase().trim();

  const scored: ScoredArticle[] = all
    .filter((a) => a.slug !== current.slug)
    .map((candidate) => {
      let score = 0;
      const matchedTags: string[] = [];
      const candidateTags = (candidate.tags || []).map((t) => t.trim());

      // 1. Tag matching: exact or partial
      candidateTags.forEach((tag) => {
        const lowerTag = tag.toLowerCase();
        if (currentTags.includes(lowerTag)) {
          score += 4; // High weight for exact tag match
          matchedTags.push(tag);
        } else if (currentTags.some((ct) => ct.includes(lowerTag) || lowerTag.includes(ct))) {
          score += 2; // Medium weight for partial tag match
          matchedTags.push(tag);
        }
      });

      // 2. Category matching
      if (candidate.cat.toLowerCase().trim() === currentCategory) {
        score += 2.5;
      }

      // 3. Keyword matching between title & description
      const currentWords = `${current.title} ${current.desc}`
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .split(/\s+/)
        .filter((w) => w.length > 3);

      const candidateWords = `${candidate.title} ${candidate.desc}`
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .split(/\s+/)
        .filter((w) => w.length > 3);

      const sharedWords = currentWords.filter((w) => candidateWords.includes(w));
      score += Math.min(sharedWords.length * 0.4, 3);

      // 4. Boost featured/recommended articles slightly
      if (candidate.featured) score += 1;
      if (candidate.recommended) score += 0.5;

      // Calculate calculated relevance percentage (65% to 99%)
      const basePercentage = Math.min(Math.round(62 + score * 4.2), 99);

      return {
        article: candidate,
        score,
        matchedTags: Array.from(new Set(matchedTags)),
        relevancePercent: basePercentage,
      };
    });

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, limit);
}

interface ReadNextSectionProps {
  currentArticle: Article;
  allArticles?: Article[];
}

export default function ReadNextSection({ currentArticle, allArticles = ALL_ARTICLES }: ReadNextSectionProps) {
  const recommendations = useMemo(
    () => computeRelatedArticles(currentArticle, allArticles, 3),
    [currentArticle, allArticles]
  );

  const topTags = currentArticle.tags?.slice(0, 4) || [];

  if (recommendations.length === 0) return null;

  return (
    <section className="mt-24 pt-16 border-t-2 border-slate-200/80">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200/80 text-purple-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles size={14} className="text-purple-600 animate-pulse" />
            <span>Related Articles &bull; Rekomendasi Cerdas</span>
          </div>
          <h3 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-slate-950 tracking-tight">
            Artikel Terkait Lainnya
          </h3>
          <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed">
            Artikel pilihan yang relevan secara kontekstual dengan fokus riset{' '}
            <span className="font-semibold text-purple-900">
              {topTags.map((t) => `#${t}`).join(', ') || currentArticle.cat}
            </span>
            .
          </p>
        </div>

        <Link
          to="/blog"
          className="inline-flex items-center gap-2 font-display text-xs sm:text-sm font-black text-purple-700 hover:text-purple-950 uppercase tracking-widest bg-white hover:bg-purple-50/80 border border-purple-200 px-5 py-2.5 rounded-full transition-all duration-300 shadow-2xs hover:shadow-md shrink-0 self-start md:self-auto"
        >
          <BookOpen size={16} /> Semua Jurnal <ArrowRight size={16} />
        </Link>
      </div>

      {/* Recommended Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map(({ article, matchedTags, relevancePercent }, index) => {
          return (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex"
            >
              <Link
                to={`/blog/${article.slug}`}
                className="group flex flex-row w-full bg-white rounded-2xl border border-slate-200/90 hover:border-purple-400/80 shadow-sm hover:shadow-xl hover:shadow-purple-900/5 transition-all duration-400 overflow-hidden relative p-4 gap-4"
              >
                {/* Small Strategic Thumbnail */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-slate-900 shrink-0 shadow-inner">
                  {article.image ? (
                    <LazyImage
                      src={article.image}
                      blurSrc={article.image + '?w=20&blur=10'}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-900 to-indigo-950 flex items-center justify-center">
                      <Layers className="text-purple-300/40" size={24} />
                    </div>
                  )}
                  
                  {/* Category Accent Stripe */}
                  <div className="absolute bottom-0 inset-x-0 h-1 bg-purple-600 group-hover:h-2 transition-all" />
                </div>

                {/* Card Content Body - Focused & Compact */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[9px] font-mono font-black text-purple-700 uppercase tracking-widest bg-purple-50 px-2 py-0.5 rounded border border-purple-100">
                        {article.cat}
                      </span>
                      <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                        {relevancePercent}% Match
                      </span>
                    </div>

                    <h4 className="font-display font-black text-sm sm:text-base text-slate-900 leading-tight group-hover:text-purple-700 transition-colors line-clamp-2">
                      {article.title}
                    </h4>

                    <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                      <Clock size={10} className="text-purple-400" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
                        {article.author?.avatar ? (
                          <img src={article.author.avatar} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[8px] font-bold text-slate-400">CA</div>
                        )}
                      </div>
                      <span className="text-[10px] font-semibold text-slate-600 truncate">{article.author?.name?.split(' ')[0]}</span>
                    </div>
                    
                    <ArrowRight size={12} className="text-purple-300 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Topic Explore Bar */}
      <div className="mt-10 p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-slate-700 text-xs sm:text-sm font-medium">
          <Tag size={16} className="text-purple-600 shrink-0" />
          <span>Eksplorasi artikel berdasarkan tag:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {Array.from(
            new Set(
              ALL_ARTICLES.flatMap((a) => a.tags || []).slice(0, 6)
            )
          ).map((tag, idx) => (
            <Link
              key={idx}
              to="/blog"
              className="text-xs font-medium text-slate-600 hover:text-purple-700 bg-white hover:bg-purple-50 border border-slate-200 hover:border-purple-200 px-3 py-1.5 rounded-full transition-all duration-200"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
