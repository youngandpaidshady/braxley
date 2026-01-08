"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Post {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  slug: string;
  datePublished: string;
  timeline?: string[];
}

interface ModernBlogCardProps {
  post: Post;
  index?: number;
}

export function ModernBlogCard({ post, index = 0 }: ModernBlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative border-b border-primary/20 py-12 md:py-16 lg:py-20 hover:bg-card/30 transition-all duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
            {/* Image - Left Side */}
            <div className="lg:col-span-2 relative aspect-[16/10] overflow-hidden rounded-lg border border-border/50 group-hover:border-primary/50 transition-all duration-500">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover scale-100 group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Category Badge */}
              <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="inline-block px-3 py-1.5 bg-background/95 backdrop-blur-sm border border-primary/30 text-primary font-mono text-[9px] uppercase tracking-[0.2em] font-bold">
                  {post.category}
                </span>
              </div>
            </div>

            {/* Content - Right Side */}
            <div className="lg:col-span-3 space-y-4">
              {/* Meta Information */}
              <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
                  {post.date}
                </span>
                <span className="text-primary/40">•</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
                  {post.readTime}
                </span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-tight group-hover:text-primary transition-colors duration-300">
                {post.title}
              </h2>

              {/* Excerpt */}
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>

              {/* Read More */}
              <div className="flex items-center gap-2 text-primary font-mono text-[10px] uppercase tracking-[0.2em] font-bold pt-2 group-hover:gap-4 transition-all duration-300">
                <span>Read Article</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          {/* Hover Accent Line */}
          <div className="absolute bottom-0 left-0 h-0.5 bg-primary/0 group-hover:bg-primary transition-all duration-500 w-0 group-hover:w-full" />
        </div>
      </Link>
    </motion.article>
  );
}


