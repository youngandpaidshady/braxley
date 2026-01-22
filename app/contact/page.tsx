import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = {
  title: "Contact Us | Get a Free Quote",
  description:
    "Get in touch with Braxley Nevim Elite Remodeling LLC to start your next construction project. Request a free consultation for luxury residential, commercial, or healthcare construction.",
  keywords: [
    "Contact General Contractor",
    "Free Construction Quote",
    "Remodeling Consultation",
    "Construction Estimate",
    "Luxury Home Builder Contact",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://braxleynevim.com/contact",
    siteName: "Braxley Nevim Elite Remodeling LLC",
    title: "Contact Us | Get a Free Quote | Braxley Nevim",
    description:
      "Request a free consultation for your next luxury construction or remodeling project.",
    images: [
      {
        url: "https://braxleynevim.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Braxley Nevim Elite Remodeling",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Braxley Nevim Elite Remodeling",
    description:
      "Request a free consultation for your next luxury construction project.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://braxleynevim.com/contact",
  },
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

