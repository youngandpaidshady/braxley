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
      "Braxley Nevim Elite Remodeling LLC expertly managed our outpatient wing renovation in a fully operational hospital setting—zero compromises to patient safety, delivered ahead of schedule.",
    name: "Dr. Elena Marquez",
    designation: "Hospital Administrator",
    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop",
    reply:
      "Braxley: Healthcare work demands regulatory precision and respect for patient well-being—thank you for trusting us."
  },
  {
    quote:
      "Braxley and his team reimagined our oceanfront villas and spa with exquisite harmony—delivered stress-free, even during peak season.",
    name: "James Harrington",
    designation: "Resort Owner",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop",
    reply:
      "Braxley: Crafting serene, indulgent spaces without disrupting guests is core to our work—honored to partner with you."
  },
  {
    quote:
      "Handling a premium suite upgrade in a 65,000-seat venue during live events required flawless timing. Braxley delivered without interrupting a single game.",
    name: "Michael Torres",
    designation: "Stadium Operations Director",
    src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop",
    reply:
      "Braxley: Live-event constraints demand rigorous planning—we’re grateful for your confidence and partnership."
  },
  {
    quote:
      "Braxley provided genuine white-glove service throughout our lobby, restaurant, and guest-room refresh—absolutely no guest disturbance.",
    name: "Sophia Laurent",
    designation: "Luxury Hotel Manager",
    src: "https://images.unsplash.com/photo-1636041293178-808a676cda48?q=80&w=3540&auto=format&fit=crop",
    reply:
      "Braxley: Discreet execution and daily coordination are non-negotiable in hospitality—thank you for the trust."
  },
  {
    quote:
      "Braxley served as our strategic partner on a flagship office tower repositioning—superior craftsmanship under budget and weeks early.",
    name: "Victoria Langford",
    designation: "High-End Commercial Developer",
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=3540&auto=format&fit=crop",
    reply:
      "Braxley: Value engineering and transparent communication protect both the schedule and the ROI—thank you for your partnership."
  },
  {
    quote:
      "Braxley’s mastery of compliance and safety made our emergency department expansion exceptionally smooth in an active facility.",
    name: "Robert Kline",
    designation: "Hospital Administrator",
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=3000&auto=format&fit=crop",
    reply:
      "Braxley: Protecting clinical operations and patient safety during transformation is non-negotiable—thank you."
  },
  {
    quote:
      "Braxley’s white-glove precision refreshed our executive suites while maintaining full occupancy—meticulous standards, zero stress.",
    name: "Alexander Pierce",
    designation: "Luxury Hotel Manager",
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=3000&auto=format&fit=crop",
    reply:
      "Braxley: Upholding a property’s legacy with discreet excellence is our commitment—thank you for the gracious testimonial."
  },
  {
    quote:
      "Braxley drove outstanding ROI on our trophy property through strategic budgeting and superior finishes—complexity felt effortless.",
    name: "Nathaniel Cole",
    designation: "High-End Commercial Developer",
    src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop",
    reply:
      "Braxley: Long-term value creation and trusted collaboration define our approach—thank you for the partnership."
  }
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
            className="bg-card rounded-2xl p-8 md:p-12 shadow-xl border border-border relative overflow-hidden"
          >
            {/* Gold accent border on top */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
            
            {/* Quote */}
            <div className="mb-6">
              <p className="text-xl md:text-2xl font-serif text-foreground leading-relaxed">
                <span className="text-primary text-3xl md:text-4xl font-bold leading-none mr-1">&quot;</span>
                {currentTestimonial.quote}
                <span className="text-primary text-3xl md:text-4xl font-bold leading-none ml-1">&quot;</span>
              </p>
            </div>

            {/* Author Info */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/30">
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
                <p className="text-sm text-primary/70 font-medium">{currentTestimonial.designation}</p>
              </div>
            </div>

            {/* CEO Reply */}
            {currentTestimonial.reply && (
              <div className="bg-primary/10 border-l-2 border-primary p-4 mt-6 rounded-r-lg">
                <p className="text-sm italic text-muted-foreground">
                  <span className="font-bold text-foreground not-italic">Braxley:</span>{" "}
                  {currentTestimonial.reply}
                </p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-primary/20">
              <Button
                variant="ghost"
                size="icon"
                onClick={goToPrevious}
                aria-label="Previous testimonial"
                className="hover:text-primary hover:bg-primary/10"
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
                className="hover:text-primary hover:bg-primary/10"
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

