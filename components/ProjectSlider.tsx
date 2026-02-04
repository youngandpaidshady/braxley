"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, X } from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  stats?: { value: string; label: string }[];
}

const projects: Project[] = [
  {
    id: "1",
    title: "Modern Kitchen Transformation",
    category: "Kitchen",
    description: "Complete kitchen renovation with custom cabinetry and premium appliances",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=800&fit=crop&q=80",
    stats: [{ value: "$85K", label: "Value" }],
  },
  {
    id: "2",
    title: "Luxury Master Bathroom",
    category: "Bathroom",
    description: "Spa-inspired bathroom with walk-in shower and freestanding tub",
    image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1200&h=800&fit=crop&q=80",
    stats: [{ value: "$120K", label: "Value" }],
  },
  {
    id: "3",
    title: "Open Concept Living Space",
    category: "Living Room",
    description: "Removed walls to create a bright, airy family room",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop&q=80",
    stats: [{ value: "$95K", label: "Value" }],
  },
  {
    id: "4",
    title: "Riverside Stadium Suites",
    category: "Stadium",
    description: "Premium suite and club-level upgrades for 65,000-seat venue",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200&h=800&fit=crop&q=80",
    stats: [{ value: "$12M", label: "Value" }, { value: "65K", label: "Seats" }],
  },
  {
    id: "5",
    title: "St. Augustine Medical Center",
    category: "Healthcare",
    description: "Outpatient wing renovation in fully operational hospital setting",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=800&fit=crop&q=80",
    stats: [{ value: "$8M", label: "Value" }, { value: "120", label: "Beds" }],
  },
  {
    id: "6",
    title: "Azure Bay Resort Villas",
    category: "Resort",
    description: "Oceanfront villa renovations with luxury spa integration",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&h=800&fit=crop&q=80",
    stats: [{ value: "$15M", label: "Value" }, { value: "48", label: "Villas" }],
  },
];

/* ========================================
   PROJECT CARD - Stacked Style
   ======================================== */
interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="cursor-pointer flex-shrink-0 w-[280px] md:w-[320px] lg:w-[360px] bg-card border border-border/50 rounded-lg overflow-hidden shadow-none dark:shadow-md dark:hover:shadow-xl transition-shadow duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className={`object-cover transition-transform duration-500 ease-out ${isHovered ? "scale-110" : "scale-100"
            }`}
          sizes="360px"
          priority
        />
      </div>

      {/* Content - Below Image */}
      <div className="p-5 text-left">
        {/* Category */}
        <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
          {project.category}
        </p>

        {/* Title */}
        <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-2 leading-tight">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground">
          {project.description}
        </p>
      </div>
    </div>
  );
};

/* ========================================
   PROJECT LIGHTBOX
   ======================================== */
interface ProjectLightboxProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectLightbox: React.FC<ProjectLightboxProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/95 backdrop-blur-xl"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-4xl rounded-2xl overflow-hidden bg-muted"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Large Image */}
          <div className="relative aspect-video">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-800 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="p-8">
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-gold bg-gold/20 rounded-full mb-3">
              {project.category}
            </span>
            <h3 className="font-display text-3xl md:text-4xl font-bold uppercase text-foreground mb-3">
              {project.title}
            </h3>
            <p className="text-lg text-muted-foreground body-text mb-6">
              {project.description}
            </p>

            {project.stats && (
              <div className="flex gap-8 pt-6 border-t border-white/10">
                {project.stats.map((stat, index) => (
                  <div key={index}>
                    <div className="text-3xl font-display font-bold text-gold">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-foreground hover:text-gold transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* ========================================
   FEATURED PROJECTS - Carousel Layout
   ======================================== */
const ProjectSlider: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="portfolio" className="py-20 md:py-28 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-12"
        >
          <span className="inline-block px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-gold border border-gold/30 bg-gold/5 backdrop-blur-sm rounded-full mb-4">
            Portfolio
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl body-text">
            Explore our latest transformations across residential, commercial, and institutional spaces.
          </p>
        </motion.div>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Scrollable Track */}
        <div
          className="flex gap-5 px-4 sm:px-6 lg:px-8 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {projects.map((project) => (
            <div key={project.id} className="flex-shrink-0">
              <ProjectCard
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* View Full Portfolio Button - Sharp Corners */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10 text-center">
        <Link
          href="/projects"
          className="inline-flex items-center gap-3 px-8 py-4 border border-foreground/30 text-foreground font-mono uppercase tracking-widest text-sm hover:border-gold hover:text-gold transition-all duration-300"
        >
          View Full Portfolio
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Lightbox */}
      {selectedProject && (
        <ProjectLightbox
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Hide scrollbar CSS */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default ProjectSlider;
