const fs = require('fs');
let server = fs.readFileSync('server.ts', 'utf-8');

// 1. Update the prompt to be stricter
const oldPrompt = "const prompt = 'Berikan 3 wawasan (insight) atau tren teknologi digital terbaru yang sangat relevan untuk UMKM di Indonesia (seputar adopsi AI, Web, Digital Marketing, atau SEO). Gunakan Google Search. Kembalikan HARUS berformat JSON array of objects: [{ \"title\": \"Judul Insight\", \"description\": \"Deskripsi singkat 2 kalimat\", \"link\": \"URL referensi/berita\", \"date\": \"Tanggal atau Bulan Tahun\" }]';";
const newPrompt = "const prompt = 'Berikan 3 wawasan (insight) atau tren teknologi digital terbaru yang sangat relevan untuk UMKM di Indonesia (seputar adopsi AI, Web, Digital Marketing, atau SEO). Gunakan Google Search. Kembalikan HARUS berformat JSON array of objects: [{ \"title\": \"Judul Insight\", \"description\": \"Deskripsi singkat 2 kalimat\", \"link\": \"URL referensi/berita\", \"date\": \"Tanggal atau Bulan Tahun\" }]. PENTING: JANGAN sertakan teks pengantar atau penutup (seperti \"Berikut adalah...\"). HANYA KEMBALIKAN OUTPUT JSON MURNI.';";

server = server.replace(oldPrompt, newPrompt);

// 2. Update the parsing logic to extract the array using regex
const parseTarget = `    try {
      let responseText = response.text || "";
      // Strip markdown json blocks if present
      if (responseText.includes("\`\`\`json")) {
        responseText = responseText.replace(/\\`\\`\\`json/g, "").replace(/\\`\\`\\`/g, "").trim();
      } else if (responseText.includes("\`\`\`")) {
        responseText = responseText.replace(/\\`\\`\\`/g, "").trim();
      }
      insights = JSON.parse(responseText);
    } catch(e) {`;

const parseReplacement = `    try {
      let responseText = response.text || "";
      // Extract the JSON array using regex to ignore any conversational text like "Berikut adalah..."
      const match = responseText.match(/\\[\\s*\\{[\\s\\S]*\\}\\s*\\]/);
      if (match) {
        insights = JSON.parse(match[0]);
      } else {
        // Fallback: strip markdown and try parsing directly
        responseText = responseText.replace(/\\x60\\x60\\x60json/g, "").replace(/\\x60\\x60\\x60/g, "").trim();
        insights = JSON.parse(responseText);
      }
    } catch(e) {`;

// Because the original parsing logic might have been escaped differently in the file, let's just do a safer replace using index bounds.
