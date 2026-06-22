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
                    height: "470px",
                    borderRadius: "50%",
                    border: "4px solid #D61814",
                    overflow: "hidden",
                    boxShadow: "0px 10px 30px rgba(214, 24, 20, 0.3)",
                  }}
                  className="studio-ellipse-container"
                >
                  <Image
                    src="/images/studio/hero-right.png"
                    alt="Houdini VFX illustration"
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                  />
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
          }
        }
      `}</style>
    </div>
  );
}
