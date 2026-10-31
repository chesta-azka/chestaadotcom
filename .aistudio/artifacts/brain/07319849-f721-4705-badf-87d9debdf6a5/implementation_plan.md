# Rencana Implementasi: Sticky Header Permanen, Cepat, dan Responsif

Sesuai preferensi yang Anda pilih, kami akan memperbarui perilaku navbar header agar **selalu menempel di bagian atas layar (always sticky)** dengan transisi yang instan, ringan, dan sangat responsif:

1. **Menghilangkan Perilaku Sembunyi / Auto-Hide**
   - Menghapus logika pergeseran `-translate-y-24` yang sebelumnya membuat header menghilang saat scroll ke bawah dan lambat muncul kembali.
   - Header akan selalu terlihat (`translate-y-0`) di posisi atas layar sepanjang pengguna membaca atau menjelajahi halaman.

2. **Transisi Instan dan Ringan (Ultra-Fast & Snappy)**
   - Menggunakan ambang batas scroll yang lebih cepat dan responsif (deteksi instan pada `scrollY > 12px`).
   - Mempersingkat durasi transisi visual (dari 300ms menjadi 150ms dengan kurva `cubic-bezier(0.16, 1, 0.3, 1)`) untuk adaptasi padding, skala glass-pill (`scale-[0.99]`), dan bayangan halus.
   - Mengoptimalkan eksekusi rendering agar 100% menggunakan properti terakselerasi GPU (`transform`, `opacity`) tanpa memicu reflow atau layout recalculation.

3. **Verifikasi Kinerja & Core Web Vitals**
   - Menjalankan `npm run lint` untuk verifikasi TypeScript dan validasi kode.
   - Menjalankan `npm run cls:check` untuk memastikan Cumulative Layout Shift (CLS) tetap `0.0000`.
   - Menguji kompilasi produksi via `compile_applet`.
