# Rencana Perbaikan: Mengatasi ERR_TOO_MANY_REDIRECTS (chestaa.com Non-WWW)

Berdasarkan hasil diagnosa live `curl` yang membuktikan adanya loop pengalihan antara Vercel Edge (`chestaa.com` ➔ `www`) dan konfigurasi aplikasi (`www` ➔ `chestaa.com`), berikut adalah langkah perbaikan terpadu:

---

### 1. Langkah Wajib di Dashboard Vercel (Memutus Loop)
Loop terjadi karena di Vercel Dashboard, domain `chestaa.com` saat ini di-set untuk me-*redirect* ke `www.chestaa.com`. Lakukan langkah berikut di dashboard Vercel Anda:

1. Buka [Dashboard Vercel](https://vercel.com) dan pilih project Anda.
2. Masuk ke **Settings** ➔ **Domains**.
3. Di daftar domain:
   - Cari **`chestaa.com`** ➔ Klik **Edit**.
   - Hapus / nonaktifkan pengalihan (jadikan `chestaa.com` sebagai **Production Domain / Primary**, tanpa panah redirect).
   - Cari **`www.chestaa.com`** ➔ Klik **Edit**.
   - Centang / pilih **Redirect to:** `chestaa.com` dengan status **308 Permanent** (atau 301).
4. Klik **Save**.

---

### 2. Penyesuaian Kode pada `vercel.json`
Untuk mencegah tabrakan aturan di masa mendatang dan memastikan arsitektur cloud mengikuti standar resmi Vercel:
- Menyerahkan pengalihan domain (`www.chestaa.com` ➔ `chestaa.com`) ke Vercel Edge Domain Router yang jauh lebih cepat di layer DNS/CDN.
- Membersihkan aturan manual `has: host: www.chestaa.com` di `vercel.json` agar tidak bentrok dengan Edge Router.
- Memastikan aturan root `/` mengarah langsung ke canonical `/id`:
  ```json
  {
    "source": "/",
    "destination": "/id",
    "permanent": true
  }
  ```

---

### 3. Verifikasi Akhir
- Menjalankan `npm run lint` dan `npm run discovery:check` untuk memastikan seluruh rute sitemap, robots.txt, dan canonical link tetap 100% konsisten.
- Menguji via `curl -ILs https://chestaa.com` dan `curl -ILs https://www.chestaa.com` untuk memvalidasi bahwa loop hilang dan halaman terbuka normal.
