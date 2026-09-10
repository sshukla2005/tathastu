import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";

// Section Components
import IndustriesHero from "@/components/sections/IndustriesHero";
import IndustriesGrid from "@/components/sections/IndustriesGrid";
import StatsBand from "@/components/sections/StatsBand";
import FeatureCards from "@/components/sections/FeatureCards";
import CtaBand from "@/components/sections/CtaBand";
import Testimonials from "@/components/sections/Testimonials";
import ClientLogos from "@/components/sections/ClientLogos";

import { fetchStrapi } from "@/lib/api";
import { SiteSettings, Industry, IndustriesPageSection } from "@tathastu/types";

export const revalidate = 60; // ISR 60s

interface IndustriesPageData {
  id: number;
  documentId: string;
  seoTitle: string;
  seoDescription: string;
  sections: IndustriesPageSection[];
}

// Populate each dynamic-zone component explicitly so nested media/relations
// (e.g. industry card images, feature icons, testimonial avatars, client
// logos) come back with the response.
const INDUSTRIES_POPULATE = [
  "populate[sections][on][sections.industries-hero][populate]=*",
  "populate[sections][on][sections.industries-grid][populate][cards][populate]=image",
  "populate[sections][on][sections.stats-band][populate]=*",
  "populate[sections][on][sections.feature-cards][populate][cards][populate]=icon",
  "populate[sections][on][sections.cta-band][populate]=*",
  "populate[sections][on][sections.testimonials][populate][testimonials][populate]=avatar",
  "populate[sections][on][sections.client-logos][populate][logos][populate]=logo",
].join("&");

export async function generateMetadata() {
  try {
    const industriesPageRes = await fetchStrapi<{ data: IndustriesPageData }>("/industries-page");
    if (industriesPageRes?.data) {
      return {
        title: industriesPageRes.data.seoTitle || "Industries We Serve — Tathastu",
        description:
          industriesPageRes.data.seoDescription ||
          "Discover our tailor-made technology solutions for Media & Entertainment, AEC, Education, and Manufacturing.",
      };
    }
  } catch (err) {
    console.error("Error generating industries page metadata:", err);
  }
  return {
    title: "Industries We Serve — Tathastu",
    description: "Discover our tailor-made technology solutions for Media & Entertainment, AEC, Education, and Manufacturing.",
  };
}

export default async function IndustriesPage() {
  const [settingsRes, industriesRes, industriesPageRes] = await Promise.all([
    fetchStrapi<{ data: SiteSettings }>(
      "/site-setting?populate[nav][populate]=*&populate[footerColumns][populate]=*&populate[socialLinks][populate]=*&populate[logo][populate]=*",
    ),
    fetchStrapi<{ data: Industry[] }>("/industries?sort=order:asc"),
    fetchStrapi<{ data: IndustriesPageData }>(`/industries-page?${INDUSTRIES_POPULATE}`),
  ]);

  const siteSettings = settingsRes?.data;
  const industries = industriesRes?.data || [];
  const industriesPage = industriesPageRes?.data;

  if (!siteSettings) return null;

  return (
    <>
      <Header siteSettings={siteSettings} industries={industries} />

      <main className="flex-grow bg-brand-light">
        {industriesPage?.sections &&
          industriesPage.sections.map((section, idx) => {
            switch (section.__component) {
              case "sections.industries-hero":
                return <IndustriesHero key={idx} section={section} />;
              case "sections.industries-grid":
                return <IndustriesGrid key={idx} section={section} />;
              case "sections.stats-band":
                return <StatsBand key={idx} section={section} />;
              case "sections.feature-cards":
                return <FeatureCards key={idx} section={section} />;
              case "sections.cta-band":
                return <CtaBand key={idx} section={section} />;
              case "sections.testimonials":
                return <Testimonials key={idx} section={section} />;
              case "sections.client-logos":
                return <ClientLogos key={idx} section={section} />;
              default:
                return (
                  <div key={idx} className="p-4 text-center bg-yellow-50 text-yellow-700 text-sm">
                    Unknown Component: {(section as any).__component}
                  </div>
                );
            }
          })}
      </main>

      <Footer siteSettings={siteSettings} />
      <WhatsAppFAB />
    </>
  );
}
