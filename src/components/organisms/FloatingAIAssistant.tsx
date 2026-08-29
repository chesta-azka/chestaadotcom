import React, { useState, useEffect, useRef, memo } from 'react';
import { db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp, doc, setDoc, getDoc, updateDoc, query, where, onSnapshot } from 'firebase/firestore';

import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, Bot, X, Send, Copy, Code2, TrendingUp, Calculator, Clock, MessageCircle, ThumbsUp, ThumbsDown, Folder, ChevronDown, Sparkles, CheckCircle2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import AutomatedPricingLogic from './AutomatedPricingLogic';
import { useLocation } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

type ChatMessage = {
  role: 'ai' | 'user';
  content: string;
  feedback?: 'up' | 'down';
};

const markdownComponents = {
  p: ({node, ...props}: any) => <p className="mb-2 last:mb-0 text-slate-700" {...props} />,
  a: ({node, href, children, ...props}: any) => {
    // If the link is an external search reference, style it as a highlighted data point
    const isSearchData = href && href.startsWith('http');
    return (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-1 hover:underline transition-colors ${isSearchData ? 'bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded border border-purple-200 font-medium' : 'text-blue-600'}`} 
        {...props}
      >
        {isSearchData && <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline opacity-70"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>}
        {children}
      </a>
    );
  },
  ul: ({node, ...props}: any) => <ul className="list-outside list-disc pl-5 mb-3 space-y-1 text-slate-700 marker:text-purple-400" {...props} />,
  ol: ({node, ...props}: any) => <ol className="list-outside list-decimal pl-5 mb-3 space-y-1 text-slate-700 marker:text-purple-500 font-medium" {...props} />,
  li: ({node, ...props}: any) => <li className="leading-relaxed pl-1" {...props} />,
  strong: ({node, ...props}: any) => <strong className="font-semibold text-purple-950" {...props} />,
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
      <code className="bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded text-[11px] font-mono border border-purple-100/50" {...props}>
        {children}
      </code>
    );
  }
};

const MemoizedChatMessage = memo(({ 
  msg, 
  isTyping, 
  isFirst,
  isLast,
  onActionClick,
  onFeedback
}: { 
  msg: ChatMessage; 
  isTyping: boolean; 
  isFirst: boolean;
  isLast: boolean;
  onActionClick: (text: string) => void;
  onFeedback: (type: 'up' | 'down') => void;
}) => {
  // Parsing <opsi> tags and numbered lists
  let displayContent = msg.content;
  const choices: string[] = [];
  
  if (msg.role === 'ai') {
    const opsiRegex = /<opsi>(.*?)<\/opsi>/g;
    let match;
    while ((match = opsiRegex.exec(msg.content)) !== null) {
      if (match[1].trim()) choices.push(match[1].trim());
    }
    displayContent = displayContent.replace(/<opsi>.*?<\/opsi>\n?/g, '').trim();

    if (choices.length === 0) {
      const lines = displayContent.split('\n');
      const possibleChoices = [];
      let i = lines.length - 1;
      
      while (i >= 0) {
        const line = lines[i].trim();
        if (!line) { i--; continue; }
        
        const numMatch = line.match(/^(\d+)[\.\)]\s*(.*)/);
        if (numMatch) {
           let choiceText = numMatch[2].replace(/\*/g, '').trim();
           possibleChoices.unshift(choiceText);
           i--;
        } else {
           break;
        }
      }
      
      if (possibleChoices.length > 0 && possibleChoices.length <= 5) {
         choices.push(...possibleChoices);
         displayContent = lines.slice(0, i + 1).join('\n').trim();
      }
    }
  }

  // ---- TYPEWRITER STATE ----
  const [typedContent, setTypedContent] = useState(isTyping ? '' : displayContent);

  useEffect(() => {
    if (!isTyping) {
      setTypedContent(displayContent);
      return;
    }
    
    const intervalId = setInterval(() => {
      setTypedContent((prev) => {
        if (prev.length < displayContent.length) {
          const charsToAdd = Math.floor(Math.random() * 2) + 1;
          return displayContent.slice(0, prev.length + charsToAdd);
        } else {
          clearInterval(intervalId);
          return prev;
        }
      });
    }, 15);

    return () => clearInterval(intervalId);
  }, [displayContent, isTyping]);

  // Grouping styles
  const isUser = msg.role === 'user';
  
  let borderRadiusClass = 'rounded-2xl';
  if (isUser) {
    if (!isFirst) borderRadiusClass += ' rounded-tr-sm';
    if (!isLast) borderRadiusClass += ' rounded-br-sm';
  } else {
    if (!isFirst) borderRadiusClass += ' rounded-tl-sm';
    if (!isLast) borderRadiusClass += ' rounded-bl-sm';
  }

  const marginClass = isFirst ? 'mt-5' : 'mt-1.5';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} ${marginClass}`}
    >
      <div className={`group relative max-w-[85%] break-words [word-break:break-word] overflow-hidden px-4 py-3 text-[13px] font-sans leading-relaxed shadow-xs border ${borderRadiusClass} ${
        isUser 
          ? 'bg-slate-900 text-white border-slate-800' 
          : 'bg-white/95 backdrop-blur-md text-slate-800 border-slate-200/90 shadow-xs'
      }`}>
        {msg.role === 'ai' ? (
          msg.content === '' && isTyping ? (
            <div className="flex items-center gap-4 w-fit py-2 px-3 bg-slate-50/50 rounded-xl border border-slate-100/50">
              <div className="relative flex items-center justify-center w-6 h-6">
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="text-purple-600">
                  <style>
                    {`
                      .spinner_qM83 {
                        animation: spinner_8HQG 1.05s infinite;
                        fill: currentColor;
                      }
                      .spinner_oXPr {
                        animation-delay: .1s;
                      }
                      .spinner_ZTLf {
                        animation-delay: .2s;
                      }
                      @keyframes spinner_8HQG {
                        0%, 57.14% {
                          animation-timing-function: cubic-bezier(0.33,.66,.66,1);
                          transform: translate(0);
                        }
                        28.57% {
                          animation-timing-function: cubic-bezier(0.33,0,.66,.33);
                          transform: translateY(-6px);
                        }
                        100% {
                          transform: translate(0);
                        }
                      }
                    `}
                  </style>
                  <circle className="spinner_qM83" cx="4" cy="12" r="3" />
                  <circle className="spinner_qM83 spinner_oXPr" cx="12" cy="12" r="3" />
                  <circle className="spinner_qM83 spinner_ZTLf" cx="20" cy="12" r="3" />
                </svg>
              </div>
              <span className="text-[12px] font-medium tracking-wider text-slate-500 uppercase animate-pulse">
                System Thinking...
              </span>
            </div>
          ) : (
            <div className="break-words leading-relaxed space-y-2 text-[13px]">
              {typedContent.includes('[CONFIDENCE:HIGH]') || typedContent.includes('✅ **Verified Pricing Data**') ? (
                <>
                   <ReactMarkdown components={markdownComponents}>
                     {(typedContent + (isTyping ? ' ▋' : '')).replace('\[CONFIDENCE:HIGH\]', '').replace('[CONFIDENCE:HIGH]', '').replace('✅ **Verified Pricing Data**', '').replace('---\n', '')}
                   </ReactMarkdown>
                   <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase text-emerald-600 bg-emerald-50 rounded-lg p-2 w-fit shadow-sm">
                     <CheckCircle2 size={12} className="text-emerald-500" />
                     Verified System Data (High Confidence)
                   </div>
                </>
              ) : typedContent.includes('[CONFIDENCE:LOW]') ? (
                <>
                   <ReactMarkdown components={markdownComponents}>
                     {(typedContent + (isTyping ? ' ▋' : '')).replace('\[CONFIDENCE:LOW\]', '').replace('[CONFIDENCE:LOW]', '')}
                   </ReactMarkdown>
                   <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase text-amber-600 bg-amber-50 rounded-lg p-2 w-fit shadow-sm">
                     <AlertTriangle size={12} className="text-amber-500" />
                     Estimated Figure (Verify with Admin)
                   </div>
                </>
              ) : (
                <ReactMarkdown components={markdownComponents}>
                  {typedContent + (isTyping ? ' ▋' : '')}
                </ReactMarkdown>
              )}
            </div>
          )
        ) : (
          <div className="whitespace-pre-wrap text-[13px] text-white">{displayContent}</div>
        )}
        
        {/* Inline AI Action Buttons */}
        {choices.length > 0 && !isTyping && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="mt-3 pt-3 border-t border-slate-200/50 flex flex-col gap-2.5"
          >
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Saran Balasan Cepat</span>
            {choices.map((choice, idx) => {
              const text = choice.toLowerCase();
              let Icon = MessageCircle;
              let iconColor = "text-blue-500";
              if (text.match(/harga|biaya|kalkulator|estimasi|budget|price/)) {
                Icon = Calculator;
                iconColor = "text-purple-500";
              } else if (text.match(/waktu|lama|proses|kapan/)) {
                Icon = Clock;
                iconColor = "text-amber-500";
              } else if (text.match(/desain|design|portofolio|contoh/)) {
                Icon = Code2;
                iconColor = "text-pink-500";
              } else if (text.match(/fitur|layanan|seo|paket/)) {
                Icon = Sparkles;
                iconColor = "text-emerald-500";
              }

              return (
                <button
                  key={idx}
                  onClick={() => onActionClick(choice)}
                  className="group flex items-center justify-between px-4 py-3 bg-gradient-to-r from-white to-slate-50 hover:from-purple-50 hover:to-indigo-50 text-slate-700 hover:text-purple-700 text-[13px] font-medium rounded-xl border border-slate-200 hover:border-purple-300 transition-all shadow-sm hover:shadow text-left w-full"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Icon size={14} className={iconColor} />
                    </div>
                    <span className="flex-1 pr-2 leading-tight">{choice}</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover:text-purple-600 transition-colors shrink-0"><path d="m9 18 6-6-6-6"/></svg>
                </button>
              );
            })}
          </motion.div>
        )}
        
        
        {msg.role === 'ai' && !isTyping && (
          <div className="absolute -bottom-7 left-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5">
            <button 
              onClick={() => { navigator.clipboard.writeText(displayContent); toast.success('Disalin ke papan klip'); }}
              className="text-slate-400 hover:text-purple-600 flex items-center gap-1 text-[10px] bg-white px-2 py-1 rounded-md shadow-sm border border-slate-200 transition-colors"
              title="Salin pesan"
            >
              <Copy size={10} /> Salin
            </button>
            <button 
              onClick={() => onFeedback('up')}
              className={`flex items-center justify-center w-6 h-6 rounded-md shadow-sm border transition-colors ${msg.feedback === 'up' ? 'bg-purple-100 border-purple-300 text-purple-700' : 'bg-white border-slate-200 text-slate-400 hover:text-purple-600 hover:bg-slate-50'}`}
              title="Jawaban bagus"
            >
              <ThumbsUp size={10} className={msg.feedback === 'up' ? "fill-purple-700" : ""} />
            </button>
            <button 
              onClick={() => onFeedback('down')}
              className={`flex items-center justify-center w-6 h-6 rounded-md shadow-sm border transition-colors ${msg.feedback === 'down' ? 'bg-red-100 border-red-300 text-red-700' : 'bg-white border-slate-200 text-slate-400 hover:text-red-600 hover:bg-slate-50'}`}
              title="Jawaban buruk"
            >
              <ThumbsDown size={10} className={msg.feedback === 'down' ? "fill-red-700" : ""} />
            </button>
          </div>
        )}

      </div>
    </motion.div>
  );
}, (prevProps, nextProps) => {
  return prevProps.isTyping === nextProps.isTyping && prevProps.msg.content === nextProps.msg.content && prevProps.isFirst === nextProps.isFirst && prevProps.isLast === nextProps.isLast && prevProps.msg.feedback === nextProps.msg.feedback;
});

