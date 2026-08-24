import React, { useState, useEffect, useRef, memo } from 'react';
import { db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

import { motion, AnimatePresence } from 'motion/react';
import { Bot, X, Send, Copy, Code2, TrendingUp, Calculator, Clock, MessageCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import toast from 'react-hot-toast';
import AutomatedPricingLogic from './AutomatedPricingLogic';
import { useLocation } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

type ChatMessage = {
  role: 'ai' | 'user';
  content: string;
};

const markdownComponents = {
  p: ({node, ...props}: any) => <p className="mb-2 last:mb-0 text-slate-700" {...props} />,
  ul: ({node, ...props}: any) => <ul className="list-outside list-disc pl-5 mb-3 space-y-1 text-slate-700 marker:text-indigo-400" {...props} />,
  ol: ({node, ...props}: any) => <ol className="list-outside list-decimal pl-5 mb-3 space-y-1 text-slate-700 marker:text-indigo-500 font-medium" {...props} />,
  li: ({node, ...props}: any) => <li className="leading-relaxed pl-1" {...props} />,
  strong: ({node, ...props}: any) => <strong className="font-semibold text-indigo-950" {...props} />,
  code: ({node, inline, className, children, ...props}: any) => {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <div className="my-3 overflow-hidden rounded-xl border border-slate-700/50 shadow-sm">
        <div className="flex items-center px-3 py-1.5 bg-slate-800/80 border-b border-slate-700">
          <span className="text-[10px] font-mono font-medium text-slate-400 uppercase tracking-wider">{match[1]}</span>
        </div>
        <SyntaxHighlighter
          {...props}
          style={vscDarkPlus}
          language={match[1]}
          PreTag="div"
          customStyle={{ margin: 0, padding: '12px', background: '#0f111a', fontSize: '11.5px', lineHeight: '1.6' }}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      </div>
    ) : (
      <code className="bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded text-[11px] font-mono border border-indigo-100/50" {...props}>
        {children}
      </code>
    );
  },
  a: ({node, ...props}: any) => <a className="text-indigo-600 font-medium underline underline-offset-2 decoration-indigo-300 hover:text-indigo-800 hover:decoration-indigo-600 transition-colors" {...props} />
};

const TypewriterMarkdown = ({ content, onComplete }: { content: string, onComplete: () => void }) => {
  const [displayed, setDisplayed] = useState('');
  
  useEffect(() => {
    let i = 0;
    const chunkSize = 3;
    const interval = setInterval(() => {
      i += chunkSize;
      if (i >= content.length) {
        setDisplayed(content);
        clearInterval(interval);
        onComplete();
      } else {
        setDisplayed(content.slice(0, i));
      }
    }, 15);
    
    return () => clearInterval(interval);
  }, [content, onComplete]);
  
  return (
    <div className="break-words leading-relaxed space-y-2 text-[13px]"><ReactMarkdown components={markdownComponents}>
      {displayed + (displayed.length < content.length ? ' ▋' : '')}
    </ReactMarkdown></div>
  );
};

const MemoizedChatMessage = memo(({ 
  msg, 
  isTyping, 
  onComplete 
}: { 
  msg: ChatMessage; 
  isTyping: boolean; 
  onComplete: () => void;
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`group relative max-w-[85%] break-words [word-break:break-word] overflow-hidden rounded-2xl px-4 py-3 text-[13px] font-sans leading-relaxed shadow-sm border ${
        msg.role === 'user' 
          ? 'bg-slate-900 text-white border-slate-800 rounded-br-sm' 
          : 'bg-white text-slate-700 border-slate-200/60 rounded-bl-sm'
      }`}>
        {msg.role === 'ai' ? (
          isTyping ? (
            <TypewriterMarkdown content={msg.content} onComplete={onComplete} />
          ) : (
            <div className="break-words leading-relaxed space-y-2 text-[13px]"><ReactMarkdown components={markdownComponents}>
              {msg.content}
            </ReactMarkdown></div>
          )
        ) : (
          <div className="whitespace-pre-wrap text-[13px] text-white">{msg.content}</div>
        )}
        
        {msg.role === 'ai' && !isTyping && (
          <button 
            onClick={() => { navigator.clipboard.writeText(msg.content); toast.success('Disalin ke papan klip'); }}
            className="absolute -bottom-6 left-2 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-indigo-600 flex items-center gap-1 text-[10px] bg-white px-2 py-1 rounded-md shadow-sm border border-slate-200"
          >
            <Copy size={10} /> Salin
          </button>
        )}
      </div>
    </motion.div>
  );
}, (prevProps, nextProps) => {
  return prevProps.isTyping === nextProps.isTyping && prevProps.msg.content === nextProps.msg.content;
});

