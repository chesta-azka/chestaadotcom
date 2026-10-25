import type { PortfolioProject, ProjectCategory } from './projects';

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

/**
 * 1:1 faithful English translation of PORTFOLIO_PROJECTS in /src/data/projects.ts.
 * Same facts, sections, order, structure, gallery items, features, and placeholders.
 */
export const PORTFOLIO_PROJECTS_EN: PortfolioProject[] = [
  // 1. FEATURED #1 — AI AGENT (Clinic & Healthcare)
  {
    slug: 'klinik-estetika-bsd-ai-booking',
    title: 'WhatsApp Reservation Assistant & Doctor Schedule for Aesthetic Clinic',
    oneLiner:
      '24/7 WhatsApp AI agent that checks live doctor slot availability, locks patient treatment bookings, and sends automated H-1 reminders.',
    category: 'ai-agent',
    categoryLabel: 'AI Agent',
    industry: 'Clinic & Healthcare',
    client: 'Aesthetic & Healthcare Clinic in BSD City',
    year: '2025',
    role: 'AI Agent Architecture, Calendar Integration & Landing Page',
    duration: '3 Weeks',
    stack: ['WhatsApp Cloud API', 'Python', 'PostgreSQL', 'React', 'Node.js'],
    cover: 'portfolioClinicPlaceholder',
    deviceFrame: 'phone',
    gallery: [
      {
        imageKey: 'portfolioGalleryArchitecture',
        caption:
          'Workflow schema from incoming patient WhatsApp message, PostgreSQL doctor schedule lookup, to automated slot locking.',
        layout: 'full',
      },
      {
        imageKey: 'portfolioClinicPlaceholder',
        caption:
          'Conversation simulation of the WhatsApp assistant matching doctor practice hours and confirming patient details.',
        layout: 'half',
      },
      {
        imageKey: 'portfolioGalleryMobileHandover',
        caption:
          'Human receptionist handover view complete with patient symptom summary for specialized medical consultations.',
        layout: 'half',
      },
    ],
    summaryParagraphs: [
      'Clinics receiving dozens of daily chats often lose prospective patients because inquiries arrive late at night after admin staff have gone home. This project connects the clinic’s official WhatsApp number to an AI agent capable of reading live doctor practice schedules and answering foundational procedure questions in seconds.',
      'You remain in full control: whenever a patient asks about sensitive medical indications or requests special rescheduling, the agent immediately forwards the conversation alongside a concise context summary to your receptionist’s screen without forcing the patient to repeat their story.',
    ],
    features: [
      {
        title: 'Real-Time Doctor Calendar Slot Lookup',
        description:
          'The agent calls a database schedule lookup function to verify that treatment hours offered to patients are genuinely open and conflict-free.',
        metricOrTag: 'Tool: check_doctor_slots()',
        highlightType: 'architecture',
      },
      {
        title: 'Medical Guardrails & Receptionist Handover',
        description:
          'Strict action boundaries prevent the agent from inventing medical advice; questions outside SOP are automatically routed to human admins with a chat summary.',
        metricOrTag: 'Active Human-in-the-Loop',
        highlightType: 'security',
      },
      {
        title: 'Automated H-1 Reminders & Attendance Confirmation',
        description:
          'The system sends scheduled reminder messages one day before treatment to reduce last-minute cancellations (no-shows).',
        metricOrTag: 'H-1 Reminder Cron',
        highlightType: 'workflow',
      },
      {
        title: 'Daily Reservation Recap Dashboard for Branch Admins',
        description:
          'A lightweight web interface for receptionists to view today’s patient list, WhatsApp confirmation status, and treatment history.',
        metricOrTag: 'React + PostgreSQL',
        highlightType: 'interface',
      },
      {
        title: 'Conversation & Tool Execution Audit Logs',
        description:
          'Every response and schedule update is recorded with a timestamp so clinic management can audit service performance transparently.',
        metricOrTag: '100% Log Transparency',
        highlightType: 'security',
      },
    ],
    liveStatusLabel: 'Internal System / Client NDA',
    caseStudySlug: 'otomasi-reservasi-klinik-estetika',
    serviceSlug: 'ai-agent',
    featured: true,
    draft: false,
    updatedAt: '2025-03-10',
    seo: {
      title: 'WhatsApp AI Agent & BSD Clinic Booking Portfolio | CHESTAADOTCOM',
      description:
        'Visual showcase of a WhatsApp AI agent system for patient qualification and automated doctor scheduling at an aesthetic clinic in BSD City.',
    },
  },

  // 2. FEATURED #2 — CUSTOM SOFTWARE (Logistics & Operations)
  {
    slug: 'dashboard-operasional-logistik-tangsel',
    title: 'Centralized Fleet Operations & Delivery Note Dashboard',
    oneLiner:
      'Internal web application to monitor daily delivery routes, issue digital delivery notes, and replace a dozen disconnected spreadsheets.',
    category: 'software',
    categoryLabel: 'Custom Software',
    industry: 'Logistics & Operations',
    client: 'Regional Distribution & Logistics Company',
    year: '2025',
    role: 'Custom Web App Development & Database Design',
    duration: '4 Weeks',
    stack: ['React', 'Node.js', 'PostgreSQL', 'WhatsApp Cloud API'],
    cover: 'portfolioLogisticsDashboard',
    deviceFrame: 'browser',
    gallery: [
      {
        imageKey: 'portfolioGalleryArchitecture',
        caption:
          'Centralized architecture uniting warehouse admin input, field fleet status, and billing document generation.',
        layout: 'full',
      },
      {
        imageKey: 'portfolioLogisticsDashboard',
        caption:
          'Daily shipment manifest table view with trip status filters and instant delivery note number search.',
        layout: 'half',
      },
      {
        imageKey: 'portfolioGalleryAnalytics',
        caption:
          'On-time delivery metrics panel and status change audit logs by operations staff.',
        layout: 'half',
      },
    ],
    summaryParagraphs: [
      'As daily delivery volume grows, tracking delivery notes via spreadsheet files shared in chat groups frequently causes data discrepancies between warehouse staff, drivers, and billing teams. This custom web application unites the entire workflow into a single role-based workspace.',
      'Warehouse staff simply create a manifest once, the system automatically generates print-ready delivery notes, and confirmed arrival statuses immediately update the draft invoice queue for finance without manual copy-pasting.',
    ],
    features: [
      {
        title: 'Single-Door Manifest & Delivery Note Management',
        description:
          'Delivery note numbers are issued sequentially and automatically from PostgreSQL so duplicate numbering across branches never happens again.',
        metricOrTag: 'Single Source Database',
        highlightType: 'architecture',
      },
      {
        title: 'Tiered Role Permissions (Warehouse Admin, Dispatcher, Finance)',
        description:
          'Each staff member only sees the menus and action buttons relevant to their responsibility, complete with user attribution on every status change.',
        metricOrTag: 'Role-Based Access Control',
        highlightType: 'security',
      },
      {
        title: 'Delivery Status Notifications via WhatsApp API',
        description:
          'Recipients and field coordinators receive automated updates when a truck departs and when goods are confirmed delivered.',
        metricOrTag: 'Real-Time Notifications',
        highlightType: 'workflow',
      },
      {
        title: 'Billing Recap & Instant Report Export',
        description:
          'The finance team can pull all completed deliveries in a single click to speed up invoice issuance.',
        metricOrTag: 'Clean CSV / PDF Export',
        highlightType: 'interface',
      },
    ],
    liveStatusLabel: 'Internal System / Client NDA',
    caseStudySlug: 'sentralisasi-operasional-armada-logistik',
    serviceSlug: 'software-custom',
    featured: true,
    draft: false,
    updatedAt: '2025-03-08',
    seo: {
      title: 'Logistics Operations & Delivery Note Dashboard Portfolio | CHESTAADOTCOM',
      description:
        'Visual showcase of a custom web application for fleet operations, digital delivery notes, and centralized PostgreSQL database management.',
    },
  },

  // 3. WEB & LANDING PAGE (Property & Architecture)
  {
    slug: 'landing-page-hunian-bintaro',
    title: 'Residential Cluster Landing Page & Mortgage Calculator in Bintaro',
    oneLiner:
      'Fast-loading mobile property promotion page featuring an interactive installment simulator and show-unit visit scheduler.',
    category: 'web',
    categoryLabel: 'Web & Landing Page',
    industry: 'Property & Architecture',
    client: 'Residential Developer & Architecture Studio in Bintaro',
    year: '2025',
    role: 'UI Design, Speed Optimization & WhatsApp CTA Integration',
    duration: '5 Days',
    stack: ['React', 'Node.js', 'WhatsApp Cloud API'],
    cover: 'portfolioPropertyPlaceholder',
    deviceFrame: 'browser',
    gallery: [
      {
        imageKey: 'portfolioGalleryArchitecture',
        caption:
          'Visitor capture flow from Meta/Google Ads clicks to unit simulation and pre-formatted WhatsApp message dispatch.',
        layout: 'full',
      },
      {
        imageKey: 'portfolioPropertyPlaceholder',
        caption:
          'Interactive down-payment and mortgage tenure calculator component running instantaneously on mobile screens without page reloads.',
        layout: 'half',
      },
      {
        imageKey: 'portfolioGalleryMobileHandover',
        caption:
          'Automated WhatsApp message format carrying the buyer’s selected unit type and preferred show-unit visit schedule.',
        layout: 'half',
      },
    ],
    summaryParagraphs: [
      'Significant property ad spend goes to waste because destination pages load huge uncompressed photos, causing visitors to close the tab before floor plans ever appear. This page was engineered around mobile load speed and an information hierarchy that immediately answers homebuyers’ primary questions.',
      'Visitors can compare unit types, test down-payment and monthly installment simulations interactively, and tap a WhatsApp button that automatically sends their chosen unit type to your in-house sales team.',
    ],
    features: [
      {
        title: 'Floor Plan & Facade Visual Asset Optimization (WebP/AVIF)',
        description:
          'All architectural galleries load progressively with explicit dimensions so the page renders rapidly with zero layout shift.',
        metricOrTag: 'Target LCP < 1.5 Seconds',
        highlightType: 'architecture',
      },
      {
        title: 'Interactive Mortgage & Down-Payment Simulator',
        description:
          'Lets prospective buyers calculate estimated monthly installments based on down-payment percentage and loan tenure right on the page.',
        metricOrTag: 'Zero-Reload Interaction',
        highlightType: 'interface',
      },
      {
        title: 'WhatsApp CTA Carrying Unit & Ad Source Parameters',
        description:
          'Your sales team immediately knows which unit the buyer viewed alongside the originating ad campaign from the very first chat.',
        metricOrTag: 'UTM & Conversion Tracking',
        highlightType: 'workflow',
      },
      {
        title: 'Complete Local SEO Structure & OpenGraph Schema',
        description:
          'Link previews look crisp and trustworthy whenever property agents share the page URL with prospective buyers on WhatsApp.',
        metricOrTag: 'Validated Schema.org',
        highlightType: 'security',
      },
    ],
    liveStatusLabel: 'Internal System / Client NDA',
    serviceSlug: 'pembuatan-website',
    featured: false,
    draft: false,
    updatedAt: '2025-03-05',
    seo: {
      title: 'Bintaro Property Landing Page & Mortgage Simulator Portfolio | CHESTAADOTCOM',
      description:
        'Visual showcase of a residential cluster landing page in Bintaro featuring a fast gallery, interactive mortgage calculator, and sales WhatsApp integration.',
    },
  },

  // 4. WORKFLOW AUTOMATION (F&B & Retail)
  {
    slug: 'otomasi-rekap-pos-fnb-serpong',
    title: 'Multi-Branch POS Recap & WhatsApp Reporting Automation for F&B',
    oneLiner:
      'Automated workflow that pulls cashier transaction data at store closing time, reconciles ingredient stock, and sends a net revenue summary to the owner’s WhatsApp.',
    category: 'otomasi',
    categoryLabel: 'Workflow Automation',
    industry: 'F&B & Retail',
    client: 'Restaurant & Cafe Chain in Gading Serpong',
    year: '2024',
    role: 'n8n Workflow Automation Architecture & Reporting Database',
    duration: '2 Weeks',
    stack: ['n8n', 'Python', 'PostgreSQL', 'WhatsApp Cloud API'],
    cover: 'portfolioFnbPlaceholder',
    deviceFrame: 'browser',
    gallery: [
      {
        imageKey: 'portfolioGalleryArchitecture',
        caption:
          'Automation node pipeline from pulling 3-branch POS cashier data to Python reconciliation and nightly WhatsApp report dispatch.',
        layout: 'full',
      },
      {
        imageKey: 'portfolioFnbPlaceholder',
        caption:
          'n8n workflow visualization separating gross revenue, delivery app promotional deductions, and raw ingredient usage.',
        layout: 'half',
      },
      {
        imageKey: 'portfolioGalleryAnalytics',
        caption:
          'Workflow execution history table complete with automated retry queues if a branch internet connection briefly drops.',
        layout: 'half',
      },
    ],
    summaryParagraphs: [
      'Multi-branch F&B owners often have to wait until the next afternoon just to see total net sales and remaining ingredient stock from the night before. This automation eliminates the daily routine of downloading CSV files from cashier apps and copying them one by one into spreadsheets.',
      'Every night at 10:00 PM after cashiers close out, the workflow automatically pulls transaction data across all branches, calculates daily performance metrics, archives them in PostgreSQL, and sends a clean digest straight to your WhatsApp.',
    ],
    features: [
      {
        title: 'Scheduled Cashier Data Pull at Store Closing',
        description:
          'Connects daily transaction reports from every branch without admin staff manually downloading and merging CSV files.',
        metricOrTag: '22:00 WIB Cron Trigger',
        highlightType: 'workflow',
      },
      {
        title: 'Stock Variance Detection & Ingredient Reorder Alerts',
        description:
          'Python scripts compare menu items sold against warehouse inventory and flag core ingredients approaching minimum thresholds.',
        metricOrTag: 'Python + PostgreSQL',
        highlightType: 'architecture',
      },
      {
        title: 'Concise Nightly Digest to the Owner’s WhatsApp',
        description:
          'Presents revenue per branch, top-selling items, and ingredients to reorder tomorrow morning in a single mobile-friendly message.',
        metricOrTag: 'WhatsApp Cloud API',
        highlightType: 'interface',
      },
      {
        title: 'Auto-Retry Mechanism & Error Notifications',
        description:
          'If a branch cashier tablet has not synced due to spotty Wi-Fi, the system automatically retries and logs a transparent status note.',
        metricOrTag: 'Workflow Reliability',
        highlightType: 'security',
      },
    ],
    liveStatusLabel: 'Internal System / Client NDA',
    caseStudySlug: 'sinkronisasi-rekap-pos-fnb-multi-cabang',
    serviceSlug: 'otomasi-workflow',
    featured: false,
    draft: false,
    updatedAt: '2025-02-26',
    seo: {
      title: 'Multi-Branch F&B POS Recap & WhatsApp Automation Portfolio | CHESTAADOTCOM',
      description:
        'Visual showcase of n8n, Python, and WhatsApp API workflow integration for multi-branch F&B cashier sales reconciliation in Gading Serpong.',
    },
  },

  // 5. CUSTOM SOFTWARE (Logistics & Operations / Manufacturing)
  {
    slug: 'sistem-inventaris-erp-manufaktur',
    title: 'Warehouse Inventory & Internal PO Approval System',
    oneLiner:
      'Web-based ERP module to track raw material stock movements, enforce minimum warehouse thresholds, and approve Purchase Orders from a smartphone.',
    category: 'software',
    categoryLabel: 'Custom Software',
    industry: 'Logistics & Operations',
    client: 'Mid-Sized Warehouse & Manufacturing Operations',
    year: '2024',
    role: 'Custom System Architecture, RBAC & Database Schema Migration',
    duration: '4 Weeks',
    stack: ['React', 'Node.js', 'PostgreSQL', 'WhatsApp Cloud API'],
    cover: 'portfolioErpInventory',
    deviceFrame: 'browser',
    gallery: [
      {
        imageKey: 'portfolioGalleryArchitecture',
        caption:
          'Relational database structure and role separation between receiving clerks, warehouse heads, and operations directors.',
        layout: 'full',
      },
      {
        imageKey: 'portfolioErpInventory',
        caption:
          'Warehouse raw material capacity monitoring interface and one-click Purchase Order approval queue.',
        layout: 'half',
      },
      {
        imageKey: 'portfolioGalleryAnalytics',
        caption:
          'Complete audit trail recording timestamp, user account, and reason for every stock opname adjustment.',
        layout: 'half',
      },
    ],
    summaryParagraphs: [
      'Growing companies with dozens of warehouse staff are often held back by ballooning per-user SaaS license fees or slow legacy systems during shift handovers. We engineered an inventory and procurement module focused squarely on the exact workflow used by field teams.',
      'All records live on your chosen infrastructure with zero per-seat subscription fees. Whenever raw material stock hits a safety threshold, a draft Purchase Order is prepared automatically and directors can review and approve it directly via a secure link on their phone.',
    ],
    features: [
      {
        title: 'Zero Per-User License Fees (Zero Per-Seat Tax)',
        description:
          'Add as many warehouse staff, purchasing admin, and supervisor accounts as you need without extra monthly fees per person.',
        metricOrTag: '100% System Ownership',
        highlightType: 'architecture',
      },
      {
        title: 'Tiered Mobile Purchase Order Approval',
        description:
          'Purchase requests above a defined amount automatically send a WhatsApp alert to management for one-click approval.',
        metricOrTag: 'Fast Approval Flow',
        highlightType: 'workflow',
      },
      {
        title: 'Inter-Warehouse Stock Transfer & Stock Opname',
        description:
          'Supports moving materials from raw storage to production lines with real-time stock balance calculations.',
        metricOrTag: 'PostgreSQL ACID Transactions',
        highlightType: 'interface',
      },
      {
        title: 'Full Audit Trail for Every Figure Adjustment',
        description:
          'No stock count ever changes mysteriously; every correction stores the previous value, new value, and staff identity.',
        metricOrTag: 'Security & Internal Audit',
        highlightType: 'security',
      },
    ],
    liveStatusLabel: 'Internal System / Client NDA',
    caseStudySlug: 'migrasi-erp-pabrik-cikarang',
    serviceSlug: 'software-custom',
    featured: false,
    draft: false,
    updatedAt: '2025-02-18',
    seo: {
      title: 'Custom Warehouse Inventory & PO Approval System Portfolio | CHESTAADOTCOM',
      description:
        'Visual showcase of a custom ERP warehouse inventory and Purchase Order approval module built with React, Node.js, and PostgreSQL.',
    },
  },

  // 6. AI AGENT (Professional Services)
  {
    slug: 'asisten-kualifikasi-klien-konsultan',
    title: 'B2B Lead Qualification & Consultant Scheduling Agent',
    oneLiner:
      'WhatsApp AI agent that screens corporate prospect needs, logs structured summaries into internal CRM, and schedules discovery calls automatically.',
    category: 'ai-agent',
    categoryLabel: 'AI Agent',
    industry: 'Professional Services',
    client: 'Consulting & Professional Services Firm in South Tangerang',
    year: '2025',
    role: 'WhatsApp AI Agent Development & CRM Pipeline Integration',
    duration: '3 Weeks',
    stack: ['WhatsApp Cloud API', 'Python', 'Node.js', 'PostgreSQL', 'n8n'],
    cover: 'portfolioConsultantAgent',
    deviceFrame: 'phone',
    gallery: [
      {
        imageKey: 'portfolioGalleryArchitecture',
        caption:
          'B2B lead screening flow from the first WhatsApp message to CRM client card creation and calendar invite dispatch.',
        layout: 'full',
      },
      {
        imageKey: 'portfolioConsultantAgent',
        caption:
          'Natural conversation view as the agent asks about industry sector, company size, and target timeline.',
        layout: 'half',
      },
      {
        imageKey: 'portfolioGalleryMobileHandover',
        caption:
          'Structured prospect brief received by senior consultants before the discovery meeting begins.',
        layout: 'half',
      },
    ],
    summaryParagraphs: [
      'For consulting firms, law offices, and B2B agencies, senior partners often spend too much time asking basic screening questions to leads that may not fit their service scope. This agent handles initial qualification politely and systematically the moment a message arrives.',
      'Once it captures the prospect’s industry, core objective, and timeline, the agent logs the structured record into your CRM table and immediately offers open discussion slots from the consulting team’s calendar.',
    ],
    features: [
      {
        title: 'Natural & Concise Qualification Question Flow',
        description:
          'Gathers 3–4 key facts (industry, project scope, target timeline) through a polite executive-assistant conversation style.',
        metricOrTag: '24/7 B2B Qualification',
        highlightType: 'interface',
      },
      {
        title: 'Automated Lead Card Creation in CRM Database',
        description:
          'Q&A results are summarized directly into structured PostgreSQL columns so your team never re-types from chat logs.',
        metricOrTag: 'Instant CRM Sync',
        highlightType: 'architecture',
      },
      {
        title: 'Discovery Session Scheduling & Meeting Invites',
        description:
          'Connects qualified prospects straight to open consultant calendar slots complete with automated meeting reminders.',
        metricOrTag: 'Calendar & n8n Integration',
        highlightType: 'workflow',
      },
      {
        title: 'Instant Escalation for Priority / Enterprise Clients',
        description:
          'When a corporate prospect requires urgent discussion or custom contract terms, a priority alert is sent straight to the partner’s phone.',
        metricOrTag: 'Fast-Track Handover',
        highlightType: 'security',
      },
    ],
    liveStatusLabel: 'Internal System / Client NDA',
    serviceSlug: 'ai-agent',
    featured: false,
    draft: false,
    updatedAt: '2025-03-01',
    seo: {
      title: 'B2B Lead Qualification & CRM AI Agent Portfolio | CHESTAADOTCOM',
      description:
        'Visual showcase of a WhatsApp AI assistant for B2B lead qualification, automated CRM logging, and meeting scheduling for professional service firms.',
    },
  },
];
