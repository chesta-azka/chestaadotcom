import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Gauge, Smartphone, MessageCircle, Grid2X2, ChevronDown } from 'lucide-react';

const mainServices = [
  {
    title: "Toko Online",
    slug: "toko-online",
    color: "#E11D48", // Pink-Rose dot
    glow: "rgba(225, 29, 72, 0.3)",
    number: "L-01"
  },
  {
    title: "Sistem Informasi",
    slug: "sistem-informasi",
    color: "#06B6D4", // Cyan-Teal dot
    glow: "rgba(6, 182, 212, 0.3)",
    number: "L-02"
  },
  {
    title: "Company Profile",
    slug: "company-profile",
    color: "#F97316", // Orange dot
    glow: "rgba(249, 115, 22, 0.3)",
    number: "L-03"
  },
  {
    title: "Landing Page",
    slug: "landing-page",
    color: "#22C55E", // Green dot
    glow: "rgba(34, 197, 110, 0.3)",
    number: "L-04"
  },
  {
    title: "Aplikasi Web",
    slug: "aplikasi-web",
    color: "#A855F7", // Purple dot
    glow: "rgba(168, 85, 247, 0.3)",
    number: "L-05"
  }
];

const otherServices = [
  { title: "Jasa Pembuatan Website", desc: "Situs kustom premium responsif", slug: "pembuatan-website" },
  { title: "Optimasi SEO Google", desc: "Dominasi halaman ranking pencarian", slug: "seo" },
  { title: "Digital Marketing Ads", desc: "Strategi beriklan hasilkan konversi", slug: "digital-marketing" },
  { title: "Sistem Maintenance", desc: "Keamanan & performa terjaga 24/7", slug: "maintenance" }
];

const features = [
  {
    icon: Gauge,
    title: "Arsitektur Ultra-Ringan",
    desc: "Load time di bawah 0.8 detik. Pastikan website Anda tidak pernah lambat."
  },
  {
    icon: Smartphone,
    title: "Mobile-First Perfection",
    desc: "Desain tanpa cacat untuk 80% pengunjung Anda yang menggunakan mobile."
  },
  {
    icon: MessageCircle,
    title: "Konversi WhatsApp",
    desc: "UI yang langsung menuntun calon pembeli ke WA dengan satu klik."
  },
  {
    icon: Grid2X2,
    title: "Premium Aesthetics",
    desc: "Tinggalkan template murahan dengan identitas eksklusif yang membedakan Anda."
  }
];

