# Manual Owner SEO, GEO & AEO Checklist — Chesta Azka & Zeeshan

Daftar periksa operasional ini merangkum tindakan berkala yang hanya dapat dilakukan secara manual oleh pemilik bisnis (**Chesta Azka & Zeeshan**) di luar repositori kode untuk menjaga performa pencarian organik dan visibilitas AI **CHESTAADOTCOM**.

---

## 1. Rutinitas Mingguan (15 Menit setiap Senin)
- [ ] **Google Search Console (GSC) — Laporan Performa & Indeks**:
  - Periksa tab **Indexing > Pages** untuk memastikan seluruh halaman baru (`/id/blog/...`, `/en/blog/...`, dan `/id/blog/topik/...`) berstatus *Indexed*.
  - Gunakan fitur **URL Inspection > Request Indexing** setiap kali menerbitkan artikel baru atau memperbarui artikel pilar.
- [ ] **Google Business Profile (GBP)**:
  - Balas setiap ulasan baru dari klien dengan menyebutkan jenis layanan dan konteks lokasi secara alami (misalnya *"Terima kasih atas kepercayaannya membangun sistem AI agent WhatsApp untuk klinik di BSD bersama CHESTAADOTCOM"*).
  - Unggah minimal 1 pembaruan (*GBP Update*) yang menautkan ke artikel klaster terbaru menggunakan parameter UTM dari `docs/tracking.md`.

---

## 2. Rutinitas Bulanan (45 Menit setiap Awal Bulan)
- [ ] **Eksekusi Pengujian GEO (`docs/geo-tracking.md`)**:
  - Jalankan sampel 10–15 kueri dari `data/geo-queries.json` di Google AI Overviews, ChatGPT Search, Perplexity, Gemini, dan Bing Copilot.
  - Catat hasilnya di `docs/geo-tracking-log-template.csv`.
- [ ] **Evaluasi CTR di Google Search Console**:
  - Filter kueri yang memiliki **Impressions > 100** tetapi **CTR < 2,5%**.
  - Sesuaikan `seoTitle` (50–62 karakter) dan `metaDescription` (140–160 karakter) halaman terkait mengikuti formula di `docs/ctr-playbook.md`.
- [ ] **Tinjau Laporan Peluang Tautan Internal (`docs/link-opportunities-report.md`)**:
  - Jalankan `npm run seo:audit` untuk memperbarui laporan peluang tautan internal.
  - Pilih 3–5 peluang tautan yang paling relevan secara konteks bagi pembaca, tambahkan secara manual ke dalam teks artikel, lalu jalankan kembali `npm run content:lint`.

---

## 3. Rutinitas Kuartalan / Setiap 180 Hari (Audit Kesegaran Konten)
- [ ] **Tinjau Laporan Kesegaran Konten (`docs/freshness-report.md`)**:
  - Periksa artikel yang ditandai mendekati atau melewati usia 180 hari sejak tanggal `updatedAt`.
  - Verifikasi apakah seluruh tautan rujukan resmi (Google Search Central, Meta for Developers, OWASP, peraturan UU PDP) masih aktif dan relevan.
  - Jika terdapat perubahan kebijakan platform atau penambahan skenario baru, perbarui isi artikel, ubah tanggal `updatedAt` ke tanggal hari itu, dan tambahkan satu baris riwayat pada properti `changelog` agar blok **"Pembaruan"** tampil transparan di bawah artikel.
