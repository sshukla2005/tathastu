"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ProductPortfolioSection } from "@tathastu/types";

interface ProductPortfolioProps {
  section: ProductPortfolioSection;
}

/*
  Figma node 40:4579 — Product Portfolio
  - Light background
  - Heading "Product Portfolio" (two-tone), subtitle "High-Quality Solutions Designed for Every Need"
  - Carousel arrows (‹ ›, square buttons) top-right
  - One large IMAGE BANNER (rounded), dark overlay
  - Right-aligned white heading: "Products Crafted to Meet Industry Standards" ("Industry" in blue)
  - "View All Portfolio" blue gradient pill

  No: category filter tabs, grid of items with icons, product detail cards
*/

export default function ProductPortfolio({ section }: ProductPortfolioProps) {
  return (
    <section
      style={{
        padding: "80px 80px",
        backgroundColor: "#F8F8F8",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        {/* Header row: heading left, carousel arrows right */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "40px",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          {/* Two-tone heading */}
          <div>
            <h2
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: "clamp(32px, 3vw, 48px)",
                fontWeight: 700,
                lineHeight: 1.2,
                margin: "0 0 12px 0",
              }}
            >
              <span style={{ color: "#0b0625" }}>Product </span>
              <span style={{ color: "#4B95FF" }}>Portfolio</span>
            </h2>
            <p
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: "16px",
                color: "#6B7280",
                margin: 0,
              }}
            >
              {section.subtitle || "High-Quality Solutions Designed for Every Need"}
            </p>
          </div>

          {/* Carousel arrows — square buttons */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              alignSelf: "center",
            }}
          >
            <button
              aria-label="Previous"
              style={{
                width: "44px",
                height: "44px",
                border: "1.5px solid #0b0625",
                borderRadius: "4px",
                background: "#FFFFFF",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Open Sans', sans-serif",
                fontSize: "20px",
                color: "#0b0625",
              }}
            >
              ‹
            </button>
            <button
              aria-label="Next"
              style={{
                width: "44px",
                height: "44px",
                border: "1.5px solid #0b0625",
                borderRadius: "4px",
                background: "#FFFFFF",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Open Sans', sans-serif",
                fontSize: "20px",
                color: "#0b0625",
              }}
            >
              ›
            </button>
          </div>
        </div>

        {/* Large image banner */}
        <div
          style={{
            position: "relative",
            borderRadius: "20px",
            overflow: "hidden",
            height: "clamp(300px, 40vw, 480px)",
            backgroundColor: "#1a1f2e",
          }}
        >
          {/* Banner image */}
          <Image
            src="/images/product-portfolio/banner.jpg"
            alt="Products Crafted to Meet Industry Standards"
            fill
            style={{ objectFit: "cover" }}
            sizes="100vw"
          />

          {/* Dark overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, rgba(10,14,26,0.3) 0%, rgba(10,14,26,0.75) 100%)",
            }}
          />

          {/* Right-aligned content over banner */}
          <div
            style={{
              position: "absolute",
              right: "64px",
              bottom: "48px",
              maxWidth: "460px",
              textAlign: "right",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "24px",
            }}
          >
            <h3
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: "clamp(22px, 2.5vw, 32px)",
                fontWeight: 700,
                color: "#FFFFFF",
                lineHeight: 1.3,
                margin: 0,
              }}
            >
              Products Crafted to Meet{" "}
              <span style={{ color: "#4B95FF" }}>Industry</span> Standards
            </h3>

            {/* "View All Portfolio" blue gradient pill */}
            <Link
              href={section.ctaHref || "/studio"}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "14px 28px",
                background: "linear-gradient(90deg, #1d385e 0%, #4b95ff 100%)",
                color: "#FFFFFF",
                fontFamily: "'Open Sans', sans-serif",
                fontSize: "15px",
                fontWeight: 700,
                borderRadius: "999px",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              {section.ctaLabel || "View All Portfolio"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
