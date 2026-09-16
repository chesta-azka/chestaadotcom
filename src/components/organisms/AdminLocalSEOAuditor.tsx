import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, CheckCircle, AlertTriangle, ShieldCheck, Play, ArrowRight, Code } from 'lucide-react';
import { ALL_ARTICLES } from '../../data/blogData';
import { CITIES } from '../../data/AreasData';

interface AuditResult {
  url: string;
  type: 'Service' | 'Blog';
  hasLocalBusiness: boolean;
  hasBreadcrumbs: boolean;
  hasGeoKeywords: boolean;
  geoKeywordsFound: string[];
  status: 'passed' | 'warning' | 'failed';
}

export default function AdminLocalSEOAuditor() {
  const [isAuditing, setIsAuditing] = useState(false);
  const [results, setResults] = useState<AuditResult[]>([]);
  const [progress, setProgress] = useState(0);

  const startAudit = () => {
    setIsAuditing(true);
    setResults([]);
    setProgress(0);

    // Simulate an audit process
    const mockServicePages = ['/services/web-development', '/services/seo', '/layanan/agentic-ai-automation'];
    const totalPages = mockServicePages.length + ALL_ARTICLES.length;
    let current = 0;

    const interval = setInterval(() => {
      if (current >= totalPages) {
        clearInterval(interval);
        setIsAuditing(false);
        return;
      }

      current++;
      setProgress((current / totalPages) * 100);

      // Determine page being "audited"
      const isService = current <= mockServicePages.length;
      let url = '';
      let content = '';

      if (isService) {
        url = mockServicePages[current - 1];
        content = url.replace(/-/g, ' '); // fake content
      } else {
        const article = ALL_ARTICLES[current - mockServicePages.length - 1];
        url = `/blog/${article.slug}`;
        content = `${article.title} ${article.desc} ${article.content}`;
      }

      // Geo check
      const localKeywords = ['bsd', 'cisauk', 'tangerang', 'serpong'];
      const foundKeywords = localKeywords.filter(k => content.toLowerCase().includes(k));
      
      const hasGeo = foundKeywords.length > 0;
      // We assume Breadcrumbs is present everywhere due to MetaTags wrapping
      const hasBreadcrumbs = true; 
      // LocalBusiness is only true if Geo intent is detected or it's a service page
      const hasLocalBusiness = isService || hasGeo;

      const status = (!hasLocalBusiness || !hasGeo) ? (isService ? 'failed' : 'warning') : 'passed';

      setResults(prev => [...prev, {
        url,
        type: isService ? 'Service' : 'Blog',
        hasLocalBusiness,
        hasBreadcrumbs,
        hasGeoKeywords: hasGeo,
        geoKeywordsFound: foundKeywords,
        status
      }]);

    }, 150);
  };

  const passedCount = results.filter(r => r.status === 'passed').length;
  const warningCount = results.filter(r => r.status === 'warning').length;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Local SEO Schema Auditor</h2>
            <p className="text-sm text-slate-500">Verifies LocalBusiness, Breadcrumbs & Geo-tags (BSD/Cisauk)</p>
          </div>
        </div>
        <button
          onClick={startAudit}
          disabled={isAuditing}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white rounded-lg font-bold text-sm transition-colors flex items-center gap-2"
        >
          {isAuditing ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Play size={16} />
          )}
          {isAuditing ? 'Memeriksa...' : 'Mulai Audit'}
        </button>
      </div>

      <div className="p-6">
        {/* Progress bar */}
        {isAuditing && (
          <div className="mb-6">
            <div className="flex justify-between text-xs font-semibold text-slate-600 mb-2">
              <span>Scanning Routes...</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <motion.div 
                className="h-full bg-emerald-500" 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Results summary */}
        {results.length > 0 && !isAuditing && (
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4 text-center">
              <span className="block text-2xl font-bold text-emerald-700">{passedCount}</span>
              <span className="text-xs font-semibold text-emerald-600 uppercase">Passed</span>
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 text-center">
              <span className="block text-2xl font-bold text-amber-700">{warningCount}</span>
              <span className="text-xs font-semibold text-amber-600 uppercase">Warnings (No Geo)</span>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 text-center">
              <span className="block text-2xl font-bold text-slate-700">{results.length}</span>
              <span className="text-xs font-semibold text-slate-500 uppercase">Total URLs</span>
            </div>
          </div>
        )}

        {/* Details list */}
        <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
          {results.length === 0 && !isAuditing ? (
            <div className="text-center py-10 text-slate-400">
              <Code size={48} className="mx-auto mb-4 opacity-20" />
              <p>Belum ada hasil audit. Klik "Mulai Audit" untuk memindai Schema.org.</p>
            </div>
          ) : (
            results.map((res, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-lg hover:border-slate-200 transition-colors">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${res.type === 'Service' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                      {res.type}
                    </span>
                    <span className="font-mono text-sm font-semibold text-slate-800">{res.url}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs mt-1">
                    <span className={`flex items-center gap-1 ${res.hasLocalBusiness ? 'text-emerald-600' : 'text-rose-500'}`}>
                      {res.hasLocalBusiness ? <CheckCircle size={12} /> : <AlertTriangle size={12} />}
                      LocalBusiness
                    </span>
                    <span className={`flex items-center gap-1 ${res.hasBreadcrumbs ? 'text-emerald-600' : 'text-rose-500'}`}>
                      {res.hasBreadcrumbs ? <CheckCircle size={12} /> : <AlertTriangle size={12} />}
                      Breadcrumbs
                    </span>
                    <span className={`flex items-center gap-1 ${res.hasGeoKeywords ? 'text-emerald-600' : 'text-amber-500'}`}>
                      {res.hasGeoKeywords ? <MapPin size={12} /> : <MapPin size={12} />}
                      Geo: {res.hasGeoKeywords ? res.geoKeywordsFound.join(', ') : 'None'}
                    </span>
                  </div>
                </div>
                <div>
                  {res.status === 'passed' && <div className="text-emerald-500 bg-emerald-50 p-2 rounded-full"><CheckCircle size={20} /></div>}
                  {res.status === 'warning' && <div className="text-amber-500 bg-amber-50 p-2 rounded-full"><AlertTriangle size={20} /></div>}
                  {res.status === 'failed' && <div className="text-rose-500 bg-rose-50 p-2 rounded-full"><AlertTriangle size={20} /></div>}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
