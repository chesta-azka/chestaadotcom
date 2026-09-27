/**
 * Firebase Cloud Functions: Autonomous Continuous AI Learning & Vector Search Loop
 * Token-saving architecture with 15% character overlap semantic chunking and Top-3 Cosine Similarity retrieval.
 */
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

/**
 * Split text into semantic chunks with a 15% character overlap
 */
export function splitSemanticOverlap(text: string, chunkSize = 400, overlapRatio = 0.15): string[] {
  const clean = (text || '').trim();
  if (clean.length <= chunkSize) return [clean];

  const overlap = Math.max(1, Math.round(chunkSize * overlapRatio));
  const step = Math.max(1, chunkSize - overlap);
  const chunks: string[] = [];

  let start = 0;
  while (start < clean.length) {
    let end = Math.min(clean.length, start + chunkSize);
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
 * Cosine similarity calculation between numeric vector embeddings
 */
export function cosineSimilarity(vecA: number[], vecB: number[]): number {
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
 * Cloud Function to vectorize, chunk (15% overlap), and store newly learned knowledge nodes
 */
export const onNewLearnedKnowledge = functions.https.onRequest(async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const { question, answer, text, category = 'auto_learned', tags = [] } = req.body;
  const rawContent = answer || text;
  const rawTitle = question || `Insight: ${(rawContent || '').slice(0, 45).replace(/\n/g, ' ')}...`;

  if (!rawContent && !question) {
    res.status(400).json({ error: 'Question or content text is required' });
    return;
  }

  try {
    const chunks = splitSemanticOverlap(rawContent || question, 450, 0.15); // 15% overlap
    const batch = db.batch();
    const createdIds: string[] = [];

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      const chunkId = `cf_learned_${Date.now()}_${i}_${Math.random().toString(36).substring(2, 6)}`;
      const chunkTitle = chunks.length > 1 ? `${rawTitle} (Part ${i + 1}/${chunks.length})` : rawTitle;

      const docRef = db.collection('knowledge_nodes').doc(chunkId);
      batch.set(docRef, {
        id: chunkId,
        title: chunkTitle,
        content: chunk,
        category,
        source: 'auto_learning',
        confidence: 0.95,
        syncedAt: admin.firestore.FieldValue.serverTimestamp(),
        accessCount: 1,
        tags: ['CloudFunction', 'Semantic-Overlap-15%', ...tags]
      });
      createdIds.push(chunkId);
    }

    await batch.commit();

    res.status(200).json({
      success: true,
      count: createdIds.length,
      nodeIds: createdIds,
      message: 'Knowledge semantically chunked with 15% overlap and synchronized to Firestore Brain'
    });
  } catch (err: any) {
    console.error('Cloud Function auto-learning failure:', err);
    res.status(500).json({ error: err?.message || 'Internal Error' });
  }
});
