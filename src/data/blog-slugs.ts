/**
 * Ultra-lightweight blog slug metadata for client-side routing & redirects.
 * Decouples index.js from the 1.5MB blog post markdown body corpus.
 */

export const BLOG_SLUGS_ID: readonly string[] = [
  "panduan-lengkap-cara-kerja-agentic-ai-untuk-pemula",
  "tool-use-function-calling-ai-agent-bisnis",
  "memori-ai-agent-bisnis-retensi-dan-privasi",
  "multi-agent-vs-single-agent-arsitektur-bisnis",
  "biaya-operasional-bulanan-ai-agent-bisnis",
  "merancang-alur-percakapan-whatsapp-ai-agent",
  "landing-page-iklan-meta-google-konversi-tinggi",
  "core-web-vitals-pemilik-bisnis-lcp-inp-cls",
  "webhook-dan-api-otomasi-antar-aplikasi-bisnis",
  "keamanan-website-bisnis-lokal-12-langkah",
  "cara-memilih-jasa-pembuatan-website-tangerang-selatan",
  "human-handoff-ai-agent-kapan-serahkan-ke-manusia",
  "rag-untuk-pemilik-bisnis-ai-menjawab-dari-dokumen",
  "evaluasi-ai-agent-cara-mengukur-kinerja-agent-bisnis",
  "nextjs-vs-wordpress-untuk-bisnis-lokal-cara-memilih",
  "biaya-rawat-website-dan-sistem-setelah-rilis",
  "schema-markup-untuk-bisnis-lokal-panduan-praktis",
  "otomasi-invoice-dan-penagihan-jasa-profesional",
  "ai-untuk-kos-kosan-dan-properti-sewa",
  "dashboard-untuk-pemilik-kafe-metrik-operasional",
  "whatsapp-business-app-vs-api-untuk-bisnis",
  "keamanan-ai-agent-prompt-injection-data-pelanggan",
  "uu-pdp-bisnis-whatsapp-ai-panduan-praktis",
  "n8n-make-zapier-kode-custom-pilih-otomasi",
  "chatbot-ai-website-gagal-7-penyebab-solusi",
  "ai-agent-vs-chatbot-perbedaan-untuk-bisnis",
  "mcp-model-context-protocol-untuk-pemilik-bisnis",
  "vibe-coding-untuk-bisnis-kapan-cukup-kapan-berbahaya",
  "geo-dan-aeo-cara-bisnis-lokal-muncul-di-ai",
  "otomasi-workflow-bisnis-n8n-make-pekerjaan-repetitif",
  "kenapa-landing-page-lambat-bikin-iklan-boncos",
  "berapa-biaya-bikin-website-bisnis-panduan-harga",
  "otomasi-whatsapp-ai-klinik-fnb-alur-kerja",
  "checklist-landing-page-konversi-tinggi-bisnis-jasa",
  "seo-lokal-bisnis-bsd-tangerang-selatan-google-maps"
] as const;

export const BLOG_SLUGS_EN: readonly string[] = [
  "a-complete-guide-to-how-agentic-ai-works-for-beginners",
  "tool-use-function-calling-ai-agents-business",
  "ai-agent-memory-retention-privacy-business",
  "multi-agent-vs-single-agent-business-architecture",
  "monthly-operating-costs-ai-agents-business",
  "designing-whatsapp-conversation-flows-ai-agents",
  "landing-pages-meta-google-ads-high-conversion",
  "core-web-vitals-business-owners-lcp-inp-cls",
  "webhooks-and-apis-cross-app-automation-business",
  "local-business-website-security-12-essential-steps",
  "how-to-choose-web-development-service-south-tangerang",
  "human-handoff-ai-agent-when-to-escalate-to-humans",
  "rag-for-business-owners-ai-answers-from-documents",
  "evaluating-ai-agents-how-to-measure-business-agent-performance",
  "nextjs-vs-wordpress-for-local-business-how-to-choose",
  "website-and-system-maintenance-costs-after-launch",
  "schema-markup-for-local-businesses-practical-guide",
  "invoice-and-billing-automation-for-professional-services",
  "ai-for-boarding-houses-and-rental-properties",
  "dashboards-for-cafe-owners-operational-metrics",
  "whatsapp-business-app-vs-api-for-business",
  "ai-agent-security-prompt-injection-customer-data",
  "pdp-law-indonesia-business-whatsapp-ai",
  "n8n-make-zapier-custom-code-automation-guide",
  "why-website-ai-chatbots-fail-7-causes-fixes",
  "ai-agent-vs-chatbot-difference-for-business",
  "mcp-model-context-protocol-for-business-owners",
  "vibe-coding-for-business-when-enough-when-dangerous",
  "geo-and-aeo-how-local-businesses-rank-in-ai-answers",
  "business-workflow-automation-n8n-make-repetitive-tasks",
  "why-slow-landing-pages-waste-ad-spend",
  "how-much-does-a-business-website-cost-pricing-guide",
  "whatsapp-ai-automation-for-clinics-and-fnb-workflows",
  "high-converting-landing-page-checklist-for-service-businesses",
  "local-seo-guide-for-bsd-and-south-tangerang-businesses"
] as const;

