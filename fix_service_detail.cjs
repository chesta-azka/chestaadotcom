const fs = require('fs');
let code = fs.readFileSync('src/pages/ServiceDetailPage.tsx', 'utf-8');

// I need to add the aside block right after the Corporate Trust Section closing div.
// Let's find "View Portfolio <ArrowRight size={16} />\n          </Link>\n        </div>\n      </div>"
const target = `View Portfolio <ArrowRight size={16} />
          </Link>
        </div>`;
const replacement = `View Portfolio <ArrowRight size={16} />
          </Link>
        </div>
        </div>
        <aside className="w-full lg:w-[360px] shrink-0 sticky top-32">
          <RelatedServices currentSlug={slug!} />
        </aside>`;
        
if (!code.includes('<aside className="w-full')) {
  code = code.replace(target, replacement);
  fs.writeFileSync('src/pages/ServiceDetailPage.tsx', code);
  console.log('Fixed ServiceDetailPage.');
} else {
  console.log('Already fixed.');
}
