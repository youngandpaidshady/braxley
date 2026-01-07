"use client";

import React, { useEffect } from "react";
import { motion, useAnimate, stagger } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextGenerateEffectProps {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}

export const TextGenerateEffect: React.FC<TextGenerateEffectProps> = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}) => {
  const [scope, animate] = useAnimate();

  // Split words into array
  const wordsArray = words.split(" ");

  useEffect(() => {
    if (!scope.current) return;

    // Animate each word with stagger
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "blur(0px)",
      },
      {
        duration: duration,
        delay: stagger(0.2),
      }
    );
  }, [scope, animate, filter, duration]);

  return (
    <motion.div
      ref={scope}
      className={cn("font-bold leading-tight", className)}
    >
      <div className="text-foreground">
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={`word-${idx}`}
              className="inline-block"
              initial={{
                opacity: 0,
                filter: filter ? "blur(10px)" : "blur(0px)",
              }}
            >
              {word}
              {idx !== wordsArray.length - 1 && " "}
            </motion.span>
          );
        })}
      </div>
    </motion.div>
  );
};

