import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowUpRight, Star, Search, X, Sparkles, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import TextRevealSmooth from '../atoms/TextRevealSmooth';
import { ALL_ARTICLES } from '../../data/blogData';
import { 
  filterBlogByQuery, 
  dispatchOpenCommandPalette,
  getSearchIndexStats 
} from '../../lib/contentSearchIndex';

const BlogSkeleton = () => (
  <div className="relative flex flex-col h-full bg-slate-50 p-6 md:p-8 rounded-xl border border-slate-100 animate-pulse min-h-[320px] text-left">
    <div className="flex gap-4 items-center mb-6">
      {/* Category Tag placeholder */}
      <div className="h-6 w-16 bg-[#6b21a8]/10 rounded-full" />
      {/* Date placeholder */}
      <div className="h-3 w-20 bg-slate-200 rounded" />
    </div>
    
    {/* Title placeholder */}
    <div className="space-y-2 mb-4">
      <div className="h-5 w-5/6 bg-white/20 rounded" />
      <div className="h-5 w-2/3 bg-slate-200 rounded" />
    </div>

    {/* Description paragraph placeholders */}
    <div className="space-y-2 mb-8">
      <div className="h-3.5 w-full bg-slate-100 rounded" />
      <div className="h-3.5 w-full bg-slate-100 rounded" />
      <div className="h-3.5 w-3/4 bg-slate-100 rounded" />
    </div>
    
    {/* Read more Link placeholder */}
    <div className="mt-auto pt-4 h-4 w-28 bg-[#6b21a8]/10 rounded" />
  </div>
);

const BLOG_CATEGORIES = [
  'Semua',
  'Edukasi Teknologi',
  'AI & Otomasi',
  'SEO & Growth',
  'Arsitektur Web'
];

