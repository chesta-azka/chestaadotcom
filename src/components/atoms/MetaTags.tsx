import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

import SchemaMarkup from './SchemaMarkup';
import { 
  generateLocalBusinessSchema, 
  generateWebSiteSchema, 
  generateSiteNavigationElement, 
  generateBreadcrumbs, 
  getBreadcrumbsForRoute,
  generateServiceSchema,
  generateCityGeoSchema
} from '../../lib/seo';

interface MetaTagsProps {
  schemaString?: string;
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  breadcrumbs?: { name: string; item: string }[];
  serviceName?: string;
  cityName?: string;
  ogType?: 'website' | 'article';
  publishedTime?: string;
  author?: string;
}

export default function MetaTags({ 
  title, 
  description, 
  image,
  path = '/', 
  breadcrumbs, 
  serviceName, 
  cityName, 
  schemaString,
  ogType = 'website',
  publishedTime,
  author
}: MetaTagsProps) {
  const defaultTitle = "chestaa.com | Arsitek Web & AI Automation di BSD & Cisauk";
  const defaultDesc = "Solusi B2B Software House elit. Tingkatkan skala bisnis Enterprise dan Tech Startup Anda dengan High-Performance Web Development dan AI Automation di BSD City & Cisauk.";
  const defaultImage = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80';
  
  // Enforce high-density local keywords dynamically across all routes
  
  const [dynamicSeo, setDynamicSeo] = useState<{title?: string, description?: string}>({});

  useEffect(() => {
    const fetchSeo = async () => {
      try {
        const docId = path === '/' ? 'home' : path.replace(/\//g, '_');
        const docRef = doc(db, 'seo_settings', docId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setDynamicSeo({
            title: data.title || undefined,
            description: data.description || undefined
          });
        }
      } catch (e: any) {
        if (e.message && e.message.includes('offline')) {
          console.warn("Firestore is offline. Using default MetaTags.");
        } else {
          console.warn("Failed to fetch dynamic SEO (using defaults):", e.message);
        }
      }
    };
    fetchSeo();
  }, [path]);

  let finalTitle = dynamicSeo.title || title;
  finalTitle = finalTitle ? (finalTitle.includes('CHESTAADOTCOM') || finalTitle.includes('chestaa') ? finalTitle : `${finalTitle} | CHESTAADOTCOM`) : defaultTitle;

  // (title.includes('CHESTAADOTCOM') || title.includes('chestaa') ? title : `${title} | CHESTAADOTCOM`) : defaultTitle;
  if (!finalTitle.includes('BSD') && !finalTitle.includes('Cisauk')) {
      finalTitle = `${finalTitle} - BSD City & Cisauk`;
  }
  
  let finalDesc = dynamicSeo.description || description || defaultDesc;
  if (!finalDesc.includes('BSD City') && !finalDesc.includes('Cisauk')) {
      finalDesc = `${finalDesc} Kami melayani area BSD City, Cisauk, dan sekitarnya.`;
  }

  const url = `https://chestaa.com${path.startsWith('/') ? path : '/' + path}`.replace(/\/+$/, '');
  
  const websiteLd = generateWebSiteSchema();
  const localBusinessLd = generateLocalBusinessSchema();
  const siteNavLd = generateSiteNavigationElement();
  const breadcrumbLd = generateBreadcrumbs(breadcrumbs && breadcrumbs.length > 0 ? breadcrumbs : getBreadcrumbsForRoute(path, title));
  const serviceLd = serviceName ? generateServiceSchema(serviceName, description, url) : null;
  const cityGeoLd = cityName ? generateCityGeoSchema(cityName) : null;
  
  const finalOgImage = image || defaultImage;

  return (
    <>
      <SchemaMarkup />
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDesc} />
      <link rel="canonical" href={url || "https://chestaa.com"} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDesc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:image:secure_url" content={finalOgImage} />
      <meta property="og:image:alt" content={finalTitle} />
      <meta property="og:site_name" content="CHESTAADOTCOM" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@chestaadotcom" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDesc} />
      <meta name="twitter:image" content={finalOgImage} />
      <meta name="twitter:image:alt" content={finalTitle} />

      {/* Article Specific Metadata */}
      {ogType === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {ogType === 'article' && author && (
        <meta property="article:author" content={author} />
      )}

      {/* Local SEO / Geo Tags */}
      <meta name="geo.region" content="ID-BT" />
      <meta name="geo.placename" content={cityName || "BSD City, Cisauk"} />
      <meta name="geo.position" content="-6.3042;106.6439" />
      <meta name="ICBM" content="-6.3042, 106.6439" />


      
      <script type="application/ld+json">{JSON.stringify(websiteLd)}</script>
      <script type="application/ld+json">{JSON.stringify(localBusinessLd)}</script>
      <script type="application/ld+json">{JSON.stringify(siteNavLd)}</script>
      {breadcrumbLd && <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>}
      {serviceLd && <script type="application/ld+json">{JSON.stringify(serviceLd)}</script>}
      {cityGeoLd && <script type="application/ld+json">{JSON.stringify(cityGeoLd)}</script>}
      {schemaString && <script type="application/ld+json">{schemaString}</script>}
    </Helmet>
    </>
  );
}
