import { Metadata } from "next";
import { Suspense } from "react";
import { ProjectsPageContent } from "./projects-content";

export const metadata: Metadata = {
  title: "Portfolio of Mandates | Elite Construction Projects",
  description:
    "Explore our portfolio of elite construction projects including luxury residential renovations, hospitality transformations, infrastructure development, and structural engineering excellence.",
  keywords: [
    "Construction Portfolio",
    "Luxury Home Projects",
    "Hospitality Construction",
    "Infrastructure Projects",
    "Structural Engineering",
    "Elite Remodeling",
    "Commercial Construction",
    "Residential Projects",
    "Hotel Renovation",
    "Architectural Projects",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://braxleynevim.com/projects",
    siteName: "Braxley Nevim Elite Remodeling LLC",
    title: "Portfolio of Mandates | Elite Construction Projects",
    description:
      "Explore our portfolio of elite construction projects including luxury residential renovations, hospitality transformations, and infrastructure development.",
    images: [
      {
        url: "https://braxleynevim.com/img/projects/portfolio-og.jpg",
        width: 1200,
        height: 630,
        alt: "Braxley Nevim Portfolio - Elite Construction Projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio of Mandates | Elite Construction Projects",
    description:
      "Explore our portfolio of elite construction projects and architectural excellence.",
    images: ["/img/projects/portfolio-og.jpg"],
  },
  alternates: {
    canonical: "https://braxleynevim.com/projects",
  },
};

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ProjectsPageContent />
    </Suspense>
  );
}
