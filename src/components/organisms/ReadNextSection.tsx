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
            <span>Rekomendasi Cerdas &bull; Read Next</span>
          </div>
          <h3 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-slate-950 tracking-tight">
            Lanjutkan Membaca Topik Terkait
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
          className="inline-flex items-center gap-2 font-display text-xs sm:text-sm font-bold text-purple-700 hover:text-purple-950 uppercase tracking-widest bg-white hover:bg-purple-50/80 border border-purple-200 px-5 py-2.5 rounded-full transition-all duration-300 shadow-2xs hover:shadow-md shrink-0 self-start md:self-auto"
        >
          <BookOpen size={16} /> Semua Jurnal <ArrowRight size={16} />
        </Link>
      </div>

      {/* Recommended Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recommendations.map(({ article, matchedTags, relevancePercent }, index) => {
          const isPrimary = index === 0;

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
                className="group flex flex-col w-full bg-white rounded-3xl border border-slate-200/90 hover:border-purple-400/80 shadow-md hover:shadow-2xl hover:shadow-purple-900/10 transition-all duration-400 overflow-hidden relative"
              >
                {/* Visual Cover Header */}
                <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-slate-900">
                  {article.image ? (
                    <LazyImage
                      src={article.image}
                      blurSrc={article.image + '?w=20&blur=10'}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-900 to-indigo-950 flex items-center justify-center">
                      <Layers className="text-purple-300/40" size={48} />
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

                  {/* Badges on Image */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
                    <span className="text-[10px] font-mono font-bold text-white bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full uppercase tracking-wider border border-white/20">
                      {article.cat}
                    </span>

                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-300 bg-emerald-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-500/40 shadow-sm">
                      <Sparkles size={11} className="text-emerald-400" />
                      {relevancePercent}% Relevan
                    </span>
                  </div>

                  {/* Reading time indicator */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white/90 text-xs font-sans z-10">
                    <span className="flex items-center gap-1.5 drop-shadow-sm font-medium">
                      <Clock size={13} className="text-purple-300" />
                      {article.readTime}
                    </span>
                    <span className="flex items-center gap-1.5 drop-shadow-sm text-slate-300 text-[11px]">
                      <Calendar size={13} />
                      {article.date}
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    {/* Shared / Matched Topic Tags */}
                    {matchedTags.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider flex items-center gap-1 mr-1">
                          <Tag size={10} /> Topik Sama:
                        </span>
                        {matchedTags.slice(0, 2).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] font-medium bg-purple-50 text-purple-800 border border-purple-200/80 px-2 py-0.5 rounded-md font-sans"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Title */}
                    <h4 className="font-display font-bold text-lg sm:text-xl text-slate-900 leading-snug group-hover:text-purple-700 transition-colors line-clamp-2">
                      {article.title}
                    </h4>

                    {/* Excerpt */}
                    <p className="text-slate-600 font-sans text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {article.desc}
                    </p>
                  </div>

                  {/* Card Footer: Author & Action */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 mt-auto">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-full bg-purple-100 ring-2 ring-purple-50 text-purple-800 font-bold flex items-center justify-center text-[10px] shrink-0 overflow-hidden">
                        {article.author?.avatar ? (
                          <img
                            src={article.author.avatar}
                            alt={article.author.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          (article.author?.name || 'C').charAt(0)
                        )}
                      </div>
                      <span className="text-xs font-semibold text-slate-700 truncate font-sans">
                        {article.author?.name || 'Chesta Azka'}
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-1 text-xs font-bold text-purple-700 group-hover:text-purple-950 group-hover:translate-x-1 transition-all shrink-0">
                      <span>Baca</span>
                      <ArrowRight size={14} />
                    </div>
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
