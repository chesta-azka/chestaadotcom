export const generateLocalBusinessSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
    "name": "chestaa.com - Arsitek Web & AI Automation",
    "image": "https://chestaa.com/favicon.svg",
    "description": "Elite B2B Software House specializing in High-Performance Web Development and AI Automation.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "BSD Green Office Park",
      "addressLocality": "Tangerang",
      "addressRegion": "Banten",
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -6.3042,
      "longitude": 106.6439
    },
    "url": "https://chestaa.com",
    "priceRange": "$$",
    "openingHours": "Mo-Fr 09:00-18:00",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "hello@chestaa.com",
      "telephone": "+6282125447232"
    },
        "areaServed": [
      { "@type": "City", "name": "BSD City" },
      { "@type": "City", "name": "Cisauk" },
      { "@type": "City", "name": "Tangerang Selatan" },
      { "@type": "City", "name": "Tangerang" },
      { "@type": "City", "name": "Jakarta Selatan" },
      { "@type": "City", "name": "Jakarta Kota" },
      { "@type": "City", "name": "Bogor Rumpin" },
      { "@type": "City", "name": "Bogor Barat" },
      { "@type": "City", "name": "Bogor Utara" },
      { "@type": "City", "name": "Bogor Kota" },
      { "@type": "City", "name": "Depok" },
      { "@type": "City", "name": "Margonda" }
    ],
    "knowsAbout": [
      "IT Services",
      "Web Development",
      "AI Automation",
      "Next.js Web Development",
      "AI Agents",
      "Cloud Automation",
      "Bot Automation"
    ]
  };
};

export const generateCityGeoSchema = (cityName: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": `Jasa Pembuatan Website ${cityName} | CHESTAADOTCOM`,
    "image": "https://chestaa.com/favicon.svg",
    "description": `Mitra transformasi digital dan jasa pembuatan website premium terbaik untuk bisnis Anda di ${cityName}. Tingkatkan SEO lokal dan konversi penjualan dengan arsitektur web modern.`,
    "areaServed": {
      "@type": "City",
      "name": cityName
    },
    "provider": {
      "@type": "ProfessionalService",
      "name": "CHESTAADOTCOM - Digital Architect"
    },
    "url": `https://chestaa.com/area/${cityName.toLowerCase()}`
  };
};

export const generateServiceSchema = (serviceName: string, serviceDescription: string, url: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": serviceName,
    "provider": {
      "@type": "ProfessionalService",
      "name": "CHESTAADOTCOM"
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

export const generateArticleSchema = (title: string, description: string, url: string, imageUrl: string, datePublished: string, authorName: string = "Chesta Azka Sofyan") => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "headline": title,
    "description": description,
    "image": imageUrl,
    "author": {
      "@type": "Person",
      "name": authorName
    },
    "publisher": {
      "@type": "Organization",
      "name": "CHESTAADOTCOM",
      "logo": {
        "@type": "ImageObject",
        "url": "https://chestaa.com/favicon.svg"
      }
    },
    "datePublished": datePublished
  };
};

export const generateCourseSchema = (courseName: string, description: string, url: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": courseName,
    "description": description,
    "provider": {
      "@type": ["Organization", "LocalBusiness", "EducationalOrganization"],
      "name": "CHESTAADOTCOM Academy",
      "sameAs": "https://chestaa.com/academy",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "BSD Green Office Park",
        "addressLocality": "Cisauk, Tangerang",
        "addressRegion": "Banten",
        "addressCountry": "ID"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -6.3042,
        "longitude": 106.6439
      },
            "areaServed": [
        { "@type": "City", "name": "BSD City" },
        { "@type": "City", "name": "Cisauk" },
        { "@type": "City", "name": "Tangerang Selatan" },
        { "@type": "City", "name": "Tangerang" },
        { "@type": "City", "name": "Jakarta Selatan" },
        { "@type": "City", "name": "Jakarta Kota" },
        { "@type": "City", "name": "Bogor" },
        { "@type": "City", "name": "Depok" }
      ]
    },
    "url": url
  };
};

export const generateQuizSchema = (quizName: string, description: string, url: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "Quiz",
    "name": quizName,
    "description": description,
    "url": url,
    "about": {
      "@type": "Thing",
      "name": "Tech & Web Development Assessment"
    },
    "provider": {
      "@type": ["Organization", "LocalBusiness", "EducationalOrganization"],
      "name": "CHESTAADOTCOM Academy",
      "sameAs": "https://chestaa.com/academy",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "BSD Green Office Park",
        "addressLocality": "Cisauk, Tangerang",
        "addressRegion": "Banten",
        "addressCountry": "ID"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -6.3042,
        "longitude": 106.6439
      },
            "areaServed": [
        { "@type": "City", "name": "BSD City" },
        { "@type": "City", "name": "Cisauk" },
        { "@type": "City", "name": "Tangerang Selatan" },
        { "@type": "City", "name": "Tangerang" },
        { "@type": "City", "name": "Jakarta Selatan" },
        { "@type": "City", "name": "Jakarta Kota" },
        { "@type": "City", "name": "Bogor" },
        { "@type": "City", "name": "Depok" }
      ]
    }
  };
};

export const generateCaseStudySchema = (title: string, description: string, url: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "url": url,
    "genre": "Case Study",
    "publisher": {
      "@type": "Organization",
      "name": "CHESTAADOTCOM"
    }
  };
};

export const generatePortfolioSchema = (projectName: string, description: string, url: string, imageUrl: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": projectName,
    "description": description,
    "url": url,
    "image": imageUrl,
    "author": {
      "@type": "Organization",
      "name": "CHESTAADOTCOM"
    }
  };
};
