"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CtaBandSection } from "@tathastu/types";

interface CtaBandProps {
  section: CtaBandSection;
}

/*
  Figma node 40:3142 — CTA band
  - Dark photograph background (circuit board) + dark overlay
  - Centered, white: heading "Design Support for All Your Creative Needs"
  - Gray subtext (2 lines): "Get a free introduction and discover how you and your team..."
  - "Request Demo" blue gradient pill centered
  No: gradient orange-to-blue rounded banner container, glowing circles, hover tricks
*/

export default function CtaBand({ section }: CtaBandProps) {
  return (
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
          {section.heading}
        </h2>

        <p
          style={{
            fontFamily: "'Open Sans', sans-serif",
            fontSize: "clamp(15px, 1.4vw, 18px)",
            fontWeight: 400,
            color: "rgba(255,255,255,0.65)",
            lineHeight: 1.7,
            margin: 0,
            maxWidth: "620px",
          }}
        >
          {section.subtext}
        </p>

        {/* "Request Demo" blue gradient pill */}
        <Link
          href={section.ctaHref}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "14px 36px",
            marginTop: "12px",
            background: "linear-gradient(90deg, #1d385e 0%, #4b95ff 100%)",
            color: "#FFFFFF",
            fontFamily: "'Open Sans', sans-serif",
            fontSize: "16px",
            fontWeight: 700,
            borderRadius: "999px",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          {section.ctaLabel}
        </Link>
      </div>
    </section>
  );
}
