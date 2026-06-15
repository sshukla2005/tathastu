import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import { fetchStrapi } from "@/lib/api";
import { SiteSettings, Industry, BlogPost } from "@tathastu/types";
import { Calendar, Tag, ArrowRight } from "lucide-react";

export const revalidate = 60; // ISR 60s

export async function generateMetadata() {
  return {
    title: "Blog & Insights — Tathastu",
    description: "Stay updated with the latest news, tutorials, workstation sizing guides, and technology insights from Tathastu.",
  };
}

export default async function BlogPage() {
  const [settingsRes, industriesRes, postsRes] = await Promise.all([
    fetchStrapi<{ data: SiteSettings }>("/site-setting?populate[nav][populate]=*&populate[footerColumns][populate]=*&populate[socialLinks][populate]=*&populate[logo][populate]=*"),
    fetchStrapi<{ data: Industry[] }>("/industries?sort=order:asc"),
    fetchStrapi<{ data: BlogPost[] }>("/blog-posts?sort=publishedDate:desc&populate=*"),
  ]);

  const siteSettings = settingsRes?.data;
  const industries = industriesRes?.data || [];
  const posts = postsRes?.data || [];

  if (!siteSettings) return null;

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
    <>
      <Header siteSettings={siteSettings} industries={industries} />

      <main className="flex-grow bg-brand-light py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
            <span className="text-sm font-extrabold tracking-widest text-brand-primary uppercase">
              Latest Insights
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-dark leading-tight">
              Tathastu News & Blog
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Discover tips, hardware recommendations, tutorial updates, and workflow tricks from our visual production engineers.
            </p>
            <div className="w-24 h-1.5 bg-brand-orange mx-auto rounded-full mt-2" />
          </div>

          {/* Grid */}
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    {/* Category & Date */}
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

                    {/* Content */}
                    <div className="px-6 py-2 flex flex-col gap-3">
                      <h3 className="text-xl font-bold text-brand-dark group-hover:text-brand-primary transition-colors leading-snug">
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-4 border-t border-gray-50 mt-6">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-xs font-bold text-brand-dark group-hover:text-brand-primary flex items-center gap-1 group-hover:gap-2 transition-all"
                    >
                      <span>Read Article</span>
                      <span>→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-500 font-medium bg-white rounded-[40px] max-w-4xl mx-auto border border-dashed border-gray-200">
              No blog posts published yet.
            </div>
          )}
        </div>
      </main>

      <Footer siteSettings={siteSettings} />
      <WhatsAppFAB />
    </>
  );
}
