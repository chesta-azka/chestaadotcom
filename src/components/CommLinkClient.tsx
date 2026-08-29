"use client";
import React, { useState, useRef, useEffect } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Send, Loader2 } from 'lucide-react';
import { db } from '../lib/firebase';
import { useCommLink } from '../hooks/useCommLink';

interface CommLinkClientProps {
  workspaceId: string;
}

export function CommLinkClient({ workspaceId }: CommLinkClientProps) {
  const { messages, loading } = useCommLink(workspaceId);
  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !workspaceId) return;

    setSending(true);
    try {
      const messagesRef = collection(db, 'workspaces', workspaceId, 'chat_messages');
      await addDoc(messagesRef, {
        text: inputText.trim(),
        sender: 'client', // Client messages are right-aligned
        timestamp: serverTimestamp()
      });
      setInputText('');
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] border-4 border-black bg-white font-mono shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <div className="bg-black text-white px-4 py-3 border-b-4 border-black flex justify-between items-center">
        <h3 className="font-bold uppercase tracking-widest text-sm flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
          Comm-Link: Active
        </h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-black" />
          </div>
        ) : messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-sm font-bold uppercase text-slate-400 text-center">
            No transmissions yet.<br/>Initiate link.
          </div>
        ) : (
          messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex w-full ${msg.sender === 'client' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[85%] p-4 text-sm leading-relaxed ${
                  msg.sender === 'client' 
                    ? 'bg-white text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' 
                    : 'bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="border-t-4 border-black flex bg-white">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="TRANSMIT MESSAGE..."
          className="flex-1 px-4 py-4 bg-transparent text-sm focus:outline-none placeholder:text-slate-400 font-mono uppercase"
          disabled={sending}
        />
        <button 
          type="submit"
          disabled={sending || !inputText.trim()}
          className="px-6 border-l-4 border-black bg-black text-white hover:bg-slate-800 disabled:bg-slate-200 disabled:border-slate-200 disabled:text-slate-400 transition-colors flex items-center justify-center"
        >
          {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
        </button>
      </form>
    </div>
  );
}
