import { useParams, Link } from 'react-router-dom';
import { SERVICES_DATA, ServiceDetailData } from '../data/servicesData';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  Check, 
  ArrowRight, 
  MessageCircle, 
  ChevronRight, 
  Sparkles,
  ShieldCheck,
  Zap,
  AlertTriangle,
  Award,
  Layers,
  Server,
  Cpu,
  Globe,
  Database,
  TrendingUp,
  XCircle,
  ClockAlert,
  EyeOff,
  Calendar,
  Clock,
  Star,
  Quote,
  ChevronLeft
} from 'lucide-react';
import { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import toast from 'react-hot-toast';
import { generateServiceSchema, injectSchemaScript } from '../utils/schemaMarkup';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { useSEOOptimizer } from '../hooks/useSEOOptimizer';
import SocialShare from '../components/molecules/SocialShare';
import { SocialPreviewGenerator } from '../components/molecules/SocialPreviewGenerator';

// Lazy-loaded heavy components for code-splitting & Lighthouse performance optimization
const LazyPricingSection = lazy(() => import('../components/organisms/ServicePricingSection'));
const LazyFaqSection = lazy(() => import('../components/organisms/ServiceFaqSection'));

interface PricingTier {
  name: string;
  price: string;
  subtitle: string;
  badge?: string;
  highlighted?: boolean;
  features: { title: string; impact: string }[];
}

const PRICING_TIERS: PricingTier[] = [
  {
    name: 'Starter',
    price: 'Rp 540k',
    subtitle: 'Fase Uji Coba Cepat.',
    features: [
      { title: '1 Landing Page Premium', impact: '(Desain psikologi marketing untuk mengubah pengunjung sosmed menjadi pembeli).' },
      { title: 'Tombol Auto-Order WA', impact: '(Pelanggan bisa langsung transaksi dalam 1x klik tanpa ribet).' },
      { title: 'Setup Kilat 24 Jam', impact: '(Bisnis Anda siap jualan online mulai besok pagi).' }
    ]
  },
  {
    name: 'Essential',
    price: 'Rp 1.150.000',
    subtitle: 'Membangun Otoritas Brand.',
    features: [
      { title: 'Struktur Web 3 Halaman', impact: '(Home, Layanan, Profil: Membangun kepercayaan mutlak dari calon klien).' },
      { title: 'Domain .com / .id Resmi', impact: '(Brand Anda langsung terlihat bonafide & terdaftar profesional).' },
      { title: 'Optimasi SEO Dasar', impact: '(Mulai ditemukan oleh pelanggan yang mencari di Google).' }
    ]
  },
  {
    name: 'Growth',
    price: 'Rp 2.250.000',
    subtitle: 'Mesin Otomatisasi Sales.',
    badge: 'Paling Laris & Direkomendasikan',
    highlighted: true,
    features: [
      { title: 'Formulir Order Cerdas (API)', impact: '(Sistem menerima pesanan otomatis 24/7 meskipun admin Anda sedang tidur).' },
      { title: 'Akses Dashboard Mandiri', impact: '(Kendalikan web Anda. Ubah teks/gambar kapan saja tanpa biaya tambahan).' },
      { title: 'Google Analytics Setup', impact: '(Lacak darimana pembeli Anda berasal untuk strategi iklan yang akurat).' },
      { title: 'Maksimal 7 Halaman', impact: '(Ruang luas untuk katalog produk dan edukasi market).' }
    ]
  },
  {
    name: 'Enterprise',
    price: 'Rp 5.500.000',
    subtitle: 'Infrastruktur Tanpa Batas.',
    features: [
      { title: 'Sistem Bayar Otomatis', impact: '(Terima BCA, OVO, Kartu Kredit tanpa perlu cek mutasi manual).' },
      { title: 'Rekayasa Database Custom', impact: '(Sistem inventori dan admin panel khusus menyesuaikan workflow bisnis Anda).' },
      { title: 'Priority Support 24/7', impact: '(Jalur komunikasi VIP langsung dengan tim engineer kami).' }
    ]
  }
];

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeTestimonial, setActiveTestimonial] = useState<number>(0);

  // Sticky CTA scroll tracking
  const { scrollYProgress } = useScroll();
  const ctaY = useTransform(scrollYProgress, [0.1, 0.2], [100, 0]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const activeSection = useScrollSpy([
    'overview',
    'inaction',
    'metrics',
    'engine',
    'timeline',
    'testimonials',
    'pricing',
    'faq'
  ]);

  const service: ServiceDetailData | undefined = slug ? SERVICES_DATA[slug] : undefined;

  useSEOOptimizer({
    title: service ? `${service.title} | Jasa IT BSD City & Solusi Web Cisauk` : 'Layanan IT BSD City & Cisauk | CHESTAADOTCOM',
    description: service ? `${service.heroDescription} Dapatkan solusi rekayasa perangkat lunak dan Agentic AI Automation Indonesia terbaik untuk korporasi di wilayah Jasa IT BSD City, Solusi Web Cisauk, dan sekitarnya.` : 'Konsultan IT Services dan Software House profesional penyedia Jasa IT BSD City dan Solusi Web Cisauk. Spesialisasi pada Web Development Enterprise dan Agentic AI Automation Indonesia.'
  });

  // Dynamic Testimonial success stories based on service category / slug
  const successStories = useMemo(() => {
    if (slug === 'ai-integration') {
      return [
        {
          quote: "Implementasi agen AI untuk customer service di retail kami berhasil memangkas 78% antrean chat manual. Pelanggan mendapatkan respons instan 24/7.",
          client: "Bapak Hendra",
          role: "Direktur Operasional, Enterprise Retail BSD",
          metric: "78% Resolusi Instan",
          rating: 5
        },
        {
          quote: "Integrasi Gemini API sangat mulus dan akurat memahami konteks tanya jawab produk lokal. Sangat merekomendasikan tim CHESTAADOTCOM.",
          client: "Ibu Siska",
          role: "Head of Digital, Tangerang Fashion Hub",
          metric: "4.8/5 CSAT Score",
          rating: 5
        }
      ];
    } else if (slug === 'ecommerce-automation' || slug === 'toko-online') {
      return [
        {
          quote: "Platform e-commerce custom yang dibangun melesat di bawah 0.8 detik. Lonjakan transaksi langsung naik signifikan sebesar 32% di bulan pertama.",
          client: "Rian Pratama",
          role: "Founder, Cisauk Local Brand",
          metric: "+32% Conversion Rate",
          rating: 5
        },
        {
          quote: "Sistem checkout otomatis dan sinkronisasi stok real-time menyelamatkan operasional kami dari human error saat flash sale.",
          client: "Dewi Lestari",
          role: "E-Commerce Manager",
          metric: "Zero Downtime Saat Flash Sale",
          rating: 5
        }
      ];
    }
    // Default / General success stories
    return [
      {
        quote: "Kecepatan eksekusi dan kualitas arsitektur kodenya luar biasa. Bisnis kami kini memiliki platform digital berstandar global.",
        client: "Bapak Aris",
        role: "CEO, Jakarta Tech Solutions",
        metric: "< 0.8s Page Load",
        rating: 5
      },
      {
        quote: "Investasi terbaik tahun ini. Desain sangat profesional dan langsung mendatangkan closing dari klien korporat bernilai tinggi.",
        client: "Jessica Wijaya",
        role: "Marketing Director",
        metric: "3x Peningkatan Lead Kualitas",
        rating: 5
      }
    ];
  }, [slug]);

  // Comprehensive Article and FAQ JSON-LD Schema Injection for SEO & Regional Indexing
  useEffect(() => {
    if (service) {
      const baseSchema = generateServiceSchema({
        name: service.title,
        description: service.heroDescription,
        url: window.location.href,
        priceRange: "Rp 540k - Rp 5.500.000",
        providerName: 'ChestaAzka Enterprise Tech'
      });

      const articleAndFaqSchema = {
        "@context": "https://schema.org",
        "@graph": [
          baseSchema,
          {
            "@type": "TechArticle",
            "headline": service.heroHeadline,
            "description": service.heroDescription,
            "author": {
              "@type": "Person",
              "name": "Chesta Azka"
            },
            "publisher": {
              "@type": "Organization",
              "name": "CHESTAADOTCOM",
              "logo": {
                "@type": "ImageObject",
                "url": "https://chestaa.com/icon.png"
              }
            },
            "areaServed": ["Jakarta", "Tangerang", "BSD City", "Indonesia"]
          },
          {
            "@type": "FAQPage",
            "mainEntity": service.faqs.map(faq => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
              }
            }))
          }
        ]
      };

      injectSchemaScript(articleAndFaqSchema, 'service-article-faq-jsonld');
    }
    return () => {
      const existing = document.getElementById('service-article-faq-jsonld');
      if (existing) existing.remove();
    };
  }, [service]);

  if (!service) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 bg-white text-slate-900">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-900 mb-6 font-bold text-2xl border border-slate-200 shadow-xs">
          404
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 mb-3 tracking-tight">Layanan Tidak Ditemukan</h1>
        <p className="text-slate-600 font-sans max-w-md mb-8 text-sm sm:text-base leading-relaxed">
          Maaf, layanan yang Anda cari tidak tersedia atau tautan sudah kedaluwarsa.
        </p>
        <Link 
          to="/" 
          className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-sm"
        >
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  const whatsappText = `Halo Mas Chesta, saya tertarik menggunakan layanan ${service.title}. Mohon jadwalkan konsultasi prioritas hari ini.`;
  const whatsappUrl = `https://wa.me/6282125447232?text=${encodeURIComponent(whatsappText)}`;

  const handleWhatsAppClick = () => {
    toast.success('Menghubungkan ke WhatsApp Principal Engineer...', {
      duration: 3500,
      icon: '🚀',
    });
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-white text-slate-900 selection:bg-purple-900 selection:text-white">
      {/* Subtle top background glow */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-purple-100/50 via-purple-50/20 to-transparent pointer-events-none -z-10" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
          <motion.nav 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 text-xs font-mono text-slate-500"
          >
            <Link to="/" className="hover:text-slate-900 transition-colors">Beranda</Link>
            <ChevronRight size={14} className="text-slate-400" />
            <span className="text-slate-400">Layanan</span>
            <ChevronRight size={14} className="text-slate-400" />
            <span className="text-slate-900 font-semibold">{service.title}</span>
          </motion.nav>
          <SocialShare title={service.title} description={service.heroDescription} />
        </div>

        {/* Hero Section */}
        <div className="max-w-4xl mb-20" id="overview">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-purple-50 border border-purple-200 text-purple-900 text-xs font-mono font-bold uppercase tracking-wider mb-6 shadow-2xs">
            <Sparkles size={14} strokeWidth={1.5} className="text-purple-700" />
            {service.badge}
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black text-slate-900 tracking-tight leading-[1.05] mb-8">
            {service.heroHeadline}
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 font-sans leading-relaxed mb-10 max-w-3xl">
            {service.heroDescription}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-slate-900 hover:bg-purple-900 text-white rounded-2xl font-sans font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer group"
            >
              <MessageCircle size={18} strokeWidth={1.5} className="text-purple-400 group-hover:text-white transition-colors" />
              <span>Konsultasi &amp; Amankan Slot</span>
              <ArrowRight size={16} strokeWidth={1.5} />
            </motion.a>
            
            <motion.a
              href="#pricing"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-7 py-4 bg-white hover:bg-slate-50 text-slate-900 rounded-2xl font-sans font-bold text-xs uppercase tracking-wider border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Lihat Detail Investasi</span>
            </motion.a>
          </div>

          {/* Trust badges strip */}
          <div className="mt-12 pt-8 border-t border-slate-200 flex flex-wrap items-center gap-8 text-xs text-slate-600 font-mono">
            <div className="flex items-center gap-2.5">
              <div className="bg-white/85 backdrop-blur-md border border-slate-200 p-2.5 rounded-xl text-emerald-600 shadow-2xs">
                <ShieldCheck size={16} strokeWidth={1.5} />
              </div>
              <span className="font-bold text-slate-800">100% Hak Milik Source Code</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="bg-white/85 backdrop-blur-md border border-slate-200 p-2.5 rounded-xl text-amber-500 shadow-2xs">
                <Zap size={16} strokeWidth={1.5} />
              </div>
              <span className="font-bold text-slate-800">Garansi Performa 99+</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="bg-white/85 backdrop-blur-md border border-slate-200 p-2.5 rounded-xl text-purple-600 shadow-2xs">
                <Award size={16} strokeWidth={1.5} />
              </div>
              <span className="font-bold text-slate-800">Tanpa Biaya Tersembunyi</span>
            </div>
          </div>
        </div>

         {/* COST OF INACTION SECTION */}
        <div className="mb-24 p-8 sm:p-12 rounded-3xl bg-gray-950 text-white border border-rose-500/40 shadow-xl relative overflow-hidden" id="inaction">
          <div className="absolute top-0 right-0 w-85 h-85 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-2xl mb-10 relative z-10 text-white">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-950 border border-rose-800 text-rose-300 text-xs font-mono font-bold uppercase tracking-wider mb-4">
              <AlertTriangle size={14} strokeWidth={1.5} className="text-rose-400" />
              Peringatan Strategis Bisnis
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight mb-4 text-white">
              Fakta Pahit Bisnis di Era Digital.
            </h2>
            <p className="text-slate-200 font-sans text-sm sm:text-base leading-relaxed">
              Mengabaikan infrastruktur digital profesional bukan sekadar menunda kemajuan—ini adalah tindakan memberikan pangsa pasar Anda secara cuma-cuma kepada kompetitor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            <div className="p-6 rounded-2xl bg-white/5 border border-rose-500/30 flex flex-col justify-between backdrop-blur-md text-white">
              <div>
                <motion.div 
                  whileHover={{ scale: 1.15, rotate: 6 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="p-3 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 w-fit mb-4 cursor-pointer"
                >
                  <ClockAlert size={20} strokeWidth={1.5} />
                </motion.div>
                <h3 className="text-lg font-display font-bold text-white mb-2 tracking-tight">Website Lambat = Kehilangan Sales</h3>
                <p className="text-xs sm:text-sm font-sans text-slate-200 leading-relaxed">
                  Setiap 1 detik keterlambatan memuat halaman menurunkan rasio konversi hingga 20%. Calon pembeli langsung kabur ke kompetitor.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-rose-500/30 flex flex-col justify-between backdrop-blur-md text-white">
              <div>
                <motion.div 
                  whileHover={{ scale: 1.15, rotate: 6 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="p-3 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 w-fit mb-4 cursor-pointer"
                >
                  <XCircle size={20} strokeWidth={1.5} />
                </motion.div>
                <h3 className="text-lg font-display font-bold text-white mb-2 tracking-tight">Tanpa Sistem Otomatis = Biaya Admin Bengkak</h3>
                <p className="text-xs sm:text-sm font-sans text-slate-200 leading-relaxed">
                  Pekerjaan manual mengurus pesanan dan rekap data menghancurkan efisiensi operasional dan memicu human error yang merugikan.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-rose-500/30 flex flex-col justify-between backdrop-blur-md text-white">
              <div>
                <motion.div 
                  whileHover={{ scale: 1.15, rotate: 6 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="p-3 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 w-fit mb-4 cursor-pointer"
                >
                  <EyeOff size={20} strokeWidth={1.5} />
                </motion.div>
                <h3 className="text-lg font-display font-bold text-white mb-2 tracking-tight">Tampilan Murahan = Hilangnya Kepercayaan</h3>
                <p className="text-xs sm:text-sm font-sans text-slate-200 leading-relaxed">
                  Klien korporat dan pembeli bernilai tinggi tidak akan pernah bertransaksi dari website amatir yang tampak tidak kredibel.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24" id="metrics">
          {service.coreMetrics.map((metric, idx) => (
            <motion.div 
              key={idx} 
              whileHover={{ y: -6, scale: 1.02 }} 
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="p-8 rounded-3xl bg-white/75 backdrop-blur-md border border-slate-200/90 flex flex-col justify-between shadow-sm text-slate-900"
            >
              <motion.div 
                whileHover={{ scale: 1.15, rotate: 6 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="bg-purple-50 border border-purple-100 p-3.5 rounded-2xl text-purple-700 shadow-2xs w-fit mb-6 cursor-pointer"
              >
                <TrendingUp size={20} strokeWidth={1.5} />
              </motion.div>
              <div>
                <span className="text-[11px] font-mono font-bold text-purple-700 uppercase tracking-widest block mb-2">{metric.label}</span>
                <div className="text-3xl sm:text-4xl font-display font-black text-slate-900 mb-2 tracking-tight">{metric.value}</div>
                <span className="text-xs font-sans font-medium text-slate-600 leading-relaxed block">{metric.desc}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* THE "ENGINE ROOM" */}
        <div className="mb-24 p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 text-white shadow-xl relative overflow-hidden border border-purple-500/20" id="engine">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-xl mb-12 relative z-10 text-white">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-purple-300 text-xs font-mono font-bold uppercase tracking-wider mb-4 backdrop-blur-md">
              <Cpu size={14} strokeWidth={1.5} className="text-purple-400" />
              Enterprise Architecture
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight mb-4 text-white">
              Infrastruktur Skala Enterprise.
            </h2>
            <p className="text-slate-200 font-sans text-sm sm:text-base leading-relaxed">
              Kami tidak menggunakan plugin murahan. Seluruh sistem dibangun di atas tumpukan teknologi modern berstandar global yang digunakan oleh unicorn teknologi dunia untuk menjamin zero downtime dan kecepatan kilat.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-4 text-white">
              <motion.div 
                whileHover={{ scale: 1.15, rotate: 6 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="p-3 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 cursor-pointer shrink-0"
              >
                <Globe size={22} strokeWidth={1.5} />
              </motion.div>
              <div>
                <h4 className="font-display font-bold text-white text-sm">Next.js 15 App Router</h4>
                <p className="text-xs text-slate-300 mt-0.5 font-mono">SSR &amp; Edge API</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-4 text-white">
              <motion.div 
                whileHover={{ scale: 1.15, rotate: 6 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="p-3 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 cursor-pointer shrink-0"
              >
                <Server size={22} strokeWidth={1.5} />
              </motion.div>
              <div>
                <h4 className="font-display font-bold text-white text-sm">Vercel Edge Global</h4>
                <p className="text-xs text-slate-300 mt-0.5 font-mono">Global CDN</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-4 text-white">
              <motion.div 
                whileHover={{ scale: 1.15, rotate: 6 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="p-3 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 cursor-pointer shrink-0"
              >
                <Database size={22} strokeWidth={1.5} />
              </motion.div>
              <div>
                <h4 className="font-display font-bold text-white text-sm">Firebase Cloud DB</h4>
                <p className="text-xs text-slate-300 mt-0.5 font-mono">Real-time Cloud DB</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-4 text-white">
              <motion.div 
                whileHover={{ scale: 1.15, rotate: 6 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="p-3 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-500/30 cursor-pointer shrink-0"
              >
                <Layers size={22} strokeWidth={1.5} />
              </motion.div>
              <div>
                <h4 className="font-display font-bold text-white text-sm">Tailwind CSS v4</h4>
                <p className="text-xs text-slate-300 mt-0.5 font-mono">Responsive UI</p>
              </div>
            </div>
          </div>
        </div>

        {/* PROJECT TIMELINES & DELIVERY PHASES (SERVICE FEATURE CARDS) */}
        <div className="mb-24" id="timeline">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold text-purple-700 uppercase tracking-widest block mb-2">Metodologi &amp; Eksekusi</span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight">
              Timeline &amp; Fase Pengerjaan Proyek
            </h2>
            <p className="text-slate-600 font-sans text-sm sm:text-base mt-3">
              Transparansi penuh dari hari pertama hingga peluncuran live untuk menjamin hasil yang tepat waktu dan berdampak tinggi.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.processSteps.map((phaseItem, idx) => {
              // Men-generate timeline simulasi secara dinamis
              let timelineStr = "";
              if (idx === 0) timelineStr = "Minggu 1";
              else if (idx === 1) timelineStr = "Minggu 1-2";
              else if (idx === 2) timelineStr = "Minggu 2-3";
              else timelineStr = "Minggu 3-4";

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="p-7 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between group hover:border-purple-300 hover:shadow-xl transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="px-3 py-1 rounded-xl bg-purple-50 text-purple-700 font-mono text-xs font-bold border border-purple-100">
                        Fase {phaseItem.step}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-500">
                        <Clock size={13} className="text-purple-600" />
                        {timelineStr}
                      </span>
                    </div>
                    <h3 className="text-lg font-display font-bold text-slate-900 mb-2 group-hover:text-purple-950 transition-colors">
                      {phaseItem.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-sans text-slate-600 leading-relaxed">
                      {phaseItem.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-mono font-bold text-purple-700">
                    <span>Status: Terstruktur</span>
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-auto" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* DYNAMIC SUCCESS STORIES / TESTIMONIAL CAROUSEL */}
        <div className="mb-24 p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-purple-950 via-purple-900 to-slate-950 text-white shadow-2xl relative overflow-hidden border border-purple-500/30" id="testimonials">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 relative z-10 gap-6">
            <div>
              <span className="text-xs font-mono font-bold text-purple-300 uppercase tracking-widest block mb-2">Success Stories &amp; Testimoni</span>
              <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
                Kisah Sukses Klien untuk Layanan Ini
              </h2>
            </div>
            
            {/* Carousel Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTestimonial((prev) => (prev === 0 ? successStories.length - 1 : prev - 1))}
                className="w-11 h-11 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setActiveTestimonial((prev) => (prev === successStories.length - 1 ? 0 : prev + 1))}
                className="w-11 h-11 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
                aria-label="Next Testimonial"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="relative z-10 min-h-[220px]">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center bg-white/5 border border-white/10 p-8 sm:p-10 rounded-3xl backdrop-blur-md"
            >
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(successStories[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                  <span className="ml-2 font-mono text-xs text-purple-200">Terverifikasi Klien Enterprise</span>
                </div>
                
                <p className="text-base sm:text-xl font-display italic text-white/95 leading-relaxed">
                  "{successStories[activeTestimonial].quote}"
                </p>

                <div>
                  <h4 className="font-display font-bold text-white text-base">{successStories[activeTestimonial].client}</h4>
                  <p className="text-xs font-sans text-purple-200 mt-0.5">{successStories[activeTestimonial].role}</p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-purple-900/50 border border-purple-500/40 text-center">
                <span className="text-xs font-mono font-bold text-purple-300 uppercase tracking-wider mb-1">Dampak Utama</span>
                <div className="text-2xl sm:text-3xl font-display font-black text-white mb-2">
                  {successStories[activeTestimonial].metric}
                </div>
                <span className="text-[11px] font-sans text-purple-200">Hasil terukur pasca implementasi sistem.</span>
              </div>
            </motion.div>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-8 relative z-10">
            {successStories.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTestimonial(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${activeTestimonial === idx ? 'w-8 bg-purple-400' : 'w-2 bg-white/30'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Social Preview Generator & Bottom Share */}
        <div className="my-16">
          <SocialPreviewGenerator title={service.title} category="Enterprise Services" author="Chesta Azka Sofyan" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-8 rounded-2xl bg-slate-50 border border-slate-200 mt-6">
            <div>
              <h4 className="font-display font-bold text-slate-900 text-lg mb-1">Bagikan Layanan Ini</h4>
              <p className="text-xs text-slate-600 font-sans">Bantu kolega atau partner bisnis Anda menemukan solusi arsitektur digital terbaik.</p>
            </div>
            <SocialShare title={service.title} description={service.heroDescription} />
          </div>
        </div>

        {/* LAZY LOADED: 4-TIER IMPACT-DRIVEN PRICING GRID */}
        <div id="pricing">
          <Suspense fallback={<div className="py-20 text-center text-slate-400 font-mono text-xs">Memuat Opsi Investasi...</div>}>
            <LazyPricingSection pricingTiers={PRICING_TIERS} whatsappUrl={whatsappUrl} onWhatsAppClick={handleWhatsAppClick} />
          </Suspense>
        </div>

        {/* LAZY LOADED: FAQs */}
        <div id="faq">
          <Suspense fallback={<div className="py-20 text-center text-slate-400 font-mono text-xs">Memuat Pusat Bantuan...</div>}>
            <LazyFaqSection faqs={service.faqs} openFaq={openFaq} setOpenFaq={setOpenFaq} />
          </Suspense>
        </div>

        {/* ScrollSpy Active Section Indicator Badge */}
        <div className="fixed bottom-24 right-6 z-40 hidden md:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/90 backdrop-blur-md border border-purple-200 shadow-xl text-xs font-mono text-slate-700">
          <div className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-pulse" />
          <span>Posisi Halaman: <strong className="text-purple-900 uppercase">{activeSection}</strong></span>
        </div>

      </div>

      {/* Sticky CTA Bar */}
      <motion.div 
        style={{ y: ctaY }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]"
      >
        <div className="absolute top-0 left-0 h-1 bg-slate-100 w-full overflow-hidden">
          <motion.div style={{ width: progressWidth }} className="h-full bg-purple-600 rounded-r-full" />
        </div>
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="hidden sm:flex flex-col">
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">{service.title}</span>
            <span className="text-sm font-semibold text-slate-900 mt-0.5">Sudah siap untuk transformasi digital?</span>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-sm font-bold shadow-lg transition-all active:scale-95"
          >
            <MessageCircle size={16} className="text-emerald-400" />
            <span>Request Audit Ekosistem</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
