import React from "react";
import { StudioFooterSection, SiteSettings } from "@tathastu/types";

interface StudioFooterProps {
  section: StudioFooterSection;
  siteSettings: SiteSettings;
}

const DEFAULT_SOCIAL_LINKS = [
  { id: "1", platform: "facebook", url: "https://facebook.com" },
  { id: "2", platform: "instagram", url: "https://instagram.com" },
  { id: "3", platform: "linkedin", url: "https://linkedin.com" },
  { id: "4", platform: "twitter", url: "https://x.com" },
  { id: "5", platform: "youtube", url: "https://youtube.com" },
];

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  facebook: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.95z" />
    </svg>
  ),
  instagram: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  ),
  linkedin: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  ),
  twitter: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  youtube: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
};

export default function StudioFooter({ section, siteSettings }: StudioFooterProps) {
  const socialLinks = siteSettings.socialLinks?.length > 0 ? siteSettings.socialLinks : DEFAULT_SOCIAL_LINKS;

  return (
    <footer
      style={{
        background: "linear-gradient(135deg, #F0EDE8 0%, #E8E4DE 40%, #D4EDD8 100%)",
        color: "#000000",
        padding: "80px 80px 40px 80px",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      className="studio-footer"
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "32px",
          textAlign: "center",
          zIndex: 10,
        }}
      >
        {/* Tagline — 2 lines */}
        <h2
          style={{ fontSize: "48px", fontWeight: 700, lineHeight: "60px", color: "#000000", margin: 0, fontFamily: "'Open Sans', sans-serif" }}
          className="studio-footer-tagline"
        >
          {section.taglineLine1}
          <br />
          {section.taglineLine2Plain} <span style={{ color: "#D61814" }}>{section.taglineHighlight}</span>
        </h2>

        {/* CTA subtext */}
        <p
          style={{
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "26px",
            color: "#444444",
            margin: 0,
            maxWidth: "700px",
            fontFamily: "'Open Sans', sans-serif",
            letterSpacing: "0.3px",
          }}
          className="studio-footer-cta"
        >
          {section.ctaText}
        </p>

        {/* Subtext with mixed colors */}
        <p style={{ fontSize: "18px", color: "#000000", margin: 0, fontFamily: "'Open Sans', sans-serif", fontWeight: 400 }} className="studio-footer-subtext">
          <span style={{ color: "#D61814", fontWeight: 600 }}>{section.subtextHighlight1}</span>
          {" "}
          {section.subtextMiddle}{" "}
          <span style={{ color: "#D61814", fontWeight: 600 }}>{section.subtextHighlight2}</span>
        </p>

        {/* Social Icons */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "20px", marginTop: "8px" }}>
          {socialLinks.map((social) => (
            <a
              key={social.id}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Follow us on ${social.platform}`}
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                backgroundColor: "#000000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                textDecoration: "none",
                transition: "background-color 0.3s ease",
              }}
              className="studio-social-icon"
            >
              {SOCIAL_ICONS[social.platform] || null}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div style={{ borderTop: "1px solid rgba(0, 0, 0, 0.12)", paddingTop: "24px", width: "100%", marginTop: "16px" }}>
          <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "14px", color: "#666666", margin: 0, lineHeight: "22px" }}>
            {siteSettings.copyrightText || "© 2026 Tathastu Techno Solution. All Rights Reserved."}
          </p>
        </div>
      </div>
    </footer>
  );
}
