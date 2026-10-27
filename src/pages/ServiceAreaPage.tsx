import React from 'react';
import { Link, useParams, Navigate, useLocation } from 'react-router-dom';
import {
  MessageCircle,
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Building2,
  BookOpen,
} from 'lucide-react';
import SEOMetadata from '../components/atoms/SEOMetadata';
import {
  AREAS,
  getServiceAreasByServiceSlug,
  getServiceAreasByAreaSlug,
} from '../data/service-areas';
import { getServicePath, getServiceAreaPath } from '../data/services';
import { getProjectBySlug } from '../data/projects';
import { getBlogPostBySlug } from '../data/blog-posts';
import { SITE_IMAGES } from '../config/images';
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

export default function ServiceAreaPage() {
  const { serviceSlug, areaSlug } = useParams<{
    serviceSlug: string;
    areaSlug: string;
  }>();
  const location = useLocation();
  const { locale, prefixMode } = parseLocalizedPath(location.pathname);
  const isEn = locale === 'en';

  // Centralized 301 redirect resolution
  const redirectTarget = resolveRedirectTarget(location.pathname);
  if (redirectTarget && redirectTarget !== location.pathname) {
    return <Navigate to={redirectTarget} replace />;
  }

  const pageData =
    serviceSlug && areaSlug
      ? getLocalizedServiceAreaPage(serviceSlug, areaSlug, locale)
      : undefined;
  const parentService = serviceSlug
    ? getLocalizedService(serviceSlug, locale)
    : undefined;
  const areaInfo =
    areaSlug && areaSlug in AREAS
      ? AREAS[areaSlug as keyof typeof AREAS]
      : undefined;

  if (!pageData || !parentService || !areaInfo) {
    return (
      <div className="min-h-[80vh] bg-[#FFFFFF] text-[#17122B] flex items-center justify-center py-24">
        <SEOMetadata
          title={
            isEn
              ? 'Service Area Page Not Found | CHESTAADOTCOM'
              : 'Halaman Area Layanan Tidak Ditemukan | CHESTAADOTCOM'
          }
          description={
            isEn
              ? 'The service area page you requested is not available. Explore our coverage across South Tangerang, BSD City, Pamulang, Jurang Mangu, and Lebak Bulus.'
              : 'Halaman area layanan yang kamu tuju belum tersedia. Lihat cakupan layanan kami di Tangerang Selatan, BSD City, Pamulang, Jurang Mangu, dan Lebak Bulus.'
          }
          path={location.pathname}
          noindex
        />
        <Container className="text-center max-w-xl space-y-5">
          <Badge variant="tint">
            {isEn ? 'PAGE NOT FOUND' : 'HALAMAN TIDAK DITEMUKAN'}
          </Badge>
          <h1>
            {isEn
              ? 'The service area page you are looking for is not available.'
              : 'Halaman layanan area yang kamu cari tidak tersedia.'}
          </h1>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Button to={isEn ? '/en/areas' : '/id/area'} variant="primary">
              <span>{isEn ? 'View Service Areas' : 'Lihat Area Layanan'}</span>
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

  const parentServiceHref = getServicePath(parentService.slug, locale);

  const nearbyAreaPages = areaInfo.nearbySlugs
    .map((nearbySlug) =>
      getLocalizedServiceAreaPage(pageData.serviceSlug, nearbySlug, locale)
    )
    .filter((p): p is NonNullable<typeof p> => Boolean(p && p.indexable));

  const otherServicesInSameArea = getServiceAreasByAreaSlug(
    pageData.areaSlug,
    true,
    locale
  )
    .filter((p) => p.serviceSlug !== pageData.serviceSlug)
    .map(
      (p) =>
        getLocalizedServiceAreaPage(p.serviceSlug, p.areaSlug, locale) || p
    );

  const allIndexableForThisService = getServiceAreasByServiceSlug(
    pageData.serviceSlug,
    true,
    locale
  ).map(
    (p) =>
      getLocalizedServiceAreaPage(p.serviceSlug, p.areaSlug, locale) || p
  );

  const relatedInternalProjects = pageData.relatedProjectSlugs
    .map((slug) => getProjectBySlug(slug, locale))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .slice(0, 2);

  const relatedBlogPost = getBlogPostBySlug(pageData.relatedBlogSlug, locale);

  const waUrl = buildWhatsAppLink(
    {
      type: 'area',
      serviceName: pageData.serviceName,
      areaName: pageData.areaName,
      url: location.pathname,
    },
    locale
  );
  const waCtaLabel = getWhatsAppCtaLabel(locale);

  const ogImgAsset =
    SITE_IMAGES[pageData.ogImageKey as keyof typeof SITE_IMAGES] ||
    SITE_IMAGES.ogDefault;

  return (
    <div className="bg-[#FFFFFF] text-[#17122B] min-h-screen">
      <SEOMetadata
        title={pageData.metaTitle}
        description={pageData.metaDescription}
        path={location.pathname}
        image={ogImgAsset.src}
        noindex={!pageData.indexable}
      />

      {/* =====================================================
          1 & 2. BREADCRUMB + EYEBROW + H1 + RINGKASAN SINGKAT + CTAs
          ===================================================== */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 bg-gradient-to-b from-[#FFFFFF] via-[#F8F6FE] to-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)]">
        <Container>
          <Breadcrumb
            items={[
              {
                label: isEn ? 'Services' : 'Layanan',
                to: toLocalizedHref('/#layanan', locale, prefixMode),
              },
              {
                label: parentService.title,
                to: parentServiceHref,
              },
              { label: pageData.areaName },
            ]}
          />

          <div className="max-w-4xl space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="tint">
                <MapPin size={13} className="text-[#6A3FD0]" />
                <span>{pageData.eyebrow}</span>
              </Badge>
              {!pageData.indexable && (
                <Badge variant="outline">Prepared Area · Noindex</Badge>
              )}
            </div>

            <h1>{pageData.h1}</h1>

            {/* Ringkasan singkat (40–60 words direct AEO/GEO answer) */}
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
                  {pageData.priceNote.startingPrice}
                </span>
              </div>
              <p className="text-[15px] md:text-[16px] text-[#17122B] leading-[1.65] font-medium">
                {pageData.quickSummary}
              </p>
            </Card>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button
                href={waUrl}
                onClick={() => trackWaClick('area', 'area_hero', locale)}
                variant="primary"
              >
                <MessageCircle size={16} />
                <span>{waCtaLabel}</span>
                <ArrowUpRight size={15} />
              </Button>
              <Button to={parentServiceHref} variant="secondary">
                <span>
                  {isEn
                    ? `Back to ${parentService.title}`
                    : `Lihat halaman utama ${parentService.title}`}
                </span>
                <ArrowRight size={15} className="text-[#6A3FD0]" />
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          3 & 4. CEK CEPAT (3-BULLET GLASS BOX) +
                 KENAPA BISNIS DI {AREA} BUTUH INI
          ===================================================== */}
      <section className="py-16 md:py-24 bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)]">
        <Container className="space-y-16">
          {/* 3. Cek cepat (3-bullet glass box) */}
          <div className="max-w-[760px] mx-auto">
            <div className="rounded-[24px] glass-card p-6 md:p-8 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[rgba(91,60,196,0.14)]">
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold">
                  {isEn ? 'Quick check' : 'Cek cepat'}
                </span>
                <Badge variant="tint">{pageData.priceNote.startingPrice}</Badge>
              </div>
              <ul className="space-y-3.5 text-[15px] text-[#17122B] leading-[1.65]">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#6A3FD0] mt-2 shrink-0" />
                  <span>
                    <strong>{isEn ? 'Right for you if:' : 'Cocok kalau:'}</strong>{' '}
                    {pageData.cekCepat.cocokKalau}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#6A3FD0] mt-2 shrink-0" />
                  <span>
                    <strong>{isEn ? 'Starts with:' : 'Mulai dari:'}</strong>{' '}
                    {pageData.cekCepat.mulaiDari}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#6A3FD0] mt-2 shrink-0" />
                  <span>
                    <strong>{isEn ? 'Pricing:' : 'Harga:'}</strong>{' '}
                    {pageData.cekCepat.harga}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* 4. Kenapa bisnis di {Area} butuh ini */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-7 space-y-5">
              <Tag>
                {isEn
                  ? `LOCAL CONTEXT · ${pageData.areaName.toUpperCase()}`
                  : `KONTEKS AREA · ${pageData.areaName.toUpperCase()}`}
              </Tag>
              <h2>{pageData.localContextHeading}</h2>
              <div className="space-y-4">
                {pageData.localContextParagraphs.map((para, idx) => (
                  <p
                    key={idx}
                    className="text-[15px] md:text-[16px] text-[#5B5675] leading-[1.7]"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <Card variant="soft" padding="lg" className="space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-[rgba(91,60,196,0.14)]">
                  <Building2 size={18} className="text-[#6A3FD0]" />
                  <h3 className="text-[17px] font-semibold text-[#17122B]">
                    {isEn
                      ? `Typical businesses in ${pageData.areaName}`
                      : `Jenis usaha yang umum di ${pageData.areaName}`}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {pageData.businessMixList.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-[14px] md:text-[15px] text-[#17122B] leading-[1.6]"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#EFEAFB] text-[#6A3FD0] font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
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
          5. CONTOH SKENARIO UNTUK BISNIS DI {AREA} (2 CARDS LABELED "Contoh skenario")
          ===================================================== */}
      <section className="py-16 md:py-24 bg-[#F8F6FE] border-b border-[rgba(91,60,196,0.14)]">
        <Container>
          <SectionHeading
            eyebrow={isEn ? 'EXAMPLE SCENARIOS' : 'CONTOH SKENARIO'}
            title={
              isEn
                ? `Example scenarios for businesses in ${pageData.areaName}`
                : `Contoh skenario untuk bisnis di ${pageData.areaName}`
            }
          />

          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {pageData.scenarios.map((scenario, idx) => (
                <Card
                  key={idx}
                  variant="white"
                  padding="lg"
                  className="h-full flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2 pb-3 border-b border-[rgba(91,60,196,0.14)]">
                      <Tag>{scenario.businessType}</Tag>
                      <Badge variant="tint">{scenario.label}</Badge>
                    </div>
                    <h3 className="text-[19px] md:text-[21px] text-[#17122B]">
                      {scenario.title}
                    </h3>

                    <div className="space-y-3 pt-1">
                      <div className="p-3.5 rounded-[14px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.12)]">
                        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675] font-semibold">
                          {isEn ? 'Situation' : 'Situasi'}
                        </p>
                        <p className="mt-1 text-[14px] text-[#17122B] leading-[1.6]">
                          {scenario.challenge}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-[14px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)]">
                        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold">
                          {isEn ? 'What we build' : 'Yang dibangun'}
                        </p>
                        <p className="mt-1 text-[14px] text-[#17122B] leading-[1.6]">
                          {scenario.solution}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[rgba(91,60,196,0.14)]">
                    <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold">
                      {scenario.label}
                    </p>
                    <p className="mt-1 text-[14px] text-[#5B5675] leading-[1.6]">
                      {scenario.expectedOutcome}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* =====================================================
          6 & 7. CARA KAMI BEKERJA DENGAN KLIEN DI {AREA} (4-STEP COMPACT PROCESS) + HARGA
          ===================================================== */}
      <section className="py-16 md:py-24 bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)]">
        <Container className="space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* 6A. Collaboration explanation */}
            <div className="lg:col-span-6 space-y-5">
              <Tag>{isEn ? 'HOW WE WORK' : 'CARA KAMI BEKERJA'}</Tag>
              <h2>{pageData.collaborationHeading}</h2>
              <div className="space-y-4">
                {pageData.collaborationParagraphs.map((para, idx) => (
                  <p
                    key={idx}
                    className="text-[15px] md:text-[16px] text-[#5B5675] leading-[1.7]"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* 6B. Compact 4-step process */}
            <div className="lg:col-span-6">
              <Card variant="soft" padding="lg" className="space-y-4">
                <Tag>{isEn ? '4-STEP PROCESS' : '4 LANGKAH KERJA'}</Tag>
                <div className="space-y-3">
                  {pageData.processSteps.map((step) => (
                    <div
                      key={step.stepNumber}
                      className="p-4 rounded-[16px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] flex items-start gap-3.5"
                    >
                      <span className="w-7 h-7 rounded-full bg-[#EFEAFB] text-[#6A3FD0] font-mono text-[12px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {step.stepNumber}
                      </span>
                      <div>
                        <h3 className="text-[15px] font-semibold text-[#17122B]">
                          {step.title}
                        </h3>
                        <p className="text-[14px] text-[#5B5675] leading-[1.6] mt-0.5">
                          {step.sentence}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          {/* 7. Harga */}
          <Card variant="highlighted" padding="lg" className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Tag>{isEn ? 'PRICING & SCOPE' : 'HARGA & RUANG LINGKUP'}</Tag>
              <Badge variant="tint">{pageData.priceNote.startingPrice}</Badge>
            </div>
            <h2 className="text-[22px] md:text-[26px]">{pageData.priceHeading}</h2>
            <p className="text-[15px] md:text-[16px] text-[#17122B] leading-[1.7]">
              {pageData.priceCopy}
            </p>
          </Card>
        </Container>
      </section>

      {/* =====================================================
          8. FAQ KHUSUS UNTUK BISNIS DI {AREA} (3 UNIQUE QUESTIONS)
          ===================================================== */}
      <section className="py-16 md:py-24 bg-[#F8F6FE] border-b border-[rgba(91,60,196,0.14)]">
        <Container className="max-w-4xl">
          <SectionHeading
            align="center"
            eyebrow={`FAQ · ${pageData.areaName.toUpperCase()}`}
            title={
              isEn
                ? `Questions from businesses in ${pageData.areaName}`
                : `Pertanyaan khusus untuk bisnis di ${pageData.areaName}`
            }
          />
          <FAQAccordion items={pageData.faqs} />
        </Container>
      </section>

      {/* =====================================================
          9. PROYEK INTERNAL TERKAIT + LAYANAN LAIN DI {AREA} + AREA TERDEKAT
          ===================================================== */}
      <section className="py-16 md:py-24 bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)]">
        <Container className="space-y-16">
          {/* 9A. Proyek internal terkait */}
          {relatedInternalProjects.length > 0 && (
            <div>
              <SectionHeading
                eyebrow={isEn ? 'INTERNAL DEMO PROJECTS' : 'PROYEK INTERNAL'}
                title={
                  isEn ? 'Related internal projects' : 'Proyek internal terkait'
                }
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
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
                        <div className="relative aspect-[16/9] bg-[#EFEAFB] border-b border-[rgba(91,60,196,0.14)] overflow-hidden">
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
                            <Badge variant="tint">
                              {proj.internalBadgeLabel}
                            </Badge>
                            <Badge variant="outline">
                              {isEn ? 'Illustration' : 'Ilustrasi'}
                            </Badge>
                          </div>
                        </div>

                        <div className="p-6 space-y-2.5">
                          <div className="flex items-center justify-between font-mono text-[11px] text-[#6A3FD0]">
                            <span>{proj.categoryLabel}</span>
                            <span>{proj.year}</span>
                          </div>
                          <h3 className="text-[19px] font-semibold text-[#17122B]">
                            {proj.title}
                          </h3>
                          <p className="text-[14px] text-[#5B5675] leading-[1.6]">
                            {proj.oneLiner}
                          </p>
                          <p className="font-mono text-[11px] text-[#6A3FD0] pt-1">
                            {proj.outcomesLabel}: {proj.outcomes[0]}
                          </p>
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
            </div>
          )}

          {/* 9B. Layanan lain di {Area} + Area terdekat + Blog guide */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card variant="soft" className="space-y-4">
              <h3 className="text-[17px] font-semibold text-[#17122B]">
                {isEn
                  ? `Other services in ${pageData.areaName}`
                  : `Layanan lain di ${pageData.areaName}`}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {otherServicesInSameArea.map((item) => {
                  const otherHref = getServiceAreaPath(
                    item.serviceSlug,
                    item.areaSlug,
                    locale
                  );
                  const anchorLabel = isEn
                    ? `${
                        item.serviceSlug === 'pembuatan-website'
                          ? 'Website development'
                          : 'AI agent services'
                      } in ${item.areaName}`
                    : `Jasa ${
                        item.serviceSlug === 'pembuatan-website'
                          ? 'pembuatan website'
                          : 'AI agent'
                      } di ${item.areaName}`;
                  return (
                    <Link
                      key={`${item.serviceSlug}-${item.areaSlug}`}
                      to={otherHref}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] text-[13px] font-medium text-[#17122B] hover:border-[#6A3FD0] hover:text-[#6A3FD0] transition-colors"
                    >
                      <span>{anchorLabel}</span>
                      <ArrowRight size={13} className="text-[#6A3FD0]" />
                    </Link>
                  );
                })}
                <Link
                  to={getServicePath('software-custom', locale)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] text-[13px] font-medium text-[#17122B] hover:border-[#6A3FD0] hover:text-[#6A3FD0] transition-colors"
                >
                  <span>
                    {isEn ? 'Custom software development' : 'Jasa software custom'}
                  </span>
                  <ArrowRight size={13} className="text-[#6A3FD0]" />
                </Link>
                <Link
                  to={getServicePath('otomasi-workflow', locale)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] text-[13px] font-medium text-[#17122B] hover:border-[#6A3FD0] hover:text-[#6A3FD0] transition-colors"
                >
                  <span>
                    {isEn
                      ? 'Business workflow automation'
                      : 'Jasa otomasi workflow'}
                  </span>
                  <ArrowRight size={13} className="text-[#6A3FD0]" />
                </Link>
              </div>
            </Card>

            <Card variant="soft" className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-[17px] font-semibold text-[#17122B]">
                  {isEn ? 'Nearby areas' : 'Area terdekat'}
                </h3>
                <Link
                  to={isEn ? '/en/areas' : '/id/area'}
                  className="text-[13px] font-semibold text-[#6A3FD0] hover:underline"
                >
                  {isEn ? 'All areas' : 'Semua area'}
                </Link>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {(nearbyAreaPages.length > 0
                  ? nearbyAreaPages
                  : allIndexableForThisService.filter(
                      (p) => p.areaSlug !== pageData.areaSlug
                    )
                ).map((item) => {
                  const itemHref = getServiceAreaPath(
                    item.serviceSlug,
                    item.areaSlug,
                    locale
                  );
                  const anchorLabel = isEn
                    ? `${
                        item.serviceSlug === 'pembuatan-website'
                          ? 'Website development'
                          : 'AI agent services'
                      } in ${item.areaName}`
                    : `Jasa ${
                        item.serviceSlug === 'pembuatan-website'
                          ? 'pembuatan website'
                          : 'AI agent'
                      } di ${item.areaName}`;
                  return (
                    <Link
                      key={`${item.serviceSlug}-${item.areaSlug}`}
                      to={itemHref}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] text-[13px] font-medium text-[#17122B] hover:border-[#6A3FD0] hover:text-[#6A3FD0] transition-colors"
                    >
                      <MapPin size={13} className="text-[#6A3FD0]" />
                      <span>{anchorLabel}</span>
                    </Link>
                  );
                })}
              </div>
            </Card>
          </div>

          {relatedBlogPost && (
            <Card variant="soft" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-mono text-[11px] text-[#6A3FD0]">
                  <BookOpen size={14} />
                  <span>{isEn ? 'RELATED BLOG GUIDE' : 'BACAAN TERKAIT DARI BLOG'}</span>
                </div>
                <h3 className="text-[17px] font-semibold text-[#17122B]">
                  {relatedBlogPost.title}
                </h3>
              </div>
              <Link
                to={toLocalizedHref(
                  `/blog/${relatedBlogPost.slug}`,
                  locale,
                  prefixMode
                )}
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#6A3FD0] hover:underline shrink-0"
              >
                <span>{isEn ? 'Read guide' : 'Baca panduan'}</span>
                <ArrowRight size={14} />
              </Link>
            </Card>
          )}
        </Container>
      </section>

      {/* Final CTA Block */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#F8F6FE] to-[#EFEAFB] cv-auto">
        <Container className="max-w-[860px]">
          <CTABlock
            title={
              isEn
                ? `Start with a free 30-minute audit for your business in ${pageData.areaName}`
                : `Mulai dari audit gratis 30 menit untuk bisnismu di ${pageData.areaName}`
            }
            description={
              isEn
                ? 'Tell us your current workflow or website goal via WhatsApp. Chesta Azka and Zeeshan will review it with you before you pay anything.'
                : 'Ceritakan alur kerja atau kebutuhan halaman web bisnismu lewat WhatsApp. Chesta Azka dan Zeeshan akan membedahnya bersamamu sebelum kamu membayar apa pun.'
            }
            whatsappContext={{
              type: 'area',
              serviceName: pageData.serviceName,
              areaName: pageData.areaName,
              url: location.pathname,
            }}
            secondaryAction={
              <Button to={parentServiceHref} variant="secondary">
                <span>
                  {isEn
                    ? `View ${parentService.title}`
                    : `Lihat ${parentService.title}`}
                </span>
                <ArrowRight size={15} className="text-[#6A3FD0]" />
              </Button>
            }
          />
        </Container>
      </section>
    </div>
  );
}
