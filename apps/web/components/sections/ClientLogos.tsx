"use client";

import React from "react";
import { ClientLogosSection } from "@tathastu/types";

interface ClientLogosProps {
  section: ClientLogosSection;
}

/*
  Figma node 40:4602 — Client logos
  - Row of partner logos (grayscale/muted) on light bg: HP, Adobe, SideFX, Toon Boom Storyboard Pro, Dell
  - No "Trusted by Industry Leaders Worldwide" label
  - No hover color effects (logos are grayscale/muted, static)
*/

// Figma-matched logo asset paths (images/clients/)
const LOGO_ASSET_PATHS: Record<string, string> = {
  hp: "/images/clients/hp.svg",
  adobe: "/images/clients/adobe.svg",
  sidefx: "/images/clients/sidefx.svg",
  houdini: "/images/clients/sidefx.svg",
  "toon boom": "/images/clients/toon-boom.svg",
  "storyboard": "/images/clients/toon-boom.svg",
  dell: "/images/clients/dell.svg",
};

function getLogoPath(name: string): string | null {
  const lower = name.toLowerCase();
  for (const [key, val] of Object.entries(LOGO_ASSET_PATHS)) {
    if (lower.includes(key)) return val;
  }
  return null;
}

export default function ClientLogos({ section }: ClientLogosProps) {
  return (
    <section
      style={{
        padding: "48px 80px",
        background: "linear-gradient(180deg, #EFF6FF 0%, #F2E9E3 100%)",
        borderTop: "1px solid #E5E7EB",
        borderBottom: "1px solid #E5E7EB",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        {/* Logos flex row — grayscale, muted, static */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "48px",
          }}
        >
          {section.logos &&
            section.logos.map((logo, idx) => {
              const assetPath = logo.image?.url || getLogoPath(logo.name);

              return (
                <a
                  key={logo.id || idx}
                  href={logo.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Partner: ${logo.name}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textDecoration: "none",
                    opacity: 0.55,
                  }}
                >
                  {assetPath ? (
                    <img
                      src={assetPath}
                      alt={logo.name}
                      style={{
                        height: "48px",
                        width: "auto",
                        maxWidth: "140px",
                        objectFit: "contain",
                        filter: "grayscale(100%)",
                        display: "block",
                      }}
                    />
                  ) : (
                    /* Fallback text if no logo image */
                    <span
                      style={{
                        fontFamily: "'Open Sans', sans-serif",
                        fontSize: "18px",
                        fontWeight: 800,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#555555",
                      }}
                    >
                      {logo.name}
                    </span>
                  )}
                </a>
              );
            })}
        </div>
      </div>
    </section>
  );
}
