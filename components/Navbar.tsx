"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ModeToggle } from "./ui/mode-toggle";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/#services" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/#about" },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const scrollYRef = React.useRef<number>(0);
  const pathname = usePathname();
  const router = useRouter();

  // Handle scroll detection and hash tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      // Track active hash section
      const sections = NAV_LINKS.map((link) => {
        if (link.href.includes("#")) {
          return link.href.split("#")[1];
        }
        return null;
      }).filter(Boolean) as string[];

      let current = "";
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = section;
          }
        }
      });

      if (current) {
        setActiveHash(current);
      } else if (scrollY < 100) {
        setActiveHash("");
      }
    };

    // Check initial hash on mount
    if (typeof window !== "undefined") {
      const hash = window.location.hash.slice(1);
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            setActiveHash(hash);
          }
        }, 500);
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open (preserve scroll position)
  useEffect(() => {
    if (isOpen) {
      scrollYRef.current = window.scrollY;
      const scrollY = scrollYRef.current;
      
      // Store original styles
      const originalBodyStyle = {
        position: document.body.style.position,
        top: document.body.style.top,
        width: document.body.style.width,
        left: document.body.style.left,
        right: document.body.style.right,
        overflow: document.body.style.overflow,
        touchAction: document.body.style.touchAction,
      };
      
      // Lock scroll
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      
      // Prevent iOS bounce
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.position = "relative";
      
      return () => {
        // Restore all styles
        document.body.style.position = originalBodyStyle.position || "";
        document.body.style.top = originalBodyStyle.top || "";
        document.body.style.width = originalBodyStyle.width || "";
        document.body.style.overflow = originalBodyStyle.overflow || "";
        document.body.style.left = originalBodyStyle.left || "";
        document.body.style.right = originalBodyStyle.right || "";
        document.body.style.touchAction = originalBodyStyle.touchAction || "";
        document.documentElement.style.overflow = "";
        document.documentElement.style.position = "";
        
        // Restore scroll position
        if (scrollY > 0) {
          // Use requestAnimationFrame for smoother restoration
          requestAnimationFrame(() => {
            window.scrollTo({
              top: scrollY,
              behavior: "auto"
            });
          });
        }
      };
    } else {
      // Menu closed - ensure scroll is enabled
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.touchAction = "";
      document.documentElement.style.overflow = "";
      document.documentElement.style.position = "";
    }
  }, [isOpen]);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Smooth scroll to section or navigate to page
  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      // Close mobile menu
      setIsOpen(false);
      
      // Only handle hash links specially, let Next.js handle regular navigation
      if (href.startsWith("/#")) {
        e.preventDefault();
        const targetId = href.slice(2);
        
        // If we're on the home page, just scroll
        if (pathname === "/") {
          setTimeout(() => {
            const element = document.getElementById(targetId);
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
              setActiveHash(targetId);
              window.history.pushState(null, "", `#${targetId}`);
            }
          }, 100);
        } else {
          // Navigate to home page with hash, which will scroll on load
          router.push(href);
          // Also set active hash after navigation
          setTimeout(() => {
            const element = document.getElementById(targetId);
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
              setActiveHash(targetId);
            }
          }, 600);
        }
      }
      // For all other links (/, /projects, /blog), Next.js Link handles navigation
      // We don't prevent default, so navigation works normally
    },
    [pathname, router]
  );

  // Animation variants for mobile menu
  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    opened: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const linkVariants = {
    closed: (i: number) => ({
      opacity: 0,
      x: 50,
      transition: {
        delay: i * 0.05,
        duration: 0.2,
      },
    }),
    opened: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.2 + i * 0.1,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  // Check if we're on a project detail page
  const isProjectDetailPage = pathname?.startsWith("/projects/") && pathname !== "/projects";

  return (
    <>
      {/* NAVBAR CONTAINER */}
      <nav className={cn(
        "absolute top-0 left-0 w-full h-20 z-50 transition-all duration-300",
        isProjectDetailPage
          ? "bg-transparent hover:bg-background/40 backdrop-blur-xl border-b border-transparent hover:border-primary/10"
          : "bg-background/80 backdrop-blur-xl border-b border-primary/10"
      )}>
        <div className="max-w-7xl mx-auto w-full h-full px-4 sm:px-6 flex justify-between items-center relative">
          
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className={cn(
              "z-[110] flex flex-col leading-none",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm",
              "transition-colors hover:opacity-90"
            )}
            aria-label="Home"
          >
            <span className="font-serif text-xl md:text-2xl font-bold tracking-tighter uppercase text-foreground whitespace-nowrap">
              BRAXLEY NEVIM
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-primary font-bold whitespace-nowrap mt-0.5">
              ELITE REMODELING
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((link) => {
              const hash = link.href.includes("#") ? link.href.split("#")[1] : null;
              const isActive = 
                (link.href === "/" && pathname === "/" && !activeHash) ||
                (hash && pathname === "/" && activeHash === hash) ||
                (!hash && link.href === pathname);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={cn(
                    "text-[10px] font-mono uppercase tracking-[0.3em] transition-colors",
                    "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm",
                    isActive
                      ? "text-primary font-bold"
                      : "text-foreground/70 hover:text-primary"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop Controls */}
          <div className="hidden lg:flex items-center gap-6 z-[110]">
            <ModeToggle />
            <Button
              asChild
              className="px-6 py-2 border border-primary text-primary font-mono text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-primary hover:text-background transition-all bg-transparent rounded-none"
            >
              <Link
                href="/#contact"
                onClick={(e) => handleLinkClick(e, "/#contact")}
                className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 whitespace-nowrap"
              >
                Inquire
              </Link>
            </Button>
          </div>

          {/* Mobile Controls - Always Visible Above Menu */}
          <div className="flex lg:hidden items-center gap-3 relative z-[310]">
            {/* Theme Toggle - Always Visible */}
            <div className="relative z-[310] pointer-events-auto">
              <ModeToggle className="z-[310]" />
            </div>
            {/* Hamburger/X Toggle Button - Prevent Collision */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="relative z-[310] min-w-[44px] min-h-[44px] flex items-center justify-center text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm touch-manipulation bg-transparent pointer-events-auto"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {/* Use AnimatePresence to prevent collision - only one icon visible at a time */}
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <X 
                      className="w-6 h-6 text-primary" 
                      strokeWidth={1.5} 
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Menu 
                      className="w-6 h-6 text-primary" 
                      strokeWidth={1.5} 
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU: Full-Screen Overlay with Half-Width Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay - Left 50% - No Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 left-0 w-1/2 h-screen z-[250] bg-black/40 lg:hidden"
            />
            
            {/* Slide-Out Drawer - Right 50% - Darker Background */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "fixed right-0 top-0 w-1/2 sm:w-2/5 h-screen z-[260]",
                "bg-black/95 border-l border-primary/20",
                "flex flex-col justify-center",
                "lg:hidden overflow-y-auto"
              )}
            >
              {/* Navigation Links */}
              <nav className="flex flex-col items-center gap-6 px-6 py-8 w-full relative z-10">
                {NAV_LINKS.map((link, index) => {
                  const hash = link.href.includes("#") ? link.href.split("#")[1] : null;
                  const isActive =
                    (link.href === "/" && pathname === "/" && !activeHash) ||
                    (hash && pathname === "/" && activeHash === hash) ||
                    (!hash && link.href === pathname);

                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link.href)}
                        className={cn(
                          "text-base font-mono uppercase tracking-[0.3em]",
                          "min-h-[44px] flex items-center justify-center px-4 py-2 w-full",
                          "transition-all duration-200",
                          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm",
                          "touch-manipulation",
                          isActive
                            ? "text-primary font-bold"
                            : "text-primary hover:text-primary active:text-primary"
                        )}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Contact Section */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: NAV_LINKS.length * 0.1, duration: 0.3 }}
                  className="pt-6 border-t border-primary/20 mt-2 w-full"
                >
                  <Link
                    href="/#contact"
                    onClick={(e) => handleLinkClick(e, "/#contact")}
                    className="text-base font-mono uppercase tracking-[0.3em] text-primary hover:text-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm group flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 w-full touch-manipulation active:text-primary"
                  >
                    Contact
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                  </Link>
                </motion.div>

                {/* New Projects Section */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (NAV_LINKS.length + 1) * 0.1, duration: 0.3 }}
                  className="pt-6 border-t border-primary/20 mt-2 w-full"
                >
                  <div className="mb-4">
                    <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground text-center">
                      NEW PROJECTS
                    </p>
                  </div>
                  <Link
                    href="/#message-form"
                    onClick={(e) => handleLinkClick(e, "/#message-form")}
                    className="text-base font-mono uppercase tracking-[0.3em] text-primary hover:text-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm group flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 w-full touch-manipulation active:text-primary"
                  >
                    Start Consultation
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
