import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SERVICES_DATA } from '../../../data/servicesData';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, MessageCircle, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import Breadcrumbs from '../../../components/atoms/Breadcrumbs';
import RelatedServices from '../../../components/organisms/RelatedServices';
import SEOAreaLinks from '../../../components/organisms/SEOAreaLinks';
import ServiceFaqExpandable from '../../../components/organisms/ServiceFaqExpandable';
import AuditConsultationButton from '../../../components/atoms/AuditConsultationButton';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES_DATA[slug];

  if (!service) {
    return {
      title: 'Layanan Tidak Ditemukan | CHESTAA',
      description: 'Layanan arsitektur digital dan otomasi AI tidak tersedia.'
    };
  }

  const canonicalUrl = `https://chestaa.com/services/${slug}`;
  const ogImageUrl = `https://chestaa.com/api/og?title=${encodeURIComponent(service.title)}&category=Services`;

  return {
    title: `${service.title} | CHESTAA Enterprise`,
    description: service.heroDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: service.title,
      description: service.heroDescription,
      url: canonicalUrl,
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: service.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: service.title,
      description: service.heroDescription,
      images: [ogImageUrl],
    }
  };
}

export default async function ServiceSlugPage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES_DATA[slug];

  if (!service) {
    notFound();
  }

  // Service Schema.org JSON-LD
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.heroDescription,
    "provider": {
      "@type": "Organization",
      "name": "Chestaa Enterprise AI",
      "url": "https://chestaa.com"
    },
    "areaServed": ["BSD City", "Jakarta", "Tangerang", "Indonesia"],
    "offers": {
      "@type": "Offer",
      "price": "540000",
      "priceCurrency": "IDR"
    }
  };

  // Dynamic FAQ Schema.org JSON-LD for Rich Snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": service.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  // Dynamic BreadcrumbList Schema.org JSON-LD
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://chestaa.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://chestaa.com/services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": service.title,
        "item": `https://chestaa.com/services/${slug}`
      }
    ]
  };

  const serializeJsonLd = (schema: object) => {
    return JSON.stringify(schema)
      .replace(/</g, '\\u003c')
      .replace(/>/g, '\\u003e')
      .replace(/&/g, '\\u0026');
  };

  const whatsappText = `Halo Mas Chesta, saya tertarik menggunakan layanan ${service.title}. Mohon jadwalkan konsultasi prioritas hari ini.`;
  const whatsappUrl = `https://wa.me/6282125447232?text=${encodeURIComponent(whatsappText)}`;

  return (
    <div className="min-h-screen pt-36 pb-28 bg-white text-slate-900 font-sans selection:bg-purple-100 selection:text-purple-900">
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />

      <div className="max-w-4xl mx-auto px-6 sm:px-8 space-y-12">
        {/* Breadcrumb Integration */}
        <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Services', path: '/services' }, { label: service.title, path: `/services/${slug}` }]} />

        {/* Back Link */}
        <div>
          <Link 
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-purple-600 hover:text-purple-700 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Kembali ke Hub Layanan</span>
          </Link>
        </div>

        {/* Header Section */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-mono uppercase tracking-wider">
            <Sparkles size={13} />
            <span>{service.category} • {service.badge}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
            {service.title}
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal">
            {service.subtitle}
          </p>
        </div>

        {/* Core Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {service.coreMetrics.map((metric, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs flex flex-col justify-between space-y-3">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">{metric.label}</span>
              <div className="text-3xl font-extrabold text-purple-600 tracking-tight">{metric.value}</div>
              <p className="text-sm text-slate-600 leading-relaxed">{metric.desc}</p>
            </div>
          ))}
        </div>

        {/* Problem Statement */}
        <div className="p-8 sm:p-10 rounded-3xl bg-rose-50/60 border border-rose-200 space-y-6">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {service.problemStatement.title}
          </h2>
          <ul className="space-y-4 list-none p-0 m-0">
            {service.problemStatement.points.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3 text-slate-700 text-sm sm:text-base leading-relaxed">
                <span className="w-2 h-2 rounded-full bg-rose-500 mt-2 shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Solution Overview */}
        <div className="p-8 sm:p-10 rounded-3xl bg-purple-50/60 border border-purple-200 space-y-6">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {service.solutionOverview.title}
          </h2>
          <p className="text-slate-700 text-base leading-relaxed">
            {service.solutionOverview.description}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
            {service.solutionOverview.benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-white border border-purple-100 shadow-2xs">
                <CheckCircle2 size={18} className="text-purple-600 shrink-0" />
                <span className="text-sm font-bold text-slate-900">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Process Steps */}
        <div className="space-y-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
            Fase Pengerjaan &amp; Metodologi
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {service.processSteps.map((step, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-xs font-mono">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantee Banner */}
        <div className="p-8 rounded-3xl bg-purple-50 border border-purple-200 text-slate-900 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-purple-700 uppercase tracking-widest">
            <Zap size={14} />
            <span>Garansi &amp; Komitmen Eksekutif</span>
          </div>
          <p className="text-sm sm:text-base font-medium text-slate-900 leading-relaxed">
            {service.guarantee}
          </p>
        </div>

        {/* FAQs with Individual Show More Toggle Feature */}
        <div className="space-y-6 pt-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
              Pertanyaan Sering Diajukan (FAQ)
            </h2>
            <p className="text-sm text-slate-500 font-sans">
              Klik &quot;Lihat Selengkapnya&quot; pada setiap butir pertanyaan untuk membaca jawaban detail.
            </p>
          </div>
          <ServiceFaqExpandable faqs={service.faqs} />
        </div>

        {/* Related Services Carousel Section */}
        <RelatedServices currentSlug={slug} />

        {/* Bottom CTA Box with Event Tracking Hook */}
        <div className="p-10 rounded-3xl bg-purple-600 text-white text-center space-y-6 shadow-xl shadow-purple-600/20 my-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-white">
            Siap Mendominasi Pasar dengan Arsitektur Eksekutif?
          </h2>
          <p className="text-purple-100 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Jadwalkan konsultasi prioritas langsung bersama Principal Engineer kami dan wujudkan infrastruktur digital tanpa kompromi.
          </p>
          <div className="flex justify-center">
            <AuditConsultationButton 
              whatsappUrl={whatsappUrl} 
              serviceTitle={service.title} 
              serviceSlug={slug} 
            />
          </div>
        </div>

        {/* National Mega Footer Cross-Linker */}
        <SEOAreaLinks />

      </div>
    </div>
  );
}
