import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import CtaBand from "@/components/sections/CtaBand";
import { fetchStrapi, getStrapiMediaUrl } from "@/lib/api";
import { SiteSettings, Industry, Event, CtaBandSection } from "@tathastu/types";

export const revalidate = 60; // ISR 60s

const FALLBACK_HERO_IMAGE = "/images/academy/hero-bg.jpg";
const PLACEHOLDER_IMAGE = "/images/event/photo-placeholder.svg";

interface EventDetailsPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: EventDetailsPageProps) {
  const { slug } = await params;
  try {
    const res = await fetchStrapi<{ data: Event[] }>(`/events?filters[slug][$eq]=${slug}`);
    const event = res?.data?.[0];
    if (event) {
      return {
        title: `${event.title} — Tathastu`,
        description: event.summary,
      };
    }
  } catch (err) {
    console.error("Error generating event details metadata:", err);
  }
  return { title: "Event Images — Tathastu" };
}

const EVENT_POPULATE = [
  "populate[coverImage][populate]=*",
  "populate[galleryTall1][populate]=*",
  "populate[gallerySmall1][populate]=*",
  "populate[gallerySmall2][populate]=*",
  "populate[galleryWide][populate]=*",
  "populate[galleryCenter][populate]=*",
  "populate[galleryTall2][populate]=*",
  "populate[galleryBottomA][populate]=*",
  "populate[galleryBottomB][populate]=*",
].join("&");

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
    "bottomA bottomB bottomB tall2"
  `,
};

export default async function EventDetailsPage({ params }: EventDetailsPageProps) {
  const { slug } = await params;

  const [settingsRes, industriesRes, eventRes] = await Promise.all([
    fetchStrapi<{ data: SiteSettings }>(
      "/site-setting?populate[nav][populate]=*&populate[footerColumns][populate]=*&populate[socialLinks][populate]=*&populate[logo][populate]=*",
    ),
    fetchStrapi<{ data: Industry[] }>("/industries?sort=order:asc"),
    fetchStrapi<{ data: Event[] }>(`/events?filters[slug][$eq]=${slug}&${EVENT_POPULATE}`),
  ]);

  const siteSettings = settingsRes?.data;
  const industries = industriesRes?.data || [];
  const event = eventRes?.data?.[0];

  if (!event) {
    notFound();
  }

  if (!siteSettings) return null;

  const gallery = {
    tall1: getStrapiMediaUrl(event.galleryTall1?.url) || PLACEHOLDER_IMAGE,
    small1: getStrapiMediaUrl(event.gallerySmall1?.url) || PLACEHOLDER_IMAGE,
    small2: getStrapiMediaUrl(event.gallerySmall2?.url) || PLACEHOLDER_IMAGE,
    wide: getStrapiMediaUrl(event.galleryWide?.url) || PLACEHOLDER_IMAGE,
    center: getStrapiMediaUrl(event.galleryCenter?.url) || PLACEHOLDER_IMAGE,
    tall2: getStrapiMediaUrl(event.galleryTall2?.url) || PLACEHOLDER_IMAGE,
    bottomA: getStrapiMediaUrl(event.galleryBottomA?.url) || PLACEHOLDER_IMAGE,
    bottomB: getStrapiMediaUrl(event.galleryBottomB?.url) || PLACEHOLDER_IMAGE,
  };

  const ctaBandSection: CtaBandSection = {
    __component: "sections.cta-band",
    id: 1,
    heading: "Design Support for All Your Creative Needs",
    subtext: "Get a free introduction and discover how you and your team can change the way your source design forever.",
    ctaLabel: "Request Demo",
    ctaHref: `/contact?source=Demo&industry=event&event=${event.slug}`,
  };

  return (
    <>
      <Header siteSettings={siteSettings} industries={industries} />

      <main className="flex-grow">
        {/* ── Hero banner with breadcrumb ── */}
        <section className="relative overflow-hidden bg-brand-dark pb-24 pt-20 sm:pb-28 sm:pt-24">
          <Image src={FALLBACK_HERO_IMAGE} alt="Attendees at a Tathastu event" fill priority className="object-cover opacity-40" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/0 via-brand-dark/10 to-brand-dark" />

          <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-3 px-6 text-center">
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl">Event</h1>
            <nav className="flex items-center gap-2 text-sm font-medium text-white/70">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span>/</span>
              <Link href="/event" className="hover:text-white">
                Event
              </Link>
              <span>/</span>
              <span className="text-white">{event.title}</span>
            </nav>
          </div>
        </section>

        {/* ── Event Images gallery ── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#FBE9E1] via-[#F3E8EF] to-[#E2F0FA] px-6 py-20 sm:px-10">
          <div className="relative z-10 mx-auto max-w-5xl text-center">
            <h2 className="text-2xl font-extrabold text-brand-dark sm:text-3xl">{event.galleryHeading}</h2>
            {event.galleryText && (
              <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-gray-600">{event.galleryText}</p>
            )}
          </div>

          <div className="relative z-10 mx-auto mt-12 max-w-5xl" style={GALLERY_GRID_STYLE}>
            <div style={{ gridArea: "tall1" }} className="relative overflow-hidden rounded-2xl">
              <Image src={gallery.tall1} alt="Event gallery photo" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 25vw" />
            </div>

            <div style={{ gridArea: "small1" }} className="relative overflow-hidden rounded-2xl">
              <Image src={gallery.small1} alt="Event gallery photo" fill className="object-cover grayscale" sizes="(max-width: 1024px) 50vw, 15vw" />
            </div>

            <div style={{ gridArea: "small2" }} className="relative overflow-hidden rounded-2xl">
              <Image src={gallery.small2} alt="Event gallery photo" fill className="object-cover grayscale" sizes="(max-width: 1024px) 50vw, 15vw" />
            </div>

            <div style={{ gridArea: "wide" }} className="relative overflow-hidden rounded-2xl">
              <Image src={gallery.wide} alt="Event gallery photo" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 25vw" />
            </div>

            <div style={{ gridArea: "center" }} className="relative overflow-hidden rounded-2xl">
              <Image src={gallery.center} alt="Event gallery photo" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 35vw" />
            </div>

            <div style={{ gridArea: "tall2" }} className="relative overflow-hidden rounded-2xl">
              <Image src={gallery.tall2} alt="Event gallery photo" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 25vw" />
            </div>

            <div style={{ gridArea: "bottomA" }} className="relative overflow-hidden rounded-2xl">
              <Image src={gallery.bottomA} alt="Event gallery photo" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 20vw" />
            </div>

            <div style={{ gridArea: "bottomB" }} className="relative overflow-hidden rounded-2xl">
              <Image src={gallery.bottomB} alt="Event gallery photo" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 30vw" />
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
