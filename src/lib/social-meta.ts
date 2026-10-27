import {
  getBlogPostBySlug,
  getPublishedBlogPosts,
  getBlogCategoryBySlug,
  getBlogPostsByCategorySlug,
  getBlogPostsByCluster,
  getBlogPaginationSlice,
  getAuthorProfile,
  renderBlogPostHtml,
} from '../data/blog-posts';
import {
  getTopicClusterById,
  getClusterHubPath,
  TOPIC_CLUSTERS,
} from '../data/clusters';
import {
  getAllServices,
  getServiceBySlug,
  getServicePath,
  getServiceAreaPath,
} from '../data/services';
import {
  getServiceAreaPage,
  getServiceAreasByServiceSlug,
  getIndexableAreas,
} from '../data/service-areas';
import { getProjectBySlug, getPublishedProjects } from '../data/projects';
import { getCaseStudyBySlug, getPublishedCaseStudies } from '../data/case-studies';
import { HOME_FAQS, ROUTES_SEO_MAP, SITE_METADATA } from '../data/seo-metadata';
import { SITE_IMAGES } from '../config/images';
import { SITE_URL } from '../utils/sitemapGenerator';
import { buildFaqSchemaNode } from './seo/faqSchema';
import {
  getHreflangAlternates,
  LocaleCode,
  parseLocalizedPath,
  toLocalizedHref,
} from './i18n';
import {
  ENGLISH_HOME_FAQS,
  ENGLISH_ROUTES_SEO,
  INDONESIAN_ROUTES_SEO,
  getLocalizedService,
  getLocalizedServiceAreaPage,
} from './i18n-content';

export interface RouteMeta {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  url: string;
  type: 'website' | 'article';
  locale?: LocaleCode;
  publishedTime?: string;
  modifiedTime?: string;
  authorName?: string;
  authorUrl?: string;
  articleSection?: string;
  articleTags?: string[];
  preloadImage?: string;
  prevUrl?: string;
  nextUrl?: string;
  noindex?: boolean;
  robotsContent?: string;
  alternates?: {
    idUrl: string;
    enUrl: string;
    xDefaultUrl: string;
  };
  jsonLd: object;
}

/**
 * Validates that service and area page titles are 50–62 characters
 * and meta descriptions are 140–160 characters. Throws if out of range.
 */
export function validatePageMetaLengths(
  title: string,
  description: string,
  routeLabel: string
): { titleLength: number; descriptionLength: number } {
  const titleLen = title.length;
  const descLen = description.length;
  if (titleLen < 50 || titleLen > 62) {
    throw new Error(
      `[SEO Meta Validation Error] Title for "${routeLabel}" is ${titleLen} chars (must be 50–62): "${title}"`
    );
  }
  if (descLen < 140 || descLen > 160) {
    throw new Error(
      `[SEO Meta Validation Error] Description for "${routeLabel}" is ${descLen} chars (must be 140–160): "${description}"`
    );
  }
  return { titleLength: titleLen, descriptionLength: descLen };
}

function escapeHtmlAttr(str: string): string {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function normalizePathname(rawUrl: string): string {
  let pathname = rawUrl || '/id';
  try {
    const parsed = new URL(
      SITE_URL + (rawUrl.startsWith('/') ? rawUrl : '/' + rawUrl)
    );
    pathname = parsed.pathname;
  } catch {
    pathname = rawUrl.split('?')[0] || '/id';
  }
  if (pathname.length > 1 && pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1);
  }
  return pathname || '/id';
}

function toCanonicalUrl(rawPathname: string): string {
  return getHreflangAlternates(rawPathname, SITE_URL).canonicalUrl;
}

function toAbsoluteImageUrl(imgPath: string): string {
  if (!imgPath) {
    return `${SITE_URL}${SITE_IMAGES.ogDefault.src}`;
  }
  if (imgPath.startsWith('http://') || imgPath.startsWith('https://')) {
    return imgPath;
  }
  return `${SITE_URL}${imgPath.startsWith('/') ? imgPath : '/' + imgPath}`;
}

const ORG_AREA_SERVED_NODES = [
  { '@type': 'AdministrativeArea', name: 'Kota Tangerang Selatan' },
  { '@type': 'Place', name: 'BSD City' },
  { '@type': 'AdministrativeArea', name: 'Pamulang' },
  { '@type': 'AdministrativeArea', name: 'Jurang Mangu' },
  { '@type': 'AdministrativeArea', name: 'Lebak Bulus' },
  { '@type': 'AdministrativeArea', name: 'Jakarta Selatan' },
];

