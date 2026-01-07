"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";

interface HeroTextMaskProps {
  text: string;
  maskProgress: MotionValue<number>;
  textOpacity: MotionValue<number>;
}

interface CharacterMaskProps {
  char: string;
  index: number;
  totalChars: number;
  maskProgress: MotionValue<number>;
}

const CharacterMask: React.FC<CharacterMaskProps> = ({
  char,
  index,
  totalChars,
  maskProgress,
}) => {
  const threshold = index / totalChars;
  const charProgress = useTransform(
    maskProgress,
    (progress) => progress > threshold
  );
  const clipPath = useTransform(
    charProgress,
    (isRevealed) =>
      isRevealed ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)"
  );

  return (
    <motion.span className="inline-block" style={{ clipPath }}>
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
};

export const HeroTextMask: React.FC<HeroTextMaskProps> = ({
  text,
  maskProgress,
  textOpacity,
}) => {
  const characters = text.split("");

  return (
    <motion.h1
      className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold leading-none mb-6"
      style={{
        opacity: textOpacity,
      }}
    >
      <span className="block text-foreground">
        {characters.map((char, index) => (
          <CharacterMask
            key={index}
            char={char}
            index={index}
            totalChars={characters.length}
            maskProgress={maskProgress}
          />
        ))}
      </span>
    </motion.h1>
  );
};
