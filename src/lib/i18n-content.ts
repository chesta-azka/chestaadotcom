/**
 * Complete English content & SEO translations for Services, Location Service Pages,
 * and Core Pages when accessed via /eng/... routes.
 */

import {
  ServiceItem,
  ServiceSlug,
  ProblemSelectorOption,
  ServiceCaseStudyBlueprint,
  PROBLEM_SELECTOR_OPTIONS,
  SERVICE_CASE_STUDIES,
  getServiceBySlug,
} from '../data/services';
import { ServiceAreaPageData, getServiceAreaPage } from '../data/service-areas';
import { getBlogPostBySlug, getBlogAlternateSlugs } from '../data/blog-posts';
import { LocaleCode, parseLocalizedPath } from './i18n';

export const ENGLISH_ROUTES_SEO: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Custom Software & AI Agents for Business in BSD & South Tangerang | CHESTAADOTCOM',
    description:
      'Custom software engineering and AI agent partner (WhatsApp/CRM, booking, workflow automation) for businesses in BSD City, South Tangerang & Greater Jakarta. Websites from IDR 1,200,000.',
  },
  '/portfolio': {
    title: 'Projects We Have Built — Custom Software & AI Agent Portfolio | CHESTAADOTCOM',
    description:
      'Visual showcase of fast landing pages, WhatsApp AI agents, custom web apps, and workflow automation built for businesses in BSD City, South Tangerang, and Greater Jakarta.',
  },
  '/case-studies': {
    title: 'Behind the Projects — Software & AI Agent Case Studies | CHESTAADOTCOM',
    description:
      'Read the engineering breakdown behind CHESTAADOTCOM projects: operational bottlenecks, architectural trade-offs, and real-world business outcomes.',
  },
  '/blog': {
    title: 'Engineering & Business Notes — Software, AI Agents & Web Blog | CHESTAADOTCOM',
    description:
      'Practical guides by Chesta Azka & Zeeshan on custom software, WhatsApp AI agents, workflow automation, and high-converting websites in BSD & Greater Jakarta.',
  },
  '/about': {
    title: 'About CHESTAADOTCOM — Chesta Azka & Zeeshan | BSD South Tangerang',
    description:
      'Meet Chesta Azka (Architecture, Product, Technology) and Zeeshan (Operations, Client Success), co-founders of CHESTAADOTCOM serving BSD & Greater Jakarta.',
  },
  '/workflow': {
    title: 'How We Work & Engineering Process | CHESTAADOTCOM',
    description:
      'Our 4-step engineering workflow at CHESTAADOTCOM: 30-minute free audit, design & prototype, build & test, and production launch with 30-day warranty.',
  },
};

export const ENGLISH_HOME_FAQS = [
  {
    question: 'What is the difference between a standard chatbot and an AI agent?',
    answer:
      'A standard rule-based chatbot only replies with pre-written FAQ text. An AI agent understands free-form conversation, uses real tools like your calendar, spreadsheets, and database, completes tasks from start to finish (such as locking a booking slot or logging a CRM lead), and reports back to your team.',
  },
  {
    question: 'How much does it cost to build an AI agent?',
    answer:
      'AI agent pricing depends on the number of connected tools and the complexity of your business rules, so we calculate an exact fixed quote after a free 30-minute workflow audit. For high-speed landing pages and business websites, pricing starts from IDR 1,200,000.',
  },
  {
    question: 'What happens if a customer asks something outside our SOP?',
    answer:
      'Every agent is built with strict action guardrails and automatic human handover. Sensitive requests, complaints, or out-of-scope questions are immediately escalated to your human staff with a full conversation summary, and every tool call is recorded in an audit log.',
  },
  {
    question: 'How long does development take?',
    answer:
      'A standard landing page takes 3–7 business days. AI agents, workflow automation, and custom web applications typically take 2–4 weeks depending on your integration scope.',
  },
  {
    question: 'Is our customer data secure?',
    answer:
      'Yes. You retain full ownership of your database and infrastructure—whether deployed on your own cloud account or private database. We never sell or lock your customer records.',
  },
  {
    question: 'Can small businesses without existing software start with a simple setup?',
    answer:
      'Absolutely. Many clients start with a single high-impact workflow—such as answering WhatsApp inquiries and logging bookings to Google Sheets—and add an internal dashboard later as operations grow.',
  },
  {
    question: 'Which areas do you serve?',
    answer:
      'Our operational base is in BSD, South Tangerang, serving BSD City, Alam Sutera, Bintaro, Gading Serpong, South Tangerang, and Greater Jakarta, with remote delivery available across Indonesia.',
  },
];

