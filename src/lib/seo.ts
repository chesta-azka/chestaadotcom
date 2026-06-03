export const generateLocalBusinessSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Chestadotcom - Digital Architect",
    "image": "https://chestadotcom.com/favicon.svg",
    "description": "Jasa website premium kilat di Cisauk, BSD, Gading Serpong.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "BSD Green Office Park",
      "addressLocality": "Cisauk/BSD",
      "addressRegion": "Banten",
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -6.299,
      "longitude": 106.657
    },
    "url": "https://chestadotcom.com",
    "priceRange": "$$",
    "openingHours": "Mo-Fr 09:00-18:00",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "hello@chestadotcom.com",
      "areaServed": "Cisauk, BSD, Gading Serpong"
    },
    "sameAs": [
      "https://www.google.com/maps/place/Chestaa",
      "https://instagram.com/chestadotcom",
      "https://linkedin.com/company/chestadotcom",
      "https://github.com/chestadotcom",
      "https://twitter.com/chestadotcom",
      "https://facebook.com/chestadotcom",
      "https://tiktok.com/@chestadotcom"
    ]
  };
};

export const generateWebSiteSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://chestadotcom.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://chestadotcom.com/search?q={search_term_string}",
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
        { "@type": "ListItem", "position": 1, "name": "Layanan Website", "item": "https://chestadotcom.com/services" },
        { "@type": "ListItem", "position": 2, "name": "Portfolio Proyek", "item": "https://chestadotcom.com/projects" },
        { "@type": "ListItem", "position": 3, "name": "Blog & SEO", "item": "https://chestadotcom.com/blog" },
        { "@type": "ListItem", "position": 4, "name": "Kontak Kami", "item": "https://chestadotcom.com/contact" }
      ]
    }
  };
};

export const generateServiceSchema = (name: string, description: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": name,
    "description": description,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Chestadotcom"
    }
  };
};

export const generateProjectSchema = (name: string, description: string, image: string, url: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": name,
    "description": description,
    "image": image,
    "url": url,
    "author": {
      "@type": "LocalBusiness",
      "name": "Chestadotcom"
    }
  };
};

export const generateBreadcrumbs = (breadcrumbs: { name: string; item: string }[]) => {
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
