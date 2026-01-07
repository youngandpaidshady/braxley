"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, PanInfo, MotionValue } from "framer-motion";
import Image from "next/image";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface BeforeAfterProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  height?: string | number;
}

export const BeforeAfter: React.FC<BeforeAfterProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  className,
  height = "600px",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Position of the slider (0 to 1)
  const sliderPosition = useMotionValue(0.5);
  
  // Spring physics for smooth, heavy feel
  const springConfig = { stiffness: 300, damping: 30 };
  const smoothPosition = useSpring(sliderPosition, springConfig);

  // Update container width on mount and resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Convert position (0-1) to pixels
  const sliderX = useTransform(smoothPosition, (pos) => pos * containerWidth);
  
  // Clip path for after image - transforms position to CSS clip-path
  const clipPathValue = useTransform(
    smoothPosition,
    (pos) => `inset(0 ${100 - pos * 100}% 0 0)`
  );

  const handleDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const newX = info.point.x - rect.left;
    const clampedX = Math.max(0, Math.min(rect.width, newX));
    const newPosition = clampedX / rect.width;
    
    sliderPosition.set(newPosition);
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full overflow-hidden rounded-lg bg-secondary/50", className)}
      style={{ height }}
    >
      {/* Before Image (Background) */}
      <div className="absolute inset-0">
        <Image
          src={beforeImage}
          alt={beforeLabel}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* After Image (Clipped) */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{
          clipPath: clipPathValue,
        }}
      >
        <Image
          src={afterImage}
          alt={afterLabel}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {/* Slider Handle */}
      <motion.div
        drag="x"
        dragConstraints={containerRef}
        dragElastic={0}
        onDrag={handleDrag}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        style={{
          x: sliderX,
        }}
        className="absolute top-0 bottom-0 w-1 cursor-grab active:cursor-grabbing z-10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Handle Line */}
        <div className="absolute inset-0 w-full bg-background/80 backdrop-blur-sm" />
        
        {/* Handle Circle */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background border-2 border-accent shadow-lg flex items-center justify-center"
          animate={{
            scale: isDragging ? 1.1 : 1,
            boxShadow: isDragging
              ? "0 0 20px hsl(var(--accent) / 0.5)"
              : "0 4px 12px rgba(0, 0, 0, 0.15)",
          }}
          transition={{ duration: 0.2 }}
        >
          <GripVertical className="h-5 w-5 text-accent" />
        </motion.div>
      </motion.div>

      {/* Labels */}
      <div className="absolute top-4 left-4 px-4 py-2 rounded-md bg-background/90 backdrop-blur-sm border border-border">
        <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          {beforeLabel}
        </span>
      </div>
      <div className="absolute top-4 right-4 px-4 py-2 rounded-md bg-accent/90 backdrop-blur-sm border border-accent">
        <span className="text-sm font-semibold text-accent-foreground uppercase tracking-wide">
          {afterLabel}
        </span>
      </div>
    </div>
  );
};

