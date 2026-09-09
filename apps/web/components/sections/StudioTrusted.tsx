import React from "react";
import Link from "next/link";
import { StudioTrustedSection } from "@tathastu/types";
import { getStrapiMediaUrl } from "@/lib/api";

interface StudioTrustedProps {
  section: StudioTrustedSection;
}

export default function StudioTrusted({ section }: StudioTrustedProps) {
  const backgroundImage = getStrapiMediaUrl(section.backgroundImage?.url) || "/images/studio/trusted-bg.jpg";

  return (
    <section
      style={{
        position: "relative",
        minHeight: "360px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "60px 80px",
        color: "#FFFFFF",
      }}
      className="studio-trusted-section"
    >
      {/* Background image */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <img src={backgroundImage} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>

      {/* Dark overlay */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(0, 0, 0, 0.72)", zIndex: 1 }} />

      {/* Content — centered */}
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
          textAlign: "center",
          gap: "24px",
        }}
        className="studio-trusted-grid"
      >
        <h2
          style={{
            fontSize: "59px",
            fontWeight: 800,
            lineHeight: "80px",
            color: "#FFFFFF",
            margin: 0,
            fontFamily: "'Open Sans', sans-serif",
          }}
          className="studio-trusted-title"
        >
          {section.heading}
        </h2>
        <p
          style={{
            fontSize: "22px",
            lineHeight: "36px",
            color: "#FFFFFF",
            margin: 0,
            fontFamily: "'Open Sans', sans-serif",
            fontWeight: 400,
            maxWidth: "700px",
          }}
          className="studio-trusted-subtitle"
        >
          {section.subtitle}
        </p>
        {section.ctaLabel && (
          <Link
            href={section.ctaHref || "/contact"}
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
              marginTop: "8px",
              transition: "transform 0.2s ease, opacity 0.2s ease",
            }}
            className="studio-trusted-btn"
          >
            {section.ctaLabel}
          </Link>
        )}
      </div>
    </section>
  );
}
