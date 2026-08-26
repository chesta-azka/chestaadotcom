import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useDynamicSEO } from '../../lib/useDynamicSEO';

interface SEOProviderProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  keywords?: string;
}

export default function SEOProvider({ title: defaultTitle, description: defaultDesc, canonicalUrl, keywords }: SEOProviderProps) {
  const location = useLocation();
  const canonical = canonicalUrl || `https://chestaa.com\${location.pathname}`;
  
  const seo = useDynamicSEO(defaultTitle, defaultDesc);

  return (
    <Helmet htmlAttributes={{ lang: 'id-ID' }}>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* OpenGraph Tags */}
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      {seo.ogImage && <meta property="og:image" content={seo.ogImage} />}
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      {seo.ogImage && <meta name="twitter:image" content={seo.ogImage} />}
      <link rel="canonical" href={canonical} />
    </Helmet>
  );
}
