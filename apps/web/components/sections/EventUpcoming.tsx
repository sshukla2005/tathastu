import React from "react";
import Image from "next/image";
import { EventUpcomingSection } from "@tathastu/types";
import { getStrapiMediaUrl } from "@/lib/api";

interface EventUpcomingProps {
  section: EventUpcomingSection;
}

const PLACEHOLDER_IMAGE = "/images/event/photo-placeholder.svg";

export default function EventUpcoming({ section }: EventUpcomingProps) {
  const blocks = section.blocks || [];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-white to-[#FDECE0] px-6 py-20 sm:px-10">
      <div className="relative z-10 mx-auto max-w-6xl">
        <h2 className="mb-14 text-center text-3xl font-extrabold text-brand-dark sm:text-4xl">
          {section.heading} <span className="text-[#2D9BF0]">{section.headingHighlight}</span>
        </h2>

        <div className="flex flex-col gap-14">
          {blocks.map((block, i) => (
            <div key={block.id ?? i} className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col gap-3">
                <h3 className="text-lg font-bold text-brand-dark">{block.heading}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{block.text}</p>
              </div>

              <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl">
                <Image
                  src={getStrapiMediaUrl(block.image?.url) || PLACEHOLDER_IMAGE}
                  alt={block.isVideo ? "Event highlight video" : "Attendees at the event"}
                  fill
                  className={`object-cover ${block.isVideo ? "grayscale" : ""}`}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                {block.isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 shadow-lg">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="#0b0625" className="ml-0.5">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
