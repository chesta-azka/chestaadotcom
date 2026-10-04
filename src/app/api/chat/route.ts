import { streamText, tool } from 'ai';
import { google } from '@ai-sdk/google';
import { groq } from '@ai-sdk/groq';
import { z } from 'zod';
import { CHESTAA_SYSTEM_PROMPT } from '../../../lib/ai-prompt';
import { db } from '../../../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const bookAuditTool = tool({
    description: 'Saves the executive lead contact information directly to the database.',
    parameters: z.object({
      name: z.string(),
      company: z.string(),
      phone: z.string()
    }),
    execute: async ({ name, company, phone }: { name: string; company: string; phone: string }) => {
      try {
        if (db) {
          await addDoc(collection(db, 'audit_leads'), {
            name,
            company,
            phone,
            timestamp: new Date().toISOString()
          });
        }
      } catch (e) {
        console.error('Failed to save audit lead to Firestore:', e);
      }

      return 'Terima kasih banyak atas kepercayaannya, Bapak/Ibu ' + name + '. Data Anda sudah kami simpan dengan aman. Mas Chesta akan segera menghubungi Anda secara personal untuk membantu meringankan beban operasional di ' + company + '. Kami siap membantu Anda beristirahat dari urusan teknis yang rumit.';
    }
  } as any);

  const tools = {
    bookAudit: bookAuditTool
  };

  try {
    const result = streamText({
      model: groq('llama3-70b-8192'),
      system: CHESTAA_SYSTEM_PROMPT,
      messages,
      tools
    });
    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Groq fallback triggered:', error);
    try {
      const result = streamText({
        model: google('gemini-1.5-flash'),
        system: CHESTAA_SYSTEM_PROMPT,
        messages,
        tools
      });
      return result.toTextStreamResponse();
    } catch (fallbackError) {
      console.error('Gemini fallback also failed:', fallbackError);
      return new Response(JSON.stringify({ error: 'AI Concierge service temporarily unavailable.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
}
