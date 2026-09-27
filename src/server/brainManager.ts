import fs from 'fs';
import path from 'path';
import { db } from '../lib/firebase';
import { collection, getDocs, doc, setDoc, deleteDoc, limit, query } from 'firebase/firestore';

export interface ServerKnowledgeNode {
  id: string;
  title: string;
  content: string;
  category: 'architecture' | 'pricing' | 'performance' | 'seo' | 'automation' | 'auto_learned';
  embedding: number[];
  source: 'manual_injection' | 'auto_learning' | 'system_seed';
  confidence: number;
  syncedAt: string;
  accessCount: number;
  tags: string[];
  metadata?: {
    url?: string;
  };
}

export interface SearchMatch {
  node: ServerKnowledgeNode;
  similarity: number;
}

let firebaseConfig: any = null;
try {
  const cfgPath = path.resolve(process.cwd(), 'firebase-applet-config.json');
  if (fs.existsSync(cfgPath)) {
    firebaseConfig = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
  }
} catch (e) {
  console.warn("Could not read firebase-applet-config.json:", e);
}

const DATABASE_ID = firebaseConfig?.firestoreDatabaseId || "ai-studio-07319849-f721-4705-badf-87d9debdf6a5";
const PROJECT_ID = firebaseConfig?.projectId || "core-lambda-wcf5x";
const API_KEY = firebaseConfig?.apiKey || "";

function getFirestoreBaseUrl(): string {
  return `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/${DATABASE_ID}/documents/knowledge_nodes`;
}

// In-memory vector cache for sub-millisecond similarity scoring
let inMemoryNodes: ServerKnowledgeNode[] = [];
let isInitialized = false;

/**
 * Generate a 3072-dimensional vector embedding using Google GenAI SDK (gemini-embedding-001)
 */
export async function getVectorEmbedding(text: string, genAI: any): Promise<number[]> {
  const cleanInput = (text || '').trim().slice(0, 8000);
  if (!cleanInput) return new Array(128).fill(0);

  if (genAI) {
    try {
      const response = await genAI.models.embedContent({
        model: "gemini-embedding-001",
        contents: cleanInput,
      });

      if (response?.embeddings?.[0]?.values && response.embeddings[0].values.length > 0) {
        return response.embeddings[0].values;
      }
    } catch (err: any) {
      console.warn("Gemini embedding API call failed, using semantic fallback:", err?.message || err);
    }
  }

  // Robust deterministic semantic hash vector fallback (normalized 128-dimensions)
  return generateDeterministicSemanticVector(cleanInput);
}

function generateDeterministicSemanticVector(text: string, dims = 128): number[] {
  const vec = new Array(dims).fill(0);
  const words = text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
  
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    let hash = 0;
    for (let j = 0; j < word.length; j++) {
      hash = (hash * 31 + word.charCodeAt(j)) | 0;
    }
    const idx = Math.abs(hash) % dims;
    vec[idx] += 1;
  }

  // Normalize vector to unit length
  let norm = 0;
  for (let i = 0; i < dims; i++) norm += vec[i] * vec[i];
  norm = Math.sqrt(norm);
  if (norm > 0) {
    for (let i = 0; i < dims; i++) vec[i] /= norm;
  }
  return vec;
}

/**
 * Compute cosine similarity between two numeric vectors
 */
