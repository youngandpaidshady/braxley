"use client";

import React from "react";
import { motion } from "framer-motion";
import { BlogCard } from "./blog-card";

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
  slug: string;
}

interface BlogGridProps {
  posts: BlogPost[];
}

export const BlogGrid: React.FC<BlogGridProps> = ({ posts }) => {
  return (
    <>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 md:mb-20"
      >
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground mb-6">
          Insights & Inspiration
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Expert advice, design trends, and remodeling insights to help you make informed decisions about your home renovation.
        </p>
      </motion.div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <BlogCard
              title={post.title}
              excerpt={post.excerpt}
              date={post.date}
              image={post.image}
              category={post.category}
              slug={post.slug}
            />
          </motion.div>
        ))}
      </div>
    </>
  );
};

