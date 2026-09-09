"use client";

import React, { useEffect, useState } from "react";
import { StudioMeetTeamSection } from "@tathastu/types";
import { getStrapiMediaUrl } from "@/lib/api";

interface StudioMeetTeamProps {
  section: StudioMeetTeamSection;
}

const FALLBACK_BG_COLORS = ["#D6EAF8", "#D5F5E3", "#E8DAEF", "#FDEBD0"];

const FALLBACK_PHOTO_KEYS: Record<string, string> = {
  nikitha: "nikitha",
  chetan: "chetan",
  venu: "venu",
};

function fallbackPhoto(name: string): string {
  const lower = name.toLowerCase();
  for (const [needle, key] of Object.entries(FALLBACK_PHOTO_KEYS)) {
    if (lower.includes(needle)) return `/images/studio/member-${key}.png`;
  }
  return "/images/studio/member-nikitha.png";
}

const MEMBERS_PER_SLIDE = 2;

export default function StudioMeetTeam({ section }: StudioMeetTeamProps) {
  const members = section.members || [];
  const slides = Array.from(
    { length: Math.ceil(members.length / MEMBERS_PER_SLIDE) },
    (_, i) => members.slice(i * MEMBERS_PER_SLIDE, i * MEMBERS_PER_SLIDE + MEMBERS_PER_SLIDE)
  );

  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 640px)");
    setIsMobile(mql.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  const goPrev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const goNext = () => setCurrent((c) => (c + 1) % slides.length);

  useEffect(() => {
    if (!isMobile) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobile, slides.length]);

  return (
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
      className="studio-meet-section"
    >
    <div
      style={{
        position: "relative",
        zIndex: 10,
        maxWidth: "1440px",
        margin: "0 auto",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "56px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
          maxWidth: "800px",
        }}
      >
        <h2
          style={{
            fontSize: "54px",
            fontWeight: 700,
            lineHeight: "68px",
            color: "#000000",
            margin: 0,
            fontFamily: "'Open Sans', sans-serif",
          }}
          className="studio-meet-title"
        >
          {section.heading} <span style={{ color: "#D61814" }}>{section.headingHighlight}</span>
        </h2>
        <p
          style={{
            fontSize: "20px",
            lineHeight: "32px",
            color: "#555555",
            margin: 0,
            fontFamily: "'Open Sans', sans-serif",
            fontWeight: 400,
          }}
          className="studio-meet-subtitle"
        >
          {section.subtitle}
        </p>
      </div>

      {/* Members carousel — all slides visible on desktop/tablet, one slide at a time on mobile */}
      <div className="studio-meet-viewport">
        <div
          className="studio-meet-row"
          style={{ transform: isMobile ? `translateX(-${current * 100}%)` : "none" }}
        >
          {slides.map((group, slideIdx) => (
            <div key={slideIdx} className="studio-meet-slide">
              {group.map((member, idx) => {
                const bg = member.bgColor || FALLBACK_BG_COLORS[(slideIdx * MEMBERS_PER_SLIDE + idx) % FALLBACK_BG_COLORS.length];
                const photo = getStrapiMediaUrl(member.photo?.url) || fallbackPhoto(member.name);
                return (
                  <div key={member.id ?? idx} className="studio-member-card">
                    {/* Pill card: name & role on colored background, photo filling the rest */}
                    <div className="studio-member-arch" style={{ backgroundColor: bg }}>
                      <div className="studio-member-info">
                        <h3 className="studio-member-name">{member.name}</h3>
                        <p className="studio-member-role">{member.role}</p>
                      </div>
                      <div className="studio-member-photo">
                        <img
                          src={photo}
                          alt={member.name}
                          style={{
                            position: "absolute",
                            inset: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "center top",
                            display: "block",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Carousel arrows — square buttons, same style as the Testimonials/Product Portfolio carousels */}
      {slides.length > 1 && (
        <div className="studio-meet-arrows">
          <button type="button" aria-label="Previous member" onClick={goPrev} className="studio-meet-arrow-btn">
            ‹
          </button>
          <button type="button" aria-label="Next member" onClick={goNext} className="studio-meet-arrow-btn">
            ›
          </button>
        </div>
      )}
    </div>
    </section>
  );
}
