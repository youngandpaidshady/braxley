"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, PanInfo } from "framer-motion";
import { cn } from "@/lib/utils";

interface KineticSliderProps {
    title?: string;
    subtitle?: string;
    children: React.ReactNode;
    cardSpacing?: number;
    className?: string;
    showGradientMask?: boolean;
}

/**
 * KineticSlider - Physics-Based Draggable Carousel Engine
 * 
 * Features:
 * - Momentum scrolling with spring physics
 * - Rubber-band effect at edges
 * - Gradient fade masks
 * - Grab/Grabbing cursor states
 * - Hidden scrollbars
 * - Touch-optimized for mobile
 */
export const KineticSlider: React.FC<KineticSliderProps> = ({
    title,
    subtitle,
    children,
    cardSpacing = 24,
    className,
    showGradientMask = true,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [constraints, setConstraints] = useState({ left: 0, right: 0 });
    const [isDragging, setIsDragging] = useState(false);

    // Motion values for physics
    const x = useMotionValue(0);

    // Spring physics for momentum
    const springX = useSpring(x, {
        stiffness: 300,
        damping: 30,
        mass: 0.5,
    });

    // Calculate drag constraints
    useEffect(() => {
        const calculateConstraints = () => {
            if (!containerRef.current || !trackRef.current) return;

            const containerWidth = containerRef.current.offsetWidth;
            const trackWidth = trackRef.current.scrollWidth;
            const maxDrag = Math.min(0, containerWidth - trackWidth - 48); // 48px padding

            setConstraints({
                left: maxDrag,
                right: 0,
            });
        };

        calculateConstraints();
        window.addEventListener("resize", calculateConstraints);

        // Recalculate after children render
        const timer = setTimeout(calculateConstraints, 100);

        return () => {
            window.removeEventListener("resize", calculateConstraints);
            clearTimeout(timer);
        };
    }, [children]);

    // Handle drag with rubber-band effect
    const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const newX = x.get() + info.delta.x;

        // Rubber-band effect at edges
        if (newX > 0) {
            x.set(newX * 0.3); // Resistance at right edge
        } else if (newX < constraints.left) {
            const overflow = newX - constraints.left;
            x.set(constraints.left + overflow * 0.3); // Resistance at left edge
        } else {
            x.set(newX);
        }
    };

    // Snap back on drag end
    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        setIsDragging(false);

        // Add momentum
        const momentum = info.velocity.x * 0.2;
        let targetX = x.get() + momentum;

        // Clamp to constraints
        targetX = Math.max(constraints.left, Math.min(0, targetX));

        x.set(targetX);
    };

    return (
        <section className={cn("py-16 md:py-24 overflow-hidden", className)}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                {(title || subtitle) && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-10 md:mb-12"
                    >
                        {subtitle && (
                            <span className="inline-block px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-gold border border-gold/30 bg-gold/5 backdrop-blur-sm rounded-full mb-4">
                                {subtitle}
                            </span>
                        )}
                        {title && (
                            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase text-foreground">
                                {title}
                            </h2>
                        )}
                    </motion.div>
                )}
            </div>

            {/* Slider Container */}
            <div
                ref={containerRef}
                className="relative"
            >
                {/* Gradient Masks */}
                {showGradientMask && (
                    <>
                        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
                    </>
                )}

                {/* Draggable Track */}
                <motion.div
                    ref={trackRef}
                    drag="x"
                    dragConstraints={constraints}
                    dragElastic={0.1}
                    dragMomentum={true}
                    onDragStart={() => setIsDragging(true)}
                    onDrag={handleDrag}
                    onDragEnd={handleDragEnd}
                    style={{ x: springX }}
                    className={cn(
                        "flex px-4 sm:px-6 lg:px-8",
                        isDragging ? "cursor-grabbing" : "cursor-grab",
                        "select-none touch-pan-y"
                    )}
                >
                    {React.Children.map(children, (child, index) => (
                        <div
                            key={index}
                            style={{
                                marginRight: index === React.Children.count(children) - 1 ? 0 : cardSpacing,
                                flexShrink: 0,
                            }}
                        >
                            {child}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default KineticSlider;
