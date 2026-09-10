import React from "react";
import Link from "next/link";
import Image from "next/image";
import { EventHeroSection } from "@tathastu/types";
import { getStrapiMediaUrl } from "@/lib/api";

interface EventHeroProps {
  section: EventHeroSection;
}

const FALLBACK_BACKGROUND = "/images/academy/hero-bg.jpg";

export default function EventHero({ section }: EventHeroProps) {
  const backgroundImage = getStrapiMediaUrl(section.backgroundImage?.url) || FALLBACK_BACKGROUND;

  return (
    <section className="relative overflow-hidden bg-brand-dark pb-24 pt-20 sm:pb-28 sm:pt-24">
      <Image src={backgroundImage} alt="Attendees at a Tathastu event" fill priority className="object-cover opacity-40" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/0 via-brand-dark/10 to-brand-dark" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-3 px-6 text-center">
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">{section.heading}</h1>
        <nav className="flex items-center gap-2 text-sm font-medium text-white/70">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <span>/</span>
          <span className="text-white">{section.heading}</span>
        </nav>
      </div>
    </section>
  );
}
