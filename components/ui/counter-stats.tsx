"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

interface CounterStatProps {
  end: number;
  suffix?: string;
  label: string;
}

const CounterStat: React.FC<CounterStatProps> = ({ end, suffix = "", label }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(end);
    }
  }, [isInView, end, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(Math.round(latest));
    });

    return () => unsubscribe();
  }, [springValue]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-center"
    >
      <div className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-primary mb-2">
        {displayValue}
        {suffix}
      </div>
      <div className="text-sm md:text-base text-muted-foreground font-sans uppercase tracking-wider">
        {label}
      </div>
    </motion.div>
  );
};

interface CounterStatsSectionProps {
  className?: string;
}

export const CounterStats: React.FC<CounterStatsSectionProps> = ({ className }) => {
  const stats = [
    { end: 15, suffix: "+", label: "Years Experience" },
    { end: 200, suffix: "+", label: "Projects Completed" },
    { end: 100, suffix: "%", label: "Client Satisfaction" },
  ];

  return (
    <section className={`py-20 md:py-32 bg-background ${className || ""}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <CounterStat
              key={index}
              end={stat.end}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

