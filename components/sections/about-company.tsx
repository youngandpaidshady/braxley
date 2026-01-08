"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Clock, Users, Award, CheckCircle } from "lucide-react";

export function AboutCompany() {
  return (
    <section id="about" className="relative w-full py-12 md:py-20 lg:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Masthead */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="border-b border-primary/40 mb-12 md:mb-16 pb-6"
        >
          <h2 className="font-serif italic text-4xl md:text-6xl text-foreground mb-2">
            Braxley Nevim
          </h2>
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary font-bold">
            ELITE REMODELING LLC • MASTER CRAFTSMAN COLLECTIVE
          </p>
        </motion.div>

        {/* Layout: Float on Mobile, Grid on Desktop */}
        <div className="mb-16 lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Company Image - Float Left on Mobile, Grid on Desktop */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            className="float-left w-[35%] sm:w-[32%] max-w-[240px] mr-4 sm:mr-6 mb-4 lg:float-none lg:w-full lg:col-span-1"
          >
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="border border-border p-1 bg-card">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src="/img/about.jpg"
                    alt="Braxley Nevim Elite Remodeling - Modern Architecture"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 35vw, (max-width: 1024px) 32vw, 400px"
                  />
                </div>
                <div className="mt-3 pt-2 border-t border-primary/40">
                  <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-primary font-bold">
                    Est. 2010 • Beverly Hills
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text Content - Wraps Around Image on Mobile */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-foreground lg:col-span-2"
          >
            <div className="space-y-6">
              <p className="text-base sm:text-lg md:text-xl leading-relaxed first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-primary first-letter:leading-none">
                Founded on the principles of exceptional craftsmanship and
                unwavering attention to detail, Braxley Nevim Elite Remodeling has
                become synonymous with luxury residential transformation in
                Southern California.
              </p>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed">
                Our team of master craftsmen brings together decades of combined
                experience in high-end construction, architectural design, and
                project management. We specialize in complete home renovations,
                custom additions, and bespoke interior transformations.
              </p>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed">
                Every project we undertake is a testament to our commitment to
                excellence. From initial consultation to final walkthrough, we
                ensure that every detail meets our exacting standards and exceeds
                our clients&apos; expectations.
              </p>
            </div>
          </motion.div>
          
          {/* Clear Float on Mobile */}
          <div className="clear-both lg:clear-none"></div>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-primary/40"
        >
          <div className="flex flex-col items-center text-center space-y-2">
            <Clock className="w-8 h-8 text-primary" strokeWidth={1.5} />
            <span className="text-2xl font-bold">15+</span>
            <span className="font-mono text-[8px] uppercase tracking-widest text-primary">Years Experience</span>
          </div>
          <div className="flex flex-col items-center text-center space-y-2">
            <Users className="w-8 h-8 text-primary" strokeWidth={1.5} />
            <span className="text-2xl font-bold">500+</span>
            <span className="font-mono text-[8px] uppercase tracking-widest text-primary">Happy Clients</span>
          </div>
          <div className="flex flex-col items-center text-center space-y-2">
            <Award className="w-8 h-8 text-primary" strokeWidth={1.5} />
            <span className="text-2xl font-bold">100%</span>
            <span className="font-mono text-[8px] uppercase tracking-widest text-primary">Satisfaction Rate</span>
          </div>
          <div className="flex flex-col items-center text-center space-y-2">
            <CheckCircle className="w-8 h-8 text-primary" strokeWidth={1.5} />
            <span className="text-2xl font-bold">A+</span>
            <span className="font-mono text-[8px] uppercase tracking-widest text-primary">BBB Rating</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
