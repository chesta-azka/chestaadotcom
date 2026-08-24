import { Helmet } from 'react-helmet-async';

interface SchemaMarkupProps {
  schema?: Record<string, any>;
}

export default function SchemaMarkup({ schema }: SchemaMarkupProps) {
  const defaultSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "name": "CHESTADOTCOM",
        "url": "https://chestaa.com",
        "areaServed": ["BSD City", "Cisauk"],
        "knowsAbout": ["Next.js", "AI Agents", "High-Performance Web"]
      },
      {
        "@type": "LocalBusiness",
        "name": "CHESTADOTCOM",
        "url": "https://chestaa.com",
        "areaServed": ["BSD City", "Cisauk"],
        "knowsAbout": ["Next.js", "AI Agents", "High-Performance Web"]
      }
    ]
  };
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema || defaultSchema)}
      </script>
    </Helmet>
  );
}
