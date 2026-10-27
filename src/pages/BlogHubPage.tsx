import React from 'react';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import SEOMetadata from '../components/atoms/SEOMetadata';
import { getBlogPaginationSlice } from '../data/blog-posts';
import { TopicClusterId, getClusterHubPath } from '../data/clusters';
import { Reveal } from '../components/ui/DesignSystem';
import { parseLocalizedPath, toLocalizedHref } from '../lib/i18n';

interface TopicBarItem {
  id: 'all' | TopicClusterId;
  labelId: string;
  labelEn: string;
  clusterId?: TopicClusterId;
}

const TOPIC_BAR_ITEMS: TopicBarItem[] = [
  { id: 'all', labelId: 'Semua', labelEn: 'All' },
  {
    id: 'agentic-ai',
    clusterId: 'agentic-ai',
    labelId: 'Agentic AI',
    labelEn: 'Agentic AI',
  },
  {
    id: 'website-dan-performa',
    clusterId: 'website-dan-performa',
    labelId: 'Website dan performa',
    labelEn: 'Websites and performance',
  },
  {
    id: 'seo-lokal-dan-geo',
    clusterId: 'seo-lokal-dan-geo',
    labelId: 'SEO lokal dan GEO',
    labelEn: 'Local SEO and GEO',
  },
  {
    id: 'otomasi-dan-software',
    clusterId: 'otomasi-dan-software',
    labelId: 'Otomasi dan software',
    labelEn: 'Automation and software',
  },
  {
    id: 'biaya-dan-memilih-vendor',
    clusterId: 'biaya-dan-memilih-vendor',
    labelId: 'Biaya dan memilih vendor',
    labelEn: 'Costs and choosing a vendor',
  },
];

const TOPIC_LABEL_MAP: Record<TopicClusterId, { id: string; en: string }> = {
  'agentic-ai': { id: 'Agentic AI', en: 'Agentic AI' },
  'website-dan-performa': {
    id: 'Website dan performa',
    en: 'Websites and performance',
  },
  'seo-lokal-dan-geo': {
    id: 'SEO lokal dan GEO',
    en: 'Local SEO and GEO',
  },
  'otomasi-dan-software': {
    id: 'Otomasi dan software',
    en: 'Automation and software',
  },
  'biaya-dan-memilih-vendor': {
    id: 'Biaya dan memilih vendor',
    en: 'Costs and choosing a vendor',
  },
};

const MONTHS_ID = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Mei',
  'Jun',
  'Jul',
  'Agu',
  'Sep',
  'Okt',
  'Nov',
  'Des',
];

const MONTHS_EN = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function formatEditorialDate(rawDate: string, locale: 'id' | 'en'): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec((rawDate || '').trim());
  if (!match) return rawDate;
  const year = match[1];
  const monthIdx = parseInt(match[2], 10) - 1;
  const day = parseInt(match[3], 10);
  const months = locale === 'en' ? MONTHS_EN : MONTHS_ID;
  const monthName = months[monthIdx] || match[2];
  return `${day} ${monthName} ${year}`;
}

