import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ivanremodeling.com"; // Update with your actual domain

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ];

  // Service pages - Structure ready for database integration
  const services = [
    {
      slug: "luxury-kitchens",
      title: "Luxury Kitchens",
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      slug: "bathroom-renovation",
      title: "Bathroom Renovation",
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      slug: "commercial-build",
      title: "Commercial Build",
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      slug: "full-gut-reno",
      title: "Full Gut Renovation",
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      slug: "interior-remodeling",
      title: "Interior Remodeling",
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      slug: "general-contracting",
      title: "General Contracting",
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  const servicePages = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: service.changeFrequency,
    priority: service.priority,
  }));

  // Project pages - Structure ready for database integration
  // In production, fetch from database/API
  const projects = [
    {
      slug: "modern-kitchen-transformation",
      title: "Modern Kitchen Transformation",
      lastModified: new Date("2024-01-15"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      slug: "luxury-master-bathroom",
      title: "Luxury Master Bathroom",
      lastModified: new Date("2024-01-10"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      slug: "open-concept-living-space",
      title: "Open Concept Living Space",
      lastModified: new Date("2024-01-05"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];

  const projectPages = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: project.lastModified,
    changeFrequency: project.changeFrequency,
    priority: project.priority,
  }));

  return [...staticPages, ...servicePages, ...projectPages];
}

