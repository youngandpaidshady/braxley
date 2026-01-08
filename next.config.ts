import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Vercel deployment - no static export needed
  // Vercel will automatically optimize and deploy your Next.js app
  // Remove 'output: export' to enable Vercel's full Next.js capabilities:
  // - Image optimization
  // - Server-side rendering (if needed)
  // - API routes (if needed)
  // - Automatic static optimization
  
  // Set the output file tracing root
  outputFileTracingRoot: path.join(__dirname),
  
  // Configure external image domains
  images: {
    // Image optimization enabled for Vercel
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
        port: "",
        pathname: "/**",
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  
  // Enable Gzip compression
  compress: true,
  
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  
  // Trailing slash for better compatibility
  trailingSlash: true,
};

export default nextConfig;
