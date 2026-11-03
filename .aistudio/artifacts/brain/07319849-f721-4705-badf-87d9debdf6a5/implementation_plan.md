# Artikel Pilar Dwibahasa: Biaya Pembuatan Website Bisnis & Panduan Ruang Lingkup Fitur

Menyusun dan menerbitkan sepasang artikel pilar dwibahasa (**Bahasa Indonesia 1.600+ kata** dan **Bahasa Inggris 1.500+ kata**) mengenai cara menghitung biaya pembuatan website bisnis secara masuk akal, komponen pemicu kenaikan harga, risiko penyanderaan domain pada skema sewa website, serta strategi memangkas ruang lingkup fitur agar sesuai anggaran.

## User Review & Critical Decisions

> [!IMPORTANT]
> Berdasarkan konfirmasi kamu pada tahap klarifikasi, rencana eksekusi telah diselaraskan sebagai berikut:

- **Confirmed Decision 1 (Output & Publikasi)**: Menampilkan kedua artikel Markdown secara utuh di respons chat sesuai format `=== FILE: id/blog/... ===`, `=== FILE: en/blog/... ===`, dan `=== LAPORAN QA ===`, sekaligus menyimpan file Markdown dan memperbarui artikel pilar biaya website di katalog blog aplikasi.
- **Confirmed Decision 2 (Penekanan Struktur 9 H2 & Tabel)**: Fokus pada pembedahan komponen biaya teknis (alur data vs kosmetik), tabel perbandingan skema sewa terima beres vs kepemilikan penuh atas nama klien, serta langkah praktis memangkas ruang lingkup fitur mulai Rp1.200.000 dengan contoh skenario usaha katering/F&B di Bintaro.

---

## 1. Overview & Core Concept

- **What It Does**: Menghasilkan panduan komersial mendalam untuk pemilik usaha di BSD, Bintaro, Alam Sutera, Tangerang Selatan, dan Jabodetabek yang sedang membandingkan penawaran pembuatan website.
- **Target Audience / Persona**: Pemilik bisnis lokal dan pengambil keputusan operasional yang bingung melihat rentang harga website (dari ratusan ribu hingga puluhan juta rupiah) dan khawatir terjebak vendor yang menahan akses domain/hosting atau lepas tangan setelah pelunasan.
- **Key Value**: Memberikan kerangka keputusan yang jujur: harga website ditentukan oleh kompleksitas alur kerja dan integrasi data (bukan jumlah halaman kosmetik), cara memangkas cakupan fitur tanpa mengorbankan kualitas kode ketika anggaran terbatas, serta perlindungan kepemilikan domain dan hosting 100% atas nama klien.

---

## 2. User Experience & Editorial Architecture

- **Struktur Wajib & Kepatuhan AEO (Answer Engine Optimization)**:
  - **Frontmatter Presisi**:
    - `title` (ID & EN): Dijaga ketat pada rentang **50–62 karakter**.
    - `description` (ID & EN): Dijaga ketat pada rentang **150–160 karakter**, kalimat utuh diakhiri tanda titik.
    - Tanpa field `caseStudy` karena dikosongkan pada input (dihilangkan secara bersih tanpa placeholder).
  - **9 Subjudul H2 Berbasis Pertanyaan & Pernyataan Pencarian**:
    1. Mengapa penawaran biaya pembuatan website bisnis bisa terpaut sangat jauh?
    2. Apa saja komponen teknis yang benar-benar membuat harga website naik?
    3. Mengapa banyak halaman kosmetik dan animasi berat justru merugikan bisnis kamu?
    4. Apa bahaya sewa website terima beres yang domain dan hostingnya dipegang vendor?
    5. Bagaimana perbandingan skema sewa website bulanan dibanding kepemilikan penuh? *(dilengkapi Tabel Markdown)*
    6. Bagaimana cara menyesuaikan ruang lingkup fitur website ketika budget terbatas? *(dilengkapi Daftar Langkah Bernomor 1–5)*
    7. Contoh skenario: bagaimana usaha katering di Bintaro memangkas anggaran tanpa mengorbankan kualitas? *(blok Contoh skenario eksplisit)*
    8. Bagaimana pengalaman proyek nyata mengajarkan kami cara menjaga kualitas dan kepemilikan aset? *(merujuk 3 proyek nyata resmi & skema pembayaran DP 50% / pelunasan 50%)*
    9. Apa saja yang perlu disiapkan sebelum sesi audit gratis 30 menit?
  - **Kapsul Jawaban Langsung (40–60 Kata)**: Tepat di bawah setiap H2, paragraf pertama ditulis sepanjang 40–60 kata yang langsung menjawab H2 secara lugas dan mandiri sebelum masuk ke paragraf penjelasan.
  - **Elemen Wajib di Dalam Artikel**:
    - 2 Tabel Markdown perbandingan komponen biaya dan skema sewa vs milik sendiri.
    - Daftar langkah bernomor (1 sampai 5) untuk memangkas ruang lingkup fitur sesuai anggaran.
    - Kotak peringatan berformat `> **Peringatan:** ...` (ID) dan `> **Warning:** ...` (EN) tentang risiko penyanderaan domain dan akun hosting.
    - Bagian berlabel eksplisit **Contoh skenario** / **Scenario example** tentang pemilik usaha katering di Bintaro.
    - 5 butir FAQ faktual yang identik antara isi artikel dan YAML frontmatter.
    - Sumber referensi resmi (`developers.google.com/search`, `web.dev`, `schema.org`, `owasp.org`) dengan catatan 1 kalimat dan pengingat cek dokumentasi resmi.

