import React from "react";
import Image from "next/image";

interface ShowcaseBlock {
  image: string;
  heading?: string;
  text: string;
}

export interface AdobeAppShowcaseProps {
  icon: string;
  iconAlt?: string;
  title: string;
  subtitle: string;
  features: ShowcaseBlock;
  enquiry: ShowcaseBlock;
  /** Which side the icon + title sit on; content mirrors accordingly. */
  direction: "left" | "right";
  /** Background theme. Defaults to dark for "left", light for "right". */
  theme?: "dark" | "light";
  bck?: string;
}

export default function AdobeAppShowcase({
  icon,
  iconAlt,
  title,
  subtitle,
  features,
  enquiry,
  direction,
  theme,
  bck,
}: AdobeAppShowcaseProps) {
  const resolvedTheme = theme ?? (direction === "left" ? "dark" : "light");
  const isDark = resolvedTheme === "dark";
  const isReversed = direction === "right";

  return (
    <section
      className={`relative overflow-hidden px-6 py-16 sm:px-10 sm:py-20 ${
        bck || (isDark ? "bg-brand-dark" : "bg-white")
      }`}
    >
      <div
        className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full"
        style={{
          backgroundColor: isDark ? "#2D9BF0" : "#91FFA0",
          filter: "blur(300px)",
          opacity: 0.5,
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full"
        style={{
          backgroundColor: isDark ? "#FF842F" : "#FF842F",
          filter: "blur(300px)",
          opacity: 0.35,
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div
          className={`flex flex-col items-center gap-8 sm:gap-10 ${
            isReversed ? "sm:flex-row-reverse" : "sm:flex-row"
          }`}
        >
          <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-3xl shadow-xl sm:h-38 sm:w-38">
            <Image
              src={icon}
              alt={iconAlt || title}
              fill
              className="object-cover"
              sizes="152px"
            />
          </div>

          <div
            className={`flex flex-1 flex-col gap-3 text-center ${
              isReversed ? "sm:text-right" : "sm:text-left"
            }`}
          >
            <h2
              className={`text-2xl font-extrabold sm:text-3xl ${
                isDark ? "text-white" : "text-brand-dark"
              }`}
            >
              {title}
            </h2>
            <p
              className={`text-sm leading-relaxed sm:text-base ${
                isDark ? "text-white/80" : "text-gray-600"
              } ${isReversed ? "sm:ml-auto" : ""}`}
            >
              {subtitle}
            </p>
          </div>
        </div>

        <div className="relative z-10 mt-10 grid grid-cols-1 gap-8 rounded-3xl bg-white p-6 shadow-xl sm:grid-cols-2 sm:p-8">
          {[
            { ...features, heading: features.heading || "Features" },
            { ...enquiry, heading: enquiry.heading || "Enquiry" },
          ].map((block) => (
            <div key={block.heading} className="flex items-start gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl sm:h-20 sm:w-20">
                <Image
                  src={block.image}
                  alt={block.heading}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-base font-bold text-brand-dark">
                  {block.heading}
                </h3>
                <p className="text-sm leading-relaxed text-gray-500">
                  {block.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
