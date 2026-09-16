import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { 
  Code2, 
  Bot, 
  ShoppingBag, 
  Target, 
  Terminal, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Award, 
  CheckCircle2, 
  Cpu, 
  MessageCircle,
  Clock,
  Compass
} from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';
import SEOProvider from '../components/atoms/SEOProvider';
import MetaTags from '../components/atoms/MetaTags';
import FadeInSection from '../components/atoms/FadeInSection';

export default function ServicesHubPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const services = Object.values(SERVICES_DATA).filter((s, i, arr) => arr.findIndex(t => t.slug === s.slug) === i);

  const getIcon = (slug: string) => {
    switch (slug) {
      case 'web-development-nextjs': return Code2;
      case 'ai-integration': return Bot;
      case 'ecommerce-automation': return ShoppingBag;
      case 'landing-page': return Target;
      case 'jasa-it': return Terminal;
      default: return Code2;
    }
  };

  const whatsappUrl = `https://wa.me/6282125447232?text=${encodeURIComponent('Halo Mas Chesta, saya ingin konsultasi mengenai layanan IT dan Digital di CHESTAADOTCOM.')}`;

  return (
    <div ref={containerRef} className="min-h-screen pt-32 pb-24 bg-white text-slate-900 relative overflow-hidden">
      <SEOProvider 
        title="Layanan Digital Premium | Web Dev, AI & IT Consulting"
        description="Solusi teknologi komprehensif dari Web Development Next.js, Otomatisasi AI, E-Commerce, hingga Infrastruktur IT Enterprise. Berbasis di BSD City & Cisauk."
      />

      <MetaTags 
        title="Layanan Digital Premium | CHESTAADOTCOM"
        description="Jelajahi ekosistem layanan teknologi kami. Dari pembuatan website high-performance hingga integrasi kecerdasan buatan."
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'Layanan', item: '/layanan' }
        ]}
      />

      {/* Parallax Background */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute inset-0 -z-10 pointer-events-none"
      >
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-50 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-50 rounded-full blur-[100px] opacity-40" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Hero Section */}
        <div className="max-w-4xl mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-purple-50 border border-purple-200 text-purple-900 text-xs font-mono font-bold uppercase tracking-wider mb-6"
          >
            <Sparkles size={14} className="text-purple-700" />
            Boutique IT Consultancy & Software House
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-display font-black text-slate-900 tracking-tight leading-[1.05] mb-8"
          >
            Ekosistem Solusi <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Teknologi Tanpa Batas.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 font-sans leading-relaxed max-w-2xl"
          >
            Kami tidak hanya membangun kode; kami membangun keunggulan kompetitif. Jelajahi spektrum layanan kami yang dirancang untuk performa, keamanan, dan pertumbuhan bisnis eksponensial.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {services.map((service, idx) => {
            const Icon = getIcon(service.slug);
            return (
              <FadeInSection key={service.slug} delay={idx * 0.1}>
                <Link 
                  to={`/layanan/${service.slug}`}
                  className="group relative flex flex-col h-full bg-white border border-slate-200 rounded-3xl p-8 hover:border-purple-300 hover:shadow-2xl hover:shadow-purple-100 transition-all duration-500 overflow-hidden"
                >
                  {/* Decorative background glow */}
                  <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-purple-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="mb-6 relative">
                    <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-700 border border-purple-100 group-hover:bg-purple-600 group-hover:text-white transition-all duration-500 shadow-sm">
                      <Icon size={28} strokeWidth={1.5} />
                    </div>
                  </div>

                  <div className="flex-1 mb-8">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono font-bold text-purple-600 uppercase tracking-widest">{service.category}</span>
                      <div className="flex items-center gap-1.5 text-[10px] font-mono font-medium text-slate-400">
                        <Clock size={12} />
                        {service.investment.duration.split(' ')[1]} {service.investment.duration.split(' ')[2]}
                      </div>
                    </div>
                    <h3 className="text-2xl font-display font-bold text-slate-900 mb-4 group-hover:text-purple-950 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {service.heroDescription}
                    </p>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-100">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono text-slate-400 uppercase">Investasi</span>
                      <span className="text-sm font-bold text-slate-900">{service.investment.price.split(' ')[2]} {service.investment.price.split(' ')[3]}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-purple-700 group-hover:translate-x-1 transition-transform">
                      Detail Layanan
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              </FadeInSection>
            );
          })}
        </div>

        {/* Why Us / Trust Section */}
        <div className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-mono font-bold text-purple-700 uppercase tracking-widest block mb-4">Arsitektur Tanpa Kompromi</span>
              <h2 className="text-3xl sm:text-5xl font-display font-black text-slate-900 tracking-tight leading-tight mb-8">
                Mengapa Mempercayakan <br /> Bisnis Anda pada Kami?
              </h2>
              <div className="space-y-6">
                {[
                  { 
                    title: "Performa Kelas Dunia", 
                    desc: "Website dengan skor PageSpeed 99+ dan loading sub-detik untuk konversi maksimal.",
                    icon: Zap,
                    color: "text-amber-500",
                    bg: "bg-amber-50"
                  },
                  { 
                    title: "Keamanan Enterprise", 
                    desc: "Implementasi standar zero-trust dan enkripsi data untuk perlindungan mutlak.",
                    icon: ShieldCheck,
                    color: "text-emerald-500",
                    bg: "bg-emerald-50"
                  },
                  { 
                    title: "Inovasi AI Otonom", 
                    desc: "Integrasi model LLM tercanggih untuk otomatisasi operasional 24/7.",
                    icon: Cpu,
                    color: "text-purple-600",
                    bg: "bg-purple-50"
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-5">
                    <div className={`w-12 h-12 shrink-0 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center border border-current/10 shadow-sm`}>
                      <item.icon size={22} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-[40px] bg-slate-900 p-8 sm:p-12 overflow-hidden relative shadow-2xl">
                {/* Decorative coding aesthetic elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
                
                <div className="relative z-10 space-y-8">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  
                  <div className="space-y-4 font-mono text-sm leading-relaxed text-slate-100">
                    <div className="text-purple-400">const chestaa = {'{'}</div>
                    <div className="pl-4">speed: "Sub-0.5s",</div>
                    <div className="pl-4">seo: "Extreme Optimization",</div>
                    <div className="pl-4">ai: "Agentic Automation",</div>
                    <div className="pl-4">ownership: "100% Client-Owned",</div>
                    <div className="pl-4">support: "24/7 Enterprise SLA"</div>
                    <div className="text-purple-400">{'}'};</div>
                  </div>

                  <div className="pt-8 border-t border-white/10 grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-display font-black text-white mb-1">99+</div>
                      <div className="text-[10px] font-mono text-white opacity-60 uppercase tracking-widest">PageSpeed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-display font-black text-white mb-1">0%</div>
                      <div className="text-[10px] font-mono text-white opacity-60 uppercase tracking-widest">Commission</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Float label */}
              <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-md border border-purple-200 p-6 rounded-3xl shadow-xl max-w-[240px]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-700">
                    <Award size={20} />
                  </div>
                  <span className="text-xs font-bold text-slate-900 leading-tight">Pemenang Client Choice 2026</span>
                </div>
                <p className="text-[10px] text-slate-500 font-sans">Dipercaya oleh 50+ bisnis untuk transformasi digital yang nyata.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Global CTA */}
        <div className="rounded-[40px] bg-slate-950 text-white p-12 sm:p-20 relative overflow-hidden text-center border border-purple-500/30">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest block mb-4">Mulai Transformasi Anda</span>
            <h2 className="text-4xl sm:text-6xl font-display font-black text-white tracking-tight leading-tight mb-8">
              Siap Membangun Masa Depan <br /> Digital Bersama Kami?
            </h2>
            <p className="text-lg text-white opacity-90 font-sans mb-10 leading-relaxed">
              Diskusikan tantangan bisnis Anda hari ini. Kami akan memberikan audit teknis gratis dan strategi implementasi yang terukur.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-10 py-5 bg-white text-slate-950 hover:bg-purple-50 rounded-2xl font-sans font-black text-sm uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-3 group"
              >
                <MessageCircle size={18} className="text-purple-600" />
                <span>Konsultasi Strategis</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                to="/case-studies"
                className="w-full sm:w-auto px-10 py-5 bg-transparent border-2 border-white/20 hover:border-white/40 text-white rounded-2xl font-sans font-bold text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3"
              >
                <span>Lihat Studi Kasus</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
