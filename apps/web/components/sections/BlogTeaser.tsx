"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BlogTeaserSection, BlogPost } from "@tathastu/types";
import { fetchStrapi } from "@/lib/api";
import { ArrowRight, Calendar, Tag } from "lucide-react";

interface BlogTeaserProps {
  section: BlogTeaserSection;
}

export default function BlogTeaser({ section }: BlogTeaserProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const limit = section.count || 3;
        const res = await fetchStrapi<{ data: BlogPost[] }>(
          `/blog-posts?sort=publishedDate:desc&pagination[limit]=${limit}&populate=*`
        );
        if (res && res.data) {
          setPosts(res.data);
        }
      } catch (err) {
        console.error("Failed to load blog posts in teaser:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, [section.count]);

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header content */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight leading-tight">
              {section.heading}
            </h2>
            <div className="w-20 h-1.5 bg-brand-orange rounded-full" />
          </div>

          {section.ctaLabel && (
            <Link
              href={section.ctaHref}
              className="inline-flex items-center gap-1.5 text-base font-bold text-brand-primary hover:text-brand-orange transition-colors group cursor-pointer"
            >
              <span>{section.ctaLabel}</span>
              <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>

        {/* Loading Skeletons */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="bg-gray-50 rounded-3xl h-96 animate-pulse" />
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post, idx) => (
              <article
                key={post.id || idx}
                className="group bg-brand-light rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  {/* Category & Date bar */}
                  <div className="p-6 pb-2 flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-widest">
                    <span className="flex items-center gap-1 text-brand-primary">
                      <Tag size={12} />
                      {post.category || "General"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {formatDate(post.publishedDate)}
                    </span>
                  </div>

                  {/* Title & Excerpt */}
                  <div className="px-6 py-2 flex flex-col gap-3">
                    <h3 className="text-xl font-bold text-brand-dark group-hover:text-brand-primary transition-colors leading-snug">
                      <Link href={`/blog/${post.slug}`} className="cursor-pointer">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* View Details CTA */}
                <div className="p-6 pt-4 border-t border-gray-200/50">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs font-bold text-brand-dark group-hover:text-brand-primary flex items-center gap-1 group-hover:gap-2 transition-all cursor-pointer"
                  >
                    <span>View Details</span>
                    <span>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 font-medium bg-gray-50 rounded-2xl">
            No articles published yet.
          </div>
        )}
      </div>
    </section>
  );
}
