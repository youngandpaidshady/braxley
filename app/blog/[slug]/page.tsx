import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import Image from "next/image";
import { BlogSchema } from "@/components/seo/blog-schema";
import { Button } from "@/components/ui/button";

// Import blog posts data (in production, fetch from CMS)
import { getAllPosts, getPostBySlug } from "@/lib/blog-data";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Braxley Nevim Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: "article",
      publishedTime: post.datePublished,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      {/* JSON-LD Schema */}
      <BlogSchema
        currentPost={{
          title: post.title,
          description: post.excerpt,
          image: post.image,
          datePublished: post.datePublished,
          slug: post.slug,
          author: "Braxley Nevim Elite Remodeling LLC",
        }}
        siteUrl="https://braxleynevim.com"
      />

      <article className="min-h-screen bg-background">
        {/* Hero Section with Featured Image */}
        <div className="relative">
          {/* Featured Image */}
          <div className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] bg-muted">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          </div>

          {/* Back Button - Fixed */}
          <div className="absolute top-20 sm:top-24 left-4 sm:left-6 lg:left-8 z-10">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="bg-background/80 backdrop-blur-sm hover:bg-background border border-border rounded-full px-4"
            >
              <Link href="/blog" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
                <span className="text-xs font-mono uppercase tracking-wider">Blog</span>
              </Link>
            </Button>
          </div>

          {/* Title Section - Overlapping image */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative -mt-32 sm:-mt-40 z-10">
            <div className="bg-background rounded-xl p-6 sm:p-8 md:p-10 shadow-xl border border-border">
              {/* Category Badge */}
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-primary/10 border border-primary/30 text-primary font-mono text-[10px] uppercase tracking-wider font-bold rounded-full">
                  {post.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground leading-tight mb-4">
                {post.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-primary" strokeWidth={1.5} />
                  {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-primary" strokeWidth={1.5} />
                  {post.readTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-primary" strokeWidth={1.5} />
                  Braxley Nevim
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-8 md:py-12">
          {/* Excerpt */}
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 font-serif italic border-l-4 border-primary pl-4">
            {post.excerpt}
          </p>

          {/* Main Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="text-foreground leading-relaxed space-y-6">
              {post.content}
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-4">
                Related Topics
              </p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-secondary text-foreground font-mono text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Back to Blog */}
          <div className="mt-12 pt-8 border-t border-border">
            <Button
              asChild
              variant="outline"
              className="font-mono text-xs uppercase tracking-wider"
            >
              <Link href="/blog" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
                Back to All Articles
              </Link>
            </Button>
          </div>
        </div>
      </article>
    </>
  );
}
