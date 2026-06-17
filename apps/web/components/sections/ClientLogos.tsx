"use client";

import React from "react";
import Image from "next/image";
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

// Figma-matched logo asset paths
const LOGO_ASSET_PATHS: Record<string, string> = {
  hp: "/images/client-logos/hp.png",
  adobe: "/images/client-logos/adobe.png",
  sidefx: "/images/client-logos/sidefx.png",
  houdini: "/images/client-logos/sidefx.png",
  "toon boom": "/images/client-logos/toon-boom.png",
  "storyboard": "/images/client-logos/toon-boom.png",
  dell: "/images/client-logos/dell.png",
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
        backgroundColor: "#F8F8F8",
        borderTop: "1px solid #EBEBEB",
        borderBottom: "1px solid #EBEBEB",
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
                    <Image
                      src={assetPath}
                      alt={logo.name}
                      width={120}
                      height={48}
                      style={{
                        objectFit: "contain",
                        filter: "grayscale(100%)",
                        maxHeight: "48px",
                        width: "auto",
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
