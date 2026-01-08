"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Check on mount
    toggleVisibility();

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ 
            duration: 0.3,
            type: "spring",
            stiffness: 300,
            damping: 25
          }}
          onClick={scrollToTop}
          className={cn(
            "fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[200] pointer-events-auto",
            "w-14 h-14 md:w-14 md:h-14 rounded-full",
            "bg-background/90 backdrop-blur-xl",
            "border border-primary/20 hover:border-primary/50",
            "shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20",
            "flex items-center justify-center",
            "text-primary hover:text-primary",
            "hover:bg-primary/10 active:bg-primary/20",
            "transition-all duration-300",
            "touch-manipulation",
            "min-w-[56px] min-h-[56px]",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          )}
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

