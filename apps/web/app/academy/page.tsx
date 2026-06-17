import React from "react";
import Link from "next/link";
import Image from "next/image";

export async function generateMetadata() {
  return {
    title: "Tathastu Academy — Learn. Rise. Lead.",
    description:
      "Tathastu Academy bridges the gap between Houdini training and real-world studio production — building the next generation of VFX professionals through project-driven learning.",
  };
}

/* ── Design Tokens ────────────────────────────────────────────────── */
const RED = "#E02020";
const DARK = "#0D0D0D";
const BORDER = "rgba(224,32,32,0.35)";

// About Section Color Palette (Figma node 154:132)
const ABOUT_BG = "#F3EFE9"; // Warm light grey/beige
const ABOUT_TEXT_PRIMARY = "#1A1A1A";
const ABOUT_TEXT_SECONDARY = "#4D4D4D";
const ABOUT_ACCENT_RED = "#D93829";
const ABOUT_ACCENT_GOLD = "#C97D24";

/* ── Reusable Buttons ────────────────────────────────────────────── */
function RedBtn({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
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
      {children}
    </Link>
  );
}

function OutlineBtn({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        justifyContent: "center",
        padding: "13px 28px",
        background: "transparent",
        color: "#fff",
        fontFamily: "'Open Sans', sans-serif",
        fontWeight: 700,
        fontSize: "15px",
        borderRadius: "6px",
        border: "2px solid rgba(255,255,255,0.55)",
        textDecoration: "none",
        whiteSpace: "nowrap",
      }}
    >
      {children}
      <span style={{ fontSize: "18px" }}>→</span>
    </Link>
  );
}

