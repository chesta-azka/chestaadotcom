import { useParams, Link } from 'react-router-dom';
import { SERVICES_DATA, ServiceDetailData } from '../data/servicesData';
import { motion } from 'motion/react';
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
  EyeOff
} from 'lucide-react';
import { useState, useEffect, lazy, Suspense } from 'react';
import toast from 'react-hot-toast';
import { generateServiceSchema, injectSchemaScript } from '../utils/schemaMarkup';

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

  const service: ServiceDetailData | undefined = slug ? SERVICES_DATA[slug] : undefined;

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
        <motion.nav 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-12"
        >
          <Link to="/" className="hover:text-slate-900 transition-colors">Beranda</Link>
          <ChevronRight size={14} className="text-slate-400" />
          <span className="text-slate-400">Layanan</span>
          <ChevronRight size={14} className="text-slate-400" />
          <span className="text-slate-900 font-semibold">{service.title}</span>
        </motion.nav>

        {/* Hero Section */}
        <div className="max-w-4xl mb-20">
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
        <div className="mb-24 p-8 sm:p-12 rounded-3xl bg-gray-950 text-white border border-rose-500/40 shadow-xl relative overflow-hidden">
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
                <div className="p-3 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 w-fit mb-4">
                  <ClockAlert size={20} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-display font-bold text-white mb-2 tracking-tight">Website Lambat = Kehilangan Sales</h3>
                <p className="text-xs sm:text-sm font-sans text-slate-200 leading-relaxed">
                  Setiap 1 detik keterlambatan memuat halaman menurunkan rasio konversi hingga 20%. Calon pembeli langsung kabur ke kompetitor.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-rose-500/30 flex flex-col justify-between backdrop-blur-md text-white">
              <div>
                <div className="p-3 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 w-fit mb-4">
                  <XCircle size={20} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-display font-bold text-white mb-2 tracking-tight">Tanpa Sistem Otomatis = Biaya Admin Bengkak</h3>
                <p className="text-xs sm:text-sm font-sans text-slate-200 leading-relaxed">
                  Pekerjaan manual mengurus pesanan dan rekap data menghancurkan efisiensi operasional dan memicu human error yang merugikan.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-rose-500/30 flex flex-col justify-between backdrop-blur-md text-white">
              <div>
                <div className="p-3 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 w-fit mb-4">
                  <EyeOff size={20} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-display font-bold text-white mb-2 tracking-tight">Tampilan Murahan = Hilangnya Kepercayaan</h3>
                <p className="text-xs sm:text-sm font-sans text-slate-200 leading-relaxed">
                  Klien korporat dan pembeli bernilai tinggi tidak akan pernah bertransaksi dari website amatir yang tampak tidak kredibel.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {service.coreMetrics.map((metric, idx) => (
            <motion.div 
              key={idx} 
              whileHover={{ y: -6, scale: 1.02 }} 
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="p-8 rounded-3xl bg-white/70 backdrop-blur-md border border-slate-200/90 flex flex-col justify-between shadow-sm text-slate-900"
            >
              <div className="bg-purple-50 border border-purple-100 p-3.5 rounded-2xl text-purple-700 shadow-2xs w-fit mb-6">
                <TrendingUp size={20} strokeWidth={1.5} />
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold text-purple-700 uppercase tracking-widest block mb-2">{metric.label}</span>
                <div className="text-3xl sm:text-4xl font-display font-black text-slate-900 mb-2 tracking-tight">{metric.value}</div>
                <span className="text-xs font-sans font-medium text-slate-600 leading-relaxed block">{metric.desc}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* THE "ENGINE ROOM" */}
        <div className="mb-24 p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 text-white shadow-xl relative overflow-hidden border border-purple-500/20">
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
              <div className="p-3 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
                <Globe size={22} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="font-display font-bold text-white text-sm">Next.js 15 App Router</h4>
                <p className="text-xs text-slate-300 mt-0.5 font-mono">SSR &amp; Edge API</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-4 text-white">
              <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                <Server size={22} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="font-display font-bold text-white text-sm">Vercel Edge Global</h4>
                <p className="text-xs text-slate-300 mt-0.5 font-mono">Global CDN</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-4 text-white">
              <div className="p-3 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <Database size={22} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="font-display font-bold text-white text-sm">Firebase Cloud DB</h4>
                <p className="text-xs text-slate-300 mt-0.5 font-mono">Real-time Cloud DB</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-4 text-white">
              <div className="p-3 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-500/30">
                <Layers size={22} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="font-display font-bold text-white text-sm">Tailwind CSS v4</h4>
                <p className="text-xs text-slate-300 mt-0.5 font-mono">Responsive UI</p>
              </div>
            </div>
          </div>
        </div>

        {/* LAZY LOADED: 4-TIER IMPACT-DRIVEN PRICING GRID */}
        <Suspense fallback={<div className="py-20 text-center text-slate-400 font-mono text-xs">Memuat Opsi Investasi...</div>}>
          <LazyPricingSection pricingTiers={PRICING_TIERS} whatsappUrl={whatsappUrl} onWhatsAppClick={handleWhatsAppClick} />
        </Suspense>

        {/* LAZY LOADED: FAQs */}
        <Suspense fallback={<div className="py-20 text-center text-slate-400 font-mono text-xs">Memuat Pusat Bantuan...</div>}>
          <LazyFaqSection faqs={service.faqs} openFaq={openFaq} setOpenFaq={setOpenFaq} />
        </Suspense>

      </div>
    </div>
  );
}
