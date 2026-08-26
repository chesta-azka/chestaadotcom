const { GoogleGenAI } = require('@google/genai');
async function run() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: 'Hello',
      systemInstruction: 'You are a cat.' // wrong location
    });
    console.log("Success with top level:", response.text);
  } catch (e) {
    console.log("Error with top level:", e);
  }
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: 'Hello',
      config: {
        systemInstruction: 'You are a cat.' // correct location
      }
    });
    console.log("Success with config:", response.text);
  } catch (e) {
    console.log("Error with config:", e);
  }
}
run();
