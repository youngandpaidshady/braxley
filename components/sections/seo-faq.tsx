"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { JsonLd } from "@/components/seo/JsonLd";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is the typical timeline for a luxury kitchen remodel with a general contractor?",
    answer:
      "A luxury kitchen remodel typically takes 8-12 weeks from design approval to final completion, depending on the scope of work. As a licensed and insured general contractor, we handle every phase of the design-build process, from initial consultation and custom cabinetry design to final installation. Our team coordinates all trades—plumbing, electrical, and HVAC—ensuring seamless execution. We work exclusively with premium materials and high-end appliance brands, which may require longer lead times. Throughout the project, we maintain transparent communication and provide weekly progress updates. Our design-build approach eliminates the need for separate architects, streamlining the process while ensuring your vision is realized with precision craftsmanship throughout the [Your City] area.",
  },
  {
    question: "Do you handle permitting and architecture as part of your design-build services?",
    answer:
      "Yes, as a full-service general contractor, we handle all permitting, architectural drawings, and code compliance as part of our comprehensive design-build process. Our licensed team works directly with local building departments to secure all necessary permits for your luxury home renovation. We provide complete architectural plans, structural engineering when needed, and ensure all work meets or exceeds local building codes. This integrated approach means you have a single point of contact—no need to coordinate between separate architects, engineers, and contractors. Our design-build methodology ensures that the design is both beautiful and buildable, with cost estimates that reflect real-world construction requirements. This streamlined process is one reason homeowners throughout the [Your City] area choose us for their high-end remodeling projects.",
  },
  {
    question: "What brands of appliances and materials do you install in luxury remodels?",
    answer:
      "We partner exclusively with premium appliance manufacturers and material suppliers to deliver the quality our clients expect. For luxury kitchen remodels, we install top-tier brands including Sub-Zero, Wolf, Thermador, Miele, and Viking appliances. Our custom cabinetry comes from trusted manufacturers specializing in high-end residential construction, featuring soft-close mechanisms, premium hardware, and custom finishes. We source natural stone countertops, including marble, quartzite, and exotic granites, from reputable suppliers. For bathroom renovations, we work with luxury brands like Kohler, Toto, and Kallista. As a licensed general contractor, we maintain relationships with these premium suppliers, ensuring competitive pricing and timely delivery. All materials are selected to match your design vision while meeting our exacting standards for durability and craftsmanship.",
  },
  {
    question: "Are you licensed and insured, and what areas do you serve?",
    answer:
      "Yes, Braxley Nevim Elite Remodeling LLC is fully licensed, bonded, and insured as a general contractor, providing complete protection for your investment. We carry comprehensive general liability insurance, workers' compensation coverage, and are bonded in accordance with state requirements. Our licensing ensures we meet all regulatory standards for residential construction and remodeling work. We proudly serve the [Your City] area and surrounding communities, bringing our design-build expertise to luxury home renovations throughout the region. Our service area includes [City 1], [City 2], [City 3], and nearby neighborhoods. Whether you're planning a whole-home renovation, custom home construction, or a focused kitchen or bathroom remodel, our licensed team is equipped to handle projects of any scale. We're committed to maintaining the highest standards of professionalism and craftsmanship in every community we serve.",
  },
  {
    question: "What sets your design-build approach apart from traditional general contractors?",
    answer:
      "Our design-build methodology combines architectural design, project management, and construction expertise under one roof, eliminating the communication gaps and cost overruns common with traditional general contractor arrangements. Unlike contractors who work from separate architect drawings, our in-house design team creates plans that are both aesthetically stunning and construction-efficient. This integrated approach means we can provide accurate cost estimates from day one, identify potential challenges early, and make real-time design adjustments that save time and money. As a licensed general contractor with design-build capabilities, we handle everything from initial concept sketches to final walkthrough, ensuring your luxury home renovation stays on schedule and within budget. Our clients benefit from a single point of accountability, streamlined decision-making, and a team that understands both the artistic and technical aspects of high-end residential construction throughout the [Your City] area.",
  },
];

export const SeoFaq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Generate FAQPage JSON-LD schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      {/* FAQPage JSON-LD Schema */}
      <JsonLd data={faqSchema} />

      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about working with a luxury general contractor
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {faqData.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className={cn(
                    "border border-border rounded-lg overflow-hidden",
                    "bg-background transition-all duration-200",
                    isOpen && "shadow-md"
                  )}
                >
                  {/* Question Button */}
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className={cn(
                      "w-full px-6 py-5 text-left",
                      "flex items-center justify-between gap-4",
                      "hover:bg-muted/50 transition-colors duration-200",
                      "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    )}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span className="text-lg font-semibold text-foreground pr-8">
                      {item.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    </motion.div>
                  </button>

                  {/* Answer Content */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 pt-0">
                          <p className="text-muted-foreground leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