export function buildStructuredDataGraph(rawPathname: string): object {
  const { locale, barePath } = parseLocalizedPath(rawPathname);
  const pathname = barePath;
  const inLang = locale === 'en' ? 'en' : 'id';
  const canonicalUrl = toCanonicalUrl(rawPathname);
  const allProjects = getPublishedProjects(locale);
  const allCaseStudies = getPublishedCaseStudies(locale);

  // 1. Organization + ProfessionalService (#org) — NO street address, NO geo
  const orgNode = {
    '@type': ['Organization', 'ProfessionalService'],
    '@id': `${SITE_URL}/#org`,
    name: 'CHESTAADOTCOM',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/favicon.svg`,
    },
    email: 'chestaadotcom@gmail.com',
    telephone: '+62-821-2544-7232',
    sameAs: ['https://instagram.com/chestaadotcom'],
    founder: [
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#founder-chesta-azka`,
        name: 'Chesta Azka',
        jobTitle:
          locale === 'en'
            ? 'Co-founder (architecture, product, technology)'
            : 'Co-founder (arsitektur, produk, teknologi)',
        description:
          locale === 'en'
            ? 'Co-founder of CHESTAADOTCOM (architecture, product, technology). Writing code since 2021 with experience building real operational systems.'
            : 'Co-founder CHESTAADOTCOM (arsitektur, produk, teknologi). Menulis kode sejak 2021 dan berpengalaman membangun sistem operasional nyata.',
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#founder-zeeshan`,
        name: 'Zeeshan',
        jobTitle:
          locale === 'en'
            ? 'Co-founder (operations and client success)'
            : 'Co-founder (operasional dan client success)',
        description:
          locale === 'en'
            ? 'Co-founder of CHESTAADOTCOM (operations and client success). Leading communication, workflow planning, and client success.'
            : 'Co-founder CHESTAADOTCOM (operasional dan client success). Memimpin komunikasi, alur kerja, dan kepuasan klien.',
      },
    ],
    areaServed: ORG_AREA_SERVED_NODES,
  };

  // 2. WebSite (#website)
  const websiteNode = {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'CHESTAADOTCOM',
    publisher: { '@id': `${SITE_URL}/#org` },
    inLanguage: ['id', 'en'],
  };

  let pageName =
    locale === 'en'
      ? ENGLISH_ROUTES_SEO[pathname]?.title || ENGLISH_ROUTES_SEO['/'].title
      : INDONESIAN_ROUTES_SEO[pathname]?.title || SITE_METADATA.defaultTitle;
  let pageDesc =
    locale === 'en'
      ? ENGLISH_ROUTES_SEO[pathname]?.description || ENGLISH_ROUTES_SEO['/'].description
      : INDONESIAN_ROUTES_SEO[pathname]?.description || SITE_METADATA.defaultDescription;
  let pageModified = '2026-03-20';
  let hasServiceTarget = false;
  let primaryImageNode: Record<string, any> | undefined;

  const extraNodes: any[] = [];

  // Breadcrumb base
  const homeLabel = locale === 'en' ? 'Home' : 'Beranda';
  const homeItemUrl = locale === 'en' ? `${SITE_URL}/en` : `${SITE_URL}/id`;
  const servicesLabel = locale === 'en' ? 'Services' : 'Layanan';
  const servicesItemUrl = locale === 'en' ? `${SITE_URL}/en#layanan` : `${SITE_URL}/id#layanan`;

  const breadcrumbItems: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }> = [{ '@type': 'ListItem', position: 1, name: homeLabel, item: homeItemUrl }];

  // Route-specific nodes
  const areaMatch = pathname.match(/^\/(jasa|layanan|services)\/([^/]+)\/([^/]+)$/i);
  if (areaMatch) {
    const service = getLocalizedService(areaMatch[2], locale);
    const areaPage = service
      ? getLocalizedServiceAreaPage(service.slug, areaMatch[3].toLowerCase(), locale)
      : undefined;

    if (service && areaPage) {
      pageName = areaPage.metaTitle;
      pageDesc = areaPage.metaDescription;
      pageModified = areaPage.updatedAt || '2026-03-20';
      hasServiceTarget = true;

      const parentServiceUrl = `${SITE_URL}${getServicePath(service.slug, locale)}`;
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: servicesLabel,
        item: servicesItemUrl,
      });
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 3,
        name: service.title,
        item: parentServiceUrl,
      });
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 4,
        name: areaPage.areaName,
        item: canonicalUrl,
      });

      const isWebsiteService = service.slug === 'pembuatan-website';
      const serviceNode: Record<string, any> = {
        '@type': 'Service',
        '@id': `${canonicalUrl}#service`,
        name: areaPage.h1,
        serviceType: service.shortTitle,
        description: areaPage.quickSummary,
        url: canonicalUrl,
        provider: { '@id': `${SITE_URL}/#org` },
        areaServed: {
          '@type': areaPage.areaSlug === 'bsd-city' ? 'Place' : 'AdministrativeArea',
          name: areaPage.areaName,
        },
      };

      if (isWebsiteService) {
        serviceNode.offers = {
          '@type': 'Offer',
          priceCurrency: 'IDR',
          price: '1200000',
          url: canonicalUrl,
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'IDR',
            minPrice: '1200000',
            description:
              locale === 'en'
                ? 'Starting from IDR 1,200,000 for a landing page, depending on complexity.'
                : 'Mulai Rp1.200.000 untuk landing page, tergantung kompleksitas.',
          },
        };
      }

      extraNodes.push(serviceNode);

      const faqNode = buildFaqSchemaNode(areaPage.faqs, `${canonicalUrl}#faq`);
      if (faqNode) {
        extraNodes.push(faqNode);
      }
    }
  } else if (
    pathname.startsWith('/jasa/') ||
    pathname.startsWith('/layanan/') ||
    pathname.startsWith('/services/')
  ) {
    const slug = pathname.replace(/^\/(jasa|layanan|services)\//, '').trim();
    const service = getLocalizedService(slug, locale);
    if (service) {
      pageName = service.seo.title;
      pageDesc = service.seo.description;
      pageModified = '2026-03-20';
      hasServiceTarget = true;

      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: servicesLabel,
        item: servicesItemUrl,
      });
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 3,
        name: service.title,
        item: canonicalUrl,
      });

      const isWebsiteService = service.slug === 'pembuatan-website';
      const serviceNode: Record<string, any> = {
        '@type': 'Service',
        '@id': `${canonicalUrl}#service`,
        name: service.title,
        serviceType: service.shortTitle,
        description: service.summary,
        url: canonicalUrl,
        provider: { '@id': `${SITE_URL}/#org` },
        areaServed: ORG_AREA_SERVED_NODES,
      };

      if (isWebsiteService) {
        serviceNode.offers = {
          '@type': 'Offer',
          priceCurrency: 'IDR',
          price: '1200000',
          url: canonicalUrl,
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'IDR',
            minPrice: '1200000',
            description:
              locale === 'en'
                ? 'Starting from IDR 1,200,000 for a landing page, depending on complexity.'
                : 'Mulai Rp1.200.000 untuk landing page, tergantung kompleksitas.',
          },
        };
      }

      extraNodes.push(serviceNode);

      const faqNode = buildFaqSchemaNode(service.faq, `${canonicalUrl}#faq`);
      if (faqNode) {
        extraNodes.push(faqNode);
      }
    }
  } else if (pathname === '/area') {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: locale === 'en' ? 'Areas' : 'Area',
      item: canonicalUrl,
    });
  } else if (pathname === '/portfolio') {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: locale === 'en' ? 'Internal Projects' : 'Proyek Internal',
      item: canonicalUrl,
    });
    extraNodes.push({
      '@type': 'CollectionPage',
      '@id': `${canonicalUrl}#collection`,
      url: canonicalUrl,
      name: pageName,
      description: pageDesc,
      inLanguage: inLang,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: allProjects.map((proj, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          url: `${SITE_URL}/${locale}/portfolio/${proj.slug}`,
          name: `${proj.title} (${proj.internalBadgeLabel})`,
          description: proj.oneLiner,
        })),
      },
    });
  } else if (pathname.startsWith('/portfolio/')) {
    const slug = pathname.replace('/portfolio/', '').trim();
    const project = getProjectBySlug(slug, locale);
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: locale === 'en' ? 'Internal Projects' : 'Proyek Internal',
      item: `${SITE_URL}/${locale}/portfolio`,
    });
    if (project) {
      pageName = project.seo.title;
      pageDesc = project.seo.description;
      pageModified = project.updatedAt;
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 3,
        name: project.title,
        item: canonicalUrl,
      });
      const coverAsset =
        SITE_IMAGES[project.cover as keyof typeof SITE_IMAGES] || SITE_IMAGES.ogDefault;
      extraNodes.push({
        '@type': 'CreativeWork',
        '@id': `${canonicalUrl}#work`,
        name: `${project.title} (${project.internalBadgeLabel})`,
        headline: project.title,
        description: project.oneLiner,
        url: canonicalUrl,
        image: toAbsoluteImageUrl(coverAsset.src),
        dateCreated: project.year,
        dateModified: project.updatedAt,
        inLanguage: inLang,
        genre: project.categoryLabel,
        creator: { '@id': `${SITE_URL}/#org` },
      });
    }
  } else if (pathname === '/case-studies') {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: locale === 'en' ? 'Case Studies' : 'Studi Kasus',
      item: canonicalUrl,
    });
    extraNodes.push({
      '@type': 'CollectionPage',
      '@id': `${canonicalUrl}#collection`,
      url: canonicalUrl,
      name: pageName,
      description: pageDesc,
      inLanguage: inLang,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: allCaseStudies.map((cs, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          url: `${SITE_URL}${locale === 'en' ? `/en/case-studies/${cs.slug}` : `/id/studi-kasus/${cs.slug}`}`,
          name: cs.title,
          description: `${cs.summary.problem} ${cs.summary.built}`,
        })),
      },
    });
  } else if (pathname.startsWith('/case-studies/')) {
    const slug = pathname.replace('/case-studies/', '').trim();
    const study = getCaseStudyBySlug(slug, locale);
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: locale === 'en' ? 'Case Studies' : 'Studi Kasus',
      item: `${SITE_URL}${locale === 'en' ? '/en/case-studies' : '/id/studi-kasus'}`,
    });
    if (study) {
      pageName = study.seo.title;
      pageDesc = study.seo.description;
      pageModified = study.updatedAt;
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 3,
        name: study.title,
        item: canonicalUrl,
      });
      const coverAsset =
        SITE_IMAGES[study.cover as keyof typeof SITE_IMAGES] || SITE_IMAGES.ogDefault;
      extraNodes.push({
        '@type': 'Article',
        '@id': `${canonicalUrl}#article`,
        headline: study.title,
        description: study.seo.description,
        url: canonicalUrl,
        image: toAbsoluteImageUrl(coverAsset.src),
        datePublished: study.publishedAt,
        dateModified: study.updatedAt,
        inLanguage: inLang,
        mainEntityOfPage: { '@id': `${canonicalUrl}#webpage` },
        author: {
          '@type': 'Person',
          '@id':
            study.author === 'Zeeshan'
              ? `${SITE_URL}/#founder-zeeshan`
              : `${SITE_URL}/#founder-chesta-azka`,
          name: study.author,
          jobTitle: study.authorRole,
        },
        publisher: { '@id': `${SITE_URL}/#org` },
      });
    }
  } else if (
    pathname === '/blog' ||
    pathname.startsWith('/blog/halaman/') ||
    pathname.startsWith('/blog/kategori/')
  ) {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: 'Blog',
      item: `${SITE_URL}/${locale}/blog`,
    });

    if (pathname.startsWith('/blog/kategori/')) {
      const catSlug = pathname.replace('/blog/kategori/', '').trim();
      const catMeta = catSlug ? getBlogCategoryBySlug(catSlug, locale) : undefined;
      if (catMeta) {
        breadcrumbItems.push({
          '@type': 'ListItem',
          position: 3,
          name: catMeta.shortLabel,
          item: canonicalUrl,
        });
      }
    } else {
      const rawPage = pathname.startsWith('/blog/halaman/')
        ? parseInt(pathname.slice('/blog/halaman/'.length).trim(), 10) || 1
        : 1;
      const slice = getBlogPaginationSlice(locale, rawPage);
      pageModified = slice.pagePosts.reduce(
        (max, p) => (p.updatedAt > max ? p.updatedAt : max),
        '2026-10-25'
      );

      if (slice.currentPage > 1) {
        pageName =
          locale === 'en'
            ? `Blog — Page ${slice.currentPage} | CHESTAADOTCOM`
            : `Blog — Halaman ${slice.currentPage} | CHESTAADOTCOM`;
        breadcrumbItems.push({
          '@type': 'ListItem',
          position: 3,
          name:
            locale === 'en'
              ? `Page ${slice.currentPage}`
              : `Halaman ${slice.currentPage}`,
          item: canonicalUrl,
        });
      } else {
        pageName =
          locale === 'en'
            ? 'Blog — Notes on AI Agents, Websites & Automation | CHESTAADOTCOM'
            : 'Blog — Catatan AI Agent, Website & Otomasi Bisnis | CHESTAADOTCOM';
        pageDesc =
          locale === 'en'
            ? 'Notes on AI agents, websites, and automation for businesses in South Tangerang and Greater Jakarta by Chesta Azka and Zeeshan.'
            : 'Catatan tentang AI agent, website, dan otomasi untuk bisnis di Tangerang Selatan dan Jabodetabek dari Chesta Azka dan Zeeshan.';
      }

      extraNodes.push({
        '@type': 'CollectionPage',
        '@id': `${canonicalUrl}#collection`,
        name: pageName,
        description: pageDesc,
        url: canonicalUrl,
        inLanguage: inLang,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        mainEntity: { '@id': `${canonicalUrl}#itemlist` },
      });
      extraNodes.push({
        '@type': 'ItemList',
        '@id': `${canonicalUrl}#itemlist`,
        name: pageName,
        numberOfItems: slice.pagePosts.length,
        itemListElement: slice.pagePosts.map((post, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: post.title,
          url: `${SITE_URL}/${locale}/blog/${post.slug}`,
        })),
      });
    }
  } else if (pathname.startsWith('/blog/topik/') || pathname.startsWith('/blog/topic/')) {
    const clusterSlug = pathname
      .replace(/^\/blog\/(topik|topic)\//, '')
      .trim();
    const cluster = getTopicClusterById(clusterSlug);
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: 'Blog',
      item: `${SITE_URL}/${locale}/blog`,
    });
    if (cluster) {
      const clusterTitle = locale === 'en' ? cluster.titleEn : cluster.titleId;
      const clusterShort = locale === 'en' ? cluster.shortLabelEn : cluster.shortLabelId;
      const clusterPosts = getBlogPostsByCluster(cluster.id, locale);
      pageName = locale === 'en' ? cluster.seoTitleEn : cluster.seoTitleId;
      pageDesc = locale === 'en' ? cluster.metaDescriptionEn : cluster.metaDescriptionId;
      pageModified = clusterPosts.reduce(
        (max, p) => (p.updatedAt > max ? p.updatedAt : max),
        '2026-10-23'
      );
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 3,
        name: clusterShort,
        item: canonicalUrl,
      });
      extraNodes.push({
        '@type': 'CollectionPage',
        '@id': `${canonicalUrl}#collection`,
        name: clusterTitle,
        description: locale === 'en' ? cluster.introEn : cluster.introId,
        url: canonicalUrl,
        inLanguage: inLang,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        mainEntity: { '@id': `${canonicalUrl}#itemlist` },
      });
      extraNodes.push({
        '@type': 'ItemList',
        '@id': `${canonicalUrl}#itemlist`,
        name: clusterTitle,
        numberOfItems: clusterPosts.length,
        itemListElement: clusterPosts.map((post, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: post.title,
          url: `${SITE_URL}/${locale}/blog/${post.slug}`,
        })),
      });
    }
  } else if (pathname.startsWith('/blog/')) {
    const slug = pathname.replace('/blog/', '').trim();
    const post = getBlogPostBySlug(slug, locale);
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: 'Blog',
      item: `${SITE_URL}/${locale}/blog`,
    });
    if (post) {
      const postLocale = post.locale || locale;
      const authorProfile = getAuthorProfile(post.author, postLocale);
      const cluster = getTopicClusterById(post.clusterId);
      const clusterShort = cluster
        ? postLocale === 'en'
          ? cluster.shortLabelEn
          : cluster.shortLabelId
        : post.category;
      const clusterUrl = `${SITE_URL}${getClusterHubPath(post.clusterId, postLocale)}`;
      const teamUrl =
        postLocale === 'en'
          ? `${SITE_URL}/en/about#team`
          : `${SITE_URL}/id/tentang#tim`;
      pageName = post.seoTitle || post.title;
      pageDesc = post.metaDescription || post.excerpt;
      pageModified = post.updatedAt || post.date;
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 3,
        name: clusterShort,
        item: clusterUrl,
      });
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 4,
        name: post.title,
        item: canonicalUrl,
      });
      primaryImageNode = {
        '@type': 'ImageObject',
        '@id': `${canonicalUrl}#primaryimage`,
        url: toAbsoluteImageUrl(post.coverImage),
        width: 1600,
        height: 900,
        caption: post.coverAlt,
      };
      extraNodes.push({
        '@type': 'BlogPosting',
        '@id': `${canonicalUrl}#article`,
        headline: post.title,
        description: post.metaDescription,
        url: canonicalUrl,
        inLanguage: postLocale === 'en' ? 'en' : 'id',
        wordCount: post.wordCount,
        mainEntityOfPage: { '@id': `${canonicalUrl}#webpage` },
        image: [
          {
            '@type': 'ImageObject',
            url: toAbsoluteImageUrl(post.coverImage),
            width: 1600,
            height: 900,
            caption: post.coverAlt,
          },
          {
            '@type': 'ImageObject',
            url: toAbsoluteImageUrl(post.ogImage),
            width: 1200,
            height: 630,
            caption: post.coverAlt,
          },
        ],
        author: {
          '@type': 'Person',
          name: authorProfile.name,
          jobTitle: authorProfile.role,
          url: teamUrl,
        },
        publisher: { '@id': `${SITE_URL}/#org` },
        datePublished: post.date,
        dateModified: post.updatedAt || post.date,
        articleSection: post.category,
        keywords: post.tags.join(', '),
      });
      const faqNode = buildFaqSchemaNode(post.faq, `${canonicalUrl}#faq`);
      if (faqNode) {
        extraNodes.push(faqNode);
      }
    }
  } else if (pathname === '/' || pathname === '') {
    const faqs = locale === 'en' ? ENGLISH_HOME_FAQS : HOME_FAQS;
    const homeFaqNode = buildFaqSchemaNode(faqs, `${canonicalUrl}#faq`);
    if (homeFaqNode) {
      extraNodes.push(homeFaqNode);
    }
  } else if (pathname === '/audit-gratis') {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: locale === 'en' ? 'Free 30-Minute Audit' : 'Audit Gratis 30 Menit',
      item: canonicalUrl,
    });
    const auditFaqs =
      locale === 'en'
        ? [
            {
              question: 'Is this 30-minute audit really free with no hidden commitment?',
              answer:
                'Yes, 100% free. We use this 30-minute session to understand your operational bottleneck and give you an honest assessment. You are under no obligation to hire us afterward.',
            },
            {
              question: 'Who will I be speaking with during the audit session?',
              answer:
                'You speak directly with our co-founders and engineers, Chesta Azka or Zeeshan—not a sales representative reading from a script.',
            },
          ]
        : [
            {
              question: 'Apakah audit 30 menit ini benar-benar gratis tanpa ikatan?',
              answer:
                'Ya, 100% gratis. Sesi 30 menit ini kami gunakan untuk membedah alur kerjamu secara jujur. Kamu tidak punya kewajiban apa pun untuk lanjut membayar proyek setelah sesi selesai.',
            },
            {
              question: 'Siapa yang akan berdiskusi langsung dengan saya?',
              answer:
                'Kamu akan langsung berdiskusi dengan co-founder sekaligus engineer kami, Chesta Azka atau Zeeshan—bukan tim sales yang hanya membaca skrip penawaran.',
            },
          ];
    const auditFaqNode = buildFaqSchemaNode(auditFaqs, `${canonicalUrl}#faq`);
    if (auditFaqNode) {
      extraNodes.push(auditFaqNode);
    }
  } else if (pathname === '/about') {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: locale === 'en' ? 'About Us' : 'Tentang Kami',
      item: canonicalUrl,
    });
    extraNodes.push({
      '@type': 'AboutPage',
      '@id': `${canonicalUrl}#about`,
      name: pageName,
      description: pageDesc,
      url: canonicalUrl,
      inLanguage: inLang,
      mainEntity: { '@id': `${SITE_URL}/#org` },
    });
  } else if (pathname === '/privasi') {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: locale === 'en' ? 'Privacy Policy' : 'Kebijakan Privasi',
      item: canonicalUrl,
    });
  } else {
    const segName = pathname.slice(1).replace(/-/g, ' ');
    const formatted = segName.charAt(0).toUpperCase() + segName.slice(1);
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: formatted,
      item: canonicalUrl,
    });
  }

  // 3. WebPage (#webpage)
  const webPageNode: Record<string, any> = {
    '@type': 'WebPage',
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: pageName,
    description: pageDesc,
    inLanguage: inLang,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    ...(hasServiceTarget ? { about: { '@id': `${canonicalUrl}#service` } } : {}),
    ...(primaryImageNode ? { primaryImageOfPage: primaryImageNode } : {}),
    breadcrumb: { '@id': `${canonicalUrl}#breadcrumb` },
    dateModified: pageModified,
  };

  // 4. BreadcrumbList (#breadcrumb)
  const breadcrumbNode = {
    '@type': 'BreadcrumbList',
    '@id': `${canonicalUrl}#breadcrumb`,
    itemListElement: breadcrumbItems,
  };

  const graph: any[] = [
    orgNode,
    websiteNode,
    webPageNode,
    breadcrumbNode,
    ...extraNodes,
  ];

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

