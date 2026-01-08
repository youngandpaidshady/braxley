"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export const SectionTracker: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Check if desktop on mount (prevent hydration mismatch)
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  // Check which section is in view
  useEffect(() => {
    if (!isDesktop) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      // Find the active section
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }

      // Show tracker after initial scroll
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDesktop]);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 80; // Account for navbar
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Don't render on mobile (prevent hydration mismatch)
  if (!isDesktop) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: isVisible ? 0.5 : 0, x: isVisible ? 0 : 20 }}
      transition={{ duration: 0.3 }}
      className="fixed right-8 top-1/2 -translate-y-1/2 z-[200] pointer-events-auto hidden lg:block"
    >
      <div className="flex flex-col items-center gap-3">
        {/* Vertical Line */}
        <div className="absolute top-0 bottom-0 w-px bg-border" />

        {/* Section Dots */}
        {sections.map((section) => {
          const isActive = activeSection === section.id;

          return (
            <motion.button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="relative group"
              aria-label={`Scroll to ${section.label}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              {/* Dot */}
              <motion.div
                className={cn(
                  "w-3 h-3 rounded-full border-2 transition-colors",
                  isActive
                    ? "bg-accent border-accent"
                    : "bg-transparent border-border hover:border-accent/50"
                )}
                animate={{
                  scale: isActive ? 1.5 : 1,
                  boxShadow: isActive
                    ? "0 0 12px hsl(var(--accent) / 0.5)"
                    : "0 0 0px transparent",
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Tooltip */}
              <span
                className={cn(
                  "absolute right-6 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-md",
                  "text-xs font-medium whitespace-nowrap",
                  "bg-background border border-border shadow-lg",
                  "opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                )}
              >
                {section.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