export default function ServicesSection() {
  const [showOtherServices, setShowOtherServices] = useState(false);
  return (
    <section className="py-24 bg-transparent text-gray-900 relative overflow-hidden select-none">
      {/* Seamless background blending gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,70,229,0.02),transparent_40%)] pointer-events-none" />
      
      <div className="mx-auto max-w-5xl px-6 relative z-10">
        
        {/* Header Section */}
        <div className="mb-20 max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[#4f46e5]" />
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-[#4f46e5] uppercase pt-0.5">
              LAYANAN UTAMA KAMI
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tight mb-6">
            Daftar Arsitektur Layanan <br className="hidden md:block" />
            Terbaik Untuk UMKM & Brand.
          </h2>
          <p className="text-gray-600 font-sans text-sm md:text-base leading-relaxed max-w-xl">
            Solusi rancang bangun digital berkualitas tinggi, dirancang khusus dengan kode premium yang cepat, interaktif, dan berorientasi pada konversi.
          </p>
        </div>

        {/* High Fidelity Minimalist List (exactly matching the user mockup) */}
        <div className="border-t border-b border-gray-200 mb-20 bg-white/[0.01] rounded-3xl overflow-hidden backdrop-blur-sm">
          {mainServices.map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Link
                to={`/layanan/${service.slug}`}
                onClick={() => window.scrollTo(0, 0)}
                className="group relative flex items-center justify-between py-8 px-6 sm:px-10 border-b border-gray-200 last:border-b-0 hover:bg-white/[0.02] transition-all duration-300 md:py-10"
              >
                {/* Visual hover color ripple overlay */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-all duration-500 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(circle at 10% 50%, ${service.color}, transparent 60%)`
                  }}
                />

                {/* Left side: Colored dot + Title */}
                <div className="flex items-center gap-4 sm:gap-8 relative z-10">
                  {/* Digital Index number */}
                  <span className="font-mono text-xs text-gray-600 group-hover:text-gray-600 tracking-wider transition-colors pt-0.5 hidden sm:inline">
                    {service.number}
                  </span>

                  {/* Bullet Dot with Neon Glow */}
                  <span className="relative flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center shrink-0">
                    <span 
                      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-30 group-hover:opacity-70 transition-all duration-500"
                      style={{ backgroundColor: service.color }}
                    />
                    <span 
                      className="relative inline-flex rounded-full h-3 w-3 sm:h-3.5 sm:w-3.5 border-2 border-[#06080F] shadow-[0_0_12px_rgba(255,255,255,0.4)]"
                      style={{ 
                        backgroundColor: service.color,
                        boxShadow: `0 0 15px ${service.glow}`
                      }}
                    />
                  </span>

                  {/* Bold Elegant Title */}
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold tracking-tight text-gray-200 group-hover:text-gray-900 group-hover:translate-x-1.5 transition-all duration-300">
                    {service.title}
                  </h3>
                </div>

                {/* Right side: Icon chevron/arrow */}
                <div className="flex items-center gap-4 relative z-10">
                  <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest hidden md:inline group-hover:text-[#4f46e5] transition-colors pt-0.5">
                    VIEW DETAILS
                  </span>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-100 flex items-center justify-center bg-white/[0.02] group-hover:bg-[#4f46e5] group-hover:border-[#4f46e5] group-hover:shadow-[0_0_20px_rgba(79,70,229,0.35)] transition-all duration-300">
                    <ArrowUpRight 
                      className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:rotate-45 transition-all duration-300" 
                      strokeWidth={1.5}
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
            className="group flex items-center gap-3 px-6 py-3.5 rounded-full border border-gray-200 bg-gray-50 hover:bg-gray-50 hover:border-[#4f46e5]/40 transition-all duration-300 shadow-[0_10px_35px_rgba(0,0,0,0.5)] cursor-pointer select-none text-xs font-mono font-bold tracking-wider text-gray-700 hover:text-gray-900"
          >
            <span className="relative flex h-2 w-2 items-center justify-center shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4f46e5] opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#4f46e5]" />
            </span>
            <span>{showOtherServices ? 'TUTUP LAYANAN LAINNYA' : 'TAMPILKAN LAYANAN LAINNYA'}</span>
            <ChevronDown 
              className={`w-4 h-4 text-gray-600 group-hover:text-[#4f46e5] transition-transform duration-500 ${showOtherServices ? 'rotate-180' : ''}`} 
              strokeWidth={2}
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
              <div className="p-8 sm:p-10 border border-gray-100 rounded-[2.5rem] bg-gradient-to-br from-white/[0.01] to-transparent relative overflow-hidden backdrop-blur-md">
                <div className="absolute top-0 left-12 w-24 h-24 bg-[#4f46e5]/5 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-gray-100 pb-6">
                  <div>
                    <span className="text-gray-500 font-mono text-[9px] uppercase tracking-widest block mb-1">SUPPLEMENTARY SOLUTIONS</span>
                    <h4 className="text-lg sm:text-xl font-display font-medium text-gray-900 tracking-tight">Katalog Layanan Lainnya</h4>
                  </div>
                  <p className="text-xs text-gray-600 font-sans max-w-sm">
                    Kami juga menunjang kebutuhan ekosistem bisnis online Anda secara komprehensif dari hulu ke hilir.
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
                        className="flex items-center justify-between p-5 border border-gray-100 rounded-2xl bg-gray-50 hover:border-[#4f46e5]/30 hover:bg-gray-50 transition-all duration-300 group"
                      >
                        <div className="flex flex-col gap-1 pr-4">
                          <span className="text-sm font-sans font-bold text-gray-700 group-hover:text-[#4f46e5] transition-colors">{o.title}</span>
                          <span className="text-[11px] font-sans text-gray-500">{o.desc}</span>
                        </div>
                        <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center shrink-0 bg-gray-100 group-hover:bg-[#4f46e5] group-hover:border-[#4f46e5] transition-colors">
                          <ArrowUpRight size={14} className="text-gray-600 group-hover:text-white transition-colors" />
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
          <div className="absolute inset-0 bg-gray-100 backdrop-blur-md -z-10" />
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#4f46e5]/50 to-transparent" />
          
          <div className="p-8 md:p-12">
            <div className="text-center mb-12 md:mb-16">
              <span className="text-[#4f46e5] font-sans font-medium text-[10px] uppercase tracking-[0.25em] block mb-4">
                CORE CAPABILITIES
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-5xl font-display font-medium tracking-tight mb-5">Nilai Lebih Untuk Bisnis Anda.</h3>
              <p className="text-gray-600 font-sans text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
                Standar kualitas paripurna tanpa kompromi performa dan fungsionalitas yang Anda dapatkan di setiap arsitektur proyek kami.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
              {features.map((f, i) => (
                <div key={i} className="flex gap-4 sm:gap-6 lg:flex-col lg:gap-4 relative group">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-[#0a0b10] border border-[#4f46e5]/20 flex items-center justify-center text-[#4f46e5] group-hover:bg-[#4f46e5] group-hover:text-[#0a0b10] transition-colors duration-300 shadow-[0_4px_20px_rgba(79,70,229,0.1)]">
                    <f.icon size={22} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold font-sans tracking-tight mb-1.5 text-gray-900 group-hover:text-[#4f46e5] transition-colors">
                      {f.title}
                    </h4>
                    <p className="text-[11px] sm:text-xs font-sans text-gray-600 leading-relaxed">
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
