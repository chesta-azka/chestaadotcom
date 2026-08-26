const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf-8');

const oldChat = /app\.post\("\/api\/chat", async \(req, res\) => \{[\s\S]*?res\.status\(500\)\.json\(\{ error: error\.message \}\);\n    \} else \{\n      res\.end\(\);\n    \}\n  \}\n\}\);/;

const newChat = `app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;
  
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Messages array is required." });
  }

  try {
    const groqKey = process.env.GROQ_API_KEY || "fallback_key";
    const groq = new Groq({ apiKey: groqKey });
    
    const systemPrompt = "Anda adalah Konsultan AI Eksklusif dari CHESTADOTCOM. Jawab dengan ramah, cerdas, dan natural. Fokus pada efisiensi.";
    
    let groqMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.map((m) => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.content
      }))
    ];

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const stream = await groq.chat.completions.create({
      messages: groqMessages,
      model: "llama3-8b-8192", // Standard groq model
      stream: true,
    });
    
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        res.write(\`data: \${JSON.stringify({ text: content })}\\n\\n\`);
      }
    }
    res.write('data: [DONE]\\n\\n');
    res.end();
  } catch (error) {
    console.error("Groq chat failed:", error);
    // Fallback to Gemini if Groq fails
    try {
      if (!genAI) throw new Error("Gemini AI not initialized.");
      const geminiContents = messages.map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }));
      const responseStream = await genAI.models.generateContentStream({
        model: "gemini-1.5-flash",
        systemInstruction: "Anda adalah Konsultan AI Eksklusif dari CHESTADOTCOM. Jawab dengan ramah, cerdas, dan natural.",
        contents: geminiContents,
      });
      for await (const chunk of responseStream) {
        if (chunk.text) {
          res.write(\`data: \${JSON.stringify({ text: chunk.text })}\\n\\n\`);
        }
      }
      res.write('data: [DONE]\\n\\n');
      res.end();
    } catch (fallbackErr) {
      console.error("Gemini fallback also failed:", fallbackErr);
      if (!res.headersSent) {
        res.status(500).json({ error: error.message });
      } else {
        res.end();
      }
    }
  }
});`;

code = code.replace(oldChat, newChat);
fs.writeFileSync('server.ts', code);
