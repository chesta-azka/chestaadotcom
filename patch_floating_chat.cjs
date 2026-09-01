const fs = require('fs');
let code = fs.readFileSync('src/components/organisms/FloatingAIAssistant.tsx', 'utf8');

const targetEffect = `  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      
      // New: Toggle bubble based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide
        document.getElementById('ai-assistant-bubble')?.classList.add('translate-y-20', 'opacity-0');
      } else {
        document.getElementById('ai-assistant-bubble')?.classList.remove('translate-y-20', 'opacity-0');
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);`;

const newEffect = `  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        document.getElementById('ai-assistant-bubble')?.classList.add('translate-y-20', 'opacity-0');
      } else {
        document.getElementById('ai-assistant-bubble')?.classList.remove('translate-y-20', 'opacity-0');
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    
    const handleOpenChat = (e) => {
      setIsOpen(true);
    };
    window.addEventListener('open-ai-chat', handleOpenChat);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('open-ai-chat', handleOpenChat);
    };
  }, []);`;

if (code.includes(targetEffect)) {
  code = code.replace(targetEffect, newEffect);
  fs.writeFileSync('src/components/organisms/FloatingAIAssistant.tsx', code);
  console.log("Patched FloatingAIAssistant to listen for open-ai-chat");
} else {
  console.log("Target not found in FloatingAIAssistant for scroll effect");
}
