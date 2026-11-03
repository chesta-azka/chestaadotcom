# Rencana Implementasi: Linear Regression Trend Line, Desain UI Anti-AI Slop & Optimasi Performa

Berdasarkan preferensi yang Anda konfirmasi, berikut adalah rencana implementasi terperinci:

---

### 1. Toggle Linear Regression Trend Line pada `LineChart` (`AiAuditAdminPage`)
- **File Target**: `src/app/admin/ai-audit/page.tsx`
- **Kalkulasi Statistik Regresi Linear ($y = mx + b$ & $R^2$)**:
  - Menghitung persamaan regresi linear *least-squares* ($y = mx + b$) di sepanjang seri waktu `velocityData` ($x = 0 \dots n-1$).
  - Menghitung gradien pertumbuhan harian ($m$, misal `+0.93 leads/hari`), titik prediksi akhir, serta koefisien determinasi ($R^2$) untuk mengukur kekuatan tren jangka panjang.
  - Menyisipkan nilai `regressionLeads` pada setiap titik data di `enrichedVelocityData`.
- **Kontrol Toggle & Visualisasi Grafik**:
  - Menambahkan tombol kontrol interaktif **`Tren Regresi Linear`** (`showRegression` toggle) pada grup kontrol grafik.
  - Saat diaktifkan, menggambar `<Line />` regresi linear berwarna emas amber (`#f59e0b`, garis putus-putus `strokeDasharray="8 4"`, `strokeWidth={2.5}`) di atas `LineChart` beserta ringkasan kemiringan tren (`+X.XX leads/hari · R² = 0.XX`) di bar ringkasan dan di dalam *Tooltip*.

---

### 2. Pembaruan UI Anti-AI Slop (Zero-Pill Discipline & Editorial Typography)
- **File Target**: `src/app/admin/ai-audit/page.tsx` & `src/components/organisms/AgentSimulationSection.tsx`
- **Pembersihan Jargon Palsu & Dekorasi Berlebihan**:
  - Menghapus string pseudo-teknis palsu seperti `CHESTAA_SECURE_TERMINAL // v4.9.2_ENTERPRISE` dan badge `LIVE TELEMETRY`.
  - Menghapus seluruh penggunaan ikon dekoratif `Sparkles` dan menggantinya dengan tata letak tipografi bersih.
- **Disiplin Zero-Pill untuk Metadata Statis**:
  - Mengubah seluruh metadata statis (periode hari `H-6` s/d `Hari Ini`, ringkasan statistik `7D MA`, `Peak Growth`, `Max Pipeline`, `R²`, dan tier lead) dari kotak kapsul berwarna (*pill badges*) menjadi **teks tipografi editorial bersih dengan pemisah `·` dan `/`**.
  - Mempertahankan bentuk tombol *segmented control* yang rapi hanya untuk elemen yang benar-benar interaktif (tombol filter metrik, tombol toggle regresi, tombol zoom, dan pemilih status).

---

### 3. Animasi Responsif 150ms & Akselerasi Performa
- **Animasi GPU-Accelerated (`transform` & `opacity`)**:
  - Menambahkan animasi masuk *staggered* cepat (`150ms–220ms`, kurva `cubic-bezier(0.16, 1, 0.3, 1)`) pada kartu metrik, blok grafik, baris tabel, dan transisi kemunculan garis regresi linear.
- **Optimasi Performa React & Render**:
  - Memastikan seluruh perhitungan statistik (`movingAverageStats`, `regressionStats`, `enrichedVelocityData`, `filteredLeads`) di-*memoize* dengan `useMemo` dan handler interaksi dibungkus `useCallback` agar tidak memicu *re-render* berulang saat menggeser `<Brush />` atau mengetik catatan di Drawer.

---

### 4. Pengujian & Verifikasi Akhir
- Menjalankan `npm run lint` dan `compile_applet` untuk memvalidasi tipe TypeScript dan memperbarui bundel produksi.
- Menjalankan `npm run cls:check` untuk memastikan performa tetap kencang (CLS `0.0000` dan ukuran bundel di bawah batas target).
