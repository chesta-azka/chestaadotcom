# CTR Playbook — Title & Meta Description Formula (CHESTAADOTCOM)

Dokumen ini mendefinisikan standar penulisan `<title>` (`seoTitle`) dan `<meta name="description">` (`metaDescription`) untuk seluruh halaman layanan, area lokal, studi kasus, klaster topik, dan artikel blog di **chestaa.com** (`/id/...` dan `/en/...`). Aturan ini ditegakkan secara otomatis melalui skrip quality gate `npm run content:lint` dan `npm run seo:audit`.

---

## 1. Formula Judul (`<title>` / `seoTitle`)

### Aturan Panjang Karakter
- **Wajib antara 50 hingga 62 karakter** (termasuk spasi dan akhiran merek ` | CHESTAADOTCOM`).
- Panjang ini mencegah pemotongan judul (*truncation* elipsis `...`) pada hasil pencarian seluler Google (SERP mobile) maupun desktop.

### Pola Struktur Judul
```text
[Frasa Kunci Utama] [Manfaat / Angka / Konteks Lokal] | CHESTAADOTCOM
```
1. **Frasa Kunci Utama di Depan**: Tempatkan kata kunci pencarian utama di 3–5 kata pertama agar langsung terbaca oleh mata pengguna saat memindai halaman hasil pencarian.
2. **Manfaat atau Angka Spesifik**: Tambahkan penguat nilai (misalnya `Konversi Tinggi`, `12 Langkah`, `Hemat Token`, `untuk Bisnis`).
3. **Akhiran Merek Konsisten**: Selalu diakhiri dengan ` | CHESTAADOTCOM` (16 karakter).

### Contoh Sesuai Standar (Lulus Lint)
- **ID (58 karakter)**: `Panduan Lengkap Cara Kerja Agentic AI | CHESTAADOTCOM` (53 karakter)
- **ID (59 karakter)**: `Landing Page Iklan Meta & Google Konversi | CHESTAADOTCOM` (57 karakter)
- **ID (58 karakter)**: `Keamanan Website Bisnis Lokal: 12 Langkah | CHESTAADOTCOM` (57 karakter)
- **EN (59 karakter)**: `Complete Guide to How Agentic AI Works | CHESTAADOTCOM` (54 karakter)
- **EN (56 karakter)**: `Local Business Website Security: 12 Steps | CHESTAADOTCOM` (57 karakter)

---

## 2. Formula Deskripsi (`<meta name="description">`)

### Aturan Panjang Karakter
- **Wajib antara 140 hingga 160 karakter** (termasuk spasi dan tanda baca).

### Pola Struktur Deskripsi
```text
[Manfaat Utama / Jawaban Langsung] + [Kualifikasi Lokal / Jenis Bisnis] + [Soft CTA].
```
1. **Manfaat Utama di Kalimat Pertama**: Jelaskan masalah nyata yang diselesaikan halaman tersebut (misalnya memangkas klik iklan yang terbuang, mengamankan data pelanggan sesuai UU PDP, atau mengotomasi reservasi klinik).
2. **Kualifikasi Lokal & Konteks**: Sebutkan wilayah layanan nyata bila relevan (`BSD`, `Tangerang Selatan`, `Pamulang`, `Jurang Mangu`, `Lebak Bulus`, atau `Jabodetabek`).
3. **Soft CTA (Ajakan Bertindak Halus)**: Tutup dengan ajakan singkat yang tidak agresif, misalnya `Konsultasi gratis.`, `Cek panduannya.`, `Pelajari selengkapnya.`, atau `Read the full guide.`.

### Contoh Sesuai Standar (Lulus Lint)
- **ID (150 karakter)**:
  `Pelajari cara kerja agentic AI untuk bisnis di Tangerang Selatan: siklus ReAct, pemanggilan tool, memori, dan contoh nyata di BSD. Konsultasi gratis.`
- **EN (153 karakter)**:
  `Learn how agentic AI works for businesses in South Tangerang: ReAct loops, tool calling, memory layers, and a real BSD clinic scenario. Read the guide.`

---

## 3. Larangan Keras (Anti-Clickbait & Kepatuhan)
- **Dilarang menjanjikan peringkat #1**: Tidak boleh menggunakan klaim seperti *"Pasti Ranking 1 Google"* atau *"Jaminan Halaman Pertama"*.
- **Dilarang menggunakan angka atau statistik karangan**: Hanya gunakan angka struktural dari isi artikel (seperti *"12 Langkah"*, *"3 Metrik Core Web Vitals"*, atau harga resmi *"Mulai Rp1.200.000"*).
- **Dilarang menggunakan huruf kapital semua (ALL CAPS)** kecuali singkatan resmi (`AI`, `SEO`, `GEO`, `AEO`, `API`, `LCP`, `INP`, `CLS`, `BSD`, `UU PDP`, `CHESTAADOTCOM`).
