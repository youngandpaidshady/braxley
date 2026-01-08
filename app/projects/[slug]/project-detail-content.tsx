"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Info, ChevronLeft, ChevronRight, Grid3x3, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PROJECTS } from "@/lib/projects-data";

interface ProjectDetailContentProps {
  params: Promise<{ slug: string }>;
}

export function ProjectDetailContent({ params }: ProjectDetailContentProps) {
  const { slug } = use(params);
  const project = PROJECTS[slug];

  if (!project) {
    notFound();
  }

  const [expanded, setExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  
  const galleryImages = project.gallery || [project.image];
  const hasMultipleImages = galleryImages.length > 1;

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setShowGallery(false);
  };

  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-black -mt-20 z-[1]">
      {/* Full-Screen Image Stage */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="h-screen w-full relative overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={galleryImages[currentImageIndex]}
              alt={`${project.title} - ${project.location} - Image ${currentImageIndex + 1} of ${galleryImages.length}`}
              fill
              className="absolute inset-0 object-cover z-0"
              sizes="100vw"
              priority={currentImageIndex === 0}
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Dark Vignette Overlay - Bottom 30% for text readability */}
        <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />

        {/* Image Navigation Controls - Only show if multiple images */}
        {hasMultipleImages && (
          <>
            <button
              onClick={handlePreviousImage}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-background/80 backdrop-blur-sm hover:bg-background/90 active:bg-background border border-primary/20 p-3 md:p-3 rounded-full transition-all group touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-primary group-hover:scale-110 transition-transform" strokeWidth={1.5} />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-background/80 backdrop-blur-sm hover:bg-background/90 active:bg-background border border-primary/20 p-3 md:p-3 rounded-full transition-all group touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-primary group-hover:scale-110 transition-transform" strokeWidth={1.5} />
            </button>
            
            {/* Image Counter */}
            <div className="absolute top-2 md:top-4 right-2 md:right-4 z-20 bg-background/80 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 font-mono text-[10px] md:text-xs uppercase tracking-widest text-primary font-bold border border-primary/20">
              {currentImageIndex + 1} / {galleryImages.length}
            </div>

            {/* Gallery Grid Toggle Button */}
            <button
              onClick={() => setShowGallery(!showGallery)}
              className="absolute top-2 md:top-4 left-2 md:left-4 z-20 bg-background/80 backdrop-blur-sm hover:bg-background/90 active:bg-background border border-primary/20 p-3 rounded-full transition-all group touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="View gallery"
            >
              <Grid3x3 className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" strokeWidth={1.5} />
            </button>
          </>
        )}
      </motion.div>

      {/* Gallery Grid Overlay */}
      <AnimatePresence>
        {showGallery && hasMultipleImages && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md p-4 md:p-8 overflow-y-auto"
            onClick={() => setShowGallery(false)}
          >
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <header className="flex items-center justify-between mb-6 md:mb-8">
                <h2 className="font-serif text-2xl md:text-3xl text-foreground">
                  {project.title} Gallery
                </h2>
                <button
                  onClick={() => setShowGallery(false)}
                  className="bg-background/80 backdrop-blur-sm hover:bg-background border border-primary/20 p-2 rounded-full transition-all"
                  aria-label="Close gallery"
                >
                  <X className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </button>
              </header>

              {/* Gallery Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {galleryImages.map((img, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className={`relative aspect-square overflow-hidden rounded-lg border-2 cursor-pointer transition-all ${
                      idx === currentImageIndex
                        ? "border-primary shadow-lg shadow-primary/20"
                        : "border-primary/20 hover:border-primary/50"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleImageClick(idx);
                    }}
                  >
                    <Image
                      src={img}
                      alt={`${project.title} - ${project.location} - Gallery Image ${idx + 1}`}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      loading="lazy"
                    />
                    {idx === currentImageIndex && (
                      <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                        <div className="bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full font-mono text-xs text-primary font-bold">
                          Current
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Technical Detail Tray - Minimal when collapsed */}
      <motion.div
        initial={false}
        className="fixed bottom-0 left-0 right-0 z-30"
      >
        <motion.div 
          className="bg-background/80 backdrop-blur-2xl border-t border-primary/20 flex flex-col overflow-hidden"
          animate={{
            height: expanded ? "40vh" : "auto",
            maxHeight: expanded ? "40vh" : "none"
          }}
          transition={{ 
            duration: 0.4, 
            ease: [0.22, 1, 0.36, 1] 
          }}
        >
          {/* Collapsed State - Minimal bar at bottom */}
          <button
            onClick={() => setExpanded((prev) => !prev)}
            aria-expanded={expanded}
            className="w-full text-left group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm px-6 py-4 md:px-8 md:py-6 touch-manipulation min-h-[60px] md:min-h-auto"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1 flex-1 min-w-0">
                <h1 className="font-serif text-xl md:text-2xl lg:text-3xl text-foreground leading-tight truncate">
                  {project.title}
                </h1>
                <p className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-primary">
                  {project.location}
                </p>
              </div>
              <div className="flex items-center gap-2 text-primary ml-4 flex-shrink-0">
                <span className="font-mono text-xs uppercase tracking-[0.2em] hidden sm:inline">
                  Info
                </span>
                <motion.div
                  animate={{ rotate: expanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Info className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" strokeWidth={1.5} />
                </motion.div>
              </div>
            </div>
          </button>

          {/* Expanded State Content */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="px-6 md:px-8 pb-6 md:pb-8 overflow-y-auto flex-1 space-y-6"
                style={{ maxHeight: 'calc(40vh - 100px)' }}
              >
                {/* Description Section */}
                <div className="space-y-4">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary/60 font-bold mb-2">
                      PROJECT ID
                    </p>
                    <p className="font-mono text-sm text-primary font-bold">
                      [{project.id}]
                    </p>
                  </div>
                  
                  {project.description && (
                    <div>
                      <p className="text-sm md:text-base leading-relaxed text-foreground">
                        {project.description}
                      </p>
                    </div>
                  )}
                  
                  {project.brief && (
                    <div>
                      <p className="text-xs md:text-sm leading-relaxed text-foreground/90">
                        {project.brief}
                      </p>
                    </div>
                  )}
                </div>

                {/* Technical Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-primary/20">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-primary/60 font-bold mb-1">
                      LOCATION
                    </p>
                    <p className="font-mono text-xs text-primary font-medium">
                      {project.location}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-primary/60 font-bold mb-1">
                      SCOPE
                    </p>
                    <p className="font-mono text-xs text-primary font-medium">
                      {project.scope}
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-primary/60 font-bold mb-1">
                      CATEGORY
                    </p>
                    <p className="font-mono text-xs text-primary font-medium">
                      {project.category}
                    </p>
                  </div>
                </div>

                {/* Gallery Info */}
                {hasMultipleImages && (
                  <div className="pt-4 border-t border-primary/20">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-primary/60 font-bold mb-2">
                      GALLERY
                    </p>
                    <p className="font-mono text-xs text-primary font-medium mb-3">
                      {galleryImages.length} Images Available
                    </p>
                    <button
                      onClick={() => {
                        setShowGallery(true);
                        setExpanded(false);
                      }}
                      className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-primary hover:text-primary/80 transition-colors"
                    >
                      <Grid3x3 className="w-4 h-4" strokeWidth={1.5} />
                      View All Images
                    </button>
                  </div>
                )}

                {/* Back to Portfolio Button */}
                <div className="pt-4 border-t border-primary/20">
                  <Button
                    asChild
                    variant="ghost"
                    className="text-primary hover:text-primary hover:bg-primary/10 font-mono text-[10px] uppercase tracking-widest px-0"
                  >
                    <Link href="/projects" className="flex items-center gap-2">
                      <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
                      Back to Portfolio
                    </Link>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}
