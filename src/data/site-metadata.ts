export interface SiteMetadata {
  siteName: string;
  siteUrl: string;
  author: string;
  defaultTitle: string;
  defaultDescription: string;
  ogImage: string;
  twitterHandle: string;
  socials: {
    github: string;
    linkedin: string;
    instagram: string;
    whatsapp: string;
  };
}

export const SITE_METADATA: SiteMetadata = {
  siteName: 'CHESTAADOTCOM',
  siteUrl: 'https://chestaa.com',
  author: 'Chesta Azka Sofyan',
  defaultTitle: 'CHESTAADOTCOM | Jasa Pembuatan Website Premium & AI Automation — Cisauk & BSD City',
  defaultDescription: 'Studio arsitektur digital & pengembangan software enterprise di Cisauk, BSD City, Tangerang & Jakarta. Website kustom sekelas Apple, performa sub-detik & Agentic AI.',
  ogImage: 'https://chestaa.com/og-image.jpg',
  twitterHandle: '@chestaa_dev',
  socials: {
    github: 'https://github.com/chestacode',
    linkedin: 'https://linkedin.com/in/chesta-azka',
    instagram: 'https://instagram.com/chestaa.dev',
    whatsapp: 'https://wa.me/6282125447232'
  }
};

export const GLOBAL_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareCompany",
  "name": SITE_METADATA.siteName,
  "url": SITE_METADATA.siteUrl,
  "logo": "https://chestaa.com/icon.png",
  "founder": {
    "@type": "Person",
    "name": SITE_METADATA.author
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Cisauk, BSD City",
    "addressRegion": "Tangerang",
    "addressCountry": "ID"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+62-821-2544-7232",
    "contactType": "customer service"
  },
  "sameAs": [
    SITE_METADATA.socials.github,
    SITE_METADATA.socials.linkedin,
    SITE_METADATA.socials.instagram
  ]
};

export const ROUTE_SITE_METADATA: Record<string, { title: string; description: string; ogImage?: string }> = {
  '/': {
    title: SITE_METADATA.defaultTitle,
    description: SITE_METADATA.defaultDescription,
  },
  '/blog': {
    title: 'Insights & Artikel Arsitektur Digital | CHESTAADOTCOM',
    description: 'Kumpulan artikel mendalam seputar optimasi SEO lokal Cisauk/BSD, arsitektur web berperforma tinggi, dan automasi AI bisnis.',
  },
  '/portfolio': {
    title: 'Showcase Portofolio Proyek Kustom | CHESTAADOTCOM',
    description: 'Eksplorasi karya nyata pembuatan website perusahaan, e-commerce, dan aplikasi enterprise berstandar internasional.',
  },
  '/about': {
    title: 'Tentang Chesta Azka Sofyan — Founder & Principal Engineer',
    description: 'Mengenal rekam jejak, visi, dan standar kualitas rekayasa digital di balik CHESTAADOTCOM.',
  },
  '/workflow': {
    title: 'Metodologi & Workflow Pengerjaan Proyek | CHESTAADOTCOM',
    description: 'Transparansi penuh dari tahap arsitektur, development, stress testing, hingga deployment global di cloud edge.',
  },
  '/academy': {
    title: 'Academy & Masterclass Rekayasa Perangkat Lunak | CHESTAADOTCOM',
    description: 'Program pembelajaran eksklusif untuk menguasai arsitektur web modern, sistem cloud terpadu, dan AI integration.',
  },
  '/quiz': {
    title: 'Kuis & Uji Kompetensi Arsitektur Web | CHESTAADOTCOM',
    description: 'Uji kemampuan teknis Anda seputar pengembangan web, arsitektur frontend, dan optimasi performa digital.',
  },
  '/case-studies': {
    title: 'Studi Kasus & Kenaikan ROI Klien | CHESTAADOTCOM',
    description: 'Bukti terukur bagaimana website cepat dan sistem otomatisasi AI melipatgandakan konversi bisnis klien.',
  }
};
