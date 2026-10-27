import React, { useMemo } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Filter,
  RotateCcw,
  Layers,
} from 'lucide-react';
import SEOMetadata from '../components/atoms/SEOMetadata';
import {
  getPublishedProjects,
  getPortfolioIndustries,
  getPortfolioCategories,
  PortfolioProject,
  ProjectCategory,
} from '../data/projects';
import { SITE_IMAGES } from '../config/images';
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
            ? 'Internal Projects — Custom Software & AI Agent Portfolio | CHESTAADOTCOM'
            : 'Proyek Internal — Portofolio Software & AI Agent | CHESTAADOTCOM',
          description: isEn
            ? 'Internal CHESTAADOTCOM projects: website, landing page, WhatsApp AI agent, custom software, and workflow automation demos built in BSD City & South Tangerang.'
            : 'Proyek internal CHESTAADOTCOM: website, landing page, AI agent WhatsApp, software custom, dan otomasi workflow di BSD City & Tangerang Selatan.',
          inLanguage: isEn ? 'en' : 'id-ID',
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: allProjects.map((project, idx) => ({
              '@type': 'ListItem',
              position: idx + 1,
              url: `https://chestaa.com${toLocalizedHref(`/portfolio/${project.slug}`, locale, prefixMode)}`,
              name: project.title,
              description: project.oneLiner,
            })),
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
              name: isEn ? 'Portfolio' : 'Portofolio',
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
            ? 'Projects We Have Built — Custom Software & AI Agent Portfolio'
            : 'Proyek yang Sudah Kami Bangun — Portofolio Software & AI'
        }
        description={
          isEn
            ? 'Internal CHESTAADOTCOM projects: landing page, WhatsApp AI agent, custom software, and workflow automation demos for BSD City and South Tangerang.'
            : 'Proyek internal CHESTAADOTCOM: pembuatan landing page, AI agent WhatsApp, software custom, dan otomasi workflow di BSD City dan Tangerang Selatan.'
        }
        path={portfolioHref}
        jsonLd={jsonLdGraph}
      />

      {/* =====================================================
          1. COMPACT HEADER
          ===================================================== */}
      <section className="pt-28 pb-12 md:pt-36 md:pb-16 bg-gradient-to-b from-[#FFFFFF] via-[#F8F6FE] to-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)]">
        <Container>
          <Breadcrumb items={[{ label: isEn ? 'Portfolio' : 'Portofolio' }]} />

          <div className="max-w-3xl space-y-4">
            <Badge variant="tint">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6A3FD0]" />
              <span>
                {isEn
                  ? 'INTERNAL PROJECTS · CHESTAADOTCOM'
                  : 'PROYEK INTERNAL · CHESTAADOTCOM'}
              </span>
            </Badge>

            <WordRevealHeading
              as="h1"
              priority
              text={isEn ? 'Internal projects we have built' : 'Proyek internal yang kami bangun'}
            />

            <p className="text-[15px] md:text-[16px] text-[#5B5675] leading-[1.65]">
              {isEn
                ? 'Internal CHESTAADOTCOM demos and prototypes of web interfaces, WhatsApp AI agents, and operational dashboards designed for industries in BSD City, South Tangerang, and Greater Jakarta.'
                : 'Demo dan prototipe internal CHESTAADOTCOM untuk antarmuka web, AI agent WhatsApp, dan dashboard operasional yang kami rancang bagi industri di BSD City, Tangerang Selatan, dan Jabodetabek.'}
            </p>
          </div>

          {/* =====================================================
              2. FILTER BAR (URL-SYNCED ?kategori= & ?industri=)
              ===================================================== */}
          <div className="mt-8 pt-6 border-t border-[rgba(91,60,196,0.14)] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Category Chips */}
            <div
              role="tablist"
              aria-label={isEn ? 'Filter project category' : 'Filter kategori proyek'}
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
                  ? `Showing ${filteredProjects.length} of ${allProjects.length} projects`
                  : `Menampilkan ${filteredProjects.length} dari ${allProjects.length} proyek`}
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          3. PORTFOLIO SHOWCASE GRID (2 COLS DESKTOP, FEATURED SPANS 2)
          ===================================================== */}
      <section className="py-16 md:py-24 bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)]">
        <Container>
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
              <h2 className="text-[20px] md:text-[22px] text-[#17122B]">
                {isEn
                  ? 'No projects match this filter combination yet'
                  : 'Belum ada proyek untuk kombinasi filter ini'}
              </h2>
              <p className="text-[15px] text-[#5B5675] leading-[1.65]">
                {isEn
                  ? 'Try selecting another category or industry to see examples of systems we have designed.'
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
                  ? 'This portfolio page focuses on visual interface previews of our internal projects. To read the operational problem mapping, architecture trade-offs, and design targets in full, visit our Case Studies page.'
                  : 'Halaman portofolio ini fokus pada pratinjau visual antarmuka proyek internal kami. Untuk membaca pemetaan masalah operasional, kompromi arsitektur, dan target desain secara menyeluruh, kunjungi halaman Studi Kasus.'}
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
                ? 'Hi Chesta & Zeeshan, I just viewed the Portfolio page on chestaa.com and would like to consult on building a system for my business.'
                : 'Halo Chesta & Zeeshan, saya baru melihat halaman Portofolio di chestaa.com dan ingin berkonsultasi mengenai pembuatan sistem untuk bisnis saya.'
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
 * PORTFOLIO CARD COMPONENT (Mandatory "Proyek internal" / "Internal project" badge)
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
                  {project.internalBadgeLabel}
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

                <h2 className="text-[20px] md:text-[24px] font-semibold text-[#17122B] group-hover:text-[#6A3FD0] transition-colors leading-snug">
                  {project.title}
                </h2>

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

              <div className="mt-6 pt-4 border-t border-[rgba(91,60,196,0.14)] flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675]">
                  {project.client}
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
                {project.internalBadgeLabel}
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

            <h2 className="text-[18px] md:text-[20px] font-semibold text-[#17122B] group-hover:text-[#6A3FD0] transition-colors leading-snug">
              {project.title}
            </h2>

            <p className="text-[14px] md:text-[15px] text-[#5B5675] leading-[1.6] line-clamp-2">
              {project.oneLiner}
            </p>

            <div className="p-2.5 rounded-[12px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] font-mono text-[11px] text-[#6A3FD0]">
              <strong>{isEn ? 'Design target: ' : 'Target desain: '}</strong>
              <span>{project.targetNote}</span>
            </div>
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
