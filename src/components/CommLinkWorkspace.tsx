"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Paperclip, Send, Loader2, FileText, Search, Mic, Square, Check, CheckCheck, Palette, Archive, ShieldAlert } from 'lucide-react';
import { useEcosystemChat, markMessageAsRead } from '../hooks/useEcosystemChat';
import { db, storage } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

interface CommLinkWorkspaceProps {
  workspaceId: string;
  currentUserRole?: 'admin' | 'client';
}

export function CommLinkWorkspace({ workspaceId, currentUserRole = 'client' }: CommLinkWorkspaceProps) {
  const [archiveMode, setArchiveMode] = useState(false);
  
  const { messages, loading, isProtected, toggleWorkspaceProtection } = useEcosystemChat(workspaceId, archiveMode, currentUserRole);

  const [text, setText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [accentColor, setAccentColor] = useState<'blue' | 'emerald' | 'purple'>('purple');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);

  const accentMap = {
    blue: 'bg-blue-600 hover:bg-blue-500 ring-blue-500/50',
    emerald: 'bg-emerald-600 hover:bg-emerald-500 ring-emerald-500/50',
    purple: 'bg-purple-900 hover:bg-purple-800 ring-purple-500/50',
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!searchQuery) scrollToBottom();
  }, [messages, searchQuery]);

  // Mark as read
  useEffect(() => {
    const unread = messages.filter(m => !m.read && m.sender !== currentUserRole && m.sender !== 'system');
    unread.forEach(msg => {
      markMessageAsRead(workspaceId, msg.id);
    });
  }, [messages, workspaceId, currentUserRole]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!text.trim() && !isUploading) return;
    
    const messageText = text.trim();
    setText('');
    
    try {
      await addDoc(collection(db, 'workspaces', workspaceId, 'chat_messages'), {
        text: messageText,
        sender: currentUserRole,
        timestamp: serverTimestamp(),
        read: false
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsUploading(true);
    try {
      const storageRef = ref(storage, `workspaces/${workspaceId}/vault/${Date.now()}_${file.name}`);
      const uploadTask = await uploadBytesResumable(storageRef, file);
      const downloadURL = await getDownloadURL(uploadTask.ref);
      
      await addDoc(collection(db, 'workspaces', workspaceId, 'vault'), {
        fileName: file.name,
        fileUrl: downloadURL,
        uploadedBy: currentUserRole,
        timestamp: serverTimestamp(),
      });
      
      await addDoc(collection(db, 'workspaces', workspaceId, 'chat_messages'), {
        text: `Uploaded a file: ${file.name}`,
        fileUrl: downloadURL,
        fileName: file.name,
        sender: currentUserRole,
        timestamp: serverTimestamp(),
        read: false
      });
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await uploadAudio(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Microphone access denied:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const uploadAudio = async (blob: Blob) => {
    setIsUploading(true);
    try {
      const storageRef = ref(storage, `workspaces/${workspaceId}/audio/${Date.now()}.webm`);
      const uploadTask = await uploadBytesResumable(storageRef, blob);
      const downloadURL = await getDownloadURL(uploadTask.ref);
      
      await addDoc(collection(db, 'workspaces', workspaceId, 'chat_messages'), {
        text: 'Audio Message',
        audioUrl: downloadURL,
        sender: currentUserRole,
        timestamp: serverTimestamp(),
        read: false
      });
    } catch (error) {
      console.error("Audio upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const filteredMessages = messages.filter(msg => 
    msg.text.toLowerCase().includes(searchQuery.toLowerCase()) || 
    msg.fileName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full w-full max-h-[800px] border border-purple-100 rounded-3xl overflow-hidden bg-white shadow-md relative">
      
      {/* Header & Controls */}
      <div className="px-6 py-4 border-b border-purple-100 bg-purple-50/30 flex flex-col md:flex-row md:items-center justify-between gap-4 z-10">
        <div>
          <h3 className="font-bold text-slate-900 tracking-tight">Ecosystem Comm-Link</h3>
          <p className="text-xs font-medium text-slate-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Direct Communication Workspace
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search messages..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-1.5 text-sm bg-white border border-purple-100 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-200 text-slate-900 placeholder:text-slate-400 w-48 transition-all focus:w-64"
            />
          </div>
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-full border border-purple-100">
            <button onClick={() => setArchiveMode(!archiveMode)} className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${archiveMode ? 'bg-purple-100 text-purple-900' : 'text-slate-500 hover:text-slate-700'}`} title={archiveMode ? 'Older than 30 days: Archived' : 'Older than 30 days: Deleted'}> <Archive className="w-3.5 h-3.5" /> <span className="hidden sm:inline">{archiveMode ? 'Archiving' : 'Auto-Delete'}</span> </button> 
          {currentUserRole === 'admin' && (
            <button 
              onClick={toggleWorkspaceProtection}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${isProtected ? 'bg-purple-100 text-purple-900' : 'text-slate-500 hover:text-slate-700'}`} 
              title={isProtected ? 'Protected from Auto-Delete' : 'Not Protected'}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Keep Forever</span>
            </button>
          )}
          <div className="w-px h-4 bg-slate-200 mx-1"></div>
            <Palette className="w-4 h-4 text-slate-400 mx-1" />
            {(['blue', 'emerald', 'purple'] as const).map(color => (
              <button 
                key={color}
                onClick={() => setAccentColor(color)}
                className={`w-5 h-5 rounded-full ${color === 'blue' ? 'bg-blue-500' : color === 'emerald' ? 'bg-emerald-500' : 'bg-purple-900'} ${accentColor === color ? 'ring-2 ring-offset-1 ring-offset-slate-100' : 'opacity-50'} transition-all`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth bg-white">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {filteredMessages.map((msg) => {
              if (msg.sender === 'system') {
                return (
                  <motion.div 
                    key={msg.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-center w-full my-4"
                  >
                    <span className="px-4 py-1.5 rounded-full bg-purple-50 text-[11px] uppercase tracking-widest font-bold text-slate-600 border border-purple-100">
                      {msg.text}
                    </span>
                  </motion.div>
                );
              }
              
              const isOwn = msg.sender === currentUserRole;
              
              return (
                <motion.div
                  key={msg.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85, y: 10, transition: { duration: 0.2 } }}
                  className={`flex w-full ${isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} max-w-[75%]`}>
                    <span className="text-[10px] text-slate-400 font-medium mb-1 px-1">
                      {isOwn ? 'You' : (msg.sender === 'admin' ? 'Support (Admin)' : 'Client')}
                    </span>
                    <div className={`w-full rounded-2xl px-5 py-3 shadow-xs flex flex-col gap-2 ${
                      msg.sender === 'admin' 
                        ? 'bg-purple-900 text-white ' + (isOwn ? 'rounded-tr-xs' : 'rounded-tl-xs')
                        : 'bg-purple-50/60 text-slate-800 border border-purple-100 ' + (isOwn ? 'rounded-tr-xs' : 'rounded-tl-xs')
                    }`}>

                    {msg.fileUrl && (
                      <a 
                        href={msg.fileUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors border border-white/10"
                      >
                        <FileText className="w-5 h-5 opacity-80" />
                        <span className="text-sm font-medium truncate">{msg.fileName}</span>
                      </a>
                    )}
                    {msg.audioUrl && (
                      <div className="flex items-center gap-3 p-2 rounded-xl bg-white/10 border border-white/10">
                        <audio controls src={msg.audioUrl} className="h-8 max-w-[200px]" />
                        <div className="flex items-center gap-0.5 h-6 opacity-60">
                           {[1,2,3,4,5,4,3,2,1,2,4,3].map((v, i) => (
                             <motion.div key={i} animate={{ height: [`${v*20}%`, `${v*10}%`, `${v*20}%`] }} transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.1 }} className="w-1 bg-current rounded-full" />
                           ))}
                        </div>
                      </div>
                    )}
                    {!msg.audioUrl && <p className="text-sm font-medium leading-relaxed">{msg.text}</p>}
                    
                    {/* Read Receipt */}
                    {isOwn && (
                      <div className="flex justify-end mt-1">
                        {msg.read ? (
                          <span className="flex items-center gap-1 text-[10px] text-emerald-300 font-semibold"><CheckCheck className="w-3 h-3" /> Read</span>
                        ) : (
                          <span className="flex items-center gap-1 text-[10px] text-white/70"><Check className="w-3 h-3" /> Delivered</span>
                        )}
                      </div>
                    )}
                  </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-purple-100 z-10">
        <form onSubmit={handleSend} className="relative flex items-center gap-2 max-w-4xl mx-auto">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading || isRecording}
            className="p-3 text-slate-500 hover:text-slate-900 transition-colors bg-purple-50 hover:bg-purple-100 rounded-full shrink-0 shadow-xs border border-purple-100 cursor-pointer"
          >
            {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Paperclip className="w-5 h-5" />}
          </button>
          
          <button
            type="button"
            onMouseDown={startRecording}
            onMouseUp={stopRecording}
            onMouseLeave={stopRecording}
            onTouchStart={startRecording}
            onTouchEnd={stopRecording}
            disabled={isUploading}
            className={`p-3 transition-colors rounded-full shrink-0 shadow-xs border border-purple-100 cursor-pointer ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-purple-50 text-slate-500 hover:text-slate-900 hover:bg-purple-100'}`}
          >
            {isRecording ? <Square className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
          
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
          />
          
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={isRecording ? "Recording audio..." : "Type message..."}
            disabled={isRecording}
            className="flex-1 bg-purple-50/30 border border-purple-100 text-slate-900 text-sm font-medium rounded-full px-6 py-3.5 focus:outline-none focus:ring-2 focus:ring-purple-200 shadow-xs placeholder:text-slate-400 transition-all"
          />
          
          <button
            type="submit"
            disabled={(!text.trim() && !isUploading) || isRecording}
            className={`p-3.5 text-white rounded-full transition-all shrink-0 shadow-xs disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md active:scale-95 cursor-pointer ${accentMap[accentColor].split(' ').slice(0,2).join(' ')}`}
          >
            <Send className="w-4 h-4 -ml-0.5 mt-0.5" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default CommLinkWorkspace;
