"use server";

import { GoogleGenAI } from "@google/genai";

export async function fetchMarketTrends() {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return "⚠️ GEMINI_API_KEY is missing. Configure it in settings to enable real-time search.";
    }

    const ai = new GoogleGenAI({ 
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
    });
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Analyze the current real-time market trends for B2B SaaS architecture, specifically regarding Next.js App Router adoption and performance benefits. Give a concise, punchy 3-bullet point summary focusing on enterprise dominance.",
      config: {
        tools: [{ googleSearch: {} }],
      }
    });
    
    return response.text || "Unable to fetch trends at this moment.";
  } catch (error: any) {
    console.error("Error fetching market trends:", error);
    return "Error fetching real-time market trends. Please try again later.";
  }
}
