import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams, Navigate, useLocation } from 'react-router-dom';
import {
  MessageCircle,
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  Check,
  ShieldCheck,
  UserCheck,
  FileCheck,
  Lock,
  Layers,
  Gauge,
  Workflow,
  MapPin,
} from 'lucide-react';
import SEOMetadata from '../components/atoms/SEOMetadata';
import HeroAgentGraph from '../components/organisms/HeroAgentGraph';
import {
  getAdjacentServices,
  ServiceSlug,
} from '../data/services';
import { getServiceAreasByServiceSlug } from '../data/service-areas';
import { getBlogPostBySlug, getAuthorProfile } from '../data/blog-posts';
import { SITE_IMAGES } from '../config/images';
import { lineDrawElement } from '../lib/motion';
import { resolveRedirectTarget } from '../config/redirects';
import { parseLocalizedPath, toLocalizedHref } from '../lib/i18n';
import {
  getLocalizedService,
  getLocalizedServiceCaseStudies,
  getLocalizedServiceAreaPage,
} from '../lib/i18n-content';
import {
  Container,
  Button,
  Card,
  Badge,
  Tag,
  SectionHeading,
  Reveal,
  FAQAccordion,
  CTABlock,
  Breadcrumb,
  ImageWithFallback,
  buildWaUrl,
} from '../components/ui/DesignSystem';
import FAQSchema from '../components/seo/FAQSchema';

/**
 * Service-specific animated visual in Hero (1 of 4 depending on slug).
 * Every visual is labeled "Ilustrasi" / "Illustration" per specification.
 */
