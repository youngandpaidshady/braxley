"use client";

import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface ProjectImage {
  src: string;
  alt: string;
}

interface ProjectLightboxProps {
  project: {
    id: string;
    title: string;
    category: string;
    image: string;
    description?: string;
    images?: ProjectImage[];
    caseStudyUrl?: string;
  };
  isOpen: boolean;
  onClose: () => void;
  layoutId: string;
}

export const ProjectLightbox: React.FC<ProjectLightboxProps> = ({
  project,
  isOpen,
  onClose,
  layoutId,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Use project.images if available, otherwise use the single image
  const images: ProjectImage[] = project.images || [
    { src: project.image, alt: project.title },
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
              />
            </Dialog.Overlay>

            {/* Modal Content */}
            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
              >
                <div className="relative w-full max-w-7xl max-h-[90vh] bg-background rounded-2xl overflow-hidden shadow-2xl">
                  {/* Image Gallery */}
                  <div className="relative aspect-video md:aspect-[16/10] overflow-hidden bg-secondary/50">
                    {/* Main Image with Layout Animation */}
                    <motion.div
                      layoutId={layoutId}
                      className="absolute inset-0"
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Image
                        src={images[currentImageIndex].src}
                        alt={images[currentImageIndex].alt}
                        fill
                        className="object-cover"
                        priority
                        sizes="100vw"
                      />
                    </motion.div>

                    {/* Navigation Arrows (if multiple images) */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background transition-colors"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="h-6 w-6 text-foreground" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background transition-colors"
                          aria-label="Next image"
                        >
                          <ChevronRight className="h-6 w-6 text-foreground" />
                        </button>

                        {/* Image Counter */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-border">
                          <span className="text-sm text-foreground">
                            {currentImageIndex + 1} / {images.length}
                          </span>
                        </div>
                      </>
                    )}

                    {/* Close Button - Desktop (Top Right) */}
                    <Dialog.Close asChild>
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="hidden md:flex absolute top-4 right-4 z-10 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-background transition-colors"
                        aria-label="Close"
                      >
                        <X className="h-6 w-6 text-foreground" />
                      </motion.button>
                    </Dialog.Close>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 md:p-8 space-y-4 overflow-y-auto max-h-[40vh]">
                    <div>
                      <span className="text-sm font-semibold text-accent uppercase tracking-wide">
                        {project.category}
                      </span>
                      <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mt-2">
                        {project.title}
                      </h2>
                      {project.description && (
                        <p className="text-lg text-muted-foreground mt-4">
                          {project.description}
                        </p>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      {project.caseStudyUrl && (
                        <Button
                          variant="accent"
                          size="lg"
                          className="flex-1"
                          asChild
                        >
                          <a href={project.caseStudyUrl} target="_blank" rel="noopener noreferrer">
                            View Case Study
                            <ExternalLink className="ml-2 h-5 w-5" />
                          </a>
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="lg"
                        className="flex-1"
                        onClick={onClose}
                      >
                        Close
                      </Button>
                    </div>
                  </div>

                  {/* Close Button - Mobile (Bottom Center) */}
                  <Dialog.Close asChild>
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="md:hidden fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-8 py-4 rounded-full bg-background border-2 border-border hover:bg-secondary transition-colors shadow-lg"
                      aria-label="Close"
                    >
                      <span className="text-lg font-semibold text-foreground">Close</span>
                    </motion.button>
                  </Dialog.Close>
                </div>
              </motion.div>
            </Dialog.Content>
          </>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};

