import React from "react";
import { AcademyProgramsSection } from "@tathastu/types";
import { getStrapiMediaUrl } from "@/lib/api";
import AcademyProgramsCarousel, { Program } from "@/components/sections/AcademyProgramsCarousel";

interface AcademyProgramsProps {
  section: AcademyProgramsSection;
}

const RED = "#E02020";

export default function AcademyPrograms({ section }: AcademyProgramsProps) {
  const programs: Program[] = (section.programs || []).map((p) => ({
    title: p.title,
    image: getStrapiMediaUrl(p.image?.url) || "/images/academy/program-studio.png",
    description: p.description,
    items: (p.items || []).map((item) => item.text),
    ctaLabel: p.ctaLabel,
    href: p.ctaHref,
  }));

  return (
    <section
      id="programs"
      style={{ position: "relative", background: "linear-gradient(180deg, #2E1B0E 0%, #180F09 40%, #0B0705 100%)", color: "#FFFFFF", overflow: "hidden" }}
      className="academy-section"
    >
      <div style={{ position: "relative", zIndex: 10, maxWidth: "1280px", margin: "0 auto", padding: "120px 80px 140px", width: "100%" }} className="programs-container">
        {/* Section Header */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", marginBottom: "64px", textAlign: "center" }}>
          <h2
            style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "clamp(28px, 2.8vw, 38px)", fontWeight: 900, lineHeight: 1.2, color: "#FFFFFF", margin: 0, maxWidth: "680px" }}
          >
            {section.heading} <span style={{ color: RED }}>{section.headingHighlight}</span>
          </h2>
          <p style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, margin: 0, maxWidth: "560px" }}>
            {section.subtitle}
          </p>
        </div>

        {/* Cards Carousel — 3 visible on desktop, 2 tablet, 1 mobile */}
        <AcademyProgramsCarousel programs={programs} />
      </div>
    </section>
  );
}
