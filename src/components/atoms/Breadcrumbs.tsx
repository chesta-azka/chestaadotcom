import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home, Compass } from 'lucide-react';
import { motion } from 'motion/react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  // Always prepend "Home" to the beginning of breadcrumbs for optimal navigation and SEO crawlability
  const allItems: BreadcrumbItem[] = [
    { label: 'Home', path: '/' },
    ...items
  ];

  // Motion variants for smooth staggered mounting animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      color: "rgb(156, 163, 175)", // text-gray-400
      transition: {
        type: 'spring' as const,
        stiffness: 260,
        damping: 20
      }
    },
    hover: {
      x: 5,
      y: -2,
      rotateX: 10,
      rotateY: -10,
      color: "#ffffff",
      transition: { type: 'spring' as const, stiffness: 450, damping: 25 }
    }
  };

  const lineVariants = {
    initial: { x: '-101%' },
    hover: { 
      x: '0%', 
      transition: { type: 'spring' as const, stiffness: 450, damping: 25 }
    }
  };

  useEffect(() => {
    const list = document.getElementById('breadcrumbs-list');
    if (list) {
      const existingScript = list.querySelector('script[type="application/ld+json"]');
      if (existingScript) existingScript.remove();
      
      const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": allItems.map((item, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "name": item.label,
          "item": typeof window !== 'undefined'
            ? window.location.origin + (item.path || window.location.pathname)
            : (item.path || '/')
        }))
      };
      
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify(schema);
      list.appendChild(script);
    }
  }, [items]); // Re-run if items change

  return (
    <nav 
      aria-label="Breadcrumb" 
      className="flex sm:inline-flex flex-wrap py-2.5 px-3 md:px-4 rounded-xl bg-white/[0.02] border border-white/5 backdrop-blur-sm shadow-sm mb-6 select-none items-center gap-2.5 md:gap-3 w-full max-w-full sm:w-auto"
      id="breadcrumbs-nav"
    >
      {/* Decorative Compass icon at start of navigation UI with a rotating visual */}
      <div className="flex items-center gap-1.5 border-r border-[#ffffff0a] pr-3 mr-0.5 shrink-0 text-[#D4FF00]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 32, ease: "linear" }}
          className="flex items-center justify-center shrink-0"
        >
          <Compass size={13} className="text-[#D4FF00]" />
        </motion.div>
        <span className="text-[8px] font-mono tracking-widest text-gray-500 uppercase">LOCATION</span>
      </div>

      <motion.ol 
        itemScope 
        itemType="https://schema.org/BreadcrumbList" 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap items-center gap-1.5 md:gap-2 text-[10px] md:text-xs font-mono font-bold tracking-wider uppercase text-gray-500"
        style={{ perspective: 1000 }}
        id="breadcrumbs-list"
      >
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          const absoluteUrl = typeof window !== 'undefined'
            ? window.location.origin + (item.path || window.location.pathname)
            : (item.path || '/');

          return (
            <motion.li 
              key={index} 
              itemProp="itemListElement" 
              itemScope={true}
              itemType="https://schema.org/ListItem"
              variants={itemVariants}
              whileHover={!isLast ? "hover" : undefined}
              className="flex items-center gap-1.5 md:gap-2"
              id={`breadcrumb-item-${index}`}
            >
              {/* Stylized custom neon dot anchor visually positioned BEFORE the 'Home' link at start of the list */}
              {index === 0 && (
                <div className="flex items-center justify-center mr-0.5 shrink-0" id="breadcrumbs-anchor-dot">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4FF00]/55 opacity-80"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#D4FF00]"></span>
                  </span>
                </div>
              )}

              {isLast ? (
                // Last item is the current page (non-clickable)
                <div className="text-[#D4FF00] font-sans font-medium relative flex items-center">
                  <span itemProp="name">{item.label}</span>
                </div>
              ) : (
                // Walkable parent path
                <div className="flex items-center group cursor-pointer relative">
                  <Link 
                    to={item.path || '/'} 
                    className="transition-all flex items-center gap-1.5 pb-0.5"
                  >
                    {index === 0 && <Home size={11} className="mt-[-2px] transition-transform group-hover:scale-110" />}
                    <span itemProp="name" className="relative pb-0.5 block overflow-hidden">
                      {item.label}
                      {/* Premium smooth slide-in layout line */}
                      <motion.span 
                        variants={lineVariants}
                        initial="initial"
                        className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D4FF00]" 
                      />
                    </span>
                  </Link>
                </div>
              )}

              {/* Explicit SEO metadata for Google Rich Snippets */}
              <meta itemProp="item" content={absoluteUrl} />
              <meta itemProp="position" content={String(index + 1)} />

              {/* Trailing chevron separator */}
              {!isLast && (
                <ChevronRight 
                  size={12} 
                  className="text-white/10 shrink-0 mx-0.5" 
                  aria-hidden="true" 
                />
              )}
            </motion.li>
          );
        })}
      </motion.ol>
    </nav>
  );
}
