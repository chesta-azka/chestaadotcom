const fs = require('fs');
const path = 'server.ts';
let code = fs.readFileSync(path, 'utf-8');

// Add firebase-admin import
const adminImport = `import admin from 'firebase-admin';\nif (admin.apps.length === 0) { admin.initializeApp({ projectId: 'core-lambda-wcf5x' }); }\n`;
if (!code.includes('firebase-admin')) {
  code = code.replace(/import { GoogleGenAI } from "@google\/genai";/, `import { GoogleGenAI } from "@google/genai";\n${adminImport}`);
}

// Add Auth Middleware
const authMiddleware = `
// Middleware to verify Firebase ID Token
const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid Authorization header' });
  }
  const token = authHeader.split('Bearer ')[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};
`;

if (!code.includes('verifyFirebaseToken')) {
  code = code.replace(/const app = express\(\);/, `const app = express();\n${authMiddleware}`);
}

// Protect SEO Audit
code = code.replace(/app\.post\("\/api\/ai\/seo-audit", async \(req, res\) => \{/, `app.post("/api/ai/seo-audit", verifyFirebaseToken, async (req, res) => {`);

// Update Chat to Streaming
const oldChat = /app\.post\("\/api\/chat", async \(req, res\) => \{[\s\S]*?res\.status\(500\)\.json\(\{ error: error\.message \}\);\n  \}\n\}\);/;
const newChat = `app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;
  
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Messages array is required." });
  }
  
  if (!genAI) {
    return res.status(500).json({ error: "Google Gemini AI not initialized." });
  }

  try {
    const systemPrompt = "Anda adalah Konsultan AI Eksklusif dari CHESTADOTCOM. Jawab dengan ramah, cerdas, dan natural.";
    
    let geminiContents = messages.map((m: any) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    // Setup streaming
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const responseStream = await genAI.models.generateContentStream({
      model: "gemini-1.5-flash",
      systemInstruction: systemPrompt,
      contents: geminiContents,
    });
    
    for await (const chunk of responseStream) {
      if (chunk.text) {
        res.write(\`data: \${JSON.stringify({ text: chunk.text })}\\n\\n\`);
      }
    }
    res.write('data: [DONE]\\n\\n');
    res.end();
  } catch (error: any) {
    console.error("Gemini chat failed:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: error.message });
    } else {
      res.end();
    }
  }
});`;

code = code.replace(oldChat, newChat);

fs.writeFileSync(path, code);
