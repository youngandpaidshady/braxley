"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
  reply?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "The attention to detail was completely unlike our past experiences. Ivan noticed things we didn't even think of.",
    name: "Sarah Chen",
    designation: "Kitchen Renovation",
    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    reply: "Ivan: Precision is everything in a kitchen, Sarah. Glad you love the new layout!",
  },
  {
    quote:
      "Implementation was flawless. They navigated the city permits faster than anyone told us was possible.",
    name: "Michael Rodriguez",
    designation: "Whole Home Add-On",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    reply: "Ivan: Managing the city is part of the job, Michael. Enjoy the extra space!",
  },
  {
    quote:
      "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
    name: "Emily Watson",
    designation: "Commercial Build",
    src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    reply: "Ivan: Commercial timelines are strict. Happy we hit the target for you, Emily.",
  },
  {
    quote:
      "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
    name: "James Kim",
    designation: "Master Bath",
    src: "https://images.unsplash.com/photo-1636041293178-808a676cda48?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    reply: "Ivan: Your vision for the marble work was inspiring, James. A pleasure to build.",
  },
  {
    quote:
      "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
    name: "Lisa Thompson",
    designation: "Exterior Remodel",
    src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    reply: "Ivan: Curb appeal adds real value. Thanks for trusting us with the exterior!",
  },
];

export const AnimatedTestimonials: React.FC = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrevious = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[active];

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-2xl p-8 md:p-12 shadow-xl border border-border"
          >
            {/* Quote */}
            <div className="mb-6">
              <p className="text-xl md:text-2xl font-serif text-foreground leading-relaxed">
                &quot;{currentTestimonial.quote}&quot;
              </p>
            </div>

            {/* Author Info */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={currentTestimonial.src}
                  alt={currentTestimonial.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div>
                <h4 className="font-bold text-foreground">{currentTestimonial.name}</h4>
                <p className="text-sm text-muted-foreground">{currentTestimonial.designation}</p>
              </div>
            </div>

            {/* CEO Reply */}
            {currentTestimonial.reply && (
              <div className="bg-primary/10 border-l-2 border-primary p-4 mt-6 rounded-r-lg">
                <p className="text-sm italic text-muted-foreground">
                  <span className="font-bold text-foreground not-italic">Ivan:</span>{" "}
                  {currentTestimonial.reply}
                </p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <Button
                variant="ghost"
                size="icon"
                onClick={goToPrevious}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              {/* Dots Indicator */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActive(index)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      index === active
                        ? "bg-primary w-8"
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    )}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={goToNext}
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

