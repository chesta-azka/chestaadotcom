import { collection, doc, setDoc, serverTimestamp, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

// ==========================================
// TYPES & SCHEMAS
// ==========================================

export interface Workspace {
  passcode: string;
  client_name: string;
  project_status: string;
  created_at: any; // Firestore serverTimestamp
}

export type TicketStatus = 'Backlog' | 'In Progress' | 'Client Review' | 'Deployed';

export interface KanbanTicket {
  id?: string;
  title: string;
  description?: string;
  tag?: string;
  priority?: 'High' | 'Medium' | 'Low';
  status: TicketStatus;
  orderIndex: number;
  revision_notes?: { note: string, timestamp: any }[];
  client_approved?: boolean;
  updated_at: any;
}

export interface ChatMessage {
  sender_type: 'admin' | 'client';
  message: string;
  timestamp: any;
}

export type VaultAssetType = 'Invoice' | 'Link' | 'Proposal' | 'Deliverable' | 'Design';

export interface VaultAsset {
  id?: string;
  workspace_id: string; // reference to workspace slug
  file_url: string;
  type: VaultAssetType;
  title: string;
  file_size?: string;
  status?: 'Paid' | 'Pending' | 'Final Release' | 'Draft' | 'Active';
  created_at: any;
}

export type AILeadScore = 'Hot' | 'Warm' | 'Cold' | 'Unscored';

export interface AILead {
  visitor_data: any;
  chat_transcript: any[];
  ai_score: AILeadScore;
  created_at: any;
}

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Creates a new Workspace document (URL Slug is the Document ID)
 */
export async function createWorkspace(slug: string, clientName: string, passcode: string) {
  const workspaceRef = doc(db, 'workspaces', slug);
  await setDoc(workspaceRef, {
    passcode, // NOTE: In a real app, hash this before storing if security is paramount
    client_name: clientName,
    project_status: 'Onboarding',
    created_at: serverTimestamp(),
  });
  return slug;
}

/**
 * Adds a new Kanban Ticket to a specific workspace
 */
export async function createKanbanTicket(workspaceSlug: string, title: string, status: TicketStatus, orderIndex: number) {
  const ticketRef = doc(collection(db, 'workspaces', workspaceSlug, 'kanban_tickets'));
  await setDoc(ticketRef, {
    title,
    status,
    orderIndex,
    revision_notes: [],
    client_approved: false,
    updated_at: serverTimestamp(),
  });
  return ticketRef.id;
}

/**
 * Adds a new Chat Message to a workspace
 */
export async function createChatMessage(workspaceSlug: string, senderType: 'admin' | 'client', message: string) {
  const chatRef = doc(collection(db, 'workspaces', workspaceSlug, 'chat_messages'));
  await setDoc(chatRef, {
    sender_type: senderType,
    message,
    timestamp: serverTimestamp(),
  });
  return chatRef.id;
}

/**
 * Adds a Vault Asset
 */
export async function createVaultAsset(workspaceSlug: string, fileUrl: string, type: VaultAssetType, title: string) {
  const assetRef = doc(collection(db, 'vault_assets'));
  await setDoc(assetRef, {
    workspace_id: workspaceSlug,
    file_url: fileUrl,
    type,
    title,
    created_at: serverTimestamp(),
  });
  return assetRef.id;
}

/**
 * Creates a new AI Lead
 */
export async function createAILead(visitorData: any, transcript: any[], score: AILeadScore = 'Unscored') {
  const leadRef = doc(collection(db, 'ai_leads'));
  await setDoc(leadRef, {
    visitor_data: visitorData,
    chat_transcript: transcript,
    ai_score: score,
    created_at: serverTimestamp(),
  });
  return leadRef.id;
}
