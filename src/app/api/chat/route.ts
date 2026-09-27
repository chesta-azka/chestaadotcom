import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { searchVectorBrain } from '../../../server/brainManager';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        reply: "Halo! Saya adalah asisten AI Chesta Azka. Maaf, kunci API Gemini belum dikonfigurasi di server, namun Anda bisa menanyakan seputar arsitektur sistem, layanan web (mulai Rp540K), atau menjadwalkan Discovery Call."
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    const lastUserMessage = messages && messages.length > 0 ? messages[messages.length - 1].text : 'Halo';

    // 1. Retrieve Top-2 relevant chunks from Firestore Vector Brain (RAG) - Top-K restricted (1 or 2) for maximum token saving
    let contextStr = '';
    try {
      const searchResult = await searchVectorBrain(lastUserMessage, ai, 2);
      if (searchResult && searchResult.matches && searchResult.matches.length > 0) {
        // Strip out all metadata, object keys, and JSON structure, sending only raw concatenated content strings to minimize tokens
        contextStr = searchResult.matches
          .map(match => `${match.node.content} ${match.node.metadata?.url ? 'Tautan: ' + match.node.metadata.url : ''}`)
          .join(' ');
      }
    } catch (err) {
      console.warn("Vector search failed during RAG retrieval:", err);
    }

    const systemInstruction = `ROLE: Executive Tech Founder at Chestaa. Persona: Gen-Z Anak Jaksel (use words like jujurly, literally, basically, make sense).
GOAL: Aggressive B2B hard selling for digital automation, zero admin error, and extreme ROI.
ULTRA-BREVITY CONSTRAINT: You are strictly limited to a MAXIMUM of 2 to 3 short sentences per response. Stop over-explaining.

FORMATTING RULES:
1. NO MARKDOWN: Never use markdown bold, italics, or markdown list syntax.
2. SUB-POINTS FOR SCANNABILITY: If you need to list items, use literal bullet characters (•) or hyphens (-) followed by a space. Do not write long paragraphs. Keep list items to a few words each.
3. HIGHLIGHT METRICS: Use standard HTML <b> tags exclusively to highlight numbers, percentages, or core benefits (e.g., <b>hemat 60 persen</b>).
4. THE SPLIT CTA: You MUST use the '[SPLIT]' delimiter right before your final closing sentence or question.

EXAMPLE RESPONSE:
Jujurly, manual data entry tuh literally bakar duit, makanya sistem otonom kita kasih benefit ini:
• <b>Pangkas Payroll</b>
• <b>Zero Human Error</b>
• <b>Transaksi Sub-Detik</b>
[SPLIT]
Make sense kan? Lo mau gue hitungin estimasi ROI buat perusahaan lo sekarang?`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `SYSTEM INSTRUCTION:
${systemInstruction}

CONTEXT FROM FIRESTORE KNOWLEDGE GRAPH:
${contextStr || 'No specific reference found. Answer using your own knowledge.'}

PERTANYAAN USER:
${lastUserMessage}`
    });

    const reply = response.text || "Terima kasih atas pertanyaannya. Ada hal teknis atau arsitektur sistem lain yang ingin didiskusikan?";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({
      reply: "Maaf, terjadi kendala saat memproses jawaban AI. Silakan tanyakan kembali atau jadwalkan Discovery Call jika mendesak."
    });
  }
}
