import React from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import { fetchStrapi } from "@/lib/api";
import { SiteSettings, Industry } from "@tathastu/types";

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

/* ── Programs Data ────────────────────────────────────────────────── */
const PROGRAMS = [
  {
    title: "Studio Houdini Training",
    image: "/images/academy/program-studio.png",
    description:
      "Custom in-house Houdini training built around your studio's exact production requirements and L&D goals.",
    items: [
      "Crafted with your L&D team",
      "Flip, Pyro, Destruction, Groom, USD & more",
      "Flexible seat or full-batch bookings",
      "Trusted by leading VFX & animation studios",
    ],
    ctaLabel: "Book Studio Training",
    href: "/contact?program=Studio",
  },
  {
    title: "Beginner Houdini Training",
    image: "/images/academy/program-beginner.png",
    description:
      "Our flagship Academy trains a hand-picked batch of 15 students in Houdini from the ground up.",
    items: [
      "Studio-ready projects aligned with real pipelines",
      "Hand-picked cohort of 15 students",
      "Advance studio seat reservations available",
      "Full Houdini fundamentals to production workflows",
    ],
    ctaLabel: "Join Batch",
    href: "/contact?program=Beginner",
  },
  {
    title: "Advanced Houdini Training",
    image: "/images/academy/program-advanced.png",
    description:
      "Short-term intensive sessions led by industry experts — focused deep dives into specific Houdini workflows.",
    items: [
      "Expert-led deep dives into advanced workflows",
      "Focus: USD, Groom, Tech Animation & more",
      "Targeted skill-building for working artists",
      "Studio seat reservations available",
    ],
    ctaLabel: "Join Batch",
    href: "/contact?program=Advanced",
  },
];

/* ── Courses & Videos Data ────────────────────────────────────────── */
const COURSES = [
  {
    title: "AI for Interior Design",
    image: "/images/academy/about-brain.png",
    description:
      "Create cinematic interior renders using AI — from rough sketches to fully",
    duration: "7-Weeks",
    badge: "NEW",
    video: false,
  },
  {
    title: "Compositing in Nuke",
    image: "/images/academy/program-advanced.png",
    description:
      "Learn compositing like a pro in this incredible Nuke course for FX Artists",
    duration: "10-Weeks",
    badge: null,
    video: false,
  },
  {
    title: "Intro to Unreal Engine",
    image: "/images/academy/program-beginner.png",
    description:
      "Learn the basics of Unreal Engine in this exciting game design course.",
    duration: "8-Weeks",
    badge: null,
    video: false,
  },
  {
    title: "Intro to Houdini FX",
    image: "/images/academy/program-studio.png",
    description:
      "Ready to get serious about your FX journey? Check out this intermediate",
    duration: "12-Weeks",
    badge: null,
    video: false,
  },
  {
    title: "Coding Generative AI",
    image: "/images/academy/about-vr.jpg",
    description:
      "A deep dive into applied generative AI, guiding students from foundational AI",
    duration: "10-Weeks",
    badge: "NEW",
    video: true,
  },
  {
    title: "Unreal Engine Short Film",
    image: "/images/academy/hero-bg.jpg",
    description: "Learn how to create a short film using Unreal Engine.",
    duration: "INSTANT ACCESS",
    badge: null,
    video: false,
  },
];

