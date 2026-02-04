"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    y?: number;
    once?: boolean;
    amount?: number;
}

// Default animation variants for scroll reveal
const defaultVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

/**
 * ScrollReveal - Antigravity Physics Component
 * Wraps children with a float-up-and-fade-in animation triggered on scroll.
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
    children,
    className = "",
    delay = 0,
    duration = 0.6,
    y = 20,
    once = true,
    amount = 0.3,
}) => {
    const variants: Variants = {
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount, margin: "0px" }}
            variants={variants}
            transition={{
                duration,
                delay,
                ease: [0.22, 1, 0.36, 1], // Apple-like smooth easing
            }}
            className={className}
            style={{ willChange: "opacity, transform" }}
        >
            {children}
        </motion.div>
    );
};

/**
 * StaggerContainer - For staggered children animations
 */
interface StaggerContainerProps {
    children: React.ReactNode;
    className?: string;
    staggerDelay?: number;
    once?: boolean;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
    children,
    className = "",
    staggerDelay = 0.1,
    once = true,
}) => {
    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: staggerDelay,
            },
        },
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount: 0.2 }}
            variants={containerVariants}
            className={className}
        >
            {children}
        </motion.div>
    );
};

/**
 * StaggerItem - Individual item within StaggerContainer
 */
interface StaggerItemProps {
    children: React.ReactNode;
    className?: string;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
    children,
    className = "",
}) => {
    return (
        <motion.div
            variants={defaultVariants}
            transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
