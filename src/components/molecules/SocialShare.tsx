'use client';

import React, { useState, useEffect } from 'react';
import { Linkedin, Twitter, Link as LinkIcon, Check, Share2, MessageCircle, Send } from 'lucide-react';

interface SocialShareProps {
  title: string;
  description?: string;
  className?: string;
}

export default function SocialShare({ title, description, className = '' }: SocialShareProps) {
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [supportsNativeShare, setSupportsNativeShare] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUrl(window.location.href);
      setSupportsNativeShare(typeof navigator !== 'undefined' && !!navigator.share);
    }
  }, []);

  const handleCopy = async () => {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (err) {
      console.warn('Failed to copy URL:', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share && url) {
      try {
        await navigator.share({
          title,
          text: description || title,
          url,
        });
      } catch (err) {
        // User dismissed or aborted share
      }
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDesc = encodeURIComponent(description ? `${title} - ${description}` : title);

  const linkedInShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const twitterShare = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const whatsappShare = `https://api.whatsapp.com/send?text=${encodedDesc}%20${encodedUrl}`;
  const telegramShare = `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`;

  if (!url) {
    return (
      <div className={`flex items-center gap-2.5 h-9 ${className}`}>
        <div className="w-16 h-4 bg-slate-100 rounded animate-pulse" />
        <div className="w-8 h-8 rounded-xl bg-slate-100 animate-pulse" />
        <div className="w-8 h-8 rounded-xl bg-slate-100 animate-pulse" />
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap items-center gap-2 font-sans ${className}`}>
      <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold uppercase tracking-wider mr-1 select-none">
        <Share2 className="w-3.5 h-3.5 text-purple-700" />
        <span>Bagikan</span>
      </div>

      <a 
        href={whatsappShare} 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Bagikan ke WhatsApp"
        title="Bagikan ke WhatsApp"
        className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl bg-white text-slate-600 hover:bg-[#25D366] hover:text-white border border-purple-100 hover:border-[#25D366] shadow-2xs transition-all cursor-pointer hover:scale-105 active:scale-95"
      >
        <MessageCircle className="w-4 h-4" />
      </a>

      <a 
        href={linkedInShare} 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Bagikan ke LinkedIn"
        title="Bagikan ke LinkedIn"
        className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl bg-white text-slate-600 hover:bg-[#0A66C2] hover:text-white border border-purple-100 hover:border-[#0A66C2] shadow-2xs transition-all cursor-pointer hover:scale-105 active:scale-95"
      >
        <Linkedin className="w-4 h-4" />
      </a>

      <a 
        href={twitterShare} 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Bagikan ke X"
        title="Bagikan ke X"
        className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl bg-white text-slate-600 hover:bg-slate-900 hover:text-white border border-purple-100 hover:border-slate-900 shadow-2xs transition-all cursor-pointer hover:scale-105 active:scale-95"
      >
        <Twitter className="w-4 h-4" />
      </a>

      <a 
        href={telegramShare} 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Bagikan ke Telegram"
        title="Bagikan ke Telegram"
        className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl bg-white text-slate-600 hover:bg-[#229ED9] hover:text-white border border-purple-100 hover:border-[#229ED9] shadow-2xs transition-all cursor-pointer hover:scale-105 active:scale-95"
      >
        <Send className="w-4 h-4" />
      </a>

      <button 
        onClick={handleCopy}
        aria-label={copied ? "Tautan Disalin" : "Salin Tautan"}
        title={copied ? "Tautan Disalin!" : "Salin Tautan"}
        className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-xl transition-all cursor-pointer hover:scale-105 active:scale-95 border ${
          copied 
            ? 'bg-purple-900 text-white border-purple-900 shadow-2xs' 
            : 'bg-white text-slate-600 hover:bg-purple-50 border-purple-100 shadow-2xs'
        }`}
      >
        {copied ? (
          <Check className="w-4 h-4 text-white" />
        ) : (
          <LinkIcon className="w-4 h-4" />
        )}
      </button>

      {supportsNativeShare && (
        <button 
          onClick={handleNativeShare}
          aria-label="Buka Opsi Berbagi"
          title="Buka Opsi Berbagi"
          className="sm:hidden w-8 h-8 flex items-center justify-center rounded-xl bg-purple-50 text-purple-900 border border-purple-200 shadow-2xs transition-all cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
        </button>
      )}

      {copied && (
        <span className="text-[11px] font-sans font-semibold text-purple-900 bg-purple-50 px-2 py-0.5 rounded-lg border border-purple-200 animate-in fade-in">
          Tersalin!
        </span>
      )}
    </div>
  );
}
