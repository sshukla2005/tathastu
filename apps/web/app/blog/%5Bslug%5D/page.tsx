import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import { fetchStrapi } from "@/lib/api";
import { SiteSettings, Industry, BlogPost } from "@tathastu/types";
import { ChevronLeft, Calendar, Tag, User } from "lucide-react";

export const revalidate = 60; // ISR 60s

interface BlogPostDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostDetailPageProps) {
  const { slug } = await params;
  try {
    const res = await fetchStrapi<{ data: BlogPost[] }>(
      `/blog-posts?filters[slug][$eq]=${slug}`
    );
    if (res?.data && res.data.length > 0) {
      const post = res.data[0];
      return {
        title: `${post.title} — Tathastu Blog`,
        description: post.excerpt,
      };
    }
  } catch (err) {
    console.error("Error generating blog metadata:", err);
  }
  return {
    title: "Blog Post — Tathastu Blog",
  };
}

export default async function BlogPostDetailPage({ params }: BlogPostDetailPageProps) {
  const { slug } = await params;
  const [settingsRes, industriesRes, currentPostRes] = await Promise.all([
    fetchStrapi<{ data: SiteSettings }>("/site-setting?populate[nav][populate]=*&populate[footerColumns][populate]=*&populate[socialLinks][populate]=*&populate[logo][populate]=*"),
    fetchStrapi<{ data: Industry[] }>("/industries?sort=order:asc"),
    fetchStrapi<{ data: BlogPost[] }>(`/blog-posts?filters[slug][$eq]=${slug}&populate=*`),
  ]);

  const siteSettings = settingsRes?.data;
  const industries = industriesRes?.data || [];
  const post = currentPostRes?.data?.[0];

  if (!post) {
    notFound();
  }

  if (!siteSettings) return null;

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-US", {
        month: "long",
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

      <main className="flex-grow bg-white py-12 px-6">
        <article className="max-w-3xl mx-auto">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm font-bold text-gray-500 hover:text-brand-primary mb-8 group transition-colors"
          >
            <ChevronLeft size={16} className="transform group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to All Articles</span>
          </Link>

          {/* Post Meta */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-6">
            <span className="flex items-center gap-1 text-brand-primary">
              <Tag size={14} />
              {post.category || "General"}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {formatDate(post.publishedDate)}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
            <span className="flex items-center gap-1">
              <User size={14} />
              Tathastu Editorial
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl font-extrabold text-brand-dark leading-tight mb-8">
            {post.title}
          </h1>

          <div className="w-20 h-1 bg-brand-orange rounded-full mb-12" />

          {/* Excerpt panel */}
          <p className="text-xl text-gray-600 leading-relaxed font-medium italic border-l-4 border-brand-primary pl-6 mb-12">
            {post.excerpt}
          </p>

          {/* Body Content */}
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed border-t border-gray-100 pt-8 flex flex-col gap-6">
            <p>
              In this article, our pipeline technical directors outline key strategies, workstation setup parameters, or software license options tailored to boost productivity.
            </p>
            <p>
              Hardware acceleration, memory configuration, and direct procedural workflows are essential to maintaining high output frame-rates while preserving computational scalability.
            </p>
            <p>
              Stay tuned for subsequent updates where we delve deeper into detailed benchmarks, pipeline configuration tips, and custom plugin installations.
            </p>
          </div>
        </article>
      </main>

      <Footer siteSettings={siteSettings} />
      <WhatsAppFAB />
    </>
  );
}
