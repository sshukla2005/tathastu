"use client";

import React from "react";
import Link from "next/link";
import { CtaBandSection } from "@tathastu/types";

interface CtaBandProps {
  section: CtaBandSection;
}

export default function CtaBand({ section }: CtaBandProps) {
  return (
    <section className="py-12 px-6">
      <div className="max-w-7xl mx-auto relative overflow-hidden rounded-[40px] bg-gradient-to-r from-brand-orange to-brand-primary py-16 px-8 sm:px-16 text-white text-center shadow-2xl flex flex-col items-center gap-6 group">
        {/* Glowing floating decorative circles */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-black/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500" />

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-3xl relative z-10 leading-tight">
          {section.heading}
        </h2>
        <p className="text-lg sm:text-xl text-white/90 max-w-2xl leading-relaxed relative z-10 font-medium">
          {section.subtext}
        </p>

        <div className="relative z-10 mt-4">
          <Link
            href={section.ctaHref}
            className="inline-flex items-center justify-center px-10 py-4 bg-white hover:bg-gray-50 text-brand-dark hover:text-brand-primary font-bold rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg shadow-lg hover:shadow-xl cursor-pointer"
          >
            {section.ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
