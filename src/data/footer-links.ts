/**
 * Lightweight static metadata for global Footer and Home teaser components.
 * Decouples initial load from the 1.5MB blog post markdown body and 30-area datasets.
 */

export const FOOTER_TOP_10_AREAS = [
  { slug: 'tangerang-selatan', name: 'Tangerang Selatan' },
  { slug: 'bsd-city', name: 'BSD City' },
  { slug: 'serpong', name: 'Serpong' },
  { slug: 'alam-sutera', name: 'Alam Sutera' },
  { slug: 'bintaro', name: 'Bintaro' },
  { slug: 'gading-serpong', name: 'Gading Serpong' },
  { slug: 'pamulang', name: 'Pamulang' },
  { slug: 'ciputat', name: 'Ciputat' },
  { slug: 'pondok-aren', name: 'Pondok Aren' },
  { slug: 'lebak-bulus', name: 'Lebak Bulus' },
] as const;

export const FOOTER_LIVE_SERVICE_AREAS = [
  { slug: 'tangerang-selatan', name: 'Tangerang Selatan' },
  { slug: 'bsd-city', name: 'BSD City' },
  { slug: 'pamulang', name: 'Pamulang' },
  { slug: 'jurang-mangu', name: 'Jurang Mangu' },
  { slug: 'lebak-bulus', name: 'Lebak Bulus' },
] as const;

export interface FooterBlogPostLink {
  slug: string;
  title: string;
}

export const FOOTER_BLOG_POSTS: Record<'id' | 'en', FooterBlogPostLink[]> = {
  id: [
    {
      slug: 'panduan-lengkap-cara-kerja-agentic-ai-untuk-pemula',
      title: 'Panduan Lengkap: Cara Kerja Agentic AI untuk Pemula',
    },
    {
      slug: 'tool-use-function-calling-ai-agent-bisnis',
      title: 'Tool Use dan Function Calling: Cara AI Agent Mengakses Sistem Nyata',
    },
    {
      slug: 'memori-ai-agent-bisnis-retensi-dan-privasi',
      title: 'Memori AI Agent: Perbedaan Memori Sesi, Memori Jangka Panjang, dan Privasi Data Bisnis',
    },
    {
      slug: 'multi-agent-vs-single-agent-arsitektur-bisnis',
      title: 'Multi-Agent vs Single-Agent: Kapan Bisnis Butuh Banyak AI yang Saling Bicara?',
    },
    {
      slug: 'biaya-operasional-bulanan-ai-agent-bisnis',
      title: 'Biaya Operasional Bulanan AI Agent: Dari Token API Sampai Server WhatsApp',
    },
  ],
  en: [
    {
      slug: 'a-complete-guide-to-how-agentic-ai-works-for-beginners',
      title: 'A Complete Guide to How Agentic AI Works for Beginners',
    },
    {
      slug: 'tool-use-function-calling-ai-agents-business',
      title: 'Tool Use and Function Calling: How AI Agents Access Real Business Systems',
    },
    {
      slug: 'ai-agent-memory-retention-privacy-business',
      title: 'AI Agent Memory: Differences Between Session Memory, Long-Term Memory, and Business Privacy',
    },
    {
      slug: 'multi-agent-vs-single-agent-business-architecture',
      title: 'Multi-Agent vs Single-Agent: When Does Your Business Need Multiple AIs Talking to Each Other?',
    },
    {
      slug: 'monthly-operating-costs-ai-agents-business',
      title: 'Monthly Operating Costs of a Business AI Agent: From API Tokens to WhatsApp Servers',
    },
  ],
};

export interface HomeTeaserBlogPost {
  slug: string;
  title: string;
  excerpt: string;
  readTime: string;
  category: string;
  coverImage: string;
  coverAlt: string;
}

