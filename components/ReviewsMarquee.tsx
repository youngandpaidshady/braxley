"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, MessageSquare } from "lucide-react";

interface Review {
  text: string;
  author: string;
  rating: number;
  ceoReply?: string;
}

const reviews: Review[] = [
  {
    text: "From design to completion, Ivan was hands-on every step. The quality of work is outstanding.",
    author: "Michael Chen",
    rating: 5,
  },
  {
    text: "Best contractor we've ever worked with. Professional, punctual, and perfectionist.",
    author: "Emily Rodriguez",
    rating: 5,
    ceoReply: "Emily, it was a pleasure working with you!",
  },
  {
    text: "The team is respectful, clean, and efficient. Highly recommend for any remodeling project.",
    author: "Lisa Martinez",
    rating: 5,
  },
];

export const ReviewsMarquee: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Duplicate reviews for seamless loop (need 3 sets for smooth infinite scroll)
  const duplicatedReviews = [...reviews, ...reviews, ...reviews];

  return (
    <section className="py-12 md:py-16 bg-secondary/30 overflow-hidden">
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Marquee Container */}
        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-8 md:gap-12"
            animate={{
              x: isHovered ? "-33.333%" : "0%",
            }}
            transition={{
              duration: isHovered ? 0.3 : 40, // Slow down significantly on hover
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
            style={{
              willChange: "transform",
            }}
          >
            {/* Render 3 sets for seamless infinite loop */}
            {duplicatedReviews.map((review, index) => (
              <ReviewItem key={`review-${index}`} review={review} />
            ))}
          </motion.div>
        </div>

        {/* Gradient Fade Edges */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-secondary/30 to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-secondary/30 to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
};

interface ReviewItemProps {
  review: Review;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  return (
    <div className="flex-shrink-0 flex flex-col gap-2 px-4 md:px-6 py-3 bg-background/80 backdrop-blur-sm rounded-lg border border-border shadow-sm">
      <div className="flex items-center gap-4 md:gap-6">
        {/* Stars */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {[...Array(review.rating)].map((_, i) => (
            <Star
              key={i}
              className="h-4 w-4 fill-accent text-accent"
              strokeWidth={1.5}
            />
          ))}
        </div>

        {/* Review Text */}
        <p className="text-sm md:text-base text-foreground/90 whitespace-nowrap font-medium">
          &quot;{review.text}&quot; — {review.author}
        </p>
      </div>

      {/* CEO Reply */}
      {review.ceoReply && (
        <div className="flex items-start gap-2 pl-8 border-l-2 border-accent/30">
          <MessageSquare className="h-3 w-3 text-accent flex-shrink-0 mt-1" />
          <div className="flex-1 min-w-0">
            <p className="text-xs md:text-sm text-foreground/70 whitespace-nowrap font-medium">
              <span className="text-accent font-semibold">Ivan:</span> {review.ceoReply}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

