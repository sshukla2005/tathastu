"use client";

import React from "react";
import Image from "next/image";
import { TestimonialsSection } from "@tathastu/types";

interface TestimonialsProps {
  section: TestimonialsSection;
}

/*
  Figma node 40:4625 — Words Of Trust (Testimonials)
  - White bg
  - Left-aligned heading "Words Of Trust" (two-tone, "Trust" blue)
  - Subtitle: "Trusted by customers, backed by results."
  - Carousel arrows top-right (square buttons ‹ ›)
  - 2 cards, light-blue tinted background (#ddeeff-ish), rounded
  - Small blue triangle accent in top-right corner of each card
  - Each card: circular avatar photo, name (bold), role/company (gray), 5 orange stars, quote (gray)
  No: lucide Quote icon bg, initials avatar, brand-light bg, big centered heading
*/

const AVATAR_PATHS: Record<string, string> = {
  "keitan": "/images/testimonials/keitan-yadav.jpg",
  "anisha": "/images/testimonials/anisha-karthik.jpg",
};

function getAvatarPath(name: string): string {
  const lower = name.toLowerCase();
  for (const [key, val] of Object.entries(AVATAR_PATHS)) {
    if (lower.includes(key)) return val;
  }
  return "/images/testimonials/avatar-placeholder.svg";
}

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="#F59E0B"
        >
          <polygon points="9,1 11.5,6.5 17.5,7.3 13,11.6 14.3,17.5 9,14.5 3.7,17.5 5,11.6 0.5,7.3 6.5,6.5" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials({ section }: TestimonialsProps) {
  return (
    <section
      style={{
        padding: "80px 80px",
        backgroundColor: "#FFFFFF",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        {/* Top row: left-aligned heading + carousel arrows top-right */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "48px",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          {/* Left-aligned two-tone heading */}
          <div>
            <h2
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: "clamp(32px, 3vw, 48px)",
                fontWeight: 700,
                lineHeight: 1.2,
                margin: "0 0 12px 0",
              }}
            >
              <span style={{ color: "#0b0625" }}>Words Of </span>
              <span style={{ color: "#4B95FF" }}>Trust</span>
            </h2>
            <p
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: "15px",
                color: "#6B7280",
                margin: 0,
              }}
            >
              {section.subtitle || "Trusted by customers, backed by results."}
            </p>
          </div>

          {/* Carousel arrows — square buttons */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              alignSelf: "center",
            }}
          >
            <button
              aria-label="Previous testimonial"
              style={{
                width: "44px",
                height: "44px",
                border: "1.5px solid #0b0625",
                borderRadius: "4px",
                background: "#FFFFFF",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                color: "#0b0625",
              }}
            >
              ‹
            </button>
            <button
              aria-label="Next testimonial"
              style={{
                width: "44px",
                height: "44px",
                border: "1.5px solid #0b0625",
                borderRadius: "4px",
                background: "#FFFFFF",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                color: "#0b0625",
              }}
            >
              ›
            </button>
          </div>
        </div>

        {/* 2-column card grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
          }}
          className="testimonial-grid"
        >
          {section.testimonials &&
            section.testimonials.map((t, idx) => (
              <div
                key={t.id || idx}
                style={{
                  position: "relative",
                  backgroundColor: "#ddeeff",
                  borderRadius: "16px",
                  padding: "32px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {/* Blue triangle accent — top-right corner */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: 0,
                    height: 0,
                    borderStyle: "solid",
                    borderWidth: "0 48px 48px 0",
                    borderColor: "transparent #4B95FF transparent transparent",
                  }}
                />

                {/* Avatar + name + role row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  {/* Circular avatar */}
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      flexShrink: 0,
                      border: "3px solid #4B95FF",
                      position: "relative",
                    }}
                  >
                    <Image
                      src={t.avatar?.url
                        ? t.avatar.url
                        : getAvatarPath(t.authorName)}
                      alt={t.authorName}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="64px"
                    />
                  </div>

                  <div>
                    <p
                      style={{
                        fontFamily: "'Open Sans', sans-serif",
                        fontSize: "16px",
                        fontWeight: 700,
                        color: "#0b0625",
                        margin: "0 0 4px 0",
                      }}
                    >
                      {t.authorName}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Open Sans', sans-serif",
                        fontSize: "13px",
                        color: "#6B7280",
                        margin: 0,
                      }}
                    >
                      {t.authorTitle}
                      {t.company ? ` - ${t.company}` : ""}
                    </p>
                  </div>
                </div>

                {/* 5 orange stars */}
                <StarRating count={5} />

                {/* Quote text */}
                <p
                  style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: "14px",
                    color: "#4B5563",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {t.quote}
                </p>
              </div>
            ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .testimonial-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
