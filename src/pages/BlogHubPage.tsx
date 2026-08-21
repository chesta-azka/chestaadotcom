import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  ArrowLeft, 
  ArrowRight, 
  ArrowUpRight, 
  Search, 
  Sparkles, 
  BookOpen, 
  Clock, 
  Calendar, 
  Tag,
  Star,
  Share2,
  Check,
  Flame,
  BookmarkCheck,
  TrendingUp
} from 'lucide-react';
import { useSearchParams, Link } from 'react-router-dom';
import MetaTags from '../components/atoms/MetaTags.tsx';
import BlogSEO from '../components/atoms/BlogSEO.tsx';
import { ALL_ARTICLES, Article } from '../data/blogData';
import CreativityMarquee from '../components/organisms/CreativityMarquee.tsx';

const BlogHubSkeleton = () => (
  <div className="relative flex flex-col h-full bg-white p-6 rounded-3xl border border-slate-100 animate-pulse text-left shadow-sm">
    <div className="w-full h-44 bg-slate-100 rounded-2xl mb-5" />
    <div className="flex gap-2.5 items-center mb-3">
      <div className="h-5 w-16 bg-[#4f46e5]/10 rounded-full" />
      <div className="h-3 w-16 bg-slate-100 rounded" />
    </div>
    <div className="space-y-2 mb-4">
      <div className="h-5 w-5/6 bg-slate-200 rounded" />
      <div className="h-5 w-2/3 bg-slate-100 rounded" />
    </div>
    <div className="space-y-2 mb-6">
      <div className="h-3.5 w-full bg-slate-100 rounded" />
      <div className="h-3.5 w-full bg-slate-100 rounded" />
      <div className="h-3.5 w-3/4 bg-slate-100 rounded" />
    </div>
    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
      <div className="h-4 w-28 bg-[#4f46e5]/10 rounded" />
      <div className="h-4 w-4 bg-slate-100 rounded-full" />
    </div>
  </div>
);

