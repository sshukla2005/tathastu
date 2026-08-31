"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const RED = "#E02020";
const BORDER = "rgba(224,32,32,0.35)";
const TEXT_PRIMARY = "#1A1A1A";
const TEXT_SECONDARY = "#4D4D4D";

export interface Program {
  title: string;
  image: string;
  description: string;
  items: string[];
  ctaLabel: string;
  href: string;
}

export default function AcademyProgramsCarousel({
  programs,
}: {
  programs: Program[];
}) {
  const [visibleCount, setVisibleCount] = useState(3);
  const [current, setCurrent] = useState(0);
  const [stepPx, setStepPx] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mqTablet = window.matchMedia("(max-width: 1024px)");
    const mqMobile = window.matchMedia("(max-width: 640px)");
    const update = () =>
      setVisibleCount(mqMobile.matches ? 1 : mqTablet.matches ? 2 : 3);
    update();
    mqTablet.addEventListener("change", update);
    mqMobile.addEventListener("change", update);
    return () => {
      mqTablet.removeEventListener("change", update);
      mqMobile.removeEventListener("change", update);
    };
  }, []);

  // Measure the real rendered width of one slide (card + gap) so the
  // track always shifts by exactly one card, regardless of how the
  // breakpoint CSS resolved fractional/rounded widths.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      const firstCard = track.firstElementChild as HTMLElement | null;
      const secondCard = firstCard?.nextElementSibling as HTMLElement | null;
      if (!firstCard) return;
      const step = secondCard
        ? secondCard.getBoundingClientRect().left -
          firstCard.getBoundingClientRect().left
        : firstCard.getBoundingClientRect().width;
      setStepPx(step);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    return () => ro.disconnect();
  }, [visibleCount, programs.length]);

  const maxIndex = Math.max(0, programs.length - visibleCount);

  useEffect(() => {
    setCurrent((c) => Math.min(c, maxIndex));
  }, [maxIndex]);

  const goPrev = () => setCurrent((c) => Math.max(0, c - 1));
  const goNext = () => setCurrent((c) => Math.min(maxIndex, c + 1));

  const canPrev = current > 0;
  const canNext = current < maxIndex;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        width: "100%",
      }}
    >
      <div className="programs-viewport">
        <div
          ref={trackRef}
          className="programs-grid"
          style={{
            transform: `translateX(-${current * stepPx}px)`,
          }}
        >
          {programs.map((program, idx) => (
            <div
              key={idx}
              style={{
                background: "#FFFFFF",
                borderRadius: "16px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              className="program-card program-card-slide"
            >
              {/* Card Image */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "240px",
                }}
              >
                <Image
                  src={program.image}
                  alt={program.title}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 1024px) 100vw, 400px"
                />
              </div>

              {/* Card Body */}
              <div
                style={{
                  padding: "32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  flexGrow: 1,
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: "20px",
                    fontWeight: 800,
                    color: TEXT_PRIMARY,
                  }}
                >
                  {program.title}
                </h3>

                <p
                  style={{
                    margin: 0,
                    fontSize: "13px",
                    color: TEXT_SECONDARY,
                    lineHeight: 1.6,
                  }}
                >
                  {program.description}
                </p>

                {/* Checklist */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    flexGrow: 1,
                  }}
                >
                  {program.items.map((item) => (
                    <div
                      key={item}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={RED}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ flexShrink: 0, marginTop: "2px" }}
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M8 12.5l2.5 2.5L16 9.5" />
                      </svg>
                      <span
                        style={{
                          fontSize: "12px",
                          color: TEXT_SECONDARY,
                          lineHeight: 1.4,
                        }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action CTA Block */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    alignItems: "center",
                    marginTop: "8px",
                  }}
                >
                  <Link
                    href={program.href}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      padding: "14px 24px",
                      background: RED,
                      color: "#FFFFFF",
                      fontWeight: 700,
                      fontSize: "13px",
                      borderRadius: "999px",
                      textDecoration: "none",
                      letterSpacing: "0.02em",
                      transition: "background 0.2s",
                    }}
                    className="program-btn"
                  >
                    {program.ctaLabel}
                  </Link>
                  <a
                    href="#"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      padding: "12.5px 24px",
                      background: "#FFFFFF",
                      color: RED,
                      fontWeight: 700,
                      fontSize: "13px",
                      borderRadius: "999px",
                      border: `1.5px solid ${BORDER}`,
                      textDecoration: "none",
                      transition: "background 0.2s, border-color 0.2s",
                    }}
                    className="view-more-link"
                  >
                    View More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {maxIndex > 0 && (
        <div className="programs-arrows">
          <button
            type="button"
            aria-label="Previous program"
            onClick={goPrev}
            disabled={!canPrev}
            className="programs-arrow-btn"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next program"
            onClick={goNext}
            disabled={!canNext}
            className="programs-arrow-btn"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