export function getMetaTagsForUrl(rawUrl: string): RouteMeta {
  const normalizedRaw = normalizePathname(rawUrl);
  const { locale, barePath } = parseLocalizedPath(normalizedRaw);
  const pathname = barePath;
  const canonicalUrl = toCanonicalUrl(normalizedRaw);
  const structuredData = buildStructuredDataGraph(normalizedRaw);
  const alternates = getHreflangAlternates(normalizedRaw, SITE_URL);

  // 1A. Service Area Detail (/jasa/:serviceSlug/:areaSlug)
  const areaMatch = pathname.match(/^\/(jasa|layanan|services)\/([^/]+)\/([^/]+)$/i);
  if (areaMatch) {
    const service = getLocalizedService(areaMatch[2], locale);
    const areaPage = service
      ? getLocalizedServiceAreaPage(service.slug, areaMatch[3].toLowerCase(), locale)
      : undefined;
    if (service && areaPage) {
      if (areaPage.indexable) {
        validatePageMetaLengths(
          areaPage.metaTitle,
          areaPage.metaDescription,
          `${locale}:${areaPage.serviceSlug}/${areaPage.areaSlug}`
        );
      }
      const imgAsset =
        SITE_IMAGES[areaPage.ogImageKey as keyof typeof SITE_IMAGES] ||
        SITE_IMAGES[service.imageKey as keyof typeof SITE_IMAGES] ||
        SITE_IMAGES.ogDefault;
      const imageAlt =
        locale === 'en' && imgAsset.altEn ? imgAsset.altEn : imgAsset.alt;
      return {
        title: areaPage.metaTitle,
        description: areaPage.metaDescription,
        image: toAbsoluteImageUrl(imgAsset.src),
        imageAlt,
        url: canonicalUrl,
        type: 'website',
        locale,
        modifiedTime: areaPage.updatedAt,
        noindex: !areaPage.indexable,
        robotsContent: areaPage.indexable ? 'index,follow' : 'noindex,follow',
        alternates,
        jsonLd: structuredData,
      };
    }
  }

  // 1B. Service Detail (/jasa/:slug)
  if (
    pathname.startsWith('/jasa/') ||
    pathname.startsWith('/layanan/') ||
    pathname.startsWith('/services/')
  ) {
    const slug = pathname.replace(/^\/(jasa|layanan|services)\//, '').trim();
    const service = getLocalizedService(slug, locale);
    if (service) {
      validatePageMetaLengths(
        service.seo.title,
        service.seo.description,
        `${locale}:service/${service.slug}`
      );
      const imgAsset =
        SITE_IMAGES[service.imageKey as keyof typeof SITE_IMAGES] || SITE_IMAGES.ogDefault;
      const imageAlt =
        locale === 'en' && imgAsset.altEn ? imgAsset.altEn : imgAsset.alt;
      return {
        title: service.seo.title,
        description: service.seo.description,
        image: toAbsoluteImageUrl(imgAsset.src),
        imageAlt,
        url: canonicalUrl,
        type: 'website',
        locale,
        robotsContent: 'index,follow',
        alternates,
        jsonLd: structuredData,
      };
    }
  }

  // 2. Portfolio Project Detail (/portfolio/:slug)
  if (pathname.startsWith('/portfolio/')) {
    const slug = pathname.replace('/portfolio/', '').trim();
    const project = getProjectBySlug(slug, locale);
    if (project) {
      const imgAsset =
        SITE_IMAGES[project.cover as keyof typeof SITE_IMAGES] || SITE_IMAGES.ogDefault;
      const imageAlt =
        locale === 'en' && imgAsset.altEn ? imgAsset.altEn : imgAsset.alt;
      return {
        title: project.seo.title,
        description: project.seo.description,
        image: toAbsoluteImageUrl(imgAsset.src),
        imageAlt,
        url: canonicalUrl,
        type: 'website',
        locale,
        modifiedTime: project.updatedAt,
        robotsContent: 'index,follow',
        alternates,
        jsonLd: structuredData,
      };
    }
  }

  // 2B. Case Study Detail (/case-studies/:slug)
  if (pathname.startsWith('/case-studies/')) {
    const slug = pathname.replace('/case-studies/', '').trim();
    const study = getCaseStudyBySlug(slug, locale);
    if (study) {
      validatePageMetaLengths(
        study.seo.title,
        study.seo.description,
        `${locale}:case-study/${study.slug}`
      );
      const imgAsset =
        SITE_IMAGES[study.cover as keyof typeof SITE_IMAGES] || SITE_IMAGES.ogDefault;
      const imageAlt =
        locale === 'en' && imgAsset.altEn ? imgAsset.altEn : imgAsset.alt;
      return {
        title: study.seo.title,
        description: study.seo.description,
        image: toAbsoluteImageUrl(imgAsset.src),
        imageAlt,
        url: canonicalUrl,
        type: 'article',
        locale,
        publishedTime: study.publishedAt,
        modifiedTime: study.updatedAt,
        authorName: study.author,
        robotsContent: 'index,follow',
        alternates,
        jsonLd: structuredData,
      };
    }
  }

  // 3A. Blog Category (/blog/kategori/:category)
  if (pathname.startsWith('/blog/kategori/')) {
    const catSlug = pathname.replace('/blog/kategori/', '').trim();
    const catMeta = getBlogCategoryBySlug(catSlug, locale);
    if (catMeta) {
      return {
        title:
          locale === 'en'
            ? `${catMeta.shortLabel} Articles — Notes | CHESTAADOTCOM`
            : `Artikel ${catMeta.shortLabel} — Catatan | CHESTAADOTCOM`,
        description: catMeta.description,
        image: toAbsoluteImageUrl(SITE_IMAGES.ogDefault.src),
        imageAlt:
          locale === 'en' && SITE_IMAGES.ogDefault.altEn
            ? SITE_IMAGES.ogDefault.altEn
            : SITE_IMAGES.ogDefault.alt,
        url: canonicalUrl,
        type: 'website',
        locale,
        robotsContent: 'index,follow',
        alternates,
        jsonLd: structuredData,
      };
    }
  }

  // 3A-Cluster. Blog Topic Cluster (/blog/topik/:cluster or /blog/topic/:cluster)
  if (pathname.startsWith('/blog/topik/') || pathname.startsWith('/blog/topic/')) {
    const clusterSlug = pathname
      .replace(/^\/blog\/(topik|topic)\//, '')
      .trim();
    const cluster = getTopicClusterById(clusterSlug);
    if (cluster) {
      const imgAsset =
        SITE_IMAGES[cluster.coverImageKey as keyof typeof SITE_IMAGES] ||
        SITE_IMAGES.ogDefault;
      const imageAlt =
        locale === 'en' && imgAsset.altEn ? imgAsset.altEn : imgAsset.alt;
      return {
        title: locale === 'en' ? cluster.seoTitleEn : cluster.seoTitleId,
        description:
          locale === 'en' ? cluster.metaDescriptionEn : cluster.metaDescriptionId,
        image: toAbsoluteImageUrl(imgAsset.src),
        imageAlt,
        url: canonicalUrl,
        type: 'website',
        locale,
        robotsContent: 'index,follow',
        alternates,
        jsonLd: structuredData,
      };
    }
  }

  // 3A-Index. Blog Index & Paginated Index (/blog, /blog/halaman/:n, /blog/page/:n)
  if (pathname === '/blog' || pathname.startsWith('/blog/halaman/')) {
    const rawPage = pathname.startsWith('/blog/halaman/')
      ? parseInt(pathname.slice('/blog/halaman/'.length).trim(), 10) || 1
      : 1;
    const slice = getBlogPaginationSlice(locale, rawPage);
    const title =
      slice.currentPage > 1
        ? locale === 'en'
          ? `Blog — Page ${slice.currentPage} | CHESTAADOTCOM`
          : `Blog — Halaman ${slice.currentPage} | CHESTAADOTCOM`
        : locale === 'en'
          ? 'Blog — Notes on AI Agents, Websites & Automation | CHESTAADOTCOM'
          : 'Blog — Catatan AI Agent, Website & Otomasi Bisnis | CHESTAADOTCOM';
    const description =
      locale === 'en'
        ? 'Notes on AI agents, websites, and automation for businesses in South Tangerang and Greater Jakarta by Chesta Azka and Zeeshan.'
        : 'Catatan tentang AI agent, website, dan otomasi untuk bisnis di Tangerang Selatan dan Jabodetabek dari Chesta Azka dan Zeeshan.';
    const latestMod = slice.pagePosts.reduce(
      (max, p) => (p.updatedAt > max ? p.updatedAt : max),
      '2026-10-25'
    );

    return {
      title,
      description,
      image: toAbsoluteImageUrl(SITE_IMAGES.ogDefault.src),
      imageAlt:
        locale === 'en' && SITE_IMAGES.ogDefault.altEn
          ? SITE_IMAGES.ogDefault.altEn
          : SITE_IMAGES.ogDefault.alt,
      preloadImage: slice.featuredPost?.coverImage,
      prevUrl: slice.prevPath ? `${SITE_URL}${slice.prevPath}` : undefined,
      nextUrl: slice.nextPath ? `${SITE_URL}${slice.nextPath}` : undefined,
      url: `${SITE_URL}${slice.canonicalPath}`,
      type: 'website',
      locale,
      modifiedTime: latestMod,
      robotsContent: 'index,follow',
      alternates,
      jsonLd: structuredData,
    };
  }

  // 3B. Blog Post (/blog/:slug)
  if (pathname.startsWith('/blog/')) {
    const slug = pathname.replace('/blog/', '').trim();
    const post = getBlogPostBySlug(slug, locale);

    if (post) {
      const postLocale = post.locale || locale;
      const authorProfile = getAuthorProfile(post.author, postLocale);
      const teamUrl =
        postLocale === 'en'
          ? `${SITE_URL}/en/about#team`
          : `${SITE_URL}/id/tentang#tim`;
      return {
        title: post.seoTitle || `${post.title} | CHESTAADOTCOM`,
        description: post.metaDescription || post.excerpt,
        image: toAbsoluteImageUrl(post.ogImage),
        imageAlt: post.coverAlt,
        preloadImage: post.coverImage,
        url: canonicalUrl,
        type: 'article',
        locale: postLocale,
        publishedTime: post.date,
        modifiedTime: post.updatedAt || post.date,
        authorName: authorProfile.name,
        authorUrl: teamUrl,
        articleSection: post.category,
        articleTags: post.tags,
        robotsContent: 'index,follow',
        alternates,
        jsonLd: structuredData,
      };
    }
  }

  // 4. Known static routes (localized for EN or ID)
  const routeSeo =
    locale === 'en'
      ? ENGLISH_ROUTES_SEO[pathname] || ROUTES_SEO_MAP[pathname]
      : INDONESIAN_ROUTES_SEO[pathname] || ROUTES_SEO_MAP[pathname];
  if (routeSeo) {
    return {
      title: routeSeo.title,
      description: routeSeo.description,
      image: toAbsoluteImageUrl(SITE_IMAGES.ogDefault.src),
      imageAlt:
        locale === 'en' && SITE_IMAGES.ogDefault.altEn
          ? SITE_IMAGES.ogDefault.altEn
          : SITE_IMAGES.ogDefault.alt,
      url: canonicalUrl,
      type: 'website',
      locale,
      robotsContent: 'index,follow',
      alternates,
      jsonLd: structuredData,
    };
  }

  // 5. Fallback
  const fallbackSeo =
    locale === 'en'
      ? ENGLISH_ROUTES_SEO['/']
      : {
          title: SITE_METADATA.defaultTitle,
          description: SITE_METADATA.defaultDescription,
        };
  return {
    title: fallbackSeo.title,
    description: fallbackSeo.description,
    image: toAbsoluteImageUrl(SITE_IMAGES.ogDefault.src),
    imageAlt:
      locale === 'en' && SITE_IMAGES.ogDefault.altEn
        ? SITE_IMAGES.ogDefault.altEn
        : SITE_IMAGES.ogDefault.alt,
    url: canonicalUrl,
    type: 'website',
    locale,
    robotsContent: 'index,follow',
    alternates,
    jsonLd: structuredData,
  };
}

export function getPrerenderedBodyHtml(rawUrl: string): string {
  const normalizedRaw = normalizePathname(rawUrl);
  const { locale, prefixMode, barePath } = parseLocalizedPath(normalizedRaw);
  const pathname = barePath;
  const projects = getPublishedProjects(locale);
  const homeHref = toLocalizedHref('/', locale, prefixMode);

  // Areas Hub (/id/area or /en/areas)
  if (pathname === '/area') {
    const indexableAreas = getIndexableAreas();
    const areaBlocksHtml = indexableAreas
      .map((area) => {
        const displayName = locale === 'en' ? area.nameEn : area.name;
        const summary = locale === 'en' ? area.factsSummaryEn : area.factsSummaryId;
        const webHref = getServiceAreaPath('pembuatan-website', area.slug, locale);
        const aiHref = getServiceAreaPath('ai-agent', area.slug, locale);
        const webLabel =
          locale === 'en'
            ? `Website development in ${displayName}`
            : `Jasa pembuatan website di ${displayName}`;
        const aiLabel =
          locale === 'en'
            ? `AI agent services in ${displayName}`
            : `Jasa AI agent di ${displayName}`;
        return `<article class="mb-6 p-6 rounded-2xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)]">
          <h2 class="text-xl font-bold text-[#17122B]">${escapeHtmlAttr(displayName)}</h2>
          <p class="text-sm text-[#5B5675] mt-2">${escapeHtmlAttr(summary)}</p>
          <ul class="mt-3 space-y-1 text-sm text-[#6A3FD0]">
            <li><a href="${escapeHtmlAttr(webHref)}">${escapeHtmlAttr(webLabel)}</a></li>
            <li><a href="${escapeHtmlAttr(aiHref)}">${escapeHtmlAttr(aiLabel)}</a></li>
          </ul>
        </article>`;
      })
      .join('\n');

    return `
      <main class="bg-[#FFFFFF] text-[#17122B] min-h-screen">
        <section class="max-w-4xl mx-auto px-6 py-16">
          <h1 class="text-3xl sm:text-5xl font-bold">${
            locale === 'en'
              ? 'Service areas in South Tangerang and South Jakarta'
              : 'Area layanan di Tangerang Selatan dan Jakarta Selatan'
          }</h1>
          <p class="text-base text-[#5B5675] mt-4">${
            locale === 'en'
              ? 'CHESTAADOTCOM is based in BSD, South Tangerang and serves businesses across South Tangerang and Greater Jakarta online via WhatsApp and video call or in person by agreement.'
              : 'CHESTAADOTCOM berbasis di BSD, Tangerang Selatan dan melayani bisnis di Tangerang Selatan serta Jabodetabek secara online lewat WhatsApp dan video call maupun tatap muka sesuai kesepakatan.'
          }</p>
          <div class="mt-8">${areaBlocksHtml}</div>
        </section>
      </main>
    `;
  }

  // Service Area Detail (/jasa/:serviceSlug/:areaSlug)
  const areaMatch = pathname.match(/^\/(jasa|layanan|services)\/([^/]+)\/([^/]+)$/i);
  if (areaMatch) {
    const service = getLocalizedService(areaMatch[2], locale);
    const areaPage = service
      ? getLocalizedServiceAreaPage(service.slug, areaMatch[3].toLowerCase(), locale)
      : undefined;
    if (service && areaPage) {
      const contextHtml = areaPage.localContextParagraphs
        .map((p) => `<p class="text-base text-[#5B5675] mb-4">${escapeHtmlAttr(p)}</p>`)
        .join('\n');

      const mixHtml = areaPage.businessMixList
        .map((m) => `<li class="mb-2">${escapeHtmlAttr(m)}</li>`)
        .join('\n');

      const scenariosHtml = areaPage.scenarios
        .map(
          (sc) =>
            `<div class="mb-6 p-5 rounded-2xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)]">
              <span class="text-xs font-mono uppercase text-[#6A3FD0]">${escapeHtmlAttr(sc.label)}</span>
              <h3 class="text-lg font-bold text-[#17122B] mt-1">${escapeHtmlAttr(sc.title)}</h3>
              <p class="text-sm text-[#5B5675] mt-2">${escapeHtmlAttr(sc.challenge)}</p>
              <p class="text-sm text-[#5B5675] mt-2">${escapeHtmlAttr(sc.solution)}</p>
              <p class="text-sm text-[#6A3FD0] mt-2">${escapeHtmlAttr(sc.expectedOutcome)}</p>
            </div>`
        )
        .join('\n');

      const collabHtml = areaPage.collaborationParagraphs
        .map((p) => `<p class="text-base text-[#5B5675] mb-3">${escapeHtmlAttr(p)}</p>`)
        .join('\n');

      const processHtml = areaPage.processSteps
        .map(
          (step) =>
            `<li class="mb-2"><strong>${escapeHtmlAttr(step.stepNumber)}. ${escapeHtmlAttr(step.title)}:</strong> ${escapeHtmlAttr(step.sentence)}</li>`
        )
        .join('\n');

      const faqHtml = areaPage.faqs
        .map(
          (f) =>
            `<div class="mb-4 p-4 rounded-2xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)]">
              <h3 class="font-bold text-[#17122B]">${escapeHtmlAttr(f.question)}</h3>
              <p class="text-sm text-[#5B5675] mt-1">${escapeHtmlAttr(f.answer)}</p>
            </div>`
        )
        .join('\n');

      const siblingAreaLinks = getServiceAreasByServiceSlug(areaPage.serviceSlug, true, locale)
        .filter((p) => p.areaSlug !== areaPage.areaSlug)
        .map((p) => {
          const href = getServiceAreaPath(p.serviceSlug, p.areaSlug, locale);
          const label =
            locale === 'en'
              ? `${service.shortTitle} in ${p.areaName}`
              : `${service.shortTitle} di ${p.areaName}`;
          return `<li><a href="${escapeHtmlAttr(href)}">${escapeHtmlAttr(label)}</a></li>`;
        })
        .join('\n');

      const parentServiceHref = getServicePath(service.slug, locale);

      return `
        <main class="bg-[#FFFFFF] text-[#17122B] min-h-screen">
          <nav aria-label="Breadcrumb" class="max-w-4xl mx-auto px-6 pt-10 text-xs font-mono text-[#5B5675]">
            <a href="${escapeHtmlAttr(homeHref)}">${locale === 'en' ? 'Home' : 'Beranda'}</a> / <a href="${escapeHtmlAttr(parentServiceHref)}">${escapeHtmlAttr(
        service.title
      )}</a> / <span>${escapeHtmlAttr(areaPage.areaName)}</span>
          </nav>
          <article class="max-w-4xl mx-auto px-6 py-8">
            <span class="text-xs font-mono text-[#6A3FD0]">${escapeHtmlAttr(areaPage.eyebrow)}</span>
            <h1 class="text-3xl sm:text-5xl font-bold mt-2">${escapeHtmlAttr(areaPage.h1)}</h1>
            <div class="mt-4 p-5 rounded-2xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)]">
              <p class="text-xs font-mono uppercase text-[#6A3FD0] mb-1">${locale === 'en' ? 'Quick summary' : 'Ringkasan singkat'}</p>
              <p class="text-base text-[#17122B] font-medium">${escapeHtmlAttr(
                areaPage.quickSummary
              )}</p>
            </div>
            <section class="mt-8">
              <h2 class="text-2xl font-bold mb-4">${escapeHtmlAttr(
                areaPage.localContextHeading
              )}</h2>
              ${contextHtml}
              <ul class="list-disc pl-5 text-sm text-[#5B5675]">${mixHtml}</ul>
            </section>
            <section class="mt-8">
              ${scenariosHtml}
            </section>
            <section class="mt-8">
              <h2 class="text-2xl font-bold mb-3">${escapeHtmlAttr(
                areaPage.collaborationHeading
              )}</h2>
              ${collabHtml}
              <ol class="list-decimal pl-5 text-sm text-[#5B5675] mt-4">${processHtml}</ol>
            </section>
            <section class="mt-8">
              <h2 class="text-2xl font-bold mb-3">${escapeHtmlAttr(areaPage.priceHeading)}</h2>
              <p class="text-base text-[#5B5675]">${escapeHtmlAttr(areaPage.priceCopy)}</p>
            </section>
            <section class="mt-8">
              <h2 class="text-2xl font-bold mb-4">FAQ</h2>
              ${faqHtml}
            </section>
            <section class="mt-8">
              <h2 class="text-xl font-bold mb-3">${
                locale === 'en' ? 'Nearby areas' : 'Area terdekat'
              }</h2>
              <ul class="list-disc pl-5 text-sm text-[#6A3FD0]">${siblingAreaLinks}</ul>
            </section>
          </article>
        </main>
      `;
    }
  }

  // Service Detail (/jasa/:slug)
  if (
    pathname.startsWith('/jasa/') ||
    pathname.startsWith('/layanan/') ||
    pathname.startsWith('/services/')
  ) {
    const slug = pathname.replace(/^\/(jasa|layanan|services)\//, '').trim();
    const service = getLocalizedService(slug, locale);
    if (service) {
      const deliverablesHtml = service.deliverables
        .map(
          (d) =>
            `<li class="mb-3"><strong>${escapeHtmlAttr(d.title)}:</strong> ${escapeHtmlAttr(
              d.description
            )}</li>`
        )
        .join('\n');

      const faqHtml = service.faq
        .map(
          (f) =>
            `<div class="mb-4 p-4 rounded-2xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)]">
              <h3 class="font-bold text-[#17122B]">${escapeHtmlAttr(f.question)}</h3>
              <p class="text-sm text-[#5B5675] mt-1">${escapeHtmlAttr(f.answer)}</p>
            </div>`
        )
        .join('\n');

      const indexableAreasHtml = getServiceAreasByServiceSlug(service.slug, true, locale)
        .map((a) => {
          const href = getServiceAreaPath(a.serviceSlug, a.areaSlug, locale);
          const label =
            locale === 'en'
              ? `${service.shortTitle} in ${a.areaName}`
              : `${service.shortTitle} di ${a.areaName}`;
          return `<li><a href="${escapeHtmlAttr(href)}">${escapeHtmlAttr(label)}</a></li>`;
        })
        .join('\n');

      return `
        <main class="bg-[#FFFFFF] text-[#17122B] min-h-screen">
          <nav aria-label="Breadcrumb" class="max-w-4xl mx-auto px-6 pt-10 text-xs font-mono text-[#5B5675]">
            <a href="${escapeHtmlAttr(homeHref)}">${locale === 'en' ? 'Home' : 'Beranda'}</a> / <span>${escapeHtmlAttr(service.title)}</span>
          </nav>
          <article class="max-w-4xl mx-auto px-6 py-8">
            <span class="text-xs font-mono text-[#6A3FD0]">${escapeHtmlAttr(service.eyebrow)}</span>
            <h1 class="text-3xl sm:text-5xl font-bold mt-2">${escapeHtmlAttr(service.h1)}</h1>
            <p class="text-base text-[#17122B] mt-3">${escapeHtmlAttr(service.ringkasanSingkat)}</p>
            <section class="mt-8">
              <h2 class="text-2xl font-bold mb-4">${
                locale === 'en' ? 'What you get' : 'Yang kamu dapat'
              }</h2>
              <ul class="list-disc pl-5 text-sm text-[#5B5675]">${deliverablesHtml}</ul>
            </section>
            <section class="mt-8">
              <h2 class="text-2xl font-bold mb-2">${
                locale === 'en' ? 'Pricing and scope' : 'Harga dan cakupan'
              }</h2>
              <p class="text-sm text-[#5B5675] mt-1">${escapeHtmlAttr(service.hargaDanScope)}</p>
            </section>
            <section class="mt-8">
              <h2 class="text-2xl font-bold mb-4">FAQ</h2>
              ${faqHtml}
            </section>
            ${
              indexableAreasHtml
                ? `<section class="mt-8"><h2 class="text-xl font-bold mb-3">${
                    locale === 'en' ? 'Service areas' : 'Area layanan'
                  }</h2><ul class="list-disc pl-5 text-sm text-[#6A3FD0]">${indexableAreasHtml}</ul></section>`
                : ''
            }
          </article>
        </main>
      `;
    }
  }

  // Portfolio Detail (/portfolio/:slug)
  if (pathname.startsWith('/portfolio/')) {
    const slug = pathname.replace('/portfolio/', '').trim();
    const project = getProjectBySlug(slug, locale);
    if (project) {
      const featuresHtml = project.features
        .map(
          (f) =>
            `<li class="mb-3"><strong>${escapeHtmlAttr(f.title)}:</strong> ${escapeHtmlAttr(
              f.description
            )}</li>`
        )
        .join('\n');

      return `
        <main class="bg-[#FFFFFF] text-[#17122B] min-h-screen">
          <article class="max-w-4xl mx-auto px-6 py-8">
            <span class="text-xs font-mono text-[#6A3FD0]">${escapeHtmlAttr(
              project.internalBadgeLabel
            )} · ${escapeHtmlAttr(project.categoryLabel)}</span>
            <h1 class="text-3xl sm:text-5xl font-bold mt-2">${escapeHtmlAttr(project.title)}</h1>
            <p class="text-lg text-[#5B5675] mt-3">${escapeHtmlAttr(project.oneLiner)}</p>
            <section class="mt-8">
              <ul class="list-disc pl-5 text-sm text-[#5B5675]">${featuresHtml}</ul>
            </section>
          </article>
        </main>
      `;
    }
  }

  // Portfolio Hub (/portfolio)
  if (pathname === '/portfolio') {
    const projectsListHtml = projects
      .map(
        (proj) =>
          `<article class="mb-6 p-6 rounded-2xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)]">
            <span class="text-xs font-mono text-[#6A3FD0]">${escapeHtmlAttr(
              proj.internalBadgeLabel
            )} · ${escapeHtmlAttr(proj.categoryLabel)} · ${escapeHtmlAttr(proj.year)}</span>
            <h2 class="text-xl font-bold mt-1"><a href="/${locale}/portfolio/${escapeHtmlAttr(
              proj.slug
            )}">${escapeHtmlAttr(proj.title)}</a></h2>
            <p class="text-sm text-[#5B5675] mt-2">${escapeHtmlAttr(proj.oneLiner)}</p>
          </article>`
      )
      .join('\n');

    return `
      <main class="bg-[#FFFFFF] text-[#17122B] min-h-screen">
        <section class="max-w-5xl mx-auto px-6 py-16">
          <h1 class="text-3xl sm:text-5xl font-bold">${
            locale === 'en' ? 'Internal projects' : 'Proyek internal'
          }</h1>
          <div class="mt-10">${projectsListHtml}</div>
        </section>
      </main>
    `;
  }

  // Case Study Detail (/case-studies/:slug)
  if (pathname.startsWith('/case-studies/')) {
    const slug = pathname.replace('/case-studies/', '').trim();
    const study = getCaseStudyBySlug(slug, locale);
    if (study) {
      const indexHref = locale === 'en' ? '/en/case-studies' : '/id/studi-kasus';
      const sectionsHtml = study.sections
        .map((sec) => {
          const blocksHtml = sec.blocks
            .map((b) => {
              if (b.type === 'text') {
                return b.paragraphs
                  .map((p) => `<p class="text-base text-[#17122B] mb-4">${escapeHtmlAttr(p)}</p>`)
                  .join('\n');
              }
              if (b.type === 'callout') {
                return `<aside class="my-5 p-5 rounded-2xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.16)]">
                  <span class="text-xs font-mono uppercase text-[#6A3FD0]">${escapeHtmlAttr(b.callout.label)}</span>
                  <h3 class="text-lg font-bold text-[#17122B] mt-1">${escapeHtmlAttr(b.callout.title)}</h3>
                  <p class="text-sm text-[#5B5675] mt-2">${escapeHtmlAttr(b.callout.body)}</p>
                </aside>`;
              }
              if (b.type === 'targets') {
                const targetsItems = b.targets
                  .map(
                    (t) =>
                      `<li><strong>${escapeHtmlAttr(t.label)}:</strong> ${escapeHtmlAttr(t.value)} (${escapeHtmlAttr(t.note)})</li>`
                  )
                  .join('\n');
                return `<div class="my-5 p-5 rounded-2xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.16)]">
                  <span class="text-xs font-mono uppercase text-[#6A3FD0]">${escapeHtmlAttr(b.badgeLabel)}</span>
                  <ul class="list-disc pl-5 mt-3 text-sm text-[#17122B]">${targetsItems}</ul>
                </div>`;
              }
              return '';
            })
            .join('\n');

          return `<section id="${escapeHtmlAttr(sec.id)}" class="mt-8">
            <h2 class="text-2xl font-bold text-[#17122B] mb-3">${escapeHtmlAttr(sec.number)}. ${escapeHtmlAttr(sec.title)}</h2>
            ${blocksHtml}
          </section>`;
        })
        .join('\n');

      return `
        <main class="bg-[#FFFFFF] text-[#17122B] min-h-screen">
          <nav aria-label="Breadcrumb" class="max-w-4xl mx-auto px-6 pt-10 text-xs font-mono text-[#5B5675]">
            <a href="${escapeHtmlAttr(homeHref)}">${locale === 'en' ? 'Home' : 'Beranda'}</a> / <a href="${escapeHtmlAttr(indexHref)}">${locale === 'en' ? 'Case Studies' : 'Studi Kasus'}</a> / <span>${escapeHtmlAttr(study.title)}</span>
          </nav>
          <article class="max-w-4xl mx-auto px-6 py-8">
            <span class="text-xs font-mono text-[#6A3FD0]">${escapeHtmlAttr(study.internalBadgeLabel)} · ${escapeHtmlAttr(study.industry)} · ${escapeHtmlAttr(study.readingTime)}</span>
            <h1 class="text-3xl sm:text-5xl font-bold mt-2">${escapeHtmlAttr(study.title)}</h1>
            <p class="text-lg text-[#5B5675] mt-3">${escapeHtmlAttr(study.oneSentenceSummary)}</p>
            <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 p-5 rounded-2xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)]">
              <div>
                <h2 class="text-xs font-mono uppercase text-[#6A3FD0]">${locale === 'en' ? 'Problem' : 'Masalah'}</h2>
                <p class="text-sm text-[#17122B] mt-1">${escapeHtmlAttr(study.summary.problem)}</p>
              </div>
              <div>
                <h2 class="text-xs font-mono uppercase text-[#6A3FD0]">${locale === 'en' ? 'What we built' : 'Yang dibangun'}</h2>
                <p class="text-sm text-[#17122B] mt-1">${escapeHtmlAttr(study.summary.built)}</p>
              </div>
            </div>
            ${sectionsHtml}
          </article>
        </main>
      `;
    }
  }

  // Case Studies Hub (/case-studies)
  if (pathname === '/case-studies') {
    const studies = getPublishedCaseStudies(locale);
    const studiesListHtml = studies
      .map((cs) => {
        const href =
          locale === 'en' ? `/en/case-studies/${cs.slug}` : `/id/studi-kasus/${cs.slug}`;
        return `<article class="mb-6 p-6 rounded-2xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)]">
          <span class="text-xs font-mono text-[#6A3FD0]">${escapeHtmlAttr(cs.internalBadgeLabel)} · ${escapeHtmlAttr(cs.industry)} · ${escapeHtmlAttr(cs.readingTime)}</span>
          <h2 class="text-xl font-bold mt-1"><a href="${escapeHtmlAttr(href)}">${escapeHtmlAttr(cs.title)}</a></h2>
          <p class="text-sm text-[#5B5675] mt-2"><strong>${locale === 'en' ? 'Problem' : 'Masalah'}:</strong> ${escapeHtmlAttr(cs.summary.problem)}</p>
          <p class="text-sm text-[#5B5675] mt-1"><strong>${locale === 'en' ? 'What we built' : 'Yang dibangun'}:</strong> ${escapeHtmlAttr(cs.summary.built)}</p>
        </article>`;
      })
      .join('\n');

    return `
      <main class="bg-[#FFFFFF] text-[#17122B] min-h-screen">
        <section class="max-w-5xl mx-auto px-6 py-16">
          <h1 class="text-3xl sm:text-5xl font-bold">${
            locale === 'en' ? 'How we solve a problem' : 'Cara kami menyelesaikan sebuah masalah'
          }</h1>
          <p class="text-base text-[#5B5675] mt-3">${
            locale === 'en'
              ? 'Notes behind our internal projects: the problem we wanted to solve, the approach we chose, and the technical decisions along the way.'
              : 'Catatan di balik proyek internal kami: masalah yang ingin diselesaikan, pendekatan yang dipilih, dan keputusan teknis di sepanjang jalan.'
          }</p>
          <div class="mt-5 p-4 rounded-2xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.18)] text-sm text-[#17122B]">
            ${
              locale === 'en'
                ? 'All case studies on this page are CHESTAADOTCOM internal projects, not client projects. We built them in-house to test the workflows before they are used by clients.'
                : 'Semua studi kasus di halaman ini adalah proyek internal CHESTAADOTCOM, bukan proyek klien. Kami membangunnya sendiri untuk menguji alurnya sebelum dipakai klien.'
            }
          </div>
          <div class="mt-10">${studiesListHtml}</div>
        </section>
      </main>
    `;
  }

  // Blog Topic Cluster Hub (/blog/topik/:cluster or /blog/topic/:cluster)
  if (pathname.startsWith('/blog/topik/') || pathname.startsWith('/blog/topic/')) {
    const clusterSlug = pathname
      .replace(/^\/blog\/(topik|topic)\//, '')
      .trim();
    const cluster = getTopicClusterById(clusterSlug);
    if (cluster) {
      const clusterTitle = locale === 'en' ? cluster.titleEn : cluster.titleId;
      const clusterIntro = locale === 'en' ? cluster.introEn : cluster.introId;
      const pillarSlug = locale === 'en' ? cluster.pillarSlugEn : cluster.pillarSlugId;
      const pillarTitle = locale === 'en' ? cluster.pillarTitleEn : cluster.pillarTitleId;
      const clusterPosts = getBlogPostsByCluster(cluster.id, locale);
      const postsHtml = clusterPosts
        .map(
          (p) =>
            `<li class="mb-3"><a href="/${locale}/blog/${escapeHtmlAttr(
              p.slug
            )}" class="font-semibold text-[#6A3FD0] underline">${escapeHtmlAttr(
              p.title
            )}</a> — <span class="text-sm text-[#5B5675]">${escapeHtmlAttr(
              p.excerpt
            )}</span></li>`
        )
        .join('\n');

      const serviceLinksHtml = cluster.relatedServiceSlugs
        .map((s) => {
          const href = getServicePath(s, locale);
          return `<li><a href="${escapeHtmlAttr(href)}" class="text-[#6A3FD0] underline">${escapeHtmlAttr(
            href
          )}</a></li>`;
        })
        .join('\n');

      const areaLinksHtml = cluster.relatedAreaSlugs
        .map((a) => {
          const href = getServiceAreaPath('pembuatan-website', a, locale);
          return `<li><a href="${escapeHtmlAttr(href)}" class="text-[#6A3FD0] underline">${escapeHtmlAttr(
            a
          )}</a></li>`;
        })
        .join('\n');

      return `
        <main class="bg-[#FFFFFF] text-[#17122B] min-h-screen">
          <nav aria-label="Breadcrumb" class="max-w-4xl mx-auto px-6 pt-10 text-xs font-mono text-[#5B5675]">
            <a href="${escapeHtmlAttr(homeHref)}">${locale === 'en' ? 'Home' : 'Beranda'}</a> / <a href="/${locale}/blog">Blog</a> / <span>${escapeHtmlAttr(
        clusterTitle
      )}</span>
          </nav>
          <article class="max-w-4xl mx-auto px-6 py-8">
            <h1 class="text-3xl sm:text-5xl font-bold">${escapeHtmlAttr(clusterTitle)}</h1>
            <p class="text-base text-[#17122B] mt-4 leading-relaxed">${escapeHtmlAttr(
              clusterIntro
            )}</p>
            <section class="mt-8 p-5 rounded-2xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.16)]">
              <h2 class="text-xl font-bold">${
                locale === 'en' ? 'Featured Pillar Guide' : 'Panduan Utama (Pillar)'
              }</h2>
              <p class="mt-2"><a href="/${locale}/blog/${escapeHtmlAttr(
                pillarSlug
              )}" class="text-[#6A3FD0] font-semibold underline">${escapeHtmlAttr(
        pillarTitle
      )}</a></p>
            </section>
            <section class="mt-8">
              <h2 class="text-2xl font-bold mb-4">${
                locale === 'en'
                  ? 'All Articles in This Cluster'
                  : 'Semua Artikel dalam Klaster Ini'
              }</h2>
              <ul class="list-disc pl-5">${postsHtml}</ul>
            </section>
            <section class="mt-8">
              <h2 class="text-xl font-bold mb-2">${
                locale === 'en' ? 'Related Services & Areas' : 'Layanan & Area Terkait'
              }</h2>
              <ul class="list-disc pl-5">${serviceLinksHtml}${areaLinksHtml}</ul>
            </section>
          </article>
        </main>
      `;
    }
  }

  // Blog Index & Paginated Index (/blog, /blog/halaman/:n, /blog/page/:n)
  if (pathname === '/blog' || pathname.startsWith('/blog/halaman/')) {
    const rawPage = pathname.startsWith('/blog/halaman/')
      ? parseInt(pathname.slice('/blog/halaman/'.length).trim(), 10) || 1
      : 1;
    const slice = getBlogPaginationSlice(locale, rawPage);
    const isEnLocale = locale === 'en';
    const subheadline = isEnLocale
      ? 'Notes on AI agents, websites, and automation for businesses in South Tangerang.'
      : 'Catatan tentang AI agent, website, dan otomasi untuk bisnis di Tangerang Selatan.';

    const topicLinksHtml = [
      `<li><a href="${isEnLocale ? '/en/blog' : '/id/blog'}" aria-current="page">${
        isEnLocale ? 'All' : 'Semua'
      }</a></li>`,
      ...TOPIC_CLUSTERS.map((c) => {
        const href = getClusterHubPath(c.id, locale);
        const label = isEnLocale ? c.shortLabelEn : c.shortLabelId;
        return `<li><a href="${escapeHtmlAttr(href)}">${escapeHtmlAttr(label)}</a></li>`;
      }),
    ].join('\n');

    const featuredHtml = slice.featuredPost
      ? `<section aria-label="${isEnLocale ? 'Featured article' : 'Artikel terbaru'}" class="mt-12 mb-16">
          <article>
            <a href="/${locale}/blog/${escapeHtmlAttr(slice.featuredPost.slug)}">
              <img src="${escapeHtmlAttr(slice.featuredPost.coverImage)}" alt="${escapeHtmlAttr(
                slice.featuredPost.coverAlt
              )}" width="1600" height="900" loading="eager" />
            </a>
            <p>${escapeHtmlAttr(slice.featuredPost.category)} · ${escapeHtmlAttr(
              slice.featuredPost.date
            )} · ${escapeHtmlAttr(slice.featuredPost.readTime)}</p>
            <h2><a href="/${locale}/blog/${escapeHtmlAttr(
              slice.featuredPost.slug
            )}">${escapeHtmlAttr(slice.featuredPost.title)}</a></h2>
            <p>${escapeHtmlAttr(slice.featuredPost.excerpt)}</p>
            <p><a href="/${locale}/blog/${escapeHtmlAttr(slice.featuredPost.slug)}">${
              isEnLocale ? 'Read article →' : 'Baca artikel →'
            }</a></p>
          </article>
        </section>`
      : '';

    const gridCardsHtml = slice.gridPosts
      .map(
        (post) => `<article>
          <a href="/${locale}/blog/${escapeHtmlAttr(post.slug)}">
            <img src="${escapeHtmlAttr(post.coverImage)}" alt="${escapeHtmlAttr(
              post.coverAlt
            )}" width="640" height="360" loading="lazy" />
            <p>${escapeHtmlAttr(post.category)} · ${escapeHtmlAttr(post.date)} · ${escapeHtmlAttr(
              post.readTime
            )}</p>
            <h2>${escapeHtmlAttr(post.title)}</h2>
          </a>
        </article>`
      )
      .join('\n');

    const paginationNumbersHtml = Array.from(
      { length: slice.totalPages },
      (_, idx) => idx + 1
    )
      .map((p) => {
        const href =
          p === 1
            ? isEnLocale
              ? '/en/blog'
              : '/id/blog'
            : isEnLocale
              ? `/en/blog/page/${p}`
              : `/id/blog/halaman/${p}`;
        return `<a href="${escapeHtmlAttr(href)}"${
          p === slice.currentPage ? ' aria-current="page"' : ''
        }>${p}</a>`;
      })
      .join(' ');

    return `
      <main class="bg-[#FFFFFF] text-[#17122B] min-h-screen">
        <div class="max-w-[1120px] mx-auto px-5 md:px-8 pt-24 md:pt-30 pb-16">
          <header>
            <h1>Blog</h1>
            <p>${escapeHtmlAttr(subheadline)}</p>
          </header>
          <nav aria-label="${isEnLocale ? 'Blog topics' : 'Topik blog'}">
            <ul>${topicLinksHtml}</ul>
          </nav>
          ${featuredHtml}
          <section aria-label="${isEnLocale ? 'Articles' : 'Daftar artikel'}">
            ${gridCardsHtml}
          </section>
          <nav aria-label="${isEnLocale ? 'Pagination' : 'Navigasi halaman'}">
            ${
              slice.prevPath
                ? `<a href="${escapeHtmlAttr(slice.prevPath)}">${
                    isEnLocale ? 'Previous' : 'Sebelumnya'
                  }</a>`
                : ''
            }
            ${paginationNumbersHtml}
            ${
              slice.nextPath
                ? `<a href="${escapeHtmlAttr(slice.nextPath)}">${
                    isEnLocale ? 'Next' : 'Berikutnya'
                  }</a>`
                : ''
            }
          </nav>
        </div>
      </main>
    `;
  }

  // Blog Post (/blog/:slug)
  if (
    pathname.startsWith('/blog/') &&
    !pathname.startsWith('/blog/kategori/') &&
    !pathname.startsWith('/blog/topik/') &&
    !pathname.startsWith('/blog/topic/') &&
    !pathname.startsWith('/blog/halaman/') &&
    !pathname.startsWith('/blog/page/')
  ) {
    const slug = pathname.replace('/blog/', '').trim();
    const post = getBlogPostBySlug(slug, locale);

    if (post) {
      const postLocale = post.locale || locale;
      const isEnPost = postLocale === 'en';
      const authorProfile = getAuthorProfile(post.author, postLocale);
      const cluster = getTopicClusterById(post.clusterId);
      const clusterHref = getClusterHubPath(post.clusterId, postLocale);
      const clusterLabel = cluster
        ? isEnPost
          ? cluster.shortLabelEn
          : cluster.shortLabelId
        : post.category;
      const teamHref = isEnPost ? '/en/about#team' : '/id/tentang#tim';
      const renderedArticleHtml = renderBlogPostHtml(post);
      const changelogHtml =
        post.changelog && post.changelog.length > 0
          ? `<section id="pembaruan" class="mt-8 p-5 rounded-xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.16)]"><h2 class="text-lg font-bold mb-2">${
              isEnPost ? 'Updates' : 'Pembaruan'
            }</h2><ul class="list-disc pl-5 text-sm">${post.changelog
              .map(
                (c) =>
                  `<li><strong>${escapeHtmlAttr(c.date)}:</strong> ${escapeHtmlAttr(
                    c.summary
                  )}</li>`
              )
              .join('')}</ul></section>`
          : '';
      return `
        <main class="bg-[#FFFFFF] text-[#17122B] min-h-screen">
          <article class="max-w-4xl mx-auto px-6 py-8">
            <header class="mb-8">
              <span class="text-xs font-mono text-[#6A3FD0]"><a href="${escapeHtmlAttr(
                clusterHref
              )}">${escapeHtmlAttr(clusterLabel)}</a> · ${escapeHtmlAttr(
        post.category
      )} · ${escapeHtmlAttr(post.readTime)}</span>
              <h1 class="text-3xl sm:text-5xl font-bold mt-3">${escapeHtmlAttr(post.title)}</h1>
              <p class="text-base text-[#17122B] mt-3">${escapeHtmlAttr(post.excerpt)}</p>
              <div class="mt-4 pt-4 border-t border-[rgba(91,60,196,0.1)] text-xs text-[#5B5675]">
                <span>${isEnPost ? 'By' : 'Oleh'} <a href="${escapeHtmlAttr(
        teamHref
      )}" rel="author" class="text-[#6A3FD0] underline">${escapeHtmlAttr(
        authorProfile.name
      )}</a> (${escapeHtmlAttr(authorProfile.role)}) · ${
        isEnPost ? 'Updated' : 'Diperbarui'
      } ${escapeHtmlAttr(post.updatedAt)}</span>
              </div>
              <figure class="mt-6 rounded-2xl overflow-hidden border border-[rgba(91,60,196,0.14)] bg-[#F8F6FE]">
                <img src="${escapeHtmlAttr(post.coverImage)}" alt="${escapeHtmlAttr(
        post.coverAlt
      )}" width="1600" height="900" loading="eager" fetchpriority="high" />
              </figure>
            </header>
            <div class="prose max-w-none text-[#17122B] leading-relaxed">
              ${renderedArticleHtml}
              ${changelogHtml}
            </div>
          </article>
        </main>
      `;
    }
  }

  if (pathname === '/audit-gratis') {
    const isEn = locale === 'en';
    const waHref = isEn
      ? 'https://wa.me/6282125447232?text=Hello%20CHESTAADOTCOM%2C%20I%20would%20like%20a%20free%20consultation.'
      : 'https://wa.me/6282125447232?text=Halo%20CHESTAADOTCOM%2C%20saya%20ingin%20konsultasi%20gratis.';
    return `
      <main class="bg-[#FFFFFF] text-[#17122B] min-h-screen">
        <section class="max-w-4xl mx-auto px-6 py-16">
          <h1 class="text-3xl sm:text-5xl font-bold">${
            isEn
              ? 'Free 30-minute audit for your business workflow'
              : 'Audit gratis 30 menit untuk alur kerja bisnismu'
          }</h1>
          <p class="text-base text-[#5B5675] mt-4">${
            isEn
              ? "Tell us the work that tires your team the most. We'll tell you honestly whether it can be built or automated, and roughly what it will cost."
              : 'Ceritakan kerjaan yang paling bikin capek. Kami bilang jujur apakah bisa dikerjakan, dan berapa kira-kira biayanya.'
          }</p>
          <p class="mt-6"><a href="${waHref}" target="_blank" rel="noopener">${
      isEn ? 'Free consultation on WhatsApp' : 'Konsultasi gratis via WhatsApp'
    }</a></p>
        </section>
      </main>
    `;
  }

  if (pathname === '/about') {
    const isEn = locale === 'en';
    return `
      <main class="bg-[#FFFFFF] text-[#17122B] min-h-screen">
        <section class="max-w-4xl mx-auto px-6 py-16">
          <h1 class="text-3xl sm:text-5xl font-bold">${
            isEn
              ? 'A digital product & AI agent engineering studio built hands-on by its founders'
              : 'Studio rekayasa produk digital & AI agent yang dibangun langsung oleh para pendirinya'
          }</h1>
          <p class="text-base text-[#5B5675] mt-4">${
            isEn
              ? 'CHESTAADOTCOM was founded by Chesta Azka and Zeeshan in BSD, South Tangerang.'
              : 'CHESTAADOTCOM didirikan oleh Chesta Azka dan Zeeshan di BSD, Tangerang Selatan.'
          }</p>
        </section>
      </main>
    `;
  }

  if (pathname === '/privasi') {
    const isEn = locale === 'en';
    return `
      <main class="bg-[#FFFFFF] text-[#17122B] min-h-screen">
        <section class="max-w-4xl mx-auto px-6 py-16">
          <h1 class="text-3xl sm:text-5xl font-bold">${
            isEn ? 'Privacy Policy' : 'Kebijakan Privasi'
          }</h1>
          <p class="text-base text-[#5B5675] mt-4">${
            isEn
              ? 'Plain-language privacy policy of CHESTAADOTCOM aligned with Indonesian Data Protection Law (UU PDP No. 27/2022).'
              : 'Kebijakan privasi CHESTAADOTCOM dalam bahasa lugas sesuai UU PDP No. 27 Tahun 2022.'
          }</p>
        </section>
      </main>
    `;
  }

  // Default Homepage (/id or /en)
  const faqsForHome = locale === 'en' ? ENGLISH_HOME_FAQS : HOME_FAQS;
  const homeFaqHtml = faqsForHome
    .map(
      (item) =>
        `<div class="mb-5 p-5 rounded-2xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.1)]">
        <h3 class="text-base font-bold text-[#17122B]">${escapeHtmlAttr(item.question)}</h3>
        <p class="text-sm text-[#5B5675] mt-2">${escapeHtmlAttr(item.answer)}</p>
      </div>`
    )
    .join('\n');

  const langSwitchLinks = getHreflangAlternates(normalizedRaw, SITE_URL);

  if (locale === 'en') {
    return `
      <main class="bg-[#FFFFFF] text-[#17122B] min-h-screen">
        <header class="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
          <a href="/en" class="font-bold text-lg text-[#17122B]">CHESTAADOTCOM</a>
          <nav aria-label="Main Navigation" class="flex flex-wrap gap-4 text-sm text-[#5B5675]">
            <a href="/en/services/website-development">Website &amp; Landing Page</a>
            <a href="/en/services/ai-agents">AI Agents</a>
            <a href="/en/services/custom-software">Custom Software</a>
            <a href="/en/services/workflow-automation">Workflow Automation</a>
            <a href="/en/areas">Service Areas</a>
            <a href="/en/portfolio">Internal Projects</a>
            <a href="/en/blog">Blog</a>
            <a href="${escapeHtmlAttr(langSwitchLinks.idUrl)}" hreflang="id">ID</a>
            <a href="${escapeHtmlAttr(langSwitchLinks.enUrl)}" hreflang="en">EN</a>
          </nav>
        </header>
        <section class="max-w-6xl mx-auto px-6 py-16">
          <h1 class="text-4xl sm:text-6xl font-bold leading-tight">Custom software and AI agents that take over repetitive work in your business.</h1>
          <p class="text-lg text-[#5B5675] mt-5 max-w-2xl">WhatsApp chats answered manually, data copied between spreadsheets, follow-ups forgotten. We build the system so it runs on its own, letting your team focus on work that truly requires a human.</p>
          <p class="mt-6"><a href="${SITE_METADATA.whatsappUrl}" class="inline-block px-6 py-3 rounded-full bg-[#6A3FD0] text-white font-bold text-sm">Start with a free 30-minute audit</a></p>
        </section>
        <section id="faq" class="max-w-4xl mx-auto px-6 py-16">
          <h2 class="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          ${homeFaqHtml}
        </section>
      </main>
    `;
  }

  return `
    <main class="bg-[#FFFFFF] text-[#17122B] min-h-screen">
      <header class="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
        <a href="/id" class="font-bold text-lg text-[#17122B]">CHESTAADOTCOM</a>
        <nav aria-label="Navigasi Utama" class="flex flex-wrap gap-4 text-sm text-[#5B5675]">
          <a href="/id/jasa/pembuatan-website">Jasa pembuatan website</a>
          <a href="/id/jasa/ai-agent">Jasa AI agent</a>
          <a href="/id/jasa/software-custom">Jasa software custom</a>
          <a href="/id/jasa/otomasi-workflow">Jasa otomasi workflow</a>
          <a href="/id/area">Area Layanan</a>
          <a href="/id/portfolio">Proyek Internal</a>
          <a href="/id/blog">Blog</a>
          <a href="${escapeHtmlAttr(langSwitchLinks.idUrl)}" hreflang="id">ID</a>
          <a href="${escapeHtmlAttr(langSwitchLinks.enUrl)}" hreflang="en">EN</a>
        </nav>
      </header>
      <section class="max-w-6xl mx-auto px-6 py-16">
        <h1 class="text-4xl sm:text-6xl font-bold leading-tight">Software custom dan AI agent yang mengambil alih kerja berulang di bisnismu.</h1>
        <p class="text-lg text-[#5B5675] mt-5 max-w-2xl">Chat WhatsApp yang dibalas manual, data yang disalin dari sheet ke sheet, follow-up yang lupa dikirim. Kami bangun sistemnya supaya jalan sendiri, dan tim kamu fokus ke hal yang memang butuh manusia.</p>
        <p class="mt-6"><a href="${SITE_METADATA.whatsappUrl}" class="inline-block px-6 py-3 rounded-full bg-[#6A3FD0] text-white font-bold text-sm">Mulai dari audit gratis 30 menit</a></p>
      </section>
      <section id="faq" class="max-w-4xl mx-auto px-6 py-16">
        <h2 class="text-3xl font-bold mb-8">Pertanyaan yang Sering Diajukan</h2>
        ${homeFaqHtml}
      </section>
    </main>
  `;
}

export function injectSocialMeta(html: string, url: string): string {
  const meta = getMetaTagsForUrl(url);
  const safeTitle = escapeHtmlAttr(meta.title);
  const safeDesc = escapeHtmlAttr(meta.description);
  const safeUrl = escapeHtmlAttr(meta.url);
  const safeImg = escapeHtmlAttr(meta.image);
  const safeImgAlt = escapeHtmlAttr(meta.imageAlt || meta.title);
  const htmlLang = meta.locale === 'en' ? 'en' : 'id';
  const ogLocale = meta.locale === 'en' ? 'en_US' : 'id_ID';
  const ogLocaleAlt = meta.locale === 'en' ? 'id_ID' : 'en_US';
  const robotsValue = meta.robotsContent || (meta.noindex ? 'noindex,follow' : 'index,follow');

  let updatedHtml = html;

  // Replace <html lang="...">
  updatedHtml = updatedHtml.replace(
    /<html\s+lang=["'][^"']*["']/i,
    `<html lang="${htmlLang}"`
  );

  // Replace <title>
  updatedHtml = updatedHtml.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${safeTitle}</title>`
  );

  // Replace <link rel="canonical"> and inject reciprocal hreflang links (id, en, x-default)
  const hreflangTags = meta.alternates
    ? [
        `<link rel="canonical" href="${safeUrl}" />`,
        `<link rel="alternate" hreflang="id" href="${escapeHtmlAttr(meta.alternates.idUrl)}" />`,
        `<link rel="alternate" hreflang="en" href="${escapeHtmlAttr(meta.alternates.enUrl)}" />`,
        `<link rel="alternate" hreflang="x-default" href="${escapeHtmlAttr(meta.alternates.xDefaultUrl)}" />`,
      ].join('\n    ')
    : `<link rel="canonical" href="${safeUrl}" />`;

  if (/<link\s+rel=["']canonical["'][^>]*>/i.test(updatedHtml)) {
    updatedHtml = updatedHtml.replace(
      /<link\s+rel=["']canonical["'][^>]*>/i,
      hreflangTags
    );
  }

  // Replace Meta Description
  if (/<meta\s+name=["']description["'][^>]*>/i.test(updatedHtml)) {
    updatedHtml = updatedHtml.replace(
      /<meta\s+name=["']description["'][^>]*content=["'][^"']*["'][^>]*>/i,
      `<meta name="description" content="${safeDesc}" />`
    );
  }

  // Replace Meta Robots
  if (/<meta\s+name=["']robots["'][^>]*>/i.test(updatedHtml)) {
    updatedHtml = updatedHtml.replace(
      /<meta\s+name=["']robots["'][^>]*>/i,
      `<meta name="robots" content="${robotsValue}" />`
    );
  } else if (/<\/head>/i.test(updatedHtml)) {
    updatedHtml = updatedHtml.replace(
      /<\/head>/i,
      `  <meta name="robots" content="${robotsValue}" />\n  </head>`
    );
  }

  // Open Graph
  updatedHtml = updatedHtml.replace(
    /<meta\s+property=["']og:title["'][^>]*>/i,
    `<meta property="og:title" content="${safeTitle}" />`
  );
  updatedHtml = updatedHtml.replace(
    /<meta\s+property=["']og:description["'][^>]*>/i,
    `<meta property="og:description" content="${safeDesc}" />`
  );
  updatedHtml = updatedHtml.replace(
    /<meta\s+property=["']og:url["'][^>]*>/i,
    `<meta property="og:url" content="${safeUrl}" />`
  );
  updatedHtml = updatedHtml.replace(
    /<meta\s+property=["']og:image["'][^>]*>/i,
    `<meta property="og:image" content="${safeImg}" />\n    <meta property="og:image:width" content="1200" />\n    <meta property="og:image:height" content="630" />\n    <meta property="og:image:alt" content="${safeImgAlt}" />`
  );
  updatedHtml = updatedHtml.replace(
    /<meta\s+property=["']og:locale["'][^>]*>/i,
    `<meta property="og:locale" content="${ogLocale}" />\n    <meta property="og:locale:alternate" content="${ogLocaleAlt}" />`
  );

  // Twitter Cards
  updatedHtml = updatedHtml.replace(
    /<meta\s+name=["']twitter:title["'][^>]*>/i,
    `<meta name="twitter:title" content="${safeTitle}" />`
  );
  updatedHtml = updatedHtml.replace(
    /<meta\s+name=["']twitter:description["'][^>]*>/i,
    `<meta name="twitter:description" content="${safeDesc}" />`
  );
  updatedHtml = updatedHtml.replace(
    /<meta\s+name=["']twitter:image["'][^>]*>/i,
    `<meta name="twitter:image" content="${safeImg}" />\n    <meta name="twitter:image:alt" content="${safeImgAlt}" />`
  );

  // Inject Article Freshness & Taxonomy Meta Tags + Preload + Pagination rel=prev/next + JSON-LD
  const articleMetaLines: string[] = [];
  if (meta.preloadImage) {
    articleMetaLines.push(
      `<link rel="preload" as="image" href="${escapeHtmlAttr(
        meta.preloadImage
      )}" fetchpriority="high" />`
    );
  }
  if (meta.prevUrl) {
    articleMetaLines.push(
      `<link rel="prev" href="${escapeHtmlAttr(meta.prevUrl)}" />`
    );
  }
  if (meta.nextUrl) {
    articleMetaLines.push(
      `<link rel="next" href="${escapeHtmlAttr(meta.nextUrl)}" />`
    );
  }
  if (meta.type === 'article') {
    const authorHref =
      meta.authorUrl ||
      (meta.locale === 'en'
        ? `${SITE_URL}/en/about#team`
        : `${SITE_URL}/id/tentang#tim`);
    articleMetaLines.push(`<link rel="author" href="${escapeHtmlAttr(authorHref)}" />`);
    if (meta.publishedTime) {
      articleMetaLines.push(
        `<meta property="article:published_time" content="${escapeHtmlAttr(
          meta.publishedTime
        )}" />`
      );
    }
    if (meta.modifiedTime) {
      articleMetaLines.push(
        `<meta property="article:modified_time" content="${escapeHtmlAttr(
          meta.modifiedTime
        )}" />`
      );
    }
    articleMetaLines.push(
      `<meta property="article:author" content="${escapeHtmlAttr(authorHref)}" />`
    );
    if (meta.articleSection) {
      articleMetaLines.push(
        `<meta property="article:section" content="${escapeHtmlAttr(
          meta.articleSection
        )}" />`
      );
    }
    if (meta.articleTags && meta.articleTags.length > 0) {
      for (const tag of meta.articleTags) {
        articleMetaLines.push(
          `<meta property="article:tag" content="${escapeHtmlAttr(tag)}" />`
        );
      }
    }
  }

  const extraHeadBlock =
    articleMetaLines.length > 0 ? `\n    ${articleMetaLines.join('\n    ')}` : '';

  const jsonLdScript = `${extraHeadBlock}\n    <script type="application/ld+json">${JSON.stringify(
    meta.jsonLd
  )}</script>\n  `;

  if (/<\/head>/i.test(updatedHtml)) {
    updatedHtml = updatedHtml.replace(/<\/head>/i, `${jsonLdScript}</head>`);
  }

  // Inject Pre-rendered Body for Search Engines & AI Crawlers
  const bodyPrerenderHtml = getPrerenderedBodyHtml(url);
  if (/<div id="root">[\s\S]*?<\/div>/i.test(updatedHtml)) {
    updatedHtml = updatedHtml.replace(
      /<div id="root">[\s\S]*?<\/div>/i,
      `<div id="root">${bodyPrerenderHtml}</div>`
    );
  }

  return updatedHtml;
}
