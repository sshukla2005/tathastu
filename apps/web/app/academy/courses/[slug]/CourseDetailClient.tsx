"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SiteSettings } from "@tathastu/types";

const RED = "#E02020";
const BLUE = "#4B95FF";

const courseHighlights = [
  { feature: "Course Level", detail: "Beginner to Advanced" },
  { feature: "Mode", detail: "Classroom (Offline)" },
  { feature: "Live Creative Projects", detail: "Yes" },
  { feature: "Portfolio Development", detail: "Included" },
  { feature: "Certificate", detail: "Yes, on Completion" },
  { feature: "Batch Options", detail: "Weekday & Weekend" },
];

const faqs = [
  {
    q: "Do I need any prior experience to join this course?",
    a: "No. This course is designed for complete beginners. You just need a creative mindset — we will teach you everything from scratch.",
  },
  {
    q: "Which course I should prefer after Grade 12th?",
    a: "Houdini is an excellent choice after Grade 12th if you're interested in VFX, animation, or game development. Our counselors can help you pick the right track.",
  },
  {
    q: "How long is the Houdini certification course?",
    a: "The course is 6 months long, covering everything from fundamentals to advanced production-level simulations.",
  },
];

export default function CourseDetailClient({
  slug,
  siteSettings,
}: {
  slug: string;
  siteSettings: SiteSettings;
}) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "", course: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main style={{ fontFamily: "'Open Sans', sans-serif", background: "#FFFFFF" }}>

      {/* ── 1. HERO ── */}
      <section style={{ position: "relative", minHeight: "220px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", background: "#0D0D1A" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img src="/images/academy/hero-bg.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.3 }} />
        </div>
        <div style={{ position: "relative", zIndex: 10, textAlign: "center", color: "#FFFFFF", padding: "60px 24px" }}>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, margin: "0 0 16px 0" }}>
            Houdini Course
          </h1>
          <p style={{ fontSize: "14px", color: "#AAAAAA", margin: 0 }}>
            <Link href="/" style={{ color: "#AAAAAA", textDecoration: "none" }}>Home</Link>
            {" / "}
            <Link href="/academy" style={{ color: "#AAAAAA", textDecoration: "none" }}>Academy</Link>
            {" / "}
            <Link href="/academy/courses" style={{ color: "#AAAAAA", textDecoration: "none" }}>Courses & Videos</Link>
            {" / "}
            <span style={{ color: "#FFFFFF" }}>Details</span>
          </p>
        </div>
      </section>

      {/* ── 2. INTRO — 2 col ── */}
      <section style={{ background: "#FFFFFF", padding: "80px" }} className="cd-intro-section">
        <div style={{ maxWidth: "1280px", margin: "0 auto" }} className="cd-intro-grid">
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <h2 style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 800, margin: 0, color: "#0D0D0D" }}>
              Houdini <span style={{ color: RED }}>Course</span>
            </h2>
            <p style={{ fontSize: "16px", lineHeight: "28px", color: "#444444", margin: 0 }}>
              Some effects in movies look so real that it's hard to believe they were created on a computer — collapsing buildings, raging oceans, flying debris, or massive explosions.
            </p>
            <p style={{ fontSize: "16px", lineHeight: "28px", color: "#444444", margin: 0 }}>
              Behind many of these scenes is one powerful tool: Houdini.
            </p>
            <p style={{ fontSize: "16px", lineHeight: "28px", color: "#444444", margin: 0 }}>
              Our Houdini Course in Noida is designed for students who want to move beyond basic 3D animation and step into the world of high-end VFX simulations. Here you will learn how professional artists build complex effects using procedural workflows and node-based systems used in real production studios.
            </p>
          </div>
          <div style={{ borderRadius: "16px", overflow: "hidden", height: "320px" }}>
            <img
              src="/images/academy/about-vr.jpg"
              alt="Houdini Course"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        </div>
      </section>

      {/* ── 3. COURSE DETAILS ── */}
      <section style={{ background: "#F5F0EB", padding: "80px" }} className="cd-details-section">
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "48px" }}>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 38px)", fontWeight: 800, color: "#0D0D0D", margin: 0, textAlign: "center" }}>
            Houdini Course in <span style={{ color: RED }}>Noida (6 Months)</span>
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            <div>
              <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#0D0D0D", margin: "0 0 12px 0" }}>Master the Art of Visual Effects with the Best Houdini Course</h3>
              <p style={{ fontSize: "15px", lineHeight: "26px", color: "#444444", margin: 0 }}>
                You've seen the massive destruction in Marvel movies, the hyper-realistic water in Avatar, and the mind-bending simulations in top-tier AAA games. What do they have in common? They were likely built in SideFX Houdini.
              </p>
              <br />
              <p style={{ fontSize: "15px", lineHeight: "26px", color: "#444444", margin: 0 }}>
                While traditional 3D software relies on manual sculpting and destructive workflows, Houdini operates on a procedural, node-based system. This means you aren't just making a single explosion; you're building a system that can create a thousand different explosions with the tweak of a single slider.
              </p>
              <br />
              <p style={{ fontSize: "15px", lineHeight: "26px", color: "#444444", margin: 0 }}>
                At our Houdini Training Institute in Noida, we don't just teach you which buttons to click. We teach you how to think like a technical artist.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#0D0D0D", margin: "0 0 12px 0" }}>Why Houdini is the Industry Standard (and Your Future)</h3>
              <p style={{ fontSize: "15px", lineHeight: "26px", color: "#444444", margin: 0 }}>
                At ZICA ZIMA Noida, the Adobe After Effects course in Noida is structured around one core idea — you learn by creating, not just watching. From your very first session, you will be working inside After Effects. You will understand how compositions work, how layers behave, and how time becomes your biggest creative tool.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#0D0D0D", margin: "0 0 12px 0" }}>What You'll Learn: From Zero to Simulation Pro</h3>
              <p style={{ fontSize: "15px", lineHeight: "26px", color: "#444444", margin: 0 }}>
                Our 6-month certification is designed to take you from a complete beginner to a production-ready VFX artist. We skip the fluff and focus on the tools that actually get you hired.
              </p>
            </div>
          </div>

          {/* Course Highlights Table */}
          <div>
            <h3 style={{ fontSize: "22px", fontWeight: 700, color: "#0D0D0D", margin: "0 0 20px 0" }}>Course Highlights</h3>
            <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid #E0E0E0" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: RED }}>
                <div style={{ padding: "16px 24px", color: "#FFFFFF", fontWeight: 700, fontSize: "16px" }}>📋 Feature</div>
                <div style={{ padding: "16px 24px", color: "#FFFFFF", fontWeight: 700, fontSize: "16px", borderLeft: "1px solid rgba(255,255,255,0.2)" }}>📄 Details</div>
              </div>
              {courseHighlights.map((row, idx) => (
                <div key={idx} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: idx % 2 === 0 ? "#FFFFFF" : "#FAFAFA", borderTop: "1px solid #EEEEEE" }}>
                  <div style={{ padding: "14px 24px", fontSize: "15px", color: "#333333", fontWeight: 500 }}>
                    <span style={{ color: BLUE }}>● </span>{row.feature}
                  </div>
                  <div style={{ padding: "14px 24px", fontSize: "15px", color: "#444444", borderLeft: "1px solid #EEEEEE" }}>
                    {["Yes", "Included", "Yes, on Completion"].includes(row.detail) && <span style={{ color: "#22C55E", fontWeight: 700 }}>✓ </span>}
                    {row.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visit Center strip */}
          <div style={{ background: "#FFFFFF", borderRadius: "12px", padding: "32px", border: "1px solid #E8E8E8" }}>
            <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#0D0D0D", margin: "0 0 4px 0" }}>Visit Our Noida Center for a Free Demo</h3>
            <p style={{ fontSize: "14px", color: RED, fontWeight: 600, margin: "0 0 20px 0" }}>Book a Free Career Counseling Session</p>
            <div className="cd-contact-strip">
              <div style={{ border: "1px solid #E8E8E8", borderRadius: "8px", padding: "16px 20px" }}>
                <p style={{ fontSize: "12px", color: "#777777", margin: "0 0 4px 0", textTransform: "uppercase" as const, letterSpacing: "0.5px" }}>Call</p>
                <a href="tel:+918076680216" style={{ fontSize: "16px", fontWeight: 700, color: "#0D0D0D", textDecoration: "none" }}>+91 80766 80216</a>
              </div>
              <div style={{ border: "1px solid #E8E8E8", borderRadius: "8px", padding: "16px 20px" }}>
                <p style={{ fontSize: "12px", color: "#777777", margin: "0 0 4px 0", textTransform: "uppercase" as const, letterSpacing: "0.5px" }}>Email</p>
                <a href="mailto:academy@tathastu.global" style={{ fontSize: "16px", fontWeight: 700, color: "#0D0D0D", textDecoration: "none" }}>academy@tathastu.global</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. FAQ ── */}
      <section style={{ background: "#FFFFFF", padding: "80px" }} className="cd-faq-section">
        <div style={{ maxWidth: "1280px", margin: "0 auto" }} className="cd-faq-grid">
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img src="/images/academy/about-brain.png" alt="FAQ" style={{ width: "100%", maxWidth: "400px", objectFit: "contain" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, color: "#0D0D0D", margin: "0 0 8px 0" }}>
              Frequently Asked <span style={{ color: RED }}>Questions</span>
            </h2>
            {faqs.map((faq, idx) => (
              <div key={idx} style={{ border: "1px solid #E8E8E8", borderRadius: "10px", overflow: "hidden" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  style={{ width: "100%", padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", background: openFaq === idx ? "#FFF5F5" : "#FFFFFF", border: "none", cursor: "pointer", textAlign: "left" as const, gap: "16px" }}
                >
                  <span style={{ fontSize: "15px", fontWeight: 600, color: "#0D0D0D", fontFamily: "'Open Sans', sans-serif" }}>{faq.q}</span>
                  <span style={{ color: RED, fontSize: "20px", flexShrink: 0 }}>{openFaq === idx ? "−" : "+"}</span>
                </button>
                {openFaq === idx && (
                  <div style={{ padding: "0 20px 18px 20px", background: "#FFF5F5" }}>
                    <p style={{ fontSize: "14px", lineHeight: "24px", color: "#555555", margin: 0, fontFamily: "'Open Sans', sans-serif" }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. GET IN TOUCH FORM ── */}
      <section style={{ background: "#F5F0EB", padding: "80px" }} className="cd-form-section">
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "40px" }}>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, color: "#0D0D0D", margin: 0, textAlign: "center" }}>
            Get In Touch <span style={{ color: RED }}>With Us</span>
          </h2>
          <div style={{ background: "#1A1A2E", borderRadius: "16px", padding: "48px", width: "100%", maxWidth: "900px" }} className="cd-form-grid">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img src="/images/academy/about-brain.png" alt="" style={{ width: "100%", maxWidth: "260px", objectFit: "contain" }} />
            </div>
            <div>
              {submitted ? (
                <div style={{ color: "#22C55E", fontSize: "18px", fontWeight: 700, textAlign: "center", padding: "40px 0" }}>✓ Thank you! We'll be in touch soon.</div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {[
                    { name: "name", placeholder: "Enter Name", type: "text" },
                    { name: "email", placeholder: "Enter Email", type: "email" },
                    { name: "mobile", placeholder: "Enter Mobile Number", type: "tel" },
                    { name: "course", placeholder: "Enter Course", type: "text" },
                  ].map((field) => (
                    <input
                      key={field.name}
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleChange}
                      style={{ padding: "14px 16px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.06)", color: "#FFFFFF", fontSize: "14px", fontFamily: "'Open Sans', sans-serif", outline: "none", width: "100%", boxSizing: "border-box" as const }}
                    />
                  ))}
                  <button type="submit" style={{ padding: "14px", background: RED, color: "#FFFFFF", border: "none", borderRadius: "8px", fontSize: "16px", fontWeight: 700, cursor: "pointer", fontFamily: "'Open Sans', sans-serif", marginTop: "8px" }}>
                    Submit
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. CTA BAND ── */}
      <section style={{ position: "relative", overflow: "hidden", padding: "80px", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "200px" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img src="/images/academy/hero-bg.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
        <div style={{ position: "absolute", inset: 0, background: "rgba(5,10,30,0.80)", zIndex: 1 }} />
        <div style={{ position: "relative", zIndex: 10, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
          <h2 style={{ fontSize: "clamp(20px, 3vw, 32px)", fontWeight: 700, color: "#FFFFFF", margin: 0 }}>Design Support for All Your Creative Needs</h2>
          <p style={{ fontSize: "15px", color: "#CCCCCC", margin: 0, maxWidth: "540px", lineHeight: "24px" }}>Get a free introduction and discover how you and your team can change the way your source design forever</p>
          <Link href="/contact?source=Demo" style={{ padding: "14px 36px", background: "linear-gradient(90deg, #1d385e 0%, #4b95ff 100%)", borderRadius: "50px", color: "#FFFFFF", fontSize: "15px", fontWeight: 600, textDecoration: "none", marginTop: "8px" }}>
            Request Demo
          </Link>
        </div>
      </section>

      <style>{`
        .cd-intro-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
        .cd-faq-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
        .cd-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; }
        .cd-contact-strip { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        @media (max-width: 1024px) {
          .cd-intro-section { padding: 60px 40px !important; }
          .cd-intro-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .cd-details-section { padding: 60px 40px !important; }
          .cd-faq-section { padding: 60px 40px !important; }
          .cd-faq-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .cd-form-section { padding: 60px 40px !important; }
          .cd-form-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .cd-intro-section { padding: 40px 20px !important; }
          .cd-details-section { padding: 40px 20px !important; }
          .cd-contact-strip { grid-template-columns: 1fr !important; }
          .cd-faq-section { padding: 40px 20px !important; }
          .cd-form-section { padding: 40px 20px !important; }
        }
      `}</style>
    </main>
  );
}
