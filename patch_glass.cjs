const fs = require('fs');

function replaceClass(file, searchRegex, newClasses) {
  try {
    let content = fs.readFileSync(file, 'utf-8');
    content = content.replace(searchRegex, (match, p1, p2) => {
      // p1 is what comes before the class string, p2 is the class string
      return p1 + p2 + ' ' + newClasses;
    });
    fs.writeFileSync(file, content);
  } catch (e) {
    console.error('Error with ' + file + ':', e);
  }
}

// 1. DashboardCard
replaceClass('src/components/atoms/DashboardCard.tsx', /(className=")([^"]*bg-white[^"]*)/, 'glass-panel');

// 2. FloatingAIAssistant (the main container)
replaceClass('src/components/organisms/FloatingAIAssistant.tsx', /(className="[^"]*bg-white\/10 backdrop-blur-[^"]*)/, 'glass-panel');
replaceClass('src/components/organisms/FloatingAIAssistant.tsx', /(className="[^"]*bg-white\/5 backdrop-blur-[^"]*)/g, 'glass-panel');

// 3. QuickQuoteModal
replaceClass('src/components/organisms/QuickQuoteModal.tsx', /(className="relative w-full max-w-2xl bg-white[^"]*)/, 'glass-panel');

// 4. Hero Section cards
replaceClass('src/components/organisms/HeroSection.tsx', /(className="absolute[^"]*bg-white\/60[^"]*)/, 'glass-panel');
replaceClass('src/components/organisms/HeroSection.tsx', /(className="absolute[^"]*bg-white\/70[^"]*)/, 'glass-panel');

console.log('Applied glass-panel class to several components');
