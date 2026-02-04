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
    <div className="min-h-screen bg-background">
      {/* Back Button - Fixed at top */}
      <div className="fixed top-20 sm:top-24 left-4 z-[50]">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="bg-background/80 backdrop-blur-sm hover:bg-background border border-border rounded-full px-4"
        >
          <Link href="/projects" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
            <span className="hidden sm:inline text-xs font-mono uppercase tracking-wider">Back</span>
          </Link>
        </Button>
      </div>

      {/* Main Image Section */}
      <section className="pt-16 sm:pt-20">
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] lg:aspect-[21/9] bg-muted overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <Image
                src={galleryImages[currentImageIndex]}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                fill
                className="object-cover"
                sizes="100vw"
                priority={currentImageIndex === 0}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          {hasMultipleImages && (
            <>
              <button
                onClick={handlePreviousImage}
                className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background border border-border p-2.5 rounded-full transition-all touch-manipulation"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" strokeWidth={1.5} />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background border border-border p-2.5 rounded-full transition-all touch-manipulation"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 text-foreground" strokeWidth={1.5} />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full font-mono text-xs text-foreground border border-border">
                {currentImageIndex + 1} / {galleryImages.length}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Project Info Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-8 md:py-12">
        {/* Header */}
        <header className="mb-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary font-bold mb-2">
            {project.category}
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">
            {project.title}
          </h1>
          <p className="font-mono text-sm text-muted-foreground">
            {project.location} • {project.scope}
          </p>
        </header>

        {/* Description */}
        {project.description && (
          <div className="mb-8">
            <p className="text-base md:text-lg text-foreground leading-relaxed">
              {project.description}
            </p>
          </div>
        )}

        {project.brief && (
          <div className="mb-8 p-4 bg-secondary/50 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {project.brief}
            </p>
          </div>
        )}

        {/* Project Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-4 bg-secondary/30 rounded-lg border border-border">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
              Project ID
            </p>
            <p className="font-mono text-sm text-primary font-bold">
              {project.id}
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
              Location
            </p>
            <p className="font-mono text-sm text-foreground">
              {project.location}
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
              Scope
            </p>
            <p className="font-mono text-sm text-foreground">
              {project.scope}
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
              Category
            </p>
            <p className="font-mono text-sm text-foreground">
              {project.category}
            </p>
          </div>
        </div>

        {/* Gallery Thumbnails */}
        {hasMultipleImages && (
          <div className="mb-8">
            <h2 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-4">
              Gallery ({galleryImages.length} images)
            </h2>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentImageIndex(idx);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${idx === currentImageIndex
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-transparent hover:border-primary/50"
                    }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 25vw, 16vw"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Back to Portfolio */}
        <div className="pt-8 border-t border-border">
          <Button
            asChild
            variant="outline"
            className="font-mono text-xs uppercase tracking-wider"
          >
            <Link href="/projects" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
              Back to Portfolio
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
