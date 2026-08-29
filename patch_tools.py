with open("src/actions/getMarketTrends.ts", "r") as f:
    content = f.read()

import re

old_call = """      contents: "Analyze the current real-time market trends for B2B SaaS architecture, specifically regarding Next.js App Router adoption and performance benefits. Give a concise, punchy 3-bullet point summary focusing on enterprise dominance.",
      tools: [{ googleSearch: {} }],
      toolConfig: { includeServerSideToolInvocations: true }"""

new_call = """      contents: "Analyze the current real-time market trends for B2B SaaS architecture, specifically regarding Next.js App Router adoption and performance benefits. Give a concise, punchy 3-bullet point summary focusing on enterprise dominance.",
      config: {
        tools: [{ googleSearch: {} }],
      }"""

content = content.replace(old_call, new_call)

with open("src/actions/getMarketTrends.ts", "w") as f:
    f.write(content)
