import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Phone, Linkedin } from "lucide-react";

export const metadata: Metadata = {
  title: "Liora Willow | Operations Director at Braxley Nevim Elite Remodeling",
  description: "Liora Willow is the Operations Director at Braxley Nevim Elite Remodeling LLC, overseeing daily operations and ensuring project excellence.",
  openGraph: {
    title: "Liora Willow - Operations Director",
    description: "Meet Liora Willow, Operations Director at Braxley Nevim Elite Remodeling LLC.",
    images: ["/img/liora-willow.png"],
  },
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
    description: "Liora Willow is the Operations Director at Braxley Nevim Elite Remodeling LLC, responsible for overseeing company operations and ensuring the delivery of high-quality construction projects.",
    sameAs: [
      // Add LinkedIn or other social profiles if available
    ],
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <div className="container px-4 mx-auto max-w-6xl">
        <div className="mb-8">
          <Link
            href="/#team"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Team
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Sidebar / Image Column */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-border bg-muted">
              <Image
                src="/img/liora-willow.png"
                alt="Liora Willow - Operations Director"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="mt-6 space-y-4">
              <div className="p-6 rounded-xl border border-border bg-card/50">
                <h3 className="font-display text-lg font-bold mb-4">Contact</h3>
                <div className="space-y-3">
                  <a href="mailto:info@braxleynevimllc.com" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                    <Mail className="w-4 h-4 mr-3" />
                    info@braxleynevimllc.com
                  </a>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Phone className="w-4 h-4 mr-3" />
                    (774) 347-5579
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="md:col-span-7 lg:col-span-8">
            <div className="mb-2">
              <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-mono uppercase tracking-widest font-bold">
                Operations Director
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Liora Willow
            </h1>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-xl text-muted-foreground leading-relaxed">
                As Operations Director at Braxley Nevim Elite Remodeling LLC, Liora Willow serves as the organizational backbone of the company, ensuring that every project is executed with precision, efficiency, and the highest standards of quality.
              </p>

              <div className="my-8 h-px bg-border max-w-xs" />

              <h3 className="text-2xl font-display font-semibold mb-4">Professional Overview</h3>
              <p>
                Liora acts as the critical bridge between our clients, our on-site craftsmanship teams, and project stakeholders. Her strategic oversight ensures that complex timelines are met without compromising the meticulous attention to detail that defines the Braxley Nevim brand. She manages resource allocation, optimizes workflow processes, and maintains rigorous quality control protocols across all active sites.
              </p>

              <p className="mt-4">
                With a focus on operational excellence, Liora works closely with CEO Braxley Nevim to translate the company&apos;s vision into actionable strategies. Her leadership fosters a culture of accountability and performance, empowering our teams to deliver exceptional results in high-stakes environments, from luxury residential renovations to large-scale commercial build-outs.
              </p>

              <h3 className="text-2xl font-display font-semibold mt-8 mb-4">Key Responsibilities</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none pl-0">
                {[
                  "Strategic Operations Management",
                  "Project Resource Allocation",
                  "Client Relations & Communication",
                  "Quality Assurance Oversight",
                  "Workflow Optimization",
                  "Cross-Functional Team Leadership"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="font-display font-bold text-lg">Braxley Nevim Elite Remodeling LLC</p>
                  <p className="text-sm text-muted-foreground">Excellence in every detail.</p>
                </div>
                <Button asChild variant="outline">
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
