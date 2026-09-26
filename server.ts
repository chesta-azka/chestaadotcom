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
import { z } from "zod";

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
  const adminEmail = "chestacode@gmail.com";
  const isAdminClaim = req.user && (req.user.email === adminEmail || req.user.admin === true || req.user.role === 'admin' || req.user.claims?.admin === true);
  if (isAdminClaim) {
    res.status(200).json({ success: true, user: req.user });
  } else {
    res.status(403).json({ success: false, error: "Forbidden: You are not an admin." });
  }
});


app.use(express.json());

const PORT = 3000;

const groqApiKey = process.env.GROQ_API_KEY;
const groq = (groqApiKey && groqApiKey.startsWith('gsk_') && groqApiKey.length > 10) ? new Groq({ apiKey: groqApiKey }) : null;

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
  if (!groqApiKey || !groqApiKey.startsWith('gsk_')) {
    // Silently skip to fallback if no valid key
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
  } catch (groqError: any) {
    if (groqError.message !== "SKIP_GROQ") {
      if (groqError.message?.includes('401') || groqError.message?.includes('Invalid API Key') || groqError.message?.includes('status 401')) {
        console.log("Groq API 401 unauthorized in validate, falling back to Gemini.");
      } else {
        console.warn("Groq API call failed, falling back to Gemini API...", groqError.message);
      }
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


// Chat Assistant Route (Groq Llama 3 API with Gemini fallback)
app.post("/api/chat", async (req, res) => {
  const { messages, pagePath, pageTitle, pageContext, systemContext, stream } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Messages array is required." });
  }

  try {
    const lastMsg = messages[messages.length - 1]?.content || '';

    const messageCount = messages.length;
    const isHardSelling = messageCount >= 2;

    const systemPrompt = `[ROLE]
Senior B2B Technology & Web Development Consultant for CHESTADOTCOM.

[CURRENT USER PAGE CONTEXT]
- Active Path: ${pagePath || '/'}
- Page Title: ${pageTitle || 'CHESTADOTCOM'}
- Page Context Details: ${pageContext ? JSON.stringify(pageContext) : 'General'}

[CONSULTATION GUIDELINES]
- Provide professional, objective, concise, and technically grounded answers.
- Focus on business efficiency, ROI, Next.js architecture performance, local SEO ranking (#1 Google), and transparent pricing (e.g., UMKM Promo Package Rp540K).
- Maintain a high-end corporate advisory tone without flowery or informal language.
- Strictly avoid leaking internal backend architecture or implementation code details.
- End responses with interactive options:
<opsi>Amankan Paket Promo Rp540K</opsi>
<opsi>Konsultasi WhatsApp</opsi>`;

    let replyText = "";

    // 1. Try Groq Llama 3 if configured
    if (groq) {
      try {
        const groqMessages = [
          { role: "system" as const, content: systemPrompt },
          ...messages.map((m: any) => ({
            role: (m.role === "assistant" || m.role === "ai" ? "assistant" : "user") as "assistant" | "user",
            content: m.content || m.text || ''
          }))
        ];

        if (stream) {
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          res.setHeader('Transfer-Encoding', 'chunked');
          const groqStream = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: groqMessages,
            stream: true,
            temperature: 0.6,
            max_tokens: 1024,
          });

          for await (const chunk of groqStream) {
            const content = chunk.choices[0]?.delta?.content || '';
            if (content) res.write(content);
          }
          res.end();
          return;
        } else {
          const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: groqMessages,
            temperature: 0.6,
            max_tokens: 1024,
          });
          replyText = completion.choices[0]?.message?.content || "";
        }
      } catch (groqErr: any) {
        if (groqErr?.status === 401 || groqErr?.message?.includes('401') || groqErr?.message?.includes('Invalid API Key')) {
          console.log("Groq API key invalid/unauthorized, using Gemini fallback.");
        } else {
          console.warn("Groq API error, falling back to Gemini:", groqErr?.message || groqErr);
        }
      }
    }

    // 2. Fallback to Gemini if Groq unavailable or failed
    if (!replyText && genAI) {
      const conversationText = messages.map((m: any) => `${m.role === 'assistant' || m.role === 'ai' ? 'Assistant' : 'User'}: ${m.content || m.text || ''}`).join('\n');

      try {
        if (stream) {
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          res.setHeader('Transfer-Encoding', 'chunked');
          const streamResponse = await genAI.models.generateContentStream({
            model: "gemini-2.5-flash",
            config: { systemInstruction: systemPrompt },
            contents: conversationText,
          });

          for await (const chunk of streamResponse) {
            if (chunk.text) res.write(chunk.text);
          }
          res.end();
          return;
        } else {
          const result = await genAI.models.generateContent({
            model: "gemini-2.5-flash",
            config: { systemInstruction: systemPrompt },
            contents: conversationText,
          });
          replyText = result.text || "";
        }
      } catch (gemErr: any) {
        console.warn("Gemini 2.5-flash error, trying gemini-1.5-flash fallback:", gemErr?.message || gemErr);
        try {
          if (stream) {
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
            res.setHeader('Transfer-Encoding', 'chunked');
            const streamResponse = await genAI.models.generateContentStream({
              model: "gemini-1.5-flash",
              config: { systemInstruction: systemPrompt },
              contents: conversationText,
            });

            for await (const chunk of streamResponse) {
              if (chunk.text) res.write(chunk.text);
            }
            res.end();
            return;
          } else {
            const result = await genAI.models.generateContent({
              model: "gemini-1.5-flash",
              config: { systemInstruction: systemPrompt },
              contents: conversationText,
            });
            replyText = result.text || "";
          }
        } catch (gem15Err: any) {
          console.warn("Gemini 1.5-flash fallback also failed:", gem15Err?.message || gem15Err);
        }
      }
    }

    if (!replyText) {
      const q = lastMsg.toLowerCase();
      if (/(harga|biaya|price|pricing|paket|promo|diskon|tarif|cost|budget|murah)/.test(q)) {
        replyText = `### Paket Pembuatan Website Profesional\n\nKami menyediakan solusi website siap pakai dengan harga transparan:\n\n• **Paket Promo UMKM**: **Rp540.000** *(Termasuk domain .com 1 tahun & hosting kilat)*\n• **Pengerjaan**: 1-3 hari kerja dengan 100% hak milik penuh.\n\n<opsi>Amankan Paket Promo Rp540K</opsi>\n<opsi>Konsultasi WhatsApp</opsi>`;
      } else if (/(lama|waktu|durasi|hari|kapan|jadwal|deadline)/.test(q)) {
        replyText = `### Estimasi Waktu Pengerjaan\n\n• **Paket Standar & Promo**: Selesai dalam **1 hingga 3 hari kerja**.\n• **Paket Kustom**: 3-7 hari kerja tergantung kompleksitas fitur.\n\n<opsi>Paket Website UMKM Rp540K</opsi>\n<opsi>Konsultasi WhatsApp</opsi>`;
      } else {
        replyText = `### Konsultasi CHESTADOTCOM\n\nTerima kasih atas pertanyaan Anda. Kami siap membantu pengembangan arsitektur web dan automasi digital bisnis Anda.\n\n• **Paket Promo UMKM**: Rp540.000 (All-in domain .com + cloud server).\n• **Konsultasi Langsung**: Hubungi tim kami via WhatsApp untuk respon instan.\n\n<opsi>Amankan Paket Promo Rp540K</opsi>\n<opsi>Konsultasi WhatsApp</opsi>`;
      }
    }

    if (stream) {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.write(replyText);
      res.end();
      return;
    }

    return res.json({ reply: replyText });
  } catch (error) {
    console.error("Chat API failed:", error);
    if (stream) {
      if (!res.headersSent) res.status(500).send("Mohon maaf, layanan AI sedang mengalami gangguan.");
      else res.end();
    } else {
      return res.status(500).json({ reply: "Mohon maaf, layanan AI sedang mengalami gangguan jaringan. Silakan coba beberapa saat lagi atau hubungi via WhatsApp." });
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

  const LeadScoringSchema = z.object({
    score: z.number().min(1).max(100),
    tier: z.enum(["Cold Lead", "Warm Lead", "Hot Lead"]),
    matchedKeywords: z.array(z.string()),
    summary: z.string()
  });

  try {
    const adminDb = getFirestore();
    let analysisResult: z.infer<typeof LeadScoringSchema> = {
      score: 45,
      tier: "Warm Lead",
      matchedKeywords: ["layanan", "tanya"],
      summary: "Klien mengeksplorasi layanan digital secara umum."
    };
    let scoredByAI = false;

    if (groq) {
      try {
        const prompt = `You are a Senior B2B sales lead analyst for CHESTADOTCOM. Analyze this chat transcript and return a JSON object strictly matching this schema:
{
  "score": number (1 to 100),
  "tier": "Cold Lead" | "Warm Lead" | "Hot Lead",
  "matchedKeywords": array of strings (e.g. ["harga", "umkm", "booking"]),
  "summary": string (brief summary in Indonesian)
}

Classification rules:
- Hot Lead (score 75-100): Asking about pricing (e.g. 540k, biaya), scheduling a call/booking, or enterprise custom systems.
- Warm Lead (score 40-74): Asking about features, timelines, or services.
- Cold Lead (score 1-39): General browsing, curiosity, or short casual messages.

Transcript:
${transcript}`;

        const chatCompletion = await groq.chat.completions.create({
          messages: [{ role: "user", content: prompt }],
          model: "llama-3.3-70b-versatile",
          temperature: 0.1,
          response_format: { type: "json_object" }
        });

        const raw = chatCompletion.choices[0]?.message?.content?.trim() || "{}";
        const parsed = JSON.parse(raw);
        const validated = LeadScoringSchema.parse(parsed);
        analysisResult = validated;
        scoredByAI = true;
      } catch (groqErr: any) {
        console.warn("Groq Zod lead scoring error, trying Gemini fallback:", groqErr?.message);
      }
    }

    if (!scoredByAI && genAI) {
      try {
        const prompt = `Analyze this chat transcript and return JSON strictly with keys: score (1-100), tier ("Cold Lead" | "Warm Lead" | "Hot Lead"), matchedKeywords (array of strings), summary (string in Indonesian).\nTranscript: ${transcript}`;
        const result = await genAI.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt
        });
        const text = result.text || "";
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          const validated = LeadScoringSchema.parse(parsed);
          analysisResult = validated;
          scoredByAI = true;
        }
      } catch (gemErr) {
        console.warn("Gemini lead scoring fallback failed:", gemErr);
      }
    }

    if (!scoredByAI) {
      const lower = transcript.toLowerCase();
      if (lower.includes("harga") || lower.includes("biaya") || lower.includes("booking") || lower.includes("call") || lower.includes("beli") || lower.includes("rp540k")) {
        analysisResult = { score: 85, tier: "Hot Lead", matchedKeywords: ["harga", "booking"], summary: "Klien menunjukkan ketertarikan tinggi pada harga dan pemesanan." };
      } else if (lower.includes("fitur") || lower.includes("tanya") || lower.includes("bagaimana") || lower.includes("layanan")) {
        analysisResult = { score: 55, tier: "Warm Lead", matchedKeywords: ["layanan", "fitur"], summary: "Klien mengeksplorasi informasi layanan." };
      } else {
        analysisResult = { score: 25, tier: "Cold Lead", matchedKeywords: ["umum"], summary: "Klien melakukan penelusuran umum." };
      }
    }

    const shortScoreTag = analysisResult.tier.includes('Hot') ? 'Hot' : analysisResult.tier.includes('Warm') ? 'Warm' : 'Cold';

    if (leadId) {
      await adminDb.collection('ai_leads').doc(leadId).set({
        sessionId: leadId,
        score: shortScoreTag,
        fullScore: analysisResult.score,
        tier: analysisResult.tier,
        matchedKeywords: analysisResult.matchedKeywords,
        summary: analysisResult.summary,
        createdAt: new Date(),
        messageCount: messages.length,
        userId: sessionData.userId || 'anonymous'
      }, { merge: true });

      try {
        await adminDb.collection('ai_chat_sessions').doc(leadId).update({ 
          leadScored: true, 
          ai_score: shortScoreTag,
          leadAnalysis: analysisResult
        });
      } catch (e) {
        // ignore if doc missing
      }
    }

    res.json({ success: true, ai_score: shortScoreTag, analysis: analysisResult });
  } catch (error: any) {
    console.error("Lead scoring failed gracefully:", error);
    res.json({ 
      success: true, 
      ai_score: "Warm", 
      analysis: { score: 50, tier: "Warm Lead", matchedKeywords: ["default"], summary: "Analisis default fallback." } 
    });
  }
});

