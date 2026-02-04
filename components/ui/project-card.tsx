"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ProjectOverlay } from "@/components/projects/ProjectOverlay";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    location: string;
    scope: string;
    category: string;
    image: string;
    gallery?: string[];
    brief?: string;
    phase?: string;
  };
  index: number;
}

// Get gallery images from project data or generate default
const getGalleryImages = (project: { image: string; gallery?: string[] }): string[] => {
  if (project.gallery && project.gallery.length > 0) {
    return project.gallery;
  }
  return [project.image];
};

// Generate slug from title
const getProjectSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [prefetchedImages, setPrefetchedImages] = useState<Set<string>>(new Set());
  const cardRef = useRef<HTMLDivElement>(null);
  const galleryImages = getGalleryImages(project);
  const projectSlug = getProjectSlug(project.title);

  // Image pre-fetching on hover
  useEffect(() => {
    const prefetchImages = () => {
      galleryImages.forEach((imgSrc) => {
        if (!prefetchedImages.has(imgSrc)) {
          const link = document.createElement("link");
          link.rel = "prefetch";
          link.as = "image";
          link.href = imgSrc;
          document.head.appendChild(link);
          setPrefetchedImages((prev) => new Set(prev).add(imgSrc));
        }
      });
    };

    if (cardRef.current) {
      const card = cardRef.current;
      card.addEventListener("mouseenter", prefetchImages);
      return () => card.removeEventListener("mouseenter", prefetchImages);
    }
  }, [galleryImages, prefetchedImages]);

  const handleClose = () => {
    setIsExpanded(false);
    setCurrentImageIndex(0);
  };

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleImageIndexChange = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <>
      {/* Project Card - Image Only by Default */}
      <motion.div
        layoutId={`project-card-${project.id}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="flex flex-col w-full group"
      >
        {/* Project Image Container - Click to View Gallery */}
        <div 
          ref={cardRef}
          className="relative overflow-hidden border border-primary/10 bg-muted/30 w-full cursor-pointer touch-manipulation"
          onClick={handleExpand}
          onMouseEnter={() => {
            if (window.matchMedia("(hover: hover)").matches) {
              setShowAbout(true);
            }
          }}
          onMouseLeave={() => {
            if (window.matchMedia("(hover: hover)").matches) {
              setShowAbout(false);
            }
          }}
          onTouchStart={() => {
            // Show about on touch for mobile
            if (window.matchMedia("(hover: none)").matches) {
              setShowAbout(true);
            }
          }}
        >
          <motion.div
            layoutId={`project-image-${project.id}`}
            className="relative aspect-[4/3] w-full overflow-hidden"
          >
            <Image
              src={project.image}
              alt={`${project.title} - ${project.location} - ${project.scope}`}
              fill
              className="object-cover transition-all duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={index < 4}
              loading={index < 4 ? undefined : "lazy"}
              quality={index < 4 ? 90 : 75}
            />
            
            {/* Project ID Badge */}
            <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1.5 font-mono text-[8px] uppercase tracking-widest text-primary font-bold border border-primary/20 z-10">
              {project.id}
            </div>

            {/* Category Badge */}
            <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1.5 font-mono text-[8px] uppercase tracking-widest text-primary/80 font-bold border border-primary/20 z-10">
              {project.category}
            </div>

            {/* About Text Overlay - Only on Hover */}
            <AnimatePresence>
              {showAbout && project.brief && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-background/95 backdrop-blur-md p-6 md:p-8 flex flex-col justify-center z-20"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="space-y-4">
                    <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground">
                      {project.title}
                    </h3>
                    <div className="h-px w-16 bg-primary" />
                    <p className="text-sm md:text-base text-foreground/90 leading-relaxed">
                      {project.brief}
                    </p>
                    <div className="pt-2">
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary font-bold">
                        {project.location} {/* */} {project.scope}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Project Info Section - Title, Location, Scope Only (No About) */}
        <div className="mt-6 md:mt-8 flex flex-col w-full">
          {/* Title */}
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4 leading-tight">
            {project.title}
          </h2>
          
          {/* Thin Bronze Line */}
          <div className="h-px w-24 bg-primary mb-4 md:mb-5" />
          
          {/* Location & Scope */}
          <div className="mb-4 md:mb-5 space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary font-bold">
              {project.location}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/80 font-medium">
              {project.scope}
            </p>
          </div>

          {/* View Details Link - Enhanced to Stand Out */}
          <Link
            href={`/projects/${projectSlug}`}
            className={cn(
              "inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] font-bold",
              "px-6 py-3 mt-6 md:mt-8",
              "border-2 border-primary bg-primary/10 hover:bg-primary hover:text-primary-foreground",
              "text-primary transition-all duration-300",
              "group/link touch-manipulation min-h-[44px]",
              "shadow-sm hover:shadow-lg hover:shadow-primary/20",
              "rounded-none",
              "relative overflow-hidden"
            )}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <span className="relative z-10">View Details</span>
            <motion.svg
              width="14"
              height="14"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="relative z-10 group-hover/link:translate-x-1 transition-transform"
            >
              <path
                d="M1 11L11 1M11 1H1M11 1V11"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
            {/* Hover effect background */}
            <motion.div
              className="absolute inset-0 bg-primary"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ transformOrigin: "left" }}
            />
          </Link>
        </div>
      </motion.div>

      {/* Project Overlay - For Gallery View */}
      <ProjectOverlay
        project={project}
        isOpen={isExpanded}
        onClose={handleClose}
        currentImageIndex={currentImageIndex}
        onImageIndexChange={handleImageIndexChange}
      />
    </>
  );
};
