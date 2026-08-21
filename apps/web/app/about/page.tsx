import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import StatsBand from "@/components/sections/StatsBand";
import Testimonials from "@/components/sections/Testimonials";
import { fetchStrapi } from "@/lib/api";
import { SiteSettings, Industry, StatsBandSection, TestimonialsSection } from "@tathastu/types";

const ABOUT_STATS_SECTION: StatsBandSection = {
  __component: "sections.stats-band",
  id: 1,
  heading: "",
  stats: [
    { id: 1, documentId: "about-stat-1", value: "20+", label: "Number of Hardwares", order: 1 },
    { id: 2, documentId: "about-stat-2", value: "80+", label: "Number of Plugins", order: 2 },
    { id: 3, documentId: "about-stat-3", value: "4100+", label: "Clients Served", order: 3 },
  ],
};

const ABOUT_TESTIMONIALS_SECTION: TestimonialsSection = {
  __component: "sections.testimonials",
  id: 1,
  heading: "",
  subtitle: "Trusted by customers, backed by results.",
  testimonials: [
    {
      id: 1,
      documentId: "about-testimonial-1",
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
      documentId: "about-testimonial-2",
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

export const revalidate = 60;

export async function generateMetadata() {
  return {
    title: "About Us — Tathastu Techno Solution",
    description:
      "Learn about Tathastu Techno Solution — India's leading reseller and technical integration partner for creative industries.",
  };
}

export default async function AboutPage() {
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
        {/* ── 1. HERO — bg image + About Us + breadcrumb ── */}
        <section
          style={{
            position: "relative",
            minHeight: "320px",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <img
              src="/images/what-we-do/media-entertainment.jpg"
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
              background: "rgba(10,10,30,0.68)",
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
              About <span style={{ color: "#4B95FF" }}>Us</span>
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
              <span style={{ color: "#FFFFFF" }}>About Us</span>
            </p>
          </div>
        </section>

        {/* ── 2. EMPOWERING INDUSTRIES — 2 col ── */}
        <section
          style={{ background: "#FFFFFF", padding: "100px 80px" }}
          className="about-empower-section"
        >
          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "80px",
              alignItems: "center",
            }}
            className="about-empower-grid"
          >
            {/* Left text */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "24px" }}
            >
              <h2
                style={{
                  fontSize: "clamp(28px, 3vw, 44px)",
                  fontWeight: 800,
                  lineHeight: 1.2,
                  color: "#0B0625",
                  margin: 0,
                  fontFamily: "'Open Sans', sans-serif",
                }}
              >
                Empowering Industries with{" "}
                <span style={{ color: "#4B95FF" }}>
                  Tailored Software Solutions
                </span>
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  lineHeight: "28px",
                  color: "#444444",
                  margin: 0,
                  fontFamily: "'Open Sans', sans-serif",
                }}
              >
                At Tathastu, we deliver cutting-edge software and hardware
                solutions for the media, entertainment, architecture, and
                education industries. We support animation studios, VFX artists,
                architects, broadcasters, and freelancers with advanced
                technologies that enhance creativity, productivity, and digital
                experiences.
              </p>
              <p
                style={{
                  fontSize: "16px",
                  lineHeight: "28px",
                  color: "#444444",
                  margin: 0,
                  fontFamily: "'Open Sans', sans-serif",
                }}
              >
                Our portfolio includes industry-leading software from Maxon,
                Vectorworks, Boris FX, Adobe, Corona Renderer, Enscape 3D, and
                more, along with high-performance hardware solutions from HP,
                HPE, Dell, and Huion to power your creative workflows.
              </p>
            </div>
            {/* Right hexagon image */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "340px",
                  height: "340px",
                }}
              >
                {/* Hexagon clip via border-radius trick */}
                <div
                  style={{
                    width: "300px",
                    height: "300px",
                    borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
                    overflow: "hidden",
                    border: "4px solid #4B95FF",
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  <img
                    src="/images/what-we-do/architecture-design.jpg"
                    alt="Software solutions"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
                {/* Concentric circles bg decoration */}
                {/* <div
                  style={{
                    position: "absolute",
                    right: "-20px",
                    top: "20px",
                    width: "280px",
                    height: "280px",
                    borderRadius: "50%",
                    border: "1px solid rgba(75,149,255,0.2)",
                    zIndex: 1,
                  }}
                /> */}
                {/* <div
                  style={{
                    position: "absolute",
                    right: "-50px",
                    top: "-10px",
                    width: "340px",
                    height: "340px",
                    borderRadius: "50%",
                    border: "1px solid rgba(75,149,255,0.1)",
                    zIndex: 1,
                  }}
                /> */}
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. WHY CHOOSE US — 4 cards ── */}
        <section
          style={{ background: "#F7F8FA", padding: "100px 80px" }}
          className="about-why-section"
        >
          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "56px",
            }}
          >
            <div
              style={{
                textAlign: "center",
                maxWidth: "700px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <h2
                style={{
                  fontSize: "clamp(28px, 3vw, 44px)",
                  fontWeight: 800,
                  color: "#0B0625",
                  margin: 0,
                  fontFamily: "'Open Sans', sans-serif",
                }}
              >
                Why <span style={{ color: "#4B95FF" }}>Choose Us?</span>
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  lineHeight: "26px",
                  color: "#555555",
                  margin: 0,
                  fontFamily: "'Open Sans', sans-serif",
                }}
              >
                Your Partner in Success—Combining Expertise, Innovation, and
                Unmatched Support to Provide Solutions That Help Your Business
                Thrive.
              </p>
            </div>
            <div className="about-why-grid">
              {[
                {
                  img: "/images/why-choose-us/innovation.png",
                  title: "Innovation",
                  desc: "We deliver innovative tech solutions to help you deliver great results while managing your overall costs.",
                },
                {
                  img: "/images/why-choose-us/client-focus.png",
                  title: "Client Focus",
                  desc: "Doesn't matter how big or small your business is, Customer is always at the heart of our operations.",
                },
                {
                  img: "/images/why-choose-us/expertise.png",
                  title: "Expertise",
                  desc: "Rely exclusively on our professionals expertise for the best offers and solutions with their vast industry knowledge.",
                },
                {
                  img: "/images/why-choose-us/reliability.png",
                  title: "Reliability",
                  desc: "Dependable and consistent solutions, ensuring quality results and trustworthiness every time.",
                },
              ].map((card, idx) => (
                <div
                  key={idx}
                  className={`about-why-card${idx === 1 ? " about-why-card-active" : ""}`}
                >
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      margin: "0 auto 20px",
                    }}
                  >
                    <img
                      src={card.img}
                      alt={card.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#0B0625",
                      margin: "0 0 12px 0",
                      textAlign: "center",
                      fontFamily: "'Open Sans', sans-serif",
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: "22px",
                      color: "#666666",
                      margin: 0,
                      textAlign: "center",
                      fontFamily: "'Open Sans', sans-serif",
                    }}
                  >
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. STATS BAND — same shared component as homepage ── */}
        <StatsBand section={ABOUT_STATS_SECTION} />

        {/* ── 5. WORDS OF TRUST — same shared component as homepage ── */}
        <Testimonials section={ABOUT_TESTIMONIALS_SECTION} />

        {/* ── 6. CLIENT LOGOS ── */}
        <section
          style={{ background: "#F7F8FA", padding: "60px 80px" }}
          className="about-logos-section"
        >
          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "48px",
              flexWrap: "wrap",
            }}
            className="about-logos-row"
          >
            {[
              { src: "/images/clients/hp.svg", alt: "HP" },
              { src: "/images/clients/adobe.svg", alt: "Adobe" },
              { src: "/images/clients/sidefx.svg", alt: "SideFX" },
              { src: "/images/clients/dell.svg", alt: "Dell" },
            ].map((logo, idx) => (
              <div
                key={idx}
                style={{
                  height: "48px",
                  display: "flex",
                  alignItems: "center",
                  filter: "grayscale(100%)",
                  opacity: 0.7,
                  transition: "opacity 0.2s, filter 0.2s",
                }}
                className="about-logo-item"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  style={{
                    height: "100%",
                    width: "auto",
                    objectFit: "contain",
                  }}
                />
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer siteSettings={siteSettings} />
      <WhatsAppFAB />

      <style>{`
        .about-empower-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .about-why-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; width: 100%; }
        .about-why-card {
          background: #FFFFFF;
          border: 1.5px solid #E8E8E8;
          border-radius: 12px;
          padding: 40px 24px;
          transition: box-shadow 0.3s, border-color 0.3s;
        }
        .about-why-card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.08);border-color: #4B95FF;
          box-shadow: 0 4px 20px rgba(75,149,255,0.15); }
        .about-logo-item:hover { filter: grayscale(0%) !important; opacity: 1 !important; }
        @media (max-width: 1024px) {
          .about-empower-section { padding: 60px 40px !important; }
          .about-empower-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .about-why-section { padding: 60px 40px !important; }
          .about-why-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .about-logos-section { padding: 40px 40px !important; }
        }
        @media (max-width: 640px) {
          .about-empower-section { padding: 40px 20px !important; }
          .about-why-section { padding: 40px 20px !important; }
          .about-why-grid { grid-template-columns: 1fr !important; }
          .about-logos-section { padding: 30px 20px !important; }
          .about-logos-row { gap: 28px !important; }
        }
      `}</style>
    </>
  );
}
