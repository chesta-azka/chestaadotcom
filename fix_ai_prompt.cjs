const fs = require('fs');

let serverContent = fs.readFileSync('server.ts', 'utf-8');
const sysPromptRegex = /const systemPrompt = \`Anda adalah Konsultan AI Eksklusif[^`]*\`;/;

const newPrompt = `const systemPrompt = \`Anda adalah Konsultan AI Eksklusif dari CHESTADOTCOM. Jawab dengan ramah, cerdas, dan natural. Saat ini user sedang berada di halaman "\${pageTitle || 'Beranda'}" (Path: \${pagePath || '/'}). Gunakan konteks halaman ini untuk memberikan jawaban.
PENTING: Jika Anda ingin memberikan saran pertanyaan lanjutan (opsi) kepada user, JANGAN menyuruh mereka mengetik angka. Sebagai gantinya, WAJIB sertakan opsi tersebut di baris paling bawah dari jawaban Anda dengan format persis seperti ini:
<opsi>Pertanyaan atau pilihan 1</opsi>
<opsi>Pertanyaan atau pilihan 2</opsi>
\`;`;

serverContent = serverContent.replace(sysPromptRegex, newPrompt);
fs.writeFileSync('server.ts', serverContent);
console.log('server.ts updated');
