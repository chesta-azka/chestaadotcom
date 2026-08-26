const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf-8');

const target = `    res.setHeader('Content-Type', 'text/event-stream');
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
      const responseStream = await genAI.models.generateContentStream({
        model: "gemini-3.6-flash",
        config: { systemInstruction: "Anda adalah Konsultan AI Eksklusif dari CHESTADOTCOM. Jawab dengan ramah, cerdas, dan natural." },
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
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
      }
      res.write('data: ' + JSON.stringify({ text: "\\n\\n*[Sistem]: Mohon maaf, layanan AI sedang mengalami gangguan jaringan atau melebihi batas kuota. Silakan coba beberapa saat lagi.*" }) + '\\n\\n');
      res.write('data: [DONE]\\n\\n');
      res.end();
    }`;

const replacement = `    const completion = await groq.chat.completions.create({
      messages: groqMessages,
      model: "llama3-8b-8192",
    });
    
    res.json({ reply: completion.choices[0]?.message?.content || "" });
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
      const response = await genAI.models.generateContent({
        model: "gemini-3.6-flash",
        config: { systemInstruction: "Anda adalah Konsultan AI Eksklusif dari CHESTADOTCOM. Jawab dengan ramah, cerdas, dan natural." },
        contents: geminiContents,
      });
      res.json({ reply: response.text });
    } catch (fallbackErr) {
      console.error("Gemini fallback also failed:", fallbackErr);
      if (!res.headersSent) {
        res.status(500).json({ error: "Mohon maaf, layanan AI sedang mengalami gangguan jaringan atau melebihi batas kuota. Silakan coba beberapa saat lagi." });
      }
    }`;

code = code.replace(target, replacement);

if (code.includes('const completion = await groq.chat.completions.create')) {
  fs.writeFileSync('server.ts', code);
  console.log('Successfully applied fix');
} else {
  console.error('Failed to find target string');
}
