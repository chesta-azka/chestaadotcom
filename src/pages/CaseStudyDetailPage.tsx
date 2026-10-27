import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
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
  Scale,
  Compass,
  GitBranch,
  Target,
} from 'lucide-react';
import SEOMetadata from '../components/atoms/SEOMetadata';
import {
  getCaseStudyBySlug,
  getAdjacentCaseStudies,
  CaseStudySection,
  CaseStudyDiagramData,
} from '../data/case-studies';
import FlowIllustration from '../components/atoms/FlowIllustration';
import {
  IllustrationData,
  IllustrationNode,
  IllustrationEdge,
  IllustrationStep,
} from '../data/illustrations';
import { getProjectBySlug } from '../data/projects';
import { getBlogPostBySlug, getBlogAlternateSlugs } from '../data/blog-posts';
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
import { lineDrawElement, staggerElements } from '../lib/motion';
import { parseLocalizedPath, toLocalizedHref } from '../lib/i18n';
import { getLocalizedService } from '../lib/i18n-content';
import { getServicePath } from '../data/services';

/**
 * Animated SVG System Diagram ("Alur sistem")
 * Draws connecting paths with stroke-dashoffset (GSAP lineDrawElement) and staggers the 6 flow nodes
 * plus optional safeguard branch ("Serah ke staf" / "Pulau interaktif ringan" / "Log error & antrean ulang").
 * Strictly labeled "Ilustrasi" / "Illustration".
 */
function AnimatedSystemDiagram({
  diagram,
  isEn,
}: {
  diagram: CaseStudyDiagramData;
  isEn: boolean;
}) {
  const illustrationData: IllustrationData = useMemo(() => {
    const nodeCount = diagram.nodes.length;
    const spacing = 500 / Math.max(nodeCount - 1, 1);
    
    const nodes: IllustrationNode[] = diagram.nodes.map((n, idx) => ({
      id: n.id || `node-${idx}`,
      label: n.title,
      sublabel: n.subtitle,
      icon: idx === 0 ? 'FileText' : idx === nodeCount - 1 ? 'CheckCircle2' : 'Workflow',
      x: 70 + idx * spacing,
      y: 90,
      role: idx === Math.floor(nodeCount / 2) ? 'hub' : 'module',
    }));

    if (diagram.branch) {
      const fromIdx = Math.min(diagram.branch.fromNodeIndex, nodes.length - 1);
      const parentNode = nodes[fromIdx];
      nodes.push({
        id: 'branch-node',
        label: diagram.branch.title,
        sublabel: diagram.branch.subtitle,
        icon: 'User',
        x: parentNode ? parentNode.x : 280,
        y: 190,
        role: 'branch',
      });
    }

    const edges: IllustrationEdge[] = [];
    for (let i = 0; i < diagram.nodes.length - 1; i++) {
      edges.push({
        id: `e-${nodes[i].id}-${nodes[i+1].id}`,
        from: nodes[i].id,
        to: nodes[i+1].id,
        dots: 1,
        kind: 'normal',
      });
    }

    if (diagram.branch && nodes.length > 0) {
      const fromIdx = Math.min(diagram.branch.fromNodeIndex, diagram.nodes.length - 1);
      edges.push({
        id: 'e-branch',
        from: nodes[fromIdx].id,
        to: 'branch-node',
        dots: 0,
        kind: 'branch',
        label: diagram.branch.stepLabel,
      });
    }

    const steps: IllustrationStep[] = diagram.nodes.map((n) => ({
      highlightNodes: [n.id],
      caption: `${n.title}: ${n.subtitle}`,
    }));

    return {
      id: `cs-${diagram.caption}`,
      variant: 'casestudy-flow',
      theme: 'light',
      title: diagram.caption || (isEn ? 'System Architecture Flow' : 'Alur Arsitektur Sistem'),
      description: diagram.caption,
      chipLabel: isEn ? 'Illustration' : 'Ilustrasi',
      viewBox: diagram.branch ? '0 0 640 250' : '0 0 640 160',
      nodes,
      edges,
      steps,
    };
  }, [diagram, isEn]);

  return (
    <figure className="my-6">
      <FlowIllustration
        data={illustrationData}
        locale={isEn ? 'en' : 'id'}
        className="w-full"
      />
    </figure>
  );
}





