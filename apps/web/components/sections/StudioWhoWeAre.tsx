import React from "react";
import { StudioWhoWeAreSection } from "@tathastu/types";
import { getStrapiMediaUrl } from "@/lib/api";

interface StudioWhoWeAreProps {
  section: StudioWhoWeAreSection;
}

export default function StudioWhoWeAre({ section }: StudioWhoWeAreProps) {
  const imageBack = getStrapiMediaUrl(section.imageBack?.url) || "/images/studio/who-left-1.png";
  const imageFront = getStrapiMediaUrl(section.imageFront?.url) || "/images/studio/who-left-2.png";
  const badgeImage = getStrapiMediaUrl(section.badgeImage?.url) || "/images/studio/badge-leading.png";

  return (
    <section
      style={{
        position: "relative",
        background: "#FFFFFF",
        overflow: "visible",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "120px 80px 140px",
        color: "#000000",
      }}
      className="studio-whoweare-section"
    >
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "1440px",
          margin: "0 auto",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "center",
        }}
        className="studio-whoweare-grid"
      >
        {/* Left column — overlapping images + badge */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} className="studio-whoweare-image-column">
          <div className="studio-whoweare-overlapping-container">
            {/* Back card */}
            <div className="studio-whoweare-back-box">
              <img src={imageBack} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>

            {/* Foreground image card */}
            <div className="studio-whoweare-front-box">
              <img
                src={imageFront}
                alt="Houdini Specialists Working"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>

            {/* Badge */}
            <div className="studio-whoweare-badge">
              <img
                src={badgeImage}
                alt="Leading VFX Specialists"
                style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
              />
            </div>
          </div>
        </div>

        {/* Right column — text content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "32px", maxWidth: "826px" }} className="studio-whoweare-text-column">
          <h2
            style={{
              fontSize: "54px",
              fontWeight: 700,
              lineHeight: "68px",
              color: "#000000",
              margin: 0,
              fontFamily: "'Open Sans', sans-serif",
            }}
            className="studio-whoweare-title"
          >
            {section.heading}
          </h2>
          <p
            style={{
              fontSize: "18px",
              lineHeight: "28px",
              color: "#333333",
              margin: 0,
              fontFamily: "'Open Sans', sans-serif",
              fontWeight: 400,
            }}
            className="studio-whoweare-description"
          >
            {section.description}
          </p>

          {/* Tick-circle points */}
          {section.points?.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }} className="studio-whoweare-list">
              {section.points.map((point, idx) => (
                <div key={point.id ?? idx} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: "2px" }}>
                    <circle cx="12" cy="12" r="10" fill="#D61814" />
                    <path d="M8 12L11 15L16 9" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span
                    style={{
                      fontSize: "16px",
                      lineHeight: "24px",
                      color: "#333333",
                      fontFamily: "'Open Sans', sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    {point.text}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
