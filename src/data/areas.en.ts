/**
 * ============================================================================
 * ENGLISH LOCAL AREA PAGES (1:1 FAITHFUL TRANSLATION OF src/data/areas.ts)
 * ============================================================================
 * 10 Indexable Area Pages (5 areas x 2 services, 650+ words each) + 10 Prepared
 */

import {
  AREAS,
  type NonIndexableAreaSlug,
  type ServiceAreaPageData,
} from './areas';

export const SERVICE_AREA_PAGES_EN: ServiceAreaPageData[] = [
  // 1A. WEBSITE DEVELOPMENT — TANGERANG SELATAN
  {
    serviceSlug: 'pembuatan-website',
    serviceName: 'Website and landing page development',
    areaSlug: 'tangerang-selatan',
    areaName: 'South Tangerang',
    indexable: true,
    eyebrow: 'Website development · South Tangerang',
    metaTitle: 'Website Development in South Tangerang | CHESTAADOTCOM',
    metaDescription:
      'Website and landing page development for clinics, cafes, tutoring centers, and businesses in South Tangerang. Fast on mobile, from IDR 1,200,000.',
    h1: 'Website development for businesses in South Tangerang',
    quickSummary:
      'Website development in South Tangerang from CHESTAADOTCOM helps medical practices, beauty clinics, cafes, tutoring centers, property agents, professional services, and SME online stores build pages that open fast on mobile phones and state clearly what you offer. Pricing starts from IDR 1,200,000 depending on complexity, with online or in-person collaboration by agreement.',
    cekCepat: {
      cocokKalau:
        'You run a business in South Tangerang and want prospective customers to reach out directly via WhatsApp or make a booking without struggling to find information.',
      mulaiDari:
        'A free 30-minute audit to review your existing pages, your business goals, and competitors around you before you pay anything.',
      harga:
        'Landing pages start from IDR 1,200,000 depending on complexity; company profiles and custom websites are calculated after the free audit.',
    },
    localContextHeading: 'Why businesses in South Tangerang need a clear, fast website',
    localContextParagraphs: [
      'South Tangerang (Tangerang Selatan) is a city in Banten Province bordering South Jakarta, Depok, Tangerang City, and Tangerang Regency. Its territory spans seven districts—Serpong, North Serpong, Setu, Pamulang, Ciputat, East Ciputat, and Pondok Aren—forming a mix of residential neighborhoods, university campuses, and commercial centers. Because these districts are closely connected, residents generally search for daily services and professional providers directly from their mobile phones while at home or commuting.',
      'Across those seven districts, businesses generally include medical practices and clinics, beauty clinics, cafes and restaurants, tutoring centers (bimbel), property agencies, professional services, and SME online stores. When someone searches on Google or clicks a social media ad, they typically compare a few options within a short window. If the page opens slowly, the copy wanders, or the contact button is hard to find, prospective customers usually close the tab right away.',
      'Building a website for businesses in South Tangerang is not about adding complicated visual effects—it is about organizing information so a prospective customer’s main questions are answered before they even ask. A static, lightweight page that reads cleanly on mobile phones helps visitors understand what service you offer, what the starting price looks like, where you are located, and which button to press to book a slot or consult via WhatsApp.',
    ],
    businessMixList: [
      'Medical practices, dental clinics, and family health clinics in residential neighborhoods',
      'Beauty and aesthetic clinics that rely on appointment bookings',
      'Cafes and restaurants that need a menu page, opening hours, and a location map',
      'Tutoring centers (bimbel) and courses around school and university areas',
      'Property agents, professional services, and SME online stores across the seven districts of South Tangerang',
    ],
    scenarios: [
      {
        label: 'Example scenario',
        title: 'A new cafe discovered through maps and social media',
        businessType: 'Cafe & Eatery in South Tangerang',
        challenge:
          'People usually search for a nearby cafe on Google Maps and then check Instagram before deciding to visit. Prospective guests often change their minds because the menu, price range, opening hours, and map pin are scattered across many posts that are tedious to open on a phone.',
        solution:
          'A compact, lightweight website containing a menu that is easy to read on a mobile screen, current opening hours, a map link, and a WhatsApp button to check table availability or place an order ahead of time.',
        expectedOutcome:
          'The page answers all three things visitors look for at once, so people who find the cafe on the map can visit right away or message via WhatsApp.',
      },
      {
        label: 'Example scenario',
        title: 'A dental practice with a dedicated page per service',
        businessType: 'Dental Practice & Clinic in South Tangerang',
        challenge:
          'Prospective patients looking for dental care generally want to know the starting cost for scaling or braces and the doctor’s practice hours before messaging the clinic admin.',
        solution:
          'A website with separate pages per service (such as scaling, fillings, or braces) showing treatment details, starting prices, practice hours, and a booking button via WhatsApp.',
        expectedOutcome:
          'Prospective patients get a clear view of pricing and schedules upfront, then send a WhatsApp message with a specific service already chosen.',
      },
    ],
    collaborationHeading: 'How we work with clients in South Tangerang',
    collaborationParagraphs: [
      'CHESTAADOTCOM is based in BSD, South Tangerang and serves businesses across South Tangerang and Greater Jakarta. Day-to-day work—such as sharing materials, discussing page structure, and reviewing prototypes—runs online via WhatsApp and video call so it stays convenient for your schedule.',
      'If you prefer to meet in person to discuss your business flow at the start of a project, in-person meetings in the South Tangerang area can be scheduled by agreement. Every project is handled directly by Chesta Azka (architecture, product, technology) and Zeeshan (operations and client success) through four clear steps.',
    ],
    processSteps: [
      {
        stepNumber: '1',
        title: 'Free audit (30 minutes)',
        sentence:
          'We look at your business goals in South Tangerang, inspect your existing pages or social media, and review competitors around you.',
      },
      {
        stepNumber: '2',
        title: 'Design and prototype',
        sentence:
          'You review the page structure, offer copy, and initial layout first before the website is built in full.',
      },
      {
        stepNumber: '3',
        title: 'Build and test',
        sentence:
          'The website is built statically for speed, images are optimized, and the result is tested on mobile phones and PageSpeed Insights.',
      },
      {
        stepNumber: '4',
        title: 'Release and maintain',
        sentence:
          'The page goes live on your own domain and hosting, then is monitored and refined after visitor data comes in.',
      },
    ],
    priceHeading: 'Pricing and scope for website development in South Tangerang',
    priceCopy:
      'Starting from IDR 1,200,000 for a landing page, depending on complexity. The cost increases if the number of pages, features (such as booking or payments), or integrations grows. We share the exact figure after the free 30-minute audit, before you pay anything. Simple landing pages usually take days, while websites with multiple pages or custom features take weeks. Domain and hosting are registered under your own name.',
    priceNote: {
      startingPrice: 'Starting from IDR 1,200,000',
      timeline: 'Days for a simple landing page; exact estimate after the audit',
      note: 'Domain and hosting are registered under your own name.',
    },
    relatedProjectSlugs: ['landing-klinik-estetika', 'chestaa-v2'],
    relatedBlogSlug: 'berapa-biaya-bikin-website-bisnis-panduan-harga',
    faqs: [
      {
        question: 'Is the pricing different for businesses in South Tangerang?',
        answer:
          'No, it is not different. Website and landing page development starts from IDR 1,200,000, depending on page complexity and the features you need. We share the exact cost breakdown openly after the free 30-minute audit, before you pay anything.',
      },
      {
        question: 'Do we have to meet in person?',
        answer:
          'It is not required. The entire process from audit and design review to release can be completed online via WhatsApp and video call, or we can meet in person in the South Tangerang area by agreement.',
      },
      {
        question: 'Who holds the domain and hosting access after the website is finished?',
        answer:
          'The domain and hosting are registered directly under your name so they belong entirely to you. Our access is limited to what is needed to build and maintain the system, and is removed when the project or maintenance contract ends.',
      },
    ],
    updatedAt: '2026-03-20',
    ogImageKey: 'ogAreaTangerangSelatan',
  },

  // 1B. AI AGENT — TANGERANG SELATAN
  {
    serviceSlug: 'ai-agent',
    serviceName: 'AI agent',
    areaSlug: 'tangerang-selatan',
    areaName: 'South Tangerang',
    indexable: true,
    eyebrow: 'AI agent · South Tangerang',
    metaTitle: 'AI Agent Services in South Tangerang | CHESTAADOTCOM',
    metaDescription:
      'AI agents for businesses in South Tangerang: automated WhatsApp replies, clinic or tutoring slot checks, bookings, and follow-ups. Free 30-min audit.',
    h1: 'AI agent services for businesses in South Tangerang',
    quickSummary:
      'AI agent services for businesses in South Tangerang from CHESTAADOTCOM help beauty clinics, medical practices, tutoring centers, cafes, property teams, and SMEs reply to WhatsApp messages, check calendar schedules, and record data to databases or spreadsheets automatically. Built with clear action boundaries and human staff handover, priced after a free 30-minute audit.',
    cekCepat: {
      cocokKalau:
        'Your team in South Tangerang answers the same chat questions repeatedly every day, receives messages at night, or copies booking data manually from WhatsApp into spreadsheets.',
      mulaiDari:
        'A free 30-minute audit to map your recurring conversations and decide which flows are worth handing over to an agent.',
      harga:
        'Calculated after the free 30-minute audit based on the number of tools, business rules, and message volume, before you pay anything.',
    },
    localContextHeading: 'Why businesses in South Tangerang need an AI agent that can take action',
    localContextParagraphs: [
      'Across South Tangerang’s seven districts—Serpong, North Serpong, Setu, Pamulang, Ciputat, East Ciputat, and Pondok Aren—most daily communication between residents and businesses happens on WhatsApp. Whether in residential neighborhoods, near university campuses, or in commercial districts, prospective customers commonly send messages outside standard office hours, such as after work or late in the evening when admins are off duty.',
      'Businesses such as beauty clinics, medical practices, tutoring centers, cafes, property agents, and SME online stores generally face similar daily questions: checking service hours, asking for price lists, checking class seat quotas, or arranging site visits. When messages are only answered the next morning, some prospective customers have already moved on. Meanwhile, admins also spend hours copying names, phone numbers, and schedule choices one by one from chats into spreadsheets.',
      'Unlike a basic chatbot that only replies from a fixed list of answers, an AI agent understands customer intent, uses tools like calendars, databases, or CRMs, and completes the task through to the end. If a customer asks something outside the rules or needs human attention, the agent hands the conversation over to your staff complete with a summary.',
    ],
    businessMixList: [
      'Beauty clinics and medical practices handling daily treatment bookings',
      'Tutoring centers (bimbel) and courses receiving new student registrations',
      'Cafes, restaurants, and SME online stores with recurring menu and order inquiries',
      'Property agents and professional services across South Tangerang',
    ],
    scenarios: [
      {
        label: 'Example scenario',
        title: 'A beauty clinic receiving booking chats at night',
        businessType: 'Beauty Clinic in South Tangerang',
        challenge:
          'Prospective patients often send evening messages like "can I book a facial tomorrow at 4 PM?" after clinic admins have gone home, so messages wait until morning and therapist schedules must be checked manually.',
        solution:
          'An AI agent connected to WhatsApp Business and the therapist calendar to answer treatment questions, check open slots at the requested hour, create the booking, record it in the CRM, and send a day-before reminder.',
        expectedOutcome:
          'Evening messages are handled right away until the slot is locked on the calendar, while clinic staff simply review the organized booking list the next morning.',
      },
      {
        label: 'Example scenario',
        title: 'A tutoring center (bimbel) during new class registration periods',
        businessType: 'Tutoring Center in South Tangerang',
        challenge:
          'Parents and prospective students ask about class schedules, fees per grade level, and remaining seat quotas on WhatsApp at the same time, overwhelming admins who collect student details one by one.',
        solution:
          'An AI agent that answers class schedule, fee, and quota questions according to current rules, collects student registration details from the chat, records them in the registration table, and hands over to the admin for payment confirmation.',
        expectedOutcome:
          'Prospective students receive class details promptly and the admin receives complete student records ready for the payment step.',
      },
    ],
    collaborationHeading: 'How we work with clients in South Tangerang',
    collaborationParagraphs: [
      'Because CHESTAADOTCOM is based in BSD, South Tangerang, we work with businesses across all districts of South Tangerang and Greater Jakarta through a straightforward communication flow. Mapping rules, testing conversations, and reviewing logs can all be done online via WhatsApp and video call.',
      'If an in-person discussion is helpful to map your admin team’s workflow on-site, we can also meet in person in the South Tangerang area by agreement. Our experience includes AI-based chat systems, smart API gateways, and AI-based document processors, applied through the four steps below.',
    ],
    processSteps: [
      {
        stepNumber: '1',
        title: 'Free audit (30 minutes)',
        sentence:
          'We map the recurring conversations and tasks in your business, then tell you honestly which ones should be given to an agent and which should stay with humans.',
      },
      {
        stepNumber: '2',
        title: 'Design and prototype',
        sentence:
          'You review sample conversation flows and the list of actions the agent may and may not take before the system is built in full.',
      },
      {
        stepNumber: '3',
        title: 'Build and test',
        sentence:
          'The agent is connected to WhatsApp Business and the tools you use, then tested with real conversations including tough questions and out-of-rule requests.',
      },
      {
        stepNumber: '4',
        title: 'Release and maintain',
        sentence:
          'Once live, we monitor the action logs, fix off-target replies, and adjust the rules as your team uses the system.',
      },
    ],
    priceHeading: 'Pricing and scope for AI agents in South Tangerang',
    priceCopy:
      'AI agent pricing is calculated after the free 30-minute audit, because it depends on the number of connected tools (such as calendars, spreadsheets, or databases), business rules, and daily message volume. You receive the exact figure and scope before paying anything. Building systems and AI agents typically takes weeks, with the exact timeline provided after the audit.',
    priceNote: {
      startingPrice: 'Calculated after free audit',
      timeline: 'Weeks; exact estimate after the 30-minute audit',
      note: 'Your business data stays yours; access is removed when the project or maintenance contract ends.',
    },
    relatedProjectSlugs: ['wa-concierge-klinik', 'pemroses-dokumen'],
    relatedBlogSlug: 'otomasi-whatsapp-ai-klinik-fnb-alur-kerja',
    faqs: [
      {
        question: 'Is an AI agent suitable for a small business with only one or two admins?',
        answer:
          'It is suitable if those one or two admins spend every day answering the same questions repeatedly and copying chat data manually into spreadsheets. However, if you only receive a few messages a day and every one requires a personal touch, an agent is not needed yet and we will tell you that openly during the audit.',
      },
      {
        question: 'Where should we start if we do not have any system in place yet?',
        answer:
          'It is best to start with a single workflow that takes up the most time, such as WhatsApp replies and logging bookings to a calendar or spreadsheet. Once that first flow runs smoothly and your team is comfortable inspecting the logs, additional rules or tools can be added step by step.',
      },
      {
        question: 'How is customer data handled when messages pass through the agent?',
        answer:
          'Your customer data remains yours. We only access what is needed to build and maintain the system, and that access is removed when the project or maintenance contract ends.',
      },
    ],
    updatedAt: '2026-03-20',
    ogImageKey: 'ogAreaTangerangSelatan',
  },

  // 2A. WEBSITE DEVELOPMENT — BSD CITY
  {
    serviceSlug: 'pembuatan-website',
    serviceName: 'Website and landing page development',
    areaSlug: 'bsd-city',
    areaName: 'BSD City',
    indexable: true,
    eyebrow: 'Website development · BSD City',
    metaTitle: 'Business Website Development in BSD City | CHESTAADOTCOM',
    metaDescription:
      'Website and landing page development for aesthetic clinics, restaurants, property agents, and offices in BSD City, Serpong. From IDR 1,200,000.',
    h1: 'Website development for businesses in BSD City',
    quickSummary:
      'Website development in BSD City from CHESTAADOTCOM is built for aesthetic clinics, restaurants, offices, startups, property agents, and architecture studios in Serpong, South Tangerang. Every page opens quickly on mobile phones, presents your offer clearly, and guides visitors toward a booking or WhatsApp chat. Pricing starts from IDR 1,200,000 depending on complexity.',
    cekCepat: {
      cocokKalau:
        'Your business in BSD City is running ads or getting searched on Google, but visitors leave because there is no page that directly answers their questions.',
      mulaiDari:
        'A free 30-minute audit to inspect your existing pages, core offer, and competitors around BSD City.',
      harga:
        'Landing pages start from IDR 1,200,000 depending on complexity; company profiles and custom websites are calculated after the free audit.',
    },
    localContextHeading: 'Why businesses in BSD City need a fast page that gets straight to the point',
    localContextParagraphs: [
      'BSD City is a planned township in Serpong, South Tangerang featuring shopping centers such as AEON Mall BSD City and The Breeze, office districts, and the ICE BSD exhibition center. Across this area, there are generally many aesthetic clinics, restaurants, offices and startups, property agents, and architecture studios or contractors serving residents and visitors from across Greater Jakarta.',
      'Because many similar businesses operate close to one another in the same district, prospective customers in BSD City usually compare several providers on their phones before deciding to visit or send a message. When they click an ad or search result and encounter a page that loads slowly, omits starting prices, or hides the booking method behind too many steps, they generally move on to the next option.',
      'Designing a website for clinics and restaurants in BSD or for professional studios requires a straightforward structure: static pages that load fast on mobile networks, properly sized and compressed images, and one clear call to action per page. That way, visitors can view treatment lists, menus, or project portfolios immediately and contact your team on WhatsApp.',
    ],
    businessMixList: [
      'Aesthetic and treatment clinics needing dedicated pages per procedure with practice schedules',
      'Restaurants and cafes around BSD City commercial hubs needing menu and reservation pages',
      'Architecture studios, contractors, and consultants needing portfolio galleries and workflow explanations',
      'Property agents, offices, and startups in BSD City office districts',
    ],
    scenarios: [
      {
        label: 'Example scenario',
        title: 'An aesthetic clinic with a page per treatment and booking button',
        businessType: 'Aesthetic Clinic in BSD City',
        challenge:
          'Prospective patients who see ads for facial or body treatments want to know the procedure steps, starting prices, and practice hours before contacting the clinic admin.',
        solution:
          'A dedicated landing page for each treatment featuring a clear overview, starting price notes, practice hours, a WhatsApp booking button, and before-and-after photos published only with written patient consent.',
        expectedOutcome:
          'Visitors from ads understand the treatment immediately and click the WhatsApp button with a clear booking intent.',
      },
      {
        label: 'Example scenario',
        title: 'An architecture studio or contractor with a clear consultation flow',
        businessType: 'Architecture Studio & Contractor in BSD City',
        challenge:
          'Prospective clients looking to renovate or build property usually need to review project portfolios and understand the studio’s working stages before scheduling an initial discussion.',
        solution:
          'A company profile website with an image-optimized project gallery that stays fast on mobile phones, a step-by-step workflow explanation, and a consultation form connected directly to WhatsApp.',
        expectedOutcome:
          'Prospective clients understand how the studio works before reaching out, so incoming inquiries arrive with clear project requirements.',
      },
    ],
    collaborationHeading: 'How we work with clients in BSD City',
    collaborationParagraphs: [
      'CHESTAADOTCOM is based in BSD, South Tangerang. We work with clients online via WhatsApp and video call for daily coordination, sharing assets, and reviewing prototypes, and we can meet in person in the South Tangerang area—including BSD City—by agreement.',
      'All work is handled directly by Chesta Azka (architecture, product, technology) and Zeeshan (operations and client success) through four transparent steps from audit to release.',
    ],
    processSteps: [
      {
        stepNumber: '1',
        title: 'Free audit (30 minutes)',
        sentence:
          'We review your business goals in BSD City, inspect your existing pages or assets, and look at competitor pages around you.',
      },
      {
        stepNumber: '2',
        title: 'Design and prototype',
        sentence:
          'You review the information hierarchy, offer copy, and page layout before we build the full website.',
      },
      {
        stepNumber: '3',
        title: 'Build and test',
        sentence:
          'Pages are built statically for speed, images are compressed, and the site is tested on mobile phones and PageSpeed Insights.',
      },
      {
        stepNumber: '4',
        title: 'Release and maintain',
        sentence:
          'The website launches on a domain and hosting registered in your name, then is monitored and refined after visitor data comes in.',
      },
    ],
    priceHeading: 'Pricing and scope for website development in BSD City',
    priceCopy:
      'Starting from IDR 1,200,000 for a landing page, depending on complexity. The cost increases if the number of pages, features (such as booking or payments), or integrations grows. We share the exact figure after the free 30-minute audit, before you pay anything. Simple landing pages usually take days, while multi-page websites or custom features take weeks.',
    priceNote: {
      startingPrice: 'Starting from IDR 1,200,000',
      timeline: 'Days for a simple landing page; exact estimate after the audit',
      note: 'Domain and hosting are registered under your own name.',
    },
    relatedProjectSlugs: ['landing-klinik-estetika', 'chestaa-v2'],
    relatedBlogSlug: 'kenapa-landing-page-lambat-bikin-iklan-boncos',
    faqs: [
      {
        question: 'How can my website stand out among many similar businesses in BSD City?',
        answer:
          'By presenting a clear offer, fast loading speeds on mobile phones, and a page structure that answers prospective customers’ questions before they ask. We also set up foundational SEO—page titles, heading structure, sitemap, and structured data—without ever making ranking promises.',
      },
      {
        question: 'Do client photos and content require permission before being placed on the website?',
        answer:
          'Yes, we always recommend obtaining written permission before publishing any client documentation, such as clinic before-and-after photos or residential project photos. During the audit, we help review the photos and logo you already have.',
      },
      {
        question: 'Will the website domain and hosting belong to my business?',
        answer:
          'Yes, the domain and hosting are registered directly under your name so you are never locked in with us. After release, you can choose our monthly maintenance plan or manage it yourself.',
      },
    ],
    updatedAt: '2026-03-20',
    ogImageKey: 'ogAreaBsdCity',
  },

  // 2B. AI AGENT — BSD CITY
  {
    serviceSlug: 'ai-agent',
    serviceName: 'AI agent',
    areaSlug: 'bsd-city',
    areaName: 'BSD City',
    indexable: true,
    eyebrow: 'AI agent · BSD City',
    metaTitle: 'AI Agent Services for Business in BSD City | CHESTAADOTCOM',
    metaDescription:
      'WhatsApp AI agents for restaurants, aesthetic clinics, property agents, and offices in BSD City. Schedule checks, reservations, and staff handover.',
    h1: 'AI agent services for businesses in BSD City',
    quickSummary:
      'CHESTAADOTCOM builds WhatsApp AI agents for businesses in BSD City—from aesthetic clinics and restaurants to property agents and offices in Serpong, South Tangerang. The agent understands customer messages, uses tools like calendars and CRMs to record bookings or site visits, and hands sensitive cases over to your staff. Pricing is calculated after a free audit.',
    cekCepat: {
      cocokKalau:
        'Your business in BSD City receives many chat inquiries about menus, treatment slots, or property unit viewings during peak hours and evenings that go unanswered.',
      mulaiDari:
        'A free 30-minute audit to map your customers’ 10 most frequent questions and define the agent’s action boundaries.',
      harga:
        'Calculated after the free audit based on the number of connected tools, business rules, and message volume.',
    },
    localContextHeading: 'Why businesses in BSD City need an AI agent connected to calendars and CRMs',
    localContextParagraphs: [
      'As a planned township in Serpong, South Tangerang with shopping centers such as AEON Mall BSD City and The Breeze, office districts, and the ICE BSD exhibition center, business activity in BSD City often peaks around lunch hours, weekends, or exhibition dates. During those busy periods, restaurants, aesthetic clinics, and property agents generally receive a surge of incoming WhatsApp messages all at once.',
      'When admins have to answer questions about opening hours, table availability, treatment slots, or property unit types one by one while serving walk-in guests, some chats get delayed or forgotten. In addition, copying group reservations or viewing schedules manually from WhatsApp chats into spreadsheets risks double-booking.',
      'With a WhatsApp AI agent for businesses in BSD City, the system does not stop at canned replies—it reads customer intent, checks availability in your calendar or database, and completes the reservation or viewing schedule entry. Every action is governed by rules written together with you, recorded in an inspectable log, and automatically handed over to human staff with a conversation summary whenever a special request or complaint arises.',
    ],
    businessMixList: [
      'Restaurants and cafes in BSD City commercial hubs handling table and group reservations',
      'Aesthetic clinics managing therapist schedules and patient appointment reminders',
      'Property agents and marketing offices scheduling unit site visits',
      'Offices, startups, and architecture studios qualifying incoming consultation requests',
    ],
    scenarios: [
      {
        label: 'Example scenario',
        title: 'A restaurant handling table reservations and menu questions during peak hours',
        businessType: 'Restaurant & Cafe in BSD City',
        challenge:
          'During lunch hours and weekends, restaurant staff are busy serving dine-in guests, so incoming WhatsApp messages asking about the menu, opening hours, and group table availability wait too long for a reply.',
        solution:
          'An AI agent that answers menu, opening hour, and table availability questions, records group reservations directly into the restaurant schedule, and forwards complaints or special requests to staff with full context.',
        expectedOutcome:
          'Guests receive fast reservation confirmations, while complaints or special requests go straight to human staff without making the guest repeat themselves.',
      },
      {
        label: 'Example scenario',
        title: 'A property agency qualifying leads and scheduling site visits',
        businessType: 'Property Agency in BSD City',
        challenge:
          'Messages from prospective buyers interested in viewing units often arrive in the evening or on weekends, and agents have to ask about budget, location, and unit type repeatedly before arranging a visit.',
        solution:
          'An AI agent that asks about budget range, preferred location, and unit type on WhatsApp, schedules a viewing slot on the calendar, and sends the buyer’s summary to the right agent.',
        expectedOutcome:
          'Prospective buyers are assisted while their interest is high, and property agents receive scheduled visits with clear buyer details.',
      },
    ],
    collaborationHeading: 'How we work with clients in BSD City',
    collaborationParagraphs: [
      'Based in BSD, South Tangerang, CHESTAADOTCOM works with businesses in BSD City both online via WhatsApp and video call and through in-person meetings in the South Tangerang area by agreement. We start every project by reviewing real conversation flows from your business.',
      'Our experience includes AI-based chat systems, smart API gateways, and AI-based document processors. Every project follows the four steps below so the agent’s action rules match how your team actually works.',
    ],
    processSteps: [
      {
        stepNumber: '1',
        title: 'Free audit (30 minutes)',
        sentence:
          'We map the recurring conversations in your BSD City business and tell you honestly which parts should be handled by an agent.',
      },
      {
        stepNumber: '2',
        title: 'Design and prototype',
        sentence:
          'You review sample conversation flows and the rules governing what the agent may and may not do before we build it in full.',
      },
      {
        stepNumber: '3',
        title: 'Build and test',
        sentence:
          'The agent is connected to WhatsApp Business and your work tools, then tested with real conversations including out-of-rule scenarios.',
      },
      {
        stepNumber: '4',
        title: 'Release and maintain',
        sentence:
          'We monitor the action logs with your team, fix off-target replies, and adjust the rules as it gets used.',
      },
    ],
    priceHeading: 'Pricing and scope for AI agents in BSD City',
    priceCopy:
      'AI agent pricing is calculated after the free 30-minute audit, because it depends on the number of connected tools, business rules, and message volume. You know the exact figure before paying anything. Building systems and AI agents typically takes weeks, with the exact timeline provided after the audit.',
    priceNote: {
      startingPrice: 'Calculated after free audit',
      timeline: 'Weeks; exact estimate after the 30-minute audit',
      note: 'Includes clear action boundaries, human staff handover, and complete logs.',
    },
    relatedProjectSlugs: ['wa-concierge-klinik', 'pemroses-dokumen'],
    relatedBlogSlug: 'Apa-Bedanya-AI-Agent-dan-Chatbot-Biasa-untuk-Operasional-Bisnis',
    faqs: [
      {
        question: 'Can the agent handle many questions at the same time during busy hours?',
        answer:
          'Yes. When many messages arrive simultaneously during lunch hours, weekends, or exhibition periods, the agent reads and replies to each conversation while checking your calendar or database according to agreed rules. All actions are recorded in the log so your staff can review them.',
      },
      {
        question: 'What happens if a customer asks for something outside the rules?',
        answer:
          'The agent has explicit action boundaries written together with you upfront. Whenever a customer submits a complaint, special negotiation, or out-of-rule question, the agent does not guess—it hands the conversation over to your staff together with a conversation summary.',
      },
      {
        question: 'What should my business in BSD City prepare before the free audit?',
        answer:
          'Simply prepare the ten questions customers ask most frequently, your operating hours and pricing rules, the list of actions the agent is allowed to perform, and who on your team handles out-of-rule cases. From there we map the flow and cost estimate in 30 minutes.',
      },
    ],
    updatedAt: '2026-03-20',
    ogImageKey: 'ogAreaBsdCity',
  },

  // 3A. WEBSITE DEVELOPMENT — PAMULANG
  {
    serviceSlug: 'pembuatan-website',
    serviceName: 'Website and landing page development',
    areaSlug: 'pamulang',
    areaName: 'Pamulang',
    indexable: true,
    eyebrow: 'Website development · Pamulang',
    metaTitle: 'Business Website Development in Pamulang | CHESTAADOTCOM',
    metaDescription:
      'Website and landing page development for boarding houses, courses, eateries, and SMEs in Pamulang, South Tangerang. Fast on mobile, from IDR 1,200,000.',
    h1: 'Website development for businesses in Pamulang',
    quickSummary:
      'Website development in Pamulang from CHESTAADOTCOM helps boarding house (kos-kosan) owners, eateries, tutoring and course centers, online shops, workshops, and laundries in Pamulang District, South Tangerang build web pages that open fast on mobile phones and guide visitors straight to WhatsApp. Pricing starts from IDR 1,200,000 depending on complexity.',
    cekCepat: {
      cocokKalau:
        'Your business in Pamulang is frequently searched by students, local residents, or customers on their phones, but lacks a clean page summarizing prices, facilities, map location, and a WhatsApp button.',
      mulaiDari:
        'A free 30-minute audit to review your page needs and decide the clearest information structure.',
      harga:
        'Landing pages start from IDR 1,200,000 depending on complexity; domain and hosting are registered in your own name.',
    },
    localContextHeading: 'Why businesses in Pamulang benefit from a lightweight mobile website',
    localContextParagraphs: [
      'Pamulang is a densely populated district in South Tangerang and home to Universitas Pamulang. The combination of a major university campus and busy residential neighborhoods keeps daily local commerce active: there are generally many boarding houses (kos-kosan), eateries, tutoring and course centers, online shops, workshops, and laundries serving students and families.',
      'Prospective customers in Pamulang—such as incoming students searching for a boarding room from out of town, parents looking for a course center, or residents searching for a workshop or eatery—usually search on Google or tap social media links on their mobile phones. When room details, course fees, or service lists are buried in old social posts without a structured page, prospective customers have to ask from scratch or choose another place whose details are easier to read.',
      'Providing a website for boarding houses in Pamulang or for local courses and daily services does not need to be complicated or expensive. A single static page that loads quickly on mobile data, displays properly compressed photos, lists starting prices and a location map, and provides a direct WhatsApp button is enough to help prospective customers contact you with clear intent.',
    ],
    businessMixList: [
      'Boarding house (kos-kosan) owners around Universitas Pamulang and residential neighborhoods',
      'Tutoring centers (bimbel) and language, computer, or skill course providers',
      'Eateries, daily catering services, laundries, and repair workshops',
      'Online shops and resellers based in Pamulang District',
    ],
    scenarios: [
      {
        label: 'Example scenario',
        title: 'A boarding house owner with room pages and a schedule-viewing button',
        businessType: 'Boarding House (Kos-Kosan) in Pamulang',
        challenge:
          'At the start of every semester, many prospective tenants message one by one asking for room photos, monthly rates, facilities, and map pins, while some only ask because they have not seen the price range yet.',
        solution:
          'A single website page displaying photos for each room type, monthly rates, a facility checklist (such as Wi-Fi, private bathroom, or parking), a location map, and a button to schedule a room viewing via WhatsApp.',
        expectedOutcome:
          'Prospective tenants who message on WhatsApp have already reviewed the photos, facilities, and room rates, so the conversation focuses directly on scheduling a visit.',
      },
      {
        label: 'Example scenario',
        title: 'A course or tutoring center with program details and registration form',
        businessType: 'Course & Tutoring Center in Pamulang',
        challenge:
          'Prospective students or parents often find it hard to compare study programs, class schedules, and fee details when looking only at image posters on social media.',
        solution:
          'A website page outlining the course programs, class schedule options, fee details, and a short registration form that sends student details straight to the admin’s WhatsApp.',
        expectedOutcome:
          'Prospective students understand which program fits them before registering, and the admin receives organized registration details.',
      },
    ],
    collaborationHeading: 'How we work with clients in Pamulang',
    collaborationParagraphs: [
      'CHESTAADOTCOM is based in BSD, South Tangerang and serves business owners in Pamulang District and surrounding South Tangerang areas. The entire process—from initial consultation and sending room photos or course materials to reviewing the page—can be done online via WhatsApp and video call.',
      'If an in-person meeting is needed to discuss your website structure, we can also schedule a meeting in the South Tangerang area by agreement. Every project follows the four steps below.',
    ],
    processSteps: [
      {
        stepNumber: '1',
        title: 'Free audit (30 minutes)',
        sentence:
          'We review your business goals in Pamulang, your existing photos or social media links, and the main action you want from visitors.',
      },
      {
        stepNumber: '2',
        title: 'Design and prototype',
        sentence:
          'You see the page layout and copy structure first before the website is built in full.',
      },
      {
        stepNumber: '3',
        title: 'Build and test',
        sentence:
          'The page is built statically for speed, images are compressed to save mobile data, and the site is tested on phones and PageSpeed Insights.',
      },
      {
        stepNumber: '4',
        title: 'Release and maintain',
        sentence:
          'The website launches on a domain and hosting registered in your name, then is monitored after visitors start arriving.',
      },
    ],
    priceHeading: 'Pricing and scope for website development in Pamulang',
    priceCopy:
      'Starting from IDR 1,200,000 for a landing page, depending on complexity. The cost increases if the number of pages, custom features, or integrations grows. We share the exact figure after the free 30-minute audit, before you pay anything. Simple landing pages usually take days.',
    priceNote: {
      startingPrice: 'Starting from IDR 1,200,000',
      timeline: 'Days for a simple landing page; exact estimate after the audit',
      note: 'Domain and hosting are registered directly under your name.',
    },
    relatedProjectSlugs: ['landing-klinik-estetika', 'chestaa-v2'],
    relatedBlogSlug: 'berapa-biaya-bikin-website-bisnis-panduan-harga',
    faqs: [
      {
        question: 'Is this suitable for a boarding house or a small course center in Pamulang?',
        answer:
          'Yes, it fits very well whenever the page has a clear goal, such as helping prospective tenants view room details and schedule a visit, or helping students register for a course. For a single landing page, pricing starts from IDR 1,200,000 depending on complexity.',
      },
      {
        question: 'Can I use my own domain, and who handles the hosting?',
        answer:
          'You can use your own chosen domain, and both the domain and hosting are registered directly under your name. We help set everything up during the build so you retain full ownership without being locked in with us.',
      },
      {
        question: 'What should I prepare before the free 30-minute audit?',
        answer:
          'Simply prepare links to your social media or old website if you have one, examples of websites you like, the main action you want from visitors (such as chatting to view a room or registering for a class), and any existing photos and logo.',
      },
    ],
    updatedAt: '2026-03-20',
    ogImageKey: 'ogAreaPamulang',
  },

  // 3B. AI AGENT — PAMULANG
  {
    serviceSlug: 'ai-agent',
    serviceName: 'AI agent',
    areaSlug: 'pamulang',
    areaName: 'Pamulang',
    indexable: true,
    eyebrow: 'AI agent · Pamulang',
    metaTitle: 'AI Agent Services for Business in Pamulang | CHESTAADOTCOM',
    metaDescription:
      'WhatsApp AI agents for businesses in Pamulang: check boarding room availability, reply to online shop stock, schedule visits, and log data. Free audit.',
    h1: 'AI agent services for businesses in Pamulang',
    quickSummary:
      'CHESTAADOTCOM builds WhatsApp AI agents for businesses in Pamulang, South Tangerang—from boarding houses and tutoring centers near Universitas Pamulang to online shops, eateries, workshops, and laundries. The agent understands customer questions, checks room availability or stock tables, schedules viewings, and logs data automatically. Pricing is calculated after a free audit.',
    cekCepat: {
      cocokKalau:
        'You or your admin in Pamulang spend every day replying to "are there any rooms available?" or "is this item in stock?" one by one on WhatsApp.',
      mulaiDari:
        'A free 30-minute audit to review your recurring questions and see whether an AI agent genuinely saves you time.',
      harga:
        'Calculated after the free 30-minute audit based on the number of tools, rules, and message volume, before you pay anything.',
    },
    localContextHeading: 'Why businesses in Pamulang benefit from a WhatsApp AI agent',
    localContextParagraphs: [
      'Pamulang District in South Tangerang is a densely populated area and home to Universitas Pamulang. Many local businesses here—such as boarding houses (kos-kosan), online shops and resellers, tutoring centers, eateries, workshops, and laundries—are operated directly by their owners or supported by a single admin handling multiple daily tasks.',
      'When dozens of WhatsApp chats come in asking recurring questions about room availability, monthly rent, online shop stock, or order status, business owners have to check their phones constantly between other tasks. As a result, messages sent at night often wait until the next morning for a reply, and room viewing schedules or monthly payment reminders still rely on memory.',
      'By setting up a WhatsApp AI agent for businesses in Pamulang, those repetitive tasks are handled systematically: the agent reads message intent, checks your room list or stock table, sends the right details and photos, and books viewing times on the calendar. Whenever a question falls outside the rules or a customer raises a complaint, the agent forwards it straight to the owner or admin with a conversation summary.',
    ],
    businessMixList: [
      'Boarding houses managing room availability inquiries, viewing schedules, and monthly payment reminders',
      'Online shops and resellers answering order status and stock availability questions daily',
      'Tutoring and course centers in Pamulang handling class schedule inquiries and registrations',
      'Eateries, workshops, and laundries receiving daily service questions on WhatsApp',
    ],
    scenarios: [
      {
        label: 'Example scenario',
        title: 'A boarding house checking open rooms and scheduling viewings',
        businessType: 'Boarding House (Kos-Kosan) in Pamulang',
        challenge:
          'Prospective tenants frequently send short messages like "any empty rooms?" at all hours, requiring the owner to check room notes, send photos, explain rates, and arrange viewing times repeatedly.',
        solution:
          'An AI agent that checks the current room availability table, sends photos and pricing for open rooms, schedules a viewing slot on the calendar, and sends monthly payment reminders to tenants.',
        expectedOutcome:
          'Room availability questions are answered anytime based on current data, and the owner only receives scheduled viewings from prospective tenants who already match the price and facilities.',
      },
      {
        label: 'Example scenario',
        title: 'An online shop or reseller answering stock and order status inquiries',
        businessType: 'Online Shop & Reseller in Pamulang',
        challenge:
          'Online shop admins spend hours checking stock spreadsheets and shipping lists every time a customer asks whether an item is available or has shipped.',
        solution:
          'An AI agent connected to stock and order tables to answer availability and order status automatically, record new customer details, and hand shipping complaints over to the admin with a chat summary.',
        expectedOutcome:
          'Customers get prompt answers without waiting for an admin to open spreadsheets one by one, and customer records stay organized.',
      },
    ],
    collaborationHeading: 'How we work with clients in Pamulang',
    collaborationParagraphs: [
      'CHESTAADOTCOM is based in BSD, South Tangerang and works with business owners in Pamulang both online via WhatsApp and video call and through in-person meetings in the South Tangerang area by agreement. We speak openly during the audit: if your daily message volume is still small and does not need an agent yet, we will tell you upfront.',
      'For businesses ready to use an AI agent, we build and test the system through four clear steps together with Chesta Azka and Zeeshan.',
    ],
    processSteps: [
      {
        stepNumber: '1',
        title: 'Free audit (30 minutes)',
        sentence:
          'We map the daily questions arriving on your Pamulang business WhatsApp and assess which ones should be handled by an agent.',
      },
      {
        stepNumber: '2',
        title: 'Design and prototype',
        sentence:
          'You review sample conversation flows and the agent’s action rules before the system is built in full.',
      },
      {
        stepNumber: '3',
        title: 'Build and test',
        sentence:
          'The agent is connected to WhatsApp Business and your tables or calendar, then tested using real conversations.',
      },
      {
        stepNumber: '4',
        title: 'Release and maintain',
        sentence:
          'We monitor the action logs, fix off-target replies, and adjust the rules as the system is used.',
      },
    ],
    priceHeading: 'Pricing and scope for AI agents in Pamulang',
    priceCopy:
      'AI agent pricing is calculated after the free 30-minute audit, based on the number of connected tools, business rules, and message volume. You receive the exact figure before paying anything. Building systems and AI agents typically takes weeks, with the exact estimate shared after the audit.',
    priceNote: {
      startingPrice: 'Calculated after free audit',
      timeline: 'Weeks; exact estimate after the 30-minute audit',
      note: 'Includes inspectable action logs and human handover rules.',
    },
    relatedProjectSlugs: ['wa-concierge-klinik', 'pemroses-dokumen'],
    relatedBlogSlug: 'otomasi-whatsapp-ai-klinik-fnb-alur-kerja',
    faqs: [
      {
        question: 'Can the agent distinguish between serious prospective tenants and casual inquiries?',
        answer:
          'Yes, through the qualification questions we set together. The agent can ask for the planned move-in date, rental duration, and budget fit first before scheduling a viewing time on the calendar or forwarding the inquiry to you.',
      },
      {
        question: 'If I only have one admin, does using an AI agent still make sense?',
        answer:
          'It makes sense if that single admin is overwhelmed every day answering dozens of repetitive questions and copying chat data into spreadsheets manually. On the other hand, if only a few messages arrive per day and all of them need a personal touch, an agent is not needed yet and we will tell you that openly during the audit.',
      },
      {
        question: 'Are my room lists, stock tables, and customer phone numbers kept safe?',
        answer:
          'Your business data stays yours. We only access what is needed to build and maintain the system, and our access is removed when the project or maintenance contract ends.',
      },
    ],
    updatedAt: '2026-03-20',
    ogImageKey: 'ogAreaPamulang',
  },

  // 4A. WEBSITE DEVELOPMENT — JURANG MANGU
  {
    serviceSlug: 'pembuatan-website',
    serviceName: 'Website and landing page development',
    areaSlug: 'jurang-mangu',
    areaName: 'Jurang Mangu',
    indexable: true,
    eyebrow: 'Website development · Jurang Mangu',
    metaTitle: 'Website Development in Jurang Mangu | CHESTAADOTCOM',
    metaDescription:
      'Website and landing page development for renovation services, medical practices, food businesses, and courses in Jurang Mangu. From IDR 1,200,000.',
    h1: 'Website development for businesses in Jurang Mangu',
    quickSummary:
      'Website development in Jurang Mangu from CHESTAADOTCOM helps renovation services, medical practices, home-based food businesses or cafes, and course providers in Jurang Mangu Subdistrict, Pondok Aren, South Tangerang build pages that open fast on mobile phones and guide visitors straight to WhatsApp. Pricing starts from IDR 1,200,000 depending on complexity.',
    cekCepat: {
      cocokKalau:
        'Your business in Jurang Mangu and around Pondok Aren needs a clean page to show renovation portfolios, practice hours, or pre-order menus without complicated steps.',
      mulaiDari:
        'A free 30-minute audit to review the materials you already have and plan a clear page structure.',
      harga:
        'Landing pages start from IDR 1,200,000 depending on complexity; exact figure shared after the free audit.',
    },
    localContextHeading: 'Why businesses in Jurang Mangu need a website that answers residents’ questions directly',
    localContextParagraphs: [
      'Jurang Mangu is a subdistrict in Pondok Aren, South Tangerang located around the Bintaro area. As a dense and growing residential neighborhood, local demand here generally centers on household and family services: medical practices, home-based food businesses and cafes, home renovation services, and courses.',
      'When residents in Jurang Mangu and surrounding neighborhoods look for a renovation contractor, want to visit a doctor’s practice, or want to place a food pre-order, they usually search on Google or open links shared in neighborhood chat groups on their phones. If the link loads too slowly or fails to explain the workflow and ordering steps clearly, prospective customers often hesitate to message.',
      'Building a website for renovation services in Jurang Mangu or for local food and healthcare providers focuses on clarity: showing past project photos published with the owner’s permission, explaining the service workflow step by step, and placing a WhatsApp button that sends a pre-formatted message directly to your business number.',
    ],
    businessMixList: [
      'Home renovation services and contractors serving neighborhoods in Jurang Mangu and Pondok Aren',
      'General medical practices, dental practices, and neighborhood health services',
      'Home-based food businesses, pre-order catering, and cafes',
      'Course centers and private lessons for school students and adults in Jurang Mangu',
    ],
    scenarios: [
      {
        label: 'Example scenario',
        title: 'A renovation service or contractor with a portfolio and estimate request button',
        businessType: 'Renovation Service & Contractor in Jurang Mangu',
        challenge:
          'Homeowners looking to repair a roof, remodel a kitchen, or add a room usually want to see examples of previous work and understand the survey steps before contacting a contractor.',
        solution:
          'A website page displaying a project portfolio with before-and-after photos (published with homeowner permission), a clear workflow from site survey to handover, and a button to request an estimate via WhatsApp.',
        expectedOutcome:
          'Prospective clients trust your structured workflow and send a WhatsApp message specifying the renovation work they need.',
      },
      {
        label: 'Example scenario',
        title: 'A home food business or cafe with a menu and WhatsApp pre-order system',
        businessType: 'Home Food Business & Cafe in Jurang Mangu',
        challenge:
          'Customers who want to order daily meals or event packages often struggle to check the latest menu, pre-order cut-off times, and delivery schedules when relying only on chat statuses.',
        solution:
          'A lightweight single-page website containing the full menu with prices, pre-order schedule rules, delivery coverage, and an order button that opens WhatsApp with the selected items.',
        expectedOutcome:
          'Customers browse the menu comfortably on their phones and send organized WhatsApp orders without long back-and-forth chats.',
      },
    ],
    collaborationHeading: 'How we work with clients in Jurang Mangu',
    collaborationParagraphs: [
      'CHESTAADOTCOM is based in BSD, South Tangerang and serves business owners in Jurang Mangu, Pondok Aren, and across South Tangerang and Greater Jakarta. Gathering materials, reviewing layouts, and launching the website are all handled online via WhatsApp and video call.',
      'Because Jurang Mangu is part of South Tangerang, in-person meetings can also be arranged in the South Tangerang area by agreement. Every project follows the four steps below.',
    ],
    processSteps: [
      {
        stepNumber: '1',
        title: 'Free audit (30 minutes)',
        sentence:
          'We review your business goals in Jurang Mangu, inspect your existing materials, and offer practical advice before any work begins.',
      },
      {
        stepNumber: '2',
        title: 'Design and prototype',
        sentence:
          'You review the page structure and copy first before we build the full page.',
      },
      {
        stepNumber: '3',
        title: 'Build and test',
        sentence:
          'Pages are built statically for fast loading, images are compressed to proper dimensions, and the site is tested on phones and PageSpeed Insights.',
      },
      {
        stepNumber: '4',
        title: 'Release and maintain',
        sentence:
          'The website goes live on a domain and hosting registered in your name, then is monitored after visitors start arriving.',
      },
    ],
    priceHeading: 'Pricing and scope for website development in Jurang Mangu',
    priceCopy:
      'Starting from IDR 1,200,000 for a landing page, depending on complexity. The cost increases if the number of pages, features (such as booking or payments), or integrations grows. We share the exact figure after the free 30-minute audit, before you pay anything. Simple landing pages usually take days.',
    priceNote: {
      startingPrice: 'Starting from IDR 1,200,000',
      timeline: 'Days for a simple landing page; exact estimate after the audit',
      note: 'Domain and hosting are registered under your own name.',
    },
    relatedProjectSlugs: ['landing-klinik-estetika', 'chestaa-v2'],
    relatedBlogSlug: 'checklist-landing-page-konversi-tinggi-umkm-b2b',
    faqs: [
      {
        question: 'What if my business is new and I do not have good photos or a logo yet?',
        answer:
          'That is completely fine. We help organize the materials you currently have so the page still looks clean and readable on mobile screens, and we give practical suggestions for taking photos during the free 30-minute audit.',
      },
      {
        question: 'Can the website be used to receive orders via WhatsApp?',
        answer:
          'Yes. We place WhatsApp buttons and short forms on the website that send order details or estimate requests straight to your business WhatsApp number without complicated steps.',
      },
      {
        question: 'How long does it take to build a simple website for a business in Jurang Mangu?',
        answer:
          'Simple landing pages usually take days, while websites with multiple pages or custom features take weeks. We provide the exact timeline and cost estimate after the free audit.',
      },
    ],
    updatedAt: '2026-03-20',
    ogImageKey: 'ogAreaJurangMangu',
  },

  // 4B. AI AGENT — JURANG MANGU
  {
    serviceSlug: 'ai-agent',
    serviceName: 'AI agent',
    areaSlug: 'jurang-mangu',
    areaName: 'Jurang Mangu',
    indexable: true,
    eyebrow: 'AI agent · Jurang Mangu',
    metaTitle: 'Business AI Agent Services in Jurang Mangu | CHESTAADOTCOM',
    metaDescription:
      'AI agents for medical practices, clinics, renovation services, and courses in Jurang Mangu, Pondok Aren. Bookings, checkup reminders, and surveys.',
    h1: 'AI agent services for businesses in Jurang Mangu',
    quickSummary:
      'CHESTAADOTCOM builds AI agents for clinics and medical practices in Jurang Mangu as well as renovation services, food businesses, and courses in Pondok Aren, South Tangerang. The agent reads customer WhatsApp messages, checks calendar slots, collects initial survey details or creates bookings, and sends checkup reminders automatically. Priced after a free audit.',
    cekCepat: {
      cocokKalau:
        'Your medical practice, renovation business, or course center in Jurang Mangu often falls behind on replying to booking chats, sending checkup reminders, or gathering initial survey details.',
      mulaiDari:
        'A free 30-minute audit to map your daily customer questions and define the agent’s action boundaries.',
      harga:
        'Calculated after the free 30-minute audit based on the number of tools, rules, and message volume, before you pay anything.',
    },
    localContextHeading: 'Why medical practices and service businesses in Jurang Mangu need an AI agent',
    localContextParagraphs: [
      'In Jurang Mangu Subdistrict, Pondok Aren, South Tangerang—around the Bintaro area—many businesses operate within dense residential neighborhoods, including medical and dental practices, home renovation services, food businesses, and course providers. Customers here generally prefer chatting directly on WhatsApp to ask about practice hours, request home repair estimates, or check lesson schedules.',
      'For medical practices or renovation contractors with a small admin team, answering common questions one by one while gathering initial details (such as general symptoms, preferred visit time, room dimensions to renovate, or site photos) can take hours every day. Furthermore, reminding returning patients about six-month checkups manually from notebooks or spreadsheets is easy to miss.',
      'By connecting an AI agent to WhatsApp Business, your calendar, and your data tables, initial information gathering, booking creation, and checkup reminder messages run automatically within the rules we write together. Whenever a customer asks something outside those rules or raises a sensitive case, the agent forwards the conversation straight to your human staff with a summary.',
    ],
    businessMixList: [
      'Medical and dental practices in Jurang Mangu needing appointment bookings and checkup reminders',
      'Home renovation services and contractors collecting job details and photos before site surveys',
      'Course centers and tutoring providers answering class schedule questions via WhatsApp',
      'Home food businesses and pre-order catering around Jurang Mangu and Pondok Aren',
    ],
    scenarios: [
      {
        label: 'Example scenario',
        title: 'A dental practice with appointment bookings and six-month checkup reminders',
        businessType: 'Dental Practice in Jurang Mangu',
        challenge:
          'Practice admins have to answer common questions about services and opening hours every day, while six-month dental checkup reminders for past patients are often missed because they must be checked manually.',
        solution:
          'An AI agent that answers common service questions according to practice rules, checks open calendar slots to create bookings, and sends scheduled six-month checkup reminders.',
        expectedOutcome:
          'Patients book checkup slots easily on WhatsApp and receive timely checkup reminders without adding manual work for the admin.',
      },
      {
        label: 'Example scenario',
        title: 'A renovation service gathering job details and photos before a site survey',
        businessType: 'Renovation Service in Jurang Mangu',
        challenge:
          'When a homeowner messages "can you renovate our back room?", the technical team has to go back and forth asking for the work type, rough size, location, and condition photos before scheduling a survey.',
        solution:
          'An AI agent that asks step by step for the renovation type, approximate dimensions, house location, and condition photos on WhatsApp, records the answers, and schedules a site survey on the calendar.',
        expectedOutcome:
          'The survey team visits the site with photos and job details already organized from the WhatsApp conversation.',
      },
    ],
    collaborationHeading: 'How we work with clients in Jurang Mangu',
    collaborationParagraphs: [
      'CHESTAADOTCOM is based in BSD, South Tangerang and serves clients in Jurang Mangu, Pondok Aren, and across South Tangerang and Greater Jakarta. Mapping rules, reviewing conversation prototypes, and testing are handled online via WhatsApp and video call, or through in-person meetings in the South Tangerang area by agreement.',
      'Our experience includes AI-based chat systems, smart API gateways, and AI-based document processors. Every project follows the four steps below.',
    ],
    processSteps: [
      {
        stepNumber: '1',
        title: 'Free audit (30 minutes)',
        sentence:
          'We map the recurring conversations at your practice or business in Jurang Mangu and tell you honestly which parts should be handled by an agent.',
      },
      {
        stepNumber: '2',
        title: 'Design and prototype',
        sentence:
          'You review sample Q&A flows and the agent’s action boundaries before the system is built in full.',
      },
      {
        stepNumber: '3',
        title: 'Build and test',
        sentence:
          'The agent is connected to WhatsApp Business and your calendar or tables, then tested with real conversations before release.',
      },
      {
        stepNumber: '4',
        title: 'Release and maintain',
        sentence:
          'We monitor the action logs, fix off-target replies, and adjust the rules as your team uses the system.',
      },
    ],
    priceHeading: 'Pricing and scope for AI agents in Jurang Mangu',
    priceCopy:
      'AI agent pricing is calculated after the free 30-minute audit, because it depends on the number of connected tools, business rules, and message volume. You know the exact figure before paying anything. Building systems and AI agents typically takes weeks, with the exact timeline provided after the audit.',
    priceNote: {
      startingPrice: 'Calculated after free audit',
      timeline: 'Weeks; exact estimate after the 30-minute audit',
      note: 'Includes clear action boundaries, human handover, and complete action logs.',
    },
    relatedProjectSlugs: ['wa-concierge-klinik', 'pemroses-dokumen'],
    relatedBlogSlug: 'otomasi-whatsapp-ai-klinik-fnb-alur-kerja',
    faqs: [
      {
        question: 'Can the agent send checkup reminders to patients?',
        answer:
          'Yes. As long as patient visit dates are recorded in a connected calendar or database, the agent can send day-before appointment reminders as well as periodic checkup reminders according to the rules we set together.',
      },
      {
        question: 'What happens if a customer asks a question outside my line of business?',
        answer:
          'The agent follows strict rules on what it may and may not answer. If a customer asks something outside your business scope or requires human judgment, the agent hands the conversation over to your staff together with a chat summary.',
      },
      {
        question: 'Does my patient or customer data remain owned by my business?',
        answer:
          'Yes, all data stays yours. We only access what is needed to build and maintain the system, and our access is removed when the project or maintenance contract ends.',
      },
    ],
    updatedAt: '2026-03-20',
    ogImageKey: 'ogAreaJurangMangu',
  },

  // 5A. WEBSITE DEVELOPMENT — LEBAK BULUS
  {
    serviceSlug: 'pembuatan-website',
    serviceName: 'Website and landing page development',
    areaSlug: 'lebak-bulus',
    areaName: 'Lebak Bulus',
    indexable: true,
    eyebrow: 'Website development · Lebak Bulus',
    metaTitle: 'Website Development in Lebak Bulus | CHESTAADOTCOM',
    metaDescription:
      'Website and landing page development for cafes, catering, and professional services in Lebak Bulus, South Jakarta. Fast on mobile, from IDR 1,200,000.',
    h1: 'Website development for businesses in Lebak Bulus',
    quickSummary:
      'Website development in Lebak Bulus from CHESTAADOTCOM helps cafes, catering businesses, consultants, professional services, and online businesses in Lebak Bulus Subdistrict, Cilandak, South Jakarta build pages that open fast on mobile phones and guide visitors straight to WhatsApp. Pricing starts from IDR 1,200,000 depending on complexity.',
    cekCepat: {
      cocokKalau:
        'Your business around Lebak Bulus wants commuters and clients to view pre-order menus, opening hours, or service workflows and contact you on WhatsApp right away.',
      mulaiDari:
        'A free 30-minute online audit to review your current pages and define the main goal.',
      harga:
        'Landing pages start from IDR 1,200,000 depending on complexity; company profiles and custom websites are calculated after the free audit.',
    },
    localContextHeading: 'Why businesses in Lebak Bulus need a concise, fast mobile website',
    localContextParagraphs: [
      'Lebak Bulus is a subdistrict in Cilandak, South Jakarta—not part of South Tangerang—located on the southwestern side of Jakarta near the South Tangerang border. Because Lebak Bulus MRT Jakarta Station is located here, many commuters pass through every morning and evening alongside residential neighborhoods and businesses such as cafes, catering providers, professional services, and online shops.',
      'Commuters and residents around Lebak Bulus generally check information on their mobile phones with limited reading time: they want to check a cafe’s opening hours, view a pre-order menu they can pick up on the way home, or read a consulting firm’s service workflow before scheduling a discussion. If a web page opens slowly on mobile data or splits key details across too many screens, visitors often drop off.',
      'Building a website for cafes and professional services in Lebak Bulus calls for lightweight static pages, properly sized and compressed images, and copy that answers reader questions upfront. With one clear action goal per page, visitors can place a pickup pre-order or fill out a consultation form that routes straight to your team’s WhatsApp.',
    ],
    businessMixList: [
      'Cafes and catering businesses along the Lebak Bulus MRT Jakarta Station commuter route',
      'Consultants, professional service firms, and B2B providers in Cilandak and Lebak Bulus',
      'Online businesses serving deliveries across South Jakarta and South Tangerang',
      'Repair services and clinics around Lebak Bulus residential neighborhoods',
    ],
    scenarios: [
      {
        label: 'Example scenario',
        title: 'A cafe or catering business near the commuter route with pickup pre-orders',
        businessType: 'Cafe & Catering in Lebak Bulus',
        challenge:
          'Commuters passing near Lebak Bulus MRT Jakarta Station often want to order coffee or meal packages ahead of time so they can pick them up without waiting in line, but lack a convenient menu page.',
        solution:
          'A lightweight single-page website showing opening hours, the menu with prices, a map pin, and a WhatsApp pre-order button for orders ready for pickup at a chosen time.',
        expectedOutcome:
          'Customers order from their phones before arriving, and the kitchen or barista team receives organized order details.',
      },
      {
        label: 'Example scenario',
        title: 'A consultant or professional service firm with a clear workflow and consultation form',
        businessType: 'Professional Services in Lebak Bulus',
        challenge:
          'Prospective clients looking for a consultant generally want to understand the service scope and working steps first before committing time to an initial meeting.',
        solution:
          'A service website with a clear workflow explanation, service breakdown by need, and a short consultation form that delivers messages straight to WhatsApp or your team contact.',
        expectedOutcome:
          'Visitors understand the working process before reaching out, making initial discussions much more focused.',
      },
    ],
    collaborationHeading: 'How we work with clients in Lebak Bulus',
    collaborationParagraphs: [
      'CHESTAADOTCOM is based in BSD, South Tangerang and serves businesses in South Tangerang and Greater Jakarta, including Lebak Bulus Subdistrict in South Jakarta. Primary work—from the free audit and asset sharing to prototype reviews and release—runs online via WhatsApp and video call.',
      'Because Lebak Bulus is close to the South Tangerang border, in-person meetings are also possible by agreement when needed. Every project follows the four steps below.',
    ],
    processSteps: [
      {
        stepNumber: '1',
        title: 'Free audit (30 minutes)',
        sentence:
          'We review your business goals in Lebak Bulus, your existing pages, and competitors around you.',
      },
      {
        stepNumber: '2',
        title: 'Design and prototype',
        sentence:
          'You review the page structure and visual layout first before the website is built in full.',
      },
      {
        stepNumber: '3',
        title: 'Build and test',
        sentence:
          'The website is built statically for speed, then tested on mobile phones and PageSpeed Insights.',
      },
      {
        stepNumber: '4',
        title: 'Release and maintain',
        sentence:
          'The page goes live on a domain and hosting registered in your name, then is monitored after visitors start arriving.',
      },
    ],
    priceHeading: 'Pricing and scope for website development in Lebak Bulus',
    priceCopy:
      'Starting from IDR 1,200,000 for a landing page, depending on complexity. The cost increases if the number of pages, features (such as booking or payments), or integrations grows. We share the exact figure after the free 30-minute audit, before you pay anything. Simple landing pages usually take days.',
    priceNote: {
      startingPrice: 'Starting from IDR 1,200,000',
      timeline: 'Days for a simple landing page; exact estimate after the audit',
      note: 'Domain and hosting are registered under your own name.',
    },
    relatedProjectSlugs: ['landing-klinik-estetika', 'chestaa-v2'],
    relatedBlogSlug: 'kenapa-landing-page-lambat-bikin-iklan-boncos',
    faqs: [
      {
        question: 'Do you serve businesses in South Jakarta?',
        answer:
          'Yes, we serve businesses across South Tangerang and Greater Jakarta, including Lebak Bulus Subdistrict in Cilandak, South Jakarta. Because Lebak Bulus is near the South Tangerang border, in-person meetings are possible by agreement while primary work remains online.',
      },
      {
        question: 'Can the website development process be done entirely online?',
        answer:
          'Yes, it can be done entirely online. From the free 30-minute audit, sending photos and copy, and reviewing page prototypes to handing over domain and hosting access, everything can be completed via WhatsApp and video call.',
      },
      {
        question: 'What is the starting price to build a landing page for a business in Lebak Bulus?',
        answer:
          'A landing page starts from IDR 1,200,000, depending on page complexity. For multi-page company profiles or websites with custom features, we calculate the exact figure after the free audit before you pay anything.',
      },
    ],
    updatedAt: '2026-03-20',
    ogImageKey: 'ogAreaLebakBulus',
  },

  // 5B. AI AGENT — LEBAK BULUS
  {
    serviceSlug: 'ai-agent',
    serviceName: 'AI agent',
    areaSlug: 'lebak-bulus',
    areaName: 'Lebak Bulus',
    indexable: true,
    eyebrow: 'AI agent · Lebak Bulus',
    metaTitle: 'Business AI Agent Services in Lebak Bulus | CHESTAADOTCOM',
    metaDescription:
      'WhatsApp AI agents for businesses in Lebak Bulus, South Jakarta: log daily cafe/catering orders, clinic bookings, and automated reminders. Free audit.',
    h1: 'AI agent services for businesses in Lebak Bulus',
    quickSummary:
      'CHESTAADOTCOM builds WhatsApp AI agents for businesses in Lebak Bulus, Cilandak, South Jakarta—from cafes, catering providers, and online businesses to professional services, repair shops, and clinics. The agent understands incoming messages, records orders or creates calendar bookings, and hands special cases over to your staff. Priced after a free audit.',
    cekCepat: {
      cocokKalau:
        'Your cafe, catering business, clinic, or professional service in Lebak Bulus copies daily orders and booking schedules from WhatsApp chats into spreadsheets by hand.',
      mulaiDari:
        'A free 30-minute audit to map recurring chat flows and define the agent’s action rules.',
      harga:
        'Calculated after the free 30-minute audit based on the number of tools, rules, and message volume, before you pay anything.',
    },
    localContextHeading: 'Why businesses around Lebak Bulus benefit from a WhatsApp AI agent',
    localContextParagraphs: [
      'Lebak Bulus Subdistrict in Cilandak, South Jakarta sits on the southwestern edge of Jakarta near the South Tangerang border and sees steady daily activity around Lebak Bulus MRT Jakarta Station. Many cafes, catering providers, online shops, repair services, clinics, and professional service firms here serve fast-moving customers who rely on WhatsApp communication.',
      'During busy morning and evening hours, food order messages, service schedule questions, or clinic appointment requests often arrive back-to-back. If staff must answer common questions one by one and re-type daily order lists from WhatsApp into spreadsheets at night, valuable time goes into manual copy-pasting and recording mistakes easily happen.',
      'By deploying a WhatsApp AI agent for businesses in Lebak Bulus, incoming messages are read in context: the agent answers common questions, checks schedules or pricing rules, records daily orders into tables, and prepares a daily summary for the owner. Whenever an out-of-rule request or complaint arrives, the agent hands it over to human staff with a concise conversation summary.',
    ],
    businessMixList: [
      'Cafes and catering businesses receiving daily orders via WhatsApp',
      'Repair services and clinics around Lebak Bulus neighborhoods managing bookings and reminders',
      'Consultants and professional service offices scheduling initial meetings on calendars',
      'Online businesses logging orders and answering recurring questions every day',
    ],
    scenarios: [
      {
        label: 'Example scenario',
        title: 'A cafe or catering business logging daily orders and owner summaries',
        businessType: 'Cafe & Catering in Lebak Bulus',
        challenge:
          'Every day customers send meal or drink orders via WhatsApp chat, and staff have to copy customer names, items, pickup times, and special notes into a spreadsheet one by one.',
        solution:
          'An AI agent that answers menu and opening hour questions, records daily order details from WhatsApp conversations straight into the order table, and prepares a daily summary for the owner.',
        expectedOutcome:
          'Daily orders are logged cleanly without repetitive manual copying, and the owner can inspect the order summary and action logs anytime.',
      },
      {
        label: 'Example scenario',
        title: 'A repair service or clinic with appointment bookings and automated reminders',
        businessType: 'Repair Service & Clinic in Lebak Bulus',
        challenge:
          'Customers often ask about open slots for service or clinic visits outside operating hours, while admins also need to send appointment reminders so customers arrive on time.',
        solution:
          'An AI agent that answers common service questions, checks open calendar slots to create bookings, sends automated appointment reminders, and forwards out-of-rule cases to staff with a chat summary.',
        expectedOutcome:
          'Bookings are scheduled cleanly on the calendar without overlaps, and staff only need to handle special inquiries already summarized by the agent.',
      },
    ],
    collaborationHeading: 'How we work with clients in Lebak Bulus',
    collaborationParagraphs: [
      'CHESTAADOTCOM is based in BSD, South Tangerang and serves clients across South Tangerang and Greater Jakarta, including Lebak Bulus in South Jakarta. Primary work—from the free audit and designing action rules to testing with real conversations and monitoring logs—runs online via WhatsApp and video call.',
      'Because Lebak Bulus is near the South Tangerang border, in-person meetings are also possible by agreement. We apply the four steps below to every AI agent project.',
    ],
    processSteps: [
      {
        stepNumber: '1',
        title: 'Free audit (30 minutes)',
        sentence:
          'We map the recurring conversations and tasks in your Lebak Bulus business, then tell you honestly which ones should be given to an agent.',
      },
      {
        stepNumber: '2',
        title: 'Design and prototype',
        sentence:
          'You review sample conversation flows and the list of agent action rules before we build the full system.',
      },
      {
        stepNumber: '3',
        title: 'Build and test',
        sentence:
          'The agent is connected to WhatsApp Business and the tools you use, then tested with real conversations from your business.',
      },
      {
        stepNumber: '4',
        title: 'Release and maintain',
        sentence:
          'We monitor the action logs, fix off-target replies, and adjust the rules as your team uses the system.',
      },
    ],
    priceHeading: 'Pricing and scope for AI agents in Lebak Bulus',
    priceCopy:
      'AI agent pricing is calculated after the free 30-minute audit, because it depends on the number of connected tools, business rules, and message volume. You receive the exact figure before paying anything. Building systems and AI agents typically takes weeks, with the exact timeline provided after the audit.',
    priceNote: {
      startingPrice: 'Calculated after free audit',
      timeline: 'Weeks; exact estimate after the 30-minute audit',
      note: 'Your business data stays yours; includes action logs and human handover.',
    },
    relatedProjectSlugs: ['wa-concierge-klinik', 'pemroses-dokumen'],
    relatedBlogSlug: 'otomasi-whatsapp-ai-klinik-fnb-alur-kerja',
    faqs: [
      {
        question: 'Can the agent record daily orders from WhatsApp into a spreadsheet?',
        answer:
          'Yes. The agent reads order details from WhatsApp conversations according to the rules we define together, writes them directly into your spreadsheet or database table, and keeps a record in the action log.',
      },
      {
        question: 'What do I need to prepare before the audit?',
        answer:
          'Prepare the ten questions customers ask most frequently, your operating hours and pricing rules, the list of actions the agent is allowed to take, and who on your team handles out-of-rule cases. Those four items are enough for us to review together during the free 30-minute audit.',
      },
      {
        question: 'Is work for businesses in Lebak Bulus done online or in person?',
        answer:
          'Primary work is carried out online via WhatsApp and video call so it stays efficient. However, because Lebak Bulus is close to the South Tangerang border, in-person meetings are also possible by agreement.',
      },
    ],
    updatedAt: '2026-03-20',
    ogImageKey: 'ogAreaLebakBulus',
  },
];

