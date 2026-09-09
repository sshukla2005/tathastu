import React from "react";
import Image from "next/image";
import { AcademySpecializationSection } from "@tathastu/types";
import { getStrapiMediaUrl } from "@/lib/api";

interface AcademySpecializationProps {
  section: AcademySpecializationSection;
}

const RED = "#E02020";
const ABOUT_TEXT_PRIMARY = "#1A1A1A";

// Fallback photos matching the original 8 specialization cards, used until a
// card has its own icon set in Strapi.
const FALLBACK_IMAGES: Record<string, string> = {
  "flip simulations": "/images/academy/about-vr.jpg",
  "pyro & smoke": "/images/academy/about-brain.png",
  "destruction & rbd": "/images/academy/program-advanced.png",
  "environment & fx": "/images/academy/hero-bg.jpg",
  "groom": "/images/academy/program-studio.png",
  "tech animation": "/images/academy/hero-graphic.jpg",
  "shading & lighting": "/images/academy/programs-bg.png",
  "usd workflows": "/images/academy/program-beginner.png",
};

function fallbackImage(label: string): string {
  return FALLBACK_IMAGES[label.toLowerCase()] || "/images/academy/about-vr.jpg";
}

export default function AcademySpecialization({ section }: AcademySpecializationProps) {
  const backgroundImage = getStrapiMediaUrl(section.backgroundImage?.url) || "/images/academy/hero-bg.jpg";
  const specializations = section.specializations || [];

  return (
    <section id="specialization" style={{ background: "#0B0F0C", color: "#FFFFFF", padding: "120px 80px 140px", position: "relative", overflow: "hidden" }} className="academy-section">
      {/* Background photo */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image src={backgroundImage} alt="" fill style={{ objectFit: "cover", objectPosition: "center center" }} sizes="100vw" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(11,15,12,0.92) 0%, rgba(11,15,12,0.82) 45%, rgba(11,15,12,0.95) 100%)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 5, display: "flex", flexDirection: "column", alignItems: "center", gap: "48px", maxWidth: "1280px", width: "100%", margin: "0 auto" }}>
        {/* Section Header — glass panel */}
        <div style={{ background: "rgba(10,8,6,0.55)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "36px 64px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 800, lineHeight: 1.3, color: "#FFFFFF", margin: 0 }}>
            {section.headingLine1}
            <br />
            {section.headingLine2Plain} <span style={{ color: RED }}>{section.headingHighlight}</span>
          </h2>
        </div>

        {/* Cards Grid — 4x2 */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", width: "100%" }} className="specialization-grid">
          {specializations.map((spec, idx) => (
            <div
              key={spec.id ?? idx}
              style={{ background: "#FFFFFF", borderRadius: "16px", padding: "14px 14px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "14px", boxShadow: "0 10px 25px rgba(0,0,0,0.3)", transition: "transform 0.3s ease, box-shadow 0.3s ease" }}
              className="spec-card"
            >
              <div style={{ position: "relative", width: "100%", aspectRatio: "1/1", borderRadius: "12px", overflow: "hidden" }}>
                <Image
                  src={getStrapiMediaUrl(spec.icon?.url) || fallbackImage(spec.label)}
                  alt={spec.label}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 1024px) 45vw, 290px"
                />
              </div>
              <span style={{ fontSize: "17px", fontWeight: 700, color: ABOUT_TEXT_PRIMARY, textAlign: "center" }}>{spec.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
