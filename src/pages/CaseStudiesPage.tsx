import React, { useMemo } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  RotateCcw,
  Compass,
  Target,
  ShieldCheck,
  LayoutGrid,
  Info,
} from 'lucide-react';
import SEOMetadata from '../components/atoms/SEOMetadata';
import {
  getPublishedCaseStudies,
  getCaseStudyServiceFilters,
  CaseStudyServiceFilter,
  CaseStudyItem,
} from '../data/case-studies';
import { SITE_IMAGES } from '../config/images';
import {
  Container,
  Button,
  Badge,
  WordRevealHeading,
  Reveal,
  CTABlock,
  Breadcrumb,
  ImageWithFallback,
} from '../components/ui/DesignSystem';
import { parseLocalizedPath, toLocalizedHref, PrefixMode } from '../lib/i18n';
import { trackCaseStudyOpen } from '../lib/analytics';

const PROBLEM_READING_PRINCIPLES_ID = [
  {
    number: '01',
    icon: Compass,
    title: 'Mulai dari tugas, bukan teknologi',
    description:
      'Mulai dari tugas, bukan teknologi: kami tanya dulu pekerjaan apa yang berulang.',
  },
  {
    number: '02',
    icon: Target,
    title: 'Tulis target sebelum membangun',
    description:
      'Tulis target sebelum membangun: supaya jelas apa yang dianggap berhasil.',
  },
  {
    number: '03',
    icon: ShieldCheck,
    title: 'Serahkan ke manusia dengan sengaja',
    description:
      'Serahkan ke manusia dengan sengaja: agent dan otomasi punya batas yang ditulis.',
  },
];

const PROBLEM_READING_PRINCIPLES_EN = [
  {
    number: '01',
    icon: Compass,
    title: 'Start from the task, not the technology',
    description:
      'Start from the task, not the technology: we ask first which work repeats every day.',
  },
  {
    number: '02',
    icon: Target,
    title: 'Write targets before building',
    description:
      'Write targets before building: so it is clear what counts as working.',
  },
  {
    number: '03',
    icon: ShieldCheck,
    title: 'Hand over to humans deliberately',
    description:
      'Hand over to humans deliberately: agents and automations have written boundaries.',
  },
];

