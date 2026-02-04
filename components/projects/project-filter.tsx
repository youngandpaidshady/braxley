"use client";

import React from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type ProjectCategory = "All" | "Kitchens" | "Bathrooms" | "Interiors" | "Additions";

const categories: ProjectCategory[] = ["All", "Kitchens", "Bathrooms", "Interiors", "Additions"];

export const ProjectFilter: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategory = (searchParams.get("category") || "All") as ProjectCategory;

  const updateFilter = (category: ProjectCategory) => {
    const params = new URLSearchParams(searchParams.toString());

    if (category === "All") {
      params.delete("category");
    } else {
      params.set("category", category);
    }

    // Update URL without scrolling
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-12">
      {categories.map((category) => {
        const isActive = currentCategory === category;

        return (
          <motion.button
            key={category}
            onClick={() => updateFilter(category)}
            className={cn(
              "px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
              isActive
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : "bg-background border-2 border-border text-foreground hover:border-primary/50 hover:text-primary"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-pressed={isActive}
            aria-label={`Filter projects by ${category}`}
          >
            {category}
          </motion.button>
        );
      })}
    </div>
  );
};

