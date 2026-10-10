import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Terminal, 
  ShieldCheck, 
  ArrowRight, 
  MapPin, 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  MessageCircle, 
  HelpCircle, 
  ChevronDown, 
  Building2, 
  Zap, 
  Globe, 
  Users,
  Star
} from 'lucide-react';
import { SEO_SERVICES } from '../../../data/seo-services';
import generatedContentRaw from '../../../data/generated-service-content.json';
import FAQSchema from '../../../components/atoms/FAQSchema';

// Next.js 15 Performance Configuration
export const revalidate = 3600; 
export const dynamic = 'force-static'; 
export const fetchCache = 'force-cache';

const generatedContent = generatedContentRaw as Record<string, { metaDescription: string, intro: string }>;

export const INDONESIA_CITIES = [
  'Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Semarang', 'Tangerang', 'Depok', 'Bekasi',
  'Cisauk', 'Pemalang', 'Rawa Buntu', 'BSD City', 'Gading Serpong', 'SCBD', 'Mega Kuningan',
  'Kelapa Gading', 'Pantai Indah Kapuk', 'Sudirman', 'Thamrin', 'Kuningan'
];

export const CITY_GEO_COORDINATES: Record<string, { lat: number; lng: number; region: string; postalCode: string }> = {
  'Cisauk': { lat: -6.3262, lng: 106.6433, region: 'Kabupaten Tangerang, Banten', postalCode: '15341' },
  'Pemalang': { lat: -6.8927, lng: 109.3807, region: 'Kabupaten Pemalang, Jawa Tengah', postalCode: '52319' },
  'Rawa Buntu': { lat: -6.3195, lng: 106.6896, region: 'Serpong, Kota Tangerang Selatan, Banten', postalCode: '15318' },
  'BSD City': { lat: -6.3015, lng: 106.6534, region: 'Tangerang Selatan, Banten', postalCode: '15321' },
  'Gading Serpong': { lat: -6.2415, lng: 106.6284, region: 'Tangerang, Banten', postalCode: '15810' },
  'SCBD': { lat: -6.2269, lng: 106.8098, region: 'Jakarta Selatan, DKI Jakarta', postalCode: '12190' },
  'Mega Kuningan': { lat: -6.2289, lng: 106.8268, region: 'Jakarta Selatan, DKI Jakarta', postalCode: '12950' },
  'Kelapa Gading': { lat: -6.1554, lng: 106.9025, region: 'Jakarta Utara, DKI Jakarta', postalCode: '14240' },
  'Pantai Indah Kapuk': { lat: -6.1111, lng: 106.7388, region: 'Jakarta Utara, DKI Jakarta', postalCode: '14470' },
  'Sudirman': { lat: -6.2197, lng: 106.8161, region: 'Jakarta Pusat, DKI Jakarta', postalCode: '10220' },
  'Thamrin': { lat: -6.1950, lng: 106.8231, region: 'Jakarta Pusat, DKI Jakarta', postalCode: '10310' },
  'Kuningan': { lat: -6.2248, lng: 106.8296, region: 'Jakarta Selatan, DKI Jakarta', postalCode: '12940' },
  'Jakarta': { lat: -6.2088, lng: 106.8456, region: 'DKI Jakarta', postalCode: '10110' },
  'Tangerang': { lat: -6.1783, lng: 106.6319, region: 'Banten', postalCode: '15111' },
  'Surabaya': { lat: -7.2575, lng: 112.7521, region: 'Jawa Timur', postalCode: '60111' },
  'Bandung': { lat: -6.9175, lng: 107.6191, region: 'Jawa Barat', postalCode: '40111' },
  'Semarang': { lat: -6.9667, lng: 110.4167, region: 'Jawa Tengah', postalCode: '50131' },
  'Medan': { lat: 3.5952, lng: 98.6722, region: 'Sumatera Utara', postalCode: '20111' },
  'Depok': { lat: -6.4025, lng: 106.7942, region: 'Jawa Barat', postalCode: '16411' },
  'Bekasi': { lat: -6.2383, lng: 106.9756, region: 'Jawa Barat', postalCode: '17111' },
};

