const fs = require('fs');
let code = fs.readFileSync('src/components/organisms/FloatingAIAssistant.tsx', 'utf8');

const target = `if (data.humanTakeover === true) { setIsHumanTakeover(true); } else { setIsHumanTakeover(false); }`;
const replacement = `if (data.humanTakeover === true || data.requiresHuman === true) { setIsHumanTakeover(true); } else { setIsHumanTakeover(false); }`;

if(code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('src/components/organisms/FloatingAIAssistant.tsx', code);
  console.log("Patched snapshot amber persistence");
} else {
  console.log("Target snapshot not found!");
}
