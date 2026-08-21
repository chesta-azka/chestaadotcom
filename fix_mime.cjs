const fs = require('fs');
let server = fs.readFileSync('server.ts', 'utf-8');

const targetStr = `      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        tools: [{ googleSearch: {} }],
      }`;

const replacementStr = `      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      }`;

server = server.replace(targetStr, replacementStr);

const parseTarget = `    try {
      insights = JSON.parse(response.text);
    } catch(e) {`;

const parseReplacement = `    try {
      let responseText = response.text || "";
      // Strip markdown json blocks if present
      if (responseText.includes("\`\`\`json")) {
        responseText = responseText.replace(/\`\`\`json/g, "").replace(/\`\`\`/g, "").trim();
      } else if (responseText.includes("\`\`\`")) {
        responseText = responseText.replace(/\`\`\`/g, "").trim();
      }
      insights = JSON.parse(responseText);
    } catch(e) {`;

server = server.replace(parseTarget, parseReplacement);

fs.writeFileSync('server.ts', server);
console.log('Fixed mime type conflict');
