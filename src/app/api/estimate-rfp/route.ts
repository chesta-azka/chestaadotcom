import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI, Type } from '@google/genai';
import { z } from 'zod';

// Define strict Zod schema for RFP Cost Estimator Structured Output
export const rfpEstimateSchema = z.object({
  estimatedWeeks: z.number().int().positive().describe("Estimated duration in weeks for project completion"),
  costTier: z.string().describe("Estimated budget range or cost tier (e.g. 'Rp 15M - Rp 25M' or 'Custom Enterprise Pricing')"),
  summaryBreakdown: z.array(z.string()).describe("List of key technical or project scope summary points"),
  recommendedModules: z.array(z.string()).describe("List of recommended architecture or software modules based on RFP"),
});

export type RFPEstimateResponse = z.infer<typeof rfpEstimateSchema>;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rawText = body?.rfpText || body?.text || '';

    // 1. Input sanitization & validation
    if (!rawText || typeof rawText !== 'string') {
      return NextResponse.json(
        { error: 'RFP text payload is required and must be a valid string.' },
        { status: 400 }
      );
    }

    const trimmedText = rawText.trim();
    if (trimmedText.length < 10) {
      return NextResponse.json(
        { error: 'RFP text is too short. Please provide more detailed specifications (minimum 10 characters).' },
        { status: 400 }
      );
    }

    // Limit maximum length to prevent token abuse / rate limit exhaustion
    const sanitizedText = trimmedText.slice(0, 15000);

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('Gemini API Key missing. Returning intelligent fallback estimate.');
      
      const fallbackResult: RFPEstimateResponse = {
        estimatedWeeks: 4,
        costTier: "Rp 15M - Rp 30M (Estimasi Standar)",
        summaryBreakdown: [
          "Analisis kebutuhan dokumen RFP secara otomatis.",
          "Arsitektur full-stack Next.js berperforma tinggi & aman.",
          "Integrasi database cloud & manajemen state real-time."
        ],
        recommendedModules: [
          "Autentikasi Pengguna & Role-Based Access Control",
          "Dashboard Analitik & Pelaporan Data",
          "Optimasi SEO & Performa Tinggi Core Web Vitals"
        ]
      };
      return NextResponse.json({ success: true, data: fallbackResult, source: 'fallback' });
    }

    // 2. Initialize Gemini SDK
    const ai = new GoogleGenAI({ apiKey });

    // Call Gemini with schema-enforced structured JSON output
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Analyze the provided RFP (Request for Proposal) document text and return a precise JSON response representing estimated weeks, cost tier, summary breakdown, and recommended modules.\n\nRFP Document Text:\n\n${sanitizedText}`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            estimatedWeeks: {
              type: Type.INTEGER,
              description: "Estimated duration in weeks for project completion",
            },
            costTier: {
              type: Type.STRING,
              description: "Estimated budget range or cost tier (e.g. 'Rp 15M - Rp 25M' or 'Custom Enterprise Pricing')",
            },
            summaryBreakdown: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of key technical or project scope summary points",
            },
            recommendedModules: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of recommended architecture or software modules based on RFP",
            },
          },
          required: ["estimatedWeeks", "costTier", "summaryBreakdown", "recommendedModules"],
        },
        systemInstruction: "You are a senior enterprise software architect and RFP technical estimator at CHESTAADOTCOM. Keep estimates realistic, professional, and detailed based on industry standards. Language: Indonesian or English matching RFP content (prefer Indonesian if ambiguous).",
        temperature: 0.3,
      }
    });

    const responseContent = response.text;
    if (!responseContent) {
      throw new Error('Empty response received from Gemini inference engine.');
    }

    // 3. Parse and Validate with Zod
    let parsedJson: unknown;
    try {
      parsedJson = JSON.parse(responseContent);
    } catch (parseErr) {
      console.error('Failed to parse Gemini JSON response:', responseContent);
      throw new Error('Invalid JSON structure returned by LLM.');
    }

    const validatedData = rfpEstimateSchema.parse(parsedJson);

    return NextResponse.json({
      success: true,
      data: validatedData,
      source: 'gemini-2.5-flash'
    });

  } catch (error: any) {
    console.error('RFP Estimation API Error:', error);

    // Handle Zod validation errors specifically
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Structured output validation failed', details: error.issues || (error as any).errors },
        { status: 422 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Internal server error while processing RFP estimation.' },
      { status: 500 }
    );
  }
}
