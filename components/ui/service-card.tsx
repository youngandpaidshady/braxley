"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { LucideIcon, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  imageUrl: string;
  className?: string;
  onClick?: () => void;
}

export function ServiceCard({
  title,
  description,
  icon: Icon,
  imageUrl,
  className,
  onClick,
}: ServiceCardProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!onClick) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <motion.button
      type="button"
      className={cn(
        "group relative w-full overflow-hidden rounded-xl bg-white border border-border/40 block dark:shadow-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        "hover:border-primary/50 dark:hover:shadow-xl transition-all duration-300",
        className
      )}
      aria-label={`View ${title} details`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      whileHover={{
        y: -4,
        transition: { type: "spring", stiffness: 300, damping: 15 },
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Image Section */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={`${title} service`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Overlay on hover/tap */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />

        {/* Icon Badge */}
        <div className="absolute top-3 left-3 w-10 h-10 bg-background/90 backdrop-blur-sm rounded-lg flex items-center justify-center border border-border shadow-sm">
          <Icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
        </div>

        {/* Tap to view indicator - Mobile */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity">
          <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg">
            <span>View Details</span>
            <ArrowUpRight className="w-3 h-3" />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 text-left">
        <h3 className="text-base font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Tap hint for mobile */}
        <div className="mt-3 flex items-center gap-1 text-primary font-mono text-[10px] uppercase tracking-wider opacity-60 group-hover:opacity-100 transition-opacity">
          <span>Tap for details</span>
          <ArrowUpRight className="w-3 h-3" />
        </div>
      </div>
    </motion.button>
  );
}
