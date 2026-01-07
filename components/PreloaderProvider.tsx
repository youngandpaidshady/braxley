"use client";

import React, { useState, useEffect } from "react";
import { Preloader } from "./Preloader";

export const PreloaderProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [showPreloader, setShowPreloader] = useState(true);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
  };

  return (
    <>
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      {children}
    </>
  );
};

