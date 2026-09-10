import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import CtaBand from "@/components/sections/CtaBand";
import { fetchStrapi, getStrapiMediaUrl } from "@/lib/api";
import { SiteSettings, Industry, CtaBandSection, Course, IconTextItem } from "@tathastu/types";
import { Phone, Mail, Download } from "lucide-react";
import FaqSection from "./FaqSection";

export const revalidate = 60; // ISR 60s

const RED = "#E02020";
const COURSE_SLUG = "intro-to-houdini-fx";

const HOUDINI_POPULATE = [
  "populate[details][on][course-details.houdini][populate][introImage][populate]=*",
  "populate[details][on][course-details.houdini][populate][highlightsImage][populate]=*",
  "populate[details][on][course-details.houdini][populate][highlightPoints][populate]=*",
  "populate[details][on][course-details.houdini][populate][highlightFeatures][populate][icon][populate]=*",
  "populate[details][on][course-details.houdini][populate][whatYouGetItems][populate][icon][populate]=*",
  "populate[details][on][course-details.houdini][populate][whoForItems][populate][icon][populate]=*",
  "populate[details][on][course-details.houdini][populate][brochureFile][populate]=*",
  "populate[details][on][course-details.houdini][populate][faqs][populate]=*",
].join("&");

const ctaBandSection: CtaBandSection = {
  __component: "sections.cta-band",
  id: 1,
  heading: "Design Support for All Your Creative Needs",
  subtext:
    "Get a free introduction and discover how you and your team can change the way your source design forever.",
  ctaLabel: "Request Demo",
  ctaHref: "/contact?source=Demo&industry=academy-courses",
};

export async function generateMetadata() {
  try {
    const res = await fetchStrapi<{ data: Course[] }>(`/courses?filters[slug][$eq]=${COURSE_SLUG}`);
    const course = res?.data?.[0];
    return {
      title: "Houdini Course — Tathastu Academy",
      description:
        course?.description ||
        "Master the art of visual effects with Tathastu Academy's Houdini course — procedural workflows, dynamics, pyro, fluids, and production-ready simulations.",
    };
  } catch {
    return { title: "Houdini Course — Tathastu Academy" };
  }
}

// Small circular badge used for "What You Get" / highlight feature rows —
// shows an uploaded icon image, falls back to the emoji, falls back to a
// plain colored dot.
function IconBadge({ item, size = 56 }: { item: IconTextItem; size?: number }) {
  const iconUrl = getStrapiMediaUrl(item.icon?.url);
  const color = item.accentColor || RED;
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: size > 48 ? "14px" : "50%",
        background: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        overflow: "hidden",
      }}
    >
      {iconUrl ? (
        <img src={iconUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : item.emoji ? (
        <span style={{ fontSize: `${size * 0.45}px`, lineHeight: 1 }}>{item.emoji}</span>
      ) : null}
    </div>
  );
}

