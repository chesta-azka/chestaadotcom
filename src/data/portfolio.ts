export interface SoftwareApplicationSchema {
  '@context': string;
  '@type': string;
  name: string;
  applicationCategory: string;
  operatingSystem: string;
  description: string;
  image?: string;
  aggregateRating?: {
    '@type': string;
    ratingValue: string;
    reviewCount: string;
  };
  offers: {
    '@type': string;
    priceCurrency: string;
    price: string;
  };
}

export interface PortfolioItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  industry: string;
  metrics: string[];
  description: string;
  challenge: string;
  architecture: string;
  coverType: 'code' | 'isometric' | 'wireframe';
  codeSnippet?: string;
  isometricBg?: string;
  schema: object;
  schemaData: SoftwareApplicationSchema;
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'b2b-ai-integrated-website',
    slug: 'b2b-ai-integrated-website',
    title: 'B2B AI-Integrated Website Architecture',
    category: 'Jasa Pembuatan Website B2B',
    industry: 'Enterprise & Corporate',
    metrics: ['LATENCY: 0.18s', 'CONVERSION: +340%', 'STATUS: DEPLOYED'],
    description: 'Lebih dari sekadar jasa website di BSD dan Jakarta Selatan, Chestaa mengintegrasikan AI untuk mengotomatisasi bisnis Anda menjadi infrastruktur digital otonom.',
    challenge: 'Traditional corporate websites act as passive brochures that fail to qualify inbound leads or automate sales follow-ups.',
    architecture: 'High-performance Next.js 15 architecture paired with autonomous AI lead qualification agents and edge caching.',
    coverType: 'isometric',
    isometricBg: 'from-purple-950 via-slate-900 to-indigo-950',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'B2B AI-Integrated Website Architecture',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Cloud',
      description: 'Autonomous B2B website infrastructure integrated with AI lead qualification.',
      offers: {
        '@type': 'Offer',
        priceCurrency: 'IDR',
        price: '1850000'
      }
    },
    schemaData: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'B2B AI-Integrated Website Architecture',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Cloud',
      description: 'Autonomous B2B website infrastructure integrated with AI lead qualification.',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '124'
      },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'IDR',
        price: '1850000'
      }
    }
  },
  {
    id: 'tanya-seo',
    slug: 'tanya-seo',
    title: 'TanyaSeo (Internal AI SEO Engine)',
    category: 'AI Automation & Data Pipeline',
    industry: 'Digital Marketing',
    metrics: ['LATENCY: 0.2s', 'SCHEMA INJECTION: AUTOMATED', 'UPTIME: 100%'],
    description: 'Mesin intelijen berbasis kecerdasan buatan yang mengotomatisasi analisis kata kunci dan injeksi skema SEO dengan latensi sub-detik.',
    challenge: 'Manual keyword tracking and schema deployment caused massive delays and inconsistent indexing across large-scale enterprise content ecosystems.',
    architecture: 'Built on Next.js 15 Edge Runtime integrated with Google Gemini AI models, executing real-time entity extraction and automated JSON-LD injection directly at the CDN edge layer.',
    coverType: 'code',
    codeSnippet: 'import { GoogleGenAI } from "@google/genai";\n\nexport async function analyzeSeoIntent(keyword: string) {\n  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });\n  const res = await ai.models.generateContent({\n    model: "gemini-2.5-flash",\n    contents: `Analyze SEO entity graph for: ${keyword}`\n  });\n  return res.text;\n}',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'TanyaSeo AI SEO Engine',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      description: 'AI-powered SEO automation and schema injection engine developed by Chestaa.',
      offers: {
        '@type': 'Offer',
        priceCurrency: 'IDR',
        price: '150000000'
      }
    },
    schemaData: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'TanyaSeo AI SEO Engine',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      description: 'AI-powered SEO automation and schema injection engine developed by Chestaa.',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '124'
      },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'IDR',
        price: '150000000'
      }
    }
  },
  {
    id: 'rumah-tropis',
    slug: 'rumah-tropis',
    title: 'Rumah Tropis (PropTech Web Architecture)',
    category: 'High-Performance Web',
    industry: 'Real Estate / Developer Property',
    metrics: ['LCP: <0.8s', 'CLS: 0.00', 'OPTIMIZATION: DYNAMIC'],
    description: 'Arsitektur platform properti digital (PropTech) untuk pengembang perumahan elit dengan pemuatan aset visual 4K di bawah 1 detik.',
    challenge: 'Luxury property buyers abandoned slow-loading image galleries, resulting in lost high-ticket conversions and poor mobile engagement.',
    architecture: 'Engineered with React 19 and Framer Motion featuring progressive blur-up image loading, edge caching, and an asynchronous asymmetrical grid layout.',
    coverType: 'isometric',
    isometricBg: 'from-emerald-950 via-slate-900 to-indigo-950',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Rumah Tropis PropTech Architecture',
      applicationCategory: 'WebApplication',
      operatingSystem: 'Web',
      description: 'High-performance real estate digital showcase platform.',
      offers: {
        '@type': 'Offer',
        priceCurrency: 'IDR',
        price: '45000000'
      }
    },
    schemaData: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Rumah Tropis PropTech Architecture',
      applicationCategory: 'WebApplication',
      operatingSystem: 'Web',
      description: 'High-performance real estate digital showcase platform.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '124'
      },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'IDR',
        price: '45000000'
      }
    }
  },
  {
    id: 'chestaa-nexus',
    slug: 'chestaa-nexus',
    title: 'Chestaa Nexus (Autonomous B2B CRM)',
    category: 'Business Workflow Automation',
    industry: 'Internal Agency Infrastructure',
    metrics: ['ADMIN COST: -100%', 'FIREBASE SYNC: REAL-TIME', 'RESPONSE: 60s'],
    description: 'Sistem CRM internal bertenaga Karyawan AI yang mengotomatisasi kualifikasi prospek B2B dan sinkronisasi real-time ke Firestore.',
    challenge: 'High operational overhead and delayed lead qualification crippled agency response times for inbound enterprise inquiries.',
    architecture: 'Autonomous AI workflow agents connected to Firebase Firestore and WhatsApp Business API, delivering real-time lead scoring and instant executive handover.',
    coverType: 'wireframe',
    isometricBg: 'from-purple-950 via-slate-950 to-indigo-950',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Chestaa Nexus B2B CRM',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Cloud',
      description: 'Autonomous B2B CRM powered by AI agents and real-time Firestore sync.',
      offers: {
        '@type': 'Offer',
        priceCurrency: 'IDR',
        price: '120000000'
      }
    },
    schemaData: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Chestaa Nexus B2B CRM',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Cloud',
      description: 'Autonomous B2B CRM powered by AI agents and real-time Firestore sync.',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200&auto=format&fit=crop',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '124'
      },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'IDR',
        price: '120000000'
      }
    }
  },
  {
    id: 'nusakarya-automata',
    slug: 'nusakarya-automata',
    title: 'NusaKarya Automata: ERP & Billing System',
    category: 'Enterprise System',
    industry: 'Creative Agency',
    metrics: ['100% Invoice Accuracy', '200+ Hours Saved/Month', 'Zero Data Leak'],
    description: 'Sebuah agensi kreatif raksasa, NusaKarya Digital, kehilangan ratusan jam setiap bulan hanya untuk mengurus penagihan dan alur kerja proyek secara manual. Chestaa merancang sistem ERP internal khusus.',
    challenge: 'NusaKarya Digital experienced manual reconciliation errors, delayed client invoicing, and severe administrative overhead across multiple creative squads.',
    architecture: 'Custom enterprise ERP built with Next.js 15, PostgreSQL Edge, and automated PDF invoice generation engines with zero-leak role-based access control.',
    coverType: 'wireframe',
    isometricBg: 'from-indigo-950 via-slate-900 to-purple-950',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'NusaKarya Automata ERP',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Cloud',
      description: 'Enterprise ERP and billing automation system for creative agencies.',
      offers: {
        '@type': 'Offer',
        priceCurrency: 'IDR',
        price: '175000000'
      }
    },
    schemaData: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'NusaKarya Automata ERP',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Cloud',
      description: 'Enterprise ERP and billing automation system for creative agencies.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '124'
      },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'IDR',
        price: '175000000'
      }
    }
  },
  {
    id: 'vanguard-hrx',
    slug: 'vanguard-hrx',
    title: 'Vanguard HRX: AI Talent Intelligence',
    category: 'AI Automation',
    industry: 'Media & Broadcasting',
    metrics: ['0.5s Resume Parsing', 'Bias-Free Scoring', 'Automated Interview Booking'],
    description: 'Vanguard Creative menghadapi krisis dalam menyaring ribuan portofolio pelamar. Chestaa mengimplementasikan sistem HR internal bertenaga AI.',
    challenge: 'HR team drowned in thousands of unstructured resumes, leading to delayed hiring cycles and top talent drop-off.',
    architecture: 'AI Talent Intelligence platform powered by LLMs and vector embeddings, executing instant resume parsing and automated calendar scheduling.',
    coverType: 'isometric',
    isometricBg: 'from-emerald-950 via-slate-950 to-indigo-950',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Vanguard HRX Talent Intelligence',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Cloud',
      description: 'AI-powered HR talent parsing and interview scheduling engine.',
      offers: {
        '@type': 'Offer',
        priceCurrency: 'IDR',
        price: '135000000'
      }
    },
    schemaData: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Vanguard HRX Talent Intelligence',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Cloud',
      description: 'AI-powered HR talent parsing and interview scheduling engine.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '124'
      },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'IDR',
        price: '135000000'
      }
    }
  }
];
