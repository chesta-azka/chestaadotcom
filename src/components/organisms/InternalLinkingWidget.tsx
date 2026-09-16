import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Article } from '../../data/blogData';

interface InternalLinkingWidgetProps {
  currentArticle: Article;
  allArticles: Article[];
}

export default function InternalLinkingWidget({ currentArticle, allArticles }: InternalLinkingWidgetProps) {
  // Find related articles by matching category and tags
  const suggestions = allArticles
    .filter(a => a.slug !== currentArticle.slug)
    .map(article => {
      let score = 0;
      if (article.cat === currentArticle.cat) score += 2;
      const sharedTags = (article.tags || []).filter(t => (currentArticle.tags || []).includes(t));
      score += sharedTags.length;
      return { article, score, sharedTags };
    })
    .filter(a => a.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (suggestions.length === 0) return null;

  return (
    <div className="bg-purple-50/50 border border-purple-100 rounded-2xl p-6 my-10">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen size={18} className="text-purple-600" />
        <h3 className="font-display font-bold text-slate-900 text-lg tracking-tight">Bacaan Terkait: {currentArticle.cat}</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {suggestions.map(({ article }, idx) => (
          <motion.div 
            key={article.slug}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <Link 
              to={`/blog/${article.slug}`}
              className="block group bg-white border border-purple-100 hover:border-purple-300 rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/5 h-full"
            >
              <h4 className="font-display font-bold text-sm text-slate-900 group-hover:text-purple-700 transition-colors line-clamp-2 mb-2">
                {article.title}
              </h4>
              <div className="inline-flex items-center gap-1 text-xs font-bold text-purple-600 group-hover:translate-x-1 transition-transform">
                Baca Artikel <ArrowRight size={12} />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
