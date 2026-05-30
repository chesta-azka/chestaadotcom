import { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Search, Sparkles } from 'lucide-react';
import MetaTags from '../components/atoms/MetaTags.tsx';

const ALL_ARTICLES = [
  { 
    title: 'Framework SEO 2026: Mengapa Desain UI Mempengaruhi Peringkat Google', 
    cat: 'SEO', 
    date: 'PRO', 
    readTime: '7 MIN READ',
    desc: 'Google mulai memberi penalti pada website yang terlihat seperti template. Data menunjukkan desain kustom meningkatkan engagement 300% dan on-page time, faktor utama algoritma baru Google.',
    featured: true
  },
  { 
    title: 'Kenapa Instagram Saja Tidak Cukup untuk Bisnis Kamu', 
    cat: 'STRATEGY', 
    date: '12 MEI 2026', 
    readTime: '5 MIN READ',
    desc: 'Algoritma Instagram berubah liar. Bisnis yang bertumpu 100% pada media sosial kehilangan kendali.' 
  },
  { 
    title: 'Website Lemot = Kehilangan 40% Calon Pembeli.', 
    cat: 'PERFORMANCE', 
    date: '08 MEI 2026',
    readTime: '4 MIN READ', 
    desc: 'Google sekarang membunuh peringkat website yang load time-nya di atas 2 detik. Ini arsitektur modern kita mengatasinya.' 
  },
  { 
    title: 'Desain Murahan Membuat Bisnis Terlihat Tidak Profesional', 
    cat: 'DESIGN', 
    date: '01 MEI 2026',
    readTime: '3 MIN READ', 
    desc: 'Kesan pertama menentukan harga. Klien bersedia membayar mahal jika profil digital Anda terlihat sangat serius.' 
  },
  { 
    title: 'Micro-Interactions: Rahasia Konversi E-Commerce Premium', 
    cat: 'UI/UX', 
    date: '24 APR 2026',
    readTime: '6 MIN READ', 
    desc: 'Bukan sekadar hiasan. Animasi kecil yang tepat dapat membimbing mata audiens langsung ke tombol checkout.' 
  },
  { 
    title: 'Menulis Copywriting yang Membujuk (Tanpa Terlihat Menjual)', 
    cat: 'COPYWRITING', 
    date: '18 APR 2026',
    readTime: '5 MIN READ', 
    desc: 'Orang benci dijual, tapi suka membeli. Cara menggunakan brand storytelling untuk memicu keputusan emosional.' 
  },
];

export default function BlogHubPage() {
  const featuredArticle = ALL_ARTICLES.find(a => a.featured);
  const regularArticles = ALL_ARTICLES.filter(a => !a.featured);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-24 pb-32 min-h-screen relative"
    >
      <MetaTags 
        title="Journal & Insight — SEO Authority" 
        description="Pelajari strategi digital tier-1 untuk mendominasi pasar Anda. Artikel SEO, Design, dan Bisnis untuk UMKM Indonesia." 
      />

      {/* Cinematic Hero */}
      <section className="relative min-h-[70vh] flex flex-col justify-end pt-32 pb-24 border-b border-white/5 mb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#4F46E5]/10 via-transparent to-transparent -z-10 mix-blend-screen" />
        
        {/* Background Grids */}
        <div className="absolute inset-0 pointer-events-none -z-10 opacity-10">
          <div className="absolute top-0 right-[20%] w-[1px] h-full bg-gradient-to-b from-transparent via-white/50 to-transparent" />
          <div className="absolute top-[30%] left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        </div>

        <div className="mx-auto max-w-7xl px-6 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-5 py-2 text-xs font-sans font-semibold tracking-widest text-[#D4FF00] uppercase shadow-sm">
                  <Sparkles size={14} className="text-[#D4FF00]" />
                  Insight & Perspective
                </div>
                
                <h1 className="text-[4.5rem] sm:text-[6rem] lg:text-[8.5rem] font-display font-medium tracking-tight leading-[0.85] text-white uppercase mb-8">
                  The <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4FF00] via-green-400 to-indigo-400 font-serif italic pr-4">Journal.</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-400 font-sans max-w-2xl leading-relaxed">
                  Strategi digital kelas eksekutif. Temukan wawasan mendalam mengenai algoritma Google, arsitektur website modern, dan psikologi konsumtif. 
                </p>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-4 lg:pb-6 flex lg:justify-end"
            >
              <div className="relative w-full max-w-[340px] group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-[#D4FF00] rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500 -z-10" />
                <div className="relative bg-[#0D111A]/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] rounded-2xl p-2 flex items-center transition-all duration-300 focus-within:bg-[#131825]">
                  <Search size={20} className="text-gray-500 ml-4 group-focus-within:text-[#D4FF00]" />
                  <input 
                    type="text" 
                    placeholder="Cari insight..."
                    className="w-full bg-transparent py-4 pl-4 pr-6 text-base font-sans font-medium placeholder:text-gray-600 text-white focus:outline-none"
                  />
                  <button className="bg-[#D4FF00] text-[#06080F] font-sans font-semibold text-[11px] uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-[#c2e600] transition-colors shadow-sm">
                    Search
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 w-full relative z-10">
        {/* Featured Article */}
        {featuredArticle && (
          <motion.article 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
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
                 <div className="w-full aspect-[4/5] rounded-[2rem] bg-gradient-to-br from-[#4F46E5]/20 to-transparent border border-white/5 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-700 shadow-sm">
                    <div className="text-[14rem] font-display font-medium text-white/5 rotate-12 select-none">SEO</div>
                 </div>
               </div>
             </div>
          </motion.article>
        )}

        {/* Categories Bar */}
        <div className="flex items-center gap-4 border-b border-white/5 pb-6 mb-16 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-sans font-semibold tracking-widest uppercase text-gray-500 whitespace-nowrap">Filter:</span>
          {['All Insights', 'SEO', 'Strategy', 'Design', 'Performance'].map((cat, idx) => (
            <button 
              key={cat}
              className={`px-6 py-2.5 rounded-full text-[11px] font-sans font-semibold uppercase tracking-widest whitespace-nowrap transition-colors ${
                idx === 0 
                ? 'bg-[#D4FF00] text-[#06080F]' 
                : 'text-gray-400 hover:text-white border border-white/5 hover:border-white/20 bg-white/5 backdrop-blur-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Regular Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {regularArticles.map((art, i) => (
            <motion.article 
              key={i} 
              className="group cursor-pointer flex flex-col h-full"
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="flex gap-4 items-center mb-6">
                <span className="text-[10px] font-sans font-semibold text-[#0a0b10] border border-white/5 bg-[#D4FF00] px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                  {art.cat}
                </span>
                <span className="text-[10px] font-mono text-gray-500 font-medium tracking-widest">
                  {art.readTime}
                </span>
              </div>
              <h3 className="text-3xl font-display font-medium text-white leading-[1.15] mb-6 group-hover:text-purple-400 transition-colors tracking-tight">
                {art.title}
              </h3>
              <p className="text-base text-gray-400 leading-relaxed font-sans mb-8">
                {art.desc}
              </p>
              <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between text-[11px] font-sans font-semibold tracking-widest uppercase text-gray-500 group-hover:text-[#D4FF00] transition-colors">
                <span>Baca Artikel</span>
                <ArrowUpRight size={18} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </motion.article>
          ))}
        </div>
        
      </div>
    </motion.div>
  );
}
