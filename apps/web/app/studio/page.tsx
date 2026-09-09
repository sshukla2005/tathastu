import React from "react";
import Header from "@/components/Header";
import WhatsAppFAB from "@/components/WhatsAppFAB";

// Section Components
import StudioHero from "@/components/sections/StudioHero";
import StudioConnect from "@/components/sections/StudioConnect";
import StudioTrusted from "@/components/sections/StudioTrusted";
import StudioWhoWeAre from "@/components/sections/StudioWhoWeAre";
import StudioWhatWeDo from "@/components/sections/StudioWhatWeDo";
import StudioMeetTeam from "@/components/sections/StudioMeetTeam";
import StudioPurpose from "@/components/sections/StudioPurpose";
import StudioFindInside from "@/components/sections/StudioFindInside";
import StudioFooter from "@/components/sections/StudioFooter";

import { fetchStrapi } from "@/lib/api";
import { SiteSettings, Industry, StudioPageSection } from "@tathastu/types";

export const revalidate = 60; // ISR 60s

interface StudioPageData {
  id: number;
  documentId: string;
  seoTitle: string;
  seoDescription: string;
  sections: StudioPageSection[];
}

// Populate each dynamic-zone component explicitly so nested media/relations
// (e.g. FX card icons, team member photos) come back with the response.
const STUDIO_POPULATE = [
  "populate[sections][on][sections.studio-hero][populate]=*",
  "populate[sections][on][sections.studio-connect][populate]=*",
  "populate[sections][on][sections.studio-trusted][populate]=*",
  "populate[sections][on][sections.studio-who-we-are][populate]=*",
  "populate[sections][on][sections.studio-what-we-do][populate][cards][populate]=icon",
  "populate[sections][on][sections.studio-meet-team][populate][members][populate]=photo",
  "populate[sections][on][sections.studio-purpose][populate]=*",
  "populate[sections][on][sections.studio-find-inside][populate]=*",
  "populate[sections][on][sections.studio-footer][populate]=*",
].join("&");

export async function generateMetadata() {
  try {
    const studioPageRes = await fetchStrapi<{ data: StudioPageData }>("/studio-page");
    if (studioPageRes?.data) {
      return {
        title: studioPageRes.data.seoTitle || "Tathastu Studio — Solutions & Products",
        description:
          studioPageRes.data.seoDescription ||
          "Explore our product portfolio of hardware workstations, industry-standard 3D software, and custom plugins.",
      };
    }
  } catch (err) {
    console.error("Error generating studio page metadata:", err);
  }
  return {
    title: "Tathastu Studio — Solutions & Products",
    description: "Explore our product portfolio of hardware workstations, industry-standard 3D software, and custom plugins.",
  };
}

