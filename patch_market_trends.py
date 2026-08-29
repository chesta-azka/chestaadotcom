with open("src/components/MarketTrends.tsx", "r") as f:
    content = f.read()

content = content.replace("prose prose-sm dark:prose-invert max-w-none", "markdown-body")

with open("src/components/MarketTrends.tsx", "w") as f:
    f.write(content)
