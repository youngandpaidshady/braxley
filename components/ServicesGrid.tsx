"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Home,
  Wrench,
  Paintbrush,
  Hammer,
  Bath,
  Building2,
  ArrowRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { TextReveal } from "./ui/TextReveal";
import { ServiceModal } from "./ui/service-modal";
import { SeoFaq } from "./sections/seo-faq";
import { cn } from "@/lib/utils";

interface Service {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  span?: "col-span-1" | "col-span-2";
}

const services: Service[] = [
  {
    icon: Home,
    title: "Luxury Kitchens",
    description:
      "Complete kitchen transformations with custom cabinetry, premium appliances, and modern design that elevates your home.",
    span: "col-span-2",
  },
  {
    icon: Bath,
    title: "Bathroom Renovation",
    description:
      "Luxury bathroom upgrades including walk-in showers, custom vanities, and spa-like features.",
  },
  {
    icon: Building2,
    title: "Commercial Build",
    description:
      "Full-service commercial construction and remodeling for businesses seeking premium finishes.",
    span: "col-span-2",
  },
  {
    icon: Hammer,
    title: "Full Gut Reno",
    description:
      "Complete home transformations from the ground up, ensuring every detail meets our exacting standards.",
  },
  {
    icon: Paintbrush,
    title: "Interior Remodeling",
    description:
      "Comprehensive interior updates including flooring, painting, trim work, and architectural details.",
  },
  {
    icon: Wrench,
    title: "General Contracting",
    description:
      "Full-service project management for complex renovations requiring multiple trades and coordination.",
  },
];

interface ServiceCardProps {
  service: Service;
  index: number;
  onSelect?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index, onSelect }) => {
  const cardRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position tracking (desktop only)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring animations for tilt (desktop only)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7.5, -7.5]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7.5, 7.5]), {
    stiffness: 300,
    damping: 30,
  });

  // Glow position
  const glowX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Normalize to -0.5 to 0.5
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const Icon = service.icon;

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "group relative bg-white dark:bg-[#0f172a] rounded-2xl p-6 lg:p-8 shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 hover:shadow-xl hover:shadow-slate-300/50 dark:hover:shadow-slate-900/50 transition-all duration-300 border border-border/50 dark:border dark:border-slate-800 overflow-hidden",
        "cursor-pointer h-[500px] flex flex-col",
        // Mobile: full width within carousel slide
        "w-full",
        // Desktop: grid span
        "md:col-span-1"
      )}
      onClick={onSelect}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Glow Effect (Desktop only) */}
      <motion.div
        className="hidden md:block absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glowX} ${glowY}, rgba(251, 146, 60, 0.15) 0%, transparent 70%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1">
        <div className="mb-4">
          <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
            <Icon className="h-7 w-7 text-accent" />
          </div>
        </div>

        <h3 className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-slate-50 mb-3">
          {service.title}
        </h3>

        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4 flex-1">
          {service.description}
        </p>

        <Button
          variant="ghost"
          size="sm"
          className="group-hover:text-accent transition-colors mt-auto"
          onClick={(e) => {
            e.stopPropagation();
            onSelect?.();
          }}
        >
          View Details
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>

      {/* Subtle border glow on hover (Desktop only) */}
      <motion.div
        className="hidden md:block absolute inset-0 rounded-2xl border-2 border-accent/0 group-hover:border-accent/30 transition-colors duration-300 pointer-events-none"
        style={{
          transform: "translateZ(0)",
        }}
      />
    </motion.article>
  );
};

export const ServicesGrid: React.FC = () => {
  // Modal state
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Embla Carousel for mobile
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    containScroll: "trimSnaps",
    breakpoints: {
      "(min-width: 768px)": { active: false }, // Disable on desktop
    },
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section id="services" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <TextReveal
            text="Our Services"
            as="h2"
            className="text-4xl md:text-5xl font-extrabold text-foreground mb-4"
            splitBy="words"
            stagger={0.1}
          />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive remodeling solutions tailored to your vision and
            budget.
          </p>
        </motion.div>

        {/* Mobile: Embla Carousel with "Peek-a-boo" Effect */}
        <div className="md:hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="flex-[0_0_85%] min-w-0 mr-4"
                >
                  <ServiceCard
                    service={service}
                    index={index}
                    onSelect={() => setSelectedService(service)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots (Mobile only) */}
          <div className="flex justify-center gap-2 mt-8">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === selectedIndex
                    ? "bg-accent w-8"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
                aria-label={`Go to service ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              index={index}
              onSelect={() => setSelectedService(service)}
            />
          ))}
        </div>
      </div>

      {/* Service Modal */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </section>
  );
};

// Export ServicesGrid only (FAQ moved to page.tsx)
export const ServicesSection: React.FC = () => {
  return <ServicesGrid />;
};