// API: RFP Document Parser & In-Chat Cost Estimator via Groq SDK & Zod
const RFPEstimateSchemaServer = z.object({
  estimatedWeeks: z.number().int().positive(),
  costTier: z.string(),
  summaryBreakdown: z.array(z.string()),
  recommendedModules: z.array(z.string()),
});

app.post("/api/estimate-rfp", async (req, res) => {
  try {
    const { rfpText, text } = req.body;
    const rawText = rfpText || text || "";

    if (!rawText || typeof rawText !== "string" || rawText.trim().length < 10) {
      return res.status(400).json({ error: "RFP text payload is required (min 10 characters)." });
    }

    const sanitizedText = rawText.trim().slice(0, 15000);

    let resultData: any = null;
    let dataSource = "fallback";

    if (groq) {
      try {
        const systemPrompt = `You are a senior enterprise software architect and RFP technical estimator at CHESTAADOTCOM.
Analyze the provided RFP document text and return a precise JSON response matching this exact schema:
{
  "estimatedWeeks": number,
  "costTier": "string representing estimated budget tier",
  "summaryBreakdown": ["point 1", "point 2"],
  "recommendedModules": ["module 1", "module 2"]
}
Return ONLY valid JSON. Language: Indonesian.`;

        const completion = await groq.chat.completions.create({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: `RFP Document Text:\n\n${sanitizedText}` }
          ],
          response_format: { type: "json_object" },
          temperature: 0.3,
          max_tokens: 1500,
        });

        const contentStr = completion.choices[0]?.message?.content;
        if (contentStr) {
          const parsed = JSON.parse(contentStr);
          resultData = RFPEstimateSchemaServer.parse(parsed);
          dataSource = "groq-llama-3.3-70b";
        }
      } catch (err: any) {
        console.warn("Groq RFP estimate failed, trying Gemini or fallback:", err?.message);
      }
    }

    if (!resultData && genAI) {
      try {
        const prompt = `Analyze this RFP document and return JSON with keys: estimatedWeeks (number), costTier (string), summaryBreakdown (array of strings), recommendedModules (array of strings). Language Indonesian.\nRFP Text:\n${sanitizedText}`;
        const genRes = await genAI.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt
        });
        const textOut = genRes.text || "";
        const jsonMatch = textOut.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          resultData = RFPEstimateSchemaServer.parse(parsed);
          dataSource = "gemini-2.5-flash";
        }
      } catch (gemErr) {
        console.warn("Gemini RFP fallback failed:", gemErr);
      }
    }

    if (!resultData) {
      resultData = {
        estimatedWeeks: 4,
        costTier: "Rp 15M - Rp 30M",
        summaryBreakdown: [
          "Analisis dokumen RFP otomatis.",
          "Arsitektur Next.js & TypeScript aman.",
          "Implementasi modular berkinerja tinggi."
        ],
        recommendedModules: [
          "Autentikasi & Multi-role Management",
          "Dashboard Analitik Interaktif",
          "Optimasi SEO & Cloud Deployment"
        ]
      };
      dataSource = "fallback";
    }

    return res.json({ success: true, data: resultData, source: dataSource });
  } catch (error: any) {
    console.error("RFP Estimate API Error:", error);
    if (error instanceof z.ZodError) {
      return res.status(422).json({ error: "Validation error", details: error.issues || (error as any).errors });
    }
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
});

