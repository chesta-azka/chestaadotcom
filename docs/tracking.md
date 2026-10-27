# UTM & Social Attribution Playbook — CHESTAADOTCOM

Dokumen ini menetapkan konvensi parameter UTM standar untuk seluruh tautan masuk dari saluran media sosial (**Instagram** dan **Google Business Profile**) serta menjelaskan bagaimana sistem canonical di **chestaa.com** menangani parameter pelacakan agar tidak menimbulkan duplikasi indeks di mesin pencari.

---

## 1. Standar Parameter UTM

Seluruh tautan kampanye organik maupun profil sosial wajib menggunakan huruf kecil (*lowercase*) dan tanda hubung (`-`), tanpa spasi atau garis bawah:

| Kanal & Penempatan | `utm_source` | `utm_medium` | `utm_campaign` | `utm_content` | Contoh URL Lengkap |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Instagram Bio** | `instagram` | `social-profile` | `bio-link` | `profile-cta` | `https://chestaa.com/id?utm_source=instagram&utm_medium=social-profile&utm_campaign=bio-link&utm_content=profile-cta` |
| **Instagram Story** | `instagram` | `social-story` | `topik-{cluster}` | `story-sticker` | `https://chestaa.com/id/blog/topik/agentic-ai?utm_source=instagram&utm_medium=social-story&utm_campaign=topik-agentic-ai&utm_content=story-sticker` |
| **Instagram Carousel** | `instagram` | `social-post` | `edukasi-{topik}` | `slide-cta` | `https://chestaa.com/id/blog/panduan-lengkap-cara-kerja-agentic-ai-untuk-pemula?utm_source=instagram&utm_medium=social-post&utm_campaign=edukasi-agentic-ai&utm_content=slide-cta` |
| **Instagram Reels** | `instagram` | `social-video` | `reels-{topik}` | `caption-link` | `https://chestaa.com/id/jasa/ai-agent?utm_source=instagram&utm_medium=social-video&utm_campaign=reels-ai-agent&utm_content=caption-link` |
| **Google Business Profile (Website Button)** | `google` | `organic-local` | `gbp-tangsel` | `website-button` | `https://chestaa.com/id?utm_source=google&utm_medium=organic-local&utm_campaign=gbp-tangsel&utm_content=website-button` |
| **Google Business Profile (Appointment / WA)** | `google` | `organic-local` | `gbp-tangsel` | `booking-link` | `https://chestaa.com/id/jasa/pembuatan-website/bsd-city?utm_source=google&utm_medium=organic-local&utm_campaign=gbp-tangsel&utm_content=booking-link` |
| **Google Business Profile (Post Update)** | `google` | `organic-local` | `gbp-update` | `post-cta` | `https://chestaa.com/id/blog/seo-lokal-bisnis-bsd-tangerang-selatan-google-maps?utm_source=google&utm_medium=organic-local&utm_campaign=gbp-update&utm_content=post-cta` |

---

## 2. Aturan Canonical URL (Zero Query Parameter Pollution)

Untuk mencegah Google mengindeks URL yang sama berkali-kali akibat tambahan `?utm_source=...` atau `?fbclid=...`:
1. **Server-Side (`src/lib/social-meta.ts`)**: Fungsi `normalizePathname(rawUrl)` dan `toCanonicalUrl(rawPathname)` secara otomatis membuang seluruh *query string* (`?...`) dan *hash fragment* (`#...`) sebelum membangun tag `<link rel="canonical">` dan `<meta property="og:url">`.
2. **Client-Side (`src/components/atoms/SEOMetadata.tsx`)**: Fungsi `stripUrlQueryAndHash()` memastikan bahwa meskipun pengunjung mendarat di URL dengan parameter UTM lengkap, elemen `<link rel="canonical" href="https://chestaa.com/..." />` di DOM selalu menunjuk ke URL bersih tanpa parameter kueri.
3. **Verifikasi Otomatis**: Skrip `npm run seo:audit` menguji bahwa setiap halaman memiliki tag canonical bersih tanpa tanda tanya (`?`).
