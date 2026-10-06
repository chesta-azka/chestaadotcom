import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Terminal, ShieldCheck, ArrowRight, MapPin, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';

const GEO_LOCATIONS = ['bsd-city', 'jakarta-selatan', 'scbd', 'senopati', 'gading-serpong', 'alam-sutera', 'pik', 'surabaya-barat'];
const AEO_SERVICES = ['konsultan-ai-automation', 'jasa-karyawan-digital', 'arsitektur-headless-ecommerce', 'pengembangan-erp-perusahaan', 'fractional-cto-agency', 'jasa-pembuatan-super-app'];

// Helper function to format display names
function formatDisplayName(str: string): string {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Slug parser utility
function parseSlug(slug: string) {
  for (const geo of GEO_LOCATIONS) {
    if (slug.endsWith('-' + geo)) {
      const servicePart = slug.slice(0, slug.length - geo.length - 1);
      if (AEO_SERVICES.includes(servicePart)) {
        return {
          serviceSlug: servicePart,
          geoSlug: geo,
          serviceName: formatDisplayName(servicePart),
          cityName: formatDisplayName(geo)
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
  const parsedData = parseSlug(slug);

  if (!parsedData) {
    return {
      title: 'Area Tidak Ditemukan | CHESTAA',
      description: 'Halaman pSEO wilayah tidak tersedia.'
    };
  }

  const title = parsedData.serviceName + " B2B di " + parsedData.cityName + " | Chestaa Enterprise";
  const description = "Infrastruktur " + parsedData.serviceName + " kelas Enterprise untuk melipatgandakan ROI perusahaan Anda di wilayah " + parsedData.cityName + ". Jadwalkan audit AI sekarang.";
  const canonicalUrl = `https://chestaa.com/area/${slug}`;
  const ogImageUrl = `https://chestaa.com/api/og?title=${encodeURIComponent(title)}&category=pSEO`;

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
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [ogImageUrl],
    }
  };
}

export default async function PseoAreaPage({ params }: Props) {
  const { slug } = await params;
  const parsedData = parseSlug(slug);

  if (!parsedData) {
    notFound();
  }

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": parsedData.serviceName + " di " + parsedData.cityName,
    "provider": {
      "@type": "Organization",
      "name": "Chestaa Enterprise AI",
      "url": "https://chestaa.com"
    },
    "areaServed": {
      "@type": "Place",
      "name": parsedData.cityName
    },
    "description": "Layanan rekayasa perangkat lunak dan arsitektur AI otonom untuk skala korporat di " + parsedData.cityName + "."
  };

  const serializeJsonLd = (schema: object) => {
    return JSON.stringify(schema)
      .replace(/</g, '\\u003c')
      .replace(/>/g, '\\u003e')
      .replace(/&/g, '\\u0026');
  };

  return (
    <div className="min-h-screen bg-black text-emerald-400 font-mono p-6 sm:p-12 selection:bg-emerald-500 selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(localBusinessSchema) }}
      />

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-emerald-500">
          <Link href="/" className="hover:text-emerald-300 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-emerald-300 transition-colors">Area pSEO</Link>
          <span>/</span>
          <span className="text-white font-bold">{parsedData.cityName}</span>
        </nav>

        {/* Hero Section */}
        <div className="space-y-6 border-b border-emerald-500/30 pb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs uppercase tracking-widest">
            <MapPin size={14} className="text-emerald-400" />
            <span>GEO-TARGETED AEO // REGION: {parsedData.cityName.toUpperCase()}</span>
          </div>

          <h1 className="text-3xl sm:text-6xl font-extrabold tracking-wider text-white uppercase leading-[1.1]">
            Dominasi {parsedData.cityName} dengan Arsitektur <b>{parsedData.serviceName}</b>
          </h1>

          <p className="text-base sm:text-lg text-emerald-300 font-normal leading-relaxed max-w-4xl">
            Banyak perusahaan di {parsedData.cityName} kehilangan ratusan juta karena sistem manual. Chestaa hadir membawa infrastruktur AI otonom untuk menyelesaikan masalah ini.
          </p>
        </div>

        {/* Features / Value Proposition */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
            <Cpu size={24} className="text-emerald-400" />
            <h3 className="text-base font-bold text-white uppercase">Kecepatan Sub-Detik</h3>
            <p className="text-xs text-emerald-300/80 leading-relaxed">
              Arsitektur Next.js 15 teroptimasi untuk kawasan {parsedData.cityName} dengan latensi jaringan minimal.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
            <ShieldCheck size={24} className="text-emerald-400" />
            <h3 className="text-base font-bold text-white uppercase">Karyawan AI 24/7</h3>
            <p className="text-xs text-emerald-300/80 leading-relaxed">
              Otomasi kualifikasi lead dan sinkronisasi CRM otonom khusus untuk korporat di {parsedData.cityName}.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
            <Sparkles size={24} className="text-emerald-400" />
            <h3 className="text-base font-bold text-white uppercase">Dominasi SGE Google</h3>
            <p className="text-xs text-emerald-300/80 leading-relaxed">
              Injeksi Schema Markup dan pSEO matang untuk menempatkan brand Anda di posisi teratas hasil pencarian lokal.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="p-8 sm:p-12 rounded-3xl bg-emerald-950/30 border border-emerald-500/40 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-wide">
            Konsultasi CTO Spesial Area {parsedData.cityName}
          </h2>
          <p className="text-sm text-emerald-300 max-w-2xl mx-auto">
            Jadwalkan sesi peninjauan arsitektur sistem langsung bersama Principal Architect kami untuk wilayah {parsedData.cityName}.
          </p>
          <div>
            <Link
              href="/admin/ai-audit"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-xl cursor-pointer"
            >
              <span><b>Mulai Audit AI Sekarang</b></span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
