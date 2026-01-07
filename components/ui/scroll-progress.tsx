"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export const ScrollProgress: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Always render the same structure to prevent hydration mismatch
  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] bg-primary/20 z-50">
      <motion.div
        className="h-full bg-primary origin-left"
        style={{ scaleX: isMounted ? scaleX : 0 }}
      />
    </div>
  );
};