function parseNationalSlug(slug: string) {
  const exactService = SEO_SERVICES.find(s => s.id === slug);
  if (exactService) {
    return {
      service: exactService,
      cityName: 'Seluruh Indonesia',
      isNational: true,
    };
  }

  for (const city of INDONESIA_CITIES) {
    const citySlug = city.toLowerCase().replace(/\s+/g, '-');
    if (slug === citySlug) {
      return {
        service: SEO_SERVICES[0], 
        cityName: city,
        isNational: false,
      };
    }
  }

  for (const city of INDONESIA_CITIES) {
    const citySlugPart = '-' + city.toLowerCase().replace(/\s+/g, '-');
    if (slug.endsWith(citySlugPart)) {
      const serviceIdPart = slug.slice(0, slug.length - citySlugPart.length);
      const matchedService = SEO_SERVICES.find(s => s.id === serviceIdPart);
      if (matchedService) {
        return {
          service: matchedService,
          cityName: city,
          isNational: false,
        };
      }
    }
  }

  return null;
}

function generateLocalFaqs(cityName: string, serviceName: string) {
  return [
    {
      question: `Berapa biaya pembuatan sistem dan ${serviceName} di ${cityName}?`,
      answer: `Investasi implementasi sistem di ${cityName} disesuaikan dengan skala kebutuhan, mulai dari paket akselerasi UMKM hingga arsitektur kustom enterprise dengan ROI terukur dan efisiensi biaya operasional nyata.`
    },
    {
      question: `Berapa lama waktu implementasi Karyawan AI dan sistem web di ${cityName}?`,
      answer: `Landing page dan sistem siap go-live dalam 3 hingga 7 hari kerja. Integrasi Karyawan Digital AI otonom dan arsitektur data kustom diserahterimakan dalam 1 hingga 3 minggu.`
    },
    {
      question: `Apakah tim Chestaa dapat melakukan pertemuan tatap muka di wilayah ${cityName}?`,
      answer: `Sangat bisa. Kami mengutamakan kedekatan relasi bisnis dan siap mengadakan sesi konsultasi atau audit sistem tatap muka langsung di kantor Anda atau titik temu strategis wilayah ${cityName}.`
    },
    {
      question: `Apakah website kami akan mendominasi pencarian lokal Google di ${cityName}?`,
      answer: `Ya, seluruh arsitektur web Chestaa sudah dilengkapi injeksi Schema.org LocalBusiness, GeoCoordinates resmi, dan optimasi Core Web Vitals sub-detik untuk menjamin peringkat teratas di Google Maps dan SERP ${cityName}.`
    }
  ];
}

type Props = {
  params: Promise<{ slug: string }>;
};

function generateOgImageUrl(title: string, cityName: string) {
  const baseUrl = 'https://chestaa.com/api/og';
  const params = new URLSearchParams({
    title: title,
    category: `Regional: ${cityName}`,
  });
  return `${baseUrl}?${params.toString()}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseNationalSlug(slug);

  if (!parsed) {
    return {
      title: 'Wilayah Tidak Ditemukan | Chestaa',
      description: 'Halaman pSEO nasional tidak tersedia.',
    };
  }

  const aiContent = generatedContent[parsed.service.id];
  const title = `${parsed.service.name} di ${parsed.cityName} | Solusi Digital Enterprise Chestaa`;
  const description = aiContent?.metaDescription || `${parsed.service.description} Kami menghadirkan infrastruktur ${parsed.service.name} terbaik di ${parsed.cityName} untuk melipatgandakan profit perusahaan Anda. Jadwalkan audit sekarang.`;
  const canonicalUrl = `https://chestaa.com/area/${slug}`;
  const ogImageUrl = generateOgImageUrl(title, parsed.cityName);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Chestaa Enterprise AI',
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }],
      locale: 'id_ID',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export async function generateStaticParams() {
  const params: { slug: string }[] = [];
  INDONESIA_CITIES.forEach(city => {
    params.push({ slug: city.toLowerCase().replace(/\s+/g, '-') });
  });
  const TOP_SERVICES = SEO_SERVICES.slice(0, 10);
  TOP_SERVICES.forEach(service => {
    INDONESIA_CITIES.forEach(city => {
      params.push({ slug: `${service.id}-${city.toLowerCase().replace(/\s+/g, '-')}` });
    });
  });
  return params;
}

