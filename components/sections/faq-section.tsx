"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How long does a typical kitchen remodel take?",
    answer:
      "A typical kitchen remodel takes approximately 6-8 weeks from start to finish. This timeline includes design approval, material ordering, demolition, installation, and final touches. Complex projects with custom cabinetry or structural changes may take 10-12 weeks. We provide a detailed timeline during the initial consultation and keep you updated throughout the process.",
  },
  {
    question: "Do I need to move out during renovation?",
    answer:
      "Usually no, you don't need to move out. We work room-by-room to minimize disruption to your daily life. For whole-home renovations, we can discuss temporary living arrangements, but most clients stay in their homes. We take great care to maintain a clean, safe work environment and protect your belongings with professional-grade coverings.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "Yes, we are fully licensed and insured. Braxley Nevim Elite Remodeling LLC holds all required state and local contractor licenses, and we carry comprehensive general liability insurance and workers' compensation coverage. We're happy to provide proof of insurance and licensing credentials upon request. Your peace of mind is our priority.",
  },
  {
    question: "Do you handle the permits?",
    answer:
      "Yes, we handle all city paperwork and permits. As your general contractor, we take full responsibility for obtaining all necessary building permits, scheduling inspections, and ensuring your project meets all local building codes. You won't need to worry about navigating city bureaucracy—we handle it all as part of our comprehensive service.",
  },
  {
    question: "What is your payment schedule?",
    answer:
      "We use a milestone-based payment schedule that protects both you and us. Typically, we request a deposit to secure materials (usually 30%), progress payments at key milestones (40% at rough-in, 20% at completion), and a final payment upon your satisfaction (10%). All terms are clearly outlined in your contract before work begins.",
  },
  {
    question: "Do you offer design services?",
    answer:
      "Yes, we offer comprehensive design-build services. Our team includes experienced designers who work with you to create a vision that matches your style and budget. We can handle everything from initial concept to 3D renderings, material selection, and final implementation. This integrated approach ensures seamless execution from design to completion.",
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Common Questions
          </h2>
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary font-bold max-w-xl mx-auto">
            Everything you need to know about working with Braxley Nevim Elite Remodeling LLC
          </p>
        </motion.div>

        {/* Accordion Container */}
        <div className="max-w-2xl mx-auto">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="border-b border-border/50 last:border-b-0"
              >
                {/* Question Button */}
                <button
                  onClick={() => toggleItem(index)}
                  className={cn(
                    "w-full flex justify-between items-center py-4 text-left font-medium text-lg",
                    "transition-colors duration-200",
                    "hover:text-primary focus:outline-none focus:text-primary",
                    isOpen && "text-primary"
                  )}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="pr-8">{item.question}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{
                      duration: 0.3,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                    className="flex-shrink-0"
                  >
                    <Plus
                      className={cn(
                        "h-5 w-5 transition-colors",
                        isOpen ? "text-primary" : "text-muted-foreground"
                      )}
                    />
                  </motion.div>
                </button>

                {/* Answer Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.4,
                        ease: [0.04, 0.62, 0.23, 0.98],
                      }}
                      className="overflow-hidden"
                    >
                      <motion.p
                        initial={{ y: -10 }}
                        animate={{ y: 0 }}
                        exit={{ y: -10 }}
                        transition={{
                          duration: 0.3,
                          ease: [0.04, 0.62, 0.23, 0.98],
                        }}
                        className="text-muted-foreground leading-relaxed pt-2 pb-6"
                      >
                        {item.answer}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

