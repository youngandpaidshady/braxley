"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Get scroll position
  const getScrollTop = useCallback(() => {
    if (typeof window === "undefined") return 0;
    return (
      window.pageYOffset ||
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0
    );
  }, []);

  // Check visibility - lower threshold to make it appear sooner
  const checkVisibility = useCallback(() => {
    const scrollTop = getScrollTop();
    setIsVisible(scrollTop > 200); // Lowered from 300 to 200
  }, [getScrollTop]);

  useEffect(() => {
    setMounted(true);
    
    if (typeof window === "undefined") return;

    // Initial check
    checkVisibility();

    // Throttle scroll events for better performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkVisibility();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Add event listeners
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", checkVisibility, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkVisibility);
    };
  }, [checkVisibility]);

  const scrollToTop = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (typeof window === "undefined") return;

    // Smooth scroll to top
    try {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } catch (err) {
      // Fallback for older browsers
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, []);

  // Don't render until mounted (prevents hydration issues)
  if (!mounted) return null;

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ 
            duration: 0.2,
            ease: "easeOut"
          }}
          onClick={scrollToTop}
          onMouseDown={(e) => e.stopPropagation()}
          className={cn(
            "fixed bottom-6 right-6 md:bottom-8 md:right-8",
            "z-[99999]",
            "w-14 h-14 rounded-full",
            "bg-background/95 backdrop-blur-xl",
            "border-2 border-primary/30 hover:border-primary/60",
            "shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30",
            "flex items-center justify-center",
            "text-primary hover:text-primary",
            "hover:bg-primary/10 active:bg-primary/20",
            "transition-colors duration-200",
            "touch-manipulation",
            "min-w-[56px] min-h-[56px]",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
            "cursor-pointer",
            "group",
            "pointer-events-auto",
            "select-none"
          )}
          style={{ 
            position: "fixed",
            zIndex: 99999,
            bottom: "1.5rem",
            right: "1.5rem",
          }}
          aria-label="Back to top"
          title="Back to top"
          type="button"
        >
          <ArrowUp 
            className="h-5 w-5 md:h-6 md:w-6 group-hover:-translate-y-0.5 transition-transform" 
            strokeWidth={2.5} 
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

