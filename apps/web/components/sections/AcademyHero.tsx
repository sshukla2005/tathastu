import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AcademyHeroSection } from "@tathastu/types";
import { getStrapiMediaUrl } from "@/lib/api";

interface AcademyHeroProps {
  section: AcademyHeroSection;
}

const RED = "#E02020";

export default function AcademyHero({ section }: AcademyHeroProps) {
  const backgroundImage = getStrapiMediaUrl(section.backgroundImage?.url) || "/images/academy/hero-bg.jpg";
  const heroImage = getStrapiMediaUrl(section.heroImage?.url) || "/images/academy/hero.svg";

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Hero background photo */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image src={backgroundImage} alt="" fill style={{ objectFit: "cover", objectPosition: "center top" }} priority sizes="100vw" />
        {/* Dark gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(13,13,13,0.88) 0%, rgba(13,13,13,0.72) 55%, rgba(80,8,8,0.55) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "120px 80px 80px",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 480px",
          gap: "64px",
          alignItems: "center",
        }}
        className="academy-hero-grid"
      >
        {/* Left — text */}
        <div style={{ display: "flex", flexDirection: "column", gap: "26px" }} className="academy-hero-text-col">
          {/* Academy wordmark */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {/* Triangle mark */}
            <svg width="32" height="30" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 0L32 30H0L16 0Z" fill={RED} />
            </svg>

            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              <span
                style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: "clamp(20px, 2vw, 28px)",
                  fontWeight: 900,
                  color: "#FFFFFF",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  lineHeight: 1.15,
                }}
              >
                {section.wordmarkLine1}
              </span>
              <span
                style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: "clamp(20px, 2vw, 28px)",
                  fontWeight: 900,
                  color: RED,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  lineHeight: 1.15,
                }}
              >
                {section.wordmarkLine2}
              </span>
            </div>

            <span
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: "12px",
                fontWeight: 600,
                color: "rgba(255,255,255,0.6)",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
              }}
            >
              {section.tagline}
            </span>
          </div>

          {/* H1 */}
          <h1
            style={{
              fontFamily: "'Open Sans', sans-serif",
              fontSize: "clamp(32px, 3.6vw, 50px)",
              fontWeight: 800,
              lineHeight: 1.2,
              color: "#FFFFFF",
              margin: 0,
              maxWidth: "620px",
            }}
          >
            {section.heading}
          </h1>

          {/* Subtext */}
          <p
            style={{
              fontFamily: "'Open Sans', sans-serif",
              fontSize: "clamp(15px, 1.3vw, 18px)",
              fontWeight: 400,
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.7,
              margin: 0,
              maxWidth: "540px",
            }}
          >
            {section.subtext}
          </p>

          {/* CTA */}
          {section.ctaLabel && (
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginTop: "8px" }}>
              <Link
                href={section.ctaHref || "/contact"}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "14px 32px",
                  background: RED,
                  color: "#fff",
                  fontFamily: "'Open Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "15px",
                  borderRadius: "6px",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  letterSpacing: "0.02em",
                }}
              >
                {section.ctaLabel}
              </Link>
            </div>
          )}
        </div>

        {/* Right — hero graphic */}
        <div style={{ position: "relative", width: "100%", maxWidth: "480px", justifySelf: "end" }} className="academy-hero-image-wrap">
          <div style={{ position: "relative", width: "100%", aspectRatio: "752/700" }}>
            <Image
              src={heroImage}
              alt="Tathastu Academy — mentor guiding students through Houdini production training"
              fill
              style={{ objectFit: "contain" }}
              sizes="480px"
              unoptimized
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
