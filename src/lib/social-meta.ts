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
  type ServiceSlug,
} from '../data/services';
import {
  getServiceAreaPage,
  getServiceAreasByServiceSlug,
  getServiceAreasByAreaSlug,
  getIndexableAreas,
  resolveUnifiedAreaPage,
  getUnifiedAreaPath,
  REGION_GROUPS,
} from '../data/service-areas';
import {
  getProjectBySlug,
  getPublishedProjects,
  getProjectsByServiceSlug,
} from '../data/projects';
import { getCaseStudyBySlug, getPublishedCaseStudies } from '../data/case-studies';
import {
  REAL_PROJECTS_EXPERIENCE,
  getRealProjectBySlug,
  getRealProjectHref,
  getRealProjectsByServiceSlug,
} from '../data/experience';
import { PROCESS_PHASES } from '../data/process';
import { PRICING_PACKAGES } from '../data/pricing';
import { HOME_FAQS, ROUTES_SEO_MAP, SITE_METADATA } from '../data/seo-metadata';
import { FAQ_THREADS } from '../data/faq';
import { SITE_IMAGES } from '../config/images';
import { SITE_URL } from './i18n';
import { buildFaqSchemaNode } from './seo/faqSchema';
import { getRouteOgPngPath } from './cover-generator';
import { buildWhatsAppLink } from './whatsapp';
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
 * Normalizes a title (50–62 chars) and description (150–160 chars) if slightly outside bounds,
 * and validates that every page strictly meets the 50–62 / 150–160 character limits.
 */
export function normalizeMetaLengths(
  rawTitle: string,
  rawDescription: string,
  locale: LocaleCode = 'id'
): { title: string; description: string } {
  let title = (rawTitle || '').trim();
  let description = (rawDescription || '').trim();

  // Calibrate title to 50–62 characters if needed
  if (title.length < 50) {
    const suffix =
      locale === 'en'
        ? ' — BSD, South Tangerang | CHESTAADOTCOM'
        : ' — BSD, Tangerang Selatan | CHESTAADOTCOM';
    if (!title.includes('CHESTAADOTCOM')) {
      title = `${title}${suffix}`;
    } else {
      title = title.replace(
        /\|\s*CHESTAADOTCOM$/,
        locale === 'en'
          ? 'in South Tangerang | CHESTAADOTCOM'
          : 'di Tangerang Selatan | CHESTAADOTCOM'
      );
    }
  }
  if (title.length > 62) {
    const withoutBrand = title.replace(/\s*\|\s*CHESTAADOTCOM$/i, '').trim();
    if (withoutBrand.length >= 34 && withoutBrand.length <= 46) {
      title = `${withoutBrand} | CHESTAADOTCOM`;
    } else {
      title = `${withoutBrand.slice(0, 45).trim().replace(/[,;:-]+$/, '')} | CHESTAADOTCOM`;
    }
  }

  // Calibrate description to 150–160 characters if needed (e.g. 140–149 chars from legacy 140–160 rule)
  if (description.length < 150) {
    const padCandidates =
      locale === 'en'
        ? [
            ' Free 30-min audit.',
            ' Free 30m audit.',
            ' Free audit.',
            ' In BSD & Tangsel.',
            ' In Tangsel.',
            ' Fast & clear.',
            ' Clear scope.',
            ' By our team.',
            ' No lock-in.',
            ' Read more.',
            ' Built fast.',
            ' Learn more.',
            ' See details.',
            ' Start today.',
            ' Contact us.',
            ' In BSD City.',
            ' For business.',
          ]
        : [
            ' Audit gratis 30 menit.',
            ' Konsultasi gratis.',
            ' Mulai audit gratis.',
            ' Di BSD & Tangsel.',
            ' Di Tangsel.',
            ' Cepat & transparan.',
            ' Cakupan jelas.',
            ' Tanpa biaya oculto.',
            ' Tanpa lock-in.',
            ' Baca selengkapnya.',
            ' Siap pakai.',
            ' Cek detailnya.',
            ' Hubungi kami.',
            ' Di BSD City.',
            ' Untuk bisnismu.',
          ];
    for (const pad of padCandidates) {
      const candidate = description.endsWith('.')
        ? `${description}${pad}`
        : `${description}.${pad}`;
      if (candidate.length >= 150 && candidate.length <= 160) {
        description = candidate;
        break;
      }
    }
    if (description.length < 150) {
      const filler =
        locale === 'en'
          ? ' Built by CHESTAADOTCOM in BSD, South Tangerang.'
          : ' Dibangun oleh CHESTAADOTCOM di BSD, Tangerang Selatan.';
      const combined = description.endsWith('.')
        ? `${description}${filler}`
        : `${description}.${filler}`;
      description = combined.slice(0, 158).trim();
      if (!description.endsWith('.')) {
        description = `${description.slice(0, 157).trim()}.`;
      }
    }
  } else if (description.length > 160) {
    const sliced = description.slice(0, 159).trim().replace(/[,;:-]+$/, '');
    description = sliced.endsWith('.') ? sliced : `${sliced}.`;
  }

  return { title, description };
}

