"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, CheckCircle2, Star, MessageSquare } from "lucide-react";
import { Button } from "./ui/button";
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
    id: "2",
    name: "Michael Chen",
    location: "Riverside",
    rating: 5,
    text: "Professional, punctual, and perfectionist. Ivan and his team exceeded our expectations. The bathroom renovation was completed on time and within budget.",
    verified: true,
    project: "Bathroom Renovation",
    ceoReply: "Michael, your trust in our process made all the difference. We're thrilled the bathroom renovation met your expectations. Thank you for choosing Ivan Remodeling!",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    location: "Hillside",
    rating: 5,
    text: "From design to completion, Ivan was hands-on every step of the way. The quality of work is outstanding, and he truly cares about delivering excellence.",
    verified: true,
    project: "Whole Home Remodel",
    ceoReply: "Emily, transforming your entire home was an honor. Your attention to detail matched ours, and the results speak for themselves. Thank you for the kind words!",
  },
  {
    id: "4",
    name: "David Thompson",
    location: "Westside",
    rating: 5,
    text: "Best contractor we've ever worked with. Ivan's craftsmanship is top-tier, and his team is respectful, clean, and efficient. Highly recommend!",
    verified: true,
    project: "Basement Finishing",
  },
  {
    id: "5",
    name: "Lisa Martinez",
    location: "North End",
    rating: 5,
    text: "Ivan remodeled our entire first floor, and the results are stunning. He listened to our vision and brought it to life with incredible attention to detail.",
    verified: true,
    project: "First Floor Remodel",
    ceoReply: "Lisa, your first floor transformation was one of my favorite projects this year. The open concept design really opened up the space beautifully. Enjoy your new home!",
  },
];

const ReviewsCarousel: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    skipSnaps: false,
    dragFree: false,
  });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don&apos;t just take our word for it—hear from homeowners who&apos;ve
            experienced the Ivan Remodeling difference.
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="flex-[0_0_100%] sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] min-w-0"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="h-full bg-secondary/50 rounded-xl p-6 shadow-lg border border-border hover:shadow-xl transition-shadow"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-foreground">
                            {review.name}
                          </h3>
                          {review.verified && (
                            <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {review.location}
                        </p>
                        {review.project && (
                          <p className="text-xs text-accent font-medium mt-1">
                            {review.project}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-4 w-4",
                            i < review.rating
                              ? "fill-accent text-accent"
                              : "fill-muted text-muted"
                          )}
                        />
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-foreground/80 leading-relaxed mb-4">
                      &quot;{review.text}&quot;
                    </p>

                    {/* CEO Reply */}
                    {review.ceoReply && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <div className="flex items-start gap-2 mb-2">
                          <MessageSquare className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-semibold text-foreground">
                                Ivan Remodeling LLC
                              </span>
                              <span className="text-xs text-muted-foreground">
                                Owner
                              </span>
                            </div>
                            <p className="text-sm text-foreground/70 leading-relaxed">
                              {review.ceoReply}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              disabled={prevBtnDisabled}
              className="rounded-full"
              aria-label="Previous review"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    index === selectedIndex
                      ? "bg-accent w-8"
                      : "bg-muted hover:bg-muted-foreground/50"
                  )}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              disabled={nextBtnDisabled}
              className="rounded-full"
              aria-label="Next review"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsCarousel;
export { ReviewsCarousel };

