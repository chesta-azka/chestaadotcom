with open("src/app/layout.tsx", "r") as f:
    content = f.read()

content = content.replace("<Navbar />\n            {children}", "<Navbar />\n            <div className=\"pt-28 md:pt-36\">\n              {children}\n            </div>")

with open("src/app/layout.tsx", "w") as f:
    f.write(content)
