/**
 * ============================================================================
 * BILINGUAL (ID | EN) CONTENT & SEO RESOLVER — CHESTAADOTCOM
 * ============================================================================
 * Resolves localized services, service-area pages, problem selectors, and
 * core route SEO directly from the single sources of truth:
 * - src/data/services.ts
 * - src/data/service-areas.ts (backed by src/data/areas.ts & src/data/areas.en.ts)
 */

import {
  ServiceItem,
  ProblemSelectorOption,
  ServiceCaseStudyBlueprint,
  PROBLEM_SELECTOR_OPTIONS,
  SERVICE_CASE_STUDIES,
  getServiceBySlug,
} from '../data/services';
import {
  ServiceAreaPageData,
  getServiceAreaPage,
} from '../data/service-areas';
import { LocaleCode, parseLocalizedPath } from './i18n';

export const ENGLISH_ROUTES_SEO: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Website, AI Agent, and Custom Software in Tangsel | CHESTAADOTCOM',
    description:
      'Custom website development, WhatsApp AI agents, and custom software in BSD, South Tangerang & Jabodetabek. Fast performance, clear pricing from IDR 1,200,000.',
  },
  '/portfolio': {
    title: 'Internal Projects & Software Demos | CHESTAADOTCOM',
    description:
      'Internal projects built by CHESTAADOTCOM: WhatsApp AI agents, cafe dashboards, property lead bots, and fast landing pages in BSD, South Tangerang.',
  },
  '/case-studies': {
    title: 'Internal Project Case Studies & Architecture | CHESTAADOTCOM',
    description:
      'Read the technical breakdown behind CHESTAADOTCOM internal projects: operational bottlenecks, system architecture, workflows, and design targets.',
  },
  '/blog': {
    title: 'Business & Software Engineering Notes | CHESTAADOTCOM',
    description:
      'Practical guides by Chesta Azka and Zeeshan on custom software, WhatsApp AI agents, workflow automation, and fast websites in South Tangerang.',
  },
  '/about': {
    title: 'About CHESTAADOTCOM — Web & AI Agent Studio in South Tangerang',
    description:
      'Meet Chesta Azka and Zeeshan, co-founders of CHESTAADOTCOM. A web engineering, AI agent, and workflow automation studio based in BSD, South Tangerang.',
  },
  '/audit-gratis': {
    title: 'Free 30-Minute Business Workflow & AI Audit | CHESTAADOTCOM',
    description:
      'Tell us the repetitive work tiring your team. Get a workflow map, honest recommendation, and transparent cost estimate in a free 30-minute audit.',
  },
  '/privasi': {
    title: 'Privacy Policy & Data Protection (UU PDP) | CHESTAADOTCOM',
    description:
      'Plain-language privacy policy of CHESTAADOTCOM aligned with Indonesian Data Protection Law (UU PDP No. 27/2022). Cookieless analytics and zero data selling.',
  },
  '/workflow': {
    title: 'How We Work & 4-Step Process | CHESTAADOTCOM',
    description:
      'Our 4-step work process at CHESTAADOTCOM: 30-minute free audit, design and prototype, build and test, and release and maintain.',
  },
  '/area': {
    title: 'Service Areas in South Tangerang & Jakarta | CHESTAADOTCOM',
    description:
      'CHESTAADOTCOM serves businesses in South Tangerang, BSD City, Pamulang, Jurang Mangu, and Lebak Bulus for website development and AI agents.',
  },
};

export const INDONESIAN_ROUTES_SEO: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Jasa Software Custom & AI Agent di BSD | CHESTAADOTCOM',
    description:
      'Pengembangan software custom, AI agent, otomasi workflow, dan pembuatan website di BSD, Tangerang Selatan & Jabodetabek. Mulai Rp1.200.000.',
  },
  '/portfolio': {
    title: 'Proyek Internal & Demo Sistem | CHESTAADOTCOM',
    description:
      'Daftar proyek internal CHESTAADOTCOM: AI agent WhatsApp klinik, dashboard kafe, asisten properti, dan landing page cepat di BSD, Tangerang Selatan.',
  },
  '/case-studies': {
    title: 'Studi Kasus Proyek Internal & Arsitektur | CHESTAADOTCOM',
    description:
      'Catatan teknis di balik proyek internal CHESTAADOTCOM: masalah operasional, rancangan arsitektur, alur kerja sistem, dan target desain aplikasi.',
  },
  '/blog': {
    title: 'Catatan Bisnis & Rekayasa Software | CHESTAADOTCOM',
    description:
      'Panduan praktis dari Chesta Azka dan Zeeshan seputar software custom, AI agent WhatsApp, otomasi workflow, dan website cepat di Tangerang Selatan.',
  },
  '/about': {
    title: 'Tentang CHESTAADOTCOM — Chesta Azka & Zeeshan | BSD',
    description:
      'Kenali Chesta Azka (Arsitektur, Produk, Teknologi) dan Zeeshan (Operasional, Client Success), co-founder CHESTAADOTCOM di BSD, Tangerang Selatan.',
  },
  '/workflow': {
    title: 'Cara Kerja & Proses 4 Langkah | CHESTAADOTCOM',
    description:
      'Empat langkah kerja CHESTAADOTCOM: audit gratis 30 menit, rancang dan prototipe, bangun dan uji, serta rilis dan rawat bersama timmu.',
  },
  '/area': {
    title: 'Area Layanan Tangerang Selatan & Jakarta | CHESTAADOTCOM',
    description:
      'CHESTAADOTCOM melayani pembuatan website dan AI agent untuk bisnis di Tangerang Selatan, BSD City, Pamulang, Jurang Mangu, dan Lebak Bulus.',
  },
};

