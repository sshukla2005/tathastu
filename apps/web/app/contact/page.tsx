import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import CtaBand from "@/components/sections/CtaBand";
import Testimonials from "@/components/sections/Testimonials";
import ClientLogos from "@/components/sections/ClientLogos";
import { fetchStrapi } from "@/lib/api";
import {
  SiteSettings,
  Industry,
  CtaBandSection,
  TestimonialsSection,
  ClientLogosSection,
} from "@tathastu/types";
import ContactForm from "./ContactForm";

const CONTACT_CTA_SECTION: CtaBandSection = {
  __component: "sections.cta-band",
  id: 1,
  heading: "Design Support for All Your Creative Needs",
  subtext:
    "Get a free introduction and discover how you and your team can change the way your source design forever",
  ctaLabel: "Request Demo",
  ctaHref: "/contact?source=Demo",
};

const CONTACT_TESTIMONIALS_SECTION: TestimonialsSection = {
  __component: "sections.testimonials",
  id: 1,
  heading: "",
  subtitle: "Trusted by customers, backed by results.",
  testimonials: [
    {
      id: 1,
      documentId: "contact-testimonial-1",
      quote:
        "Tathastu Techno Solution offers reliable and efficient software services. Their professionalism and commitment to our needs have been commendable.",
      authorName: "Keitan Yadav",
      authorTitle: "Chief Operating Officer",
      company: "Redchillies.vfx",
      avatar: null,
      order: 1,
    },
    {
      id: 2,
      documentId: "contact-testimonial-2",
      quote:
        "Tathastu Techno Solution has been a valued partner since 2018. Chetan and his team consistently demonstrate deep expertise and a keen understanding of our needs.",
      authorName: "Anisha Karthik",
      authorTitle: "CEO",
      company: "PIXADOO",
      avatar: null,
      order: 2,
    },
  ],
};

const CONTACT_CLIENT_LOGOS_SECTION: ClientLogosSection = {
  __component: "sections.client-logos",
  id: 1,
  logos: [
    {
      id: 1,
      documentId: "contact-logo-hp",
      name: "HP",
      logo: null,
      url: "#",
      order: 1,
    },
    {
      id: 2,
      documentId: "contact-logo-adobe",
      name: "Adobe",
      logo: null,
      url: "#",
      order: 2,
    },
    {
      id: 3,
      documentId: "contact-logo-sidefx",
      name: "SideFX",
      logo: null,
      url: "#",
      order: 3,
    },
    {
      id: 4,
      documentId: "contact-logo-dell",
      name: "Dell",
      logo: null,
      url: "#",
      order: 4,
    },
  ],
};

export const revalidate = 60;

export async function generateMetadata() {
  return {
    title: "Contact Us — Tathastu",
    description:
      "Get in touch with our team for consultations, hardware sizing, plugin configurations, or training inquiries.",
  };
}

