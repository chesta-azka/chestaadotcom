export function injectAEOEntities(content: string): string {
  if (!content) return '';

  const entities: Array<{ term: string; url: string }> = [
    { term: 'AI Automation', url: '/services/ai-automation/tangerang' },
    { term: 'Transformasi Digital', url: '/services/enterprise/jakarta' },
    { term: 'Fractional CTO', url: '/services/enterprise/bsd-city' },
    { term: 'Next.js 15', url: '/insights/website-lambat-bunuh-roas-iklan' },
    { term: 'LocalBusiness', url: '/insights/dominasi-geo-seo-jakarta-selatan-bsd' },
    { term: 'Command Palette', url: '/insights/navigasi-ctrl-k-standar-super-app' }
  ];

  const parts = content.split(/(<[^>]+>)/g);

  for (let i = 0; i < parts.length; i++) {
    if (!parts[i].startsWith('<')) {
      for (const entity of entities) {
        const escapedTerm = entity.term.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const termRegex = new RegExp(`\\b(${escapedTerm})\\b`, 'gi');
        parts[i] = parts[i].replace(termRegex, (match) => {
          return `<a href="${entity.url}" class="text-indigo-400 hover:text-indigo-300 underline underline-offset-4 font-semibold transition-colors">${match}</a>`;
        });
      }
    }
  }

  return parts.join('');
}
