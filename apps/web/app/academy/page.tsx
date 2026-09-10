import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";

// Section Components
import AcademyHero from "@/components/sections/AcademyHero";
import AcademyAbout from "@/components/sections/AcademyAbout";
import AcademyPrograms from "@/components/sections/AcademyPrograms";
import AcademyWhyUs from "@/components/sections/AcademyWhyUs";
import AcademyCourses from "@/components/sections/AcademyCourses";
import AcademySpecialization from "@/components/sections/AcademySpecialization";
import AcademyMeetTeam from "@/components/sections/AcademyMeetTeam";
import CtaBand from "@/components/sections/CtaBand";

import { fetchStrapi } from "@/lib/api";
import { SiteSettings, Industry, AcademyPageSection } from "@tathastu/types";

const DARK = "#0D0D0D";

interface AcademyPageData {
  id: number;
  documentId: string;
  seoTitle: string;
  seoDescription: string;
  sections: AcademyPageSection[];
}

// Populate each dynamic-zone component explicitly so nested media/relations
// (e.g. feature icons, course images, team member photos) come back with
// the response.
const ACADEMY_POPULATE = [
  "populate[sections][on][sections.academy-hero][populate]=*",
  "populate[sections][on][sections.academy-about][populate][image][populate]=*",
  "populate[sections][on][sections.academy-about][populate][features][populate]=icon",
  "populate[sections][on][sections.academy-programs][populate][programs][populate][image][populate]=*",
  "populate[sections][on][sections.academy-programs][populate][programs][populate][items][populate]=*",
  "populate[sections][on][sections.academy-why-us][populate][cards][populate]=icon",
  "populate[sections][on][sections.academy-courses][populate][courses][populate][image][populate]=*",
  "populate[sections][on][sections.academy-courses][populate][courses][populate][details][populate]=*",
  "populate[sections][on][sections.academy-specialization][populate][backgroundImage][populate]=*",
  "populate[sections][on][sections.academy-specialization][populate][specializations][populate]=icon",
  "populate[sections][on][sections.academy-meet-team][populate][members][populate]=photo",
  "populate[sections][on][sections.cta-band][populate]=*",
].join("&");

export async function generateMetadata() {
  try {
    const academyPageRes = await fetchStrapi<{ data: AcademyPageData }>("/academy-page");
    if (academyPageRes?.data) {
      return {
        title: academyPageRes.data.seoTitle || "Tathastu Academy — Learn. Rise. Lead.",
        description:
          academyPageRes.data.seoDescription ||
          "Tathastu Academy bridges the gap between Houdini training and real-world studio production — building the next generation of VFX professionals through project-driven learning.",
      };
    }
  } catch (err) {
    console.error("Error generating academy page metadata:", err);
  }
  return {
    title: "Tathastu Academy — Learn. Rise. Lead.",
    description:
      "Tathastu Academy bridges the gap between Houdini training and real-world studio production — building the next generation of VFX professionals through project-driven learning.",
  };
}

