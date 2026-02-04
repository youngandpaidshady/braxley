import { Metadata } from "next";
import { ProjectDetailContent } from "./project-detail-content";
import { PROJECTS } from "@/lib/projects-data";

// Generate static params for static export
export async function generateStaticParams() {
  return Object.keys(PROJECTS).map((slug) => ({
    slug: slug,
  }));
}

// Generate metadata for each project
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS[slug];

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://braxleynevim.com";
  const projectUrl = `${siteUrl}/projects/${slug}`;
  const projectImage = project.image.startsWith("http") 
    ? project.image 
    : `${siteUrl}${project.image}`;

  return {
    title: `${project.title} | ${project.location} | Elite Construction Project`,
    description: project.description || project.brief || `Elite ${project.category.toLowerCase()} construction project in ${project.location} by Braxley Nevim Elite Remodeling LLC.`,
    keywords: [
      project.category,
      project.scope,
      project.location,
      "Elite Construction",
      "Luxury Remodeling",
      "Architectural Excellence",
      "General Contractor",
    ],
    openGraph: {
      type: "website",
      locale: "en_US",
      url: projectUrl,
      siteName: "Braxley Nevim Elite Remodeling LLC",
      title: `${project.title} | ${project.location}`,
      description: project.description || project.brief || `Elite ${project.category.toLowerCase()} construction project.`,
      images: [
        {
          url: projectImage,
          width: 1200,
          height: 630,
          alt: `${project.title} - ${project.location} - ${project.scope}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | ${project.location}`,
      description: project.brief || `Elite ${project.category.toLowerCase()} construction project.`,
      images: [projectImage],
    },
    alternates: {
      canonical: projectUrl,
    },
  };
}

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  return <ProjectDetailContent params={params} />;
}
