const fs = require('fs');
let code = fs.readFileSync('src/components/organisms/FloatingAIAssistant.tsx', 'utf8');

const target = "      return;\n    }\n    \n    // Optimistic UI state: add empty AI message and show typing";
const target2 = "      return;\n    }\n        // Optimistic UI state";

if (code.includes("      return;\n    }\n        // Optimistic UI state")) {
  code = code.replace("      return;\n    }\n        // Optimistic UI state", 
    `      return;
    }
    
    if (isHumanTakeover) {
      const newHistory = [...chatHistory, { role: 'user', content }];
      saveSessionToFirestore(newHistory, {});
      return;
    }

        // Optimistic UI state`);
  fs.writeFileSync('src/components/organisms/FloatingAIAssistant.tsx', code);
  console.log("Patched successfully.");
} else {
  console.log("Could not find the target string.");
}
