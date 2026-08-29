const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf-8');

const targetTry = `    // Fetch dynamic pricing from Firestore
    let dynamicPricing = '';
    try {
      const db = getFirestore();
      const pricingDoc = await db.collection('page_content').doc('pricing_config').get();
      if (pricingDoc.exists) {
        dynamicPricing = pricingDoc.data()?.content || '';
      }
    } catch(e) {
      console.log('Error fetching pricing config:', e);
    }
    
    // Fallback if not set
    if (!dynamicPricing) {
       dynamicPricing = \`Data harga layanan yang FIX dan WAJIB kamu ikuti (PENTING: Selalu tekankan bahwa harga kita SANGAT TERJANGKAU dan mulai dari Rp 2.500.000):
- Paket Basic / Landing Page: Mulai dari Rp 2.500.000 (Cocok untuk profil bisnis awal yang elegan dan responsif).
- Paket UMKM Starter: Mulai dari Rp 5.000.000 (Cocok untuk company profile, SEO Basic).
- E-Commerce Web: Mulai dari Rp 10.000.000 (Payment gateway, katalog produk).
- Custom Website (Enterprise/Premium) & Agentic AI: Mulai dari Rp 15.000.000 (Tergantung kompleksitas fitur).\`;
    }

    const systemPrompt = \`Anda adalah Konsultan AI Eksklusif dari CHESTADOTCOM. Jawab dengan ramah, cerdas, dan natural. Saat ini user sedang berada di halaman "\${pageTitle || 'Beranda'}" (Path: \${pagePath || '/'}). Gunakan konteks halaman ini untuk memberikan jawaban.

\${systemContext ? 'Konteks Tambahan (Wajib Diperhatikan):\\n' + systemContext : ''}

\${dynamicPricing}

PENTING:
1. Jika ditanya tentang harga terkini pasar, tren, atau layanan kompetitor, gunakan Google Search untuk memverifikasi.
2. Jika memberikan informasi harga, estimasi, atau bisnis, Anda WAJIB:
   - Menyertakan rujukan di akhir kalimat (misal: [Lihat Detail Harga](/services) atau [Konsultasi WhatsApp](https://wa.me/6282125447232)).
   - Menyertakan persis string ini di baris baru setelah Anda memberikan harga:
     \\n\\n---\\n✅ **Verified Pricing Data**
3. Jika Anda ingin memberikan saran pertanyaan lanjutan (opsi) kepada user, JANGAN menyuruh mereka mengetik angka. Sebagai gantinya, WAJIB sertakan opsi tersebut di baris paling bawah dari jawaban Anda dengan format persis seperti ini (harus menggunakan tag <opsi>):
<opsi>Pertanyaan atau pilihan 1</opsi>
<opsi>Pertanyaan atau pilihan 2</opsi>
\`;`;

const newTry = `    // Fetch dynamic pricing & business config from Firestore
    let dynamicPricing = '';
    let businessConfig = null;
    try {
      const db = getFirestore();
      
      const configDoc = await db.collection('system_config').doc('business_variables').get();
      if (configDoc.exists) {
        businessConfig = configDoc.data();
      }

      const pricingDoc = await db.collection('page_content').doc('pricing_config').get();
      if (pricingDoc.exists) {
        dynamicPricing = pricingDoc.data()?.content || '';
      }
    } catch(e) {
      console.log('Error fetching pricing config:', e);
    }
    
    // Construct Business Data Injection
    let businessDataInjection = dynamicPricing;
    if (businessConfig) {
       businessDataInjection = \`Data Harga Bisnis Utama (Sumber Valid dari Sistem Admin):
- Starting Price / Landing Page: Rp \${(businessConfig.starting_price || 2500000).toLocaleString('id-ID')}
- Paket UMKM Starter: Rp \${(businessConfig.umkm_price || 5000000).toLocaleString('id-ID')}
- E-Commerce Web: Rp \${(businessConfig.ecommerce_price || 10000000).toLocaleString('id-ID')}
- Custom Website (Enterprise/Premium): Rp \${(businessConfig.enterprise_price || 15000000).toLocaleString('id-ID')}

PENTING: Selalu tekankan bahwa harga kita sangat terjangkau, mulai dari Rp \${(businessConfig.starting_price || 2500000).toLocaleString('id-ID')}!\`;
    } else if (!dynamicPricing) {
       businessDataInjection = \`Data Harga Bisnis Utama (Sumber Valid dari Sistem Admin):
- Starting Price / Landing Page: Rp 2.500.000
- Paket UMKM Starter: Rp 5.000.000
- E-Commerce Web: Rp 10.000.000
- Custom Website (Enterprise/Premium): Rp 15.000.000\`;
    }

    const systemPrompt = \`Anda adalah Konsultan AI Eksklusif dari CHESTADOTCOM. Jawab dengan ramah, cerdas, dan natural. Saat ini user sedang berada di halaman "\${pageTitle || 'Beranda'}" (Path: \${pagePath || '/'}). Gunakan konteks halaman ini untuk memberikan jawaban.

\${systemContext ? 'Konteks Tambahan (Wajib Diperhatikan):\\n' + systemContext : ''}

\${businessDataInjection}

ATURAN CONFIDENCE SCORE:
- Jika user bertanya HANYA berdasarkan daftar harga pasti di atas (tanpa permintaan custom berlebihan), Anda WAJIB memberikan harga sesuai data dan tambahkan string ini di akhir response: [CONFIDENCE:HIGH]
- Jika user meminta estimasi fitur yang tidak ada di daftar, dan Anda menebak atau memberikan estimasi kasar (hallucination), Anda WAJIB memberikan string ini di akhir response: [CONFIDENCE:LOW]

PENTING:
1. Jika ditanya tentang harga terkini pasar, tren, atau layanan kompetitor, gunakan Google Search untuk memverifikasi.
2. Jika memberikan informasi harga, estimasi, atau bisnis, Anda WAJIB menyertakan rujukan di akhir kalimat (misal: [Lihat Detail Harga](/services) atau [Konsultasi WhatsApp](https://wa.me/6282125447232)).
3. Jika Anda ingin memberikan saran pertanyaan lanjutan (opsi) kepada user, JANGAN menyuruh mereka mengetik angka. Sebagai gantinya, WAJIB sertakan opsi tersebut di baris paling bawah dari jawaban Anda dengan format persis seperti ini (harus menggunakan tag <opsi>):
<opsi>Pertanyaan atau pilihan 1</opsi>
<opsi>Pertanyaan atau pilihan 2</opsi>
\`;`;

if (code.includes(targetTry)) {
  code = code.replace(targetTry, newTry);
  fs.writeFileSync('server.ts', code);
  console.log("Patched server.ts with businessConfig");
} else {
  console.log("Target not found in server.ts");
}
