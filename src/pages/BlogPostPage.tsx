import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Calendar,
  ChevronDown,
  List,
  MessageCircle,
  BookOpen,
  Copy,
  Check,
  Share2,
  Link2,
  Info,
  Lightbulb,
  AlertTriangle,
  Hash,
  Sparkles,
  Globe,
} from 'lucide-react';
import SEOMetadata from '../components/atoms/SEOMetadata';
import {
  getBlogPostBySlug,
  getAuthorProfile,
  getAdjacentBlogPosts,
  BlogContentBlock,
  BlogCalloutVariant,
  BlogFounderNote,
} from '../data/blog-posts';
import {
  Container,
  Breadcrumb,
  Card,
  Badge,
  Button,
  Tag,
  WordRevealHeading,
  FAQAccordion,
  CTABlock,
  ImageWithFallback,
  buildWaUrl,
} from '../components/ui/DesignSystem';
import FAQSchema from '../components/seo/FAQSchema';
import { parseLocalizedPath, toLocalizedHref } from '../lib/i18n';

interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

function buildTocFromContent(
  blocks: BlogContentBlock[],
  hasFaq: boolean,
  isEn: boolean
): TocItem[] {
  const items: TocItem[] = [];
  for (const block of blocks) {
    if (block.type === 'h2') {
      items.push({ id: block.id, text: block.text, level: 2 });
    } else if (block.type === 'h3') {
      items.push({ id: block.id, text: block.text, level: 3 });
    }
  }
  items.push({
    id: 'kesimpulan',
    text: isEn ? 'Conclusion' : 'Kesimpulan',
    level: 2,
  });
  if (hasFaq) {
    items.push({
      id: 'faq',
      text: isEn ? 'Frequently Asked Questions (FAQ)' : 'Pertanyaan Umum (FAQ)',
      level: 2,
    });
  }
  return items;
}

/**
 * Lightweight inline parser for [link](/path), `inline code`, and **bold**
 * without any external runtime markdown dependency.
 */
