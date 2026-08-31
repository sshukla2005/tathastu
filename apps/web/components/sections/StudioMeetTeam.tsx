"use client";

import React, { useEffect, useState } from "react";

const MEMBERS = [
  { key: "nikitha", name: "Nikitha Gaikwad", role: "Marketing Manager", bg: "#D6EAF8" },
  { key: "chetan", name: "Chetan Jain", role: "Founder & CEO", bg: "#D5F5E3" },
  { key: "nikitha2", name: "Nikitha Gaikwad", role: "President of Sales", bg: "#E8DAEF" },
  { key: "venu", name: "Venu Victor", role: "Co-founder and VFX Supervisor", bg: "#FDEBD0" },
];

const MEMBERS_PER_SLIDE = 2;
const SLIDES = Array.from(
  { length: Math.ceil(MEMBERS.length / MEMBERS_PER_SLIDE) },
  (_, i) => MEMBERS.slice(i * MEMBERS_PER_SLIDE, i * MEMBERS_PER_SLIDE + MEMBERS_PER_SLIDE)
);

export default function StudioMeetTeam() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 640px)");
    setIsMobile(mql.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  const goPrev = () =>
    setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
  const goNext = () => setCurrent((c) => (c + 1) % SLIDES.length);

  useEffect(() => {
    if (!isMobile) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobile]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "24px",
        width: "100%",
      }}
    >
      {/* Members carousel — all 4 slides visible on desktop/tablet, one slide at a time on mobile */}
      <div className="studio-meet-viewport">
        <div
          className="studio-meet-row"
          style={{
            transform: isMobile ? `translateX(-${current * 100}%)` : "none",
          }}
        >
          {SLIDES.map((group, slideIdx) => (
            <div key={slideIdx} className="studio-meet-slide">
              {group.map((member, idx) => (
                <div key={idx} className="studio-member-card">
                  {/* Pill card: name & role on colored background, photo filling the rest */}
                  <div
                    className="studio-member-arch"
                    style={{ backgroundColor: member.bg }}
                  >
                    <div className="studio-member-info">
                      <h3 className="studio-member-name">{member.name}</h3>
                      <p className="studio-member-role">{member.role}</p>
                    </div>
                    <div className="studio-member-photo">
                      <img
                        src={`/images/studio/member-${member.key}.png`}
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
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Carousel arrows — square buttons, same style as the Testimonials/Product Portfolio carousels */}
      <div className="studio-meet-arrows">
        <button
          type="button"
          aria-label="Previous member"
          onClick={goPrev}
          className="studio-meet-arrow-btn"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Next member"
          onClick={goNext}
          className="studio-meet-arrow-btn"
        >
          ›
        </button>
      </div>
    </div>
  );
}
