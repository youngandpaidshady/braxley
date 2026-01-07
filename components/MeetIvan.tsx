"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle, Award, Users, Clock } from "lucide-react";

export const MeetIvan: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  // Signature SVG Animation
  const SignatureSVG = () => (
    <motion.svg
      width="200"
      height="80"
      viewBox="0 0 200 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-accent"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 2, ease: "easeInOut" }}
    >
      <motion.path
        d="M10 50 Q30 30, 50 40 T90 35 T130 40 T170 45"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.text
        x="10"
        y="70"
        fontSize="12"
        fill="currentColor"
        className="font-serif"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 2.5 }}
      >
        Ivan, Owner & Master Craftsman
      </motion.text>
    </motion.svg>
  );

  const stats = [
    { icon: Clock, value: "15+", label: "Years Experience" },
    { icon: Users, value: "500+", label: "Happy Clients" },
    { icon: Award, value: "100%", label: "Satisfaction Rate" },
    { icon: CheckCircle, value: "A+", label: "BBB Rating" },
  ];

  return (
    <section id="about" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image Section */}
            <motion.div variants={itemVariants} className="relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/img/ceo.jpg"
                  alt="Ivan - Owner & Master Craftsman"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </motion.div>

            {/* Content Section */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div>
                <motion.h2
                  variants={itemVariants}
                  className="text-4xl md:text-5xl font-extrabold text-foreground mb-4"
                >
                  Meet Ivan
                </motion.h2>
                <motion.p
                  variants={itemVariants}
                  className="text-xl text-accent font-semibold mb-6"
                >
                  Owner & Master Craftsman
                </motion.p>
              </div>

              <motion.div
                variants={itemVariants}
                className="prose prose-lg max-w-none text-foreground/80 space-y-4"
              >
                <p>
                  With over 15 years of hands-on experience in residential
                  remodeling, I&apos;ve built Ivan Remodeling LLC on a foundation
                  of integrity, precision, and an unwavering commitment to
                  excellence.
                </p>
                <p>
                  Every project is personal to me. I don&apos;t just manage
                  crews—I&apos;m on-site, ensuring every detail meets our exacting
                  standards. From the initial consultation to the final walkthrough,
                  you&apos;ll work directly with me, not a sales team or project
                  coordinator.
                </p>
                <p>
                  My philosophy is simple: treat every home as if it were my own.
                  That means using premium materials, employing skilled artisans,
                  and never cutting corners. Your trust is earned through
                  craftsmanship, not promises.
                </p>
              </motion.div>

              {/* Signature */}
              <motion.div
                variants={itemVariants}
                className="pt-6 border-t border-border"
              >
                <SignatureSVG />
              </motion.div>

              {/* Stats Grid */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8"
              >
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      className="text-center p-4 bg-background rounded-lg shadow-md"
                    >
                      <Icon className="h-8 w-8 text-accent mx-auto mb-2" />
                      <div className="text-2xl font-bold text-foreground mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stat.label}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

