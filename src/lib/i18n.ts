/**
 * ============================================================================
 * BILINGUAL (/id | /en) LOCALIZATION & HREFLANG ROUTING LAYER — CHESTAADOTCOM
 * ============================================================================
 * Strict route map:
 * - /id <-> /en
 * - /id/jasa/pembuatan-website <-> /en/services/website-development
 * - /id/jasa/ai-agent <-> /en/services/ai-agents
 * - /id/jasa/software-custom <-> /en/services/custom-software
 * - /id/jasa/otomasi-workflow <-> /en/services/workflow-automation
 * - /id/jasa/{pembuatan-website|ai-agent}/{area} <-> /en/services/{website-development|ai-agents}/{area}
 * - /id/area <-> /en/areas
 */

import { getBlogAlternateSlugs } from '../data/blog-posts';
import {
  SERVICE_ID_TO_EN_SLUG,
  resolveCanonicalServiceSlug,
} from '../data/services';

export type LocaleCode = 'id' | 'en';
export type SupportedLocale = LocaleCode;
export type UrlPrefix = '/id' | '/en';
export type PrefixMode = 'id' | 'en' | 'default' | 'ind' | 'eng';

export interface ParsedLocalizedUrl {
  locale: LocaleCode;
  htmlLang: 'id' | 'en';
  ogLocale: 'id_ID' | 'en_US';
  prefix: UrlPrefix;
  prefixMode: PrefixMode;
  barePath: string; // Normalized internal path starting with '/', e.g. '/', '/jasa/pembuatan-website', '/area'
  cleanPath: string;
}

export const SITE_BASE_URL = 'https://chestaa.com';
export const SITE_URL = SITE_BASE_URL;

/**
 * Normalizes any raw service/area bare path into canonical internal form:
 * - /services/website-development -> /jasa/pembuatan-website
 * - /services/ai-agents/bsd-city -> /jasa/ai-agent/bsd-city
 * - /areas -> /area
 */
function normalizeInternalBarePath(rawBare: string): string {
  const path = rawBare.startsWith('/') ? rawBare : `/${rawBare}`;
  if (path === '/areas') return '/area';
  if (path === '/free-audit') return '/audit-gratis';
  if (path === '/tentang' || path === '/about-us' || path === '/tentang-kami') return '/about';
  if (path === '/pricing') return '/harga';
  if (path === '/how-it-works' || path === '/how-we-work') return '/cara-kerja';
  if (path === '/privacy') return '/privasi';
  if (path === '/studi-kasus') return '/case-studies';
  if (path.startsWith('/studi-kasus/')) {
    return `/case-studies/${path.slice('/studi-kasus/'.length)}`;
  }
  if (path.startsWith('/blog/topic/')) {
    return `/blog/topik/${path.slice('/blog/topic/'.length)}`;
  }
  if (path.startsWith('/blog/page/')) {
    return `/blog/halaman/${path.slice('/blog/page/'.length)}`;
  }

  const serviceAreaMatch = path.match(/^\/(jasa|services|layanan)\/([^/]+)\/([^/]+)$/i);
  if (serviceAreaMatch) {
    const canonicalService = resolveCanonicalServiceSlug(serviceAreaMatch[2]);
    const areaSlug = serviceAreaMatch[3].toLowerCase();
    if (canonicalService) {
      return `/jasa/${canonicalService}/${areaSlug}`;
    }
  }

  const serviceMatch = path.match(/^\/(jasa|services|layanan)\/([^/]+)$/i);
  if (serviceMatch) {
    const canonicalService = resolveCanonicalServiceSlug(serviceMatch[2]);
    if (canonicalService) {
      return `/jasa/${canonicalService}`;
    }
  }

  return path;
}

/**
 * Parses any pathname into its locale ('id' | 'en'), canonical prefix ('/id' | '/en'), and normalized barePath.
 */
