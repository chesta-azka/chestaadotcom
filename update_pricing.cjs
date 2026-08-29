const fs = require('fs');
let serverTs = fs.readFileSync('server.ts', 'utf-8');

const targetStr = `Data harga layanan yang FIX dan WAJIB kamu ikuti:
- Custom Website (Enterprise/Premium): Mulai dari Rp 15.000.000 (Tergantung kompleksitas fitur).
- Paket UMKM Starter: Rp 5.000.000 (Cocok untuk company profile, SEO Basic).
- E-Commerce Web: Mulai dari Rp 10.000.000 (Payment gateway, katalog produk).
- Integrasi Agentic AI: Mulai dari Rp 8.000.000 (Custom AI chatbot, data internal).`;

const replaceStr = `Data harga layanan yang FIX dan WAJIB kamu ikuti (PENTING: Selalu tekankan bahwa harga kita SANGAT TERJANGKAU dan mulai dari Rp 2.500.000):
- Paket Basic / Landing Page: Mulai dari Rp 2.500.000 (Cocok untuk profil bisnis awal yang elegan dan responsif).
- Paket UMKM Starter: Mulai dari Rp 5.000.000 (Cocok untuk company profile, SEO Basic).
- E-Commerce Web: Mulai dari Rp 10.000.000 (Payment gateway, katalog produk).
- Custom Website (Enterprise/Premium) & Agentic AI: Mulai dari Rp 15.000.000 (Tergantung kompleksitas fitur).`;

if (serverTs.includes(targetStr)) {
  serverTs = serverTs.replace(targetStr, replaceStr);
  fs.writeFileSync('server.ts', serverTs);
  console.log("Updated pricing in server.ts");
} else {
  console.log("Target string not found in server.ts");
}