app.post("/api/ai/summarize-conversation", async (req, res) => {
  const { sessionId, transcript, messages = [], leadScore = "Warm" } = req.body;
  if (!transcript && (!messages || messages.length === 0)) {
    return res.status(400).json({ error: "Missing transcript or messages" });
  }

  const SummarySchema = z.object({
    clientIntent: z.string(),
    projectScope: z.string(),
    leadTier: z.enum(["Cold Lead", "Warm Lead", "Hot Lead"]),
    bulletPoints: z.array(z.string()),
    recommendedAction: z.string()
  });

  try {
    const adminDb = getFirestore();
    const chatText = transcript || messages.map((m: any) => `${m.role}: ${m.content}`).join('\n');

    let summaryData: z.infer<typeof SummarySchema> = {
      clientIntent: "Eksplorasi layanan website profesional",
      projectScope: "Pembuatan website company profile / UMKM",
      leadTier: leadScore === 'Hot' ? "Hot Lead" : leadScore === 'Cold' ? "Cold Lead" : "Warm Lead",
      bulletPoints: [
        "Klien tertarik dengan layanan pembuatan website modern Next.js.",
        "Menanyakan rincian fasilitas dan estimasi pengerjaan.",
        "Potensi konversi tinggi untuk paket promo."
      ],
      recommendedAction: "Kirimkan proposal penawaran via WhatsApp atau jadwalkan discovery call."
    };

    let generatedByAI = false;

    if (groq) {
      try {
        const prompt = `You are an expert B2B Sales AI for CHESTADOTCOM. Analyze the following chat transcript and return a JSON object strictly matching this schema:
{
  "clientIntent": string (e.g., "Membeli paket promo UMKM Rp540K"),
  "projectScope": string (e.g., "Website portofolio & landing page e-commerce"),
  "leadTier": "Cold Lead" | "Warm Lead" | "Hot Lead",
  "bulletPoints": array of 3 professional summary strings in Indonesian,
  "recommendedAction": string (actionable next step for sales team)
}

Transcript:
${chatText}`;

        const chatCompletion = await groq.chat.completions.create({
          messages: [{ role: "user", content: prompt }],
          model: "llama-3.3-70b-versatile",
          temperature: 0.2,
          response_format: { type: "json_object" }
        });

        const raw = chatCompletion.choices[0]?.message?.content?.trim() || "{}";
        const parsed = JSON.parse(raw);
        const validated = SummarySchema.parse(parsed);
        summaryData = validated;
        generatedByAI = true;
      } catch (err: any) {
        console.warn("Groq summary generation failed, trying Gemini:", err?.message);
      }
    }

    if (!generatedByAI && genAI) {
      try {
        const prompt = `Summarize this client chat for sales admin in JSON with keys: clientIntent, projectScope, leadTier ("Cold Lead" | "Warm Lead" | "Hot Lead"), bulletPoints (array of 3 strings), recommendedAction. Transcript: ${chatText}`;
        const result = await genAI.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt
        });
        const text = result.text || "";
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          const validated = SummarySchema.parse(parsed);
          summaryData = validated;
          generatedByAI = true;
        }
      } catch (gemErr) {
        console.warn("Gemini summary fallback failed:", gemErr);
      }
    }

    const docId = sessionId || `SESSION-${Date.now()}`;
    await adminDb.collection('admin_leads_summary').doc(docId).set({
      sessionId: docId,
      ...summaryData,
      createdAt: new Date(),
      updatedAt: new Date()
    }, { merge: true });

    res.json({ success: true, summary: summaryData });
  } catch (error: any) {
    console.error("Conversation summarization failed:", error);
    res.status(500).json({ error: error.message });
  }
});



