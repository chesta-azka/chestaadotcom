const fs = require('fs');

let code = fs.readFileSync('src/pages/BlogPostPage.tsx', 'utf8');

const replacement = `
  const headings: { id: string; text: string; level: number }[] = [];
  let headingCount = 0;
  
  // Track unique IDs
  const idMap = new Map<string, number>();

  unifiedContent = unifiedContent.replace(/^(#{2,3})\\s+(.*)$/gm, (match, hashes, title) => {
    const cleanTitle = title.replace(/<[^>]+>/g, '').trim();
    let baseId = cleanTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    
    let id = baseId;
    if (idMap.has(baseId)) {
      const count = idMap.get(baseId)! + 1;
      idMap.set(baseId, count);
      id = \`\${baseId}-\${count}\`;
    } else {
      idMap.set(baseId, 1);
    }

    headings.push({ id, text: cleanTitle, level: hashes.length });
    
    if (hashes === '##') {
      headingCount++;
      if (headingCount === 3) {
        return \`<InlineCTA />\n\n<h2 id="\${id}">\${title}</h2>\`;
      }
      return \`<h2 id="\${id}">\${title}</h2>\`;
    }
    
    return \`<h3 id="\${id}">\${title}</h3>\`;
  });
`;

code = code.replace(/const headings: \{ id: string; text: string; level: number \}.*return `\$\{hashes\} \$\{cleanTitle\}`;.*?\}\);/s, replacement.trim());

fs.writeFileSync('src/pages/BlogPostPage.tsx', code);
console.log('Patched BlogPostPage.tsx');
