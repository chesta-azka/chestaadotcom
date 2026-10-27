export interface GlossaryTerm {
  slug: string;
  term: string;
  shortDefinition: string;
  deepExplanation: string;
  relatedServices: { name: string; slug: string }[];
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    slug: 'tenant-isolation-database',
    term: 'Tenant Isolation Database',
    shortDefinition: 'Sebuah arsitektur database multi-penyewa di mana data setiap klien perusahaan diisolasi secara ketat untuk mencegah kebocoran data lintas korporasi.',
    deepExplanation: 'Dalam era transformasi digital Skala Enterprise, keamanan data adalah prioritas utama. Tenant Isolation Database memastikan bahwa setiap perusahaan atau unit bisnis memiliki batasan logis atau fisik yang tidak dapat ditembus oleh penyewa lain dalam sistem SaaS yang sama. Dengan menerapkan skema row-level security (RLS) dan enkripsi tingkat enterprise, chestaadotcom membantu korporasi mencapai Efisiensi Operasional maksimal tanpa mengorbankan kepatuhan regulasi privasi data dan mitigasi risiko ROI jangka panjang.',
    relatedServices: [
      { name: 'Otomatisasi Workflow AI', slug: 'otomatisasi-workflow-ai' },
      { name: 'Enterprise SaaS Development', slug: 'enterprise-saas-development' }
    ]
  },
  {
    slug: 'headless-b2b-commerce',
    term: 'Headless B2B Commerce',
    shortDefinition: 'Pemisahan total antara antarmuka pengguna (frontend) dan mesin transaksional backend untuk performa muat di bawah satu detik.',
    deepExplanation: 'Headless B2B Commerce adalah standar emas modern untuk platform e-commerce dan portal pengadaan korporat skala besar. Dengan memisahkan lapisan presentasi dari logika bisnis dan sistem ERP, perusahaan mendapatkan fleksibilitas tak tertandingi, waktu muat halaman instan, dan peningkatan konversi penjualan B2B yang signifikan. chestaadotcom merancang arsitektur headless berkinerja tinggi untuk memastikan skalabilitas tanpa batas dan Efisiensi Operasional tingkat lanjut.',
    relatedServices: [
      { name: 'Custom Web Application', slug: 'custom-web-application' },
      { name: 'ERP Integration Services', slug: 'erp-integration-services' }
    ]
  },
  {
    slug: 'on-premise-llm',
    term: 'On-Premise LLM (Large Language Model)',
    shortDefinition: 'Penerapan model kecerdasan buatan generatif secara lokal di server perusahaan sendiri untuk menjamin kerahasiaan data mutlak.',
    deepExplanation: 'Banyak perusahaan besar ragu mengadopsi AI generatif karena kekhawatiran data sensitif dikirim ke server pihak ketiga seperti OpenAI. On-Premise LLM menyelesaikan masalah ini dengan menjalankan model bahasa besar langsung di infrastruktur privat atau server lokal perusahaan. Pendekatan ini memberikan ROI luar biasa melalui otomatisasi dokumen rahasia, analisis kontrak hukum, dan customer service cerdas dengan jaminan 100 persen tanpa kebocoran data keluar ekosistem korporat chestaadotcom.',
    relatedServices: [
      { name: 'AI Workflow Automation', slug: 'ai-workflow-automation' },
      { name: 'Secure Enterprise Cloud', slug: 'secure-enterprise-cloud' }
    ]
  }
];

export const GLOSSARY_TERMS = glossaryTerms;

export function getGlossaryTermBySlug(slug: string): GlossaryTerm | undefined {
  return glossaryTerms.find((t) => t.slug === slug);
}
