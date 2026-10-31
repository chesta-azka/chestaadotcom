import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { parseLocalizedPath, getHreflangAlternates, SITE_URL } from '../../lib/i18n';

interface SEOMetadataProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  image?: string;
  imageAlt?: string;
  currentRoute?: string;
  url?: string;
  type?: string;
  ogType?: string;
  schema?: any;
  jsonLd?: any;
  schemaString?: string;
  path?: string;
  breadcrumbs?: any[];
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  articleSection?: string;
  articleTags?: string[];
  preloadImage?: string;
  noindex?: boolean;
}

function stripUrlQueryAndHash(rawUrl: string): string {
  if (!rawUrl) return 'https://chestaa.com/id';
  return rawUrl.split('?')[0].split('#')[0].replace(/\/+$/, '') || 'https://chestaa.com/id';
}

function getRouteOgPngPathInline(rawPathname: string): string {
  const clean = (rawPathname || '/id').split('?')[0].split('#')[0].replace(/\/+$/, '') || '/id';
  if (clean === '/' || clean === '/id') return '/images/og/id/index.png';
  if (clean === '/en') return '/images/og/en/index.png';
  if (clean.startsWith('/id/')) return `/images/og/id/${clean.slice(4)}.png`;
  if (clean.startsWith('/en/')) return `/images/og/en/${clean.slice(4)}.png`;
  return `/images/og/id/${clean.replace(/^\/+/, '')}.png`;
}

