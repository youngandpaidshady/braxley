"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowRight, Phone, Play, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { SectionDivider } from "./ui/SectionDivider";

/**
 * AntigravityHero - Level 5 Cinematic Hero Section
 * 
 * Features:
 * - Video/Image background with parallax (50% speed)
 * - Magnetic buttons with cursor attraction
 * - Staggered cinematic text reveals
 * - Glassmorphism CTAs
 * - Scroll-based opacity fade
 */
export const AntigravityHero: React.FC = () => {
    const [mounted, setMounted] = useState(false);
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Parallax effect - background moves at 50% speed
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, 500]); // 50% parallax
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);
    const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

    // Smooth spring for parallax
    const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

    // Magnetic button effect
    const magneticX = useMotionValue(0);
    const magneticY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distX = (e.clientX - centerX) * 0.3;
        const distY = (e.clientY - centerY) * 0.3;

        magneticX.set(distX);
        magneticY.set(distY);
    };

    const handleMouseLeave = () => {
        magneticX.set(0);
        magneticY.set(0);
    };

    // Hero images/video
    const heroMedia = "/img/hero/photo_2026-01-07_10-50-56.jpg";

    // Prevent hydration mismatch
    if (!mounted) {
        return (
            <section id="home" className="relative h-screen min-h-[100dvh] w-full overflow-hidden bg-background">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
            </section>
        );
    }

    // Staggered animation variants
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    const scaleVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    return (
        <section
            ref={containerRef}
            id="home"
            className="relative h-screen min-h-[100dvh] w-full overflow-hidden bg-background"
        >
            {/* 1. Parallax Background Layer */}
            <motion.div
                style={{ y: smoothY, scale }}
                className="absolute inset-0 z-0"
            >
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url('${heroMedia}')` }}
                />

                {/* Gradient Overlays for Depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/60 to-slate-900" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 via-transparent to-slate-900/50" />

                {/* Noise Texture Overlay */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }} />
            </motion.div>

            {/* 2. Content Layer - Cinematic Reveals */}
            <motion.div
                style={{ opacity }}
                className="relative z-10 flex h-full flex-col items-center justify-center px-4 sm:px-6 text-center"
            >
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-5xl mx-auto"
                >
                    {/* Elite Label */}
                    <motion.div variants={itemVariants} className="mb-6">
                        <span className="inline-block px-4 py-2 text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-gold border border-gold/30 bg-gold/5 backdrop-blur-sm rounded-full">
                            Est. 2011 • Elite Construction
                        </span>
                    </motion.div>

                    {/* Main Headline - Oswald Display */}
                    <motion.h1
                        variants={scaleVariants}
                        className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold uppercase leading-[0.9] text-foreground mb-6"
                        itemProp="headline"
                    >
                        <span className="block">Build</span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-300 to-white">
                            Beyond
                        </span>
                        <span className="block text-gradient-gold">The Blueprint</span>
                    </motion.h1>

                    {/* Subtext - Manrope Body */}
                    <motion.p
                        variants={itemVariants}
                        className="mt-4 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-muted-foreground body-text leading-relaxed"
                        itemProp="description"
                    >
                        Specializing in Institutional Scale: <span className="text-gold font-semibold">Stadiums</span>, <span className="text-gold font-semibold">Hospitals</span>, & <span className="text-gold font-semibold">Luxury Resorts</span>.
                    </motion.p>

                    {/* CTA Buttons - Glassmorphism + Magnetic */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center"
                    >
                        {/* Primary CTA - Glass Button */}
                        <motion.div
                            style={{ x: magneticX, y: magneticY }}
                            className="w-full sm:w-auto"
                        >
                            <Button
                                size="lg"
                                className="w-full sm:w-auto min-h-[56px] px-8 py-4 rounded-full glass-card-xl text-white font-bold uppercase tracking-widest text-sm hover:bg-white/10 hover:border-gold transition-all duration-300 magnetic-btn"
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                asChild
                            >
                                <Link href="/#portfolio" className="flex items-center justify-center gap-3">
                                    <Play className="h-4 w-4 fill-current" />
                                    View Portfolio
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
                        </motion.div>

                        {/* Secondary CTA */}
                        <Button
                            variant="outline"
                            size="lg"
                            className="w-full sm:w-auto min-h-[56px] px-8 py-4 rounded-full border-gold/50 bg-gold/10 backdrop-blur-md hover:bg-gold/20 text-white font-bold uppercase tracking-widest text-sm transition-all duration-300"
                            asChild
                        >
                            <a href="tel:+17743475579" className="flex items-center justify-center gap-3">
                                <Phone className="h-4 w-4" />
                                Call Now
                            </a>
                        </Button>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* 3. Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
            >
                <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-2 text-muted-foreground"
                >
                    <span className="text-xs uppercase tracking-widest">Scroll</span>
                    <ChevronDown className="h-5 w-5" />
                </motion.div>
            </motion.div>

            {/* 4. Section Divider */}
            <div className="absolute bottom-0 left-0 right-0 z-10">
                <SectionDivider variant="architectural" />
            </div>
        </section>
    );
};

export default AntigravityHero;
