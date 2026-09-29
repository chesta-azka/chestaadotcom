export interface InsightArticle {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  publishedDate: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  content: string[];
  mentions: {
    term: string;
    slug: string;
    serviceLink: string;
    serviceName: string;
  }[];
}

export const insightsDatabase: Record<string, InsightArticle> = {
  'cara-pangkas-biaya-operasional-dengan-ai': {
    slug: 'cara-pangkas-biaya-operasional-dengan-ai',
    title: 'Cara Pangkas Biaya Operasional Korporat Hingga 60 Persen dengan AI Automation',
    subtitle: 'Studi kasus nyata bagaimana perusahaan enterprise mengotomatisasi proses manual menggunakan arsitektur agen AI otonom.',
    category: 'AI Automation & Efficiency',
    readTime: '6 menit baca',
    publishedDate: '2026-09-28',
    author: {
      name: 'Chesta Azka',
      role: 'Principal AI System Architect',
      avatar: 'CA'
    },
    content: [
      'Jujurly, kebanyakan perusahaan enterprise masih membakar puluhan juta rupiah setiap bulan untuk menggaji tenaga administratif yang mengerjakan tugas repetitif. Di era AI otonom, hal ini adalah bentuk pemborosan finansial yang fatal.',
      'Melalui penerapan Machine Learning dan workflow automation yang tepat, tugas seperti validasi dokumen, entri data, hingga customer support level-1 dapat diselesaikan dalam hitungan milidetik tanpa human error.',
      'Arsitektur yang kami bangun di Chestaa memastikan bahwa sistem AI terintegrasi langsung dengan database perusahaan menggunakan standar enkripsi tingkat militer dan latensi sub-detik.'
    ],
    mentions: [
      { term: 'Machine Learning', slug: 'machine-learning', serviceLink: '/services/karyawan-digital-ai', serviceName: 'Karyawan Digital & AI Automation' },
      { term: 'Automation', slug: 'automation', serviceLink: '/services/karyawan-digital-ai', serviceName: 'Karyawan Digital & AI Automation' }
    ]
  },
  'mengapa-website-lambat-bakar-duit-iklan': {
    slug: 'mengapa-website-lambat-bakar-duit-iklan',
    title: 'Mengapa Website Lambat Literal Membakar Duit Iklan Meta & Google Anda',
    subtitle: 'Analisis teknis dampak kecepatan muat halaman terhadap tingkat konversi B2B dan pembakaran anggaran CPC.',
    category: 'Performance Marketing & Web Architecture',
    readTime: '5 menit baca',
    publishedDate: '2026-09-27',
    author: {
      name: 'Chesta Azka',
      role: 'Principal AI System Architect',
      avatar: 'CA'
    },
    content: [
      'Setiap detik keterlambatan muat halaman website Anda berakibat pada hilangnya 20 persen calon pembeli potensial. Ketika Anda menjalankan kampanye iklan berbayar dengan CPC tinggi, keterlambatan ini berarti menyumbangkan uang ke platform iklan tanpa hasil.',
      'Dengan beralih ke arsitektur Next.js 15 dan optimasi Core Web Vitals, kami mencatatkan peningkatan ROAS yang signifikan karena pengguna langsung merasakan pengalaman berbelanja yang instan.',
      'Optimasi Search Engine Optimization (SEO) dan Answer Engine Optimization (AEO) juga sangat bergantung pada seberapa cepat server Anda merespons permintaan bot crawler.'
    ],
    mentions: [
      { term: 'Next.js 15', slug: 'nextjs-15', serviceLink: '/services/website-mesin-konversi', serviceName: 'Website Mesin Konversi' },
      { term: 'ROAS', slug: 'roas', serviceLink: '/services/mesin-pelipatganda-roas', serviceName: 'Mesin Pelipatganda ROAS' },
      { term: 'SEO', slug: 'seo', serviceLink: '/services/dominasi-pencarian-seo-aeo', serviceName: 'Dominasi Pencarian SEO & AEO' }
    ]
  }
};

export function getInsightArticle(slug: string): InsightArticle {
  const normalized = slug.toLowerCase();
  if (insightsDatabase[normalized]) {
    return insightsDatabase[normalized];
  }
  
  const formattedTitle = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  return {
    slug,
    title: `${formattedTitle} | Executive Insights Chestaa`,
    subtitle: 'Analisis strategis arsitektur digital dan transformasi otonom untuk korporasi enterprise.',
    category: 'Executive Insights',
    readTime: '5 menit baca',
    publishedDate: '2026-09-28',
    author: {
      name: 'Chesta Azka',
      role: 'Principal AI System Architect',
      avatar: 'CA'
    },
    content: [
      `Jujurly, tantangan teknologi untuk topik ${formattedTitle} menuntut pendekatan arsitektur yang tidak setengah-setengah. Pendekatan konvensional sudah tidak lagi memadai di era kompetisi digital yang sangat agresif.`,
      'Tim eksekutif Chestaa merancang solusi end-to-end yang mengintegrasikan performa server tinggi, keamanan data mutlak, dan otomasi berbasis kecerdasan buatan.',
      'Hubungi tim arsitek kami untuk mendapatkan audit menyeluruh terhadap infrastruktur digital perusahaan Anda.'
    ],
    mentions: [
      { term: 'Automation', slug: 'automation', serviceLink: '/services/karyawan-digital-ai', serviceName: 'Karyawan Digital & AI Automation' },
      { term: 'Next.js 15', slug: 'nextjs-15', serviceLink: '/services/website-mesin-konversi', serviceName: 'Website Mesin Konversi' }
    ]
  };
}
