"use client";

import React from "react";
import { FeatureCardsSection } from "@tathastu/types";
import { Cpu, Users, Award, Shield, Sparkles, Building, GraduationCap, Factory } from "lucide-react";

interface FeatureCardsProps {
  section: FeatureCardsSection;
}

export default function FeatureCards({ section }: FeatureCardsProps) {
  // Map icons based on titles for rich, premium look
  const getIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes("entertainment") || t.includes("media")) {
      return <Sparkles className="w-8 h-8 text-brand-primary" />;
    }
    if (t.includes("architecture") || t.includes("aec") || t.includes("design")) {
      return <Building className="w-8 h-8 text-brand-orange" />;
    }
    if (t.includes("education") || t.includes("training") || t.includes("academy")) {
      return <GraduationCap className="w-8 h-8 text-brand-yellow" />;
    }
    if (t.includes("manufacturing") || t.includes("visualization")) {
      return <Factory className="w-8 h-8 text-green-500" />;
    }
    if (t.includes("innovation")) {
      return <Cpu className="w-8 h-8 text-brand-primary" />;
    }
    if (t.includes("focus") || t.includes("client")) {
      return <Users className="w-8 h-8 text-brand-orange" />;
    }
    if (t.includes("expertise")) {
      return <Award className="w-8 h-8 text-brand-yellow" />;
    }
    if (t.includes("reliability")) {
      return <Shield className="w-8 h-8 text-green-500" />;
    }
    return <Cpu className="w-8 h-8 text-brand-primary" />;
  };

  const isWhyChooseUs = section.title.toLowerCase().includes("why");

  return (
    <section className={`py-20 px-6 ${isWhyChooseUs ? "bg-white" : "bg-brand-light"}`}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
          <h2 className="text-sm font-extrabold tracking-widest text-brand-primary uppercase">
            {section.title}
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-brand-dark leading-tight">
            {section.subtitle}
          </p>
          <div className="w-24 h-1.5 bg-brand-orange mx-auto rounded-full mt-2" />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {section.cards.map((card, idx) => (
            <div
              key={card.id || idx}
              className="group relative bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 flex flex-col justify-between overflow-hidden"
            >
              {/* Colored Card Accent Border Hover */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-orange via-brand-yellow to-brand-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

              <div className="flex flex-col gap-6">
                {/* Icon Container */}
                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-brand-dark group-hover:text-white transition-colors duration-300">
                  {getIcon(card.title)}
                </div>

                <div className="flex flex-col gap-3">
                  <h3 className="text-xl font-bold text-brand-dark group-hover:text-brand-primary transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>

              {/* Decorative Corner Arrow Accent */}
              <div className="mt-8 flex items-center text-xs font-bold text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-1">
                <span>Learn more</span>
                <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
