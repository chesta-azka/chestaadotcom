import { SITE_IMAGES } from '../config/images';
import type { RawBlogPostInput } from './blog-posts';

export const BLOG_POSTS_19_20_EN_RAW: RawBlogPostInput[] = [
  // ==========================================================================
  // ARTICLE 19 (EN): AI for Boarding Houses and Rental Properties
  // Author: Zeeshan
  // ==========================================================================
  {
    slug: 'ai-for-boarding-houses-and-rental-properties',
    alternateSlug: 'ai-untuk-kos-kosan-dan-properti-sewa',
    locale: 'en',
    title:
      'AI for Boarding Houses and Rental Properties: From Vacancy Inquiries to Payment Reminders',
    seoTitle:
      'AI Agent for Boarding Houses & Rental Properties | CHESTAADOTCOM',
    excerpt:
      'A practical guide to using AI agents and simple automation for boarding house and rental property operations: answering room vacancy questions, scheduling viewings, and sending polite rent reminders.',
    metaDescription:
      'Manage boarding houses and rental properties cleanly with a WhatsApp AI agent: single room inventory table, viewing schedules, polite rent reminders, and privacy.',
    category: 'AI & Workflow Automation',
    categorySlug: 'otomasi-ai',
    tags: [
      'AI for Boarding Houses',
      'Rental Properties',
      'WhatsApp Automation',
      'Property Management',
      'Pamulang',
    ],
    author: 'zeeshan',
    date: '2026-11-02',
    updatedAt: '2026-11-02',
    featured: false,
    draft: false,
    coverImageKey: 'blogAiBoardingHouse',
    cover: SITE_IMAGES.blogAiBoardingHouse.src,
    coverAlt:
      SITE_IMAGES.blogAiBoardingHouse.altEn || SITE_IMAGES.blogAiBoardingHouse.alt,
    beforeIntroSnapshot:
      'Boarding house owners often spend every evening answering the exact same room vacancy messages while feeling awkward chasing monthly rent one by one. Connecting a single clean room inventory table to a WhatsApp assistant saves daily hours without losing personal warmth.',
    founderNote: {
      author: 'zeeshan',
      title: 'Operations Note · An Unanswered Empty Room Inquiry Is Lost Revenue',
      text: 'Prospective tenants typically message four boarding houses at the same time when hunting for a room. Owners who only reply the next afternoon often find the prospect has already paid a booking deposit elsewhere.',
    },
    content: [
      {
        type: 'ul',
        title: 'Key takeaways',
        items: [
          'The foundation of rental property automation is not a flashy bot, but a single centralized room inventory table that tracks vacancy status, monthly rent, and facilities accurately.',
          'An AI agent helps screen prospective tenants by answering availability questions, sending authentic room photos, booking site viewing slots, and dispatching polite monthly rent reminders.',
          'Facility repair complaints, annual rent negotiations, and storage of tenant ID documents must follow strict human escalation boundaries and personal data protection rules.',
        ],
      },
      {
        type: 'paragraph',
        text: 'At nine-thirty in the evening, a boarding house manager phone chimes repeatedly. Four prospective tenants are asking the exact same questions: "Hi, do you have any empty rooms for next month? Is the bathroom inside? Does the rent include electricity or use prepaid tokens?" Meanwhile, two current tenants still have not transferred their monthly rent five days past the due date.',
      },
      {
        type: 'paragraph',
        text: 'Managing a boarding house or rental building with a dozen or more doors frequently eats into the owner evening rest due to repetitive communication. By organizing your room data source and assigning an automated assistant to handle baseline questions, you can keep occupancy high without staring at your phone screen all night.',
      },
      {
        type: 'h2',
        id: 'situation-the-same-questions-every-single-day',
        text: 'Situation: the same questions every single day',
      },
      {
        type: 'paragraph',
        text: 'Boarding house and rental managers face two recurring communication workloads every month: answering dozens of room specification inquiries from prospective tenants and reminding active residents of upcoming rent due dates.',
      },
      {
        type: 'paragraph',
        text: 'Whenever a room opens up, you might post an update on social media or local map listings. Over the next two days, dozens of messages arrive asking about monthly rates, bed sizes, curfew rules, and motorcycle parking. Yet out of twenty people who ask, often only three actually show up for an in-person viewing.',
      },
      {
        type: 'paragraph',
        text: 'If you type out replies manually one by one between your main daytime responsibilities, your response time slows down. Conversely, if you use a long static quick-reply template, prospects skip reading it because it does not directly answer the specific room type they are asking about.',
      },
      {
        type: 'h2',
        id: 'the-room-list-as-a-single-source-of-truth',
        text: 'The room list as a single source of truth',
      },
      {
        type: 'paragraph',
        text: 'Before installing an AI agent, consolidate all room records into a single digital master table containing the room number, unit type, monthly rate, facilities, availability status, and current tenant due date.',
      },
      {
        type: 'paragraph',
        text: 'Do not leave room vacancy status stored only inside the caretaker memory or a paper notebook at the front desk. Create one structured spreadsheet (for example in Google Sheets or a simple database table) that serves as the single reference for the automated assistant when answering prospect inquiries.',
      },
      {
        type: 'table',
        caption:
          'Table of mandatory columns in a master boarding house room list for AI agent reference',
        headers: [
          'Data Column Name',
          'Sample Row Value',
          'Purpose for AI Agent & Manager',
        ],
        rows: [
          [
            'Room Number & Type',
            'Room A-04 (Deluxe Type Floor 1)',
            'Ensures the agent states the exact floor level and unit type.',
          ],
          [
            'Availability Status',
            'Vacant / Occupied / Available Nov 1',
            'Determines whether the unit can be offered for viewing to new inquiries.',
          ],
          [
            'Monthly Rate & Electricity Setup',
            'IDR 1,650,000/month (Prepaid Electricity Token)',
            'Answers monthly rent questions and clarifies excluded utility items.',
          ],
          [
            'Core Facilities & Dimensions',
            '3x4m, AC, En-suite Bath, Wi-Fi, Springbed',
            'Answers detailed facility questions without inventing specifications.',
          ],
          [
            'Building House Rules',
            'Male / Female Only, Motorbike Parking, Guests until 22:00',
            'Screens prospect compatibility before scheduling an on-site viewing.',
          ],
        ],
      },
      {
        type: 'h2',
        id: 'prospective-tenant-workflow',
        text: 'Prospective tenant workflow',
      },
      {
        type: 'paragraph',
        text: 'The prospective tenant screening workflow runs from greeting the inquirer, checking room availability in the master table against their target move-in date, explaining facilities and house rules, to offering an on-site viewing slot.',
      },
      {
        type: 'paragraph',
        text: 'This automated lead qualification and logging workflow shares core principles with our internal project in the [Property Lead Flow case study](/en/case-studies/lead-properti). In our internal project, every incoming inquiry has its preferences logged cleanly into a table so no prospective tenant or buyer slips through the cracks.',
      },
      {
        type: 'ol',
        title: 'Four steps in a prospective tenant conversation with the automated assistant:',
        items: [
          'Identify baseline requirements: the agent asks for the planned move-in date and whether the prospect brings a motorcycle or car.',
          'Match availability table: the system reads the master room table and only presents room types currently marked vacant or soon to be vacant.',
          'Send honest details: the agent shares the monthly rate, security deposit terms, electricity rules, and authentic room photo links without exaggerated claims.',
          'Invite for on-site viewing: once the prospect confirms the rate and house rules fit, the agent offers open time slots to inspect the room in person.',
        ],
      },
      {
        type: 'h2',
        id: 'viewings-and-scheduling',
        text: 'Viewings and scheduling',
      },
      {
        type: 'paragraph',
        text: 'For on-site viewings, the agent matches the prospect arrival time with the building caretaker working hours, records the visitor name and phone number, and sends an instant notification to the on-site staff.',
      },
      {
        type: 'paragraph',
        text: 'Many boarding house owners do not live on the property and instead rely on an on-site caretaker during specific hours. If a prospect shows up unannounced while the caretaker is out running errands, the prospect leaves disappointed because the gate is locked.',
      },
      {
        type: 'paragraph',
        text: 'With automated scheduling, the agent only offers viewing hours that are genuinely permitted (for example between 09:00 and 17:00). The moment a prospect selects Saturday at 11:00, the system sends a concise note to the caretaker WhatsApp: "Tomorrow Saturday at 11:00 viewing for Room A-04 with Budi."',
      },
      {
        type: 'h2',
        id: 'polite-payment-reminders',
        text: 'Polite payment reminders',
      },
      {
        type: 'paragraph',
        text: 'For active residents, the automated system dispatches polite monthly rent reminder messages a few days before their individual due date, complete with the exact bill amount and the owner official bank account details.',
      },
      {
        type: 'paragraph',
        text: 'Asking for rent personally often feels awkward, especially with long-term residents. When the reminder is sent by an automated administrative system on a consistent date every month, tenants view it as a standard calendar notification rather than a personal reprimand.',
      },
      {
        type: 'ul',
        title: 'Three rules to keep boarding house rent reminders friendly and effective:',
        items: [
          'Send the first reminder three days before each tenant individual due date using a warm, polite greeting.',
          'State clear details including the rental month period, base rent amount, any applicable parking or laundry add-ons, and the official destination bank account.',
          'Ask the tenant to reply with a photo of the transfer receipt so the owner or admin can verify the bank mutation and mark the month paid.',
        ],
      },
      {
        type: 'h2',
        id: 'complaints-and-maintenance-hand-off-to-the-owner',
        text: 'Complaints and maintenance: hand off to the owner',
      },
      {
        type: 'paragraph',
        text: 'When a resident messages about a broken facility such as a warm air conditioner, a leaking faucet, or a Wi-Fi outage, the agent must log the room number and issue type and immediately escalate the chat to the owner or caretaker.',
      },
      {
        type: 'paragraph',
        text: 'A resident sweating in a hot room at night because their AC stopped working does not want a lengthy robotic conversation. In building maintenance situations, the assistant job is simply to capture the room number and complaint within one minute and ring a priority alert for the manager.',
      },
      {
        type: 'h2',
        id: 'boundaries-the-agent-must-keep',
        text: 'Boundaries the agent must keep',
      },
      {
        type: 'paragraph',
        text: 'A rental property AI agent must be locked with strict boundaries so it never approves rent discounts on its own, never grants late-payment extensions, and never promises facility upgrades outside the owner agreement.',
      },
      {
        type: 'paragraph',
        text: 'If a prospective tenant asks, "If I pay six months upfront right now, can I get an IDR 200,000 monthly discount?", the agent must not make a deal. It records the offer and forwards it to the property owner to decide directly.',
      },
      {
        type: 'h2',
        id: 'tenant-data-and-privacy',
        text: 'Tenant data and privacy',
      },
      {
        type: 'paragraph',
        text: 'Handling resident identity records such as national ID card (KTP) photos, family emergency phone numbers, and payment histories requires restricted storage folders and compliance with personal data protection rules.',
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'Privacy Warning: Protect Tenant ID Card Photos and Keep Them Off Public Channels',
        text: 'Boarding house managers must collect resident ID records for neighborhood administration, but KTP photos and resident phone numbers must never be stored in public folders or indexed into a public AI knowledge base. Follow data safeguarding principles under Indonesian Law No. 27 of 2022 on Personal Data Protection; check the official documentation for current figures and terms.',
      },
      {
        type: 'paragraph',
        text: 'Ensure only the owner and authorized manager have access permissions to open the tenant identity folder. You can read practical guidance on safeguarding customer chat records in our article on [Indonesian PDP Law compliance for business WhatsApp and AI](/en/blog/pdp-law-compliance-for-business-whatsapp-and-ai).',
      },
      {
        type: 'h2',
        id: 'scenario-in-pamulang',
        text: 'Scenario in Pamulang',
      },
      {
        type: 'paragraph',
        text: 'Let us look at how this workflow operates in an example scenario of a student and worker boarding house near university campuses and main roads in Pamulang.',
      },
      {
        type: 'paragraph',
        text: '**Example scenario (25-door boarding house manager in Pamulang):** Imagine you own a two-story boarding house in the [Pamulang service area](/en/areas) occupied by university students and young employees. Ahead of every new semester, you receive dozens of WhatsApp inquiries asking about vacant rooms and distance to the main road.',
      },
      {
        type: 'paragraph',
        text: 'In that example scenario, you organize a single Google Sheets table tracking all 25 rooms and connect it through our [AI agents for business service](/en/services/ai-agents). When a prospect messages at ten at night, the agent replies immediately that two rooms remain on the second floor along with rates and tomorrow afternoon viewing slots. Meanwhile, for the 23 occupied rooms, the system dispatches polite monthly rent reminders on the first of the month.',
      },
      {
        type: 'h2',
        id: 'steps-to-start-small',
        text: 'Steps to start small',
      },
      {
        type: 'paragraph',
        text: 'You can start tidying up your boarding house operations this weekend without a big budget by creating one disciplined room inventory table, preparing a standard fact sheet, and automating vacancy replies and rent reminders in stages.',
      },
      {
        type: 'ul',
        title: 'Four practical steps to start boarding house automation on a small scale:',
        items: [
          'Move all room records from paper notebooks into one spreadsheet table listing room number, rate, vacant/occupied status, and due date.',
          'Gather bright, authentic photos for each room type (showing the bed, bathroom, and parking area) alongside written house rules.',
          'Set up an automated responder to answer room availability inquiries and book viewing slots with your on-site caretaker.',
          'Activate scheduled monthly payment reminders sent only to residents whose current month status column is not yet marked paid.',
        ],
      },
      {
        type: 'h2',
        id: 'official-reference-sources',
        text: 'Sources',
      },
      {
        type: 'paragraph',
        text: 'The following official references cover personal data protection regulations in Indonesia and technical documentation for business messaging; check the official documentation for current figures and terms.',
      },
      {
        type: 'ul',
        items: [
          '[Official Text of Indonesian Law No. 27 of 2022 on Personal Data Protection at JDIH BPK](https://peraturan.bpk.go.id/Details/229798/uu-no-27-tahun-2022) explains obligations for storage, purpose limitation, and deletion of personal records such as tenant identification; check the official documentation for current figures and terms.',
          '[WhatsApp Cloud API Documentation on Meta for Developers](https://developers.facebook.com/docs/whatsapp/cloud-api) details rules for automated replies and official template-based reminder messages; check the official documentation for current figures and terms.',
          '[Google Sheets API Documentation on Google for Developers](https://developers.google.com/sheets/api) provides technical guidance on connecting spreadsheet tables as an application data source; check the official documentation for current figures and terms.',
        ],
      },
    ],
    conclusion: [
      'Using an AI agent for boarding house and rental property operations is not about replacing owner hospitality with a machine; it is about freeing your evenings from typing the exact same answers over and over. With one clean room inventory table as your single source of truth, prospective tenants get fast answers and monthly rent collection runs smoothly.',
      'Start by organizing your room inventory table today, enforce strict boundaries so facility complaints and price negotiations still come to you, and protect resident identity records with discipline.',
    ],
    serviceLink: {
      slug: 'ai-agent',
      title: 'Set Up an Automated WhatsApp Assistant for Your Boarding House & Rentals',
      description:
        'We help boarding house and rental property owners connect room availability tables, viewing schedules, and monthly rent reminders to WhatsApp. Start with a free 30-minute audit.',
      href: '/jasa/ai-agent',
      label: 'View AI Agent Service',
    },
    faq: [
      {
        question:
          'Do I need advanced computer skills to update vacant room status so the AI agent knows about it?',
        answer:
          'Not at all. You simply change one status column from "Vacant" to "Occupied" inside the Google Sheets table on your phone or laptop, and that exact second the AI agent stops offering that room to new callers.',
      },
      {
        question:
          'What happens if a prospective tenant wants to negotiate an annual lease rate or ask for extra furniture?',
        answer:
          'The agent is restricted to quoting official rates listed in your table. Whenever someone asks for a price discount or extra furniture, the agent logs the request and escalates the conversation directly to the owner WhatsApp.',
      },
      {
        question:
          'Can the AI agent send boarding house room photos and the Google Maps pin automatically?',
        answer:
          'Yes. When a prospective tenant asks about a specific vacant room type, the agent can immediately send authentic photos of that unit, its facility list, and a Google Maps location link to guide them when visiting.',
      },
      {
        question:
          'What if each tenant has a different monthly rent due date based on when they moved in?',
        answer:
          'The reminder engine reads the individual due date column for each room row inside the table. A tenant due on the 5th receives a reminder on the 2nd, while a tenant due on the 20th receives a reminder on the 17th.',
      },
      {
        question:
          'Will the reminder messages stop automatically once a tenant transfers their rent?',
        answer:
          'Yes. As soon as you verify the bank transfer and change that room current month status to "Paid" in the table, any remaining reminder messages for that room are canceled immediately.',
      },
      {
        question:
          'Is this setup suitable for a boarding house owner who only manages 10 to 15 doors?',
        answer:
          'It is a great fit, especially when the owner works a daytime office job or runs another business and cannot reply immediately to prospect messages during working hours or late at night.',
      },
    ],
    relatedSlugs: [
      'pdp-law-compliance-for-business-whatsapp-and-ai',
      'invoice-and-billing-automation-for-professional-services',
      'human-handoff-ai-agent-when-to-escalate-to-humans',
    ],
  },

  // ==========================================================================
  // ARTICLE 20 (EN): Dashboards for Cafe Owners
  // Author: Zeeshan
  // ==========================================================================
  {
    slug: 'dashboards-for-cafe-owners-operational-metrics',
    alternateSlug: 'dashboard-untuk-pemilik-kafe-metrik-operasional',
    locale: 'en',
    title:
      'Dashboards for Cafe Owners: Metrics Worth Tracking and Ones That Only Cause Headaches',
    seoTitle:
      'Cafe Owner Operations Dashboard: Essential Metrics | CHESTAADOTCOM',
    excerpt:
      'A practical guide to choosing operational dashboard metrics for cafe and F&B owners: hourly sales, ingredient stock variance, menu contribution, and gross margin formulas.',
    metaDescription:
      'Skip cluttered charts that trigger zero action. Learn which cafe dashboard metrics owners actually need: peak hours, stock variance, and gross margin.',
    category: 'Web Strategy & Software Investment',
    categorySlug: 'investasi-web',
    tags: [
      'Cafe Dashboard',
      'F&B Operations',
      'Cafe Inventory Management',
      'Custom Software',
      'Lebak Bulus',
    ],
    author: 'zeeshan',
    date: '2026-11-03',
    updatedAt: '2026-11-03',
    featured: true,
    draft: false,
    coverImageKey: 'blogCafeDashboard',
    cover: SITE_IMAGES.blogCafeDashboard.src,
    coverAlt:
      SITE_IMAGES.blogCafeDashboard.altEn || SITE_IMAGES.blogCafeDashboard.alt,
    beforeIntroSnapshot:
      'A screen packed with twenty colorful charts is useless if at the end of the month you still cannot tell why net cash is tight despite a full seating area. A good operations dashboard displays only numbers that directly trigger ingredient purchasing, barista scheduling, and menu adjustments.',
    founderNote: {
      author: 'zeeshan',
      title: 'Operations Note · Gross Revenue Is Vanity Without Ingredient Control',
      text: 'The biggest cash leak in coffee shops and eateries rarely comes from a lack of customers; it comes from fresh milk, coffee bean, and kitchen ingredient variance that is never reconciled against cups sold each week.',
    },
    content: [
      {
        type: 'ul',
        title: 'Key takeaways',
        items: [
          'Every metric placed on a cafe owner dashboard must be tied to a concrete operational decision; if a chart goes up or down and you do nothing in response, remove it.',
          'The four most critical metric groups for daily cafe operations are hourly and branch sales patterns, key ingredient stock variance, menu contribution quadrants, and cost of goods sold (COGS) percentage.',
          'A disciplined fifteen-minute review every Monday morning using a single clean screen has far more impact on cash health than opening hundreds of raw spreadsheet rows.',
        ],
      },
      {
        type: 'paragraph',
        text: 'At eleven at night after closing, a cafe owner opens an export from the point-of-sale app alongside three spreadsheets sent by the head barista. On screen, gross monthly sales look higher than last month, yet the bank balance available for next week ingredient restocking feels uncomfortably tight.',
      },
      {
        type: 'paragraph',
        text: 'This frustrating situation happens because top-line gross sales hide critical operational details: which menu items actually carry razor-thin margins, which hours have too many idle staff on shift, and how many liters of milk were wasted. This article helps you filter which metrics genuinely belong on a single owner dashboard screen.',
      },
      {
        type: 'h2',
        id: 'situation-lots-of-numbers-zero-decisions',
        text: 'Situation: lots of numbers, zero decisions',
      },
      {
        type: 'paragraph',
        text: 'Many food and beverage owners drown in daily reports because point-of-sale apps export dozens of data columns at once without highlighting which specific operational problem requires corrective action this week.',
      },
      {
        type: 'paragraph',
        text: 'When you operate two or three cafe branches, every night your internal WhatsApp group fills up with photos of register closing slips and warehouse stock notes. Because sales receipts and ingredient usage sit in separate files, you only have time to glance at the bottom-line rupiah total before going to sleep.',
      },
      {
        type: 'paragraph',
        text: 'As a result, supplier price increases or repeated bar over-pouring only surface three months later when calculating profit and loss. A dashboard built for a business owner should work like a car instrument cluster: lighting up warning indicators only where intervention is needed.',
      },
      {
        type: 'h2',
        id: 'the-principle-one-metric-one-decision',
        text: 'The principle: one metric, one decision',
      },
      {
        type: 'paragraph',
        text: 'The golden rule in designing a cafe operations dashboard is one metric for one decision: before placing any number on the main screen, define the exact action you will take when that number crosses a threshold.',
      },
      {
        type: 'paragraph',
        text: 'For instance, if you display an hourly sales comparison between Tuesdays and Saturdays, the decision tied to that chart is barista and kitchen shift scheduling. If nine to eleven in the morning at branch two is consistently quiet, you can stagger the second barista arrival time to eleven.',
      },
      {
        type: 'table',
        caption:
          'Table mapping the four core cafe dashboard metrics to concrete owner decisions',
        headers: [
          'Dashboard Operational Metric',
          'How to Read the Pattern',
          'Concrete Cafe Owner Decision',
        ],
        rows: [
          [
            'Sales by Hour & by Branch',
            'Maps peak transaction hours and quiet hours across each location.',
            'Adjust staff count per shift and time off-peak bundle promotions.',
          ],
          [
            'Key Ingredient Stock Variance',
            'Compares physical stock count against recipe usage from cups sold.',
            'Investigate bar over-pouring, spoiled milk, or inventory shrinkage.',
          ],
          [
            'Menu Volume vs Gross Margin Matrix',
            'Groups items by portions sold and gross profit per portion.',
            'Highlight high-margin items on the menu board and prune slow items.',
          ],
          [
            'Cost of Goods Sold Ratio (COGS %)',
            'Tracks total consumed ingredient cost as a share of net sales.',
            'Adjust selling prices, recalibrate recipe portions, or renegotiate suppliers.',
          ],
        ],
      },
      {
        type: 'h2',
        id: 'sales-by-branch-and-by-hour',
        text: 'Sales by branch and by hour',
      },
      {
        type: 'paragraph',
        text: 'Breaking down sales figures by branch and hourly time blocks reveals real customer arrival rhythms so staff rostering and fresh prep stop relying on guesswork.',
      },
      {
        type: 'paragraph',
        text: 'Full-day revenue totals can be deceptive. Two cafe branches might log identical daily sales, yet a branch near a commuter station may earn most of its revenue between seven and nine in the morning, while a neighborhood branch only gets busy after four in the afternoon.',
      },
      {
        type: 'paragraph',
        text: 'By viewing an hourly sales heatmap over the past four weeks, you know exactly when espresso machines must be dialed in, when pastry prep must finish, and how many baristas need to be behind the counter during peak hours.',
      },
      {
        type: 'h2',
        id: 'ingredient-stock-and-variance',
        text: 'Ingredient stock and variance',
      },
      {
        type: 'paragraph',
        text: 'The stock variance metric compares the theoretical amount of raw ingredients that should have been used based on sold recipes against the actual physical reduction counted in storage at closing.',
      },
      {
        type: 'paragraph',
        text: 'You do not need to count every paper napkin or stirrer on day one. Start with the five to eight highest-value, fastest-moving raw ingredients in your shop, such as espresso beans, fresh liquid milk, signature syrups, matcha powder, cheese, and proteins.',
      },
      {
        type: 'paragraph',
        text: 'Suppose register records show one hundred iced lattes sold this week, each using 150 milliliters of milk—meaning theoretical milk usage is 15 liters. If your physical fridge count shows milk dropped by 20 liters, the dashboard flags that 5-liter variance immediately so you can check for spilled pitchers, uncalibrated jiggers, or spoiled cartons from a warm fridge.',
      },
      {
        type: 'h2',
        id: 'menu-what-sells-and-what-just-sits-there',
        text: 'Menu: what sells and what just sits there',
      },
      {
        type: 'paragraph',
        text: 'Menu performance evaluation groups your food and drinks into four quadrants based on sales volume and gross profit per portion so you see which items drive cash flow and which ones merely clutter the fridge.',
      },
      {
        type: 'ul',
        title: 'Four menu categories to separate on your dashboard screen:',
        items: [
          'Stars (high volume and high gross margin): signature items whose ingredients must never run out and that deserve prime visual placement.',
          'Traffic drivers (high volume but thinner margin): typically baseline iced milk coffees; your job is keeping their recipe portioning disciplined.',
          'Hidden gems (high gross margin but low order volume): profitable items that need better cashier upselling or clearer menu photos.',
          'Dead weight (low volume and thin margin): items that tie up perishable storage space and should be considered for removal.',
        ],
      },
      {
        type: 'h2',
        id: 'ingredient-cost-and-gross-margin-how-to-calculate',
        text: 'Ingredient cost and gross margin (how to calculate)',
      },
      {
        type: 'paragraph',
        text: 'To calculate consumed ingredient cost and gross margin accurately for a period, add opening inventory value to new purchases minus closing inventory value, then compare that figure against net sales revenue.',
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'Common Accounting Mistake: Never Confuse Weekly Cash Purchases with Consumed Ingredients',
        text: 'The most frequent mistake when calculating weekly margin is subtracting this week wholesale supplier receipts directly from this week sales. If on Friday you bought a full month supply of coffee beans and syrup, that week will look like a massive loss even though the unopened cartons are sitting safely in your storeroom.',
      },
      {
        type: 'code',
        language: 'text',
        filename: 'cafe-cogs-and-gross-margin-formula.txt',
        code: `1. Cost of Goods Sold (Period COGS) =
   Opening Inventory Value + Total Ingredient Purchases - Closing Physical Inventory Value

2. Gross Profit (in Currency) =
   Net Sales (After Discounts, Excluding Collected Tax) - Cost of Goods Sold (COGS)

3. Ingredient Cost Percentage (COGS %) =
   (Cost of Goods Sold / Net Sales) x 100%

4. Gross Margin Percentage (Gross Margin %) =
   (Gross Profit / Net Sales) x 100%`,
        caption:
          'Foundational accounting formulas for consumed ingredient cost (COGS) and gross margin in cafe and F&B operations.',
      },
      {
        type: 'h2',
        id: 'metrics-that-look-tempting-but-mislead',
        text: 'Metrics that look tempting but mislead',
      },
      {
        type: 'paragraph',
        text: 'Three metrics that look impressive on screen but mislead business decisions are cumulative all-time gross revenue since opening day, receipt counts during deep-discount promos without margin tracking, and monthly averages that hide slow weekdays.',
      },
      {
        type: 'paragraph',
        text: 'First, a cumulative lifetime revenue chart will always slope upward to the right every single day even if this week sales dropped by half compared to last week. Charts like that offer false comfort and do nothing to spot branch decline.',
      },
      {
        type: 'paragraph',
        text: 'Second, celebrating a spike in cups sold during a 50-percent-off promotion without pairing it against net gross margin is dangerous. You might see a long line at the register while every cup handed over quietly drains working capital.',
      },
      {
        type: 'h2',
        id: 'the-15-minute-weekly-routine',
        text: 'The 15-minute weekly routine',
      },
      {
        type: 'paragraph',
        text: 'A dashboard only produces real operational results when paired with a consistent habit: spend fifteen minutes every Monday morning with your operations lead reviewing the four core numbers and locking in at most two corrective actions.',
      },
      {
        type: 'ol',
        title: 'The 15-minute Monday morning dashboard review agenda:',
        items: [
          'Minutes 1 to 4 (Review Sales & Peak Hours): compare last week net sales against the prior week per branch and check whether any shift was understaffed or overstaffed.',
          'Minutes 5 to 9 (Review Variance on Top 5 Ingredients): inspect Sunday night stock count results and flag any raw material whose variance exceeded tolerance.',
          'Minutes 10 to 12 (Review Menu Performance & Low Stock Alerts): check items approaching their reorder threshold so no signature drink runs out over the weekend.',
          'Minutes 13 to 15 (Lock In This Week Actions): assign one or two specific instructions to the head barista, such as recalibrating grinder dosing or placing supplier orders.',
        ],
      },
      {
        type: 'h2',
        id: 'from-spreadsheet-to-dashboard-when-it-is-worth-it',
        text: 'From spreadsheet to dashboard: when it is worth it',
      },
      {
        type: 'paragraph',
        text: 'If you manage a single small shop and stand behind the bar yourself every day, a tidy spreadsheet is sufficient; once you open a second branch or delegate inventory purchasing to staff, a centralized dashboard with role-based permissions becomes well worth it.',
      },
      {
        type: 'paragraph',
        text: 'You can study a concrete example of moving from manual sheets to a centralized web app in our internal project, the [Cafe Operations Dashboard case study](/en/case-studies/dashboard-kafe). In our internal project, views and permissions are separated between stock clerks logging daily counts and business owners reviewing branch summaries.',
      },
      {
        type: 'paragraph',
        text: '**Example scenario (coffee shop owner with two locations around Lebak Bulus and South Tangerang):** Imagine you run your main coffee shop in the [Lebak Bulus service area](/en/areas) and recently opened a second kiosk in South Tangerang. Previously, staff sent Excel files every night whose formulas frequently broke when edited on mobile phones.',
      },
      {
        type: 'paragraph',
        text: 'In that example scenario, by building an internal web application through our [custom software development service](/en/services/custom-software), branch staff simply fill out a clean mobile closing stock form on their phones at night. The system automatically computes ingredient variance and presents it on the owner dashboard the next morning. To plan long-term upkeep for a system like this, you can also read our guide on [website and system maintenance costs after launch](/en/blog/website-and-system-maintenance-costs-after-launch).',
      },
      {
        type: 'h2',
        id: 'official-reference-sources',
        text: 'Sources',
      },
      {
        type: 'paragraph',
        text: 'The following official references cover role-based web application access control standards and data governance in business information systems; check the official documentation for current figures and terms.',
      },
      {
        type: 'ul',
        items: [
          '[OWASP Access Control Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html) explains Role-Based Access Control principles so branch staff only access menus matching their operational authority; check the official documentation for current figures and terms.',
          '[Google Workspace Learning Center Spreadsheet Guide](https://support.google.com/a/users/answer/9282959) covers baseline table collaboration and edit permission controls before transitioning to a dedicated database app; check the official documentation for current figures and terms.',
          '[Official Text of Indonesian Law No. 27 of 2022 on Personal Data Protection at JDIH BPK](https://peraturan.bpk.go.id/Details/229798/uu-no-27-tahun-2022) governs data security obligations whenever a cafe operational system also stores member or customer records; check the official documentation for current figures and terms.',
        ],
      },
    ],
    conclusion: [
      'A useful operations dashboard for a cafe owner is not the screen showing the most charts; it is the screen that most honestly shows where cash enters and where raw ingredients leak. By focusing on hourly sales, key ingredient variance, menu contribution, and properly calculated gross margin, every number on screen guides you to a measurable decision.',
      'Start by standardizing recipe gram weights and weekly stock counts in your shop, run a disciplined fifteen-minute review every Monday morning, and build a centralized dashboard when your branch count or team size demands cleaner control.',
    ],
    serviceLink: {
      slug: 'software-custom',
      title: 'Build an Operations & Inventory Dashboard Matched to Your Cafe SOP',
      description:
        'We design internal web apps, branch inventory logs, and reporting dashboards that run fast on mobile phones and are easy for your staff to use. Start with a free 30-minute audit.',
      href: '/jasa/software-custom',
      label: 'View Custom Software Service',
    },
    faq: [
      {
        question:
          'Do I have to replace my current point-of-sale (POS) app to have an operations dashboard?',
        answer:
          'Not necessarily. If your current POS app allows daily transaction exports (in CSV or Excel format) or provides an API connection, a custom dashboard can read that sales data and combine it with your warehouse inventory logs.',
      },
      {
        question:
          'How often should physical ingredient stock counts (stock opname) be done in a cafe?',
        answer:
          'For your five to eight highest-value, fastest-moving ingredients (such as fresh milk, espresso beans, and cups), a quick count at shift close or at least twice a week is strongly recommended. For secondary items, once a week is sufficient.',
      },
      {
        question:
          'Why did my cafe ingredient cost percentage (COGS %) suddenly jump even though menu prices stayed the same?',
        answer:
          'A jump in COGS percentage while selling prices stay flat is usually caused by three factors: supplier price increases, bar portioning exceeding standard recipes, or high ingredient waste from spoilage and remade drinks.',
      },
      {
        question:
          'How many numbers or charts should ideally appear on the main owner dashboard screen?',
        answer:
          'Five to seven core indicators on a single screen that can be scanned in under a minute are far more effective than dozens of tiny charts. Detailed row-by-row tables can sit on secondary drill-down pages when you need to investigate a specific variance.',
      },
      {
        question:
          'Will baristas and stock clerks see the cafe profit margins if they use the same dashboard app?',
        answer:
          'No, because a custom dashboard application enforces role-based access control. Branch staff only see the physical stock input form and low-stock alerts, while currency margin figures and cash summaries are visible exclusively to the owner account.',
      },
      {
        question:
          'When is the right time for a cafe owner to move from Google Sheets to a custom dashboard app?',
        answer:
          'The right time is when you start operating more than one branch location, when spreadsheet formulas keep breaking because multiple staff edit them simultaneously, or when you need strict permission boundaries between field staff and management.',
      },
    ],
    relatedSlugs: [
      'website-and-system-maintenance-costs-after-launch',
      'vibe-coding-for-business-when-it-is-safe-and-risky',
      'business-workflow-automation-n8n-make-without-replacing-systems',
    ],
  },
];
