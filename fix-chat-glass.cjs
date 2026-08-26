const fs = require('fs');
let code = fs.readFileSync('src/components/organisms/FloatingAIAssistant.tsx', 'utf-8');

code = code.replace(
  /bg-slate-50\/50 p-4/g,
  'bg-transparent p-4'
);

code = code.replace(
  /bg-slate-50\/50 scroll-smooth custom-scrollbar/g,
  'bg-transparent scroll-smooth [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300/50 hover:[&::-webkit-scrollbar-thumb]:bg-slate-400/50 [&::-webkit-scrollbar-thumb]:rounded-full'
);

// We should also ensure the whole floating assistant container is extremely glass.
code = code.replace(
  /bg-white\/60 backdrop-blur-3xl/g,
  'bg-white/20 backdrop-blur-[60px]'
);

code = code.replace(
  /bg-white\/40 backdrop-blur-md shrink-0/g,
  'bg-white/10 backdrop-blur-2xl shrink-0'
);

code = code.replace(
  /bg-white\/40 backdrop-blur-md border-t border-white\/40 flex flex-col gap-3 shrink-0/g,
  'bg-white/10 backdrop-blur-2xl border-t border-white/20 flex flex-col gap-3 shrink-0'
);

// Notification Bubble
code = code.replace(
  /bg-white\/60 backdrop-blur-2xl/g,
  'bg-white/30 backdrop-blur-3xl'
);

fs.writeFileSync('src/components/organisms/FloatingAIAssistant.tsx', code);
