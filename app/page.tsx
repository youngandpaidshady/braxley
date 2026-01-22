import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/Hero";
import { ServicesSection } from "@/components/ServicesGrid";
import { AboutCompany } from "@/components/sections/about-company";
import { MeetBraxley } from "@/components/MeetIvan";
import { TeamSection } from "@/components/sections/team";
import { ContactSection } from "@/components/ContactSection";
import { ProjectSkeleton } from "@/components/ui/ProjectSkeleton";
import { FaqGlow } from "@/components/sections/faq-glow";

export const metadata: Metadata = {
  title: "Braxley Nevim | Elite Remodeling & Construction | Architectural Excellence",
  description:
    "With over two decades of experience in luxury residential construction, Braxley Nevim has built a reputation for uncompromising quality and attention to detail. Enterprise-grade general contracting specializing in healthcare, hospitality, and high-end residential construction.",
  keywords: [
    "Elite General Contractor",
    "Luxury Home Builder",
    "Healthcare Construction",
    "Hospitality Renovation",
    "Commercial Build-out",
    "OSHPD Compliant",
    "LEED Certified",
    "High-End Residential",
    "Architectural Excellence",
    "Enterprise Construction",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://braxleynevim.com",
    siteName: "Braxley Nevim LLC",
    title: "Braxley Nevim | Elite Remodeling & Construction | Architectural Excellence",
    description:
      "With over two decades of experience in luxury residential construction, Braxley Nevim has built a reputation for uncompromising quality and attention to detail. Enterprise-grade general contracting specializing in healthcare, hospitality, and high-end residential construction.",
    images: [
      {
        url: "https://braxleynevim.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Braxley Nevim Elite Remodeling LLC - Architectural Excellence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Braxley Nevim | Elite Remodeling & Construction | Architectural Excellence",
    description:
      "With over two decades of experience in luxury residential construction, Braxley Nevim has built a reputation for uncompromising quality and attention to detail. Enterprise-grade general contracting specializing in healthcare, hospitality, and high-end residential construction.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://braxleynevim.com",
  },
};

// Lazy load heavy interactive components to improve LCP
const ProjectSlider = dynamic(
  () => import("@/components/ProjectSlider"),
  {
    loading: () => (
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ProjectSkeleton />
        </div>
      </section>
    ),
    ssr: true,
  }
);

const ReviewsCarousel = dynamic(
  () => import("@/components/ReviewsCarousel"),
  {
    loading: () => (
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-64 bg-muted/30 rounded-2xl animate-pulse" />
        </div>
      </section>
    ),
    ssr: true,
  }
);

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <ProjectSlider />
      <AboutCompany />
      <MeetBraxley />
      <TeamSection />
      <ReviewsCarousel />
      <ContactSection />
      <FaqGlow />
    </>
  );
}
