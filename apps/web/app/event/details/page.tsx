import React from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import CtaBand from "@/components/sections/CtaBand";
import { fetchStrapi } from "@/lib/api";
import { SiteSettings, Industry, CtaBandSection } from "@tathastu/types";

export const revalidate = 60; // ISR 60s

export async function generateMetadata() {
  return {
    title: "Event Images — Tathastu",
    description: "Photo gallery from the Tathastu event.",
  };
}

// TODO: swap for the real event photography — generic placeholder reused
// across every tile for now.
const PLACEHOLDER_IMAGE = "/images/event/photo-placeholder.svg";

const GALLERY_HEADING =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.";

const GALLERY_TEXT =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const ctaBandSection: CtaBandSection = {
  __component: "sections.cta-band",
  id: 1,
  heading: "Design Support for All Your Creative Needs",
  subtext:
    "Get a free introduction and discover how you and your team can change the way your source design forever.",
  ctaLabel: "Request Demo",
  ctaHref: "/contact?source=Demo&industry=event",
};

// Bento gallery layout — mirrors the reference screenshot's box structure:
// a tall image far left, a row of small tiles + a wide tile, a large
// center image with a tall image on the right spanning two rows, and two
// tiles along the bottom.
const GALLERY_GRID_STYLE: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1.3fr 1fr 1fr 1.3fr",
  gridTemplateRows: "160px 260px 160px",
  gap: "16px",
  gridTemplateAreas: `
    "tall1 small1 small2 wide"
    "tall1 center center tall2"
    "bottomA bottomB . tall2"
  `,
};

export default async function EventDetailsPage() {
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

      <main className="flex-grow">
        {/* ── Hero banner with breadcrumb ── */}
        <section className="relative overflow-hidden bg-brand-dark pb-24 pt-20 sm:pb-28 sm:pt-24">
          <Image
            src="/images/academy/hero-bg.jpg"
            alt="Attendees at a Tathastu event"
            fill
            priority
            className="object-cover opacity-40"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/0 via-brand-dark/10 to-brand-dark" />

          <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-3 px-6 text-center">
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
              Event
            </h1>
            <nav className="flex items-center gap-2 text-sm font-medium text-white/70">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span>/</span>
              <Link href="/event" className="hover:text-white">
                Event
              </Link>
              <span>/</span>
              <span className="text-white">Details</span>
            </nav>
          </div>
        </section>

        {/* ── Event Images gallery ── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#FBE9E1] via-[#F3E8EF] to-[#E2F0FA] px-6 py-20 sm:px-10">
          <div className="relative z-10 mx-auto max-w-5xl text-center">
            <h2 className="text-2xl font-extrabold text-brand-dark sm:text-3xl">
              {GALLERY_HEADING}
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-gray-600">
              {GALLERY_TEXT}
            </p>
          </div>

          <div
            className="relative z-10 mx-auto mt-12 max-w-5xl"
            style={GALLERY_GRID_STYLE}
          >
            <div
              style={{ gridArea: "tall1" }}
              className="relative overflow-hidden rounded-2xl"
            >
              <Image
                src={PLACEHOLDER_IMAGE}
                alt="Event gallery photo"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 25vw"
              />
            </div>

            <div
              style={{ gridArea: "small1" }}
              className="relative overflow-hidden rounded-2xl"
            >
              <Image
                src={PLACEHOLDER_IMAGE}
                alt="Event gallery photo"
                fill
                className="object-cover grayscale"
                sizes="(max-width: 1024px) 50vw, 15vw"
              />
            </div>

            <div
              style={{ gridArea: "small2" }}
              className="relative overflow-hidden rounded-2xl"
            >
              <Image
                src={PLACEHOLDER_IMAGE}
                alt="Event gallery photo"
                fill
                className="object-cover grayscale"
                sizes="(max-width: 1024px) 50vw, 15vw"
              />
            </div>

            <div
              style={{ gridArea: "wide" }}
              className="relative overflow-hidden rounded-2xl"
            >
              <Image
                src={PLACEHOLDER_IMAGE}
                alt="Event gallery photo"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 25vw"
              />
            </div>

            <div
              style={{ gridArea: "center" }}
              className="relative overflow-hidden rounded-2xl"
            >
              <Image
                src={PLACEHOLDER_IMAGE}
                alt="Event gallery photo"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 35vw"
              />
            </div>

            <div
              style={{ gridArea: "tall2" }}
              className="relative overflow-hidden rounded-2xl"
            >
              <Image
                src={PLACEHOLDER_IMAGE}
                alt="Event gallery photo"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 25vw"
              />
            </div>

            <div
              style={{ gridArea: "bottomA" }}
              className="relative overflow-hidden rounded-2xl"
            >
              <Image
                src={PLACEHOLDER_IMAGE}
                alt="Event gallery photo"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 20vw"
              />
            </div>

            <div
              style={{ gridArea: "bottomB", background: "#2A2A2A" }}
              className="relative overflow-hidden rounded-2xl"
            />
          </div>
        </section>

        <CtaBand section={ctaBandSection} />
      </main>

      <Footer siteSettings={siteSettings} />
      <WhatsAppFAB />
    </>
  );
}
