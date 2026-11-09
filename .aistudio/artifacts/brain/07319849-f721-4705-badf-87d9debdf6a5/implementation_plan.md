# Rencana Implementasi Artikel Pilar Dwibahasa: Kenapa Landing Page Iklan Lambat di Browser Instagram (HP)

## 1. Tujuan & Cakupan Tugas
Menyusun dan menerbitkan artikel pilar dwibahasa (**Indonesia minimal 1.600 kata** & **Inggris minimal 1.500 kata**, terjemahan setia 1:1) untuk **CHESTAADOTCOM (`chestaa.com`)** yang membedah mengapa halaman landing page yang terlihat lancar saat dibuka di laptop kantor justru sering macet atau tampil layar putih saat diklik calon pelanggan dari dalam aplikasi Instagram atau TikTok (*in-app browser*), serta cara menyusun halaman ringan yang langsung mengarahkan prospek ke WhatsApp.

Artikel ini akan:
1. **Diterbitkan langsung ke katalog blog aplikasi** (terintegrasi penuh dengan rute dwibahasa `/blog/kenapa-landing-page-iklan-lambat-di-hp` dan `/en/blog/why-ad-landing-pages-load-slowly-on-mobile`, klaster `website-dan-performa`, serta ilustrasi sampul skematik unik).
2. **Ditampilkan secara utuh di ruang chat** dalam format `=== FILE: id/blog/kenapa-landing-page-iklan-lambat-di-hp.md ===` dan `=== FILE: en/blog/why-ad-landing-pages-load-slowly-on-mobile.md ===` beserta `=== LAPORAN QA ===`.

---

## 2. Spesifikasi Metadata & Frontmatter Presisi
- **Pasangan Slug**:
  - ID: `kenapa-landing-page-iklan-lambat-di-hp`
  - EN: `why-ad-landing-pages-load-slowly-on-mobile`
- **Presisi Karakter Judul (`title`, wajib 50–62 karakter)**:
  - ID (`53 karakter`): `"Kenapa Landing Page Iklan Lambat di Browser Instagram"`
  - EN (`55 karakter`): `"Why Ad Landing Pages Load Slowly in Social App Browsers"`
- **Presisi Karakter Deskripsi (`description`, wajib 150–160 karakter, diakhiri titik)**:
  - ID (`153 karakter`): `"Penyebab halaman tujuan iklan media sosial gagal terbuka cepat di layar HP calon pelanggan serta cara merancang landing page ringan di Tangerang Selatan."`
  - EN (`153 karakter`): `"Learn why social media ad landing pages stall inside mobile in-app browsers and how businesses in South Tangerang can keep pages fast for WhatsApp leads."`
- **Klaster & Kata Kunci**:
  - `cluster`: `website-dan-performa`
  - `primaryKeyword`:
    - ID: `"kenapa landing page iklan lambat di hp"`
    - EN: `"why ad landing pages load slowly on mobile"`
  - `author`: `"chesta"`
  - `datePublished` & `dateModified`: `"2026-11-09"`
- **Tautan Internal (`links`)**:
  - `service`: `/layanan/pembuatan-website` (ID) | `/en/services/web-development` (EN)
  - `area`: `/area/bsd` (ID) | `/en/areas/bsd` (EN)
  - `posts`:
    - ID: `/blog/landing-page-untuk-iklan-bisnis` & `/blog/biaya-pembuatan-website-bisnis-tangerang-selatan`
    - EN: `/en/blog/landing-pages-for-business-ads` & `/en/blog/business-website-development-cost-south-tangerang`
  - `caseStudy`: Dihilangkan karena dikosongkan pada input.
- **Sumber Resmi (`sources`)**:
  1. `https://web.dev/articles/vitals` — Dokumentasi resmi web.dev tentang metrik Core Web Vitals dan pengalaman pengguna di perangkat nyata.
  2. `https://developers.google.com/search/docs/fundamentals/seo-starter-guide` — Panduan dasar SEO Google Search Central tentang cara mesin pencari memahami halaman web.
  3. `https://developers.facebook.com/docs/whatsapp/` — Dokumentasi resmi Meta for Developers mengenai integrasi dan aturan platform bisnis WhatsApp.

---

