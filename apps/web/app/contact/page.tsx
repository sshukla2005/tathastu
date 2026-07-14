import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import { fetchStrapi } from "@/lib/api";
import { SiteSettings, Industry } from "@tathastu/types";
import ContactForm from "./ContactForm";

export const revalidate = 60;

export async function generateMetadata() {
  return {
    title: "Contact Us — Tathastu",
    description: "Get in touch with our team for consultations, hardware sizing, plugin configurations, or training inquiries.",
  };
}

export default async function ContactPage() {
  const [settingsRes, industriesRes] = await Promise.all([
    fetchStrapi<{ data: SiteSettings }>("/site-setting?populate[nav][populate]=*&populate[footerColumns][populate]=*&populate[socialLinks][populate]=*&populate[logo][populate]=*"),
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
        <section style={{ position: "relative", minHeight: "280px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <img src="/images/what-we-do/hero-bg.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
          <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,30,0.65)", zIndex: 1 }} />
          <div style={{ position: "relative", zIndex: 10, textAlign: "center", color: "#FFFFFF", padding: "80px 24px" }}>
            <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 800, margin: "0 0 16px 0", fontFamily: "'Open Sans', sans-serif" }}>
              Contact <span style={{ color: "#4B95FF" }}>Us</span>
            </h1>
            <p style={{ fontSize: "16px", color: "#CCCCCC", margin: 0, fontFamily: "'Open Sans', sans-serif" }}>
              <Link href="/" style={{ color: "#CCCCCC", textDecoration: "none" }}>Home</Link>
              {" / "}
              <span style={{ color: "#FFFFFF" }}>Contact Us</span>
            </p>
          </div>
        </section>

        {/* ── 2. FORM SECTION ── */}
        <section style={{ background: "#F5F0EB", padding: "80px" }} className="contact-form-section">
          <div style={{ maxWidth: "1280px", margin: "0 auto", background: "#FFFFFF", borderRadius: "16px", boxShadow: "0 4px 24px rgba(0,0,0,0.07)", overflow: "hidden" }}>

            {/* Heading above form */}
            <div style={{ padding: "48px 56px 0 56px" }} className="contact-form-heading">
              <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: "#0B0625", margin: "0 0 8px 0", fontFamily: "'Open Sans', sans-serif" }}>
                Start the <span style={{ color: "#4B95FF" }}>Conversation</span>
              </h2>
              <p style={{ fontSize: "15px", color: "#777777", margin: "0 0 40px 0", fontFamily: "'Open Sans', sans-serif" }}>
                Clean and versatile for business or portfolio sites.
              </p>
            </div>

            {/* 2-col: form left, info right */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", minHeight: "500px" }} className="contact-main-grid">

              {/* Left — form */}
              <div style={{ padding: "0 56px 56px 56px" }} className="contact-form-col">
                <ContactForm />
              </div>

              {/* Right — dark info card with bg image */}
              <div style={{ position: "relative", overflow: "hidden", borderRadius: "0 0 16px 0" }} className="contact-info-col">
                <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
                  <img src="/images/what-we-do/education-training.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
                <div style={{ position: "absolute", inset: 0, background: "rgba(5,10,30,0.82)", zIndex: 1 }} />
                <div style={{ position: "relative", zIndex: 10, padding: "48px 36px", display: "flex", flexDirection: "column", gap: "36px", height: "100%" }}>
                  {[
                    {
                      icon: (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4B95FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 6l-10 7L2 6" />
                        </svg>
                      ),
                      label: "Email",
                      value: "info@tathastu.global",
                    },
                    {
                      icon: (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4B95FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.7 12.34 19.79 19.79 0 0 1 1.65 3.73 2 2 0 0 1 3.62 1.55h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.1a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z" />
                        </svg>
                      ),
                      label: "Phone",
                      value: "+91 98201 92970",
                    },
                    {
                      icon: (
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4B95FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                        </svg>
                      ),
                      label: "Business Hours",
                      value: "Monday to Saturday - 9.00am to 5.00pm IST",
                    },
                  ].map((item, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                      <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(75,149,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {item.icon}
                      </div>
                      <div>
                        <p style={{ fontSize: "16px", fontWeight: 700, color: "#FFFFFF", margin: "0 0 4px 0", fontFamily: "'Open Sans', sans-serif" }}>{item.label}</p>
                        <p style={{ fontSize: "14px", color: "#AAAAAA", margin: 0, fontFamily: "'Open Sans', sans-serif", lineHeight: "22px" }}>{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. CTA BAND — Design Support ── */}
        <section style={{ position: "relative", overflow: "hidden", padding: "80px", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "220px" }} className="contact-cta-section">
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <img src="/images/what-we-do/manufacturing.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
          <div style={{ position: "absolute", inset: 0, background: "rgba(5,10,30,0.78)", zIndex: 1 }} />
          <div style={{ position: "relative", zIndex: 10, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
            <h2 style={{ fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 700, color: "#FFFFFF", margin: 0, fontFamily: "'Open Sans', sans-serif" }}>
              Design Support for All Your Creative Needs
            </h2>
            <p style={{ fontSize: "16px", color: "#CCCCCC", margin: 0, fontFamily: "'Open Sans', sans-serif", maxWidth: "600px", lineHeight: "26px" }}>
              Get a free introduction and discover how you and your team can change the way your source design forever
            </p>
            <Link
              href="/contact?source=Demo"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "14px 36px",
                background: "linear-gradient(90deg, #1d385e 0%, #4b95ff 100%)",
                borderRadius: "50px",
                color: "#FFFFFF",
                fontSize: "16px",
                fontWeight: 600,
                textDecoration: "none",
                marginTop: "8px",
                transition: "opacity 0.2s ease",
              }}
              className="contact-demo-btn"
            >
              Request Demo
            </Link>
          </div>
        </section>

        {/* ── 4. WORDS OF TRUST — Testimonials ── */}
        <section style={{ background: "#FFFFFF", padding: "100px 80px" }} className="contact-testimonials-section">
          <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "48px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "24px" }}>
              <div>
                <h2 style={{ fontSize: "clamp(28px, 3vw, 44px)", fontWeight: 800, color: "#0B0625", margin: "0 0 8px 0", fontFamily: "'Open Sans', sans-serif" }}>
                  Words Of <span style={{ color: "#4B95FF" }}>Trust</span>
                </h2>
                <p style={{ fontSize: "16px", color: "#555555", margin: 0, fontFamily: "'Open Sans', sans-serif" }}>Trusted by customers, backed by results.</p>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button aria-label="Previous" style={{ width: "44px", height: "44px", border: "1.5px solid #0B0625", borderRadius: "4px", background: "#FFFFFF", cursor: "pointer", fontSize: "20px" }}>‹</button>
                <button aria-label="Next" style={{ width: "44px", height: "44px", border: "1.5px solid #0B0625", borderRadius: "4px", background: "#FFFFFF", cursor: "pointer", fontSize: "20px" }}>›</button>
              </div>
            </div>
            <div className="contact-testimonials-grid">
              {[
                {
                  avatar: "/images/testimonials/keitan-yadav.jpg",
                  name: "Keitan Yadav",
                  role: "Chief Operating Officer · Redchillies.vfx",
                  stars: 4,
                  quote: "Tathastu Techno Solution offers reliable and efficient software services. Their professionalism and commitment to our needs have been commendable.",
                },
                {
                  avatar: "/images/testimonials/anisha-karthik.jpg",
                  name: "Anisha Karthik",
                  role: "CEO · PIXADOO",
                  stars: 4,
                  quote: "Tathastu Techno Solution has been a valued partner since 2018. Chetan and his team consistently demonstrate deep expertise and a keen understanding of our needs.",
                },
              ].map((t, idx) => (
                <div key={idx} className="contact-testimonial-card">
                  <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
                    <div style={{ width: "52px", height: "52px", borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
                      <img src={t.avatar} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div>
                      <p style={{ fontSize: "16px", fontWeight: 700, color: "#0B0625", margin: "0 0 2px 0", fontFamily: "'Open Sans', sans-serif" }}>{t.name}</p>
                      <p style={{ fontSize: "13px", color: "#777777", margin: 0, fontFamily: "'Open Sans', sans-serif" }}>{t.role}</p>
                    </div>
                    <div style={{ marginLeft: "auto", color: "#F59E0B", fontSize: "18px" }}>{"★".repeat(t.stars)}{"☆".repeat(5 - t.stars)}</div>
                  </div>
                  <p style={{ fontSize: "15px", lineHeight: "24px", color: "#444444", margin: 0, fontFamily: "'Open Sans', sans-serif" }}>{t.quote}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. CLIENT LOGOS ── */}
        <section style={{ background: "#F7F8FA", padding: "60px 80px" }} className="contact-logos-section">
          <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", justifyContent: "center", alignItems: "center", gap: "48px", flexWrap: "wrap" }}>
            {[
              { src: "/images/clients/hp.svg", alt: "HP" },
              { src: "/images/clients/adobe.svg", alt: "Adobe" },
              { src: "/images/clients/sidefx.svg", alt: "SideFX" },
              { src: "/images/clients/dell.svg", alt: "Dell" },
            ].map((logo, idx) => (
              <div key={idx} style={{ height: "48px", display: "flex", alignItems: "center", filter: "grayscale(100%)", opacity: 0.7, transition: "opacity 0.2s, filter 0.2s" }} className="contact-logo-item">
                <img src={logo.src} alt={logo.alt} style={{ height: "100%", width: "auto", objectFit: "contain" }} />
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer siteSettings={siteSettings} />
      <WhatsAppFAB />

      <style>{`
        .contact-main-grid { display: grid; grid-template-columns: 1fr 420px; }
        .contact-testimonials-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
        .contact-testimonial-card {
          background: #FFFFFF;
          border: 1.5px solid #E8E8E8;
          border-radius: 16px;
          padding: 32px;
          position: relative;
        }
        .contact-testimonial-card::before {
          content: '"';
          position: absolute;
          top: 16px;
          right: 24px;
          font-size: 80px;
          color: #4B95FF;
          opacity: 0.12;
          font-family: Georgia, serif;
          line-height: 1;
        }
        .contact-demo-btn:hover { opacity: 0.9; }
        .contact-logo-item:hover { filter: grayscale(0%) !important; opacity: 1 !important; }
        @media (max-width: 1024px) {
          .contact-form-section { padding: 60px 40px !important; }
          .contact-main-grid { grid-template-columns: 1fr !important; }
          .contact-info-col { border-radius: 0 0 16px 16px !important; min-height: 280px !important; }
          .contact-form-heading { padding: 40px 36px 0 36px !important; }
          .contact-form-col { padding: 0 36px 40px 36px !important; }
          .contact-cta-section { padding: 60px 40px !important; }
          .contact-testimonials-section { padding: 60px 40px !important; }
          .contact-testimonials-grid { grid-template-columns: 1fr !important; }
          .contact-logos-section { padding: 40px !important; }
        }
        @media (max-width: 640px) {
          .contact-form-section { padding: 40px 20px !important; }
          .contact-form-heading { padding: 28px 24px 0 24px !important; }
          .contact-form-col { padding: 0 24px 32px 24px !important; }
          .contact-cta-section { padding: 40px 20px !important; }
          .contact-testimonials-section { padding: 40px 20px !important; }
          .contact-logos-section { padding: 30px 20px !important; }
        }
      `}</style>
    </>
  );
}