const ENGLISH_PROBLEM_SELECTOR_OVERRIDES: Record<string, Partial<ProblemSelectorOption>> = {
  'chat-numpuk': {
    questionChip: 'Customer questions pile up on WhatsApp',
    situationDetail:
      'Your admins spend hours answering the same opening hours, price lists, and schedule slot checks over and over.',
    recommendationNote:
      'An AI Agent reads free-form messages, checks your calendar/database, and locks reservations automatically 24/7.',
  },
  'iklan-boncos': {
    questionChip: 'Ads are running but few visitors click chat',
    situationDetail:
      'Google or Meta Ads clicks keep costing money, but your landing page loads slowly on mobile or the offer structure is confusing.',
    recommendationNote:
      'A landing page that loads in under 1.2 seconds with a sharp offer hierarchy and pre-formatted WhatsApp CTA.',
  },
  'rekap-manual': {
    questionChip: 'Order recaps & reports are still copy-pasted manually',
    situationDetail:
      'Order data is scattered across chats, Google Forms, and multiple Excel files, causing frequent input errors and slow recaps.',
    recommendationNote:
      'Workflow automation connects your forms, Google Sheets, and WhatsApp notifications without manual re-typing.',
  },
  'spreadsheet-mentok': {
    questionChip: 'Operational spreadsheets are hitting their limits',
    situationDetail:
      'Your business has grown to multiple staff or branches, requiring role permissions, approval workflows, and a custom dashboard.',
    recommendationNote:
      'Custom software & web applications engineered around your exact internal SOPs and database structure.',
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
  'klinik-triage-bsd': {
    sector: 'Aesthetic & Dental Clinic · BSD City',
    title: 'Reservation Landing Page & WhatsApp Patient Triage AI Agent',
    problem:
      'Admins were overwhelmed replying to peak-hour chats taking over 45 minutes, and doctor schedules frequently double-booked.',
    built:
      '1.1-second reservation landing page + WhatsApp Cloud API agent for doctor slot checks and Google Calendar sync.',
    resultPlaceholder:
      'Response time dropped to <20 seconds & 0 double-bookings',
  },
  'fnb-preorder-serpong': {
    sector: 'Restaurant, Cafe & Catering · Gading Serpong',
    title: 'Digital Menu Catalog, Table Reservation & Catering Pre-Order',
    problem:
      'Customers hesitated to download a 15MB PDF menu and corporate event orders got lost in cashier chats.',
    built:
      'Lightweight interactive web menu catalog + automated catering pre-order form routed to sales WhatsApp and kitchen recaps.',
    resultPlaceholder:
      'Monthly catering orders logged with zero manual input errors',
  },
  'properti-arsitektur-bintaro': {
    sector: 'Architecture & Property Studio · Bintaro & Alam Sutera',
    title: 'Corporate Portfolio Website & Project Lead Qualification',
    problem:
      'Many incoming inquiries asked for projects outside budget or location scope, consuming senior architects’ time.',
    built:
      'High-speed portfolio website + initial budget estimator and qualification flow synced to CRM database.',
    resultPlaceholder:
      'High percentage of qualified prospects entering meeting calendar',
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

const ENGLISH_SERVICES_OVERRIDES: Record<ServiceSlug, Partial<ServiceItem>> = {
  'pembuatan-website': {
    title: 'Website & Landing Page Development',
    shortTitle: 'Website & Landing Page',
    tagline: 'HIGH-SPEED WEBSITES & LANDING PAGES',
    shortPromise:
      'Loads in under 1.2 seconds, presents a clear offer structure, and turns ad clicks into qualified WhatsApp conversations.',
    summary:
      'We design and hand-code conversion-focused landing pages and company websites from scratch without bloated templates that slow down mobile screens. Built so visitors grasp your value proposition within 5 seconds and contact your team effortlessly.',
    timeline: '3–7 business days',
    bestForSummary: 'Google/Meta Ads campaigns, new service launches, and credible B2B company profiles',
    forWho: [
      'You are running Google Ads, Instagram, or TikTok Ads, but the percentage of visitors clicking your WhatsApp button remains low.',
      'Your current website takes more than 4 seconds to load on mobile data, causing prospects to bounce before reading your offer.',
      'Corporate prospects or patients ask for your company profile and service catalog, but you only have an Instagram bio link or a heavy PDF.',
      'You want your business in BSD, Alam Sutera, Bintaro, or Gading Serpong to rank cleanly on Google Search and AI answer engines.',
    ],
    deliverables: [
      {
        title: 'Clean Mobile-First Interface Design',
        description:
          'Layouts engineered for readability across 360px–430px mobile viewports and wide desktop monitors, with clear call-to-action hierarchy.',
      },
      {
        title: 'Concrete Conversion Copywriting',
        description:
          'We structure your headline, value proposition, service tiers, and buyer FAQs to directly answer prospect objections.',
      },
      {
        title: 'Sub-Second Load Speed (Green Core Web Vitals)',
        description:
          'AVIF/WebP image optimization, local font preloading, and lean code targeting 90+ mobile Lighthouse performance scores.',
      },
      {
        title: 'Formatted WhatsApp CTA & Ad Pixel Tracking',
        description:
          'Pre-filled WhatsApp openers per service, complete with Meta Pixel, TikTok Pixel, and Google Analytics 4 (GA4) event tracking.',
      },
      {
        title: 'Technical SEO, GEO & AEO Foundation',
        description:
          'Complete Schema.org JSON-LD (@graph with LocalBusiness, Service, FAQPage), OpenGraph cards, and semantic HTML headings.',
      },
      {
        title: '100% Source Code & Domain Ownership',
        description:
          'All source code, hosting configurations, and domain credentials are handed over 100% under your ownership with zero lock-in.',
      },
    ],
    process: [
      {
        num: '01',
        duration: 'Day 1',
        title: 'Offer & buyer intent discovery',
        description:
          'We map your core service offering, ideal customer profile, and the most frequent pre-purchase questions.',
      },
      {
        num: '02',
        duration: 'Days 2–3',
        title: 'Copywriting & wireframe architecture',
        description:
          'We draft the narrative flow from hero headline, proof blocks, and pricing notes down to the FAQ accordion for your review.',
      },
      {
        num: '03',
        duration: 'Days 4–6',
        title: 'Frontend engineering & speed optimization',
        description:
          'Your pages are coded in React/Tailwind, tested across mobile devices, and wired with conversion tracking.',
      },
      {
        num: '04',
        duration: 'Day 7',
        title: 'Custom domain launch & search indexing',
        description:
          'Deployed live on your domain with SSL, submitted to Google Search Console & IndexNow, backed by a 30-day warranty.',
      },
    ],
    useCases: [
      {
        industryId: 'klinik',
        industryLabel: 'Clinics',
        scenarioTitle: 'Specialist Clinic Landing Page & Treatment Catalog',
        workflowLines: [
          'Prospective patients search for a treatment on Google or click an Instagram ad, opening a page that loads in under 1 second.',
          'Patients read transparent procedure explanations, doctor profiles, and base price ranges without downloading heavy PDFs.',
          'Tapping the WhatsApp button opens a pre-formatted booking message specifying the chosen treatment and preferred day.',
        ],
        outcome:
          'Sample outcome: Higher ad-to-WhatsApp conversion and fewer repetitive basic inquiries for receptionists.',
      },
      {
        industryId: 'fnb',
        industryLabel: 'F&B',
        scenarioTitle: 'Catering, Hampers & Event Package Digital Catalog',
        workflowLines: [
          'Corporate and retail buyers open your catalog link from Instagram Bio or Google Maps.',
          'Visitors filter packages by portion count or dietary needs and see clear delivery terms.',
          'The order button sends the selected package summary directly to your admin WhatsApp.',
        ],
        outcome:
          'Sample outcome: Buyers choose packages faster without waiting for admins to send heavy PDF files.',
      },
      {
        industryId: 'properti',
        industryLabel: 'Property',
        scenarioTitle: 'Residential Cluster & Interior Studio Marketing Page',
        workflowLines: [
          'Ad visitors immediately see unit layouts, specification highlights, and location access times.',
          'High-resolution WebP photo galleries load smoothly on mobile data without layout shift.',
          'The site-visit scheduling form routes qualified buyer profiles straight to your sales executive on WhatsApp.',
        ],
        outcome:
          'Sample outcome: Lower cost per qualified lead from Meta and Google Search ad campaigns.',
      },
      {
        industryId: 'jasa',
        industryLabel: 'Professional Services',
        scenarioTitle: 'B2B Company Profile & Technical Service Portal',
        workflowLines: [
          'Corporate procurement teams review your service scope, past project portfolio, and compliance credentials.',
          'Clear 4-step workflow and FAQ sections answer vendor evaluation questions upfront.',
          'Procurement officers click the quotation request CTA to start a structured WhatsApp or email discussion.',
        ],
        outcome:
          'Sample outcome: Stronger institutional credibility when competing for corporate B2B contracts.',
      },
    ],
    pricingNote: {
      label: 'Starting from IDR 1,200,000',
      startingPriceNumeric: 1200000,
      reason:
        'Single-page conversion landing pages start from IDR 1,200,000. Multi-page company websites or interactive catalogs are quoted transparently upfront based on page count and scope.',
      scopeNote: 'Includes copywriting structure, mobile speed optimization, ad pixel setup, and a 30-day warranty.',
    },
    faq: [
      {
        question: 'What is included in the IDR 1,200,000 starting price?',
        answer:
          'It includes custom mobile-first design, conversion copywriting, mobile speed optimization, formatted WhatsApp CTA links, technical SEO & JSON-LD setup, and deployment to your domain.',
      },
      {
        question: 'Do you use bloated WordPress templates or custom code?',
        answer:
          'We build with modern custom code (React & Tailwind CSS) free of heavy WordPress plugin stacks. Your site loads significantly faster on mobile and stays secure.',
      },
      {
        question: 'What if I do not have polished copywriting or photos yet?',
        answer:
          'No problem. During our kickoff call, we interview you briefly about your services and target buyers, then draft the full conversion copywriting and layout structure for your approval.',
      },
      {
        question: 'How long until the website is ready for ad campaigns?',
        answer:
          'A standard landing page takes 3–7 business days once we align on your core service details and contact flow.',
      },
      {
        question: 'Do I get full ownership of the source code and domain?',
        answer:
          'Yes, 100%. Upon completion, all source code and domain/hosting access belong entirely to your business.',
      },
    ],
    seo: {
      title: 'Fast Website & Landing Page Development in BSD | From IDR 1,200,000 | CHESTAADOTCOM',
      description:
        'High-converting landing page and fast business website development (<1.2s load) in BSD City, South Tangerang & Greater Jakarta. Transparent pricing from IDR 1,200,000.',
    },
  },
  'ai-agent': {
    title: 'AI Agent for WhatsApp & CRM',
    shortTitle: 'AI Agent (WA & CRM)',
    tagline: 'AI AGENTS & CONVERSATIONAL AUTOMATION',
    shortPromise:
      'Replies to chats, checks calendar availability, books appointments, and updates your team automatically 24/7.',
    summary:
      'Not a rigid menu bot that forces customers to press 1–5. This AI agent understands natural everyday inquiries, calls real tools like your calendar and database, completes bookings from start to finish, or hands over complex cases to your human staff with a clean summary.',
    timeline: '2–4 weeks',
    bestForSummary: 'Clinics, F&B, property teams, and service businesses handling hundreds of weekly chats',
    forWho: [
      'Your WhatsApp admin gets overwhelmed during peak hours or evenings, causing warm leads to move to faster competitors.',
      'Receptionists spend hours cross-checking doctor, therapist, or room calendars every time someone asks for available slots.',
      'You tried a basic auto-reply bot before, and customers got frustrated by robotic menus.',
      'Qualified prospects go cold after asking for prices because staff are too busy to send timely follow-ups.',
    ],
    deliverables: [
      {
        title: 'Official WhatsApp Cloud API AI Agent',
        description:
          'Connected directly to your business WhatsApp number to respond within seconds 24 hours a day.',
      },
      {
        title: 'Calendar & Database Tool Integration',
        description:
          'Live read/write connection to Google Calendar, Google Sheets, or PostgreSQL to verify slots and record bookings.',
      },
      {
        title: 'Human Handover Protocol',
        description:
          'Automatic detection for complaints, custom negotiations, or out-of-SOP requests that immediately notifies your human staff.',
      },
      {
        title: 'RAG Knowledge Base from Your Official SOP',
        description:
          'Curated pricing tables, service rules, and brand tone guidelines so the agent answers strictly from verified company facts.',
      },
      {
        title: 'Conversation & Tool Audit Dashboard',
        description:
          'Transparent logs of every incoming message, agent reasoning step, and executed tool call.',
      },
      {
        title: 'Edge-Case Stress Testing & 30-Day Warranty',
        description:
          'Tested against typos, ambiguous prompts, and API timeouts prior to go-live, backed by a 30-day bug-fix warranty.',
      },
    ],
    process: [
      {
        num: '01',
        duration: '30 Minutes',
        title: 'Free chat flow & SOP audit',
        description:
          'We review the repetitive chat questions consuming your admin time and define clear boundaries for what the agent handles.',
      },
      {
        num: '02',
        duration: 'Days 2–5',
        title: 'Tool schema & guardrail design',
        description:
          'We map the calendar/database fields the agent can access and define exact human handover triggers.',
      },
      {
        num: '03',
        duration: 'Weeks 1–3',
        title: 'Staging build & live testing',
        description:
          'Your team tests real conversations on a staging number—from standard bookings to tricky edge cases.',
      },
      {
        num: '04',
        duration: 'Launch & Tune',
        title: 'Production rollout & log monitoring',
        description:
          'The agent goes live for customers while we monitor first-week logs and fine-tune responses with your team.',
      },
    ],
    useCases: [
      {
        industryId: 'klinik',
        industryLabel: 'Clinics',
        scenarioTitle: '24/7 Patient Triage, Price Lookup & Doctor Slot Booking',
        workflowLines: [
          'A patient chats at 21:30 asking about dental scaling prices and Saturday morning availability.',
          'The AI agent answers using the clinic SOP price table and checks live doctor slots in Google Calendar.',
          'Once the patient picks a time, the agent locks the calendar slot and sends a morning recap to the front desk.',
        ],
        outcome:
          'Sample outcome: Evening inquiries turn into confirmed bookings without waiting for morning staff.',
      },
      {
        industryId: 'fnb',
        industryLabel: 'F&B',
        scenarioTitle: 'Catering & Hampers Package Consultation + Quota Check',
        workflowLines: [
          'A customer asks for 60 lunch boxes or festive hampers for next Friday within a specific budget.',
          'The AI agent recommends matching packages from your active sheet and checks remaining kitchen production quota.',
          'The agent records the delivery address and notifies your admin to issue the final payment link.',
        ],
        outcome:
          'Sample outcome: Admins receive ready-to-invoice order summaries instead of answering basic menu questions.',
      },
      {
        industryId: 'properti',
        industryLabel: 'Property',
        scenarioTitle: 'Instant Ad Lead Qualification & Showroom Visit Booking',
        workflowLines: [
          'A prospect clicks a Meta Ad at night asking for cluster pricelists and KPR installment simulations.',
          'The AI agent shares the brochure, asks 3 polite qualification questions, and logs the lead in your CRM sheet.',
          'The agent offers weekend site-visit slots and notifies the assigned sales executive on WhatsApp.',
        ],
        outcome:
          'Sample outcome: Sales reps start the day with pre-qualified site visit schedules.',
      },
      {
        industryId: 'jasa',
        industryLabel: 'Professional Services',
        scenarioTitle: 'B2B Initial Inquiry Filter & Consultation Scheduler',
        workflowLines: [
          'A prospective corporate client messages WhatsApp asking about service scope and estimated timelines.',
          'The AI agent explains your core packages, collects project requirements, and checks your consultant calendar.',
          'A discovery call is booked automatically and your team receives a structured 3-bullet client brief.',
        ],
        outcome:
          'Sample outcome: Zero missed B2B inquiries during busy client meetings.',
      },
    ],
    pricingNote: {
      label: 'Calculated after free audit',
      reason:
        'AI agent investment depends on how many tools (calendar, database, CRM) and decision rules are connected. We provide a fixed, transparent quote after a free 30-minute audit so you only pay for what your workflow needs.',
      scopeNote: 'Includes safety guardrails, WhatsApp Cloud API setup, and a 30-day warranty.',
    },
    faq: [
      {
        question: 'Will the AI agent sound stiff or robotic to our customers?',
        answer:
          'No. We configure the system tone to match your best human admin—warm, polite, and natural. Customers can type free-form questions without pressing number codes.',
      },
      {
        question: 'What if a customer asks a complex question not covered in our SOP?',
        answer:
          'The agent will never hallucinate or invent policies. When a question falls outside approved SOP documents or involves a complaint, it pauses automated replies and alerts your human staff with a full summary.',
      },
      {
        question: 'Can we keep using our existing business WhatsApp number?',
        answer:
          'Yes. We assist with migrating or connecting your business number to the official WhatsApp Cloud API.',
      },
      {
        question: 'What are the monthly running costs for the AI agent after launch?',
        answer:
          'Monthly running costs consist only of actual AI model token usage and official WhatsApp Cloud API conversation charges, which scale transparently with your chat volume.',
      },
      {
        question: 'Is our customer chat history used to train public AI models?',
        answer:
          'No. We use enterprise API endpoints where your business data and customer chats are never used to train public models.',
      },
    ],
    seo: {
      title: 'WhatsApp & CRM AI Agent Development in BSD & South Tangerang | CHESTAADOTCOM',
      description:
        'Build custom WhatsApp & CRM AI agents that reply to chats, check calendar availability, and log leads 24/7 for businesses in BSD City, South Tangerang & Greater Jakarta.',
    },
  },
  'software-custom': {
    title: 'Custom Web Applications & Internal Dashboards',
    shortTitle: 'Custom Software & Dashboards',
    tagline: 'INTERNAL OPERATIONS & CLIENT PORTALS',
    shortPromise:
      'Custom web apps, client portals, and internal dashboards engineered around your exact operational SOP.',
    summary:
      'When spreadsheets become fragile and off-the-shelf SaaS subscriptions do not fit your workflow, we build custom web applications and dashboards that centralize orders, commissions, inventory, and executive reporting in one place.',
    timeline: '2–4 weeks',
    bestForSummary: 'Growing businesses needing internal operational tools, client portals, or custom commission/inventory logic',
    forWho: [
      'Your operational data is scattered across dozens of Google Sheets tabs that frequently break when someone edits a formula.',
      'Monthly SaaS subscriptions charge per user seat while still forcing your staff to maintain side spreadsheets because the workflow does not fit.',
      'Calculating team commissions, project margins, or multi-branch stock takes days of manual reconciliation every month.',
      'Your B2B clients or customers repeatedly message admins just to check order progress, invoices, or service history.',
    ],
    deliverables: [
      {
        title: 'Custom SOP Database & Workflow Architecture',
        description:
          'Relational PostgreSQL database schema designed around your exact business entities, approval stages, and calculation rules.',
      },
      {
        title: 'Role-Based Access Control (Admin, Staff, Finance, Owner)',
        description:
          'Each team member logs in and sees only the screens, actions, and sensitive numbers permitted for their role.',
      },
      {
        title: 'Responsive Web Interface for Field & Office Teams',
        description:
          'Fast, clean screens that work smoothly on mobile phones in the warehouse/clinic as well as desktop monitors in the office.',
      },
      {
        title: 'Automated PDF Documents & Excel/CSV Reports',
        description:
          'Generate official quotations, delivery notes, invoices, and monthly financial exports in one click.',
      },
      {
        title: 'External API, Payment & WhatsApp Notification Hooks',
        description:
          'Connect your internal app directly to WhatsApp status alerts, payment gateways, or existing accounting tools.',
      },
      {
        title: 'Full GitHub Source Code Ownership & 30-Day Warranty',
        description:
          'Deployed to your company cloud account with automated daily backups, staff training, and a 30-day warranty.',
      },
    ],
    process: [
      {
        num: '01',
        duration: 'Days 1–3',
        title: 'Operational SOP audit & clickable wireframe',
        description:
          'We shadow your current spreadsheet flow and build an interactive screen prototype so you verify every field before coding starts.',
      },
      {
        num: '02',
        duration: 'Weeks 1–2',
        title: 'Database engineering & core module build',
        description:
          'We build the PostgreSQL schema, role permissions, and core transaction logic with weekly live staging previews.',
      },
      {
        num: '03',
        duration: 'Week 3',
        title: 'Spreadsheet data migration & staff UAT testing',
        description:
          'We import your existing clean data and test daily scenarios directly with your operational staff.',
      },
      {
        num: '04',
        duration: 'Week 4',
        title: 'Production deployment, training & handover',
        description:
          'Live launch on your domain/server with automated backups, video guides, and 30 days of technical warranty.',
      },
    ],
    useCases: [
      {
        industryId: 'klinik',
        industryLabel: 'Clinics',
        scenarioTitle: 'Patient Visit Queue, Consumable Stock & Doctor Fee System',
        workflowLines: [
          'Front-desk staff log completed treatments and medical consumables used per patient visit.',
          'The app automatically deducts inventory and calculates the exact commission share for doctors and nurses.',
          'Clinic owners view real-time daily revenue and monthly payout tables without manual Excel work.',
        ],
        outcome:
          'Sample outcome: Monthly commission and stock reconciliation drops from 3 days to 10 minutes.',
      },
      {
        industryId: 'fnb',
        industryLabel: 'F&B',
        scenarioTitle: 'Central Kitchen Production & Multi-Outlet Stock Request Portal',
        workflowLines: [
          'Branch managers submit daily ingredient requests from their phones before the afternoon cutoff.',
          'Central kitchen staff see aggregated batch totals and print route delivery notes in one click.',
          'When outlets confirm receipt, central stock and branch COGS update automatically.',
        ],
        outcome:
          'Sample outcome: Eliminates missing stock discrepancies between central kitchen and outlets.',
      },
      {
        industryId: 'properti',
        industryLabel: 'Property',
        scenarioTitle: 'Interior/Contractor Project Tracker & Client Progress Portal',
        workflowLines: [
          'Site supervisors upload weekly progress photos and submit material purchase requests from the field.',
          'Managers approve POs in one click while monitoring real-time budget vs actual spend per project.',
          'Clients log into a dedicated portal to view verified milestone photos and payment schedules.',
        ],
        outcome:
          'Sample outcome: Prevents project budget leaks and keeps clients informed without messy chat threads.',
      },
      {
        industryId: 'jasa',
        industryLabel: 'Professional Services',
        scenarioTitle: 'B2B Wholesale Order Portal & Delivery Status Tracker',
        workflowLines: [
          'Repeat B2B buyers log in to view custom wholesale price tiers assigned to their company account.',
          'Submitted orders generate an instant proforma invoice and enter the warehouse packing queue.',
          'Finance and warehouse teams track every order from packing to signed delivery receipt on one board.',
        ],
        outcome:
          'Sample outcome: Sales admins process 3x more repeat B2B orders without extra data-entry staff.',
      },
    ],
    pricingNote: {
      label: 'Calculated after free audit',
      reason:
        'Every business has a unique number of modules, user roles, and calculation rules. We provide a fixed price after mapping your workflow in a free 30-minute audit.',
      scopeNote: 'Zero per-seat monthly license fees. Full source code ownership belongs to your company.',
    },
    faq: [
      {
        question: 'Why build custom software instead of subscribing to monthly SaaS?',
        answer:
          'Monthly SaaS tools often force you to change your SOP to fit their rigid templates while charging per user every month. Custom software matches your exact workflow with zero per-seat subscription fees.',
      },
      {
        question: 'Will non-technical staff find it easy to use?',
        answer:
          'Yes. We design clean role-based screens that only show buttons relevant to each staff member’s daily task, complete with live training and short video guides.',
      },
      {
        question: 'Where will the database and application be hosted?',
        answer:
          'We deploy on reliable cloud infrastructure (such as Railway, AWS, DigitalOcean, or Google Cloud) under an account owned by your company, configured with SSL encryption and automated daily database backups.',
      },
      {
        question: 'Can we add new modules later as the company grows?',
        answer:
          'Yes. We architect modular React, Node.js, and PostgreSQL codebases so future modules plug in cleanly without rebuilding from scratch.',
      },
    ],
    seo: {
      title: 'Custom Web App & Dashboard Development in BSD | CHESTAADOTCOM',
      description:
        'Build internal operational web apps, client portals, and custom dashboards built around your SOP in BSD City, South Tangerang & Greater Jakarta. Free workflow audit.',
    },
  },
  'otomasi-workflow': {
    title: 'Cross-App Workflow Automation',
    shortTitle: 'Workflow Automation',
    tagline: 'API INTEGRATION & PROCESS AUTOMATION',
    shortPromise:
      'Connect Google Sheets, web forms, invoices, calendars, and WhatsApp so data flows automatically without manual copy-paste.',
    summary:
      'You do not always need to replace the tools your team already knows. We build reliable background pipelines (using n8n, Node.js, and Webhooks) so every new transaction or form submission automatically updates your spreadsheets, invoices, and team notifications.',
    timeline: '1–3 weeks',
    bestForSummary: 'Teams already using Sheets/Notion/Forms who want to eliminate manual copy-paste and missed follow-ups',
    forWho: [
      'Your admin staff spend 1–3 hours every day copying and pasting customer data between web forms, spreadsheets, and invoices.',
      'Customers or patients often miss scheduled appointments because staff forget to send H-1 and H-2 hour WhatsApp reminders.',
      'Paid ad leads from Meta or Google sit in a spreadsheet for hours before a sales rep notices and follows up.',
      'You want an automated evening WhatsApp summary of daily sales, bookings, and pending invoices without opening five files.',
    ],
    deliverables: [
      {
        title: 'Complete Workflow Mapping & Trigger Blueprint',
        description:
          'We trace every manual copy-paste step in your current routine and design an automated trigger-and-action specification.',
      },
      {
        title: 'Custom n8n & Node.js Automation Pipeline',
        description:
          'Reliable background workflows connecting Google Sheets, Calendar, WhatsApp Cloud API, Notion, PostgreSQL, or webhooks.',
      },
      {
        title: 'Automated PDF Invoice, Contract & Label Generation',
        description:
          'Dynamic document templates populated and sent automatically via WhatsApp or email whenever a deal status updates.',
      },
      {
        title: 'Scheduled WhatsApp Reminders & Daily Owner Digests',
        description:
          'Automated H-1 appointment confirmations, payment due alerts, and nightly 20:00 WIB executive summaries.',
      },
      {
        title: 'Error Queues, Auto-Retry & Admin Failure Alerts',
        description:
          'Built-in resilience that automatically retries temporary API hiccups and notifies your admin if manual review is needed.',
      },
      {
        title: 'Self-Hosted Option & Full Credential Ownership',
        description:
          'Can be hosted on your own affordable VPS (self-hosted n8n) so you avoid paying expensive monthly per-task USD fees.',
      },
    ],
    process: [
      {
        num: '01',
        duration: '30 Minutes',
        title: 'Free audit of repetitive daily admin tasks',
        description:
          'Show us the spreadsheets, forms, and chat templates your staff copy every day; we calculate the exact time saved.',
      },
      {
        num: '02',
        duration: 'Days 2–4',
        title: 'Field mapping & trigger logic specification',
        description:
          'We lock exact trigger conditions (e.g., when Status = "Paid", generate PDF receipt + message buyer) with zero ambiguity.',
      },
      {
        num: '03',
        duration: 'Weeks 1–2',
        title: 'API integration & sample data testing',
        description:
          'We build the workflow in n8n/Node.js and test it against dozens of sample transaction rows to verify 100% accuracy.',
      },
      {
        num: '04',
        duration: 'Launch & Monitor',
        title: 'Live activation & team handover',
        description:
          'The workflow runs automatically in the background while your staff focus on serving customers instead of re-typing data.',
      },
    ],
    useCases: [
      {
        industryId: 'klinik',
        industryLabel: 'Clinics',
        scenarioTitle: 'Automated Patient Appointment Reminders & Daily Visit Recap',
        workflowLines: [
          'Whenever staff add a patient schedule in Google Sheets/Calendar, the workflow queues automated reminders.',
          'At H-1 day and H-2 hours before the visit, the system sends a WhatsApp confirmation message to the patient.',
          'Every evening at 20:00, the system summarizes attended visits, cancellations, and daily revenue to the clinic owner’s WhatsApp.',
        ],
        outcome:
          'Sample outcome: Patient no-show rates drop sharply without admins texting patients one by one.',
      },
      {
        industryId: 'fnb',
        industryLabel: 'F&B',
        scenarioTitle: 'Automated Pre-Order Recap to Kitchen Lists & Courier Labels',
        workflowLines: [
          'Incoming web form orders automatically enter the master Google Sheet grouped by delivery date.',
          'The system sums total portions per menu item for the kitchen and generates printable address labels for couriers.',
          'As soon as the sheet status changes to "Shipped", the buyer receives a WhatsApp message with estimated arrival time.',
        ],
        outcome:
          'Sample outcome: Smooth coordination between order admins, kitchen staff, and couriers with zero wrong deliveries.',
      },
      {
        industryId: 'properti',
        industryLabel: 'Property',
        scenarioTitle: 'Instant Ad Lead Distribution & Sales Follow-Up Reminders',
        workflowLines: [
          'New prospects submitting Meta/Google lead forms are logged in CRM and distributed round-robin to on-duty sales reps.',
          'Sales reps immediately receive a WhatsApp notification with the buyer profile and a one-click greeting link.',
          'If lead status is not updated within 2 hours, the system sends a reminder to the sales rep and marketing manager.',
        ],
        outcome:
          'Sample outcome: Every paid ad lead is contacted while buyer interest is high—no more forgotten leads.',
      },
      {
        industryId: 'jasa',
        industryLabel: 'Professional Services',
        scenarioTitle: 'Automated Contract Drafting, Invoicing & Payment Reminders',
        workflowLines: [
          'When a prospect row is marked "Deal", the system populates draft contract and PDF invoice templates with client data.',
          'Documents are sent via email and WhatsApp while recording the due date on the finance calendar.',
          'Three days before the due date, the system sends a polite automated payment reminder.',
        ],
        outcome:
          'Sample outcome: Contract and billing admin finishes in seconds with zero typos in nominal amounts.',
      },
    ],
    pricingNote: {
      label: 'Calculated after free audit',
      reason:
        'Workflow automation pricing depends on the number of connected apps and branching logic rules, quoted transparently after a free 30-minute audit.',
      scopeNote: 'Can be deployed on self-hosted n8n infrastructure so you avoid expensive per-task dollar subscriptions.',
    },
    faq: [
      {
        question: 'Do we have to stop using Google Sheets or our existing tools?',
        answer:
          'Not at all. Workflow automation connects the Google Sheets, calendars, and forms your staff already use so data syncs automatically without learning a new platform.',
      },
      {
        question: 'Why use n8n and Node.js instead of standard Zapier plans?',
        answer:
          'Zapier charges USD per-task fees that balloon as your transaction volume grows. Self-hosted n8n and Node.js webhooks handle thousands of daily executions at a fraction of the cost.',
      },
      {
        question: 'What happens if one of the connected third-party APIs goes down temporarily?',
        answer:
          'Every workflow includes automatic retry queues, error logging, and instant admin alerts so no transaction data is lost.',
      },
      {
        question: 'How long does it take to build one automation workflow?',
        answer:
          'For standard workflows connecting 2–4 applications, development takes around 1–2 weeks including testing with real transaction data.',
      },
    ],
    seo: {
      title: 'Business Workflow & n8n Automation in BSD | CHESTAADOTCOM',
      description:
        'Connect Google Sheets, WhatsApp, calendars, and automated PDF invoicing with n8n & Node.js workflow automation in BSD City, South Tangerang & Greater Jakarta.',
    },
  },
};

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
  const service =
    typeof serviceOrSlug === 'string'
      ? getServiceBySlug(serviceOrSlug)
      : serviceOrSlug;
  if (!service) return undefined;

  const { locale } =
    localeOrPathname === 'en' || localeOrPathname === 'id'
      ? { locale: localeOrPathname as LocaleCode }
      : parseLocalizedPath(localeOrPathname);

  if (locale !== 'en') return service;
  const override = ENGLISH_SERVICES_OVERRIDES[service.slug];
  if (!override) return service;
  return {
    ...service,
    ...override,
  };
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
  let page: ServiceAreaPageData | undefined;
  let localeOrPathname: string;

  if (typeof pageOrServiceSlug === 'string') {
    page = getServiceAreaPage(pageOrServiceSlug, localeOrAreaSlug);
    localeOrPathname = maybeLocale || 'id';
  } else {
    page = pageOrServiceSlug;
    localeOrPathname = localeOrAreaSlug;
  }

  if (!page) return undefined;

  const { locale } =
    localeOrPathname === 'en' || localeOrPathname === 'id'
      ? { locale: localeOrPathname as LocaleCode }
      : parseLocalizedPath(localeOrPathname);

  if (locale !== 'en') return page;

  const isWeb = page.serviceSlug === 'pembuatan-website';
  const isAi = page.serviceSlug === 'ai-agent';
  const areaDisplay =
    page.areaSlug === 'tangerang-selatan' ? 'South Tangerang' : page.areaName;

  const serviceDisplay = isWeb
    ? 'Website & Landing Page Development'
    : isAi
      ? 'AI Agent & Chat Automation'
      : page.serviceSlug === 'software-custom'
        ? 'Custom Software Development'
        : 'Workflow Automation & API Integration';

  const priceStart = isWeb
    ? 'Starting from IDR 1,200,000'
    : 'Calculated after free workflow audit';

  const timelineEn = isWeb ? 'Estimated 5–14 business days' : 'Estimated 2–4 weeks';

  const blogAlts = getBlogAlternateSlugs(page.caseStudyReference.relatedBlogSlug);
  const enBlogSlug = blogAlts?.enSlug || page.caseStudyReference.relatedBlogSlug;
  const enBlogPost = getBlogPostBySlug(enBlogSlug, 'en');

  return {
    ...page,
    serviceName: serviceDisplay,
    areaName: areaDisplay,
    metaTitle: isWeb
      ? `Website Development in ${areaDisplay}, Tangsel | CHESTAADOTCOM`
      : `AI Agent & WhatsApp Automation in ${areaDisplay} | CHESTAADOTCOM`,
    metaDescription: isWeb
      ? `High-speed business website and conversion landing page development in ${areaDisplay}. Clean code, local SEO ready, starting from IDR 1,200,000.`
      : `Custom WhatsApp AI Agent and CRM automation for businesses in ${areaDisplay}. 24/7 SOP-grounded lead qualification and booking. Free workflow audit.`,
    h1: isWeb
      ? `Website development for businesses in ${areaDisplay}`
      : `AI Agent implementation for business operations in ${areaDisplay}`,
    quickSummary: isWeb
      ? `CHESTAADOTCOM engineers fast company websites, digital catalogs, and high-converting landing pages for businesses in ${areaDisplay}. Operating from our base in BSD, South Tangerang, we deliver Core Web Vitals-ready websites starting from IDR 1,200,000 with remote or scheduled in-person collaboration.`
      : `CHESTAADOTCOM designs and integrates custom WhatsApp & web AI Agents for businesses in ${areaDisplay}. From our operational base in BSD, South Tangerang, we help clinics, showrooms, property teams, and B2B companies qualify leads and book appointments 24/7 based strictly on your official SOP.`,
    localContextHeading: isWeb
      ? `Why businesses in ${areaDisplay} need a fast, conversion-focused website`
      : `Solving after-hours chat bottlenecks for businesses in ${areaDisplay}`,
    localContextParagraphs: isWeb
      ? [
          `${areaDisplay} features a competitive mix of specialist clinics, commercial shophouses, design studios, educational centers, and B2B offices. Prospects in ${areaDisplay} typically research providers on their mobile phones, compare two or three options side by side, and message the business that presents the clearest service scope and pricing.`,
          `Many local businesses in ${areaDisplay} still rely solely on social media bio links or slow, template-heavy websites that take over five seconds to load on mobile networks. When a page fails to load your service catalog, location details, and WhatsApp consultation CTA immediately, high-intent prospects bounce to a competitor.`,
          `We engineer websites for ${areaDisplay} businesses around the exact questions buyers ask before clicking WhatsApp—covering package comparisons, workflow steps, pricing transparency, and local credibility. With semantic server-rendered HTML and structured JSON-LD data, your pages are built to rank on Google Search and AI answer engines.`,
        ]
      : [
          `In a fast-moving commercial corridor like ${areaDisplay}, prospective customers frequently send WhatsApp inquiries outside standard office hours—whether in the evening after work or on weekends. For clinics, property teams, showrooms, and B2B providers in ${areaDisplay}, waiting until the next morning to reply often means losing the lead.`,
          `At the same time, rigid numeric auto-replies ("Press 1 for price") frustrate discerning customers in ${areaDisplay}, while hiring dedicated night-shift admin staff adds significant monthly payroll overhead.`,
          `We build AI Agents powered by Retrieval-Augmented Generation (RAG) grounded strictly in your company's official SOP documents, price lists, and calendar availability. The agent answers natural questions accurately without hallucinating, collects qualification details, and hands over the chat to your human staff when the prospect is ready to close.`,
        ],
    businessMixList: [
      `Healthcare clinics, dental practices, and aesthetic centers in ${areaDisplay}`,
      `Architecture studios, interior contractors, and property marketing teams in ${areaDisplay}`,
      `Showrooms, B2B distributors, and corporate service offices`,
      `Education centers, training academies, and specialist workshops`,
      `Growing F&B brands, catering operators, and commercial services`,
    ],
    scenarios: [
      {
        title: isWeb
          ? `Specialist Clinic & Healthcare Practice in ${areaDisplay}`
          : `24/7 Patient Triage & Appointment Booking for Clinics in ${areaDisplay}`,
        businessType: 'Healthcare & Specialist Clinic',
        challenge: isWeb
          ? 'New patients repeatedly ask for doctor schedules, treatment descriptions, and base prices on WhatsApp because social media posts are hard to search.'
          : 'Clinic admins are overwhelmed by hundreds of daily chats asking about treatment prices, pre-care rules, and doctor slots during peak hours.',
        solution: isWeb
          ? 'Build a structured, sub-second website with dedicated treatment pages, transparent base pricing tables, doctor profiles, and pre-formatted WhatsApp booking links.'
          : 'Deploy a WhatsApp AI Agent connected to the clinic knowledge base and slot calendar to answer treatment FAQs, collect patient details, and log booking requests.',
        expectedOutcome: isWeb
          ? 'Receptionists spend less time repeating basic info, and incoming WhatsApp chats arrive ready to book a specific slot.'
          : 'Response time drops to seconds 24/7 while receptionists focus on in-clinic patients and confirmed bookings.',
      },
      {
        title: isWeb
          ? `B2B Service Provider, Showroom & Interior Studio in ${areaDisplay}`
          : `Lead Qualification & Showroom Visit Scheduling in ${areaDisplay}`,
        businessType: 'B2B, Showroom & Property Services',
        challenge: isWeb
          ? 'Homeowners and corporate procurement teams in ' +
            areaDisplay +
            ' need portfolio proof and technical specifications before scheduling a site survey, but PDF catalogs are too heavy on mobile.'
          : 'Digital ads generate many evening inquiries, mixing casual price-checkers with serious buyers who want to book a weekend survey.',
        solution: isWeb
          ? 'Engineer a fast company profile and filterable project catalog with WebP imagery, a clear 4-step workflow breakdown, and an instant WhatsApp consultation form.'
          : 'Implement an AI Agent that politely qualifies project scope, estimated budget, and preferred timeline before scheduling a consultation with your senior sales team.',
        expectedOutcome: isWeb
          ? 'Higher trust on first click and better-qualified inquiries before your technical team visits the site.'
          : 'Your sales team starts every morning with a clean list of pre-qualified leads and structured requirement summaries.',
      },
    ],
    collaborationHeading: `How we work with clients in ${areaDisplay} (Remote & In-Person)`,
    collaborationParagraphs: [
      `CHESTAADOTCOM operates from our base in BSD, South Tangerang. We do not claim fictional branch offices in other districts; instead, we serve ${areaDisplay} directly through efficient remote collaboration (Google Meet & WhatsApp) combined with scheduled on-site meetings whenever needed.`,
      `Every project stage—from initial workflow audit and wireframing to staging review and production launch—is documented transparently so your team stays in full control.`,
    ],
    deliverablesSummary: isWeb
      ? [
          'Custom mobile-first interface built for your brand without generic templates',
          'High-speed page load (target LCP < 2.5s) with modern image compression and lean code',
          'Local SEO architecture & unified JSON-LD (@graph: LocalBusiness, Service, FAQPage)',
          'Formatted WhatsApp conversion flows and analytics pixel integration',
          '100% source code and domain ownership with handover training',
        ]
      : [
          'Conversation flow mapping and RAG Knowledge Base curation from your official SOPs',
          'Strict system guardrails so the AI Agent never invents prices or policies outside your SOP',
          'Human-in-the-loop escalation to your admin staff for custom negotiations or complaints',
          'Integration with WhatsApp Business / web widget and automated CRM/Google Sheets logging',
          'Post-launch response tuning and admin team onboarding',
        ],
    priceNote: {
      startingPrice: priceStart,
      timeline: timelineEn,
      note: 'Exact scope and investment are agreed transparently upfront before development begins, with zero hidden fees.',
    },
    caseStudyReference: {
      ...page.caseStudyReference,
      title: isWeb
        ? 'Conversion-Focused Web Architecture Case Reference'
        : 'SOP-Driven AI Lead Qualification & Booking Reference',
      summary: isWeb
        ? 'We help local businesses transform static profile pages into measurable lead acquisition channels.'
        : 'Effective AI Agents follow company SOPs strictly and know exactly when to hand over to human staff.',
      metricNote: 'Specific client metrics and live demos are shared during your free consultation.',
      relatedBlogSlug: enBlogSlug,
      relatedBlogTitle: enBlogPost?.title || page.caseStudyReference.relatedBlogTitle,
    },
    faqs: [
      {
        question: `Can the CHESTAADOTCOM team meet in person in ${areaDisplay}?`,
        answer: `Yes. Because our base is in BSD, South Tangerang, we can schedule an in-person meeting in ${areaDisplay} or BSD after our initial 30-minute discovery call on WhatsApp or Google Meet.`,
      },
      {
        question: isWeb
          ? `How much does website development cost for a business in ${areaDisplay}?`
          : `How do you prevent the AI Agent from giving wrong prices to our customers in ${areaDisplay}?`,
        answer: isWeb
          ? 'Our conversion landing page and business website packages start from IDR 1,200,000. Multi-page websites or custom catalogs are quoted transparently upfront based on your required pages and features.'
          : 'We use Retrieval-Augmented Generation (RAG) with strict system guardrails. The AI only quotes approved SOP and pricing documents, and immediately escalates out-of-scope questions to your human admin.',
      },
      {
        question: isWeb
          ? 'Will I own the source code and domain 100%?'
          : 'Can our human admin take over a WhatsApp conversation at any time?',
        answer: isWeb
          ? 'Yes, 100%. All source code, domain registration, and hosting access are handed over under your ownership without mandatory monthly lock-in fees.'
          : 'Yes, completely. As soon as a human admin steps into the chat or a customer requests special assistance, the AI Agent pauses automated replies and hands over full context.',
      },
    ],
  };
}
