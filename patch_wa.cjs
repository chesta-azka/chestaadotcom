const fs = require('fs');
const path = require('path');

function walkSync(dir, filelist = []) {
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach(file => {
      const dirFile = path.join(dir, file);
      if (fs.statSync(dirFile).isDirectory()) {
        filelist = walkSync(dirFile, filelist);
      } else if (dirFile.endsWith('.tsx') || dirFile.endsWith('.ts')) {
        filelist.push(dirFile);
      }
    });
  }
  return filelist;
}

const files = walkSync('./src');
files.push('./server.ts');

let totalModified = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // 1. Replace window.open with event dispatcher
  // e.g. window.open(`https://wa.me/6282125447232?text=${encodeURIComponent(text)}`, '_blank');
  content = content.replace(/window\.open\(\s*[`'"]https:\/\/wa\.me[^,]+,\s*'_blank'\s*\);?/g, "window.dispatchEvent(new CustomEvent('open-ai-chat'))");
  content = content.replace(/window\.open\(\s*[`'"]https:\/\/wa\.me[^\)]+\);?/g, "window.dispatchEvent(new CustomEvent('open-ai-chat'))");

  // 2. Replace hrefs
  content = content.replace(/href=["']https:\/\/wa\.me[^"']*["']/g, "href=\"#\" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('open-ai-chat')); }}");

  // 3. Replace text
  content = content.replace(/WhatsApp/g, 'Live Chat');
  content = content.replace(/Whatsapp/g, 'Live Chat');
  content = content.replace(/whatsapp/g, 'live chat');

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
    totalModified++;
  }
});

console.log(`Total files modified: ${totalModified}`);

// Now, properly patch FloatingAIAssistant.tsx
let floatContent = fs.readFileSync('./src/components/organisms/FloatingAIAssistant.tsx', 'utf8');
const effectTarget = `window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);`;

const effectReplacement = `window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('open-ai-chat', handleOpenChat);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('open-ai-chat', handleOpenChat);
    };
  }, []);`;

if (floatContent.includes(effectTarget)) {
  floatContent = floatContent.replace(effectTarget, effectReplacement);
  fs.writeFileSync('./src/components/organisms/FloatingAIAssistant.tsx', floatContent);
  console.log('Successfully patched FloatingAIAssistant.tsx with open-ai-chat event!');
} else {
  console.log('Could not find target in FloatingAIAssistant.tsx');
}
