import express from "express";
import path from "path";
import fs from "fs/promises";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { initializeApp, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

import { getFirestore } from 'firebase-admin/firestore';
import fsSync from 'fs';
const firebaseConfig = JSON.parse(fsSync.readFileSync('./firebase-applet-config.json', 'utf8'));

if (getApps().length === 0) { 
  initializeApp({ projectId: firebaseConfig.projectId }); 
}


import Groq from "groq-sdk";
import { injectSocialMeta } from "./src/lib/social-meta";

const app = express();



// Middleware to verify Firebase ID Token
const verifyFirebaseToken = async (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid Authorization header' });
  }
  const token = authHeader.split('Bearer ')[1];
  try {
    const decodedToken = await getAuth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};


// API: Get prunable messages count
app.get("/api/admin/prunable-count", verifyFirebaseToken, async (req, res) => {
  res.json({ count: 0 });
});

// API: Admin Verification
app.get("/api/admin/verify", verifyFirebaseToken, (req: any, res: any) => {
  res.status(200).json({ success: true, user: req.user });
});


app.use(express.json());

const PORT = 3000;

const groq = process.env.GROQ_API_KEY ? new Groq({ apiKey: process.env.GROQ_API_KEY }) : null;

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

  const groqApiKey = process.env.GROQ_API_KEY;
  if (!groqApiKey) {
    // Silently skip to fallback if no key
    throw new Error("SKIP_GROQ");
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
    if (groqError.message !== "SKIP_GROQ") {
      console.warn("Groq API call failed, falling back to Gemini API...", groqError.message);
    }

    // Fallback to Gemini if Groq is unavailable
    if (genAI) {
      try {
        const prompt = `Anda adalah AI moderator untuk CHESTADOTCOM. Klasifikasikan artikel ini. Harus bertema SEO/Web-Dev/UMKM/Desain, sopan, mendidik, tidak kasar/spam.
        Judul: ${title}
        Konten: ${content}
        Format JSON: { "approved": boolean, "reason": "Alasan singkat" }`;

        const result = await genAI.models.generateContent({
          model: "gemini-2.5-flash",
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


// Chat Assistant Route (Groq API with Gemini fallback)
app.post("/api/chat", async (req, res) => {
  const { messages, pagePath, pageTitle, systemContext } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Messages array is required." });
  }

  // Set headers for plain text streaming
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Transfer-Encoding', 'chunked');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    const lastMsg = messages[messages.length - 1]?.content || '';
    const isPricingIntent = /(harga|biaya|price|pricing|paket|cost|tarif|tagihan|rekening|transfer|quote|quotation|diskon|discount|bca|gopay|dana|bayar|pembayaran|budget|invoice|dp|principal engineer|nego|penawaran|order|beli|pesan)/i.test(lastMsg);

    if (isPricingIntent) {
      res.write("Connecting you to our Principal Engineer...");
      res.end();
      return;
    }

    const systemPrompt = `Anda adalah Konsultan AI Eksklusif dari CHESTADOTCOM (Bespoke Software, AI Engineering, & Enterprise Digital Solutions). Jawab dengan ramah, lugas, cerdas, dan profesional. Saat ini user berada di halaman "${pageTitle || 'Beranda'}" (Path: ${pagePath || '/'}). Gunakan konteks halaman ini untuk memberikan konsultasi arsitektur dan solusi terbaik.

${systemContext ? 'Konteks Tambahan (Wajib Diperhatikan):\n' + systemContext : ''}

ATURAN UTAMA:
1. Berikan jawaban yang terstruktur, elegan, dan solutif.
2. Jika user menanyakan estimasi harga, rincian biaya, atau paket kustom, jawab langsung: "Connecting you to our Principal Engineer..." agar tim engineer kami dapat langsung menganalisis kebutuhan teknis mereka.
3. Anda dapat memberikan saran pertanyaan lanjutan di akhir jawaban dengan format:
<opsi>Pertanyaan atau pilihan 1</opsi>
<opsi>Pertanyaan atau pilihan 2</opsi>
<opsi>Konsultasi dengan Principal Engineer 👨‍💻</opsi>`;

    let streamed = false;

    // 1. Try Groq SDK if configured
    if (groq) {
      try {
        const groqMessages = [
          { role: "system" as const, content: systemPrompt },
          ...messages.map((m: any) => ({
            role: (m.role === "assistant" || m.role === "ai" ? "assistant" : "user") as "assistant" | "user",
            content: m.content
          }))
        ];

        const groqStream = await groq.chat.completions.create({
          model: "llama-3.3-70b-versatile",
          messages: groqMessages,
          stream: true,
          temperature: 0.6,
          max_tokens: 1024,
        });

        for await (const chunk of groqStream) {
          const content = chunk.choices[0]?.delta?.content || '';
          if (content) {
            res.write(content);
            streamed = true;
          }
        }
        res.end();
        return;
      } catch (groqErr) {
        console.warn("Groq streaming error, falling back to Gemini:", groqErr);
      }
    }

    // 2. Fallback to Gemini if Groq unavailable or failed
    if (genAI) {
      const geminiContents = messages.map((m) => ({
        role: (m.role === 'assistant' || m.role === 'ai') ? 'model' : 'user',
        parts: [{ text: m.content }]
      }));

      const streamResponse = await genAI.models.generateContentStream({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction: systemPrompt,
        },
        contents: geminiContents,
      });
      
      for await (const chunk of streamResponse) {
        if (chunk.text) {
          res.write(chunk.text);
          streamed = true;
        }
      }
      res.end();
      return;
    }

    if (!streamed) {
      res.write("Halo! Saya asisten AI CHESTADOTCOM. Silakan ajukan pertanyaan seputar arsitektur sistem, automasi AI, atau solusi digital kami.");
      res.end();
    }
  } catch (error) {
    console.error("Chat API failed:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Mohon maaf, layanan AI sedang mengalami gangguan jaringan. Silakan coba beberapa saat lagi." });
    } else {
      res.end();
    }
  }
});


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
    const prompt = `Berikan 1 kalimat fakta menarik ("Tahukah Anda?") atau statistik industri yang sangat spesifik dan relevan dengan layanan: "${serviceTitle}". Kalimat harus singkat, padat, profesional, berfokus pada manfaat atau metrik (seperti efisiensi, ROI, dll), dan cocok untuk audiens B2B/UMKM di Indonesia. HANYA KEMBALIKAN KALIMAT TERSEBUT.`;
    
    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    
    const text = response.text ? response.text.trim() : "";
    const fact = text.replace(/^"|"$/g, '');
    
    didYouKnowCache.set(serviceTitle, fact);
    res.json({ fact });
  } catch (error) {
    // Silent fallback
    const fallbacks = {
       "default": "Teknologi modern dapat meningkatkan efisiensi operasional bisnis Anda hingga 40%."
    };
    didYouKnowCache.set(serviceTitle, fallbacks["default"]);
    res.json({ fact: fallbacks["default"] });
  }
});