export function parseLocalizedPath(rawUrlOrPath: string): ParsedLocalizedUrl {
  let pathname = rawUrlOrPath || '/id';
  try {
    if (pathname.startsWith('http://') || pathname.startsWith('https://')) {
      pathname = new URL(pathname).pathname;
    } else {
      pathname = pathname.split('?')[0].split('#')[0] || '/id';
    }
  } catch {
    pathname = pathname.split('?')[0].split('#')[0] || '/id';
  }

  if (pathname.length > 1 && pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1);
  }

  if (
    pathname === '/en' ||
    pathname.startsWith('/en/') ||
    pathname === '/eng' ||
    pathname.startsWith('/eng/')
  ) {
    const sliceLen = pathname === '/eng' || pathname.startsWith('/eng/') ? 4 : 3;
    const rawBare = pathname.slice(sliceLen) || '/';
    const barePath = normalizeInternalBarePath(rawBare);
    return {
      locale: 'en',
      htmlLang: 'en',
      ogLocale: 'en_US',
      prefix: '/en',
      prefixMode: 'en',
      barePath,
      cleanPath: barePath,
    };
  }

  if (
    pathname === '/id' ||
    pathname.startsWith('/id/') ||
    pathname === '/ind' ||
    pathname.startsWith('/ind/')
  ) {
    const sliceLen = pathname === '/ind' || pathname.startsWith('/ind/') ? 4 : 3;
    const rawBare = pathname.slice(sliceLen) || '/';
    const barePath = normalizeInternalBarePath(rawBare);
    return {
      locale: 'id',
      htmlLang: 'id',
      ogLocale: 'id_ID',
      prefix: '/id',
      prefixMode: 'id',
      barePath,
      cleanPath: barePath,
    };
  }

  // Unprefixed fallback (e.g. /services/website-development or /jasa/pembuatan-website)
  const isExplicitEnglishService =
    pathname === '/areas' ||
    pathname === '/free-audit' ||
    pathname === '/about' ||
    pathname === '/privacy' ||
    pathname.startsWith('/services/') ||
    pathname === '/case-studies' ||
    pathname.startsWith('/case-studies/') ||
    pathname.startsWith('/blog/page/');
  const barePath = normalizeInternalBarePath(pathname);

  if (isExplicitEnglishService) {
    return {
      locale: 'en',
      htmlLang: 'en',
      ogLocale: 'en_US',
      prefix: '/en',
      prefixMode: 'en',
      barePath,
      cleanPath: barePath,
    };
  }

  return {
    locale: 'id',
    htmlLang: 'id',
    ogLocale: 'id_ID',
    prefix: '/id',
    prefixMode: 'id',
    barePath,
    cleanPath: barePath,
  };
}

/**
 * Converts a normalized barePath into its strict /id/... or /en/... URL
 */
function buildCanonicalLocalePath(barePath: string, locale: LocaleCode): string {
  const normalized = normalizeInternalBarePath(barePath);

  if (normalized === '/') {
    return locale === 'en' ? '/en' : '/id';
  }

  if (normalized === '/audit-gratis') {
    return locale === 'en' ? '/en/free-audit' : '/id/audit-gratis';
  }

  if (normalized === '/about') {
    return locale === 'en' ? '/en/about' : '/id/tentang';
  }

  if (normalized === '/harga') {
    return locale === 'en' ? '/en/pricing' : '/id/harga';
  }

  if (normalized === '/cara-kerja') {
    return locale === 'en' ? '/en/how-it-works' : '/id/cara-kerja';
  }

  if (normalized === '/faq') {
    return locale === 'en' ? '/en/faq' : '/id/faq';
  }

  if (normalized === '/privasi') {
    return locale === 'en' ? '/en/privacy' : '/id/privasi';
  }

  if (normalized === '/area' || normalized === '/areas') {
    return locale === 'en' ? '/en/areas' : '/id/area';
  }

  if (normalized === '/case-studies') {
    return locale === 'en' ? '/en/case-studies' : '/id/studi-kasus';
  }

  if (normalized.startsWith('/case-studies/')) {
    const slug = normalized.slice('/case-studies/'.length).trim();
    return locale === 'en'
      ? `/en/case-studies/${slug}`
      : `/id/studi-kasus/${slug}`;
  }

  const serviceAreaMatch = normalized.match(/^\/jasa\/([^/]+)\/([^/]+)$/i);
  if (serviceAreaMatch) {
    const canonicalService = resolveCanonicalServiceSlug(serviceAreaMatch[1]);
    const areaSlug = serviceAreaMatch[2].toLowerCase();
    if (canonicalService) {
      if (locale === 'en') {
        const enServiceSlug = SERVICE_ID_TO_EN_SLUG[canonicalService];
        return `/en/services/${enServiceSlug}/${areaSlug}`;
      }
      return `/id/jasa/${canonicalService}/${areaSlug}`;
    }
  }

  const serviceMatch = normalized.match(/^\/jasa\/([^/]+)$/i);
  if (serviceMatch) {
    const canonicalService = resolveCanonicalServiceSlug(serviceMatch[1]);
    if (canonicalService) {
      if (locale === 'en') {
        const enServiceSlug = SERVICE_ID_TO_EN_SLUG[canonicalService];
        return `/en/services/${enServiceSlug}`;
      }
      return `/id/jasa/${canonicalService}`;
    }
  }

  if (normalized.startsWith('/blog/topik/')) {
    const clusterSlug = normalized.slice('/blog/topik/'.length).trim();
    return locale === 'en'
      ? `/en/blog/topic/${clusterSlug}`
      : `/id/blog/topik/${clusterSlug}`;
  }

  if (normalized.startsWith('/blog/halaman/')) {
    const pageNum = normalized.slice('/blog/halaman/'.length).trim();
    if (pageNum === '1') {
      return locale === 'en' ? '/en/blog' : '/id/blog';
    }
    return locale === 'en'
      ? `/en/blog/page/${pageNum}`
      : `/id/blog/halaman/${pageNum}`;
  }

  if (
    normalized.startsWith('/blog/') &&
    !normalized.startsWith('/blog/kategori/') &&
    !normalized.startsWith('/blog/halaman/') &&
    !normalized.startsWith('/blog/page/')
  ) {
    const rawSlug = normalized.slice('/blog/'.length).trim();
    const blogAlts = getBlogAlternateSlugs(rawSlug);
    if (blogAlts) {
      if (locale === 'en') {
        return blogAlts.enSlug ? `/en/blog/${blogAlts.enSlug}` : '/en/blog';
      }
      return `/id/blog/${blogAlts.idSlug}`;
    }
  }

  return locale === 'en' ? `/en${normalized}` : `/id${normalized}`;
}