export const HOME_LATEST_BLOG_POSTS: Record<'id' | 'en', HomeTeaserBlogPost[]> = {
  id: [
    {
      slug: 'panduan-lengkap-cara-kerja-agentic-ai-untuk-pemula',
      title: 'Panduan Lengkap: Cara Kerja Agentic AI untuk Pemula',
      excerpt:
        'Pelajari cara kerja agentic AI dari konsep dasar hingga implementasi: perbedaan dengan chatbot biasa, anatomi 4 pilar, siklus kerja, batasan teknis, dan contoh skenario klinik BSD.',
      readTime: '14 menit baca',
      category: 'Agentic AI & WhatsApp',
      coverImage:
        '/images/blog/covers/panduan-lengkap-cara-kerja-agentic-ai-untuk-pemula.svg',
      coverAlt:
        'Diagram siklus kerja Agentic AI meliputi tahap perencanaan, pemanggilan tool, dan evaluasi hasil untuk operasional bisnis',
    },
    {
      slug: 'tool-use-function-calling-ai-agent-bisnis',
      title: 'Tool Use dan Function Calling: Cara AI Agent Mengakses Sistem Nyata',
      excerpt:
        'Pahami cara AI agent mengendalikan software bisnis nyata melalui tool use dan function calling: skema JSON, alur bolak-balik API, keamanan hak akses, dan contoh stok kafe di Pamulang.',
      readTime: '12 menit baca',
      category: 'Agentic AI & WhatsApp',
      coverImage:
        '/images/blog/covers/tool-use-function-calling-ai-agent-bisnis.svg',
      coverAlt:
        'Diagram arsitektur function calling AI agent yang menghubungkan parameter JSON tervalidasi ke endpoint API sistem bisnis',
    },
    {
      slug: 'memori-ai-agent-bisnis-retensi-dan-privasi',
      title: 'Memori AI Agent: Perbedaan Memori Sesi, Memori Jangka Panjang, dan Privasi Data Bisnis',
      excerpt:
        'Kupas tuntas arsitektur memori AI agent: batasan context window, memori sesi vs jangka panjang, retrieval database vektor, kepatuhan UU PDP, dan skenario bimbel di Pamulang.',
      readTime: '11 menit baca',
      category: 'Agentic AI & WhatsApp',
      coverImage:
        '/images/blog/covers/memori-ai-agent-bisnis-retensi-dan-privasi.svg',
      coverAlt:
        'Ilustrasi tiga lapisan memori AI agent dari memori sesi jangka pendek hingga penyimpanan vektor dengan batas retensi',
    },
  ],
  en: [
    {
      slug: 'a-complete-guide-to-how-agentic-ai-works-for-beginners',
      title: 'A Complete Guide to How Agentic AI Works for Beginners',
      excerpt:
        'Learn how agentic AI works from core concepts to real deployment: differences from standard chatbots, the 4 architectural pillars, execution cycles, technical limits, and a BSD clinic scenario.',
      readTime: '14 min read',
      category: 'Agentic AI & WhatsApp',
      coverImage:
        '/images/blog/covers/panduan-lengkap-cara-kerja-agentic-ai-untuk-pemula.svg',
      coverAlt:
        'Schematic loop diagram of Agentic AI showing planning, tool execution, and observation stages for business operations',
    },
    {
      slug: 'tool-use-function-calling-ai-agents-business',
      title: 'Tool Use and Function Calling: How AI Agents Access Real Business Systems',
      excerpt:
        'Understand how AI agents interact with real business software through tool use and function calling: JSON schemas, API round-trips, access control, and a Pamulang cafe stock scenario.',
      readTime: '12 min read',
      category: 'Agentic AI & WhatsApp',
      coverImage:
        '/images/blog/covers/tool-use-function-calling-ai-agent-bisnis.svg',
      coverAlt:
        'Architecture diagram of AI agent function calling connecting validated JSON parameters to business system API endpoints',
    },
    {
      slug: 'ai-agent-memory-retention-privacy-business',
      title: 'AI Agent Memory: Differences Between Session Memory, Long-Term Memory, and Business Privacy',
      excerpt:
        'Explore AI agent memory architecture: context window limits, session vs long-term memory, vector database retrieval, Indonesia PDP Law compliance, and a Pamulang tutoring scenario.',
      readTime: '12 min read',
      category: 'Agentic AI & WhatsApp',
      coverImage:
        '/images/blog/covers/memori-ai-agent-bisnis-retensi-dan-privasi.svg',
      coverAlt:
        'Illustration of three AI agent memory layers from short-term session state to vector storage with retention policies',
    },
  ],
};

