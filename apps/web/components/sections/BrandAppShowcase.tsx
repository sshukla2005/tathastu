import React from "react";
import Image from "next/image";
import { AppShowcase } from "@tathastu/types";
import { getStrapiMediaUrl } from "@/lib/api";

interface BrandAppShowcaseProps {
  showcase: AppShowcase;
  fallbackIcon?: string;
  fallbackFeaturesImage?: string;
  fallbackEnquiryImage?: string;
}

const DEFAULT_FALLBACK = "/images/media-and-entertainment/adobe/features.svg";

export default function BrandAppShowcase({
  showcase,
  fallbackIcon = DEFAULT_FALLBACK,
  fallbackFeaturesImage = DEFAULT_FALLBACK,
  fallbackEnquiryImage = DEFAULT_FALLBACK,
}: BrandAppShowcaseProps) {
  const isReversed = showcase.direction === "right";
  const isDark = !isReversed; // dark for "left", light for "right" — matches the original design's alternating rhythm

  const icon = getStrapiMediaUrl(showcase.icon?.url) || fallbackIcon;
  const blocks = [
    {
      heading: showcase.featuresHeading || "Features",
      image: getStrapiMediaUrl(showcase.featuresImage?.url) || fallbackFeaturesImage,
      text: showcase.featuresText,
    },
    {
      heading: showcase.enquiryHeading || "Enquiry",
      image: getStrapiMediaUrl(showcase.enquiryImage?.url) || fallbackEnquiryImage,
      text: showcase.enquiryText,
    },
  ];

  return (
    <section className={`relative overflow-hidden px-6 py-16 sm:px-10 sm:py-20 ${isDark ? "bg-brand-dark" : "bg-white"}`}>
      <div
        className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full"
        style={{ backgroundColor: isDark ? "#2D9BF0" : "#91FFA0", filter: "blur(300px)", opacity: 0.5 }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full"
        style={{ backgroundColor: "#FF842F", filter: "blur(300px)", opacity: 0.35 }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className={`flex flex-col items-center gap-8 sm:gap-10 ${isReversed ? "sm:flex-row-reverse" : "sm:flex-row"}`}>
          <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-3xl shadow-xl sm:h-38 sm:w-38">
            <Image src={icon} alt={showcase.title} fill className="object-cover" sizes="152px" />
          </div>

          <div className={`flex flex-1 flex-col gap-3 text-center ${isReversed ? "sm:text-right" : "sm:text-left"}`}>
            <h2 className={`text-2xl font-extrabold sm:text-3xl ${isDark ? "text-white" : "text-brand-dark"}`}>{showcase.title}</h2>
            <p className={`text-sm leading-relaxed sm:text-base ${isDark ? "text-white/80" : "text-gray-600"} ${isReversed ? "sm:ml-auto" : ""}`}>
              {showcase.subtitle}
            </p>
          </div>
        </div>

        <div className="relative z-10 mt-10 grid grid-cols-1 gap-8 rounded-3xl bg-white p-6 shadow-xl sm:grid-cols-2 sm:p-8">
          {blocks.map((block) => (
            <div key={block.heading} className="flex items-start gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl sm:h-20 sm:w-20">
                <Image src={block.image} alt={block.heading} fill className="object-cover" sizes="80px" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-base font-bold text-brand-dark">{block.heading}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{block.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
