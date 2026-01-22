"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, CheckCircle2, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  verified: boolean;
  project?: string;
  ceoReply?: string;
}

const reviews: Review[] = [
  {
    id: "1",
    name: "Dr. Elena Marquez",
    location: "St. Augustine Medical Center",
    rating: 5,
    text: "Expertly managed our outpatient wing renovation in a fully operational hospital. Zero compromises to patient safety with strict adherence to Joint Commission standards.",
    verified: true,
    project: "Hospital Administrator",
    ceoReply: "Thank you Dr. Marquez. Patient safety is our priority. It was our privilege to serve St. Augustine.",
  },
  {
    id: "2",
    name: "James Harrington",
    location: "Azure Bay Luxury Resort",
    rating: 5,
    text: "Reimagined our oceanfront villas with exquisite attention to aesthetic harmony. Custom stonework and ambient lighting that enhances every guest moment.",
    verified: true,
    project: "Resort Owner",
    ceoReply: "Mr. Harrington, crafting serene spaces for guest tranquility is our expertise. We're honored to partner with Azure Bay.",
  },
  {
    id: "3",
    name: "Michael Torres",
    location: "Riverside Stadium",
    rating: 5,
    text: "Multi-million dollar premium suite upgrade in a 65,000-seat venue during live events. Flawless timing without interrupting a single game.",
    verified: true,
    project: "Stadium Operations Director",
    ceoReply: "Michael, precision under live-event pressure is our standard. Grateful for the partnership.",
  },
  {
    id: "4",
    name: "Sophia Laurent",
    location: "The Ellington Grand Hotel",
    rating: 5,
    text: "White-glove service throughout our lobby and guest-room refresh. Absolutely no guest disturbance while achieving timeless five-star elegance.",
    verified: true,
    project: "Luxury Hotel Manager",
    ceoReply: "Sophia, aligning our precision with The Ellington's hospitality standards is always a privilege.",
  },
  {
    id: "5",
    name: "Victoria Langford",
    location: "Langford & Associates",
    rating: 5,
    text: "Office tower repositioning delivered 8% under budget and weeks early—directly accelerating leasing and maximizing ROI.",
    verified: true,
    project: "Commercial Developer",
    ceoReply: "Victoria, building partnerships while driving measurable value is our foundation. Thank you.",
  },
  {
    id: "6",
    name: "Robert Kline",
    location: "Mercy Regional Hospital",
    rating: 5,
    text: "Rigorous safety protocols and compliance expertise made our surgical wing renovation serene and successful in a high-acuity setting.",
    verified: true,
    project: "Hospital Administrator",
    ceoReply: "Robert, safeguarding clinical excellence during change is our sacred duty. We're honored by your trust.",
  },
];

/* ========================================
   GOOGLE STAR RATING
   ======================================== */
const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={cn(
          "h-4 w-4",
          i < rating ? "fill-yellow-400 text-yellow-400" : "fill-slate-600 text-slate-600"
        )}
        strokeWidth={0}
      />
    ))}
    <span className="ml-2 text-sm text-muted-foreground">{rating}.0</span>
  </div>
);

/* ========================================
   REVIEW CARD - Google Style with CEO Reply
   ======================================== */
interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="flex-shrink-0 w-[320px] md:w-[380px] bg-card rounded-2xl p-6 border border-border/30">
      {/* Header: Name, Verified Badge, Rating */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-display font-bold text-foreground uppercase tracking-wide text-sm">
              {review.name}
            </h4>
            {review.verified && (
              <CheckCircle2 className="h-4 w-4 text-blue-400" />
            )}
          </div>
          <p className="text-xs text-gold font-semibold">{review.project}</p>
          <p className="text-xs text-slate-500">{review.location}</p>
        </div>
        {/* Google Logo - Multicolor */}
        <div className="flex items-center gap-1 px-2 py-1 bg-white/5 rounded-lg">
          <span className="text-sm font-bold">
            <span className="text-blue-500">G</span>
            <span className="text-red-500">o</span>
            <span className="text-yellow-500">o</span>
            <span className="text-blue-500">g</span>
            <span className="text-green-500">l</span>
            <span className="text-red-500">e</span>
          </span>
        </div>
      </div>

      {/* Star Rating */}
      <div className="mb-4">
        <StarRating rating={review.rating} />
      </div>

      {/* Review Text */}
      <p className="text-sm text-muted-foreground body-text leading-relaxed mb-4">
        &ldquo;{review.text}&rdquo;
      </p>

      {/* CEO Reply */}
      {review.ceoReply && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="h-4 w-4 text-gold" />
            <span className="text-xs font-bold text-gold uppercase tracking-wider">
              Braxley Nevim, CEO
            </span>
          </div>
          <p className="text-xs text-muted-foreground body-text leading-relaxed italic">
            &ldquo;{review.ceoReply}&rdquo;
          </p>
        </div>
      )}
    </div>
  );
};

/* ========================================
   REVIEWS CAROUSEL - Smooth Native Scroll
   ======================================== */
const ReviewsCarousel: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-12"
        >
          <span className="inline-block px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-gold border border-gold/30 bg-gold/5 backdrop-blur-sm rounded-full mb-4">
            Testimonials
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase text-foreground mb-4">
            What Our Clients Say
          </h2>
          <div className="flex items-center gap-4">
            <StarRating rating={5} />
            <span className="text-sm text-muted-foreground">Based on 50+ Google Reviews</span>
          </div>
        </motion.div>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Scrollable Track */}
        <div
          className="flex gap-5 px-4 sm:px-6 lg:px-8 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {reviews.map((review) => (
            <div key={review.id} className="flex-shrink-0">
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>

      {/* Hide scrollbar CSS */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default ReviewsCarousel;
