import React from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import { fetchStrapi } from "@/lib/api";
import { SiteSettings, Industry } from "@tathastu/types";

export const revalidate = 60; // ISR 60s

export async function generateMetadata() {
  return {
    title: "Tathastu Studio — Solutions & Products",
    description: "Explore our product portfolio of hardware workstations, industry-standard 3D software, and custom plugins.",
  };
}

export default async function StudioPage() {
  const [settingsRes, industriesRes] = await Promise.all([
    fetchStrapi<{ data: SiteSettings }>("/site-setting?populate[nav][populate]=*&populate[footerColumns][populate]=*&populate[socialLinks][populate]=*&populate[logo][populate]=*"),
    fetchStrapi<{ data: Industry[] }>("/industries?sort=order:asc"),
  ]);

  const siteSettings = settingsRes?.data;
  const industries = industriesRes?.data || [];

  if (!siteSettings) return null;

  return (
    <div style={{ background: "#0B0625", minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Open Sans', sans-serif" }}>
      <Header siteSettings={siteSettings} industries={industries} />

      <main style={{ flexGrow: 1 }}>
        {/* ── 1. HERO — DARK ─────────────────────────────────────────── */}
        <section
          style={{
            position: "relative",
            minHeight: "793px",
            background: "linear-gradient(173deg, rgba(143, 5, 2, 0.2) 0%, rgba(110, 9, 25, 0.56) 44%, #0B0625 100%)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "80px 80px 100px",
          }}
          className="studio-hero-section"
        >
          {/* Background Image texture overlay */}
          <div style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.25, pointerEvents: "none" }}>
            <Image
              src="/images/studio/hero-bg.png"
              alt=""
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>

          <div
            style={{
              position: "relative",
              zIndex: 10,
              maxWidth: "1440px",
              margin: "0 auto",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "48px",
            }}
          >
            {/* Studio logo top area */}
            <div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "20px" }}>
              <div style={{ position: "relative", width: "277px", height: "88px" }}>
                <Image
                  src="/images/studio/studio-logo.svg"
                  alt="Tathastu Studio Logo"
                  fill
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>
            </div>

            {/* Content row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "80px",
                alignItems: "center",
                marginTop: "20px",
              }}
              className="studio-hero-grid"
            >
              {/* Left text column */}
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  minHeight: "500px",
                }}
                className="studio-text-column"
              >
                {/* Concentric circle motif */}
                <div
                  style={{
                    position: "absolute",
                    left: "-3px",
                    top: "-218px",
                    width: "617px",
                    height: "617px",
                    zIndex: 0,
                    pointerEvents: "none",
                  }}
                  className="studio-concentric-circles"
                >
                  <Image
                    src="/images/studio/concentric-circles.svg"
                    alt=""
                    width={617}
                    height={617}
                    style={{ objectFit: "contain" }}
                  />
                </div>

                {/* Text & Button content */}
                <div
                  style={{
                    position: "relative",
                    zIndex: 10,
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                    maxWidth: "509px",
                  }}
                  className="studio-hero-text"
                >
                  <h1
                    style={{
                      fontSize: "59px",
                      fontWeight: 800,
                      lineHeight: "80px",
                      color: "#FFFFFF",
                      margin: 0,
                      textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    }}
                    className="studio-title"
                  >
                    Tathastu Studio
                  </h1>
                  <p
                    style={{
                      fontSize: "26px",
                      lineHeight: "42px",
                      color: "#FFFFFF",
                      margin: 0,
                      fontWeight: 400,
                    }}
                    className="studio-subtitle"
                  >
                    The Premier Hub of Houdini Professionals
                  </p>
                  <div style={{ marginTop: "8px" }} className="studio-btn-container">
                    <Link
                      href="/contact?source=Studio"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "231px",
                        height: "74px",
                        background: "linear-gradient(90deg, #920B08 0%, #D61814 100%)",
                        boxShadow: "0px 2px 5px 0px rgba(0, 0, 0, 0.25)",
                        borderRadius: "50px",
                        color: "#FFFFFF",
                        fontSize: "22px",
                        fontWeight: 600,
                        textDecoration: "none",
                        transition: "transform 0.2s ease, opacity 0.2s ease",
                      }}
                      className="studio-contact-btn"
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right image column */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className="studio-image-column"
              >
                <div
                  style={{
                    position: "relative",
                    width: "469px",
                    height: "469px",
                    borderRadius: "50%",
                    border: "3px solid #FFFFFF",
                    boxShadow: "0 0 0 8px rgba(255,255,255,0.15)",
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                  className="studio-ellipse-container"
                >
                  <img
                    src="/images/studio/hero-right.png"
                    alt="Houdini VFX illustration"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. CONNECT — LIGHT BAND ────────────────────────────────── */}
        <section
          style={{
            position: "relative",
            background: "linear-gradient(180deg, #EFF6FF 0%, #F2E9E3 100%)",
            overflow: "visible",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "120px 80px 140px",
            color: "#000000",
          }}
          className="studio-connect-section"
        >
          <div
            style={{
              position: "relative",
              zIndex: 10,
              maxWidth: "1440px",
              margin: "0 auto",
              width: "100%",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "80px",
              alignItems: "center",
            }}
            className="studio-connect-grid"
          >
            {/* Left text column */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "32px",
                maxWidth: "826px",
              }}
              className="studio-connect-text-column"
            >
              <h2
                style={{
                  fontSize: "54px",
                  fontWeight: 700,
                  lineHeight: "74px",
                  color: "#000000",
                  margin: 0,
                  fontFamily: "'Open Sans', sans-serif",
                }}
                className="studio-connect-title"
              >
                Connect with <br />
                Industry-Leading Houdini Specialists
              </h2>
              <p
                style={{
                  fontSize: "22px",
                  lineHeight: "30px",
                  color: "#000000",
                  margin: 0,
                  fontFamily: "'Open Sans', sans-serif",
                  fontWeight: 400,
                }}
                className="studio-connect-description"
              >
                Whether you're a filmmaker, studio, or creative director looking for top-tier Houdini talent — or a Houdini artist seeking new opportunities — Tathastu is your destination.
                <br /><br />
                If you're looking for Houdini work for your project, make use of the skills of our freelance artists to bring your creative vision to life through high-quality, collaborative, and economical solutions.
              </p>
            </div>

            {/* Right overlapping images column */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="studio-connect-image-column"
            >
              <div className="studio-overlapping-container">
                {/* Red background overlapping card */}
                <div className="studio-connect-red-box" />

                {/* Foreground image card */}
                <div className="studio-connect-img-box">
                  <img
                    src="/images/studio/connect-right.png"
                    alt="Freelance artist work illustration"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. TRUSTED BY STUDIOS — BG IMAGE + DARK OVERLAY ─── */}
        <section
          style={{
            position: "relative",
            minHeight: "360px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px 80px",
            color: "#FFFFFF",
          }}
          className="studio-trusted-section"
        >
          {/* Background image */}
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <img
              src="/images/studio/trusted-bg.jpg"
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>

          {/* Dark overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0, 0, 0, 0.72)",
              zIndex: 1,
            }}
          />

          {/* Content — centered */}
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
              textAlign: "center",
              gap: "24px",
            }}
            className="studio-trusted-grid"
          >
            <h2
              style={{
                fontSize: "59px",
                fontWeight: 800,
                lineHeight: "80px",
                color: "#FFFFFF",
                margin: 0,
                fontFamily: "'Open Sans', sans-serif",
              }}
              className="studio-trusted-title"
            >
              Trusted by Studios
            </h2>
            <p
              style={{
                fontSize: "22px",
                lineHeight: "36px",
                color: "#FFFFFF",
                margin: 0,
                fontFamily: "'Open Sans', sans-serif",
                fontWeight: 400,
                maxWidth: "700px",
              }}
              className="studio-trusted-subtitle"
            >
              We're proud to be the go-to Houdini resource for both creators
              and clients across the industry.
            </p>
            <Link
              href="/contact?source=TrustedByStudios"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "231px",
                height: "74px",
                background: "linear-gradient(90deg, #920B08 0%, #D61814 100%)",
                boxShadow: "0px 2px 5px 0px rgba(0, 0, 0, 0.25)",
                borderRadius: "50px",
                color: "#FFFFFF",
                fontSize: "22px",
                fontWeight: 600,
                textDecoration: "none",
                marginTop: "8px",
                transition: "transform 0.2s ease, opacity 0.2s ease",
              }}
              className="studio-trusted-btn"
            >
              Contact Now
            </Link>
          </div>
        </section>

        {/* ── 4. WHO WE ARE — LIGHT SECTION ─────────────────────────── */}
        <section
          style={{
            position: "relative",
            background: "#FFFFFF",
            overflow: "visible",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "120px 80px 140px",
            color: "#000000",
          }}
          className="studio-whoweare-section"
        >
          <div
            style={{
              position: "relative",
              zIndex: 10,
              maxWidth: "1440px",
              margin: "0 auto",
              width: "100%",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "80px",
              alignItems: "center",
            }}
            className="studio-whoweare-grid"
          >
            {/* Left column — overlapping images + badge */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="studio-whoweare-image-column"
            >
              <div className="studio-whoweare-overlapping-container">
                {/* Back card */}
                <div className="studio-whoweare-back-box">
                  <img
                    src="/images/studio/who-left-1.png"
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>

                {/* Foreground image card */}
                <div className="studio-whoweare-front-box">
                  <img
                    src="/images/studio/who-left-2.png"
                    alt="Houdini Specialists Working"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>

                {/* Badge */}
                <div className="studio-whoweare-badge">
                  <img
                    src="/images/studio/badge-leading.png"
                    alt="Leading VFX Specialists"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Right column — text content */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "32px",
                maxWidth: "826px",
              }}
              className="studio-whoweare-text-column"
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
                className="studio-whoweare-title"
              >
                Who We Are
              </h2>
              <p
                style={{
                  fontSize: "18px",
                  lineHeight: "28px",
                  color: "#333333",
                  margin: 0,
                  fontFamily: "'Open Sans', sans-serif",
                  fontWeight: 400,
                }}
                className="studio-whoweare-description"
              >
                Welcome to Tathastu Studio, a dedicated collective built exclusively from Houdini specialists across India and beyond. Each artist is carefully selected based on their skills and experience in Houdini. Our vibrant community of technical and artistic talent is the heart of everything we do. United by a passion for procedural creativity and problem-solving, our artists bring innovation, precision, and cinematic magic to your project.
              </p>
              
              {/* Tick-circle points */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
                className="studio-whoweare-list"
              >
                {[
                  "Specialized Houdini FX Expertise – Delivering high-quality simulations, effects, and procedural workflows for film, TV, and advertising projects.",
                  "Global Remote Talent Network – Connecting top-tier VFX studios with skilled freelance Houdini artists worldwide.",
                  "Scalable Production Support – Flexible team expansion for short-term projects, peak workloads, and long-term production needs.",
                  "Scalable Production Support – Flexible team expansion for short-term projects, peak workloads, and long-term production needs."
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      gap: "16px",
                      alignItems: "flex-start",
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: "2px" }}>
                      <circle cx="12" cy="12" r="10" fill="#D61814" />
                      <path d="M8 12L11 15L16 9" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span
                      style={{
                        fontSize: "16px",
                        lineHeight: "24px",
                        color: "#333333",
                        fontFamily: "'Open Sans', sans-serif",
                        fontWeight: 500,
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. WHAT WE DO — DARK BAND ─────────────────────────────── */}
        <section
          style={{
            position: "relative",
            background: "#0A080C",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "120px 80px",
            color: "#FFFFFF",
          }}
          className="studio-whatwedo-section"
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
            }}
          >
            {/* Title / Intro */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "24px",
                textAlign: "center",
                maxWidth: "800px",
              }}
              className="studio-whatwedo-header"
            >
              <h2
                style={{
                  fontSize: "54px",
                  fontWeight: 700,
                  lineHeight: "68px",
                  color: "#FFFFFF",
                  margin: 0,
                  fontFamily: "'Open Sans', sans-serif",
                }}
                className="studio-whatwedo-title"
              >
                What We Do
              </h2>
              <p
                style={{
                  fontSize: "20px",
                  lineHeight: "32px",
                  color: "#CCCCCC",
                  margin: 0,
                  fontFamily: "'Open Sans', sans-serif",
                  fontWeight: 400,
                }}
                className="studio-whatwedo-subtitle"
              >
                You share your artistic and technical intent — we translate that into dynamic visual FX:
              </p>
            </div>

            {/* Grid of 8 FX Cards */}
            <div className="studio-whatwedo-grid">
              {[
                { key: "fire", label: "Fire" },
                { key: "smoke", label: "Smoke" },
                { key: "explosions", label: "Explosions" },
                { key: "water", label: "Water" },
                { key: "rain", label: "Rain" },
                { key: "snow", label: "Snow" },
                { key: "ocean", label: "Ocean simulations" },
                { key: "dust", label: "Dust" },
              ].map((card, idx) => (
                <div key={idx} className="studio-fx-card">
                  <div className="studio-fx-image-container">
                    <img
                      src={`/images/studio/fx-${card.key}.png`}
                      alt={card.label}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        transition: "transform 0.4s ease",
                      }}
                      className="studio-fx-image"
                    />
                  </div>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "#FFFFFF",
                      margin: 0,
                      textAlign: "center",
                      fontFamily: "'Open Sans', sans-serif",
                    }}
                  >
                    {card.label}
                  </h3>
                </div>
              ))}
            </div>

            {/* View More Button */}
            <div style={{ marginTop: "16px" }}>
              <Link
                href="/portfolio?source=WhatWeDo"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "231px",
                  height: "74px",
                  background: "linear-gradient(90deg, #920B08 0%, #D61814 100%)",
                  boxShadow: "0px 2px 5px 0px rgba(0, 0, 0, 0.25)",
                  borderRadius: "50px",
                  color: "#FFFFFF",
                  fontSize: "22px",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "transform 0.2s ease, opacity 0.2s ease",
                }}
                className="studio-whatwedo-btn"
              >
                View More
              </Link>
            </div>
          </div>
        </section>

        {/* ── 6. MEET THE TEAM — LIGHT SECTION ───────────────────────── */}
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
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "24px",
                textAlign: "center",
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
                Meet the Team
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
                Industry veterans and visionary leaders driving the future of professional VFX collaboration
              </p>
            </div>

            {/* Members Row */}
            <div className="studio-meet-row">
              {[
                { key: "chetan", name: "Chetan Jain", role: "Founder & CEO" },
                { key: "venu", name: "Venu Victor", role: "Co-founder and VFX Supervisor" },
                { key: "nikitha", name: "Nikitha Gaikwad", role: "Marketing Manager" },
              ].map((member, idx) => (
                <div key={idx} className="studio-member-card">
                  <div className="studio-member-avatar-container">
                    <img
                      src={`/images/studio/member-${member.key}.png`}
                      alt={member.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "22px",
                        fontWeight: 700,
                        color: "#000000",
                        margin: 0,
                        fontFamily: "'Open Sans', sans-serif",
                      }}
                    >
                      {member.name}
                    </h3>
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#D61814",
                        margin: 0,
                        fontFamily: "'Open Sans', sans-serif",
                      }}
                    >
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 7. OUR PURPOSE — DARK BAND ─────────────────────────────── */}
        <section
          style={{
            position: "relative",
            background: "#0A080C",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "120px 80px",
            color: "#FFFFFF",
          }}
          className="studio-purpose-section"
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
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "24px",
                textAlign: "center",
                maxWidth: "900px",
              }}
            >
              <h2
                style={{
                  fontSize: "54px",
                  fontWeight: 700,
                  lineHeight: "68px",
                  color: "#FFFFFF",
                  margin: 0,
                  fontFamily: "'Open Sans', sans-serif",
                }}
                className="studio-purpose-title"
              >
                Our Purpose
              </h2>
              <p
                style={{
                  fontSize: "20px",
                  lineHeight: "32px",
                  color: "#CCCCCC",
                  margin: 0,
                  fontFamily: "'Open Sans', sans-serif",
                  fontWeight: 400,
                }}
                className="studio-purpose-subtitle"
              >
                To build a dynamic, scalable, and globally connected Houdini FX production ecosystem that:
              </p>
            </div>

            {/* Why Cards Grid */}
            <div className="studio-purpose-grid">
              {[
                "Delivers high-quality FX services to filmmakers, studios, and content creators",
                "Leverages top freelance talent from India and beyond",
                "Empowers artists through flexibility, creativity, and project-based work culture",
                "Adapts to changing needs with agile, scalable solutions",
                "Removes infrastructure barriers with a fully virtual pipeline",
              ].map((text, idx) => (
                <div key={idx} className="studio-purpose-card">
                  <div
                    style={{
                      fontSize: "36px",
                      fontWeight: 800,
                      color: "#D61814",
                      fontFamily: "'Open Sans', sans-serif",
                      marginBottom: "16px",
                    }}
                  >
                    {`0${idx + 1}`}
                  </div>
                  <p
                    style={{
                      fontSize: "18px",
                      lineHeight: "28px",
                      color: "#FFFFFF",
                      margin: 0,
                      fontFamily: "'Open Sans', sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 8. WHAT YOU'LL FIND INSIDE — LIGHT SECTION ────────────── */}
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
          className="studio-find-section"
        >
          {/* Radio inputs for CSS-based toggling */}
          <input
            type="radio"
            id="studio-toggle-studios"
            name="studio-toggle"
            defaultChecked
            style={{ display: "none" }}
          />
          <input
            type="radio"
            id="studio-toggle-freelancers"
            name="studio-toggle"
            style={{ display: "none" }}
          />

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
              gap: "48px",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "24px",
                textAlign: "center",
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
                className="studio-find-title"
              >
                What You'll Find Inside
              </h2>
            </div>

            {/* Toggle bar */}
            <div className="studio-toggle-bar">
              <label
                htmlFor="studio-toggle-studios"
                className="studio-toggle-label studio-toggle-label-studios"
              >
                For Studios
              </label>
              <label
                htmlFor="studio-toggle-freelancers"
                className="studio-toggle-label studio-toggle-label-freelancers"
              >
                For Freelancers
              </label>
            </div>

            {/* 3 Contact Cards Container */}
            <div className="studio-cards-container">
              {/* Card 1: Email */}
              <div className="studio-contact-card">
                <div className="studio-contact-icon-wrapper">
                  {/* Mail icon SVG */}
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D61814" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M22 6l-10 7L2 6" />
                  </svg>
                </div>
                <div className="studio-contact-content">
                  <h4 className="for-studios-only studio-contact-label">General Inquiries</h4>
                  <h4 className="for-freelancers-only studio-contact-label">Artist Onboarding</h4>
                  <p className="studio-contact-name">Email</p>
                  <a href="mailto:academy@tathastu.global" className="studio-contact-value">academy@tathastu.global</a>
                  <a href="tel:+918125613838" className="studio-contact-value">+91 81256 13838</a>
                </div>
              </div>

              {/* Card 2: Chetan Jain */}
              <div className="studio-contact-card">
                <div className="studio-contact-icon-wrapper">
                  {/* User icon SVG */}
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D61814" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div className="studio-contact-content">
                  <h4 className="for-studios-only studio-contact-label">Founder & CEO</h4>
                  <h4 className="for-freelancers-only studio-contact-label">Talent Acquisition</h4>
                  <p className="studio-contact-name">Chetan Jain</p>
                  <a href="tel:+919820192970" className="studio-contact-value">+91 98201 92970</a>
                </div>
              </div>

              {/* Card 3: Venu Victor */}
              <div className="studio-contact-card">
                <div className="studio-contact-icon-wrapper">
                  {/* User/Briefcase icon SVG */}
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D61814" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                </div>
                <div className="studio-contact-content">
                  <h4 className="for-studios-only studio-contact-label">Co-founder & VFX Supervisor</h4>
                  <h4 className="for-freelancers-only studio-contact-label">Portfolio Review</h4>
                  <p className="studio-contact-name">Venu Victor</p>
                  <a href="tel:+919611104802" className="studio-contact-value">+91 96111 04802</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer siteSettings={siteSettings} />
      <WhatsAppFAB />

      <style>{`
        .studio-contact-btn:hover {
          transform: translateY(-2px);
          opacity: 0.95;
        }
        .studio-trusted-btn:hover {
          transform: translateY(-2px);
          background-color: #F5F5F5 !important;
        }
        .studio-overlapping-container {
          position: relative;
          width: 635px;
          height: 679px;
          flex-shrink: 0;
        }
        .studio-connect-red-box {
          position: absolute;
          left: 0;
          top: 51px;
          width: 635px;
          height: 628px;
          background-color: #D61814;
          border-radius: 24px;
          z-index: 1;
        }
        .studio-connect-img-box {
          position: absolute;
          left: 0;
          top: 0;
          width: 583px;
          height: 609px;
          border-radius: 24px;
          overflow: hidden;
          z-index: 2;
        }
        .studio-whoweare-overlapping-container {
          position: relative;
          width: 635px;
          height: 679px;
          flex-shrink: 0;
        }
        .studio-whoweare-back-box {
          position: absolute;
          left: 0;
          top: 51px;
          width: 635px;
          height: 628px;
          border-radius: 24px;
          overflow: hidden;
          z-index: 1;
        }
        .studio-whoweare-front-box {
          position: absolute;
          left: 0;
          top: 0;
          width: 583px;
          height: 609px;
          border-radius: 24px;
          overflow: hidden;
          z-index: 2;
        }
        .studio-whoweare-badge {
          position: absolute;
          right: -20px;
          bottom: 20px;
          width: 160px;
          height: 160px;
          z-index: 3;
        }
        .studio-whatwedo-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
          width: 100%;
        }
        .studio-fx-card {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .studio-fx-image-container {
          width: 100%;
          aspect-ratio: 4 / 3;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
        }
        .studio-fx-card:hover .studio-fx-image {
          transform: scale(1.05);
        }
        .studio-whatwedo-btn:hover {
          transform: translateY(-2px);
          opacity: 0.95;
        }
        .studio-meet-row {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          gap: 64px;
          width: 100%;
        }
        .studio-member-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          flex: 1;
          max-width: 320px;
        }
        .studio-member-avatar-container {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          overflow: hidden;
          background-color: #F5F5F5;
          border: 3px solid #D61814;
        }
        .studio-purpose-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          width: 100%;
        }
        .studio-purpose-card {
          background-color: #151218;
          border-top: 4px solid #D61814;
          padding: 32px;
          border-radius: 0 0 12px 12px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .studio-purpose-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
        }
        .studio-toggle-bar {
          display: flex;
          background-color: #F0EFF2;
          border-radius: 50px;
          padding: 6px;
          position: relative;
          z-index: 10;
          cursor: pointer;
        }
        .studio-toggle-label {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 28px;
          border-radius: 50px;
          font-size: 18px;
          font-weight: 600;
          color: #666666;
          cursor: pointer;
          transition: background-color 0.3s ease, color 0.3s ease;
          user-select: none;
        }
        #studio-toggle-studios:checked ~ * .studio-toggle-label-studios {
          background-color: #D61814;
          color: #FFFFFF;
        }
        #studio-toggle-freelancers:checked ~ * .studio-toggle-label-freelancers {
          background-color: #D61814;
          color: #FFFFFF;
        }
        
        #studio-toggle-studios:checked ~ * .for-freelancers-only {
          display: none !important;
        }
        #studio-toggle-studios:checked ~ * .for-studios-only {
          display: block !important;
        }
        #studio-toggle-freelancers:checked ~ * .for-studios-only {
          display: none !important;
        }
        #studio-toggle-freelancers:checked ~ * .for-freelancers-only {
          display: block !important;
        }

        .studio-cards-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          width: 100%;
        }
        .studio-contact-card {
          background-color: #F9F9FB;
          border: 1px solid #EEEEEE;
          border-radius: 16px;
          padding: 40px 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 20px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .studio-contact-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
        }
        .studio-contact-icon-wrapper {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background-color: rgba(214, 24, 20, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .studio-contact-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          width: 100%;
        }
        .studio-contact-label {
          font-size: 14px;
          font-weight: 700;
          color: #D61814;
          text-transform: uppercase;
          margin: 0;
          letter-spacing: 0.5px;
        }
        .studio-contact-name {
          font-size: 22px;
          font-weight: 700;
          color: #000000;
          margin: 0;
        }
        .studio-contact-value {
          font-size: 16px;
          color: #555555;
          text-decoration: none;
          transition: color 0.2s ease;
          display: block;
          margin-top: 4px;
          font-weight: 500;
        }
        .studio-contact-value:hover {
          color: #D61814;
        }
        @media (max-width: 1024px) {
          .studio-hero-section {
            padding: 80px 40px 80px !important;
          }
          .studio-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 64px !important;
            text-align: center !important;
          }
          .studio-text-column {
            min-height: auto !important;
            align-items: center !important;
          }
          .studio-concentric-circles {
            left: 50% !important;
            top: 50% !important;
            transform: translate(-50%, -50%) !important;
            opacity: 0.3 !important;
            width: 100% !important;
            max-width: 500px !important;
            height: auto !important;
          }
          .studio-hero-text {
            align-items: center !important;
          }
          .studio-title {
            font-size: 48px !important;
            line-height: 60px !important;
          }
          .studio-subtitle {
            font-size: 20px !important;
            line-height: 32px !important;
          }
          .studio-ellipse-container {
            width: 320px !important;
            height: 320px !important;
            border-radius: 50% !important;
            overflow: hidden !important;
          }
          .studio-connect-section {
            padding: 80px 40px 100px !important;
          }
          .studio-connect-grid {
            grid-template-columns: 1fr !important;
            gap: 64px !important;
            text-align: center !important;
          }
          .studio-connect-text-column {
            align-items: center !important;
          }
          .studio-connect-title {
            font-size: 38px !important;
            line-height: 48px !important;
          }
          .studio-connect-description {
            font-size: 18px !important;
            line-height: 26px !important;
          }
          .studio-overlapping-container {
            width: 480px !important;
            height: 513px !important;
          }
          .studio-connect-red-box {
            top: 38px !important;
            width: 480px !important;
            height: 475px !important;
            border-radius: 18px !important;
          }
          .studio-connect-img-box {
            width: 440px !important;
            height: 460px !important;
            border-radius: 18px !important;
          }
          .studio-trusted-section {
            padding: 60px 40px !important;
            min-height: auto !important;
          }
          .studio-trusted-grid {
            flex-direction: column !important;
            text-align: center !important;
            gap: 32px !important;
          }
          .studio-trusted-title {
            font-size: 44px !important;
            line-height: 56px !important;
          }
          .studio-trusted-subtitle {
            font-size: 20px !important;
            line-height: 32px !important;
          }
          .studio-trusted-btn {
            width: 200px !important;
            height: 64px !important;
            font-size: 18px !important;
          }
          .studio-whoweare-section {
            padding: 80px 40px 100px !important;
          }
          .studio-whoweare-grid {
            grid-template-columns: 1fr !important;
            gap: 64px !important;
          }
          .studio-whoweare-title {
            font-size: 38px !important;
            line-height: 48px !important;
            text-align: center !important;
          }
          .studio-whoweare-description {
            font-size: 16px !important;
            line-height: 24px !important;
            text-align: center !important;
          }
          .studio-whoweare-overlapping-container {
            width: 480px !important;
            height: 513px !important;
          }
          .studio-whoweare-back-box {
            top: 38px !important;
            width: 480px !important;
            height: 475px !important;
            border-radius: 18px !important;
          }
          .studio-whoweare-front-box {
            width: 440px !important;
            height: 460px !important;
            border-radius: 18px !important;
          }
          .studio-whoweare-badge {
            width: 120px !important;
            height: 120px !important;
            right: -10px !important;
            bottom: 10px !important;
          }
          .studio-whatwedo-section {
            padding: 80px 40px !important;
          }
          .studio-whatwedo-title {
            font-size: 38px !important;
            line-height: 48px !important;
          }
          .studio-whatwedo-subtitle {
            font-size: 16px !important;
            line-height: 26px !important;
          }
          .studio-whatwedo-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 24px !important;
          }
          .studio-whatwedo-btn {
            width: 200px !important;
            height: 64px !important;
            font-size: 18px !important;
          }
          .studio-meet-section {
            padding: 80px 40px !important;
          }
          .studio-meet-title {
            font-size: 38px !important;
            line-height: 48px !important;
          }
          .studio-meet-subtitle {
            font-size: 16px !important;
            line-height: 26px !important;
          }
          .studio-meet-row {
            flex-direction: column !important;
            align-items: center !important;
            gap: 48px !important;
          }
          .studio-member-card {
            max-width: 100% !important;
          }
          .studio-purpose-section {
            padding: 80px 40px !important;
          }
          .studio-purpose-title {
            font-size: 38px !important;
            line-height: 48px !important;
          }
          .studio-purpose-subtitle {
            font-size: 16px !important;
            line-height: 26px !important;
          }
          .studio-purpose-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 24px !important;
          }
          .studio-find-section {
            padding: 80px 40px !important;
          }
          .studio-find-title {
            font-size: 38px !important;
            line-height: 48px !important;
          }
          .studio-cards-container {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .studio-contact-card {
            padding: 32px 24px !important;
          }
        }
        @media (max-width: 640px) {
          .studio-hero-section {
            padding: 60px 20px 60px !important;
          }
          .studio-title {
            font-size: 36px !important;
            line-height: 48px !important;
          }
          .studio-subtitle {
            font-size: 16px !important;
            line-height: 26px !important;
          }
          .studio-contact-btn {
            width: 180px !important;
            height: 58px !important;
            font-size: 18px !important;
          }
          .studio-ellipse-container {
            width: 260px !important;
            height: 260px !important;
            border-radius: 50% !important;
            overflow: hidden !important;
          }
          .studio-connect-section {
            padding: 60px 20px 80px !important;
          }
          .studio-connect-title {
            font-size: 28px !important;
            line-height: 36px !important;
          }
          .studio-connect-description {
            font-size: 15px !important;
            line-height: 22px !important;
          }
          .studio-overlapping-container {
            width: 300px !important;
            height: 320px !important;
          }
          .studio-connect-red-box {
            top: 24px !important;
            width: 300px !important;
            height: 296px !important;
            border-radius: 12px !important;
          }
          .studio-connect-img-box {
            width: 275px !important;
            height: 287px !important;
            border-radius: 12px !important;
          }
          .studio-trusted-section {
            padding: 50px 20px !important;
          }
          .studio-trusted-title {
            font-size: 32px !important;
            line-height: 42px !important;
          }
          .studio-trusted-subtitle {
            font-size: 16px !important;
            line-height: 26px !important;
          }
          .studio-trusted-btn {
            width: 180px !important;
            height: 58px !important;
            font-size: 16px !important;
          }
          .studio-whoweare-section {
            padding: 60px 20px 80px !important;
          }
          .studio-whoweare-title {
            font-size: 28px !important;
            line-height: 36px !important;
          }
          .studio-whoweare-overlapping-container {
            width: 300px !important;
            height: 320px !important;
          }
          .studio-whoweare-back-box {
            top: 24px !important;
            width: 300px !important;
            height: 296px !important;
            border-radius: 12px !important;
          }
          .studio-whoweare-front-box {
            width: 275px !important;
            height: 287px !important;
            border-radius: 12px !important;
          }
          .studio-whoweare-badge {
            width: 80px !important;
            height: 80px !important;
            right: -5px !important;
            bottom: 5px !important;
          }
          .studio-whatwedo-section {
            padding: 60px 20px !important;
          }
          .studio-whatwedo-title {
            font-size: 28px !important;
            line-height: 36px !important;
          }
          .studio-whatwedo-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .studio-whatwedo-btn {
            width: 180px !important;
            height: 58px !important;
            font-size: 16px !important;
          }
          .studio-meet-section {
            padding: 60px 20px !important;
          }
          .studio-meet-title {
            font-size: 28px !important;
            line-height: 36px !important;
          }
          .studio-purpose-section {
            padding: 60px 20px !important;
          }
          .studio-purpose-title {
            font-size: 28px !important;
            line-height: 36px !important;
          }
          .studio-purpose-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .studio-find-section {
            padding: 60px 20px !important;
          }
          .studio-find-title {
            font-size: 28px !important;
            line-height: 36px !important;
          }
          .studio-toggle-label {
            padding: 10px 20px !important;
            font-size: 15px !important;
          }
        }
      `}</style>
    </div>
  );
}
