import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = {
  title: "Contact Us | Braxley Nevim Elite Remodeling LLC",
  description:
    "Get in touch with Braxley Nevim Elite Remodeling LLC to start your next remodeling project. We're here to bring your vision to life.",
};

export default function ContactPage() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Newspaper Editorial Style Header */}
          <div className="border-b border-foreground/20 mb-8 pb-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-primary font-bold">
          <span>Project Submission</span>
          <span>Vol. 2022.01</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-serif font-extrabold text-foreground mb-4 tracking-tight">
          Submit a Project <span className="italic">Mandate.</span>
        </h1>
          <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary font-bold mb-12 leading-relaxed">
          Ready to transform your space? Let&apos;s discuss your project.
        </p>
        <ContactForm />
      </div>
    </section>
  );
}

