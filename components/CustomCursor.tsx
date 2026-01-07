"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type CursorState = "default" | "hover" | "text";

export const CustomCursor: React.FC = () => {
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Detect hover states
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if hovering over interactive elements
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest('[role="button"]')
      ) {
        setCursorState("hover");
      } else if (
        target.tagName === "P" ||
        target.tagName === "SPAN" ||
        target.tagName === "H1" ||
        target.tagName === "H2" ||
        target.tagName === "H3" ||
        target.tagName === "H4" ||
        target.tagName === "H5" ||
        target.tagName === "H6" ||
        target.closest("p") ||
        target.closest("h1, h2, h3, h4, h5, h6")
      ) {
        setCursorState("text");
      } else {
        setCursorState("default");
      }
    };

    window.addEventListener("mousemove", updateCursor);
    window.addEventListener("mousemove", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updateCursor);
      window.removeEventListener("mousemove", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <motion.div
      className={cn(
        "fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference",
        "will-change-transform"
      )}
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      {/* Default State - Small Copper Circle */}
      {cursorState === "default" && (
        <motion.div
          className="w-3 h-3 rounded-full bg-accent"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Hover State - Large Transparent Circle with Border */}
      {cursorState === "hover" && (
        <motion.div
          className="w-12 h-12 rounded-full border-2 border-accent bg-transparent"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Text State - I-beam */}
      {cursorState === "text" && (
        <motion.div
          className="w-0.5 h-6 bg-accent"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.div>
  );
};

