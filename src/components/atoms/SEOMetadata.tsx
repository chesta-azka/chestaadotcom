import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { generateFAQSchema, generateLocalBusinessSchema, generateOrganizationSchema, generateWebSiteSchema } from '../../lib/seo';

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
  schemaString,
  path
}: SEOMetadataProps) {
  
  const defaultTitle = "CHESTAA | Studio Arsitektur Web Next.js & Otomasi AI B2B";
  const defaultDescription = "Jasa pembuatan website performa tinggi, arsitektur Next.js 15 sub-detik, dan otomatisasi AI cerdas untuk bisnis modern di BSD City, Tangerang & Jakarta.";
  const defaultKeywords = "jasa pembuatan website BSD, web development Next.js, AI automation B2B, software house Tangerang, agen AI otonom, Chestaa";
  
  const seoTitle = title ? (title.includes('CHESTAA') || title.includes('Chestaa') ? title : `${title} | CHESTAA`) : defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoKeywords = keywords || defaultKeywords;
  
  const location = useLocation();
  const routePath = currentRoute || path || (location ? location.pathname : '');
  const seoUrl = url || (routePath && routePath !== '/' ? `https://chestaa.com${routePath}` : 'https://chestaa.com/');
  
  const seoImage = ogImage || image || 'https://chestaa.com/chesta.png';
  const seoType = type || ogType || 'website';

  const protectedRoutes = ['/admin', '/portal', '/workspace', '/client'];
  const isProtected = protectedRoutes.some(prefix => routePath.startsWith(prefix));

  if (isProtected) {
    return (
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
    );
  }

  let finalSchemas: any[] = [];

  const homeFaqs = [
    {
      question: "Apa keunggulan arsitektur website Next.js buatan Chestaa?",
      answer: "Website dibangun kustom dengan arsitektur Next.js 15, Server-Side Rendering (SSR), dan Edge Caching sehingga waktu muat halaman berada di bawah 0.8 detik (Core Web Vitals hijau), memotong bounce rate dan meningkatkan konversi."
    },
    {
      question: "Bagaimana sistem Karyawan Digital AI melayani pelanggan 24/7?",
      answer: "Karyawan Digital AI mengotomasi respon chat WhatsApp dan web secara instan menggunakan Large Language Model kustom, memproses kualifikasi prospek tanpa biaya gaji admin manual."
    },
    {
      question: "Di mana cakupan area layanan fisik dan tatap muka Chestaa?",
      answer: "Chestaa berkantor di BSD Green Office Park, Level 3, Cisauk, Tangerang, dan melayani konsultasi langsung untuk area BSD City, Cisauk, Tangerang Selatan, Gading Serpong, Alam Sutera, dan Jakarta."
    }
  ];

  if (schemaString) {
    try {
      const parsed = JSON.parse(schemaString);
      finalSchemas = Array.isArray(parsed) ? parsed : [parsed];
    } catch {
      finalSchemas = [];
    }
  } else if (schema) {
    finalSchemas = Array.isArray(schema) ? schema : [schema];
  } else if (routePath === '' || routePath === '/') {
    finalSchemas = [
      generateOrganizationSchema(),
      generateLocalBusinessSchema(),
      generateWebSiteSchema(),
      generateFAQSchema(homeFaqs)
    ];
  } else {
    finalSchemas = [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": seoTitle,
        "description": seoDescription,
        "url": seoUrl,
        "publisher": {
          "@type": "Organization",
          "name": "CHESTAA",
          "url": "https://chestaa.com",
          "logo": "https://chestaa.com/favicon.svg"
        }
      }
    ];
  }

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
      <meta property="og:site_name" content="CHESTAA" />
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
      {finalSchemas.length > 0 && (
        <script type="application/ld+json" key="seo-ld-json">
          {JSON.stringify(finalSchemas)}
        </script>
      )}
    </Helmet>
  );
}
