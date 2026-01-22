"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SectionDividerProps {
  variant?: "wave" | "gradient" | "architectural";
  className?: string;
  fromColor?: string;
  toColor?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  variant = "architectural",
  className,
  fromColor = "hsl(var(--background))",
  toColor = "hsl(var(--secondary) / 0.3)",
}) => {
  if (variant === "wave") {
    return (
      <div className={cn("relative w-full h-16 md:h-24 overflow-hidden", className)}>
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,60 C300,20 600,100 900,60 C1050,40 1150,50 1200,60 L1200,120 L0,120 Z"
            fill={toColor}
          />
        </svg>
      </div>
    );
  }

  if (variant === "gradient") {
    return (
      <div
        className={cn("w-full h-24 md:h-32", className)}
        style={{
          background: `linear-gradient(to bottom, ${fromColor}, ${toColor})`,
        }}
      />
    );
  }

  // Architectural curve (default) - Very subtle on mobile like in image
  return (
    <div className={cn("relative w-full h-2 sm:h-4 md:h-8 lg:h-16 xl:h-24 overflow-hidden", className)}>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Subtle architectural curve - like a concrete beam or architectural detail */}
        <defs>
          <linearGradient id="architecturalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={fromColor} />
            <stop offset="50%" stopColor={toColor} />
            <stop offset="100%" stopColor={toColor} />
          </linearGradient>
        </defs>
        <path
          d="M0,0 L0,80 Q360,60 720,70 T1440,75 L1440,120 L0,120 Z"
          fill="url(#architecturalGradient)"
        />
        {/* Subtle texture line (optional) */}
        <path
          d="M0,80 Q360,60 720,70 T1440,75"
          stroke="hsl(var(--border) / 0.2)"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    </div>
  );
};

