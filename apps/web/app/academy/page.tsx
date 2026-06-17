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

      {/* ── 4. PROGRAMS — node ~160:286 — DARK THEME ────────────────── */}
      <section
        id="programs"
        style={{
          position: "relative",
          background: "#0B0F0C", // Deep dark green/black
          color: "#FFFFFF",
          overflow: "hidden",
        }}
        className="academy-section"
      >
        {/* Background photo */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image
            src="/images/academy/programs-bg.png"
            alt=""
            fill
            style={{ objectFit: "cover", objectPosition: "center center", opacity: 0.07 }}
            sizes="100vw"
          />
          {/* Subtle dark gradient overlay to blend corners */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, rgba(11,15,12,0.95) 0%, rgba(11,15,12,0.85) 50%, rgba(11,15,12,0.95) 100%)",
            }}
          />
        </div>

        {/* Content Container */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "120px 80px 140px",
            width: "100%",
          }}
          className="programs-container"
        >
          {/* Section Header */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "64px" }}>
            <span
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: "12px",
                fontWeight: 700,
                color: RED,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              PROGRAMS OFFERED
            </span>
            <h2
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: "clamp(32px, 3.2vw, 44px)",
                fontWeight: 900,
                lineHeight: 1.2,
                color: "#FFFFFF",
                margin: 0,
              }}
            >
              Training for every stage of your <span style={{ color: RED }}>Houdini journey</span>
            </h2>
            <p
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: "15px",
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.6,
                margin: 0,
                maxWidth: "650px",
              }}
            >
              Cutting-edge programs designed for the future of digital creation — from your first node to your first studio credit.
            </p>
          </div>

          {/* Cards Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "32px",
            }}
            className="programs-grid"
          >
            {/* Card 1 — Studio Houdini Training */}
            <div
              style={{
                background: "#131915", // Lighter deep green-black
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "16px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
              }}
              className="program-card"
            >
              {/* Card Image */}
              <div style={{ position: "relative", width: "100%", height: "200px" }}>
                <Image
                  src="/images/academy/program-studio.png"
                  alt="Studio Houdini Training"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 1024px) 100vw, 400px"
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 60%, rgba(19,25,21,0.9) 100%)" }} />
                {/* Badge */}
                <span
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    background: RED,
                    color: "#FFFFFF",
                    fontWeight: 700,
                    fontSize: "10px",
                    letterSpacing: "0.08em",
                    padding: "6px 12px",
                    borderRadius: "4px",
                    textTransform: "uppercase",
                  }}
                >
                  MOST POPULAR
                </span>
              </div>

              {/* Card Body */}
              <div style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "24px", flexGrow: 1 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <span
                    style={{
                      fontFamily: "'Open Sans', sans-serif",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: RED,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    FOR STUDIOS & TEAMS
                  </span>
                  <h3 style={{ margin: 0, fontSize: "24px", fontWeight: 800, color: "#FFFFFF" }}>
                    Studio Houdini Training
                  </h3>
                </div>

                <p style={{ margin: 0, fontSize: "14px", color: "rgba(255,255,255,0.75)", lineHeight: 1.6, minHeight: "68px" }}>
                  Custom in-house Houdini training built around your studio's exact production requirements and L&D goals.
                </p>

                {/* Spec Box */}
                <div
                  style={{
                    display: "flex",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "8px",
                    padding: "12px 16px",
                    justifyContent: "space-between",
                  }}
                >
                  {[
                    { label: "FORMAT", val: "Online" },
                    { label: "SEATS", val: "Flexible" },
                    { label: "DURATION", val: "Custom" },
                  ].map((spec, index, arr) => (
                    <div
                      key={spec.label}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                        flex: 1,
                        alignItems: index === 0 ? "flex-start" : index === arr.length - 1 ? "flex-end" : "center",
                        borderRight: index < arr.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
                      }}
                    >
                      <span style={{ fontSize: "9px", fontWeight: 600, color: "rgba(255,255,255,0.4)", letterSpacing: "0.05em" }}>
                        {spec.label}
                      </span>
                      <span style={{ fontSize: "12px", fontWeight: 700, color: "#FFFFFF" }}>
                        {spec.val}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Checklist */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", flexGrow: 1 }}>
                  {[
                    "Crafted with your L&D team",
                    "Flip, Pyro, Destruction, Groom, USD & more",
                    "Flexible seat or full-batch bookings",
                    "Trusted by leading VFX & animation studios",
                  ].map((item) => (
                    <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                      <span
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background: RED,
                          marginTop: "7px",
                          flexShrink: 0,
                        }}
                      />
                      <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.85)", lineHeight: 1.4 }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action CTA Block */}
                <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
                  <Link
                    href="/contact?program=Studio"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      padding: "14px 24px",
                      background: RED,
                      color: "#FFFFFF",
                      fontWeight: 700,
                      fontSize: "14px",
                      borderRadius: "8px",
                      textDecoration: "none",
                      letterSpacing: "0.02em",
                      transition: "background 0.2s",
                    }}
                    className="program-btn"
                  >
                    Book Studio Training
                  </Link>
                  <a
                    href="#"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      color: "rgba(255,255,255,0.5)",
                      fontSize: "13px",
                      fontWeight: 600,
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    className="download-brochure-link"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download Brochure
                  </a>
                </div>
              </div>
            </div>

            {/* Card 2 — Beginner Houdini Training */}
            <div
              style={{
                background: "#131915",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "16px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
              }}
              className="program-card"
            >
              {/* Card Image */}
              <div style={{ position: "relative", width: "100%", height: "200px" }}>
                <Image
                  src="/images/academy/program-beginner.png"
                  alt="Beginner Houdini Training"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 1024px) 100vw, 400px"
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 60%, rgba(19,25,21,0.9) 100%)" }} />
                {/* Badge */}
                <span
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    background: "#E37A20", // Orange Launching Badge
                    color: "#FFFFFF",
                    fontWeight: 700,
                    fontSize: "10px",
                    letterSpacing: "0.08em",
                    padding: "6px 12px",
                    borderRadius: "4px",
                    textTransform: "uppercase",
                  }}
                >
                  LAUNCHING
                </span>
              </div>

              {/* Card Body */}
              <div style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "24px", flexGrow: 1 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <span
                    style={{
                      fontFamily: "'Open Sans', sans-serif",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: RED,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    FOR ASPIRING ARTISTS
                  </span>
                  <h3 style={{ margin: 0, fontSize: "24px", fontWeight: 800, color: "#FFFFFF" }}>
                    Beginner Houdini Training
                  </h3>
                </div>

                <p style={{ margin: 0, fontSize: "14px", color: "rgba(255,255,255,0.75)", lineHeight: 1.6, minHeight: "68px" }}>
                  Our flagship Academy trains a hand-picked batch of 15 students in Houdini from the ground up.
                </p>

                {/* Spec Box */}
                <div
                  style={{
                    display: "flex",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "8px",
                    padding: "12px 16px",
                    justifyContent: "space-between",
                  }}
                >
                  {[
                    { label: "DURATION", val: "6 Months" },
                    { label: "SEATS", val: "Only 15" },
                  ].map((spec, index, arr) => (
                    <div
                      key={spec.label}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                        flex: 1,
                        alignItems: index === 0 ? "flex-start" : "flex-end",
                        borderRight: index < arr.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
                      }}
                    >
                      <span style={{ fontSize: "9px", fontWeight: 600, color: "rgba(255,255,255,0.4)", letterSpacing: "0.05em" }}>
                        {spec.label}
                      </span>
                      <span style={{ fontSize: "12px", fontWeight: 700, color: "#FFFFFF" }}>
                        {spec.val}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Checklist */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", flexGrow: 1 }}>
                  {[
                    "Studio-ready projects aligned with real pipelines",
                    "Hand-picked cohort of 15 students",
                    "Advance studio seat reservations available",
                    "Full Houdini fundamentals to production workflows",
                  ].map((item) => (
                    <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                      <span
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background: RED,
                          marginTop: "7px",
                          flexShrink: 0,
                        }}
                      />
                      <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.85)", lineHeight: 1.4 }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action CTA Block */}
                <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
                  <Link
                    href="/contact?program=Beginner"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      padding: "14px 24px",
                      background: RED,
                      color: "#FFFFFF",
                      fontWeight: 700,
                      fontSize: "14px",
                      borderRadius: "8px",
                      textDecoration: "none",
                      letterSpacing: "0.02em",
                      transition: "background 0.2s",
                    }}
                    className="program-btn"
                  >
                    Join Batch
                  </Link>
                  <a
                    href="#"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      color: "rgba(255,255,255,0.5)",
                      fontSize: "13px",
                      fontWeight: 600,
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    className="download-brochure-link"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download Brochure
                  </a>
                </div>
              </div>
            </div>

            {/* Card 3 — Advanced Houdini Training */}
            <div
              style={{
                background: "#131915",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "16px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
              }}
              className="program-card"
            >
              {/* Card Image */}
              <div style={{ position: "relative", width: "100%", height: "200px" }}>
                <Image
                  src="/images/academy/program-advanced.png"
                  alt="Advanced Houdini Training"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 1024px) 100vw, 400px"
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 60%, rgba(19,25,21,0.9) 100%)" }} />
                {/* Badge */}
                <span
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    background: "rgba(255, 255, 255, 0.12)",
                    color: "#FFFFFF",
                    fontWeight: 700,
                    fontSize: "10px",
                    letterSpacing: "0.08em",
                    padding: "6px 12px",
                    borderRadius: "4px",
                    textTransform: "uppercase",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                >
                  LAUNCHING SOON
                </span>
              </div>

              {/* Card Body */}
              <div style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "24px", flexGrow: 1 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <span
                    style={{
                      fontFamily: "'Open Sans', sans-serif",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: RED,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    FOR WORKING ARTISTS
                  </span>
                  <h3 style={{ margin: 0, fontSize: "24px", fontWeight: 800, color: "#FFFFFF" }}>
                    Advanced Houdini Training
                  </h3>
                </div>

                <p style={{ margin: 0, fontSize: "14px", color: "rgba(255,255,255,0.75)", lineHeight: 1.6, minHeight: "68px" }}>
                  Short-term intensive sessions led by industry experts — focused deep dives into specific Houdini workflows.
                </p>

                {/* Spec Box */}
                <div
                  style={{
                    display: "flex",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "8px",
                    padding: "12px 16px",
                    justifyContent: "space-between",
                  }}
                >
                  {[
                    { label: "DURATION", val: "3 Months" },
                    { label: "SEATS", val: "Only 15" },
                  ].map((spec, index, arr) => (
                    <div
                      key={spec.label}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                        flex: 1,
                        alignItems: index === 0 ? "flex-start" : "flex-end",
                        borderRight: index < arr.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
                      }}
                    >
                      <span style={{ fontSize: "9px", fontWeight: 600, color: "rgba(255,255,255,0.4)", letterSpacing: "0.05em" }}>
                        {spec.label}
                      </span>
                      <span style={{ fontSize: "12px", fontWeight: 700, color: "#FFFFFF" }}>
                        {spec.val}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Checklist */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", flexGrow: 1 }}>
                  {[
                    "Expert-led deep dives into advanced workflows",
                    "Focus: USD, Groom, Tech Animation & more",
                    "Targeted skill-building for working artists",
                    "Studio seat reservations available",
                  ].map((item) => (
                    <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                      <span
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background: RED,
                          marginTop: "7px",
                          flexShrink: 0,
                        }}
                      />
                      <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.85)", lineHeight: 1.4 }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action CTA Block */}
                <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "center" }}>
                  <Link
                    href="/contact?program=Advanced"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      padding: "14px 24px",
                      background: RED,
                      color: "#FFFFFF",
                      fontWeight: 700,
                      fontSize: "14px",
                      borderRadius: "8px",
                      textDecoration: "none",
                      letterSpacing: "0.02em",
                      transition: "background 0.2s",
                    }}
                    className="program-btn"
                  >
                    Join Batch
                  </Link>
                  <a
                    href="#"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      color: "rgba(255,255,255,0.5)",
                      fontSize: "13px",
                      fontWeight: 600,
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    className="download-brochure-link"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download Brochure
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. WHY US — node 154:389 — LIGHT THEME ─────────────────── */}
      <section
        id="why-us"
        style={{
          background: ABOUT_BG, // Warm light grey/beige
          color: ABOUT_TEXT_PRIMARY,
          padding: "120px 80px 140px",
          position: "relative",
          overflow: "hidden",
        }}
        className="academy-section"
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: "80px",
            alignItems: "flex-start",
          }}
          className="why-us-grid"
        >
          {/* Left Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
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
              WHY TATHASTU
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <h2
                style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: "clamp(32px, 3.2vw, 44px)",
                  fontWeight: 900,
                  lineHeight: 1.15,
                  color: ABOUT_TEXT_PRIMARY,
                  margin: 0,
                }}
              >
                Transform potential into <span style={{ color: ABOUT_ACCENT_RED }}>reality</span>
              </h2>
              <div
                style={{
                  width: "56px",
                  height: "4px",
                  background: ABOUT_ACCENT_RED,
                  marginTop: "16px",
                }}
              ></div>
            </div>

            <p
              style={{
                margin: 0,
                fontSize: "16px",
                lineHeight: 1.7,
                color: ABOUT_TEXT_SECONDARY,
              }}
            >
              We are not just another training institute. We are the bridge between where you are and where the industry needs you to be.
            </p>

            <div style={{ marginTop: "8px" }}>
              <Link
                href="/contact?source=WhyUs"
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
                className="talk-advisor-btn"
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
                Talk to an Advisor
              </Link>
            </div>

            {/* Dark Workstation Placeholder Image */}
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "16/10",
                background: "#161B18", // Dark solid placeholder color
                borderRadius: "20px",
                border: "1px solid rgba(0,0,0,0.15)",
                boxShadow: "0 20px 45px rgba(0,0,0,0.08)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                padding: "24px",
                marginTop: "16px",
              }}
              className="why-us-image-placeholder"
            >
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255, 255, 255, 0.25)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              <span
                style={{
                  color: "rgba(255, 255, 255, 0.5)",
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                  textAlign: "center",
                }}
              >
                Workstation Image
              </span>
              <span
                style={{
                  color: "rgba(255, 255, 255, 0.3)",
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  textAlign: "center",
                }}
              >
                Pending Figma Download (Rate Limited)
              </span>
            </div>
          </div>

          {/* Right Column — 2x3 Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "24px",
            }}
            className="why-us-grid-right"
          >
            {[
              {
                title: "Authorized SideFX Partner",
                desc: "Officially recognized by SideFX for delivering world-class Houdini training in India.",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                )
              },
              {
                title: "Project-Driven Learning",
                desc: "Learn by doing, not by theory. Every lesson feeds into real, studio-grade deliverables.",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                )
              },
              {
                title: "Studio-Aligned Curriculum",
                desc: "Courses designed with actual studios grounded in real production pipelines.",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 2 7 12 12 22 7 12 2" />
                    <polyline points="2 17 12 22 22 17" />
                    <polyline points="2 12 12 17 22 12" />
                  </svg>
                )
              },
              {
                title: "Expert Industry Mentors",
                desc: "Learn from trainers with direct, hands-on experience from top studio productions.",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
                  </svg>
                )
              },
              {
                title: "Talent Pipeline for Studios",
                desc: "Studios can reserve seats ahead of time and hire artists ready to contribute from day one.",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                )
              },
              {
                title: "Capped at 15 Per Batch",
                desc: "Small cohorts ensure every student receives personal guidance and focused mentorship.",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                )
              }
            ].map((card, idx) => (
              <div
                key={idx}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "16px",
                  padding: "24px 28px",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.02)",
                  border: "1px solid rgba(0, 0, 0, 0.03)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                className="why-us-card"
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    background: "#FDF2F2",
                    color: ABOUT_ACCENT_RED,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {card.icon}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <h4
                    style={{
                      margin: 0,
                      fontSize: "16px",
                      fontWeight: 700,
                      color: ABOUT_TEXT_PRIMARY,
                      lineHeight: 1.3,
                    }}
                  >
                    {card.title}
                  </h4>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "13.5px",
                      color: ABOUT_TEXT_SECONDARY,
                      lineHeight: 1.5,
                    }}
                  >
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
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
        .program-card:hover {
          transform: translateY(-6px);
          border-color: rgba(224,32,32,0.4) !important;
          box-shadow: 0 20px 40px rgba(0,0,0,0.5), 0 0 25px rgba(224,32,32,0.15) !important;
        }
        .program-btn:hover {
          background: #C22F22 !important;
        }
        .download-brochure-link:hover {
          color: #FFFFFF !important;
          text-decoration: underline !important;
        }
        .talk-advisor-btn:hover {
          background: #C22F22 !important;
          transform: translateY(-2px);
        }
        .why-us-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.06) !important;
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
          .programs-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .programs-container {
            padding: 100px 32px 100px !important;
          }
          .why-us-grid {
            grid-template-columns: 1fr !important;
            gap: 64px !important;
          }
          .why-us-grid-right {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
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
