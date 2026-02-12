"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Phone, Linkedin } from "lucide-react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

// Helper for 3D Tilt
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 50 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 50 });

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPct = (clientX - left) / width - 0.5;
    const yPct = (clientY - top) / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);
  const brightness = useTransform(mouseY, [-0.5, 0.5], [1.1, 0.9]);

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      <motion.div
        style={{
          filter: process.env.NODE_ENV === "development" ? undefined : `brightness(${brightness})`, // optimize filter in dev
          transform: "translateZ(20px)",
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function LioraWillowPage() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Liora Willow",
    jobTitle: "Operations Director",
    worksFor: {
      "@type": "Organization",
      name: "Braxley Nevim Elite Remodeling LLC",
      url: "https://www.braxleynevimllc.com",
    },
    url: "https://www.braxleynevimllc.com/team/liora-willow",
    image: "https://www.braxleynevimllc.com/img/liora-willow.png",
    description:
      "Liora Willow is the Operations Director at Braxley Nevim Elite Remodeling LLC, responsible for overseeing company operations and ensuring the delivery of high-quality construction projects.",
    email: "Liorawillow@outlook.com",
    telephone: "+19568145748",
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <div className="container px-4 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/#team"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Team
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Sidebar / Image Column */}
          <div className="md:col-span-5 lg:col-span-4 sticky top-24">
            <TiltCard className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-border bg-muted shadow-2xl">
              <Image
                src="/img/liora-willow.png"
                alt="Liora Willow - Operations Director"
                fill
                className="object-cover"
                priority
              />
            </TiltCard>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-6 space-y-4"
            >
              <div className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm shadow-sm">
                <h3 className="font-display text-lg font-bold mb-4">Contact</h3>
                <div className="space-y-3">
                  <a
                    href="mailto:Liorawillow@outlook.com"
                    className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors hover:scale-105 transform duration-200 origin-left"
                  >
                    <Mail className="w-4 h-4 mr-3 text-primary" />
                    Liorawillow@outlook.com
                  </a>
                  <a
                    href="tel:+19568145748"
                    className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors hover:scale-105 transform duration-200 origin-left"
                  >
                    <Phone className="w-4 h-4 mr-3 text-primary" />
                    +1 (956) 814-5748
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Content Column */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="md:col-span-7 lg:col-span-8"
          >
            <motion.div variants={fadeInUp} className="mb-2">
              <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-mono uppercase tracking-widest font-bold shdow-sm">
                Operations Director
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6"
            >
              Liora Willow
            </motion.h1>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <motion.p
                variants={fadeInUp}
                className="text-xl text-muted-foreground leading-relaxed"
              >
                As Operations Director at Braxley Nevim Elite Remodeling LLC, Liora Willow serves as the organizational backbone of the company, ensuring that every project is executed with precision, efficiency, and the highest standards of quality.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="my-8 h-px bg-border max-w-xs"
              />

              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                <h3 className="text-2xl font-display font-semibold mb-4">Professional Overview</h3>
                <p>
                  Liora acts as the critical bridge between our clients, our on-site craftsmanship teams, and project stakeholders. Her strategic oversight ensures that complex timelines are met without compromising the meticulous attention to detail that defines the Braxley Nevim brand. She manages resource allocation, optimizes workflow processes, and maintains rigorous quality control protocols across all active sites.
                </p>

                <p className="mt-4">
                  With a focus on operational excellence, Liora works closely with CEO Braxley Nevim to translate the company&apos;s vision into actionable strategies. Her leadership fosters a culture of accountability and performance, empowering our teams to deliver exceptional results in high-stakes environments, from luxury residential renovations to large-scale commercial build-outs.
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                <h3 className="text-2xl font-display font-semibold mt-8 mb-4">Key Responsibilities</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none pl-0">
                  {[
                    "Strategic Operations Management",
                    "Project Resource Allocation",
                    "Client Relations & Communication",
                    "Quality Assurance Oversight",
                    "Workflow Optimization",
                    "Cross-Functional Team Leadership",
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      variants={{
                        hidden: { opacity: 0, x: -10 },
                        visible: { opacity: 1, x: 0, transition: { delay: i * 0.1 } },
                      }}
                      className="flex items-start p-2 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <span className="mr-2 text-primary">•</span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <motion.div
              variants={fadeInUp}
              className="mt-12 pt-8 border-t border-border"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="font-display font-bold text-lg">Braxley Nevim Elite Remodeling LLC</p>
                  <p className="text-sm text-muted-foreground">Excellence in every detail.</p>
                </div>
                <Button asChild variant="outline" className="group">
                  <Link href="/contact">
                    Get in Touch
                    <ArrowLeft className="w-4 h-4 ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

