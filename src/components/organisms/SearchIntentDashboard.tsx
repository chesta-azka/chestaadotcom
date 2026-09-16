import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Target,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  Search,
  HelpCircle,
  FileCode,
  Tag,
  BarChart3,
  Lightbulb,
  Check,
  ChevronRight,
  Info,
  Layers,
  FileText
} from 'lucide-react';
import { ALL_ARTICLES, Article } from '../../data/blogData';
import {
  analyzeAllArticles,
  SearchIntentAnalysis,
  SearchIntentType
} from '../../utils/searchIntentAnalyzer';
import toast from 'react-hot-toast';

export default function SearchIntentDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIntentFilter, setSelectedIntentFilter] = useState<string>('ALL');
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string>(
    ALL_ARTICLES[0]?.slug || ''
  );
  const [copiedTagKey, setCopiedTagKey] = useState<string | null>(null);

  // Analyze all articles
  const analyzedArticles = useMemo(() => {
    return analyzeAllArticles(ALL_ARTICLES);
  }, []);

  // Filtered list
  const filteredArticles = useMemo(() => {
    return analyzedArticles.filter((item) => {
      const matchQuery =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.targetKeyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchIntent =
        selectedIntentFilter === 'ALL' ||
        item.primaryIntent === selectedIntentFilter;

      return matchQuery && matchIntent;
    });
  }, [analyzedArticles, searchQuery, selectedIntentFilter]);

  // Active selected article
  const activeArticle = useMemo(() => {
    return (
      analyzedArticles.find((a) => a.slug === selectedArticleSlug) ||
      analyzedArticles[0]
    );
  }, [analyzedArticles, selectedArticleSlug]);

  // Overall Statistics
  const stats = useMemo(() => {
    const total = analyzedArticles.length;
    const intentCounts: Record<SearchIntentType, number> = {
      Informational: 0,
      Commercial: 0,
      Transactional: 0,
      Navigational: 0
    };

    let totalScore = 0;
    let snippetReadyCount = 0;

    analyzedArticles.forEach((a) => {
      intentCounts[a.primaryIntent] = (intentCounts[a.primaryIntent] || 0) + 1;
      totalScore += a.snippetReadinessScore;
      if (a.snippetReadinessScore >= 80) snippetReadyCount++;
    });

    const averageScore = total > 0 ? Math.round(totalScore / total) : 0;

    return {
      total,
      intentCounts,
      averageScore,
      snippetReadyCount
    };
  }, [analyzedArticles]);

  const copyToClipboard = (text: string, key: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTagKey(key);
    toast.success(`${label} disalin ke clipboard!`);
    setTimeout(() => setCopiedTagKey(null), 2500);
  };

  const getIntentBadgeStyle = (intent: SearchIntentType) => {
    switch (intent) {
      case 'Informational':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Commercial':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Transactional':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Navigational':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-semibold">
              <Sparkles size={13} className="text-purple-600" />
              <span>AEO & Featured Snippet Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-black text-slate-900 tracking-tight">
              Search Intent & QAR Meta-Tag Generator
            </h1>
            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
              Lacak intent pencarian setiap artikel blog, automasi meta-tag bersandar pada struktur 
              <strong className="text-purple-700 font-semibold"> Question-Answer-Reasoning (QAR)</strong>, 
              dan optimalkan konten agar terpilih sebagai Google Featured Snippet (Answer Box).
            </p>
          </div>

          {/* Aggregate Readiness Score */}
          <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 p-4 rounded-xl shrink-0">
            <div className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center font-display font-black text-lg shadow-md">
              {stats.averageScore}%
            </div>
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Average Snippet Readiness
              </div>
              <div className="text-sm font-semibold text-slate-900">
                {stats.snippetReadyCount} dari {stats.total} artikel optimal (≥80%)
              </div>
            </div>
          </div>
        </div>

        {/* Intent Distribution Summary Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-100">
          {(['Informational', 'Commercial', 'Transactional', 'Navigational'] as SearchIntentType[]).map(
            (intent) => {
              const count = stats.intentCounts[intent];
              const percent = Math.round((count / (stats.total || 1)) * 100);
              const isActive = selectedIntentFilter === intent;

              return (
                <button
                  key={intent}
                  onClick={() =>
                    setSelectedIntentFilter(isActive ? 'ALL' : intent)
                  }
                  className={`p-3 rounded-xl border text-left transition-all ${
                    isActive
                      ? 'bg-purple-50/70 border-purple-300 ring-2 ring-purple-500/20'
                      : 'bg-white hover:bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-700">
                      {intent}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getIntentBadgeStyle(
                        intent
                      )}`}
                    >
                      {count} post
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-2">
                    <div
                      className="bg-purple-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </button>
              );
            }
          )}
        </div>
      </div>

      {/* Main Grid: Articles Table / Master-Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Article List & Search (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[780px]">
          {/* Controls Bar */}
          <div className="p-4 border-b border-slate-200 bg-slate-50 space-y-3">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari artikel, keyword, atau kategori..."
                className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs font-sans text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-medium">
                Menampilkan {filteredArticles.length} artikel
              </span>
              {selectedIntentFilter !== 'ALL' && (
                <button
                  onClick={() => setSelectedIntentFilter('ALL')}
                  className="text-purple-600 hover:text-purple-800 font-semibold underline"
                >
                  Reset Filter ({selectedIntentFilter})
                </button>
              )}
            </div>
          </div>

          {/* List Items */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 custom-scrollbar">
            {filteredArticles.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                Tidak ada artikel yang cocok dengan kriteria pencarian.
              </div>
            ) : (
              filteredArticles.map((item) => {
                const isSelected = item.slug === activeArticle?.slug;
                const isHighReady = item.snippetReadinessScore >= 80;

                return (
                  <button
                    key={item.slug}
                    onClick={() => setSelectedArticleSlug(item.slug)}
                    className={`w-full text-left p-4 transition-all flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'bg-purple-50/80 border-l-4 border-purple-600'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getIntentBadgeStyle(
                            item.primaryIntent
                          )}`}
                        >
                          {item.primaryIntent}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400 truncate">
                          {item.category}
                        </span>
                      </div>
                      <h4
                        className={`text-xs sm:text-sm font-bold line-clamp-2 leading-snug ${
                          isSelected ? 'text-purple-900' : 'text-slate-800'
                        }`}
                      >
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 truncate font-mono">
                        Target: <span className="text-slate-700 font-semibold">"{item.targetKeyword}"</span>
                      </p>
                    </div>

                    <div className="flex flex-col items-end shrink-0 gap-1">
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                          isHighReady
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : item.snippetReadinessScore >= 60
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-rose-50 text-rose-700 border-rose-200'
                        }`}
                      >
                        {item.snippetReadinessScore}%
                      </span>
                      <ChevronRight
                        size={14}
                        className={
                          isSelected ? 'text-purple-600' : 'text-slate-300'
                        }
                      />
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: QAR Structure & Automated Meta-Tags Inspector (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {activeArticle ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-6">
              {/* Header Details of Active Article */}
              <div className="border-b border-slate-100 pb-5 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${getIntentBadgeStyle(
                        activeArticle.primaryIntent
                      )}`}
                    >
                      Intent: {activeArticle.primaryIntent}
                    </span>
                    {activeArticle.secondaryIntent && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                        + {activeArticle.secondaryIntent}
                      </span>
                    )}
                    <span className="text-xs font-medium text-slate-500">
                      • {activeArticle.category}
                    </span>
                  </div>

                  <a
                    href={`/blog/${activeArticle.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-600 hover:text-purple-800"
                  >
                    <span>Buka Artikel</span>
                    <ExternalLink size={12} />
                  </a>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                  {activeArticle.title}
                </h2>

                <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
                  <span>Slug: /{activeArticle.slug}</span>
                  <span>•</span>
                  <span>Target: <strong className="text-slate-800">{activeArticle.targetKeyword}</strong></span>
                </div>
              </div>

              {/* Snippet Readiness Metric Bar */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 size={16} className="text-purple-600" />
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                      Featured Snippet Readiness
                    </span>
                  </div>
                  <span
                    className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                      activeArticle.snippetReadinessScore >= 80
                        ? 'bg-emerald-100 text-emerald-800'
                        : activeArticle.snippetReadinessScore >= 60
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {activeArticle.snippetReadinessScore}% —{' '}
                    {activeArticle.snippetReadinessScore >= 80
                      ? 'Optimal untuk Google Answer Box'
                      : 'Perlu Pengayaan Format'}
                  </span>
                </div>

                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      activeArticle.snippetReadinessScore >= 80
                        ? 'bg-emerald-500'
                        : activeArticle.snippetReadinessScore >= 60
                        ? 'bg-amber-500'
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${activeArticle.snippetReadinessScore}%` }}
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 text-[11px] text-slate-600">
                  <div>
                    Format Rekomendasi: <strong className="text-slate-800">{activeArticle.snippetFormat}</strong>
                  </div>
                  <div>
                    Panjang Jawaban: <strong className="text-slate-800">{activeArticle.wordCountInAnswer} kata</strong>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    Rentang Snippet Ideal: <strong className={activeArticle.isAnswerWithinSnippetLength ? 'text-emerald-700' : 'text-amber-700'}>
                      {activeArticle.isAnswerWithinSnippetLength ? 'Sesuai (40-60 kata)' : 'Dapat disesuaikan'}
                    </strong>
                  </div>
                </div>
              </div>

              {/* The QAR Architecture Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <HelpCircle size={18} className="text-purple-600" />
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Question-Answer-Reasoning (QAR) Structure
                  </h3>
                </div>

                <div className="space-y-3">
                  {/* Question */}
                  <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100 space-y-1">
                    <div className="text-[10px] font-bold text-purple-700 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-purple-600" />
                      Question (Snippet Trigger)
                    </div>
                    <p className="text-sm font-bold text-purple-950 font-display">
                      {activeArticle.qar.question}
                    </p>
                  </div>

                  {/* Answer */}
                  <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-600" />
                        Answer (Direct Snippet Answer • {activeArticle.wordCountInAnswer} kata)
                      </div>
                      <span className="text-[10px] text-emerald-600 font-mono">
                        Target: ~40-60 words
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {activeArticle.qar.answer}
                    </p>
                  </div>

                  {/* Reasoning */}
                  <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 space-y-1">
                    <div className="text-[10px] font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                      Reasoning (SGE / Answer Engine Proof)
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">
                      {activeArticle.qar.reasoning}
                    </p>
                  </div>
                </div>
              </div>

              {/* Automated Meta-Tags Generator Output */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileCode size={18} className="text-purple-600" />
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                      Auto-Generated Featured Snippet Meta-Tags
                    </h3>
                  </div>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        JSON.stringify(activeArticle.generatedMetaTags, null, 2),
                        'all-json',
                        'Seluruh Konfigurasi Meta-Tags'
                      )
                    }
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-lg border border-purple-200 transition-colors cursor-pointer"
                  >
                    {copiedTagKey === 'all-json' ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                    <span>{copiedTagKey === 'all-json' ? 'Disalin!' : 'Salin Semua (JSON)'}</span>
                  </button>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  {/* Meta Title */}
                  <div className="bg-slate-900 text-slate-200 p-3.5 rounded-xl flex items-start justify-between gap-3">
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">
                        &lt;title&gt; (Snippet Aligned)
                      </div>
                      <div className="text-xs text-white truncate">
                        {activeArticle.generatedMetaTags.metaTitle}
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          activeArticle.generatedMetaTags.metaTitle,
                          'title',
                          'Meta Title'
                        )
                      }
                      className="text-slate-400 hover:text-white p-1"
                      title="Salin Title"
                    >
                      {copiedTagKey === 'title' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    </button>
                  </div>

                  {/* Meta Description */}
                  <div className="bg-slate-900 text-slate-200 p-3.5 rounded-xl flex items-start justify-between gap-3">
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">
                        &lt;meta name="description"&gt; (QAR Answer Driven)
                      </div>
                      <div className="text-xs text-slate-300 line-clamp-2">
                        {activeArticle.generatedMetaTags.metaDescription}
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          activeArticle.generatedMetaTags.metaDescription,
                          'desc',
                          'Meta Description'
                        )
                      }
                      className="text-slate-400 hover:text-white p-1"
                      title="Salin Description"
                    >
                      {copiedTagKey === 'desc' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    </button>
                  </div>

                  {/* Meta Keywords & Search Intent Tag */}
                  <div className="bg-slate-900 text-slate-200 p-3.5 rounded-xl flex items-start justify-between gap-3">
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">
                        &lt;meta name="keywords" &amp; intent-tags&gt;
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {activeArticle.generatedMetaTags.metaKeywords.map((k, idx) => (
                          <span
                            key={idx}
                            className="bg-slate-800 text-purple-200 px-2 py-0.5 rounded text-[11px]"
                          >
                            {k}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          activeArticle.generatedMetaTags.metaKeywords.join(', '),
                          'keywords',
                          'Meta Keywords'
                        )
                      }
                      className="text-slate-400 hover:text-white p-1"
                      title="Salin Keywords"
                    >
                      {copiedTagKey === 'keywords' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    </button>
                  </div>

                  {/* JSON-LD FAQ / QAR Schema */}
                  <div className="bg-slate-900 text-slate-200 p-3.5 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">
                        JSON-LD FAQPage Snippet Schema
                      </div>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            JSON.stringify(
                              activeArticle.generatedMetaTags.schemaFaq,
                              null,
                              2
                            ),
                            'schema',
                            'Schema.org FAQ JSON-LD'
                          )
                        }
                        className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px]"
                      >
                        {copiedTagKey === 'schema' ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                        <span>{copiedTagKey === 'schema' ? 'Disalin' : 'Salin JSON-LD'}</span>
                      </button>
                    </div>
                    <pre className="text-[11px] text-emerald-400 overflow-x-auto p-2 bg-black/40 rounded-lg max-h-40 custom-scrollbar">
                      {JSON.stringify(
                        activeArticle.generatedMetaTags.schemaFaq,
                        null,
                        2
                      )}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400">
              Pilih salah satu artikel di sebelah kiri untuk melihat hasil analisis intent dan meta-tag QAR.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
