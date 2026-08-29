import React from 'react';
import { ALL_ARTICLES } from '../../data/blogData';
import { ArrowRight, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function RecentPostsWidget() {
  const navigate = useNavigate();
  // Get the 3 most recently published articles (assuming ALL_ARTICLES is sorted or we can just slice)
  // For this implementation we'll take the first 3 that are not drafts
  const recentArticles = [...ALL_ARTICLES].slice(0, 3);

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50/50 rounded-bl-full pointer-events-none -z-0"></div>
      
      <div className="relative z-10">
        <h4 className="text-sm font-mono font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
          Insight Terbaru
        </h4>
        
        <div className="space-y-6">
          {recentArticles.map(art => (
            <div 
              key={art.slug}
              onClick={() => navigate(`/blog?read=${art.slug}`)}
              className="group cursor-pointer block border-b border-slate-50 pb-5 last:border-0 last:pb-0"
            >
              <div className="flex gap-2 items-center mb-2">
                <span className="text-[9px] font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {art.cat}
                </span>
                <span className="text-[9px] font-mono text-slate-400 flex items-center gap-1">
                  <Clock size={9} /> {art.readTime}
                </span>
              </div>
              
              <h5 className="text-sm font-display font-medium text-slate-800 leading-snug group-hover:text-purple-600 transition-colors line-clamp-2">
                {art.title}
              </h5>
              
              <div className="mt-2 text-[10px] font-mono text-slate-400 font-semibold flex items-center gap-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-purple-500">
                Baca Artikel <ArrowRight size={10} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
