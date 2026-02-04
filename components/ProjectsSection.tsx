"use client";

import React from "react";
import { motion } from "framer-motion";
import { BeforeAfterSlider } from "./BeforeAfterSlider";

const projects = [
  {
    id: "1",
    title: "Modern Kitchen Transformation",
    description: "Complete kitchen renovation with custom cabinetry and premium appliances",
    beforeImage: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&h=800&fit=crop&q=80",
    afterImage: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200&h=800&fit=crop&q=80",
  },
  {
    id: "2",
    title: "Luxury Master Bathroom",
    description: "Spa-inspired bathroom with walk-in shower and freestanding tub",
    beforeImage: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1200&h=800&fit=crop&q=80",
    afterImage: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1200&h=800&fit=crop&q=80",
  },
  {
    id: "3",
    title: "Open Concept Living Space",
    description: "Removed walls to create a bright, airy family room",
    beforeImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop&q=80",
    afterImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop&q=80",
  },
];

export const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="py-12 md:py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-extrabold text-foreground mb-4 tracking-tight">
            Our Recent Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See the transformation. Drag the slider to experience the before and
            after of our craftsmanship.
          </p>
        </motion.div>

        <div className="space-y-16 md:space-y-24">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="max-w-5xl mx-auto">
                <div className="mb-6 text-center">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground">{project.description}</p>
                </div>
                <BeforeAfterSlider
                  beforeImage={project.beforeImage}
                  afterImage={project.afterImage}
                  className="w-full"
                />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

