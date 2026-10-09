import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Terminal, ShieldCheck, ArrowRight, MapPin, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';
import { INDONESIA_CITIES, CORE_PSEO_SERVICES } from '../../../data/pseo-indonesia';

// Helper to parse slug and match with valid cities and services
function parseNationalSlug(slug: string) {
  for (const city of INDONESIA_CITIES) {
    const citySlugPart = '-' + city.toLowerCase().replace(/\s+/g, '-');
    if (slug.endsWith(citySlugPart)) {
      const serviceIdPart = slug.slice(0, slug.length - citySlugPart.length);
      const matchedService = CORE_PSEO_SERVICES.find(s => s.id === serviceIdPart);
      if (matchedService) {
        return {
          serviceId: matchedService.id,
          serviceName: matchedService.name,
          cityName: city
        };
      }
    }
  }
  return null;
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseNationalSlug(slug);

  if (!parsed) {
    return {
      title: 'Wilayah Tidak Ditemukan | Chestaa',
      description: 'Halaman pSEO nasional tidak tersedia.'
    };
  }

  const title = "Jasa " + parsed.serviceName + " di " + parsed.cityName + " | Chestaa";
  const description = "Infrastruktur " + parsed.serviceName + " kelas Enterprise untuk melipatgandakan ROI perusahaan Anda di wilayah " + parsed.cityName + ". Jadwalkan audit AI sekarang.";
  const canonicalUrl = 'https://chestaa.com/area/' + slug;
  const ogImageUrl = 'https://chestaa.com/api/og?title=' + encodeURIComponent(title) + '&category=pSEO';

  return {
    title: title,
    description: description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: title,
      description: description,
      url: canonicalUrl,
      siteName: 'Chestaa Enterprise AI',
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }],
      locale: 'id_ID',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
    }
  };
}

export default async function NationalAreaPage({ params }: Props) {
  const { slug } = await params;
  const parsed = parseNationalSlug(slug);

  if (!parsed) {
    notFound();
  }

  // Schema.org LocalBusiness JSON-LD injection
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Chestaa Enterprise AI - ' + parsed.cityName,
    description: 'Penyedia ' + parsed.serviceName + ' terdepan di ' + parsed.cityName + '.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: parsed.cityName,
      addressCountry: 'ID'
    },
    url: 'https://chestaa.com/area/' + slug,
    telephone: '+62-821-2544-7232'
  };

  const whatsappConsultUrl = `https://wa.me/6282125447232?text=Halo%20Chestaa,%20saya%20tertarik%20dengan%20layanan%20${encodeURIComponent(parsed.serviceName)}%20di%20wilayah%20${encodeURIComponent(parsed.cityName)}`;
  const whatsappMeetingUrl = `https://wa.me/6282125447232?text=Halo%20Chestaa,%20saya%20ingin%20mengatur%20jadwal%20pertemuan%20di%20${encodeURIComponent(parsed.cityName)}`;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-purple-100 selection:text-purple-900 pt-32 pb-24">
      {/* JSON-LD Script Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        
        {/* Breadcrumb Header */}
        <div className="mb-8 flex items-center gap-2 text-xs font-mono text-slate-500">
          <Link href="/" className="hover:text-purple-600 transition-colors">Beranda</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-purple-600 transition-colors">Layanan</Link>
          <span>/</span>
          <span className="text-purple-700 font-bold">{parsed.cityName}</span>
        </div>

        {/* Hero Section */}
        <div className="mb-20 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-mono uppercase tracking-wider mb-6">
            <MapPin size={14} className="text-purple-600" />
            <span>Ekspansi Korporat Regional • {parsed.cityName.toUpperCase()}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
            Infrastruktur <b>{parsed.serviceName}</b> Terbaik di {parsed.cityName}
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal mb-8">
            Chestaa hadir untuk mengotomatisasi bisnis dan korporasi di wilayah {parsed.cityName} menggunakan teknologi AI termutakhir. Tinggalkan cara manual.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href={whatsappConsultUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-600/25 transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <span>Konsultasi Wilayah {parsed.cityName}</span>
              <ArrowRight size={16} />
            </a>
            <Link
              href="/services"
              className="px-7 py-4 bg-white hover:bg-slate-50 text-slate-900 rounded-2xl font-bold text-xs uppercase tracking-wider border border-slate-200 transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Lihat Hub Layanan</span>
            </Link>
          </div>
        </div>

        {/* Core Value Proposition Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white border border-purple-200 text-purple-600 flex items-center justify-center mb-6 shadow-xs">
                <Cpu size={22} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 tracking-tight">Performa Sub-Detik</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Infrastruktur web dan sistem AI berkecepatan tinggi yang dioptimalkan khusus untuk latensi rendah di {parsed.cityName}.
              </p>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white border border-purple-200 text-purple-600 flex items-center justify-center mb-6 shadow-xs">
                <ShieldCheck size={22} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 tracking-tight">Keamanan Korporat</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Proteksi data tingkat lanjut dan kepatuhan enkripsi penuh untuk melindungi aset digital perusahaan Anda di {parsed.cityName}.
              </p>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white border border-purple-200 text-purple-600 flex items-center justify-center mb-6 shadow-xs">
                <Sparkles size={22} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 tracking-tight">Otomatisasi Autopilot</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Kurangi biaya operasional hingga 70% dengan agen AI otonom yang bekerja 24/7 tanpa henti.
              </p>
            </div>
          </div>
        </div>

        {/* Localized Execution Note */}
        <div className="p-8 sm:p-12 rounded-3xl bg-purple-50/70 border border-purple-200 flex flex-col md:flex-row items-center justify-between gap-8 mb-24 shadow-sm">
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold text-purple-700 uppercase tracking-widest">Dukungan Lokal {parsed.cityName}</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Siap Kunjungan &amp; Meeting Tatap Muka</h2>
            <p className="text-sm text-slate-600 max-w-xl leading-relaxed">
              Tim Principal Engineer kami siap berkoordinasi langsung dengan pimpinan perusahaan Anda di {parsed.cityName} untuk audit sistem mendalam.
            </p>
          </div>
          <a
            href={whatsappMeetingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-bold text-xs uppercase tracking-wider shadow-md shadow-purple-600/20 whitespace-nowrap"
          >
            Jadwalkan Pertemuan
          </a>
        </div>

      </div>
    </div>
  );
}
