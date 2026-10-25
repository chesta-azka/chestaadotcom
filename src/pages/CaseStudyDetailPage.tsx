import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  CheckCircle2,
  XCircle,
  Quote,
  Layers,
  BookOpen,
  Copy,
  Check,
  Sparkles,
  Scale,
} from 'lucide-react';
import SEOMetadata from '../components/atoms/SEOMetadata';
import {
  getCaseStudyBySlug,
  getNextCaseStudy,
  CaseStudySection,
  CaseStudyDiagramData,
  CaseStudyMetricItem,
} from '../data/case-studies';
import { getProjectBySlug } from '../data/projects';
import { getBlogPostBySlug, getBlogAlternateSlugs } from '../data/blog-posts';
import { SITE_IMAGES } from '../config/images';
import {
  Container,
  Button,
  Card,
  Badge,
  WordRevealHeading,
  CTABlock,
  Breadcrumb,
  ImageWithFallback,
} from '../components/ui/DesignSystem';
import { lineDrawElement, staggerElements, detectMotionMode, MOTION_TOKENS } from '../lib/motion';
import { parseLocalizedPath, toLocalizedHref } from '../lib/i18n';
import { getLocalizedService } from '../lib/i18n-content';

/**
 * Animated SVG System Diagram ("Alur sistem")
 * Draws connecting paths with stroke-dashoffset (GSAP lineDrawElement) and staggers 4 architecture nodes on scroll.
 * Strictly labeled "Ilustrasi" / "Illustration" per specification.
 */
