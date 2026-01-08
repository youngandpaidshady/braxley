"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
}

interface ProjectLightboxProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectLightbox: React.FC<ProjectLightboxProps> = ({
  project,
  onClose,
}) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative max-w-5xl w-full bg-card rounded-lg overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6 text-primary" strokeWidth={1.5} />
          </button>

          {/* Image */}
          <div className="relative aspect-[16/10] w-full">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>

          {/* Content */}
          <div className="p-6">
            <p className="text-[10px] font-mono uppercase tracking-widest text-primary mb-2">
              {project.category}
            </p>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
              {project.title}
            </h2>
            <p className="text-muted-foreground">{project.description}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
