"use client";

import React from "react";
import { ClientLogosSection } from "@tathastu/types";

interface ClientLogosProps {
  section: ClientLogosSection;
}

export default function ClientLogos({ section }: ClientLogosProps) {
  // Return generic beautiful visual representation of the partners if image assets are not loaded
  const getBrandLogo = (name: string) => {
    return (
      <span className="text-xl sm:text-2xl font-black tracking-widest uppercase bg-gradient-to-r from-gray-500 to-gray-700 bg-clip-text text-transparent group-hover:from-brand-orange group-hover:to-brand-primary transition-all duration-300">
        {name}
      </span>
    );
  };

  return (
    <section className="py-16 px-6 bg-white border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-xs font-extrabold uppercase tracking-widest text-gray-400">
            Trusted by Industry Leaders Worldwide
          </span>
        </div>

        {/* Logos Flex Row */}
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 lg:gap-24 opacity-60 hover:opacity-100 transition-opacity duration-300">
          {section.logos && section.logos.map((logo, idx) => (
            <a
              key={logo.id || idx}
              href={logo.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center p-4 transition-transform duration-300 transform hover:scale-110"
              aria-label={`Partner: ${logo.name}`}
            >
              {getBrandLogo(logo.name)}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
