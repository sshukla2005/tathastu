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

/* ── Specialization Areas Data ────────────────────────────────────── */
const SPECIALIZATIONS = [
  { title: "Flip Simulations", image: "/images/academy/about-vr.jpg" },
  { title: "Pyro & Smoke", image: "/images/academy/about-brain.png" },
  { title: "Destruction & RBD", image: "/images/academy/program-advanced.png" },
  { title: "Environment & FX", image: "/images/academy/hero-bg.jpg" },
  { title: "Groom", image: "/images/academy/program-studio.png" },
  { title: "Tech Animation", image: "/images/academy/hero-graphic.jpg" },
  { title: "Shading & Lighting", image: "/images/academy/programs-bg.png" },
  { title: "USD Workflows", image: "/images/academy/program-beginner.png" },
];

/* ── Meet the Team Data ───────────────────────────────────────────── */
const TEAM_MEMBERS = [
  { key: "nikitha", name: "Nikitha Gaikwad", role: "Marketing Manager", bg: "#D6EAF8" },
  { key: "chetan", name: "Chetan Jain", role: "Founder & CEO", bg: "#D5F5E3" },
  { key: "nikitha2", name: "Nikitha Gaikwad", role: "President of Sales", bg: "#E8DAEF" },
  { key: "venu", name: "Venu Victor", role: "Co-founder and VFX Supervisor", bg: "#FDEBD0" },
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
              className="academy-hero-text-col"
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
              className="about-right-col"
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
                  className="about-feature-card"
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
                  className="about-feature-card"
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
                  className="about-feature-card"
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
                href="/academy/courses&videos"
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
            background: "#0B0F0C",
            color: "#FFFFFF",
            padding: "120px 80px 140px",
            position: "relative",
            overflow: "hidden",
          }}
          className="academy-section"
        >
          {/* Background photo */}
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <Image
              src="/images/academy/hero-bg.jpg"
              alt=""
              fill
              style={{ objectFit: "cover", objectPosition: "center center" }}
              sizes="100vw"
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(11,15,12,0.92) 0%, rgba(11,15,12,0.82) 45%, rgba(11,15,12,0.95) 100%)",
              }}
            />
          </div>

          <div
            style={{
              position: "relative",
              zIndex: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "48px",
              maxWidth: "1280px",
              width: "100%",
              margin: "0 auto",
            }}
          >
            {/* Section Header — glass panel */}
            <div
              style={{
                background: "rgba(10,8,6,0.55)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "16px",
                padding: "36px 64px",
                textAlign: "center",
              }}
            >
              <h2
                style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: "clamp(28px, 3vw, 40px)",
                  fontWeight: 800,
                  lineHeight: 1.3,
                  color: "#FFFFFF",
                  margin: 0,
                }}
              >
                Every Houdini
                <br />
                Workflow, <span style={{ color: RED }}>Covered</span>
              </h2>
            </div>

            {/* Cards Grid — 4x2 */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "24px",
                width: "100%",
              }}
              className="specialization-grid"
            >
              {SPECIALIZATIONS.map((spec) => (
                <div
                  key={spec.title}
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "16px",
                    padding: "14px 14px 20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "14px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                  className="spec-card"
                >
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "1/1",
                      borderRadius: "12px",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={spec.image}
                      alt={spec.title}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 1024px) 45vw, 290px"
                    />
                  </div>
                  <span
                    style={{
                      fontSize: "17px",
                      fontWeight: 700,
                      color: ABOUT_TEXT_PRIMARY,
                      textAlign: "center",
                    }}
                  >
                    {spec.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 7. MEET THE TEAM — LIGHT THEME ───────────────────────────── */}
        <section
          style={{
            position: "relative",
            background: "#FFFFFF",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "120px 80px",
            color: "#000000",
          }}
          className="academy-section"
        >
          <div
            style={{
              position: "relative",
              zIndex: 10,
              maxWidth: "1280px",
              margin: "0 auto",
              width: "100%",
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
                gap: "16px",
                textAlign: "center",
                maxWidth: "800px",
              }}
            >
              <h2
                style={{
                  fontSize: "clamp(32px, 3.2vw, 44px)",
                  fontWeight: 700,
                  lineHeight: 1.25,
                  color: "#000000",
                  margin: 0,
                  fontFamily: "'Open Sans', sans-serif",
                }}
              >
                Meet <span style={{ color: RED }}>the Team</span>
              </h2>
              <p
                style={{
                  fontSize: "18px",
                  lineHeight: 1.6,
                  color: "#555555",
                  margin: 0,
                  fontFamily: "'Open Sans', sans-serif",
                  fontWeight: 400,
                }}
              >
                Industry veterans and visionary leaders driving the future of
                professional VFX collaboration
              </p>
            </div>

            {/* Members Row — 4 cards */}
            <div className="meet-team-row">
              {TEAM_MEMBERS.map((member, idx) => (
                <div key={idx} className="meet-member-card">
                  <div
                    className="meet-member-arch"
                    style={{ backgroundColor: member.bg }}
                  >
                    <div className="meet-member-info">
                      <h3 className="meet-member-name">{member.name}</h3>
                      <p className="meet-member-role">{member.role}</p>
                    </div>
                    <div className="meet-member-photo">
                      <Image
                        src={`/images/studio/member-${member.key}.png`}
                        alt={member.name}
                        fill
                        style={{ objectFit: "cover", objectPosition: "center top" }}
                        sizes="(max-width: 640px) 45vw, 260px"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 8. CTA BAND — same design as homepage CtaBand component ──── */}
        <section
          style={{
            position: "relative",
            overflow: "hidden",
            padding: "100px 80px",
            textAlign: "center",
            backgroundColor: "#0a0e1a",
          }}
        >
          {/* Circuit board / workstation photo background */}
          <Image
            src="/images/cta/cta-bg.jpg"
            alt=""
            fill
            style={{ objectFit: "cover", zIndex: 0 }}
            aria-hidden
          />

          {/* Dark overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(5,8,20,0.82)",
              zIndex: 1,
            }}
          />

          {/* Content */}
          <div
            style={{
              position: "relative",
              zIndex: 10,
              maxWidth: "800px",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <h2
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: "clamp(28px, 3vw, 44px)",
                fontWeight: 700,
                color: "#FFFFFF",
                lineHeight: 1.3,
                margin: 0,
              }}
            >
              Ready to Launch Your Houdini Career?
            </h2>

            <p
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: "clamp(15px, 1.4vw, 18px)",
                fontWeight: 400,
                color: "rgba(255,255,255,0.85)",
                lineHeight: 1.7,
                margin: 0,
                // maxWidth: "620px",
              }}
            >
              The demand for Houdini trained, production ready artists is higher than  ever. Whether you are an aspiring professional or a studio looking to  upskill your team, Tathastu Academy is here to help.
            </p>

            {/* "Book A Call" blue gradient pill */}
            <Link
              href="/contact?source=Academy"
              style={{
                padding: "14px 36px",
                background: "linear-gradient(90deg, #920B08 0%, #D61814 100%)",
                borderRadius: "50px",
                color: "#FFFFFF",
                fontSize: "15px",
                fontWeight: 600,
                textDecoration: "none",
                marginTop: "8px",
              }}
            >
              Request Demo
            </Link>
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
        .spec-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.4) !important;
        }
        .meet-team-row {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 260px));
          justify-content: center;
          gap: 24px;
          width: 100%;
        }
        .meet-member-card {
          display: flex;
          flex-direction: column;
          width: 100%;
        }
        .meet-member-arch {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 460px;
          border-radius: 999px;
          overflow: hidden;
          position: relative;
        }
        .meet-member-info {
          flex-shrink: 0;
          padding: 56px 14px 12px;
          text-align: center;
        }
        .meet-member-name {
          font-size: 18px;
          font-weight: 700;
          color: #000000;
          margin: 0;
          font-family: 'Open Sans', sans-serif;
        }
        .meet-member-role {
          font-size: 13px;
          font-weight: 500;
          color: #555555;
          margin: 4px 0 0;
          font-family: 'Open Sans', sans-serif;
        }
        .meet-member-photo {
          position: relative;
          flex: 1 1 auto;
          min-height: 0;
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
          .academy-hero-text-col {
            align-items: center !important;
            text-align: center !important;
          }
          .academy-hero-text-col > div:first-child {
            align-items: center !important;
          }
          .academy-hero-image-wrap {
            justify-self: center !important;
            margin: 0 auto !important;
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
          .about-right-col {
            text-align: center !important;
          }
          .about-feature-card {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            gap: 12px !important;
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
          .specialization-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
          }
          .meet-team-row {
            grid-template-columns: repeat(2, minmax(0, 200px)) !important;
            gap: 32px !important;
          }
          .meet-member-arch {
            height: 400px !important;
          }
          .meet-member-info {
            padding: 36px 14px 12px !important;
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
          .meet-team-row {
            grid-template-columns: repeat(2, minmax(0, 140px)) !important;
            gap: 20px !important;
          }
          .meet-member-arch {
            height: 300px !important;
          }
          .meet-member-info {
            padding: 48px 10px 8px !important;
          }
          .meet-member-name {
            font-size: 14px !important;
          }
          .meet-member-role {
            font-size: 11px !important;
            line-height: 15px !important;
          }
        }
      `}</style>
      </div>
      <Footer siteSettings={siteSettings} />
      <WhatsAppFAB />
    </>
  );
}
