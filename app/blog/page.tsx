import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BlogSchema } from "@/components/seo/blog-schema";
import { ModernBlogCard } from "@/components/ui/modern-blog-card";

export const metadata: Metadata = {
  title: "Engineering Insights | Construction Intelligence & 2026 Trends",
  description:
    "Technical breakdowns of structural engineering, seismic retrofitting, and commercial construction management from Braxley Nevim Elite Remodeling LLC.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://braxleynevim.com/blog",
    siteName: "Braxley Nevim Elite Remodeling LLC",
    title: "Engineering Insights | Construction Intelligence & 2026 Trends",
    description:
      "Technical breakdowns of structural engineering, seismic retrofitting, and commercial construction management from Braxley Nevim Elite Remodeling LLC.",
  },
};

const CATEGORIES = ["Structural", "Commercial", "Sustainable", "Compliance"];

// Mock Blog Posts - Replace with CMS data
const POSTS = [
  {
    id: 1,
    title: "Seismic Retrofitting: Navigating New 2026 Urban Compliance Codes",
    excerpt:
      "A comprehensive breakdown of the structural requirements for historic masonry buildings in high-risk zones. We examine the cost-benefit of carbon-fiber reinforcement vs traditional steel.",
    category: "Structural",
    date: "Jan 2026",
    readTime: "12 min read",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=3270&auto=format&fit=crop",
    slug: "seismic-2026",
    datePublished: "2026-01-15",
    timeline: ["Planning", "Survey", "Demo", "Reinforcement", "Final"],
    tags: ["Engineering", "Compliance", "Retrofitting", "Safety"],
    views: 1247,
    featured: true,
  },
  {
    id: 2,
    title: "Smart Glass: The ROI of Dynamic Fenestration in Commercial Build-outs",
    excerpt:
      "Analyzing the energy cost savings of electrochromic glass in commercial office build-outs. Real-world case studies from our LEED Platinum projects.",
    category: "Sustainable",
    date: "Dec 2025",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?q=80&w=3464&auto=format&fit=crop",
    slug: "smart-glass-roi",
    datePublished: "2025-12-10",
    timeline: ["Design", "Installation", "Calibration", "Final"],
    tags: ["Sustainability", "Technology", "Energy Efficiency", "LEED"],
    views: 892,
    featured: true,
  },
  {
    id: 3,
    title: "Navigating OSHPD 3 Requirements for Medical Clinics",
    excerpt:
      "A technical guide to electrical and HVAC compliance for outpatient healthcare facilities. What changed in the 2026 building codes.",
    category: "Compliance",
    date: "Nov 2025",
    readTime: "15 min read",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=3535&auto=format&fit=crop",
    slug: "oshpd-3-requirements",
    datePublished: "2025-11-28",
    timeline: ["Planning", "Inspection", "Compliance", "Final"],
    tags: ["Healthcare", "Compliance", "OSHPD", "Regulations"],
    views: 1563,
    featured: false,
  },
  {
    id: 4,
    title: "2026 Material Trends: Beyond Quartz and Marble",
    excerpt:
      "Why sintered stone and porcelain slabs are taking over the luxury residential market. Performance data and installation best practices.",
    category: "Commercial",
    date: "Oct 2025",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=3200&auto=format&fit=crop",
    slug: "2026-material-trends",
    datePublished: "2025-10-15",
    timeline: ["Research", "Selection", "Installation", "Final"],
    tags: ["Materials", "Trends", "Luxury", "Design"],
    views: 743,
    featured: false,
  },
  {
    id: 5,
    title: "Prefabricated Modular Construction: Speed vs. Quality in 2026",
    excerpt:
      "Exploring the rise of off-site construction methods and their impact on project timelines. Case study analysis from our recent multi-family development projects.",
    category: "Commercial",
    date: "Sep 2025",
    readTime: "10 min read",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=3270&auto=format&fit=crop",
    slug: "prefabricated-modular-construction",
    datePublished: "2025-09-20",
    timeline: ["Design", "Fabrication", "Transport", "Assembly", "Final"],
    tags: ["Modular", "Efficiency", "Innovation", "Construction"],
    views: 1024,
    featured: false,
  },
  {
    id: 6,
    title: "Zero-Waste Construction: Achieving 95% Diverted Materials",
    excerpt:
      "How we achieved near-zero waste on a $2.5M commercial renovation. Detailed breakdown of material sorting, recycling partnerships, and cost savings.",
    category: "Sustainable",
    date: "Aug 2025",
    readTime: "9 min read",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=3269&auto=format&fit=crop",
    slug: "zero-waste-construction",
    datePublished: "2025-08-12",
    timeline: ["Planning", "Sorting", "Recycling", "Documentation", "Final"],
    tags: ["Sustainability", "Waste Management", "Green Building", "LEED"],
    views: 1156,
    featured: true,
  },
  {
    id: 7,
    title: "Acoustic Design in Open-Plan Offices: Beyond Sound Masking",
    excerpt:
      "Advanced acoustic solutions for modern workspaces. Case study of a 50,000 sq ft tech headquarters with STC 60+ partitions and active noise cancellation.",
    category: "Commercial",
    date: "Jul 2025",
    readTime: "11 min read",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=3269&auto=format&fit=crop",
    slug: "acoustic-design-open-plan",
    datePublished: "2025-07-08",
    timeline: ["Analysis", "Design", "Installation", "Testing", "Final"],
    tags: ["Acoustics", "Office Design", "Wellness", "Technology"],
    views: 678,
    featured: false,
  },
  {
    id: 8,
    title: "Historic Preservation: Restoring 1920s Art Deco Facades",
    excerpt:
      "Technical challenges and solutions in restoring original terracotta and cast stone elements. Documentation process for landmark designation compliance.",
    category: "Structural",
    date: "Jun 2025",
    readTime: "14 min read",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=3270&auto=format&fit=crop",
    slug: "historic-preservation-art-deco",
    datePublished: "2025-06-25",
    timeline: ["Assessment", "Documentation", "Restoration", "Inspection", "Final"],
    tags: ["Historic", "Preservation", "Restoration", "Heritage"],
    views: 934,
    featured: false,
  },
];