export default async function HoudiniCoursePage() {
  const [settingsRes, industriesRes, courseRes] = await Promise.all([
    fetchStrapi<{ data: SiteSettings }>(
      "/site-setting?populate[nav][populate]=*&populate[footerColumns][populate]=*&populate[socialLinks][populate]=*&populate[logo][populate]=*",
    ),
    fetchStrapi<{ data: Industry[] }>("/industries?sort=order:asc"),
    fetchStrapi<{ data: Course[] }>(`/courses?filters[slug][$eq]=${COURSE_SLUG}&${HOUDINI_POPULATE}`),
  ]);

  const siteSettings = settingsRes?.data;
  const industries = industriesRes?.data || [];
  const course = courseRes?.data?.[0];
  const details = course?.details?.find((d) => d.__component === "course-details.houdini");

  if (!siteSettings) return null;

  const introImage = getStrapiMediaUrl(details?.introImage?.url) || "/images/academy/program-studio.png";
  const highlightsImage = getStrapiMediaUrl(details?.highlightsImage?.url) || "/images/academy/program-advanced.png";
  const brochureUrl = getStrapiMediaUrl(details?.brochureFile?.url) || "/documents/houdini-course-brochure.pdf";

  return (
    <>
      <Header siteSettings={siteSettings} industries={industries} />

      <main style={{ flexGrow: 1 }}>
        {/* ── HERO — bg image + Houdini Course + breadcrumb ── */}
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
            <img src="/images/academy/hero-bg.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
          <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,30,0.68)", zIndex: 1 }} />
          <div style={{ position: "relative", zIndex: 10, textAlign: "center", color: "#FFFFFF", padding: "80px 24px" }}>
            <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 800, margin: "0 0 16px 0", fontFamily: "'Open Sans', sans-serif" }}>
              Houdini <span style={{ color: "#4B95FF" }}>Course</span>
            </h1>
            <p style={{ fontSize: "16px", color: "#CCCCCC", margin: 0, fontFamily: "'Open Sans', sans-serif" }}>
              <Link href="/" style={{ color: "#CCCCCC", textDecoration: "none" }}>
                Home
              </Link>
              {" / "}
              <Link href="/academy" style={{ color: "#CCCCCC", textDecoration: "none" }}>
                Academy
              </Link>
              {" / "}
              <Link href="/academy/courses&videos" style={{ color: "#CCCCCC", textDecoration: "none" }}>
                Courses & Videos
              </Link>
              {" / "}
              <span style={{ color: "#FFFFFF" }}>Details</span>
            </p>
          </div>
        </section>

        {details && (
          <>
            {/* ── Course intro ── */}
            <section
              className="hc-intro-section"
              style={{
                background: "radial-gradient(circle at 0% 100%, rgba(140,237,164,0.35) 0%, rgba(140,237,164,0) 42%), linear-gradient(135deg, #FFFFFF 40%, #FBEEE3 100%)",
                padding: "100px 80px",
              }}
            >
              <div className="hc-intro-grid" style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <h2 style={{ fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 800, color: "#0B0625", margin: 0, fontFamily: "'Open Sans', sans-serif" }}>
                    {details.introHeading} <span style={{ color: RED }}>{details.introHighlight}</span>
                  </h2>
                  {details.introParagraph1 && (
                    <p style={{ fontSize: "16px", lineHeight: "28px", color: "#444444", margin: 0, fontFamily: "'Open Sans', sans-serif" }}>{details.introParagraph1}</p>
                  )}
                  {details.introParagraph2 && (
                    <p style={{ fontSize: "16px", lineHeight: "28px", color: "#444444", margin: 0, fontFamily: "'Open Sans', sans-serif" }}>{details.introParagraph2}</p>
                  )}
                </div>
                <div style={{ borderRadius: "20px", overflow: "hidden", height: "340px", boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}>
                  <img src={introImage} alt="Houdini Course" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
              </div>
            </section>

            {/* ── Course Highlights — points / image / features ── */}
            <section className="hc-highlights-section" style={{ position: "relative", overflow: "hidden", background: "#FFFFFF", padding: "100px 80px" }}>
              <div
                style={{
                  position: "absolute",
                  top: "-80px",
                  left: "-80px",
                  width: "320px",
                  height: "320px",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(140,237,164,0.30) 0%, rgba(140,237,164,0) 70%)",
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "-60px",
                  right: "-60px",
                  width: "260px",
                  height: "260px",
                  borderRadius: "50%",
                  border: "40px solid rgba(224,32,32,0.04)",
                  boxShadow: "0 0 0 40px rgba(224,32,32,0.03), 0 0 0 80px rgba(224,32,32,0.02)",
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              />

              <div style={{ position: "relative", zIndex: 1, maxWidth: "1280px", margin: "0 auto" }}>
                <h2 style={{ fontSize: "clamp(28px, 3vw, 44px)", fontWeight: 800, color: "#0B0625", margin: "0 0 56px 0", textAlign: "center", fontFamily: "'Open Sans', sans-serif" }}>
                  {details.highlightsHeading} <span style={{ color: RED }}>{details.highlightsHighlight}</span>
                </h2>

                <div className="hc-highlights-grid">
                  {/* Left — key points with accent bar */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                    {(details.highlightPoints || []).map((point, idx) => (
                      <div key={point.id ?? idx} style={{ display: "flex", gap: "16px" }}>
                        <div style={{ width: "4px", borderRadius: "2px", background: RED, flexShrink: 0 }} />
                        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                          <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0B0625", margin: 0, lineHeight: 1.4, fontFamily: "'Open Sans', sans-serif" }}>{point.title}</h3>
                          <p style={{ fontSize: "13px", lineHeight: "22px", color: "#6B7280", margin: 0, fontFamily: "'Open Sans', sans-serif" }}>{point.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Center — image */}
                  <div style={{ borderRadius: "24px", overflow: "hidden", height: "380px", boxShadow: "0 20px 40px rgba(0,0,0,0.14)" }}>
                    <img src={highlightsImage} alt={details.highlightsHeading} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>

                  {/* Right — feature rows with icon */}
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {(details.highlightFeatures || []).map((feature, idx, arr) => (
                      <div
                        key={feature.id ?? idx}
                        style={{ display: "flex", gap: "16px", alignItems: "flex-start", padding: "16px 0", borderBottom: idx === arr.length - 1 ? "none" : "1px solid #F0F0F0" }}
                      >
                        <IconBadge item={feature} size={44} />
                        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                          <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0B0625", margin: 0, fontFamily: "'Open Sans', sans-serif" }}>{feature.title}</h3>
                          <p style={{ fontSize: "13px", lineHeight: "20px", color: "#6B7280", margin: 0, fontFamily: "'Open Sans', sans-serif" }}>{feature.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ── What You Get ── */}
            <section
              className="hc-getgrid-section"
              style={{
                position: "relative",
                overflow: "hidden",
                background: "radial-gradient(circle at 0% 100%, rgba(140,237,164,0.30) 0%, rgba(140,237,164,0) 40%), linear-gradient(120deg, #F3E7DE 0%, #FBEEE3 55%, #F6D9C4 100%)",
                padding: "100px 80px",
              }}
            >
              <div style={{ position: "absolute", top: "-40px", left: "-100px", width: "280px", height: "280px", borderRadius: "50%", border: "1px solid rgba(11,6,37,0.08)", pointerEvents: "none", zIndex: 0 }} />
              <div style={{ position: "absolute", top: "10px", left: "-60px", width: "180px", height: "180px", borderRadius: "50%", border: "1px solid rgba(11,6,37,0.08)", pointerEvents: "none", zIndex: 0 }} />

              <div style={{ position: "relative", zIndex: 1, maxWidth: "1280px", margin: "0 auto" }}>
                <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "12px", marginBottom: "56px" }}>
                  <h2 style={{ fontSize: "clamp(28px, 3vw, 44px)", fontWeight: 800, color: "#0B0625", margin: 0, fontFamily: "'Open Sans', sans-serif" }}>
                    What <span style={{ color: RED }}>You Get</span>
                  </h2>
                  {details.whatYouGetSubtitle && (
                    <p style={{ fontSize: "15px", color: "#555555", margin: 0, fontFamily: "'Open Sans', sans-serif" }}>{details.whatYouGetSubtitle}</p>
                  )}
                </div>

                <div className="hc-getgrid">
                  {(details.whatYouGetItems || []).map((item, idx) => (
                    <div
                      key={item.id ?? idx}
                      style={{
                        position: "relative",
                        background: `${item.accentColor || RED}0F`,
                        borderRadius: "16px",
                        padding: "32px 24px 28px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        gap: "12px",
                        overflow: "hidden",
                      }}
                    >
                      <IconBadge item={item} size={56} />
                      <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#0B0625", margin: 0, fontFamily: "'Open Sans', sans-serif" }}>{item.title}</h3>
                      <p style={{ fontSize: "13px", lineHeight: "20px", color: "#6B7280", margin: 0, fontFamily: "'Open Sans', sans-serif" }}>{item.text}</p>
                      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "4px", background: item.accentColor || RED }} />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── Who Is This Course For? ── */}
            <section className="hc-whofor-section" style={{ position: "relative", overflow: "hidden", background: "#FFFFFF", padding: "100px 80px" }}>
              <div
                style={{
                  position: "absolute",
                  top: "-60px",
                  left: "-100px",
                  width: "340px",
                  height: "340px",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(140,237,164,0.35) 0%, rgba(140,237,164,0) 70%)",
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "-80px",
                  right: "-80px",
                  width: "280px",
                  height: "280px",
                  borderRadius: "50%",
                  border: "40px solid rgba(11,6,37,0.03)",
                  boxShadow: "0 0 0 40px rgba(11,6,37,0.02), 0 0 0 80px rgba(11,6,37,0.015)",
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              />

              <div style={{ position: "relative", zIndex: 1, maxWidth: "1280px", margin: "0 auto" }}>
                <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "12px", marginBottom: "56px" }}>
                  <h2 style={{ fontSize: "clamp(28px, 3vw, 44px)", fontWeight: 800, color: "#0B0625", margin: 0, fontFamily: "'Open Sans', sans-serif" }}>
                    {details.whoForHeading}
                  </h2>
                  {details.whoForSubtitle && (
                    <p style={{ fontSize: "15px", color: "#555555", margin: 0, fontFamily: "'Open Sans', sans-serif" }}>{details.whoForSubtitle}</p>
                  )}
                </div>

                <div className="hc-whofor-grid">
                  {(details.whoForItems || []).map((item, idx) => {
                    const iconUrl = getStrapiMediaUrl(item.icon?.url);
                    return (
                      <div key={item.id ?? idx} style={{ background: `${item.accentColor || RED}14`, borderRadius: "16px", padding: "28px 24px", display: "flex", flexDirection: "column", gap: "16px" }}>
                        {iconUrl ? (
                          <img src={iconUrl} alt="" style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "8px" }} />
                        ) : (
                          <span style={{ fontSize: "40px", lineHeight: 1 }}>{item.emoji}</span>
                        )}
                        <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#0B0625", margin: 0, fontFamily: "'Open Sans', sans-serif" }}>{item.title}</h3>
                        <p style={{ fontSize: "13px", lineHeight: "20px", color: "#6B7280", margin: 0, fontFamily: "'Open Sans', sans-serif" }}>{item.text}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* ── Visit Center strip ── */}
            <section className="hc-visit-section" style={{ background: "#F3E7DE", padding: "72px 80px" }}>
              <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
                <div className="hc-visit-card" style={{ background: "linear-gradient(120deg, #FFFFFF 45%, #FBEEE3 100%)", borderRadius: "20px", padding: "56px 48px", boxShadow: "0 20px 40px rgba(0,0,0,0.06)" }}>
                  <h3 style={{ fontSize: "clamp(20px, 2.2vw, 26px)", fontWeight: 800, color: "#0B0625", margin: "0 0 4px 0", fontFamily: "'Open Sans', sans-serif" }}>
                    {details.visitHeading}
                  </h3>
                  <p style={{ fontSize: "13px", fontWeight: 700, color: RED, margin: "0 0 16px 0", fontFamily: "'Open Sans', sans-serif" }}>{details.visitSubheading}</p>

                  <div className="hc-visit-row">
                    {details.visitPhone && (
                      <div style={{ display: "flex", alignItems: "center", gap: "14px", background: "#FFFFFF", border: "1px solid #ECECEC", borderRadius: "12px", padding: "8px 16px" }}>
                        <Phone size={20} color="#4B95FF" strokeWidth={2} />
                        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                          <span style={{ fontSize: "14px", fontWeight: 700, color: "#0B0625", fontFamily: "'Open Sans', sans-serif" }}>Call</span>
                          <a href={`tel:${details.visitPhone.replace(/\s+/g, "")}`} style={{ fontSize: "13px", color: "#6B7280", textDecoration: "none", fontFamily: "'Open Sans', sans-serif" }}>
                            {details.visitPhone}
                          </a>
                        </div>
                      </div>
                    )}

                    {details.visitEmail && (
                      <div style={{ display: "flex", alignItems: "center", gap: "14px", background: "#FFFFFF", border: "1px solid #ECECEC", borderRadius: "12px", padding: "8px 16px" }}>
                        <Mail size={20} color="#4B95FF" strokeWidth={2} />
                        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                          <span style={{ fontSize: "14px", fontWeight: 700, color: "#0B0625", fontFamily: "'Open Sans', sans-serif" }}>Email</span>
                          <a href={`mailto:${details.visitEmail}`} style={{ fontSize: "13px", color: "#6B7280", textDecoration: "none", fontFamily: "'Open Sans', sans-serif" }}>
                            {details.visitEmail}
                          </a>
                        </div>
                      </div>
                    )}

                    <a
                      href={brochureUrl}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        background: "linear-gradient(90deg, #F2650C 0%, #F0592B 100%)",
                        borderRadius: "12px",
                        padding: "8px 28px",
                        color: "#FFFFFF",
                        fontSize: "14px",
                        fontWeight: 700,
                        textDecoration: "none",
                        whiteSpace: "nowrap",
                        fontFamily: "'Open Sans', sans-serif",
                      }}
                    >
                      Download Brochure
                      <Download size={16} color="#FFFFFF" strokeWidth={2} />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <FaqSection heading={details.faqsHeading} headingHighlight={details.faqsHighlight} faqs={details.faqs || []} />
          </>
        )}

        <CtaBand section={ctaBandSection} />
      </main>

      <Footer siteSettings={siteSettings} />
      <WhatsAppFAB />

      <style>{`
        .hc-highlights-grid { display: grid; grid-template-columns: 1fr 380px 1fr; gap: 48px; align-items: center; }
        .hc-getgrid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .hc-whofor-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
        .hc-visit-row { display: flex; gap: 16px; align-items: stretch; }
        .hc-visit-row > div { flex: 1; }
        .hc-visit-row > a { flex: 0 0 auto; }
        @media (max-width: 1024px) {
          .hc-intro-section { padding: 60px 40px !important; }
          .hc-intro-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .hc-highlights-section { padding: 60px 40px !important; }
          .hc-highlights-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .hc-getgrid-section { padding: 60px 40px !important; }
          .hc-getgrid { grid-template-columns: repeat(2, 1fr) !important; }
          .hc-whofor-section { padding: 60px 40px !important; }
          .hc-whofor-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .hc-visit-section { padding: 48px 40px !important; }
          .hc-visit-card { padding: 32px !important; }
        }
        @media (max-width: 640px) {
          .hc-intro-section { padding: 40px 20px !important; }
          .hc-highlights-section { padding: 40px 20px !important; }
          .hc-getgrid-section { padding: 40px 20px !important; }
          .hc-getgrid { grid-template-columns: 1fr !important; }
          .hc-whofor-section { padding: 40px 20px !important; }
          .hc-whofor-grid { grid-template-columns: 1fr !important; }
          .hc-visit-section { padding: 32px 20px !important; }
          .hc-visit-card { padding: 24px !important; }
          .hc-visit-row { flex-direction: column !important; }
          .hc-visit-row > a { width: 100%; }
        }
      `}</style>
    </>
  );
}