export const ENGLISH_HOME_FAQS = [
  {
    question: 'What is the difference between a standard chatbot and an AI agent?',
    answer:
      'A standard chatbot only replies with pre-written FAQ text. An AI agent understands free-form conversation, uses real tools like your calendar, spreadsheets, and database, completes tasks from start to finish (such as booking a slot or logging a lead), and reports back to your team.',
  },
  {
    question: 'How much does it cost to build an AI agent?',
    answer:
      'AI agent pricing depends on the number of connected tools and the complexity of your business rules, so we calculate the exact figure after a free 30-minute audit. For landing pages and business websites, pricing starts from IDR 1,200,000.',
  },
  {
    question: 'What happens if a customer asks something outside our SOP?',
    answer:
      'Every agent is built with strict action guardrails and human handover. Sensitive requests, complaints, or out-of-scope questions are immediately handed over to your human team with a conversation summary, and every action is recorded in an audit log.',
  },
  {
    question: 'How long does development take?',
    answer:
      'A simple landing page takes days. AI agents, workflow automation, and custom web applications usually take weeks depending on your scope; we give the exact estimate after the free audit.',
  },
  {
    question: 'Is our customer data secure?',
    answer:
      'Yes. Your data stays yours—you can store it in your own Google Sheets, database, or server, and domain and hosting are registered in your own name.',
  },
  {
    question: 'Can small businesses without existing software start with a simple setup?',
    answer:
      'Yes. Many businesses start with a single high-impact workflow—such as answering WhatsApp inquiries and logging bookings to Google Sheets—and add an internal dashboard later as operations grow.',
  },
  {
    question: 'Which areas do you serve?',
    answer:
      'We are based in BSD, South Tangerang, serving South Tangerang, BSD City, Pamulang, Jurang Mangu, Lebak Bulus, and Greater Jakarta, with online collaboration and scheduled in-person meetings in South Tangerang.',
  },
];

const ENGLISH_PROBLEM_SELECTOR_OVERRIDES: Record<string, Partial<ProblemSelectorOption>> = {
  'chat-numpuk': {
    questionChip: 'Customer questions pile up on WhatsApp',
    situationDetail:
      'Your admins spend hours answering the same opening hours, price lists, and schedule slot checks over and over.',
    recommendationNote:
      'An AI Agent reads free-form messages, checks your calendar or database, and locks reservations automatically 24/7.',
  },
  'iklan-boncos': {
    questionChip: 'Ads are running but few visitors click chat',
    situationDetail:
      'Google or Meta Ads clicks keep costing money, but your landing page opens slowly on mobile or the offer structure is unclear.',
    recommendationNote:
      'A static, lightweight landing page with a clear offer hierarchy and pre-formatted WhatsApp button.',
  },
  'rekap-manual': {
    questionChip: 'Order recaps & reports are still copy-pasted manually',
    situationDetail:
      'Order data is scattered across chats, Google Forms, and multiple spreadsheet files, causing frequent input errors and slow recaps.',
    recommendationNote:
      'Workflow automation connects your forms, Google Sheets, and WhatsApp notifications without manual re-typing.',
  },
  'spreadsheet-mentok': {
    questionChip: 'Operational spreadsheets are hitting their limits',
    situationDetail:
      'Your business has grown to multiple staff or branches, requiring role permissions, approval workflows, and a custom dashboard.',
    recommendationNote:
      'Custom software and web applications engineered around your exact internal SOPs and database structure.',
  },
};

export function getLocalizedProblemSelectorOptions(
  localeOrPathname: string = 'id'
): ProblemSelectorOption[] {
  const { locale } =
    localeOrPathname === 'en' || localeOrPathname === 'id'
      ? { locale: localeOrPathname as LocaleCode }
      : parseLocalizedPath(localeOrPathname);

  if (locale !== 'en') return PROBLEM_SELECTOR_OPTIONS;
  return PROBLEM_SELECTOR_OPTIONS.map((item) => {
    const override = ENGLISH_PROBLEM_SELECTOR_OVERRIDES[item.id];
    return override ? { ...item, ...override } : item;
  });
}

