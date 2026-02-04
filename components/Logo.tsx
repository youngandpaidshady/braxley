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
        className={cn(sizeClasses[size], "text-primary")}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
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
        
        {/* Letter 'B' - Left side */}
        <path
          d="M12 16 L12 48 M12 16 L24 16 Q32 16 32 24 Q32 32 24 32 L12 32 M24 32 Q32 32 32 40 Q32 48 24 48 L12 48"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        
        {/* Letter 'N' - Right side */}
        <path
          d="M36 16 L36 48 M36 16 L52 48 M52 16 L52 48"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <span className="font-bold text-xl tracking-tight hidden sm:inline-block">
        Braxley Nevim
      </span>
    </div>
  );
};

