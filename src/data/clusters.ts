import type { ServiceSlug } from './services';

export type TopicClusterId =
  | 'agentic-ai'
  | 'website-dan-performa'
  | 'seo-lokal-dan-geo'
  | 'otomasi-dan-software'
  | 'biaya-dan-memilih-vendor';

export interface TopicCluster {
  id: TopicClusterId;
  titleId: string;
  titleEn: string;
  shortLabelId: string;
  shortLabelEn: string;
  seoTitleId: string;
  seoTitleEn: string;
  metaDescriptionId: string;
  metaDescriptionEn: string;
  introId: string;
  introEn: string;
  pillarSlugId: string;
  pillarSlugEn: string;
  pillarTitleId: string;
  pillarTitleEn: string;
  relatedServiceSlugs: ServiceSlug[];
  relatedAreaSlugs: string[];
  coverImageKey:
    | 'clusterAgenticAi'
    | 'clusterWebsitePerforma'
    | 'clusterLocalSeo'
    | 'clusterWorkflowSoftware'
    | 'clusterCostVendor';
}

export const TOPIC_CLUSTERS: TopicCluster[] = [
  {
    id: 'agentic-ai',
    titleId: 'Agentic AI, Tool Use, dan Asisten WhatsApp Bisnis',
    titleEn: 'Agentic AI, Tool Use, and Business WhatsApp Assistants',
    shortLabelId: 'Agentic AI & WhatsApp',
    shortLabelEn: 'Agentic AI & WhatsApp',
    seoTitleId: 'Panduan Agentic AI & Otomasi WhatsApp | CHESTAADOTCOM',
    seoTitleEn: 'Agentic AI & WhatsApp Automation Guide | CHESTAADOTCOM',
    metaDescriptionId:
      'Kumpulan panduan teknis Agentic AI untuk bisnis di BSD & Tangerang Selatan: siklus ReAct, function calling, memori, evaluasi, keamanan, dan kepatuhan UU PDP.',
    metaDescriptionEn:
      'Technical guides on Agentic AI for businesses in BSD & South Tangerang: ReAct loops, function calling, memory, evaluation, security, and PDP Law compliance.',
    introId:
      'Klaster topik Agentic AI ini dirancang khusus untuk pemilik bisnis, manajer operasional, dan tim teknis di Tangerang Selatan, BSD City, Pamulang, Jurang Mangu, Lebak Bulus, serta Jabodetabek yang ingin memahami cara kerja kecerdasan buatan melampaui chatbot penjawab teks biasa. Di dalam pusat panduan ini, kamu akan mempelajari bagaimana sistem AI agent menggabungkan penalaran model bahasa besar (LLM) dengan pemanggilan fungsi (tool use dan function calling), manajemen memori jangka pendek serta basis data vektor, hingga protokol serah terima ke staf manusia (human handoff) saat menghadapi keluhan pelanggan. Kami juga membahas pengamanan arsitektur terhadap serangan prompt injection, pembatasan hak akses data, penghitungan efisiensi biaya token bulanan di WhatsApp Business Platform, serta langkah kepatuhan nyata terhadap Undang-Undang Pelindungan Data Pribadi (UU No. 27 Tahun 2022) agar operasional bisnismu berjalan aman dan terukur.',
    introEn:
      'This Agentic AI topic cluster is built for business owners, operations managers, and technical teams across South Tangerang, BSD City, Pamulang, Jurang Mangu, Lebak Bulus, and Greater Jakarta who want to understand how artificial intelligence moves beyond simple text-reply chatbots. Inside this hub, you will learn how AI agent systems combine large language model (LLM) reasoning with tool use and function calling, short-term session memory and vector databases, and human handoff protocols when handling sensitive customer escalations. We also cover architectural defenses against prompt injection attacks, strict data permission boundaries, monthly token cost optimization on the WhatsApp Business Platform, and practical compliance steps for Indonesia Personal Data Protection Law (Law No. 27 of 2022) so your business operations run safely and predictably.',
    pillarSlugId: 'panduan-lengkap-cara-kerja-agentic-ai-untuk-pemula',
    pillarSlugEn: 'a-complete-guide-to-how-agentic-ai-works-for-beginners',
    pillarTitleId: 'Panduan Lengkap: Cara Kerja Agentic AI untuk Pemula',
    pillarTitleEn: 'A Complete Guide to How Agentic AI Works for Beginners',
    relatedServiceSlugs: ['ai-agent', 'otomasi-workflow'],
    relatedAreaSlugs: ['bsd-city', 'tangerang-selatan', 'lebak-bulus'],
    coverImageKey: 'clusterAgenticAi',
  },
  {
    id: 'website-dan-performa',
    titleId: 'Website Bisnis, Core Web Vitals, dan Konversi Iklan',
    titleEn: 'Business Websites, Core Web Vitals, and Ad Conversion',
    shortLabelId: 'Website & Performa',
    shortLabelEn: 'Websites & Performance',
    seoTitleId: 'Performa Website & Konversi Landing Page | CHESTAADOTCOM',
    seoTitleEn: 'Website Speed & Landing Page Conversion | CHESTAADOTCOM',
    metaDescriptionId:
      'Panduan kecepatan website, Core Web Vitals (LCP, INP, CLS), landing page iklan Meta & Google Ads, serta keamanan web untuk bisnis di BSD & Tangerang Selatan.',
    metaDescriptionEn:
      'Guides on website speed, Core Web Vitals (LCP, INP, CLS), Meta & Google Ads landing pages, and web security for businesses in BSD & South Tangerang. Read now.',
    introId:
      'Klaster topik Website dan Performa ini mengupas tuntas bagaimana arsitektur halaman web secara langsung memengaruhi efisiensi anggaran iklan digital dan tingkat konversi calon pelanggan bisnismu. Banyak pemilik usaha di BSD City, Tangerang Selatan, dan Jakarta Selatan menghabiskan jutaan rupiah setiap minggu di Meta Ads atau Google Ads, namun kehilangan separuh pengunjung di tiga detik pertama akibat waktu muat halaman yang lambat di jaringan seluler. Melalui rangkaian artikel di topik ini, kamu akan mempelajari cara membaca dan memperbaiki tiga metrik Core Web Vitals (Largest Contentful Paint, Interaction to Next Paint, dan Cumulative Layout Shift), menyusun anatomi landing page berkonversi tinggi yang selaras dengan janji iklan, membandingkan pemilihan teknologi antara Next.js dan WordPress secara objektif, serta menerapkan dua belas langkah pengamanan wajib agar website bisnismu terlindung dari peretasan.',
    introEn:
      'This Website and Performance topic cluster examines how web page architecture directly impacts digital advertising efficiency and prospect conversion rates for your business. Many business owners in BSD City, South Tangerang, and South Jakarta spend millions of rupiah each week on Meta Ads or Google Ads, yet lose half their mobile visitors within the first three seconds due to sluggish page load times. Through the articles in this hub, you will learn how to diagnose and fix the three Core Web Vitals metrics (Largest Contentful Paint, Interaction to Next Paint, and Cumulative Layout Shift), structure high-converting landing pages that match your ad message, objectively compare Next.js against WordPress for local operations, and implement twelve essential security controls to protect your business website from tampering.',
    pillarSlugId: 'kenapa-landing-page-lambat-bikin-iklan-boncos',
    pillarSlugEn: 'why-slow-landing-pages-waste-ad-spend',
    pillarTitleId: 'Kenapa Landing Page Lambat Bisa Bikin Iklan Boncos (dan Cara Memperbaikinya)',
    pillarTitleEn: 'Why Slow Landing Pages Waste Your Ad Spend (and How to Fix It)',
    relatedServiceSlugs: ['pembuatan-website', 'software-custom'],
    relatedAreaSlugs: ['bsd-city', 'tangerang-selatan', 'pamulang'],
    coverImageKey: 'clusterWebsitePerforma',
  },
  {
    id: 'seo-lokal-dan-geo',
    titleId: 'SEO Lokal, Schema Markup, serta Visibilitas GEO & AEO',
    titleEn: 'Local SEO, Schema Markup, and GEO & AEO Visibility',
    shortLabelId: 'SEO Lokal & GEO',
    shortLabelEn: 'Local SEO & GEO',
    seoTitleId: 'Panduan SEO Lokal, Schema, GEO & AEO | CHESTAADOTCOM',
    seoTitleEn: 'Local SEO, Schema, GEO & AEO Guide | CHESTAADOTCOM',
    metaDescriptionId:
      'Strategi praktis SEO lokal di BSD & Tangerang Selatan, penerapan JSON-LD Schema Markup, serta optimasi GEO dan AEO agar bisnis dikutip mesin pencari AI.',
    metaDescriptionEn:
      'Practical local SEO strategies in BSD & South Tangerang, JSON-LD Schema Markup implementation, and GEO/AEO optimization so AI search engines cite your business.',
    introId:
      'Klaster topik SEO Lokal dan GEO (Generative Engine Optimization) membahas perubahan cara calon pelanggan menemukan bisnis jasa di era pencarian modern. Saat ini, calon klien di kawasan BSD City, Pamulang, Jurang Mangu, Bintaro, hingga Lebak Bulus tidak hanya mengetik kata kunci di Google Search dan Google Maps, tetapi juga bertanya langsung ke asisten AI seperti Google AI Overviews, ChatGPT Search, Perplexity, dan Gemini untuk meminta rekomendasi penyedia layanan lokal yang tepercaya. Di dalam kumpulan panduan ini, kamu akan mempelajari langkah teknis mengoptimalkan Google Business Profile, menyusun struktur halaman area layanan yang kaya konteks lokal nyata, memasang kode terstruktur JSON-LD Schema.org (LocalBusiness, Service, FAQPage) tanpa error, serta menerapkan penulisan ringkasan jawaban langsung (Answer Engine Optimization) agar entitas bisnismu mudah dipahami, diverifikasi, dan dikutip secara konsisten oleh mesin pencari.',
    introEn:
      'This Local SEO and GEO (Generative Engine Optimization) topic cluster explores how prospective customers discover service businesses in the modern search landscape. Today, buyers across BSD City, Pamulang, Jurang Mangu, Bintaro, and Lebak Bulus do not just type keywords into Google Search and Google Maps; they also ask AI assistants like Google AI Overviews, ChatGPT Search, Perplexity, and Gemini for trusted local vendor recommendations. Inside this comprehensive guide hub, you will learn the practical technical steps to optimize your Google Business Profile, structure local service area pages grounded in authentic neighborhood context, deploy error-free Schema.org JSON-LD markup (LocalBusiness, Service, FAQPage), and write direct answer capsules (Answer Engine Optimization) so search engines and AI systems accurately understand, verify, and cite your business entity.',
    pillarSlugId: 'seo-lokal-bisnis-bsd-tangerang-selatan-google-maps',
    pillarSlugEn: 'local-seo-guide-for-bsd-and-south-tangerang-businesses',
    pillarTitleId: 'SEO Lokal untuk Bisnis di BSD & Tangerang Selatan: Cara Muncul di Google Maps dan Pencarian',
    pillarTitleEn: 'Local SEO for Businesses in BSD & South Tangerang: How to Rank on Google Maps and Search',
    relatedServiceSlugs: ['pembuatan-website', 'ai-agent'],
    relatedAreaSlugs: ['bsd-city', 'tangerang-selatan', 'pamulang', 'jurang-mangu', 'lebak-bulus'],
    coverImageKey: 'clusterLocalSeo',
  },
  {
    id: 'otomasi-dan-software',
    titleId: 'Otomasi Workflow, Integrasi API, dan Software Custom',
    titleEn: 'Workflow Automation, API Integration, and Custom Software',
    shortLabelId: 'Otomasi & Software',
    shortLabelEn: 'Automation & Software',
    seoTitleId: 'Otomasi Workflow, Webhook API & Software | CHESTAADOTCOM',
    seoTitleEn: 'Workflow Automation, Webhooks & Software | CHESTAADOTCOM',
    metaDescriptionId:
      'Panduan otomasi workflow bisnis di Tangerang Selatan: integrasi webhook & API, pemilihan n8n vs Make vs kode custom, dashboard operasional, dan penagihan.',
    metaDescriptionEn:
      'Business workflow automation guides in South Tangerang: webhook & API integration, choosing n8n vs Make vs custom code, operational dashboards, and billing.',
    introId:
      'Klaster topik Otomasi dan Software ini disusun secara khusus untuk pemilik usaha yang ingin membebaskan tim administrasi dari rutinitas salin-tempel data berulang antar-aplikasi setiap hari. Ketika bisnis klinik, F&B, distributor, maupun kantor jasa profesional di Tangerang Selatan dan Jabodetabek mulai berkembang, ketergantungan pada pencatatan manual di lembar kerja yang terpisah sering memicu pesanan terlewat, selisih stok gudang, dan keterlambatan pengiriman tagihan invoice. Di dalam pusat topik ini, kamu akan mempelajari bagaimana merancang aliran data otomatis menggunakan kombinasi webhook dan REST API, kapan harus memilih platform visual seperti n8n, Make, atau Zapier dibandingkan menulis kode perangkat lunak custom, cara membangun sistem pengingat penagihan otomatis yang sopan, serta cara menyusun dashboard operasional kafe dan bisnis yang menampilkan metrik kas nyata tanpa membuat pemilik usaha pusing.',
    introEn:
      'This Automation and Software topic cluster is specifically designed for business owners who want to free their administrative staff from repetitive daily copy-pasting across disconnected software tools. As clinics, F&B outlets, distributors, and professional service firms across South Tangerang and Greater Jakarta grow, relying on manual data entry across isolated spreadsheets leads to missed customer orders, inventory discrepancies, and delayed client invoicing. Inside this topic hub, you will learn how to architect automated data pipelines using webhooks and REST APIs, when to choose visual orchestration platforms like n8n, Make, or Zapier versus writing custom software code, how to build automated billing and payment reminder workflows, and how to design operational dashboards for cafes and local businesses that highlight actionable cash metrics without overwhelming the business owner.',
    pillarSlugId: 'otomasi-whatsapp-ai-klinik-fnb-alur-kerja',
    pillarSlugEn: 'whatsapp-ai-automation-for-clinics-and-fnb-workflows',
    pillarTitleId: 'Otomasi WhatsApp & AI untuk Klinik dan F&B: Contoh Alur Kerja Nyata',
    pillarTitleEn: 'WhatsApp & AI Automation for Clinics and F&B: Real-World Workflow Examples',
    relatedServiceSlugs: ['otomasi-workflow', 'software-custom', 'ai-agent'],
    relatedAreaSlugs: ['bsd-city', 'tangerang-selatan', 'jurang-mangu', 'lebak-bulus'],
    coverImageKey: 'clusterWorkflowSoftware',
  },
  {
    id: 'biaya-dan-memilih-vendor',
    titleId: 'Biaya Pembuatan, Perawatan Sistem, dan Cara Memilih Vendor',
    titleEn: 'Development Costs, System Maintenance, and Choosing a Vendor',
    shortLabelId: 'Biaya & Memilih Vendor',
    shortLabelEn: 'Costs & Vendor Guide',
    seoTitleId: 'Panduan Biaya Website, AI & Pilih Vendor | CHESTAADOTCOM',
    seoTitleEn: 'Website Cost, AI Pricing & Vendor Guide | CHESTAADOTCOM',
    metaDescriptionId:
      'Transparansi biaya pembuatan website, biaya bulanan AI agent, biaya rawat server, risiko vibe coding, dan panduan memilih vendor IT di Tangerang Selatan.',
    metaDescriptionEn:
      'Transparent guides on website development pricing, monthly AI agent costs, server maintenance fees, vibe coding risks, and choosing an IT vendor in Tangsel.',
    introId:
      'Klaster topik Biaya dan Memilih Vendor ini hadir untuk memberikan transparansi penuh bagi pemilik bisnis sebelum menandatangani kontrak pembuatan website, perangkat lunak custom, maupun sistem AI agent. Banyak pengusaha di Tangerang Selatan dan Jabodetabek pernah mengalami kekecewaan akibat penawaran harga yang tidak jelas di awal, biaya perpanjangan tahunan yang tiba-tiba membengkak, atau ditinggalkan vendor tanpa penyerahan kode sumber (source code) dan akses akun domain. Di dalam pusat panduan ini, kamu akan menemukan rincian jujur komponen biaya pembuatan website bisnis berdasarkan cakupan kerja, simulasi perhitungan biaya operasional bulanan AI agent (mulai dari token model bahasa hingga tarif sesi WhatsApp Cloud API), rincian biaya perawatan server pasca-rilis, batasan keamanan kode hasil generasi AI instan (vibe coding), serta daftar dua belas pertanyaan wajib untuk menguji kredibilitas calon vendor teknologi.',
    introEn:
      'This Costs and Choosing a Vendor topic cluster provides complete pricing and architectural transparency for business owners before signing any website, custom software, or AI agent development contract. Many entrepreneurs across South Tangerang, BSD City, and Greater Jakarta have experienced costly frustration from vague initial quotes, sudden annual renewal markups, or vendor lock-in where source code and domain ownership are withheld. Inside this practical guide hub, you will find an honest breakdown of business website development costs by scope, realistic simulations of monthly AI agent operating expenses (from language model tokens to official WhatsApp Cloud API session rates), post-launch server maintenance and backup costs, security boundaries of rapid AI-generated code (vibe coding), and a twelve-question due-diligence checklist to evaluate technology vendors.',
    pillarSlugId: 'berapa-biaya-bikin-website-bisnis-panduan-harga',
    pillarSlugEn: 'how-much-does-a-business-website-cost-pricing-guide',
    pillarTitleId: 'Berapa Biaya Bikin Website untuk Bisnis? Panduan Harga Jujur',
    pillarTitleEn: 'How Much Does a Business Website Cost? An Honest Pricing Guide',
    relatedServiceSlugs: ['pembuatan-website', 'software-custom', 'ai-agent'],
    relatedAreaSlugs: ['tangerang-selatan', 'bsd-city', 'pamulang', 'jurang-mangu'],
    coverImageKey: 'clusterCostVendor',
  },
];