const ENGLISH_SERVICE_CASE_STUDIES_OVERRIDES: Record<string, Partial<ServiceCaseStudyBlueprint>> = {
  'wa-concierge-klinik': {
    sector: 'Internal project · Healthcare & Dental Clinic',
    title: 'WhatsApp Clinic Concierge (Internal Project)',
    problem:
      'Patients message in the evening asking about practice hours, scaling prices, and doctor slots while the clinic admin is off duty.',
    built:
      'WhatsApp AI agent that reads clinic FAQ and price documents, checks Google Calendar slots, books appointments, and hands over medical questions.',
    resultPlaceholder:
      'Design target: initial reply under 10 seconds, zero double-booking on the same slot.',
  },
  'dashboard-kafe': {
    sector: 'Internal project · Cafe & Multi-Channel F&B',
    title: 'Cafe Order & Inventory Dashboard (Internal Project)',
    problem:
      'Orders from dine-in, WhatsApp, and delivery apps are recorded separately, causing daily revenue recaps and raw stock checks to fall behind.',
    built:
      'Custom web app uniting order queues, automatic recipe stock deductions, low-stock WhatsApp alerts, and daily sales reports.',
    resultPlaceholder:
      'Design target: closing recap finished in under 5 minutes without manual re-typing.',
  },
  'lead-properti': {
    sector: 'Internal project · Property Agency',
    title: 'Property Lead Assistant (Internal Project)',
    problem:
      'Evening ad leads go cold before morning follow-up, and agents spend hours filtering casual browsers from serious buyers.',
    built:
      'AI agent + workflow that asks 4 polite qualification questions, logs leads to CRM/Sheets, and notifies the assigned agent on WhatsApp.',
    resultPlaceholder:
      'Design target: initial reply under 15 seconds and every lead logged with a complete summary.',
  },
  'pemroses-dokumen': {
    sector: 'Internal project · Professional Services',
    title: 'AI Document Processor: data extraction with human review',
    problem:
      'Admin teams manually re-type data from invoices and forms into spreadsheets, which is slow and prone to errors.',
    built:
      'A system that reads documents, extracts key columns into tables, flags low-confidence data, and requests human review before data is used.',
    resultPlaceholder:
      'Design target: low-confidence data always flagged, human approval before final table entry, and every correction logged.',
  },
};

export function getLocalizedServiceCaseStudies(
  localeOrPathname: string = 'id'
): Record<string, ServiceCaseStudyBlueprint> {
  const { locale } =
    localeOrPathname === 'en' || localeOrPathname === 'id'
      ? { locale: localeOrPathname as LocaleCode }
      : parseLocalizedPath(localeOrPathname);

  if (locale !== 'en') return SERVICE_CASE_STUDIES;
  const localized: Record<string, ServiceCaseStudyBlueprint> = {};
  for (const [key, value] of Object.entries(SERVICE_CASE_STUDIES)) {
    const override = ENGLISH_SERVICE_CASE_STUDIES_OVERRIDES[key];
    localized[key] = override ? { ...value, ...override } : value;
  }
  return localized;
}

export function getLocalizedService(service: ServiceItem, localeOrPathname: string): ServiceItem;
export function getLocalizedService(
  serviceOrSlug: ServiceItem | string | undefined,
  localeOrPathname: string
): ServiceItem | undefined;
export function getLocalizedService(
  serviceOrSlug: ServiceItem | string | undefined,
  localeOrPathname: string
): ServiceItem | undefined {
  if (!serviceOrSlug) return undefined;
  const { locale } =
    localeOrPathname === 'en' || localeOrPathname === 'id'
      ? { locale: localeOrPathname as LocaleCode }
      : parseLocalizedPath(localeOrPathname);

  const slug = typeof serviceOrSlug === 'string' ? serviceOrSlug : serviceOrSlug.slug;
  return getServiceBySlug(slug, locale);
}

export function getLocalizedServiceAreaPage(
  page: ServiceAreaPageData,
  localeOrPathname: string
): ServiceAreaPageData;
export function getLocalizedServiceAreaPage(
  serviceSlug: string,
  areaSlug: string,
  localeOrPathname: string
): ServiceAreaPageData | undefined;
export function getLocalizedServiceAreaPage(
  pageOrServiceSlug: ServiceAreaPageData | string,
  localeOrAreaSlug: string,
  maybeLocale?: string
): ServiceAreaPageData | undefined {
  let serviceSlug: string;
  let areaSlug: string;
  let localeOrPathname: string;

  if (typeof pageOrServiceSlug === 'string') {
    serviceSlug = pageOrServiceSlug;
    areaSlug = localeOrAreaSlug;
    localeOrPathname = maybeLocale || 'id';
  } else {
    serviceSlug = pageOrServiceSlug.serviceSlug;
    areaSlug = pageOrServiceSlug.areaSlug;
    localeOrPathname = localeOrAreaSlug;
  }

  const { locale } =
    localeOrPathname === 'en' || localeOrPathname === 'id'
      ? { locale: localeOrPathname as LocaleCode }
      : parseLocalizedPath(localeOrPathname);

  return getServiceAreaPage(serviceSlug, areaSlug, locale);
}
