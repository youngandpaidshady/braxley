"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { HeroTextMask } from "./HeroTextMask";
import { TextReveal } from "./ui/TextReveal";
import { SectionDivider } from "./ui/SectionDivider";

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Transform scroll progress to mask reveal
  const maskProgress = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]); // Parallax effect
  
  // Clip path for mask overlay - must be defined unconditionally
  const maskClipPath = useTransform(
    maskProgress,
    (progress) =>
      `polygon(0 0, 100% 0, 100% ${100 - progress * 100}%, 0 ${100 - progress * 100}%)`
  );

  // Split text into characters for mask effect
  const text = "REDEFINING SPACES";
  const characters = text.split("");

  return (
    <section
      ref={containerRef}
      id="home"
      className={cn(
        "relative h-[100dvh] w-full overflow-hidden max-w-full",
        "flex items-center justify-center"
      )}
    >
      {/* Video/Image Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          y: isMobile ? undefined : videoY, // Disable parallax on mobile
        }}
      >
        {/* Hero Background Image */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/50 to-background">
          <Image
            src="https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1920&h=1080&fit=crop&q=80"
            alt="Fine craftsmanship and construction"
            fill
            className="object-cover opacity-40"
            priority
            sizes="100vw"
          />
        </div>
      </motion.div>

      {/* White Mask Overlay (Desktop only) */}
      {!isMobile && (
        <motion.div
          className="absolute inset-0 z-10 bg-background"
          style={{
            clipPath: maskClipPath,
          }}
        />
      )}

      {/* Text Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Heading with Character-by-Character Mask Effect (Desktop) */}
          {!isMobile ? (
            <HeroTextMask
              text={text}
              maskProgress={maskProgress}
              textOpacity={textOpacity}
            />
          ) : (
            // Mobile: Text reveal animation
            <div className="mb-6">
              <TextReveal
                text="REDEFINING SPACES"
                as="h1"
                className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-foreground leading-tight drop-shadow-lg"
                splitBy="words"
                stagger={0.08}
              />
            </div>
          )}

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className={cn(
              "text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed",
              !isMobile && "drop-shadow-lg"
            )}
          >
            Ivan Remodeling LLC brings elite craftsmanship to{" "}
            <span className="font-semibold text-primary">[City Name]</span>
            &apos;s most demanding residential projects.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center w-full sm:w-auto"
          >
            <Button
              variant="default"
              size="lg"
              className="text-lg px-8 py-6 group w-full sm:w-auto rounded-full"
              asChild
            >
              <a href="#contact">
                Get Your Free Quote
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className={cn(
                "text-lg px-8 py-6 w-full sm:w-auto rounded-full",
                !isMobile && "bg-background/80 backdrop-blur-sm"
              )}
              asChild
            >
              <a href="tel:+1234567890">
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </a>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-6 h-10 border-2 border-foreground/50 rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1 h-3 bg-accent rounded-full"
          />
        </motion.div>
      </motion.div>

      {/* Section Divider - Smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <SectionDivider variant="architectural" />
      </div>
    </section>
  );
};
