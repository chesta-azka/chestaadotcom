with open("src/app/page.tsx", "r") as f:
    content = f.read()

# Add imports
content = content.replace("import { MarketTrends } from '../components/MarketTrends';", "import { MarketTrends } from '../components/MarketTrends';\nimport { HeroParticles } from '../components/HeroParticles';\nimport { FeaturedCaseStudies } from '../components/FeaturedCaseStudies';")

# Add HeroParticles right inside main
content = content.replace("<main className=\"flex min-h-screen flex-col items-center justify-center pb-20 px-4\">", "<main className=\"relative flex min-h-screen flex-col items-center justify-center pb-20 px-4 overflow-hidden\">\n      <HeroParticles />")

# Add FeaturedCaseStudies below QuotationCalculator and above ArchitecturalEfficiency
content = content.replace("<ArchitecturalEfficiency />", "<FeaturedCaseStudies />\n        <ArchitecturalEfficiency />")

with open("src/app/page.tsx", "w") as f:
    f.write(content)
