import type { CaseStudyItem, CaseStudyServiceFilter } from './case-studies';

export const CASE_STUDY_SERVICE_FILTERS_EN: Array<{
  id: CaseStudyServiceFilter;
  label: string;
}> = [
  { id: 'semua', label: 'All Services' },
  { id: 'ai-agent', label: 'AI Agent' },
  { id: 'software-custom', label: 'Custom Software' },
  { id: 'otomasi-workflow', label: 'Workflow Automation' },
  { id: 'pembuatan-website', label: 'Website & Landing Page' },
];

/**
 * 1:1 faithful English translation of CASE_STUDIES_DATA in /src/data/case-studies.ts.
 * Same facts, sections, order, structure, block types, and placeholders.
 */
export const CASE_STUDIES_DATA_EN: CaseStudyItem[] = [
  // ==========================================================================
  // 1. CLINIC & HEALTHCARE — AI AGENT & RESERVATION AUTOMATION
  // ==========================================================================
  {
    slug: 'otomasi-reservasi-klinik-estetika',
    title:
      'Handling After-Hours Patient Chats & Stopping Doctor Schedule Conflicts',
    oneSentenceSummary:
      'How an aesthetic clinic connected its official WhatsApp to doctor practice calendars so night-time patients are served immediately without inventing medical advice.',
    client: 'Aesthetic & Skin Care Clinic in BSD City',
    industry: 'Clinic & Healthcare',
    services: ['AI Agent', 'Website & Landing Page Development'],
    serviceSlugs: ['ai-agent', 'pembuatan-website'],
    year: '2025',
    duration: '3 Weeks',
    publishedAt: '2025-03-10',
    updatedAt: '2025-03-12',
    cover: 'portfolioClinicPlaceholder',
    summary: {
      problem:
        'Evening patient chats from paid ads were only answered the next morning, while manual doctor scheduling across notebooks and spreadsheets caused double-bookings.',
      solution:
        'Built a WhatsApp AI agent with real-time PostgreSQL doctor slot lookup tools, strict anti-diagnosis guardrails, and smooth human receptionist handover.',
      result:
        'Initial chat responses happen within seconds 24/7, doctor schedules are locked in a single source of truth, and H-1 reminders run automatically.',
    },
    sections: [
      {
        id: 'konteks-bisnis',
        number: '01',
        title: 'Business context',
        eyebrow: 'OPERATIONAL BACKGROUND',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'This aesthetic clinic relies on Instagram ad campaigns and local search to attract skin consultation and recurring treatment patients. All patient bookings funneled into a single receptionist WhatsApp number managed by staff who also handled walk-in cashier payments at the branch.',
              'During evening after-work hours between 7:00 PM and 10:30 PM, WhatsApp message traffic hit its daily peak as prospective patients finally had time to check their phones and ask about treatment prices and weekend doctor availability.',
            ],
          },
        ],
      },
      {
        id: 'masalah',
        number: '02',
        title: 'The problem',
        eyebrow: 'BOTTLENECKS & PREVIOUS ATTEMPTS',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'When receptionists only replied at 9:00 AM the next morning, many prospective patients had already lost interest or booked with another clinic that responded faster. During busy daytime hours, admins were also overwhelmed switching between three separate doctor schedule spreadsheets while serving walk-in patients.',
              'As a result, two patients were occasionally booked into the exact same hour and treatment room because an admin misread a spreadsheet row that had not been refreshed by a shift colleague.',
            ],
          },
          {
            type: 'previous-attempts',
            title: 'What was tried previously',
            attempts: [
              {
                method: 'Default WhatsApp Business after-hours auto-reply',
                whyItFailed:
                  'Only sent a static "Thank you, we will reply tomorrow morning" message, leaving prospective patients unsure whether Saturday doctor slots were still open or full.',
              },
              {
                method: 'Numbered menu chatbot ("Type 1 for Prices, Type 2 for Schedule")',
                whyItFailed:
                  'Aesthetic clinic patients rarely type menu numbers; they send natural questions like "Hi, can I book an acne facial with Dr. this Sunday afternoon?", causing rigid menu bots to stall.',
              },
              {
                method: 'Sharing a Google Sheet schedule between 2 admins',
                whyItFailed:
                  'When opened on smartphones, table rows were accidentally shifted or slow to refresh, still resulting in overlapping bookings.',
              },
            ],
          },
        ],
      },
      {
        id: 'pendekatan',
        number: '03',
        title: 'Approach',
        eyebrow: 'ARCHITECTURAL DECISIONS & TRADE-OFFS',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Instead of letting AI answer everything freely, we designed an architecture that splits conversations into two strict tracks: structured information & scheduling executed by the agent, and medical consultations handed over to human staff.',
              'Every technical decision weighed daily ease of use for your front-desk receptionists, including explicit trade-offs agreed upon in week one.',
            ],
          },
          {
            type: 'trade-offs',
            items: [
              {
                decision: 'Restricting AI strictly to the official catalog & blocking medical advice',
                whyChosen:
                  'In healthcare and aesthetics, a single hallucinated dosage or treatment indication can ruin patient trust.',
                tradeOff:
                  'Around% of chats asking about specific skin conditions are not completed by the bot alone, requiring a final reply from an admin or doctor during working hours.',
              },
              {
                decision: 'Using a centralized PostgreSQL database instead of reading Google Sheets directly',
                whyChosen:
                  'Prevents race conditions when two patients attempt to book the exact same evening time slot simultaneously.',
                tradeOff:
                  'Admin staff needed to adjust to viewing schedules through a lightweight web dashboard we provided rather than editing spreadsheet cells freely.',
              },
              {
                decision: 'Adding a confirmation step before locking a calendar slot',
                whyChosen:
                  'Ensures full name, treatment type, and arrival time are explicitly confirmed by the patient before locking the doctor’s slot in the database.',
                tradeOff:
                  'Adds one extra confirmation message to the chat flow, but eliminates slots being locked by casual browsers.',
              },
            ],
          },
        ],
      },
      {
        id: 'alur-sistem',
        number: '04',
        title: 'System flow',
        eyebrow: 'DATA EXECUTION SCHEMA',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'As soon as a message arrives on the clinic’s official WhatsApp Cloud API, the system parses intent, verifies guardrail boundaries, invokes the doctor slot lookup function, and logs the booking into the database.',
            ],
          },
          {
            type: 'diagram',
            diagram: {
              caption:
                'Patient WhatsApp message processing flow from guardrail check to PostgreSQL doctor slot lock.',
              nodes: [
                {
                  id: 'wa-in',
                  stepLabel: '01 · INPUT',
                  title: 'WhatsApp Cloud API',
                  subtitle: '24/7 incoming patient message',
                },
                {
                  id: 'guardrail',
                  stepLabel: '02 · FILTER',
                  title: 'AI Agent & Guardrail',
                  subtitle: 'Check catalog & medical bounds',
                },
                {
                  id: 'db-slot',
                  stepLabel: '03 · TOOL CALL',
                  title: 'PostgreSQL Slot Lock',
                  subtitle: 'Validate & lock doctor hour',
                },
                {
                  id: 'handover',
                  stepLabel: '04 · OUTPUT',
                  title: 'Confirm / Handover',
                  subtitle: 'Reply to patient & alert admin',
                },
              ],
            },
          },
        ],
      },
      {
        id: 'implementasi',
        number: '05',
        title: 'Implementation',
        eyebrow: 'BUILD & INTEGRATION PHASES',
        blocks: [
          {
            type: 'list',
            title: 'Components built across the 3-week rollout',
            items: [
              {
                title: 'Week 1 — Clinic SOP Mapping & Schedule Database Schema',
                detail:
                  'Structured the official treatment catalog, procedure durations (30/60/90 mins), per-doctor practice hours, and built the PostgreSQL slot tables.',
              },
              {
                title: 'Week 2 — WhatsApp Cloud API & Python Tool Calling Integration',
                detail:
                  'Connected the clinic WhatsApp number to a Python backend service with scoped read/write access to check_doctor_slots() and create_appointment().',
              },
              {
                title: 'Week 3 — Edge-Case Simulation, Admin Dashboard & H-1 Reminders',
                detail:
                  'Tested cancellation, rescheduling, and complaint escalation to receptionists, and activated automated reminders 24 hours prior to appointments.',
              },
            ],
          },
          {
            type: 'image',
            imageKey: 'portfolioGalleryArchitecture',
            caption:
              'Visualization of conversation handover architecture and centralized doctor schedule logging.',
          },
        ],
      },
      {
        id: 'hasil',
        number: '06',
        title: 'Results',
        eyebrow: 'BEFORE & AFTER COMPARISON',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Once deployed in daily branch operations, the most immediate improvements were the elimination of morning chat backlogs and orderly treatment room scheduling.',
            ],
          },
          {
            type: 'metrics',
            beforeAfter: [
              {
                aspect: 'Night-time chat response time (19:00–23:00)',
                before:
                  'Waited until opening hours the next morning (average delay of 10-12 hours).',
                after:
                  'Answered automatically in seconds complete with open doctor practice hour options.',
              },
              {
                aspect: 'Schedule logging & room conflict risk',
                before:
                  'Recorded manually in receptionist notebooks and separate spreadsheets, prone to double bookings.',
                after:
                  'Locked automatically in a single PostgreSQL database; filled slots cannot be booked twice.',
              },
              {
                aspect: 'Patient arrival reminders (H-1)',
                before:
                  'Admins copied reminder messages one by one when free, often skipped during busy clinic hours.',
                after:
                  'Sent automatically every afternoon for all next-day patients with instant attendance confirmation.',
              },
              {
                aspect: 'Specialized medical consultation handover',
                before:
                  'Patients had to repeat their symptoms from scratch when admin shifts changed.',
                after:
                  'Admins receive an escalation alert with a 3-bullet patient need summary on the dashboard.',
              },
            ],
          },
        ],
      },
      {
        id: 'yang-kami-pelajari',
        number: '07',
        title: 'What we learned',
        eyebrow: 'PRACTITIONER NOTES',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'The most important takeaway from this project is that AI agent success in a healthcare clinic is not determined by how long a paragraph the AI can write, but by how cleanly treatment durations and human handover boundaries are defined.',
              'When receptionists are involved from day one in deciding which questions should be answered automatically and which must be routed to them, branch adoption happens smoothly without internal team resistance.',
            ],
          },
          {
            type: 'quote',
            quote:
              'Never ask AI to guess schedules or invent treatment advice. Give it access to a deterministic schedule table, and let humans handle medical empathy.',
            contextLabel: 'AI Agent Design Principle — CHESTAADOTCOM',
          },
        ],
      },
    ],
    metrics: [],
    pullQuote: {
      text: 'Healthy clinic automation does not replace receptionist hospitality—it ensures a prospective patient messaging at 10 PM immediately gets schedule certainty.',
      attribution: 'System Architecture Note — CHESTAADOTCOM',
    },
    projectSlug: 'klinik-estetika-bsd-ai-booking',
    relatedServiceSlugs: ['ai-agent', 'pembuatan-website'],
    relatedPostSlugs: [
      'whatsapp-ai-automation-for-clinics-and-fnb-workflows',
      'why-slow-landing-pages-waste-ad-spend',
    ],
    draft: false,
    seo: {
      title:
        'WhatsApp AI Agent & Aesthetic Clinic Booking Case Study | CHESTAADOTCOM',
      description:
        'Full story of how we engineered a WhatsApp AI agent and doctor scheduling system for an aesthetic clinic in BSD City: initial bottlenecks, technical trade-offs, and results.',
    },
  },

  // ==========================================================================
  // 2. LOGISTICS & OPERATIONS — CUSTOM SOFTWARE & FLEET DASHBOARD
  // ==========================================================================
  {
    slug: 'sentralisasi-operasional-armada-logistik',
    legacySlugs: ['eliminasi-excel-logistik-surabaya'],
    title:
      'Replacing a Dozen Spreadsheets with a Centralized Delivery Note & Fleet Dashboard',
    oneSentenceSummary:
      'How a distribution company united warehouse manifest creation, driver status tracking, and billing recaps into a single internal web application.',
    client: 'Regional Distribution & Logistics Company',
    industry: 'Logistics & Operations',
    services: ['Custom Software', 'Workflow Automation'],
    serviceSlugs: ['software-custom', 'otomasi-workflow'],
    year: '2025',
    duration: '4 Weeks',
    publishedAt: '2025-03-04',
    updatedAt: '2025-03-08',
    cover: 'portfolioLogisticsDashboard',
    summary: {
      problem:
        'Delivery records were scattered across a dozen spreadsheet files and WhatsApp chat groups, causing duplicate delivery note numbers and delayed invoice billing.',
      solution:
        'Engineered a custom operations dashboard web app using React, Node.js, and PostgreSQL with role-based access (Warehouse, Dispatcher, Finance) and automated WhatsApp alerts.',
      result:
        'Delivery notes are issued from a single source with zero duplicate numbers, delivery statuses are tracked in real time, and finance exports ready-to-bill recaps in one click.',
    },
    sections: [
      {
        id: 'konteks-bisnis',
        number: '01',
        title: 'Business context',
        eyebrow: 'OPERATIONAL BACKGROUND',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'This distribution company delivers goods daily to dozens of retail points and partner warehouses using an internal fleet. Every shipment passes through three separate divisions: warehouse admins preparing item manifests, field dispatchers assigning drivers, and the finance team issuing billing invoices once goods are received.',
              'For several years, coordination across all three divisions relied on daily Excel files and photos of physical delivery notes sent into an operational WhatsApp group.',
            ],
          },
        ],
      },
      {
        id: 'masalah',
        number: '02',
        title: 'The problem',
        eyebrow: 'BOTTLENECKS & PREVIOUS ATTEMPTS',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'The bottleneck grew severe as daily shipment volume increased and staff worked across two shifts. Warehouse admins frequently copied the previous day’s file template, leading to duplicate delivery note numbers or accidentally deleted summary formulas.',
              'Downstream, the finance team had to manually match hundreds of proof-of-delivery photos in chat groups against spreadsheet rows one by one before sending invoices to corporate clients.',
            ],
          },
          {
            type: 'previous-attempts',
            title: 'What was tried previously',
            attempts: [
              {
                method: 'Using a single shared cloud spreadsheet for all divisions',
                whyItFailed:
                  'Because everyone had full edit permissions on the same sheet, warehouse staff occasionally overwrote finance pricing columns by mistake, and the file lagged heavily as transaction rows piled up.',
              },
              {
                method: 'Trialing an off-the-shelf SaaS logistics ERP subscription',
                whyItFailed:
                  'License fees were billed per user every month, while the interface had too many complex accounting menus that confused warehouse staff on the floor.',
              },
            ],
          },
        ],
      },
      {
        id: 'pendekatan',
        number: '03',
        title: 'Approach',
        eyebrow: 'ARCHITECTURAL DECISIONS & TRADE-OFFS',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'We took a custom software engineering approach that displays only the workspace relevant to each staff role. Warehouse staff only see outbound item queues and the print delivery note button, whereas contract values and billing statuses are visible exclusively to finance and management accounts.',
              'Below are the architectural decisions and technical trade-offs we agreed upon with the business owner:',
            ],
          },
          {
            type: 'trade-offs',
            items: [
              {
                decision: 'Responsive web application (PWA-ready) instead of building separate native iOS/Android apps',
                whyChosen:
                  'Compressed build time to 4 weeks and enabled instant feature updates across all warehouse desktop computers and field coordinator phones.',
                tradeOff:
                  'Requires a mobile internet connection when drivers or coordinators update arrival status at destination points.',
              },
              {
                decision: 'Status notifications via WhatsApp API instead of building full live-map GPS tracking',
                whyChosen:
                  'The most urgent need for management and clients was milestone certainty (Departed, Arrived, Unloaded) with proof-of-delivery photos, rather than second-by-second map coordinates.',
                tradeOff:
                  'Does not show live moving truck pins on a map, but saves GPS hardware costs and keeps the system fast.',
              },
              {
                decision: 'Sequential document numbering locked at the PostgreSQL transaction level',
                whyChosen:
                  'Guarantees two delivery notes can never share an identical number even if two admins click save at the exact same second.',
                tradeOff:
                  'Mismatched delivery notes cannot be hard-deleted from the database; they must be marked "Void" to preserve a clean audit trail.',
              },
            ],
          },
        ],
      },
      {
        id: 'alur-sistem',
        number: '04',
        title: 'System flow',
        eyebrow: 'DATA EXECUTION SCHEMA',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Data flows in one clean direction from warehouse manifest creation to ready-to-bill finance queues with zero manual re-typing between divisions.',
            ],
          },
          {
            type: 'diagram',
            diagram: {
              caption:
                'Single-door workflow from warehouse manifest issuance to automated invoice recaps at the finance desk.',
              nodes: [
                {
                  id: 'manifest',
                  stepLabel: '01 · WAREHOUSE',
                  title: 'Manifest Input',
                  subtitle: 'Issue unique Delivery Note ID',
                },
                {
                  id: 'dispatch',
                  stepLabel: '02 · DISPATCH',
                  title: 'Fleet Assignment',
                  subtitle: 'Select route & assigned driver',
                },
                {
                  id: 'pod',
                  stepLabel: '03 · FIELD',
                  title: 'Arrival Confirmation',
                  subtitle: 'Upload proof & WA to client',
                },
                {
                  id: 'finance',
                  stepLabel: '04 · FINANCE',
                  title: 'Ready-to-Bill Queue',
                  subtitle: 'Instant invoice recap export',
                },
              ],
            },
          },
        ],
      },
      {
        id: 'implementasi',
        number: '05',
        title: 'Implementation',
        eyebrow: 'BUILD & INTEGRATION PHASES',
        blocks: [
          {
            type: 'list',
            title: 'Execution steps without halting daily deliveries',
            items: [
              {
                title: 'Week 1 — Delivery Note Template Audit & Role-Based Access Schema Design',
                detail:
                  'Mapped all mandatory fields required on printed delivery notes and separated access permissions across 3 core roles (Warehouse, Operations, Finance).',
              },
              {
                title: 'Week 2 — Manifest Module, Fleet Assignment & Print Document Generator',
                detail:
                  'Built a fast table interface with instant search and clean browser-based delivery note printing.',
              },
              {
                title: 'Week 3 — WhatsApp Notification Integration & Field Confirmation Module',
                detail:
                  'Connected automated message triggers when shipment status changes to "In Transit" and "Goods Received".',
              },
              {
                title: 'Week 4 — Master Client Data Migration & Shift Staff Onboarding',
                detail:
                  'Migrated customer lists and route rates from legacy Excel files into PostgreSQL, followed by hands-on floor training with warehouse staff.',
              },
            ],
          },
          {
            type: 'image',
            imageKey: 'portfolioLogisticsDashboard',
            caption:
              'Fleet monitoring dashboard view and daily delivery note status filters.',
          },
        ],
      },
      {
        id: 'hasil',
        number: '06',
        title: 'Results',
        eyebrow: 'BEFORE & AFTER COMPARISON',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Moving from disconnected files to a single centralized database eliminated data discrepancy disputes between the warehouse and billing teams.',
            ],
          },
          {
            type: 'metrics',
            beforeAfter: [
              {
                aspect: 'Delivery note issuance & document numbering',
                before:
                  'Typed manually in per-branch spreadsheets, prone to duplicate numbers and broken formulas.',
                after:
                  'Issued automatically from the central database in a standardized print format with one click.',
              },
              {
                aspect: 'Proof of Delivery (POD) tracking',
                before:
                  'Delivery note photos piled up in WhatsApp chat groups and were hard to find during client claims.',
                after:
                  'Stored neatly attached to each specific delivery note number with timestamp and staff attribution.',
              },
              {
                aspect: 'Weekly/monthly billing recap process (Finance)',
                before:
                  'Copied and cross-checked hundreds of delivery rows manually before creating invoices.',
                after:
                  'Filter shipments marked "Completed" and download ready-to-bill recaps in seconds.',
              },
              {
                aspect: 'License cost for adding staff accounts',
                before:
                  'Constrained by per-seat monthly subscription fees on commercial SaaS platforms.',
                after:
                  'Free to add warehouse, coordinator, and admin accounts with zero per-user license fees.',
              },
            ],
          },
        ],
      },
      {
        id: 'yang-kami-pelajari',
        number: '07',
        title: 'What we learned',
        eyebrow: 'PRACTITIONER NOTES',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'For field operations teams working under tight truck departure deadlines, input speed matters far more than decorative visual flourishes. Trimming form fields down to only what is strictly essential made warehouse staff comfortable leaving their old spreadsheets behind.',
              'Furthermore, storing an immutable audit trail (who changed what status and at what time) proved to be the business owner’s favorite feature because it built healthy cross-division accountability.',
            ],
          },
          {
            type: 'quote',
            quote:
              'Good internal software does not force warehouse staff to act like accountants; it simplifies input screens upstream so financial reports downstream are automatically clean.',
            contextLabel: 'Custom Software Design Principle — CHESTAADOTCOM',
          },
        ],
      },
    ],
    metrics: [],
    pullQuote: {
      text: 'When the warehouse, fleet coordinators, and finance team look at the exact same table of truth, hours previously wasted hunting down data discrepancies go back into serving deliveries.',
      attribution: 'System Engineering Note — CHESTAADOTCOM',
    },
    projectSlug: 'dashboard-operasional-logistik-tangsel',
    relatedServiceSlugs: ['software-custom', 'otomasi-workflow'],
    relatedPostSlugs: [
      'how-much-does-a-business-website-cost-pricing-guide',
      'whatsapp-ai-automation-for-clinics-and-fnb-workflows',
    ],
    draft: false,
    seo: {
      title:
        'Logistics Operations & Delivery Note Dashboard Case Study | CHESTAADOTCOM',
      description:
        'Full story of building a centralized fleet operations and digital delivery note web application to replace a dozen manual spreadsheets.',
    },
  },

  // ==========================================================================
  // 3. F&B & RETAIL — MULTI-BRANCH POS RECAP WORKFLOW AUTOMATION
  // ==========================================================================
  {
    slug: 'sinkronisasi-rekap-pos-fnb-multi-cabang',
    legacySlugs: ['migrasi-erp-pabrik-cikarang'],
    title:
      'Multi-Branch POS Cashier Recap Automation & Low-Stock Alerts to the Owner’s WhatsApp',
    oneSentenceSummary:
      'How a restaurant and cafe chain eliminated nightly manual CSV downloads and delivered automated net revenue digests at 10:00 PM WIB.',
    client: 'Restaurant & Cafe Chain in Gading Serpong',
    industry: 'F&B & Retail',
    services: ['Workflow Automation', 'Custom Software'],
    serviceSlugs: ['otomasi-workflow', 'software-custom'],
    year: '2024',
    duration: '2 Weeks',
    publishedAt: '2025-02-20',
    updatedAt: '2025-02-26',
    cover: 'portfolioFnbPlaceholder',
    summary: {
      problem:
        'Admin staff had to download CSV reports from each branch cashier app and merge them manually into spreadsheets, so the owner only saw sales numbers the next afternoon.',
      solution:
        'Built an automation pipeline using n8n, Python reconciliation scripts, a PostgreSQL database, and nightly WhatsApp Cloud API digests triggered at store closing.',
      result:
        'Net revenue per branch, delivery app commission deductions, and low-stock ingredient lists arrive automatically on the owner’s phone every night at 10:00 PM WIB.',
    },
    sections: [
      {
        id: 'konteks-bisnis',
        number: '01',
        title: 'Business context',
        eyebrow: 'OPERATIONAL BACKGROUND',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'An F&B business operating across multiple branches handles hundreds of daily transactions split between dine-in, takeaway, and online delivery platforms. Each branch closes its cashier register around 9:30 PM.',
              'The business owner needed net sales figures and core ingredient stock positions that same night to decide on fresh supplier orders for the next morning.',
            ],
          },
        ],
      },
      {
        id: 'masalah',
        number: '02',
        title: 'The problem',
        eyebrow: 'BOTTLENECKS & PREVIOUS ATTEMPTS',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'While their Point of Sale (POS) cashier app provided reports, data was separated by branch account and did not cleanly separate delivery platform promo discounts according to internal bookkeeping rules.',
              'Every morning, an admin had to log into each branch account, download CSV files, clean up columns in a spreadsheet, and calculate kitchen ingredient usage variances. Whenever the admin was on leave or sick, the owner had no daily report.',
            ],
          },
          {
            type: 'previous-attempts',
            title: 'What was tried previously',
            attempts: [
              {
                method: 'Asking branch head cashiers to type manual summaries in a WhatsApp group at closing',
                whyItFailed:
                  'Branch staff were exhausted after evening service hours, leading to frequent typos in nominal figures or forgotten void/refund adjustments.',
              },
              {
                method: 'Using chained IMPORTRANGE formulas in Google Sheets',
                whyItFailed:
                  'Frequently threw loading errors (#REF! / Loading...) once monthly transaction rows crossed tens of thousands of entries across branches.',
              },
            ],
          },
        ],
      },
      {
        id: 'pendekatan',
        number: '03',
        title: 'Approach',
        eyebrow: 'ARCHITECTURAL DECISIONS & TRADE-OFFS',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'We chose not to replace the front-of-house POS cashier app that staff already knew well. Instead, we built a background automation layer that pulls transaction data on a schedule, processes it using the client’s exact accounting rules, and delivers the output to the channel the owner opens most: WhatsApp.',
            ],
          },
          {
            type: 'trade-offs',
            items: [
              {
                decision: 'Keeping the existing POS & building an n8n + Python automation connector',
                whyChosen:
                  'Avoided hardware replacement costs and required zero retraining for branch cashiers.',
                tradeOff:
                  'Data extraction depends on branch cashier tablets syncing to the internet during closing between 9:30 PM and 10:00 PM WIB.',
              },
              {
                decision: 'Adding a 3x auto-retry mechanism with 15-minute intervals',
                whyChosen:
                  'Occasionally a cashier tablet at one branch connected late to Wi-Fi during nightly closing.',
                tradeOff:
                  'If one branch has not synced by 10:00 PM, the owner’s WhatsApp digest displays the branches already received along with a clear note indicating which branch is awaiting retry sync.',
              },
              {
                decision: 'Storing reconciled records in PostgreSQL before dispatching to WhatsApp',
                whyChosen:
                  'Ensures the business owner retains auditable monthly historical data at any time without bloating spreadsheet files.',
                tradeOff:
                  'Requires updating the menu-mapping script whenever management launches a new product category in the POS.',
              },
            ],
          },
        ],
      },
      {
        id: 'alur-sistem',
        number: '04',
        title: 'System flow',
        eyebrow: 'DATA EXECUTION SCHEMA',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Every night at 10:00 PM WIB sharp, a scheduled cron trigger executes the data pull, recipe ingredient deduction math, database archival, and WhatsApp report dispatch.',
            ],
          },
          {
            type: 'diagram',
            diagram: {
              caption:
                'n8n and Python automation pipeline from branch POS transaction extraction to owner WhatsApp digest delivery.',
              nodes: [
                {
                  id: 'pos-pull',
                  stepLabel: '01 · CRON 22:00',
                  title: 'Pull Branch POS Data',
                  subtitle: 'Fetch daily sales & voids',
                },
                {
                  id: 'python-recon',
                  stepLabel: '02 · PROCESS',
                  title: 'Python Reconciliation',
                  subtitle: 'Compute net sales & COGS stock',
                },
                {
                  id: 'pg-store',
                  stepLabel: '03 · ARCHIVE',
                  title: 'PostgreSQL Database',
                  subtitle: 'Store report & check stock limits',
                },
                {
                  id: 'wa-report',
                  stepLabel: '04 · REPORT',
                  title: 'WhatsApp Digest',
                  subtitle: 'Send revenue & reorder list',
                },
              ],
            },
          },
        ],
      },
      {
        id: 'implementasi',
        number: '05',
        title: 'Implementation',
        eyebrow: 'BUILD & INTEGRATION PHASES',
        blocks: [
          {
            type: 'list',
            title: 'Focused execution across 2 weeks',
            items: [
              {
                title: 'Week 1 — POS Data Connector, Commission Formulas & Ingredient Mapping',
                detail:
                  'Connected each branch transaction report endpoint to the n8n workflow and wrote Python scripts to calculate net deductions per payment method alongside core ingredient usage.',
              },
              {
                title: 'Week 2 — Executive WhatsApp Message Formatting, Auto-Retry & Parallel Testing',
                detail:
                  'Designed the WhatsApp digest layout so it reads clearly in 15 seconds on a phone screen, complete with parallel testing against manual admin recaps to verify 100% figure accuracy.',
              },
            ],
          },
          {
            type: 'image',
            imageKey: 'portfolioGalleryAnalytics',
            caption:
              'Visualization of daily workflow execution logs and multi-branch ingredient stock monitoring.',
          },
        ],
      },
      {
        id: 'hasil',
        number: '06',
        title: 'Results',
        eyebrow: 'BEFORE & AFTER COMPARISON',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'The business owner now closes every day with full visibility into each branch’s performance without waiting for admin staff to arrive at the office the next morning.',
            ],
          },
          {
            type: 'metrics',
            beforeAfter: [
              {
                aspect: 'Daily sales report availability',
                before:
                  'Only finished being compiled the next day around 11:00 AM–1:00 PM.',
                after:
                  'Arrives automatically on the owner’s WhatsApp every night at 10:00 PM WIB right after store closing.',
              },
              {
                aspect: 'Admin CSV copy-paste workload',
                before:
                  'Downloaded and merged files from each branch manually every morning.',
                after:
                  'Runs automatically in the background; admin focuses on checking anomalies and supplier purchasing.',
              },
              {
                aspect: 'Low kitchen ingredient detection',
                before:
                  'Often discovered late when kitchen staff reported running low during lunch rush.',
                after:
                  'Ingredients hitting minimum thresholds are listed in the nightly report for morning ordering.',
              },
              {
                aspect: 'Handling branch cashier internet drops',
                before:
                  'Branch data was missing from daily recaps if a cashier forgot to send reports before going home.',
                after:
                  'Workflow runs scheduled auto-retries and displays transparent sync status indicators.',
              },
            ],
          },
        ],
      },
      {
        id: 'yang-kami-pelajari',
        number: '07',
        title: 'What we learned',
        eyebrow: 'PRACTITIONER NOTES',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'In F&B operational automation, the best report is not a dashboard with twenty complex charts nobody opens—it is a single structured message arriving on time inside the app you already check every day.',
              'Including transparent error-handling logic (such as an honest notice when one branch’s Wi-Fi has not synced yet) gives business owners complete confidence in the numbers delivered by the system.',
            ],
          },
          {
            type: 'quote',
            quote:
              'You do not always need to rip out legacy software that already works at the register. Often all you need is an automated bridge that eliminates the copy-paste work in between.',
            contextLabel: 'Workflow Automation Principle — CHESTAADOTCOM',
          },
        ],
      },
    ],
    metrics: [],
    pullQuote: {
      text: 'Next-morning supplier purchasing decisions are much calmer when net revenue recaps and remaining stock across all branches are already in your hand at 10 PM.',
      attribution: 'Operational Automation Note — CHESTAADOTCOM',
    },
    projectSlug: 'otomasi-rekap-pos-fnb-serpong',
    relatedServiceSlugs: ['otomasi-workflow', 'software-custom'],
    relatedPostSlugs: [
      'whatsapp-ai-automation-for-clinics-and-fnb-workflows',
      'how-much-does-a-business-website-cost-pricing-guide',
    ],
    draft: false,
    seo: {
      title:
        'Multi-Branch F&B POS Recap & WhatsApp Automation Case Study | CHESTAADOTCOM',
      description:
        'Full story of how we automated multi-branch F&B POS cashier data extraction in Gading Serpong using n8n, Python, PostgreSQL, and WhatsApp API.',
    },
  },
];
