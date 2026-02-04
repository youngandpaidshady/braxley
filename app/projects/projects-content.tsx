"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PROJECTS_ARRAY } from "@/lib/projects-data";
import { ArrowUpRight } from "lucide-react";

const CATEGORIES = ["All", "Residential", "Restoration", "Structural", "Hospitality", "Infrastructure"] as const;
type Category = typeof CATEGORIES[number];

// Generate slug from title
const getProjectSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export function ProjectsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    (searchParams.get("category") as Category) || "All"
  );

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
    const params = new URLSearchParams(searchParams.toString());
    if (category === "All") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    router.replace(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`, {
      scroll: false,
    });
  };

  const filteredProjects =
    selectedCategory === "All"
      ? PROJECTS_ARRAY
      : PROJECTS_ARRAY.filter((project) => project.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="relative pt-24 sm:pt-28 md:pt-32 pb-12 md:pb-16 bg-secondary/30 border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-3">
              Our Portfolio
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight mb-4">
              Featured Projects
            </h1>
            <p className="text-muted-foreground max-w-2xl text-base md:text-lg">
              Explore our collection of transformative residential and commercial projects,
              showcasing craftsmanship and attention to detail.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Sticky Filter Bar */}
      <div className="sticky top-16 sm:top-20 z-40 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <nav
            className="flex overflow-x-auto scrollbar-hide gap-1 py-3 md:py-4 -mx-4 px-4 sm:mx-0 sm:px-0"
            aria-label="Project categories"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={cn(
                  "shrink-0 px-4 py-2 font-mono text-[10px] sm:text-xs uppercase tracking-[0.15em] rounded-full transition-all",
                  "touch-manipulation min-h-[40px]",
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground font-bold"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                )}
                aria-pressed={selectedCategory === category}
              >
                {category}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8 md:py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group"
              >
                <Link
                  href={`/projects/${getProjectSlug(project.title)}`}
                  className="block"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted border border-border/50 group-hover:border-primary/50 transition-colors">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading={index < 6 ? "eager" : "lazy"}
                      quality={index < 6 ? 85 : 75}
                    />

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-primary font-bold rounded-sm">
                      {project.category}
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-white font-mono text-xs uppercase tracking-wider flex items-center gap-1">
                        View Project <ArrowUpRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mt-4">
                    <h2 className="font-serif text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {project.title}
                    </h2>
                    <div className="flex items-center gap-2 mt-1.5">
                      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                        {project.location}
                      </p>
                      <span className="text-muted-foreground/50">•</span>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground line-clamp-1">
                        {project.scope}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="font-serif text-xl text-muted-foreground mb-4">
              No projects found in this category.
            </p>
            <button
              onClick={() => handleCategoryChange("All")}
              className="font-mono text-sm text-primary hover:underline"
            >
              View all projects
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