## 3. Struktur Konten & Kepatuhan Aturan Penulisan
1. **Judul H1 & Paragraf Pembuka (Lead)**:
   - Membuka langsung dengan situasi nyata pemilik usaha yang melihat ratusan klik di laporan iklan tetapi chat WhatsApp tetap sepi karena layar putih di browser dalam aplikasi, disertai maksimal 3 tautan internal alami.
2. **Poin Utama (`## Poin utama` / `## Key takeaways`)**:
   - 3 kalimat utuh yang identik 100% dengan `keyPoints` di frontmatter.
3. **9 Bagian H2 dengan Paragraf AEO Mandiri (40–60 Kata Tepat di Bawah Setiap H2)**:
   - **H2 1**: Mengapa jumlah klik di laporan iklan jauh berbeda dengan jumlah chat yang masuk? (Dilengkapi simulasi angka ilustrasi menggunakan kata *"misalnya"*).
   - **H2 2**: Apa yang sebenarnya terjadi saat pelanggan mengeklik link iklan dari dalam aplikasi medsos? (Membedah cara kerja *in-app browser* di ponsel dengan sinyal seluler nyata).
   - **H2 3**: Mengapa halaman yang terasa cepat di laptop kantor bisa macet di ponsel pelanggan? (Merujuk dokumentasi resmi `web.dev/articles/vitals` dengan catatan cek dokumentasi resmi untuk angka dan ketentuan terbaru).
   - **H2 4**: Apa bedanya halaman penuh hiasan animasi dengan halaman yang dirancang untuk konversi HP? (Memuat **Tabel Perbandingan Markdown 5 baris** antara Halaman Brosur Berat vs Halaman Konversi Ringan).
   - **H2 5**: Mengapa menempel poster gambar utuh sebagai pengganti teks halaman merugikan iklanmu? (Memuat **Kotak Peringatan** `> **Peringatan:**` / `> **Warning:**` tentang risiko layar putih saat memuat gambar besar di sinyal seluler dan kegagalan mesin pencari membaca isi penawaran mengacu pada `developers.google.com/search/docs/fundamentals/seo-starter-guide`, ditambah **Contoh skenario:** / **Scenario example:** klinik perawatan kulit dan kecantikan di BSD, Tangerang Selatan).
   - **H2 6**: Elemen apa saja yang boleh dan tidak boleh dipasang di layar pertama halaman iklan?
   - **H2 7**: Bagaimana cara memastikan tombol WhatsApp tetap nyaman diklik dengan satu jempol? (Merujuk dokumentasi resmi `developers.facebook.com/docs/whatsapp/` dengan catatan cek dokumentasi resmi).
   - **H2 8**: Bagaimana langkah menguji kecepatan halaman iklanmu sendiri lewat ponsel hari ini? (Memuat **Daftar 6 Langkah Bernomor** praktis).
   - **H2 9**: Bagaimana membangun atau merapikan landing page iklan mulai dari Rp1.200.000? (Menjelaskan pengujian di kondisi ponsel nyata lewat sesi audit gratis 30 menit bersama Chesta Azka — menulis kode sejak 2021 — dan Zeeshan, pembuatan website mulai Rp1.200.000, DP 50% di awal dan pelunasan 50% sebelum serah terima, kebijakan tanpa diskon di depan dengan penyesuaian ruang lingkup halaman, serta kepemilikan penuh domain dan hosting atas nama klien).
4. **Kesimpulan (`## Kesimpulan` / `## Conclusion`) & `## FAQ`**:
   - Kesimpulan 3–5 kalimat lugas berisi langkah pertama hari ini tanpa keluar biaya.
   - 5 tanya-jawab konkret yang identik dengan frontmatter `faq`.

---

## 4. Integrasi ke Aplikasi & Verifikasi Kualitas
1. Menambahkan data artikel ke `/src/data/blog-posts-45-id.ts` dan `/src/data/blog-posts-45-en.ts`.
2. Mendaftarkan pasangan slug di `/src/data/blog-slugs.ts`, klaster `website-dan-performa` di `/src/data/clusters.ts`, spesifikasi sampul unik (`three-gauges` varian `B`) di `/src/data/blog-cover-specs.ts`, dan menggabungkannya di `/src/data/blog-posts.ts`.
3. Menjalankan `compile_applet` dan `lint_applet` untuk memastikan seluruh validasi lulus 100%, lalu menampilkan seluruh naskah Markdown dwibahasa dan `=== LAPORAN QA ===` di chat.
