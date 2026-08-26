const { GoogleGenAI } = require('@google/genai');
async function run() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: 'Hello'
    });
    console.log("1.5-flash success:", response.text);
  } catch (e) {
    console.log("1.5-flash error:", e.message);
  }
  try {
    const response2 = await ai.models.generateContent({
      model: 'gemini-1.5-flash-8b',
      contents: 'Hello'
    });
    console.log("1.5-flash-8b success:", response2.text);
  } catch (e) {
    console.log("1.5-flash-8b error:", e.message);
  }
}
run();
