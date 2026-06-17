"use client";

import React from "react";
import Image from "next/image";
import { FeatureCardsSection } from "@tathastu/types";

interface FeatureCardsProps {
  section: FeatureCardsSection;
}

/*
  Spec:
  "What We Do" (node 40:1603):
  - White background, centered heading "What We Do" (two-tone: "What" black, "We Do" blue)
  - 4 cards, equal width, white, rounded, subtle shadow, solid BLUE BOTTOM BORDER (always visible)
  - Each card = photograph (top, rounded) + title only (bold, dark, centered)
  - No description, no icon, no hover effects

  "Why Choose Us" (node 40:4680):
  - Light gray background (~#eeeeee)
  - Centered heading "Why Choose Us?" (two-tone: "Why" black, "Choose Us?" blue)
  - 4 cards with FLAT VECTOR ILLUSTRATIONS (not icons), title bold centered, description gray centered
  - "Client Focus" card: highlighted (light-blue bg + blue border)
  - No lucide icons, no hover gradient borders, no "Learn more →"
*/

// Map card photo/illustration paths by section type
const WHAT_WE_DO_IMAGES: Record<string, string> = {
  "media": "/images/what-we-do/media-entertainment.jpg",
  "entertainment": "/images/what-we-do/media-entertainment.jpg",
  "architecture": "/images/what-we-do/architecture-design.jpg",
  "aec": "/images/what-we-do/architecture-design.jpg",
  "education": "/images/what-we-do/education-training.jpg",
  "training": "/images/what-we-do/education-training.jpg",
  "manufacturing": "/images/what-we-do/manufacturing.jpg",
  "visualization": "/images/what-we-do/manufacturing.jpg",
};

const WHY_CHOOSE_IMAGES: Record<string, string> = {
  "innovation": "/images/why-choose-us/innovation.png",
  "client": "/images/why-choose-us/client-focus.png",
  "expertise": "/images/why-choose-us/expertise.png",
  "reliability": "/images/why-choose-us/reliability.png",
};

function getImagePath(
  title: string,
  map: Record<string, string>,
  fallback: string
): string {
  const lower = title.toLowerCase();
  for (const [key, val] of Object.entries(map)) {
    if (lower.includes(key)) return val;
  }
  return fallback;
}

export default function FeatureCards({ section }: FeatureCardsProps) {
  const isWhyChooseUs = section.title?.toLowerCase().includes("why") ||
    section.heading?.toLowerCase().includes("why");

  // Parse two-tone heading: "What We Do" → "What" black + " We Do" blue
  // "Why Choose Us?" → "Why" black + " Choose Us?" blue
  const renderHeading = () => {
    const text = section.heading || section.title || "";
    if (text.toLowerCase().includes("what we do")) {
      return (
        <h2
          style={{
            fontFamily: "'Open Sans', sans-serif",
            fontSize: "clamp(32px, 3vw, 48px)",
            fontWeight: 700,
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          <span style={{ color: "#0b0625" }}>What </span>
          <span style={{ color: "#4B95FF" }}>We Do</span>
        </h2>
      );
    }
    if (text.toLowerCase().includes("why choose")) {
      return (
        <h2
          style={{
            fontFamily: "'Open Sans', sans-serif",
            fontSize: "clamp(32px, 3vw, 48px)",
            fontWeight: 700,
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          <span style={{ color: "#0b0625" }}>Why </span>
          <span style={{ color: "#4B95FF" }}>Choose Us?</span>
        </h2>
      );
    }
    return (
      <h2
        style={{
          fontFamily: "'Open Sans', sans-serif",
          fontSize: "clamp(32px, 3vw, 48px)",
          fontWeight: 700,
          color: "#0b0625",
          lineHeight: 1.2,
          margin: 0,
        }}
      >
        {text}
      </h2>
    );
  };

  return (
    <section
      style={{
        padding: "80px 80px",
        backgroundColor: isWhyChooseUs ? "#eeeeee" : "#FFFFFF",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Concentric circles decoration (right edge for What We Do, top-left for Why Choose Us) */}
      <div
        style={{
          position: "absolute",
          ...(isWhyChooseUs
            ? { top: "-60px", left: "-60px" }
            : { top: "50%", right: "-80px", transform: "translateY(-50%)" }),
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          border: "40px solid rgba(75,149,255,0.04)",
          boxShadow:
            "0 0 0 40px rgba(75,149,255,0.03), 0 0 0 80px rgba(75,149,255,0.02)",
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
        {/* Section Header — centered */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "56px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          {renderHeading()}
          {(section.subtitle || section.subtext) && (
            <p
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: "16px",
                fontWeight: 400,
                color: "#6B7280",
                maxWidth: "640px",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {section.subtitle || section.subtext}
            </p>
          )}
        </div>

        {/* Cards Grid — 4 equal columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "24px",
          }}
          className="feature-cards-grid"
        >
          {section.cards.map((card, idx) => {
            const isClientFocus =
              isWhyChooseUs && card.title.toLowerCase().includes("client");

            const imagePath = isWhyChooseUs
              ? getImagePath(card.title, WHY_CHOOSE_IMAGES, "/images/why-choose-us/innovation.png")
              : getImagePath(card.title, WHAT_WE_DO_IMAGES, "/images/what-we-do/media-entertainment.jpg");

            return (
              <div
                key={card.id || idx}
                style={{
                  backgroundColor: isClientFocus ? "#ddeeff" : "#FFFFFF",
                  borderRadius: "16px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                  border: isClientFocus
                    ? "1.5px solid #4B95FF"
                    : "1px solid #f0f0f0",
                  borderBottom: "4px solid #4B95FF",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  /* No hover effects per spec */
                }}
              >
                {/* Photo / Illustration at top */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: isWhyChooseUs ? "180px" : "220px",
                    overflow: "hidden",
                    borderRadius: "16px 16px 0 0",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  <Image
                    src={imagePath}
                    alt={card.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>

                {/* Card body */}
                <div
                  style={{
                    padding: isWhyChooseUs ? "20px 16px" : "16px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "10px",
                    textAlign: "center",
                    flex: 1,
                  }}
                >
                  {/* Title — bold, dark, centered */}
                  <h3
                    style={{
                      fontFamily: "'Open Sans', sans-serif",
                      fontSize: "17px",
                      fontWeight: 700,
                      color: "#0b0625",
                      margin: 0,
                      lineHeight: 1.3,
                    }}
                  >
                    {card.title}
                  </h3>

                  {/* Description — only for Why Choose Us */}
                  {isWhyChooseUs && card.description && (
                    <p
                      style={{
                        fontFamily: "'Open Sans', sans-serif",
                        fontSize: "13px",
                        fontWeight: 400,
                        color: "#6B7280",
                        margin: 0,
                        lineHeight: 1.6,
                      }}
                    >
                      {card.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          .feature-cards-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .feature-cards-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
