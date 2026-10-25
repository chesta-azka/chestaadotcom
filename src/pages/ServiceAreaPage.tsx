import React from 'react';
import { Link, useParams, Navigate, useLocation } from 'react-router-dom';
import {
  MessageCircle,
  ArrowRight,
  ArrowUpRight,
  Check,
  MapPin,
  Clock,
  ShieldCheck,
  Building2,
  BookOpen,
  Layers,
} from 'lucide-react';
import SEOMetadata from '../components/atoms/SEOMetadata';
import {
  AREAS,
  getServiceAreasByServiceSlug,
  getServiceAreasByAreaSlug,
} from '../data/service-areas';
import { getBlogPostBySlug } from '../data/blog-posts';
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
  buildWaUrl,
} from '../components/ui/DesignSystem';

export default function ServiceAreaPage() {
  const { serviceSlug, areaSlug } = useParams<{
    serviceSlug: string;
    areaSlug: string;
  }>();
  const location = useLocation();
  const { locale, prefixMode } = parseLocalizedPath(location.pathname);

  // Centralized 301 redirect resolution for legacy /layanan/:service/:area or /services/:service/:area
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
            locale === 'en'
              ? 'Service Area Page Not Found | CHESTAADOTCOM'
              : 'Halaman Area Layanan Tidak Ditemukan | CHESTAADOTCOM'
          }
          description={
            locale === 'en'
              ? 'The service area page you requested is not available.'
              : 'Halaman area layanan yang kamu tuju belum tersedia.'
          }
          path={location.pathname}
          noindex
        />
        <Container className="text-center max-w-xl space-y-5">
          <Badge variant="tint">
            {locale === 'en' ? 'PAGE NOT FOUND' : 'HALAMAN TIDAK DITEMUKAN'}
          </Badge>
          <h1>
            {locale === 'en'
              ? 'The service area page you are looking for is not available.'
              : 'Halaman layanan area yang kamu cari tidak tersedia.'}
          </h1>
          <p className="text-[15px] text-[#5B5675]">
            {locale === 'en'
              ? 'Return to our main services or homepage to view coverage across BSD City, Alam Sutera, Bintaro, Gading Serpong, and South Tangerang.'
              : 'Silakan kembali ke halaman layanan utama kami atau beranda untuk melihat cakupan area di BSD City, Alam Sutera, Bintaro, Gading Serpong, dan Tangerang Selatan.'}
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Button to={toLocalizedHref('/#layanan', locale, prefixMode)} variant="primary">
              <span>
                {locale === 'en' ? 'View Main Services' : 'Lihat Layanan Utama'}
              </span>
              <ArrowRight size={15} />
            </Button>
            <Button to={toLocalizedHref('/', locale, prefixMode)} variant="secondary">
              <span>{locale === 'en' ? 'Back to Home' : 'Kembali ke Beranda'}</span>
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  const nearbyAreaPages = areaInfo.nearbySlugs
    .map((nearbySlug) =>
      getLocalizedServiceAreaPage(pageData.serviceSlug, nearbySlug, locale)
    )
    .filter((p): p is NonNullable<typeof p> => Boolean(p && p.indexable));

  const isEn = locale === 'en';

  const otherServicesInSameArea = getServiceAreasByAreaSlug(
    pageData.areaSlug,
    true
  )
    .filter((p) => p.serviceSlug !== pageData.serviceSlug)
    .map(
      (p) =>
        getLocalizedServiceAreaPage(p.serviceSlug, p.areaSlug, locale) || p
    );

  const allIndexableForThisService = getServiceAreasByServiceSlug(
    pageData.serviceSlug,
    true
  ).map(
    (p) =>
      getLocalizedServiceAreaPage(p.serviceSlug, p.areaSlug, locale) || p
  );

  const relatedBlogPost = getBlogPostBySlug(
    pageData.caseStudyReference.relatedBlogSlug,
    locale
  );

  const waUrl = buildWaUrl(
    isEn
      ? `Hello Chesta & Zeeshan, my business is in ${pageData.areaName} and I am interested in ${pageData.serviceName} (${location.pathname}). I would like a free consultation.`
      : `Halo Chesta & Zeeshan, saya dari area ${pageData.areaName} tertarik dengan layanan ${pageData.serviceName} (/jasa/${pageData.serviceSlug}/${pageData.areaSlug}) dan ingin konsultasi gratis.`
  );

  const ogImageUrl = `/api/og?title=${encodeURIComponent(
    pageData.h1
  )}&category=${encodeURIComponent(
    `${pageData.serviceName} · ${pageData.areaName}`
  )}`;

  return (
    <div className="bg-[#FFFFFF] text-[#17122B] min-h-screen">
      <SEOMetadata
        title={pageData.metaTitle}
        description={pageData.metaDescription}
        path={location.pathname}
        image={ogImageUrl}
        noindex={!pageData.indexable}
      />

      {/* =====================================================
          1. HERO & RINGKASAN SINGKAT (40-60 WORDS DIRECT ANSWER)
          ===================================================== */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 bg-gradient-to-b from-[#FFFFFF] via-[#F8F6FE] to-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)]">
        <Container>
          <Breadcrumb
            items={[
              {
                label: parentService.shortTitle,
                to: toLocalizedHref(`/jasa/${parentService.slug}`, locale, prefixMode),
              },
              { label: pageData.areaName },
            ]}
          />

          <div className="max-w-4xl space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="tint">
                <MapPin size={13} className="text-[#6A3FD0]" />
                <span>
                  {areaInfo.isBaseArea
                    ? isEn
                      ? `Operational Base: ${areaInfo.regionLabel}`
                      : `Basis Operasional: ${areaInfo.regionLabel}`
                    : isEn
                    ? `Service Area: ${areaInfo.regionLabel}`
                    : `Area Layanan: ${areaInfo.regionLabel}`}
                </span>
              </Badge>
              <Badge variant="outline">
                <Clock size={13} className="text-[#6A3FD0]" />
                <span>{pageData.priceNote.timeline}</span>
              </Badge>
              {!pageData.indexable && (
                <Badge variant="outline">Draft Area · Noindex</Badge>
              )}
            </div>

            <h1>{pageData.h1}</h1>

            {/* Ringkasan Singkat Box (40-60 words direct AEO/GEO answer) */}
            <Card
              variant="highlighted"
              padding="default"
              className="border-l-4 border-l-[#6A3FD0]"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold">
                  {isEn ? 'Quick Summary' : 'Ringkasan Singkat'}
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
              <Button href={waUrl} variant="primary">
                <MessageCircle size={16} />
                <span>
                  {isEn
                    ? 'Free consultation via WhatsApp'
                    : 'Konsultasi gratis via WhatsApp'}
                </span>
                <ArrowUpRight size={15} />
              </Button>
              <Button
                to={toLocalizedHref(`/jasa/${parentService.slug}`, locale, prefixMode)}
                variant="secondary"
              >
                <span>
                  {isEn
                    ? `View full ${parentService.shortTitle} details`
                    : `Lihat detail lengkap ${parentService.shortTitle}`}
                </span>
                <ArrowRight size={15} className="text-[#6A3FD0]" />
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          2. LOCAL BUSINESS CONTEXT & BUSINESS MIX
          ===================================================== */}
      <section className="py-16 md:py-24 bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-7 space-y-5">
              <Tag>
                {isEn
                  ? `LOCAL BUSINESS CONTEXT · ${pageData.areaName.toUpperCase()}`
                  : `KONTEKS BISNIS LOKAL · ${pageData.areaName.toUpperCase()}`}
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
                      ? `Business sectors in ${pageData.areaName} that most frequently need this service`
                      : `Jenis bisnis di ${pageData.areaName} yang paling sering membutuhkan layanan ini`}
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
          3. TWO CONCRETE SCENARIOS FOR THIS AREA'S BUSINESS MIX
          ===================================================== */}
      <section className="py-16 md:py-24 bg-[#F8F6FE] border-b border-[rgba(91,60,196,0.14)]">
        <Container>
          <SectionHeading
            eyebrow={
              isEn
                ? `EXAMPLE SCENARIOS IN ${pageData.areaName.toUpperCase()}`
                : `CONTOH SKENARIO DI ${pageData.areaName.toUpperCase()}`
            }
            title={
              isEn
                ? `Two real implementation scenarios for businesses in ${pageData.areaName}`
                : `Dua skenario implementasi nyata untuk bisnis di ${pageData.areaName}`
            }
            description={
              isEn
                ? `Concrete illustrations of how ${parentService.shortTitle.toLowerCase()} solves daily operational bottlenecks in ${pageData.areaName}.`
                : `Gambaran konkret bagaimana ${parentService.shortTitle.toLowerCase()} menyelesaikan masalah operasional harian di kawasan ${pageData.areaName}.`
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
                      <Tag>
                        {isEn ? `SCENARIO 0${idx + 1}` : `SKENARIO 0${idx + 1}`} ·{' '}
                        {scenario.businessType}
                      </Tag>
                      <Badge variant="tint">{isEn ? 'Illustration' : 'Ilustrasi'}</Badge>
                    </div>
                    <h3 className="text-[19px] md:text-[21px] text-[#17122B]">
                      {scenario.title}
                    </h3>

                    <div className="space-y-3 pt-1">
                      <div className="p-3.5 rounded-[14px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.12)]">
                        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675] font-semibold">
                          {isEn ? 'On-the-Ground Bottleneck' : 'Masalah di Lapangan'}
                        </p>
                        <p className="mt-1 text-[14px] text-[#17122B] leading-[1.6]">
                          {scenario.challenge}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-[14px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)]">
                        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold">
                          {isEn ? 'What We Build' : 'Solusi yang Kami Bangun'}
                        </p>
                        <p className="mt-1 text-[14px] text-[#17122B] leading-[1.6]">
                          {scenario.solution}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[rgba(91,60,196,0.14)]">
                    <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold">
                      {isEn ? 'Operational Impact' : 'Dampak Operasional'}
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
          4. HOW WE WORK WITH CLIENTS THERE + DELIVERABLES & PRICING
          ===================================================== */}
      <section className="py-16 md:py-24 bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)]">
        <Container className="space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Honest Remote vs Tatap Muka workflow */}
            <div className="lg:col-span-6 space-y-5">
              <Tag>
                {isEn
                  ? 'COLLABORATION MODEL · REMOTE & IN-PERSON'
                  : 'MODEL KOLABORASI · REMOTE & TATAP MUKA'}
              </Tag>
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

              <Card variant="soft" className="space-y-2">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold">
                  <ShieldCheck size={16} />
                  <span>
                    {isEn
                      ? 'Operational Location Transparency'
                      : 'Transparansi Lokasi Operasional'}
                  </span>
                </div>
                <p className="text-[14px] text-[#17122B] leading-[1.6]">
                  {isEn ? (
                    <>
                      CHESTAADOTCOM’s primary base is in{' '}
                      <strong>BSD, South Tangerang</strong>.
                      For areas outside BSD, we serve clients directly via remote
                      sessions and scheduled on-site visits rather than claiming
                      fake branch office addresses.
                    </>
                  ) : (
                    <>
                      Basis utama CHESTAADOTCOM berada di{' '}
                      <strong>BSD, Tangerang Selatan</strong>
                      . Untuk wilayah di luar BSD, status kami adalah melayani
                      secara langsung (remote &amp; kunjungan terjadwal), bukan
                      mengklaim alamat kantor cabang fiktif.
                    </>
                  )}
                </p>
              </Card>
            </div>

            {/* Right: Deliverables + Price Note */}
            <div className="lg:col-span-6 space-y-6">
              <Card variant="soft" padding="lg" className="space-y-5">
                <div>
                  <Tag>{isEn ? 'DELIVERABLES SCOPE' : 'CAKUPAN DELIVERABLES'}</Tag>
                  <h3 className="mt-1 text-[20px]">
                    {isEn
                      ? `What you receive with ${parentService.shortTitle}`
                      : `Yang kamu dapatkan pada layanan ${parentService.shortTitle}`}
                  </h3>
                </div>

                <ul className="space-y-3">
                  {pageData.deliverablesSummary.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-[14px] md:text-[15px] text-[#17122B] leading-[1.6]"
                    >
                      <Check
                        size={16}
                        className="text-[#6A3FD0] shrink-0 mt-1"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-[rgba(91,60,196,0.14)] flex items-center justify-between">
                  <span className="text-[13px] text-[#5B5675]">
                    {isEn
                      ? 'Want to see full technical specifications?'
                      : 'Ingin melihat spesifikasi teknis lengkap?'}
                  </span>
                  <Link
                    to={toLocalizedHref(`/jasa/${parentService.slug}`, locale, prefixMode)}
                    className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#6A3FD0] hover:underline"
                  >
                    <span>
                      {isEn
                        ? `${parentService.shortTitle} main page`
                        : `Halaman utama ${parentService.shortTitle}`}
                    </span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </Card>

              <Card variant="highlighted" padding="lg" className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold">
                    {isEn
                      ? 'Pricing & Timeline Note'
                      : 'Catatan Biaya & Estimasi Pengerjaan'}
                  </span>
                  <Badge variant="tint">{pageData.priceNote.timeline}</Badge>
                </div>
                <p className="text-[22px] md:text-[26px] font-bold text-[#17122B]">
                  {pageData.priceNote.startingPrice}
                </p>
                <p className="text-[14px] md:text-[15px] text-[#5B5675] leading-[1.6]">
                  {pageData.priceNote.note}
                </p>
              </Card>
            </div>
          </div>

          {/* Related Case Study & Blog Post */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch pt-4">
            <Card variant="soft" className="flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Layers size={16} className="text-[#6A3FD0]" />
                  <Tag>
                    {isEn
                      ? 'PROJECT & CASE STUDY REFERENCE'
                      : 'REFERENSI PROYEK & STUDI KASUS'}
                  </Tag>
                </div>
                <h3 className="text-[18px] font-semibold text-[#17122B]">
                  {pageData.caseStudyReference.title}
                </h3>
                <p className="text-[14px] text-[#5B5675] leading-[1.65]">
                  {pageData.caseStudyReference.summary}
                </p>
                <p className="font-mono text-[11px] text-[#6A3FD0]">
                  {pageData.caseStudyReference.metricNote}
                </p>
              </div>
              <div className="pt-3 border-t border-[rgba(91,60,196,0.14)] flex flex-wrap gap-4">
                <Link
                  to={toLocalizedHref('/case-studies', locale, prefixMode)}
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#6A3FD0] hover:underline"
                >
                  <span>{isEn ? 'View Case Studies' : 'Lihat Studi Kasus'}</span>
                  <ArrowRight size={14} />
                </Link>
                <Link
                  to={toLocalizedHref('/portfolio', locale, prefixMode)}
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#17122B] hover:text-[#6A3FD0]"
                >
                  <span>
                    {isEn ? 'View Visual Portfolio' : 'Lihat Portofolio Visual'}
                  </span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </Card>

            <Card variant="soft" className="flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <BookOpen size={16} className="text-[#6A3FD0]" />
                  <Tag>
                    {isEn
                      ? 'RELATED GUIDE FROM OUR BLOG'
                      : 'PANDUAN TERKAIT DARI BLOG KAMI'}
                  </Tag>
                </div>
                <h3 className="text-[18px] font-semibold text-[#17122B]">
                  {relatedBlogPost
                    ? relatedBlogPost.title
                    : pageData.caseStudyReference.relatedBlogTitle}
                </h3>
                <p className="text-[14px] text-[#5B5675] leading-[1.65]">
                  {relatedBlogPost
                    ? relatedBlogPost.excerpt
                    : isEn
                    ? 'Read our practical guide on choosing safe system architecture, cost breakdowns, and rollout steps for your business.'
                    : 'Pelajari panduan praktis kami mengenai pemilihan arsitektur, perhitungan biaya, dan langkah implementasi untuk bisnismu.'}
                </p>
              </div>
              <div className="pt-3 border-t border-[rgba(91,60,196,0.14)]">
                <Link
                  to={toLocalizedHref(
                    `/blog/${relatedBlogPost?.slug || pageData.caseStudyReference.relatedBlogSlug}`,
                    locale,
                    prefixMode
                  )}
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#6A3FD0] hover:underline"
                >
                  <span>{isEn ? 'Read full article' : 'Baca artikel selengkapnya'}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* =====================================================
          5. AREA-SPECIFIC FAQ (3 UNIQUE QUESTIONS)
          ===================================================== */}
      <section className="py-16 md:py-24 bg-[#F8F6FE] border-b border-[rgba(91,60,196,0.14)]">
        <Container className="max-w-4xl">
          <SectionHeading
            align="center"
            eyebrow={`FAQ ${pageData.areaName.toUpperCase()}`}
            title={
              isEn
                ? `Questions about ${parentService.shortTitle.toLowerCase()} in ${pageData.areaName}`
                : `Pertanyaan seputar ${parentService.shortTitle.toLowerCase()} di ${pageData.areaName}`
            }
            description={
              isEn
                ? 'Direct answers to the questions most frequently asked by prospective clients from this area.'
                : 'Jawaban langsung untuk pertanyaan yang paling sering diajukan calon klien dari area ini.'
            }
          />
          <FAQAccordion items={pageData.faqs} />
        </Container>
      </section>

      {/* =====================================================
          6. NEARBY AREAS & PARENT SERVICE INTERNAL LINKS
          ===================================================== */}
      <section className="py-16 md:py-20 bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)]">
        <Container className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <Tag>
                {isEn ? 'LOCAL SERVICE NETWORK' : 'JARINGAN LAYANAN LOKAL'}
              </Tag>
              <h2 className="mt-2 text-[22px] md:text-[26px]">
                {isEn
                  ? `Areas near ${pageData.areaName} & related services`
                  : `Area terdekat dari ${pageData.areaName} & layanan terkait`}
              </h2>
            </div>
            <Link
              to={toLocalizedHref(`/jasa/${parentService.slug}`, locale, prefixMode)}
              className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#6A3FD0] hover:underline"
            >
              <span>
                {isEn
                  ? `Back to ${parentService.title} main page`
                  : `Kembali ke halaman induk ${parentService.title}`}
              </span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nearby Areas for the same service */}
            <Card variant="soft" className="space-y-4">
              <h3 className="text-[16px] font-semibold text-[#17122B]">
                {isEn
                  ? `${parentService.shortTitle} in areas near ${pageData.areaName}`
                  : `${parentService.shortTitle} di area sekitar ${pageData.areaName}`}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {(nearbyAreaPages.length > 0
                  ? nearbyAreaPages
                  : allIndexableForThisService.filter(
                      (p) => p.areaSlug !== pageData.areaSlug
                    )
                ).map((item) => (
                  <Link
                    key={`${item.serviceSlug}-${item.areaSlug}`}
                    to={toLocalizedHref(
                      `/jasa/${item.serviceSlug}/${item.areaSlug}`,
                      locale,
                      prefixMode
                    )}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] text-[13px] font-medium text-[#17122B] hover:border-[#6A3FD0] hover:text-[#6A3FD0] transition-colors whitespace-nowrap"
                  >
                    <MapPin size={13} className="text-[#6A3FD0]" />
                    <span>
                      {isEn
                        ? `${parentService.shortTitle} in ${item.areaName}`
                        : `${parentService.shortTitle} di ${item.areaName}`}
                    </span>
                  </Link>
                ))}
              </div>
            </Card>

            {/* Other services in the same area */}
            <Card variant="soft" className="space-y-4">
              <h3 className="text-[16px] font-semibold text-[#17122B]">
                {isEn
                  ? `Other CHESTAADOTCOM services for businesses in ${pageData.areaName}`
                  : `Layanan CHESTAADOTCOM lainnya untuk bisnis di ${pageData.areaName}`}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {otherServicesInSameArea.map((item) => (
                  <Link
                    key={`${item.serviceSlug}-${item.areaSlug}`}
                    to={toLocalizedHref(
                      `/jasa/${item.serviceSlug}/${item.areaSlug}`,
                      locale,
                      prefixMode
                    )}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] text-[13px] font-medium text-[#17122B] hover:border-[#6A3FD0] hover:text-[#6A3FD0] transition-colors whitespace-nowrap"
                  >
                    <span>
                      {isEn
                        ? `${item.serviceName} in ${item.areaName}`
                        : `${item.serviceName} di ${item.areaName}`}
                    </span>
                    <ArrowRight size={13} className="text-[#6A3FD0]" />
                  </Link>
                ))}
                <Link
                  to={toLocalizedHref('/jasa/software-custom', locale, prefixMode)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] text-[13px] font-medium text-[#17122B] hover:border-[#6A3FD0] hover:text-[#6A3FD0] transition-colors whitespace-nowrap"
                >
                  <span>
                    {isEn ? 'Custom Software Development' : 'Jasa Software Custom'}
                  </span>
                  <ArrowRight size={13} className="text-[#6A3FD0]" />
                </Link>
                <Link
                  to={toLocalizedHref('/jasa/otomasi-workflow', locale, prefixMode)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] text-[13px] font-medium text-[#17122B] hover:border-[#6A3FD0] hover:text-[#6A3FD0] transition-colors whitespace-nowrap"
                >
                  <span>
                    {isEn ? 'Workflow Automation' : 'Jasa Otomasi Workflow'}
                  </span>
                  <ArrowRight size={13} className="text-[#6A3FD0]" />
                </Link>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* =====================================================
          7. FINAL CTA BLOCK
          ===================================================== */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#F8F6FE] to-[#EFEAFB] cv-auto">
        <Container className="max-w-[860px]">
          <CTABlock
            title={
              isEn
                ? `Ready to streamline ${parentService.shortTitle.toLowerCase()} for your business in ${pageData.areaName}?`
                : `Siap merapikan ${parentService.shortTitle.toLowerCase()} untuk bisnismu di ${pageData.areaName}?`
            }
            description={
              isEn
                ? 'Tell us about your operational bottleneck or web page requirements via WhatsApp. Chesta Azka and Zeeshan will reply directly with an honest architectural recommendation.'
                : 'Ceritakan kendala operasional atau kebutuhan halaman web bisnismu lewat WhatsApp. Chesta Azka dan Zeeshan akan membalas langsung dengan saran arsitektur yang jujur.'
            }
            buttonLabel={
              isEn
                ? `Consult via WhatsApp (${pageData.areaName})`
                : `Konsultasi via WhatsApp (${pageData.areaName})`
            }
            whatsappMessage={
              isEn
                ? `Hello Chesta & Zeeshan, my business is in ${pageData.areaName} and I would like to discuss ${pageData.serviceName}.`
                : `Halo Chesta & Zeeshan, saya dari ${pageData.areaName} ingin berdiskusi mengenai ${pageData.serviceName}.`
            }
            secondaryAction={
              <Button
                to={toLocalizedHref(`/jasa/${parentService.slug}`, locale, prefixMode)}
                variant="secondary"
              >
                <span>
                  {isEn
                    ? `View ${parentService.shortTitle}`
                    : `Lihat Layanan ${parentService.shortTitle}`}
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
