import dynamic from "next/dynamic";
import { Hero } from "@/components/Hero";
import { ServicesSection } from "@/components/ServicesGrid";
import { ReviewsMarquee } from "@/components/ReviewsMarquee";
import { MeetIvan } from "@/components/MeetIvan";
import { ContactSection } from "@/components/ContactSection";
import { ProjectSkeleton } from "@/components/ui/ProjectSkeleton";
import { FaqGlow } from "@/components/sections/faq-glow";

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
      <ReviewsMarquee />
      <MeetIvan />
      <ReviewsCarousel />
      <ContactSection />
      <FaqGlow />
    </>
  );
}
