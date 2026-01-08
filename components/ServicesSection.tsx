"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building2, Zap, Ruler, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Structural Engineering",
    desc: "Precision-led seismic analysis and heavy-load structural retrofitting for commercial sectors.",
    icon: Building2,
    className: "md:col-span-4 md:row-span-2",
    code: "STR-26"
  },
  {
    title: "Eco-Compliance",
    desc: "LEED pathing and carbon-neutral building strategies.",
    icon: Zap,
    className: "md:col-span-2 md:row-span-1",
    code: "ECO-04"
  },
  {
    title: "BIM Modeling",
    desc: "Full-scale 3D digital twins for clash detection.",
    icon: Ruler,
    className: "md:col-span-2 md:row-span-1",
    code: "BIM-09"
  }
];

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-background overflow-hidden">
      <div className="container px-4">
        <div className="mb-12 border-l-2 border-primary pl-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary font-bold">Capabilities</p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground">Our Mandates.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-[220px]">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
              className={cn(
                "group relative p-8 border border-primary/40 bg-card hover:border-primary transition-all duration-500",
                i === 0 && "border-l-4 border-primary", // Featured card gets left border
                s.className
              )}
            >
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <s.icon className="w-10 h-10 text-primary" strokeWidth={1.5} />
                    <span className="font-mono text-[10px] text-primary font-bold">{s.code}</span>
                  </div>
                  <h3 className="font-serif text-3xl mb-4 group-hover:text-primary transition-colors text-foreground">
                    {s.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed max-w-xs">{s.desc}</p>
                </div>
                <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="text-primary w-6 h-6" strokeWidth={1.5} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
