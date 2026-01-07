"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Images } from "lucide-react";
import Image from "next/image";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  galleryUrl?: string;
}

const projects: Project[] = [
  {
    id: "1",
    title: "Highland Residence",
    category: "Whole Home Renovation",
    description:
      "A complete transformation of a 1920s estate, preserving architectural heritage while introducing modern luxury amenities and smart home integration.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop&q=80",
    galleryUrl: "/projects/highland-residence",
  },
  {
    id: "2",
    title: "Serenity Bath Remodel",
    category: "Luxury Bathroom",
    description:
      "Spa-inspired master bathroom featuring custom marble vanities, walk-in rain shower, and freestanding soaking tub with panoramic views.",
    image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1200&h=800&fit=crop&q=80",
    galleryUrl: "/projects/serenity-bath",
  },
  {
    id: "3",
    title: "Apex Tech HQ",
    category: "Commercial Interior",
    description:
      "Modern corporate headquarters with open-plan workspaces, executive suites, and collaborative zones designed for innovation and productivity.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop&q=80",
    galleryUrl: "/projects/apex-tech",
  },
  {
    id: "4",
    title: "Oakwood Kitchen",
    category: "Kitchen Expansion",
    description:
      "Expanded and redesigned kitchen with custom cabinetry, premium appliances, and a large center island perfect for entertaining and family gatherings.",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200&h=800&fit=crop&q=80",
    galleryUrl: "/projects/oakwood-kitchen",
  },
];

export const FeaturedProjects: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-advance slides (optional)
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const goToPrevious = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const activeProject = projects[activeIndex];

  // Generate random rotations for inactive images
  const getRandomRotation = (index: number) => {
    const seed = index * 7 + activeIndex * 3;
    return ((seed % 11) - 5) * 1; // -5deg to 5deg
  };

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Showcasing our finest work in residential and commercial remodeling
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Column: Image Stack (Desktop) / Top (Mobile) */}
          <div className="relative order-1 md:order-1">
            <div className="relative aspect-[4/3] md:aspect-square">
              <AnimatePresence mode="wait" custom={direction}>
                {projects.map((project, index) => {
                  const isActive = index === activeIndex;
                  const distance = Math.abs(index - activeIndex);
                  const rotation = getRandomRotation(index);

                  // Calculate z-index: active is highest, then by distance
                  const zIndex = isActive ? 10 : 5 - distance;

                  return (
                    <motion.div
                      key={project.id}
                      initial={false}
                      animate={{
                        scale: isActive ? 1 : 0.9,
                        y: isActive ? 0 : 20,
                        opacity: isActive ? 1 : 0.4,
                        rotate: isActive ? 0 : rotation,
                        zIndex,
                      }}
                      transition={{
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={cn(
                        "absolute inset-0 rounded-2xl overflow-hidden shadow-2xl",
                        !isActive && "pointer-events-none"
                      )}
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={isActive}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Text Details (Desktop) / Bottom (Mobile) */}
          <div className="order-2 md:order-2 space-y-6">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeProject.id}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -20 : 20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-4"
              >
                {/* Category */}
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="inline-block text-sm font-semibold text-primary uppercase tracking-wide"
                >
                  {activeProject.category}
                </motion.span>

                {/* Title */}
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight"
                >
                  {activeProject.title}
                </motion.h3>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg text-muted-foreground leading-relaxed"
                >
                  {activeProject.description}
                </motion.p>
              </motion.div>
            </AnimatePresence>

            {/* Controls Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-4 pt-6"
            >
              {/* Previous Button */}
              <Button
                variant="outline"
                size="icon"
                onClick={goToPrevious}
                className="rounded-full w-12 h-12 bg-white dark:bg-slate-900 border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                aria-label="Previous project"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              {/* View Gallery Button (Pill) */}
              <Button
                variant="default"
                size="lg"
                className="rounded-full px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                asChild
              >
                <a href={activeProject.galleryUrl || "#projects"}>
                  <Images className="mr-2 h-5 w-5" />
                  View Gallery
                </a>
              </Button>

              {/* Next Button */}
              <Button
                variant="outline"
                size="icon"
                onClick={goToNext}
                className="rounded-full w-12 h-12 bg-white dark:bg-slate-900 border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                aria-label="Next project"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </motion.div>

            {/* Slide Indicators (Optional) */}
            <div className="flex items-center justify-center gap-2 pt-4">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    index === activeIndex
                      ? "bg-primary w-8"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  )}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

