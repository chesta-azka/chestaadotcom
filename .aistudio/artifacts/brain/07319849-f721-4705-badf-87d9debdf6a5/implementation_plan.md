# Rencana Implementasi: Pembaruan Header/Hamburger & Analitik LineChart Interaktif

Berdasarkan pilihan yang Anda konfirmasi, berikut adalah rencana implementasi terperinci:

---

### 1. Pembersihan Total Tombol WA di Header & Bar Atas Menu Overlay + Peningkatan Tombol Hamburger/X
- **Akar Masalah Sebelumnya**: Saat menu dibuka, komponen `MenuOverlayPanel.tsx` me-render ulang bar kapsul atas (`Floating Glass Pill Bar`) di dalam `<dialog>` yang ternyata masih menyimpan tombol ungu *"Konsultasi gratis"* tepat di sebelah tombol tutup (`X`), sehingga menghalangi klik untuk menutup menu.
- **Solusi**:
  - Menghapus elemen tombol WhatsApp (`<a href={whatsappUrl}>...</a>`) dari bar kapsul atas di `src/components/organisms/MenuOverlayPanel.tsx` (baris 393–405) sehingga 100% sinkron dengan `Header.tsx`.
  - Mempertegas visual tombol **Hamburger / Close (X)** di `Header.tsx` dan `MenuOverlayPanel.tsx` dengan permukaan tombol yang jelas (border halus `border-[rgba(106,63,208,0.18)]`, latar `bg-[#F6F3FF]/80 hover:bg-[#EDE7FF]`, area sentuh 44×44px penuh yang bebas hambatan, dan transisi 120ms).

---

### 2. Garis Referensi Otomatis Fase Pertumbuhan Puncak (>20% di Atas 7-Day Moving Average)
- **File Target**: `src/app/admin/ai-audit/page.tsx`
- **Logika Kalkulasi**:
  - Menghitung **7-Day Moving Average (7D MA)** dari kecepatan lead (`leads`) di sepanjang data grafik.
  - Menentukan ambang batas pertumbuhan puncak: **`Threshold = 7D MA × 1.20`** (+20% di atas rata-rata bergerak 7 hari).
  - Mengidentifikasi secara otomatis seluruh periode hari di mana `item.leads > Threshold`.
- **Visualisasi Recharts**:
  - Menggambar `ReferenceLine` vertikal otomatis dan `Label` berformat jelas (`⚡ +XX% vs 7D MA`) pada setiap periode yang melampaui ambang +20%.
  - Menambahkan garis referensi horizontal (`ReferenceLine`) opsional untuk nilai ambang +20% 7D MA agar admin dapat melihat batas pertumbuhan secara visual.

---

### 3. Fitur Brush / Zoom Rentang Tanggal & Filter Tabel Lead Dinamis
- **File Target**: `src/app/admin/ai-audit/page.tsx`
- **Interaktivitas Brush & Zoom**:
  - Mengintegrasikan komponen `<Brush />` dari Recharts di bagian bawah `LineChart` dengan tema warna kontras tinggi (`#c084fc` / `#0f172a`) serta kontrol indeks rentang (`brushRange: { startIndex, endIndex }`).
  - Menyediakan tombol cepat **Reset Zoom (Semua Hari)** dan indikator rentang aktif (misal: `Rentang Aktif: H-3 s/d Hari Ini`) di header grafik.
- **Filter Dinamis Tabel Lead**:
  - Menghubungkan setiap baris lead pada tabel *"Arsip Lead Masuk & Status Tracking"* ke periode hari yang bersesuaian (`dayBucket`: `H-6` s/d `Hari Ini` berdasarkan `timestamp` lead).
  - Saat admin menggeser *slider* `<Brush />` atau memilih rentang tanggal tertentu pada grafik, tabel di bawahnya otomatis memfilter daftar lead yang masuk dalam rentang hari tersebut, lengkap dengan badge jumlah lead terfilter dan tombol reset filter.

---

### 4. Verifikasi & Build
- Menjalankan `npm run lint` dan `compile_applet` untuk memastikan kompilasi produksi dan pre-rendered HTML di `dist/` ikut terbarui.
- Menjalankan `npm run cls:check` untuk memastikan performa dan CLS tetap `0.0000`.
