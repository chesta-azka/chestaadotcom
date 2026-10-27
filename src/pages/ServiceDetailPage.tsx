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
  MapPin,
  BookOpen,
} from 'lucide-react';
import SEOMetadata from '../components/atoms/SEOMetadata';
import FlowIllustration from '../components/atoms/FlowIllustration';
import {
  getAdjacentServices,
  getServicePath,
  getServiceAreaPath,
  ServiceSlug,
} from '../data/services';
import { getServiceAreasByServiceSlug } from '../data/service-areas';
import { getProjectsByServiceSlug } from '../data/projects';
import { getBlogPostBySlug } from '../data/blog-posts';
import { SITE_IMAGES } from '../config/images';
import { lineDrawElement } from '../lib/motion';
import { resolveRedirectTarget } from '../config/redirects';
import { parseLocalizedPath, toLocalizedHref } from '../lib/i18n';
import {
  getLocalizedService,
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
} from '../components/ui/DesignSystem';
import { buildWhatsAppLink, getWhatsAppCtaLabel } from '../lib/whatsapp';
import { trackWaClick } from '../lib/analytics';

/**
 * Service-specific SVG illustration in Hero (1 of 4 depending on slug).
 * Powered by the reusable, data-driven FlowIllustration engine.
 */
function ServiceHeroVisual({
  slug,
  isEn,
}: {
  slug: ServiceSlug;
  isEn: boolean;
}) {
  const variantMap: Record<ServiceSlug, string> = {
    'pembuatan-website': 'website-flow',
    'ai-agent': 'agent-flow',
    'software-custom': 'software-flow',
    'otomasi-workflow': 'workflow-flow',
  };

  return (
    <FlowIllustration
      id={variantMap[slug] || 'workflow-flow'}
      locale={isEn ? 'en' : 'id'}
      className="max-w-[480px] mx-auto"
    />
  );
}









