import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Briefcase } from 'lucide-react';
import { ALL_ARTICLES } from '../../data/blogData';
import { caseStudyDB } from '../../lib/caseStudies';
import { motion } from 'motion/react';

interface RelatedInternalLinksProps {
  currentPath: string;
  tags: string[];
}

export default function RelatedInternalLinks({ currentPath, tags }: RelatedInternalLinksProps) {
  // Find related articles
  const relatedArticles = ALL_ARTICLES
    .filter(a => !currentPath.includes(a.slug))
    .map(article => {
      const matchCount = (article.tags || []).filter(t => tags.includes(t)).length;
      return { ...article, matchCount };
    })
    .filter(a => a.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount)
    .slice(0, 2);

  // Find related case studies
  const relatedStudies = caseStudyDB
    .filter(s => !currentPath.includes(s.id.toString()) && !currentPath.includes(s.slug))
    .map(study => {
      const matchCount = (study.tags || []).filter(t => tags.includes(t)).length;
      return { ...study, matchCount };
    })
    .filter(s => s.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount)
    .slice(0, 2);

  if (relatedArticles.length === 0 && relatedStudies.length === 0) return null;

  return (
    <div className="mt-16 pt-12 border-t border-slate-200">
      <div className="flex items-center gap-3 mb-8">
        <h3 className="text-2xl font-display font-black text-slate-900 tracking-tight">
          Eksplorasi Terkait
        </h3>
        <div className="h-px bg-slate-200 flex-1"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {relatedArticles.map((article, idx) => (
          <motion.div 
            key={`article-${article.slug}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <Link 
              to={`/blog/${article.slug}`}
              className="block group bg-white border border-slate-200 hover:border-purple-300 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-purple-900/5 h-full"
            >
              <div className="flex items-center gap-2 mb-3">
                <BookOpen size={16} className="text-purple-600" />
                <span className="text-xs font-bold text-purple-600 uppercase tracking-wider font-mono">Artikel Insight</span>
              </div>
              <h4 className="font-display font-bold text-lg text-slate-900 group-hover:text-purple-700 transition-colors mb-2 line-clamp-2">
                {article.title}
              </h4>
              <p className="text-sm text-slate-500 line-clamp-2 mb-4">
                {article.desc}
              </p>
              <div className="inline-flex items-center gap-1 text-xs font-bold text-purple-700 group-hover:translate-x-1 transition-transform">
                Baca Selengkapnya <ArrowRight size={14} />
              </div>
            </Link>
          </motion.div>
        ))}

        {relatedStudies.map((study, idx) => (
          <motion.div 
            key={`study-${study.id}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (relatedArticles.length + idx) * 0.1 }}
          >
            <Link 
              to={`/case-studies/${study.id}`}
              className="block group bg-slate-900 border border-slate-800 hover:border-purple-500/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-purple-900/20 h-full relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase size={16} className="text-purple-400" />
                  <span className="text-xs font-bold text-purple-400 uppercase tracking-wider font-mono">Studi Kasus</span>
                </div>
                <h4 className="font-display font-bold text-lg text-white group-hover:text-purple-300 transition-colors mb-2 line-clamp-2">
                  {study.title}
                </h4>
                <p className="text-sm text-slate-400 line-clamp-2 mb-4">
                  {study.desc}
                </p>
                <div className="inline-flex items-center gap-1 text-xs font-bold text-purple-400 group-hover:translate-x-1 transition-transform">
                  Lihat Studi Kasus <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