function renderInlineContent(text: string): React.ReactNode[] {
  const tokenRegex = /(\[[^\]]+\]\([^)]+\)|`[^`]+`|\*\*[^*]+\*\*)/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, idx) => {
    if (!part) return null;

    // 1. Link: [label](href)
    if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
      const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (match) {
        const [, label, href] = match;
        if (href.startsWith('/')) {
          return (
            <Link
              key={idx}
              to={href}
              className="text-[#6A3FD0] font-medium underline decoration-[#6A3FD0]/40 underline-offset-4 hover:decoration-[#6A3FD0] transition-colors"
            >
              {label}
            </Link>
          );
        }
        return (
          <a
            key={idx}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6A3FD0] font-medium underline decoration-[#6A3FD0]/40 underline-offset-4 hover:decoration-[#6A3FD0] transition-colors"
          >
            {label}
          </a>
        );
      }
    }

    // 2. Inline code: `code`
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return (
        <code
          key={idx}
          className="px-1.5 py-0.5 rounded-[6px] bg-[#EFEAFB] text-[#5230B0] border border-[rgba(91,60,196,0.16)] font-mono text-[13px]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    // 3. Bold: **bold**
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return (
        <strong key={idx} className="font-semibold text-[#17122B]">
          {part.slice(2, -2)}
        </strong>
      );
    }

    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

/**
 * Deterministic lightweight syntax highlighter for HTML, JSON, YAML, and TSX
 * with zero external runtime library overhead.
 */
function renderHighlightedCodeLine(line: string): React.ReactNode {
  const trimmed = line.trim();
  if (
    trimmed.startsWith('//') ||
    trimmed.startsWith('#') ||
    trimmed.startsWith('<!--')
  ) {
    return <span className="text-[#B9A2F2]/75 italic">{line}</span>;
  }

  const tokens = line.split(
    /(".*?"|'.*?'|`.*?`|\b(?:const|export|function|return|true|false|null)\b|<\/?[a-zA-Z0-9-]+|\/>|>)/g
  );

  return tokens.map((tok, i) => {
    if (!tok) return null;
    if (
      (tok.startsWith('"') && tok.endsWith('"')) ||
      (tok.startsWith("'") && tok.endsWith("'")) ||
      (tok.startsWith('`') && tok.endsWith('`'))
    ) {
      return (
        <span key={i} className="text-[#D8C8FF]">
          {tok}
        </span>
      );
    }
    if (/^(const|export|function|return|true|false|null)$/.test(tok)) {
      return (
        <span key={i} className="text-[#B9A2F2] font-semibold">
          {tok}
        </span>
      );
    }
    if (tok.startsWith('<') || tok === '/>' || tok === '>') {
      return (
        <span key={i} className="text-[#9E7BF0]">
          {tok}
        </span>
      );
    }
    return <React.Fragment key={i}>{tok}</React.Fragment>;
  });
}

function CodeBlockRenderer({
  language,
  filename,
  code,
  caption,
  isEn,
}: {
  language: string;
  filename?: string;
  code: string;
  caption?: string;
  isEn: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback ignore
    }
  };

  const lines = code.split('\n');

  return (
    <figure className="my-6 rounded-[20px] overflow-hidden border border-[rgba(91,60,196,0.2)] bg-[#17122B] text-[#F8F6FE]">
      <div className="px-4 py-2.5 bg-[#221A3D] border-b border-[rgba(185,162,242,0.16)] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-mono text-[11px] text-[#B9A2F2]">
          <span className="uppercase tracking-[0.08em] font-semibold text-[#FFFFFF]">
            {language}
          </span>
          {filename && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-[#EFEAFB]/80 truncate">{filename}</span>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2B1763] hover:bg-[#6A3FD0] border border-[rgba(185,162,242,0.24)] font-mono text-[11px] text-[#FFFFFF] transition-colors cursor-pointer"
          aria-label={isEn ? 'Copy code snippet' : 'Salin potongan kode'}
        >
          {copied ? (
            <>
              <Check size={12} className="text-[#D8C8FF]" />
              <span>{isEn ? 'Copied' : 'Tersalin'}</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span>{isEn ? 'Copy code' : 'Salin kode'}</span>
            </>
          )}
        </button>
      </div>

      <pre className="p-4 md:p-5 overflow-x-auto font-mono text-[12.5px] md:text-[13px] leading-[1.65]">
        <code>
          {lines.map((line, idx) => (
            <div key={idx} className="table-row">
              <span className="table-cell pr-4 select-none text-right text-[#B9A2F2]/40 text-[11px]">
                {idx + 1}
              </span>
              <span className="table-cell whitespace-pre">
                {renderHighlightedCodeLine(line)}
              </span>
            </div>
          ))}
        </code>
      </pre>

      {caption && (
        <figcaption className="px-4 py-2.5 bg-[#221A3D]/70 border-t border-[rgba(185,162,242,0.12)] font-mono text-[11px] text-[#EFEAFB]/80">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function CalloutBlockRenderer({
  variant,
  title,
  text,
  isEn,
}: {
  variant: BlogCalloutVariant;
  title: string;
  text: string;
  isEn: boolean;
}) {
  const metaMap: Record<
    BlogCalloutVariant,
    { label: string; icon: React.ReactNode; bgClass: string }
  > = {
    info: {
      label: isEn ? 'KEY NOTE' : 'CATATAN PENTING',
      icon: <Info size={16} className="text-[#6A3FD0] shrink-0" />,
      bgClass: 'bg-[#F8F6FE]',
    },
    tip: {
      label: isEn ? 'PRACTICAL TIP' : 'TIPS PRAKTIS',
      icon: <Lightbulb size={16} className="text-[#6A3FD0] shrink-0" />,
      bgClass: 'bg-[#EFEAFB]/70',
    },
    warning: {
      label: isEn ? 'TECHNICAL WARNING' : 'PERHATIAN TEKNIS',
      icon: <AlertTriangle size={16} className="text-[#5230B0] shrink-0" />,
      bgClass: 'bg-[#EFEAFB]',
    },
  };

  const current = metaMap[variant] || metaMap.info;

  return (
    <aside
      aria-label={title}
      className={`my-6 p-5 md:p-6 rounded-[20px] ${current.bgClass} border-l-4 border-[#6A3FD0] border-y border-r border-[rgba(91,60,196,0.14)] space-y-2`}
    >
      <div className="flex items-center gap-2">
        {current.icon}
        <Tag>{current.label}</Tag>
      </div>
      <h4 className="text-[16px] font-semibold text-[#17122B] leading-snug">
        {title}
      </h4>
      <p className="text-[14.5px] md:text-[15px] text-[#5B5675] leading-[1.65]">
        {renderInlineContent(text)}
      </p>
    </aside>
  );
}

