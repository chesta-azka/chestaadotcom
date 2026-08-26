const fs = require('fs');
let code = fs.readFileSync('src/components/organisms/Header.tsx', 'utf-8');

// Replace desktop dropdown
const oldDesktopDropdownStart = '<div className="grid grid-cols-2 gap-x-6 gap-y-4">';
const oldDesktopDropdownEnd = '</div>\n                      </div>\n                    </div>\n                  )}';

const desktopStartIdx = code.indexOf(oldDesktopDropdownStart);
const desktopEndIdx = code.indexOf(oldDesktopDropdownEnd, desktopStartIdx);

if (desktopStartIdx !== -1 && desktopEndIdx !== -1) {
  const newDesktopDropdown = `<div className="grid grid-cols-2 gap-x-4 gap-y-2">
                          {SERVICE_DEFINITIONS.map(service => (
                            <Link 
                              key={service.slug} 
                              to={\`/layanan/\${service.slug}\`} 
                              className="relative z-10 px-3 py-3 hover:bg-slate-50 rounded-2xl transition-colors text-sm font-medium text-slate-800 flex flex-col group/item"
                            >
                              <span className="flex items-center gap-2 font-semibold">
                                <service.icon size={16} className="text-indigo-600" />
                                {service.title}
                              </span>
                              <span className="text-xs text-slate-500 font-normal mt-1 leading-relaxed line-clamp-1">{service.description}</span>
                            </Link>
                          ))}
                        `;
  code = code.substring(0, desktopStartIdx) + newDesktopDropdown + code.substring(desktopEndIdx);
} else {
  console.log("Could not find desktop dropdown");
}

// Replace mobile dropdown
const oldMobileDropdownStart = '<motion.div\n                              initial={{ height: 0, opacity: 0 }}\n                              animate={{ height: \'auto\', opacity: 1 }}\n                              exit={{ height: 0, opacity: 0 }}\n                              className="overflow-hidden mt-4 pl-4 border-l-2 border-indigo-100 flex flex-col gap-4"\n                            >';
const oldMobileDropdownEnd = '</motion.div>\n                          )}';

const mobileStartIdx = code.indexOf(oldMobileDropdownStart);
const mobileEndIdx = code.indexOf(oldMobileDropdownEnd, mobileStartIdx);

if (mobileStartIdx !== -1 && mobileEndIdx !== -1) {
  const newMobileDropdown = `<motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden mt-4 pl-4 border-l-2 border-indigo-100 flex flex-col gap-4"
                            >
                              {SERVICE_DEFINITIONS.map(service => (
                                <Link 
                                  key={service.slug} 
                                  to={\`/layanan/\${service.slug}\`} 
                                  onClick={() => setIsOpen(false)} 
                                  className="text-lg font-medium text-slate-600 hover:text-indigo-600 flex items-center gap-3"
                                >
                                  <service.icon size={20} className="text-indigo-500" />
                                  {service.title}
                                </Link>
                              ))}
                            `;
  code = code.substring(0, mobileStartIdx) + newMobileDropdown + code.substring(mobileEndIdx);
} else {
  console.log("Could not find mobile dropdown");
}

// Ensure w-[560px] is changed to w-[600px] to accommodate 2 columns properly if needed
code = code.replace("w-[560px]", "w-[650px]");
// Let's adjust grid-cols-2 if needed, 2 is fine for 10 items.
// Adjust the styling to have some max height or scroll if necessary, but 5 rows of small items is around 350px. That's fine.

fs.writeFileSync('src/components/organisms/Header.tsx', code);
