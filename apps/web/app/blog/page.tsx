import React from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import CtaBand from "@/components/sections/CtaBand";
import { fetchStrapi, getStrapiMediaUrl } from "@/lib/api";
import { SiteSettings, Industry, BlogPost, CtaBandSection } from "@tathastu/types";
import { Calendar } from "lucide-react";

export const revalidate = 60; // ISR 60s

const PLACEHOLDER_BLOG_IMAGES = [
  "/images/blog/circuit-board.jpg",
  "/images/blog/developer.jpg",
  "/images/blog/technician.jpg",
];

export async function generateMetadata() {
  return {
    title: "Blog & Insights — Tathastu",
    description: "Stay updated with the latest news, tutorials, workstation sizing guides, and technology insights from Tathastu.",
  };
}

function formatBlogDateTime(dateStr: string) {
  try {
    const d = new Date(dateStr);
    return (
      d.toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      }) +
      "  " +
      d.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    );
  } catch {
    return dateStr;
  }
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

  const getCardImage = (post: BlogPost, idx: number): string => {
    if (post.coverImage?.url) {
      return getStrapiMediaUrl(post.coverImage.url);
    }
    return PLACEHOLDER_BLOG_IMAGES[idx % PLACEHOLDER_BLOG_IMAGES.length];
  };

  const ctaBandSection: CtaBandSection = {
    __component: "sections.cta-band",
    id: 1,
    heading: "Design Support for All Your Creative Needs",
    subtext:
      "Get a free introduction and discover how you and your team can change the way your source design forever",
    ctaLabel: "Request Demo",
    ctaHref: "/contact?source=Demo",
  };

  return (
    <>
      <Header siteSettings={siteSettings} industries={industries} />

      <main className="flex-grow">
        {/* ── Hero banner with breadcrumb ── */}
        <section className="relative overflow-hidden bg-brand-dark pb-24 pt-20 sm:pb-28 sm:pt-24">
          <Image
            src="/images/what-we-do/media-entertainment.jpg"
            alt=""
            fill
            priority
            className="object-cover opacity-40"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/0 via-brand-dark/10 to-brand-dark" />

          {/* Giant faint "BLOG" watermark */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-extrabold text-white/10"
            style={{ fontSize: "clamp(90px, 16vw, 200px)", letterSpacing: "0.05em" }}
          >
            BLOG
          </span>

          <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-3 px-6 text-center">
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
              Blog
            </h1>
            <nav className="flex items-center gap-2 text-sm font-medium text-white/70">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span>/</span>
              <span className="text-white">Blog</span>
            </nav>
          </div>
        </section>

        {/* ── Blog cards grid ── */}
        <section className="relative overflow-hidden bg-white px-6 py-20 sm:px-10">
          <div
            className="pointer-events-none absolute -right-32 -top-32 h-125 w-125 rounded-full"
            style={{ backgroundColor: "#FF842F", filter: "blur(400px)" }}
          />
          <div
            className="pointer-events-none absolute -bottom-32 -left-32 h-125 w-125 rounded-full"
            style={{ backgroundColor: "#91FFA0", filter: "blur(300px)" }}
          />

          <div className="relative z-10 mx-auto max-w-7xl">
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post, idx) => (
                  <article
                    key={post.id || idx}
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: "16px",
                      overflow: "hidden",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                      border: "1px solid #f0f0f0",
                      borderBottom: "3px solid #4B95FF",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* Image at top — plain <img> since covers can come from Strapi's remote media */}
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "200px",
                        flexShrink: 0,
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={getCardImage(post, idx)}
                        alt={post.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    </div>

                    {/* White body */}
                    <div
                      style={{
                        padding: "20px 20px 24px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        flex: 1,
                      }}
                    >
                      {/* Calendar icon + date/time */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          fontFamily: "'Open Sans', sans-serif",
                          fontSize: "12px",
                          color: "#6B7280",
                        }}
                      >
                        <Calendar size={13} style={{ flexShrink: 0 }} />
                        <span>{formatBlogDateTime(post.publishedDate)}</span>
                      </div>

                      {/* Bold title */}
                      <h3
                        style={{
                          fontFamily: "'Open Sans', sans-serif",
                          fontSize: "16px",
                          fontWeight: 700,
                          color: "#0b0625",
                          lineHeight: 1.4,
                          margin: 0,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        <Link
                          href={`/blog/${post.slug}`}
                          style={{ color: "inherit", textDecoration: "none" }}
                        >
                          {post.title}
                        </Link>
                      </h3>

                      {/* Gray excerpt with inline "read more..." link */}
                      <p
                        style={{
                          fontFamily: "'Open Sans', sans-serif",
                          fontSize: "13px",
                          color: "#6B7280",
                          lineHeight: 1.6,
                          margin: 0,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          flex: 1,
                        }}
                      >
                        {post.excerpt}{" "}
                        <Link
                          href={`/blog/${post.slug}`}
                          style={{ color: "#4B95FF", fontWeight: 600, textDecoration: "none" }}
                        >
                          read more...
                        </Link>
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mx-auto max-w-4xl rounded-[40px] border border-dashed border-gray-200 bg-white py-16 text-center font-medium text-gray-500">
                No blog posts published yet.
              </div>
            )}
          </div>
        </section>

        {/* ── CTA band ── */}
        <CtaBand section={ctaBandSection} />
      </main>

      <Footer siteSettings={siteSettings} />
      <WhatsAppFAB />
    </>
  );
}
