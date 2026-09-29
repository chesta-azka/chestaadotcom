import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { searchVectorBrain } from '../../../server/brainManager';

// In-memory rate limiter: Map<identifier, timestamps[]>
const rateLimitMap = new Map<string, number[]>();

export async function POST(req: NextRequest) {
  try {
    const { messages, sessionId, personalization } = await req.json();
    const clientIdentifier = sessionId || req.headers.get('x-forwarded-for') || 'anonymous';

    // 1. Anti-Spam Throttling (max 5 requests per 30 seconds per session)
    const now = Date.now();
    const windowMs = 30000;
    const maxRequests = 5;
    const timestamps = rateLimitMap.get(clientIdentifier) || [];
    const recentTimestamps = timestamps.filter(t => now - t < windowMs);

    if (recentTimestamps.length >= maxRequests) {
      return NextResponse.json({
        reply: "Sabar bos, server gue lagi ngalkulasi data lo nih. Tarik nafas sebentar ya!"
      }, { status: 429 });
    }
    recentTimestamps.push(now);
    rateLimitMap.set(clientIdentifier, recentTimestamps);

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        reply: "Halo! Gue Chestaa. Maaf API key belum disetup, tapi basically arsitektur kita siap bantu bisnis lo scale-up."
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    const lastUserMessage = messages && messages.length > 0 ? messages[messages.length - 1].text : 'Halo';

    // 2. Auto-Mirroring Tone Check (Formal vs Gen-Z Jaksel)
    const formalKeywords = ['selamat pagi', 'terima kasih', 'mohon', 'saya', 'bapak', 'ibu', 'yth', 'berkenan'];
    const isFormal = formalKeywords.some(kw => lastUserMessage.toLowerCase().includes(kw));

    // 3. Lead Capture & WhatsApp Regex Check
    const waRegex = /(08[0-9]{8,11}|\+628[0-9]{8,11})/g;
    const foundWa = lastUserMessage.match(waRegex);
    if (foundWa) {
      console.log(`[LEAD CAPTURE WEBHOOK PING] Founder notified of high-intent WhatsApp lead: ${foundWa[0]}`);
    }

    // 4. Pre-filter basic intent
    const cleanInquiry = lastUserMessage.toLowerCase().trim().replace(/[?.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    const isBasicGreeting = ['halo', 'hai', 'hi', 'p', 'pagi', 'siang', 'sore', 'malam', 'test', 'tes', 'hello', 'oi'].includes(cleanInquiry);
    const isBasicInquiry = [
      'ini apa', 'ini apa ya', 'chestaa itu apa', 'kalian ngapain', 'layanan ini buat apa', 
      'apa ini', 'what is this', 'chestaa apa', 'apa itu chestaa', 'layanan apa ini',
      'chestaa', 'buat apa ini', 'fungsi chestaa', 'kalian buat apa'
    ].some(phrase => cleanInquiry.includes(phrase) || cleanInquiry === 'apa');

    let contextStr = '';
    if (!isBasicGreeting && !isBasicInquiry) {
      try {
        const searchResult = await searchVectorBrain(lastUserMessage, ai, 2);
        if (searchResult && searchResult.matches && searchResult.matches.length > 0) {
          contextStr = searchResult.matches
            .map(match => `${match.node.content} ${match.node.metadata?.url ? 'Tautan: ' + match.node.metadata.url : ''}`)
            .join(' ');
        }
      } catch (err) {
        console.warn("Vector search failed:", err);
      }
    }

    const personaInstruction = isFormal 
      ? `ROLE: Professional Executive Consultant at Chestaa. 
TONE: Formal, corporate, polite, and highly structured Indonesian. 
GOAL: Deliver authoritative enterprise architecture solutions and ROI estimates with precise professionalism.
FORMATTING: Use HTML <b> for metrics and [SPLIT] for multi-bubble closing CTA.`
      : `ROLE: Executive Tech Founder at Chestaa. 
PERSONA: Gen-Z Anak Jaksel (use words like jujurly, literally, basically, make sense). You MUST sound like a human chatting casually on WhatsApp. Never sound formal or robotic.
GOAL: Aggressive B2B hard selling for digital automation, zero admin error, and extreme ROI. Focus on providing direct solutions.
ULTRA-BREVITY CONSTRAINT: Maximum 2 short sentences per response. Answer instantly.
FORMATTING: NO MARKDOWN. Use literal bullets (•). Use HTML <b> for highlights. Use HTML <a> for links. Use '[SPLIT]' right before final closing CTA.`;

    const personalContextStr = personalization?.name ? `User Name: ${personalization.name}. Business: ${personalization.business || 'General'}.` : '';

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `SYSTEM INSTRUCTION:
${personaInstruction}

PERSONALIZATION DATA:
${personalContextStr}

KNOWLEDGE BASE:
${contextStr || 'No specific reference found. Answer using your own knowledge.'}

PERTANYAAN USER:
${lastUserMessage}`,
      config: {
        temperature: 0.1,
        topP: 0.8
      }
    });

    const reply = response.text || "Basically kita siap bantu bisnis lo scale-up. [SPLIT] Lo mau gue hitungin ROI sekarang?";
    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json({
      reply: "Sabar bos, server gue lagi ngalkulasi data lo nih. Coba kirim ulang ya!"
    }, { status: 500 });
  }
}
