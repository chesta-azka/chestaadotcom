import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SERVICES_DATA, ServiceDetailData } from '../../../data/servicesData';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, MessageCircle, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import Breadcrumbs from '../../../components/atoms/Breadcrumbs';
import RelatedServices from '../../../components/organisms/RelatedServices';

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceSchema) }}
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
            <span>Kembali ke Services Hub</span>
          </Link>
        </div>

        {/* Hero Header */}
        <div className="space-y-6 border-b border-slate-200 pb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-mono font-bold uppercase tracking-widest shadow-xs">
            <Sparkles size={14} />
            <span>{service.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
            {service.heroHeadline}
          </h1>

          <p className="text-lg text-slate-900 leading-relaxed font-normal">
            {service.heroDescription}
          </p>

          <div className="pt-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-sans font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-600/25 transition-all cursor-pointer"
            >
              <MessageCircle size={18} />
              <span><b>Dapatkan Audit &amp; Konsultasi Gratis</b></span>
            </a>
          </div>
        </div>

        {/* Core Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {service.coreMetrics.map((metric, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-xs space-y-2">
              <div className="text-2xl font-extrabold text-purple-600 font-mono">{metric.value}</div>
              <div className="text-sm font-bold text-slate-900">{metric.label}</div>
              <div className="text-xs text-slate-900 leading-relaxed">{metric.desc}</div>
            </div>
          ))}
        </div>

        {/* Problem Statement */}
        <div className="space-y-6 pt-6">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
            {service.problemStatement.title}
          </h2>
          <div className="space-y-4">
            {service.problemStatement.points.map((point, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-purple-50/50 border border-purple-100">
                <ShieldCheck size={18} className="text-purple-600 shrink-0 mt-0.5" />
                <p className="text-sm text-slate-900 leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Solution Overview */}
        <div className="space-y-6 pt-6">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
            {service.solutionOverview.title}
          </h2>
          <p className="text-base text-slate-900 leading-relaxed">
            {service.solutionOverview.description}
          </p>
          <ul className="space-y-3">
            {service.solutionOverview.benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-slate-900">
                <CheckCircle2 size={16} className="text-purple-600 shrink-0 mt-0.5" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Process Steps */}
        <div className="space-y-6 pt-6">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
            Tahapan Eksekusi &amp; Implementasi
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {service.processSteps.map((step, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 font-mono font-bold flex items-center justify-center shrink-0">
                  {step.step}
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-900 leading-relaxed">{step.desc}</p>
                </div>
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

        {/* FAQs */}
        <div className="space-y-6 pt-6">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
            Pertanyaan Sering Diajukan (FAQ)
          </h2>
          <div className="space-y-4">
            {service.faqs.map((faq, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                <h3 className="text-base font-bold text-slate-900">{faq.q}</h3>
                <p className="text-sm text-slate-900 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Services Carousel Section */}
        <RelatedServices currentSlug={slug} />

        {/* Bottom CTA Box */}
        <div className="p-10 rounded-3xl bg-purple-600 text-white text-center space-y-6 shadow-xl shadow-purple-600/20 my-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-white">
            Siap Mendominasi Pasar dengan Arsitektur Eksekutif?
          </h2>
          <p className="text-purple-100 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Jadwalkan konsultasi prioritas langsung bersama Principal Engineer kami dan wujudkan infrastruktur digital tanpa kompromi.
          </p>
          <div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-full font-bold hover:bg-slate-50 hover:scale-105 transition-transform shadow-lg cursor-pointer"
            >
              <MessageCircle size={18} />
              <span><b>Mulai Konsultasi Prioritas</b></span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