export default function BlogHubPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [onlyRecommended, setOnlyRecommended] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery, selectedTag]);
  
  // Reading progress scroll tracking
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const combinedAllArticles = ALL_ARTICLES;
  const readSlug = searchParams.get('read');
  const activeArticle = combinedAllArticles.find(a => a.slug === readSlug);

  // Handle scroll reset when article is opened or closed
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [readSlug]);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Categories list
  const categories = ['All', 'Web Development', 'AI Solutions', 'Digital Transformation', 'Design', 'SEO', 'Strategy'];

  // Trending tags list
  const popularTags = ['Agentic AI', 'Local SEO', 'Core Web Vitals', 'Conversion', 'Automation', 'WhatsApp Bot', 'Micro-Interactions'];

  // Filter articles based on category, search query, recommended toggle, and tags
  const filteredArticles = useMemo(() => {
    return combinedAllArticles.filter(art => {
      const matchesCategory = selectedCategory === 'All' || art.cat.toLowerCase() === selectedCategory.toLowerCase();
      const matchesQuery = searchQuery.trim() === '' || 
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (art.tags && art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
      const matchesRecommended = !onlyRecommended || art.recommended === true;
      const matchesTag = !selectedTag || (art.tags && art.tags.some(t => t.toLowerCase() === selectedTag.toLowerCase()));
      return matchesCategory && matchesQuery && matchesRecommended && matchesTag;
    });
  }, [combinedAllArticles, selectedCategory, searchQuery, onlyRecommended, selectedTag]);

  // Featured recommendation article
  const featuredArticle = useMemo(() => {
    return combinedAllArticles.find(a => a.featured && a.recommended) || combinedAllArticles[0];
  }, [combinedAllArticles]);

  // Top recommended articles for highlight strip
  const recommendedPicks = useMemo(() => {
    return combinedAllArticles.filter(a => a.recommended);
  }, [combinedAllArticles]);

  const displayArticles = useMemo(() => {
    const isDefaultView = selectedCategory === 'All' && searchQuery.trim() === '' && !onlyRecommended && !selectedTag;
    const base = isDefaultView
      ? filteredArticles.filter(a => a.slug !== featuredArticle?.slug)
      : filteredArticles;
    
    return base.slice(0, currentPage * postsPerPage);
  }, [filteredArticles, featuredArticle, selectedCategory, searchQuery, onlyRecommended, selectedTag, currentPage]);

  const totalFilteredCount = filteredArticles.length;
  const hasMore = displayArticles.length < (
    (selectedCategory === 'All' && searchQuery.trim() === '' && !onlyRecommended && !selectedTag)
      ? filteredArticles.filter(a => a.slug !== featuredArticle?.slug).length
      : filteredArticles.length
  );

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  const handleCopyShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Smart Recommendations for Active Article: Articles in same category or matching tags
  const relatedArticles = useMemo(() => {
    if (!activeArticle) return [];
    return combinedAllArticles
      .filter(a => a.slug !== activeArticle.slug)
      .sort((a, b) => {
        let scoreA = 0;
        let scoreB = 0;
        if (a.cat === activeArticle.cat) scoreA += 3;
        if (b.cat === activeArticle.cat) scoreB += 3;
        if (a.recommended) scoreA += 2;
        if (b.recommended) scoreB += 2;
        if (a.tags && activeArticle.tags && a.tags.some(t => activeArticle.tags?.includes(t))) scoreA += 2;
        if (b.tags && activeArticle.tags && b.tags.some(t => activeArticle.tags?.includes(t))) scoreB += 2;
        return scoreB - scoreA;
      })
      .slice(0, 3);
  }, [activeArticle, combinedAllArticles]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-12 pb-32 min-h-screen relative"
    >
      {/* Precision Reading Progress Bar */}
      <AnimatePresence>
        {activeArticle && (
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 right-0 h-[3px] bg-[#4f46e5] origin-left z-[9999]"
            style={{ scaleX }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {activeArticle ? (
          // ================= FOCUSED ARTICLE DETAIL VIEW =================
          <motion.div
            key="article-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mx-auto max-w-4xl px-6 pt-8 relative z-10 flex flex-col items-center"
          >
            <MetaTags 
              title={`${activeArticle.title} — CHESTADOTCOM Journal`} 
              description={activeArticle.desc} 
              path={`/blog?read=${activeArticle.slug}`}
              breadcrumbs={[
                { name: 'Home', item: '/' },
                { name: 'Insight', item: '/blog' },
                { name: activeArticle.title, item: `/blog?read=${activeArticle.slug}` },
              ]}
            />
            
            <BlogSEO 
              title={activeArticle.title}
              description={activeArticle.desc}
              url={`https://chestadotcom.com/blog?read=${activeArticle.slug}`}
              image={activeArticle.image || 'https://chestadotcom.com/default-og.png'}
              type="article"
              authorName={typeof activeArticle.author === 'string' ? activeArticle.author : activeArticle.author?.name || 'Chesta Azka Sofyan'}
              publishedTime={activeArticle.date ? new Date(activeArticle.date).toISOString() : undefined}
            />

            {/* Top Navigation & Share Bar */}
            <div className="w-full flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
              <button
                onClick={() => {
                  const origin = searchParams.get('origin');
                  if (origin === 'home') {
                    window.location.href = '/#blog';
                  } else {
                    setSearchParams({});
                  }
                }}
                className="group inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-widest uppercase text-slate-600 hover:text-[#4f46e5] transition-colors"
              >
                <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                <span>{searchParams.get('origin') === 'home' ? 'Kembali ke Home' : 'Kembali ke Semua Insight'}</span>
              </button>

              <button
                onClick={handleCopyShare}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-xs font-sans font-medium text-slate-700 transition-colors shadow-sm"
              >
                {copied ? <Check size={14} className="text-emerald-600" /> : <Share2 size={14} />}
                <span>{copied ? 'Link Disalin!' : 'Copy Link'}</span>
              </button>
            </div>

            {/* Article Header */}
            <header className="mb-12 w-full text-left">
              <div className="flex flex-wrap gap-3 items-center mb-6">
                <span className="text-[10px] font-mono font-bold text-white bg-[#4f46e5] px-3.5 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                  {activeArticle.cat}
                </span>

                {activeArticle.recommended && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-amber-800 bg-amber-50 border border-amber-200/60 px-3 py-1.5 rounded-full uppercase tracking-wider">
                    <Star size={11} className="fill-amber-500 text-amber-500" />
                    Rekomendasi Editor
                  </span>
                )}

                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
                  <Calendar size={12} />
                  <span>{activeArticle.date}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-600">
                  <Clock size={12} className="text-[#4f46e5]" />
                  <span>{activeArticle.readTime}</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-slate-900 tracking-tight leading-[1.15] mb-6">
                {activeArticle.title}
              </h1>

              {/* Author Strip */}
              {activeArticle.author && (
                <div className="flex items-center gap-3 py-3 px-4 rounded-2xl bg-slate-50 border border-slate-100 mb-8 max-w-max">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#4f46e5] to-purple-600 text-white font-mono text-xs font-bold flex items-center justify-center shadow-sm">
                    CA
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-sans font-bold text-slate-900">{activeArticle.author.name}</div>
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">{activeArticle.author.role}</div>
                  </div>
                </div>
              )}

              {activeArticle.image && (
                <div className="w-full overflow-hidden rounded-3xl mb-8 border border-slate-100 shadow-xl max-h-[460px]">
                  <img src={activeArticle.image} alt={activeArticle.title} className="w-full h-full object-cover" />
                </div>
              )}

              {/* Lead Paragraph */}
              <p className="text-lg sm:text-xl text-slate-700 font-sans leading-relaxed border-l-3 border-[#4f46e5] pl-6 py-2 bg-indigo-50/20 rounded-r-2xl">
                {activeArticle.desc}
              </p>
            </header>

            {/* Article Content Area */}
            <article className="space-y-8 text-lg font-sans text-slate-700 leading-relaxed w-full">
              {activeArticle.content && activeArticle.content.map((block, idx) => {
                if (typeof block === 'string') {
                  return (
                    <div key={idx} className="w-full">
                      <p className="text-slate-800 leading-relaxed">
                        {block}
                      </p>
                    </div>
                  );
                } else if (block.type === 'image') {
                  return (
                    <div key={idx} className="w-full my-8">
                      <img src={block.url} alt={block.alt} className="w-full h-auto rounded-2xl shadow-lg border border-slate-100 object-cover" />
                      <span className="block text-center text-xs font-mono text-slate-400 mt-2">{block.alt}</span>
                    </div>
                  );
                }
                return null;
              })}
            </article>

            {/* Tags Strip */}
            {activeArticle.tags && activeArticle.tags.length > 0 && (
              <div className="w-full pt-8 pb-4 mt-8 border-t border-slate-100 flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider mr-2 flex items-center gap-1">
                  <Tag size={12} /> Topik Terkait:
                </span>
                {activeArticle.tags.map(t => (
                  <button
                    key={t}
                    onClick={() => {
                      setSelectedTag(t);
                      setSearchParams({});
                    }}
                    className="text-xs font-sans px-3 py-1 rounded-full bg-slate-100 hover:bg-indigo-50 hover:text-[#4f46e5] text-slate-600 transition-colors border border-slate-200"
                  >
                    #{t}
                  </button>
                ))}
              </div>
            )}

            {/* Floating Marquee */}
            <div className="-mx-6 my-12 w-full">
              <CreativityMarquee />
            </div>

            {/* Related Articles Section */}
            <div className="mt-16 border-t border-slate-100 pt-12 w-full">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#4f46e5] font-bold block mb-2">
                    Keep Reading
                  </span>
                  <h3 className="text-2xl font-display font-medium text-slate-900 tracking-tight">
                    Related Articles
                  </h3>
                </div>
                <button
                  onClick={() => setSearchParams({})}
                  className="text-xs font-sans font-semibold text-[#4f46e5] hover:underline inline-flex items-center gap-1"
                >
                  Lihat Semua Artikel <ArrowRight size={14} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedArticles.map(art => (
                  <button
                    key={art.slug}
                    onClick={() => setSearchParams({ read: art.slug })}
                    className="p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-indigo-200 hover:bg-white hover:shadow-xl transition-all duration-300 text-left flex flex-col justify-between group h-full shadow-sm"
                  >
                    <div>
                      <div className="flex items-center gap-2.5 mb-4">
                        <span className="text-[#4f46e5] text-[10px] font-mono uppercase tracking-widest font-bold bg-indigo-50 px-2.5 py-1 rounded-full">
                          {art.cat}
                        </span>
                        {art.recommended && (
                          <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/50">
                            <Star size={10} className="fill-amber-500 text-amber-500" /> Rekomendasi
                          </span>
                        )}
                      </div>
                      <h4 className="text-slate-900 font-display font-medium text-lg line-clamp-2 group-hover:text-[#4f46e5] transition-colors mb-3 tracking-tight">
                        {art.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 mb-6 leading-relaxed font-sans">
                        {art.desc}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-4 border-t border-slate-200/60">
                      <span>{art.readTime}</span>
                      <span className="text-[#4f46e5] font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        Baca Artikel <ArrowRight size={12} />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Collaboration CTA */}
            <div className="mt-16 p-8 md:p-12 rounded-3xl bg-slate-900 text-white text-center relative overflow-hidden w-full shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#4f46e5]/20 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 max-w-xl mx-auto">
                <BookOpen size={36} className="text-[#4f46e5] mx-auto mb-4" />
                <h3 className="text-2xl sm:text-3xl font-serif font-medium mb-3">
                  Wujudkan Arsitektur Digital Bisnis Anda
                </h3>
                <p className="text-sm text-slate-300 mb-8 font-sans leading-relaxed">
                  Konsultasikan kebutuhan website dan solusi otomatisasi AI bersama Chesta Azka Sofyan untuk meningkatkan konversi brand Anda.
                </p>
                <a
                  href="https://wa.me/6282125447232?text=Halo%20CHESTADOTCOM,%20saya%20tertarik%20berdiskusi%20setelah%20membaca%20insight%20Anda."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#4f46e5] px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest text-white hover:bg-white hover:text-slate-900 transition-all duration-300 shadow-lg cursor-pointer"
                >
                  <span>Mulai Diskusi WhatsApp</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </motion.div>
        ) : (
          // ================= MAIN BLOG & INSIGHTS HUB VIEW =================
          <motion.div
            key="grid-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            <MetaTags 
              title="Journal & Insight — CHESTADOTCOM Digital Strategy" 
              description="Kurasi strategi digital tier-1: Otomasi Agentic AI, Framework SEO 2026, Psikologi Konversi, dan Arsitektur Web Berperforma Tinggi." 
              breadcrumbs={[
                { name: 'Home', item: '/' },
                { name: 'Insight', item: '/blog' },
              ]}
            />

            {/* Header Hero Section */}
            <section className="relative pt-24 pb-16 border-b border-slate-100 mb-12 overflow-hidden">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-indigo-500/10 via-purple-500/5 to-transparent blur-3xl rounded-full pointer-events-none" />

              <div className="mx-auto max-w-7xl px-6 w-full relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
                  <div className="lg:col-span-7">
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-indigo-100 bg-white px-4 py-2 text-xs font-mono font-semibold tracking-widest text-[#4f46e5] uppercase shadow-sm">
                        <Sparkles size={13} className="text-[#4f46e5] animate-pulse" />
                        Digital Insights & Strategies 2026
                      </div>
                      
                      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-medium tracking-tight leading-[1.05] text-slate-900">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-[#4f46e5] to-purple-600 italic">Journal.</span>
                      </h1>
                      
                      <p className="text-base sm:text-lg text-slate-600 font-sans max-w-xl leading-relaxed mt-6 border-l-2 border-indigo-200 pl-5">
                        Eksplorasi wawasan mendalam seputar inovasi Agentic AI, optimasi SEO terkini, arsitektur web performa tinggi, dan psikologi konversi digital.
                      </p>
                    </motion.div>
                  </div>
                  
                  {/* Search Bar & Stats */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                    className="lg:col-span-5 flex flex-col gap-4"
                  >
                    <div className="relative w-full">
                      <div className="relative bg-white border border-slate-200 shadow-md rounded-2xl p-1.5 flex items-center transition-all duration-300 focus-within:border-[#4f46e5] focus-within:shadow-indigo-100">
                        <Search size={20} className="text-slate-400 ml-3 shrink-0" />
                        <input 
                          type="text" 
                          placeholder="Cari insight, AI, SEO, konversi..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-transparent py-3 pl-3 pr-4 text-sm font-sans font-medium placeholder:text-slate-400 text-slate-900 focus:outline-none"
                        />
                        {searchQuery && (
                          <button 
                            onClick={() => setSearchQuery('')}
                            className="text-[10px] text-slate-400 hover:text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full font-mono mr-2 uppercase"
                          >
                            Clear
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Trending Topic Quick Pills */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1">
                        <TrendingUp size={11} /> Trending:
                      </span>
                      {popularTags.slice(0, 4).map(tag => (
                        <button
                          key={tag}
                          onClick={() => {
                            if (selectedTag === tag) {
                              setSelectedTag(null);
                            } else {
                              setSelectedTag(tag);
                              setSearchQuery('');
                            }
                          }}
                          className={`text-[10px] font-mono px-2.5 py-1 rounded-full border transition-colors ${
                            selectedTag === tag
                              ? 'bg-[#4f46e5] text-white border-[#4f46e5]'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-indigo-200 hover:text-[#4f46e5]'
                          }`}
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            <div className="mx-auto max-w-7xl px-6 w-full relative z-10">

              {/* ================= REKOMENDASI TERPILIH (EDITOR'S PICKS) STRIP ================= */}
              {!searchQuery && selectedCategory === 'All' && !selectedTag && (
                <div className="mb-16">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                        <Star size={16} className="text-amber-600 fill-amber-500" />
                      </div>
                      <div>
                        <h2 className="text-xl font-display font-medium text-slate-900">
                          Rekomendasi Pilihan Editor
                        </h2>
                        <p className="text-xs text-slate-500 font-sans">
                          Wawasan prioritas yang paling berdampak untuk akselerasi bisnis Anda
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setOnlyRecommended(!onlyRecommended)}
                      className={`text-xs font-mono uppercase tracking-wider px-4 py-2 rounded-full border transition-all ${
                        onlyRecommended 
                          ? 'bg-amber-500 text-white border-amber-600 font-bold' 
                          : 'bg-white text-slate-600 border-slate-200 hover:border-amber-400'
                      }`}
                    >
                      {onlyRecommended ? '✓ Menampilkan Rekomendasi Saja' : 'Lihat Semua Rekomendasi'}
                    </button>
                  </div>

                  {/* Featured Article Card */}
                  {featuredArticle && (
                    <motion.article 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
                      onClick={() => setSearchParams({ read: featuredArticle.slug })}
                      className="group relative bg-white border border-slate-200/90 rounded-3xl p-6 md:p-10 hover:border-indigo-300 hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden shadow-sm"
                    >
                      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <ArrowUpRight size={100} className="text-slate-900" />
                      </div>
                      
                      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-7">
                          <div className="flex flex-wrap gap-2.5 items-center mb-6">
                            <span className="text-[10px] font-mono font-bold text-white bg-[#4f46e5] px-3.5 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                              {featuredArticle.cat}
                            </span>
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full uppercase tracking-wider">
                              <Star size={11} className="fill-amber-500 text-amber-500" /> Rekomendasi Utama
                            </span>
                            <span className="text-xs font-mono text-slate-500">
                              {featuredArticle.readTime}
                            </span>
                          </div>

                          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium text-slate-900 leading-snug mb-4 group-hover:text-[#4f46e5] transition-colors tracking-tight">
                            {featuredArticle.title}
                          </h3>

                          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans max-w-2xl mb-6">
                            {featuredArticle.desc}
                          </p>

                          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#4f46e5]">
                            <span>Baca Ulasan Lengkap</span>
                            <ArrowRight size={14} className="transform group-hover:translate-x-1.5 transition-transform" />
                          </div>
                        </div>
                        
                        <div className="lg:col-span-5 h-full">
                          {featuredArticle.image ? (
                            <div className="w-full h-56 sm:h-72 overflow-hidden rounded-2xl border border-slate-100 shadow-md">
                              <img 
                                src={featuredArticle.image} 
                                alt={featuredArticle.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                              />
                            </div>
                          ) : (
                            <div className="w-full h-56 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center">
                              <BookOpen size={48} className="text-indigo-400" />
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.article>
                  )}
                </div>
              )}

              {/* Filter Controls Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-6 mb-10">
                {/* Category Pills */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 sm:pb-0">
                  {categories.map((cat) => (
                    <button 
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setSelectedTag(null);
                      }}
                      className={`px-4 py-2 rounded-full text-xs font-sans font-medium whitespace-nowrap transition-colors ${
                        (selectedCategory === 'All' && cat === 'All') || selectedCategory.toLowerCase() === cat.toLowerCase()
                        ? 'bg-[#4f46e5] text-white shadow-sm' 
                        : 'text-slate-600 hover:text-slate-900 border border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      {cat === 'All' ? 'Semua Kategori' : cat}
                    </button>
                  ))}
                </div>

                {/* Status & Active Filter Indicator */}
                <div className="text-xs font-mono text-slate-500 shrink-0 flex items-center gap-2">
                  <span>Ditemukan <strong>{totalFilteredCount}</strong> insight</span>
                  {(selectedTag || searchQuery || selectedCategory !== 'All' || onlyRecommended) && (
                    <button
                      onClick={() => {
                        setSelectedCategory('All');
                        setSelectedTag(null);
                        setSearchQuery('');
                        setOnlyRecommended(false);
                      }}
                      className="text-indigo-600 hover:underline font-semibold"
                    >
                      (Reset Filter)
                    </button>
                  )}
                </div>
              </div>

              {/* Dynamic Empty State */}
              {displayArticles.length === 0 && (
                <div className="text-center py-20 border border-dashed border-slate-200 rounded-3xl bg-slate-50">
                  <BookOpen size={40} className="text-slate-400 mx-auto mb-3" />
                  <h3 className="text-lg font-display font-medium text-slate-800 mb-1">
                    Tidak ada artikel yang cocok
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
                    Coba gunakan kata kunci lain atau reset filter kategori untuk melihat insight lainnya.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                      setSelectedTag(null);
                      setOnlyRecommended(false);
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#4f46e5] text-white text-xs font-mono uppercase tracking-wider hover:bg-indigo-700 transition-colors"
                  >
                    Reset Pencarian
                  </button>
                </div>
              )}

              {/* Regular Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {isLoading ? (
                  [...Array(6)].map((_, idx) => <BlogHubSkeleton key={idx} />)
                ) : (
                  displayArticles.map((art, i) => (
                    <motion.article 
                      key={art.slug} 
                      className="group cursor-pointer flex flex-col h-full bg-white p-6 rounded-3xl border border-slate-200/80 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 shadow-sm"
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      onClick={() => setSearchParams({ read: art.slug })}
                    >
                      {art.image && (
                        <div className="w-full h-44 overflow-hidden rounded-2xl mb-5 relative border border-slate-100">
                          <img 
                            src={art.image} 
                            alt={art.title} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                          />
                          {art.recommended && (
                            <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-amber-200/80 shadow-sm flex items-center gap-1 text-[10px] font-mono font-bold text-amber-800">
                              <Star size={10} className="fill-amber-500 text-amber-500" />
                              <span>Rekomendasi</span>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex gap-2.5 items-center mb-3">
                        <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                          {art.cat}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {art.readTime}
                        </span>
                      </div>

                      <h3 className="text-lg md:text-xl font-display font-medium text-slate-900 leading-snug mb-3 group-hover:text-[#4f46e5] transition-colors tracking-tight line-clamp-2 text-left">
                        {art.title}
                      </h3>
                      
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans mb-6 line-clamp-3 text-left">
                        {art.desc}
                      </p>

                      {/* Tag Badges */}
                      {art.tags && art.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
                          {art.tags.slice(0, 3).map(t => (
                            <span key={t} className="text-[10px] font-sans px-2 py-0.5 rounded-md bg-slate-100 text-slate-500">
                              #{t}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-semibold tracking-wider text-[#4f46e5]">
                        <span>Baca Selengkapnya</span>
                        <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </motion.article>
                  ))
                )}
              </div>

              {/* Load More Control */}
              {hasMore && (
                <div className="mt-16 flex justify-center">
                  <button
                    onClick={handleLoadMore}
                    className="px-8 py-3.5 rounded-full bg-slate-900 text-white hover:bg-[#4f46e5] text-xs font-mono font-bold uppercase tracking-widest transition-colors shadow-sm"
                  >
                    Muat Lebih Banyak Insight
                  </button>
                </div>
              )}
              
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </motion.div>
  );
}
