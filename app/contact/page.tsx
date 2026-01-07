import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = {
  title: "Contact Us | Ivan Remodeling LLC",
  description:
    "Get in touch with Ivan Remodeling LLC to start your next remodeling project. We're here to bring your vision to life.",
};

export default function ContactPage() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ContactForm />
      </div>
    </section>
  );
}

