import React from 'react';
import { Link, useParams, Navigate, useLocation } from 'react-router-dom';
import {
  MapPin,
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Layers,
  Sparkles,
} from 'lucide-react';
import SEOMetadata from '../components/atoms/SEOMetadata';
import { getRouteOgPngPath } from '../lib/cover-generator';
import {
  resolveUnifiedAreaPage,
  getUnifiedAreaPath,
  getServiceAreasByAreaSlug,
} from '../data/service-areas';
import { getAllServices, getServicePath, getServiceAreaPath } from '../data/services';
import { getPublishedProjects } from '../data/projects';
import {
  REAL_PROJECTS_EXPERIENCE,
  getRealProjectHref,
  REAL_PROJECT_BADGE_ID,
  REAL_PROJECT_BADGE_EN,
} from '../data/experience';
import {
  SAMPLE_PROJECT_BADGE_ID,
  SAMPLE_PROJECT_BADGE_EN,
  SAMPLE_PROJECT_DISCLOSURE_ID,
  SAMPLE_PROJECT_DISCLOSURE_EN,
} from '../data/projects';
import { resolveRedirectTarget } from '../config/redirects';
import { parseLocalizedPath, toLocalizedHref } from '../lib/i18n';
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
} from '../components/ui/DesignSystem';
import {
  buildWhatsAppLink,
  getWhatsAppCtaLabel,
  type WhatsAppContext,
} from '../lib/whatsapp';
import { trackWaClick } from '../lib/analytics';

