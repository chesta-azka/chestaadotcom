const { GoogleGenAI } = require('@google/genai');
async function run() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: 'Hello'
    });
    console.log("3.6-flash success:", response.text);
  } catch (e) {
    console.log("3.6-flash error:", e);
  }
}
run();
