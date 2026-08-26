const fs = require('fs');
let code = fs.readFileSync('src/pages/AdminPage.tsx', 'utf-8');

// 1. Add states for auto-complete
const stateSearchQuery = `const [searchQuery, setSearchQuery] = useState('');`;
const newSearchStates = `const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const autocompleteSuggestions = useMemo(() => {
    if (!searchQuery || searchQuery.length < 2) return [];
    
    // Extract unique words from logs
    const wordsSet = new Set<string>();
    logs.forEach(l => {
      if (l.message) {
        const words = l.message.toLowerCase().match(/\\b\\w+\\b/g);
        if (words) {
          words.forEach(w => wordsSet.add(w));
        }
      }
      if (l.userName) wordsSet.add(l.userName.toLowerCase());
      if (l.userId) wordsSet.add(l.userId.toLowerCase());
    });
    
    const queryLower = searchQuery.toLowerCase();
    return Array.from(wordsSet)
      .filter(w => w.includes(queryLower) && w !== queryLower)
      .slice(0, 5);
  }, [searchQuery, logs]);
`;

if (code.includes(stateSearchQuery) && !code.includes('showSuggestions')) {
  code = code.replace(stateSearchQuery, newSearchStates);
}

// 2. Modify Search Input
const oldSearchInput = `<div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text"
                placeholder="Cari kata kunci..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>`;

const newSearchInput = `<div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text"
                placeholder="Cari kata kunci..."
                value={searchQuery}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-full sm:w-auto"
              />
              {/* Autocomplete Dropdown */}
              <AnimatePresence>
                {showSuggestions && autocompleteSuggestions.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden"
                  >
                    {autocompleteSuggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSearchQuery(suggestion);
                          setShowSuggestions(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>`;

if (code.includes(oldSearchInput)) {
  code = code.replace(oldSearchInput, newSearchInput);
} else {
    console.log("Could not find the search input block. Attempting more flexible replace...");
    // Let's use a simpler match if indentation is different
    const searchRegex = /<div className="relative">[\s\S]*?Cari kata kunci\.\.\.[\s\S]*?<\/div>/;
    code = code.replace(searchRegex, newSearchInput);
}

fs.writeFileSync('src/pages/AdminPage.tsx', code);