const NON_INDEXABLE_SLUGS: NonIndexableAreaSlug[] = [
  'alam-sutera',
  'bintaro',
  'gading-serpong',
  'serpong',
  'ciputat',
];

export const PREPARED_NON_INDEXABLE_PAGES_EN: ServiceAreaPageData[] =
  NON_INDEXABLE_SLUGS.flatMap((areaSlug) => {
    const area = AREAS[areaSlug];
    return (['pembuatan-website', 'ai-agent'] as const).map((serviceSlug) => {
      const isWeb = serviceSlug === 'pembuatan-website';
      return {
        serviceSlug,
        serviceName: isWeb ? 'Website and landing page development' : 'AI agent',
        areaSlug,
        areaName: area.nameEn,
        indexable: false,
        eyebrow: `${isWeb ? 'Website development' : 'AI agent'} · ${area.nameEn}`,
        metaTitle: isWeb
          ? `Website Development in ${area.nameEn} | CHESTAADOTCOM`
          : `AI Agent Services for Business in ${area.nameEn} | CHESTAADOTCOM`,
        metaDescription: isWeb
          ? `Website and landing page development for businesses in ${area.nameEn} and South Tangerang. Fast on mobile, starting from IDR 1,200,000.`
          : `AI agents for businesses in ${area.nameEn} and South Tangerang: automated WhatsApp replies, booking, and follow-ups. Free audit.`,
        h1: isWeb
          ? `Website development for businesses in ${area.nameEn}`
          : `AI agent services for businesses in ${area.nameEn}`,
        quickSummary: isWeb
          ? `Website and landing page development from CHESTAADOTCOM for businesses in ${area.nameEn} and South Tangerang. Fast on mobile phones with one clear goal. Pricing starts from IDR 1,200,000, depending on complexity.`
          : `AI agents from CHESTAADOTCOM for businesses in ${area.nameEn} and South Tangerang: understanding customer messages, using calendars or databases, and handing special cases over to humans. Priced after a free audit.`,
        cekCepat: {
          cocokKalau: isWeb
            ? `Your business in ${area.nameEn} needs a fast page for ads or local search.`
            : `Your team in ${area.nameEn} answers the same WhatsApp questions every day.`,
          mulaiDari: 'A free 30-minute audit before you pay anything.',
          harga: isWeb ? 'Starting from IDR 1,200,000 depending on complexity.' : 'Calculated after a free audit.',
        },
        localContextHeading: `Services for businesses in ${area.nameEn}`,
        localContextParagraphs: [area.factsSummaryEn],
        businessMixList: area.typicalBusinessesEn,
        scenarios: [
          {
            label: 'Example scenario',
            title: isWeb ? 'Service page and WhatsApp booking' : 'WhatsApp booking and Q&A',
            businessType: `Business in ${area.nameEn}`,
            challenge: 'Prospective customers need clear service details on mobile phones.',
            solution: isWeb
              ? 'A fast static page with a WhatsApp button.'
              : 'An AI agent connected to WhatsApp Business and a calendar.',
            expectedOutcome: 'Customers are assisted quickly and clearly.',
          },
          {
            label: 'Example scenario',
            title: isWeb ? 'Service profile and consultation form' : 'Data logging and staff handover',
            businessType: `Services in ${area.nameEn}`,
            challenge: 'Repetitive questions take up staff time every day.',
            solution: isWeb
              ? 'A service page with a clear workflow and contact form.'
              : 'The agent logs initial details and forwards special cases to staff.',
            expectedOutcome: 'Your team receives organized inquiries.',
          },
        ],
        collaborationHeading: `How we work with clients in ${area.nameEn}`,
        collaborationParagraphs: [
          'CHESTAADOTCOM is based in BSD, South Tangerang and works with clients online via WhatsApp and video call or in person in the South Tangerang area by agreement.',
        ],
        processSteps: [
          {
            stepNumber: '1',
            title: 'Free audit (30 minutes)',
            sentence: 'We review your business goals and current workflow.',
          },
          {
            stepNumber: '2',
            title: 'Design and prototype',
            sentence: 'You review the design before we build it in full.',
          },
          {
            stepNumber: '3',
            title: 'Build and test',
            sentence: 'The system is built and tested before release.',
          },
          {
            stepNumber: '4',
            title: 'Release and maintain',
            sentence: 'Monitored and refined after launch.',
          },
        ],
        priceHeading: 'Pricing and scope',
        priceCopy: isWeb
          ? 'Starting from IDR 1,200,000 for a landing page, depending on complexity. Exact figure shared after the free audit.'
          : 'Calculated after the free 30-minute audit, before you pay anything.',
        priceNote: {
          startingPrice: isWeb ? 'Starting from IDR 1,200,000' : 'Calculated after free audit',
          timeline: isWeb ? 'Days' : 'Weeks',
          note: 'Exact estimate after the free audit.',
        },
        relatedProjectSlugs: isWeb
          ? ['landing-klinik-estetika', 'chestaa-v2']
          : ['wa-concierge-klinik', 'pemroses-dokumen'],
        relatedBlogSlug: isWeb
          ? 'berapa-biaya-bikin-website-bisnis-panduan-harga'
          : 'otomasi-whatsapp-ai-klinik-fnb-alur-kerja',
        faqs: [
          {
            question: 'How do we get started?',
            answer: 'Start with a free 30-minute audit via WhatsApp or video call.',
          },
          {
            question: 'How much does it cost?',
            answer: isWeb
              ? 'Landing pages start from IDR 1,200,000 depending on complexity.'
              : 'Calculated after the free audit based on tools and rules.',
          },
          {
            question: 'What about data ownership?',
            answer: 'Your data stays yours, and domains and hosting are registered in your name.',
          },
        ],
        updatedAt: '2026-03-20',
        ogImageKey: 'ogDefault',
      };
    });
  });

export const ALL_SERVICE_AREA_PAGES_EN: ServiceAreaPageData[] = [
  ...SERVICE_AREA_PAGES_EN,
  ...PREPARED_NON_INDEXABLE_PAGES_EN,
];
