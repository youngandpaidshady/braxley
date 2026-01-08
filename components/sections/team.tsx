"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const TEAM = [
  { 
    name: "Marcus Thorne", 
    role: "Operations Director", 
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=3387&auto=format&fit=crop" 
  },
  { 
    name: "Sarah Jenkins", 
    role: "Lead Architect", 
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=3388&auto=format&fit=crop" 
  }
];

export function TeamSection() {
  return (
    <section className="relative z-10 py-24 bg-background border-t border-primary/40 block overflow-visible">
      <div className="container px-4 max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-2">Personnel</p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground">Meet Our Team.</h2>
        </div>

        {/* Scrollable Container */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 lg:grid lg:grid-cols-2 lg:overflow-visible lg:gap-8">
          {TEAM.map((member, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="min-w-[85vw] md:min-w-[450px] lg:min-w-0 snap-center group flex-shrink-0"
            >
              <div className="relative aspect-[4/5] mb-6 overflow-hidden border border-primary/40 bg-muted">
                <Image 
                  src={member.img} 
                  alt={member.name} 
                  fill 
                  className="object-cover transition-all duration-700" 
                  sizes="(max-width: 1024px) 85vw, 50vw"
                />
              </div>
              <h4 className="font-serif text-2xl mb-1 text-foreground">{member.name}</h4>
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary font-bold">
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
