const fs = require('fs');
let code = fs.readFileSync('src/components/organisms/FloatingAIAssistant.tsx', 'utf8');

const target = `  const defaultHistory: ChatMessage[] = [{
    role: 'ai',
    content: 'Halo! Saya asisten AI CHESTAADOTCOM. Ada yang bisa saya bantu terkait pembuatan website atau agen AI?'
  }];`;

const replacement = `  const defaultHistory: ChatMessage[] = [{
    role: 'ai',
    content: 'Halo! Saya asisten AI CHESTAADOTCOM. Ada yang bisa saya bantu terkait pembuatan website atau agen AI?\\n<opsi>Buat Website Bisnis</opsi>\\n<opsi>Hubungi Admin Manusia 👩‍💻</opsi>'
  }];`;

if(code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('src/components/organisms/FloatingAIAssistant.tsx', code);
  console.log("Patched default history");
} else {
  console.log("Target not found!");
}
