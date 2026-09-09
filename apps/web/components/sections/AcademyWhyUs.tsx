import React from "react";
import Link from "next/link";
import { AcademyWhyUsSection } from "@tathastu/types";
import { getStrapiMediaUrl } from "@/lib/api";

interface AcademyWhyUsProps {
  section: AcademyWhyUsSection;
}

const ABOUT_TEXT_PRIMARY = "#1A1A1A";
const ABOUT_TEXT_SECONDARY = "#4D4D4D";
const ABOUT_ACCENT_RED = "#D93829";

// Fallback icons matching the original 6 "Why Us" cards, used until a card
// has its own icon set in Strapi.
const FALLBACK_ICONS = [
  <svg key="0" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>,
  <svg key="1" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>,
  <svg key="2" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>,
  <svg key="3" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
  </svg>,
  <svg key="4" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>,
  <svg key="5" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>,
];

export default function AcademyWhyUs({ section }: AcademyWhyUsProps) {
  const cards = section.cards || [];

  return (
    <section id="why-us" style={{ background: "#F3EFE9", color: ABOUT_TEXT_PRIMARY, padding: "120px 80px 140px", position: "relative", overflow: "hidden" }} className="academy-section">
      <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "56px" }}>
        {/* Header */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", textAlign: "center", maxWidth: "640px" }}>
          <h2 style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "clamp(32px, 3.2vw, 44px)", fontWeight: 900, lineHeight: 1.15, color: ABOUT_TEXT_PRIMARY, margin: 0 }}>
            {section.heading} <span style={{ color: ABOUT_ACCENT_RED }}>{section.headingHighlight}</span>
          </h2>
          <p style={{ margin: 0, fontSize: "16px", lineHeight: 1.7, color: ABOUT_TEXT_SECONDARY }}>{section.subtitle}</p>
        </div>

        {/* Cards Grid — 3x2 */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", width: "100%" }} className="why-us-grid-right">
          {cards.map((card, idx) => {
            const iconUrl = getStrapiMediaUrl(card.icon?.url);
            return (
              <div
                key={card.id ?? idx}
                style={{ background: "#FFFFFF", borderRadius: "16px", padding: "24px 28px", boxShadow: "0 10px 25px rgba(0, 0, 0, 0.02)", border: "1px solid rgba(0, 0, 0, 0.03)", display: "flex", flexDirection: "column", gap: "16px", transition: "transform 0.3s ease, box-shadow 0.3s ease" }}
                className="why-us-card"
              >
                <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "#FDF2F2", color: ABOUT_ACCENT_RED, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden" }}>
                  {iconUrl ? <img src={iconUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : FALLBACK_ICONS[idx % FALLBACK_ICONS.length]}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: ABOUT_TEXT_PRIMARY, lineHeight: 1.3 }}>{card.title}</h4>
                  <p style={{ margin: 0, fontSize: "13.5px", color: ABOUT_TEXT_SECONDARY, lineHeight: 1.5 }}>{card.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        {section.ctaLabel && (
          <Link
            href={section.ctaHref || "/contact"}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "16px 40px",
              background: ABOUT_ACCENT_RED,
              color: "#FFFFFF",
              fontFamily: "'Open Sans', sans-serif",
              fontWeight: 700,
              fontSize: "15px",
              borderRadius: "999px",
              textDecoration: "none",
              boxShadow: "0 4px 14px rgba(217, 56, 41, 0.25)",
              transition: "background 0.2s ease, transform 0.2s ease",
            }}
            className="talk-advisor-btn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            {section.ctaLabel}
          </Link>
        )}
      </div>
    </section>
  );
}
