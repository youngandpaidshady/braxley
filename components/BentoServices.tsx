"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Building2,
    Hospital,
    Hotel,
    Landmark,
    Trophy,
    Waves,
    ArrowUpRight,
    X,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface BentoService {
    id: string;
    icon: React.ElementType;
    title: string;
    subtitle: string;
    description: string;
    imageUrl: string;
    stats?: { value: string; label: string }[];
    span: "normal" | "wide" | "tall";
}

const services: BentoService[] = [
    {
        id: "stadiums",
        icon: Trophy,
        title: "Stadium Construction",
        subtitle: "65,000+ Seat Venues",
        description:
            "Multi-million dollar premium suite and club-level upgrades in live venues. Zero disruption to game operations, aggressive deadlines met with precision.",
        imageUrl:
            "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=600&fit=crop&q=80",
        stats: [
            { value: "12+", label: "Stadiums" },
            { value: "100%", label: "On-Time" },
        ],
        span: "wide",
    },
    {
        id: "hospitals",
        icon: Hospital,
        title: "Healthcare Facilities",
        subtitle: "OSHPD & Joint Commission",
        description:
            "Outpatient wings, surgical suites, and OR renovations in fully operational settings. Strict adherence to infection-control and HIPAA compliance.",
        imageUrl:
            "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop&q=80",
        stats: [
            { value: "8+", label: "Hospitals" },
            { value: "0", label: "Incidents" },
        ],
        span: "normal",
    },
    {
        id: "resorts",
        icon: Waves,
        title: "Luxury Resorts",
        subtitle: "5-Star Hospitality",
        description:
            "Oceanfront villas, spas, and amenity renovations with exquisite attention to aesthetic harmony. Peak season execution with zero guest disruption.",
        imageUrl:
            "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=600&fit=crop&q=80",
        stats: [
            { value: "15+", label: "Resorts" },
            { value: "5★", label: "Rating" },
        ],
        span: "tall",
    },
    {
        id: "hotels",
        icon: Hotel,
        title: "Grand Hotels",
        subtitle: "White-Glove Service",
        description:
            "Lobby, restaurant, and guest-room refreshes with discreet execution. Premium finishes ensuring timeless five-star elegance.",
        imageUrl:
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop&q=80",
        span: "normal",
    },
    {
        id: "commercial",
        icon: Building2,
        title: "Commercial Towers",
        subtitle: "Class A Office Space",
        description:
            "Flagship repositioning projects delivered under budget and ahead of schedule. Value engineering that maximizes ROI.",
        imageUrl:
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&q=80",
        stats: [
            { value: "$50M+", label: "Value" },
            { value: "8%", label: "Under Budget" },
        ],
        span: "wide",
    },
    {
        id: "historic",
        icon: Landmark,
        title: "Historic Restoration",
        subtitle: "Preservation Excellence",
        description:
            "Period details restored with modern infrastructure retrofits. Electrical, HVAC, and insulation systems hidden behind heritage walls.",
        imageUrl:
            "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&h=600&fit=crop&q=80",
        span: "normal",
    },
];

