'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SEOMetadata from '../components/atoms/SEOMetadata';
import { 
  ArrowLeft, 
  ArrowRight, 
  ArrowUpRight, 
  Search, 
  Sparkles, 
  BookOpen, 
  Clock, 
  Calendar, 
  Star, 
  Bookmark, 
  TrendingUp, 
  ChevronDown, 
  Cpu, 
  Layers, 
  LayoutGrid, 
  LayoutList, 
  X,
  Share2,
  Check,
  Zap,
  Globe
} from 'lucide-react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../components/atoms/Breadcrumbs';
import { ALL_ARTICLES, Article } from '../data/blogData';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { generateBlogSchema, generateArticleSchema } from '../lib/seo';
import { parseDateToISOString } from '../utils/dateUtils';
import CreativityMarquee from '../components/organisms/CreativityMarquee';
import NewsletterForm from '../components/organisms/NewsletterForm';
import RecentPostsWidget from '../components/organisms/RecentPostsWidget';
import SocialShareWidget from '../components/organisms/SocialShareWidget';
import TableOfContents, { TOCItem } from '../components/molecules/TableOfContents';
import OptimizedImage from '../components/atoms/OptimizedImage';
import BlurImage, { DEFAULT_BLUR_BASE64, EDITORIAL_SLATE_BLUR_BASE64 } from '../components/atoms/BlurImage';
import toast from 'react-hot-toast';

const BlogHubSkeleton = () => (
  <div className="relative flex flex-col h-full bg-white p-6 rounded-2xl border border-slate-100 animate-pulse text-left shadow-sm">
    <div className="w-full h-48 bg-slate-100 rounded-xl mb-5" />
    <div className="flex gap-2.5 items-center mb-3">
      <div className="h-5 w-20 bg-purple-100/60 rounded-full" />
      <div className="h-3 w-16 bg-slate-100 rounded" />
    </div>
    <div className="space-y-2 mb-4">
      <div className="h-5 w-5/6 bg-slate-200 rounded" />
      <div className="h-5 w-2/3 bg-slate-100 rounded" />
    </div>
    <div className="space-y-2 mb-6">
      <div className="h-3.5 w-full bg-slate-100 rounded" />
      <div className="h-3.5 w-3/4 bg-slate-100 rounded" />
    </div>
    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
      <div className="h-4 w-24 bg-purple-100/40 rounded" />
      <div className="h-4 w-4 bg-slate-100 rounded-full" />
    </div>
  </div>
);

