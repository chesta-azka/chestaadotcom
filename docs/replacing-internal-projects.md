# Panduan Mengganti Proyek & Studi Kasus Internal dengan Proyek Klien Asli

Semua proyek di `src/data/projects.ts` (`src/data/projects.en.ts`) dan studi kasus di `src/data/case-studies.ts` (`src/data/case-studies.en.ts`) saat ini ditandai sebagai **Proyek internal** (`internal: true`) dengan angka yang dilabeli **Target desain, bukan hasil klien**.

Ketika CHESTAADOTCOM siap menerbitkan proyek atau studi kasus klien asli, ikuti 6 langkah berikut agar aturan kejujuran konten, skema SEO/JSON-LD, dan terjemahan 1:1 tetap konsisten.

---

## 1. Pastikan Izin Tertulis dari Klien
Sebelum mengganti data:
- Dapatkan persetujuan tertulis dari klien untuk menampilkan nama bisnis (atau deskripsi industri anonim yang disepakati), tangkapan layar sistem, serta angka operasional.
- Jangan pernah menambahkan testimoni, kutipan klien, atau skema `Review` / `AggregateRating` tanpa kutipan asli yang bisa diverifikasi.

---

## 2. Perbarui Entri Proyek di `src/data/projects.ts` & `src/data/projects.en.ts`
Buka `src/data/projects.ts` (Bahasa Indonesia) dan `src/data/projects.en.ts` (Bahasa Inggris), lalu ubah properti berikut pada proyek yang diganti:

```ts
{
  slug: 'slug-proyek-klien',
  title: 'Judul Proyek Klien',
  client: 'Nama Klien (atau Deskripsi Bisnis yang Disetujui)',
  internal: false, // Ubah dari true ke false
  internalBadgeLabel: 'Proyek klien', // EN: 'Client project'
  outcomesLabel: 'Hasil terukur di lapangan', // EN: 'Measured field results'
  outcomes: [
    // Tulis hanya metrik nyata yang sudah diverifikasi bersama klien
  ],
}
```

---

## 3. Perbarui Entri Studi Kasus di `src/data/case-studies.ts` & `src/data/case-studies.en.ts`
Buka `src/data/case-studies.ts` dan `src/data/case-studies.en.ts`, lalu sesuaikan field berikut:

1. **Status & Lencana**:
   - `internal: false`
   - `internalBadgeLabel: 'Studi kasus klien'` (EN: `'Client case study'`)
   - `client: 'Nama Klien'`
2. **Bagian Target / Hasil (`targetsBadgeLabel` & `sections[5]`)**:
   - Jika angka yang ditampilkan adalah hasil pengukuran nyata setelah rilis, ubah `targetsBadgeLabel` menjadi `'Hasil terukur di lapangan'` (EN: `'Measured field results'`).
   - Jika sebagian angka masih berupa target arsitektur/SLA, pertahankan keterangan `'Target desain'` pada catatan item tersebut.
3. **Narasi 7 Bagian (Minimal 700 Kata di `/id` & Terjemahan 1:1 di `/en`)**:
   - Pertahankan struktur 7 bagian (`Konteks`, `Masalah`, `Pendekatan`, `Alur sistem`, `Implementasi`, `Target desain / Hasil`, `Catatan perancangan`) beserta blok `callout`, `diagram` (6 langkah + 1 cabang pengaman), dan `trade-offs`.
   - Pastikan tidak ada kata terlarang (banned words) di Bahasa Indonesia maupun Bahasa Inggris.

---

## 4. Ganti Aset Ilustrasi di `src/config/images.ts`
- Untuk tangkapan layar asli yang sudah disensor data pribadinya (PII), daftarkan aset WebP/SVG baru di `src/config/images.ts` dengan `width`, `height`, `aspectRatio`, `alt` (ID), dan `altEn` (EN).
- Pada `gallery[]` di `src/data/projects.ts`, ubah `label: 'Ilustrasi'` menjadi `'Tangkapan layar'` (EN: `'Screenshot'`) hanya untuk gambar tangkapan layar asli.

---

## 5. Perbarui Disclosure Strip di `src/pages/CaseStudiesPage.tsx` (Bila Campuran Proyek Internal & Klien)
Jika daftar studi kasus sudah berisi campuran proyek internal dan proyek klien:
- Ubah teks pita keterbukaan (disclosure strip) di bawah header `/id/studi-kasus` menjadi:
  > *"Setiap studi kasus di halaman ini dilengkapi penanda 'Proyek internal' atau 'Studi kasus klien' agar kamu bisa membedakan prototipe internal CHESTAADOTCOM dan implementasi di tempat klien."*

---

## 6. Regenerasi Sitemap & Berkas AI Discovery
Setelah memperbarui data, jalankan perintah build atau skrip generator agar `public/sitemap.xml`, `public/rss.xml`, `public/llms.txt`, dan `public/llms-full.txt` ikut terbarui secara otomatis.
