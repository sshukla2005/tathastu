"use client";

import React from "react";
import { TestimonialsSection } from "@tathastu/types";
import { Quote } from "lucide-react";

interface TestimonialsProps {
  section: TestimonialsSection;
}

export default function Testimonials({ section }: TestimonialsProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <section className="py-20 px-6 bg-brand-light relative overflow-hidden">
      {/* Big quote symbol background decoration */}
      <div className="absolute top-10 right-10 text-gray-200/50 -z-0 pointer-events-none">
        <Quote size={300} strokeWidth={0.5} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header content */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
          <span className="text-sm font-extrabold tracking-widest text-brand-primary uppercase">
            {section.heading}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark leading-tight">
            {section.subtitle}
          </h2>
          <div className="w-20 h-1.5 bg-brand-orange mx-auto rounded-full mt-2" />
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {section.testimonials && section.testimonials.map((t, idx) => (
            <div
              key={t.id || idx}
              className="bg-white rounded-[32px] p-8 sm:p-10 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between"
            >
              {/* Quote text */}
              <div className="flex flex-col gap-4">
                <div className="text-brand-primary">
                  <Quote size={40} className="fill-current opacity-20" />
                </div>
                <p className="text-gray-600 text-base sm:text-lg italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              {/* Author info */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-100">
                {/* Initials Avatar */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-brand-orange to-brand-primary flex items-center justify-center text-white font-extrabold text-lg shadow-md shrink-0">
                  {getInitials(t.authorName)}
                </div>

                <div className="flex flex-col">
                  <span className="font-extrabold text-brand-dark text-lg leading-tight">
                    {t.authorName}
                  </span>
                  <span className="text-sm text-gray-500 font-semibold mt-0.5">
                    {t.authorTitle}, <span className="text-brand-primary">{t.company}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
