"use client";

import React from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { X, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  galleryUrl?: string;
}

interface FilteredProjectListProps {
  initialProjects: Project[];
}

// Map category names to filter values
const categoryMap: Record<string, string[]> = {
  Kitchens: ["Kitchen", "Kitchens", "Kitchen Remodel", "Kitchen Expansion"],
  Bathrooms: ["Bathroom", "Bathrooms", "Bathroom Renovation", "Luxury Bathroom"],
  Interiors: ["Interior", "Interiors", "Interior Remodel", "Commercial Interior"],
  Additions: ["Addition", "Additions", "Room Addition", "Whole Home Renovation"],
};

export const FilteredProjectList: React.FC<FilteredProjectListProps> = ({
  initialProjects,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const categoryParam = searchParams.get("category");

  // Filter projects based on URL param
  const filteredProjects =
    !categoryParam || categoryParam === "All"
      ? initialProjects
      : initialProjects.filter((project) => {
          const categoryVariants = categoryMap[categoryParam] || [];
          return categoryVariants.some((variant) =>
            project.category.toLowerCase().includes(variant.toLowerCase())
          );
        });

  const hasResults = filteredProjects.length > 0;

  // Clear filter function
  const clearFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    router.replace(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`, {
      scroll: false,
    });
  };

  if (!hasResults) {
    return (
      <div className="text-center py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <div className="mb-6 flex justify-center">
            <FolderOpen className="h-16 w-16 text-muted-foreground/50" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            No projects found
          </h3>
          <p className="text-muted-foreground mb-8">
            We don&apos;t have any projects in the &quot;{categoryParam}&quot; category yet.
            Check back soon or browse all our projects.
          </p>
          <Button
            onClick={clearFilter}
            variant="default"
            size="lg"
            className="rounded-full px-8 py-6"
          >
            <X className="h-4 w-4 mr-2" />
            Clear Filters
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {filteredProjects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group"
        >
          <Link
            href={project.galleryUrl || `/projects/${project.id}`}
            className="block"
          >
            <div
              className={cn(
                "relative overflow-hidden rounded-2xl",
                "bg-background border border-border",
                "shadow-lg hover:shadow-xl transition-all duration-300",
                "hover:border-primary/50"
              )}
            >
              {/* Project Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Project Info */}
              <div className="p-6">
                <div className="mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

