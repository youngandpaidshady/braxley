"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight, Eye, Share2, Bookmark, BookmarkCheck, TrendingUp } from "lucide-react";
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
  tags?: string[];
  views?: number;
  featured?: boolean;
}

interface ModernBlogCardProps {
  post: Post;
  index?: number;
}

export function ModernBlogCard({ post, index = 0 }: ModernBlogCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: `${window.location.origin}/blog/${post.slug}`,
      });
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(`${window.location.origin}/blog/${post.slug}`);
    }
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative border-b border-primary/20 py-12 md:py-16 lg:py-20 hover:bg-card/30 transition-all duration-500 overflow-hidden">
          {/* Featured Badge */}
          {post.featured && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute top-6 right-6 z-10"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 border border-primary/30 text-primary font-mono text-[8px] uppercase tracking-[0.2em] font-bold backdrop-blur-sm">
                <TrendingUp className="w-3 h-3" strokeWidth={1.5} />
                Featured
              </span>
            </motion.div>
          )}

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
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -10 }}
                transition={{ duration: 0.3 }}
                className="absolute top-4 left-4 z-10"
              >
                <span className="inline-block px-3 py-1.5 bg-background/95 backdrop-blur-sm border border-primary/30 text-primary font-mono text-[9px] uppercase tracking-[0.2em] font-bold shadow-lg">
                  {post.category}
                </span>
              </motion.div>

              {/* Quick Actions Overlay */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-4 right-4 flex items-center gap-2 z-10"
                  >
                    <button
                      onClick={handleShare}
                      className="p-2 bg-background/95 backdrop-blur-sm border border-primary/30 text-primary rounded-full hover:bg-primary hover:text-background transition-all duration-300 shadow-lg"
                      aria-label="Share article"
                    >
                      <Share2 className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                    <button
                      onClick={handleBookmark}
                      className="p-2 bg-background/95 backdrop-blur-sm border border-primary/30 text-primary rounded-full hover:bg-primary hover:text-background transition-all duration-300 shadow-lg"
                      aria-label={isBookmarked ? "Remove bookmark" : "Bookmark article"}
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="w-4 h-4" strokeWidth={1.5} />
                      ) : (
                        <Bookmark className="w-4 h-4" strokeWidth={1.5} />
                      )}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Content - Right Side */}
            <div className="lg:col-span-3 space-y-4">
              {/* Meta Information */}
              <div className="flex items-center flex-wrap gap-4 text-xs font-mono text-muted-foreground uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
                  {post.date}
                </span>
                <span className="text-primary/40">•</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
                  {post.readTime}
                </span>
                {post.views && (
                  <>
                    <span className="text-primary/40">•</span>
                    <span className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
                      {post.views.toLocaleString()} views
                    </span>
                  </>
                )}
              </div>

              {/* Title */}
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-tight group-hover:text-primary transition-colors duration-300">
                {post.title}
              </h2>

              {/* Excerpt */}
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  {post.tags.slice(0, 3).map((tag, tagIndex) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + tagIndex * 0.05 }}
                      className="px-2.5 py-1 bg-primary/10 border border-primary/20 text-primary font-mono text-[8px] uppercase tracking-[0.15em] font-bold hover:bg-primary/20 transition-colors"
                    >
                      {tag}
                    </motion.span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="text-xs text-muted-foreground font-mono">
                      +{post.tags.length - 3} more
                    </span>
                  )}
                </div>
              )}

              {/* Read More */}
              <motion.div
                className="flex items-center gap-2 text-primary font-mono text-[10px] uppercase tracking-[0.2em] font-bold pt-2"
                whileHover={{ gap: 8 }}
                transition={{ duration: 0.3 }}
              >
                <span>Read Article</span>
                <motion.div
                  animate={{ x: isHovered ? 4 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Hover Accent Line */}
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-primary"
            initial={{ width: 0 }}
            animate={{ width: isHovered ? "100%" : 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />

          {/* Reading Progress Indicator (on hover) */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-0 left-0 h-1 bg-primary/20 w-full"
              >
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Link>
    </motion.article>
  );
}


