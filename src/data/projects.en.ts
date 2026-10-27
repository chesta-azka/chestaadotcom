import type {
  PortfolioProject,
  PortfolioProjectRaw,
  ProjectCategory,
} from './projects';

export const PORTFOLIO_CATEGORIES_EN: Array<{
  id: 'semua' | ProjectCategory;
  label: string;
}> = [
  { id: 'semua', label: 'All' },
  { id: 'web', label: 'Web & Landing Page' },
  { id: 'ai-agent', label: 'AI Agent' },
  { id: 'software', label: 'Custom Software' },
  { id: 'otomasi', label: 'Workflow Automation' },
];

const RAW_PORTFOLIO_PROJECTS_EN: PortfolioProjectRaw[] = [
  // 1. wa-concierge-klinik
  {
    slug: 'wa-concierge-klinik',
    title: 'WA Concierge: WhatsApp booking agent for clinics',
    oneLiner:
      'Answers treatment questions, checks therapist slots, and creates bookings from WhatsApp conversations.',
    category: 'ai-agent',
    categoryLabel: 'AI Agent',
    services: ['ai-agent'],
    serviceSlug: 'ai-agent',
    industry: 'Clinic',
    client: 'CHESTAADOTCOM internal project',
    year: '2026',
    yearNumeric: 2026,
    internal: true,
    internalBadgeLabel: 'Internal project',
    role: 'Design, development, and testing',
    duration: 'Internal build',
    stack: ['WhatsApp Business Platform', 'Calendar Tool', 'CRM Database', 'Action Log'],
    cover: 'projectWaConciergeKlinik',
    coverKey: 'projectWaConciergeKlinik',
    alt: 'Illustration of internal project WA Concierge WhatsApp booking agent for clinics with therapist slot checking',
    deviceFrame: 'phone',
    gallery: [
      {
        imageKey: 'portfolioGalleryArchitecture',
        label: 'Illustration',
        caption:
          'Illustration: message flow from customer inquiry, therapist calendar check, and booking creation to CRM entry.',
        layout: 'full',
      },
      {
        imageKey: 'projectWaConciergeKlinik',
        label: 'Illustration',
        caption:
          'Illustration: WhatsApp conversation checking available treatment hours and confirming booking details.',
        layout: 'half',
      },
      {
        imageKey: 'portfolioGalleryMobileHandover',
        label: 'Illustration',
        caption:
          'Illustration: handover summary passed to clinic staff when a conversation requires human attention.',
        layout: 'half',
      },
    ],
    summaryParagraphs: [
      'WA Concierge is a CHESTAADOTCOM internal project built to demonstrate how an AI agent handles incoming treatment inquiries on WhatsApp, checks therapist calendar availability, creates bookings, logs patient details into a CRM, and sends day-before reminders.',
      'The system includes clear action boundaries and human handover: sensitive questions or special requests outside standard rules are forwarded to clinic staff together with a concise conversation summary, and every action is recorded in an inspectable log.',
    ],
    features: [
      {
        title: 'Intent Reading & Treatment Catalog Matching',
        description:
          'Reads everyday WhatsApp inquiries from prospective patients and matches them against treatment durations, preparation rules, and starting prices.',
        metricOrTag: 'Design target: free-text intent reading',
        highlightType: 'interface',
      },
      {
        title: 'Therapist Calendar Slot Check',
        description:
          'Checks available therapist time slots before offering schedule options in the WhatsApp chat.',
        metricOrTag: 'Design target: zero schedule overlap',
        highlightType: 'architecture',
      },
      {
        title: 'Action Boundaries & Staff Handover',
        description:
          'Follows explicit rules on what the agent may do and hands off sensitive cases to staff with a chat summary.',
        metricOrTag: 'Design target: human handover with summary',
        highlightType: 'security',
      },
      {
        title: 'Booking Confirmation & Day-Before Reminder',
        description:
          'Creates the booking, records it in the CRM, and schedules a day-before reminder message.',
        metricOrTag: 'Design target: automated H-1 reminder',
        highlightType: 'workflow',
      },
      {
        title: 'Complete Action Log',
        description:
          'Every tool call and message step is logged so clinic owners and admins can inspect what happened at any time.',
        metricOrTag: 'Design target: inspectable action log',
        highlightType: 'interface',
      },
    ],
    liveStatusLabel: 'Internal project (Design target)',
    relatedCaseSlug: 'wa-concierge-klinik',
    caseStudySlug: 'wa-concierge-klinik',
    featured: true,
    draft: false,
    updatedAt: '2026-03-20',
    seo: {
      title: 'WA Concierge Clinic Booking Agent — Internal Project | CHESTAADOTCOM',
      description:
        'CHESTAADOTCOM internal project: WhatsApp booking AI agent for clinics that answers treatment questions, checks therapist slots, and creates bookings.',
    },
  },

  // 2. dashboard-kafe
  {
    slug: 'dashboard-kafe',
    title: 'Cafe Operations Dashboard',
    oneLiner:
      'Ingredient stock, daily sales, and multi-branch reports in a single dashboard.',
    category: 'software',
    categoryLabel: 'Custom Software',
    services: ['software-custom'],
    serviceSlug: 'software-custom',
    industry: 'F&B',
    client: 'CHESTAADOTCOM internal project',
    year: '2026',
    yearNumeric: 2026,
    internal: true,
    internalBadgeLabel: 'Internal project',
    role: 'Design, development, and testing',
    duration: 'Internal build',
    stack: ['Web Application', 'Role-Based Access', 'Database', 'Reporting Dashboard'],
    cover: 'projectDashboardKafe',
    coverKey: 'projectDashboardKafe',
    alt: 'Illustration of internal project Cafe Operations Dashboard for monitoring ingredient stock and daily branch sales',
    deviceFrame: 'browser',
    gallery: [
      {
        imageKey: 'projectDashboardKafe',
        label: 'Illustration',
        caption:
          'Illustration: daily sales summary and low-stock indicators across cafe branches.',
        layout: 'full',
      },
      {
        imageKey: 'portfolioGalleryAnalytics',
        label: 'Illustration',
        caption:
          'Illustration: branch comparison view and ingredient movement log.',
        layout: 'half',
      },
      {
        imageKey: 'portfolioGalleryArchitecture',
        label: 'Illustration',
        caption:
          'Illustration: role-based access structure separating owner reports and branch staff inputs.',
        layout: 'half',
      },
    ],
    summaryParagraphs: [
      'Cafe Operations Dashboard is a CHESTAADOTCOM internal project showing how custom web software replaces heavy, error-prone spreadsheets for F&B businesses managing multiple branches.',
      'Branch staff record daily stock counts and sales from mobile or desktop screens with role-based permissions, while the owner views consolidated daily reports and low-ingredient alerts from the same data source.',
    ],
    features: [
      {
        title: 'Multi-Branch Stock & Sales View',
        description:
          'Combines ingredient stock levels and daily sales across branches into one web dashboard.',
        metricOrTag: 'Design target: single data source',
        highlightType: 'interface',
      },
      {
        title: 'Role-Based Login & Permissions',
        description:
          'Separates access rights between owners, managers, and branch staff so each user sees only their tasks.',
        metricOrTag: 'Design target: per-role access control',
        highlightType: 'security',
      },
      {
        title: 'Minimum Stock Threshold Alerts',
        description:
          'Flags raw ingredients approaching minimum levels per branch so restocking happens on time.',
        metricOrTag: 'Design target: low-stock indicators',
        highlightType: 'workflow',
      },
      {
        title: 'Responsive on Mobile & Desktop',
        description:
          'Built so kitchen and cashier staff can input stock counts from a phone while owners review reports on a laptop.',
        metricOrTag: 'Design target: mobile & desktop ready',
        highlightType: 'architecture',
      },
      {
        title: 'Input Audit Trail & Report Export',
        description:
          'Records who updated daily stock figures and provides downloadable monthly summaries.',
        metricOrTag: 'Design target: logged input history',
        highlightType: 'security',
      },
    ],
    liveStatusLabel: 'Internal project (Design target)',
    relatedCaseSlug: 'dashboard-kafe',
    caseStudySlug: 'dashboard-kafe',
    featured: true,
    draft: false,
    updatedAt: '2026-03-24',
    seo: {
      title: 'Cafe Operations Dashboard — Internal Project | CHESTAADOTCOM',
      description:
        'CHESTAADOTCOM internal project: custom web dashboard for F&B businesses combining ingredient stock, daily sales, and multi-branch reports.',
    },
  },

  // 3. lead-properti
  {
    slug: 'lead-properti',
    title: 'Property Lead Flow',
    oneLiner:
      'Leads from ad forms enter the CRM, agents are notified, and follow-ups are scheduled automatically.',
    category: 'otomasi',
    categoryLabel: 'Workflow Automation',
    services: ['otomasi-workflow'],
    serviceSlug: 'otomasi-workflow',
    industry: 'Property',
    client: 'CHESTAADOTCOM internal project',
    year: '2026',
    yearNumeric: 2026,
    internal: true,
    internalBadgeLabel: 'Internal project',
    role: 'Design, development, and testing',
    duration: 'Internal build',
    stack: ['Ad Form Webhook', 'CRM & Sheets', 'WhatsApp Notification', 'Execution Log'],
    cover: 'projectLeadProperti',
    coverKey: 'projectLeadProperti',
    alt: 'Illustration of internal project Property Lead Flow from ad forms to CRM and automated follow-up schedules',
    deviceFrame: 'browser',
    gallery: [
      {
        imageKey: 'projectLeadProperti',
        label: 'Illustration',
        caption:
          'Illustration: automated pipeline routing incoming property inquiries to CRM records and assigned agent alerts.',
        layout: 'full',
      },
      {
        imageKey: 'portfolioGalleryArchitecture',
        label: 'Illustration',
        caption:
          'Illustration: workflow diagram with error handling and failure notifications.',
        layout: 'half',
      },
      {
        imageKey: 'portfolioGalleryAnalytics',
        label: 'Illustration',
        caption:
          'Illustration: execution log tracking every form submission and notification step.',
        layout: 'half',
      },
    ],
    summaryParagraphs: [
      'Property Lead Flow is a CHESTAADOTCOM internal project built to demonstrate workflow automation connecting property inquiry forms directly to a CRM, Google Sheets, and WhatsApp notifications for sales agents.',
      'Instead of copying buyer data manually between apps, every incoming inquiry is logged, the assigned agent is notified immediately, follow-up reminders are scheduled, and any failed step triggers an alert with an inspectable execution log.',
    ],
    features: [
      {
        title: 'Direct Ad Form to CRM Entry',
        description:
          'Captures prospective buyer details and unit interest from forms and writes them directly to the CRM.',
        metricOrTag: 'Design target: 0 manual steps',
        highlightType: 'workflow',
      },
      {
        title: 'Agent Assignment & Instant Alert',
        description:
          'Assigns incoming leads to the on-duty agent in rotation and sends a WhatsApp alert with buyer summary.',
        metricOrTag: 'Design target: agent alert < 1 minute',
        highlightType: 'architecture',
      },
      {
        title: 'Automated H+1 and H+3 Follow-Up Reminders',
        description:
          'Schedules automatic reminders on Day+1 and Day+3 if the lead status in the CRM has not been updated.',
        metricOrTag: 'Design target: H+1 & H+3 follow-up schedule',
        highlightType: 'workflow',
      },
      {
        title: 'Error Handling & Failure Alerts',
        description:
          'Includes failure notifications and execution logs so any third-party tool issue is caught early.',
        metricOrTag: 'Design target: logged execution & alerts',
        highlightType: 'security',
      },
    ],
    liveStatusLabel: 'Internal project (Design target)',
    relatedCaseSlug: 'lead-properti',
    caseStudySlug: 'lead-properti',
    featured: true,
    draft: false,
    updatedAt: '2026-03-20',
    seo: {
      title: 'Property Lead Flow Automation — Internal Project | CHESTAADOTCOM',
      description:
        'CHESTAADOTCOM internal project: workflow automation routing property ad form leads into CRM, notifying agents, and scheduling follow-ups.',
    },
  },

  // 4. landing-klinik-estetika
  {
    slug: 'landing-klinik-estetika',
    title: 'Aesthetic Clinic Landing Page',
    oneLiner:
      'Dedicated page per treatment with starting prices, practice hours, and booking via WhatsApp.',
    category: 'web',
    categoryLabel: 'Web & Landing Page',
    services: ['pembuatan-website'],
    serviceSlug: 'pembuatan-website',
    industry: 'Clinic',
    client: 'CHESTAADOTCOM internal project',
    year: '2026',
    yearNumeric: 2026,
    internal: true,
    internalBadgeLabel: 'Internal project',
    role: 'Design, development, and testing',
    duration: 'Internal build',
    stack: ['Static HTML/CSS', 'Image Optimization', 'Structured Data', 'WhatsApp CTA'],
    cover: 'projectLandingKlinikEstetika',
    coverKey: 'projectLandingKlinikEstetika',
    alt: 'Illustration of internal project Aesthetic Clinic Landing Page with treatment list, starting prices, and WhatsApp button',
    deviceFrame: 'browser',
    gallery: [
      {
        imageKey: 'projectLandingKlinikEstetika',
        label: 'Illustration',
        caption:
          'Illustration: treatment page layout showing starting prices, schedule, and direct WhatsApp booking button.',
        layout: 'full',
      },
      {
        imageKey: 'portfolioGalleryMobileHandover',
        label: 'Illustration',
        caption:
          'Illustration: responsive mobile layout designed for fast loading on phones.',
        layout: 'half',
      },
      {
        imageKey: 'portfolioGalleryAnalytics',
        label: 'Illustration',
        caption:
          'Illustration: basic visitor source tracking and structured heading hierarchy.',
        layout: 'half',
      },
    ],
    summaryParagraphs: [
      'Aesthetic Clinic Landing Page is a CHESTAADOTCOM internal project demonstrating a fast, mobile-friendly landing page structure for clinics running ads or local search campaigns.',
      'Each treatment page answers common prospective patient questions upfront—what the treatment is, starting prices, practice hours, and location—paired with a direct WhatsApp booking button so visitors can book without extra steps.',
    ],
    features: [
      {
        title: 'Dedicated Page per Treatment',
        description:
          'Presents clear treatment details, starting price notes, and practice hours so visitors understand the offer immediately.',
        metricOrTag: 'Design target: clear single goal per page',
        highlightType: 'interface',
      },
      {
        title: 'Fast Mobile Loading & Image Compression',
        description:
          'Static pages with properly sized images and minimal scripts tested on phones and PageSpeed Insights.',
        metricOrTag: 'Design target: PageSpeed tested on mobile',
        highlightType: 'architecture',
      },
      {
        title: 'Foundational SEO & Structured Data',
        description:
          'Includes page titles, meta descriptions, heading structure, sitemap, and structured data.',
        metricOrTag: 'Design target: clean SEO foundation',
        highlightType: 'interface',
      },
      {
        title: 'Pre-Filled WhatsApp Booking Buttons',
        description:
          'Attaches a context-specific opening message to each WhatsApp CTA based on the treatment page viewed.',
        metricOrTag: 'Design target: direct WhatsApp booking',
        highlightType: 'workflow',
      },
    ],
    liveStatusLabel: 'Internal project (Design target)',
    relatedCaseSlug: 'wa-concierge-klinik',
    caseStudySlug: 'wa-concierge-klinik',
    featured: true,
    draft: false,
    updatedAt: '2026-03-20',
    seo: {
      title: 'Aesthetic Clinic Landing Page — Internal Project | CHESTAADOTCOM',
      description:
        'CHESTAADOTCOM internal project: fast clinic landing page per treatment with starting prices, practice schedule, and WhatsApp booking.',
    },
  },

  // 5. chestaa-v2
  {
    slug: 'chestaa-v2',
    title: 'Rebuilding chestaa.com',
    oneLiner:
      'A fast, static bilingual site rebuilt with a focus on custom software and AI agents.',
    category: 'web',
    categoryLabel: 'Web & Landing Page',
    services: ['pembuatan-website'],
    serviceSlug: 'pembuatan-website',
    industry: 'Agency (own site)',
    client: 'CHESTAADOTCOM internal project',
    year: '2026',
    yearNumeric: 2026,
    internal: true,
    internalBadgeLabel: 'Internal project',
    role: 'Design, development, and testing',
    duration: 'Internal build',
    stack: ['Bilingual Static Architecture', 'JSON-LD @graph', 'Sitemap & llms.txt', 'Core Web Vitals'],
    cover: 'projectChestaaV2',
    coverKey: 'projectChestaaV2',
    alt: 'Illustration of internal project rebuilding the fast static bilingual chestaa.com website',
    deviceFrame: 'browser',
    gallery: [
      {
        imageKey: 'projectChestaaV2',
        label: 'Illustration',
        caption:
          'Illustration: bilingual /id and /en architecture with answer-first summaries and restrained purple-on-white typography.',
        layout: 'full',
      },
      {
        imageKey: 'portfolioGalleryArchitecture',
        label: 'Illustration',
        caption:
          'Illustration: unified Schema.org @graph JSON-LD, reciprocal hreflang, and dynamic llms.txt generation.',
        layout: 'half',
      },
      {
        imageKey: 'portfolioGalleryMobileHandover',
        label: 'Illustration',
        caption:
          'Illustration: mobile layout and accessible keyboard-navigable tabs and FAQ accordions.',
        layout: 'half',
      },
    ],
    summaryParagraphs: [
      'Rebuilding chestaa.com is our own internal website project at CHESTAADOTCOM, engineered as a fast, static bilingual (/id and /en) site focused on website development, AI agents, custom software, and workflow automation.',
      'Every service and local area page leads with a direct 40–60 word summary, complete structured data (@graph JSON-LD), reciprocal hreflang links, and restrained motion that respects reduced-motion and low-spec devices.',
    ],
    features: [
      {
        title: 'Bilingual /id and /en Architecture',
        description:
          '1:1 Indonesian and English pages with reciprocal hreflang tags, localized slugs, and clean sitemap generation.',
        metricOrTag: 'Design target: 1:1 /id & /en parity',
        highlightType: 'architecture',
      },
      {
        title: 'Answer-First Structure & Unified JSON-LD',
        description:
          'Every service and area page starts with a concise summary and outputs a connected Schema.org @graph.',
        metricOrTag: 'Design target: valid @graph & llms.txt',
        highlightType: 'interface',
      },
      {
        title: 'Minimal Scripts & High Mobile Speed',
        description:
          'Content is visible without JavaScript, images are optimized, and interactive tabs and FAQs stay lightweight.',
        metricOrTag: 'Design target: LCP < 1.8s, CLS < 0.02',
        highlightType: 'workflow',
      },
      {
        title: 'Calm & Device-Aware Motion System',
        description:
          'Animations are limited to lightweight properties, honor reduced-motion preferences, and adapt to device capability.',
        metricOrTag: 'Design target: calm, measured motion',
        highlightType: 'security',
      },
    ],
    liveUrl: 'https://chestaa.com/id',
    liveStatusLabel: 'Internal project (Live on chestaa.com)',
    relatedCaseSlug: 'chestaa-v2',
    caseStudySlug: 'chestaa-v2',
    featured: false,
    draft: false,
    updatedAt: '2026-03-20',
    seo: {
      title: 'Rebuilding chestaa.com — Internal Project | CHESTAADOTCOM',
      description:
        'CHESTAADOTCOM internal project: rebuilding chestaa.com as a fast, static bilingual website focused on custom software and AI agents.',
    },
  },

  // 6. pemroses-dokumen
  {
    slug: 'pemroses-dokumen',
    title: 'AI Document Processor',
    oneLiner:
      'Extracts data from documents into tables, with human review before the data is used.',
    category: 'ai-agent',
    categoryLabel: 'AI Agent & Custom Software',
    services: ['ai-agent', 'software-custom'],
    serviceSlug: 'ai-agent',
    industry: 'Professional services',
    client: 'CHESTAADOTCOM internal project',
    year: '2026',
    yearNumeric: 2026,
    internal: true,
    internalBadgeLabel: 'Internal project',
    role: 'Design, development, and testing',
    duration: 'Internal build',
    stack: ['AI Document Extraction', 'Human Review Table', 'Role Access', 'Audit Log'],
    cover: 'projectPemrosesDokumen',
    coverKey: 'projectPemrosesDokumen',
    alt: 'Illustration of internal project AI Document Processor extracting document data into tables with human review',
    deviceFrame: 'browser',
    gallery: [
      {
        imageKey: 'projectPemrosesDokumen',
        label: 'Illustration',
        caption:
          'Illustration: document upload, field extraction into structured rows, and side-by-side human review screen.',
        layout: 'full',
      },
      {
        imageKey: 'portfolioGalleryAnalytics',
        label: 'Illustration',
        caption:
          'Illustration: review queue highlighting fields that require staff confirmation before export.',
        layout: 'half',
      },
      {
        imageKey: 'portfolioGalleryArchitecture',
        label: 'Illustration',
        caption:
          'Illustration: pipeline separating AI extraction from final database commit until approved by a human.',
        layout: 'half',
      },
    ],
    summaryParagraphs: [
      'AI Document Processor is a CHESTAADOTCOM internal project combining an AI extraction pipeline with a custom web review table for professional service teams that process incoming invoices, forms, or supporting documents.',
      'Instead of writing extracted fields straight into production records, the system places extracted values into a staging table where a staff member reviews, edits if needed, and approves the row before the data is used.',
    ],
    features: [
      {
        title: 'Structured Field Extraction to Tables',
        description:
          'Reads uploaded documents and maps key fields (names, dates, line items, totals) into structured table rows.',
        metricOrTag: 'Design target: structured table output',
        highlightType: 'architecture',
      },
      {
        title: 'Mandatory Human Review Before Use',
        description:
          'Staff inspect extracted rows side-by-side with the source document and approve before data enters the main system.',
        metricOrTag: 'Design target: human approval gate',
        highlightType: 'security',
      },
      {
        title: 'Uncertain Field Highlighting',
        description:
          'Flags low-clarity fields so reviewers can focus immediately on items that need verification.',
        metricOrTag: 'Design target: uncertain field markers',
        highlightType: 'workflow',
      },
      {
        title: 'Revision & Approval Log',
        description:
          'Records who reviewed, edited, and approved each document row for clear internal accountability.',
        metricOrTag: 'Design target: full approval trace',
        highlightType: 'interface',
      },
    ],
    liveStatusLabel: 'Internal project (Design target)',
    relatedCaseSlug: 'pemroses-dokumen',
    caseStudySlug: 'pemroses-dokumen',
    featured: true,
    draft: false,
    updatedAt: '2026-03-24',
    seo: {
      title: 'AI Document Processor — Internal Project | CHESTAADOTCOM',
      description:
        'CHESTAADOTCOM internal project: AI document processor and custom web interface that extracts document data into tables with human review.',
    },
  },
];

export const PORTFOLIO_PROJECTS_EN: PortfolioProject[] =
  RAW_PORTFOLIO_PROJECTS_EN.map((raw) => ({
    ...raw,
    relatedCaseSlug: raw.relatedCaseSlug || raw.caseStudySlug,
    caseStudySlug: raw.caseStudySlug || raw.relatedCaseSlug,
    targetNote:
      raw.features[0]?.metricOrTag || `Design target: ${raw.oneLiner}`,
    outcomesLabel: 'Design target',
    outcomes: raw.features.map((f) => `${f.title}: ${f.description}`),
    problem: raw.summaryParagraphs[0],
    solution: raw.summaryParagraphs[1],
    howItWorks: raw.features.map((f) => `${f.title} — ${f.description}`),
  }));
