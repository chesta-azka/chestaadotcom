import {
  getBlogPostBySlug,
  getPublishedBlogPosts,
  getBlogCategoryBySlug,
  getBlogPostsByCategorySlug,
  getAuthorProfile,
  renderBlogPostHtml,
} from '../data/blog-posts';
import { getAllServices, getServiceBySlug } from '../data/services';
import {
  getServiceAreaPage,
  getServiceAreasByServiceSlug,
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
  getLocalizedService,
  getLocalizedServiceAreaPage,
} from './i18n-content';

export interface RouteMeta {
  title: string;
  description: string;
  image: string;
  url: string;
  type: 'website' | 'article';
  locale?: LocaleCode;
  publishedTime?: string;
  modifiedTime?: string;
  authorName?: string;
  noindex?: boolean;
  alternates?: {
    idUrl: string;
    enUrl: string;
    xDefaultUrl: string;
  };
  jsonLd: object;
}

function escapeHtmlAttr(str: string): string {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function normalizePathname(rawUrl: string): string {
  let pathname = rawUrl || '/';
  try {
    const parsed = new URL(
      SITE_URL + (rawUrl.startsWith('/') ? rawUrl : '/' + rawUrl)
    );
    pathname = parsed.pathname;
  } catch {
    pathname = rawUrl.split('?')[0] || '/';
  }
  if (pathname.length > 1 && pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1);
  }
  return pathname || '/';
}

