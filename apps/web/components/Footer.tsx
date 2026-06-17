"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SiteSettings } from "@tathastu/types";
import { getStrapiMediaUrl } from "@/lib/api";

interface FooterProps {
  siteSettings: SiteSettings;
}

/*
  Figma node 40:1509 — Footer
  - PRE-FOOTER: horizontal gradient stripe ~4px (green→red→orange→yellow→blue) directly above footer
  - Footer background: soft gradient (greenish left → peach/cream right)
  - Left block: logo (mark + "TATHASTU / TECHNO SOLUTION")
    + phone icon + "+91 98201 92970"
    + mail icon + "info@tathastu.global.com"
    + "Follow us :" with round blue Facebook, Instagram, LinkedIn icons
  - Three link columns with ">" chevron prefix per link:
    - Tathastu: About Us, Blog, Press, Career, Contact Us
    - Industries: Media and Entertainment, AEC, Manufacturing, Education, Government
    - Professions: Architects, Animators & Graphic Designers, VFX Expert, Product Designer
  - Bottom center: "© Copyright 2026 Tathastu. All Rights Reserved"
  - WhatsApp FAB kept (correct per spec)
*/

const getSocialIcon = (platform: string) => {
  switch (platform) {
    case "facebook":
      return (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.95z" />
        </svg>
      );
    case "instagram":
      return (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      );
    default:
      return null;
  }
};

// Static footer columns matching Figma exactly
const STATIC_FOOTER_COLUMNS = [
  {
    title: "Tathastu",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Press", href: "/press" },
      { label: "Career", href: "/career" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Media and Entertainment", href: "/industries/media" },
      { label: "AEC", href: "/industries/aec" },
      { label: "Manufacturing", href: "/industries/manufacturing" },
      { label: "Education", href: "/industries/education" },
      { label: "Government", href: "/industries/government" },
    ],
  },
  {
    title: "Professions",
    links: [
      { label: "Architects", href: "/professions/architects" },
      { label: "Animators & Graphic Designers", href: "/professions/animators" },
      { label: "VFX Expert", href: "/professions/vfx" },
      { label: "Product Designer", href: "/professions/product-designer" },
    ],
  },
];

export default function Footer({ siteSettings }: FooterProps) {
  const logoUrl = siteSettings.logo
    ? getStrapiMediaUrl(siteSettings.logo.url)
    : null;

  const columns =
    siteSettings.footerColumns && siteSettings.footerColumns.length > 0
      ? siteSettings.footerColumns
      : STATIC_FOOTER_COLUMNS;

  return (
    <>
      {/* Pre-footer gradient stripe — green→red→orange→yellow→blue, ~4px */}
      <div
        style={{
          height: "4px",
          width: "100%",
          background:
            "linear-gradient(90deg, #22c55e 0%, #ef4444 20%, #f97316 40%, #eab308 60%, #3b82f6 100%)",
        }}
      />

      <footer
        style={{
          background:
            "linear-gradient(90deg, rgba(140,237,164,0.25) 0%, rgba(241,232,226,0.95) 100%), #f1e8e2",
          color: "#0b0625",
          paddingTop: "64px",
          paddingBottom: "32px",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 80px",
          }}
          className="footer-inner"
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
              gap: "48px",
              marginBottom: "48px",
            }}
            className="footer-grid"
          >
            {/* Left block: logo + contact + social */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Logo */}
              <Link
                href="/"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  textDecoration: "none",
                }}
              >
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt="Tathastu Logo"
                    style={{ height: "60px", width: "auto" }}
                  />
                ) : (
                  <>
                    <Image
                      src="/images/header/logo-mark.svg"
                      alt=""
                      width={60}
                      height={44}
                      style={{ height: "44px", width: "auto" }}
                    />
                    <Image
                      src="/images/header/logo-wordmark.svg"
                      alt="TATHASTU TECHNO SOLUTION"
                      width={120}
                      height={24}
                      style={{ height: "24px", width: "auto" }}
                    />
                  </>
                )}
              </Link>

              {/* Phone */}
              {(siteSettings.phone || true) && (
                <a
                  href={`tel:${siteSettings.phone || "+919820192970"}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    textDecoration: "none",
                    color: "#0b0625",
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: "14px",
                  }}
                >
                  {/* Phone icon */}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4B95FF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.74h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.34a16 16 0 0 0 5.72 5.72l1.74-1.74a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>{siteSettings.phone || "+91 98201 92970"}</span>
                </a>
              )}

              {/* Email */}
              {(siteSettings.email || true) && (
                <a
                  href={`mailto:${siteSettings.email || "info@tathastu.global.com"}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    textDecoration: "none",
                    color: "#0b0625",
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: "14px",
                  }}
                >
                  {/* Mail icon */}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4B95FF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span>{siteSettings.email || "info@tathastu.global.com"}</span>
                </a>
              )}

              {/* Social: "Follow us :" + round blue icons */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: "14px",
                    color: "#555",
                  }}
                >
                  Follow us :
                </span>
                {(siteSettings.socialLinks?.length > 0
                  ? siteSettings.socialLinks
                  : [
                      { id: "1", platform: "facebook", url: "#" },
                      { id: "2", platform: "instagram", url: "#" },
                      { id: "3", platform: "linkedin", url: "#" },
                    ]
                ).map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${social.platform}`}
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      backgroundColor: "#4B95FF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#FFFFFF",
                      textDecoration: "none",
                    }}
                  >
                    {getSocialIcon(social.platform)}
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {columns.map((col, idx) => (
              <div key={idx}>
                <h4
                  style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#0b0625",
                    marginBottom: "20px",
                    marginTop: 0,
                  }}
                >
                  {col.title}
                </h4>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {col.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <Link
                        href={link.href}
                        style={{
                          fontFamily: "'Open Sans', sans-serif",
                          fontSize: "14px",
                          color: "#555555",
                          textDecoration: "none",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        {/* ">" chevron prefix per Figma */}
                        <span style={{ color: "#4B95FF", fontSize: "12px" }}>›</span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Copyright — bottom center */}
          <div
            style={{
              borderTop: "1px solid rgba(0,0,0,0.1)",
              paddingTop: "24px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: "13px",
                color: "#777",
                margin: 0,
              }}
            >
              {siteSettings.copyrightText ||
                "© Copyright 2026 Tathastu. All Rights Reserved"}
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .footer-inner {
            padding: 0 32px !important;
          }
        }
        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
          .footer-inner {
            padding: 0 20px !important;
          }
        }
      `}</style>
    </>
  );
}
