const fs = require('fs');
let content = fs.readFileSync('src/components/organisms/FloatingAIAssistant.tsx', 'utf-8');

const target = `    );
  },
  a: ({node, ...props}: any) => <a className="text-purple-600 font-medium underline underline-offset-2 decoration-purple-300 hover:text-purple-800 hover:decoration-purple-600 transition-colors" {...props} />
};`;

const replace = `    );
  }
};`;

content = content.replace(target, replace);
fs.writeFileSync('src/components/organisms/FloatingAIAssistant.tsx', content);