function CaseStudyHorizontalRow({
  study,
  index,
  locale,
  prefixMode,
}: {
  study: CaseStudyItem;
  index: number;
  locale: 'id' | 'en';
  prefixMode: PrefixMode;
}) {
  const isEn = locale === 'en';
  const coverAsset =
    SITE_IMAGES[study.cover as keyof typeof SITE_IMAGES] || SITE_IMAGES.ogDefault;
  const studyHref = toLocalizedHref(
    `/studi-kasus/${study.slug}`,
    locale,
    prefixMode
  );

  return (
    <Reveal delay={index * 0.06}>
      <article className="case-study-row group border-b border-[rgba(91,60,196,0.14)] first:border-t">
        <Link
          to={studyHref}
          onClick={() => trackCaseStudyOpen(study.slug, locale)}
          className="block py-8 md:py-10 px-4 sm:px-6 -mx-4 sm:-mx-6 rounded-[24px] bg-transparent hover:bg-[#F8F6FE] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[#6A3FD0]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            {/* Left Cover Image (hover scale 1.03, labeled "Ilustrasi") */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[16/10] w-full rounded-[20px] overflow-hidden bg-[#EFEAFB] border border-[rgba(91,60,196,0.14)]">
                <ImageWithFallback
                  src={coverAsset.src}
                  alt={study.coverCaption || coverAsset.alt}
                  width={coverAsset.width}
                  height={coverAsset.height}
                  priority={index === 0}
                  viewTransitionName={`case-study-cover-${study.slug}`}
                  className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#6A3FD0] text-[#FFFFFF] font-mono text-[10px] uppercase tracking-[0.08em] font-semibold">
                    {study.internalBadgeLabel}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#FFFFFF]/92 backdrop-blur-sm border border-[rgba(91,60,196,0.16)] font-mono text-[10px] uppercase tracking-[0.08em] text-[#5B5675] font-semibold">
                    {isEn ? 'Illustration' : 'Ilustrasi'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Editorial Summary */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
              {/* Industry tag, "Proyek internal" badge, reading time */}
              <div className="flex flex-wrap items-center gap-2 text-[12px] font-mono uppercase tracking-[0.08em]">
                <span className="px-2.5 py-0.5 rounded-full bg-[#EFEAFB] border border-[rgba(91,60,196,0.16)] text-[#6A3FD0] font-semibold">
                  {study.industry}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#F8F6FE] border border-[rgba(91,60,196,0.16)] text-[#17122B] font-semibold">
                  {study.internalBadgeLabel}
                </span>
                <span aria-hidden="true" className="text-[#5B5675]/40">
                  ·
                </span>
                <span className="text-[#5B5675]">{study.readingTime}</span>
              </div>

              {/* Title */}
              <h2 className="text-[20px] md:text-[24px] font-semibold tracking-[-0.02em] text-[#17122B] group-hover:text-[#6A3FD0] transition-colors leading-[1.25]">
                {study.title}
              </h2>

              {/* Two-Line "Masalah -> Yang dibangun" Preview */}
              <div className="p-4 rounded-[16px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3 text-[14px] leading-[1.55]">
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675] font-semibold shrink-0 sm:w-[116px] pt-0.5">
                    {isEn ? 'Problem' : 'Masalah'}
                  </span>
                  <p className="text-[#5B5675] line-clamp-2">{study.summary.problem}</p>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3 text-[14px] leading-[1.55] pt-2.5 border-t border-[rgba(91,60,196,0.1)]">
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold shrink-0 sm:w-[116px] pt-0.5">
                    {isEn ? 'What we built' : 'Yang dibangun'}
                  </span>
                  <p className="text-[#17122B] font-medium line-clamp-2">
                    {study.summary.built}
                  </p>
                </div>
              </div>

              {/* Bottom Row: Service Chips + Static Design Target Note + Sliding Arrow */}
              <div className="pt-1 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  {study.services.map((serviceLabel) => (
                    <span
                      key={serviceLabel}
                      className="px-3 py-1 rounded-full bg-[#EFEAFB] border border-[rgba(91,60,196,0.14)] font-mono text-[11px] text-[#5230B0] font-medium"
                    >
                      {serviceLabel}
                    </span>
                  ))}
                  {study.targets[0] && (
                    <span className="px-3 py-1 rounded-full bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] font-mono text-[11px] text-[#5B5675]">
                      {isEn ? 'Design target:' : 'Target desain:'} {study.targets[0].label}{' '}
                      <strong className="text-[#17122B]">{study.targets[0].value}</strong>
                    </span>
                  )}
                </div>

                <span className="inline-flex items-center gap-1.5 font-semibold text-[14px] text-[#6A3FD0]">
                  <span>{isEn ? 'Read full story' : 'Baca cerita lengkap'}</span>
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 ease-out group-hover:translate-x-[4px]"
                  />
                </span>
              </div>
            </div>
          </div>
        </Link>
      </article>
    </Reveal>
  );
}

