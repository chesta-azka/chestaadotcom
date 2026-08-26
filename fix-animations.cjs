const fs = require('fs');
let code = fs.readFileSync('src/components/organisms/Header.tsx', 'utf-8');

// Desktop
const oldDesktop = `<span className="flex items-center gap-2 font-semibold">
                                <service.icon size={16} className="text-indigo-600" />
                                {service.title}
                              </span>
                              <span className="text-xs text-slate-500 font-normal mt-1 leading-relaxed line-clamp-1">{service.description}</span>`;
const newDesktop = `<span className="flex items-center gap-2 font-semibold transition-transform duration-300 group-hover/item:translate-x-1">
                                <service.icon size={16} className="text-indigo-600 transition-transform duration-300 group-hover/item:scale-110" />
                                {service.title}
                              </span>
                              <span className="text-xs text-slate-500 font-normal mt-1 leading-relaxed line-clamp-1 transition-transform duration-300 group-hover/item:translate-x-1">{service.description}</span>`;

code = code.replace(oldDesktop, newDesktop);

// Mobile
const oldMobile = `className="text-lg font-medium text-slate-600 hover:text-indigo-600 flex items-center gap-3"
                                >
                                  <service.icon size={20} className="text-indigo-500" />
                                  {service.title}`;
const newMobile = `className="group/mobile text-lg font-medium text-slate-600 hover:text-indigo-600 flex items-center gap-3 transition-all duration-300 hover:translate-x-2"
                                >
                                  <service.icon size={20} className="text-indigo-500 transition-transform duration-300 group-hover/mobile:scale-110" />
                                  {service.title}`;

code = code.replace(oldMobile, newMobile);

fs.writeFileSync('src/components/organisms/Header.tsx', code);
