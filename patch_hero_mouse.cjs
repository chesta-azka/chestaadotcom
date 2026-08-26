const fs = require('fs');

let code = fs.readFileSync('src/pages/ServicesPage.tsx', 'utf8');

// Add useSpring and useMotionValue to framer-motion imports
code = code.replace(
  "import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'motion/react';",
  "import { motion, AnimatePresence, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'motion/react';"
);

// Add Mouse Parallax Logic
const mouseParallaxLogic = `  // Auto-Presentation State
  const [isPlaying, setIsPlaying] = useState(false);

  // Mouse Parallax Logic for Hero
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const heroRotateX = useTransform(smoothMouseY, [-0.5, 0.5], [10, -10]);
  const heroRotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-10, 10]);
  const heroTranslateX = useTransform(smoothMouseX, [-0.5, 0.5], [-30, 30]);
  const heroTranslateY = useTransform(smoothMouseY, [-0.5, 0.5], [-30, 30]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Normalize values between -0.5 and 0.5
    const xPct = (clientX / innerWidth) - 0.5;
    const yPct = (clientY / innerHeight) - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };
`;

code = code.replace("  // Auto-Presentation State\n  const [isPlaying, setIsPlaying] = useState(false);", mouseParallaxLogic);

// Modify the Hero section to use handleMouseMove and the styles
code = code.replace(
  '<motion.section id="hero" initial={{ scale: 0.94, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 100, damping: 14, mass: 1 }} viewport={{ amount: 0.1, margin: "-100px" }} className="snap-start relative min-h-screen flex flex-col justify-center items-center text-center px-6 md:px-12 overflow-hidden bg-slate-950 text-white">',
  '<motion.section id="hero" onMouseMove={handleMouseMove} initial={{ scale: 0.94, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 100, damping: 14, mass: 1 }} viewport={{ amount: 0.1, margin: "-100px" }} className="snap-start relative min-h-screen flex flex-col justify-center items-center text-center px-6 md:px-12 overflow-hidden bg-slate-950 text-white">'
);

// Apply parallax styles to Hero content
code = code.replace(
  '<motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-4xl mx-auto perspective-1000">',
  '<motion.div style={{ opacity: heroOpacity, rotateX: heroRotateX, rotateY: heroRotateY, x: heroTranslateX, y: heroTranslateY }} className="relative z-10 max-w-4xl mx-auto" style={{ transformStyle: "preserve-3d" }}>'
);

fs.writeFileSync('src/pages/ServicesPage.tsx', code);
