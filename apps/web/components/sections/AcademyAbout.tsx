import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AcademyAboutSection } from "@tathastu/types";
import { getStrapiMediaUrl } from "@/lib/api";

interface AcademyAboutProps {
  section: AcademyAboutSection;
}

const ABOUT_TEXT_PRIMARY = "#1A1A1A";
const ABOUT_TEXT_SECONDARY = "#4D4D4D";
const ABOUT_ACCENT_RED = "#D93829";

// Fallback icon + tint per card position, matching the original design's
// three feature rows (used until a card has its own icon set in Strapi).
const FALLBACK_ICONS = [
  {
    bg: "#FDF2F2",
    color: ABOUT_ACCENT_RED,
    svg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    bg: "#FEF3C7",
    color: "#C97D24",
    svg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
      </svg>
    ),
  },
  {
    bg: "#FDF2F2",
    color: ABOUT_ACCENT_RED,
    svg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
  },
];

export default function AcademyAbout({ section }: AcademyAboutProps) {
  const image = getStrapiMediaUrl(section.image?.url) || "/images/academy/about-vr.jpg";
  const features = section.features || [];

  return (
    <section
      style={{ background: "#F3EFE9", padding: "120px 80px 140px", color: ABOUT_TEXT_PRIMARY, overflow: "hidden" }}
      className="academy-section"
    >
      <div
        style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "96px", alignItems: "stretch" }}
        className="about-grid"
      >
        {/* Left Column — Single photo */}
        <div style={{ width: "100%", maxWidth: "420px", height: "100%", justifySelf: "center" }} className="about-photo-wrap">
          <div
            style={{ position: "relative", width: "100%", height: "100%", borderRadius: "24px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
            className="about-photo"
          >
            <Image src={image} alt="Tathastu Academy students collaborating on a project" fill style={{ objectFit: "cover" }} sizes="(max-width: 1024px) 100vw, 420px" />
          </div>
        </div>

        {/* Right Column — Mission & Feature rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }} className="about-right-col">
          <h2
            style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "clamp(32px, 3.2vw, 44px)", fontWeight: 800, lineHeight: 1.15, color: ABOUT_TEXT_PRIMARY, margin: 0 }}
          >
            {section.headingLine1} <br />
            <span style={{ color: ABOUT_ACCENT_RED }}>{section.headingHighlight}</span>
          </h2>

          <p style={{ margin: 0, fontSize: "15px", lineHeight: 1.7, color: ABOUT_TEXT_SECONDARY }}>{section.description}</p>

          {/* Feature Row Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {features.map((feature, idx) => {
              const fallback = FALLBACK_ICONS[idx % FALLBACK_ICONS.length];
              const iconUrl = getStrapiMediaUrl(feature.icon?.url);
              return (
                <div
                  key={feature.id ?? idx}
                  style={{ background: "#FFFFFF", borderRadius: "16px", padding: "20px 24px", display: "flex", gap: "20px", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.02)", alignItems: "center" }}
                  className="about-feature-card"
                >
                  <div
                    style={{ width: "48px", height: "48px", borderRadius: "12px", background: fallback.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: fallback.color, overflow: "hidden" }}
                  >
                    {iconUrl ? <img src={iconUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : fallback.svg}
                  </div>
                  <div>
                    <h4 style={{ margin: "0 0 4px 0", fontSize: "16px", fontWeight: 700, color: ABOUT_TEXT_PRIMARY }}>{feature.title}</h4>
                    <p style={{ margin: 0, fontSize: "13px", color: ABOUT_TEXT_SECONDARY, lineHeight: 1.5 }}>{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Talk to Us Button */}
          {section.ctaLabel && (
            <div style={{ marginTop: "12px" }}>
              <Link
                href={section.ctaHref || "/contact"}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "16px 36px",
                  background: ABOUT_ACCENT_RED,
                  color: "#FFFFFF",
                  fontFamily: "'Open Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "15px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  boxShadow: "0 4px 14px rgba(217, 56, 41, 0.25)",
                  transition: "background 0.2s ease, transform 0.2s ease",
                }}
                className="talk-us-btn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                {section.ctaLabel}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
