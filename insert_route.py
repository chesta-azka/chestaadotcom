import re
with open("server.ts", "r") as f:
    content = f.read()

route = """

app.post("/api/score-lead", async (req, res) => {
  const { leadId, transcript } = req.body;
  if (!leadId || !transcript) {
    return res.status(400).json({ error: "Missing leadId or transcript" });
  }
  if (!genAI) return res.status(500).json({ error: "AI not initialized" });

  try {
    const prompt = `Anda adalah analis prospek/sales B2B profesional. Evaluasi transkrip chat berikut antara pengguna dan asisten AI.
Tentukan skor/kategori prospek (lead) dari pengguna ini.
Pilih SALAH SATU dari kategori berikut:
- Hot (Sangat tertarik, menanyakan harga, minta dihubungi, siap beli)
- Warm (Tertarik, bertanya fitur, mengeksplorasi layanan)
- Cold (Hanya melihat-lihat, percakapan singkat, tidak ada intensi jelas)

Hanya kembalikan kategori (Hot/Warm/Cold).

Transkrip Chat:
${transcript}`;

    const response = await genAI.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt
    });

    let score = response.text?.trim() || "Cold";
    // clean up response if it contains extra text
    if (score.toLowerCase().includes("hot")) score = "Hot";
    else if (score.toLowerCase().includes("warm")) score = "Warm";
    else score = "Cold";

    res.json({ ai_score: score });
  } catch (error: any) {
    console.error("Lead scoring failed:", error);
    res.status(500).json({ error: error.message });
  }
});

// Vite middleware for development"""

content = content.replace("// Vite middleware for development", route)

with open("server.ts", "w") as f:
    f.write(content)

