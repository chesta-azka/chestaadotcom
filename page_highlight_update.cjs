const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf8');

const highlightComponent = `
function HighlightWord({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      variants={{
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.4, type: 'spring' } }
      }}
      className="bg-purple-600 text-white px-2 py-0.5 rounded-md font-semibold inline-block mx-1 shadow-sm shadow-purple-600/20"
    >
      {children}
    </motion.span>
  );
}
`;

// Insert the HighlightWord component after TypewriterKeyword
code = code.replace(
  /function TypewriterKeyword\(\) \{/,
  highlightComponent + '\nfunction TypewriterKeyword() {'
);

// Update TypewriterKeyword styling to bg-purple-600
code = code.replace(
  /className="inline-block bg-purple-700 text-white px-4 py-1 sm:py-1\.5 mt-2 rounded-xl shadow-lg shadow-purple-700\/30 font-semibold relative"/,
  'className="inline-block bg-purple-600 text-white px-4 py-1 sm:py-1.5 mt-2 rounded-xl shadow-lg shadow-purple-600/30 font-semibold relative"'
);

// Replace hardcoded spans with HighlightWord
code = code.replace(
  /<span className="bg-purple-700 text-white px-2 py-0\.5 rounded-md font-semibold inline-block transform hover:scale-105 transition-transform cursor-default">rekayasa perangkat lunak<\/span>/g,
  '<HighlightWord>rekayasa perangkat lunak</HighlightWord>'
);

code = code.replace(
  /<span className="bg-purple-700 text-white px-2 py-0\.5 rounded-md font-semibold inline-block transform hover:scale-105 transition-transform cursor-default">Agentic AI<\/span>/g,
  '<HighlightWord>Agentic AI</HighlightWord>'
);

fs.writeFileSync('src/app/page.tsx', code);