export interface HomeSampleProjectTeaser {
  slug: string;
  title: string;
  oneLiner: string;
  categoryLabel: string;
  industry: string;
  badgeLabel: string;
  sampleNote: string;
  cover: string;
  targetNote: string;
}

export const HOME_SAMPLE_PROJECTS: Record<'id' | 'en', HomeSampleProjectTeaser[]> = {
  id: [
    {
      slug: 'wa-concierge-klinik',
      title: 'WA Concierge: agen booking WhatsApp untuk klinik',
      oneLiner:
        'Menjawab pertanyaan perawatan, mengecek slot terapis, dan membuat booking dari percakapan WhatsApp.',
      categoryLabel: 'AI Agent',
      industry: 'Klinik',
      badgeLabel: 'Contoh proyek',
      sampleNote:
        'Contoh proyek dirancang untuk memperlihatkan alur kerja kami. Bukan proyek klien.',
      cover: 'projectWaConciergeKlinik',
      targetNote: 'baca maksud chat bebas',
    },
    {
      slug: 'dashboard-kafe',
      title: 'Dashboard Operasional Kafe',
      oneLiner:
        'Stok bahan, penjualan harian, dan laporan beberapa cabang dalam satu dashboard.',
      categoryLabel: 'Software Custom',
      industry: 'F&B',
      badgeLabel: 'Contoh proyek',
      sampleNote:
        'Contoh proyek dirancang untuk memperlihatkan alur kerja kami. Bukan proyek klien.',
      cover: 'projectDashboardKafe',
      targetNote: 'satu sumber data',
    },
    {
      slug: 'lead-properti',
      title: 'Alur Lead Properti',
      oneLiner:
        'Lead dari formulir iklan masuk ke CRM, agen diberi tahu, dan follow-up terjadwal otomatis.',
      categoryLabel: 'Otomasi Workflow',
      industry: 'Properti',
      badgeLabel: 'Contoh proyek',
      sampleNote:
        'Contoh proyek dirancang untuk memperlihatkan alur kerja kami. Bukan proyek klien.',
      cover: 'projectLeadProperti',
      targetNote: '0 langkah pencatatan manual',
    },
  ],
  en: [
    {
      slug: 'wa-concierge-klinik',
      title: 'WA Concierge: WhatsApp booking agent for clinics',
      oneLiner:
        'Answers treatment questions, checks therapist slots, and creates bookings from WhatsApp conversations.',
      categoryLabel: 'AI Agent',
      industry: 'Clinic',
      badgeLabel: 'Sample project',
      sampleNote:
        'Sample project designed to show our workflow. Not a client project.',
      cover: 'projectWaConciergeKlinik',
      targetNote: 'free-text intent reading',
    },
    {
      slug: 'dashboard-kafe',
      title: 'Cafe Operations Dashboard',
      oneLiner:
        'Ingredient stock, daily sales, and multi-branch reports in one dashboard.',
      categoryLabel: 'Custom Software',
      industry: 'F&B',
      badgeLabel: 'Sample project',
      sampleNote:
        'Sample project designed to show our workflow. Not a client project.',
      cover: 'projectDashboardKafe',
      targetNote: 'single source of truth',
    },
    {
      slug: 'lead-properti',
      title: 'Property Lead Workflow',
      oneLiner:
        'Leads from ad forms go into the CRM, agents get notified, and follow-ups are scheduled automatically.',
      categoryLabel: 'Workflow Automation',
      industry: 'Property',
      badgeLabel: 'Sample project',
      sampleNote:
        'Sample project designed to show our workflow. Not a client project.',
      cover: 'projectLeadProperti',
      targetNote: '0 manual entry steps',
    },
  ],
};

export const HOME_ENGLISH_FAQS = [
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
      'Yes. Many businesses start with a single high-impact workflow—such as answering WhatsApp inquiries and logging bookings to Google Sheets—and add an operational dashboard later as operations grow.',
  },
  {
    question: 'Which areas do you serve?',
    answer:
      'We are based in BSD, South Tangerang, serving South Tangerang, BSD City, Pamulang, Jurang Mangu, Lebak Bulus, and Greater Jakarta, with online collaboration and scheduled in-person meetings in South Tangerang.',
  },
];

