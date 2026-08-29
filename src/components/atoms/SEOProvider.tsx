import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useDynamicSEO } from '../../lib/useDynamicSEO';

interface SEOProviderProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  keywords?: string;
  ogImage?: string;
  type?: 'website' | 'article';
}

export default function SEOProvider({ title: defaultTitle, description: defaultDesc, canonicalUrl, keywords, ogImage, type = 'website' }: SEOProviderProps) {
  const location = useLocation();
  const canonical = canonicalUrl || `https://chestaadotcom.com${location.pathname}`;
  
  // The hook tries to override with Firestore data if available, but falls back to the props provided.
  const seo = useDynamicSEO(defaultTitle, defaultDesc, ogImage || 'https://chestaadotcom.com/default-og.png');

  return (
    <Helmet htmlAttributes={{ lang: 'id-ID' }}>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* OpenGraph Tags */}
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="CHESTAADOTCOM" />
      {seo.ogImage && <meta property="og:image" content={seo.ogImage} />}
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:site" content="@chestaadotcom" />
      <meta name="twitter:creator" content="@chestaadotcom" />
      {seo.ogImage && <meta name="twitter:image" content={seo.ogImage} />}
      
      <link rel="canonical" href={canonical} />
    </Helmet>
  );
}
