with open("src/components/Navbar.tsx", "r") as f:
    content = f.read()

content = content.replace("import { motion } from 'framer-motion';", "import { motion } from 'framer-motion';\nimport Link from 'next/link';")

old_nav = """<nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">Services</a>
          <a href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">Architecture</a>
          <a href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">Enterprise</a>
        </nav>"""

new_nav = """<nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">Architecture</Link>
          <Link href="/case-studies" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">Case Studies</Link>
          <Link href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">Enterprise</Link>
        </nav>"""

content = content.replace(old_nav, new_nav)

old_logo = """<span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">chestaa.com</span>"""
new_logo = """<Link href="/"><span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">chestaa.com</span></Link>"""
content = content.replace(old_logo, new_logo)

with open("src/components/Navbar.tsx", "w") as f:
    f.write(content)