export default async function ContactPage() {
  const [settingsRes, industriesRes] = await Promise.all([
    fetchStrapi<{ data: SiteSettings }>(
      "/site-setting?populate[nav][populate]=*&populate[footerColumns][populate]=*&populate[socialLinks][populate]=*&populate[logo][populate]=*",
    ),
    fetchStrapi<{ data: Industry[] }>("/industries?sort=order:asc"),
  ]);

  const siteSettings = settingsRes?.data;
  const industries = industriesRes?.data || [];
  if (!siteSettings) return null;

  return (
    <>
      <Header siteSettings={siteSettings} industries={industries} />

      <main style={{ flexGrow: 1 }}>
        {/* ── 1. HERO — bg image + Contact Us + breadcrumb ── */}
        <section
          style={{
            position: "relative",
            minHeight: "280px",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <img
              src="/images/what-we-do/hero-bg.png"
              alt=""
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
              position: "absolute",
              inset: 0,
              background: "rgba(10,10,30,0.65)",
              zIndex: 1,
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 10,
              textAlign: "center",
              color: "#FFFFFF",
              padding: "80px 24px",
            }}
          >
            <h1
              style={{
                fontSize: "clamp(36px, 5vw, 56px)",
                fontWeight: 800,
                margin: "0 0 16px 0",
                fontFamily: "'Open Sans', sans-serif",
              }}
            >
              Contact <span style={{ color: "#4B95FF" }}>Us</span>
            </h1>
            <p
              style={{
                fontSize: "16px",
                color: "#CCCCCC",
                margin: 0,
                fontFamily: "'Open Sans', sans-serif",
              }}
            >
              <Link
                href="/"
                style={{ color: "#CCCCCC", textDecoration: "none" }}
              >
                Home
              </Link>
              {" / "}
              <span style={{ color: "#FFFFFF" }}>Contact Us</span>
            </p>
          </div>
        </section>

        {/* ── 2. FORM SECTION ── */}
        <section
          style={{
            position: "relative",
            overflow: "hidden",
            background: "linear-gradient(180deg, #EFF6FF 0%, #F2E9E3 100%)",
            padding: "80px",
          }}
          className="contact-form-section"
        >
          {/* Decorative concentric circles — bottom-left */}
          <div
            style={{
              position: "absolute",
              left: "-120px",
              bottom: "-180px",
              width: "500px",
              height: "500px",
              opacity: 0.35,
              zIndex: 0,
              pointerEvents: "none",
            }}
          >
            <img
              src="/images/studio/concentric-circles.svg"
              alt=""
              style={{ width: "100%", height: "100%" }}
            />
          </div>

          <div
            style={{
              position: "relative",
              zIndex: 10,
              maxWidth: "1280px",
              margin: "0 auto",
              background: "#FFFFFF",
              borderRadius: "16px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
              overflow: "hidden",
            }}
          >
            {/* Heading above form */}
            <div
              style={{ padding: "48px 56px 0 56px" }}
              className="contact-form-heading"
            >
              <h2
                style={{
                  fontSize: "clamp(24px, 3vw, 36px)",
                  fontWeight: 700,
                  color: "#0B0625",
                  margin: "0 0 8px 0",
                  fontFamily: "'Open Sans', sans-serif",
                }}
              >
                Start the <span style={{ color: "#4B95FF" }}>Conversation</span>
              </h2>
              <p
                style={{
                  fontSize: "15px",
                  color: "#777777",
                  margin: "0 0 40px 0",
                  fontFamily: "'Open Sans', sans-serif",
                }}
              >
                Clean and versatile for business or portfolio sites.
              </p>
            </div>

            {/* 2-col: form left, info right */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 420px",
                minHeight: "500px",
                alignItems: "start",
              }}
              className="contact-main-grid"
            >
              {/* Left — form */}
              <div
                style={{ padding: "0 56px 56px 56px" }}
                className="contact-form-col"
              >
                <ContactForm />
              </div>

              {/* Right — dark info card with bg image, ends flush with the message box bottom */}
              <div
                style={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "16px",
                  height: "582px",
                  margin: "0 24px 0 0",
                }}
                className="contact-info-col"
              >
                <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
                  <img
                    src="/images/blog/developer.jpg"
                    alt=""
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
                    position: "absolute",
                    inset: 0,
                    background: "rgba(5,10,30,0.82)",
                    zIndex: 1,
                  }}
                />
                <div
                  style={{
                    position: "relative",
                    zIndex: 10,
                    padding: "48px 36px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "36px",
                    height: "100%",
                  }}
                >
                  {[
                    {
                      icon: (
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#0B0625"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="2" y="4" width="20" height="16" rx="2" />
                          <path d="M22 6l-10 7L2 6" />
                        </svg>
                      ),
                      label: "Email",
                      value: "info@tathastu.global",
                    },
                    {
                      icon: (
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#0B0625"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.7 12.34 19.79 19.79 0 0 1 1.65 3.73 2 2 0 0 1 3.62 1.55h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.1a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" />
                        </svg>
                      ),
                      label: "Phone",
                      value: "+91 98201 92970",
                    },
                    {
                      icon: (
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#0B0625"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                      ),
                      label: "Business Hours",
                      value: "Monday to Saturday - 9.00am to 5.00pm IST",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "16px",
                      }}
                    >
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          background: "#FFFFFF",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <p
                          style={{
                            fontSize: "16px",
                            fontWeight: 700,
                            color: "#FFFFFF",
                            margin: "0 0 4px 0",
                            fontFamily: "'Open Sans', sans-serif",
                          }}
                        >
                          {item.label}
                        </p>
                        <p
                          style={{
                            fontSize: "14px",
                            color: "#AAAAAA",
                            margin: 0,
                            fontFamily: "'Open Sans', sans-serif",
                            lineHeight: "22px",
                          }}
                        >
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. CTA BAND — same shared component as homepage ── */}
        <CtaBand section={CONTACT_CTA_SECTION} />

        {/* ── 4. WORDS OF TRUST — same shared component as homepage ── */}
        <Testimonials section={CONTACT_TESTIMONIALS_SECTION} />

        {/* ── 5. CLIENT LOGOS — same shared component as homepage ── */}
        <ClientLogos section={CONTACT_CLIENT_LOGOS_SECTION} />
      </main>

      <Footer siteSettings={siteSettings} />
      <WhatsAppFAB />

      <style>{`
        .contact-main-grid { display: grid; grid-template-columns: 1fr 420px; }
        @media (max-width: 1024px) {
          .contact-form-section { padding: 60px 40px !important; }
          .contact-main-grid { grid-template-columns: 1fr !important; }
          .contact-info-col { border-radius: 0 0 16px 16px !important; min-height: 280px !important; height: auto !important; margin: 0 !important; }
          .contact-form-heading { padding: 40px 36px 0 36px !important; }
          .contact-form-col { padding: 0 36px 40px 36px !important; }
        }
        @media (max-width: 640px) {
          .contact-form-section { padding: 40px 20px !important; }
          .contact-form-heading { padding: 28px 24px 0 24px !important; }
          .contact-form-col { padding: 0 24px 32px 24px !important; }
        }
      `}</style>
    </>
  );
}
