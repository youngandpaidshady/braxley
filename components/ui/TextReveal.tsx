"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  delay?: number;
  stagger?: number;
  splitBy?: "words" | "lines" | "chars";
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className,
  as: Component = "h2",
  delay = 0,
  stagger = 0.05,
  splitBy = "words",
}) => {
  // Split text based on splitBy prop
  const getSplitText = () => {
    if (splitBy === "words") {
      return text.split(" ");
    } else if (splitBy === "lines") {
      return text.split("\n");
    } else {
      return text.split("");
    }
  };

  const splitText = getSplitText();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const baseClassName = splitBy === "lines" ? "block" : "inline-block";

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={baseClassName}
    >
      {splitBy === "words" ? (
        <Component className={className}>
          {splitText.map((word, index) => (
            <span key={index} className="inline-block overflow-hidden">
              <motion.span
                variants={itemVariants}
                className="inline-block"
              >
                {word}
                {index < splitText.length - 1 && "\u00A0"}
              </motion.span>
            </span>
          ))}
        </Component>
      ) : splitBy === "lines" ? (
        <Component className={className}>
          {splitText.map((line, index) => (
            <span key={index} className="block overflow-hidden">
              <motion.span
                variants={itemVariants}
                className="block"
              >
                {line}
              </motion.span>
            </span>
          ))}
        </Component>
      ) : (
        <Component className={className}>
          {splitText.map((char, index) => (
            <span key={index} className="inline-block overflow-hidden">
              <motion.span
                variants={itemVariants}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            </span>
          ))}
        </Component>
      )}
    </motion.div>
  );
};

