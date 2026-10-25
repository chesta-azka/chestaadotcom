import React, { useState, useEffect, useMemo } from 'react';
import {
  Link,
  useParams,
  useSearchParams,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import {
  ArrowRight,
  Clock,
  Search,
  X,
  RotateCcw,
  Rss,
  Calendar,
} from 'lucide-react';
import SEOMetadata from '../components/atoms/SEOMetadata';
import {
  getLocalizedBlogCategories,
  getPublishedBlogPosts,
  getBlogCategoryBySlug,
  getAuthorProfile,
} from '../data/blog-posts';
import {
  Container,
  Breadcrumb,
  Badge,
  Card,
  Button,
  WordRevealHeading,
  Reveal,
  CTABlock,
  ImageWithFallback,
} from '../components/ui/DesignSystem';
import { parseLocalizedPath, toLocalizedHref } from '../lib/i18n';

const INITIAL_GRID_COUNT = 6;
const LOAD_MORE_STEP = 3;

export default function BlogHubPage() {
  const { category: routeCategoryParam } = useParams<{ category?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { locale, prefixMode } = parseLocalizedPath(location.pathname);
  const isEn = locale === 'en';

  const queryCategoryParam =
    searchParams.get('kategori') || searchParams.get('category') || '';
  const activeCategoryParam = routeCategoryParam || queryCategoryParam;

  const localizedCategories = useMemo(
    () => getLocalizedBlogCategories(locale),
    [locale]
  );

  const activeCategoryMeta = useMemo(
    () =>
      activeCategoryParam
        ? getBlogCategoryBySlug(activeCategoryParam, locale)
        : undefined,
    [activeCategoryParam, locale]
  );

  const selectedCategorySlug = activeCategoryMeta ? activeCategoryMeta.slug : 'semua';

  // Client-side debounced search (no external library)
  const [rawSearch, setRawSearch] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_GRID_COUNT);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(rawSearch.trim().toLowerCase());
    }, 200);
    return () => window.clearTimeout(timer);
  }, [rawSearch]);

  // Reset pagination count when category, locale, or search changes
  useEffect(() => {
    setVisibleCount(INITIAL_GRID_COUNT);
  }, [selectedCategorySlug, debouncedSearch, locale]);

  const allPosts = useMemo(() => getPublishedBlogPosts(locale), [locale]);

  const featuredPost = useMemo(
    () => allPosts.find((p) => p.featured) || allPosts[0],
    [allPosts]
  );

  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      const matchesCategory =
        selectedCategorySlug === 'semua' ||
        post.categorySlug === selectedCategorySlug;

      if (!matchesCategory) return false;
      if (!debouncedSearch) return true;

      const inTitle = post.title.toLowerCase().includes(debouncedSearch);
      const inExcerpt = post.excerpt.toLowerCase().includes(debouncedSearch);
      const inCategory = post.category.toLowerCase().includes(debouncedSearch);
      const inTags = post.tags.some((t) =>
        t.toLowerCase().includes(debouncedSearch)
      );

      return inTitle || inExcerpt || inCategory || inTags;
    });
  }, [allPosts, selectedCategorySlug, debouncedSearch]);

  const visiblePosts = useMemo(
    () => filteredPosts.slice(0, visibleCount),
    [filteredPosts, visibleCount]
  );

  const hasMorePosts = visibleCount < filteredPosts.length;

  const blogHubHref = toLocalizedHref('/blog', locale, prefixMode);

  const handleSelectCategory = (slug: string) => {
    if (slug === 'semua') {
      if (routeCategoryParam) {
        navigate(blogHubHref);
      } else {
        const nextParams = new URLSearchParams(searchParams);
        nextParams.delete('kategori');
        nextParams.delete('category');
        setSearchParams(nextParams, { replace: true });
      }
      return;
    }

    if (routeCategoryParam) {
      navigate(toLocalizedHref(`/blog/kategori/${slug}`, locale, prefixMode));
    } else {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.set('kategori', slug);
      setSearchParams(nextParams, { replace: true });
    }
  };

  const handleResetFilters = () => {
    setRawSearch('');
    setDebouncedSearch('');
    if (routeCategoryParam) {
      navigate(blogHubHref);
    } else if (searchParams.has('kategori') || searchParams.has('category')) {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete('kategori');
      nextParams.delete('category');
      setSearchParams(nextParams, { replace: true });
    }
  };

  const pageTitle = activeCategoryMeta
    ? isEn
      ? `${activeCategoryMeta.shortLabel} Articles — Notes from Our Team | CHESTAADOTCOM`
      : `Artikel ${activeCategoryMeta.shortLabel} — Catatan dari Kami | CHESTAADOTCOM`
    : isEn
      ? 'Notes from Our Team — Custom Software, AI Agent & Business Web Blog | CHESTAADOTCOM'
      : 'Catatan dari Kami — Blog Software, AI Agent & Web Bisnis | CHESTAADOTCOM';

  const pageDescription = activeCategoryMeta
    ? activeCategoryMeta.description
    : isEn
      ? 'Practical engineering notes from Chesta Azka & Zeeshan on custom software, WhatsApp AI agents, Model Context Protocol (MCP), workflow automation, and GEO/AEO.'
      : 'Catatan praktis dari Chesta Azka & Zeeshan seputar software custom, AI agent WhatsApp, otomasi alur kerja, dan web untuk bisnis di BSD & Jabodetabek.';

  const canonicalPath =
    routeCategoryParam && activeCategoryMeta
      ? toLocalizedHref(`/blog/kategori/${activeCategoryMeta.slug}`, locale, prefixMode)
      : blogHubHref;

  const breadcrumbItems =
    routeCategoryParam && activeCategoryMeta
      ? [
          { label: 'Blog', to: blogHubHref },
          { label: activeCategoryMeta.shortLabel },
        ]
      : [{ label: 'Blog' }];

  const featuredAuthor = featuredPost
    ? getAuthorProfile(featuredPost.author, locale)
    : undefined;

  return (
    <div className="bg-[#FFFFFF] text-[#17122B] min-h-screen pt-28 pb-16 md:pb-24">
      <SEOMetadata
        title={pageTitle}
        description={pageDescription}
        path={canonicalPath}
      />

      <Container>
        <Breadcrumb items={breadcrumbItems} />

        {/* 1. COMPACT HEADER */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge variant="tint">
                {isEn
                  ? 'PRACTITIONER JOURNAL · CHESTAADOTCOM'
                  : 'JURNAL PRAKTISI · CHESTAADOTCOM'}
              </Badge>
              {activeCategoryMeta && (
                <Badge variant="outline">
                  {isEn ? 'CATEGORY:' : 'KATEGORI:'} {activeCategoryMeta.shortLabel}
                </Badge>
              )}
            </div>
            <WordRevealHeading
              as="h1"
              priority
              text={isEn ? 'Notes from our team' : 'Catatan dari kami'}
            />
            <p className="mt-2.5 text-[15px] md:text-[16px] text-[#5B5675] leading-[1.65]">
              {isEn
                ? 'Practical breakdowns on custom software engineering, WhatsApp AI agents, Model Context Protocol (MCP), operational automation, and high-speed business websites.'
                : 'Bahasan praktis seputar rekayasa software custom, AI agent WhatsApp, otomasi operasional, dan pembuatan web untuk bisnis.'}
            </p>
          </div>

          <a
            href="/rss.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 self-start md:self-auto min-h-[40px] px-4 py-2 rounded-full bg-[#F8F6FE] hover:bg-[#EFEAFB] border border-[rgba(91,60,196,0.14)] font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold transition-colors"
            aria-label={
              isEn
                ? 'Subscribe to CHESTAADOTCOM Blog RSS Feed'
                : 'Langganan RSS Feed Blog CHESTAADOTCOM'
            }
          >
            <Rss size={13} />
            <span>RSS Feed</span>
          </a>
        </header>

        {/* 2. FEATURED POST WIDE GLASS CARD */}
        {featuredPost && selectedCategorySlug === 'semua' && !debouncedSearch && (
          <section
            aria-label={isEn ? 'Featured Article' : 'Artikel Unggulan'}
            className="mb-12"
          >
            <Card
              variant="glass"
              padding="none"
              className="overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-[rgba(91,60,196,0.16)]"
            >
              <Link
                to={toLocalizedHref(`/blog/${featuredPost.slug}`, locale, prefixMode)}
                className="lg:col-span-7 aspect-video bg-[#F8F6FE] border-b lg:border-b-0 lg:border-r border-[rgba(91,60,196,0.14)] overflow-hidden block group"
              >
                <ImageWithFallback
                  src={featuredPost.cover}
                  alt={featuredPost.coverAlt}
                  width={1280}
                  height={720}
                  priority={true}
                  viewTransitionName={`blog-cover-${featuredPost.slug}`}
                  className="w-full h-full object-cover"
                />
              </Link>

              <div className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between bg-[#FFFFFF]/80">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3 font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675]">
                    <Badge variant="tint">
                      {isEn ? 'PILLAR GUIDE' : 'ARTIKEL PILAR'}
                    </Badge>
                    <Link
                      to={toLocalizedHref(
                        `/blog/kategori/${featuredPost.categorySlug}`,
                        locale,
                        prefixMode
                      )}
                      className="font-semibold text-[#6A3FD0] hover:underline"
                    >
                      {featuredPost.category}
                    </Link>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock size={12} className="text-[#7C54E0]" />
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <h2 className="text-[22px] md:text-[26px] leading-[1.25]">
                    <Link
                      to={toLocalizedHref(
                        `/blog/${featuredPost.slug}`,
                        locale,
                        prefixMode
                      )}
                      className="hover:text-[#6A3FD0] transition-colors"
                    >
                      {featuredPost.title}
                    </Link>
                  </h2>

                  <p className="mt-3 text-[15px] text-[#5B5675] leading-[1.65] line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[rgba(91,60,196,0.14)] flex flex-wrap items-center justify-between gap-4">
                  {featuredAuthor && (
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#EFEAFB] border border-[rgba(91,60,196,0.16)] flex items-center justify-center font-mono text-[11px] font-semibold text-[#6A3FD0]">
                        {featuredAuthor.initials}
                      </div>
                      <div className="font-mono text-[11px] text-[#5B5675]">
                        <p className="text-[#17122B] font-semibold leading-tight">
                          {featuredAuthor.name}
                        </p>
                        <p className="leading-tight">{featuredPost.date}</p>
                      </div>
                    </div>
                  )}

                  <Button
                    to={toLocalizedHref(
                      `/blog/${featuredPost.slug}`,
                      locale,
                      prefixMode
                    )}
                    variant="primary"
                  >
                    <span>{isEn ? 'Read Article' : 'Baca Artikel'}</span>
                    <ArrowRight size={15} />
                  </Button>
                </div>
              </div>
            </Card>
          </section>
        )}

        {/* 3. URL-SYNCED CATEGORY CHIPS + DEBOUNCED SEARCH BAR */}
        <section
          aria-label={isEn ? 'Filter and Search Articles' : 'Filter dan Pencarian Artikel'}
          className="mb-8 p-4 md:p-5 rounded-[24px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] space-y-4"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Category Chips */}
            <div
              role="tablist"
              aria-label={isEn ? 'Article Categories' : 'Kategori Artikel'}
              className="flex flex-wrap items-center gap-2"
            >
              <button
                type="button"
                role="tab"
                aria-selected={selectedCategorySlug === 'semua'}
                onClick={() => handleSelectCategory('semua')}
                className={`min-h-[40px] px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-[0.08em] whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategorySlug === 'semua'
                    ? 'bg-[#6A3FD0] text-[#FFFFFF] font-semibold shadow-[0_4px_12px_rgba(106,63,208,0.18)]'
                    : 'bg-[#FFFFFF] text-[#5B5675] hover:text-[#17122B] border border-[rgba(91,60,196,0.14)]'
                }`}
              >
                {isEn ? `All (${allPosts.length})` : `Semua (${allPosts.length})`}
              </button>

              {localizedCategories.map((cat) => {
                const isActive = selectedCategorySlug === cat.slug;
                return (
                  <button
                    key={cat.slug}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleSelectCategory(cat.slug)}
                    className={`min-h-[40px] px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-[0.08em] whitespace-nowrap transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#6A3FD0] text-[#FFFFFF] font-semibold shadow-[0_4px_12px_rgba(106,63,208,0.18)]'
                        : 'bg-[#FFFFFF] text-[#5B5675] hover:text-[#17122B] border border-[rgba(91,60,196,0.14)]'
                    }`}
                  >
                    {cat.shortLabel}
                  </button>
                );
              })}
            </div>

            {/* Client-side Debounced Search Field */}
            <div className="relative w-full lg:w-72 shrink-0">
              <Search
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6A3FD0] pointer-events-none"
              />
              <input
                type="search"
                value={rawSearch}
                onChange={(e) => setRawSearch(e.target.value)}
                placeholder={
                  isEn
                    ? 'Search title, topic, or tag...'
                    : 'Cari judul, topik, atau tag...'
                }
                aria-label={isEn ? 'Search blog articles' : 'Cari artikel blog'}
                className="w-full min-h-[42px] pl-10 pr-9 py-2 rounded-full bg-[#FFFFFF] border border-[rgba(91,60,196,0.18)] text-[14px] text-[#17122B] placeholder:text-[#5B5675]/70 focus:outline-2 focus:outline-[#6A3FD0] transition-all"
              />
              {rawSearch && (
                <button
                  type="button"
                  onClick={() => {
                    setRawSearch('');
                    setDebouncedSearch('');
                  }}
                  aria-label={
                    isEn ? 'Clear search query' : 'Bersihkan kata kunci pencarian'
                  }
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#EFEAFB] text-[#6A3FD0] flex items-center justify-center hover:bg-[#6A3FD0] hover:text-[#FFFFFF] transition-colors cursor-pointer"
                >
                  <X size={13} />
                </button>
              )}
            </div>
          </div>

          {/* Active Filter Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[rgba(91,60,196,0.1)] font-mono text-[11px] text-[#5B5675]">
            <span>
              {isEn ? (
                <>
                  Showing <strong className="text-[#17122B]">{visiblePosts.length}</strong> of{' '}
                  <strong className="text-[#17122B]">{filteredPosts.length}</strong> articles
                  {activeCategoryMeta ? ` in ${activeCategoryMeta.name}` : ''}
                  {debouncedSearch ? ` matching "${debouncedSearch}"` : ''}
                </>
              ) : (
                <>
                  Menampilkan <strong className="text-[#17122B]">{visiblePosts.length}</strong> dari{' '}
                  <strong className="text-[#17122B]">{filteredPosts.length}</strong> artikel
                  {activeCategoryMeta ? ` dalam kategori ${activeCategoryMeta.name}` : ''}
                  {debouncedSearch ? ` untuk pencarian "${debouncedSearch}"` : ''}
                </>
              )}
            </span>

            {(selectedCategorySlug !== 'semua' || debouncedSearch) && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 text-[#6A3FD0] font-semibold hover:underline cursor-pointer"
              >
                <RotateCcw size={12} />
                <span>{isEn ? 'Reset filter' : 'Reset filter'}</span>
              </button>
            )}
          </div>
        </section>

        {/* 4. UNIFORM 3/2/1 ARTICLE GRID OR EMPTY STATE */}
        {filteredPosts.length === 0 ? (
          <Card variant="soft" padding="lg" className="text-center my-8 max-w-xl mx-auto">
            <Badge variant="tint" className="mb-3">
              {isEn ? 'NO RESULTS FOUND' : 'TIDAK ADA HASIL'}
            </Badge>
            <h2 className="text-[22px] text-[#17122B]">
              {isEn
                ? 'No articles match your current filter'
                : 'Belum ada artikel yang cocok dengan pencarianmu'}
            </h2>
            <p className="mt-2 text-[15px] text-[#5B5675] leading-[1.65]">
              {isEn
                ? 'Try a broader keyword (such as "AI agent", "MCP", "vibe coding", "GEO", or "n8n") or reset the category filter.'
                : 'Coba gunakan kata kunci yang lebih umum (misalnya "AI agent", "MCP", "vibe coding", "GEO", atau "n8n") atau tampilkan kembali seluruh kategori.'}
            </p>
            <div className="mt-6">
              <Button onClick={handleResetFilters} variant="primary">
                <RotateCcw size={15} />
                <span>{isEn ? 'Show All Articles' : 'Tampilkan Semua Artikel'}</span>
              </Button>
            </div>
          </Card>
        ) : (
          <>
            <Reveal staggerSelector=".blog-grid-card">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                {visiblePosts.map((post) => {
                  const authorProfile = getAuthorProfile(post.author, locale);
                  const postHref = toLocalizedHref(
                    `/blog/${post.slug}`,
                    locale,
                    prefixMode
                  );
                  const catHref = toLocalizedHref(
                    `/blog/kategori/${post.categorySlug}`,
                    locale,
                    prefixMode
                  );
                  return (
                    <Card
                      key={post.slug}
                      as="article"
                      variant="soft"
                      padding="none"
                      className="blog-grid-card h-full flex flex-col justify-between overflow-hidden group"
                    >
                      <div>
                        <Link
                          to={postHref}
                          className="block aspect-video bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)] overflow-hidden"
                        >
                          <ImageWithFallback
                            src={post.cover}
                            alt={post.coverAlt}
                            width={1280}
                            height={720}
                            viewTransitionName={`blog-cover-${post.slug}`}
                            className="w-full h-full object-cover"
                          />
                        </Link>

                        <div className="p-5 md:p-6">
                          <div className="flex items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675]">
                            <Link
                              to={catHref}
                              className="text-[#6A3FD0] font-semibold truncate hover:underline"
                            >
                              {post.category}
                            </Link>
                            <span className="shrink-0 inline-flex items-center gap-1">
                              <Clock size={12} className="text-[#7C54E0]" />
                              {post.readTime}
                            </span>
                          </div>

                          <h3 className="mt-2.5 text-[18px] leading-[1.35] group-hover:text-[#6A3FD0] transition-colors line-clamp-2">
                            <Link to={postHref}>{post.title}</Link>
                          </h3>

                          <p className="mt-2 text-[14px] text-[#5B5675] line-clamp-2 leading-[1.65]">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>

                      <div className="px-5 md:px-6 pb-5 pt-3 border-t border-[rgba(91,60,196,0.14)] flex items-center justify-between text-[13px]">
                        <div className="font-mono text-[11px] text-[#5B5675] flex items-center gap-1.5">
                          <Calendar size={12} className="text-[#7C54E0]" />
                          <span>{post.date}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-[#17122B] font-medium">
                            {authorProfile.name}
                          </span>
                        </div>

                        <Link
                          to={postHref}
                          className="link-underline inline-flex items-center gap-1 min-h-[40px] font-semibold text-[#6A3FD0]"
                        >
                          <span>{isEn ? 'Read' : 'Baca'}</span>
                          <ArrowRight size={14} className="icon-slide-hover" />
                        </Link>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </Reveal>

            {/* 5. LOAD MORE PAGINATION BUTTON */}
            {hasMorePosts && (
              <div className="mt-10 text-center">
                <Button
                  variant="secondary"
                  onClick={() => setVisibleCount((prev) => prev + LOAD_MORE_STEP)}
                >
                  <span>
                    {isEn
                      ? `Load more (${filteredPosts.length - visiblePosts.length} remaining)`
                      : `Muat lebih banyak (${filteredPosts.length - visiblePosts.length} artikel tersisa)`}
                  </span>
                  <ArrowRight size={15} className="text-[#6A3FD0]" />
                </Button>
              </div>
            )}
          </>
        )}

        {/* 6. BOTTOM CTA BLOCK */}
        <div className="mt-16">
          <CTABlock
            eyebrow={
              isEn
                ? 'TALK DIRECTLY WITH THE CO-FOUNDERS'
                : 'DISKUSI LANGSUNG BERSAMA PENDIRI'
            }
            title={
              isEn
                ? 'Want to apply the systems covered in our notes?'
                : 'Ingin menerapkan sistem yang dibahas di catatan kami?'
            }
            description={
              isEn
                ? 'Tell us which workflow is currently eating up your team’s time. Websites start at IDR 1,200,000, and our 30-minute workflow audit is free for AI agents and custom software.'
                : 'Ceritakan alur kerja yang saat ini menyita waktu tim kamu. Web mulai Rp1.200.000, dan audit alur 30 menit gratis untuk AI agent maupun software custom.'
            }
          />
        </div>
      </Container>
    </div>
  );
}
