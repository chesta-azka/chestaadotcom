const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf-8');

// Fix fallback error handling
code = code.replace(
  /\} catch \(fallbackErr\) \{\n      console\.error\("Gemini fallback also failed:", fallbackErr\);\n      if \(!res\.headersSent\) \{\n        res\.status\(500\)\.json\(\{ error: error\.message \}\);\n      \} else \{\n        res\.end\(\);\n      \}\n    \}/,
  `} catch (fallbackErr) {
      console.error("Gemini fallback also failed:", fallbackErr);
      if (!res.headersSent) {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
      }
      res.write('data: ' + JSON.stringify({ text: "\\n\\n*[Sistem]: Mohon maaf, layanan AI sedang mengalami gangguan jaringan atau melebihi batas kuota. Silakan coba beberapa saat lagi.*" }) + '\\n\\n');
      res.write('data: [DONE]\\n\\n');
      res.end();
    }`
);

fs.writeFileSync('server.ts', code);
