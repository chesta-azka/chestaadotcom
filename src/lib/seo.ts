import { SERVICES_DATA } from '../data/servicesData';
import { caseStudyDB } from './caseStudies';
import { PROJECTS } from '../data/projects';
import { ALL_ARTICLES } from '../data/blogData';

export interface BreadcrumbItemSchema {
  name: string;
  item: string;
}

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
      "streetAddress": "BSD Green Office Park, Level 3",
      "addressLocality": "Cisauk, Tangerang Selatan",
      "addressRegion": "Banten",
      "postalCode": "15345",
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -6.3024,
      "longitude": 106.6522
    },
    "hasMap": "https://maps.app.goo.gl/tB3a4r13o2ZtQG399",
    "sameAs": [
      "https://github.com/chestacode",
      "https://id.linkedin.com/in/chesta-azka",
      "https://twitter.com/chestacode"
    ],
    "url": "https://chestaa.com",
    "priceRange": "Rp 500.000 - Rp 50.000.000",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "124"
    },
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
      { "@type": "District", "name": "Gading Serpong" },
      { "@type": "District", "name": "Alam Sutera" }
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

export const generateBreadcrumbs = (breadcrumbs: BreadcrumbItemSchema[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((bc, index) => {
      const fullUrl = bc.item.startsWith('http')
        ? bc.item
        : `https://chestaa.com${bc.item.startsWith('/') ? bc.item : '/' + bc.item}`;
      return {
        "@type": "ListItem",
        "position": index + 1,
        "name": bc.name,
        "item": fullUrl
      };
    })
  };
};

