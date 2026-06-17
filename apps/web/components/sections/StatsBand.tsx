"use client";

import React from "react";
import { StatsBandSection } from "@tathastu/types";

interface StatsBandProps {
  section: StatsBandSection;
}

/*
  Figma node 40:1699 — Stats band
  - Dark band with faint workstation photo behind + dark gradient (darker left)
  - Left: white bold two-line text "Join the" / "community of Millions", left-aligned
  - Thin vertical divider to its right
  - Three stats in a row: "20+" "Number of Hardwares" · "80+" "Number of Plugins" · "4100+" "Clients Served"
  - Big number bold white, small label white beneath
  No: gradient stat values, hover scales on stat boxes, orange decorators
*/

export default function StatsBand({ section }: StatsBandProps) {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#0a0e1a",
        padding: "64px 80px",
      }}
    >
      {/* Faint photo background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/images/hero/hero-photo.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.32)",
          zIndex: 0,
        }}
      />
      {/* Darker-left gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(5,8,20,0.8) 0%, rgba(10,20,40,0.6) 100%)",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "1280px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: "0",
          flexWrap: "wrap",
        }}
      >
        {/* Left headline */}
        <div
          style={{
            flexShrink: 0,
            paddingRight: "48px",
          }}
        >
          <p
            style={{
              fontFamily: "'Open Sans', sans-serif",
              fontSize: "clamp(22px, 2.5vw, 36px)",
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.25,
              margin: 0,
            }}
          >
            Join the<br />
            community of Millions
          </p>
        </div>

        {/* Vertical divider */}
        <div
          style={{
            width: "1px",
            height: "80px",
            backgroundColor: "rgba(255,255,255,0.25)",
            flexShrink: 0,
            marginRight: "48px",
          }}
        />

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: "64px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {section.stats.map((stat, idx) => (
            <div
              key={stat.id || idx}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              {/* Big number */}
              <span
                style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: "clamp(36px, 3.5vw, 52px)",
                  fontWeight: 800,
                  color: "#FFFFFF",
                  lineHeight: 1.1,
                }}
              >
                {stat.value}
              </span>
              {/* Label */}
              <span
                style={{
                  fontFamily: "'Open Sans', sans-serif",
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.75)",
                  marginTop: "6px",
                  lineHeight: 1.4,
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