export const BLOG_SLUG_ID_TO_EN: Record<string, string> = {
  "panduan-lengkap-cara-kerja-agentic-ai-untuk-pemula": "a-complete-guide-to-how-agentic-ai-works-for-beginners",
  "tool-use-function-calling-ai-agent-bisnis": "tool-use-function-calling-ai-agents-business",
  "memori-ai-agent-bisnis-retensi-dan-privasi": "ai-agent-memory-retention-privacy-business",
  "multi-agent-vs-single-agent-arsitektur-bisnis": "multi-agent-vs-single-agent-business-architecture",
  "biaya-operasional-bulanan-ai-agent-bisnis": "monthly-operating-costs-ai-agents-business",
  "merancang-alur-percakapan-whatsapp-ai-agent": "designing-whatsapp-conversation-flows-ai-agents",
  "landing-page-iklan-meta-google-konversi-tinggi": "landing-pages-meta-google-ads-high-conversion",
  "core-web-vitals-pemilik-bisnis-lcp-inp-cls": "core-web-vitals-business-owners-lcp-inp-cls",
  "webhook-dan-api-otomasi-antar-aplikasi-bisnis": "webhooks-and-apis-cross-app-automation-business",
  "keamanan-website-bisnis-lokal-12-langkah": "local-business-website-security-12-essential-steps",
  "cara-memilih-jasa-pembuatan-website-tangerang-selatan": "how-to-choose-web-development-service-south-tangerang",
  "human-handoff-ai-agent-kapan-serahkan-ke-manusia": "human-handoff-ai-agent-when-to-escalate-to-humans",
  "rag-untuk-pemilik-bisnis-ai-menjawab-dari-dokumen": "rag-for-business-owners-ai-answers-from-documents",
  "evaluasi-ai-agent-cara-mengukur-kinerja-agent-bisnis": "evaluating-ai-agents-how-to-measure-business-agent-performance",
  "nextjs-vs-wordpress-untuk-bisnis-lokal-cara-memilih": "nextjs-vs-wordpress-for-local-business-how-to-choose",
  "biaya-rawat-website-dan-sistem-setelah-rilis": "website-and-system-maintenance-costs-after-launch",
  "schema-markup-untuk-bisnis-lokal-panduan-praktis": "schema-markup-for-local-businesses-practical-guide",
  "otomasi-invoice-dan-penagihan-jasa-profesional": "invoice-and-billing-automation-for-professional-services",
  "ai-untuk-kos-kosan-dan-properti-sewa": "ai-for-boarding-houses-and-rental-properties",
  "dashboard-untuk-pemilik-kafe-metrik-operasional": "dashboards-for-cafe-owners-operational-metrics",
  "whatsapp-business-app-vs-api-untuk-bisnis": "whatsapp-business-app-vs-api-for-business",
  "keamanan-ai-agent-prompt-injection-data-pelanggan": "ai-agent-security-prompt-injection-customer-data",
  "uu-pdp-bisnis-whatsapp-ai-panduan-praktis": "pdp-law-indonesia-business-whatsapp-ai",
  "n8n-make-zapier-kode-custom-pilih-otomasi": "n8n-make-zapier-custom-code-automation-guide",
  "chatbot-ai-website-gagal-7-penyebab-solusi": "why-website-ai-chatbots-fail-7-causes-fixes",
  "ai-agent-vs-chatbot-perbedaan-untuk-bisnis": "ai-agent-vs-chatbot-difference-for-business",
  "mcp-model-context-protocol-untuk-pemilik-bisnis": "mcp-model-context-protocol-for-business-owners",
  "vibe-coding-untuk-bisnis-kapan-cukup-kapan-berbahaya": "vibe-coding-for-business-when-enough-when-dangerous",
  "geo-dan-aeo-cara-bisnis-lokal-muncul-di-ai": "geo-and-aeo-how-local-businesses-rank-in-ai-answers",
  "otomasi-workflow-bisnis-n8n-make-pekerjaan-repetitif": "business-workflow-automation-n8n-make-repetitive-tasks",
  "kenapa-landing-page-lambat-bikin-iklan-boncos": "why-slow-landing-pages-waste-ad-spend",
  "landing-page-untuk-iklan-bisnis": "landing-pages-for-business-ads",
  "berapa-biaya-bikin-website-bisnis-panduan-harga": "how-much-does-a-business-website-cost-pricing-guide",
  "biaya-pembuatan-website-bisnis": "business-website-development-cost-guide",
  "biaya-pembuatan-website-bisnis-tangerang-selatan": "business-website-development-cost-south-tangerang",
  "otomasi-whatsapp-ai-klinik-fnb-alur-kerja": "whatsapp-ai-automation-for-clinics-and-fnb-workflows",
  "kapan-bisnis-butuh-ai-agent-whatsapp": "when-your-business-needs-a-whatsapp-ai-agent",
  "pindah-dari-spreadsheet-ke-software-custom": "moving-from-spreadsheets-to-custom-software",
  "checklist-landing-page-konversi-tinggi-bisnis-jasa": "high-converting-landing-page-checklist-for-service-businesses",
  "seo-lokal-bisnis-bsd-tangerang-selatan-google-maps": "local-seo-guide-for-bsd-and-south-tangerang-businesses"
};

