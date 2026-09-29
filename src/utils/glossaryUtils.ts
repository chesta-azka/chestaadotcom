export interface GlossaryTerm {
  term: string;
  slug: string;
  definition: string;
  category: string;
  serviceLink: string;
  serviceName: string;
}

export const glossaryDatabase: Record<string, GlossaryTerm> = {
  'machine-learning': {
    term: 'Machine Learning',
    slug: 'machine-learning',
    definition: 'Cabang kecerdasan buatan (AI) yang berfokus pada pembangunan aplikasi yang belajar dari data dan meningkatkan akurasinya dari waktu ke waktu tanpa diprogram secara eksplisit.',
    category: 'Artificial Intelligence',
    serviceLink: '/services/karyawan-digital-ai',
    serviceName: 'Karyawan Digital & AI Automation'
  },
  'roas': {
    term: 'ROAS (Return on Ad Spend)',
    slug: 'roas',
    definition: 'Metrik pemasaran digital yang mengukur jumlah pendapatan yang diperoleh bisnis untuk setiap uang yang diinvestasikan dalam kampanye iklan berbayar.',
    category: 'Performance Marketing',
    serviceLink: '/services/mesin-pelipatganda-roas',
    serviceName: 'Mesin Pelipatganda ROAS'
  },
  'nextjs-15': {
    term: 'Next.js 15',
    slug: 'nextjs-15',
    definition: 'Framework React full-stack terdepan yang mendukung rendering sisi server (SSR), Server Actions, dan kecepatan muat sub-detik untuk aplikasi web skala enterprise.',
    category: 'Web Architecture',
    serviceLink: '/services/website-mesin-konversi',
    serviceName: 'Website Mesin Konversi'
  },
  'seo': {
    term: 'SEO (Search Engine Optimization)',
    slug: 'seo',
    definition: 'Praktik mengoptimalkan struktur situs web dan konten agar mendapat peringkat tertinggi di halaman hasil mesin pencari secara organik tanpa biaya klik.',
    category: 'Search Marketing',
    serviceLink: '/services/dominasi-pencarian-seo-aeo',
    serviceName: 'Dominasi Mesin Pencari & AI (SEO & AEO)'
  },
  'aeo': {
    term: 'AEO (Answer Engine Optimization)',
    slug: 'aeo',
    definition: 'Strategi optimasi digital agar konten dan merek Anda dikutip secara resmi sebagai jawaban mutlak oleh model AI seperti ChatGPT, Claude, dan Gemini.',
    category: 'AI Search Marketing',
    serviceLink: '/services/dominasi-pencarian-seo-aeo',
    serviceName: 'Dominasi Mesin Pencari & AI (SEO & AEO)'
  },
  'cloud-computing': {
    term: 'Cloud Computing',
    slug: 'cloud-computing',
    definition: 'Penyediaan layanan komputasi melalui internet—termasuk penyimpanan, server, basis data, dan jaringan—untuk skalabilitas tanpa batas dan uptime 99.99%.',
    category: 'Infrastructure',
    serviceLink: '/services/infrastruktur-cloud-anti-down',
    serviceName: 'Infrastruktur Cloud Anti-Down'
  },
  'cybersecurity': {
    term: 'Cybersecurity',
    slug: 'cybersecurity',
    definition: 'Praktik melindungi sistem, jaringan, dan program dari serangan digital, pencurian data, dan ancaman ransomware menggunakan enkripsi tingkat militer.',
    category: 'Security',
    serviceLink: '/services/keamanan-data-korporat',
    serviceName: 'Benteng Keamanan Data Korporat'
  },
  'pwa': {
    term: 'PWA (Progressive Web App)',
    slug: 'pwa',
    definition: 'Aplikasi web yang dimuat menggunakan teknologi modern untuk memberikan pengalaman seperti aplikasi native, memungkinkan instalasi instan dan akses offline.',
    category: 'Mobile Architecture',
    serviceLink: '/services/super-app-korporat-pwa',
    serviceName: 'Pembuatan Super App Korporat (PWA)'
  },
  'automation': {
    term: 'Automation',
    slug: 'automation',
    definition: 'Penggunaan sistem perangkat lunak dan AI untuk menjalankan tugas operasional berulang secara otonom tanpa campur tangan manusia.',
    category: 'Workflow Automation',
    serviceLink: '/services/karyawan-digital-ai',
    serviceName: 'Karyawan Digital & AI Automation'
  },
  'enterprise-architecture': {
    term: 'Enterprise Architecture',
    slug: 'enterprise-architecture',
    definition: 'Praktik analisis, desain, perencanaan, dan implementasi strategi korporat untuk menciptakan ekosistem teknologi yang terpadu dan aman.',
    category: 'System Architecture',
    serviceLink: '/services/infrastruktur-digital-enterprise',
    serviceName: 'Infrastruktur Digital Terpusat'
  }
};

export function getGlossaryTerm(slug: string): GlossaryTerm {
  const normalized = slug.toLowerCase();
  if (glossaryDatabase[normalized]) {
    return glossaryDatabase[normalized];
  }
  
  // Fallback programmatic generation for any term
  const formattedTerm = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  return {
    term: formattedTerm,
    slug,
    definition: `${formattedTerm} adalah konsep teknologi modern yang memegang peran krusial dalam akselerasi digital dan efisiensi operasional korporat skala besar.`,
    category: 'Teknologi & Inovasi',
    serviceLink: '/services/dominasi-pencarian-seo-aeo',
    serviceName: 'Dominasi Mesin Pencari & AI (SEO & AEO)'
  };
}