/**
 * Formats an internal route link to the strict /id/... or /en/... route map
 */
export function toLocalizedHref(
  targetBareHref: string,
  localeOrPathname: string = '/id',
  explicitPrefixMode?: PrefixMode
): string {
  if (!targetBareHref) return '/id';
  if (
    targetBareHref.startsWith('http://') ||
    targetBareHref.startsWith('https://') ||
    targetBareHref.startsWith('mailto:') ||
    targetBareHref.startsWith('tel:')
  ) {
    return targetBareHref;
  }

  let locale: LocaleCode = 'id';
  if (explicitPrefixMode === 'en' || explicitPrefixMode === 'eng') {
    locale = 'en';
  } else if (
    explicitPrefixMode === 'id' ||
    explicitPrefixMode === 'ind' ||
    explicitPrefixMode === 'default'
  ) {
    locale = 'id';
  } else if (localeOrPathname === 'en') {
    locale = 'en';
  } else if (localeOrPathname === 'id') {
    locale = 'id';
  } else {
    locale = parseLocalizedPath(localeOrPathname).locale;
  }

  if (targetBareHref.startsWith('#')) {
    return targetBareHref;
  }

  if (targetBareHref.startsWith('/#')) {
    const hash = targetBareHref.slice(1); // '#...'
    return `${locale === 'en' ? '/en' : '/id'}${hash}`;
  }

  // Separate hash and query if present
  const [beforeHash, hashPart] = targetBareHref.split('#');
  const [pathPart, queryPart] = (beforeHash || '/').split('?');
  const querySuffix = queryPart ? `?${queryPart}` : '';
  const hashSuffix = hashPart ? `#${hashPart}` : '';

  const parsedTarget = parseLocalizedPath(pathPart || '/');
  return `${buildCanonicalLocalePath(parsedTarget.barePath, locale)}${querySuffix}${hashSuffix}`;
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

  const idBase = buildCanonicalLocalePath(barePath, 'id');
  const enBase = buildCanonicalLocalePath(barePath, 'en');

  return {
    idHref: `${idBase}${cleanHash}`,
    indHref: `${idBase}${cleanHash}`,
    enHref: `${enBase}${cleanHash}`,
    activeLocale: locale,
  };
}

