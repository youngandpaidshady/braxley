"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CEOCardProps {
  name: string;
  role: string;
  imageUrl: string;
  imageAlt?: string;
  signaturePath?: string;
  onPlayIntro?: () => void;
  className?: string;
}

export const CEOCard: React.FC<CEOCardProps> = ({
  name,
  role,
  imageUrl,
  imageAlt = "CEO Portrait",
  signaturePath,
  onPlayIntro,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Default signature path if none provided (Ivan's signature)
  const defaultSignaturePath =
    "M20 60 Q35 40, 50 50 Q65 60, 80 55 Q95 50, 110 55 Q125 60, 140 50 Q155 40, 170 45 Q185 50, 200 55 Q215 60, 230 50 M230 50 Q235 45, 240 50";

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative w-full max-w-4xl mx-auto",
        "bg-gradient-to-br",
        "from-background via-muted/30 to-background",
        "dark:from-slate-900 dark:via-slate-800 dark:to-slate-900",
        "rounded-2xl p-6 md:p-8 lg:p-10",
        "border border-white/10 dark:border-white/5",
        "shadow-2xl",
        "overflow-hidden",
        "group",
        className
      )}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Noise Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Glass Edge Border Effect */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none">
        <div className="absolute inset-0 rounded-2xl border-t border-white/20 dark:border-white/10" />
        <div className="absolute inset-0 rounded-2xl border-b border-black/10 dark:border-black/30" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
        {/* Portrait - Squircle with Negative Margin Top */}
        <motion.div
          className={cn(
            "relative flex-shrink-0",
            "w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48",
            "rounded-2xl overflow-hidden",
            "-mt-8 md:-mt-12 lg:-mt-16",
            "shadow-xl",
            "ring-4 ring-background/50 dark:ring-slate-900/50"
          )}
          animate={{
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Gradient Lighting Effect Behind Image */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent dark:from-primary/30 dark:via-primary/20"
            animate={{
              opacity: isHovered ? 0.8 : 0.5,
            }}
            transition={{ duration: 0.3 }}
          />
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover relative z-10"
            sizes="(max-width: 768px) 128px, (max-width: 1024px) 160px, 192px"
            priority
          />
        </motion.div>

        {/* Content Section */}
        <div className="flex-1 space-y-4 md:space-y-6 text-center md:text-left">
          {/* Name - Large Serif */}
          <motion.h3
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {name}
          </motion.h3>

          {/* Role - Small Uppercase */}
          <motion.p
            className="text-xs font-bold uppercase tracking-widest text-primary"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {role}
          </motion.p>

          {/* Signature SVG */}
          <motion.div
            className="pt-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <svg
              width="200"
              height="60"
              viewBox="0 0 250 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary dark:text-primary"
            >
              <motion.path
                d={signaturePath || defaultSignaturePath}
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  delay: 0.4,
                }}
              />
            </svg>
          </motion.div>

          {/* Play Intro Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="pt-2"
          >
            <motion.button
              onClick={onPlayIntro || undefined}
              className={cn(
                "relative inline-flex items-center gap-2",
                "px-4 py-2 rounded-full",
                "bg-primary/10 hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30",
                "border border-primary/30 hover:border-primary/50",
                "text-primary font-medium text-sm",
                "backdrop-blur-sm",
                "transition-all duration-300",
                "shadow-lg shadow-primary/10",
                "group/button"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <PlayCircle className="h-4 w-4" />
              </motion.div>
              <span>Play Intro</span>
              <motion.div
                className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover/button:opacity-100 blur-xl -z-10"
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