app.post("/api/ai/categorize-feedback", async (req, res) => {
  const { userContext, aiResponse } = req.body;
  if (!userContext || !aiResponse) return res.status(400).json({ error: "Missing data" });

  try {
    const prompt = `Anda adalah penganalisis feedback AI. Kategorikan alasan mengapa jawaban AI berikut mendapatkan rating "thumbs down" (negatif) dari user.
Pilih SALAH SATU dari kategori berikut (berikan HANYA nama kategorinya):
- Price Accuracy
- Helpfulness
- Response Tone
- Irrelevant
- Out of Context
- Other

Konteks User: "${userContext}"
Jawaban AI: "${aiResponse}"`;
    
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

// AI Blog Generation Route

app.post("/api/ai/generate-blog", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt || !genAI) {
    return res.status(400).json({ success: false, error: "Prompt is required or AI not initialized." });
  }

  try {
    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
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
    console.log("AI Generation failed.");
    res.status(500).json({ success: false, error: error.message });
  }
});


// 3. API: AI Insights with Search Grounding (with Fallback for Rate Limits)
let cachedInsights = null;
let lastInsightsFetch = 0;
const CACHE_DURATION_MS = 1000 * 60 * 60 * 12; // 12 hours

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

  // Use cached data if available and fresh
  const now = Date.now();
  if (cachedInsights && (now - lastInsightsFetch < CACHE_DURATION_MS)) {
    return res.json({ insights: cachedInsights });
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
      const match = responseText.match(/\[\s*\{[\s\S]*\}\s*\]/);
      
      if (match) {
        insights = JSON.parse(match[0]);
      } else {
        if (responseText.includes("```json")) {
          responseText = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
        } else if (responseText.includes("```")) {
          responseText = responseText.replace(/```/g, "").trim();
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

    cachedInsights = insights;
    lastInsightsFetch = Date.now();
    res.json({ insights });
  } catch (error: any) {
    console.log("Insights generation fallback triggered due to API limits.");
    // Cache the fallback to prevent spamming the failing API
    cachedInsights = fallbackInsights;
    lastInsightsFetch = Date.now(); // wait 12 hours before trying again, or server restart
    res.json({ insights: fallbackInsights });
  }
});



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
    if (text.includes("```json")) {
      text = text.replace(/```json/g, "").replace(/```/g, "").trim();
    } else if (text.includes("```")) {
      text = text.replace(/```/g, "").trim();
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

// 4. API: SEO Audit Tool
app.post("/api/ai/seo-audit", verifyFirebaseToken, async (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: "Content is required" });
  if (!genAI) return res.status(500).json({ error: "AI not initialized" });

  try {
    const prompt = `Anda adalah ahli SEO Lokal di Indonesia. Lakukan audit SEO singkat pada konten berikut dan berikan saran optimasi keyword, meta description, dan perbaikan struktur H1/H2 untuk visibilitas pencarian lokal (khususnya untuk UMKM di daerah).

Konten:
"""
${content}
"""

Berikan respons dalam format Markdown dengan struktur berikut:
1. **Skor SEO Awal** (perkiraan 1-100)
2. **Kekuatan Konten**
3. **Kelemahan & Area Perbaikan**
4. **Saran Keyword Lokal** (misal: jasa web di tangerang, dll)
5. **Rekomendasi Meta Title & Description**`;

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });
    
    res.json({ auditResult: response.text });
  } catch (error) {
    console.log("SEO Audit failed.");
    res.status(500).json({ error: error.message });
  }
});



app.post("/api/score-lead", async (req, res) => {
  const { transcript, leadId, messages = [], sessionData = {} } = req.body;
  if (!transcript) {
    return res.status(400).json({ error: "Missing transcript" });
  }

  try {
    const adminDb = getFirestore();
    let score = "Cold";

    if (groq) {
      const prompt = `You are a B2B sales lead analyst. Evaluate the following chat transcript between a user and an AI assistant.
Determine the lead score/category for this user.
Choose EXACTLY ONE from:
- Hot (Very interested, asking for pricing, wants contact, ready to buy)
- Warm (Interested, asking about features, exploring)
- Cold (Just browsing, short conversation, no clear intent)

Return ONLY the category word (Hot, Warm, or Cold).

Transcript:
${transcript}`;

      const chatCompletion = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama-3.3-70b-versatile",
        temperature: 0.1,
        max_tokens: 10,
      });

      const raw = chatCompletion.choices[0]?.message?.content?.trim() || "Cold";
      if (raw.toLowerCase().includes("hot")) score = "Hot";
      else if (raw.toLowerCase().includes("warm")) score = "Warm";
      else score = "Cold";
    }

    if (leadId) {
      await adminDb.collection('ai_leads').doc(leadId).set({
        sessionId: leadId,
        score: score,
        createdAt: new Date(),
        messageCount: messages.length,
        userId: sessionData.userId || 'anonymous'
      }, { merge: true });

      await adminDb.collection('ai_chat_sessions').doc(leadId).update({ leadScored: true });
    }

    res.json({ success: true, ai_score: score });
  } catch (error: any) {
    console.error("Lead scoring failed:", error);
    res.status(500).json({ error: error.message });
  }
});



// API: AI-Driven Workspace Pruning
app.post("/api/ai/prune-workspace", async (req, res) => {
  res.json({ success: true, pruned: 0, reason: "Pruning delegated to client side." });
});
// Vite middleware for development / Production Static Fallback
(async () => {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    // Use vite's connect instance as middleware
    app.use(vite.middlewares);
    
    // In dev, the index.html is mostly served by vite.middlewares automatically, 
    // but if we want to inject meta, it's a bit complex with vite middlewares.
    // For social sharing, dev mode doesn't matter much.
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    // Important: DO NOT serve index.html statically, otherwise it overrides our wildcard
    app.use(express.static(distPath, { index: false }));
    
    app.get('*', async (req, res) => {
      try {
        let html = await fs.readFile(path.join(distPath, 'index.html'), 'utf-8');
        html = injectSocialMeta(html, req.originalUrl);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      } catch (err) {
        console.error("Error rendering HTML:", err);
        res.status(500).end("Internal Server Error");
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
})();
