const fs = require('fs');
let code = fs.readFileSync('src/components/organisms/FloatingAIAssistant.tsx', 'utf8');

const target = `             if (data.humanTakeover) {
               return data.messages;
             }`;
const replacement = `             if (data.humanTakeover || data.requiresHuman) {
               return data.messages;
             }`;

if(code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('src/components/organisms/FloatingAIAssistant.tsx', code);
  console.log("Patched sync");
} else {
  console.log("Target sync not found!");
}
