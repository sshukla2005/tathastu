import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { IndustriesGridSection } from "@tathastu/types";
import { getStrapiMediaUrl } from "@/lib/api";

interface IndustriesGridProps {
  section: IndustriesGridSection;
}

// Fallback illustrations matching the original 5 industry cards, used until
// a card has its own image set in Strapi.
const FALLBACK_IMAGES: Record<string, string> = {
  "media and entertainment": "/images/industries/media-and-entertainment.svg",
  "aec": "/images/industries/aec.svg",
  "education": "/images/industries/education.svg",
  "manufacturing": "/images/industries/manufacturing.svg",
  "government": "/images/industries/govenment.svg",
};

function fallbackImage(title: string): string {
  return FALLBACK_IMAGES[title.toLowerCase()] || "/images/industries/media-and-entertainment.svg";
}

export default function IndustriesGrid({ section }: IndustriesGridProps) {
  const cards = section.cards || [];

  return (
    <section className="relative overflow-hidden bg-white px-6 py-20 sm:px-10">
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-125 w-125 rounded-full"
        style={{ backgroundColor: "#FF842F", filter: "blur(400px)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-32 h-125 w-125 rounded-full"
        style={{ backgroundColor: "#91FFA0", filter: "blur(300px)" }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-14 flex max-w-3xl flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-extrabold leading-tight text-brand-dark sm:text-4xl">
            {section.heading} <span className="text-[#4B95FF]">{section.headingHighlight}</span>
          </h2>
          <p className="text-base text-gray-500">{section.subtitle}</p>
        </div>

        <div className="industries-cards-grid">
          {cards.map((card, idx) => {
            const cardClassName = `industries-card${card.isFeatured ? " industries-card-big" : ""}`;
            const cardContent = (
              <>
                <Image
                  src={getStrapiMediaUrl(card.image?.url) || fallbackImage(card.title)}
                  alt={card.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="industries-card-title">
                  <h3>{card.title}</h3>
                  <span className="industries-card-arrow">
                    <ChevronRight size={16} />
                  </span>
                </div>
              </>
            );

            return card.href ? (
              <Link key={card.id ?? idx} href={card.href} className={cardClassName}>
                {cardContent}
              </Link>
            ) : (
              <div key={card.id ?? idx} className={cardClassName}>
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .industries-cards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 24px;
          width: 100%;
          min-height: 620px;
        }
        .industries-card {
          position: relative;
          display: block;
          overflow: hidden;
          border-radius: 10px;
          border: 1px solid #E7E7E7;
        }
        .industries-card-big {
          grid-column: 1 / span 1;
          grid-row: 1 / span 2;
        }
        .industries-card-title {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 16px 20px;
          background-color: #000000;
          opacity: 0.5;
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
        }
        .industries-card-title h3 {
          margin: 0;
          font-family: 'Open Sans', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #FFFFFF;
        }
        .industries-card-arrow {
          flex-shrink: 0;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #FFFFFF;
          color: #0B0625;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @media (max-width: 1024px) {
          .industries-cards-grid { grid-template-columns: 1fr 1fr; grid-template-rows: auto; min-height: 0; }
          .industries-card-big { grid-column: 1 / span 2; grid-row: auto; aspect-ratio: 16 / 9; }
          .industries-card:not(.industries-card-big) { aspect-ratio: 4 / 3; }
        }
        @media (max-width: 640px) {
          .industries-cards-grid { grid-template-columns: 1fr; }
          .industries-card-big { grid-column: 1; }
        }
      `}</style>
    </section>
  );
}
