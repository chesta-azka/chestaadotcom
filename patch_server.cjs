const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(
  /console\.warn\("Did-you-know generation hit quota\/error\. Using fallback\."\);/,
  `// Silent fallback`
);

fs.writeFileSync('server.ts', code);
console.log('Silenced the fallback warning.');
