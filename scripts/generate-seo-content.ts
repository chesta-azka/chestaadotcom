import { GoogleGenAI } from "@google/genai";
import fs from 'fs';
import path from 'path';
import { SEO_SERVICES } from '../src/data/seo-services';
import dotenv from 'dotenv';

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

const CONTENT_FILE = path.join(process.cwd(), 'src/data/generated-service-content.json');

async function generateForService(service: any) {
  const prompt = `
    Generate SEO content for a digital service page.
    Service Name: ${service.name}
    Category: ${service.category}
    
    Requirements:
    1. metaDescription: A concise summary for search results (max 160 characters).
    2. intro: A professional, B2B-focused introduction (approx 200-300 words). 
    3. Tone: High-authority, technical but accessible, engineering-first. Avoid generic "AI slop" buzzwords like "supercharge", "empower", or "revolutionary" unless used in a very concrete context. Focus on ROI, efficiency, and architectural stability.
    4. Language: Indonesian (Bahasa Indonesia).
    
    Return ONLY a valid JSON object:
    {
      "metaDescription": "...",
      "intro": "..."
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });
    
    const text = response.text;
    if (text) {
      return JSON.parse(text);
    }
    throw new Error('No text in response');
  } catch (error) {
    console.error(`Error generating for ${service.id}:`, error);
    return null;
  }
}

async function main() {
  let existingContent = {};
  if (fs.existsSync(CONTENT_FILE)) {
    existingContent = JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf-8'));
  }

  const missingServices = SEO_SERVICES.filter(s => !existingContent[s.id as keyof typeof existingContent]);

  console.log(`Found ${missingServices.length} missing services. Generating first batch...`);

  const batchSize = 3; // Small batch for reliability
  for (let i = 0; i < missingServices.length; i += batchSize) {
    const batch = missingServices.slice(i, i + batchSize);
    console.log(`Processing batch ${i / batchSize + 1} of ${Math.ceil(missingServices.length / batchSize)}...`);
    
    const results = await Promise.all(batch.map(s => generateForService(s)));
    
    batch.forEach((s, idx) => {
      if (results[idx]) {
        existingContent[s.id as keyof typeof existingContent] = results[idx];
      }
    });

    fs.writeFileSync(CONTENT_FILE, JSON.stringify(existingContent, null, 2));
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Limit execution to 15 services per run to stay within turn limits
    if (i >= 12) {
       console.log('Stopping after 15 services to ensure script completes within environment limits.');
       break;
    }
  }

  console.log('Batch generation complete.');
}

main();
