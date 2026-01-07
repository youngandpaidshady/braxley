"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const CEOSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Image saturation animation (0 = grayscale, 1 = full color)
  const saturation = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={containerRef}
      id="ceo"
      className="py-20 md:py-32 bg-background"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Text Content - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 leading-tight">
                We don&apos;t just build.
                <br />
                <span className="text-accent">We curate.</span>
              </h2>
            </div>

            <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
              <p>
                Every project begins with a vision—yours. My role is to
                translate that vision into reality, ensuring every detail,
                every finish, every moment of craftsmanship reflects the
                excellence you deserve.
              </p>
              <p>
                With over 15 years of hands-on experience, I&apos;ve learned that
                true remodeling isn&apos;t about following trends—it&apos;s about
                creating spaces that stand the test of time, both in quality
                and in design.
              </p>
              <p>
                When you work with Ivan Remodeling LLC, you&apos;re not just
                getting a contractor. You&apos;re getting a partner who treats
                your home with the same care and precision as if it were my own.
              </p>
            </div>

            {/* Animated Signature */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="pt-6 border-t border-border"
            >
              <IvanSignature />
            </motion.div>
          </motion.div>

          {/* Image - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl"
          >
            <motion.div
              className="absolute inset-0"
              style={{
                filter: useTransform(
                  saturation,
                  (sat) => `grayscale(${(1 - sat) * 100}%) saturate(${sat * 100}%)`
                ),
                opacity: imageOpacity,
              }}
            >
              <Image
                src="/img/ceo.jpg"
                alt="Ivan - Owner & Master Craftsman"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Animated Signature Component
const IvanSignature: React.FC = () => {
  return (
    <div className="relative">
      <motion.svg
        width="250"
        height="100"
        viewBox="0 0 250 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-accent"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Signature Path - "Ivan" styled signature */}
        <motion.path
          d="M20 60 Q35 40, 50 50 Q65 60, 80 55 Q95 50, 110 55 Q125 60, 140 50 Q155 40, 170 45 Q185 50, 200 55 Q215 60, 230 50"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 2.5,
            ease: "easeInOut",
            delay: 0.2,
          }}
        />
        {/* Decorative flourish */}
        <motion.path
          d="M230 50 Q235 45, 240 50"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
            delay: 2.7,
          }}
        />
      </motion.svg>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 3.5, duration: 0.5 }}
        className="text-sm text-muted-foreground mt-2 font-serif"
      >
        Ivan, Owner & Master Craftsman
      </motion.p>
    </div>
  );
};

