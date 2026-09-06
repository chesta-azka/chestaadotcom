const fs = require('fs');
let serverStr = fs.readFileSync('server.ts', 'utf8');

if (!serverStr.includes('app.get("/api/search"')) {
  const searchRoute = `
// API: Trending Insights
app.get("/api/search", async (req, res) => {
  const fallbackTrends = [
    "Website cepat dengan Next.js terbukti meningkatkan konversi penjualan.",
    "UMKM modern beralih ke direct chat WhatsApp untuk closing lebih cepat.",
    "Desain bersih dan minimalis meningkatkan rasa percaya calon pembeli."
  ];

  if (!genAI) {
    return res.json({ trends: fallbackTrends });
  }

  try {
    const prompt = 'Berikan 3 wawasan (insight) atau tren teknologi digital terbaru yang sangat relevan untuk UMKM di Indonesia (seputar adopsi AI, Web, Digital Marketing). Kembalikan HANYA JSON array of strings (kalimat singkat max 15 kata per string). Jangan ada format markdown.';
    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });
    
    let text = response.text || "";
    if (text.includes("\`\`\`json")) {
      text = text.replace(/\`\`\`json/g, "").replace(/\`\`\`/g, "").trim();
    } else if (text.includes("\`\`\`")) {
      text = text.replace(/\`\`\`/g, "").trim();
    }
    
    let trends = [];
    try {
      trends = JSON.parse(text);
      if (!Array.isArray(trends)) trends = fallbackTrends;
    } catch (e) {
      trends = fallbackTrends;
    }
    
    res.json({ trends });
  } catch (error) {
    console.error("Failed to generate trends:", error);
    res.json({ trends: fallbackTrends });
  }
});
`;

  serverStr = serverStr.replace('// 4. API: SEO Audit Tool', searchRoute + '\n// 4. API: SEO Audit Tool');
  fs.writeFileSync('server.ts', serverStr);
  console.log('Added /api/search route');
} else {
  console.log('/api/search route already exists');
}