export default async function AcademyPage() {
  const [settingsRes, industriesRes, academyPageRes] = await Promise.all([
    fetchStrapi<{ data: SiteSettings }>(
      "/site-setting?populate[nav][populate]=*&populate[footerColumns][populate]=*&populate[socialLinks][populate]=*&populate[logo][populate]=*",
    ),
    fetchStrapi<{ data: Industry[] }>("/industries?sort=order:asc"),
    fetchStrapi<{ data: AcademyPageData }>(`/academy-page?${ACADEMY_POPULATE}`),
  ]);

  const siteSettings = settingsRes?.data;
  const industries = industriesRes?.data || [];
  const academyPage = academyPageRes?.data;

  if (!siteSettings) return null;

  return (
    <>
      <Header siteSettings={siteSettings} industries={industries} />
      <div style={{ background: DARK, minHeight: "100vh", fontFamily: "'Open Sans', sans-serif" }}>
        {academyPage?.sections &&
          academyPage.sections.map((section, idx) => {
            switch (section.__component) {
              case "sections.academy-hero":
                return <AcademyHero key={idx} section={section} />;
              case "sections.academy-about":
                return <AcademyAbout key={idx} section={section} />;
              case "sections.academy-programs":
                return <AcademyPrograms key={idx} section={section} />;
              case "sections.academy-why-us":
                return <AcademyWhyUs key={idx} section={section} />;
              case "sections.academy-courses":
                return <AcademyCourses key={idx} section={section} />;
              case "sections.academy-specialization":
                return <AcademySpecialization key={idx} section={section} />;
              case "sections.academy-meet-team":
                return <AcademyMeetTeam key={idx} section={section} />;
              case "sections.cta-band":
                return <CtaBand key={idx} section={section} />;
              default:
                return (
                  <div key={idx} className="p-4 text-center bg-yellow-50 text-yellow-700 text-sm">
                    Unknown Component: {(section as any).__component}
                  </div>
                );
            }
          })}

        {/* Responsive overrides */}
        <style>{`
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track {
          animation: ticker-scroll 25s linear infinite;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
        .talk-us-btn:hover {
          background: #C22F22 !important;
          transform: translateY(-2px);
        }
        .program-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.35), 0 0 25px rgba(224,32,32,0.1) !important;
        }
        .program-btn:hover {
          background: #C22F22 !important;
        }
        .view-more-link:hover {
          background: #FDF2F2 !important;
          border-color: #E02020 !important;
        }
        .programs-viewport {
          width: 100%;
          overflow: hidden;
        }
        .programs-grid {
          display: flex;
          gap: 32px;
          transition: transform 0.4s ease;
        }
        .program-card-slide {
          flex: 0 0 calc((100% - 64px) / 3);
        }
        .programs-arrows {
          display: flex;
          justify-content: center;
          gap: 8px;
        }
        .programs-arrow-btn {
          width: 44px;
          height: 44px;
          border: 1.5px solid #E02020;
          border-radius: 4px;
          background: transparent;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Open Sans', sans-serif;
          font-size: 20px;
          color: #E02020;
          transition: background 0.2s, opacity 0.2s;
        }
        .programs-arrow-btn:hover:not(:disabled) {
          background: rgba(224,32,32,0.1);
        }
        .programs-arrow-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        .course-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.08) !important;
        }
        .read-more-link:hover {
          text-decoration: underline !important;
        }
        .talk-advisor-btn:hover {
          background: #C22F22 !important;
          transform: translateY(-2px);
        }
        .why-us-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.06) !important;
        }
        .spec-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.4) !important;
        }
        .meet-team-row {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 260px));
          justify-content: center;
          gap: 24px;
          width: 100%;
        }
        .meet-member-card {
          display: flex;
          flex-direction: column;
          width: 100%;
        }
        .meet-member-arch {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 460px;
          border-radius: 999px;
          overflow: hidden;
          position: relative;
        }
        .meet-member-info {
          flex-shrink: 0;
          padding: 56px 14px 12px;
          text-align: center;
        }
        .meet-member-name {
          font-size: 18px;
          font-weight: 700;
          color: #000000;
          margin: 0;
          font-family: 'Open Sans', sans-serif;
        }
        .meet-member-role {
          font-size: 13px;
          font-weight: 500;
          color: #555555;
          margin: 4px 0 0;
          font-family: 'Open Sans', sans-serif;
        }
        .meet-member-photo {
          position: relative;
          flex: 1 1 auto;
          min-height: 0;
        }
        .team-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.05) !important;
          border-color: rgba(217,56,41,0.15) !important;
        }
        .cta-btn-primary:hover {
          background: #C22F22 !important;
          transform: translateY(-2px);
        }
        .cta-btn-secondary:hover {
          background: rgba(255,255,255,0.08) !important;
          border-color: #FFFFFF !important;
          transform: translateY(-2px);
        }
        .contact-card:hover {
          transform: translateY(-4px);
          border-color: rgba(224, 32, 32, 0.25) !important;
        }
        .contact-link:hover {
          color: #FFFFFF !important;
          text-decoration: underline !important;
        }
        .footer-link-dark:hover {
          color: #D93829 !important;
          text-decoration: underline !important;
        }
        .social-icon-btn:hover {
          transform: translateY(-3px);
          background: #D93829 !important;
          border-color: #D93829 !important;
          box-shadow: 0 4px 12px rgba(217, 56, 41, 0.2) !important;
        }
        .social-icon-btn:hover .social-svg {
          fill: #FFFFFF !important;
          stroke: #FFFFFF !important;
        }
        @media (max-width: 1024px) {
          .academy-hero-grid {
            grid-template-columns: 1fr !important;
            padding: 100px 32px 60px !important;
          }
          .academy-hero-text-col {
            align-items: center !important;
            text-align: center !important;
          }
          .academy-hero-text-col > div:first-child {
            align-items: center !important;
          }
          .academy-hero-image-wrap {
            justify-self: center !important;
            margin: 0 auto !important;
          }
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 120px !important;
            padding: 0 16px !important;
          }
          .about-photo-wrap {
            height: auto !important;
          }
          .about-photo {
            height: auto !important;
            aspect-ratio: 4/5 !important;
          }
          .about-right-col {
            text-align: center !important;
          }
          .about-feature-card {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            gap: 12px !important;
          }
          .programs-container {
            padding: 100px 32px 100px !important;
          }
          .program-card-slide {
            flex: 0 0 calc((100% - 32px) / 2) !important;
          }
          .why-us-grid-right {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .courses-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .specialization-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
          }
          .meet-team-row {
            grid-template-columns: repeat(2, minmax(0, 200px)) !important;
            gap: 32px !important;
          }
          .meet-member-arch {
            height: 400px !important;
          }
          .meet-member-info {
            padding: 36px 14px 12px !important;
          }
          .team-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
            max-width: 450px !important;
            margin: 0 auto !important;
          }
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
            max-width: 450px !important;
            margin: 0 auto !important;
          }
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 640px) {
          .academy-section {
            padding-left: 24px !important;
            padding-right: 24px !important;
            padding-top: 80px !important;
            padding-bottom: 80px !important;
          }
          .cta-buttons-container {
            flex-direction: column !important;
            width: 100% !important;
            align-items: stretch !important;
            gap: 12px !important;
          }
          .cta-buttons-container a {
            justify-content: center !important;
            width: 100% !important;
          }
          .program-card-slide {
            flex: 0 0 100% !important;
          }
          .meet-team-row {
            grid-template-columns: repeat(2, minmax(0, 140px)) !important;
            gap: 20px !important;
          }
          .meet-member-arch {
            height: 300px !important;
          }
          .meet-member-info {
            padding: 48px 10px 8px !important;
          }
          .meet-member-name {
            font-size: 14px !important;
          }
          .meet-member-role {
            font-size: 11px !important;
            line-height: 15px !important;
          }
        }
      `}</style>
      </div>
      <Footer siteSettings={siteSettings} />
      <WhatsAppFAB />
    </>
  );
}
