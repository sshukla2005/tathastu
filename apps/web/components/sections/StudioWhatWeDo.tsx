import React from "react";
import Link from "next/link";
import { StudioWhatWeDoSection } from "@tathastu/types";
import { getStrapiMediaUrl } from "@/lib/api";

interface StudioWhatWeDoProps {
  section: StudioWhatWeDoSection;
}

function fallbackFxImage(label: string): string {
  const key = label.toLowerCase().includes("ocean") ? "ocean" : label.toLowerCase().replace(/\s+/g, "-");
  return `/images/studio/fx-${key}.png`;
}

export default function StudioWhatWeDo({ section }: StudioWhatWeDoProps) {
  const cards = section.cards || [];

  return (
    <section
      style={{
        position: "relative",
        background: "#0A080C",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "120px 80px",
        color: "#FFFFFF",
      }}
      className="studio-whatwedo-section"
    >
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "1440px",
          margin: "0 auto",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "56px",
        }}
      >
        {/* Title / Intro */}
        <div
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px", textAlign: "center", maxWidth: "800px" }}
          className="studio-whatwedo-header"
        >
          <h2
            style={{ fontSize: "54px", fontWeight: 700, lineHeight: "68px", color: "#FFFFFF", margin: 0, fontFamily: "'Open Sans', sans-serif" }}
            className="studio-whatwedo-title"
          >
            {section.heading}
          </h2>
          <p
            style={{ fontSize: "20px", lineHeight: "32px", color: "#CCCCCC", margin: 0, fontFamily: "'Open Sans', sans-serif", fontWeight: 400 }}
            className="studio-whatwedo-subtitle"
          >
            {section.subtitle}
          </p>
        </div>

        {/* Grid of FX Cards */}
        <div className="studio-whatwedo-grid">
          {cards.map((card, idx) => (
            <div key={card.id ?? idx} className="studio-fx-card">
              <div className="studio-fx-image-container">
                <img
                  src={getStrapiMediaUrl(card.icon?.url) || fallbackFxImage(card.label)}
                  alt={card.label}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s ease" }}
                  className="studio-fx-image"
                />
              </div>
              <h3
                style={{ fontSize: "18px", fontWeight: 600, color: "#FFFFFF", margin: 0, textAlign: "center", fontFamily: "'Open Sans', sans-serif" }}
              >
                {card.label}
              </h3>
            </div>
          ))}
        </div>

        {/* View More Button */}
        {section.ctaLabel && (
          <div style={{ marginTop: "16px" }}>
            <Link
              href={section.ctaHref || "/studio"}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "231px",
                height: "74px",
                background: "linear-gradient(90deg, #920B08 0%, #D61814 100%)",
                boxShadow: "0px 2px 5px 0px rgba(0, 0, 0, 0.25)",
                borderRadius: "50px",
                color: "#FFFFFF",
                fontSize: "22px",
                fontWeight: 600,
                textDecoration: "none",
                transition: "transform 0.2s ease, opacity 0.2s ease",
              }}
              className="studio-whatwedo-btn"
            >
              {section.ctaLabel}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
