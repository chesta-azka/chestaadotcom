const fs = require('fs');
const path = 'src/components/organisms/FloatingAIAssistant.tsx';
let code = fs.readFileSync(path, 'utf-8');

code = code.replace(
  "handleSendMessage(undefined, details);\n                    toast.success('Estimasi berhasil digenerate');\n                  }}",
  "handleSendMessage(undefined, details);\n                  }}"
);

fs.writeFileSync(path, code);
