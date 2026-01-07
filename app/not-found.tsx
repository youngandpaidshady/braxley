import Link from "next/link";
import { Hammer } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "404 - Page Not Found",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
        {/* Construction Icon */}
        <div className="mb-8 flex justify-center">
          <Hammer className="h-32 w-32 text-primary/20" />
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground mb-6">
          This page is under construction.
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed">
          We&apos;re building something amazing here. In the meantime, let&apos;s get
          you back to the main site.
        </p>

        {/* CTA Button */}
        <Button
          variant="default"
          size="lg"
          className="rounded-full px-8 py-6 text-lg font-semibold"
          asChild
        >
          <Link href="/">
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