export default async function NationalAreaPage({ params }: Props) {
  const { slug } = await params;
  const parsed = parseNationalSlug(slug);

  if (!parsed) {
    notFound();
  }

  const geo = CITY_GEO_COORDINATES[parsed.cityName] || {
    lat: -6.3015,
    lng: 106.6534,
    region: 'Indonesia',
    postalCode: '15321',
  };

  const aiContent = generatedContent[parsed.service.id];
  const localFaqs = generateLocalFaqs(parsed.cityName, parsed.service.name);

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `https://chestaa.com/area/${slug}#localbusiness`,
    'name': `Chestaa Enterprise AI - ${parsed.cityName}`,
    'description': aiContent?.metaDescription || `Penyedia ${parsed.service.name} dan transformasi digital enterprise terdepan di ${parsed.cityName} (${geo.region}).`,
    'telephone': '+62-821-2544-7232',
    'priceRange': '$$',
    'url': `https://chestaa.com/area/${slug}`,
    'areaServed': [
      { '@type': 'City', 'name': parsed.cityName },
      { '@type': 'AdministrativeArea', 'name': geo.region }
    ],
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': geo.lat,
      'longitude': geo.lng
    },
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': parsed.cityName,
      'addressRegion': geo.region,
      'postalCode': geo.postalCode,
      'addressCountry': 'ID'
    },
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': `Katalog Layanan Digital Chestaa - ${parsed.cityName}`,
      'itemListElement': SEO_SERVICES.slice(0, 15).map((service, index) => ({
        '@type': 'Offer',
        'position': index + 1,
        'itemOffered': {
          '@type': 'Service',
          'name': service.name,
          'description': service.description
        }
      }))
    },
    'provider': {
      '@type': 'Organization',
      'name': 'Chestaa Enterprise AI',
      'url': 'https://chestaa.com',
      'logo': 'https://chestaa.com/chesta.png'
    }
  };

  const serializeJsonLd = (schema: object) => {
    return JSON.stringify(schema)
      .replace(/</g, '\\u003c')
      .replace(/>/g, '\\u003e')
      .replace(/&/g, '\\u0026');
  };

  const whatsappConsultUrl = `https://wa.me/6282125447232?text=Halo%20Chestaa,%20saya%20tertarik%20dengan%20layanan%20${encodeURIComponent(parsed.service.name)}%20di%20wilayah%20${encodeURIComponent(parsed.cityName)}`;

  return (
    <div className="min-h-screen bg-[#fbfbfd] text-slate-900 pt-32 pb-24 selection:bg-purple-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(localBusinessJsonLd) }}
      />
      
      {/* LCP Optimization: High-Priority Background Image */}
      <div className="absolute top-0 left-0 right-0 h-[700px] -z-10 overflow-hidden opacity-[0.04] pointer-events-none">
        <Image
          src={`https://picsum.photos/seed/${parsed.cityName}/1920/1080?grayscale`}
          alt={`Infrastruktur Digital ${parsed.cityName}`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fbfbfd]/50 to-[#fbfbfd]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 space-y-20">
        
        {/* Navigation & Breadcrumbs */}
        <div className="max-w-4xl">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">
              <MapPin size={12} className="text-purple-600" />
              <span>Priority Access: {parsed.cityName.toUpperCase()}</span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-slate-950 leading-[1.1] font-display">
              {parsed.service.name} <br /> 
              <span className="text-purple-600 italic">di {parsed.cityName}</span>
            </h1>

            <p className="text-xl text-slate-500 leading-relaxed font-medium max-w-3xl">
              {aiContent?.intro || `Tim Principal Chestaa hadir di ${parsed.cityName} untuk mengeliminasi inefisiensi manual dan membangun infrastruktur ${parsed.service.name} kelas korporat yang dirancang khusus untuk melipatgandakan profit Anda.`}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href={whatsappConsultUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-5 bg-purple-600 hover:bg-purple-700 text-white rounded-[24px] font-extrabold text-sm uppercase tracking-widest shadow-[0_10px_40px_rgba(126,34,206,0.25)] transition-all flex items-center justify-center gap-3 cursor-pointer"
              >
                <span>Konsultasi Strategis {parsed.cityName}</span>
                <ArrowRight size={18} />
              </a>
              <Link
                href="/services"
                className="px-8 py-5 bg-white hover:bg-slate-50 text-slate-900 rounded-[24px] font-bold text-sm uppercase tracking-widest border border-slate-200 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Lihat Semua Katalog</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Cpu,
              title: "Kecepatan Sub-Detik",
              desc: `Arsitektur Next.js 15 dan Edge Caching dirancang khusus untuk memastikan skor Core Web Vitals sempurna bagi pelanggan di ${parsed.cityName}.`
            },
            {
              icon: ShieldCheck,
              title: "Keamanan Korporat",
              desc: `Proteksi data tingkat bank dan enkripsi terpusat untuk menjaga kerahasiaan seluruh aset digital perusahaan Anda di ${parsed.cityName}.`
            },
            {
              icon: Sparkles,
              title: "Karyawan Digital AI",
              desc: `Otomatisasi prospek dan layanan pelanggan 24/7 tanpa henti yang memangkas beban biaya operasional admin hingga 70%.`
            }
          ].map((feature, i) => (
            <div key={i} className="p-10 rounded-[40px] bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all duration-500">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 mb-8 border border-purple-100">
                <feature.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-950 mb-4 tracking-tight">{feature.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Local Narrative Split */}
        <div className="py-24 border-y border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-purple-600 text-[10px] font-bold uppercase tracking-[0.2em]">
                <Globe size={12} />
                <span>Hybrid Consulting Model</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight">
                Kolaborasi Tatap Muka <br /> di Wilayah {parsed.cityName}.
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed font-medium">
                Kami memahami bahwa transformasi digital yang sukses membutuhkan pemahaman mendalam tentang ekosistem bisnis lokal. Di <strong>{parsed.cityName}</strong>, Chestaa menerapkan model kerja <strong>Hybrid Consulting</strong> yang menggabungkan efisiensi kolaborasi digital dengan audit langsung di lokasi.
              </p>
              
              <div className="space-y-6 pt-4">
                {[
                  {
                    icon: MapPin,
                    title: "Audit On-Site Strategis",
                    desc: `Tim kami siap melakukan kunjungan ke kantor Anda di ${parsed.cityName} untuk memahami alur kerja manual dan titik hambatan operasional secara nyata.`
                  },
                  {
                    icon: Zap,
                    title: "Implementasi Remote Cepat",
                    desc: "Pengembangan sistem dilakukan dengan standar performa tinggi melalui koordinasi digital real-time, memastikan go-live dalam hitungan hari."
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 p-6 rounded-3xl bg-white border border-slate-100 shadow-sm">
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center shrink-0 border border-purple-100">
                      <item.icon size={22} className="text-purple-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative aspect-square bg-slate-100 rounded-[64px] overflow-hidden border border-slate-200 group shadow-2xl">
              <Image 
                src="https://picsum.photos/seed/consulting/1200/1200" 
                alt={`Konsultasi AI di ${parsed.cityName}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/90 backdrop-blur-xl rounded-[32px] border border-white/20 shadow-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-900">Partner Strategis {parsed.cityName}</span>
                </div>
                <p className="text-sm text-slate-600 font-bold italic leading-relaxed">
                  "Menghadirkan arsitektur AI kelas dunia dengan sentuhan personal yang memahami karakteristik pasar lokal di {parsed.cityName}."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Local FAQ Section */}
        <div className="p-10 sm:p-16 rounded-[64px] bg-white border border-slate-100 shadow-sm space-y-12">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-[10px] font-bold uppercase tracking-[0.2em]">
              <HelpCircle size={12} />
              <span>Executive Support</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight font-display">
              Pertanyaan Eksekutif di {parsed.cityName}
            </h2>
            <p className="text-lg text-slate-500 font-medium">
              Transparansi penuh mengenai durasi pengerjaan, kepatuhan teknis, dan dukungan pertemuan tatap muka di wilayah {parsed.cityName}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FAQSchema faqs={localFaqs} />
            {localFaqs.map((faq, idx) => (
              <div 
                key={idx}
                className="p-8 rounded-[32px] bg-slate-50/50 border border-slate-200/50 space-y-4 transition-all hover:bg-white hover:border-purple-200 hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-extrabold text-purple-400 uppercase tracking-widest">Question 0{idx + 1}</span>
                  <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                    <CheckCircle2 size={12} className="text-purple-600" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-950 tracking-tight leading-snug">
                  {faq.question}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Verification Footer Strip */}
        <div className="pt-10 flex flex-wrap items-center justify-center gap-12 border-t border-slate-100 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
            <ShieldCheck size={16} />
            <span>ISO 27001 Certified</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
            <Zap size={16} />
            <span>99.9% Uptime SLA</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
            <Star size={16} />
            <span>Enterprise Partner</span>
          </div>
        </div>

      </div>
    </div>
  );
}