function ServiceHeroVisual({
  slug,
  isEn,
}: {
  slug: ServiceSlug;
  isEn: boolean;
}) {
  if (slug === 'ai-agent') {
    return (
      <div className="w-full max-w-[480px] mx-auto">
        <HeroAgentGraph />
      </div>
    );
  }

  if (slug === 'pembuatan-website') {
    return (
      <div className="w-full max-w-[460px] mx-auto rounded-[24px] glass-card p-5 md:p-6">
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[rgba(91,60,196,0.14)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#6A3FD0]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#17122B] font-semibold">
              {isEn
                ? 'Web Assembly & Speed Simulation'
                : 'Simulasi Perakitan & Kecepatan Web'}
            </span>
          </div>
          <span className="font-mono text-[11px] text-[#6A3FD0] bg-[#EFEAFB] px-2.5 py-0.5 rounded-full font-medium">
            {isEn ? 'Illustration' : 'Ilustrasi'}
          </span>
        </div>

        {/* Browser Frame Assembling */}
        <div className="rounded-[18px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] p-4 space-y-3">
          {/* Top bar */}
          <div className="flex items-center justify-between pb-2.5 border-b border-[rgba(91,60,196,0.14)]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#B9A2F2]" />
              <span className="w-2 h-2 rounded-full bg-[#7C54E0]" />
              <span className="w-2 h-2 rounded-full bg-[#6A3FD0]" />
            </div>
            <span className="font-mono text-[10px] text-[#5B5675] bg-[#FFFFFF] px-2.5 py-0.5 rounded-full border border-[rgba(91,60,196,0.14)]">
              {isEn ? 'https://yourbusiness.com' : 'https://bisnismu.com'}
            </span>
          </div>

          {/* Assembling Hero Block */}
          <div className="p-3.5 rounded-[14px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] space-y-2 transition-transform duration-500">
            <span className="inline-block font-mono text-[9px] uppercase tracking-[0.08em] text-[#6A3FD0] bg-[#EFEAFB] px-2 py-0.5 rounded-full font-semibold">
              1. Headline &amp; Value Prop
            </span>
            <div className="h-3 w-4/5 rounded-full bg-[#17122B]/85" />
            <div className="h-2 w-3/5 rounded-full bg-[#5B5675]/45" />
            <div className="pt-1 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#6A3FD0] text-[#FFFFFF] font-mono text-[10px] font-semibold">
                {isEn ? 'Tracked WhatsApp CTA' : 'CTA WhatsApp Terukur'}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] font-mono text-[10px] text-[#5B5675]">
                Schema JSON-LD
              </span>
            </div>
          </div>

          {/* Assembling Proof + Speed Meter */}
          <div className="grid grid-cols-12 gap-3 items-stretch">
            <div className="col-span-7 p-3.5 rounded-[14px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] flex flex-col justify-between">
              <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-[#5B5675]">
                {isEn ? '2. Proof & Catalog' : '2. Bukti & Katalog'}
              </span>
              <div className="my-2 space-y-1.5">
                <div className="h-2 w-full rounded-full bg-[#EFEAFB]" />
                <div className="h-2 w-2/3 rounded-full bg-[#B9A2F2]/60" />
              </div>
              <span className="font-mono text-[10px] text-[#6A3FD0] font-semibold">
                {isEn ? 'Google & Meta Ads Ready' : 'Siap Google & Meta Ads'}
              </span>
            </div>

            <div className="col-span-5 p-3.5 rounded-[14px] bg-[#EFEAFB]/70 border border-[#6A3FD0]/30 flex flex-col items-center justify-center text-center">
              <Gauge size={22} className="text-[#6A3FD0] mb-1" />
              <span className="font-mono text-[16px] font-bold text-[#17122B] leading-none">
                {isEn ? '0.9 sec' : '0.9 dtk'}
              </span>
              <span className="font-mono text-[10px] text-[#6A3FD0] font-semibold mt-1">
                LCP Mobile
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[rgba(91,60,196,0.14)] flex items-center justify-between font-mono text-[11px] text-[#5B5675]">
          <span>
            {isEn
              ? 'Core Web Vitals Score: Optimal'
              : 'Skor Core Web Vitals: Optimal'}
          </span>
          <span className="text-[#6A3FD0] font-semibold">
            {isEn ? 'From IDR 1,200,000' : 'Mulai Rp1.200.000'}
          </span>
        </div>
      </div>
    );
  }

  if (slug === 'software-custom') {
    return (
      <div className="w-full max-w-[460px] mx-auto rounded-[24px] glass-card p-5 md:p-6">
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[rgba(91,60,196,0.14)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#6A3FD0]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#17122B] font-semibold">
              {isEn
                ? 'Integrated Internal System Modules'
                : 'Modul Sistem Internal Terpadu'}
            </span>
          </div>
          <span className="font-mono text-[11px] text-[#6A3FD0] bg-[#EFEAFB] px-2.5 py-0.5 rounded-full font-medium">
            {isEn ? 'Illustration' : 'Ilustrasi'}
          </span>
        </div>

        {/* Modular Blocks Snapping Together */}
        <div className="space-y-2.5">
          <div className="p-3.5 rounded-[16px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-[10px] bg-[#EFEAFB] text-[#6A3FD0] flex items-center justify-center font-mono text-[11px] font-bold">
                M1
              </div>
              <div>
                <p className="text-[13px] font-semibold text-[#17122B]">
                  {isEn
                    ? 'Multi-Role Access Control (RBAC)'
                    : 'Hak Akses Multi-Role (RBAC)'}
                </p>
                <p className="font-mono text-[11px] text-[#5B5675]">
                  {isEn
                    ? 'Owner · Manager · Branch Admin'
                    : 'Owner · Manajer · Admin Cabang'}
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] font-mono text-[10px] text-[#6A3FD0] font-semibold">
              {isEn ? 'Locked' : 'Terkunci'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3.5 rounded-[16px] bg-[#EFEAFB]/65 border border-[#6A3FD0]/30">
              <div className="flex items-center justify-between mb-1.5">
                <Layers size={15} className="text-[#6A3FD0]" />
                <span className="font-mono text-[10px] text-[#6A3FD0] font-semibold">
                  M2 · Database
                </span>
              </div>
              <p className="text-[13px] font-semibold text-[#17122B]">
                {isEn ? 'Centralized PostgreSQL' : 'PostgreSQL Terpusat'}
              </p>
              <p className="text-[11px] text-[#5B5675] mt-0.5">
                {isEn
                  ? 'Input validation & data relations'
                  : 'Validasi input & relasi data'}
              </p>
            </div>

            <div className="p-3.5 rounded-[16px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)]">
              <div className="flex items-center justify-between mb-1.5">
                <FileCheck size={15} className="text-[#6A3FD0]" />
                <span className="font-mono text-[10px] text-[#5B5675] font-semibold">
                  {isEn ? 'M3 · Reports' : 'M3 · Laporan'}
                </span>
              </div>
              <p className="text-[13px] font-semibold text-[#17122B]">
                {isEn ? '1-Click Export' : 'Ekspor 1-Klik'}
              </p>
              <p className="text-[11px] text-[#5B5675] mt-0.5">
                {isEn ? 'Commissions, stock & P&L' : 'Komisi, stok & laba rugi'}
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-[16px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] flex items-center justify-between font-mono text-[11px]">
            <span className="text-[#5B5675]">
              {isEn ? 'Staff Activity Audit Log' : 'Audit Log Aktivitas Staf'}
            </span>
            <span className="text-[#6A3FD0] font-semibold">
              {isEn ? 'Logged in Real-Time' : 'Tercatat Real-Time'}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // otomasi-workflow: nodes with traveling dots
  return (
    <div className="w-full max-w-[460px] mx-auto rounded-[24px] glass-card p-5 md:p-6">
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[rgba(91,60,196,0.14)]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#6A3FD0]" />
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#17122B] font-semibold">
            {isEn
              ? 'Automated Cross-App Data Flow'
              : 'Aliran Data Otomatis Antar-Aplikasi'}
          </span>
        </div>
        <span className="font-mono text-[11px] text-[#6A3FD0] bg-[#EFEAFB] px-2.5 py-0.5 rounded-full font-medium">
          {isEn ? 'Illustration' : 'Ilustrasi'}
        </span>
      </div>

      <div className="p-4 rounded-[18px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)]">
        <svg
          viewBox="0 0 380 170"
          className="w-full h-auto overflow-visible"
          role="img"
          aria-label={
            isEn
              ? 'Illustration of workflow automation nodes with moving data packets'
              : 'Ilustrasi alur node otomasi workflow dengan paket data bergerak'
          }
        >
          {/* Connecting paths */}
          <path
            d="M 85 45 L 190 45 L 190 125 L 295 125"
            fill="none"
            stroke="rgba(91, 60, 196, 0.22)"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <path
            d="M 190 45 L 295 45"
            fill="none"
            stroke="rgba(91, 60, 196, 0.22)"
            strokeWidth="2"
            strokeDasharray="4 4"
          />

          {/* Traveling dots */}
          <circle r="4.5" fill="#6A3FD0">
            <animateMotion
              dur="3.2s"
              repeatCount="indefinite"
              path="M 85 45 L 190 45 L 295 45"
            />
          </circle>
          <circle r="4.5" fill="#7C54E0">
            <animateMotion
              dur="3.2s"
              begin="1.2s"
              repeatCount="indefinite"
              path="M 85 45 L 190 45 L 190 125 L 295 125"
            />
          </circle>

          {/* Node 1: Form / Sheets */}
          <g transform="translate(15, 20)">
            <rect
              width="95"
              height="50"
              rx="12"
              fill="#FFFFFF"
              stroke="rgba(91,60,196,0.2)"
            />
            <text
              x="47.5"
              y="22"
              textAnchor="middle"
              fill="#5B5675"
              fontSize="9"
              fontFamily="JetBrains Mono, monospace"
            >
              TRIGGER
            </text>
            <text
              x="47.5"
              y="37"
              textAnchor="middle"
              fill="#17122B"
              fontSize="11"
              fontWeight="600"
            >
              Form / Sheets
            </text>
          </g>

          {/* Node 2: Webhook / n8n */}
          <g transform="translate(142, 20)">
            <rect
              width="96"
              height="50"
              rx="12"
              fill="#EFEAFB"
              stroke="#6A3FD0"
              strokeWidth="1.5"
            />
            <text
              x="48"
              y="22"
              textAnchor="middle"
              fill="#6A3FD0"
              fontSize="9"
              fontFamily="JetBrains Mono, monospace"
              fontWeight="600"
            >
              ROUTER
            </text>
            <text
              x="48"
              y="37"
              textAnchor="middle"
              fill="#17122B"
              fontSize="11"
              fontWeight="600"
            >
              n8n Webhook
            </text>
          </g>

          {/* Node 3: Database / Invoice */}
          <g transform="translate(270, 20)">
            <rect
              width="95"
              height="50"
              rx="12"
              fill="#FFFFFF"
              stroke="rgba(91,60,196,0.2)"
            />
            <text
              x="47.5"
              y="22"
              textAnchor="middle"
              fill="#5B5675"
              fontSize="9"
              fontFamily="JetBrains Mono, monospace"
            >
              ACTION 1
            </text>
            <text
              x="47.5"
              y="37"
              textAnchor="middle"
              fill="#17122B"
              fontSize="11"
              fontWeight="600"
            >
              {isEn ? 'Create Invoice' : 'Buat Invoice'}
            </text>
          </g>

          {/* Node 4: WhatsApp Alert */}
          <g transform="translate(270, 100)">
            <rect
              width="95"
              height="50"
              rx="12"
              fill="#FFFFFF"
              stroke="rgba(91,60,196,0.2)"
            />
            <text
              x="47.5"
              y="22"
              textAnchor="middle"
              fill="#5B5675"
              fontSize="9"
              fontFamily="JetBrains Mono, monospace"
            >
              ACTION 2
            </text>
            <text
              x="47.5"
              y="37"
              textAnchor="middle"
              fill="#17122B"
              fontSize="11"
              fontWeight="600"
            >
              {isEn ? 'Team WA Alert' : 'Notif WA Tim'}
            </text>
          </g>
        </svg>
      </div>

      <div className="mt-4 pt-3 border-t border-[rgba(91,60,196,0.14)] flex items-center justify-between font-mono text-[11px] text-[#5B5675]">
        <span>
          {isEn
            ? 'Automated two-way synchronization'
            : 'Sinkronisasi dua arah otomatis'}
        </span>
        <span className="text-[#6A3FD0] font-semibold">
          {isEn ? 'Zero Copy-Paste' : 'Bebas Copy-Paste'}
        </span>
      </div>
    </div>
  );
}

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const [activeIndustryTab, setActiveIndustryTab] = useState(0);
  const processLineRef = useRef<SVGLineElement | null>(null);

  const { locale, prefixMode } = parseLocalizedPath(location.pathname);
  const isEn = locale === 'en';

  // Centralized 301 redirect resolution for legacy /layanan, /services, or legacy slugs
  const redirectTarget = resolveRedirectTarget(location.pathname);
  if (redirectTarget && redirectTarget !== location.pathname) {
    return <Navigate to={redirectTarget} replace />;
  }

  const service = getLocalizedService(slug, locale);

  // Reset active tab when slug changes
  useEffect(() => {
    setActiveIndustryTab(0);
  }, [slug]);

  // Animate vertical process line on scroll
  useEffect(() => {
    const cleanup = lineDrawElement(processLineRef.current, 1100);
    return cleanup;
  }, [slug]);

  if (!service) {
    return (
      <div className="min-h-[80vh] bg-[#FFFFFF] text-[#17122B] flex items-center justify-center py-24">
        <SEOMetadata
          title={
            isEn
              ? 'Service Not Found | CHESTAADOTCOM'
              : 'Halaman Layanan Tidak Ditemukan | CHESTAADOTCOM'
          }
          description={
            isEn
              ? 'The service page you requested is not available.'
              : 'Halaman layanan yang kamu cari tidak tersedia.'
          }
          path={location.pathname}
          noindex
        />
        <Container className="text-center max-w-xl space-y-5">
          <Badge variant="tint">
            {isEn ? 'SERVICE NOT FOUND' : 'LAYANAN TIDAK DITEMUKAN'}
          </Badge>
          <h1>
            {isEn
              ? 'The service page you are looking for is not available.'
              : 'Halaman layanan yang kamu cari tidak tersedia.'}
          </h1>
          <p className="text-[15px] text-[#5B5675]">
            {isEn
              ? 'Return to the homepage to explore our website & landing page development, AI agent, custom software, and workflow automation solutions.'
              : 'Silakan kembali ke beranda untuk melihat solusi pembuatan website & landing page, AI agent, software custom, dan otomasi workflow.'}
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Button to={toLocalizedHref('/#layanan', locale, prefixMode)} variant="primary">
              <span>
                {isEn ? 'View Services on Home' : 'Lihat Layanan di Beranda'}
              </span>
              <ArrowRight size={15} />
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  const { prev: rawPrev, next: rawNext } = getAdjacentServices(service.slug);
  const prev = getLocalizedService(rawPrev.slug, locale) || rawPrev;
  const next = getLocalizedService(rawNext.slug, locale) || rawNext;

  const localizedCaseStudiesMap = getLocalizedServiceCaseStudies(locale);
  const relatedCases = service.relatedCaseSlugs
    .map((csSlug) => localizedCaseStudiesMap[csSlug])
    .filter(Boolean)
    .slice(0, 2);

  const relatedPosts = service.relatedPostSlugs
    .map((postSlug) => getBlogPostBySlug(postSlug, locale))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .slice(0, 2);

  const areaPages = getServiceAreasByServiceSlug(service.slug, true).map(
    (ap) => getLocalizedServiceAreaPage(ap.serviceSlug, ap.areaSlug, locale) || ap
  );

  const primaryWaUrl = buildWaUrl(
    isEn
      ? `Hello Chesta & Zeeshan, I am interested in ${service.title} (${location.pathname}) and would like a free consultation.`
      : `Halo Chesta & Zeeshan, saya tertarik dengan layanan ${service.title} (/jasa/${service.slug}) dan ingin konsultasi gratis.`
  );

  const scrollToSection = (id: string) => (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const inPageLinks = isEn
    ? [
        { id: 'cocok-untuk', label: 'Who It Is For' },
        { id: 'deliverables', label: 'What You Get' },
        { id: 'cara-kerja', label: 'How It Works' },
        { id: 'contoh-penggunaan', label: 'Industry Examples' },
        ...(service.slug === 'ai-agent'
          ? [{ id: 'guardrails', label: 'AI Safety' }]
          : []),
        { id: 'harga', label: 'Pricing & Scope' },
        { id: 'faq', label: 'FAQ' },
      ]
    : [
        { id: 'cocok-untuk', label: 'Cocok Untuk' },
        { id: 'deliverables', label: 'Yang Kamu Dapat' },
        { id: 'cara-kerja', label: 'Cara Kerja' },
        { id: 'contoh-penggunaan', label: 'Contoh Industri' },
        ...(service.slug === 'ai-agent'
          ? [{ id: 'guardrails', label: 'Keamanan AI' }]
          : []),
        { id: 'harga', label: 'Harga & Scope' },
        { id: 'faq', label: 'FAQ' },
      ];

  return (
    <div className="bg-[#FFFFFF] text-[#17122B] min-h-screen">
      <SEOMetadata
        title={service.seo.title}
        description={service.seo.description}
        path={location.pathname}
        image={SITE_IMAGES[service.imageKey as keyof typeof SITE_IMAGES]?.src}
      />

      {/* =====================================================
          1. HERO SECTION (WITH SERVICE-SPECIFIC ANIMATED VISUAL)
          ===================================================== */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-b from-[#FFFFFF] via-[#F8F6FE] to-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)] overflow-hidden">
        <Container>
          <Breadcrumb items={[{ label: service.title }]} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="tint">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6A3FD0]" />
                  <span>{service.tagline}</span>
                </Badge>
                <Badge variant="outline">
                  {isEn
                    ? `Timeline: ${service.timeline}`
                    : `Estimasi: ${service.timeline}`}
                </Badge>
              </div>

              <h1>{service.title}</h1>

              <p className="text-[16px] md:text-[18px] font-medium text-[#17122B] leading-[1.5]">
                {service.shortPromise}
              </p>

              <p className="text-[15px] md:text-[16px] text-[#5B5675] leading-[1.65] max-w-2xl">
                {service.summary}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Button href={primaryWaUrl} variant="primary">
                  <MessageCircle size={16} />
                  <span>
                    {isEn
                      ? 'Free consultation via WhatsApp'
                      : 'Konsultasi gratis via WhatsApp'}
                  </span>
                  <ArrowUpRight size={15} />
                </Button>

                <Button
                  href="#cara-kerja"
                  onClick={scrollToSection('cara-kerja')}
                  variant="secondary"
                >
                  <span>{isEn ? 'See how it works' : 'Lihat cara kerja'}</span>
                  <ArrowRight size={15} className="text-[#6A3FD0]" />
                </Button>
              </div>

              <p className="font-mono text-[11px] md:text-[12px] text-[#5B5675]">
                {service.pricingNote.label} ·{' '}
                {isEn
                  ? 'Serving BSD City, South Tangerang & Greater Jakarta'
                  : 'Area layanan BSD City, Tangerang Selatan & Jabodetabek'}
              </p>
            </div>

            <div className="lg:col-span-5">
              <ServiceHeroVisual slug={service.slug} isEn={isEn} />
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          STICKY IN-PAGE SUB-NAVIGATION (DESKTOP)
          ===================================================== */}
      <div className="hidden md:block sticky top-16 z-30 bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[rgba(91,60,196,0.14)]">
        <Container className="py-2.5 flex items-center justify-between gap-4">
          <nav
            aria-label={isEn ? 'Page section navigation' : 'Navigasi bagian halaman'}
            className="flex items-center gap-1 overflow-x-auto"
          >
            {inPageLinks.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={scrollToSection(item.id)}
                className="px-3.5 py-1.5 rounded-full text-[13px] font-medium text-[#5B5675] hover:text-[#6A3FD0] hover:bg-[#F8F6FE] transition-colors whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href={primaryWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em] font-semibold text-[#6A3FD0] hover:underline shrink-0"
          >
            <span>{isEn ? 'Chat on WA' : 'Diskusi via WA'}</span>
            <ArrowUpRight size={13} />
          </a>
        </Container>
      </div>

      {/* =====================================================
          2. "COCOK KALAU KAMU..." LIST (3-5 CONCRETE SITUATIONS)
          ===================================================== */}
      <section
        id="cocok-untuk"
        className="py-16 md:py-24 bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)]"
      >
        <Container>
          <SectionHeading
            eyebrow={isEn ? 'FIT ASSESSMENT' : 'KUALIFIKASI KEBUTUHAN'}
            title={
              isEn
                ? 'Right for you if you are experiencing these situations...'
                : 'Cocok kalau kamu sedang mengalami situasi ini...'
            }
            description={
              isEn
                ? 'Four real-world signs that your business operations are ready for this system.'
                : 'Empat tanda nyata di lapangan bahwa bisnismu sudah membutuhkan sistem ini.'
            }
          />

          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {service.forWho.map((situation, idx) => (
                <Card
                  key={idx}
                  variant="soft"
                  className="h-full flex items-start gap-4"
                >
                  <div className="w-9 h-9 rounded-[12px] bg-[#EFEAFB] text-[#6A3FD0] font-mono text-[12px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    0{idx + 1}
                  </div>
                  <p className="text-[15px] md:text-[16px] text-[#17122B] leading-[1.65]">
                    {situation}
                  </p>
                </Card>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* =====================================================
          3. YANG KAMU DAPAT (DELIVERABLES TWO-COLUMN LIST)
          ===================================================== */}
      <section
        id="deliverables"
        className="py-16 md:py-24 bg-[#F8F6FE] border-b border-[rgba(91,60,196,0.14)] cv-auto"
      >
        <Container>
          <SectionHeading
            eyebrow={isEn ? 'DELIVERABLES SCOPE' : 'CAKUPAN DELIVERABLES'}
            title={
              isEn
                ? 'What you receive upon system handover'
                : 'Yang kamu dapat saat sistem diserahterimakan'
            }
            description={
              isEn
                ? 'Concrete components we assemble, test, and hand over to your team.'
                : 'Komponen nyata yang kami rakit, uji, dan serahkan kepada tim kamu.'
            }
          />

          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {service.deliverables.map((item, idx) => (
                <Card
                  key={item.title}
                  variant="white"
                  className="h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-[rgba(91,60,196,0.14)]">
                      <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold">
                        Deliverable 0{idx + 1}
                      </span>
                      <Check size={16} className="text-[#6A3FD0]" />
                    </div>
                    <h3>{item.title}</h3>
                    <p className="mt-2 text-[14px] md:text-[15px] text-[#5B5675] leading-[1.65]">
                      {item.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* =====================================================
          4. CARA KERJA (VERTICAL LINE THAT DRAWS ON SCROLL, 4 STEPS)
          ===================================================== */}
      <section
        id="cara-kerja"
        className="py-16 md:py-24 bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)] cv-auto"
      >
        <Container>
          <SectionHeading
            eyebrow={isEn ? 'DELIVERY WORKFLOW' : 'ALUR PENGERJAAN'}
            title={
              isEn
                ? 'How we work from audit to live system'
                : 'Cara kerja dari audit sampai sistem aktif'
            }
            description={
              isEn
                ? 'Four structured stages with clear time targets at every step.'
                : 'Empat langkah terstruktur dengan target waktu yang jelas di setiap tahap.'
            }
          />

          <div className="relative max-w-3xl mx-auto pl-8 md:pl-12">
            {/* Vertical SVG Line that draws on scroll */}
            <svg
              aria-hidden="true"
              className="absolute left-3 md:left-4 top-3 bottom-3 w-[4px] h-[calc(100%-24px)] overflow-visible"
            >
              <line
                x1="2"
                y1="0"
                x2="2"
                y2="100%"
                stroke="rgba(91, 60, 196, 0.14)"
                strokeWidth="2"
              />
              <line
                ref={processLineRef}
                x1="2"
                y1="0"
                x2="2"
                y2="100%"
                stroke="#6A3FD0"
                strokeWidth="2.5"
              />
            </svg>

            <div className="space-y-6">
              {service.process.map((step) => (
                <div key={step.num} className="relative">
                  {/* Timeline Node Dot */}
                  <div className="absolute -left-[29px] md:-left-[41px] top-6 w-5 h-5 rounded-full bg-[#FFFFFF] border-2 border-[#6A3FD0] flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-[#6A3FD0]" />
                  </div>

                  <Card variant="soft">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-[rgba(91,60,196,0.14)] font-mono text-[11px] uppercase tracking-[0.08em]">
                      <span className="text-[#6A3FD0] font-semibold">
                        {isEn ? `Stage ${step.num}` : `Tahap ${step.num}`}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] text-[#5B5675]">
                        {step.duration}
                      </span>
                    </div>
                    <h3>{step.title}</h3>
                    <p className="mt-2 text-[14px] md:text-[15px] text-[#5B5675] leading-[1.65]">
                      {step.description}
                    </p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          5. CONTOH PENGGUNAAN (TABS PER INDUSTRY, MARKED "CONTOH")
          ===================================================== */}
      <section
        id="contoh-penggunaan"
        className="py-16 md:py-24 bg-[#F8F6FE] border-b border-[rgba(91,60,196,0.14)] cv-auto"
      >
        <Container>
          <SectionHeading
            eyebrow={isEn ? 'IMPLEMENTATION SCENARIOS' : 'SKENARIO IMPLEMENTASI'}
            title={
              isEn
                ? 'Usage examples across 4 industries'
                : 'Contoh penggunaan di 4 industri'
            }
            description={
              isEn
                ? 'Select the industry closest to your business to inspect an example workflow.'
                : 'Pilih industri yang paling dekat dengan bisnismu untuk melihat contoh alur kerjanya.'
            }
          />

          {/* Industry Tabs */}
          <div
            role="tablist"
            aria-label={isEn ? 'Industry scenario examples' : 'Contoh skenario per industri'}
            className="flex flex-wrap items-center gap-2 mb-8"
          >
            {service.useCases.map((uc, idx) => {
              const isSelected = activeIndustryTab === idx;
              return (
                <button
                  key={uc.industryId}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveIndustryTab(idx)}
                  className={`min-h-[44px] px-5 py-2.5 rounded-full text-[14px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#6A3FD0] text-[#FFFFFF] shadow-[0_8px_20px_-6px_rgba(106,63,208,0.4)]'
                      : 'bg-[#FFFFFF] text-[#5B5675] border border-[rgba(91,60,196,0.14)] hover:text-[#17122B] hover:bg-[#EFEAFB]/50'
                  }`}
                >
                  {uc.industryLabel}
                </button>
              );
            })}
          </div>

          {/* Active Tab Panel */}
          {service.useCases[activeIndustryTab] && (
            <Card variant="white" padding="lg">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-[rgba(91,60,196,0.14)]">
                <div>
                  <Tag>
                    {isEn ? 'INDUSTRY:' : 'INDUSTRI:'}{' '}
                    {service.useCases[activeIndustryTab].industryLabel}
                  </Tag>
                  <h3 className="mt-1 text-[20px] md:text-[22px]">
                    {service.useCases[activeIndustryTab].scenarioTitle}
                  </h3>
                </div>
                <Badge variant="tint">{isEn ? 'Example' : 'Contoh'}</Badge>
              </div>

              <div className="space-y-3">
                {service.useCases[activeIndustryTab].workflowLines.map((line, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-[16px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] flex items-start gap-3.5"
                  >
                    <span className="font-mono text-[11px] font-bold text-[#6A3FD0] bg-[#EFEAFB] px-2.5 py-1 rounded-full shrink-0 mt-0.5">
                      0{i + 1}
                    </span>
                    <p className="text-[14px] md:text-[15px] text-[#17122B] leading-[1.65]">
                      {line}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-[rgba(91,60,196,0.14)] flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-[12px]">
                <span className="text-[#6A3FD0] font-semibold">
                  {isEn ? 'Operational Impact:' : 'Dampak Operasional:'}{' '}
                  {service.useCases[activeIndustryTab].outcome}
                </span>
                <span className="text-[#5B5675]">
                  {isEn ? 'Real workflow illustration' : 'Ilustrasi alur kerja nyata'}
                </span>
              </div>
            </Card>
          )}
        </Container>
      </section>

      {/* =====================================================
          6. FOR AI-AGENT ONLY: GUARDRAILS BLOCK + CHATBOT VS AGENT
          ===================================================== */}
      {service.slug === 'ai-agent' && (
        <section
          id="guardrails"
          className="py-16 md:py-24 bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)] cv-auto"
        >
          <Container className="space-y-16">
            {/* 6A. Guardrails Ledger */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-5 space-y-5">
                <Tag>{isEn ? 'GUARDRAILS & GOVERNANCE' : 'GUARDRAILS & KENDALI'}</Tag>
                <h2>
                  {isEn
                    ? 'Four mandatory safety controls in every AI agent we deploy'
                    : 'Empat pengaman wajib di setiap AI agent yang kami rilis'}
                </h2>
                <p className="text-[15px] md:text-[16px] text-[#5B5675] leading-[1.65]">
                  {isEn
                    ? 'An agent with access to calendars and databases must operate within strict boundaries to protect your business reputation.'
                    : 'Agent yang memiliki akses ke kalender dan database wajib memiliki pagar aturan yang tegas agar aman bagi reputasi bisnismu.'}
                </p>
                <Card variant="soft">
                  <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold">
                    {isEn
                      ? 'Instant Pause Button (Kill-Switch)'
                      : 'Tombol Jeda Instan (Kill-Switch)'}
                  </p>
                  <p className="mt-1.5 text-[14px] text-[#17122B] leading-[1.65]">
                    {isEn
                      ? 'Your admin team can pause the agent for a specific chat number or the entire inbox in one click at any time.'
                      : 'Admin bisnismu dapat menjeda agent pada nomor chat tertentu atau seluruh inbox dalam satu klik kapan saja.'}
                  </p>
                </Card>
              </div>

              <div className="lg:col-span-7">
                <div className="rounded-[24px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] divide-y divide-[rgba(91,60,196,0.14)] overflow-hidden">
                  {(isEn
                    ? [
                        {
                          num: '01',
                          icon: <ShieldCheck size={18} className="text-[#6A3FD0]" />,
                          title: 'Action boundaries (Action Scope)',
                          desc: 'The agent can only invoke functions you explicitly approve (e.g., check schedule & create booking), with zero permission to delete database rows or grant unauthorized discounts.',
                        },
                        {
                          num: '02',
                          icon: <UserCheck size={18} className="text-[#6A3FD0]" />,
                          title: 'Human escalation (Human Handover)',
                          desc: 'Whenever a complaint, custom request, or out-of-SOP question appears, the agent pauses automated replies and forwards a clean summary to your staff.',
                        },
                        {
                          num: '03',
                          icon: <FileCheck size={18} className="text-[#6A3FD0]" />,
                          title: 'Transparent audit logs',
                          desc: 'Every conversation, agent decision rationale, and tool execution is recorded with timestamps for straightforward auditing.',
                        },
                        {
                          num: '04',
                          icon: <Lock size={18} className="text-[#6A3FD0]" />,
                          title: 'Full data ownership',
                          desc: 'Customer databases and chat histories remain under the infrastructure you choose—never locked in or shared with outside parties.',
                        },
                      ]
                    : [
                        {
                          num: '01',
                          icon: <ShieldCheck size={18} className="text-[#6A3FD0]" />,
                          title: 'Batas tindakan (Action Scope)',
                          desc: 'Agent hanya bisa memanggil fungsi yang kamu setujui (misalnya cek jadwal & tambah booking), tanpa izin menghapus database atau memberi diskon di luar tabel resmi.',
                        },
                        {
                          num: '02',
                          icon: <UserCheck size={18} className="text-[#6A3FD0]" />,
                          title: 'Serah ke manusia (Human Handover)',
                          desc: 'Begitu muncul komplain, permintaan khusus, atau pertanyaan di luar SOP, agent menghentikan balasan otomatis dan meneruskan ringkasan ke stafmu.',
                        },
                        {
                          num: '03',
                          icon: <FileCheck size={18} className="text-[#6A3FD0]" />,
                          title: 'Log transparan',
                          desc: 'Seluruh percakapan, alasan keputusan agent, dan eksekusi tool tercatat rapi dengan stempel waktu untuk kemudahan audit.',
                        },
                        {
                          num: '04',
                          icon: <Lock size={18} className="text-[#6A3FD0]" />,
                          title: 'Kepemilikan data penuh',
                          desc: 'Database pelanggan dan riwayat chat berada di bawah kendali infrastruktur yang kamu pilih—tidak dikunci atau dibagikan ke pihak luar.',
                        },
                      ]
                  ).map((row) => (
                    <div
                      key={row.num}
                      className="p-5 md:p-6 flex flex-col sm:flex-row sm:items-start gap-4"
                    >
                      <div className="flex items-center gap-3 sm:w-48 shrink-0">
                        <span className="font-mono text-[11px] text-[#6A3FD0] font-semibold">
                          {row.num}
                        </span>
                        <div className="w-8 h-8 rounded-[10px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] flex items-center justify-center shrink-0">
                          {row.icon}
                        </div>
                        <h3 className="text-[16px] font-semibold text-[#17122B] sm:hidden">
                          {row.title}
                        </h3>
                      </div>
                      <div className="flex-1">
                        <h3 className="hidden sm:block text-[16px] font-semibold text-[#17122B]">
                          {row.title}
                        </h3>
                        <p className="mt-1 text-[14px] md:text-[15px] text-[#5B5675] leading-[1.65]">
                          {row.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 6B. Chatbot vs Agent Split Card */}
            <div>
              <SectionHeading
                align="center"
                eyebrow={isEn ? 'ARCHITECTURE COMPARISON' : 'PERBANDINGAN ARSITEKTUR'}
                title={isEn ? 'Standard Chatbot vs AI Agent' : 'Chatbot biasa vs AI Agent'}
                description={
                  isEn
                    ? 'Why high-transaction businesses need an agent that can use tools rather than a static text responder.'
                    : 'Mengapa bisnis yang sudah punya banyak transaksi membutuhkan agent yang bisa memakai tool, bukan sekadar penjawab teks.'
                }
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch">
                <Card variant="soft" className="h-full flex flex-col justify-between">
                  <div>
                    <Tag className="text-[#5B5675]">
                      {isEn
                        ? 'Legacy Chatbot (Rule-Based / FAQ)'
                        : 'Chatbot Lama (Rule-Based / FAQ)'}
                    </Tag>
                    <h3 className="mt-2">
                      {isEn ? 'Only replies with static text' : 'Hanya membalas teks statis'}
                    </h3>
                    <ul className="mt-5 space-y-3 text-[15px] text-[#5B5675]">
                      <li className="flex items-start gap-3">
                        <span className="font-mono font-semibold shrink-0">—</span>
                        <span>
                          {isEn
                            ? 'Gets confused when customers type free-form or casual sentences.'
                            : 'Bingung saat pelanggan mengetik kalimat bebas atau singkat.'}
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="font-mono font-semibold shrink-0">—</span>
                        <span>
                          {isEn
                            ? 'Does not know whether tomorrow’s 4:00 PM slot is open or booked.'
                            : 'Tidak tahu apakah slot jadwal jam 16.00 besok masih kosong atau penuh.'}
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="font-mono font-semibold shrink-0">—</span>
                        <span>
                          {isEn
                            ? 'Admins still have to copy booking names & times into the calendar manually.'
                            : 'Admin tetap harus menyalin nama & jam booking ke kalender manual.'}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[rgba(91,60,196,0.14)] font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675]">
                    {isEn
                      ? 'Repetitive admin work remains'
                      : 'Pekerjaan berulang staf masih tetap ada'}
                  </div>
                </Card>

                <Card variant="highlighted" className="h-full flex flex-col justify-between">
                  <div>
                    <Tag>
                      {isEn ? 'CHESTAADOTCOM AI Agent' : 'AI Agent CHESTAADOTCOM'}
                    </Tag>
                    <h3 className="mt-2">
                      {isEn
                        ? 'Uses tools & completes tasks'
                        : 'Memakai tool & menuntaskan tugas'}
                    </h3>
                    <ul className="mt-5 space-y-3 text-[15px] text-[#17122B]">
                      <li className="flex items-start gap-3">
                        <Check size={16} className="text-[#6A3FD0] shrink-0 mt-1" />
                        <span>
                          {isEn
                            ? 'Understands natural everyday conversation context.'
                            : 'Memahami konteks percakapan bahasa Indonesia sehari-hari.'}
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check size={16} className="text-[#6A3FD0] shrink-0 mt-1" />
                        <span>
                          {isEn
                            ? 'Checks your live calendar/database before confirming a slot.'
                            : 'Mengecek kalender/database secara langsung sebelum mengiyakan jadwal.'}
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check size={16} className="text-[#6A3FD0] shrink-0 mt-1" />
                        <span>
                          {isEn
                            ? 'Locks the schedule, logs data to CRM, and notifies your team.'
                            : 'Mengunci jadwal, mencatat data ke CRM, dan melapor ke tim kamu.'}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-6 pt-4 border-t border-[rgba(91,60,196,0.14)] font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold">
                    {isEn
                      ? 'Task completed from incoming message to database entry'
                      : 'Tugas tuntas dari pesan masuk sampai tercatat di database'}
                  </div>
                </Card>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* =====================================================
          7. STACK CHIPS + 8. HARGA / SCOPE
          ===================================================== */}
      <section
        id="harga"
        className="py-16 md:py-24 bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)] cv-auto"
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: Confirmed Stack Chips */}
            <Card
              variant="soft"
              padding="lg"
              className="lg:col-span-5 flex flex-col justify-between"
            >
              <div>
                <Tag>{isEn ? 'CONFIRMED TECHNOLOGY' : 'TEKNOLOGI TERKONFIRMASI'}</Tag>
                <h2 className="mt-2 text-[22px] md:text-[26px]">
                  {isEn
                    ? 'Production stack for this service'
                    : 'Stack produksi untuk layanan ini'}
                </h2>
                <p className="mt-2 text-[14px] md:text-[15px] text-[#5B5675] leading-[1.65]">
                  {isEn
                    ? 'We only deploy tool combinations proven in our production environment:'
                    : 'Kami hanya memakai kombinasi tool yang sudah teruji di lingkungan produksi kami:'}
                </p>

                <div className="mt-6 flex flex-wrap gap-2.5">
                  {service.stackChips.map((chip) => (
                    <span
                      key={chip}
                      className="px-4 py-2 rounded-full bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] font-mono text-[12px] font-semibold text-[#17122B]"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              <p className="mt-6 pt-4 border-t border-[rgba(91,60,196,0.14)] font-mono text-[11px] text-[#5B5675]">
                {isEn
                  ? 'Full documentation & credential access handed over at release.'
                  : 'Dokumentasi & akses kredensial penuh diserahkan saat rilis.'}
              </p>
            </Card>

            {/* Right: Pricing & Scope */}
            <Card
              variant="highlighted"
              padding="lg"
              className="lg:col-span-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <Tag>
                    {isEn ? 'PRICING & SCOPE TRANSPARENCY' : 'TRANSPARANSI HARGA & CAKUPAN'}
                  </Tag>
                  <Badge variant="dark">{service.pricingNote.label}</Badge>
                </div>

                <h2 className="text-[24px] md:text-[30px] text-[#17122B]">
                  {service.pricingNote.label}
                </h2>

                <p className="mt-3 text-[15px] md:text-[16px] text-[#17122B] leading-[1.65]">
                  {service.pricingNote.reason}
                </p>

                <p className="mt-2 text-[14px] text-[#5B5675] leading-[1.65]">
                  {service.pricingNote.scopeNote}
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-[14px]">
                  <div className="p-3.5 rounded-[16px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] flex items-center gap-2.5">
                    <Check size={16} className="text-[#6A3FD0] shrink-0" />
                    <span>
                      {isEn
                        ? 'Fixed price agreed upfront before starting'
                        : 'Harga tetap disepakati sebelum mulai'}
                    </span>
                  </div>
                  <div className="p-3.5 rounded-[16px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] flex items-center gap-2.5">
                    <Check size={16} className="text-[#6A3FD0] shrink-0" />
                    <span>
                      {isEn
                        ? '30-day post-release maintenance warranty'
                        : 'Garansi pemeliharaan 30 hari pasca-rilis'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-[rgba(91,60,196,0.14)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675]">
                  {isEn
                    ? `Estimated timeline: ${service.timeline}`
                    : `Estimasi pengerjaan: ${service.timeline}`}
                </span>
                <Button href={primaryWaUrl} variant="primary">
                  <MessageCircle size={15} />
                  <span>
                    {isEn
                      ? 'Request an estimate for your business'
                      : 'Tanyakan estimasi untuk bisnismu'}
                  </span>
                  <ArrowUpRight size={14} />
                </Button>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* =====================================================
          9. FAQ ACCORDION (FEEDING FAQPAGE JSON-LD)
          ===================================================== */}
      <section
        id="faq"
        className="py-16 md:py-24 bg-[#F8F6FE] border-b border-[rgba(91,60,196,0.14)] cv-auto"
      >
        <Container className="max-w-4xl">
          <SectionHeading
            align="center"
            eyebrow={isEn ? 'COMMON QUESTIONS' : 'PERTANYAAN UMUM'}
            title={
              isEn
                ? `FAQs about ${service.shortTitle}`
                : `FAQ seputar ${service.shortTitle}`
            }
            description={
              isEn
                ? 'Straightforward answers to the questions business owners ask before starting a project.'
                : 'Jawaban lugas atas pertanyaan yang paling sering diajukan pemilik bisnis sebelum memulai proyek.'
            }
          />

          <FAQAccordion items={service.faq} />
          <FAQSchema items={service.faq} />
        </Container>
      </section>

      {/* =====================================================
          10. RELATED CASE STUDIES + BLOG POSTS & PREV/NEXT NAV
          ===================================================== */}
      <section className="py-16 md:py-24 bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)] cv-auto">
        <Container className="space-y-16">
          {/* 10A. 2 Related Case Studies */}
          <div>
            <SectionHeading
              eyebrow={isEn ? 'BLUEPRINTS & CASE STUDIES' : 'CETAK BIRU & STUDI KASUS'}
              title={
                isEn
                  ? 'Related field implementations'
                  : 'Implementasi terkait di lapangan'
              }
              description={
                isEn
                  ? 'Solution architecture blueprints relevant to this service.'
                  : 'Gambaran arsitektur solusi yang relevan dengan layanan ini.'
              }
              action={
                <Button
                  to={toLocalizedHref('/portfolio', locale, prefixMode)}
                  variant="secondary"
                >
                  <span>{isEn ? 'View Portfolio' : 'Lihat Portofolio'}</span>
                  <ArrowRight size={15} className="text-[#6A3FD0]" />
                </Button>
              }
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {relatedCases.map((cs) => {
                const imgAsset =
                  SITE_IMAGES[cs.imageKey as keyof typeof SITE_IMAGES] || SITE_IMAGES.ogDefault;
                return (
                  <Card
                    key={cs.slug}
                    as="article"
                    variant="soft"
                    padding="none"
                    className="h-full flex flex-col justify-between overflow-hidden"
                  >
                    <div>
                      <div className="aspect-video bg-[#EFEAFB] border-b border-[rgba(91,60,196,0.14)] overflow-hidden">
                        <ImageWithFallback
                          src={imgAsset.src}
                          alt={imgAsset.alt}
                          width={imgAsset.width}
                          height={imgAsset.height}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 space-y-3">
                        <div className="flex items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-[0.08em]">
                          <span className="text-[#6A3FD0] font-semibold">{cs.sector}</span>
                        </div>
                        <h3>{cs.title}</h3>
                        <p className="text-[14px] text-[#5B5675] leading-[1.6]">
                          <strong className="text-[#17122B] font-medium">
                            {isEn ? 'Bottleneck:' : 'Kendala:'}
                          </strong>{' '}
                          {cs.problem}
                        </p>
                        <p className="text-[14px] text-[#5B5675] leading-[1.6]">
                          <strong className="text-[#17122B] font-medium">
                            {isEn ? 'Solution:' : 'Solusi:'}
                          </strong>{' '}
                          {cs.built}
                        </p>
                      </div>
                    </div>
                    <div className="px-6 py-4 bg-[#FFFFFF] border-t border-[rgba(91,60,196,0.14)] font-mono text-[11px] text-[#6A3FD0]">
                      {cs.resultPlaceholder}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* 10B. 2 Related Blog Posts */}
          {relatedPosts.length > 0 && (
            <div>
              <SectionHeading
                eyebrow={isEn ? 'FURTHER READING' : 'BACAAN LANJUTAN'}
                title={
                  isEn
                    ? 'Practical guides related to this service'
                    : 'Panduan praktis terkait layanan ini'
                }
                description={
                  isEn
                    ? 'In-depth articles written directly for business owners and operations teams.'
                    : 'Artikel mendalam yang ditulis langsung untuk pemilik bisnis dan tim operasional.'
                }
                action={
                  <Button
                    to={toLocalizedHref('/blog', locale, prefixMode)}
                    variant="secondary"
                  >
                    <span>{isEn ? 'All Articles' : 'Semua Artikel'}</span>
                    <ArrowRight size={15} className="text-[#6A3FD0]" />
                  </Button>
                }
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {relatedPosts.map((post) => (
                  <Card
                    key={post.slug}
                    as="article"
                    variant="white"
                    className="h-full flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675] mb-3">
                        <span className="text-[#6A3FD0] font-semibold">{post.category}</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="text-[18px] md:text-[20px]">
                        <Link
                          to={toLocalizedHref(`/blog/${post.slug}`, locale, prefixMode)}
                          className="hover:text-[#6A3FD0] transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h3>
                      <p className="mt-2 text-[14px] md:text-[15px] text-[#5B5675] leading-[1.65] line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[rgba(91,60,196,0.14)] flex items-center justify-between">
                      <span className="font-mono text-[11px] text-[#5B5675]">
                        {isEn ? 'By' : 'Oleh'} {getAuthorProfile(post.author, locale).name}
                      </span>
                      <Link
                        to={toLocalizedHref(`/blog/${post.slug}`, locale, prefixMode)}
                        className="inline-flex items-center gap-1 min-h-[44px] text-[14px] font-semibold text-[#6A3FD0] hover:underline"
                      >
                        <span>{isEn ? 'Read guide' : 'Baca panduan'}</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* 10B-2. Indexable Location Service Pages (/jasa/[service]/[area]) */}
          {areaPages.length > 0 && (
            <div className="pt-8 border-t border-[rgba(91,60,196,0.14)]">
              <div className="mb-6">
                <Tag>{isEn ? 'LOCAL AREA COVERAGE' : 'CAKUPAN AREA LOKAL'}</Tag>
                <h3 className="mt-2 text-[22px] md:text-[26px]">
                  {isEn
                    ? `${service.shortTitle} by area in South Tangerang & surrounding regions`
                    : `Layanan ${service.shortTitle} berdasarkan area di Tangerang Selatan & sekitarnya`}
                </h3>
                <p className="mt-1.5 text-[14px] md:text-[15px] text-[#5B5675]">
                  {isEn
                    ? 'Explore local business scenarios, collaboration workflows from our base in BSD, and dedicated information for your business area:'
                    : 'Pelajari skenario bisnis lokal, alur kerja kolaborasi dari basis kami di BSD, dan informasi khusus untuk area operasional bisnismu:'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                {areaPages.map((areaPage) => (
                  <Link
                    key={`${areaPage.serviceSlug}-${areaPage.areaSlug}`}
                    to={toLocalizedHref(
                      `/jasa/${areaPage.serviceSlug}/${areaPage.areaSlug}`,
                      locale,
                      prefixMode
                    )}
                    className="group p-4 rounded-[18px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] hover:border-[#6A3FD0] hover:bg-[#EFEAFB]/50 transition-all flex flex-col justify-between gap-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold">
                        <MapPin size={12} />
                        <span>{areaPage.areaName}</span>
                      </span>
                      <ArrowRight
                        size={14}
                        className="text-[#5B5675] group-hover:text-[#6A3FD0] group-hover:translate-x-0.5 transition-transform"
                      />
                    </div>
                    <span className="text-[14px] font-semibold text-[#17122B] group-hover:text-[#6A3FD0] leading-snug">
                      {isEn
                        ? `${service.shortTitle} in ${areaPage.areaName}`
                        : `${service.shortTitle} di ${areaPage.areaName}`}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* 10C. Prev / Next Service Navigation */}
          <div className="pt-8 border-t border-[rgba(91,60,196,0.14)] grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to={toLocalizedHref(`/jasa/${prev.slug}`, locale, prefixMode)}
              className="group p-5 rounded-[20px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] hover:border-[#6A3FD0]/50 transition-all flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] flex items-center justify-center text-[#6A3FD0] group-hover:-translate-x-0.5 transition-transform">
                  <ArrowLeft size={16} />
                </div>
                <div>
                  <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675]">
                    {isEn ? 'Previous Service' : 'Layanan Sebelumnya'}
                  </span>
                  <span className="font-semibold text-[15px] text-[#17122B] group-hover:text-[#6A3FD0]">
                    {prev.shortTitle}
                  </span>
                </div>
              </div>
            </Link>

            <Link
              to={toLocalizedHref(`/jasa/${next.slug}`, locale, prefixMode)}
              className="group p-5 rounded-[20px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] hover:border-[#6A3FD0]/50 transition-all flex items-center justify-between gap-4 sm:text-right"
            >
              <div className="flex sm:flex-row-reverse items-center justify-between w-full gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] flex items-center justify-center text-[#6A3FD0] group-hover:translate-x-0.5 transition-transform shrink-0">
                  <ArrowRight size={16} />
                </div>
                <div>
                  <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675]">
                    {isEn ? 'Next Service' : 'Layanan Berikutnya'}
                  </span>
                  <span className="font-semibold text-[15px] text-[#17122B] group-hover:text-[#6A3FD0]">
                    {next.shortTitle}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </Container>
      </section>

      {/* =====================================================
          FINAL CTA BLOCK
          ===================================================== */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#F8F6FE] to-[#EFEAFB] cv-auto">
        <Container className="max-w-[860px]">
          <CTABlock
            title={
              isEn
                ? `Ready to discuss ${service.shortTitle} for your business?`
                : `Siap mendiskusikan ${service.shortTitle} untuk bisnismu?`
            }
            description={
              isEn
                ? 'We start with a casual 30-minute conversation to map your workflow. Free, directly with Chesta & Zeeshan.'
                : 'Kita mulai dari sesi obrolan santai 30 menit untuk membedah alur kerjamu. Gratis, langsung bersama Chesta & Zeeshan.'
            }
            buttonLabel={
              isEn
                ? 'Free consultation via WhatsApp'
                : 'Konsultasi gratis via WhatsApp'
            }
            whatsappMessage={
              isEn
                ? `Hello Chesta & Zeeshan, I just read the ${service.title} page (${location.pathname}) and would like to schedule a free 30-minute audit.`
                : `Halo Chesta & Zeeshan, saya baru membaca halaman ${service.title} (/jasa/${service.slug}) dan ingin jadwalkan audit gratis 30 menit.`
            }
          />
        </Container>
      </section>
    </div>
  );
}
