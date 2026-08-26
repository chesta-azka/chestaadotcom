const fs = require('fs');

let server = fs.readFileSync('server.ts', 'utf8');

const apiCode = `
// AI Did You Know Generation
app.post("/api/ai/did-you-know", async (req, res) => {
  const { serviceTitle } = req.body;
  if (!serviceTitle || !genAI) {
    return res.status(400).json({ success: false, error: "serviceTitle required" });
  }
  
  try {
    const prompt = \`Berikan 1 kalimat fakta menarik ("Tahukah Anda?") atau statistik industri yang sangat spesifik dan relevan dengan layanan: "\${serviceTitle}". Kalimat harus singkat, padat, profesional, berfokus pada manfaat atau metrik (seperti efisiensi, ROI, dll), dan cocok untuk audiens B2B/UMKM di Indonesia. HANYA KEMBALIKAN KALIMAT TERSEBUT.\`;
    
    const response = await genAI.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });
    
    const text = response.text ? response.text.trim() : "";
    res.json({ fact: text.replace(/^"|"$/g, '') });
  } catch (error) {
    console.log("Did-you-know generation failed:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// AI Blog Generation Route
`;

server = server.replace("// AI Blog Generation Route", apiCode);
fs.writeFileSync('server.ts', server);