/* ── Reusable Buttons ────────────────────────────────────────────── */
function RedBtn({ href, children }: { href: string; children: any }) {
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

function OutlineBtn({ href, children }: { href: string; children: any }) {
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

export default async function AcademyPage() {
  const [settingsRes, industriesRes] = await Promise.all([
    fetchStrapi<{ data: SiteSettings }>(
      "/site-setting?populate[nav][populate]=*&populate[footerColumns][populate]=*&populate[socialLinks][populate]=*&populate[logo][populate]=*",
    ),
    fetchStrapi<{ data: Industry[] }>("/industries?sort=order:asc"),
  ]);

  const siteSettings = settingsRes?.data;
  const industries = industriesRes?.data || [];

  if (!siteSettings) return null;

  return (
    <>
      <Header siteSettings={siteSettings} industries={industries} />
      <div
        style={{
          background: DARK,
          minHeight: "100vh",
          fontFamily: "'Open Sans', sans-serif",
        }}
      >
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
            <div
              style={{ display: "flex", flexDirection: "column", gap: "26px" }}
            >
              {/* Academy wordmark */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {/* Triangle mark */}
                <svg
                  width="32"
                  height="30"
                  viewBox="0 0 32 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16 0L32 30H0L16 0Z" fill={RED} />
                </svg>

                <div
                  style={{ display: "flex", flexDirection: "column", gap: "0" }}
                >
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
                    TATHASTU
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
                    ACADEMY
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
                  Learn. Rise. Lead.
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
                From beginner to pro— become a production-ready Houdini artist.
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
                Tathastu Academy empowers future Houdini artists with
                industry-focused, project-driven training for real-world
                production success.
              </p>

              {/* CTA */}
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  flexWrap: "wrap",
                  marginTop: "8px",
                }}
              >
                <RedBtn href="/contact?source=Academy">Book A Call</RedBtn>
              </div>
            </div>

            {/* Right — hero graphic */}
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "480px",
                justifySelf: "end",
              }}
              className="academy-hero-image-wrap"
            >
              <div style={{ position: "relative", width: "100%", aspectRatio: "752/700" }}>
                <Image
                  src="/images/academy/hero.svg"
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
              alignItems: "stretch",
            }}
            className="about-grid"
          >
            {/* Left Column — Single photo */}
            <div
              style={{
                width: "100%",
                maxWidth: "420px",
                height: "100%",
                justifySelf: "center",
              }}
              className="about-photo-wrap"
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  borderRadius: "24px",
                  overflow: "hidden",
                  boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                }}
                className="about-photo"
              >
                <Image
                  src="/images/academy/about-vr.jpg"
                  alt="Tathastu Academy students collaborating on a project"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 1024px) 100vw, 420px"
                />
              </div>
            </div>

            {/* Right Column — Mission & Feature rows */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "28px" }}
            >
              {/* Heading */}
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
                <span style={{ color: ABOUT_ACCENT_RED }}>
                  Building careers.
                </span>
              </h2>

              {/* Paragraph */}
              <p
                style={{
                  margin: 0,
                  fontSize: "15px",
                  lineHeight: 1.7,
                  color: ABOUT_TEXT_SECONDARY,
                }}
              >
                Tathastu Academy, powered by Tathastu Techno Solution and an
                official SideFX partner, delivers studio-focused Houdini
                training designed to create production-ready artists for the
                VFX industry.
              </p>

              {/* Feature Row Cards */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
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
                    <h4
                      style={{
                        margin: "0 0 4px 0",
                        fontSize: "16px",
                        fontWeight: 700,
                        color: ABOUT_TEXT_PRIMARY,
                      }}
                    >
                      Project-Driven Learning
                    </h4>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "13px",
                        color: ABOUT_TEXT_SECONDARY,
                        lineHeight: 1.5,
                      }}
                    >
                      Every module builds toward real deliverables studios
                      actually expect.
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
                    <h4
                      style={{
                        margin: "0 0 4px 0",
                        fontSize: "16px",
                        fontWeight: 700,
                        color: ABOUT_TEXT_PRIMARY,
                      }}
                    >
                      Studio-Aligned Curriculum
                    </h4>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "13px",
                        color: ABOUT_TEXT_SECONDARY,
                        lineHeight: 1.5,
                      }}
                    >
                      Courses designed in collaboration with real production
                      pipelines.
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
                    <h4
                      style={{
                        margin: "0 0 4px 0",
                        fontSize: "16px",
                        fontWeight: 700,
                        color: ABOUT_TEXT_PRIMARY,
                      }}
                    >
                      Talent Pipeline for Studios
                    </h4>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "13px",
                        color: ABOUT_TEXT_SECONDARY,
                        lineHeight: 1.5,
                      }}
                    >
                      Book seats in advance and hire trained, ready-to-deploy
                      artists.
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
            background:
              "linear-gradient(180deg, #2E1B0E 0%, #180F09 40%, #0B0705 100%)",
            color: "#FFFFFF",
            overflow: "hidden",
          }}
          className="academy-section"
        >
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "16px",
                marginBottom: "64px",
                textAlign: "center",
              }}
            >
              <h2
                style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: "clamp(28px, 2.8vw, 38px)",
                  fontWeight: 900,
                  lineHeight: 1.2,
                  color: "#FFFFFF",
                  margin: 0,
                  maxWidth: "680px",
                }}
              >
                Training for every stage of{" "}
                <span style={{ color: RED }}>your Houdini journey</span>
              </h2>
              <p
                style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.6,
                  margin: 0,
                  maxWidth: "560px",
                }}
              >
                Cutting edge training programs designed for the future of
                digital creation.
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
              {PROGRAMS.map((program) => (
                <div
                  key={program.title}
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "16px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                  className="program-card"
                >
                  {/* Card Image */}
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "240px",
                    }}
                  >
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 1024px) 100vw, 400px"
                    />
                  </div>

                  {/* Card Body */}
                  <div
                    style={{
                      padding: "32px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                      flexGrow: 1,
                    }}
                  >
                    <h3
                      style={{
                        margin: 0,
                        fontSize: "20px",
                        fontWeight: 800,
                        color: ABOUT_TEXT_PRIMARY,
                      }}
                    >
                      {program.title}
                    </h3>

                    <p
                      style={{
                        margin: 0,
                        fontSize: "13px",
                        color: ABOUT_TEXT_SECONDARY,
                        lineHeight: 1.6,
                      }}
                    >
                      {program.description}
                    </p>

                    {/* Checklist */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                        flexGrow: 1,
                      }}
                    >
                      {program.items.map((item) => (
                        <div
                          key={item}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "10px",
                          }}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={RED}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ flexShrink: 0, marginTop: "2px" }}
                          >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M8 12.5l2.5 2.5L16 9.5" />
                          </svg>
                          <span
                            style={{
                              fontSize: "12px",
                              color: ABOUT_TEXT_SECONDARY,
                              lineHeight: 1.4,
                            }}
                          >
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Action CTA Block */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                        alignItems: "center",
                        marginTop: "8px",
                      }}
                    >
                      <Link
                        href={program.href}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          padding: "14px 24px",
                          background: RED,
                          color: "#FFFFFF",
                          fontWeight: 700,
                          fontSize: "13px",
                          borderRadius: "999px",
                          textDecoration: "none",
                          letterSpacing: "0.02em",
                          transition: "background 0.2s",
                        }}
                        className="program-btn"
                      >
                        {program.ctaLabel}
                      </Link>
                      <a
                        href="#"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          padding: "12.5px 24px",
                          background: "#FFFFFF",
                          color: RED,
                          fontWeight: 700,
                          fontSize: "13px",
                          borderRadius: "999px",
                          border: `1.5px solid ${BORDER}`,
                          textDecoration: "none",
                          transition: "background 0.2s, border-color 0.2s",
                        }}
                        className="view-more-link"
                      >
                        View More
                      </a>
                    </div>
                  </div>
                </div>
              ))}
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
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "56px",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
                textAlign: "center",
                maxWidth: "640px",
              }}
            >
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
                Why Choose Tathastu{" "}
                <span style={{ color: ABOUT_ACCENT_RED }}>Academy</span>
              </h2>
              <p
                style={{
                  margin: 0,
                  fontSize: "16px",
                  lineHeight: 1.7,
                  color: ABOUT_TEXT_SECONDARY,
                }}
              >
                We are not just another training institute. We are the bridge
                between where you are and where the industry needs you to be.
              </p>
            </div>

            {/* Cards Grid — 3x2 */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "24px",
                width: "100%",
              }}
              className="why-us-grid-right"
            >
              {[
                {
                  title: "Authorized SideFX Partner",
                  desc: "Officially recognized by SideFX for delivering world-class Houdini training in India.",
                  icon: (
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
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  ),
                },
                {
                  title: "Project-Driven Learning",
                  desc: "Learn by doing, not by theory. Every lesson feeds into real, studio-grade deliverables.",
                  icon: (
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
                  ),
                },
                {
                  title: "Studio-Aligned Curriculum",
                  desc: "Courses designed with actual studios grounded in real production pipelines.",
                  icon: (
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
                      <polygon points="12 2 2 7 12 12 22 7 12 2" />
                      <polyline points="2 17 12 22 22 17" />
                      <polyline points="2 12 12 17 22 12" />
                    </svg>
                  ),
                },
                {
                  title: "Expert Industry Mentors",
                  desc: "Learn from trainers with direct, hands-on experience from top studio productions.",
                  icon: (
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
                  ),
                },
                {
                  title: "Talent Pipeline for Studios",
                  desc: "Studios can reserve seats ahead of time and hire artists ready to contribute from day one.",
                  icon: (
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
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  ),
                },
                {
                  title: "Capped at 15 Per Batch",
                  desc: "Small cohorts ensure every student receives personal guidance and focused mentorship.",
                  icon: (
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
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  ),
                },
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
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
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

            {/* CTA */}
            <Link
              href="/contact?source=WhyUs"
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
        </section>

        {/* ── 5.5 LATEST COURSES & VIDEOS — LIGHT THEME ────────────────── */}
        <section
          style={{
            background: "#F0F0F0",
            padding: "100px 80px 120px",
            position: "relative",
            overflow: "hidden",
          }}
          className="academy-section"
        >
          {/* Decorative concentric circles */}
          <div
            style={{
              position: "absolute",
              bottom: "-160px",
              left: "-160px",
              width: "380px",
              height: "380px",
              borderRadius: "50%",
              border: "1px solid rgba(0,0,0,0.06)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-110px",
              left: "-110px",
              width: "270px",
              height: "270px",
              borderRadius: "50%",
              border: "1px solid rgba(0,0,0,0.06)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              position: "relative",
              zIndex: 5,
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
                textAlign: "center",
                marginBottom: "56px",
              }}
            >
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
                Latest Courses &{" "}
                <span style={{ color: ABOUT_ACCENT_RED }}>Videos</span>
              </h2>
              <p
                style={{
                  margin: 0,
                  fontSize: "15px",
                  lineHeight: 1.6,
                  color: ABOUT_TEXT_SECONDARY,
                }}
              >
                Explore our newest tutorials, expert-led courses, and
                practical learning resources.
              </p>
            </div>

            {/* Cards Grid — 3x2 */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "24px",
              }}
              className="courses-grid"
            >
              {COURSES.map((course) => (
                <div
                  key={course.title}
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.04)",
                    border: "1px solid rgba(0, 0, 0, 0.03)",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                  className="course-card"
                >
                  {/* Card Image */}
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "180px",
                    }}
                  >
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 1024px) 100vw, 400px"
                    />
                    {course.badge && (
                      <span
                        style={{
                          position: "absolute",
                          top: "12px",
                          right: "12px",
                          background: RED,
                          color: "#FFFFFF",
                          fontWeight: 700,
                          fontSize: "10px",
                          letterSpacing: "0.06em",
                          padding: "5px 10px",
                          borderRadius: "4px",
                          textTransform: "uppercase",
                        }}
                      >
                        {course.badge}
                      </span>
                    )}
                    {course.video && (
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            width: "44px",
                            height: "44px",
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.92)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                          }}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill={RED}
                            style={{ marginLeft: "2px" }}
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div
                    style={{
                      padding: "20px 22px 22px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    <h3
                      style={{
                        margin: 0,
                        fontSize: "17px",
                        fontWeight: 700,
                        color: ABOUT_TEXT_PRIMARY,
                      }}
                    >
                      {course.title}
                    </h3>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "13px",
                        color: ABOUT_TEXT_SECONDARY,
                        lineHeight: 1.55,
                      }}
                    >
                      {course.description}{" "}
                      <a
                        href="#"
                        style={{
                          color: RED,
                          fontWeight: 600,
                          textDecoration: "none",
                        }}
                        className="read-more-link"
                      >
                        read more...
                      </a>
                    </p>
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        color: RED,
                        letterSpacing: "0.04em",
                        marginTop: "6px",
                      }}
                    >
                      {course.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "56px",
              }}
            >
              <Link
                href="#"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
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
                View All
              </Link>
            </div>
          </div>
        </section>

        {/* ── 6. SPECIALIZATION — node ~208:2162 — DARK THEME ─────────── */}
        <section
          id="specialization"
          style={{
            background: "#0B0F0C", // Deep dark green-black background
            color: "#FFFFFF",
            padding: "120px 80px 140px",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "60px",
          }}
          className="academy-section"
        >
          {/* Faint Silhouette Caption (Pending Figma Download) */}
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              right: "24px",
              color: "rgba(255, 255, 255, 0.08)",
              fontFamily: "'Open Sans', sans-serif",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              pointerEvents: "none",
            }}
          >
            Silhouette Background Photo (Pending Figma Download)
          </div>

          {/* Section Header */}
          <div
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "18px",
              maxWidth: "800px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "#E02020",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              <span
                style={{ width: "24px", height: "2px", background: "#E02020" }}
              ></span>
              SPECIALIZATION AREAS
              <span
                style={{ width: "24px", height: "2px", background: "#E02020" }}
              ></span>
            </div>

            <h2
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: "clamp(32px, 3.2vw, 44px)",
                fontWeight: 900,
                lineHeight: 1.15,
                color: "#FFFFFF",
                margin: 0,
              }}
            >
              Every Houdini workflow,{" "}
              <span style={{ color: "#E02020" }}>covered.</span>
            </h2>
            <div
              style={{
                width: "56px",
                height: "4px",
                background: "#E02020",
                marginTop: "8px",
              }}
            ></div>
          </div>

          {/* Two Rows of rounded dark pill tags */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              width: "100%",
              maxWidth: "1200px",
              alignItems: "center",
            }}
            className="specialization-rows-container"
          >
            {/* Row 1 */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "16px",
                width: "100%",
              }}
              className="specialization-row"
            >
              {[
                "Flip Simulations",
                "Pyro & Smoke",
                "Destruction & RBD",
                "Environment & FX",
                "Groom",
                "Tech Animation",
              ].map((tag, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "#131915",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "100px",
                    padding: "14px 28px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    transition: "all 0.3s ease",
                    cursor: "default",
                  }}
                  className="spec-pill"
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="#E02020"
                    style={{ flexShrink: 0 }}
                  >
                    <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9Z" />
                  </svg>
                  <span
                    style={{
                      fontSize: "14.5px",
                      fontWeight: 600,
                      color: "rgba(255, 255, 255, 0.85)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {tag}
                  </span>
                </div>
              ))}
            </div>

            {/* Row 2 */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "16px",
                width: "100%",
              }}
              className="specialization-row"
            >
              {[
                "Shading & Lighting",
                "USD Workflows",
                "Procedural Modeling",
                "VEX Scripting",
                "Particles & DOPs",
                "Pipeline Integration",
              ].map((tag, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "#131915",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "100px",
                    padding: "14px 28px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    transition: "all 0.3s ease",
                    cursor: "default",
                  }}
                  className="spec-pill"
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="#E02020"
                    style={{ flexShrink: 0 }}
                  >
                    <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9Z" />
                  </svg>
                  <span
                    style={{
                      fontSize: "14.5px",
                      fontWeight: 600,
                      color: "rgba(255, 255, 255, 0.85)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 7. TEAM — node 154:561 — LIGHT THEME ───────────────────── */}
        <section
          id="team"
          style={{
            background: ABOUT_BG, // Warm cream background
            color: ABOUT_TEXT_PRIMARY,
            padding: "120px 80px 140px",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "60px",
          }}
          className="academy-section"
        >
          {/* Section Header */}
          <div
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "18px",
              maxWidth: "800px",
            }}
          >
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
              <span
                style={{
                  width: "24px",
                  height: "2px",
                  background: ABOUT_ACCENT_GOLD,
                }}
              ></span>
              OUR TEAM
              <span
                style={{
                  width: "24px",
                  height: "2px",
                  background: ABOUT_ACCENT_GOLD,
                }}
              ></span>
            </div>

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
              The people behind{" "}
              <span style={{ color: ABOUT_ACCENT_RED }}>Tathastu Academy</span>
            </h2>
            <div
              style={{
                width: "56px",
                height: "4px",
                background: ABOUT_ACCENT_RED,
                marginTop: "8px",
              }}
            ></div>
          </div>

          {/* 3 cards centered grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "30px",
              width: "100%",
              maxWidth: "1200px",
            }}
            className="team-grid"
          >
            {[
              {
                initials: "CJ",
                name: "Chetan Jain",
                role: "FOUNDER & CEO",
              },
              {
                initials: "VV",
                name: "Venu Victor",
                role: "HEAD OF TRAINING & PRODUCTION STRATEGY",
              },
              {
                initials: "NG",
                name: "Nikitha Gaikwad",
                role: "MARKETING MANAGER",
              },
            ].map((member, idx) => (
              <div
                key={idx}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "20px",
                  padding: "40px 32px",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.02)",
                  border: "1px solid rgba(0, 0, 0, 0.03)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: "24px",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                className="team-card"
              >
                {/* Initials Circle */}
                <div
                  style={{
                    width: "84px",
                    height: "84px",
                    borderRadius: "50%",
                    background: "#FDF2F2",
                    color: ABOUT_ACCENT_RED,
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: "24px",
                    fontWeight: 800,
                    letterSpacing: "0.02em",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "inset 0 2px 8px rgba(217, 56, 41, 0.05)",
                  }}
                >
                  {member.initials}
                </div>

                {/* Text metadata */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <h4
                    style={{
                      margin: 0,
                      fontSize: "18px",
                      fontWeight: 800,
                      color: ABOUT_TEXT_PRIMARY,
                    }}
                  >
                    {member.name}
                  </h4>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "12px",
                      fontWeight: 700,
                      color: ABOUT_TEXT_SECONDARY,
                      letterSpacing: "0.05em",
                      lineHeight: 1.4,
                      minHeight: "34px", // Keep card heights consistent despite role wrap
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {member.role}
                  </p>
                </div>

                {/* Small Red Underline */}
                <div
                  style={{
                    width: "32px",
                    height: "3px",
                    background: ABOUT_ACCENT_RED,
                    borderRadius: "2px",
                  }}
                ></div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 8. CTA — node 154:595 — DARK THEME ────────────────────── */}
        <section
          id="cta"
          style={{
            background: "#0B0F0C", // Deep dark green-black background
            color: "#FFFFFF",
            padding: "140px 80px",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "80px",
          }}
          className="academy-section"
        >
          {/* Workstation/Mountain Background Photo Placeholder (Pending Figma Download) */}
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              right: "24px",
              color: "rgba(255, 255, 255, 0.08)",
              fontFamily: "'Open Sans', sans-serif",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              pointerEvents: "none",
            }}
          >
            Workstation/Mountain Background Photo (Pending Figma Download)
          </div>

          {/* Content Block */}
          <div
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "28px",
              maxWidth: "800px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "#E02020",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              <span
                style={{ width: "24px", height: "2px", background: "#E02020" }}
              ></span>
              READY TO BEGIN?
              <span
                style={{ width: "24px", height: "2px", background: "#E02020" }}
              ></span>
            </div>

            <h2
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: "clamp(34px, 3.6vw, 48px)",
                fontWeight: 900,
                lineHeight: 1.15,
                color: "#FFFFFF",
                margin: 0,
              }}
            >
              Launch your{" "}
              <span style={{ color: "#E02020" }}>Houdini career</span> today
            </h2>

            <p
              style={{
                margin: 0,
                fontSize: "16px",
                lineHeight: 1.8,
                color: "rgba(255, 255, 255, 0.7)",
                maxWidth: "680px",
              }}
            >
              The demand for production-ready Houdini artists is higher than
              ever. Whether you're an aspiring professional or a studio looking
              to upskill your team, Tathastu Academy is here to help.
            </p>

            {/* Action buttons */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "18px",
                marginTop: "12px",
              }}
              className="cta-buttons-container"
            >
              <Link
                href="/contact?source=CTA"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "16px 36px",
                  background: "#E02020",
                  color: "#FFFFFF",
                  fontFamily: "'Open Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "15px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  boxShadow: "0 4px 14px rgba(224, 32, 32, 0.3)",
                  transition: "background 0.2s ease, transform 0.2s ease",
                }}
                className="cta-btn-primary"
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
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Book a Call Now
              </Link>

              <Link
                href="#programs"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "16px 36px",
                  background: "transparent",
                  color: "#FFFFFF",
                  fontFamily: "'Open Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "15px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  border: "2px solid rgba(255, 255, 255, 0.2)",
                  transition: "all 0.2s ease",
                }}
                className="cta-btn-secondary"
              >
                Explore Programs
              </Link>
            </div>
          </div>

          {/* 3 Dark Contact Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "30px",
              width: "100%",
              maxWidth: "1200px",
            }}
            className="contact-grid"
          >
            {[
              {
                label: "GENERAL ENQUIRIES",
                name: "Anusha Kuncham",
                phone: "+91 81256 13838",
                email: "academy@tathastu.global",
              },
              {
                label: "FOUNDER & CEO",
                name: "Chetan Jain",
                phone: "+91 98201 92970",
                email: null,
              },
              {
                label: "HEAD OF TRAINING",
                name: "Venu Victor",
                phone: "+91 96111 04802",
                email: null,
              },
            ].map((card, idx) => (
              <div
                key={idx}
                style={{
                  background: "#131915",
                  borderRadius: "16px",
                  padding: "32px 36px",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "18px",
                  transition: "transform 0.3s ease, border-color 0.3s ease",
                }}
                className="contact-card"
              >
                <div
                  style={{
                    color: "#E02020",
                    fontSize: "10.5px",
                    fontWeight: 800,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  {card.label}
                </div>

                <h4
                  style={{
                    margin: 0,
                    fontSize: "18px",
                    fontWeight: 800,
                    color: "#FFFFFF",
                  }}
                >
                  {card.name}
                </h4>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    marginTop: "4px",
                  }}
                >
                  <a
                    href={`tel:${card.phone.replace(/\s+/g, "")}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      color: "rgba(255, 255, 255, 0.65)",
                      fontSize: "14px",
                      textDecoration: "none",
                      fontWeight: 600,
                      transition: "color 0.2s",
                    }}
                    className="contact-link"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#E02020"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ flexShrink: 0 }}
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    {card.phone}
                  </a>

                  {card.email && (
                    <a
                      href={`mailto:${card.email}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        color: "rgba(255, 255, 255, 0.65)",
                        fontSize: "14px",
                        textDecoration: "none",
                        fontWeight: 600,
                        transition: "color 0.2s",
                      }}
                      className="contact-link"
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#E02020"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ flexShrink: 0 }}
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                      {card.email}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 9. ACADEMY FOOTER — node 189:7387 — LIGHT THEME ─────────── */}
        <footer
          id="academy-footer"
          style={{
            background: "linear-gradient(135deg, #EBF3EF 0%, #FDF5F2 100%)", // soft light greenish -> peach gradient
            color: ABOUT_TEXT_PRIMARY,
            padding: "100px 80px 40px",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            gap: "80px",
            borderTop: "1px solid rgba(0, 0, 0, 0.05)",
          }}
          className="academy-section"
        >
          {/* Top 3 Columns Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1.5fr 1fr",
              gap: "60px",
              width: "100%",
              maxWidth: "1200px",
              margin: "0 auto",
            }}
            className="footer-grid"
          >
            {/* Column 1: Information */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                alignItems: "flex-start",
              }}
            >
              {/* Logo Mark */}
              <div
                style={{ display: "flex", flexDirection: "column", gap: "2px" }}
              >
                <span
                  style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: "22px",
                    fontWeight: 900,
                    color: "#1A1A1A",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  TATHASTU ACADEMY
                </span>
                <span
                  style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: "10.5px",
                    fontWeight: 700,
                    color: "#D93829",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                  }}
                >
                  Learn. Rise. Lead.
                </span>
              </div>

              <p
                style={{
                  margin: 0,
                  fontSize: "14px",
                  lineHeight: 1.7,
                  color: ABOUT_TEXT_SECONDARY,
                  maxWidth: "320px",
                }}
              >
                A division of Tathastu Techno Solution and an authorized SideFX
                partner in India.
              </p>
            </div>

            {/* Column 2: Contact Us */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <h5
                style={{
                  margin: 0,
                  fontSize: "12px",
                  fontWeight: 800,
                  color: ABOUT_ACCENT_GOLD,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                CONTACT US
              </h5>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {/* Email */}
                <a
                  href="mailto:academy@tathastu.global"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    color: ABOUT_TEXT_PRIMARY,
                    fontSize: "14px",
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                  }}
                  className="footer-link-dark"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#D93829"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ flexShrink: 0 }}
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  Email: academy@tathastu.global
                </a>

                {/* Anusha */}
                <a
                  href="tel:+918125613838"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    color: ABOUT_TEXT_PRIMARY,
                    fontSize: "14px",
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                  }}
                  className="footer-link-dark"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#D93829"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ flexShrink: 0 }}
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  Phone: Anusha Kuncham +91 81256 13838
                </a>

                {/* Chetan */}
                <a
                  href="tel:+919820192970"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    color: ABOUT_TEXT_PRIMARY,
                    fontSize: "14px",
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                    paddingLeft: "25px", // align with phone icon text
                  }}
                  className="footer-link-dark"
                >
                  Phone: Chetan Jain +91 98201 92970
                </a>

                {/* Venu */}
                <a
                  href="tel:+919611104802"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    color: ABOUT_TEXT_PRIMARY,
                    fontSize: "14px",
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                    paddingLeft: "25px", // align with phone icon text
                  }}
                  className="footer-link-dark"
                >
                  Phone: Venu Victor +91 96111 04802
                </a>

                {/* Location */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    color: ABOUT_TEXT_PRIMARY,
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#D93829"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ flexShrink: 0 }}
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Location: India
                </div>
              </div>
            </div>

            {/* Column 3: Follow us */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <h5
                style={{
                  margin: 0,
                  fontSize: "12px",
                  fontWeight: 800,
                  color: ABOUT_ACCENT_GOLD,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                FOLLOW US
              </h5>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                {[
                  {
                    name: "Facebook",
                    href: "https://facebook.com/tathastuglobal",
                    // FB Icon
                    path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
                  },
                  {
                    name: "Instagram",
                    href: "https://instagram.com/tathastuglobal",
                    // Instagram Icon
                    path: "M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5zm-5 12a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm6.5-6.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z",
                    isCircle: true,
                  },
                  {
                    name: "LinkedIn",
                    href: "https://linkedin.com/company/tathastu-techno-solution",
                    // LinkedIn Icon
                    path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4z",
                  },
                  {
                    name: "X",
                    href: "https://x.com/tathastuglobal",
                    // X Icon
                    path: "M4 4l11.733 16h4.267l-11.733 -16z M4 20l6.768 -6.768 M20 4l-6.768 6.768",
                    useStroke: true,
                  },
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid rgba(0, 0, 0, 0.05)",
                      transition: "all 0.2s ease",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.02)",
                    }}
                    className="social-icon-btn"
                    title={social.name}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill={social.useStroke ? "none" : "#4D4D4D"}
                      stroke={social.useStroke ? "#4D4D4D" : "none"}
                      strokeWidth={social.useStroke ? "2.5" : "0"}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="social-svg"
                      style={{ transition: "all 0.2s ease" }}
                    >
                      {social.isCircle && (
                        <circle
                          cx="12"
                          cy="12"
                          r="3"
                          fill="none"
                          stroke="#4D4D4D"
                          strokeWidth="2.5"
                        />
                      )}
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom copyright bar */}
          <div
            style={{
              borderTop: "1px solid rgba(0, 0, 0, 0.06)",
              paddingTop: "32px",
              textAlign: "center",
              width: "100%",
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "12px",
                lineHeight: 1.6,
                color: ABOUT_TEXT_SECONDARY,
                fontWeight: 500,
              }}
            >
              © 2026 Tathastu Academy. A division of Tathastu Techno Solution.
              Authorized SideFX partner in India.
            </p>
          </div>
        </footer>

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
          box-shadow: 0 20px 40px rgba(0,0,0,0.35), 0 0 25px rgba(224,32,32,0.1) !important;
        }
        .program-btn:hover {
          background: #C22F22 !important;
        }
        .view-more-link:hover {
          background: #FDF2F2 !important;
          border-color: #E02020 !important;
        }
        .course-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.08) !important;
        }
        .read-more-link:hover {
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
        .spec-pill:hover {
          background: #17201a !important;
          border-color: rgba(224, 32, 32, 0.3) !important;
          transform: scale(1.03);
          box-shadow: 0 4px 15px rgba(224, 32, 32, 0.05);
        }
        .team-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.05) !important;
          border-color: rgba(217,56,41,0.15) !important;
        }
        .cta-btn-primary:hover {
          background: #C22F22 !important;
          transform: translateY(-2px);
        }
        .cta-btn-secondary:hover {
          background: rgba(255,255,255,0.08) !important;
          border-color: #FFFFFF !important;
          transform: translateY(-2px);
        }
        .contact-card:hover {
          transform: translateY(-4px);
          border-color: rgba(224, 32, 32, 0.25) !important;
        }
        .contact-link:hover {
          color: #FFFFFF !important;
          text-decoration: underline !important;
        }
        .footer-link-dark:hover {
          color: #D93829 !important;
          text-decoration: underline !important;
        }
        .social-icon-btn:hover {
          transform: translateY(-3px);
          background: #D93829 !important;
          border-color: #D93829 !important;
          box-shadow: 0 4px 12px rgba(217, 56, 41, 0.2) !important;
        }
        .social-icon-btn:hover .social-svg {
          fill: #FFFFFF !important;
          stroke: #FFFFFF !important;
        }
        @media (max-width: 1024px) {
          .academy-hero-grid {
            grid-template-columns: 1fr !important;
            padding: 100px 32px 60px !important;
          }
          .academy-hero-image-wrap {
            justify-self: center !important;
            margin: 0 auto !important;
            margin-left: 40px !important;
          }
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 120px !important;
            padding: 0 16px !important;
          }
          .about-photo-wrap {
            height: auto !important;
          }
          .about-photo {
            height: auto !important;
            aspect-ratio: 4/5 !important;
          }
          .programs-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .programs-container {
            padding: 100px 32px 100px !important;
          }
          .why-us-grid-right {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .courses-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .specialization-row {
            gap: 12px !important;
          }
          .team-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
            max-width: 450px !important;
            margin: 0 auto !important;
          }
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
            max-width: 450px !important;
            margin: 0 auto !important;
          }
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 640px) {
          .academy-section {
            padding-left: 24px !important;
            padding-right: 24px !important;
            padding-top: 80px !important;
            padding-bottom: 80px !important;
          }
          .spec-pill {
            padding: 12px 20px !important;
          }
          .specialization-rows-container {
            gap: 12px !important;
          }
          .cta-buttons-container {
            flex-direction: column !important;
            width: 100% !important;
            align-items: stretch !important;
            gap: 12px !important;
          }
          .cta-buttons-container a {
            justify-content: center !important;
            width: 100% !important;
          }
        }
      `}</style>
      </div>
      <Footer siteSettings={siteSettings} />
      <WhatsAppFAB />
    </>
  );
}
