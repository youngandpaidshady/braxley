"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    // Simulate loading progress
    interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (interval) clearInterval(interval);
          setIsComplete(true);
          // Wait a moment before triggering exit animation
          setTimeout(() => {
            onComplete();
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    // Also check for window load
    const handleLoad = () => {
      if (interval) clearInterval(interval);
      setProgress(100);
      setIsComplete(true);
      setTimeout(() => {
        onComplete();
      }, 500);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      if (interval) clearInterval(interval);
      window.removeEventListener("load", handleLoad);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="fixed inset-0 z-[10000] bg-primary flex flex-col items-center justify-center"
        >
          {/* Logo Animation */}
          <div className="mb-12">
            <LogoAnimation />
          </div>

          {/* Progress Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-8 right-8 md:bottom-12 md:right-12"
          >
            <span
              className={cn(
                "text-4xl md:text-6xl font-mono font-bold text-primary-foreground"
              )}
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              {progress}%
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const LogoAnimation: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox="0 0 64 64"
        className="h-24 w-24 md:h-32 md:w-32 text-primary-foreground"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* House peak contour */}
        <motion.path
          d="M32 8 L56 24 L56 56 L8 56 L8 24 Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />

        {/* Letter 'I' */}
        <motion.path
          d="M20 16 L20 48 M16 16 L24 16 M16 48 L24 48"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
        />

        {/* Letter 'R' */}
        <motion.path
          d="M28 16 L28 48 M28 16 L40 16 Q48 16 48 24 Q48 32 40 32 L28 32 M40 32 L48 48"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.6, ease: "easeInOut" }}
        />
      </svg>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="mt-6 text-xl md:text-2xl font-bold text-primary-foreground"
        style={{ fontFamily: "var(--font-geist-sans)" }}
      >
        Ivan Remodeling
      </motion.p>
    </div>
  );
};

