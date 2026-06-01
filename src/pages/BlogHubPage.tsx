import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Search, Sparkles, BookOpen, Clock, Calendar } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import MetaTags from '../components/atoms/MetaTags.tsx';
import { ALL_ARTICLES, Article } from '../data/blogData';
import CreativityMarquee from '../components/organisms/CreativityMarquee.tsx';

export default function BlogHubPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const readSlug = searchParams.get('read');
  const activeArticle = ALL_ARTICLES.find(a => a.slug === readSlug);

  // Handle scroll reset when article is opened or closed
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [readSlug]);

  // Filter articles based on category and search query
  const filteredArticles = ALL_ARTICLES.filter(art => {
    const matchesCategory = selectedCategory === 'All' || art.cat.toLowerCase() === selectedCategory.toLowerCase();
    const matchesQuery = searchQuery.trim() === '' || 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const featuredArticle = ALL_ARTICLES.find(a => a.featured);
  const regularArticles = (selectedCategory === 'All' && searchQuery.trim() === '')
    ? filteredArticles.filter(a => !a.featured)
    : filteredArticles;

  const categories = ['All', 'SEO', 'Strategy', 'Design', 'Performance', 'UI/UX', 'Copywriting'];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-12 pb-32 min-h-screen relative"
    >
      <AnimatePresence mode="wait">
        {activeArticle ? (
          // FOCUSED PREMIUM ARTICLE VIEW
          <motion.div
            key="article-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mx-auto max-w-4xl px-6 pt-12 relative z-10 flex flex-col items-center"
          >
            <MetaTags 
              title={activeArticle.title} 
              description={activeArticle.desc} 
              path={`/blog?read=${activeArticle.slug}`}
            />

            {/* Back Navigation Bar */}
            <button
              onClick={() => {
                const origin = searchParams.get('origin');
                if (origin === 'home') {
                  window.location.href = '/#blog';
                } else {
                  setSearchParams({});
                }
              }}
              className="group inline-flex items-center gap-2 text-xs font-sans font-semibold tracking-widest uppercase text-gray-400 hover:text-[#D4FF00] transition-colors mb-12"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              {searchParams.get('origin') === 'home' ? 'Kembali ke Home' : 'Tutup & Kembali ke Journal'}
            </button>

            {/* Article Header */}
            <header className="mb-12">
              <div className="flex flex-wrap gap-4 items-center mb-6">
                <span className="text-[10px] font-sans font-semibold text-[#0a0b10] bg-[#D4FF00] px-4 py-2 rounded-full uppercase tracking-widest shadow-sm">
                  {activeArticle.cat}
                </span>
                <div className="flex items-center gap-1.5 text-xs font-mono text-gray-500">
                  <Calendar size={12} />
                  <span>{activeArticle.date}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-gray-400">
                  <Clock size={12} className="text-[#D4FF00]" />
                  <span>{activeArticle.readTime}</span>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] font-display font-medium text-white tracking-tight leading-[1.1] mb-8">
                {activeArticle.title}
              </h1>

              {activeArticle.image && (
                <img src={activeArticle.image} alt={activeArticle.title} className="w-full h-64 sm:h-96 object-cover rounded-[2rem] mb-8" />
              )}

              {/* Lead Paragraph */}
              <p className="text-xl text-gray-300 font-sans leading-relaxed border-l-2 border-[#D4FF00] pl-6 py-1">
                {activeArticle.desc}
              </p>
            </header>

            {/* Animated Divider Line */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-12" />

            {/* Article Content Area */}
            <article className="space-y-8 text-lg font-sans text-gray-300 leading-relaxed">
              {activeArticle.content && activeArticle.content.map((paragraph, idx) => (
                <p key={idx} className="first-letter:text-3xl first-letter:font-serif first-letter:text-[#D4FF00] first-letter:mr-2">
                  {paragraph}
                </p>
              ))}
            </article>

            {/* Floating Marquee Between Content and CTA */}
            <div className="-mx-6 my-16">
               <CreativityMarquee />
            </div>

            {/* Elegant Call to Action / Footer of Article */}
            <div className="mt-20 p-8 rounded-[2rem] bg-[#131825] border border-white/5 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#D4FF00]/5 via-transparent to-transparent opacity-50 pointer-events-none" />
              <BookOpen size={36} className="text-[#D4FF00] mx-auto mb-4 opacity-80" />
              <h3 className="text-2xl font-display font-medium text-white mb-2">Ingin meningkatkan bisnis digital Anda?</h3>
              <p className="text-sm text-gray-400 max-w-md mx-auto mb-6">
                chestaadotcom mendesain website premium berorientasi hasil khusus untuk UMKM yang serius.
              </p>
              <button
                onClick={() => {
                  setSearchParams({});
                  setTimeout(() => {
                    const contactSection = document.getElementById('pricing') || document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.location.href = '/#pricing';
                    }
                  }, 150);
                }}
                className="inline-flex items-center gap-2 rounded-full bg-[#D4FF00] px-6 py-3 font-sans text-xs font-semibold text-[#06080F] hover:bg-[#c2e600] transition-colors"
              >
                <span>Lihat Layanan Kami</span>
                <Clock size={14} />
              </button>
            </div>

            {/* Footer Back Link */}
            <div className="mt-16 text-center">
              <button
                onClick={() => {
                  const origin = searchParams.get('origin');
                  if (origin === 'home') {
                    window.location.href = '/#blog';
                  } else {
                    setSearchParams({});
                  }
                }}
                className="text-xs font-sans font-semibold tracking-widest uppercase text-gray-500 hover:text-[#D4FF00] transition-colors"
              >
                ← Kembali ke {searchParams.get('origin') === 'home' ? 'Home' : 'daftar tulisan'}
              </button>
            </div>

            {/* Related Articles */}
            <div className="mt-24 border-t border-white/5 pt-12">
              <h3 className="text-xl font-display text-white mb-8">Related Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ALL_ARTICLES.filter(a => a.slug !== activeArticle.slug).slice(0, 2).map(art => (
                    <button key={art.slug} onClick={() => setSearchParams({ read: art.slug })} className="p-6 rounded-2xl bg-[#131825] border border-white/5 text-left hover:border-white/10 transition-colors">
                        <p className="text-[#D4FF00] text-[10px] uppercase tracking-widest font-semibold mb-2">{art.cat}</p>
                        <h4 className="text-white font-medium line-clamp-2">{art.title}</h4>
                    </button>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          // STANDARD BLOG MAIN GRID
          <motion.div
            key="grid-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            <MetaTags 
              title="Journal & Insight — chestaadotcom" 
              description="Pelajari strategi digital tier-1 untuk mendominasi pasar Anda. Artikel SEO, Design, dan Bisnis untuk UMKM Indonesia." 
            />

            {/* Cinematic Hero */}
            <section className="relative min-h-[70vh] flex flex-col justify-end pt-32 pb-24 border-b border-white/5 mb-20 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent -z-10 mix-blend-screen" />
              
              {/* Background Grids */}
              <div className="absolute inset-0 pointer-events-none -z-10 opacity-10">
                <div className="absolute top-0 right-[20%] w-[1px] h-full bg-gradient-to-b from-transparent via-white/50 to-transparent" />
                <div className="absolute top-[30%] left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-white/50 to-transparent" />
              </div>

              <div className="mx-auto max-w-7xl px-6 w-full relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">
                  <div className="lg:col-span-8">
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-5 py-2 text-xs font-sans font-semibold tracking-widest text-[#D4FF00] uppercase shadow-sm">
                        <Sparkles size={14} className="text-[#D4FF00]" />
                        Insight & Perspective
                      </div>
                      
                      <h1 className="text-6xl sm:text-[6rem] lg:text-[8.5rem] font-display font-medium tracking-tight leading-[0.85] text-white uppercase mb-8">
                        The <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4FF00] via-green-400 to-indigo-400 font-serif italic pr-4">Journal.</span>
                      </h1>
                      
                      <p className="text-xl md:text-2xl text-gray-400 font-sans max-w-2xl leading-relaxed">
                        Strategi digital kelas eksekutif. Temukan wawasan mendalam mengenai algoritma Google, arsitektur website modern, dan psikologi konsumtif. 
                      </p>
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                    className="lg:col-span-4 lg:pb-6 flex lg:justify-end"
                  >
                    <div className="relative w-full max-w-[340px] group">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-[#D4FF00] rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500 -z-10" />
                      <div className="relative bg-[#0D111A]/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] rounded-2xl p-2 flex items-center transition-all duration-300 focus-within:bg-[#131825]">
                        <Search size={20} className="text-gray-500 ml-4 group-focus-within:text-[#D4FF00]" />
                        <input 
                          type="text" 
                          placeholder="Cari insight..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-transparent py-4 pl-4 pr-6 text-base font-sans font-medium placeholder:text-gray-600 text-white focus:outline-none"
                        />
                        {searchQuery && (
                          <button 
                            onClick={() => setSearchQuery('')}
                            className="text-xs text-gray-400 hover:text-white px-2 uppercase font-mono mr-2"
                          >
                            clear
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            <div className="mx-auto max-w-7xl px-6 w-full relative z-10">
              {/* Featured Article - only show if search query is empty */}
              {featuredArticle && searchQuery.trim() === '' && selectedCategory === 'All' && (
                <motion.article 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                  onClick={() => setSearchParams({ read: featuredArticle.slug })}
                  className="group relative bg-[#131825] border border-white/5 rounded-[2.5rem] p-8 md:p-16 mb-24 hover:bg-[#1a2133] transition-all duration-500 cursor-pointer overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:shadow-[0_16px_64px_rgba(0,0,0,0.8)] hover:border-white/10"
                >
                   <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 duration-500">
                     <ArrowUpRight size={120} className="text-white" />
                   </div>
                   
                   <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
                     <div className="md:col-span-7">
                       <div className="flex gap-4 items-center mb-10">
                          <span className="text-[10px] font-sans font-semibold text-[#06080F] bg-[#D4FF00] px-5 py-2.5 rounded-full uppercase tracking-widest shadow-lg shadow-[#D4FF00]/10 flex items-center gap-2 relative">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#06080F] animate-pulse" />
                            {featuredArticle.cat}
                          </span>
                          <span className="text-xs font-mono text-gray-400 font-medium tracking-widest border border-white/10 bg-white/5 px-5 py-2.5 rounded-full backdrop-blur-sm">
                            {featuredArticle.readTime}
                          </span>
                       </div>
                       <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-display font-medium text-white leading-[1.05] mb-8 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-indigo-400 transition-all duration-300">
                         {featuredArticle.title}
                       </h2>
                       <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-sans max-w-2xl">
                         {featuredArticle.desc}
                       </p>
                     </div>
                     
                     <div className="md:col-span-5 h-full hidden md:flex items-center justify-center">
                       <div className="w-full aspect-[4/5] rounded-[2rem] bg-gradient-to-br from-indigo-500/10 to-transparent border border-white/5 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-700 shadow-sm">
                          <div className="text-[14rem] font-display font-medium text-white/5 rotate-12 select-none">SEO</div>
                       </div>
                     </div>
                   </div>
                </motion.article>
              )}

              {/* Categories Bar */}
              <div className="flex items-center gap-4 border-b border-white/5 pb-6 mb-16 overflow-x-auto no-scrollbar">
                <span className="text-[11px] font-sans font-semibold tracking-widest uppercase text-gray-500 whitespace-nowrap">Filter:</span>
                {categories.map((cat) => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-6 py-2.5 rounded-full text-[11px] font-sans font-semibold uppercase tracking-widest whitespace-nowrap transition-colors ${
                      (selectedCategory === 'All' && cat === 'All') || selectedCategory.toLowerCase() === cat.toLowerCase()
                      ? 'bg-[#D4FF00] text-[#06080F]' 
                      : 'text-gray-400 hover:text-white border border-white/5 hover:border-white/20 bg-white/5 backdrop-blur-sm'
                    }`}
                  >
                    {cat === 'All' ? 'All Insights' : cat}
                  </button>
                ))}
              </div>

              {/* Dynamic Empty State */}
              {regularArticles.length === 0 && (
                <div className="text-center py-24 border border-dashed border-white/5 rounded-[2rem] bg-white/[0.01]">
                   <BookOpen size={36} className="text-gray-600 mx-auto mb-4" />
                   <h3 className="text-xl font-display text-white mb-2">Tidak ada artikel kebetulan</h3>
                   <p className="text-sm text-gray-500">Coba ubah filter atau kata pencarian Anda.</p>
                </div>
              )}

              {/* Regular Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                {regularArticles.map((art, i) => (
                  <motion.article 
                    key={art.slug} 
                    className="group cursor-pointer flex flex-col h-full bg-[#131825]/30 p-6 md:p-8 rounded-[2rem] border border-transparent hover:border-white/5 hover:bg-[#131825]/60 transition-all duration-300 shadow-sm hover:shadow-xl"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    onClick={() => setSearchParams({ read: art.slug })}
                  >
                    <div className="flex gap-4 items-center mb-6">
                      <span className="text-[10px] font-sans font-semibold text-[#0a0b10] bg-[#D4FF00] px-3 py-1.5 rounded-full uppercase tracking-widest">
                        {art.cat}
                      </span>
                      <span className="text-[10px] font-mono text-gray-400 font-medium tracking-widest">
                        {art.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-display font-medium text-white leading-[1.25] mb-4 group-hover:text-[#D4FF00] transition-colors tracking-tight line-clamp-2">
                      {art.title}
                    </h3>
                    <p className="text-base text-gray-400 leading-relaxed font-sans mb-8 line-clamp-3">
                      {art.desc}
                    </p>
                    <div className="mt-auto pt-6 flex items-center gap-2 text-sm font-sans font-semibold tracking-widest uppercase text-[#D4FF00] opacity-80 group-hover:opacity-100 transition-opacity">
                      <span>Baca Selengkapnya</span>
                      <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.article>
                ))}
              </div>
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
