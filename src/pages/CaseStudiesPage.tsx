import React, { useMemo } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  Filter,
  RotateCcw,
  Compass,
  Scale,
  Clock,
  LayoutGrid,
} from 'lucide-react';
import SEOMetadata from '../components/atoms/SEOMetadata';
import {
  getPublishedCaseStudies,
  getCaseStudyIndustries,
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
import { parseLocalizedPath, toLocalizedHref } from '../lib/i18n';

const PROBLEM_READING_PRINCIPLES_ID = [
  {
    number: '01',
    icon: Compass,
    title: 'Cari titik macet di lapangan, bukan sekadar ganti tampilan',
    description:
      'Kami mulai dengan mengamati di mana staf kamu paling sering salah salin data, menunggu konfirmasi, atau kewalahan membalas chat berulang.',
  },
  {
    number: '02',
    icon: Scale,
    title: 'Jujur soal kompromi teknis (trade-off)',
    description:
      'Setiap pilihan arsitektur punya konsekuensi. Kami jelaskan sejak awal mana bagian yang bisa diotomasi penuh dan mana yang tetap butuh keputusan manusia.',
  },
  {
    number: '03',
    icon: Clock,
    title: 'Ukur dari jam kerja tim yang kembali produktif',
    description:
      'Keberhasilan sistem diukur dari berkurangnya pekerjaan lembur administratif dan cepatnya pelanggan kamu mendapat kepastian layanan.',
  },
];

const PROBLEM_READING_PRINCIPLES_EN = [
  {
    number: '01',
    icon: Compass,
    title: 'Find on-the-ground bottlenecks, not just a surface redesign',
    description:
      'We start by observing where your staff most frequently mis-copy data, wait for confirmations, or get overwhelmed replying to repetitive chats.',
  },
  {
    number: '02',
    icon: Scale,
    title: 'Honest about technical trade-offs',
    description:
      'Every architecture choice has consequences. We explain upfront which parts can be fully automated and which still require human judgment.',
  },
  {
    number: '03',
    icon: Clock,
    title: 'Measure by productive team hours reclaimed',
    description:
      'System success is measured by reduced administrative overtime and how fast your customers get reliable service confirmation.',
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
  prefixMode: 'default' | 'ind' | 'eng';
}) {
  const isEn = locale === 'en';
  const coverAsset =
    SITE_IMAGES[study.cover as keyof typeof SITE_IMAGES] || SITE_IMAGES.ogDefault;
  const studyHref = toLocalizedHref(
    `/case-studies/${study.slug}`,
    locale,
    prefixMode
  );

  return (
    <article className="case-study-row group border-b border-[rgba(91,60,196,0.14)] first:border-t">
      <Link
        to={studyHref}
        className="block py-8 md:py-10 px-4 sm:px-6 -mx-4 sm:-mx-6 rounded-[24px] bg-transparent hover:bg-[#F8F6FE] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[#6A3FD0]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Left Cover Image */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[16/10] w-full rounded-[20px] overflow-hidden bg-[#EFEAFB] border border-[rgba(91,60,196,0.14)]">
              <ImageWithFallback
                src={coverAsset.src}
                alt={coverAsset.alt}
                width={coverAsset.width}
                height={coverAsset.height}
                priority={index === 0}
                viewTransitionName={`case-study-cover-${study.slug}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#FFFFFF]/92 backdrop-blur-sm border border-[rgba(91,60,196,0.16)] font-mono text-[10px] uppercase tracking-[0.08em] text-[#5B5675] font-semibold">
                  {study.duration}
                </span>
              </div>
            </div>
          </div>

          {/* Right Editorial Summary */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            {/* Industry & Year Meta */}
            <div className="flex flex-wrap items-center gap-2 text-[12px] font-mono uppercase tracking-[0.08em]">
              <span className="text-[#6A3FD0] font-semibold">{study.industry}</span>
              <span aria-hidden="true" className="text-[#5B5675]/40">
                ·
              </span>
              <span className="text-[#5B5675]">{study.year}</span>
              <span aria-hidden="true" className="text-[#5B5675]/40">
                ·
              </span>
              <span className="text-[#5B5675]">{study.client}</span>
            </div>

            {/* Title */}
            <h2 className="text-[20px] md:text-[24px] font-semibold tracking-[-0.02em] text-[#17122B] group-hover:text-[#6A3FD0] transition-colors leading-[1.25]">
              {study.title}
            </h2>

            {/* Two-Line "Masalah -> Hasil" Preview */}
            <div className="p-4 rounded-[16px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] space-y-2.5">
              <div className="flex items-start gap-2.5 text-[14px] leading-[1.55]">
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675] font-semibold shrink-0 w-[68px] pt-0.5">
                  {isEn ? 'Problem' : 'Masalah'}
                </span>
                <p className="text-[#5B5675] line-clamp-1">{study.summary.problem}</p>
              </div>
              <div className="flex items-start gap-2.5 text-[14px] leading-[1.55] pt-2 border-t border-[rgba(91,60,196,0.1)]">
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold shrink-0 w-[68px] pt-0.5">
                  {isEn ? 'Outcome' : 'Hasil'}
                </span>
                <p className="text-[#17122B] font-medium line-clamp-1">
                  {study.summary.result}
                </p>
              </div>
            </div>

            {/* Bottom Row: Service Chips + Sliding Arrow */}
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
              </div>

              <span className="inline-flex items-center gap-1.5 font-semibold text-[14px] text-[#6A3FD0]">
                <span>{isEn ? 'Read full story' : 'Baca cerita lengkap'}</span>
                <ArrowRight
                  size={16}
                  className="icon-slide-hover transition-transform duration-200 ease-out"
                />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default function CaseStudiesPage() {
  const location = useLocation();
  const { locale, prefixMode } = parseLocalizedPath(location.pathname);
  const isEn = locale === 'en';
  const allIndustryLabel = isEn ? 'All Industries' : 'Semua Industri';

  const [searchParams, setSearchParams] = useSearchParams();
  const allStudies = useMemo(() => getPublishedCaseStudies(locale), [locale]);
  const industries = useMemo(() => getCaseStudyIndustries(locale), [locale]);
  const serviceFilters = useMemo(() => getCaseStudyServiceFilters(locale), [locale]);

  const rawService = searchParams.get('layanan') || 'semua';
  const activeService: CaseStudyServiceFilter = serviceFilters.some(
    (s) => s.id === rawService
  )
    ? (rawService as CaseStudyServiceFilter)
    : 'semua';

  const rawIndustry = searchParams.get('industri') || allIndustryLabel;
  const activeIndustry = industries.includes(rawIndustry)
    ? rawIndustry
    : allIndustryLabel;

  const handleServiceChange = (serviceId: CaseStudyServiceFilter) => {
    const nextParams = new URLSearchParams(searchParams);
    if (serviceId === 'semua') {
      nextParams.delete('layanan');
    } else {
      nextParams.set('layanan', serviceId);
    }
    setSearchParams(nextParams, { replace: true });
  };

  const handleIndustryChange = (industryValue: string) => {
    const nextParams = new URLSearchParams(searchParams);
    if (industryValue === allIndustryLabel) {
      nextParams.delete('industri');
    } else {
      nextParams.set('industri', industryValue);
    }
    setSearchParams(nextParams, { replace: true });
  };

  const handleResetFilters = () => {
    setSearchParams({}, { replace: true });
  };

  const filteredStudies = useMemo(() => {
    return allStudies.filter((study) => {
      const matchService =
        activeService === 'semua' || study.serviceSlugs.includes(activeService);
      const matchIndustry =
        activeIndustry === allIndustryLabel || study.industry === activeIndustry;
      return matchService && matchIndustry;
    });
  }, [allStudies, activeService, activeIndustry, allIndustryLabel]);

  const isFiltered =
    activeService !== 'semua' || activeIndustry !== allIndustryLabel;

  const caseStudiesHref = toLocalizedHref('/case-studies', locale, prefixMode);
  const principles = isEn
    ? PROBLEM_READING_PRINCIPLES_EN
    : PROBLEM_READING_PRINCIPLES_ID;

  const jsonLdGraph = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          '@id': `https://chestaa.com${caseStudiesHref}#collection`,
          url: `https://chestaa.com${caseStudiesHref}`,
          name: isEn
            ? 'The Stories Behind the Projects — Custom Software & AI Agent Case Studies | CHESTAADOTCOM'
            : 'Cerita di Balik Proyeknya — Studi Kasus Software & AI Agent | CHESTAADOTCOM',
          description: isEn
            ? 'In-depth case studies on how we map operational bottlenecks, make architectural trade-offs, and build AI agents and custom software.'
            : 'Kumpulan studi kasus mendalam tentang bagaimana kami memetakan masalah operasional, mengambil keputusan arsitektur, dan membangun sistem AI agent serta software custom.',
          inLanguage: isEn ? 'en' : 'id-ID',
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: allStudies.map((study, idx) => ({
              '@type': 'ListItem',
              position: idx + 1,
              url: `https://chestaa.com${toLocalizedHref(`/case-studies/${study.slug}`, locale, prefixMode)}`,
              name: study.title,
              description: `${study.summary.problem} ${study.summary.result}`,
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
    [allStudies, caseStudiesHref, isEn, locale, prefixMode]
  );

  return (
    <div className="bg-[#FFFFFF] text-[#17122B] min-h-screen">
      <SEOMetadata
        title={
          isEn
            ? 'The Stories Behind the Projects — Custom Software & AI Agent Case Studies | CHESTAADOTCOM'
            : 'Cerita di Balik Proyeknya — Studi Kasus Software & AI Agent | CHESTAADOTCOM'
        }
        description={
          isEn
            ? 'Read the in-depth stories behind every CHESTAADOTCOM project: initial operational bottlenecks, technical approach, architecture trade-offs, and field impact.'
            : 'Baca cerita mendalam di balik setiap proyek CHESTAADOTCOM: masalah operasional awal, pendekatan teknis, kompromi arsitektur, dan dampak di lapangan.'
        }
        path={caseStudiesHref}
        jsonLd={jsonLdGraph}
      />

      {/* =====================================================
          1. COMPACT EDITORIAL HEADER
          ===================================================== */}
      <section className="pt-28 pb-12 md:pt-36 md:pb-16 bg-gradient-to-b from-[#FFFFFF] via-[#F8F6FE] to-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)]">
        <Container>
          <Breadcrumb items={[{ label: isEn ? 'Case Studies' : 'Studi Kasus' }]} />

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <Badge variant="tint">
                {isEn
                  ? 'IN-DEPTH CASE STUDIES · VERIFIED RESULTS'
                  : 'STUDI KASUS MENDALAM · HASIL TERVERIFIKASI'}
              </Badge>
              <h1>
                {isEn
                  ? 'The stories behind the projects'
                  : 'Cerita di balik proyeknya'}
              </h1>
              <p className="text-[15px] md:text-[16px] text-[#5B5675] leading-[1.65]">
                {isEn
                  ? 'Not just screenshots, but honest field notes on how we dissect your operational bottlenecks, choose technical trade-offs, and test the results on the ground.'
                  : 'Bukan sekadar tangkapan layar, melainkan catatan jujur bagaimana kami membedah masalah operasional kamu, memilih kompromi teknis, dan menguji hasilnya di lapangan.'}
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
                    ? 'View visual portfolio gallery'
                    : 'Lihat galeri visual portofolio'}
                </span>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          2. URL-SYNCED FILTER BAR & HORIZONTAL LIST ROWS
          ===================================================== */}
      <section className="py-12 md:py-20 bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)]">
        <Container className="space-y-8">
          {/* Filter Bar: Service Chips + Industry Dropdown */}
          <div className="p-4 md:p-5 rounded-[20px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Service Filter Chips */}
            <div
              role="group"
              aria-label={isEn ? 'Filter by service' : 'Filter berdasarkan layanan'}
              className="flex flex-wrap items-center gap-2"
            >
              {serviceFilters.map((serviceFilter) => {
                const isActive = activeService === serviceFilter.id;
                return (
                  <button
                    key={serviceFilter.id}
                    type="button"
                    onClick={() => handleServiceChange(serviceFilter.id)}
                    aria-pressed={isActive}
                    className={`relative min-h-[40px] px-4 py-1.5 rounded-full text-[13px] md:text-[14px] font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer active:scale-[0.98] ${
                      isActive
                        ? 'bg-[#6A3FD0] text-[#FFFFFF] shadow-[0_6px_16px_rgba(106,63,208,0.22)]'
                        : 'bg-[#FFFFFF] text-[#5B5675] hover:text-[#17122B] border border-[rgba(91,60,196,0.14)]'
                    }`}
                  >
                    <span className="relative z-10">{serviceFilter.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Industry Select + Result Count */}
            <div className="flex flex-wrap items-center justify-between lg:justify-end gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-[rgba(91,60,196,0.12)]">
              <div className="flex items-center gap-2">
                <Filter size={14} className="text-[#6A3FD0] shrink-0" />
                <label htmlFor="case-study-industry-select" className="sr-only">
                  {isEn ? 'Filter Industry' : 'Filter Industri'}
                </label>
                <select
                  id="case-study-industry-select"
                  value={activeIndustry}
                  onChange={(e) => handleIndustryChange(e.target.value)}
                  className="min-h-[40px] pl-3.5 pr-8 rounded-full bg-[#FFFFFF] border border-[rgba(91,60,196,0.18)] text-[13px] font-medium text-[#17122B] focus:outline-none focus:border-[#6A3FD0] cursor-pointer"
                >
                  {industries.map((ind) => (
                    <option key={ind} value={ind}>
                      {ind}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675]">
                  {isEn
                    ? `${filteredStudies.length} case studies`
                    : `${filteredStudies.length} studi kasus`}
                </span>

                {isFiltered && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="inline-flex items-center gap-1 min-h-[36px] px-3 rounded-full bg-[#EFEAFB] text-[#6A3FD0] text-[12px] font-semibold hover:bg-[#6A3FD0] hover:text-[#FFFFFF] transition-colors cursor-pointer"
                  >
                    <RotateCcw size={12} />
                    <span>{isEn ? 'Reset' : 'Reset'}</span>
                  </button>
                )}
              </div>
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
                className="p-10 md:p-14 rounded-[24px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] text-center max-w-xl mx-auto space-y-4 transition-opacity duration-300"
              >
                <Badge variant="tint">
                  {isEn ? 'NO FILTER RESULTS' : 'TIDAK ADA HASIL FILTER'}
                </Badge>
                <h2 className="text-[20px] md:text-[24px] text-[#17122B]">
                  {isEn
                    ? 'No case studies match this filter combination yet'
                    : 'Belum ada studi kasus untuk kombinasi filter ini'}
                </h2>
                <p className="text-[15px] text-[#5B5675] leading-[1.65]">
                  {isEn
                    ? 'Try selecting another service or show all industries to read our available project breakdowns.'
                    : 'Coba pilih layanan lain atau tampilkan semua industri untuk membaca cerita pengerjaan proyek yang sudah tersedia.'}
                </p>
                <div className="pt-2 flex justify-center">
                  <Button onClick={handleResetFilters} variant="primary">
                    <RotateCcw size={15} />
                    <span>
                      {isEn
                        ? 'Show all case studies'
                        : 'Tampilkan semua studi kasus'}
                    </span>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* =====================================================
          3. "CARA KAMI MEMBACA MASALAH" STRIP (3 PRINCIPLES)
          ===================================================== */}
      <section className="py-16 md:py-24 bg-[#F8F6FE] border-b border-[rgba(91,60,196,0.14)]">
        <Container className="space-y-10">
          <div className="max-w-2xl space-y-2">
            <span className="block font-mono text-[11px] md:text-[12px] uppercase tracking-[0.08em] font-semibold text-[#6A3FD0]">
              {isEn ? 'OUR ENGINEERING APPROACH' : 'PENDEKATAN KERJA KAMI'}
            </span>
            <h2>
              {isEn
                ? 'How we read bottlenecks in your business'
                : 'Cara kami membaca masalah di bisnismu'}
            </h2>
            <p className="text-[15px] md:text-[16px] text-[#5B5675] leading-[1.65]">
              {isEn
                ? 'Three simple principles we always follow before writing a single line of code for your team.'
                : 'Tiga pegangan sederhana yang selalu kami pakai sebelum menulis satu baris kode pun untuk tim kamu.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {principles.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.number}
                  className="p-6 rounded-[24px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="w-10 h-10 rounded-[14px] bg-[#EFEAFB] border border-[rgba(91,60,196,0.14)] flex items-center justify-center text-[#6A3FD0]">
                        <IconComponent size={18} />
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675] font-semibold">
                        {isEn ? `PRINCIPLE ${item.number}` : `PRINSIP ${item.number}`}
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
              );
            })}
          </div>
        </Container>
      </section>

      {/* =====================================================
          4. FINAL CTA BLOCK
          ===================================================== */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#FFFFFF] to-[#EFEAFB]">
        <Container className="max-w-[860px]">
          <CTABlock
            title={
              isEn
                ? 'Have operational bottlenecks similar to the stories above?'
                : 'Punya kendala operasional yang mirip dengan cerita di atas?'
            }
            description={
              isEn
                ? 'Tell us which workflow eats up your staff’s time the most. We will dissect the solution together in a free 30-minute consultation.'
                : 'Ceritakan alur kerja yang paling sering menyita waktu staf kamu. Kita bedah bersama solusinya dalam sesi konsultasi gratis 30 menit.'
            }
            buttonLabel={
              isEn
                ? 'Free consultation via WhatsApp'
                : 'Konsultasi gratis via WhatsApp'
            }
            whatsappMessage={
              isEn
                ? 'Hi Chesta & Zeeshan, I just read the Case Studies page (/eng/case-studies) and would like to discuss operational bottlenecks in my business.'
                : 'Halo Chesta & Zeeshan, saya baru membaca halaman Studi Kasus (/case-studies) dan ingin mendiskusikan kendala operasional di bisnis saya.'
            }
          />
        </Container>
      </section>
    </div>
  );
}