export default function BlogHubPage() {
  const { page: pageParam, category: categoryParam } = useParams<{
    page?: string;
    category?: string;
  }>();
  const location = useLocation();
  const { locale, prefixMode } = parseLocalizedPath(location.pathname);
  const isEn = locale === 'en';

  // Legacy category route redirect -> matching topic cluster hub
  if (categoryParam) {
    const categoryToCluster: Record<string, TopicClusterId> = {
      'performa-web': 'website-dan-performa',
      'konversi-ux': 'website-dan-performa',
      'investasi-web': 'biaya-dan-memilih-vendor',
      'otomasi-ai': 'agentic-ai',
      'seo-lokal': 'seo-lokal-dan-geo',
      'operasional-bisnis': 'otomasi-dan-software',
    };
    const targetCluster =
      categoryToCluster[categoryParam.toLowerCase().trim()] || 'agentic-ai';
    return <Navigate to={getClusterHubPath(targetCluster, locale)} replace />;
  }

  // Canonical redirect for /halaman/1 or /page/1 -> /id/blog or /en/blog
  if (pageParam === '1') {
    return <Navigate to={isEn ? '/en/blog' : '/id/blog'} replace />;
  }

  const requestedPage = pageParam ? parseInt(pageParam, 10) : 1;
  const slice = getBlogPaginationSlice(
    locale,
    Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1
  );

  // Redirect out-of-range page numbers to the last valid page
  if (
    pageParam &&
    (!Number.isFinite(requestedPage) ||
      requestedPage < 1 ||
      requestedPage > slice.totalPages)
  ) {
    return <Navigate to={slice.canonicalPath} replace />;
  }

  const blogIndexHref = isEn ? '/en/blog' : '/id/blog';
  const getPageHref = (pageNumber: number) => {
    if (pageNumber <= 1) return blogIndexHref;
    return isEn
      ? `/en/blog/page/${pageNumber}`
      : `/id/blog/halaman/${pageNumber}`;
  };

  const getTopicLabel = (clusterId: TopicClusterId) => {
    const entry = TOPIC_LABEL_MAP[clusterId];
    if (!entry) return isEn ? 'Agentic AI' : 'Agentic AI';
    return isEn ? entry.en : entry.id;
  };

  const pageNumbers = Array.from(
    { length: slice.totalPages },
    (_, idx) => idx + 1
  );

  return (
    <div className="bg-[var(--bg)] text-[var(--ink)] min-h-screen">
      <SEOMetadata path={slice.canonicalPath} />

      <div className="max-w-[1120px] mx-auto px-[20px] md:px-[32px] pt-[96px] md:pt-[120px] pb-[64px] md:pb-[96px]">
        {/* 1. HEADER */}
        <header className="mb-[32px]">
          <h1 className="text-[clamp(2rem,4vw,2.75rem)] font-semibold tracking-[-0.025em] leading-[1.1] text-[var(--ink)]">
            Blog
          </h1>
          <p className="mt-3 text-[16px] text-[var(--ink-muted)] max-w-[52ch] leading-[1.6]">
            {isEn
              ? 'Notes on AI agents, websites, and automation for businesses in South Tangerang.'
              : 'Catatan tentang AI agent, website, dan otomasi untuk bisnis di Tangerang Selatan.'}
          </p>
        </header>

        {/* 2. TOPIC BAR */}
        <div className="relative border-b border-[var(--line)]">
          <nav
            aria-label={isEn ? 'Blog topics' : 'Topik blog'}
            className="flex items-center gap-[24px] overflow-x-auto whitespace-nowrap no-scrollbar -mb-[1px]"
          >
            {TOPIC_BAR_ITEMS.map((item) => {
              const isActive = item.id === 'all';
              const href = item.clusterId
                ? getClusterHubPath(item.clusterId, locale)
                : blogIndexHref;
              const label = isEn ? item.labelEn : item.labelId;

              return (
                <Link
                  key={item.id}
                  to={href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`inline-block py-[14px] text-[14px] leading-[1.4] transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--purple-600)] ${
                    isActive
                      ? 'text-[var(--ink)] font-medium border-b-2 border-[var(--purple-600)]'
                      : 'text-[var(--ink-muted)] hover:text-[var(--ink)] border-b-2 border-transparent'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
          {/* Soft right edge fade for mobile horizontal scroll */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 bottom-[1px] w-8 bg-gradient-to-l from-[var(--bg)] to-transparent md:hidden"
          />
        </div>

        {/* 3. FEATURED POST (Latest Published Post — Page 1 Only) */}
        {slice.featuredPost && (
          <Reveal>
            <section
              aria-label={isEn ? 'Latest article' : 'Artikel terbaru'}
              className="mt-[48px] mb-[64px]"
            >
              <article className="grid grid-cols-1 lg:grid-cols-12 gap-[24px] lg:gap-[40px] items-center group">
                <Link
                  to={toLocalizedHref(
                    `/blog/${slice.featuredPost.slug}`,
                    locale,
                    prefixMode
                  )}
                  className="lg:col-span-7 block aspect-video rounded-[20px] border border-[var(--line)] overflow-hidden bg-[var(--bg-soft)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--purple-600)]"
                >
                  <img
                    src={slice.featuredPost.coverImage}
                    alt={slice.featuredPost.coverAlt}
                    width={1600}
                    height={900}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-full object-cover lg:group-hover:scale-[1.02] transition-transform duration-300 ease-out"
                  />
                </Link>

                <div className="lg:col-span-5 flex flex-col justify-center">
                  <p className="text-[13px] text-[var(--ink-muted)] leading-[1.4]">
                    <span>{getTopicLabel(slice.featuredPost.clusterId)}</span>
                    <span className="mx-1.5" aria-hidden="true">
                      ·
                    </span>
                    <time dateTime={slice.featuredPost.date}>
                      {formatEditorialDate(slice.featuredPost.date, locale)}
                    </time>
                    <span className="mx-1.5" aria-hidden="true">
                      ·
                    </span>
                    <span>{slice.featuredPost.readTime}</span>
                  </p>

                  <h2 className="mt-3 text-[28px] md:text-[32px] font-semibold leading-[1.2] tracking-[-0.02em] text-[var(--ink)]">
                    <Link
                      to={toLocalizedHref(
                        `/blog/${slice.featuredPost.slug}`,
                        locale,
                        prefixMode
                      )}
                      className="lg:group-hover:text-[var(--purple-700)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--purple-600)] rounded-sm"
                    >
                      {slice.featuredPost.title}
                    </Link>
                  </h2>

                  <p className="mt-3 text-[16px] text-[var(--ink-muted)] leading-[1.6] line-clamp-3">
                    {slice.featuredPost.excerpt}
                  </p>

                  <div className="mt-5">
                    <Link
                      to={toLocalizedHref(
                        `/blog/${slice.featuredPost.slug}`,
                        locale,
                        prefixMode
                      )}
                      className="inline-flex items-center gap-1.5 text-[15px] font-medium text-[var(--ink)] hover:text-[var(--purple-700)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--purple-600)] rounded-sm"
                    >
                      <span>{isEn ? 'Read article' : 'Baca artikel'}</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            </section>
          </Reveal>
        )}

        {/* 4. ARTICLE GRID (3 cols desktop, 2 tablet, 1 mobile, 32px gap) */}
        <Reveal>
          <section
            aria-label={isEn ? 'All articles' : 'Daftar artikel'}
            className={slice.featuredPost ? '' : 'mt-[48px]'}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[32px]">
              {slice.gridPosts.map((post) => {
                const postHref = toLocalizedHref(
                  `/blog/${post.slug}`,
                  locale,
                  prefixMode
                );
                return (
                  <article key={post.slug}>
                    <Link
                      to={postHref}
                      className="group block rounded-[16px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--purple-600)]"
                    >
                      <div className="aspect-video rounded-[16px] border border-[var(--line)] overflow-hidden bg-[var(--bg-soft)]">
                        <img
                          src={post.coverImage}
                          alt={post.coverAlt}
                          width={640}
                          height={360}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover lg:group-hover:scale-[1.02] transition-transform duration-300 ease-out"
                        />
                      </div>

                      <p className="mt-[12px] text-[13px] text-[var(--ink-muted)] leading-[1.4]">
                        <span>{getTopicLabel(post.clusterId)}</span>
                        <span className="mx-1.5" aria-hidden="true">
                          ·
                        </span>
                        <time dateTime={post.date}>
                          {formatEditorialDate(post.date, locale)}
                        </time>
                        <span className="mx-1.5" aria-hidden="true">
                          ·
                        </span>
                        <span>{post.readTime}</span>
                      </p>

                      <h2 className="mt-1.5 text-[18px] font-semibold leading-[1.35] tracking-[-0.015em] text-[var(--ink)] line-clamp-2 lg:group-hover:text-[var(--purple-700)] transition-colors">
                        {post.title}
                      </h2>
                    </Link>
                  </article>
                );
              })}
            </div>
          </section>
        </Reveal>

        {/* 5. PAGINATION */}
        {slice.totalPages > 1 && (
          <nav
            aria-label={isEn ? 'Blog pagination' : 'Navigasi halaman blog'}
            className="mt-[64px] pt-[32px] border-t border-[var(--line)] flex items-center justify-center gap-[24px] text-[14px]"
          >
            {slice.prevPath ? (
              <Link
                to={slice.prevPath}
                rel="prev"
                className="text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--purple-600)] rounded-sm"
              >
                {isEn ? 'Previous' : 'Sebelumnya'}
              </Link>
            ) : (
              <span
                aria-disabled="true"
                className="text-[var(--ink-muted)]/40 select-none"
              >
                {isEn ? 'Previous' : 'Sebelumnya'}
              </span>
            )}

            <div className="flex items-center gap-[16px]">
              {pageNumbers.map((num) => {
                const isCurrent = num === slice.currentPage;
                const href = getPageHref(num);
                return (
                  <Link
                    key={num}
                    to={href}
                    aria-current={isCurrent ? 'page' : undefined}
                    className={`inline-block py-1 px-1 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--purple-600)] ${
                      isCurrent
                        ? 'text-[var(--ink)] font-semibold border-b-2 border-[var(--purple-600)]'
                        : 'text-[var(--ink-muted)] hover:text-[var(--ink)] border-b-2 border-transparent'
                    }`}
                  >
                    {num}
                  </Link>
                );
              })}
            </div>

            {slice.nextPath ? (
              <Link
                to={slice.nextPath}
                rel="next"
                className="text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--purple-600)] rounded-sm"
              >
                {isEn ? 'Next' : 'Berikutnya'}
              </Link>
            ) : (
              <span
                aria-disabled="true"
                className="text-[var(--ink-muted)]/40 select-none"
              >
                {isEn ? 'Next' : 'Berikutnya'}
              </span>
            )}
          </nav>
        )}

        {/* 6. QUIET EDITORIAL BOTTOM CTA */}
        <section
          aria-label={isEn ? 'Free consultation' : 'Konsultasi gratis'}
          className="mt-[64px] pt-[48px] border-t border-[var(--line)] flex flex-col md:flex-row md:items-center justify-between gap-[24px]"
        >
          <div className="max-w-[54ch]">
            <h2 className="text-[20px] font-semibold tracking-[-0.015em] leading-[1.3] text-[var(--ink)]">
              {isEn
                ? 'Have a question about websites or AI for your business?'
                : 'Punya pertanyaan soal website atau AI untuk bisnismu?'}
            </h2>
            <p className="mt-1.5 text-[15px] text-[var(--ink-muted)] leading-[1.6]">
              {isEn
                ? 'Start with a free 30-minute audit with Chesta and Zeeshan.'
                : 'Mulai dari audit gratis 30 menit bersama Chesta dan Zeeshan.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-[20px] shrink-0">
            <a
              href="https://wa.me/6282125447232"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-[12px] bg-[var(--purple-600)] hover:bg-[var(--purple-700)] text-[#FFFFFF] text-[14px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--purple-600)]"
            >
              Chat via WhatsApp
            </a>
            <a
              href="mailto:chestaadotcom@gmail.com"
              className="text-[14px] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--purple-600)] rounded-sm"
            >
              {isEn ? 'or send an email →' : 'atau kirim email →'}
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
