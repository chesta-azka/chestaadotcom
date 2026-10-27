import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Lock,
  Maximize2,
  Smartphone,
  Globe,
  X,
  CheckCircle2,
} from 'lucide-react';
import SEOMetadata from '../components/atoms/SEOMetadata';
import {
  getProjectBySlug,
  getAdjacentProjects,
  PortfolioProject,
  ProjectGalleryItem,
} from '../data/projects';
import { getCaseStudyBySlug } from '../data/case-studies';
import { SITE_IMAGES } from '../config/images';
import {
  Container,
  Button,
  Card,
  Badge,
  SectionHeading,
  WordRevealHeading,
  Reveal,
  CTABlock,
  Breadcrumb,
  ImageWithFallback,
} from '../components/ui/DesignSystem';
import { parseLocalizedPath, toLocalizedHref, PrefixMode } from '../lib/i18n';
import { getServicePath } from '../data/services';
import FlowIllustration from '../components/atoms/FlowIllustration';

export default function ProjectDetailPage() {
  const location = useLocation();
  const { locale, prefixMode } = parseLocalizedPath(location.pathname);
  const isEn = locale === 'en';

  const params = useParams<{ slug?: string; id?: string }>();
  const rawSlug = params.slug || params.id || '';
  const project = getProjectBySlug(rawSlug, locale);

  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  const openLightbox = (index: number, triggerEl: HTMLElement | null) => {
    lastFocusedElementRef.current = triggerEl;
    setLightboxIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    if (lastFocusedElementRef.current) {
      lastFocusedElementRef.current.focus();
    }
  }, []);

  const portfolioHref = toLocalizedHref('/portfolio', locale, prefixMode);

  if (!project) {
    return (
      <div className="bg-[#FFFFFF] text-[#17122B] min-h-screen pt-32 pb-24">
        <SEOMetadata
          title={
            isEn
              ? 'Project Not Found | CHESTAADOTCOM'
              : 'Proyek Tidak Ditemukan | CHESTAADOTCOM'
          }
          description={
            isEn
              ? 'The portfolio project page you requested was not found. View all projects we have built at CHESTAADOTCOM.'
              : 'Halaman proyek portofolio yang kamu cari tidak ditemukan. Lihat daftar proyek yang sudah kami bangun di CHESTAADOTCOM.'
          }
          path={toLocalizedHref(`/portfolio/${rawSlug}`, locale, prefixMode)}
        />
        <Container className="max-w-xl text-center space-y-5">
          <Badge variant="tint">
            {isEn ? '404 · PROJECT NOT FOUND' : '404 · PROYEK TIDAK DITEMUKAN'}
          </Badge>
          <h1>
            {isEn
              ? 'The project you are looking for is not available yet'
              : 'Proyek yang kamu cari belum tersedia'}
          </h1>
          <p className="text-[15px] md:text-[16px] text-[#5B5675] leading-[1.65]">
            {isEn
              ? 'The project URL may have changed or is currently being updated. Please return to the main portfolio page to browse other projects.'
              : 'URL proyek mungkin telah berubah atau sedang dalam pembaruan dokumentasi. Silakan kembali ke halaman utama portofolio untuk melihat daftar proyek lainnya.'}
          </p>
          <div className="pt-2 flex justify-center">
            <Button to={portfolioHref} variant="primary">
              <ArrowLeft size={16} />
              <span>
                {isEn ? 'Back to Portfolio' : 'Kembali ke Portofolio'}
              </span>
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  const { prev, next } = getAdjacentProjects(project.slug, locale);
  const coverAsset =
    SITE_IMAGES[project.cover as keyof typeof SITE_IMAGES] || SITE_IMAGES.ogDefault;
  const targetCaseSlug = project.relatedCaseSlug || project.caseStudySlug;
  const relatedCaseStudy = targetCaseSlug
    ? getCaseStudyBySlug(targetCaseSlug, locale)
    : undefined;

  const projectPath = toLocalizedHref(
    `/portfolio/${project.slug}`,
    locale,
    prefixMode
  );
  const canonicalUrl = `https://chestaa.com${projectPath}`;
  const isSoftwareApp =
    project.category === 'software' || project.category === 'ai-agent';

  const jsonLdGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': isSoftwareApp ? ['CreativeWork', 'SoftwareApplication'] : 'CreativeWork',
        '@id': `${canonicalUrl}#work`,
        name: project.title,
        headline: project.title,
        description: project.oneLiner,
        url: canonicalUrl,
        image: `https://chestaa.com${coverAsset.src}`,
        dateCreated: project.year,
        dateModified: project.updatedAt,
        inLanguage: isEn ? 'en' : 'id-ID',
        genre: project.categoryLabel,
        keywords: [...project.stack, project.industry, project.categoryLabel].join(', '),
        creator: {
          '@type': 'Organization',
          '@id': 'https://chestaa.com/#organization',
          name: 'CHESTAADOTCOM',
          url: 'https://chestaa.com',
        },
        ...(isSoftwareApp
          ? {
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web, WhatsApp Cloud API',
            }
          : {}),
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
            name: isEn ? 'Portfolio' : 'Portofolio',
            item: `https://chestaa.com${portfolioHref}`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: project.title,
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  // Combine cover + gallery items so clicking either cover or gallery opens the accessible Lightbox
  const allLightboxItems: ProjectGalleryItem[] = [
    {
      imageKey: project.cover,
      label: isEn ? 'Illustration' : 'Ilustrasi',
      caption: `${project.title} — ${project.oneLiner}`,
      layout: 'full',
    },
    ...project.gallery,
  ];

  return (
    <div className="bg-[#FFFFFF] text-[#17122B] min-h-screen">
      <SEOMetadata
        title={project.seo.title}
        description={project.seo.description}
        path={projectPath}
        image={coverAsset.src}
        jsonLd={jsonLdGraph}
      />

      {/* =====================================================
          1. BREADCRUMB, H1, ONE-LINER & TAGS
          ===================================================== */}
      <section className="pt-28 pb-12 md:pt-36 md:pb-16 bg-gradient-to-b from-[#FFFFFF] via-[#F8F6FE] to-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)]">
        <Container>
          <Breadcrumb
            items={[
              { label: isEn ? 'Portfolio' : 'Portofolio', to: portfolioHref },
              { label: project.title },
            ]}
          />

          <div className="max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="dark">{project.internalBadgeLabel}</Badge>
              <Badge variant="tint">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6A3FD0]" />
                <span>{project.categoryLabel}</span>
              </Badge>
              <Badge variant="outline">{project.industry}</Badge>
            </div>

            <WordRevealHeading as="h1" priority text={project.title} />

            <p className="text-[16px] md:text-[18px] text-[#5B5675] leading-[1.6]">
              {project.oneLiner}
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EFEAFB] border border-[rgba(91,60,196,0.16)] font-mono text-[12px] text-[#6A3FD0]">
              <strong>{isEn ? 'Design target:' : 'Target desain:'}</strong>
              <span>{project.targetNote}</span>
            </div>
          </div>

          {/* =====================================================
              2. LARGE COVER IN GLASS DEVICE FRAME (REVEAL ON LOAD)
              ===================================================== */}
          <div className="mt-10 animate-[vt-fade-in_320ms_cubic-bezier(0.22,1,0.36,1)_both]">
            <DeviceFrameCover
              project={project}
              coverAsset={coverAsset}
              onInspect={(btn) => openLightbox(0, btn)}
              isEn={isEn}
            />
          </div>

          {/* =====================================================
              3. META ROW: KLIEN, TAHUN, PERAN, DURASI, STACK, LINK LIVE
              ===================================================== */}
          <div className="mt-8 rounded-[24px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] shadow-[0_6px_20px_-6px_rgba(106,63,208,0.05)] p-5 md:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
              {/* Klien */}
              <div className="space-y-1">
                <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675]">
                  {isEn ? 'Client' : 'Klien'}
                </span>
                <p className="text-[14px] font-semibold text-[#17122B] leading-snug">
                  {project.client}
                </p>
              </div>

              {/* Tahun */}
              <div className="space-y-1">
                <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675]">
                  {isEn ? 'Year' : 'Tahun'}
                </span>
                <p className="text-[14px] font-semibold text-[#17122B]">
                  {project.year}
                </p>
              </div>

              {/* Peran */}
              <div className="space-y-1">
                <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675]">
                  {isEn ? 'Role' : 'Peran'}
                </span>
                <p className="text-[14px] font-semibold text-[#17122B] leading-snug">
                  {project.role}
                </p>
              </div>

              {/* Durasi */}
              <div className="space-y-1">
                <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675]">
                  {isEn ? 'Build Duration' : 'Durasi Pengerjaan'}
                </span>
                <p className="text-[14px] font-semibold text-[#17122B]">
                  {project.duration}
                </p>
              </div>

              {/* Stack */}
              <div className="space-y-1.5">
                <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675]">
                  {isEn ? 'Tech Stack' : 'Stack Teknologi'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded-full bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] font-mono text-[11px] text-[#6A3FD0] font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Link Live / NDA Badge */}
              <div className="space-y-1.5">
                <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675]">
                  {isEn ? 'Live Link' : 'Link Live'}
                </span>
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#6A3FD0] hover:underline"
                  >
                    <span>{isEn ? 'Open Live Site' : 'Buka Situs Live'}</span>
                    <ExternalLink size={14} />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFEAFB] border border-[rgba(91,60,196,0.16)] font-mono text-[11px] text-[#6A3FD0] font-semibold">
                    <Lock size={12} />
                    <span>
                      {project.liveStatusLabel ||
                        (isEn
                          ? 'Internal System / Client NDA'
                          : 'Sistem Internal / NDA Klien')}
                    </span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          4. RINGKASAN (2 PARAGRAPHS) & FITUR UTAMA (MIXED LAYOUT)
          ===================================================== */}
      <section className="py-16 md:py-24 bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)]">
        <Container className="space-y-16">
          {/* 4A. Ringkasan Proyek (2 Short Paragraphs) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 space-y-2">
              <span className="block font-mono text-[11px] md:text-[12px] uppercase tracking-[0.08em] font-semibold text-[#6A3FD0]">
                {isEn ? 'PROJECT SUMMARY' : 'RINGKASAN PROYEK'}
              </span>
              <h2 className="text-[#17122B]">
                {isEn
                  ? 'Context & what we built'
                  : 'Konteks & solusi yang dibangun'}
              </h2>
              <div className="pt-2">
                <Link
                  to={getServicePath(project.serviceSlug, locale)}
                  className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#6A3FD0] hover:underline"
                >
                  <span>
                    {isEn
                      ? `View ${project.categoryLabel} service`
                      : `Lihat layanan ${project.categoryLabel}`}
                  </span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              {project.summaryParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-[15px] md:text-[16px] text-[#5B5675] leading-[1.65]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* 4A.5 Alur Sistem Proyek (Data-Driven Architecture Diagram) */}
          <div className="pt-8 border-t border-[rgba(91,60,196,0.14)]">
            <FlowIllustration
              id={
                project.serviceSlug === 'pembuatan-website'
                  ? 'website-flow'
                  : project.serviceSlug === 'ai-agent'
                  ? 'agent-flow'
                  : project.serviceSlug === 'software-custom'
                  ? 'software-flow'
                  : 'workflow-flow'
              }
              locale={locale}
              className="max-w-4xl mx-auto"
            />
          </div>

          {/* 4B. Fitur Utama (Mixed Layout — Not Identical Cards) */}
          <div className="pt-8 border-t border-[rgba(91,60,196,0.14)]">
            <SectionHeading
              eyebrow={
                isEn ? 'FUNCTIONAL SPECIFICATIONS' : 'SPESIFIKASI FUNGSIONAL'
              }
              title={
                isEn
                  ? 'Core features running inside the system'
                  : 'Fitur utama yang berjalan di sistem'
              }
              description={
                isEn
                  ? 'Key components we engineered so daily operations run automatically and stay easy for your team to monitor.'
                  : 'Komponen inti yang kami rancang agar operasional harian berjalan otomatis dan mudah diawasi tim kamu.'
              }
            />

            <MixedFeaturesLayout features={project.features} isEn={isEn} />
          </div>
        </Container>
      </section>

      {/* =====================================================
          5. GALLERY (ALTERNATING 1 FULL-WIDTH + 2 HALF-WIDTH) & LIGHTBOX
          ===================================================== */}
      <section className="py-16 md:py-24 bg-[#F8F6FE] border-b border-[rgba(91,60,196,0.14)]">
        <Container>
          <SectionHeading
            eyebrow={
              isEn ? 'INTERFACE & WORKFLOW GALLERY' : 'GALERI ANTARMUKA & ALUR'
            }
            title={isEn ? 'Visual system captures' : 'Tangkapan visual sistem'}
            description={
              isEn
                ? 'Click any image to inspect it in full screen (use arrow keys or swipe to navigate).'
                : 'Klik gambar mana pun untuk memperbesar tampilan di layar penuh (gunakan tombol panah atau geser layar untuk berpindah).'
            }
          />

          {/* Alternating 1 Full-Width (md:col-span-2) + 2 Half-Width (md:col-span-1) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.gallery.map((item, idx) => {
              const isFullWidth = idx % 3 === 0 || item.layout === 'full';
              const galleryAsset =
                SITE_IMAGES[item.imageKey as keyof typeof SITE_IMAGES] ||
                SITE_IMAGES.ogDefault;
              // Index in allLightboxItems is idx + 1 because index 0 is the cover
              const targetLightboxIdx = idx + 1;

              return (
                <Reveal
                  key={`${item.imageKey}-${idx}`}
                  delay={idx * 0.06}
                  className={isFullWidth ? 'md:col-span-2' : 'md:col-span-1'}
                >
                  <figure className="group rounded-[24px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] hover:border-[#6A3FD0]/50 overflow-hidden shadow-[0_6px_20px_-6px_rgba(106,63,208,0.05)] transition-all">
                    <button
                      type="button"
                      onClick={(e) => openLightbox(targetLightboxIdx, e.currentTarget)}
                      aria-label={
                        isEn
                          ? `Enlarge image: ${item.caption}`
                          : `Perbesar gambar: ${item.caption}`
                      }
                      className="relative block w-full text-left cursor-pointer overflow-hidden focus-visible:outline-2 focus-visible:outline-[#6A3FD0]"
                    >
                      <div
                        className={`w-full overflow-hidden bg-[#EFEAFB] ${
                          isFullWidth ? 'aspect-[16/9]' : 'aspect-[4/3]'
                        }`}
                      >
                        <ImageWithFallback
                          src={galleryAsset.src}
                          alt={item.caption}
                          width={galleryAsset.width}
                          height={galleryAsset.height}
                          className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                        />
                      </div>

                      <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-[#FFFFFF]/90 backdrop-blur-sm border border-[rgba(91,60,196,0.16)] text-[#17122B] font-mono text-[11px] inline-flex items-center gap-1.5 opacity-90 group-hover:opacity-100 group-hover:border-[#6A3FD0] transition-all">
                        <Maximize2 size={12} className="text-[#6A3FD0]" />
                        <span>{isEn ? 'Enlarge' : 'Perbesar'}</span>
                      </div>
                    </button>

                    <figcaption className="px-5 md:px-6 py-4 bg-[#FFFFFF] border-t border-[rgba(91,60,196,0.14)] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[13px] md:text-[14px] text-[#5B5675]">
                      <span>{item.caption}</span>
                      <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] shrink-0">
                        {item.label} · {isEn ? `0${idx + 1}` : `0${idx + 1}`}
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* =====================================================
          6. HIGHLIGHTED CASE STUDY CARD (IF relatedCaseSlug EXISTS)
          ===================================================== */}
      {targetCaseSlug && (
        <section className="py-12 md:py-16 bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)]">
          <Container>
            <Card
              variant="highlighted"
              padding="lg"
              className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
            >
              <div className="space-y-2 max-w-2xl">
                <Badge variant="tint">
                  <BookOpen size={13} />
                  <span>
                    {isEn
                      ? 'IN-DEPTH CASE STUDY AVAILABLE'
                      : 'STUDI KASUS MENDALAM TERSEDIA'}
                  </span>
                </Badge>
                <h2 className="text-[22px] md:text-[26px] text-[#17122B]">
                  {relatedCaseStudy
                    ? relatedCaseStudy.title
                    : isEn
                      ? 'Read the full story'
                      : 'Baca cerita lengkapnya'}
                </h2>
                <p className="text-[15px] text-[#5B5675] leading-[1.65]">
                  {relatedCaseStudy
                    ? relatedCaseStudy.oneSentenceSummary
                    : isEn
                      ? 'Explore the initial operational bottlenecks, system migration steps, and design targets of this internal project on our Case Studies page.'
                      : 'Pelajari rincian masalah operasional awal, rancangan alur sistem, dan target desain dari proyek internal ini di halaman Studi Kasus.'}
                </p>
              </div>

              <div className="shrink-0">
                <Button
                  to={toLocalizedHref(
                    `/case-studies/${targetCaseSlug}`,
                    locale,
                    prefixMode
                  )}
                  variant="primary"
                >
                  <span>
                    {isEn ? 'Read the full story' : 'Baca cerita lengkapnya'}
                  </span>
                  <ArrowUpRight size={16} />
                </Button>
              </div>
            </Card>
          </Container>
        </section>
      )}

      {/* =====================================================
          7. PREV / NEXT PROJECT NAVIGATION WITH THUMBNAILS & CTA
          ===================================================== */}
      <section className="py-16 md:py-24 bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)]">
        <Container className="space-y-16">
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.08em] font-semibold text-[#6A3FD0]">
                {isEn ? 'EXPLORE OTHER PROJECTS' : 'JELAJAHI PROYEK LAINNYA'}
              </span>
              <Link
                to={portfolioHref}
                className="text-[14px] font-semibold text-[#6A3FD0] hover:underline"
              >
                {isEn ? 'All Portfolio Projects' : 'Semua Portofolio'}
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Previous Project */}
              <AdjacentProjectCard
                project={prev}
                direction="prev"
                locale={locale}
                prefixMode={prefixMode}
              />

              {/* Next Project */}
              <AdjacentProjectCard
                project={next}
                direction="next"
                locale={locale}
                prefixMode={prefixMode}
              />
            </div>
          </div>

          <div className="max-w-[860px] mx-auto">
            <CTABlock
              title={
                isEn
                  ? 'Have a similar project? Tell us about it'
                  : 'Punya proyek serupa? Ceritakan ke kami'
              }
              description={
                isEn
                  ? 'Discuss the workflow you want to build or automate with Chesta & Zeeshan in a free 30-minute consultation.'
                  : 'Diskusikan alur kerja yang ingin kamu bangun atau otomatis bersama Chesta & Zeeshan dalam sesi konsultasi gratis 30 menit.'
              }
              buttonLabel={
                isEn
                  ? 'Free consultation via WhatsApp'
                  : 'Konsultasi gratis via WhatsApp'
              }
              whatsappMessage={
                isEn
                  ? `Hi Chesta & Zeeshan, I just viewed the project details for "${project.title}" (${projectPath}) and would like to discuss a similar need for my business.`
                  : `Halo Chesta & Zeeshan, saya baru melihat detail proyek "${project.title}" (/portfolio/${project.slug}) dan ingin berdiskusi untuk kebutuhan serupa di bisnis saya.`
              }
              secondaryAction={
                <Button to={portfolioHref} variant="secondary">
                  <span>{isEn ? 'View other projects' : 'Lihat proyek lain'}</span>
                </Button>
              }
            />
          </div>
        </Container>
      </section>

      {/* =====================================================
          ACCESSIBLE LIGHTBOX MODAL
          ===================================================== */}
      {lightboxIndex !== null && (
        <AccessibleLightbox
          items={allLightboxItems}
          activeIndex={lightboxIndex}
          onChangeIndex={setLightboxIndex}
          onClose={closeLightbox}
          isEn={isEn}
        />
      )}
    </div>
  );
}

