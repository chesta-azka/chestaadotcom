import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useState } from 'react';
import { MessageCircle, Shield, Sparkles, MapPin, Search, ArrowRight, Star, Quote, CheckCircle, Globe, Zap, ArrowUpRight } from 'lucide-react';
import { CITIES } from '../data/AreasData';
import { SERVICES_DATA } from '../data/ServicesData';
import MetaTags from '../components/atoms/MetaTags';
import TextRevealSmooth from '../components/atoms/TextRevealSmooth';
import Breadcrumbs from '../components/atoms/Breadcrumbs';

export default function AreaDetailPage() {
  const { cityName } = useParams<{ cityName: string }>();

  // Validate city name
  const upperCity = cityName?.toUpperCase() || '';
  const isValidCity = CITIES.includes(upperCity);

  if (!cityName || !isValidCity) {
    return <Navigate to="/services" replace />;
  }

  // Format name nicely (e.g. JAKARTA -> Jakarta)
  const formattedCityName = upperCity.charAt(0) + upperCity.slice(1).toLowerCase();

  // Localized statistics mockup based on city
  const cityStats: { [key: string]: { searchVolume: string, businessGrowth: string, localNiche: string } } = {
    'JAKARTA': { searchVolume: '2.4 Juta+', businessGrowth: '+32.4%', localNiche: 'Startup, Kuliner, Fashion & Corporate Service' },
    'BANDUNG': { searchVolume: '960 Ribu+', businessGrowth: '+28.1%', localNiche: 'Creative Studio, Kuliner Aesthetic, Fashion Brand' },
    'BEKASI': { searchVolume: '780 Ribu+', businessGrowth: '+26.4%', localNiche: 'E-commerce, Manufaktur, Jasa Logistik' },
    'SURABAYA': { searchVolume: '1.8 Juta+', businessGrowth: '+30.2%', localNiche: 'Ekspedisi, Toko Grosir, Ekspor Impor, Kuliner' },
    'MEDAN': { searchVolume: '740 Ribu+', businessGrowth: '+24.8%', localNiche: 'F&B Franchise, Perdagangan, Komoditas' },
    'TANGERANG': { searchVolume: '880 Ribu+', businessGrowth: '+29.6%', localNiche: 'Digital Marketing Agency, UMKM Kreatif, Coffee Shop' },
    'SEMARANG': { searchVolume: '610 Ribu+', businessGrowth: '+22.7%', localNiche: 'Oleh-oleh, Jasa Profesional, Travel & Kuliner' },
  };

  const defaultStats = {
    searchVolume: '450 Ribu+',
    businessGrowth: '+21.5%',
    localNiche: 'UMKM Mandiri, Toko Online, Kuliner Lokal'
  };

  const currentStats = cityStats[upperCity] || defaultStats;

  return (
    <div className="pt-24 pb-28 min-h-screen relative bg-transparent text-white overflow-hidden">
      <MetaTags 
        title={`Jasa Pembuatan Website ${formattedCityName} Premium — CHESTADOTCOM`} 
        description={`Arsitek digital 2026 pembuatan website profesional, cepat, SEO-ready, dan mobile-first untuk UMKM & brand lokal di ${formattedCityName} mulai Rp450K.`}
        path={`/area/${cityName.toLowerCase()}`}
      />

      {/* Hero Section */}
      <section className="relative pt-16 pb-12 mb-12">
        <div className="absolute top-0 inset-x-0 h-[400px] bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#D4FF00]/4 via-transparent to-transparent -z-10 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6">
          {/* Breadcrumb Navigation for SEO with City Scope */}
          <div className="flex justify-center md:justify-start select-none mb-8">
            <Breadcrumbs items={[
              { label: 'Layanan', path: '/services' },
              { label: formattedCityName }
            ]} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-center md:text-left"
          >
            <span className="text-[#D4FF00] font-mono text-[9px] font-bold uppercase tracking-[0.2em] inline-flex items-center gap-2 bg-white/[0.02] px-3.5 py-1.5 rounded-full border border-white/10">
              <MapPin size={9} className="text-[#D4FF00] animate-pulse" />
              PRIORITY SERVICE REGION: {upperCity}
            </span>
            
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-medium tracking-tight leading-[1.08] text-white">
              <TextRevealSmooth 
                text={`Website Premium untuk UMKM di ${formattedCityName} yang Ingin Terlihat Lebih Serius.`} 
                highlightWords={[formattedCityName, "Serius."]}
                highlightClass="text-transparent bg-clip-text bg-gradient-to-r from-[#D4FF00] to-green-400 font-serif italic pl-1"
              />
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-gray-400 font-sans max-w-2xl leading-relaxed mt-4">
              Konversi instan trafik lokal menjadi klien premium. Kami membangun website kustom yang super cepat, 100% mobile-optimized, dan terindeks instan di Google Penelusuran wilayah <strong>{formattedCityName}</strong>.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <a
                href="#consultation-box"
                className="flex items-center justify-center gap-2 rounded-full bg-[#D4FF00] text-black px-6 py-3.5 font-mono text-[10px] font-bold uppercase tracking-wider hover:bg-[#c2e600] active:scale-95 transition-all cursor-pointer shadow-lg shadow-[#D4FF00]/5"
              >
                <span>Mulai Konsultasi Gratis</span>
                <ArrowRight size={12} className="stroke-[2.5px]" />
              </a>
              <Link
                to="/services"
                className="flex items-center justify-center gap-2 rounded-full bg-white/5 border border-white/10 text-white px-6 py-3.5 font-mono text-[10px] font-bold uppercase tracking-wider hover:bg-white/10 transition-all"
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
            className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 flex flex-col justify-between text-left relative overflow-hidden"
          >
            <span className="font-mono text-[8px] text-[#D4FF00] font-black tracking-widest uppercase">🔍 SEARCH VOLUME</span>
            <div className="mt-4">
              <span className="block text-3xl font-mono font-black text-white">{currentStats.searchVolume}</span>
              <span className="text-[11px] text-gray-400 font-sans mt-1.5 block leading-normal">
                Pencarian produk/jasa lokal per bulan di wilayah {formattedCityName}. Amankan porsi pasar Anda sebelum kompetitor mengambil alih seluruh pencarian Google.
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 flex flex-col justify-between text-left"
          >
            <span className="font-mono text-[8px] text-[#D4FF00] font-black tracking-widest uppercase">📈 MARKET PENETRATION</span>
            <div className="mt-4">
              <span className="block text-3xl font-mono font-black text-white">{currentStats.businessGrowth}</span>
              <span className="text-[11px] text-gray-400 font-sans mt-1.5 block leading-normal">
                Pertumbuhan bisnis lokal {formattedCityName} yang beralih total ke branding premium mandiri demi membedakan diri mereka dari persaingan media sosial.
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-2xl bg-[#D4FF00]/[0.02] border border-[#D4FF00]/10 flex flex-col justify-between text-left relative"
          >
            <span className="font-mono text-[8px] text-[#D4FF00] font-black tracking-widest uppercase">🎯 KEY LOCAL SECTOR</span>
            <div className="mt-4">
              <span className="block text-md font-display font-bold text-gray-100">{currentStats.localNiche}</span>
              <span className="text-[11px] text-gray-400 font-sans mt-2 block leading-normal">
                Niche bisnis paling berkembang dengan tingkat konversi tertinggi jika dikemas secara bersih.
              </span>
            </div>
          </motion.div>

        </div>

        {/* Why high performance website matters in this specific city */}
        <div className="p-6 sm:p-10 rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.01] to-transparent text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#D4FF00]/2 rounded-full filter blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
            <div className="md:col-span-6 space-y-3">
              <h3 className="text-xl md:text-2xl font-display font-medium text-white tracking-tight leading-snug">
                Instagram saja tidak cukup untuk memenangkan pasar <span className="text-[#D4FF00]">{formattedCityName}</span>.
              </h3>
              <p className="text-xs text-gray-400 font-sans leading-relaxed">
                Platform sosial luar biasa untuk menaikkan awareness. Namun, untuk meyakinkan pembeli premium bermoninal transaksi tinggi, bisnis Anda membutuhkan kredibilitas digital mandiri yang mapan dan solid.
              </p>
              <p className="text-xs text-gray-500 font-sans leading-relaxed">
                Website premium CHESTADOTCOM memberi Anda kendali penuh atas database konsumen, bebas dari ancaman suspend akun, serta menjamin peringkat teratas Google Pencarian.
              </p>
            </div>

            <div className="md:col-span-6 space-y-3.5 border-t md:border-t-0 md:border-l border-white/5 pt-6 md:pt-0 md:pl-8">
              <div className="flex gap-2.5 items-start">
                <span className="p-1 h-max rounded bg-[#D4FF00]/10 text-[#D4FF00] shrink-0 mt-0.5">
                  <CheckCircle size={11} strokeWidth={2.5} />
                </span>
                <div>
                  <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-white">0.8 Detik Loading Speed</h4>
                  <p className="text-[11px] text-gray-500 font-sans mt-0.5">Mencegah calon klien {formattedCityName} beralih ke kompetitor akibat website lambat.</p>
                </div>
              </div>
              <div className="flex gap-2.5 items-start">
                <span className="p-1 h-max rounded bg-[#D4FF00]/10 text-[#D4FF00] shrink-0 mt-0.5">
                  <CheckCircle size={11} strokeWidth={2.5} />
                </span>
                <div>
                  <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-white">Google SEO Geo-Targeted</h4>
                  <p className="text-[11px] text-gray-500 font-sans mt-0.5">Hadir di halaman utama peta penelusuran lokal saat klien mencari solusi Anda.</p>
                </div>
              </div>
              <div className="flex gap-2.5 items-start">
                <span className="p-1 h-max rounded bg-[#D4FF00]/10 text-[#D4FF00] shrink-0 mt-0.5">
                  <CheckCircle size={11} strokeWidth={2.5} />
                </span>
                <div>
                  <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-white">Direct WhatsApp Funnel</h4>
                  <p className="text-[11px] text-gray-500 font-sans mt-0.5">Menghubungkan pengunjung ke tim admin Anda tanpa friksi formulir pengisian data.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Showcase */}
      <section className="mb-20 max-w-5xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-[1px] flex-grow bg-white/5" />
          <h2 className="text-[9px] font-mono font-bold tracking-[0.25em] text-[#D4FF00] uppercase text-center shrink-0">PILIHAN LAYANAN PREMIUM</h2>
          <div className="h-[1px] flex-grow bg-white/5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SERVICES_DATA.map((service, idx) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="p-5 rounded-xl bg-white/[0.01] border border-white/5 flex flex-col justify-between hover:border-white/15 hover:bg-white/[0.02] transition-all text-left"
            >
              <div>
                <span className="font-mono text-[8px] text-gray-500 tracking-widest uppercase block mb-1.5">LAYANAN UTAMA</span>
                <h3 className="font-display font-bold text-base text-white mb-1.5">{service.name}</h3>
                <p className="text-xs text-gray-400 font-sans leading-relaxed line-clamp-2 mb-4">{service.desc}</p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="font-mono text-[11px] text-gray-300">Mulai Rp450K</span>
                <Link
                  to={`/layanan/${service.slug}`}
                  className="flex items-center gap-1 font-mono text-[9px] uppercase text-[#D4FF00] font-bold group hover:translate-x-0.5 transition-transform"
                >
                  Detail
                  <ArrowRight size={9} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Premium WhatsApp Consultation Card */}
      <section className="max-w-3xl mx-auto px-6 mb-20" id="consultation-box">
        <div className="p-6 sm:p-8 rounded-2xl bg-[#090D18]/90 border border-[#D4FF00]/15 relative overflow-hidden text-center shadow-[0_12px_45px_rgba(0,0,0,0.4)] backdrop-blur-sm">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4FF00]/2 rounded-full blur-2xl pointer-events-none" />
          
          <div className="mb-6 space-y-2">
            <span className="text-[#D4FF00] font-mono text-[8px] uppercase tracking-[0.2em] inline-flex items-center gap-1 bg-white/5 px-3 py-1 rounded-full border border-white/10">
              <Sparkles size={9} className="text-[#D4FF00]" />
              Inisiasi Bisnis Anda di {formattedCityName}
            </span>
            <h3 className="text-2xl font-display font-medium text-white tracking-tight">Klaim Hubungan Konsultasi Terbaik.</h3>
            <p className="text-xs text-gray-400 font-sans max-w-md mx-auto leading-relaxed">
              Diskusikan rancangan arsitektur web rintisan usaha Anda dengan desainer utama kami secara lugas, transparan, dan bebas perantara.
            </p>
          </div>

          <button
            onClick={() => {
              const text = `Halo Mas Chesta! Saya mau konsultasi pembuatan website untuk rintisan usaha saya di area ${formattedCityName}. Boleh discuss rancangan visual & penawaran paketnya secara santai?`;
              window.open(`https://wa.me/6282125447232?text=${encodeURIComponent(text)}`, '_blank');
            }}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D4FF00] text-black px-7 py-3.5 font-sans font-bold text-xs uppercase tracking-widest hover:bg-[#c2e600] active:scale-95 transition-all cursor-pointer shadow-lg shadow-[#D4FF00]/10 w-full sm:w-auto"
          >
            <span>Konsultasi via WhatsApp 🟢</span>
          </button>

          <p className="text-center font-mono text-[8px] text-gray-500 mt-4 leading-normal">
            *Konsultasi awal gratis 100%. Diskusi langsung dengan desainer utama CHESTADOTCOM.
          </p>
        </div>
      </section>

      {/* Explore Other Cities */}
      <section className="mb-8 max-w-5xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-6">
           <div className="h-[1px] flex-grow bg-white/5" />
           <h3 className="text-[8px] font-mono font-bold tracking-[0.2em] text-gray-500 uppercase text-center shrink-0">WILAYAH PRIORITAS LAIN</h3>
           <div className="h-[1px] flex-grow bg-white/5" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {CITIES.filter(c => c !== upperCity).map((city) => (
            <Link
              key={city}
              to={`/area/${city.toLowerCase()}`}
              className="group flex items-center justify-between p-2.5 bg-[#131825]/10 border border-white/5 rounded-lg hover:bg-[#131825]/40 hover:border-[#D4FF00]/20 transition-all font-mono text-[9px] tracking-wider text-gray-400 hover:text-white"
            >
              <div className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-[#D4FF00]/10 group-hover:bg-[#D4FF00] transition-all" />
                <span className="font-bold">{city}</span>
              </div>
              <ArrowRight size={9} className="text-gray-600 group-hover:text-[#D4FF00] group-hover:translate-x-0.5 transition-all" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
