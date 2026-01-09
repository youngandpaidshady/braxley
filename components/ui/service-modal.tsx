"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, LucideIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "./button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  detailedDescription?: string;
  keyFeatures?: string[];
  imageUrl?: string;
}

interface ServiceModalProps {
  service: Service | null;
  onClose: () => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose }) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (service) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [service]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && service) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [service, onClose]);

  if (!service) return null;

  const Icon = service.icon;
  const defaultImageUrl =
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&h=600&fit=crop&q=80";
  const defaultFeatures = [
    "Premium materials and finishes",
    "Expert craftsmanship",
    "Timeline and budget transparency",
    "Comprehensive project management",
  ];

  return (
    <AnimatePresence>
      {service && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Mobile: Bottom Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 300,
            }}
            className={cn(
              "fixed bottom-0 left-0 right-0 z-50",
              "h-[85vh] rounded-t-3xl",
              "bg-background shadow-2xl",
              "overflow-hidden",
              "md:hidden" // Hide on desktop
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky Header (Mobile) */}
            <div className="sticky top-0 z-50 flex items-center justify-between bg-background/95 backdrop-blur-md px-6 py-4 border-b border-border">
              <h3 className="text-sm font-semibold text-foreground">Service Details</h3>
              <button
                onClick={onClose}
                className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-full px-4 py-2 text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                aria-label="Close modal"
              >
                Done
              </button>
            </div>

            {/* Scrollable Content (Mobile) */}
            <div className="overflow-y-auto h-full pb-32">
              {/* Hero Image Section */}
              <div className="relative h-[250px] w-full overflow-hidden">
                <Image
                  src={service.imageUrl || defaultImageUrl}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-primary/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-primary/30">
                      <Icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
                    </div>
                  </div>
                  <h2 className="text-3xl font-serif font-bold text-foreground">
                    {service.title}
                  </h2>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6">
                {/* Description */}
                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  {service.detailedDescription || service.description}
                </p>

                {/* Key Features */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    Key Features
                  </h3>
                  <ul className="space-y-3">
                    {(service.keyFeatures || defaultFeatures).map(
                      (feature, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-muted-foreground"
                        >
                          <span className="text-primary mt-1">•</span>
                          <span>{feature}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>

              {/* Sticky CTA Button (Mobile) - Fixed at bottom */}
              <div className="sticky bottom-0 left-0 right-0 p-6 bg-background/95 backdrop-blur-md border-t border-border z-10">
                <Button
                  variant="default"
                  size="lg"
                  className="w-full rounded-full py-6 text-base font-semibold"
                  asChild
                >
                  <Link
                    href="/#contact"
                    onClick={() => {
                      onClose();
                    }}
                  >
                    Get a Quote
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Desktop: Center Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
            }}
            className={cn(
              "fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none",
              "hidden md:flex" // Show only on desktop
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-3xl bg-background rounded-2xl overflow-hidden shadow-2xl pointer-events-auto max-h-[85vh] flex flex-col">
              {/* Hero Image Section */}
              <div className="relative h-[300px] w-full overflow-hidden flex-shrink-0">
                <Image
                  src={service.imageUrl || defaultImageUrl}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-primary/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-primary/30">
                      <Icon className="h-8 w-8 text-primary" strokeWidth={1.5} />
                    </div>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
                    {service.title}
                  </h2>
                </div>

                {/* Close Button (Desktop) */}
                <button
                  onClick={onClose}
                  className={cn(
                    "absolute top-4 right-4 md:top-6 md:right-6 z-10",
                    "w-10 h-10 md:w-11 md:h-11 min-w-[44px] min-h-[44px] rounded-full",
                    "bg-background/90 backdrop-blur-sm",
                    "border border-border",
                    "flex items-center justify-center",
                    "text-foreground hover:text-primary",
                    "hover:bg-background",
                    "transition-all duration-200",
                    "shadow-lg"
                  )}
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5 md:h-6 md:w-6" />
                </button>
              </div>

              {/* Scrollable Body Content (Desktop) */}
              <div className="overflow-y-auto flex-1">
                <div className="p-8">
                  {/* Description */}
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                    {service.detailedDescription || service.description}
                  </p>

                  {/* Key Features */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      Key Features
                    </h3>
                    <ul className="space-y-3">
                      {(service.keyFeatures || defaultFeatures).map(
                        (feature, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 text-muted-foreground"
                          >
                            <span className="text-primary mt-1">•</span>
                            <span>{feature}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <Button
                    variant="default"
                    size="lg"
                    className="w-full rounded-full py-6 text-lg font-semibold"
                    asChild
                  >
                    <Link
                      href="/#contact"
                      onClick={() => {
                        onClose();
                      }}
                    >
                      Get a Quote
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