function AnimatedSystemDiagram({
  diagram,
  isEn,
}: {
  diagram: CaseStudyDiagramData;
  isEn: boolean;
}) {
  const containerRef = useRef<HTMLElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const cleanLine = lineDrawElement(pathRef.current, 0.95, 0.1);
    const cleanStagger = staggerElements(containerRef.current, '.diagram-node-card', {
      stagger: 0.08,
      y: 16,
      delay: 0.12,
    });
    return () => {
      cleanLine();
      cleanStagger();
    };
  }, []);

  return (
    <figure
      ref={containerRef}
      className="my-6 rounded-[24px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] p-5 md:p-7 overflow-hidden"
    >
      {/* Header bar with required "Ilustrasi" / "Illustration" label */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-[rgba(91,60,196,0.12)]">
        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold">
          {isEn ? 'SYSTEM FLOW DIAGRAM' : 'DIAGRAM ALUR SISTEM'}
        </span>
        <span className="px-2.5 py-0.5 rounded-full bg-[#EFEAFB] border border-[rgba(91,60,196,0.16)] font-mono text-[11px] uppercase tracking-[0.08em] text-[#5230B0] font-semibold">
          {isEn ? 'Illustration' : 'Ilustrasi'}
        </span>
      </div>

      {/* Desktop SVG connector line that draws on scroll via stroke-dashoffset */}
      <div className="relative">
        <svg
          className="hidden md:block w-full h-12 mb-2 pointer-events-none"
          viewBox="0 0 640 48"
          fill="none"
          aria-hidden="true"
        >
          {/* Base muted track */}
          <path
            d="M 70 24 L 570 24"
            stroke="rgba(91, 60, 196, 0.16)"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          {/* Animated active purple path */}
          <path
            ref={pathRef}
            d="M 70 24 L 570 24"
            stroke="#6A3FD0"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {[70, 236, 403, 570].map((cx) => (
            <g key={cx}>
              <circle
                cx={cx}
                cy={24}
                r={8}
                fill="#FFFFFF"
                stroke="#6A3FD0"
                strokeWidth="2"
              />
              <circle cx={cx} cy={24} r={4} fill="#6A3FD0" />
            </g>
          ))}
        </svg>

        {/* 4 Nodes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5 relative z-10">
          {diagram.nodes.map((node) => (
            <div
              key={node.id}
              className="diagram-node-card p-4 rounded-[18px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] flex flex-col justify-between space-y-2 shadow-[0_4px_14px_-6px_rgba(106,63,208,0.06)]"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold">
                {node.stepLabel}
              </span>
              <h4 className="text-[14px] font-semibold text-[#17122B] leading-[1.3]">
                {node.title}
              </h4>
              <p className="text-[12px] text-[#5B5675] leading-[1.45]">
                {node.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>

      <figcaption className="mt-4 pt-3 border-t border-[rgba(91,60,196,0.1)] text-[12px] md:text-[13px] text-[#5B5675] flex items-center justify-between gap-2">
        <span>{diagram.caption}</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#5B5675] shrink-0">
          {isEn ? 'Flow Illustration' : 'Ilustrasi Alur'}
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * Count-up Metric Card
 * Only rendered when numericValue !== undefined. Runs once on view via IntersectionObserver + GSAP.
 */
function CountUpMetricCard({
  item,
  isEn,
}: {
  item: CaseStudyMetricItem;
  isEn: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [displayNumber, setDisplayNumber] = useState(
    typeof item.numericValue === 'number' ? item.numericValue : 0
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof item.numericValue !== 'number') return;
    if (detectMotionMode() === 'reduced') {
      setDisplayNumber(item.numericValue);
      return;
    }

    const target = item.numericValue;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const state = { val: 0 };
          gsap.to(state, {
            val: target,
            duration: 0.85,
            ease: MOTION_TOKENS.easings.gsapOut,
            onUpdate: () => {
              setDisplayNumber(Math.round(state.val));
            },
            onComplete: () => {
              setDisplayNumber(target);
            },
          });
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [item.numericValue]);

  if (typeof item.numericValue !== 'number') {
    return null;
  }

  return (
    <div
      ref={ref}
      className="p-5 rounded-[20px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] space-y-1.5"
    >
      <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675]">
        {item.label}
      </span>
      <div className="text-[28px] md:text-[32px] font-semibold tracking-[-0.03em] text-[#6A3FD0]">
        {item.prefix}
        {displayNumber.toLocaleString(isEn ? 'en-US' : 'id-ID')}
        {item.suffix}
      </div>
      {item.note && (
        <p className="text-[12px] text-[#5B5675] leading-[1.45]">{item.note}</p>
      )}
    </div>
  );
}

export default function CaseStudyDetailPage() {
  const location = useLocation();
  const { locale, prefixMode } = parseLocalizedPath(location.pathname);
  const isEn = locale === 'en';

  const { slug } = useParams<{ slug: string }>();
  const study = useMemo(() => getCaseStudyBySlug(slug, locale), [slug, locale]);

  const [activeSectionId, setActiveSectionId] = useState<string>('konteks-bisnis');
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [copiedTldr, setCopiedTldr] = useState(false);

  // Reading progress bar listener
  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setReadingProgress(0);
        return;
      }
      const pct = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
      setReadingProgress(pct);
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener('scroll', updateProgress);
  }, [slug]);

  // IntersectionObserver for active section highlight in TOC
  useEffect(() => {
    if (!study) return;
    const sectionElements = study.sections
      .map((sec) => document.getElementById(sec.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0 && visible[0].target.id) {
          setActiveSectionId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-20% 0px -65% 0px',
        threshold: [0.1, 0.5],
      }
    );

    sectionElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [study]);

  const caseStudiesHref = toLocalizedHref('/case-studies', locale, prefixMode);

  if (!study) {
    return (
      <div className="bg-[#FFFFFF] text-[#17122B] min-h-screen pt-32 pb-24">
        <SEOMetadata
          title={
            isEn
              ? 'Case Study Not Found | CHESTAADOTCOM'
              : 'Studi Kasus Tidak Ditemukan | CHESTAADOTCOM'
          }
          description={
            isEn
              ? 'The case study page you requested is not available yet. View all project stories on our Case Studies page.'
              : 'Halaman studi kasus yang kamu cari belum tersedia. Lihat daftar cerita pengerjaan proyek kami di halaman Studi Kasus.'
          }
          path={toLocalizedHref(`/case-studies/${slug || ''}`, locale, prefixMode)}
        />
        <Container className="max-w-xl text-center space-y-5">
          <Badge variant="tint">
            {isEn
              ? '404 · CASE STUDY NOT FOUND'
              : '404 · STUDI KASUS TIDAK DITEMUKAN'}
          </Badge>
          <h1>
            {isEn
              ? 'The case study you are looking for is not available yet'
              : 'Studi kasus yang kamu cari belum tersedia'}
          </h1>
          <p className="text-[15px] md:text-[16px] text-[#5B5675] leading-[1.65]">
            {isEn
              ? 'The link may have been updated. Please return to the case studies index to read the stories behind our other projects.'
              : 'Tautan mungkin telah diperbarui. Silakan kembali ke halaman daftar studi kasus untuk membaca cerita di balik proyek kami lainnya.'}
          </p>
          <div className="pt-2 flex justify-center">
            <Button to={caseStudiesHref} variant="primary">
              <ArrowLeft size={16} />
              <span>
                {isEn ? 'Back to Case Studies' : 'Kembali ke Studi Kasus'}
              </span>
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  const nextStudy = getNextCaseStudy(study.slug, locale);
  const matchingProject = study.projectSlug
    ? getProjectBySlug(study.projectSlug, locale)
    : undefined;
  const relatedServices = study.relatedServiceSlugs
    .map((sSlug) => getLocalizedService(sSlug, locale))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const relatedPosts = study.relatedPostSlugs
    .map((pSlug) => {
      const alt = getBlogAlternateSlugs(pSlug);
      const targetSlug = alt ? (isEn ? alt.enSlug : alt.idSlug) : pSlug;
      return getBlogPostBySlug(targetSlug, locale) || getBlogPostBySlug(pSlug);
    })
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const validNumericMetrics = study.metrics.filter(
    (m) => typeof m.numericValue === 'number'
  );

  const coverAsset =
    SITE_IMAGES[study.cover as keyof typeof SITE_IMAGES] || SITE_IMAGES.ogDefault;
  const studyPath = toLocalizedHref(
    `/case-studies/${study.slug}`,
    locale,
    prefixMode
  );
  const canonicalUrl = `https://chestaa.com${studyPath}`;

  // TL;DR feeds the meta description candidate
  const tldrMetaDescription =
    study.seo.description ||
    (isEn
      ? `Problem: ${study.summary.problem} Solution: ${study.summary.solution} Outcome: ${study.summary.result}`
      : `Masalah: ${study.summary.problem} Solusi: ${study.summary.solution} Hasil: ${study.summary.result}`);

  const jsonLdGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${canonicalUrl}#article`,
        headline: study.title,
        description: tldrMetaDescription,
        image: `https://chestaa.com${coverAsset.src}`,
        datePublished: study.publishedAt,
        dateModified: study.updatedAt,
        inLanguage: isEn ? 'en' : 'id-ID',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl,
        },
        author: [
          {
            '@type': 'Person',
            name: 'Chesta Azka',
            jobTitle: isEn
              ? 'Co-Founder — Architecture, Product, and Technology'
              : 'Co-Founder — Arsitektur, Produk, dan Teknologi',
            url: `https://chestaa.com${toLocalizedHref('/about', locale, prefixMode)}`,
          },
          {
            '@type': 'Person',
            name: 'Zeeshan',
            jobTitle: isEn
              ? 'Co-Founder — Operations and Client Success'
              : 'Co-Founder — Operasional dan Client Success',
            url: `https://chestaa.com${toLocalizedHref('/about', locale, prefixMode)}`,
          },
        ],
        publisher: {
          '@type': 'Organization',
          '@id': 'https://chestaa.com/#organization',
          name: 'CHESTAADOTCOM',
          url: 'https://chestaa.com',
        },
        about: [
          {
            '@type': 'Thing',
            name: study.industry,
          },
          ...study.services.map((sName) => ({
            '@type': 'Thing',
            name: sName,
          })),
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
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
          {
            '@type': 'ListItem',
            position: 3,
            name: study.title,
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  const scrollToSection =
    (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setMobileTocOpen(false);
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveSectionId(id);
      }
    };

  const handleCopyTldr = () => {
    const text = isEn
      ? `Case Study: ${study.title}\n• Problem: ${study.summary.problem}\n• What we built: ${study.summary.solution}\n• Outcome: ${study.summary.result}\n(${canonicalUrl})`
      : `Studi Kasus: ${study.title}\n• Masalah: ${study.summary.problem}\n• Yang dibangun: ${study.summary.solution}\n• Hasil: ${study.summary.result}\n(${canonicalUrl})`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedTldr(true);
        setTimeout(() => setCopiedTldr(false), 2200);
      });
    }
  };

  return (
    <div className="bg-[#FFFFFF] text-[#17122B] min-h-screen">
      <SEOMetadata
        title={study.seo.title}
        description={tldrMetaDescription}
        path={studyPath}
        image={coverAsset.src}
        type="article"
        jsonLd={jsonLdGraph}
      />

      {/* Thin Reading Progress Bar (transform: scaleX only, never width) */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-[rgba(91,60,196,0.1)] pointer-events-none"
      >
        <div
          className="w-full h-full bg-[#6A3FD0] origin-left"
          style={{
            transform: `scaleX(${(readingProgress / 100).toFixed(4)})`,
            transition: 'transform 120ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
      </div>

      {/* =====================================================
          1. EDITORIAL HEADER & META ROW
          ===================================================== */}
      <header className="pt-28 pb-12 md:pt-36 md:pb-16 bg-gradient-to-b from-[#FFFFFF] via-[#F8F6FE] to-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)]">
        <Container className="max-w-[980px]">
          <Breadcrumb
            items={[
              {
                label: isEn ? 'Case Studies' : 'Studi Kasus',
                to: caseStudiesHref,
              },
              { label: study.industry },
            ]}
          />

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="tint">{study.industry}</Badge>
              {study.services.map((srv) => (
                <Badge key={srv} variant="outline">
                  {srv}
                </Badge>
              ))}
            </div>

            <WordRevealHeading as="h1" priority text={study.title} className="max-w-4xl" />

            <p className="text-[16px] md:text-[18px] text-[#5B5675] leading-[1.6] max-w-3xl">
              {study.oneSentenceSummary}
            </p>
          </div>

          {/* Meta Row: Klien, Layanan, Durasi, Tahun */}
          <div className="mt-8 pt-6 border-t border-[rgba(91,60,196,0.14)] grid grid-cols-2 md:grid-cols-4 gap-5">
            <div>
              <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675]">
                {isEn ? 'Client' : 'Klien'}
              </span>
              <p className="mt-1 text-[14px] font-semibold text-[#17122B]">
                {study.client}
              </p>
            </div>

            <div>
              <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675]">
                {isEn ? 'Services' : 'Layanan'}
              </span>
              <p className="mt-1 text-[14px] font-semibold text-[#6A3FD0]">
                {study.services.join(' · ')}
              </p>
            </div>

            <div>
              <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675]">
                {isEn ? 'Build Duration' : 'Durasi Pengerjaan'}
              </span>
              <p className="mt-1 text-[14px] font-semibold text-[#17122B]">
                {study.duration}
              </p>
            </div>

            <div>
              <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675]">
                {isEn ? 'Release Year' : 'Tahun Rilis'}
              </span>
              <p className="mt-1 text-[14px] font-semibold text-[#17122B]">
                {study.year}
              </p>
            </div>
          </div>
        </Container>
      </header>

      {/* =====================================================
          2. QUOTABLE TL;DR GLASS CARD (3 PARTS: MASALAH, YANG DIBANGUN, HASIL)
          ===================================================== */}
      <section className="py-10 md:py-12 bg-[#F8F6FE] border-b border-[rgba(91,60,196,0.14)]">
        <Container className="max-w-[980px]">
          <div className="rounded-[24px] bg-[#FFFFFF]/88 backdrop-blur-md border border-[rgba(91,60,196,0.18)] p-6 md:p-8 shadow-[0_12px_36px_-12px_rgba(106,63,208,0.08)]">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-[rgba(91,60,196,0.12)]">
              <div className="flex items-center gap-2">
                <Sparkles size={15} className="text-[#6A3FD0]" />
                <span className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.08em] font-semibold text-[#6A3FD0]">
                  {isEn
                    ? 'EXECUTIVE SUMMARY (TL;DR)'
                    : 'RINGKASAN EKSEKUTIF (TL;DR)'}
                </span>
              </div>

              <button
                type="button"
                onClick={handleCopyTldr}
                className="inline-flex items-center gap-1.5 min-h-[36px] px-3.5 rounded-full bg-[#F8F6FE] hover:bg-[#EFEAFB] border border-[rgba(91,60,196,0.14)] text-[12px] font-medium text-[#17122B] transition-colors cursor-pointer"
              >
                {copiedTldr ? (
                  <>
                    <Check size={13} className="text-[#6A3FD0]" />
                    <span>{isEn ? 'Summary copied' : 'Ringkasan disalin'}</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} className="text-[#6A3FD0]" />
                    <span>{isEn ? 'Copy TL;DR quote' : 'Salin kutipan TL;DR'}</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Part 1: Masalah */}
              <div className="space-y-2 md:pr-4 md:border-r border-[rgba(91,60,196,0.12)]">
                <span className="inline-block font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675] font-semibold">
                  {isEn ? '01 · PROBLEM' : '01 · MASALAH'}
                </span>
                <p className="text-[14px] md:text-[15px] text-[#17122B] leading-[1.6]">
                  {study.summary.problem}
                </p>
              </div>

              {/* Part 2: Yang dibangun */}
              <div className="space-y-2 md:px-2 md:border-r border-[rgba(91,60,196,0.12)]">
                <span className="inline-block font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold">
                  {isEn ? '02 · WHAT WE BUILT' : '02 · YANG DIBANGUN'}
                </span>
                <p className="text-[14px] md:text-[15px] text-[#17122B] leading-[1.6]">
                  {study.summary.solution}
                </p>
              </div>

              {/* Part 3: Hasil */}
              <div className="space-y-2 md:pl-2">
                <span className="inline-block font-mono text-[11px] uppercase tracking-[0.08em] text-[#5230B0] font-semibold">
                  {isEn ? '03 · OUTCOME' : '03 · HASIL'}
                </span>
                <p className="text-[14px] md:text-[15px] font-medium text-[#17122B] leading-[1.6]">
                  {study.summary.result}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          3 & 4. EDITORIAL READING COLUMN (MAX 680PX) + STICKY/MOBILE TOC
          ===================================================== */}
      <section className="py-12 md:py-20 bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)]">
        <Container className="max-w-[980px]">
          {/* Collapsible Mobile TOC */}
          <div className="lg:hidden mb-8">
            <div className="rounded-[20px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] overflow-hidden">
              <button
                type="button"
                onClick={() => setMobileTocOpen((prev) => !prev)}
                aria-expanded={mobileTocOpen}
                className="w-full min-h-[48px] px-5 py-3.5 flex items-center justify-between text-left font-mono text-[12px] uppercase tracking-[0.08em] text-[#17122B] font-semibold cursor-pointer"
              >
                <span>{isEn ? 'Story Table of Contents (7 Parts)' : 'Daftar Isi Cerita (7 Bagian)'}</span>
                <ChevronDown
                  size={16}
                  className={`text-[#6A3FD0] transition-transform duration-200 ${
                    mobileTocOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {mobileTocOpen && (
                <nav
                  aria-label={isEn ? 'Mobile table of contents' : 'Daftar isi mobile'}
                  className="px-5 pb-4 pt-1 border-t border-[rgba(91,60,196,0.1)] space-y-1.5"
                >
                  {study.sections.map((sec) => {
                    const isActive = activeSectionId === sec.id;
                    return (
                      <a
                        key={sec.id}
                        href={`#${sec.id}`}
                        onClick={scrollToSection(sec.id)}
                        className={`flex items-center gap-2.5 py-2 px-3 rounded-[12px] text-[14px] transition-colors ${
                          isActive
                            ? 'bg-[#EFEAFB] text-[#6A3FD0] font-semibold'
                            : 'text-[#5B5675] hover:text-[#17122B]'
                        }`}
                      >
                        <span className="font-mono text-[11px]">{sec.number}</span>
                        <span>{sec.title}</span>
                      </a>
                    );
                  })}
                </nav>
              )}
            </div>
          </div>

          {/* Desktop 2-Column Editorial Layout: Sticky TOC + 680px Reading Column */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Sticky Table of Contents (Desktop) */}
            <aside className="hidden lg:block lg:col-span-4 lg:sticky lg:top-28 space-y-6">
              <div className="p-5 rounded-[20px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] space-y-4">
                <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675] font-semibold">
                  {isEn ? 'STORY TABLE OF CONTENTS' : 'DAFTAR ISI CERITA'}
                </span>

                <nav aria-label={isEn ? 'Case study table of contents' : 'Daftar isi studi kasus'} className="space-y-1">
                  {study.sections.map((sec) => {
                    const isActive = activeSectionId === sec.id;
                    return (
                      <a
                        key={sec.id}
                        href={`#${sec.id}`}
                        onClick={scrollToSection(sec.id)}
                        className={`flex items-center gap-3 py-2 px-3 rounded-[12px] text-[13px] transition-all ${
                          isActive
                            ? 'bg-[#FFFFFF] text-[#6A3FD0] font-semibold border border-[rgba(91,60,196,0.16)] shadow-[0_2px_8px_rgba(106,63,208,0.06)]'
                            : 'text-[#5B5675] hover:text-[#17122B]'
                        }`}
                      >
                        <span
                          className={`font-mono text-[11px] ${
                            isActive ? 'text-[#6A3FD0]' : 'text-[#5B5675]/70'
                          }`}
                        >
                          {sec.number}
                        </span>
                        <span>{sec.title}</span>
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* Quick Cross-Link to Visual Portfolio */}
              {matchingProject && (
                <div className="p-5 rounded-[20px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] space-y-3">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold">
                    {isEn ? 'VISUAL PROJECT GALLERY' : 'TAMPILAN VISUAL PROYEK'}
                  </span>
                  <p className="text-[13px] text-[#5B5675] leading-[1.55]">
                    {isEn
                      ? 'Want to inspect the UI screenshot gallery from this project?'
                      : 'Ingin melihat galeri tangkapan layar antarmuka dari proyek ini?'}
                  </p>
                  <Link
                    to={toLocalizedHref(`/portfolio/${matchingProject.slug}`, locale, prefixMode)}
                    className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#6A3FD0] hover:underline"
                  >
                    <span>{isEn ? 'Open in Portfolio' : 'Buka di Portofolio'}</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              )}
            </aside>

            {/* Right Main Editorial Reading Column ( strictly max-w-[680px] ) */}
            <article className="lg:col-span-8 w-full max-w-[680px] space-y-14">
              {study.sections.map((section: CaseStudySection) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-28 space-y-5 pb-10 border-b border-[rgba(91,60,196,0.12)] last:border-b-0 last:pb-0"
                >
                  {/* Section Heading */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold">
                      <span>{isEn ? `PART ${section.number}` : `BAGIAN ${section.number}`}</span>
                      <span aria-hidden="true">·</span>
                      <span>{section.eyebrow}</span>
                    </div>
                    <h2 className="text-[22px] md:text-[26px] font-semibold text-[#17122B] tracking-[-0.02em]">
                      {section.title}
                    </h2>
                  </div>

                  {/* Structured Section Blocks */}
                  <div className="space-y-6">
                    {section.blocks.map((block, bIdx) => {
                      if (block.type === 'text') {
                        return (
                          <div key={bIdx} className="space-y-4">
                            {block.paragraphs.map((paragraph, pIdx) => (
                              <p
                                key={pIdx}
                                className="text-[15px] md:text-[16px] text-[#5B5675] leading-[1.7]"
                              >
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        );
                      }

                      if (block.type === 'previous-attempts') {
                        return (
                          <div
                            key={bIdx}
                            className="p-5 md:p-6 rounded-[20px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] space-y-4"
                          >
                            <div className="flex items-center gap-2">
                              <XCircle size={16} className="text-[#6A3FD0] shrink-0" />
                              <h3 className="text-[16px] font-semibold text-[#17122B]">
                                {block.title}
                              </h3>
                            </div>

                            <div className="space-y-3.5">
                              {block.attempts.map((attempt, aIdx) => (
                                <div
                                  key={aIdx}
                                  className="p-4 rounded-[16px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.12)] space-y-1"
                                >
                                  <p className="text-[14px] font-semibold text-[#17122B]">
                                    {attempt.method}
                                  </p>
                                  <p className="text-[14px] text-[#5B5675] leading-[1.6]">
                                    <span className="font-medium text-[#6A3FD0]">
                                      {isEn ? 'Bottleneck: ' : 'Kendala: '}
                                    </span>
                                    {attempt.whyItFailed}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      }

                      if (block.type === 'trade-offs') {
                        return (
                          <div key={bIdx} className="space-y-4">
                            {block.items.map((item, tIdx) => (
                              <div
                                key={tIdx}
                                className="p-5 md:p-6 rounded-[20px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] space-y-3 shadow-[0_4px_16px_-6px_rgba(106,63,208,0.05)]"
                              >
                                <div className="flex items-start gap-2.5">
                                  <Scale
                                    size={16}
                                    className="text-[#6A3FD0] shrink-0 mt-1"
                                  />
                                  <h3 className="text-[16px] font-semibold text-[#17122B] leading-[1.4]">
                                    {item.decision}
                                  </h3>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                  <div className="p-3.5 rounded-[14px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.1)] space-y-1">
                                    <span className="block font-mono text-[10px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold">
                                      {isEn ? 'WHY CHOSEN' : 'ALASAN DIPILIH'}
                                    </span>
                                    <p className="text-[13px] md:text-[14px] text-[#17122B] leading-[1.55]">
                                      {item.whyChosen}
                                    </p>
                                  </div>

                                  <div className="p-3.5 rounded-[14px] bg-[#EFEAFB]/60 border border-[rgba(91,60,196,0.14)] space-y-1">
                                    <span className="block font-mono text-[10px] uppercase tracking-[0.08em] text-[#5230B0] font-semibold">
                                      {isEn ? 'TRADE-OFF' : 'KOMPROMI (TRADE-OFF)'}
                                    </span>
                                    <p className="text-[13px] md:text-[14px] text-[#5B5675] leading-[1.55]">
                                      {item.tradeOff}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        );
                      }

                      if (block.type === 'diagram') {
                        return (
                          <AnimatedSystemDiagram
                            key={bIdx}
                            diagram={block.diagram}
                            isEn={isEn}
                          />
                        );
                      }

                      if (block.type === 'list') {
                        return (
                          <div key={bIdx} className="space-y-4">
                            {block.title && (
                              <h3 className="text-[16px] font-semibold text-[#17122B]">
                                {block.title}
                              </h3>
                            )}
                            <div className="space-y-3">
                              {block.items.map((listItem, lIdx) => (
                                <div
                                  key={lIdx}
                                  className="p-4 md:p-5 rounded-[18px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] flex items-start gap-3.5"
                                >
                                  <CheckCircle2
                                    size={18}
                                    className="text-[#6A3FD0] shrink-0 mt-0.5"
                                  />
                                  <div className="space-y-1">
                                    <h4 className="text-[15px] font-semibold text-[#17122B]">
                                      {listItem.title}
                                    </h4>
                                    <p className="text-[14px] text-[#5B5675] leading-[1.6]">
                                      {listItem.detail}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      }

                      if (block.type === 'image') {
                        const imgAsset =
                          SITE_IMAGES[block.imageKey as keyof typeof SITE_IMAGES] ||
                          SITE_IMAGES.ogDefault;
                        return (
                          <figure
                            key={bIdx}
                            className="rounded-[20px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] overflow-hidden"
                          >
                            <div className="aspect-[16/10] w-full bg-[#EFEAFB]">
                              <ImageWithFallback
                                src={imgAsset.src}
                                alt={block.caption}
                                width={imgAsset.width}
                                height={imgAsset.height}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <figcaption className="px-5 py-3.5 text-[13px] text-[#5B5675] border-t border-[rgba(91,60,196,0.12)]">
                              {block.caption}
                            </figcaption>
                          </figure>
                        );
                      }

                      if (block.type === 'metrics') {
                        return (
                          <div key={bIdx} className="space-y-6">
                            {/* Count-Up Metric Cards: only shown if valid numeric values exist */}
                            {validNumericMetrics.length > 0 && (
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {validNumericMetrics.map((metric, mIdx) => (
                                  <CountUpMetricCard key={mIdx} item={metric} isEn={isEn} />
                                ))}
                              </div>
                            )}

                            {/* Before / After Comparison Block */}
                            <div className="rounded-[22px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] overflow-hidden">
                              <div className="px-5 py-3.5 bg-[#EFEAFB] border-b border-[rgba(91,60,196,0.14)] flex flex-wrap items-center justify-between gap-2">
                                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#5230B0] font-semibold">
                                  {isEn
                                    ? 'OPERATIONAL BEFORE VS AFTER COMPARISON'
                                    : 'PERBANDINGAN OPERASIONAL SEBELUM VS SESUDAH'}
                                </span>
                                <span className="font-mono text-[11px] text-[#6A3FD0] font-semibold">
                                  {isEn ? 'VERIFIED METRICS' : 'METRIK TERUJI'}
                                </span>
                              </div>

                              <div className="divide-y divide-[rgba(91,60,196,0.12)]">
                                {block.beforeAfter.map((row, rIdx) => (
                                  <div
                                    key={rIdx}
                                    className="p-5 bg-[#FFFFFF] space-y-3"
                                  >
                                    <h4 className="text-[14px] font-semibold text-[#17122B]">
                                      {row.aspect}
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                      <div className="p-3.5 rounded-[14px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.1)] space-y-1">
                                        <span className="block font-mono text-[10px] uppercase tracking-[0.08em] text-[#5B5675] font-semibold">
                                          {isEn ? 'BEFORE' : 'SEBELUM'}
                                        </span>
                                        <p className="text-[13px] md:text-[14px] text-[#5B5675] leading-[1.55]">
                                          {row.before}
                                        </p>
                                      </div>

                                      <div className="p-3.5 rounded-[14px] bg-[#EFEAFB]/55 border border-[rgba(91,60,196,0.16)] space-y-1">
                                        <span className="block font-mono text-[10px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold">
                                          {isEn ? 'AFTER' : 'SESUDAH'}
                                        </span>
                                        <p className="text-[13px] md:text-[14px] text-[#17122B] font-medium leading-[1.55]">
                                          {row.after}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      }

                      if (block.type === 'quote') {
                        return (
                          <blockquote
                            key={bIdx}
                            className="p-6 rounded-[20px] bg-[#EFEAFB]/70 border-l-4 border-[#6A3FD0] space-y-2"
                          >
                            <p className="text-[15px] md:text-[16px] font-medium text-[#17122B] leading-[1.65]">
                              “{block.quote}”
                            </p>
                            <footer className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0]">
                              — {block.contextLabel}
                            </footer>
                          </blockquote>
                        );
                      }

                      return null;
                    })}
                  </div>
                </section>
              ))}

              {/* =====================================================
                  5. PULL QUOTE & OPTIONAL CLIENT TESTIMONIAL BLOCK
                  ===================================================== */}
              <div className="pt-4 space-y-6">
                {/* Practitioner Pull Quote */}
                <div className="p-6 md:p-8 rounded-[24px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.16)] space-y-3">
                  <Quote size={22} className="text-[#6A3FD0]" />
                  <p className="text-[17px] md:text-[19px] font-semibold text-[#17122B] leading-[1.5] tracking-[-0.015em]">
                    “{study.pullQuote.text}”
                  </p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0]">
                    {study.pullQuote.attribution}
                  </p>
                </div>

                {/* Optional Client Testimonial: only rendered when real testimonial is provided */}
                {study.testimonial && study.testimonial.quote && (
                  <div className="p-6 md:p-8 rounded-[24px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.18)] space-y-3">
                    <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold">
                      {isEn ? 'CLIENT TESTIMONIAL' : 'TESTIMONI KLIEN'}
                    </span>
                    <p className="text-[16px] text-[#17122B] leading-[1.65]">
                      “{study.testimonial.quote}”
                    </p>
                    <p className="text-[13px] font-medium text-[#5B5675]">
                      {study.testimonial.author} — {study.testimonial.role}
                    </p>
                  </div>
                )}
              </div>
            </article>
          </div>
        </Container>
      </section>

      {/* =====================================================
          6. RELATED LINKS: PORTFOLIO ITEM, SERVICE PAGES, BLOG & NEXT STUDY
          ===================================================== */}
      <section className="py-16 md:py-24 bg-[#F8F6FE] border-b border-[rgba(91,60,196,0.14)]">
        <Container className="max-w-[980px] space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Link to Matching Visual Portfolio Item */}
            {matchingProject && (
              <Card
                variant="white"
                className="flex flex-col justify-between space-y-5"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold">
                    <Layers size={14} />
                    <span>{isEn ? 'RELATED VISUAL PORTFOLIO' : 'PORTOFOLIO VISUAL TERKAIT'}</span>
                  </div>
                  <h3 className="text-[18px] md:text-[20px] font-semibold text-[#17122B]">
                    {matchingProject.title}
                  </h3>
                  <p className="text-[14px] text-[#5B5675] leading-[1.6]">
                    {isEn
                      ? 'View the UI screenshot gallery, feature specifications, and technical stack of this project.'
                      : 'Lihat galeri tangkapan layar antarmuka, spesifikasi fitur, dan rincian teknologi dari proyek ini.'}
                  </p>
                </div>

                <div className="pt-2">
                  <Button
                    to={toLocalizedHref(`/portfolio/${matchingProject.slug}`, locale, prefixMode)}
                    variant="secondary"
                  >
                    <span>{isEn ? 'View project gallery in Portfolio' : 'Lihat galeri proyek di Portofolio'}</span>
                    <ArrowUpRight size={15} className="text-[#6A3FD0]" />
                  </Button>
                </div>
              </Card>
            )}

            {/* Link to Matching Service Pages */}
            <Card
              variant="white"
              className="flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold">
                  <BookOpen size={14} />
                  <span>{isEn ? 'SERVICES DELIVERED' : 'LAYANAN YANG DIGUNAKAN'}</span>
                </div>
                <h3 className="text-[18px] md:text-[20px] font-semibold text-[#17122B]">
                  {isEn
                    ? 'Explore service scope & delivery timeline'
                    : 'Pelajari cakupan layanan & estimasi pengerjaan'}
                </h3>
                <div className="space-y-2 pt-1">
                  {relatedServices.map((srv) => (
                    <Link
                      key={srv.slug}
                      to={toLocalizedHref(`/jasa/${srv.slug}`, locale, prefixMode)}
                      className="group flex items-center justify-between p-3 rounded-[14px] bg-[#F8F6FE] hover:bg-[#EFEAFB] border border-[rgba(91,60,196,0.14)] transition-colors"
                    >
                      <div>
                        <span className="block text-[14px] font-semibold text-[#17122B] group-hover:text-[#6A3FD0]">
                          {srv.shortTitle}
                        </span>
                        <span className="block font-mono text-[11px] text-[#5B5675]">
                          {isEn ? `Estimated ${srv.timeline}` : `Estimasi ${srv.timeline}`} · {srv.pricingNote.label}
                        </span>
                      </div>
                      <ArrowRight
                        size={15}
                        className="text-[#6A3FD0] group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                  ))}
                </div>
              </div>

              {relatedPosts.length > 0 && (
                <div className="pt-3 border-t border-[rgba(91,60,196,0.12)] space-y-1.5">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.08em] text-[#5B5675]">
                    {isEn ? 'RELATED GUIDES:' : 'ARTIKEL PANDUAN TERKAIT:'}
                  </span>
                  {relatedPosts.map((post) => (
                    <Link
                      key={post.slug}
                      to={toLocalizedHref(`/blog/${post.slug}`, locale, prefixMode)}
                      className="block text-[13px] font-medium text-[#6A3FD0] hover:underline truncate"
                    >
                      → {post.title}
                    </Link>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* Next Case Study Card */}
          <div className="pt-4 border-t border-[rgba(91,60,196,0.14)]">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675] font-semibold">
                {isEn ? 'NEXT CASE STUDY' : 'STUDI KASUS BERIKUTNYA'}
              </span>
              <Link
                to={toLocalizedHref('/case-studies', locale, prefixMode)}
                className="text-[13px] font-semibold text-[#6A3FD0] hover:underline"
              >
                {isEn ? 'All Case Studies' : 'Semua Studi Kasus'}
              </Link>
            </div>

            <Link
              to={toLocalizedHref(`/case-studies/${nextStudy.slug}`, locale, prefixMode)}
              className="group block p-6 md:p-8 rounded-[24px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.16)] hover:border-[#6A3FD0] transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold">
                    <span>{nextStudy.industry}</span>
                    <span aria-hidden="true">·</span>
                    <span>{nextStudy.duration}</span>
                  </div>
                  <h3 className="text-[20px] md:text-[22px] font-semibold text-[#17122B] group-hover:text-[#6A3FD0] transition-colors">
                    {nextStudy.title}
                  </h3>
                  <p className="text-[14px] text-[#5B5675] leading-[1.6] line-clamp-2">
                    {nextStudy.oneSentenceSummary}
                  </p>
                </div>

                <div className="shrink-0">
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F8F6FE] group-hover:bg-[#6A3FD0] text-[#6A3FD0] group-hover:text-[#FFFFFF] font-semibold text-[14px] transition-colors whitespace-nowrap">
                    <span>{isEn ? 'Read next story' : 'Baca cerita berikutnya'}</span>
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </Container>
      </section>

      {/* =====================================================
          7. FINAL CTA BLOCK
          ===================================================== */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#FFFFFF] to-[#EFEAFB]">
        <Container className="max-w-[860px]">
          <CTABlock
            title={
              isEn
                ? 'Want to map your business workflow like this case study?'
                : 'Ingin membedah alur kerja bisnismu seperti studi kasus ini?'
            }
            description={
              isEn
                ? 'We start with a 30-minute conversation to map operational bottlenecks in your business. Free, directly with Chesta & Zeeshan.'
                : 'Kita mulai dari sesi obrolan 30 menit untuk memetakan titik macet operasional di tempatmu. Gratis, langsung bersama Chesta & Zeeshan.'
            }
            buttonLabel={
              isEn
                ? 'Free consultation via WhatsApp'
                : 'Konsultasi gratis via WhatsApp'
            }
            whatsappMessage={
              isEn
                ? `Hello Chesta & Zeeshan, I just read the "${study.title}" case study (/eng/case-studies/${study.slug}) and would like to discuss a system for my business.`
                : `Halo Chesta & Zeeshan, saya baru membaca studi kasus "${study.title}" (/case-studies/${study.slug}) dan ingin berdiskusi mengenai sistem untuk bisnis saya.`
            }
          />
        </Container>
      </section>
    </div>
  );
}
