import React from "react";
import { StudioPurposeSection } from "@tathastu/types";

interface StudioPurposeProps {
  section: StudioPurposeSection;
}

const CARDS_PER_ROW_TOP = 3;

export default function StudioPurpose({ section }: StudioPurposeProps) {
  const points = section.points || [];
  const topRow = points.slice(0, CARDS_PER_ROW_TOP);
  const bottomRow = points.slice(CARDS_PER_ROW_TOP);

  return (
    <section
      style={{
        position: "relative",
        background: "#F5F0EB",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "120px 80px",
        color: "#000000",
      }}
      className="studio-purpose-section"
    >
      <div style={{ position: "relative", zIndex: 10, maxWidth: "1440px", margin: "0 auto", width: "100%", display: "flex", flexDirection: "column", gap: "48px" }}>
        {/* Header row — title left, arrows right */}
        <div
          style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "24px", flexWrap: "wrap" }}
          className="studio-purpose-header"
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h2
              style={{ fontSize: "54px", fontWeight: 700, lineHeight: "68px", color: "#000000", margin: 0, fontFamily: "'Open Sans', sans-serif" }}
              className="studio-purpose-title"
            >
              {section.headingPrefix} <span style={{ color: "#D61814" }}>{section.headingHighlight}</span>
            </h2>
            <p
              style={{
                fontSize: "18px",
                lineHeight: "28px",
                color: "#555555",
                margin: 0,
                fontFamily: "'Open Sans', sans-serif",
                fontWeight: 400,
                maxWidth: "700px",
              }}
              className="studio-purpose-subtitle"
            >
              {section.subtitle}
            </p>
          </div>

          {/* Carousel arrows */}
          <div style={{ display: "flex", gap: "8px", alignSelf: "center", flexShrink: 0 }}>
            <button
              aria-label="Previous"
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
              aria-label="Next"
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

        {/* Cards Grid — top row + centered bottom row */}
        <div className="studio-purpose-rows">
          <div className="studio-purpose-grid">
            {topRow.map((point, idx) => (
              <div key={point.id ?? idx} className="studio-purpose-card">
                <p style={{ fontSize: "16px", lineHeight: "26px", color: "#222222", margin: 0, fontFamily: "'Open Sans', sans-serif", fontWeight: 500, textAlign: "center" }}>
                  {point.text}
                </p>
              </div>
            ))}
          </div>
          {bottomRow.length > 0 && (
            <div className="studio-purpose-grid-bottom">
              {bottomRow.map((point, idx) => (
                <div key={point.id ?? idx} className="studio-purpose-card">
                  <p style={{ fontSize: "16px", lineHeight: "26px", color: "#222222", margin: 0, fontFamily: "'Open Sans', sans-serif", fontWeight: 500, textAlign: "center" }}>
                    {point.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
