import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Set the output file tracing root to silence the multiple lockfiles warning
  outputFileTracingRoot: path.join(__dirname),
  
  // Configure external image domains
  images: {
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
  },
  
  // Enable Gzip compression
  compress: true,
  
  // Allow cross-origin requests from local network IPs during development
  allowedDevOrigins: ["192.168.1.73"],
};

export default nextConfig;
