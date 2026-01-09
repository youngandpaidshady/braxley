"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { TextReveal } from "./ui/TextReveal";
import { ProjectLightbox } from "./ProjectLightbox";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
}

const projects: Project[] = [
  {
    id: "1",
    title: "Modern Kitchen Transformation",
    category: "Kitchen",
    description: "Complete kitchen renovation with custom cabinetry and premium appliances",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=800&fit=crop&q=80",
  },
  {
    id: "2",
    title: "Luxury Master Bathroom",
    category: "Bathroom",
    description: "Spa-inspired bathroom with walk-in shower and freestanding tub",
    image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1200&h=800&fit=crop&q=80",
  },
  {
    id: "3",
    title: "Open Concept Living Space",
    category: "Living Room",
    description: "Removed walls to create a bright, airy family room",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop&q=80",
  },
  {
    id: "4",
    title: "Executive Home Office",
    category: "Office",
    description: "Custom built-in shelving and premium finishes for the modern professional",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop&q=80",
  },
];

const ProjectSlider: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    skipSnaps: false,
    dragFree: false,
    watchDrag: true,
    containScroll: "trimSnaps",
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
    
    // Track drag state using Embla's built-in events
    const handlePointerDown = () => {
      setIsDragging(false);
    };
    
    const handlePointerUp = () => {
      setTimeout(() => setIsDragging(false), 150);
    };

    emblaApi.on("pointerDown", handlePointerDown);
    emblaApi.on("pointerUp", handlePointerUp);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
      emblaApi.off("pointerDown", handlePointerDown);
      emblaApi.off("pointerUp", handlePointerUp);
    };
  }, [emblaApi, onSelect]);

  return (
    <section id="projects" className="relative w-full py-12 md:py-20 lg:py-32 bg-background z-10">
      {/* Visual Separator - Very subtle on mobile like in image */}
      <div className="absolute top-0 left-0 right-0 h-[0.5px] sm:h-[0.5px] md:h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <TextReveal
            text="Our Projects"
            as="h2"
            className="text-4xl md:text-5xl font-serif font-extrabold text-foreground mb-4 tracking-tight"
            splitBy="words"
            stagger={0.1}
          />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our portfolio of completed transformations.
          </p>
        </motion.div>

        {/* Projects Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex items-start gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="flex-[0_0_100%] sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(50%-12px)] min-w-0"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.3 }}
                    className="group cursor-pointer"
                    onPointerDown={(e) => {
                      setDragStart({ x: e.clientX, y: e.clientY });
                      setIsDragging(false);
                    }}
                    onPointerMove={(e) => {
                      if (dragStart) {
                        const deltaX = Math.abs(e.clientX - dragStart.x);
                        const deltaY = Math.abs(e.clientY - dragStart.y);
                        if (deltaX > 10 || deltaY > 10) {
                          setIsDragging(true);
                        }
                      }
                    }}
                    onPointerUp={(e) => {
                      if (dragStart && !isDragging) {
                        const deltaX = Math.abs(e.clientX - dragStart.x);
                        const deltaY = Math.abs(e.clientY - dragStart.y);
                        if (deltaX < 10 && deltaY < 10) {
                          e.stopPropagation();
                          setSelectedProject(project);
                        }
                      }
                      setDragStart(null);
                    }}
                    onClick={(e) => {
                      // Only open if not dragging (for mouse clicks)
                      if (!isDragging) {
                        e.stopPropagation();
                        setSelectedProject(project);
                      }
                    }}
                    style={{ 
                      WebkitTransform: 'translateZ(0)',
                      transform: 'translateZ(0)',
                      touchAction: 'pan-y pinch-zoom'
                    }}
                  >
                    <div className="relative overflow-hidden rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300">
                      {/* Image */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                          loading="lazy"
                          quality={85}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <p className="text-[10px] font-mono uppercase tracking-widest text-primary mb-2">
                          {project.category}
                        </p>
                        <h3 className="text-xl font-serif font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                    </div>
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
              aria-label="Previous project"
            >
              <ChevronLeft className="h-5 w-5 text-primary" strokeWidth={1.5} />
            </Button>

            {/* Dots Indicator */}
            <div className="flex items-center justify-center gap-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "size-1.5 rounded-full transition-all",
                    index === selectedIndex ? "bg-primary" : "bg-primary/35"
                  )}
                  onClick={() => emblaApi?.scrollTo(index)}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              className="touch-manipulation min-w-[44px] min-h-[44px] rounded-full"
              disabled={nextBtnDisabled}
              aria-label="Next project"
            >
              <ChevronRight className="h-5 w-5 text-primary" strokeWidth={1.5} />
            </Button>
          </div>

          {/* View Full Portfolio Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <Button
              asChild
              variant="outline"
              className="group border-primary text-primary hover:bg-primary hover:text-primary-foreground font-mono text-[10px] uppercase tracking-[0.2em] font-bold transition-all rounded-none px-8 py-6"
            >
              <Link href="/projects" className="flex items-center gap-2">
                View Full Portfolio
                <ArrowRight className="h-4 w-4 text-primary group-hover:text-primary-foreground group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Lightbox */}
      <ProjectLightbox
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default ProjectSlider;
