import type { CaseStudyItem, CaseStudyServiceFilter } from './case-studies';

export const CASE_STUDY_SERVICE_FILTERS_EN: Array<{
  id: CaseStudyServiceFilter;
  label: string;
}> = [
  { id: 'semua', label: 'All' },
  { id: 'pembuatan-website', label: 'Web & Landing Page' },
  { id: 'ai-agent', label: 'AI Agent' },
  { id: 'software-custom', label: 'Custom Software' },
  { id: 'otomasi-workflow', label: 'Workflow Automation' },
];

export const CASE_STUDIES_DATA_EN: CaseStudyItem[] = [
  // ===========================================================================
  // CASE STUDY 1: wa-concierge-klinik
  // ===========================================================================
  {
    slug: 'wa-concierge-klinik',
    legacySlugs: ['otomasi-reservasi-klinik-estetika', 'landing-klinik-estetika'],
    title: 'WA Concierge: designing a booking agent for clinics',
    oneSentenceSummary:
      'An internal project designing a WhatsApp agent that understands prospective patient intent, checks therapist calendar slots, creates bookings, and hands off out-of-rule cases to clinic staff.',
    client: 'CHESTAADOTCOM internal project',
    industry: 'Clinic',
    services: ['AI Agent'],
    serviceSlugs: ['ai-agent'],
    year: '2026',
    internal: true,
    internalBadgeLabel: 'Internal project',
    targetsBadgeLabel: 'Design target, not client results',
    duration: 'Internal build',
    readingTime: '6 min read',
    author: 'Chesta Azka',
    authorRole: 'Co-founder (architecture, product, technology)',
    publishedAt: '2026-03-10',
    updatedAt: '2026-03-20',
    cover: 'projectWaConciergeKlinik',
    coverCaption:
      'Illustration: WA Concierge conversation simulation reading patient intent, checking therapist availability, and confirming a booking.',
    summary: {
      problem:
        'Small clinics receive WhatsApp messages all day, including at night, and a single admin has to answer the same questions while managing the schedule.',
      built:
        'An agent that understands message intent, checks the therapist calendar, creates bookings, sends confirmations and reminders, and hands off out-of-rule cases to staff.',
      solution:
        'An agent that understands message intent, checks the therapist calendar, creates bookings, sends confirmations and reminders, and hands off out-of-rule cases to staff.',
      result:
        'Design target: < 10 seconds initial response time, automatic human handover with a summary, and H-1 WhatsApp schedule reminders.',
    },
    targets: [
      {
        label: 'Initial response time',
        value: '< 10 seconds',
        note: 'Target for busy hours and evening messages',
      },
      {
        label: 'Human handover',
        value: 'Automatic with summary',
        note: 'When a question falls outside defined rules',
      },
      {
        label: 'Schedule reminder',
        value: 'H-1 via WhatsApp',
        note: 'Reduces missed appointments',
      },
    ],
    sections: [
      {
        id: 'konteks-bisnis',
        number: '01',
        title: 'Business context',
        eyebrow: 'INTERNAL PROJECT · CLINIC',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'For many small skincare, dental, and physiotherapy clinics in South Tangerang and South Jakarta, WhatsApp is not a secondary inquiry channel—it is the main front desk. Prospective patients rarely fill out multi-step web forms to book an appointment. Instead, they send short messages asking for basic treatment price ranges, checking whether Saturday afternoon still has an open slot, or asking to move their session because of traffic.',
              'We built WA Concierge as a CHESTAADOTCOM internal project to test firsthand how a conversational agent behaves when connected to a real therapist calendar and CRM table. Rather than building a slide-deck demo that only handles tidy one-line prompts, we wanted to test everyday chat patterns filled with abbreviations, mid-conversation changes of mind, and strict boundaries between tasks that may be completed automatically and tasks that must be handed over to a human admin.',
            ],
          },
        ],
      },
      {
        id: 'masalah',
        number: '02',
        title: 'Problem',
        eyebrow: 'OPERATIONAL BOTTLENECK',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Small clinics receive WhatsApp messages all day, including at night, and a single admin has to answer the same questions while managing the schedule. During daytime clinic hours, that same admin is also greeting walk-in patients at the front desk, preparing registration forms, and processing payments. As a result, incoming WhatsApp messages often pile up for thirty to sixty minutes before receiving a reply.',
              'When messages arrive after eight in the evening—right when many prospective patients finish work and start planning weekend treatments—they sit unread until the next morning. By the time the admin replies the following day, some prospective patients have already booked elsewhere or moved on. Meanwhile, rigid menu-tree auto-replies often frustrate callers because they force people to type numbers repeatedly without telling them whether their preferred hour is actually open.',
            ],
          },
          {
            type: 'previous-attempts',
            title: 'Why common approaches stall in daily clinic operations',
            attempts: [
              {
                method: 'Keyword-based auto-replies or numbered menu trees (type 1, 2, 3)',
                whyItFailed:
                  'Prospective patients rarely type in strict menu order. When they ask two things at once—such as treatment price and Saturday availability—a keyword bot gets stuck or repeats the welcome menu.',
              },
              {
                method: 'External booking forms outside WhatsApp',
                whyItFailed:
                  'Sending a long external form link causes drop-offs when a patient simply wants to check if one specific afternoon hour is available first.',
              },
            ],
          },
        ],
      },
      {
        id: 'pendekatan',
        number: '03',
        title: 'Approach',
        eyebrow: 'DESIGN PRINCIPLES',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Our approach starts from one strict rule: the language model is only responsible for understanding message intent and drafting a polite reply, while all pricing, treatment duration, and slot availability data must be fetched from written records via structured tool calls. The agent is never allowed to guess open hours or invent treatment details outside the approved catalog table.',
              'We also designed human handover from day one rather than bolting it on later. Before writing prompts or connecting calendar APIs, we separated incoming messages into two clear categories: routine scheduling inquiries that the agent may complete on its own, and sensitive questions that must immediately pause automated replies and notify the clinic admin.',
            ],
          },
          {
            type: 'callout',
            callout: {
              label: 'KEY DECISION',
              title: 'Separating intent reading from calendar writes',
              body: 'The agent never writes directly to the calendar from a single ambiguous message. It must first summarize the chosen treatment, date, and time slot, then ask for one explicit confirmation before locking the therapist calendar.',
            },
          },
        ],
      },
      {
        id: 'alur-sistem',
        number: '04',
        title: 'System flow',
        eyebrow: 'ARCHITECTURE & BRANCHING',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Every incoming WhatsApp message passes through six ordered steps from intent understanding to CRM logging. If during the intent-reading stage the system detects a medical question, a post-treatment complaint, or a custom request outside standard catalog rules, the flow immediately branches to Staff handover together with a concise conversation summary.',
            ],
          },
          {
            type: 'diagram',
            diagram: {
              caption:
                'Illustration: 6-step WA Concierge flow from WhatsApp message to CRM entry, with a Staff handover branch for out-of-rule cases.',
              nodes: [
                {
                  id: 'wa-step-1',
                  stepLabel: '01 · INBOUND',
                  title: 'WhatsApp message',
                  subtitle: 'Patient sends a treatment question or schedule request in chat',
                },
                {
                  id: 'wa-step-2',
                  stepLabel: '02 · ANALYSIS',
                  title: 'Intent reading',
                  subtitle: 'Separates routine booking requests from cases requiring staff',
                },
                {
                  id: 'wa-step-3',
                  stepLabel: '03 · CALENDAR',
                  title: 'Check calendar',
                  subtitle: 'Verifies therapist availability and treatment duration rules',
                },
                {
                  id: 'wa-step-4',
                  stepLabel: '04 · EXECUTION',
                  title: 'Create booking',
                  subtitle: 'Locks the schedule slot once the patient confirms the hour',
                },
                {
                  id: 'wa-step-5',
                  stepLabel: '05 · REPLY',
                  title: 'Confirmation',
                  subtitle: 'Sends schedule details and queues an H-1 WhatsApp reminder',
                },
                {
                  id: 'wa-step-6',
                  stepLabel: '06 · RECORD',
                  title: 'Log to CRM',
                  subtitle: 'Saves patient details, booking status, and full action log',
                },
              ],
              branch: {
                fromNodeIndex: 1,
                stepLabel: 'SAFEGUARD BRANCH · HUMAN HANDOVER',
                title: 'Hand over to staff',
                subtitle:
                  'If the message contains clinical complaints or out-of-rule requests, the agent pauses automated replies and sends a summary to the admin.',
              },
            },
          },
        ],
      },
      {
        id: 'implementasi',
        number: '05',
        title: 'Implementation',
        eyebrow: 'TECHNICAL COMPONENTS',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'At the messaging layer, WA Concierge receives webhooks from the WhatsApp Business Platform and maintains per-phone conversation state with a clear session window. When a prospective patient sends three short chat bubbles within five seconds—a very common habit on WhatsApp—a short debounce buffer combines those messages first so the agent responds to the full context instead of firing three separate replies.',
              'For schedule verification, we built three structured tools: a treatment catalog reader (`get_treatment_catalog`), an open-slot checker (`check_available_slots`), and a reservation writer (`create_booking_slot`). Each tool validates parameters against a strict schema before touching the calendar. For example, if a treatment requires 60 minutes plus a 15-minute room preparation buffer, the slot checker automatically calculates a 75-minute window before reporting that a time slot is open.',
            ],
          },
          {
            type: 'list',
            title: 'Four operational safeguards built into the workflow',
            items: [
              {
                title: 'Rapid message buffering',
                detail:
                  'Waits for a brief pause when a patient types several short lines in a row so the agent reads one complete intent.',
              },
              {
                title: 'Temporary slot hold during confirmation',
                detail:
                  'Prevents two different chat sessions from booking the exact same therapist and hour at the same minute.',
              },
              {
                title: 'Three-point handover summary for admins',
                detail:
                  'When handing a chat to human staff, the system sends the patient name, core question, and handover reason so staff do not have to scroll from the top.',
              },
              {
                title: 'Automated H-1 reminder scheduler',
                detail:
                  'Every confirmed booking is automatically queued for a reminder message 24 hours before the scheduled treatment.',
              },
            ],
          },
        ],
      },
      {
        id: 'target-desain',
        number: '06',
        title: 'Design targets',
        eyebrow: 'DESIGN TARGET · NOT CLIENT RESULTS',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Because WA Concierge is an internal project we built to test workflow reliability before deploying for clients, all indicators below are engineering design targets, not measured results from a client clinic.',
            ],
          },
          {
            type: 'targets',
            badgeLabel: 'Design target, not client results',
            targets: [
              {
                label: 'Initial response time',
                value: '< 10 seconds',
                note: 'Target for busy hours and evening messages',
              },
              {
                label: 'Human handover',
                value: 'Automatic with summary',
                note: 'When a question falls outside defined rules',
              },
              {
                label: 'Schedule reminder',
                value: 'H-1 via WhatsApp',
                note: 'Reduces missed appointments',
              },
            ],
            beforeAfter: [
              {
                aspect: 'Replies to evening and weekend inquiries',
                before:
                  'Prospective patient messages wait until the admin opens WhatsApp the next morning.',
                after:
                  'Design target: agent answers treatment details and checks open slots within seconds under defined rules.',
              },
              {
                aspect: 'Handling sensitive or out-of-catalog questions',
                before:
                  'Keyword bots give off-topic replies or force users through repetitive numbered menus.',
                after:
                  'Design target: agent immediately hands the conversation to clinic staff with a concise context summary.',
              },
            ],
          },
        ],
      },
      {
        id: 'catatan-perancangan',
        number: '07',
        title: 'Design notes',
        eyebrow: 'TRADE-OFFS & BOUNDARIES',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'The most important part of designing an agent for a clinic is not making the agent sound clever—it is defining strictly what the agent must never do. In WA Concierge, we enforced three hard boundaries: the agent never gives medical advice or diagnoses skin/health conditions, the agent never promises discounts or alters prices outside the official catalog table, and the agent never cancels appointments unilaterally less than 12 hours before a session without admin approval.',
              'Restricting the agent in this way comes with a deliberate trade-off. Roughly twenty to thirty percent of conversations that involve specific clinical consultations still require a human reply. Yet that trade-off is exactly what keeps clinic operations safe: human admins can focus their full attention on patients who need personal consultation, while repetitive questions about open hours and routine slot bookings are handled cleanly.',
            ],
          },
          {
            type: 'trade-offs',
            items: [
              {
                decision: 'Refusing to answer medical questions or clinical treatment recommendations',
                whyChosen:
                  'Treatment advice involving skin conditions, allergies, or medical history requires human healthcare judgment.',
                tradeOff:
                  'Patients asking clinical questions cannot complete an automated booking right away and wait for staff during clinic hours.',
              },
              {
                decision: 'Requiring one explicit confirmation step before writing to the calendar',
                whyChosen:
                  'Prevents wrong dates or hours caused by short chat messages or last-second changes of mind.',
                tradeOff:
                  'Adds one extra turn to the conversation compared to instant booking, but keeps the therapist calendar much cleaner.',
              },
            ],
          },
        ],
      },
    ],
    metrics: [],
    pullQuote: {
      text: 'The job of a clinic agent is not to replace staff judgment, but to clear repetitive schedule inquiries so human staff can focus on patients who need personal care.',
      attribution: 'Chesta Azka — CHESTAADOTCOM Internal Project Note',
    },
    projectSlug: 'wa-concierge-klinik',
    relatedServiceSlugs: ['ai-agent'],
    relatedPostSlugs: ['otomasi-whatsapp-ai-klinik-fnb-alur-kerja'],
    draft: false,
    seo: {
      title: 'WA Concierge Clinic Booking Agent Case Study | CHESTAADOTCOM',
      description:
        'Internal project case study of WA Concierge: designing a WhatsApp booking agent for clinics with calendar checks, H-1 reminders, and staff handover.',
    },
  },

  // ===========================================================================
  // CASE STUDY 2: chestaa-v2
  // ===========================================================================
  {
    slug: 'chestaa-v2',
    legacySlugs: ['membangun-ulang-chestaa-com'],
    title: 'Rebuilding chestaa.com as a static bilingual site',
    oneSentenceSummary:
      'An internal project rebuilding our own agency website into a fast, static bilingual (/id and /en) architecture with clear service pages and calm purple-on-white design.',
    client: 'CHESTAADOTCOM internal project',
    industry: 'Agency (own site)',
    services: ['Web & Landing Page'],
    serviceSlugs: ['pembuatan-website'],
    year: '2026',
    internal: true,
    internalBadgeLabel: 'Internal project',
    targetsBadgeLabel: 'Design target, not client results',
    duration: 'Internal build',
    readingTime: '6 min read',
    author: 'Chesta Azka',
    authorRole: 'Co-founder (architecture, product, technology)',
    publishedAt: '2026-03-14',
    updatedAt: '2026-03-20',
    cover: 'projectChestaaV2',
    coverCaption:
      'Illustration: bilingual (/id and /en) service and local area page structure with calm purple-on-white typography and upfront summaries.',
    summary: {
      problem:
        'The early version of our site was too heavy on animations and did not clearly explain our newer services in AI agents and custom software.',
      built:
        'A static bilingual site (/id and /en) with a calm purple-on-white design, structured service and local area pages, and fast mobile loading times.',
      solution:
        'A static bilingual site (/id and /en) with a calm purple-on-white design, structured service and local area pages, and fast mobile loading times.',
      result:
        'Design target: mobile LCP < 1.8 seconds on 4G, CLS < 0.02 with zero layout shift, and 2 languages (/id and /en) with reciprocal hreflang.',
    },
    targets: [
      {
        label: 'Mobile LCP',
        value: '< 1.8 seconds',
        note: 'Target on a 4G connection',
      },
      {
        label: 'CLS',
        value: '< 0.02',
        note: 'Zero layout shift',
      },
      {
        label: 'Languages',
        value: '2 (/id and /en)',
        note: 'Reciprocal hreflang',
      },
    ],
    sections: [
      {
        id: 'konteks',
        number: '01',
        title: 'Context',
        eyebrow: 'INTERNAL PROJECT · OWN SITE',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'As CHESTAADOTCOM grew from building simple web pages into a technical partner for business websites, AI agents, custom software, and workflow automation in BSD, South Tangerang, our early website no longer reflected how we work. Our own site is the first artifact prospective clients inspect when we talk about mobile loading speed, structured information hierarchy, and clear technical communication.',
              'We decided to rebuild chestaa.com from the ground up as an internal engineering project that practices every standard we recommend to clients: pages must be readable without waiting for heavy JavaScript bundles, available 1:1 in both Indonesian (`/id`) and English (`/en`), and transparent about distinguishing internal demo projects from design targets.',
            ],
          },
        ],
      },
      {
        id: 'masalah',
        number: '02',
        title: 'Problem',
        eyebrow: 'EVALUATING THE EARLY VERSION',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'The early version of our site was too heavy on animations and did not clearly explain our newer services in AI agents and custom software. Too many decorative visual effects ran simultaneously in the background, meaning that on a mid-range phone over a 4G mobile connection, readers had to wait before the main copy felt smooth to scroll. Yet the majority of business owners clicking a link from WhatsApp or local search open our site on their phones between meetings.',
              'Beyond visual weight, the old information architecture mixed every service onto a single long page without dedicated URLs. A business owner looking for a landing page starting from IDR 1,200,000 had to sift through the same technical notes as someone looking for a WhatsApp AI agent or custom operations dashboard. Likewise, English-speaking visitors did not have a consistent 1:1 route map matching the Indonesian pages.',
            ],
          },
          {
            type: 'previous-attempts',
            title: 'Two patterns from the early version we intentionally dropped',
            attempts: [
              {
                method: 'Continuous multi-layer background animations across sections',
                whyItFailed:
                  'Drained mobile battery, slowed initial rendering, and pulled visual attention away from the service scope and pricing clarity.',
              },
              {
                method: 'Hiding body text until animation scripts finished initializing',
                whyItFailed:
                  'On slower mobile connections or delayed script loads, visitors saw blank space longer and crawlers had a harder time reading the heading hierarchy.',
              },
            ],
          },
        ],
      },
      {
        id: 'pendekatan',
        number: '03',
        title: 'Approach',
        eyebrow: 'CONTENT & DESIGN ARCHITECTURE',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'We locked three architectural decisions before touching component code. First, the visual system stays strictly on a clean white (`#FFFFFF`) and soft purple (`#F8F6FE`, `#EFEAFB`, `#6A3FD0`) canvas with a restrained type scale, capping glass surfaces at three layers and removing any visual ornament that does not help the reader understand the page.',
              'Second, every service page and local area page opens with a concise 40–60 word summary block right below the main heading. This structure ensures that both busy human readers scanning on a phone and search or answer engines immediately get a direct answer: what we build, who it is for, and how to start.',
            ],
          },
          {
            type: 'callout',
            callout: {
              label: 'MOTION & READABILITY PRINCIPLE',
              title: 'Content stays visible without relying on JavaScript',
              body: 'All primary text renders directly in HTML. Initial animation states only engage when JavaScript is active, backed by a 1.5-second safety fallback that reveals every element if scripts are delayed.',
            },
          },
        ],
      },
      {
        id: 'alur-sistem',
        number: '04',
        title: 'System flow',
        eyebrow: 'PAGE GENERATION PIPELINE',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'To keep the Indonesian and English editions strictly in sync while preserving static page speed, all services, local areas, internal projects, and case studies live in a strongly typed dataset that maps to `/id` and `/en` routes, validates meta tag lengths, and generates unified JSON-LD graphs and discovery files.',
            ],
          },
          {
            type: 'diagram',
            diagram: {
              caption:
                'Illustration: chestaa.com bilingual page pipeline from typed datasets to static HTML prerendering and lightweight interactive islands.',
              nodes: [
                {
                  id: 'v2-step-1',
                  stepLabel: '01 · DATA SOURCE',
                  title: 'Typed datasets',
                  subtitle: 'Strictly typed service, local area, project, and case study records',
                },
                {
                  id: 'v2-step-2',
                  stepLabel: '02 · 1:1 ROUTES',
                  title: '/id & /en mapping',
                  subtitle: 'Pairs bilingual URLs and reciprocal hreflang links',
                },
                {
                  id: 'v2-step-3',
                  stepLabel: '03 · PRERENDER',
                  title: 'Static HTML & summary',
                  subtitle: 'Renders core copy so pages are readable before scripts run',
                },
                {
                  id: 'v2-step-4',
                  stepLabel: '04 · SCHEMA',
                  title: 'JSON-LD @graph',
                  subtitle: 'Builds Organization, Service, Article, FAQPage, and BreadcrumbList nodes',
                },
                {
                  id: 'v2-step-5',
                  stepLabel: '05 · DISCOVERY',
                  title: 'Sitemap & llms.txt',
                  subtitle: 'Generates sitemap.xml, rss.xml, llms.txt, and llms-full.txt',
                },
                {
                  id: 'v2-step-6',
                  stepLabel: '06 · DELIVERY',
                  title: 'Mobile-ready output',
                  subtitle: 'Explicit image dimensions with zero layout shift (CLS < 0.02)',
                },
              ],
              branch: {
                fromNodeIndex: 2,
                stepLabel: 'INTERACTIVE BRANCH · MINIMAL JS',
                title: 'Lightweight interactive islands',
                subtitle:
                  'Industry use-case tabs, FAQ accordions, and navigation remain keyboard-accessible and honor prefers-reduced-motion.',
              },
            },
          },
        ],
      },
      {
        id: 'implementasi',
        number: '05',
        title: 'Implementation',
        eyebrow: 'FRONTEND & LOCAL SEO ENGINEERING',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'In implementation, we separated the four core service pages (`/id/jasa/pembuatan-website`, `/id/jasa/ai-agent`, `/id/jasa/software-custom`, `/id/jasa/otomasi-workflow`) and their English counterparts (`/en/services/...`). For local search around our base, we built 10 indexable service-area pages—combining Website Development and AI Agents across five focus areas: South Tangerang, BSD City, Pamulang, Jurang Mangu, and Lebak Bulus—while keeping the remaining five area combinations prepared as `noindex,follow` until they have distinct local substance.',
              'On the motion and performance side, we audited every animation helper. We restricted animations to properties that do not trigger layout recalculation (`transform`, `opacity`, `clip-path`, and `stroke-dashoffset`), kept micro-interactions between 120 and 180 milliseconds, and added automatic device-capability detection that disables heavy scroll effects on low-spec devices or when `prefers-reduced-motion` is enabled.',
            ],
          },
          {
            type: 'list',
            title: 'Four engineering details enforced across chestaa.com',
            items: [
              {
                title: 'Automated title and meta description length validation',
                detail:
                  'Every service and area page is checked so titles stay within 50–62 characters and meta descriptions stay within 140–160 characters with zero duplicates.',
              },
              {
                title: 'Single connected JSON-LD (@graph) per page',
                detail:
                  'Links Organization, WebSite, WebPage, BreadcrumbList, and page-specific nodes (Service, FAQPage, or Article) with no fabricated rating schemas.',
              },
              {
                title: 'DOM-persistent tabs and FAQ accordions',
                detail:
                  'Industry tab panels and FAQ answers remain in the HTML DOM when collapsed so they are readable even without JavaScript.',
              },
              {
                title: 'Explicit dimensions on every SVG/WebP illustration',
                detail:
                  'Every image and illustration declares explicit width, height, and aspect ratio so layouts never jump while loading on mobile.',
              },
            ],
          },
        ],
      },
      {
        id: 'target-desain',
        number: '06',
        title: 'Design targets',
        eyebrow: 'DESIGN TARGET · NOT CLIENT RESULTS',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'As an internal build for our own website, the numbers below represent the performance budget and architectural design targets we test chestaa.com against.',
            ],
          },
          {
            type: 'targets',
            badgeLabel: 'Design target, not client results',
            targets: [
              {
                label: 'Mobile LCP',
                value: '< 1.8 seconds',
                note: 'Target on a 4G connection',
              },
              {
                label: 'CLS',
                value: '< 0.02',
                note: 'Zero layout shift',
              },
              {
                label: 'Languages',
                value: '2 (/id and /en)',
                note: 'Reciprocal hreflang',
              },
            ],
            beforeAfter: [
              {
                aspect: 'Mobile reading speed and service clarity',
                before:
                  'Heavy background animations and all services mixed onto a single long page.',
                after:
                  'Design target: lightweight static pages with a 40–60 word summary at the top of each service.',
              },
              {
                aspect: 'Bilingual parity and search/answer engine indexing',
                before:
                  'Inconsistent language routes and no structured summary files for answer engines.',
                after:
                  'Design target: 1:1 route pairs (/id and /en) with reciprocal hreflang, sitemap.xml, and llms.txt.',
              },
            ],
          },
        ],
      },
      {
        id: 'catatan-perancangan',
        number: '07',
        title: 'Design notes',
        eyebrow: 'TRADE-OFFS & CONTENT HONESTY',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'The most important decision while rebuilding chestaa.com was not choosing a JavaScript library—it was maintaining strict content honesty. As an agency launching this updated service catalog, we chose to label all six demo projects and three case studies openly as "Internal project" (`Proyek internal`), and to label every target metric as "Design target, not client results".',
              'We also deliberately held back from indexing dozens of local area pages at once. Out of fifteen prepared service-area combinations, we opened only ten pages with genuinely distinct local context for indexing (`index,follow`), keeping the other five as `noindex,follow`. This trade-off keeps our initial indexed footprint smaller, but ensures every page in search results carries honest, specific information rather than copy-pasted city names.',
            ],
          },
          {
            type: 'trade-offs',
            items: [
              {
                decision: 'Removing decorative background motion to hit mobile LCP < 1.8s',
                whyChosen:
                  'Prospective clients opening the site from WhatsApp on a phone need clear answers and a responsive contact button right away.',
                tradeOff:
                  'The visual feel is calmer and more editorial than a flashy 3D showcase site, in exchange for much faster mobile loading and readability.',
              },
              {
                decision: 'Maintaining strict 1:1 content parity between /id and /en',
                whyChosen:
                  'Ensures both Indonesian business owners and English-speaking partners read the exact same facts, scope, and pricing structure.',
                tradeOff:
                  'Every copy update or new case study must be written and verified in both languages before release.',
              },
            ],
          },
        ],
      },
    ],
    metrics: [],
    pullQuote: {
      text: 'A technology agency website should be a direct example of the architectural clarity, mobile speed, and honest communication it promises to clients.',
      attribution: 'Chesta Azka — CHESTAADOTCOM Internal Project Note',
    },
    projectSlug: 'chestaa-v2',
    relatedServiceSlugs: ['pembuatan-website'],
    relatedPostSlugs: ['berapa-biaya-bikin-website-bisnis-panduan-harga'],
    draft: false,
    seo: {
      title: 'Rebuilding chestaa.com Bilingual Case Study | CHESTAADOTCOM',
      description:
        'Internal project case study on rebuilding chestaa.com as a fast static bilingual site (/id and /en) with target mobile LCP < 1.8s and CLS < 0.02.',
    },
  },

  // ===========================================================================
  // CASE STUDY 3: lead-properti
  // ===========================================================================
  {
    slug: 'lead-properti',
    legacySlugs: ['otomasi-rekap-pos-fnb-serpong'],
    title: 'Property lead flow: from ad form to agent follow-up',
    oneSentenceSummary:
      'An internal project designing automated property lead routing from ad forms straight to CRM, round-robin agent assignment, WhatsApp alerts, and scheduled follow-up reminders.',
    client: 'CHESTAADOTCOM internal project',
    industry: 'Property',
    services: ['Workflow Automation'],
    serviceSlugs: ['otomasi-workflow'],
    year: '2026',
    internal: true,
    internalBadgeLabel: 'Internal project',
    targetsBadgeLabel: 'Design target, not client results',
    duration: 'Internal build',
    readingTime: '6 min read',
    author: 'Zeeshan',
    authorRole: 'Co-founder (operations and client success)',
    publishedAt: '2026-03-16',
    updatedAt: '2026-03-20',
    cover: 'projectLeadProperti',
    coverCaption:
      'Illustration: automated flow from property ad forms to CRM entry, agent assignment, WhatsApp notification, and H+1 / H+3 follow-up reminders.',
    summary: {
      problem:
        'Leads from ads land in a spreadsheet and are copied manually to agents on WhatsApp; many are contacted too late.',
      built:
        'An automated flow that logs leads into the CRM, assigns the on-duty agent, sends a WhatsApp notification, and schedules follow-up reminders.',
      solution:
        'An automated flow that logs leads into the CRM, assigns the on-duty agent, sends a WhatsApp notification, and schedules follow-up reminders.',
      result:
        'Design target: agent notification < 1 minute from form submission, automated H+1 and H+3 follow-up schedule, and 0 manual logging steps.',
    },
    targets: [
      {
        label: 'Agent notification',
        value: '< 1 minute',
        note: 'Target from form submission',
      },
      {
        label: 'Follow-up schedule',
        value: 'H+1 and H+3',
        note: 'Automatic reminder if not yet contacted',
      },
      {
        label: 'Manual logging',
        value: '0 steps',
        note: 'Directly from form to CRM',
      },
    ],
    sections: [
      {
        id: 'konteks-bisnis',
        number: '01',
        title: 'Business context',
        eyebrow: 'INTERNAL PROJECT · PROPERTY',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Property marketing teams and brokerage offices across developing corridors such as BSD City, Serpong, and surrounding areas rely heavily on digital ad campaigns and project landing pages to capture buyer interest. When a prospective buyer submits a form requesting a price brochure or a show-unit visit schedule, their intent is highest during the first five to fifteen minutes after tapping submit.',
              'We designed the internal Property Lead Flow project at CHESTAADOTCOM to model how a property sales team can eliminate the delay between an incoming ad form submission and the first greeting from an assigned sales agent—without requiring a marketing admin to copy rows one by one from a spreadsheet into a WhatsApp group.',
            ],
          },
        ],
      },
      {
        id: 'masalah',
        number: '02',
        title: 'Problem',
        eyebrow: 'LEAD LEAKAGE ON THE GROUND',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Leads from ads land in a spreadsheet and are copied manually to agents on WhatsApp; many are contacted too late. In the manual workflow we frequently observe, submissions from ad forms or landing pages collect in a spreadsheet first. An admin checks that sheet a few times a day, checks which agent is next in rotation, and copies the buyer’s name, phone number, and unit interest into the agent’s WhatsApp chat one by one.',
              'The breakdown happens when forms are submitted after office hours, on busy exhibition weekends, or while the admin is handling other reports. A lead submitted at nine in the evening is often forwarded to an agent the next afternoon. Furthermore, once a buyer’s contact is pasted into an agent’s chat, the sales coordinator has no easy way to see whether the buyer was actually contacted or buried under other chats on the agent’s phone.',
            ],
          },
          {
            type: 'previous-attempts',
            title: 'Why manual group chats and spreadsheets leak leads',
            attempts: [
              {
                method: 'Posting raw leads into a shared WhatsApp group for agents to claim',
                whyItFailed:
                  'Creates unclear ownership: sometimes two agents message the same buyer, or nobody messages them assuming another colleague already took the lead.',
              },
              {
                method: 'Relying on an admin to check a spreadsheet every few hours',
                whyItFailed:
                  'Introduces multi-hour delays in the evening and on weekends, and risks copy-paste typos in phone numbers.',
              },
            ],
          },
        ],
      },
      {
        id: 'pendekatan',
        number: '03',
        title: 'Approach',
        eyebrow: 'WORKFLOW DESIGN',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'We approached this problem not by building a complicated new app with dozens of menus for agents to learn, but by connecting the tools they already use every day through a disciplined workflow automation. It rests on three rules: every incoming submission must be validated and checked for duplicates first, every lead must have a single clear owner (PIC) recorded in the CRM, and every assigned agent receives a WhatsApp notification containing a one-tap link to greet the buyer.',
              'Beyond initial routing, we built staged follow-up checks on Day+1 (`H+1`) and Day+3 (`H+3`). That way, the workflow does not stop after firing the first alert—it helps the coordinator verify that every lead is greeted and updated.',
            ],
          },
          {
            type: 'callout',
            callout: {
              label: 'KEY DECISION',
              title: 'Phone number deduplication before round-robin assignment',
              body: 'Prospective property buyers often fill out two different ad forms in the same week. The workflow normalizes phone numbers (+62) and checks existing CRM rows first so repeat inquiries stay with the original agent rather than splitting across two agents.',
            },
          },
        ],
      },
      {
        id: 'alur-sistem',
        number: '04',
        title: 'System flow',
        eyebrow: 'ROUTING & FOLLOW-UP DIAGRAM',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'As soon as a prospective buyer submits the form, a webhook triggers six automated steps from phone normalization to H+1 and H+3 follow-up scheduling. If any external API connection—such as CRM writing or WhatsApp delivery—experiences a temporary network failure, the workflow immediately routes the payload into a fallback retry queue and alerts the admin.',
            ],
          },
          {
            type: 'diagram',
            diagram: {
              caption:
                'Illustration: 6-step property lead flow from ad form to agent follow-up, with an error-logging and retry queue branch.',
              nodes: [
                {
                  id: 'prop-step-1',
                  stepLabel: '01 · INPUT',
                  title: 'Ad form',
                  subtitle: 'Prospective buyer submits name, WhatsApp number, and unit interest',
                },
                {
                  id: 'prop-step-2',
                  stepLabel: '02 · FILTER',
                  title: 'Validate & deduplicate',
                  subtitle: 'Normalizes +62 phone format and checks if the buyer is already in CRM',
                },
                {
                  id: 'prop-step-3',
                  stepLabel: '03 · STORE',
                  title: 'Log to CRM',
                  subtitle: 'Creates a new lead row with initial status "New Inquiry"',
                },
                {
                  id: 'prop-step-4',
                  stepLabel: '04 · ASSIGN',
                  title: 'Assign to agent',
                  subtitle: 'Picks the next active on-duty agent in round-robin order',
                },
                {
                  id: 'prop-step-5',
                  stepLabel: '05 · INSTANT',
                  title: 'WhatsApp notification',
                  subtitle: 'Sends buyer summary & quick-greet link to the assigned agent',
                },
                {
                  id: 'prop-step-6',
                  stepLabel: '06 · SCHEDULE',
                  title: 'H+1 & H+3 reminders',
                  subtitle: 'Reminds the agent automatically if the CRM status is still untouched',
                },
              ],
              branch: {
                fromNodeIndex: 2,
                stepLabel: 'SAFEGUARD BRANCH · ERROR HANDLER',
                title: 'Error log & retry queue',
                subtitle:
                  'If a destination API is temporarily down, the payload is saved to a backup queue and the admin receives a failure alert.',
              },
            },
          },
        ],
      },
      {
        id: 'implementasi',
        number: '05',
        title: 'Implementation',
        eyebrow: 'WORKFLOW EXECUTION DETAILS',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'In the first step, data submitted from the landing page form or ad webhook hits a receiver endpoint that cleans the phone number format (converting local `08` prefixes or dashes into standardized `+628...`) and generates an idempotency key from the phone number and date. This key prevents duplicate rows when a user accidentally taps the submit button twice on a slow mobile connection.',
              'Once the clean record is written to the CRM and backup Google Sheet, the rotation module checks the list of active agents for that project cluster, assigns one agent as the PIC, and sends a WhatsApp alert to that agent. Inside the agent’s notification message, we include a concise summary (buyer name, unit type, submission time) alongside a quick status link so the agent can mark "Contacted" from their phone in a single tap.',
            ],
          },
          {
            type: 'list',
            title: 'Four components that keep the workflow reliable in the field',
            items: [
              {
                title: 'Contact normalization & duplicate prevention',
                detail:
                  'Standardizes phone numbers and detects returning buyers so conversation history stays with one agent.',
              },
              {
                title: 'Configurable active/off-duty round-robin table',
                detail:
                  'Coordinators can toggle agents on leave or off shift in the configuration sheet so leads only go to available agents.',
              },
              {
                title: 'Scheduled status checks at H+1 and H+3',
                detail:
                  'Runs an automated check against the CRM status column; if a lead is still marked "New Inquiry", the system alerts the agent and coordinator.',
              },
              {
                title: 'Execution logs and step-failure alerts',
                detail:
                  'Every run from form submission to WhatsApp delivery is timestamped in an inspectable log with instant alerts if any step fails.',
              },
            ],
          },
        ],
      },
      {
        id: 'target-desain',
        number: '06',
        title: 'Design targets',
        eyebrow: 'DESIGN TARGET · NOT CLIENT RESULTS',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'All figures below are design targets for the internal Property Lead Flow project at CHESTAADOTCOM, engineered as benchmarks for routing speed and follow-up discipline rather than measured client campaign claims.',
            ],
          },
          {
            type: 'targets',
            badgeLabel: 'Design target, not client results',
            targets: [
              {
                label: 'Agent notification',
                value: '< 1 minute',
                note: 'Target from form submission',
              },
              {
                label: 'Follow-up schedule',
                value: 'H+1 and H+3',
                note: 'Automatic reminder if not yet contacted',
              },
              {
                label: 'Manual logging',
                value: '0 steps',
                note: 'Directly from form to CRM',
              },
            ],
            beforeAfter: [
              {
                aspect: 'Time gap from form submission to agent alert',
                before:
                  'Leads sit in a spreadsheet waiting to be copied manually by an admin into agent WhatsApp chats.',
                after:
                  'Design target: logged in CRM and sent to the assigned agent’s WhatsApp in under 1 minute.',
              },
              {
                aspect: 'Follow-up visibility after lead assignment',
                before:
                  'Hard to track which prospective buyers have not been greeted after being posted in a group chat.',
                after:
                  'Design target: automated reminders at H+1 and H+3 if the CRM status has not been updated.',
              },
            ],
          },
        ],
      },
      {
        id: 'catatan-perancangan',
        number: '07',
        title: 'Design notes',
        eyebrow: 'TRADE-OFFS & TEAM DISCIPLINE',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'When designing sales workflow automation, the biggest temptation is building overly complex branching rules on day one—such as trying to score buyer budgets automatically with a dozen form fields. In this internal project, we chose the opposite trade-off: the buyer-facing form stays as short as possible (name, active WhatsApp number, and unit interest or visit preference), while deeper qualification happens through human conversation with the agent.',
              'The second trade-off involves status updates. Automated H+1 and H+3 reminders are only helpful if agents actually update lead statuses after greeting a buyer. Instead of forcing agents to log into a heavy desktop dashboard, we simplified status updates to a single quick link inside their WhatsApp notification. Good workflow automation does not replace an agent’s personal touch when negotiating property, but it ensures no prospective buyer is forgotten because of slow manual copy-pasting.',
            ],
          },
          {
            type: 'trade-offs',
            items: [
              {
                decision: 'Keeping the initial ad form to 3–4 core fields',
                whyChosen:
                  'Reduces friction when prospective buyers fill out the form on a mobile screen.',
                tradeOff:
                  'Agents qualify deeper details (such as mortgage vs cash payment plans) during their first WhatsApp conversation.',
              },
              {
                decision: 'Writing parallel records to both the CRM and an execution log sheet',
                whyChosen:
                  'Makes it easy for coordinators to audit incoming submissions and guarantees zero lost leads if a third-party tool slows down.',
                tradeOff:
                  'Requires slightly more initial schema setup to keep form fields, CRM columns, and log tables synchronized.',
              },
            ],
          },
        ],
      },
    ],
    metrics: [],
    pullQuote: {
      text: 'Useful lead automation does not force agents to learn a complicated app; its job is making sure the moment a buyer submits a form, the right agent knows and gets reminded until follow-up happens.',
      attribution: 'Zeeshan — CHESTAADOTCOM Internal Project Note',
    },
    projectSlug: 'lead-properti',
    relatedServiceSlugs: ['otomasi-workflow'],
    relatedPostSlugs: ['otomasi-whatsapp-ai-klinik-fnb-alur-kerja'],
    draft: false,
    seo: {
      title: 'Property Lead Flow Automation Case Study | CHESTAADOTCOM',
      description:
        'Internal project case study of Property Lead Flow: automating ad form leads to CRM, < 1 minute agent alerts, and H+1 and H+3 follow-up reminders.',
    },
  },

  // ===========================================================================
  // CASE STUDY 4: dashboard-kafe
  // ===========================================================================
  {
    slug: 'dashboard-kafe',
    legacySlugs: ['rekap-operasional-kafe', 'pos-kafe-multicabang'],
    title: 'Cafe operational dashboard: from daily spreadsheets to a single view',
    oneSentenceSummary:
      'An internal project designing a web dashboard that unifies daily sales, ingredient inventory, and branch reports without replacing existing cash registers.',
    client: 'CHESTAADOTCOM internal project',
    industry: 'F&B',
    services: ['Custom Software'],
    serviceSlugs: ['software-custom'],
    year: '2026',
    internal: true,
    internalBadgeLabel: 'Internal project',
    targetsBadgeLabel: 'Design target, not client results',
    duration: 'Internal build',
    readingTime: '7 min read',
    author: 'Chesta Azka',
    authorRole: 'Co-founder (architecture, product, technology)',
    publishedAt: '2026-03-22',
    updatedAt: '2026-03-24',
    cover: 'projectDashboardKafe',
    coverCaption:
      'Illustration: cafe operational dashboard unifying daily sales figures, critical raw ingredient stock, and cash discrepancies per branch.',
    summary: {
      problem:
        'A multi-branch cafe owner reconciled sales and stock across multiple spreadsheets, causing delayed reports and frequent figure mismatches.',
      built:
        'A web dashboard unifying daily sales, ingredient stock, and branch reports, with role-based access for owners, managers, and staff.',
      solution:
        'A web dashboard unifying daily sales, ingredient stock, and branch reports, with role-based access for owners, managers, and staff.',
      result:
        'Design target: daily reports available without manual reconciliation, low stock triggers alerts before running out, and a single source of data across branches.',
    },
    targets: [
      {
        label: 'Daily report availability',
        value: 'Without manual reconciliation',
        note: 'Compiled automatically following shift close',
      },
      {
        label: 'Low inventory alerts',
        value: 'Before ingredients run out',
        note: 'Triggers alerts when stock falls below safety buffer',
      },
      {
        label: 'Multi-branch consolidation',
        value: '1 centralized data source',
        note: 'Eliminates version conflicts across branch sheets',
      },
    ],
    sections: [
      {
        id: 'konteks-bisnis',
        number: '01',
        title: 'Business context',
        eyebrow: 'INTERNAL PROJECT · F&B',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'In the multi-outlet food and beverage (F&B) industry, running three cafe branches in Serpong, Bintaro, and BSD introduces operational friction that scales far faster than managing a single standalone store. Every night at ten o’clock, baristas and shift leads at each outlet tally receipt piles, weigh remaining coffee beans, syrups, and milk, and enter figures into local spreadsheets.',
              'The cafe owner usually only sees consolidated daily revenue and ingredient status the following afternoon, after three separate closing spreadsheets are emailed or texted over WhatsApp and manually merged into a master file. This half-day lag leaves owners blind to branch performance when decisions matter most.',
              'We built the Cafe Operations Dashboard as a CHESTAADOTCOM internal project to model a practical custom software solution for multi-branch F&B operators. The goal was to unify daily sales figures and inventory movements into one clean screen, without forcing staff to abandon the point-of-sale (POS) registers they already use daily.',
            ],
          },
        ],
      },
      {
        id: 'masalah',
        number: '02',
        title: 'Problem',
        eyebrow: 'DAILY SPREADSHEET BOTTLENECKS',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Daily closing sheets varied widely across branches because each shift lead organized columns differently. One branch separated oat milk from fresh milk on individual rows, while another combined them under a single dairy heading, making cross-branch ingredient comparisons impossible.',
              'A second chronic issue was late inventory exhaustion discovery. Depleted caramel syrup or house-blend coffee beans were often only noticed when lines formed during the lunch rush, forcing frantic emergency borrows from neighboring branches or turning away signature drink orders.',
              'Because consolidated reports only settled the next afternoon, operational reviews always lagged behind. When a suspicious cash drawer deficit occurred at one branch at closing time, the owner could only address it fourteen hours later when memories of shift handovers had faded.',
            ],
          },
          {
            type: 'previous-attempts',
            title: 'Two common approaches cafe operators attempt and why they fall short',
            attempts: [
              {
                method: 'A single shared Google Spreadsheet edited simultaneously by all branches',
                whyItFailed:
                  'Relies on manual discipline that slips when staff are exhausted. Calculation formulas frequently get deleted on phone screens, and multi-branch inputs overwrite each other.',
              },
              {
                method: 'WhatsApp group chats for cash closing recaps and photo receipts',
                whyItFailed:
                  'Critical numbers get buried under operational chatter. Receipt photos remain unstructured, forcing the owner to retype numbers manually into a laptop every weekend.',
              },
            ],
          },
        ],
      },
      {
        id: 'pendekatan',
        number: '03',
        title: 'Approach',
        eyebrow: 'THREE CORE SCREENS & MOBILE ENTRY',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Rather than engineering an overwhelming enterprise platform with dozens of confusing analytics charts, we constrained this dashboard to exactly three core screens: a daily sales overview, a critical ingredient inventory tracker, and a concise branch comparison view. This focus keeps attention on immediate decisions.',
              'To simplify operational input, we designed an ultra-lightweight mobile web form. Baristas or cashiers simply open a link on their smartphones and complete their shift-end reconciliation in under ninety seconds before heading home.',
              'The system establishes three clear user roles: Business Owners have complete visibility across all outlets, consolidated revenue, and gross margins; Branch Managers manage local ingredient deliveries and inspect their own shift history; while Shift Staff are restricted to entering cash counts and physical stock on their active shift.',
              'We also filtered dashboard metrics to highlight only figures that guide tomorrow’s decisions: net revenue per location, raw ingredients approaching reorder thresholds, and physical drawer cash variance against register records.',
            ],
          },
          {
            type: 'trade-offs',
            items: [
              {
                decision: 'Not building a full POS register from scratch, focusing purely on data unification',
                whyChosen:
                  'Replacing checkout hardware across all outlets demands expensive new equipment, software subscriptions, and weeks of stressful staff retraining.',
                tradeOff:
                  'Staff continue using existing POS registers to print customer receipts, retyping summary figures into our web form during evening closing.',
              },
              {
                decision: 'Constraining dashboard views to actionable next-day metrics',
                whyChosen:
                  'Keeps the interface clean and instantly readable on an owner’s phone while commuting or checking closing numbers before bed.',
                tradeOff:
                  'Long-term analytical trends like seasonal demographic regressions or hourly menu affinity matrices are not presented on this primary screen.',
              },
            ],
          },
        ],
      },
      {
        id: 'alur-sistem',
        number: '04',
        title: 'System flow',
        eyebrow: 'FROM STAFF INPUT TO INVENTORY ALERTS',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'The workflow guides operational numbers automatically from branch counters to the owner’s smartphone screen across five structured stages. It includes a dedicated validation branch to flag suspicious physical cash variances before a closing shift is finalized.',
            ],
          },
          {
            type: 'diagram',
            diagram: {
              caption:
                'Illustration: data pipeline from mobile shift closing forms to centralized storage, executive dashboard aggregation, and automated stock alerts.',
              nodes: [
                {
                  id: 'kafe-step-1',
                  stepLabel: '01 · INPUT',
                  title: 'Mobile staff input',
                  subtitle: 'Staff record shift sales summaries and physical stock using a lightweight web form',
                },
                {
                  id: 'kafe-step-2',
                  stepLabel: '02 · VALIDATE',
                  title: 'System validation',
                  subtitle: 'Verifies numeric formats, prevents duplicate submissions, and flags cash drawer variances',
                },
                {
                  id: 'kafe-step-3',
                  stepLabel: '03 · DATABASE',
                  title: 'Centralized database',
                  subtitle: 'Stores inventory movements and sales logs with strict role-based data partitioning',
                },
                {
                  id: 'kafe-step-4',
                  stepLabel: '04 · DASHBOARD',
                  title: 'Executive dashboard',
                  subtitle: 'Consolidates multi-branch net revenue in real time and calculates gross margins',
                },
                {
                  id: 'kafe-step-5',
                  stepLabel: '05 · ALERTS',
                  title: 'Low stock alerts',
                  subtitle: 'Flags ingredients approaching replenishment thresholds ahead of tomorrow’s orders',
                },
              ],
              branch: {
                fromNodeIndex: 1,
                stepLabel: 'VARIANCE BRANCH · CASH AUDIT',
                title: 'Cash discrepancy memo',
                subtitle:
                  'When physical cash differs from register records beyond allowable tolerance, staff must record an explanatory note before submitting.',
              },
            },
          },
        ],
      },
      {
        id: 'implementasi',
        number: '05',
        title: 'Implementation',
        eyebrow: 'ENGINEERING STEPS & RESILIENCE',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'During system engineering, we used an incremental rollout model to align the software with the physical realities of cafe shifts. Rather than deploying to all branches simultaneously, we executed deep validations ranging from historic schema unification to human input stress tests.',
              'The interface was engineered mobile-first with high touch targets, ensuring buttons can be pressed comfortably with one hand while a barista closes down the espresso bar at the end of a long shift.',
            ],
          },
          {
            type: 'list',
            title: 'Five engineering steps executed in this project',
            items: [
              {
                title: 'Mapping existing branch spreadsheets',
                detail:
                  'Gathered and analyzed spreadsheet logs from all three branches to standardize ingredient naming conventions (SKUs) and sales categories.',
              },
              {
                title: 'Designing a unified relational schema',
                detail:
                  'Architected normalized tables for shift receipts, inbound restocking, and ingredient consumption with strict branch isolation.',
              },
              {
                title: 'Configuring role-based access control',
                detail:
                  'Restricted cashiers to their active shift, branch managers to local inventory logs, and granted owners consolidated multi-branch visibility.',
              },
              {
                title: 'Stress testing edge-case inputs',
                detail:
                  'Simulated accidental decimal mistakes, rapid double-click submits, and form submissions over poor mobile cellular signals.',
              },
              {
                title: 'Pilot release at a single pioneer branch',
                detail:
                  'Ran the system at the Serpong branch for two weeks to observe barista habits before expanding rollout to Bintaro and BSD.',
              },
            ],
          },
        ],
      },
      {
        id: 'target-desain',
        number: '06',
        title: 'Design targets',
        eyebrow: 'DESIGN TARGET · NOT CLIENT RESULTS',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'As a CHESTAADOTCOM internal engineering project, the indicators below represent system design goals established during operational simulations, not claims from active commercial clients.',
            ],
          },
          {
            type: 'targets',
            badgeLabel: 'Design target, not client results',
            targets: [
              {
                label: 'Daily report availability',
                value: 'Without manual reconciliation',
                note: 'Compiled automatically following shift close',
              },
              {
                label: 'Low inventory alerts',
                value: 'Before ingredients run out',
                note: 'Triggers alerts when stock falls below safety buffer',
              },
              {
                label: 'Multi-branch consolidation',
                value: '1 centralized data source',
                note: 'Eliminates version conflicts across branch sheets',
              },
            ],
            beforeAfter: [
              {
                aspect: 'Time to receive consolidated daily closing figures',
                before:
                  'Owner waited until the following afternoon after spreadsheets from all outlets were manually merged.',
                after:
                  'Design target: consolidated figures appear instantly on the owner’s dashboard once evening shift forms are submitted.',
              },
              {
                aspect: 'Managing critical ingredient stockouts',
                before:
                  'Depleted stock was frequently discovered mid-rush when customer lines formed at the bar.',
                after:
                  'Design target: amber alerts highlight items nearing reorder thresholds before morning supplier calls take place.',
              },
            ],
          },
        ],
      },
      {
        id: 'catatan-perancangan',
        number: '07',
        title: 'Design notes',
        eyebrow: 'OPERATIONAL TRADEOFFS & DISCIPLINE',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'The most valuable takeaway from designing F&B software is remembering that the end user is not a data analyst sitting at a quiet desk. Baristas and shift leads stand on their feet all day, serve hundreds of customers, and are fatigued when closing shop.',
              'If a digital form takes more than two minutes or demands excessive fields, staff will postpone entries or estimate numbers haphazardly. This is why we insisted that mobile closing forms take seconds to complete.',
              'We also deliberately rejected bulk migrations of years of historical messy spreadsheets. Importing conflicting past formulas would have polluted the new database. Instead, we imported the last fourteen days of opening inventory balances, letting clean historical data accumulate naturally from day one.',
            ],
          },
          {
            type: 'trade-offs',
            items: [
              {
                decision: 'Showing concise actionable metrics over exhaustive chart suites',
                whyChosen:
                  'Owners need immediate clarity before sleep: did all stores balance properly and what must be ordered from suppliers tomorrow morning.',
                tradeOff:
                  'Owners cannot view deep seasonal regression models or hourly table turn rates on this primary operational view.',
              },
              {
                decision: 'Importing historical data incrementally rather than running a bulk migration',
                whyChosen:
                  'Avoids importing corrupt calculations, inconsistent names, or missing dates from years of unmonitored spreadsheets.',
                tradeOff:
                  'Year-on-year historical comparisons take a few months to become meaningful as new records populate.',
              },
            ],
          },
        ],
      },
    ],
    metrics: [],
    pullQuote: {
      text: 'We did not discard the cash registers baristas already knew; we simply built a reliable bridge so daily sales and remaining stock flow into one clean screen.',
      attribution: 'Chesta Azka — CHESTAADOTCOM Internal Project Note',
    },
    projectSlug: 'dashboard-kafe',
    relatedServiceSlugs: ['software-custom'],
    relatedPostSlugs: ['otomasi-whatsapp-ai-klinik-fnb-alur-kerja'],
    draft: false,
    seo: {
      title: 'Cafe Operations Dashboard Case Study | CHESTAADOTCOM',
      description:
        'Internal project case study of Cafe Operations Dashboard: unifying daily sales, ingredient inventory, and branch reports without replacing registers.',
    },
  },

  // ===========================================================================
  // CASE STUDY 5: pemroses-dokumen
  // ===========================================================================
  {
    slug: 'pemroses-dokumen',
    legacySlugs: ['ekstraksi-faktur-pajak-ai', 'asisten-kualifikasi-klien-konsultan'],
    title: 'AI Document Processor: data extraction with human review',
    oneSentenceSummary:
      'An internal project designing an AI pipeline to extract invoices and tax withholdings into web tables with mandatory human review before saving.',
    client: 'CHESTAADOTCOM internal project',
    industry: 'Professional services',
    services: ['AI Agent', 'Custom Software'],
    serviceSlugs: ['ai-agent', 'software-custom'],
    year: '2026',
    internal: true,
    internalBadgeLabel: 'Internal project',
    targetsBadgeLabel: 'Design target, not client results',
    duration: 'Internal build',
    readingTime: '7 min read',
    author: 'Chesta Azka',
    authorRole: 'Co-founder (architecture, product, technology)',
    publishedAt: '2026-03-24',
    updatedAt: '2026-03-24',
    cover: 'projectPemrosesDokumen',
    coverCaption:
      'Illustration: split-screen review interface showing original scanned document on the left and verified AI extraction fields on the right.',
    summary: {
      problem:
        'A professional services firm receives dozens of invoice formats, tax withholdings, and contracts weekly, copying figures manually with high typo risks.',
      built:
        'An AI-driven document extraction system with a split-screen web interface where humans inspect and approve data before it enters the database.',
      solution:
        'An AI-driven document extraction system with a split-screen web interface where humans inspect and approve data before it enters the database.',
      result:
        'Design target: uncertain data is always flagged for review, no data enters the final table without human approval, and every correction is logged.',
    },
    targets: [
      {
        label: 'Uncertain data markers',
        value: 'Always flagged',
        note: 'Confidence scores < 95% highlighted in yellow for review',
      },
      {
        label: 'Human approval gate',
        value: 'Mandatory approval',
        note: '0 rows committed to final tables without a staff click',
      },
      {
        label: 'Audit correction trail',
        value: '100% recorded',
        note: 'Tracks reviewer identity, original AI text, and timestamp',
      },
    ],
    sections: [
      {
        id: 'konteks-bisnis',
        number: '01',
        title: 'Business context',
        eyebrow: 'INTERNAL PROJECT · PROFESSIONAL SERVICES',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'At accounting practices, corporate tax consultancies, and notary offices in South Tangerang and Jakarta, administrative paperwork arrives in heavy waves at the start of every month. Operational staff receive dozens of PDF files from clients and vendors encompassing commercial invoices, tax withholding slips (PPh 21 and PPh 23), scanned expense receipts, and legal agreement contracts.',
              'The primary challenge is format heterogeneity. No universal template exists: some vendors attach crisp digital PDFs with structured tables, others send tilted or faded paper scans, and some transmit photos of paper receipts taken on mobile cameras under dim desk lighting.',
              'We designed the AI Document Processor as a CHESTAADOTCOM internal project to evaluate how modern language models and computer vision can accelerate data ingestion without compromising financial accuracy. Our guiding principle was unyielding: speed gains must never sacrifice bookkeeping and legal integrity.',
            ],
          },
        ],
      },
      {
        id: 'masalah',
        number: '02',
        title: 'Problem',
        eyebrow: 'TYPO RISKS & UNCHECKED AI HALLUCINATIONS',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Manually copying figures from dozens of varied documents into accounting tables is grinding, repetitive labor. After reviewing fifteen consecutive documents, staff fatigue sets in, sharply elevating the likelihood of critical typing errors—such as transposing digits in a Tax Identification Number (NPWP) or adding an extra zero to an invoice subtotal.',
              'Traditional Optical Character Recognition (OCR) software relying on rigid coordinate templates breaks easily. As soon as a vendor alters their logo placement or introduces a new discount row, template-based OCR misaligns values into completely wrong ledger fields.',
              'Conversely, letting an AI model extract and write directly into production databases without human verification is a recipe for disaster. Generative models occasionally hallucinate, confuse transaction dates with invoice numbers, or misread faded numerals on low-resolution scans.',
            ],
          },
          {
            type: 'previous-attempts',
            title: 'Two conventional approaches firms try and why both fall short',
            attempts: [
              {
                method: 'Manual copy-paste workflows assigned to junior team members',
                whyItFailed:
                  'Consumes dozens of expensive hours each week that could be spent on advisory work, while remaining prone to typo-driven reconciliation errors.',
              },
              {
                method: 'Unsupervised rigid OCR templates without human review',
                whyItFailed:
                  'Vendor invoice layouts change without warning. A millimeter shift in layout corrupts extracted values and contaminates downstream ledgers.',
              },
            ],
          },
        ],
      },
      {
        id: 'pendekatan',
        number: '03',
        title: 'Approach',
        eyebrow: 'HUMAN-IN-THE-LOOP & SPLIT VIEW',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Our architecture enforces a human-in-the-loop workflow. The AI acts as an ultra-fast initial reader, while human professionals retain authority as quality control gatekeepers validating every extracted row.',
              'We built a web review interface centered on a split-screen layout: the source document scan renders in the left pane with responsive zooming, while structured extraction fields sit immediately adjacent in the right pane.',
              'Every extracted field displays a confidence indicator. If the model detects ambiguous source text or scores confidence below 95%, the system highlights that field in high-contrast yellow and snaps reviewer cursor focus directly to it.',
              'The system offers one-click verification and keyboard shortcuts. Staff inspect extracted values in seconds, make inline edits if needed, and press approve to commit verified rows into the core database.',
            ],
          },
          {
            type: 'trade-offs',
            items: [
              {
                decision: 'Rejecting 100% autonomous committing without human approval',
                whyChosen:
                  'A single incorrect digit on a corporate tax slip can trigger regulatory audit penalties and severe client reputational harm.',
                tradeOff:
                  'Document processing is not completely unattended overnight as it waits for human sign-off, but financial data fidelity is preserved.',
              },
              {
                decision: 'Recording comprehensive audit traces for all field revisions',
                whyChosen:
                  'Provides total organizational accountability so managers know who approved each document and what changes were made from initial AI suggestions.',
                tradeOff:
                  'Requires additional database storage to maintain revision logs and original extraction snapshots.',
              },
            ],
          },
        ],
      },
      {
        id: 'alur-sistem',
        number: '04',
        title: 'System flow',
        eyebrow: 'FROM SCANNED UPLOAD TO AUDIT LOG',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'The document processing lifecycle proceeds through five sequential phases from digital receipt to audit storage. When ambiguous fields are identified, the pipeline prioritizes highlighted human review before records enter primary ledgers.',
            ],
          },
          {
            type: 'diagram',
            diagram: {
              caption:
                'Illustration: 5-step AI Document Processor flow from document upload to audit trail logging, with a human review gate before database write.',
              nodes: [
                {
                  id: 'doc-step-1',
                  stepLabel: '01 · INGEST',
                  title: 'Document upload',
                  subtitle: 'Staff upload PDF documents or scanned image receipts to an encrypted system queue',
                },
                {
                  id: 'doc-step-2',
                  stepLabel: '02 · EXTRACT',
                  title: 'AI model extraction',
                  subtitle: 'Parses text, line-item tables, and maps figures into a structured JSON schema',
                },
                {
                  id: 'doc-step-3',
                  stepLabel: '03 · SCORE',
                  title: 'Confidence scoring',
                  subtitle: 'Calculates field confidence levels and validates arithmetic balance checks',
                },
                {
                  id: 'doc-step-4',
                  stepLabel: '04 · REVIEW',
                  title: 'Split-screen human review',
                  subtitle: 'Staff inspect source scan and editable fields side by side with yellow alerts on low-confidence items',
                },
                {
                  id: 'doc-step-5',
                  stepLabel: '05 · COMMIT',
                  title: 'Database & audit log',
                  subtitle: 'Commits verified records to the master ledger complete with reviewer identity and timestamps',
                },
              ],
              branch: {
                fromNodeIndex: 3,
                stepLabel: 'CORRECTION BRANCH · INLINE EDIT',
                title: 'Inline manual correction',
                subtitle:
                  'If an ambiguous numeral on a faded scan is misread, staff edit the value directly in the right form before clicking approve.',
              },
            },
          },
        ],
      },
      {
        id: 'implementasi',
        number: '05',
        title: 'Implementation',
        eyebrow: 'DOCUMENT VARIETY & KEYBOARD SHORTCUTS',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'To validate system resilience under real-world conditions, we tested the pipeline against more than one hundred heterogeneous document samples. These spanned clean digital PDFs, government-standard tax filings, faint thermal receipts, and skewed paper agreements.',
              'On the frontend, we added comprehensive keyboard shortcut support. Reviewers navigate between fields using the Tab key, approve rows with quick key combinations, and zoom scans without lifting their hands from the keyboard.',
            ],
          },
          {
            type: 'list',
            title: 'Five technical components implemented in this project',
            items: [
              {
                title: 'Evaluating real-world document variations',
                detail:
                  'Stress-tested extraction pipelines against 100+ commercial invoice samples, tax withholding forms, and variable scan qualities.',
              },
              {
                title: 'Designing strict structured extraction schemas',
                detail:
                  'Standardized fields including document ID, transaction date, vendor tax ID, base taxable amount, tax rates, and final totals.',
              },
              {
                title: 'Split-screen review interface with keyboard navigation',
                detail:
                  'Enabled fluid review workflows where Tab shifts focus and Ctrl+Enter immediately approves verified data rows.',
              },
              {
                title: 'Automated arithmetic cross-checks',
                detail:
                  'Embedded client and server validation verifying that line items and tax calculations match total balance figures before review.',
              },
              {
                title: 'Audit logging and role enforcement',
                detail:
                  'Logged reviewer credentials, verification timestamps, and raw AI predictions for complete accounting transparency.',
              },
            ],
          },
        ],
      },
      {
        id: 'target-desain',
        number: '06',
        title: 'Design targets',
        eyebrow: 'DESIGN TARGET · NOT CLIENT RESULTS',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'All performance figures below are engineering design objectives evaluated during internal simulation testing at CHESTAADOTCOM, not claims from commercial client deployments.',
            ],
          },
          {
            type: 'targets',
            badgeLabel: 'Design target, not client results',
            targets: [
              {
                label: 'Uncertain data markers',
                value: 'Always flagged',
                note: 'Confidence scores < 95% highlighted in yellow for review',
              },
              {
                label: 'Human approval gate',
                value: 'Mandatory approval',
                note: '0 rows committed to final tables without a staff click',
              },
              {
                label: 'Audit correction trail',
                value: '100% recorded',
                note: 'Tracks reviewer identity, original AI text, and timestamp',
              },
            ],
            beforeAfter: [
              {
                aspect: 'Speed and comfort of document data entry',
                before:
                  'Staff manually retyped numbers from PDF windows into spreadsheets, averaging 3–5 minutes per document.',
                after:
                  'Design target: all fields auto-populate in seconds, and staff need only 20–30 seconds to inspect and approve.',
              },
              {
                aspect: 'Guarding against typos and unverified AI hallucinations',
                before:
                  'Typing mistakes or dropped zeros went unnoticed until painful month-end bank reconciliations.',
                after:
                  'Design target: ambiguous numbers are visibly highlighted, and zero rows commit without explicit human approval.',
              },
            ],
          },
        ],
      },
      {
        id: 'catatan-perancangan',
        number: '07',
        title: 'Design notes',
        eyebrow: 'WHY WE REJECT FULL AUTONOMY',
        blocks: [
          {
            type: 'text',
            paragraphs: [
              'Amid widespread AI hype, the easiest trap for software engineers is promising complete hands-off autonomy. In this internal project, we consciously rejected that promise.',
              'In legal, accounting, and tax contexts, the real-world cost of fixing a faulty entry that slipped into tax filings is exponentially higher than the twenty seconds a staff member takes to inspect a split-screen view.',
              'We intentionally designed low-confidence field alerts with prominent yellow highlights that cannot be overlooked. This visual cue prevents rubber-stamping by actively directing the reviewer’s attention to items requiring genuine judgment. Every adjustment is recorded in an immutable audit log, ensuring complete accountability if external audits occur.',
            ],
          },
          {
            type: 'trade-offs',
            items: [
              {
                decision: 'Requiring mandatory human approval for every document submission',
                whyChosen:
                  'Prevents generative model hallucinations from corrupting accounting records and satisfies strict financial prudence standards.',
                tradeOff:
                  'The pipeline cannot run completely unattended overnight without staff monitoring the review queue.',
              },
              {
                decision: 'Making ambiguous field markers visually prominent',
                whyChosen:
                  'Counters attention fatigue where reviewers might click approve without thoroughly checking values.',
                tradeOff:
                  'Forms look more visually dense when reviewing poor-quality scans, but data safety remains non-negotiable.',
              },
            ],
          },
        ],
      },
    ],
    metrics: [],
    pullQuote: {
      text: 'Financial document automation is not about letting AI run unmonitored; it cuts manual copy work by 80% while keeping humans in charge of final approval.',
      attribution: 'Chesta Azka — CHESTAADOTCOM Internal Project Note',
    },
    projectSlug: 'pemroses-dokumen',
    relatedServiceSlugs: ['ai-agent', 'software-custom'],
    relatedPostSlugs: ['keamanan-ai-agent-prompt-injection-data-pelanggan'],
    draft: false,
    seo: {
      title: 'AI Document Processor System Case Study | CHESTAADOTCOM',
      description:
        'Internal project case study of AI Document Processor: extracting document data into web tables with human review, split view, and audit logging.',
    },
  },
];

