import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Gauge, Smartphone, MessageCircle, Grid2X2, ChevronDown } from 'lucide-react';

const mainServices = [
  {
    title: "eCommerce & Retail Automation",
    slug: "toko-online",
    color: "#E11D48", // Pink-Rose dot
    glow: "rgba(225, 29, 72, 0.3)",
    number: "L-01"
  },
  {
    title: "Enterprise Information Systems",
    slug: "sistem-informasi",
    color: "#06B6D4", // Cyan-Teal dot
    glow: "rgba(6, 182, 212, 0.3)",
    number: "L-02"
  },
  {
    title: "Corporate Identity Platforms",
    slug: "company-profile",
    color: "#F97316", // Orange dot
    glow: "rgba(249, 115, 22, 0.3)",
    number: "L-03"
  },
  {
    title: "High-Conversion Landing Pages",
    slug: "landing-page",
    color: "#22C55E", // Green dot
    glow: "rgba(34, 197, 110, 0.3)",
    number: "L-04"
  },
  {
    title: "Custom Web Applications",
    slug: "aplikasi-web",
    color: "#A855F7", // Purple dot
    glow: "rgba(168, 85, 247, 0.3)",
    number: "L-05"
  }
];

const otherServices = [
  { title: "Strategic Web Architecture", desc: "Membangun fondasi digital yang agile dan scalable", slug: "pembuatan-website" },
  { title: "SEO & Market Dominance", desc: "Mendominasi visibilitas pencarian organik secara konsisten", slug: "seo" },
  { title: "Performance Marketing Ads", desc: "Akuisisi pelanggan presisi dengan metrik konversi terukur", slug: "digital-marketing" },
  { title: "Proactive Maintenance", desc: "Infrastruktur tetap tangguh dengan monitoring 24/7", slug: "maintenance" }
];

const features = [
  {
    icon: Gauge,
    title: "Infrastruktur Ultra-Ringan",
    desc: "Akselerasi retensi pengguna dengan load time di bawah 0.8 detik pada traffic tinggi."
  },
  {
    icon: Smartphone,
    title: "Mobile-First Conversion",
    desc: "Menangkap peluang dari 80% audiens mobile dengan antarmuka UX yang dioptimalkan untuk tap & swipe."
  },
  {
    icon: MessageCircle,
    title: "Direct WhatsApp Funnel",
    desc: "Persingkat journey pelanggan dengan integrasi direct-chat yang mendorong close-rate seketika."
  },
  {
    icon: Grid2X2,
    title: "Bespoke Brand Aesthetics",
    desc: "Tinggalkan template. Kami merancang identitas eksklusif yang memproyeksikan otoritas pasar Anda."
  }
];

