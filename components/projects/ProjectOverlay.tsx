"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProjectOverlayProps {
  project: {
    id: string;
    title: string;
    location: string;
    scope: string;
    category: string;
    image: string;
    gallery?: string[];
    brief?: string; // Optional project brief/description
  };
  isOpen: boolean;
  onClose: () => void;
  currentImageIndex: number;
  onImageIndexChange: (index: number) => void;
}

// Generate image descriptions based on project and index
const getImageDescription = (
  projectId: string,
  category: string,
  index: number
): string => {
  const descriptions: Record<string, string[]> = {
    "BN-JWM": [
      "Main Lobby - Grand Entrance",
      "Interior Detail - Luxury Finishing",
      "Interior Detail - Elite Craftsmanship",
    ],
    "BN-LAX": [
      "Exterior Overview - Structural Framework",
      "Detail View - Engineering Precision",
      "Technical Blueprint - Architectural Analysis",
    ],
    "BN-BH": [
      "Exterior View - Architectural Excellence",
      "Interior Detail - Luxury Finishing",
      "Final Detail - Completion Phase",
    ],
    "BN-MH": [
      "Skyline View - Urban Excellence",
      "Interior Detail - Modern Luxury",
      "Final Detail - Elite Craftsmanship",
    ],
  };

  if (descriptions[projectId] && descriptions[projectId][index]) {
    return descriptions[projectId][index];
  }

  // Default descriptions based on category
  const defaultDescriptions: Record<string, string[]> = {
    Residential: [
      "Exterior View - Foundation Complete",
      "Interior Detail - Framing Progress",
      "Final Finish - Completion Phase",
    ],
    Restoration: [
      "Assessment View - Initial State",
      "Restoration Detail - Craftsmanship",
      "Preservation Complete - Final State",
    ],
    Structural: [
      "Structural Analysis - Engineering View",
      "Reinforcement Detail - Technical Execution",
      "Certification Phase - Final Review",
    ],
    Hospitality: [
      "Design Phase - Conceptual View",
      "Renovation Progress - Interior Detail",
      "Finishing Touch - Completion",
    ],
    Infrastructure: [
      "Planning Phase - Overview",
      "Foundation Work - Structural Detail",
      "Construction Progress - Execution",
    ],
  };

  const categoryDescriptions =
    defaultDescriptions[category] || ["Project View", "Detail View", "Final View"];
  return categoryDescriptions[index % categoryDescriptions.length];
};

