"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Logo: React.FC<LogoProps> = ({ className, size = "md" }) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        viewBox="0 0 64 64"
        className={cn(sizeClasses[size], "text-accent")}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Stylized 'I' and 'R' interlocking with house peak contour */}
        {/* House peak contour (subtle roof shape) */}
        <path
          d="M32 8 L56 24 L56 56 L8 56 L8 24 Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity="0.2"
        />
        
        {/* Letter 'I' - Vertical bar with top and bottom serifs */}
        <path
          d="M20 16 L20 48 M16 16 L24 16 M16 48 L24 48"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        
        {/* Letter 'R' - Interlocking with 'I' */}
        <path
          d="M28 16 L28 48 M28 16 L40 16 Q48 16 48 24 Q48 32 40 32 L28 32 M40 32 L48 48"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <span className="font-bold text-xl tracking-tight hidden sm:inline-block">
        Ivan Remodeling
      </span>
    </div>
  );
};

