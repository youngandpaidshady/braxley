import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

// Import Playfair Display for headings
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair-display",
  display: "swap",
});
import { Navbar } from "@/components/Navbar";
import { StickyFooter } from "@/components/StickyFooter";
import { PreloaderProvider } from "@/components/PreloaderProvider";
import { CustomCursor } from "@/components/CustomCursor";
import { FilmGrain } from "@/components/FilmGrain";
import { AmbientGlow } from "@/components/AmbientGlow";
import { SectionTracker } from "@/components/SectionTracker";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { BackToTop } from "@/components/ui/back-to-top";
import { Toaster } from "@/components/ui/sonner";
import { LocalBusinessJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ivanremodeling.com"),
  title: {
    default: "Ivan Remodeling | Luxury Home Renovations",
    template: "%s | Ivan Remodeling",
  },
  description:
    "Premier general contractor specializing in high-end kitchen, bath, and whole-home remodeling.",
  keywords: [
    "luxury remodeling",
    "luxury general contractor",
    "high-end kitchen remodel",
    "custom home builder",
    "premium bathroom renovation",
    "luxury home renovation",
    "elite craftsmanship",
    "residential remodeling",
    "kitchen remodeling",
    "bathroom remodeling",
    "general contractor",
    "whole home renovation",
    "custom home construction",
  ],
  authors: [{ name: "Ivan Remodeling LLC" }],
  creator: "Ivan Remodeling LLC",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ivanremodeling.com",
    siteName: "Ivan Remodeling LLC",
    title: "Ivan Remodeling | Luxury Home Renovations",
    description:
      "Premier general contractor specializing in high-end kitchen, bath, and whole-home remodeling.",
    images: [
      {
        url: "https://ivanremodeling.com/og-image.jpg", // Use full URL for better social sharing
        width: 1200,
        height: 630,
        alt: "Ivan Remodeling - Luxury Home Renovations | Premium Kitchen, Bath & Whole Home Remodeling",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ivan Remodeling LLC | Elite Craftsmanship",
    description:
      "Reimagining spaces with premium quality and attention to detail.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add Google Search Console verification when available
    // google: "verification_token_here",
  },
};

// JSON-LD Structured Data for LocalBusiness & GeneralContractor
// Update these values with your actual business information
const businessData = {
  name: "Ivan Remodeling LLC",
  image: "https://ivanremodeling.com/logo.jpg", // Update with actual logo URL
  telephone: "+1-234-567-8900", // Update with actual phone number
  address: {
    streetAddress: "123 Main Street", // Update with actual address
    addressLocality: "City Name", // Update with actual city
    addressRegion: "State", // Update with actual state
    postalCode: "12345", // Update with actual ZIP code
    addressCountry: "US",
  },
  priceRange: "$$$$", // Luxury pricing tier
  areaServed: [
    "City Name", // Update with actual service areas
    "Surrounding Areas",
  ],
  openingHours: [
    "Mo-Fr 08:00-18:00",
    "Sa 09:00-15:00",
  ],
  url: "https://ivanremodeling.com",
  description: "Premier general contractor specializing in high-end kitchen, bath, and whole-home remodeling.",
  aggregateRating: {
    ratingValue: "4.9", // Update with actual rating
    reviewCount: "50", // Update with actual review count
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} ${playfairDisplay.variable} font-sans antialiased custom-cursor-active bg-background`}
        suppressHydrationWarning
      >
        {/* JSON-LD Structured Data for SEO */}
        <LocalBusinessJsonLd data={businessData} />
        
        {/* Theme Provider - Wraps entire app for dark/light mode */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="ivan-remodeling-theme"
          disableTransitionOnChange={false}
        >
          {/* Ambient Glow - Background depth effect */}
          <AmbientGlow />
          
          {/* Preloader Provider - Wraps children to manage preloader state */}
          <PreloaderProvider>
            <Navbar />
            {/* Main Content Wrapper - Must have solid background and higher z-index */}
            <div className="relative z-10 bg-background w-full overflow-x-hidden max-w-full">
              <main className="min-h-screen pt-24 md:pt-20 lg:pt-24 pb-0 md:pb-[600px] lg:pb-[700px] overflow-x-hidden bg-background w-full max-w-full">
                {children}
              </main>
            </div>
            {/* Sticky Footer - Static on mobile, fixed on desktop */}
            <StickyFooter />
          </PreloaderProvider>
        </ThemeProvider>

        {/* Film Grain Overlay - Tactile texture */}
        <FilmGrain />

        {/* Section Tracker - Desktop navigation aid */}
        <SectionTracker />

        {/* Custom Cursor */}
        <CustomCursor />

        {/* Scroll Progress Bar */}
        <ScrollProgress />

        {/* Back to Top Button */}
        <BackToTop />

        {/* Toast Notifications */}
        <Toaster />
      </body>
    </html>
  );
}