export const BentoServices: React.FC = () => {
    const [selectedService, setSelectedService] = useState<BentoService | null>(null);
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    // Animation variants
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    const getSpanClass = (span: string) => {
        switch (span) {
            case "wide":
                return "md:col-span-2";
            case "tall":
                return "md:row-span-2";
            default:
                return "";
        }
    };

    return (
        <section id="services" className="py-20 md:py-32 bg-background relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }} />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-gold border border-gold/30 bg-gold/5 backdrop-blur-sm rounded-full mb-6">
                        Our Expertise
                    </span>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase text-foreground mb-4">
                        Institutional <span className="text-gradient-gold">Scale</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto body-text">
                        Enterprise-grade construction for the world's most demanding environments.
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto"
                >
                    {services.map((service) => (
                        <motion.div
                            key={service.id}
                            variants={itemVariants}
                            className={cn(
                                "group relative rounded-2xl overflow-hidden cursor-pointer min-h-[280px] md:min-h-[320px] bg-black",
                                getSpanClass(service.span),
                                service.span === "tall" && "min-h-[400px] md:min-h-[660px]"
                            )}
                            onMouseEnter={() => setHoveredId(service.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            onClick={() => setSelectedService(service)}
                        >
                            {/* Background Image with Hover Effects */}
                            <div className="absolute inset-0 img-hover-zoom img-grayscale-hover">
                                <Image
                                    src={service.imageUrl}
                                    alt={service.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>

                            {/* Dark Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

                            {/* Content */}
                            <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                {/* Icon */}
                                <motion.div
                                    animate={{ y: hoveredId === service.id ? -8 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="mb-4"
                                >
                                    <div className="w-12 h-12 rounded-xl glass-card-xl flex items-center justify-center">
                                        <service.icon className="h-6 w-6 text-gold" />
                                    </div>
                                </motion.div>

                                {/* Title & Subtitle */}
                                <h3 className="font-display text-xl md:text-2xl font-bold uppercase text-foreground mb-1">
                                    {service.title}
                                </h3>
                                <p className="text-sm text-gold font-semibold mb-2">
                                    {service.subtitle}
                                </p>

                                {/* Description - Revealed on Hover */}
                                <motion.p
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{
                                        opacity: hoveredId === service.id ? 1 : 0,
                                        height: hoveredId === service.id ? "auto" : 0,
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="text-sm text-muted-foreground body-text mb-4 line-clamp-3"
                                >
                                    {service.description}
                                </motion.p>

                                {/* Stats */}
                                {service.stats && (
                                    <div className="flex gap-6 mt-2">
                                        {service.stats.map((stat, index) => (
                                            <div key={index}>
                                                <div className="text-2xl font-display font-bold text-gold">
                                                    {stat.value}
                                                </div>
                                                <div className="text-xs text-muted-foreground uppercase tracking-wider">
                                                    {stat.label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Arrow Indicator */}
                                <motion.div
                                    animate={{
                                        x: hoveredId === service.id ? 8 : 0,
                                        opacity: hoveredId === service.id ? 1 : 0.5,
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute top-6 right-6"
                                >
                                    <ArrowUpRight className="h-6 w-6 text-gold" />
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Service Modal */}
            <AnimatePresence>
                {selectedService && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-xl"
                        onClick={() => setSelectedService(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="relative w-full max-w-2xl glass-card-xl rounded-3xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Image */}
                            <div className="relative h-64 md:h-80">
                                <Image
                                    src={selectedService.imageUrl}
                                    alt={selectedService.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                            </div>

                            {/* Modal Content */}
                            <div className="p-8">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-14 h-14 rounded-xl bg-gold/20 flex items-center justify-center">
                                        <selectedService.icon className="h-7 w-7 text-gold" />
                                    </div>
                                    <div>
                                        <h3 className="font-display text-2xl font-bold uppercase text-foreground">
                                            {selectedService.title}
                                        </h3>
                                        <p className="text-sm text-gold">{selectedService.subtitle}</p>
                                    </div>
                                </div>

                                <p className="text-muted-foreground body-text leading-relaxed mb-6">
                                    {selectedService.description}
                                </p>

                                {selectedService.stats && (
                                    <div className="flex gap-8 pt-6 border-t border-white/10">
                                        {selectedService.stats.map((stat, index) => (
                                            <div key={index}>
                                                <div className="text-3xl font-display font-bold text-gold">
                                                    {stat.value}
                                                </div>
                                                <div className="text-sm text-muted-foreground uppercase tracking-wider">
                                                    {stat.label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedService(null)}
                                className="absolute top-4 right-4 w-10 h-10 rounded-full glass-card-xl flex items-center justify-center text-foreground hover:text-gold transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default BentoServices;
