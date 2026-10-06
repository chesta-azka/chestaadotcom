import React from 'react';
import Link from 'next/link';
import { ALL_ARTICLES } from '../../data/blogData';
import { ArrowRight, Clock } from 'lucide-react';

interface RelatedArticlesProps {
  currentSlug: string;
  category: string;
}

export default function RelatedArticles({ currentSlug, category }: RelatedArticlesProps) {
  // Filter articles by category, excluding current post
  const related = ALL_ARTICLES.filter(
    (art) => art.slug !== currentSlug && art.cat.toLowerCase() === category.toLowerCase()
  ).slice(0, 3);

  // Fallback if not enough in same category
  const fallback = ALL_ARTICLES.filter((art) => art.slug !== currentSlug).slice(0, 3);
  const displayArticles = related.length >= 3 ? related : fallback;

  if (displayArticles.length === 0) return null;

  return (
    <div className="pt-12 mt-12 border-t border-slate-200 space-y-8 font-sans">
      <div className="space-y-2">
        <h3 className="text-2xl font-extrabold tracking-tight text-slate-950">
          Artikel Terkait &amp; <b>Rekomendasi Wawasan</b>
        </h3>
        <p className="text-sm text-slate-600">
          Lanjutkan eksplorasi strategi arsitektur sistem dan otomasi AI enterprise.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayArticles.map((art) => (
          <Link
            key={art.slug}
            href={`/blog/${art.slug}`}
            className="rounded-2xl bg-white border border-slate-200/90 shadow-sm p-6 flex flex-col justify-between hover:border-indigo-500 hover:shadow-md transition-all group cursor-pointer"
          >
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200 font-bold">
                {art.cat}
              </span>
              <h4 className="text-base font-bold text-slate-950 group-hover:text-indigo-600 transition-colors line-clamp-2">
                {art.title}
              </h4>
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {art.desc}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
              <span className="flex items-center gap-1"><Clock size={12} /> {art.readTime}</span>
              <span className="text-indigo-600 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Baca</span>
                <ArrowRight size={12} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
