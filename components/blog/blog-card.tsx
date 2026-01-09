"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  image: string;
  slug: string;
  category: string;
  className?: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  title,
  excerpt,
  date,
  image,
  slug,
  category,
  className,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
      className={cn("group h-full", className)}
    >
      <Link href={slug} className="block h-full">
        <div className="relative h-full flex flex-col bg-card border border-border/50 hover:border-primary/50 transition-all duration-500 overflow-hidden">
          {/* Image Container with Overlay */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 33vw"
            />
            {/* Gradient Overlay */}
            <div 
              className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              suppressHydrationWarning
            />
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="inline-block px-3 py-1 bg-background/90 backdrop-blur-sm border border-primary/30 text-primary font-mono text-[9px] uppercase tracking-[0.2em] font-bold">
                {category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col p-6 bg-card">
            {/* Date */}
            <div className="flex items-center gap-2 mb-4 text-xs font-mono text-muted-foreground uppercase tracking-wider">
              <Calendar className="w-3 h-3 text-primary" strokeWidth={1.5} />
              <span>{date}</span>
            </div>

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300 leading-tight">
              {title}
            </h3>

            {/* Excerpt */}
            <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-4 flex-1">
              {excerpt}
            </p>

            {/* Read More Link */}
            <div className="flex items-center gap-2 text-primary font-mono text-[10px] uppercase tracking-[0.2em] font-bold mt-auto pt-4 border-t border-primary/20 group-hover:gap-4 transition-all duration-300">
              <span>Read Article</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={1.5} />
            </div>
          </div>

          {/* Hover Border Effect */}
          <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/20 transition-all duration-500 pointer-events-none" />
        </div>
      </Link>
    </motion.div>
  );
};
