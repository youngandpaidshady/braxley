"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Phone, Award, Building2, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { MagneticButton } from "./ui/magnetic-button";
import { SectionDivider } from "./ui/SectionDivider";
import { ImagesSlider } from "./ui/images-slider";

export const Hero: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Parallax effect for background
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  // Hero images - Premium architecture
  const heroImages = [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80&fit=crop",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80&fit=crop",
    "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920&q=80&fit=crop",
  ];

  // Loading state
  if (!mounted) {
    return (
      <section id="home" className="relative h-screen min-h-[100dvh] w-full overflow-hidden bg-background">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="relative h-screen min-h-[100dvh] w-full overflow-hidden bg-background">
      {/* Background Image Slider */}
      <motion.div style={{ y: y1, opacity }} className="absolute inset-0 z-0">
        <ImagesSlider
          images={heroImages}
          autoplay={true}
          direction="up"
          overlay={true}
          overlayClassName="bg-gradient-to-t from-black/90 via-black/60 to-black/30"
        >
          {null}
        </ImagesSlider>
      </motion.div>

      {/* Animated Grid Pattern Overlay */}
      <div className="absolute inset-0 z-[1] opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(197, 160, 89, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(197, 160, 89, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />
      </div>

      {/* Floating Decorative Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute top-20 right-10 md:right-20 z-[1]"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="w-32 h-32 md:w-48 md:h-48 border border-primary/30 rounded-full"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 2, delay: 0.8 }}
        className="absolute bottom-40 left-10 md:left-20 z-[1]"
      >
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 md:w-36 md:h-36 border border-primary/20"
          style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
        />
      </motion.div>

      {/* Glowing Orb Effect - Pulsing */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 z-[1] w-[600px] h-[600px] pointer-events-none"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-primary/10 rounded-full blur-[120px]"
        />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">

        {/* Elite Label */}
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0, duration: 0.8 }}
          className="mb-6 text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-primary"
        >
          Est. 2011 • Braxley Nevim Elite
        </motion.span>

        {/* Main Headline - More Dynamic */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black uppercase leading-[0.9] text-white"
          itemProp="headline"
        >
          <motion.span
            className="block"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Build{" "}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-yellow-400 to-primary animate-gradient bg-[length:200%_auto]">
                Beyond
              </span>
              {/* Underline accent */}
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-primary to-transparent origin-left"
              />
            </span>
          </motion.span>
          <motion.span
            className="block mt-2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <span className="text-primary drop-shadow-[0_0_40px_rgba(199,162,87,0.6)]">
              The Blueprint
            </span>
          </motion.span>
        </motion.h1>

        {/* Subtext - Redesigned */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-8 max-w-2xl"
        >
          <p className="text-lg sm:text-xl md:text-2xl font-light text-white/90 leading-relaxed">
            Crafting{" "}
            <span className="text-primary font-medium">institutional-scale</span>{" "}
            masterpieces — from world-class stadiums to luxury resorts
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex items-center justify-center gap-6 mt-4 text-sm text-white/60"
          >
            <motion.span
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <motion.span
                animate={{ scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                className="w-1.5 h-1.5 bg-primary rounded-full"
              />
              Stadiums
            </motion.span>
            <motion.span
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <motion.span
                animate={{ scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="w-1.5 h-1.5 bg-primary rounded-full"
              />
              Hospitals
            </motion.span>
            <motion.span
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <motion.span
                animate={{ scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="w-1.5 h-1.5 bg-primary rounded-full"
              />
              Luxury Resorts
            </motion.span>
          </motion.div>
        </motion.div>

        {/* CTA Buttons - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 items-center"
        >
          <MagneticButton strength={0.25} className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="min-h-[56px] text-sm sm:text-base px-10 py-5 group w-full sm:w-auto rounded-none border-2 border-white bg-transparent hover:bg-white hover:text-black text-white font-bold uppercase tracking-wider transition-all duration-300 relative overflow-hidden"
              asChild
            >
              <Link href="/projects" title="View Portfolio">
                <span className="relative z-10 flex items-center justify-center gap-3">
                  View Portfolio
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
                </span>
              </Link>
            </Button>
          </MagneticButton>

          <MagneticButton strength={0.25} className="w-full sm:w-auto">
            <Button
              variant="default"
              size="lg"
              className="min-h-[56px] text-sm sm:text-base px-10 py-5 w-full sm:w-auto rounded-none border-2 border-primary bg-primary hover:bg-primary/90 text-black font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_30px_rgba(197,160,89,0.4)] hover:shadow-[0_0_50px_rgba(197,160,89,0.6)]"
              asChild
            >
              <a href="tel:+17743475579" title="Call Now">
                <span className="flex items-center justify-center gap-3">
                  <Phone className="h-5 w-5" strokeWidth={2} />
                  Call Now
                </span>
              </a>
            </Button>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll Indicator - Enhanced */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-3"
      >
        <span className="text-xs text-white/40 uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-3 bg-primary rounded-full"
          />
        </motion.div>
      </motion.div>

      {/* Side Accent Lines */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: '30%' }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute left-8 top-1/3 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent z-20 hidden lg:block"
      />
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: '30%' }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute right-8 top-1/3 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent z-20 hidden lg:block"
      />

      {/* Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <SectionDivider variant="architectural" />
      </div>
    </section>
  );
};
