import React from "react";
import Link from "next/link";
import Image from "next/image";
import AcademyFAQ from "./AcademyFAQ";

export async function generateMetadata() {
  return {
    title: "Tathastu Academy — Learn. Rise. Lead.",
    description:
      "Tathastu Academy bridges the gap between Houdini training and real-world studio production — building the next generation of VFX professionals through project-driven learning.",
  };
}

/* ── Design Tokens ────────────────────────────────────────────────── */
const RED = "#E02020";
const RED_DARK = "#B81818";
const DARK = "#0D0D0D";
const DARK2 = "#141414";
const CARD_BG = "#1A1A1A";
const BORDER = "rgba(224,32,32,0.35)";

/* ── Reusable small components ───────────────────────────────────── */
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

/* ── Course card data ─────────────────────────────────────────────── */
const COURSES = [
  {
    tag: "FLAGSHIP",
    tagColor: RED,
    duration: "6 months",
    badge: "DEEP TRAINING",
    title: "Houdini FX Masterclass",
    desc: "The complete production pipeline — from procedural modeling and VEX scripting to RBD, pyro, FLIP fluids, Vellum, and USD-based rendering. Designed for artists serious about studio careers.",
    modules: ["Procedural Modeling & VEX", "RBD & Pyro Simulations", "FLIP Fluids & Vellum", "Crowd Systems & USD"],
    cta: "/contact?source=Academy&course=houdini-masterclass",
  },
  {
    tag: "INTENSIVE",
    tagColor: "#C07000",
    duration: "3 months",
    badge: "FAST TRACK",
    title: "Houdini Core Intensive",
    desc: "An accelerated deep-dive for artists who already know 3D. Master the fundamentals of Houdini's node-based workflow, SOPs, DOPs, and build a production-grade showreel piece.",
    modules: ["SOP Fundamentals & CHOPs", "Dynamics & DOPs", "Rendering with Karma", "Showreel Production"],
    cta: "/contact?source=Academy&course=houdini-core",
  },
  {
    tag: "SPECIALIZATION",
    tagColor: "#1a6bbf",
    duration: "6–8 weeks",
    badge: "10+ TRACKS",
    title: "Specialization Tracks",
    desc: "Targeted modules for artists who want to deepen a specific skill. Choose from Pyro & Smoke, FLIP Fluids, Crowd Sims, Procedural Characters, USD/Karma, and more.",
    modules: ["Pyro & Smoke FX", "FLIP & Ocean Simulations", "Crowd Systems", "USD & Karma Rendering"],
    cta: "/contact?source=Academy&course=specialization",
  },
];

/* ── Why choose cards ─────────────────────────────────────────────── */
const WHY = [
  {
    icon: "🎓",
    title: "Production-Ready Mentors",
    desc: "Learn directly from Senior VFX TDs who have shipped feature films and episodic VFX. Real pipelines, real feedback.",
  },
  {
    icon: "🎬",
    title: "Project-Driven Learning",
    desc: "Every concept is taught through a project. You graduate with a polished, studio-quality demo reel — not just a certificate.",
  },
  {
    icon: "👥",
    title: "Small Batches of 15",
    desc: "Intimate cohorts mean your mentor knows your work and can tailor feedback. No lost students in a crowd of hundreds.",
  },
  {
    icon: "🌐",
    title: "100% Online & Live",
    desc: "All sessions are live, not pre-recorded. Attend from anywhere — Asia, Europe, Americas. Recordings available for all sessions.",
  },
  {
    icon: "🏢",
    title: "Studio Network",
    desc: "Our alumni network spans world-class VFX studios. We make warm introductions and facilitate placement for top graduates.",
  },
  {
    icon: "📜",
    title: "SideFX Certified Path",
    desc: "Our curriculum aligns with SideFX's official Houdini certification pathway — a recognized credential in the industry.",
  },
];

/* ── FAQ data ─────────────────────────────────────────────────────── */
const FAQS = [
  {
    q: "Do I need prior Houdini experience?",
    a: "For the Masterclass and Core Intensive, a background in any 3D software (Maya, Blender, Cinema 4D) is sufficient. Specialization tracks require at least basic Houdini familiarity.",
  },
  {
    q: "How are sessions conducted?",
    a: "All sessions are live via Zoom/Google Meet. Each batch has fixed weekly live sessions plus open office hours. Recordings are shared within 24 hours.",
  },
  {
    q: "What is the batch size?",
    a: "All batches are capped at 15 artists to ensure personal mentorship and real feedback on your work.",
  },
  {
    q: "Is there a payment plan?",
    a: "Yes. We offer EMI options and installment-based payment for all programs. Book a call to discuss the options that fit your situation.",
  },
  {
    q: "Will I get placement support?",
    a: "Top graduates are introduced to our studio network. We provide portfolio review, resume guidance, and warm referrals — but we do not guarantee placement.",
  },
];

// FAQ rendered via separate client component (AcademyFAQ.tsx)