export const getBreadcrumbsForRoute = (pathname: string, customTitle?: string): BreadcrumbItemSchema[] => {
  const cleanPath = pathname.replace(/\/+$/, '') || '/';
  const homeItem: BreadcrumbItemSchema = { name: 'Beranda', item: 'https://chestaa.com/' };

  if (cleanPath === '/') {
    return [homeItem];
  }

  // Layanan / Services detail: /layanan/:slug or /service/:slug
  if (cleanPath.startsWith('/layanan/') || cleanPath.startsWith('/service/')) {
    const slug = cleanPath.split('/')[2];
    const service = slug ? SERVICES_DATA[slug] : null;
    const title = customTitle || service?.title || (slug ? slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Detail Layanan');
    return [
      homeItem,
      { name: 'Layanan', item: 'https://chestaa.com/#services' },
      { name: title, item: `https://chestaa.com/layanan/${slug}` }
    ];
  }

  // Case Studies archive: /case-studies
  if (cleanPath === '/case-studies') {
    return [
      homeItem,
      { name: 'Studi Kasus & Rekayasa Sistem', item: 'https://chestaa.com/case-studies' }
    ];
  }

  // Case Study detail: /case-studies/:slug
  if (cleanPath.startsWith('/case-studies/')) {
    const slug = cleanPath.replace('/case-studies/', '').split('/')[0];
    const study = caseStudyDB.find(s => s.slug === slug);
    const title = customTitle || (study ? `${study.client} - ${study.title}` : slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '));
    return [
      homeItem,
      { name: 'Studi Kasus', item: 'https://chestaa.com/case-studies' },
      { name: title, item: `https://chestaa.com/case-studies/${slug}` }
    ];
  }

  // Portfolio archive: /portfolio
  if (cleanPath === '/portfolio') {
    return [
      homeItem,
      { name: 'Portfolio Proyek', item: 'https://chestaa.com/portfolio' }
    ];
  }

  // Portfolio detail: /portfolio/:id
  if (cleanPath.startsWith('/portfolio/')) {
    const id = cleanPath.replace('/portfolio/', '').split('/')[0];
    const project = PROJECTS.find(p => p.id === id);
    const title = customTitle || (project ? project.title : id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '));
    return [
      homeItem,
      { name: 'Portfolio', item: 'https://chestaa.com/portfolio' },
      { name: title, item: `https://chestaa.com/portfolio/${id}` }
    ];
  }

  // Blog archive: /blog
  if (cleanPath === '/blog') {
    return [
      homeItem,
      { name: 'Jurnal Teknologi & AI', item: 'https://chestaa.com/blog' }
    ];
  }

  // Blog detail: /blog/:slug
  if (cleanPath.startsWith('/blog/')) {
    const slug = cleanPath.replace('/blog/', '').split('/')[0];
    const article = ALL_ARTICLES.find(a => a.slug === slug);
    const title = customTitle || (article ? article.title : slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '));
    return [
      homeItem,
      { name: 'Blog', item: 'https://chestaa.com/blog' },
      { name: title, item: `https://chestaa.com/blog/${slug}` }
    ];
  }

  // About: /about
  if (cleanPath === '/about') {
    return [
      homeItem,
      { name: 'Tentang Founder & Visi', item: 'https://chestaa.com/about' }
    ];
  }

  // Workflow: /workflow
  if (cleanPath === '/workflow') {
    return [
      homeItem,
      { name: 'Alur Kerja & Metodologi', item: 'https://chestaa.com/workflow' }
    ];
  }

  // Area: /area/:cityName
  if (cleanPath.startsWith('/area/')) {
    const rawCity = cleanPath.replace('/area/', '').split('/')[0];
    const cityName = decodeURIComponent(rawCity).replace(/-/g, ' ');
    const formattedCity = cityName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const title = customTitle || `Jasa Web & AI ${formattedCity}`;
    return [
      homeItem,
      { name: 'Cakupan Layanan', item: 'https://chestaa.com/#areas' },
      { name: title, item: `https://chestaa.com/area/${rawCity}` }
    ];
  }

  // Academy: /academy
  if (cleanPath === '/academy') {
    return [
      homeItem,
      { name: 'Academy & Dokumentasi', item: 'https://chestaa.com/academy' }
    ];
  }

  // Academy resources: /academy/resources
  if (cleanPath === '/academy/resources') {
    return [
      homeItem,
      { name: 'Academy', item: 'https://chestaa.com/academy' },
      { name: 'Resource Hub & Checklist', item: 'https://chestaa.com/academy/resources' }
    ];
  }

  // Academy detail: /academy/:slug
  if (cleanPath.startsWith('/academy/')) {
    const slug = cleanPath.replace('/academy/', '').split('/')[0];
    return [
      homeItem,
      { name: 'Academy', item: 'https://chestaa.com/academy' },
      { name: customTitle || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '), item: `https://chestaa.com/academy/${slug}` }
    ];
  }

  // Quiz: /quiz
  if (cleanPath === '/quiz') {
    return [
      homeItem,
      { name: 'Quiz Evaluasi Teknis', item: 'https://chestaa.com/quiz' }
    ];
  }

  // Quiz module: /quiz/:moduleId
  if (cleanPath.startsWith('/quiz/')) {
    const modId = cleanPath.replace('/quiz/', '').split('/')[0];
    return [
      homeItem,
      { name: 'Quiz Evaluasi', item: 'https://chestaa.com/quiz' },
      { name: customTitle || `Modul ${modId}`, item: `https://chestaa.com/quiz/${modId}` }
    ];
  }

  // Client Portal: /portal
  if (cleanPath.startsWith('/portal') || cleanPath.startsWith('/workspace') || cleanPath.startsWith('/client')) {
    return [
      homeItem,
      { name: 'Client Portal', item: 'https://chestaa.com/portal' }
    ];
  }

  // Fallback for any other path
  const segments = cleanPath.split('/').filter(Boolean);
  const trail: BreadcrumbItemSchema[] = [homeItem];
  let accumulated = '';
  segments.forEach((seg, i) => {
    accumulated += `/${seg}`;
    const name = (i === segments.length - 1 && customTitle)
      ? customTitle
      : seg.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    trail.push({
      name,
      item: `https://chestaa.com${accumulated}`
    });
  });

  return trail;
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

export const generateBlogSchema = (articles: any[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "CHESTAADOTCOM Journal",
    "description": "Deep dives into digital architecture, AI implementations, and enterprise solutions.",
    "publisher": {
      "@type": "Organization",
      "name": "CHESTAADOTCOM",
      "logo": {
        "@type": "ImageObject",
        "url": "https://chestaa.com/favicon.svg"
      }
    },
    "blogPost": articles.map(art => ({
      "@type": "BlogPosting",
      "headline": art.title,
      "description": art.desc,
      "url": `https://chestaa.com/blog/${art.slug}`,
      "datePublished": art.date,
      "author": {
        "@type": "Person",
        "name": art.author?.name || "Chesta Azka Sofyan"
      }
    }))
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
