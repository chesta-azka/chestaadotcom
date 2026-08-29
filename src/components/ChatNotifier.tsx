"use client";

import { useEffect, useRef } from 'react';
import { useEcosystemChat } from '../hooks/useEcosystemChat';

export function ChatNotifier({ workspaceId }: { workspaceId: string }) {
  const { messages } = useEcosystemChat(workspaceId);
  const prevMessagesLength = useRef(messages.length);
  const originalTitle = useRef('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      originalTitle.current = document.title;
      if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
      }
    }

    const handleVisibilityChange = () => {
      if (!document.hidden && typeof window !== 'undefined') {
        document.title = originalTitle.current;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  useEffect(() => {
    if (messages.length > prevMessagesLength.current) {
      const newMessage = messages[messages.length - 1];
      if (document.hidden && newMessage && newMessage.sender !== 'system') {
        if (typeof window !== 'undefined') {
          document.title = `(1) New Message | ${originalTitle.current}`;
        }
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('New Secure Message', {
            body: newMessage.text || (newMessage.fileUrl ? 'File attachment' : (newMessage.audioUrl ? 'Voice message' : 'New message')),
          });
        }
      }
    }
    prevMessagesLength.current = messages.length;
  }, [messages]);

  return null;
}
