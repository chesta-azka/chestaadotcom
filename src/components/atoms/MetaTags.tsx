import { Helmet } from 'react-helmet-async';
import { generateLocalBusinessSchema, generateWebSiteSchema, generateSiteNavigationElement, generateBreadcrumbs, generateServiceSchema, generateProjectSchema } from '../../lib/seo';

interface MetaTagsProps {
  title: string;
  description: string;
  path?: string;
  breadcrumbs?: { name: string; item: string }[];
  ogImage?: string;
  serviceSchema?: { name: string; description: string };
  projectSchema?: { name: string; description: string; image: string; url: string };
}

export default function MetaTags({ title, description, path = '/', breadcrumbs, ogImage, serviceSchema, projectSchema }: MetaTagsProps) {
  const finalTitle = title.includes('chestadotcom') ? title : `${title} | chestadotcom`;
  const url = `https://chestadotcom.com${path}`;
  
  const localBusinessLd = generateLocalBusinessSchema();
  const websiteLd = generateWebSiteSchema();
  const siteNavLd = generateSiteNavigationElement();
  const breadcrumbLd = breadcrumbs ? generateBreadcrumbs(breadcrumbs) : null;
  const serviceLd = serviceSchema ? generateServiceSchema(serviceSchema.name, serviceSchema.description) : null;
  const projectLd = projectSchema ? generateProjectSchema(projectSchema.name, projectSchema.description, projectSchema.image, projectSchema.url) : null;

  const finalOgImage = ogImage || 'https://chestadotcom.com/og-preview-image.jpg';

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
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:site_name" content="chestadotcom" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@chestadotcom" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={finalOgImage} />

      <script type="application/ld+json">{JSON.stringify(localBusinessLd)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteLd)}</script>
      <script type="application/ld+json">{JSON.stringify(siteNavLd)}</script>
      {breadcrumbLd && <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>}
      {serviceLd && <script type="application/ld+json">{JSON.stringify(serviceLd)}</script>}
      {projectLd && <script type="application/ld+json">{JSON.stringify(projectLd)}</script>}
    </Helmet>
  );
}

