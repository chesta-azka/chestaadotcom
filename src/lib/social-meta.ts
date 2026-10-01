import { ALL_ARTICLES } from '../data/blogData';
import { PROJECTS } from '../data/projects';
import { SERVICES_DATA } from '../data/servicesData';
import { caseStudyDB } from '../lib/caseStudies';
import { insightsData } from '../data/insights';
import { glossaryDatabase } from '../utils/glossaryUtils';
import { generateDynamicCopy } from '../utils/pseoUtils';

export interface RouteMeta {
  title: string;
  description: string;
  image: string;
  url: string;
  type: string;
}

export function getMetaTagsForUrl(url: string): RouteMeta {
  let pathname = url;
  let searchParams = new URLSearchParams();
  try {
    const parsed = new URL('https://chestaa.com' + (url.startsWith('/') ? url : '/' + url));
    pathname = parsed.pathname;
    searchParams = parsed.searchParams;
  } catch (e) {
    // Ignore invalid urls
  }

  // Normalize trailing slash (except root)
  if (pathname.length > 1 && pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1);
  }

  const defaultMeta: RouteMeta = {
    title: 'CHESTAA | Studio Arsitektur Web Next.js & Otomasi AI B2B',
    description: 'Jasa pembuatan website performa tinggi, sistem enterprise, dan otomatisasi AI otonom di BSD City, Tangerang & Jakarta. Respon sub-detik untuk konversi maksimal.',
    image: 'https://chestaa.com/chesta.png',
    url: 'https://chestaa.com' + pathname,
    type: 'website'
  };

  // 1. Homepage
  if (pathname === '' || pathname === '/') {
    return {
      ...defaultMeta,
      title: 'CHESTAA | Studio Arsitektur Web Next.js & Otomasi AI B2B',
      description: 'Jasa pembuatan website performa tinggi, arsitektur Next.js 15 sub-detik, dan otomatisasi AI cerdas untuk bisnis modern di BSD City, Tangerang & Jakarta.',
      url: 'https://chestaa.com/'
    };
  }

  // 2. Executive Insights (/insights/:slug)
  if (pathname.startsWith('/insights/')) {
    const slug = pathname.replace('/insights/', '').split('/')[0];
    const article = insightsData.find(a => a.slug === slug);
    if (article) {
      return {
        title: `${article.title} | CHESTAA Insights`,
        description: article.seoDescription,
        image: article.coverImage && article.coverImage.startsWith('http') ? article.coverImage : `https://chestaa.com${article.coverImage || '/chesta.png'}`,
        url: `https://chestaa.com/insights/${slug}`,
        type: 'article'
      };
    }
  }

  // 3. Kamus AI & Teknologi (/kamus-ai-teknologi/:term)
  if (pathname.startsWith('/kamus-ai-teknologi/')) {
    const termSlug = pathname.replace('/kamus-ai-teknologi/', '').split('/')[0];
    const term = glossaryDatabase[termSlug];
    if (term) {
      return {
        title: `${term.term} - Definisi & Penerapan Bisnis | Kamus AI Chestaa`,
        description: term.definition,
        image: defaultMeta.image,
        url: `https://chestaa.com/kamus-ai-teknologi/${termSlug}`,
        type: 'article'
      };
    }
  }

  // 4. Blog Post (/blog/:slug or legacy /blog?read=:slug)
  if (pathname.startsWith('/blog/')) {
    const slug = pathname.replace('/blog/', '').split('/')[0];
    const article = ALL_ARTICLES.find(a => a.slug === slug);
    if (article) {
      return {
        title: `${article.title} | CHESTAA Insights`,
        description: article.desc || 'Wawasan arsitektur web modern, optimasi performa Core Web Vitals, dan implementasi otomasi AI.',
        image: article.image || defaultMeta.image,
        url: `https://chestaa.com/blog/${slug}`,
        type: 'article'
      };
    }
  }

  if (pathname === '/blog' && searchParams.has('read')) {
    const slug = searchParams.get('read');
    const article = ALL_ARTICLES.find(a => a.slug === slug);
    if (article) {
      return {
        title: `${article.title} | CHESTAA Insights`,
        description: article.desc,
        image: article.image || defaultMeta.image,
        url: `https://chestaa.com/blog/${slug}`,
        type: 'article'
      };
    }
  }

  if (pathname === '/blog') {
    return {
      ...defaultMeta,
      title: 'Insights & Jurnal Arsitektur Web | CHESTAA',
      description: 'Kumpulan artikel mendalam tentang Next.js, performa sub-detik, SEO/AEO modern, dan strategi otomatisasi AI untuk bisnis B2B.',
      url: 'https://chestaa.com/blog'
    };
  }

  // 5. Services Hub & Dedicated Services
  if (pathname === '/services' || pathname === '/layanan') {
    return {
      ...defaultMeta,
      title: 'Layanan Arsitektur Web & Otomasi AI B2B | CHESTAA',
      description: 'Layanan pengembangan website Next.js berkecepatan tinggi, sistem enterprise anti-down, e-commerce otomatis, dan asisten AI 24/7 di BSD & Tangerang.',
      url: 'https://chestaa.com/services'
    };
  }

  // Programmatic Industry x City route (/services/:industry/:city)
  const serviceParts = pathname.replace(/^\/(services|layanan)\//, '').split('/');
  if (serviceParts.length === 2 && serviceParts[0] && serviceParts[1]) {
    const [ind, ct] = serviceParts;
    const pseo = generateDynamicCopy(ind, ct);
    return {
      title: `${pseo.title}`,
      description: pseo.description,
      image: defaultMeta.image,
      url: `https://chestaa.com/services/${ind}/${ct}`,
      type: 'website'
    };
  }

  if (pathname.startsWith('/services/') || pathname.startsWith('/layanan/')) {
    const slug = serviceParts[0];
    const service = SERVICES_DATA[slug];
    if (service) {
      return {
        title: `${service.title} | CHESTAA`,
        description: service.heroDescription || service.subtitle,
        image: defaultMeta.image,
        url: `https://chestaa.com/services/${slug}`,
        type: 'website'
      };
    }

    const serviceTitles: Record<string, { title: string; desc: string }> = {
      'website-mesin-konversi': {
        title: 'Website Mesin Konversi & Performa Sub-Detik | CHESTAA',
        desc: 'Infrastruktur web Next.js berkecepatan di bawah 0.8 detik yang dirancang khusus untuk memaksimalkan ROAS iklan dan konversi penjualan.'
      },
      'karyawan-digital-ai': {
        title: 'Karyawan Digital AI 24/7 Otonom | CHESTAA',
        desc: 'Agen AI cerdas yang melayani pelanggan, kualifikasi prospek, dan otomatisasi operasional bisnis 24 jam tanpa jeda.'
      },
      'toko-online-otonom': {
        title: 'Toko Online E-Commerce Otonom 0% Komisi | CHESTAA',
        desc: 'Platform toko online mandiri super cepat dengan integrasi pembayaran instan dan sinkronisasi logistik otomatis.'
      },
      'landing-page-konversi': {
        title: 'Jasa Pembuatan Landing Page Konversi Tinggi | CHESTAA',
        desc: 'Landing page bespoke dengan riset psikologi konversi, copy persuasif, dan kecepatan kilat untuk kampanye iklan B2B.'
      },
      'infrastruktur-digital-enterprise': {
        title: 'Infrastruktur Digital & Sistem Enterprise | CHESTAA',
        desc: 'Pondasi software kustom dan arsitektur data terpusat yang aman, scalable, dan siap menangani pertumbuhan perusahaan.'
      },
      'infrastruktur-cloud-anti-down': {
        title: 'Server Cloud Anti-Down SLA 99.99% | CHESTAA',
        desc: 'Infrastruktur cloud modern di AWS/GCP dengan auto-scaling instan dan proteksi downtime untuk kestabilan operasional bisnis.'
      },
      'keamanan-data-korporat': {
        title: 'Audit Keamanan & Proteksi Data Korporat | CHESTAA',
        desc: 'Pengamanan data aset digital dan proteksi serangan siber untuk menjaga integritas sistem informasi perusahaan.'
      },
      'dominasi-pencarian-seo-aeo': {
        title: 'Optimasi SEO & Answer Engine Optimization (AEO) | CHESTAA',
        desc: 'Dominasi pencarian Google dan rekomendasi AI (ChatGPT/Gemini) melalui structured data JSON-LD dan arsitektur semantik.'
      },
      'konsultasi-cto-eksekutif': {
        title: 'Layanan Fractional CTO & Penasihat Teknologi | CHESTAA',
        desc: 'Advisory teknologi strategis untuk eksekutif, tech rescue, audit kode, dan perancangan roadmap sistem digital.'
      },
      'jasa-pembuatan-website-bsd-cisauk': {
        title: 'Jasa Pembuatan Website BSD City, Cisauk & Tangerang | CHESTAA',
        desc: 'Spesialis pembuatan website profesional lokal BSD City, Cisauk, dan Tangerang Selatan dengan optimasi Google Maps dan SEO terpadu.'
      }
    };

    if (serviceTitles[slug]) {
      return {
        title: serviceTitles[slug].title,
        description: serviceTitles[slug].desc,
        image: defaultMeta.image,
        url: `https://chestaa.com/services/${slug}`,
        type: 'website'
      };
    }
  }

  // 6. Portfolio Showcase
  if (pathname === '/portfolio') {
    return {
      ...defaultMeta,
      title: 'Showcase Portofolio Proyek | CHESTAA',
      description: 'Eksplorasi portofolio proyek website modern, sistem enterprise, dan solusi digital yang telah kami bangun dengan standar rekayasa tertinggi.',
      url: 'https://chestaa.com/portfolio'
    };
  }

  if (pathname.startsWith('/portfolio/')) {
    const id = pathname.replace('/portfolio/', '').split('/')[0];
    const project = PROJECTS.find(p => p.id === id);
    if (project) {
      return {
        title: `${project.title} - ${project.category} | Portofolio CHESTAA`,
        description: project.description || `Pelajari studi desain dan arsitektur teknis dari proyek ${project.title} oleh CHESTAA.`,
        image: project.thumbnail || defaultMeta.image,
        url: `https://chestaa.com/portfolio/${id}`,
        type: 'website'
      };
    }
  }

  // 7. Case Studies
  if (pathname === '/case-studies') {
    return {
      ...defaultMeta,
      title: 'Studi Kasus Transformasi Digital & ROI | CHESTAA',
      description: 'Analisis mendalam mengenai bagaimana arsitektur web modern dan otomatisasi sistem membantu bisnis meningkatkan konversi dan efisiensi.',
      url: 'https://chestaa.com/case-studies'
    };
  }

  if (pathname.startsWith('/case-studies/')) {
    const slug = pathname.replace('/case-studies/', '').split('/')[0];
    const study = caseStudyDB.find(s => s.slug === slug);
    if (study) {
      return {
        title: `${study.title} | Studi Kasus CHESTAA`,
        description: study.desc || defaultMeta.description,
        image: study.image || defaultMeta.image,
        url: `https://chestaa.com/case-studies/${slug}`,
        type: 'article'
      };
    }
  }

  // 8. Regional / Area Pages
  if (pathname.startsWith('/area/')) {
    const cityName = pathname.replace('/area/', '').split('/')[0].toUpperCase();
    const cityDisplay = cityName.replace(/-/g, ' ');
    return {
      ...defaultMeta,
      title: `Jasa Pembuatan Website ${cityDisplay} | CHESTAA`,
      description: `Layanan pembuatan website premium, arsitektur Next.js modern, dan otomasi AI untuk bisnis di wilayah ${cityDisplay} dan sekitarnya.`,
      url: `https://chestaa.com/area/${cityName.toLowerCase()}`
    };
  }

  // 9. About & Workflow
  if (pathname === '/about') {
    return {
      ...defaultMeta,
      title: 'Tentang CHESTAA | Founder & Filosofi Rekayasa Digital',
      description: 'Mengenal filosofi arsitektur digital CHESTAA: mengombinasikan desain estetis kelas dunia dengan rekayasa performa berkecepatan tinggi.',
      url: 'https://chestaa.com/about'
    };
  }

  if (pathname === '/workflow') {
    return {
      ...defaultMeta,
      title: 'Metodologi Kerja & Standar Rekayasa | CHESTAA',
      description: 'Alur kerja terstruktur kami dari discovery, perancangan blueprint, pengembangan arsitektur, hingga peluncuran sistem tanpa jeda.',
      url: 'https://chestaa.com/workflow'
    };
  }

  // 10. Academy & Resources
  if (pathname === '/academy') {
    return {
      ...defaultMeta,
      title: 'CHESTAA Academy | Panduan & Masterclass Rekayasa Web',
      description: 'Dokumentasi, tutorial teknis, dan panduan praktis pengembangan web modern, arsitektur Next.js, dan otomatisasi AI.',
      url: 'https://chestaa.com/academy'
    };
  }

  return defaultMeta;
}

