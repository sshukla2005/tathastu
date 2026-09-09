import React from "react";
import Image from "next/image";
import { AcademyMeetTeamSection } from "@tathastu/types";
import { getStrapiMediaUrl } from "@/lib/api";

interface AcademyMeetTeamProps {
  section: AcademyMeetTeamSection;
}

const RED = "#E02020";

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

export default function AcademyMeetTeam({ section }: AcademyMeetTeamProps) {
  const members = section.members || [];

  return (
    <section
      style={{ position: "relative", background: "#FFFFFF", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 80px", color: "#000000" }}
      className="academy-section"
    >
      <div style={{ position: "relative", zIndex: 10, maxWidth: "1280px", margin: "0 auto", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "56px" }}>
        {/* Header */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", textAlign: "center", maxWidth: "800px" }}>
          <h2 style={{ fontSize: "clamp(32px, 3.2vw, 44px)", fontWeight: 700, lineHeight: 1.25, color: "#000000", margin: 0, fontFamily: "'Open Sans', sans-serif" }}>
            {section.heading} <span style={{ color: RED }}>{section.headingHighlight}</span>
          </h2>
          <p style={{ fontSize: "18px", lineHeight: 1.6, color: "#555555", margin: 0, fontFamily: "'Open Sans', sans-serif", fontWeight: 400 }}>{section.subtitle}</p>
        </div>

        {/* Members Row */}
        <div className="meet-team-row">
          {members.map((member, idx) => {
            const bg = member.bgColor || FALLBACK_BG_COLORS[idx % FALLBACK_BG_COLORS.length];
            const photo = getStrapiMediaUrl(member.photo?.url) || fallbackPhoto(member.name);
            return (
              <div key={member.id ?? idx} className="meet-member-card">
                <div className="meet-member-arch" style={{ backgroundColor: bg }}>
                  <div className="meet-member-info">
                    <h3 className="meet-member-name">{member.name}</h3>
                    <p className="meet-member-role">{member.role}</p>
                  </div>
                  <div className="meet-member-photo">
                    <Image src={photo} alt={member.name} fill style={{ objectFit: "cover", objectPosition: "center top" }} sizes="(max-width: 640px) 45vw, 260px" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
