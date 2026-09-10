"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FaqItem } from "@tathastu/types";

const RED = "#E02020";

interface FaqSectionProps {
  heading?: string;
  headingHighlight?: string;
  faqs: FaqItem[];
}

function FaqIllustration() {
  return (
    <svg
      viewBox="0 0 400 340"
      style={{ width: "100%", height: "auto", maxWidth: "380px" }}
      aria-hidden="true"
    >
      <circle cx="120" cy="170" r="140" fill="#EAF2FB" />
      <path
        d="M30,340 Q0,200 85,148 Q175,105 165,220 Q152,305 30,340 Z"
        fill="#DFF3E6"
      />

      {/* table */}
      <rect x="20" y="232" width="340" height="14" rx="7" fill="#2B4A7A" />
      <rect x="34" y="246" width="10" height="58" rx="3" fill="#2B4A7A" />
      <rect x="326" y="246" width="10" height="58" rx="3" fill="#2B4A7A" />

      {/* person left — laptop */}
      <circle cx="92" cy="158" r="26" fill="#F2C9A0" />
      <rect x="62" y="184" width="60" height="52" rx="18" fill="#2E86DE" />
      <rect x="70" y="222" width="42" height="6" rx="3" fill="#1F2937" />
      <rect x="74" y="196" width="34" height="26" rx="3" fill="#0B0625" />

      {/* person center — standing, arms raised */}
      <rect
        x="150"
        y="178"
        width="18"
        height="52"
        rx="9"
        fill="#F2C9A0"
        transform="rotate(-24 159 204)"
      />
      <rect
        x="232"
        y="178"
        width="18"
        height="52"
        rx="9"
        fill="#F2C9A0"
        transform="rotate(24 241 204)"
      />
      <rect x="172" y="170" width="58" height="68" rx="16" fill="#1F2937" />
      <rect x="182" y="228" width="38" height="26" rx="6" fill="#F2A900" />
      <circle cx="201" cy="142" r="27" fill="#F2C9A0" />
      <rect x="188" y="120" width="26" height="16" rx="8" fill="#1F2937" />

      {/* person right */}
      <circle cx="310" cy="163" r="24" fill="#F2C9A0" />
      <rect x="284" y="186" width="54" height="54" rx="16" fill="#F2A900" />

      {/* question bubbles */}
      <circle cx="162" cy="66" r="30" fill="#3B82F6" />
      <text
        x="162"
        y="77"
        fontSize="30"
        fontWeight="800"
        fill="#FFFFFF"
        textAnchor="middle"
        fontFamily="'Open Sans', sans-serif"
      >
        ?
      </text>

      <circle cx="216" cy="94" r="20" fill="#60A5FA" />
      <text
        x="216"
        y="101"
        fontSize="20"
        fontWeight="800"
        fill="#FFFFFF"
        textAnchor="middle"
        fontFamily="'Open Sans', sans-serif"
      >
        ?
      </text>

      <circle cx="128" cy="212" r="15" fill={RED} />
      <text
        x="128"
        y="218"
        fontSize="16"
        fontWeight="800"
        fill="#FFFFFF"
        textAnchor="middle"
        fontFamily="'Open Sans', sans-serif"
      >
        ?
      </text>

      <circle cx="255" cy="150" r="11" fill="#2E86DE" />
      <path
        d="M250,150 a5,5 0 1 0 10,0 a5,5 0 1 0 -10,0"
        stroke="#FFFFFF"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}

export default function FaqSection({ heading = "Frequently Asked", headingHighlight = "Questions", faqs }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (faqs.length === 0) return null;

  return (
    <section
      className="hc-faq-section"
      style={{
        background:
          "linear-gradient(135deg, #F3F6FB 0%, #FFFFFF 45%, #FBEEE3 100%)",
        padding: "100px 80px",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <h2
          style={{
            fontSize: "clamp(28px, 3vw, 44px)",
            fontWeight: 800,
            color: "#0B0625",
            margin: "0 0 48px 0",
            textAlign: "center",
            fontFamily: "'Open Sans', sans-serif",
          }}
        >
          {heading} <span style={{ color: RED }}>{headingHighlight}</span>
        </h2>

        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "20px",
            padding: "48px",
            boxShadow: "0 20px 50px rgba(0,0,0,0.06)",
          }}
          className="hc-faq-card"
        >
          <div className="hc-faq-grid">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <FaqIllustration />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={faq.id ?? idx}
                    style={{
                      border: `1px solid ${isOpen ? "#FBD5D5" : "#EFEFEF"}`,
                      borderRadius: "12px",
                      overflow: "hidden",
                    }}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "16px",
                        padding: "18px 22px",
                        background: "#FFFFFF",
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "15px",
                          fontWeight: 700,
                          color: isOpen ? RED : "#0B0625",
                          fontFamily: "'Open Sans', sans-serif",
                        }}
                      >
                        {faq.question}
                      </span>
                      {isOpen ? (
                        <ChevronUp size={18} color="#0B0625" style={{ flexShrink: 0 }} />
                      ) : (
                        <ChevronDown size={18} color="#0B0625" style={{ flexShrink: 0 }} />
                      )}
                    </button>
                    {isOpen && (
                      <div style={{ padding: "0 22px 20px 22px" }}>
                        <p
                          style={{
                            fontSize: "14px",
                            lineHeight: "22px",
                            color: "#6B7280",
                            margin: 0,
                            fontFamily: "'Open Sans', sans-serif",
                          }}
                        >
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hc-faq-grid { display: grid; grid-template-columns: 380px 1fr; gap: 48px; align-items: center; }
        @media (max-width: 1024px) {
          .hc-faq-section { padding: 60px 40px !important; }
          .hc-faq-card { padding: 32px !important; }
          .hc-faq-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 640px) {
          .hc-faq-section { padding: 40px 20px !important; }
          .hc-faq-card { padding: 24px !important; }
        }
      `}</style>
    </section>
  );
}
