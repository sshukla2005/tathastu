import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import CtaBand from "@/components/sections/CtaBand";
import { fetchStrapi, getStrapiMediaUrl } from "@/lib/api";
import { SiteSettings, Industry, BlogPost, CtaBandSection } from "@tathastu/types";
import { Calendar } from "lucide-react";

export const revalidate = 60; // ISR 60s

const FALLBACK_COVER_IMAGE = "/images/blog/developer.jpg";

interface BlogPostDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostDetailPageProps) {
  const { slug } = await params;
  try {
    const res = await fetchStrapi<{ data: BlogPost[] }>(
      `/blog-posts?filters[slug][$eq]=${slug}`
    );
    const post = res?.data?.[0];
    if (post) {
      return {
        title: `${post.title} — Tathastu Blog`,
        description: post.excerpt,
      };
    }
  } catch (err) {
    console.error("Error generating blog metadata:", err);
  }
  return { title: "Blog Post — Tathastu Blog" };
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

  const coverUrl = post.coverImage?.url
    ? getStrapiMediaUrl(post.coverImage.url)
    : FALLBACK_COVER_IMAGE;

  const bodyHtml = typeof post.body === "string" ? post.body : "";

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
        {/* ── Hero banner — same as blog listing, breadcrumb extended with "Details" ── */}
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
              <Link href="/blog" className="hover:text-white">
                Blog
              </Link>
              <span>/</span>
              <span className="text-white">Details</span>
            </nav>
          </div>
        </section>

        {/* ── Article — plain container, no card ── */}
        <section
          style={{
            position: "relative",
            overflow: "hidden",
            background: "linear-gradient(180deg, #EFF6FF 0%, #F2E9E3 100%)",
            padding: "80px",
          }}
          className="blog-detail-section"
        >
          <div
            className="pointer-events-none absolute -left-32 -top-32 h-125 w-125 rounded-full"
            style={{ backgroundColor: "#91FFA0", filter: "blur(300px)" }}
          />
          <div
            className="pointer-events-none absolute -bottom-32 -right-32 h-125 w-125 rounded-full"
            style={{ backgroundColor: "#FF842F", filter: "blur(400px)" }}
          />

          <article
            style={{
              position: "relative",
              zIndex: 10,
              maxWidth: "960px",
              margin: "0 auto",
            }}
            className="blog-detail-content"
          >
            {bodyHtml ? (
              /* Image, headings, bold text, paragraphs — all sourced directly from the rendered HTML content */
              <div
                className="blog-body"
                dangerouslySetInnerHTML={{ __html: bodyHtml }}
              />
            ) : (
              <>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "16 / 9",
                    borderRadius: "12px",
                    overflow: "hidden",
                    marginBottom: "32px",
                  }}
                >
                  <img
                    src={coverUrl}
                    alt={post.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: "13px",
                    color: "#6B7280",
                    marginBottom: "12px",
                  }}
                >
                  <Calendar size={14} style={{ flexShrink: 0 }} />
                  <span>{formatBlogDateTime(post.publishedDate)}</span>
                </div>

                <h1
                  style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: "clamp(24px, 3vw, 32px)",
                    fontWeight: 800,
                    color: "#0B0625",
                    lineHeight: 1.35,
                    margin: "0 0 24px",
                  }}
                >
                  {post.title}
                </h1>

                <p
                  style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: "15px",
                    lineHeight: 1.8,
                    color: "#444444",
                    margin: 0,
                  }}
                >
                  {post.excerpt}
                </p>
              </>
            )}
          </article>
        </section>

        {/* ── CTA band ── */}
        <CtaBand section={ctaBandSection} />
      </main>

      <Footer siteSettings={siteSettings} />
      <WhatsAppFAB />

      <style>{`
        .blog-body {
          font-family: 'Open Sans', sans-serif;
          color: #444444;
          font-size: 16px;
          line-height: 1.85;
        }
        .blog-body img {
          width: 100%;
          height: auto;
          border-radius: 12px;
          margin: 0 0 32px;
          display: block;
        }
        .blog-body p {
          margin: 0 0 16px;
        }
        .blog-body h1 {
          font-size: clamp(24px, 3vw, 32px);
          font-weight: 800;
          color: #0B0625;
          margin: 0 0 24px;
          line-height: 1.35;
        }
        .blog-body h2 {
          font-size: 22px;
          font-weight: 700;
          color: #0B0625;
          margin: 32px 0 12px;
          line-height: 1.4;
        }
        .blog-body h3 {
          font-size: 18px;
          font-weight: 700;
          color: #0B0625;
          margin: 28px 0 10px;
          line-height: 1.4;
        }
        .blog-body ul, .blog-body ol {
          margin: 0 0 16px;
          padding-left: 20px;
        }
        .blog-body li {
          margin-bottom: 6px;
        }
        .blog-body a {
          color: #4B95FF;
          text-decoration: underline;
        }
        .blog-body strong {
          color: #0B0625;
        }
        .blog-body blockquote {
          border-left: 3px solid #4B95FF;
          padding-left: 16px;
          margin: 0 0 16px;
          color: #6B7280;
          font-style: italic;
        }
        @media (max-width: 768px) {
          .blog-detail-section {
            padding: 40px 20px !important;
          }
        }
      `}</style>
    </>
  );
}
