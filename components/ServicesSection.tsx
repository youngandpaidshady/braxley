"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Home,
  Wrench,
  Paintbrush,
  Hammer,
  Bath,
  Square,
  ArrowRight,
} from "lucide-react";
import { Button } from "./ui/button";

const services = [
  {
    icon: Home,
    title: "Kitchen Remodeling",
    description:
      "Complete kitchen transformations with custom cabinetry, premium appliances, and modern design.",
  },
  {
    icon: Bath,
    title: "Bathroom Renovation",
    description:
      "Luxury bathroom upgrades including walk-in showers, custom vanities, and spa-like features.",
  },
  {
    icon: Square,
    title: "Room Additions",
    description:
      "Expand your living space with seamless room additions that match your home's existing style.",
  },
  {
    icon: Hammer,
    title: "Basement Finishing",
    description:
      "Transform unused basement space into functional living areas, home theaters, or guest suites.",
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
      "Full-service project management for complex renovations requiring multiple trades.",
  },
];

export const ServicesSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

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
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive remodeling solutions tailored to your vision and
            budget.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group bg-background rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-border hover:border-accent/50"
              >
                <div className="mb-4">
                  <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Icon className="h-7 w-7 text-accent" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {service.description}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="group-hover:text-accent"
                  asChild
                >
                  <a href="#contact">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

