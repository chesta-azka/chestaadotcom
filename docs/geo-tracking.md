# GEO & AEO Tracking Harness — CHESTAADOTCOM

Dokumen ini menjelaskan protokol evaluasi bulanan untuk memantau visibilitas merek **CHESTAADOTCOM** (`chestaa.com`) di mesin pencari berbasis kecerdasan buatan (*Generative Engine Optimization* / GEO & *Answer Engine Optimization* / AEO).

---

## 1. Sumber Data Kueri Uji (`data/geo-queries.json`)
Daftar 30 kueri pengujian standar disimpan di `data/geo-queries.json`:
- **15 Kueri Bahasa Indonesia (`queries.id`)**: Mencakup intensi pencarian lokal (BSD City, Tangerang Selatan, Pamulang, Jurang Mangu, Lebak Bulus) dan intensi edukasi teknis di lima klaster topik (`agentic-ai`, `website-dan-performa`, `seo-lokal-dan-geo`, `otomasi-dan-software`, `biaya-dan-memilih-vendor`).
- **15 Kueri Bahasa Inggris (`queries.en`)**: Padanan 1:1 untuk audiens ekspatriat, perusahaan multinasional, dan pengambil keputusan berbahasa Inggris di Jabodetabek.

---

## 2. Lima Mesin Pencari AI Target
Setiap bulan (pada minggu pertama), jalankan pengujian kueri di lima platform berikut dalam mode sesi bersih (*incognito* / tanpa riwayat personalisasi):
1. **Google AI Overviews** (Google Search dengan lokasi disetel ke Tangerang Selatan / Jakarta)
2. **ChatGPT Search** (OpenAI Web Search aktif)
3. **Perplexity** (Mode Pro / Standard Web Search)
4. **Google Gemini** (Aplikasi web `gemini.google.com`)
5. **Bing Copilot** (Mode pencarian web aktif)

---

## 3. Cara Mencatat Hasil (`docs/geo-tracking-log-template.csv`)
Untuk setiap kueri yang diuji, catat baris baru pada berkas log CSV (`docs/geo-tracking-log-template.csv`) dengan kolom berikut:
- `test_date`: Tanggal pengujian dalam format `YYYY-MM-DD`.
- `query_id`: Kode identifikasi dari `data/geo-queries.json` (misalnya `geo-id-01`).
- `language`: `id` atau `en`.
- `engine`: Nama mesin pencari AI (`Google AI Overviews`, `ChatGPT Search`, `Perplexity`, `Gemini`, `Bing Copilot`).
- `brand_mentioned`: `yes` jika nama `CHESTAADOTCOM` atau `chestaa.com` disebut di dalam teks jawaban; `no` jika belum disebut.
- `citation_linked`: `yes` jika terdapat tautan sumber yang dapat diklik menuju domain `chestaa.com`; `no` jika tidak ada tautan.
- `cited_url`: URL spesifik di `chestaa.com` yang dikutip oleh mesin AI (kosongkan jika tidak ada).
- `answer_accuracy`: Skor `1` sampai `5` yang menilai ketepatan deskripsi AI terhadap layanan, harga mulai Rp1.200.000, atau isi teknis artikel kami.
- `action_notes`: Catatan tindak lanjut jika kueri belum mengutip halaman target (misalnya memperjelas *answer capsule* 40–60 kata di bawah H2 pertama atau menambah tabel perbandingan).

---

## 4. Siklus Perbaikan Berdasarkan Temuan GEO
1. **Jika halaman sudah masuk 10 besar organik tetapi belum dikutip AI Overviews / Perplexity**:
   - Periksa paragraf pertama tepat di bawah setiap `H2` (*answer capsule*). Pastikan panjangnya 40–60 kata dan langsung menjawab pertanyaan subjudul secara lugas sebelum masuk ke rincian teknis.
2. **Jika AI salah menyebutkan cakupan layanan atau area**:
   - Periksa keselarasan teks di `/llms.txt`, `/llms-full.txt`, serta node JSON-LD `Organization` dan `Service` pada halaman terkait.
3. **Jika artikel pesaing dikutip karena memiliki tabel ringkas**:
   - Tambahkan atau perbarui blok `table` dengan `caption` deskriptif dan kolom perbandingan yang jelas pada artikel klaster terkait, lalu perbarui tanggal `updatedAt` dan blok `changelog`.
