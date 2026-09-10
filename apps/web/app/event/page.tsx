import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";

// Section Components
import EventHero from "@/components/sections/EventHero";
import EventUpcoming from "@/components/sections/EventUpcoming";
import EventPast from "@/components/sections/EventPast";
import CtaBand from "@/components/sections/CtaBand";

import { fetchStrapi } from "@/lib/api";
import { SiteSettings, Industry, EventPageSection } from "@tathastu/types";

export const revalidate = 60; // ISR 60s

interface EventPageData {
  id: number;
  documentId: string;
  seoTitle: string;
  seoDescription: string;
  sections: EventPageSection[];
}

// Populate each dynamic-zone component explicitly so nested media/relations
// (e.g. upcoming-event block photos, past-event cover images) come back
// with the response.
const EVENT_POPULATE = [
  "populate[sections][on][sections.event-hero][populate]=*",
  "populate[sections][on][sections.event-upcoming][populate][blocks][populate]=image",
  "populate[sections][on][sections.event-past][populate][events][populate]=coverImage",
  "populate[sections][on][sections.cta-band][populate]=*",
].join("&");

export async function generateMetadata() {
  try {
    const eventPageRes = await fetchStrapi<{ data: EventPageData }>("/event-page");
    if (eventPageRes?.data) {
      return {
        title: eventPageRes.data.seoTitle || "Event — Tathastu",
        description: eventPageRes.data.seoDescription || "Explore our upcoming event.",
      };
    }
  } catch (err) {
    console.error("Error generating event page metadata:", err);
  }
  return {
    title: "Event — Tathastu",
    description: "Explore our upcoming event.",
  };
}

export default async function EventPage() {
  const [settingsRes, industriesRes, eventPageRes] = await Promise.all([
    fetchStrapi<{ data: SiteSettings }>(
      "/site-setting?populate[nav][populate]=*&populate[footerColumns][populate]=*&populate[socialLinks][populate]=*&populate[logo][populate]=*",
    ),
    fetchStrapi<{ data: Industry[] }>("/industries?sort=order:asc"),
    fetchStrapi<{ data: EventPageData }>(`/event-page?${EVENT_POPULATE}`),
  ]);

  const siteSettings = settingsRes?.data;
  const industries = industriesRes?.data || [];
  const eventPage = eventPageRes?.data;

  if (!siteSettings) return null;

  return (
    <>
      <Header siteSettings={siteSettings} industries={industries} />

      <main className="flex-grow">
        {eventPage?.sections &&
          eventPage.sections.map((section, idx) => {
            switch (section.__component) {
              case "sections.event-hero":
                return <EventHero key={idx} section={section} />;
              case "sections.event-upcoming":
                return <EventUpcoming key={idx} section={section} />;
              case "sections.event-past":
                return <EventPast key={idx} section={section} />;
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
      </main>

      <Footer siteSettings={siteSettings} />
      <WhatsAppFAB />
    </>
  );
}
