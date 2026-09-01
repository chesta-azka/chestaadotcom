"use client";

import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, doc, updateDoc, deleteDoc, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'admin' | 'client' | 'system';
  timestamp: any;
  fileUrl?: string;
  fileName?: string;
  audioUrl?: string;
  read?: boolean;
  archived?: boolean;
}

export function useEcosystemChat(workspaceId: string, archiveMode: boolean = false, currentUserRole: string = 'client') {
  const [isProtected, setIsProtected] = useState(false);

  const toggleWorkspaceProtection = async () => {
    if (currentUserRole !== 'admin') return;
    try {
      const newProtectedState = !isProtected;
      setIsProtected(newProtectedState);
      await updateDoc(doc(db, 'workspaces', workspaceId), { neverDelete: newProtectedState });
    } catch (e) {
      console.error('Failed to toggle protection', e);
      // Revert optimism
      setIsProtected(!isProtected);
    }
  };

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!workspaceId) {
      setMessages([]);
      setLoading(false);
      return;
    }
    setLoading(true);

    
    const wsRef = doc(db, 'workspaces', workspaceId);
    const unsubWs = onSnapshot(
      wsRef, 
      (snap) => {
        if (snap.exists()) {
          setIsProtected(!!snap.data().neverDelete);
        }
      },
      (err) => {
        console.warn("wsRef onSnapshot notice:", err);
      }
    );

    const messagesRef = collection(db, 'workspaces', workspaceId, 'chat_messages');


    // Auto-cleanup: Call server-side AI pruning for messages older than 30 days
    const cleanupOldMessages = async () => {
      try {
        await fetch('/api/ai/prune-workspace', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ workspaceId, archiveMode })
        });
      } catch (err) {
        console.error("Cleanup error:", err);
      }
    };
    
    // Fire and forget cleanup
    cleanupOldMessages();

    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ChatMessage[];
        
        // Filter out archived messages client-side to avoid composite index requirements
        setMessages(fetchedMessages.filter(msg => !msg.archived));
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error("Error fetching ecosystem chat:", err);
        setError(err);
        setLoading(false);
      }
    );

    return () => {
      unsubWs();
      unsubscribe();
    };
  }, [workspaceId, archiveMode]);

  return { messages, loading, error, isProtected, toggleWorkspaceProtection };
}

export async function sendSystemMessage(workspaceId: string, text: string) {
  if (!workspaceId || !text) return;
  try {
    const messagesRef = collection(db, 'workspaces', workspaceId, 'chat_messages');
    await addDoc(messagesRef, {
      text,
      sender: 'system',
      timestamp: serverTimestamp(),
      read: false
    });
  } catch (error) {
    console.error("Error sending system message:", error);
    throw error;
  }
}

export async function markMessageAsRead(workspaceId: string, messageId: string) {
  if (!workspaceId || !messageId) return;
  try {
    const msgRef = doc(db, 'workspaces', workspaceId, 'chat_messages', messageId);
    await updateDoc(msgRef, { read: true });
  } catch (error) {
    console.error("Error marking message as read:", error);
  }
}
