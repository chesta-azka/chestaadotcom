const fs = require('fs');
let content = fs.readFileSync('src/components/organisms/CommandPalette.tsx', 'utf-8');

const askAiStr = `  const askAIAction: ActionItem = {
    id: 'ask-ai-search',
    title: searchQuery.trim() === '' ? 'Tanya AI Assistant' : \`Tanya AI tentang "\${searchQuery}"\`,
    subtitle: 'Konsultasi cerdas dengan AI Agent kami',
    icon: Sparkles,
    action: () => window.dispatchEvent(new CustomEvent('open-ai-chat', { detail: { message: searchQuery.trim() || 'Halo, saya ingin konsultasi mengenai layanan dari chestaadotcom.' } })),
    category: 'Suggested'
  };`;

const displayedActionsRegex = /const displayedActions = searchQuery\.trim\(\) === ''\s*\?\s*SUGGESTED_ACTIONS\s*:\s*ALL_ACTIONS\.filter\([^)]*\)\s*;/s;

content = content.replace(displayedActionsRegex, 
askAiStr + `
  const displayedActions = searchQuery.trim() === ''
    ? [askAIAction, ...SUGGESTED_ACTIONS.filter(a => a.id !== 'ask-ai')]
    : [askAIAction, ...ALL_ACTIONS.filter(action => 
         action.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
         action.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      )];`
);

fs.writeFileSync('src/components/organisms/CommandPalette.tsx', content);
console.log('CommandPalette updated');
