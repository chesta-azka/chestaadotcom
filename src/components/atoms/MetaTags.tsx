import { Helmet } from 'react-helmet-async';
import { generateAgencyJsonLd, generateFAQSchema, generateSitelinksSearchBox, generateSiteNavigationElement } from '../../lib/seo';

interface MetaTagsProps {
  title: string;
  description: string;
  path?: string;
  includeFaq?: boolean;
}

export default function MetaTags({ title, description, path = '/', includeFaq = false }: MetaTagsProps) {
  // Ensuring consistency with title formats
  const finalTitle = title.includes('chestaa') ? title : `${title} | chestaa`;
  const url = `https://chestaadotcom.com${path}`;
  const jsonLd = generateAgencyJsonLd();
  const searchBoxLd = generateSitelinksSearchBox();
  const siteNavLd = generateSiteNavigationElement();
  const faqJsonLd = includeFaq ? generateFAQSchema() : null;

  // Use a premium looking setup image
  const ogImage = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop';

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="chestaa" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <script type="application/ld+json">{JSON.stringify(searchBoxLd)}</script>
      <script type="application/ld+json">{JSON.stringify(siteNavLd)}</script>
      
      {faqJsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(faqJsonLd)}
        </script>
      )}
    </Helmet>
  );
}

