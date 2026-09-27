'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Home, 
  MapPin, 
  Briefcase, 
  FileText, 
  Zap, 
  ChevronRight, 
  LayoutGrid, 
  BookOpen, 
  Sparkles, 
  MessageCircle, 
  Activity, 
  X, 
  Code, 
  History, 
  Trash2, 
  TrendingUp, 
  SlidersHorizontal,
  Building2,
  Cpu,
  Layers,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  ArrowRight,
  CornerDownLeft,
  Compass
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePerformance } from '../../contexts/PerformanceContext.tsx';
import { 
  getSearchEngine, 
  SearchDocument, 
  SearchCategory 
} from '../../lib/searchEngine';
import { 
  searchContentIndex, 
  extractMatchingSnippet, 
  getSearchIndexStats 
} from '../../lib/contentSearchIndex';
import { 
  useSearchAnalytics, 
  analyzeSearchAudience,
  NavigatedPageHistory 
} from '../../hooks/useSearchAnalytics';

interface SearchResultItem extends SearchDocument {
  matchedSnippet?: string;
  score?: number;
  isHistoryItem?: boolean;
  historyTimestamp?: number;
}

function formatRelativeTime(timestamp: number): string {
  if (!timestamp) return 'Baru saja';
  const diffMs = Date.now() - timestamp;
  const diffSec = Math.floor(diffMs / 1000);
  if (diffSec < 45) return 'Baru saja';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin} mnt lalu`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours} jam lalu`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return 'Kemarin';
  if (diffDays < 7) return `${diffDays} hari lalu`;
  return new Date(timestamp).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SearchCategory>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchLatencyMs, setSearchLatencyMs] = useState<number>(0);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  
  const { performanceMode, togglePerformanceMode } = usePerformance();
  const navigate = useNavigate();

  const {
    recentSearches,
    recentNavigatedPages,
    saveRecentSearch,
    saveNavigatedPage,
    removeRecentSearch,
    removeNavigatedPage,
    clearRecentSearches,
    clearRecentNavigatedPages,
    clearAllHistory,
    logSearchQuery,
    logSearchResultClick
  } = useSearchAnalytics();

  // Get initialized Fuse.js engine and static docs
  const { fuse, allDocs } = useMemo(() => {
    return getSearchEngine(performanceMode);
  }, [performanceMode]);

  const openWhatsApp = (customText?: string) => {
    const text = customText || 'Halo Mas Chesta, saya tertarik untuk konsultasi pembuatan website modern di CHESTAADOTCOM.';
    window.open(`https://wa.me/6282125447232?text=${encodeURIComponent(text)}`, '_blank');
  };

  const askAIAssistant = (queryText?: string) => {
    setIsOpen(false);
    const message = queryText ? `Saya ingin konsultasi teknis & estimasi mengenai: "${queryText}"` : undefined;
    window.dispatchEvent(new CustomEvent('open-floating-ai', { detail: { message } }));
  };

  // Helper to extract relevant snippet around matched query
  const extractSnippet = (content: string | undefined, query: string): string | undefined => {
    if (!content || !query) return undefined;
    const lowerContent = content.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const index = lowerContent.indexOf(lowerQuery);
    if (index === -1) return undefined;

    const start = Math.max(0, index - 35);
    const end = Math.min(content.length, index + query.length + 55);
    let snippet = content.substring(start, end).trim();
    if (start > 0) snippet = '...' + snippet;
    if (end < content.length) snippet = snippet + '...';
    return snippet;
  };

  // Matching recent items when searching
  const matchingRecentQueries = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return [];
    return recentSearches.filter(s => s.toLowerCase().includes(q));
  }, [searchQuery, recentSearches]);

  const matchingRecentPages = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return [];
    return recentNavigatedPages.filter(p => 
      p.title.toLowerCase().includes(q) || 
      (p.subtitle && p.subtitle.toLowerCase().includes(q)) ||
      p.path.toLowerCase().includes(q)
    );
  }, [searchQuery, recentNavigatedPages]);

  // Execute search across documentation, or history view
  const searchResults: SearchResultItem[] = useMemo(() => {
    const startTime = performance.now();
    const q = searchQuery.trim();

    let results: SearchResultItem[] = [];

    // CASE 1: User explicitly filtered to 'history'
    if (selectedCategory === 'history') {
      const historyItems: SearchResultItem[] = recentNavigatedPages.map(page => ({
        id: `history_${page.id}`,
        slug: page.path.replace(/\//g, '-'),
        title: page.title,
        subtitle: page.subtitle || page.path,
        category: (page.category as any) || 'Halaman',
        categoryKey: 'history',
        path: page.path,
        badge: page.badge || 'Riwayat Kunjungan',
        isHistoryItem: true,
        historyTimestamp: page.timestamp
      }));

      if (!q) {
        results = historyItems;
      } else {
        const lowerQ = q.toLowerCase();
        results = historyItems.filter(item => 
          item.title.toLowerCase().includes(lowerQ) || 
          item.subtitle.toLowerCase().includes(lowerQ) ||
          (item.path && item.path.toLowerCase().includes(lowerQ))
        );
      }

      const elapsed = Math.round(performance.now() - startTime);
      setSearchLatencyMs(elapsed);
      return results;
    }

    // CASE 2: No search query (Categorized overview)
    if (!q) {
      let docsToFilter = allDocs;
      if (selectedCategory !== 'all') {
        docsToFilter = allDocs.filter(d => d.categoryKey === selectedCategory);
      }

      if (selectedCategory === 'all') {
        const topServices = allDocs.filter(d => d.categoryKey === 'services').slice(0, 3);
        const topProjects = allDocs.filter(d => d.categoryKey === 'portfolio').slice(0, 2);
        const topArticles = allDocs.filter(d => d.categoryKey === 'articles').slice(0, 2);
        const topAreas = allDocs.filter(d => d.id.includes('bsd') || d.id.includes('cisauk')).slice(0, 2);

        results = [
          ...topServices,
          ...topProjects,
          ...topArticles,
          ...topAreas
        ];
      } else {
        results = docsToFilter.slice(0, 10);
      }
    } else {
      // CASE 3: Active search query
      // 1. If any visited pages match query, convert them into prominent top results
      const historyMatches: SearchResultItem[] = matchingRecentPages.map(p => ({
        id: `hist_match_${p.id}`,
        slug: p.path.replace(/\//g, '-'),
        title: p.title,
        subtitle: p.subtitle || p.path,
        category: (p.category as any) || 'Halaman',
        categoryKey: 'history',
        path: p.path,
        badge: 'Riwayat Kunjungan',
        isHistoryItem: true,
        historyTimestamp: p.timestamp,
        score: 0.05
      }));

      // 2. Fuse.js full-text fuzzy search across all application content
      const fuseResults = fuse.search(q, { limit: 25 });

      const filteredFuseResults = fuseResults
        .filter(({ item }) => {
          if (selectedCategory === 'all') return true;
          return item.categoryKey === selectedCategory;
        })
        .map(({ item, score, matches }) => {
          let matchedSnippet = item.subtitle;
          if (matches && matches.length > 0) {
            const contentMatch = matches.find(m => m.key === 'fullContent' || m.key === 'benefits' || m.key === 'subtitle');
            if (contentMatch && contentMatch.value) {
              const snippet = extractMatchingSnippet(contentMatch.value, q) || extractSnippet(contentMatch.value, q);
              if (snippet) matchedSnippet = snippet;
            }
          }
          return {
            ...item,
            matchedSnippet,
            score
          };
        });

      // Avoid duplicate paths between history matches and fuse results
      const historyPaths = new Set(historyMatches.map(h => h.path));
      const deduplicatedFuse = filteredFuseResults.filter(r => !historyPaths.has(r.path));

      results = [...historyMatches, ...deduplicatedFuse];
    }

    const elapsed = Math.round(performance.now() - startTime);
    setSearchLatencyMs(elapsed);
    return results;
  }, [searchQuery, selectedCategory, fuse, allDocs, recentNavigatedPages, matchingRecentPages]);

  // Log queries to search telemetry with audience context
  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      logSearchQuery(searchQuery, searchResults.length, selectedCategory);
    }
  }, [searchQuery, searchResults.length, selectedCategory, logSearchQuery]);

  // Reset keyboard highlight on search change
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery, selectedCategory]);

  const getSearchPlaceholder = () => {
    if (selectedCategory === 'history') return 'Cari di dalam riwayat pencarian & halaman terakhir... (⌘K)';
    if (selectedCategory === 'articles') return 'Cari artikel blog, panduan SEO BSD, insight AI... (⌘K)';
    if (selectedCategory === 'portfolio') return 'Cari proyek, klien B2B, tech stack Next.js, studi kasus... (⌘K)';
    if (selectedCategory === 'services') return 'Cari layanan, paket website UMKM, promo Rp540K... (⌘K)';
    return 'Cari studi kasus, layanan, artikel, wilayah BSD/Cisauk, atau ketik pertanyaan... (⌘K)';
  };

  // Keyboard navigation & global shortcuts
  useEffect(() => {
    const handleOpenCommandPalette = (event?: Event) => {
      const customEvent = event as CustomEvent<{ category?: SearchCategory; query?: string }>;
      if (customEvent?.detail?.category) {
        setSelectedCategory(customEvent.detail.category);
      }
      if (customEvent?.detail?.query !== undefined) {
        setSearchQuery(customEvent.detail.query);
      }
      setIsOpen(true);
      setTimeout(() => {
        inputRef.current?.focus();
        if (customEvent?.detail?.query) {
          inputRef.current?.select();
        }
      }, 50);
    };

    window.addEventListener('open-command-palette', handleOpenCommandPalette);

    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle palette on ⌘K / Ctrl+K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen(prev => {
          const next = !prev;
          if (next) setTimeout(() => inputRef.current?.focus(), 50);
          return next;
        });
        return;
      }

      // Close on Escape
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsOpen(false);
        return;
      }

      // Arrow navigation
      if (isOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex(prev => (prev < searchResults.length - 1 ? prev + 1 : 0));
          return;
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex(prev => (prev > 0 ? prev - 1 : Math.max(0, searchResults.length - 1)));
          return;
        }
        if (e.key === 'Enter') {
          e.preventDefault();
          if (searchResults[selectedIndex]) {
            handleItemClick(searchResults[selectedIndex], selectedIndex);
          } else if (searchQuery.trim()) {
            saveRecentSearch(searchQuery.trim());
          }
          return;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleOpenCommandPalette);
    };
  }, [isOpen, searchResults, selectedIndex, searchQuery, saveRecentSearch]);

  const handleItemClick = (item: SearchDocument, index: number) => {
    setIsOpen(false);

    // Save query if non-empty
    if (searchQuery.trim()) {
      saveRecentSearch(searchQuery.trim());
    }

    // Track click telemetry and audience behavior
    logSearchResultClick({
      item,
      query: searchQuery,
      rankIndex: index,
      categoryFilter: selectedCategory
    });

    if (item.actionType === 'performance') {
      togglePerformanceMode();
    } else if (item.actionType === 'ai') {
      askAIAssistant(searchQuery);
    } else if (item.actionType === 'whatsapp') {
      openWhatsApp();
    } else if (item.path) {
      navigate(item.path);
    }
  };

  const handleRevisitNavigatedPage = (page: NavigatedPageHistory) => {
    setIsOpen(false);
    saveNavigatedPage({
      id: page.id,
      title: page.title,
      subtitle: page.subtitle,
      path: page.path,
      categoryKey: page.categoryKey,
      category: page.category,
      badge: page.badge
    });
    navigate(page.path);
  };

  const handleQuickTagClick = (tag: string) => {
    setSearchQuery(tag);
    saveRecentSearch(tag);
    inputRef.current?.focus();
  };

  const totalHistoryCount = recentSearches.length + recentNavigatedPages.length;

  // Category filter tabs
  const CATEGORY_TABS: { key: SearchCategory; label: string; count?: number }[] = [
    { key: 'all', label: 'Semua' },
    { 
      key: 'history', 
      label: 'Riwayat', 
      count: totalHistoryCount > 0 ? totalHistoryCount : undefined 
    },
    { key: 'services', label: 'Layanan' },
    { key: 'portfolio', label: 'Studi Kasus & Portofolio' },
    { key: 'articles', label: 'Artikel & Insight' },
    { key: 'areas', label: 'Wilayah (BSD/Cisauk)' },
    { key: 'pages', label: 'Navigasi' }
  ];

  // High-intent trending search terms for B2B & local BSD/Cisauk audience
  const POPULAR_SEARCH_TERMS = [
    'Jasa Web Cisauk',
    'Landing Page BSD',
    'High-Speed Web',
    'Promo Rp540K',
    'Integrasi AI Gemini',
    'Studi Kasus Fintech',
    'SEO Google Maps'
  ];

  // Map category to aesthetic lucide icon
  const getCategoryIcon = (categoryKey: SearchCategory, categoryName: string, id: string) => {
    if (categoryKey === 'history' || id.startsWith('history_') || id.startsWith('hist_match_')) return History;
    if (categoryName === 'Fitur') return Activity;
    if (id.includes('promo')) return Sparkles;
    if (categoryKey === 'services') return Zap;
    if (categoryKey === 'portfolio') return Briefcase;
    if (categoryKey === 'articles') return BookOpen;
    if (categoryKey === 'areas') return MapPin;
    return Home;
  };

  const detectedAudience = useMemo(() => {
    return analyzeSearchAudience(searchQuery);
  }, [searchQuery]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          id="command-palette-backdrop"
          className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 pb-6 overflow-y-auto"
        >
          {/* Dimmed Blur Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs"
            onClick={() => setIsOpen(false)}
          />

          {/* Search Dialog Box */}
          <motion.div
            id="command-palette-container"
            initial={{ opacity: 0, scale: 0.98, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -8 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="relative w-full max-w-2xl bg-white rounded-xl shadow-[0_12px_40px_rgba(15,23,42,0.06)] border border-slate-100 overflow-hidden flex flex-col z-10 max-h-[75vh]"
          >
            {/* Top Search Input Bar */}
            <div className="flex items-center px-5 py-4 border-b border-slate-100 bg-white sticky top-0 z-20">
              <Search size={18} className="text-slate-400 mr-3.5 shrink-0" />
              
              <input
                ref={inputRef}
                id="command-palette-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ketik apa saja untuk mencari..."
                className="flex-1 bg-transparent border-none outline-none text-slate-900 placeholder:text-slate-400 font-sans text-sm sm:text-base font-normal"
                autoFocus
              />

              {searchQuery && (
                <button
                  id="btn-clear-search"
                  onClick={() => setSearchQuery('')}
                  className="p-1.5 rounded-full hover:bg-slate-50 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer mr-1"
                  title="Hapus"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Category Filter Tabs with Horizontal Scroll */}
            <div className="flex items-center gap-4 px-5 py-2 border-b border-slate-50 overflow-x-auto no-scrollbar bg-white shrink-0">
              {CATEGORY_TABS.map(tab => {
                const isSelected = selectedCategory === tab.key;
                return (
                  <button
                    key={tab.key}
                    id={`filter-tab-${tab.key}`}
                    onClick={() => setSelectedCategory(tab.key)}
                    className={`text-xs font-normal whitespace-nowrap transition-colors py-1 cursor-pointer relative ${
                      isSelected
                        ? 'text-purple-700 font-medium'
                        : 'text-slate-400 hover:text-slate-800'
                    }`}
                  >
                    <span>{tab.label}</span>
                    {isSelected && (
                      <motion.div 
                        layoutId="activeTabUnderline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* DEDICATED HISTORY VIEW */}
            {selectedCategory === 'history' ? (
              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h4 className="text-sm font-medium text-slate-800">Riwayat Kunjungan &amp; Pencarian</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">Akses cepat ke halaman yang terakhir Anda buka.</p>
                  </div>

                  {totalHistoryCount > 0 && (
                    <button
                      onClick={clearAllHistory}
                      className="text-xs font-normal text-rose-500 hover:text-rose-700 transition-colors cursor-pointer"
                    >
                      Bersihkan Semua
                    </button>
                  )}
                </div>

                {/* Recent Search Queries */}
                <div>
                  <h5 className="text-[11px] font-mono tracking-wider text-slate-400 uppercase mb-2">Pencarian Terakhir</h5>
                  {recentSearches.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {recentSearches.map(term => (
                        <div 
                          key={term}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-normal border border-slate-100 transition-colors"
                        >
                          <span 
                            onClick={() => handleQuickTagClick(term)}
                            className="cursor-pointer"
                          >
                            {term}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeRecentSearch(term);
                            }}
                            className="text-slate-300 hover:text-rose-500 cursor-pointer"
                          >
                            <X size={11} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">Belum ada riwayat pencarian.</p>
                  )}
                </div>

                {/* Recently Navigated Pages */}
                <div>
                  <h5 className="text-[11px] font-mono tracking-wider text-slate-400 uppercase mb-2">Halaman Terbuka</h5>
                  {recentNavigatedPages.length > 0 ? (
                    <div className="space-y-1">
                      {recentNavigatedPages.map(page => (
                        <div
                          key={page.id}
                          onClick={() => handleRevisitNavigatedPage(page)}
                          className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group"
                        >
                          <div className="min-w-0 pr-3">
                            <span className="text-xs font-normal text-slate-800 group-hover:text-purple-700 transition-colors truncate block">
                              {page.title}
                            </span>
                            <span className="text-[10px] text-slate-400 mt-0.5 truncate block">
                              {page.category} · {formatRelativeTime(page.timestamp)}
                            </span>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeNavigatedPage(page.id);
                            }}
                            className="text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity p-1 cursor-pointer"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">Belum ada halaman yang dibuka.</p>
                  )}
                </div>
              </div>
            ) : (
              /* REGULAR SEARCH / OVERVIEW VIEW */
              <>
                {/* Clean, Non-Pill Recent Searches Inline */}
                {!searchQuery && recentSearches.length > 0 && (
                  <div className="px-5 py-2 border-b border-slate-50 flex items-center justify-between gap-3 bg-slate-50/30">
                    <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 overflow-x-auto no-scrollbar">
                      <span className="uppercase tracking-wider shrink-0">Pencarian Terkini:</span>
                      {recentSearches.slice(0, 4).map(term => (
                        <button
                          key={term}
                          onClick={() => handleQuickTagClick(term)}
                          className="text-slate-600 hover:text-purple-700 transition-colors cursor-pointer whitespace-nowrap"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={clearRecentSearches}
                      className="text-[10px] text-slate-400 hover:text-rose-500 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Hapus
                    </button>
                  </div>
                )}

                {/* Popular Terms Mini Row */}
                {!searchQuery && (
                  <div className="px-5 py-2 border-b border-slate-50 flex items-center gap-3 text-[11px] font-mono text-slate-400 overflow-x-auto no-scrollbar">
                    <span className="uppercase tracking-wider shrink-0">Populer:</span>
                    {POPULAR_SEARCH_TERMS.slice(0, 5).map(tag => (
                      <button
                        key={tag}
                        onClick={() => handleQuickTagClick(tag)}
                        className="text-slate-600 hover:text-purple-700 transition-colors cursor-pointer whitespace-nowrap"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                )}

                {/* Results List */}
                <div 
                  ref={listRef}
                  id="search-results-list"
                  className="flex-1 overflow-y-auto p-2 space-y-0.5 max-h-[45vh]"
                >
                  {searchResults.length > 0 ? (
                    searchResults.map((item, index) => {
                      const isSelected = index === selectedIndex;
                      const isHistory = item.isHistoryItem;

                      return (
                        <div
                          key={item.id}
                          id={`search-item-${item.id}`}
                          onClick={() => handleItemClick(item, index)}
                          onMouseEnter={() => setSelectedIndex(index)}
                          className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-colors cursor-pointer text-left ${
                            isSelected
                              ? 'bg-slate-50 text-slate-900'
                              : 'hover:bg-slate-50/50'
                          }`}
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`text-xs font-normal ${
                                isSelected ? 'text-purple-700' : 'text-slate-800'
                              }`}>
                                {item.title}
                              </span>
                              
                              <span className="text-[10px] text-slate-400 font-mono">
                                {item.category}
                              </span>

                              {isHistory && item.historyTimestamp && (
                                <span className="text-[9px] font-mono text-slate-300">
                                  · {formatRelativeTime(item.historyTimestamp)}
                                </span>
                              )}
                            </div>

                            {item.subtitle && (
                              <p className="text-[11px] text-slate-400 truncate mt-0.5 font-light">
                                {item.subtitle}
                              </p>
                            )}
                          </div>

                          <div className="flex items-center shrink-0 ml-2">
                            <ChevronRight size={13} className={`transition-transform ${
                              isSelected ? 'text-purple-600 translate-x-0.5' : 'text-slate-300'
                            }`} />
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    /* Elegant Simple Empty State */
                    <div className="py-12 px-5 text-center">
                      <h4 className="text-xs font-normal text-slate-800">
                        Tidak ada hasil langsung untuk "{searchQuery}"
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
                        Coba gunakan kata kunci lain, atau hubungi Mas Chesta via WhatsApp untuk konsultasi kustom.
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Bottom Keyboard Guide Footer */}
            <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-mono tracking-wider shrink-0 uppercase">
              <div className="hidden sm:flex items-center gap-4">
                <span>↑↓ Navigasi</span>
                <span>↵ Pilih</span>
                <span>ESC Tutup</span>
              </div>
              <div className="ml-auto text-slate-400">
                <span>CHESTAADOTCOM Command CC</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
