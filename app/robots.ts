import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://ivanremodeling.com"; // Update with your actual domain

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"], // Add any private routes here
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