// API: AI-Driven Workspace Pruning
app.post("/api/ai/prune-workspace", async (req, res) => {
  res.json({ success: true, pruned: 0, reason: "Pruning delegated to client side." });
});

// API: Get Available Calendar Slots for Smart AI Meeting Scheduler
app.get("/api/calendar/slots", async (req, res) => {
  try {
    const now = new Date();
    const slots = [
      {
        id: 'slot_1',
        dateStr: 'Hari Ini',
        timeStr: '15:00 WIB',
        label: 'Hari Ini, 15:00 WIB',
        datetime: new Date(now.getTime() + 3600000 * 2).toISOString()
      },
      {
        id: 'slot_2',
        dateStr: 'Hari Ini',
        timeStr: '17:00 WIB',
        label: 'Hari Ini, 17:00 WIB',
        datetime: new Date(now.getTime() + 3600000 * 4).toISOString()
      },
      {
        id: 'slot_3',
        dateStr: 'Besok',
        timeStr: '10:00 WIB',
        label: 'Besok, 10:00 WIB',
        datetime: new Date(now.getTime() + 86400000).toISOString()
      },
      {
        id: 'slot_4',
        dateStr: 'Besok',
        timeStr: '14:00 WIB',
        label: 'Besok, 14:00 WIB',
        datetime: new Date(now.getTime() + 86400000 + 14400000).toISOString()
      },
      {
        id: 'slot_5',
        dateStr: 'Lusa',
        timeStr: '11:00 WIB',
        label: 'Lusa, 11:00 WIB',
        datetime: new Date(now.getTime() + 172800000).toISOString()
      }
    ];
    res.json({ success: true, slots });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API: Book Calendar Slot & Sync to Firestore & Admin
app.post("/api/calendar/book", async (req, res) => {
  const { sessionId, slot, clientName, clientPhone, service } = req.body;
  if (!slot || !clientName || !clientPhone) {
    return res.status(400).json({ success: false, error: "Missing slot, clientName, or clientPhone" });
  }

  try {
    const adminDb = getFirestore();
    const bookingId = sessionId || `booking_${Date.now()}`;
    
    const bookingData = {
      isBooking: true,
      sessionId: bookingId,
      clientName,
      phone: clientPhone,
      date: slot.dateStr,
      time: slot.timeStr,
      label: slot.label,
      service: service || 'Discovery Call Konsultasi Website & AI',
      status: 'confirmed',
      createdAt: new Date(),
      source: 'Smart AI Meeting Scheduler'
    };

    await adminDb.collection('ai_chat_sessions').doc(bookingId).set(bookingData, { merge: true });

    res.json({ success: true, bookingId, message: "Discovery Call successfully scheduled." });
  } catch (error: any) {
    console.error("Booking error:", error);
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
    console.log(`Server running on http://localhost:${PORT}`);
  });
})();
