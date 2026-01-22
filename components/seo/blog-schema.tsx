"use client";

import React from "react";

interface BlogPost {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  slug: string;
}

interface BlogSchemaProps {
  posts?: BlogPost[];
  currentPost?: BlogPost;
  siteUrl?: string;
}

export const BlogSchema: React.FC<BlogSchemaProps> = ({
  posts = [],
  currentPost,
  siteUrl = "https://braxleynevim.com",
}) => {
  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${siteUrl}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Field Notes & Insights",
        item: `${siteUrl}/blog`,
      },
    ],
  };

  // BlogPosting Schema for individual posts
  const blogPostingSchemas = posts.map((post, index) => ({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.datePublished,
    dateModified: post.dateModified || post.datePublished,
    author: {
      "@type": "Organization",
      name: "Braxley Nevim Elite Remodeling LLC",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Braxley Nevim Elite Remodeling LLC",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${post.slug}`,
    },
  }));

  // Current post schema (if viewing individual post)
  const currentPostSchema = currentPost
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: currentPost.title,
        description: currentPost.description,
        image: currentPost.image,
        datePublished: currentPost.datePublished,
        dateModified: currentPost.dateModified || currentPost.datePublished,
        author: {
          "@type": "Organization",
          name: "Braxley Nevim Elite Remodeling LLC",
          url: siteUrl,
        },
        publisher: {
          "@type": "Organization",
          name: "Braxley Nevim Elite Remodeling LLC",
          logo: {
            "@type": "ImageObject",
            url: `${siteUrl}/logo.png`,
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${siteUrl}/blog/${currentPost.slug}`,
        },
      }
    : null;

  return (
    <>
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Blog Posting Schemas */}
      {blogPostingSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Current Post Schema (if viewing individual post) */}
      {currentPostSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(currentPostSchema) }}
        />
      )}
    </>
  );
};