/* ============================================================================
 * GLASS DEVICE FRAME COVER (Browser Frame for Web/Software, Phone for AI Agent)
 * ========================================================================== */
function DeviceFrameCover({
  project,
  coverAsset,
  onInspect,
  isEn,
}: {
  project: PortfolioProject;
  coverAsset: { src: string; alt: string; width: number; height: number };
  onInspect: (triggerEl: HTMLElement | null) => void;
  isEn: boolean;
}) {
  if (project.deviceFrame === 'phone') {
    return (
      <div className="rounded-[28px] glass-card p-6 md:p-10 bg-gradient-to-br from-[#FFFFFF] via-[#F8F6FE] to-[#EFEAFB]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Context Summary inside Glass Stage */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFFFFF] border border-[rgba(91,60,196,0.16)] font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold">
              <Smartphone size={14} />
              <span>
                {isEn
                  ? 'WHATSAPP AGENT INTERFACE SIMULATION'
                  : 'SIMULASI ANTARMUKA WHATSAPP AGENT'}
              </span>
            </div>

            <h2 className="text-[20px] md:text-[24px] font-semibold text-[#17122B] leading-snug">
              {isEn
                ? 'Works directly inside the WhatsApp chat window your customers already know'
                : 'Bekerja langsung di ruang chat WhatsApp yang sudah akrab bagi pelangganmu'}
            </h2>

            <p className="text-[14px] md:text-[15px] text-[#5B5675] leading-[1.65]">
              {isEn
                ? 'Customers never need to download an extra app. The agent reads incoming messages, calls your database or calendar tool behind the scenes, and replies within seconds.'
                : 'Pelanggan tidak perlu mengunduh aplikasi tambahan. Agent membaca pesan masuk, memanggil tool database atau kalender di belakang layar, dan membalas dalam hitungan detik.'}
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={(e) => onInspect(e.currentTarget)}
                className="inline-flex items-center gap-2 min-h-[42px] px-4 py-2 rounded-full bg-[#FFFFFF] border border-[rgba(91,60,196,0.18)] hover:border-[#6A3FD0] text-[13px] font-semibold text-[#6A3FD0] cursor-pointer transition-all"
              >
                <Maximize2 size={14} />
                <span>
                  {isEn ? 'Enlarge full-screen view' : 'Perbesar tampilan penuh'}
                </span>
              </button>
            </div>
          </div>

          {/* Right Phone-Style Glass Frame */}
          <div className="lg:col-span-7">
            <div className="mx-auto max-w-[640px] rounded-[28px] bg-[#FFFFFF] border-2 border-[rgba(91,60,196,0.22)] shadow-[0_18px_40px_-14px_rgba(106,63,208,0.16)] overflow-hidden">
              {/* Top Phone Notch / Status Bar */}
              <div className="px-5 py-3 bg-[#F8F6FE] border-b border-[rgba(91,60,196,0.14)] flex items-center justify-between">
                <span className="font-mono text-[11px] text-[#5B5675]">09:41 WIB</span>
                <div className="w-20 h-3.5 rounded-full bg-[#EFEAFB] border border-[rgba(91,60,196,0.14)]" />
                <span className="font-mono text-[11px] text-[#6A3FD0] font-semibold">
                  WA API · 5G
                </span>
              </div>

              <button
                type="button"
                onClick={(e) => onInspect(e.currentTarget)}
                aria-label={
                  isEn ? 'Enlarge project cover image' : 'Perbesar gambar sampul proyek'
                }
                className="block w-full aspect-[4/3] overflow-hidden bg-[#F8F6FE] cursor-pointer group"
              >
                <ImageWithFallback
                  src={coverAsset.src}
                  alt={coverAsset.alt}
                  width={coverAsset.width}
                  height={coverAsset.height}
                  priority={true}
                  viewTransitionName={`portfolio-cover-${project.slug}`}
                  className="w-full h-full object-cover"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Browser Frame for Web, Software Custom, and Otomasi Workflow
  return (
    <div className="rounded-[28px] glass-card p-3 sm:p-5 bg-gradient-to-b from-[#FFFFFF] to-[#F8F6FE]">
      <div className="rounded-[22px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.18)] overflow-hidden shadow-[0_16px_38px_-14px_rgba(106,63,208,0.14)]">
        {/* Glass Browser Chrome */}
        <div className="px-4 py-3 bg-[#F8F6FE] border-b border-[rgba(91,60,196,0.14)] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#B9A2F2]" />
            <span className="w-3 h-3 rounded-full bg-[#7C54E0]" />
            <span className="w-3 h-3 rounded-full bg-[#6A3FD0]" />
          </div>

          <div className="flex-1 max-w-md mx-auto px-3.5 py-1 rounded-full bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] flex items-center justify-center gap-2 text-[#5B5675] font-mono text-[11px] truncate">
            <Globe size={12} className="text-[#6A3FD0] shrink-0" />
            <span className="truncate">
              chestaa.com/preview/{project.slug}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => onInspect(e.currentTarget)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] hover:border-[#6A3FD0] font-mono text-[11px] text-[#6A3FD0] font-semibold cursor-pointer transition-colors"
          >
            <Maximize2 size={12} />
            <span className="hidden sm:inline">{isEn ? 'Enlarge' : 'Perbesar'}</span>
          </button>
        </div>

        {/* Cover Image */}
        <button
          type="button"
          onClick={(e) => onInspect(e.currentTarget)}
          aria-label={
            isEn ? 'Enlarge project cover image' : 'Perbesar gambar sampul proyek'
          }
          className="block w-full aspect-[4/3] max-h-[680px] overflow-hidden bg-[#F8F6FE] cursor-pointer group"
        >
          <ImageWithFallback
            src={coverAsset.src}
            alt={coverAsset.alt}
            width={coverAsset.width}
            height={coverAsset.height}
            priority={true}
            viewTransitionName={`portfolio-cover-${project.slug}`}
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </div>
  );
}

/* ============================================================================
 * MIXED FEATURES LAYOUT (4-6 Items, Varied Presentation — Not Identical Cards)
 * ========================================================================== */
function MixedFeaturesLayout({
  features,
  isEn,
}: {
  features: PortfolioProject['features'];
  isEn: boolean;
}) {
  const firstFeature = features[0];
  const secondFeature = features[1];
  const thirdFeature = features[2];
  const remainingFeatures = features.slice(3);

  return (
    <div className="space-y-6">
      {/* 1. Primary Feature — Full-Width Architectural Highlight */}
      {firstFeature && (
        <div className="rounded-[24px] bg-gradient-to-r from-[#F8F6FE] via-[#FFFFFF] to-[#EFEAFB] border border-[rgba(91,60,196,0.16)] p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="w-7 h-7 rounded-full bg-[#6A3FD0] text-[#FFFFFF] font-mono text-[12px] font-semibold flex items-center justify-center">
                  01
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold">
                  {isEn ? 'PRIMARY SYSTEM FOUNDATION' : 'FONDASI UTAMA SISTEM'}
                </span>
              </div>
              <h3 className="text-[19px] md:text-[21px] font-semibold text-[#17122B]">
                {firstFeature.title}
              </h3>
              <p className="text-[15px] text-[#5B5675] leading-[1.65]">
                {firstFeature.description}
              </p>
            </div>

            <div className="lg:col-span-4 lg:flex lg:justify-end">
              <div className="w-full lg:w-auto px-5 py-4 rounded-[18px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.16)] space-y-1">
                <span className="block font-mono text-[10px] uppercase tracking-[0.08em] text-[#5B5675]">
                  {isEn
                    ? 'MODULE / TECHNICAL INDICATOR'
                    : 'MODUL / INDIKATOR TEKNIS'}
                </span>
                <span className="block font-mono text-[13px] font-semibold text-[#6A3FD0]">
                  {firstFeature.metricOrTag}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2 & 3. Asymmetrical 7:5 Split Row */}
      {(secondFeature || thirdFeature) && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {secondFeature && (
            <div className="lg:col-span-7 rounded-[24px] bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] border-l-4 border-l-[#6A3FD0] p-6 flex flex-col justify-between shadow-[0_6px_20px_-6px_rgba(106,63,208,0.05)]">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[12px] font-semibold text-[#6A3FD0]">
                    {isEn ? 'FEATURE 02' : 'FITUR 02'}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] font-mono text-[11px] text-[#6A3FD0]">
                    {secondFeature.metricOrTag}
                  </span>
                </div>
                <h3 className="text-[18px] font-semibold text-[#17122B]">
                  {secondFeature.title}
                </h3>
                <p className="text-[15px] text-[#5B5675] leading-[1.65]">
                  {secondFeature.description}
                </p>
              </div>
            </div>
          )}

          {thirdFeature && (
            <div className="lg:col-span-5 rounded-[24px] bg-[#EFEAFB] border border-[rgba(91,60,196,0.16)] p-6 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[12px] font-semibold text-[#6A3FD0]">
                    {isEn ? 'FEATURE 03' : 'FITUR 03'}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] font-mono text-[11px] text-[#17122B] font-medium">
                    {thirdFeature.metricOrTag}
                  </span>
                </div>
                <h3 className="text-[18px] font-semibold text-[#17122B]">
                  {thirdFeature.title}
                </h3>
                <p className="text-[14px] md:text-[15px] text-[#5B5675] leading-[1.65]">
                  {thirdFeature.description}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4+. Structured Specification Strip List */}
      {remainingFeatures.length > 0 && (
        <div className="rounded-[24px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] divide-y divide-[rgba(91,60,196,0.14)] overflow-hidden">
          {remainingFeatures.map((feat, idx) => {
            const num = idx + 4;
            return (
              <div
                key={feat.title}
                className="p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#FFFFFF] transition-colors"
              >
                <div className="flex items-start gap-4 max-w-2xl">
                  <CheckCircle2
                    size={20}
                    className="text-[#6A3FD0] shrink-0 mt-0.5"
                  />
                  <div className="space-y-1">
                    <h3 className="text-[16px] md:text-[17px] font-semibold text-[#17122B]">
                      {feat.title}
                    </h3>
                    <p className="text-[14px] md:text-[15px] text-[#5B5675] leading-[1.6]">
                      {feat.description}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 pl-9 md:pl-0">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] font-mono text-[11px] text-[#6A3FD0] font-semibold">
                    <span>0{num}</span>
                    <span>·</span>
                    <span>{feat.metricOrTag}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ============================================================================
 * ADJACENT PROJECT NAVIGATION CARD (WITH THUMBNAIL)
 * ========================================================================== */
function AdjacentProjectCard({
  project,
  direction,
  locale,
  prefixMode,
}: {
  project: PortfolioProject;
  direction: 'prev' | 'next';
  locale: 'id' | 'en';
  prefixMode: PrefixMode;
}) {
  const isEn = locale === 'en';
  const thumbAsset =
    SITE_IMAGES[project.cover as keyof typeof SITE_IMAGES] || SITE_IMAGES.ogDefault;
  const isNext = direction === 'next';

  return (
    <Link
      to={toLocalizedHref(`/portfolio/${project.slug}`, locale, prefixMode)}
      className="group p-4 sm:p-5 rounded-[24px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] hover:border-[#6A3FD0]/50 hover:bg-[#FFFFFF] transition-all flex items-center gap-4"
    >
      <div className="w-24 sm:w-28 aspect-[4/3] rounded-[14px] overflow-hidden bg-[#EFEAFB] border border-[rgba(91,60,196,0.14)] shrink-0">
        <ImageWithFallback
          src={thumbAsset.src}
          alt={project.title}
          width={thumbAsset.width}
          height={thumbAsset.height}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.05]"
        />
      </div>

      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675]">
          {!isNext && <ArrowLeft size={13} className="text-[#6A3FD0]" />}
          <span>
            {isNext
              ? isEn
                ? 'Next Project'
                : 'Proyek Selanjutnya'
              : isEn
                ? 'Previous Project'
                : 'Proyek Sebelumnya'}
          </span>
          {isNext && <ArrowRight size={13} className="text-[#6A3FD0]" />}
        </div>

        <h3 className="text-[15px] sm:text-[16px] font-semibold text-[#17122B] group-hover:text-[#6A3FD0] transition-colors truncate">
          {project.title}
        </h3>

        <p className="font-mono text-[11px] text-[#6A3FD0]">
          {project.categoryLabel} · {project.industry}
        </p>
      </div>
    </Link>
  );
}

/* ============================================================================
 * ACCESSIBLE LIGHTBOX (Focus Trap, Esc, ArrowLeft/ArrowRight, Touch Swipe)
 * ========================================================================== */
function AccessibleLightbox({
  items,
  activeIndex,
  onChangeIndex,
  onClose,
  isEn,
}: {
  items: ProjectGalleryItem[];
  activeIndex: number;
  onChangeIndex: (idx: number) => void;
  onClose: () => void;
  isEn: boolean;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);

  const total = items.length;
  const currentItem = items[activeIndex] || items[0];
  const asset =
    SITE_IMAGES[currentItem.imageKey as keyof typeof SITE_IMAGES] ||
    SITE_IMAGES.ogDefault;

  const goPrev = useCallback(() => {
    onChangeIndex((activeIndex - 1 + total) % total);
  }, [activeIndex, total, onChangeIndex]);

  const goNext = useCallback(() => {
    onChangeIndex((activeIndex + 1) % total);
  }, [activeIndex, total, onChangeIndex]);

  // Focus trap & keyboard navigation (Esc, ArrowLeft, ArrowRight, Tab)
  useEffect(() => {
    closeBtnRef.current?.focus();
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, goPrev, goNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 45) {
      if (deltaX > 0) {
        goPrev();
      } else {
        goNext();
      }
    }
    touchStartX.current = null;
  };

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label={isEn ? 'Full-screen image preview' : 'Pratinjau gambar layar penuh'}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="fixed inset-0 z-50 bg-[#17122B]/85 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 md:p-10 animate-[vt-fade-in_200ms_cubic-bezier(0.22,1,0.36,1)_both]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between gap-4 max-w-6xl w-full mx-auto">
        <span className="px-3.5 py-1.5 rounded-full bg-[#FFFFFF]/15 text-[#FFFFFF] border border-[#FFFFFF]/20 font-mono text-[12px]">
          {isEn ? `Image ${activeIndex + 1} / ${total}` : `Gambar ${activeIndex + 1} / ${total}`}
        </span>

        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          aria-label={isEn ? 'Close preview (Esc)' : 'Tutup pratinjau (Esc)'}
          className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-full bg-[#FFFFFF] text-[#17122B] hover:bg-[#EFEAFB] font-medium text-[14px] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#B9A2F2]"
        >
          <span>{isEn ? 'Close' : 'Tutup'}</span>
          <X size={16} />
        </button>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center max-w-6xl w-full mx-auto my-4">
        <button
          type="button"
          onClick={goPrev}
          aria-label={isEn ? 'Previous image' : 'Gambar sebelumnya'}
          className="hidden sm:flex w-11 h-11 rounded-full bg-[#FFFFFF] text-[#17122B] hover:bg-[#EFEAFB] items-center justify-center shadow-lg cursor-pointer mr-4 shrink-0 focus-visible:outline-2 focus-visible:outline-[#B9A2F2]"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex-1 max-h-[72vh] rounded-[24px] overflow-hidden bg-[#FFFFFF] border border-[rgba(91,60,196,0.2)] shadow-2xl flex items-center justify-center">
          <ImageWithFallback
            src={asset.src}
            alt={currentItem.caption}
            width={asset.width}
            height={asset.height}
            priority={true}
            className="w-full h-full max-h-[72vh] object-contain bg-[#F8F6FE]"
          />
        </div>

        <button
          type="button"
          onClick={goNext}
          aria-label={isEn ? 'Next image' : 'Gambar berikutnya'}
          className="hidden sm:flex w-11 h-11 rounded-full bg-[#FFFFFF] text-[#17122B] hover:bg-[#EFEAFB] items-center justify-center shadow-lg cursor-pointer ml-4 shrink-0 focus-visible:outline-2 focus-visible:outline-[#B9A2F2]"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Bottom Caption & Mobile Controls */}
      <div className="max-w-4xl w-full mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FFFFFF] text-[#17122B] px-5 py-4 rounded-[20px] border border-[rgba(91,60,196,0.16)]">
        <p className="text-[14px] text-[#17122B] leading-snug text-center sm:text-left">
          {currentItem.caption}
        </p>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={goPrev}
            aria-label={isEn ? 'Previous image' : 'Gambar sebelumnya'}
            className="px-3.5 py-2 rounded-full bg-[#F8F6FE] hover:bg-[#EFEAFB] border border-[rgba(91,60,196,0.14)] text-[13px] font-medium text-[#17122B] cursor-pointer"
          >
            {isEn ? '← Previous' : '← Sebelumnya'}
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label={isEn ? 'Next image' : 'Gambar berikutnya'}
            className="px-3.5 py-2 rounded-full bg-[#6A3FD0] hover:bg-[#5230B0] text-[13px] font-medium text-[#FFFFFF] cursor-pointer"
          >
            {isEn ? 'Next →' : 'Selanjutnya →'}
          </button>
        </div>
      </div>
    </div>
  );
}
