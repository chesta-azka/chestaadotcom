export interface ServiceSchemaInput {
  name: string;
  description: string;
  url: string;
  priceRange?: string;
  providerName?: string;
}

export function generateServiceSchema(input: ServiceSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": input.name,
    "description": input.description,
    "url": input.url,
    "provider": {
      "@type": "ProfessionalService",
      "name": input.providerName || "CHESTAADOTCOM",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "BSD City & Tangerang",
        "addressCountry": "ID"
      }
    },
    "areaServed": {
      "@type": "Country",
      "name": "Indonesia"
    },
    ...(input.priceRange && {
      "offers": {
        "@type": "Offer",
        "priceCurrency": "IDR",
        "price": input.priceRange
      }
    })
  };
}

export function injectSchemaScript(schemaData: object, id: string = 'dynamic-schema') {
  if (typeof window === 'undefined') return;

  // Remove existing if present
  const existing = document.getElementById(id);
  if (existing) {
    existing.remove();
  }

  const script = document.createElement('script');
  script.id = id;
  script.type = 'application/ld+json';
  script.text = JSON.stringify(schemaData);
  document.head.appendChild(script);
}
