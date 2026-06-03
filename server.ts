import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(express.json());

const PORT = 3000;

// Gemini initialization (optional fallback)
let genAI: any = null;
if (process.env.GEMINI_API_KEY) {
  try {
    genAI = new GoogleGenAI({ 
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  } catch (e) {
    console.warn("Failed to initialize Gemini API Client:", e);
  }
}

// 1. API: Groq Validation route with fallback to Gemini
app.post("/api/posts/validate", async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ approved: false, reason: "Judul dan konten tidak boleh kosong." });
  }

  const groqApiKey = process.env.GROK_API_KEY;
  if (!groqApiKey) {
    throw new Error("GROK_API_KEY is not defined");
  }

  try {
    console.log("Validating post via Groq with Mixtral (mixtral-8x7b-32768)...");
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${groqApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mixtral-8x7b-32768",
        messages: [
          {
            role: "system",
            content: "Anda adalah AI moderator profesional untuk CHESTADOTCOM Journal. Tugas Anda adalah melakukan review terhadap draf artikel blog yang dikirim oleh user biasa/mitra. Artikel harus berkualitas tinggi, profesional, mendidik, serta relevan dengan topik: SEO, web development, digital strategy, UI/UX, UMKM, branding, atau desain. Konten tidak boleh mengandung spam, kata-kata kasar, promosi produk ilegal, atau konten tidak berguna. Respon HARUS dalam format JSON murni dengan properti: { \"approved\": boolean, \"reason\": \"Alasan keputusan dalam bahasa Indonesia yang ramah, ringkas, dan profesional\" }"
          },
          {
            role: "user",
            content: `Judul: ${title}\nKonten: ${content}`
          }
        ],
        response_format: { type: "json_object" }
      })
    });

    if (response.ok) {
      const data = await response.json();
      const outputStr = data.choices?.[0]?.message?.content || "";
      console.log("Groq response raw:", outputStr);
      try {
        const parsed = JSON.parse(outputStr);
        return res.json({
          approved: !!parsed.approved,
          reason: parsed.reason || "Kriteria AI terpenuhi."
        });
      } catch (err) {
        console.warn("Groq JSON parse failed, parsing text response fallback:", outputStr);
        const lowerCase = outputStr.toLowerCase();
        const approved = lowerCase.includes("true") || lowerCase.includes("approve") || !lowerCase.includes("reject");
        return res.json({
          approved,
          reason: outputStr.slice(0, 300) || "AI menyetujui artikel Anda."
        });
      }
    } else {
      const errText = await response.text();
      console.error("Groq API error response:", errText);
      throw new Error(`Groq API returned status ${response.status}`);
    }
  } catch (groqError) {
    console.warn("Groq API call failed, falling back to Gemini API...", groqError);

    // Fallback to Gemini if Groq is unavailable
    if (genAI) {
      try {
        const prompt = `Anda adalah AI moderator untuk CHESTADOTCOM. Klasifikasikan artikel ini. Harus bertema SEO/Web-Dev/UMKM/Desain, sopan, mendidik, tidak kasar/spam.
        Judul: ${title}
        Konten: ${content}
        Format JSON: { "approved": boolean, "reason": "Alasan singkat" }`;

        const result = await genAI.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt
        });
        const text = result.text || "";
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          return res.json({
            approved: !!parsed.approved,
            reason: parsed.reason || "Kriteria AI terpenuhi."
          });
        }
      } catch (gemError) {
        console.error("Gemini fallback also failed:", gemError);
      }
    }

    // Direct local semantic approximation fallback if both AI models fail
    const triggerWords = ["spam", "babi", "anjing", "admin", "hacking", "porn", "kasar"];
    const isSpam = triggerWords.some(w => title.toLowerCase().includes(w) || content.toLowerCase().includes(w));
    return res.json({
      approved: !isSpam,
      reason: isSpam 
        ? "Postingan Anda mengandung kata-kata yang tidak diperbolehkan (Analisis Lokal)." 
        : "Disetujui secara otomatis karena gangguan jaringan AI (Analisis Lokal)."
    });
  }
});

// AI Blog Generation Route
app.post("/api/ai/generate-blog", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt || !genAI) {
    return res.status(400).json({ success: false, error: "Prompt is required or AI not initialized." });
  }

  try {
    const response = await genAI.models.generateContent({
      model: "gemini-1.5-flash",
      contents: `Buatlah draf artikel blog profesional, mendalam, dan modern dalam Bahasa Indonesia berdasarkan topik ini: ${prompt}. 
      Artikel harus memiliki Judul yang futuristik dan Konten yang berbobot (minimal 4 paragraf).
      Gunakan gaya penulisan "Digital Architect": minimalis, teknis namun elegan, dan futuristik.
      Berikan saran kategori SEO/Design/Strategy yang tepat.
      Format respon HARUS JSON murni:
      {
        "title": "Judul Menarik",
        "content": "Isi lengkap dengan pemisahan paragraf menggunakan \\n\\n untuk estetika layout...",
        "category": "SEO / Strategy / Design / UMKM",
        "imageQuery": "digital architectural minimalism tech"
      }`,
      config: {
        responseMimeType: "application/json"
      }
    });

    const result = await response.response;
    const text = result.text();
    const blog = JSON.parse(text);
    
    // Curated high-quality minimal tech/architecture image gallery fallback
    const gallery = [
       "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
       "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
       "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
       "https://images.unsplash.com/photo-1542831371-29b0f74f9713",
       "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe",
       "https://images.unsplash.com/photo-1550745165-9bc0b252726f"
    ];
    
    // If we have an imageQuery, we try to use a slightly more specific signature or use fallbacks
    const selectedBaseUrl = gallery[Math.floor(Math.random() * gallery.length)];
    blog.imageUrl = `${selectedBaseUrl}?q=80&w=1200&auto=format&fit=crop`;

    res.json({ success: true, blog });
  } catch (error: any) {
    console.error("AI Generation failed:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Vite middleware for development / Production Static Fallback
(async () => {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
})();