/**
 * Validates that every page title is 50–62 characters
 * and meta description is 150–160 characters. Throws if out of range.
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
  if (descLen < 150 || descLen > 160) {
    throw new Error(
      `[SEO Meta Validation Error] Description for "${routeLabel}" is ${descLen} chars (must be 150–160): "${description}"`
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
  if (!imgPath || imgPath.toLowerCase().endsWith('.svg')) {
    return `${SITE_URL}/images/og/id/index.png`;
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
  const canonicalPathname = new URL(canonicalUrl).pathname;
  const routeOgPngUrl = toAbsoluteImageUrl(getRouteOgPngPath(canonicalPathname));
  const allProjects = getPublishedProjects(locale);
  const allCaseStudies = getPublishedCaseStudies(locale);

  // 1. Organization + ProfessionalService (#org) — NO street address, NO geo, NO plain-text email
  const orgNode = {
    '@type': ['Organization', 'ProfessionalService'],
    '@id': `${SITE_URL}/#org`,
    name: 'CHESTAADOTCOM',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/favicon.svg`,
    },
    telephone: '+62-821-2544-7232',
    sameAs: ['https://instagram.com/softwaredev.aiagentic.agency'],
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
  } else if (pathname.startsWith('/area/')) {
    const areaSlug = pathname.slice('/area/'.length).trim().toLowerCase();
    const unifiedArea = resolveUnifiedAreaPage(areaSlug, locale);
    const areasHubUrl = `${SITE_URL}${locale === 'en' ? '/en/areas' : '/id/area'}`;
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: locale === 'en' ? 'Areas' : 'Area',
      item: areasHubUrl,
    });
    if (unifiedArea) {
      pageName = unifiedArea.metaTitle;
      pageDesc = unifiedArea.metaDescription;
      pageModified = unifiedArea.updatedAt;
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 3,
        name: unifiedArea.name,
        item: canonicalUrl,
      });

      // Extend Organization/ProfessionalService areaServed with this area (City or AdministrativeArea)
      const areaServedNode = {
        '@type': unifiedArea.schemaType,
        name: unifiedArea.name,
      };
      const alreadyExists = orgNode.areaServed.some(
        (node) => node.name.toLowerCase() === unifiedArea.name.toLowerCase(),
      );
      if (!alreadyExists) {
        orgNode.areaServed = [...orgNode.areaServed, areaServedNode];
      }

      const faqNode = buildFaqSchemaNode(unifiedArea.faqs, `${canonicalUrl}#faq`);
      if (faqNode) {
        extraNodes.push(faqNode);
      }
    }
  } else if (pathname === '/portfolio') {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: locale === 'en' ? 'Projects' : 'Proyek',
      item: canonicalUrl,
    });
    const realProjectItems = REAL_PROJECTS_EXPERIENCE.map((rp, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      url: `${SITE_URL}${getRealProjectHref(rp, locale)}`,
      name: `${locale === 'en' ? rp.titleEn : rp.titleId} (${
        locale === 'en' ? rp.tagEn : rp.tagId
      })`,
      description: locale === 'en' ? rp.descriptionEn : rp.descriptionId,
    }));
    const sampleProjectItems = allProjects.map((proj, idx) => ({
      '@type': 'ListItem',
      position: realProjectItems.length + idx + 1,
      url: `${SITE_URL}/${locale}/portfolio/${proj.slug}`,
      name: `${proj.title} (${proj.badgeLabel})`,
      description: `${proj.oneLiner} ${proj.sampleNote}`,
    }));
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
        itemListElement: [...realProjectItems, ...sampleProjectItems],
      },
    });
  } else if (pathname.startsWith('/portfolio/')) {
    const slug = pathname.replace('/portfolio/', '').trim();
    const realProject = getRealProjectBySlug(slug);
    const project = getProjectBySlug(slug, locale);
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: locale === 'en' ? 'Projects' : 'Proyek',
      item: `${SITE_URL}/${locale}/portfolio`,
    });
    if (realProject) {
      const rpTitle = locale === 'en' ? realProject.titleEn : realProject.titleId;
      const rpDesc = locale === 'en' ? realProject.descriptionEn : realProject.descriptionId;
      const rpLabel =
        locale === 'en' ? realProject.confidentialLabelEn : realProject.confidentialLabelId;
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 3,
        name: rpTitle,
        item: canonicalUrl,
      });
      extraNodes.push({
        '@type': 'CreativeWork',
        '@id': `${canonicalUrl}#work`,
        name: `${rpTitle} (${rpLabel})`,
        headline: rpTitle,
        description: rpDesc,
        url: canonicalUrl,
        image: routeOgPngUrl,
        inLanguage: inLang,
        creator: { '@id': `${SITE_URL}/#org` },
      });
    } else if (project) {
      pageName = project.seo.title;
      pageDesc = project.seo.description;
      pageModified = project.updatedAt;
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 3,
        name: project.title,
        item: canonicalUrl,
      });
      extraNodes.push({
        '@type': 'CreativeWork',
        '@id': `${canonicalUrl}#work`,
        name: `${project.title} (${project.badgeLabel})`,
        headline: project.title,
        description: `${project.oneLiner} ${project.sampleNote}`,
        url: canonicalUrl,
        image: routeOgPngUrl,
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
      extraNodes.push({
        '@type': 'Article',
        '@id': `${canonicalUrl}#article`,
        headline: study.title,
        description: study.seo.description,
        url: canonicalUrl,
        image: routeOgPngUrl,
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
            ? `Blog on AI Agents & Web — Page ${slice.currentPage} | CHESTAADOTCOM`
            : `Blog AI Agent & Otomasi — Halaman ${slice.currentPage} | CHESTAADOTCOM`;
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
            ? 'Blog on AI Agents, Websites & Automation | CHESTAADOTCOM'
            : 'Blog AI Agent, Website & Otomasi Bisnis | CHESTAADOTCOM';
        pageDesc =
          locale === 'en'
            ? 'Practical engineering notes on AI agents, fast websites, and workflow automation for businesses in South Tangerang and Greater Jakarta by our co-founders.'
            : 'Panduan praktis dari Chesta Azka dan Zeeshan seputar software custom, AI agent WhatsApp, otomasi workflow, dan pembuatan website cepat di Tangerang Selatan.';
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
        url: routeOgPngUrl,
        width: 1200,
        height: 630,
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
            url: routeOgPngUrl,
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
  } else if (pathname === '/faq') {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: 'FAQ',
      item: canonicalUrl,
    });
    const faqItems = FAQ_THREADS.map((thread) => ({
      question: locale === 'en' ? thread.questionEn : thread.questionId,
      answer: locale === 'en' ? thread.answerEn : thread.answerId,
    }));
    const faqPageNode = buildFaqSchemaNode(faqItems, `${canonicalUrl}#faq`);
    if (faqPageNode) {
      extraNodes.push(faqPageNode);
    }
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
  const canonicalPathname = new URL(canonicalUrl).pathname;
  const routeOgPngUrl = toAbsoluteImageUrl(getRouteOgPngPath(canonicalPathname));
  const structuredData = buildStructuredDataGraph(normalizedRaw);
  const alternates = getHreflangAlternates(normalizedRaw, SITE_URL);

  // Helper to finalize and validate every route's meta
  const finalizeRouteMeta = (meta: RouteMeta, routeLabel: string): RouteMeta => {
    const calibrated = normalizeMetaLengths(
      meta.title,
      meta.description,
      meta.locale || locale
    );
    if (!meta.noindex) {
      validatePageMetaLengths(
        calibrated.title,
        calibrated.description,
        routeLabel
      );
    }
    return {
      ...meta,
      title: calibrated.title,
      description: calibrated.description,
    };
  };

  // 1A. Service Area Detail (/jasa/:serviceSlug/:areaSlug)
  const areaMatch = pathname.match(/^\/(jasa|layanan|services)\/([^/]+)\/([^/]+)$/i);
  if (areaMatch) {
    const service = getLocalizedService(areaMatch[2], locale);
    const areaPage = service
      ? getLocalizedServiceAreaPage(service.slug, areaMatch[3].toLowerCase(), locale)
      : undefined;
    if (service && areaPage) {
      const imgAsset =
        SITE_IMAGES[areaPage.ogImageKey as keyof typeof SITE_IMAGES] ||
        SITE_IMAGES[service.imageKey as keyof typeof SITE_IMAGES] ||
        SITE_IMAGES.ogDefault;
      const imageAlt =
        locale === 'en' && imgAsset.altEn ? imgAsset.altEn : imgAsset.alt;
      return finalizeRouteMeta(
        {
          title: areaPage.metaTitle,
          description: areaPage.metaDescription,
          image: routeOgPngUrl,
          imageAlt,
          url: canonicalUrl,
          type: 'website',
          locale,
          modifiedTime: areaPage.updatedAt,
          noindex: !areaPage.indexable,
          robotsContent: areaPage.indexable
            ? 'index,follow,max-image-preview:large'
            : 'noindex,follow',
          alternates,
          jsonLd: structuredData,
        },
        `${locale}:${areaPage.serviceSlug}/${areaPage.areaSlug}`
      );
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
      const imgAsset =
        SITE_IMAGES[service.imageKey as keyof typeof SITE_IMAGES] || SITE_IMAGES.ogDefault;
      const imageAlt =
        locale === 'en' && imgAsset.altEn ? imgAsset.altEn : imgAsset.alt;
      return finalizeRouteMeta(
        {
          title: service.seo.title,
          description: service.seo.description,
          image: routeOgPngUrl,
          imageAlt,
          url: canonicalUrl,
          type: 'website',
          locale,
          robotsContent: 'index,follow,max-image-preview:large',
          alternates,
          jsonLd: structuredData,
        },
        `${locale}:service/${service.slug}`
      );
    }
  }

  // 1C. Unified Area Detail (/id/area/:slug | /en/areas/:slug)
  if (pathname.startsWith('/area/')) {
    const areaSlug = pathname.slice('/area/'.length).trim().toLowerCase();
    const unifiedArea = resolveUnifiedAreaPage(areaSlug, locale);
    if (unifiedArea) {
      const imageAlt =
        locale === 'en'
          ? `Website, AI agent, and software services in ${unifiedArea.name} — CHESTAADOTCOM`
          : `Jasa website, AI agent, dan software untuk bisnis di ${unifiedArea.name} — CHESTAADOTCOM`;
      return finalizeRouteMeta(
        {
          title: unifiedArea.metaTitle,
          description: unifiedArea.metaDescription,
          image: routeOgPngUrl,
          imageAlt,
          url: canonicalUrl,
          type: 'website',
          locale,
          modifiedTime: unifiedArea.updatedAt,
          noindex: !unifiedArea.indexable,
          robotsContent: unifiedArea.indexable
            ? 'index,follow,max-image-preview:large'
            : 'noindex,follow',
          alternates,
          jsonLd: structuredData,
        },
        `${locale}:area/${unifiedArea.slug}`
      );
    }
  }

  // 2. Portfolio Project Detail (/portfolio/:slug)
  if (pathname.startsWith('/portfolio/')) {
    const slug = pathname.replace('/portfolio/', '').trim();
    const realProject = getRealProjectBySlug(slug);
    if (realProject) {
      const rpTitle = locale === 'en' ? realProject.seoTitleEn : realProject.seoTitleId;
      const rpDesc =
        locale === 'en' ? realProject.seoDescriptionEn : realProject.seoDescriptionId;
      const imageAlt =
        locale === 'en' && SITE_IMAGES.ogDefault.altEn
          ? SITE_IMAGES.ogDefault.altEn
          : SITE_IMAGES.ogDefault.alt;
      return finalizeRouteMeta(
        {
          title: rpTitle,
          description: rpDesc,
          image: routeOgPngUrl,
          imageAlt,
          url: canonicalUrl,
          type: 'website',
          locale,
          robotsContent: 'index,follow,max-image-preview:large',
          alternates,
          jsonLd: structuredData,
        },
        `${locale}:real-project/${realProject.id}`
      );
    }

    const project = getProjectBySlug(slug, locale);
    if (project) {
      const imgAsset =
        SITE_IMAGES[project.cover as keyof typeof SITE_IMAGES] || SITE_IMAGES.ogDefault;
      const imageAlt =
        locale === 'en' && imgAsset.altEn ? imgAsset.altEn : imgAsset.alt;
      return finalizeRouteMeta(
        {
          title: project.seo.title,
          description: project.seo.description,
          image: routeOgPngUrl,
          imageAlt,
          url: canonicalUrl,
          type: 'website',
          locale,
          modifiedTime: project.updatedAt,
          robotsContent: 'index,follow,max-image-preview:large',
          alternates,
          jsonLd: structuredData,
        },
        `${locale}:project/${project.slug}`
      );
    }
  }

  // 2B. Case Study Detail (/case-studies/:slug)
  if (pathname.startsWith('/case-studies/')) {
    const slug = pathname.replace('/case-studies/', '').trim();
    const study = getCaseStudyBySlug(slug, locale);
    if (study) {
      const imgAsset =
        SITE_IMAGES[study.cover as keyof typeof SITE_IMAGES] || SITE_IMAGES.ogDefault;
      const imageAlt =
        locale === 'en' && imgAsset.altEn ? imgAsset.altEn : imgAsset.alt;
      return finalizeRouteMeta(
        {
          title: study.seo.title,
          description: study.seo.description,
          image: routeOgPngUrl,
          imageAlt,
          url: canonicalUrl,
          type: 'article',
          locale,
          publishedTime: study.publishedAt,
          modifiedTime: study.updatedAt,
          authorName: study.author,
          articleSection: study.industry,
          articleTags: study.services,
          robotsContent: 'index,follow,max-image-preview:large',
          alternates,
          jsonLd: structuredData,
        },
        `${locale}:case-study/${study.slug}`
      );
    }
  }

  // 3A. Blog Category (/blog/kategori/:category)
  if (pathname.startsWith('/blog/kategori/')) {
    const catSlug = pathname.replace('/blog/kategori/', '').trim();
    const catMeta = getBlogCategoryBySlug(catSlug, locale);
    if (catMeta) {
      return finalizeRouteMeta(
        {
          title:
            locale === 'en'
              ? `${catMeta.shortLabel} Articles — Notes | CHESTAADOTCOM`
              : `Artikel ${catMeta.shortLabel} — Catatan | CHESTAADOTCOM`,
          description: catMeta.description,
          image: routeOgPngUrl,
          imageAlt:
            locale === 'en' && SITE_IMAGES.ogDefault.altEn
              ? SITE_IMAGES.ogDefault.altEn
              : SITE_IMAGES.ogDefault.alt,
          url: canonicalUrl,
          type: 'website',
          locale,
          robotsContent: 'index,follow,max-image-preview:large',
          alternates,
          jsonLd: structuredData,
        },
        `${locale}:blog-category/${catMeta.slug}`
      );
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
      return finalizeRouteMeta(
        {
          title: locale === 'en' ? cluster.seoTitleEn : cluster.seoTitleId,
          description:
            locale === 'en' ? cluster.metaDescriptionEn : cluster.metaDescriptionId,
          image: routeOgPngUrl,
          imageAlt,
          url: canonicalUrl,
          type: 'website',
          locale,
          robotsContent: 'index,follow,max-image-preview:large',
          alternates,
          jsonLd: structuredData,
        },
        `${locale}:cluster/${cluster.id}`
      );
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
          ? `Blog on AI Agents & Web — Page ${slice.currentPage} | CHESTAADOTCOM`
          : `Blog AI Agent & Otomasi — Halaman ${slice.currentPage} | CHESTAADOTCOM`
        : locale === 'en'
          ? 'Blog on AI Agents, Websites & Automation | CHESTAADOTCOM'
          : 'Blog AI Agent, Website & Otomasi Bisnis | CHESTAADOTCOM';
    const description =
      locale === 'en'
        ? 'Practical engineering notes on AI agents, fast websites, and workflow automation for businesses in South Tangerang and Greater Jakarta by our co-founders.'
        : 'Panduan praktis dari Chesta Azka dan Zeeshan seputar software custom, AI agent WhatsApp, otomasi workflow, dan pembuatan website cepat di Tangerang Selatan.';
    const latestMod = slice.pagePosts.reduce(
      (max, p) => (p.updatedAt > max ? p.updatedAt : max),
      '2026-10-25'
    );

    return finalizeRouteMeta(
      {
        title,
        description,
        image: toAbsoluteImageUrl(getRouteOgPngPath(slice.canonicalPath)),
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
        robotsContent: 'index,follow,max-image-preview:large',
        alternates,
        jsonLd: structuredData,
      },
      `${locale}:blog-index/${slice.currentPage}`
    );
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
      return finalizeRouteMeta(
        {
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
          robotsContent: 'index,follow,max-image-preview:large',
          alternates,
          jsonLd: structuredData,
        },
        `${postLocale}:blog/${post.slug}`
      );
    }
  }

  // 4. Known static routes (localized for EN or ID)
  const routeSeo =
    locale === 'en'
      ? ENGLISH_ROUTES_SEO[pathname] || ROUTES_SEO_MAP[pathname]
      : INDONESIAN_ROUTES_SEO[pathname] || ROUTES_SEO_MAP[pathname];
  if (routeSeo) {
    return finalizeRouteMeta(
      {
        title: routeSeo.title,
        description: routeSeo.description,
        image: routeOgPngUrl,
        imageAlt:
          locale === 'en' && SITE_IMAGES.ogDefault.altEn
            ? SITE_IMAGES.ogDefault.altEn
            : SITE_IMAGES.ogDefault.alt,
        url: canonicalUrl,
        type: 'website',
        locale,
        robotsContent: 'index,follow,max-image-preview:large',
        alternates,
        jsonLd: structuredData,
      },
      `${locale}:route${pathname}`
    );
  }

  // 5. Fallback
  const fallbackSeo =
    locale === 'en'
      ? ENGLISH_ROUTES_SEO['/']
      : {
          title: SITE_METADATA.defaultTitle,
          description: SITE_METADATA.defaultDescription,
        };
  return finalizeRouteMeta(
    {
      title: fallbackSeo.title,
      description: fallbackSeo.description,
      image: routeOgPngUrl,
      imageAlt:
        locale === 'en' && SITE_IMAGES.ogDefault.altEn
          ? SITE_IMAGES.ogDefault.altEn
          : SITE_IMAGES.ogDefault.alt,
      url: canonicalUrl,
      type: 'website',
      locale,
      robotsContent: 'index,follow,max-image-preview:large',
      alternates,
      jsonLd: structuredData,
    },
    `${locale}:fallback${pathname}`
  );
}

export function getPrerenderedBodyHtml(rawUrl: string): string {
  const normalizedRaw = normalizePathname(rawUrl);
  const { locale, prefixMode, barePath } = parseLocalizedPath(normalizedRaw);
  const pathname = barePath;
  const projects = getPublishedProjects(locale);
  const homeHref = toLocalizedHref('/', locale, prefixMode);

  // Areas Hub (/id/area or /en/areas)
  if (pathname === '/area') {
    const regionGroupsHtml = REGION_GROUPS.map((group) => {
      const regionTitle = locale === 'en' ? group.nameEn : group.nameId;
      const regionDesc = locale === 'en' ? group.descriptionEn : group.descriptionId;
      const indexableInRegion = group.areaSlugs
        .map((slug) => resolveUnifiedAreaPage(slug, locale))
        .filter((p): p is NonNullable<typeof p> => Boolean(p && p.indexable));

      if (indexableInRegion.length === 0) return '';

      const areaItemsHtml = indexableInRegion
        .map((areaPage) => {
          const unifiedHref = getUnifiedAreaPath(areaPage.slug, locale);
          const serviceLinks = areaPage.hasServiceAreaPages
            ? getServiceAreasByAreaSlug(areaPage.slug, true, locale)
                .map((sp) => {
                  const spHref = getServiceAreaPath(sp.serviceSlug, sp.areaSlug, locale);
                  const spLabel =
                    sp.serviceSlug === 'pembuatan-website'
                      ? locale === 'en'
                        ? `Website development in ${areaPage.name}`
                        : `Jasa pembuatan website ${areaPage.name}`
                      : locale === 'en'
                        ? `AI agent in ${areaPage.name}`
                        : `Jasa AI agent ${areaPage.name}`;
                  return `<li><a href="${escapeHtmlAttr(spHref)}">${escapeHtmlAttr(spLabel)}</a></li>`;
                })
                .join('\n')
            : '';

          return `<article class="mb-4 p-5 rounded-2xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)]">
            <h3 class="text-lg font-bold text-[#17122B]"><a href="${escapeHtmlAttr(unifiedHref)}">${escapeHtmlAttr(areaPage.name)}</a></h3>
            <p class="text-sm text-[#5B5675] mt-1">${escapeHtmlAttr(areaPage.factsSummary)}</p>
            <ul class="mt-2 space-y-1 text-sm text-[#6A3FD0]">
              <li><a href="${escapeHtmlAttr(unifiedHref)}">${escapeHtmlAttr(
                locale === 'en'
                  ? `All services in ${areaPage.name}`
                  : `Semua layanan di ${areaPage.name}`,
              )}</a></li>
              ${serviceLinks}
            </ul>
          </article>`;
        })
        .join('\n');

      return `<section class="mt-10">
        <h2 class="text-2xl font-bold text-[#17122B]">${escapeHtmlAttr(regionTitle)}</h2>
        <p class="text-sm text-[#5B5675] mt-1 mb-4">${escapeHtmlAttr(regionDesc)}</p>
        <div>${areaItemsHtml}</div>
      </section>`;
    })
      .filter(Boolean)
      .join('\n');

    return `
      <main class="bg-[#FFFFFF] text-[#17122B] min-h-screen">
        <section class="max-w-4xl mx-auto px-6 py-16">
          <h1 class="text-3xl sm:text-5xl font-bold">${
            locale === 'en'
              ? 'Service areas for websites, AI agents, and custom software.'
              : 'Area layanan pembuatan website, AI agent, dan software custom.'
          }</h1>
          <p class="text-base text-[#5B5675] mt-4">${
            locale === 'en'
              ? 'CHESTAADOTCOM is based in BSD, South Tangerang and serves businesses across South Tangerang, Tangerang Regency, Tangerang City, Depok City, and South Jakarta—online via WhatsApp and video call, or in person in the South Tangerang area by agreement.'
              : 'CHESTAADOTCOM berbasis di BSD, Tangerang Selatan dan melayani bisnis di wilayah Tangerang Selatan, Kabupaten Tangerang, Kota Tangerang, Kota Depok, dan Jakarta Selatan—secara online melalui WhatsApp dan video call, atau tatap muka di area Tangerang Selatan sesuai kesepakatan.'
          }</p>
          <div class="mt-8">${regionGroupsHtml}</div>
        </section>
      </main>
    `;
  }

  // Unified Area Detail (/id/area/:slug or /en/areas/:slug)
  if (pathname.startsWith('/area/')) {
    const areaSlug = pathname.slice('/area/'.length).trim().toLowerCase();
    const areaPage = resolveUnifiedAreaPage(areaSlug, locale);
    if (areaPage) {
      const areasHubHref = locale === 'en' ? '/en/areas' : '/id/area';
      const allServices = getAllServices();
      const serviceAreaPages = areaPage.hasServiceAreaPages
        ? getServiceAreasByAreaSlug(areaPage.slug, true, locale)
        : [];
      const nearbyPages = areaPage.nearbySlugs
        .map((s) => resolveUnifiedAreaPage(s, locale))
        .filter((p): p is NonNullable<typeof p> => Boolean(p && p.indexable))
        .slice(0, 5);

      const whyHtml = areaPage.whyNeedParagraphs
        .map((p) => `<p class="text-base text-[#5B5675] mb-4">${escapeHtmlAttr(p)}</p>`)
        .join('\n');
      const mixHtml = areaPage.typicalBusinessMix
        .map((m) => `<li class="mb-2">${escapeHtmlAttr(m)}</li>`)
        .join('\n');
      const scenariosHtml = areaPage.scenarios
        .map((sc) => {
          const svcHref = getServicePath(sc.serviceSlug, locale);
          return `<div class="mb-6 p-5 rounded-2xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)]">
            <span class="text-xs font-mono uppercase text-[#6A3FD0]">${escapeHtmlAttr(sc.serviceLabel)} · ${escapeHtmlAttr(sc.businessType)}</span>
            <h3 class="text-lg font-bold text-[#17122B] mt-1">${escapeHtmlAttr(sc.title)}</h3>
            <p class="text-sm text-[#5B5675] mt-2">${escapeHtmlAttr(sc.narrative)}</p>
            <p class="mt-2 text-xs font-semibold text-[#6A3FD0]"><a href="${escapeHtmlAttr(svcHref)}">${escapeHtmlAttr(sc.serviceLabel)} &rarr;</a></p>
          </div>`;
        })
        .join('\n');
      const howWorkHtml = areaPage.howWeWorkParagraphs
        .map((p) => `<p class="text-base text-[#5B5675] mb-3">${escapeHtmlAttr(p)}</p>`)
        .join('\n');
      const stepsHtml = areaPage.processSteps
        .map(
          (st) =>
            `<li class="mb-2"><strong>${escapeHtmlAttr(st.stepNumber)}. ${escapeHtmlAttr(st.title)}:</strong> ${escapeHtmlAttr(st.sentence)}</li>`,
        )
        .join('\n');
      const serviceIntroHtml = areaPage.servicesIntro
        .split('\n\n')
        .map((p) => `<p class="text-base text-[#5B5675] mb-3">${escapeHtmlAttr(p)}</p>`)
        .join('\n');
      const serviceLinksHtml = allServices
        .map((svc) => {
          const localSvc = getLocalizedService(svc.slug, locale) || svc;
          const svcHref = getServicePath(svc.slug, locale);
          const matchingSa = serviceAreaPages.find((p) => p.serviceSlug === svc.slug);
          const saLink = matchingSa
            ? ` · <a href="${escapeHtmlAttr(getServiceAreaPath(svc.slug, areaPage.slug, locale))}">${escapeHtmlAttr(localSvc.title)} (${escapeHtmlAttr(areaPage.name)})</a>`
            : '';
          return `<li class="mb-2"><a href="${escapeHtmlAttr(svcHref)}"><strong>${escapeHtmlAttr(localSvc.title)}</strong></a> — ${escapeHtmlAttr(localSvc.summary || localSvc.tagline || '')}${saLink}</li>`;
        })
        .join('\n');
      const faqHtml = areaPage.faqs
        .map(
          (f) =>
            `<div class="mb-4 p-4 rounded-2xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)]">
              <h3 class="font-bold text-[#17122B]">${escapeHtmlAttr(f.question)}</h3>
              <p class="text-sm text-[#5B5675] mt-1">${escapeHtmlAttr(f.answer)}</p>
            </div>`,
        )
        .join('\n');
      const nearbyHtml = nearbyPages
        .map(
          (nb) =>
            `<li class="mb-1"><a href="${escapeHtmlAttr(getUnifiedAreaPath(nb.slug, locale))}">${escapeHtmlAttr(nb.name)}</a> — ${escapeHtmlAttr(nb.factsSummary)}</li>`,
        )
        .join('\n');
      const waHref = buildWhatsAppLink(
        {
          type: 'area',
          serviceName:
            locale === 'en'
              ? 'Website, AI Agent & Software'
              : 'Website, AI Agent, dan Software',
          areaName: areaPage.name,
          url: pathname,
        },
        locale,
      );

      return `
        <main class="bg-[#FFFFFF] text-[#17122B] min-h-screen">
          <nav aria-label="Breadcrumb" class="max-w-4xl mx-auto px-6 pt-10 text-xs font-mono text-[#5B5675]">
            <a href="${escapeHtmlAttr(homeHref)}">${locale === 'en' ? 'Home' : 'Beranda'}</a> / <a href="${escapeHtmlAttr(areasHubHref)}">${locale === 'en' ? 'Areas' : 'Area'}</a> / <span>${escapeHtmlAttr(areaPage.name)}</span>
          </nav>
          <article class="max-w-4xl mx-auto px-6 py-8">
            <span class="text-xs font-mono text-[#6A3FD0]">${escapeHtmlAttr(areaPage.regionLabel)}</span>
            <h1 class="text-3xl sm:text-5xl font-bold mt-2">${escapeHtmlAttr(areaPage.h1)}</h1>
            <p class="text-base text-[#5B5675] mt-2">${escapeHtmlAttr(areaPage.factsSummary)}</p>

            <section class="mt-6 p-5 rounded-2xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)]">
              <h2 class="text-xs font-mono uppercase text-[#6A3FD0] mb-1">${locale === 'en' ? 'Quick summary' : 'Ringkasan singkat'}</h2>
              <p class="text-base text-[#17122B] font-medium">${escapeHtmlAttr(areaPage.quickSummary)}</p>
            </section>

            <section class="mt-6 p-5 rounded-2xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)]">
              <h2 class="text-lg font-bold text-[#17122B] mb-2">${locale === 'en' ? 'Quick check' : 'Cek cepat'}</h2>
              <ul class="list-disc pl-5 text-sm text-[#17122B] space-y-2">
                <li><strong>${locale === 'en' ? 'Suitable if' : 'Cocok kalau'}:</strong> ${escapeHtmlAttr(areaPage.cekCepat.cocokKalau)}</li>
                <li><strong>${locale === 'en' ? 'Starts from' : 'Mulai dari'}:</strong> ${escapeHtmlAttr(areaPage.cekCepat.mulaiDari)}</li>
                <li><strong>${locale === 'en' ? 'Pricing' : 'Harga'}:</strong> ${escapeHtmlAttr(areaPage.cekCepat.harga)}</li>
              </ul>
            </section>

            <section class="mt-8">
              <h2 class="text-2xl font-bold mb-4">${escapeHtmlAttr(areaPage.whyNeedHeading)}</h2>
              ${whyHtml}
              <ul class="list-disc pl-5 text-sm text-[#5B5675]">${mixHtml}</ul>
            </section>

            <section class="mt-8">
              <h2 class="text-2xl font-bold mb-4">${
                locale === 'en'
                  ? `Example scenarios for businesses in ${areaPage.name}`
                  : `Contoh skenario penerapan di ${areaPage.name}`
              }</h2>
              ${scenariosHtml}
            </section>

            <section class="mt-8">
              <h2 class="text-2xl font-bold mb-3">${escapeHtmlAttr(areaPage.howWeWorkHeading)}</h2>
              ${howWorkHtml}
              <ol class="list-decimal pl-5 text-sm text-[#5B5675] mt-4">${stepsHtml}</ol>
            </section>

            <section id="layanan-area" class="mt-8">
              <h2 class="text-2xl font-bold mb-3">${
                locale === 'en' ? `Services in ${areaPage.name}` : `Layanan di ${areaPage.name}`
              }</h2>
              ${serviceIntroHtml}
              <ul class="list-disc pl-5 text-sm text-[#17122B] mt-3">${serviceLinksHtml}</ul>
            </section>

            <section class="mt-8">
              <h2 class="text-2xl font-bold mb-4">${
                locale === 'en'
                  ? `Frequently asked questions in ${areaPage.name}`
                  : `Pertanyaan umum seputar layanan di ${areaPage.name}`
              }</h2>
              ${faqHtml}
            </section>

            <section class="mt-8">
              <h2 class="text-xl font-bold mb-3">${
                locale === 'en'
                  ? `Nearby areas around ${areaPage.name}`
                  : `Area terdekat dari ${areaPage.name}`
              }</h2>
              <ul class="list-disc pl-5 text-sm text-[#6A3FD0]">${nearbyHtml}</ul>
            </section>

            <section class="mt-12 p-8 rounded-2xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] text-center">
              <h2 class="text-2xl font-bold mb-2">${escapeHtmlAttr(areaPage.ctaHeading)}</h2>
              <p class="text-sm text-[#5B5675] mb-4 max-w-xl mx-auto">${escapeHtmlAttr(areaPage.ctaBody)}</p>
              <a href="${escapeHtmlAttr(waHref)}" target="_blank" rel="noopener" class="inline-block px-6 py-3 rounded-full bg-[#6A3FD0] text-white font-bold text-sm">${
                locale === 'en' ? 'Free consultation on WhatsApp' : 'Konsultasi gratis via WhatsApp'
              }</a>
            </section>
          </article>
        </main>
      `;
    }
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
            `<li class="mb-2"><strong>${escapeHtmlAttr(
              step.title.replace(/^\d+\.\s*/, '')
            )}:</strong> ${escapeHtmlAttr(step.sentence)}</li>`
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

      const siblingServiceSlug: ServiceSlug =
        areaPage.serviceSlug === 'pembuatan-website' ? 'ai-agent' : 'pembuatan-website';
      const siblingService = getLocalizedService(siblingServiceSlug, locale);
      const siblingAreaHref = getServiceAreaPath(siblingServiceSlug, areaPage.areaSlug, locale);
      const siblingServiceLabel =
        locale === 'en'
          ? `${siblingService?.shortTitle || 'Service'} in ${areaPage.areaName}`
          : `Layanan lain di ${areaPage.areaName}: ${siblingService?.title || 'Layanan'}`;

      const relatedAreaRealProjects = getRealProjectsByServiceSlug(areaPage.serviceSlug).slice(0, 1);
      const relatedAreaProjects = getProjectsByServiceSlug(areaPage.serviceSlug, locale).slice(0, 2);
      const relatedRealHtml = relatedAreaRealProjects
        .map((rp) => {
          const rpHref = getRealProjectHref(rp, locale);
          const rpTitle = locale === 'en' ? rp.titleEn : rp.titleId;
          const rpLabel = locale === 'en' ? rp.tagEn : rp.tagId;
          const rpDesc = locale === 'en' ? rp.descriptionEn : rp.descriptionId;
          return `<div class="p-4 rounded-xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.18)]">
            <span class="text-xs font-mono text-[#6A3FD0]">${escapeHtmlAttr(rpLabel)}</span>
            <h3 class="text-base font-bold text-[#17122B] mt-1"><a href="${escapeHtmlAttr(rpHref)}" class="hover:text-[#6A3FD0]">${escapeHtmlAttr(rpTitle)}</a></h3>
            <p class="text-xs text-[#5B5675] mt-1 leading-relaxed">${escapeHtmlAttr(rpDesc)}</p>
          </div>`;
        })
        .join('\n');
      const relatedProjectsHtml = [
        relatedRealHtml,
        ...relatedAreaProjects.map((p) => {
          const pHref = locale === 'en' ? `/en/portfolio/${p.slug}` : `/id/portfolio/${p.slug}`;
          return `<div class="p-4 rounded-xl bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)]">
            <span class="text-xs font-mono text-[#6A3FD0]">${escapeHtmlAttr(p.badgeLabel)} · ${escapeHtmlAttr(p.industry)}</span>
            <h3 class="text-base font-bold text-[#17122B] mt-1"><a href="${escapeHtmlAttr(pHref)}" class="hover:text-[#6A3FD0]">${escapeHtmlAttr(p.title)}</a></h3>
            <p class="text-xs text-[#5B5675] mt-1 leading-relaxed">${escapeHtmlAttr(p.oneLiner)}</p>
            <p class="text-xs font-mono text-[#6A3FD0] mt-2"><strong>${locale === 'en' ? 'Design target:' : 'Target desain:'}</strong> ${escapeHtmlAttr(p.targetNote)}</p>
            <p class="text-[11px] text-[#5B5675] mt-2">${escapeHtmlAttr(p.sampleNote)}</p>
          </div>`;
        }),
      ]
        .filter(Boolean)
        .join('\n');

      const areaWaUrl = buildWhatsAppLink(
        {
          type: 'area',
          serviceName: areaPage.serviceName,
          areaName: areaPage.areaName,
          url: pathname,
        },
        locale
      );

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
              <h2 class="text-2xl font-bold mb-4">${
                locale === 'en' ? 'Field usage scenarios' : 'Skenario penggunaan di lapangan'
              }</h2>
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
              <h2 class="text-xl font-bold mb-3">${
                locale === 'en'
                  ? `Other services in ${areaPage.areaName}`
                  : `Layanan lain di ${areaPage.areaName}`
              }</h2>
              <p><a href="${escapeHtmlAttr(siblingAreaHref)}" class="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6A3FD0] underline">${escapeHtmlAttr(
                siblingServiceLabel
              )} &rarr;</a></p>
            </section>
            ${
              relatedProjectsHtml
                ? `<section class="mt-8">
                    <h2 class="text-xl font-bold mb-3">${
                      locale === 'en' ? 'Related projects' : 'Proyek terkait'
                    }</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">${relatedProjectsHtml}</div>
                  </section>`
                : ''
            }
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
            <section class="mt-12 p-8 rounded-2xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] text-center">
              <h2 class="text-2xl font-bold mb-2">${
                locale === 'en'
                  ? `Start with a free 30-minute audit in ${areaPage.areaName}`
                  : `Mulai dari audit gratis 30 menit di ${areaPage.areaName}`
              }</h2>
              <p class="text-sm text-[#5B5675] mb-4 max-w-xl mx-auto">${
                locale === 'en'
                  ? 'Tell us your current workflow or website goal via WhatsApp. Chesta Azka and Zeeshan will review it with you before you pay anything.'
                  : 'Ceritakan alur kerja atau kebutuhan halaman web bisnismu lewat WhatsApp. Chesta Azka dan Zeeshan akan membedahnya bersamamu sebelum kamu membayar apa pun.'
              }</p>
              <a href="${escapeHtmlAttr(
                areaWaUrl
              )}" target="_blank" rel="noopener" class="inline-block px-6 py-3 rounded-full bg-[#6A3FD0] text-white font-bold text-sm hover:bg-[#5230B0] transition-colors">${
        locale === 'en' ? 'Free consultation on WhatsApp' : 'Konsultasi gratis via WhatsApp'
      }</a>
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
      const primaryWaUrl = buildWhatsAppLink(
        { type: 'service', serviceName: service.title, url: pathname },
        locale
      );

      const cocokList = service.cocokKalau || service.forWho || [];
      const cocokItemsHtml = cocokList
        .map(
          (c) =>
            `<li class="p-4 rounded-xl bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] flex items-start gap-3">
              <span class="text-[#6A3FD0] font-bold shrink-0 mt-0.5">✓</span>
              <span class="text-sm text-[#17122B] leading-relaxed">${escapeHtmlAttr(c)}</span>
            </li>`
        )
        .join('\n');

      const deliverablesHtml = service.deliverables
        .map(
          (d) =>
            `<div class="p-5 rounded-2xl bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)]">
              <h3 class="font-bold text-[#17122B] text-base">${escapeHtmlAttr(d.title)}</h3>
              <p class="text-sm text-[#5B5675] mt-1.5 leading-relaxed">${escapeHtmlAttr(
                d.description
              )}</p>
            </div>`
        )
        .join('\n');

      const processHtml = service.process
        .map(
          (step) =>
            `<div class="p-5 rounded-2xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)]">
              <div class="flex items-center justify-between text-xs font-mono text-[#6A3FD0] mb-2 uppercase font-semibold">
                <span>${locale === 'en' ? `Step ${step.num}` : `Langkah ${step.num}`}</span>
                <span class="px-2 py-0.5 rounded-full bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] text-[#5B5675]">${escapeHtmlAttr(
                  step.duration
                )}</span>
              </div>
              <h3 class="text-lg font-bold text-[#17122B]">${escapeHtmlAttr(step.title)}</h3>
              <p class="text-sm text-[#5B5675] mt-1.5 leading-relaxed">${escapeHtmlAttr(
                step.description
              )}</p>
            </div>`
        )
        .join('\n');

      const useCasesList =
        service.contohPenggunaan && service.contohPenggunaan.length > 0
          ? service.contohPenggunaan
          : service.useCases || [];
      const useCasesHtml = useCasesList
        .map(
          (uc) =>
            `<div class="p-6 rounded-2xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)]">
              <div class="flex items-center justify-between mb-3">
                <span class="px-3 py-1 rounded-full bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] text-xs font-mono font-semibold text-[#6A3FD0]">${escapeHtmlAttr(
                  uc.industryLabel
                )}</span>
                <span class="text-xs font-mono text-[#5B5675]">${
                  locale === 'en' ? 'Example scenario' : 'Contoh skenario'
                }</span>
              </div>
              <h3 class="text-lg font-bold text-[#17122B]">${escapeHtmlAttr(uc.scenarioTitle)}</h3>
              <div class="mt-3 space-y-2 text-sm text-[#17122B] leading-relaxed">
                ${uc.workflowLines.map((l) => `<p>${escapeHtmlAttr(l)}</p>`).join('\n')}
              </div>
              <p class="mt-4 pt-3 border-t border-[rgba(91,60,196,0.1)] text-xs font-mono text-[#6A3FD0] font-semibold">
                <strong>${locale === 'en' ? 'Design target' : 'Target desain'}:</strong> ${escapeHtmlAttr(
              uc.outcome
            )}
              </p>
            </div>`
        )
        .join('\n');

      let comparisonTableHtml = '';
      if (service.comparisonTable) {
        comparisonTableHtml = `
          <section class="mt-10">
            <h2 class="text-2xl font-bold mb-4">${
              locale === 'en' ? 'Website type comparison' : 'Perbandingan jenis website'
            }</h2>
            <div class="overflow-x-auto">
              <table class="w-full text-left text-sm border-collapse rounded-2xl overflow-hidden border border-[rgba(91,60,196,0.14)]">
                <thead class="bg-[#F8F6FE] text-[#17122B] font-bold">
                  <tr>
                    ${service.comparisonTable.headers
                      .map(
                        (h) =>
                          `<th class="p-3.5 border-b border-[rgba(91,60,196,0.14)]">${escapeHtmlAttr(
                            h
                          )}</th>`
                      )
                      .join('')}
                  </tr>
                </thead>
                <tbody>
                  ${service.comparisonTable.rows
                    .map(
                      (r) =>
                        `<tr class="border-b border-[rgba(91,60,196,0.08)] hover:bg-[#F8F6FE]/50">
                          <td class="p-3.5 font-semibold text-[#17122B]">${escapeHtmlAttr(
                            r.feature
                          )}</td>
                          <td class="p-3.5 text-[#5B5675]">${escapeHtmlAttr(r.landingPage)}</td>
                          <td class="p-3.5 text-[#5B5675]">${escapeHtmlAttr(r.companyProfile)}</td>
                          <td class="p-3.5 text-[#5B5675]">${escapeHtmlAttr(r.webCustom)}</td>
                        </tr>`
                    )
                    .join('\n')}
                </tbody>
              </table>
            </div>
          </section>
        `;
      }

      let chatbotVsAgentHtml = '';
      if (service.chatbotVsAgentTable) {
        chatbotVsAgentHtml = `
          <section class="mt-10">
            <h2 class="text-2xl font-bold mb-4">${
              locale === 'en'
                ? 'Chatbot vs AI agent comparison'
                : 'Perbedaan chatbot vs AI agent'
            }</h2>
            <div class="overflow-x-auto">
              <table class="w-full text-left text-sm border-collapse rounded-2xl overflow-hidden border border-[rgba(91,60,196,0.14)]">
                <thead class="bg-[#F8F6FE] text-[#17122B] font-bold">
                  <tr>
                    ${service.chatbotVsAgentTable.headers
                      .map(
                        (h) =>
                          `<th class="p-3.5 border-b border-[rgba(91,60,196,0.14)]">${escapeHtmlAttr(
                            h
                          )}</th>`
                      )
                      .join('')}
                  </tr>
                </thead>
                <tbody>
                  ${service.chatbotVsAgentTable.rows
                    .map(
                      (r) =>
                        `<tr class="border-b border-[rgba(91,60,196,0.08)] hover:bg-[#F8F6FE]/50">
                          <td class="p-3.5 font-semibold text-[#17122B]">${escapeHtmlAttr(
                            r.aspect
                          )}</td>
                          <td class="p-3.5 text-[#5B5675]">${escapeHtmlAttr(r.chatbot)}</td>
                          <td class="p-3.5 text-[#17122B] font-medium">${escapeHtmlAttr(
                            r.agent
                          )}</td>
                        </tr>`
                    )
                    .join('\n')}
                </tbody>
              </table>
            </div>
          </section>
        `;
      }

      let guardrailsHtml = '';
      if (service.guardrails && service.guardrails.length > 0) {
        guardrailsHtml = `
          <section class="mt-10">
            <h2 class="text-2xl font-bold mb-4">${
              locale === 'en'
                ? 'Control and safety (Guardrails)'
                : 'Kendali dan keamanan (Guardrails)'
            }</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${service.guardrails
                .map(
                  (g) =>
                    `<div class="p-5 rounded-2xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)]">
                      <h3 class="font-bold text-[#17122B] text-base">${escapeHtmlAttr(g.title)}</h3>
                      <p class="text-sm text-[#5B5675] mt-1.5 leading-relaxed">${escapeHtmlAttr(
                        g.description
                      )}</p>
                    </div>`
                )
                .join('\n')}
            </div>
          </section>
        `;
      }

      const siapkanItemsHtml = (service.siapkanSebelumAudit || [])
        .map((s) => `<li class="mb-2 leading-relaxed">${escapeHtmlAttr(s)}</li>`)
        .join('\n');

      const relatedRealServiceProjects = getRealProjectsByServiceSlug(service.slug);
      const relatedSampleProjects = getProjectsByServiceSlug(service.slug, locale).slice(0, 2);
      const relatedProjectsHtml = [
        ...relatedRealServiceProjects.map((rp) => {
          const rpHref = getRealProjectHref(rp, locale);
          const rpTitle = locale === 'en' ? rp.titleEn : rp.titleId;
          const rpLabel = locale === 'en' ? rp.tagEn : rp.tagId;
          const rpDesc = locale === 'en' ? rp.descriptionEn : rp.descriptionId;
          const rpValue = locale === 'en' ? rp.projectValueNoteEn : rp.projectValueNoteId;
          return `<div class="p-5 rounded-2xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.18)]">
            <span class="text-xs font-mono text-[#6A3FD0]">${escapeHtmlAttr(rpLabel)}</span>
            <h3 class="text-base font-bold text-[#17122B] mt-1"><a href="${escapeHtmlAttr(
              rpHref
            )}" class="hover:text-[#6A3FD0]">${escapeHtmlAttr(rpTitle)}</a></h3>
            <p class="text-sm text-[#5B5675] mt-1 leading-relaxed">${escapeHtmlAttr(rpDesc)}</p>
            ${rpValue ? `<p class="text-xs font-mono text-[#6A3FD0] mt-2">${escapeHtmlAttr(rpValue)}</p>` : ''}
          </div>`;
        }),
        ...relatedSampleProjects.map((p) => {
          const pHref = locale === 'en' ? `/en/portfolio/${p.slug}` : `/id/portfolio/${p.slug}`;
          return `<div class="p-5 rounded-2xl bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)]">
            <span class="text-xs font-mono text-[#6A3FD0]">${escapeHtmlAttr(
              p.badgeLabel
            )} · ${escapeHtmlAttr(p.industry)}</span>
            <h3 class="text-base font-bold text-[#17122B] mt-1"><a href="${escapeHtmlAttr(
              pHref
            )}" class="hover:text-[#6A3FD0]">${escapeHtmlAttr(p.title)}</a></h3>
            <p class="text-sm text-[#5B5675] mt-1 leading-relaxed">${escapeHtmlAttr(p.oneLiner)}</p>
            <p class="text-xs font-mono text-[#6A3FD0] mt-3"><strong>${
              locale === 'en' ? 'Design target:' : 'Target desain:'
            }</strong> ${escapeHtmlAttr(p.targetNote)}</p>
            <p class="text-[11px] text-[#5B5675] mt-2">${escapeHtmlAttr(p.sampleNote)}</p>
          </div>`;
        }),
      ].join('\n');

      const faqHtml = service.faq
        .map(
          (f) =>
            `<div class="mb-4 p-5 rounded-2xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)]">
              <h3 class="font-bold text-[#17122B] text-base">${escapeHtmlAttr(f.question)}</h3>
              <p class="text-sm text-[#5B5675] mt-2 leading-relaxed">${escapeHtmlAttr(f.answer)}</p>
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
          return `<li class="inline-block"><a href="${escapeHtmlAttr(
            href
          )}" class="inline-block px-3.5 py-1.5 rounded-full bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] text-xs text-[#6A3FD0] hover:bg-[#EFEAFB]">${escapeHtmlAttr(
            label
          )}</a></li>`;
        })
        .join('\n');

      return `
        <main class="bg-[#FFFFFF] text-[#17122B] min-h-screen">
          <nav aria-label="Breadcrumb" class="max-w-4xl mx-auto px-6 pt-10 text-xs font-mono text-[#5B5675]">
            <a href="${escapeHtmlAttr(homeHref)}">${locale === 'en' ? 'Home' : 'Beranda'}</a> / <span>${escapeHtmlAttr(
        service.title
      )}</span>
          </nav>
          <article class="max-w-4xl mx-auto px-6 py-8">
            <span class="text-xs font-mono text-[#6A3FD0]">${escapeHtmlAttr(service.eyebrow)}</span>
            <h1 class="text-3xl sm:text-5xl font-bold mt-2">${escapeHtmlAttr(service.h1)}</h1>
            <p class="text-lg text-[#5B5675] mt-3 leading-relaxed">${escapeHtmlAttr(service.sub)}</p>

            <div class="my-6 p-5 rounded-2xl bg-[#F8F6FE] border-l-4 border-l-[#6A3FD0] border border-[rgba(91,60,196,0.16)]">
              <p class="text-xs font-mono uppercase text-[#6A3FD0] font-semibold mb-1">${
                locale === 'en' ? 'Quick summary' : 'Ringkasan singkat'
              }</p>
              <p class="text-base font-medium text-[#17122B] leading-relaxed">${escapeHtmlAttr(
                service.ringkasanSingkat
              )}</p>
            </div>

            <div class="flex flex-wrap gap-3 mb-8">
              <a href="${escapeHtmlAttr(
                primaryWaUrl
              )}" target="_blank" rel="noopener" class="inline-block px-6 py-3 rounded-full bg-[#6A3FD0] text-white font-bold text-sm hover:bg-[#5230B0] transition-colors">${
        locale === 'en' ? 'Free consultation on WhatsApp' : 'Konsultasi gratis via WhatsApp'
      }</a>
              <a href="#cara-kerja" class="inline-block px-5 py-3 rounded-full bg-[#FFFFFF] border border-[rgba(91,60,196,0.18)] text-[#17122B] font-semibold text-sm hover:bg-[#F8F6FE] transition-colors">${
                locale === 'en' ? 'See how it works' : 'Lihat cara kerja'
              }</a>
            </div>

            <section id="cocok-untuk" class="mt-10">
              <h2 class="text-2xl font-bold mb-4">${
                locale === 'en' ? 'Who this is for' : 'Cocok kalau kamu'
              }</h2>
              <div class="mb-6 p-6 rounded-2xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] space-y-3">
                <div class="flex items-center justify-between font-mono text-xs text-[#6A3FD0] font-semibold uppercase">
                  <span>${locale === 'en' ? 'Quick check' : 'Cek cepat'}</span>
                  <span>${escapeHtmlAttr(service.pricingNote?.label || '')}</span>
                </div>
                <ul class="space-y-2 text-sm text-[#17122B]">
                  <li><strong>${locale === 'en' ? 'Right for you if:' : 'Cocok kalau:'}</strong> ${escapeHtmlAttr(
        service.bestForSummary || service.summary
      )}</li>
                  <li><strong>${
                    locale === 'en' ? 'Starts with:' : 'Mulai dari:'
                  }</strong> ${
        locale === 'en'
          ? 'Free 30-minute audit via WhatsApp or video call'
          : 'Audit gratis 30 menit via WhatsApp atau video call'
      }</li>
                  <li><strong>${locale === 'en' ? 'Pricing:' : 'Harga:'}</strong> ${escapeHtmlAttr(
        service.pricingNote?.label || ''
      )} — ${escapeHtmlAttr(service.pricingNote?.reason || '')}</li>
                </ul>
              </div>
              <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">${cocokItemsHtml}</ul>
            </section>

            <section class="mt-10">
              <h2 class="text-2xl font-bold mb-3">${
                locale === 'en' ? "When you don't need us" : 'Kapan kamu tidak perlu kami'
              }</h2>
              <p class="text-base text-[#5B5675] leading-relaxed p-5 rounded-2xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)]">${escapeHtmlAttr(
                service.kapanTidakPerlu
              )}</p>
            </section>

            <section class="mt-10">
              <h2 class="text-2xl font-bold mb-4">${
                locale === 'en' ? 'What you get' : 'Yang kamu dapat'
              }</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">${deliverablesHtml}</div>
            </section>

            <section id="cara-kerja" class="mt-10">
              <h2 class="text-2xl font-bold mb-4">${
                locale === 'en' ? 'How it works' : 'Cara kerja'
              }</h2>
              <div class="space-y-4">${processHtml}</div>
            </section>

            <section id="contoh-penggunaan" class="mt-10">
              <h2 class="text-2xl font-bold mb-4">${
                locale === 'en'
                  ? 'Examples of how it is used in the field'
                  : 'Contoh penggunaan di lapangan'
              }</h2>
              <div class="space-y-6">${useCasesHtml}</div>
            </section>

            ${comparisonTableHtml}
            ${chatbotVsAgentHtml}
            ${guardrailsHtml}

            <section class="mt-10">
              <h2 class="text-2xl font-bold mb-3">${
                locale === 'en' ? 'Our technical principles' : 'Prinsip teknis'
              }</h2>
              <p class="text-base text-[#5B5675] leading-relaxed p-5 rounded-2xl bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)]">${escapeHtmlAttr(
                service.prinsipTeknis
              )}</p>
            </section>

            <section id="harga" class="mt-10">
              <h2 class="text-2xl font-bold mb-3">${
                locale === 'en' ? 'Pricing and scope' : 'Harga dan cakupan'
              }</h2>
              <div class="p-6 rounded-2xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)]">
                <span class="text-xs font-mono uppercase text-[#6A3FD0] font-semibold">${escapeHtmlAttr(
                  service.pricingNote?.label || ''
                )}</span>
                <p class="text-base text-[#17122B] font-semibold mt-1">${escapeHtmlAttr(
                  service.hargaDanScope
                )}</p>
                <p class="text-sm text-[#5B5675] mt-2">${escapeHtmlAttr(
                  service.pricingNote?.scopeNote || ''
                )}</p>
              </div>
            </section>

            ${
              siapkanItemsHtml
                ? `<section class="mt-10">
                    <h2 class="text-2xl font-bold mb-4">${
                      locale === 'en' ? 'Prepare this before the audit' : 'Siapkan ini sebelum audit'
                    }</h2>
                    <ul class="list-disc pl-5 space-y-2 text-sm text-[#5B5675]">${siapkanItemsHtml}</ul>
                  </section>`
                : ''
            }

            ${
              relatedProjectsHtml
                ? `<section class="mt-10">
                    <h2 class="text-2xl font-bold mb-4">${
                      locale === 'en'
                        ? 'Related projects and case studies'
                        : 'Proyek dan studi kasus terkait'
                    }</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">${relatedProjectsHtml}</div>
                  </section>`
                : ''
            }

            <section id="faq" class="mt-10">
              <h2 class="text-2xl font-bold mb-4">FAQ</h2>
              ${faqHtml}
            </section>

            ${
              indexableAreasHtml
                ? `<section class="mt-10">
                    <h2 class="text-xl font-bold mb-3">${
                      locale === 'en' ? 'Service areas' : 'Area layanan'
                    }</h2>
                    <ul class="flex flex-wrap gap-2 text-sm text-[#6A3FD0]">${indexableAreasHtml}</ul>
                  </section>`
                : ''
            }

            <section class="mt-12 p-8 rounded-2xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] text-center">
              <h2 class="text-2xl font-bold mb-2">${
                locale === 'en'
                  ? 'Start with a free 30-minute audit'
                  : 'Mulai dari audit gratis 30 menit'
              }</h2>
              <p class="text-sm text-[#5B5675] mb-4 max-w-xl mx-auto">${
                locale === 'en'
                  ? 'Tell us your business challenge. We will tell you honestly whether we can help and what it will cost.'
                  : 'Ceritakan kerjaan yang paling bikin capek. Kami bilang jujur apakah bisa dikerjakan, dan berapa kira-kira biayanya.'
              }</p>
              <a href="${escapeHtmlAttr(
                primaryWaUrl
              )}" target="_blank" rel="noopener" class="inline-block px-6 py-3 rounded-full bg-[#6A3FD0] text-white font-bold text-sm hover:bg-[#5230B0] transition-colors">${
        locale === 'en' ? 'Free consultation on WhatsApp' : 'Konsultasi gratis via WhatsApp'
      }</a>
            </section>
          </article>
        </main>
      `;
    }
  }

  // Portfolio Detail (/portfolio/:slug)
  if (pathname.startsWith('/portfolio/')) {
    const slug = pathname.replace('/portfolio/', '').trim();
    const realProject = getRealProjectBySlug(slug);
    if (realProject) {
      const rpTitle = locale === 'en' ? realProject.titleEn : realProject.titleId;
      const rpDesc = locale === 'en' ? realProject.descriptionEn : realProject.descriptionId;
      const rpLabel =
        locale === 'en' ? realProject.confidentialLabelEn : realProject.confidentialLabelId;
      const rpValue =
        locale === 'en' ? realProject.projectValueNoteEn : realProject.projectValueNoteId;
      const rpWork = locale === 'en' ? realProject.workItemsEn : realProject.workItemsId;
      const rpCta = locale === 'en' ? realProject.ctaPromptEn : realProject.ctaPromptId;
      const workBulletsHtml = rpWork
        .map((w) => `<li class="mb-2 text-sm text-[#17122B]">${escapeHtmlAttr(w)}</li>`)
        .join('\n');
      const waHref = buildWhatsAppLink(
        { type: 'case-study', title: rpTitle, url: pathname },
        locale
      );

      return `
        <main class="bg-[#FFFFFF] text-[#17122B] min-h-screen">
          <article class="max-w-4xl mx-auto px-6 py-8">
            <span class="text-xs font-mono text-[#6A3FD0]">${escapeHtmlAttr(rpLabel)}</span>
            <h1 class="text-3xl sm:text-5xl font-bold mt-2">${escapeHtmlAttr(rpTitle)}</h1>
            <p class="text-lg text-[#5B5675] mt-3">${escapeHtmlAttr(rpDesc)}</p>
            ${
              rpValue
                ? `<p class="text-sm font-mono font-semibold text-[#6A3FD0] mt-3">${escapeHtmlAttr(
                    rpValue
                  )}</p>`
                : ''
            }
            <section class="mt-8">
              <h2 class="text-xl font-bold text-[#17122B] mb-3">${
                locale === 'en' ? 'What we worked on' : 'Yang kami kerjakan'
              }</h2>
              <ul class="list-disc pl-5">${workBulletsHtml}</ul>
            </section>
            <p class="mt-6 text-sm font-semibold text-[#5B5675]">${
              locale === 'en' ? 'Client kept confidential' : 'Klien dirahasiakan'
            }</p>
            <div class="mt-8 p-6 rounded-2xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)]">
              <p class="text-base font-bold text-[#17122B] mb-3">${escapeHtmlAttr(rpCta)}</p>
              <a href="${escapeHtmlAttr(
                waHref
              )}" target="_blank" rel="noopener" class="inline-block px-6 py-3 rounded-full bg-[#6A3FD0] text-white font-bold text-sm">${escapeHtmlAttr(
        rpCta
      )}</a>
            </div>
          </article>
        </main>
      `;
    }

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
              project.badgeLabel
            )} · ${escapeHtmlAttr(project.categoryLabel)}</span>
            <h1 class="text-3xl sm:text-5xl font-bold mt-2">${escapeHtmlAttr(project.title)}</h1>
            <p class="text-lg text-[#5B5675] mt-3">${escapeHtmlAttr(project.oneLiner)}</p>
            <p class="text-xs text-[#5B5675] mt-3 p-3 rounded-xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)]">${escapeHtmlAttr(
              project.sampleNote
            )}</p>
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
    const realProjectsListHtml = REAL_PROJECTS_EXPERIENCE.map((rp) => {
      const rpHref = getRealProjectHref(rp, locale);
      const rpTitle = locale === 'en' ? rp.titleEn : rp.titleId;
      const rpLabel = locale === 'en' ? rp.tagEn : rp.tagId;
      const rpOneLiner = locale === 'en' ? rp.oneLinerEn : rp.oneLinerId;
      const rpValue = locale === 'en' ? rp.projectValueNoteEn : rp.projectValueNoteId;
      return `<article class="mb-6 p-6 rounded-2xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.18)]">
        <span class="text-xs font-mono text-[#6A3FD0]">${escapeHtmlAttr(rpLabel)} · ${
        locale === 'en' ? 'Illustration' : 'Ilustrasi'
      }</span>
        <h3 class="text-xl font-bold mt-1"><a href="${escapeHtmlAttr(rpHref)}">${escapeHtmlAttr(
        rpTitle
      )}</a></h3>
        <p class="text-sm text-[#5B5675] mt-2">${escapeHtmlAttr(rpOneLiner)}</p>
        ${rpValue ? `<p class="text-xs font-mono text-[#6A3FD0] mt-2">${escapeHtmlAttr(rpValue)}</p>` : ''}
      </article>`;
    }).join('\n');

    const projectsListHtml = projects
      .map(
        (proj) =>
          `<article class="mb-6 p-6 rounded-2xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)]">
            <span class="text-xs font-mono text-[#6A3FD0]">${escapeHtmlAttr(
              proj.badgeLabel
            )} · ${escapeHtmlAttr(proj.categoryLabel)} · ${escapeHtmlAttr(proj.year)}</span>
            <h3 class="text-xl font-bold mt-1"><a href="/${locale}/portfolio/${escapeHtmlAttr(
              proj.slug
            )}">${escapeHtmlAttr(proj.title)}</a></h3>
            <p class="text-sm text-[#5B5675] mt-2">${escapeHtmlAttr(proj.oneLiner)}</p>
            <p class="text-xs text-[#5B5675] mt-3">${escapeHtmlAttr(proj.sampleNote)}</p>
          </article>`
      )
      .join('\n');

    return `
      <main class="bg-[#FFFFFF] text-[#17122B] min-h-screen">
        <section class="max-w-5xl mx-auto px-6 py-16">
          <h1 class="text-3xl sm:text-5xl font-bold">${
            locale === 'en' ? 'Projects' : 'Proyek'
          }</h1>
          <section class="mt-10">
            <h2 class="text-2xl font-bold mb-4">${
              locale === 'en' ? 'Real projects' : 'Proyek nyata'
            }</h2>
            ${realProjectsListHtml}
          </section>
          <section class="mt-12">
            <h2 class="text-2xl font-bold mb-4">${
              locale === 'en' ? 'Sample projects' : 'Contoh proyek'
            }</h2>
            ${projectsListHtml}
          </section>
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
            <span class="text-xs font-mono text-[#6A3FD0]">${escapeHtmlAttr(study.badgeLabel)} · ${escapeHtmlAttr(study.industry)} · ${escapeHtmlAttr(study.readingTime)}</span>
            <h1 class="text-3xl sm:text-5xl font-bold mt-2">${escapeHtmlAttr(study.title)}</h1>
            <p class="text-lg text-[#5B5675] mt-3">${escapeHtmlAttr(study.oneSentenceSummary)}</p>
            <p class="text-xs text-[#5B5675] mt-3 p-3 rounded-xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)]">${escapeHtmlAttr(study.sampleNote)}</p>
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
          <span class="text-xs font-mono text-[#6A3FD0]">${escapeHtmlAttr(cs.badgeLabel)} · ${escapeHtmlAttr(cs.industry)} · ${escapeHtmlAttr(cs.readingTime)}</span>
          <h2 class="text-xl font-bold mt-1"><a href="${escapeHtmlAttr(href)}">${escapeHtmlAttr(cs.title)}</a></h2>
          <p class="text-sm text-[#5B5675] mt-2"><strong>${locale === 'en' ? 'Problem' : 'Masalah'}:</strong> ${escapeHtmlAttr(cs.summary.problem)}</p>
          <p class="text-sm text-[#5B5675] mt-1"><strong>${locale === 'en' ? 'What we built' : 'Yang dibangun'}:</strong> ${escapeHtmlAttr(cs.summary.built)}</p>
          <p class="text-xs text-[#5B5675] mt-3">${escapeHtmlAttr(cs.sampleNote)}</p>
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
              ? 'Sample case studies that show how we analyze problems, make decisions, and weigh trade-offs. Our real project experience is on the About and Projects pages.'
              : 'Contoh studi kasus yang memperlihatkan cara kami menganalisis masalah, mengambil keputusan, dan menimbang kompromi. Pengalaman proyek nyata kami ada di halaman Tentang dan Proyek.'
          }</p>
          <div class="mt-5 p-4 rounded-2xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.18)] text-sm text-[#17122B]">
            ${
              locale === 'en'
                ? 'Sample project designed to show our workflow. Not a client project.'
                : 'Contoh proyek dirancang untuk memperlihatkan alur kerja kami. Bukan proyek klien.'
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
  const isEnHome = locale === 'en';
  const faqsForHome = isEnHome ? ENGLISH_HOME_FAQS : HOME_FAQS;
  const homeFaqHtml = faqsForHome
    .map(
      (item) =>
        `<div class="mb-5 p-5 rounded-2xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.1)]">
        <h3 class="text-base font-bold text-[#17122B]">${escapeHtmlAttr(item.question)}</h3>
        <p class="text-sm text-[#5B5675] mt-2 leading-relaxed">${escapeHtmlAttr(item.answer)}</p>
      </div>`
    )
    .join('\n');

  const langSwitchLinks = getHreflangAlternates(normalizedRaw, SITE_URL);
  const homeWaUrl = buildWhatsAppLink({ type: 'home' }, locale);
  const recentPosts = getPublishedBlogPosts(locale).slice(0, 3);
  const recentProjects = getPublishedProjects(locale).slice(0, 3);

  const navLinks = isEnHome
    ? [
        { label: 'Services', href: '/en#layanan' },
        { label: 'About Us', href: '/en/about' },
        { label: 'How We Work', href: '/en/cara-kerja' },
        { label: 'Pricing', href: '/en/harga' },
        { label: 'Case Studies', href: '/en/case-studies' },
        { label: 'FAQ', href: '/en/faq' },
        { label: 'Projects', href: '/en/portfolio' },
        { label: 'Blog', href: '/en/blog' },
      ]
    : [
        { label: 'Layanan', href: '/id#layanan' },
        { label: 'Tentang', href: '/id/tentang' },
        { label: 'Cara Kerja', href: '/id/cara-kerja' },
        { label: 'Harga', href: '/id/harga' },
        { label: 'Studi Kasus', href: '/id/studi-kasus' },
        { label: 'FAQ', href: '/id/faq' },
        { label: 'Proyek', href: '/id/portfolio' },
        { label: 'Blog', href: '/id/blog' },
      ];

  const headerNavHtml = navLinks
    .map(
      (l) =>
        `<a href="${escapeHtmlAttr(l.href)}" class="text-[#5B5675] hover:text-[#6A3FD0]">${escapeHtmlAttr(
          l.label
        )}</a>`
    )
    .join('\n            ');

  const recentPostsHtml = recentPosts
    .map((post) => {
      const pHref = `/${locale}/blog/${escapeHtmlAttr(post.slug)}`;
      return `<article class="p-5 rounded-2xl bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)]">
        <span class="text-xs font-mono text-[#6A3FD0]">${escapeHtmlAttr(post.category)} · ${escapeHtmlAttr(post.readTime)}</span>
        <h3 class="text-lg font-bold text-[#17122B] mt-1"><a href="${escapeHtmlAttr(pHref)}" class="hover:text-[#6A3FD0]">${escapeHtmlAttr(post.title)}</a></h3>
        <p class="text-sm text-[#5B5675] mt-2 leading-relaxed">${escapeHtmlAttr(post.excerpt)}</p>
      </article>`;
    })
    .join('\n');

  const recentProjectsHtml = recentProjects
    .map((p) => {
      const pHref = `/${locale}/portfolio/${escapeHtmlAttr(p.slug)}`;
      return `<article class="p-6 rounded-2xl bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)] flex flex-col justify-between">
        <div>
          <span class="text-xs font-mono text-[#6A3FD0]">${escapeHtmlAttr(p.badgeLabel)} · ${escapeHtmlAttr(p.categoryLabel)}</span>
          <h3 class="text-lg font-bold text-[#17122B] mt-1"><a href="${escapeHtmlAttr(pHref)}" class="hover:text-[#6A3FD0]">${escapeHtmlAttr(p.title)}</a></h3>
          <p class="text-sm text-[#5B5675] mt-2 leading-relaxed">${escapeHtmlAttr(p.oneLiner)}</p>
        </div>
        <p class="mt-4 pt-3 border-t border-[rgba(91,60,196,0.1)] text-xs font-mono text-[#6A3FD0]">
          <strong>${isEnHome ? 'Design target:' : 'Target desain:'}</strong> ${escapeHtmlAttr(p.targetNote)}
        </p>
        <p class="text-[11px] text-[#5B5675] mt-2">${escapeHtmlAttr(p.sampleNote)}</p>
      </article>`;
    })
    .join('\n');

  const processPhasesHtml = PROCESS_PHASES.map((phase) => {
    const title = isEnHome ? phase.titleEn : phase.titleId;
    const desc = isEnHome ? phase.descEn : phase.descId;
    return `<div class="p-5 rounded-2xl bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)]">
      <span class="text-xs font-mono text-[#6A3FD0] font-semibold">${isEnHome ? `Phase ${phase.number}` : `Tahap ${phase.number}`}</span>
      <h3 class="text-base font-bold text-[#17122B] mt-1">${escapeHtmlAttr(title)}</h3>
      <p class="text-sm text-[#5B5675] mt-2 leading-relaxed">${escapeHtmlAttr(desc)}</p>
    </div>`;
  }).join('\n');

  if (isEnHome) {
    return `
      <main class="bg-[#FFFFFF] text-[#17122B] min-h-screen">
        <header class="max-w-6xl mx-auto px-6 py-6 flex flex-wrap justify-between items-center gap-4 border-b border-[rgba(91,60,196,0.1)]">
          <a href="/en" class="font-bold text-lg text-[#17122B]">CHESTAADOTCOM</a>
          <nav aria-label="Main Navigation" class="flex flex-wrap gap-4 text-sm font-medium text-[#5B5675]">
            ${headerNavHtml}
            <a href="${escapeHtmlAttr(langSwitchLinks.idUrl)}" hreflang="id" class="font-mono text-xs text-[#6A3FD0]">ID</a>
            <a href="${escapeHtmlAttr(langSwitchLinks.enUrl)}" hreflang="en" class="font-mono text-xs text-[#6A3FD0] font-bold">EN</a>
          </nav>
        </header>

        <section class="max-w-6xl mx-auto px-6 py-16">
          <span class="text-xs font-mono uppercase text-[#6A3FD0] font-semibold">CUSTOM SOFTWARE &amp; AI AGENTS</span>
          <h1 class="text-4xl sm:text-6xl font-bold leading-tight mt-3">Custom software and AI agents that take over repetitive work in your business.</h1>
          <p class="text-lg text-[#5B5675] mt-5 max-w-2xl leading-relaxed">WhatsApp chats answered manually, data copied between spreadsheets, follow-ups forgotten. We build the system so it runs on its own, letting your team focus on work that truly requires a human.</p>
          <div class="mt-6 flex flex-wrap gap-4 items-center">
            <a href="${escapeHtmlAttr(homeWaUrl)}" target="_blank" rel="noopener" class="inline-block px-6 py-3 rounded-full bg-[#6A3FD0] text-white font-bold text-sm hover:bg-[#5230B0] transition-colors">Start with a free 30-minute audit</a>
            <a href="#cara-kerja" class="inline-block px-5 py-3 rounded-full bg-[#FFFFFF] border border-[rgba(91,60,196,0.18)] text-[#17122B] font-semibold text-sm hover:bg-[#F8F6FE] transition-colors">See how we work</a>
          </div>
        </section>

        <!-- 1. Problem Section -->
        <section class="py-16 bg-[#F8F6FE] border-y border-[rgba(91,60,196,0.14)]">
          <div class="max-w-6xl mx-auto px-6">
            <span class="text-xs font-mono uppercase text-[#6A3FD0] font-semibold">REPETITIVE WORK</span>
            <h2 class="text-3xl font-bold mt-2">The repetitive tasks draining your business</h2>
            <p class="text-base text-[#5B5675] mt-2 max-w-2xl">Daily friction that steals hours from your team and slows down your response to prospective clients.</p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div class="p-6 rounded-2xl bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)]">
                <span class="text-xs font-mono text-[#6A3FD0] font-semibold">01</span>
                <h3 class="text-lg font-bold text-[#17122B] mt-2">WhatsApp messages piling up daily</h3>
                <p class="text-sm text-[#5B5675] mt-2 leading-relaxed">The same questions answered repeatedly. Evening messages wait until the next morning to get a response.</p>
              </div>
              <div class="p-6 rounded-2xl bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)]">
                <span class="text-xs font-mono text-[#6A3FD0] font-semibold">02</span>
                <h3 class="text-lg font-bold text-[#17122B] mt-2">Copying data between multiple spreadsheets</h3>
                <p class="text-sm text-[#5B5675] mt-2 leading-relaxed">Staff time consumed by manual summaries, prone to typing errors, and producing delayed reports.</p>
              </div>
              <div class="p-6 rounded-2xl bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)]">
                <span class="text-xs font-mono text-[#6A3FD0] font-semibold">03</span>
                <h3 class="text-lg font-bold text-[#17122B] mt-2">Prospect follow-ups forgotten</h3>
                <p class="text-sm text-[#5B5675] mt-2 leading-relaxed">Prospective clients asked for pricing but nobody followed up, resulting in lost deals.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 2. Agent Simulation Teaser -->
        <section class="py-16 bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)]">
          <div class="max-w-4xl mx-auto px-6 text-center">
            <span class="text-xs font-mono uppercase text-[#6A3FD0] font-semibold">LIVE AGENT DEMO</span>
            <h2 class="text-3xl font-bold mt-2">Live Interactive Demo: Test an agent yourself</h2>
            <p class="text-base text-[#5B5675] mt-3 leading-relaxed">Experience how our agent understands customer intent in everyday natural language, queries slot availability, and completes the action automatically.</p>
          </div>
        </section>

        <!-- 3. Chatbot vs Agent -->
        <section class="py-16 bg-[#F8F6FE] border-b border-[rgba(91,60,196,0.14)]">
          <div class="max-w-5xl mx-auto px-6">
            <div class="text-center mb-10">
              <span class="text-xs font-mono uppercase text-[#6A3FD0] font-semibold">CORE DIFFERENCE</span>
              <h3 class="text-3xl font-bold mt-2">Chatbots reply. Agents finish the job.</h3>
              <p class="text-base text-[#5B5675] mt-2">Conventional chatbots stop at canned text. AI agents use real tools to complete operational tasks.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="p-6 rounded-2xl bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)]">
                <span class="text-xs font-mono text-[#5B5675] font-semibold">CONVENTIONAL CHATBOT</span>
                <h3 class="text-xl font-bold text-[#17122B] mt-2">Only Repeats FAQ Text</h3>
                <ul class="mt-4 space-y-2 text-sm text-[#5B5675] leading-relaxed">
                  <li>— Replies rigidly based on pre-written keyword trees.</li>
                  <li>— Cannot check live calendars or update database records.</li>
                  <li>— Your team still has to copy, summarize, and re-enter data manually.</li>
                </ul>
              </div>
              <div class="p-6 rounded-2xl bg-[#FFFFFF] border-2 border-[#6A3FD0]">
                <span class="text-xs font-mono text-[#6A3FD0] font-semibold">CHESTAADOTCOM AI AGENT</span>
                <h3 class="text-xl font-bold text-[#17122B] mt-2">Executes Tasks to Completion</h3>
                <ul class="mt-4 space-y-2 text-sm text-[#17122B] leading-relaxed">
                  <li>✓ Understands customer intent in everyday natural language.</li>
                  <li>✓ Connects directly to your calendar, database, invoices, and CRM.</li>
                  <li>✓ Completes the action and sends a clean summary to your team.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- 4. Bento Capabilities -->
        <section id="layanan" class="py-16 bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)]">
          <div class="max-w-6xl mx-auto px-6">
            <span class="text-xs font-mono uppercase text-[#6A3FD0] font-semibold">OUR CAPABILITIES</span>
            <h2 class="text-3xl font-bold mt-2">What we build for your business</h2>
            <p class="text-base text-[#5B5675] mt-2 max-w-2xl">Four systems that streamline how you acquire customers and run daily operations.</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div class="p-6 rounded-2xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)]">
                <span class="text-xs font-mono text-[#6A3FD0] font-semibold">WHATSAPP &amp; CRM</span>
                <h3 class="text-xl font-bold text-[#17122B] mt-2"><a href="/en/services/ai-agents" class="hover:text-[#6A3FD0]">AI agents for WhatsApp &amp; CRM</a></h3>
                <p class="text-sm text-[#5B5675] mt-2 leading-relaxed">Answers inquiries, checks open schedule slots, and records bookings automatically. Hands over cleanly to human staff when needed.</p>
                <p class="mt-4 text-xs font-mono text-[#6A3FD0]"><a href="/en/services/ai-agents" class="underline font-semibold">AI agent development &rarr;</a></p>
              </div>
              <div class="p-6 rounded-2xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)]">
                <span class="text-xs font-mono text-[#6A3FD0] font-semibold">WEB APPS &amp; DASHBOARDS</span>
                <h3 class="text-xl font-bold text-[#17122B] mt-2"><a href="/en/services/custom-software" class="hover:text-[#6A3FD0]">Custom web applications &amp; operational software</a></h3>
                <p class="text-sm text-[#5B5675] mt-2 leading-relaxed">Systems built around your team's exact workflow, from reporting dashboards to operational multi-role software.</p>
                <p class="mt-4 text-xs font-mono text-[#6A3FD0]"><a href="/en/services/custom-software" class="underline font-semibold">Custom software development &rarr;</a></p>
              </div>
              <div class="p-6 rounded-2xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)]">
                <span class="text-xs font-mono text-[#6A3FD0] font-semibold">FROM IDR 3,500,000</span>
                <h3 class="text-xl font-bold text-[#17122B] mt-2"><a href="/en/services/workflow-automation" class="hover:text-[#6A3FD0]">Business workflow automation</a></h3>
                <p class="text-sm text-[#5B5675] mt-2 leading-relaxed">Connects WhatsApp, Google Sheets, calendars, and invoicing tools so recurring tasks run without manual copy-pasting.</p>
                <p class="mt-4 text-xs font-mono text-[#6A3FD0]"><a href="/en/services/workflow-automation" class="underline font-semibold">Workflow automation service &rarr;</a></p>
              </div>
              <div class="p-6 rounded-2xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)]">
                <span class="text-xs font-mono text-[#6A3FD0] font-semibold">FROM IDR 1,200,000</span>
                <h3 class="text-xl font-bold text-[#17122B] mt-2"><a href="/en/services/website-development" class="hover:text-[#6A3FD0]">Website &amp; landing page development</a></h3>
                <p class="text-sm text-[#5B5675] mt-2 leading-relaxed">Loads fast on mobile networks, presents a clear offer structure, and is ready for Google or Meta Ads campaigns.</p>
                <p class="mt-4 text-xs font-mono text-[#6A3FD0]"><a href="/en/services/website-development" class="underline font-semibold">Website development service &rarr;</a></p>
              </div>
            </div>
          </div>
        </section>

        <!-- 5. Guardrails & Safety -->
        <section class="py-16 bg-[#F8F6FE] border-b border-[rgba(91,60,196,0.14)]">
          <div class="max-w-6xl mx-auto px-6">
            <span class="text-xs font-mono uppercase text-[#6A3FD0] font-semibold">GUARDRAILS &amp; SAFETY</span>
            <h2 class="text-3xl font-bold mt-2">AI that takes action must have clear boundaries.</h2>
            <p class="text-base text-[#5B5675] mt-2 max-w-2xl leading-relaxed">We never deploy AI without strict corridors. Every agent is governed by explicit rules agreed upon before the system goes live.</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              <div class="p-5 rounded-2xl bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)]">
                <h3 class="font-bold text-[#17122B] text-base">Clear Boundaries</h3>
                <p class="text-sm text-[#5B5675] mt-1.5 leading-relaxed">The agent only acts within explicitly written corridors.</p>
              </div>
              <div class="p-5 rounded-2xl bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)]">
                <h3 class="font-bold text-[#17122B] text-base">Human Handover</h3>
                <p class="text-sm text-[#5B5675] mt-1.5 leading-relaxed">Ambiguous requests are forwarded immediately with complete chat summaries.</p>
              </div>
              <div class="p-5 rounded-2xl bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)]">
                <h3 class="font-bold text-[#17122B] text-base">Full Action Logging</h3>
                <p class="text-sm text-[#5B5675] mt-1.5 leading-relaxed">Every tool call and database modification is recorded in an audit trail.</p>
              </div>
              <div class="p-5 rounded-2xl bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)]">
                <h3 class="font-bold text-[#17122B] text-base">Your Data Ownership</h3>
                <p class="text-sm text-[#5B5675] mt-1.5 leading-relaxed">Your database and business documents remain under your full ownership without lock-in.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 6. Production Stack -->
        <section class="py-16 bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)] text-center">
          <div class="max-w-4xl mx-auto px-6">
            <span class="text-xs font-mono uppercase text-[#6A3FD0] font-semibold">PRODUCTION TECHNOLOGY</span>
            <h3 class="text-3xl font-bold mt-2">Built with tools we know inside out</h3>
            <p class="text-base text-[#5B5675] mt-2">A stable, lightweight technical foundation that is easy to maintain long-term.</p>
            <div class="flex flex-wrap justify-center gap-3 mt-6">
              <span class="px-4 py-2 rounded-full bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] text-xs font-mono font-medium">React</span>
              <span class="px-4 py-2 rounded-full bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] text-xs font-mono font-medium">Node.js</span>
              <span class="px-4 py-2 rounded-full bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] text-xs font-mono font-medium">Python</span>
              <span class="px-4 py-2 rounded-full bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] text-xs font-mono font-medium">PostgreSQL</span>
              <span class="px-4 py-2 rounded-full bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] text-xs font-mono font-medium">WhatsApp Cloud API</span>
              <span class="px-4 py-2 rounded-full bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] text-xs font-mono font-medium">n8n Workflow</span>
            </div>
          </div>
        </section>

        <!-- 7. Cara Kerja (6 Phases) -->
        <section id="cara-kerja" class="py-16 bg-[#F8F6FE] border-b border-[rgba(91,60,196,0.14)]">
          <div class="max-w-6xl mx-auto px-6">
            <span class="text-xs font-mono uppercase text-[#6A3FD0] font-semibold">6-PHASE ENGINEERING</span>
            <h2 class="text-3xl font-bold mt-2">How we work without guesswork</h2>
            <p class="text-base text-[#5B5675] mt-2 max-w-2xl">A disciplined six-phase process from 30-minute free audit to final release and handover.</p>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              ${processPhasesHtml}
            </div>
            <p class="mt-8 text-center"><a href="/en/cara-kerja" class="text-sm font-semibold text-[#6A3FD0] underline">View all 6 phases &rarr;</a></p>
          </div>
        </section>

        <!-- 8. Projects -->
        <section id="proyek" class="py-16 bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)]">
          <div class="max-w-6xl mx-auto px-6">
            <span class="text-xs font-mono uppercase text-[#6A3FD0] font-semibold">SAMPLE PROJECTS</span>
            <h2 class="text-3xl font-bold mt-2">Sample projects we have built</h2>
            <p class="text-base text-[#5B5675] mt-2 max-w-2xl">Sample projects designed to show our workflow across different industries. Not client projects.</p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              ${recentProjectsHtml}
            </div>
            <p class="mt-8 text-center"><a href="/en/portfolio" class="text-sm font-semibold text-[#6A3FD0] underline">View all projects &rarr;</a></p>
          </div>
        </section>

        <!-- 9. Harga (Pricing) -->
        <section id="harga" class="py-16 bg-[#F8F6FE] border-b border-[rgba(91,60,196,0.14)]">
          <div class="max-w-6xl mx-auto px-6">
            <span class="text-xs font-mono uppercase text-[#6A3FD0] font-semibold">COST TRANSPARENCY</span>
            <h2 class="text-3xl font-bold mt-2">Clear pricing from day one</h2>
            <p class="text-base text-[#5B5675] mt-2 max-w-2xl">Zero hidden fees. You know the exact system scope before development begins.</p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div class="p-6 rounded-2xl bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)]">
                <span class="text-xs font-mono text-[#6A3FD0] font-semibold">FAST PACKAGE</span>
                <h3 class="text-xl font-bold text-[#17122B] mt-1">Landing Page</h3>
                <p class="text-2xl font-bold text-[#6A3FD0] mt-3">from IDR 1,200,000</p>
                <p class="text-sm text-[#5B5675] mt-2 leading-relaxed">For ad campaigns, concise company profiles, and conversion-focused offer pages.</p>
              </div>
              <div class="p-6 rounded-2xl bg-[#FFFFFF] border-2 border-[#6A3FD0]">
                <span class="text-xs font-mono text-[#6A3FD0] font-semibold">AI AUTOMATION</span>
                <h3 class="text-xl font-bold text-[#17122B] mt-1">AI Agent WhatsApp</h3>
                <p class="text-2xl font-bold text-[#6A3FD0] mt-3">from IDR 7,500,000</p>
                <p class="text-sm text-[#5B5675] mt-2 leading-relaxed">Repetitive chat replies, schedule check, automated booking, and customer follow-up.</p>
              </div>
              <div class="p-6 rounded-2xl bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)]">
                <span class="text-xs font-mono text-[#6A3FD0] font-semibold">CUSTOM SYSTEM</span>
                <h3 class="text-xl font-bold text-[#17122B] mt-1">Custom Software</h3>
                <p class="text-2xl font-bold text-[#6A3FD0] mt-3">from IDR 15,000,000</p>
                <p class="text-sm text-[#5B5675] mt-2 leading-relaxed">Operations dashboards, multi-role web apps, and connected business databases.</p>
              </div>
            </div>
            <p class="mt-8 text-center"><a href="/en/harga" class="text-sm font-semibold text-[#6A3FD0] underline">View full pricing &amp; packages &rarr;</a></p>
          </div>
        </section>

        <!-- 10. Founders -->
        <section class="py-16 bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)]">
          <div class="max-w-4xl mx-auto px-6 text-center">
            <span class="text-xs font-mono uppercase text-[#6A3FD0] font-semibold">ENGINEERING TEAM</span>
            <h2 class="text-3xl font-bold mt-2">Two engineers who build your system directly</h2>
            <p class="text-base text-[#5B5675] mt-3 leading-relaxed">CHESTAADOTCOM was founded by Chesta Azka (architecture, product, technology) and Zeeshan (system engineering, execution) in BSD, South Tangerang. We never outsource your system to unknown junior freelancers.</p>
          </div>
        </section>

        <!-- 11. Blog -->
        <section class="py-16 bg-[#F8F6FE] border-b border-[rgba(91,60,196,0.14)]">
          <div class="max-w-6xl mx-auto px-6">
            <span class="text-xs font-mono uppercase text-[#6A3FD0] font-semibold">FROM OUR DESK</span>
            <h3 class="text-3xl font-bold mt-2">Technical notes and recent articles</h3>
            <p class="text-base text-[#5B5675] mt-2">Practical engineering guides and operational automation insights.</p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              ${recentPostsHtml}
            </div>
            <p class="mt-8 text-center"><a href="/en/blog" class="text-sm font-semibold text-[#6A3FD0] underline">View all articles &rarr;</a></p>
          </div>
        </section>

        <!-- 12. FAQ -->
        <section id="faq" class="max-w-4xl mx-auto px-6 py-16">
          <h2 class="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          ${homeFaqHtml}
        </section>

        <!-- 13. Final CTA -->
        <section class="py-16 bg-gradient-to-b from-[#F8F6FE] to-[#EFEAFB] text-center border-t border-[rgba(91,60,196,0.14)]">
          <div class="max-w-3xl mx-auto px-6">
            <h3 class="text-3xl sm:text-4xl font-bold">Start with a free 30-minute audit</h3>
            <p class="text-base text-[#5B5675] mt-3 leading-relaxed">Tell us the repetitive tasks that exhaust your team the most. We will speak candidly about whether it can be automated and what it will cost.</p>
            <div class="mt-8">
              <a href="${escapeHtmlAttr(homeWaUrl)}" target="_blank" rel="noopener" class="inline-block px-8 py-4 rounded-full bg-[#6A3FD0] text-white font-bold text-base hover:bg-[#5230B0] transition-colors">Start free consultation on WhatsApp</a>
            </div>
          </div>
        </section>
      </main>
    `;
  }

  return `
    <main class="bg-[#FFFFFF] text-[#17122B] min-h-screen">
      <header class="max-w-6xl mx-auto px-6 py-6 flex flex-wrap justify-between items-center gap-4 border-b border-[rgba(91,60,196,0.1)]">
        <a href="/id" class="font-bold text-lg text-[#17122B]">CHESTAADOTCOM</a>
        <nav aria-label="Navigasi Utama" class="flex flex-wrap gap-4 text-sm font-medium text-[#5B5675]">
          ${headerNavHtml}
          <a href="${escapeHtmlAttr(langSwitchLinks.idUrl)}" hreflang="id" class="font-mono text-xs text-[#6A3FD0] font-bold">ID</a>
          <a href="${escapeHtmlAttr(langSwitchLinks.enUrl)}" hreflang="en" class="font-mono text-xs text-[#6A3FD0]">EN</a>
        </nav>
      </header>

      <section class="max-w-6xl mx-auto px-6 py-16">
        <span class="text-xs font-mono uppercase text-[#6A3FD0] font-semibold">SOFTWARE CUSTOM &amp; AI AGENT</span>
        <h1 class="text-4xl sm:text-6xl font-bold leading-tight mt-3">Software custom dan AI agent yang mengambil alih kerja berulang di bisnismu.</h1>
        <p class="text-lg text-[#5B5675] mt-5 max-w-2xl leading-relaxed">Chat WhatsApp yang dibalas manual, data yang disalin dari sheet ke sheet, follow-up yang lupa dikirim. Kami bangun sistemnya supaya jalan sendiri, dan tim kamu fokus ke hal yang memang butuh manusia.</p>
        <div class="mt-6 flex flex-wrap gap-4 items-center">
          <a href="${escapeHtmlAttr(homeWaUrl)}" target="_blank" rel="noopener" class="inline-block px-6 py-3 rounded-full bg-[#6A3FD0] text-white font-bold text-sm hover:bg-[#5230B0] transition-colors">Mulai dari audit gratis 30 menit</a>
          <a href="#cara-kerja" class="inline-block px-5 py-3 rounded-full bg-[#FFFFFF] border border-[rgba(91,60,196,0.18)] text-[#17122B] font-semibold text-sm hover:bg-[#F8F6FE] transition-colors">Lihat cara kerja</a>
        </div>
      </section>

      <!-- 1. Problem Section -->
      <section class="py-16 bg-[#F8F6FE] border-y border-[rgba(91,60,196,0.14)]">
        <div class="max-w-6xl mx-auto px-6">
          <span class="text-xs font-mono uppercase text-[#6A3FD0] font-semibold">KERJA BERULANG</span>
          <h2 class="text-3xl font-bold mt-2">Kerjaan berulang yang pelan-pelan menguras energimu</h2>
          <p class="text-base text-[#5B5675] mt-2 max-w-2xl">Gesekan operasional harian yang menyita jam kerja tim dan memperlambat respon ke calon pelanggan.</p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div class="p-6 rounded-2xl bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)]">
              <span class="text-xs font-mono text-[#6A3FD0] font-semibold">01</span>
              <h3 class="text-lg font-bold text-[#17122B] mt-2">Pesan WhatsApp menumpuk setiap hari</h3>
              <p class="text-sm text-[#5B5675] mt-2 leading-relaxed">Pertanyaan yang sama dijawab berulang kali. Malam hari pesan masuk baru dibalas besok pagi.</p>
            </div>
            <div class="p-6 rounded-2xl bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)]">
              <span class="text-xs font-mono text-[#6A3FD0] font-semibold">02</span>
              <h3 class="text-lg font-bold text-[#17122B] mt-2">Salin data dari satu spreadsheet ke spreadsheet lain</h3>
              <p class="text-sm text-[#5B5675] mt-2 leading-relaxed">Waktu staf habis untuk rekap manual, rawan salah ketik, dan laporan terlambat.</p>
            </div>
            <div class="p-6 rounded-2xl bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)]">
              <span class="text-xs font-mono text-[#6A3FD0] font-semibold">03</span>
              <h3 class="text-lg font-bold text-[#17122B] mt-2">Follow-up calon pelanggan yang sering terlewat</h3>
              <p class="text-sm text-[#5B5675] mt-2 leading-relaxed">Prospek sudah bertanya harga tapi tidak ada yang menghubungi kembali, hilang begitu saja.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. Agent Simulation Teaser -->
      <section class="py-16 bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)]">
        <div class="max-w-4xl mx-auto px-6 text-center">
          <span class="text-xs font-mono uppercase text-[#6A3FD0] font-semibold">SIMULASI INTERAKTIF</span>
          <h2 class="text-3xl font-bold mt-2">Simulasi Live: Coba kirim pesan ke agent kami</h2>
          <p class="text-base text-[#5B5675] mt-3 leading-relaxed">Coba langsung bagaimana AI agent membaca maksud pesan dalam bahasa sehari-hari, mengecek kalender, dan menyelesaikan booking secara otomatis.</p>
        </div>
      </section>

      <!-- 3. Chatbot vs Agent -->
      <section class="py-16 bg-[#F8F6FE] border-b border-[rgba(91,60,196,0.14)]">
        <div class="max-w-5xl mx-auto px-6">
          <div class="text-center mb-10">
            <span class="text-xs font-mono uppercase text-[#6A3FD0] font-semibold">PERBEDAAN MENDASAR</span>
            <h3 class="text-3xl font-bold mt-2">Chatbot menjawab. Agent menyelesaikan.</h3>
            <p class="text-base text-[#5B5675] mt-2">Chatbot lama berhenti di balasan teks. AI agent memakai tool nyata untuk menuntaskan tugas operasional.</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="p-6 rounded-2xl bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)]">
              <span class="text-xs font-mono text-[#5B5675] font-semibold">CHATBOT KONVENSIONAL</span>
              <h3 class="text-xl font-bold text-[#17122B] mt-2">Hanya Mengulang Teks FAQ</h3>
              <ul class="mt-4 space-y-2 text-sm text-[#5B5675] leading-relaxed">
                <li>— Menjawab kaku sesuai kata kunci yang sudah ditulis.</li>
                <li>— Tidak bisa mengecek kalender atau mengubah data database.</li>
                <li>— Tim kamu tetap harus merangkum dan menginput ulang.</li>
              </ul>
            </div>
            <div class="p-6 rounded-2xl bg-[#FFFFFF] border-2 border-[#6A3FD0]">
              <span class="text-xs font-mono text-[#6A3FD0] font-semibold">AI AGENT CHESTAADOTCOM</span>
              <h3 class="text-xl font-bold text-[#17122B] mt-2">Mengeksekusi Tugas Sampai Tuntas</h3>
              <ul class="mt-4 space-y-2 text-sm text-[#17122B] leading-relaxed">
                <li>✓ Memahami maksud pesan pelanggan dengan bahasa sehari-hari.</li>
                <li>✓ Terhubung langsung ke kalender, database, invoice, dan CRM.</li>
                <li>✓ Menyelesaikan aksi lalu mengirim ringkasan ke tim kamu.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. Bento Capabilities -->
      <section id="layanan" class="py-16 bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)]">
        <div class="max-w-6xl mx-auto px-6">
          <span class="text-xs font-mono uppercase text-[#6A3FD0] font-semibold">KAPABILITAS KAMI</span>
          <h2 class="text-3xl font-bold mt-2">Yang kami bangun untuk bisnismu</h2>
          <p class="text-base text-[#5B5675] mt-2 max-w-2xl">Empat sistem yang merapikan cara kamu menerima pelanggan dan menjalankan operasional harian.</p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div class="p-6 rounded-2xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)]">
              <span class="text-xs font-mono text-[#6A3FD0] font-semibold">WHATSAPP &amp; CRM</span>
              <h3 class="text-xl font-bold text-[#17122B] mt-2"><a href="/id/jasa/ai-agent" class="hover:text-[#6A3FD0]">AI agent untuk WhatsApp &amp; CRM</a></h3>
              <p class="text-sm text-[#5B5675] mt-2 leading-relaxed">Menjawab pertanyaan, mengecek jadwal kosong, dan mencatat booking otomatis. Saat butuh keputusan manusia, agent mengalihkan chat ke stafmu dengan ringkasan utuh.</p>
              <p class="mt-4 text-xs font-mono text-[#6A3FD0]"><a href="/id/jasa/ai-agent" class="underline font-semibold">Jasa AI agent &rarr;</a></p>
            </div>
            <div class="p-6 rounded-2xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)]">
              <span class="text-xs font-mono text-[#6A3FD0] font-semibold">APLIKASI WEB &amp; DASHBOARD</span>
              <h3 class="text-xl font-bold text-[#17122B] mt-2"><a href="/id/jasa/software-custom" class="hover:text-[#6A3FD0]">Software custom &amp; sistem operasional</a></h3>
              <p class="text-sm text-[#5B5675] mt-2 leading-relaxed">Sistem yang mengikuti cara kerjamu, bukan sebaliknya. Dari dashboard laporan sampai aplikasi operasional dengan hak akses per peran.</p>
              <p class="mt-4 text-xs font-mono text-[#6A3FD0]"><a href="/id/jasa/software-custom" class="underline font-semibold">Jasa software custom &rarr;</a></p>
            </div>
            <div class="p-6 rounded-2xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)]">
              <span class="text-xs font-mono text-[#6A3FD0] font-semibold">MULAI RP3.500.000</span>
              <h3 class="text-xl font-bold text-[#17122B] mt-2"><a href="/id/jasa/otomasi-workflow" class="hover:text-[#6A3FD0]">Otomasi alur kerja (workflow)</a></h3>
              <p class="text-sm text-[#5B5675] mt-2 leading-relaxed">Menyambungkan WhatsApp, spreadsheet, kalender, dan invoice supaya tugas berulang berjalan sendiri tanpa salin-tempel manual.</p>
              <p class="mt-4 text-xs font-mono text-[#6A3FD0]"><a href="/id/jasa/otomasi-workflow" class="underline font-semibold">Jasa otomasi workflow &rarr;</a></p>
            </div>
            <div class="p-6 rounded-2xl bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)]">
              <span class="text-xs font-mono text-[#6A3FD0] font-semibold">MULAI RP1.200.000</span>
              <h3 class="text-xl font-bold text-[#17122B] mt-2"><a href="/id/jasa/pembuatan-website" class="hover:text-[#6A3FD0]">Pembuatan website &amp; landing page</a></h3>
              <p class="text-sm text-[#5B5675] mt-2 leading-relaxed">Cepat dibuka di jaringan seluler, struktur penawaran jelas, dan siap dipasangi iklan Google atau Meta Ads.</p>
              <p class="mt-4 text-xs font-mono text-[#6A3FD0]"><a href="/id/jasa/pembuatan-website" class="underline font-semibold">Jasa pembuatan website &rarr;</a></p>
            </div>
          </div>
        </div>
      </section>

      <!-- 5. Guardrails & Safety -->
      <section class="py-16 bg-[#F8F6FE] border-b border-[rgba(91,60,196,0.14)]">
        <div class="max-w-6xl mx-auto px-6">
          <span class="text-xs font-mono uppercase text-[#6A3FD0] font-semibold">GUARDRAILS &amp; KEAMANAN</span>
          <h2 class="text-3xl font-bold mt-2">AI yang bertindak harus punya batas.</h2>
          <p class="text-base text-[#5B5675] mt-2 max-w-2xl leading-relaxed">Kami tidak melepas AI berjalan tanpa koridor. Setiap agent dibatasi aturan main yang disepakati bersama sebelum sistem diaktifkan.</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div class="p-5 rounded-2xl bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)]">
              <h3 class="font-bold text-[#17122B] text-base">Batas Jelas</h3>
              <p class="text-sm text-[#5B5675] mt-1.5 leading-relaxed">Agent hanya bertindak dalam koridor yang disepakati tertulis.</p>
            </div>
            <div class="p-5 rounded-2xl bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)]">
              <h3 class="font-bold text-[#17122B] text-base">Serah ke Manusia</h3>
              <p class="text-sm text-[#5B5675] mt-1.5 leading-relaxed">Percakapan ambigu langsung dialihkan ke timmu lengkap dengan ringkasan.</p>
            </div>
            <div class="p-5 rounded-2xl bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)]">
              <h3 class="font-bold text-[#17122B] text-base">Semua Aksi Tercatat</h3>
              <p class="text-sm text-[#5B5675] mt-1.5 leading-relaxed">Setiap panggilan database dan tool tercatat rapi di log audit.</p>
            </div>
            <div class="p-5 rounded-2xl bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)]">
              <h3 class="font-bold text-[#17122B] text-base">Data Milikmu</h3>
              <p class="text-sm text-[#5B5675] mt-1.5 leading-relaxed">Database dan akun integrasi tetap atas namamu tanpa lock-in.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 6. Production Stack -->
      <section class="py-16 bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)] text-center">
        <div class="max-w-4xl mx-auto px-6">
          <span class="text-xs font-mono uppercase text-[#6A3FD0] font-semibold">TEKNOLOGI PRODUKSI</span>
          <h3 class="text-3xl font-bold mt-2">Dibangun dengan tool yang kami kuasai</h3>
          <p class="text-base text-[#5B5675] mt-2">Fondasi teknis yang stabil, ringan, dan mudah dirawat jangka panjang.</p>
          <div class="flex flex-wrap justify-center gap-3 mt-6">
            <span class="px-4 py-2 rounded-full bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] text-xs font-mono font-medium">React</span>
            <span class="px-4 py-2 rounded-full bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] text-xs font-mono font-medium">Node.js</span>
            <span class="px-4 py-2 rounded-full bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] text-xs font-mono font-medium">Python</span>
            <span class="px-4 py-2 rounded-full bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] text-xs font-mono font-medium">PostgreSQL</span>
            <span class="px-4 py-2 rounded-full bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] text-xs font-mono font-medium">WhatsApp Cloud API</span>
            <span class="px-4 py-2 rounded-full bg-[#F8F6FE] border border-[rgba(91,60,196,0.14)] text-xs font-mono font-medium">n8n Workflow</span>
          </div>
        </div>
      </section>

      <!-- 7. Cara Kerja (6 Phases) -->
      <section id="cara-kerja" class="py-16 bg-[#F8F6FE] border-b border-[rgba(91,60,196,0.14)]">
        <div class="max-w-6xl mx-auto px-6">
          <span class="text-xs font-mono uppercase text-[#6A3FD0] font-semibold">ALUR 6 TAHAP</span>
          <h2 class="text-3xl font-bold mt-2">Cara kerja dengan kepastian tertulis</h2>
          <p class="text-base text-[#5B5675] mt-2 max-w-2xl">Enam tahap terstruktur dari audit gratis 30 menit hingga peluncuran dan serah terima.</p>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            ${processPhasesHtml}
          </div>
          <p class="mt-8 text-center"><a href="/id/cara-kerja" class="text-sm font-semibold text-[#6A3FD0] underline">Lihat 6 tahap lengkap &rarr;</a></p>
        </div>
      </section>

      <!-- 8. Contoh Proyek -->
      <section id="proyek" class="py-16 bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)]">
        <div class="max-w-6xl mx-auto px-6">
          <span class="text-xs font-mono uppercase text-[#6A3FD0] font-semibold">CONTOH PROYEK</span>
          <h2 class="text-3xl font-bold mt-2">Contoh proyek yang kami bangun</h2>
          <p class="text-base text-[#5B5675] mt-2 max-w-2xl">Contoh proyek dirancang untuk memperlihatkan alur kerja kami di berbagai industri. Bukan proyek klien.</p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            ${recentProjectsHtml}
          </div>
          <p class="mt-8 text-center"><a href="/id/portfolio" class="text-sm font-semibold text-[#6A3FD0] underline">Lihat semua proyek &rarr;</a></p>
        </div>
      </section>

      <!-- 9. Harga (Pricing) -->
      <section id="harga" class="py-16 bg-[#F8F6FE] border-b border-[rgba(91,60,196,0.14)]">
        <div class="max-w-6xl mx-auto px-6">
          <span class="text-xs font-mono uppercase text-[#6A3FD0] font-semibold">TRANSPARANSI BIAYA</span>
          <h2 class="text-3xl font-bold mt-2">Harga yang jelas dari awal</h2>
          <p class="text-base text-[#5B5675] mt-2 max-w-2xl">Tanpa biaya tersembunyi. Kamu tahu persis cakupan sistem sebelum pengerjaan dimulai.</p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div class="p-6 rounded-2xl bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)]">
              <span class="text-xs font-mono text-[#6A3FD0] font-semibold">PAKET CEPAT</span>
              <h3 class="text-xl font-bold text-[#17122B] mt-1">Landing Page</h3>
              <p class="text-2xl font-bold text-[#6A3FD0] mt-3">mulai Rp1.200.000</p>
              <p class="text-sm text-[#5B5675] mt-2 leading-relaxed">Untuk kampanye iklan, profil bisnis ringkas, dan halaman penawaran fokus konversi.</p>
            </div>
            <div class="p-6 rounded-2xl bg-[#FFFFFF] border-2 border-[#6A3FD0]">
              <span class="text-xs font-mono text-[#6A3FD0] font-semibold">OTOMASI AI</span>
              <h3 class="text-xl font-bold text-[#17122B] mt-1">AI Agent WhatsApp</h3>
              <p class="text-2xl font-bold text-[#6A3FD0] mt-3">mulai Rp7.500.000</p>
              <p class="text-sm text-[#5B5675] mt-2 leading-relaxed">Balasan chat, booking, dan follow-up yang berulang diselesaikan otomatis.</p>
            </div>
            <div class="p-6 rounded-2xl bg-[#FFFFFF] border border-[rgba(91,60,196,0.14)]">
              <span class="text-xs font-mono text-[#6A3FD0] font-semibold">SISTEM KHUSUS</span>
              <h3 class="text-xl font-bold text-[#17122B] mt-1">Software Custom</h3>
              <p class="text-2xl font-bold text-[#6A3FD0] mt-3">mulai Rp15.000.000</p>
              <p class="text-sm text-[#5B5675] mt-2 leading-relaxed">Dashboard operasional, sistem bisnis, dan aplikasi web khusus sesuai alur timmu.</p>
            </div>
          </div>
          <p class="mt-8 text-center"><a href="/id/harga" class="text-sm font-semibold text-[#6A3FD0] underline">Lihat rincian harga &amp; paket lengkap &rarr;</a></p>
        </div>
      </section>

      <!-- 10. Founders -->
      <section class="py-16 bg-[#FFFFFF] border-b border-[rgba(91,60,196,0.14)]">
        <div class="max-w-4xl mx-auto px-6 text-center">
          <span class="text-xs font-mono uppercase text-[#6A3FD0] font-semibold">TIM REKAYASA</span>
          <h2 class="text-3xl font-bold mt-2">Dua engineer yang membangun sistemmu langsung</h2>
          <p class="text-base text-[#5B5675] mt-3 leading-relaxed">CHESTAADOTCOM didirikan oleh Chesta Azka (arsitektur, produk, teknologi) dan Zeeshan (pengembangan sistem, eksekusi teknis) di BSD, Tangerang Selatan. Kami tidak melempar sistemmu ke freelancer lepas.</p>
        </div>
      </section>

      <!-- 11. Blog -->
      <section class="py-16 bg-[#F8F6FE] border-b border-[rgba(91,60,196,0.14)]">
        <div class="max-w-6xl mx-auto px-6">
          <span class="text-xs font-mono uppercase text-[#6A3FD0] font-semibold">DARI MEJA KAMI</span>
          <h3 class="text-3xl font-bold mt-2">Catatan teknis dan artikel terbaru</h3>
          <p class="text-base text-[#5B5675] mt-2">Catatan praktis seputar rekayasa software dan otomasi operasional bisnis.</p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            ${recentPostsHtml}
          </div>
          <p class="mt-8 text-center"><a href="/id/blog" class="text-sm font-semibold text-[#6A3FD0] underline">Lihat semua artikel &rarr;</a></p>
        </div>
      </section>

      <!-- 12. FAQ -->
      <section id="faq" class="max-w-4xl mx-auto px-6 py-16">
        <h2 class="text-3xl font-bold mb-8">Pertanyaan yang Sering Diajukan</h2>
        ${homeFaqHtml}
      </section>

      <!-- 13. Final CTA -->
      <section class="py-16 bg-gradient-to-b from-[#F8F6FE] to-[#EFEAFB] text-center border-t border-[rgba(91,60,196,0.14)]">
        <div class="max-w-3xl mx-auto px-6">
          <h3 class="text-3xl sm:text-4xl font-bold">Mulai dari audit gratis 30 menit</h3>
          <p class="text-base text-[#5B5675] mt-3 leading-relaxed">Ceritakan kerjaan yang paling bikin capek. Kami bilang jujur apakah bisa dikerjakan, dan berapa kira-kira biayanya.</p>
          <div class="mt-8">
            <a href="${escapeHtmlAttr(homeWaUrl)}" target="_blank" rel="noopener" class="inline-block px-8 py-4 rounded-full bg-[#6A3FD0] text-white font-bold text-base hover:bg-[#5230B0] transition-colors">Mulai konsultasi gratis via WhatsApp</a>
          </div>
        </div>
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
  const robotsValue =
    meta.robotsContent ||
    (meta.noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large');

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
    /<meta\s+property=["']og:type["'][^>]*>/i,
    `<meta property="og:type" content="${escapeHtmlAttr(meta.type)}" />`
  );
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
    `<meta property="og:image" content="${safeImg}" />\n    <meta property="og:image:secure_url" content="${safeImg}" />\n    <meta property="og:image:type" content="image/png" />\n    <meta property="og:image:width" content="1200" />\n    <meta property="og:image:height" content="630" />\n    <meta property="og:image:alt" content="${safeImgAlt}" />`
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
