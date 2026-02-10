"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring, PanInfo } from "framer-motion";
import { cn } from "@/lib/utils";

/* ========================================
   TEAM DATA
   ======================================== */
const TEAM = [
  {
    name: "Braxley Nevim",
    role: "Founder & CEO",
    img: "/img/ceo.png"
  },
  {
    name: "Liora Willow",
    role: "Operations Director",
    img: "/img/liora-willow.png",
    link: "/team/liora-willow"
  },
  {
    name: "Sarah Jenkins",
    role: "Lead Architect",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Marcus Chen",
    role: "Project Manager",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=530&fit=crop&q=80"
  },
  {
    name: "Elena Rodriguez",
    role: "Design Director",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=530&fit=crop&q=80"
  },
];

/* ========================================
   TEAM CARD - Vertical Portrait (3:4)
   ======================================== */
interface TeamCardProps {
  name: string;
  role: string;
  imageUrl: string;
  link?: string;
}

const TeamCard: React.FC<TeamCardProps> = ({ name, role, imageUrl, link }) => {
  const [isHovered, setIsHovered] = useState(false);

  const CardContent = (
    <div
      className="relative w-[260px] md:w-[280px] overflow-hidden rounded-xl flex-shrink-0 aspect-[3/4] bg-muted group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image - NO grayscale, full color always */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className={cn(
            "object-cover transition-transform duration-300 ease-out",
            isHovered ? "scale-105" : "scale-100"
          )}
          sizes="280px"
          priority
        />
      </div>

      {/* Gradient Overlay - subtle, doesn't black out image */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="font-display text-xl font-bold uppercase text-white mb-1 tracking-wide group-hover:text-gold transition-colors">
          {name}
        </h3>
        <p className="text-sm font-semibold text-gold tracking-wide">
          {role}
        </p>
      </div>

      {/* Hover Border */}
      <div
        className={cn(
          "absolute inset-0 rounded-xl border-2 pointer-events-none transition-colors duration-300",
          isHovered ? "border-gold/50" : "border-transparent"
        )}
      />
    </div>
  );

  if (link) {
    return (
      <Link href={link} className="block">
        {CardContent}
      </Link>
    );
  }

  return CardContent;
};

/* ========================================
   TEAM SECTION with Smooth Scrolling
   ======================================== */
export function TeamSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative z-10 py-20 md:py-28 bg-background overflow-hidden" id="team">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-12"
        >
          <span className="inline-block px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-gold border border-gold/30 bg-gold/5 backdrop-blur-sm rounded-full mb-4">
            Personnel
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase text-foreground">
            Meet Our Team
          </h2>
        </motion.div>
      </div>

      {/* Scrollable Container - Native smooth scroll */}
      <div className="relative">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Scrollable Track - Using native scroll for stability */}
        <div
          ref={scrollRef}
          className="flex gap-5 px-4 sm:px-6 lg:px-8 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing scroll-smooth"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {TEAM.map((member, index) => (
            <div
              key={index}
              className="flex-shrink-0"
            >
              <TeamCard
                name={member.name}
                role={member.role}
                imageUrl={member.img}
                link={member.link}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Hide scrollbar CSS */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

export default TeamSection;
