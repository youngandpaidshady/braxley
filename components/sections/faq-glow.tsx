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
    question: "What is the typical timeline for a kitchen remodel?",
    answer:
      "A typical kitchen remodel takes 6-10 weeks from start to finish, depending on the scope of work. This includes design approval, material ordering, demolition, rough-in work (plumbing, electrical, HVAC), installation of cabinets and countertops, and final finishes. Custom cabinetry may extend the timeline by 2-4 weeks. We provide a detailed project schedule during the initial consultation and keep you updated with weekly progress reports. Complex projects involving structural changes or high-end appliances may require additional time, which we'll discuss upfront.",
  },
  {
    question: "Do you handle city permits and zoning?",
    answer:
      "Yes, we manage the entire bureaucratic process for you. As your licensed general contractor, we handle all city paperwork, building permits, inspections, and code compliance. This includes submitting architectural drawings when required, coordinating structural engineering assessments, scheduling inspections, and ensuring all work meets or exceeds local building codes. You won't need to navigate city bureaucracy—we take care of everything from application to final approval, keeping your project moving forward smoothly.",
  },
  {
    question: "Can we live in the house during construction?",
    answer:
      "It depends on the scope of work. For single-room renovations like kitchens or bathrooms, most clients stay in their homes. We work room-by-room to minimize disruption and maintain a clean, safe work environment. We use professional-grade dust barriers, protect your belongings with coverings, and maintain daily cleanup. For whole-home remodels or major structural work, we'll discuss temporary living arrangements. Safety is our priority, and we'll provide clear guidance on what's feasible based on your specific project.",
  },
  {
    question: "Is your work warrantied?",
    answer:
      "Yes, we offer a 5-year structural warranty on all work, ensuring your investment is protected. This covers structural integrity, framing, and foundational elements. Additionally, we provide a 2-year warranty on finishes and fixtures, and a 1-year warranty on all materials and workmanship. Our commitment to quality means we'll address any issues that arise, ensuring your complete satisfaction long after the project is complete. All warranty terms are clearly outlined in your contract.",
  },
];

export const FaqGlow: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          {/* Accordion Items */}
          <div className="space-y-4">
            {faqData.map((item, index) => {
              const isOpen = activeIndex === index;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    delay: index * 0.1,
                  }}
                  className={cn(
                    "border rounded-xl mb-4 bg-card/50 backdrop-blur-sm overflow-hidden transition-all duration-300",
                    isOpen
                      ? "border-primary shadow-lg shadow-primary/20"
                      : "border-border/40"
                  )}
                >
                  {/* Question Button */}
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full flex flex-row items-center justify-between p-6 text-left transition-colors hover:text-primary focus:outline-none focus:text-primary"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span className="font-serif font-medium text-lg pr-8">{item.question}</span>
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
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
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                        className="overflow-hidden"
                      >
                        <p className="text-muted-foreground leading-relaxed pb-6 px-6">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