---

## 3. Key Product & Editorial Decisions

- **Decision 1: Kepatuhan Ketat Protokol Kejujuran & Kata Terlarang**
  - *Chosen Approach*: Memvalidasi jumlah kata (1.600+ kata ID dan 1.500+ kata EN), menghitung karakter `title` (50–62 karakter) dan `description` (150–160 karakter) secara eksak, membatasi tanda pisah em-dash maksimal 2 (atau 0), tanpa emoji, serta memastikan 0 kata/frasa terlarang di kedua bahasa.
  - *Why*: Menjamin artikel siap dikutip oleh mesin pencari AI (AEO/GEO) dan memenuhi standar editorial CHESTAADOTCOM tanpa klaim superlatif atau angka karangan.
- **Decision 2: Sinkronisasi Output Chat & Katalog Blog Aplikasi**
  - *Chosen Approach*: Menyajikan kedua file Markdown lengkap beserta `=== LAPORAN QA ===` di chat, menyimpan file Markdown, dan memperbarui entri blog pilar biaya website di katalog aplikasi beserta alias slug-nya.
  - *Why*: Memungkinkan kamu langsung menyalin file Markdown dari chat sekaligus melihat hasilnya tayang langsung di halaman blog aplikasi.

---

## 4. Technical Architecture & Content Flow

```
┌──────────────────────────────────────────────────────────────────────────┐
│                 BILINGUAL PILLAR ARTICLE PIPELINE                        │
├──────────────────────────────────────────────────────────────────────────┤
│  1. Frontmatter & Metadata Validator                                     │
│     ├─ ID Slug: biaya-pembuatan-website-bisnis                           │
│     ├─ EN Slug: business-website-development-cost-guide                  │
│     ├─ Title Length Gate: 50–62 chars (exact count verified)             │
│     └─ Description Length Gate: 150–160 chars ending with period (.)     │
│                                  │                                       │
│                                  ▼                                       │
│  2. Structured Body Engine (ID 1,600+ words / EN 1,500+ words)           │
│     ├─ H1 + Concrete Lead (max 3 contextual links)                       │
│     ├─ Key Takeaways (3 full sentences matching frontmatter keyPoints)   │
│     ├─ 9 H2 Sections (each opens with a 40–60 word AEO answer paragraph) │
│     ├─ Comparison Tables + Numbered Scope-Trimming Steps + Warning Box   │
│     ├─ Bintaro Catering Scenario Example + 3 Official Real Projects      │
│     └─ Conclusion + 5 FAQs + Verified Official Documentation Sources     │
│                                  │                                       │
│                                  ▼                                       │
│  3. Dual Delivery & QA Verification                                      │
│     ├─ Full Markdown Output in Chat + === LAPORAN QA ===                 │
│     └─ Synced to App Blog Data & Slug Router                             │
└──────────────────────────────────────────────────────────────────────────┘
```
