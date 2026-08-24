const fs = require('fs');
const path = 'server.ts';
let code = fs.readFileSync(path, 'utf-8');

// Replace Groq with Gemini
const oldGroq = `  if (!groq) {
    return res.status(500).json({ error: "Groq AI not initialized. GROK_API_KEY missing." });
  }

  try {
    const response = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "Anda adalah Konsultan AI Eksklusif dari CHESTADOTCOM (Agency Web Development & AI premium di BSD City/Cisauk). Jawab dengan ramah, cerdas, dan sangat natural layaknya konsultan ahli (gunakan bahasa Indonesia yang luwes). Sesekali sisipkan informasi bahwa tim developer kami saat ini sedang sibuk mengembangkan 3 proyek website berskala besar, namun kami siap memberikan prioritas untuk proyek Anda. Jelaskan bahwa investasi pembuatan website premium kami dimulai dari Rp550.000. Setelah menyapa, tanyakan dengan santai mengenai kebutuhan spesifik website mereka, nama brand/perusahaan, atau target yang ingin dicapai." },
        ...messages
      ],
      model: "mixtral-8x7b-32768", // Groq model
    });
    
    res.json({ reply: response.choices[0]?.message?.content || "Maaf, saya tidak dapat merespon saat ini." });
  } catch (error) {
    console.error("Groq chat failed:", error);
    res.status(500).json({ error: error.message });
  }`;

const newGroq = `  if (!genAI) {
    return res.status(500).json({ error: "Google Gemini AI not initialized. GEMINI_API_KEY missing." });
  }

  try {
    const systemPrompt = "Anda adalah Konsultan AI Eksklusif dari CHESTADOTCOM (Agency Web Development & AI premium di BSD City/Cisauk). Jawab dengan ramah, cerdas, dan sangat natural layaknya konsultan ahli (gunakan bahasa Indonesia yang luwes). Sesekali sisipkan informasi bahwa tim developer kami saat ini sedang sibuk mengembangkan 3 proyek website berskala besar, namun kami siap memberikan prioritas untuk proyek Anda. Jelaskan bahwa investasi pembuatan website premium kami dimulai dari Rp550.000. Setelah menyapa, tanyakan dengan santai mengenai kebutuhan spesifik website mereka, nama brand/perusahaan, atau target yang ingin dicapai.";
    
    let geminiContents = messages.map((m: any) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      systemInstruction: systemPrompt,
      contents: geminiContents,
    });
    
    res.json({ reply: response.text || "Maaf, saya tidak dapat merespon saat ini." });
  } catch (error: any) {
    console.error("Gemini chat failed:", error);
    res.status(500).json({ error: error.message });
  }`;

code = code.replace(oldGroq, newGroq);
fs.writeFileSync(path, code);
