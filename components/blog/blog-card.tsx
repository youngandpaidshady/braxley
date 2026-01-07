"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
  slug?: string;
  className?: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  title,
  excerpt,
  date,
  image,
  category,
  slug = "#",
  className,
}) => {
  return (
    <Link href={slug} className={cn("block group", className)}>
      <div className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        {/* Image - Top (Aspect 4:3) */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full h-full"
          >
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 33vw"
            />
          </motion.div>
        </div>

        {/* Content - Bottom with Glass Effect */}
        <div className="p-6 bg-card/80 backdrop-blur-sm flex-1 flex flex-col">
          {/* Category & Date */}
          <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            {category} • {date}
          </div>

          {/* Title */}
          <h3 className="text-xl font-serif font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300 flex-1">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-4">
            {excerpt}
          </p>

          {/* Read Article Link */}
          <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
            <span>Read Article</span>
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              →
            </motion.span>
          </div>
        </div>
      </div>
    </Link>
  );
};