export const ProjectOverlay: React.FC<ProjectOverlayProps> = ({
  project,
  isOpen,
  onClose,
  currentImageIndex,
  onImageIndexChange,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const dragYRef = React.useRef(0);
  const isDraggingRef = React.useRef(false);
  const galleryImages = project.gallery || [project.image];

  // Handle scroll to update current image index
  useEffect(() => {
    if (!isOpen || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const imageWidth = container.clientWidth;
      const newIndex = Math.round(scrollLeft / imageWidth);
      if (newIndex !== currentImageIndex) {
        onImageIndexChange(newIndex);
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => container.removeEventListener("scroll", handleScroll);
  }, [isOpen, currentImageIndex, onImageIndexChange]);

  // Scroll to image when currentImageIndex changes externally
  useEffect(() => {
    if (!isOpen || !scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const imageWidth = container.clientWidth;
    container.scrollTo({
      left: currentImageIndex * imageWidth,
      behavior: "smooth",
    });
  }, [currentImageIndex, isOpen]);

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentDescription = getImageDescription(
    project.id,
    project.category,
    currentImageIndex
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] bg-background/95 backdrop-blur-3xl"
          onClick={onClose}
        >
          {/* Blurred Background - Hero Image */}
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover opacity-20 blur-3xl scale-110"
              sizes="100vw"
              priority
            />
          </div>

          {/* Close Button - Top Right (Fixed, 48px minimum) */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="fixed top-4 right-4 md:top-8 md:right-8 z-[210] w-11 h-11 md:w-12 md:h-12 min-w-[44px] min-h-[44px] rounded-full border-2 border-primary flex items-center justify-center bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-background transition-colors group"
            whileHover={{ rotate: 90, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
            aria-label="Close gallery"
          >
            <X className="w-5 h-5 md:w-6 md:h-6 text-primary group-hover:text-background transition-colors" strokeWidth={1.5} />
          </motion.button>

          {/* Horizontal Snap-Scroll Carousel with Drag-to-Dismiss */}
          <div
            ref={scrollContainerRef}
            className="flex-1 h-full overflow-x-auto snap-x snap-mandatory flex scrollbar-hide relative z-10"
            style={{ scrollSnapType: "x mandatory" }}
            onClick={(e) => e.stopPropagation()}
          >
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                className="w-screen h-full flex-shrink-0 snap-center relative"
                style={{ scrollSnapAlign: "start" }}
              >
                <motion.div
                  layoutId={idx === 0 ? `project-image-${project.id}` : undefined}
                  drag="y"
                  dragConstraints={{ top: 0, bottom: 0 }}
                  dragElastic={0.3}
                  dragMomentum={false}
                  onDragStart={() => {
                    isDraggingRef.current = true;
                  }}
                  onDrag={(_, info) => {
                    if (info.offset.y > 0) {
                      dragYRef.current = info.offset.y;
                    }
                  }}
                  onDragEnd={(_, info) => {
                    isDraggingRef.current = false;
                    // If dragged down more than 150px, close the gallery
                    if (info.offset.y > 150) {
                      onClose();
                    } else {
                      // Reset position if not dragged far enough
                      dragYRef.current = 0;
                    }
                  }}
                  className="w-full h-full relative p-8 md:p-16 flex items-center justify-center"
                  style={{ y: dragYRef.current > 0 ? dragYRef.current : 0 }}
                >
                  <div className="relative w-full h-full max-w-7xl mx-auto rounded-lg border border-primary/10 overflow-hidden bg-background/50 backdrop-blur-sm">
                    <Image
                      src={img}
                      alt={`${project.title} - Image ${idx + 1}`}
                      fill
                      className="object-contain"
                      sizes="100vw"
                      priority={idx === 0}
                    />
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Technical Ledger - Bottom Metadata */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 25 }}
            className="fixed bottom-0 left-0 right-0 min-h-[120px] p-6 border-t border-primary/20 bg-background/90 backdrop-blur-xl z-[190]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start gap-6">
              <div className="flex flex-col gap-1 flex-1">
                <h2 className="font-serif italic text-xl md:text-2xl text-foreground">
                  {project.title}
                </h2>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                  {project.location} • {project.scope}
                </p>
                {/* Project Brief */}
                {project.brief && (
                  <p className="max-w-md text-[11px] leading-relaxed text-foreground/70 mt-4">
                    {project.brief}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-end gap-1">
                <p className="font-mono text-[10px] uppercase tracking-widest text-primary font-bold">
                  [{project.id}] — {currentDescription}
                </p>
                <p className="font-mono text-[8px] uppercase tracking-wider text-primary/60 mt-1">
                  Image {currentImageIndex + 1} of {galleryImages.length}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Back to Portfolio Button - Bottom Center */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="fixed bottom-32 left-1/2 -translate-x-1/2 z-[195] px-8 py-4 bg-background/60 backdrop-blur-md border-2 border-primary/30 rounded-full font-mono text-[10px] uppercase tracking-widest text-primary font-bold hover:bg-primary hover:text-background hover:border-primary transition-all duration-300 opacity-60 hover:opacity-100"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            aria-label="Back to Portfolio"
          >
            Back to Portfolio
          </motion.button>

          {/* Progress Indicators */}
          <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-[190] flex gap-3 items-center">
            {galleryImages.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  onImageIndexChange(idx);
                }}
                className={cn(
                  "relative w-2 h-2 rounded-full transition-all duration-300",
                  currentImageIndex === idx
                    ? "bg-primary w-8"
                    : "bg-primary/40 hover:bg-primary/70"
                )}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
