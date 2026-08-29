with open("src/app/page.tsx", "r") as f:
    content = f.read()

content = content.replace("className=\"flex min-h-screen flex-col items-center justify-center pt-40 pb-20 px-4\"", "className=\"flex min-h-screen flex-col items-center justify-center pb-20 px-4\"")

with open("src/app/page.tsx", "w") as f:
    f.write(content)
