# Implementation Plan: Interactive "Comment Thread" FAQ Page (/id/faq & /en/faq)

Build the complete, interactive **FAQ Page** at `/id/faq` and `/en/faq` on `chestaa.com` (`CHESTAADOTCOM`) styled as a human "comment thread" conversation: each question appears as a prospective client comment, and each answer as a direct reply from Chesta Azka or Zeeshan.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The user confirmed the following interactive behaviors:
> - **Search Toolbar**: Instant client-side text filtering across question and answer keywords with `aria-live` polite live search count and "Tidak ada hasil. Tanya langsung di bawah." empty state.
> - **WhatsApp Question Composer**: Formats user text into a prefilled WhatsApp link that opens WhatsApp directly in a new tab without storing any server-side data.
> - **Deep Linking & Accessibility**: Native `<details id="...">` HTML tags allow deep-link hash scrolling (e.g. `/id/faq#boleh-nego-harga`), native screen-reader expandability, and full SEO indexing without requiring JavaScript.

---

## 1. Overview & Core Concept

- **What It Does**: Renders 21 verbatim bilingual FAQ threads across 6 categories (*Harga dan pembayaran*, *Proses dan waktu*, *Website*, *AI agent dan otomasi*, *Data dan keamanan*, *Kerja sama*).
- **Data Integration**: Sourced from `src/data/faq.ts` (re-using prices and timelines directly from `src/data/pricing.ts` and `src/data/process.ts`).
- **Interactive UI**:
  - Hero with breadcrumb and `<TrustStrip />`.
  - Category navigation bar + Search filter input + "Buka semua" / "Tutup semua" toggle button.
  - Native `<details>` threads with avatar monograms (CA for Chesta, Z for Zeeshan), typing dot indicator (CSS 450ms animation), contextual WhatsApp CTA link, and cross-reference links (`Pricing`, `About`, `Case Studies`).
  - "Punya pertanyaan lain?" WhatsApp question composer textarea.
  - Final CTA section.

---

## 2. Page Structure & Section Breakdown

```
┌────────────────────────────────────────────────────────────────────────┐
│ 1. Hero Section + Breadcrumb (Home > FAQ) + Trust Strip               │
├────────────────────────────────────────────────────────────────────────┤
│ 2. Category Nav & Search Toolbar                                       │
│    ├── Category Links (Harga, Proses, Website, AI Agent, Data, Kerja Sama) │
│    ├── Instant Keyword Search Input (aria-live polite count)           │
│    └── "Buka Semua / Tutup Semua" Toggle Button                         │
├────────────────────────────────────────────────────────────────────────┤
│ 3. 21 Comment Thread Categories (6 Groupings, Reading Width 760px)   │
│    ├── Summary Row (<details>/<summary>): Avatar "Calon Klien" + Question  │
│    ├── Reply Bubble: Monogram CA / Z + "Tim CHESTAADOTCOM" + Reply Text│
│    └── Action Row: WhatsApp CTA + "Lihat juga" Cross-Links             │
├────────────────────────────────────────────────────────────────────────┤
│ 4. "Punya pertanyaan lain?" WhatsApp Composer                         │
├────────────────────────────────────────────────────────────────────────┤
│ 5. Final CTA Block ("Ceritakan kerjaan yang paling bikin capek")       │
└────────────────────────────────────────────────────────────────────────┘
```

### The 21 Bilingual Threads Matrix

1. **Harga dan Pembayaran**:
   - Q1: *Harga mulai dari berapa?* (Zeeshan) → Landing page mulai Rp1.200.000 (from `pricing.ts`).
   - Q2: *Bayarnya gimana, ada DP?* (Zeeshan) → DP 50% & pelunasan.
   - Q3: *Boleh nego harga?* (Zeeshan) → Tanpa diskon di depan; penyesuaian ruang lingkup.
   - Q4: *Ada biaya lain di luar paket?* (Zeeshan) → Domain, hosting, API usage, ads.
   - Q5: *Kalau aku cuma butuh sebagian, boleh?* (Zeeshan) → Boleh, add-on eceran.

