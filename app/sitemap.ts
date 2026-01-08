import { MetadataRoute } from "next";

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://braxleynevim.com";

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ];

  // Project pages - Using actual project slugs
  const projects = [
    {
      slug: "manhattan-skyline-penthouse",
      lastModified: new Date("2024-01-15"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      slug: "jw-marriott-bonnet-creek",
      lastModified: new Date("2024-01-10"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      slug: "lax-consolidated-rental-car-facility",
      lastModified: new Date("2024-01-05"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      slug: "beverly-hills-elite-residence",
      lastModified: new Date("2024-01-12"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ];

  const projectPages = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: project.lastModified,
    changeFrequency: project.changeFrequency,
    priority: project.priority,
  }));

  return [...staticPages, ...projectPages];
}
