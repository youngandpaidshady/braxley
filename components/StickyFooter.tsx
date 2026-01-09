"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Mail, Copy, Check, Facebook, Instagram, Linkedin } from "lucide-react";
import { ModeToggle } from "./ui/mode-toggle";
import { cn } from "@/lib/utils";

export const StickyFooter: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const emailRef = useRef<HTMLDivElement>(null);

  const handleCopyEmail = async () => {
    const email = "Braxleynevimllc@outlook.com";
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  return (
    <footer className="relative z-20 bg-black dark:bg-black w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16 max-w-7xl relative z-10">
        {/* Massive Typography */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold text-foreground leading-tight">
            LET&apos;S BUILD.
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left: Email with Copy Animation */}
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
              Get in Touch
            </p>
            <div
              ref={emailRef}
              className="group relative inline-block touch-manipulation cursor-pointer"
              onClick={handleCopyEmail}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCopyEmail();
                }
              }}
              aria-label="Copy email address"
            >
              <motion.div
                className="flex items-center gap-3 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="h-5 w-5 text-primary" strokeWidth={1.5} />
                <span className="text-xl md:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  Braxleynevimllc@outlook.com
                </span>
                <motion.div
                  initial={false}
                  animate={{
                    scale: copied ? [1, 1.2, 1] : 1,
                    rotate: copied ? [0, 10, -10, 0] : 0,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {copied ? (
                    <Check className="h-5 w-5 text-primary" strokeWidth={1.5} />
                  ) : (
                    <Copy className="h-5 w-5 text-primary" strokeWidth={1.5} />
                  )}
                </motion.div>
              </motion.div>
              {copied && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute -top-8 left-0 text-sm text-primary font-medium"
                >
                  Copied!
                </motion.div>
              )}
            </div>
          </div>

          {/* Right: Social Links with Magnetic Effect */}
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
              Connect
            </p>
            <div className="flex flex-wrap gap-4">
              <MagneticButton
                href="https://facebook.com/braxleynevim"
                icon={Facebook}
                label="Facebook"
              />
              <MagneticButton
                href="https://instagram.com/braxleynevim"
                icon={Instagram}
                label="Instagram"
              />
              <MagneticButton
                href="https://linkedin.com/company/braxleynevim"
                icon={Linkedin}
                label="LinkedIn"
              />
            </div>
          </div>
        </div>

        {/* Bottom: Copyright and Theme Toggle */}
        <div className="mt-12 pt-8 border-t border-primary/20">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 flex-wrap">
            <p className="text-sm text-muted-foreground text-center">
              © {new Date().getFullYear()} Braxley Nevim Elite Remodeling LLC. All rights
              reserved.
            </p>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-xs text-muted-foreground">Theme:</span>
              <div className="relative z-10">
                <ModeToggle className="text-primary hover:text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface MagneticButtonProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  href,
  icon: Icon,
  label,
}) => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 30 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), springConfig);
  const scale = useSpring(useTransform(x, [-0.5, 0.5, 0.5], [1.1, 1.1, 1]), {
    stiffness: 400,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={buttonRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative inline-flex items-center justify-center w-12 h-12 rounded-full",
        "bg-secondary hover:bg-primary/10 border border-border hover:border-primary/50",
        "transition-colors duration-300 cursor-pointer"
      )}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={label}
    >
      <Icon className="h-5 w-5 text-primary" />
    </motion.a>
  );
};
