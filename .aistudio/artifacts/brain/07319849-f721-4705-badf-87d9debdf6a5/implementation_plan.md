TECHNICAL PLANNING DOCUMENT: NEXT.JS 15 SEO & ENTERPRISE ARCHITECTURE UPGRADE

PROJECT: CHESTAADOTCOM ENTERPRISE & UMKM DIGITAL PLATFORM
PRINCIPAL ARCHITECT: CHESTA
DATE: OCTOBER 2026

OVERVIEW
This document outlines the comprehensive engineering and editorial plan for upgrading chestaadotcom's Next.js 15 architecture. The primary objectives are to inject robust JSON-LD FAQ schemas, synchronize high-intent B2B Enterprise and UMKM Komersial keywords across H1 headings and meta descriptions, and expand our thought-leadership blog database with 5 high-converting B2B articles.

--------------------------------------------------------------------------------

PHASE 1: FAQ SCHEMA INJECTION STRATEGY (ServiceDetailPage)

1. CUSTOM HOOK / UTILITY DESIGN ('useFaqSchema' / 'FAQSchema')
- Create a dedicated React component and utility parser that accepts raw FAQ arrays containing either '{ question, answer }' or '{ q, a }'.
- Strip any HTML markup and formatting symbols from the answer string to ensure pristine plain-text rendering for Google Rich Results.

2. JSON-LD STRUCTURE SPECIFICATION
- Construct a valid Schema.org 'FAQPage' object:
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "[Sanitized Question String]",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "[Sanitized Answer String]"
        }
      }
    ]
  }

3. HYDRATION & HEAD INJECTION SAFETY
- Implement both client-side DOM insertion (via 'useEffect' modifying 'document.head' with an element ID '#faq-schema-jsonld') and Server-Side Rendering (SSR) via `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonString }} />`.
- Prevent Next.js 15 hydration mismatches by ensuring consistent JSON stringification on both server and client execution cycles.

--------------------------------------------------------------------------------

PHASE 2: H1 & META DESCRIPTION SYNCHRONIZATION

1. GENERATE METADATA API STRATEGY
- Dynamically formulate 'title', 'metaDescription', and OpenGraph metadata in 'src/app/services/[slug]/page.tsx'.
- Inject high-intent commercial modifiers such as 'Konsultan Sistem ERP', 'Otomatisasi Workflow AI', and 'Jasa IT Enterprise Indonesia' tailored to both B2B Enterprise and UMKM Komersial segments.

2. H1 HEADINGS MATRIX PLAN
- Combine service slugs with high-intent localized commercial intent keywords:
  • 'jasa-website' -> H1: "Jasa Website & Infrastruktur Digital Skala Komersial"
  • 'ai-integration' -> H1: "Konsultan Integrasi AI & Otomatisasi Workflow Enterprise"
  • 'infrastruktur-digital-enterprise' -> H1: "Implementasi ERP Kustom & Arsitektur Private Cloud"

--------------------------------------------------------------------------------

PHASE 3: CONTENT DATABASE PREPARATION (5 NEW ENTERPRISE B2B BLOGS)

We will expand 'src/data/blogs.ts' with 5 new high-converting B2B and UMKM articles formatted in valid HTML strings:

1. Blog 15:
- Slug: "kebocoran-margin-umkm-komersial-pos"
- Title: "Jangan Biarkan Kasir Mencuri Margin Anda: Integrasi POS & AI untuk Franchise"
- Category: "Retail Automation"
- Summary: Point of Sale otonom untuk mencegah kebocoran margin UMKM franchise.

2. Blog 16:
- Slug: "portal-b2b-distributor-otomatis"
- Title: "Distributor Kehilangan Pesanan Karena WhatsApp? Beralih ke Portal B2B Otonom"
- Category: "B2B E-commerce"
- Summary: Mengubah pemesanan agen manual WhatsApp menjadi platform B2B 24 jam.

3. Blog 17:
- Slug: "telemedicine-klinik-kustom"
- Title: "Pasien Lari ke Kompetitor? Ini Bahayanya Admin Klinik yang Lambat Merespon"
- Category: "Healthcare IT"
- Summary: AI Triage dan reservasi instan untuk klinik kesehatan premium.

4. Blog 18:
- Slug: "ransomware-menghancurkan-reputasi-korporat"
- Title: "Satu Serangan Ransomware Bisa Menghancurkan Reputasi 10 Tahun Perusahaan Anda"
- Category: "Cybersecurity"
- Summary: Asuransi digital dan arsitektur database terisolasi untuk korporat.

5. Blog 19:
- Slug: "meninggalkan-software-akuntansi-murah"
- Title: "Bahaya Mengandalkan Software Akuntansi Murah untuk Operasional Skala Menengah"
- Category: "Financial Architecture"
- Summary: Transisi dari software SaaS murah ke ERP finansial kustom berbasis Node.js & PostgreSQL.
