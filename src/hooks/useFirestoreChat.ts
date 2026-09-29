'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { 
  doc, 
  setDoc, 
  onSnapshot, 
  serverTimestamp, 
  collection, 
  addDoc 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { parseAiResponse } from '../utils/aiResponseParser';

export interface ChatMessage {
  id: string;
  sender: 'expert' | 'client';
  text: string;
  time: string;
  timestamp?: number;
  isStreaming?: boolean;
  isNew?: boolean;
  isBookingConfirmation?: boolean;
  bookingData?: {
    name?: string;
    phone: string;
    date: string;
    time: string;
  };
}

const SESSION_STORAGE_KEY = 'chestadotcom_anonymous_uuid';

/**
 * Standard RFC4122 UUID v4 generator for persistent anonymous client identification
 */
export function generateAnonymousUUID(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const INITIAL_WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome-initial',
  sender: 'expert',
  text: 'Selamat datang di CHESTADOTCOM. Saya Chesta Azka, Principal Systems Architect.\n\nKami membantu para pendiri bisnis dan pimpinan teknologi merancang arsitektur Next.js 15 dengan waktu respon sub-detik, dominasi SEO lokal, serta kepemilikan kode sumber penuh tanpa ketergantungan sewa platform bulanan. Bagaimana kami dapat mengevaluasi atau membangun inisiatif digital bisnis Anda hari ini?\n\n<opsi>📅 Jadwalkan Discovery Call</opsi>\n<opsi>⚡ Estimasi Biaya & Arsitektur</opsi>\n<opsi>🔍 Konsultasi Audit Sistem</opsi>',
  time: 'Baru saja',
  timestamp: Date.now(),
  isNew: false
};

/**
 * Strict Client-Side Sanitization: Purges all markdown markers from the UI
 */
export function sanitizeClientProse(text: string): string {
  if (!text) return '';
  return text
    // Preserves ** bold, <b> HTML, and - hyphens to support executive scannability formatting
    .replace(/#{1,6}\s+/g, '')
    .replace(/`{1,3}[^`]*`{1,3}/g, (m) => m.replace(/`/g, ''))
    .trim();
}

/**
 * Custom React Hook: useFirestoreChat
 * Generates and stores an anonymous session ID in browser local storage.
 * Subscribes to Firestore chat_sessions collection in real time.
 * Seamlessly restores returning visitors' exact previous conversation history.
 */
