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

        {/* ── 3. TRUSTED BY STUDIOS — RED CTA BAND ───────────────────── */}
        <section
          style={{
            position: "relative",
            minHeight: "360px",
            background: "linear-gradient(90deg, #920B08 0%, #D61814 100%)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px 80px",
            color: "#FFFFFF",
          }}
          className="studio-trusted-section"
        >
          <div
            style={{
              position: "relative",
              zIndex: 10,
              maxWidth: "1440px",
              margin: "0 auto",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "48px",
            }}
            className="studio-trusted-grid"
          >
            {/* Left text column */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                maxWidth: "1100px",
              }}
              className="studio-trusted-text-column"
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
                  fontSize: "26px",
                  lineHeight: "42px",
                  color: "#FFFFFF",
                  margin: 0,
                  fontFamily: "'Open Sans', sans-serif",
                  fontWeight: 400,
                }}
                className="studio-trusted-subtitle"
              >
                We're proud to be the go-to Houdini resource for both creators and clients across the industry.
              </p>
            </div>

            {/* Right button column */}
            <div style={{ flexShrink: 0 }} className="studio-trusted-btn-container">
              <Link
                href="/contact?source=TrustedByStudios"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "231px",
                  height: "74px",
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0px 2px 5px 0px rgba(0, 0, 0, 0.25)",
                  borderRadius: "50px",
                  color: "#D93829",
                  fontSize: "22px",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "transform 0.2s ease, background-color 0.2s ease",
                }}
                className="studio-trusted-btn"
              >
                Contact Now
              </Link>
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
        }
      `}</style>
    </div>
  );
}
