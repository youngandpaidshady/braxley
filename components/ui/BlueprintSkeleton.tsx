"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BlueprintSkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  variant?: "default" | "compact";
}

export const BlueprintSkeleton: React.FC<BlueprintSkeletonProps> = ({
  className,
  width = "100%",
  height = "100%",
  variant = "default",
}) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg",
        variant === "compact" ? "rounded-md" : "rounded-lg",
        className
      )}
      style={{ width, height }}
    >
      {/* Base Background - Architectural Paper Color */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800" />

      {/* Grid Pattern Overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20 dark:opacity-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="blueprint-grid"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-primary"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
      </svg>

      {/* Shimmer Effect - Diagonal Animation */}
      <motion.div
        className="absolute inset-0 opacity-30 dark:opacity-20"
        style={{
          background: `linear-gradient(
            135deg,
            transparent 0%,
            transparent 40%,
            hsl(var(--accent) / 0.3) 50%,
            transparent 60%,
            transparent 100%
          )`,
          backgroundSize: "200% 200%",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "200% 200%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Subtle Border */}
      <div className="absolute inset-0 border border-border/30 rounded-lg" />
    </div>
  );
};

