"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogTeaserSection, BlogPost } from "@tathastu/types";
import { fetchStrapi } from "@/lib/api";
import { getStrapiMediaUrl } from "@/lib/api";

interface BlogTeaserProps {
  section: BlogTeaserSection;
}

/*
  Figma node 40:1630 — Latest at Tathastu (Blog)
  - Light gray bg, faint dotted pattern top-left
  - Centered heading "Latest at Tathastu" (two-tone, "Tathastu" blue)
  - 3 cards: image top (rounded top), white body
    - Calendar icon + "March 07, 2026  05:30PM"
    - Bold title (up to 2 lines)
    - Gray excerpt
    - "View Details →" (blue link)
    - Subtle blue bottom border
  - Centered "View All" blue gradient pill below grid
  No: "View All" top-right link with ArrowRight icon, Tag icon, orange underline
*/

const PLACEHOLDER_BLOG_IMAGES = [
  "/images/blog/circuit-board.jpg",
  "/images/blog/developer.jpg",
  "/images/blog/technician.jpg",
];

function formatBlogDate(dateStr: string) {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    }) + "  " + d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return dateStr;
  }
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

  const getCardImage = (post: BlogPost, idx: number): string => {
    if (post.image?.url) {
      return getStrapiMediaUrl(post.image.url);
    }
    return PLACEHOLDER_BLOG_IMAGES[idx % PLACEHOLDER_BLOG_IMAGES.length];
  };

  return (
    <section
      style={{
        padding: "80px 80px",
        backgroundColor: "#F0F0F0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Faint dotted pattern top-left */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "200px",
          height: "200px",
          backgroundImage:
            "radial-gradient(circle, rgba(75,149,255,0.15) 1.5px, transparent 1.5px)",
          backgroundSize: "16px 16px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Centered two-tone heading */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "56px",
          }}
        >
          <h2
            style={{
              fontFamily: "'Open Sans', sans-serif",
              fontSize: "clamp(32px, 3vw, 48px)",
              fontWeight: 700,
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            <span style={{ color: "#0b0625" }}>Latest at </span>
            <span style={{ color: "#4B95FF" }}>Tathastu</span>
          </h2>
        </div>

        {/* Cards grid */}
        {loading ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
            }}
          >
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                style={{
                  height: "400px",
                  backgroundColor: "#e5e7eb",
                  borderRadius: "16px",
                  animation: "pulse 2s infinite",
                }}
              />
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
            }}
            className="blog-cards-grid"
          >
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
                {/* Image at top */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "200px",
                    flexShrink: 0,
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={getCardImage(post, idx)}
                    alt={post.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 33vw"
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
                  {/* Calendar icon + date */}
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
                    {/* Calendar SVG icon */}
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 16 16"
                      fill="none"
                      style={{ flexShrink: 0 }}
                    >
                      <rect
                        x="1"
                        y="2"
                        width="14"
                        height="13"
                        rx="2"
                        stroke="#6B7280"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M1 6h14"
                        stroke="#6B7280"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M5 1v2M11 1v2"
                        stroke="#6B7280"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span>{formatBlogDate(post.publishedDate)}</span>
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

                  {/* Gray excerpt */}
                  <p
                    style={{
                      fontFamily: "'Open Sans', sans-serif",
                      fontSize: "13px",
                      color: "#6B7280",
                      lineHeight: 1.6,
                      margin: 0,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      flex: 1,
                    }}
                  >
                    {post.excerpt}
                  </p>

                  {/* "View Details →" blue link */}
                  <Link
                    href={`/blog/${post.slug}`}
                    style={{
                      fontFamily: "'Open Sans', sans-serif",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#4B95FF",
                      textDecoration: "none",
                      marginTop: "4px",
                    }}
                  >
                    View Details →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "48px",
              color: "#6B7280",
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
            }}
          >
            No articles published yet.
          </div>
        )}

        {/* Centered "View All" blue gradient pill */}
        {section.ctaLabel && (
          <div
            style={{
              textAlign: "center",
              marginTop: "48px",
            }}
          >
            <Link
              href={section.ctaHref || "/blog"}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "14px 36px",
                background: "linear-gradient(90deg, #1d385e 0%, #4b95ff 100%)",
                color: "#FFFFFF",
                fontFamily: "'Open Sans', sans-serif",
                fontSize: "15px",
                fontWeight: 700,
                borderRadius: "999px",
                textDecoration: "none",
              }}
            >
              {section.ctaLabel}
            </Link>
          </div>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .blog-cards-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
