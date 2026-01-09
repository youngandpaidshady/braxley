"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import {
  ChefHat,
  BedDouble,
  Scaling,
  Landmark,
  Trees,
  Building2,
  LucideIcon,
} from "lucide-react";
import { TextReveal } from "./ui/TextReveal";
import { ServiceModal } from "./ui/service-modal";
import { ServiceCard } from "./ui/service-card";
import { cn } from "@/lib/utils";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  imageUrl: string;
  span?: "col-span-1" | "col-span-2";
}

const services: Service[] = [
  {
    icon: ChefHat,
    title: "Culinary Environments",
    description:
      "Beyond simple kitchens. We engineer chef-grade workspaces with integrated smart technology, custom walnut cabinetry, and quartzite surfacing.",
    imageUrl:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=3270&auto=format&fit=crop",
  },
  {
    icon: BedDouble,
    title: "Master Suite Sanctuaries",
    description:
      "Hotel-inspired living. Heated flooring, steam room integration, and acoustic isolation for the ultimate private retreat.",
    imageUrl:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=700&h=700&fit=crop&q=80",
  },
  {
    icon: Scaling,
    title: "Structural Additions",
    description:
      "Seamless expansion. We handle complex zoning, architectural matching, and structural reinforcement to add value without compromising integrity.",
    imageUrl:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=700&h=700&fit=crop&q=80",
  },
  {
    icon: Landmark,
    title: "Historic Restoration",
    description:
      "Preservation meets performance. We restore period details while retrofitting modern electrical, HVAC, and insulation systems behind the walls.",
    imageUrl:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=700&h=700&fit=crop&q=80",
  },
  {
    icon: Trees,
    title: "Exterior Architecture",
    description:
      "Curb appeal engineering. Hardscaping, sustainable decking, and impact-rated fenestration that redefines your home's facade.",
    imageUrl:
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=700&h=700&fit=crop&q=80",
  },
  {
    icon: Building2,
    title: "Commercial Build-Outs",
    description:
      "Brand-aligned construction. From boutique retail to executive offices, we deliver timelines that respect your business goals.",
    imageUrl:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=700&h=700&fit=crop&q=80",
  },
];


export const ServicesGrid: React.FC = () => {
  // Modal state
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Embla Carousel for mobile - optimized to prevent glitches
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    containScroll: "trimSnaps",
    watchDrag: true,
    skipSnaps: false,
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
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <TextReveal
            text="Our Services"
            as="h2"
            className="text-4xl md:text-5xl font-serif font-extrabold text-foreground mb-4 tracking-tight"
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
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onClick={() => setSelectedService(service)}
                    className="cursor-pointer"
                    style={{ 
                      WebkitTransform: 'translateZ(0)',
                      transform: 'translateZ(0)'
                    }}
                  >
                    <ServiceCard
                      title={service.title}
                      description={service.description}
                      icon={service.icon}
                      imageUrl={service.imageUrl}
                      onClick={() => setSelectedService(service)}
                    />
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots (Mobile only) */}
          <div className="mt-6 text-center">
            <div className="flex items-center justify-center gap-2">
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "size-1.5 rounded-full transition-all",
                    index === selectedIndex ? "bg-primary" : "bg-primary/35"
                  )}
                  onClick={() => scrollTo(index)}
                  aria-label={`Go to service ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={() => setSelectedService(service)}
              className="cursor-pointer"
            >
              <ServiceCard
                title={service.title}
                description={service.description}
                icon={service.icon}
                imageUrl={service.imageUrl}
                onClick={() => setSelectedService(service)}
              />
            </motion.div>
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