export default function FloatingAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      
      // New: Toggle bubble based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide
        document.getElementById('ai-assistant-bubble')?.classList.add('translate-y-20', 'opacity-0');
      } else {
        // Scrolling up - show
        document.getElementById('ai-assistant-bubble')?.classList.remove('translate-y-20', 'opacity-0');
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isExpanded = !isOpen && (!isScrolled || isHovered);
  const [message, setMessage] = useState('');
  const defaultHistory: ChatMessage[] = [{
    role: 'ai',
    content: 'Halo! Saya asisten AI CHESTAADOTCOM. Ada yang bisa saya bantu terkait pembuatan website atau agen AI?'
  }];
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('ai_chat_history');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return defaultHistory;
  });

  useEffect(() => {
    localStorage.setItem('ai_chat_history', JSON.stringify(chatHistory));
  }, [chatHistory]);
  const [isTyping, setIsTyping] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [knowledgeBase, setKnowledgeBase] = useState('');
  const [businessConfig, setBusinessConfig] = useState<any>(() => {
    try {
      const cached = localStorage.getItem('ai_business_config_cache');
      if (cached) return JSON.parse(cached);
    } catch(e) {}
    return null;
  });

  useEffect(() => {
    const fetchKnowledge = async () => {
      try {
        const q = query(collection(db, 'ai_knowledge_base'), where('active', '==', true));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const contents = snapshot.docs.map(doc => doc.data().content);
          setKnowledgeBase(contents.join('\n\n'));
        });
        return unsubscribe;
      } catch(e) {}
    };
    let unsub;
    fetchKnowledge().then(res => unsub = res);
    
    // Also fetch business configuration
    const unsubBusiness = onSnapshot(doc(db, 'system_config', 'business_variables'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setBusinessConfig(data);
        localStorage.setItem('ai_business_config_cache', JSON.stringify(data));
      }
    });

    return () => { 
      if (unsub) unsub(); 
      unsubBusiness();
    };
  }, []);
  const [showHistory, setShowHistory] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchMode, setIsSearchMode] = useState(false);
    const isBusy = isTyping ;
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const { user } = useAuth() || {};

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        
        if (!isOpen) {
          setIsOpen(true);
          setTimeout(() => inputRef.current?.focus(), 300);
        } else {
           // Cycle shortcuts logic? Or just open if closed
           // Let's implement the trigger for pre-defined common queries based on active page
           // We can get contextual suggestions:
           let contextual = [];
           const path = window.location.pathname;
           if (path === "/") {
             contextual = ["Berapa estimasi harga web e-commerce?", "Beda custom design & template?", "Kalkulator Harga"];
           } else if (path === "/portfolio") {
             contextual = ["Gimana proses pengerjaannya?", "Berapa lama waktu pembuatannya?", "Kalkulator Harga"];
           } else if (path === "/services") {
             contextual = ["Apa fitur paket UMKM Starter?", "Apakah SEO sudah termasuk?", "Kalkulator Harga"];
           } else if (path === "/blog") {
             contextual = ["Apa itu teknologi Agentic AI?", "Pentingkah skor Lighthouse 99+?", "Kalkulator Harga"];
           } else {
             contextual = ["Konsultasi pembuatan website", "Lihat portofolio terbaru", "Kalkulator Harga"];
           }
           
           setMessage(contextual[Math.floor(Math.random() * (contextual.length - 1))]);
           setTimeout(() => inputRef.current?.focus(), 0);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);


  const scrollToBottom = (smooth = true) => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
    }
  };

  useEffect(() => {
    // When typing, we want to auto-scroll instantly (auto) to avoid jitter, 
    // when done, we smoothly scroll.
    scrollToBottom(!isTyping);
  }, [chatHistory, isTyping]);

  // Use a resize observer on the chat container to auto-scroll if it changes size (e.g. image loads or buttons appear)
  useEffect(() => {
    if (!messagesEndRef.current) return;
    const observer = new ResizeObserver(() => {
      scrollToBottom(false);
    });
    const parent = messagesEndRef.current.parentElement;
    if (parent) {
      observer.observe(parent);
    }
    return () => observer.disconnect();
  }, [isOpen]);

  const [sessionId] = useState(() => {
    let id = localStorage.getItem('ai_session_id');
    if (!id) {
      id = Math.random().toString(36).substring(2) + Date.now().toString(36);
      localStorage.setItem('ai_session_id', id);
    }
    return id;
  });

  useEffect(() => {
    if (!sessionId) return;
    const sessionRef = doc(db, 'ai_chat_sessions', sessionId);
    const unsub = onSnapshot(sessionRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.messages) {
          // Only update if length differs or to receive admin messages
          setChatHistory(prev => {
             // Basic merge strategy: trust firestore if it has more messages
             if (data.messages.length > prev.length) {
               return data.messages;
             }
             // Or if human took over, we might need to sync exactly
             if (data.humanTakeover) {
               return data.messages;
             }
             return prev;
          });
        }
      }
    });
    return unsub;
  }, [sessionId]);

  const saveSessionToFirestore = async (history: ChatMessage[], extraFields = {}) => {
    try {
      const sessionRef = doc(db, 'ai_chat_sessions', sessionId);
      await setDoc(sessionRef, {
        messages: history,
        lastUpdated: serverTimestamp(),
        userId: user ? user.uid : 'anonymous',
        userAgent: navigator.userAgent,
        ...extraFields
      }, { merge: true });
    } catch(e) {
      console.error(e);
    }
  };

  const handleFeedback = (index: number, type: 'up' | 'down') => {
    const newHistory = [...chatHistory];
    newHistory[index] = { ...newHistory[index], feedback: type };
    setChatHistory(newHistory);
    saveSessionToFirestore(newHistory, {});
  };

  const handleSendMessage = async (e?: React.FormEvent, presetMessage?: string) => {
    if (e) e.preventDefault();
    const content = presetMessage || message;
    if (!content.trim()) return;

    const isHumanRequest = /human|admin|person|negotiate|support|help|manusia|bantuan|cs|orang/i.test(content);

    setChatHistory(prev => [...prev, { role: 'user', content }]);
    setMessage('');

    if (isHumanRequest) {
      setIsTyping(true);
      try {
        addDoc(collection(db, 'chat_history'), {
          message: content,
          timestamp: serverTimestamp(),
          userAgent: navigator.userAgent,
          userId: user ? user.uid : 'anonymous'
        }).catch(err => console.error(err));
      } catch(e) {}
      
      setTimeout(() => {
         const newHistory = [...chatHistory, { role: 'user', content }, { role: 'ai', content: 'Connecting you to our Principal Engineer...' }];
         setChatHistory(newHistory);
         saveSessionToFirestore(newHistory, { requiresHuman: true, humanRequestedAt: serverTimestamp() });
         setIsTyping(false);
      }, 1000);
      return;
    }
    
    // Optimistic UI state: add empty AI message and show typing
    setChatHistory(prev => [...prev, { role: 'ai', content: '' }]);
    setIsTyping(true);

    try {
      addDoc(collection(db, 'chat_history'), {
        message: content,
        timestamp: serverTimestamp(),
        userAgent: navigator.userAgent,
        userId: user ? user.uid : 'anonymous'
      }).catch(err => console.error(err));
    } catch(e) {}

    try {
      const apiMessages = [...chatHistory, { role: 'user', content }].map(m => ({
        role: m.role === 'ai' ? 'assistant' : m.role,
        content: m.content
      }));

      const businessContext = businessConfig 
        ? `\n\n[BUSINESS CONFIGURATION (CURRENT)]\nStarting Price: Rp ${businessConfig.starting_price.toLocaleString('id-ID')}\nUMKM Price: Rp ${businessConfig.umkm_price.toLocaleString('id-ID')}\nE-commerce Price: Rp ${businessConfig.ecommerce_price.toLocaleString('id-ID')}\nEnterprise Price: Rp ${businessConfig.enterprise_price.toLocaleString('id-ID')}\nBase Service Rate: Rp ${businessConfig.service_base_rate.toLocaleString('id-ID')}`
        : '';

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          messages: apiMessages, 
          pagePath: window.location.pathname, 
          pageTitle: document.title, 
          systemContext: knowledgeBase + businessContext 
        }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Terjadi kesalahan');
      }

      if (response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let done = false;
        let streamedResponse = '';
        
        while (!done) {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          if (value) {
            streamedResponse += decoder.decode(value, { stream: true });
            
            // Update the last message
            setChatHistory(prev => {
              const newHistory = [...prev];
              const lastIndex = newHistory.length - 1;
              if (lastIndex >= 0 && newHistory[lastIndex].role === 'ai') {
                newHistory[lastIndex] = { role: 'ai', content: streamedResponse };
              }
              return newHistory;
            });
          }
        }
        
        // Save the complete session after streaming finishes
        setChatHistory(prev => {
          saveSessionToFirestore(prev);
          return prev;
        });
      }
    } catch (error) {
      toast.error('Gagal mengirim pesan');
      // Remove the empty AI message if it failed completely
      setChatHistory(prev => {
         const newHistory = [...prev];
         if (newHistory.length > 0 && newHistory[newHistory.length-1].content === '') {
            newHistory.pop();
         }
         return newHistory;
      });
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
            className="fixed bottom-24 right-4 sm:right-8 w-[calc(100vw-32px)] sm:w-[390px] h-[600px] max-h-[calc(100vh-120px)] bg-white/85 backdrop-blur-3xl rounded-3xl shadow-[0_25px_60px_-15px_rgba(15,23,42,0.15)] border border-white/90 ring-1 ring-slate-900/5 flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 border border-purple-100 shadow-2xs">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-sm">Konsultan AI CHESTAADOTCOM</h3>
                  <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Online & Siap Bantu
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  aria-label="Tutup asisten AI"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Chat Area / Logic */}
            {showPricing ? (
              <div 
                className="flex-1 overflow-y-auto overscroll-contain bg-slate-50/40 p-4"
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
              >
                <AutomatedPricingLogic 
                  onCancel={() => setShowPricing(false)}
                  onEstimateGenerated={(price, details) => {
                    setShowPricing(false);
                    handleSendMessage(undefined, details);
                  }}
                />
              </div>
            ) : (
            <div 
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              className="flex-1 overflow-y-auto overscroll-contain p-5 pb-8 bg-slate-50/30 scroll-smooth [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300/60 hover:[&::-webkit-scrollbar-thumb]:bg-slate-400/70 [&::-webkit-scrollbar-thumb]:rounded-full"
            >
              {chatHistory.map((msg, i) => {
                const prevMsg = chatHistory[i - 1];
                const nextMsg = chatHistory[i + 1];
                const isFirst = !prevMsg || prevMsg.role !== msg.role;
                const isLast = !nextMsg || nextMsg.role !== msg.role;
                
                return (
                  <MemoizedChatMessage 
                    key={i} 
                    msg={msg} 
                    isTyping={isTyping && i === chatHistory.length - 1 && msg.role === 'ai'} 
                    isFirst={isFirst}
                    isLast={isLast}
                    onActionClick={(text) => handleSendMessage(undefined, text)}
                    onFeedback={(type) => handleFeedback(i, type)}
                  />
                );
              })}
              <div ref={messagesEndRef} />
            </div>
            )}

            {/* Input Area */}
            {!showPricing && (<div className="p-4 bg-white/80 backdrop-blur-xl border-t border-slate-200/80 flex flex-col gap-3 shrink-0">
              {/* Quick Actions */}
              <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Suggested Questions</div>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <AnimatePresence mode="popLayout">
                  {(() => {
                    const path = location.pathname;
                    let contextual: {label: string, icon: any, action: string}[] = [];
                    if (path === "/") {
                      contextual = [
                        { label: "Berapa estimasi harga web e-commerce?", icon: Calculator, action: "send" },
                        { label: "Beda custom design & template?", icon: Code2, action: "send" },
                        { label: "Kalkulator Harga", icon: Calculator, action: "pricing" }
                      ];
                    } else if (path === "/portfolio") {
                      contextual = [
                        { label: "Gimana proses pengerjaannya?", icon: Clock, action: "send" },
                        { label: "Berapa lama waktu pembuatannya?", icon: Clock, action: "send" },
                        { label: "Kalkulator Harga", icon: Calculator, action: "pricing" }
                      ];
                    } else if (path === "/services") {
                      contextual = [
                        { label: "Apa fitur paket UMKM Starter?", icon: Code2, action: "send" },
                        { label: "Apakah SEO sudah termasuk?", icon: TrendingUp, action: "send" },
                        { label: "Kalkulator Harga", icon: Calculator, action: "pricing" }
                      ];
                    } else if (path === "/blog") {
                      contextual = [
                        { label: "Apa itu teknologi Agentic AI?", icon: Bot, action: "send" },
                        { label: "Pentingkah skor Lighthouse 99+?", icon: TrendingUp, action: "send" },
                        { label: "Kalkulator Harga", icon: Calculator, action: "pricing" }
                      ];
                    } else {
                      contextual = [
                        { label: "Konsultasi pembuatan website", icon: MessageCircle, action: "send" },
                        { label: "Lihat portofolio terbaru", icon: TrendingUp, action: "send" },
                        { label: "Kalkulator Harga", icon: Calculator, action: "pricing" }
                      ];
                    }
                    return contextual.slice(0, 3);
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
                      disabled={isBusy}
                      className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-[11px] font-sans font-medium text-slate-600 hover:text-purple-600 hover:bg-purple-50 hover:border-purple-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                  disabled={isBusy}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tanyakan sesuatu..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-full pl-5 pr-12 py-3 text-sm font-sans text-slate-900 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed transition-all"
                />
                <button 
                  type="submit"
                  disabled={!message.trim() || isBusy}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-purple-600 text-white disabled:bg-slate-300 disabled:text-slate-500 transition-colors"
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
            id="ai-assistant-bubble"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ delay: 2, duration: 0.5, type: 'spring' }}
            className="fixed bottom-24 right-6 sm:right-8 z-40 bg-white/10 backdrop-blur-xl border border-white/30 ring-1 ring-white/20 shadow-xl rounded-2xl p-4 max-w-[250px] cursor-pointer transition-all duration-300"
            onClick={() => setIsOpen(true)}
          >
            <div className="flex items-start gap-3">
              <div className="bg-purple-100 text-purple-600 p-2 rounded-full shrink-0">
                <Bot size={16} />
              </div>
              <div>
                <p className="text-xs text-slate-600 font-sans leading-relaxed">
                  Hi! Saya Konsultan AI. Ada yang bisa dibantu untuk website bisnis Anda?
                </p>
              </div>
            </div>
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-b border-r border-white/80 rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex items-center justify-center">
        {!isOpen && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full bg-purple-500/20"
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
              className="absolute inset-0 rounded-full bg-purple-500/20"
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
          className="relative flex items-center justify-center rounded-full bg-slate-900 p-4 text-white shadow-[0_10px_30px_rgba(15,23,42,0.3)] hover:shadow-[0_10px_40px_rgba(107,33,168,0.4)] transition-all duration-300 group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative">
            {isOpen ? <X size={24} /> : <Bot size={24} className="group-hover:text-purple-400 transition-colors" />}
            {!isOpen && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-purple-500 rounded-full border-2 border-slate-900 animate-pulse"></span>
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
                <span className="ml-3 mr-3 text-purple-300 flex items-center gap-2">Tanya AI <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded bg-slate-800/50 px-1.5 py-0.5 text-[10px] font-sans font-medium normal-case text-purple-200 border border-slate-700/50"><span className="text-[10px]">⌘</span>K</kbd></span>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
}