export default async function StudioPage() {
  const [settingsRes, industriesRes, studioPageRes] = await Promise.all([
    fetchStrapi<{ data: SiteSettings }>("/site-setting?populate[nav][populate]=*&populate[footerColumns][populate]=*&populate[socialLinks][populate]=*&populate[logo][populate]=*"),
    fetchStrapi<{ data: Industry[] }>("/industries?sort=order:asc"),
    fetchStrapi<{ data: StudioPageData }>(`/studio-page?${STUDIO_POPULATE}`),
  ]);

  const siteSettings = settingsRes?.data;
  const industries = industriesRes?.data || [];
  const studioPage = studioPageRes?.data;

  if (!siteSettings) return null;

  return (
    <div style={{ background: "#0B0625", minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Open Sans', sans-serif" }}>
      <Header siteSettings={siteSettings} industries={industries} />

      <main style={{ flexGrow: 1 }}>
        {studioPage?.sections &&
          studioPage.sections.map((section, idx) => {
            switch (section.__component) {
              case "sections.studio-hero":
                return <StudioHero key={idx} section={section} />;
              case "sections.studio-connect":
                return <StudioConnect key={idx} section={section} />;
              case "sections.studio-trusted":
                return <StudioTrusted key={idx} section={section} />;
              case "sections.studio-who-we-are":
                return <StudioWhoWeAre key={idx} section={section} />;
              case "sections.studio-what-we-do":
                return <StudioWhatWeDo key={idx} section={section} />;
              case "sections.studio-meet-team":
                return <StudioMeetTeam key={idx} section={section} />;
              case "sections.studio-purpose":
                return <StudioPurpose key={idx} section={section} />;
              case "sections.studio-find-inside":
                return <StudioFindInside key={idx} section={section} />;
              case "sections.studio-footer":
                return <StudioFooter key={idx} section={section} siteSettings={siteSettings} />;
              default:
                return (
                  <div key={idx} className="p-4 text-center bg-yellow-50 text-yellow-700 text-sm">
                    Unknown Component: {(section as any).__component}
                  </div>
                );
            }
          })}
      </main>

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
        .studio-meet-viewport {
          width: 100%;
          overflow: visible;
        }
        .studio-meet-row {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 260px));
          justify-content: center;
          gap: 24px;
          width: 100%;
          transition: transform 0.35s ease;
        }
        .studio-meet-slide {
          display: contents;
        }
        .studio-meet-arrows {
          display: flex;
          justify-content: center;
          gap: 8px;
        }
        .studio-meet-arrow-btn {
          width: 44px;
          height: 44px;
          border: 1.5px solid #0b0625;
          border-radius: 4px;
          background: #ffffff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Open Sans', sans-serif;
          font-size: 20px;
          color: #0b0625;
        }
        .studio-meet-arrow-btn:hover {
          background: #f5f5f5;
        }
        .studio-member-card {
          display: flex;
          flex-direction: column;
          width: 100%;
        }
        .studio-member-arch {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 460px;
          border-radius: 999px;
          overflow: hidden;
          position: relative;
        }
        .studio-member-info {
          flex-shrink: 0;
          padding: 56px 14px 12px;
          text-align: center;
        }
        .studio-member-name {
          font-size: 18px;
          font-weight: 700;
          color: #000000;
          margin: 0;
          font-family: 'Open Sans', sans-serif;
        }
        .studio-member-role {
          font-size: 13px;
          font-weight: 500;
          color: #555555;
          margin: 4px 0 0;
          font-family: 'Open Sans', sans-serif;
        }
        .studio-member-photo {
          position: relative;
          flex: 1 1 auto;
          min-height: 0;
        }
        .studio-purpose-rows {
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 100%;
        }
        .studio-purpose-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          width: 100%;
        }
        .studio-purpose-grid-bottom {
          display: flex;
          justify-content: center;
          gap: 20px;
          width: 100%;
        }
        .studio-purpose-grid-bottom .studio-purpose-card {
          width: calc((100% - 40px) / 3);
        }
        .studio-purpose-card {
          background-color: #FFFFFF;
          border: 1.5px solid #D61814;
          padding: 32px 24px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100px;
          box-shadow: 0 4px 14px rgba(214, 24, 20, 0.15);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .studio-purpose-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(214, 24, 20, 0.25);
        }
        .studio-purpose-card:hover p {
          font-weight: 700 !important;
        }
        .studio-toggle-bar {
          display: flex;
          background-color: transparent;
          border: 1.5px solid #D61814;
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
          color: #D61814;
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
          display: grid !important;
        }
        #studio-toggle-freelancers:checked ~ * .for-studios-only {
          display: none !important;
        }
        #studio-toggle-freelancers:checked ~ * .for-freelancers-only {
          display: grid !important;
        }

        .studio-cards-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          width: 100%;
        }
        .studio-contact-card {
          background-color: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.08);
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
          background-color: rgba(255, 255, 255, 0.16);
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
            grid-template-columns: repeat(2, minmax(0, 200px)) !important;
            gap: 32px !important;
          }
          .studio-member-arch {
            height: 400px !important;
            border-radius: 999px !important;
          }
          .studio-member-info {
            padding: 36px 14px 12px !important;
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
          .studio-purpose-grid-bottom {
            gap: 16px !important;
          }
          .studio-purpose-grid-bottom .studio-purpose-card {
            width: calc((100% - 16px) / 2) !important;
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
          .studio-meet-viewport {
            overflow: hidden !important;
          }
          .studio-meet-row {
            display: flex !important;
            justify-content: flex-start !important;
            gap: 0 !important;
          }
          .studio-meet-slide {
            display: flex !important;
            flex: 0 0 100% !important;
            justify-content: center !important;
            gap: 16px !important;
          }
          .studio-member-card {
            flex: 0 0 auto !important;
            width: 150px !important;
            align-items: center !important;
          }
          .studio-member-arch {
            width: 150px !important;
            height: 300px !important;
            border-radius: 999px !important;
          }
          .studio-member-info {
            padding: 48px 10px 8px !important;
          }
          .studio-member-name {
            font-size: 14px !important;
          }
          .studio-member-role {
            font-size: 11px !important;
            line-height: 15px !important;
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
          .studio-purpose-grid-bottom {
            flex-direction: column !important;
            gap: 16px !important;
          }
          .studio-purpose-grid-bottom .studio-purpose-card {
            width: 100% !important;
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