function calibrateClientMetaLengths(
  rawTitle: string,
  rawDescription: string,
  isEn: boolean
): { title: string; description: string } {
  let title = (rawTitle || '').trim();
  let description = (rawDescription || '').trim();

  if (title.length < 50) {
    const suffix = isEn
      ? ' — BSD, South Tangerang | CHESTAADOTCOM'
      : ' — BSD, Tangerang Selatan | CHESTAADOTCOM';
    if (!title.includes('CHESTAADOTCOM')) {
      title = `${title}${suffix}`;
    } else {
      title = title.replace(
        /\|\s*CHESTAADOTCOM$/,
        isEn ? 'in South Tangerang | CHESTAADOTCOM' : 'di Tangerang Selatan | CHESTAADOTCOM'
      );
    }
  }
  if (title.length > 62) {
    const withoutBrand = title.replace(/\s*\|\s*CHESTAADOTCOM$/i, '').trim();
    title =
      withoutBrand.length >= 34 && withoutBrand.length <= 46
        ? `${withoutBrand} | CHESTAADOTCOM`
        : `${withoutBrand.slice(0, 45).trim().replace(/[,;:-]+$/, '')} | CHESTAADOTCOM`;
  }

  if (description.length < 150) {
    const pads = isEn
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
        ]
      : [
          ' Audit gratis 30 menit.',
          ' Konsultasi gratis.',
          ' Mulai audit gratis.',
          ' Di BSD & Tangsel.',
          ' Di Tangsel.',
          ' Cepat & transparan.',
          ' Cakupan jelas.',
          ' Tanpa lock-in.',
          ' Baca selengkapnya.',
          ' Siap pakai.',
        ];
    for (const pad of pads) {
      const candidate = description.endsWith('.')
        ? `${description}${pad}`
        : `${description}.${pad}`;
      if (candidate.length >= 150 && candidate.length <= 160) {
        description = candidate;
        break;
      }
    }
    if (description.length < 150) {
      const filler = isEn
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

export default function SEOMetadata({
  title,
  description,
  keywords,
  ogImage,
  image,
  imageAlt,
  currentRoute,
  url,
  type,
  ogType,
  schema,
  jsonLd,
  schemaString,
  path,
  publishedTime,
  modifiedTime,
  author,
  articleSection,
  articleTags,
  preloadImage,
  noindex,
}: SEOMetadataProps) {
  const location = useLocation();
  const routePath = (location?.pathname || currentRoute || path || '/id').split('?')[0];
  const { locale, barePath } = parseLocalizedPath(routePath);
  const isEn = locale === 'en';

  const defaultTitle = isEn
    ? 'Websites, AI Agents & Software in Tangsel | CHESTAADOTCOM'
    : 'Jasa Website, AI Agent & Software di Tangsel | CHESTAADOTCOM';

  const defaultDescription = isEn
    ? 'Custom software development, WhatsApp AI agents, workflow automation, and websites in BSD, South Tangerang, and Greater Jakarta. Starting IDR 1,200,000.'
    : 'Pengembangan software custom, AI agent WhatsApp, otomasi workflow, dan pembuatan website di BSD, Tangerang Selatan dan Jabodetabek. Mulai Rp1.200.000.';

  const calibrated = calibrateClientMetaLengths(
    title || defaultTitle,
    description || defaultDescription,
    isEn
  );
  const seoTitle = calibrated.title;
  const seoDescription = calibrated.description;
  const seoKeywords =
    keywords ||
    (isEn
      ? 'website development BSD, landing page South Tangerang, WhatsApp AI agent, custom software BSD City, workflow automation, CHESTAADOTCOM'
      : 'jasa website BSD, jasa landing page Tangerang Selatan, AI agent WhatsApp, software custom BSD City, otomasi workflow, CHESTAADOTCOM');

  const seoUrl = stripUrlQueryAndHash(url || `${SITE_URL}${routePath}`);
  const candidatePropImg = (ogImage || image || '').trim();
  const validPngPropImg =
    candidatePropImg && !candidatePropImg.toLowerCase().endsWith('.svg')
      ? candidatePropImg.startsWith('http')
        ? candidatePropImg
        : `${SITE_URL}/${candidatePropImg.replace(/^\/+/, '')}`
      : '';
  const seoImage = validPngPropImg || `${SITE_URL}${getRouteOgPngPathInline(routePath)}`;
  const seoImageAlt =
    imageAlt ||
    `${seoTitle} — ${isEn ? 'CHESTAADOTCOM Engineering Studio' : 'Studio Rekayasa CHESTAADOTCOM'}`;
  const resolvedPreloadImage = preloadImage;
  const isArticleRoute =
    (barePath.startsWith('/blog/') &&
      !barePath.startsWith('/blog/topik/') &&
      !barePath.startsWith('/blog/topic/') &&
      !barePath.startsWith('/blog/halaman/') &&
      !barePath.startsWith('/blog/page/') &&
      !barePath.startsWith('/blog/kategori/')) ||
    barePath.startsWith('/case-studies/') ||
    barePath.startsWith('/studi-kasus/');
  const seoType = type || ogType || (isArticleRoute ? 'article' : 'website');
  const htmlLang = isEn ? 'en' : 'id';
  const ogLocale = isEn ? 'en_US' : 'id_ID';
  const ogLocaleAlternate = isEn ? 'id_ID' : 'en_US';

  const articlePublished = publishedTime;
  const articleModified = modifiedTime || articlePublished;
  const articleAuthorUrl = isEn
    ? 'https://chestaa.com/en/about#team'
    : 'https://chestaa.com/id/tentang#tim';
  const resolvedSection = articleSection;
  const resolvedTags = articleTags || [];

  const protectedRoutes = ['/admin', '/portal', '/workspace', '/client', '/dev'];
  const isProtected = protectedRoutes.some((prefix) => barePath.startsWith(prefix));
  const shouldNoindex = Boolean(noindex || isProtected);
  const robotsDirective = isProtected
    ? 'noindex, nofollow'
    : shouldNoindex
      ? 'noindex,follow'
      : 'index,follow,max-image-preview:large';

  let jsonLdPayload: any = null;
  if (schemaString) {
    try {
      jsonLdPayload = JSON.parse(schemaString);
    } catch {
      jsonLdPayload = null;
    }
  } else if (jsonLd || schema) {
    jsonLdPayload = jsonLd || schema;
  }

  const alternates = getHreflangAlternates(routePath, SITE_URL);
  const jsonLdText = jsonLdPayload ? JSON.stringify(jsonLdPayload) : '';

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.lang = htmlLang;
    document.title = seoTitle;

    const upsertMeta = (attr: 'name' | 'property', key: string, content: string) => {
      if (!content) return;
      let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const upsertLink = (rel: string, href: string, extra?: Record<string, string>) => {
      if (!href) return;
      const selector = extra?.hreflang
        ? `link[rel="${rel}"][hreflang="${extra.hreflang}"]`
        : `link[rel="${rel}"]`;
      let el = document.head.querySelector(selector) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        if (extra) {
          for (const [k, v] of Object.entries(extra)) el.setAttribute(k, v);
        }
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    upsertMeta('name', 'robots', robotsDirective);
    if (isProtected) return;

    upsertMeta('name', 'description', seoDescription);
    upsertMeta('name', 'keywords', seoKeywords);
    upsertMeta('name', 'author', author || 'Chesta Azka & Zeeshan (CHESTAADOTCOM)');
    upsertMeta('name', 'theme-color', '#6A3FD0');
    upsertLink('canonical', seoUrl);
    upsertLink('author', articleAuthorUrl);

    if (alternates) {
      upsertLink('alternate', alternates.idUrl, { hreflang: 'id' });
      upsertLink('alternate', alternates.enUrl, { hreflang: 'en' });
      upsertLink('alternate', alternates.xDefaultUrl, { hreflang: 'x-default' });
    }

    upsertMeta('property', 'og:type', seoType);
    upsertMeta('property', 'og:url', seoUrl);
    upsertMeta('property', 'og:title', seoTitle);
    upsertMeta('property', 'og:description', seoDescription);
    upsertMeta('property', 'og:image', seoImage);
    upsertMeta('property', 'og:image:secure_url', seoImage);
    upsertMeta('property', 'og:image:type', 'image/png');
    upsertMeta('property', 'og:image:width', '1200');
    upsertMeta('property', 'og:image:height', '630');
    upsertMeta('property', 'og:image:alt', seoImageAlt);
    upsertMeta('property', 'og:site_name', 'CHESTAADOTCOM');
    upsertMeta('property', 'og:locale', ogLocale);
    upsertMeta('property', 'og:locale:alternate', ogLocaleAlternate);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:site', '@chestaadotcom');
    upsertMeta('name', 'twitter:creator', '@chestaadotcom');
    upsertMeta('name', 'twitter:title', seoTitle);
    upsertMeta('name', 'twitter:description', seoDescription);
    upsertMeta('name', 'twitter:image', seoImage);
    upsertMeta('name', 'twitter:image:alt', seoImageAlt);
    upsertMeta('name', 'twitter:domain', 'chestaa.com');

    if (jsonLdText) {
      let scriptEl = document.head.querySelector(
        'script[type="application/ld+json"]'
      ) as HTMLScriptElement | null;
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = jsonLdText;
    }
  }, [
    htmlLang,
    seoTitle,
    seoDescription,
    seoKeywords,
    author,
    robotsDirective,
    isProtected,
    seoUrl,
    articleAuthorUrl,
    alternates,
    seoType,
    seoImage,
    seoImageAlt,
    ogLocale,
    ogLocaleAlternate,
    jsonLdText,
  ]);

  return null;
}
