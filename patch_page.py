with open("src/app/page.tsx", "r") as f:
    content = f.read()

import re

# Add imports
content = content.replace("import { QuotationCalculator } from '../components/QuotationCalculator';", "import { QuotationCalculator } from '../components/QuotationCalculator';\nimport { ArchitecturalEfficiency } from '../components/ArchitecturalEfficiency';\nimport { MarketTrends } from '../components/MarketTrends';")

# Replace main padding
content = content.replace("py-20 px-4", "pt-40 pb-20 px-4")

# Add components at the bottom
content = content.replace("      <QuotationCalculator />\n    </main>", "      <QuotationCalculator />\n      <div className=\"mt-12 w-full flex flex-col gap-12\">\n        <ArchitecturalEfficiency />\n        <MarketTrends />\n      </div>\n    </main>")

with open("src/app/page.tsx", "w") as f:
    f.write(content)
