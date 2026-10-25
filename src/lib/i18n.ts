/**
 * ============================================================================
 * BILINGUAL (ID | EN) LOCALIZATION & HREFLANG ROUTING LAYER — CHESTAADOTCOM
 * ============================================================================
 * Supports:
 * - Default unprefixed Indonesian URLs: /, /jasa/..., /portfolio, /case-studies, /blog, /about, /workflow
 * - Explicit Indonesian prefix: /ind, /ind/jasa/...
 * - Explicit English prefix: /eng, /eng/jasa/...
 */

import { getBlogAlternateSlugs } from '../data/blog-posts';

export type LocaleCode = 'id' | 'en';
export type UrlPrefix = '' | '/ind' | '/eng';
export type PrefixMode = 'default' | 'ind' | 'eng';

export interface ParsedLocalizedUrl {
  locale: LocaleCode;
  htmlLang: 'id' | 'en';
  ogLocale: 'id_ID' | 'en_US';
  prefix: UrlPrefix;
  prefixMode: PrefixMode;
  barePath: string; // Always starts with '/', e.g. '/', '/jasa/pembuatan-website'
  cleanPath: string; // Alias for barePath
}

export const SITE_BASE_URL = 'https://chestaa.com';

/**
 * Parses any pathname (including /ind/... or /eng/...) into its locale, prefix, and bare route path.
 */
export function parseLocalizedPath(rawUrlOrPath: string): ParsedLocalizedUrl {
  let pathname = rawUrlOrPath || '/';
  try {
    if (pathname.startsWith('http://') || pathname.startsWith('https://')) {
      pathname = new URL(pathname).pathname;
    } else {
      pathname = pathname.split('?')[0].split('#')[0] || '/';
    }
  } catch {
    pathname = pathname.split('?')[0].split('#')[0] || '/';
  }

  if (pathname.length > 1 && pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1);
  }

  if (pathname === '/eng' || pathname.startsWith('/eng/')) {
    const bare = pathname.slice(4) || '/';
    const normalizedBare = bare.startsWith('/') ? bare : `/${bare}`;
    return {
      locale: 'en',
      htmlLang: 'en',
      ogLocale: 'en_US',
      prefix: '/eng',
      prefixMode: 'eng',
      barePath: normalizedBare,
      cleanPath: normalizedBare,
    };
  }

  if (pathname === '/ind' || pathname.startsWith('/ind/')) {
    const bare = pathname.slice(4) || '/';
    const normalizedBare = bare.startsWith('/') ? bare : `/${bare}`;
    return {
      locale: 'id',
      htmlLang: 'id',
      ogLocale: 'id_ID',
      prefix: '/ind',
      prefixMode: 'ind',
      barePath: normalizedBare,
      cleanPath: normalizedBare,
    };
  }

  const normalizedBare = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return {
    locale: 'id',
    htmlLang: 'id',
    ogLocale: 'id_ID',
    prefix: '',
    prefixMode: 'default',
    barePath: normalizedBare,
    cleanPath: normalizedBare,
  };
}

/**
 * Formats an internal route link to preserve the current language prefix (/eng or /ind or default '')
 */
export function toLocalizedHref(
  targetBareHref: string,
  localeOrPathname: string = '/',
  explicitPrefixMode?: PrefixMode
): string {
  if (!targetBareHref) return '/';
  if (
    targetBareHref.startsWith('http://') ||
    targetBareHref.startsWith('https://') ||
    targetBareHref.startsWith('mailto:') ||
    targetBareHref.startsWith('tel:')
  ) {
    return targetBareHref;
  }

  let prefix: UrlPrefix = '';
  if (explicitPrefixMode) {
    prefix =
      explicitPrefixMode === 'eng'
        ? '/eng'
        : explicitPrefixMode === 'ind'
          ? '/ind'
          : '';
  } else if (localeOrPathname === 'en') {
    prefix = '/eng';
  } else if (localeOrPathname === 'id') {
    prefix = '';
  } else {
    prefix = parseLocalizedPath(localeOrPathname).prefix;
  }

  if (!prefix) return targetBareHref;

  if (targetBareHref === '/') {
    return prefix;
  }
  if (targetBareHref.startsWith('/#')) {
    return `${prefix}${targetBareHref}`;
  }
  if (targetBareHref.startsWith('#')) {
    return targetBareHref;
  }
  if (
    targetBareHref === '/eng' ||
    targetBareHref.startsWith('/eng/') ||
    targetBareHref === '/ind' ||
    targetBareHref.startsWith('/ind/')
  ) {
    return targetBareHref;
  }
  return `${prefix}${targetBareHref.startsWith('/') ? targetBareHref : `/${targetBareHref}`}`;
}

/**
 * Returns real <a href> targets for the ID | EN language switcher for the current page
 */
