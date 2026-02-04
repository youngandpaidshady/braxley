"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ProjectCard } from "@/components/ui/project-card";
import { PROJECTS_ARRAY, type Project } from "@/lib/projects-data";

const CATEGORIES = ["All", "Residential", "Restoration", "Structural", "Hospitality", "Infrastructure"] as const;
type Category = typeof CATEGORIES[number];

export function ProjectsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    (searchParams.get("category") as Category) || "All"
  );

  // Update URL when category changes
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

  // Filter projects based on selected category
  const filteredProjects =
    selectedCategory === "All"
      ? PROJECTS_ARRAY
      : PROJECTS_ARRAY.filter((project) => project.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[hsl(35_25%_98%)] dark:bg-[hsl(220_16%_10%)] pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-20">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <header className="mb-12 sm:mb-16 md:mb-20 border-l-2 border-primary pl-4 sm:pl-6 md:pl-10">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-serif italic tracking-tighter text-foreground leading-tight sm:leading-none mb-3 sm:mb-4">
            Portfolio of Mandates
          </h1>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary font-bold">
            EST. 2022 • ARCHITECTURAL FORENSICS
          </p>
        </header>

        {/* Sticky Filter Bar */}
        <nav className="sticky top-16 sm:top-20 z-40 bg-[hsl(35_25%_98%)] dark:bg-[hsl(220_16%_10%)] py-4 sm:py-6 mb-8 sm:mb-16 -mx-4 sm:-mx-6 lg:-mx-12 px-4 sm:px-6 lg:px-12 border-b border-primary/20 backdrop-blur-sm" aria-label="Project categories">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 lg:gap-8">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={cn(
                  "font-mono text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-all duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                  "touch-manipulation min-h-[44px] px-2 sm:px-3",
                  selectedCategory === category
                    ? "text-primary font-bold border-b-2 border-primary pb-1.5 sm:pb-2"
                    : "text-muted-foreground hover:text-primary active:text-primary"
                )}
                aria-pressed={selectedCategory === category}
              >
                {category}
              </button>
            ))}
          </div>
        </nav>

        {/* Project Grid */}
        <section aria-label="Project portfolio">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-32">
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, index) => (
                <article key={project.id} className={cn("w-full", index % 2 !== 0 && "md:mt-24")}>
                  <ProjectCard project={project} index={index} />
                </article>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-24">
            <p className="font-serif text-2xl text-muted-foreground">
              No projects found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
