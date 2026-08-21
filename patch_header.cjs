const fs = require('fs');
let content = fs.readFileSync('src/components/organisms/Header.tsx', 'utf-8');

// 1. Add state
content = content.replace(
  "const [scrolled, setScrolled] = useState(false);",
  "const [scrolled, setScrolled] = useState(false);\n  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);"
);

// 2. Add ChevronDown icon
content = content.replace(
  "import { Menu, X, Search } from 'lucide-react';",
  "import { Menu, X, Search, ChevronDown } from 'lucide-react';"
);

// 3. Replace mobile Layanan link
const targetStr = `
                    ) : (
                      <Link
                        to={link.path}
                        className={\`block font-display text-2xl font-semibold tracking-tight hover:text-[#4f46e5] transition-colors flex items-center justify-between \${
                          location.pathname === link.path ? 'text-[#4f46e5]' : 'text-slate-800'
                        }\`}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.name}
                        {link.name === 'Layanan' && <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>}
                      </Link>
                    )}
`;

const replaceStr = `
                    ) : link.name === 'Layanan' ? (
                      <div className="flex flex-col">
                        <button
                          className={\`block font-display text-2xl font-semibold tracking-tight hover:text-[#4f46e5] transition-colors flex items-center justify-between w-full text-left \${
                            location.pathname === link.path || location.pathname.startsWith('/services') ? 'text-[#4f46e5]' : 'text-slate-800'
                          }\`}
                          onClick={(e) => {
                            e.preventDefault();
                            setMobileServicesOpen(!mobileServicesOpen);
                          }}
                        >
                          {link.name}
                          <ChevronDown className={\`w-6 h-6 text-slate-400 transition-transform duration-300 \${mobileServicesOpen ? 'rotate-180' : ''}\`} />
                        </button>
                        <AnimatePresence>
                          {mobileServicesOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden mt-4 pl-4 border-l-2 border-indigo-100 flex flex-col gap-4"
                            >
                              <Link to="/services#web" onClick={() => setIsOpen(false)} className="text-lg font-medium text-slate-600 hover:text-indigo-600">Web Development</Link>
                              <Link to="/services#ai" onClick={() => setIsOpen(false)} className="text-lg font-medium text-slate-600 hover:text-indigo-600 flex items-center gap-2">AI Solutions <span className="bg-indigo-600/10 text-indigo-600 border border-indigo-600/20 text-[9px] px-2 py-0.5 rounded-full uppercase tracking-widest font-bold">New</span></Link>
                              <Link to="/services#transformation" onClick={() => setIsOpen(false)} className="text-lg font-medium text-slate-600 hover:text-indigo-600">Digital Transformation</Link>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        to={link.path}
                        className={\`block font-display text-2xl font-semibold tracking-tight hover:text-[#4f46e5] transition-colors flex items-center justify-between \${
                          location.pathname === link.path ? 'text-[#4f46e5]' : 'text-slate-800'
                        }\`}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.name}
                      </Link>
                    )}
`;

content = content.replace(targetStr.trim(), replaceStr.trim());
fs.writeFileSync('src/components/organisms/Header.tsx', content);
console.log("Patched Header.tsx");