export default function AcademyPage() {
  return (
    <div style={{ background: DARK, minHeight: "100vh", fontFamily: "'Open Sans', sans-serif" }}>

      {/* ── 1. HERO — DARK ─────────────────────────────────────────── */}
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
          <Image
            src="/images/academy/hero-bg.jpg"
            alt=""
            fill
            style={{ objectFit: "cover", objectPosition: "center top" }}
            priority
            sizes="100vw"
          />
          {/* Dark gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(13,13,13,0.88) 0%, rgba(13,13,13,0.72) 55%, rgba(80,8,8,0.55) 100%)",
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
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            {/* Academy wordmark */}
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <span
                style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: "clamp(22px, 2.2vw, 32px)",
                  fontWeight: 900,
                  color: "#FFFFFF",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                TATHASTU ACADEMY
              </span>
              <span
                style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: RED,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                }}
              >
                Learn. Rise. Lead.
              </span>
            </div>

            {/* H1 */}
            <h1
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: "clamp(38px, 4.5vw, 64px)",
                fontWeight: 900,
                lineHeight: 1.1,
                color: "#FFFFFF",
                margin: 0,
              }}
            >
              Where artists become{" "}
              <span style={{ color: RED }}>production</span> ready.
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
                maxWidth: "560px",
              }}
            >
              Tathastu Academy bridges the gap between Houdini training and real-world studio
              production — building the next generation of VFX professionals through project-driven
              learning.
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <RedBtn href="/contact?source=Academy">Book a Call</RedBtn>
              <OutlineBtn href="#programs">View Programs</OutlineBtn>
            </div>

            {/* Trust line */}
            <p
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: "12px",
                fontWeight: 600,
                color: "rgba(255,255,255,0.45)",
                letterSpacing: "0.08em",
                margin: 0,
                textTransform: "uppercase",
              }}
            >
              Trusted by world-class studios · Batches of 15 artists · 100% online
            </p>
          </div>

          {/* Right — graphic card */}
          <div
            style={{
              position: "relative",
              borderRadius: "20px",
              border: `2px solid ${RED}`,
              overflow: "hidden",
              background: "#110000",
            }}
          >
            {/* Graphic image */}
            <div style={{ position: "relative", width: "100%", height: "380px" }}>
              <Image
                src="/images/academy/hero-graphic.jpg"
                alt="Tathastu Academy — lightbulb graduation graphic"
                fill
                style={{ objectFit: "cover" }}
                sizes="480px"
              />
            </div>

            {/* Stat strip */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                background: "rgba(13,0,0,0.92)",
                borderTop: `1px solid ${BORDER}`,
                padding: "16px 0",
              }}
            >
              {[
                { val: "15", label: "SEATS/BATCH" },
                { val: "6mo", label: "DEEP TRAINING" },
                { val: "3mo", label: "INTENSIVE" },
                { val: "10+", label: "SPECIALIZATIONS" },
              ].map((s, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "2px",
                    borderRight: i < 3 ? `1px solid ${BORDER}` : "none",
                    padding: "4px 0",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Open Sans', sans-serif",
                      fontSize: "20px",
                      fontWeight: 900,
                      color: "#FFFFFF",
                    }}
                  >
                    {s.val}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Open Sans', sans-serif",
                      fontSize: "9px",
                      fontWeight: 700,
                      color: "rgba(255,255,255,0.45)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. TICKER — node 154:3 — DARK STRIP ─────────────────────── */}
      <section
        style={{
          overflow: "hidden",
          width: "100%",
          background: "#0D0D0D",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          height: "46px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          className="ticker-track"
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            width: "max-content",
            alignItems: "center",
            gap: "64px",
          }}
        >
          {/* Two identical groups of elements for seamless looping */}
          {Array(2)
            .fill(null)
            .map((_, groupIdx) => (
              <div
                key={groupIdx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "64px",
                }}
              >
                {/* Item 1 */}
                <div style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={ABOUT_ACCENT_RED}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <span
                    style={{
                      fontFamily: "'Open Sans', sans-serif",
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.8)",
                      fontWeight: 600,
                      letterSpacing: "0.03em",
                    }}
                  >
                    Trusted by world-class studios
                  </span>
                </div>
                {/* Item 2 */}
                <div style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={ABOUT_ACCENT_RED}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <span
                    style={{
                      fontFamily: "'Open Sans', sans-serif",
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.8)",
                      fontWeight: 600,
                      letterSpacing: "0.03em",
                    }}
                  >
                    Batches of 15 artists
                  </span>
                </div>
                {/* Item 3 */}
                <div style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={ABOUT_ACCENT_RED}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                  <span
                    style={{
                      fontFamily: "'Open Sans', sans-serif",
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.8)",
                      fontWeight: 600,
                      letterSpacing: "0.03em",
                    }}
                  >
                    100% online
                  </span>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* ── 3. ABOUT — node 154:132 — LIGHT THEME ───────────────────── */}
      <section
        style={{
          background: ABOUT_BG,
          padding: "120px 80px 140px",
          color: ABOUT_TEXT_PRIMARY,
          overflow: "hidden",
        }}
        className="academy-section"
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "96px",
            alignItems: "center",
          }}
          className="about-grid"
        >
          {/* Left Column — Overlapping Images */}
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "460px",
              justifySelf: "center",
            }}
          >
            {/* Brain Graphic (Base) */}
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "1/1",
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 20px 40px rgba(0,0,0,0.06)",
              }}
            >
              <Image
                src="/images/academy/about-brain.png"
                alt="Floating 3D brain network illustration"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 1024px) 100vw, 460px"
              />
            </div>

            {/* SideFX Badge */}
            <div
              style={{
                position: "absolute",
                top: "55%",
                right: "-24px",
                transform: "translateY(-50%)",
                zIndex: 20,
                background: "#FFFFFF",
                borderRadius: "14px",
                padding: "16px 24px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
                border: "1px solid rgba(0, 0, 0, 0.04)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "3px",
                minWidth: "170px",
              }}
            >
              <span
                style={{
                  color: ABOUT_ACCENT_RED,
                  fontWeight: 900,
                  fontSize: "21px",
                  fontFamily: "'Open Sans', sans-serif",
                  letterSpacing: "0.02em",
                  lineHeight: 1,
                }}
              >
                SideFX
              </span>
              <div style={{ width: "100%", height: "1.5px", background: "#E5E7EB", margin: "4px 0" }}></div>
              <span
                style={{
                  color: "#6B7280",
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontFamily: "'Open Sans', sans-serif",
                }}
              >
                Official Partner
              </span>
            </div>

            {/* VR User Graphic */}
            <div
              style={{
                position: "absolute",
                bottom: "-48px",
                right: "-36px",
                width: "60%",
                aspectRatio: "1/1",
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                border: `6px solid ${ABOUT_BG}`,
                zIndex: 10,
              }}
            >
              <Image
                src="/images/academy/about-vr.jpg"
                alt="Artist interacting with VR environment"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 1024px) 60vw, 280px"
              />
            </div>
          </div>

          {/* Right Column — Mission & Feature rows */}
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            {/* Tagline */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: ABOUT_ACCENT_GOLD,
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              <span style={{ width: "24px", height: "2px", background: ABOUT_ACCENT_GOLD }}></span>
              OUR MISSION
            </div>

            {/* Heading */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <h2
                style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: "clamp(32px, 3.2vw, 44px)",
                  fontWeight: 800,
                  lineHeight: 1.15,
                  color: ABOUT_TEXT_PRIMARY,
                  margin: 0,
                }}
              >
                Not just teaching. <br />
                <span style={{ color: ABOUT_ACCENT_RED }}>Building careers.</span>
              </h2>
              {/* Thick divider */}
              <div
                style={{
                  width: "56px",
                  height: "4px",
                  background: ABOUT_ACCENT_RED,
                  marginTop: "16px",
                }}
              ></div>
            </div>

            {/* Paragraphs */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                fontSize: "15px",
                lineHeight: 1.7,
                color: ABOUT_TEXT_SECONDARY,
              }}
            >
              <p style={{ margin: 0 }}>
                At Tathastu Academy, we understand the biggest challenge studios face — finding Houdini artists who are{" "}
                <strong style={{ color: ABOUT_TEXT_PRIMARY, fontWeight: 700 }}>
                  technically skilled and production ready from day one.
                </strong>
              </p>
              <p style={{ margin: 0 }}>
                Backed by our official SideFX partnership, we deliver studio-focused training that equips artists with
                technical expertise, creative vision, and the problem-solving skills demanded by modern VFX pipelines.
              </p>
            </div>

            {/* Feature Row Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Feature 1 */}
              <div
                style={{
                  background: "#FFFFFF",
                  borderRadius: "16px",
                  padding: "20px 24px",
                  display: "flex",
                  gap: "20px",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.02)",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "#FDF2F2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    color: ABOUT_ACCENT_RED,
                  }}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                </div>
                <div>
                  <h4 style={{ margin: "0 0 4px 0", fontSize: "16px", fontWeight: 700, color: ABOUT_TEXT_PRIMARY }}>
                    Project-Driven Learning
                  </h4>
                  <p style={{ margin: 0, fontSize: "13px", color: ABOUT_TEXT_SECONDARY, lineHeight: 1.5 }}>
                    Every module builds toward real deliverables studios actually expect.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div
                style={{
                  background: "#FFFFFF",
                  borderRadius: "16px",
                  padding: "20px 24px",
                  display: "flex",
                  gap: "20px",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.02)",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "#FEF3C7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    color: ABOUT_ACCENT_GOLD,
                  }}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
                  </svg>
                </div>
                <div>
                  <h4 style={{ margin: "0 0 4px 0", fontSize: "16px", fontWeight: 700, color: ABOUT_TEXT_PRIMARY }}>
                    Studio-Aligned Curriculum
                  </h4>
                  <p style={{ margin: 0, fontSize: "13px", color: ABOUT_TEXT_SECONDARY, lineHeight: 1.5 }}>
                    Courses designed in collaboration with real production pipelines.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div
                style={{
                  background: "#FFFFFF",
                  borderRadius: "16px",
                  padding: "20px 24px",
                  display: "flex",
                  gap: "20px",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.02)",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "#FDF2F2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    color: ABOUT_ACCENT_RED,
                  }}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                </div>
                <div>
                  <h4 style={{ margin: "0 0 4px 0", fontSize: "16px", fontWeight: 700, color: ABOUT_TEXT_PRIMARY }}>
                    Talent Pipeline for Studios
                  </h4>
                  <p style={{ margin: 0, fontSize: "13px", color: ABOUT_TEXT_SECONDARY, lineHeight: 1.5 }}>
                    Book seats in advance and hire trained, ready-to-deploy artists.
                  </p>
                </div>
              </div>
            </div>

            {/* Talk to Us Button */}
            <div style={{ marginTop: "12px" }}>
              <Link
                href="/contact?source=Academy"
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
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Talk to Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive overrides */}
      <style>{`
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track {
          animation: ticker-scroll 25s linear infinite;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
        .talk-us-btn:hover {
          background: #C22F22 !important;
          transform: translateY(-2px);
        }
        @media (max-width: 1024px) {
          .academy-hero-grid {
            grid-template-columns: 1fr !important;
            padding: 100px 32px 60px !important;
          }
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 120px !important;
            padding: 0 16px !important;
          }
        }
        @media (max-width: 640px) {
          .academy-section {
            padding-left: 24px !important;
            padding-right: 24px !important;
            padding-top: 80px !important;
            padding-bottom: 80px !important;
          }
        }
      `}</style>
    </div>
  );
}
