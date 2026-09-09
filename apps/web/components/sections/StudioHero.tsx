import React from "react";
import Link from "next/link";
import Image from "next/image";
import { StudioHeroSection } from "@tathastu/types";
import { getStrapiMediaUrl } from "@/lib/api";

interface StudioHeroProps {
  section: StudioHeroSection;
}

export default function StudioHero({ section }: StudioHeroProps) {
  const backgroundImage = getStrapiMediaUrl(section.backgroundImage?.url) || "/images/studio/hero-bg.png";
  const heroImage = getStrapiMediaUrl(section.heroImage?.url) || "/images/studio/hero-right.png";

  return (
    <section
      style={{
        position: "relative",
        minHeight: "793px",
        background: "linear-gradient(173deg, rgba(143, 5, 2, 0.2) 0%, rgba(110, 9, 25, 0.56) 44%, #0B0625 100%)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px 80px 100px",
      }}
      className="studio-hero-section"
    >
      {/* Background Image texture overlay */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.25, pointerEvents: "none" }}>
        <Image src={backgroundImage} alt="" fill style={{ objectFit: "cover" }} priority />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "1440px",
          margin: "0 auto",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "48px",
        }}
      >
        {/* Content row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "center",
            marginTop: "20px",
          }}
          className="studio-hero-grid"
        >
          {/* Left text column */}
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              minHeight: "500px",
            }}
            className="studio-text-column"
          >
            {/* Text & Button content */}
            <div
              style={{
                position: "relative",
                zIndex: 10,
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                maxWidth: "509px",
              }}
              className="studio-hero-text"
            >
              <div
                className="studio-wordmark"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "fit-content",
                  marginBottom: "78px",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    fontSize: "30px",
                    fontWeight: 800,
                    letterSpacing: "3px",
                    color: "#FFFFFF",
                    lineHeight: 1.2,
                    paddingBottom: "4px",
                    borderBottom: "3px solid #D61814",
                    textAlign: "center",
                  }}
                >
                  {section.wordmarkLine1}
                </span>
                <span
                  style={{
                    fontSize: "30px",
                    fontWeight: 800,
                    letterSpacing: "3px",
                    color: "#FFFFFF",
                    lineHeight: 1.2,
                    textAlign: "center",
                  }}
                >
                  {section.wordmarkLine2}
                </span>
              </div>
              <h1
                style={{
                  fontSize: "59px",
                  fontWeight: 800,
                  lineHeight: "80px",
                  color: "#FFFFFF",
                  margin: 0,
                  textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                }}
                className="studio-title"
              >
                {section.heading}
              </h1>
              <p
                style={{
                  fontSize: "26px",
                  lineHeight: "42px",
                  color: "#FFFFFF",
                  margin: 0,
                  fontWeight: 400,
                }}
                className="studio-subtitle"
              >
                {section.subtext}
              </p>
              {section.ctaLabel && (
                <div style={{ marginTop: "8px" }} className="studio-btn-container">
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
                      transition: "transform 0.2s ease, opacity 0.2s ease",
                    }}
                    className="studio-contact-btn"
                  >
                    {section.ctaLabel}
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Right image column */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} className="studio-image-column">
            <div
              style={{
                position: "relative",
                width: "469px",
                height: "469px",
                borderRadius: "50%",
                border: "3px solid #FFFFFF",
                boxShadow: "0 0 0 8px rgba(255,255,255,0.15)",
                overflow: "hidden",
                flexShrink: 0,
              }}
              className="studio-ellipse-container"
            >
              <img
                src={heroImage}
                alt="Houdini VFX illustration"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
