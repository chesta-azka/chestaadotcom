"use client";
import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'admin' | 'client';
  timestamp: any;
}

export function useCommLink(workspaceId: string) {
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
    
    // Listen to chat_messages sub-collection for the specified workspace
    const messagesRef = collection(db, 'workspaces', workspaceId, 'chat_messages');
    
    // Order by timestamp ascending
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedMessages = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as ChatMessage[];
        
        setMessages(fetchedMessages);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error("Error fetching comm-link messages:", err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [workspaceId]);

  return { messages, loading, error };
}