export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const [activeIndustryTab, setActiveIndustryTab] = useState(0);
  const [jsTabsReady, setJsTabsReady] = useState(false);
  const [activeProcessStep, setActiveProcessStep] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const processLineRef = useRef<SVGLineElement | null>(null);
  const stepCardsRef = useRef<Array<HTMLDivElement | null>>([]);

  const { locale, prefixMode } = parseLocalizedPath(location.pathname);
  const isEn = locale === 'en';

  // Centralized 301 redirect resolution
  const redirectTarget = resolveRedirectTarget(location.pathname);
  if (redirectTarget && redirectTarget !== location.pathname) {
    return <Navigate to={redirectTarget} replace />;
  }

  const service = getLocalizedService(slug, locale);

  useEffect(() => {
    setJsTabsReady(true);
  }, []);

  useEffect(() => {
    setActiveIndustryTab(0);
    setActiveProcessStep(0);
  }, [slug]);

  useEffect(() => {
    const cleanup = lineDrawElement(processLineRef.current, 1100);
    return cleanup;
  }, [slug]);

  // Track scrolling of the 4 process steps to highlight corresponding nodes in sticky illustration
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepIndex = Number(entry.target.getAttribute('data-step-index'));
            if (!isNaN(stepIndex)) {
              setActiveProcessStep(stepIndex);
            }
          }
        });
      },
      { rootMargin: '-20% 0px -40% 0px', threshold: 0.25 }
    );

    stepCardsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [slug]);

  if (!service) {
    return (
      <div className="min-h-[80vh] bg-[#FFFFFF] text-[#17122B] flex items-center justify-center py-24">
        <SEOMetadata
          title={
            isEn
              ? 'Service Page Not Found — CHESTAADOTCOM | BSD'
              : 'Halaman Layanan Tidak Ditemukan | CHESTAADOTCOM'
          }
          description={
            isEn
              ? 'The service page you requested is not available. Explore our website development, AI agents, custom software, and workflow automation services.'
              : 'Halaman layanan yang kamu cari tidak tersedia. Lihat layanan pembuatan website, AI agent, software custom, dan otomasi workflow kami.'
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
          <div className="pt-2 flex justify-center gap-3">
            <Button to={toLocalizedHref('/#layanan', locale, prefixMode)} variant="primary">
              <span>{isEn ? 'View Services on Home' : 'Lihat Layanan di Beranda'}</span>
              <ArrowRight size={15} />
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  const { prev: rawPrev, next: rawNext } = getAdjacentServices(service.slug, locale);
  const prev = getLocalizedService(rawPrev.slug, locale) || rawPrev;
  const next = getLocalizedService(rawNext.slug, locale) || rawNext;

  const relatedInternalProjects = getProjectsByServiceSlug(service.slug, locale);

  const relatedPosts = service.relatedPostSlugs
    .map((postSlug) => getBlogPostBySlug(postSlug, locale))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .slice(0, 3);

  const hasLocalAreaPages =
    service.slug === 'pembuatan-website' || service.slug === 'ai-agent';
  const areaPages = hasLocalAreaPages
    ? getServiceAreasByServiceSlug(service.slug, true, locale).map(
        (ap) => getLocalizedServiceAreaPage(ap.serviceSlug, ap.areaSlug, locale) || ap
      )
    : [];

  const primaryWaUrl = buildWhatsAppLink(
    { type: 'service', serviceName: service.title, url: location.pathname },
    locale
  );
  const waCtaLabel = getWhatsAppCtaLabel(locale);

  const scrollToSection = (id: string) => (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTabKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    idx: number
  ) => {
    const count = service.useCases.length;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIdx = (idx + 1) % count;
      setActiveIndustryTab(nextIdx);
      tabRefs.current[nextIdx]?.focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIdx = (idx - 1 + count) % count;
      setActiveIndustryTab(prevIdx);
      tabRefs.current[prevIdx]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActiveIndustryTab(0);
      tabRefs.current[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      setActiveIndustryTab(count - 1);
      tabRefs.current[count - 1]?.focus();
    }
  };

  // Sticky Section Anchor Nav (exact 6 items per Section 3.3)
  const inPageLinks = isEn
    ? [
        { id: 'ringkasan', label: 'Summary' },
        { id: 'yang-kami-bangun', label: 'What we build' },
        { id: 'cara-kerja', label: 'How it works' },
        { id: 'contoh-penggunaan', label: 'Examples' },
        { id: 'harga', label: 'Pricing' },
        { id: 'faq', label: 'FAQ' },
      ]
    : [
        { id: 'ringkasan', label: 'Ringkasan' },
        { id: 'yang-kami-bangun', label: 'Yang kami bangun' },
        { id: 'cara-kerja', label: 'Cara kerja' },
        { id: 'contoh-penggunaan', label: 'Contoh penggunaan' },
        { id: 'harga', label: 'Harga' },
        { id: 'faq', label: 'FAQ' },
      ];

  const guardrailIcons = [
    <ShieldCheck key="g1" size={18} className="text-[#6A3FD0]" />,
    <UserCheck key="g2" size={18} className="text-[#6A3FD0]" />,
    <FileCheck key="g3" size={18} className="text-[#6A3FD0]" />,
    <Lock key="g4" size={18} className="text-[#6A3FD0]" />,
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
          1 & 2. BREADCRUMB + HERO SECTION (WITH RINGKASAN SINGKAT & ILLUSTRATION)
          ===================================================== */}
      <section
        id="ringkasan"
        className="pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-b from-[#FFFFFF] via-[#F8F6FE] to-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)] overflow-hidden"
      >
        <Container>
          <Breadcrumb
            items={[
              {
                label: isEn ? 'Services' : 'Layanan',
                to: toLocalizedHref('/#layanan', locale, prefixMode),
              },
              { label: service.title },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="tint">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6A3FD0]" />
                  <span>{service.eyebrow}</span>
                </Badge>
              </div>

              <h1>{service.h1}</h1>

              {/* Ringkasan singkat (40–60 words direct AEO/GEO answer) */}
              <div className="p-5 rounded-[20px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.16)] border-l-4 border-l-[#6A3FD0]">
                <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold mb-1.5">
                  {isEn ? 'Quick summary' : 'Ringkasan singkat'}
                </p>
                <p className="text-[15px] md:text-[16px] font-medium text-[#17122B] leading-[1.65]">
                  {service.ringkasanSingkat}
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Button
                  href={primaryWaUrl}
                  onClick={() => trackWaClick('service', 'service_hero', locale)}
                  variant="primary"
                >
                  <MessageCircle size={16} />
                  <span>{waCtaLabel}</span>
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
            </div>

            <div className="lg:col-span-5">
              <ServiceHeroVisual slug={service.slug} isEn={isEn} />
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          3. STICKY SECTION ANCHOR NAV (DESKTOP ONLY)
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
            rel="noopener"
            onClick={() => trackWaClick('service', 'service_sticky_bar', locale)}
            className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em] font-semibold text-[#6A3FD0] hover:underline shrink-0"
          >
            <span>{waCtaLabel}</span>
            <ArrowUpRight size={13} />
          </a>
        </Container>
      </div>

      {/* =====================================================
          4 & 5. CEK CEPAT (3-BULLET GLASS BOX, MAX-W 760PX) +
                 SITUASI YANG SERING KAMI TEMUI (5 ITEMS 2-COL CHECKLIST)
          ===================================================== */}
      <section
        id="cocok-untuk"
        className="py-16 md:py-24 bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)]"
      >
        <Container className="space-y-16">
          {/* 4. Cek cepat (max-width 760px) */}
          <div className="max-w-[760px] mx-auto">
            <div className="rounded-[24px] glass-card p-6 md:p-8 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[rgba(91,60,196,0.14)]">
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold">
                  {isEn ? 'Quick check' : 'Cek cepat'}
                </span>
                <Badge variant="tint">{service.pricingNote.label}</Badge>
              </div>
              <ul className="space-y-3.5 text-[15px] text-[#17122B] leading-[1.65]">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#6A3FD0] mt-2 shrink-0" />
                  <span>
                    <strong>{isEn ? 'Right for you if:' : 'Cocok kalau:'}</strong>{' '}
                    {service.bestForSummary}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#6A3FD0] mt-2 shrink-0" />
                  <span>
                    <strong>{isEn ? 'Starts with:' : 'Mulai dari:'}</strong>{' '}
                    {isEn
                      ? 'Free 30-minute audit via WhatsApp or video call'
                      : 'Audit gratis 30 menit via WhatsApp atau video call'}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#6A3FD0] mt-2 shrink-0" />
                  <span>
                    <strong>{isEn ? 'Pricing:' : 'Harga:'}</strong>{' '}
                    {service.pricingNote.label} — {service.pricingNote.reason}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* 5. Situasi yang sering kami temui */}
          <div>
            <SectionHeading
              eyebrow={isEn ? 'COMMON SITUATIONS' : 'SITUASI YANG SERING KAMI TEMUI'}
              title={
                isEn
                  ? 'Right for you if you are in this position'
                  : 'Cocok kalau kamu sedang di posisi ini'
              }
            />

            <Reveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
                {service.forWho.map((situation, idx) => (
                  <Card
                    key={idx}
                    variant="soft"
                    className="h-full flex items-start gap-4"
                  >
                    <div className="w-8 h-8 rounded-[10px] bg-[#EFEAFB] text-[#6A3FD0] flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={16} />
                    </div>
                    <p className="text-[15px] md:text-[16px] text-[#17122B] leading-[1.65]">
                      {situation}
                    </p>
                  </Card>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* =====================================================
          6. YANG KAMI BANGUN (DELIVERABLES — 6 CARDS IN 3x2 GRID)
          ===================================================== */}
      <section
        id="yang-kami-bangun"
        className="py-16 md:py-24 bg-[#F8F6FE] border-b border-[rgba(91,60,196,0.14)] cv-auto"
      >
        <Container>
          <SectionHeading
            eyebrow={isEn ? 'WHAT WE BUILD' : 'YANG KAMI BANGUN'}
            title={isEn ? 'What you get' : 'Yang kamu dapat'}
          />

          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {service.deliverables.map((item, idx) => (
                <Card
                  key={item.title}
                  variant="white"
                  className="h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-[rgba(91,60,196,0.14)]">
                      <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold">
                        0{idx + 1}
                      </span>
                      <Check size={16} className="text-[#6A3FD0]" />
                    </div>
                    <h3 className="text-[18px] font-semibold text-[#17122B]">
                      {item.title}
                    </h3>
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
          7. SERVICE-SPECIFIC COMPARISON OR TRUST BLOCK
          ===================================================== */}
      <section
        id="perbandingan"
        className="py-16 md:py-24 bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)] cv-auto"
      >
        <Container className="space-y-16">
          {/* 7A. Comparison Table (for Website, Software Custom, or Otomasi Workflow) */}
          {service.comparisonTable && (
            <div>
              <SectionHeading
                eyebrow={isEn ? 'COMPARISON' : 'PERBANDINGAN'}
                title={
                  isEn
                    ? 'Landing Page vs Company Profile vs Custom Web'
                    : 'Landing Page vs Company Profile vs Web Custom'
                }
              />

              <div className="overflow-x-auto rounded-[24px] border border-[rgba(91,60,196,0.16)] bg-[#FFFFFF]">
                <table className="w-full text-left border-collapse min-w-[680px]">
                  <thead>
                    <tr className="bg-[#F8F6FE] border-b border-[rgba(91,60,196,0.14)]">
                      {service.comparisonTable.headers.map((header, idx) => {
                        const isLastCol =
                          idx === service.comparisonTable!.headers.length - 1;
                        return (
                          <th
                            key={header}
                            className={`p-4 md:p-5 text-[13px] font-mono uppercase tracking-[0.06em] ${
                              isLastCol
                                ? 'text-[#6A3FD0] font-bold bg-[#EFEAFB]/60'
                                : 'text-[#5B5675] font-semibold'
                            }`}
                          >
                            {header}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[rgba(91,60,196,0.12)] text-[14px] md:text-[15px]">
                    {service.comparisonTable.rows.map((row) => (
                      <tr key={row.feature} className="hover:bg-[#F8F6FE]/50">
                        <td className="p-4 md:p-5 font-semibold text-[#17122B] align-top">
                          {row.feature}
                        </td>
                        <td className="p-4 md:p-5 text-[#5B5675] align-top">
                          {row.landingPage}
                        </td>
                        <td className="p-4 md:p-5 text-[#5B5675] align-top">
                          {row.companyProfile}
                        </td>
                        <td className="p-4 md:p-5 text-[#17122B] font-medium bg-[#EFEAFB]/30 align-top">
                          {row.webCustom}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 7B. AI Agent Specific: Chatbot Biasa vs AI Agent Table + 2x2 Guardrails Grid */}
          {service.chatbotVsAgentTable && (
            <div>
              <SectionHeading
                eyebrow={isEn ? 'COMPARISON' : 'PERBANDINGAN'}
                title={
                  isEn
                    ? 'Standard Chatbot vs AI Agent'
                    : 'Chatbot biasa vs AI agent'
                }
              />

              <div className="overflow-x-auto rounded-[24px] border border-[rgba(91,60,196,0.16)] bg-[#FFFFFF]">
                <table className="w-full text-left border-collapse min-w-[640px]">
                  <thead>
                    <tr className="bg-[#F8F6FE] border-b border-[rgba(91,60,196,0.14)]">
                      <th className="p-4 md:p-5 text-[13px] font-mono uppercase tracking-[0.06em] text-[#5B5675] font-semibold">
                        {service.chatbotVsAgentTable.headers[0]}
                      </th>
                      <th className="p-4 md:p-5 text-[13px] font-mono uppercase tracking-[0.06em] text-[#5B5675] font-semibold">
                        {service.chatbotVsAgentTable.headers[1]}
                      </th>
                      <th className="p-4 md:p-5 text-[13px] font-mono uppercase tracking-[0.06em] text-[#6A3FD0] font-bold bg-[#EFEAFB]/60">
                        {service.chatbotVsAgentTable.headers[2]}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[rgba(91,60,196,0.12)] text-[14px] md:text-[15px]">
                    {service.chatbotVsAgentTable.rows.map((row) => (
                      <tr key={row.aspect} className="hover:bg-[#F8F6FE]/50">
                        <td className="p-4 md:p-5 font-semibold text-[#17122B] align-top">
                          {row.aspect}
                        </td>
                        <td className="p-4 md:p-5 text-[#5B5675] align-top">
                          {row.chatbot}
                        </td>
                        <td className="p-4 md:p-5 text-[#17122B] font-medium bg-[#EFEAFB]/30 align-top">
                          {row.agent}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {service.guardrails && (
            <div id="guardrails">
              <SectionHeading
                eyebrow={isEn ? 'GUARDRAILS & SAFETY' : 'KENDALI & KEAMANAN'}
                title={
                  isEn
                    ? 'Control and safety (Guardrails)'
                    : 'Kendali dan keamanan (Guardrails)'
                }
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {service.guardrails.map((item, idx) => (
                  <Card
                    key={item.title}
                    variant="soft"
                    className="h-full flex flex-col justify-between space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-[12px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] flex items-center justify-center shrink-0">
                        {guardrailIcons[idx % guardrailIcons.length]}
                      </div>
                      <h3 className="text-[18px] font-semibold text-[#17122B]">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-[14px] md:text-[15px] text-[#5B5675] leading-[1.65]">
                      {item.description}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* =====================================================
          8. CARA KERJA (SIDE-BY-SIDE 2-COLUMN LAYOUT WITH STICKY ILLUSTRATION)
          ===================================================== */}
      <section
        id="cara-kerja"
        className="py-16 md:py-24 bg-[#F8F6FE] border-b border-[rgba(91,60,196,0.14)] cv-auto"
      >
        <Container>
          <SectionHeading
            eyebrow={isEn ? 'HOW WE WORK' : 'CARA KERJA'}
            title={isEn ? 'How it works' : 'Cara kerja'}
          />

          {/* Mobile Illustration (stacked above steps) */}
          <div className="block lg:hidden mb-8 max-w-lg mx-auto">
            <FlowIllustration
              id={
                service.slug === 'pembuatan-website'
                  ? 'website-flow'
                  : service.slug === 'ai-agent'
                  ? 'agent-flow'
                  : service.slug === 'software-custom'
                  ? 'software-flow'
                  : 'workflow-flow'
              }
              locale={locale}
              activeStep={activeProcessStep}
              showStepCaption
            />
          </div>

          <div className="lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Desktop Sticky Illustration (Left 5 columns) */}
            <div className="hidden lg:block lg:col-span-5 sticky top-28">
              <FlowIllustration
                id={
                  service.slug === 'pembuatan-website'
                    ? 'website-flow'
                    : service.slug === 'ai-agent'
                    ? 'agent-flow'
                    : service.slug === 'software-custom'
                    ? 'software-flow'
                    : 'workflow-flow'
                }
                locale={locale}
                activeStep={activeProcessStep}
                showStepCaption
              />
            </div>

            {/* Steps (Right 7 columns) */}
            <div className="lg:col-span-7 relative pl-8 md:pl-12">
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
                {service.process.map((step, idx) => (
                  <div
                    key={step.num}
                    data-step-index={idx}
                    ref={(el) => {
                      stepCardsRef.current[idx] = el;
                    }}
                    className="relative"
                  >
                    <div
                      className={`absolute -left-[29px] md:-left-[41px] top-6 w-5 h-5 rounded-full bg-[#FFFFFF] border-2 transition-all duration-200 flex items-center justify-center ${
                        activeProcessStep === idx
                          ? 'border-[#6A3FD0] ring-4 ring-[#6A3FD0]/20'
                          : 'border-[rgba(91,60,196,0.3)]'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full transition-colors ${
                          activeProcessStep === idx ? 'bg-[#6A3FD0]' : 'bg-[rgba(91,60,196,0.35)]'
                        }`}
                      />
                    </div>

                    <Card
                      variant="white"
                      className={`transition-all duration-200 ${
                        activeProcessStep === idx
                          ? 'ring-2 ring-[#6A3FD0] shadow-[0_8px_24px_-6px_rgba(106,63,208,0.12)]'
                          : ''
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-[rgba(91,60,196,0.14)] font-mono text-[11px] uppercase tracking-[0.08em]">
                        <span className="text-[#6A3FD0] font-semibold">
                          {isEn ? `Step ${step.num}` : `Langkah ${step.num}`}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] text-[#5B5675]">
                          {step.duration}
                        </span>
                      </div>
                      <h3 className="text-[18px] font-semibold text-[#17122B]">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-[14px] md:text-[15px] text-[#5B5675] leading-[1.65]">
                        {step.description}
                      </p>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          9. CONTOH PENGGUNAAN DI LAPANGAN (ACCESSIBLE ARIA TABS, STACKED FALLBACK)
          ===================================================== */}
      <section
        id="contoh-penggunaan"
        className="py-16 md:py-24 bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)] cv-auto"
      >
        <Container>
          <SectionHeading
            eyebrow={isEn ? 'EXAMPLE SCENARIOS' : 'CONTOH SKENARIO'}
            title={
              isEn
                ? 'Examples of how it is used in the field'
                : 'Contoh penggunaan di lapangan'
            }
          />

          <div
            role="tablist"
            aria-label={isEn ? 'Example scenarios by industry' : 'Contoh skenario per industri'}
            className="flex flex-wrap items-center gap-2 mb-8"
          >
            {service.useCases.map((uc, idx) => {
              const isSelected = activeIndustryTab === idx;
              const tabId = `tab-${service.slug}-${uc.industryId}`;
              const panelId = `panel-${service.slug}-${uc.industryId}`;
              return (
                <button
                  key={uc.industryId}
                  ref={(el) => {
                    tabRefs.current[idx] = el;
                  }}
                  id={tabId}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={panelId}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setActiveIndustryTab(idx)}
                  onKeyDown={(e) => handleTabKeyDown(e, idx)}
                  className={`min-h-[44px] px-5 py-2.5 rounded-full text-[14px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#6A3FD0] text-[#FFFFFF] shadow-[0_8px_20px_-6px_rgba(106,63,208,0.4)]'
                      : 'bg-[#F8F6FE] text-[#5B5675] border border-[rgba(91,60,196,0.14)] hover:text-[#17122B] hover:bg-[#EFEAFB]/50'
                  }`}
                >
                  {uc.industryLabel}
                </button>
              );
            })}
          </div>

          <div className="space-y-6">
            {service.useCases.map((uc, idx) => {
              const isVisible = !jsTabsReady || activeIndustryTab === idx;
              const tabId = `tab-${service.slug}-${uc.industryId}`;
              const panelId = `panel-${service.slug}-${uc.industryId}`;
              return (
                <div
                  key={uc.industryId}
                  id={panelId}
                  role="tabpanel"
                  aria-labelledby={tabId}
                  hidden={jsTabsReady && activeIndustryTab !== idx}
                  className={isVisible ? 'block' : 'hidden'}
                >
                  <Card variant="soft" padding="lg">
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-[rgba(91,60,196,0.14)]">
                      <div>
                        <Tag>{uc.industryLabel}</Tag>
                        <h3 className="mt-1 text-[20px] md:text-[22px] text-[#17122B]">
                          {uc.scenarioTitle}
                        </h3>
                      </div>
                      <Badge variant="tint">
                        {isEn ? 'Example scenario' : 'Contoh skenario'}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      {uc.workflowLines.map((line, i) => (
                        <p
                          key={i}
                          className="text-[15px] md:text-[16px] text-[#17122B] leading-[1.7]"
                        >
                          {line}
                        </p>
                      ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-[rgba(91,60,196,0.14)] flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-[12px]">
                      <span className="text-[#6A3FD0] font-semibold">
                        {isEn ? 'Design target' : 'Target desain'}: {uc.outcome}
                      </span>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* =====================================================
          10. PRINSIP TEKNIS KAMI + KAPAN TIDAK PERLU
          ===================================================== */}
      <section className="py-16 md:py-24 bg-[#F8F6FE] border-b border-[rgba(91,60,196,0.14)] cv-auto">
        <Container className="space-y-8">
          <SectionHeading
            eyebrow={isEn ? 'TECHNICAL PRINCIPLES' : 'PRINSIP TEKNIS'}
            title={
              isEn
                ? 'Our technical principles'
                : 'Prinsip teknis kami'
            }
          />

          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              <Card
                variant="white"
                className="h-full flex flex-col justify-between space-y-3"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#EFEAFB] text-[#6A3FD0] font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
                    01
                  </span>
                  <h3 className="text-[18px] font-semibold text-[#17122B]">
                    {isEn ? 'Architecture & ownership' : 'Arsitektur & kepemilikan'}
                  </h3>
                </div>
                <p className="text-[14px] md:text-[15px] text-[#5B5675] leading-[1.65]">
                  {service.prinsipTeknis}
                </p>
              </Card>

              <Card
                variant="white"
                className="h-full flex flex-col justify-between space-y-3"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#EFEAFB] text-[#6A3FD0] font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
                    02
                  </span>
                  <h3 className="text-[18px] font-semibold text-[#17122B]">
                    {isEn
                      ? 'When you do not need this service yet'
                      : 'Kapan kamu belum perlu layanan ini'}
                  </h3>
                </div>
                <p className="text-[14px] md:text-[15px] text-[#5B5675] leading-[1.65]">
                  {service.kapanTidakPerlu}
                </p>
              </Card>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* =====================================================
          11. PROYEK INTERNAL TERKAIT (CARDS FROM data/projects WITH "Proyek internal" BADGE)
          ===================================================== */}
      <section className="py-16 md:py-24 bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)] cv-auto">
        <Container>
          <SectionHeading
            eyebrow={isEn ? 'INTERNAL DEMO PROJECTS' : 'PROYEK INTERNAL'}
            title={isEn ? 'Related internal projects' : 'Proyek internal terkait'}
            description={
              isEn
                ? 'Internal CHESTAADOTCOM projects built to demonstrate our system architecture and workflow standards.'
                : 'Proyek internal CHESTAADOTCOM yang kami bangun untuk menunjukkan standar arsitektur dan alur kerja sistem.'
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {relatedInternalProjects.map((proj) => {
              const coverAsset =
                SITE_IMAGES[proj.cover as keyof typeof SITE_IMAGES] ||
                SITE_IMAGES.ogDefault;
              return (
                <Card
                  key={proj.slug}
                  variant="soft"
                  padding="none"
                  className="h-full flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    <div className="relative aspect-[16/10] bg-[#EFEAFB] border-b border-[rgba(91,60,196,0.14)] overflow-hidden">
                      <ImageWithFallback
                        src={coverAsset.src}
                        alt={
                          isEn && coverAsset.altEn
                            ? coverAsset.altEn
                            : coverAsset.alt
                        }
                        width={coverAsset.width}
                        height={coverAsset.height}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <Badge variant="tint">{proj.internalBadgeLabel}</Badge>
                        <Badge variant="outline">
                          {isEn ? 'Illustration' : 'Ilustrasi'}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between gap-2 font-mono text-[11px] text-[#6A3FD0]">
                        <span>{proj.categoryLabel}</span>
                        <span>{proj.year}</span>
                      </div>
                      <h3 className="text-[19px] font-semibold text-[#17122B]">
                        {proj.title}
                      </h3>
                      <p className="text-[14px] text-[#5B5675] leading-[1.6]">
                        {proj.oneLiner}
                      </p>
                      <div className="pt-2">
                        <p className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#6A3FD0] font-semibold">
                          {proj.outcomesLabel}:
                        </p>
                        <p className="text-[13px] text-[#17122B] mt-0.5">
                          {proj.outcomes[0]}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 py-4 bg-[#FFFFFF] border-t border-[rgba(91,60,196,0.14)] flex items-center justify-between">
                    <span className="font-mono text-[11px] text-[#5B5675]">
                      {proj.client}
                    </span>
                    <Link
                      to={toLocalizedHref(
                        `/portfolio/${proj.slug}`,
                        locale,
                        prefixMode
                      )}
                      className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#6A3FD0] hover:underline"
                    >
                      <span>{isEn ? 'View project' : 'Lihat proyek'}</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* =====================================================
          12. HARGA DAN RUANG LINGKUP + SIAPKAN SEBELUM AUDIT GRATIS
          ===================================================== */}
      <section
        id="harga"
        className="py-16 md:py-24 bg-[#F8F6FE] border-b border-[rgba(91,60,196,0.14)] cv-auto"
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <Card
              variant="highlighted"
              padding="lg"
              className="lg:col-span-7 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <Badge variant="tint">{service.pricingNote.label}</Badge>
                <h2 className="text-[24px] md:text-[30px]">
                  {isEn ? 'Pricing and scope' : 'Harga dan ruang lingkup'}
                </h2>
                <div className="space-y-3">
                  <p className="text-[15px] md:text-[16px] text-[#17122B] leading-[1.7]">
                    {service.hargaDanScope}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[rgba(91,60,196,0.14)] flex flex-wrap items-center justify-between gap-4">
                <Button href={primaryWaUrl} variant="primary">
                  <MessageCircle size={16} />
                  <span>
                    {isEn
                      ? 'Start with a free 30-minute audit'
                      : 'Mulai dari audit gratis 30 menit'}
                  </span>
                  <ArrowUpRight size={15} />
                </Button>
                <span className="font-mono text-[12px] text-[#5B5675]">
                  {isEn ? 'Free 30-minute audit' : 'Audit gratis 30 menit'}
                </span>
              </div>
            </Card>

            <Card
              variant="white"
              padding="lg"
              className="lg:col-span-5 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <Tag>
                  {isEn ? '30-MINUTE FREE AUDIT PREP' : 'PERSIAPAN AUDIT GRATIS'}
                </Tag>
                <h3 className="text-[20px] font-semibold text-[#17122B]">
                  {isEn
                    ? 'Prepare before the free audit'
                    : 'Siapkan sebelum audit gratis'}
                </h3>
                <ul className="space-y-3">
                  {service.siapkanSebelumAudit.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-[14px] md:text-[15px] text-[#5B5675] leading-[1.6]"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#EFEAFB] text-[#6A3FD0] font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* =====================================================
          13. FAQ ACCORDION (MIRRORED 1:1 INTO FAQPage JSON-LD)
          ===================================================== */}
      <section
        id="faq"
        className="py-16 md:py-24 bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)] cv-auto"
      >
        <Container className="max-w-4xl">
          <SectionHeading
            align="center"
            eyebrow="FAQ"
            title={
              isEn
                ? `Frequently asked questions about ${service.shortTitle.toLowerCase()}`
                : `Pertanyaan yang sering ditanyakan seputar ${service.shortTitle.toLowerCase()}`
            }
          />
          <FAQAccordion items={service.faq} />
        </Container>
      </section>

      {/* =====================================================
          14. AREA LAYANAN (FOR PEMBUATAN-WEBSITE AND AI-AGENT ONLY)
          ===================================================== */}
      {hasLocalAreaPages && areaPages.length > 0 && (
        <section className="py-16 md:py-20 bg-[#F8F6FE] border-b border-[rgba(91,60,196,0.14)] cv-auto">
          <Container className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <Tag>{isEn ? 'SERVICE AREAS' : 'AREA LAYANAN'}</Tag>
                <h2 className="mt-2 text-[22px] md:text-[28px]">
                  {isEn
                    ? `${service.title} by area`
                    : `${service.title} per area layanan`}
                </h2>
                <p className="mt-1 text-[14px] md:text-[15px] text-[#5B5675]">
                  {isEn
                    ? 'Based in BSD, South Tangerang, serving businesses across South Tangerang and South Jakarta.'
                    : 'Berbasis di BSD, Tangerang Selatan, melayani bisnis di Tangerang Selatan dan Jakarta Selatan.'}
                </p>
              </div>
              <Link
                to={isEn ? '/en/areas' : '/id/area'}
                className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#6A3FD0] hover:underline"
              >
                <span>
                  {isEn ? 'View all service areas' : 'Lihat semua area layanan'}
                </span>
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              {areaPages.map((ap) => {
                const areaHref = getServiceAreaPath(
                  ap.serviceSlug,
                  ap.areaSlug,
                  locale
                );
                const anchorText = isEn
                  ? `${
                      ap.serviceSlug === 'pembuatan-website'
                        ? 'Website development'
                        : 'AI agent services'
                    } in ${ap.areaName}`
                  : `Jasa ${
                      ap.serviceSlug === 'pembuatan-website'
                        ? 'pembuatan website'
                        : 'AI agent'
                    } di ${ap.areaName}`;
                return (
                  <Link
                    key={`${ap.serviceSlug}-${ap.areaSlug}`}
                    to={areaHref}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FFFFFF] border border-[rgba(91,60,196,0.16)] text-[14px] font-medium text-[#17122B] hover:border-[#6A3FD0] hover:text-[#6A3FD0] transition-colors"
                  >
                    <MapPin size={14} className="text-[#6A3FD0]" />
                    <span>{anchorText}</span>
                  </Link>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {/* =====================================================
          15. BACAAN TERKAIT DARI BLOG + PREV/NEXT SERVICE + FINAL CTA
          ===================================================== */}
      <section className="py-16 md:py-24 bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)] cv-auto">
        <Container className="space-y-16">
          {relatedPosts.length > 0 && (
            <div>
              <SectionHeading
                eyebrow={isEn ? 'RELATED READING' : 'BACAAN TERKAIT DARI BLOG'}
                title={
                  isEn
                    ? 'Practical guides related to this service'
                    : 'Panduan praktis terkait layanan ini'
                }
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((post) => (
                  <Card
                    key={post.slug}
                    variant="soft"
                    className="flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 font-mono text-[11px] text-[#6A3FD0]">
                        <BookOpen size={14} />
                        <span>{post.category}</span>
                        <span>·</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="text-[18px] font-semibold text-[#17122B]">
                        {post.title}
                      </h3>
                      <p className="text-[14px] text-[#5B5675] leading-[1.6]">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-[rgba(91,60,196,0.14)]">
                      <Link
                        to={toLocalizedHref(
                          `/blog/${post.slug}`,
                          locale,
                          prefixMode
                        )}
                        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#6A3FD0] hover:underline"
                      >
                        <span>{isEn ? 'Read article' : 'Baca artikel'}</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Prev / Next Service Navigation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[rgba(91,60,196,0.14)]">
            <Link
              to={getServicePath(prev.slug, locale)}
              className="p-5 rounded-[20px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] hover:border-[#6A3FD0] transition-colors flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <ArrowLeft size={18} className="text-[#6A3FD0] shrink-0" />
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#5B5675]">
                    {isEn ? 'Previous service' : 'Layanan sebelumnya'}
                  </span>
                  <p className="text-[15px] font-semibold text-[#17122B]">
                    {prev.title}
                  </p>
                </div>
              </div>
            </Link>

            <Link
              to={getServicePath(next.slug, locale)}
              className="p-5 rounded-[20px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] hover:border-[#6A3FD0] transition-colors flex items-center justify-between gap-4 text-right"
            >
              <div className="ml-auto flex items-center gap-3">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#5B5675]">
                    {isEn ? 'Next service' : 'Layanan berikutnya'}
                  </span>
                  <p className="text-[15px] font-semibold text-[#17122B]">
                    {next.title}
                  </p>
                </div>
                <ArrowRight size={18} className="text-[#6A3FD0] shrink-0" />
              </div>
            </Link>
          </div>
        </Container>
      </section>

      {/* Final CTA Block */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#F8F6FE] to-[#EFEAFB] cv-auto">
        <Container className="max-w-[860px]">
          <CTABlock
            title={
              isEn
                ? 'Want to discuss your workflow first?'
                : 'Mau ngobrol dulu soal alur kerjamu?'
            }
            description={
              isEn
                ? 'We start with a free 30-minute audit via WhatsApp or video call. You get an honest recommendation, scope, and estimate before deciding.'
                : 'Kami mulai dari audit gratis 30 menit via WhatsApp atau video call. Kamu dapat gambaran jujur tentang solusi, ruang lingkup, dan estimasi sebelum memutuskan.'
            }
            whatsappContext={{
              type: 'service',
              serviceName: service.title,
              url: location.pathname,
            }}
          />
        </Container>
      </section>
    </div>
  );
}
