"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Images } from "lucide-react";
import Image from "next/image";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface Project {
  id: string;
  title: string;
  category: string;
  categoryFilter: "All" | "Healthcare" | "Hospitality" | "Commercial" | "Residential";
  location: string;
  description: string;
  image: string;
  year: string;
  galleryUrl?: string;
}

const projects: Project[] = [
  {
    id: "1",
    title: "The Meridian Hotel & Spa",
    category: "Hospitality | 45,000 SQFT",
    categoryFilter: "Hospitality",
    location: "Downtown Metro",
    description: "A complete structural retrofit and interior renovation of a historic 1920s hotel. Project included seismic upgrades, installation of a commercial-grade VRF HVAC system, and soundproofing 120 guest suites to STC 60 standards.",
    image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=3542&auto=format&fit=crop",
    year: "2025",
    galleryUrl: "/projects/meridian-hotel",
  },
  {
    id: "2",
    title: "Apex Medical Center - Surgical Wing",
    category: "Healthcare | OSHPD Compliant",
    categoryFilter: "Healthcare",
    location: "North Campus",
    description: "Construction of a Level 1 Trauma Center extension. Features include ISO 5 cleanrooms, lead-lined radiology suites, and a redundant medical gas distribution system. Delivered 3 weeks ahead of the strict hospital compliance schedule.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=3535&auto=format&fit=crop",
    year: "2024",
    galleryUrl: "/projects/apex-medical",
  },
  {
    id: "3",
    title: "Vanguard Corporate Headquarters",
    category: "Commercial | LEED Platinum",
    categoryFilter: "Commercial",
    location: "Financial District",
    description: "A 12-story commercial build-out focusing on sustainability. Integrated smart-glass fenestration, automated building management systems (BMS), and a suspended steel staircase in the main atrium.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=3538&auto=format&fit=crop",
    year: "2024",
    galleryUrl: "/projects/vanguard-hq",
  },
  {
    id: "4",
    title: "The Summit Estate",
    category: "Ultra-Luxury Residential",
    categoryFilter: "Residential",
    location: "Private Location",
    description: "Hillside architectural marvel requiring deep-foundation micro-piles and cantilevered steel engineering. Includes an infinity pool with hydraulic cover and a subterranean 8-car garage.",
    image: "https://images.unsplash.com/photo-1600596542815-e328700336f4?q=80&w=3540&auto=format&fit=crop",
    year: "2023",
    galleryUrl: "/projects/summit-estate",
  },
];

const categories: Array<"All" | "Healthcare" | "Hospitality" | "Commercial" | "Residential"> = [
  "All",
  "Healthcare",
  "Hospitality",
  "Commercial",
  "Residential",
];

export const FeaturedProjects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<"All" | "Healthcare" | "Hospitality" | "Commercial" | "Residential">("All");

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter((project) => project.categoryFilter === activeCategory);

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
            Enterprise-level construction projects: Hotels, Hospitals, Commercial, and Ultra-Luxury Residential
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300",
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-background border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
              )}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Animated Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative bg-background border border-border/60 rounded-lg overflow-hidden hover:border-primary/50 hover:shadow-xl transition-all duration-300"
              >
                {/* Project Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Project Content */}
                <div className="p-6">
                  {/* Category */}
                  <span className="inline-block text-xs font-semibold text-primary uppercase tracking-wide mb-2">
                    {project.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>

                  {/* Location & Year */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span>{project.location}</span>
                    <span>•</span>
                    <span>{project.year}</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                  </p>

                  {/* View Gallery Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full rounded-full border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                    asChild
                  >
                    <a href={project.galleryUrl || "#projects"}>
                      <Images className="mr-2 h-4 w-4" />
                      View Gallery
                    </a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-muted-foreground text-lg">
              No projects found in this category.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};
