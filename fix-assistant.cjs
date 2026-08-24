const fs = require('fs');
const path = 'src/components/organisms/FloatingAIAssistant.tsx';
let code = fs.readFileSync(path, 'utf-8');

// Import toast
if (!code.includes("import toast from 'react-hot-toast';")) {
    code = code.replace("import React, { useState, useEffect, useRef } from 'react';", "import React, { useState, useEffect, useRef } from 'react';\nimport toast from 'react-hot-toast';");
}

// Update initial greeting
const oldInitial = "Halo! Saya Konsultan AI chestaadotcom. Kami memiliki paket pembuatan website mulai dari Rp550.000. Boleh tahu nama Anda dan website seperti apa yang Anda butuhkan?";
const newInitial = "Halo! Saya Konsultan AI Eksklusif dari CHESTADOTCOM. Saat ini tim kami sedang sibuk mengembangkan 3 proyek website berskala besar, namun kami siap memberikan prioritas untuk proyek Anda. Paket pembuatan website premium kami mulai dari Rp550.000. Boleh tahu nama Anda dan bisnis seperti apa yang ingin Anda kembangkan?";
code = code.split(oldInitial).join(newInitial);

// Add toasts in handleClearChat
const oldClear = "const handleClearChat = () => {\n    const initial = [{ role: 'ai', content: 'Halo! Saya Konsultan AI Eksklusif dari CHESTADOTCOM. Saat ini tim kami sedang sibuk mengembangkan 3 proyek website berskala besar, namun kami siap memberikan prioritas untuk proyek Anda. Paket pembuatan website premium kami mulai dari Rp550.000. Boleh tahu nama Anda dan bisnis seperti apa yang ingin Anda kembangkan?' }];\n    setChatHistory(initial as ChatMessage[]);\n  };";
const newClear = "const handleClearChat = () => {\n    const initial = [{ role: 'ai', content: 'Halo! Saya Konsultan AI Eksklusif dari CHESTADOTCOM. Saat ini tim kami sedang sibuk mengembangkan 3 proyek website berskala besar, namun kami siap memberikan prioritas untuk proyek Anda. Paket pembuatan website premium kami mulai dari Rp550.000. Boleh tahu nama Anda dan bisnis seperti apa yang ingin Anda kembangkan?' }];\n    setChatHistory(initial as ChatMessage[]);\n    toast.success('Percakapan telah direset.');\n  };";
code = code.replace(oldClear, newClear);

// Add toast for error in fetch catch
code = code.replace(
  "setChatHistory(prev => [...prev, { role: 'ai', content: \"Maaf, gagal terhubung ke AI.\" }]);",
  "setChatHistory(prev => [...prev, { role: 'ai', content: \"Maaf, gagal terhubung ke AI.\" }]);\n      toast.error('Gagal terhubung ke AI');"
);

// Add toast for error in fetch response
code = code.replace(
  "setChatHistory(prev => [...prev, { role: 'ai', content: \"Maaf, terjadi kesalahan pada server.\" }]);",
  "setChatHistory(prev => [...prev, { role: 'ai', content: \"Maaf, terjadi kesalahan pada server.\" }]);\n        toast.error('Terjadi kesalahan pada server');"
);

// Add toast for successful estimate generation
code = code.replace(
  "onEstimateGenerated={(price, details) => {\n                    setShowPricing(false);\n                    handleSendMessage(undefined, details);\n                  }}",
  "onEstimateGenerated={(price, details) => {\n                    setShowPricing(false);\n                    handleSendMessage(undefined, details);\n                    toast.success('Estimasi berhasil digenerate');\n                  }}"
);

// Add Header status badge for 3 projects
const headerIndicatorStr = `                    <p className="text-[10px] text-indigo-100/90 font-medium tracking-wide uppercase">Powered by Groq</p>`;
const newHeaderIndicatorStr = `                    <p className="text-[10px] text-indigo-100/90 font-medium tracking-wide flex items-center gap-1.5 bg-indigo-500/30 px-1.5 py-0.5 rounded-full"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Sibuk: 3 Proyek Aktif</p>`;
code = code.replace(headerIndicatorStr, newHeaderIndicatorStr);

fs.writeFileSync(path, code);
