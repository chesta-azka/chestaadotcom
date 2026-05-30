import { Helmet } from 'react-helmet-async';
import { generateAgencyJsonLd } from '../../lib/seo';

interface MetaTagsProps {
  title: string;
  description: string;
  path?: string;
}

export default function MetaTags({ title, description, path = '/' }: MetaTagsProps) {
  const url = `https://chestacod.com${path}`;
  const jsonLd = generateAgencyJsonLd();

  return (
    <Helmet>
      <title>{title} | CHESTADOTCOM</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
}
