const fs = require('fs');

let server = fs.readFileSync('server.ts', 'utf-8');

const injectionPoint = '// Vite middleware for development';
const newRoute = `
// 3. API: AI Insights with Search Grounding
app.get("/api/ai/insights", async (req, res) => {
  if (!genAI) {
    return res.status(500).json({ error: "AI not initialized" });
  }
  try {
    const prompt = 'Berikan 3 wawasan (insight) atau tren teknologi digital terbaru yang sangat relevan untuk UMKM di Indonesia (seputar adopsi AI, Web, Digital Marketing, atau SEO). Gunakan Google Search. Kembalikan HARUS berformat JSON array of objects: [{ "title": "Judul Insight", "description": "Deskripsi singkat 2 kalimat", "link": "URL referensi/berita", "date": "Tanggal atau Bulan Tahun" }]';
    const response = await genAI.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        tools: [{ googleSearch: {} }],
      }
    });
    
    let insights = [];
    try {
      insights = JSON.parse(response.text);
    } catch(e) {
      console.error("Failed to parse insights JSON:", e);
    }
    
    // Extract grounding chunks
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const urls = chunks ? chunks.map((c) => c.web?.uri).filter(Boolean) : [];
    
    // Enrich links if empty
    insights.forEach((insight, i) => {
      if ((!insight.link || insight.link === "") && urls.length > 0) {
        insight.link = urls[i % urls.length];
      }
    });

    res.json({ insights });
  } catch (error) {
    console.error("Insights generation failed:", error);
    res.status(500).json({ error: error.message });
  }
});

`;

server = server.replace(injectionPoint, newRoute + injectionPoint);
fs.writeFileSync('server.ts', server);
console.log('Injected insights route into server.ts');
