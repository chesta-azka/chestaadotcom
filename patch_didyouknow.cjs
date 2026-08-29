const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const replacement = `
const didYouKnowCache = new Map();

app.post("/api/ai/did-you-know", async (req, res) => {
  const { serviceTitle } = req.body;
  if (!serviceTitle || !genAI) {
    return res.status(400).json({ success: false, error: "serviceTitle required" });
  }
  
  if (didYouKnowCache.has(serviceTitle)) {
    return res.json({ fact: didYouKnowCache.get(serviceTitle) });
  }

  try {
    const prompt = \`Berikan 1 kalimat fakta menarik ("Tahukah Anda?") atau statistik industri yang sangat spesifik dan relevan dengan layanan: "\${serviceTitle}". Kalimat harus singkat, padat, profesional, berfokus pada manfaat atau metrik (seperti efisiensi, ROI, dll), dan cocok untuk audiens B2B/UMKM di Indonesia. HANYA KEMBALIKAN KALIMAT TERSEBUT.\`;
    
    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    
    const text = response.text ? response.text.trim() : "";
    const fact = text.replace(/^"|"$/g, '');
    
    didYouKnowCache.set(serviceTitle, fact);
    res.json({ fact });
  } catch (error) {
    console.log("Did-you-know generation failed:", error.message);
    const fallbacks = {
       "default": "Teknologi modern dapat meningkatkan efisiensi operasional bisnis Anda hingga 40%."
    };
    res.json({ fact: fallbacks["default"] });
  }
});
`;

code = code.replace(/app\.post\("\/api\/ai\/did-you-know"[\s\S]*?\}\);/, replacement.trim());
fs.writeFileSync('server.ts', code);
console.log('Patched did-you-know');