export default function ServicesSection() {
  const [showOtherServices, setShowOtherServices] = useState(false);
  return (
    <section className="py-24 md:py-32 bg-transparent text-slate-900 relative overflow-hidden select-none min-h-screen flex items-center justify-center">
      {/* Seamless background blending gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-50/30 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.08),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(6,182,212,0.05),transparent_40%)] pointer-events-none" />
      
      <div className="mx-auto max-w-5xl px-6 relative z-10 w-full py-12">
        
        {/* Header Section */}
        <div className="mb-20 max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-600">
                PILIHAN STRATEGIS
              </span>
            </div>
          </div>
          <h2 className="text-fluid-h2 font-display font-medium tracking-tight text-slate-900 mb-6 leading-tight">
            Kemitraan Untuk Skalabilitas <br className="hidden md:block" />
            Tanpa Batas.
          </h2>
          <p className="text-slate-600 font-sans text-sm md:text-lg leading-relaxed max-w-2xl font-light">
            Kami membangun arsitektur digital premium yang secara proaktif mempercepat pertumbuhan revenue Anda. Dari automasi eCommerce hingga AI Agentic mandiri, setiap baris kode dirancang murni untuk memaksimalkan ROI (Return on Investment).
          </p>
        </div>

        {/* High Fidelity Minimalist List (Cards) */}
        <div className="mb-20 space-y-4">
          {mainServices.map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group block"
            >
              <Link
                to={`/layanan/${service.slug}`}
                onClick={() => window.scrollTo(0, 0)}
                className="relative flex flex-col md:flex-row md:items-center justify-between py-8 px-8 sm:px-12 bg-white/40 backdrop-blur-md border border-white shadow-sm rounded-[2.5rem] hover:bg-white hover:border-[#4f46e5]/30 transition-all duration-500 overflow-hidden transform hover:scale-[1.02] hover:shadow-[0_20px_60px_-15px_rgba(79,70,229,0.15)] hover:z-20"
              >
                {/* Visual hover color ripple overlay */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-[0.05] transition-all duration-700 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(circle at 10% 50%, ${service.color}, transparent 60%)`
                  }}
                />

                {/* Left side: Colored dot + Title */}
                <div className="flex items-center gap-6 sm:gap-10 relative z-10 w-full md:w-auto">
                  {/* Digital Index number */}
                  <span className="font-mono text-xs text-slate-400 group-hover:text-indigo-500 font-semibold tracking-wider transition-colors pt-0.5 hidden sm:inline">
                    {service.number}
                  </span>

                  {/* Bullet Dot with Neon Glow */}
                  <span className="relative flex h-5 w-5 items-center justify-center shrink-0">
                    <span 
                      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-20 group-hover:opacity-50 transition-all duration-500"
                      style={{ backgroundColor: service.color }}
                    />
                    <span 
                      className="relative inline-flex rounded-full h-3 w-3 border-2 border-white shadow-[0_0_8px_rgba(0,0,0,0.1)]"
                      style={{ 
                        backgroundColor: service.color,
                        boxShadow: `0 0 15px ${service.glow}`
                      }}
                    />
                  </span>

                  {/* Bold Elegant Title */}
                  <div className="flex flex-col">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-medium tracking-tight text-slate-800 group-hover:text-indigo-900 transition-all duration-300">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Right side: Icon chevron/arrow */}
                <div className="flex items-center justify-end gap-6 relative z-10 mt-6 md:mt-0 w-full md:w-auto">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest hidden lg:inline group-hover:text-indigo-600 transition-colors pt-0.5">
                    LIHAT SKENARIO
                  </span>
                  <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center bg-white group-hover:bg-indigo-600 group-hover:border-indigo-600 shadow-sm transition-all duration-300">
                    <ArrowUpRight strokeWidth={1} 
                      className="w-5 h-5 text-slate-400 group-hover:text-white group-hover:rotate-45 transition-all duration-300" 
                     
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Toggle Button for Supplementary Services */}
        <div className="flex justify-center mb-16 relative z-10">
          <button
            onClick={() => setShowOtherServices(!showOtherServices)}
            className="group flex items-center gap-3 px-6 py-3.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-50 hover:border-[#4f46e5]/40 transition-all duration-300 shadow-[0_10px_35px_rgba(0,0,0,0.5)] cursor-pointer select-none text-xs font-mono font-bold tracking-wider text-gray-700 hover:text-slate-900"
          >
            <span className="relative flex h-2 w-2 items-center justify-center shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4f46e5] opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#4f46e5]" />
            </span>
            <span>{showOtherServices ? 'TUTUP LAYANAN LAINNYA' : 'TAMPILKAN LAYANAN LAINNYA'}</span>
            <ChevronDown strokeWidth={1} 
              className={`w-4 h-4 text-slate-600 group-hover:text-[#4f46e5] transition-transform duration-500 ${showOtherServices ? 'rotate-180' : ''}`} 
             
            />
          </button>
        </div>

        {/* Collapsible Supplementary Services Area */}
        <AnimatePresence initial={false}>
          {showOtherServices && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ 
                opacity: 1, 
                height: "auto", 
                marginBottom: 96,
                transition: { 
                  height: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                  opacity: { duration: 0.3, delay: 0.1 }
                } 
              }}
              exit={{ 
                opacity: 0, 
                height: 0, 
                marginBottom: 0,
                transition: { 
                  height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                  opacity: { duration: 0.2 }
                }
              }}
              className="overflow-hidden"
            >
              <div className="p-8 sm:p-10 border border-slate-100 rounded-[2.5rem] bg-gradient-to-br from-white/[0.01] to-transparent relative overflow-hidden backdrop-blur-md">
                <div className="absolute top-0 left-12 w-24 h-24 bg-[#4f46e5]/5 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-slate-100 pb-6">
                  <div>
                    <span className="text-slate-500 font-mono text-[9px] uppercase tracking-widest block mb-1">STRATEGIC SUPPORT</span>
                    <h4 className="text-lg sm:text-xl font-display font-medium text-slate-900 tracking-tight">Katalog Ekstensi Layanan</h4>
                  </div>
                  <p className="text-xs text-slate-600 font-sans max-w-sm">
                    Kami mendukung ekosistem digital Anda melalui manajemen operasional yang proaktif dari hulu ke hilir.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {otherServices.map((o) => (
                    <motion.div
                      key={o.slug}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        to={`/layanan/${o.slug}`}
                        onClick={() => window.scrollTo(0,0)}
                        className="flex items-center justify-between p-5 border border-white/60 rounded-2xl bg-white/30 backdrop-blur-md hover:border-white hover:bg-white/50 shadow-sm transition-all duration-300 group"
                      >
                        <div className="flex flex-col gap-1 pr-4">
                          <span className="text-sm font-sans font-bold text-gray-700 group-hover:text-[#4f46e5] transition-colors">{o.title}</span>
                          <span className="text-[11px] font-sans text-slate-500">{o.desc}</span>
                        </div>
                        <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center shrink-0 bg-slate-100 group-hover:bg-[#4f46e5] group-hover:border-[#4f46e5] transition-colors">
                          <ArrowUpRight strokeWidth={1} size={14} className="text-slate-600 group-hover:text-white transition-colors" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Features Integrated - Single Element */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="border border-[#4f46e5]/20 rounded-[2.5rem] bg-gradient-to-b from-[#4f46e5]/5 to-transparent relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          <div className="absolute inset-0 bg-slate-100 backdrop-blur-md -z-10" />
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#4f46e5]/50 to-transparent" />
          
          <div className="p-8 md:p-12">
            <div className="text-center mb-12 md:mb-16">
              <span className="text-[#4f46e5] font-sans font-medium text-[10px] uppercase tracking-[0.25em] block mb-4">
                TECHNICAL SUPERIORITY
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-medium tracking-tight mb-5">Keunggulan Arsitektur Kami.</h3>
              <p className="text-slate-600 font-sans text-xs md:text-sm max-w-xl mx-auto leading-relaxed font-light">
                Standar teknis tanpa kompromi memastikan setiap proyek yang kami rilis memiliki fondasi keamanan, kecepatan, dan konversi tertinggi di kelasnya.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
              {features.map((f, i) => (
                <div key={i} className="flex gap-4 sm:gap-6 lg:flex-col lg:gap-4 relative group">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-white border border-[#4f46e5]/20 flex items-center justify-center text-[#4f46e5] group-hover:bg-[#4f46e5] group-hover:text-white transition-colors duration-300 shadow-sm">
                    <f.icon size={22} />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold font-sans tracking-tight mb-1.5 text-slate-900 group-hover:text-[#4f46e5] transition-colors">
                      {f.title}
                    </h4>
                    <p className="text-[11px] sm:text-xs font-sans text-slate-600 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