/**
 * Generates bidirectional hreflang URLs (id, en, x-default) for any route
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

  const idPath = buildCanonicalLocalePath(barePath, 'id');
  const enPath = buildCanonicalLocalePath(barePath, 'en');

  const idUrl = `${cleanSiteUrl}${idPath}`;
  const enUrl = `${cleanSiteUrl}${enPath}`;
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
    'nav.freeConsultation': 'Audit gratis 30 menit',
    'nav.freeConsultationWa': 'Mulai dari audit gratis 30 menit via WhatsApp',
    'nav.openMenu': 'Buka menu',
    'nav.closeMenu': 'Tutup menu',
    'nav.menuDialogLabel': 'Menu navigasi utama',
    'nav.servicesGroup': 'Layanan',
    'nav.exploreGroup': 'Jelajahi',
    'nav.activePage': 'Halaman aktif',
    'nav.areasLine':
      'Melayani Tangerang Selatan, BSD City, Pamulang, Jurang Mangu, dan Lebak Bulus',
    'nav.areasLineShort': 'Tangsel · BSD City · Pamulang · Jurang Mangu · Lebak Bulus',
    'nav.langSwitchLabel': 'Pilih bahasa halaman',
    'nav.projects': 'Proyek Internal',
    'nav.caseStudies': 'Studi Kasus Internal',
    'nav.blog': 'Blog',
    'nav.areas': 'Area Layanan',
    'nav.howItWorks': 'Cara Kerja',
    'nav.pricing': 'Harga',
    'nav.faq': 'FAQ',
    'service.web.title': 'Pembuatan Website dan Landing Page',
    'service.web.desc': 'Statis, ringan, cepat di HP, mulai Rp1.200.000.',
    'service.ai.title': 'AI Agent untuk Bisnis',
    'service.ai.desc': 'Jawab chat WhatsApp, cek jadwal, dan catat ke sistem 24/7.',
    'service.software.title': 'Pengembangan Software Custom',
    'service.software.desc': 'Aplikasi web internal, portal klien, dan dashboard sesuai SOP.',
    'service.workflow.title': 'Otomasi Workflow Bisnis',
    'service.workflow.desc': 'Sambungkan form, Sheets, kalender, dan WhatsApp tanpa salin manual.',
    'footer.brandDesc':
      'Partner pengembangan software custom dan AI agent berbasis di BSD, Tangerang Selatan, melayani bisnis di Tangerang Selatan dan Jabodetabek. Didirikan oleh Chesta Azka (arsitektur, produk, teknologi) dan Zeeshan (operasional, client success).',
    'footer.mainServices': 'Layanan Utama',
    'footer.guidesAndBlog': 'Panduan Bisnis & Teknis',
    'footer.webByArea': 'Jasa Pembuatan Website per Area',
    'footer.aiByArea': 'Jasa AI Agent per Area',
    'footer.baseAndCoverage': 'Basis & Area Layanan',
    'footer.baseAndCoverageDesc':
      'Berbasis di BSD, Tangerang Selatan · Melayani Tangerang Selatan, BSD City, Pamulang, Jurang Mangu, Lebak Bulus & Jabodetabek',
    'footer.coFounderWa': 'WhatsApp Co-Founder',
    'footer.coFounderWaHours': '+62 821-2544-7232 (Audit gratis 30 menit)',
    'footer.emailAndIndex': 'Email & Indeks',
    'footer.aboutUs': 'Tentang Kami',
    'cta.defaultEyebrow': 'AUDIT GRATIS 30 MENIT',
    'cta.defaultButton': 'Chat via WhatsApp',
    'cta.defaultWaMessage':
      'Halo Chesta & Zeeshan, saya ingin mulai dari audit gratis 30 menit untuk bisnis saya.',
    'cta.footerSubline':
      'Berbasis di BSD, Tangerang Selatan · Melayani Tangerang Selatan dan Jabodetabek',
    'breadcrumb.home': 'Beranda',
    'breadcrumb.services': 'Layanan',
    'breadcrumb.areas': 'Area',
    'sim.eyebrow': 'SIMULASI KINERJA AGENT',
    'sim.chip': 'Simulasi',
    'sim.title': 'Satu hari kerja agent di klinik, dalam satu layar',
    'sim.sub':
      'Ini simulasi untuk menunjukkan alurnya: pesan masuk, tindakan agent, dan kapan agent menyerahkan ke manusia. Angkanya contoh, bukan hasil klien.',
    'sim.legend.user': 'Pesan pelanggan',
    'sim.legend.agent': 'Tindakan agent',
    'sim.legend.handoff': 'Diserahkan ke staf',
    'sim.button.replay': 'Ulangi simulasi',
    'sim.console.header': 'WhatsApp klinik · contoh',
    'sim.console.status': 'Agent aktif',
    'sim.col.chat': 'Percakapan',
    'sim.col.actions': 'Tindakan agent',
    'sim.summary.title': 'Ringkasan contoh satu hari',
    'sim.metric.messages': 'Pesan diproses',
    'sim.metric.bookings': 'Booking dibuat',
    'sim.metric.handoffs': 'Diserahkan ke staf',
    'sim.metric.reminders': 'Pengingat terkirim',
    'sim.footer.note': 'Simulasi ilustratif. Bukan data klien.',
    'sim.aria.section': 'Simulasi satu hari kerja agent di klinik',
    'sim.status.completed': 'Selesai',
    'sim.status.handedOff': 'Diserahkan',
    'sim.e1.user': 'Kak, facial hari Sabtu masih ada slot?',
    'sim.e1.action1': 'Cek kalender terapis',
    'sim.e1.agent': 'Ada dua slot hari Sabtu: 10.00 dan 14.00. Mau yang mana, Kak?',
    'sim.e2.user': '14.00 ya.',
    'sim.e2.action1': 'Buat booking',
    'sim.e2.action2': 'Kirim konfirmasi',
    'sim.e2.action3': 'Catat di CRM',
    'sim.e2.agent': 'Siap, Sabtu pukul 14.00 sudah kami catat. Sampai ketemu ya!',
    'sim.e3.user': 'Harga botox berapa ya?',
    'sim.e3.action1': 'Ambil daftar harga',
    'sim.e3.agent':
      'Harganya tergantung area perawatan. Saya kirim daftar lengkapnya, dan kalau mau, saya bantu jadwalkan konsultasi.',
    'sim.e4.user': 'Kulit saya iritasi setelah perawatan kemarin.',
    'sim.e4.action1': 'Kenali komplain',
    'sim.e4.action2': 'Serahkan ke staf',
    'sim.e4.staffCard':
      'Pelanggan melaporkan iritasi setelah perawatan kemarin. Agent tidak memberi saran medis.',
    'sim.e4.agent':
      'Terima kasih sudah mengabari, Kak. Saya teruskan ke tim kami sekarang, mereka akan menghubungi Kakak.',
    'sim.e5.action1': 'Kirim pengingat janji besok',
    'sim.e5.result': '6 pengingat terkirim',
    'sim.e6.user': 'Besok jam 4 bisa facial?',
    'sim.e6.action1': 'Cek kalender',
    'sim.e6.action2': 'Buat booking',
    'sim.e6.agent': 'Bisa, Kak. Besok pukul 16.00 sudah kami catat.',
    'sim.e6.note': 'Di luar jam kerja, terjawab dalam hitungan detik.',
  },
  en: {
    'nav.brandAria': 'CHESTAADOTCOM Home',
    'nav.freeConsultation': 'Free 30-min audit',
    'nav.freeConsultationWa': 'Start with a free 30-minute audit via WhatsApp',
    'nav.openMenu': 'Open menu',
    'nav.closeMenu': 'Close menu',
    'nav.menuDialogLabel': 'Main navigation menu',
    'nav.servicesGroup': 'Services',
    'nav.exploreGroup': 'Explore',
    'nav.activePage': 'Active page',
    'nav.areasLine':
      'Serving South Tangerang, BSD City, Pamulang, Jurang Mangu, and Lebak Bulus',
    'nav.areasLineShort': 'South Tangerang · BSD City · Pamulang · Jurang Mangu · Lebak Bulus',
    'nav.langSwitchLabel': 'Switch page language',
    'nav.projects': 'Internal Projects',
    'nav.caseStudies': 'Internal Case Studies',
    'nav.blog': 'Blog',
    'nav.areas': 'Service Areas',
    'nav.howItWorks': 'How It Works',
    'nav.pricing': 'Pricing',
    'nav.faq': 'FAQ',
    'service.web.title': 'Website and Landing Page Development',
    'service.web.desc': 'Static, lightweight, fast on mobile, starting from IDR 1,200,000.',
    'service.ai.title': 'AI Agents for Business',
    'service.ai.desc': 'Reply to WhatsApp chats, check schedules, and update systems 24/7.',
    'service.software.title': 'Custom Software Development',
    'service.software.desc': 'Internal web apps, client portals, and dashboards built for your SOP.',
    'service.workflow.title': 'Business Workflow Automation',
    'service.workflow.desc': 'Connect forms, Sheets, calendars, and WhatsApp with zero manual copy-paste.',
    'footer.brandDesc':
      'Custom software and AI agent engineering partner based in BSD, South Tangerang, serving businesses across South Tangerang and Greater Jakarta. Co-founded by Chesta Azka (architecture, product, technology) and Zeeshan (operations, client success).',
    'footer.mainServices': 'Core Services',
    'footer.guidesAndBlog': 'Business & Technical Guides',
    'footer.webByArea': 'Website Development by Area',
    'footer.aiByArea': 'AI Agent Services by Area',
    'footer.baseAndCoverage': 'Base & Service Coverage',
    'footer.baseAndCoverageDesc':
      'Based in BSD, South Tangerang · Serving South Tangerang, BSD City, Pamulang, Jurang Mangu, Lebak Bulus & Greater Jakarta',
    'footer.coFounderWa': 'Co-Founder WhatsApp',
    'footer.coFounderWaHours': '+62 821-2544-7232 (Free 30-minute audit)',
    'footer.emailAndIndex': 'Email & Sitemaps',
    'footer.aboutUs': 'About Us',
    'cta.defaultEyebrow': 'FREE 30-MINUTE AUDIT',
    'cta.defaultButton': 'Chat via WhatsApp',
    'cta.defaultWaMessage':
      'Hi Chesta & Zeeshan, I would like to start with a free 30-minute audit for my business.',
    'cta.footerSubline':
      'Based in BSD, South Tangerang · Serving South Tangerang and Greater Jakarta',
    'breadcrumb.home': 'Home',
    'breadcrumb.services': 'Services',
    'breadcrumb.areas': 'Areas',
    'sim.eyebrow': 'AGENT EXECUTION SIMULATION',
    'sim.chip': 'Simulation',
    'sim.title': 'One working day of a clinic agent, on one screen',
    'sim.sub':
      'This is a simulation to show the workflow: incoming messages, agent actions, and when the agent hands off to human staff. Numbers are illustrative, not client results.',
    'sim.legend.user': 'Customer message',
    'sim.legend.agent': 'Agent action',
    'sim.legend.handoff': 'Handed off to staff',
    'sim.button.replay': 'Replay simulation',
    'sim.console.header': 'Clinic WhatsApp · sample',
    'sim.console.status': 'Agent active',
    'sim.col.chat': 'Conversation',
    'sim.col.actions': 'Agent actions',
    'sim.summary.title': 'Sample one-day summary',
    'sim.metric.messages': 'Messages processed',
    'sim.metric.bookings': 'Bookings created',
    'sim.metric.handoffs': 'Handed off to staff',
    'sim.metric.reminders': 'Reminders sent',
    'sim.footer.note': 'Illustrative simulation. Not client data.',
    'sim.aria.section': 'Simulation of one working day of a clinic agent',
    'sim.status.completed': 'Completed',
    'sim.status.handedOff': 'Handed off',
    'sim.e1.user': 'Hi, is there any slot for facial this Saturday?',
    'sim.e1.action1': 'Check therapist calendar',
    'sim.e1.agent': 'We have two slots this Saturday: 10:00 AM and 2:00 PM. Which one would you prefer?',
    'sim.e2.user': '2:00 PM, please.',
    'sim.e2.action1': 'Create booking',
    'sim.e2.action2': 'Send confirmation',
    'sim.e2.action3': 'Record in CRM',
    'sim.e2.agent': 'All set! We have recorded Saturday at 2:00 PM. See you then!',
    'sim.e3.user': 'How much does botox cost?',
    'sim.e3.action1': 'Retrieve price list',
    'sim.e3.agent':
      'The price depends on the treatment area. I have sent the full price list, and if you would like, I can help schedule a consultation.',
    'sim.e4.user': 'My skin feels irritated after yesterday’s treatment.',
    'sim.e4.action1': 'Detect complaint',
    'sim.e4.action2': 'Escalate to staff',
    'sim.e4.staffCard':
      'Customer reports irritation after yesterday’s treatment. Agent did not provide medical advice.',
    'sim.e4.agent':
      'Thank you for letting us know. I am escalating this to our clinical team right now, and they will contact you shortly.',
    'sim.e5.action1': 'Send tomorrow appointment reminders',
    'sim.e5.result': '6 reminders sent',
    'sim.e6.user': 'Can I book a facial tomorrow at 4 PM?',
    'sim.e6.action1': 'Check calendar',
    'sim.e6.action2': 'Create booking',
    'sim.e6.agent': 'Yes, of course. Tomorrow at 4:00 PM has been scheduled.',
    'sim.e6.note': 'Outside business hours, answered in seconds.',
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
