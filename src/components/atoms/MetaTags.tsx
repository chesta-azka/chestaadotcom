import { Helmet } from 'react-helmet-async';
import { generateAgencyJsonLd, generateFAQSchema } from '../../lib/seo';

interface MetaTagsProps {
  title: string;
  description: string;
  path?: string;
  includeFaq?: boolean;
}

export default function MetaTags({ title, description, path = '/', includeFaq = false }: MetaTagsProps) {
  const url = `https://chestaa.com${path}`;
  const jsonLd = generateAgencyJsonLd();
  const faqJsonLd = includeFaq ? generateFAQSchema() : null;

  return (
    <Helmet>
      <title>{title} | chestaa.com</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
      {faqJsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(faqJsonLd)}
        </script>
      )}
    </Helmet>
  );
}

