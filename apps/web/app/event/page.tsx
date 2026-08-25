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
    title: "Event — Tathastu",
    description: "Explore our upcoming event.",
  };
}

// TODO: swap for the real event photography — generic placeholder reused
// across all three slots for now.
const PLACEHOLDER_IMAGE = "/images/event/photo-placeholder.svg";

const INTRO_TEXT =
  '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.';

const DETAIL_TEXT =
  "—black and white photographers who view the natural world not as a subject to be documented, but as a canvas for emotion, narrative, and art. Their work moves beyond the traditional bounds of wildlife photography, focusing not on species checklists or iconic sightings, but on moments—fleeting, unstaged, and alive with meaning.";

const EVENT_BLOCKS = [
  {
    heading:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
    text: INTRO_TEXT,
    video: false,
  },
  {
    heading: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
    text: DETAIL_TEXT,
    video: true,
  },
  {
    heading: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
    text: DETAIL_TEXT,
    video: false,
  },
];

const ctaBandSection: CtaBandSection = {
  __component: "sections.cta-band",
  id: 1,
  heading: "Design Support for All Your Creative Needs",
  subtext:
    "Get a free introduction and discover how you and your team can change the way your source design forever.",
  ctaLabel: "Request Demo",
  ctaHref: "/contact?source=Demo&industry=event",
};

export default async function EventPage() {
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
              <span className="text-white">Event</span>
            </nav>
          </div>
        </section>

        {/* ── Upcoming Event ── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-white via-white to-[#FDECE0] px-6 py-20 sm:px-10">
          <div className="relative z-10 mx-auto max-w-6xl">
            <h2 className="mb-14 text-center text-3xl font-extrabold text-brand-dark sm:text-4xl">
              Upcoming <span className="text-[#2D9BF0]">Event</span>
            </h2>

            <div className="flex flex-col gap-14">
              {EVENT_BLOCKS.map((block, i) => (
                <div
                  key={i}
                  className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-16"
                >
                  <div className="flex flex-col gap-3">
                    <Link href="/event/details">
                      <h3 className="text-lg font-bold text-brand-dark transition-colors hover:text-[#2D9BF0]">
                        {block.heading}
                      </h3>
                    </Link>
                    <p className="text-sm leading-relaxed text-gray-600">
                      {block.text}
                    </p>
                  </div>

                  <Link
                    href="/event/details"
                    className="relative aspect-16/10 w-full overflow-hidden rounded-2xl"
                  >
                    <Image
                      src={PLACEHOLDER_IMAGE}
                      alt={
                        block.video
                          ? "Event highlight video"
                          : "Attendees at the event"
                      }
                      fill
                      className={`object-cover transition-transform duration-300 hover:scale-105 ${block.video ? "grayscale" : ""}`}
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                    {block.video && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 shadow-lg">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="#0b0625"
                            className="ml-0.5"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Fast Event ── */}
        <section className="relative overflow-hidden bg-white px-6 py-20 sm:px-10">
          <div className="relative z-10 mx-auto max-w-6xl">
            <h2 className="mb-14 text-center text-3xl font-extrabold text-brand-dark sm:text-4xl">
              Fast <span className="text-[#2D9BF0]">Event</span>
            </h2>

            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col gap-3">
                <Link href="/event/details">
                  <h3 className="text-lg font-bold text-brand-dark transition-colors hover:text-[#2D9BF0]">
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem.
                  </h3>
                </Link>
                <p className="text-sm leading-relaxed text-gray-600">
                  {DETAIL_TEXT}
                </p>
              </div>

              <Link
                href="/event/details"
                className="relative aspect-4/3 w-full overflow-hidden rounded-2xl"
              >
                <Image
                  src={PLACEHOLDER_IMAGE}
                  alt="Guests toasting at the event"
                  fill
                  className="object-cover grayscale transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </Link>
            </div>
          </div>
        </section>

        <CtaBand section={ctaBandSection} />
      </main>

      <Footer siteSettings={siteSettings} />
      <WhatsAppFAB />
    </>
  );
}
