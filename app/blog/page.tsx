import type { Metadata } from "next";
import { BlogCard } from "@/components/blog/blog-card";

export const metadata: Metadata = {
  title: "Remodeling Blog | Ivan Remodeling",
  description:
    "Expert insights, design trends, and remodeling tips from Ivan Remodeling LLC. Stay informed about the latest in luxury home renovations.",
  keywords: [
    "remodeling blog",
    "kitchen design trends",
    "bathroom renovation tips",
    "home improvement",
    "remodeling ROI",
    "building permits",
  ],
};

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
  slug: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    title: "The 2026 Kitchen: Hidden Tech & Warm Woods",
    excerpt:
      "Discover how integrated smart appliances and warm wood finishes are redefining luxury kitchen design. The future of cooking spaces combines invisible technology with natural materials, creating spaces that are both cutting-edge and timeless.",
    date: "Jan 15, 2026",
    image:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1200&h=900&fit=crop&q=90&auto=format",
    category: "Trends",
    slug: "2026-kitchen-hidden-tech-warm-woods",
  },
  {
    title: "Understanding the Permit Process in [City]",
    excerpt:
      "Navigating city permits and zoning regulations can be overwhelming. This comprehensive guide breaks down the permit process, required documentation, inspection timelines, and how to work effectively with city officials to keep your project on track.",
    date: "Jan 10, 2026",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=900&fit=crop&q=90&auto=format",
    category: "Education",
    slug: "understanding-permit-process",
  },
  {
    title: "ROI Analysis: Master Bath Renovations",
    excerpt:
      "A luxury master bathroom renovation can add significant value to your home. We break down the numbers, showing how strategic investments in premium fixtures, natural materials, and thoughtful design deliver exceptional returns while creating your personal sanctuary.",
    date: "Jan 5, 2026",
    image:
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1200&h=900&fit=crop&q=90&auto=format",
    category: "Investment",
    slug: "roi-analysis-master-bath",
  },
];

export default function BlogPage() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header - Architectural Magazine Style */}
        <div className="text-center mb-16 md:mb-20">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground mb-6">
            Field Notes & Insights
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Expert insights, design trends, and remodeling wisdom from the field.
          </p>
        </div>

        {/* Blog Grid - 3 Columns, Rectangular Construction Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <BlogCard
              key={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              date={post.date}
              image={post.image}
              category={post.category}
              slug={`/blog/${post.slug}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

