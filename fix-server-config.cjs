const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf-8');

// Fix systemInstruction location in generateContentStream
code = code.replace(
  /systemInstruction: "Anda adalah Konsultan AI Eksklusif dari CHESTADOTCOM\. Jawab dengan ramah, cerdas, dan natural\.",/g,
  `config: { systemInstruction: "Anda adalah Konsultan AI Eksklusif dari CHESTADOTCOM. Jawab dengan ramah, cerdas, dan natural." },`
);

fs.writeFileSync('server.ts', code);