/**
 * Complete 1-to-1 assignment table mapping every Indonesian and English blog slug
 * (plus any legacy aliases) to its single canonical TopicClusterId.
 */
export const POST_CLUSTER_ASSIGNMENT: Record<string, TopicClusterId> = {
  // ============================================================================
  // CLUSTER 1: agentic-ai
  // ============================================================================
  'panduan-lengkap-cara-kerja-agentic-ai-untuk-pemula': 'agentic-ai',
  'a-complete-guide-to-how-agentic-ai-works-for-beginners': 'agentic-ai',
  'guide-how-agentic-ai-works-for-beginners': 'agentic-ai',

  'tool-use-function-calling-ai-agent-bisnis': 'agentic-ai',
  'tool-use-function-calling-ai-agents-business': 'agentic-ai',

  'memori-ai-agent-bisnis-retensi-dan-privasi': 'agentic-ai',
  'ai-agent-memory-retention-privacy-business': 'agentic-ai',

  'multi-agent-vs-single-agent-arsitektur-bisnis': 'agentic-ai',
  'multi-agent-vs-single-agent-business-architecture': 'agentic-ai',

  'merancang-alur-percakapan-whatsapp-ai-agent': 'agentic-ai',
  'designing-whatsapp-conversation-flows-ai-agents': 'agentic-ai',

  'human-handoff-ai-agent-kapan-serahkan-ke-manusia': 'agentic-ai',
  'human-handoff-ai-agent-when-to-escalate-to-humans': 'agentic-ai',

  'rag-untuk-pemilik-bisnis-ai-menjawab-dari-dokumen': 'agentic-ai',
  'rag-for-business-owners-ai-answers-from-documents': 'agentic-ai',

  'evaluasi-ai-agent-cara-mengukur-kinerja-agent-bisnis': 'agentic-ai',
  'evaluating-ai-agents-how-to-measure-business-agent-performance': 'agentic-ai',

  'ai-untuk-kos-kosan-dan-properti-sewa': 'agentic-ai',
  'ai-for-boarding-houses-and-rental-properties': 'agentic-ai',

  'whatsapp-business-app-vs-api-untuk-bisnis': 'agentic-ai',
  'whatsapp-business-app-vs-api-for-business': 'agentic-ai',

  'keamanan-ai-agent-prompt-injection-data-pelanggan': 'agentic-ai',
  'ai-agent-security-prompt-injection-customer-data': 'agentic-ai',

  'uu-pdp-bisnis-whatsapp-ai-panduan-praktis': 'agentic-ai',
  'pdp-law-indonesia-business-whatsapp-ai': 'agentic-ai',

  'chatbot-ai-website-gagal-7-penyebab-solusi': 'agentic-ai',
  'why-website-ai-chatbots-fail-7-causes-fixes': 'agentic-ai',

  'ai-agent-vs-chatbot-perbedaan-untuk-bisnis': 'agentic-ai',
  'ai-agent-vs-chatbot-difference-for-business': 'agentic-ai',

  'mcp-model-context-protocol-untuk-pemilik-bisnis': 'agentic-ai',
  'mcp-model-context-protocol-for-business-owners': 'agentic-ai',

  // ============================================================================
  // CLUSTER 2: website-dan-performa
  // ============================================================================
  'kenapa-landing-page-lambat-bikin-iklan-boncos': 'website-dan-performa',
  'why-slow-landing-pages-waste-ad-spend': 'website-dan-performa',

  'checklist-landing-page-konversi-tinggi-bisnis-jasa': 'website-dan-performa',
  'high-converting-landing-page-checklist-for-service-businesses': 'website-dan-performa',

  'nextjs-vs-wordpress-untuk-bisnis-lokal-cara-memilih': 'website-dan-performa',
  'nextjs-vs-wordpress-for-local-business-how-to-choose': 'website-dan-performa',

  'landing-page-iklan-meta-google-konversi-tinggi': 'website-dan-performa',
  'landing-pages-meta-google-ads-high-conversion': 'website-dan-performa',

  'core-web-vitals-pemilik-bisnis-lcp-inp-cls': 'website-dan-performa',
  'core-web-vitals-business-owners-lcp-inp-cls': 'website-dan-performa',

  'keamanan-website-bisnis-lokal-12-langkah': 'website-dan-performa',
  'local-business-website-security-12-essential-steps': 'website-dan-performa',

  // ============================================================================
  // CLUSTER 3: seo-lokal-dan-geo
  // ============================================================================
  'seo-lokal-bisnis-bsd-tangerang-selatan-google-maps': 'seo-lokal-dan-geo',
  'seo-lokal-bisnis-bsd-tangerang-selatan': 'seo-lokal-dan-geo',
  'local-seo-guide-for-bsd-and-south-tangerang-businesses': 'seo-lokal-dan-geo',
  'local-seo-for-businesses-in-bsd-and-south-tangerang': 'seo-lokal-dan-geo',

  'geo-dan-aeo-cara-bisnis-lokal-muncul-di-ai': 'seo-lokal-dan-geo',
  'geo-and-aeo-how-local-businesses-rank-in-ai-answers': 'seo-lokal-dan-geo',

  'schema-markup-untuk-bisnis-lokal-panduan-praktis': 'seo-lokal-dan-geo',
  'schema-markup-for-local-businesses-practical-guide': 'seo-lokal-dan-geo',

  // ============================================================================
  // CLUSTER 4: otomasi-dan-software
  // ============================================================================
  'otomasi-whatsapp-ai-klinik-fnb-alur-kerja': 'otomasi-dan-software',
  'otomasi-whatsapp-ai-klinik-dan-fnb': 'otomasi-dan-software',
  'whatsapp-ai-automation-for-clinics-and-fnb-workflows': 'otomasi-dan-software',
  'whatsapp-and-ai-automation-for-clinics-and-fnb': 'otomasi-dan-software',

  'otomasi-workflow-bisnis-n8n-make-pekerjaan-repetitif': 'otomasi-dan-software',
  'business-workflow-automation-n8n-make-repetitive-tasks': 'otomasi-dan-software',

  'n8n-make-zapier-kode-custom-pilih-otomasi': 'otomasi-dan-software',
  'n8n-make-zapier-custom-code-automation-guide': 'otomasi-dan-software',

  'dashboard-untuk-pemilik-kafe-metrik-operasional': 'otomasi-dan-software',
  'dashboards-for-cafe-owners-operational-metrics': 'otomasi-dan-software',

  'otomasi-invoice-dan-penagihan-jasa-profesional': 'otomasi-dan-software',
  'invoice-and-billing-automation-for-professional-services': 'otomasi-dan-software',

  'webhook-dan-api-otomasi-antar-aplikasi-bisnis': 'otomasi-dan-software',
  'webhooks-and-apis-cross-app-automation-business': 'otomasi-dan-software',

  // ============================================================================
  // CLUSTER 5: biaya-dan-memilih-vendor
  // ============================================================================
  'berapa-biaya-bikin-website-bisnis-panduan-harga': 'biaya-dan-memilih-vendor',
  'how-much-does-a-business-website-cost-pricing-guide': 'biaya-dan-memilih-vendor',

  'vibe-coding-untuk-bisnis-kapan-cukup-kapan-berbahaya': 'biaya-dan-memilih-vendor',
  'vibe-coding-for-business-when-enough-when-dangerous': 'biaya-dan-memilih-vendor',

  'biaya-rawat-website-dan-sistem-setelah-rilis': 'biaya-dan-memilih-vendor',
  'website-and-system-maintenance-costs-after-launch': 'biaya-dan-memilih-vendor',

  'cara-memilih-jasa-pembuatan-website-tangerang-selatan': 'biaya-dan-memilih-vendor',
  'how-to-choose-web-development-service-south-tangerang': 'biaya-dan-memilih-vendor',

  'biaya-operasional-bulanan-ai-agent-bisnis': 'biaya-dan-memilih-vendor',
  'monthly-operating-costs-ai-agents-business': 'biaya-dan-memilih-vendor',
};

export function getTopicClusterById(clusterId: string): TopicCluster | undefined {
  const normalized = (clusterId || '').trim().toLowerCase();
  return TOPIC_CLUSTERS.find((c) => c.id === normalized);
}

export function resolveClusterIdForPostSlug(
  slug: string,
  explicitClusterId?: TopicClusterId
): TopicClusterId {
  if (explicitClusterId) return explicitClusterId;
  const normalized = (slug || '').trim().toLowerCase();
  return POST_CLUSTER_ASSIGNMENT[normalized] || 'agentic-ai';
}

export function getClusterHubPath(
  clusterId: TopicClusterId,
  locale: 'id' | 'en' = 'id'
): string {
  return locale === 'en' ? `/en/blog/topic/${clusterId}` : `/id/blog/topik/${clusterId}`;
}

export function isPillarPostForCluster(
  slug: string,
  clusterId: TopicClusterId
): boolean {
  const cluster = getTopicClusterById(clusterId);
  if (!cluster) return false;
  const normalized = (slug || '').trim().toLowerCase();
  return (
    normalized === cluster.pillarSlugId.toLowerCase() ||
    normalized === cluster.pillarSlugEn.toLowerCase()
  );
}
