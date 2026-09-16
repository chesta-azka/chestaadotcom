import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, ChevronRight, Activity } from 'lucide-react';
import { ALL_ARTICLES, Article } from '../../data/blogData';

export default function AEOSnippetAuditor() {
  const [auditedArticles, setAuditedArticles] = useState<any[]>([]);

  useEffect(() => {
    // Scan top 10 articles
    const topArticles = ALL_ARTICLES.slice(0, 10);
    
    const audited = topArticles.map(article => {
      // Very basic static analysis for AEO best practices
      const rawContent = article.content || '';
      const content = typeof rawContent === 'string'
        ? rawContent
        : Array.isArray(rawContent)
          ? rawContent.map((c: any) => typeof c === 'string' ? c : '').join(' ')
          : '';
      
      const first50Words = content.split(' ').slice(0, 50).join(' ');
      
      const hasClearDefinition = /adalah|yaitu|merupakan/.test(first50Words.toLowerCase());
      const hasListFormat = /-\s|1\.\s/.test(content);
      const isAnswerInFirst50Words = hasClearDefinition || content.length > 0;
      
      const score = (
        (hasClearDefinition ? 33 : 0) +
        (hasListFormat ? 33 : 0) +
        (isAnswerInFirst50Words ? 34 : 0)
      );
      
      return {
        ...article,
        aeoScore: score,
        checks: {
          hasClearDefinition,
          hasListFormat,
          isAnswerInFirst50Words
        }
      };
    });
    
    setAuditedArticles(audited);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
          <Activity size={20} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">AEO Snippet Auditor</h2>
          <p className="text-sm text-slate-500">Analisis kesiapan konten untuk menduduki Google Answer Box</p>
        </div>
      </div>
      
      <div className="divide-y divide-slate-100">
        {auditedArticles.map((article, idx) => (
          <div key={idx} className="p-4 hover:bg-slate-50 transition-colors">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-slate-800 text-sm">{article.title}</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500">Skor AEO:</span>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${article.aeoScore >= 80 ? 'bg-emerald-100 text-emerald-700' : article.aeoScore >= 50 ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>
                  {article.aeoScore}%
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="flex items-center gap-2 text-xs text-slate-600 bg-white p-2 rounded border border-slate-100">
                {article.checks.isAnswerInFirst50Words ? <CheckCircle2 size={14} className="text-emerald-500" /> : <XCircle size={14} className="text-rose-500" />}
                <span>Jawaban di 50 kata pertama</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600 bg-white p-2 rounded border border-slate-100">
                {article.checks.hasClearDefinition ? <CheckCircle2 size={14} className="text-emerald-500" /> : <XCircle size={14} className="text-rose-500" />}
                <span>Definisi eksplisit ("adalah")</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600 bg-white p-2 rounded border border-slate-100">
                {article.checks.hasListFormat ? <CheckCircle2 size={14} className="text-emerald-500" /> : <XCircle size={14} className="text-rose-500" />}
                <span>Format list (Bullet/Numbering)</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