export default function AreaDetailPage() {
  const { areaSlug } = useParams<{ areaSlug: string }>();
  const location = useLocation();
  const { locale, prefixMode } = parseLocalizedPath(location.pathname);
  const isEn = locale === 'en';

  // Centralized 301 redirect resolution (handles legacy aliases and cross-locale prefix)
  const redirectTarget = resolveRedirectTarget(location.pathname);
  if (redirectTarget && redirectTarget !== location.pathname) {
    return <Navigate to={redirectTarget} replace />;
  }

  const normalizedSlug = (areaSlug || '').toLowerCase().trim();
  const areaPage = resolveUnifiedAreaPage(normalizedSlug, locale);

  if (!areaPage) {
    return (
      <div className="min-h-[80vh] bg-[#FFFFFF] text-[#17122B] flex items-center justify-center py-24">
        <SEOMetadata
          title={
            isEn
              ? 'Service Area Not Found | CHESTAADOTCOM'
              : 'Halaman Area Tidak Ditemukan | CHESTAADOTCOM'
          }
          description={
            isEn
              ? 'The service area page you requested is not available. View all service areas across South Tangerang, Tangerang, Depok, and South Jakarta.'
              : 'Halaman area layanan yang kamu tuju tidak tersedia. Lihat daftar area layanan kami di Tangerang Selatan, Tangerang, Depok, dan Jakarta Selatan.'
          }
          path={location.pathname}
          noindex
        />
        <Container className="text-center max-w-xl space-y-5">
          <Badge variant="tint">
            {isEn ? 'AREA NOT FOUND' : 'AREA TIDAK DITEMUKAN'}
          </Badge>
          <h1>
            {isEn
              ? 'The service area page you are looking for is not available.'
              : 'Halaman area layanan yang kamu cari tidak tersedia.'}
          </h1>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Button to={isEn ? '/en/areas' : '/id/area'} variant="primary">
              <span>{isEn ? 'All Service Areas' : 'Semua Area Layanan'}</span>
              <ArrowRight size={15} />
            </Button>
            <Button to={toLocalizedHref('/', locale, prefixMode)} variant="secondary">
              <span>{isEn ? 'Back to Home' : 'Kembali ke Beranda'}</span>
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  const allServices = getAllServices(locale);
  const serviceAreaPages = areaPage.hasServiceAreaPages
    ? getServiceAreasByAreaSlug(areaPage.slug, true, locale)
    : [];

  // Nearby areas: only link to indexable unified area pages
  const nearbyAreaPages = areaPage.nearbySlugs
    .map((slug) => resolveUnifiedAreaPage(slug, locale))
    .filter((p): p is NonNullable<typeof p> => Boolean(p && p.indexable))
    .slice(0, 5);

  const sampleProjects = getPublishedProjects(locale).slice(0, 2);

  const waContext: WhatsAppContext = {
    type: 'area',
    serviceName: isEn
      ? 'Website, AI Agent & Software'
      : 'Website, AI Agent, dan Software',
    areaName: areaPage.name,
    url: location.pathname,
  };
  const waUrl = buildWhatsAppLink(waContext, locale);
  const waCtaLabel = getWhatsAppCtaLabel(locale);

  const ogCoverPath = getRouteOgPngPath(
    locale === 'en'
      ? `/en/areas/${areaPage.slug}`
      : `/id/area/${areaPage.slug}`,
  );

  const serviceIntroParagraphs = areaPage.servicesIntro
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="bg-[#FFFFFF] text-[#17122B] min-h-screen">
      <SEOMetadata
        title={areaPage.metaTitle}
        description={areaPage.metaDescription}
        path={location.pathname}
        image={ogCoverPath}
        noindex={!areaPage.indexable}
      />

      {/* =====================================================
          1, 2 & 3. BREADCRUMB + H1 + RINGKASAN SINGKAT + CTAs
          ===================================================== */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 bg-gradient-to-b from-[#FFFFFF] via-[#F8F6FE] to-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)]">
        <Container>
          <Breadcrumb
            items={[
              {
                label: isEn ? 'Areas' : 'Area',
                to: isEn ? '/en/areas' : '/id/area',
              },
              { label: areaPage.name },
            ]}
          />

          <div className="max-w-4xl space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="tint">
                <MapPin size={13} className="text-[#6A3FD0]" />
                <span>{areaPage.regionLabel}</span>
              </Badge>
              {!areaPage.indexable && (
                <Badge variant="outline">
                  {isEn
                    ? `Scheduled Wave ${areaPage.wave} (${areaPage.publishAt}) · Noindex`
                    : `Gelombang Terjadwal ${areaPage.wave} (${areaPage.publishAt}) · Noindex`}
                </Badge>
              )}
            </div>

            <h1>{areaPage.h1}</h1>

            <p className="text-[15px] text-[#5B5675] leading-[1.65]">
              {areaPage.factsSummary}
            </p>

            {/* Ringkasan singkat (40-60 words) */}
            <Card
              variant="highlighted"
              padding="default"
              className="border-l-4 border-l-[#6A3FD0]"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold">
                  {isEn ? 'Quick summary' : 'Ringkasan singkat'}
                </span>
                <span className="font-mono text-[11px] text-[#5B5675]">
                  {isEn ? 'Websites from IDR 1,200,000' : 'Website mulai Rp1.200.000'}
                </span>
              </div>
              <p className="text-[15px] md:text-[16px] text-[#17122B] leading-[1.68] font-medium">
                {areaPage.quickSummary}
              </p>
            </Card>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                href={waUrl}
                variant="primary"
                onClick={() => trackWaClick(`area_hero_${areaPage.slug}`)}
              >
                <span>{waCtaLabel}</span>
                <ArrowUpRight size={16} />
              </Button>
              <Button to="#layanan-area" variant="secondary">
                <span>
                  {isEn
                    ? `Services in ${areaPage.name}`
                    : `Layanan di ${areaPage.name}`}
                </span>
                <ArrowRight size={15} />
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          4. CEK CEPAT BOX (3 bullets)
          ===================================================== */}
      <section className="py-14 bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)]">
        <Container>
          <Reveal>
            <Card variant="tint" padding="lg">
              <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b border-[rgba(91,60,196,0.14)]">
                <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold">
                  {isEn ? 'Quick check' : 'Cek cepat'}
                </span>
                <Tag>{areaPage.name}</Tag>
              </div>

              <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <li className="bg-[#FFFFFF] rounded-[12px] p-5 border border-[rgba(91,60,196,0.14)]">
                  <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold mb-2">
                    {isEn ? 'Suitable if' : 'Cocok kalau'}
                  </div>
                  <p className="text-[14px] text-[#17122B] leading-[1.65]">
                    {areaPage.cekCepat.cocokKalau}
                  </p>
                </li>

                <li className="bg-[#FFFFFF] rounded-[12px] p-5 border border-[rgba(91,60,196,0.14)]">
                  <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold mb-2">
                    {isEn ? 'Starts from' : 'Mulai dari'}
                  </div>
                  <p className="text-[14px] text-[#17122B] leading-[1.65]">
                    {areaPage.cekCepat.mulaiDari}
                  </p>
                </li>

                <li className="bg-[#FFFFFF] rounded-[12px] p-5 border border-[rgba(91,60,196,0.14)]">
                  <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold mb-2">
                    {isEn ? 'Starting price' : 'Estimasi harga'}
                  </div>
                  <p className="text-[14px] text-[#17122B] leading-[1.65]">
                    {areaPage.cekCepat.harga}
                  </p>
                </li>
              </ul>
            </Card>
          </Reveal>
        </Container>
      </section>

      {/* =====================================================
          5. KENAPA BISNIS DI {AREA} BUTUH INI
          ===================================================== */}
      <section className="py-16 md:py-24 bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 space-y-5">
              <SectionHeading
                eyebrow={isEn ? 'LOCAL CONTEXT' : 'KONTEKS WILAYAH'}
                title={areaPage.whyNeedHeading}
              />
              <div className="space-y-4">
                {areaPage.whyNeedParagraphs.map((para, idx) => (
                  <p
                    key={idx}
                    className="text-[16px] text-[#5B5675] leading-[1.75]"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <Card variant="white" padding="lg" className="space-y-4">
                <div className="flex items-center gap-2 text-[#6A3FD0] font-mono text-[11px] uppercase tracking-[0.08em] font-semibold">
                  <Building2 size={15} />
                  <span>
                    {isEn
                      ? `Typical business types in ${areaPage.name}`
                      : `Karakter usaha yang umumnya ada di ${areaPage.name}`}
                  </span>
                </div>
                <ul className="space-y-3 pt-1">
                  {areaPage.typicalBusinessMix.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-[14px] text-[#17122B] leading-[1.6]"
                    >
                      <CheckCircle2
                        size={16}
                        className="text-[#6A3FD0] shrink-0 mt-0.5"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          6. EMPAT CONTOH SKENARIO (ONE PER SERVICE)
          ===================================================== */}
      <section className="py-16 md:py-24 bg-[#F8F6FE] border-b border-[rgba(91,60,196,0.14)]">
        <Container>
          <SectionHeading
            eyebrow={isEn ? 'EXAMPLE SCENARIOS' : 'CONTOH SKENARIO'}
            title={
              isEn
                ? `Example scenarios for businesses in ${areaPage.name}`
                : `Contoh skenario penerapan di ${areaPage.name}`
            }
            description={
              isEn
                ? `Four practical use cases across website development, AI agents, custom software, and workflow automation tailored to the business mix in ${areaPage.name}.`
                : `Empat gambaran penerapan pembuatan website, AI agent, software custom, dan otomasi workflow untuk karakter usaha di ${areaPage.name}.`
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {areaPage.scenarios.map((scenario, idx) => {
              const serviceHref = getServicePath(scenario.serviceSlug, locale);
              return (
                <Reveal key={scenario.serviceSlug} delay={idx * 0.05}>
                  <Card
                    variant="white"
                    padding="lg"
                    className="h-full flex flex-col justify-between bg-[#FFFFFF]"
                  >
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <Badge variant="tint">{scenario.serviceLabel}</Badge>
                        <span className="font-mono text-[11px] text-[#5B5675]">
                          {scenario.businessType}
                        </span>
                      </div>
                      <h3 className="text-[19px] font-bold text-[#17122B] leading-[1.35]">
                        {scenario.title}
                      </h3>
                      <p className="text-[15px] text-[#5B5675] leading-[1.7]">
                        {scenario.narrative}
                      </p>
                    </div>

                    <div className="pt-5 mt-5 border-t border-[rgba(91,60,196,0.12)] flex items-center justify-between">
                      <Link
                        to={serviceHref}
                        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#6A3FD0] hover:text-[#5630B0]"
                      >
                        <span>
                          {isEn
                            ? `Explore ${scenario.serviceLabel}`
                            : `Lihat layanan ${scenario.serviceLabel}`}
                        </span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* =====================================================
          7. CARA KAMI BEKERJA DENGAN KLIEN DI {AREA}
          ===================================================== */}
      <section className="py-16 md:py-24 bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)]">
        <Container>
          <div className="max-w-3xl mb-10 space-y-4">
            <SectionHeading
              eyebrow={isEn ? 'HOW WE WORK' : 'CARA KERJA'}
              title={areaPage.howWeWorkHeading}
            />
            {areaPage.howWeWorkParagraphs.map((para, idx) => (
              <p
                key={idx}
                className="text-[16px] text-[#5B5675] leading-[1.72]"
              >
                {para}
              </p>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {areaPage.processSteps.map((step, idx) => (
              <Reveal key={step.stepNumber} delay={idx * 0.05}>
                <Card variant="tint" padding="default" className="h-full">
                  <div className="w-8 h-8 rounded-[8px] bg-[#6A3FD0] text-[#FFFFFF] font-mono text-[13px] font-bold flex items-center justify-center mb-4">
                    {step.stepNumber}
                  </div>
                  <h3 className="text-[17px] font-bold text-[#17122B] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[14px] text-[#5B5675] leading-[1.65]">
                    {step.sentence}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* =====================================================
          8. LAYANAN DI {AREA} + RELATED PROJECTS
          ===================================================== */}
      <section
        id="layanan-area"
        className="py-16 md:py-24 bg-[#F8F6FE] border-b border-[rgba(91,60,196,0.14)]"
      >
        <Container>
          <SectionHeading
            eyebrow={isEn ? 'SERVICES & PORTFOLIO' : 'LAYANAN & PORTOFOLIO'}
            title={
              isEn
                ? `Services in ${areaPage.name}`
                : `Layanan di ${areaPage.name}`
            }
          />

          <div className="max-w-4xl space-y-4 mb-10">
            {serviceIntroParagraphs.map((para, idx) => (
              <p
                key={idx}
                className="text-[15px] md:text-[16px] text-[#5B5675] leading-[1.72]"
              >
                {para}
              </p>
            ))}
          </div>

          {/* 4 Main Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {allServices.map((svc) => {
              const svcHref = getServicePath(svc.slug, locale);
              const matchingServiceArea = serviceAreaPages.find(
                (p) => p.serviceSlug === svc.slug,
              );
              const specificHref = matchingServiceArea
                ? getServiceAreaPath(svc.slug, areaPage.slug, locale)
                : null;

              return (
                <Card
                  key={svc.slug}
                  variant="white"
                  padding="lg"
                  className="bg-[#FFFFFF] flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <Tag>
                        {svc.pricingNote?.label ||
                          (isEn ? 'From IDR 1,200,000' : 'Mulai Rp1.200.000')}
                      </Tag>
                      <span className="font-mono text-[11px] text-[#5B5675]">
                        {svc.timeline}
                      </span>
                    </div>
                    <h3 className="text-[19px] font-bold text-[#17122B]">
                      {svc.title}
                    </h3>
                    <p className="text-[14px] text-[#5B5675] leading-[1.65]">
                      {svc.summary || svc.tagline}
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-[rgba(91,60,196,0.12)] flex flex-wrap items-center gap-4">
                    <Link
                      to={svcHref}
                      className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#6A3FD0] hover:text-[#5630B0]"
                    >
                      <span>
                        {isEn
                          ? `${svc.title} details`
                          : `Detail ${svc.title}`}
                      </span>
                      <ArrowRight size={14} />
                    </Link>

                    {specificHref && (
                      <Link
                        to={specificHref}
                        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#17122B] hover:text-[#6A3FD0]"
                      >
                        <Sparkles size={13} className="text-[#6A3FD0]" />
                        <span>
                          {isEn
                            ? `${svc.title} in ${areaPage.name}`
                            : `${svc.title} di ${areaPage.name}`}
                        </span>
                        <ArrowRight size={13} />
                      </Link>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Related Real & Sample Projects */}
          <div className="pt-6 border-t border-[rgba(91,60,196,0.14)]">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div>
                <h3 className="text-[19px] font-bold text-[#17122B]">
                  {isEn
                    ? 'Real project experience & workflow samples'
                    : 'Pengalaman proyek nyata & contoh proyek'}
                </h3>
                <p className="text-[14px] text-[#5B5675]">
                  {isEn
                    ? 'See our real software experience (client kept confidential) alongside sample projects built to demonstrate our workflow.'
                    : 'Lihat pengalaman proyek nyata kami (klien dirahasiakan) serta contoh proyek yang dirancang untuk memperlihatkan alur kerja kami.'}
                </p>
              </div>
              <Link
                to={toLocalizedHref('/portfolio', locale, prefixMode)}
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#6A3FD0] hover:text-[#5630B0]"
              >
                <span>{isEn ? 'View All Projects' : 'Lihat Semua Proyek'}</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* First: Real project from data/experience */}
              {REAL_PROJECTS_EXPERIENCE.slice(0, 1).map((realProj) => (
                <Card
                  key={realProj.id}
                  variant="white"
                  padding="default"
                  className="bg-[#FFFFFF] flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <Badge variant="tint">
                      {isEn ? REAL_PROJECT_BADGE_EN : REAL_PROJECT_BADGE_ID}
                    </Badge>
                    <h4 className="text-[16px] font-bold text-[#17122B]">
                      {isEn ? realProj.titleEn : realProj.titleId}
                    </h4>
                    <p className="text-[13.5px] text-[#5B5675] leading-[1.6]">
                      {isEn ? realProj.oneLinerEn : realProj.oneLinerId}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-[rgba(91,60,196,0.12)]">
                    <Link
                      to={getRealProjectHref(realProj, locale)}
                      className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#6A3FD0] hover:text-[#5630B0]"
                    >
                      <span>{isEn ? 'Read real project' : 'Lihat proyek nyata'}</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </Card>
              ))}

              {/* Sample projects with mandatory badge & disclosure */}
              {sampleProjects.map((sample) => (
                <Card
                  key={sample.slug}
                  variant="white"
                  padding="default"
                  className="bg-[#FFFFFF] flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <Badge variant="outline">
                      {isEn ? SAMPLE_PROJECT_BADGE_EN : SAMPLE_PROJECT_BADGE_ID}
                    </Badge>
                    <h4 className="text-[16px] font-bold text-[#17122B]">
                      {sample.title}
                    </h4>
                    <p className="text-[13.5px] text-[#5B5675] leading-[1.6]">
                      {sample.oneLiner}
                    </p>
                    <p className="text-[12px] text-[#5B5675] italic pt-1">
                      {isEn
                        ? SAMPLE_PROJECT_DISCLOSURE_EN
                        : SAMPLE_PROJECT_DISCLOSURE_ID}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-[rgba(91,60,196,0.12)]">
                    <Link
                      to={toLocalizedHref(`/portfolio/${sample.slug}`, locale, prefixMode)}
                      className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#6A3FD0] hover:text-[#5630B0]"
                    >
                      <span>{isEn ? 'View sample project' : 'Lihat contoh proyek'}</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          9. 3 FAQ UNIQUE TO THE AREA
          ===================================================== */}
      <section className="py-16 md:py-24 bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)]">
        <Container className="max-w-4xl">
          <SectionHeading
            eyebrow="FAQ"
            title={
              isEn
                ? `Frequently asked questions in ${areaPage.name}`
                : `Pertanyaan umum seputar layanan di ${areaPage.name}`
            }
          />
          <FAQAccordion items={areaPage.faqs} />
        </Container>
      </section>

      {/* =====================================================
          10. AREA TERDEKAT (3-5 LINKS BY NEARBY MAP)
          ===================================================== */}
      {nearbyAreaPages.length > 0 && (
        <section className="py-16 bg-[#F8F6FE] border-b border-[rgba(91,60,196,0.14)]">
          <Container>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold mb-1.5">
                  {isEn ? 'NEARBY COVERAGE' : 'CAKUPAN SEKITAR'}
                </div>
                <h2 className="text-[24px] md:text-[28px] font-bold text-[#17122B]">
                  {isEn
                    ? `Nearby areas around ${areaPage.name}`
                    : `Area terdekat dari ${areaPage.name}`}
                </h2>
              </div>
              <Link
                to={isEn ? '/en/areas' : '/id/area'}
                className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#6A3FD0] hover:text-[#5630B0]"
              >
                <Layers size={15} />
                <span>
                  {isEn ? 'View all service areas' : 'Lihat semua area layanan'}
                </span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {nearbyAreaPages.map((nearby) => {
                const href = getUnifiedAreaPath(nearby.slug, locale);
                return (
                  <Link
                    key={nearby.slug}
                    to={href}
                    className="group block rounded-[14px] bg-[#FFFFFF] p-5 border border-[rgba(91,60,196,0.14)] hover:border-[#6A3FD0] transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-bold text-[16px] text-[#17122B] group-hover:text-[#6A3FD0]">
                        {nearby.name}
                      </span>
                      <ArrowRight
                        size={15}
                        className="text-[#6A3FD0] transition-transform group-hover:translate-x-0.5"
                      />
                    </div>
                    <p className="text-[13px] text-[#5B5675] line-clamp-2">
                      {nearby.factsSummary}
                    </p>
                  </Link>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {/* =====================================================
          11. FINAL CTA WITH CONTEXTUAL WHATSAPP MESSAGE
          ===================================================== */}
      <CTABlock
        eyebrow={areaPage.regionLabel.toUpperCase()}
        title={areaPage.ctaHeading}
        description={areaPage.ctaBody}
        buttonLabel={waCtaLabel}
        whatsappContext={waContext}
        secondaryAction={
          <Button to={isEn ? '/en/areas' : '/id/area'} variant="secondary">
            <span>{isEn ? 'All Service Areas' : 'Semua Area Layanan'}</span>
            <ArrowRight size={14} />
          </Button>
        }
      />
    </div>
  );
}
