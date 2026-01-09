import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Calendar, Clock, Eye, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { BlogSchema } from "@/components/seo/blog-schema";

// Import blog posts data (in production, fetch from CMS)
import { getAllPosts, getPostBySlug } from "@/lib/blog-data.tsx";

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
        }}
        siteUrl="https://braxleynevim.com"
      />

      <main className="pt-32 pb-24 bg-background min-h-screen">
        {/* Breadcrumbs */}
        <nav className="container mb-8 px-4 sm:px-6 lg:px-8" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3 h-3 text-primary" strokeWidth={1.5} aria-hidden="true" />
            </li>
            <li>
              <Link href="/blog" className="hover:text-primary transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3 h-3 text-primary" strokeWidth={1.5} aria-hidden="true" />
            </li>
            <li className="text-foreground" aria-current="page">
              {post.title}
            </li>
          </ol>
        </nav>

        <article className="container px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
            Back to Articles
          </Link>

          {/* Header */}
          <header className="mb-12">
            {/* Category & Meta */}
            <div className="flex items-center flex-wrap gap-4 mb-6 text-xs font-mono text-muted-foreground uppercase tracking-wider">
              <span className="px-3 py-1.5 bg-primary/10 border border-primary/30 text-primary font-bold">
                {post.category}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
                {post.date}
              </span>
              <span className="text-primary/40">•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
                {post.readTime}
              </span>
              {post.views && (
                <>
                  <span className="text-primary/40">•</span>
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
                    {post.views.toLocaleString()} views
                  </span>
                </>
              )}
            </div>

            {/* Title */}
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight mb-6">
              {post.title}
            </h1>

            {/* Featured Image */}
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-border/50 mb-8">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 896px"
                priority
              />
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="text-lg text-muted-foreground leading-relaxed mb-8 font-serif italic">
              {post.excerpt}
            </div>

            {/* Full Article Content */}
            <div className="article-content text-foreground leading-relaxed space-y-6">
              {post.content}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-primary/20">
                <p className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-4">
                  Tags
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-primary/10 border border-primary/20 text-primary font-mono text-[10px] uppercase tracking-[0.15em] font-bold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </main>
    </>
  );
}