export function injectSocialMeta(html: string, url: string): string {
  const meta = getMetaTagsForUrl(url);

  const escapeHtml = (str: string) => str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const cleanTitle = escapeHtml(meta.title);
  const cleanDescription = escapeHtml(meta.description);
  const cleanUrl = escapeHtml(meta.url);
  const cleanImage = escapeHtml(meta.image);

  // Minimalist Organization & LocalBusiness schema for raw server response
  const rawSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
        "@id": "https://chestaa.com/#organization",
        "name": "CHESTAA",
        "legalName": "CHESTAADOTCOM (Chesta Azka Sofyan)",
        "url": "https://chestaa.com",
        "logo": "https://chestaa.com/favicon.svg",
        "image": "https://chestaa.com/chesta.png",
        "telephone": "+6282125447232",
        "priceRange": "$$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "BSD Green Office Park, Level 3",
          "addressLocality": "Cisauk",
          "addressRegion": "Tangerang",
          "postalCode": "15345",
          "addressCountry": "ID"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -6.3024,
          "longitude": 106.6522
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://chestaa.com/#website",
        "url": "https://chestaa.com",
        "name": "CHESTAA",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://chestaa.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  const tags = `
    <!-- Canonical & Essential SEO -->
    <title>${cleanTitle}</title>
    <meta name="description" content="${cleanDescription}" />
    <link rel="canonical" href="${cleanUrl}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    
    <!-- Open Graph / Social Sharing -->
    <meta property="og:type" content="${meta.type}" />
    <meta property="og:url" content="${cleanUrl}" />
    <meta property="og:title" content="${cleanTitle}" />
    <meta property="og:description" content="${cleanDescription}" />
    <meta property="og:image" content="${cleanImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${cleanTitle}" />
    <meta property="og:site_name" content="CHESTAA" />
    <meta property="og:locale" content="id_ID" />
    
    <!-- Twitter Cards -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:domain" content="chestaa.com" />
    <meta name="twitter:url" content="${cleanUrl}" />
    <meta name="twitter:title" content="${cleanTitle}" />
    <meta name="twitter:description" content="${cleanDescription}" />
    <meta name="twitter:image" content="${cleanImage}" />
    <meta name="twitter:image:alt" content="${cleanTitle}" />
    <meta name="twitter:site" content="@chestaadotcom" />
    <meta name="twitter:creator" content="@chestaadotcom" />

    <!-- Structured Data JSON-LD -->
    <script type="application/ld+json">
      ${JSON.stringify(rawSchema)}
    </script>
  `;

  let cleanHtml = html
    .replace(/<title>.*?<\/title>/gi, '')
    .replace(/<meta\s+name=["']description["'].*?>/gi, '')
    .replace(/<meta\s+property=["']og:title["'].*?>/gi, '')
    .replace(/<meta\s+property=["']og:description["'].*?>/gi, '');

  return cleanHtml.replace('</head>', `${tags}\n</head>`);
}
