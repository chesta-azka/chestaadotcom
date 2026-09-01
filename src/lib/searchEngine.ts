import Fuse, { IFuseOptions } from 'fuse.js';
import React from 'react';
import { 
  Home, 
  MapPin, 
  Briefcase, 
  FileText, 
  Zap, 
  LayoutGrid, 
  BookOpen, 
  Sparkles, 
  Code, 
  Cpu, 
  Cloud, 
  ShoppingCart, 
  LayoutTemplate, 
  Search, 
  Link as LinkIcon, 
  Palette, 
  Activity,
  Layers,
  Building2,
  TrendingUp
} from 'lucide-react';
import { ALL_ARTICLES, Article } from '../data/blogData';
import { PROJECTS, Project } from '../data/projects';
import { SERVICE_DEFINITIONS } from '../data/ServiceDefinition';
import { caseStudyDB } from './caseStudies';
import { CITIES } from '../data/AreasData';

export type SearchCategory = 'all' | 'services' | 'portfolio' | 'articles' | 'areas' | 'pages';

export interface SearchDocument {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'Layanan' | 'Studi Kasus & Portofolio' | 'Artikel & Insight' | 'Wilayah (BSD/Cisauk)' | 'Halaman' | 'Fitur' | 'AI & Kontak';
  categoryKey: SearchCategory;
  path?: string;
  badge?: string;
  shortcut?: string;
  tags?: string[];
  client?: string;
  benefits?: string;
  techStack?: string;
  fullContent?: string;
  audienceKeywords?: string;
  iconName?: string;
  actionType?: 'navigate' | 'ai' | 'whatsapp' | 'performance';
}

/**
 * Extracts plain text from article content blocks
 */
