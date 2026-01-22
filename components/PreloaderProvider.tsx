"use client";

import React, { useState, useEffect } from "react";
import { Preloader } from "./Preloader";

export const PreloaderProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  // Start with content visible - only hide if JS loads and we should show preloader
  const [showPreloader, setShowPreloader] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
  };

  // Only show preloader on desktop after JS loads
  useEffect(() => {
    setIsClient(true);
    
    if (typeof window !== "undefined") {
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        setShowPreloader(false);
        return;
      }

      // Show preloader only on desktop
      setShowPreloader(true);

      // Fallback: Show content after 2 seconds even if preloader doesn't complete
      const timeout = setTimeout(() => {
        setShowPreloader(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, []);

  return (
    <>
      {isClient && showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      <div 
        className={showPreloader ? "opacity-0 invisible" : "opacity-100 visible"}
        style={{ 
          transition: "opacity 0.3s, visibility 0.3s",
        }}
      >
        {children}
      </div>
    </>
  );
};

