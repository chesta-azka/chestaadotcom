import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function GET(req: NextRequest) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q') || 'Latest trends in B2B SaaS architecture and AI automation';
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Provide a short, 3-bullet point summary of the latest industry trends regarding: ${query}. Focus on enterprise, Next.js, and AI. Return ONLY a valid JSON object matching this schema: { "trends": ["trend 1", "trend 2", "trend 3"] }. Do not include markdown formatting or backticks.`,
      config: {
        responseMimeType: "application/json",
        tools: [{ googleSearch: {} }],
      }
    });

    const text = response.text || '{"trends":[]}';
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (e) {
      // Clean up markdown block if model ignored the prompt
      const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
      parsed = JSON.parse(cleaned);
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error('Error fetching trends:', error);
    return NextResponse.json({ 
      trends: [
        "AI-driven automation is accelerating B2B workflows.", 
        "Next.js App Router is dominating enterprise frontends.", 
        "Serverless edge computing reduces global latency."
      ] 
    });
  }
}
