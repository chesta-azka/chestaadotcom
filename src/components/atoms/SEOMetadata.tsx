import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { getMetaTagsForUrl } from '../../lib/social-meta';
import { parseLocalizedPath } from '../../lib/i18n';

interface SEOMetadataProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  image?: string;
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

export default function SEOMetadata({
  title,
  description,
  keywords,
  ogImage,
  image,
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
  const computed = getMetaTagsForUrl(routePath);
  const { locale, barePath } = parseLocalizedPath(routePath);

  const seoTitle = title || computed.title;
  const seoDescription = description || computed.description;
  const seoKeywords =
    keywords ||
    (locale === 'en'
      ? 'website development BSD, landing page South Tangerang, WhatsApp AI agent, custom software BSD City, workflow automation, CHESTAADOTCOM'
      : 'jasa website BSD, jasa landing page Tangerang Selatan, AI agent WhatsApp, software custom BSD City, otomasi workflow, CHESTAADOTCOM');
  // Canonical URL always strips UTM and query parameters
  const seoUrl = stripUrlQueryAndHash(url || computed.url);
  const seoImage = ogImage || image || computed.image;
  const seoImageAlt = computed.imageAlt || seoTitle;
  const resolvedPreloadImage = preloadImage || computed.preloadImage;
  const seoType = type || ogType || computed.type || 'website';
  const htmlLang = locale === 'en' ? 'en' : 'id';
  const ogLocale = locale === 'en' ? 'en_US' : 'id_ID';
  const ogLocaleAlternate = locale === 'en' ? 'id_ID' : 'en_US';

  const articlePublished = publishedTime || computed.publishedTime;
  const articleModified = modifiedTime || computed.modifiedTime || articlePublished;
  const articleAuthorUrl =
    computed.authorUrl ||
    (locale === 'en'
      ? 'https://chestaa.com/en/about#team'
      : 'https://chestaa.com/id/tentang#tim');
  const resolvedSection = articleSection || computed.articleSection;
  const resolvedTags = articleTags || computed.articleTags || [];

  const protectedRoutes = ['/admin', '/portal', '/workspace', '/client', '/dev'];
  const isProtected = protectedRoutes.some((prefix) => barePath.startsWith(prefix));
  const shouldNoindex = Boolean(noindex || computed.noindex || isProtected);
  const robotsDirective = isProtected
    ? 'noindex, nofollow'
    : shouldNoindex
      ? 'noindex,follow'
      : 'index,follow';

  if (isProtected) {
    return (
      <Helmet htmlAttributes={{ lang: htmlLang }}>
        <title>{seoTitle}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
    );
  }

  let jsonLdPayload: any = computed.jsonLd;
  if (schemaString) {
    try {
      jsonLdPayload = JSON.parse(schemaString);
    } catch {
      jsonLdPayload = computed.jsonLd;
    }
  } else if (jsonLd || schema) {
    jsonLdPayload = jsonLd || schema;
  }

  return (
    <Helmet htmlAttributes={{ lang: htmlLang }}>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <meta
        name="author"
        content={author || computed.authorName || 'Chesta Azka & Zeeshan (CHESTAADOTCOM)'}
      />
      <link rel="canonical" href={seoUrl} />
      <link rel="author" href={articleAuthorUrl} />
      {computed.prevUrl && <link rel="prev" href={computed.prevUrl} />}
      {computed.nextUrl && <link rel="next" href={computed.nextUrl} />}
      {resolvedPreloadImage && (
        <link rel="preload" as="image" href={resolvedPreloadImage} />
      )}
      {computed.alternates && (
        <>
          <link rel="alternate" hrefLang="id" href={computed.alternates.idUrl} />
          <link rel="alternate" hrefLang="en" href={computed.alternates.enUrl} />
          <link rel="alternate" hrefLang="x-default" href={computed.alternates.xDefaultUrl} />
        </>
      )}
      <meta name="robots" content={robotsDirective} />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={seoType} />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:image:secure_url" content={seoImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={seoImageAlt} />
      <meta property="og:site_name" content="CHESTAADOTCOM" />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:locale:alternate" content={ogLocaleAlternate} />

      {/* Article Freshness & Taxonomy Meta Tags */}
      {seoType === 'article' && articlePublished && (
        <meta property="article:published_time" content={articlePublished} />
      )}
      {seoType === 'article' && articleModified && (
        <meta property="article:modified_time" content={articleModified} />
      )}
      {seoType === 'article' && (
        <meta property="article:author" content={articleAuthorUrl} />
      )}
      {seoType === 'article' && resolvedSection && (
        <meta property="article:section" content={resolvedSection} />
      )}
      {seoType === 'article' &&
        resolvedTags.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}

      {/* Twitter Cards Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@chestaadotcom" />
      <meta name="twitter:creator" content="@chestaadotcom" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
      <meta name="twitter:image:alt" content={seoImageAlt} />
      <meta name="twitter:domain" content="chestaa.com" />

      {/* Single Unified JSON-LD @graph Structured Data */}
      {jsonLdPayload && (
        <script type="application/ld+json" key="seo-ld-json">
          {JSON.stringify(jsonLdPayload)}
        </script>
      )}
    </Helmet>
  );
}
