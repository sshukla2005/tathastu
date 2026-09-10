import React from "react";
import Link from "next/link";
import Image from "next/image";
import { AcademyCoursesSection, getCourseHref } from "@tathastu/types";
import { getStrapiMediaUrl } from "@/lib/api";

interface AcademyCoursesProps {
  section: AcademyCoursesSection;
}

const RED = "#E02020";
const ABOUT_TEXT_PRIMARY = "#1A1A1A";
const ABOUT_TEXT_SECONDARY = "#4D4D4D";
const ABOUT_ACCENT_RED = "#D93829";

export default function AcademyCourses({ section }: AcademyCoursesProps) {
  const courses = section.courses || [];

  return (
    <section style={{ background: "#F0F0F0", padding: "100px 80px 120px", position: "relative", overflow: "hidden" }} className="academy-section">
      {/* Decorative concentric circles */}
      <div style={{ position: "absolute", bottom: "-160px", left: "-160px", width: "380px", height: "380px", borderRadius: "50%", border: "1px solid rgba(0,0,0,0.06)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-110px", left: "-110px", width: "270px", height: "270px", borderRadius: "50%", border: "1px solid rgba(0,0,0,0.06)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 5 }}>
        {/* Header */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", textAlign: "center", marginBottom: "56px" }}>
          <h2 style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "clamp(32px, 3.2vw, 44px)", fontWeight: 900, lineHeight: 1.15, color: ABOUT_TEXT_PRIMARY, margin: 0 }}>
            {section.heading} <span style={{ color: ABOUT_ACCENT_RED }}>{section.headingHighlight}</span>
          </h2>
          <p style={{ margin: 0, fontSize: "15px", lineHeight: 1.6, color: ABOUT_TEXT_SECONDARY }}>{section.subtitle}</p>
        </div>

        {/* Cards Grid — 3x2 */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }} className="courses-grid">
          {courses.map((course, idx) => (
            <div
              key={course.id ?? idx}
              style={{ background: "#FFFFFF", borderRadius: "16px", overflow: "hidden", boxShadow: "0 10px 25px rgba(0, 0, 0, 0.04)", border: "1px solid rgba(0, 0, 0, 0.03)", display: "flex", flexDirection: "column", transition: "transform 0.3s ease, box-shadow 0.3s ease" }}
              className="course-card"
            >
              {/* Card Image */}
              <div style={{ position: "relative", width: "100%", height: "180px" }}>
                <Image
                  src={getStrapiMediaUrl(course.image?.url) || "/images/academy/program-studio.png"}
                  alt={course.title}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 1024px) 100vw, 400px"
                />
                {course.badge && (
                  <span style={{ position: "absolute", top: "12px", right: "12px", background: RED, color: "#FFFFFF", fontWeight: 700, fontSize: "10px", letterSpacing: "0.06em", padding: "5px 10px", borderRadius: "4px", textTransform: "uppercase" }}>
                    {course.badge}
                  </span>
                )}
                {course.isVideo && (
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "rgba(255,255,255,0.92)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.25)" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill={RED} style={{ marginLeft: "2px" }}>
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div style={{ padding: "20px 22px 22px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 700, color: ABOUT_TEXT_PRIMARY }}>{course.title}</h3>
                <p style={{ margin: 0, fontSize: "13px", color: ABOUT_TEXT_SECONDARY, lineHeight: 1.55 }}>
                  {course.description}{" "}
                  <Link href={getCourseHref(course)} style={{ color: RED, fontWeight: 600, textDecoration: "none" }} className="read-more-link">
                    read more...
                  </Link>
                </p>
                <span style={{ fontSize: "12px", fontWeight: 700, color: RED, letterSpacing: "0.04em", marginTop: "6px" }}>{course.duration}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        {section.ctaLabel && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "56px" }}>
            <Link
              href={section.ctaHref || "/academy/courses&videos"}
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
              {section.ctaLabel}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
