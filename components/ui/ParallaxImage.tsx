"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
  width?: number;
  height?: number;
}

export const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  alt,
  className,
  containerClassName,
  priority = false,
  sizes,
  fill = false,
  width,
  height,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect: image moves slower than scroll
  // More pronounced parallax for cinematic effect
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.05, 1.15]);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", containerClassName)}
    >
      <motion.div
        style={{ y, scale }}
        className="w-full h-full"
      >
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            className={cn("object-cover", className)}
            priority={priority}
            sizes={sizes || "100vw"}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width || 1200}
            height={height || 800}
            className={cn("w-full h-full object-cover", className)}
            priority={priority}
            sizes={sizes}
          />
        )}
      </motion.div>
    </div>
  );
};