function FounderFieldNoteCard({
  founderNote,
  authorName,
  authorRole,
  isEn,
}: {
  founderNote: BlogFounderNote;
  authorName: string;
  authorRole: string;
  isEn: boolean;
}) {
  return (
    <aside
      aria-label={founderNote.title}
      className="my-7 p-5 md:p-6 rounded-[22px] bg-[#EFEAFB]/65 border border-[rgba(91,60,196,0.22)] space-y-2.5"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold">
          <Sparkles size={14} className="text-[#6A3FD0]" />
          <span>
            {isEn
              ? 'FOUNDER FIELD NOTE · FIRST-HAND EXPERIENCE'
              : 'CATATAN LAPANGAN CO-FOUNDER · PENGALAMAN PRAKTISI'}
          </span>
        </span>
        <span className="font-mono text-[11px] text-[#5B5675]">
          {authorName} · {authorRole}
        </span>
      </div>
      <h3 className="text-[16px] md:text-[17px] font-semibold text-[#17122B] leading-snug">
        {founderNote.title}
      </h3>
      <p className="text-[14.5px] md:text-[15px] text-[#3E3954] leading-[1.68]">
        {renderInlineContent(founderNote.text)}
      </p>
    </aside>
  );
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const { locale, prefixMode } = parseLocalizedPath(location.pathname);
  const post = useMemo(
    () => (slug ? getBlogPostBySlug(slug, locale) : undefined),
    [slug, locale]
  );

  const effectiveLocale = post?.locale || locale;
  const isEn = effectiveLocale === 'en';

  const [readingProgress, setReadingProgress] = useState(0);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const [activeHeadingId, setActiveHeadingId] = useState<string>('');
  const [linkCopied, setLinkCopied] = useState(false);

  const tocItems = useMemo(
    () =>
      post
        ? buildTocFromContent(post.content, post.faq.length > 0, isEn)
        : [],
    [post, isEn]
  );

  // Thin Reading Progress Bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      if (totalHeight <= 0) {
        setReadingProgress(0);
        return;
      }
      const progress = Math.min(
        100,
        Math.max(0, (window.scrollY / totalHeight) * 100)
      );
      setReadingProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active Section Highlight via IntersectionObserver
  useEffect(() => {
    if (!tocItems.length) return;

    const elements = tocItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveHeadingId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-96px 0px -65% 0px',
        threshold: [0, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [tocItems]);

  const blogHubHref = toLocalizedHref('/blog', effectiveLocale, prefixMode);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] text-[#17122B] pt-32 pb-24">
        <Container className="max-w-xl">
          <Card variant="soft" padding="lg" className="text-center">
            <Tag>
              {isEn ? '404 · Article Not Found' : '404 · Artikel Tidak Ditemukan'}
            </Tag>
            <h1 className="mt-2">
              {isEn
                ? 'The article you are looking for is not available'
                : 'Artikel yang kamu cari belum tersedia'}
            </h1>
            <p className="mt-3 text-[15px] text-[#5B5675]">
              {isEn
                ? 'This page may have been moved. You can read our other practical engineering notes on the main blog page.'
                : 'Halaman ini mungkin sudah dipindahkan. Kamu bisa membaca catatan teknis dan panduan lainnya di halaman utama blog kami.'}
            </p>
            <div className="mt-6">
              <Button to={blogHubHref} variant="primary">
                <ArrowLeft size={16} />
                <span>{isEn ? 'Back to Blog' : 'Kembali ke Blog'}</span>
              </Button>
            </div>
          </Card>
        </Container>
      </div>
    );
  }

  const authorProfile = getAuthorProfile(post.author, effectiveLocale);
  const relatedPosts = post.relatedSlugs
    .map((s) => getBlogPostBySlug(s, effectiveLocale))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .slice(0, 3);

  const { prev: prevPost, next: nextPost } = getAdjacentBlogPosts(
    post.slug,
    effectiveLocale
  );

  const canonicalPath =
    effectiveLocale === 'en'
      ? `/eng/blog/${post.slug}`
      : prefixMode === 'ind'
        ? `/ind/blog/${post.slug}`
        : `/blog/${post.slug}`;

  const canonicalUrl =
    effectiveLocale === 'en'
      ? `https://chestaa.com/eng/blog/${post.slug}`
      : `https://chestaa.com/blog/${post.slug}`;

  const shareWhatsAppUrl = `https://wa.me/?text=${encodeURIComponent(
    isEn
      ? `${post.title} — Read on CHESTAADOTCOM: ${canonicalUrl}`
      : `${post.title} — Baca di CHESTAADOTCOM: ${canonicalUrl}`
  )}`;

  const consultWaUrl = buildWaUrl(
    isEn
      ? `Hi Chesta & Zeeshan, I read the article "${post.title}" on chestaa.com and would like to consult on applying it to my business.`
      : `Halo Chesta & Zeeshan, saya membaca artikel "${post.title}" di chestaa.com dan ingin konsultasi penerapannya untuk bisnis saya.`
  );

  const alternateLangHref = post.alternateSlug
    ? isEn
      ? `/blog/${post.alternateSlug}`
      : `/eng/blog/${post.alternateSlug}`
    : undefined;

  const handleCopyArticleLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href || canonicalUrl);
      setLinkCopied(true);
      window.setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      // Ignore fallback
    }
  };

  return (
    <div className="bg-[#FFFFFF] text-[#17122B] min-h-screen pt-28 pb-24">
      <SEOMetadata
        title={post.seoTitle}
        description={post.metaDescription}
        ogImage={`https://chestaa.com${post.cover}`}
        type="article"
        path={canonicalPath}
      />

      {/* 1. THIN READING PROGRESS BAR (transform: scaleX only, never width) */}
      <div
        aria-hidden="true"
        className="fixed top-16 left-0 right-0 z-40 h-[2px] bg-[rgba(91,60,196,0.08)] pointer-events-none"
      >
        <div
          className="w-full h-full bg-[#6A3FD0] origin-left"
          style={{
            transform: `scaleX(${(readingProgress / 100).toFixed(4)})`,
            transition: 'transform 120ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
      </div>

      <Container as="article">
        <Breadcrumb
          items={[
            { label: 'Blog', to: blogHubHref },
            {
              label: post.category,
              to: toLocalizedHref(
                `/blog/kategori/${post.categorySlug}`,
                effectiveLocale,
                prefixMode
              ),
            },
            { label: post.title },
          ]}
        />

        {/* 2. EDITORIAL HEADER */}
        <header className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-2.5 font-mono text-[11px] md:text-[12px] uppercase tracking-[0.08em] text-[#5B5675] mb-3">
            <Link
              to={toLocalizedHref(
                `/blog/kategori/${post.categorySlug}`,
                effectiveLocale,
                prefixMode
              )}
              className="px-3 py-1 rounded-full bg-[#EFEAFB] text-[#6A3FD0] border border-[rgba(91,60,196,0.16)] font-semibold hover:bg-[#6A3FD0] hover:text-[#FFFFFF] transition-colors"
            >
              {post.category}
            </Link>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={13} className="text-[#7C54E0]" />
              {post.readTime}
            </span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={13} className="text-[#7C54E0]" />
              {isEn ? `Published ${post.date}` : `Terbit ${post.date}`}
            </span>
            {post.updatedAt && post.updatedAt !== post.date && (
              <>
                <span aria-hidden="true">·</span>
                <span>
                  {isEn
                    ? `Updated ${post.updatedAt}`
                    : `Diperbarui ${post.updatedAt}`}
                </span>
              </>
            )}
            {alternateLangHref && (
              <>
                <span aria-hidden="true">·</span>
                <Link
                  to={alternateLangHref}
                  className="inline-flex items-center gap-1 text-[#6A3FD0] font-semibold hover:underline"
                >
                  <Globe size={12} />
                  <span>{isEn ? 'Baca versi ID' : 'Read in English'}</span>
                </Link>
              </>
            )}
          </div>

          <WordRevealHeading as="h1" priority text={post.title} />

          {/* Quick Summary Box (40-60 words direct answer for AEO & busy readers) */}
          <div className="mt-5 p-5 md:p-6 rounded-[22px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.16)] space-y-1.5">
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold">
              {isEn ? 'QUICK SUMMARY (TL;DR)' : 'RINGKASAN SINGKAT'}
            </p>
            <p className="text-[16px] md:text-[17px] text-[#17122B] font-medium leading-[1.62]">
              {post.excerpt}
            </p>
          </div>

          {/* Author Chip & Quick Share Row */}
          <div className="mt-6 pt-6 border-t border-[rgba(91,60,196,0.14)] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {authorProfile.avatar ? (
                <img
                  src={authorProfile.avatar}
                  alt={authorProfile.name}
                  width={44}
                  height={44}
                  loading="eager"
                  className="w-11 h-11 rounded-full object-cover object-top bg-[#EFEAFB] border border-[rgba(91,60,196,0.18)]"
                />
              ) : (
                <div className="w-11 h-11 rounded-full bg-[#EFEAFB] border border-[rgba(91,60,196,0.18)] flex items-center justify-center font-mono font-semibold text-[13px] text-[#6A3FD0]">
                  {authorProfile.initials}
                </div>
              )}
              <div>
                <p className="text-[14px] font-semibold text-[#17122B]">
                  {authorProfile.name}
                </p>
                <p className="font-mono text-[11px] text-[#5B5675]">
                  {authorProfile.role}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyArticleLink}
                className="inline-flex items-center gap-1.5 min-h-[40px] px-4 py-2 rounded-full bg-[#F8F6FE] hover:bg-[#EFEAFB] border border-[rgba(91,60,196,0.14)] font-mono text-[11px] uppercase tracking-[0.06em] text-[#17122B] transition-colors cursor-pointer"
              >
                {linkCopied ? (
                  <>
                    <Check size={13} className="text-[#6A3FD0]" />
                    <span>{isEn ? 'Link Copied' : 'Tautan Tersalin'}</span>
                  </>
                ) : (
                  <>
                    <Link2 size={13} className="text-[#6A3FD0]" />
                    <span>{isEn ? 'Copy Link' : 'Salin Link'}</span>
                  </>
                )}
              </button>

              <a
                href={shareWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 min-h-[40px] px-4 py-2 rounded-full bg-[#F8F6FE] hover:bg-[#EFEAFB] border border-[rgba(91,60,196,0.14)] font-mono text-[11px] uppercase tracking-[0.06em] text-[#6A3FD0] font-semibold transition-colors"
              >
                <Share2 size={13} />
                <span>{isEn ? 'Share on WA' : 'Bagikan ke WA'}</span>
              </a>
            </div>
          </div>
        </header>

        {/* 3. 16:9 COVER IMAGE WITH EXPLICIT DIMENSIONS, HIGH FETCHPRIORITY & SHARED VIEW TRANSITION */}
        <div className="mt-8 mb-12 rounded-[24px] overflow-hidden border border-[rgba(91,60,196,0.14)] bg-[#F8F6FE] aspect-video max-w-4xl">
          <ImageWithFallback
            src={post.cover}
            alt={post.coverAlt}
            width={1280}
            height={720}
            priority={true}
            viewTransitionName={`blog-cover-${post.slug}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 4. MOBILE COLLAPSIBLE TABLE OF CONTENTS */}
        {tocItems.length > 0 && (
          <div className="lg:hidden mb-8 rounded-[20px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] overflow-hidden">
            <button
              type="button"
              onClick={() => setMobileTocOpen((prev) => !prev)}
              aria-expanded={mobileTocOpen}
              className="w-full min-h-[48px] px-5 py-3.5 flex items-center justify-between text-left font-mono text-[11px] uppercase tracking-[0.08em] text-[#17122B] font-semibold cursor-pointer"
            >
              <span className="inline-flex items-center gap-2">
                <List size={15} className="text-[#6A3FD0]" />
                <span>
                  {isEn
                    ? `Table of Contents (${tocItems.length} sections)`
                    : `Daftar Isi Artikel (${tocItems.length} bagian)`}
                </span>
              </span>
              <ChevronDown
                size={16}
                className={`text-[#6A3FD0] transition-transform ${
                  mobileTocOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {mobileTocOpen && (
              <nav
                aria-label={isEn ? 'Mobile Table of Contents' : 'Daftar Isi Mobile'}
                className="px-5 pb-4 pt-2 border-t border-[rgba(91,60,196,0.14)] space-y-1.5"
              >
                {tocItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setMobileTocOpen(false)}
                    className={`block py-1.5 text-[13px] hover:text-[#6A3FD0] transition-colors ${
                      item.level === 3
                        ? 'pl-4 text-[#5B5675]'
                        : 'text-[#17122B] font-medium'
                    }`}
                  >
                    {item.text}
                  </a>
                ))}
              </nav>
            )}
          </div>
        )}

        {/* 5. READING COLUMN (~680PX) + STICKY DESKTOP TOC */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Reading Column (max 680px) */}
          <div className="lg:col-span-8 w-full max-w-[680px]">
            {/* Dedicated Founder Field-Note Callout Box ([ISI PENGALAMAN ASLI]) */}
            {post.founderNote && (
              <FounderFieldNoteCard
                founderNote={post.founderNote}
                authorName={authorProfile.name}
                authorRole={authorProfile.role}
                isEn={isEn}
              />
            )}

            <div className="space-y-5 text-[#5B5675] text-[15.5px] md:text-[16px] leading-[1.72]">
              {post.content.map((block, index) => {
                switch (block.type) {
                  case 'paragraph':
                    return (
                      <p key={index} className="text-[#3E3954]">
                        {renderInlineContent(block.text)}
                      </p>
                    );

                  case 'h2':
                    return (
                      <h2
                        key={block.id}
                        id={block.id}
                        className="group scroll-mt-28 pt-8 mt-10 border-t border-[rgba(91,60,196,0.14)] text-[22px] md:text-[26px] font-semibold text-[#17122B] leading-[1.28] flex items-center gap-2"
                      >
                        <span>{block.text}</span>
                        <a
                          href={`#${block.id}`}
                          aria-label={
                            isEn
                              ? `Link to section ${block.text}`
                              : `Tautan bagian ${block.text}`
                          }
                          className="opacity-0 group-hover:opacity-100 focus:opacity-100 text-[#6A3FD0] transition-opacity"
                        >
                          <Hash size={17} />
                        </a>
                      </h2>
                    );

                  case 'h3':
                    return (
                      <h3
                        key={block.id}
                        id={block.id}
                        className="group scroll-mt-28 pt-4 mt-6 text-[18px] md:text-[20px] font-semibold text-[#17122B] leading-[1.35] flex items-center gap-2"
                      >
                        <span>{block.text}</span>
                        <a
                          href={`#${block.id}`}
                          aria-label={
                            isEn
                              ? `Link to subsection ${block.text}`
                              : `Tautan sub-bagian ${block.text}`
                          }
                          className="opacity-0 group-hover:opacity-100 focus:opacity-100 text-[#6A3FD0] transition-opacity"
                        >
                          <Hash size={15} />
                        </a>
                      </h3>
                    );

                  case 'ul':
                    return (
                      <div key={index} className="my-5 space-y-2.5">
                        {block.title && (
                          <p className="font-semibold text-[#17122B] text-[15px]">
                            {block.title}
                          </p>
                        )}
                        <ul className="space-y-2.5 pl-5 list-disc marker:text-[#6A3FD0]">
                          {block.items.map((item, i) => (
                            <li key={i} className="pl-1 text-[#3E3954] leading-[1.68]">
                              {renderInlineContent(item)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );

                  case 'ol':
                    return (
                      <div key={index} className="my-5 space-y-2.5">
                        {block.title && (
                          <p className="font-semibold text-[#17122B] text-[15px]">
                            {block.title}
                          </p>
                        )}
                        <ol className="space-y-3 pl-5 list-decimal marker:text-[#6A3FD0] marker:font-mono marker:font-semibold">
                          {block.items.map((item, i) => (
                            <li key={i} className="pl-1 text-[#3E3954] leading-[1.68]">
                              {renderInlineContent(item)}
                            </li>
                          ))}
                        </ol>
                      </div>
                    );

                  case 'blockquote':
                    return (
                      <blockquote
                        key={index}
                        className="my-6 p-5 md:p-6 rounded-[20px] bg-[#F8F6FE] border-l-4 border-[#6A3FD0] border-y border-r border-[rgba(91,60,196,0.14)] space-y-2"
                      >
                        <p className="text-[16px] text-[#17122B] font-medium leading-[1.65]">
                          &ldquo;{renderInlineContent(block.quote)}&rdquo;
                        </p>
                        {block.attribution && (
                          <cite className="block not-italic font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0]">
                            — {block.attribution}
                          </cite>
                        )}
                      </blockquote>
                    );

                  case 'callout':
                    return (
                      <CalloutBlockRenderer
                        key={index}
                        variant={block.variant}
                        title={block.title}
                        text={block.text}
                        isEn={isEn}
                      />
                    );

                  case 'table':
                    return (
                      <figure
                        key={index}
                        className="my-6 rounded-[20px] border border-[rgba(91,60,196,0.16)] bg-[#FFFFFF] overflow-hidden"
                      >
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse min-w-[540px]">
                            <thead>
                              <tr className="bg-[#F8F6FE] border-b border-[rgba(91,60,196,0.14)]">
                                {block.headers.map((header, hIdx) => (
                                  <th
                                    key={hIdx}
                                    className="px-4 py-3.5 font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold"
                                  >
                                    {header}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[rgba(91,60,196,0.1)] text-[14px]">
                              {block.rows.map((row, rIdx) => (
                                <tr
                                  key={rIdx}
                                  className="hover:bg-[#F8F6FE]/60 transition-colors"
                                >
                                  {row.map((cell, cIdx) => (
                                    <td
                                      key={cIdx}
                                      className={`px-4 py-3.5 align-top leading-[1.6] ${
                                        cIdx === 0
                                          ? 'font-semibold text-[#17122B]'
                                          : 'text-[#3E3954]'
                                      }`}
                                    >
                                      {renderInlineContent(cell)}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        {block.caption && (
                          <figcaption className="px-4 py-2.5 bg-[#F8F6FE] border-t border-[rgba(91,60,196,0.12)] font-mono text-[11px] text-[#5B5675]">
                            {block.caption}
                          </figcaption>
                        )}
                      </figure>
                    );

                  case 'code':
                    return (
                      <CodeBlockRenderer
                        key={index}
                        language={block.language}
                        filename={block.filename}
                        code={block.code}
                        caption={block.caption}
                        isEn={isEn}
                      />
                    );

                  case 'image':
                    return (
                      <figure
                        key={index}
                        className="my-6 rounded-[20px] overflow-hidden border border-[rgba(91,60,196,0.14)] bg-[#F8F6FE]"
                      >
                        <ImageWithFallback
                          src={block.src}
                          alt={block.alt}
                          width={block.width || 1280}
                          height={block.height || 720}
                          className="w-full h-auto object-cover"
                        />
                        <figcaption className="px-4 py-3 font-mono text-[11px] text-[#5B5675] border-t border-[rgba(91,60,196,0.12)]">
                          {block.caption}
                        </figcaption>
                      </figure>
                    );
                }
              })}
            </div>

            {/* 6. KESIMPULAN / CONCLUSION */}
            <section
              id="kesimpulan"
              className="scroll-mt-28 pt-8 mt-10 border-t border-[rgba(91,60,196,0.14)] space-y-4"
            >
              <h2 className="text-[22px] md:text-[26px] font-semibold text-[#17122B]">
                {isEn ? 'Conclusion' : 'Kesimpulan'}
              </h2>
              <div className="space-y-4 text-[#3E3954] text-[15.5px] md:text-[16px] leading-[1.72]">
                {post.conclusion.map((p, idx) => (
                  <p key={idx}>{renderInlineContent(p)}</p>
                ))}
              </div>
            </section>

            {/* 7. TAGS & SHARE BUTTONS (COPY LINK + WHATSAPP ONLY) */}
            <div className="mt-8 pt-6 border-t border-[rgba(91,60,196,0.14)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-[#F8F6FE] border border-[rgba(91,60,196,0.12)] font-mono text-[11px] text-[#5B5675]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleCopyArticleLink}
                  className="inline-flex items-center gap-1.5 min-h-[40px] px-4 py-2 rounded-full bg-[#F8F6FE] hover:bg-[#EFEAFB] border border-[rgba(91,60,196,0.14)] font-mono text-[11px] uppercase tracking-[0.06em] text-[#17122B] transition-colors cursor-pointer"
                >
                  {linkCopied ? (
                    <>
                      <Check size={13} className="text-[#6A3FD0]" />
                      <span>{isEn ? 'Copied' : 'Tersalin'}</span>
                    </>
                  ) : (
                    <>
                      <Link2 size={13} className="text-[#6A3FD0]" />
                      <span>{isEn ? 'Copy Link' : 'Salin Link'}</span>
                    </>
                  )}
                </button>

                <a
                  href={shareWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 min-h-[40px] px-4 py-2 rounded-full bg-[#EFEAFB] hover:bg-[#6A3FD0] text-[#6A3FD0] hover:text-[#FFFFFF] font-mono text-[11px] uppercase tracking-[0.06em] font-semibold transition-colors"
                >
                  <Share2 size={13} />
                  <span>{isEn ? 'Share via WhatsApp' : 'Bagikan via WhatsApp'}</span>
                </a>
              </div>
            </div>

            {/* 8. FAQ ACCORDION (FEEDS FAQPAGE JSON-LD) */}
            {post.faq.length > 0 && (
              <section
                id="faq"
                aria-label={isEn ? 'Article FAQ' : 'FAQ Artikel'}
                className="scroll-mt-28 pt-8 mt-10 border-t border-[rgba(91,60,196,0.14)] space-y-4"
              >
                <div>
                  <Tag>
                    {isEn
                      ? 'QUESTIONS ABOUT THIS TOPIC'
                      : 'PERTANYAAN SEPUTAR TOPIK INI'}
                  </Tag>
                  <h2 className="mt-1 text-[22px] md:text-[26px]">
                    {isEn
                      ? 'Frequently asked questions'
                      : 'Pertanyaan yang sering diajukan'}
                  </h2>
                </div>
                <FAQAccordion items={post.faq} defaultOpenIndex={0} />
                <FAQSchema items={post.faq} />
              </section>
            )}

            {/* 9. AUTHOR BOX */}
            <Card
              variant="soft"
              className="mt-10 flex flex-col sm:flex-row items-start gap-4"
            >
              {authorProfile.avatar ? (
                <img
                  src={authorProfile.avatar}
                  alt={authorProfile.name}
                  width={56}
                  height={56}
                  loading="lazy"
                  className="w-14 h-14 rounded-[16px] object-cover object-top bg-[#EFEAFB] border border-[rgba(91,60,196,0.16)] shrink-0"
                />
              ) : (
                <div className="w-14 h-14 rounded-[16px] bg-[#EFEAFB] border border-[rgba(91,60,196,0.16)] flex items-center justify-center font-mono font-semibold text-[16px] text-[#6A3FD0] shrink-0">
                  {authorProfile.initials}
                </div>
              )}
              <div className="space-y-1.5">
                <Tag>{isEn ? 'ABOUT THE AUTHOR' : 'TENTANG PENULIS'}</Tag>
                <h3 className="text-[18px] font-semibold text-[#17122B]">
                  {authorProfile.name}
                </h3>
                <p className="font-mono text-[11px] text-[#6A3FD0]">
                  {authorProfile.role}
                </p>
                <p className="text-[14px] text-[#5B5675] leading-[1.65]">
                  {authorProfile.bio}
                </p>
              </div>
            </Card>

            {/* 10. RELEVANT SERVICE CTA CARD */}
            <Card
              variant="highlighted"
              className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5"
            >
              <div className="space-y-1.5">
                <Badge variant="tint">
                  {isEn
                    ? 'RELATED CHESTAADOTCOM SERVICE'
                    : 'LAYANAN TERKAIT CHESTAADOTCOM'}
                </Badge>
                <h3 className="text-[19px] md:text-[21px] font-semibold text-[#17122B]">
                  {post.serviceLink.title}
                </h3>
                <p className="text-[14px] text-[#5B5675] leading-[1.65]">
                  {post.serviceLink.description}
                </p>
              </div>
              <Button
                to={toLocalizedHref(
                  post.serviceLink.href,
                  effectiveLocale,
                  prefixMode
                )}
                variant="primary"
                className="shrink-0"
              >
                <span>{post.serviceLink.label}</span>
                <ArrowRight size={15} />
              </Button>
            </Card>

            {/* 11. PREV / NEXT POST NAVIGATION */}
            {(prevPost || nextPost) && (
              <nav
                aria-label={
                  isEn
                    ? 'Previous and Next Article Navigation'
                    : 'Navigasi Artikel Sebelumnya dan Selanjutnya'
                }
                className="mt-10 pt-8 border-t border-[rgba(91,60,196,0.14)] grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {prevPost ? (
                  <Link
                    to={toLocalizedHref(
                      `/blog/${prevPost.slug}`,
                      effectiveLocale,
                      prefixMode
                    )}
                    className="group p-5 rounded-[20px] bg-[#F8F6FE] hover:bg-[#EFEAFB]/70 border border-[rgba(91,60,196,0.14)] transition-colors flex flex-col justify-between gap-2"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675] inline-flex items-center gap-1.5">
                      <ArrowLeft
                        size={13}
                        className="text-[#6A3FD0] group-hover:-translate-x-0.5 transition-transform"
                      />
                      <span>{isEn ? 'Previous Article' : 'Artikel Sebelumnya'}</span>
                    </span>
                    <span className="text-[15px] font-semibold text-[#17122B] group-hover:text-[#6A3FD0] line-clamp-2 leading-snug">
                      {prevPost.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}

                {nextPost && (
                  <Link
                    to={toLocalizedHref(
                      `/blog/${nextPost.slug}`,
                      effectiveLocale,
                      prefixMode
                    )}
                    className="group p-5 rounded-[20px] bg-[#F8F6FE] hover:bg-[#EFEAFB]/70 border border-[rgba(91,60,196,0.14)] transition-colors flex flex-col justify-between gap-2 sm:text-right"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675] inline-flex items-center sm:justify-end gap-1.5">
                      <span>{isEn ? 'Next Article' : 'Artikel Selanjutnya'}</span>
                      <ArrowRight
                        size={13}
                        className="text-[#6A3FD0] group-hover:translate-x-0.5 transition-transform"
                      />
                    </span>
                    <span className="text-[15px] font-semibold text-[#17122B] group-hover:text-[#6A3FD0] line-clamp-2 leading-snug">
                      {nextPost.title}
                    </span>
                  </Link>
                )}
              </nav>
            )}
          </div>

          {/* Right Sticky Desktop TOC + Consultation Card */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-24 space-y-6">
            {tocItems.length > 0 && (
              <Card variant="soft">
                <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold mb-4 flex items-center gap-2">
                  <List size={14} />
                  <span>{isEn ? 'Table of Contents' : 'Daftar Isi Artikel'}</span>
                </p>
                <nav
                  aria-label={isEn ? 'Desktop Table of Contents' : 'Daftar Isi Desktop'}
                  className="space-y-1.5 max-h-[55vh] overflow-y-auto pr-1"
                >
                  {tocItems.map((item) => {
                    const isActive = activeHeadingId === item.id;
                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`block py-1.5 text-[13px] leading-snug transition-colors rounded-lg px-2.5 ${
                          item.level === 3 ? 'ml-3 text-[12.5px]' : ''
                        } ${
                          isActive
                            ? 'bg-[#EFEAFB] text-[#6A3FD0] font-semibold border-l-2 border-[#6A3FD0]'
                            : 'text-[#5B5675] hover:text-[#17122B] hover:bg-[#FFFFFF]/70'
                        }`}
                      >
                        {item.text}
                      </a>
                    );
                  })}
                </nav>
              </Card>
            )}

            <Card variant="soft" className="space-y-4">
              <Tag>
                {isEn
                  ? 'DIRECT CONSULTATION · BSD & GREATER JAKARTA'
                  : 'DISKUSI LANGSUNG · BSD & TANGSEL'}
              </Tag>
              <h3 className="text-[18px]">
                {isEn
                  ? 'Have a similar need in your business?'
                  : 'Punya kebutuhan serupa di bisnismu?'}
              </h3>
              <p className="text-[14px] text-[#5B5675] leading-[1.65]">
                {isEn
                  ? 'We help businesses in BSD City, Alam Sutera, Bintaro, Gading Serpong, and Greater Jakarta build reliable systems. Websites start at IDR 1,200,000.'
                  : 'Kami bantu bisnis di BSD City, Alam Sutera, Bintaro, Gading Serpong, dan Jabodetabek membangun sistem yang rapi. Web mulai Rp1.200.000.'}
              </p>
              <Button href={consultWaUrl} variant="primary" fullWidth>
                <MessageCircle size={15} />
                <span>
                  {isEn
                    ? 'Free consultation via WhatsApp'
                    : 'Konsultasi gratis via WhatsApp'}
                </span>
              </Button>
            </Card>
          </aside>
        </div>

        {/* 12. 3 RELATED POSTS */}
        {relatedPosts.length > 0 && (
          <section
            aria-label={isEn ? 'Related Articles' : 'Artikel Terkait'}
            className="mt-16 pt-12 border-t border-[rgba(91,60,196,0.14)]"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <Tag>{isEn ? 'RELATED READING' : 'BACAAN TERKAIT'}</Tag>
                <h2 className="mt-1">
                  {isEn
                    ? 'Other practical notes for you'
                    : 'Catatan lain yang relevan untukmu'}
                </h2>
              </div>
              <Button to={blogHubHref} variant="secondary">
                <BookOpen size={14} className="text-[#6A3FD0]" />
                <span>{isEn ? 'All Articles' : 'Semua Catatan'}</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {relatedPosts.map((rel) => {
                const relHref = toLocalizedHref(
                  `/blog/${rel.slug}`,
                  rel.locale || effectiveLocale,
                  prefixMode
                );
                return (
                  <Card
                    key={rel.slug}
                    as="article"
                    variant="soft"
                    padding="none"
                    className="h-full flex flex-col justify-between overflow-hidden group lg:hover:-translate-y-1 transition-transform duration-200"
                  >
                    <div>
                      <Link
                        to={relHref}
                        className="block aspect-video bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)] overflow-hidden"
                      >
                        <ImageWithFallback
                          src={rel.cover}
                          alt={rel.coverAlt}
                          width={1280}
                          height={720}
                          className="w-full h-full object-cover lg:group-hover:scale-[1.02] transition-transform duration-300"
                        />
                      </Link>
                      <div className="p-5 md:p-6">
                        <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675]">
                          <span className="text-[#6A3FD0] font-semibold">
                            {rel.category}
                          </span>
                          <span className="mx-1.5">·</span>
                          <span>{rel.readTime}</span>
                        </div>
                        <h3 className="mt-2 text-[18px] leading-[1.35] group-hover:text-[#6A3FD0] transition-colors line-clamp-2">
                          <Link to={relHref}>{rel.title}</Link>
                        </h3>
                        <p className="mt-2 text-[14px] text-[#5B5675] line-clamp-2 leading-[1.65]">
                          {rel.excerpt}
                        </p>
                      </div>
                    </div>
                    <div className="px-5 md:px-6 pb-5 pt-3 border-t border-[rgba(91,60,196,0.14)] flex items-center justify-between">
                      <span className="font-mono text-[11px] text-[#5B5675]">
                        {rel.date}
                      </span>
                      <Link
                        to={relHref}
                        className="inline-flex items-center gap-1 min-h-[40px] text-[13px] font-semibold text-[#6A3FD0] hover:underline"
                      >
                        <span>{isEn ? 'Read' : 'Baca'}</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>
        )}

        {/* 13. BOTTOM CONSULTATION CTA */}
        <div className="mt-16">
          <CTABlock
            eyebrow={
              isEn
                ? 'CONSULT WITH THE CO-FOUNDERS'
                : 'KONSULTASI BERSAMA CO-FOUNDER'
            }
            title={
              isEn
                ? 'Want to apply these strategies in your business?'
                : 'Mau menerapkan strategi di atas pada bisnismu?'
            }
            description={
              isEn
                ? 'Discuss your landing page, custom software, or AI agent needs directly with Chesta Azka & Zeeshan. Websites start at IDR 1,200,000.'
                : 'Diskusikan kebutuhan landing page, website custom, atau AI agent bisnismu bersama Chesta Azka & Zeeshan. Web mulai Rp1.200.000.'
            }
            whatsappMessage={
              isEn
                ? `Hi Chesta & Zeeshan, I read the article "${post.title}" and would like to consult on applying it to my business.`
                : `Halo Chesta & Zeeshan, saya membaca artikel "${post.title}" dan ingin konsultasi penerapannya untuk bisnis saya.`
            }
          />
        </div>
      </Container>
    </div>
  );
}
