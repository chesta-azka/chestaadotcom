const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf-8');

const targetChat = `app.post("/api/chat", async (req, res) => {
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
    const groqKey = process.env.GROQ_API_KEY;
    if (!groqKey) throw new Error("SKIP_GROQ");
    const groq = new Groq({ apiKey: groqKey });
    
    const systemPrompt = \`Anda adalah Konsultan AI Eksklusif dari CHESTADOTCOM. Jawab dengan ramah, cerdas, dan natural. Saat ini user sedang berada di halaman "\${pageTitle || 'Beranda'}" (Path: \${pagePath || '/'}). Gunakan konteks halaman ini untuk memberikan jawaban.

\${systemContext ? 'Konteks Tambahan (Wajib Diperhatikan):\\n' + systemContext : ''}

Data harga layanan yang FIX dan WAJIB kamu ikuti:
- Custom Website (Enterprise/Premium): Mulai dari Rp 15.000.000 (Tergantung kompleksitas fitur).
- Paket UMKM Starter: Rp 5.000.000 (Cocok untuk company profile, SEO Basic).
- E-Commerce Web: Mulai dari Rp 10.000.000 (Payment gateway, katalog produk).
- Integrasi Agentic AI: Mulai dari Rp 8.000.000 (Custom AI chatbot, data internal).

PENTING:
1. Jika memberikan informasi harga atau bisnis, Anda WAJIB menyertakan rujukan di akhir kalimat (misal: [Lihat Detail Harga](/services) atau [Konsultasi WhatsApp](https://wa.me/6282125447232)).
2. Jika Anda ingin memberikan saran pertanyaan lanjutan (opsi) kepada user, JANGAN menyuruh mereka mengetik angka. Sebagai gantinya, WAJIB sertakan opsi tersebut di baris paling bawah dari jawaban Anda dengan format persis seperti ini (harus menggunakan tag <opsi>):
<opsi>Pertanyaan atau pilihan 1</opsi>
<opsi>Pertanyaan atau pilihan 2</opsi>
\`;
    
    let groqMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.map((m) => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.content
      }))
    ];

    const stream = await groq.chat.completions.create({
      messages: groqMessages,
      model: "llama3-8b-8192",
      stream: true,
    });
    
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      if (content) {
        res.write(content);
      }
    }
    res.end();
  } catch (error) {
    if (error.message !== "SKIP_GROQ") {
      console.warn("Groq chat fallback triggered.");
    }
    // Fallback to Gemini if Groq fails
    try {
      if (!genAI) throw new Error("Gemini AI not initialized.");
      const geminiContents = messages.map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }));
      const streamResponse = await genAI.models.generateContentStream({
        model: "gemini-3.6-flash",
        config: { systemInstruction: "Anda adalah Konsultan AI Eksklusif dari CHESTADOTCOM. Jawab dengan ramah, cerdas, dan natural. DILARANG KERAS memberikan pertanyaan di akhir jawaban (seperti 'Ada yang bisa dibantu?', 'Bagaimana menurut Anda?'). Jika memberikan pilihan, selalu akhiri jawaban dengan opsi untuk diklik user (contoh: 'Ketik 1 untuk A, 2 untuk B, atau Ya/Lanjut untuk melihat lebih detail') lalu berhenti." },
        contents: geminiContents,
      });
      
      for await (const chunk of streamResponse) {
        if (chunk.text) {
          res.write(chunk.text);
        }
      }
      res.end();
    } catch (fallbackErr) {
      console.error("Gemini fallback also failed:", fallbackErr);
      if (!res.headersSent) {
        res.status(500).json({ error: "Mohon maaf, layanan AI sedang mengalami gangguan jaringan atau melebihi batas kuota. Silakan coba beberapa saat lagi." });
      } else {
        res.end();
      }
    }
  }
});`;

const replacementChat = `app.post("/api/chat", async (req, res) => {
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
    const systemPrompt = \`Anda adalah Konsultan AI Eksklusif dari CHESTADOTCOM. Jawab dengan ramah, cerdas, dan natural. Saat ini user sedang berada di halaman "\${pageTitle || 'Beranda'}" (Path: \${pagePath || '/'}). Gunakan konteks halaman ini untuk memberikan jawaban.

\${systemContext ? 'Konteks Tambahan (Wajib Diperhatikan):\\n' + systemContext : ''}

Data harga layanan yang FIX dan WAJIB kamu ikuti:
- Custom Website (Enterprise/Premium): Mulai dari Rp 15.000.000 (Tergantung kompleksitas fitur).
- Paket UMKM Starter: Rp 5.000.000 (Cocok untuk company profile, SEO Basic).
- E-Commerce Web: Mulai dari Rp 10.000.000 (Payment gateway, katalog produk).
- Integrasi Agentic AI: Mulai dari Rp 8.000.000 (Custom AI chatbot, data internal).

PENTING:
1. Jika ditanya tentang harga terkini pasar, tren, atau layanan kompetitor, gunakan Google Search untuk memverifikasi.
2. Jika memberikan informasi harga atau bisnis, Anda WAJIB menyertakan rujukan di akhir kalimat (misal: [Lihat Detail Harga](/services) atau [Konsultasi WhatsApp](https://wa.me/6282125447232)).
3. Jika Anda ingin memberikan saran pertanyaan lanjutan (opsi) kepada user, JANGAN menyuruh mereka mengetik angka. Sebagai gantinya, WAJIB sertakan opsi tersebut di baris paling bawah dari jawaban Anda dengan format persis seperti ini (harus menggunakan tag <opsi>):
<opsi>Pertanyaan atau pilihan 1</opsi>
<opsi>Pertanyaan atau pilihan 2</opsi>
\`;

    if (!genAI) throw new Error("Gemini AI not initialized.");

    const geminiContents = messages.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const streamResponse = await genAI.models.generateContentStream({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
        tools: [{ googleSearch: {} }], // Enable Google Search grounding
      },
      contents: geminiContents,
    });
    
    for await (const chunk of streamResponse) {
      if (chunk.text) {
        res.write(chunk.text);
      }
    }
    res.end();
  } catch (error) {
    console.error("Chat API failed:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Mohon maaf, layanan AI sedang mengalami gangguan jaringan atau melebihi batas kuota. Silakan coba beberapa saat lagi." });
    } else {
      res.end();
    }
  }
});`;

content = content.replace(targetChat, replacementChat);
fs.writeFileSync('server.ts', content);
