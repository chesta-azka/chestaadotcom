'use client';

import React, { useState, useEffect } from 'react';
import { Linkedin, Twitter, Link as LinkIcon, Check } from 'lucide-react';

export default function SocialShare({ title }: { title: string }) {
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const handleCopy = () => {
    if (!url) return;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const linkedInShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const twitterShare = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;

  // Don't render until client side is hydrated to avoid SSR mismatch with URL
  if (!url) return <div className="h-10"></div>; 

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-slate-500 dark:text-slate-400 mr-2 tracking-wide uppercase text-xs">Share</span>
      <a 
        href={linkedInShare} 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-200/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 hover:bg-[#0A66C2] hover:text-white dark:hover:bg-[#0A66C2] dark:hover:text-white transition-all duration-300 backdrop-blur-md"
      >
        <Linkedin className="w-4 h-4" />
      </a>
      <a 
        href={twitterShare} 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Share on Twitter"
        className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-200/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 backdrop-blur-md"
      >
        <Twitter className="w-4 h-4" />
      </a>
      <button 
        onClick={handleCopy}
        aria-label="Copy link"
        className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-200/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all duration-300 backdrop-blur-md"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <LinkIcon className="w-4 h-4" />}
      </button>
    </div>
  );
}
