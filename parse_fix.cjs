const fs = require('fs');

let content = fs.readFileSync('src/components/organisms/FloatingAIAssistant.tsx', 'utf-8');

const target = `  // Parsing <opsi> tags
  let displayContent = msg.content;
  const choices: string[] = [];
  
  if (msg.role === 'ai') {
    const opsiRegex = /<opsi>(.*?)<\\/opsi>/g;
    let match;
    while ((match = opsiRegex.exec(msg.content)) !== null) {
      if (match[1].trim()) {
        choices.push(match[1].trim());
      }
    }
    // Remove <opsi> tags from the display content
    displayContent = msg.content.replace(/<opsi>.*?<\\/opsi>\\n?/g, '').trim();
  }`;

const repl = `  // Parsing <opsi> tags and numbered lists
  let displayContent = msg.content;
  const choices: string[] = [];
  
  if (msg.role === 'ai') {
    const opsiRegex = /<opsi>(.*?)<\\/opsi>/g;
    let match;
    while ((match = opsiRegex.exec(msg.content)) !== null) {
      if (match[1].trim()) choices.push(match[1].trim());
    }
    displayContent = displayContent.replace(/<opsi>.*?<\\/opsi>\\n?/g, '').trim();

    if (choices.length === 0) {
      const lines = displayContent.split('\\n');
      const possibleChoices = [];
      let i = lines.length - 1;
      
      while (i >= 0) {
        const line = lines[i].trim();
        if (!line) { i--; continue; }
        
        const numMatch = line.match(/^(\\d+)[\\.\\)]\\s*(.*)/);
        if (numMatch) {
           let choiceText = numMatch[2].replace(/\\*/g, '').trim();
           possibleChoices.unshift(choiceText);
           i--;
        } else {
           break;
        }
      }
      
      if (possibleChoices.length > 0 && possibleChoices.length <= 5) {
         choices.push(...possibleChoices);
         displayContent = lines.slice(0, i + 1).join('\\n').trim();
      }
    }
  }`;

content = content.replace(target, repl);
fs.writeFileSync('src/components/organisms/FloatingAIAssistant.tsx', content);
