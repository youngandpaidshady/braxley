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
import { AmbientGlow } from "@/components/AmbientGlow";
import { SectionTracker } from "@/components/SectionTracker";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { BackToTop } from "@/components/ui/back-to-top";
import { Toaster } from "@/components/ui/sonner";
import { LocalBusinessJsonLd } from "@/components/seo/JsonLd";
import { StructuredData } from "@/components/seo/structured-data";
import { CookieBanner } from "@/components/ui/cookie-banner";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover" as const,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://braxleynevim.com"),
  title: {
    default: "Braxley Nevim | Elite Remodeling LLC | Architectural Excellence",
    template: "%s | Braxley Nevim Elite Remodeling LLC",
  },
  description:
    "Enterprise-grade general contracting specializing in healthcare, hospitality, and high-end residential construction.",
  keywords: [
    "General Contractor",
    "Healthcare Construction",
    "Luxury Home Builder",
    "Commercial Build-out",
    "Hospitality Construction",
    "Enterprise Construction",
    "OSHPD Compliant",
    "LEED Certified",
    "Commercial General Contractor",
    "High-End Residential",
    "Medical Facility Construction",
    "Hotel Renovation",
  ],
  authors: [{ name: "Braxley Nevim Elite Remodeling LLC" }],
  creator: "Braxley Nevim Elite Remodeling LLC",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://braxleynevim.com",
    siteName: "Braxley Nevim Elite Remodeling LLC",
    title: "Braxley Nevim | Elite Remodeling LLC | Architectural Excellence",
    description:
      "Enterprise-grade general contracting specializing in healthcare, hospitality, and high-end residential construction.",
    images: [
      {
        url: "https://braxleynevim.com/og-image.jpg", // Use full URL for better social sharing
        width: 1200,
        height: 630,
        alt: "Braxley Nevim Elite Remodeling LLC - Architectural Excellence | Elite Craftsmanship & Design",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Braxley Nevim | Elite Remodeling LLC | Architectural Excellence",
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
  name: "Braxley Nevim Elite Remodeling LLC",
  image: "https://braxleynevim.com/logo.jpg", // Update with actual logo URL
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
  url: "https://braxleynevim.com",
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
        className={`${GeistSans.variable} ${GeistMono.variable} ${playfairDisplay.variable} font-sans antialiased bg-background h-full`}
        suppressHydrationWarning
      >
        {/* JSON-LD Structured Data for SEO */}
        <LocalBusinessJsonLd data={businessData} />
        <StructuredData />
        
        {/* Theme Provider - Wraps entire app for dark/light mode */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="braxley-nevim-theme"
          disableTransitionOnChange={false}
        >
          {/* Ambient Glow - Background depth effect */}
          <AmbientGlow />
          
          {/* Preloader Provider - Wraps children to manage preloader state */}
          <PreloaderProvider>
            <Navbar />
            {/* Main Content Wrapper - Must have solid background and higher z-index */}
            <div className="relative z-10 bg-background w-full overflow-x-hidden max-w-full">
              <main className="min-h-screen pt-16 sm:pt-20 md:pt-20 lg:pt-20 pb-0 overflow-x-hidden bg-background w-full max-w-full relative" style={{ WebkitOverflowScrolling: 'touch' }}>
                {children}
              </main>
            </div>
            {/* Sticky Footer - Static on mobile, fixed on desktop */}
            <StickyFooter />
          </PreloaderProvider>
          
          {/* Noscript fallback - Show content if JavaScript is disabled */}
          <noscript>
            <style>{`
              [class*="opacity-0"], [class*="invisible"] {
                opacity: 1 !important;
                visibility: visible !important;
              }
            `}</style>
          </noscript>
          
          {/* Emergency fallback script - Shows content immediately if preloader is stuck */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  // Mark JS as enabled immediately
                  document.documentElement.classList.add('js-enabled');
                  
                  // Show content immediately if preloader is blocking
                  function showContent() {
                    var contentDivs = document.querySelectorAll('[class*="opacity-0"], [style*="opacity: 0"]');
                    contentDivs.forEach(function(div) {
                      if (!div.closest('[class*="preloader"], [class*="Preloader"]')) {
                        div.style.opacity = '1';
                        div.style.visibility = 'visible';
                      }
                    });
                    
                    // Also hide preloader if it's stuck
                    var preloader = document.querySelector('[class*="z-[10000]"][class*="bg-primary"]');
                    if (preloader) {
                      setTimeout(function() {
                        preloader.style.display = 'none';
                      }, 2000);
                    }
                  }
                  
                  // Run immediately
                  showContent();
                  
                  // Also run after 2 seconds as backup
                  setTimeout(showContent, 2000);
                  
                  // Final backup after 3 seconds
                  setTimeout(showContent, 3000);
                })();
              `,
            }}
          />
        </ThemeProvider>


        {/* Section Tracker - Desktop navigation aid */}
        <SectionTracker />

        {/* Scroll Progress Bar */}
        <ScrollProgress />

        {/* Back to Top Button */}
        <BackToTop />

        {/* Toast Notifications */}
        <Toaster />

        {/* Cookie Consent Banner */}
        <CookieBanner />
      </body>
    </html>
  );
}
