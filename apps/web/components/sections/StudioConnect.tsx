import React from "react";
import { StudioConnectSection } from "@tathastu/types";
import { getStrapiMediaUrl } from "@/lib/api";

interface StudioConnectProps {
  section: StudioConnectSection;
}

export default function StudioConnect({ section }: StudioConnectProps) {
  const image = getStrapiMediaUrl(section.image?.url) || "/images/studio/connect-right.png";

  return (
    <section
      style={{
        position: "relative",
        background: "linear-gradient(180deg, #EFF6FF 0%, #F2E9E3 100%)",
        overflow: "visible",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "120px 80px 140px",
        color: "#000000",
      }}
      className="studio-connect-section"
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
        className="studio-connect-grid"
      >
        {/* Left text column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "32px", maxWidth: "826px" }} className="studio-connect-text-column">
          <h2
            style={{
              fontSize: "54px",
              fontWeight: 700,
              lineHeight: "74px",
              color: "#000000",
              margin: 0,
              fontFamily: "'Open Sans', sans-serif",
            }}
            className="studio-connect-title"
          >
            {section.heading}
          </h2>
          <p
            style={{
              fontSize: "22px",
              lineHeight: "30px",
              color: "#000000",
              margin: 0,
              fontFamily: "'Open Sans', sans-serif",
              fontWeight: 400,
              whiteSpace: "pre-line",
            }}
            className="studio-connect-description"
          >
            {section.description}
          </p>
        </div>

        {/* Right overlapping images column */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} className="studio-connect-image-column">
          <div className="studio-overlapping-container">
            {/* Red background overlapping card */}
            <div className="studio-connect-red-box" />

            {/* Foreground image card */}
            <div className="studio-connect-img-box">
              <img
                src={image}
                alt="Freelance artist work illustration"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
