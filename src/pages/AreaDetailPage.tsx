import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { MessageCircle, Shield, Sparkles, MapPin, Search, ArrowRight, Target, Star, Quote, CheckCircle, Globe, Zap, ArrowUpRight, HelpCircle, ChevronDown, Building, Coffee, Compass, Users } from 'lucide-react';
import { CITIES } from '../data/AreasData';
import { SERVICE_DEFINITIONS } from '../data/ServiceDefinition';
import SEOMetadata from '../components/atoms/SEOMetadata';
import { generateCityGeoSchema } from '../lib/seo';
import TextRevealSmooth from '../components/atoms/TextRevealSmooth';
import { Skeleton } from '../components/atoms/Skeleton';
import Breadcrumbs from '../components/atoms/Breadcrumbs';
import FAQSchema from '../components/atoms/FAQSchema';
import OptimizedImage from '../components/atoms/OptimizedImage';

export default function AreaDetailPage() {
  const { cityName } = useParams<{ cityName: string }>();
  const [loading, setLoading] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [cityName]);

  // Validate city name
  const upperCity = cityName?.toUpperCase() || '';
  const isValidCity = CITIES.includes(upperCity);

  if (!cityName || !isValidCity) {
    return <Navigate to="/services" replace />;
  }

  // Format name nicely (e.g. RAWA-BUNTU -> Rawa Buntu, CISAUK -> Cisauk, BSD-CITY -> BSD City)
  const formatCityName = (str: string) => {
    return str
      .split('-')
      .map(part => {
        if (part === 'BSD' || part === 'UMKM') return part;
        return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
      })
      .join(' ');
  };

  const formattedCityName = formatCityName(upperCity);

  // Localized statistics and deep regional context based on city
  const cityStats: { [key: string]: { 
    searchVolume: string; 
    businessGrowth: string; 
    localNiche: string; 
    landmarks: string[];
    areaFaq: string;
    waIntro: string;
    faqs: { question: string; answer: string }[];
  } } = {
    'CISAUK': { 
      searchVolume: '540 Ribu+', 
      businessGrowth: '+42.5%', 
      localNiche: 'UMKM Mandiri, Ruko Intermoda, Toko Online, Properti/Kost & Kuliner Stasiun Cisauk',
      landmarks: ['Stasiun KRL Cisauk', 'Intermoda BSD', 'Pasar Modern Cisauk', 'Suradita Raya', 'Cisauk Point', 'Sampora'],
      areaFaq: 'Tersedia layanan meeting tatap muka langsung di area Stasiun Cisauk, Intermoda, Pasar Modern, dan Suradita tanpa biaya transportasi.',
      waIntro: 'Halo Mas Chesta, saya pemilik bisnis di wilayah Cisauk (dekat Stasiun / Intermoda). Saya ingin konsultasi pembuatan website & sistem automasi AI.',
      faqs: [
        {
          question: 'Apakah tim CHESTAA bisa meeting offline langsung di area Cisauk?',
          answer: 'Sangat bisa! Kantor dan basis operasional utama kami berada sangat dekat dengan Cisauk. Kami siap berdiskusi tatap muka di area Intermoda BSD, Stasiun Cisauk, Pasar Modern Cisauk, ruko Suradita, atau kantor/toko Anda langsung.'
        },
        {
          question: 'Berapa lama website bisnis di Cisauk selesai dikerjakan?',
          answer: 'Landing page premium atau company profile siap online dalam 3–7 hari kerja. Sistem toko online dan integrasi AI khusus selesai dalam 1–2 minggu dengan garansi sub-detik Core Web Vitals.'
        },
        {
          question: 'Apakah website bisnis saya akan langsung muncul di Google Maps & Pencarian wilayah Cisauk?',
          answer: 'Ya, setiap paket sudah mencakup optimasi Local SEO Google Maps dan injeksi Schema.org GeoCoordinates khusus radius Cisauk dan Tangerang Selatan sehingga calon pembeli lokal langsung menemukan bisnis Anda.'
        }
      ]
    },
    'RAWA-BUNTU': { 
      searchVolume: '890 Ribu+', 
      businessGrowth: '+39.4%', 
      localNiche: 'Klinik Kesehatan/Estetika, Agensi B2B, Ruko Kencana Loka, Kuliner Ciater & Konsultan',
      landmarks: ['Stasiun KRL Rawa Buntu', 'De Latinos', 'Ruko Kencana Loka', 'Ciater Raya', 'Nusa Loka BSD', 'Pintu Tol Rawa Buntu'],
      areaFaq: 'Siap meeting santai di coffee shop atau kantor Anda sekitar Stasiun Rawa Buntu, ruko Kencana Loka, De Latinos, dan Pintu Tol BSD.',
      waIntro: 'Halo Mas Chesta, saya memiliki bisnis di area Rawa Buntu / Serpong. Ingin berdiskusi tentang pembuatan website berkinerja tinggi.',
      faqs: [
        {
          question: 'Kenapa bisnis di Rawa Buntu membutuhkan website profesional kustom?',
          answer: 'Rawa Buntu adalah simpul komuter dan hunian mapan BSD-Serpong dengan daya beli tinggi. Website yang cepat dan berdesain mewah membuktikan kredibilitas instan di mata konsumen premium Jabodetabek.'
        },
        {
          question: 'Bisa janjian meeting di coffee shop sekitar Rawa Buntu?',
          answer: 'Tentu saja! Kami sangat fleksibel untuk bertemu di sekitar kawasan De Latinos, Kencana Loka, Ciater Raya, atau cafe di dekat Stasiun Rawa Buntu.'
        },
        {
          question: 'Apakah disediakan integrasi formulir dan WhatsApp otomatis?',
          answer: 'Ya, seluruh traffic dari Google Ads, Meta Ads, atau SEO lokal langsung dihubungkan ke WhatsApp resmi Anda dengan respon milidetik dan pelacakan konversi otomatis.'
        }
      ]
    },
    'PEMALANG': { 
      searchVolume: '480 Ribu+', 
      businessGrowth: '+31.8%', 
      localNiche: 'Konveksi/Garmen, Sarung Goyor, Kuliner Grombyang, Nanas Madu Belik, Grosir & Distributor',
      landmarks: ['Alun-Alun Pemalang', 'Sentra Konveksi Comal', 'Kecamatan Petarukan', 'Bantarbolang', 'Kawasan Moga', 'Sirandu'],
      areaFaq: 'Mendukung penuh UMKM dan pengusaha Pemalang agar memiliki website profesional yang mampu menembus pasar nasional (Jakarta, Semarang, Surabaya).',
      waIntro: 'Halo Mas Chesta, saya pengusaha di Pemalang (Jawa Tengah). Saya ingin membuat website profesional untuk membesarkan jangkauan bisnis saya.',
      faqs: [
        {
          question: 'Apakah pengusaha UMKM di Pemalang cocok membuat website di CHESTAA?',
          answer: 'Sangat cocok! Kami merancang solusi khusus bagi pengusaha konveksi, grosir, makanan khas, dan distributor di Pemalang agar produk lokal bisa dijual langsung ke pembeli di Jakarta dan seluruh Indonesia tanpa potongan komisi marketplace yang mencekik.'
        },
        {
          question: 'Bagaimana alur komunikasi jika berada di Pemalang?',
          answer: 'Proses konsultasi dan presentasi demo dilakukan via Video Call WhatsApp atau Google Meet secara santai dan tuntas. Anda juga didampingi panduan lengkap cara mengelola website secara mandiri.'
        },
        {
          question: 'Bisa bantu setting katalog produk dan pembayaran online?',
          answer: 'Pasti. Kami menyiapkan katalog produk berkecepatan kilat, tombol checkout otomatis ke WhatsApp, serta opsi payment gateway resmi (QRIS, Transfer Bank, E-Wallet).'
        }
      ]
    },
    'BSD-CITY': { 
      searchVolume: '1.2 Juta+', 
      businessGrowth: '+38.5%', 
      localNiche: 'Tech Startup, Digital Hub, Restoran & Cafe Aesthetic, Corporate Agency, Properti Komersial',
      landmarks: ['Green Office Park (GOP)', 'Digital Hub BSD', 'The Breeze', 'QBIG BSD', 'ICE BSD', 'AEON Mall'],
      areaFaq: 'Siap meeting langsung di Green Office Park (GOP), The Breeze, QBIG, atau Digital Hub BSD.',
      waIntro: 'Halo Mas Chesta, saya ingin konsultasi kebutuhan arsitektur website dan AI automasi korporat di BSD City.',
      faqs: [
        {
          question: 'Apakah CHESTAA melayani perusahaan berbasis di BSD City?',
          answer: 'Ya, kami melayani berbagai perusahaan skala startup hingga korporasi di Digital Hub, GOP, dan kawasan komersial BSD City dengan arsitektur web modern Next.js 15.'
        }
      ]
    },
    'GADING-SERPONG': { 
      searchVolume: '980 Ribu+', 
      businessGrowth: '+35.2%', 
      localNiche: 'F&B Franchise, Lifestyle Studio, Klinik Kecantikan, Coworking & Ruko Komersial',
      landmarks: ['Summarecon Mall Serpong', 'Ruko Aniva Grande', 'Pisa Grande', 'Gading Serpong Boulevard', 'Scientia Square'],
      areaFaq: 'Siap diskusi offline di area Summarecon Mall Serpong, Ruko Aniva, atau Pisa Grande.',
      waIntro: 'Halo Mas Chesta, saya mau konsultasi pembuatan website untuk bisnis di Gading Serpong.',
      faqs: [
        {
          question: 'Apakah bisa meeting tatap muka di Gading Serpong?',
          answer: 'Bisa! Kami siap bertemu di cafe atau kantor Anda di area Pisa Grande, Aniva, atau SMS Mall Serpong.'
        }
      ]
    },
    'TANGERANG-SELATAN': { 
      searchVolume: '1.5 Juta+', 
      businessGrowth: '+33.1%', 
      localNiche: 'Agency Kreatif, Brand Fashion Lokal, Jasa Profesional, Klinik & Pendidikan',
      landmarks: ['BSD Serpong', 'Bintaro Jaya', 'Pamulang', 'Ciputat', 'Alam Sutera'],
      areaFaq: 'Meliputi seluruh area Tangsel: BSD, Serpong, Pamulang, Ciputat, hingga Bintaro.',
      waIntro: 'Halo Mas Chesta, saya pemilik bisnis di Tangerang Selatan. Ingin konsultasi pembuatan website.',
      faqs: [
        {
          question: 'Apakah mencakup seluruh wilayah Tangerang Selatan?',
          answer: 'Ya, kami melayani proyek pembuatan website dan automasi di seluruh 7 kecamatan di Kota Tangerang Selatan.'
        }
      ]
    },
    'JAKARTA': { 
      searchVolume: '2.4 Juta+', 
      businessGrowth: '+32.4%', 
      localNiche: 'Startup, Kuliner, Fashion & Corporate Service',
      landmarks: ['SCBD', 'Mega Kuningan', 'Jakarta Selatan', 'Sudirman-Thamrin', 'Kelapa Gading'],
      areaFaq: 'Siap melayani korporat dan UMKM di seluruh wilayah DKI Jakarta.',
      waIntro: 'Halo Mas Chesta, saya ingin konsultasi pembuatan website untuk perusahaan di Jakarta.',
      faqs: [
        {
          question: 'Bagaimana meeting untuk klien korporat di Jakarta?',
          answer: 'Kami siap bertemu tatap muka di area Jakarta Selatan / Pusat atau melalui sesi Google Meet terjadwal.'
        }
      ]
    },
  };

  const defaultStats = {
    searchVolume: '450 Ribu+',
    businessGrowth: '+21.5%',
    localNiche: 'UMKM Mandiri, Toko Online, Kuliner Lokal & Jasa Profesional',
    landmarks: ['Pusat Kota ' + formattedCityName, 'Kawasan Komersial', 'Pusat Perbelanjaan'],
    areaFaq: `Melayani seluruh pengusaha di ${formattedCityName} dan sekitarnya.`,
    waIntro: `Halo Mas Chesta, saya tertarik konsultasi website untuk bisnis saya di wilayah ${formattedCityName}.`,
    faqs: [
      {
        question: `Berapa biaya pembuatan website untuk bisnis di ${formattedCityName}?`,
        answer: `Investasi dimulai dari paket ramah UMKM hingga sistem kustom enterprise dengan garansi performa sub-detik dan dukungan teknis penuh.`
      },
      {
        question: `Apakah website kami sudah teroptimasi SEO lokal ${formattedCityName}?`,
        answer: `Ya, setiap paket sudah disuntikkan skema metadata dan SEO regional Google Maps untuk mendominasi pencarian lokal.`
      }
    ]
  };

  const currentStats = cityStats[upperCity] || defaultStats;
  const areaFaqs = currentStats.faqs || defaultStats.faqs;

  if (loading) {
    return (
      <div className="pt-32 pb-20 min-h-screen font-sans bg-transparent">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-12 flex flex-col items-center">
          <Skeleton className="w-64 h-8 rounded-full mb-6" />
          <Skeleton className="w-full max-w-3xl h-24 rounded-2xl mb-8" />
          <Skeleton className="w-96 h-12 rounded-full mb-16" />
          <Skeleton className="w-full h-[400px] rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="pt-40 md:pt-48 pb-28 min-h-screen relative bg-transparent text-slate-900 overflow-hidden">
      <SEOMetadata 
        title={`Jasa Pembuatan Website B2B ${formattedCityName} & Web Developer Perusahaan | CHESTAA`} 
        description={`Lebih dari sekadar jasa website di ${formattedCityName}, Chestaa mengintegrasikan AI untuk mengotomatisasi bisnis B2B Anda. Arsitektur Next.js 15 super cepat, SEO lokal Google Maps, dan Karyawan AI.`}
        currentRoute={`/area/${cityName.toLowerCase()}`}
        schema={generateCityGeoSchema(formattedCityName)}
      />

      {/* Hero Section */}
      <section className="relative pb-12 mb-12">
        <div className="absolute top-0 inset-x-0 h-[400px] bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#6b21a8]/4 via-transparent to-transparent -z-10 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-center md:text-left"
          >
            <span className="text-purple-700 font-mono text-[9px] font-bold uppercase tracking-[0.2em] inline-flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-purple-200">
              <Globe size={9} className="text-purple-600 animate-pulse" />
              Layanan Digital & Konsultasi Lokal: {upperCity}
            </span>
            
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-medium tracking-tight leading-[1.08] text-slate-900">
              <TextRevealSmooth 
                text={`Website Premium untuk UMKM di ${formattedCityName} yang Ingin Terlihat Lebih Serius.`} 
                highlightWords={[formattedCityName, "Serius."]}
                highlightClass="text-purple-700 font-serif italic pl-1"
              />
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-slate-600 font-sans max-w-2xl leading-relaxed mt-4">
              Konversi instan trafik lokal menjadi klien premium. Kami membangun website kustom yang super cepat, 100% mobile-optimized, dan terindeks instan di Google Penelusuran wilayah <strong>{formattedCityName}</strong>.
            </p>

            {/* Local Landmark & Meeting Point Badges */}
            {currentStats.landmarks && currentStats.landmarks.length > 0 && (
              <div className="pt-2">
                <span className="text-[10px] font-mono font-bold text-purple-700 uppercase tracking-widest block mb-2.5 text-center md:text-left">
                  📍 Titik Temu & Jangkauan Offline {formattedCityName}:
                </span>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {currentStats.landmarks.map((landmark) => (
                    <span 
                      key={landmark}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50/90 border border-purple-200/90 text-purple-900 text-xs font-mono font-semibold shadow-2xs hover:bg-purple-100 transition-colors"
                    >
                      <MapPin size={11} className="text-purple-600" />
                      <span>{landmark}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <a
                href={`https://wa.me/6282125447232?text=${encodeURIComponent(currentStats.waIntro || `Halo Mas Chesta, saya ingin konsultasi pembuatan website untuk bisnis saya di wilayah ${formattedCityName}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-purple-600 text-white px-6 py-3.5 font-mono text-[10px] font-bold uppercase tracking-wider hover:bg-purple-700 active:scale-95 transition-all cursor-pointer shadow-lg shadow-purple-600/10"
              >
                <MessageCircle size={14} />
                <span>Konsultasi WhatsApp Langsung</span>
              </a>
              <Link
                to="/services"
                className="flex items-center justify-center gap-2 rounded-full bg-white border border-purple-200 text-slate-900 px-6 py-3.5 font-mono text-[10px] font-bold uppercase tracking-wider hover:bg-purple-50 transition-all shadow-2xs"
              >
                <span>Semua Layanan</span>
                <ArrowUpRight size={12} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Stats Bento & Local Advantage Grid */}
      <section className="max-w-5xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl bg-white/[0.01] border border-slate-100 flex flex-col justify-between text-left relative overflow-hidden"
          >
            <span className="font-mono text-[8px] text-[#6b21a8] font-black tracking-widest uppercase">🔍 SEARCH VOLUME</span>
            <div className="mt-4">
              <span className="block text-3xl font-mono font-black text-slate-900">{currentStats.searchVolume}</span>
              <span className="text-[11px] text-slate-600 font-sans mt-1.5 block leading-normal">
                Pencarian produk/jasa lokal per bulan di wilayah {formattedCityName}. Amankan porsi pasar Anda sebelum kompetitor mengambil alih seluruh pencarian Google.
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl bg-white/[0.01] border border-slate-100 flex flex-col justify-between text-left"
          >
            <span className="font-mono text-[8px] text-[#6b21a8] font-black tracking-widest uppercase">📈 MARKET PENETRATION</span>
            <div className="mt-4">
              <span className="block text-3xl font-mono font-black text-slate-900">{currentStats.businessGrowth}</span>
              <span className="text-[11px] text-slate-600 font-sans mt-1.5 block leading-normal">
                Pertumbuhan bisnis lokal {formattedCityName} yang beralih total ke branding premium mandiri demi membedakan diri mereka dari persaingan media sosial.
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-2xl bg-[#6b21a8]/[0.02] border border-[#6b21a8]/10 flex flex-col justify-between text-left relative"
          >
            <span className="font-mono text-[8px] text-[#6b21a8] font-black tracking-widest uppercase">🎯 KEY LOCAL SECTOR</span>
            <div className="mt-4">
              <span className="block text-md font-display font-bold text-gray-100">{currentStats.localNiche}</span>
              <span className="text-[11px] text-slate-600 font-sans mt-2 block leading-normal">
                Niche bisnis paling berkembang dengan tingkat konversi tertinggi jika dikemas secara bersih.
              </span>
            </div>
          </motion.div>

        </div>

        {/* Why high performance website matters in this specific city */}
        <div className="p-6 sm:p-10 rounded-2xl border border-slate-100 bg-gradient-to-b from-white/[0.01] to-transparent text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#6b21a8]/2 rounded-full filter blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
            <div className="md:col-span-6 space-y-3">
              <h3 className="text-xl md:text-2xl font-display font-medium text-slate-900 tracking-tight leading-snug">
                Instagram saja tidak cukup untuk memenangkan pasar <span className="text-[#6b21a8]">{formattedCityName}</span>.
              </h3>
              <p className="text-xs text-slate-600 font-sans leading-relaxed">
                Platform sosial luar biasa untuk menaikkan awareness. Namun, untuk meyakinkan pembeli premium bermoninal transaksi tinggi, bisnis Anda membutuhkan kredibilitas digital mandiri yang mapan dan solid.
              </p>
              <p className="text-xs text-slate-500 font-sans leading-relaxed">
                Website premium CHESTAADOTCOM memberi Anda kendali penuh atas database konsumen, bebas dari ancaman suspend akun, serta menjamin peringkat teratas Google Pencarian.
              </p>
            </div>

            <div className="md:col-span-6 space-y-3.5 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8">
              <div className="flex gap-2.5 items-start">
                <span className="p-1 h-max rounded bg-[#6b21a8]/10 text-[#6b21a8] shrink-0 mt-0.5">
                  <CheckCircle size={11} strokeWidth={2.5} />
                </span>
                <div>
                  <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-900">0.8 Detik Loading Speed</h4>
                  <p className="text-[11px] text-slate-500 font-sans mt-0.5">Mencegah calon klien {formattedCityName} beralih ke kompetitor akibat website lambat.</p>
                </div>
              </div>
              <div className="flex gap-2.5 items-start">
                <span className="p-1 h-max rounded bg-[#6b21a8]/10 text-[#6b21a8] shrink-0 mt-0.5">
                  <CheckCircle size={11} strokeWidth={2.5} />
                </span>
                <div>
                  <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-900">Google SEO Geo-Targeted</h4>
                  <p className="text-[11px] text-slate-500 font-sans mt-0.5">Hadir di halaman utama peta penelusuran lokal saat klien mencari solusi Anda.</p>
                </div>
              </div>
              <div className="flex gap-2.5 items-start">
                <span className="p-1 h-max rounded bg-[#6b21a8]/10 text-[#6b21a8] shrink-0 mt-0.5">
                  <CheckCircle size={11} strokeWidth={2.5} />
                </span>
                <div>
                  <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-900">Direct Live Chat Funnel</h4>
                  <p className="text-[11px] text-slate-500 font-sans mt-0.5">Menghubungkan pengunjung ke tim admin Anda tanpa friksi formulir pengisian data.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Showcase */}
      <section className="mb-20 max-w-5xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-[1px] flex-grow bg-slate-100" />
          <h2 className="text-[9px] font-mono font-bold tracking-[0.25em] text-[#6b21a8] uppercase text-center shrink-0">PILIHAN LAYANAN PREMIUM</h2>
          <div className="h-[1px] flex-grow bg-slate-100" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SERVICE_DEFINITIONS.map((service, idx) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="p-5 rounded-xl bg-white/[0.01] border border-slate-100 flex flex-col justify-between hover:border-white/15 hover:bg-white/[0.02] transition-all text-left"
            >
              <div>
                <span className="font-mono text-[8px] text-slate-500 tracking-widest uppercase block mb-1.5">LAYANAN UTAMA</span>
                <h3 className="font-display font-bold text-base text-slate-900 mb-1.5">{service.title}</h3>
                <p className="text-xs text-slate-600 font-sans leading-relaxed line-clamp-2 mb-4">{service.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="font-mono text-[11px] text-slate-700">Mulai Rp650K <span className="text-[10px] text-purple-600 font-semibold">(Promo Rp540K)</span></span>
                <Link
                  to={`/layanan/${service.slug}`}
                  className="flex items-center gap-1 font-mono text-[9px] uppercase text-[#6b21a8] font-bold group hover:translate-x-0.5 transition-transform"
                >
                  Detail
                  <ArrowRight size={9} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

        {/* Professional Hybrid Consulting Narrative Section */}
        <div className="py-20 border-y border-slate-200/60 my-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-purple-700 uppercase tracking-widest">
                <Globe size={14} />
                <span>Konsultasi Hybrid & Pendekatan Lokal</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-display">
                Kolaborasi Tanpa Batas Jarak di {formattedCityName}.
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Kami memahami bahwa transformasi digital yang sukses membutuhkan pemahaman mendalam tentang ekosistem bisnis lokal. Di <strong>{formattedCityName}</strong>, Chestaa menerapkan model kerja <strong>Hybrid Consulting</strong> yang menggabungkan efisiensi kolaborasi jarak jauh dengan ketajaman audit langsung di lokasi.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4 text-left">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-purple-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Audit On-Site Strategis</h4>
                    <p className="text-sm text-slate-500">Tim kami siap melakukan kunjungan ke kantor Anda di {formattedCityName} untuk memahami alur kerja manual dan titik hambatan operasional secara nyata.</p>
                  </div>
                </div>
                <div className="flex gap-4 text-left">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                    <Zap size={18} className="text-purple-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Implementasi Remote Cepat</h4>
                    <p className="text-sm text-slate-500">Pengembangan sistem dilakukan dengan standar performa tinggi melalui koordinasi digital real-time, memastikan go-live dalam hitungan hari, bukan bulan.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative aspect-video lg:aspect-square bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 group shadow-2xl">
              <OptimizedImage
                src="https://picsum.photos/seed/consulting/1200/1200" 
                alt={`Konsultasi AI di ${formattedCityName}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/95 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl">
                <div className="flex items-center gap-3 mb-2">
                  <Users size={16} className="text-purple-700" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-900">Hadir Untuk {formattedCityName}</span>
                </div>
                <p className="text-sm text-slate-600 font-medium italic">
                  "Menghadirkan teknologi kelas dunia dengan sentuhan personal yang memahami karakteristik pasar lokal Anda."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Local FAQ Section with Valid Schema.org JSON-LD */}
      <section className="mb-20 max-w-4xl mx-auto px-6">
        <FAQSchema faqs={areaFaqs} />
        <div className="p-8 sm:p-10 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
          <div className="flex items-center gap-2 text-purple-700 font-mono text-xs font-bold uppercase tracking-widest mb-3">
            <HelpCircle size={15} />
            <span>Tanya Jawab Eksekutif · {formattedCityName}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight mb-2">
            Pertanyaan Sering Diajukan Klien di {formattedCityName}
          </h3>
          <p className="text-sm text-slate-600 font-sans mb-8">
            Transparansi penuh mengenai proses meeting offline, estimasi waktu pengerjaan, dan kesiapan SEO regional untuk bisnis Anda.
          </p>

          <div className="space-y-3">
            {areaFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx} 
                  className="rounded-xl border border-slate-200/80 overflow-hidden bg-slate-50/50 transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left font-bold text-slate-900 text-sm sm:text-base cursor-pointer hover:bg-slate-100/60 transition-colors gap-3"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-purple-600 font-mono text-xs">0{idx + 1}.</span>
                      <span>{faq.question}</span>
                    </span>
                    <ChevronDown 
                      size={16} 
                      className={`text-slate-500 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-purple-600' : ''}`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-200/60 font-sans">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Premium WhatsApp Consultation Card */}
      <section className="max-w-3xl mx-auto px-6 mb-20" id="consultation-box">
        <div className="p-8 sm:p-10 rounded-xl bg-gradient-to-br from-purple-50 via-white to-purple-100/50 border border-purple-200 relative overflow-hidden text-center shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200/30 rounded-full blur-2xl pointer-events-none" />
          
          <div className="mb-6 space-y-2">
            <span className="text-purple-700 font-mono text-[9px] uppercase tracking-[0.2em] inline-flex items-center gap-1.5 bg-purple-100/70 px-3.5 py-1.5 rounded-full border border-purple-200">
              <Sparkles size={11} className="text-purple-600" />
              Inisiasi Bisnis Anda di {formattedCityName}
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">Klaim Konsultasi Langsung.</h3>
            <p className="text-xs sm:text-sm text-slate-600 font-sans max-w-md mx-auto leading-relaxed">
              Diskusikan rancangan arsitektur web rintisan usaha Anda dengan desainer utama kami secara lugas, transparan, dan bebas perantara via WhatsApp.
            </p>
          </div>

          <a
            href={`https://wa.me/6282125447232?text=${encodeURIComponent(`Halo Mas Chesta! Saya mau konsultasi pembuatan website untuk rintisan usaha saya di area ${formattedCityName}. Boleh discuss rancangan visual & penawaran paketnya secara santai?`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-purple-600 text-white px-8 py-4 font-sans font-bold text-xs uppercase tracking-widest hover:bg-purple-700 active:scale-95 transition-all cursor-pointer shadow-lg shadow-purple-600/20 w-full sm:w-auto"
          >
            <MessageCircle size={16} />
            <span>Chat with us on WhatsApp</span>
          </a>

          <p className="text-center font-mono text-[9px] text-slate-500 mt-4 leading-normal">
            *Konsultasi awal gratis 100%. Diskusi langsung dengan Chesta Azka Sofyan (Lead Architect).
          </p>
        </div>
      </section>

      {/* Explore Other Cities */}
      <section className="mb-8 max-w-5xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-6">
           <div className="h-[1px] flex-grow bg-slate-100" />
           <h3 className="text-[8px] font-mono font-bold tracking-[0.2em] text-slate-400 uppercase text-center shrink-0">JANGKAUAN WILAYAH LAIN</h3>
           <div className="h-[1px] flex-grow bg-slate-100" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {CITIES.filter(c => c !== upperCity).map((city) => (
            <Link
              key={city}
              to={`/area/${city.toLowerCase()}`}
              className="group flex items-center justify-between p-2.5 bg-slate-50 border border-slate-100 rounded-lg hover:bg-slate-50 hover:border-[#6b21a8]/20 transition-all font-mono text-[9px] tracking-wider text-slate-600 hover:text-slate-900"
            >
              <div className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#6b21a8]/10 group-hover:bg-[#6b21a8] transition-all" />
                <span className="font-bold">{city}</span>
              </div>
              <ArrowRight size={9} className="text-slate-600 group-hover:text-[#6b21a8] group-hover:translate-x-0.5 transition-all" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
