"use client";

import React from "react";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";
import { motion } from "framer-motion";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  title?: string;
  description?: string;
  className?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  title,
  description,
  className,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <div className="relative rounded-lg overflow-hidden shadow-2xl">
        <ReactCompareSlider
          itemOne={
            <ReactCompareSliderImage
              src={beforeImage}
              alt="Before"
              style={{ objectFit: "cover" }}
            />
          }
          itemTwo={
            <ReactCompareSliderImage
              src={afterImage}
              alt="After"
              style={{ objectFit: "cover" }}
            />
          }
          position={50}
          className="w-full h-[400px] sm:h-[500px] md:h-[600px]"
          style={{
            filter: "contrast(1.05) saturate(1.1)",
          }}
        />
        
        {/* Labels */}
        <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-md">
          <span className="text-sm font-semibold text-muted-foreground">BEFORE</span>
        </div>
        <div className="absolute top-4 right-4 bg-accent/90 backdrop-blur-sm px-4 py-2 rounded-md">
          <span className="text-sm font-semibold text-accent-foreground">AFTER</span>
        </div>

        {/* Title and Description Overlay (Optional) */}
        {(title || description) && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            {title && (
              <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            )}
            {description && (
              <p className="text-white/90 text-sm">{description}</p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

