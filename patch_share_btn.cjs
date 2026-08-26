const fs = require('fs');
let code = fs.readFileSync('src/components/atoms/ShareButton.tsx', 'utf8');

code = `import React from 'react';
import { Link as LinkIcon } from 'lucide-react';
import toast from 'react-hot-toast';

interface ShareButtonProps {
  title: string;
  text?: string;
  url?: string;
  className?: string;
}

export default function ShareButton({ title, text, url = typeof window !== 'undefined' ? window.location.href : '', className = '' }: ShareButtonProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    toast.success('URL disalin ke clipboard!');
  };

  return (
    <button 
      onClick={handleCopy}
      className={\`flex items-center gap-2 \${className}\`}
      title="Salin tautan halaman ini"
    >
      <LinkIcon size={18} />
      <span className="text-sm font-medium">Salin URL</span>
    </button>
  );
}
`;
fs.writeFileSync('src/components/atoms/ShareButton.tsx', code);