export default function BlogPage() {
  // Transform posts for schema
  const schemaPosts = POSTS.map((post) => ({
    title: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.datePublished,
    author: "Braxley Nevim Elite Remodeling LLC",
    slug: post.slug,
  }));

  return (
    <>
      {/* JSON-LD Schema */}
      <BlogSchema posts={schemaPosts} siteUrl="https://braxleynevim.com" />

      <main className="pt-32 pb-24 bg-background min-h-screen">
        {/* 1. SEO BREADCRUMBS */}
        <nav
          className="container mb-12 px-4 sm:px-6 lg:px-8"
          aria-label="Breadcrumb"
        >
          <ol className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3 h-3 text-primary" strokeWidth={1.5} aria-hidden="true" />
            </li>
            <li className="text-foreground" aria-current="page">
              Field Notes & Insights
            </li>
          </ol>
        </nav>

        {/* 2. MAIN ARTICLE FEED - Staggered Layout */}
        <section className="container px-4 sm:px-6 lg:px-8 max-w-7xl" aria-label="Blog articles">
          {/* Page Header */}
          <header className="mb-20 max-w-4xl">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif leading-none mb-6 tracking-tighter font-light">
              Field <span className="italic underline decoration-primary/20">Notes.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-[65ch] font-serif">
              In-depth technical analysis on the future of structural integrity and the critical path.
            </p>
          </header>

          {/* Modern Blog Cards - No borders, depth via shadows */}
          <div className="space-y-0">
            {POSTS.map((post, index) => (
              <ModernBlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
