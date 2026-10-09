// Centralized site-wide SEO metadata constants for all app routes

export interface RouteSEO {
  title: string;
  description: string;
  keywords: string[];
}

export const SITE_METADATA = {
  defaultTitle: 'chestaadotcom - Principal Architecture & Autonomous AI Systems',
  defaultDescription: 'Chestaadotcom membantu perusahaan menyederhanakan proses, menghubungkan operasional, dan mengembangkan bisnis melalui solusi digital.',
  siteUrl: 'https://chestaa.com',
  author: 'Chesta Azka'
};

export const ROUTES_SEO_MAP: Record<string, RouteSEO> = {
  '/': {
    title: 'chestaadotcom - Sistem Otonom & Arsitektur Digital Korporat',
    description: 'Solusi rekayasa perangkat lunak enterprise dan otomasi AI otonom untuk melipatgandakan ROI bisnis Anda.',
    keywords: ['chestaadotcom', 'konsultan ai', 'jasa pembuatan website bsd', 'otomasi bisnis', 'software house b2b']
  },
  '/services': {
    title: 'Layanan Arsitektur & Otomasi AI | chestaadotcom',
    description: 'Eksplorasi layanan rekayasa sistem enterprise, web kustom berkecepatan sub-detik, dan agen AI 24/7.',
    keywords: ['layanan chestaadotcom', 'jasa rekayasa software', 'konsultan teknologi b2b']
  },
  '/case-studies': {
    title: 'Studi Kasus & Bukti Eksekusi Klien | chestaadotcom',
    description: 'Lihat bagaimana chestaadotcom membantu korporasi dan brand lokal meningkatkan efisiensi operasional dan omset.',
    keywords: ['studi kasus chestaadotcom', 'portofolio b2b', 'sukses transformasi digital']
  },
  '/about': {
    title: 'Tentang Principal & Studio | chestaadotcom',
    description: 'Kenali Chesta Azka dan filosofi arsitektur tanpa kompromi dalam membangun sistem otonom masa depan.',
    keywords: ['chesta azka', 'principal architect', 'tentang chestaadotcom']
  },
  '/workflow': {
    title: 'Alur Kerja & Metodologi Eksekusi | chestaadotcom',
    description: 'Transparansi penuh dari tahap audit, perancangan arsitektur, hingga penerapan bertahap.',
    keywords: ['workflow chestaadotcom', 'metodologi software', 'proses pengerjaan b2b']
  },
  '/academy': {
    title: 'Akademi & Sumber Daya AI | chestaadotcom',
    description: 'Edukasi dan panduan praktis adopsi kecerdasan buatan untuk efisiensi bisnis modern.',
    keywords: ['akademi ai chestaadotcom', 'belajar otomasi bisnis', 'resource software']
  },
  '/quiz': {
    title: 'Kalkulator Kesiapan AI & Otomasi | chestaadotcom',
    description: 'Uji tingkat kesiapan infrastruktur digital dan otomasi operasional perusahaan Anda sekarang.',
    keywords: ['kalkulator ai chestaadotcom', 'audit kesiapan digital', 'assessment b2b']
  },
  '/trust': {
    title: 'Pusat Kepercayaan & Keamanan | chestaadotcom',
    description: 'Komitmen keamanan data enterprise, SLA VIP, dan kepatuhan enkripsi penuh.',
    keywords: ['trust center chestaadotcom', 'keamanan data korporat', 'sla vip']
  }
};

// Export ROUTE_METADATA alias for App.tsx compatibility
export const ROUTE_METADATA = ROUTES_SEO_MAP;