function extractArticleText(article: Article): string {
  if (!article.content || !Array.isArray(article.content)) return '';
  return article.content
    .map(item => (typeof item === 'string' ? item : ''))
    .filter(Boolean)
    .join(' ')
    .replace(/[#*`_~>\-[\]()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Builds a unified searchable database across all content slugs and pages
 */
export function buildSearchIndex(performanceMode?: boolean): SearchDocument[] {
  const documents: SearchDocument[] = [];

  // 1. Core Navigation Pages
  const pages: SearchDocument[] = [
    {
      id: 'page-home',
      slug: 'home',
      title: 'Beranda — CHESTAADOTCOM',
      subtitle: 'Halaman utama arsitektur website modern, kecepatan sub-detik & inovasi digital',
      category: 'Halaman',
      categoryKey: 'pages',
      path: '/',
      shortcut: 'h',
      tags: ['Home', 'Beranda', 'Next.js', 'Web Developer', 'BSD City', 'Cisauk', 'B2B'],
      audienceKeywords: 'BSD City Cisauk Tangerang Selatan Jasa Pembuatan Website Agency Tech',
      fullContent: 'CHESTAADOTCOM jasa pembuatan website modern berkecepatan tinggi di BSD City dan Cisauk Tangerang.'
    },
    {
      id: 'page-services',
      slug: 'services',
      title: 'Semua Layanan Digital',
      subtitle: 'Katalog lengkap jasa pembuatan website, landing page, sistem AI & tuning performa',
      category: 'Halaman',
      categoryKey: 'pages',
      path: '/services',
      shortcut: 's',
      tags: ['Layanan', 'Services', 'Pricing', 'Paket Website', 'Web Development'],
      audienceKeywords: 'Paket Pembuatan Website Harga Web UMKM Enterprise BSD Cisauk',
      fullContent: 'Katalog layanan website mulai promo Rp540K hingga arsitektur custom B2B enterprise.'
    },
    {
      id: 'page-portfolio',
      slug: 'portfolio',
      title: 'Showcase Portofolio & Studi Kasus',
      subtitle: 'Koleksi studi kasus nyata, arsitektur sistem, dan ROI bisnis klien kami',
      category: 'Halaman',
      categoryKey: 'pages',
      path: '/portfolio',
      shortcut: 'p',
      tags: ['Portofolio', 'Case Studies', 'Studi Kasus', 'Karya', 'Hasil Nyata'],
      audienceKeywords: 'Studi Kasus Portofolio Web App B2B Fintech Logistics Company Profile',
      fullContent: 'Eksplorasi portofolio proyek digital live dengan metrik performa terukur.'
    },
    {
      id: 'page-workflow',
      slug: 'workflow',
      title: 'Workflow & Alur Kerja Transparan',
      subtitle: 'Metodologi kerja 4 fase dari brief strategi, prototyping, coding, hingga live deployment',
      category: 'Halaman',
      categoryKey: 'pages',
      path: '/workflow',
      tags: ['Alur Kerja', 'Workflow', 'Metodologi', 'Timeline', 'Standard'],
      audienceKeywords: 'Proses Pengerjaan Website Sprint Agile Quality Assurance SLA',
      fullContent: 'Tahapan pengerjaan transparan: Discovery, Interactive Prototyping, Clean Code Architecture, Launch.'
    },
    {
      id: 'page-about',
      slug: 'about',
      title: 'Tentang Founder & CHESTAADOTCOM',
      subtitle: 'Profil Chesta Azka Sofyan, visi arsitektur digital, dan filosofi craftsmanship',
      category: 'Halaman',
      categoryKey: 'pages',
      path: '/about',
      shortcut: 'a',
      tags: ['About', 'Tentang', 'Chesta Azka', 'Founder', 'Visi', 'Profil'],
      audienceKeywords: 'Chesta Azka Sofyan Software Engineer BSD Cisauk Lead Digital Architect',
      fullContent: 'Profil founder Chesta Azka Sofyan yang memadukan estetika Apple minimalism dengan kecepatan serverless.'
    },
    {
      id: 'page-blog',
      slug: 'blog',
      title: 'Blog, Artikel & Insight Teknologi',
      subtitle: 'Pusat edukasi strategi digital, panduan SEO lokal BSD Cisauk, dan AI engineering',
      category: 'Halaman',
      categoryKey: 'pages',
      path: '/blog',
      shortcut: 'b',
      tags: ['Blog', 'Artikel', 'Insight', 'Edukasi', 'SEO Guide'],
      audienceKeywords: 'Artikel SEO Lokal Cisauk BSD Tutorial Nextjs Panduan Bisnis Digital',
      fullContent: 'Kumpulan artikel mendalam seputar strategi SEO lokal, arsitektur web modern, dan otomasi AI.'
    },
    {
      id: 'action-performance',
      slug: 'performance-mode',
      title: performanceMode ? 'Nonaktifkan Mode Performa' : 'Aktifkan Mode Performa',
      subtitle: 'Optimasi animasi & rendering untuk perangkat mobile dan hemat daya',
      category: 'Fitur',
      categoryKey: 'pages',
      shortcut: 'm',
      actionType: 'performance',
      tags: ['Performance', 'Battery Saver', 'Animasi', 'Hemat Baterai', 'Mode Cepat'],
      audienceKeywords: 'Toggle Performance Mode FPS Optimization Low Power Mode',
      fullContent: 'Mengurangi beban GPU dan partikel animasi untuk performa maksimal pada semua perangkat.'
    }
  ];
  documents.push(...pages);

  // 2. Services from ServiceDefinition.ts
  SERVICE_DEFINITIONS.forEach((srv) => {
    documents.push({
      id: `srv-${srv.slug}`,
      slug: srv.slug,
      title: `${srv.title} — Spesialis BSD & Cisauk`,
      subtitle: srv.description,
      category: 'Layanan',
      categoryKey: 'services',
      path: `/layanan/${srv.slug}`,
      badge: 'Layanan B2B',
      tags: [...srv.benefits, srv.title, 'Layanan', 'BSD', 'Cisauk'],
      benefits: srv.benefits.join(' • '),
      audienceKeywords: `Layanan ${srv.title} BSD City Cisauk Tangerang Selatan Web Agency Profesional`,
      fullContent: `${srv.description} Keunggulan: ${srv.benefits.join(', ')}. Solusi dirancang untuk skalabilitas, konversi tinggi, dan kecepatan loading sub-detik bagi bisnis di BSD dan Cisauk.`
    });
  });

  // Highlighted Promo Deals
  documents.push({
    id: 'srv-promo-540k',
    slug: 'promo-website-540k',
    title: 'Promo Spesial Website UMKM Rp540K (Hemat 40%)',
    subtitle: 'Paket komplit termasuk domain .com gratis, cloud hosting super cepat, dan desain responsif',
    category: 'Layanan',
    categoryKey: 'services',
    path: '/services#pricing',
    badge: 'Best Deal',
    tags: ['Promo', '540K', 'Murah', 'UMKM', 'Domain Gratis', 'Hosting Cepat', 'Cisauk', 'BSD'],
    benefits: 'Gratis Domain .com • Cloud Serverless • Setup 3 Hari • WhatsApp Fast Connect',
    audienceKeywords: 'Promo Jasa Website Cisauk BSD Tangerang Murah Berkualitas 540 Ribu',
    fullContent: 'Paket website UMKM terlengkap hanya Rp540.000, sudah include domain .com, SSL aman, hosting CDN, dan integrasi tombol WhatsApp interaktif.'
  });

  // 3. Projects & Portofolio (`PROJECTS`)
  PROJECTS.forEach((proj) => {
    const combinedText = [
      proj.overview || '',
      proj.challenges || '',
      proj.solution || '',
      proj.description
    ].join(' ');

    documents.push({
      id: `proj-${proj.id}`,
      slug: proj.id,
      title: proj.title,
      subtitle: `${proj.category} ${proj.client ? `• Klien: ${proj.client}` : ''} — ${proj.description.substring(0, 85)}...`,
      client: proj.client || 'Client Enterprise',
      category: 'Studi Kasus & Portofolio',
      categoryKey: 'portfolio',
      path: `/portfolio/${proj.id}`,
      badge: proj.category,
      tags: [...proj.techStack, ...(proj.features || []), proj.category, proj.client || ''],
      techStack: proj.techStack.join(', '),
      audienceKeywords: `Portofolio ${proj.title} ${proj.category} Nextjs B2B Case Study`,
      fullContent: `${proj.description} ${combinedText} Fitur unggulan: ${(proj.features || []).join(', ')}. Tech stack: ${proj.techStack.join(', ')}.`
    });
  });

  // 4. Case Studies DB (`caseStudyDB`)
  caseStudyDB.forEach((study) => {
    // Avoid duplicate if matching project id
    const existing = documents.find(d => d.slug === study.slug);
    if (!existing) {
      documents.push({
        id: `cs-${study.slug}`,
        slug: study.slug,
        title: `${study.client}: ${study.title}`,
        subtitle: `${study.impact} • ${study.desc}`,
        client: study.client,
        category: 'Studi Kasus & Portofolio',
        categoryKey: 'portfolio',
        path: `/portfolio/${study.slug}`,
        badge: study.impact,
        tags: ['Studi Kasus', study.client, study.title, 'Enterprise ROI', 'High Performance'],
        benefits: study.impact,
        audienceKeywords: `Case Study ${study.client} ROI Performance Next.js Enterprise`,
        fullContent: `${study.desc} Dampak Bisnis / ROI: ${study.roi} Metrik Utama: ${study.impact}.`
      });
    }
  });

  // 5. Blog Articles (`ALL_ARTICLES`) with deep full-text indexing
  ALL_ARTICLES.forEach((art) => {
    const articleBodyText = extractArticleText(art);

    documents.push({
      id: `art-${art.slug}`,
      slug: art.slug,
      title: art.title,
      subtitle: `${art.cat} • ${art.readTime} — ${art.desc}`,
      category: 'Artikel & Insight',
      categoryKey: 'articles',
      path: `/blog?read=${art.slug}`,
      badge: art.cat,
      tags: [...(art.tags || []), art.cat, art.author?.name || 'Chesta Azka Sofyan'],
      audienceKeywords: `Artikel Blog SEO ${art.cat} BSD Cisauk Tutorial Edukasi`,
      fullContent: `${art.desc} ${articleBodyText} Penulis: ${art.author?.name || 'Chesta Azka'}. Kategori: ${art.cat}.`
    });
  });

  // 6. Targeted Local SEO Cities (`CITIES`)
  CITIES.forEach((city) => {
    const cityName = city.replace('-', ' ');
    const isPrimaryLocality = city === 'CISAUK' || city === 'BSD-CITY' || city === 'GADING-SERPONG' || city === 'TANGERANG-SELATAN';

    documents.push({
      id: `area-${city.toLowerCase()}`,
      slug: city.toLowerCase(),
      title: `Jasa Pembuatan Website ${cityName}`,
      subtitle: `Layanan website profesional, landing page konversi & SEO lokal di wilayah ${cityName}`,
      category: 'Wilayah (BSD/Cisauk)',
      categoryKey: 'areas',
      path: `/area/${city.toLowerCase()}`,
      badge: isPrimaryLocality ? 'Area Utama' : cityName,
      tags: ['SEO Lokal', cityName, 'Jasa Website ' + cityName, 'Landing Page ' + cityName, 'UMKM ' + cityName],
      audienceKeywords: `Jasa Website ${cityName} Bikin Web ${cityName} Developer Tangerang Banten`,
      fullContent: `Layanan pembuatan website cepat, company profile, dan landing page khusus pelaku usaha di ${cityName}. Optimasi SEO Google Maps dan Local Search #1.`
    });
  });

  return documents;
}

/**
 * Fuse.js configuration tuned for fast, accurate B2B full-text fuzzy queries
 */
export const FUSE_SEARCH_OPTIONS: IFuseOptions<SearchDocument> = {
  isCaseSensitive: false,
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 2,
  shouldSort: true,
  threshold: 0.35, // Balanced fuzzy tolerance
  distance: 100,
  ignoreLocation: true, // Full-text search across entire strings
  keys: [
    { name: 'title', weight: 0.35 },
    { name: 'slug', weight: 0.25 },
    { name: 'tags', weight: 0.20 },
    { name: 'client', weight: 0.18 },
    { name: 'subtitle', weight: 0.15 },
    { name: 'badge', weight: 0.12 },
    { name: 'benefits', weight: 0.15 },
    { name: 'techStack', weight: 0.15 },
    { name: 'audienceKeywords', weight: 0.15 },
    { name: 'fullContent', weight: 0.10 },
  ],
};

let cachedFuseInstance: Fuse<SearchDocument> | null = null;
let cachedDocs: SearchDocument[] = [];

/**
 * Returns a singleton or refreshed Fuse instance for instantaneous searching
 */
export function getSearchEngine(performanceMode?: boolean): {
  fuse: Fuse<SearchDocument>;
  allDocs: SearchDocument[];
} {
  if (!cachedFuseInstance || cachedDocs.length === 0) {
    cachedDocs = buildSearchIndex(performanceMode);
    cachedFuseInstance = new Fuse(cachedDocs, FUSE_SEARCH_OPTIONS);
  }
  return { fuse: cachedFuseInstance, allDocs: cachedDocs };
}
