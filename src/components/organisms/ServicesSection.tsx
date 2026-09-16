import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import TiltCard from '../atoms/TiltCard';
import { ArrowUpRight, Gauge, Smartphone, MessageCircle, Grid2X2, ChevronDown, Sparkles } from 'lucide-react';

const mainServices = [
  {
    title: "Enterprise Agentic AI",
    slug: "ai-integration",
    color: "#06B6D4",
    glow: "rgba(6, 182, 212, 0.4)",
    number: "01",
    desc: "Otomasi operasional 24/7 menggunakan arsitektur AI otonom tingkat lanjut. Kami mentransformasi bottleneck bisnis menjadi ekosistem cerdas yang bekerja tanpa henti."
  },
  {
    title: "Bespoke Enterprise Web",
    slug: "web-development-nextjs",
    color: "#9333ea",
    glow: "rgba(147, 51, 234, 0.4)",
    number: "02",
    desc: "Rekayasa perangkat lunak eksklusif dengan React & Next.js. Performa sub-detik (Lighthouse 100) dirancang murni untuk dominasi SEO dan retensi pengguna maksimal."
  },
  {
    title: "IT Infrastructure Consulting",
    slug: "it-consulting",
    color: "#10b981",
    glow: "rgba(16, 185, 129, 0.4)",
    number: "03",
    desc: "Audit strategis, skalabilitas arsitektur cloud, dan blueprint IT komprehensif. Fondasi tahan banting untuk pertumbuhan korporat berskala eksponensial."
  }
];

