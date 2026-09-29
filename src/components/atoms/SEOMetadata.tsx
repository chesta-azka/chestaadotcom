import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { generateLocalBusinessSchema, generateOrganizationSchema } from '../../lib/seo';

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
  schemaString?: string;
  path?: string;
  breadcrumbs?: any[];
  publishedTime?: string;
  author?: string;
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
  path
}: SEOMetadataProps) {
  
  // Gen-Z Jaksel Persona defaults as specified
  const defaultTitle = "Chestaa - Agensi AI & Website B2B Paling Kenceng di BSD.";
  const defaultDescription = "Jujurly, website lambat tuh literally bakar duit iklan lo. Chestaa ngebangun arsitektur Next.js 15 dan sistem AI otonom buat ngelipatgandain ROAS dan pangkas biaya operasional bisnis lo di Tangerang dan sekitarnya.";
  const defaultKeywords = "agensi AI automation, website B2B BSD, jasa web developer Tangerang, Next.js 15, Chestaa, optimization AEO";
  
  const seoTitle = title ? (title.includes('Chestaa') ? title : `${title} | Chestaa`) : defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoKeywords = keywords || defaultKeywords;
  
  const location = useLocation();
  const routePath = currentRoute || path || (location ? location.pathname : '');
  const seoUrl = url || (routePath && routePath !== '/' ? `https://chestaa.com${routePath}` : 'https://chestaa.com');
  
  const seoImage = ogImage || image || 'https://picsum.photos/seed/chestaa-og/1200/630';
  const seoType = type || ogType || 'website';

  const localBusinessSchema = generateLocalBusinessSchema();
  const organizationSchema = generateOrganizationSchema();

  const finalSchemas = schema 
    ? Array.isArray(schema) 
      ? [localBusinessSchema, organizationSchema, ...schema] 
      : [localBusinessSchema, organizationSchema, schema]
    : [localBusinessSchema, organizationSchema];

  return (
    <Helmet>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <meta name="author" content="Chesta Azka" />
      <link rel="canonical" href={seoUrl} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      
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
      <meta property="og:site_name" content="Chestaa Technology" />
      <meta property="og:locale" content="id_ID" />

      {/* Twitter Cards Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@chestaadotcom" />
      <meta name="twitter:creator" content="@chestaadotcom" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
      <meta name="twitter:image:alt" content={seoTitle} />
      <meta name="twitter:domain" content="chestaa.com" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" key="seo-ld-json">
        {JSON.stringify(finalSchemas)}
      </script>
    </Helmet>
  );
}
