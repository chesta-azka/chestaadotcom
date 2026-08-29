const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf-8');

const newRoute = `app.post("/api/ai/categorize-feedback", async (req, res) => {
  const { userContext, aiResponse } = req.body;
  if (!userContext || !aiResponse) return res.status(400).json({ error: "Missing data" });

  try {
    const prompt = \`Anda adalah penganalisis feedback AI. Kategorikan alasan mengapa jawaban AI berikut mendapatkan rating "thumbs down" (negatif) dari user.
Pilih SALAH SATU dari kategori berikut (berikan HANYA nama kategorinya):
- Price Accuracy
- Helpfulness
- Response Tone
- Irrelevant
- Out of Context
- Other

Konteks User: "\${userContext}"
Jawaban AI: "\${aiResponse}"\`;
    
    if (!genAI) throw new Error("GenAI not initialized");
    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });
    
    const category = response.text ? response.text.trim().replace(/^"|"$/g, '') : "Other";
    res.json({ category });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// AI Blog Generation Route`;

content = content.replace('// AI Blog Generation Route', newRoute);
fs.writeFileSync('server.ts', content);