const otherServices = [
  { title: "E-Commerce Automation", desc: "Sinkronisasi stok real-time & checkout cerdas", slug: "ecommerce-automation" },
  { title: "High-Conversion Landing Page", desc: "Sales page teroptimasi konversi dengan psikologi UX premium", slug: "landing-page" },
  { title: "Strategic Web Architecture", desc: "Membangun fondasi digital yang agile dan scalable", slug: "pembuatan-website" },
  { title: "Jasa Web BSD & IT Cisauk", desc: "Dominasi SEO Lokal Tangerang dengan High-Performance Web", slug: "jasa-pembuatan-website-bsd-cisauk" },
  { title: "Performance Marketing Ads", desc: "Akuisisi pelanggan presisi (ROAS terukur)", slug: "digital-marketing" },
  { title: "Proactive Maintenance", desc: "Monitoring uptime 24/7 & jaminan keamanan", slug: "maintenance" }
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
    desc: "Menangkap peluang dari 80% audiens mobile dengan UX khusus tap & swipe."
  },
  {
    icon: MessageCircle,
    title: "Direct Live Chat Funnel",
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
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-white text-slate-900 relative overflow-hidden select-none min-h-screen flex items-center justify-center border-t border-slate-100">
      {/* Seamless background blending gradients */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(147,51,234,0.03),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(6,182,212,0.03),transparent_50%)] pointer-events-none" 
      />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full py-12">
        
        {/* Header Section - Premium B2B Focus */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 mb-6 shadow-sm">
              <Sparkles size={14} className="text-purple-600" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-700">
                Pilar Rekayasa Digital
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tight text-slate-900 mb-6 leading-[1.1]">
              Arsitektur Sistem <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-purple-500">Kelas Enterprise.</span>
            </h2>
            <p className="text-slate-600 font-sans text-base md:text-lg leading-relaxed font-normal">
              Kami tidak sekadar membuat website. Kami merancang ekosistem digital performa tinggi dan otomasi Agentic AI yang secara agresif mengakselerasi valuasi dan dominasi korporasi Anda.
            </p>
          </div>
          
          <div className="hidden md:flex shrink-0">
            <p className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-widest text-right">
              MENDUKUNG SKALABILITAS <br/>
              TANPA BATAS (24/7)
            </p>
          </div>
        </div>

        {/* High Fidelity Ultra-Premium Grid (Cards) */}
        <div className="mb-20 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {mainServices.map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.15 }}
              className="group block h-full"
            >
              <TiltCard className="h-full block z-20">
              <Link
                to={`/layanan/${service.slug}`}
                onClick={() => window.scrollTo(0, 0)}
                className="relative flex flex-col h-full justify-between p-8 sm:p-10 bg-white border border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] rounded-3xl hover:border-purple-200 transition-all duration-500 overflow-hidden transform"
              >
                {/* Visual hover color ripple overlay */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-all duration-700 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(circle at top right, ${service.color}, transparent 80%)`
                  }}
                />

                <div className="relative z-10 flex-grow">
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-display text-4xl font-black text-slate-200 group-hover:text-purple-100 transition-colors duration-500">
                      {service.number}
                    </span>
                    <span className="relative flex h-8 w-8 items-center justify-center shrink-0">
                      <span 
                        className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-10 group-hover:opacity-30 transition-all duration-500"
                        style={{ backgroundColor: service.color }}
                      />
                      <span 
                        className="relative inline-flex rounded-full h-3 w-3"
                        style={{ 
                          backgroundColor: service.color,
                          boxShadow: `0 0 12px ${service.glow}`
                        }}
                      />
                    </span>
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-display font-black tracking-tight text-slate-900 group-hover:text-purple-900 transition-colors duration-300 mb-4 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 font-sans text-sm leading-relaxed mb-10">
                    {service.desc}
                  </p>
                </div>

                <div className="relative z-10 flex items-center justify-between pt-6 border-t border-slate-100 mt-auto">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest group-hover:text-purple-600 transition-colors">
                    DETAIL LAYANAN
                  </span>
                  <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center bg-slate-50 group-hover:bg-purple-600 group-hover:border-purple-600 transition-all duration-300">
                    <ArrowUpRight strokeWidth={2} 
                      className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" 
                    />
                  </div>
                </div>
              </Link>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Toggle Button for Supplementary Services */}
        <div className="flex justify-center mb-16 relative z-10">
          <button
            onClick={() => setShowOtherServices(!showOtherServices)}
            className="group flex items-center gap-3 px-8 py-4 rounded-full border border-slate-200 bg-white hover:bg-slate-50 hover:border-purple-300 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer select-none text-xs font-mono font-bold tracking-wider text-slate-700 hover:text-purple-900"
          >
            <span className="relative flex h-2 w-2 items-center justify-center shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-50" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-purple-600" />
            </span>
            <span>{showOtherServices ? 'TUTUP KATALOG EKSTENSI' : 'LIHAT KATALOG EKSTENSI'}</span>
            <ChevronDown strokeWidth={2} 
              className={`w-4 h-4 text-slate-400 group-hover:text-purple-600 transition-transform duration-500 ${showOtherServices ? 'rotate-180' : ''}`}
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
              <div className="p-8 sm:p-12 border border-slate-200 rounded-3xl bg-slate-50 relative overflow-hidden">
                <div className="absolute top-0 left-12 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-slate-200 pb-8 relative z-10">
                  <div>
                    <span className="text-slate-500 font-mono text-[10px] font-bold uppercase tracking-widest block mb-2">SUPPLEMENTARY SERVICES</span>
                    <h4 className="text-2xl sm:text-3xl font-display font-black text-slate-900 tracking-tight">Katalog Ekstensi Operasional</h4>
                  </div>
                  <p className="text-sm text-slate-600 font-sans max-w-sm">
                    Dukungan infrastruktur end-to-end yang menjamin stabilitas dan pertumbuhan tanpa batas.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
                  {otherServices.map((o) => (
                    <motion.div
                      key={o.slug}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        to={`/layanan/${o.slug}`}
                        onClick={() => window.scrollTo(0,0)}
                        className="flex items-center justify-between p-6 border border-slate-200 rounded-2xl bg-white hover:border-purple-300 hover:bg-purple-50/50 shadow-sm hover:shadow-md transition-all duration-300 group"
                      >
                        <div className="flex flex-col gap-1 pr-4">
                          <span className="text-sm font-sans font-bold text-slate-900 group-hover:text-purple-900 transition-colors">{o.title}</span>
                          <span className="text-[11px] font-sans text-slate-500 leading-relaxed">{o.desc}</span>
                        </div>
                        <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center shrink-0 bg-slate-50 group-hover:bg-purple-600 group-hover:border-purple-600 transition-colors">
                          <ArrowUpRight strokeWidth={2} size={14} className="text-slate-400 group-hover:text-white transition-colors" />
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
          className="border border-slate-200 rounded-3xl bg-slate-900 relative overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(147,51,234,0.15),transparent_60%)] pointer-events-none" />
          
          <div className="p-8 sm:p-12 lg:p-16 relative z-10">
            <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
              <div className="md:w-1/3">
                <span className="text-purple-400 font-mono font-bold text-[10px] uppercase tracking-widest block mb-4">
                  KEUNGGULAN ARSITEKTUR
                </span>
                <h3 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-white mb-6 leading-tight">
                  Standar Mutu <br/> Tanpa Kompromi.
                </h3>
                <p className="text-white font-sans text-sm leading-relaxed opacity-90">
                  Kami menolak penggunaan template instan. Setiap baris kode ditulis untuk memastikan stabilitas tingkat tinggi, performa kilat, dan arsitektur yang siap di-*scale* kapan saja.
                </p>
              </div>
              
              <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
                {features.map((f, i) => (
                  <motion.div 
                    key={i} 
                    className="flex gap-4 items-start"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ type: "spring", stiffness: 100, damping: 20, delay: i * 0.1 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-purple-900/40 border border-purple-500/30 shrink-0 flex items-center justify-center text-purple-400 mt-1 shadow-inner">
                      <f.icon size={22} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="text-base font-bold font-display tracking-wide mb-2 text-white">
                        {f.title}
                      </h4>
                      <p className="text-xs sm:text-sm font-sans text-white leading-relaxed opacity-80">
                        {f.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* View All Services Hub CTA */}
        <div className="mt-16 flex justify-center">
          <Link
            to="/layanan"
            onClick={() => window.scrollTo(0, 0)}
            className="flex items-center gap-3 px-10 py-5 bg-slate-900 hover:bg-purple-900 text-white rounded-2xl font-sans font-black text-sm uppercase tracking-widest transition-all shadow-xl hover:-translate-y-1 group"
          >
            <span>Eksplor Semua Layanan</span>
            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