export default function BlogSection() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const stats = useMemo(() => getSearchIndexStats(), []);

  // Use the lightweight client-side indexing function to filter articles
  const displayedArticles = useMemo(() => {
    const isDefaultState = !searchQuery.trim() && selectedCategory === 'Semua';
    if (isDefaultState) {
      return ALL_ARTICLES.slice(0, 3);
    }

    const filtered = filterBlogByQuery(
      searchQuery, 
      selectedCategory === 'Semua' ? undefined : selectedCategory
    );

    // Map indexed items back to full article objects for rendering
    return filtered
      .map(item => ALL_ARTICLES.find(a => a.slug === item.slug))
      .filter((a): a is typeof ALL_ARTICLES[0] => Boolean(a))
      .slice(0, 6);
  }, [searchQuery, selectedCategory]);

  const handleOpenSearchModal = () => {
    dispatchOpenCommandPalette({
      category: 'articles',
      query: searchQuery.trim() || undefined
    });
  };

  return (
    <section id="blog" className="py-16 md:py-20 relative overflow-hidden bg-transparent border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-6 relative z-10 w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-slate-100"
        >
          <div>
            <div className="text-fluid-h2 font-serif font-medium tracking-tight text-slate-900 leading-[1.05] mb-2 flex flex-wrap">
              <TextRevealSmooth 
                text="Knowledge Hub & Edukasi." 
                highlightWords={["Edukasi."]}
                highlightClass="text-purple-700 font-serif italic pr-2"
              />
            </div>
            <p className="text-slate-600 font-sans text-sm md:text-base max-w-lg mt-2">
              Akses panduan eksklusif mengenai transformasi digital B2B, ROI otomasi AI, dan strategi arsitektur web untuk pengusaha modern.
            </p>
          </div>
          
          <div className="flex items-center gap-3 flex-wrap">
            {/* Quick Cmd+K Global Search Trigger */}
            <button
              id="btn-blog-cmdk-trigger"
              onClick={handleOpenSearchModal}
              className="group inline-flex items-center gap-2.5 px-4 py-3 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-900 text-xs font-medium border border-purple-200/80 transition-all shadow-2xs cursor-pointer"
              title="Buka pencarian global artikel (Cmd+K)"
            >
              <Search size={14} className="text-purple-700" />
              <span>Cari Artikel</span>
              <kbd className="px-1.5 py-0.5 rounded bg-white text-[10px] font-mono font-medium text-purple-900 border border-purple-200 shadow-2xs">
                ⌘K
              </kbd>
            </button>

            <Link 
              to="/blog" 
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-slate-900 hover:bg-[#6b21a8] text-white text-xs font-mono font-medium tracking-wider uppercase transition-colors shrink-0 shadow-sm"
            >
               <span>Buka Semua ({stats.totalBlogPosts})</span>
               <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </motion.div>

        {/* Lightweight Client-Side Search & Filter Bar */}
        <div className="mb-10 p-2 sm:p-2.5 rounded-2xl bg-white/70 backdrop-blur-md border border-slate-200/80 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Real-time Inline Search Input */}
          <div className="relative flex-1 flex items-center min-w-0">
            <Search size={16} className="absolute left-3.5 text-purple-700 pointer-events-none" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter langsung artikel, teknologi, SEO..."
              className="w-full pl-10 pr-20 py-2 text-xs sm:text-sm bg-transparent rounded-xl text-slate-900 placeholder:text-slate-400 outline-none font-medium"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Hapus filter"
              >
                <X size={14} />
              </button>
            ) : (
              <span className="hidden sm:inline-block absolute right-3 text-[10px] font-mono text-purple-700/70 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-100">
                Live Filter
              </span>
            )}
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
            <Filter size={12} className="text-slate-400 shrink-0 ml-1 mr-0.5 hidden sm:inline-block" />
            {BLOG_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-purple-900 text-white shadow-xs'
                    : 'bg-slate-50 hover:bg-purple-50 text-slate-600 hover:text-purple-900 border border-slate-200/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Filter Status */}
        {(searchQuery || selectedCategory !== 'Semua') && (
          <div className="mb-6 flex items-center justify-between text-xs text-slate-600 px-1">
            <span>
              Menemukan <strong className="text-purple-900 font-semibold">{displayedArticles.length}</strong> artikel terindeks
              {searchQuery && <> untuk kata kunci "<span className="italic">{searchQuery}</span>"</>}
            </span>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('Semua'); }}
              className="text-purple-700 hover:text-purple-900 font-medium cursor-pointer"
            >
              Reset Filter
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, idx) => (
              <BlogSkeleton key={idx} />
            ))}
          </div>
        ) : displayedArticles.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {displayedArticles.map((art, i) => (
              <motion.article 
                key={art.slug} 
                className="group cursor-pointer relative flex flex-col h-full bg-white/70 backdrop-blur-xl p-6 md:p-8 rounded-xl border border-slate-200/80 hover:border-purple-300 hover:bg-white hover:shadow-xl hover:shadow-purple-900/5 hover:scale-[1.01] transition-all duration-300 shadow-sm"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                onClick={() => window.location.href = `/blog?read=${art.slug}&origin=home`}
              >
                <div className="w-full h-44 overflow-hidden rounded-2xl mb-6 border border-slate-100 relative bg-slate-100">
                  <img 
                    src={art.image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop"} 
                    alt={art.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {art.recommended && (
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full border border-amber-200 shadow-sm flex items-center gap-1 text-[10px] font-mono font-medium text-amber-800">
                      <Star size={10} className="fill-amber-500 text-amber-500" />
                      <span>Rekomendasi</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 items-center mb-3">
                  <span className="text-[10px] font-mono font-medium text-purple-900 bg-purple-50 px-3 py-1 rounded-full uppercase tracking-wider border border-purple-100/60">
                    {art.cat}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    {art.readTime}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900 leading-snug mb-2.5 group-hover:text-purple-900 transition-colors tracking-tight line-clamp-2 text-left">
                  {art.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-sans line-clamp-2 mb-6 text-left">
                  {art.desc}
                </p>
                
                <Link 
                  to={`/blog?read=${art.slug}&origin=home`} 
                  className="mt-auto pt-4 flex items-center justify-between text-xs font-mono font-medium tracking-wider text-[#6b21a8] border-t border-slate-100 group-hover:border-purple-100"
                >
                  <span>Baca Insight</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.article>
            ))}
          </div>
        ) : (
          /* Empty search state with quick action to open full CommandPalette */
          <div className="py-14 px-6 text-center bg-white/60 rounded-2xl border border-dashed border-purple-200 space-y-4 max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 mx-auto flex items-center justify-center border border-purple-100">
              <Search size={20} />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-semibold text-slate-900">
                Tidak ada artikel langsung untuk "{searchQuery}"
              </h4>
              <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                Coba gunakan kata kunci umum atau gunakan CommandPalette untuk mencari ke seluruh basis pengetahuan kami.
              </p>
            </div>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={handleOpenSearchModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-purple-900 hover:bg-purple-800 text-white text-xs font-medium transition-all shadow-xs cursor-pointer"
              >
                <Sparkles size={13} />
                <span>Buka di CommandPalette (⌘K)</span>
              </button>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('Semua'); }}
                className="px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors cursor-pointer"
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
