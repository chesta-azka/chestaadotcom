import React, { useMemo } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Filter,
  RotateCcw,
  Layers,
  ShieldCheck,
} from 'lucide-react';
import SEOMetadata from '../components/atoms/SEOMetadata';
import {
  getPublishedProjects,
  getPortfolioIndustries,
  getPortfolioCategories,
  PortfolioProject,
  ProjectCategory,
} from '../data/projects';
import {
  REAL_PROJECTS_EXPERIENCE,
  RealProjectExperience,
  getRealProjectHref,
} from '../data/experience';
import {
  Container,
  Button,
  Card,
  Badge,
  WordRevealHeading,
  Reveal,
  CTABlock,
  Breadcrumb,
  ImageWithFallback,
} from '../components/ui/DesignSystem';
import { parseLocalizedPath, toLocalizedHref, PrefixMode } from '../lib/i18n';
import { getImageMeta } from '../config/images';

export default function PortfolioPage() {
  const location = useLocation();
  const { locale, prefixMode } = parseLocalizedPath(location.pathname);
  const isEn = locale === 'en';
  const allIndustryLabel = isEn ? 'All Industries' : 'Semua Industri';

  const [searchParams, setSearchParams] = useSearchParams();
  const allProjects = useMemo(() => getPublishedProjects(locale), [locale]);
  const industries = useMemo(() => getPortfolioIndustries(locale), [locale]);
  const categories = useMemo(() => getPortfolioCategories(locale), [locale]);

  const rawCategory = searchParams.get('kategori') || 'semua';
  const activeCategory: 'semua' | ProjectCategory = categories.some(
    (c) => c.id === rawCategory
  )
    ? (rawCategory as 'semua' | ProjectCategory)
    : 'semua';

  const rawIndustry = searchParams.get('industri') || allIndustryLabel;
  const activeIndustry = industries.includes(rawIndustry) ? rawIndustry : allIndustryLabel;

  const handleCategoryChange = (categoryId: 'semua' | ProjectCategory) => {
    const nextParams = new URLSearchParams(searchParams);
    if (categoryId === 'semua') {
      nextParams.delete('kategori');
    } else {
      nextParams.set('kategori', categoryId);
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

  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const matchCategory =
        activeCategory === 'semua' || project.category === activeCategory;
      const matchIndustry =
        activeIndustry === allIndustryLabel || project.industry === activeIndustry;
      return matchCategory && matchIndustry;
    });
  }, [allProjects, activeCategory, activeIndustry, allIndustryLabel]);

  const portfolioHref = toLocalizedHref('/portfolio', locale, prefixMode);

  const jsonLdGraph = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          '@id': `https://chestaa.com${portfolioHref}#collection`,
          url: `https://chestaa.com${portfolioHref}`,
          name: isEn
            ? 'Real & Sample Projects — Software & AI | CHESTAADOTCOM'
            : 'Proyek Nyata & Contoh Proyek Sistem | CHESTAADOTCOM',
          description: isEn
            ? 'Real projects (client kept confidential) and sample projects built by CHESTAADOTCOM: beverage recording systems, boarding school operations, warehouse systems, and AI agents in BSD, South Tangerang.'
            : 'Daftar proyek nyata (klien dirahasiakan) dan contoh proyek CHESTAADOTCOM: sistem brand minuman, sistem pondok pesantren, gudang logistik, dan AI agent di BSD, Tangerang Selatan.',
          inLanguage: isEn ? 'en' : 'id-ID',
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: [
              ...REAL_PROJECTS_EXPERIENCE.map((realItem, idx) => ({
                '@type': 'ListItem',
                position: idx + 1,
                url: `https://chestaa.com${getRealProjectHref(realItem, locale)}`,
                name: isEn ? realItem.titleEn : realItem.titleId,
                description: isEn ? realItem.oneLinerEn : realItem.oneLinerId,
              })),
              ...allProjects.map((project, idx) => ({
                '@type': 'ListItem',
                position: REAL_PROJECTS_EXPERIENCE.length + idx + 1,
                url: `https://chestaa.com${toLocalizedHref(`/portfolio/${project.slug}`, locale, prefixMode)}`,
                name: project.title,
                description: project.oneLiner,
              })),
            ],
          },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `https://chestaa.com${portfolioHref}#breadcrumb`,
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
              name: isEn ? 'Projects' : 'Proyek',
              item: `https://chestaa.com${portfolioHref}`,
            },
          ],
        },
      ],
    }),
    [allProjects, isEn, locale, portfolioHref, prefixMode]
  );

  return (
    <div className="bg-[#FFFFFF] text-[#17122B] min-h-screen">
      <SEOMetadata
        title={
          isEn
            ? 'Real & Sample Projects — Software & AI | CHESTAADOTCOM'
            : 'Proyek Nyata & Contoh Proyek Sistem | CHESTAADOTCOM'
        }
        description={
          isEn
            ? 'Real projects (client kept confidential) and sample projects built by CHESTAADOTCOM: beverage recording systems, boarding school operations, warehouse systems, and AI agents in BSD, South Tangerang.'
            : 'Daftar proyek nyata (klien dirahasiakan) dan contoh proyek CHESTAADOTCOM: sistem brand minuman, sistem pondok pesantren, gudang logistik, dan AI agent di BSD, Tangerang Selatan.'
        }
        path={portfolioHref}
        jsonLd={jsonLdGraph}
      />

      {/* =====================================================
          1. COMPACT HEADER
          ===================================================== */}
      <section className="pt-28 pb-12 md:pt-36 md:pb-16 bg-gradient-to-b from-[#FFFFFF] via-[#F8F6FE] to-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)]">
        <Container>
          <Breadcrumb items={[{ label: isEn ? 'Projects' : 'Proyek' }]} />

          <div className="max-w-3xl space-y-4">
            <Badge variant="tint">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6A3FD0]" />
              <span>
                {isEn
                  ? 'PROJECTS · CHESTAADOTCOM'
                  : 'PROYEK · CHESTAADOTCOM'}
              </span>
            </Badge>

            <WordRevealHeading
              as="h1"
              priority
              text={
                isEn
                  ? 'Real projects and sample projects we have built'
                  : 'Proyek nyata dan contoh proyek yang kami bangun'
              }
            />

            <p className="text-[15px] md:text-[16px] text-[#5B5675] leading-[1.65]">
              {isEn
                ? 'We separate real client engagements (with client identities kept confidential) from sample projects designed to show our workflow across websites, WhatsApp AI agents, custom software, and automation.'
                : 'Kami memisahkan pengalaman proyek nyata (dengan identitas klien dirahasiakan) dan contoh proyek yang dirancang untuk memperlihatkan alur kerja kami di website, AI agent WhatsApp, software custom, serta otomasi.'}
            </p>
          </div>
        </Container>
      </section>

      {/* =====================================================
          2. GROUP 1: "PROYEK NYATA" / "REAL PROJECTS" (3 TEXT CARDS + ABSTRACT ILLUSTRATION)
          ===================================================== */}
      <section
        id="proyek-nyata"
        className="py-16 md:py-20 bg-[#F8F6FE] border-b border-[rgba(91,60,196,0.14)]"
      >
        <Container className="space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.08em] font-semibold text-[#6A3FD0]">
              {isEn
                ? 'REAL PROJECT · CLIENT KEPT CONFIDENTIAL'
                : 'PROYEK NYATA · KLIEN DIRAHASIAKAN'}
            </span>
            <h2 className="text-[24px] md:text-[30px] font-semibold text-[#17122B] tracking-[-0.02em]">
              {isEn ? 'Real projects' : 'Proyek nyata'}
            </h2>
            <p className="text-[15px] text-[#5B5675] leading-[1.65]">
              {isEn
                ? 'Real systems our team has worked on. Client names and operational data are kept confidential.'
                : 'Sistem nyata yang pernah dikerjakan tim kami. Nama klien dan data operasional dirahasiakan.'}
            </p>
          </div>

          <Reveal staggerSelector=".real-project-card">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {REAL_PROJECTS_EXPERIENCE.map((item) => (
                <RealProjectCard
                  key={item.id}
                  item={item}
                  locale={locale}
                />
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* =====================================================
          3. GROUP 2: "CONTOH PROYEK" / "SAMPLE PROJECTS"
          ===================================================== */}
      <section
        id="contoh-proyek"
        className="py-16 md:py-24 bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)]"
      >
        <Container className="space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <span className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.08em] font-semibold text-[#6A3FD0]">
                {isEn ? 'SAMPLE PROJECTS' : 'CONTOH PROYEK'}
              </span>
              <h2 className="text-[24px] md:text-[30px] font-semibold text-[#17122B] tracking-[-0.02em]">
                {isEn ? 'Sample projects' : 'Contoh proyek'}
              </h2>
              <p className="text-[15px] text-[#5B5675] leading-[1.65]">
                {isEn
                  ? 'Sample project designed to show our workflow. Not a client project.'
                  : 'Contoh proyek dirancang untuk memperlihatkan alur kerja kami. Bukan proyek klien.'}
              </p>
            </div>
          </div>

          {/* Filter Bar for Sample Projects */}
          <div className="pt-4 border-t border-[rgba(91,60,196,0.14)] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Category Chips */}
            <div
              role="tablist"
              aria-label={isEn ? 'Filter sample project category' : 'Filter kategori contoh proyek'}
              className="flex flex-wrap items-center gap-2"
            >
              {categories.map((cat) => {
                const isSelected = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`min-h-[40px] min-w-fit px-4 py-2 rounded-full text-[13px] md:text-[14px] font-medium transition-all duration-150 cursor-pointer border ${
                      isSelected
                        ? 'bg-[#6A3FD0] text-[#FFFFFF] border-[#6A3FD0] shadow-[0_4px_12px_rgba(106,63,208,0.18)]'
                        : 'bg-[#FFFFFF] text-[#17122B] border-[rgba(91,60,196,0.14)] hover:bg-[#F8F6FE] hover:border-[#7C54E0]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Industry Dropdown + Result Count */}
            <div className="flex flex-wrap items-center justify-between lg:justify-end gap-3">
              <div className="relative flex items-center">
                <Filter
                  size={14}
                  className="text-[#6A3FD0] absolute left-3.5 pointer-events-none"
                />
                <label htmlFor="industry-filter" className="sr-only">
                  {isEn ? 'Filter by industry' : 'Filter berdasarkan industri'}
                </label>
                <select
                  id="industry-filter"
                  value={activeIndustry}
                  onChange={(e) => handleIndustryChange(e.target.value)}
                  className="min-h-[40px] pl-9 pr-8 py-2 rounded-full bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] text-[13px] md:text-[14px] text-[#17122B] font-medium hover:border-[#7C54E0] focus:outline-2 focus:outline-[#6A3FD0] cursor-pointer"
                >
                  {industries.map((ind) => (
                    <option key={ind} value={ind}>
                      {ind}
                    </option>
                  ))}
                </select>
              </div>

              <span
                aria-live="polite"
                className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.08em] text-[#5B5675] px-3 py-1.5 rounded-full bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)]"
              >
                {isEn
                  ? `Showing ${filteredProjects.length} of ${allProjects.length} sample projects`
                  : `Menampilkan ${filteredProjects.length} dari ${allProjects.length} contoh proyek`}
              </span>
            </div>
          </div>

          {filteredProjects.length === 0 ? (
            /* Empty State */
            <Card
              variant="soft"
              padding="lg"
              className="max-w-xl mx-auto text-center space-y-4 my-8"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#EFEAFB] border border-[rgba(91,60,196,0.14)] flex items-center justify-center mx-auto text-[#6A3FD0]">
                <Layers size={22} />
              </div>
              <h3 className="text-[20px] md:text-[22px] text-[#17122B]">
                {isEn
                  ? 'No sample projects match this filter combination yet'
                  : 'Belum ada contoh proyek untuk kombinasi filter ini'}
              </h3>
              <p className="text-[15px] text-[#5B5675] leading-[1.65]">
                {isEn
                  ? 'Try selecting another category or industry to see sample systems we have designed.'
                  : 'Coba pilih kategori atau industri lain untuk melihat contoh sistem yang sudah kami rancang.'}
              </p>
              <div className="pt-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleResetFilters}
                >
                  <RotateCcw size={15} className="text-[#6A3FD0]" />
                  <span>{isEn ? 'Reset filters' : 'Reset filter'}</span>
                </Button>
              </div>
            </Card>
          ) : (
            <Reveal staggerSelector=".portfolio-grid-item">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {filteredProjects.map((project, idx) => (
                  <PortfolioCard
                    key={project.slug}
                    project={project}
                    priority={idx < 2}
                    locale={locale}
                    prefixMode={prefixMode}
                  />
                ))}
              </div>
            </Reveal>
          )}
        </Container>
      </section>

      {/* =====================================================
          4. "MAU LIHAT CERITA LENGKAPNYA?" STRIP -> /case-studies
          ===================================================== */}
      <section className="py-12 md:py-16 bg-[#F8F6FE] border-b border-[rgba(91,60,196,0.14)]">
        <Container>
          <Card
            variant="white"
            padding="lg"
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold">
                <BookOpen size={14} />
                <span>
                  {isEn
                    ? 'DEEP PROBLEM & ARCHITECTURE BREAKDOWN'
                    : 'BEDAH MASALAH & ARSITEKTUR MENDALAM'}
                </span>
              </div>
              <h2 className="text-[22px] md:text-[26px] text-[#17122B]">
                {isEn
                  ? 'Want to read the full story?'
                  : 'Mau lihat cerita lengkapnya?'}
              </h2>
              <p className="text-[15px] text-[#5B5675] leading-[1.65]">
                {isEn
                  ? 'To read how we analyze operational problems, make architectural decisions, and weigh trade-offs on our sample projects, visit our Sample Case Studies page.'
                  : 'Untuk membaca cara kami menganalisis masalah operasional, mengambil keputusan arsitektur, dan menimbang kompromi pada contoh proyek kami, kunjungi halaman Studi Kasus.'}
              </p>
            </div>

            <div className="shrink-0">
              <Button
                to={toLocalizedHref('/case-studies', locale, prefixMode)}
                variant="secondary"
              >
                <span>{isEn ? 'Read Case Studies' : 'Baca Studi Kasus'}</span>
                <ArrowRight size={15} className="text-[#6A3FD0]" />
              </Button>
            </div>
          </Card>
        </Container>
      </section>

      {/* =====================================================
          5. FINAL CTA BLOCK
          ===================================================== */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#FFFFFF] to-[#EFEAFB]">
        <Container className="max-w-[860px]">
          <CTABlock
            title={
              isEn
                ? 'Have a workflow or system idea you want to build?'
                : 'Punya alur kerja atau ide sistem yang ingin kamu bangun?'
            }
            description={
              isEn
                ? 'Tell Chesta & Zeeshan what your business needs. We will break it down together in a free 30-minute audit session via WhatsApp.'
                : 'Ceritakan kebutuhan bisnismu ke Chesta & Zeeshan. Kita bedah bersama dalam sesi audit gratis 30 menit via WhatsApp.'
            }
            buttonLabel={
              isEn
                ? 'Free consultation via WhatsApp'
                : 'Konsultasi gratis via WhatsApp'
            }
            whatsappMessage={
              isEn
                ? 'Hi Chesta & Zeeshan, I just viewed the Projects page on chestaa.com and would like to consult on building a system for my business.'
                : 'Halo Chesta & Zeeshan, saya baru melihat halaman Proyek di chestaa.com dan ingin berkonsultasi mengenai pembuatan sistem untuk bisnis saya.'
            }
            secondaryAction={
              <Button
                to={toLocalizedHref('/#layanan', locale, prefixMode)}
                variant="secondary"
              >
                <span>{isEn ? 'View service list' : 'Lihat daftar layanan'}</span>
              </Button>
            }
          />
        </Container>
      </section>
    </div>
  );
}

/* ============================================================================
 * REAL PROJECT CARD COMPONENT ("Proyek nyata · klien dirahasiakan" + Abstract SVG "Ilustrasi")
 * ========================================================================== */
function RealProjectCard({
  item,
  locale,
}: {
  item: RealProjectExperience;
  locale: 'id' | 'en';
}) {
  const isEn = locale === 'en';
  const href = getRealProjectHref(item, locale);
  const title = isEn ? item.titleEn : item.titleId;
  const oneLiner = isEn ? item.oneLinerEn : item.oneLinerId;
  const badgeText = isEn ? item.tagEn : item.tagId;
  const valueNote = isEn ? item.valueNoteEn : item.valueNoteId;

  return (
    <article className="real-project-card h-full">
      <Link
        to={href}
        className="bento-card group h-full flex flex-col justify-between rounded-[24px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.16)] hover:border-[#6A3FD0] shadow-[0_6px_20px_-6px_rgba(106,63,208,0.06)] overflow-hidden transition-colors duration-200"
      >
        <div>
          {/* Abstract Schematic Illustration Frame labeled "Ilustrasi" / "Illustration" */}
          <div className="relative aspect-[16/10] bg-gradient-to-br from-[#EFEAFB] via-[#F8F6FE] to-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)] p-5 flex items-center justify-center overflow-hidden">
            <RealProjectAbstractIllustration variant={item.id} />

            <div className="absolute top-3.5 left-3.5 right-3.5 flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#17122B] text-[#FFFFFF] font-mono text-[10px] uppercase tracking-[0.06em] font-semibold">
                <ShieldCheck size={12} className="text-[#B9A2F2]" />
                <span>{badgeText}</span>
              </span>

              <span className="px-2.5 py-0.5 rounded-full bg-[#FFFFFF]/90 backdrop-blur-sm border border-[rgba(91,60,196,0.18)] font-mono text-[10px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold">
                {isEn ? 'Illustration' : 'Ilustrasi'}
              </span>
            </div>
          </div>

          <div className="p-5 md:p-6 space-y-3">
            <h3 className="text-[19px] md:text-[21px] font-semibold text-[#17122B] group-hover:text-[#6A3FD0] transition-colors leading-snug">
              {title}
            </h3>

            <p className="text-[14px] md:text-[15px] text-[#5B5675] leading-[1.65]">
              {oneLiner}
            </p>

            {valueNote && (
              <div className="pt-1">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#EFEAFB] border border-[rgba(91,60,196,0.18)] font-mono text-[11px] font-semibold text-[#6A3FD0]">
                  {valueNote}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="px-5 md:px-6 py-4 bg-[#F8F6FE] border-t border-[rgba(91,60,196,0.14)] flex items-center justify-between gap-3">
          <span className="font-mono text-[11px] text-[#5B5675]">
            {isEn ? item.confidentialLabelEn : item.confidentialLabelId}
          </span>
          <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#6A3FD0] shrink-0">
            <span>{isEn ? 'View details' : 'Lihat detail'}</span>
            <ArrowUpRight
              size={15}
              className="icon-slide-hover transition-transform duration-200"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}

function RealProjectAbstractIllustration({
  variant,
}: {
  variant: RealProjectExperience['id'];
}) {
  if (variant === 'minuman') {
    return (
      <svg
        viewBox="0 0 320 160"
        className="w-full h-full max-w-[280px] text-[#6A3FD0]"
        role="img"
        aria-hidden="true"
      >
        <rect
          x="16"
          y="28"
          width="84"
          height="104"
          rx="14"
          fill="#FFFFFF"
          stroke="rgba(106,63,208,0.28)"
          strokeWidth="1.5"
        />
        <circle cx="58" cy="62" r="16" fill="#EFEAFB" stroke="#6A3FD0" strokeWidth="1.5" />
        <path d="M58 52v14l8 5" stroke="#6A3FD0" strokeWidth="1.75" strokeLinecap="round" fill="none" />
        <rect x="34" y="92" width="48" height="8" rx="4" fill="#EFEAFB" />
        <rect x="40" y="106" width="36" height="6" rx="3" fill="#B9A2F2" />

        <path d="M100 80h28" stroke="#6A3FD0" strokeWidth="1.5" strokeDasharray="4 4" />

        <rect
          x="128"
          y="20"
          width="84"
          height="120"
          rx="14"
          fill="#FFFFFF"
          stroke="#6A3FD0"
          strokeWidth="1.75"
        />
        <rect x="144" y="38" width="52" height="10" rx="5" fill="#EFEAFB" />
        <rect x="144" y="56" width="52" height="10" rx="5" fill="#EFEAFB" />
        <rect x="144" y="74" width="52" height="10" rx="5" fill="#6A3FD0" fillOpacity="0.2" />
        <rect x="144" y="96" width="34" height="24" rx="6" fill="#F8F6FE" stroke="rgba(106,63,208,0.24)" />

        <path d="M212 80h24" stroke="#6A3FD0" strokeWidth="1.5" strokeDasharray="4 4" />

        <rect
          x="236"
          y="36"
          width="68"
          height="88"
          rx="14"
          fill="#FFFFFF"
          stroke="rgba(106,63,208,0.28)"
          strokeWidth="1.5"
        />
        <circle cx="270" cy="68" r="14" fill="#EFEAFB" />
        <path
          d="M264 68l4 4 8-8"
          stroke="#6A3FD0"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <rect x="250" y="94" width="40" height="8" rx="4" fill="#EFEAFB" />
      </svg>
    );
  }

  if (variant === 'pesantren') {
    return (
      <svg
        viewBox="0 0 320 160"
        className="w-full h-full max-w-[280px] text-[#6A3FD0]"
        role="img"
        aria-hidden="true"
      >
        <rect
          x="28"
          y="24"
          width="264"
          height="112"
          rx="16"
          fill="#FFFFFF"
          stroke="rgba(106,63,208,0.28)"
          strokeWidth="1.5"
        />
        <line x1="28" y1="52" x2="292" y2="52" stroke="rgba(106,63,208,0.16)" strokeWidth="1.5" />
        <circle cx="48" cy="38" r="4" fill="#B9A2F2" />
        <circle cx="62" cy="38" r="4" fill="#7C54E0" />
        <circle cx="76" cy="38" r="4" fill="#6A3FD0" />

        <rect x="48" y="68" width="68" height="50" rx="10" fill="#F8F6FE" stroke="rgba(106,63,208,0.2)" />
        <rect x="60" y="80" width="44" height="8" rx="4" fill="#6A3FD0" fillOpacity="0.25" />
        <rect x="60" y="94" width="32" height="8" rx="4" fill="#EFEAFB" />

        <rect x="126" y="68" width="68" height="50" rx="10" fill="#EFEAFB" stroke="#6A3FD0" strokeWidth="1.4" />
        <rect x="138" y="80" width="44" height="8" rx="4" fill="#6A3FD0" />
        <rect x="138" y="94" width="36" height="8" rx="4" fill="#FFFFFF" />

        <rect x="204" y="68" width="68" height="50" rx="10" fill="#F8F6FE" stroke="rgba(106,63,208,0.2)" />
        <rect x="216" y="80" width="44" height="8" rx="4" fill="#6A3FD0" fillOpacity="0.25" />
        <rect x="216" y="94" width="28" height="8" rx="4" fill="#EFEAFB" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 320 160"
      className="w-full h-full max-w-[280px] text-[#6A3FD0]"
      role="img"
      aria-hidden="true"
    >
      <rect
        x="24"
        y="30"
        width="76"
        height="100"
        rx="12"
        fill="#FFFFFF"
        stroke="rgba(106,63,208,0.28)"
        strokeWidth="1.5"
      />
      <rect x="38" y="46" width="48" height="16" rx="4" fill="#EFEAFB" />
      <rect x="38" y="70" width="48" height="16" rx="4" fill="#EFEAFB" />
      <rect x="38" y="94" width="48" height="16" rx="4" fill="#6A3FD0" fillOpacity="0.22" />

      <path d="M100 80h36" stroke="#6A3FD0" strokeWidth="1.75" strokeDasharray="4 4" />

      <rect
        x="136"
        y="42"
        width="64"
        height="76"
        rx="14"
        fill="#EFEAFB"
        stroke="#6A3FD0"
        strokeWidth="1.75"
      />
      <path
        d="M156 80h24M168 68v24"
        stroke="#6A3FD0"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <path d="M200 80h32" stroke="#6A3FD0" strokeWidth="1.75" strokeDasharray="4 4" />

      <rect
        x="232"
        y="30"
        width="64"
        height="100"
        rx="12"
        fill="#FFFFFF"
        stroke="rgba(106,63,208,0.28)"
        strokeWidth="1.5"
      />
      <rect x="246" y="50" width="36" height="10" rx="4" fill="#6A3FD0" />
      <rect x="246" y="68" width="36" height="10" rx="4" fill="#EFEAFB" />
      <rect x="246" y="86" width="24" height="10" rx="4" fill="#B9A2F2" />
    </svg>
  );
}

/* ============================================================================
 * SAMPLE PORTFOLIO CARD COMPONENT (Mandatory "Contoh proyek" / "Sample project" + sampleNote)
 * ========================================================================== */
function PortfolioCard({
  project,
  priority,
  locale,
  prefixMode,
}: {
  project: PortfolioProject;
  priority: boolean;
  locale: 'id' | 'en';
  prefixMode: PrefixMode;
}) {
  const isEn = locale === 'en';
  const imgAsset = getImageMeta(project.cover, locale);
  const projectHref = toLocalizedHref(
    `/portfolio/${project.slug}`,
    locale,
    prefixMode
  );

  if (project.featured) {
    return (
      <article className="portfolio-grid-item md:col-span-2">
        <Link
          to={projectHref}
          className="bento-card group block h-full rounded-[24px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] hover:border-[#6A3FD0]/50 shadow-[0_6px_20px_-6px_rgba(106,63,208,0.05)] overflow-hidden transition-colors duration-200"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Clipped 4:3 Image Frame */}
            <div className="lg:col-span-7 relative aspect-[4/3] bg-[#EFEAFB] border-b lg:border-b-0 lg:border-r border-[rgba(91,60,196,0.14)] overflow-hidden">
              <ImageWithFallback
                src={imgAsset.src}
                alt={imgAsset.alt}
                width={imgAsset.width}
                height={imgAsset.height}
                priority={priority}
                viewTransitionName={`portfolio-cover-${project.slug}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#6A3FD0] text-[#FFFFFF] font-mono text-[11px] uppercase tracking-[0.08em] font-semibold shadow-sm">
                  {project.badgeLabel}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#FFFFFF]/90 backdrop-blur-sm text-[#17122B] border border-[rgba(91,60,196,0.16)] font-mono text-[11px] uppercase tracking-[0.08em] font-semibold">
                  {project.categoryLabel}
                </span>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between bg-[#FFFFFF]">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675]">
                  <span className="text-[#6A3FD0] font-semibold">{project.industry}</span>
                  <span>{project.year} · {project.duration}</span>
                </div>

                <h3 className="text-[20px] md:text-[24px] font-semibold text-[#17122B] group-hover:text-[#6A3FD0] transition-colors leading-snug">
                  {project.title}
                </h3>

                <p className="text-[15px] text-[#5B5675] leading-[1.65]">
                  {project.oneLiner}
                </p>

                <div className="p-3 rounded-[14px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] font-mono text-[11px] text-[#6A3FD0]">
                  <strong className="uppercase tracking-[0.06em]">
                    {isEn ? 'Design target: ' : 'Target desain: '}
                  </strong>
                  <span>{project.targetNote}</span>
                </div>

                <div className="pt-2 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-full bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] font-mono text-[11px] text-[#5B5675]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[rgba(91,60,196,0.14)] space-y-2.5">
                <p className="text-[12.5px] text-[#5B5675] leading-[1.5]">
                  {project.sampleNote}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold">
                    {project.badgeLabel}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#6A3FD0]">
                    <span>{isEn ? 'View project details' : 'Lihat detail proyek'}</span>
                    <ArrowUpRight
                      size={16}
                      className="icon-slide-hover transition-transform duration-200"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="portfolio-grid-item h-full">
      <Link
        to={projectHref}
        className="bento-card group h-full flex flex-col justify-between rounded-[24px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] hover:border-[#6A3FD0]/50 shadow-[0_6px_20px_-6px_rgba(106,63,208,0.05)] overflow-hidden transition-colors duration-200"
      >
        <div>
          {/* Consistent 4:3 Clipped Frame */}
          <div className="relative aspect-[4/3] bg-[#EFEAFB] border-b border-[rgba(91,60,196,0.14)] overflow-hidden">
            <ImageWithFallback
              src={imgAsset.src}
              alt={imgAsset.alt}
              width={imgAsset.width}
              height={imgAsset.height}
              priority={priority}
              viewTransitionName={`portfolio-cover-${project.slug}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3.5 left-3.5 flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#6A3FD0] text-[#FFFFFF] font-mono text-[11px] uppercase tracking-[0.08em] font-semibold">
                {project.badgeLabel}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#FFFFFF]/92 backdrop-blur-sm text-[#6A3FD0] border border-[rgba(91,60,196,0.16)] font-mono text-[11px] uppercase tracking-[0.08em] font-semibold">
                {project.categoryLabel}
              </span>
            </div>
          </div>

          {/* Card Copy */}
          <div className="p-5 md:p-6 space-y-3">
            <div className="flex items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675]">
              <span className="text-[#6A3FD0] font-semibold">{project.industry}</span>
              <span>{project.year}</span>
            </div>

            <h3 className="text-[18px] md:text-[20px] font-semibold text-[#17122B] group-hover:text-[#6A3FD0] transition-colors leading-snug">
              {project.title}
            </h3>

            <p className="text-[14px] md:text-[15px] text-[#5B5675] leading-[1.6] line-clamp-2">
              {project.oneLiner}
            </p>

            <div className="p-2.5 rounded-[12px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] font-mono text-[11px] text-[#6A3FD0]">
              <strong>{isEn ? 'Design target: ' : 'Target desain: '}</strong>
              <span>{project.targetNote}</span>
            </div>

            <p className="pt-1 text-[12.5px] text-[#5B5675] leading-[1.5]">
              {project.sampleNote}
            </p>
          </div>
        </div>

        {/* Footer Strip */}
        <div className="px-5 md:px-6 py-4 bg-[#F8F6FE] border-t border-[rgba(91,60,196,0.14)] flex items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {project.stack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded-full bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] font-mono text-[10px] text-[#5B5675]"
              >
                {tech}
              </span>
            ))}
          </div>

          <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#6A3FD0] shrink-0">
            <span>{isEn ? 'Details' : 'Detail'}</span>
            <ArrowUpRight
              size={15}
              className="icon-slide-hover transition-transform duration-200"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}
