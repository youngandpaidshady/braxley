"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

/**
 * Blueprint Skeleton Loader
 * Shows a 1px primary-colored grid pattern (architectural blueprint style)
 * instead of a grey box when content is loading.
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg",
        className
      )}
      {...props}
    >
      {/* Base Background - Architectural Paper Color */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800" />

      {/* 1px Primary-Colored Grid Pattern Overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-40 dark:opacity-30"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="blueprint-grid-skeleton"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#blueprint-grid-skeleton)" />
      </svg>

      {/* Subtle Border */}
      <div className="absolute inset-0 border border-border/30 rounded-lg" />
    </div>
  );
};
