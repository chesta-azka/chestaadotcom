const fs = require('fs');

const code = `export const generateLocalBusinessSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "CHESTADOTCOM - Digital Architect",
    "image": "https://chestaa.com/favicon.svg",
    "description": "Jasa pembuatan website premium dan implementasi Agentic AI untuk otomasi bisnis.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "BSD Green Office Park",
      "addressLocality": "Tangerang",
      "addressRegion": "Banten",
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -6.299,
      "longitude": 106.657
    },
    "url": "https://chestaa.com",
    "priceRange": "$$",
    "openingHours": "Mo-Fr 09:00-18:00",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "hello@chestaa.com",
      "telephone": "+6282125447232"
    }
  };
};

export const generateCityGeoSchema = (cityName) => {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": \`Jasa Pembuatan Website \${cityName} | CHESTADOTCOM\`,
    "image": "https://chestaa.com/favicon.svg",
    "description": \`Mitra transformasi digital dan jasa pembuatan website premium terbaik untuk bisnis Anda di \${cityName}. Tingkatkan SEO lokal dan konversi penjualan dengan arsitektur web modern.\`,
    "areaServed": {
      "@type": "City",
      "name": cityName
    },
    "provider": {
      "@type": "ProfessionalService",
      "name": "CHESTADOTCOM - Digital Architect"
    },
    "url": \`https://chestaa.com/area/\${cityName.toLowerCase()}\`
  };
};

export const generateServiceSchema = (serviceName, serviceDescription, url) => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": serviceName,
    "provider": {
      "@type": "ProfessionalService",
      "name": "CHESTADOTCOM"
    },
    "description": serviceDescription,
    "url": url,
    "areaServed": {
      "@type": "Country",
      "name": "Indonesia"
    }
  };
};

export const generateWebSiteSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://chestaa.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://chestaa.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
};

export const generateSiteNavigationElement = () => {
  return {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "name": "Main Navigation",
    "about": {
      "@type": "ItemList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Layanan Website", "item": "https://chestaa.com/services" },
        { "@type": "ListItem", "position": 2, "name": "Portfolio Proyek", "item": "https://chestaa.com/projects" },
        { "@type": "ListItem", "position": 3, "name": "Blog & SEO", "item": "https://chestaa.com/blog" },
        { "@type": "ListItem", "position": 4, "name": "Kontak Kami", "item": "https://chestaa.com/contact" }
      ]
    }
  };
};

export const generateBreadcrumbs = (breadcrumbs) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((bc, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": bc.name,
      "item": bc.item
    }))
  };
};
\`;

fs.writeFileSync('src/lib/seo.ts', code);
console.log('Patched seo.ts');
