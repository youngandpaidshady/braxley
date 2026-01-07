"use client";

import React, { useCallback, useEffect, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ImageWithSkeleton } from "./ui/ImageWithSkeleton";
import { ProjectLightbox } from "./ProjectLightbox";

interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  description?: string;
}

const projects: Project[] = [
  {
    id: "1",
    title: "Modern Kitchen Transformation",
    category: "Kitchen Remodel",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200&h=900&fit=crop&q=80",
    description: "Complete luxury kitchen renovation with custom cabinetry",
  },
  {
    id: "2",
    title: "Luxury Master Bathroom",
    category: "Bathroom Renovation",
    image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1200&h=900&fit=crop&q=80",
    description: "Spa-inspired bathroom with walk-in shower and freestanding tub",
  },
  {
    id: "3",
    title: "Open Concept Living Space",
    category: "Interior Remodel",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=900&fit=crop&q=80",
    description: "Removed walls to create a bright, airy family room",
  },
  {
    id: "4",
    title: "Basement Finishing",
    category: "Basement",
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1200&h=900&fit=crop&q=80",
    description: "Transformed unused space into a modern entertainment area",
  },
];

const ProjectSlider: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    skipSnaps: false,
    dragFree: false,
  });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragVelocity, setDragVelocity] = useState(0);

  // Track drag velocity for distortion effect
  const velocityRef = useRef(0);
  const lastScrollPos = useRef(0);
  const lastTime = useRef(Date.now());

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

  // Track scroll velocity
  useEffect(() => {
    if (!emblaApi) return;

    const handleScroll = () => {
      const currentTime = Date.now();
      const timeDelta = currentTime - lastTime.current;
      const scrollPos = emblaApi.scrollProgress();

      if (timeDelta > 0) {
        const velocity =
          Math.abs(scrollPos - lastScrollPos.current) / (timeDelta / 1000);
        velocityRef.current = velocity;
        setDragVelocity(velocity);
      }

      lastScrollPos.current = scrollPos;
      lastTime.current = currentTime;
    };

    emblaApi.on("scroll", handleScroll);
    emblaApi.on("pointerDown", () => setIsDragging(true));
    emblaApi.on("pointerUp", () => {
      setIsDragging(false);
      // Reset velocity after drag ends
      setTimeout(() => {
        setDragVelocity(0);
        velocityRef.current = 0;
      }, 300);
    });

    return () => {
      emblaApi.off("scroll", handleScroll);
      emblaApi.off("pointerDown", () => setIsDragging(false));
      emblaApi.off("pointerUp", () => setIsDragging(false));
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  // Custom cursor state
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showCustomCursor, setShowCustomCursor] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sliderRef.current) {
        const rect = sliderRef.current.getBoundingClientRect();
        const isInside =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;

        setShowCustomCursor(isInside);
        setCursorPosition({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section id="projects" className="py-20 md:py-32 bg-background relative">
      {/* Custom Drag Cursor */}
      {showCustomCursor && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference"
          style={{
            x: cursorPosition.x - 20,
            y: cursorPosition.y - 20,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          <div className="w-10 h-10 rounded-full border-2 border-accent flex items-center justify-center bg-background/20 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-accent" />
          </div>
        </motion.div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our portfolio of transformative remodeling projects.
          </p>
        </motion.div>

        <div ref={sliderRef} className="relative max-w-7xl mx-auto">
          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6 lg:gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="flex-[0_0_85%] sm:flex-[0_0_70%] lg:flex-[0_0_60%] min-w-0"
                >
                  <ProjectCard
                    project={project}
                    dragVelocity={dragVelocity}
                    isDragging={isDragging}
                    onProjectClick={(project) => {
                      setSelectedProject(project);
                      setIsLightboxOpen(true);
                    }}
                  />
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
              <ChevronLeft className="h-5 w-5" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    index === selectedIndex
                      ? "bg-accent w-8"
                      : "bg-muted hover:bg-muted-foreground/50"
                  )}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              disabled={nextBtnDisabled}
              className="rounded-full"
              aria-label="Next project"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Lightbox */}
      {selectedProject && (
        <ProjectLightbox
          project={selectedProject}
          isOpen={isLightboxOpen}
          onClose={() => {
            setIsLightboxOpen(false);
            setTimeout(() => setSelectedProject(null), 300);
          }}
          layoutId={`project-${selectedProject.id}`}
        />
      )}
    </section>
  );
};

interface ProjectCardProps {
  project: Project;
  dragVelocity: number;
  isDragging: boolean;
  onProjectClick: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  dragVelocity,
  isDragging,
  onProjectClick,
}) => {
  // Velocity-based distortion using motion values
  const skewValue = useMotionValue(0);
  const scaleValue = useMotionValue(1);

  useEffect(() => {
    if (!isDragging || dragVelocity < 0.5) {
      skewValue.set(0);
      scaleValue.set(1);
      return;
    }

    // Apply skew based on velocity (max 5 degrees)
    const skew = Math.min(dragVelocity * 2, 5);
    skewValue.set(dragVelocity > 0 ? skew : -skew);

    // Slight horizontal stretch based on velocity
    scaleValue.set(1 + Math.min(dragVelocity * 0.1, 0.15));
  }, [dragVelocity, isDragging, skewValue, scaleValue]);

  const skewX = useSpring(skewValue, { stiffness: 400, damping: 30 });
  const scaleX = useSpring(scaleValue, { stiffness: 400, damping: 30 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-background border border-border cursor-pointer"
      style={{
        skewX: isDragging ? skewX : 0,
        scaleX: isDragging ? scaleX : 1,
        transformOrigin: "center center",
      }}
      onClick={() => onProjectClick(project)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary/50">
        <motion.div layoutId={`project-${project.id}`} className="absolute inset-0">
          <ImageWithSkeleton
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 85vw, (max-width: 1024px) 70vw, 60vw"
            containerClassName="absolute inset-0"
          />
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-2">
          <span className="text-xs font-semibold text-accent uppercase tracking-wide">
            {project.category}
          </span>
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">
          {project.title}
        </h3>
        {project.description && (
          <p className="text-muted-foreground leading-relaxed">
            {project.description}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectSlider;
export { ProjectSlider };

