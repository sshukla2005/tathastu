import React from "react";
import Link from "next/link";
import Image from "next/image";
import { EventPastSection } from "@tathastu/types";
import { getStrapiMediaUrl } from "@/lib/api";

interface EventPastProps {
  section: EventPastSection;
}

const PLACEHOLDER_IMAGE = "/images/event/photo-placeholder.svg";

export default function EventPast({ section }: EventPastProps) {
  const events = [...(section.events || [])].sort((a, b) => a.order - b.order);

  return (
    <section className="relative overflow-hidden bg-white px-6 py-20 sm:px-10">
      <div className="relative z-10 mx-auto max-w-6xl">
        <h2 className="mb-14 text-center text-3xl font-extrabold text-brand-dark sm:text-4xl">
          {section.heading} <span className="text-[#2D9BF0]">{section.headingHighlight}</span>
        </h2>

        {events.length === 0 ? (
          <p className="text-center text-gray-500">Past event highlights are coming soon.</p>
        ) : (
          <div className="flex flex-col gap-16">
            {events.map((event) => (
              <div key={event.id} className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
                <div className="flex flex-col gap-3">
                  <Link href={`/event/${event.slug}`}>
                    <h3 className="text-lg font-bold text-brand-dark transition-colors hover:text-[#2D9BF0]">{event.title}</h3>
                  </Link>
                  <p className="text-sm leading-relaxed text-gray-600">{event.summary}</p>
                </div>

                <Link href={`/event/${event.slug}`} className="relative aspect-4/3 w-full overflow-hidden rounded-2xl">
                  <Image
                    src={getStrapiMediaUrl(event.coverImage?.url) || PLACEHOLDER_IMAGE}
                    alt={`Guests at ${event.title}`}
                    fill
                    className="object-cover grayscale transition-transform duration-300 hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
