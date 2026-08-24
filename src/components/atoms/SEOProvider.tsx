import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProviderProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  keywords?: string;
}

export default function SEOProvider({ title, description, canonicalUrl, keywords }: SEOProviderProps) {
  const location = useLocation();
  const canonical = canonicalUrl || `https://chestaa.com${location.pathname}`;

  return (
    <Helmet htmlAttributes={{ lang: 'id-ID' }}>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonical} />
    </Helmet>
  );
}
