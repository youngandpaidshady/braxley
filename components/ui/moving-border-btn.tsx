"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MovingBorderBtnProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  asChild?: boolean;
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export const MovingBorderBtn: React.FC<MovingBorderBtnProps> = ({
  children,
  className,
  onClick,
  asChild = false,
  href,
  type = "button",
  disabled = false,
}) => {
  const content = (
    <motion.div
      className={cn(
        "relative rounded-full overflow-hidden",
        "px-8 py-4",
        "text-white font-semibold",
        "cursor-pointer",
        "select-none",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={disabled ? undefined : onClick}
    >
      {/* Spinning Gradient Border - The "Spinner" */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "conic-gradient(from 0deg, transparent, #fbbf24, transparent)",
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Inner Face - Solid Background (inset by 2px to create border gap) */}
      <div className="absolute inset-[2px] rounded-full bg-slate-950" />

      {/* Button Content */}
      <div className="relative z-10 flex items-center justify-center">
        {children}
      </div>
    </motion.div>
  );

  if (asChild && href) {
    return (
      <a href={href} className="inline-block">
        {content}
      </a>
    );
  }

  if (asChild) {
    return <>{content}</>;
  }

  return (
    <button type={type} disabled={disabled} className="inline-block">
      {content}
    </button>
  );
};

