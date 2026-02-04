"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Quote, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/* ========================================
   TEAM CARD - Vertical Portrait (3:4)
   ======================================== */
interface TeamCardProps {
    name: string;
    role: string;
    imageUrl: string;
    className?: string;
}

export const TeamCard: React.FC<TeamCardProps> = ({
    name,
    role,
    imageUrl,
    className,
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className={cn(
                "relative w-[260px] md:w-[300px] overflow-hidden rounded-2xl",
                "aspect-[3/4]",
                className
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
        >
            {/* Image with Grayscale-to-Color */}
            <div className="absolute inset-0">
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    className={cn(
                        "object-cover transition-all duration-500",
                        isHovered ? "grayscale-0 scale-105" : "grayscale"
                    )}
                    sizes="300px"
                />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
                <motion.div
                    animate={{ y: isHovered ? -4 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <h3 className="font-display text-xl md:text-2xl font-bold uppercase text-foreground mb-1">
                        {name}
                    </h3>
                    <p className="text-sm font-semibold text-gold tracking-wide">
                        {role}
                    </p>
                </motion.div>
            </div>

            {/* Hover Border */}
            <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-gold/0 pointer-events-none"
                animate={{ borderColor: isHovered ? "rgba(197, 160, 89, 0.5)" : "rgba(197, 160, 89, 0)" }}
                transition={{ duration: 0.3 }}
            />
        </motion.div>
    );
};

/* ========================================
   SERVICE CARD - Bento Box Style
   ======================================== */
interface ServiceCardKineticProps {
    icon: LucideIcon;
    title: string;
    description?: string;
    onClick?: () => void;
    className?: string;
}

export const ServiceCardKinetic: React.FC<ServiceCardKineticProps> = ({
    icon: Icon,
    title,
    description,
    onClick,
    className,
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className={cn(
                "relative w-[280px] md:w-[320px] h-[200px] md:h-[240px]",
                "bg-muted/80 backdrop-blur-sm rounded-2xl p-6",
                "flex flex-col justify-between",
                "cursor-pointer",
                className
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
        >
            {/* Icon */}
            <motion.div
                animate={{ y: isHovered ? -4 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center"
            >
                <Icon className="h-7 w-7 text-gold" />
            </motion.div>

            {/* Title */}
            <div>
                <h3 className="font-display text-lg md:text-xl font-bold uppercase text-foreground mb-3">
                    {title}
                </h3>

                {/* Explore Link */}
                <motion.div
                    className="flex items-center gap-2 text-sm font-semibold text-gold"
                    animate={{ x: isHovered ? 8 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    Explore
                    <ArrowRight className="h-4 w-4" />
                </motion.div>
            </div>

            {/* Hover Border */}
            <motion.div
                className="absolute inset-0 rounded-2xl border pointer-events-none"
                animate={{
                    borderColor: isHovered ? "rgba(197, 160, 89, 1)" : "rgba(255, 255, 255, 0.05)",
                    borderWidth: isHovered ? "1px" : "1px"
                }}
                transition={{ duration: 0.3 }}
            />
        </motion.div>
    );
};

/* ========================================
   TESTIMONIAL CARD - Trust Style
   ======================================== */
interface TestimonialCardKineticProps {
    quote: string;
    author: string;
    role: string;
    company?: string;
    className?: string;
}

export const TestimonialCardKinetic: React.FC<TestimonialCardKineticProps> = ({
    quote,
    author,
    role,
    company,
    className,
}) => {
    return (
        <motion.div
            className={cn(
                "relative w-[320px] md:w-[400px] min-h-[220px]",
                "bg-muted/40 backdrop-blur-xl rounded-2xl p-6 md:p-8",
                "flex flex-col",
                className
            )}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
        >
            {/* Large Quote Mark Background */}
            <div className="absolute top-4 left-4 pointer-events-none">
                <Quote className="h-20 w-20 text-gold/10 fill-gold/5" />
            </div>

            {/* Quote Text */}
            <p className="relative z-10 text-sm md:text-base text-muted-foreground body-text leading-relaxed mb-6 line-clamp-4">
                &ldquo;{quote}&rdquo;
            </p>

            {/* Author */}
            <div className="mt-auto">
                <p className="font-display font-bold text-foreground uppercase tracking-wide">
                    {author}
                </p>
                <p className="text-sm text-gold">
                    {role}{company && `, ${company}`}
                </p>
            </div>

            {/* Subtle Border */}
            <div className="absolute inset-0 rounded-2xl border border-white/5 pointer-events-none" />
        </motion.div>
    );
};

/* ========================================
   PROJECT CARD - Cinematic (16:9) with Parallax
   ======================================== */
interface ProjectCardKineticProps {
    title: string;
    category: string;
    imageUrl: string;
    stats?: { value: string; label: string }[];
    onClick?: () => void;
    className?: string;
}

export const ProjectCardKinetic: React.FC<ProjectCardKineticProps> = ({
    title,
    category,
    imageUrl,
    stats,
    onClick,
    className,
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Mouse position for parallax
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    // Smooth spring for parallax movement
    const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

    // Transform mouse position to image offset (opposite direction)
    const imageX = useTransform(springX, [0, 1], [15, -15]);
    const imageY = useTransform(springY, [0, 1], [10, -10]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0.5);
        mouseY.set(0.5);
        setIsHovered(false);
    };

    return (
        <motion.div
            ref={cardRef}
            className={cn(
                "relative w-[340px] md:w-[480px] lg:w-[560px] overflow-hidden rounded-2xl cursor-pointer",
                "aspect-video",
                className
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
        >
            {/* Parallax Image */}
            <motion.div
                className="absolute inset-[-20px]"
                style={{ x: imageX, y: imageY }}
            >
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className={cn(
                        "object-cover transition-all duration-500",
                        isHovered ? "scale-110" : "scale-100"
                    )}
                    sizes="(max-width: 768px) 340px, 560px"
                />
            </motion.div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
                <motion.div
                    animate={{ y: isHovered ? -4 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-gold bg-gold/10 backdrop-blur-sm rounded-full mb-3">
                        {category}
                    </span>
                    <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-bold uppercase text-foreground mb-3">
                        {title}
                    </h3>

                    {/* Stats */}
                    {stats && (
                        <div className="flex gap-6">
                            {stats.map((stat, index) => (
                                <div key={index}>
                                    <div className="text-lg font-display font-bold text-gold">
                                        {stat.value}
                                    </div>
                                    <div className="text-xs text-muted-foreground uppercase tracking-wider">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Hover Border */}
            <motion.div
                className="absolute inset-0 rounded-2xl border-2 pointer-events-none"
                animate={{
                    borderColor: isHovered ? "rgba(197, 160, 89, 0.5)" : "rgba(255, 255, 255, 0)"
                }}
                transition={{ duration: 0.3 }}
            />
        </motion.div>
    );
};
