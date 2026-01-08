"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const MeetBraxley: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section id="ceo" className="py-12 md:py-20 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="max-w-4xl mx-auto block"
        >
          <div className="block overflow-hidden">
            {/* Heading */}
            <motion.div variants={itemVariants} className="mb-12">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-2">
                Meet Our CEO
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground">
                The Vision Behind Excellence.
              </h2>
            </motion.div>

            {/* CEO Image with Caption */}
            <motion.div
              variants={itemVariants}
              className="float-left w-[150px] mr-6 mb-4 md:w-[320px] md:mr-12 md:mb-8 border border-border p-1 bg-card"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/img/ceo.jpg"
                  alt="Braxley Nevim - Founder & CEO"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 150px, 320px"
                />
              </div>
              {/* Signature Area */}
              <div className="mt-3 pt-2 border-t border-primary/40 flex flex-col gap-0.5">
                <p className="font-serif italic text-sm text-foreground">Braxley Nevim</p>
                <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-primary font-bold">
                  Founder & CEO
                </p>
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div variants={itemVariants} className="text-foreground">
              <p className="text-lg leading-relaxed mb-6 first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-primary">
                With over two decades of experience in luxury residential construction,
                Braxley Nevim has built a reputation for uncompromising quality and
                attention to detail. His journey began as an apprentice carpenter,
                where he developed a deep appreciation for the craft of building.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Today, Braxley leads a team of elite craftsmen who share his passion
                for transforming spaces into works of art. Every project undertaken
                by Braxley Nevim Elite Remodeling reflects his commitment to
                excellence and his belief that a home should be both beautiful and
                functional.
              </p>
              <p className="text-lg leading-relaxed">
                &ldquo;We don&apos;t just build homes,&rdquo; Braxley often says.
                &ldquo;We create legacies that families will cherish for
                generations.&rdquo;
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
