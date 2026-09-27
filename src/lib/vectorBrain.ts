import { collection, onSnapshot, addDoc, getDocs, doc, updateDoc, deleteDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';

export interface KnowledgeNode {
  id: string;
  title: string;
  content: string;
  category: 'architecture' | 'pricing' | 'performance' | 'seo' | 'automation' | 'auto_learned';
  embedding?: number[];
  source: 'manual_injection' | 'auto_learning' | 'system_seed';
  confidence?: number;
  syncedAt?: any;
  accessCount?: number;
  tags?: string[];
  lastRetrievedAt?: any;
}

export interface VectorSearchResult {
  node: KnowledgeNode;
  similarity: number;
}

/**
 * High-performance cosine similarity between two numeric embedding vectors.
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
 * Real-time Firestore subscription for knowledge nodes in the brain graph.
 */
export function subscribeToKnowledgeGraph(
  onUpdate: (nodes: KnowledgeNode[]) => void,
  onError?: (err: Error) => void
) {
  const colRef = collection(db, 'knowledge_nodes');
  return onSnapshot(
    colRef,
    (snapshot) => {
      const nodes: KnowledgeNode[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        nodes.push({
          id: docSnap.id,
          title: data.title || 'Untitled Node',
          content: data.content || '',
          category: data.category || 'architecture',
          embedding: data.embedding || [],
          source: data.source || 'manual_injection',
          confidence: data.confidence || 0.95,
          syncedAt: data.syncedAt,
          accessCount: data.accessCount || 0,
          tags: data.tags || [],
          lastRetrievedAt: data.lastRetrievedAt
        });
      });
      onUpdate(nodes);
    },
    (err) => {
      console.error('Error listening to knowledge nodes:', err);
      if (onError) onError(err);
    }
  );
}

/**
 * Manually inject a knowledge node through server-side vectorization
 */
export async function injectKnowledgeNode(params: {
  title: string;
  content: string;
  category: KnowledgeNode['category'];
  tags?: string[];
  source?: KnowledgeNode['source'];
}): Promise<{ success: boolean; node?: KnowledgeNode; error?: string }> {
  try {
    const res = await fetch('/api/ai/knowledge/inject', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    const data = await res.json();
    return data;
  } catch (err: any) {
    console.error('Failed to inject knowledge node:', err);
    return { success: false, error: err?.message || 'Injection failed' };
  }
}

/**
 * Query the vector brain directly for testing / telemetry
 */
export async function searchVectorBrain(queryText: string): Promise<{
  results: VectorSearchResult[];
  latencyMs: number;
  totalNodes: number;
}> {
  try {
    const startTime = performance.now();
    const res = await fetch('/api/ai/knowledge/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: queryText })
    });
    const data = await res.json();
    const latencyMs = Math.round(performance.now() - startTime);
    return {
      results: data.results || [],
      latencyMs: data.latencyMs || latencyMs,
      totalNodes: data.totalNodes || 0
    };
  } catch (err) {
    console.error('Search vector brain failed:', err);
    return { results: [], latencyMs: 0, totalNodes: 0 };
  }
}

/**
 * Trigger knowledge base initial seeding if empty
 */
export async function seedKnowledgeBrain(): Promise<{ success: boolean; count: number }> {
  try {
    const res = await fetch('/api/ai/knowledge/seed', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    return await res.json();
  } catch (err) {
    console.error('Seeding knowledge brain failed:', err);
    return { success: false, count: 0 };
  }
}

/**
 * Delete a knowledge node from Firestore and in-memory brain
 */
export async function deleteKnowledgeNode(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    // 1. Delete directly from client-side Firestore if authorized
    try {
      await deleteDoc(doc(db, 'knowledge_nodes', id));
    } catch {
      // Fallback to server deletion endpoint
    }
    const res = await fetch(`/api/ai/knowledge/${encodeURIComponent(id)}`, {
      method: 'DELETE'
    });
    return await res.json();
  } catch (err: any) {
    console.error('Failed to delete knowledge node:', err);
    return { success: false, error: err?.message || 'Delete failed' };
  }
}
