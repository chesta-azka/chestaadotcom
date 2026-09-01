"use client";

import React, { useState, useRef, useEffect } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Send, Loader2, ShieldCheck, Lock } from 'lucide-react';
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
        sender: 'client',
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
    <div className="flex flex-col h-[520px] rounded-3xl bg-white border border-purple-100 shadow-xs overflow-hidden font-sans">
      {/* Header Bar */}
      <div className="px-5 py-3.5 bg-white border-b border-purple-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative p-2 rounded-2xl bg-purple-50 text-purple-900 border border-purple-100">
            <ShieldCheck size={18} />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-slate-900 text-sm tracking-tight">Direct Comm-Link</h3>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.2 bg-purple-50 text-purple-900 rounded border border-purple-100">
                Encrypted
              </span>
            </div>
            <p className="text-[11px] text-slate-500">Jalur komunikasi langsung dengan Engineer</p>
          </div>
        </div>
      </div>
      
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-purple-50/20">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-purple-900" />
          </div>
        ) : messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-900 mb-2 border border-purple-100 shadow-xs">
              <Lock size={20} />
            </div>
            <h4 className="text-xs font-bold text-slate-700 mb-1">Kanal Terenkripsi Aktif</h4>
            <p className="text-[11px] text-slate-500 max-w-xs">
              Kirimkan pertanyaan teknis, diskusi arsitektur, atau instruksi langsung ke tim engineer.
            </p>
          </div>
        ) : (
          messages.map((msg) => {
            const isClient = msg.sender === 'client';
            return (
              <div 
                key={msg.id} 
                className={`flex w-full ${isClient ? 'justify-end' : 'justify-start'}`}
              >
                <div className="max-w-[85%] space-y-1">
                  <div className={`flex items-center gap-1.5 text-[10px] text-slate-400 ${isClient ? 'justify-end pr-1' : 'justify-start pl-1'}`}>
                    <span>{isClient ? 'Anda' : 'Engineer'}</span>
                  </div>
                  <div 
                    className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                      isClient 
                        ? 'bg-purple-900 text-white rounded-tr-xs' 
                        : 'bg-white text-slate-800 border border-purple-100 rounded-tl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-3.5 bg-white border-t border-purple-100 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ketik pesan ke Engineer..."
          className="flex-1 px-4 py-2.5 bg-purple-50/40 border border-purple-100 rounded-full text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-200 font-sans"
          disabled={sending}
        />
        <button 
          type="submit"
          disabled={sending || !inputText.trim()}
          className="p-2.5 rounded-full bg-purple-900 hover:bg-purple-800 text-white disabled:bg-slate-200 disabled:text-slate-400 transition-colors flex items-center justify-center shrink-0 cursor-pointer shadow-xs"
        >
          {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </button>
      </form>
    </div>
  );
}

export default CommLinkClient;
