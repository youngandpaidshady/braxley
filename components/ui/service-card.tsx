"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { LucideIcon, Quote } from "lucide-react";
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
        "group relative w-full overflow-hidden rounded-lg bg-card shadow-sm block",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      aria-label={`View ${title} details`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      whileHover={{
        scale: 1.02,
        y: -5,
        transition: { type: "spring", stiffness: 300, damping: 15 },
      }}
    >
      {/* Full Background Image - Matching Testimonials Style */}
      <div className="relative aspect-[4/5] w-full">
        <Image
          src={imageUrl}
          alt={`${title} service`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 85vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Gradient overlay for text readability - Matching Testimonials */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        
        {/* Content within the card - Bottom Overlay - Matching Testimonials */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-left text-white z-10">
        <Quote
          className="mb-4 h-8 w-8 text-white/40"
          aria-hidden="true"
        />
          <h3 className="text-base font-semibold leading-tight mb-2">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-white/90">
            {description}
          </p>
        </div>
      </div>
    </motion.button>
  );
}
