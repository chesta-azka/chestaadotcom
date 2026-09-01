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
  Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePerformance } from '../../contexts/PerformanceContext.tsx';
import { 
  getSearchEngine, 
  SearchDocument, 
  SearchCategory 
} from '../../lib/searchEngine';
import { useSearchAnalytics, analyzeSearchAudience } from '../../hooks/useSearchAnalytics';

interface SearchResultItem extends SearchDocument {
  matchedSnippet?: string;
  score?: number;
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
    saveRecentSearch,
    removeRecentSearch,
    clearRecentSearches,
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

  // Execute Fuse.js full-text fuzzy search or fallback to structured suggestions
  const searchResults: SearchResultItem[] = useMemo(() => {
    const startTime = performance.now();
    const q = searchQuery.trim();

    let results: SearchResultItem[] = [];

    if (!q) {
      // Default view when search is empty: categorized highlights
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
      // Full-text Fuse.js execution across all content slugs & body text
      const fuseResults = fuse.search(q, { limit: 25 });

      results = fuseResults
        .filter(({ item }) => {
          if (selectedCategory === 'all') return true;
          return item.categoryKey === selectedCategory;
        })
        .map(({ item, score, matches }) => {
          // Extract snippet from matching fields
          let matchedSnippet = item.subtitle;
          if (matches && matches.length > 0) {
            const contentMatch = matches.find(m => m.key === 'fullContent' || m.key === 'benefits');
            if (contentMatch && contentMatch.value) {
              const snippet = extractSnippet(contentMatch.value, q);
              if (snippet) matchedSnippet = snippet;
            }
          }
          return {
            ...item,
            matchedSnippet,
            score
          };
        });
    }

    const elapsed = Math.round(performance.now() - startTime);
    setSearchLatencyMs(elapsed);
    return results;
  }, [searchQuery, selectedCategory, fuse, allDocs]);

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