/* ═══════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════════ */
export default function AcademyPage() {
  return (
    <div style={{ background: DARK, minHeight: "100vh", fontFamily: "'Open Sans', sans-serif" }}>

      {/* ── HERO ─────────────────────────────────────────────────── */}
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

      {/* ── PROGRAMS ─────────────────────────────────────────────── */}
      <section id="programs" style={{ padding: "96px 80px", background: DARK2 }} className="academy-section">
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          {/* Section header */}
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <span
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                color: RED,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "12px",
              }}
            >
              Our Programs
            </span>
            <h2
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: "clamp(28px, 3vw, 44px)",
                fontWeight: 800,
                color: "#FFFFFF",
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              Choose your <span style={{ color: RED }}>path</span>
            </h2>
          </div>

          {/* Course cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
            }}
            className="academy-courses-grid"
          >
            {COURSES.map((c, i) => (
              <div
                key={i}
                style={{
                  background: CARD_BG,
                  borderRadius: "16px",
                  border: `1px solid rgba(255,255,255,0.08)`,
                  padding: "28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {/* Top row */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span
                    style={{
                      background: c.tagColor,
                      color: "#fff",
                      fontSize: "10px",
                      fontWeight: 800,
                      letterSpacing: "0.15em",
                      padding: "4px 10px",
                      borderRadius: "4px",
                    }}
                  >
                    {c.tag}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Open Sans', sans-serif",
                      fontSize: "12px",
                      color: "rgba(255,255,255,0.45)",
                      fontWeight: 600,
                    }}
                  >
                    {c.duration}
                  </span>
                </div>

                <div>
                  <h3
                    style={{
                      fontFamily: "'Open Sans', sans-serif",
                      fontSize: "20px",
                      fontWeight: 800,
                      color: "#FFFFFF",
                      margin: "0 0 10px 0",
                    }}
                  >
                    {c.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Open Sans', sans-serif",
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.6)",
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {c.desc}
                  </p>
                </div>

                {/* Modules */}
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                  {c.modules.map((m, j) => (
                    <li
                      key={j}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        fontFamily: "'Open Sans', sans-serif",
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.75)",
                        fontWeight: 500,
                      }}
                    >
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: RED, flexShrink: 0 }} />
                      {m}
                    </li>
                  ))}
                </ul>

                <Link
                  href={c.cta}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "12px 24px",
                    background: "transparent",
                    border: `1.5px solid ${RED}`,
                    color: RED,
                    fontFamily: "'Open Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: "13px",
                    borderRadius: "6px",
                    textDecoration: "none",
                    marginTop: "auto",
                    letterSpacing: "0.03em",
                  }}
                >
                  Enquire →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY TATHASTU ACADEMY ────────────────────────────────── */}
      <section style={{ padding: "96px 80px", background: DARK }} className="academy-section">
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <span
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                color: RED,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "12px",
              }}
            >
              Why Us
            </span>
            <h2
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: "clamp(28px, 3vw, 44px)",
                fontWeight: 800,
                color: "#FFFFFF",
                margin: 0,
              }}
            >
              Built for artists, by <span style={{ color: RED }}>artists</span>
            </h2>
          </div>

          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}
            className="academy-why-grid"
          >
            {WHY.map((w, i) => (
              <div
                key={i}
                style={{
                  background: CARD_BG,
                  borderRadius: "14px",
                  border: "1px solid rgba(255,255,255,0.07)",
                  padding: "28px 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                <span style={{ fontSize: "32px" }}>{w.icon}</span>
                <h3
                  style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: "16px",
                    fontWeight: 800,
                    color: "#FFFFFF",
                    margin: 0,
                  }}
                >
                  {w.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.55)",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {w.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF STRIP ───────────────────────────────────── */}
      <section
        style={{
          background: RED_DARK,
          padding: "48px 80px",
        }}
        className="academy-section"
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "32px",
            alignItems: "center",
          }}
          className="academy-stats-grid"
        >
          {[
            { val: "120+", label: "Graduates placed" },
            { val: "15", label: "Artists per batch" },
            { val: "98%", label: "Completion rate" },
            { val: "10+", label: "Specialization tracks" },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                textAlign: "center",
                borderRight: i < 3 ? "1px solid rgba(255,255,255,0.2)" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: "clamp(32px, 3.5vw, 48px)",
                  fontWeight: 900,
                  color: "#FFFFFF",
                  lineHeight: 1,
                }}
              >
                {s.val}
              </div>
              <div
                style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.75)",
                  marginTop: "6px",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section style={{ padding: "96px 80px", background: DARK2 }} className="academy-section">
        <div
          style={{
            maxWidth: "860px",
            margin: "0 auto",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                color: RED,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "12px",
              }}
            >
              FAQ
            </span>
            <h2
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: "clamp(26px, 2.8vw, 40px)",
                fontWeight: 800,
                color: "#FFFFFF",
                margin: 0,
              }}
            >
              Common <span style={{ color: RED }}>questions</span>
            </h2>
          </div>
          <AcademyFAQ />
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────────── */}
      <section
        style={{
          padding: "96px 80px",
          background: DARK,
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
        className="academy-section"
      >
        {/* Red glow blob */}
        <div
          style={{
            position: "absolute",
            bottom: "-80px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "300px",
            background: "radial-gradient(ellipse, rgba(224,32,32,0.18) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "640px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px", alignItems: "center" }}>
          <h2
            style={{
              fontFamily: "'Open Sans', sans-serif",
              fontSize: "clamp(28px, 3.5vw, 48px)",
              fontWeight: 900,
              color: "#FFFFFF",
              margin: 0,
              lineHeight: 1.15,
            }}
          >
            Ready to become <span style={{ color: RED }}>production ready</span>?
          </h2>
          <p
            style={{
              fontFamily: "'Open Sans', sans-serif",
              fontSize: "16px",
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Applications for the next batch are open. Seats are limited to 15 artists — book a
            free discovery call to see if you are a good fit.
          </p>
          <RedBtn href="/contact?source=Academy">Book a Free Call</RedBtn>
        </div>
      </section>

      {/* Responsive overrides */}
      <style>{`
        @media (max-width: 1024px) {
          .academy-hero-grid {
            grid-template-columns: 1fr !important;
            padding: 100px 32px 60px !important;
          }
          .academy-courses-grid,
          .academy-why-grid {
            grid-template-columns: 1fr !important;
          }
          .academy-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .academy-section {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
          .academy-stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
