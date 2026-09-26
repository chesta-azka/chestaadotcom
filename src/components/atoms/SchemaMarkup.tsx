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
        "name": "CHESTAADOTCOM",
        "url": "https://chestaa.com",
        "areaServed": ["BSD City", "Cisauk"],
        "knowsAbout": ["High-Performance Web", "AI Agents", "Enterprise Software"]
      },
      {
        "@type": "LocalBusiness",
        "name": "CHESTAADOTCOM",
        "url": "https://chestaa.com",
        "areaServed": ["BSD City", "Cisauk"],
        "knowsAbout": ["High-Performance Web", "AI Agents", "Enterprise Software"]
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