export function getLanguageSwitchLinks(
  currentPathname: string,
  currentHash: string = ''
): {
  idHref: string;
  indHref: string;
  enHref: string;
  activeLocale: LocaleCode;
} {
  const { locale, barePath } = parseLocalizedPath(currentPathname);
  const cleanHash = currentHash || '';

  if (barePath.startsWith('/blog/') && !barePath.startsWith('/blog/kategori/')) {
    const rawSlug = barePath.slice('/blog/'.length).trim();
    const blogAlts = getBlogAlternateSlugs(rawSlug);
    if (blogAlts) {
      const idBase = `/blog/${blogAlts.idSlug}`;
      const indBase = `/ind/blog/${blogAlts.idSlug}`;
      const enBase = blogAlts.enSlug ? `/eng/blog/${blogAlts.enSlug}` : '/eng/blog';
      return {
        idHref: `${idBase}${cleanHash}`,
        indHref: `${indBase}${cleanHash}`,
        enHref: `${enBase}${cleanHash}`,
        activeLocale: locale,
      };
    }
  }

  const idBase = barePath === '/' ? '/' : barePath;
  const indBase = barePath === '/' ? '/ind' : `/ind${barePath}`;
  const enBase = barePath === '/' ? '/eng' : `/eng${barePath}`;

  return {
    idHref: `${idBase}${cleanHash}`,
    indHref: `${indBase}${cleanHash}`,
    enHref: `${enBase}${cleanHash}`,
    activeLocale: locale,
  };
}

/**
 * Generates bidirectional hreflang URLs (id-ID, en, x-default) for any route
 */
export function getHreflangAlternates(
  rawUrlOrPath: string,
  siteBaseUrl: string = SITE_BASE_URL
): {
  idUrl: string;
  enUrl: string;
  xDefaultUrl: string;
  canonicalUrl: string;
  locale: LocaleCode;
} {
  const cleanSiteUrl = siteBaseUrl.replace(/\/+$/, '');
  const { locale, barePath } = parseLocalizedPath(rawUrlOrPath);

  if (barePath.startsWith('/blog/') && !barePath.startsWith('/blog/kategori/')) {
    const rawSlug = barePath.slice('/blog/'.length).trim();
    const blogAlts = getBlogAlternateSlugs(rawSlug);
    if (blogAlts) {
      const idUrl = `${cleanSiteUrl}/blog/${blogAlts.idSlug}`;
      const enUrl = blogAlts.enSlug
        ? `${cleanSiteUrl}/eng/blog/${blogAlts.enSlug}`
        : `${cleanSiteUrl}/eng/blog`;
      const canonicalUrl = locale === 'en' && blogAlts.enSlug ? enUrl : idUrl;
      return {
        idUrl,
        enUrl,
        xDefaultUrl: idUrl,
        canonicalUrl,
        locale,
      };
    }
  }

  const normalizedBare = barePath === '/' ? '' : barePath;
  const idUrl = `${cleanSiteUrl}${normalizedBare || '/'}`;
  const enUrl = `${cleanSiteUrl}/eng${normalizedBare}`;
  const canonicalUrl = locale === 'en' ? enUrl : idUrl;

  return {
    idUrl,
    enUrl,
    xDefaultUrl: idUrl,
    canonicalUrl,
    locale,
  };
}