2. **Proses dan Waktu**:
   - Q6: *Berapa lama pengerjaannya?* (Chesta) → 2-4 hari (Starter), 5-7 hari (Growth), dst.
   - Q7: *Aku nggak ngerti teknis, nggak apa-apa?* (Chesta) → Bahasa bisnis, tanpa jargon.
   - Q8: *Kalau hasilnya nggak sesuai ekspektasi?* (Chesta) → Tahap prototipe & revisi.
   - Q9: *Apa yang harus disiapkan sebelum audit?* (Zeeshan) → Gambaran kerjaan & spreadsheet.
   - Q10: *Setelah rilis masih dibantu nggak?* (Zeeshan) → Dukungan perbaikan & paket rawat.

3. **Website**:
   - Q11: *Bedanya landing page dan company profile apa?* (Chesta) → 1 tujuan vs profil multi-halaman.
   - Q12: *Website bisa muncul di Google?* (Chesta) → Dasar SEO; tidak janji posisi tertentu.
   - Q13: *Domain dan hosting atas nama siapa?* (Zeeshan) → Atas nama klien (100% milikmu).

4. **AI Agent dan Otomasi**:
   - Q14: *AI agent itu beda dari chatbot biasa?* (Chesta) → Membaca maksud, jalankan tool, handoff manusia.
   - Q15: *Kalau AI-nya salah jawab gimana?* (Chesta) → Batas tindakan, audit log, handoff ke staf.
   - Q16: *Bisnis kecil kayak aku cocok pakai AI agent?* (Chesta) → Jujur dievaluasi saat audit.
   - Q17: *Aku masih pakai WhatsApp biasa, bisa?* (Chesta) → Bantuan pendaftaran WhatsApp API Meta.

5. **Data dan Keamanan**:
   - Q18: *Data pelanggan aku aman?* (Chesta) → Tetap milik klien; akses dicabut setelah selesai.
   - Q19: *Siapa pemilik kode dan sistemnya?* (Chesta) → Hak milik disepakati tertulis di awal.

6. **Kerja Sama**:
   - Q20: *Kalian sudah pernah ngerjain proyek apa?* (Chesta) → Pengalaman Chesta sejak 2021 (brand minuman, pesantren, logistik). Link ke `/about`, `/portfolio`, `/case-studies`.
   - Q21: *Kalian di mana, bisa ketemu langsung?* (Zeeshan) → BSD Tangerang Selatan & Jabodetabek.

---

## 3. SEO, Schema & Technical Strategy

- **Page Titles**:
  - `id`: `FAQ: Harga, Proses, dan AI Agent untuk Bisnis | CHESTAADOTCOM` (54 chars)
  - `en`: `FAQ: Pricing, Process, and Business AI Agents | CHESTAADOTCOM` (55 chars)
- **Meta Descriptions**:
  - `id`: `Jawaban jujur soal harga, DP, waktu pengerjaan, AI agent, data, dan kerja sama dengan CHESTAADOTCOM. Tanya langsung kalau belum ketemu.` (138 chars)
  - `en`: `Candid answers on pricing, deposit, delivery time, AI agents, data privacy, and working with CHESTAADOTCOM.` (108 chars)
- **JSON-LD Schema**:
  - `@graph` containing `WebPage`, `BreadcrumbList`, and `FAQPage` with all 21 questions and answers matching the visible rendered copy.

---

## 4. Verification & Testing Steps

1. Run `compile_applet` to confirm clean compilation.
2. Run `npm run pricing:check` to verify data single source of truth.
3. Run `npm run content:lint` to verify zero banned words across all 21 threads.
4. Run `npm run seo:audit` to verify 100% compliance across all 154+ routes.
