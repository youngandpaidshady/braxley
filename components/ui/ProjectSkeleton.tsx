"use client";

import React from "react";

export const ProjectSkeleton: React.FC = () => {
  return (
    <div className="w-full animate-pulse space-y-4">
      <div className="h-64 md:h-96 bg-muted rounded-2xl" />
      <div className="space-y-2">
        <div className="h-6 w-3/4 bg-muted rounded" />
        <div className="h-4 w-1/2 bg-muted rounded" />
      </div>
    </div>
  );
};

