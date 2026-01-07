"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ImageWithSkeletonProps extends ImageProps {
  containerClassName?: string;
  skeletonClassName?: string;
}

export const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({
  containerClassName,
  skeletonClassName,
  className,
  ...imageProps
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setIsError(true);
  };

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {/* Skeleton Loading State */}
      <AnimatePresence>
        {isLoading && !isError && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
              "absolute inset-0 bg-muted animate-pulse",
              skeletonClassName
            )}
          />
        )}
      </AnimatePresence>

      {/* Actual Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full h-full"
      >
        <Image
          {...imageProps}
          alt={imageProps.alt || ""}
          className={className}
          onLoad={handleLoad}
          onError={handleError}
        />
      </motion.div>

      {/* Error State (optional fallback) */}
      {isError && (
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          <span className="text-muted-foreground text-sm" aria-label="Image failed to load">
            Failed to load image
          </span>
        </div>
      )}
    </div>
  );
};

