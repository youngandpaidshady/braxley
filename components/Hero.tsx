"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { MagneticButton } from "./ui/magnetic-button";
import { ImagesSlider } from "./ui/images-slider";
import { SectionDivider } from "./ui/SectionDivider";

export const Hero: React.FC = () => {
  // Elite remodeling hero images - luxury interiors and architectural details
  const images = [
    "/img/hero/photo_2026-01-07_10-50-56.jpg",
    "/img/hero/photo_2026-01-07_10-51-05.jpg",
    "/img/hero/photo_2026-01-07_10-51-09.jpg",
  ];

  // Kinetic Typography: Magnetic hover effect for headline
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Track mouse position relative to headline
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!headlineRef.current) return;
      
      const rect = headlineRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
      );
      
      if (distance < 200) {
        setIsHovering(true);
        setMousePosition({
          x: e.clientX - centerX,
          y: e.clientY - centerY,
        });
      } else {
        setIsHovering(false);
        setMousePosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Variable Font Weight: Scroll-based weight transition
  const headlineRefScroll = useRef<HTMLHeadingElement>(null);
  const [fontWeight, setFontWeight] = useState(300); // Start with light weight

  useEffect(() => {
    const handleScroll = () => {
      if (!headlineRefScroll.current) return;
      
      const rect = headlineRefScroll.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementTop = rect.top;
      const elementCenter = elementTop + rect.height / 2;
      
      // Calculate progress: 0 when element center is at top, 1 when at viewport center
      const progress = Math.max(0, Math.min(1, 1 - (elementCenter / windowHeight)));
      
      // Interpolate from light (300) to bold (900)
      const weight = 300 + (progress * 600);
      setFontWeight(Math.round(weight));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Split headline into words for staggered animation - Dominant messaging
  const headline = "COMMANDING EXCELLENCE";
  const words = headline.split(" ");

  return (
    <section id="home" className="relative h-screen min-h-[100dvh] w-full overflow-hidden max-w-full">
      <ImagesSlider className="h-full" images={images} autoplay={true} direction="up">
        <motion.div
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="z-50 flex flex-col justify-center items-center px-4 sm:px-6 pt-20 sm:pt-32"
        >
          {/* Main Heading with Kinetic Typography - SEO Optimized */}
          <motion.h1
            ref={headlineRefScroll}
            className="font-serif text-3xl sm:text-5xl md:text-7xl lg:text-9xl leading-tight sm:leading-[0.9] tracking-tighter text-center text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary py-2 sm:py-4 overflow-hidden"
            style={{ 
              fontWeight: fontWeight,
              fontVariationSettings: `"wght" ${fontWeight}`,
            }}
            itemProp="headline"
          >
            <motion.span
              ref={headlineRef}
              className="inline-flex flex-wrap justify-center gap-x-4"
            >
              {words.map((word, index) => (
                <motion.span
                  key={`word-${index}-${word}`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </motion.span>
          </motion.h1>

          {/* Subtitle with Wipe Reveal - SEO Optimized */}
          <motion.p
            className="text-base sm:text-lg md:text-xl text-neutral-200 max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 leading-relaxed text-center px-4 relative overflow-hidden"
            itemProp="description"
          >
            {/* Text content with mask */}
            <motion.span
              className="inline-block relative"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{
                duration: 1.2,
                delay: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94], // Smooth architectural ease
              }}
          >
            We don&apos;t just build spaces—we command them. Enterprise-grade construction that sets the standard. Where others compromise, we dominate.
            </motion.span>
          </motion.p>

          {/* CTA Buttons - Optimized for Mobile & SEO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full max-w-2xl mx-auto px-4"
          >
            <MagneticButton strength={0.25} className="w-full sm:w-auto flex justify-center">
              <Button
                variant="default"
                size="lg"
                className="min-h-[48px] sm:min-h-[56px] text-sm sm:text-base md:text-lg px-6 sm:px-8 py-4 sm:py-5 md:py-6 group w-full sm:w-auto rounded-full backdrop-blur-sm bg-primary/90 hover:bg-primary border border-primary/20 font-semibold shadow-lg"
                asChild
              >
                <Link 
                  href="/#contact"
                  aria-label="Get your free remodeling quote - Contact Braxley Nevim Elite Remodeling"
                  title="Get Your Free Quote - Contact Us Today"
                >
                  <span className="flex items-center justify-center">
                  Get Your Free Quote
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 text-primary transition-transform group-hover:translate-x-1 flex-shrink-0" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                </Link>
              </Button>
            </MagneticButton>
            <MagneticButton strength={0.25} className="w-full sm:w-auto flex justify-center">
              <Button
                variant="outline"
                size="lg"
                className="min-h-[48px] sm:min-h-[56px] text-sm sm:text-base md:text-lg px-6 sm:px-8 py-4 sm:py-5 md:py-6 w-full sm:w-auto rounded-full backdrop-blur-sm bg-white/10 hover:bg-white/20 border-white/30 text-white font-semibold shadow-lg"
                asChild
              >
                <a 
                  href="tel:+1234567890"
                  aria-label="Call Braxley Nevim Elite Remodeling now for a free consultation"
                  title="Call Now - Free Consultation"
                  itemProp="telephone"
                >
                  <span className="flex items-center justify-center">
                    <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" strokeWidth={1.5} aria-hidden="true" />
                  Call Now
                  </span>
                </a>
              </Button>
            </MagneticButton>
          </motion.div>

          {/* Bronze Accent Underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent w-3/4 mx-auto"
          />
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-3 bg-primary rounded-full"
            />
          </motion.div>
        </motion.div>
      </ImagesSlider>

      {/* Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <SectionDivider variant="architectural" />
      </div>
    </section>
  );
};
