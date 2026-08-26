const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf-8');

// Fix /api/posts/validate
code = code.replace(
  /const groqApiKey = process\.env\.GROQ_API_KEY;\n  if \(\!groqApiKey\) \{\n    throw new Error\("GROQ_API_KEY is not defined"\);\n  \}/,
  `const groqApiKey = process.env.GROQ_API_KEY;
  if (!groqApiKey) {
    // Silently skip to fallback if no key
    throw new Error("SKIP_GROQ");
  }`
);

code = code.replace(
  /console\.warn\("Groq API call failed, falling back to Gemini API\.\.\.", groqError\);/g,
  `if (groqError.message !== "SKIP_GROQ") {
      console.warn("Groq API call failed, falling back to Gemini API...", groqError.message);
    }`
);

// Fix /api/chat
code = code.replace(
  /const groqKey = process\.env\.GROQ_API_KEY \|\| "fallback_key";\n    const groq = new Groq\(\{ apiKey: groqKey \}\);/,
  `const groqKey = process.env.GROQ_API_KEY;
    if (!groqKey) throw new Error("SKIP_GROQ");
    const groq = new Groq({ apiKey: groqKey });`
);

code = code.replace(
  /console\.error\("Groq chat failed:", error\);/g,
  `if (error.message !== "SKIP_GROQ") {
      console.warn("Groq chat fallback triggered.");
    }`
);

fs.writeFileSync('server.ts', code);