function toCanonicalUrl(rawPathname: string): string {
  const { locale, barePath } = parseLocalizedPath(rawPathname);
  const langPrefix = locale === 'en' ? '/eng' : '';

  if (
    !barePath ||
    barePath === '/' ||
    barePath === '/services' ||
    barePath === '/layanan'
  ) {
    return `${SITE_URL}${langPrefix}`;
  }

  const areaMatch = barePath.match(/^\/(jasa|layanan|services)\/([^/]+)\/([^/]+)$/i);
  if (areaMatch) {
    const rawService = areaMatch[2];
    const rawArea = areaMatch[3].toLowerCase();
    const service = getServiceBySlug(rawService);
    if (service) {
      const areaPage = getServiceAreaPage(service.slug, rawArea);
      if (areaPage) {
        return `${SITE_URL}${langPrefix}/jasa/${areaPage.serviceSlug}/${areaPage.areaSlug}`;
      }
    }
  }

  if (
    barePath.startsWith('/jasa/') ||
    barePath.startsWith('/layanan/') ||
    barePath.startsWith('/services/')
  ) {
    const slug = barePath.replace(/^\/(jasa|layanan|services)\//, '').trim();
    const service = getServiceBySlug(slug);
    if (service) {
      return `${SITE_URL}${langPrefix}/jasa/${service.slug}`;
    }
  }

  if (barePath.startsWith('/blog/') && !barePath.startsWith('/blog/kategori/')) {
    const rawSlug = barePath.replace('/blog/', '').trim();
    const post = getBlogPostBySlug(rawSlug, locale);
    if (post) {
      const postPrefix = post.locale === 'en' ? '/eng' : '';
      return `${SITE_URL}${postPrefix}/blog/${post.slug}`;
    }
  }

  return `${SITE_URL}${langPrefix}${barePath.startsWith('/') ? barePath : '/' + barePath}`;
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

export function buildStructuredDataGraph(rawPathname: string): object {
  const { locale, barePath } = parseLocalizedPath(rawPathname);
  const pathname = barePath;
  const inLang = locale === 'en' ? 'en' : 'id-ID';
  const canonicalUrl = toCanonicalUrl(rawPathname);
  const ogDefaultUrl = toAbsoluteImageUrl(SITE_IMAGES.ogDefault.src);
  const allServices = getAllServices();
  const allProjects = getPublishedProjects();
  const allCaseStudies = getPublishedCaseStudies();

  const organizationNode = {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'CHESTAADOTCOM',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/chesta.png`,
    },
    sameAs: [SITE_METADATA.instagramUrl],
    founder: [
      { '@id': `${SITE_URL}/#founder-chesta-azka` },
      { '@id': `${SITE_URL}/#founder-zeeshan` },
    ],
  };

  const localBusinessNode = {
    '@type': ['ProfessionalService', 'LocalBusiness'],
    '@id': `${SITE_URL}/#localbusiness`,
    name: 'CHESTAADOTCOM',
    url: SITE_URL,
    image: ogDefaultUrl,
    telephone: '+6282125447232',
    priceRange:
      locale === 'en' ? 'Starting from IDR 1,200,000' : 'Mulai dari Rp1.200.000',
    description:
      locale === 'en'
        ? ENGLISH_ROUTES_SEO['/'].description
        : SITE_METADATA.defaultDescription,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'BSD City, Tangerang Selatan',
      addressLocality: 'BSD, Tangerang Selatan',
      addressRegion: 'Banten',
      addressCountry: 'ID',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -6.3239,
      longitude: 106.6416,
    },
    areaServed: SITE_METADATA.areasServed.map((area) => ({
      '@type': 'AdministrativeArea',
      name: area,
    })),
    sameAs: [SITE_METADATA.instagramUrl],
  };

  const websiteNode = {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'CHESTAADOTCOM',
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: inLang,
  };

  const foundersNodes = [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#founder-chesta-azka`,
      name: 'Chesta Azka',
      jobTitle:
        locale === 'en'
          ? 'Co-Founder — Architecture, Product, and Technology'
          : 'Co-Founder — Arsitektur, Produk, dan Teknologi',
      worksFor: { '@id': `${SITE_URL}/#organization` },
      url: `${SITE_URL}/about`,
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#founder-zeeshan`,
      name: 'Zeeshan',
      jobTitle:
        locale === 'en'
          ? 'Co-Founder — Operations and Client Success'
          : 'Co-Founder — Operasional dan Client Success',
      worksFor: { '@id': `${SITE_URL}/#organization` },
      url: `${SITE_URL}/about`,
    },
  ];

  const servicesNodes = allServices.map((rawService) => {
    const s = getLocalizedService(rawService.slug, locale) || rawService;
    const srvUrl =
      locale === 'en'
        ? `${SITE_URL}/eng/jasa/${s.slug}`
        : `${SITE_URL}/jasa/${s.slug}`;
    return {
      '@type': 'Service',
      '@id': `${SITE_URL}/jasa/${s.slug}#service`,
      name: s.title,
      url: srvUrl,
      provider: { '@id': `${SITE_URL}/#organization` },
      areaServed: SITE_METADATA.areasServed.map((area) => ({
        '@type': 'AdministrativeArea',
        name: area,
      })),
      description: s.summary,
      offers:
        s.pricingNote.startingPriceNumeric !== undefined
          ? {
              '@type': 'Offer',
              price: String(s.pricingNote.startingPriceNumeric),
              priceCurrency: 'IDR',
              description: s.pricingNote.label,
              url: srvUrl,
            }
          : {
              '@type': 'Offer',
              description: `${s.pricingNote.label} — ${s.pricingNote.reason}`,
              url: srvUrl,
            },
    };
  });

  const graph: any[] = [
    organizationNode,
    localBusinessNode,
    websiteNode,
    ...foundersNodes,
    ...servicesNodes,
  ];

  // Specific Graph Nodes for /jasa/:serviceSlug/:areaSlug or /jasa/:slug
  const areaMatch = pathname.match(/^\/(jasa|layanan|services)\/([^/]+)\/([^/]+)$/i);
  if (areaMatch) {
    const service = getLocalizedService(areaMatch[2], locale);
    const areaPage = service
      ? getLocalizedServiceAreaPage(service.slug, areaMatch[3].toLowerCase(), locale)
      : undefined;
    if (service && areaPage) {
      graph.push({
        '@type': 'Service',
        '@id': `${canonicalUrl}#service`,
        name:
          locale === 'en'
            ? `${areaPage.serviceName} in ${areaPage.areaName}`
            : `${areaPage.serviceName} di ${areaPage.areaName}`,
        description: areaPage.quickSummary,
        url: canonicalUrl,
        provider: { '@id': `${SITE_URL}/#organization` },
        isRelatedTo: { '@id': `${SITE_URL}/jasa/${service.slug}#service` },
        areaServed: {
          '@type': 'AdministrativeArea',
          name: areaPage.areaName,
        },
        offers:
          service.pricingNote.startingPriceNumeric !== undefined
            ? {
                '@type': 'Offer',
                price: String(service.pricingNote.startingPriceNumeric),
                priceCurrency: 'IDR',
                description: areaPage.priceNote.startingPrice,
                url: canonicalUrl,
              }
            : {
                '@type': 'Offer',
                description: `${areaPage.priceNote.startingPrice} — ${areaPage.priceNote.note}`,
                url: canonicalUrl,
              },
      });

      const faqNode = buildFaqSchemaNode(areaPage.faqs, `${canonicalUrl}#faq`);
      if (faqNode) {
        graph.push(faqNode);
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
      const faqNode = buildFaqSchemaNode(service.faq, `${canonicalUrl}#faq`);
      if (faqNode) {
        graph.push(faqNode);
      }
    }
  }

  // Specific Graph Nodes for /portfolio Hub
  if (pathname === '/portfolio') {
    const seoRoute =
      locale === 'en'
        ? ENGLISH_ROUTES_SEO['/portfolio']
        : ROUTES_SEO_MAP['/portfolio'];
    graph.push({
      '@type': 'CollectionPage',
      '@id': `${canonicalUrl}#collection`,
      url: canonicalUrl,
      name: seoRoute.title,
      description: seoRoute.description,
      inLanguage: inLang,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: allProjects.map((proj, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          url: `${SITE_URL}/portfolio/${proj.slug}`,
          name: proj.title,
          description: proj.oneLiner,
        })),
      },
    });
  }

  // Specific Graph Nodes for /portfolio/:slug Detail
  if (pathname.startsWith('/portfolio/')) {
    const slug = pathname.replace('/portfolio/', '').trim();
    const project = getProjectBySlug(slug);
    if (project) {
      const coverAsset =
        SITE_IMAGES[project.cover as keyof typeof SITE_IMAGES] || SITE_IMAGES.ogDefault;
      const isSoftwareApp =
        project.category === 'software' || project.category === 'ai-agent';

      graph.push({
        '@type': isSoftwareApp ? ['CreativeWork', 'SoftwareApplication'] : 'CreativeWork',
        '@id': `${canonicalUrl}#work`,
        name: project.title,
        headline: project.title,
        description: project.oneLiner,
        url: canonicalUrl,
        image: toAbsoluteImageUrl(coverAsset.src),
        dateCreated: project.year,
        dateModified: project.updatedAt,
        inLanguage: inLang,
        genre: project.categoryLabel,
        keywords: [...project.stack, project.industry, project.categoryLabel].join(', '),
        creator: { '@id': `${SITE_URL}/#organization` },
        ...(isSoftwareApp
          ? {
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web, WhatsApp Cloud API',
            }
          : {}),
      });
    }
  }

  // Specific Graph Nodes for /case-studies Hub
  if (pathname === '/case-studies') {
    const seoRoute =
      locale === 'en'
        ? ENGLISH_ROUTES_SEO['/case-studies']
        : ROUTES_SEO_MAP['/case-studies'];
    graph.push({
      '@type': 'CollectionPage',
      '@id': `${canonicalUrl}#collection`,
      url: canonicalUrl,
      name: seoRoute.title,
      description: seoRoute.description,
      inLanguage: inLang,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: allCaseStudies.map((cs, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          url: `${SITE_URL}/case-studies/${cs.slug}`,
          name: cs.title,
          description: `${cs.summary.problem} ${cs.summary.result}`,
        })),
      },
    });
  }

  // Specific Graph Nodes for /case-studies/:slug Detail
  if (pathname.startsWith('/case-studies/')) {
    const slug = pathname.replace('/case-studies/', '').trim();
    const study = getCaseStudyBySlug(slug);
    if (study) {
      const coverAsset =
        SITE_IMAGES[study.cover as keyof typeof SITE_IMAGES] || SITE_IMAGES.ogDefault;
      graph.push({
        '@type': 'Article',
        '@id': `${canonicalUrl}#article`,
        headline: study.title,
        description:
          study.seo.description ||
          `Masalah: ${study.summary.problem} Solusi: ${study.summary.solution} Hasil: ${study.summary.result}`,
        url: canonicalUrl,
        image: toAbsoluteImageUrl(coverAsset.src),
        datePublished: study.publishedAt,
        dateModified: study.updatedAt,
        inLanguage: inLang,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl,
        },
        author: [
          { '@id': `${SITE_URL}/#founder-chesta-azka` },
          { '@id': `${SITE_URL}/#founder-zeeshan` },
        ],
        publisher: { '@id': `${SITE_URL}/#organization` },
        about: [
          { '@type': 'Thing', name: study.industry },
          ...study.services.map((sName) => ({ '@type': 'Thing', name: sName })),
        ],
      });
    }
  }

  // Specific Graph Nodes for Blog Index (/blog) & Category (/blog/kategori/:category)
  if (pathname === '/blog' || pathname.startsWith('/blog/kategori/')) {
    const allPosts = getPublishedBlogPosts(locale);
    const catSlug = pathname.startsWith('/blog/kategori/')
      ? pathname.replace('/blog/kategori/', '').trim()
      : '';
    const catMeta = catSlug ? getBlogCategoryBySlug(catSlug, locale) : undefined;
    const listPosts = catMeta
      ? getBlogPostsByCategorySlug(catMeta.slug, locale)
      : allPosts;

    graph.push({
      '@type': 'Blog',
      '@id': `${canonicalUrl}#blog`,
      url: canonicalUrl,
      name: catMeta
        ? locale === 'en'
          ? `${catMeta.shortLabel} Notes — CHESTAADOTCOM Blog`
          : `Catatan ${catMeta.shortLabel} — Blog CHESTAADOTCOM`
        : locale === 'en'
          ? 'Notes from Our Team — CHESTAADOTCOM Blog'
          : 'Catatan dari Kami — Blog CHESTAADOTCOM',
      description: catMeta
        ? catMeta.description
        : locale === 'en'
          ? ENGLISH_ROUTES_SEO['/blog'].description
          : ROUTES_SEO_MAP['/blog'].description,
      inLanguage: inLang,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      publisher: { '@id': `${SITE_URL}/#organization` },
      blogPost: listPosts.map((p) => {
        const postPrefix = p.locale === 'en' ? '/eng' : '';
        const postUrl = `${SITE_URL}${postPrefix}/blog/${p.slug}`;
        return {
          '@type': 'BlogPosting',
          '@id': `${postUrl}#article`,
          headline: p.title,
          url: postUrl,
          datePublished: p.date,
          dateModified: p.updatedAt || p.date,
          author: {
            '@type': 'Person',
            name: getAuthorProfile(p.author, p.locale || locale).name,
          },
        };
      }),
    });
  }

  // Specific Graph Nodes for Blog Post (/blog/:slug)
  if (pathname.startsWith('/blog/') && !pathname.startsWith('/blog/kategori/')) {
    const slug = pathname.replace('/blog/', '').trim();
    const post = getBlogPostBySlug(slug, locale);

    if (post) {
      const postLocale = post.locale || locale;
      const authorProfile = getAuthorProfile(post.author, postLocale);
      const blogPostingNode: any = {
        '@type': 'BlogPosting',
        '@id': `${canonicalUrl}#article`,
        headline: post.title,
        description: post.metaDescription,
        url: canonicalUrl,
        inLanguage: postLocale === 'en' ? 'en' : 'id-ID',
        wordCount: post.wordCount,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl,
        },
        image: toAbsoluteImageUrl(post.cover),
        author: {
          '@type': 'Person',
          name: authorProfile.name,
          jobTitle: authorProfile.role,
          url: postLocale === 'en' ? `${SITE_URL}/eng/about` : `${SITE_URL}/about`,
        },
        publisher: { '@id': `${SITE_URL}/#organization` },
        datePublished: post.date,
        dateModified: post.updatedAt || post.date,
        articleSection: post.category,
        keywords: post.tags ? post.tags.join(', ') : undefined,
      };
      graph.push(blogPostingNode);

      const faqNode = buildFaqSchemaNode(post.faq, `${canonicalUrl}#faq`);
      if (faqNode) {
        graph.push(faqNode);
      }
    }
  } else if (pathname === '/' || pathname === '') {
    const faqs = locale === 'en' ? ENGLISH_HOME_FAQS : HOME_FAQS;
    const homeFaqNode = buildFaqSchemaNode(faqs, `${canonicalUrl}#faq`);
    if (homeFaqNode) {
      graph.push(homeFaqNode);
    }
  }

  // Breadcrumbs (never include inLanguage on BreadcrumbList)
  const homeLabel = locale === 'en' ? 'Home' : 'Beranda';
  const homeItemUrl = locale === 'en' ? `${SITE_URL}/eng` : SITE_URL;
  const breadcrumbItems = [
    { '@type': 'ListItem', position: 1, name: homeLabel, item: homeItemUrl },
  ];

  if (areaMatch) {
    const service = getLocalizedService(areaMatch[2], locale);
    const areaPage = service
      ? getLocalizedServiceAreaPage(service.slug, areaMatch[3].toLowerCase(), locale)
      : undefined;
    if (service && areaPage) {
      const serviceItemUrl =
        locale === 'en'
          ? `${SITE_URL}/eng/jasa/${service.slug}`
          : `${SITE_URL}/jasa/${service.slug}`;
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: service.title,
        item: serviceItemUrl,
      });
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 3,
        name: areaPage.areaName,
        item: canonicalUrl,
      });
    }
  } else if (
    pathname.startsWith('/jasa/') ||
    pathname.startsWith('/layanan/') ||
    pathname.startsWith('/services/')
  ) {
    const slug = pathname.replace(/^\/(jasa|layanan|services)\//, '').trim();
    const service = getLocalizedService(slug, locale);
    if (service) {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: service.title,
        item: canonicalUrl,
      });
    }
  } else if (pathname === '/portfolio') {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: locale === 'en' ? 'Portfolio' : 'Portofolio',
      item: canonicalUrl,
    });
  } else if (pathname.startsWith('/portfolio/')) {
    const slug = pathname.replace('/portfolio/', '').trim();
    const project = getProjectBySlug(slug);
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: locale === 'en' ? 'Portfolio' : 'Portofolio',
      item: locale === 'en' ? `${SITE_URL}/eng/portfolio` : `${SITE_URL}/portfolio`,
    });
    if (project) {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 3,
        name: project.title,
        item: canonicalUrl,
      });
    }
  } else if (pathname === '/case-studies') {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: locale === 'en' ? 'Case Studies' : 'Studi Kasus',
      item: canonicalUrl,
    });
  } else if (pathname.startsWith('/case-studies/')) {
    const slug = pathname.replace('/case-studies/', '').trim();
    const study = getCaseStudyBySlug(slug);
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: locale === 'en' ? 'Case Studies' : 'Studi Kasus',
      item:
        locale === 'en' ? `${SITE_URL}/eng/case-studies` : `${SITE_URL}/case-studies`,
    });
    if (study) {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 3,
        name: study.title,
        item: canonicalUrl,
      });
    }
  } else if (pathname === '/blog') {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: 'Blog',
      item: canonicalUrl,
    });
  } else if (pathname.startsWith('/blog/kategori/')) {
    const catSlug = pathname.replace('/blog/kategori/', '').trim();
    const catMeta = getBlogCategoryBySlug(catSlug, locale);
    const blogItemUrl = locale === 'en' ? `${SITE_URL}/eng/blog` : `${SITE_URL}/blog`;
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: 'Blog',
      item: blogItemUrl,
    });
    if (catMeta) {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 3,
        name: catMeta.shortLabel,
        item: canonicalUrl,
      });
    }
  } else if (pathname.startsWith('/blog/')) {
    const slug = pathname.replace('/blog/', '').trim();
    const post = getBlogPostBySlug(slug, locale);
    const postLocale = post?.locale || locale;
    const blogItemUrl =
      postLocale === 'en' ? `${SITE_URL}/eng/blog` : `${SITE_URL}/blog`;
    const catPrefix = postLocale === 'en' ? '/eng' : '';
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: 'Blog',
      item: blogItemUrl,
    });
    if (post) {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 3,
        name: post.category,
        item: `${SITE_URL}${catPrefix}/blog/kategori/${post.categorySlug}`,
      });
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 4,
        name: post.title,
        item: canonicalUrl,
      });
    }
  } else if (pathname !== '/' && pathname !== '') {
    const segName = pathname.slice(1).replace(/-/g, ' ');
    const formatted = segName.charAt(0).toUpperCase() + segName.slice(1);
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: formatted,
      item: canonicalUrl,
    });
  }

  graph.push({
    '@type': 'BreadcrumbList',
    '@id': `${canonicalUrl}#breadcrumb`,
    itemListElement: breadcrumbItems,
  });

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

  // Mark legacy doorway/programmatic routes as noindex if accessed directly
  const isLegacyProgrammatic =
    pathname.startsWith('/area/') ||
    pathname.startsWith('/industri/') ||
    /^\/services\/[^/]+\/[^/]+$/i.test(pathname);

  // 1A. Service Area Detail (/jasa/:serviceSlug/:areaSlug)
  const areaMatch = pathname.match(/^\/(jasa|layanan|services)\/([^/]+)\/([^/]+)$/i);
  if (areaMatch && !isLegacyProgrammatic) {
    const service = getLocalizedService(areaMatch[2], locale);
    const areaPage = service
      ? getLocalizedServiceAreaPage(service.slug, areaMatch[3].toLowerCase(), locale)
      : undefined;
    if (service && areaPage) {
      const ogImg = `${SITE_URL}/api/og?title=${encodeURIComponent(
        areaPage.h1
      )}&category=${encodeURIComponent(
        `${areaPage.serviceName} · ${areaPage.areaName}`
      )}`;
      return {
        title: areaPage.metaTitle,
        description: areaPage.metaDescription,
        image: ogImg,
        url: canonicalUrl,
        type: 'website',
        locale,
        modifiedTime: areaPage.updatedAt,
        noindex: !areaPage.indexable,
        alternates,
        jsonLd: structuredData,
      };
    }
  }

  // 1B. Service Detail (/jasa/:slug)
  if (
    (pathname.startsWith('/jasa/') ||
      pathname.startsWith('/layanan/') ||
      pathname.startsWith('/services/')) &&
    !isLegacyProgrammatic
  ) {
    const slug = pathname.replace(/^\/(jasa|layanan|services)\//, '').trim();
    const service = getLocalizedService(slug, locale);
    if (service) {
      const imgAsset =
        SITE_IMAGES[service.imageKey as keyof typeof SITE_IMAGES] || SITE_IMAGES.ogDefault;
      return {
        title: service.seo.title,
        description: service.seo.description,
        image: toAbsoluteImageUrl(imgAsset.src),
        url: canonicalUrl,
        type: 'website',
        locale,
        alternates,
        jsonLd: structuredData,
      };
    }
  }

  // 2. Portfolio Project Detail (/portfolio/:slug)
  if (pathname.startsWith('/portfolio/')) {
    const slug = pathname.replace('/portfolio/', '').trim();
    const project = getProjectBySlug(slug);
    if (project) {
      const imgAsset =
        SITE_IMAGES[project.cover as keyof typeof SITE_IMAGES] || SITE_IMAGES.ogDefault;
      return {
        title: project.seo.title,
        description: project.seo.description,
        image: toAbsoluteImageUrl(imgAsset.src),
        url: canonicalUrl,
        type: 'website',
        locale,
        modifiedTime: project.updatedAt,
        alternates,
        jsonLd: structuredData,
      };
    }
  }

  // 2B. Case Study Detail (/case-studies/:slug)
  if (pathname.startsWith('/case-studies/')) {
    const slug = pathname.replace('/case-studies/', '').trim();
    const study = getCaseStudyBySlug(slug);
    if (study) {
      const imgAsset =
        SITE_IMAGES[study.cover as keyof typeof SITE_IMAGES] || SITE_IMAGES.ogDefault;
      const tldrDesc =
        study.seo.description ||
        `Masalah: ${study.summary.problem} Solusi: ${study.summary.solution} Hasil: ${study.summary.result}`;
      return {
        title: study.seo.title,
        description: tldrDesc,
        image: toAbsoluteImageUrl(imgAsset.src),
        url: canonicalUrl,
        type: 'article',
        locale,
        publishedTime: study.publishedAt,
        modifiedTime: study.updatedAt,
        authorName: 'Chesta Azka & Zeeshan',
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
            ? `${catMeta.shortLabel} Articles — Notes from Our Team | CHESTAADOTCOM`
            : `Artikel ${catMeta.shortLabel} — Catatan dari Kami | CHESTAADOTCOM`,
        description: catMeta.description,
        image: toAbsoluteImageUrl(SITE_IMAGES.ogDefault.src),
        url: canonicalUrl,
        type: 'website',
        locale,
        alternates,
        jsonLd: structuredData,
      };
    }
  }

  // 3B. Blog Post (/blog/:slug)
  if (pathname.startsWith('/blog/')) {
    const slug = pathname.replace('/blog/', '').trim();
    const post = getBlogPostBySlug(slug, locale);

    if (post) {
      const postLocale = post.locale || locale;
      const authorProfile = getAuthorProfile(post.author, postLocale);
      return {
        title: post.seoTitle || `${post.title} | CHESTAADOTCOM`,
        description: post.metaDescription || post.excerpt,
        image: toAbsoluteImageUrl(post.cover),
        url: canonicalUrl,
        type: 'article',
        locale: postLocale,
        publishedTime: post.date,
        modifiedTime: post.updatedAt || post.date,
        authorName: authorProfile.name,
        alternates,
        jsonLd: structuredData,
      };
    }
  }

  // 4. Known static routes (localized for EN or ID)
  const routeSeo =
    locale === 'en'
      ? ENGLISH_ROUTES_SEO[pathname] || ROUTES_SEO_MAP[pathname]
      : ROUTES_SEO_MAP[pathname];
  if (routeSeo) {
    return {
      title: routeSeo.title,
      description: routeSeo.description,
      image: toAbsoluteImageUrl(SITE_IMAGES.ogDefault.src),
      url: canonicalUrl,
      type: 'website',
      locale,
      noindex: isLegacyProgrammatic,
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
    url: canonicalUrl,
    type: 'website',
    locale,
    noindex: isLegacyProgrammatic,
    alternates,
    jsonLd: structuredData,
  };
}

export function getPrerenderedBodyHtml(rawUrl: string): string {
  const normalizedRaw = normalizePathname(rawUrl);
  const { locale, prefixMode, barePath } = parseLocalizedPath(normalizedRaw);
  const pathname = barePath;
  const posts = getPublishedBlogPosts();
  const projects = getPublishedProjects();
  const homeHref = toLocalizedHref('/', locale, prefixMode);

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
              <h3 class="text-lg font-bold text-[#17122B]">${escapeHtmlAttr(sc.title)}</h3>
              <p class="text-sm text-[#5B5675] mt-2"><strong>${locale === 'en' ? 'Challenge:' : 'Masalah:'}</strong> ${escapeHtmlAttr(sc.challenge)}</p>
              <p class="text-sm text-[#5B5675] mt-1"><strong>${locale === 'en' ? 'Solution:' : 'Solusi:'}</strong> ${escapeHtmlAttr(sc.solution)}</p>
              <p class="text-sm text-[#6A3FD0] mt-1"><strong>${locale === 'en' ? 'Impact:' : 'Dampak:'}</strong> ${escapeHtmlAttr(sc.expectedOutcome)}</p>
            </div>`
        )
        .join('\n');

      const collabHtml = areaPage.collaborationParagraphs
        .map((p) => `<p class="text-base text-[#5B5675] mb-3">${escapeHtmlAttr(p)}</p>`)
        .join('\n');

      const deliverablesHtml = areaPage.deliverablesSummary
        .map((d) => `<li class="mb-2">${escapeHtmlAttr(d)}</li>`)
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

      const siblingAreaLinks = getServiceAreasByServiceSlug(areaPage.serviceSlug, true)
        .filter((p) => p.areaSlug !== areaPage.areaSlug)
        .map((p) => {
          const href = toLocalizedHref(
            `/jasa/${p.serviceSlug}/${p.areaSlug}`,
            locale,
            prefixMode
          );
          const label =
            locale === 'en'
              ? `${service.shortTitle} in ${p.areaName}`
              : `${service.shortTitle} di ${p.areaName}`;
          return `<li><a href="${escapeHtmlAttr(href)}">${escapeHtmlAttr(label)}</a></li>`;
        })
        .join('\n');

      const parentServiceHref = toLocalizedHref(
        `/jasa/${service.slug}`,
        locale,
        prefixMode
      );

      return `
        <main class="bg-[#FFFFFF] text-[#17122B] min-h-screen">
          <nav aria-label="Breadcrumb" class="max-w-4xl mx-auto px-6 pt-10 text-xs font-mono text-[#5B5675]">
            <a href="${escapeHtmlAttr(homeHref)}">${locale === 'en' ? 'Home' : 'Beranda'}</a> / <a href="${escapeHtmlAttr(parentServiceHref)}">${escapeHtmlAttr(
        service.shortTitle
      )}</a> / <span>${escapeHtmlAttr(areaPage.areaName)}</span>
          </nav>
          <article class="max-w-4xl mx-auto px-6 py-8">
            <h1 class="text-3xl sm:text-5xl font-bold mt-2">${escapeHtmlAttr(areaPage.h1)}</h1>
            <div class="mt-4 p-5 rounded-2xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)]">
              <p class="text-xs font-mono uppercase text-[#6A3FD0] mb-1">${locale === 'en' ? 'Quick Summary' : 'Ringkasan Singkat'}</p>
              <p class="text-base text-[#17122B] font-medium">${escapeHtmlAttr(
                areaPage.quickSummary
              )}</p>
            </div>
            <section class="mt-8">
              <h2 class="text-2xl font-bold mb-4">${escapeHtmlAttr(
                areaPage.localContextHeading
              )}</h2>
              ${contextHtml}
              <h3 class="text-lg font-bold mt-6 mb-3">${
                locale === 'en'
                  ? `Businesses in ${escapeHtmlAttr(areaPage.areaName)} that most frequently need this service`
                  : `Jenis bisnis di ${escapeHtmlAttr(areaPage.areaName)} yang paling sering membutuhkan layanan ini`
              }</h3>
              <ul class="list-disc pl-5 text-sm text-[#5B5675]">${mixHtml}</ul>
            </section>
            <section class="mt-8">
              <h2 class="text-2xl font-bold mb-4">${
                locale === 'en'
                  ? `Implementation Scenarios in ${escapeHtmlAttr(areaPage.areaName)}`
                  : `Skenario Implementasi di ${escapeHtmlAttr(areaPage.areaName)}`
              }</h2>
              ${scenariosHtml}
            </section>
            <section class="mt-8">
              <h2 class="text-2xl font-bold mb-3">${escapeHtmlAttr(
                areaPage.collaborationHeading
              )}</h2>
              ${collabHtml}
            </section>
            <section class="mt-8">
              <h2 class="text-2xl font-bold mb-3">${
                locale === 'en'
                  ? 'Deliverables Scope & Pricing'
                  : 'Cakupan Deliverables &amp; Harga'
              }</h2>
              <ul class="list-disc pl-5 text-sm text-[#5B5675] mb-4">${deliverablesHtml}</ul>
              <p class="text-lg font-bold text-[#6A3FD0]">${escapeHtmlAttr(
                areaPage.priceNote.startingPrice
              )} (${escapeHtmlAttr(areaPage.priceNote.timeline)})</p>
              <p class="text-sm text-[#5B5675] mt-1">${escapeHtmlAttr(areaPage.priceNote.note)}</p>
              <p class="text-sm mt-3"><a href="${escapeHtmlAttr(
                parentServiceHref
              )}" class="text-[#6A3FD0] underline">${
        locale === 'en'
          ? `Back to main ${escapeHtmlAttr(service.title)} page`
          : `Kembali ke halaman induk ${escapeHtmlAttr(service.title)}`
      }</a></p>
            </section>
            <section class="mt-8">
              <h2 class="text-2xl font-bold mb-4">FAQ ${escapeHtmlAttr(
                service.shortTitle
              )} ${locale === 'en' ? 'in' : 'di'} ${escapeHtmlAttr(areaPage.areaName)}</h2>
              ${faqHtml}
            </section>
            <section class="mt-8">
              <h2 class="text-xl font-bold mb-3">${
                locale === 'en' ? 'Nearby Areas' : 'Area Terdekat'
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

      const indexableAreasHtml = getServiceAreasByServiceSlug(service.slug, true)
        .map((a) => {
          const href = toLocalizedHref(
            `/jasa/${a.serviceSlug}/${a.areaSlug}`,
            locale,
            prefixMode
          );
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
            <span class="text-xs font-mono text-[#6A3FD0]">${escapeHtmlAttr(
              service.tagline
            )} · ${escapeHtmlAttr(service.pricingNote.label)}</span>
            <h1 class="text-3xl sm:text-5xl font-bold mt-2">${escapeHtmlAttr(service.title)}</h1>
            <p class="text-lg text-[#17122B] mt-3">${escapeHtmlAttr(service.shortPromise)}</p>
            <p class="text-base text-[#5B5675] mt-3">${escapeHtmlAttr(service.summary)}</p>
            <section class="mt-8">
              <h2 class="text-2xl font-bold mb-4">${
                locale === 'en' ? 'What You Receive' : 'Yang Kamu Dapat'
              }</h2>
              <ul class="list-disc pl-5 text-sm text-[#5B5675]">${deliverablesHtml}</ul>
            </section>
            <section class="mt-8">
              <h2 class="text-2xl font-bold mb-2">${
                locale === 'en' ? 'Pricing & Scope' : 'Harga &amp; Scope'
              }</h2>
              <p class="text-base font-semibold text-[#6A3FD0]">${escapeHtmlAttr(
                service.pricingNote.label
              )}</p>
              <p class="text-sm text-[#5B5675] mt-1">${escapeHtmlAttr(
                service.pricingNote.reason
              )}</p>
            </section>
            <section class="mt-8">
              <h2 class="text-2xl font-bold mb-4">FAQ ${escapeHtmlAttr(service.shortTitle)}</h2>
              ${faqHtml}
            </section>
            ${
              indexableAreasHtml
                ? `<section class="mt-8"><h2 class="text-xl font-bold mb-3">${
                    locale === 'en' ? 'Service Areas for' : 'Area Layanan'
                  } ${escapeHtmlAttr(
                    service.shortTitle
                  )}</h2><ul class="list-disc pl-5 text-sm text-[#6A3FD0]">${indexableAreasHtml}</ul></section>`
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
    const project = getProjectBySlug(slug);
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
          <nav aria-label="Breadcrumb" class="max-w-4xl mx-auto px-6 pt-10 text-xs font-mono text-[#5B5675]">
            <a href="/">Beranda</a> / <a href="/portfolio">Portofolio</a> / <span>${escapeHtmlAttr(
              project.title
            )}</span>
          </nav>
          <article class="max-w-4xl mx-auto px-6 py-8">
            <span class="text-xs font-mono text-[#6A3FD0]">${escapeHtmlAttr(
              project.categoryLabel
            )} · ${escapeHtmlAttr(project.industry)}</span>
            <h1 class="text-3xl sm:text-5xl font-bold mt-2">${escapeHtmlAttr(project.title)}</h1>
            <p class="text-lg text-[#5B5675] mt-3">${escapeHtmlAttr(project.oneLiner)}</p>
            <section class="mt-8">
              <h2 class="text-2xl font-bold mb-3">Ringkasan Proyek</h2>
              <p class="text-base text-[#5B5675] mb-3">${escapeHtmlAttr(
                project.summaryParagraphs[0]
              )}</p>
              <p class="text-base text-[#5B5675]">${escapeHtmlAttr(
                project.summaryParagraphs[1]
              )}</p>
            </section>
            <section class="mt-8">
              <h2 class="text-2xl font-bold mb-4">Fitur Utama</h2>
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
              proj.categoryLabel
            )} · ${escapeHtmlAttr(proj.industry)} · ${escapeHtmlAttr(proj.year)}</span>
            <h2 class="text-xl font-bold mt-1"><a href="/portfolio/${escapeHtmlAttr(
              proj.slug
            )}">${escapeHtmlAttr(proj.title)}</a></h2>
            <p class="text-sm text-[#5B5675] mt-2">${escapeHtmlAttr(proj.oneLiner)}</p>
          </article>`
      )
      .join('\n');

    return `
      <main class="bg-[#FFFFFF] text-[#17122B] min-h-screen">
        <section class="max-w-5xl mx-auto px-6 py-16">
          <h1 class="text-3xl sm:text-5xl font-bold">Proyek yang sudah kami bangun</h1>
          <p class="text-base text-[#5B5675] mt-4">Tangkapan layar antarmuka web, AI agent WhatsApp, dan dashboard operasional yang kami rancang untuk berbagai industri di BSD City, Tangerang Selatan, dan Jabodetabek.</p>
          <div class="mt-10">${projectsListHtml}</div>
        </section>
      </main>
    `;
  }

  // Case Study Detail (/case-studies/:slug)
  if (pathname.startsWith('/case-studies/')) {
    const slug = pathname.replace('/case-studies/', '').trim();
    const study = getCaseStudyBySlug(slug);
    if (study) {
      return `
        <main class="bg-[#FFFFFF] text-[#17122B] min-h-screen">
          <nav aria-label="Breadcrumb" class="max-w-4xl mx-auto px-6 pt-10 text-xs font-mono text-[#5B5675]">
            <a href="/">Beranda</a> / <a href="/case-studies">Studi Kasus</a> / <span>${escapeHtmlAttr(
              study.title
            )}</span>
          </nav>
          <article class="max-w-4xl mx-auto px-6 py-8">
            <span class="text-xs font-mono text-[#6A3FD0]">${escapeHtmlAttr(
              study.industry
            )} · ${escapeHtmlAttr(study.services.join(', '))}</span>
            <h1 class="text-3xl sm:text-5xl font-bold mt-2">${escapeHtmlAttr(study.title)}</h1>
            <p class="text-lg text-[#5B5675] mt-3">${escapeHtmlAttr(
              study.oneSentenceSummary
            )}</p>
            <section class="mt-6 p-6 rounded-2xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)]">
              <h2 class="text-xl font-bold mb-3">Ringkasan Eksekutif (TL;DR)</h2>
              <p class="mb-2"><strong>Masalah:</strong> ${escapeHtmlAttr(study.summary.problem)}</p>
              <p class="mb-2"><strong>Yang dibangun:</strong> ${escapeHtmlAttr(
                study.summary.solution
              )}</p>
              <p><strong>Hasil:</strong> ${escapeHtmlAttr(study.summary.result)}</p>
            </section>
          </article>
        </main>
      `;
    }
  }

  // Case Studies Hub (/case-studies)
  if (pathname === '/case-studies') {
    const caseStudies = getPublishedCaseStudies();
    const studiesListHtml = caseStudies
      .map(
        (cs) =>
          `<article class="mb-6 p-6 rounded-2xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)]">
            <span class="text-xs font-mono text-[#6A3FD0]">${escapeHtmlAttr(
              cs.industry
            )} · ${escapeHtmlAttr(cs.year)}</span>
            <h2 class="text-xl font-bold mt-1"><a href="/case-studies/${escapeHtmlAttr(
              cs.slug
            )}">${escapeHtmlAttr(cs.title)}</a></h2>
            <p class="text-sm text-[#5B5675] mt-2"><strong>Masalah:</strong> ${escapeHtmlAttr(
              cs.summary.problem
            )} → <strong>Hasil:</strong> ${escapeHtmlAttr(cs.summary.result)}</p>
          </article>`
      )
      .join('\n');

    return `
      <main class="bg-[#FFFFFF] text-[#17122B] min-h-screen">
        <section class="max-w-5xl mx-auto px-6 py-16">
          <h1 class="text-3xl sm:text-5xl font-bold">Cerita di balik proyeknya</h1>
          <p class="text-base text-[#5B5675] mt-4">Bukan sekadar tangkapan layar, melainkan catatan jujur bagaimana kami membedah masalah operasional, memilih kompromi teknis, dan menguji hasilnya di lapangan.</p>
          <div class="mt-10">${studiesListHtml}</div>
        </section>
      </main>
    `;
  }

  // Blog Post (/blog/:slug)
  if (pathname.startsWith('/blog/') && !pathname.startsWith('/blog/kategori/')) {
    const slug = pathname.replace('/blog/', '').trim();
    const post = getBlogPostBySlug(slug, locale);

    if (post) {
      const postLocale = post.locale || locale;
      const isEnPost = postLocale === 'en';
      const authorProfile = getAuthorProfile(post.author, postLocale);
      const renderedArticleHtml = renderBlogPostHtml(post);
      const blogHubUrl = toLocalizedHref('/blog', postLocale, prefixMode);
      const catUrl = toLocalizedHref(
        `/blog/kategori/${post.categorySlug}`,
        postLocale,
        prefixMode
      );
      return `
        <main class="bg-[#FFFFFF] text-[#17122B] min-h-screen">
          <nav aria-label="Breadcrumb" class="max-w-4xl mx-auto px-6 pt-10 text-xs font-mono text-[#5B5675]">
            <a href="${escapeHtmlAttr(homeHref)}">${isEnPost ? 'Home' : 'Beranda'}</a> / <a href="${escapeHtmlAttr(blogHubUrl)}">Blog</a> / <a href="${escapeHtmlAttr(
        catUrl
      )}">${escapeHtmlAttr(post.category)}</a> / <span>${escapeHtmlAttr(post.title)}</span>
          </nav>
          <article class="max-w-4xl mx-auto px-6 py-8">
            <header class="mb-8">
              <span class="text-xs font-mono text-[#6A3FD0]">${escapeHtmlAttr(post.category)} · ${escapeHtmlAttr(post.readTime)}</span>
              <h1 class="text-3xl sm:text-5xl font-bold mt-3">${escapeHtmlAttr(post.title)}</h1>
              <div class="mt-4 p-5 rounded-2xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)]">
                <p class="text-xs font-mono uppercase text-[#6A3FD0] mb-1">${
                  isEnPost ? 'Quick Summary' : 'Ringkasan Singkat'
                }</p>
                <p class="text-base text-[#17122B] font-medium">${escapeHtmlAttr(
                  post.excerpt
                )}</p>
              </div>
              <div class="mt-4 pt-4 border-t border-[rgba(91,60,196,0.1)] text-xs text-[#5B5675]">
                <span>${isEnPost ? 'By' : 'Oleh'} ${escapeHtmlAttr(authorProfile.name)} (${escapeHtmlAttr(
        authorProfile.role
      )})</span> · <span>${isEnPost ? 'Updated' : 'Diperbarui'} ${escapeHtmlAttr(post.updatedAt || post.date)}</span>
              </div>
            </header>
            <div class="prose max-w-none text-[#17122B] leading-relaxed">
              ${renderedArticleHtml}
            </div>
            <div class="mt-12 p-8 rounded-3xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] text-center">
              <h2 class="text-2xl font-bold">${escapeHtmlAttr(post.serviceLink.title)}</h2>
              <p class="text-sm text-[#5B5675] mt-2">${escapeHtmlAttr(
                post.serviceLink.description
              )}</p>
              <p class="mt-4"><a href="${escapeHtmlAttr(
                post.serviceLink.href
              )}" class="inline-block px-6 py-3 rounded-full bg-[#6A3FD0] text-white font-bold text-sm">${escapeHtmlAttr(
        post.serviceLink.label
      )}</a></p>
            </div>
          </article>
        </main>
      `;
    }
  }

  // Blog Hub (/blog & /blog/kategori/:category)
  if (pathname === '/blog' || pathname.startsWith('/blog/kategori/')) {
    const catSlug = pathname.startsWith('/blog/kategori/')
      ? pathname.replace('/blog/kategori/', '').trim()
      : '';
    const catMeta = catSlug ? getBlogCategoryBySlug(catSlug, locale) : undefined;
    const localizedPosts = getPublishedBlogPosts(locale);
    const listPosts = catMeta
      ? getBlogPostsByCategorySlug(catMeta.slug, locale)
      : localizedPosts;

    const postListHtml = listPosts
      .map((p) => {
        const postHref = toLocalizedHref(`/blog/${p.slug}`, locale, prefixMode);
        return `<article class="mb-8 p-6 rounded-2xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.12)]">
            <span class="text-xs font-mono text-[#6A3FD0]">${escapeHtmlAttr(p.category)} · ${escapeHtmlAttr(p.readTime)}</span>
            <h2 class="text-xl font-bold mt-2"><a href="${escapeHtmlAttr(postHref)}" class="text-[#17122B] hover:text-[#6A3FD0]">${escapeHtmlAttr(
          p.title
        )}</a></h2>
            <p class="text-sm text-[#5B5675] mt-2">${escapeHtmlAttr(p.excerpt)}</p>
          </article>`;
      })
      .join('\n');

    return `
      <main class="bg-[#FFFFFF] text-[#17122B] min-h-screen">
        <section class="max-w-6xl mx-auto px-6 py-16">
          <h1 class="text-3xl sm:text-5xl font-bold">${
            locale === 'en' ? 'Notes from our team' : 'Catatan dari kami'
          }</h1>
          <p class="text-base text-[#5B5675] mt-4">${escapeHtmlAttr(
            catMeta
              ? catMeta.description
              : locale === 'en'
                ? 'Practical breakdowns on custom software engineering, WhatsApp AI agents, Model Context Protocol (MCP), operational automation, and high-speed business websites.'
                : 'Bahasan praktis seputar rekayasa software custom, AI agent WhatsApp, otomasi operasional, dan pembuatan web untuk bisnis.'
          )}</p>
          <div class="mt-10">${postListHtml}</div>
        </section>
      </main>
    `;
  }

  // Default Homepage (/)
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
          <a href="/eng" class="font-bold text-lg text-[#17122B]">CHESTAADOTCOM</a>
          <nav aria-label="Main Navigation" class="flex flex-wrap gap-4 text-sm text-[#5B5675]">
            <a href="/eng/jasa/pembuatan-website">Website &amp; Landing Page</a>
            <a href="/eng/jasa/ai-agent">AI Agent</a>
            <a href="/eng/jasa/software-custom">Custom Software</a>
            <a href="/eng/jasa/otomasi-workflow">Workflow Automation</a>
            <a href="/eng/portfolio">Projects</a>
            <a href="/eng/case-studies">Case Studies</a>
            <a href="/eng/blog">Blog</a>
            <a href="/eng/#cara-kerja">How It Works</a>
            <a href="/eng/#harga">Pricing</a>
            <a href="/eng/#faq">FAQ</a>
            <a href="${escapeHtmlAttr(langSwitchLinks.idUrl)}" hreflang="id-ID">ID</a>
            <a href="${escapeHtmlAttr(langSwitchLinks.enUrl)}" hreflang="en">EN</a>
          </nav>
        </header>
        <section class="max-w-6xl mx-auto px-6 py-16">
          <h1 class="text-4xl sm:text-6xl font-bold leading-tight">Custom software and AI agents that take over repetitive work in your business.</h1>
          <p class="text-lg text-[#5B5675] mt-5 max-w-2xl">WhatsApp chats answered manually, data copied between spreadsheets, follow-ups forgotten. We build the system so it runs on its own, letting your team focus on work that truly requires a human.</p>
          <p class="mt-6"><a href="${SITE_METADATA.whatsappUrl}" class="inline-block px-6 py-3 rounded-full bg-[#6A3FD0] text-white font-bold text-sm">Free consultation via WhatsApp</a></p>
        </section>
        <section id="layanan" class="max-w-6xl mx-auto px-6 py-12">
          <h2 class="text-3xl font-bold mb-6">What we build for your business</h2>
          <ul class="space-y-3 text-base text-[#17122B]">
            <li><a href="/eng/jasa/pembuatan-website">Website &amp; Landing Page</a> — Under 1.2s load time, starting at IDR 1,200,000</li>
            <li><a href="/eng/jasa/ai-agent">AI Agent</a> — 24/7 WhatsApp &amp; CRM AI agent</li>
            <li><a href="/eng/jasa/software-custom">Custom Software</a> — Internal web apps, client portals &amp; operational dashboards</li>
            <li><a href="/eng/jasa/otomasi-workflow">Workflow Automation</a> — Connect Sheets, forms, invoices &amp; WhatsApp automatically</li>
          </ul>
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
        <a href="${escapeHtmlAttr(homeHref)}" class="font-bold text-lg text-[#17122B]">CHESTAADOTCOM</a>
        <nav aria-label="Navigasi Utama" class="flex flex-wrap gap-4 text-sm text-[#5B5675]">
          <a href="${escapeHtmlAttr(toLocalizedHref('/jasa/pembuatan-website', locale, prefixMode))}">Jasa pembuatan website</a>
          <a href="${escapeHtmlAttr(toLocalizedHref('/jasa/ai-agent', locale, prefixMode))}">Jasa AI agent</a>
          <a href="${escapeHtmlAttr(toLocalizedHref('/jasa/software-custom', locale, prefixMode))}">Jasa software custom</a>
          <a href="${escapeHtmlAttr(toLocalizedHref('/jasa/otomasi-workflow', locale, prefixMode))}">Jasa otomasi workflow</a>
          <a href="${escapeHtmlAttr(toLocalizedHref('/portfolio', locale, prefixMode))}">Proyek</a>
          <a href="${escapeHtmlAttr(toLocalizedHref('/case-studies', locale, prefixMode))}">Case Study</a>
          <a href="${escapeHtmlAttr(toLocalizedHref('/blog', locale, prefixMode))}">Blog</a>
          <a href="${escapeHtmlAttr(toLocalizedHref('/#cara-kerja', locale, prefixMode))}">Cara Kerja</a>
          <a href="${escapeHtmlAttr(toLocalizedHref('/#harga', locale, prefixMode))}">Harga</a>
          <a href="${escapeHtmlAttr(toLocalizedHref('/#faq', locale, prefixMode))}">FAQ</a>
          <a href="${escapeHtmlAttr(langSwitchLinks.idUrl)}" hreflang="id-ID">ID</a>
          <a href="${escapeHtmlAttr(langSwitchLinks.enUrl)}" hreflang="en">EN</a>
        </nav>
      </header>
      <section class="max-w-6xl mx-auto px-6 py-16">
        <h1 class="text-4xl sm:text-6xl font-bold leading-tight">Software custom dan AI agent yang mengambil alih kerja berulang di bisnismu.</h1>
        <p class="text-lg text-[#5B5675] mt-5 max-w-2xl">Chat WhatsApp yang dibalas manual, data yang disalin dari sheet ke sheet, follow-up yang lupa dikirim. Kami bangun sistemnya supaya jalan sendiri, dan tim kamu fokus ke hal yang memang butuh manusia.</p>
        <p class="mt-6"><a href="${SITE_METADATA.whatsappUrl}" class="inline-block px-6 py-3 rounded-full bg-[#6A3FD0] text-white font-bold text-sm">Konsultasi gratis via WhatsApp</a></p>
      </section>
      <section id="layanan" class="max-w-6xl mx-auto px-6 py-12">
        <h2 class="text-3xl font-bold mb-6">Empat hal yang paling sering kami bangun</h2>
        <ul class="space-y-3 text-base text-[#17122B]">
          <li><a href="${escapeHtmlAttr(toLocalizedHref('/jasa/pembuatan-website', locale, prefixMode))}">Jasa pembuatan website</a> — Pembuatan Website &amp; Landing Page mulai Rp1.200.000</li>
          <li><a href="${escapeHtmlAttr(toLocalizedHref('/jasa/ai-agent', locale, prefixMode))}">Jasa AI agent</a> — AI Agent WhatsApp &amp; CRM 24/7</li>
          <li><a href="${escapeHtmlAttr(toLocalizedHref('/jasa/software-custom', locale, prefixMode))}">Jasa software custom</a> — Aplikasi Web &amp; Dashboard Operasional Internal</li>
          <li><a href="${escapeHtmlAttr(toLocalizedHref('/jasa/otomasi-workflow', locale, prefixMode))}">Jasa otomasi workflow</a> — Integrasi n8n, Spreadsheet, POS &amp; Notifikasi</li>
        </ul>
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
  const htmlLang = meta.locale === 'en' ? 'en' : 'id-ID';
  const ogLocale = meta.locale === 'en' ? 'en_US' : 'id_ID';

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

  // Replace <link rel="canonical"> and inject bidirectional hreflang links
  const hreflangTags = meta.alternates
    ? [
        `<link rel="canonical" href="${safeUrl}" />`,
        `<link rel="alternate" hreflang="id-ID" href="${escapeHtmlAttr(meta.alternates.idUrl)}" />`,
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

  // Replace Meta Robots if meta.noindex is true
  if (meta.noindex) {
    if (/<meta\s+name=["']robots["'][^>]*>/i.test(updatedHtml)) {
      updatedHtml = updatedHtml.replace(
        /<meta\s+name=["']robots["'][^>]*>/i,
        `<meta name="robots" content="noindex, nofollow" />`
      );
    } else if (/<\/head>/i.test(updatedHtml)) {
      updatedHtml = updatedHtml.replace(
        /<\/head>/i,
        `  <meta name="robots" content="noindex, nofollow" />\n  </head>`
      );
    }
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
    `<meta property="og:image" content="${safeImg}" />`
  );
  updatedHtml = updatedHtml.replace(
    /<meta\s+property=["']og:locale["'][^>]*>/i,
    `<meta property="og:locale" content="${ogLocale}" />`
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
    `<meta name="twitter:image" content="${safeImg}" />`
  );

  // Inject JSON-LD
  const jsonLdScript = `\n    <script type="application/ld+json">${JSON.stringify(
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