export default function FloatingAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState('');
  const defaultHistory: ChatMessage[] = [{
    role: 'ai',
    content: 'Halo! Saya asisten AI CHESTADOTCOM. Ada yang bisa saya bantu terkait pembuatan website atau agen AI?'
  }];
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(() => {
    try {
      const saved = sessionStorage.getItem('ai_chat_history');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return defaultHistory;
  });

  useEffect(() => {
    sessionStorage.setItem('ai_chat_history', JSON.stringify(chatHistory));
  }, [chatHistory]);
  const [isTyping, setIsTyping] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [typewriterIndex, setTypewriterIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => {
          inputRef.current?.focus();
        }, 300); // slight delay to allow animation to complete
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    let scrollTimeout: any;
    if (!isOpen) {
      scrollTimeout = setTimeout(() => {
        setIsExpanded(true);
      }, 3000);
    } else {
      setIsExpanded(false);
    }
    return () => clearTimeout(scrollTimeout);
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isTyping, typewriterIndex]);

  const handleSendMessage = async (e?: React.FormEvent, presetMessage?: string) => {
    if (e) e.preventDefault();
    const content = presetMessage || message;
    if (!content.trim()) return;

    setChatHistory(prev => [...prev, { role: 'user', content }]);
    setMessage('');
    setIsTyping(true);

    try {
      addDoc(collection(db, 'chat_history'), {
        message: content,
        timestamp: serverTimestamp(),
        userAgent: navigator.userAgent
      }).catch(err => console.error(err));
    } catch(e) {}

    try {
      const apiMessages = [...chatHistory, { role: 'user', content }].map(m => ({
        role: m.role === 'ai' ? 'assistant' : m.role,
        content: m.content
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setChatHistory(prev => {
          setTypewriterIndex(prev.length);
          return [...prev, { role: 'ai', content: data.reply }];
        });
      } else {
        throw new Error(data.error || 'Terjadi kesalahan');
      }
    } catch (error) {
      toast.error('Gagal mengirim pesan');
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-24 right-4 sm:right-8 w-[calc(100vw-32px)] sm:w-[380px] h-[600px] max-h-[calc(100vh-120px)] bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm">Konsultan AI</h3>
                  <p className="text-xs text-green-500 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Online
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Area / Pricing Logic */}
            {showPricing ? (
              <div className="flex-1 overflow-y-auto bg-slate-50/50 p-4">
                <AutomatedPricingLogic 
                  onCancel={() => setShowPricing(false)}
                  onEstimateGenerated={(price, details) => {
                    setShowPricing(false);
                    handleSendMessage(undefined, details);
                  }}
                />
              </div>
            ) : (
            <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-slate-50/50 scroll-smooth custom-scrollbar">
              {chatHistory.map((msg, i) => (
                <MemoizedChatMessage 
                  key={i} 
                  msg={msg} 
                  isTyping={i === typewriterIndex} 
                  onComplete={() => setTypewriterIndex(null)} 
                />
              ))}
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white border border-slate-200/60 shadow-sm rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
            )}

            {/* Input Area */}
            {!showPricing && (<div className="p-4 bg-white border-t border-slate-100 flex flex-col gap-3 shrink-0">
              {/* Quick Actions */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <AnimatePresence mode="popLayout">
                  {(() => {
                    const path = location.pathname;
                    if (path === '/') return [
                      { label: "Bahas Harga", icon: Code2 },
                      { label: "Lihat Portofolio", icon: TrendingUp }, 
                      { label: "Kalkulator Harga", icon: Calculator, action: "pricing" }
                    ];
                    if (path === '/portfolio') return [
                      { label: "Proses Pengerjaan?", icon: Clock },
                      { label: "Bahas Harga", icon: Code2 },
                      { label: "Kalkulator Harga", icon: Calculator, action: "pricing" }
                    ];
                    if (path === '/services') return [
                      { label: "Katalog Harga", icon: TrendingUp },
                      { label: "Hubungi Admin", icon: MessageCircle },
                      { label: "Kalkulator Harga", icon: Calculator, action: "pricing" }
                    ];
                    return [
                      { label: "Bahas Harga", icon: Code2 },
                      { label: "Hubungi Admin", icon: MessageCircle },
                      { label: "Kalkulator Harga", icon: Calculator, action: "pricing" }
                    ];
                  })().map((action, i) => (
                    <motion.button
                      key={action.label}
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -10 }}
                      transition={{ duration: 0.2, delay: i * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => action.action === "pricing" ? setShowPricing(true) : handleSendMessage(undefined, action.label)}
                      className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-[11px] font-sans font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
                    >
                      <action.icon size={12} />
                      {action.label}
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>
              
              <form onSubmit={handleSendMessage} className="relative flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tanyakan sesuatu..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-full pl-5 pr-12 py-3 text-sm font-sans text-slate-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
                <button 
                  type="submit"
                  disabled={!message.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-indigo-600 text-white disabled:bg-slate-300 disabled:text-slate-500 transition-colors"
                >
                  <Send size={14} className={message.trim() ? "translate-x-[1px]" : ""} />
                </button>
              </form>
            </div>)}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isOpen && chatHistory.length === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ delay: 2, duration: 0.5, type: 'spring' }}
            className="fixed bottom-24 right-6 sm:right-8 z-40 bg-white border border-slate-200 shadow-xl rounded-2xl p-4 max-w-[250px] cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <div className="flex items-start gap-3">
              <div className="bg-indigo-100 text-indigo-600 p-2 rounded-full shrink-0">
                <Bot size={16} />
              </div>
              <div>
                <p className="text-xs text-slate-600 font-sans leading-relaxed">
                  Hi! Saya Konsultan AI. Ada yang bisa dibantu untuk website bisnis Anda?
                </p>
              </div>
            </div>
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-b border-r border-slate-200 rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex items-center justify-center">
        {!isOpen && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full bg-indigo-500/20"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full bg-indigo-500/20"
              animate={{
                scale: [1, 1.6, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{
                duration: 2.5,
                delay: 0.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </>
        )}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex items-center justify-center rounded-full bg-slate-900 p-4 text-white shadow-[0_10px_30px_rgba(15,23,42,0.3)] hover:shadow-[0_10px_40px_rgba(79,70,229,0.4)] transition-all duration-300 group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative">
            {isOpen ? <X size={24} /> : <Bot size={24} className="group-hover:text-indigo-400 transition-colors" />}
            {!isOpen && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-indigo-500 rounded-full border-2 border-slate-900 animate-pulse"></span>
            )}
          </div>
          
          <AnimatePresence>
            {!isOpen && (
              <motion.span 
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                exit={{ width: 0, opacity: 0 }}
                className="font-mono text-xs font-bold uppercase overflow-hidden whitespace-nowrap"
              >
                <span className="ml-3 mr-3 text-indigo-300 flex items-center gap-2">Tanya AI <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded bg-slate-800/50 px-1.5 py-0.5 text-[10px] font-sans font-medium normal-case text-indigo-200 border border-slate-700/50"><span className="text-[10px]">⌘</span>K</kbd></span>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
}
