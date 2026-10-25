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
  author?: string;
  noindex?: boolean;
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
  noindex,
}: SEOMetadataProps) {
  const location = useLocation();
  const routePath = location?.pathname || currentRoute || path || '/';
  const computed = getMetaTagsForUrl(routePath);
  const { locale, barePath } = parseLocalizedPath(routePath);

  const seoTitle =
    locale === 'en'
      ? computed.title
      : title
      ? title.includes('CHESTAADOTCOM')
        ? title
        : `${title} | CHESTAADOTCOM`
      : computed.title;
  const seoDescription =
    locale === 'en' ? computed.description : description || computed.description;
  const seoKeywords =
    keywords ||
    (locale === 'en'
      ? 'website development BSD, landing page South Tangerang, WhatsApp AI agent, custom software BSD City, workflow automation, CHESTAADOTCOM'
      : 'jasa website BSD, jasa landing page Tangerang Selatan, otomasi AI bisnis, otomasi WhatsApp CRM, web developer BSD City, CHESTAADOTCOM');
  const seoUrl = url || computed.url;
  const seoImage = ogImage || image || computed.image;
  const seoType = type || ogType || computed.type || 'website';
  const htmlLang = locale === 'en' ? 'en' : 'id-ID';
  const ogLocale = locale === 'en' ? 'en_US' : 'id_ID';

  const protectedRoutes = ['/admin', '/portal', '/workspace', '/client'];
  const isProtected = protectedRoutes.some((prefix) => barePath.startsWith(prefix));
  const shouldNoindex = Boolean(noindex || computed.noindex || isProtected);

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
      <meta name="author" content="Chesta Azka & Zeeshan (CHESTAADOTCOM)" />
      <link rel="canonical" href={seoUrl} />
      {computed.alternates && (
        <>
          <link rel="alternate" hrefLang="id-ID" href={computed.alternates.idUrl} />
          <link rel="alternate" hrefLang="en" href={computed.alternates.enUrl} />
          <link rel="alternate" hrefLang="x-default" href={computed.alternates.xDefaultUrl} />
        </>
      )}
      <meta
        name="robots"
        content={
          shouldNoindex
            ? 'noindex, nofollow'
            : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        }
      />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={seoType} />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:image:secure_url" content={seoImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={seoTitle} />
      <meta property="og:site_name" content="CHESTAADOTCOM" />
      <meta property="og:locale" content={ogLocale} />

      {/* Twitter Cards Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@chestaadotcom" />
      <meta name="twitter:creator" content="@chestaadotcom" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
      <meta name="twitter:image:alt" content={seoTitle} />
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