export function computeCosineSimilarity(vecA: number[], vecB: number[]): number {
  if (!vecA || !vecB || vecA.length === 0 || vecB.length === 0) return 0;
  let dot = 0;
  let normA = 0;
  let normB = 0;
  const len = Math.min(vecA.length, vecB.length);
  for (let i = 0; i < len; i++) {
    dot += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Sync knowledge nodes from Firestore into in-memory brain
 */
export async function syncNodesFromFirestore(): Promise<ServerKnowledgeNode[]> {
  try {
    const colRef = collection(db, 'knowledge_nodes');
    const q = query(colRef, limit(200));
    const snapshot = await getDocs(q);
    const nodes: ServerKnowledgeNode[] = [];
    
    snapshot.forEach((document) => {
      const data = document.data();
      nodes.push({
        id: document.id,
        title: data.title || 'Untitled Knowledge Node',
        content: data.content || '',
        category: data.category || 'architecture',
        embedding: data.embedding || [],
        source: data.source || 'manual_injection',
        confidence: data.confidence ?? 0.95,
        syncedAt: data.syncedAt || new Date().toISOString(),
        accessCount: Number(data.accessCount ?? 0),
        tags: data.tags || [],
        metadata: data.metadata || { url: data.metadata?.url || '' }
      });
    });

    inMemoryNodes = nodes;
    isInitialized = true;
    return inMemoryNodes;
  } catch (err) {
    console.error("Error syncing nodes from Firestore:", err);
    return inMemoryNodes;
  }
}

/**
 * Semantic chunking with 15% character overlap to prevent context loss between consecutive chunks
 */
export function splitIntoSemanticChunks(text: string, chunkSize = 400, overlapRatio = 0.15): string[] {
  const clean = (text || '').trim();
  if (clean.length <= chunkSize) return [clean];

  const overlap = Math.max(1, Math.round(chunkSize * overlapRatio)); // 15% overlap
  const step = Math.max(1, chunkSize - overlap);
  const chunks: string[] = [];

  let start = 0;
  while (start < clean.length) {
    let end = Math.min(clean.length, start + chunkSize);
    // Find natural sentence or paragraph boundary around end if possible
    if (end < clean.length) {
      const windowSearch = clean.slice(start + Math.floor(chunkSize * 0.7), end);
      const lastBreak = windowSearch.search(/[\.\!\?\n]/);
      if (lastBreak !== -1) {
        end = start + Math.floor(chunkSize * 0.7) + lastBreak + 1;
      }
    }
    const chunk = clean.slice(start, end).trim();
    if (chunk.length > 0) {
      chunks.push(chunk);
    }
    if (end >= clean.length) break;
    start += step;
  }
  return chunks;
}

/**
 * Ingest, chunk with 15% overlap, vectorize, and write knowledge nodes to Firestore
 */
export async function injectSemanticChunkedKnowledge(params: {
  title: string;
  content: string;
  category: ServerKnowledgeNode['category'];
  tags?: string[];
  source?: ServerKnowledgeNode['source'];
  genAI: any;
}): Promise<ServerKnowledgeNode[]> {
  const { title, content, category, tags = [], source = 'manual_injection', genAI } = params;
  const chunks = splitIntoSemanticChunks(content, 450, 0.15); // 15% character overlap
  const savedNodes: ServerKnowledgeNode[] = [];

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const chunkTitle = chunks.length > 1 ? `${title} (Part ${i + 1}/${chunks.length})` : title;
    const embedding = await getVectorEmbedding(`${chunkTitle}: ${chunk}`, genAI);

    const node: ServerKnowledgeNode = {
      id: `node_${Date.now()}_${i}_${Math.random().toString(36).substring(2, 6)}`,
      title: chunkTitle,
      content: chunk,
      category: category || 'architecture',
      embedding,
      source,
      confidence: 1.0,
      syncedAt: new Date().toISOString(),
      accessCount: 0,
      tags: [...tags, chunks.length > 1 ? `Chunk ${i + 1}/${chunks.length}` : 'Full Node', 'Semantic-Overlap-15%']
    };

    const ok = await writeNodeToFirestore(node);
    if (ok) {
      savedNodes.push(node);
    }
  }

  return savedNodes;
}

/**
 * Write a node to Firestore using the REST API
 */
export async function writeNodeToFirestore(node: ServerKnowledgeNode): Promise<boolean> {
  try {
    const docRef = doc(db, 'knowledge_nodes', node.id);
    await setDoc(docRef, {
      title: node.title,
      content: node.content,
      category: node.category,
      source: node.source,
      confidence: node.confidence,
      accessCount: node.accessCount,
      syncedAt: node.syncedAt || new Date().toISOString(),
      tags: node.tags || [],
      embedding: node.embedding || [],
      metadata: node.metadata || { url: '' }
    }, { merge: true });

    // Update in-memory cache immediately
    const existingIdx = inMemoryNodes.findIndex(n => n.id === node.id);
    if (existingIdx >= 0) {
      inMemoryNodes[existingIdx] = node;
    } else {
      inMemoryNodes.unshift(node);
    }

    return true;
  } catch (err) {
    console.error("writeNodeToFirestore error:", err);
    return false;
  }
}

/**
 * Search the Vector Brain with a user query string
 */
export async function searchVectorBrain(
  query: string, 
  genAI: any, 
  topK = 3
): Promise<{ matches: SearchMatch[]; latencyMs: number; topScore: number }> {
  const startTime = performance.now();

  if (!isInitialized || inMemoryNodes.length === 0) {
    await syncNodesFromFirestore();
  }

  if (inMemoryNodes.length === 0) {
    return { matches: [], latencyMs: 0, topScore: 0 };
  }

  const queryVector = await getVectorEmbedding(query, genAI);

  const scoredMatches: SearchMatch[] = [];
  for (const node of inMemoryNodes) {
    let similarity = 0;
    if (node.embedding && node.embedding.length > 0) {
      similarity = computeCosineSimilarity(queryVector, node.embedding);
    } else {
      // Keyword fallback match if embedding vector was not populated
      const qWords = query.toLowerCase().split(/\s+/).filter(w => w.length > 2);
      const textMatch = (node.title + ' ' + node.content).toLowerCase();
      let matchedCount = 0;
      for (const w of qWords) {
        if (textMatch.includes(w)) matchedCount++;
      }
      similarity = qWords.length > 0 ? (matchedCount / qWords.length) * 0.75 : 0;
    }

    scoredMatches.push({
      node,
      similarity: Number(similarity.toFixed(4))
    });
  }

  scoredMatches.sort((a, b) => b.similarity - a.similarity);
  const latencyMs = Math.round(performance.now() - startTime);
  const topMatches = scoredMatches.slice(0, topK);
  const topScore = topMatches[0]?.similarity || 0;

  return {
    matches: topMatches,
    latencyMs,
    topScore
  };
}

/**
 * Auto-Learning Loop: Encapsulate new Q&A pair, vectorize it, and save back into Firestore
 */
export async function autoLearnNewContext(
  userQuery: string,
  aiAnswer: string,
  genAI: any
): Promise<ServerKnowledgeNode | null> {
  try {
    const qClean = userQuery.trim().slice(0, 150);
    const aClean = sanitizeExecutiveProse(aiAnswer).slice(0, 800);
    if (qClean.length < 5 || aClean.length < 20) return null;

    const nodeId = `autolearn_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const title = `Insight: ${qClean}`;
    const content = `Pertanyaan Klien: ${qClean}. Analisis Solusi: ${aClean}`;
    
    // Generate vector embedding for the new knowledge
    const embedding = await getVectorEmbedding(`${title} ${content}`, genAI);

    const newNode: ServerKnowledgeNode = {
      id: nodeId,
      title,
      content,
      category: 'auto_learned',
      embedding,
      source: 'auto_learning',
      confidence: 0.92,
      syncedAt: new Date().toISOString(),
      accessCount: 1,
      tags: ['Auto-Learned', 'Continuous Intelligence', 'Client Inquiry']
    };

    const saved = await writeNodeToFirestore(newNode);
    if (saved) {
      console.log(`[BRAIN AUTO-LEARNING] Successfully synthesized and indexed new node: "${newNode.title}"`);
      return newNode;
    }
    return null;
  } catch (err) {
    console.error("Auto-learning loop failed:", err);
    return null;
  }
}

/**
 * Seed initial core knowledge nodes if Firestore is empty
 */
export async function seedCoreKnowledgeNodes(genAI: any): Promise<number> {
  const currentNodes = await syncNodesFromFirestore();
  if (currentNodes.length > 0) return currentNodes.length;

  const coreKnowledge = [
    {
      id: 'node_arch_nextjs15',
      title: 'Arsitektur Next.js 15 Sub-Detik & Core Web Vitals 100/100',
      category: 'architecture' as const,
      content: 'CHESTADOTCOM merancang seluruh aplikasi web menggunakan arsitektur Next.js 15 App Router, React Server Components, Tailwind CSS, dan dynamic edge caching. Pendekatan ini menjamin waktu muat sub-detik serta skor Core Web Vitals 100 per 100 yang memangkas bounce rate hingga 40 persen dan menurunkan biaya iklan perolehan CPA Google dan Meta hingga 35 persen.',
      tags: ['Next.js 15', 'Core Web Vitals', 'Performance', 'Sub-Detik']
    },
    {
      id: 'node_pricing_umkm',
      title: 'Transparansi Investasi: Paket Inisiasi UMKM Rp540.000',
      category: 'pricing' as const,
      content: 'Paket inisiasi standar UMKM ditawarkan dengan nilai promo 540 ribu rupiah all-in untuk durasi pengerjaan 1 hingga 3 hari kerja. Paket mencakup domain dot com 1 tahun, cloud hosting kilat, desain responsif mobile, dan kepemilikan penuh source code tanpa biaya langganan bulanan platform tertutup.',
      tags: ['Harga', 'Biaya', 'Paket Promo', 'UMKM', '540K']
    },
    {
      id: 'node_pricing_custom',
      title: 'Solusi Bisnis & Arsitektur Kustom Rp2.5M Hingga Rp8M+',
      category: 'pricing' as const,
      content: 'Untuk kebutuhan bisnis skala menengah ke atas, CHESTADOTCOM menyediakan arsitektur kustom dengan rentang investasi mulai dari 2.5 juta rupiah hingga 8 juta rupiah ke atas tergantung pada kompleksitas basis data produk, integrasi payment gateway, alur automasi WhatsApp, dan sistem manajemen pengguna.',
      tags: ['Custom', 'Enterprise', 'Bespoke', 'Integrasi']
    },
    {
      id: 'node_seo_bsd_tangerang',
      title: 'Dominasi SEO Lokal Google Maps BSD City & Tangerang',
      category: 'seo' as const,
      content: 'Strategi optimasi mesin pencari mencakup implementasi Schema Markup terstruktur LocalBusiness dan Article, optimasi kata kunci intent transaksional kawasan BSD City, Serpong, Cisauk, Alam Sutera, dan Tangerang, serta metadata OpenGraph dinamis untuk menduduki peringkat utama pada Google Search dan Google Maps.',
      tags: ['SEO Lokal', 'Google Maps', 'BSD City', 'Tangerang', 'Schema']
    },
    {
      id: 'node_automation_ai_agents',
      title: 'Agen AI Mandiri & Automasi Pipeline Operasional',
      category: 'automation' as const,
      content: 'Kami mengintegrasikan agen AI mandiri berbasis model multimodal Gemini untuk kualifikasi prospek otomatis, sinkronisasi data ke CRM, pemrosesan dokumen cerdas, dan interaksi percakapan natural tanpa latensi dengan standar keamanan data tingkat enterprise.',
      tags: ['AI Agent', 'Otomasi', 'CRM', 'Pipeline']
    },
    {
      id: 'node_arch_ownership',
      title: '100% Hak Milik Source Code & Zero Vendor Lock-in',
      category: 'architecture' as const,
      content: 'Klien CHESTADOTCOM mendapatkan serah terima 100 persen repositori kode sumber, hak cipta penuh, dan konfigurasi cloud mandiri. Kami menolak model vendor lock-in yang membebankan sewa platform bulanan terus menerus kepada pemilik bisnis.',
      tags: ['Hak Milik', 'Source Code', 'Zero Lock-in', 'Kebebasan']
    }
  ];

  let seededCount = 0;
  for (const item of coreKnowledge) {
    const embedding = await getVectorEmbedding(`${item.title} ${item.content}`, genAI);
    const node: ServerKnowledgeNode = {
      ...item,
      embedding,
      source: 'system_seed',
      confidence: 0.98,
      syncedAt: new Date().toISOString(),
      accessCount: 1
    };
    const ok = await writeNodeToFirestore(node);
    if (ok) seededCount++;
  }

  console.log(`[BRAIN SEED] Populated ${seededCount} core knowledge nodes in Firestore.`);
  return seededCount;
}

/**
 * Strip all markdown bullets, asterisks, bold markers, and format into clean executive paragraphs.
 */
export function sanitizeExecutiveProse(raw: string): string {
  if (!raw) return '';
  return raw
    .replace(/<opsi>[\s\S]*?<\/opsi>/gi, '') // Strip option tags
    .replace(/\*\*(.*?)\*\*/g, '$1')         // Strip bold markers
    .replace(/\*(.*?)\*/g, '$1')             // Strip italic markers
    .replace(/__(.*?)__/g, '$1')             // Strip underline bold
    .replace(/_(.*?)_/g, '$1')               // Strip underline italic
    .replace(/^[\s]*[•\*\-][\s]+/gm, '')     // Strip bullet points
    .replace(/^[\s]*[0-9]+[\.\)][\s]+/gm, '')// Strip numbered list markers
    .replace(/#{1,6}\s+/g, '')               // Strip markdown headers
    .replace(/`{1,3}[^`]*`{1,3}/g, (m) => m.replace(/`/g, '')) // Strip code ticks
    .replace(/\*/g, '')                      // Strip any remaining asterisks
    .replace(/\n{3,}/g, '\n\n')              // Normalize multi-newlines to 2
    .trim();
}

/**
 * Delete a node from Firestore and in-memory cache
 */
export async function deleteNodeFromFirestore(nodeId: string): Promise<boolean> {
  // 1. Remove from in-memory cache
  inMemoryNodes = inMemoryNodes.filter(n => n.id !== nodeId);

  try {
    const docRef = doc(db, 'knowledge_nodes', nodeId);
    await deleteDoc(docRef);
    return true;
  } catch (err) {
    console.error("deleteNodeFromFirestore error:", err);
    return false;
  }
}

/**
 * Return current in-memory node list for admin visualization
 */
export function getLoadedKnowledgeNodes(): ServerKnowledgeNode[] {
  return inMemoryNodes;
}
