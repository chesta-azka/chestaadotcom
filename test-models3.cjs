const { GoogleGenAI } = require('@google/genai');
async function run() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const models = ['gemini-3.6-flash'];
  for (const m of models) {
    try {
      const response = await ai.models.generateContent({
        model: m,
        contents: 'Hello'
      });
      console.log(m + " success");
    } catch (e) {
      console.log(m + " error:", e.message);
    }
  }
}
run();