export default function CaseStudiesPage() {
  const location = useLocation();
  const { locale, prefixMode } = parseLocalizedPath(location.pathname);
  const isEn = locale === 'en';

  const [searchParams] = useSearchParams();
  const allStudies = useMemo(() => getPublishedCaseStudies(locale), [locale]);
  const serviceFilters = useMemo(() => getCaseStudyServiceFilters(locale), [locale]);

  const rawService = searchParams.get('layanan') || searchParams.get('service') || 'semua';
  const activeService: CaseStudyServiceFilter = serviceFilters.some(
    (s) => s.id === rawService
  )
    ? (rawService as CaseStudyServiceFilter)
    : 'semua';

  const filteredStudies = useMemo(() => {
    return allStudies.filter((study) => {
      if (activeService === 'semua') return true;
      return study.serviceSlugs.includes(activeService);
    });
  }, [allStudies, activeService]);

  const isFiltered = activeService !== 'semua';

  const caseStudiesHref = toLocalizedHref('/studi-kasus', locale, prefixMode);
  const principles = isEn
    ? PROBLEM_READING_PRINCIPLES_EN
    : PROBLEM_READING_PRINCIPLES_ID;

  const pageTitle = isEn
    ? 'The Stories Behind the Projects — Case Studies | CHESTAADOTCOM'
    : 'Cerita di Balik Proyeknya — Studi Kasus | CHESTAADOTCOM';
  const pageDescription = isEn
    ? 'Internal CHESTAADOTCOM case studies explaining the problem, architectural decisions, system flows, and design targets before client deployment.'
    : 'Kumpulan studi kasus proyek internal CHESTAADOTCOM yang menjelaskan masalah, keputusan arsitektur, alur sistem, dan target desain kami.';

  const jsonLdGraph = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          '@id': `https://chestaa.com${caseStudiesHref}#collection`,
          url: `https://chestaa.com${caseStudiesHref}`,
          name: pageTitle,
          description: pageDescription,
          inLanguage: isEn ? 'en' : 'id-ID',
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: allStudies.map((study, idx) => ({
              '@type': 'ListItem',
              position: idx + 1,
              url: `https://chestaa.com${toLocalizedHref(`/studi-kasus/${study.slug}`, locale, prefixMode)}`,
              name: study.title,
              description: `${study.summary.problem} ${study.summary.built}`,
            })),
          },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `https://chestaa.com${caseStudiesHref}#breadcrumb`,
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: isEn ? 'Home' : 'Beranda',
              item: `https://chestaa.com${toLocalizedHref('/', locale, prefixMode)}`,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: isEn ? 'Case Studies' : 'Studi Kasus',
              item: `https://chestaa.com${caseStudiesHref}`,
            },
          ],
        },
      ],
    }),
    [allStudies, caseStudiesHref, isEn, locale, pageDescription, pageTitle, prefixMode]
  );

  return (
    <div className="bg-[#FFFFFF] text-[#17122B] min-h-screen">
      <SEOMetadata
        title={pageTitle}
        description={pageDescription}
        path={caseStudiesHref}
        jsonLd={jsonLdGraph}
      />

      {/* =====================================================
          1. EDITORIAL HEADER + HONESTY DISCLOSURE STRIP
          ===================================================== */}
      <section className="pt-28 pb-12 md:pt-36 md:pb-16 bg-gradient-to-b from-[#FFFFFF] via-[#F8F6FE] to-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)]">
        <Container className="space-y-8">
          <div>
            <Breadcrumb items={[{ label: isEn ? 'Case Studies' : 'Studi Kasus' }]} />

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-2xl space-y-3">
                <Badge variant="tint">
                  {isEn ? 'Internal project' : 'Proyek internal'}
                </Badge>
                <WordRevealHeading
                  as="h1"
                  priority
                  text={
                    isEn
                      ? 'The stories behind the projects'
                      : 'Cerita di balik proyeknya'
                  }
                />
                <p className="text-[15px] md:text-[16px] text-[#5B5675] leading-[1.65]">
                  {isEn
                    ? 'Projects we built ourselves to test the workflows. Each story explains the problem, the decisions, and the trade-offs we made.'
                    : 'Proyek yang kami bangun sendiri untuk menguji alurnya. Setiap cerita menjelaskan masalah, keputusan, dan hal yang kami kompromikan.'}
                </p>
              </div>

              <div className="shrink-0">
                <Button
                  to={toLocalizedHref('/portfolio', locale, prefixMode)}
                  variant="secondary"
                >
                  <LayoutGrid size={15} className="text-[#6A3FD0]" />
                  <span>
                    {isEn
                      ? 'View visual portfolio showcase'
                      : 'Lihat galeri visual portofolio'}
                  </span>
                </Button>
              </div>
            </div>
          </div>

          {/* Mandatory Disclosure Strip right under the index header */}
          <div
            role="note"
            aria-label={isEn ? 'Internal project disclosure' : 'Keterangan proyek internal'}
            className="p-4 md:p-5 rounded-[20px] bg-[#EFEAFB]/75 border border-[rgba(91,60,196,0.2)] flex items-start gap-3.5"
          >
            <span className="w-8 h-8 rounded-full bg-[#FFFFFF] border border-[rgba(91,60,196,0.18)] flex items-center justify-center text-[#6A3FD0] shrink-0 mt-0.5">
              <Info size={16} />
            </span>
            <div className="space-y-1">
              <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold">
                {isEn
                  ? 'INTERNAL PROJECT DISCLOSURE · DESIGN TARGETS ONLY'
                  : 'KETERANGAN PROYEK INTERNAL · TARGET DESAIN'}
              </span>
              <p className="text-[14px] md:text-[15px] text-[#17122B] leading-[1.6]">
                {isEn
                  ? 'All case studies on this page are CHESTAADOTCOM internal projects, not client projects. We built them ourselves to test the workflows before using them for clients.'
                  : 'Semua studi kasus di halaman ini adalah proyek internal CHESTAADOTCOM, bukan proyek klien. Kami membangunnya sendiri untuk menguji alurnya sebelum dipakai klien.'}
              </p>
              <p className="text-[13.5px] text-[#6A3FD0] font-medium pt-1">
                <Link
                  to={toLocalizedHref('/about', locale, prefixMode)}
                  className="hover:underline inline-flex items-center gap-1"
                >
                  <span>
                    {isEn
                      ? 'Our real project experience is on the About page.'
                      : 'Pengalaman proyek nyata kami ada di halaman Tentang.'}
                  </span>
                  <ArrowUpRight size={14} />
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          2. PLAIN-LINK SERVICE FILTER CHIPS & HORIZONTAL LIST ROWS
          ===================================================== */}
      <section className="py-12 md:py-20 bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)]">
        <Container className="space-y-8">
          {/* Service Filter Chips as Plain Links */}
          <div className="p-4 md:p-5 rounded-[20px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <nav
              aria-label={isEn ? 'Filter case studies by service' : 'Filter studi kasus berdasarkan layanan'}
              className="flex flex-wrap items-center gap-2"
            >
              {serviceFilters.map((serviceFilter) => {
                const isActive = activeService === serviceFilter.id;
                const paramName = isEn ? 'service' : 'layanan';
                const filterHref =
                  serviceFilter.id === 'semua'
                    ? caseStudiesHref
                    : `${caseStudiesHref}?${paramName}=${serviceFilter.id}`;

                return (
                  <Link
                    key={serviceFilter.id}
                    to={filterHref}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative min-h-[40px] px-4 py-2 rounded-full text-[13px] md:text-[14px] font-semibold whitespace-nowrap transition-all duration-200 inline-flex items-center ${
                      isActive
                        ? 'bg-[#6A3FD0] text-[#FFFFFF] shadow-[0_6px_16px_rgba(106,63,208,0.22)]'
                        : 'bg-[#FFFFFF] text-[#5B5675] hover:text-[#17122B] border border-[rgba(91,60,196,0.14)]'
                    }`}
                  >
                    <span>{serviceFilter.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-3 shrink-0">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675]">
                {isEn
                  ? `${filteredStudies.length} internal case studies`
                  : `${filteredStudies.length} studi kasus internal`}
              </span>

              {isFiltered && (
                <Link
                  to={caseStudiesHref}
                  className="inline-flex items-center gap-1 min-h-[36px] px-3 rounded-full bg-[#EFEAFB] text-[#6A3FD0] text-[12px] font-semibold hover:bg-[#6A3FD0] hover:text-[#FFFFFF] transition-colors"
                >
                  <RotateCcw size={12} />
                  <span>{isEn ? 'Reset' : 'Reset'}</span>
                </Link>
              )}
            </div>
          </div>

          {/* Horizontal List Rows */}
          <div>
            {filteredStudies.length > 0 ? (
              <div className="divide-y divide-[rgba(91,60,196,0.14)]">
                {filteredStudies.map((study, index) => (
                  <CaseStudyHorizontalRow
                    key={study.slug}
                    study={study}
                    index={index}
                    locale={locale}
                    prefixMode={prefixMode}
                  />
                ))}
              </div>
            ) : (
              <div
                key="empty-case-studies"
                className="p-10 md:p-14 rounded-[24px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] text-center max-w-xl mx-auto space-y-4"
              >
                <Badge variant="tint">
                  {isEn ? 'Internal project' : 'Proyek internal'}
                </Badge>
                <h2 className="text-[20px] md:text-[24px] text-[#17122B]">
                  {isEn
                    ? 'No internal case studies in this service filter yet'
                    : 'Belum ada studi kasus internal pada filter layanan ini'}
                </h2>
                <p className="text-[15px] text-[#5B5675] leading-[1.65]">
                  {isEn
                    ? 'Select All to read our three complete internal case studies or browse all six projects in the visual portfolio.'
                    : 'Pilih Semua untuk membaca tiga cerita studi kasus internal kami atau lihat keenam proyek di halaman portofolio visual.'}
                </p>
                <div className="pt-2 flex flex-wrap justify-center gap-3">
                  <Button to={caseStudiesHref} variant="primary">
                    <RotateCcw size={15} />
                    <span>
                      {isEn
                        ? 'Show all case studies'
                        : 'Tampilkan semua studi kasus'}
                    </span>
                  </Button>
                  <Button
                    to={toLocalizedHref('/portfolio', locale, prefixMode)}
                    variant="secondary"
                  >
                    <span>
                      {isEn ? 'Open visual portfolio' : 'Buka portofolio visual'}
                    </span>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* =====================================================
          3. "CARA KAMI MEMBACA MASALAH" STRIP (3 ITEMS)
          ===================================================== */}
      <section className="py-16 md:py-24 bg-[#F8F6FE] border-b border-[rgba(91,60,196,0.14)]">
        <Container className="space-y-10">
          <Reveal>
            <div className="max-w-2xl space-y-2">
              <span className="block font-mono text-[11px] md:text-[12px] uppercase tracking-[0.08em] font-semibold text-[#6A3FD0]">
                {isEn ? 'HOW WE READ PROBLEMS' : 'CARA KAMI MEMBACA MASALAH'}
              </span>
              <h2>
                {isEn
                  ? 'How we read problems'
                  : 'Cara kami membaca masalah'}
              </h2>
              <p className="text-[15px] md:text-[16px] text-[#5B5675] leading-[1.65]">
                {isEn
                  ? 'Three working rules we apply when designing every internal project and client workflow.'
                  : 'Tiga pegangan yang kami pakai saat merancang setiap proyek internal maupun alur kerja klien.'}
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {principles.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <Reveal key={item.number} delay={idx * 0.06} className="h-full">
                  <div className="h-full p-6 rounded-[24px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="w-10 h-10 rounded-[14px] bg-[#EFEAFB] border border-[rgba(91,60,196,0.14)] flex items-center justify-center text-[#6A3FD0]">
                          <IconComponent size={18} />
                        </span>
                        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675] font-semibold">
                          {item.number}
                        </span>
                      </div>
                      <h3 className="text-[18px] font-semibold text-[#17122B] leading-[1.35]">
                        {item.title}
                      </h3>
                      <p className="text-[14px] md:text-[15px] text-[#5B5675] leading-[1.65]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* =====================================================
          4. BOTTOM CTA BLOCK
          ===================================================== */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#FFFFFF] to-[#EFEAFB]">
        <Container className="max-w-[860px]">
          <CTABlock
            title={
              isEn
                ? 'Want to discuss a similar workflow for your business?'
                : 'Ingin mendiskusikan alur kerja serupa untuk bisnismu?'
            }
            description={
              isEn
                ? 'Tell us which repetitive task takes up your team’s hours. We start with a free 30-minute audit via WhatsApp or video call.'
                : 'Ceritakan pekerjaan berulang yang paling sering menyita waktu timmu. Kita mulai dari audit gratis 30 menit lewat WhatsApp atau video call.'
            }
            whatsappContext={{ type: 'default', url: caseStudiesHref }}
          />
        </Container>
      </section>
    </div>
  );
}