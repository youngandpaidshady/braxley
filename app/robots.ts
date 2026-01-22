import { MetadataRoute } from "next";

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.braxleynevimllc.com"; // Update with your actual domain

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

