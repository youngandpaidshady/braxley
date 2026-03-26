"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Copy,
  Check,
  Facebook,
  Instagram,
  Linkedin,
  ArrowUpRight,
} from "lucide-react";
import { ModeToggle } from "./ui/mode-toggle";
import { cn } from "@/lib/utils";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

const services = [
  { label: "Kitchen Remodeling", href: "/#services" },
  { label: "Bathroom Renovation", href: "/#services" },
  { label: "Home Additions", href: "/#services" },
  { label: "Commercial Build-Outs", href: "/#services" },
];

export const StickyFooter: React.FC = () => {
  const [copied, setCopied] = useState(false);

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
    <footer className="relative z-20 bg-background w-full border-t border-border/50 overflow-hidden">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16 max-w-7xl">
        {/* Top Section - CTA */}
        <div className="mb-8 md:mb-12 pb-8 md:pb-12 border-b border-border/30">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6">
            <div>
              <p className="text-sm font-mono uppercase tracking-[0.2em] text-primary mb-3">
                Ready to Transform Your Space?
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display heading-display-bold text-foreground leading-tight">
                Let&apos;s Build
                <br className="hidden sm:block" />
                <span className="text-primary"> Together.</span>
              </h2>
            </div>
            <motion.a
              href="/#contact"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-mono text-sm uppercase tracking-wider rounded-none hover:bg-primary/90 transition-colors self-start md:self-auto"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get a Free Quote
              <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>
          </div>
        </div>

        {/* Middle Section - Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mb-8 md:mb-12">
          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-mono uppercase tracking-[0.15em] text-foreground font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-mono uppercase tracking-[0.15em] text-foreground font-semibold mb-4">
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.label}>
                  <Link
                    href={service.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-sm font-mono uppercase tracking-[0.15em] text-foreground font-semibold mb-4">
              Contact
            </h3>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={handleCopyEmail}
                  className="group flex items-start gap-3 text-left w-full"
                  aria-label="Copy email address"
                >
                  <Mail className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <div>
                    <span className="text-muted-foreground group-hover:text-primary transition-colors text-sm block">
                      Braxleynevimllc@outlook.com
                    </span>
                    <span className="text-xs text-primary/70 flex items-center gap-1 mt-0.5">
                      {copied ? (
                        <>
                          <Check className="h-3 w-3" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" /> Click to copy
                        </>
                      )}
                    </span>
                  </div>
                </button>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <a
                  href="tel:+17743475579"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  +1 (774) 347-5579
                </a>
              </li>

            </ul>
          </div>

          {/* Social & Theme */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-sm font-mono uppercase tracking-[0.15em] text-foreground font-semibold mb-4">
              Connect
            </h3>
            <div className="flex flex-wrap gap-3 mb-6">
              <SocialLink
                href="https://www.facebook.com/share/1B42bSWnfK/?mibextid=wwXIfr"
                icon={Facebook}
                label="Facebook"
              />
              <SocialLink
                href="https://instagram.com/braxleynevim"
                icon={Instagram}
                label="Instagram"
              />
              <SocialLink
                href="https://linkedin.com/company/braxleynevim"
                icon={Linkedin}
                label="LinkedIn"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Theme:</span>
              <ModeToggle />
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="pt-6 md:pt-8 border-t border-border/30">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} Braxley Nevim Elite Remodeling LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

interface SocialLinkProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon: Icon, label }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center w-10 h-10 rounded-full",
        "bg-background dark:bg-secondary border border-border hover:border-primary/50",
        "hover:bg-primary/10 transition-all duration-300"
      )}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      aria-label={label}
    >
      <Icon className="h-4 w-4 text-primary" />
    </motion.a>
  );
};
