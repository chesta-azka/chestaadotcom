import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  Calendar,
  Layers,
  MapPin,
  Sparkles,
} from 'lucide-react';
import SEOMetadata from '../components/atoms/SEOMetadata';
import {
  TOPIC_CLUSTERS,
  getTopicClusterById,
  getClusterHubPath,
} from '../data/clusters';
import {
  getBlogPostBySlug,
  getBlogPostsByCluster,
  getAuthorProfile,
} from '../data/blog-posts';
import { getLocalizedService } from '../lib/i18n-content';
import { getServicePath, getServiceAreaPath } from '../data/services';
import { getAreaBySlug } from '../data/areas';
import {
  Container,
  Breadcrumb,
  Card,
  Badge,
  Button,
  Tag,
  WordRevealHeading,
  CTABlock,
  ImageWithFallback,
} from '../components/ui/DesignSystem';
import { parseLocalizedPath, toLocalizedHref } from '../lib/i18n';

export default function BlogTopicClusterPage() {
  const { cluster: clusterParam } = useParams<{ cluster: string }>();
  const location = useLocation();
  const { locale, prefixMode } = parseLocalizedPath(location.pathname);
  const isEn = locale === 'en';

  const cluster = getTopicClusterById(clusterParam || '');
  const blogHubHref = toLocalizedHref('/blog', locale, prefixMode);

  if (!cluster) {
    return (
      <div className="min-h-screen bg-[#FFFFFF] text-[#17122B] pt-32 pb-24">
        <Container className="max-w-xl">
          <Card variant="soft" padding="lg" className="text-center">
            <Tag>{isEn ? '404 · Topic Not Found' : '404 · Topik Tidak Ditemukan'}</Tag>
            <h1 className="mt-2">
              {isEn
                ? 'The topic cluster you are looking for is not available'
                : 'Klaster topik yang kamu cari belum tersedia'}
            </h1>
            <p className="mt-3 text-[15px] text-[#5B5675]">
              {isEn
                ? 'Return to our main blog directory to browse all technical guides and topic hubs.'
                : 'Kembali ke halaman utama blog untuk menelusuri seluruh panduan teknis dan klaster topik kami.'}
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

  const clusterTitle = isEn ? cluster.titleEn : cluster.titleId;
  const clusterShortLabel = isEn ? cluster.shortLabelEn : cluster.shortLabelId;
  const clusterIntro = isEn ? cluster.introEn : cluster.introId;
  const seoTitle = isEn ? cluster.seoTitleEn : cluster.seoTitleId;
  const metaDescription = isEn ? cluster.metaDescriptionEn : cluster.metaDescriptionId;
  const pillarSlug = isEn ? cluster.pillarSlugEn : cluster.pillarSlugId;

  const allClusterPosts = getBlogPostsByCluster(cluster.id, locale);
  const pillarPost =
    getBlogPostBySlug(pillarSlug, locale) || allClusterPosts[0];
  const spokePosts = allClusterPosts.filter(
    (p) => !pillarPost || p.slug !== pillarPost.slug
  );

  const canonicalPath = getClusterHubPath(cluster.id, locale);
  const alternateLangHref = getClusterHubPath(
    cluster.id,
    isEn ? 'id' : 'en'
  );

  const relatedServices = cluster.relatedServiceSlugs
    .map((slug) => getLocalizedService(slug, locale))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const relatedAreas = cluster.relatedAreaSlugs
    .map((areaSlug) => getAreaBySlug(areaSlug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  return (
    <div className="bg-[#FFFFFF] text-[#17122B] min-h-screen pt-28 pb-24">
      <SEOMetadata
        title={seoTitle}
        description={metaDescription}
        path={canonicalPath}
        type="website"
      />

      <Container>
        <Breadcrumb
          items={[
            { label: 'Blog', to: blogHubHref },
            { label: clusterShortLabel },
          ]}
        />

        {/* Topic Cluster Switcher Bar */}
        <nav
          aria-label={isEn ? 'Topic Clusters' : 'Klaster Topik'}
          className="mb-8 flex flex-wrap items-center gap-2"
        >
          <Link
            to={blogHubHref}
            className="px-3.5 py-1.5 rounded-full bg-[#F8F6FE] hover:bg-[#EFEAFB] border border-[rgba(91,60,196,0.14)] font-mono text-[11px] uppercase tracking-[0.06em] text-[#5B5675] transition-colors"
          >
            {isEn ? 'All Articles' : 'Semua Artikel'}
          </Link>
          {TOPIC_CLUSTERS.map((c) => {
            const active = c.id === cluster.id;
            const href = getClusterHubPath(c.id, locale);
            const label = isEn ? c.shortLabelEn : c.shortLabelId;
            return (
              <Link
                key={c.id}
                to={href}
                aria-current={active ? 'page' : undefined}
                className={`px-3.5 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-[0.06em] border transition-colors ${
                  active
                    ? 'bg-[#6A3FD0] text-[#FFFFFF] border-[#6A3FD0] font-semibold'
                    : 'bg-[#F8F6FE] hover:bg-[#EFEAFB] text-[#17122B] border-[rgba(91,60,196,0.14)]'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Cluster Hub Header & 120+ Word Editorial Intro */}
        <header className="max-w-4xl mb-12">
          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <Badge variant="tint">
              <Layers size={13} className="mr-1 text-[#6A3FD0]" />
              <span>
                {isEn
                  ? `TOPIC CLUSTER · ${allClusterPosts.length} ARTICLES`
                  : `KLASTER TOPIK · ${allClusterPosts.length} ARTIKEL`}
              </span>
            </Badge>
            <Link
              to={alternateLangHref}
              className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold hover:underline"
            >
              {isEn ? 'Baca versi Bahasa Indonesia' : 'Read in English'}
            </Link>
          </div>

          <WordRevealHeading as="h1" priority text={clusterTitle} />

          <div className="mt-5 p-6 md:p-7 rounded-[24px] bg-[#F8F6FE] border border-[rgba(91,60,196,0.16)]">
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#6A3FD0] font-semibold mb-2">
              {isEn ? 'TOPIC OVERVIEW & ARCHITECTURE SCOPE' : 'PENGANTAR TOPIK & CAKUPAN BAHASAN'}
            </p>
            <p className="text-[15.5px] md:text-[16.5px] text-[#3E3954] leading-[1.72]">
              {clusterIntro}
            </p>
          </div>
        </header>

        {/* Featured Pillar Article */}
        {pillarPost && (
          <section
            aria-label={isEn ? 'Pillar Guide' : 'Panduan Utama (Pillar)'}
            className="mb-14"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={16} className="text-[#6A3FD0]" />
              <Tag>
                {isEn
                  ? 'PILLAR GUIDE · START HERE'
                  : 'PANDUAN UTAMA (PILLAR) · MULAI DARI SINI'}
              </Tag>
            </div>

            <Card
              as="article"
              variant="highlighted"
              padding="none"
              className="overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch"
            >
              <Link
                to={toLocalizedHref(`/blog/${pillarPost.slug}`, locale, prefixMode)}
                className="lg:col-span-6 block aspect-video lg:aspect-auto bg-[#FFFFFF] border-b lg:border-b-0 lg:border-r border-[rgba(91,60,196,0.14)] overflow-hidden"
              >
                <ImageWithFallback
                  src={pillarPost.cover}
                  alt={pillarPost.coverAlt}
                  width={1600}
                  height={900}
                  priority={true}
                  className="w-full h-full object-cover"
                />
              </Link>

              <div className="lg:col-span-6 p-6 md:p-8 flex flex-col justify-between gap-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675]">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#6A3FD0] text-[#FFFFFF] font-semibold">
                      {isEn ? 'Pillar Article' : 'Artikel Pilar'}
                    </span>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock size={12} className="text-[#6A3FD0]" />
                      {pillarPost.readTime}
                    </span>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar size={12} className="text-[#6A3FD0]" />
                      {isEn
                        ? `Updated ${pillarPost.updatedAt}`
                        : `Diperbarui ${pillarPost.updatedAt}`}
                    </span>
                  </div>

                  <h2 className="mt-3 text-[22px] md:text-[26px] font-semibold text-[#17122B] leading-[1.3]">
                    <Link
                      to={toLocalizedHref(`/blog/${pillarPost.slug}`, locale, prefixMode)}
                      className="hover:text-[#6A3FD0] transition-colors"
                    >
                      {pillarPost.title}
                    </Link>
                  </h2>

                  <p className="mt-3 text-[15px] text-[#5B5675] leading-[1.68]">
                    {pillarPost.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[rgba(91,60,196,0.14)] flex flex-wrap items-center justify-between gap-4">
                  <div className="font-mono text-[11px] text-[#5B5675]">
                    {isEn ? 'By' : 'Oleh'}{' '}
                    <span className="font-semibold text-[#17122B]">
                      {getAuthorProfile(pillarPost.author, locale).name}
                    </span>
                  </div>
                  <Button
                    to={toLocalizedHref(`/blog/${pillarPost.slug}`, locale, prefixMode)}
                    variant="primary"
                  >
                    <span>
                      {isEn ? 'Read Pillar Guide' : 'Baca Panduan Utama'}
                    </span>
                    <ArrowRight size={15} />
                  </Button>
                </div>
              </div>
            </Card>
          </section>
        )}

        {/* All Cluster Spoke Posts */}
        <section
          aria-label={
            isEn
              ? 'All Articles in This Cluster'
              : 'Seluruh Artikel dalam Klaster Ini'
          }
          className="mb-16"
        >
          <div className="mb-6">
            <Tag>
              {isEn
                ? `DEEP-DIVE GUIDES (${spokePosts.length} ARTICLES)`
                : `PANDUAN MENDALAM (${spokePosts.length} ARTIKEL)`}
            </Tag>
            <h2 className="mt-1 text-[24px] md:text-[28px]">
              {isEn
                ? `Explore all articles in ${clusterShortLabel}`
                : `Jelajahi semua artikel di topik ${clusterShortLabel}`}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {spokePosts.map((post) => {
              const postHref = toLocalizedHref(`/blog/${post.slug}`, locale, prefixMode);
              const author = getAuthorProfile(post.author, locale);
              return (
                <Card
                  key={post.slug}
                  as="article"
                  variant="soft"
                  padding="none"
                  className="h-full flex flex-col justify-between overflow-hidden group lg:hover:-translate-y-1 transition-transform duration-200"
                >
                  <div>
                    <Link
                      to={postHref}
                      className="block aspect-video bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)] overflow-hidden"
                    >
                      <ImageWithFallback
                        src={post.cover}
                        alt={post.coverAlt}
                        width={1600}
                        height={900}
                        className="w-full h-full object-cover lg:group-hover:scale-[1.02] transition-transform duration-300"
                      />
                    </Link>

                    <div className="p-5 md:p-6">
                      <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#5B5675]">
                        <span className="text-[#6A3FD0] font-semibold">
                          {post.category}
                        </span>
                        <span className="mx-1.5">·</span>
                        <span>{post.readTime}</span>
                      </div>

                      <h3 className="mt-2 text-[18px] leading-[1.35] group-hover:text-[#6A3FD0] transition-colors line-clamp-2">
                        <Link to={postHref}>{post.title}</Link>
                      </h3>

                      <p className="mt-2 text-[14px] text-[#5B5675] line-clamp-3 leading-[1.65]">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 md:px-6 pb-5 pt-3 border-t border-[rgba(91,60,196,0.14)] flex items-center justify-between">
                    <span className="font-mono text-[11px] text-[#5B5675]">
                      {author.name} · {post.updatedAt}
                    </span>
                    <Link
                      to={postHref}
                      className="inline-flex items-center gap-1 min-h-[36px] text-[13px] font-semibold text-[#6A3FD0] hover:underline"
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

        {/* Related Services & Local Area Coverage */}
        <section
          aria-label={
            isEn
              ? 'Related Services and Service Areas'
              : 'Layanan dan Area Layanan Terkait'
          }
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16"
        >
          <Card variant="soft" padding="lg" className="lg:col-span-7 space-y-4">
            <Tag>
              {isEn ? 'RELATED SERVICES' : 'LAYANAN TERKAIT TOPIK INI'}
            </Tag>
            <h2 className="text-[20px] md:text-[22px]">
              {isEn
                ? 'Need hands-on implementation for your business?'
                : 'Butuh implementasi langsung untuk bisnismu?'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {relatedServices.map((srv) => {
                const srvHref = getServicePath(srv.slug, locale);
                return (
                  <Link
                    key={srv.slug}
                    to={srvHref}
                    className="p-4 rounded-[18px] bg-[#FFFFFF] hover:bg-[#EFEAFB]/60 border border-[rgba(91,60,196,0.14)] transition-colors flex flex-col justify-between gap-2 group"
                  >
                    <div>
                      <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-[#6A3FD0] font-semibold">
                        {srv.shortTitle}
                      </span>
                      <h3 className="mt-1 text-[16px] font-semibold text-[#17122B] group-hover:text-[#6A3FD0]">
                        {srv.title}
                      </h3>
                      <p className="mt-1 text-[13px] text-[#5B5675] line-clamp-2">
                        {srv.ringkasanSingkat}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#6A3FD0] pt-1">
                      <span>{isEn ? 'View service details' : 'Lihat detail layanan'}</span>
                      <ArrowRight size={13} />
                    </span>
                  </Link>
                );
              })}
            </div>
          </Card>

          <Card variant="soft" padding="lg" className="lg:col-span-5 space-y-4">
            <Tag>
              {isEn
                ? 'LOCAL SERVICE AREAS · TANGSEL & JAKARTA'
                : 'AREA LAYANAN LOKAL · TANGSEL & JAKARTA'}
            </Tag>
            <h2 className="text-[20px] md:text-[22px]">
              {isEn
                ? 'Local consultation coverage'
                : 'Cakupan konsultasi lokal kami'}
            </h2>
            <p className="text-[14px] text-[#5B5675] leading-[1.65]">
              {isEn
                ? 'We serve businesses in BSD City, South Tangerang, Pamulang, Jurang Mangu, and Lebak Bulus online or in person by appointment.'
                : 'Kami melayani bisnis di BSD City, Tangerang Selatan, Pamulang, Jurang Mangu, dan Lebak Bulus secara online maupun tatap muka sesuai kesepakatan.'}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {relatedAreas.map((area) => {
                const primaryService = cluster.relatedServiceSlugs[0] || 'pembuatan-website';
                const indexableService =
                  primaryService === 'ai-agent' ? 'ai-agent' : 'pembuatan-website';
                const areaHref = getServiceAreaPath(
                  indexableService,
                  area.slug,
                  locale
                );
                const areaLabel = isEn ? area.nameEn : area.name;
                return (
                  <Link
                    key={area.slug}
                    to={areaHref}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#FFFFFF] hover:bg-[#6A3FD0] text-[#17122B] hover:text-[#FFFFFF] border border-[rgba(91,60,196,0.16)] font-mono text-[11px] transition-colors"
                  >
                    <MapPin size={12} />
                    <span>{areaLabel}</span>
                  </Link>
                );
              })}
              <Link
                to={isEn ? '/en/areas' : '/id/area'}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#EFEAFB] hover:bg-[#6A3FD0] text-[#6A3FD0] hover:text-[#FFFFFF] font-mono text-[11px] font-semibold transition-colors"
              >
                <BookOpen size={12} />
                <span>{isEn ? 'All Service Areas' : 'Semua Area Layanan'}</span>
              </Link>
            </div>
          </Card>
        </section>

        <CTABlock
          eyebrow={
            isEn
              ? 'DIRECT CONSULTATION WITH CO-FOUNDERS'
              : 'DISKUSI LANGSUNG BERSAMA CO-FOUNDER'
          }
          title={
            isEn
              ? `Want to apply ${clusterShortLabel} in your business?`
              : `Ingin menerapkan strategi ${clusterShortLabel} di bisnismu?`
          }
          description={
            isEn
              ? 'Start with a free 30-minute workflow and technical audit via WhatsApp with Chesta Azka & Zeeshan. Websites start at IDR 1,200,000.'
              : 'Mulai dari audit alur kerja dan teknis gratis 30 menit via WhatsApp bersama Chesta Azka & Zeeshan. Website mulai Rp1.200.000.'
          }
          whatsappMessage={
            isEn
              ? `Hi Chesta & Zeeshan, I explored the "${clusterTitle}" topic hub on chestaa.com and would like to consult for my business.`
              : `Halo Chesta & Zeeshan, saya membaca klaster topik "${clusterTitle}" di chestaa.com dan ingin berkonsultasi untuk bisnis saya.`
          }
        />
      </Container>
    </div>
  );
}
