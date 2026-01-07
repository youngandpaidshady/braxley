"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, FileText } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#services", label: "Services" },
    { href: "#projects", label: "Projects" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  // Animation variants for mobile overlay
  const overlayVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Stagger animation for links
  const linkVariants = {
    closed: { opacity: 0, y: 20 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 0.2,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-background/80 backdrop-blur-md py-3 shadow-lg border-b border-border"
            : "bg-background/80 backdrop-blur-md py-4"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#home" className="flex-shrink-0">
              <Logo size="md" />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
              <ul className="flex items-center gap-8 list-none m-0 p-0">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-foreground hover:text-accent transition-colors font-medium"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-3 ml-4">
                <Button variant="ghost" size="sm" asChild>
                  <a href="tel:+1234567890">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </a>
                </Button>
                <Button variant="default" size="sm" asChild>
                  <a href="#contact">
                    <FileText className="h-4 w-4 mr-2" />
                    Get Quote
                  </a>
                </Button>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-foreground hover:text-accent transition-colors"
              aria-label="Toggle menu"
            >
              <motion.div
                animate={isOpen ? "open" : "closed"}
                variants={{
                  closed: { rotate: 0 },
                  open: { rotate: 180 },
                }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </motion.div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Full-Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-50 lg:hidden bg-background backdrop-blur-xl"
          >
            {/* Header with Logo and Close Button */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-border">
              {/* Logo */}
              <a href="#home" onClick={() => setIsOpen(false)}>
                <Logo size="md" />
              </a>

              {/* Close Button - Large and Accessible */}
              <Button
                variant="ghost"
                size="lg"
                onClick={() => setIsOpen(false)}
                className="rounded-full px-4 py-2 text-foreground hover:text-accent hover:bg-muted"
                aria-label="Close menu"
              >
                <X className="h-6 w-6 mr-2" />
                <span className="font-medium">Close</span>
              </Button>
            </div>

            {/* Navigation Links - Centered */}
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4 sm:px-6 py-12">
              <nav className="flex flex-col items-center gap-6 w-full max-w-md" aria-label="Mobile navigation">
                <ul className="flex flex-col items-center gap-6 w-full list-none m-0 p-0">
                  {navLinks.map((link, i) => (
                    <li key={link.href} className="w-full">
                      <motion.a
                        href={link.href}
                        custom={i}
                        variants={linkVariants}
                        initial="closed"
                        animate="open"
                        onClick={() => setIsOpen(false)}
                        className="text-2xl font-semibold text-foreground hover:text-primary transition-colors w-full text-center py-3 block"
                      >
                        {link.label}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* CTA Button at Bottom */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="mt-12 w-full max-w-md"
              >
                <Button
                  variant="default"
                  size="lg"
                  className="w-full rounded-full py-6 text-lg font-semibold"
                  onClick={() => setIsOpen(false)}
                  asChild
                >
                  <a href="#contact">
                    <FileText className="h-5 w-5 mr-2" />
                    Get a Quote
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Mobile CTA Bar (Mobile Only) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
        <div className="bg-background border-t border-border shadow-lg">
          <div className="container mx-auto px-4 py-3">
            <div className="flex gap-3">
              <Button
                variant="default"
                className="flex-1 rounded-full py-6"
                size="lg"
                asChild
              >
                <a href="tel:+1234567890">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Ivan Now
                </a>
              </Button>
              <Button
                variant="outline"
                className="flex-1 rounded-full py-6"
                size="lg"
                asChild
              >
                <a href="#contact">
                  <FileText className="h-4 w-4 mr-2" />
                  Get a Quote
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

