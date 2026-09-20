import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

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

    const systemInstruction = `Anda adalah Chesta Azka, Lead Principal Engineer & Enterprise Architect di CHESTAADOTCOM. 
Jawablah pertanyaan user secara cerdas, relevan, profesional, dan to the point dalam Bahasa Indonesia (atau bahasa yang sesuai pertanyaan). 
Jangan pernah memberikan jawaban template berulang yang memaksakan booking Discovery Call kecuali user secara spesifik menanyakan cara booking, harga, atau jadwal call.
Jika ditanya pertanyaan teknis, berikan penjelasan arsitektur sistem, Next.js, AI automation, atau cloud infrastructure yang mendalam dan informatif.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `${systemInstruction}\n\nPertanyaan User: ${lastUserMessage}`
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