  // Keyboard navigation & global shortcuts
  useEffect(() => {
    const handleOpenCommandPalette = () => {
      setIsOpen(true);
      setTimeout(() => inputRef.current?.focus(), 50);
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
  }, [isOpen, searchResults, selectedIndex]);

  const handleItemClick = (item: SearchDocument, index: number) => {
    setIsOpen(false);

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

  const handleQuickTagClick = (tag: string) => {
    setSearchQuery(tag);
    saveRecentSearch(tag);
    inputRef.current?.focus();
  };

  // Category filter tabs
  const CATEGORY_TABS: { key: SearchCategory; label: string }[] = [
    { key: 'all', label: 'Semua' },
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
    'Next.js 15',
    'Promo Rp540K',
    'Integrasi AI Gemini',
    'Studi Kasus Fintech',
    'SEO Google Maps'
  ];

  // Map category to aesthetic lucide icon
  const getCategoryIcon = (categoryKey: SearchCategory, categoryName: string, id: string) => {
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
          className="fixed inset-0 z-[100] flex items-start justify-center pt-12 sm:pt-20 px-4 pb-6 overflow-y-auto"
        >
          {/* Dimmed Blur Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-slate-950/45 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          />

          {/* Search Dialog Box */}
          <motion.div
            id="command-palette-container"
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl bg-white rounded-3xl shadow-[0_30px_90px_rgba(88,28,135,0.22)] border border-purple-100 ring-1 ring-slate-900/5 overflow-hidden flex flex-col z-10 max-h-[85vh]"
          >
            {/* Top Search Input Bar */}
            <div className="flex items-center px-4 sm:px-6 py-4 border-b border-purple-100 bg-white/95 sticky top-0 z-20">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center mr-3.5 shrink-0 border border-purple-100/80 shadow-2xs">
                <Search size={19} className="text-purple-700" />
              </div>
              
              <input
                ref={inputRef}
                id="command-palette-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari studi kasus, layanan, artikel, wilayah BSD/Cisauk, atau ketik pertanyaan..."
                className="flex-1 bg-transparent border-none outline-none text-slate-900 placeholder:text-slate-400 font-sans text-sm sm:text-base font-medium"
                autoFocus
              />

              {searchQuery && (
                <button
                  id="btn-clear-search"
                  onClick={() => setSearchQuery('')}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 mr-2 transition-colors cursor-pointer"
                  title="Hapus pencarian"
                >
                  <X size={16} />
                </button>
              )}

              <div className="hidden sm:flex items-center gap-1.5 shrink-0">
                <span className="text-[10px] font-mono px-2 py-1 rounded-lg bg-purple-50 text-purple-700 border border-purple-200/80 font-bold">
                  ESC
                </span>
              </div>
            </div>

            {/* Category Filter Tabs with Horizontal Scroll */}
            <div className="flex items-center gap-1.5 px-4 sm:px-6 py-2.5 bg-slate-50/80 border-b border-purple-100/70 overflow-x-auto no-scrollbar">
              <SlidersHorizontal size={13} className="text-purple-600 mr-1 shrink-0" />
              {CATEGORY_TABS.map(tab => {
                const isSelected = selectedCategory === tab.key;
                return (
                  <button
                    key={tab.key}
                    id={`filter-tab-${tab.key}`}
                    onClick={() => setSelectedCategory(tab.key)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-purple-700 text-white shadow-xs'
                        : 'bg-white text-slate-600 hover:text-purple-900 hover:bg-purple-50 border border-slate-200/70'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}

              {/* BSD / Cisauk Local Intent Badge Indicator */}
              {detectedAudience.isBsdCisaukAudience && (
                <div className="ml-auto hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold shrink-0">
                  <MapPin size={11} />
                  <span>Target: {detectedAudience.localityTag?.toUpperCase()}</span>
                </div>
              )}
            </div>

            {/* Recent Searches Section (when empty query & history exists) */}
            {!searchQuery && recentSearches.length > 0 && (
              <div className="px-4 sm:px-6 py-2.5 bg-purple-50/30 border-b border-purple-50 flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                  <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1 shrink-0">
                    <History size={12} className="text-purple-600" />
                    Terkini:
                  </span>
                  {recentSearches.map(term => (
                    <div 
                      key={term}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-white hover:bg-purple-50 text-slate-700 hover:text-purple-950 text-xs font-medium border border-purple-100 transition-colors shadow-2xs group"
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
                        className="text-slate-300 hover:text-rose-500 p-0.5 rounded transition-colors cursor-pointer"
                        title="Hapus dari riwayat"
                      >
                        <X size={11} />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={clearRecentSearches}
                  className="text-[10px] text-slate-400 hover:text-rose-600 font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Trash2 size={11} />
                  <span>Bersihkan</span>
                </button>
              </div>
            )}

            {/* Popular Curated Intent Chips */}
            {!searchQuery && (
              <div className="px-4 sm:px-6 py-2.5 bg-white border-b border-purple-50 flex items-center gap-2 overflow-x-auto no-scrollbar">
                <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 shrink-0">
                  <TrendingUp size={12} className="text-purple-600" />
                  Populer BSD & Cisauk:
                </span>
                {POPULAR_SEARCH_TERMS.map(tag => (
                  <button
                    key={tag}
                    id={`chip-popular-${tag.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    onClick={() => handleQuickTagClick(tag)}
                    className="px-2.5 py-0.5 rounded-md bg-purple-50 hover:bg-purple-100 text-purple-900 text-[11px] font-semibold border border-purple-100/80 whitespace-nowrap transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}

            {/* Dynamic Results / Suggestions List */}
            <div 
              ref={listRef}
              id="search-results-list"
              className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-1.5 divide-y divide-purple-50/60"
            >
              {searchResults.length > 0 ? (
                searchResults.map((item, index) => {
                  const Icon = getCategoryIcon(item.categoryKey, item.category, item.id);
                  const isSelected = index === selectedIndex;
                  const isPromo = item.id.includes('promo');

                  return (
                    <motion.div
                      key={item.id}
                      id={`search-item-${item.id}`}
                      initial={{ opacity: 0, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.12 }}
                      onClick={() => handleItemClick(item, index)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full flex items-center justify-between p-3.5 rounded-2xl transition-all cursor-pointer text-left group ${
                        isSelected
                          ? 'bg-purple-50/95 ring-1 ring-purple-300/80 shadow-xs'
                          : 'hover:bg-purple-50/40'
                      }`}
                    >
                      <div className="flex items-start gap-3.5 min-w-0 pr-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isPromo
                            ? 'bg-amber-500 text-white shadow-xs'
                            : isSelected
                            ? 'bg-purple-700 text-white shadow-xs'
                            : 'bg-purple-100 text-purple-900'
                        }`}>
                          <Icon size={18} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-sm font-bold truncate ${
                              isSelected ? 'text-purple-950 font-extrabold' : 'text-slate-900'
                            }`}>
                              {item.title}
                            </span>
                            
                            {item.badge && (
                              <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider shrink-0 border ${
                                isPromo 
                                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                                  : 'bg-purple-100/90 text-purple-900 border-purple-200'
                              }`}>
                                {item.badge}
                              </span>
                            )}

                            {item.client && (
                              <span className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium border border-slate-200">
                                Klien: {item.client}
                              </span>
                            )}
                          </div>

                          {/* Snippet / Description */}
                          <p className="text-xs text-slate-600 line-clamp-1 mt-1 leading-relaxed">
                            {item.matchedSnippet || item.subtitle}
                          </p>

                          {/* Tech Stack / Tags preview */}
                          {item.tags && item.tags.length > 0 && (
                            <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                              {item.tags.slice(0, 3).map((tag, tIdx) => (
                                <span 
                                  key={tIdx} 
                                  className="text-[10px] text-slate-600 bg-white/90 px-2 py-0.5 rounded border border-slate-200 font-mono"
                                >
                                  {tag}
                                </span>
                              ))}
                              {item.tags.length > 3 && (
                                <span className="text-[10px] text-slate-600 font-mono">
                                  +{item.tags.length - 3} lainnya
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 shrink-0 pl-2">
                        {item.shortcut && (
                          <kbd className="hidden md:inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-semibold text-purple-900 bg-white border border-purple-200 rounded shadow-2xs">
                            {item.shortcut.toUpperCase()}
                          </kbd>
                        )}
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform ${
                          isSelected ? 'bg-purple-700 text-white translate-x-0.5' : 'text-slate-400 group-hover:text-purple-700'
                        }`}>
                          <ChevronRight size={15} />
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                /* No Results State with Direct AI / WhatsApp Escalation */
                <div className="py-12 px-6 text-center space-y-4">
                  <div className="w-14 h-14 rounded-3xl bg-purple-50 text-purple-700 mx-auto flex items-center justify-center border border-purple-100 shadow-2xs">
                    <Search size={24} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">
                      Tidak ada hasil langsung untuk "{searchQuery}"
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto leading-relaxed">
                      Sistem kami telah mencatat kata kunci ini untuk optimasi konten BSD & Cisauk. Anda dapat menanyakan langsung kebutuhan kustom ke AI Assistant kami atau hubungi Mas Chesta.
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-3 pt-3 flex-wrap">
                    <button
                      id="btn-ask-ai-palette-fallback"
                      onClick={() => askAIAssistant(searchQuery)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      <Sparkles size={14} />
                      <span>Tanya AI Assistant</span>
                    </button>
                    <button
                      id="btn-ask-wa-palette-fallback"
                      onClick={() => openWhatsApp(`Halo Mas Chesta, saya sedang mencari solusi website mengenai: "${searchQuery}"`)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 text-xs font-bold transition-all cursor-pointer"
                    >
                      <MessageCircle size={14} />
                      <span>Konsultasi WhatsApp</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Dynamic Direct Action Buttons when searching */}
              {searchQuery && searchResults.length > 0 && (
                <div className="pt-3 pb-1 border-t border-purple-100/80 flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-[11px] font-semibold text-slate-500">
                    Perlu solusi kustom seputar "{searchQuery}"?
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => askAIAssistant(searchQuery)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-900 text-xs font-semibold border border-purple-200 transition-colors cursor-pointer"
                    >
                      <Sparkles size={12} className="text-purple-700" />
                      <span>Tanya AI</span>
                    </button>
                    <button
                      onClick={() => openWhatsApp(`Halo Mas Chesta, saya ingin diskusi mengenai: "${searchQuery}"`)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-semibold border border-emerald-200 transition-colors cursor-pointer"
                    >
                      <MessageCircle size={12} className="text-emerald-700" />
                      <span>Chat WhatsApp</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Keyboard Guide Footer */}
            <div className="px-4 sm:px-6 py-3 bg-slate-50/95 border-t border-purple-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
              <div className="hidden sm:flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-mono text-slate-700 shadow-2xs">↑</kbd>
                  <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-mono text-slate-700 shadow-2xs">↓</kbd>
                  <span>Navigasi</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-mono text-slate-700 shadow-2xs">↵</kbd>
                  <span>Buka Hasil</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-mono text-slate-700 shadow-2xs">ESC</kbd>
                  <span>Tutup</span>
                </span>
              </div>

              <div className="flex items-center gap-3 ml-auto text-slate-600">
                <span className="inline-flex items-center gap-1 text-[10px] font-mono bg-purple-50 text-purple-900 px-2 py-0.5 rounded border border-purple-200 font-semibold">
                  <Clock size={10} />
                  <span>{searchLatencyMs}ms</span>
                </span>
                <div className="flex items-center gap-1.5 text-purple-900 font-bold text-xs">
                  <Sparkles size={13} className="text-purple-600" />
                  <span>CHESTAADOTCOM Full-Text Search</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
