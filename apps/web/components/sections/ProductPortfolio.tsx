"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ProductPortfolioSection } from "@tathastu/types";
import { Cpu, Terminal, Layers } from "lucide-react";

interface ProductPortfolioProps {
  section: ProductPortfolioSection;
}

export default function ProductPortfolio({ section }: ProductPortfolioProps) {
  const [filter, setFilter] = useState<string>("All");

  // Filter items based on category selection
  const filteredItems = section.items
    ? section.items.filter(
        (item) => filter === "All" || item.category === filter
      )
    : [];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Hardware":
        return <Cpu size={16} />;
      case "Software":
        return <Terminal size={16} />;
      case "Plugin":
        return <Layers size={16} />;
      default:
        return null;
    }
  };

  const categories = ["All", "Hardware", "Software", "Plugin"];

  return (
    <section className="py-20 px-6 bg-brand-light">
      <div className="max-w-7xl mx-auto">
        {/* Header content */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="flex flex-col gap-4 max-w-2xl">
            <span className="text-sm font-extrabold tracking-widest text-brand-primary uppercase">
              {section.heading}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark leading-tight">
              {section.subtitle}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mt-2">
              {section.headline}
            </p>
          </div>

          {/* Filter Navigation */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${
                  filter === cat
                    ? "bg-brand-primary text-white shadow-lg"
                    : "bg-white text-brand-dark hover:bg-gray-100 border border-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio items grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id || idx}
                className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between h-[360px]"
              >
                {/* Visual Header representing categories */}
                <div className={`h-32 flex items-center justify-center p-6 bg-gradient-to-br ${
                  item.category === "Hardware"
                    ? "from-[#1D385E] to-[#4B95FF]"
                    : item.category === "Software"
                    ? "from-[#EB5B0C] to-[#ECD027]"
                    : "from-[#1E293B] to-[#334155]"
                } text-white`}>
                  <div className="text-center flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      {getCategoryIcon(item.category)}
                    </div>
                    <span className="text-xs uppercase font-extrabold tracking-widest bg-white/20 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold text-brand-dark group-hover:text-brand-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  <Link
                    href={`/studio?item=${item.slug}`}
                    className="text-xs font-bold text-brand-primary flex items-center gap-1 group-hover:gap-2 transition-all mt-4 self-start"
                  >
                    <span>View Details</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 font-medium bg-white rounded-2xl border border-dashed border-gray-200">
            No items found in this category.
          </div>
        )}

        {/* Bottom CTA View All Portfolio */}
        {section.ctaLabel && (
          <div className="text-center mt-12">
            <Link
              href={section.ctaHref}
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-dark hover:bg-brand-primary text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg shadow-md hover:shadow-lg cursor-pointer"
            >
              <span>{section.ctaLabel}</span>
              <span>→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