export const BLOG_SLUG_EN_TO_ID: Record<string, string> = {
  "a-complete-guide-to-how-agentic-ai-works-for-beginners": "panduan-lengkap-cara-kerja-agentic-ai-untuk-pemula",
  "tool-use-function-calling-ai-agents-business": "tool-use-function-calling-ai-agent-bisnis",
  "ai-agent-memory-retention-privacy-business": "memori-ai-agent-bisnis-retensi-dan-privasi",
  "multi-agent-vs-single-agent-business-architecture": "multi-agent-vs-single-agent-arsitektur-bisnis",
  "monthly-operating-costs-ai-agents-business": "biaya-operasional-bulanan-ai-agent-bisnis",
  "designing-whatsapp-conversation-flows-ai-agents": "merancang-alur-percakapan-whatsapp-ai-agent",
  "landing-pages-meta-google-ads-high-conversion": "landing-page-iklan-meta-google-konversi-tinggi",
  "core-web-vitals-business-owners-lcp-inp-cls": "core-web-vitals-pemilik-bisnis-lcp-inp-cls",
  "webhooks-and-apis-cross-app-automation-business": "webhook-dan-api-otomasi-antar-aplikasi-bisnis",
  "local-business-website-security-12-essential-steps": "keamanan-website-bisnis-lokal-12-langkah",
  "how-to-choose-web-development-service-south-tangerang": "cara-memilih-jasa-pembuatan-website-tangerang-selatan",
  "human-handoff-ai-agent-when-to-escalate-to-humans": "human-handoff-ai-agent-kapan-serahkan-ke-manusia",
  "rag-for-business-owners-ai-answers-from-documents": "rag-untuk-pemilik-bisnis-ai-menjawab-dari-dokumen",
  "evaluating-ai-agents-how-to-measure-business-agent-performance": "evaluasi-ai-agent-cara-mengukur-kinerja-agent-bisnis",
  "nextjs-vs-wordpress-for-local-business-how-to-choose": "nextjs-vs-wordpress-untuk-bisnis-lokal-cara-memilih",
  "website-and-system-maintenance-costs-after-launch": "biaya-rawat-website-dan-sistem-setelah-rilis",
  "schema-markup-for-local-businesses-practical-guide": "schema-markup-untuk-bisnis-lokal-panduan-praktis",
  "invoice-and-billing-automation-for-professional-services": "otomasi-invoice-dan-penagihan-jasa-profesional",
  "ai-for-boarding-houses-and-rental-properties": "ai-untuk-kos-kosan-dan-properti-sewa",
  "dashboards-for-cafe-owners-operational-metrics": "dashboard-untuk-pemilik-kafe-metrik-operasional",
  "whatsapp-business-app-vs-api-for-business": "whatsapp-business-app-vs-api-untuk-bisnis",
  "ai-agent-security-prompt-injection-customer-data": "keamanan-ai-agent-prompt-injection-data-pelanggan",
  "pdp-law-indonesia-business-whatsapp-ai": "uu-pdp-bisnis-whatsapp-ai-panduan-praktis",
  "n8n-make-zapier-custom-code-automation-guide": "n8n-make-zapier-kode-custom-pilih-otomasi",
  "why-website-ai-chatbots-fail-7-causes-fixes": "chatbot-ai-website-gagal-7-penyebab-solusi",
  "ai-agent-vs-chatbot-difference-for-business": "ai-agent-vs-chatbot-perbedaan-untuk-bisnis",
  "mcp-model-context-protocol-for-business-owners": "mcp-model-context-protocol-untuk-pemilik-bisnis",
  "vibe-coding-for-business-when-enough-when-dangerous": "vibe-coding-untuk-bisnis-kapan-cukup-kapan-berbahaya",
  "geo-and-aeo-how-local-businesses-rank-in-ai-answers": "geo-dan-aeo-cara-bisnis-lokal-muncul-di-ai",
  "business-workflow-automation-n8n-make-repetitive-tasks": "otomasi-workflow-bisnis-n8n-make-pekerjaan-repetitif",
  "why-slow-landing-pages-waste-ad-spend": "kenapa-landing-page-lambat-bikin-iklan-boncos",
  "landing-pages-for-business-ads": "landing-page-untuk-iklan-bisnis",
  "how-much-does-a-business-website-cost-pricing-guide": "berapa-biaya-bikin-website-bisnis-panduan-harga",
  "business-website-development-cost-guide": "biaya-pembuatan-website-bisnis",
  "business-website-development-cost-south-tangerang": "biaya-pembuatan-website-bisnis-tangerang-selatan",
  "whatsapp-ai-automation-for-clinics-and-fnb-workflows": "otomasi-whatsapp-ai-klinik-fnb-alur-kerja",
  "when-your-business-needs-a-whatsapp-ai-agent": "kapan-bisnis-butuh-ai-agent-whatsapp",
  "moving-from-spreadsheets-to-custom-software": "pindah-dari-spreadsheet-ke-software-custom",
  "high-converting-landing-page-checklist-for-service-businesses": "checklist-landing-page-konversi-tinggi-bisnis-jasa",
  "local-seo-guide-for-bsd-and-south-tangerang-businesses": "seo-lokal-bisnis-bsd-tangerang-selatan-google-maps"
};

export function isValidBlogSlug(slug: string): boolean {
  return slug in BLOG_SLUG_ID_TO_EN || slug in BLOG_SLUG_EN_TO_ID;
}

export function resolveBlogAlternateSlug(slug: string, targetLocale: "id" | "en"): string | null {
  if (targetLocale === "en") {
    return BLOG_SLUG_ID_TO_EN[slug] || null;
  }
  return BLOG_SLUG_EN_TO_ID[slug] || null;
}

export function getBlogAlternateSlugs(slug: string): { idSlug: string; enSlug?: string } | null {
  if (slug in BLOG_SLUG_ID_TO_EN) {
    return { idSlug: slug, enSlug: BLOG_SLUG_ID_TO_EN[slug] };
  }
  if (slug in BLOG_SLUG_EN_TO_ID) {
    return { idSlug: BLOG_SLUG_EN_TO_ID[slug], enSlug: slug };
  }
  return null;
}