export default function CaseStudyDetailPage() {
  const location = useLocation();
  const { locale, prefixMode } = parseLocalizedPath(location.pathname);
  const isEn = locale === 'en';

  const { slug } = useParams<{ slug: string }>();
  const study = useMemo(() => getCaseStudyBySlug(slug, locale), [slug, locale]);

  const [activeSectionId, setActiveSectionId] = useState<string>(
    study?.sections[0]?.id || 'konteks-bisnis'
  );
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

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
    setActiveSectionId(study.sections[0]?.id || 'konteks-bisnis');
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

  const caseStudiesHref = toLocalizedHref('/studi-kasus', locale, prefixMode);

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
              ? 'The case study page you requested is not available yet. View all internal project stories on our Case Studies page.'
              : 'Halaman studi kasus yang kamu cari belum tersedia. Lihat daftar cerita proyek internal kami di halaman Studi Kasus.'
          }
          path={toLocalizedHref(`/studi-kasus/${slug || ''}`, locale, prefixMode)}
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
              ? 'The link may have been updated. Please return to the case studies index to read the stories behind our internal projects.'
              : 'Tautan mungkin telah diperbarui. Silakan kembali ke halaman daftar studi kasus untuk membaca cerita di balik proyek internal kami.'}
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

  const { prev: prevStudy, next: nextStudy } = getAdjacentCaseStudies(
    study.slug,
    locale
  );
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

  const coverAsset =
    SITE_IMAGES[study.cover as keyof typeof SITE_IMAGES] || SITE_IMAGES.ogDefault;
  const studyPath = toLocalizedHref(
    `/studi-kasus/${study.slug}`,
    locale,
    prefixMode
  );
  const canonicalUrl = `https://chestaa.com${studyPath}`;
  const metaDescription = study.seo.description;

  const jsonLdGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${canonicalUrl}#article`,
        headline: study.title,
        description: metaDescription,
        image: `https://chestaa.com${coverAsset.src}`,
        datePublished: study.publishedAt,
        dateModified: study.updatedAt,
        inLanguage: isEn ? 'en' : 'id-ID',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl,
        },
        author: {
          '@type': 'Person',
          name: study.author,
          jobTitle: study.authorRole,
          url: `https://chestaa.com${toLocalizedHref('/about', locale, prefixMode)}`,
        },
        publisher: {
          '@type': 'Organization',
          '@id': 'https://chestaa.com/#org',
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

  return (
    <div className="bg-[#FFFFFF] text-[#17122B] min-h-screen">
      <SEOMetadata
        title={study.seo.title}
        description={metaDescription}
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
          1. EDITORIAL HEADER: BREADCRUMB, BADGES, H1, SUMMARY CARD & COVER
          ===================================================== */}
      <header className="pt-28 pb-12 md:pt-36 md:pb-16 bg-gradient-to-b from-[#FFFFFF] via-[#F8F6FE] to-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)]">
        <Container className="max-w-[980px] space-y-8">
          <div>
            <Breadcrumb
              items={[
                {
                  label: isEn ? 'Case Studies' : 'Studi Kasus',
                  to: caseStudiesHref,
                },
                { label: study.title },
              ]}
            />

            <div className="space-y-4">
              {/* Badges: Proyek internal, industry, service tags, reading time */}
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="dark">{study.internalBadgeLabel}</Badge>
                <Badge variant="tint">{study.industry}</Badge>
                {study.services.map((srv) => (
                  <Badge key={srv} variant="outline">
                    {srv}
                  </Badge>
                ))}
                <span className="px-3 py-1 rounded-full bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] font-mono text-[11px] text-[#5B5675]">
                  {study.readingTime}
                </span>
              </div>

              <WordRevealHeading
                as="h1"
                priority
                text={study.title}
                className="max-w-4xl"
              />

              <p className="text-[16px] md:text-[18px] text-[#5B5675] leading-[1.6] max-w-3xl">
                {study.oneSentenceSummary}
              </p>

              {/* Author & Meta Strip */}
              <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-[#5B5675]">
                <span>
                  {isEn ? 'Written by ' : 'Ditulis oleh '}
                  <strong className="text-[#17122B]">{study.author}</strong> ({study.authorRole})
                </span>
                <span aria-hidden="true" className="text-[#5B5675]/40">
                  ·
                </span>
                <span>{study.client}</span>
                <span aria-hidden="true" className="text-[#5B5675]/40">
                  ·
                </span>
                <span>{study.year}</span>
              </div>
            </div>
          </div>

          {/* 2-Column Summary Card: Masalah | Yang dibangun */}
          <div className="rounded-[24px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.18)] p-6 md:p-8 shadow-[0_12px_36px_-12px_rgba(106,63,208,0.08)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Column 1: Masalah */}
              <div className="space-y-2 md:pr-6 md:border-r border-[rgba(91,60,196,0.12)]">
                <span className="inline-block font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675] font-semibold">
                  {isEn ? 'PROBLEM' : 'MASALAH'}
                </span>
                <p className="text-[15px] md:text-[16px] text-[#17122B] leading-[1.65]">
                  {study.summary.problem}
                </p>
              </div>

              {/* Column 2: Yang dibangun */}
              <div className="space-y-2">
                <span className="inline-block font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold">
                  {isEn ? 'WHAT WE BUILT' : 'YANG DIBANGUN'}
                </span>
                <p className="text-[15px] md:text-[16px] font-medium text-[#17122B] leading-[1.65]">
                  {study.summary.built}
                </p>
              </div>
            </div>
          </div>

          {/* Cover Illustration (labeled "Ilustrasi", hover scale 1.03) */}
          <figure className="group rounded-[24px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.16)] overflow-hidden shadow-[0_12px_32px_-12px_rgba(106,63,208,0.08)]">
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#EFEAFB]">
              <ImageWithFallback
                src={coverAsset.src}
                alt={study.coverCaption || coverAsset.alt}
                width={coverAsset.width}
                height={coverAsset.height}
                priority={true}
                viewTransitionName={`case-study-cover-${study.slug}`}
                className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#6A3FD0] text-[#FFFFFF] font-mono text-[11px] uppercase tracking-[0.08em] font-semibold">
                  {study.internalBadgeLabel}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#FFFFFF]/92 backdrop-blur-sm border border-[rgba(91,60,196,0.18)] font-mono text-[11px] uppercase tracking-[0.08em] text-[#5230B0] font-semibold">
                  {isEn ? 'Illustration' : 'Ilustrasi'}
                </span>
              </div>
            </div>
            <figcaption className="px-5 md:px-6 py-3.5 bg-[#F8F6FE] border-t border-[rgba(91,60,196,0.12)] flex flex-wrap items-center justify-between gap-2 text-[13px] text-[#5B5675]">
              <span>{study.coverCaption}</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold shrink-0">
                {isEn ? 'Illustration' : 'Ilustrasi'}
              </span>
            </figcaption>
          </figure>
        </Container>
      </header>

      {/* =====================================================
          2. EDITORIAL READING COLUMN (MAX 68CH) + STICKY TOC
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
                <span>
                  {isEn
                    ? `Story Table of Contents (${study.sections.length} Parts)`
                    : `Daftar Isi Cerita (${study.sections.length} Bagian)`}
                </span>
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

          {/* Desktop 2-Column Editorial Layout: Sticky TOC + max-w-[68ch] Reading Column */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Sticky Table of Contents (Desktop) */}
            <aside className="hidden lg:block lg:col-span-4 lg:sticky lg:top-28 space-y-6">
              <div className="p-5 rounded-[20px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] space-y-4">
                <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675] font-semibold">
                  {isEn ? 'STORY TABLE OF CONTENTS' : 'DAFTAR ISI CERITA'}
                </span>

                <nav
                  aria-label={
                    isEn ? 'Case study table of contents' : 'Daftar isi studi kasus'
                  }
                  className="space-y-1"
                >
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
                    {isEn ? 'VISUAL PROJECT SHOWCASE' : 'GALERI VISUAL PROYEK'}
                  </span>
                  <p className="text-[13px] text-[#5B5675] leading-[1.55]">
                    {isEn
                      ? 'Inspect the visual illustrations and feature list of this internal project in our portfolio.'
                      : 'Lihat ilustrasi antarmuka dan rincian fitur proyek internal ini di halaman portofolio.'}
                  </p>
                  <Link
                    to={toLocalizedHref(
                      `/portfolio/${matchingProject.slug}`,
                      locale,
                      prefixMode
                    )}
                    className="group inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#6A3FD0] hover:underline"
                  >
                    <span>
                      {isEn ? 'Open in Portfolio' : 'Buka di Portofolio'}
                    </span>
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-200 group-hover:translate-x-[4px]"
                    />
                  </Link>
                </div>
              )}
            </aside>

            {/* Right Main Editorial Reading Column (strictly max-w-[68ch]) */}
            <article className="lg:col-span-8 w-full max-w-[68ch] space-y-14">
              {study.sections.map((section: CaseStudySection) => (
                <Reveal key={section.id}>
                  <section
                    id={section.id}
                    className="scroll-mt-28 space-y-5 pb-10 border-b border-[rgba(91,60,196,0.12)] last:border-b-0 last:pb-0"
                  >
                    {/* Section Heading */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold">
                        <span>
                          {isEn ? `PART ${section.number}` : `BAGIAN ${section.number}`}
                        </span>
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
                                  className="text-[15px] md:text-[16px] text-[#5B5675] leading-[1.75]"
                                >
                                  {paragraph}
                                </p>
                              ))}
                            </div>
                          );
                        }

                        if (block.type === 'callout') {
                          return (
                            <div
                              key={bIdx}
                              className="p-5 md:p-6 rounded-[20px] bg-[#EFEAFB]/70 border border-[rgba(91,60,196,0.2)] space-y-2"
                            >
                              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold">
                                <Compass size={14} />
                                <span>{block.callout.label}</span>
                              </div>
                              <h3 className="text-[16px] md:text-[17px] font-semibold text-[#17122B]">
                                {block.callout.title}
                              </h3>
                              <p className="text-[14px] md:text-[15px] text-[#17122B]/90 leading-[1.65]">
                                {block.callout.body}
                              </p>
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
                                        {isEn ? 'Limitation: ' : 'Kendala: '}
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

                        if (block.type === 'targets') {
                          return (
                            <div key={bIdx} className="space-y-6">
                              {/* Static Design Target Cards — NO COUNT-UP, clearly labeled "Target desain, bukan hasil klien" */}
                              <div className="p-5 md:p-6 rounded-[24px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.18)] space-y-5">
                                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[rgba(91,60,196,0.12)]">
                                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold">
                                    <Target size={14} />
                                    <span>{block.badgeLabel}</span>
                                  </span>
                                  <span className="px-2.5 py-0.5 rounded-full bg-[#EFEAFB] border border-[rgba(91,60,196,0.16)] font-mono text-[10px] uppercase tracking-[0.08em] text-[#5230B0] font-semibold">
                                    {study.internalBadgeLabel}
                                  </span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                  {block.targets.map((target, tIdx) => (
                                    <div
                                      key={tIdx}
                                      className="p-4 rounded-[18px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.16)] flex flex-col justify-between space-y-2"
                                    >
                                      <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675]">
                                        {target.label}
                                      </span>
                                      <span className="block text-[20px] md:text-[22px] font-semibold tracking-[-0.02em] text-[#6A3FD0] leading-tight">
                                        {target.value}
                                      </span>
                                      <p className="text-[12px] text-[#5B5675] leading-[1.45]">
                                        {target.note}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Optional Before vs Design Target Comparison */}
                              {block.beforeAfter && block.beforeAfter.length > 0 && (
                                <div className="rounded-[22px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] overflow-hidden">
                                  <div className="px-5 py-3.5 bg-[#EFEAFB] border-b border-[rgba(91,60,196,0.14)] flex flex-wrap items-center justify-between gap-2">
                                    <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#5230B0] font-semibold">
                                      {isEn
                                        ? 'MANUAL WORKFLOW VS DESIGN TARGET'
                                        : 'ALUR MANUAL VS TARGET DESAIN'}
                                    </span>
                                    <span className="font-mono text-[11px] text-[#6A3FD0] font-semibold">
                                      {block.badgeLabel}
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
                                              {isEn ? 'MANUAL BASELINE' : 'KONDISI AWAL'}
                                            </span>
                                            <p className="text-[13px] md:text-[14px] text-[#5B5675] leading-[1.55]">
                                              {row.before}
                                            </p>
                                          </div>

                                          <div className="p-3.5 rounded-[14px] bg-[#EFEAFB]/55 border border-[rgba(91,60,196,0.16)] space-y-1">
                                            <span className="block font-mono text-[10px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold">
                                              {isEn ? 'DESIGN TARGET' : 'TARGET DESAIN'}
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
                              )}
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
                </Reveal>
              ))}

              {/* Practitioner Pull Quote (No client testimonials per Honesty Rules) */}
              <Reveal>
                <div className="pt-4">
                  <div className="p-6 md:p-8 rounded-[24px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.16)] space-y-3">
                    <Quote size={22} className="text-[#6A3FD0]" />
                    <p className="text-[17px] md:text-[19px] font-semibold text-[#17122B] leading-[1.5] tracking-[-0.015em]">
                      “{study.pullQuote.text}”
                    </p>
                    <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0]">
                      {study.pullQuote.attribution}
                    </p>
                  </div>
                </div>
              </Reveal>
            </article>
          </div>
        </Container>
      </section>

      {/* =====================================================
          3. RELATED LINKS: PORTFOLIO ENTRY, SERVICE PAGES, PREV / NEXT CASE STUDY
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
                    <span>
                      {isEn
                        ? 'MATCHING PORTFOLIO SHOWCASE'
                        : 'GALERI PORTOFOLIO TERKAIT'}
                    </span>
                  </div>
                  <h3 className="text-[18px] md:text-[20px] font-semibold text-[#17122B]">
                    {matchingProject.title}
                  </h3>
                  <p className="text-[14px] text-[#5B5675] leading-[1.6]">
                    {isEn
                      ? 'View the visual showcase, 3 system illustrations, feature specifications, and stack for this internal project.'
                      : 'Lihat tampilan visual, 3 ilustrasi sistem, spesifikasi fitur, dan rincian teknologi dari proyek internal ini.'}
                  </p>
                </div>

                <div className="pt-2">
                  <Button
                    to={toLocalizedHref(
                      `/portfolio/${matchingProject.slug}`,
                      locale,
                      prefixMode
                    )}
                    variant="secondary"
                  >
                    <span>
                      {isEn
                        ? 'View project in Portfolio'
                        : 'Lihat proyek di Portofolio'}
                    </span>
                    <ArrowUpRight size={15} className="text-[#6A3FD0]" />
                  </Button>
                </div>
              </Card>
            )}

            {/* Link to Relevant Service Pages */}
            <Card
              variant="white"
              className="flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold">
                  <BookOpen size={14} />
                  <span>
                    {isEn ? 'RELEVANT SERVICE PAGE' : 'HALAMAN LAYANAN TERKAIT'}
                  </span>
                </div>
                <h3 className="text-[18px] md:text-[20px] font-semibold text-[#17122B]">
                  {isEn
                    ? 'Explore service deliverables & scope'
                    : 'Pelajari rincian layanan & cakupan kerja'}
                </h3>
                <div className="space-y-2 pt-1">
                  {relatedServices.map((srv) => (
                    <Link
                      key={srv.slug}
                      to={getServicePath(srv.slug, locale)}
                      className="group flex items-center justify-between p-3.5 rounded-[14px] bg-[#F8F6FE] hover:bg-[#EFEAFB] border border-[rgba(91,60,196,0.14)] transition-colors"
                    >
                      <div>
                        <span className="block text-[14px] font-semibold text-[#17122B] group-hover:text-[#6A3FD0]">
                          {srv.title}
                        </span>
                        <span className="block font-mono text-[11px] text-[#5B5675]">
                          {srv.pricingNote.label}
                        </span>
                      </div>
                      <ArrowRight
                        size={15}
                        className="text-[#6A3FD0] transition-transform duration-200 group-hover:translate-x-[4px]"
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

          {/* Prev / Next Case Study Navigation */}
          <div className="pt-4 border-t border-[rgba(91,60,196,0.14)] space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675] font-semibold">
                {isEn ? 'OTHER INTERNAL CASE STUDIES' : 'STUDI KASUS INTERNAL LAINNYA'}
              </span>
              <Link
                to={caseStudiesHref}
                className="text-[13px] font-semibold text-[#6A3FD0] hover:underline"
              >
                {isEn ? 'All Case Studies' : 'Semua Studi Kasus'}
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Previous Case Study */}
              <Link
                to={toLocalizedHref(
                  `/studi-kasus/${prevStudy.slug}`,
                  locale,
                  prefixMode
                )}
                className="group p-6 rounded-[24px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.16)] hover:border-[#6A3FD0] transition-all flex flex-col justify-between space-y-3"
              >
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675]">
                  <ArrowLeft
                    size={14}
                    className="text-[#6A3FD0] transition-transform duration-200 group-hover:-translate-x-[4px]"
                  />
                  <span>{isEn ? 'Previous Story' : 'Cerita Sebelumnya'}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#6A3FD0] font-semibold">
                    {prevStudy.industry}
                  </span>
                </div>
                <h3 className="text-[18px] font-semibold text-[#17122B] group-hover:text-[#6A3FD0] transition-colors leading-snug">
                  {prevStudy.title}
                </h3>
                <p className="text-[13px] text-[#5B5675] line-clamp-2">
                  {prevStudy.summary.built}
                </p>
              </Link>

              {/* Next Case Study */}
              <Link
                to={toLocalizedHref(
                  `/studi-kasus/${nextStudy.slug}`,
                  locale,
                  prefixMode
                )}
                className="group p-6 rounded-[24px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.16)] hover:border-[#6A3FD0] transition-all flex flex-col justify-between space-y-3"
              >
                <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675]">
                  <span className="text-[#6A3FD0] font-semibold">
                    {nextStudy.industry}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span>{isEn ? 'Next Story' : 'Cerita Berikutnya'}</span>
                    <ArrowRight
                      size={14}
                      className="text-[#6A3FD0] transition-transform duration-200 group-hover:translate-x-[4px]"
                    />
                  </span>
                </div>
                <h3 className="text-[18px] font-semibold text-[#17122B] group-hover:text-[#6A3FD0] transition-colors leading-snug">
                  {nextStudy.title}
                </h3>
                <p className="text-[13px] text-[#5B5675] line-clamp-2">
                  {nextStudy.summary.built}
                </p>
              </Link>
            </div>
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
                : 'Ingin membedah alur kerja serupa untuk bisnismu?'
            }
            description={
              isEn
                ? 'We start with a free 30-minute audit via WhatsApp or video call to map your current workflow and what makes sense to build.'
                : 'Kita mulai dari audit gratis 30 menit lewat WhatsApp atau video call untuk melihat masalah, alur sekarang, dan apa yang masuk akal dibangun.'
            }
            whatsappContext={{
              type: 'case-study',
              title: study.title,
              url: studyPath,
            }}
          />
        </Container>
      </section>
    </div>
  );
}
