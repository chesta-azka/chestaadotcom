import React, { useState } from 'react';
import { Share2, Check, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SocialShareWidget({ title, url }: { title: string, url: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("Tautan disalin ke clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTwitterShare = () => {
    const text = encodeURIComponent(title);
    const shareUrl = encodeURIComponent(url);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}`, '_blank');
  };

  const handleLinkedInShare = () => {
    const shareUrl = encodeURIComponent(url);
    const titleEncoded = encodeURIComponent(title);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}&title=${titleEncoded}`, '_blank');
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`Lihat ini: ${title} - ${url}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="flex items-center gap-2 no-print">
      <span className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-400 mr-2 hidden sm:inline-block">Share:</span>
      
      <button
        onClick={handleWhatsAppShare}
        className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-[#25D366] hover:border-[#25D366] hover:text-white text-slate-600 flex items-center justify-center transition-all shadow-sm"
        title="Share to WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
      </button>
      <button
        onClick={handleTwitterShare}
        className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-[#1DA1F2] hover:border-[#1DA1F2] hover:text-white text-slate-600 flex items-center justify-center transition-all shadow-sm"
        title="Share to Twitter"
      >
        <Twitter size={14} />
      </button>
      <button
        onClick={handleLinkedInShare}
        className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white text-slate-600 flex items-center justify-center transition-all shadow-sm"
        title="Share to LinkedIn"
      >
        <Linkedin size={14} />
      </button>
      <button
        onClick={handleCopyLink}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-xs font-sans font-medium text-slate-700 transition-colors shadow-sm ml-1"
      >
        {copied ? <Check size={14} className="text-emerald-600" /> : <LinkIcon size={14} />}
        <span className="hidden sm:inline">{copied ? 'Disalin' : 'Copy'}</span>
      </button>
    </div>
  );
}