export default function BlogHubPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [onlyRecommended, setOnlyRecommended] = useState(false);
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(false);
  const [bookmarkedSlugs, setBookmarkedSlugs] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('chestaa_blog_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleBookmark = (slug: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedSlugs(prev => {
      const exists = prev.includes(slug);
      const next = exists ? prev.filter(s => s !== slug) : [...prev, slug];
      try {
        localStorage.setItem('chestaa_blog_bookmarks', JSON.stringify(next));
      } catch (err) {
        console.error(err);
      }
      if (exists) {
        toast('Dihapus dari daftar bacaan', { icon: '🔖' });
      } else {
        toast.success('Disimpan ke daftar bacaan!', { icon: '✨' });
      }
      return next;
    });
  };

  const [firestoreArticles, setFirestoreArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchFirestoreBlogs = async () => {
      try {
        const snap = await getDocs(collection(db, 'blogs'));
        const list: Article[] = [];
        snap.forEach(docSnap => {
          const data = docSnap.data();
          list.push({
            slug: data.slug || docSnap.id,
            title: data.title || 'Tanpa Judul',
            cat: data.category || 'Transformasi Digital',
            date: data.date || '29 SEP 2026',
            readTime: data.readTime || '5 MIN READ',
            readTimeMinutes: data.readTimeMinutes || 5,
            desc: data.description || data.desc || '',
            recommended: data.recommended ?? true,
            featured: data.featured ?? false,
            tags: data.tags || ['Web Development', 'AI Automation'],
            content: data.contentMarkdown ? [data.contentMarkdown] : [data.description || ''],
            image: data.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
            author: {
              name: data.author || 'Chesta Azka Sofyan',
              role: data.authorRole || 'Principal Software Architect'
            }
          });
        });
        setFirestoreArticles(list);
      } catch (err) {
        console.error("Error fetching Firestore blogs:", err);
      }
    };
    fetchFirestoreBlogs();
  }, []);

  const combinedAllArticles = useMemo(() => {
    return [...firestoreArticles, ...ALL_ARTICLES];
  }, [firestoreArticles]);
  const readSlug = searchParams.get('read');
  
  useEffect(() => {
    if (readSlug) {
      navigate('/blog/' + readSlug, { replace: true });
    }
  }, [readSlug, navigate]);

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'newest' | 'readTime' | 'popular'>('newest');
  const postsPerPage = 6;

  // Modern Strategic Categories including Web Development, AI Automation, Business Strategy
  const categories = [
    'All',
    'Web Development',
    'AI Automation',
    'Business Strategy',
    'AI & Otomasi',
    'Next.js & Performa',
    'Studi Kasus B2B',
    'Transformasi Digital',
    'Edukasi & SEO'
  ];

  // Match topic
  const matchesTopic = (art: Article, topic: string): boolean => {
    if (topic === 'All') return true;
    const cat = (art.cat || '').toLowerCase();
    const title = (art.title || '').toLowerCase();
    const tags = (art.tags || []).map(t => t.toLowerCase());

    if (topic === 'Web Development') {
      return cat.includes('web') || cat.includes('next.js') || cat.includes('performa') || tags.some(t => t.includes('web') || t.includes('development') || t.includes('next.js') || t.includes('vitals'));
    }
    if (topic === 'AI Automation') {
      return cat.includes('ai') || cat.includes('otomasi') || tags.some(t => t.includes('ai') || t.includes('automation') || t.includes('agentic'));
    }
    if (topic === 'Business Strategy') {
      return cat.includes('strategi') || cat.includes('bisnis') || cat.includes('b2b') || tags.some(t => t.includes('strategy') || t.includes('business') || t.includes('revenue') || t.includes('b2b'));
    }
    if (topic === 'AI & Otomasi') {
      return cat.includes('ai') || cat.includes('otomasi') || tags.some(t => t.includes('ai') || t.includes('agentic') || t.includes('automation'));
    }
    if (topic === 'Next.js & Performa') {
      return cat.includes('next.js') || cat.includes('performa') || tags.some(t => t.includes('next.js') || t.includes('vitals') || t.includes('performance'));
    }
    if (topic === 'Studi Kasus B2B') {
      return cat.includes('studi kasus') || cat.includes('b2b') || title.includes('case study') || tags.some(t => t.includes('case study') || t.includes('b2b'));
    }
    if (topic === 'Transformasi Digital') {
      return cat.includes('transformasi') || cat.includes('bsd') || cat.includes('bisnis') || tags.some(t => t.includes('bsd') || t.includes('transformasi'));
    }
    if (topic === 'Edukasi & SEO') {
      return cat.includes('edukasi') || cat.includes('seo') || tags.some(t => t.includes('seo') || t.includes('aeo') || t.includes('geo'));
    }
    return cat.toLowerCase() === topic.toLowerCase();
  };

  // Pre-calculate counts for each topic
  const topicCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach(cat => {
      counts[cat] = combinedAllArticles.filter(art => matchesTopic(art, cat)).length;
    });
    return counts;
  }, [combinedAllArticles]);

  // Trending tags list
  const popularTags = ['Agentic AI', 'Next.js 15', 'Core Web Vitals', 'B2B Revenue', 'WhatsApp API', 'BSD City', 'Local SEO'];

  // Filter articles based on category, search query, recommended, bookmarks, tags, and sort
  const filteredArticles = useMemo(() => {
    const matched = combinedAllArticles.filter(art => {
      const matchesCategory = matchesTopic(art, selectedCategory);
      const matchesQuery = searchQuery.trim() === '' || 
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (art.tags && art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
      const matchesRecommended = !onlyRecommended || art.recommended === true;
      const matchesBookmarked = !onlyBookmarked || bookmarkedSlugs.includes(art.slug);
      const matchesTag = !selectedTag || (art.tags && art.tags.some(t => t.toLowerCase() === selectedTag.toLowerCase()));
      return matchesCategory && matchesQuery && matchesRecommended && matchesBookmarked && matchesTag;
    });

    return [...matched].sort((a, b) => {
      if (sortBy === 'readTime') {
        return (a.readTimeMinutes || 8) - (b.readTimeMinutes || 8);
      }
      if (sortBy === 'popular') {
        return (b.recommended ? 1 : 0) - (a.recommended ? 1 : 0);
      }
      return 0; // Default order
    });
  }, [combinedAllArticles, selectedCategory, searchQuery, onlyRecommended, onlyBookmarked, bookmarkedSlugs, selectedTag, sortBy]);

  // Primary featured article
  const primaryFeaturedArticle = useMemo(() => {
    return combinedAllArticles.find(a => a.featured) || combinedAllArticles[0];
  }, [combinedAllArticles]);

  const displayArticles = useMemo(() => {
    const isDefaultView = selectedCategory === 'All' && searchQuery.trim() === '' && !onlyRecommended && !onlyBookmarked && !selectedTag;
    const base = isDefaultView
      ? filteredArticles.filter(a => a.slug !== primaryFeaturedArticle?.slug)
      : filteredArticles;
    
    return base.slice(0, currentPage * postsPerPage);
  }, [filteredArticles, primaryFeaturedArticle, selectedCategory, searchQuery, onlyRecommended, onlyBookmarked, selectedTag, currentPage]);

  const totalFilteredCount = filteredArticles.length;
  const hasMore = displayArticles.length < (
    (selectedCategory === 'All' && searchQuery.trim() === '' && !onlyRecommended && !onlyBookmarked && !selectedTag)
      ? filteredArticles.filter(a => a.slug !== primaryFeaturedArticle?.slug).length
      : filteredArticles.length
  );

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  const resetAllFilters = () => {
    setSelectedCategory('All');
    setSelectedTag(null);
    setSearchQuery('');
    setOnlyRecommended(false);
    setOnlyBookmarked(false);
    setCurrentPage(1);
  };

  return (
    <div className="pb-32 min-h-screen relative font-sans text-slate-900 bg-[#fbfbfd]">
      <SEOMetadata 
        title="Jurnal Rekayasa Web, Performa & Riset AI | CHESTAADOTCOM"
        description="Publikasi strategi, arsitektur Next.js 15, Vibe Coding, Agentic AI, dan optimasi Core Web Vitals untuk akselerasi pertumbuhan bisnis enterprise & B2B."
        schema={generateBlogSchema(combinedAllArticles)}
      />

      {/* Hero Header Section */}
      <section className="relative pt-32 md:pt-40 pb-16 border-b border-slate-200/80 bg-white">
        <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-gradient-to-bl from-purple-100/60 via-purple-50/20 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />

        <div className="mx-auto max-w-7xl px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-purple-200/80 bg-purple-50/70 px-4 py-1.5 text-xs font-mono font-bold tracking-wider text-purple-900 uppercase shadow-2xs">
                  <Sparkles size={13} className="text-purple-700 animate-pulse" />
                  <span>Jurnal Arsitektur Web &amp; Riset AI 2026</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold tracking-tight leading-[1.08] text-slate-900 mb-6">
                  Wawasan Strategis. <br />
                  <span className="text-purple-800">Tanpa AI Slop.</span>
                </h1>
                
                <p className="text-base sm:text-lg text-slate-600 font-sans max-w-xl leading-relaxed border-l-2 border-purple-300 pl-4">
                  Eksplorasi mendalam seputar arsitektur Next.js 15, orkestrasi Agentic AI, optimasi Core Web Vitals &lt; 0.8 detik, dan rekayasa digital untuk pertumbuhan pendapatan B2B.
                </p>

                {/* Key stats pill strip */}
                <div className="flex flex-wrap items-center gap-4 mt-6 text-xs font-mono text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-semibold text-slate-800">{combinedAllArticles.length}+ Masterclass</span>
                  </div>
                  <span className="text-slate-300">•</span>
                  <span>Skor CWV 100/100</span>
                  <span className="text-slate-300">•</span>
                  <span>100% Ditulis Praktisi Senior</span>
                </div>
              </motion.div>
            </div>
            
            {/* Search Bar & Filter Shortcuts */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="lg:col-span-5 flex flex-col gap-3.5"
            >
              <div className="relative w-full">
                <div className="relative bg-white border border-slate-200 rounded-2xl p-1.5 flex items-center shadow-sm transition-all focus-within:border-purple-600 focus-within:ring-2 focus-within:ring-purple-100">
                  <Search size={18} className="text-slate-400 ml-3 shrink-0" />
                  <input 
                    type="text" 
                    placeholder="Cari topik, AI, Next.js, SEO, B2B..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full bg-transparent py-2.5 pl-3 pr-3 text-sm font-sans font-medium placeholder:text-slate-400 text-slate-900 focus:outline-none"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="p-1.5 mr-1 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full cursor-pointer transition-colors"
                      title="Hapus pencarian"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>

              {/* Trending Quick Topic Tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <TrendingUp size={11} /> Topik:
                </span>
                {popularTags.slice(0, 5).map(tag => {
                  const isActive = selectedTag === tag;
                  return (
                    <button
                      key={tag}
                      onClick={() => {
                        if (selectedTag === tag) {
                          setSelectedTag(null);
                        } else {
                          setSelectedTag(tag);
                          setSearchQuery('');
                          setCurrentPage(1);
                        }
                      }}
                      className={`text-[10px] font-mono px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                        isActive
                          ? 'bg-purple-900 text-white border-purple-900 shadow-xs'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-purple-300 hover:text-purple-800'
                      }`}
                    >
                      #{tag}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content Hub Container */}
      <div className="mx-auto max-w-7xl px-6 w-full pt-10">

        {/* PRIMARY FEATURED ARTICLE HERO CARD */}
        {!searchQuery && selectedCategory === 'All' && !selectedTag && !onlyBookmarked && !onlyRecommended && primaryFeaturedArticle && (
          <motion.section 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-14 relative group"
          >
            <div 
              onClick={() => navigate('/blog/' + primaryFeaturedArticle.slug)}
              className="relative w-full aspect-[21/10] sm:aspect-[2.3/1] rounded-3xl overflow-hidden cursor-pointer border border-slate-800 shadow-xl transition-all duration-500 group/hero bg-slate-950"
            >
              {primaryFeaturedArticle.image && (
                <div className="absolute inset-0 overflow-hidden">
                  <OptimizedImage 
                    src={primaryFeaturedArticle.image} 
                    alt={primaryFeaturedArticle.title} 
                    className="w-full h-full object-cover opacity-60 transition-transform duration-700 ease-out group-hover/hero:scale-105" 
                    priority={true}
                  />
                </div>
              )}
              
              {/* Depth Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
              
              {/* Card Header Content */}
              <div className="absolute inset-0 p-6 sm:p-10 md:p-14 flex flex-col justify-end items-start z-10">
                <div className="max-w-3xl">
                  <div className="flex flex-wrap gap-2.5 items-center mb-4">
                    <span className="px-3.5 py-1 rounded-full bg-purple-600 text-white text-[11px] font-mono font-bold uppercase tracking-wider shadow-sm">
                      {primaryFeaturedArticle.cat}
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono font-medium uppercase tracking-wider">
                      <Star size={12} className="text-amber-400 fill-amber-400" />
                      <span>Riset Unggulan Editor</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] font-mono text-purple-200">
                      <Clock size={12} />
                      {primaryFeaturedArticle.readTime}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-semibold text-white leading-tight mb-4 tracking-tight group-hover/hero:text-purple-200 transition-colors">
                    {primaryFeaturedArticle.title}
                  </h2>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-sans line-clamp-2 md:line-clamp-3">
                    {primaryFeaturedArticle.desc}
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-purple-400 bg-purple-900">
                        <OptimizedImage 
                          src={primaryFeaturedArticle.author?.avatar || '/chesta.png'} 
                          alt={primaryFeaturedArticle.author?.name || 'Author'} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-left text-xs font-mono">
                        <span className="text-white font-bold block">{primaryFeaturedArticle.author?.name || 'Chesta Azka Sofyan'}</span>
                        <span className="text-purple-300 text-[10px] uppercase">{primaryFeaturedArticle.author?.role || 'Lead Architect'}</span>
                      </div>
                    </div>

                    <div className="ml-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-slate-900 text-xs font-bold font-sans uppercase tracking-wider shadow-md group-hover/hero:bg-purple-50 group-hover/hero:text-purple-950 transition-colors">
                      <span>Baca Riset</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* CONTROLS BAR: CATEGORIES, VIEW SWITCHER & SORT */}
        <div className="mb-8">
          {/* Horizontal Category Pill Bar with Live Counts */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar scroll-smooth">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat && !onlyBookmarked;
              const count = topicCounts[cat] || 0;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSelectedTag(null);
                    setOnlyBookmarked(false);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-mono font-medium whitespace-nowrap transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-purple-900 text-white shadow-md shadow-purple-900/20 ring-2 ring-purple-400/40'
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-purple-300 hover:bg-purple-50/40'
                  }`}
                >
                  <span>{cat === 'All' ? 'Semua Jurnal' : cat}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-purple-800 text-purple-200' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}

            {/* Quick Filter: Bookmarked Articles */}
            <button
              onClick={() => {
                setOnlyBookmarked(!onlyBookmarked);
                setCurrentPage(1);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-medium whitespace-nowrap transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                onlyBookmarked
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-900/20 ring-2 ring-amber-400/40'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-amber-300 hover:bg-amber-50/40'
              }`}
            >
              <Bookmark size={13} className={onlyBookmarked ? 'fill-white' : 'text-amber-600'} />
              <span>Daftar Bacaan</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                onlyBookmarked ? 'bg-amber-700 text-amber-100' : 'bg-slate-100 text-slate-500'
              }`}>
                {bookmarkedSlugs.length}
              </span>
            </button>
          </div>

          {/* Sub Controls: Active indicator, View Mode Switcher, and Sort */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div className="text-xs font-mono text-slate-500 flex items-center gap-2 flex-wrap">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Menampilkan <strong>{totalFilteredCount}</strong> publikasi terkurasi</span>
              {(selectedTag || searchQuery || selectedCategory !== 'All' || onlyRecommended || onlyBookmarked) && (
                <button
                  onClick={resetAllFilters}
                  className="text-purple-700 hover:underline font-bold ml-2 cursor-pointer"
                >
                  (Reset Semua Filter)
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* View Mode Switcher */}
              <div className="flex items-center p-1 bg-white border border-slate-200 rounded-xl shadow-2xs">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === 'grid' ? 'bg-purple-100 text-purple-900' : 'text-slate-400 hover:text-slate-700'
                  }`}
                  title="Tampilan Grid (2 Kolom)"
                >
                  <LayoutGrid size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === 'list' ? 'bg-purple-100 text-purple-900' : 'text-slate-400 hover:text-slate-700'
                  }`}
                  title="Tampilan List Editorial (Horizontal)"
                >
                  <LayoutList size={16} />
                </button>
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-1.5 text-xs font-mono">
                <span className="text-slate-400 hidden sm:inline">Urutan:</span>
                <button
                  onClick={() => setSortBy('newest')}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                    sortBy === 'newest' ? 'bg-purple-100 text-purple-900 font-bold' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Terbaru
                </button>
                <button
                  onClick={() => setSortBy('readTime')}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                    sortBy === 'readTime' ? 'bg-purple-100 text-purple-900 font-bold' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Waktu Baca
                </button>
                <button
                  onClick={() => setSortBy('popular')}
                  className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                    sortBy === 'popular' ? 'bg-purple-100 text-purple-900 font-bold' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Unggulan
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Empty State */}
        {displayArticles.length === 0 && (
          <div className="text-center py-20 border border-dashed border-slate-200 rounded-3xl bg-white shadow-xs max-w-xl mx-auto my-12 p-8">
            <BookOpen size={44} className="text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-display font-semibold text-slate-800 mb-2">
              Tidak Ada Artikel yang Cocok
            </h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6 leading-relaxed">
              Coba gunakan kata kunci pencarian lain atau klik tombol reset untuk menjelajahi kembali seluruh arsip.
            </p>
            <button
              onClick={resetAllFilters}
              className="px-6 py-2.5 rounded-full bg-purple-900 text-white text-xs font-mono uppercase tracking-wider hover:bg-purple-800 transition-colors cursor-pointer shadow-md"
            >
              Reset Semua Filter
            </button>
          </div>
        )}

        {/* Main Feed with Responsive Layout (Grid or List) */}
        {displayArticles.length > 0 && (
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex-1 w-full">
              
              {/* View Mode: GRID (2 Columns) */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                  {displayArticles.map((art, i) => {
                    const isBookmarked = bookmarkedSlugs.includes(art.slug);
                    return (
                      <motion.article 
                        key={`${art.slug}-${i}-grid`} 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.05 }}
                        whileHover={{ y: -4 }}
                        onClick={() => navigate('/blog/' + art.slug)}
                        className="group cursor-pointer flex flex-col h-full bg-white p-6 rounded-2xl border border-slate-200/90 hover:border-purple-300 hover:shadow-xl transition-all duration-300 shadow-xs relative overflow-hidden"
                      >
                        {/* Thumbnail with Blur-up Placeholder */}
                        {art.image && (
                          <div className="w-full h-48 overflow-hidden rounded-xl mb-5 relative border border-slate-100 bg-slate-100">
                            <BlurImage 
                              src={art.image} 
                              alt={art.title} 
                              aspectRatio="16/9"
                              blurDataURL={DEFAULT_BLUR_BASE64}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                            />
                            {/* Bookmark Button */}
                            <button
                              onClick={(e) => toggleBookmark(art.slug, e)}
                              className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 hover:bg-white text-slate-600 hover:text-purple-700 shadow-xs transition-transform active:scale-90 z-10 cursor-pointer"
                              title={isBookmarked ? "Hapus dari bookmark" : "Simpan artikel"}
                            >
                              <Bookmark size={14} className={isBookmarked ? "fill-purple-700 text-purple-700" : ""} />
                            </button>
                            {art.recommended && (
                              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-amber-200/80 shadow-2xs flex items-center gap-1 text-[10px] font-mono font-bold text-amber-800 z-10">
                                <Star size={10} className="fill-amber-500 text-amber-500" />
                                <span>Rekomendasi</span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Category & Read Time */}
                        <div className="flex gap-2.5 items-center mb-3">
                          <span className="text-[10px] font-mono font-bold text-purple-800 bg-purple-50 px-2.5 py-1 rounded-full uppercase tracking-wider border border-purple-100">
                            {art.cat}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">
                            {art.readTime}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg md:text-xl font-display font-semibold text-slate-900 leading-snug mb-3 group-hover:text-purple-800 transition-colors tracking-tight line-clamp-2 text-left">
                          {art.title}
                        </h3>
                        
                        {/* Brief Summary */}
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans mb-5 line-clamp-2 text-left">
                          {art.desc}
                        </p>

                        {/* Tags */}
                        {art.tags && art.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
                            {art.tags.slice(0, 3).map((t, idx) => (
                              <span key={`${t}-${idx}`} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                                #{t}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Card Footer */}
                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-bold tracking-wider text-purple-800">
                          <span>Baca Riset Lengkap</span>
                          <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </motion.article>
                    );
                  })}
                </div>
              ) : (
                /* View Mode: LIST / EDITORIAL (Horizontal Layout) */
                <div className="space-y-6">
                  {displayArticles.map((art, i) => {
                    const isBookmarked = bookmarkedSlugs.includes(art.slug);
                    return (
                      <motion.article 
                        key={`${art.slug}-${i}-list`} 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: i * 0.04 }}
                        whileHover={{ y: -3 }}
                        onClick={() => navigate('/blog/' + art.slug)}
                        className="group cursor-pointer p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-purple-300 hover:shadow-xl transition-all duration-300 shadow-xs flex flex-col md:flex-row gap-6 items-stretch"
                      >
                        {/* Left Horizontal Thumbnail with Blur-up Placeholder */}
                        {art.image && (
                          <div className="w-full md:w-64 h-48 md:h-auto shrink-0 overflow-hidden rounded-xl relative border border-slate-100 bg-slate-100">
                            <BlurImage 
                              src={art.image} 
                              alt={art.title} 
                              aspectRatio="16/9"
                              blurDataURL={DEFAULT_BLUR_BASE64}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                            />
                            <button
                              onClick={(e) => toggleBookmark(art.slug, e)}
                              className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 hover:bg-white text-slate-600 hover:text-purple-700 shadow-xs transition-transform active:scale-90 z-10 cursor-pointer"
                              title={isBookmarked ? "Hapus dari bookmark" : "Simpan artikel"}
                            >
                              <Bookmark size={13} className={isBookmarked ? "fill-purple-700 text-purple-700" : ""} />
                            </button>
                          </div>
                        )}

                        {/* Right Content */}
                        <div className="flex flex-col justify-between flex-1 min-w-0">
                          <div>
                            <div className="flex items-center gap-2.5 mb-2.5 flex-wrap">
                              <span className="text-[10px] font-mono font-bold text-purple-800 bg-purple-50 px-2.5 py-1 rounded-full uppercase tracking-wider border border-purple-100">
                                {art.cat}
                              </span>
                              <span className="text-[10px] font-mono text-slate-400">
                                {art.readTime}
                              </span>
                              <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
                                • {art.date}
                              </span>
                            </div>

                            <h3 className="text-lg md:text-xl font-display font-semibold text-slate-900 leading-snug mb-2.5 group-hover:text-purple-800 transition-colors tracking-tight">
                              {art.title}
                            </h3>

                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans mb-4 line-clamp-2">
                              {art.desc}
                            </p>
                          </div>

                          <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                            <div className="flex items-center gap-2">
                              {art.tags && art.tags.slice(0, 3).map((t, idx) => (
                                <span key={`${t}-${idx}-list`} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                                  #{t}
                                </span>
                              ))}
                            </div>
                            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-purple-800 group-hover:translate-x-1 transition-transform">
                              <span>Baca Selengkapnya</span>
                              <ArrowRight size={13} />
                            </span>
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </div>
              )}

              {/* Load More Button */}
              {hasMore && (
                <div className="mt-14 flex justify-center">
                  <button
                    onClick={handleLoadMore}
                    className="px-8 py-3.5 rounded-full bg-slate-900 text-white hover:bg-purple-900 text-xs font-mono font-bold uppercase tracking-widest transition-all shadow-md cursor-pointer hover:shadow-xl hover:-translate-y-0.5"
                  >
                    Muat Lebih Banyak Insight ({filteredArticles.length - displayArticles.length} tersisa)
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar Column */}
            <aside className="w-full lg:w-[320px] shrink-0 space-y-8">
              
              {/* Category Breakdown Widget */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
                <h4 className="font-display font-bold text-slate-900 mb-4 text-xs uppercase tracking-wider flex items-center gap-2">
                  <Layers size={14} className="text-purple-700" />
                  <span>Kategori Riset</span>
                </h4>
                <ul className="flex flex-col gap-1.5">
                  {categories.map((cat) => {
                    const isActive = selectedCategory === cat && !onlyBookmarked;
                    const count = topicCounts[cat] || 0;
                    return (
                      <li key={cat}>
                        <button
                          onClick={() => {
                            setSelectedCategory(cat);
                            setSelectedTag(null);
                            setOnlyBookmarked(false);
                            setCurrentPage(1);
                          }}
                          className={`w-full text-left px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between text-xs font-mono cursor-pointer ${
                            isActive 
                              ? 'bg-purple-50 text-purple-900 font-bold ring-1 ring-purple-200' 
                              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                          }`}
                        >
                          <span>{cat === 'All' ? 'Semua Jurnal' : cat}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-bold">
                            {count}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Principal Author Credentials */}
              <div className="bg-purple-950 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden border border-purple-800">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/20 rounded-full blur-2xl pointer-events-none" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-purple-400 mb-4 bg-purple-900">
                    <img src="/chesta.png" alt="Chesta Azka" className="w-full h-full object-cover" />
                  </div>
                  <h4 className="font-display font-bold text-white text-base">Chesta Azka Sofyan</h4>
                  <p className="text-[11px] font-mono text-purple-300 uppercase tracking-wider mb-3">Lead Architect &amp; AI Specialist</p>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed mb-4">
                    Membantu bisnis di BSD City, Cisauk, dan Jabodetabek membangun arsitektur web modern yang cepat dan terintegrasi dengan Agen AI otomatis.
                  </p>
                  <a
                    href="https://wa.me/6282125447232?text=Halo%20Mas%20Chesta,%20saya%20tertarik%20berdiskusi%20mengenai%20arsitektur%20web%20dan%20otomasi%20AI."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-white bg-purple-800 hover:bg-purple-700 px-4 py-2 rounded-xl border border-purple-600 transition-colors w-full justify-center"
                  >
                    <span>Konsultasi Teknis Langsung</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>

              {/* Regional SEO Links */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs">
                <h4 className="font-display font-bold text-slate-900 mb-4 text-xs uppercase tracking-wider flex items-center gap-2">
                  <Globe size={14} className="text-purple-700" />
                  <span>Jangkauan Wilayah</span>
                </h4>
                <ul className="flex flex-col gap-2.5 text-xs font-sans">
                  <li>
                    <Link to="/area/bsd-city" className="flex items-center justify-between text-slate-700 hover:text-purple-700 transition-colors py-1 group">
                      <span>Jasa Pembuatan Web BSD City</span>
                      <ArrowRight size={12} className="text-slate-300 group-hover:text-purple-700 group-hover:translate-x-1 transition-all" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/area/cisauk" className="flex items-center justify-between text-slate-700 hover:text-purple-700 transition-colors py-1 group">
                      <span>Solusi IT &amp; Website Cisauk</span>
                      <ArrowRight size={12} className="text-slate-300 group-hover:text-purple-700 group-hover:translate-x-1 transition-all" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/layanan/jasa-pembuatan-website-bsd-cisauk" className="flex items-center justify-between text-slate-700 hover:text-purple-700 transition-colors py-1 group">
                      <span>Optimasi SEO Google Lokal Tangerang</span>
                      <ArrowRight size={12} className="text-slate-300 group-hover:text-purple-700 group-hover:translate-x-1 transition-all" />
                    </Link>
                  </li>
                </ul>
              </div>

              <RecentPostsWidget />

            </aside>
          </div>
        )}

        {/* Bottom Marquee & Newsletter */}
        <div className="mt-24">
          <CreativityMarquee />
        </div>
        
        <div className="mt-16">
          <NewsletterForm />
        </div>

      </div>
    </div>
  );
}