export const KEYED_TRANSLATIONS: Record<LocaleCode, Record<string, string>> = {
  id: {
    'nav.brandAria': 'CHESTAADOTCOM Beranda',
    'nav.freeConsultation': 'Konsultasi gratis',
    'nav.freeConsultationWa': 'Konsultasi gratis via WhatsApp',
    'nav.openMenu': 'Buka menu',
    'nav.closeMenu': 'Tutup menu',
    'nav.menuDialogLabel': 'Menu navigasi utama',
    'nav.servicesGroup': 'Layanan',
    'nav.exploreGroup': 'Jelajahi',
    'nav.activePage': 'Halaman aktif',
    'nav.areasLine':
      'Melayani BSD City, Alam Sutera, Bintaro, Gading Serpong, dan Tangerang Selatan',
    'nav.areasLineShort': 'BSD City · Alam Sutera · Bintaro · Gading Serpong · Tangsel',
    'nav.langSwitchLabel': 'Pilih bahasa halaman',
    'nav.projects': 'Proyek',
    'nav.caseStudies': 'Case Study',
    'nav.blog': 'Blog',
    'nav.howItWorks': 'Cara Kerja',
    'nav.pricing': 'Harga',
    'nav.faq': 'FAQ',
    'service.web.title': 'Pembuatan Website & Landing Page',
    'service.web.desc': 'Muat di bawah 1,2 detik, struktur jelas, mulai Rp1.200.000.',
    'service.ai.title': 'AI Agent',
    'service.ai.desc': 'Balas chat WhatsApp, cek jadwal, dan catat CRM otomatis 24/7.',
    'service.software.title': 'Software Custom',
    'service.software.desc': 'Aplikasi web internal, portal klien, dan dashboard sesuai SOP.',
    'service.workflow.title': 'Otomasi Workflow',
    'service.workflow.desc': 'Sambungkan Sheets, form, invoice, dan WhatsApp tanpa salin manual.',
    'footer.brandDesc':
      'Partner rekayasa software custom dan AI agent di BSD City, Tangerang Selatan, dan Jabodetabek. Didirikan oleh Chesta Azka (arsitektur, produk, teknologi) dan Zeeshan (operasional, client success).',
    'footer.mainServices': 'Layanan Utama',
    'footer.guidesAndBlog': 'Panduan Bisnis & Teknis',
    'footer.webByArea': 'Jasa Pembuatan Website per Area',
    'footer.aiByArea': 'Jasa AI Agent per Area',
    'footer.baseAndCoverage': 'Basis & Area Layanan',
    'footer.baseAndCoverageDesc':
      'Basis: BSD, Tangerang Selatan · Melayani Alam Sutera, Bintaro, Gading Serpong & Jabodetabek',
    'footer.coFounderWa': 'WhatsApp Co-Founder',
    'footer.coFounderWaHours': '+62 821-2544-7232 (Senin – Sabtu, 09.00 – 18.00 WIB)',
    'footer.emailAndIndex': 'Email & Indeks',
    'footer.aboutUs': 'Tentang Kami',
    'cta.defaultEyebrow': 'KONSULTASI GRATIS',
    'cta.defaultButton': 'Konsultasi gratis via WhatsApp',
    'cta.defaultWaMessage':
      'Halo Chesta & Zeeshan, saya ingin konsultasi gratis mengenai pembuatan software custom / AI agent untuk bisnis saya.',
    'cta.footerSubline':
      'BSD City · Tangerang Selatan · Jabodetabek · Langsung dengan Chesta & Zeeshan',
    'breadcrumb.home': 'Beranda',
  },
  en: {
    'nav.brandAria': 'CHESTAADOTCOM Home',
    'nav.freeConsultation': 'Free consultation',
    'nav.freeConsultationWa': 'Free consultation via WhatsApp',
    'nav.openMenu': 'Open menu',
    'nav.closeMenu': 'Close menu',
    'nav.menuDialogLabel': 'Main navigation menu',
    'nav.servicesGroup': 'Services',
    'nav.exploreGroup': 'Explore',
    'nav.activePage': 'Active page',
    'nav.areasLine':
      'Serving BSD City, Alam Sutera, Bintaro, Gading Serpong, and South Tangerang',
    'nav.areasLineShort': 'BSD City · Alam Sutera · Bintaro · Gading Serpong · South Tangerang',
    'nav.langSwitchLabel': 'Switch page language',
    'nav.projects': 'Projects',
    'nav.caseStudies': 'Case Studies',
    'nav.blog': 'Blog',
    'nav.howItWorks': 'How It Works',
    'nav.pricing': 'Pricing',
    'nav.faq': 'FAQ',
    'service.web.title': 'Website & Landing Page Development',
    'service.web.desc': 'Loads under 1.2s, clear structure, starting from IDR 1,200,000.',
    'service.ai.title': 'AI Agent',
    'service.ai.desc': 'Reply to WhatsApp chats, check schedules, and update CRM 24/7.',
    'service.software.title': 'Custom Software',
    'service.software.desc': 'Internal web apps, client portals, and dashboards built for your SOP.',
    'service.workflow.title': 'Workflow Automation',
    'service.workflow.desc': 'Connect Sheets, forms, invoices, and WhatsApp with zero manual copy-paste.',
    'footer.brandDesc':
      'Custom software engineering and AI agent partner in BSD City, South Tangerang, and Greater Jakarta. Co-founded by Chesta Azka (architecture, product, technology) and Zeeshan (operations, client success).',
    'footer.mainServices': 'Core Services',
    'footer.guidesAndBlog': 'Business & Technical Guides',
    'footer.webByArea': 'Website Development by Area',
    'footer.aiByArea': 'AI Agent Services by Area',
    'footer.baseAndCoverage': 'Base & Service Coverage',
    'footer.baseAndCoverageDesc':
      'Base: BSD, South Tangerang · Serving Alam Sutera, Bintaro, Gading Serpong & Greater Jakarta',
    'footer.coFounderWa': 'Co-Founder WhatsApp',
    'footer.coFounderWaHours': '+62 821-2544-7232 (Mon – Sat, 09:00 – 18:00 WIB)',
    'footer.emailAndIndex': 'Email & Sitemaps',
    'footer.aboutUs': 'About Us',
    'cta.defaultEyebrow': 'FREE CONSULTATION',
    'cta.defaultButton': 'Free consultation via WhatsApp',
    'cta.defaultWaMessage':
      'Hi Chesta & Zeeshan, I would like a free consultation regarding custom software / AI agent development for my business.',
    'cta.footerSubline':
      'BSD City · South Tangerang · Greater Jakarta · Directly with Chesta & Zeeshan',
    'breadcrumb.home': 'Home',
  },
};

export function getTranslation(localeOrPathname: LocaleCode | string, key: string): string {
  const resolvedLocale: LocaleCode =
    localeOrPathname === 'en'
      ? 'en'
      : localeOrPathname === 'id'
        ? 'id'
        : parseLocalizedPath(localeOrPathname).locale;

  return (
    KEYED_TRANSLATIONS[resolvedLocale][key] ||
    KEYED_TRANSLATIONS.id[key] ||
    key
  );
}
