"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";

interface ImageWithSkeletonProps extends Omit<ImageProps, "onLoad"> {
  containerClassName?: string;
}

export const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({
  containerClassName,
  className,
  alt,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={cn("relative", containerClassName)}>
      {isLoading && (
        <Skeleton className="absolute inset-0 z-10" />
      )}
      <Image
        alt={alt}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          className
        )}
        onLoad={() => setIsLoading(false)}
        {...props}
      />
    </div>
  );
};
