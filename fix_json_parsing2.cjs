const fs = require('fs');
let server = fs.readFileSync('server.ts', 'utf-8');

const targetRoute = `// 3. API: AI Insights with Search Grounding (with Fallback for Rate Limits)
app.get("/api/ai/insights", async (req, res) => {
  const fallbackInsights = [
    {
      title: "Adopsi AI Tingkatkan Efisiensi UMKM",
      description: "Penggunaan alat AI generatif untuk pemasaran dan layanan pelanggan terbukti memangkas biaya operasional UMKM hingga 30% di kuartal terakhir.",
      link: "https://chestaa.com/services",
      date: "Tren Terkini"
    },
    {
      title: "Dominasi Local SEO di 2026",
      description: "Google semakin memprioritaskan hasil pencarian berbasis lokasi. Optimasi presisi pada profil bisnis lokal menjadi kunci akuisisi pelanggan baru.",
      link: "https://chestaa.com/blog",
      date: "Tren Terkini"
    },
    {
      title: "Arsitektur Web Mobile-First",
      description: "Lebih dari 80% traksi digital UMKM Indonesia berasal dari perangkat mobile. Kecepatan muat (Core Web Vitals) kini menjadi faktor konversi utama.",
      link: "https://chestaa.com/projects",
      date: "Tren Terkini"
    }
  ];

  if (!genAI) {
    console.warn("AI not initialized, using fallback insights.");
    return res.json({ insights: fallbackInsights });
  }

  try {
    const prompt = 'Berikan 3 wawasan (insight) atau tren teknologi digital terbaru yang sangat relevan untuk UMKM di Indonesia (seputar adopsi AI, Web, Digital Marketing, atau SEO). Gunakan Google Search. Kembalikan HARUS berformat JSON array of objects: [{ "title": "Judul Insight", "description": "Deskripsi singkat 2 kalimat", "link": "URL referensi/berita", "date": "Tanggal atau Bulan Tahun" }]';
    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      }
    });
    
    let insights = [];
    try {
      let responseText = response.text || "";
      // Strip markdown json blocks if present
      if (responseText.includes("\`\`\`json")) {
        responseText = responseText.replace(/\`\`\`json/g, "").replace(/\`\`\`/g, "").trim();
      } else if (responseText.includes("\`\`\`")) {
        responseText = responseText.replace(/\`\`\`/g, "").trim();
      }
      insights = JSON.parse(responseText);
    } catch(e) {
      console.error("Failed to parse insights JSON:", e);
      return res.json({ insights: fallbackInsights });
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
    console.warn("Insights generation failed (Quota/Network). Using fallback data.", error.message);
    // Return graceful fallback instead of 500 error
    res.json({ insights: fallbackInsights });
  }
});`;

const replacementRoute = `// 3. API: AI Insights with Search Grounding (with Fallback for Rate Limits)
app.get("/api/ai/insights", async (req, res) => {
  const fallbackInsights = [
    {
      title: "Adopsi AI Tingkatkan Efisiensi UMKM",
      description: "Penggunaan alat AI generatif untuk pemasaran dan layanan pelanggan terbukti memangkas biaya operasional UMKM hingga 30% di kuartal terakhir.",
      link: "https://chestaa.com/services",
      date: "Tren Terkini"
    },
    {
      title: "Dominasi Local SEO di 2026",
      description: "Google semakin memprioritaskan hasil pencarian berbasis lokasi. Optimasi presisi pada profil bisnis lokal menjadi kunci akuisisi pelanggan baru.",
      link: "https://chestaa.com/blog",
      date: "Tren Terkini"
    },
    {
      title: "Arsitektur Web Mobile-First",
      description: "Lebih dari 80% traksi digital UMKM Indonesia berasal dari perangkat mobile. Kecepatan muat (Core Web Vitals) kini menjadi faktor konversi utama.",
      link: "https://chestaa.com/projects",
      date: "Tren Terkini"
    }
  ];

  if (!genAI) {
    console.warn("AI not initialized, using fallback insights.");
    return res.json({ insights: fallbackInsights });
  }

  try {
    const prompt = 'Berikan 3 wawasan (insight) atau tren teknologi digital terbaru yang sangat relevan untuk UMKM di Indonesia (seputar adopsi AI, Web, Digital Marketing, atau SEO). Gunakan Google Search. Kembalikan HARUS berformat JSON array of objects: [{ "title": "Judul Insight", "description": "Deskripsi singkat 2 kalimat", "link": "URL referensi/berita", "date": "Tanggal atau Bulan Tahun" }]. PENTING: JANGAN BERIKAN TEKS PENGANTAR. HANYA KEMBALIKAN JSON MURNI.';
    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      }
    });
    
    let insights = [];
    try {
      let responseText = response.text || "";
      const match = responseText.match(/\\[\\s*\\{[\\s\\S]*\\}\\s*\\]/);
      
      if (match) {
        insights = JSON.parse(match[0]);
      } else {
        if (responseText.includes("\`\`\`json")) {
          responseText = responseText.replace(/\`\`\`json/g, "").replace(/\`\`\`/g, "").trim();
        } else if (responseText.includes("\`\`\`")) {
          responseText = responseText.replace(/\`\`\`/g, "").trim();
        }
        insights = JSON.parse(responseText);
      }
    } catch(e) {
      console.error("Failed to parse insights JSON:", e);
      return res.json({ insights: fallbackInsights });
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
    console.warn("Insights generation failed (Quota/Network). Using fallback data.", error.message);
    res.json({ insights: fallbackInsights });
  }
});`;

if (server.includes('app.get("/api/ai/insights"')) {
  server = server.replace(targetRoute, replacementRoute);
  fs.writeFileSync('server.ts', server);
  console.log('Fixed json parsing cleanly');
}