export function useFirestoreChat() {
  const [sessionId, setSessionId] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_WELCOME_MESSAGE]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState<boolean>(true);
  
  const hasInitializedFromFirestore = useRef<boolean>(false);
  const isWritingToFirestore = useRef<boolean>(false);

  // 1. Generate or retrieve anonymous session ID from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let storedId = localStorage.getItem(SESSION_STORAGE_KEY) || localStorage.getItem('chestadotcom_chat_session_id');
    if (!storedId) {
      storedId = generateAnonymousUUID();
      localStorage.setItem(SESSION_STORAGE_KEY, storedId);
    }
    setSessionId(storedId);
  }, []);

  // 2. Real-time Firestore onSnapshot synchronization for chat_sessions
  useEffect(() => {
    if (!sessionId) return;

    setIsLoadingHistory(true);
    const sessionDocRef = doc(db, 'chat_sessions', sessionId);

    const unsubscribe = onSnapshot(
      sessionDocRef,
      (docSnap) => {
        setIsLoadingHistory(false);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (Array.isArray(data.messages) && data.messages.length > 0) {
            // Avoid clobbering active client-side streaming text
            if (!isWritingToFirestore.current) {
              setMessages(data.messages.map((m: ChatMessage) => ({
                ...m,
                isNew: false // historical messages don't re-trigger typewriter
              })));
            }
          }
          hasInitializedFromFirestore.current = true;
        } else {
          // New session: initialize Firestore document with welcome message
          const initialMsgs = [INITIAL_WELCOME_MESSAGE];
          setMessages(initialMsgs);
          hasInitializedFromFirestore.current = true;

          setDoc(sessionDocRef, {
            sessionId,
            messages: initialMsgs,
            createdAt: serverTimestamp(),
            lastUpdated: serverTimestamp(),
            metadata: {
              userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
              platform: typeof navigator !== 'undefined' ? navigator.platform : '',
              initialReferrer: typeof document !== 'undefined' ? document.referrer : ''
            }
          }, { merge: true }).catch(console.warn);
        }
      },
      (err) => {
        console.warn('Firestore chat_sessions sync warning:', err);
        setIsLoadingHistory(false);
      }
    );

    return () => unsubscribe();
  }, [sessionId]);

  // Persist updated message list to Firestore
  const persistMessagesToFirestore = useCallback(async (newMessages: ChatMessage[]) => {
    if (!sessionId) return;
    isWritingToFirestore.current = true;
    try {
      const sessionDocRef = doc(db, 'chat_sessions', sessionId);
      await setDoc(sessionDocRef, {
        sessionId,
        messages: newMessages.map(m => ({
          id: m.id,
          sender: m.sender,
          text: m.text,
          time: m.time,
          timestamp: m.timestamp || Date.now(),
          isBookingConfirmation: Boolean(m.isBookingConfirmation),
          bookingData: m.bookingData || null
        })),
        lastUpdated: serverTimestamp()
      }, { merge: true });
    } catch (err) {
      console.warn('Failed to persist chat session to Firestore:', err);
    } finally {
      setTimeout(() => {
        isWritingToFirestore.current = false;
      }, 400);
    }
  }, [sessionId]);

  // Send Message Logic with Real-time Chunked Streaming
  const sendMessage = useCallback(async (rawText: string): Promise<void> => {
    const cleanText = sanitizeClientProse(rawText);
    if (!cleanText) return;

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: 'client_' + Date.now(),
      sender: 'client',
      text: cleanText,
      time: userTime,
      timestamp: Date.now(),
      isNew: false
    };

    // Optimistically append user message
    const updatedWithUser = [...messages, userMsg];
    setMessages(updatedWithUser);
    setIsTyping(true);

    // Also register message in global ai_chat_sessions collection for admin audit
    try {
      addDoc(collection(db, 'ai_chat_sessions'), {
        sessionId,
        visitorMessage: cleanText,
        createdAt: serverTimestamp(),
        lastUpdated: serverTimestamp()
      }).catch(console.warn);
    } catch {}

    // CRITICAL ZERO-COST INTENT ROUTING (LOCAL REGEX INTERCEPTOR)
    const basicIntentRegexes = [
      /^(halo|hai|hi|p|pagi|siang|sore|malam|test|tes|hello|oi)(\s+|$)/i,
      /^(ini apa|ini apa ya|chestaa itu apa|kalian ngapain|layanan ini buat apa|apa ini|what is this|chestaa apa|apa itu chestaa|layanan apa ini|chestaa|buat apa ini|fungsi chestaa|kalian buat apa|jasa apa)(\s+|$)/i
    ];

    const isBasicIntent = basicIntentRegexes.some(rx => rx.test(cleanText));

    if (isBasicIntent) {
      // Simulate 800ms typing delay
      await new Promise(resolve => setTimeout(resolve, 800));
      setIsTyping(false);

      const assistantMsgId = 'expert_' + (Date.now() + 1);
      const assistantTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const hardcodedResponse = "Halo! Gue Chestaa, asisten digital lo. Basically kita ngebangun sistem otonom biar bisnis lo jalan 24/7 tanpa ribet ngurusin admin manual. [SPLIT] Jujurly ini bakal cut biaya operasional lo lumayan banget. Lo pengen gue simulasiin seberapa banyak hematnya buat dominasi market Tangerang dan sekitarnya?";

      const localAssistantMsg: ChatMessage = {
        id: assistantMsgId,
        sender: 'expert',
        text: hardcodedResponse,
        time: assistantTime,
        timestamp: Date.now(),
        isStreaming: false,
        isNew: true
      };

      const finalMessages = updatedWithUser.concat(localAssistantMsg);
      setMessages(finalMessages);
      isWritingToFirestore.current = true;
      try {
        const sessionDocRef = doc(db, 'chat_sessions', sessionId);
        await setDoc(sessionDocRef, {
          sessionId,
          messages: finalMessages,
          lastUpdated: serverTimestamp()
        }, { merge: true });
      } catch (err) {
        console.warn("Failed to persist local intent response:", err);
      } finally {
        isWritingToFirestore.current = false;
      }
      return;
    }

    const assistantMsgId = 'expert_' + (Date.now() + 1);
    const assistantTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Format history for backend Top-K LLM with memory
    const formattedHistory = updatedWithUser.map(m => ({
      role: m.sender === 'client' ? 'user' : 'assistant',
      content: m.text
    }));

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: formattedHistory,
          pagePath: typeof window !== 'undefined' ? window.location.pathname : '/',
          pageTitle: typeof document !== 'undefined' ? document.title : 'CHESTADOTCOM',
          stream: true
        })
      });

      if (!response.ok || !response.body) {
        throw new Error('Streaming failed with status: ' + response.status);
      }

      setIsTyping(false);
      setIsStreaming(true);

      const placeholderAssistant: ChatMessage = {
        id: assistantMsgId,
        sender: 'expert',
        text: '',
        time: assistantTime,
        timestamp: Date.now(),
        isStreaming: true,
        isNew: true
      };

      setMessages(prev => [...prev, placeholderAssistant]);

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        // Strip any accidental markdown formatting symbols in real-time
        const sanitizedChunk = chunk.replace(/[\*\_#\`]/g, '');
        accumulated += sanitizedChunk;

        setMessages(prev =>
          prev.map(msg =>
            msg.id === assistantMsgId
              ? { ...msg, text: accumulated, isStreaming: true }
              : msg
          )
        );
      }

      const finalAssistantMsg: ChatMessage = {
        id: assistantMsgId,
        sender: 'expert',
        text: accumulated,
        time: assistantTime,
        timestamp: Date.now(),
        isStreaming: false,
        isNew: true
      };

      const finalMessages = updatedWithUser.concat(finalAssistantMsg);
      setMessages(finalMessages);
      setIsStreaming(false);

      // Persist full synchronized conversation into Firestore
      await persistMessagesToFirestore(finalMessages);

    } catch (err) {
      console.warn('Live chat streaming failed, engaging executive fallback:', err);
      setIsTyping(false);
      setIsStreaming(false);

      const lower = cleanText.toLowerCase();
      let fallbackText = "CHESTADOTCOM berfokus pada efisiensi operasional dan arsitektur Next.js 15 performa tinggi untuk mengeliminasi beban sewa platform berulang sekaligus memastikan kepemilikan aset kode sumber 100% mandiri.\n\n<opsi>📅 Jadwalkan Discovery Call</opsi>\n<opsi>⚡ Estimasi Biaya Web</opsi>";

      if (lower.includes('harga') || lower.includes('biaya') || lower.includes('paket')) {
        fallbackText = "Alokasi investasi kami dirancang transparan dengan struktur kepemilikan kode penuh. Untuk UMKM, paket all-in mulai dari 540 ribu rupiah termasuk domain komersial satu tahun. Untuk sistem kustom skala korporat dengan basis data transaksi dan otomatisasi AI, investasi berkisar antara 2.5 juta hingga 8 juta rupiah.\n\n<opsi>📅 Jadwalkan Discovery Call</opsi>\n<opsi>🔍 Pelajari Spesifikasi</opsi>";
      }

      const fallbackAssistantMsg: ChatMessage = {
        id: assistantMsgId,
        sender: 'expert',
        text: sanitizeClientProse(fallbackText),
        time: assistantTime,
        timestamp: Date.now(),
        isStreaming: false,
        isNew: true
      };

      const fallbackMessages = updatedWithUser.concat(fallbackAssistantMsg);
      setMessages(fallbackMessages);
      await persistMessagesToFirestore(fallbackMessages);
    }
  }, [messages, persistMessagesToFirestore, sessionId]);

  // Reset conversation and generate a fresh session ID
  const resetConversation = useCallback(async () => {
    if (typeof window === 'undefined') return;
    const newId = generateAnonymousUUID();
    localStorage.setItem(SESSION_STORAGE_KEY, newId);
    setSessionId(newId);
    const freshMessages = [INITIAL_WELCOME_MESSAGE];
    setMessages(freshMessages);
    try {
      const sessionDocRef = doc(db, 'chat_sessions', newId);
      await setDoc(sessionDocRef, {
        sessionId: newId,
        messages: freshMessages,
        createdAt: serverTimestamp(),
        lastUpdated: serverTimestamp()
      });
    } catch {}
  }, []);

  return {
    sessionId,
    messages,
    setMessages,
    isTyping,
    isStreaming,
    isLoadingHistory,
    sendMessage,
    resetConversation,
    persistMessagesToFirestore
  };
}
