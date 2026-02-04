"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const TEAM = [
  { 
    name: "Marcus Thorne", 
    role: "Operations Director", 
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=3387&auto=format&fit=crop" 
  },
  { 
    name: "Sarah Jenkins", 
    role: "Lead Architect", 
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=3388&auto=format&fit=crop" 
  }
];

export function CeoMessage() {
  return (
    <>
      {/* PART 1: CEO MESSAGE (NEWSPAPER WRAP) */}
      <section id="about" className="py-24 bg-background">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto block">
            <div className="border-b border-primary/40 mb-8 pb-2 flex justify-between font-mono text-[10px] uppercase tracking-widest">
              <span className="text-primary font-bold">Principal&apos;s Correspondence</span>
              <span className="text-primary font-bold">Vol. 2022.01</span>
            </div>

            <div className="block overflow-hidden">
              <h2 className="font-serif text-4xl md:text-6xl mb-10 leading-tight tracking-tight text-foreground">
                Meet Our CEO
              </h2>

              {/* SMALL NEWSPAPER IMAGE - Scaled for Mobile Wrap */}
              <div className="float-left w-[180px] mr-4 mb-2 sm:w-[360px] sm:mr-10 sm:mb-6 border border-border p-1 bg-background transition-all">
                <div className="relative aspect-[3/4]">
                  <Image 
                    src="/img/ceo.jpg" 
                    alt="Braxley Nevim" 
                    fill 
                    className="object-cover"
                    sizes="(max-width: 640px) 180px, 360px"
                    priority
                  />
                </div>
                <div className="mt-2 hidden sm:block border-l border-primary pl-2">
                  <p className="font-mono text-[9px] uppercase font-bold text-primary">B. Nevim</p>
                </div>
              </div>

              {/* TEXT CONTENT - Forced Wrap (CEO Bio) */}
              <div className="text-foreground font-serif text-[15px] sm:text-xl leading-relaxed text-justify hyphens-auto break-words">
                <span className="float-left text-5xl sm:text-7xl font-serif mr-2 mt-1 leading-[0.7] text-primary">B</span>
                raxley Nevim is the visionary founder and CEO of Braxley Nevim Elite Remodeling LLC, bringing over 15 years of hands-on remodeling experience to every project.
                <br /><br />
                With a lifelong passion for craftsmanship and design, he started the company to deliver elite-level renovations built on integrity, precision, and exceptional customer service. As a hands-on leader, he personally oversees critical phases of each job, ensuring the highest standards of quality and client satisfaction. He believes in building lasting relationships with clients and team members alike, treating every home with the same respect and care he would his own.
              </div>
            </div>
            
            {/* SIGNATURE BLOCK - Universal Bronze Override */}
            <div className="clear-both mt-8 pt-6 border-t border-primary/20">
              <p className="font-serif italic text-2xl text-foreground">Braxley Nevim</p>
              <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary font-bold mt-1">
                Owner & Master Craftsman | Braxley Nevim Elite Remodeling LLC
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PART 2: MEET OUR TEAM (SLIDE CARDS) */}
      <section className="relative z-10 py-24 bg-background border-t border-primary/40 block overflow-visible">
        <div className="container px-4 max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-2">Personnel</p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground">Meet Our Team.</h2>
          </div>

          {/* Scrollable Container */}
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 lg:grid lg:grid-cols-2 lg:overflow-visible lg:gap-8">
            {TEAM.map((member, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="min-w-[85vw] md:min-w-[450px] lg:min-w-0 snap-center group flex-shrink-0"
              >
                <div className="relative aspect-[4/5] mb-6 overflow-hidden border border-primary/40 bg-muted">
                  <Image 
                    src={member.img} 
                    alt={member.name} 
                    fill 
                    className="object-cover transition-all duration-700" 
                    sizes="(max-width: 1024px) 85vw, 50vw"
                  />
                </div>
                <h4 className="font-serif text-2xl mb-1 text-foreground">{member.name}</h4>
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary font-bold">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
