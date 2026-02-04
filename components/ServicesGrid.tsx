"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ChefHat,
  BedDouble,
  Scaling,
  Landmark,
  Trees,
  Building2,
  LucideIcon,
  ArrowRight,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  imageUrl: string;
}

const services: Service[] = [
  {
    icon: ChefHat,
    title: "Culinary Environments",
    description:
      "Beyond simple kitchens. We engineer chef-grade workspaces with integrated smart technology, custom walnut cabinetry, and quartzite surfacing.",
    imageUrl:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: BedDouble,
    title: "Master Suite Sanctuaries",
    description:
      "Hotel-inspired living. Heated flooring, steam room integration, and acoustic isolation for the ultimate private retreat.",
    imageUrl:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=800&fit=crop&q=80",
  },
  {
    icon: Scaling,
    title: "Structural Additions",
    description:
      "Seamless expansion. We handle complex zoning, architectural matching, and structural reinforcement to add value without compromising integrity.",
    imageUrl:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=800&fit=crop&q=80",
  },
  {
    icon: Landmark,
    title: "Historic Restoration",
    description:
      "Preservation meets performance. We restore period details while retrofitting modern electrical, HVAC, and insulation systems behind the walls.",
    imageUrl:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&h=800&fit=crop&q=80",
  },
  {
    icon: Trees,
    title: "Exterior Architecture",
    description:
      "Curb appeal engineering. Hardscaping, sustainable decking, and impact-rated fenestration that redefines your home's facade.",
    imageUrl:
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=800&h=800&fit=crop&q=80",
  },
  {
    icon: Building2,
    title: "Commercial Build-Outs",
    description:
      "Brand-aligned construction. From boutique retail to executive offices, we deliver timelines that respect your business goals.",
    imageUrl:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=800&fit=crop&q=80",
  },
];

/* ========================================
   SERVICE CARD
   ======================================== */
interface ServiceCardProps {
  service: Service;
  onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = service.icon;

  return (
    <div
      className="relative w-[280px] md:w-[300px] h-[320px] flex-shrink-0 rounded-xl overflow-hidden cursor-pointer bg-white dark:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={service.imageUrl}
          alt={service.title}
          fill
          className={cn(
            "object-cover transition-transform duration-300 ease-out",
            isHovered ? "scale-105" : "scale-100"
          )}
          sizes="300px"
          priority
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 p-5 flex flex-col justify-end">
        {/* Icon */}
        <div className="w-12 h-12 rounded-lg bg-gold/20 backdrop-blur-sm flex items-center justify-center mb-4">
          <Icon className="h-6 w-6 text-gold" />
        </div>

        {/* Title */}
        <h3 className="font-display text-lg font-bold uppercase text-white mb-2">
          {service.title}
        </h3>

        {/* Explore Link */}
        <div
          className={cn(
            "flex items-center gap-2 text-sm font-semibold text-gold transition-transform duration-300",
            isHovered ? "translate-x-2" : ""
          )}
        >
          Explore
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>

      {/* Hover Border */}
      <div
        className={cn(
          "absolute inset-0 rounded-xl border pointer-events-none transition-colors duration-300",
          isHovered ? "border-gold" : "border-white/10"
        )}
      />
    </div>
  );
};

/* ========================================
   SERVICE MODAL
   ======================================== */
interface ServiceModalProps {
  service: Service | null;
  onClose: () => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose }) => {
  if (!service) return null;
  const Icon = service.icon;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-xl"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-lg bg-muted rounded-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image */}
          <div className="relative h-48">
            <Image
              src={service.imageUrl}
              alt={service.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-800 to-transparent" />
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gold/20 flex items-center justify-center">
                <Icon className="h-6 w-6 text-gold" />
              </div>
              <h3 className="font-display text-2xl font-bold uppercase text-foreground">
                {service.title}
              </h3>
            </div>
            <p className="text-muted-foreground body-text leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-foreground hover:text-gold transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* ========================================
   SERVICES SECTION - Smooth Native Scroll
   ======================================== */
export const ServicesGrid: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <section id="services" className="py-20 md:py-28 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-12"
        >
          <span className="inline-block px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-gold border border-gold/30 bg-gold/5 backdrop-blur-sm rounded-full mb-4">
            Our Services
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase text-foreground">
            What We Build
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mt-4 body-text">
            Comprehensive remodeling solutions tailored to your vision and budget.
          </p>
        </motion.div>
      </div>

      {/* Smooth Scroll Container */}
      <div className="relative">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-12 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        {/* Scrollable Track */}
        <div
          className="flex gap-5 px-4 sm:px-6 lg:px-8 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing scroll-smooth"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="flex-shrink-0"
            >
              <ServiceCard
                service={service}
                onClick={() => setSelectedService(service)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
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

export const ServicesSection = ServicesGrid;
export default ServicesGrid;
