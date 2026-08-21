const fs = require('fs');
let server = fs.readFileSync('server.ts', 'utf-8');

const injectionPoint = '// Vite middleware for development';
const newRoute = `
// 4. API: SEO Audit Tool
app.post("/api/ai/seo-audit", async (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: "Content is required" });
  if (!genAI) return res.status(500).json({ error: "AI not initialized" });

  try {
    const prompt = \`Anda adalah ahli SEO Lokal di Indonesia. Lakukan audit SEO singkat pada konten berikut dan berikan saran optimasi keyword, meta description, dan perbaikan struktur H1/H2 untuk visibilitas pencarian lokal (khususnya untuk UMKM di daerah).

Konten:
"""
\${content}
"""

Berikan respons dalam format Markdown dengan struktur berikut:
1. **Skor SEO Awal** (perkiraan 1-100)
2. **Kekuatan Konten**
3. **Kelemahan & Area Perbaikan**
4. **Saran Keyword Lokal** (misal: jasa web di tangerang, dll)
5. **Rekomendasi Meta Title & Description**\`;

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });
    
    res.json({ auditResult: response.text });
  } catch (error) {
    console.error("SEO Audit failed:", error);
    res.status(500).json({ error: error.message });
  }
});

`;

server = server.replace(injectionPoint, newRoute + injectionPoint);
fs.writeFileSync('server.ts', server);
console.log('Injected SEO Audit route into server.ts');
