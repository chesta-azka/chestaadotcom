export const generateFAQSchema = (faqs: { question: string; answer: string }[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

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
    "hasMap": "https://maps.app.goo.gl/tB3a4r13o2ZtQG399",
    "sameAs": [
      "https://github.com/chestacode",
      "https://id.linkedin.com/in/chesta-azka",
      "https://twitter.com/chestacode",
      "https://id.foursquare.com/v/bsd-city/4b998cfef964a5202c8335e3",
      "https://www.yellowpages.co.id/bisnis/tangerang-selatan",
      "https://directory.banten.go.id/business/chestaa"
    ],
    "url": "https://chestaa.com",
    "potentialAction": {
      "@type": "ReserveAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://chestaa.com/contact?intent=consultation",
        "inLanguage": "id",
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform"
        ]
      },
      "result": {
        "@type": "Reservation",
        "name": "Konsultasi IT & Web"
      }
    },
    "priceRange": "Rp 500.000 - Rp 50.000.000",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "142"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "09:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "10:00",
        "closes": "14:00"
      }
    ],
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
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Katalog Layanan IT & Web Development",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Layanan Jasa IT",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "@id": "https://chestaa.com/#service-jasa-it",
                "name": "Jasa IT",
                "serviceType": "Jasa IT & Solusi Teknologi Enterprise",
                "description": "Layanan konsultasi IT terpadu, audit infrastruktur digital, integrasi automasi AI, cloud DevOps, dan pemeliharaan sistem enterprise untuk kawasan BSD City, Cisauk, dan Tangerang Selatan.",
                "provider": {
                  "@type": "LocalBusiness",
                  "name": "CHESTAADOTCOM",
                  "url": "https://chestaa.com"
                },
                "areaServed": [
                  { "@type": "City", "name": "BSD City" },
                  { "@type": "City", "name": "Cisauk" },
                  { "@type": "City", "name": "Tangerang Selatan" },
                  { "@type": "City", "name": "Tangerang" }
                ],
                "url": "https://chestaa.com/layanan/it-solutions"
              }
            }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "Layanan Website Development",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "@id": "https://chestaa.com/#service-website-development",
                "name": "Website Development",
                "serviceType": "Website Development & Web Application",
                "description": "Jasa pembuatan website performa tinggi, aplikasi web modern berbasis Next.js, toko online e-commerce, dan landing page konversi optimal.",
                "provider": {
                  "@type": "LocalBusiness",
                  "name": "CHESTAADOTCOM",
                  "url": "https://chestaa.com"
                },
                "areaServed": [
                  { "@type": "City", "name": "BSD City" },
                  { "@type": "City", "name": "Cisauk" },
                  { "@type": "City", "name": "Tangerang Selatan" },
                  { "@type": "City", "name": "Tangerang" }
                ],
                "url": "https://chestaa.com/layanan/web-development"
              }
            }
          ]
        }
      ]
    },
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "@id": "https://chestaa.com/#service-jasa-it",
          "name": "Jasa IT",
          "serviceType": "Jasa IT",
          "description": "Solusi infrastruktur IT, otomatisasi alur kerja AI, cloud DevOps, dan dukungan teknis sistem enterprise.",
          "provider": {
            "@type": "LocalBusiness",
            "name": "CHESTAADOTCOM",
            "url": "https://chestaa.com"
          },
          "areaServed": [
            { "@type": "City", "name": "BSD City" },
            { "@type": "City", "name": "Cisauk" },
            { "@type": "City", "name": "Tangerang Selatan" }
          ],
          "url": "https://chestaa.com/layanan/it-solutions"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "@id": "https://chestaa.com/#service-website-development",
          "name": "Website Development",
          "serviceType": "Website Development",
          "description": "Pengembangan website performa tinggi, aplikasi web berbasis Next.js, SEO-ready, dan arsitektur modern.",
          "provider": {
            "@type": "LocalBusiness",
            "name": "CHESTAADOTCOM",
            "url": "https://chestaa.com"
          },
          "areaServed": [
            { "@type": "City", "name": "BSD City" },
            { "@type": "City", "name": "Cisauk" },
            { "@type": "City", "name": "Tangerang Selatan" }
          ],
          "url": "https://chestaa.com/layanan/web-development"
        }
      }
    ]
  };
};

export const generateITServiceSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://chestaa.com/#service-jasa-it",
    "name": "Jasa IT",
    "serviceType": "Jasa IT & Solusi Teknologi Enterprise",
    "description": "Layanan konsultasi IT terpadu, audit infrastruktur digital, integrasi automasi AI, cloud DevOps, dan pemeliharaan sistem enterprise untuk kawasan BSD City, Cisauk, dan Tangerang Selatan.",
    "provider": {
      "@type": "LocalBusiness",
      "name": "CHESTAADOTCOM",
      "url": "https://chestaa.com",
      "telephone": "+6282125447232",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "BSD Green Office Park",
        "addressLocality": "Tangerang",
        "addressRegion": "Banten",
        "addressCountry": "ID"
      }
    },
    "areaServed": [
      { "@type": "City", "name": "BSD City" },
      { "@type": "City", "name": "Cisauk" },
      { "@type": "City", "name": "Tangerang Selatan" },
      { "@type": "City", "name": "Tangerang" },
      { "@type": "City", "name": "Jakarta Selatan" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Layanan Jasa IT",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "IT Infrastructure & Cloud Architecture"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Automation & Workflow Integration"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Sistem Pemeliharaan & IT Support"
          }
        }
      ]
    },
    "url": "https://chestaa.com/layanan/it-solutions"
  };
};

export const generateWebDevServiceSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://chestaa.com/#service-website-development",
    "name": "Website Development",
    "serviceType": "Website Development & Web Application",
    "description": "Jasa pembuatan website performa tinggi, landing page konversi tinggi, aplikasi web modern berbasis Next.js, toko online e-commerce, dan optimasi Core Web Vitals untuk pertumbuhan bisnis.",
    "provider": {
      "@type": "LocalBusiness",
      "name": "CHESTAADOTCOM",
      "url": "https://chestaa.com",
      "telephone": "+6282125447232",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "BSD Green Office Park",
        "addressLocality": "Tangerang",
        "addressRegion": "Banten",
        "addressCountry": "ID"
      }
    },
    "areaServed": [
      { "@type": "City", "name": "BSD City" },
      { "@type": "City", "name": "Cisauk" },
      { "@type": "City", "name": "Tangerang Selatan" },
      { "@type": "City", "name": "Tangerang" },
      { "@type": "City", "name": "Jakarta Selatan" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Layanan Website Development",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "High-Performance Next.js Web Development"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom E-Commerce & Web Applications"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "SEO & Core Web Vitals Optimization"
          }
        }
      ]
    },
    "url": "https://chestaa.com/layanan/web-development"
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


export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CHESTAADOTCOM",
    "url": "https://chestaa.com",
    "logo": "https://chestaa.com/favicon.svg",
    "sameAs": [
      "https://github.com/chestacode"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+6282125447232",
      "contactType": "Customer Service",
      "areaServed": "ID",
      "availableLanguage": ["Indonesian", "English"]
    }
  };
};

export const generateSpeakableSchema = (cssSelectors) => {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": "https://chestaa.com",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": cssSelectors
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

export const generateHowToSchema = (name, description, steps) => {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    "description": description,
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.title,
      "text": step.desc,
      "url": `https://chestaa.com/workflow#step-${index + 1}`
    }))
  };
};
