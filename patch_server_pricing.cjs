const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf-8');

if (!code.includes("import { getFirestore }")) {
  code = code.replace(
    "import { getAuth } from 'firebase-admin/auth';",
    "import { getAuth } from 'firebase-admin/auth';\nimport { getFirestore } from 'firebase-admin/firestore';"
  );
}

const targetApiChatStart = 'app.post("/api/chat", async (req, res) => {';
const targetApiChatBody = `  const { messages, pagePath, pageTitle, systemContext } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Messages array is required." });
  }

  // Set headers for plain text streaming
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Transfer-Encoding', 'chunked');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    const systemPrompt = \`Anda adalah Konsultan AI Eksklusif dari CHESTADOTCOM. Jawab dengan ramah, cerdas, dan natural. Saat ini user sedang berada di halaman "\${pageTitle || 'Beranda'}" (Path: \${pagePath || '/'}). Gunakan konteks halaman ini untuk memberikan jawaban.

\${systemContext ? 'Konteks Tambahan (Wajib Diperhatikan):\\n' + systemContext : ''}

Data harga layanan yang FIX dan WAJIB kamu ikuti (PENTING: Selalu tekankan bahwa harga kita SANGAT TERJANGKAU dan mulai dari Rp 2.500.000):
- Paket Basic / Landing Page: Mulai dari Rp 2.500.000 (Cocok untuk profil bisnis awal yang elegan dan responsif).
- Paket UMKM Starter: Mulai dari Rp 5.000.000 (Cocok untuk company profile, SEO Basic).
- E-Commerce Web: Mulai dari Rp 10.000.000 (Payment gateway, katalog produk).
- Custom Website (Enterprise/Premium) & Agentic AI: Mulai dari Rp 15.000.000 (Tergantung kompleksitas fitur).

PENTING:
1. Jika ditanya tentang harga terkini pasar, tren, atau layanan kompetitor, gunakan Google Search untuk memverifikasi.
2. Jika memberikan informasi harga atau bisnis, Anda WAJIB menyertakan rujukan di akhir kalimat (misal: [Lihat Detail Harga](/services) atau [Konsultasi WhatsApp](https://wa.me/6282125447232)).
3. Jika Anda ingin memberikan saran pertanyaan lanjutan (opsi) kepada user, JANGAN menyuruh mereka mengetik angka. Sebagai gantinya, WAJIB sertakan opsi tersebut di baris paling bawah dari jawaban Anda dengan format persis seperti ini (harus menggunakan tag <opsi>):
<opsi>Pertanyaan atau pilihan 1</opsi>
<opsi>Pertanyaan atau pilihan 2</opsi>
\`;`;

const newApiChatBody = `  const { messages, pagePath, pageTitle, systemContext } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Messages array is required." });
  }

  // Set headers for plain text streaming
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Transfer-Encoding', 'chunked');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    // Fetch dynamic pricing from Firestore
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

code = code.replace(targetApiChatBody, newApiChatBody);
fs.writeFileSync('server.ts', code);
