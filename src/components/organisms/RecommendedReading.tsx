import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, BookOpen, Clock, Tag } from 'lucide-react';
import { Article } from '../../data/blogData';
import LazyImage from '../atoms/LazyImage';

interface RecommendedReadingProps {
  currentArticle: Article;
  allArticles: Article[];
}

export default function RecommendedReading({ currentArticle, allArticles }: RecommendedReadingProps) {
  // Logic to find 3-4 recommended articles
  const recommended = allArticles
    .filter(article => article.slug !== currentArticle.slug)
    .map(article => {
      // Calculate relevance score
      let score = 0;
      
      // Common category
      if (article.cat === currentArticle.cat) score += 3;
      
      // Common tags
      const commonTags = article.tags?.filter(tag => currentArticle.tags?.includes(tag)) || [];
      score += commonTags.length * 2;
      
      return { article, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(item => item.article);

  if (recommended.length === 0) return null;

  return (
    <div className="mt-12 pt-12 border-t border-slate-100 lg:mt-0 lg:pt-0 lg:border-t-0">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-1.5 rounded-lg bg-purple-100 text-purple-700">
          <BookOpen size={16} />
        </div>
        <h3 className="font-display font-semibold text-sm tracking-tight text-slate-900">
          Artikel Terkait
        </h3>
      </div>

      <div className="space-y-6">
        {recommended.map((article, idx) => (
          <motion.div
            key={article.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx }}
            className="group relative"
          >
            <Link to={`/blog/${article.slug}`} className="block">
              <div className="flex gap-4 items-start">
                <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-slate-100 shadow-2xs group-hover:border-purple-300 transition-colors">
                  <LazyImage
                    src={article.image || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=200'}
                    blurSrc={article.image || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=20'}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center gap-2 text-[10px] font-medium text-purple-700 uppercase tracking-widest font-mono">
                    <Tag size={10} />
                    {article.cat}
                  </div>
                  <h4 className="text-sm font-display font-medium text-slate-900 leading-snug group-hover:text-purple-700 transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                    <Clock size={10} />
                    {article.readTime}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <Link 
        to="/blog" 
        className="mt-8 flex items-center justify-between p-4 rounded-xl bg-purple-50/40 border border-purple-100 group hover:border-purple-300 hover:bg-white transition-all shadow-xs"
      >
        <div className="space-y-0.5">
          <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest">Lihat Semua</p>
          <p className="text-xs font-medium text-slate-900">Jelajahi Blog Hub</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-white border border-purple-100 flex items-center justify-center text-purple-700 group-hover:bg-purple-600 group-hover:text-white transition-all">
          <ArrowRight size={14} />
        </div>
      </Link>
    </div>
  );
}
