"use client";

import React from "react";
import { StatsBandSection } from "@tathastu/types";

interface StatsBandProps {
  section: StatsBandSection;
}

export default function StatsBand({ section }: StatsBandProps) {
  return (
    <section className="relative overflow-hidden bg-brand-dark text-white py-16 px-6">
      {/* Decorative Network Grid Dots */}
      <div className="absolute inset-0 opacity-5 z-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Headline */}
        <div className="lg:max-w-md text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            {section.heading}
          </h2>
          <div className="w-20 h-1 bg-brand-orange mt-4 mx-auto lg:mx-0 rounded-full" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 w-full lg:w-auto shrink-0">
          {section.stats.map((stat, idx) => (
            <div
              key={stat.id || idx}
              className="flex flex-col items-center justify-center p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-brand-primary/30 transition-all duration-300 text-center min-w-[180px] group"
            >
              {/* Stat Value */}
              <span className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-brand-orange to-brand-primary bg-clip-text text-transparent transform group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </span>
              {/* Stat Label */}
              <span className="text-gray-400 text-sm font-semibold mt-2 tracking-wide uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
