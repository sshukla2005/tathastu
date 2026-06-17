"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HeroSection } from "@tathastu/types";

interface HeroProps {
  section: HeroSection;
}

/*
  Figma node 84:2795 — Group 1000013937 (Hero right-column)
  - Outer group: 667×621px
  - Hex background outline (84:2812): 602×521px, Vector, border #FFE4FF 1px
  - Blue hex outline (84:2817): 622×539px, border #88BAFF 2px, offset left:44 top:59
  - Photo (84:2815): 610×528px, backgroundImage from imageRef 9634f43d0f2ec73f0411a4610d8105cdce6dd032
  - Blue shadow (84:2814): 610×529px, bg #0794E6, offset left:24 top:10
  
  Hero text (spec node 90:5722):
  - H1: "Cutting-edge Solutions for Industries" — large, bold, white
  - Subtext: "Combining Expertise, Innovation, and Unmatched Support..." — light gray
  - Buttons: "Get Consultation" (blue gradient pill) + "Request Demo" (white/outline)
  
  Background: dark photograph + dark overlay
*/

export default function Hero({ section }: HeroProps) {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "750px",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#0a0e1a",
      }}
    >
      {/* Dark photographic background — we use the hero photo as a blurred bg too */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/images/hero/hero-photo.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(1px) brightness(0.55)",
          transform: "scale(1.05)",
          zIndex: 0,
        }}
      />
      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(5,8,20,0.7) 0%, rgba(10,20,45,0.55) 100%)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "80px 80px",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "60px",
          alignItems: "center",
        }}
        className="hero-grid"
      >
        {/* ── Left Column: Text ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <h1
            style={{
              fontFamily: "'Open Sans', sans-serif",
              fontSize: "clamp(36px, 3.5vw, 58px)",
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            {section.heading}
          </h1>

          <p
            style={{
              fontFamily: "'Open Sans', sans-serif",
              fontSize: "clamp(16px, 1.4vw, 20px)",
              fontWeight: 400,
              color: "#B0B8CC",
              lineHeight: 1.7,
              margin: 0,
              maxWidth: "560px",
            }}
          >
            {section.subtext}
          </p>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
              marginTop: "8px",
            }}
          >
            {/* Primary: blue gradient pill */}
            <Link
              href={section.primaryCtaHref}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "14px 32px",
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
              {section.primaryCtaLabel}
            </Link>

            {/* Secondary: white/outline pill */}
            <Link
              href={section.secondaryCtaHref}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "14px 32px",
                background: "#FFFFFF",
                color: "#0b0625",
                fontFamily: "'Open Sans', sans-serif",
                fontSize: "16px",
                fontWeight: 700,
                borderRadius: "999px",
                textDecoration: "none",
                whiteSpace: "nowrap",
                border: "2px solid rgba(75,149,255,0.4)",
              }}
            >
              {section.secondaryCtaLabel}
            </Link>
          </div>
        </div>

        {/* ── Right Column: Hexagon-masked photo ──
            Figma layout (within 667×621 group):
            - hex-bg outline: top-left, 602×521, border #FFE4FF 1px  (decorative back hex)
            - blue hex outline: left:44 top:59, 622×539, border #88BAFF 2px  (front accent)
            - photo vector: left:0 top:69, 610×528
            - blue shadow: left:24 top:79, 610×529, bg #0794E6
        */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "620px",
            height: "560px",
            marginLeft: "auto",
          }}
        >
          {/* Back hexagon outline — decorative, #FFE4FF */}
          <div
            style={{
              position: "absolute",
              left: "12px",
              top: "0px",
              width: "90%",
              height: "85%",
              zIndex: 1,
            }}
          >
            <Image
              src="/images/hero/hex-bg.svg"
              alt=""
              fill
              style={{ objectFit: "contain" }}
            />
          </div>

          {/* Blue shadow shape behind photo */}
          <div
            style={{
              position: "absolute",
              left: "44px",
              top: "79px",
              width: "91%",
              height: "82%",
              backgroundColor: "#0794E6",
              clipPath:
                "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
              zIndex: 2,
              opacity: 0.7,
            }}
          />

          {/* Photograph clipped to hexagon */}
          <div
            style={{
              position: "absolute",
              left: "0px",
              top: "69px",
              width: "91%",
              height: "82%",
              clipPath:
                "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
              zIndex: 3,
              overflow: "hidden",
            }}
          >
            <Image
              src="/images/hero/hero-photo.png"
              alt="Cutting-edge workstation solutions"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>

          {/* Front blue hexagon outline accent — #88BAFF 2px */}
          <div
            style={{
              position: "absolute",
              left: "44px",
              top: "59px",
              width: "94%",
              height: "87%",
              zIndex: 4,
              pointerEvents: "none",
            }}
          >
            <Image
              src="/images/hero/hex-outline.svg"
              alt=""
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      </div>

      {/* Mobile responsive styles */}
      <style jsx>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            padding: 60px 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
