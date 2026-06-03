import { Helmet } from 'react-helmet-async';
import { generateLocalBusinessSchema, generateWebSiteSchema, generateSiteNavigationElement, generateBreadcrumbs } from '../../lib/seo';

interface MetaTagsProps {
  title: string;
  description: string;
  path?: string;
  breadcrumbs?: { name: string; item: string }[];
}

export default function MetaTags({ title, description, path = '/', breadcrumbs }: MetaTagsProps) {
  const finalTitle = title.includes('chestaa') ? title : `${title} | chestaa`;
  const url = `https://chestaa.com${path}`;
  
  const localBusinessLd = generateLocalBusinessSchema();
  const websiteLd = generateWebSiteSchema();
  const siteNavLd = generateSiteNavigationElement();
  const breadcrumbLd = breadcrumbs ? generateBreadcrumbs(breadcrumbs) : null;

  const ogImage = 'https://chestaa.com/og-preview-image.jpg';

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="chestaa" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@chestadotcom" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      <script type="application/ld+json">{JSON.stringify(localBusinessLd)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteLd)}</script>
      <script type="application/ld+json">{JSON.stringify(siteNavLd)}</script>
      {breadcrumbLd && <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>}
    </Helmet>
  );
}

