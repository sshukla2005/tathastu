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

        {/* ── 6. MEET THE TEAM ─────────────────────────────────────── */}
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
                gap: "16px",
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
                Meet <span style={{ color: "#D61814" }}>the Team</span>
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

            {/* Members Row — 4 cards */}
            <div className="studio-meet-row">
              {[
                { key: "nikitha",  name: "Nikitha Gaikwad", role: "Marketing Manager",           bg: "#D6EAF8" },
                { key: "chetan",   name: "Chetan Jain",     role: "Founder & CEO",               bg: "#D5F5E3" },
                { key: "nikitha2", name: "Nikitha Gaikwad", role: "President of Sales",          bg: "#E8DAEF" },
                { key: "venu",     name: "Venu Victor",     role: "Co-founder and VFX Supervisor", bg: "#FDEBD0" },
              ].map((member, idx) => (
                <div key={idx} className="studio-member-card">
                  {/* Name & role — ABOVE the photo */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "18px",
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
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "#555555",
                        margin: 0,
                        fontFamily: "'Open Sans', sans-serif",
                      }}
                    >
                      {member.role}
                    </p>
                  </div>

                  {/* Arch / oval card with photo */}
                  <div
                    className="studio-member-arch"
                    style={{ backgroundColor: member.bg }}
                  >
                    <img
                      src={`/images/studio/member-${member.key}.png`}
                      alt={member.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "top center",
                        display: "block",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 7. OUR PURPOSE — LIGHT CREAM SECTION ─────────────────── */}
        <section
          style={{
            position: "relative",
            background: "#F5F0EB",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "120px 80px",
            color: "#000000",
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
              gap: "48px",
            }}
          >
            {/* Header row — title left, arrows right */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "24px",
                flexWrap: "wrap",
              }}
              className="studio-purpose-header"
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <h2
                  style={{
                    fontSize: "54px",
                    fontWeight: 700,
                    lineHeight: "68px",
                    color: "#000000",
                    margin: 0,
                    fontFamily: "'Open Sans', sans-serif",
                  }}
                  className="studio-purpose-title"
                >
                  Our <span style={{ color: "#D61814" }}>Purpose</span>
                </h2>
                <p
                  style={{
                    fontSize: "18px",
                    lineHeight: "28px",
                    color: "#555555",
                    margin: 0,
                    fontFamily: "'Open Sans', sans-serif",
                    fontWeight: 400,
                    maxWidth: "700px",
                  }}
                  className="studio-purpose-subtitle"
                >
                  To build a dynamic, scalable, and globally connected Houdini FX production ecosystem that:
                </p>
              </div>

              {/* Carousel arrows */}
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  alignSelf: "center",
                  flexShrink: 0,
                }}
              >
                <button
                  aria-label="Previous"
                  style={{
                    width: "44px",
                    height: "44px",
                    border: "1.5px solid #0b0625",
                    borderRadius: "4px",
                    background: "#FFFFFF",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    color: "#0b0625",
                  }}
                >
                  ‹
                </button>
                <button
                  aria-label="Next"
                  style={{
                    width: "44px",
                    height: "44px",
                    border: "1.5px solid #0b0625",
                    borderRadius: "4px",
                    background: "#FFFFFF",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    color: "#0b0625",
                  }}
                >
                  ›
                </button>
              </div>
            </div>

            {/* Cards Grid — 3 top + 2 bottom */}
            <div className="studio-purpose-grid">
              {[
                "Delivers high-quality FX services to filmmakers, studios, and content creators",
                "Leverages top freelance talent from India and beyond",
                "Removes infrastructure barriers with a fully virtual pipeline",
                "Empowers artists through flexibility, creativity, and project-based work culture",
                "Adapts to changing needs with agile, scalable solutions",
              ].map((text, idx) => (
                <div key={idx} className="studio-purpose-card">
                  <p
                    style={{
                      fontSize: "16px",
                      lineHeight: "26px",
                      color: "#222222",
                      margin: 0,
                      fontFamily: "'Open Sans', sans-serif",
                      fontWeight: 500,
                      textAlign: "center",
                    }}
                  >
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 8. WHAT YOU'LL FIND INSIDE ───────────────────────────── */}
        <section
          style={{
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "120px 80px",
            color: "#FFFFFF",
          }}
          className="studio-find-section"
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
              background: "rgba(0, 0, 0, 0.78)",
              zIndex: 1,
            }}
          />
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
                  color: "#FFFFFF",
                  margin: 0,
                  fontFamily: "'Open Sans', sans-serif",
                }}
                className="studio-find-title"
              >
                What You&apos;ll Find <span style={{ color: "#D61814" }}>Inside</span>
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
                <div className="studio-contact-content">
                  <p className="studio-contact-name">Email</p>
                  <a href="mailto:academy@tathastu.global" className="studio-contact-value">academy@tathastu.global</a>
                  <a href="tel:+918125613838" className="studio-contact-value">+91 81256 13838</a>
                </div>
              </div>

              {/* Card 2: Chetan Jain */}
              <div className="studio-contact-card">
                <div className="studio-contact-content">
                  <p className="studio-contact-name">Chetan Jain</p>
                  <a href="tel:+919820192970" className="studio-contact-value">+91 98201 92970</a>
                  <a href="mailto:chetan@tathastu.global" className="studio-contact-value">chetan@tathastu.global</a>
                </div>
              </div>

              {/* Card 3: Venu Victor */}
              <div className="studio-contact-card">
                <div className="studio-contact-content">
                  <p className="studio-contact-name">Venu Victor</p>
                  <a href="tel:+919611104802" className="studio-contact-value">+91 96111 04802</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── 9. STUDIO-SPECIFIC FOOTER — LIGHT CREAM GRADIENT ────────── */}
      <footer
        style={{
          background: "linear-gradient(135deg, #F0EDE8 0%, #E8E4DE 40%, #D4EDD8 100%)",
          color: "#000000",
          padding: "80px 80px 40px 80px",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        className="studio-footer"
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "32px",
            textAlign: "center",
            zIndex: 10,
          }}
        >
          {/* Tagline — 2 lines */}
          <h2
            style={{
              fontSize: "48px",
              fontWeight: 700,
              lineHeight: "60px",
              color: "#000000",
              margin: 0,
              fontFamily: "'Open Sans', sans-serif",
            }}
            className="studio-footer-tagline"
          >
            Tathastu Studio isn&apos;t a trend.<br />
            It&apos;s a <span style={{ color: "#D61814" }}>turning point</span>
          </h2>

          {/* CTA subtext */}
          <p
            style={{
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: "26px",
              color: "#444444",
              margin: 0,
              maxWidth: "700px",
              fontFamily: "'Open Sans', sans-serif",
              letterSpacing: "0.3px",
            }}
            className="studio-footer-cta"
          >
            THE FUTURE OF HOUDINI FREELANCING IS HERE. LET&apos;S BUILD THE NEXT GENERATION OF HIGH-END VFX TOGETHER
          </p>

          {/* Subtext with mixed colors */}
          <p
            style={{
              fontSize: "18px",
              color: "#000000",
              margin: 0,
              fontFamily: "'Open Sans', sans-serif",
              fontWeight: 400,
            }}
            className="studio-footer-subtext"
          >
            <span style={{ color: "#D61814", fontWeight: 600 }}>Your story,</span>
            {" "}our innovation — let&apos;s make it{" "}
            <span style={{ color: "#D61814", fontWeight: 600 }}>unforgettable.</span>
          </p>

          {/* Social Icons — 5 icons */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
              marginTop: "8px",
            }}
          >
            {[
              {
                platform: "facebook",
                url: "https://facebook.com",
                svg: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.95z" />
                  </svg>
                ),
              },
              {
                platform: "instagram",
                url: "https://instagram.com",
                svg: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                ),
              },
              {
                platform: "linkedin",
                url: "https://linkedin.com",
                svg: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                ),
              },
              {
                platform: "twitter",
                url: "https://x.com",
                svg: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                ),
              },
              {
                platform: "youtube",
                url: "https://youtube.com",
                svg: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                ),
              },
            ].map((social, sIdx) => (
              <a
                key={sIdx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow us on ${social.platform}`}
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  backgroundColor: "#000000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                  textDecoration: "none",
                  transition: "background-color 0.3s ease",
                }}
                className="studio-social-icon"
              >
                {social.svg}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div
            style={{
              borderTop: "1px solid rgba(0, 0, 0, 0.12)",
              paddingTop: "24px",
              width: "100%",
              marginTop: "16px",
            }}
          >
            <p
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: "14px",
                color: "#666666",
                margin: 0,
                lineHeight: "22px",
              }}
            >
              © 2025 Tathastu Academy. A division of Tathastu Techno Solution. Authorized SideFX partner in India.
            </p>
          </div>
        </div>
      </footer>
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
          align-items: flex-end;
          gap: 24px;
          width: 100%;
        }
        .studio-member-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          flex: 1;
          max-width: 260px;
        }
        .studio-member-arch {
          width: 100%;
          height: 320px;
          border-radius: 999px 999px 0 0;
          overflow: hidden;
          position: relative;
        }
        .studio-purpose-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          width: 100%;
        }
        .studio-purpose-card {
          background-color: #FFFFFF;
          border: 1.5px solid #E0E0E0;
          padding: 32px 24px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .studio-purpose-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
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
          color: #BBBBBB;
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
          background-color: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 12px;
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          gap: 12px;
          transition: background-color 0.3s ease;
          backdrop-filter: blur(8px);
        }
        .studio-contact-card:hover {
          background-color: rgba(255, 255, 255, 0.13);
        }
        .studio-contact-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;
          width: 100%;
        }
        .studio-contact-name {
          font-size: 20px;
          font-weight: 700;
          color: #FFFFFF;
          margin: 0;
          font-family: "'Open Sans', sans-serif";
        }
        .studio-contact-value {
          font-size: 15px;
          color: #BBBBBB;
          text-decoration: none;
          display: block;
          font-weight: 400;
          transition: color 0.2s ease;
        }
        .studio-contact-value:hover {
          color: #FFFFFF;
        }
        .studio-social-icon:hover {
          background-color: #D61814 !important;
          color: #FFFFFF !important;
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
            flex-wrap: wrap !important;
            gap: 32px !important;
          }
          .studio-member-card {
            max-width: 200px !important;
          }
          .studio-member-arch {
            height: 240px !important;
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
            gap: 16px !important;
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
          .studio-footer {
            padding: 60px 40px 40px 40px !important;
          }
          .studio-footer-tagline {
            font-size: 36px !important;
            line-height: 46px !important;
          }
          .studio-footer-cta {
            font-size: 22px !important;
            line-height: 32px !important;
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
          .studio-member-card {
            max-width: 160px !important;
          }
          .studio-member-arch {
            height: 200px !important;
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
            gap: 16px !important;
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
          .studio-footer {
            padding: 40px 20px 30px 20px !important;
          }
          .studio-footer-tagline {
            font-size: 26px !important;
            line-height: 34px !important;
          }
          .studio-footer-cta {
            font-size: 18px !important;
            line-height: 26px !important;
          }
          .studio-footer-subtext {
            font-size: 15px !important;
          }
        }
      `}</style>
    </div>
  );
}
