"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface CounterStatProps {
  end: number;
  suffix?: string;
  label: string;
  duration?: number;
}

const CounterStat: React.FC<CounterStatProps> = ({
  end,
  suffix = "",
  label,
  duration = 2000
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.round(easeOut * end);

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, end, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="text-center px-6 md:px-10"
    >
      <div className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-gold mb-2 tracking-tight">
        {count}
        <span className="text-gold">{suffix}</span>
      </div>
      <div className="text-sm md:text-base text-muted-foreground uppercase tracking-[0.15em] body-text">
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
    <section className={`py-16 md:py-24 bg-background relative overflow-hidden ${className || ""}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Stats Strip - Top Border Only */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16 lg:gap-24 max-w-5xl mx-auto pt-10 border-t border-gold/50">
          {stats.map((stat, index) => (
            <CounterStat
              key={index}
              end={stat.end}
              suffix={stat.suffix}
              label={stat.label}
              duration={2000}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CounterStats;
