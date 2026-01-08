"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Small delay for smooth entrance
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "true");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-[100] border-t-2 border-primary bg-background/95 backdrop-blur shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] p-6"
        >
          <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <h4 className="font-serif text-lg font-medium text-foreground">
                Site Protocols
              </h4>
              <p className="text-sm text-muted-foreground max-w-2xl">
                We use digital cookies to analyze site traffic and optimize your architectural experience. By continuing, you agree to our privacy standards.
              </p>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <Button 
                variant="ghost" 
                onClick={() => setIsVisible(false)}
                className="flex-1 md:flex-none rounded-sm"
              >
                Decline
              </Button>
              <Button 
                onClick={accept} 
                className="flex-1 md:flex-none rounded-sm bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Acknowledge & Accept
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

